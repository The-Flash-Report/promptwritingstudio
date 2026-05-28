#!/usr/bin/env python3
"""
Observatory Weekly Best-Mover Email

Reads the latest observatory run from data/observatory/runs/, finds the model+prompt
combination with the largest positive score_change, builds a deterministic email,
and pushes it to Kit as a draft broadcast (no send_at -- Bryan schedules manually).

Usage:
    python3 scripts/observatory-email/send_weekly_email.py [--dry-run] [--run-id YYYY-MM-DD]

    --dry-run   Print would-send payload without making any HTTP calls (network-safe).
    --run-id    Override which run to use. Defaults to the most recent run.

Environment:
    CONVERTKIT_API_SECRET  Kit API secret. Required unless --dry-run.

Exit codes:
    0  Success or deliberate skip (no mover above threshold, no runs).
    1  Error (missing credentials, API failure, bad args).
"""

import os
import sys
import json
import argparse
import requests
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
RUNS_DIR = REPO_ROOT / "data" / "observatory" / "runs"
PROMPTS_DIR = REPO_ROOT / "data" / "observatory" / "prompts"
CONFIG_PATH = REPO_ROOT / "config" / "observatory-email.json"

KIT_API_URL = "https://api.kit.com/v4/broadcasts"

# Deterministic commentary by score_change magnitude (integers only per schema).
# Threshold is 2, so score_change is always >= 2 when this is called.
def analyst_commentary(model_name, score_change, prompt_title):
    if score_change >= 4:
        return (
            f"{model_name} posted a strong {score_change}-point gain on {prompt_title} "
            "-- one of the larger single-week jumps tracked by the Observatory."
        )
    if score_change >= 2:
        return (
            f"{model_name} gained {score_change} points on {prompt_title} "
            "this week, the largest movement in the latest Observatory run."
        )
    # score_change == 1 should not reach here (threshold is 2), but kept for safety
    return (
        f"{model_name} edged ahead on {prompt_title} with a 1-point improvement."
    )


def load_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)


def list_run_dates():
    if not RUNS_DIR.exists():
        return []
    return sorted(
        [d.name for d in RUNS_DIR.iterdir()
         if d.is_dir() and len(d.name) == 10 and d.name.count("-") == 2],
        reverse=True,
    )


def load_run_files(run_date):
    run_dir = RUNS_DIR / run_date
    runs = []
    for f in sorted(run_dir.glob("*.json")):
        if f.name == "_index.json":
            continue
        with open(f) as fp:
            runs.append(json.load(fp))
    return runs


def load_prompt(prompt_id):
    prompt_file = PROMPTS_DIR / f"{prompt_id}.json"
    if not prompt_file.exists():
        return None
    with open(prompt_file) as f:
        return json.load(f)


def find_best_mover(run_files, threshold):
    """Return the model+prompt with the largest positive score_change > threshold, or None."""
    best = None
    best_change = threshold

    for run in run_files:
        delta = run.get("delta_vs_previous_run")
        if not delta:
            continue
        prompt_id = run["prompt_id"]
        for model, stats in delta["by_model"].items():
            sc = stats["score_change"]
            if sc > best_change:
                best_change = sc
                best = {
                    "model": model,
                    "prompt_id": prompt_id,
                    "score_change": sc,
                    "previous_run_id": delta["previous_run_id"],
                }

    return best


def render_subject(model_name):
    # Max length check: longest display name is "Gemini 2.5 Flash" (16 chars)
    # "Gemini 2.5 Flash led this week's AI Observatory" = 48 chars -- under 60
    return f"{model_name} led this week's AI Observatory"


def render_html(model_name, score_change, prompt_title, observatory_url, vendor_link):
    commentary = analyst_commentary(model_name, score_change, prompt_title)

    vendor_block = ""
    if vendor_link:
        vendor_block = (
            f'\n<p>Compare {model_name} with alternatives: '
            f'<a href="{vendor_link}">{vendor_link}</a></p>'
        )

    # Kit adds its own unsubscribe footer to all broadcasts automatically.
    return (
        f"<p>{commentary}</p>\n"
        f"\n"
        f"<p>The PWS AI Observatory runs weekly benchmarks across writing, analysis, "
        f"and code tasks to track how leading AI models perform on real prompts.</p>\n"
        f"\n"
        f"<p>See the full results: "
        f'<a href="{observatory_url}">{observatory_url}</a></p>'
        f"{vendor_block}"
    )


def create_kit_draft(api_key, subject, html_body):
    """Push a draft broadcast to Kit (no send_at -- draft only).

    Returns (success: bool, broadcast_id_or_error: str).
    """
    headers = {
        "X-Kit-Api-Key": api_key,
        "Content-Type": "application/json",
    }
    payload = {
        "subject": subject,
        "content": html_body,
        "description": subject,
        "preview_text": subject[:150],
        "public": True,
        "subscriber_filter": [{"all": None, "any": None, "none": None}],
        # No send_at -- Bryan reviews and schedules the draft manually.
    }
    try:
        resp = requests.post(KIT_API_URL, json=payload, headers=headers, timeout=30)
        resp.raise_for_status()
        broadcast_id = resp.json().get("broadcast", {}).get("id", "unknown")
        return True, str(broadcast_id)
    except requests.exceptions.RequestException as e:
        detail = ""
        if hasattr(e, "response") and e.response is not None:
            detail = f": {e.response.text[:300]}"
        return False, f"{e}{detail}"


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--dry-run", action="store_true",
                        help="Print payload without any HTTP calls (network-safe).")
    parser.add_argument("--run-id", metavar="YYYY-MM-DD",
                        help="Override run date. Defaults to latest available run.")
    args = parser.parse_args()

    config = load_config()
    threshold = config.get("significance_threshold", 2)
    observatory_url = config.get("observatory_url", "https://promptwritingstudio.com/observatory")

    run_dates = list_run_dates()
    if not run_dates:
        print("No observatory runs found -- skipping email.")
        sys.exit(0)

    run_id = args.run_id or run_dates[0]
    if run_id not in run_dates:
        print(f"Run {run_id} not found. Available: {run_dates[:5]}", file=sys.stderr)
        sys.exit(1)

    run_files = load_run_files(run_id)
    if not run_files:
        print(f"No run files for {run_id} -- skipping email.")
        sys.exit(0)

    best = find_best_mover(run_files, threshold)
    if not best:
        print(
            f"No model exceeded threshold ({threshold}) in run {run_id} -- no email sent."
        )
        sys.exit(0)

    model_id = best["model"]
    model_name = config.get("model_display_names", {}).get(model_id, model_id)
    score_change = best["score_change"]
    prompt_id = best["prompt_id"]

    prompt = load_prompt(prompt_id)
    prompt_title = prompt["title"] if prompt else prompt_id

    vendor_link = (
        config.get("model_vendor_links", {}).get(model_id)
        or config.get("vendors_ie_fallback_url", "")
    )

    subject = render_subject(model_name)
    html_body = render_html(model_name, score_change, prompt_title, observatory_url, vendor_link)

    print(f"Run: {run_id}")
    print(f"Best mover: {model_name} (+{score_change} pts) on '{prompt_title}'")
    print(f"Subject ({len(subject)} chars): {subject}")
    print()

    if args.dry_run:
        # Dry-run: no HTTP calls made beyond this point.
        payload = {
            "subject": subject,
            "content": html_body,
            "description": subject,
            "preview_text": subject[:150],
            "public": True,
            "subscriber_filter": [{"all": None, "any": None, "none": None}],
        }
        print("DRY RUN -- would-send payload:")
        print(json.dumps(payload, indent=2))
        sys.exit(0)

    api_key = os.environ.get("CONVERTKIT_API_SECRET")
    if not api_key:
        print(
            "HALT: CONVERTKIT_API_SECRET not set.\n"
            "Add it via: gh secret set CONVERTKIT_API_SECRET\n"
            "Use the same Kit API key as ~/src/zettelkasten/scripts/schedule-newsletter.py.",
            file=sys.stderr,
        )
        sys.exit(1)

    success, result = create_kit_draft(api_key, subject, html_body)
    if success:
        print(f"Kit draft created (ID: {result}). Review at https://app.kit.com/broadcasts")
        print("Bryan: open the draft, add send_at, and publish when ready.")
    else:
        print(f"Kit API error: {result}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
