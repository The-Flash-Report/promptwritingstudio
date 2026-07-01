# AUDIT.md — PromptWritingStudio, 2026-07-01 (overnight mission, Phase 0)

Ground truth for everything built tonight. Verified against the working tree at commit `5795dca` (main, clean) and the live site.

## Stack

- Next.js 13 **Pages Router** (no App Router), Tailwind, no external fonts.
- Netlify (`@netlify/plugin-nextjs`), auto-deploys from main. Site id `ee68b3d2-d702-4077-92b2-aa403df01037`.
- No DB, no auth. Per-user state = localStorage. Serverless API routes only.
- `@anthropic-ai/sdk` already a dependency.
- Tests: Jest, **99 passing** (baseline, 0.8s). Note: jest also picks up stale worktree copies under `.claude/worktrees/pr-38-prd` and `pr-split-b` — harmless but noisy dead weight.

## The headline finding

**The site is a content body with a fully built, tested, orphaned tool engine.**
`lib/gateway` (model gateway, BYOK, cost/latency), `lib/critique` (grounded LLM-as-judge), `lib/templates` (slot-filling), `lib/studio` (HMAC entitlements + localStorage saved library) + 6 `/api/studio/*` endpoints exist with 99 tests — and **no page anywhere calls them**. No nav link, no UI. The mission's three wedge candidates are ~70% built and 0% shipped.

## What exists (and is reusable)

| Asset | State | Reuse verdict |
|---|---|---|
| `lib/critique` LLM-as-judge | Built + tested, unwired | **The wedge.** Grounding contract already bans generic feedback: every criterion needs a justification + verbatim `evidence_span` from the user's prompt; fabricated spans are rejected at parse time. This is exactly the mission's anti-"be more specific" requirement, already engineered. |
| `data/critique-rubrics.js` | 1 rubric (5 criteria, 0–3, weighted) | Seed rubric. Extend, don't replace. |
| `lib/gateway` + `compare` | Built + tested; OpenRouter-only, **placeholder slugs never verified live**; `OPENROUTER_FREE_KEY` unset ⇒ free tier dead | Keep the registry design; add an Anthropic-direct route. OpenRouter path has never actually run. |
| `pages/api/learn/run.js` + `lib/learn/{rateLimit,budget}` | **Live in prod** — probe returned a real Haiku response; `ANTHROPIC_API_KEY` is configured on Netlify | The proven pattern for studio-funded inference: Anthropic direct, per-IP daily cap, spend telemetry. Copy this shape. |
| `lib/studio/entitlements.js` | HMAC-signed tier tokens, tested | Keep. Flip critique free-metered (see DECISIONS). |
| `lib/studio/savedLibrary.js` | localStorage library, tested, SSR-safe | The client-side history store. |
| Prompt content | ~250 discrete real prompts: 117 modifier templates (`data/modifiers/*.json`), 115 creator prompts (`data/*-prompts.js`), 11 weak→improved teaching pairs (`data/prompt-examples/`), 3 true `{{slot}}` studio templates | Seed data: example prompts for the grader empty state; the 11 weak→improved pairs are calibration material. |
| Email capture | Live: `components/ui/EmailCapture.js` → Netlify Forms → Mailgun welcome email. Embedded on 19 pages + 6 calculators | Reuse as the "save your prompt library" moment (`source` field already supported). |
| Calculators + tools | 10 calculators, mad-libs builder, diagnostic quiz — all client-side, no AI | Design idiom donors; the diagnostic quiz is the grader's non-AI ancestor. |

## Monetisation: none, and worse than none

- Nothing is sold. No Stripe/Gumroad/etc. anywhere.
- **20 dead links to the closed Teachable checkout (`courses.becomeawritertoday.com/purchase`) across 19 claude-* pages** — a live dead-CTA bug, explicitly banned by CLAUDE.md. These pages are the traffic surface.
- The entitlements layer gates paid features nobody can buy (no token issuer, no checkout).

## Traffic surface (where the tool must be visible from)

1. Claude cluster (~25 pages + 56 `claude-code-skills/[slug]`) — primary funnel, header CTA points here.
2. Calculators (10).
3. `chatgpt-prompts-for/[modifier]` (21), `ai-prompt-generator/[slug]` (88), persona prompt pages (5).
4. RAG concept cluster (~16).

## Dead weight

- Observatory (`pages/observatory/*`, cron disabled in #49) — orphan, not in nav.
- `/learn` module — good engine, orphan page (not in nav).
- `pages/ai-prompt-generator/enhanced.js` — the only page wired to real AI (`/api/ai/optimize`, `/api/ai/chat`), itself an orphan (no inbound links, not in sitemap).
- `pages/api/ai/optimize.js` — has a **fallback that fabricates scores (65→85) when parsing fails** — the exact generic-filler anti-pattern; do not reuse. Also base64-decodes `CLAUDE_API_KEY`, unlike `learn/run.js` which uses `ANTHROPIC_API_KEY` raw (two conflicting key conventions).
- `chrome-extension/`, 5 empty `authentic-creator-prompts*.js`, ~15 root strategy .md files, stale `.claude/worktrees/*`.

## Env vars (verified empirically, not assumed)

- `ANTHROPIC_API_KEY` — **present in prod** (live probe of `/api/learn/run` succeeded).
- `CLAUDE_API_KEY` (base64) — unknown; only used by the orphaned `/api/ai/*` endpoints.
- `OPENROUTER_FREE_KEY`, `STUDIO_ENTITLEMENT_SECRET` — assumed unset (docs say so; nothing depends on them tonight; absence degrades gracefully by design).
