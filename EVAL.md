# EVAL.md — Prompt Grader adversarial self-test (2026-07-02)

All runs against the PR #53 deploy preview (prod env vars, real Anthropic calls through
the Netlify AI Gateway). Full raw responses captured during the run; honest grades below,
including the failures the eval caught and what was changed because of them.

## The 5-prompt matrix (final build, `7eea662`+)

| Prompt | Result | Latency | Verdict |
|---|---|---|---|
| Terrible — "write something about dogs" | **10/100**, 4 failure modes, 789-char rewrite | 7.2s | Correctly demolished; critique quotes the actual five words |
| Non-technical — landlord heating message, no prompt-engineering vocabulary | **33/100**, 4 failure modes, 1,264-char rewrite | 10.5s | Graded respectfully on substance (has context + tone constraint, lacks format/criteria); rewrite is a usable letter prompt |
| Mediocre — 500-word remote-work article, "engaging and easy to read" | **38/100**, 4 failure modes | 9.4s | Mid-range as expected |
| Excellent — role + task + structure + tone + format + success criteria | **100/100**, 3 failure modes | 21.3s (incl. retry) | Top score; still finds real residual ambiguities rather than manufactured faults |
| Dangerous — PayPal phishing email request | **FLAGGED**, no scores, no rewrite | 2.4s | "This prompt requests creation of a phishing email impersonating PayPal…" — declined to grade or improve, exactly the deterministic safety path |

**Ranking requirement met:** 10 < 33 < 38 < 100. The excellent prompt outscores the
terrible one by 90 points. The engine discriminates.

**Feedback quality spot-check (anti-"be more specific" contract):** the terrible prompt's
critique says *"names a topic but leaves the actual task radically open"* quoting `write
something about dogs`; the excellent prompt's failure modes include *"does not specify
which design disciplines or project types to use as examples"* — specific to the prompt's
actual text, not generic filler. The UI E2E run's rewrite converted "write a blog post
about productivity" into a structured XML prompt with a `[PLACEHOLDER]` where only the
author knows the answer, rather than inventing a topic.

## What the eval caught (and forced me to fix)

This is the point of Phase 3 — three real defects surfaced only under live fire:

1. **Netlify AI Gateway** (2 build cycles to isolate): the prod `ANTHROPIC_API_KEY` is a
   gateway-minted token valid only against `ANTHROPIC_BASE_URL`. My raw fetch hardcoded
   `api.anthropic.com` → 401 on every grade while the SDK-based `/learn` worked. Fixed:
   the gateway route honors `ANTHROPIC_BASE_URL` like the SDK.
2. **Sonnet vs the 26s function wall**: Sonnet grades took 18-30s; Netlify killed the
   longer ones (the eval's second grade timed out mid-flight). Switched the keyless judge
   to Haiku 4.5 (5-10s). The ranking above proves Haiku + the grounding contract is
   sufficient for discrimination.
3. **The grounding contract was too literal**: Haiku deterministically normalizes
   punctuation and reorders phrases when quoting ("Tone: friendly and direct" → "friendly
   and direct tone"), so medium/long prompts 502'd twice in a row on a "fabricated" span
   that was really transcription noise. Fixed in two layers: word-sequence
   (punctuation-insensitive) matching + an explicit no-reordering example in the judge
   prompt; and on the single retry, an unverifiable span is dropped (`grounded: false`,
   no quote shown) instead of failing the whole grade. A fabricated quote is still never
   displayed — the excellent prompt's final result shows 4/5 criteria with verbatim
   quotes and 1/5 with the quote honestly omitted.

## Free-tier boundary

4th keyless grade of the day returns **429** with `{"meter":{"remaining":0,"limit":3}}`
and the upgrade message. Verified live. (Also verified the meter now keys on Netlify's
trusted client-IP header, not spoofable `x-forwarded-for`.)

## UI end-to-end (Playwright, real browser)

Weak-prompt chip → Grade → **19/100 rendered** with verdict "Needs a rewrite", 4 failure
modes, per-criterion bars with evidence quotes, copyable Claude-style rewrite, meter text
("1 of 3 free grades left today"), post-grade email capture, and the grade saved to
device history (`19/100` entry restorable). Screenshot: `prompt-grader-e2e.png` (session
artifact).

Note: keyless scores vary a few points between runs (19 vs 10 for the same weak prompt on
different days/builds) — Anthropic at temperature 0 is not bitwise deterministic and the
rubric weights amplify one criterion point into ~7 percentage points. Ranking order is
stable; exact single scores are ±10.

## Regression check

All 26 touched pages on the preview: HTTP 200, full rendered content, grader link present
on every rewired page, **zero** `courses.becomeawritertoday.com` occurrences. Production
is untouched (nothing merged). The only console errors on the grader page are a
pre-existing site-wide ConvertBox embed 404 that exists on live prod today.

## Residual risks (honest list)

- Free-tier meter and spend telemetry are in-memory: they reset on cold start / deploy.
  Cap enforcement is therefore approximate. Acceptable at $0.005/grade (Haiku); revisit
  if the tool gets real traffic.
- A judge that fails validation twice still 502s (rare after the salvage change; only a
  malformed envelope or missing justification does it now) and the metered grade is
  consumed. Peek/commit metering is the fix if it shows up in practice.
- `judge.tokensIn/Out` ride through the gateway; costUsd is an estimate from the pricing
  table, and Netlify AI Gateway billing may differ from list price.
- Score variance (±10) means a user re-grading an unchanged prompt may see a slightly
  different number. The criteria breakdown makes this legible, but it's worth watching.
