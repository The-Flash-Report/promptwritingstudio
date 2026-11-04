#!/usr/bin/env python3
"""
Observatory Weekly Best-Mover Email

Reads the latest observatory run from data/observatory/runs/, finds the model+prompt
combination with the largest positive score_change, builds a deterministic email,
and pushes it to Resend as a draft broadcast to the PromptWritingStudio list (never
sent automatically -- Bryan reviews and sends from Resend). Moved off Kit 2026-11-04,
when Kit dropped to its free plan.

Usage:
    python3 scripts/observatory-email/send_weekly_email.py [--dry-run] [--run-id YYYY-MM-DD]

    --dry-run   Print would-send payload without making any HTTP calls (network-safe).
    --run-id    Override which run to use. Defaults to the most recent run.

Environment:
    RESEND_API_KEY        Resend API key. Required unless --dry-run.
    RESEND_SEGMENT_ID     Optional override for the PromptWritingStudio segment.

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

RESEND_BROADCASTS_URL = "https://api.resend.com/broadcasts"
# Resend segment "PromptWritingStudio · newsletter" and its topic, so the unsubscribe
# page scopes to this list instead of "Unsubscribe All".
PWS_SEGMENT_ID = "8758d410-436e-49f5-b20f-a0623a976242"
PWS_TOPIC_ID = "3efe3ee6-6f50-4621-a183-1e67aa7662b7"
FROM = "PromptWritingStudio <hello@send.promptwritingstudio.com>"
# Resend sits behind Cloudflare, which rejects some default client User-Agents.
USER_AGENT = "pws-observatory-email/1.0"

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

    # Resend needs the unsubscribe placeholder in the body; it adds nothing itself.
    return (
        f"<p>{commentary}</p>\n"
        f"\n"
        f"<p>The PWS AI Observatory runs weekly benchmarks across writing, analysis, "
        f"and code tasks to track how leading AI models perform on real prompts.</p>\n"
        f"\n"
        f"<p>See the full results: "
        f'<a href="{observatory_url}">{observatory_url}</a></p>'
        f"{vendor_block}"
        f"\n<p style=\"font-size:12px;color:#9ca3af\">Consistent Publishing Ltd, Landscape House, "
        f"Baldonnell Business Park, Dublin D22 P3K7, Ireland<br>"
        f'<a href="{{{{{{RESEND_UNSUBSCRIBE_URL}}}}}}" style="color:#9ca3af">Unsubscribe</a></p>'
    )


def create_resend_draft(api_key, subject, html_body):
    """Create a draft broadcast in Resend (send=false, so nothing goes out).

    Returns (success: bool, broadcast_id_or_error: str).
    """
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
    }
    payload = {
        "name": f"PWS Observatory: {subject}",
        "segment_id": os.environ.get("RESEND_SEGMENT_ID") or PWS_SEGMENT_ID,
        "topic_id": PWS_TOPIC_ID,
        "from": FROM,
        "subject": subject,
        "preview_text": subject[:150],
        "html": html_body,
    }
    try:
        resp = requests.post(RESEND_BROADCASTS_URL, json=payload, headers=headers, timeout=30)
        resp.raise_for_status()
        return True, str(resp.json().get("id", "unknown"))
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
            "segment_id": PWS_SEGMENT_ID,
            "topic_id": PWS_TOPIC_ID,
            "from": FROM,
            "subject": subject,
            "preview_text": subject[:150],
            "html": html_body,
        }
        print("DRY RUN -- would-send payload:")
        print(json.dumps(payload, indent=2))
        sys.exit(0)

    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        print(
            "HALT: RESEND_API_KEY not set.\n"
            "Add it via: gh secret set RESEND_API_KEY -R The-Flash-Report/promptwritingstudio",
            file=sys.stderr,
        )
        sys.exit(1)

    success, result = create_resend_draft(api_key, subject, html_body)
    if success:
        print(f"Resend draft created (ID: {result}). Review at https://resend.com/broadcasts/{result}")
        print("Bryan: review the draft and send it from Resend when ready.")
    else:
        print(f"Resend API error: {result}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
