import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import LastVerified from '../../components/LastVerified'
import { generateFAQSchema } from '../../lib/schemaGenerator'
import { getCurrentModelByTier, MODELS_META } from '../../lib/claude-data'

const TASK_PROFILES = {
  'quick-chat': { label: 'Quick chat / short answers', inputPerCall: 400, outputPerCall: 300, recommended: 'fast' },
  'writing': { label: 'Long-form writing / editing', inputPerCall: 2000, outputPerCall: 1500, recommended: 'workhorse' },
  'research': { label: 'Research + synthesis across long docs', inputPerCall: 20000, outputPerCall: 2000, recommended: 'flagship' },
  'coding': { label: 'Coding / multi-file refactors', inputPerCall: 8000, outputPerCall: 2500, recommended: 'workhorse' },
  'complex-reasoning': { label: 'Complex reasoning / hard problems', inputPerCall: 3000, outputPerCall: 2000, recommended: 'flagship' },
  'classification': { label: 'Classification / high-volume batch', inputPerCall: 500, outputPerCall: 100, recommended: 'fast' },
  'customer-support': { label: 'Customer support replies', inputPerCall: 1500, outputPerCall: 500, recommended: 'workhorse' }
}

const TAGLINES = {
  fast: { tagline: 'Fast + cheap', good: 'High-volume routine tasks, classification, simple transforms', bad: 'Hard reasoning, long-context synthesis' },
  workhorse: { tagline: 'Balanced workhorse', good: 'Most writing, coding, and day-to-day work', bad: 'Nothing — it is the default for a reason' },
  flagship: { tagline: 'Flagship reasoning', good: 'Hard problems, nuanced review, very long documents', bad: 'Overkill and expensive for routine work' }
}

const MODELS = ['fast', 'workhorse', 'flagship'].reduce((acc, tier) => {
  const m = getCurrentModelByTier(tier)
  acc[tier] = {
    name: m.name,
    inputPrice: m.inputPricePerMTok,
    outputPrice: m.outputPricePerMTok,
    ...TAGLINES[tier]
  }
  return acc
}, {})

const faqs = [
  {
    question: "Which Claude model should I use by default?",
    answer: "Claude Sonnet 4.6. It handles nearly every task with the right mix of speed, capability, and cost. Drop to Haiku 4.5 only when you are running high-volume, low-complexity tasks where per-call cost matters. Escalate to Opus 4.7 only when you have a specific hard-reasoning task that Sonnet is clearly struggling on."
  },
  {
    question: "How do I estimate tokens per call?",
    answer: "A rough rule: 1 token is about 0.75 English words, so 1000 words is about 1333 tokens. For a quick chat, input is typically 200-600 tokens and output 200-500. For long-document analysis, input can be tens of thousands. The calculator uses task-profile defaults that match real usage; adjust if your workload differs."
  },
  {
    question: "Are these prices current?",
    answer: "Prices shown here are Anthropic's public API pricing as of April 2026: Haiku 4.5 at $1/$5 per million input/output tokens, Sonnet 4.6 at $3/$15, Opus 4.7 at $5/$25. This page pulls from a central pricing data file that is verified weekly against platform.claude.com — verify against the source link above before committing to a production deployment."
  },
  {
    question: "What about Claude Pro or Max subscriptions instead of the API?",
    answer: "If you are using Claude through the web or Claude Code, subscriptions are often cheaper. Claude Pro at $20/month unlocks Opus 4.7, Sonnet 4.6, and Haiku 4.5 access with generous daily limits. Claude Max at $100 (5x) or $200 (20x) is for heavy daily users. The API is better when you are building something programmatic, running high volume, or need fine-grained cost control."
  },
  {
    question: "Why is Opus ~1.7x the price of Sonnet?",
    answer: "Opus 4.7 is Anthropic's flagship reasoning model. At $5/$25 per MTok vs Sonnet 4.6 at $3/$15, Opus costs about 67% more than Sonnet. It runs more computation per token to deliver better results on hard tasks. For most tasks that extra capability is invisible — Sonnet would have produced an equally good answer. Use Opus when you can feel the difference."
  },
  {
    question: "Can I mix models in the same workflow?",
    answer: "Yes, and you should. A common pattern: use Haiku to triage or classify, then escalate only the hard cases to Sonnet or Opus. Claude Code does this automatically to a degree. If you are building a product, model routing is one of the biggest cost optimisations available."
  }
]

export default function ClaudeModelSelector() {
  const [task, setTask] = useState('writing')
  const [callsPerMonth, setCallsPerMonth] = useState(1000)
  const [inputTokens, setInputTokens] = useState(TASK_PROFILES.writing.inputPerCall)
  const [outputTokens, setOutputTokens] = useState(TASK_PROFILES.writing.outputPerCall)

  const handleTaskChange = (t) => {
    setTask(t)
    setInputTokens(TASK_PROFILES[t].inputPerCall)
    setOutputTokens(TASK_PROFILES[t].outputPerCall)
  }

  const estimates = useMemo(() => {
    const result = {}
    Object.entries(MODELS).forEach(([key, m]) => {
      const perCallInput = (inputTokens / 1_000_000) * m.inputPrice
      const perCallOutput = (outputTokens / 1_000_000) * m.outputPrice
      const perCall = perCallInput + perCallOutput
      result[key] = {
        perCall,
        perMonth: perCall * callsPerMonth
      }
    })
    return result
  }, [inputTokens, outputTokens, callsPerMonth])

  const recommendedKey = TASK_PROFILES[task].recommended
  const recommendedModel = MODELS[recommendedKey]

  const faqSchema = generateFAQSchema(faqs)

  const fmt = (n) => n < 0.01 ? `$${(n * 1000).toFixed(2)}/1k` : n < 1 ? `$${n.toFixed(3)}` : `$${n.toFixed(2)}`

  return (
    <>
      <Head>
        <title>Claude Model Selector + Cost Calculator (Opus vs Sonnet vs Haiku) | PromptWritingStudio</title>
        <meta name="description" content="Pick the right Claude model for your task and see the monthly cost. Compares Claude Opus 4.7, Sonnet 4.6, and Haiku 4.5 at Anthropic's current API pricing. Free, no signup." />
        <link rel="canonical" href="https://promptwritingstudio.com/calculators/claude-model-selector" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Claude Model Selector</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Pick the task, see the recommended Claude model, and get a live monthly cost estimate at current Anthropic API pricing.
            </p>
            <LastVerified date={MODELS_META.lastVerified} source={MODELS_META.source} className="mt-4 text-gray-300" />
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">What are you doing?</label>
                  <select
                    value={task}
                    onChange={e => handleTaskChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]"
                  >
                    {Object.entries(TASK_PROFILES).map(([k, p]) => (
                      <option key={k} value={k}>{p.label}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Calls per month</label>
                    <input
                      type="number"
                      value={callsPerMonth}
                      onChange={e => setCallsPerMonth(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Input tokens / call</label>
                    <input
                      type="number"
                      value={inputTokens}
                      onChange={e => setInputTokens(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Output tokens / call</label>
                    <input
                      type="number"
                      value={outputTokens}
                      onChange={e => setOutputTokens(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#1A1A1A] text-white rounded-lg p-6 md:p-8">
              <p className="text-sm uppercase tracking-wide text-[#FFDE59] font-semibold mb-2">Recommended for this task</p>
              <h2 className="text-3xl font-bold mb-2">{recommendedModel.name}</h2>
              <p className="text-gray-300 mb-4">{recommendedModel.tagline}. <strong className="text-white">{fmt(estimates[recommendedKey].perMonth)}</strong> estimated per month at your volume.</p>
              <p className="text-gray-400 text-sm">Good for: {recommendedModel.good}</p>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {Object.entries(MODELS).map(([key, m]) => {
                const est = estimates[key]
                const isRecommended = key === recommendedKey
                return (
                  <div key={key} className={`bg-white p-6 rounded-lg border-2 ${isRecommended ? 'border-[#FFDE59]' : 'border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[#1A1A1A]">{m.name}</h3>
                      {isRecommended && <span className="text-xs font-bold bg-[#FFDE59] text-[#1A1A1A] px-2 py-0.5 rounded-full">Best fit</span>}
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{m.tagline}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span className="text-gray-600">Per call:</span><span className="font-semibold">{fmt(est.perCall)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-600">Per month:</span><span className="font-bold text-[#1A1A1A]">{fmt(est.perMonth)}</span></div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2 pt-2 border-t"><span>Input:</span><span>${m.inputPrice}/M</span></div>
                      <div className="flex justify-between text-xs text-gray-500"><span>Output:</span><span>${m.outputPrice}/M</span></div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="text-center mt-6">
              <LastVerified date={MODELS_META.lastVerified} source={MODELS_META.source} />
              <p className="text-xs text-gray-400 mt-1">Input / output rates are per million tokens.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">How to pick in 10 seconds</h2>
            <div className="space-y-4">
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Default to Sonnet 4.6</h3>
                <p className="text-[#333333]">Unless you have a specific reason not to, Sonnet 4.6 handles nearly every task at the right cost/quality balance. It is the workhorse.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Drop to Haiku when volume dominates</h3>
                <p className="text-[#333333]">Classifying 100,000 items? Building a triage layer? Summarising short messages at scale? Haiku 4.5 is an order of magnitude cheaper and plenty smart for routine work.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Escalate to Opus only when Sonnet is struggling</h3>
                <p className="text-[#333333]">If Sonnet consistently misses nuance on a hard task — legal analysis, research synthesis, subtle code review — Opus 4.7 earns its premium. Do not default to it; opt in when needed.</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Paired reading</h2>
            <p className="text-gray-300 mb-6">Once you know which model fits, the next step is using it well. The Claude vs ChatGPT comparison covers the ecosystem trade-offs; the AI Models page tracks full pricing across Claude, GPT, Gemini, and more.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/claude-vs-chatgpt" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Claude vs ChatGPT</Link>
              <Link href="/ai-models" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Full AI model comparison</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
