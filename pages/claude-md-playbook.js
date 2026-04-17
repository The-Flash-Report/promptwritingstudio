import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "What is a CLAUDE.md file?",
    answer: "CLAUDE.md is a plain markdown file you place in your project that gives Claude Code persistent context about the project: conventions, architecture, commands, gotchas, and anything else Claude should know before making changes. It is loaded automatically into every Claude Code session started from that directory, so you never have to repeat the same context."
  },
  {
    question: "Where does Claude Code look for CLAUDE.md files?",
    answer: "Claude Code looks in three places and merges them in this order. First, your user-global file at ~/.claude/CLAUDE.md, which applies to every project. Second, any CLAUDE.md files in parent directories of your project. Third, the CLAUDE.md in your project root. Instructions from more specific (project-level) files win over more general (user-global) ones."
  },
  {
    question: "Should CLAUDE.md be committed to the repository?",
    answer: "Yes. Treat CLAUDE.md as project documentation. Commit it so every contributor (and every Claude Code session on every machine) gets the same context. Keep personal preferences in ~/.claude/CLAUDE.md and team conventions in the project-level file."
  },
  {
    question: "How long should a CLAUDE.md be?",
    answer: "Shorter than you think. Claude Code loads the entire file into the context window on every session, so every line is paying rent. Aim for under 200 lines for most projects. Focus on conventions, commands, architecture, and gotchas. Do not duplicate what is already obvious from the code or README."
  },
  {
    question: "What should NOT go in CLAUDE.md?",
    answer: "Avoid things that are already discoverable. Do not list every file in the project, do not paste full dependency lists, and do not describe the code line by line. Do not include secrets or API keys. Do not write aspirational rules you do not enforce — if your tests pass despite violating a 'rule', Claude will eventually notice and stop trusting the file."
  },
  {
    question: "Can I have multiple CLAUDE.md files in one repository?",
    answer: "Yes. In a monorepo, you can put a root CLAUDE.md with org-wide conventions and then subfolder CLAUDE.md files for individual packages or apps. Claude Code reads every file on the path from the current working directory up to the repo root and merges them. Use this to keep instructions close to the code they describe."
  },
  {
    question: "What is the difference between CLAUDE.md and a slash command?",
    answer: "CLAUDE.md is persistent context loaded every session. Slash commands (stored in .claude/commands/) are one-shot prompts you can invoke by name. Use CLAUDE.md for things Claude should always know. Use slash commands for reusable workflows you trigger intentionally, like /commit or /deploy."
  },
  {
    question: "How often should I update CLAUDE.md?",
    answer: "Update it whenever a convention changes, a new command becomes standard, or you catch Claude making the same mistake twice. A stale CLAUDE.md is worse than no CLAUDE.md — it will confidently point Claude at commands that no longer exist or rules that have been abandoned. Treat it like any other living documentation."
  }
]

const exampleFiles = [
  {
    id: 'nextjs',
    label: 'Next.js site (this site)',
    description: 'A Next.js 13 site with Tailwind and Netlify deployment. Note the brand colours, the routing split between /pages and /pages/api, and the build command.',
    content: `# PromptWritingStudio

Next.js 13 Pages Router site with Tailwind. Deployed on Netlify.

## Commands
- npm run dev        # local dev server on :3000
- npm run build      # production build
- npm run lint       # ESLint

## Conventions
- Functional components only, hooks where needed
- Tailwind for all styling (no CSS modules, no styled-components)
- Brand colours: #1A1A1A (ink), #FFDE59 (accent yellow), #F9F9F9 (panel bg)
- Use <Link> from next/link for internal navigation, never <a>
- Import Layout from components/layout/Layout on every page

## Architecture
- /pages             Next.js pages and API routes
- /components        Reusable UI + Layout
- /data              JSON for programmatic SEO pages
- /lib               Schema generators, helpers

## Programmatic SEO pattern
- data/modifiers/*.json drives pages/chatgpt-prompts-for/[modifier].js
- When adding a new modifier, add the JSON file and the slug will build automatically

## Deployment
- Netlify auto-deploys from main
- Redirects live in netlify.toml (put above the Next.js catch-all)`
  },
  {
    id: 'python',
    label: 'Python data project',
    description: 'A Python scraper + data pipeline. Heavy on commands because Python projects usually have a virtualenv dance and a pytest config to remember.',
    content: `# Tender Scraper

Python scraper for Irish public procurement data. Writes JSON files consumed by the Astro site.

## Setup
- python -m venv .venv
- source .venv/bin/activate
- pip install -r requirements.txt

## Commands
- python scrape.py                  # full daily run
- python scrape.py --limit 10       # test with 10 notices
- python scrape.py --dry-run        # fetch + classify, no writes
- pytest -q                         # run test suite

## Conventions
- Type hints on every public function
- Use pathlib, not os.path
- Keep API keys in .env (loaded via python-dotenv)
- Never commit .env or any file under data/raw/

## Data flow
TED API -> scrape.py -> classify.py (Claude Haiku) -> src/data/tenders/*.json

## Gotchas
- TED API rate limits to ~10 req/sec; respect backoff
- Deadlines from TED are date-only; we default times to 17:00 Irish time
- resource_id is the canonical key everywhere; never use title as an identifier`
  },
  {
    id: 'go',
    label: 'Go microservice',
    description: 'A Go service. Emphasises build discipline, test tags, and what to leave alone.',
    content: `# Orders Service

Go 1.22 HTTP service backing /orders endpoints. Deployed via Docker to ECS.

## Commands
- make run           # run locally against docker-compose stack
- make test          # unit tests
- make test-int      # integration tests (requires docker-compose up)
- make lint          # golangci-lint run

## Conventions
- Use context.Context as the first argument on every function that does I/O
- Errors bubble up with fmt.Errorf("context: %w", err) — never swallow
- Handlers live in /internal/http, business logic in /internal/orders
- Generated code under /internal/pb is regenerated via make proto — never hand-edit

## Do not touch
- /migrations/*.sql — additive only, never edit an existing migration
- go.sum is committed; bump deps via go get, not by hand

## Deployment
- CI builds the image, pushes to ECR, and triggers an ECS service update
- Staging auto-deploys from main; prod is manual via the Actions tab`
  },
  {
    id: 'monorepo',
    label: 'Monorepo (root)',
    description: 'A turborepo monorepo. The root CLAUDE.md covers org-wide rules; each app has its own sub-file.',
    content: `# Acme Monorepo

Turborepo monorepo with pnpm workspaces.

## Layout
- /apps/web          Next.js marketing site (see apps/web/CLAUDE.md)
- /apps/dashboard    React app for customers (see apps/dashboard/CLAUDE.md)
- /apps/api          Node/Fastify API (see apps/api/CLAUDE.md)
- /packages/ui       Shared React components
- /packages/config   Shared eslint, tsconfig, tailwind presets

## Commands (root)
- pnpm install                     # install everything
- pnpm dev                         # run all apps in parallel
- pnpm -F web dev                  # run a single app
- pnpm turbo run build             # full build with caching
- pnpm changeset                   # record a version bump

## Org-wide rules
- TypeScript strict mode on everywhere
- No cross-app imports — go through /packages
- All shared types live in packages/types
- Add a changeset for any change that affects a published package

## Read the sub-file
Before editing inside an app or package, read that folder's CLAUDE.md.
Local conventions (framework versions, test commands, specific quirks) live there.`
  },
  {
    id: 'global',
    label: 'User-global ~/.claude/CLAUDE.md',
    description: 'Your personal preferences that apply to every project. Keep it short — this loads on top of every project file.',
    content: `# Personal Preferences

## Tone
- Terse responses. No trailing summaries. No "I have completed the task" wrap-ups.
- No emojis unless I ask for them.

## Code style
- Prefer editing existing files over creating new ones
- Do not add features beyond what was asked
- Do not add defensive error handling for conditions that cannot happen
- Default to no comments; explain WHY, never WHAT

## Git workflow
- Always git status before committing to confirm what is staged
- Never force-push to main; never amend published commits
- Use HEREDOC for commit messages so formatting survives

## Projects I work on
- Vendors.ie at ~/src/vendors — Irish B2B comparison site
- Tender monitor at ~/src/tenders — procurement data
- Each has its own CLAUDE.md with project-specific rules`
  }
]

const mistakes = [
  {
    title: 'Writing a novel',
    detail: 'Every line of CLAUDE.md costs tokens on every session. A 900-line manifesto is worse than a 90-line one because Claude has to swim through noise to find the rules that actually matter. Cut aggressively. If a line has not helped Claude in months, delete it.'
  },
  {
    title: 'Listing every file',
    detail: 'Do not paste your directory tree into CLAUDE.md. Claude can run ls or glob patterns itself. List folders only when their purpose is not obvious from the name (for example, "internal/pb is generated code — never hand-edit").'
  },
  {
    title: 'Aspirational rules you do not enforce',
    detail: 'If your CLAUDE.md says "100% test coverage" but CI passes at 40%, Claude will eventually notice the mismatch and stop trusting the file. Only write rules you actually enforce. Soft preferences go under a "Preferences" heading so they are treated as guidance, not gates.'
  },
  {
    title: 'Duplicating the README',
    detail: 'The README is for humans reading the repo. CLAUDE.md is for an AI that will read code directly in seconds. Do not restate what the README already says. Focus on the things Claude cannot infer: which functions are deprecated, which paths are generated, which commands are the canonical way to do something.'
  },
  {
    title: 'Putting secrets in it',
    detail: 'CLAUDE.md is committed to the repo. API keys, tokens, internal URLs, and customer data do not belong in it. Use environment variables and reference them by name only ("Set MAILGUN_API_KEY in .env before running send_alerts.py").'
  },
  {
    title: 'Letting it rot',
    detail: 'Commands change, dependencies change, deploy targets change. A CLAUDE.md that points Claude at a script that no longer exists will waste a full turn before Claude figures out the truth. Review it when you do a major refactor, change CI, or rename a directory.'
  }
]

export default function ClaudeMdPlaybook() {
  const [copiedId, setCopiedId] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'The CLAUDE.md Playbook: How to Write a Memory File for Claude Code',
    description: 'A practical guide to writing CLAUDE.md files that actually improve Claude Code output. Covers file locations, anatomy, real examples across project types, and the mistakes that make them drift.',
    url: 'https://promptwritingstudio.com/claude-md-playbook',
    datePublished: '2026-03-10',
    dateModified: '2026-04-17',
    keywords: ['CLAUDE.md', 'claude md file', 'claude code memory', 'claude code configuration', 'claude code context file']
  })

  return (
    <>
      <Head>
        <title>The CLAUDE.md Playbook: How to Write a Memory File for Claude Code | PromptWritingStudio</title>
        <meta name="description" content="How to write a CLAUDE.md file that actually improves Claude Code output. File locations, anatomy, five real examples across project types, and the mistakes that make them drift." />
        <meta name="keywords" content="CLAUDE.md, claude md file, claude code memory, claude code configuration, claude code context, claude code setup" />
        <meta property="og:title" content="The CLAUDE.md Playbook: How to Write a Memory File for Claude Code" />
        <meta property="og:description" content="How to write a CLAUDE.md that actually improves Claude Code. Locations, anatomy, real examples, and the mistakes that make them drift." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-md-playbook" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-md-playbook" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: April 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The CLAUDE.md Playbook
              <span className="block text-[#FFDE59]">Memory files that actually move output</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                CLAUDE.md is a markdown file Claude Code loads on every session. It tells Claude your project conventions, commands, architecture, and the mistakes it should not repeat. A good one cuts repeated context, fewer wrong guesses, and a lot less babysitting. A bad one quietly drifts out of date and makes things worse.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              This is the exact pattern I use across a Next.js site, a Python scraper, a Go service, and a monorepo — with the mistakes that forced me to rewrite them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#anatomy" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                See the anatomy
              </a>
              <a href="#examples" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Jump to examples
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">What CLAUDE.md actually is</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                CLAUDE.md is a plain markdown file at the root of your project. When you start Claude Code in that directory, the contents are injected into the system prompt for every turn of the session. You never paste it, you never reference it; it is just there. Think of it as the onboarding doc you would hand a new engineer on day one, except the engineer never forgets it and never needs to re-read it.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                The file is not magic. It is not a config. It is just text that gets prepended to the conversation. That framing matters: every line in CLAUDE.md competes with your actual request for Claude's attention. The shorter and more specific it is, the better it works.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Where Claude Code reads from</h2>
            <p className="text-lg text-[#333333] mb-8">
              Claude Code loads CLAUDE.md from three tiers and merges them. Knowing the order prevents surprises when a project rule seems to be ignored.
            </p>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">User-global: ~/.claude/CLAUDE.md</h3>
                    <p className="text-[#333333]">Your personal preferences that apply everywhere. Tone, git habits, commenting style, universal dos and don'ts. Short. Project files override it.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Parent directories</h3>
                    <p className="text-[#333333]">Claude Code walks up from your current working directory to the repo root, picking up any CLAUDE.md files along the way. Useful in monorepos: a root file holds org-wide rules, an app folder holds app-specific ones.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Project root: ./CLAUDE.md</h3>
                    <p className="text-[#333333]">Checked into the repo, shared with every contributor. This is the file you spend the most time maintaining and the one that most determines output quality.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Precedence:</strong> the most specific file wins. A project-level rule overrides a user-global rule of the same kind. That means you can set a global "prefer TypeScript" preference and still have a Python-only repo ignore it by stating "this repo is Python" at the project level.
              </p>
            </div>
          </div>
        </section>

        <section id="anatomy" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Anatomy of a strong CLAUDE.md</h2>
            <p className="text-lg text-[#333333] mb-10">Six sections do almost all the work. You do not need every one on every project, but if a section is missing that Claude keeps guessing at, add it.</p>

            <div className="space-y-6">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">1. Project identity (one or two lines)</h3>
                <p className="text-[#333333]">What this project is, in plain English. "Next.js site deployed on Netlify." "Python scraper that feeds an Astro site." Give Claude the frame before the details.</p>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">2. Commands</h3>
                <p className="text-[#333333]">The canonical commands to run, build, test, lint, and deploy. Claude will absolutely run the wrong command if you do not tell it which one is right. This is the single highest-ROI section.</p>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">3. Conventions</h3>
                <p className="text-[#333333]">Patterns you want followed: component style, naming, import paths, brand colours, error-handling approach. Keep it to rules you enforce — aspirational rules rot fastest.</p>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">4. Architecture</h3>
                <p className="text-[#333333]">The top-level map: which folder does what, how data flows, where to put new code. Not a file listing — a mental model.</p>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">5. Gotchas / Do not touch</h3>
                <p className="text-[#333333]">The traps. Generated code. Files owned by another team. Fields that look safe to edit but will blow up a migration. This section saves more embarrassment than any other.</p>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">6. Deployment</h3>
                <p className="text-[#333333]">How changes reach production. Auto-deploy from main? Manual via an Actions button? Netlify? Vercel? Docker push? One paragraph is enough.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="examples" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Five real CLAUDE.md files</h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Each one is lightly anonymised but based on a file I actually ship with. Copy the shape, not the content — the value is in seeing how little it takes to be useful.
              </p>
            </div>

            <div className="space-y-8">
              {exampleFiles.map(example => (
                <div key={example.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{example.label}</h3>
                    <p className="text-[#333333]">{example.description}</p>
                  </div>
                  <div className="relative">
                    <pre className="bg-[#1A1A1A] text-green-400 p-6 overflow-x-auto font-mono text-sm leading-relaxed">{example.content}</pre>
                    <button
                      onClick={() => copyToClipboard(example.content, example.id)}
                      className="absolute top-4 right-4 bg-[#FFDE59] text-[#1A1A1A] text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#E5C84F] transition"
                    >
                      {copiedId === example.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Common mistakes</h2>
            <p className="text-lg text-[#333333] mb-10">The six patterns that degrade CLAUDE.md files over time. Every one of these came from a rewrite I had to do.</p>

            <div className="space-y-5">
              {mistakes.map((m, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-red-300">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{m.title}</h3>
                  <p className="text-[#333333]">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Keeping it from drifting</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-5">
                CLAUDE.md rots faster than README.md because you interact with it indirectly — through Claude's output quality rather than by reading it. Three habits keep mine honest.
              </p>
              <ul className="space-y-4 text-lg text-[#333333]">
                <li><strong>Update on the same PR as the change.</strong> If you rename a directory, move a command, or deprecate a pattern, update CLAUDE.md in the same commit. Separate "docs PRs" never happen.</li>
                <li><strong>When Claude gets something wrong twice, update the file.</strong> The first time is a hiccup. The second time is missing context. Add one line and move on.</li>
                <li><strong>Re-read it every quarter.</strong> Open it, scan it, delete anything that is no longer true. A five-minute audit catches 90% of the rot.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">Questions that come up every time I show this file to another developer.</p>

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
              CLAUDE.md is step one. Claude Code is what it serves.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              A memory file only pays off if you are actually using Claude Code. If you have not set it up yet, the full guide covers install, auth, workflows, and the slash commands that make it worth keeping open all day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/claude-code-guide" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Read the Claude Code guide
              </Link>
              <Link href="/ai-models" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Compare Claude vs other models
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
