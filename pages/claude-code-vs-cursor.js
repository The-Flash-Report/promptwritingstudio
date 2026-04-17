import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "Is Claude Code better than Cursor?",
    answer: "Different, not strictly better. Claude Code lives in the terminal and works with any editor; it shines at multi-file refactors, git workflows, agentic loops, and automation via hooks. Cursor is a full VS Code-forked IDE with AI deeply integrated into the UI; it shines at tab-complete coding, inline suggestions, and a visual composer. Most serious developers I know end up using both. If you have to pick one, pick the one that matches where you already spend time: terminal-heavy people love Claude Code, IDE-heavy people love Cursor."
  },
  {
    question: "Can I use Claude Code and Cursor at the same time?",
    answer: "Yes, and many developers do. Cursor handles the interactive editing session, Claude Code runs in a separate terminal window for larger multi-file tasks, git operations, and long-running agents. They do not fight each other because they operate on the same files on disk. The combination is how I work daily."
  },
  {
    question: "Does Cursor use Claude models?",
    answer: "Yes. Cursor supports Claude Opus 4, Claude Sonnet 4, GPT-5, GPT-4o, and others. You can pick the model per conversation. Which model drives the output matters more than whether you are in Claude Code or Cursor — same Claude model in both produces similar code quality. The interface and workflow around it are what differs."
  },
  {
    question: "Is Claude Code or Cursor cheaper?",
    answer: "It depends on how you use them. Cursor is $20/month for Pro with generous usage. Claude Code is free to install but billed via API tokens or a Claude Pro / Max subscription. For heavy users, a flat $20/month on Cursor Pro is predictable. For lighter users, Claude Code on API can come out under $10/month. If you already pay for Claude Pro ($20/month) for general AI use, Claude Code is effectively free on top of that."
  },
  {
    question: "Which has better agent mode?",
    answer: "Claude Code is the more mature agentic system — it was built around the agent loop, supports sub-agents, background tasks, hooks, and MCP out of the box. Cursor Agent mode has closed much of the gap and is excellent inside the IDE context, especially for long edit sequences with visual review. For autonomous multi-hour tasks, Claude Code's sub-agents remain stronger. For interactive agentic work with a human in the loop, Cursor's UX is very good."
  },
  {
    question: "Which one should a beginner choose?",
    answer: "Cursor. The visual IDE, inline suggestions, and composer are easier to learn than a terminal-first tool. You can add Claude Code later once you are comfortable with AI-assisted coding and want to push into deeper automation, hooks, sub-agents, and headless workflows."
  },
  {
    question: "Can I migrate my Cursor rules to Claude Code?",
    answer: "Yes, the concepts map cleanly. Cursor's .cursorrules file becomes CLAUDE.md in Claude Code. Both do the same job — persistent project context injected into every session. You can usually copy your .cursorrules content into CLAUDE.md and tighten it slightly, because Claude Code benefits more from commands and architecture notes than from tone instructions."
  },
  {
    question: "What does a realistic 30-day switch look like?",
    answer: "Week 1: install Claude Code, write a CLAUDE.md, do small edits in the terminal while keeping Cursor open. Week 2: move multi-file refactors and git workflows to Claude Code. Week 3: set up hooks and two or three slash commands. Week 4: try sub-agents and background tasks for larger jobs. By day 30 you will know whether you are a Claude Code person, a Cursor person, or (most likely) a both-at-once person with a clear split of which tool does what."
  }
]

const comparisonRows = [
  { dim: 'Form factor', claude: 'Terminal CLI (any editor)', cursor: 'Standalone IDE (VS Code fork)' },
  { dim: 'Where AI lives', claude: 'In the terminal', cursor: 'In the editor UI' },
  { dim: 'File editing', claude: 'Yes — reads, writes, and diffs files', cursor: 'Yes — edits in-editor with live preview' },
  { dim: 'Multi-file refactors', claude: 'Strong (reads whole codebase first)', cursor: 'Strong (Composer mode)' },
  { dim: 'Git integration', claude: 'Deep — commits, branches, PRs, gh CLI', cursor: 'Basic — via source control panel' },
  { dim: 'Runs terminal commands', claude: 'Yes, any command', cursor: 'Limited, with permission' },
  { dim: 'Inline tab-complete', claude: 'No (not its job)', cursor: 'Yes — core feature' },
  { dim: 'Agent mode', claude: 'Built-in + sub-agents + background tasks', cursor: 'Built-in (Agent)' },
  { dim: 'Hooks / automation', claude: 'Yes — PreToolUse, PostToolUse, etc.', cursor: 'Rules system; no exit-code blocking' },
  { dim: 'Extensibility', claude: 'MCP servers, skills, sub-agents', cursor: 'VS Code extensions, MCP' },
  { dim: 'Project context file', claude: 'CLAUDE.md', cursor: '.cursorrules' },
  { dim: 'Model choice', claude: 'Claude models (Opus, Sonnet, Haiku)', cursor: 'Claude, GPT, Gemini — pick per chat' },
  { dim: 'Pricing', claude: 'API usage or Claude Pro ($20/mo) / Max', cursor: 'Free / Pro ($20/mo) / Business' },
  { dim: 'Best for', claude: 'Multi-file refactors, git, automation, agent loops', cursor: 'Daily interactive coding with AI in the UI' }
]

const weekPlan = [
  {
    week: 'Week 1',
    title: 'Install, configure, small wins',
    days: [
      { day: 'Day 1', task: 'Install Claude Code (npm i -g @anthropic-ai/claude-code). Authenticate via Claude Pro or set ANTHROPIC_API_KEY.' },
      { day: 'Day 2', task: 'Write a CLAUDE.md for your main project. Start by copying your .cursorrules if you have one. Add commands and architecture notes.' },
      { day: 'Day 3', task: 'Do one real task — a bug fix or small feature — entirely in Claude Code. Keep Cursor open but do not touch it.' },
      { day: 'Day 4–5', task: 'Try the slash commands: /commit, /compact, /clear. Learn what each one does in your workflow.' },
      { day: 'Day 6–7', task: 'Review Week 1. What felt slower than Cursor? What felt faster? Write the answers down somewhere.' }
    ]
  },
  {
    week: 'Week 2',
    title: 'Move the heavy lifting over',
    days: [
      { day: 'Day 8–10', task: 'Use Claude Code for every multi-file refactor and every git operation. Let Cursor handle interactive edits.' },
      { day: 'Day 11–12', task: 'Try plan mode on a change that touches 5+ files. Review the plan before approving.' },
      { day: 'Day 13–14', task: 'Hand Claude Code a full PR workflow: branch, edit, test, commit, push, gh pr create.' }
    ]
  },
  {
    week: 'Week 3',
    title: 'Automate around it',
    days: [
      { day: 'Day 15–16', task: 'Add one hook to settings.json. Format-on-save or block-dangerous-command is a safe first pick.' },
      { day: 'Day 17–18', task: 'Write two slash commands in .claude/commands/. Pick workflows you repeat — /deploy, /release-notes, /qa.' },
      { day: 'Day 19–21', task: 'Install one MCP server relevant to your stack (Postgres, GitHub, Linear). See if it replaces a manual step.' }
    ]
  },
  {
    week: 'Week 4',
    title: 'Push into sub-agents and background work',
    days: [
      { day: 'Day 22–24', task: 'Spawn a sub-agent for a scoped task — QA, research, code review. Note where it helps and where it does not.' },
      { day: 'Day 25–27', task: 'Run a background task (long refactor, big test suite). Work on something else while it runs.' },
      { day: 'Day 28–30', task: 'Compare honestly. What stuck? What went back to Cursor? Decide: all-Claude-Code, split-use, or stay on Cursor.' }
    ]
  }
]

const pitfalls = [
  {
    title: 'Keeping Cursor open but never using it',
    detail: 'In week 1 this is fine. After week 2, close Cursor for at least part of the day so you actually feel the difference. You cannot evaluate the switch if you keep escape-hatching back.'
  },
  {
    title: 'Skipping CLAUDE.md',
    detail: 'Most disappointing Claude Code experiences trace back to "no project context." Give it a CLAUDE.md on day two. Even 40 lines makes a visible difference.'
  },
  {
    title: 'Trying to use Claude Code like Cursor',
    detail: 'Claude Code is not built for inline completions while you type. If you miss tab-complete, go use Cursor for that part. Use Claude Code where it is strongest: whole-codebase edits, git flows, agentic loops, automation.'
  },
  {
    title: 'Not setting up hooks',
    detail: 'The automation layer is what separates "nice AI CLI" from "daily driver." Format-on-save alone changes how the tool feels. Spend 15 minutes in week 3.'
  },
  {
    title: 'Under-scoping sub-agents',
    detail: 'Sub-agents work best when you hand them a tight, independent task with clear output. Vague ("look at the codebase") sub-agents waste tokens and time. Be specific.'
  }
]

export default function ClaudeCodeVsCursor() {
  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Code vs Cursor: A 30-Day Switch Plan (and Whether You Should Bother)',
    description: 'A head-to-head comparison of Claude Code and Cursor, plus a realistic 30-day migration plan from someone who uses both daily. Clear recommendation by developer type.',
    url: 'https://promptwritingstudio.com/claude-code-vs-cursor',
    datePublished: '2026-03-01',
    dateModified: '2026-04-17',
    keywords: ['Claude Code vs Cursor', 'Cursor vs Claude Code', 'switch from Cursor to Claude Code', 'Claude Code comparison', 'AI coding tools 2026']
  })

  return (
    <>
      <Head>
        <title>Claude Code vs Cursor: A 30-Day Switch Plan (and Whether You Should Bother) | PromptWritingStudio</title>
        <meta name="description" content="Claude Code vs Cursor compared across form factor, editing, git, agents, hooks, and pricing. Includes a realistic 30-day switch plan from a daily user of both." />
        <meta name="keywords" content="Claude Code vs Cursor, Cursor vs Claude Code, switch from Cursor to Claude Code, Claude Code comparison, AI coding tools, Anthropic coding tools" />
        <meta property="og:title" content="Claude Code vs Cursor: A 30-Day Switch Plan" />
        <meta property="og:description" content="A head-to-head comparison and a 30-day migration plan from someone who uses both daily." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-code-vs-cursor" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-vs-cursor" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: April 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Code vs Cursor
              <span className="block text-[#FFDE59]">A 30-day switch plan, honestly told</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Claude Code is Anthropic's terminal-first agentic coding CLI. Cursor is a VS Code-forked IDE with AI woven into the UI. They overlap but they are not the same tool. Short answer: Cursor wins on interactive coding with inline suggestions; Claude Code wins on multi-file refactors, git workflows, hooks, and sub-agents. Most serious developers end up using both, with a clear split of duties.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              This is the comparison and the 30-day plan I followed. It will not tell you Claude Code is strictly better. It will tell you how to figure out honestly which one fits your work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#comparison" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                See the comparison
              </a>
              <a href="#plan" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Jump to 30-day plan
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The short verdict</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F9F9F9] p-8 rounded-lg border-2 border-[#FFDE59]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Stick with Cursor if...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You love tab-complete and inline suggestions as you type</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You prefer visual review of edits with diff panels</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You want one tool with AI baked in, not a second window</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You are still early in AI-assisted coding and want the gentler learning curve</span></li>
                </ul>
              </div>
              <div className="bg-[#F9F9F9] p-8 rounded-lg border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Switch (or add) Claude Code if...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You live in the terminal and want AI there, not in a separate IDE</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You do a lot of multi-file refactors, git flows, or deployment work</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You want hooks, sub-agents, background tasks, or MCP</span></li>
                  <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span><span className="text-[#333333]">You want to run agentic workflows headlessly in CI or scripts</span></li>
                </ul>
              </div>
            </div>
            <p className="text-center text-[#666666] mt-8">The answer for most developers with real projects: both. Use each where it is strongest.</p>
          </div>
        </section>

        <section id="comparison" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Feature-by-feature</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Dimension</th>
                    <th className="p-4 text-left font-semibold">Claude Code</th>
                    <th className="p-4 text-left font-semibold">Cursor</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A] text-sm">{row.dim}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.claude}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.cursor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="plan" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The 30-day switch plan</h2>
            <p className="text-lg text-[#333333] mb-10">
              Do not delete Cursor on day one. Run the tools side by side and shift work over week by week. At the end of 30 days you will have an honest answer about which tool belongs where.
            </p>

            <div className="space-y-8">
              {weekPlan.map((w, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 md:p-8 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#FFDE59] text-[#1A1A1A] text-sm font-bold px-3 py-1 rounded-full">{w.week}</span>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1A1A1A]">{w.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {w.days.map((d, di) => (
                      <div key={di} className="bg-white p-4 rounded-lg border border-gray-100">
                        <p className="text-sm font-semibold text-[#1A1A1A] mb-1">{d.day}</p>
                        <p className="text-[#333333]">{d.task}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Pitfalls that ruin the switch</h2>
            <div className="space-y-5">
              {pitfalls.map((p, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border-l-4 border-red-300">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{p.title}</h3>
                  <p className="text-[#333333]">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">How I actually work now</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-5">
                After a few months of running both tools, I landed on a simple split. Cursor stays open as my main editor for interactive coding, small inline edits, and quick reviews of file changes. Claude Code runs in a terminal tab for everything multi-file, every git operation, every deploy, and every long-running background job.
              </p>
              <p className="text-lg text-[#333333] mb-5">
                When I want to add a feature that touches 8 files, I do it in Claude Code. When I want to clean up a single function I am looking at, I do it in Cursor. When I want to run a QA sweep across 20 pages in parallel, I spawn sub-agents in Claude Code. When I want to review a diff before committing, I glance at Cursor's source control panel.
              </p>
              <p className="text-lg text-[#333333]">
                Neither tool replaces the other. They make each other better.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">Questions that come up constantly when developers compare these two.</p>
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

        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Decided Claude Code wins the terminal? Start here.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              The Claude Code guide has the full install, auth, and daily workflow. The CLAUDE.md Playbook and Hooks Recipes cover the two files that separate "installed" from "actually productive."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/claude-code-guide" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Claude Code Guide
              </Link>
              <Link href="/claude-md-playbook" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                CLAUDE.md Playbook
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
