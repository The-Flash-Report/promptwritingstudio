"""Judge helpers — parsing, deterministic sampling, disagreement metric."""
from __future__ import annotations

import pytest

from _lib.errors import MalformedJudgeOutput
from _lib.judge import (
    criterion_disagreement,
    parse_judge_response,
    should_cross_check,
)


def test_parse_judge_response_plain_json():
    scores = parse_judge_response('{"scores": [2, 3, 1], "rationale": "x"}', 3)
    assert scores == [2, 3, 1]


def test_parse_judge_response_code_fenced():
    body = '```json\n{"scores": [3, 3], "rationale": "fine"}\n```'
    assert parse_judge_response(body, 2) == [3, 3]


def test_parse_judge_response_wrong_count_fails():
    with pytest.raises(MalformedJudgeOutput):
        parse_judge_response('{"scores": [3]}', 3)


def test_parse_judge_response_out_of_range_fails():
    with pytest.raises(MalformedJudgeOutput):
        parse_judge_response('{"scores": [3, 5]}', 2)


def test_parse_judge_response_non_int_fails():
    with pytest.raises(MalformedJudgeOutput):
        parse_judge_response('{"scores": [3, "two"]}', 2)


def test_parse_judge_response_bad_json_fails():
    with pytest.raises(MalformedJudgeOutput):
        parse_judge_response("not json at all", 2)


def test_should_cross_check_deterministic():
    # Same inputs → same answer across calls.
    a = should_cross_check("2026-05-31", "p1", "gpt-4o", "t1")
    b = should_cross_check("2026-05-31", "p1", "gpt-4o", "t1")
    assert a == b


def test_should_cross_check_distribution_roughly_10pct():
    samples = 1000
    hits = sum(
        1 for i in range(samples)
        if should_cross_check("2026-05-31", f"p{i}", "gpt-4o", "t1")
    )
    # Expect ~10% with reasonable tolerance for a deterministic hash sampler.
    assert 60 <= hits <= 160


def test_criterion_disagreement_basic():
    assert criterion_disagreement([3, 2, 1], [3, 2, 1]) == 0
    assert criterion_disagreement([3, 2, 1], [0, 2, 1]) == 3
    assert criterion_disagreement([3, 2, 1], [3, 0, 1]) == 2
