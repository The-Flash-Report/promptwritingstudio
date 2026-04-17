import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import LastVerified from '../components/LastVerified'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'
import { CONSUMER_PLANS, TEAM_PLANS, API_PLAN, PLANS_META } from '../lib/claude-data'

const faqs = [
  {
    question: "What's the difference between Claude Pro, Max, and the API?",
    answer: "Pro ($20/mo) and Max ($100 or $200/mo) are consumer subscriptions — flat monthly prices with usage caps. They include Claude Code, Projects, Artifacts, and the web/desktop/mobile apps. The API is pay-as-you-go by token for developers building applications. For one person using Claude through the chat or terminal, a subscription is almost always cheaper. For programmatic use or multi-user apps, the API wins."
  },
  {
    question: "Is Claude Max worth it over Pro?",
    answer: "Only if you regularly hit Pro's usage limits. Pro gives you roughly 5x the Free tier. Max at $100/mo is 5x Pro (so 25x Free). Max at $200/mo is 20x Pro (100x Free). If you run agentic Claude Code sessions through the day, back-to-back long conversations, or parallel sub-agents, Max earns its premium. If you occasionally hit 'usage limit reached' but not daily, stay on Pro."
  },
  {
    question: "Can I use Claude Code without a paid plan?",
    answer: "Claude Code requires at least a Pro or Max subscription — or API billing. There is no free tier for Claude Code. If you're evaluating it, a month of Pro is cheaper than equivalent API token spend for most workflows."
  },
  {
    question: "When does the API become cheaper than Max?",
    answer: "The API is cheaper than Max's $200 tier only if you use Claude lightly or predictably. A back-of-envelope: Max 20x covers roughly the equivalent of $300-500/mo in API tokens for a Sonnet-heavy workflow. For pure consumer use (chat, Claude Code) you'd need to spend less than ~2 hours/day of active Claude time for API to win. The calculator on this page runs the numbers on your actual mix."
  },
  {
    question: "What about Claude for Teams and Enterprise?",
    answer: "Team (from $25/seat/mo, minimum 5 seats) adds SSO, central billing, and admin controls. Team Premium ($125/seat/mo) is for heavy users — think engineering teams running Claude Code on production work daily. Enterprise is usage-billed at API rates with compliance features (SCIM, audit logs, HIPAA-ready). Jump to Team when a solo Pro or Max subscription is no longer covering shared workflows."
  },
  {
    question: "Does Claude Pro include API access?",
    answer: "No. Pro, Max, and Team subscriptions cover consumer products only — Claude.ai web, desktop, mobile, and Claude Code. API access is billed separately through console.anthropic.com. Many developers have both: Pro or Max for their own Claude use, plus API billing for apps they build."
  },
  {
    question: "Can I switch between plans?",
    answer: "Yes, upgrades and downgrades are instant through the Claude.ai settings. Pro-rated credits apply to upgrades within the same billing cycle. If you're uncertain, start on Pro and upgrade to Max only when you regularly hit usage caps — not 'just in case'."
  },
  {
    question: "What usage limits actually apply on Pro and Max?",
    answer: "Anthropic publishes relative limits ('~5x Free', '5x Pro', '20x Pro') rather than hard message caps, because the limits are token-weighted — longer conversations and Opus calls count more than short Haiku exchanges. In practice, Pro handles heavy individual use comfortably. Max 5x is for people running Claude Code multiple hours daily. Max 20x is for agentic workflows with parallel sub-agents and background tasks."
  }
]

const scenarios = [
  {
    id: 'pro',
    plan: 'Pro',
    price: '$20/mo',
    profile: 'Writer / solo dev / casual builder',
    fit: [
      'You use Claude on the web or desktop most days',
      'Claude Code for a side project or occasional pro work',
      "You don't hit usage limits more than once a week",
      'You want to try Claude Code without thinking about token bills'
    ],
    verdict: 'The default for one person who is not using Claude as their primary daily tool for 6+ hours.'
  },
  {
    id: 'max5x',
    plan: 'Max 5x',
    price: '$100/mo',
    profile: 'Daily Claude Code user, multi-project solo operator',
    fit: [
      'You run Claude Code 2-5 hours a day',
      'Multiple active projects, frequent context switches',
      'You regularly hit "usage limit reached" on Pro',
      'You use Opus for hard reasoning most days'
    ],
    verdict: 'The sweet spot for independent developers, technical writers, solo founders — serious daily use without the Max 20x premium.'
  },
  {
    id: 'max20x',
    plan: 'Max 20x',
    price: '$200/mo',
    profile: 'Agentic workflows, parallel sub-agents, background Claude Code',
    fit: [
      'You run Claude Code in multiple terminals simultaneously',
      'Heavy use of sub-agents, background tasks, long-running sessions',
      'Opus is your default for complex work',
      'You bill your time — a $200 subscription easily pays for itself'
    ],
    verdict: 'For people running Claude like a team of five. Overkill for solo chat use; essential for true agentic operators.'
  },
  {
    id: 'api',
    plan: 'API',
    price: 'Per-token',
    profile: 'App builder, low-volume or predictable usage',
    fit: [
      'You\'re building an application (chatbot, agent, automation)',
      'Your volume is variable or measurable',
      'You want fine-grained cost control per request',
      "You're not a heavy Claude user yourself (Pro handles that)"
    ],
    verdict: 'The API is for what you ship, not for your own daily Claude use. Pair with Pro or Max for personal work.'
  },
  {
    id: 'team',
    plan: 'Team',
    price: '$25-125/seat/mo',
    profile: 'Small-to-mid team (5-50 seats), shared workflows',
    fit: [
      "You have 5+ people who need Claude",
      'You want SSO, central billing, admin controls',
      'Shared Projects, collaboration on Artifacts',
      'Heavy individual use → Premium seats for engineers'
    ],
    verdict: 'Jump here once you have 5+ people and at least one of them needs admin controls, SSO, or central billing.'
  }
]

const article = generateArticleSchema({
  title: 'Claude Pro vs Max vs API: Which Plan for Your Workload (2026)',
  description: 'An honest comparison of Claude Pro ($20), Max ($100/$200), API pay-as-you-go, and Team plans. When each one wins, with a calculator that runs the numbers on your actual usage.',
  slug: 'claude-pro-vs-max-vs-api',
  datePublished: '2026-04-17'
})

export default function ClaudeProVsMaxVsApi() {
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <Head>
        <title>Claude Pro vs Max vs API: Which Plan for Your Workload (2026) | PromptWritingStudio</title>
        <meta name="description" content="Claude Pro at $20, Max at $100 or $200, pay-as-you-go API, and Team plans compared. Honest verdicts on when each wins, plus an interactive calculator." />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-pro-vs-max-vs-api" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">Claude · Plans</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Claude Pro vs Max vs API: Which Plan for Your Workload
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              An honest comparison — Pro at $20, Max at $100 or $200, pay-as-you-go API, and Team plans — with the use-cases each one wins.
            </p>
            <LastVerified date={PLANS_META.lastVerified} source={PLANS_META.source} className="mt-4 text-gray-300" />
          </div>
        </section>

        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                For one person using Claude daily: <strong>Pro ($20/mo)</strong> is the default. Upgrade to <strong>Max 5x ($100/mo)</strong> when you hit usage limits daily. Jump to <strong>Max 20x ($200/mo)</strong> only for agentic workflows with parallel Claude Code sessions. The <strong>API</strong> is for applications you ship, not for your own Claude use. <strong>Team</strong> plans (from $25/seat) make sense at 5+ people with shared workflows.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-8 text-center">Plan comparison at a glance</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
                <thead className="bg-[#1A1A1A] text-white">
                  <tr>
                    <th className="p-3 text-left">Plan</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Usage vs Free</th>
                    <th className="p-3 text-left">Claude Code</th>
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
                    <td className="p-3 text-[#333333]">Unmetered (you pay per call)</td>
                    <td className="p-3 text-[#333333]">Via API only</td>
                    <td className="p-3 text-[#333333]">Apps you ship, programmatic use</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">Prices verified against claude.com/pricing on {PLANS_META.lastVerified}.</p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Which plan fits which person?</h2>
            <p className="text-[#333333] mb-8">Skip to the scenario that matches how you actually use Claude.</p>
            <div className="space-y-6">
              {scenarios.map(s => (
                <div key={s.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-[#1A1A1A] text-white px-6 py-4 flex flex-wrap items-baseline gap-3">
                    <h3 className="text-xl font-bold">{s.plan}</h3>
                    <span className="text-[#FFDE59] font-semibold">{s.price}</span>
                    <span className="text-sm text-gray-400 ml-auto">{s.profile}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-3">You fit this plan if:</p>
                    <ul className="space-y-2 mb-5">
                      {s.fit.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#333333]">
                          <span className="text-[#FFDE59] font-bold mt-0.5">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-[#FFDE59]/10 border-l-4 border-[#FFDE59] p-4 rounded-r">
                      <p className="text-sm text-[#1A1A1A]"><strong>Verdict:</strong> {s.verdict}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Three common mistakes</h2>
            <div className="space-y-4">
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-red-400">
                <h3 className="font-bold text-[#1A1A1A] mb-1">1. Jumping to Max "just in case"</h3>
                <p className="text-[#333333]">Max is $100 or $200/mo. If you haven't hit Pro's limits more than a few times, you're burning $80-180 for capacity you won't use. Wait until "usage limit reached" is a daily annoyance, then upgrade.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-red-400">
                <h3 className="font-bold text-[#1A1A1A] mb-1">2. Using the API for personal chat</h3>
                <p className="text-[#333333]">The API isn't cheaper for you personally. It's cheaper per call but you pay for every single token including system prompts and history. Pro's $20 flat fee covers what would be $50-150/mo in API tokens for the same usage.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border-l-4 border-red-400">
                <h3 className="font-bold text-[#1A1A1A] mb-1">3. Staying on Pro when you're running a team</h3>
                <p className="text-[#333333]">Five people each paying $20/mo on personal Pro = $100/mo with no SSO, no central billing, no shared admin. Team at $25/seat = $125/mo with all of those. The $25 difference buys back hours of IT admin time.</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Run the numbers on your workload</h2>
            <p className="text-gray-300 mb-6">The plan picker calculator takes your actual hours-per-day and model mix and recommends Pro, Max 5x, Max 20x, or API with the monthly cost for each.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculators/claude-plan-picker" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Open the plan picker</Link>
              <Link href="/calculators/claude-code-vs-cursor-cost" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Claude Code vs Cursor cost</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
