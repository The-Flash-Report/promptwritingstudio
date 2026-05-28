---
status: DRAFT
repo: promptwritingstudio
cluster: P-LEARN (AI literacy track)
date: 2026-05-25
size: L
model_recommendation: sonnet
related: V-IRISH-004 (Vendors AI tools cluster — distinct but complementary)
qa_corrections_2026-05-25: Framework corrected — Next.js. Pages at `pages/`, components at `components/`. Layout component at `components/layout/Layout` (verified from `ai-models.js`). Email capture is Netlify Forms via `components/ui/EmailCapture.js` (not Kit).
---

# PRD: AI workforce defensive-literacy track

## Mission
Ship a structured AI literacy track on PWS targeted at working professionals whose jobs face AI disruption (40%-of-Irish-jobs-impacted framing): where the human/AI boundary is, how to audit your role, defensive skills to build, tools worth learning, how to position for the AI-augmented version of your role.

## Why this matters
PWS sits across both ambitious AI-using professionals AND professionals scared of being displaced. The interactive resource (P-LEARN-001) serves the first cohort. This track serves the second. Defensive AI literacy is a real, growing audience.

PWS-side of the AI-jobs theme. Vendors.ie side is V-IRISH-004 (AI tools for Irish workers). Personal-essay side is X-AI-JOBS-NOTES. Three independent surfaces, one coherent theme.

## Success criteria
- Track at `pages/ai-workforce/` or `pages/protect-your-job/` — confirm naming with `ls pages/` first (avoid collision)
- 5-7 modules (NOT lessons with 5-email upsell — `feedback_no_reply_ctas.md`):
  - What AI can and can't do (capability boundaries, date-stamped)
  - Audit your role — task-level AI capability
  - AI-augmented versions of common roles (accountant, marketer, writer, customer support, designer)
  - Defensive skill stack — judgement, communication, taste — why they compound
  - Tool-of-the-month — practical workflow (Otter for meetings, Claude for drafting) — anti-hype framing
  - Conversations with your employer — positioning AI use without automating yourself out
  - When to retrain, when to switch, when to stay
- Each module: business-language explainer + 1-2 worked examples + linked further-reading (no in-line course-upsell CTAs)
- Cross-link: tool mentions → Vendors.ie vendor profile (V-IRISH-004 cluster) where applicable; stub if V-IRISH-004 not yet shipped
- Cross-link: relevant modules → P-LEARN-001 for hands-on practice
- No "buy our course to unlock" — track is fully free
- Last-updated date per module (capability boundaries change fast)
- Optional opt-in: monthly "what changed in AI capability" email via existing `EmailCapture.js` Netlify Forms component — single new form, granular opt-in/out

## Out of scope
- Paid tier locked behind the track
- 5-email "AI threat assessment" sequence — banned
- Bryan's voice / founder anecdote in module text (`feedback_byline_vs_personal_brand.md`)
- Fear-framing or doom prose (defensive-literacy = empower, not panic)
- AI-replacement-for-developers content (non-developer professionals)
- Predictions about exact job-loss percentages (cite ranges from authoritative sources only)
- Cross-tagging with PWS course funnel (course funnel is sunset)
- Building a new email-list infrastructure — use existing `components/ui/EmailCapture.js` Netlify Forms pattern

## Acceptance tests
- All 5-7 modules render 200
- Each under 1500 words, scannable headings, mobile readable
- Cross-links to Vendors cluster resolve (stub with TODO + open issue if V-IRISH-004 not yet shipped)
- Cross-links to P-LEARN-001 resolve
- Netlify Forms email capture works (test submission)
- No emoji unless requested
- Em-dash sweep on public-facing content (`feedback_em_dash_scope.md`)
- `next build` passes

## Implementation hints
- Content format: MDX or page-per-module (React component)
- Tone reference: business-language, plain English (`feedback_summaries_plain_language.md`)
- Layout: reuse `components/layout/Layout`
- Email capture: `<EmailCapture formName="ai-workforce-monthly" source="ai-workforce" />` (per existing component API)
- Sources for capability boundaries: Anthropic/OpenAI/Google published model cards; Stanford HAI; AI Index Report
- Sources for job-impact ranges: McKinsey, OECD, Goldman Sachs — cite ranges, not point estimates

## Ship instructions
- Branch: `bryancollins/prd-p-learn-002-workforce-track`
- PR title: `feat(learn): AI workforce defensive-literacy track (5-7 modules)`
- PR body: link to PRD + module list + cross-link audit + form name used
