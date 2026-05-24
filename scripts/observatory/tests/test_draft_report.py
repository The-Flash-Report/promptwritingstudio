"""Deterministic report rendering.

Same inputs (same runs on disk, same generated_at) → byte-identical output.
"""
from __future__ import annotations

import json
from pathlib import Path

from draft_report import render_report


def _write_run(runs_dir: Path, run_id: str, prompt_id: str, model: str, output: str, total: int, did_pass: bool, delta=None):
    d = runs_dir / run_id
    d.mkdir(parents=True, exist_ok=True)
    (d / f"{prompt_id}.json").write_text(json.dumps({
        "schema_version": 1,
        "run_id": run_id,
        "prompt_id": prompt_id,
        "prompt_schema_version_at_run": 1,
        "started_at": f"{run_id}T03:00:00Z",
        "completed_at": f"{run_id}T03:14:00Z",
        "results_by_input": [{
            "test_input_id": "t1",
            "results_by_model": [{
                "model": model,
                "output": output,
                "judge": {
                    "primary": {
                        "criteria_scores": [3, 3],
                        "total": total,
                        "pass": did_pass,
                        "judge_model": "claude-opus-4-7",
                        "judge_run_at": f"{run_id}T03:11:00Z",
                    },
                    "cross_check": None,
                },
                "tokens_in": 10,
                "tokens_out": 20,
                "cost_usd": 0.0001,
                "provider_response_id": "msg",
                "completed_at": f"{run_id}T03:02:00Z",
                "error": None,
            }],
        }],
        "delta_vs_previous_run": delta,
        "totals": {"calls": 1, "successful_calls": 1, "failed_calls": 0, "cost_usd": 0.0001},
    }, sort_keys=True))


def test_report_byte_identical_for_same_inputs(tmp_path: Path):
    runs = tmp_path / "runs"
    _write_run(runs, "2026-05-24", "p1", "claude-haiku-4-5", "alpha", 6, True)
    _write_run(runs, "2026-05-31", "p1", "claude-haiku-4-5", "alpha", 6, True,
               delta={"previous_run_id": "2026-05-24", "by_model": {}})
    flags = tmp_path / "judge-flags.json"
    flags.write_text("[]")

    a = render_report(run_id="2026-05-31", generated_at="2026-05-31T03:18:00Z", runs_dir=runs, judge_flags_path=flags)
    b = render_report(run_id="2026-05-31", generated_at="2026-05-31T03:18:00Z", runs_dir=runs, judge_flags_path=flags)
    assert a == b


def test_report_changes_when_generated_at_changes(tmp_path: Path):
    runs = tmp_path / "runs"
    _write_run(runs, "2026-05-31", "p1", "claude-haiku-4-5", "alpha", 6, True)
    flags = tmp_path / "judge-flags.json"
    flags.write_text("[]")

    a = render_report(run_id="2026-05-31", generated_at="2026-05-31T03:18:00Z", runs_dir=runs, judge_flags_path=flags)
    b = render_report(run_id="2026-05-31", generated_at="2026-05-31T03:18:01Z", runs_dir=runs, judge_flags_path=flags)
    assert a != b
    # But total prompts / totals lines must be identical.
    assert "total_prompts_run: 1" in a and "total_prompts_run: 1" in b


def test_report_picks_up_broken_and_newly_passing(tmp_path: Path):
    runs = tmp_path / "runs"
    # Previous: claude-haiku passed, gpt-4o-mini failed.
    _write_run(runs, "2026-05-24", "p1", "claude-haiku-4-5", "alpha", 6, True)
    _write_run(runs, "2026-05-24", "p2", "gpt-4o-mini", "x", 3, False)
    # Current: claude-haiku flipped to fail, gpt-4o-mini flipped to pass.
    _write_run(runs, "2026-05-31", "p1", "claude-haiku-4-5", "alpha", 3, False,
               delta={"previous_run_id": "2026-05-24", "by_model": {"claude-haiku-4-5": {"score_change": -3, "output_diff_ratio": 0.0, "flagged": True}}})
    _write_run(runs, "2026-05-31", "p2", "gpt-4o-mini", "x", 5, True,
               delta={"previous_run_id": "2026-05-24", "by_model": {"gpt-4o-mini": {"score_change": 2, "output_diff_ratio": 0.0, "flagged": True}}})
    flags = tmp_path / "judge-flags.json"
    flags.write_text("[]")

    body = render_report(run_id="2026-05-31", generated_at="2026-05-31T03:18:00Z", runs_dir=runs, judge_flags_path=flags)
    assert "broken:" in body
    assert "newly_passing:" in body
    assert "top_movers:" in body
    assert "Newly failing" in body
    assert "Newly passing" in body


def test_report_no_llm_call_in_path(tmp_path: Path):
    """Smoke check: draft_report.py imports neither anthropic, openai, gemini, nor groq."""
    src = (Path(__file__).resolve().parents[1] / "draft_report.py").read_text()
    for banned in ("anthropic", "openai", "google.generativeai", "groq", "providers"):
        assert banned not in src, f"draft_report imported '{banned}' — LLM in publish path is forbidden"
