import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "Which is better, Claude or ChatGPT?",
    answer: "Neither is universally better. Claude tends to be stronger at longer-context reasoning, code review, nuanced writing, and agentic coding via Claude Code. ChatGPT tends to be stronger at fast multimodal tasks, image generation, voice mode, and the broadest ecosystem of plugins and integrations. For most serious writing and coding work, Claude feels calmer and more accurate. For quick multimodal exploration and tooling breadth, ChatGPT still has an edge."
  },
  {
    question: "Is Claude free like ChatGPT?",
    answer: "Both have free tiers with daily message limits. Claude Free uses the Sonnet model with reduced capacity. ChatGPT Free uses GPT-4o with a daily cap. The paid tiers are where the capability gap shows. Claude Pro at $20/month unlocks Opus 4 and higher limits. ChatGPT Plus at $20/month unlocks GPT-5 and faster responses. Above that, both have $200/month tiers (Claude Max and ChatGPT Pro) for heavy users."
  },
  {
    question: "What is the difference between Claude Opus, Sonnet, and Haiku?",
    answer: "Opus 4 is Anthropic's most capable model — best for hard reasoning, long documents, and complex coding. Sonnet 4 is the workhorse — fast, cheap enough for daily use, and capable enough for almost everything. Haiku 4.5 is the small/fast model — best for classification, quick lookups, and high-volume routine tasks. In most Claude products (claude.ai, Claude Code) the system routes your request to the right model automatically."
  },
  {
    question: "Does Claude have a voice mode like ChatGPT?",
    answer: "Not as of April 2026. ChatGPT's Advanced Voice Mode is its own product category — low-latency two-way speech, tone recognition, the works. Claude does not offer an equivalent. If you specifically need voice conversations with an AI, ChatGPT is the answer."
  },
  {
    question: "Which is better for coding?",
    answer: "Claude, especially when paired with Claude Code. The Claude Code CLI gives Claude deep access to your terminal, files, git, and tests — it can run an agentic loop of read, edit, test, commit without you copy-pasting code back and forth. ChatGPT has a Code Interpreter sandbox inside the chat, which is great for data analysis but does not touch your real codebase. For serious development work on your own repos, Claude Code is the clearer choice."
  },
  {
    question: "Which has a bigger context window?",
    answer: "Claude has had the longer context for a while — 200K tokens is standard, with larger windows available on enterprise tiers. GPT-5's context is also substantial but varies by tier. In practice, you only hit these limits when pasting large codebases or long documents; for that use case Claude is the safer bet. For normal chat lengths, the difference does not matter."
  },
  {
    question: "Can ChatGPT and Claude both generate images?",
    answer: "ChatGPT can generate images directly via DALL-E integration (and edit them). Claude does not generate images — it can describe, analyse, and reason about images you upload, but it does not produce them. If image generation is part of your core workflow, ChatGPT is the only choice between the two."
  },
  {
    question: "Which is better for writing?",
    answer: "Claude is widely preferred by professional writers for long-form work: essays, technical writing, book drafts, nuanced rewrites. It tends to produce more natural prose with fewer AI-tell patterns out of the box. ChatGPT is faster and more flexible for short-form marketing copy, social posts, and tasks that benefit from DALL-E image pairing. The honest test: draft the same piece in both and see which voice you prefer. Most writers end up keeping both for different jobs."
  },
  {
    question: "Do Claude and ChatGPT have APIs?",
    answer: "Yes. Anthropic's Claude API and OpenAI's API are both first-class products with similar ergonomics: HTTP endpoint, JSON payloads, streaming, tool use. The Anthropic SDK is available for Python and TypeScript. The OpenAI SDK is available for more languages. Pricing is per-token and public; see the pricing sections above for current numbers."
  },
  {
    question: "Which should I pick if I can only have one?",
    answer: "For writing, coding, and long-document work: Claude. For multimodal breadth (voice, image generation, images in, images out) and the broadest integration ecosystem: ChatGPT. Most serious users end up paying for both and using each where it is strongest. At $20/month each, it is a small cost for the productivity delta."
  }
]

const modelRows = [
  { tier: 'Flagship', claude: 'Claude Opus 4 ($15 / $75 per M tokens)', chatgpt: 'GPT-5 (tiered pricing)' },
  { tier: 'Workhorse', claude: 'Claude Sonnet 4 ($3 / $15 per M tokens)', chatgpt: 'GPT-4o (~$2.50 / $10 per M tokens)' },
  { tier: 'Fast/cheap', claude: 'Claude Haiku 4.5 (~$1 / $5 per M tokens)', chatgpt: 'GPT-4o-mini (~$0.15 / $0.60 per M tokens)' },
  { tier: 'Context window', claude: '200K tokens (standard)', chatgpt: 'Varies by model/tier, up to 400K on GPT-5' },
  { tier: 'Knowledge cutoff', claude: 'Early 2026', chatgpt: 'Late 2024 – 2025, depends on model' }
]

const featureRows = [
  { feature: 'Web search', claude: 'Yes (built-in)', chatgpt: 'Yes (built-in)' },
  { feature: 'File upload + analysis', claude: 'Yes (PDF, CSV, images, docs)', chatgpt: 'Yes (PDF, CSV, images, docs)' },
  { feature: 'Image generation', claude: 'No', chatgpt: 'Yes (DALL-E)' },
  { feature: 'Voice mode', claude: 'No', chatgpt: 'Yes (Advanced Voice Mode)' },
  { feature: 'Artifacts / rendered outputs', claude: 'Yes (Artifacts — HTML, SVG, React components render live)', chatgpt: 'Yes (Canvas — side-panel editor)' },
  { feature: 'Persistent projects', claude: 'Yes (Claude Projects)', chatgpt: 'Yes (ChatGPT Projects)' },
  { feature: 'Memory across chats', claude: 'Project-scoped memory', chatgpt: 'Global memory + project memory' },
  { feature: 'Agentic coding CLI', claude: 'Yes (Claude Code)', chatgpt: 'No first-party equivalent; Codex CLI is closest but less mature' },
  { feature: 'Custom instructions / system prompt', claude: 'Yes', chatgpt: 'Yes' },
  { feature: 'Custom GPTs / custom agents', claude: 'Skills + sub-agents (developer-facing)', chatgpt: 'Custom GPTs (consumer-facing, GPT Store)' },
  { feature: 'Plugins / tool ecosystem', claude: 'MCP servers (open protocol)', chatgpt: 'Custom GPT actions + tool ecosystem' },
  { feature: 'API', claude: 'Anthropic API (Python, TS SDKs)', chatgpt: 'OpenAI API (many SDKs)' },
  { feature: 'Free tier', claude: 'Yes, daily cap on Sonnet', chatgpt: 'Yes, daily cap on GPT-4o' },
  { feature: 'Main paid tier', claude: 'Pro — $20/mo', chatgpt: 'Plus — $20/mo' },
  { feature: 'Power tier', claude: 'Max — $100/$200/mo', chatgpt: 'Pro — $200/mo' }
]

const useCases = [
  {
    title: 'Long-form writing',
    winner: 'Claude',
    body: 'Claude produces more natural prose out of the box, follows tone instructions more faithfully, and handles long documents without losing the thread. For essays, technical writing, books, newsletters, and thoughtful rewrites, Claude is the default choice of most professional writers I know.'
  },
  {
    title: 'Fast multimodal work',
    winner: 'ChatGPT',
    body: 'If your task involves generating an image, talking by voice, pairing DALL-E with a prompt, or bouncing through a voice call while brainstorming, ChatGPT is the one. Claude does not compete on voice or image generation at all.'
  },
  {
    title: 'Agentic coding on your own codebase',
    winner: 'Claude',
    body: 'Claude Code is the strongest agentic coding tool currently available. It reads your files, runs tests, manages git, creates PRs, and iterates on failures. ChatGPT has Code Interpreter, which is great for analysing data in an uploaded CSV, but it does not touch your actual project.'
  },
  {
    title: 'Data analysis on uploaded files',
    winner: 'Close — slight ChatGPT edge',
    body: 'Both handle CSV / Excel / PDF analysis well. ChatGPT\'s Code Interpreter is a slight edge because it executes Python end-to-end and produces downloadable results. Claude handles it through tool use in the API or file analysis in the web app.'
  },
  {
    title: 'Structured JSON output via API',
    winner: 'Tie',
    body: 'Both APIs support structured outputs and tool use reliably. Choose whichever you are already integrated with. Claude tends to produce slightly cleaner prose inside JSON fields; OpenAI has a longer-running structured output feature set.'
  },
  {
    title: 'Large-document reasoning',
    winner: 'Claude',
    body: 'Paste a 150-page contract, a 400-page spec, or a whole research paper and ask for a summary, critique, or extraction. Claude\'s handling of very long context remains the benchmark.'
  },
  {
    title: 'Quick search + answer',
    winner: 'Tie',
    body: 'Both now ship with web search built in. For "what\'s the current status of X," they are roughly interchangeable. Claude tends to cite more carefully; ChatGPT tends to answer faster.'
  },
  {
    title: 'Building a chatbot or AI feature in your own product',
    winner: 'Depends on your stack',
    body: 'If latency and multimodal matter most, OpenAI\'s API has broader model options. If you want strong long-context reasoning, code review, or tool use inside an agent loop, Anthropic\'s API is the better default. Many production systems route different task types to different providers.'
  }
]

const pricingRows = [
  { tier: 'Free', claude: 'Daily cap on Sonnet; no Opus access', chatgpt: 'Daily cap on GPT-4o; limited image gen' },
  { tier: 'Pro / Plus ($20/mo)', claude: 'Claude Pro: higher limits, Opus 4 access, Projects, Artifacts', chatgpt: 'ChatGPT Plus: GPT-5, Advanced Voice, faster responses, Custom GPTs' },
  { tier: 'Team ($25–30/mo/user)', claude: 'Claude Team: shared projects, admin controls', chatgpt: 'ChatGPT Team: shared workspace, admin console' },
  { tier: 'Max / Pro ($100–$200/mo)', claude: 'Claude Max: highest limits, priority access', chatgpt: 'ChatGPT Pro: unlimited GPT-5, o1 reasoning models, priority' },
  { tier: 'Enterprise', claude: 'Custom pricing, SSO, data controls', chatgpt: 'Custom pricing, SSO, long context, admin' }
]

export default function ClaudeVsChatGpt() {
  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude vs ChatGPT (2026): An Honest Comparison from Someone Who Pays for Both',
    description: 'A head-to-head comparison of Claude and ChatGPT across models, pricing, writing, coding, multimodal features, and the API. Clear recommendation for when each one wins.',
    url: 'https://promptwritingstudio.com/claude-vs-chatgpt',
    datePublished: '2026-02-15',
    dateModified: '2026-04-17',
    keywords: ['Claude vs ChatGPT', 'ChatGPT vs Claude', 'Claude Opus vs GPT-5', 'Claude Pro vs ChatGPT Plus', 'which is better Claude or ChatGPT']
  })

  return (
    <>
      <Head>
        <title>Claude vs ChatGPT (2026): An Honest Comparison from Someone Who Pays for Both | PromptWritingStudio</title>
        <meta name="description" content="Claude vs ChatGPT compared across models, pricing, writing, coding, multimodal features, and API. Clear recommendation for when Claude wins and when ChatGPT wins, based on daily use of both." />
        <meta name="keywords" content="Claude vs ChatGPT, ChatGPT vs Claude, Claude Opus vs GPT-5, Claude Pro vs ChatGPT Plus, which is better Claude or ChatGPT, Anthropic vs OpenAI" />
        <meta property="og:title" content="Claude vs ChatGPT (2026): An Honest Comparison from Someone Who Pays for Both" />
        <meta property="og:description" content="A head-to-head comparison of Claude and ChatGPT with a clear recommendation for each use case." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-vs-chatgpt" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-vs-chatgpt" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: April 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude vs ChatGPT
              <span className="block text-[#FFDE59]">An honest comparison from a daily user of both</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Claude and ChatGPT are the two AI assistants most serious users end up paying for. Short answer: Claude tends to win on long-form writing, nuanced reasoning, and agentic coding via Claude Code. ChatGPT tends to win on multimodal breadth — voice mode, image generation, and the broadest integration ecosystem. At $20/month each, most power users keep both and route work to whichever is stronger for the task.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              This is the comparison I wish I had when I first started subscribing to both. No vendor spin, no benchmark cherry-picking — just where each one wins in daily work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#at-a-glance" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                The short verdict
              </a>
              <a href="#use-cases" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Use-case breakdown
              </a>
            </div>
          </div>
        </section>

        <section id="at-a-glance" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center">The short verdict</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F9F9F9] p-8 rounded-lg border-2 border-[#FFDE59]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Pick Claude if...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You write for a living or ship serious code</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You work with long documents, contracts, specs, or large codebases</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You want an agentic coding CLI that edits your real files (Claude Code)</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You care about prose quality and a calmer, less performative tone</span></li>
                </ul>
              </div>
              <div className="bg-[#F9F9F9] p-8 rounded-lg border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Pick ChatGPT if...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You need image generation (DALL-E) or voice mode</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You want the biggest ecosystem of integrations and Custom GPTs</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You do a lot of quick multimodal tasks (images in, images out, voice)</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You need Code Interpreter for data analysis on uploaded files</span></li>
                </ul>
              </div>
            </div>
            <p className="text-center text-[#666666] mt-8">If you can afford both, get both. They solve different problems and the overlap is smaller than the marketing suggests.</p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The model lineups</h2>
            <p className="text-lg text-[#333333] mb-8">Both vendors follow a similar three-tier pattern: flagship, workhorse, fast. The names differ but the mental model maps cleanly.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Tier</th>
                    <th className="p-4 text-left font-semibold">Claude</th>
                    <th className="p-4 text-left font-semibold">ChatGPT</th>
                  </tr>
                </thead>
                <tbody>
                  {modelRows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">{row.tier}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.claude}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.chatgpt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#666666] mt-4">API pricing shown is input / output per million tokens. Chat interface users do not see token pricing directly — they pay a flat monthly fee.</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Feature-by-feature</h2>
            <p className="text-lg text-[#333333] mb-8">The capabilities that actually matter day-to-day.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-left font-semibold">Claude</th>
                    <th className="p-4 text-left font-semibold">ChatGPT</th>
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A] text-sm">{row.feature}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.claude}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.chatgpt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Pricing side by side</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Tier</th>
                    <th className="p-4 text-left font-semibold">Claude</th>
                    <th className="p-4 text-left font-semibold">ChatGPT</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">{row.tier}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.claude}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.chatgpt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]"><strong>Honest take on pricing:</strong> the Pro / Plus tiers at $20 are nearly identical value-for-money on paper. The difference is what they unlock. Claude Pro gives you Opus 4 and Artifacts. ChatGPT Plus gives you Advanced Voice, DALL-E, and the full Custom GPT experience. If your work is text-heavy, Claude Pro delivers more. If it is multimodal, ChatGPT Plus does.</p>
            </div>
          </div>
        </section>

        <section id="use-cases" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Use cases: which one wins</h2>
            <p className="text-lg text-[#333333] mb-10">Eight common tasks, with the honest call on which assistant I reach for.</p>

            <div className="space-y-5">
              {useCases.map((u, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-[#1A1A1A] flex-1 min-w-0">{u.title}</h3>
                    <span className="bg-[#FFDE59] text-[#1A1A1A] text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">{u.winner}</span>
                  </div>
                  <p className="text-[#333333]">{u.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The honest caveats</h2>
            <div className="space-y-5">
              <div className="bg-white p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Benchmarks are not real life</h3>
                <p className="text-[#333333]">Both vendors publish benchmarks where their model tops a chart. Ignore them. What matters is how the model handles your actual prompts on your actual tasks. Do a week with each on real work, then decide.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Models change every few months</h3>
                <p className="text-[#333333]">A comparison that is true in April 2026 may not be true in July. Both vendors ship aggressively. If you are making a long-term decision, check release notes before committing.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Your prompts matter more than the model</h3>
                <p className="text-[#333333]">A well-scoped prompt in either tool will beat a vague prompt in the "better" tool. The delta between the two is often smaller than the delta between a lazy prompt and a clear one on the same model.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions I get asked most often when someone is choosing between them.</p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-[#F9F9F9] border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="p-5 cursor-pointer hover:bg-gray-100 font-semibold text-gray-900 list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-gray-400 ml-4 text-xl flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Once you pick a model, the next question is how to use it.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Prompts that work in Claude generally work in ChatGPT and vice versa — good prompting transfers. If you picked Claude, the next step is pairing it with Claude Code for real development work. If you picked ChatGPT, sharper prompts are still the single biggest lever on output quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/claude-code-guide" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Claude Code Guide
              </Link>
              <Link href="/ai-prompt-generator" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Free AI Prompt Generator
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
