"""Immutability + schema validation on write."""
from __future__ import annotations

import json
from pathlib import Path

import pytest

from _lib.cost_tracker import CostTracker
from _lib.errors import ImmutableWriteError
from write_runs import build_run_obj, write_all_runs, write_run_file


def _state_one_prompt() -> dict:
    return {
        "run_id": "2026-05-31",
        "started_at": "2026-05-31T03:00:00Z",
        "raw_results": [{
            "prompt_id": "code-explain-recursive",
            "prompt_schema_version_at_run": 1,
            "rubric": {"criteria": ["a", "b"], "pass_threshold": 4, "scoring_per_criterion": "0-3", "judge_prompt_template": "default"},
            "results_by_input": [{
                "test_input_id": "t1",
                "rendered_prompt": "p",
                "results_by_model": [{
                    "model": "claude-haiku-4-5",
                    "output": "an explanation",
                    "judge": {
                        "primary": {
                            "criteria_scores": [3, 3],
                            "total": 6,
                            "pass": True,
                            "judge_model": "claude-opus-4-7",
                            "judge_run_at": "2026-05-31T03:11:00Z",
                        },
                        "cross_check": None,
                    },
                    "tokens_in": 10,
                    "tokens_out": 20,
                    "cost_usd": 0.0001,
                    "provider_response_id": "msg_x",
                    "completed_at": "2026-05-31T03:02:00Z",
                    "error": None,
                }],
            }],
            "delta_vs_previous_run": None,
        }],
    }


def test_write_all_runs_succeeds_and_validates(tmp_path: Path):
    state = _state_one_prompt()
    runs_dir = tmp_path / "runs"
    cost_log = tmp_path / "cost-log.json"
    cost = CostTracker.load(cost_log, run_id="2026-05-31")
    new_state = write_all_runs(state, runs_dir, cost)
    files = new_state["written_run_files"]
    assert len(files) == 1
    obj = json.loads(Path(files[0]).read_text())
    assert obj["schema_version"] == 1
    assert obj["totals"]["calls"] == 1


def test_immutable_write_raises_on_overwrite(tmp_path: Path):
    target = tmp_path / "runs" / "2026-05-31" / "code-explain-recursive.json"
    target.parent.mkdir(parents=True)
    target.write_text("{}")
    with pytest.raises(ImmutableWriteError):
        write_run_file(target, {"foo": "bar"})


def test_build_run_obj_handles_missing_primary_judge():
    state = _state_one_prompt()
    state["raw_results"][0]["results_by_input"][0]["results_by_model"][0]["judge"] = {
        "primary": None,
        "cross_check": None,
    }
    obj = build_run_obj(state, state["raw_results"][0])
    primary = obj["results_by_input"][0]["results_by_model"][0]["judge"]["primary"]
    assert primary is not None
    assert primary["pass"] is False
    assert primary["criteria_scores"] == []
