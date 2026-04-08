# QA Report — PromptWritingStudio
Generated: 2026-04-08

---

## CRITICAL

- **Broken internal link**: `/pricing` link points to a non-existent page — `pages/ai-prompt-examples.js:563`. No `pages/pricing.js` exists. This is a hard 404 from a high-traffic page.

- **Missing favicon**: `public/favicon.ico` does not exist. The Layout component references `/favicon.ico` at `components/layout/Layout.js:19`. All pages will show a broken favicon icon in browser tabs and bookmark managers.

- **Missing OG image**: `public/images/og-image.jpg` does not exist. Referenced in `components/layout/Layout.js:15` as the default Open Graph image for all pages that don't override it. Social shares will have no image.

---

## HIGH

- **Schema: invalid prop `upvoteCount` with `Math.random()` in FAQPage schema** — `upvoteCount` is not a valid schema.org property on `Answer`. Worse, using `Math.random()` causes a React SSR hydration mismatch (server renders one value, client renders another). Affects: `components/ui/EnhancedFAQSchema.js:29`, `pages/calculators/business-ai-readiness.js:66`, `pages/calculators/content-creation-speed.js:77`, `pages/calculators/ecommerce-ai-savings.js:89`, `pages/calculators/customer-service-ai-savings.js:66`.

- **Broken canonical via wrong prop name**: Two calculator pages call `<EnhancedMeta canonicalUrl="...">` but the `EnhancedMeta` component only accepts a `url` prop (not `canonicalUrl`) — the canonical is silently dropped and these pages render with no canonical tag. Affects: `pages/calculators/business-ai-readiness.js:84`, `pages/calculators/customer-service-ai-savings.js:84`. The `EnhancedMeta` component is defined at `components/ui/EnhancedMeta.js:6`.

- **Missing canonical on high-priority pages**: The following pages have neither a `<link rel="canonical">` nor an `<EnhancedMeta url="...">` call. Without canonicals, duplicate content signals are sent to Google (especially risky for the programmatic `/chatgpt-prompts-for/[modifier]` and `/ai-prompt-generator/[slug]` route families):
  - `pages/index.js` (homepage)
  - `pages/about.js`
  - `pages/chatgpt-prompt-templates.js`
  - `pages/ai-prompt-generator/index.js`
  - `pages/ai-prompt-quiz.js`
  - `pages/roi-calculator.js`
  - `pages/ai-models.js`
  - `pages/calculators/index.js`
  - `pages/calculators/ai-cost-comparison.js`
  - `pages/prompts/marketing-professionals.js`
  - `pages/chatgpt-prompts-for/[modifier].js` (covers all ~21 modifier pages)
  - `pages/ai-prompt-generator/[slug].js` (covers all dynamic use-case pages)
  - `pages/ecommerce-ai.js`, `pages/content-creators-ai.js`, `pages/service-business-ai.js`
  - `pages/contact.js`, `pages/cookie-policy.js`, `pages/privacy-policy.js`, `pages/terms-of-service.js`
  - `pages/tools/mad-libs-prompt-creator.js`, `pages/tools/prompt-diagnostic-quiz.js`

- **Missing meta description (falls back to generic Layout default)**: Multiple pages call `<Layout>` with no `title` or `description` props, so the meta description defaults to the generic `"Learn to write effective AI prompts with PromptWritingStudio for ChatGPT, Claude, and Gemini."` defined at `components/layout/Layout.js:12`. Affected pages:
  - `pages/ecommerce-ai.js:126`
  - `pages/content-creators-ai.js:126`
  - `pages/service-business-ai.js:126`
  - `pages/calculators/business-ai-readiness.js:76` (its `EnhancedMeta` is inside `<Head>` not on `<Layout>`, so Layout title/description are never set)
  - `pages/calculators/customer-service-ai-savings.js:76` (same issue)
  - `pages/real-estate-ai.js:134`
  - `pages/healthcare-ai.js:134`
  - `pages/legal-ai.js:134`
  - `pages/education-ai.js:134`
  - `pages/custom-ai-agents.js:305`
  - `pages/customgpt-ai-review.js:208`
  - `pages/claude-code-guide.js:148`
  - `pages/best-ai-tools.js:637` (has description in `<Head>` block but bare `<Layout>` duplicates generic description in og tags)
  - `pages/best-telegram-ai-chatbots.js:227`
  - `pages/build-telegram-ai-chatbot.js:258`
  - `pages/video-tutorials.js:130`
  - `pages/vision-ai-prompts.js:144`
  - `pages/telegram-ai-channel.js:91`
  - `pages/tools/mad-libs-prompt-creator.js:439`
  - `pages/tools/prompt-diagnostic-quiz.js:272`
  - `pages/calculators/content-creation-speed.js:120` (has its own `<Head>` but `<Layout>` has no props)
  - `pages/calculators/ecommerce-ai-savings.js:132`

---

## MEDIUM

- **Schema: Article author is `Organization` not `Person`** — `pages/vibe-coding.js:18-25`: the Article schema sets `"author": { "@type": "Organization", "name": "PromptWritingStudio" }`. Google recommends `@type: Person` for article authors. Other pages correctly use Person (see `lib/schemaGenerator.js:199`).

- **Schema: Referenced images do not exist**: Several schema objects reference image URLs that have no corresponding file in `public/`:
  - `https://promptwritingstudio.com/images/logo.png` — referenced in `lib/schemaGenerator.js:209`, `components/ui/CalculatorSchema.js:34`, `components/ui/EnhancedFAQSchema.js` (via CalculatorProductSchema), `pages/index.js:69`
  - `https://promptwritingstudio.com/images/roi-calculator-preview.jpg` — `pages/roi-calculator.js:39`
  - `https://promptwritingstudio.com/images/ai-glossary-preview.jpg` — `pages/what-is-rag.js:59` and other RAG pages via `EnhancedMeta`
  - `https://promptwritingstudio.com/images/calculator-step.jpg` — `components/ui/EnhancedFAQSchema.js:177` (CalculatorHowToSchema)
  - Dynamic calculator screenshots via pattern `${calculatorName.toLowerCase()...}-screenshot.jpg` — `components/ui/EnhancedFAQSchema.js:210` (CalculatorProductSchema)

- **`<Head>` rendered outside `<Layout>` then `<Layout>` rendered bare** — A pattern used in several pages (`pages/ecommerce-ai.js`, `pages/best-telegram-ai-chatbots.js`, `pages/best-ai-tools.js`, etc.) puts `<Head>` tags before the bare `<Layout>` component. In Next.js Pages Router this is valid (next/head merges), but Layout's `<Head>` then also outputs its own title/description/og-image defaults, potentially creating duplicate `<title>` and `<meta name="description">` tags in the rendered HTML. Google uses the last occurrence; this is unpredictable.

- **Schema: `mainEntity` with `undefined` value in JSON-LD** — `components/ui/EnhancedMeta.js:103`: when `calculator` is falsy, `"mainEntity": undefined` is passed into `JSON.stringify()`. `JSON.stringify` drops `undefined` values silently, so the output is valid JSON, but the intent is unclear and the pattern is fragile.

- **`SearchAction` target references non-existent search endpoint** — `pages/index.js:105`: the Organization schema's `potentialAction.target` points to `"https://promptwritingstudio.com/search?q={search_term_string}"` but no `pages/search.js` route exists. Google may attempt to validate this endpoint.

- **Broken internal link potential**: `pages/chatgpt-prompt-templates.js:240` links to `/ai-prompt-generator/chatgpt-prompt`. This slug exists in `data/seo-use-cases.js` (line 1498), so it will resolve via the `[slug].js` dynamic route — but only if the `getStaticPaths` correctly includes it. Verify this renders at build time.

- **`pages/ai-prompt-generator/enhanced.js` has no SEO metadata of its own** and is not linked from any sitemap or navigation. It will be indexed with generic Layout defaults. Consider adding `noindex` or promoting it.

---

## LOW / INFO

- **Stale content (>90 days with no git changes)** — The following pages have not been modified in over 90 days and may contain outdated information or stale date references:
  - `pages/auto-rag.js`
  - `pages/corrective-rag.js`
  - `pages/flare-active-rag.js`
  - `pages/graphrag.js`
  - `pages/hybridrag.js`
  - `pages/info-rag.js`
  - `pages/morag.js`
  - `pages/r2ag.js`
  - `pages/ra-rag.js`
  - `pages/rag-chunking-strategies.js`
  - `pages/rag-evaluation.js`
  - `pages/self-rag.js`
  - `pages/speculative-rag.js`
  - `pages/what-are-embeddings.js`
  - `pages/what-is-a-vector-database.js`
  - `pages/what-is-fine-tuning.js`
  - `pages/what-is-rag.js`
  - `pages/ai-history.js`
  - `pages/ai-prompt-examples.js`
  - `pages/ai-prompt-generator/ai-art-prompts.js`
  - `pages/ai-prompt-generator/enhanced.js`
  - `pages/best-ai-tools.js`
  - `pages/contact.js`
  - `pages/content-creators-ai.js`
  - `pages/cookie-policy.js`
  - `pages/dashboard.js`
  - `pages/ecommerce-ai.js`
  - `pages/gemini-prompt-generator.js`
  - `pages/privacy-policy.js`
  - `pages/service-business-ai.js`
  - `pages/terms-of-service.js`
  - `pages/vibe-coding.js`
  - `pages/[slug].js`

- **Unoptimized images using `<img>` instead of `next/image`** — The following use plain `<img>` tags, bypassing Next.js automatic image optimisation (lazy loading, WebP conversion, sizing):
  - `components/sections/Instructor.js:13` — `src="/images/bryan-collins.jpg"`
  - `components/sections/Testimonials.js:60` — `src="/images/social proof.png"` (also note: filename has a space, which can cause issues on some servers)
  - `components/sections/About.js:7`
  - `components/sections/Newsletter.js:23`
  - `pages/video-tutorials.js:174` — `src={video.thumbnail}` (dynamic external thumbnails)

- **Synchronous scripts in `<Document>` `<Head>`** — `pages/_document.js:13-20`: an inline `<script>` block (Plausible init) runs synchronously during HTML parse before the `async` analytics script. While small, it runs on every page. The ConvertBox embed script at line 23-27 also injects a script dynamically but runs synchronously in `<head>`. Neither is render-blocking in the strict sense (no `src` without `async`/`defer`), but the ConvertBox pattern creates a DOM element and appends it to `<head>` synchronously, which can delay Time to First Byte perception.

- **`lib/schemaGenerator.js:186`: hardcoded `datePublished: '2024-06-01'`** — The `generateArticleSchema` function defaults `datePublished` to `'2024-06-01'` if not provided. Pages that don't pass a `datePublished` will have an incorrect publish date in structured data.

- **`pages/[slug].js` catch-all route** — This file handles `/chatgpt-prompt-templates` and `/gemini-prompt-templates` slugs via an in-file data array (lines 6-88), but `pages/chatgpt-prompt-templates.js` already exists as a dedicated page. The `[slug].js` version at `/chatgpt-prompt-templates` would shadow or conflict with the dedicated page depending on Next.js route resolution order. Next.js prefers static routes over dynamic ones, so `chatgpt-prompt-templates.js` wins, but the `[slug].js` data for that slug is dead code.

- **`EnhancedMeta` emits duplicate `og:type` tags** — `components/ui/EnhancedMeta.js:34` sets `og:type = website` and line 55 sets `og:type = article`. Both are output in the `<head>`, producing duplicate OG type tags. The last one (`article`) takes precedence in most parsers, but this is inconsistent with the component's intent.
