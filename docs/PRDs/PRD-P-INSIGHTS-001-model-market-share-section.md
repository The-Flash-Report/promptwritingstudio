---
status: DRAFT
repo: promptwritingstudio
cluster: P-INSIGHTS (AI Insights Hub)
date: 2026-05-25
size: M
model_recommendation: sonnet
qa_corrections_2026-05-25: Framework corrected — PWS is Next.js (not Astro). Pages live at `pages/` (no `src/`). Components at `components/`. Data at `data/`. CRITICAL DUPE found: `pages/ai-models.js` already ships model comparison (Claude, GPT, Gemini, Llama, Mistral, etc) with schema + FAQs + comparison UI. Existing data at `lib/ai-models.js`. PRD reframed as EXTEND existing page with market-share + monthly snapshots, NOT new section.
---

# PRD: PWS Model market share — extend existing ai-models surface

## Mission
Extend the existing `pages/ai-models.js` surface with a market-share data layer (monthly snapshots, trend chart, sortable table) so the page evolves from "comparison reference" into "comparison + cadence-tracking surface" with month-over-month change data.

## Why this matters
The model comparison page already exists and has schema markup, FAQs, model data via `lib/ai-models.js`. The strategic wish was for a returning-cadence surface that AIO can't easily collapse. Adding market-share with monthly snapshots gives readers a reason to return + a Dataset JSON-LD wrapper for AEO attribution.

This is a separate concern from API pricing (P-INSIGHTS-002) — both extend the AI Insights theme but should ship as independent merges.

## Success criteria
- Extend `pages/ai-models.js` (do NOT build a new `/ai-insights/` route — extend the existing surface)
- Add a "Market share" section/tab on the page:
  - Sortable table: model, vendor, market share %, change vs prior month, last snapshot date
  - Trend chart (line) over last 12 months
  - Methodology footnote citing data sources (OpenRouter usage stats, Hugging Face download counts, public API call estimates)
- Monthly snapshot data file: `data/ai-models-market-share/<yyyy-mm>.json`
- Dataset JSON-LD added to the page (existing TechArticle JSON-LD stays; Dataset is additive)
- Last-updated date is snapshot date, not page-deploy date
- Methodology in business language (`feedback_summaries_plain_language.md`)
- Mobile readable on 320px

## Out of scope
- Real-time data (monthly snapshots only)
- Predictions / forecasts
- Speculation about *why* share moved (one-sentence factual notes OK)
- Bryan's voice / founder commentary
- Display ads
- Reply CTAs (`feedback_no_reply_ctas.md`)
- Building a new `/ai-insights/` route hierarchy — extend the existing page
- Modifying `lib/ai-models.js` model definitions (only ADDS market-share data, doesn't alter model schema)

## Acceptance tests
- Page still renders 200 (no regression in existing FAQ, comparison, schema)
- New market-share section renders
- Sortable table works
- Chart renders on mobile without overflow
- Dataset JSON-LD validates alongside existing TechArticle schema
- Snapshot file committed (at least one snapshot to seed)
- Methodology section reads in business language

## Implementation hints
- Read `pages/ai-models.js` first to understand existing component structure
- Read `lib/ai-models.js` to see model definitions
- Chart library: check existing deps; if none, use minimal solution (CSS-only sparklines acceptable for v1)
- Data sources: OpenRouter (usage); Hugging Face (download counts); Stack Overflow Developer Survey (annual)
- v1 = manually committed monthly snapshots; cron automation later

## Ship instructions
- Branch: `bryancollins/prd-p-insights-001-model-share`
- PR title: `feat(ai-models): market share extension + first snapshot`
- PR body: link to PRD + screenshot of extended page + data source citations
- Confirm no regression in existing ai-models.js functionality
