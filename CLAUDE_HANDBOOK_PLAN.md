# PromptWritingStudio — Claude Content Pivot Plan

**Prepared:** 2026-04-17
**Status:** Approved direction (Bryan sign-off 2026-04-17) — Phase 0 ready to execute
**Supersedes:** `/Users/bryancollins/Downloads/pivot-report.md` (original "AI Tools Hub" pivot report)

**Key decisions locked in:**
- **No domain change.** Staying on `promptwritingstudio.com`.
- **No rebrand.** Wordmark stays "Prompt Writing Studio" (not "The Claude Handbook"). The pivot is a **content repositioning**, not a brand swap.
- **13 RAG pages:** keep, update with Claude angle (not retire).
- **7 industry AI pages:** keep, update with Claude angle (not retire).
- **Exit-intent modal:** leave as-is (for now — re-target when email capture ready).
- **Instructor component:** leave as-is.

---

## 1. Executive Summary

PWS pivots from a dying prompt-engineering course funnel to a **Claude-focused content site** — the practical hub for getting real work done with Claude (Claude Code, Projects, Artifacts, Skills, MCP, sub-agents). The domain, brand, and wordmark stay as "Prompt Writing Studio." Only the content direction changes.

**Why this positioning (not generic "AI Tools Hub"):**

1. **White space exists.** No dominant editorial brand owns the Claude ecosystem. Simon Willison is closest but is personal-blog format. Builder.io, Every, HumanLayer, Shrivu Shankar each own *one* post each. There's no "handbook."
2. **PWS has zero LLM visibility today** (0/25 Claude queries cite the site). That's a blank slate — no cannibalisation, no rankings to protect, clean repositioning.
3. **Bryan has authentic authority.** Heavy daily Claude Code user across 11+ sites. BAWT audience gives the writer/non-technical-builder angle that's under-served.
4. **Narrower SERP, faster to rank** than generic "AI tools."
5. **Durable content possible** (workflow patterns, CLAUDE.md, decision frameworks) — less decay risk than pricing tables or "best tools 2026" listicles.

**Monetisation reality (honest):**

Traditional Claude-ecosystem affiliate revenue is thin. Cursor, Warp, Linear, Supabase, Pinecone, and Anthropic's consumer plan have **no paying consumer affiliate**. Confirmed paying:
- **Raycast** — 30% recurring on Pro (Wise payout)
- **Udemy** course affiliates (Eden Marco, Matt Pocock Claude Code courses) — ~15–20%
- **Vercel** — formal terms exist, rate unverified without joining
- **Sponsorships** (Warp has creator outreach at creators@warp.dev) — likely the real revenue path at scale
- **Own products** (email list, later: premium guides, templates, BAWT / Vendors.ie cross-sell)

**Don't apply to affiliate programs until traffic justifies it.** Thresholds: <5K monthly sessions = Anthropic credit referral only. 5–20K = Raycast, Warp, Udemy courses. 20K+ = sponsorship outreach.

---

## 2. Baseline — Where PWS Stands Today

### Traffic (GSC, last 28 days)

- **40 clicks / 2,600 impressions** — early-stage, indexed but not ranking well
- **Average position ~55** (page 5–8 territory)
- **Traffic workhorse:** `/ai-prompt-generator` — 1,542 impressions, position 70. Matches many queries, ranks for none.
- **Already page 1:** `/chatgpt-prompts-for/health` (pos 10.1)
- **Zombies (pos 1–20, 0 clicks):** `/ai-prompt-generator/art-styles-for-ai-prompts` (pos 9, 122 impressions), `/ai-models` (pos 8, 26 impressions), `/ai-prompt-generator/cool-ai-image-prompts` (pos 15, 57 impressions)

### LLM visibility (0% across 25 Claude queries)

**Competitor citations across the Claude keyword set:**
- `anthropic.com`: 26 citations (dominant)
- `promptingguide.ai`: 2
- `simonwillison.net`: 1 (sub-agents only)

**Three-tier opportunity map:**

**Tier 1 — Unclaimed (no competitor cited, easiest wins):**
- claude vs chatgpt
- claude vs gemini
- claude code vs cursor
- claude sonnet vs opus
- claude pro vs max
- how to use claude
- claude for coding
- claude sonnet vs opus

**Tier 2 — Anthropic cited 1–2×, beatable with tutorials:**
- claude code tutorial
- claude code setup
- claude code examples
- claude api tutorial
- claude api pricing

**Tier 3 — Anthropic dominates, win practitioner angle:**
- claude code mcp / hooks / slash commands / sub agents
- claude context window
- claude system prompt
- claude for business

### Current site state (per QA audit)

- 70% of the site is course-funnel infrastructure (shared components: Hero, Pricing, Guarantee, WhatYouGet, Testimonials, Instructor, ProblemSolution, Features)
- 8–10 pages already Claude-aligned
- 13 RAG pages (technically solid, no Claude angle, low commercial intent)
- 21 `/chatgpt-prompts-for/[modifier]` pages (data-driven — retitle at JSON layer)
- **P0 bug:** `/ai-models` lists "Claude 3.5 Opus" (doesn't exist) and fabricated GPT-5 benchmarks

---

## 3. Positioning

**Brand:** Prompt Writing Studio (unchanged)
**Domain:** `promptwritingstudio.com` (unchanged)
**New tagline / content focus:** *The practical guide to getting real work done with Claude.*
**Sub-framing:** "Claude Code, Projects, Artifacts, Skills, MCP — tested on real business problems."

**Voice:** Opinionated practitioner. Simon Willison meets HumanLayer meets a writer's clarity. Not reference docs. Not SEO-farm listicles.

**What the brand stays:** Prompt Writing Studio. Name, logo, wordmark all unchanged. The site's *content* shifts to Claude-specific territory; the shell and brand stay where they are.

**Anti-positioning (what we are NOT):**
- Not a prompt engineering course site
- Not a generic "AI tools" review hub (that's Vendors.ie territory for Irish B2B; and G2/Capterra for global)
- Not Anthropic's docs (they're reference; we're narrative + opinion)
- Not a model-hopping listicle farm (Claude-specific, deliberate focus)

---

## 4. Content Pillars

### Pillar 1 — Claude Code (primary, highest intent + authentic authority)

**Hub page:** `/claude-code` (reframe existing `/claude-code-guide` or keep as sub-page)

**Sub-pages to build:**
- `/claude-code/hooks` — "7 recipes that enforce rules you'll otherwise forget"
- `/claude-code/mcp` — "The Minimum Viable MCP Stack: 5 servers worth the context tokens"
- `/claude-code/skills` — "Writing your first Claude Skill: a SKILL.md walkthrough"
- `/claude-code/sub-agents` — "Offloading context to specialists"
- `/claude-code/slash-commands` — reference + recipes
- `/claude-code/claude-md-playbook` — "12 CLAUDE.md patterns I use across every project"
- `/claude-code/examples` — real sessions from PWS / Vendors / Tenders work
- `/claude-code/vs-cursor` — "The 30-day switch: what I kept, what I missed"
- `/claude-code/vs-cline`, `/claude-code/vs-aider`, `/claude-code/vs-copilot` — comparison cluster

### Pillar 2 — Claude (general product) workflows

**Hub page:** `/claude` (new)

- `/claude/projects` — structure, templates, system instructions patterns
- `/claude/artifacts` — gallery + build-along tutorials
- `/claude/pro-vs-max-vs-api` — which plan for your workload (reframed from `/calculators/ai-cost-comparison`)
- `/claude/context-window` — practical guide, not reference
- `/claude/system-prompts` — prompt patterns for Claude specifically
- `/claude/api-caching` — "Claude API caching math: when prompt caching actually saves money" (durable tutorial)

### Pillar 3 — Claude vs X (highest LLM-citation opportunity per the data)

**Tier 1 unclaimed keywords — build these first:**
- `/claude-vs-chatgpt` — head-to-head with task-specific verdicts
- `/claude-vs-gemini`
- `/claude-vs-perplexity`
- `/claude-sonnet-vs-opus`
- `/claude-projects-vs-custom-gpts-vs-gems`

### Pillar 4 — Claude for [Role] (role-based, leverages existing `/prompts/*` pages)

Rewrite existing role pages (currently generic "ChatGPT prompts for X"):
- `/claude-for-writers` — Bryan's core audience differentiator
- `/claude-for-marketers`
- `/claude-for-sales`
- `/claude-for-content-creators`
- `/claude-for-small-business`
- `/claude-for-product-managers` (new — Teresa Torres owns this; can challenge)
- `/claude-for-researchers` (new)

### Pillar 5 — Interactive tools (moat against AI Overviews — require user input)

Existing calculators stay, reframed for Claude decisions:
- `/calculators/claude-plan-picker` (rebuild of ai-cost-comparison — "Pro vs Max vs API for your workload")
- `/calculators/claude-readiness` (rebuild of business-ai-readiness — Claude-specific readiness criteria)
- `/calculators/claude-roi` (rebuild of roi-calculator — recommends Claude setup based on user inputs)
- Retain image prompt calculators as legacy traffic — they're Bryan's current best-performing cluster.

### Pillar 6 — RAG library (legacy, keep as Claude Projects context)

Reframe all 13 RAG pages with a "Using this with Claude Projects" footer. Low-effort refresh; preserves rankings; gives Projects cluster depth.

---

## 5. Must-Build Pages (first wave, prioritised by tier + volume + asset-fit)

Ranked by **(a)** search volume (from DataForSEO via SEO toolkit `/plan`, 2026-04-17), **(b)** LLM citation opportunity, **(c)** existing content lift, **(d)** authentic Bryan authority.

Volume numbers are monthly US searches; CPC is the commercial-intent signal.

| # | Title | Target keyword | Vol | CPC | Tier | Why now |
|---|---|---|---|---|---|---|
| 1 | **Claude Code: The Complete Practical Guide** | claude code | 368,000 | $13.28 | Head term | Huge volume. Hard SERP but PWS already has `/claude-code-guide` (842 lines) as starting point. Reposition as `/claude-code` hub page with sub-topic spokes. |
| 2 | **Claude vs ChatGPT: A Working Comparison** | claude vs chatgpt | 27,100 | $5.91 | Tier 1 | Zero competitor citations in LLMs. Highest-volume comparison term. |
| 3 | **Claude Code Pricing: Pro, Max, API, Teams — What It Actually Costs** | claude code pricing | 22,200 | $8.28 | Bottom-funnel | Commercial intent. Pair with existing calculator. |
| 4 | **Claude Code vs Cursor: The 30-Day Switch** | claude code vs cursor | 8,100 | $23.64 | Tier 1 | Narrative differentiation. High commercial intent (high CPC). |
| 5 | **What Is Claude Code? A Plain-English Explainer** | what is claude code | 8,100 | $16.31 | Informational | Direct-answer AEO play. Enables citation in LLM responses. |
| 6 | **The Minimum Viable MCP Stack: 5 Servers Worth the Context Tokens** | claude code mcp | 3,600 | $28.47 | Tier 3 | Very high CPC = enterprise intent. Counters SEO-farm "top 20 MCP servers" with opinionated pruning. |
| 7 | **Claude Code Hooks: 7 Recipes That Enforce Rules You'll Otherwise Forget** | claude code hooks | 2,900 | $28.11 | Tier 3 | High CPC. Thin editorial coverage. Concrete code snippets = LLM-citable. |
| 8 | **Claude Projects: Structure, Templates, System Prompts** | claude projects | 2,900 | $11.58 | Tier 3 | No dominant editorial brand. Seeds the Projects sub-cluster. |
| 9 | **Claude Artifacts: What They Are + 12 Real Build-Alongs** | claude artifacts | 2,900 | $14.51 | Tier 3 | Gallery + tutorials — unique format. |
| 10 | **Claude vs Gemini: A Working Comparison** | claude vs gemini | 2,900 | $16.98 | Tier 1 | Zero competitor citations. |
| 11 | **Claude Sonnet vs Opus: Which Model for Which Job** | claude sonnet vs opus | 2,900 | $10.38 | Tier 1 | Zero competitor citations. Decision-guide format. |
| 12 | **Anthropic API Pricing Explained + Caching Math** | anthropic api pricing | 2,400 | $21.60 | Commercial | High CPC. Fold in the durable "caching math" angle to fight decay. |
| 13 | **Claude Code Tutorial: From Install to Shipping Your First PR** | claude code tutorial | 1,900 | $16.15 | Tier 2 | Anthropic cited 1×; practical walkthrough beats reference docs. |
| 14 | **How to Use Claude: A Beginner's Operating Guide** | how to use claude | 1,900 | $6.54 | Tier 1 | Zero competitor citations. Beginner gateway page. |
| 15 | **Claude Pro vs Max vs API: Which Plan for Your Workload** | claude pro vs max | 1,300 | $36.00 | Tier 1 | Very high CPC ($36!) = strong commercial intent. Zero competitor citations. |
| 16 | **The CLAUDE.md Playbook: 12 Patterns I Use Across Every Project** | *(long-tail)* | — | — | Signature piece | HumanLayer owns canonical post — beatable with domain-specific libraries. Bryan has 11+ CLAUDE.md files live today. LLM-citation gold. |
| 17 | **Skills vs MCP vs Hooks vs Slash Commands: A Decision Tree** | *(long-tail)* | — | — | Signature piece | Fills a confusion gap nobody has filled; high share potential. |
| 18 | **Claude Code Sub-Agents: Offloading Context to Specialists** | claude code sub agents | 720 | $30.04 | Tier 3 | High CPC. Thin current coverage. Matches Simon Willison citation format. |
| 19 | **Claude Code Slash Commands: The Reference + Recipes** | claude code slash commands | 720 | $43.55 | Tier 3 | **$43 CPC** — very high commercial intent. |
| 20 | **Claude Context Window: What It Is and How to Actually Use 200K Tokens** | claude context window | 720 | $43.17 | Tier 3 | **$43 CPC**. Anthropic cited 2×; practitioner angle wins. |
| 21 | **Claude Code for Writers: How I Run a Newsletter in the Terminal** | claude for writing | 170 | $5.96 | Role | Bryan's unique angle; leverages BAWT audience; no real competition. |
| 22 | **Writing Your First Claude Skill: A SKILL.md Walkthrough** | *(emerging)* | — | — | Early-mover | Topic < 6 months old. |

**Note on total addressable traffic (Phase 1 head terms only):**
- claude code (368,000) + claude vs chatgpt (27,100) + claude code pricing (22,200) + claude code vs cursor (8,100) + what is claude code (8,100) = **~433,500 monthly searches** across the top 5 Phase 1 targets alone.
- Even 1–2% SERP capture at these volumes dwarfs current PWS traffic (40 clicks / 28 days).
- CPC average on Claude Code sub-topics runs $25–$45 — that's enterprise/SaaS bid territory (for context, generic "AI tools" averages $4–$10). Commercial intent is real.

**Format discipline (every page):**
1. **Direct-answer paragraph (40–60 words)** at the top — LLM-citable
2. **Comparison table or key-facts block** — scannable
3. **Step-by-step or detailed explanation** with real code/screenshots
4. **FAQPage schema** with 5+ questions
5. **Internal links** to hub + sibling pages

**Format discipline (every page):**
1. **Direct-answer paragraph (40–60 words)** at the top — LLM-citable
2. **Comparison table or key-facts block** — scannable
3. **Step-by-step or detailed explanation** with real code/screenshots
4. **FAQPage schema** with 5+ questions
5. **Internal links** to hub + sibling pages

---

## 6. Kill / Redirect List

### Retire immediately (no strategic value)

| Path | Action |
|---|---|
| `/best-telegram-ai-chatbots` | 301 → `/claude-code` |
| `/build-telegram-ai-chatbot` | 301 → `/claude-code` |
| `/telegram-ai-channel` | 301 → `/claude-code` |
| `/customgpt-ai-review` | 301 → `/claude-vs-chatgpt` (once built) |
| `/video-tutorials` | 301 → `/claude-code` (if course-gated) or delete |
| `/dashboard` | Delete (course dashboard) |
| `/auth/signin`, `/auth/verify`, `/auth/error` | Delete (course auth) |

### Retire components (shared across many pages)

| Component | Action |
|---|---|
| `components/sections/Pricing.js` | Delete (hardcoded $197 course) |
| `components/sections/Guarantee.js` | Delete (30-day money-back) |
| `components/sections/WhatYouGet.js` | Delete (course modules) |
| `components/sections/Testimonials.js` | Delete or repurpose for tool feedback |
| `components/sections/Instructor.js` | **Keep as-is** (Bryan's call) — revisit in Phase 2 |
| `components/sections/ProblemSolution.js` | Delete (course pitch framing) |
| `components/sections/Features.js` | Delete (course feature list) |

### Inline Join Now CTAs to strip

| File | Line |
|---|---|
| `pages/model-prompting-guide/index.js` | 132 |
| `pages/model-prompting-guide/[model].js` | 197 |
| `pages/prompt-examples/[slug].js` | 148 |
| `pages/prompt-examples/index.js` | 103 |
| `pages/ai-prompt-generator/index.js` | 1299 |
| `pages/index.js` | Exit-intent modal hardcoded to `checkout.teachable.com/secure/37332/...` |

### Fix P0 bugs before pivot launches

| Path | Fix |
|---|---|
| `/ai-models` | Remove "Claude 3.5 Opus" (doesn't exist). Correct lineup: Claude Opus 4, Claude Sonnet 4, Claude Haiku 3.5. Remove fabricated GPT-5 benchmark figures. |
| `/claude-code-guide` line 38 | Verify "Claude Opus 4 / Sonnet 4" claim against current Anthropic docs. |

### Keep + update (not retire — Bryan's call)

| Path | Action |
|---|---|
| 13 RAG pages (`/what-is-rag`, `/auto-rag`, `/self-rag`, `/graphrag`, etc.) | **Keep.** Add "Using with Claude Projects" footer section to each. Low effort, preserves rankings, seeds the Claude Projects internal-link cluster. |
| 7 industry AI pages (`/healthcare-ai`, `/legal-ai`, `/education-ai`, `/real-estate-ai`, `/content-creators-ai`, `/ecommerce-ai`, `/service-business-ai`) | **Keep.** Retitle as "Claude for [industry]" where it reads naturally, strip course CTAs, add 2–3 Claude-specific prompt examples per page. Phase 2 priority. |

---

## 7. Homepage Hero Variants (drafts)

**Current state:** `/pages/index.js` uses `<Hero />`, `<Pricing />`, `<Guarantee />`, `<WhatYouGet />`, etc. — all course-pitch components. Exit-intent modal hardcoded to Teachable checkout (leave as-is per Bryan's call).

**Branding note:** All variants keep "Prompt Writing Studio" as the wordmark. The H1 is content positioning, not a brand line.

### Variant A — Authority-led (Bryan's credential)

**Wordmark (nav):** Prompt Writing Studio
**H1:** Get Real Work Done With Claude
**Subhead:** Practical guides for Claude Code, Projects, Artifacts, and Skills — tested on real business problems by Bryan Collins, a Forbes contributor and daily Claude user across 11+ sites.
**CTA 1:** Read the Claude Code Guide → `/claude-code-guide`
**CTA 2:** Browse all guides → `/guides`
**Trust bar:** "As used across Vendors.ie, Tenderwatch, BAWT, FluentAtDesk, and 7 other sites."

### Variant B — Problem-led (for Claude Code audience)

**Wordmark (nav):** Prompt Writing Studio
**H1:** You installed Claude Code. Now what?
**Subhead:** Workflow recipes, CLAUDE.md patterns, hooks, MCP stacks, and sub-agent playbooks — the practical handbook Anthropic's docs don't publish.
**CTA 1:** Start with the CLAUDE.md playbook → `/claude-code/claude-md-playbook`
**CTA 2:** Read recent guides → `/guides`

### Variant C — Decision-led (AEO-optimised, direct-answer hook)

**Wordmark (nav):** Prompt Writing Studio
**H1:** The practical guide to getting real work done with Claude.
**Direct-answer paragraph:** Claude Code runs in your terminal and manages your codebase autonomously. Claude Projects holds persistent context. Claude Artifacts generates runnable apps. Claude Skills extends the model with reusable capabilities. This site shows when to use each, how to wire them together, and which workflow patterns actually hold up on real work.
**CTA 1:** Find the right Claude tool for your workflow → `/claude/decision-tree`
**CTA 2:** Take the Claude readiness quiz → `/calculators/claude-readiness`

**Recommendation:** Ship **Variant A** first (leverages Bryan's credentials), A/B test **C** after traffic grows (stronger LLM-citation structure).

---

## 8. Phased Roadmap (traffic-gated, not calendar-locked)

### Phase 0 — Foundation (Bryan sign-off required; 1–2 sessions of Claude Code work)

**Gate: none — start immediately after plan approval.**

1. Fix `/ai-models` P0 bug (remove fabricated Claude 3.5 Opus + GPT-5 benchmarks)
2. Strip course components from `/pages/index.js`; ship Variant A hero
3. Delete `/components/sections/Pricing.js`, `/Guarantee.js`, `/WhatYouGet.js`, `/ProblemSolution.js`, `/Features.js` (remove from all imports)
4. Strip 5 inline Join Now CTAs
5. Exit-intent modal: **leave as-is** (Bryan's call — revisit when email capture ready)
6. 301 redirects for 3 Telegram pages + `/customgpt-ai-review`
7. Delete course dashboard + `/auth/*` routes
8. Site-wide wordmark: **unchanged** — stays "Prompt Writing Studio"
9. Add `/disclosure` page (FTC-compliant affiliate disclosure, even without active affiliates — future-proofs the site)

**Outcome:** Site no longer pitches the course. Positioning is live.

### Phase 1 — Claude Code pillar + Tier 1 comparisons (gated on Phase 0)

**Gate: Phase 0 complete + homepage live with new positioning.**

Build in this order (priority from §5):

1. The CLAUDE.md Playbook
2. Claude Code Hooks: 7 Recipes
3. Skills vs MCP vs Hooks vs Slash Commands
4. The Minimum Viable MCP Stack
5. Claude vs ChatGPT (Tier 1 — fastest LLM citation win)
6. Claude vs Cursor: The 30-Day Switch
7. Claude Pro vs Max vs API

**Rewrites / retitles in parallel:**

- All 21 `/chatgpt-prompts-for/[modifier]` pages: update `/data/modifiers/*.json` to Claude-first framing (propagates across all 21)
- `/prompts/*` role pages: retitle as "Claude for [role]"

**KPI at end of Phase 1:** any measurable LLM citation (simonwillison model — even a single cite signals traction) + 1–3 Claude keywords ranking page 1.

### Phase 2 — Broaden Claude ecosystem coverage (gated on 5K+ monthly sessions)

- Claude Projects hub + templates library
- Claude Artifacts gallery
- Sub-agents deep-dive
- Writing Your First Claude Skill
- Claude for Writers / Marketers / PMs / Researchers rewrites
- Calculator rebuilds (Plan Picker, Readiness, ROI) with Claude-specific recommendations
- Apply to paying affiliates: Raycast, Udemy courses, Vercel (verify rate)

### Phase 3 — Monetisation scale (gated on 20K+ monthly sessions)

- Email list + lead magnet ("The Claude Handbook PDF")
- Sponsored content outreach (Warp creator programme, other dev tools)
- Premium content (gated deep-dive guides, Claude Project templates, workflow masterclasses)
- BAWT / Vendors.ie cross-promotion integrations

### Phase 4 — Beyond content: slash-command registry (product-layer bet)

**Gate: Phase 1 content live AND tools-strategy memory still holding AND ~30 min of curation effort per week available.**

The risk with Phase 1–3 is ending up as "another content site with calculators." To cross into durable differentiation, PWS needs a data asset that compounds via community submissions and backlinks. Target: **a curated directory of Claude Code slash commands**, one page per command.

**Why this specific bet:**
- No dominant competitor exists; `awesome-claude-code` GitHub lists have no discovery/SEO/ratings
- Supply is abundant: 46,080 `.claude/commands/*.md` files on public GitHub (searched 2026-04-17). Quality sample 5/5 publishable — polished frontmatter, real workflows, credit-able authors
- Content compounds — every command = one long-tail URL ranking for "claude code /pr-review command" etc.
- Backlink engine — each credited author links back from their repo README
- AEO-native — structured schema (name, description, code block) is exactly what LLMs cite
- Extends the existing brand position ("practical Claude hub") instead of pivoting off it
- Bryan already has ~15 battle-tested slash commands in `~/.claude/commands/` as the launch inventory

**V1 scope (weekend build):**
- `data/slash-commands/*.md` with frontmatter schema (name, author, tags, works-with, license)
- `pages/slash/[slug].js` — one page per command (getStaticPaths)
- `pages/slash/index.js` — directory with tag filter
- `pages/slash/category/[tag].js` — e.g. `/slash/category/git`
- `pages/slash/submit.js` — PR-based submission flow
- Seed: 15 (Bryan's) + 25-35 (curated from GitHub + practitioner blogs, with full attribution)
- All static. No DB, no accounts, no auth.

**Realistic curation funnel (verified):**
| Stage | Count |
|---|---|
| Total GitHub matches | 46,080 |
| Unique by content hash (est) | ~8,000 |
| Quality filter (substantive + generic-enough) | ~1,000 |
| Permissive-licensed (MIT/Apache) | ~500-700 |
| Hand-curated launch set | 50-100 |

**Risks:**
- **Curation effort is the bottleneck, not supply.** Needs a tight rubric (generic or clearly-labelled stack-specific; >10 lines; standard frontmatter; clear license) and ruthless rejection
- **Anthropic could build this themselves.** They haven't in 18 months; community-run directories historically outlast official ones
- **Claude Code-specific ceiling.** Doesn't generalise to Cursor/other IDEs — intentional focused bet
- **License review per entry** — most are MIT (fine); some AGPL (risky); some have no license (skip or ask)

**Monetisation tiers (later, if traction):**
- Sponsored category placement (e.g. "/deploy commands sponsored by Vercel")
- Affiliate embeds inside commands (`/seo-audit` using Ahrefs → affiliate link)
- Paid accounts for private team commands (only if V1 hits ~2K MAU)

**Success metric:**
- Launch: 50 curated commands, indexed, >5 external backlinks within 30 days
- 90 days: first unsolicited community PR submission
- 6 months: 150+ commands, ranking page-1 for "claude code slash commands", 25+ referring domains

---

## 9. SEO / AEO Operating Discipline

**Every new page ships with:**

1. **Direct-answer paragraph** (40–60 words) — verbatim-quotable block in H2 "What is [topic]?" format
2. **Comparison table or key-facts block** near the top
3. **Real code / real screenshots** — not stock diagrams
4. **FAQPage + HowTo schema** where applicable
5. **Internal links** to hub + 2 siblings minimum
6. **Entity-dense writing** — mention Anthropic, Claude Code, MCP, specific version numbers, pricing figures (version-dated)
7. **Author byline with Bryan's credentials** (Forbes contributor, USA Today best-seller, heavy Claude user)

**Decay-proofing:**
- Pricing figures: always dated + sourced inline ("As of April 2026, per Anthropic's pricing page")
- Model version numbers: flagged as updated-in-place
- Avoid "best X tools 2026" framing (listicle format decays)
- Prefer frameworks, decision trees, patterns (durable)

**Use SEO toolkit monthly:**
- `/gsc promptwritingstudio` — track traffic shift
- `/llm promptwritingstudio` — track LLM citation score (target: non-zero within 90 days of Phase 1)
- `/rank promptwritingstudio` — once `/track` keywords set
- `/audit promptwritingstudio [page]` — Lighthouse/on-page for new pillars

---

## 10. Decisions locked in (Bryan sign-off 2026-04-17)

1. **Domain / brand:** No change. Staying `promptwritingstudio.com`, wordmark stays "Prompt Writing Studio". Content pivots; brand does not.
2. **13 RAG pages:** Keep + update with Claude Projects angle.
3. **7 industry AI pages:** Keep + update with Claude-for-[industry] framing.
4. **Exit-intent modal:** Leave as-is for now.
5. **Instructor component:** Leave as-is for now.

---

## 11. What Claude Code will do autonomously (no Bryan input needed)

Upon approval of this plan:

- Apply the seed-keyword update (already done)
- Run `/plan promptwritingstudio` for volume data (running in background at plan-draft time)
- Generate individual page briefs for the 12 must-build pages (one markdown file per page under `briefs/claude-handbook/`)
- Draft the homepage replacement (keep as PR draft, no deploy)
- List exact file changes for Phase 0 strip-out (so approval → execution is one session)

---

## Appendix A — DataForSEO keyword volumes (top 30 from `/plan`, 2026-04-17)

Full plan saved at `~/src/seo-toolkit/data/plans/promptwritingstudio_plan_2026-04-17.json` (50 keywords).

| # | P | Keyword | Type | Intent | Volume | CPC |
|---|---|---|---|---|---|---|
| 1 | P1 | claude code | guide | informational | 368,000 | $13.28 |
| 2 | P1 | claude vs chatgpt | comparison | comparison | 27,100 | $5.91 |
| 3 | P1 | claude code pricing | guide | bottom-funnel | 22,200 | $8.28 |
| 4 | P1 | claude code vs cursor | comparison | comparison | 8,100 | $23.64 |
| 5 | P1 | what is claude code | explainer | informational | 8,100 | $16.31 |
| 6 | P1 | claude code mcp | guide | informational | 3,600 | $28.47 |
| 7 | P1 | claude code hooks | guide | informational | 2,900 | $28.11 |
| 8 | P1 | claude projects | guide | informational | 2,900 | $11.58 |
| 9 | P1 | claude artifacts | guide | informational | 2,900 | $14.51 |
| 10 | P1 | claude vs gemini | comparison | comparison | 2,900 | $16.98 |
| 11 | P1 | claude sonnet vs opus | comparison | comparison | 2,900 | $10.38 |
| 12 | P1 | anthropic api pricing | listicle | commercial | 2,400 | $21.60 |
| 13 | P1 | claude code tutorial | guide | informational | 1,900 | $16.15 |
| 14 | P1 | how to use claude | guide | informational | 1,900 | $6.54 |
| 15 | P1 | claude code review(s) | comparison | comparison | 1,900 | $27.55 |
| 17 | P1 | claude code setup | guide | informational | 1,300 | $22.01 |
| 18 | P1 | claude pro vs max | comparison | comparison | 1,300 | $36.00 |
| 19 | P1 | claude system prompt | guide | informational | 1,300 | $47.62 |
| 20 | P1 | claude prompts | guide | informational | 1,000 | $20.02 |
| 22 | P1 | claude code sub agents | guide | informational | 720 | $30.04 |
| 23 | P1 | claude code slash commands | guide | informational | 720 | $43.55 |
| 24 | P1 | claude context window | guide | informational | 720 | $43.17 |
| 25 | P1 | claude code free trial | guide | bottom-funnel | 720 | $24.81 |
| 31 | P1 | claude code alternatives | guide | listicle | 880 | $16.92 |
| 33 | P1 | claude for coding | guide | informational | 720 | $15.87 |
| 35 | P1 | claude for business | guide | informational | 590 | $8.53 |

## Appendix B — Data sources

- **Site audit:** `promptwritingstudio-qa` agent run 2026-04-17
- **GSC + LLM citations:** SEO toolkit run 2026-04-17 — full output at `/tmp/pws-baseline.txt`
- **Competitor / keyword research:** `content-researcher` agent run 2026-04-17
- **Anthropic affiliate verification:** [CommissionDex](https://commissiondex.com/program/claude-ai/) — Claude Pro referral pays $10 in usage credits, not cash
- **Claude Partner Network ($100M):** [anthropic.com/news/claude-partner-network](https://www.anthropic.com/news/claude-partner-network)

## Appendix C — Key competitor citations to study

- Simon Willison — practitioner voice: [simonwillison.net/tags/claude-code/](https://simonwillison.net/tags/claude-code/)
- HumanLayer — CLAUDE.md canonical: [humanlayer.dev/blog/writing-a-good-claude-md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- Shrivu Shankar — feature-by-feature: [blog.sshh.io/p/how-i-use-every-claude-code-feature](https://blog.sshh.io/p/how-i-use-every-claude-code-feature)
- Builder.io — SEO + workflow: [builder.io/blog/claude-code](https://www.builder.io/blog/claude-code)
- Every — narrative workflow: [every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five](https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five)
- Animalz — marketer angle: [animalz.co/blog/claude-code](https://www.animalz.co/blog/claude-code)
