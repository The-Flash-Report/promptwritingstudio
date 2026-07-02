import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema, generateRatingSchema } from '../lib/schemaGenerator'

const GRADER_URL = '/prompt-grader'

const RATING = { value: 4.5, count: 1 }

const faqs = [
  {
    question: "Is Claude Code worth it in 2026?",
    answer: "For developers who already have a working coding workflow and want to move faster on multi-file changes, git operations, and automation, yes — it is worth it. After building and maintaining a full Next.js site with it, my honest verdict is 4.5 out of 5. It is the strongest terminal-first agentic coding tool available right now, but it is not a beginner's tool and it is not free. You pay either through a Claude Pro or Max subscription or per-token API billing. If you are brand new to AI-assisted coding, a visual IDE like Cursor is a gentler start."
  },
  {
    question: "What is Claude Code, in plain terms?",
    answer: "Claude Code is Anthropic's terminal-based AI coding agent. You run it in your shell inside a project folder. It reads your whole codebase, edits files, runs commands, manages git, and can run long agentic loops with sub-agents and hooks. It is a command-line tool, not an editor — it works alongside whatever editor you already use rather than replacing it."
  },
  {
    question: "What are the biggest downsides of Claude Code?",
    answer: "Three real ones. First, usage limits: on a Pro subscription you can hit a five-hour session cap during heavy work, which interrupts flow. Second, cost unpredictability on the API — a heavy refactoring day leaning on Opus can run far more than a flat subscription. Third, it struggles with loosely documented, technically-indebted codebases, where you end up correcting its direction more often. None of these are dealbreakers, but pretending they do not exist would be dishonest."
  },
  {
    question: "Who should not use Claude Code?",
    answer: "Complete beginners who have never used a terminal, people who want inline tab-complete as they type, and anyone who needs image generation or heavy multimodal features. Claude Code does one thing — agentic, whole-codebase coding from the command line — and does it very well. If that is not the shape of your work, a different tool fits better."
  },
  {
    question: "Does Claude Code work with my editor?",
    answer: "Yes. Because it lives in the terminal and operates on files on disk, it works with VS Code, Cursor, Vim, JetBrains, or anything else. Many developers keep their editor open for visual review while Claude Code handles the heavy multi-file work in a terminal tab. They do not conflict."
  },
  {
    question: "How much does Claude Code cost?",
    answer: "The CLI is free to install via npm, but the model behind it is not. You need a Claude Pro or Max subscription, or pay-as-you-go API credits. There is no free tier that powers Claude Code. For a full breakdown of every plan, API token rates, and which one fits your usage, see the Claude Code pricing page linked in this review."
  },
  {
    question: "Is Claude Code better than Cursor or Copilot?",
    answer: "Not strictly better — different. Claude Code wins on multi-file refactors, git workflows, automation via hooks, and autonomous sub-agents. Cursor and Copilot win on inline suggestions and in-editor flow. The honest answer for most working developers is to use Claude Code for the heavy agentic work and keep an AI-enabled editor for interactive coding. They complement each other."
  }
]

const verdict = {
  score: '4.5 / 5',
  oneLiner: 'The strongest terminal-first AI coding agent in 2026 — for developers who already know their way around a codebase, not for beginners.',
  bestFor: 'Working developers who do multi-file refactors, git-heavy workflows, and want automation and agentic loops.',
  notFor: 'Total beginners, people who want inline tab-complete, and anyone needing image or heavy multimodal features.'
}

const pros = [
  {
    title: 'It reads the whole codebase, not just the open file',
    detail: 'This is the single biggest difference from autocomplete-style tools. Ask it to rename a concept across a project and it finds every reference, understands the architecture, and edits consistently with your existing conventions — without you pasting files in.'
  },
  {
    title: 'Git and shell are first-class, not bolted on',
    detail: 'It branches, commits, runs your test suite, and opens pull requests through the gh CLI. A full "branch, edit, test, commit, push, open PR" loop runs without you leaving the terminal. This is where it earns its keep for me.'
  },
  {
    title: 'Real automation through hooks and slash commands',
    detail: 'Hooks run code on events — format-on-save, block-a-dangerous-command, lint-before-commit. Slash commands turn repeated workflows into one word. This is the layer that turns it from "nice AI CLI" into a daily driver.'
  },
  {
    title: 'Sub-agents and background tasks',
    detail: 'You can hand a scoped job — QA across many pages, a research spike, a code review — to a sub-agent that works in parallel while you keep going. For larger jobs you run them in the background. No other coding tool does this as cleanly.'
  },
  {
    title: 'Plan mode before it touches anything',
    detail: 'For a change that spans several files, plan mode explores and proposes a plan you approve before any edit lands. It catches misunderstandings before they become a mess of bad diffs. I use it on anything touching five or more files.'
  },
  {
    title: 'It snapshots state so you can rewind',
    detail: 'It snapshots before changes, and you can rewind when something breaks. That safety net makes it far less stressful to let it work on real code than it sounds.'
  }
]

const cons = [
  {
    title: 'Usage limits interrupt heavy days',
    detail: 'On a Pro subscription there is a rolling five-hour session limit plus weekly caps shared with Claude chat. During an intense build day you can hit "usage limit reached" and lose momentum. Anthropic raised these limits in 2026, but if you run it for hours daily, Pro will frustrate you and you will need a Max plan.'
  },
  {
    title: 'API cost is unpredictable',
    detail: 'On pay-as-you-go, a light day building this site landed around a few dollars; a heavy Opus-led refactoring day ran into the tens of dollars. That is fine occasionally, but it adds up fast and is hard to forecast. For sustained daily use a flat subscription is both cheaper and calmer.'
  },
  {
    title: 'It struggles with messy, undocumented code',
    detail: 'On a clean codebase with a good context file it is excellent. On a sprawling, technically-indebted project with little documentation, it makes more wrong assumptions and you correct its direction more often. It amplifies the quality of the codebase it is dropped into.'
  },
  {
    title: 'No inline completions',
    detail: 'If you love tab-complete as you type, Claude Code will feel wrong — that is not what it does. This is a deliberate design choice, not a bug, but it surprises people coming from Copilot or Cursor.'
  },
  {
    title: 'Support is email-only',
    detail: 'For a tool in the $17 to $200 per month range, the email-only support and merely-okay response times are a fair criticism. Most issues you solve through docs and community, but do not expect fast hand-holding.'
  }
]

const realUse = [
  {
    label: 'What I built with it',
    text: 'This site — a Next.js 13 programmatic-SEO project with dozens of pages, data-driven routes, and a course funnel — is maintained day to day with Claude Code. Adding pages, refactoring components, running QA across many pages in parallel, and handling git all run through it.'
  },
  {
    label: 'Where it saved the most time',
    text: 'Multi-file refactors and parallel QA. Handing a tight, well-scoped job to a sub-agent — "check these 20 pages for broken links and report" — and getting a clean answer while I worked on something else is the workflow I would not give up.'
  },
  {
    label: 'Where it cost me time',
    text: 'Vague instructions. Under-scoped sub-agents that were told to "look at the codebase" burned tokens and produced muddled output. The fix was always on me: be specific, give it a context file, scope the task tightly.'
  },
  {
    label: 'The one setting that changed everything',
    text: 'A project context file (CLAUDE.md). The difference between Claude Code with 40 lines of project context and Claude Code with none is the difference between a sharp collaborator and a confused intern. Almost every disappointing experience I have seen traces back to skipping it.'
  }
]

const scorecard = [
  { area: 'Code quality on a clean codebase', score: '5 / 5', note: 'Consistent with existing conventions, strong reasoning on Opus.' },
  { area: 'Multi-file refactors', score: '5 / 5', note: 'Reads the whole project first; this is its core strength.' },
  { area: 'Git and automation', score: '5 / 5', note: 'Deep git, hooks, slash commands, gh CLI.' },
  { area: 'Agentic / sub-agent work', score: '5 / 5', note: 'Best-in-class parallel and background tasks.' },
  { area: 'Beginner friendliness', score: '2 / 5', note: 'Terminal-first, no hand-holding, no inline complete.' },
  { area: 'Cost predictability', score: '3 / 5', note: 'Subscriptions fine; API spend hard to forecast.' },
  { area: 'Handling messy codebases', score: '3 / 5', note: 'Amplifies whatever quality it is dropped into.' },
  { area: 'Support', score: '3 / 5', note: 'Email-only; docs and community carry the load.' }
]

export default function ClaudeCodeReview() {
  const faqSchema = generateFAQSchema(faqs)
  const ratingSchema = generateRatingSchema('Claude Code', RATING)
  const articleSchema = generateArticleSchema({
    title: 'Claude Code Review (2026): An Honest, First-Hand Verdict',
    description: 'A hands-on Claude Code review from a developer who built and maintains a full site with it. Pros, cons, a scorecard, who it is for, and a clear verdict — no comparison table.',
    url: 'https://promptwritingstudio.com/claude-code-review',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['Claude Code review', 'Claude Code reviews', 'is Claude Code worth it', 'Claude Code pros and cons', 'Claude Code verdict 2026']
  })

  return (
    <>
      <Head>
        <title>Claude Code Review (2026): An Honest, First-Hand Verdict | PromptWritingStudio</title>
        <meta name="description" content="A hands-on Claude Code review from a developer who maintains a full site with it. Honest pros and cons, a scorecard, who it is for, and a clear 4.5/5 verdict." />
        <meta name="keywords" content="Claude Code review, Claude Code reviews, is Claude Code worth it, Claude Code pros and cons, Claude Code verdict, Claude Code honest review" />
        <meta property="og:title" content="Claude Code Review (2026): An Honest, First-Hand Verdict" />
        <meta property="og:description" content="Pros, cons, a scorecard, and a clear verdict from a developer who built a full site with Claude Code." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-code-review" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-review" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Code Review
              <span className="block text-[#FFDE59]">An honest, first-hand verdict</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                <strong>Verdict: 4.5 / 5.</strong> Claude Code is the strongest terminal-first AI coding agent available in 2026. It reads your whole codebase, handles git and automation natively, and runs parallel sub-agents no other tool matches. It is not for beginners, it is not free, and its usage limits and API cost can bite. This review is based on building and maintaining a full Next.js site with it — not on aggregating star ratings.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              No comparison table, no affiliate fluff. Just what it is genuinely good at, where it falls down, and exactly who should buy it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#scorecard" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Jump to the scorecard
              </a>
              <a href="#verdict" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Who it is for
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">What is Claude Code?</h2>
            <p className="text-lg text-[#333333] mb-5">
              Claude Code is Anthropic's terminal-based AI coding agent. You run it in your shell, inside a project folder, and it works on the files there. It reads the whole codebase, edits files, runs shell commands, manages git, and can run long agentic loops with sub-agents and hooks.
            </p>
            <p className="text-lg text-[#333333] mb-5">
              The thing to understand before you judge it: <strong>it is a command-line tool, not an editor.</strong> It does not replace VS Code or Cursor — it works alongside whatever editor you already use. If you came expecting inline tab-complete, you will be confused. That is not what it does.
            </p>
            <p className="text-lg text-[#333333]">
              As of mid-2026 it runs on Anthropic's latest models — Opus 4.8 as the default in the 2.1.x releases, with Sonnet 4.6 available — and ships features like plan mode, auto mode, automatic state snapshots, and a context-management system. New to it? The <Link href="/claude-code-guide" className="text-[#1A1A1A] underline font-semibold hover:no-underline">Claude Code guide</Link> covers install, auth, and daily workflow end to end.
            </p>
          </div>
        </section>

        <section id="scorecard" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The scorecard at a glance</h2>
            <p className="text-lg text-[#333333] mb-8">
              How I rate Claude Code across the dimensions that actually matter to a working developer. These scores reflect daily use, not a one-afternoon trial.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Area</th>
                    <th className="p-4 text-left font-semibold">Score</th>
                    <th className="p-4 text-left font-semibold">Why</th>
                  </tr>
                </thead>
                <tbody>
                  {scorecard.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A] text-sm">{row.area}</td>
                      <td className="p-4 border-b border-gray-200 text-[#1A1A1A] text-sm font-bold whitespace-nowrap">{row.score}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-[#666666] mt-6">Overall: <strong className="text-[#1A1A1A]">4.5 / 5</strong> — exceptional at its core job, with honest weak spots around onboarding and cost.</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8">What Claude Code is genuinely good at</h2>
            <div className="space-y-5">
              {pros.map((p, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{p.title}</h3>
                  <p className="text-[#333333]">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8">Where Claude Code falls down</h2>
            <p className="text-lg text-[#333333] mb-8">
              Every honest review needs a real cons section. These are the things that genuinely annoyed me, not token complaints invented for balance.
            </p>
            <div className="space-y-5">
              {cons.map((c, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border-l-4 border-red-300">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{c.title}</h3>
                  <p className="text-[#333333]">{c.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-[#333333] mt-8">
              On cost specifically: the picture is nuanced enough that it deserves its own page. The full plan breakdown, API token rates, and break-even maths are in the <Link href="/claude-code-pricing" className="text-[#1A1A1A] underline font-semibold hover:no-underline">Claude Code pricing guide</Link>.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8">What it was like to actually use it</h2>
            <p className="text-lg text-[#333333] mb-8">
              Most "Claude Code reviews" aggregate star ratings or list features off a docs page. This section is the part you cannot fake: what daily use felt like.
            </p>
            <div className="space-y-6">
              {realUse.map((r, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 md:p-8 rounded-lg border border-gray-200">
                  <p className="text-sm font-bold text-[#FFB800] uppercase tracking-wide mb-2">{r.label}</p>
                  <p className="text-lg text-[#333333]">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="verdict" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Who Claude Code is for — and who should skip it</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white p-8 rounded-lg border-2 border-[#FFDE59]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Buy it if...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You already have a working coding workflow and want to move faster</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You do a lot of multi-file refactors, git work, or deployment</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You want automation: hooks, slash commands, sub-agents, background tasks</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You live in the terminal and want AI there, not in a separate IDE</span></li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Skip it if...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-red-400 mr-2 mt-1 flex-shrink-0">&times;</span><span className="text-[#333333]">You are a complete beginner who has never used a terminal</span></li>
                  <li className="flex items-start"><span className="text-red-400 mr-2 mt-1 flex-shrink-0">&times;</span><span className="text-[#333333]">You want inline tab-complete as you type</span></li>
                  <li className="flex items-start"><span className="text-red-400 mr-2 mt-1 flex-shrink-0">&times;</span><span className="text-[#333333]">You need image generation or heavy multimodal features</span></li>
                  <li className="flex items-start"><span className="text-red-400 mr-2 mt-1 flex-shrink-0">&times;</span><span className="text-[#333333]">A predictable flat monthly bill matters more than raw capability</span></li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1A1A1A] p-8 rounded-lg text-center">
              <p className="text-[#FFDE59] font-bold text-2xl mb-3">Final verdict: {verdict.score}</p>
              <p className="text-gray-200 text-lg max-w-2xl mx-auto">{verdict.oneLiner}</p>
            </div>

            <p className="text-[#333333] mt-8 text-center">
              Weighing it against other agentic coding tools? See <Link href="/claude-code-vs-cursor" className="text-[#1A1A1A] underline font-semibold hover:no-underline">Claude Code vs Cursor</Link> for the head-to-head, or <Link href="/claude-code-alternatives" className="text-[#1A1A1A] underline font-semibold hover:no-underline">Claude Code alternatives</Link> for the wider field.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently asked questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions people ask before they decide whether Claude Code is worth it.</p>
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
              The tool is only as good as the instructions you give it
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              The single biggest lever in this review was clear, well-scoped prompting — vague instructions wasted time, sharp ones did a day's work in an hour. That skill transfers to every AI tool you touch. Prompt Writing Studio teaches it in depth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={GRADER_URL} className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Grade Your Prompt Free
              </a>
              <Link href="/claude-code-guide" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Read the Claude Code Guide
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
