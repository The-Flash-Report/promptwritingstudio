import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import LastVerified from '../components/LastVerified'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'
import { getCurrentModelByTier, MODELS_META } from '../lib/claude-data'

// Pull live specs from the single source of truth (data/claude-models.json).
// Do not hardcode names/prices — they decay fast and propagate from here.
const opus = getCurrentModelByTier('flagship')
const sonnet = getCurrentModelByTier('workhorse')
const haiku = getCurrentModelByTier('fast')

const fmtCtx = (tokens) => {
  if (tokens >= 1000000) return `${tokens / 1000000}M`
  return `${tokens / 1000}K`
}

const models = [opus, sonnet, haiku]

const faqs = [
  {
    question: `What is the difference between ${sonnet.name} and ${opus.name}?`,
    answer: `${opus.name} is Anthropic's flagship model — built for the hardest reasoning and agentic coding work — at $${opus.inputPricePerMTok}/$${opus.outputPricePerMTok} per million input/output tokens. ${sonnet.name} is the workhorse: nearly as smart for everyday tasks, faster, and cheaper at $${sonnet.inputPricePerMTok}/$${sonnet.outputPricePerMTok} per million tokens. For 80% of prompting and coding work, Sonnet is the right default. Reach for Opus only when a task genuinely stalls a smaller model.`
  },
  {
    question: 'When should I use Opus instead of Sonnet?',
    answer: 'Use Opus when the task needs multi-step reasoning that Sonnet gets wrong — large refactors across many files, dense legal or financial analysis, tricky debugging, or long agentic runs where a single wrong turn compounds. If Sonnet produces a correct answer on the first or second try, Opus is wasted money. A good rule: draft on Sonnet, escalate to Opus only on the specific prompts where Sonnet fails.'
  },
  {
    question: `Is ${sonnet.name} good enough for most prompting?`,
    answer: `Yes. ${sonnet.name} handles content writing, summarisation, data extraction, most coding, and structured-output prompts at near-flagship quality — faster and at ${Math.round((1 - sonnet.inputPricePerMTok / opus.inputPricePerMTok) * 100)}% lower input cost than ${opus.name}. Most people who think they need Opus are actually fighting a weak prompt, not a weak model. Tighten the prompt before you upgrade the model.`
  },
  {
    question: `Where does ${haiku.name} fit in?`,
    answer: `${haiku.name} is the fast, cheap tier at $${haiku.inputPricePerMTok}/$${haiku.outputPricePerMTok} per million tokens — the ${haiku.latency} of the three. Use it for high-volume, low-judgement work: classification, tagging, simple extraction, routing, first-pass drafts you will edit. It is not the model for nuanced reasoning, but for batch jobs where you run thousands of prompts, the cost difference versus Opus is dramatic.`
  },
  {
    question: 'Do Sonnet and Opus have the same context window?',
    answer: `${opus.name} and ${sonnet.name} both offer a ${fmtCtx(opus.contextTokens)}-token context window, so window size is not the deciding factor between them. ${haiku.name} is smaller at ${fmtCtx(haiku.contextTokens)} tokens. If you are feeding an entire codebase or a long document, either Sonnet or Opus will hold it — pick on reasoning need and cost, not context.`
  },
  {
    question: 'How much cheaper is Sonnet than Opus in practice?',
    answer: `${sonnet.name} input tokens cost $${sonnet.inputPricePerMTok}/M versus $${opus.inputPricePerMTok}/M for ${opus.name}, and output is $${sonnet.outputPricePerMTok}/M versus $${opus.outputPricePerMTok}/M. On a typical coding session that reads a lot of context and writes moderate output, Sonnet runs roughly ${Math.round((opus.outputPricePerMTok / sonnet.outputPricePerMTok) * 10) / 10}x cheaper on output alone. Over a month of daily use that is the difference between a small bill and a large one.`
  }
]

const decisionRows = [
  { task: 'Blog posts, marketing copy, email drafts', pick: sonnet.name, why: 'Quality is indistinguishable at this complexity; Sonnet is faster.' },
  { task: 'Summarising or extracting from long documents', pick: sonnet.name, why: 'Full context window, low cost per run.' },
  { task: 'Everyday coding, small-to-medium features', pick: sonnet.name, why: 'Handles most code correctly first try.' },
  { task: 'Large multi-file refactors, architecture decisions', pick: opus.name, why: 'Reasoning depth prevents compounding errors.' },
  { task: 'Hard debugging where Sonnet keeps missing', pick: opus.name, why: 'Escalate only on the prompts that actually stall.' },
  { task: 'Dense analysis: legal, financial, research synthesis', pick: opus.name, why: 'Nuance and multi-step logic justify the premium.' },
  { task: 'Long agentic runs with many tool calls', pick: opus.name, why: 'One wrong turn early compounds across the run.' },
  { task: 'Classification, tagging, routing at scale', pick: haiku.name, why: 'Cheapest and fastest; judgement is light.' },
  { task: 'High-volume batch jobs (thousands of prompts)', pick: haiku.name, why: 'Cost difference vs Opus is dramatic at volume.' }
]

const article = generateArticleSchema({
  title: `Claude Sonnet vs Opus: When to Use Each Model (2026)`,
  description: `A practical guide to choosing between Claude Sonnet, Opus, and Haiku — by cost, speed, capability, and context window. With a decision table and a known failure mode to avoid.`,
  slug: 'claude-sonnet-vs-opus',
  datePublished: '2026-06-16'
})

export default function ClaudeSonnetVsOpus() {
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <Head>
        <title>Claude Sonnet vs Opus: When to Use Each Model (2026) | PromptWritingStudio</title>
        <meta name="description" content={`Claude Sonnet vs Opus compared on cost, speed, capability, and context. When to pick ${sonnet.name}, ${opus.name}, or ${haiku.name} — with a decision table and the mistake most people make.`} />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-sonnet-vs-opus" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">Claude · Models</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Claude Sonnet vs Opus: When to Use Each Model
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              A practical guide to choosing between {sonnet.name}, {opus.name}, and {haiku.name} — by cost, speed, capability, and context window.
            </p>
            <LastVerified date={MODELS_META.lastVerified} source={MODELS_META.source} label="Model specs verified" className="mt-4 text-gray-300" />
          </div>
        </section>

        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                Use <strong>{sonnet.name}</strong> as your default — it handles roughly 80% of prompting and coding work at near-flagship quality, faster, and at a fraction of the cost. Escalate to <strong>{opus.name}</strong> only on the specific tasks where Sonnet actually fails: large refactors, dense analysis, hard debugging, long agentic runs. Drop to <strong>{haiku.name}</strong> for high-volume, low-judgement jobs. The model is rarely the bottleneck — a weak prompt usually is.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">Sonnet vs Opus vs Haiku at a glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
                <thead className="bg-[#1A1A1A] text-white">
                  <tr>
                    <th className="p-3 text-left">Model</th>
                    <th className="p-3 text-left">Tier</th>
                    <th className="p-3 text-left">Input / Output ($/M tok)</th>
                    <th className="p-3 text-left">Context</th>
                    <th className="p-3 text-left">Speed</th>
                    <th className="p-3 text-left">Best for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {models.map((m, i) => (
                    <tr key={m.id} className={i === 1 ? 'bg-yellow-50' : ''}>
                      <td className="p-3 font-semibold text-[#1A1A1A]">{m.name}</td>
                      <td className="p-3 text-[#333333] capitalize">{m.tier}</td>
                      <td className="p-3 text-[#333333]">${m.inputPricePerMTok} / ${m.outputPricePerMTok}</td>
                      <td className="p-3 text-[#333333]">{fmtCtx(m.contextTokens)}</td>
                      <td className="p-3 text-[#333333] capitalize">{m.latency}</td>
                      <td className="p-3 text-[#333333]">{m.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">Specs and prices verified against Anthropic's model docs on {MODELS_META.lastVerified}. {sonnet.name} highlighted as the recommended default.</p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">When should you use Sonnet vs Opus?</h2>
            <p className="text-[#333333] mb-8">Match the task to the model. When in doubt, start on {sonnet.name} and only escalate the prompts that actually stall.</p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
                <thead className="bg-[#1A1A1A] text-white">
                  <tr>
                    <th className="p-3 text-left">Task</th>
                    <th className="p-3 text-left">Pick</th>
                    <th className="p-3 text-left">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {decisionRows.map((row, i) => (
                    <tr key={i}>
                      <td className="p-3 text-[#333333]">{row.task}</td>
                      <td className="p-3 font-semibold text-[#1A1A1A] whitespace-nowrap">{row.pick}</td>
                      <td className="p-3 text-[#333333]">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">The cost difference, in plain numbers</h2>
            <p className="text-[#333333] mb-4">
              {sonnet.name} costs <strong>${sonnet.inputPricePerMTok}/M input</strong> and <strong>${sonnet.outputPricePerMTok}/M output</strong>. {opus.name} costs <strong>${opus.inputPricePerMTok}/M input</strong> and <strong>${opus.outputPricePerMTok}/M output</strong>. On output tokens — the expensive part of most generation work — Opus is {Math.round((opus.outputPricePerMTok / sonnet.outputPricePerMTok) * 10) / 10}x the price of Sonnet.
            </p>
            <p className="text-[#333333] mb-4">
              That gap is invisible on a single prompt and brutal at scale. Run a hundred coding sessions a month on Opus when Sonnet would have produced the same result, and you have paid a multiple for no extra quality. The discipline is not "always use the cheapest" — it is "use the cheapest model that gets the task right."
            </p>
            <p className="text-[#333333]">
              {haiku.name} sits below both at <strong>${haiku.inputPricePerMTok}/M input</strong> and <strong>${haiku.outputPricePerMTok}/M output</strong>. For batch classification or tagging across thousands of items, that is where the real savings live.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">The mistake most people make</h2>
            <div className="bg-white p-6 rounded-lg border-l-4 border-red-400 mb-6">
              <h3 className="font-bold text-[#1A1A1A] mb-2">Reaching for Opus when the prompt is the problem</h3>
              <p className="text-[#333333]">
                The most common failure mode: a prompt returns a weak answer on {sonnet.name}, so the user upgrades to {opus.name} and pays the premium — when the real fix was a clearer prompt. Vague instructions, missing context, and no examples will hobble any model. Opus papers over a bad prompt at {Math.round((opus.outputPricePerMTok / sonnet.outputPricePerMTok) * 10) / 10}x the output cost.
              </p>
            </div>
            <p className="text-sm font-semibold text-[#1A1A1A] mb-3">Before you upgrade the model, upgrade the prompt:</p>
            <div className="bg-white rounded-lg border border-gray-200 p-5 font-mono text-sm text-[#333333] mb-4 whitespace-pre-wrap">{`Role: You are a [specific role].
Task: [one clear objective].
Context: [the inputs, constraints, audience].
Format: [exact output shape — JSON, table, headings].
Examples: [1-2 good outputs to anchor on].
If unsure: [what to do instead of guessing].`}</div>
            <p className="text-[#333333]">
              Run that on {sonnet.name} first. If a fully-specified prompt still fails, you have a genuine reasoning task — and that is exactly when {opus.name} earns its price. The free <Link href="/prompt-grader" className="text-blue-700 underline">Prompt Grader</Link> scores your version of this structure and shows you exactly which part is missing.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 text-center">Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="p-4 cursor-pointer hover:bg-gray-50 font-semibold text-gray-900 list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-gray-400 ml-4 text-xl flex-shrink-0">+</span>
                  </summary>
                  <div className="px-4 pb-4"><p className="text-gray-600 leading-relaxed">{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1A1A] text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">Stop guessing which model to use</h2>
            <p className="text-gray-300 mb-6">The model selector takes your task type and runs the choice for you. Once you know the model, the next lever is the prompt — that is where most of the quality lives. The free Prompt Grader scores yours and rewrites it.</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <a href="/prompt-grader" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Grade Your Prompt Free</a>
              <Link href="/calculators/claude-model-selector" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Open the model selector</Link>
              <Link href="/claude-context-window" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Claude context window</Link>
              <Link href="/claude-vs-gemini" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Claude vs Gemini</Link>
              <Link href="/calculators/claude-prompt-cost" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Prompt cost calculator</Link>
              <Link href="/claude-pro-vs-max-vs-api" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Pro vs Max vs API</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
