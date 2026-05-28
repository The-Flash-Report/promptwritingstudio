---
status: DRAFT
repo: promptwritingstudio
cluster: P-INSIGHTS (AI Insights Hub)
date: 2026-05-25
size: M
model_recommendation: sonnet
depends_on: PWS Observatory data layer (in flight — `data/observatory/`, `lib/observatory/`, `components/observatory/`, `pages/observatory/` all exist)
qa_corrections_2026-05-25: Framework corrected — Next.js. PWS uses Netlify Forms (not Kit) for email capture via `components/ui/EmailCapture.js`. Kit integration would be NEW work. PRD now flags this — Bryan needs to confirm: use Netlify Forms (existing), add Kit integration, or use Resend/sendgrid for transactional cron sends.
---

# PRD: PWS Observatory — Weekly best-mover email

## Mission
Ship a weekly cron + email send for "best-mover" Observatory model (the model that improved most on PWS benchmarks vs prior week), with a one-paragraph context note and a link to the Observatory page.

## Why this matters
Observatory infrastructure exists (`pages/observatory/`, `data/observatory/`, `lib/observatory/`, `components/observatory/`, `scripts/observatory/`, `__tests__/api/observatory/`). The weekly email turns it from a static benchmark surface into a returning-cadence touchpoint. Value-only email — NOT a 5-email sequence, NOT a course funnel, NOT a paid-tier upsell.

## Success criteria
- Cron job (Netlify scheduled function OR GitHub Action — match whichever pattern PWS already uses):
  - Reads latest Observatory snapshot vs prior week
  - Identifies model with largest absolute improvement on the headline benchmark
  - Generates one-paragraph context note (template-driven, deterministic — no LLM in the weekly loop per `feedback_automated_content_accuracy_over_polish.md`)
  - Builds email (plain text + simple HTML)
  - Sends to subscriber segment
- **Subscriber list mechanism**: PWS currently uses Netlify Forms for email capture (no Kit integration found in PWS repo). For the weekly send, options:
  - Option A: Add Kit integration (new dep, new subscriber sync flow)
  - Option B: Use Resend transactional with subscriber list maintained in PWS (simpler, no third party)
  - Option C: Reuse Bryan's existing Kit account via Kit MCP (build-time read, batch send via Kit API)
  - **PRD requires Bryan to pick the path before implementation can fire**. Default if unspecified: Option B (Resend + local subscriber list) for minimum new dependency.
- Skip logic: no significant mover (all changes < threshold) → no email sent
- Subject line: "<Model> moved the most this week on the AI Observatory"
- CTA: single link to Observatory page; no "reply with feedback" (`feedback_no_reply_ctas.md`)
- Unsubscribe link works
- Send tracking via whichever channel chosen

## Out of scope
- A 5-email sequence
- Paid-tier upsell (PWS paid tier deferred)
- Cross-channel syndication (no auto-LinkedIn/Substack)
- Personalised "your favourite model moved" emails
- Reply CTAs

## Acceptance tests
- Cron runs end-to-end in test mode with last week's data → email rendered (not sent)
- Skip logic: feed cron a no-mover scenario → no email built
- Email renders in Gmail web + Apple Mail mobile (test sends to bryan@becomeawritertoday.com)
- Unsubscribe link works
- Subject line under 60 chars
- Subscriber list mechanism decision documented in PR body

## Implementation hints
- Read `lib/observatory/loadRuns.js` and `data/observatory/` to understand snapshot shape
- Read existing scripts in `scripts/observatory/` for cron pattern
- For Resend (Option B): add `resend` dep, env var `RESEND_API_KEY` (confirm if Bryan has separate from Tenderwatch's)
- For Kit MCP (Option C): batch reads + sends via existing Kit account; no new deps in PWS repo
- Significance threshold: pick reasonable default (>2 pp on headline benchmark), config-driven

## Ship instructions
- Branch: `bryancollins/prd-p-insights-003-best-mover-email`
- PR title: `feat(observatory): weekly best-mover email cron`
- PR body: link to PRD + sample rendered email + subscriber list mechanism chosen + Bryan-decision flag if Option A vs B vs C
- DO NOT ship until Observatory data layer is confirmed stable
