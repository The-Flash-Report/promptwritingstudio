"""open_pr.py — label selection from flag count + dry-run output shape."""
from __future__ import annotations

from pathlib import Path

from open_pr import (
    LABEL_AUTO_MERGE,
    LABEL_BASE,
    LABEL_NEEDS_BRYAN,
    build_labels,
    build_pr_body,
    count_run_flags,
)


def test_labels_zero_flags_is_auto_merge_safe():
    labels = build_labels(0)
    assert LABEL_AUTO_MERGE in labels
    assert LABEL_NEEDS_BRYAN not in labels
    for base in LABEL_BASE:
        assert base in labels


def test_labels_with_flags_needs_bryan():
    labels = build_labels(3)
    assert LABEL_NEEDS_BRYAN in labels
    assert LABEL_AUTO_MERGE not in labels


def test_count_run_flags_zero_when_no_blocks(tmp_path: Path):
    rep = tmp_path / "2026-05-31.md"
    rep.write_text("---\nschema_version: 1\nrun_id: 2026-05-31\n---\n\nbody\n")
    assert count_run_flags(tmp_path, "2026-05-31") == 0


def test_count_run_flags_counts_broken_and_movers(tmp_path: Path):
    rep = tmp_path / "2026-05-31.md"
    rep.write_text(
        "---\n"
        "schema_version: 1\n"
        "run_id: 2026-05-31\n"
        "top_movers:\n"
        "  - prompt_id: p1\n"
        "    model: gpt-4o\n"
        "    score_change: -2\n"
        "    direction: degraded\n"
        "broken:\n"
        "  - prompt_id: p2\n"
        "    model: gpt-4o-mini\n"
        "  - prompt_id: p3\n"
        "    model: claude-haiku-4-5\n"
        "judge_flags:\n"
        "  - prompt_id: p4\n"
        "    model: claude-sonnet-4-6\n"
        "    primary_score: 6\n"
        "    cross_check_score: 9\n"
        "---\n"
        "\nbody\n"
    )
    assert count_run_flags(tmp_path, "2026-05-31") == 4


def test_count_run_flags_missing_report_is_zero(tmp_path: Path):
    assert count_run_flags(tmp_path, "9999-99-99") == 0


def test_build_pr_body_includes_report(tmp_path: Path):
    rep = tmp_path / "2026-05-31.md"
    rep.write_text("---\n---\n# Observatory body\n")
    body = build_pr_body("2026-05-31", tmp_path, flag_count=2)
    assert "Flags raised this run:** 2" in body
    assert "# Observatory body" in body
    assert "open_pr.py" in body
