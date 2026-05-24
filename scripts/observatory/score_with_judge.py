#!/usr/bin/env python3
"""Stage 3: judge every successful model output.

- Primary judge: Claude Opus (`claude-opus-4-7`) — every output.
- Cross-check judge: GPT-4o — deterministic 10% sample.
- Judge calls debit the SAME CostTracker as run_models (monthly hard cap is global).
- Malformed judge JSON: one retry with stricter reinforcement; if still bad, log
  to judge-flags.json as malformed and treat the score as missing (no `judge.primary`).
- Cross-check disagreement >= 2 (criterion-level abs diff) flags to judge-flags.json.
"""
from __future__ import annotations

import argparse
import asyncio
import json
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _lib.cost_tracker import CostTracker  # noqa: E402
from _lib.errors import (  # noqa: E402
    AuthProviderError,
    CostCapAbort,
    MalformedJudgeOutput,
    TransientProviderError,
)
from _lib.judge import (  # noqa: E402
    DEFAULT_CROSS_CHECK_MODEL,
    DEFAULT_JUDGE_MODEL,
    criterion_disagreement,
    parse_judge_response,
    render_judge_prompt,
    should_cross_check,
)
from _lib.pipeline import (  # noqa: E402
    default_scratch_dir,
    load_state,
    state_path_for,
    utc_now_iso,
    write_state,
)
from _lib.pricing import compute_cost_usd, estimate_max_cost_usd  # noqa: E402
from _lib.providers import (  # noqa: E402
    PROVIDER_RATE_LIMIT,
    call_with_retry,
    get_provider,
    provider_name_for_model,
)

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_COST_LOG = REPO_ROOT / "data" / "observatory" / "cost-log.json"
DEFAULT_JUDGE_FLAGS = REPO_ROOT / "data" / "observatory" / "judge-flags.json"
DEFAULT_GLOBAL_CONCURRENCY = 4
DEFAULT_JUDGE_MAX_TOKENS = 512
JUDGE_DISAGREEMENT_FLAG_THRESHOLD = 2  # contract §5.3


async def _judge_one(
    *,
    cost: CostTracker,
    judge_model: str,
    judge_prompt: str,
    expected_criteria: int,
    global_sem: asyncio.Semaphore,
    provider_sems: dict[str, asyncio.Semaphore],
    max_output_tokens: int = DEFAULT_JUDGE_MAX_TOKENS,
) -> tuple[list[int] | None, str | None, dict[str, Any]]:
    """Call the judge, retry once on malformed JSON. Returns (scores_or_None, error, raw_meta)."""
    provider = get_provider(judge_model)
    provider_kind = provider_name_for_model(judge_model)
    estimate = estimate_max_cost_usd(judge_model, len(judge_prompt) // 4 + 1, max_output_tokens)

    meta: dict[str, Any] = {
        "judge_model": judge_model,
        "judge_run_at": utc_now_iso(),
        "tokens_in": 0,
        "tokens_out": 0,
        "cost_usd": 0.0,
        "provider_response_id": None,
    }

    await cost.check_and_debit(estimate)
    try:
        async with global_sem, provider_sems[provider_kind]:
            resp = await call_with_retry(provider, judge_model, judge_prompt, max_output_tokens=max_output_tokens)
    except AuthProviderError:
        await cost.refund(estimate)
        raise
    except TransientProviderError as e:
        await cost.refund(estimate)
        return None, f"transient: {e}", meta

    actual_cost = compute_cost_usd(judge_model, resp.tokens_in, resp.tokens_out)
    await cost.reconcile_actual(estimate, actual_cost)
    meta.update({
        "tokens_in": resp.tokens_in,
        "tokens_out": resp.tokens_out,
        "cost_usd": actual_cost,
        "provider_response_id": resp.provider_response_id,
        "judge_run_at": utc_now_iso(),
    })

    try:
        scores = parse_judge_response(resp.text, expected_criteria)
        return scores, None, meta
    except MalformedJudgeOutput as e:
        # Retry once with stricter reinforcement per contract §7.
        retry_prompt = judge_prompt + (
            "\n\nIMPORTANT: previous attempt did not return valid JSON. "
            "Return ONLY the JSON object — no prose, no code fences, no commentary."
        )
        retry_estimate = estimate_max_cost_usd(judge_model, len(retry_prompt) // 4 + 1, max_output_tokens)
        await cost.check_and_debit(retry_estimate)
        try:
            async with global_sem, provider_sems[provider_kind]:
                resp2 = await call_with_retry(provider, judge_model, retry_prompt, max_output_tokens=max_output_tokens)
        except AuthProviderError:
            await cost.refund(retry_estimate)
            raise
        except TransientProviderError as te:
            await cost.refund(retry_estimate)
            return None, f"malformed-then-transient: {e}; retry: {te}", meta

        actual_cost2 = compute_cost_usd(judge_model, resp2.tokens_in, resp2.tokens_out)
        await cost.reconcile_actual(retry_estimate, actual_cost2)
        meta["tokens_in"] += resp2.tokens_in
        meta["tokens_out"] += resp2.tokens_out
        meta["cost_usd"] = round(meta["cost_usd"] + actual_cost2, 6)
        meta["provider_response_id"] = resp2.provider_response_id
        try:
            scores = parse_judge_response(resp2.text, expected_criteria)
            return scores, None, meta
        except MalformedJudgeOutput as e2:
            return None, f"malformed-after-retry: {e2}", meta


async def score_all(
    state: dict[str, Any],
    cost: CostTracker,
    *,
    judge_model: str = DEFAULT_JUDGE_MODEL,
    cross_check_model: str = DEFAULT_CROSS_CHECK_MODEL,
    global_concurrency: int = DEFAULT_GLOBAL_CONCURRENCY,
    judge_flags_path: Path | None = None,
) -> dict[str, Any]:
    """For every successful model output, run primary judge; 10% sampled get cross-check."""
    global_sem = asyncio.Semaphore(global_concurrency)
    provider_sems = {kind: asyncio.Semaphore(n) for kind, n in PROVIDER_RATE_LIMIT.items()}

    run_id = state["run_id"]
    flag_entries: list[dict[str, Any]] = []
    aborted_reason: dict[str, Any] | None = None

    for prompt_entry in state.get("raw_results", []):
        prompt_id = prompt_entry["prompt_id"]
        rubric = prompt_entry["rubric"]
        criteria: list[str] = rubric["criteria"]
        pass_threshold: int = rubric["pass_threshold"]

        for input_entry in prompt_entry["results_by_input"]:
            test_input_id = input_entry["test_input_id"]
            rendered_prompt = input_entry["rendered_prompt"]

            for model_result in input_entry["results_by_model"]:
                model = model_result["model"]
                if model_result.get("error") or not model_result.get("output"):
                    model_result["judge"] = {"primary": None, "cross_check": None}
                    continue

                judge_prompt_text = render_judge_prompt(
                    rendered_prompt, model_result["output"], criteria
                )

                try:
                    primary_scores, primary_err, primary_meta = await _judge_one(
                        cost=cost,
                        judge_model=judge_model,
                        judge_prompt=judge_prompt_text,
                        expected_criteria=len(criteria),
                        global_sem=global_sem,
                        provider_sems=provider_sems,
                    )
                except AuthProviderError as e:
                    aborted_reason = {"reason": "auth", "detail": f"judge auth: {e}"}
                    break
                except CostCapAbort as e:
                    aborted_reason = {"reason": "cost-cap", "detail": f"judge cost-cap: {e}"}
                    break

                primary_obj: dict[str, Any] | None
                if primary_scores is None:
                    primary_obj = None
                    flag_entries.append({
                        "run_id": run_id,
                        "prompt_id": prompt_id,
                        "test_input_id": test_input_id,
                        "model": model,
                        "kind": "malformed_judge",
                        "judge_model": primary_meta["judge_model"],
                        "error": primary_err,
                    })
                else:
                    total = sum(primary_scores)
                    primary_obj = {
                        "criteria_scores": primary_scores,
                        "total": total,
                        "pass": total >= pass_threshold,
                        "judge_model": primary_meta["judge_model"],
                        "judge_run_at": primary_meta["judge_run_at"],
                    }

                cross_obj: dict[str, Any] | None = None
                if primary_scores is not None and should_cross_check(
                    run_id, prompt_id, model, test_input_id
                ):
                    try:
                        cross_scores, cross_err, cross_meta = await _judge_one(
                            cost=cost,
                            judge_model=cross_check_model,
                            judge_prompt=judge_prompt_text,
                            expected_criteria=len(criteria),
                            global_sem=global_sem,
                            provider_sems=provider_sems,
                        )
                    except AuthProviderError as e:
                        aborted_reason = {"reason": "auth", "detail": f"cross-check auth: {e}"}
                        break
                    except CostCapAbort as e:
                        aborted_reason = {"reason": "cost-cap", "detail": f"cross-check cost-cap: {e}"}
                        break

                    if cross_scores is None:
                        flag_entries.append({
                            "run_id": run_id,
                            "prompt_id": prompt_id,
                            "test_input_id": test_input_id,
                            "model": model,
                            "kind": "malformed_cross_check",
                            "judge_model": cross_meta["judge_model"],
                            "error": cross_err,
                        })
                    else:
                        disagreement = criterion_disagreement(primary_scores, cross_scores)
                        cross_obj = {
                            "criteria_scores": cross_scores,
                            "total": sum(cross_scores),
                            "judge_model": cross_meta["judge_model"],
                            "disagreement_with_primary": disagreement,
                        }
                        if disagreement >= JUDGE_DISAGREEMENT_FLAG_THRESHOLD:
                            flag_entries.append({
                                "run_id": run_id,
                                "prompt_id": prompt_id,
                                "test_input_id": test_input_id,
                                "model": model,
                                "kind": "cross_check_disagreement",
                                "primary_score": primary_obj["total"] if primary_obj else None,
                                "cross_check_score": sum(cross_scores),
                                "disagreement": disagreement,
                                "primary_judge_model": primary_meta["judge_model"],
                                "cross_check_judge_model": cross_meta["judge_model"],
                            })

                model_result["judge"] = {"primary": primary_obj, "cross_check": cross_obj}

            if aborted_reason:
                break
        if aborted_reason:
            break

    state["stage"] = "scored"
    state["scored_at"] = utc_now_iso()
    if aborted_reason:
        state["aborted"] = aborted_reason

    if judge_flags_path and flag_entries:
        _append_flags(judge_flags_path, flag_entries)

    state["new_judge_flag_count"] = len(flag_entries)
    return state


def _append_flags(path: Path, new_entries: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    existing: list[dict[str, Any]] = []
    if path.exists():
        try:
            data = json.loads(path.read_text())
            if isinstance(data, list):
                existing = data
        except json.JSONDecodeError:
            existing = []
    existing.extend(new_entries)
    path.write_text(json.dumps(existing, indent=2, sort_keys=True) + "\n")


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--run-id", required=True)
    p.add_argument("--state-file", type=Path, default=None)
    p.add_argument("--cost-log", type=Path, default=DEFAULT_COST_LOG)
    p.add_argument("--judge-flags", type=Path, default=DEFAULT_JUDGE_FLAGS)
    p.add_argument("--judge-model", default=DEFAULT_JUDGE_MODEL)
    p.add_argument("--cross-check-model", default=DEFAULT_CROSS_CHECK_MODEL)
    p.add_argument("--global-concurrency", type=int, default=DEFAULT_GLOBAL_CONCURRENCY)
    p.add_argument("--warn-threshold-usd", type=float, default=None)
    p.add_argument("--hard-threshold-usd", type=float, default=None)
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    scratch = args.state_file.parent if args.state_file else default_scratch_dir(REPO_ROOT, args.run_id)
    state_file = args.state_file or state_path_for(scratch)
    state = load_state(state_file)

    cost = CostTracker.load(
        args.cost_log,
        run_id=args.run_id,
        warn_threshold_usd=args.warn_threshold_usd,
        hard_threshold_usd=args.hard_threshold_usd,
    )

    try:
        state = asyncio.run(score_all(
            state,
            cost,
            judge_model=args.judge_model,
            cross_check_model=args.cross_check_model,
            global_concurrency=args.global_concurrency,
            judge_flags_path=args.judge_flags,
        ))
    except AuthProviderError as e:
        print(f"FATAL judge auth — aborting: {e}", file=sys.stderr)
        state["stage"] = "aborted"
        state["aborted"] = {"reason": "auth", "detail": str(e)}
        write_state(state_file, state)
        return 3
    except CostCapAbort as e:
        print(f"FATAL cost cap during judging — aborting: {e}", file=sys.stderr)
        state["stage"] = "aborted"
        state["aborted"] = {"reason": "cost-cap", "detail": str(e)}
        write_state(state_file, state)
        return 4

    write_state(state_file, state)
    print(f"Scored outputs; {state.get('new_judge_flag_count', 0)} judge flags written.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
