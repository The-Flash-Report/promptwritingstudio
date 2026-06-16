import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import LastVerified from '../components/LastVerified'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'
import { CURRENT_MODELS, MODELS_META, API_PLAN } from '../lib/claude-data'

// Cache + batch multipliers verified against platform.claude.com docs (see source link).
const CACHE_READ_MULTIPLIER = 0.1
const CACHE_WRITE_5M_MULTIPLIER = 1.25
const CACHE_WRITE_1H_MULTIPLIER = 2
const BATCH_DISCOUNT = 0.5

const fmt = (n) =>
  n < 1 ? `$${n.toFixed(2)}` : `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`

// Worked cost examples — all computed from the model rates, nothing hardcoded.
const sonnet = CURRENT_MODELS.find((m) => m.tier === 'workhorse')
const opus = CURRENT_MODELS.find((m) => m.tier === 'flagship')
const haiku = CURRENT_MODELS.find((m) => m.tier === 'fast')

function callCost(model, inTokens, outTokens) {
  return (
    (inTokens / 1_000_000) * model.inputPricePerMTok +
    (outTokens / 1_000_000) * model.outputPricePerMTok
  )
}

// Example A: a single support-chatbot reply (2k in, 500 out) on Sonnet, x10k/mo
const chatbotPerCall = callCost(sonnet, 2000, 500)
const chatbotMonthly = chatbotPerCall * 10_000

// Example B: same volume but on Haiku
const chatbotHaikuMonthly = callCost(haiku, 2000, 500) * 10_000

// Example C: a long-doc summariser on Opus (50k in, 2k out), x1k/mo
const summariserPerCall = callCost(opus, 50_000, 2000)
const summariserMonthly = summariserPerCall * 1000

// Caching example: chatbot with a 1,800-token system prompt cached on every call
const cachedSystemTokens = 1800
const freshSystemMonthly = (cachedSystemTokens / 1_000_000) * sonnet.inputPricePerMTok * 10_000
const cachedSystemMonthly =
  (cachedSystemTokens / 1_000_000) * sonnet.inputPricePerMTok * CACHE_READ_MULTIPLIER * 10_000
const cacheSavingsPct = Math.round((1 - cachedSystemMonthly / freshSystemMonthly) * 100)

const faqs = [
  {
    question: 'How does Anthropic API pricing work?',
    answer:
      'The Anthropic API is pay-as-you-go by token. You are billed separately for input tokens (everything you send: your prompt, system instructions, and conversation history) and output tokens (everything Claude generates). Prices are quoted per million tokens (MTok) and differ by model. There is no monthly fee, no minimum spend, and no seat cost — you pay only for the tokens each request consumes.'
  },
  {
    question: 'How much does the Claude API cost per token?',
    answer: `Per the current model lineup: ${opus.name} is ${fmt(
      opus.inputPricePerMTok
    )} per million input tokens and ${fmt(
      opus.outputPricePerMTok
    )} per million output tokens. ${sonnet.name} is ${fmt(
      sonnet.inputPricePerMTok
    )} input / ${fmt(sonnet.outputPricePerMTok)} output. ${haiku.name} is ${fmt(
      haiku.inputPricePerMTok
    )} input / ${fmt(
      haiku.outputPricePerMTok
    )} output. Output tokens cost 5x input across every model, so terse responses are cheaper than verbose ones.`
  },
  {
    question: 'Is the Anthropic API cheaper than a Claude subscription?',
    answer:
      'For building applications, yes — the API is the only option, and you pay only for what you ship. For your own personal Claude use (chat, Claude Code), no. A flat $20/mo Pro subscription almost always beats metered API tokens once you use Claude daily. Most developers run both: a subscription for personal work, API billing for the apps they build.'
  },
  {
    question: 'How much can prompt caching save?',
    answer: `Cache reads cost ${CACHE_READ_MULTIPLIER}x (10%) of the base input price, so re-sending a large fixed context — a system prompt, a knowledge base, a long instruction set — drops to a tenth of its normal cost on every cached call. Writing to the cache carries a small premium (${CACHE_WRITE_5M_MULTIPLIER}x for the 5-minute cache, ${CACHE_WRITE_1H_MULTIPLIER}x for the 1-hour cache), so caching pays off whenever the same context is reused more than a couple of times. In the worked example on this page, caching a 1,800-token system prompt cuts that portion of the bill by about ${cacheSavingsPct}%.`
  },
  {
    question: 'What is the Message Batches API discount?',
    answer: `The Message Batches API processes requests asynchronously (results within 24 hours) at ${
      BATCH_DISCOUNT * 100
    }% off standard token rates — input and output both. Use it for anything that does not need a real-time reply: bulk classification, content generation pipelines, dataset labelling, overnight summarisation. Batch and prompt caching stack, so a cached batch job is cheaper still.`
  },
  {
    question: 'Do input and output tokens cost the same?',
    answer:
      'No. Output tokens are priced at 5x input tokens on every current model. That is why long input context (documents, history) is relatively cheap to send, but asking for long generated answers is the expensive part of a bill. Capping max output tokens and prompting for concise responses is the single biggest lever on cost.'
  },
  {
    question: 'How do I estimate my monthly Claude API bill?',
    answer:
      'Estimate average input tokens per call, average output tokens per call, and calls per month. Multiply input tokens by the model input rate (per MTok) and output tokens by the output rate, add them for a per-call cost, then multiply by monthly call volume. The fill-in-the-blank template on this page walks through the arithmetic with a real example.'
  }
]

const article = generateArticleSchema({
  title: 'Anthropic API Pricing: Per-Model Token Rates and Real Cost Examples (2026)',
  description:
    'How Anthropic API pricing works — per-model input/output token rates, how billing is calculated, worked cost examples, and how prompt caching and the Batch API cut the bill.',
  slug: 'anthropic-api-pricing',
  datePublished: '2026-06-16'
})

export default function AnthropicApiPricing() {
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <Head>
        <title>Anthropic API Pricing: Per-Model Token Rates and Cost Examples (2026) | PromptWritingStudio</title>
        <meta
          name="description"
          content="Anthropic API pricing explained: per-model input and output token rates, how token billing works, worked monthly cost examples, and how prompt caching and the Batch API cut your bill."
        />
        <link rel="canonical" href="https://promptwritingstudio.com/anthropic-api-pricing" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">Claude · API</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Anthropic API Pricing: Per-Model Token Rates and Real Cost Examples
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              How Anthropic API pricing actually works — what each model costs per token, how a bill is
              calculated, worked monthly examples, and the two levers that cut spend the most.
            </p>
            <LastVerified date={MODELS_META.lastVerified} source={MODELS_META.source} className="mt-4 text-gray-300" />
          </div>
        </section>

        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                The Anthropic API is <strong>pay-as-you-go by token</strong> — no monthly fee, no seats. You pay
                separately for <strong>input tokens</strong> (what you send) and <strong>output tokens</strong> (what
                Claude generates), priced per million tokens and differing by model. Current rates run from{' '}
                <strong>{fmt(haiku.inputPricePerMTok)}/{fmt(haiku.outputPricePerMTok)}</strong> per MTok on{' '}
                {haiku.name} up to <strong>{fmt(opus.inputPricePerMTok)}/{fmt(opus.outputPricePerMTok)}</strong> on{' '}
                {opus.name}. <strong>Output costs 5x input</strong> on every model. Prompt caching ({CACHE_READ_MULTIPLIER}x
                on cache reads) and the Batch API ({BATCH_DISCOUNT * 100}% off) are the biggest cost levers.
              </p>
            </div>
          </div>
        </section>

        {/* Per-model rate table — pulled live from claude-data.js */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3 text-center">
              How much does each Claude model cost per token?
            </h2>
            <p className="text-[#333333] mb-8 text-center max-w-2xl mx-auto">
              Standard API rates, quoted per million tokens (MTok). Input and output are billed separately.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
                <thead className="bg-[#1A1A1A] text-white">
                  <tr>
                    <th className="p-3 text-left">Model</th>
                    <th className="p-3 text-left">Tier</th>
                    <th className="p-3 text-left">Input / MTok</th>
                    <th className="p-3 text-left">Output / MTok</th>
                    <th className="p-3 text-left">Context window</th>
                    <th className="p-3 text-left">Best for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {CURRENT_MODELS.map((m) => (
                    <tr key={m.id}>
                      <td className="p-3 font-semibold text-[#1A1A1A]">{m.name}</td>
                      <td className="p-3 text-[#333333] capitalize">{m.tier}</td>
                      <td className="p-3 text-[#333333]">{fmt(m.inputPricePerMTok)}</td>
                      <td className="p-3 text-[#333333]">{fmt(m.outputPricePerMTok)}</td>
                      <td className="p-3 text-[#333333]">{(m.contextTokens / 1000).toLocaleString()}K</td>
                      <td className="p-3 text-[#333333]">{m.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Rates verified against the Anthropic model overview on {MODELS_META.lastVerified}. Model lineup and
              pricing change often — check the source before forecasting a large budget.
            </p>
          </div>
        </section>

        {/* How billing works */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">How does Anthropic API billing work?</h2>
            <p className="text-[#333333] mb-4">
              Every API request has two billable parts. <strong>Input tokens</strong> are everything you send to
              the model on that call: your prompt, the system instructions, and — in a multi-turn conversation —
              the entire prior history you replay. <strong>Output tokens</strong> are everything Claude writes back.
            </p>
            <p className="text-[#333333] mb-4">
              Both are counted in tokens (roughly 3-4 characters of English each) and billed per million. The
              formula for a single call is simple:
            </p>
            <div className="bg-[#1A1A1A] text-gray-100 rounded-lg p-5 font-mono text-sm leading-relaxed mb-4">
              call cost = (input tokens ÷ 1,000,000 × input rate)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ (output tokens ÷ 1,000,000 × output rate)
            </div>
            <p className="text-[#333333] mb-4">
              The thing most people miss: <strong>output is 5x the price of input on every model.</strong> Sending
              a 50,000-token document is cheap; asking for a 5,000-token essay back is where the bill grows. In a
              chat app, the replayed history also compounds — each new turn re-sends every previous turn as input.
            </p>
            <p className="text-[#333333]">
              There is no monthly minimum and no per-seat cost. You add credit to a billing account at{' '}
              <a
                href="https://console.anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A1A] underline font-semibold"
              >
                console.anthropic.com
              </a>{' '}
              and tokens draw it down. This is the opposite model from the{' '}
              <Link href="/claude-pro-vs-max-vs-api" className="text-[#1A1A1A] underline font-semibold">
                Pro, Max, and Team subscriptions
              </Link>
              , which are flat monthly prices for personal use of the Claude apps.
            </p>
          </div>
        </section>

        {/* Worked examples */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">What does the API actually cost? Three worked examples</h2>
            <p className="text-[#333333] mb-8">
              Numbers below are calculated from the live rates above, so they stay correct when the data updates.
            </p>

            <div className="space-y-6">
              <div className="bg-[#F9F9F9] rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">1. Support chatbot on {sonnet.name}</h3>
                <p className="text-[#333333] mb-3">
                  Assume 2,000 input tokens (system prompt + question + a little history) and 500 output tokens per
                  reply, at 10,000 replies a month.
                </p>
                <ul className="space-y-1 text-[#333333] mb-3">
                  <li>Per reply: <strong>{fmt(chatbotPerCall)}</strong></li>
                  <li>10,000 replies/month: <strong>{fmt(chatbotMonthly)}/mo</strong></li>
                </ul>
                <p className="text-sm text-[#333333]">
                  Swap to {haiku.name} for the same volume and it drops to{' '}
                  <strong>{fmt(chatbotHaikuMonthly)}/mo</strong> — the biggest single saving on most apps is using
                  the smallest model that holds quality.
                </p>
              </div>

              <div className="bg-[#F9F9F9] rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">2. Long-document summariser on {opus.name}</h3>
                <p className="text-[#333333] mb-3">
                  A 50,000-token document in, a 2,000-token summary out, 1,000 documents a month.
                </p>
                <ul className="space-y-1 text-[#333333]">
                  <li>Per document: <strong>{fmt(summariserPerCall)}</strong></li>
                  <li>1,000 documents/month: <strong>{fmt(summariserMonthly)}/mo</strong></li>
                </ul>
              </div>

              <div className="bg-[#F9F9F9] rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">3. The same chatbot, with prompt caching</h3>
                <p className="text-[#333333] mb-3">
                  Of those 2,000 input tokens, say 1,800 are a fixed system prompt sent on every call. Cache it and
                  cache reads cost {CACHE_READ_MULTIPLIER}x the input rate.
                </p>
                <ul className="space-y-1 text-[#333333]">
                  <li>System prompt, uncached, 10k calls: <strong>{fmt(freshSystemMonthly)}/mo</strong></li>
                  <li>System prompt, cached, 10k calls: <strong>{fmt(cachedSystemMonthly)}/mo</strong></li>
                  <li>Saving on that portion: <strong>~{cacheSavingsPct}%</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Cost levers: caching + batch */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">Two levers that cut the bill</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Prompt caching</h3>
                <p className="text-[#333333] mb-3">
                  Cache a large, reused chunk of context — a system prompt, a knowledge base, a style guide — and
                  every subsequent call reads it at {CACHE_READ_MULTIPLIER}x the input price.
                </p>
                <ul className="space-y-1 text-sm text-[#333333]">
                  <li>Cache read: <strong>{CACHE_READ_MULTIPLIER}x</strong> input rate (a 90% discount)</li>
                  <li>5-minute cache write: <strong>{CACHE_WRITE_5M_MULTIPLIER}x</strong> input rate</li>
                  <li>1-hour cache write: <strong>{CACHE_WRITE_1H_MULTIPLIER}x</strong> input rate</li>
                </ul>
                <p className="text-sm text-[#333333] mt-3">
                  Worth it whenever the same context is reused more than a couple of times before it expires.
                </p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Message Batches API</h3>
                <p className="text-[#333333] mb-3">
                  Submit requests asynchronously (results within 24 hours) for <strong>{BATCH_DISCOUNT * 100}% off</strong>{' '}
                  standard rates on both input and output.
                </p>
                <p className="text-sm text-[#333333]">
                  Use it for anything that does not need a live reply: bulk classification, content pipelines,
                  dataset labelling, overnight reports. Batch and caching stack — a cached batch job is cheaper
                  again.
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Caching and batch multipliers per Anthropic&apos;s prompt-caching and Batches API docs ·{' '}
              <a
                href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-gray-700"
              >
                source
              </a>
            </p>
          </div>
        </section>

        {/* Fill-in-the-blank estimation template — the practical moat */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">Estimate your own bill: a fill-in-the-blank template</h2>
            <p className="text-[#333333] mb-6">
              Drop your own numbers into the blanks. The arithmetic is the same per-call formula from above, scaled
              to monthly volume.
            </p>
            <div className="bg-[#1A1A1A] text-gray-100 rounded-lg p-6 font-mono text-sm leading-relaxed">
              Model: ______ (input rate $___ / MTok, output rate $___ / MTok)
              <br />
              Avg input tokens per call: ______
              <br />
              Avg output tokens per call: ______
              <br />
              Calls per month: ______
              <br />
              <br />
              Per-call cost = (input ÷ 1,000,000 × input rate)
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ (output ÷ 1,000,000 × output rate)
              <br />
              Monthly cost = per-call cost × calls per month
              <br />
              <br />
              If a fixed chunk of input repeats every call:
              <br />
              &nbsp;&nbsp;cached portion cost × {CACHE_READ_MULTIPLIER} (cache read)
              <br />
              If replies can wait up to 24h: × {BATCH_DISCOUNT} (Batch API)
            </div>
            <div className="bg-[#FFDE59]/10 border-l-4 border-[#FFDE59] p-4 rounded-r mt-5">
              <p className="text-sm text-[#1A1A1A]">
                <strong>Failure mode to avoid:</strong> people forecast on input tokens and forget that output is
                5x the price, then get a bill double their estimate. Always size the output side first, and cap{' '}
                <code>max_tokens</code> so a runaway generation can&apos;t blow the budget.
              </p>
            </div>
          </div>
        </section>

        {/* API vs subscription steer */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">API or subscription — which do you actually need?</h2>
            <p className="text-[#333333] mb-4">
              These are different products for different jobs. The <strong>{API_PLAN.name}</strong> is for software
              you build: apps, agents, automations, pipelines. You pay per token and control cost per request.
            </p>
            <p className="text-[#333333] mb-4">
              For your <em>own</em> daily Claude use — chatting, Claude Code in the terminal — a flat subscription
              wins almost every time. Metering your personal use through the API is usually more expensive and far
              more stressful.
            </p>
            <p className="text-[#333333]">
              Most builders run both. If you are weighing the consumer tiers, the{' '}
              <Link href="/claude-pro-vs-max-vs-api" className="text-[#1A1A1A] underline font-semibold">
                Claude Pro vs Max vs API comparison
              </Link>{' '}
              breaks down when each subscription wins, and the{' '}
              <Link href="/claude-code-pricing" className="text-[#1A1A1A] underline font-semibold">
                Claude Code pricing guide
              </Link>{' '}
              covers what running Claude Code costs on each plan.
            </p>
            <p className="text-[#333333] mt-5">
              Token rates differ by model, so the choice drives your bill. See{' '}
              <Link href="/claude-sonnet-vs-opus" className="text-[#1A1A1A] underline font-semibold">Sonnet vs Opus</Link>{' '}
              for the price-versus-capability trade-off, and the{' '}
              <Link href="/claude-context-window" className="text-[#1A1A1A] underline font-semibold">Claude context window guide</Link>{' '}
              for how prompt size affects input cost.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 text-center">Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-[#F9F9F9] border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="p-4 cursor-pointer hover:bg-gray-100 font-semibold text-gray-900 list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-gray-400 ml-4 text-xl flex-shrink-0">+</span>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Monetisation CTA */}
        <section className="py-16 bg-[#1A1A1A] text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">The cheapest token is the one you don&apos;t waste</h2>
            <p className="text-gray-300 mb-6">
              Most API bills are inflated by sloppy prompts — bloated system instructions, vague asks that force
              long outputs, retries from prompts that didn&apos;t work the first time. PromptWritingStudio teaches
              the prompt patterns that get the right answer on the first call, which is the same thing as cutting
              your token spend. Run the numbers with the calculators, then tighten the prompts.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
                className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
              >
                Join Now
              </a>
              <Link
                href="/calculators/claude-code-vs-cursor-cost"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition"
              >
                Claude Code vs Cursor cost
              </Link>
              <Link
                href="/claude-pro-vs-max-vs-api"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition"
              >
                Pro vs Max vs API
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
