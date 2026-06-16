import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import LastVerified from '../components/LastVerified'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'
import {
  CONSUMER_PLANS,
  TEAM_PLANS,
  API_PLAN,
  PLANS_META,
  CURRENT_MODELS,
  MODELS_META,
  getConsumerPlan,
  getCurrentModelByTier
} from '../lib/claude-data'

const COURSE_URL = 'https://courses.becomeawritertoday.com/purchase?product_id=6640678'

const pro = getConsumerPlan('pro')
const max5x = getConsumerPlan('max-5x')
const max20x = getConsumerPlan('max-20x')
const freePlan = getConsumerPlan('free')
const opus = getCurrentModelByTier('flagship')
const sonnet = getCurrentModelByTier('workhorse')

const faqs = [
  {
    question: "How much does Claude Code cost?",
    answer: `Claude Code itself is free to install via npm. To run it you need either a Claude subscription — Pro at $${pro.pricePerMonth}/month ($${pro.pricePerMonthAnnual}/mo billed annually), Max 5x at $${max5x.pricePerMonth}/month, or Max 20x at $${max20x.pricePerMonth}/month — or pay-as-you-go API billing charged per token. For one developer, a subscription is almost always cheaper than API. Pro covers light-to-moderate daily use; Max plans are for people running Claude Code for hours every day.`
  },
  {
    question: "Is Claude Code free?",
    answer: `The Claude Code CLI is free to download and install. But the AI behind it is not. There is no free tier that powers Claude Code — the Claude Free plan does not include it. You need a Pro ($${pro.pricePerMonth}/mo) or Max subscription, or API credits. The one genuinely free route is Anthropic's Claude for Open Source program, which qualifying open-source maintainers can apply to. For everyone else, the cheapest real entry point is one month of Pro.`
  },
  {
    question: "Is there a Claude Code discount or coupon?",
    answer: `Anthropic does not run public coupon codes for Claude Code. The only built-in discount is annual billing on Pro, which drops the effective price from $${pro.pricePerMonth}/mo to $${pro.pricePerMonthAnnual}/mo — about ${Math.round((1 - pro.pricePerMonthAnnual / pro.pricePerMonth) * 100)}% off. Max 5x and Max 20x are billed monthly only, with no annual discount. Students, startups, and open-source maintainers should check Anthropic's program pages: the Claude for Open Source program can mean free access for eligible projects. Be sceptical of third-party sites advertising "Claude Code coupons" — there is no legitimate code.`
  },
  {
    question: "Do Claude Code subscriptions have usage limits?",
    answer: "Yes. Subscription Claude Code runs on a rolling five-hour session limit plus weekly limits shared between Claude Code and Claude chat. On May 6, 2026, Anthropic doubled the five-hour limits for Pro, Max, Team, and Enterprise and removed the peak-hours reduction. On May 13 it raised weekly limits by 50% as a promotion running through July 13, 2026. Max plans carry two weekly limits — one across all models, one for Sonnet only. If you hit limits daily on Pro, that is the signal to move to Max 5x, not before."
  },
  {
    question: "Did Claude Code billing change on June 15, 2026?",
    answer: "Anthropic had planned to split autonomous usage (Agent SDK, headless `claude -p` runs, GitHub Actions, third-party apps) onto a separate monthly Agent SDK credit starting June 15, 2026. On that date Anthropic confirmed the change is no longer happening — autonomous and interactive usage continue to draw from the same subscription limits. Several pricing articles still describe the split as live; it is not. Always check Anthropic's own pages before budgeting around it."
  },
  {
    question: "When is the Claude Code API cheaper than a subscription?",
    answer: `The API is per-token: Claude ${sonnet.name} costs $${sonnet.inputPricePerMTok} per million input tokens and $${sonnet.outputPricePerMTok} per million output; Claude ${opus.name} costs $${opus.inputPricePerMTok} input and $${opus.outputPricePerMTok} output. For your own daily Claude Code use, those tokens add up fast — a few hours of agentic work can burn through more than the $${pro.pricePerMonth} Pro covers. The API only wins for light, predictable, or programmatic use (apps and automations you ship). For hands-on-keyboard developers, a subscription is the cheaper, more predictable choice.`
  },
  {
    question: "What does heavy daily Claude Code use actually cost?",
    answer: `Two honest reference points from building this site with Claude Code: a light day (small edits, a few file changes) lands around $2–$5 in API credits; a heavy refactoring day leaning on Opus can run $15–$40. Sustained at that pace, API spend overtakes the $${max5x.pricePerMonth} Max 5x subscription within a couple of weeks — which is exactly why daily users move to a flat-fee Max plan. The break-even is roughly: if you run Claude Code more than two focused hours most days, a subscription is cheaper.`
  },
  {
    question: "What is the cheapest way to start with Claude Code?",
    answer: `One month of Claude Pro at $${pro.pricePerMonth}. It includes Claude Code, the web and desktop apps, Projects, and access to Opus, Sonnet, and Haiku. It is cheaper than the equivalent API token spend for almost any first month of real use, and you can upgrade to Max instantly the first time you hit limits daily. Start on Pro, prove the workflow, then scale the plan to your actual usage — never the other way round.`
  }
]

const profiles = [
  {
    id: 'evaluating',
    label: 'Just evaluating',
    plan: 'Claude Pro',
    price: `$${pro.pricePerMonth}/mo`,
    cost: `~$${pro.pricePerMonthAnnual}/mo annual`,
    fit: [
      'You want to try Claude Code before committing',
      'A side project or occasional professional task',
      'You will not run it for hours every day yet',
      'You want a flat fee, no token-bill anxiety'
    ],
    verdict: `The default starting point. ${pro.bestFor}. Includes Claude Code, the apps, and all current models. Annual billing drops it to $${pro.pricePerMonthAnnual}/mo.`
  },
  {
    id: 'daily',
    label: 'Daily builder',
    plan: 'Claude Max 5x',
    price: `$${max5x.pricePerMonth}/mo`,
    cost: 'flat, no per-token billing',
    fit: [
      'You run Claude Code 2–5 focused hours a day',
      'You hit "usage limit reached" on Pro most days',
      'Multiple active projects, frequent context switches',
      'Opus is your default for hard reasoning'
    ],
    verdict: `${max5x.usageLimit}. ${max5x.bestFor}. This is where API spend would overtake the subscription — move here once Pro limits are a daily annoyance, not before.`
  },
  {
    id: 'agentic',
    label: 'Agentic operator',
    plan: 'Claude Max 20x',
    price: `$${max20x.pricePerMonth}/mo`,
    cost: 'flat, highest consumer ceiling',
    fit: [
      'You run Claude Code in multiple terminals at once',
      'Heavy sub-agents, background tasks, long sessions',
      'Opus is your default model all day',
      'You bill your time — $200 pays for itself fast'
    ],
    verdict: `${max20x.usageLimit}. ${max20x.bestFor}. Overkill for solo chat use; essential if you run Claude like a team of five.`
  },
  {
    id: 'builder',
    label: 'App / automation builder',
    plan: 'Pay-as-you-go API',
    price: 'Per token',
    cost: `${sonnet.name}: $${sonnet.inputPricePerMTok}/$${sonnet.outputPricePerMTok} per MTok`,
    fit: [
      "You're shipping an app, agent, or automation",
      'Volume is variable, predictable, or measurable',
      'You want per-request cost control',
      "You're not a heavy Claude user yourself"
    ],
    verdict: 'The API is for what you ship, not your own daily Claude Code use. Pair it with a Pro or Max subscription for your hands-on work.'
  },
  {
    id: 'team',
    label: 'Team (5+ people)',
    plan: 'Claude Team',
    price: `$${TEAM_PLANS[0].pricePerSeatPerMonth}–${TEAM_PLANS[1].pricePerSeatPerMonth}/seat/mo`,
    cost: `min ${TEAM_PLANS[0].minSeats} seats`,
    fit: [
      'You have 5+ people who need Claude',
      'You want SSO, central billing, admin controls',
      'Engineers running Claude Code on production work',
      'Shared workflows beat five personal Pro accounts'
    ],
    verdict: `Standard seats start at $${TEAM_PLANS[0].pricePerSeatPerMonth}/mo; Premium seats at $${TEAM_PLANS[1].pricePerSeatPerMonth}/mo carry the heavier Claude Code usage. Note: Claude Code ships with Premium seats — confirm seat type before assuming terminal access.`
  }
]

const article = generateArticleSchema({
  title: 'Claude Code Pricing (2026): Plans, API Costs, Free Tier & Discounts',
  description: `What Claude Code actually costs in 2026. Pro at $${pro.pricePerMonth}, Max at $${max5x.pricePerMonth}/$${max20x.pricePerMonth}, pay-as-you-go API token rates, the truth about the free tier and discounts, and which plan fits your real usage.`,
  slug: 'claude-code-pricing',
  datePublished: '2026-06-16'
})

export default function ClaudeCodePricing() {
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <Head>
        <title>Claude Code Pricing (2026): Plans, API Costs, Free Tier &amp; Discounts | PromptWritingStudio</title>
        <meta name="description" content={`Claude Code pricing in 2026: Pro at $${pro.pricePerMonth}, Max at $${max5x.pricePerMonth} and $${max20x.pricePerMonth}, API token costs, the real free-tier and discount situation, and which plan fits your usage. Prices verified ${PLANS_META.lastVerified}.`} />
        <meta name="keywords" content="claude code pricing, claude code cost, claude code free, claude code discount, claude code api pricing, claude code plans, how much does claude code cost" />
        <meta property="og:title" content="Claude Code Pricing (2026): Plans, API Costs, Free Tier & Discounts" />
        <meta property="og:description" content={`What Claude Code actually costs: Pro $${pro.pricePerMonth}, Max $${max5x.pricePerMonth}/$${max20x.pricePerMonth}, API per-token rates, free-tier truth, and the plan that fits your usage.`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-code-pricing" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-pricing" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        {/* Hero */}
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">Claude · Pricing</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Claude Code Pricing: What It Actually Costs in 2026
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Plans, API token costs, the truth about the free tier and discounts, and which option is cheapest for your real usage — with numbers verified against Anthropic, not guessed.
            </p>
            <LastVerified date={PLANS_META.lastVerified} source={PLANS_META.source} className="mt-4 text-gray-300" />
          </div>
        </section>

        {/* Direct answer block - AEO */}
        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                Claude Code is <strong>free to install</strong> but needs a paid plan to run. The cheapest real option is <strong>Claude Pro at ${pro.pricePerMonth}/mo</strong> (${pro.pricePerMonthAnnual}/mo annual). Daily users move to <strong>Max 5x at ${max5x.pricePerMonth}/mo</strong>; agentic operators to <strong>Max 20x at ${max20x.pricePerMonth}/mo</strong>. The <strong>pay-as-you-go API</strong> ({sonnet.name}: ${sonnet.inputPricePerMTok}/${sonnet.outputPricePerMTok} per million tokens) only wins for apps you ship, not your own use. There is <strong>no free tier</strong> for Claude Code and <strong>no public coupon</strong> — the only built-in discount is annual Pro billing.
              </p>
            </div>
          </div>
        </section>

        {/* Plan table from data */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3 text-center">Claude Code plans and prices at a glance</h2>
            <p className="text-[#333333] mb-8 text-center max-w-2xl mx-auto">Every plan that includes or powers Claude Code, with the price you actually pay. Subscriptions are flat monthly fees; the API is per token.</p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
                <thead className="bg-[#1A1A1A] text-white">
                  <tr>
                    <th className="p-3 text-left">Plan</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Usage vs Free</th>
                    <th className="p-3 text-left">Includes Claude Code</th>
                    <th className="p-3 text-left">Best for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {CONSUMER_PLANS.map(p => (
                    <tr key={p.id}>
                      <td className="p-3 font-semibold text-[#1A1A1A]">{p.name}</td>
                      <td className="p-3 text-[#333333]">
                        {p.pricePerMonth === 0 ? 'Free' : `$${p.pricePerMonth}/mo`}
                        {p.pricePerMonthAnnual !== p.pricePerMonth && p.pricePerMonthAnnual > 0 && (
                          <span className="block text-xs text-gray-500">${p.pricePerMonthAnnual}/mo annual</span>
                        )}
                      </td>
                      <td className="p-3 text-[#333333]">{p.usageLimit}</td>
                      <td className="p-3 text-[#333333]">{p.includesClaudeCode ? 'Yes' : 'No'}</td>
                      <td className="p-3 text-[#333333]">{p.bestFor}</td>
                    </tr>
                  ))}
                  {TEAM_PLANS.map(p => (
                    <tr key={p.id} className="bg-gray-50">
                      <td className="p-3 font-semibold text-[#1A1A1A]">{p.name}</td>
                      <td className="p-3 text-[#333333]">
                        ${p.pricePerSeatPerMonth}/seat/mo
                        {p.pricePerSeatPerMonthAnnual && p.pricePerSeatPerMonthAnnual < p.pricePerSeatPerMonth && (
                          <span className="block text-xs text-gray-500">${p.pricePerSeatPerMonthAnnual} annual</span>
                        )}
                      </td>
                      <td className="p-3 text-[#333333]">{p.usageLimit}</td>
                      <td className="p-3 text-[#333333]">Yes</td>
                      <td className="p-3 text-[#333333]">{p.bestFor}</td>
                    </tr>
                  ))}
                  <tr className="bg-yellow-50">
                    <td className="p-3 font-semibold text-[#1A1A1A]">{API_PLAN.name}</td>
                    <td className="p-3 text-[#333333]">Per-token</td>
                    <td className="p-3 text-[#333333]">Unmetered (pay per call)</td>
                    <td className="p-3 text-[#333333]">Via API only</td>
                    <td className="p-3 text-[#333333]">Apps and automations you ship</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">Subscription prices verified against {PLANS_META.source.replace('https://', '')} on {PLANS_META.lastVerified}.</p>
          </div>
        </section>

        {/* API token pricing from data */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">Claude Code API pricing (per token)</h2>
            <p className="text-[#333333] mb-8">
              If you run Claude Code on API billing instead of a subscription, you pay for every token — input (what Claude reads) and output (what it writes). These are the current model rates Claude Code can use.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
                <thead className="bg-[#1A1A1A] text-white">
                  <tr>
                    <th className="p-3 text-left">Model</th>
                    <th className="p-3 text-left">Input / million tokens</th>
                    <th className="p-3 text-left">Output / million tokens</th>
                    <th className="p-3 text-left">Context</th>
                    <th className="p-3 text-left">Role in Claude Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {CURRENT_MODELS.map(m => (
                    <tr key={m.id}>
                      <td className="p-3 font-semibold text-[#1A1A1A]">{m.name}</td>
                      <td className="p-3 text-[#333333]">${m.inputPricePerMTok}</td>
                      <td className="p-3 text-[#333333]">${m.outputPricePerMTok}</td>
                      <td className="p-3 text-[#333333]">{(m.contextTokens / 1000).toLocaleString()}K</td>
                      <td className="p-3 text-[#333333]">{m.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">Model rates verified against {MODELS_META.source.replace('https://', '')} on {MODELS_META.lastVerified}.</p>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <h3 className="font-bold text-[#1A1A1A] mb-2">Worked example: what a single task costs</h3>
              <p className="text-[#333333] mb-3">
                Say Claude Code reads 50,000 tokens of your codebase and writes 8,000 tokens of edits and explanation using {sonnet.name}:
              </p>
              <ul className="space-y-1 text-[#333333] text-sm">
                <li>Input: 50,000 tokens &times; ${sonnet.inputPricePerMTok}/M = <strong>${((50000 / 1000000) * sonnet.inputPricePerMTok).toFixed(3)}</strong></li>
                <li>Output: 8,000 tokens &times; ${sonnet.outputPricePerMTok}/M = <strong>${((8000 / 1000000) * sonnet.outputPricePerMTok).toFixed(3)}</strong></li>
                <li>Total for that one task: <strong>${(((50000 / 1000000) * sonnet.inputPricePerMTok) + ((8000 / 1000000) * sonnet.outputPricePerMTok)).toFixed(3)}</strong></li>
              </ul>
              <p className="text-[#333333] text-sm mt-3">
                Cheap per task — but a real session runs dozens of those, re-reading context each turn, and Opus (${opus.inputPricePerMTok}/${opus.outputPricePerMTok} per million) costs more. That is why a few hours of agentic work can pass the ${pro.pricePerMonth} Pro covers. Run the exact numbers on your mix with the <Link href="/calculators/claude-prompt-cost" className="text-[#1A1A1A] underline font-semibold hover:no-underline">Claude API cost calculator</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Is it free / free tier */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Is Claude Code free? The honest answer</h2>
            <p className="text-[#333333] mb-4">
              The Claude Code CLI is free to download and install. The AI behind it is not. There is no free tier that powers Claude Code — the <strong>Claude Free plan does not include it</strong>. The free plan covers web and mobile chat with daily message caps, but not the terminal tool.
            </p>
            <p className="text-[#333333] mb-4">
              That leaves three ways to actually run it:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-[#333333]">
                <span className="text-[#FFDE59] font-bold mt-0.5">1.</span>
                <span><strong>A subscription</strong> — Pro (${pro.pricePerMonth}/mo) and both Max tiers include Claude Code. This is the cheapest route for most people.</span>
              </li>
              <li className="flex items-start gap-2 text-[#333333]">
                <span className="text-[#FFDE59] font-bold mt-0.5">2.</span>
                <span><strong>API billing</strong> — pay per token with no monthly commitment. Flexible, but it adds up fast for hands-on use.</span>
              </li>
              <li className="flex items-start gap-2 text-[#333333]">
                <span className="text-[#FFDE59] font-bold mt-0.5">3.</span>
                <span><strong>Claude for Open Source</strong> — Anthropic's program that can grant qualifying open-source maintainers free access. The one genuinely free path, and only for eligible projects.</span>
              </li>
            </ul>
            <p className="text-[#333333]">
              If you just want to try it, treat one month of Pro as your "trial." It is cheaper than equivalent API spend for almost any first month, and you can cancel or upgrade instantly.
            </p>
          </div>
        </section>

        {/* Discounts / coupons */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Claude Code discounts and coupons</h2>
            <p className="text-[#333333] mb-4">
              Anthropic does not run public coupon codes for Claude Code. If a site is advertising a "Claude Code coupon," treat it as a red flag — there is no legitimate code. What does exist:
            </p>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Annual billing on Pro</h3>
                <p className="text-[#333333]">The only built-in discount. Paying annually drops Pro from ${pro.pricePerMonth}/mo to ${pro.pricePerMonthAnnual}/mo — about {Math.round((1 - pro.pricePerMonthAnnual / pro.pricePerMonth) * 100)}% off. Max 5x and Max 20x are monthly-only, with no annual discount.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Claude for Open Source</h3>
                <p className="text-[#333333]">Free access for qualifying open-source maintainers. Effectively a 100% discount if your project is eligible — apply through Anthropic's program pages.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Student, startup, and team programs</h3>
                <p className="text-[#333333]">Anthropic periodically runs education and startup programs and annual Team pricing (${TEAM_PLANS[0].pricePerSeatPerMonthAnnual}/seat vs ${TEAM_PLANS[0].pricePerSeatPerMonth} monthly on Standard). These change — check Anthropic's current offers rather than relying on a third-party list.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Which plan fits which profile */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Which Claude Code plan fits your usage?</h2>
            <p className="text-[#333333] mb-8">The right plan is the cheapest one that covers your actual usage. Find the profile that matches how you work, not how you hope to work.</p>
            <div className="space-y-6">
              {profiles.map(p => (
                <div key={p.id} className="bg-[#F9F9F9] rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-[#1A1A1A] text-white px-6 py-4 flex flex-wrap items-baseline gap-3">
                    <span className="text-xs uppercase tracking-wide text-gray-400">{p.label}</span>
                    <h3 className="text-xl font-bold">{p.plan}</h3>
                    <span className="text-[#FFDE59] font-semibold">{p.price}</span>
                    <span className="text-sm text-gray-400 ml-auto">{p.cost}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-3">This fits you if:</p>
                    <ul className="space-y-2 mb-5">
                      {p.fit.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#333333]">
                          <span className="text-[#FFDE59] font-bold mt-0.5">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-[#FFDE59]/10 border-l-4 border-[#FFDE59] p-4 rounded-r">
                      <p className="text-sm text-[#1A1A1A]"><strong>Verdict:</strong> {p.verdict}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/calculators/claude-plan-picker" className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">
                Run the plan picker on your usage →
              </Link>
            </div>
          </div>
        </section>

        {/* Usage limits / June change accuracy */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Usage limits and the June 2026 billing change</h2>
            <p className="text-[#333333] mb-4">
              Price is only half the story — usage caps decide whether a plan actually covers you. Subscription Claude Code runs on a <strong>rolling five-hour session limit</strong> plus <strong>weekly limits</strong> shared between Claude Code and Claude chat. Two recent changes matter:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-white p-5 rounded-lg border-l-4 border-green-400">
                <h3 className="font-bold text-[#1A1A1A] mb-1">May 6, 2026 — five-hour limits doubled</h3>
                <p className="text-[#333333]">Anthropic doubled Claude Code's five-hour rate limits for Pro, Max, Team, and seat-based Enterprise, and removed the peak-hours reduction. More usable headroom on the same prices.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border-l-4 border-green-400">
                <h3 className="font-bold text-[#1A1A1A] mb-1">May 13, 2026 — weekly limits up 50% (through July 13)</h3>
                <p className="text-[#333333]">A promotion lifting weekly limits by 50%, running through July 13, 2026. Worth factoring in if you are deciding between Pro and Max right now.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border-l-4 border-red-400">
                <h3 className="font-bold text-[#1A1A1A] mb-1">June 15, 2026 — the autonomous-usage split that did NOT happen</h3>
                <p className="text-[#333333]">Anthropic had planned to move autonomous usage (Agent SDK, headless <code className="bg-gray-100 px-1 rounded text-sm">claude -p</code> runs, GitHub Actions, third-party apps) onto a separate monthly credit. On June 15 it confirmed the change is <strong>no longer happening</strong> — autonomous and interactive usage still share the same subscription limits. Many pricing articles still describe the split as live. It is not.</p>
              </div>
            </div>
            <p className="text-sm text-[#666666]">
              Limits are token-weighted, so Anthropic publishes relative figures ("5x Pro", "20x Pro") rather than hard message caps. The practical rule stands: if you hit limits daily on Pro, upgrade to Max 5x.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 text-center">Claude Code pricing FAQ</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-[#F9F9F9] border border-gray-200 rounded-lg overflow-hidden">
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

        {/* Monetisation CTA + internal links */}
        <section className="py-16 bg-[#1A1A1A] text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">Make every Claude Code dollar work harder</h2>
            <p className="text-gray-300 mb-6">
              The fastest way to cut your Claude Code bill is not a cheaper plan — it is better prompts that get the result in one pass instead of five. Our prompt-writing course teaches the exact patterns that make agentic tools land the task first time, so you burn less of your session limit on retries.
            </p>
            <a href={COURSE_URL} className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition mb-8">
              Join Now
            </a>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link href="/calculators/claude-plan-picker" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Claude plan picker</Link>
              <Link href="/claude-pro-vs-max-vs-api" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Pro vs Max vs API</Link>
              <Link href="/anthropic-api-pricing" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Anthropic API pricing</Link>
              <Link href="/claude-code-guide" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Claude Code guide</Link>
              <Link href="/calculators/claude-code-vs-cursor-cost" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Claude Code vs Cursor cost</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
