"""Pipeline state — the shared file each script reads + mutates.

State lives under `<state_dir>/state.json` (default: `data/observatory/_scratch/<run_id>/state.json`).
Each script enriches it stage by stage. `write_runs.py` is the only script
that promotes state into the immutable `data/observatory/runs/YYYY-MM-DD/` tree.
"""
from __future__ import annotations

import json
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def default_scratch_dir(repo_root: Path, run_id: str) -> Path:
    return repo_root / "data" / "observatory" / "_scratch" / run_id


def state_path_for(scratch_dir: Path) -> Path:
    return scratch_dir / "state.json"


def load_state(state_file: Path) -> dict[str, Any]:
    return json.loads(state_file.read_text())


def write_state(state_file: Path, state: dict[str, Any]) -> None:
    state_file.parent.mkdir(parents=True, exist_ok=True)
    state_file.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n")
