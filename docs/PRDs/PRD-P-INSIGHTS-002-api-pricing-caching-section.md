---
status: DRAFT
repo: promptwritingstudio
cluster: P-INSIGHTS (AI Insights Hub)
date: 2026-05-25
size: M
model_recommendation: sonnet
qa_corrections_2026-05-25: Framework corrected — Next.js. Pages at `pages/`, components at `components/`, data at `data/`. May overlap with `pages/ai-models.js` pricing data — PRD now scopes the unique "calculator + caching cost model" component as the differentiator, not generic pricing listing.
---

# PRD: PWS API pricing + caching benefits — calculator + tracking

## Mission
Ship an API pricing + caching cost calculator on PWS at `pages/api-pricing.js` (or `pages/ai-pricing-calculator.js` — confirm namespace) — a working calculator where a user inputs task shape (input/output tokens, cache hit ratio) and sees cost per task across all major LLM API providers, with explainer content on what caching actually saves.

## Why this matters
Generic pricing tables are commodity (and `pages/ai-models.js` likely already lists pricing). The differentiator is the CALCULATOR — input your real task shape, see real cost across providers. AIO can't easily collapse a calculator into a snippet. That's the moat.

Also: caching cost models are genuinely underexplained (Anthropic prompt cache vs OpenAI automatic vs Gemini context caching) and most "API pricing" articles just show sticker prices without the caching layer.

## Success criteria
- New page: `pages/api-pricing.js` (or whichever namespace doesn't collide with existing — confirm by `ls pages/ | grep -i pric` first; if exists, extend instead)
- Current pricing table: input $/1M tokens, output $/1M tokens, prompt-cache pricing where available, last_updated, source link to vendor pricing page
- **Cost calculator (the differentiator)**: user inputs task shape (input tokens, output tokens, cache hit ratio) → outputs cost per task across all listed models — calculator > PDF (`feedback_calculator_over_pdf.md`)
- Caching-benefit section: per provider, what caching actually achieves with worked example
- Last-updated dates per row sourced from vendor pricing page
- Dataset JSON-LD on the page
- RSS feed for monthly pricing updates (or appended to existing PWS RSS if there is one)
- Page reuses existing PWS Layout / Header / Footer components

## Out of scope
- Actually calling APIs (no live latency benchmarks v1)
- Reseller / OpenRouter pricing (first-party vendor pricing only)
- Quality / output-quality comparisons (separate page)
- Recommending specific providers ("use Anthropic because cheap") — facts only; calculator IS the recommendation engine
- Display ads
- Reply CTAs
- Duplicating `pages/ai-models.js` pricing data — if duplication arises, link rather than duplicate

## Acceptance tests
- Page renders 200
- Cost calculator: inputs match hand calculation
- Caching section: worked example for at least 2 providers (Anthropic + OpenAI)
- Click each source link → vendor pricing page resolves
- Dataset JSON-LD validates
- Mobile (320px): calculator usable
- No collision with existing `pages/ai-models.js` data — link to it for the broader comparison

## Implementation hints
- Pricing data: single canonical file at `data/api-pricing.json`
- Cache cost model: Anthropic = write 1.25x, read 0.1x; OpenAI input cache = 50% of input; Gemini context cache varies — be honest about each
- Calculator: client-side JS, no server calls
- Component pattern: match existing PWS components in `components/` (likely React functional components)
- Schema generator: PWS has `lib/schemaGenerator.js` — reuse

## Ship instructions
- Branch: `bryancollins/prd-p-insights-002-api-pricing`
- PR title: `feat(insights): API pricing calculator + caching cost model`
- PR body: link to PRD + screenshot of calculator + sample cost-comparison output + path confirmation (extended ai-models OR new page)
