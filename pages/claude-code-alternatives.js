import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "What is the best Claude Code alternative?",
    answer: "There is no single best one — it depends on where you work and how you pay. If you want the closest like-for-like terminal agent, OpenAI Codex CLI and Gemini CLI are the nearest matches. If you want a visual IDE instead of a terminal, Cursor and Windsurf are the strongest. If you want a free, open-source option you control, Cline and Aider win. Claude Code still leads adoption (46% most-loved in the Pragmatic Engineer 2026 survey), so the honest framing is: alternatives that fit your workflow better, not alternatives that are simply better."
  },
  {
    question: "Is there a free alternative to Claude Code?",
    answer: "Yes. Gemini CLI gives you 1,000 requests per day at no cost. Cline, Aider, and Continue.dev are open source and free to install — you only pay your model provider's API costs (bring your own key). If you already pay for a model API you use elsewhere, these three are effectively free to run on top of it."
  },
  {
    question: "Which Claude Code alternative is best for the terminal?",
    answer: "Codex CLI (OpenAI), Gemini CLI (Google), Aider, and Cline CLI are the terminal-first agents most comparable to Claude Code. Codex CLI leads SWE-bench Verified at 88.7% on GPT-5.5, just ahead of Claude Opus 4.7 at 87.6%. Aider is the original open-source CLI coding agent and predates Claude Code by over a year. All four run in your terminal and commit to git, so the choice comes down to which model and pricing model you prefer."
  },
  {
    question: "Cursor vs Claude Code — which should I use?",
    answer: "Different tools, not strictly better or worse. Cursor is a VS Code-forked IDE with AI in the editor UI; it wins on inline tab-complete and visual diff review. Claude Code is a terminal-first agent; it wins on multi-file refactors, git workflows, hooks, and sub-agents. Many developers run both. We cover this head-to-head in detail in the Claude Code vs Cursor deep dive — start there if those two are your shortlist."
  },
  {
    question: "How much do Claude Code alternatives cost?",
    answer: "The $20/month tier has become the standard: Cursor Pro, Windsurf Pro (actually $15), and Claude Code Pro all sit around there. GitHub Copilot Pro is cheaper at $10/month. Codex and Gemini CLI bill via API tokens or subscription. The open-source agents (Cline, Aider, Continue.dev) are free to install and cost only your API usage. The real difference is flat quota versus token-based billing — heavy users prefer a flat fee, light users come out ahead on tokens."
  },
  {
    question: "Do I have to leave Claude Code to use an alternative?",
    answer: "No. The most common real-world setup is running two tools side by side — for example, Claude Code in a terminal for agentic and git work, and Cursor or Windsurf as the editor for interactive coding. Because they all operate on the same files on disk, they do not conflict. Treat 'alternative' as 'second tool with a clear job', not 'replacement'."
  },
  {
    question: "Which alternative is best for beginners?",
    answer: "Cursor or Windsurf. A visual IDE with inline suggestions and a composer is easier to learn than a terminal-first agent. Start there, get comfortable with AI-assisted coding, then add a terminal agent like Claude Code, Codex CLI, or Cline once you want deeper automation, hooks, and sub-agents."
  },
  {
    question: "Is the best alternative the one with the highest benchmark score?",
    answer: "No — and this trips up a lot of buyers. Codex leads SWE-bench Verified (88.7%) and Claude Opus is a point behind (87.6%), but a one-point benchmark gap rarely changes your day-to-day output. Workflow fit, pricing model, and how the tool handles your codebase matter far more than a leaderboard. Pick for fit first, benchmark second."
  }
]

const tools = [
  {
    name: 'Cursor',
    form: 'VS Code-forked IDE',
    free: 'Free Hobby tier; Pro $20/mo',
    forWho: 'Developers who want AI inside a familiar visual editor with inline tab-complete and a composer for multi-file edits.',
    vsClaude: 'Trades Claude Code\'s terminal-first automation (hooks, sub-agents, headless runs) for a polished editor UI and model choice across Claude, GPT, and Gemini.'
  },
  {
    name: 'GitHub Copilot',
    form: 'IDE extension (VS Code, JetBrains)',
    free: 'Pro $10/mo; Business $19/seat',
    forWho: 'Teams already in the GitHub and VS Code ecosystem who want the cheapest, most-integrated autocomplete plus an agent mode.',
    vsClaude: 'Cheapest entry point and deepest IDE integration, but its agent mode is less mature than Claude Code\'s sub-agent and background-task model.'
  },
  {
    name: 'Windsurf',
    form: 'VS Code fork (by Codeium)',
    free: 'Pro $15/mo; Teams $30/seat',
    forWho: 'Cursor-style IDE users who want a slightly cheaper plan and the Cascade agent for flow-based multi-file editing.',
    vsClaude: 'A direct Cursor competitor rather than a Claude Code competitor — same trade-off: editor UI over terminal automation, undercutting Cursor by $5/mo.'
  },
  {
    name: 'OpenAI Codex CLI',
    form: 'Terminal agent',
    free: 'API tokens / ChatGPT subscription',
    forWho: 'Terminal-first developers who want the closest like-for-like Claude Code experience but on OpenAI models.',
    vsClaude: 'The nearest match in form factor. Codex on GPT-5.5 leads SWE-bench Verified at 88.7% vs Claude Opus 4.7 at 87.6% — a near-tie. Choose on which model and ecosystem you prefer.'
  },
  {
    name: 'Gemini CLI',
    form: 'Terminal agent',
    free: 'Free — 1,000 requests/day',
    forWho: 'Developers who want a capable terminal agent at zero cost and are happy on Google\'s models.',
    vsClaude: 'The strongest free terminal option. Gemini 3.1 Pro scores 80.6% on SWE-bench Verified — behind Claude and Codex, but the generous free tier makes it the easiest no-risk alternative to try.'
  },
  {
    name: 'Aider',
    form: 'Open-source terminal CLI',
    free: 'Free (BYOK — pay your API costs)',
    forWho: 'Developers who want a model-agnostic, git-native CLI they fully control, with no vendor lock-in.',
    vsClaude: 'The original open-source CLI coding agent, predating Claude Code by over a year. Battle-tested for refactors and automation, but no IDE extension, no autocomplete, and a steeper setup.'
  },
  {
    name: 'Cline',
    form: 'Open-source (VS Code + CLI)',
    free: 'Free; Teams $20/mo (first 10 seats free)',
    forWho: 'Developers who want open-source freedom and full provider portability inside VS Code, plus a terminal mode.',
    vsClaude: 'Apache 2.0 licensed with 5M+ VS Code installs and full BYOK model choice. Cline CLI 2.0 added parallel terminal agents — the closest open-source answer to Claude Code\'s sub-agents.'
  },
  {
    name: 'Continue.dev',
    form: 'Open-source IDE extension',
    free: 'Free (BYOK)',
    forWho: 'Developers who want a free, customisable AI assistant inside their existing IDE without committing to one model vendor.',
    vsClaude: 'A configurable open-source layer rather than a full agent. Lighter than Claude Code on autonomy, but free and fully under your control.'
  }
]

const comparisonRows = [
  { tool: 'Claude Code', form: 'Terminal agent', cost: 'API / Pro $20/mo / Max', open: 'No', best: 'Multi-file refactors, git, hooks, sub-agents' },
  { tool: 'Cursor', form: 'IDE (VS Code fork)', cost: 'Free / Pro $20/mo', open: 'No', best: 'Interactive coding with inline AI' },
  { tool: 'GitHub Copilot', form: 'IDE extension', cost: 'Pro $10/mo', open: 'No', best: 'Cheap autocomplete in GitHub/VS Code stack' },
  { tool: 'Windsurf', form: 'IDE (VS Code fork)', cost: 'Pro $15/mo', open: 'No', best: 'Cursor-style editing, slightly cheaper' },
  { tool: 'Codex CLI', form: 'Terminal agent', cost: 'API / ChatGPT sub', open: 'No', best: 'Closest terminal match (top SWE-bench)' },
  { tool: 'Gemini CLI', form: 'Terminal agent', cost: 'Free — 1,000 req/day', open: 'No', best: 'Best free terminal agent' },
  { tool: 'Aider', form: 'Terminal CLI', cost: 'Free (BYOK)', open: 'Yes', best: 'Model-agnostic, git-native, no lock-in' },
  { tool: 'Cline', form: 'VS Code + CLI', cost: 'Free / Teams $20/mo', open: 'Yes', best: 'Open-source with provider portability' },
  { tool: 'Continue.dev', form: 'IDE extension', cost: 'Free (BYOK)', open: 'Yes', best: 'Free customisable in-IDE assistant' }
]

const pickerVariables = [
  { slot: '[WHERE I WORK]', example: 'a terminal / a visual IDE / VS Code with extensions' },
  { slot: '[BUDGET]', example: 'free only / under $20 a month / flat fee preferred' },
  { slot: '[MAIN JOB]', example: 'inline autocomplete / multi-file refactors / autonomous agents / git workflows' },
  { slot: '[MODEL PREFERENCE]', example: 'any / Claude / GPT / Gemini / open weights' },
  { slot: '[LOCK-IN TOLERANCE]', example: 'fine with a vendor / want open source I control' }
]

export default function ClaudeCodeAlternatives() {
  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Code Alternatives (2026): 8 Honest Options and Who Each One Is For',
    description: 'An honest roundup of Claude Code alternatives — Cursor, Copilot, Windsurf, Codex CLI, Gemini CLI, Aider, Cline, and Continue.dev — with Claude Code as the benchmark and a clear who-each-is-for recommendation.',
    url: 'https://promptwritingstudio.com/claude-code-alternatives',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['claude code alternatives', 'claude code alternative', 'claude code vs cursor', 'best claude code alternative', 'free claude code alternative', 'AI coding tools 2026']
  })

  return (
    <>
      <Head>
        <title>Claude Code Alternatives (2026): 8 Honest Options and Who Each Is For | PromptWritingStudio</title>
        <meta name="description" content="Claude Code alternatives compared honestly: Cursor, Copilot, Windsurf, Codex CLI, Gemini CLI, Aider, Cline, Continue.dev. Claude Code as the benchmark, plus who each alternative is for and a pick-your-tool prompt." />
        <meta name="keywords" content="claude code alternatives, claude code alternative, claude code vs cursor, best claude code alternative, free claude code alternative, AI coding tools" />
        <meta property="og:title" content="Claude Code Alternatives (2026): 8 Honest Options and Who Each Is For" />
        <meta property="og:description" content="An honest roundup of Claude Code alternatives with a clear who-each-is-for recommendation and a pick-your-tool prompt." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-code-alternatives" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-alternatives" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Code Alternatives
              <span className="block text-[#FFDE59]">8 honest options, and who each one is for</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                The best Claude Code alternative depends on where you work and how you pay — not on a leaderboard. For a terminal agent like Claude Code, look at Codex CLI and Gemini CLI. For a visual IDE instead, look at Cursor and Windsurf. For free and open source, look at Cline and Aider. Claude Code still leads adoption at 46% most-loved (Pragmatic Engineer 2026), so we use it as the benchmark and judge every alternative against it.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              No hype, no "this one tool beats them all." Just a clear read on which alternative fits your workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#comparison" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                See the comparison table
              </a>
              <a href="#picker" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Get the pick-your-tool prompt
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The short answer by situation</h2>
            <p className="text-lg text-[#333333] mb-8">
              Most "best Claude Code alternative" lists rank tools head to head. That is the wrong question. The right question is which alternative fits your situation. Here is the fast read.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F9F9F9] p-8 rounded-lg border-2 border-[#FFDE59]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">If you want a terminal agent...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]"><strong>Codex CLI</strong> — closest like-for-like, top SWE-bench score</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]"><strong>Gemini CLI</strong> — best free option, 1,000 requests/day</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]"><strong>Aider / Cline</strong> — open source, you control the models</span></li>
                </ul>
              </div>
              <div className="bg-[#F9F9F9] p-8 rounded-lg border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">If you want a visual IDE...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]"><strong>Cursor</strong> — the most popular IDE alternative</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]"><strong>Windsurf</strong> — Cursor-style, $5/mo cheaper</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]"><strong>GitHub Copilot</strong> — cheapest, deepest IDE integration</span></li>
                </ul>
              </div>
            </div>
            <p className="text-center text-[#666666] mt-8">
              For the two most-searched matchup, read the full <Link href="/claude-code-vs-cursor" className="text-[#1A1A1A] font-semibold underline">Claude Code vs Cursor deep dive</Link> — we do not repeat it here.
            </p>
          </div>
        </section>

        <section id="comparison" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Claude Code alternatives at a glance</h2>
            <p className="text-lg text-[#333333] mb-8">Claude Code is the top row — the benchmark. Everything below is judged against it.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Tool</th>
                    <th className="p-4 text-left font-semibold">Form</th>
                    <th className="p-4 text-left font-semibold">Cost</th>
                    <th className="p-4 text-left font-semibold">Open source</th>
                    <th className="p-4 text-left font-semibold">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={index} className={index === 0 ? 'bg-[#FFF8DC]' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A] text-sm">{row.tool}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.form}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.cost}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.open}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#666666] mt-4">
              SWE-bench Verified (2026): Codex on GPT-5.5 88.7%, Claude Opus 4.7 87.6%, Gemini 3.1 Pro 80.6%, Cursor Composer 2.5 79.8%. Pricing as of June 2026 and subject to change.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8">The 8 alternatives, one by one</h2>
            <div className="space-y-6">
              {tools.map((t, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 md:p-8 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-[#1A1A1A]">{i + 1}. {t.name}</h3>
                    <span className="bg-[#1A1A1A] text-white text-xs font-semibold px-3 py-1 rounded-full">{t.form}</span>
                    <span className="bg-[#FFDE59] text-[#1A1A1A] text-xs font-semibold px-3 py-1 rounded-full">{t.free}</span>
                  </div>
                  <p className="text-[#333333] mb-3"><strong>Who it is for:</strong> {t.forWho}</p>
                  <p className="text-[#333333]"><strong>Versus Claude Code:</strong> {t.vsClaude}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="picker" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Pick your tool with this prompt</h2>
            <p className="text-lg text-[#333333] mb-8">
              Reading nine tool descriptions still leaves you choosing. Skip that. Fill in the five slots below, paste the prompt into Claude or ChatGPT, and let it match a tool to your actual constraints. This is the kind of fill-in-the-blank prompt we teach across the whole studio.
            </p>

            <div className="bg-[#1A1A1A] text-gray-100 p-6 md:p-8 rounded-lg font-mono text-sm leading-relaxed mb-8">
              <p className="mb-4">I am choosing an AI coding tool. Recommend one primary tool and one backup from this list: Claude Code, Cursor, GitHub Copilot, Windsurf, OpenAI Codex CLI, Gemini CLI, Aider, Cline, Continue.dev.</p>
              <p className="mb-2">My constraints:</p>
              <p className="mb-1">- I mostly work in <span className="text-[#FFDE59]">[WHERE I WORK]</span></p>
              <p className="mb-1">- My budget is <span className="text-[#FFDE59]">[BUDGET]</span></p>
              <p className="mb-1">- My main job for the tool is <span className="text-[#FFDE59]">[MAIN JOB]</span></p>
              <p className="mb-1">- My model preference is <span className="text-[#FFDE59]">[MODEL PREFERENCE]</span></p>
              <p className="mb-4">- My lock-in tolerance is <span className="text-[#FFDE59]">[LOCK-IN TOLERANCE]</span></p>
              <p>For each recommendation, give me one sentence on why it fits and one trade-off I am accepting. Do not recommend a tool that violates my budget or lock-in constraint.</p>
            </div>

            <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">What goes in each slot</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Slot</th>
                    <th className="p-4 text-left font-semibold">Example values</th>
                  </tr>
                </thead>
                <tbody>
                  {pickerVariables.map((v, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 border-b border-gray-200 font-mono text-sm text-[#1A1A1A]">{v.slot}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{v.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-red-300 mt-8">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Common failure mode</h3>
              <p className="text-[#333333]">
                If you leave <span className="font-mono text-sm">[MAIN JOB]</span> vague ("coding"), the model defaults to the most popular tool and ignores your budget. Be specific — "autonomous multi-file refactors with git commits" produces a different, better answer than "help me code". A weak slot makes a weak prompt.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Should you actually leave Claude Code?</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-5">
                Probably not entirely. The honest pattern across most developers is not switching — it is pairing. Keep Claude Code in a terminal for agentic and git work, and add an IDE like Cursor or Windsurf for interactive editing. Because every tool here reads and writes the same files on disk, running two does not cause conflicts.
              </p>
              <p className="text-lg text-[#333333] mb-5">
                The cases where a true switch makes sense are narrow and specific: you need a free tool (Gemini CLI, Cline, Aider), you are committed to OpenAI or Google models (Codex CLI, Gemini CLI), or you need open source you fully control with no vendor lock-in (Cline, Aider, Continue.dev). Outside those, "alternative" usually means "second tool with a clear job."
              </p>
              <p className="text-lg text-[#333333]">
                Whatever you land on, the tool is only half the equation. The prompts you give it decide the output. A precise, well-structured prompt gets a better result out of Gemini CLI than a lazy one gets out of Claude Opus.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions people actually ask when shopping for a Claude Code alternative.</p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="p-5 cursor-pointer hover:bg-gray-50 font-semibold text-gray-900 list-none flex justify-between items-center">
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 text-center">Keep going with Claude Code</h2>
            <p className="text-lg text-[#333333] text-center mb-8">
              Staying with Claude Code, or running it alongside an alternative? These guides cover setup, cost, and the daily workflow.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/claude-code-guide" className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200 hover:border-[#FFDE59] transition-colors text-center">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Guide</h3>
                <p className="text-sm text-[#666666]">Install, auth, and the full daily workflow.</p>
              </Link>
              <Link href="/claude-code-review" className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200 hover:border-[#FFDE59] transition-colors text-center">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Review</h3>
                <p className="text-sm text-[#666666]">Our hands-on verdict on what it does well and badly.</p>
              </Link>
              <Link href="/claude-code-vs-cursor" className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200 hover:border-[#FFDE59] transition-colors text-center">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code vs Cursor</h3>
                <p className="text-sm text-[#666666]">The head-to-head and a 30-day switch plan.</p>
              </Link>
              <Link href="/claude-code-pricing" className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200 hover:border-[#FFDE59] transition-colors text-center">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Pricing</h3>
                <p className="text-sm text-[#666666]">API vs Pro vs Max, and what each costs.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The tool matters less than the prompt
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Whichever coding agent you pick, your output is only as good as the instructions you give it. PromptWritingStudio teaches the fill-in-the-blank prompt system that gets sharper results from any AI tool — Claude Code, Cursor, or anything on this list.
            </p>
            <div className="flex justify-center">
              <a href="https://courses.becomeawritertoday.com/purchase?product_id=6640678" className="bg-[#FFDE59] text-[#1A1A1A] px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Join Now
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
