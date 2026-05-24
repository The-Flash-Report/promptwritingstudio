"""End-to-end pipeline against fixture corpus + FakeProvider.

1 prompt × 1 input × 2 fake models. All 6 LLM-touching stages exercised:
fetch → run → score → delta → write → report → open_pr (dry run).
"""
from __future__ import annotations

import asyncio
import json
import shutil
from pathlib import Path

import pytest

from _lib.cost_tracker import CostTracker
from _lib.providers import (
    FakeProvider,
    ProviderResponse,
    reset_providers,
    set_provider,
)
from compute_delta import compute_all_deltas
from draft_report import render_report
from fetch_corpus import fetch_corpus
from open_pr import build_labels, build_pr_body, count_run_flags
from run_models import run_all
from score_with_judge import score_all
from write_runs import write_all_runs

FIXTURES = Path(__file__).parent / "fixtures"


def _run(coro):
    return asyncio.run(coro)


@pytest.fixture(autouse=True)
def _reset_provider_overrides():
    reset_providers()
    yield
    reset_providers()


def _set_up_fake_providers(prompt_text_to_register: str):
    """Wire a FakeProvider that handles every provider kind in our fixture corpus."""
    fake = FakeProvider(name="fake")
    # Model outputs (deterministic). Long output → high jaccard score from judge.
    for model in ("claude-haiku-4-5", "gpt-4o-mini"):
        fake.set(
            model,
            prompt_text_to_register,
            ProviderResponse(
                text=f"Explanation from {model}: returns the nth fibonacci number using recursion with base case n<2.",
                tokens_in=20,
                tokens_out=40,
                provider_response_id=f"fake-{model}",
            ),
        )
    # Judge (Claude Opus) and cross-check (gpt-4o) responses — return JSON scores.
    # We can't pre-register the judge prompt easily because it's computed by the
    # judge module. Use a default-fallback judge: configure the FakeProvider so
    # any unregistered key returns a tiny output, and override that path by
    # subclassing.
    set_provider("anthropic", _JudgeFake(default_scores=[3, 3]))
    set_provider("openai", _JudgeFake(default_scores=[3, 2]))
    set_provider("gemini", fake)
    set_provider("groq", fake)


class _JudgeFake:
    """FakeProvider variant that always returns valid judge JSON.

    Used for both primary (Claude Opus = anthropic) and cross-check (GPT-4o = openai)
    judge calls so the integration test can exercise score_with_judge end-to-end
    without registering bespoke responses per rendered judge prompt.
    """
    name = "fake-judge"

    def __init__(self, default_scores: list[int]):
        self.default_scores = default_scores

    async def call(self, model: str, prompt: str, *, max_output_tokens: int = 1024):
        body = json.dumps({"scores": list(self.default_scores), "rationale": "ok"})
        return ProviderResponse(
            text=body,
            tokens_in=10,
            tokens_out=10,
            provider_response_id=f"judge-{model}",
        )


def test_full_pipeline_end_to_end(tmp_path: Path):
    run_id = "2026-05-31"
    prompts_dir = FIXTURES / "prompts"
    runs_dir = tmp_path / "runs"
    reports_dir = tmp_path / "reports"
    cost_log = tmp_path / "cost-log.json"
    judge_flags = tmp_path / "judge-flags.json"

    # 1. fetch_corpus
    corpus = fetch_corpus(prompts_dir)
    assert len(corpus) == 1
    prompt = corpus[0]

    # Build expected rendered prompt to register fake responses for it.
    expected_rendered = prompt["prompt"].replace("{{code}}", prompt["test_inputs"][0]["vars"]["code"])

    # Wire fakes.
    _set_up_fake_providers(expected_rendered)

    cost = CostTracker.load(cost_log, run_id=run_id, warn_threshold_usd=10.0, hard_threshold_usd=20.0)

    state = {
        "run_id": run_id,
        "stage": "fetched",
        "started_at": "2026-05-31T03:00:00Z",
        "corpus": corpus,
    }

    # 2. run_models
    state = _run(run_all(state, cost, global_concurrency=4, max_output_tokens=64))
    assert state["stage"] == "ran_models"
    assert "aborted" not in state
    # 2 model calls expected (1 prompt × 1 input × 2 models)
    rb = state["raw_results"][0]["results_by_input"][0]["results_by_model"]
    assert {r["model"] for r in rb} == {"claude-haiku-4-5", "gpt-4o-mini"}
    assert all(not r["error"] for r in rb)

    # 3. score_with_judge
    state = _run(score_all(state, cost, judge_flags_path=judge_flags))
    assert state["stage"] == "scored"
    for mr in state["raw_results"][0]["results_by_input"][0]["results_by_model"]:
        assert mr["judge"]["primary"] is not None
        assert mr["judge"]["primary"]["pass"] in (True, False)
        assert mr["judge"]["primary"]["total"] == 6  # 3 + 3 from _JudgeFake

    # 4. compute_delta — no previous run yet, so all delta = null
    state = compute_all_deltas(state, runs_dir)
    assert state["raw_results"][0]["delta_vs_previous_run"] is None

    # 5. write_runs
    state = write_all_runs(state, runs_dir, cost)
    written = state["written_run_files"]
    assert len(written) == 1
    out_path = Path(written[0])
    assert out_path.exists()
    obj = json.loads(out_path.read_text())
    assert obj["totals"]["calls"] == 2
    assert obj["totals"]["successful_calls"] == 2

    # cost-log finalized
    cl = json.loads(cost_log.read_text())
    assert any(r["run_id"] == run_id for r in cl["runs"])

    # 6. draft_report — deterministic
    report_a = render_report(
        run_id=run_id,
        generated_at="2026-05-31T03:18:00Z",
        runs_dir=runs_dir,
        judge_flags_path=judge_flags,
    )
    report_b = render_report(
        run_id=run_id,
        generated_at="2026-05-31T03:18:00Z",
        runs_dir=runs_dir,
        judge_flags_path=judge_flags,
    )
    assert report_a == report_b
    assert "Observatory Run — 2026-05-31" in report_a

    # 7. open_pr — dry-run-equivalent: count flags, build labels, build body
    (reports_dir).mkdir(parents=True, exist_ok=True)
    (reports_dir / f"{run_id}.md").write_text(report_a)
    flag_count = count_run_flags(reports_dir, run_id)
    labels = build_labels(flag_count)
    body = build_pr_body(run_id, reports_dir, flag_count)
    # Zero flags expected (no previous run, no disagreement >=2 with our judge stubs)
    assert flag_count == 0
    assert "auto-merge-safe" in labels
    assert run_id in body


def test_pipeline_aborts_on_cost_cap(tmp_path: Path):
    """Hard cap of $0.00 → first reservation aborts the run mid-flight."""
    run_id = "2026-05-31"
    prompts_dir = FIXTURES / "prompts"
    cost_log = tmp_path / "cost-log.json"

    corpus = fetch_corpus(prompts_dir)
    expected_rendered = corpus[0]["prompt"].replace("{{code}}", corpus[0]["test_inputs"][0]["vars"]["code"])
    _set_up_fake_providers(expected_rendered)

    # Hard cap just above $0 → first model call's reservation (~$0.0003) crosses it.
    cost = CostTracker.load(cost_log, run_id=run_id, warn_threshold_usd=10.0, hard_threshold_usd=0.00001)
    state = {
        "run_id": run_id,
        "stage": "fetched",
        "started_at": "2026-05-31T03:00:00Z",
        "corpus": corpus,
    }
    state = _run(run_all(state, cost, global_concurrency=2, max_output_tokens=64))
    assert state.get("aborted", {}).get("reason") == "cost-cap"
    # disabled_at recorded
    cl = json.loads(cost_log.read_text())
    assert cl.get("disabled_at") is not None


def test_write_runs_refuses_to_overwrite_existing(tmp_path: Path):
    """Second run with same date + same prompt_id raises ImmutableWriteError."""
    from _lib.errors import ImmutableWriteError
    from write_runs import build_run_obj, write_run_file

    state = {
        "run_id": "2026-05-31",
        "started_at": "2026-05-31T03:00:00Z",
        "raw_results": [{
            "prompt_id": "code-explain-recursive",
            "prompt_schema_version_at_run": 1,
            "rubric": {"criteria": ["a"], "pass_threshold": 1, "scoring_per_criterion": "0-3", "judge_prompt_template": "default"},
            "results_by_input": [{
                "test_input_id": "t1",
                "rendered_prompt": "p",
                "results_by_model": [{
                    "model": "claude-haiku-4-5",
                    "output": "out",
                    "judge": {
                        "primary": {"criteria_scores": [3], "total": 3, "pass": True, "judge_model": "claude-opus-4-7", "judge_run_at": "2026-05-31T03:11:00Z"},
                        "cross_check": None,
                    },
                    "tokens_in": 1, "tokens_out": 1, "cost_usd": 0.0001,
                    "provider_response_id": "x", "completed_at": "2026-05-31T03:02:00Z", "error": None,
                }],
            }],
            "delta_vs_previous_run": None,
        }],
    }
    obj = build_run_obj(state, state["raw_results"][0])
    target = tmp_path / "runs" / "2026-05-31" / "code-explain-recursive.json"
    write_run_file(target, obj)
    with pytest.raises(ImmutableWriteError):
        write_run_file(target, obj)
