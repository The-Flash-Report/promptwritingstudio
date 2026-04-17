import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "What is the difference between Skills, MCP, and Hooks in Claude?",
    answer: "Skills are packaged prompt + script bundles Claude can choose to load on demand. MCP servers are external programs that expose new tools for Claude to call. Hooks are shell commands Claude Code runs automatically at fixed events, without Claude's input. Skills extend what Claude knows how to do, MCP extends what Claude can touch, hooks enforce what happens around Claude's work."
  },
  {
    question: "When should I write a Skill instead of a slash command?",
    answer: "Write a slash command when the thing you want is a single-turn prompt you invoke by name (like /commit or /deploy). Write a Skill when the thing you want is a broader capability with multiple steps, reusable assets, or bundled code (like a 'compliance review' skill that loads a checklist and helper scripts). Skills are heavier and are chosen by Claude based on intent; slash commands are lighter and triggered by you."
  },
  {
    question: "When should I build an MCP server?",
    answer: "Build an MCP server when Claude needs to talk to a system it cannot reach through bash or file I/O: a proprietary API, a database with custom auth, an internal service, a CRM, a desk ticketing system. If the integration is something you would otherwise wrap in a local script, a Skill is usually enough. If it needs live authenticated access to a system, MCP is the right layer."
  },
  {
    question: "When should I use a Hook?",
    answer: "Use a hook when you want the behaviour to happen whether or not Claude chooses it. Formatting after every edit, blocking rm -rf, running a targeted test on save, logging every prompt — these are guardrails and automations, not capabilities Claude reasons about. Hooks run deterministically at the event you bind them to."
  },
  {
    question: "Can a Skill include Hooks or call MCP tools?",
    answer: "Skills and hooks live in different places — skills are a packaging format for prompts and assets Claude loads on demand, hooks are configured in settings.json. They do not literally contain each other, but they compose: a Skill can call bash that invokes an MCP tool, and hooks can fire around anything Claude does, including during a Skill's execution."
  },
  {
    question: "What about sub-agents? Where do they fit?",
    answer: "Sub-agents are a different axis entirely. They are independent Claude Code agents you spawn to handle a scoped task in parallel (for example, one sub-agent per vendor during a QA sweep). You still use skills, MCP, or hooks inside a sub-agent exactly as you would in the main session. Sub-agents are about parallelism and context isolation, not about extending Claude's capabilities."
  },
  {
    question: "Can I start with just hooks and slash commands?",
    answer: "Yes, and most people should. Hooks plus slash commands cover 80% of the value. Add Skills when you find yourself packaging the same prompt + scripts for multiple projects. Add MCP when you hit a system Claude genuinely cannot reach any other way. Skipping straight to MCP for things a bash script would handle is overengineering."
  }
]

const comparisonRows = [
  { dim: 'Who decides to run it', skills: 'Claude (picks based on intent)', mcp: 'Claude (calls the tool)', hooks: 'The runtime (fixed events)', slash: 'You (you type /name)' },
  { dim: 'What it extends', skills: 'Claude\'s know-how for a task', mcp: 'Systems Claude can reach', hooks: 'Workflow around Claude', slash: 'Quick reusable prompts' },
  { dim: 'Can it block Claude?', skills: 'No', mcp: 'Not directly', hooks: 'Yes (PreToolUse exit 2)', slash: 'No' },
  { dim: 'Runs automatically?', skills: 'Loaded when relevant', mcp: 'Only when called', hooks: 'Yes, at bound events', slash: 'No, manual' },
  { dim: 'Where it lives', skills: '.claude/skills/ or a plugin', mcp: 'Own process, registered in config', hooks: 'settings.json', slash: '.claude/commands/' },
  { dim: 'Best for', skills: 'Packaged multi-step workflows', mcp: 'Live access to external systems', hooks: 'Guardrails and automation', slash: 'Quick, reusable single prompts' },
  { dim: 'Overhead to set up', skills: 'Medium', mcp: 'High (run a server)', hooks: 'Low (one JSON entry)', slash: 'Lowest (one markdown file)' }
]

const scenarios = [
  {
    id: 'format-on-save',
    task: 'Run Prettier on every file Claude edits',
    answer: 'Hook',
    reason: 'Deterministic. Should never be up to Claude. PostToolUse hook on Write|Edit — one line in settings.json.'
  },
  {
    id: 'query-db',
    task: 'Let Claude query your internal Postgres read replica with row-level security respected',
    answer: 'MCP',
    reason: 'Needs live authenticated access to a system bash cannot safely expose. MCP server wraps the auth and surfaces query tools to Claude.'
  },
  {
    id: 'commit-message',
    task: 'Type /commit and have Claude write a message + push',
    answer: 'Slash command',
    reason: 'Single-turn reusable prompt you trigger yourself. One markdown file in .claude/commands/commit.md.'
  },
  {
    id: 'vendor-review',
    task: 'Run a 12-step vendor review that loads a checklist, runs helper scripts, writes a report file',
    answer: 'Skill',
    reason: 'Multi-step, packaged, reusable across projects. Claude picks it up when you describe the task, which is cleaner than stuffing 12 steps into one slash command.'
  },
  {
    id: 'block-prod',
    task: 'Stop Claude from ever running migrations against production',
    answer: 'Hook',
    reason: 'A guardrail, not a capability. PreToolUse hook matching the Bash tool, checking for the prod DATABASE_URL, exit 2 if matched.'
  },
  {
    id: 'jira',
    task: 'Let Claude read and comment on Jira tickets during a session',
    answer: 'MCP',
    reason: 'Live external system with its own auth. MCP is the canonical way to give Claude tools for third-party platforms without inventing fragile scraping.'
  },
  {
    id: 'deploy',
    task: 'Type /deploy to build, preview, and ship the current site',
    answer: 'Slash command',
    reason: 'Short, reusable, triggered intentionally. A skill would be overkill for a few bash invocations.'
  },
  {
    id: 'refresh-audit',
    task: 'Audit a site\'s content for stale posts, using a refresh-ROI scoring framework, and output a prioritised queue',
    answer: 'Skill',
    reason: 'Framework + scoring logic + output format that should be identical across sites. Perfect fit for a skill — Claude loads it when you say "audit the content," you do not need to remember a slash command name.'
  },
  {
    id: 'log-prompts',
    task: 'Keep a log of every prompt you send Claude, appended to a local file',
    answer: 'Hook',
    reason: 'UserPromptSubmit hook. Runs every turn, deterministically, no Claude involvement needed.'
  },
  {
    id: 'crm-lookup',
    task: 'Pull a customer record from HubSpot mid-conversation when you mention their email',
    answer: 'MCP',
    reason: 'Third-party system, live lookup, needs real auth. MCP server for HubSpot exposes a lookup tool Claude can call when relevant.'
  }
]

export default function SkillsVsMcpVsHooks() {
  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Skills vs MCP vs Hooks: Which Claude Code Extension Should You Use?',
    description: 'A decision tree for when to use Skills, MCP servers, Hooks, or Slash commands in Claude Code. Includes a side-by-side comparison and ten real scenarios mapped to the right tool.',
    url: 'https://promptwritingstudio.com/skills-vs-mcp-vs-hooks',
    datePublished: '2026-03-25',
    dateModified: '2026-04-17',
    keywords: ['Claude Code skills', 'Claude Code MCP', 'Claude Code hooks', 'MCP vs hooks', 'Claude Code extensions']
  })

  return (
    <>
      <Head>
        <title>Skills vs MCP vs Hooks: Which Claude Code Extension Should You Use? | PromptWritingStudio</title>
        <meta name="description" content="A clear decision tree for when to use Skills, MCP servers, Hooks, or Slash commands in Claude Code. Side-by-side comparison plus ten real scenarios mapped to the right extension." />
        <meta name="keywords" content="Claude Code skills, Claude Code MCP, Claude Code hooks, MCP vs hooks, Claude Code slash commands, Claude Code extensions" />
        <meta property="og:title" content="Skills vs MCP vs Hooks: Which Claude Code Extension Should You Use?" />
        <meta property="og:description" content="A decision tree for Claude Code's four extension layers, with real examples of when each one is the right choice." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/skills-vs-mcp-vs-hooks" />
        <link rel="canonical" href="https://promptwritingstudio.com/skills-vs-mcp-vs-hooks" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: April 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Skills vs MCP vs Hooks
              <span className="block text-[#FFDE59]">Which extension actually fits the job?</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Claude Code has four ways to extend itself — Skills, MCP servers, Hooks, and Slash commands. They sound similar and the docs treat them separately, so people reach for the wrong one all the time. The short version: hooks enforce, skills package, MCP connects, slash commands trigger. Below is the decision tree and ten scenarios that map onto it.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#decision" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Decision tree
              </a>
              <a href="#scenarios" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Ten worked examples
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The four layers, in one sentence each</h2>
            <div className="space-y-5">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Skills</h3>
                <p className="text-[#333333]">Packaged bundles of prompts, assets, and helper code that Claude chooses to load when a session's intent matches. Think "a capability Claude can opt into."</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">MCP servers</h3>
                <p className="text-[#333333]">External programs speaking the Model Context Protocol that expose new tools — database queries, CRM lookups, ticketing systems — for Claude to call. Think "new hands for Claude to reach out with."</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Hooks</h3>
                <p className="text-[#333333]">Shell commands the Claude Code runtime runs automatically at bound events. They do not ask. They fire. Think "guardrails and automation around Claude's work."</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Slash commands</h3>
                <p className="text-[#333333]">Named prompts stored as markdown files that you invoke by typing /name. Think "a reusable prompt with a shortcut key."</p>
              </div>
            </div>
          </div>
        </section>

        <section id="decision" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Decision tree</h2>
            <p className="text-lg text-[#333333] mb-8">Answer these four questions in order. The first "yes" wins.</p>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-[#1A1A1A] mb-2">1. Should this run every time a specific event happens, regardless of what Claude thinks?</p>
                <p className="text-[#333333]"><strong>Yes →</strong> Hook. Format-on-save, block-dangerous-command, log-every-prompt. Deterministic, non-negotiable.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-[#1A1A1A] mb-2">2. Does Claude need to talk to an external system it cannot safely reach via bash?</p>
                <p className="text-[#333333]"><strong>Yes →</strong> MCP server. Authenticated databases, SaaS APIs, internal services. Anything a local script would be fragile for.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-[#1A1A1A] mb-2">3. Is this a multi-step workflow with reusable assets (checklists, prompts, scripts) you want Claude to pick up when intent matches?</p>
                <p className="text-[#333333]"><strong>Yes →</strong> Skill. Content audits, compliance reviews, vendor QA sweeps. Too heavy for one slash command, too dynamic for a hook.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <p className="font-semibold text-[#1A1A1A] mb-2">4. Is it a short, reusable prompt you trigger yourself by name?</p>
                <p className="text-[#333333]"><strong>Yes →</strong> Slash command. /commit, /deploy, /release-notes. Single file, single purpose.</p>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Most people start here:</strong> a handful of slash commands + two or three hooks. That covers most of the ergonomic wins. Reach for skills when you are repeating the same structured workflow across projects. Reach for MCP when you hit a system bash genuinely cannot handle.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Side-by-side comparison</h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">The quick reference when you just need to confirm which layer does what.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Dimension</th>
                    <th className="p-4 text-left font-semibold">Skills</th>
                    <th className="p-4 text-left font-semibold">MCP</th>
                    <th className="p-4 text-left font-semibold">Hooks</th>
                    <th className="p-4 text-left font-semibold">Slash cmds</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">{row.dim}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.skills}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.mcp}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.hooks}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333] text-sm">{row.slash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="scenarios" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Ten scenarios, mapped</h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">Cover your hand over the "Answer" column, guess, then read the reasoning. If you disagree, the "why" usually makes the call obvious.</p>
            </div>

            <div className="space-y-5">
              {scenarios.map((s, i) => (
                <div key={s.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-gray-500 font-semibold">Scenario {i + 1}</span>
                      <h3 className="text-lg font-bold text-[#1A1A1A] mt-1">{s.task}</h3>
                    </div>
                    <span className="bg-[#FFDE59] text-[#1A1A1A] text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">→ {s.answer}</span>
                  </div>
                  <p className="text-[#333333]">{s.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The mistakes that make people overengineer</h2>
            <div className="space-y-5">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-red-300">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Building an MCP server for what a bash script would do</h3>
                <p className="text-[#333333]">MCP servers are a real engineering commitment — you run a process, you handle auth, you version the tool surface. If the thing you want is "let Claude read a JSON file," the answer is bash. Save MCP for systems that genuinely need it.</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-red-300">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Stuffing a 10-step workflow into a single slash command</h3>
                <p className="text-[#333333]">Slash commands are single-turn prompts. When you find yourself writing a 300-line prompt file, break it up — that is a skill, or a hook-orchestrated sequence, or a sub-agent.</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-red-300">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Using a hook where a slash command would do</h3>
                <p className="text-[#333333]">If the answer to "should this happen every time" is actually "only when I say so," you want a slash command, not a hook. Hooks cost a bit of latency every session; use them only when the automatic behaviour is what you want.</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-red-300">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Writing a skill for something you use twice</h3>
                <p className="text-[#333333]">Skills are reusable capability bundles. If you would only invoke them on one specific project, you are better off with a CLAUDE.md section and a slash command.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">Questions I get whenever I show this decision tree to another developer.</p>
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
              Pick the right layer, then write for it.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Once you know which extension fits, the next step is the content. The Hooks Recipes article has eight copy-paste settings.json entries. The CLAUDE.md Playbook covers the persistent context layer most people skip entirely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/claude-code-hooks-recipes" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Hooks Recipes
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
