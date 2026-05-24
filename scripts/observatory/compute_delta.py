#!/usr/bin/env python3
"""Stage 4: compute per-model delta vs the most recent previous run for each prompt.

Per contract §5.3:
  - score_change material: |delta| >= 2 (on the 0-9 scale)
  - output_diff_ratio material: >= 0.30 (Jaccard distance on tokenised output)
  - either condition → `flagged: true`

A prompt with no previous run gets `delta_vs_previous_run = null`.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _lib.pipeline import (  # noqa: E402
    default_scratch_dir,
    load_state,
    state_path_for,
    write_state,
)

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_RUNS_DIR = REPO_ROOT / "data" / "observatory" / "runs"

SCORE_CHANGE_FLAG_THRESHOLD = 2
OUTPUT_DIFF_FLAG_THRESHOLD = 0.30
_TOKEN_RE = re.compile(r"[A-Za-z0-9_]+")


def tokenize(text: str) -> set[str]:
    return set(t.lower() for t in _TOKEN_RE.findall(text or ""))


def jaccard_distance(a: str, b: str) -> float:
    """1 - |A ∩ B| / |A ∪ B|. Empty-vs-empty == 0 (identical); empty-vs-non-empty == 1."""
    ta, tb = tokenize(a), tokenize(b)
    if not ta and not tb:
        return 0.0
    union = ta | tb
    if not union:
        return 0.0
    inter = ta & tb
    return round(1.0 - (len(inter) / len(union)), 6)


def find_previous_run(runs_dir: Path, current_run_id: str, prompt_id: str) -> tuple[str | None, dict[str, Any] | None]:
    """Return (previous_run_id, parsed_run_obj) for the most recent run before current_run_id with this prompt."""
    if not runs_dir.exists():
        return None, None
    candidates = sorted(
        (d for d in runs_dir.iterdir() if d.is_dir() and d.name < current_run_id and _is_iso_date(d.name)),
        reverse=True,
    )
    for d in candidates:
        f = d / f"{prompt_id}.json"
        if f.exists():
            try:
                return d.name, json.loads(f.read_text())
            except json.JSONDecodeError:
                continue
    return None, None


def _is_iso_date(name: str) -> bool:
    return bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", name))


def _flatten_outputs(run_obj: dict[str, Any]) -> dict[tuple[str, str], dict[str, Any]]:
    """Index a run by (test_input_id, model) → {output, total_score}."""
    out: dict[tuple[str, str], dict[str, Any]] = {}
    for input_entry in run_obj.get("results_by_input", []):
        tid = input_entry.get("test_input_id")
        for mr in input_entry.get("results_by_model", []):
            model = mr.get("model")
            judge = (mr.get("judge") or {}).get("primary")
            total = judge["total"] if judge else None
            out[(tid, model)] = {
                "output": mr.get("output", "") or "",
                "total": total,
            }
    return out


def compute_delta_for_prompt(current: dict[str, Any], previous: dict[str, Any], previous_run_id: str) -> dict[str, Any]:
    cur_idx = _flatten_outputs(current)
    prev_idx = _flatten_outputs(previous)

    by_model: dict[str, dict[str, Any]] = {}
    for (tid, model), cur in cur_idx.items():
        if (tid, model) not in prev_idx:
            continue
        prev = prev_idx[(tid, model)]
        score_change = 0
        if cur["total"] is not None and prev["total"] is not None:
            score_change = int(cur["total"] - prev["total"])
        odr = jaccard_distance(cur["output"], prev["output"])
        flagged = (abs(score_change) >= SCORE_CHANGE_FLAG_THRESHOLD) or (odr >= OUTPUT_DIFF_FLAG_THRESHOLD)
        # If a model has multiple test_inputs, keep the worst delta (highest |score_change|,
        # then highest odr) so the report surfaces the loudest regression.
        existing = by_model.get(model)
        if existing is None or _is_worse(score_change, odr, existing["score_change"], existing["output_diff_ratio"]):
            by_model[model] = {
                "score_change": score_change,
                "output_diff_ratio": odr,
                "flagged": flagged,
            }
    return {"previous_run_id": previous_run_id, "by_model": by_model}


def _is_worse(new_change: int, new_odr: float, old_change: int, old_odr: float) -> bool:
    if abs(new_change) != abs(old_change):
        return abs(new_change) > abs(old_change)
    return new_odr > old_odr


def compute_all_deltas(state: dict[str, Any], runs_dir: Path) -> dict[str, Any]:
    run_id = state["run_id"]
    for prompt_entry in state.get("raw_results", []):
        prompt_id = prompt_entry["prompt_id"]
        # Build a synthetic "current run" object shaped like a written run so the
        # comparator function works against both in-flight and historical data.
        current_run_obj = {
            "results_by_input": prompt_entry["results_by_input"],
        }
        prev_id, prev_obj = find_previous_run(runs_dir, run_id, prompt_id)
        if prev_id is None or prev_obj is None:
            prompt_entry["delta_vs_previous_run"] = None
        else:
            prompt_entry["delta_vs_previous_run"] = compute_delta_for_prompt(
                current_run_obj, prev_obj, prev_id
            )
    state["stage"] = "delta_computed"
    return state


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--run-id", required=True)
    p.add_argument("--state-file", type=Path, default=None)
    p.add_argument("--runs-dir", type=Path, default=DEFAULT_RUNS_DIR)
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    scratch = args.state_file.parent if args.state_file else default_scratch_dir(REPO_ROOT, args.run_id)
    state_file = args.state_file or state_path_for(scratch)
    state = load_state(state_file)
    state = compute_all_deltas(state, args.runs_dir)
    write_state(state_file, state)
    print(f"Computed deltas for {len(state.get('raw_results', []))} prompts.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
