import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { generateFAQSchema } from '../../lib/schemaGenerator'

const MIX_PROFILES = {
  balanced: { label: 'Balanced (Sonnet 4 mostly)', sonnetShare: 0.85, opusShare: 0.10, haikuShare: 0.05 },
  heavy: { label: 'Heavy agentic (lots of Opus)', sonnetShare: 0.55, opusShare: 0.40, haikuShare: 0.05 },
  light: { label: 'Light (mostly Haiku + short Sonnet calls)', sonnetShare: 0.40, opusShare: 0.05, haikuShare: 0.55 }
}

const MODELS = {
  sonnet: { input: 3, output: 15, inputTokensPerHour: 120000, outputTokensPerHour: 18000 },
  opus:   { input: 15, output: 75, inputTokensPerHour: 80000, outputTokensPerHour: 15000 },
  haiku:  { input: 1, output: 5, inputTokensPerHour: 150000, outputTokensPerHour: 20000 }
}

const faqs = [
  {
    question: "Which is cheaper overall, Claude Code on API or Cursor Pro?",
    answer: "For most individual developers, Cursor Pro at $20/month is cheaper than API-billed Claude Code if you are actively coding more than about 2 hours a day with heavier models. For lighter use, Claude Code on API can come out under Cursor Pro. The calculator on this page computes your break-even based on your actual mix."
  },
  {
    question: "What about Claude Pro / Max subscriptions for Claude Code?",
    answer: "Claude Code can be powered by a Claude Pro ($20/month) or Claude Max ($100 or $200/month) subscription instead of API billing. That makes the cost comparison closer to Cursor — flat subscription vs flat subscription. Claude Pro is the direct competitor to Cursor Pro in pricing terms."
  },
  {
    question: "Why does Opus usage blow up the cost?",
    answer: "Claude Opus 4 is 5x the price of Sonnet 4 per token. If your workflow leans heavily on Opus (complex reasoning, deep code review, long-document analysis), API costs scale fast. For Opus-heavy work, Claude Max's $100 or $200 flat tier is often the economical choice over pure API billing."
  },
  {
    question: "Is the token-per-hour estimate realistic?",
    answer: "The calculator defaults assume roughly 120K input + 18K output tokens per hour for Sonnet, which matches typical agentic coding with file reads and moderate edits. If you paste a lot of large files or run long sub-agent sessions, input tokens can 2-3x. Adjust the usage profile to match your workload."
  },
  {
    question: "Does Cursor Pro have a usage cap?",
    answer: "Cursor Pro includes a monthly allotment of fast premium model requests (historically around 500/month for GPT-5 / Opus-level models). After that, you slow down rather than stopping. For most developers this is plenty; heavy power users occasionally hit the cap and either upgrade to Business tier or switch to per-request pricing."
  },
  {
    question: "Do I have to choose just one?",
    answer: "No, and I would argue you should not. Run Cursor as your main IDE for interactive coding, and Claude Code in a terminal for multi-file refactors, git workflows, and sub-agent tasks. A lot of developers pay for both and come out ahead on productivity. The total cost ($20-40/month) is trivial compared to the time saved."
  }
]

export default function ClaudeCodeVsCursorCost() {
  const [hoursPerDay, setHoursPerDay] = useState(3)
  const [daysPerMonth, setDaysPerMonth] = useState(20)
  const [mix, setMix] = useState('balanced')
  const [cursorPrice, setCursorPrice] = useState(20)
  const [claudeProAlt, setClaudeProAlt] = useState(20)

  const estimate = useMemo(() => {
    const totalHours = hoursPerDay * daysPerMonth
    const profile = MIX_PROFILES[mix]
    let inputTokens = 0
    let outputTokens = 0
    let apiCost = 0

    const sonnetHours = totalHours * profile.sonnetShare
    const opusHours = totalHours * profile.opusShare
    const haikuHours = totalHours * profile.haikuShare

    const sInput = sonnetHours * MODELS.sonnet.inputTokensPerHour
    const sOutput = sonnetHours * MODELS.sonnet.outputTokensPerHour
    const oInput = opusHours * MODELS.opus.inputTokensPerHour
    const oOutput = opusHours * MODELS.opus.outputTokensPerHour
    const hInput = haikuHours * MODELS.haiku.inputTokensPerHour
    const hOutput = haikuHours * MODELS.haiku.outputTokensPerHour

    inputTokens = sInput + oInput + hInput
    outputTokens = sOutput + oOutput + hOutput

    apiCost += (sInput / 1_000_000) * MODELS.sonnet.input + (sOutput / 1_000_000) * MODELS.sonnet.output
    apiCost += (oInput / 1_000_000) * MODELS.opus.input + (oOutput / 1_000_000) * MODELS.opus.output
    apiCost += (hInput / 1_000_000) * MODELS.haiku.input + (hOutput / 1_000_000) * MODELS.haiku.output

    return {
      totalHours,
      inputTokens,
      outputTokens,
      apiCost,
      cursorCost: cursorPrice,
      claudeProCost: claudeProAlt,
      cheapest: Math.min(apiCost, cursorPrice, claudeProAlt)
    }
  }, [hoursPerDay, daysPerMonth, mix, cursorPrice, claudeProAlt])

  const faqSchema = generateFAQSchema(faqs)
  const fmt = (n) => `$${n.toFixed(2)}`
  const fmtTokens = (n) => n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${(n / 1_000).toFixed(0)}k`

  const winner = estimate.apiCost === estimate.cheapest ? 'Claude Code on API' :
    estimate.cursorCost === estimate.cheapest ? 'Cursor Pro' : 'Claude Pro + Claude Code'

  return (
    <>
      <Head>
        <title>Claude Code vs Cursor Cost Calculator (2026) | PromptWritingStudio</title>
        <meta name="description" content="Compare the monthly cost of Claude Code on API, Claude Pro, and Cursor Pro for your actual coding workload. Interactive calculator with live token + dollar estimates." />
        <link rel="canonical" href="https://promptwritingstudio.com/calculators/claude-code-vs-cursor-cost" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Claude Code vs Cursor — Monthly Cost</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Set your actual coding hours and model mix. See which option — Claude Code on API, Claude Pro, or Cursor Pro — comes out cheapest for your workload.
            </p>
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Hours of AI coding per day</label>
                  <input type="number" step="0.5" value={hoursPerDay} onChange={e => setHoursPerDay(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Working days per month</label>
                  <input type="number" value={daysPerMonth} onChange={e => setDaysPerMonth(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Model mix</label>
                  <select value={mix} onChange={e => setMix(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]">
                    {Object.entries(MIX_PROFILES).map(([k, p]) => <option key={k} value={k}>{p.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Cursor Pro price ($/mo)</label>
                  <input type="number" value={cursorPrice} onChange={e => setCursorPrice(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Claude Pro price ($/mo)</label>
                  <input type="number" value={claudeProAlt} onChange={e => setClaudeProAlt(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#1A1A1A] text-white rounded-lg p-6 md:p-8">
              <p className="text-sm uppercase tracking-wide text-[#FFDE59] font-semibold mb-2">Cheapest for your workload</p>
              <h2 className="text-3xl font-bold mb-2">{winner}</h2>
              <p className="text-gray-300">At {estimate.totalHours} hours of AI coding per month, your lowest monthly cost is <strong className="text-white">{fmt(estimate.cheapest)}</strong>.</p>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className={`bg-white p-6 rounded-lg border-2 ${winner === 'Claude Code on API' ? 'border-[#FFDE59]' : 'border-gray-200'}`}>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code on API</h3>
                <p className="text-sm text-gray-500 mb-4">Pay per token via Anthropic</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Monthly cost:</span><span className="font-bold text-[#1A1A1A]">{fmt(estimate.apiCost)}</span></div>
                  <div className="flex justify-between text-xs text-gray-500 pt-2 border-t"><span>Input tokens:</span><span>{fmtTokens(estimate.inputTokens)}</span></div>
                  <div className="flex justify-between text-xs text-gray-500"><span>Output tokens:</span><span>{fmtTokens(estimate.outputTokens)}</span></div>
                </div>
              </div>

              <div className={`bg-white p-6 rounded-lg border-2 ${winner === 'Claude Pro + Claude Code' ? 'border-[#FFDE59]' : 'border-gray-200'}`}>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Pro + Claude Code</h3>
                <p className="text-sm text-gray-500 mb-4">Flat monthly, no API bill</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Monthly cost:</span><span className="font-bold text-[#1A1A1A]">{fmt(estimate.claudeProCost)}</span></div>
                  <div className="text-xs text-gray-500 pt-2 border-t">Includes web Claude + Claude Code. Heavy users may need Max ($100 or $200/mo).</div>
                </div>
              </div>

              <div className={`bg-white p-6 rounded-lg border-2 ${winner === 'Cursor Pro' ? 'border-[#FFDE59]' : 'border-gray-200'}`}>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Cursor Pro</h3>
                <p className="text-sm text-gray-500 mb-4">Flat monthly IDE subscription</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Monthly cost:</span><span className="font-bold text-[#1A1A1A]">{fmt(estimate.cursorCost)}</span></div>
                  <div className="text-xs text-gray-500 pt-2 border-t">Includes GPT-5 / Opus / Sonnet access within a monthly fast-request cap.</div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">Estimates assume typical agentic coding throughput. Your actual token volume depends on how often you paste large files or invoke sub-agents.</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">How to read the result</h2>
            <div className="space-y-4">
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">API wins when your volume is low</h3>
                <p className="text-[#333333]">Short sessions, short prompts, mostly Haiku — the API bill stays under $20 and beats either flat subscription.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Flat subscriptions win when volume is steady</h3>
                <p className="text-[#333333]">Coding 3+ hours a day on Sonnet with occasional Opus? Claude Pro or Cursor Pro at $20 caps your cost while API billing climbs.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Claude Max matters when Opus dominates</h3>
                <p className="text-[#333333]">If your API estimate is running past $100/month because Opus is doing the heavy lifting, Claude Max at $100 or $200 becomes the rational choice.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 text-center">Frequently Asked Questions</h2>
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
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Once you have the numbers</h2>
            <p className="text-gray-300 mb-6">The cost is only half the question — the other half is which tool fits your workflow. The 30-day switch plan walks through moving from Cursor to Claude Code week by week.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/claude-code-vs-cursor" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Claude Code vs Cursor (30-day plan)</Link>
              <Link href="/calculators/claude-model-selector" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Pick a Claude model</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
