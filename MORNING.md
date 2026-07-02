# MORNING.md — overnight mission report (2026-07-01 → 02)

**TL;DR: PromptWritingStudio now has a working, monetisable interactive tool. PR #53
(`feat/prompt-grader`) is ready for your review — nothing touched production. The Prompt
Grader is live on the deploy preview, passed a 5-prompt adversarial eval including a
refused phishing prompt, and every dead Teachable checkout link on your traffic pages now
funnels into it.**

Preview: https://deploy-preview-53--promptwritingstudio.netlify.app/prompt-grader
PR: https://github.com/The-Flash-Report/promptwritingstudio/pull/53

## Before / after

| | Before (yesterday) | After (this PR) |
|---|---|---|
| Interactive AI tool | None linked anywhere. A fully built critique/gateway backend (99 tests) sat orphaned with zero UI. | `/prompt-grader`: paste a prompt → 0-100 score with verbatim evidence quotes, failure modes, copyable rewrite (Claude/ChatGPT/Gemini styles). In nav, homepage, sitemap. |
| Monetisation | Nothing sold. 20 links to a 404ing Teachable checkout on 19 claude-* pages. | Free 3 grades/day → paywall boundary that today captures founding-member emails (`source: prompt-grader-upgrade`), flips to a live Stripe Payment Link the moment you set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`. All 20 dead links rewired to the grader. |
| Return-visit loop | Static content | Grade history on device (last 3 free), daily meter reset, post-grade email capture. |
| Tests | 99 | 123, all green |

## What works (verified live, see EVAL.md)

- Ranking discriminates: terrible 10 < non-technical 33 < mediocre 38 < excellent 100.
- The phishing prompt was flagged and refused in 2.4s — no scores, no "improved" phish.
- Anti-generic-feedback contract holds end to end: critiques quote the user's actual
  words, and a quote the judge can't support verbatim is dropped, never displayed.
- Free-tier boundary returns a clean 429 + upgrade message on the 4th grade.
- Full browser E2E: chip → grade → rendered score/rewrite/history/email capture.
- All 26 touched pages regression-checked on the preview; prod untouched.

## What's fragile (honest)

- **In-memory meter**: resets on cold start/deploy, so "3/day" is approximate. At Haiku's
  ~$0.005/grade the worst case is noise; the `[grader-budget]` log warning is the alarm.
- **Score variance ±10** between identical runs (temp 0 isn't bitwise deterministic and
  rubric weights amplify single points). Ordering is stable; exact numbers wobble.
- **Paid tier is a stub**: entitlement verification exists and is tested, but nothing
  mints tokens until a Stripe webhook exists. Until then "Pro" = waitlist emails.
- **Netlify AI Gateway dependency** (discovered tonight, see below): grader spend rides
  whatever the gateway bills; the costUsd figures shown are list-price estimates.

## Discovery you should know about

Your prod `ANTHROPIC_API_KEY` is a **Netlify AI Gateway token**, not a raw Anthropic key
— requests only authenticate via `ANTHROPIC_BASE_URL`. So the AI Gateway pilot from your
to-do list is effectively already live on PWS. Every future non-SDK Anthropic call on any
Netlify site needs to honor `ANTHROPIC_BASE_URL` or it will 401 exactly the way tonight's
first eval did.

## Pricing recommendation

**$8/month (or $59/year), positioned as "Grader Pro": unlimited grades, full history,
all three model rewrites per grade.** Reasoning:

- Cost floor is trivial (Haiku ≈ $0.005/grade; a heavy user doing 30 grades/day costs
  ~$4.50/yr), so price on value, not cost.
- $8 sits below the "expense it without thinking" line for the site's audience
  (freelancers/creators already paying $20 for ChatGPT), and above the $3-5 zone that
  signals hobby-tool.
- Do NOT sell the Sonnet judge as the paid differentiator — the 26s function wall makes
  it operationally flaky; sell volume + history + variants, which are already built.
- Gate: keep 3/day free. It was enough for a real session tonight and creates a daily
  return habit; 1/day would starve the email capture moment.

## Your next hour (in order)

1. Read DECISIONS.md (10 min) — especially D5 (PR not deploy), D2a (Haiku judge), D7
   (Teachable links rewired).
2. Click around the preview grader; run one real prompt of your own.
3. Merge PR #53 if satisfied — Netlify auto-deploys; the tool works with zero env
   changes (verified against prod env on the preview).
4. Optional, 10 min: create a Stripe Payment Link for $8/mo "Grader Pro", set
   `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` on Netlify, redeploy. The paywall goes live.
   (Entitlement-token minting for actual unlimited access still needs the webhook — the
   waitlist card is the honest default until then.)
5. Watch Netlify Forms for `prompt-grader` / `prompt-grader-upgrade` submissions.

## The decision you're most likely to disagree with

**I flipped critique from a paid feature to the free tier's core loop (D3), and demoted
the judge from Opus→Sonnet→Haiku (D2/D2a).** The Phase-4 work that gated critique behind
a paid plan is effectively undone by this PR. My reasoning: a wedge feature nobody can
touch converts nobody — the free grade IS the marketing, and the paid line moved to
volume + history + variants. And the "premium model for user-facing quality" instinct
lost to an infrastructure fact: Sonnet grades die on Netlify's 26s wall. If you want the
premium judge back as a paid perk, it's one registry line + the entitlement check — but
it needs background functions or streaming first, or paid users get timeouts.

Second candidate: I rewired all 20 dead course links in this same PR (D7), which makes
the diff broader than a pure feature PR. I judged stranding the tool worse than the
bigger diff; the regression sweep covered every touched page.

## Artifacts

- `AUDIT.md` — Phase 0 ground truth (what existed, what was reusable, dead weight list)
- `DECISIONS.md` — D1-D8 + D2a, each with rejected alternatives
- `EVAL.md` — full adversarial results incl. the three live-fire bugs the eval caught
- `docs/prompt-grader.md` — prompt architecture, the grounding contract, ops runbook
