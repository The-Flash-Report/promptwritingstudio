# Competitor Analysis — PromptWritingStudio

**Status**: Research deliverable for local agent pickup
**Branch**: `claude/competitor-analysis-0lUFD`
**Date**: 2026-04-15
**Author**: Claude Code

## Summary

Competitive gap analysis comparing PromptWritingStudio (PWS) against four competitor archetypes: prompt libraries/marketplaces, education platforms, prompt engineering tooling, and integrated AI work platforms. Identifies 12 feature gaps and ranks them into quick wins, medium lifts, and larger bets for a local agent to execute.

## Motivation

PWS has strong programmatic SEO coverage (~95 routes, 21 modifier categories, ~80 use cases) and a solid free-tool funnel (6 calculators, 3 AI components) feeding a single $197 Teachable course. But the prompt-engineering category has segmented since launch — competitors now compete on community, certification, tooling depth, and distribution (Chrome extensions, Notion, B2B). This doc maps what's missing so follow-up PRs can close the gaps.

## Current State (Baseline)

### Content & SEO
- ~95 routes under `/pages/`
- Programmatic: `/pages/chatgpt-prompts-for/[modifier].js` reads `/data/modifiers/*.json` (21 files); `/pages/ai-prompt-generator/[slug].js` + `/pages/[slug].js` read `/data/seo-use-cases.js` (~80 use cases)
- 500+ searchable prompt examples at `/pages/ai-prompt-examples.js`
- 5 persona bundles under `/pages/prompts/`
- Educational hubs: 12+ RAG variant pages, AI glossary, history, models

### Interactive Tools
- 6 calculators in `/components/calculators/`: ROI, CostComparison, ContentSpeed, Ecommerce, CustomerService, BusinessAIReadiness
- Free tools: business name generator, diagnostic quiz, Mad Libs builder
- AI components in `/components/ai/`: `PromptOptimizer.js`, `LiveChatTester.js`, `AIAgentBuilder.js`
- API routes: `/pages/api/ai/optimize.js`, `/pages/api/ai/chat.js`

### Auth & Monetization
- NextAuth email-link login; Prisma user model with `subscriptionStatus`, `subscriptionPlan`, `onboardingCompleted` fields
- `/pages/dashboard.js` exists but logged-in value is minimal
- Single $197 Teachable course at `https://checkout.teachable.com/secure/37332/checkout/order_g23vx78p`
- Favorites/ratings/custom templates stored in localStorage only (not synced to Prisma)

## Competitor Landscape

| Archetype | Examples | Key Moat |
|---|---|---|
| Prompt Library / Marketplace | PromptBase (240k+), God of Prompt (30k+), FlowGPT (10M users), AIPRM, PromptHero | Volume, community votes, marketplace economics |
| Education | Learn Prompting, Zero To Mastery, Coursera, Vanderbilt, DataCamp, Blockchain Council | Certification, Discord, cohorts, TAs |
| Engineering Tooling | Braintrust, LangSmith, Promptmetheus, Maxim, PromptPerfect | Versioning, evals, multi-model compare, team workspaces |
| Integrated Platform | Taskade Genesis, AIPRM | Library + execution + collaboration in one surface |

## Gaps Identified

### 1. Prompt Library Scale & Community
- **Current**: ~500 curated prompts, read-only
- **Gap**: user submissions, upvotes/ratings beyond private localStorage, "fork this prompt," public profiles, comment threads, Discord/community anchor
- **Why it matters**: FlowGPT and Learn Prompting use community as their moat

### 2. Distribution Channels
- **Current**: lives entirely on own domain
- **Gap**: Chrome extension (AIPRM's killer feature — 1-click inside ChatGPT/Claude.ai), Notion export (God of Prompt's delivery model), Zapier/Make, Slack bot, public API, VS Code extension

### 3. Certification & Structured Curriculum
- **Current**: one bundled course; no visible lesson plan or progress
- **Gap**: modular lessons with progress tracking on `/pages/dashboard.js`, certificate of completion (now a category norm), quizzes tied to learning paths

### 4. Prompt Testing / Versioning / Team Workspaces
- **Current**: `PromptOptimizer` + `LiveChatTester` are single-model, single-user
- **Gap**:
  - Side-by-side multi-model compare (GPT-4o vs Claude 4.6 vs Gemini 2.x on same input)
  - Prompt version history / diff / rollback
  - Evaluation datasets + scorers for regression testing
  - Team workspaces / sharing / comments
  - Export-to-code (curl / SDK snippets)
- **Note**: `/pages/api/ai/optimize.js` already supports multi-provider — side-by-side is low lift

### 5. Authenticated-User Value
- **Current**: NextAuth + Prisma exist; `onboardingCompleted` field defined but no flow evident
- **Gap**: persist favorites/ratings/custom templates server-side, personal prompt library, run history, saved generator sessions

### 6. B2B / Team Tier
- **Current**: single-seat consumer product
- **Gap**: team plans, seat-based pricing, SSO, admin dashboard, usage reporting — competitors monetize this hard ($20–$200/mo)

### 7. Visual / Image Prompt Gallery
- **Current**: `/pages/ai-prompt-generator/ai-art-prompts.js` exists
- **Gap**: searchable image gallery with prompts attached (PromptHero's core), Veo 3 / Sora 2 / Midjourney style references

### 8. Model Coverage & Freshness
- **Current**: references GPT-4, Claude, Gemini, DALL-E, Midjourney
- **Gap**: static JSON data has no coverage of Claude Opus 4.6, Sonnet 4.6, Gemini 2.x, Veo 3, Sora 2, Grok, Llama 4

### 9. No Blog / Editorial Surface
- **Gap**: competitors rank on dated "latest" content; PWS has no blog in `/pages`

### 10. Lead-Capture Telemetry
- **Gap**: segmented email flows by tool used, in-product upsell from free tool to course, A/B testing harness on CTAs

### 11. Trust Signals
- **Gap** (verify on homepage): testimonials with real names + photos, student count, media logos, case studies with measurable outcomes

### 12. Content Format Variety
- **Gap**: video walkthroughs, YouTube embed library, podcast, live-streamed prompt reviews

## Proposed Execution Queue (for Local Agent)

### Quick Wins (1–2 day each)
1. **Refresh model coverage** — update `/data/seo-use-cases.js` and `/data/modifiers/*.json` to reference Claude 4.6, Veo 3, Sora 2, Gemini 2.x
2. **Persist user state to Prisma** — migrate favorites/ratings/custom templates off localStorage; add `Favorite`, `PromptRating`, `CustomTemplate` models to `/prisma/schema.prisma`; update `/pages/ai-prompt-examples.js` and generator pages
3. **Side-by-side model compare** — extend `/components/ai/PromptOptimizer.js` to fan out one prompt to OpenAI + Anthropic + Google in parallel via existing `/pages/api/ai/optimize.js`
4. **Markdown / Notion export** — add "Export prompts" button on `/pages/ai-prompt-examples.js` and persona collections; generate `.md` + Notion-compatible JSON

### Medium Lifts (1–2 weeks)
5. **Course curriculum + certificate** — build `Module`, `Lesson`, `LessonProgress` Prisma models; add `/pages/learn/` curriculum UI; generate PDF certificate on completion
6. **Community layer v1** — add Discord invite in header/footer; build `/pages/community/submit.js` for user-submitted prompts with moderation queue; add `PromptSubmission` model
7. **Chrome extension** — new `/extension` folder with manifest v3 extension that injects PWS prompt library into ChatGPT / Claude.ai sidebars; uses a public read-only API endpoint

### Larger Bets (multi-sprint)
8. **B2B tier** — `Team`, `TeamMember`, `Seat` models; team billing via Stripe; `/pages/teams/` admin surface; SSO via NextAuth
9. **Prompt versioning + evals** — `PromptVersion`, `EvalDataset`, `EvalRun` models; diff UI; content-addressable version IDs
10. **Image prompt gallery** — `/pages/gallery.js` with Cloudinary/R2-backed images + attached prompts; seed with curated Midjourney / Sora / Veo examples

## Critical Files

- Prompt library UI: `pages/ai-prompt-examples.js`, `pages/prompts/*.js`
- AI tooling: `components/ai/PromptOptimizer.js`, `components/ai/LiveChatTester.js`, `components/ai/AIAgentBuilder.js`
- AI APIs: `pages/api/ai/optimize.js`, `pages/api/ai/chat.js`
- Data: `data/modifiers/*.json`, `data/seo-use-cases.js`
- Auth/DB: `pages/dashboard.js`, `prisma/schema.prisma`, `pages/api/auth/[...nextauth].js`
- Pricing/CTA: `components/sections/Pricing.js`

## Verification Plan

For each shipped item:
- `npm run dev` and exercise the feature end-to-end in browser on localhost:3000
- `npm run lint` and `npm run build` must pass before commit
- Regression: `/chatgpt-prompts-for/[modifier]` and `/[slug]` dynamic routes still render for all data files (Netlify build will fail loudly if not)
- For AI features: test against OpenAI/Anthropic APIs with env vars set; confirm no secrets leak to client bundle (search `.next/static` for `sk-`, `OPENAI_API_KEY`)
- For Prisma changes: `npx prisma migrate dev` locally; confirm migration is committed
- For auth-gated features: test both logged-out and logged-in states

## Constraints (from CLAUDE.md)

- Next.js 13 Pages Router only — no App Router
- Tailwind only — no CSS modules
- New sections go in `/components/sections/`
- "Join Now" is the universal CTA text pointing to the Teachable URL
- Dynamic SEO pages are data-driven — add data, not new page files
- Commit format: `<type>: <description>` (feat, fix, refactor, docs, test, chore, perf, ci)

## Sources

- [God of Prompt — AI Prompt Libraries Comparison](https://www.godofprompt.ai/blog/ai-prompt-libraries-comparison-features-pricing-quality)
- [God of Prompt — Honest Review of Popular Platforms](https://www.godofprompt.ai/blog/review-popular-ai-prompt-library-platforms)
- [God of Prompt — Pricing](https://www.godofprompt.ai/pricing)
- [Learn Prompting](https://learnprompting.org)
- [Zero To Mastery — Prompt Engineering Bootcamp](https://zerotomastery.io/courses/prompt-engineering-bootcamp/)
- [PE Collective — Best Prompt Engineering Courses 2026](https://pecollective.com/blog/best-prompt-engineering-courses/)
- [DataCamp — Top Prompt Engineering Certifications 2026](https://www.datacamp.com/blog/guide-to-prompt-engineering-certification)
- [Braintrust — Best Prompt Playgrounds 2026](https://www.braintrust.dev/articles/best-prompt-playgrounds-for-pms-2026)
- [Maxim — Top 5 Prompt Engineering Platforms 2026](https://www.getmaxim.ai/articles/top-5-prompt-engineering-platforms-in-2026-3/)
- [Eden AI — Top Platforms for Testing, Versioning & Monitoring](https://www.edenai.co/post/6-top-platforms-for-prompt-engineering-testing-versioning-monitoring)
