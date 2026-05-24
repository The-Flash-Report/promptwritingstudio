#!/usr/bin/env python3
"""Stage 2: run every (prompt, test_input, model) combination concurrently.

Concurrency: global asyncio.Semaphore(4) + per-provider semaphore (see providers.py).
Retry: 2× exponential backoff on transient errors (5s, 30s) per `call_with_retry`.
Cost cap: every call is reserved against the monthly budget BEFORE dispatch; if the
estimate would push spend above the hard cap, the run aborts mid-flight (contract §8).
Auth errors abort the entire run immediately (contract §7).
"""
from __future__ import annotations

import argparse
import asyncio
import os
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _lib.cost_tracker import CostTracker  # noqa: E402
from _lib.errors import AuthProviderError, CostCapAbort, TransientProviderError  # noqa: E402
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
DEFAULT_GLOBAL_CONCURRENCY = 4
DEFAULT_MAX_OUTPUT_TOKENS = 1024


def render_prompt(template: str, vars_: dict[str, Any]) -> str:
    out = template
    for k, v in vars_.items():
        out = out.replace("{{" + k + "}}", str(v))
    return out


async def _call_one(
    *,
    cost: CostTracker,
    model: str,
    rendered_prompt: str,
    max_output_tokens: int,
    global_sem: asyncio.Semaphore,
    provider_sems: dict[str, asyncio.Semaphore],
) -> dict[str, Any]:
    provider = get_provider(model)
    provider_kind = provider_name_for_model(model)
    estimate = estimate_max_cost_usd(model, len(rendered_prompt) // 4 + 1, max_output_tokens)

    await cost.check_and_debit(estimate)
    try:
        async with global_sem, provider_sems[provider_kind]:
            try:
                resp = await call_with_retry(
                    provider, model, rendered_prompt, max_output_tokens=max_output_tokens
                )
            except AuthProviderError:
                # Refund the reservation — we're aborting the run anyway, but cleanly.
                await cost.refund(estimate)
                raise
            except TransientProviderError as e:
                await cost.refund(estimate)
                return {
                    "model": model,
                    "output": "",
                    "tokens_in": 0,
                    "tokens_out": 0,
                    "cost_usd": 0.0,
                    "provider_response_id": None,
                    "completed_at": utc_now_iso(),
                    "error": f"transient: {e}",
                }
    finally:
        pass

    actual_cost = compute_cost_usd(model, resp.tokens_in, resp.tokens_out)
    await cost.reconcile_actual(estimate, actual_cost)
    return {
        "model": model,
        "output": resp.text,
        "tokens_in": resp.tokens_in,
        "tokens_out": resp.tokens_out,
        "cost_usd": actual_cost,
        "provider_response_id": resp.provider_response_id,
        "completed_at": utc_now_iso(),
        "error": None,
    }


async def run_all(
    state: dict[str, Any],
    cost: CostTracker,
    global_concurrency: int = DEFAULT_GLOBAL_CONCURRENCY,
    max_output_tokens: int = DEFAULT_MAX_OUTPUT_TOKENS,
) -> dict[str, Any]:
    global_sem = asyncio.Semaphore(global_concurrency)
    provider_sems = {kind: asyncio.Semaphore(n) for kind, n in PROVIDER_RATE_LIMIT.items()}

    by_prompt: list[dict[str, Any]] = []
    aborted_by_auth = False
    aborted_by_cost = False
    abort_reason: str | None = None

    for prompt in state["corpus"]:
        per_input: list[dict[str, Any]] = []
        for test_input in prompt["test_inputs"]:
            rendered = render_prompt(prompt["prompt"], test_input["vars"])
            tasks = []
            for model in prompt["models"]:
                tasks.append(asyncio.create_task(_call_one(
                    cost=cost,
                    model=model,
                    rendered_prompt=rendered,
                    max_output_tokens=max_output_tokens,
                    global_sem=global_sem,
                    provider_sems=provider_sems,
                )))
            results_by_model: list[dict[str, Any]] = []
            for task in asyncio.as_completed(tasks):
                try:
                    results_by_model.append(await task)
                except AuthProviderError as e:
                    aborted_by_auth = True
                    abort_reason = f"auth: {e}"
                    for t in tasks:
                        t.cancel()
                    break
                except CostCapAbort as e:
                    aborted_by_cost = True
                    abort_reason = f"cost-cap: {e}"
                    for t in tasks:
                        t.cancel()
                    break
            per_input.append({
                "test_input_id": test_input["id"],
                "rendered_prompt": rendered,
                "results_by_model": results_by_model,
            })
            if aborted_by_auth or aborted_by_cost:
                break
        by_prompt.append({
            "prompt_id": prompt["id"],
            "prompt_schema_version_at_run": prompt["schema_version"],
            "rubric": prompt["rubric"],
            "results_by_input": per_input,
        })
        if aborted_by_auth or aborted_by_cost:
            break

    state["stage"] = "ran_models"
    state["raw_results"] = by_prompt
    state["completed_models_at"] = utc_now_iso()
    if aborted_by_auth:
        state["aborted"] = {"reason": "auth", "detail": abort_reason}
    if aborted_by_cost:
        state["aborted"] = {"reason": "cost-cap", "detail": abort_reason}
    return state


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--run-id", required=True)
    p.add_argument("--state-file", type=Path, default=None)
    p.add_argument("--cost-log", type=Path, default=DEFAULT_COST_LOG)
    p.add_argument("--warn-threshold-usd", type=float, default=None)
    p.add_argument("--hard-threshold-usd", type=float, default=None)
    p.add_argument("--global-concurrency", type=int, default=DEFAULT_GLOBAL_CONCURRENCY)
    p.add_argument("--max-output-tokens", type=int, default=DEFAULT_MAX_OUTPUT_TOKENS)
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
        state = asyncio.run(run_all(
            state,
            cost,
            global_concurrency=args.global_concurrency,
            max_output_tokens=args.max_output_tokens,
        ))
    except AuthProviderError as e:
        print(f"FATAL auth error — aborting run: {e}", file=sys.stderr)
        state["stage"] = "aborted"
        state["aborted"] = {"reason": "auth", "detail": str(e)}
        write_state(state_file, state)
        return 3
    except CostCapAbort as e:
        print(f"FATAL cost cap — aborting run: {e}", file=sys.stderr)
        state["stage"] = "aborted"
        state["aborted"] = {"reason": "cost-cap", "detail": str(e)}
        write_state(state_file, state)
        return 4

    write_state(state_file, state)
    post_state = cost.state()
    if post_state.warn_tripped:
        print(f"WARN: monthly spend ${post_state.spent_usd_this_month:.4f} crossed warn threshold ${post_state.warn_threshold_usd:.2f}")
    print(f"Ran models for {len(state.get('raw_results', []))} prompts; state at {state_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
