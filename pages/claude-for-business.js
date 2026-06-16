import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import LastVerified from '../components/LastVerified'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'
import { TEAM_PLANS, PLANS_META } from '../lib/claude-data'

const teamStandard = TEAM_PLANS.find(p => p.id === 'team-standard')
const teamPremium = TEAM_PLANS.find(p => p.id === 'team-premium')
const enterprise = TEAM_PLANS.find(p => p.id === 'enterprise')

const faqs = [
  {
    question: "What is Claude for business?",
    answer: "Claude for business means using Anthropic's Claude models inside a company through the Team plan or Enterprise plan, rather than individual Pro or Max subscriptions. The Team plan starts at $25 per seat per month (minimum 5 seats) and adds SSO, central billing, admin controls, and a guarantee that your conversations aren't used to train models. Enterprise adds compliance features like audit logs, SCIM, and IP allowlisting for regulated industries."
  },
  {
    question: "How much does Claude Team cost?",
    answer: `Claude Team has two seat types. A Standard seat is $${teamStandard.pricePerSeatPerMonth} per seat per month ($${teamStandard.pricePerSeatPerMonthAnnual} billed annually), with a ${teamStandard.minSeats}-seat minimum. A Premium seat is $${teamPremium.pricePerSeatPerMonth} per seat per month ($${teamPremium.pricePerSeatPerMonthAnnual} annually) and carries roughly 5x the usage ceiling — built for people running Claude Code or heavy analysis all day. You can mix seat types, so most teams put Standard seats on everyone and Premium seats on their power users.`
  },
  {
    question: "How do businesses actually use Claude day to day?",
    answer: "The highest-ROI uses are repetitive writing and analysis tasks: drafting customer support replies, turning meeting notes into action items, summarising long documents, writing first-draft proposals and SOPs, cleaning and analysing spreadsheets, and reviewing code. The pattern that works is a saved, fill-in-the-blank prompt for each recurring task so the whole team gets the same quality output instead of starting from scratch each time."
  },
  {
    question: "Is Claude Team better than five individual Pro subscriptions?",
    answer: `Five Pro subscriptions cost $100 per month and give you no shared admin, no SSO, and no central billing. Five Claude Team Standard seats cost $${teamStandard.pricePerSeatPerMonth * teamStandard.minSeats} per month and add all of those plus a contractual no-training-on-your-data default. The $25 difference buys back IT admin time and removes the data-training question that legal teams ask first. For any company past a handful of users, Team is the cleaner answer.`
  },
  {
    question: "Does Claude train on my company's data?",
    answer: "On Team and Enterprise plans, Anthropic's default is not to train models on your conversations or uploaded content. This is the single feature that moves Claude from a personal tool to a sanctioned business tool — verify the current data-handling terms on Anthropic's pricing and trust pages before rolling out, since policies are updated over time."
  },
  {
    question: "When should a business move from Team to Enterprise?",
    answer: `Move to Enterprise when compliance requirements outgrow the Team plan: when you need audit logs, SCIM provisioning, role-based access, custom data retention, IP allowlisting, or a HIPAA-ready configuration. Enterprise is billed per seat plus usage at API rates rather than a flat seat price, so it suits regulated industries and larger orgs more than a 10-person team.`
  },
  {
    question: "How do I roll Claude out to a team without it becoming shelfware?",
    answer: "Pick three recurring tasks the team already does manually — support replies, meeting summaries, proposal drafts are common — and write one saved prompt template for each. Share those templates on day one. Adoption fails when people are handed a blank chat box and told to 'be creative'; it succeeds when they get a fill-in-the-blank prompt that produces a usable draft on the first try."
  }
]

const useCases = [
  {
    title: 'Customer support',
    task: 'Draft consistent, on-brand replies to common tickets',
    roi: 'Cuts first-response drafting from minutes to seconds; new agents sound like senior ones',
    template: `You are a support agent for [COMPANY], which sells [PRODUCT].
Tone: [friendly / formal / concise].
Customer message: """[PASTE TICKET]"""
Write a reply that: acknowledges the issue, gives the fix in numbered steps,
and ends with one clear next action. Do not promise anything not in our policy: [PASTE POLICY].`
  },
  {
    title: 'Meetings & operations',
    task: 'Turn raw notes or a transcript into decisions and owners',
    roi: 'Removes the post-meeting write-up tax; nothing falls through the cracks',
    template: `Here are my raw meeting notes: """[PASTE NOTES]"""
Produce three sections: (1) Decisions made, (2) Action items as a table with
Owner and Due date, (3) Open questions. Flag anything ambiguous instead of guessing.`
  },
  {
    title: 'Sales & proposals',
    task: 'Generate a tailored first-draft proposal from a brief',
    roi: 'Compresses a half-day proposal into a 20-minute edit',
    template: `Draft a proposal for [PROSPECT], a [INDUSTRY] company with [N] employees.
Their stated problem: [PROBLEM]. Our solution: [SOLUTION].
Structure: situation, recommended approach, scope, timeline, and pricing placeholder.
Keep it under one page. Match this tone: [PASTE A PAST WINNING PROPOSAL].`
  },
  {
    title: 'Data & spreadsheets',
    task: 'Clean, summarise, and pull insight from messy data',
    roi: 'No formula expertise required; analysts spend time on judgment, not wrangling',
    template: `Here is a CSV export: """[PASTE DATA]"""
Tell me: the three most important trends, any rows that look like data-entry errors,
and one chart I should build. Then give me the exact spreadsheet formula for each metric.`
  }
]

const article = generateArticleSchema({
  title: 'Claude for Business: Use Cases, Team Pricing, and How to Get Started (2026)',
  description: 'How businesses use Claude day to day — support, meetings, proposals, and data — plus what the Claude Team plan costs, the ROI math, and copy-paste prompt templates to roll it out.',
  slug: 'claude-for-business',
  datePublished: '2026-06-16'
})

export default function ClaudeForBusiness() {
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <Head>
        <title>Claude for Business: Use Cases, Team Pricing & Getting Started (2026) | PromptWritingStudio</title>
        <meta name="description" content="How businesses use Claude for business — support, meetings, proposals, and data analysis — with Claude Team plan pricing, the ROI math, and copy-paste prompt templates." />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-for-business" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">Claude · For Business</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Claude for Business: Use Cases, Pricing, and How to Get Started
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              What businesses actually use Claude for, what the Team plan costs, and the prompt templates that get a team productive on day one.
            </p>
            <LastVerified date={PLANS_META.lastVerified} source={PLANS_META.source} className="mt-4 text-gray-300" />
          </div>
        </section>

        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                <strong>Claude for business</strong> means running Claude across a company on the <strong>Team plan</strong> — from <strong>${teamStandard.pricePerSeatPerMonth}/seat/mo</strong> with a {teamStandard.minSeats}-seat minimum — instead of scattered personal subscriptions. The Team plan adds SSO, central billing, admin controls, and a no-training-on-your-data default. The ROI comes from saved prompt templates for recurring work: support replies, meeting notes, proposals, and data analysis.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">What businesses actually use Claude for</h2>
            <p className="text-[#333333] mb-4">
              Most generic guides stop at the pricing table. The value is in the work itself. The four use cases below cover the bulk of business ROI — each comes with a fill-in-the-blank template you can paste in and use today.
            </p>
            <p className="text-[#333333] mb-8">
              The rule that separates teams who get value from teams whose seats go cold: <strong>turn every recurring task into a saved prompt</strong>. A blank chat box produces inconsistent output. A template produces a usable draft on the first try.
            </p>
            <div className="space-y-6">
              {useCases.map((u, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-[#1A1A1A] text-white px-6 py-4 flex flex-wrap items-baseline gap-3">
                    <h3 className="text-xl font-bold">{u.title}</h3>
                    <span className="text-sm text-gray-400 ml-auto">{u.task}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-[#333333] mb-3"><strong>Why it pays off:</strong> {u.roi}</p>
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Copy-paste template:</p>
                    <pre className="bg-[#F9F9F9] border border-gray-200 rounded p-4 text-sm text-[#1A1A1A] whitespace-pre-wrap overflow-x-auto">{u.template}</pre>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-[#FFDE59]/10 border-l-4 border-[#FFDE59] p-4 rounded-r mt-8">
              <p className="text-sm text-[#1A1A1A]"><strong>Failure mode to avoid:</strong> rolling Claude out with a "go be creative" memo. Adoption dies when people face a blank box. Ship three saved templates on day one — support, meetings, proposals — and let usage grow from there.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2 text-center">What does Claude for business cost?</h2>
            <p className="text-[#333333] mb-8 text-center max-w-2xl mx-auto">The Team plan has two seat types plus an Enterprise tier. Mix Standard seats for most staff with Premium seats for power users.</p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
                <thead className="bg-[#1A1A1A] text-white">
                  <tr>
                    <th className="p-3 text-left">Plan / seat</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Min seats</th>
                    <th className="p-3 text-left">Usage</th>
                    <th className="p-3 text-left">Best for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {TEAM_PLANS.map(p => (
                    <tr key={p.id}>
                      <td className="p-3 font-semibold text-[#1A1A1A]">{p.name}</td>
                      <td className="p-3 text-[#333333]">
                        ${p.pricePerSeatPerMonth}/seat/mo
                        {p.pricePerSeatPerMonthAnnual && p.pricePerSeatPerMonthAnnual < p.pricePerSeatPerMonth && (
                          <span className="block text-xs text-gray-500">${p.pricePerSeatPerMonthAnnual} annual</span>
                        )}
                        {p.billing === 'per-seat-plus-api-usage' && (
                          <span className="block text-xs text-gray-500">+ usage at API rates</span>
                        )}
                      </td>
                      <td className="p-3 text-[#333333]">{p.minSeats || '—'}</td>
                      <td className="p-3 text-[#333333]">{p.usageLimit}</td>
                      <td className="p-3 text-[#333333]">{p.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">Team and Enterprise pricing verified against claude.com/pricing on {PLANS_META.lastVerified}. AI pricing changes often — confirm current rates before purchasing.</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">The ROI math: Team vs five personal Pro plans</h2>
            <p className="text-[#333333] mb-4">
              The most common mistake is letting employees expense individual Pro subscriptions. Here is the comparison at the {teamStandard.minSeats}-seat minimum:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-[#333333]"><span className="text-[#FFDE59] font-bold mt-0.5">•</span><span><strong>Five personal Pro plans:</strong> $100/mo. No SSO, no central billing, no admin visibility, and the default consumer data terms.</span></li>
              <li className="flex items-start gap-2 text-[#333333]"><span className="text-[#FFDE59] font-bold mt-0.5">•</span><span><strong>Five Team Standard seats:</strong> ${teamStandard.pricePerSeatPerMonth * teamStandard.minSeats}/mo. Adds SSO, central billing, admin controls, and the no-training-on-your-data default.</span></li>
            </ul>
            <p className="text-[#333333] mb-4">
              For ${teamStandard.pricePerSeatPerMonth * teamStandard.minSeats - 100} more per month you remove the data-training question legal asks first and the IT admin overhead of managing five separate accounts. If those five people each save even 30 minutes a day on drafting, the plan pays for itself many times over before you count anything else.
            </p>
            <p className="text-[#333333]">
              Want the per-task numbers for your own team? The calculators below run the math on content speed, support savings, and overall AI readiness.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">How to get started with Claude for business</h2>
            <ol className="space-y-4">
              <li className="bg-white p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">1. Confirm the right plan</h3>
                <p className="text-[#333333]">Under 5 people or piloting solo? Start on Pro or Max and decide later. Five or more people who need shared admin? Go straight to Team. Run the numbers with the <Link href="/claude-pro-vs-max-vs-api" className="text-blue-600 underline">Pro vs Max vs API guide</Link> and the plan picker.</p>
              </li>
              <li className="bg-white p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">2. Pick three recurring tasks</h3>
                <p className="text-[#333333]">Choose the highest-volume manual writing work your team already does. Support replies, meeting summaries, and proposals are the usual three. Write one fill-in-the-blank template for each — use the templates above as a starting point.</p>
              </li>
              <li className="bg-white p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">3. Ship templates, not a blank box</h3>
                <p className="text-[#333333]">Share the templates in a shared doc or Projects on day one. Measure adoption by whether people reuse them, not by seat count. Add new templates as people request them.</p>
              </li>
              <li className="bg-white p-5 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="font-bold text-[#1A1A1A] mb-1">4. Upgrade seats and tiers as needed</h3>
                <p className="text-[#333333]">Move heavy daily users to Premium seats. Move to {enterprise.name} only when compliance needs (audit logs, SCIM, HIPAA-ready) outgrow the Team plan.</p>
              </li>
            </ol>
          </div>
        </section>

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
                  <div className="px-4 pb-4"><p className="text-gray-600 leading-relaxed">{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1A1A] text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">Make the templates pay for the plan</h2>
            <p className="text-gray-300 mb-6">A team only gets ROI from Claude when everyone uses prompts that work. Prompt Writing Studio teaches the exact frameworks for building reusable, fill-in-the-blank templates like the ones above — so your whole team produces senior-level output instead of guessing at the prompt. Start with the calculators, then build the skill.</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-6">
              <Link href="/calculators/claude-plan-picker" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Open the plan picker</Link>
              <Link href="/calculators/business-ai-readiness" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">AI readiness calculator</Link>
              <Link href="/calculators/customer-service-ai-savings" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Support savings calculator</Link>
            </div>
            <a href="https://courses.becomeawritertoday.com/purchase?product_id=6640678" className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition">Join Now</a>
          </div>
        </section>
      </Layout>
    </>
  )
}
