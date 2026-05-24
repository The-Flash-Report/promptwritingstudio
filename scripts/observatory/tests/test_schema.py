"""Schema validation — prompt + run + report frontmatter."""
from __future__ import annotations

import json
from pathlib import Path

import pytest

from _lib.errors import SchemaValidationError
from _lib.schema import validate_prompt, validate_report_frontmatter, validate_run

FIXTURES = Path(__file__).parent / "fixtures"


def test_valid_prompt_passes():
    obj = json.loads((FIXTURES / "prompts" / "code-explain-recursive.json").read_text())
    validate_prompt(obj)


def test_invalid_prompt_missing_id_fails():
    obj = json.loads((FIXTURES / "prompts" / "code-explain-recursive.json").read_text())
    del obj["id"]
    with pytest.raises(SchemaValidationError):
        validate_prompt(obj)


def test_invalid_prompt_bad_id_pattern_fails():
    obj = json.loads((FIXTURES / "prompts" / "code-explain-recursive.json").read_text())
    obj["id"] = "Invalid_ID_With_Underscores"
    with pytest.raises(SchemaValidationError):
        validate_prompt(obj)


def test_invalid_prompt_unknown_model_fails():
    obj = json.loads((FIXTURES / "prompts" / "code-explain-recursive.json").read_text())
    obj["models"] = ["unknown-model"]
    with pytest.raises(SchemaValidationError):
        validate_prompt(obj)


def _minimal_valid_run() -> dict:
    return {
        "schema_version": 1,
        "run_id": "2026-05-31",
        "prompt_id": "code-explain-recursive",
        "prompt_schema_version_at_run": 1,
        "started_at": "2026-05-31T03:00:00Z",
        "completed_at": "2026-05-31T03:14:00Z",
        "results_by_input": [{
            "test_input_id": "fibonacci-python",
            "results_by_model": [{
                "model": "claude-haiku-4-5",
                "output": "It returns the nth Fibonacci number.",
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
                "tokens_in": 12,
                "tokens_out": 18,
                "cost_usd": 0.0001,
                "provider_response_id": "msg_x",
                "completed_at": "2026-05-31T03:02:00Z",
                "error": None,
            }],
        }],
        "delta_vs_previous_run": None,
        "totals": {"calls": 1, "successful_calls": 1, "failed_calls": 0, "cost_usd": 0.0001},
    }


def test_minimal_run_passes():
    validate_run(_minimal_valid_run())


def test_run_with_out_of_range_score_fails():
    obj = _minimal_valid_run()
    obj["results_by_input"][0]["results_by_model"][0]["judge"]["primary"]["criteria_scores"] = [5, 5]
    with pytest.raises(SchemaValidationError):
        validate_run(obj)


def test_report_frontmatter_passes():
    fm = {
        "schema_version": 1,
        "run_id": "2026-05-31",
        "generated_at": "2026-05-31T03:18:00Z",
        "total_prompts_run": 1,
        "total_models": 2,
        "total_calls": 2,
        "total_cost_usd": 0.0042,
    }
    validate_report_frontmatter(fm)
