# PromptWritingStudio — Claude Code Rules

## Project Overview

Next.js 13 site for PromptWritingStudio — a programmatic SEO content site targeting AI prompt-related keywords. Sells a single course via Teachable. Deployed on Netlify.

**Repo**: https://github.com/The-Flash-Report/promptwritingstudio  
**Live**: promptwritingstudio.com (Netlify, auto-deploys from main)

## Stack

- **Framework**: Next.js 13 (Pages Router, not App Router)
- **Styling**: Tailwind CSS
- **Auth**: None currently. (No NextAuth, no Prisma, no `/prisma` dir — these
  were planned but never installed. Do not assume they exist.)
- **DB**: None. The site is static/SSG content + serverless API routes. Any
  per-user state (e.g. the Prompt Studio saved library) is **client-side
  localStorage**, not a database.
- **Deployment**: Netlify with `@netlify/plugin-nextjs`
- **Build**: `npm run build` → `.next/` publish dir

## Key Directories

```
/pages          — All routes (Pages Router)
/components
  /layout       — Header, Footer, Layout wrapper
  /sections     — Page sections (Hero, FAQ, Pricing, etc.)
  /ui           — Reusable UI elements
  /tools        — Interactive tool components
  /calculators  — Calculator components
  /ai           — AI-related components
/data           — SEO content data and prompt templates
  /modifiers    — JSON files for /chatgpt-prompts-for/[modifier] pages
  seo-use-cases.js — Data for /ai-prompt-generator/[slug] pages
  /gateway      — Prompt Studio model gateway (OpenRouter, BYOK)
  /critique     — Prompt Studio LLM-as-judge critique
  /templates    — Prompt Studio template library + slot-filling
  /studio       — Prompt Studio entitlements (gating) + saved library
```

## Programmatic SEO Routes

Two dynamic route families:

1. `/pages/chatgpt-prompts-for/[modifier].js` — reads from `/data/modifiers/*.json`
2. `/pages/ai-prompt-generator/[slug].js` — reads from `/data/seo-use-cases.js`

To add a new modifier page: create a JSON in `/data/modifiers/` and link it from `/pages/chatgpt-prompt-templates.js`.

## Design System

- **Primary CTA**: Yellow `#FFDE59` bg, black text, text "Join Now"
- **CTA URL**: `https://courses.becomeawritertoday.com/purchase?product_id=6640678`
- **Text**: `#1A1A1A` headings, `#333333` body
- **Backgrounds**: white or `#F9F9F9` alternating
- **Borders**: `#E5E5E5`
- **Sections**: `py-16 md:py-24` padding
- **Cards**: `rounded-lg` with subtle shadow
- **Font**: system font stack (no external fonts)

## Dev Commands

```bash
npm run dev      # localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Env Vars

The core marketing site needs **no** env vars (it's static content). The Prompt
Studio layer uses these, all optional — the studio degrades gracefully without
them (pure BYOK, free tier off, everyone on the free plan):

- `OPENROUTER_FREE_KEY` — studio key for the capped free tier (OpenRouter's
  free/rate-limited models). Absent ⇒ studio is pure BYOK.
- `STUDIO_ENTITLEMENT_SECRET` — HMAC secret for verifying paid-plan entitlement
  tokens. Absent ⇒ every caller is treated as `free`.

There is intentionally **no** `DATABASE_URL` / `NEXTAUTH_*` — there's no DB or
auth (see Stack).

## Prompt Studio

The API/integration layer under `lib/` + `pages/api/studio/`. Sells structure,
not inference. See `docs/prompt-studio-gateway.md` for the full design.

- **BYOK, client-only keys.** A user's API key arrives per-request in the
  `x-user-api-key` header, is used in-memory for one call, and is never stored,
  logged, returned, or traced. Never persist or log a user key.
- **One gateway interface.** All model calls go through `lib/gateway`
  (`complete()` / `compareModels()`). Adding/swapping a model is a config change
  in `lib/gateway/models.js`, never endpoint code.
- **Critique is grounded.** Every rubric criterion needs a justification +
  in-prompt evidence span; a bare score is rejected as malformed, never surfaced.
- **Feature gating** lives in `lib/studio/entitlements.js` (free = templates +
  single-model; paid = compare + critique + saved library). Tier comes from a
  signed `x-studio-entitlement` header; no token ⇒ free.
- **Saved library** is client-side localStorage (`lib/studio/savedLibrary.js`) —
  no server state.

## Conventions

- No App Router. All pages in `/pages/`.
- Tailwind only — no CSS modules or styled-components.
- New sections go in `/components/sections/`, not inline in pages.
- Keep "Join Now" as the universal CTA text.
- All CTA links point to the single Teachable purchase URL above.
- Dynamic SEO pages are data-driven — add data, not new page files.
