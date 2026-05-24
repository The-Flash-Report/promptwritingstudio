"""Delta math + previous-run discovery."""
from __future__ import annotations

import json
from pathlib import Path

from compute_delta import (
    OUTPUT_DIFF_FLAG_THRESHOLD,
    SCORE_CHANGE_FLAG_THRESHOLD,
    compute_delta_for_prompt,
    find_previous_run,
    jaccard_distance,
)


def test_jaccard_identical_is_zero():
    assert jaccard_distance("hello world", "hello world") == 0.0


def test_jaccard_disjoint_is_one():
    assert jaccard_distance("a b c", "x y z") == 1.0


def test_jaccard_empty_is_zero():
    assert jaccard_distance("", "") == 0.0


def test_jaccard_partial_overlap():
    # tokens: {a, b, c} vs {b, c, d} → intersection 2, union 4 → 1 - 0.5 = 0.5
    assert jaccard_distance("a b c", "b c d") == 0.5


def _result(model: str, output: str, total: int):
    return {
        "model": model,
        "output": output,
        "judge": {"primary": {"total": total, "criteria_scores": [], "pass": False, "judge_model": "x", "judge_run_at": "x"}},
    }


def test_compute_delta_for_prompt_flags_score_change():
    current = {"results_by_input": [{
        "test_input_id": "t1",
        "results_by_model": [_result("claude-haiku-4-5", "alpha beta", 8)],
    }]}
    previous = {"results_by_input": [{
        "test_input_id": "t1",
        "results_by_model": [_result("claude-haiku-4-5", "alpha beta", 6)],
    }]}
    out = compute_delta_for_prompt(current, previous, "2026-05-24")
    assert out["previous_run_id"] == "2026-05-24"
    assert out["by_model"]["claude-haiku-4-5"]["score_change"] == 2
    assert out["by_model"]["claude-haiku-4-5"]["flagged"] is True


def test_compute_delta_for_prompt_flags_output_diff():
    current = {"results_by_input": [{
        "test_input_id": "t1",
        "results_by_model": [_result("gpt-4o-mini", "completely different words here", 5)],
    }]}
    previous = {"results_by_input": [{
        "test_input_id": "t1",
        "results_by_model": [_result("gpt-4o-mini", "alpha beta gamma delta", 5)],
    }]}
    out = compute_delta_for_prompt(current, previous, "2026-05-24")
    by_model = out["by_model"]["gpt-4o-mini"]
    assert by_model["score_change"] == 0
    assert by_model["output_diff_ratio"] >= OUTPUT_DIFF_FLAG_THRESHOLD
    assert by_model["flagged"] is True


def test_compute_delta_for_prompt_no_flag_when_quiet():
    current = {"results_by_input": [{
        "test_input_id": "t1",
        "results_by_model": [_result("claude-haiku-4-5", "alpha beta gamma", 7)],
    }]}
    previous = {"results_by_input": [{
        "test_input_id": "t1",
        "results_by_model": [_result("claude-haiku-4-5", "alpha beta gamma", 7)],
    }]}
    out = compute_delta_for_prompt(current, previous, "2026-05-24")
    assert out["by_model"]["claude-haiku-4-5"]["flagged"] is False


def test_find_previous_run_picks_most_recent_before_current(tmp_path: Path):
    runs = tmp_path / "runs"
    for date in ("2026-05-10", "2026-05-17", "2026-05-24"):
        (runs / date).mkdir(parents=True)
        (runs / date / "p1.json").write_text(json.dumps({"results_by_input": []}))
    prev_id, prev_obj = find_previous_run(runs, "2026-05-31", "p1")
    assert prev_id == "2026-05-24"
    assert prev_obj is not None


def test_find_previous_run_skips_current_date(tmp_path: Path):
    runs = tmp_path / "runs"
    (runs / "2026-05-31").mkdir(parents=True)
    (runs / "2026-05-31" / "p1.json").write_text(json.dumps({"results_by_input": []}))
    prev_id, _ = find_previous_run(runs, "2026-05-31", "p1")
    assert prev_id is None


def test_find_previous_run_missing_prompt_returns_none(tmp_path: Path):
    runs = tmp_path / "runs"
    (runs / "2026-05-24").mkdir(parents=True)
    (runs / "2026-05-24" / "other.json").write_text(json.dumps({"results_by_input": []}))
    prev_id, _ = find_previous_run(runs, "2026-05-31", "p1")
    assert prev_id is None
