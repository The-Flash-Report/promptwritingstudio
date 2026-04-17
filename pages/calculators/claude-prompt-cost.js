import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { generateFAQSchema } from '../../lib/schemaGenerator'

const MODELS = {
  'haiku-4-5': { name: 'Claude Haiku 4.5', input: 1, output: 5 },
  'sonnet-4': { name: 'Claude Sonnet 4', input: 3, output: 15 },
  'opus-4': { name: 'Claude Opus 4', input: 15, output: 75 }
}

const faqs = [
  {
    question: "How many tokens is my prompt?",
    answer: "Roughly 1 token per 0.75 English words, or 4 characters per token. So a 500-word prompt is about 670 tokens. The exact count depends on punctuation, non-English characters, and code. For precise counts, use Anthropic's tokenizer in the SDK. For rough planning, the word-count estimator on this page is within about 10%."
  },
  {
    question: "What counts as 'output tokens'?",
    answer: "Every token Claude generates in its reply, including thinking tokens if extended thinking is enabled. A typical 300-word response is about 400 output tokens. Output is priced 3-5x higher than input across all Claude models, so long replies cost more than long prompts of the same word count."
  },
  {
    question: "Does the system prompt count toward input?",
    answer: "Yes. Every token you send — system prompt, conversation history, user message, attached documents — counts toward input tokens on every call. This is why long chat histories get expensive: each turn re-sends the whole conversation. Use prompt caching (available on the Anthropic API) to cut repeated-input costs by up to 90%."
  },
  {
    question: "What is prompt caching and how much does it save?",
    answer: "Prompt caching lets you mark large static parts of a prompt (system prompts, long documents) for caching. On subsequent calls within 5 minutes, cached tokens cost about 10% of normal input rate. For applications that send the same large context repeatedly (agents, document Q&A, code assistants), savings of 50-90% are normal."
  },
  {
    question: "Is Haiku really 15x cheaper than Opus?",
    answer: "On output, yes — Haiku 4.5 is about $5/M output tokens vs Opus 4 at $75/M. On input, Haiku is $1/M vs Opus $15/M. For high-volume routine tasks (classification, short Q&A, simple transforms), running Haiku instead of Opus is one of the biggest cost optimisations available. The quality difference is often invisible for easy tasks."
  },
  {
    question: "How do I cut my Claude API costs?",
    answer: "Four main levers. First, pick the smallest model that handles the task — start with Haiku, escalate only when quality suffers. Second, use prompt caching for static context. Third, trim the system prompt and conversation history to the minimum needed. Fourth, set max_tokens on the output to the true cap you need — Claude will stop early and you pay only for what is generated."
  }
]

export default function ClaudePromptCost() {
  const [model, setModel] = useState('sonnet-4')
  const [inputMode, setInputMode] = useState('words')
  const [inputWords, setInputWords] = useState(300)
  const [inputTokens, setInputTokens] = useState(400)
  const [outputWords, setOutputWords] = useState(200)
  const [outputTokens, setOutputTokens] = useState(270)
  const [runsPerMonth, setRunsPerMonth] = useState(1000)

  const resolvedInputTokens = inputMode === 'words' ? Math.round(inputWords / 0.75) : inputTokens
  const resolvedOutputTokens = inputMode === 'words' ? Math.round(outputWords / 0.75) : outputTokens

  const costs = useMemo(() => {
    const result = {}
    Object.entries(MODELS).forEach(([key, m]) => {
      const perCall = (resolvedInputTokens / 1_000_000) * m.input + (resolvedOutputTokens / 1_000_000) * m.output
      result[key] = {
        perCall,
        perThousand: perCall * 1000,
        perMonth: perCall * runsPerMonth
      }
    })
    return result
  }, [resolvedInputTokens, resolvedOutputTokens, runsPerMonth])

  const selected = costs[model]
  const faqSchema = generateFAQSchema(faqs)
  const fmt = (n) => n < 0.01 ? `$${(n * 100).toFixed(3)}¢` : n < 1 ? `$${n.toFixed(4)}` : `$${n.toFixed(2)}`

  return (
    <>
      <Head>
        <title>Claude Prompt Cost Calculator (Opus, Sonnet, Haiku) | PromptWritingStudio</title>
        <meta name="description" content="Calculate the cost of a single Claude API call — or a million of them. Supports Claude Opus 4, Sonnet 4, and Haiku 4.5 at current Anthropic pricing. Free, no signup." />
        <link rel="canonical" href="https://promptwritingstudio.com/calculators/claude-prompt-cost" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Claude Prompt Cost Calculator</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Work out what a Claude API call will cost — one call, a thousand, or a million — across Haiku 4.5, Sonnet 4, and Opus 4.
            </p>
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Model</label>
                  <select value={model} onChange={e => setModel(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]">
                    {Object.entries(MODELS).map(([k, m]) => <option key={k} value={k}>{m.name} — ${m.input}/M in, ${m.output}/M out</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Measure by</label>
                  <div className="flex gap-2">
                    <button onClick={() => setInputMode('words')} className={`px-4 py-2 rounded-lg font-semibold text-sm ${inputMode === 'words' ? 'bg-[#FFDE59] text-[#1A1A1A]' : 'bg-gray-100 text-gray-600'}`}>Words (estimate)</button>
                    <button onClick={() => setInputMode('tokens')} className={`px-4 py-2 rounded-lg font-semibold text-sm ${inputMode === 'tokens' ? 'bg-[#FFDE59] text-[#1A1A1A]' : 'bg-gray-100 text-gray-600'}`}>Tokens (exact)</button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {inputMode === 'words' ? (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Input words (prompt + context)</label>
                        <input type="number" value={inputWords} onChange={e => setInputWords(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                        <p className="text-xs text-gray-500 mt-1">~{resolvedInputTokens.toLocaleString()} tokens</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Output words (expected reply)</label>
                        <input type="number" value={outputWords} onChange={e => setOutputWords(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                        <p className="text-xs text-gray-500 mt-1">~{resolvedOutputTokens.toLocaleString()} tokens</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Input tokens</label>
                        <input type="number" value={inputTokens} onChange={e => setInputTokens(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Output tokens</label>
                        <input type="number" value={outputTokens} onChange={e => setOutputTokens(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Runs per month</label>
                  <input type="number" value={runsPerMonth} onChange={e => setRunsPerMonth(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#1A1A1A] text-white rounded-lg p-6 md:p-8">
              <p className="text-sm uppercase tracking-wide text-[#FFDE59] font-semibold mb-2">{MODELS[model].name}</p>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Per call</p>
                  <p className="text-3xl font-bold">{fmt(selected.perCall)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Per 1,000 calls</p>
                  <p className="text-3xl font-bold">{fmt(selected.perThousand)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Per month ({runsPerMonth.toLocaleString()} calls)</p>
                  <p className="text-3xl font-bold">{fmt(selected.perMonth)}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A]">Same prompt, all three models</h3>
                <p className="text-sm text-gray-500">Monthly cost at your volume ({runsPerMonth.toLocaleString()} calls)</p>
              </div>
              <div className="divide-y divide-gray-100">
                {Object.entries(MODELS).map(([key, m]) => {
                  const c = costs[key]
                  const isSelected = key === model
                  return (
                    <div key={key} className={`p-4 flex items-center justify-between ${isSelected ? 'bg-[#FFDE59]/10' : ''}`}>
                      <div>
                        <p className="font-semibold text-[#1A1A1A]">{m.name}</p>
                        <p className="text-xs text-gray-500">${m.input}/M input · ${m.output}/M output</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#1A1A1A]">{fmt(c.perMonth)}</p>
                        <p className="text-xs text-gray-500">{fmt(c.perCall)}/call</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Four ways to cut Claude API costs</h2>
            <div className="space-y-4">
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">1. Pick the smallest model that works</h3>
                <p className="text-[#333333]">Start with Haiku. Escalate only when quality suffers. Dropping from Opus to Sonnet cuts cost by 80%; dropping from Sonnet to Haiku cuts another 67%.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">2. Use prompt caching for repeated context</h3>
                <p className="text-[#333333]">If you send the same system prompt or document on every call, enable prompt caching. Cached input drops to about 10% of normal rate on subsequent hits within 5 minutes.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">3. Cap output with max_tokens</h3>
                <p className="text-[#333333]">Claude stops as soon as it hits your cap. Setting max_tokens to what you actually need (not a big safe number) saves money on every single call.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">4. Trim conversation history</h3>
                <p className="text-[#333333]">Long chats re-send the whole history every turn. Summarise or truncate old turns when they are no longer relevant to the current question.</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Next tool</h2>
            <p className="text-gray-300 mb-6">Now that you know the per-call cost, the model selector maps tasks to the right Claude model, and the Claude Code vs Cursor calculator tells you whether API billing or a flat subscription wins for your workflow.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculators/claude-model-selector" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Claude Model Selector</Link>
              <Link href="/calculators/claude-code-vs-cursor-cost" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Claude Code vs Cursor cost</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
