import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import LastVerified from '../../components/LastVerified'
import { generateFAQSchema } from '../../lib/schemaGenerator'
import { CONSUMER_PLANS, getCurrentModelByTier, MODELS_META, PLANS_META } from '../../lib/claude-data'

// Rough token throughput per hour of active Claude use (conservative estimates
// from real Claude Code sessions). Used to estimate the API-equivalent cost
// of a given usage profile so the plan picker can compare against subscriptions.
const THROUGHPUT = {
  flagship:   { inputPerHour: 80000,  outputPerHour: 15000 },
  workhorse:  { inputPerHour: 120000, outputPerHour: 18000 },
  fast:       { inputPerHour: 150000, outputPerHour: 20000 }
}

const USAGE_PROFILES = {
  chat: { label: 'Chat / writing in the web app', flagship: 0.15, workhorse: 0.75, fast: 0.10 },
  code: { label: 'Claude Code (balanced)', flagship: 0.10, workhorse: 0.85, fast: 0.05 },
  code_heavy: { label: 'Claude Code (Opus-heavy agentic)', flagship: 0.40, workhorse: 0.55, fast: 0.05 },
  mixed: { label: 'Mixed — chat + Claude Code', flagship: 0.15, workhorse: 0.75, fast: 0.10 }
}

// Rough Anthropic-stated usage relative to Free. Pro covers ~5x Free's token
// budget; Max 5x covers 25x, Max 20x covers 100x. Free's daily budget is
// roughly equivalent to ~30 minutes of workhorse-model use. Everything beyond
// the plan's budget is a miss (you hit usage limits).
const PLAN_DAILY_HOURS_BUDGET = {
  free: 0.5,
  pro: 2.5,
  'max-5x': 12,
  'max-20x': 48
}

const faqs = [
  {
    question: "How does this calculator decide which plan to recommend?",
    answer: "It takes your hours per day × days per month, applies the model mix you picked, and estimates the API-equivalent token spend. It then compares that against each subscription's price AND against its stated usage budget. The cheapest plan that can actually handle your volume wins. If the API is cheaper than every subscription, you'll see 'API' as the recommendation."
  },
  {
    question: "What does 'API-equivalent cost' mean?",
    answer: "It's the price you'd pay if you ran the same workload through the Anthropic API instead of a subscription. We calculate it from current Claude Opus 4.7, Sonnet 4.6, and Haiku 4.5 per-token rates. The subscription is only a good deal if the flat price is lower than your API-equivalent spend — otherwise you're subsidising Anthropic."
  },
  {
    question: "Are Anthropic's usage limits really 5x / 25x / 100x?",
    answer: "Anthropic publishes relative multiples rather than hard message caps — 'Pro gets roughly 5x Free usage', 'Max 5x gets 5x Pro', 'Max 20x gets 20x Pro'. Actual limits are token-weighted, so a minute of Opus counts more than a minute of Haiku. The calculator approximates this with equivalent 'hours of workhorse-model use per day' as the budget unit."
  },
  {
    question: "What if I need more than Max 20x?",
    answer: "You're either running a small business or you should be. At 20x Pro's daily budget you're in territory where API billing for your applications (paired with Pro or Max for personal use) often makes more sense than pushing the consumer tier harder. If you have a team, Claude Team at $25-125/seat adds admin features that solo Max doesn't have."
  },
  {
    question: "Does this include Claude Code usage?",
    answer: "Yes. Claude Code runs through the same subscription quota as the web app when you sign in with a Pro or Max account. The calculator's 'Claude Code' usage profiles assume heavier token burn per hour than web chat because Claude Code typically sends full file contents into context."
  },
  {
    question: "Should I pay monthly or annual?",
    answer: "Annual saves about 15% on Pro ($17/mo vs $20/mo). Max is the same either way. If you've been using Claude for more than two months and don't see yourself stopping, annual is a no-brainer on Pro. If you're still evaluating, stay monthly."
  }
]

export default function ClaudePlanPicker() {
  const [hoursPerDay, setHoursPerDay] = useState(2)
  const [daysPerMonth, setDaysPerMonth] = useState(22)
  const [profile, setProfile] = useState('code')

  const result = useMemo(() => {
    const p = USAGE_PROFILES[profile]
    const hoursPerMonth = hoursPerDay * daysPerMonth

    const flagship = getCurrentModelByTier('flagship')
    const workhorse = getCurrentModelByTier('workhorse')
    const fast = getCurrentModelByTier('fast')

    const models = [
      { tier: 'flagship', share: p.flagship, m: flagship, t: THROUGHPUT.flagship },
      { tier: 'workhorse', share: p.workhorse, m: workhorse, t: THROUGHPUT.workhorse },
      { tier: 'fast', share: p.fast, m: fast, t: THROUGHPUT.fast }
    ]

    let apiCost = 0
    models.forEach(({ share, m, t }) => {
      const h = hoursPerMonth * share
      const inTok = h * t.inputPerHour
      const outTok = h * t.outputPerHour
      apiCost += (inTok / 1_000_000) * m.inputPricePerMTok + (outTok / 1_000_000) * m.outputPricePerMTok
    })

    const budgetFitsPlan = (planId) => hoursPerDay <= PLAN_DAILY_HOURS_BUDGET[planId]

    const options = CONSUMER_PLANS.map(plan => {
      const monthlyPrice = plan.pricePerMonth
      const fits = budgetFitsPlan(plan.id)
      return {
        id: plan.id,
        name: plan.name,
        monthlyPrice,
        fits,
        dailyBudget: PLAN_DAILY_HOURS_BUDGET[plan.id],
        savings: apiCost - monthlyPrice,
        features: plan.features,
        usageLimit: plan.usageLimit,
        includesClaudeCode: plan.includesClaudeCode
      }
    })

    // Add API as an option
    options.push({
      id: 'api',
      name: 'Pay-as-you-go API',
      monthlyPrice: apiCost,
      fits: true,
      dailyBudget: null,
      savings: 0,
      features: ['Pure usage-based', 'Best for applications you ship', 'Fine-grained cost control'],
      usageLimit: 'Unlimited (you pay per token)',
      includesClaudeCode: true
    })

    // Recommendation logic: cheapest option that fits daily budget, with API as
    // fallback. Prefer a subscription over API if the subscription is cheaper
    // AND has enough budget.
    const fittingSubscriptions = options.filter(o => o.id !== 'api' && o.fits && o.monthlyPrice > 0)
    fittingSubscriptions.sort((a, b) => a.monthlyPrice - b.monthlyPrice)

    let recommended = 'api'
    if (fittingSubscriptions.length > 0) {
      const cheapestSub = fittingSubscriptions[0]
      recommended = cheapestSub.monthlyPrice < apiCost ? cheapestSub.id : 'api'
    } else {
      // Nothing fits — recommend highest-capacity option
      recommended = hoursPerDay <= 12 ? 'max-5x' : 'max-20x'
    }

    return { apiCost, options, recommended, hoursPerMonth }
  }, [hoursPerDay, daysPerMonth, profile])

  const faqSchema = generateFAQSchema(faqs)
  const fmt = (n) => `$${n.toFixed(2)}`

  return (
    <>
      <Head>
        <title>Claude Plan Picker: Pro, Max 5x, Max 20x, or API? (2026) | PromptWritingStudio</title>
        <meta name="description" content="Interactive calculator — set your hours per day and model mix, get the cheapest Claude plan for your workload. Covers Pro, Max 5x, Max 20x, and pay-as-you-go API." />
        <link rel="canonical" href="https://promptwritingstudio.com/calculators/claude-plan-picker" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Claude Plan Picker</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Set how you actually use Claude. Get the cheapest plan that can handle it — Pro, Max 5x, Max 20x, or pay-as-you-go API.
            </p>
            <LastVerified date={PLANS_META.lastVerified} source={PLANS_META.source} className="mt-4 text-gray-300" />
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Hours of Claude use per day</label>
                  <input type="number" step="0.5" value={hoursPerDay} onChange={e => setHoursPerDay(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Days per month</label>
                  <input type="number" value={daysPerMonth} onChange={e => setDaysPerMonth(Math.max(0, Number(e.target.value) || 0))} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Usage profile</label>
                  <select value={profile} onChange={e => setProfile(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#FFDE59]">
                    {Object.entries(USAGE_PROFILES).map(([k, p]) => (
                      <option key={k} value={k}>{p.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#1A1A1A] text-white rounded-lg p-6 md:p-8">
              <p className="text-sm uppercase tracking-wide text-[#FFDE59] font-semibold mb-2">Recommended plan</p>
              <h2 className="text-3xl font-bold mb-2">{result.options.find(o => o.id === result.recommended).name}</h2>
              <p className="text-gray-300 mb-4">
                Based on {result.hoursPerMonth.toFixed(0)} hours/month of {USAGE_PROFILES[profile].label.toLowerCase()} use.
                API-equivalent cost would be <strong className="text-white">{fmt(result.apiCost)}/mo</strong>.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {result.options.map(opt => {
                const isRecommended = opt.id === result.recommended
                return (
                  <div key={opt.id} className={`bg-white p-5 rounded-lg border-2 ${isRecommended ? 'border-[#FFDE59]' : 'border-gray-200'}`}>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-[#1A1A1A]">{opt.name}</h3>
                        {isRecommended && <span className="text-xs font-bold bg-[#FFDE59] text-[#1A1A1A] px-2 py-0.5 rounded-full">Best fit</span>}
                        {!opt.fits && opt.id !== 'api' && <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Usage over limit</span>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl font-bold text-[#1A1A1A]">{fmt(opt.monthlyPrice)}</p>
                        <p className="text-xs text-gray-500">{opt.id === 'api' ? 'est. monthly' : '/month'}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{opt.usageLimit}</p>
                    {opt.id !== 'api' && opt.savings > 0 && opt.fits && (
                      <p className="text-xs text-green-700 mt-1">Saves ~{fmt(opt.savings)}/mo vs API-equivalent</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">How to read the recommendation</h2>
            <div className="space-y-4">
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">If "Pro" wins</h3>
                <p className="text-[#333333]">You're a typical individual user. $20/mo covers your Claude chat and occasional Claude Code work without usage anxiety. Annual at $17/mo saves another 15%.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">If "Max 5x" wins</h3>
                <p className="text-[#333333]">You're a daily Claude Code user running 2-5 hours/day. $100/mo is still a fraction of your hourly rate; the usage headroom prevents "limit reached" disruptions.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">If "Max 20x" wins</h3>
                <p className="text-[#333333]">You're running agentic workflows — parallel sub-agents, long-running background tasks, multiple Claude Code sessions. $200/mo is serious territory; make sure you're actually using the capacity.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">If "API" wins</h3>
                <p className="text-[#333333]">Your usage is low enough that pay-per-token beats a flat subscription. Usually means less than ~30 minutes of active Claude use per day — in which case the Free tier might even work for personal chat, with API billing for any automation.</p>
              </div>
            </div>
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
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Read the full comparison</h2>
            <p className="text-gray-300 mb-6">The companion article walks through Pro, Max, API, and Team scenarios with verdicts for each — including the three most common mistakes people make when picking.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/claude-pro-vs-max-vs-api" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Claude Pro vs Max vs API</Link>
              <Link href="/calculators/claude-code-vs-cursor-cost" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Claude Code vs Cursor cost</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
