"""Judge model integration + cross-check sampling.

Cross-check sampling is deterministic (hash-based) so tests are reproducible
and Bryan can recompute which outputs would be cross-checked given a run_id.
"""
from __future__ import annotations

import hashlib
import json
import re
from dataclasses import dataclass
from pathlib import Path

from .errors import MalformedJudgeOutput

DEFAULT_JUDGE_MODEL = "claude-opus-4-7"
DEFAULT_CROSS_CHECK_MODEL = "gpt-4o"
CROSS_CHECK_SAMPLE_RATE = 10  # 1 in N → 10%

JUDGE_TEMPLATE_PATH = Path(__file__).resolve().parents[1] / "judge_templates" / "default.txt"


def render_judge_prompt(prompt_text: str, model_output: str, criteria: list[str]) -> str:
    numbered = "\n".join(f"{i+1}. {c}" for i, c in enumerate(criteria))
    template = JUDGE_TEMPLATE_PATH.read_text()
    return (
        template.replace("{{prompt_text}}", prompt_text)
        .replace("{{model_output}}", model_output)
        .replace("{{rubric_criteria_numbered}}", numbered)
    )


def parse_judge_response(text: str, expected_criteria: int) -> list[int]:
    """Extract the {scores: [...]} array. Raises MalformedJudgeOutput on bad shape.

    Tolerates a leading code-fence (```json ... ```) the judge may emit.
    """
    cleaned = _strip_code_fence(text).strip()
    try:
        obj = json.loads(cleaned)
    except json.JSONDecodeError as e:
        raise MalformedJudgeOutput(f"judge returned non-JSON: {e}; raw={text[:200]!r}")
    scores = obj.get("scores")
    if not isinstance(scores, list) or len(scores) != expected_criteria:
        raise MalformedJudgeOutput(
            f"judge scores shape wrong (expected list of {expected_criteria}, got {scores!r})"
        )
    out: list[int] = []
    for s in scores:
        try:
            val = int(s)
        except (TypeError, ValueError):
            raise MalformedJudgeOutput(f"non-integer judge score: {s!r}")
        if val < 0 or val > 3:
            raise MalformedJudgeOutput(f"judge score out of range 0-3: {val}")
        out.append(val)
    return out


def should_cross_check(run_id: str, prompt_id: str, model: str, test_input_id: str) -> bool:
    """Deterministic 10% sample. Same inputs → same answer across reruns."""
    key = f"{run_id}::{prompt_id}::{test_input_id}::{model}".encode("utf-8")
    digest = hashlib.sha256(key).digest()
    bucket = int.from_bytes(digest[:4], "big") % CROSS_CHECK_SAMPLE_RATE
    return bucket == 0


def criterion_disagreement(primary: list[int], cross: list[int]) -> int:
    """Max absolute criterion-level difference (per contract §5.3 flag threshold = 2)."""
    if len(primary) != len(cross):
        return max(len(primary), len(cross))
    return max((abs(a - b) for a, b in zip(primary, cross)), default=0)


def _strip_code_fence(text: str) -> str:
    fence = re.match(r"^\s*```(?:json)?\s*\n(.*?)\n```\s*$", text, re.DOTALL)
    if fence:
        return fence.group(1)
    return text
