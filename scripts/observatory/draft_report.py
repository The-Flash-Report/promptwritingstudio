#!/usr/bin/env python3
"""Stage 6: render the deterministic weekly report.

NO LLM CALL. Pure template render — given the same inputs, identical bytes.
`generated_at` is a required argument so tests can assert byte-identity.

Inputs:
  - data/observatory/runs/<run-id>/*.json  (just-written by write_runs.py)
  - data/observatory/runs/<prev-id>/*.json  (for newly_passing / broken diff)
  - data/observatory/judge-flags.json       (filtered to this run_id)
Output:
  - data/observatory/reports/<run-id>.md   (YAML frontmatter + markdown body)
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, str(Path(__file__).resolve().parent))

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_RUNS_DIR = REPO_ROOT / "data" / "observatory" / "runs"
DEFAULT_REPORTS_DIR = REPO_ROOT / "data" / "observatory" / "reports"
DEFAULT_JUDGE_FLAGS = REPO_ROOT / "data" / "observatory" / "judge-flags.json"

TOP_MOVERS_LIMIT = 10


def load_run_dir(run_dir: Path) -> list[dict[str, Any]]:
    if not run_dir.exists():
        return []
    files = sorted(run_dir.glob("*.json"))
    return [json.loads(f.read_text()) for f in files]


def _pass_index(run_obj: dict[str, Any]) -> dict[tuple[str, str], bool]:
    out: dict[tuple[str, str], bool] = {}
    for input_entry in run_obj.get("results_by_input", []):
        tid = input_entry["test_input_id"]
        for mr in input_entry["results_by_model"]:
            primary = (mr.get("judge") or {}).get("primary")
            if primary is None:
                continue
            out[(tid, mr["model"])] = bool(primary.get("pass"))
    return out


def compute_frontmatter(
    *,
    run_id: str,
    generated_at: str,
    current_runs: list[dict[str, Any]],
    previous_runs_by_prompt: dict[str, dict[str, Any]],
    judge_flags_for_run: list[dict[str, Any]],
) -> dict[str, Any]:
    total_prompts = len(current_runs)
    total_models = 0
    total_calls = 0
    total_cost = 0.0
    seen_models: set[str] = set()
    top_movers: list[dict[str, Any]] = []
    broken: list[dict[str, Any]] = []
    newly_passing: list[dict[str, Any]] = []

    for run_obj in current_runs:
        totals = run_obj.get("totals", {})
        total_calls += int(totals.get("calls", 0))
        total_cost += float(totals.get("cost_usd", 0.0))

        for input_entry in run_obj.get("results_by_input", []):
            for mr in input_entry["results_by_model"]:
                seen_models.add(mr["model"])

        # Pass/fail diff vs previous
        prev_obj = previous_runs_by_prompt.get(run_obj["prompt_id"])
        if prev_obj is not None:
            prev_idx = _pass_index(prev_obj)
            curr_idx = _pass_index(run_obj)
            # broken / newly_passing keyed by (prompt_id, model) — collapse multiple
            # test_inputs by treating "any input flipped" as the signal.
            flipped_to_fail: set[str] = set()
            flipped_to_pass: set[str] = set()
            for (tid, model), curr_pass in curr_idx.items():
                if (tid, model) not in prev_idx:
                    continue
                prev_pass = prev_idx[(tid, model)]
                if prev_pass and not curr_pass:
                    flipped_to_fail.add(model)
                elif not prev_pass and curr_pass:
                    flipped_to_pass.add(model)
            for model in sorted(flipped_to_fail):
                broken.append({"prompt_id": run_obj["prompt_id"], "model": model})
            for model in sorted(flipped_to_pass):
                newly_passing.append({"prompt_id": run_obj["prompt_id"], "model": model})

        # Top movers from delta_vs_previous_run
        delta = run_obj.get("delta_vs_previous_run")
        if delta and isinstance(delta, dict):
            for model in sorted(delta.get("by_model", {}).keys()):
                entry = delta["by_model"][model]
                sc = int(entry.get("score_change", 0))
                if abs(sc) >= 2:
                    top_movers.append({
                        "prompt_id": run_obj["prompt_id"],
                        "model": model,
                        "score_change": sc,
                        "direction": "improved" if sc > 0 else "degraded",
                    })

    total_models = len(seen_models)
    # Sort top_movers by |score_change| descending, then prompt_id/model for stability
    top_movers.sort(key=lambda e: (-abs(e["score_change"]), e["prompt_id"], e["model"]))
    top_movers = top_movers[:TOP_MOVERS_LIMIT]

    broken.sort(key=lambda e: (e["prompt_id"], e["model"]))
    newly_passing.sort(key=lambda e: (e["prompt_id"], e["model"]))

    judge_flags_block: list[dict[str, Any]] = []
    for f in judge_flags_for_run:
        if f.get("kind") != "cross_check_disagreement":
            continue
        judge_flags_block.append({
            "prompt_id": f["prompt_id"],
            "model": f["model"],
            "primary_score": int(f.get("primary_score") or 0),
            "cross_check_score": int(f.get("cross_check_score") or 0),
        })
    judge_flags_block.sort(key=lambda e: (e["prompt_id"], e["model"]))

    fm: dict[str, Any] = {
        "schema_version": 1,
        "run_id": run_id,
        "generated_at": generated_at,
        "total_prompts_run": total_prompts,
        "total_models": total_models,
        "total_calls": total_calls,
        "total_cost_usd": round(total_cost, 6),
    }
    if top_movers:
        fm["top_movers"] = top_movers
    if broken:
        fm["broken"] = broken
    if newly_passing:
        fm["newly_passing"] = newly_passing
    if judge_flags_block:
        fm["judge_flags"] = judge_flags_block
    return fm


def render_frontmatter_yaml(fm: dict[str, Any]) -> str:
    """Tiny deterministic YAML emitter — only the shapes this report uses.

    Avoids a PyYAML dep; output is stable and the schema is small. Lines and
    list items are emitted in a fixed key order for byte-identical output.
    """
    KEY_ORDER = [
        "schema_version", "run_id", "generated_at",
        "total_prompts_run", "total_models", "total_calls", "total_cost_usd",
        "top_movers", "broken", "newly_passing", "judge_flags",
    ]
    LIST_KEY_ORDERS = {
        "top_movers": ["prompt_id", "model", "score_change", "direction"],
        "broken": ["prompt_id", "model"],
        "newly_passing": ["prompt_id", "model"],
        "judge_flags": ["prompt_id", "model", "primary_score", "cross_check_score"],
    }
    lines: list[str] = ["---"]
    for k in KEY_ORDER:
        if k not in fm:
            continue
        v = fm[k]
        if isinstance(v, list):
            if not v:
                continue
            lines.append(f"{k}:")
            order = LIST_KEY_ORDERS.get(k, sorted(v[0].keys()) if v else [])
            for item in v:
                first = True
                for ik in order:
                    if ik not in item:
                        continue
                    prefix = "  - " if first else "    "
                    lines.append(f"{prefix}{ik}: {_scalar(item[ik])}")
                    first = False
        else:
            lines.append(f"{k}: {_scalar(v)}")
    lines.append("---")
    return "\n".join(lines) + "\n"


def _scalar(v: Any) -> str:
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    s = str(v)
    # Quote ISO datetimes (contain ':') so YAML doesn't parse them as a map.
    if ":" in s or s != s.strip():
        return json.dumps(s)
    return s


def render_body(run_id: str, fm: dict[str, Any]) -> str:
    """Plain-English narrative — deterministic, no LLM."""
    lines: list[str] = []
    lines.append(f"# Observatory Run — {run_id}")
    lines.append("")
    lines.append(
        f"This run executed **{fm['total_prompts_run']}** prompt(s) across "
        f"**{fm['total_models']}** model(s) ({fm['total_calls']} model call(s)). "
        f"Spend for this run: **${fm['total_cost_usd']:.4f}**."
    )
    lines.append("")

    movers = fm.get("top_movers", [])
    if movers:
        lines.append("## Top movers vs previous run")
        lines.append("")
        lines.append("| Prompt | Model | Score Δ | Direction |")
        lines.append("|---|---|---:|---|")
        for m in movers:
            sign = "+" if m["score_change"] > 0 else ""
            lines.append(f"| `{m['prompt_id']}` | `{m['model']}` | {sign}{m['score_change']} | {m['direction']} |")
        lines.append("")

    broken = fm.get("broken", [])
    if broken:
        lines.append("## Newly failing (was pass, now fail)")
        lines.append("")
        for b in broken:
            lines.append(f"- `{b['prompt_id']}` × `{b['model']}`")
        lines.append("")

    newly_pass = fm.get("newly_passing", [])
    if newly_pass:
        lines.append("## Newly passing (was fail, now pass)")
        lines.append("")
        for n in newly_pass:
            lines.append(f"- `{n['prompt_id']}` × `{n['model']}`")
        lines.append("")

    flags = fm.get("judge_flags", [])
    if flags:
        lines.append("## Judge cross-check disagreements")
        lines.append("")
        lines.append("| Prompt | Model | Primary | Cross-check |")
        lines.append("|---|---|---:|---:|")
        for f in flags:
            lines.append(f"| `{f['prompt_id']}` | `{f['model']}` | {f['primary_score']} | {f['cross_check_score']} |")
        lines.append("")

    if not (movers or broken or newly_pass or flags):
        lines.append("No material changes vs the previous run. All flagged thresholds quiet.")
        lines.append("")

    return "\n".join(lines)


def load_judge_flags_for_run(path: Path, run_id: str) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError:
        return []
    if not isinstance(data, list):
        return []
    return [f for f in data if f.get("run_id") == run_id]


def load_previous_runs(runs_dir: Path, current_runs: list[dict[str, Any]]) -> dict[str, dict[str, Any]]:
    out: dict[str, dict[str, Any]] = {}
    for run_obj in current_runs:
        delta = run_obj.get("delta_vs_previous_run")
        if not delta:
            continue
        prev_id = delta.get("previous_run_id")
        if not prev_id:
            continue
        f = runs_dir / prev_id / f"{run_obj['prompt_id']}.json"
        if f.exists():
            try:
                out[run_obj["prompt_id"]] = json.loads(f.read_text())
            except json.JSONDecodeError:
                continue
    return out


def render_report(
    *,
    run_id: str,
    generated_at: str,
    runs_dir: Path,
    judge_flags_path: Path,
) -> str:
    current_runs = load_run_dir(runs_dir / run_id)
    if not current_runs:
        raise SystemExit(f"no run files at {runs_dir / run_id}")
    previous_by_prompt = load_previous_runs(runs_dir, current_runs)
    flags = load_judge_flags_for_run(judge_flags_path, run_id)
    fm = compute_frontmatter(
        run_id=run_id,
        generated_at=generated_at,
        current_runs=current_runs,
        previous_runs_by_prompt=previous_by_prompt,
        judge_flags_for_run=flags,
    )
    return render_frontmatter_yaml(fm) + "\n" + render_body(run_id, fm)


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser()
    p.add_argument("--run-id", required=True)
    p.add_argument("--generated-at", required=True, help="ISO-8601 UTC timestamp; deterministic input")
    p.add_argument("--runs-dir", type=Path, default=DEFAULT_RUNS_DIR)
    p.add_argument("--reports-dir", type=Path, default=DEFAULT_REPORTS_DIR)
    p.add_argument("--judge-flags", type=Path, default=DEFAULT_JUDGE_FLAGS)
    p.add_argument("--out", type=Path, default=None, help="Override output path")
    return p.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    body = render_report(
        run_id=args.run_id,
        generated_at=args.generated_at,
        runs_dir=args.runs_dir,
        judge_flags_path=args.judge_flags,
    )
    out = args.out or (args.reports_dir / f"{args.run_id}.md")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(body)
    print(f"Wrote report {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
