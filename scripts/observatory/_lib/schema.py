"""JSON Schema loading + validation for prompts, runs, and report frontmatter.

Mirrors `~/.claude/support/prompt-observatory-contract.md` §4 (v1).
"""
from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator

from .errors import SchemaValidationError

REPO_ROOT = Path(__file__).resolve().parents[3]
SCHEMA_PATH = REPO_ROOT / "data" / "observatory" / "schema.json"


@lru_cache(maxsize=1)
def _root_schema() -> dict[str, Any]:
    return json.loads(SCHEMA_PATH.read_text())


def _subschema(name: str) -> dict[str, Any]:
    root = _root_schema()
    defs = root["$defs"]
    sub = dict(defs[name])
    sub["$defs"] = defs
    return sub


@lru_cache(maxsize=3)
def _validator(name: str) -> Draft202012Validator:
    return Draft202012Validator(_subschema(name))


def validate_prompt(obj: dict[str, Any]) -> None:
    _validate(obj, "prompt")


def validate_run(obj: dict[str, Any]) -> None:
    _validate(obj, "run")


def validate_report_frontmatter(obj: dict[str, Any]) -> None:
    _validate(obj, "report_frontmatter")


def _validate(obj: dict[str, Any], kind: str) -> None:
    validator = _validator(kind)
    errors = sorted(validator.iter_errors(obj), key=lambda e: list(e.absolute_path))
    if errors:
        joined = "; ".join(
            f"{'/'.join(str(p) for p in e.absolute_path) or '<root>'}: {e.message}"
            for e in errors
        )
        raise SchemaValidationError(f"{kind} schema violation — {joined}")


def load_and_validate_prompt(path: Path) -> dict[str, Any]:
    obj = json.loads(path.read_text())
    validate_prompt(obj)
    return obj
