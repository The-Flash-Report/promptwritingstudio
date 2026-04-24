# Site Glossary — Spec & Migration Plan

Status: **scaffold landed, data migration pending.**

Branch: `claude/create-site-glossary-7sQAf`

## Why

The existing `/ai-glossary` page is a 1,026-line monolith with 170 terms inlined. It gets no per-term search traffic and the "Learn more" links to deeper pages are a hardcoded if-ladder. This spec replaces it with a data-driven `/glossary` hub plus per-term pages at `/glossary/[slug]` — same pattern used for `/ai-prompt-generator/[slug]` and `/chatgpt-prompts-for/[modifier]`.

## Goals

1. Capture long-tail "what is X" traffic with one indexable page per term.
2. Keep a single browseable hub at `/glossary`.
3. Be data-driven so new terms = one entry in `/data/glossary.js`.
4. Interlink terms to each other and to deeper explainers (RAG pages, course CTA).

## URL structure

- `/glossary` — hub: search, category filters, A–Z index.
- `/glossary/[slug]` — one page per term (e.g. `/glossary/prompt-engineering`).
- `/ai-glossary` → 301 to `/glossary` (preserve backlinks).

## Data model

Single source of truth: `/data/glossary.js`.

```js
{
  slug: 'prompt-engineering',
  term: 'Prompt Engineering',
  aliases: ['prompt design', 'prompting'],
  category: 'prompting',
  shortDefinition: '...',             // 1 sentence, used in meta + cards
  definition: '...',                  // 2–4 sentences
  businessExample: '...',
  relatedTerms: ['few-shot-learning', 'system-prompt'],
  relatedPages: [
    { href: '/chatgpt-prompt-templates', label: 'ChatGPT Prompt Templates' }
  ],
}
```

## Categories

- `basics` — AI, ML, deep learning, neural network
- `business` — use case, ROI, human-in-the-loop
- `technology` — architectures, training methods, infra
- `ethics` — bias, hallucination, guardrails, privacy
- `prompting` — prompt engineering, few-shot, system prompt, prompt templates
- `rag` — RAG and all variants (Auto-RAG, GraphRAG, HybridRAG, etc.)
- `agents` — agents, function calling, multi-agent orchestration

## Schema.org

- Hub: `DefinedTermSet` wrapping all entries.
- Detail: `DefinedTerm` + `BreadcrumbList`.

## What's landed in this PR

- `/data/glossary.js` — data model + categories + **20 seed terms** covering all categories.
- `/pages/glossary/index.js` — working hub with search, category filter, A–Z index, schema.org.
- `/pages/glossary/[slug].js` — working per-term page with related terms, related pages, schema.org, Join Now CTA.

## TODO for the local agent picking this up

### 1. Migrate the remaining ~150 terms from `/pages/ai-glossary.js`

Source is the `glossaryTerms` array in `pages/ai-glossary.js` (lines ~32–513). For each term:

- Assign a `slug` (URL-safe, lowercased, strip parenthetical abbreviations — e.g. `Top-p (Nucleus Sampling)` → `top-p`).
- Write a 1-sentence `shortDefinition` (existing entries only have `definition`).
- Carry over `category`, `definition`, `businessExample`.
- Wire `relatedTerms` to other slugs (2–4 per entry).
- Copy `relatedPages` from the hardcoded if-ladder in `ai-glossary.js` (lines ~796–856). Mappings:

  | term                              | relatedPage           |
  | --------------------------------- | --------------------- |
  | Retrieval-Augmented Generation    | /what-is-rag          |
  | Fine-tuning                       | /what-is-fine-tuning  |
  | Embeddings                        | /what-are-embeddings  |
  | Vector Database                   | /what-is-a-vector-database |
  | Auto-RAG                          | /auto-rag             |
  | Self-RAG                          | /self-rag             |
  | FLARE / Active RAG                | /flare-active-rag     |
  | R^2AG                             | /r2ag                 |
  | GraphRAG                          | /graphrag             |
  | InFO-RAG                          | /info-rag             |
  | HybridRAG                         | /hybridrag            |
  | Corrective RAG                    | /corrective-rag       |
  | Speculative RAG                   | /speculative-rag      |
  | Reliability-Aware RAG (RA-RAG)    | /ra-rag               |
  | MoRAG                             | /morag                |

- Reclassify RAG-family terms from `technology` → `rag`, prompting terms → `prompting`, agent terms → `agents`.

### 2. Add the 301 redirect

In `next.config.js`, extend `redirects()`:

```js
{ source: '/ai-glossary', destination: '/glossary', permanent: true },
```

### 3. Delete `pages/ai-glossary.js`

Once the redirect is in and data migration is complete.

### 4. Update internal links

Replace `/ai-glossary` with `/glossary` across:

- `components/layout/Header.js`
- `components/layout/Footer.js`
- `components/ui/RelatedCalculators.js`
- `pages/what-is-rag.js`, `pages/what-are-embeddings.js`, `pages/what-is-fine-tuning.js`
- `pages/ai-history.js`, `pages/ai-models.js`

Find all with: `grep -rn "ai-glossary" . --include="*.js"`

### 5. Sitemap

Ensure `/glossary` and every `/glossary/[slug]` is emitted by the sitemap generator.

### 6. New terms worth seeding beyond the existing 170

Gaps for site-specific SEO:

- **Claude-family**: Opus, Sonnet, Haiku, Claude Code, CLAUDE.md, MCP, skill, hook, slash command (pages already exist — link out via `relatedPages`).
- **Prompting primitives**: stop sequence, chain-of-thought.

## Open questions

1. One file vs. split JSON? Recommend: one file until ~300 terms, then split to `/data/glossary/*.json`.
2. Category landing pages (`/glossary/category/[category]`)? Phase 2.
3. Autolinking plugin that converts term mentions across the site into `/glossary/[slug]` links? Phase 2.
