import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import LastVerified from '../components/LastVerified'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'
import { getAIModelById, AI_MODELS_META } from '../lib/ai-models'

// Pull current model facts from the central multi-vendor JSON so prices/names/context
// windows update in one place. Never hardcode decaying numbers in prose.
const opus = getAIModelById('claude-opus-4-8')
const sonnet = getAIModelById('claude-sonnet-4-6')
const haiku = getAIModelById('claude-haiku-4-5-20251001')
const geminiPro = getAIModelById('gemini-2-5-pro')
const geminiFlash = getAIModelById('gemini-2-5-flash')

const VERIFIED_DATE = AI_MODELS_META.lastVerified

function pricePerMTokens(m) {
  if (m.input_per_million == null || m.output_per_million == null) {
    return m.pricing_label
  }
  return `$${m.input_per_million} / $${m.output_per_million} per M tokens`
}

const faqs = [
  {
    question: "Is Claude or Gemini better for writing?",
    answer: "Claude is the stronger writer for long-form and nuanced work — essays, reports, book drafts, and rewrites where tone and structure matter. It follows voice instructions more faithfully and produces fewer AI-tell patterns out of the box. Gemini writes competently and is faster, and it has a real edge when your writing task touches Google Docs, Gmail, or Sheets because it reads and edits those files directly. For pure prose quality, pick Claude. For writing that lives inside Google Workspace, Gemini saves you the copy-paste."
  },
  {
    question: "Is Claude or Gemini better for coding?",
    answer: "Both are strong. Claude tends to produce cleaner, more idiomatic code and is the clearer choice for agentic coding on your own repo through Claude Code — it reads files, runs tests, and manages git in a loop. Gemini's advantage is raw context: its Pro model handles 1M+ tokens (up to 2M), so you can drop an entire large codebase into a single prompt. For day-to-day development on real projects, Claude Code is the more capable tool. For one-shot reasoning over a huge codebase you can't chunk, Gemini's context window wins."
  },
  {
    question: `How much context can Claude and Gemini handle?`,
    answer: `${opus.display_name} and ${sonnet.display_name} ship with ${opus.context_window_label} context windows; ${haiku.display_name} has ${haiku.context_window_label}. ${geminiPro.display_name} goes further at ${geminiPro.context_window_label}, and ${geminiFlash.display_name} matches Claude's flagship at ${geminiFlash.context_window_label}. In practice you only feel the difference when pasting very large documents or whole codebases — for normal chat lengths both are effectively unlimited. Verified ${new Date(VERIFIED_DATE).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}.`
  },
  {
    question: "How much does Claude vs Gemini cost?",
    answer: "Both have a $20/month consumer tier: Claude Pro and Google's AI subscription (sold through the Google One AI tiers / Gemini Advanced). The free tiers differ — Gemini's free access is generous and tied to a Google account, while Claude Free has a tighter daily cap. On the API side, Gemini's flagship is cheaper per token than Claude's flagship, but Gemini's pricing is tiered by context length and inference mode, so the headline number isn't the whole story. Check the API pricing pages before quoting a per-token cost — both vendors change pricing often."
  },
  {
    question: "Does the same prompt work in both Claude and Gemini?",
    answer: "Mostly, yes. A well-structured prompt — clear role, explicit task, constraints, and an output format — transfers cleanly between Claude and Gemini. The differences show up at the margins: Claude follows long multi-step instructions and tone constraints more literally, while Gemini benefits from being pointed at specific Google Workspace files or asked to use real-time search. If you write good prompts, you can switch between the two without rewriting them. Lazy prompts expose the model's defaults in both."
  },
  {
    question: "Which has better Google integration?",
    answer: "Gemini, by a wide margin — that's its whole moat. It's built into Gmail, Google Docs, Sheets, Slides, Drive, and Android, and it can read and act on your files inside those apps. Claude integrates with Google Workspace too, but Gemini is native to it. If your work lives in Google's ecosystem and you want AI that's one click away inside the doc you're already editing, Gemini is the obvious pick."
  },
  {
    question: "Should I use Claude or Gemini for everyday tasks?",
    answer: "For everyday questions, drafting, summarising, and quick research, both are excellent and the gap is small. Gemini is faster and has real-time web access plus Google integration, which makes it convenient for quick lookups and anything tied to your inbox or calendar. Claude is calmer and more precise, which most people prefer for thinking-through tasks and writing. A reasonable setup: Gemini for fast, Google-connected everyday work, Claude when the quality of the output actually matters."
  },
  {
    question: "Can I use both Claude and Gemini together?",
    answer: "Yes, and many people do. They cost $20/month each and solve overlapping but distinct problems. A common split: Gemini for everyday tasks, Google Workspace work, and huge-context jobs; Claude for serious writing and agentic coding via Claude Code. Good prompting transfers between them, so running both adds capability without doubling your prompt-writing effort."
  }
]

const modelRows = [
  { tier: 'Flagship', claude: `${opus.display_name} (${pricePerMTokens(opus)})`, gemini: `${geminiPro.display_name} (${geminiPro.pricing_label})` },
  { tier: 'Workhorse', claude: `${sonnet.display_name} (${pricePerMTokens(sonnet)})`, gemini: `${geminiFlash.display_name} (${geminiFlash.pricing_label})` },
  { tier: 'Fast/cheap', claude: `${haiku.display_name} (${pricePerMTokens(haiku)})`, gemini: `${geminiFlash.display_name} (low-cost tier)` },
  { tier: 'Context window', claude: `${opus.context_window_label} on ${opus.display_name} and ${sonnet.display_name}; ${haiku.context_window_label} on ${haiku.display_name}`, gemini: `${geminiPro.context_window_label} on ${geminiPro.display_name}; ${geminiFlash.context_window_label} on ${geminiFlash.display_name}` },
  { tier: 'Released', claude: `${opus.released} (${opus.display_name})`, gemini: `${geminiPro.released} (${geminiPro.display_name})` }
]

const featureRows = [
  { feature: 'Web search', claude: 'Yes (built-in)', gemini: 'Yes (built-in, real-time Google search)' },
  { feature: 'File upload + analysis', claude: 'Yes (PDF, CSV, images, docs)', gemini: 'Yes (PDF, CSV, images, audio, video)' },
  { feature: 'Image generation', claude: 'No', gemini: 'Yes (Imagen integration)' },
  { feature: 'Native video understanding', claude: 'No', gemini: 'Yes (video input supported)' },
  { feature: 'Google Workspace integration', claude: 'Connector-based', gemini: 'Native (Gmail, Docs, Sheets, Drive, Android)' },
  { feature: 'Artifacts / rendered outputs', claude: 'Yes (Artifacts — HTML, SVG, React render live)', gemini: 'Yes (Canvas)' },
  { feature: 'Agentic coding CLI', claude: 'Yes (Claude Code)', gemini: 'Yes (Gemini CLI)' },
  { feature: 'Largest context window', claude: opus.context_window_label, gemini: geminiPro.context_window_label },
  { feature: 'Custom instructions / system prompt', claude: 'Yes', gemini: 'Yes (Gems)' },
  { feature: 'API', claude: 'Anthropic API (Python, TS SDKs)', gemini: 'Google AI / Vertex AI API' },
  { feature: 'Free tier', claude: 'Yes, tighter daily cap', gemini: 'Yes, generous, tied to Google account' },
  { feature: 'Main paid tier', claude: 'Pro — $20/mo', gemini: 'Google AI / Gemini Advanced — $20/mo' }
]

const useCases = [
  {
    title: 'Long-form writing',
    winner: 'Claude',
    body: 'Claude produces more natural prose, follows tone and structure instructions more faithfully, and holds a consistent voice across a long document. For essays, reports, book chapters, and thoughtful rewrites, it is the stronger writer. Gemini is competent and fast but reads more generic out of the box.'
  },
  {
    title: 'Writing inside Google Docs / Gmail',
    winner: 'Gemini',
    body: 'If the document already lives in Google Workspace, Gemini reads and edits it in place — no copy-paste, no losing formatting. For email drafts, doc cleanups, and sheet summaries, the native integration beats a marginally better prose model you have to paste into.'
  },
  {
    title: 'Agentic coding on your own repo',
    winner: 'Claude',
    body: 'Claude Code runs an agentic loop on your real files — read, edit, test, commit — and produces cleaner, more idiomatic code. Gemini has a CLI too, but for iterating on production code on your own machine, Claude Code is the more mature, more reliable tool today.'
  },
  {
    title: 'Reasoning over a huge codebase or document',
    winner: 'Gemini',
    body: `When you genuinely cannot chunk the input — a whole monorepo, a 1,000-page filing, hours of transcript — ${geminiPro.display_name}'s ${geminiPro.context_window_label} context window lets you load it all into one prompt. That is the one place Gemini's window decisively beats Claude.`
  },
  {
    title: 'Everyday questions and quick research',
    winner: 'Close — slight Gemini edge',
    body: 'Both answer everyday questions well. Gemini is faster and has real-time Google search baked in, which makes it convenient for "what is the current status of X." Claude tends to be more careful and cites more deliberately. For speed, Gemini; for caution, Claude.'
  },
  {
    title: 'Multimodal work (image, audio, video)',
    winner: 'Gemini',
    body: 'Gemini ingests image, audio, and video natively and can generate images via Imagen. Claude reasons about images you upload but does not generate them and has no video input. If your task is multimodal at its core, Gemini is the only real choice between the two.'
  },
  {
    title: 'Structured output via API',
    winner: 'Tie',
    body: 'Both APIs support structured outputs and tool use reliably. Choose whichever fits your stack. Gemini is cheaper per token at the flagship tier; Claude tends to produce slightly cleaner prose inside JSON fields. For most apps either is fine.'
  },
  {
    title: 'Cost-sensitive high-volume jobs',
    winner: 'Gemini',
    body: `For high-volume classification, extraction, or summarisation where price dominates, ${geminiFlash.display_name} is hard to beat on cost. ${haiku.display_name} is Claude's answer and is very competitive, but Gemini's flagship-class pricing undercuts Claude's at the top tier.`
  }
]

const promptDemo = {
  prompt: `Role: You are a senior content editor.
Task: Rewrite the paragraph below to be 30% shorter, keep the meaning, and use plain, concrete language. No marketing adjectives.
Constraints: British spelling. One sentence per idea. Return only the rewrite.

Paragraph: [PASTE YOUR PARAGRAPH HERE]`,
  claude: 'Tends to honour every constraint literally — length cut, British spelling, no adjectives — and returns only the rewrite with no preamble. Strong default for editing work.',
  gemini: 'Produces a solid rewrite and is faster, but more likely to add a short "Here is your rewrite:" preamble or soften the "no adjectives" rule. Add "Return only the rewrite, no preface" to tighten it.'
}

export default function ClaudeVsGemini() {
  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude vs Gemini (2026): Which AI for Writing, Everyday Work, and Coding',
    description: 'Claude vs Gemini compared for writing, everyday tasks, and coding — models, pricing, context windows, Google integration, and the same prompt run in both. A clear recommendation for when each one wins.',
    slug: 'claude-vs-gemini',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['Claude vs Gemini', 'Gemini vs Claude', 'Claude vs Gemini for writing', 'Claude vs Gemini for coding', 'is Claude or Gemini better', 'Claude Opus vs Gemini Pro']
  })

  return (
    <>
      <Head>
        <title>Claude vs Gemini (2026): Which AI for Writing, Everyday Work, and Coding | PromptWritingStudio</title>
        <meta name="description" content="Claude vs Gemini compared for writing, everyday work, and coding — models, pricing, context windows, Google integration, and the same prompt run in both. Clear recommendation for when each wins." />
        <meta name="keywords" content="Claude vs Gemini, Gemini vs Claude, Claude vs Gemini for writing, Claude vs Gemini for coding, is Claude or Gemini better, Claude Opus vs Gemini Pro" />
        <meta property="og:title" content="Claude vs Gemini (2026): Which AI for Writing, Everyday Work, and Coding" />
        <meta property="og:description" content="A head-to-head comparison of Claude and Gemini with a clear recommendation for each use case." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-vs-gemini" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-vs-gemini" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude vs Gemini
              <span className="block text-[#FFDE59]">Which AI for writing, everyday work, and coding</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Claude vs Gemini comes down to two different bets. Claude wins on writing quality and agentic coding via Claude Code — the prose is more natural and the code is cleaner. Gemini wins on Google Workspace integration, multimodal input, raw context window, and price. Both cost $20/month. If your work lives in Google Docs and Gmail, lean Gemini. If output quality and serious coding matter most, lean Claude. Many people run both and route work to whichever is stronger.
              </p>
            </div>

            <LastVerified date={VERIFIED_DATE} source={geminiPro.verification_source} label="Model facts verified" className="text-gray-200 mb-6" />

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
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You write for a living or care about prose quality</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You ship serious code and want an agentic CLI (Claude Code)</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You want instructions and tone followed literally</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You prefer a calmer, less generic default voice</span></li>
                </ul>
              </div>
              <div className="bg-[#F9F9F9] p-8 rounded-lg border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Pick Gemini if...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">Your work lives in Google Docs, Gmail, Sheets, or Drive</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You need image, audio, or video understanding</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You load huge codebases or documents in one prompt</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You want fast answers with real-time Google search</span></li>
                </ul>
              </div>
            </div>
            <p className="text-center text-[#666666] mt-8">At $20/month each, the overlap is smaller than it looks. If you can afford both, get both and route work to whichever wins the task.</p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The model lineups</h2>
            <p className="text-lg text-[#333333] mb-8">Both vendors follow a similar pattern: a flagship, a fast workhorse, and long context across the board. The names differ, but the mental model maps cleanly.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Tier</th>
                    <th className="p-4 text-left font-semibold">Claude</th>
                    <th className="p-4 text-left font-semibold">Gemini</th>
                  </tr>
                </thead>
                <tbody>
                  {modelRows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">{row.tier}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.claude}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.gemini}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#666666] mt-4">API pricing shown is input / output per million tokens. Chat-interface users pay a flat monthly fee and never see token pricing. Gemini's API pricing is tiered by context length and inference mode — confirm at the source before quoting a per-token cost.</p>
            <LastVerified date={VERIFIED_DATE} source={geminiPro.verification_source} label="Pricing and specs verified" className="mt-2" />
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
                    <th className="p-4 text-left font-semibold">Gemini</th>
                  </tr>
                </thead>
                <tbody>
                  {featureRows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A] text-sm">{row.feature}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.claude}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.gemini}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The same prompt, run in both</h2>
            <p className="text-lg text-[#333333] mb-8">Good prompts transfer between Claude and Gemini. Here is a copy-paste editing prompt and how each model tends to handle it — the differences show up at the edges, not the core.</p>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="bg-[#1A1A1A] text-white px-6 py-3 text-sm font-semibold uppercase tracking-wide">Copy-paste prompt</div>
              <pre className="p-6 text-sm text-[#1A1A1A] whitespace-pre-wrap font-mono bg-[#FAFAFA]">{promptDemo.prompt}</pre>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-2">In Claude</h3>
                <p className="text-[#333333] text-sm">{promptDemo.claude}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-l-4 border-gray-300">
                <h3 className="font-bold text-[#1A1A1A] mb-2">In Gemini</h3>
                <p className="text-[#333333] text-sm">{promptDemo.gemini}</p>
              </div>
            </div>
            <p className="text-sm text-[#666666] mt-6"><strong>Takeaway:</strong> the model matters less than the prompt. A tight prompt with an explicit output format closes most of the gap between the two. Vague prompts expose each model's defaults.</p>
            <p className="text-[#333333] mt-6">
              Comparing within the Claude lineup instead? See <Link href="/claude-sonnet-vs-opus" className="text-[#1A1A1A] font-semibold underline">Sonnet vs Opus</Link> and the <Link href="/claude-context-window" className="text-[#1A1A1A] font-semibold underline">Claude context window</Link>. For costs, the <Link href="/anthropic-api-pricing" className="text-[#1A1A1A] font-semibold underline">Anthropic API pricing guide</Link> covers token rates.
            </p>
          </div>
        </section>

        <section id="use-cases" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Use cases: which one wins</h2>
            <p className="text-lg text-[#333333] mb-10">Eight common tasks, with the honest call on which assistant to reach for.</p>

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
                <p className="text-[#333333]">Both vendors publish charts where their model wins. The SWE-bench gap between the two flagships is often a point or two — noise next to the difference a clear prompt makes on your actual work. Run a week with each on real tasks, then decide.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Model versions change every few months</h3>
                <p className="text-[#333333]">A comparison true in June 2026 may not hold in September. Both vendors ship aggressively, and Gemini's pricing in particular is tiered and changes often. The model facts on this page are verified against vendor sources — check release notes before a long-term commitment.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Your prompt matters more than the model</h3>
                <p className="text-[#333333]">A well-scoped prompt in either tool beats a vague prompt in the "better" tool. The delta between Claude and Gemini is usually smaller than the delta between a lazy prompt and a clear one on the same model. Fix the prompt first.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions people ask most when choosing between Claude and Gemini.</p>
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
              The model is half the answer. The prompt is the other half.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Whichever you pick, the single biggest lever on output quality is how you prompt it — and good prompts transfer between Claude and Gemini. The free Prompt Grader scores your prompt and rewrites it for either model. Still deciding between the bigger players? Read the Claude vs ChatGPT breakdown. Ready to write better prompts in either tool? The free generator is the fastest start, and the course goes deeper.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              <a href="/prompt-grader" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Grade Your Prompt Free
              </a>
              <Link href="/ai-prompt-generator" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Free AI Prompt Generator
              </Link>
              <Link href="/claude-vs-chatgpt" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Claude vs ChatGPT
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
