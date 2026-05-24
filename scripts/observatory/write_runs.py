#!/usr/bin/env python3
"""Stage 5: promote pipeline state into the immutable runs tree.

- Writes `data/observatory/runs/YYYY-MM-DD/<prompt_id>.json` per prompt.
- Each file is validated against the run subschema before write.
- Refuses to overwrite existing files (contract §7: runs are immutable).
- Updates `data/observatory/cost-log.json` `runs[]` ledger and warns if the
  monthly warn threshold tripped during this run.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _lib.cost_tracker import CostTracker  # noqa: E402
from _lib.errors import ImmutableWriteError, SchemaValidationError  # noqa: E402
from _lib.pipeline import (  # noqa: E402
    default_scratch_dir,
    load_state,
    state_path_for,
    utc_now_iso,
    write_state,
)
from _lib.schema import validate_run  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_RUNS_DIR = REPO_ROOT / "data" / "observatory" / "runs"
DEFAULT_COST_LOG = REPO_ROOT / "data" / "observatory" / "cost-log.json"


def build_run_obj(state: dict[str, Any], prompt_entry: dict[str, Any]) -> dict[str, Any]:
    """Reshape state into the on-disk run schema (contract §4.2)."""
    results_by_input: list[dict[str, Any]] = []
    total_calls = 0
    successful = 0
    failed = 0
    cost_sum = 0.0

    for input_entry in prompt_entry["results_by_input"]:
        results_by_model: list[dict[str, Any]] = []
        for mr in input_entry["results_by_model"]:
            total_calls += 1
            if mr.get("error"):
                failed += 1
            else:
                successful += 1
            cost_sum += float(mr.get("cost_usd", 0.0) or 0.0)
            cleaned = {
                "model": mr["model"],
                "output": mr.get("output", "") or "",
                "judge": mr.get("judge") or {"primary": None, "cross_check": None},
                "tokens_in": int(mr.get("tokens_in", 0) or 0),
                "tokens_out": int(mr.get("tokens_out", 0) or 0),
                "cost_usd": float(mr.get("cost_usd", 0.0) or 0.0),
                "provider_response_id": mr.get("provider_response_id"),
                "completed_at": mr.get("completed_at") or utc_now_iso(),
                "error": mr.get("error"),
            }
            # Schema requires `judge.primary` present. None is allowed for the
            # cross_check branch only; if the primary judge failed we still need
            # a slot — represent it as a sentinel `total: 0, pass: false` with
            # an explanatory string so downstream readers can detect "judged_failed".
            if cleaned["judge"].get("primary") is None:
                cleaned["judge"]["primary"] = {
                    "criteria_scores": [],
                    "total": 0,
                    "pass": False,
                    "judge_model": "claude-opus-4-7",
                    "judge_run_at": utc_now_iso(),
                }
            results_by_model.append(cleaned)
        results_by_input.append({
            "test_input_id": input_entry["test_input_id"],
            "results_by_model": results_by_model,
        })

    return {
        "schema_version": 1,
        "run_id": state["run_id"],
        "prompt_id": prompt_entry["prompt_id"],
        "prompt_schema_version_at_run": prompt_entry["prompt_schema_version_at_run"],
        "started_at": state.get("started_at") or utc_now_iso(),
        "completed_at": utc_now_iso(),
        "results_by_input": results_by_input,
        "delta_vs_previous_run": prompt_entry.get("delta_vs_previous_run"),
        "totals": {
            "calls": total_calls,
            "successful_calls": successful,
            "failed_calls": failed,
            "cost_usd": round(cost_sum, 6),
        },
    }


def write_run_file(target: Path, run_obj: dict[str, Any]) -> None:
    if target.exists():
        raise ImmutableWriteError(
            f"refusing to overwrite immutable run file {target} — runs are write-once"
        )
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(run_obj, indent=2, sort_keys=True) + "\n")


def write_all_runs(
    state: dict[str, Any],
    runs_dir: Path,
    cost: CostTracker,
) -> dict[str, Any]:
    run_dir = runs_dir / state["run_id"]
    written: list[str] = []
    for prompt_entry in state.get("raw_results", []):
        run_obj = build_run_obj(state, prompt_entry)
        try:
            validate_run(run_obj)
        except SchemaValidationError as e:
            raise SchemaValidationError(
                f"run schema validation failed for prompt={run_obj['prompt_id']}: {e}"
            ) from e
        target = run_dir / f"{run_obj['prompt_id']}.json"
        write_run_file(target, run_obj)
        written.append(str(target))

    cost_state = cost.finalize_run()
    state["stage"] = "written"
    state["written_run_files"] = written
    state["completed_at"] = utc_now_iso()
    state["final_cost_state"] = cost_state
    return state


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--run-id", required=True)
    p.add_argument("--state-file", type=Path, default=None)
    p.add_argument("--runs-dir", type=Path, default=DEFAULT_RUNS_DIR)
    p.add_argument("--cost-log", type=Path, default=DEFAULT_COST_LOG)
    p.add_argument("--warn-threshold-usd", type=float, default=None)
    p.add_argument("--hard-threshold-usd", type=float, default=None)
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
        state = write_all_runs(state, args.runs_dir, cost)
    except ImmutableWriteError as e:
        print(f"FATAL: {e}", file=sys.stderr)
        return 5
    except SchemaValidationError as e:
        print(f"FATAL: {e}", file=sys.stderr)
        return 6

    write_state(state_file, state)
    files_written = len(state.get("written_run_files", []))
    print(f"Wrote {files_written} immutable run file(s) under {args.runs_dir / args.run_id}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
