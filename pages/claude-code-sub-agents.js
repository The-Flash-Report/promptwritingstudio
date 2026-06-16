import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "What is a sub-agent in Claude Code?",
    answer: "A sub-agent is a specialized AI assistant that Claude Code spawns to handle a specific task in its own context window. It has its own system prompt, its own tool access, and independent permissions. When Claude encounters a task that matches a sub-agent's description, it delegates the work, the sub-agent runs on its own, and only the summary returns to your main conversation. This keeps verbose output (search results, logs, test runs) out of your main context."
  },
  {
    question: "Where do Claude Code sub-agent files live?",
    answer: "Project sub-agents go in .claude/agents/ in your repo root (check them into version control so your team shares them). Personal sub-agents go in ~/.claude/agents/ and are available across all your projects. Both directories are scanned recursively, so you can organize files into subfolders like agents/review/ or agents/research/. Identity comes from the name field in the frontmatter, not the filename or folder path."
  },
  {
    question: "How do I create a Claude Code sub-agent?",
    answer: "Run the /agents command inside Claude Code, choose Library then Create new agent, pick Personal or Project scope, and let Claude generate the config from a plain-English description. Or create the file by hand: a Markdown file with YAML frontmatter (name and description are required) followed by the system prompt in the body. Sub-agents created through /agents take effect immediately; files added on disk require a session restart."
  },
  {
    question: "Can Claude Code run sub-agents in parallel?",
    answer: "Yes. Background sub-agents run concurrently while you keep working, and you can ask Claude to research several independent areas at once (for example: 'Research the auth, database, and API modules in parallel using separate sub-agents'). Each sub-agent explores its area in its own context, then Claude synthesizes the findings. Parallel fan-out works best when the tasks do not depend on each other. Foreground sub-agents, by contrast, block the main conversation until they finish."
  },
  {
    question: "What is the difference between a sub-agent and a slash command or skill?",
    answer: "A sub-agent runs in an isolated context window and returns only a summary, which is ideal for verbose, self-contained work. A skill is a reusable prompt or workflow that runs in your main conversation context, so it shares your existing history. A slash command is a saved prompt you trigger manually. Use a sub-agent when you want isolation and tool restrictions; use a skill when the work needs your current context."
  },
  {
    question: "How does Claude decide which sub-agent to use?",
    answer: "Claude reads the description field of each registered sub-agent and matches it against your request and the current context. A vague description means Claude rarely delegates; a specific one (with phrases like 'use proactively after code changes') makes delegation reliable. You can also force a choice: name the sub-agent in your prompt, @-mention it to guarantee it runs, or launch a whole session as one sub-agent with the --agent flag."
  },
  {
    question: "Can a sub-agent use fewer tools than the main session?",
    answer: "Yes, and you should usually restrict them. Use the tools field as an allowlist (for example 'tools: Read, Grep, Glob, Bash' for a read-only reviewer) or disallowedTools as a denylist (for example 'disallowedTools: Write, Edit' to inherit everything except file writes). A reviewer that cannot edit files cannot accidentally break your codebase. Sub-agents inherit all tools by default if you omit both fields."
  },
  {
    question: "Can a Claude Code sub-agent spawn its own sub-agents?",
    answer: "Yes, as of Claude Code v2.1.172, a sub-agent can spawn nested sub-agents when its delegated task itself splits into parallel subtasks (for example, a reviewer that dispatches a verifier per finding). The intermediate output never reaches your main conversation; only the top-level sub-agent's summary returns. Background sub-agents stop spawning at depth five to prevent runaway concurrent trees."
  }
]

const frontmatterFields = [
  { field: 'name', required: 'Yes', desc: 'Unique identifier, lowercase letters and hyphens. This is how the sub-agent is invoked.' },
  { field: 'description', required: 'Yes', desc: 'Tells Claude when to delegate to this sub-agent. Be specific. Add "use proactively" to encourage automatic delegation.' },
  { field: 'tools', required: 'No', desc: 'Allowlist of tools the sub-agent can use. Inherits all tools if omitted.' },
  { field: 'disallowedTools', required: 'No', desc: 'Denylist. Removes tools from the inherited or specified set.' },
  { field: 'model', required: 'No', desc: 'sonnet, opus, haiku, a full model ID, or inherit. Defaults to inherit. Route cheap tasks to haiku to control cost.' },
  { field: 'permissionMode', required: 'No', desc: 'default, acceptEdits, plan, dontAsk, or bypassPermissions. Controls how permission prompts are handled.' },
  { field: 'skills', required: 'No', desc: 'Skills to preload into the sub-agent context at startup. The full skill content is injected.' },
  { field: 'memory', required: 'No', desc: 'user, project, or local. Gives the sub-agent a persistent memory directory that survives across sessions.' },
  { field: 'background', required: 'No', desc: 'Set to true to always run this sub-agent as a concurrent background task.' },
  { field: 'isolation', required: 'No', desc: 'Set to worktree to run the sub-agent in an isolated git worktree, so its edits do not touch your checkout.' }
]

export default function ClaudeCodeSubAgents() {
  const [copied, setCopied] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const reviewerAgent = `---
name: code-reviewer
description: Expert code review specialist. Use proactively after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer. When invoked:
1. Run git diff to see recent changes
2. Focus on modified files
3. Begin review immediately

Report issues by priority: Critical (must fix), Warnings
(should fix), Suggestions (consider). Include a specific fix for each.`

  const researcherAgent = `---
name: doc-researcher
description: Fetches and summarizes external documentation. Use for any task that would flood the main context with web pages or long files.
tools: Read, Grep, Glob, WebFetch, WebSearch
model: haiku
---

You research documentation in your own context and return only
a tight summary with the exact facts, code snippets, and source
URLs the main conversation needs. Never return raw page dumps.`

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Code Sub-Agents: How to Configure and Use Them (2026)',
    description: 'A practical guide to Claude Code sub-agents: what they are, how to configure them with YAML frontmatter, where the files live, and how to run parallel fan-out workflows with real examples.',
    url: 'https://promptwritingstudio.com/claude-code-sub-agents',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['claude code sub agents', 'claude code subagents', 'claude code agents', 'claude code parallel agents', 'claude code agents directory', 'claude code agent configuration']
  })

  return (
    <>
      <Head>
        <title>Claude Code Sub-Agents: How to Configure and Use Them (2026) | PromptWritingStudio</title>
        <meta name="description" content="Claude Code sub-agents explained: what they are, how to configure them with YAML frontmatter, where the .claude/agents/ files live, and how to run parallel fan-out workflows. With copy-paste examples." />
        <meta name="keywords" content="claude code sub agents, claude code subagents, claude code agents, claude code parallel agents, claude code agents directory, claude code agent configuration" />
        <meta property="og:title" content="Claude Code Sub-Agents: How to Configure and Use Them (2026)" />
        <meta property="og:description" content="What Claude Code sub-agents are, how to configure them, and how to run parallel fan-out workflows. With copy-paste examples." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-code-sub-agents" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-sub-agents" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        {/* Hero */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Code Sub-Agents
              <span className="block text-[#FFDE59]">Configure, Use, and Fan Out in Parallel</span>
            </h1>

            {/* Answer Block - AEO */}
            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Claude Code sub-agents are specialized AI assistants that run in their own context window with their own system prompt, tool access, and permissions. You define them as Markdown files with YAML frontmatter in <code className="bg-black/30 px-1 rounded">.claude/agents/</code> (project) or <code className="bg-black/30 px-1 rounded">~/.claude/agents/</code> (personal). Claude delegates a matching task to the sub-agent, which works independently and returns only a summary, keeping verbose output out of your main conversation. You can run several in parallel for independent work.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              This is the part of Claude Code that turns it from a single assistant into a team. Here is exactly how to configure sub-agents and use them well.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#create" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Create One Now
              </a>
              <Link href="/claude-code-guide" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Full Claude Code Guide
              </Link>
            </div>
          </div>
        </section>

        {/* What they are */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">What Are Sub-Agents in Claude Code?</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                A sub-agent is a specialized assistant that Claude Code spawns to handle one type of task. It runs in its own context window with a custom system prompt, its own tool access, and independent permissions. When your request matches a sub-agent's <strong>description</strong>, Claude hands the work over. The sub-agent does the work in isolation and returns only a summary to your main conversation.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                The reason this matters is context. A side task like running the full test suite, fetching three pages of API docs, or grepping a large codebase produces output you will never read again. If that lands in your main conversation, it crowds out the work you actually care about. A sub-agent absorbs that output in its own window and returns the one paragraph you need.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                Claude Code ships with built-in sub-agents you will see working automatically: <strong>Explore</strong> (a fast, read-only Haiku agent for searching code), <strong>Plan</strong> (read-only research during plan mode), and <strong>general-purpose</strong> (full tools for multi-step work). On top of those, you define your own.
              </p>

              <div className="bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-6 rounded-r-lg my-6">
                <p className="text-[#333333] mb-2"><strong>Sub-agent vs skill vs slash command, in one line each:</strong></p>
                <ul className="space-y-2 text-[#333333]">
                  <li><strong>Sub-agent:</strong> isolated context, returns a summary. Best for verbose, self-contained work.</li>
                  <li><strong>Skill:</strong> reusable workflow that runs in your <em>current</em> context. See <Link href="/claude-code-skills" className="text-[#1A1A1A] underline hover:no-underline">Claude Code Skills</Link>.</li>
                  <li><strong>Slash command:</strong> a saved prompt you trigger by hand.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* When to use */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">When Should You Use a Sub-Agent?</h2>
            <p className="text-lg text-[#333333] mb-8">
              Reach for a sub-agent when a task is self-contained and would otherwise flood your main context. Use the main conversation when the work needs frequent back-and-forth.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Use a sub-agent when</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li>The task produces verbose output you do not need (test logs, doc dumps, search results).</li>
                  <li>You want to enforce tool restrictions, for example a reviewer that cannot write files.</li>
                  <li>The work is self-contained and can return a clean summary.</li>
                  <li>You want to run several independent investigations at once.</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Stay in the main conversation when</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li>The task needs frequent iterative refinement.</li>
                  <li>Multiple phases share significant context (plan, build, test).</li>
                  <li>You are making a quick, targeted change.</li>
                  <li>Latency matters. A sub-agent starts fresh and needs time to gather context.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Create / configure */}
        <section id="create" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">How to Create a Claude Code Sub-Agent</h2>
            <p className="text-lg text-[#333333] mb-8">
              There are two routes. Use the <code className="bg-gray-100 px-2 py-1 rounded text-sm">/agents</code> command for guided setup, or write the file by hand for full control.
            </p>

            <div className="space-y-6">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Option 1: the /agents command (recommended)</h3>
                <p className="text-[#333333] mb-3">
                  Run <code className="bg-gray-100 px-2 py-1 rounded text-sm">/agents</code> inside Claude Code, switch to the <strong>Library</strong> tab, choose <strong>Create new agent</strong>, and pick <strong>Personal</strong> or <strong>Project</strong> scope. Select <strong>Generate with Claude</strong>, describe the agent in plain English, then pick its tools and model. Agents created this way are available immediately, no restart needed.
                </p>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Option 2: write the file by hand</h3>
                <p className="text-[#333333] mb-3">
                  A sub-agent is a Markdown file with YAML frontmatter, followed by the system prompt in the body. Only <code className="bg-gray-100 px-2 py-1 rounded text-sm">name</code> and <code className="bg-gray-100 px-2 py-1 rounded text-sm">description</code> are required. Drop it in your project's <code className="bg-gray-100 px-2 py-1 rounded text-sm">.claude/agents/</code> directory, then restart your session to load it.
                </p>
                <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
                  <pre>{reviewerAgent}</pre>
                  <button
                    onClick={() => copyToClipboard(reviewerAgent, 'reviewer')}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
                  >
                    {copied === 'reviewer' ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Where the files live:</strong> <code className="bg-gray-100 px-1 rounded">.claude/agents/</code> in your repo root for project sub-agents (commit these so your team shares them), or <code className="bg-gray-100 px-1 rounded">~/.claude/agents/</code> for personal ones available across every project. Identity comes from the <code className="bg-gray-100 px-1 rounded">name</code> field, not the filename. Keep names unique across the whole tree.
              </p>
            </div>
          </div>
        </section>

        {/* Frontmatter fields */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Sub-Agent Frontmatter Fields</h2>
            <p className="text-lg text-[#333333] mb-8">
              These are the fields you will actually reach for. <code className="bg-gray-100 px-2 py-1 rounded text-sm">name</code> and <code className="bg-gray-100 px-2 py-1 rounded text-sm">description</code> are the only required ones; everything else tightens behavior.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Field</th>
                    <th className="p-4 text-left font-semibold">Required</th>
                    <th className="p-4 text-left font-semibold">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {frontmatterFields.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 border-b border-gray-200 font-mono text-sm font-bold text-[#1A1A1A]">{row.field}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.required}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#666666] mt-4">
              Field reference per Anthropic's official sub-agents documentation. The full list also includes <code className="bg-gray-100 px-1 rounded">mcpServers</code>, <code className="bg-gray-100 px-1 rounded">hooks</code>, <code className="bg-gray-100 px-1 rounded">maxTurns</code>, <code className="bg-gray-100 px-1 rounded">effort</code>, and <code className="bg-gray-100 px-1 rounded">color</code>.
            </p>
          </div>
        </section>

        {/* Restrict tools */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Restrict Tools So Sub-Agents Cannot Break Things</h2>
            <p className="text-lg text-[#333333] mb-6">
              The single most useful pattern is limiting a sub-agent's tools. A reviewer that has no <code className="bg-gray-100 px-2 py-1 rounded text-sm">Write</code> or <code className="bg-gray-100 px-2 py-1 rounded text-sm">Edit</code> tool cannot accidentally rewrite your code while it is supposed to be reading it. You have two ways to do this:
            </p>
            <div className="space-y-4 mb-6">
              <div className="bg-[#F9F9F9] p-5 rounded-lg border border-gray-200">
                <p className="text-[#333333] mb-2"><strong>Allowlist with <code className="bg-gray-100 px-1 rounded">tools</code>:</strong> the sub-agent gets only what you list.</p>
                <code className="block bg-[#1A1A1A] text-green-400 p-3 rounded font-mono text-sm">tools: Read, Grep, Glob, Bash</code>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border border-gray-200">
                <p className="text-[#333333] mb-2"><strong>Denylist with <code className="bg-gray-100 px-1 rounded">disallowedTools</code>:</strong> inherit everything except what you block.</p>
                <code className="block bg-[#1A1A1A] text-green-400 p-3 rounded font-mono text-sm">disallowedTools: Write, Edit</code>
              </div>
            </div>
            <p className="text-[#333333]">
              If you set both, <code className="bg-gray-100 px-2 py-1 rounded text-sm">disallowedTools</code> is applied first, then <code className="bg-gray-100 px-2 py-1 rounded text-sm">tools</code> is resolved against what remains. A second lever is <code className="bg-gray-100 px-2 py-1 rounded text-sm">model</code>: route cheap, high-volume tasks to <code className="bg-gray-100 px-2 py-1 rounded text-sm">haiku</code> and save <code className="bg-gray-100 px-2 py-1 rounded text-sm">opus</code> for genuinely hard reasoning. Wondering whether your plan covers heavy sub-agent use? Check the <Link href="/claude-pro-vs-max-vs-api" className="text-[#1A1A1A] underline hover:no-underline">Claude Pro vs Max vs API comparison</Link> or run the <Link href="/calculators/claude-plan-picker" className="text-[#1A1A1A] underline hover:no-underline">Claude plan picker</Link>.
            </p>
          </div>
        </section>

        {/* Parallel fan-out */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Parallel Fan-Out: Running Sub-Agents at the Same Time</h2>
            <p className="text-lg text-[#333333] mb-6">
              Sub-agents run in the foreground (blocking) or background (concurrent). Background sub-agents are where the speed comes from: they run while you keep working, using the permissions already granted in the session. For independent work, you can fan several out at once.
            </p>

            <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
              <p className="text-sm font-semibold text-[#666666] mb-2">PARALLEL RESEARCH</p>
              <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm relative">
                <span>Research the authentication, database, and API modules in parallel using separate sub-agents</span>
                <button
                  onClick={() => copyToClipboard('Research the authentication, database, and API modules in parallel using separate sub-agents', 'parallel')}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
                >
                  {copied === 'parallel' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="text-[#333333] mt-3 text-sm">Each sub-agent explores its area independently, then Claude synthesizes the findings into one answer.</p>
            </div>

            <p className="text-lg text-[#333333] mb-4">Three patterns cover most fan-out work:</p>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">1. Isolate high-volume output</h3>
                <p className="text-[#333333] text-sm">"Use a sub-agent to run the test suite and report only the failing tests with their error messages." The verbose run stays in the sub-agent; you get the failures.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">2. Parallel research</h3>
                <p className="text-[#333333] text-sm">Spawn one sub-agent per independent area. Works best when the paths do not depend on each other.</p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">3. Chain sub-agents in sequence</h3>
                <p className="text-[#333333] text-sm">"Use the code-reviewer sub-agent to find performance issues, then use the optimizer sub-agent to fix them." Each returns results that feed the next.</p>
              </div>
            </div>

            <div className="mt-6 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Failure mode to avoid:</strong> fanning out many sub-agents that each return long, detailed results. Every summary lands back in your main conversation, so a wide fan-out of verbose agents can consume as much context as it saved. Keep each sub-agent's return tight, and for sustained parallelism reach for git <code className="bg-gray-100 px-1 rounded">isolation: worktree</code> so concurrent agents do not fight over the same checkout.
              </p>
            </div>
          </div>
        </section>

        {/* Real example */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">A Real Example: a Cheap, Read-Only Doc Researcher</h2>
            <p className="text-lg text-[#333333] mb-6">
              Here is a sub-agent worth keeping in <code className="bg-gray-100 px-2 py-1 rounded text-sm">~/.claude/agents/</code>. It fetches and summarizes documentation in its own context, runs on Haiku to keep costs down, and is read-only so it can never touch your files.
            </p>
            <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative mb-6">
              <pre>{researcherAgent}</pre>
              <button
                onClick={() => copyToClipboard(researcherAgent, 'researcher')}
                className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
              >
                {copied === 'researcher' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[#333333] mb-4">
              Three things make this work, and they are the same three things that make any sub-agent work:
            </p>
            <ul className="space-y-2 text-[#333333] mb-6">
              <li><strong>A specific description.</strong> "Use for any task that would flood the main context" tells Claude exactly when to delegate.</li>
              <li><strong>A tight tool list.</strong> Read, Grep, Glob, WebFetch, WebSearch. No Write or Edit, so it is safe to run unattended.</li>
              <li><strong>A model that fits the job.</strong> Summarizing docs is not hard reasoning, so Haiku is plenty and far cheaper.</li>
            </ul>
            <p className="text-[#333333]">
              To invoke it explicitly rather than waiting for Claude to delegate, name it in your prompt ("Use the doc-researcher sub-agent to summarize the Stripe webhooks docs") or @-mention it to guarantee it runs.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">Common questions about Claude Code sub-agents</p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
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

        {/* Authority */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 text-center">Official Resources</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="https://code.claude.com/docs/en/sub-agents" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Claude Code Sub-Agents Docs</span>
              </a>
              <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Claude Code Documentation</span>
              </a>
            </div>
          </div>
        </section>

        {/* Hub links */}
        <section className="py-16 bg-[#F9F9F9] border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Keep Going With Claude Code</h2>
              <p className="text-lg text-[#333333] max-w-2xl mx-auto">
                Sub-agents are one piece of the extension stack. Start with the hub guide, then go deep on each part.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/claude-code-guide" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Guide (start here)</h3>
                <p className="text-sm text-[#666666]">The full hub: install, features, workflows, pricing.</p>
              </Link>
              <Link href="/claude-code-skills" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Skills</h3>
                <p className="text-sm text-[#666666]">Reusable workflows that run in your main context, not isolated.</p>
              </Link>
              <Link href="/claude-code-slash-commands" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Slash Commands</h3>
                <p className="text-sm text-[#666666]">Custom commands that often invoke a sub-agent.</p>
              </Link>
              <Link href="/claude-code-mcp-stack" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Minimum Viable MCP Stack</h3>
                <p className="text-sm text-[#666666]">Five MCP servers worth wiring into your agents.</p>
              </Link>
              <Link href="/claude-code-hooks-recipes" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Hooks Recipes</h3>
                <p className="text-sm text-[#666666]">Guardrails and validation you can scope to a sub-agent.</p>
              </Link>
              <Link href="/claude-md-playbook" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">CLAUDE.md Playbook</h3>
                <p className="text-sm text-[#666666]">The context every sub-agent loads at startup.</p>
              </Link>
              <Link href="/calculators/claude-plan-picker" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Plan Picker</h3>
                <p className="text-sm text-[#666666]">Find the cheapest plan that covers your usage.</p>
              </Link>
            </div>
            <div className="mt-10 text-center">
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Join the Prompt Writing Course
              </a>
              <p className="text-sm text-[#666666] mt-3">Learn to write the precise descriptions and prompts that make sub-agents delegate reliably.</p>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
