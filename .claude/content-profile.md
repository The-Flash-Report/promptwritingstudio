---
site: promptwritingstudio
status: starter — expand over time
---

# PromptWritingStudio — Content Profile

Site profile consumed by the global `content-producer` subagent and the orchestrator's sub-agents. Note: this is a **programmatic SEO** site — most "content" is template-driven via data files, not individual posts.

## Site identity
- **Name:** PromptWritingStudio
- **URL:** https://promptwritingstudio.com
- **Site root:** `~/src/promptwritingstudio`
- **SEO toolkit key:** `promptwritingstudio` *(confirm)*
- **Stack:** Next.js 13 Pages Router + Tailwind + Prisma + Netlify

## Audience
People searching for AI prompt help — "ChatGPT prompts for X", "AI prompt generator for Y". Intent ranges from free-lookup to course-buyer. Primary product: a single Teachable course.

## Moat (must appear on every post)
**Practical prompt templates that actually work + course-complement value.** At least one of:
- A fill-in-the-blank template with variable slots.
- A before/after output comparing weak vs strong prompt.
- A known-failure mode and how to avoid it.
- A specific domain context (industry, role, tool) that generic prompt lists miss.

No "revolutionary", "game-changing", "unlock the power of AI" filler.

## Data sources (authoritative — only reference what exists)
- **Programmatic data:** `/data/modifiers/*.json` → `/chatgpt-prompts-for/[modifier]` pages.
- **Use cases:** `/data/seo-use-cases.js` → `/ai-prompt-generator/[slug]` pages.
- **Prompt examples:** `/data/prompt-examples/*.json`.
- **Components:** `/components/tools/`, `/components/calculators/`, `/components/ai/` — reuse before inventing.

## Strict claim fields
- AI model names and capabilities — verify (model lineup shifts; claims decay fast).
- Pricing (ChatGPT Plus, Claude Pro, Gemini Advanced) — verify.
- Feature parity claims between models — verify per model release date.

## Tone of voice
- Direct, no-nonsense, practical.
- No hype ("unlock", "harness", "revolutionise").
- Templates over essays.

## Reference posts
*TODO: Bryan to name 2 strongest long-form posts / hub pages for tone calibration.*

## Internal link routes
- Programmatic hubs (`/chatgpt-prompts-for/<modifier>`, `/ai-prompt-generator/<slug>`)
- Tool pages (`/components/tools/` surfaces)
- Course landing page (primary money page)
- Blog posts

## Monetisation hooks (priority order)
1. **Teachable course** — single primary product. Every long-form post should route here eventually.
2. **Affiliate** — *TODO: confirm any AI-tool affiliate programmes active.*
3. **Newsletter signup** — *TODO: confirm list status.*

## Authoritative sources
- Vendor docs (OpenAI, Anthropic, Google) for model claims.
- Release notes / changelogs for feature claims.

## Draft destination
- **Long-form posts:** `/pages/blog/[slug].js` or MDX path — *TODO: confirm.*
- **Programmatic data:** update `/data/*` files rather than create new pages.

## Word count
1500-2500 for long-form pillar posts. Programmatic pages follow template word counts.

---

## Sub-agents (consumed by `site-orchestrator`)

- **qa:** *TODO: build `promptwritingstudio-qa` (template coverage, model-claim accuracy).*
- **seo:** `seo-specialist` (local, .claude/agents/)
- **code-review:** `code-reviewer` (local)
- **security:** `security-reviewer` (local)
- **monetise:** `site-monetiser` (global)
- **freshness:** `site-freshness` (global) — high priority on this site due to AI model churn.
- **grow-list:** `lead-magnet-producer` + `email-sequence-writer`

## Money pages
- **Course landing page** — primary. *TODO: exact URL.*
- **Tool pages** — `/components/tools/` surfaces rendered at specific routes.
- **Newsletter signup** — *TODO.*

## Lead magnets
Storage: *TODO — `/data/magnets/` or `/public/magnets/`.*
Existing: **none confirmed**.
Candidates:
- 50 prompt templates pack (course tease).
- AI model choice flowchart (which model for which task).
- Prompt-engineering checklist.

## Email (ESP)
- **Provider:** *TODO — Teachable built-in? ConvertKit? Mailgun?*
- **List/segment scheme:** *TODO.*
- **Cadence:** not established.

## Traffic gate
- `min_monthly_sessions_for_email: 500`

---

## Freshness note
This site has above-average freshness decay risk. AI model releases, pricing changes, and feature rollouts invalidate claims fast. Recommend quarterly `site-freshness` runs, not annual.