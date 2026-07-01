import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const GRADER_URL = '/prompt-grader'

const faqs = [
  {
    question: "What are slash commands in Claude Code?",
    answer: "Slash commands are shortcuts you type at the start of a message, beginning with a forward slash, to control Claude Code or trigger a saved workflow. Type / in the prompt to see every command available to you. There are two kinds: built-in commands like /clear, /compact, and /init that are coded into the CLI, and custom commands you create yourself as reusable prompt templates. A command is only recognized at the start of your message; any text after the command name is passed to it as an argument."
  },
  {
    question: "How do I create a custom slash command in Claude Code?",
    answer: "Create a markdown file in a .claude/commands/ folder (for example .claude/commands/review.md) and the file becomes the command /review. The file's contents are the prompt Claude runs when you invoke it. As of the 2026 docs, custom commands have been merged into skills, so the recommended modern path is .claude/skills/review/SKILL.md instead, which produces the same /review command but adds support for a directory of supporting files and richer frontmatter. Both forms still work and you do not have to migrate existing command files."
  },
  {
    question: "Where do project commands versus personal commands live?",
    answer: "Project commands live in .claude/commands/ or .claude/skills/ inside the repository, so they are committed to version control and shared with everyone on the team. Personal commands live in ~/.claude/commands/ or ~/.claude/skills/ in your home directory, so they follow you across every project on your machine. When a skill and a command share the same name, the skill takes precedence. When the same name exists at multiple scopes, personal overrides project."
  },
  {
    question: "How do I pass arguments to a custom slash command?",
    answer: "Put the placeholder $ARGUMENTS in your command file and it gets replaced with whatever you type after the command name. For example, if /fix-issue contains 'Fix GitHub issue $ARGUMENTS', then running /fix-issue 123 sends 'Fix GitHub issue 123' to Claude. For individual positional arguments use $1, $2 (or $ARGUMENTS[0], $ARGUMENTS[1]), and wrap multi-word values in quotes. You can also declare named arguments in the frontmatter using the arguments field."
  },
  {
    question: "What is the difference between a slash command and a skill?",
    answer: "They overlap. A custom slash command is a markdown file you invoke by typing /name. A skill is a SKILL.md file in its own directory that you can also invoke with /name, but Claude can additionally load it automatically when your request matches its description. In the current Claude Code, custom commands have been folded into skills: a file at .claude/commands/deploy.md and a skill at .claude/skills/deploy/SKILL.md both create /deploy and behave the same way when you type the command. Skills add optional features like supporting files, invocation control, and subagent execution."
  },
  {
    question: "Can Claude run a slash command automatically without me typing it?",
    answer: "Yes, for skills with a clear description. When a skill's description matches what you are asking for, Claude can load and run it on its own. If you want a command to be manual-only, for example a deploy or commit workflow where timing matters, add disable-model-invocation: true to the frontmatter so only you can trigger it by typing /name."
  },
  {
    question: "How do I run a shell command inside a custom slash command?",
    answer: "Use the inline syntax with an exclamation mark and backticks, such as !`git diff HEAD`, on its own line in the command file. Claude Code runs that shell command before the prompt is sent and replaces the placeholder with the command's output, so the prompt arrives with live data already inlined. This is preprocessing, not something Claude decides to do. It is how you ground a command in your actual working tree, like injecting the current diff into a commit-message command."
  },
  {
    question: "What built-in slash commands should I learn first?",
    answer: "Start with /clear to begin a fresh task while keeping project memory, /compact to shrink a long conversation that is filling the context window, /init to generate a starter CLAUDE.md, /plan to enter plan mode before a large change, /model to switch models, and /review or /security-review for a read-only pass before you ship. /context shows where your context window is going, and /agents and /mcp set up subagents and MCP servers. Type /help to see the full list available in your session."
  }
]

const builtInCommands = [
  { command: '/clear', purpose: 'Start a new conversation with empty context (project memory is kept). Use it when you switch to an unrelated task.' },
  { command: '/compact', purpose: 'Summarize the conversation so far to free up context when the window is filling up. Optionally pass focus instructions.' },
  { command: '/init', purpose: 'Generate a starter CLAUDE.md for the current repo so Claude has persistent project context.' },
  { command: '/plan', purpose: 'Enter plan mode before a large change. Pass a description to start immediately, e.g. /plan fix the auth bug.' },
  { command: '/model', purpose: 'Switch the active model and save it as your default. With no argument, opens a picker.' },
  { command: '/context', purpose: 'Visualize where your context window is being spent, with optimization suggestions.' },
  { command: '/agents', purpose: 'Open the manager for subagents Claude can delegate side tasks to.' },
  { command: '/mcp', purpose: 'Manage Model Context Protocol server connections and OAuth.' },
  { command: '/permissions', purpose: 'Manage allow, ask, and deny rules for tool permissions.' },
  { command: '/review', purpose: 'Review a pull request locally in your current session.' },
  { command: '/security-review', purpose: 'Analyze pending changes on the branch for security vulnerabilities like injection or data exposure.' },
  { command: '/skills', purpose: 'List the skills available in this session and hide ones you do not want Claude to use.' },
  { command: '/resume', purpose: 'Resume an earlier conversation by ID or name, or open the session picker.' },
  { command: '/doctor', purpose: 'Diagnose and verify your Claude Code installation and settings.' },
  { command: '/help', purpose: 'Show help and every command available to you.' }
]

const exampleCommandFiles = [
  {
    id: 'review-cmd',
    label: 'Code review command — .claude/commands/review.md',
    command: `---
description: Review the current diff for bugs, missing tests, and style issues
argument-hint: [optional focus area]
allowed-tools: Bash(git diff *) Read Grep
---

## Current changes
!\`git diff HEAD\`

## Your task
Review the changes above. Focus on $ARGUMENTS if provided.
Flag correctness bugs first, then missing tests, then style.
Quote the file and line for each issue. Do not edit anything.`
  },
  {
    id: 'commit-cmd',
    label: 'Commit command (manual-only) — .claude/skills/commit/SKILL.md',
    command: `---
description: Stage and commit the current changes with a clear message
disable-model-invocation: true
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)
---

## Current status
!\`git status --short\`

## Your task
Stage the relevant changes and write a commit message that
describes what changed and why. Use the format: <type>: <description>.
Do not push.`
  },
  {
    id: 'fix-issue-cmd',
    label: 'Fix-a-GitHub-issue command with arguments — .claude/commands/fix-issue.md',
    command: `---
description: Fix a GitHub issue by number, following our coding standards
argument-hint: [issue-number]
---

Fix GitHub issue $ARGUMENTS following our coding standards.

1. Read the issue with: gh issue view $ARGUMENTS
2. Find the relevant files and understand the requirements
3. Implement the fix
4. Add or update tests
5. Stop before committing so I can review`
  },
  {
    id: 'new-page-cmd',
    label: 'Scaffold-a-new-page command (positional args) — .claude/commands/new-page.md',
    command: `---
description: Scaffold a new Next.js page from our template
argument-hint: [slug] [title]
---

Create a new page at pages/$1.js titled "$2".
Match the structure and Tailwind classes of pages/claude-code-guide.js:
Head with title and meta description, a Layout wrapper,
a hero section, and an FAQ block. Use the brand colors
#1A1A1A, #FFDE59, and #F9F9F9.`
  }
]

const frontmatterFields = [
  { field: 'description', use: 'What the command does and when to use it. Claude reads this to decide when to load a skill automatically. Recommended on every command.' },
  { field: 'argument-hint', use: 'A hint shown in autocomplete for the arguments the command expects, e.g. [issue-number] or [filename] [format].' },
  { field: 'allowed-tools', use: 'Tools Claude may use without asking for permission while this command is active, e.g. Bash(git diff *) Read Grep.' },
  { field: 'disable-model-invocation', use: 'Set to true so only you can trigger the command by typing /name. Use it for workflows with side effects like deploy or commit.' },
  { field: 'arguments', use: 'Declare named positional arguments so you can use $name placeholders instead of $1 and $2 in the command body.' },
  { field: 'model', use: 'Force a specific model while the command runs, then return to your session model on the next prompt.' }
]

export default function ClaudeCodeSlashCommands() {
  const [copied, setCopied] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Code Slash Commands: Built-In and Custom Commands (2026)',
    description: 'A practical guide to Claude Code slash commands. Covers the built-in commands, how to create custom slash commands as reusable prompt templates, arguments, frontmatter, and when to use each.',
    url: 'https://promptwritingstudio.com/claude-code-slash-commands',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['claude code slash commands', 'custom slash commands claude code', 'claude code commands', 'claude code custom commands', '.claude/commands', 'claude code skills']
  })

  return (
    <>
      <Head>
        <title>Claude Code Slash Commands: Built-In and Custom Commands (2026) | PromptWritingStudio</title>
        <meta name="description" content="A practical guide to Claude Code slash commands. Learn the built-in commands, how to create custom slash commands as reusable prompt templates, how arguments and frontmatter work, and when to use each." />
        <meta name="keywords" content="claude code slash commands, custom slash commands claude code, claude code commands, claude code custom commands, .claude/commands, claude code skills" />
        <meta property="og:title" content="Claude Code Slash Commands: Built-In and Custom Commands (2026)" />
        <meta property="og:description" content="Built-in slash commands plus copy-paste templates for creating your own custom Claude Code commands, with arguments, frontmatter, and shell injection." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-code-slash-commands" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-slash-commands" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <Layout>
        {/* Hero */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Code Slash Commands
              <span className="block text-[#FFDE59]">Built-In and Custom Commands</span>
            </h1>

            {/* AEO answer block */}
            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Claude Code slash commands are shortcuts you type at the start of a message, beginning with a forward slash, to control the tool or trigger a saved workflow. There are built-in commands like <code>/clear</code>, <code>/compact</code>, and <code>/init</code> coded into the CLI, and custom commands you create yourself as reusable prompt templates. You make a custom command by saving a markdown file in a <code>.claude/commands/</code> folder (or a <code>SKILL.md</code> in <code>.claude/skills/</code>): the file becomes the command, and its contents become the prompt Claude runs.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              The fastest win in Claude Code is turning a prompt you keep retyping into a one-word command. This guide shows the built-in commands worth knowing and gives you copy-paste templates for your own.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#custom" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Build a Custom Command
              </a>
              <a href="#built-in" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                See Built-In Commands
              </a>
            </div>
          </div>
        </section>

        {/* What they are */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              What Are Slash Commands in Claude Code?
            </h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                A slash command is a shortcut you type at the start of a message in Claude Code. Type <code className="bg-gray-100 px-2 py-1 rounded text-sm">/</code> on its own to see every command available in your session, or type <code className="bg-gray-100 px-2 py-1 rounded text-sm">/</code> followed by letters to filter. A command is only recognized at the start of your message; anything you type after the command name is handed to it as an argument.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                There are two kinds. <strong>Built-in commands</strong> like <code className="bg-gray-100 px-2 py-1 rounded text-sm">/clear</code> and <code className="bg-gray-100 px-2 py-1 rounded text-sm">/compact</code> have their behavior coded into the CLI. <strong>Custom commands</strong> are reusable prompt templates you write yourself, so a prompt you keep retyping becomes a single word.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                One change matters in 2026: custom commands have been merged into skills. A file at <code className="bg-gray-100 px-2 py-1 rounded text-sm">.claude/commands/deploy.md</code> and a skill at <code className="bg-gray-100 px-2 py-1 rounded text-sm">.claude/skills/deploy/SKILL.md</code> both create <code className="bg-gray-100 px-2 py-1 rounded text-sm">/deploy</code> and work the same way. Your existing command files keep working, so there is nothing to migrate. The skill form just adds extras: a folder for supporting files, richer frontmatter, and the option for Claude to run the command automatically when your request matches it.
              </p>
            </div>
          </div>
        </section>

        {/* Built-in commands */}
        <section id="built-in" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              The Built-In Slash Commands Worth Knowing
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Claude Code ships with dozens of built-in commands. You do not need to memorize them all. These are the ones that earn their place in a daily workflow. Type <code className="bg-gray-100 px-2 py-1 rounded text-sm">/help</code> to see the full list in your session.
            </p>

            <div className="space-y-3">
              {builtInCommands.map((c) => (
                <div key={c.command} className="bg-white p-4 rounded-lg border border-gray-200 md:flex md:items-start">
                  <code className="text-sm font-mono text-[#1A1A1A] font-bold bg-gray-100 px-3 py-1 rounded inline-block mb-2 md:mb-0 md:mr-4 md:w-44 flex-shrink-0">{c.command}</code>
                  <p className="text-[#333333] flex-1">{c.purpose}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>The two you will reach for most:</strong> <code>/clear</code> when you move to an unrelated task so old context stops confusing Claude, and <code>/compact</code> when a long session is eating your context window but you still need the thread.
              </p>
            </div>
          </div>
        </section>

        {/* Custom commands — the core */}
        <section id="custom" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              How to Create a Custom Slash Command
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              A custom command is just a markdown file. The file name becomes the command, and the file body becomes the prompt Claude runs. Here is the whole process in three steps.
            </p>

            <div className="space-y-6">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">1</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Create the commands folder</h3>
                    <p className="text-[#333333] mb-3">
                      Use <code className="bg-gray-100 px-2 py-1 rounded text-sm">.claude/commands/</code> inside your project for team-shared commands, or <code className="bg-gray-100 px-2 py-1 rounded text-sm">~/.claude/commands/</code> in your home directory for personal commands that follow you everywhere.
                    </p>
                    <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm relative">
                      <code>mkdir -p .claude/commands</code>
                      <button onClick={() => copyToClipboard('mkdir -p .claude/commands', 'mk')} className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded">
                        {copied === 'mk' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">2</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Write a markdown file named after the command</h3>
                    <p className="text-[#333333]">
                      A file at <code className="bg-gray-100 px-2 py-1 rounded text-sm">.claude/commands/review.md</code> becomes the command <code className="bg-gray-100 px-2 py-1 rounded text-sm">/review</code>. Put the prompt you want Claude to run inside the file. That is the minimum: a file with a name and a prompt is a working command.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">3</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Invoke it by typing the slash</h3>
                    <p className="text-[#333333]">
                      Type <code className="bg-gray-100 px-2 py-1 rounded text-sm">/review</code> and Claude runs the file as a prompt. New files are picked up at the start of a session, or you can run <code className="bg-gray-100 px-2 py-1 rounded text-sm">/reload-skills</code> to pick up a command you just added without restarting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>The before/after that makes this worth it:</strong> the weak version is opening every session and pasting "review my uncommitted changes, flag bugs first, then missing tests, then style, and quote the file and line for each issue." The strong version is typing <code>/review</code>. Same prompt, zero retyping, identical every time, shared with your whole team through git.
              </p>
            </div>
          </div>
        </section>

        {/* Templates */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Copy-Paste Custom Command Templates
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Four commands that pull their weight. Copy one, drop it in your <code>.claude/commands/</code> or <code>.claude/skills/</code> folder, and adapt the prompt to your project.
              </p>
            </div>

            <div className="space-y-4">
              {exampleCommandFiles.map((ex) => (
                <div key={ex.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex justify-between items-center px-6 py-3 bg-gray-100 border-b border-gray-200">
                    <span className="font-semibold text-[#1A1A1A] text-sm">{ex.label}</span>
                    <button onClick={() => copyToClipboard(ex.command, ex.id)} className="text-sm font-medium px-3 py-1 rounded bg-[#FFDE59] text-[#1A1A1A] hover:bg-[#E5C84F] transition-colors duration-200 flex-shrink-0 ml-3">
                      {copied === ex.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="px-6 py-4 bg-[#1A1A1A] overflow-x-auto">
                    <pre className="text-green-400 font-mono text-sm whitespace-pre">{ex.command}</pre>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Common failure mode:</strong> putting a destructive workflow like deploy or commit in a normal command and letting Claude run it on its own. Add <code>disable-model-invocation: true</code> to the frontmatter (as in the commit template above) so only you can trigger it by typing the command. You never want Claude deciding to deploy because the code "looks ready."
              </p>
            </div>
          </div>
        </section>

        {/* Arguments */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              How Arguments Work
            </h2>
            <p className="text-lg text-[#333333] mb-6">
              Arguments turn a static command into a flexible one. Anything you type after the command name is passed in, and you control where it lands using placeholders.
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-[#F9F9F9] p-5 rounded-lg border border-gray-200">
                <code className="text-sm font-mono text-[#1A1A1A] font-bold">$ARGUMENTS</code>
                <p className="text-[#333333] mt-1">The full string of everything you typed after the command. Running <code>/fix-issue 123</code> on a file containing "Fix issue $ARGUMENTS" sends "Fix issue 123."</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border border-gray-200">
                <code className="text-sm font-mono text-[#1A1A1A] font-bold">$1, $2 (or $ARGUMENTS[0], $ARGUMENTS[1])</code>
                <p className="text-[#333333] mt-1">Individual positional arguments. Running <code>/migrate SearchBar React Vue</code> maps to $1 = SearchBar, $2 = React, $3 = Vue. Wrap multi-word values in quotes to keep them as one argument.</p>
              </div>
              <div className="bg-[#F9F9F9] p-5 rounded-lg border border-gray-200">
                <code className="text-sm font-mono text-[#1A1A1A] font-bold">Named arguments</code>
                <p className="text-[#333333] mt-1">Declare an <code>arguments</code> list in the frontmatter, then reference them by name like <code>$issue</code> and <code>$branch</code> instead of by position.</p>
              </div>
            </div>

            <p className="text-lg text-[#333333]">
              If you invoke a command with arguments but the file has no placeholder, Claude Code appends <code className="bg-gray-100 px-2 py-1 rounded text-sm">ARGUMENTS: your input</code> to the end so your text is still seen.
            </p>
          </div>
        </section>

        {/* Frontmatter */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              Frontmatter Fields That Control a Command
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              The YAML block at the top of a command file (between <code>---</code> markers) configures how the command behaves. All fields are optional, but <code>description</code> is the one to always include so Claude knows what the command is for.
            </p>

            <div className="space-y-3">
              {frontmatterFields.map((f) => (
                <div key={f.field} className="bg-white p-4 rounded-lg border border-gray-200 md:flex md:items-start">
                  <code className="text-sm font-mono text-[#1A1A1A] font-bold bg-gray-100 px-3 py-1 rounded inline-block mb-2 md:mb-0 md:mr-4 md:w-56 flex-shrink-0">{f.field}</code>
                  <p className="text-[#333333] flex-1">{f.use}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* When to use */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              When to Use a Slash Command (and When Not To)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Make it a command when</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li>You keep pasting the same prompt or checklist.</li>
                  <li>A workflow has fixed, ordered steps (review, commit, scaffold a file).</li>
                  <li>You want your team to do the same thing the same way every time.</li>
                  <li>The prompt should pull in live data, like the current git diff.</li>
                </ul>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Skip the command when</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li>It is a one-off request you will not repeat.</li>
                  <li>The task is exploratory and changes shape every time.</li>
                  <li>A built-in command already does it (do not rebuild <code>/compact</code>).</li>
                  <li>It is standing project context — that belongs in CLAUDE.md, not a command.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Rule of thumb:</strong> if you have typed roughly the same instruction three times, turn it into a command. The whole point of a custom slash command is repeatability, so the payoff scales with how often you run it.
              </p>
            </div>
          </div>
        </section>

        {/* Course CTA */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Write Commands That Actually Work
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              A slash command is only as good as the prompt inside it. Vague instructions produce vague results no matter how you trigger them. PromptWritingStudio teaches the prompt-writing fundamentals — specificity, context, and structure — that make every command, skill, and AI workflow you build pull its weight.
            </p>
            <a href={GRADER_URL} className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
              Grade Your Prompt Free
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#333333] text-center mb-12">
              Common questions about Claude Code slash commands
            </p>

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

        {/* Authority links */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
              Official Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="https://code.claude.com/docs/en/commands" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Built-In Commands Reference</span>
              </a>
              <a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Skills and Custom Commands</span>
              </a>
              <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Claude Code Documentation</span>
              </a>
              <a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Claude Code on GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* Claude Code hub */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                More Claude Code Resources
              </h2>
              <p className="text-lg text-[#333333] max-w-2xl mx-auto">
                Slash commands are one piece. Here is the rest of the toolkit for working with Claude Code day to day.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/claude-code-guide" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Guide</h3>
                <p className="text-sm text-[#666666]">The full hub — install, features, workflows, pricing, and daily-use tips.</p>
              </Link>
              <Link href="/claude-code-sub-agents" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Sub-Agents</h3>
                <p className="text-sm text-[#666666]">The isolated agents your custom commands can hand work off to.</p>
              </Link>
              <Link href="/skills-vs-mcp-vs-hooks" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Skills vs MCP vs Hooks</h3>
                <p className="text-sm text-[#666666]">When a command should be a skill, an MCP server, or a hook instead.</p>
              </Link>
              <Link href="/claude-code-hooks-recipes" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Hooks Recipes</h3>
                <p className="text-sm text-[#666666]">Working hooks for the rules you never want Claude to "decide" about.</p>
              </Link>
              <Link href="/claude-md-playbook" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">CLAUDE.md Playbook</h3>
                <p className="text-sm text-[#666666]">Where standing project context belongs, instead of in a command.</p>
              </Link>
              <Link href="/claude-code-mcp-stack" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Minimum Viable MCP Stack</h3>
                <p className="text-sm text-[#666666]">Five MCP servers worth wiring into Claude Code, with copy-paste config.</p>
              </Link>
              <Link href="/calculators/claude-plan-picker" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Plan Picker</h3>
                <p className="text-sm text-[#666666]">Find the cheapest Claude plan that fits how much you actually use.</p>
              </Link>
            </div>

            <div className="mt-10 text-center">
              <Link href="/chatgpt-prompt-templates" className="inline-flex items-center text-[#1A1A1A] font-semibold underline hover:no-underline">
                Browse all prompt templates →
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
