import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "What are hooks in Claude Code?",
    answer: "Hooks are shell commands that Claude Code runs automatically at specific points in a session — for example, every time Claude writes to a file, before it runs a bash command, or when you submit a prompt. They are configured in your settings.json under the hooks key. Claude does not choose whether to run them; the runtime does. That makes them useful for enforcing rules that you never want Claude to 'decide' about."
  },
  {
    question: "Where do I configure hooks?",
    answer: "Hooks live in settings.json. User-level hooks at ~/.claude/settings.json apply to every project. Project-level hooks at .claude/settings.json apply only to that repo and can be checked into git so the whole team gets them. Claude Code merges both; project hooks run in addition to user hooks."
  },
  {
    question: "What events can I hook into?",
    answer: "The main events are PreToolUse (before Claude runs a tool like Bash or Edit), PostToolUse (after a tool succeeds), UserPromptSubmit (when you send a new message), Notification (when Claude needs your attention), and Stop/SubagentStop (when a turn ends). Each event gets the relevant context on stdin as JSON."
  },
  {
    question: "Can a hook block Claude from doing something?",
    answer: "Yes. A PreToolUse hook that exits with code 2 blocks the tool call and feeds its stderr back to Claude as guidance. That is how you stop Claude from running rm -rf, committing to main, or writing to files that should be generated. Exit 0 allows the call. Any other exit code is shown to the user but does not block."
  },
  {
    question: "Do hooks slow Claude down?",
    answer: "A little. Every PreToolUse hook runs before Claude's tool call and every PostToolUse hook runs after. For fast commands (formatters, linters on a single file) the overhead is negligible. For slow commands (full test suites, type-checking the whole repo) it adds up, so scope the work — for example, only lint the file that was just edited."
  },
  {
    question: "Can hooks read what Claude is about to do?",
    answer: "Yes. Claude Code passes the full tool call payload on stdin as JSON, so your hook can read the file path, the bash command, or the edit diff before deciding to allow or block. Most of the recipes below are just jq one-liners against that payload."
  },
  {
    question: "Where do hooks fit compared to slash commands and MCP?",
    answer: "Hooks run automatically without Claude's input and can block actions. Slash commands are prompts you invoke manually — they run when you type /name. MCP servers expose new tools Claude can call. Use hooks for guardrails and automation. Use slash commands for reusable workflows. Use MCP to give Claude capabilities it does not have built-in."
  },
  {
    question: "Are hooks safe to share in a team?",
    answer: "Yes — if you keep them simple and read-only where possible. Commit project-level hooks to .claude/settings.json so every teammate gets the same guardrails. Avoid hooks that depend on a specific developer's shell setup or absolute paths; use tools that are already on the project's PATH (eslint, pytest, gofmt, ruff) so they work the same on everyone's machine."
  }
]

const recipes = [
  {
    id: 'auto-format',
    title: 'Auto-format files after Claude writes them',
    event: 'PostToolUse',
    matcher: 'Write|Edit',
    why: 'Claude occasionally ignores your formatter rules mid-flow. This closes the loop automatically — every saved file gets formatted before Claude (or you) sees the next state. No drift, no lint PRs.',
    config: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs -I{} npx prettier --write {}"
          }
        ]
      }
    ]
  }
}`
  },
  {
    id: 'block-dangerous',
    title: 'Block destructive bash commands',
    event: 'PreToolUse',
    matcher: 'Bash',
    why: 'Catch rm -rf, force-pushes to main, and DROP TABLE before Claude runs them. Exit 2 blocks the call and tells Claude why, so it can try a safer approach on the next turn.',
    config: `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "cmd=$(jq -r '.tool_input.command'); if echo \\"$cmd\\" | grep -qE 'rm -rf /|git push --force.*main|DROP TABLE'; then echo 'Blocked destructive command' >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}`
  },
  {
    id: 'test-on-save',
    title: 'Run tests for the file Claude just edited',
    event: 'PostToolUse',
    matcher: 'Write|Edit',
    why: 'Instead of waiting until the end of a session to find out a change broke something, run the targeted test file the moment Claude saves. Fast feedback, no full-suite cost.',
    config: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "file=$(jq -r '.tool_input.file_path'); test=\\"\${file%.js}.test.js\\"; if [ -f \\"$test\\" ]; then npx jest \\"$test\\" --silent || exit 2; fi"
          }
        ]
      }
    ]
  }
}`
  },
  {
    id: 'protect-paths',
    title: 'Protect generated and read-only paths',
    event: 'PreToolUse',
    matcher: 'Write|Edit',
    why: 'Generated code (protobuf output, prisma client, build artefacts) should never be edited by hand. This hook refuses writes to those paths and tells Claude to regenerate instead.',
    config: `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "path=$(jq -r '.tool_input.file_path'); if echo \\"$path\\" | grep -qE '/(dist|build|generated|\\\\.next)/'; then echo 'Do not hand-edit generated code. Regenerate via the appropriate build command instead.' >&2; exit 2; fi"
          }
        ]
      }
    ]
  }
}`
  },
  {
    id: 'prompt-logger',
    title: 'Log every prompt you send',
    event: 'UserPromptSubmit',
    matcher: '',
    why: 'Keep a running log of what you asked Claude to do, timestamped. Useful for post-mortems, for writing up what you shipped at the end of the day, or for spotting prompts you could turn into slash commands.',
    config: `{
  "hooks": {
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "mkdir -p ~/.claude/logs && jq -r '\\"[\\\\(.timestamp // now | todate)] \\\\(.prompt)\\"' >> ~/.claude/logs/prompts.log"
          }
        ]
      }
    ]
  }
}`
  },
  {
    id: 'desktop-notify',
    title: 'Desktop notification when Claude needs you',
    event: 'Notification',
    matcher: '',
    why: 'When Claude is waiting on a permission prompt or a long task is done, you want to know without staring at the terminal. This triggers a macOS notification; swap for notify-send on Linux.',
    config: `{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "msg=$(jq -r '.message // \\"Claude Code needs attention\\"'); osascript -e \\"display notification \\\\\\"$msg\\\\\\" with title \\\\\\"Claude Code\\\\\\"\\""
          }
        ]
      }
    ]
  }
}`
  },
  {
    id: 'typecheck-touched',
    title: 'Type-check only the files Claude touched',
    event: 'PostToolUse',
    matcher: 'Write|Edit',
    why: 'Full tsc --noEmit on a big repo takes 30+ seconds. Scoping it to the file Claude just changed keeps the feedback loop tight while still catching type errors before you ask Claude to commit.',
    config: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "file=$(jq -r '.tool_input.file_path'); case \\"$file\\" in *.ts|*.tsx) npx tsc --noEmit --skipLibCheck \\"$file\\" 2>&1 || exit 2 ;; esac"
          }
        ]
      }
    ]
  }
}`
  },
  {
    id: 'enforce-branch',
    title: 'Block commits to protected branches',
    event: 'PreToolUse',
    matcher: 'Bash',
    why: 'Never let Claude (or a distracted you) commit straight to main. This hook checks the current branch before any git commit and refuses if it is on a protected branch.',
    config: `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "cmd=$(jq -r '.tool_input.command'); if echo \\"$cmd\\" | grep -qE '^git commit'; then branch=$(git rev-parse --abbrev-ref HEAD); case \\"$branch\\" in main|master|production) echo \\"Refusing to commit directly to $branch. Create a branch first.\\" >&2; exit 2 ;; esac; fi"
          }
        ]
      }
    ]
  }
}`
  }
]

export default function ClaudeCodeHooksRecipes() {
  const [copiedId, setCopiedId] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Code Hooks: 8 Recipes That Catch Mistakes Before They Ship',
    description: 'Practical Claude Code hook configurations you can copy into settings.json today. Auto-format, block destructive commands, run tests on save, protect generated paths, and more.',
    url: 'https://promptwritingstudio.com/claude-code-hooks-recipes',
    datePublished: '2026-03-20',
    dateModified: '2026-04-17',
    keywords: ['Claude Code hooks', 'claude code settings.json', 'claude code PreToolUse', 'claude code PostToolUse', 'claude code automation']
  })

  return (
    <>
      <Head>
        <title>Claude Code Hooks: 8 Recipes That Catch Mistakes Before They Ship | PromptWritingStudio</title>
        <meta name="description" content="Eight Claude Code hook configurations you can paste into settings.json. Auto-format on save, block destructive commands, run scoped tests, protect generated files, and more." />
        <meta name="keywords" content="Claude Code hooks, claude code settings, PreToolUse, PostToolUse, claude code automation, claude code guardrails" />
        <meta property="og:title" content="Claude Code Hooks: 8 Recipes That Catch Mistakes Before They Ship" />
        <meta property="og:description" content="Copy-paste Claude Code hooks for formatting, blocking destructive commands, running tests on save, protecting generated paths, and more." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-code-hooks-recipes" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-hooks-recipes" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: April 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Code Hooks
              <span className="block text-[#FFDE59]">8 recipes that save you from yourself</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Hooks are shell commands Claude Code runs automatically at set points in a session — before a tool call, after an edit, when a turn ends. They do not negotiate. They run. That makes them the right place to enforce rules you do not want Claude (or a sleepy version of you) to decide about: blocking destructive commands, formatting on save, running targeted tests, protecting generated files.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Every recipe below is copy-paste ready. Drop it into <code className="bg-white/10 px-2 py-0.5 rounded">~/.claude/settings.json</code> or your project's <code className="bg-white/10 px-2 py-0.5 rounded">.claude/settings.json</code> and restart Claude Code.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#recipes" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Jump to recipes
              </a>
              <a href="#basics" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Start with the basics
              </a>
            </div>
          </div>
        </section>

        <section id="basics" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">How hooks actually work</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-5">
                A hook is an entry in <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">settings.json</code> that binds a shell command to a Claude Code event. When the event fires, Claude Code executes your command with the event's payload piped to stdin as JSON. Your command can inspect that payload, do work, and exit.
              </p>
              <p className="text-lg text-[#333333] mb-5">
                Exit codes determine what happens next. <strong>Exit 0</strong> means "continue as normal." <strong>Exit 2</strong> on a <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">PreToolUse</code> hook blocks the tool call and feeds your stderr back to Claude as guidance. Any other non-zero exit is surfaced to you but does not block the run.
              </p>
              <p className="text-lg text-[#333333] mb-5">
                The events you will use most:
              </p>
              <ul className="text-lg text-[#333333] space-y-2 mb-5">
                <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">PreToolUse</code> — before Claude runs a tool (Bash, Edit, Write). This is where guardrails live.</li>
                <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">PostToolUse</code> — after a tool succeeds. This is where formatters, linters, and targeted tests live.</li>
                <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">UserPromptSubmit</code> — when you send a new prompt. Useful for logging and for rewriting your input.</li>
                <li><code className="bg-gray-100 px-2 py-0.5 rounded text-sm">Notification</code> — when Claude needs your attention (permissions, long task done). Good for desktop notifications.</li>
              </ul>
              <p className="text-lg text-[#333333]">
                You can scope most hooks with a <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">matcher</code> regex so they only fire for specific tools (for example, <code className="bg-gray-100 px-2 py-0.5 rounded text-sm">Write|Edit</code> to skip Bash calls). All the recipes below use that.
              </p>
            </div>
          </div>
        </section>

        <section id="recipes" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">The recipes</h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Every one of these is running on at least one of my projects. Start with one or two that solve an actual pain point — adding them all at once is the fastest way to slow Claude Code to a crawl.
              </p>
            </div>

            <div className="space-y-8">
              {recipes.map((recipe, i) => (
                <div key={recipe.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-[#FFDE59]/30 text-[#1A1A1A] text-xs font-bold px-2 py-1 rounded-full">#{i + 1}</span>
                      <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">{recipe.event}</span>
                      {recipe.matcher && (
                        <span className="bg-gray-100 text-gray-700 text-xs font-mono px-2 py-1 rounded-full">matcher: {recipe.matcher}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{recipe.title}</h3>
                    <p className="text-[#333333]">{recipe.why}</p>
                  </div>
                  <div className="relative">
                    <pre className="bg-[#1A1A1A] text-green-400 p-6 overflow-x-auto font-mono text-sm leading-relaxed">{recipe.config}</pre>
                    <button
                      onClick={() => copyToClipboard(recipe.config, recipe.id)}
                      className="absolute top-4 right-4 bg-[#FFDE59] text-[#1A1A1A] text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#E5C84F] transition"
                    >
                      {copiedId === recipe.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">A few hard-won lessons</h2>
            <div className="space-y-5">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Scope your slow hooks</h3>
                <p className="text-[#333333]">A hook that runs the whole test suite on every save will kill your flow. Target the specific file Claude just changed, or move the slow check to a git pre-push hook instead.</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Write stderr messages Claude can act on</h3>
                <p className="text-[#333333]">When you exit 2 to block something, the stderr goes back to Claude. "Blocked" is useless. "Do not edit generated code in /dist; regenerate via npm run build" tells Claude what to do next.</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Prefer tools that are already on PATH</h3>
                <p className="text-[#333333]">Hooks that depend on a specific developer's setup (a custom alias, a homebrew-only tool, a personal script) will break for teammates. Stick to tools checked into the repo or installed via the project's package manager.</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Commit project hooks. Keep personal hooks personal.</h3>
                <p className="text-[#333333]">Team guardrails belong in <code className="bg-white px-2 py-0.5 rounded text-sm">.claude/settings.json</code> so everyone gets them. Personal niceties (desktop notifications, prompt logging) belong in <code className="bg-white px-2 py-0.5 rounded text-sm">~/.claude/settings.json</code> so you do not inflict them on teammates.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">Questions that keep coming up when people first set up hooks.</p>
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
              Hooks are the middle layer. What connects to them?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Hooks, slash commands, MCP servers, CLAUDE.md — it is easy to confuse what each one does and when to reach for it. The decision-tree guide maps them against real tasks so you know which layer to extend next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/skills-vs-mcp-vs-hooks" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Skills vs MCP vs Hooks
              </Link>
              <Link href="/claude-md-playbook" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Read the CLAUDE.md Playbook
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
