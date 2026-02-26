# Answer Engine Optimization (AEO) Strategy - PromptWritingStudio

## 1. Executive Summary

### What Is AEO?

Answer Engine Optimization (AEO) is the practice of structuring website content to be cited by AI-powered answer engines — Google AI Overviews, ChatGPT, Perplexity, and Bing Copilot. Unlike traditional SEO, which aims for blue-link clicks, AEO aims to get your content **selected as the source** when these systems synthesize answers.

### Why AEO Matters for PromptWritingStudio

- **Organic CTR drops 61%** on queries where Google AI Overviews appear — unless your page is cited, in which case clicks increase by 35%
- **76% of AI Overview citations** come from top-10 organic results, but **40% come from positions 11-20** — our 73 SEO pages have real citation opportunity even before reaching page 1
- **Prompt engineering queries are high-intent informational queries** — exactly the type AI Overviews answer most frequently
- Our $197 course conversion funnel depends on organic discovery; losing visibility to AI-generated answers without citation would directly impact revenue

### Target Outcome

Get PromptWritingStudio cited in Google AI Overviews and referenced by AI assistants for prompt engineering, business AI automation, and AI tool comparison queries. This preserves organic traffic while the search landscape shifts toward AI-synthesized answers.

---

## 2. Current State Audit

### What's Already Working

| Asset | Status | AEO Value |
|-------|--------|-----------|
| **73 programmatic SEO pages** | Live, indexed | Large surface area for citation opportunities |
| **FAQ schema on calculators** | Deployed via `CalculatorSchema.js` and `EnhancedFAQSchema.js` | FAQPage schema helps AI systems extract Q&A pairs |
| **HowTo schema utilities** | Available in `schemaGenerator.js` | Ready to deploy on tutorial/guide pages |
| **Organization schema** | On homepage (`pages/index.js`) | Establishes entity identity for AI systems |
| **Calculator tools** (ROI, Cost Comparison) | Live with structured data | Interactive tools that answer specific queries |
| **Homepage FAQ section** | 6 course-related FAQs in `components/sections/FAQ.js` | Answering purchase-intent questions |
| **Business-focused content** | Aligned with `BUSINESS_STRATEGY.md` positioning | Matches high-commercial-intent queries |

### Gaps Identified

| Gap | Impact | Priority |
|-----|--------|----------|
| **No answer-first content blocks** | AI systems can't easily extract concise definitions/answers from page tops | Critical |
| **Limited FAQ coverage** | Only calculator pages and homepage have FAQs; 73 SEO pages have zero FAQs | Critical |
| **No FAQPage schema on SEO pages** | 73 pages missing structured FAQ data for AI extraction | Critical |
| **No Article schema** | Content pages lack `dateModified`, `author`, `headline` markup | High |
| **No author E-E-A-T signals** | No bylines, credentials, or Person schema anywhere | High |
| **No freshness signals** | No "last updated" dates, no `dateModified` in schema | High |
| **No comparison tables** | Platform comparison queries (ChatGPT vs Claude) go unanswered in structured format | Medium |
| **No outbound citations** | Pages don't reference authoritative sources (OpenAI docs, research papers) | Medium |
| **Paragraph-heavy content** | SEO pages use prose instead of lists/tables that AI systems prefer to extract | Medium |

---

## 3. Target Query Categories

### Category 1: Prompt Engineering Definitions (Highest AEO Potential)

These are "What is..." queries that AI Overviews almost always answer.

| Target Query | Matching Page | Search Vol |
|--------------|---------------|------------|
| "What are AI prompts" | `/what-are-ai-prompts` | 150/mo |
| "What are prompts in AI" | `/what-are-prompts-in-ai` | 90/mo |
| "How to write AI prompts" | `/how-to-write-ai-prompts` | 250/mo |
| "How to write effective AI prompts" | `/how-to-write-effective-ai-prompts` | 90/mo |
| "How to write good AI prompts" | `/how-to-write-good-ai-prompts` | 70/mo |
| "Best practices for writing AI prompts" | `/best-practices-for-writing-ai-prompts` | 40/mo |
| "How to write prompts for AI art" | `/how-to-write-prompts-for-ai-art` | 100/mo |
| "How to write AI image prompts" | `/how-to-write-ai-image-prompts` | 80/mo |
| "What is a prompt generator" | Gap — no dedicated page | — |
| "What is prompt engineering" | Gap — no dedicated page | — |

**AEO Action**: Add 40-60 word answer blocks at the top of each page that directly answer the query. These become the extractable snippet.

### Category 2: AI Tool Generators (Highest Traffic)

These are tool-seeking queries where AI Overviews often provide lists and comparisons.

| Target Query | Matching Page | Search Vol |
|--------------|---------------|------------|
| "AI image prompt generator" | `/image-prompt` | 4,600/mo |
| "ChatGPT prompt generator" | `/chatgpt-prompt` | 3,500/mo |
| "Free prompt generator" | `/free-prompt-generator` | 1,400/mo |
| "AI writing prompt generator" | `/writing-prompt` | 1,200/mo |
| "Product description prompt generator" | `/product-description-prompt` | 1,200/mo |
| "Claude prompt generator" | `/claude-prompt` | 1,000/mo |
| "Marketing copy prompt generator" | `/marketing-copy-prompt` | 950/mo |
| "Gemini prompt generator" | `/gemini-prompt` | 800/mo |
| "Blog post prompt generator" | `/blog-post-prompt` | 1,800/mo |
| "Social media prompt generator" | `/social-media-prompt` | 1,600/mo |

**AEO Action**: Add comparison context ("Unlike generic generators, this tool..."), feature lists, and "how it works" step-by-step sections with HowTo schema.

### Category 3: Platform-Specific Prompt Collections

These are "best prompts for X" queries where AI Overviews present curated lists.

| Target Query | Matching Page | Search Vol |
|--------------|---------------|------------|
| "Art styles for AI prompts" | `/art-styles-for-ai-prompts` | 3,600/mo |
| "AI art prompts" | `/ai-art-prompts` | 500/mo |
| "Best AI prompts" | `/best-ai-prompts` | 350/mo |
| "Character AI prompts" | `/character-ai-prompts` | 250/mo |
| "Suno AI prompts" | `/suno-ai-prompts` | 200/mo |
| "Midjourney AI prompts" | `/midjourney-ai-prompts` | 80/mo |
| "Leonardo AI prompts" | `/leonardo-ai-prompts` | 100/mo |

**AEO Action**: Structure content as numbered/bulleted lists of prompts. AI systems strongly prefer extracting from list formats.

### Category 4: Business & Professional AI Use Cases

These align with the site's $197 course funnel and have high commercial intent.

| Target Query | Matching Page | Search Vol |
|--------------|---------------|------------|
| "AI prompts for marketing" | `/ai-prompts-for-marketing` | 70/mo |
| "AI prompts for business" | `/ai-prompts-for-business` | 60/mo |
| "AI prompts for sales" | `/ai-prompts-for-sales` | 40/mo |
| "AI prompts for content creation" | `/ai-prompts-for-content-creation` | 40/mo |
| "ChatGPT prompts for email marketing" | `/chatgpt-prompt-for-email-marketing` | 650/mo |
| "AI prompts for teachers" | `/ai-prompts-for-teachers` | 80/mo |
| "AI resume prompts" | `/ai-resume-prompts` | 100/mo |

**AEO Action**: Add ROI-focused answer blocks ("Using AI prompts for marketing can save 10+ hours/week..."), include case study snippets, and add comparison tables.

### Category 5: AI Art & Image Specific Queries

Visual-content queries where AI Overviews often include step-by-step guides.

| Target Query | Matching Page | Search Vol |
|--------------|---------------|------------|
| "AI image prompts" | `/ai-image-prompts` | 400/mo |
| "AI prompts for images" | `/ai-prompts-for-images` | 100/mo |
| "Best AI image prompts" | `/best-ai-image-prompts` | 80/mo |
| "AI prompts for logo design" | `/ai-prompts-for-logo-design` | 40/mo |
| "Negative prompts for AI" | `/negative-prompts-for-ai` | 70/mo |
| "AI art style prompts" | `/ai-art-style-prompts` | 100/mo |
| "Fun AI prompts for art" | `/fun-ai-prompts-for-art` | 100/mo |

**AEO Action**: Add visual comparison tables (style name | description | example prompt | best platform), step-by-step HowTo schema for creating images.

---

## 4. Content Optimization Framework

### 4.1 Answer-First Architecture

Every page should open with a direct, concise answer to the query the page targets. This is the single highest-impact AEO change.

**Format**: 40-90 words, placed immediately after the H1, before any other content.

**Template**:
```
<div class="answer-block">
  <p><strong>[Keyword phrase]</strong> [are/is] [concise definition or answer].
  [One sentence of supporting context]. [One sentence connecting to business value
  or practical outcome].</p>
</div>
```

**Examples**:

For `/what-are-ai-prompts`:
> **AI prompts** are specific instructions or questions you give to an AI tool like ChatGPT, Claude, or Gemini to get a desired output. They act as the communication bridge between you and the AI — the better your prompt, the more useful the response. Businesses using well-crafted prompts report saving 10-20 hours per week on content creation, customer service, and data analysis.

For `/how-to-write-effective-ai-prompts`:
> **To write effective AI prompts**, start with a clear role assignment, provide specific context, state your desired output format, and include examples of what you want. The most effective prompts follow a structured framework: Role + Context + Task + Format + Constraints. This approach consistently produces 3-5x better AI outputs across ChatGPT, Claude, and Gemini.

For `/chatgpt-prompt`:
> **A ChatGPT prompt generator** is a tool that creates optimized prompts for OpenAI's ChatGPT based on your specific use case and requirements. Instead of writing prompts from scratch, you select your goal, provide context, and receive a ready-to-use prompt engineered for better AI responses. Our free generator covers 50+ business, writing, and creative categories.

**Implementation**: Add answer blocks to all 73 SEO pages. Start with the top 15 pages by search volume.

### 4.2 Structured Formatting

AI systems extract from structured content 2.5x more than from paragraph text. Convert key content sections:

**Lists over paragraphs**:
- Convert "here are some tips" paragraphs into numbered lists
- Use bullet points for feature comparisons
- Every "how to" section should be numbered steps

**Tables for comparisons**:
```markdown
| Feature | ChatGPT | Claude | Gemini |
|---------|---------|--------|--------|
| Best for | General tasks | Long documents | Research |
| Free tier | GPT-3.5 | Limited | Yes |
| Price | $20/mo | $20/mo | $20/mo |
```

**Definition lists for glossary-style content**:
- Bold the term, follow with a concise definition
- Keep each definition under 50 words

### 4.3 FAQ Expansion

Current state: Only calculator pages and the homepage have FAQs. Target: Every SEO page should have 8-12 targeted FAQs.

**FAQ Research Process**:
1. Search the target keyword in Google
2. Capture all "People Also Ask" (PAA) questions
3. Check Perplexity.ai and ChatGPT for what questions they answer about the topic
4. Include 2-3 long-tail question variations

**FAQ Writing Rules**:
- Answer in 40-80 words (the ideal extraction length for AI Overviews)
- Start the answer with a direct statement, not "Yes," or "Well,"
- Include one specific stat, number, or example per answer
- Reference the page's primary keyword naturally

**Priority FAQ Topics per Page Type**:

| Page Type | FAQ Topics to Cover |
|-----------|-------------------|
| Generator pages | How it works, who it's for, is it free, what platforms it works with, how is it different |
| "How to" pages | Common mistakes, time to learn, prerequisites, tools needed, expected results |
| "Best of" pages | Selection criteria, how often updated, platform differences, beginner vs advanced |
| Business pages | ROI expectations, implementation time, team adoption, cost savings |

### 4.4 Comparison Tables

Create structured comparison content for queries where users compare AI tools. These are heavily featured in AI Overviews.

**Priority Comparison Tables to Add**:

1. **ChatGPT vs Claude vs Gemini** — add to `/chatgpt-prompt`, `/claude-prompt`, `/gemini-prompt`
2. **Midjourney vs DALL-E vs Stable Diffusion** — add to AI art pages
3. **Free vs Paid AI Tools** — add to `/free-prompt-generator`
4. **AI Prompt Generators Comparison** — add to `/ai-prompts-generator`

**Table Format** (optimized for AI extraction):
```html
<table>
  <thead>
    <tr><th>Feature</th><th>ChatGPT</th><th>Claude</th><th>Gemini</th></tr>
  </thead>
  <tbody>
    <tr><td>Best for</td><td>General tasks, coding</td><td>Long documents, analysis</td><td>Research, multimodal</td></tr>
    <tr><td>Free tier</td><td>GPT-3.5 (limited GPT-4)</td><td>Limited daily usage</td><td>Yes, with limits</td></tr>
    <tr><td>Prompt style</td><td>Conversational</td><td>Detailed instructions</td><td>Natural language</td></tr>
    <tr><td>Context window</td><td>128K tokens</td><td>200K tokens</td><td>1M tokens</td></tr>
  </tbody>
</table>
```

### 4.5 Freshness Protocol

AI systems weight recently updated content higher in citations. Establish a quarterly refresh cadence.

**Every page should display**:
- "Last updated: [Month Year]" below the H1
- Current year stats and pricing (no "2024" references in 2026)

**Quarterly content refresh checklist**:
- [ ] Update AI model names and versions (GPT-4o, Claude 3.5, Gemini 2.0, etc.)
- [ ] Refresh pricing data for all mentioned tools
- [ ] Update search volume estimates in internal docs
- [ ] Add any new People Also Ask questions as FAQs
- [ ] Update comparison tables with latest features
- [ ] Bump `dateModified` in Article schema

---

## 5. Schema Markup Expansion Plan

### Current Schema Infrastructure

| File | Schema Types | Where Used |
|------|-------------|------------|
| `lib/schemaGenerator.js` | WebApplication, Breadcrumb, HowTo, FAQ, Rating | Calculator pages |
| `components/ui/EnhancedFAQSchema.js` | FAQPage, HowTo, SoftwareApplication | Calculator pages |
| `components/ui/CalculatorSchema.js` | WebApplication, FAQPage, SoftwareApplication | Calculator pages |
| `pages/index.js` (inline) | Organization, WebSite, SearchAction | Homepage only |

### Priority 1: FAQPage Schema on All SEO Pages (Critical)

**Current**: Only calculator pages have FAQPage schema.
**Target**: All 73 SEO pages + homepage + tool pages.

**Implementation approach**: Extend the existing `generateFAQSchema()` function from `lib/schemaGenerator.js` and inject it into the SEO page template.

```javascript
// In each SEO page's Head section:
<script type="application/ld+json">
{JSON.stringify(generateFAQSchema(pageFAQs))}
</script>
```

Each page needs a minimum of 5 FAQs. Priority pages (top 15 by search volume) should have 8-12.

### Priority 2: Article Schema on Content Pages (High)

Add Article schema to all SEO pages and content pages. This provides AI systems with structured metadata about authorship, publication date, and topic.

```javascript
// New function for lib/schemaGenerator.js
export function generateArticleSchema(config) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": config.title,
    "description": config.description,
    "url": config.url,
    "datePublished": config.datePublished,
    "dateModified": config.dateModified,
    "author": {
      "@type": "Person",
      "name": "Bryan Collins",
      "url": "https://promptwritingstudio.com/about",
      "jobTitle": "AI Prompt Engineering Instructor",
      "sameAs": [
        "https://twitter.com/bryancollins",
        "https://linkedin.com/in/bryancollins"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Prompt Writing Studio",
      "url": "https://promptwritingstudio.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://promptwritingstudio.com/images/logo.png"
      }
    },
    "mainEntityOfPage": config.url,
    "keywords": config.keywords
  }
}
```

### Priority 3: HowTo Schema on Guide Pages (Medium)

The `generateHowToSchema()` function already exists in `schemaGenerator.js`. Deploy it on:

- All "how to write" pages (8 pages)
- Generator tool pages (position as "how to use" guides)
- Any page with step-by-step instructions

### Priority 4: Person Schema for Author E-E-A-T (Medium)

Add Person schema for Bryan Collins as the site's primary author/instructor. This helps AI systems verify expertise claims.

```javascript
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Bryan Collins",
    "jobTitle": "AI Prompt Engineering Instructor",
    "description": "Author and educator specializing in AI prompt engineering for business professionals. Creator of the Prompt Writing Studio course.",
    "url": "https://promptwritingstudio.com/about",
    "worksFor": {
      "@type": "Organization",
      "name": "Prompt Writing Studio"
    },
    "knowsAbout": [
      "AI Prompt Engineering",
      "ChatGPT",
      "Claude",
      "Gemini",
      "Business AI Automation",
      "Content Creation with AI"
    ],
    "sameAs": [
      "https://twitter.com/bryancollins",
      "https://linkedin.com/in/bryancollins"
    ]
  }
}
```

### Schema Deployment Order

| Phase | Schema Type | Pages | Effort |
|-------|-----------|-------|--------|
| Week 1-2 | FAQPage | Top 15 SEO pages | Add FAQ content + schema |
| Week 3-4 | FAQPage | Remaining 58 SEO pages | Template-driven rollout |
| Week 5-6 | Article | All 73 SEO pages | Add `generateArticleSchema` to template |
| Week 7-8 | HowTo | 8 "how to" pages + generators | Deploy existing function |
| Week 9-10 | Person | Site-wide (about page + author bylines) | New component |

---

## 6. E-E-A-T Reinforcement

Google's AI Overviews heavily favor content demonstrating Experience, Expertise, Authoritativeness, and Trustworthiness. The site currently has weak E-E-A-T signals.

### 6.1 Author Bylines

**Current**: No author attribution on any page.
**Target**: Every content page displays author name, credential, and link to author bio.

**Implementation**:
```jsx
// Author byline component for SEO pages
<div class="author-byline">
  <img src="/images/bryan-collins.jpg" alt="Bryan Collins" />
  <div>
    <p>By <a href="/about">Bryan Collins</a></p>
    <p>AI Prompt Engineering Instructor | 100+ hours testing AI tools</p>
  </div>
  <p>Last updated: February 2026</p>
</div>
```

### 6.2 Outbound Citations to Authoritative Sources

AI systems trust content that references primary sources. Add outbound links to:

| Source | Use On | Example |
|--------|--------|---------|
| OpenAI Documentation | ChatGPT-related pages | Link to official prompting guide |
| Anthropic Documentation | Claude-related pages | Link to Claude prompting docs |
| Google AI Documentation | Gemini-related pages | Link to Gemini API docs |
| Research papers | "How to write" pages | Link to prompt engineering research |
| Industry reports | Business AI pages | Link to McKinsey/Gartner AI reports |

**Rule**: Each SEO page should have 2-4 outbound links to authoritative external sources.

### 6.3 First-Hand Experience Signals

AI Overviews increasingly cite content that demonstrates real testing and experience.

**Add to key pages**:
- "We tested this with [specific AI model version]" statements
- Screenshots of actual AI outputs (with alt text describing the result)
- Specific metrics: "In our testing, structured prompts produced 73% more relevant outputs"
- Before/after examples from real usage

### 6.4 "Last Updated" Dates

**Display format**: "Last updated: [Month] [Year]" — visible near the H1 on every page.

**Schema format**: `dateModified` field in Article schema (see Section 5, Priority 2).

**Update trigger**: Any content change should bump the displayed date and schema date.

---

## 7. Technical Optimizations

### 7.1 Page Speed Targets

Pages that load in under 0.4 seconds FCP (First Contentful Paint) are **3x more likely** to be cited in AI Overviews.

**Current architecture advantages**:
- Next.js with SSG/SSR provides fast initial loads
- Programmatic pages share a common template (minimal JS variation)

**Optimizations needed**:
- [ ] Audit FCP on top 15 SEO pages using PageSpeed Insights
- [ ] Lazy-load FAQ accordion JavaScript (only hydrate on interaction)
- [ ] Optimize images on any pages adding visual comparison content
- [ ] Ensure no layout shift from dynamically loaded schema scripts

### 7.2 Multi-Modal Content

AI Overviews increasingly pull from pages with images and video. Currently, SEO pages are text-only.

**Priority additions**:
- Infographics for "how to write prompts" pages (prompt framework diagrams)
- Comparison chart images for platform comparison sections
- Short video embeds on top 5 highest-traffic pages
- Proper `alt` text on all images (descriptive, keyword-natural)

### 7.3 Internal Linking for Topical Authority

AI systems assess topical authority through internal link clusters. Create tight linking between related pages.

**Cluster Map**:

| Hub Page | Spoke Pages |
|----------|-------------|
| `/how-to-write-ai-prompts` | `/how-to-write-effective-ai-prompts`, `/how-to-write-good-ai-prompts`, `/best-practices-for-writing-ai-prompts`, `/how-to-write-prompts-for-ai` |
| `/ai-art-prompts` | `/art-styles-for-ai-prompts`, `/ai-art-style-prompts`, `/fun-ai-prompts-for-art`, `/best-ai-art-prompts`, `/how-to-write-ai-art-prompts` |
| `/ai-image-prompts` | `/ai-prompts-for-images`, `/best-ai-image-prompts`, `/how-to-write-ai-image-prompts`, `/ai-image-generation-prompts`, `/cool-ai-image-prompts` |
| `/chatgpt-prompt` | `/chatgpt-prompt-for-email-marketing`, `/ai-prompts-for-marketing`, `/ai-prompts-for-business` |
| `/best-ai-prompts` | `/good-ai-prompts`, `/ai-prompts-examples`, `/generative-ai-prompts` |

**Implementation**: Add a "Related Guides" section at the bottom of each page linking to 3-5 cluster siblings. Use descriptive anchor text (not "click here").

---

## 8. Implementation Roadmap

### Phase 1: Quick Wins (Weeks 1-4) -- COMPLETED Feb 2026

Focus on the 15 highest-traffic pages. These changes require content additions only — no code changes.

| Task | Pages | Expected Impact | Status |
|------|-------|----------------|--------|
| Add answer-first blocks (40-90 words) | All 73 pages | Direct citation eligibility | DONE |
| Add 5-8 FAQs per page (8 for top 15) | All 73 pages | PAA/AI Overview coverage | DONE |
| Add "Last updated: [Month Year]" | All 73 pages | Freshness signals | DONE |
| Add 2-4 outbound authority links | Top 15 pages | Trust signals | Pending |
| Convert paragraph content to lists/tables | Top 15 pages | Structured extraction | Pending |

**Top 15 pages by search volume**:
1. `/image-prompt` (4,600/mo)
2. `/art-styles-for-ai-prompts` (3,600/mo)
3. `/chatgpt-prompt` (3,500/mo)
4. `/blog-post-prompt` (1,800/mo)
5. `/social-media-prompt` (1,600/mo)
6. `/free-prompt-generator` (1,400/mo)
7. `/writing-prompt` (1,200/mo)
8. `/product-description-prompt` (1,200/mo)
9. `/claude-prompt` (1,000/mo)
10. `/marketing-copy-prompt` (950/mo)
11. `/gemini-prompt` (800/mo)
12. `/chatgpt-prompt-for-email-marketing` (650/mo)
13. `/ai-art-prompts` (500/mo)
14. `/video-prompt` (450/mo)
15. `/ai-image-prompts` (400/mo)

### Phase 2: Schema Deployment (Weeks 5-8) -- COMPLETED Feb 2026

Code changes to add structured data across all pages.

| Task | Scope | Implementation | Status |
|------|-------|---------------|--------|
| Deploy FAQPage schema | All 73 SEO pages | Added `generateFAQSchema()` to `[slug].js` template | DONE |
| Deploy Article schema | All 73 SEO pages | Added `generateArticleSchema()` to `schemaGenerator.js` + template | DONE |
| Deploy HowTo schema | All SEO pages | Added `generateHowToSchema()` to `[slug].js` template | DONE |
| Add Person schema | `schemaGenerator.js` | Created `generatePersonSchema()` function | DONE |
| Add comparison table markup | 10 generator pages | Semantic HTML tables with headers | Pending |

### Phase 3: E-E-A-T Build-Out (Weeks 9-12)

Authority and trust signals that require content creation and design.

| Task | Details |
|------|---------|
| Create author bio page | `/about` page with credentials, experience, and Person schema |
| Add author bylines | Component on all content pages with photo + credentials |
| Add experience signals | "We tested..." sections on top 15 pages |
| Add outbound citations | 2-4 authoritative links per page across all 73 pages |
| Create comparison tables | ChatGPT vs Claude vs Gemini on relevant pages |
| Internal link clusters | "Related Guides" section on all pages |

### Phase 4: Ongoing Optimization (Quarterly)

Recurring maintenance to sustain AEO performance.

| Task | Frequency |
|------|-----------|
| Update AI model names, versions, and pricing | Quarterly |
| Refresh FAQs with new People Also Ask questions | Quarterly |
| Update comparison tables with latest features | Quarterly |
| Bump `dateModified` on all refreshed pages | With each update |
| Audit AI Overview citations for target queries | Monthly |
| Add new pages for emerging query opportunities | As identified |
| Review and update stats/data references | Quarterly |

---

## 9. Measurement & KPIs

### Primary Metrics

| Metric | How to Measure | Target |
|--------|---------------|--------|
| **AI Overview Impressions** | Google Search Console > Search Appearance filter (when available) | Track trend line |
| **AI Overview CTR** | GSC clicks on queries that trigger AI Overviews | Maintain or improve current CTR |
| **Citation Rate** | Manual audit: search 20 target queries monthly, count citations | 5+ citations within 6 months |
| **FAQ/PAA Appearances** | GSC > Performance > Search Appearance > FAQ rich results | 20+ FAQ appearances |

### Secondary Metrics

| Metric | How to Measure | Target |
|--------|---------------|--------|
| **Answer Coverage** | % of target queries where site appears in AI Overview | 25% within 6 months |
| **Schema Validation** | Google Rich Results Test on all pages | 100% valid, 0 errors |
| **Page Speed (FCP)** | PageSpeed Insights on top 15 pages | < 0.4s on all 15 |
| **Freshness Score** | % of pages updated within last 90 days | 100% of top 15 |

### Tracking Process

**Monthly (15 min)**:
1. Search 20 target queries in Google (logged out, incognito)
2. Record which trigger AI Overviews
3. Record if PromptWritingStudio is cited
4. Note competitor citations for gap analysis

**Quarterly (1 hour)**:
1. Full GSC performance review filtered by AI Overview queries
2. Update this strategy document with findings
3. Adjust priority pages based on new data
4. Plan next quarter's content refresh

### Share of Model Tracking

Track whether AI assistants (ChatGPT, Claude, Perplexity) reference or recommend PromptWritingStudio when answering prompt engineering queries.

**Test queries to check monthly**:
- "What is the best prompt generator?"
- "How do I write better AI prompts?"
- "What are good ChatGPT prompts for business?"
- "Best free AI prompt tools"
- "How to learn prompt engineering"

---

## 10. Priority Pages — AEO Potential Ranking

Pages ranked by a composite score of search volume, query type (how well it matches AI Overview format), and commercial value to the business.

### Tier 1: Highest AEO Priority (Optimize First)

These pages have the best combination of traffic, citation-friendly query format, and conversion potential.

| Rank | Page | Search Vol | Query Type | AEO Score |
|------|------|-----------|------------|-----------|
| 1 | `/how-to-write-effective-ai-prompts` | 90 | How-to (high AIO rate) | 95 |
| 2 | `/chatgpt-prompt` | 3,500 | Tool query | 93 |
| 3 | `/what-are-ai-prompts` | 150 | Definition (very high AIO rate) | 92 |
| 4 | `/how-to-write-ai-prompts` | 250 | How-to (high AIO rate) | 91 |
| 5 | `/image-prompt` | 4,600 | Tool query (highest traffic) | 90 |
| 6 | `/art-styles-for-ai-prompts` | 3,600 | List query (high AIO rate) | 89 |
| 7 | `/claude-prompt` | 1,000 | Tool query | 88 |
| 8 | `/best-ai-prompts` | 350 | "Best of" list | 87 |
| 9 | `/ai-prompts-for-business` | 60 | Business intent (high conversion) | 86 |
| 10 | `/chatgpt-prompt-for-email-marketing` | 650 | Specific how-to | 85 |

### Tier 2: High AEO Priority

Strong potential — address in Phase 1-2.

| Rank | Page | Search Vol | Query Type | AEO Score |
|------|------|-----------|------------|-----------|
| 11 | `/gemini-prompt` | 800 | Tool query | 83 |
| 12 | `/blog-post-prompt` | 1,800 | Tool query | 82 |
| 13 | `/free-prompt-generator` | 1,400 | Tool comparison | 81 |
| 14 | `/social-media-prompt` | 1,600 | Tool query | 80 |
| 15 | `/how-to-write-good-ai-prompts` | 70 | How-to | 79 |
| 16 | `/writing-prompt` | 1,200 | Tool query | 78 |
| 17 | `/product-description-prompt` | 1,200 | Tool query (e-commerce) | 77 |
| 18 | `/marketing-copy-prompt` | 950 | Tool query (business) | 76 |
| 19 | `/ai-prompts-for-marketing` | 70 | Business intent | 75 |
| 20 | `/what-are-prompts-in-ai` | 90 | Definition | 74 |

### Tier 3: Medium AEO Priority

Address in Phase 2-3 after top 20 pages are optimized.

| Rank | Page | Search Vol | Query Type | AEO Score |
|------|------|-----------|------------|-----------|
| 21 | `/best-practices-for-writing-ai-prompts` | 40 | How-to / best practices | 72 |
| 22 | `/ai-prompts-examples` | 250 | Example list | 71 |
| 23 | `/how-to-write-prompts-for-ai` | 150 | How-to | 70 |
| 24 | `/ai-art-prompts` | 500 | Collection list | 69 |
| 25 | `/video-prompt` | 450 | Tool query | 68 |
| 26 | `/ai-image-prompts` | 400 | Collection list | 67 |
| 27 | `/ai-prompts-for-content-creation` | 40 | Business intent | 66 |
| 28 | `/ai-prompts-for-sales` | 40 | Business intent | 65 |
| 29 | `/ai-resume-prompts` | 100 | Specific use case | 64 |
| 30 | `/ai-prompts-for-teachers` | 80 | Specific audience | 63 |

### Tier 4: Long-Tail AEO Pages

Lower traffic but still valuable for topical authority. Optimize during Phase 3-4.

Includes: `/character-ai-prompts`, `/suno-ai-prompts`, `/novel-ai-prompts`, `/luma-ai-prompts`, `/midjourney-ai-prompts`, `/leonardo-ai-prompts`, `/playground-ai-prompts`, `/bing-ai-prompts`, `/negative-prompts-for-ai`, `/generative-ai-prompts`, `/ai-logo-prompts`, `/ai-chat-prompts`, `/ai-video-prompts`, `/ai-generated-prompts`, and remaining art/image variant pages.

---

## Key Files Reference

| File | Role in AEO Strategy |
|------|---------------------|
| `data/seo-use-cases.js` | Source of truth for all 73 SEO page definitions; add FAQ arrays here |
| `lib/schemaGenerator.js` | Add `generateArticleSchema()` and `generatePersonSchema()` here |
| `components/ui/EnhancedFAQSchema.js` | Reuse for SEO pages; currently only used on calculators |
| `components/ui/CalculatorSchema.js` | Reference implementation for multi-schema pages |
| `components/sections/FAQ.js` | Homepage FAQ component; expand question set |
| `pages/index.js` | Homepage Organization schema; add FAQPage schema |
| `BUSINESS_STRATEGY.md` | Business positioning context for content voice |
| `SEO_CHECKLIST.md` | Technical SEO foundation this strategy builds on |

---

## Alignment with Existing Strategy

This AEO strategy complements (and does not contradict) the existing documents:

- **`BUSINESS_STRATEGY.md`**: AEO reinforces the "business-first" positioning by targeting business AI queries and emphasizing ROI language in answer blocks
- **`SEO_CHECKLIST.md`**: AEO builds on the completed technical SEO foundation (sitemaps, meta tags, URL structure) and addresses the unchecked schema markup items
- **Course funnel**: AEO-optimized pages that get cited in AI Overviews drive higher-trust traffic — users who see the site cited as an authority source convert better

---

*Strategy created: February 2026*
*Next review: May 2026*
