#!/usr/bin/env python3
"""Stage 1: load + validate the prompt corpus.

Per contract §1: exits non-zero on schema violation (aborts run).
Emits a pipeline-state file the next scripts pick up.
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from _lib.errors import SchemaValidationError  # noqa: E402
from _lib.pipeline import (  # noqa: E402
    default_scratch_dir,
    state_path_for,
    utc_now_iso,
    write_state,
)
from _lib.schema import load_and_validate_prompt  # noqa: E402

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_PROMPTS_DIR = REPO_ROOT / "data" / "observatory" / "prompts"


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Load + validate prompt corpus")
    p.add_argument("--prompts-dir", type=Path, default=DEFAULT_PROMPTS_DIR)
    p.add_argument("--run-id", required=True, help="ISO date YYYY-MM-DD")
    p.add_argument("--state-file", type=Path, default=None,
                   help="Pipeline state file. Defaults to data/observatory/_scratch/<run-id>/state.json")
    return p.parse_args(argv)


def fetch_corpus(prompts_dir: Path) -> list[dict]:
    if not prompts_dir.exists():
        raise SchemaValidationError(f"prompts dir does not exist: {prompts_dir}")
    files = sorted(p for p in prompts_dir.glob("*.json"))
    if not files:
        raise SchemaValidationError(
            f"no prompts in corpus at {prompts_dir} — aborting (contract §7: empty corpus is fatal)"
        )
    corpus: list[dict] = []
    for f in files:
        try:
            corpus.append(load_and_validate_prompt(f))
        except SchemaValidationError as e:
            raise SchemaValidationError(f"{f.name}: {e}") from e
    return corpus


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    scratch = args.state_file.parent if args.state_file else default_scratch_dir(REPO_ROOT, args.run_id)
    state_file = args.state_file or state_path_for(scratch)

    try:
        corpus = fetch_corpus(args.prompts_dir)
    except SchemaValidationError as e:
        print(f"FATAL: {e}", file=sys.stderr)
        return 2

    state = {
        "run_id": args.run_id,
        "stage": "fetched",
        "started_at": utc_now_iso(),
        "corpus": corpus,
    }
    write_state(state_file, state)
    print(f"Loaded {len(corpus)} prompts; wrote state to {state_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
