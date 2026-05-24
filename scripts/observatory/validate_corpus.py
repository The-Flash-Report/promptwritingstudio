#!/usr/bin/env python3
"""
CLI validator for the PWS Prompt Observatory corpus.
Validates every JSON file in data/observatory/prompts/ against the
prompt subschema in data/observatory/schema.json.

Exit 0 = all prompts valid.
Exit 1 = one or more validation errors (details printed to stderr).

Usage:
    python3 scripts/observatory/validate_corpus.py
    python3 scripts/observatory/validate_corpus.py --prompts-dir path/to/prompts
"""

import argparse
import json
import sys
from pathlib import Path

try:
    import jsonschema
    from jsonschema import Draft202012Validator
except ImportError:
    print(
        "ERROR: jsonschema is not installed. Run: pip install jsonschema",
        file=sys.stderr,
    )
    sys.exit(2)


def load_schema(schema_path: Path) -> dict:
    with open(schema_path) as f:
        return json.load(f)


def build_prompt_validator(schema: dict) -> Draft202012Validator:
    """Wrap the $defs.prompt subschema so refs resolve correctly."""
    prompt_schema = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$defs": schema["$defs"],
        "$ref": "#/$defs/prompt",
    }
    return Draft202012Validator(prompt_schema)


def validate_file(path: Path, validator: Draft202012Validator) -> list[str]:
    """Return list of error messages for a single prompt file."""
    try:
        with open(path) as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        return [f"Invalid JSON: {e}"]

    errors = sorted(validator.iter_errors(data), key=lambda e: e.path)
    return [f"{'.'.join(str(p) for p in e.absolute_path) or '<root>'}: {e.message}" for e in errors]


def main() -> int:
    repo_root = Path(__file__).resolve().parent.parent.parent

    parser = argparse.ArgumentParser(description="Validate PWS Observatory prompt corpus")
    parser.add_argument(
        "--prompts-dir",
        type=Path,
        default=repo_root / "data" / "observatory" / "prompts",
        help="Directory containing prompt JSON files",
    )
    parser.add_argument(
        "--schema",
        type=Path,
        default=repo_root / "data" / "observatory" / "schema.json",
        help="Path to the observatory schema.json",
    )
    args = parser.parse_args()

    if not args.schema.exists():
        print(f"ERROR: schema not found at {args.schema}", file=sys.stderr)
        return 1

    if not args.prompts_dir.exists():
        print(f"ERROR: prompts directory not found at {args.prompts_dir}", file=sys.stderr)
        return 1

    schema = load_schema(args.schema)
    validator = build_prompt_validator(schema)

    prompt_files = sorted(args.prompts_dir.glob("*.json"))
    if not prompt_files:
        print(f"ERROR: no prompt JSON files found in {args.prompts_dir}", file=sys.stderr)
        return 1

    failed = 0
    for path in prompt_files:
        errors = validate_file(path, validator)
        if errors:
            failed += 1
            print(f"FAIL  {path.name}", file=sys.stderr)
            for err in errors:
                print(f"      {err}", file=sys.stderr)
        else:
            print(f"OK    {path.name}")

    total = len(prompt_files)
    passed = total - failed
    print(f"\n{passed}/{total} prompts valid", file=sys.stderr if failed else sys.stdout)

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
