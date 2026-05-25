---
status: DRAFT
repo: promptwritingstudio
cluster: P-LEARN (AI literacy track)
date: 2026-05-25
size: XL
model_recommendation: opus
qa_corrections_2026-05-25: Framework corrected — Next.js (pages at `pages/`, API routes at `pages/api/`). `@anthropic-ai/sdk` NOT in PWS package.json — PRD now scopes adding it as part of work. API routes pattern exists at `pages/api/ai/` and `pages/api/observatory/`.
---

# PRD: Interactive prompt-engineering learning resource

## Mission
Ship a non-technical, interactive prompt-engineering learning resource on PWS — the "Codecademy for prompt engineering" equivalent — where a working professional can step through structured prompt patterns, run them live against a Claude model via PWS server-side, see output, iterate. Without writing code.

## Why this matters
Bryan surfaced this as a recurring wish across multiple framings. The highest-value PWS PRD because:
- AIO-resistant (interactive > read-once)
- Recurring traffic (people return to practice)
- Genuinely differentiated (most prompt-engineering content is read-only)
- Compatible with no-funnel constraint (value content, not sales sequence)

## Success criteria
- Resource at `pages/learn/` (or `pages/prompt-craft/` — confirm namespace; create new directory under pages)
- Module structure: at least 6 modules at `pages/learn/[module].js` covering:
  - Clear instructions, role/persona, structured output, few-shot patterns, chain-of-thought, system + user composition
- Each module:
  - Concept explainer (200-400 words, business-language)
  - Worked example showing before/after prompt
  - Interactive try-it: textarea + run button → POST to `/api/learn/run` → calls Claude (Haiku for cost — `feedback_personal_cli_cost_order.md`) → shows output
  - Rate-limit guard: per-IP or per-session quota (e.g. 20 runs/day)
  - "Save your variant" button: saves to anonymous-token store (Netlify Blobs or simple JSON)
- **Add `@anthropic-ai/sdk` to PWS dependencies** (not currently present — verified)
- Anthropic API key from env: `process.env.ANTHROPIC_API_KEY` (server-side only via Next.js API route)
- Cost guardrails: max output tokens conservative (500), Haiku model, daily spend cap (alert if exceeded)
- Progress tracking: anonymous token tracks completed modules (no auth v1)
- Mobile: textareas usable

## Out of scope
- User accounts / passwords (anonymous token only v1)
- Paid tier (PWS paid tier deferred)
- 5-email upsell triggered by completion (banned)
- "Submit your prompt for review" with Bryan-as-reviewer CTA (coaching-funnel territory — `feedback_no_reply_ctas.md`)
- Gemini / OpenAI integration (Claude only v1 for cost control)
- Leaderboard / public sharing of variants (privacy)
- Bryan's voice / founder anecdote in module content

## Acceptance tests
- `/learn/` → module list renders
- Click module 1 → concept renders, try-it textarea works, run button calls Claude, output appears
- Run 20 times in succession → 21st returns rate-limit response
- Save variant → reload page → variant persisted
- Mobile (320px): textarea usable, output readable
- Cost-guardrail: normal session for 1 hour → spend stays under expected budget
- Anthropic API key NOT exposed client-side (view source check)
- `npm install` adds `@anthropic-ai/sdk` cleanly
- `next build` passes

## Implementation hints
- Read existing API route pattern: `pages/api/ai/*` and `pages/api/observatory/*` — match
- API route: `pages/api/learn/run.js` (handles POST → Claude call → response)
- Anonymous token: cookie + localStorage; persistence via Netlify Blobs (Tenders uses `@netlify/blobs` — would need to add to PWS as new dep, OR use simple JSON file)
- Rate limit: existing `lib/observatory/rateLimit.js` may be reusable — check
- Module content: MDX or React component per module
- "Run" button: POSTs prompt + module ID to API route; server returns model output

## Ship instructions
- Branch: `bryancollins/prd-p-learn-001-interactive-resource`
- PR title: `feat(learn): interactive prompt-engineering resource v1 (6 modules + Claude)`
- PR body: link to PRD + module list + sample run + cost-guardrail evidence + new dep confirmation
- XL — if scope ceiling hits, ship 3 modules + infrastructure in this PR; remaining in P-LEARN-001b
- Watch budget: any unusual cost burst → DRAFT PR + flag immediately
