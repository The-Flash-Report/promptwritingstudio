import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "What is MCP in Claude Code?",
    answer: "MCP (Model Context Protocol) is an open standard Anthropic released for connecting LLMs to external tools and data sources. An MCP server exposes capabilities — file access, API calls, database queries — that Claude can call during a session. Claude Code ships with a client; you add servers by editing .mcp.json or .claude/settings.json. Think of MCP as 'npm for AI tools' — reusable capability packages you bolt onto Claude."
  },
  {
    question: "Why not install every MCP server?",
    answer: "Every server you connect ships its tool definitions into Claude's context on every turn. That means more tokens per call (cost) and less room for your actual work (context window). A bloated MCP stack also increases the chance Claude picks the wrong tool for the job. The right move is the smallest stack that covers 90% of your workflow."
  },
  {
    question: "How much context do MCP servers use?",
    answer: "Typical tool schemas are 500-2000 tokens per server. A 10-server stack can eat 10-15K tokens of context before you send a single message. On Sonnet 4.6's 1M context that is fine; on Haiku's 200K you notice it. The bigger cost is cognitive load on the model — more tools means more wrong-tool picks."
  },
  {
    question: "Where do I configure MCP servers?",
    answer: "Three layers. The user-level file at ~/.claude.json applies to every project. The project-level .mcp.json (checked into git) applies to everyone on the repo. The per-project .claude/settings.json overrides. Claude Code merges all three on startup. For team servers that everyone needs (shared database, company GitHub), use .mcp.json so it's version-controlled."
  },
  {
    question: "Are MCP servers safe?",
    answer: "They run with your user permissions, so a malicious server can read your files and call your APIs. Two habits: (1) only install servers from sources you trust — the official @modelcontextprotocol/* packages, well-known vendors, your own code; (2) review what tools each server exposes before approving it. Claude Code prompts before the first tool call from a new server."
  },
  {
    question: "What is the difference between MCP and a slash command?",
    answer: "A slash command is a named prompt you invoke manually (e.g. /commit). MCP servers expose tools Claude can call autonomously when it decides they help. Slash commands are prompts; MCP gives Claude new capabilities. Use slash commands for reusable workflows you trigger yourself; use MCP for capabilities you want Claude to reach for on its own."
  },
  {
    question: "Can I write my own MCP server?",
    answer: "Yes — it is a small, stable spec. Anthropic publishes reference implementations in TypeScript and Python that you can fork. A 'hello world' MCP server is about 40 lines of code. The real work is designing the tool surface: each tool needs a clear name, description, and JSON schema so Claude picks the right one at the right time."
  },
  {
    question: "Where do I find the official MCP server list?",
    answer: "The canonical directory is github.com/modelcontextprotocol/servers — Anthropic and community maintainers curate reference servers there. The official site at modelcontextprotocol.io has the spec. Avoid random 'awesome-mcp' listicles that have not been updated in three months; the ecosystem moves fast and broken servers pile up in those lists."
  }
]

const stack = [
  {
    id: 'filesystem',
    name: 'filesystem',
    package: '@modelcontextprotocol/server-filesystem',
    category: 'Essential',
    tokensEstimate: '~1,200',
    why: 'Claude Code can already read and edit files in your project root. Filesystem MCP extends that to arbitrary paths on your machine — Downloads, Documents, a sibling project, wherever. If you work across more than one repo or reference docs outside the project, you need this.',
    killer: 'Pulling a CSV from ~/Downloads and having Claude merge it into the project without copying files around.',
    useWhen: 'You routinely work across multiple project directories or reference data stored outside your codebase.',
    dropWhen: 'You only ever work inside a single repo. Claude Code\'s built-in tools already handle that.',
    config: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/you/src",
        "/Users/you/Downloads"
      ]
    }
  }
}`
  },
  {
    id: 'github',
    name: 'github',
    package: '@modelcontextprotocol/server-github',
    category: 'Essential',
    tokensEstimate: '~1,800',
    why: 'Reading PR discussions, searching issues, and checking CI status without tab-switching to github.com. Claude pulls context directly from the API — including issue bodies, PR review comments, and Actions logs — which means it can answer "why did this fail?" without you copy-pasting stack traces.',
    killer: 'Asking Claude to look at the last three failed Actions runs across five repos and tell you what broke. With the gh CLI you\'d write a script; here Claude just queries.',
    useWhen: 'You ship to GitHub regularly and want Claude to read PRs, issues, and CI without you being the clipboard.',
    dropWhen: 'You host on GitLab or Bitbucket exclusively — look for equivalent community servers instead.',
    config: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}`
  },
  {
    id: 'playwright',
    name: 'playwright',
    package: '@playwright/mcp',
    category: 'Task-specific',
    tokensEstimate: '~2,500',
    why: 'Full browser automation as MCP tools — navigate, click, fill forms, screenshot, extract text. Claude stops guessing how the page behaves and actually drives it. For web scraping, end-to-end testing, or verifying a deployed change looks right, this replaces hours of manual QA.',
    killer: 'Asking Claude to "check all my live sites render the H1 correctly" and watching it open each one, extract the H1, and report back. Five minutes instead of an afternoon.',
    useWhen: 'You do web QA, scraping, or automation as part of your workflow. Web developers, SEO operators, anyone running multiple sites.',
    dropWhen: 'You work on pure-backend or CLI projects with no browser dimension. The context overhead is not worth it.',
    config: `{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}`
  },
  {
    id: 'postgres',
    name: 'postgres (or sqlite)',
    package: '@modelcontextprotocol/server-postgres',
    category: 'Task-specific',
    tokensEstimate: '~1,500',
    why: 'Read-only SQL access to your actual database. Claude runs queries, reads schemas, and can explain your data instead of guessing from model files. Pair with a read-only user and you can safely let Claude explore production data to diagnose issues or draft migrations.',
    killer: 'Asking "how many users signed up last week and what\'s their churn rate?" and getting the answer in one turn, grounded in real rows rather than hallucinated.',
    useWhen: 'Your project has a real database (Postgres, MySQL, SQLite) and you want Claude to reason about data, not just code.',
    dropWhen: 'Your data is static JSON or flat files — just have Claude read them directly.',
    config: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://readonly:pw@localhost:5432/mydb"
      ]
    }
  }
}`
  },
  {
    id: 'sequential-thinking',
    name: 'sequential-thinking',
    package: '@modelcontextprotocol/server-sequential-thinking',
    category: 'Meta',
    tokensEstimate: '~800',
    why: 'Gives Claude an explicit "think" tool that forces step-by-step reasoning into the turn. Useful on hard debugging, architectural decisions, or when Claude is jumping to a solution too fast. You see Claude\'s reasoning chain as tool calls in the transcript, which makes it easier to spot where the logic went sideways.',
    killer: 'A gnarly production bug Claude keeps mis-diagnosing. Turn on sequential-thinking and ask the same question — Claude slows down, walks the logic, and usually lands it.',
    useWhen: 'You regularly hit complex reasoning tasks where Claude rushes. Debugging, architecture, trade-off analysis.',
    dropWhen: 'You mostly do routine edits. For simple tasks this just adds noise to the transcript.',
    config: `{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}`
  }
]

const dropped = [
  {
    name: 'Slack / Discord / Linear MCPs',
    reason: 'In theory Claude posts status updates. In practice the workflows that matter (filing an incident, closing a ticket) still need human review. You save nothing and add an OAuth flow.'
  },
  {
    name: 'Time / date / calendar servers',
    reason: 'Claude can compute dates. You do not need an MCP server to tell it today is Tuesday. Adds context for zero benefit.'
  },
  {
    name: 'puppeteer (superseded)',
    reason: 'Playwright MCP is strictly better — same surface, more reliable selectors, better screenshot handling. Pick Playwright.'
  },
  {
    name: 'memory / vector stores',
    reason: 'CLAUDE.md is your memory. A project-level MCP "memory" server duplicates what a well-written CLAUDE.md does for 0 tokens of tool schema.'
  },
  {
    name: 'Monorepo "helper" servers',
    reason: 'Most wrap git commands Claude Code can already run via Bash. You pay context for tools it already has.'
  },
  {
    name: 'Aggregator "all-in-one" MCPs',
    reason: 'Packages that bundle 15 tools into one server are the worst of both worlds — full context cost, no clarity on what is available. Prefer small focused servers.'
  }
]

const article = generateArticleSchema({
  title: 'The Minimum Viable MCP Stack for Claude Code: 5 Servers Worth the Context Tokens',
  description: 'An opinionated 5-server MCP stack for Claude Code — filesystem, github, playwright, postgres, sequential-thinking. Plus what to skip and why.',
  slug: 'claude-code-mcp-stack',
  datePublished: '2026-04-17'
})

export default function ClaudeCodeMcpStack() {
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <Head>
        <title>The Minimum Viable MCP Stack for Claude Code (2026) | PromptWritingStudio</title>
        <meta name="description" content="Five MCP servers worth the context tokens: filesystem, github, playwright, postgres, sequential-thinking. Plus what to skip. Opinionated stack for Claude Code." />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-mcp-stack" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">Claude Code · MCP</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              The Minimum Viable MCP Stack
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Five Model Context Protocol servers worth the context tokens — filesystem, github, playwright, postgres, sequential-thinking — and eleven I stopped installing.
            </p>
          </div>
        </section>

        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                The right MCP stack is <strong>five servers or fewer</strong>. Every server ships its tool schemas into Claude's context on every turn — bloat it and you pay in both tokens and wrong-tool picks. The minimum viable stack is <strong>filesystem</strong> (cross-project reach), <strong>github</strong> (PR and issue access), <strong>playwright</strong> (real browser automation), a database server like <strong>postgres</strong> (query your real data), and <strong>sequential-thinking</strong> (force step-by-step reasoning on hard problems). Add others only when a specific recurring task justifies the context cost.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Why fewer MCP servers is better</h2>
            <div className="space-y-4 text-[#333333] leading-relaxed">
              <p>Every MCP server connected to Claude Code injects its full tool schema into the model's context on every single turn. That's the contract — Claude needs to know what tools exist before it can call them. Typical schemas run 500 to 2,000 tokens per server.</p>
              <p>A naïve "install everything that looks cool" stack of 15 servers eats 15-30K tokens of context <em>before you type anything</em>. On Sonnet 4.6's 1M context window that's fine in raw terms — but the real cost is cognitive: more tool definitions means more bad tool picks, more "Claude decided to call the time server instead of just computing the date" moments, and a transcript cluttered with tool calls that don't advance the work.</p>
              <p>The test for every MCP server: <strong>does this server earn its context cost on more than half of my sessions?</strong> If no, it stays out of the default stack. You can always add project-specific servers in .mcp.json.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">The 5 servers</h2>
            <p className="text-[#333333] mb-8">For each: what it is, the killer use case, when to keep it, when to drop it, and a copy-paste config block.</p>
            <div className="space-y-8">
              {stack.map((s, idx) => (
                <div key={s.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-[#1A1A1A] text-white px-6 py-4">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="text-2xl font-bold text-[#FFDE59]">#{idx + 1}</span>
                      <h3 className="text-xl font-bold">{s.name}</h3>
                      <span className="text-xs font-semibold bg-white/10 text-[#FFDE59] px-2 py-0.5 rounded-full uppercase tracking-wide">{s.category}</span>
                      <span className="text-xs text-gray-400 ml-auto">Schema: {s.tokensEstimate} tokens</span>
                    </div>
                    <p className="text-xs text-gray-400 font-mono">{s.package}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-[#333333] leading-relaxed">{s.why}</p>
                    <div className="bg-[#FFDE59]/10 border-l-4 border-[#FFDE59] p-4 rounded-r">
                      <p className="text-sm font-semibold text-[#1A1A1A] mb-1">Killer use case</p>
                      <p className="text-sm text-[#333333]">{s.killer}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 border border-green-200 p-4 rounded">
                        <p className="text-sm font-semibold text-green-900 mb-1">Keep if</p>
                        <p className="text-sm text-green-900">{s.useWhen}</p>
                      </div>
                      <div className="bg-red-50 border border-red-200 p-4 rounded">
                        <p className="text-sm font-semibold text-red-900 mb-1">Drop if</p>
                        <p className="text-sm text-red-900">{s.dropWhen}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A] mb-2">.mcp.json snippet</p>
                      <pre className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg overflow-x-auto text-xs"><code>{s.config}</code></pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">What I tried and dropped</h2>
            <p className="text-[#333333] mb-8">Every "top 20 MCP servers" listicle includes these. I installed them, then removed them. Here's why.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {dropped.map((d, i) => (
                <div key={i} className="bg-[#F9F9F9] border-l-4 border-red-400 p-5 rounded-r">
                  <h3 className="font-bold text-[#1A1A1A] mb-1">{d.name}</h3>
                  <p className="text-sm text-[#333333]">{d.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Combined .mcp.json for the full stack</h2>
            <p className="text-[#333333] mb-6">Drop this into <code className="bg-gray-200 px-1 rounded text-sm">.mcp.json</code> at your repo root. Claude Code picks it up on next session.</p>
            <pre className="bg-[#1A1A1A] text-green-400 p-6 rounded-lg overflow-x-auto text-xs"><code>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/src"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "$GITHUB_TOKEN" }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "$DATABASE_URL"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}`}</code></pre>
            <p className="text-xs text-gray-500 mt-3">Use environment variables for tokens and connection strings. Commit .mcp.json without secrets; each dev supplies their own GITHUB_TOKEN / DATABASE_URL.</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">How much context does this stack cost?</h2>
            <div className="bg-[#F9F9F9] rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#1A1A1A] text-white">
                  <tr>
                    <th className="p-3 text-left">Server</th>
                    <th className="p-3 text-right">Schema tokens (approx)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {stack.map(s => (
                    <tr key={s.id}>
                      <td className="p-3 font-mono text-[#1A1A1A]">{s.name}</td>
                      <td className="p-3 text-right text-[#333333]">{s.tokensEstimate}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#FFDE59]/10 font-bold">
                    <td className="p-3 text-[#1A1A1A]">Total per turn</td>
                    <td className="p-3 text-right text-[#1A1A1A]">~7,800 tokens</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">On Sonnet 4.6 (1M context) that's 0.8% of the window. On Haiku 4.5 (200K) it's 3.9%. Either way: trivial compared to a 15-server kitchen-sink stack eating 25K+ tokens before you type anything.</p>
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

        <section className="py-12 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">References</h3>
            <ul className="text-sm space-y-2 text-[#333333]">
              <li>• <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1A1A1A]">modelcontextprotocol.io</a> — official spec</li>
              <li>• <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1A1A1A]">github.com/modelcontextprotocol/servers</a> — reference server implementations</li>
              <li>• <a href="https://docs.claude.com/en/docs/claude-code/mcp" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1A1A1A]">Claude Code MCP documentation</a> — setup + authentication</li>
            </ul>
          </div>
        </section>

        <section className="py-16 bg-[#1A1A1A] text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Related reading</h2>
            <p className="text-gray-300 mb-6">Hooks complement MCP — MCP adds capabilities, hooks enforce rules about how Claude uses them. The decision tree explains when each extension type fits.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/claude-code-hooks-recipes" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Claude Code hooks: 7 recipes</Link>
              <Link href="/skills-vs-mcp-vs-hooks" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Skills vs MCP vs Hooks</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
