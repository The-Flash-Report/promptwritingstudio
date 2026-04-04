# PromptWritingStudio — Claude Code Rules

## Project Overview

Next.js 13 site for PromptWritingStudio — a programmatic SEO content site targeting AI prompt-related keywords. Sells a single course via Teachable. Deployed on Netlify.

**Repo**: https://github.com/The-Flash-Report/promptwritingstudio  
**Live**: promptwritingstudio.com (Netlify, auto-deploys from main)

## Stack

- **Framework**: Next.js 13 (Pages Router, not App Router)
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js with Prisma adapter
- **DB**: PostgreSQL via Prisma (for auth/dashboard only)
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
/lib            — Utility functions
/prisma         — Schema and migrations
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

## Env Vars Required

- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — NextAuth secret
- `NEXTAUTH_URL` — Site URL

## Conventions

- No App Router. All pages in `/pages/`.
- Tailwind only — no CSS modules or styled-components.
- New sections go in `/components/sections/`, not inline in pages.
- Keep "Join Now" as the universal CTA text.
- All CTA links point to the single Teachable purchase URL above.
- Dynamic SEO pages are data-driven — add data, not new page files.
