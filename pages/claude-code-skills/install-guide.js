import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import LastVerified from '../../components/LastVerified'
import { generateFAQSchema, generateArticleSchema } from '../../lib/schemaGenerator'
import skillsData from '../../data/claude-code-skills.json'

const faqs = [
  {
    question: "Where do skills live on my machine?",
    answer: "Slash commands go in ~/.claude/commands/<name>.md — one file per command. Subagents go in ~/.claude/agents/<name>.md. Bundled skills (with scripts or additional files) go in ~/.claude/skills/<name>/SKILL.md. All three are picked up automatically by Claude Code when it starts. Per-project versions live at .claude/commands/ (etc.) inside the repo and override the global ones for that project."
  },
  {
    question: "Do I need to restart Claude Code after adding a skill?",
    answer: "Yes. Claude Code reads the commands, agents, and skills directories at session start. Quit (Ctrl+C twice) and run claude again. New skills appear when you type / — the autocomplete will include them. If a skill doesn't show up, check the file is .md, the frontmatter is valid YAML, and you saved to the right directory."
  },
  {
    question: "How do I invoke a skill once it's installed?",
    answer: "Slash commands and subagents both run by typing /<name> in Claude Code. Some skills auto-trigger based on context (set via the allowed-tools or description field in frontmatter) — those fire without being called directly. You can check a skill's trigger mode in its frontmatter. When in doubt, type / and browse the list."
  },
  {
    question: "How do global skills differ from per-project skills?",
    answer: "Global skills in ~/.claude/ apply everywhere you run Claude Code. Per-project skills in ./.claude/ (relative to the project root) only apply inside that project, and override global skills of the same name. Use global for personal defaults (commit style, review habits) and per-project for stack-specific workflows (Next.js lint, Prisma migrations, repo-specific CI rules)."
  },
  {
    question: "What if the skill needs a dependency like gh CLI?",
    answer: "Install the dependency first. Most of the skills in this catalogue require at least git and gh (GitHub CLI). Some need jq, rg (ripgrep), or specific MCP servers. The setup block on each skill page lists requirements. Claude Code will surface the error if a dependency is missing, but it's faster to pre-install rather than debug at runtime."
  },
  {
    question: "Is it safe to install skills from GitHub strangers?",
    answer: "Read the skill file first. A slash command is just a markdown prompt — low risk. A bundled skill may contain shell scripts that run with your permissions; read those carefully. This catalogue only includes skills from repos with permissive licences, but 'permissive licence' isn't the same as 'audited code'. Trust, but verify: open the file, read what it does, then save it."
  },
  {
    question: "Can I edit a skill after I install it?",
    answer: "Yes — skills are just markdown files. Edit in place to match your stack, conventions, or tone. Fork the file with a new slug if you want to preserve the original alongside your edit. Respect the licence: MIT and Apache-2.0 both require you keep the original author's copyright notice when you redistribute, but local edits in your own .claude/ are fine."
  }
]

const steps = [
  {
    title: "Pick a skill from the catalogue",
    body: "Browse /claude-code-skills and open the one you want. The High-signal tier is where to start — those skills earn their keep daily across many projects.",
    code: null
  },
  {
    title: "Copy the skill's content",
    body: "On the skill's page, the setup block shows the exact filename and path. For most entries, you'll copy a markdown file from the source repo (link on the page) into your own .claude/ directory.",
    code: null
  },
  {
    title: "Save to the right directory",
    body: "The path depends on what the skill is:",
    code: "# Slash command (most skills)\n~/.claude/commands/<name>.md\n\n# Subagent (parallel specialist)\n~/.claude/agents/<name>.md\n\n# Bundled skill (with scripts / extra files)\n~/.claude/skills/<name>/SKILL.md\n\n# Per-project equivalents (override globals)\n<project-root>/.claude/commands/<name>.md\n<project-root>/.claude/agents/<name>.md\n<project-root>/.claude/skills/<name>/SKILL.md"
  },
  {
    title: "Preserve attribution",
    body: "If the skill came from a community repo (not your own work), keep a one-line comment at the top crediting the source. The catalogue's licence gate (MIT / Apache-2.0 / BSD / CC0 / Unlicense) permits reuse, but MIT and Apache require you keep the original copyright notice.",
    code: "<!-- Source: <author> / <repo> — MIT -->\n<!-- https://github.com/<author>/<repo> -->"
  },
  {
    title: "Restart Claude Code",
    body: "Quit the current session (Ctrl+C twice) and run claude again. New skills are registered at session start, not mid-session.",
    code: "claude"
  },
  {
    title: "Invoke it",
    body: "Type / in Claude Code — the skill appears in autocomplete. Some skills auto-trigger based on context (check the frontmatter's description field). Most fire when you type /<name> and press enter.",
    code: "You: /commit\nClaude: [runs git status / diff / log, drafts message, commits, pushes]"
  }
]

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to install a Claude Code skill in 60 seconds",
  "description": "Copy a skill file into ~/.claude/commands/, ~/.claude/agents/, or ~/.claude/skills/, restart Claude Code, and invoke with /<name>. Preserve attribution for permissive-licence skills.",
  "totalTime": "PT1M",
  "step": steps.map((s, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": s.title,
    "text": s.body
  }))
}

export default function InstallGuide() {
  const faqSchema = generateFAQSchema(faqs)
  const article = generateArticleSchema({
    title: "How to install a Claude Code skill — the 60-second walkthrough",
    description: "Step-by-step install for slash commands, subagents, and bundled skills. Where they live, how to invoke them, and how to keep attribution clean.",
    slug: "claude-code-skills/install-guide",
    datePublished: skillsData._meta.lastVerified
  })

  const signalCount = skillsData.skills.filter(s => s.tier === 'signal').length

  return (
    <>
      <Head>
        <title>How to Install a Claude Code Skill — The 60-Second Walkthrough | PromptWritingStudio</title>
        <meta name="description" content="Step-by-step install guide for Claude Code skills, subagents, and slash commands. Where each file type lives, how to invoke them, and how to preserve attribution." />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-skills/install-guide" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-14">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <nav className="text-sm text-gray-300 mb-4">
              <Link href="/claude-code-skills" className="hover:text-white">Claude Code Skills</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Install guide</span>
            </nav>
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">Install in 60 seconds</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              How to install a Claude Code skill
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              Copy a markdown file into <code className="bg-black/30 px-1.5 py-0.5 rounded text-sm">~/.claude/</code>, restart Claude Code, type <code className="bg-black/30 px-1.5 py-0.5 rounded text-sm">/&lt;name&gt;</code>. That's the whole thing.
            </p>
            <div className="mt-5">
              <LastVerified date={skillsData._meta.lastVerified} label="Guide verified" className="!text-white/70" />
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                Skills are plain markdown files. Save them to <code className="bg-gray-100 px-1.5 py-0.5 rounded">~/.claude/commands/</code> (slash commands), <code className="bg-gray-100 px-1.5 py-0.5 rounded">~/.claude/agents/</code> (subagents), or <code className="bg-gray-100 px-1.5 py-0.5 rounded">~/.claude/skills/&lt;name&gt;/SKILL.md</code> (bundled skills with scripts). Restart Claude Code. Invoke with <code className="bg-gray-100 px-1.5 py-0.5 rounded">/&lt;name&gt;</code>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Directory cheat sheet</h2>
            <p className="text-[#333333] mb-6">Which directory does what — skim this once, bookmark if needed.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-[#F9F9F9]">
                  <tr>
                    <th className="p-3 border-b border-gray-200 text-sm font-semibold text-[#1A1A1A]">Directory</th>
                    <th className="p-3 border-b border-gray-200 text-sm font-semibold text-[#1A1A1A]">Holds</th>
                    <th className="p-3 border-b border-gray-200 text-sm font-semibold text-[#1A1A1A]">Invoke with</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#333333]">
                  <tr>
                    <td className="p-3 border-b border-gray-100 font-mono text-xs">~/.claude/commands/</td>
                    <td className="p-3 border-b border-gray-100">Slash commands — named prompts you run manually.</td>
                    <td className="p-3 border-b border-gray-100 font-mono text-xs">/&lt;name&gt;</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-100 font-mono text-xs">~/.claude/agents/</td>
                    <td className="p-3 border-b border-gray-100">Subagents — specialists Claude can delegate to.</td>
                    <td className="p-3 border-b border-gray-100 font-mono text-xs">/&lt;name&gt; <span className="text-gray-400">or auto</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-gray-100 font-mono text-xs">~/.claude/skills/&lt;name&gt;/</td>
                    <td className="p-3 border-b border-gray-100">Bundled skills — SKILL.md plus supporting scripts or docs.</td>
                    <td className="p-3 border-b border-gray-100 font-mono text-xs">auto <span className="text-gray-400">via frontmatter</span></td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs">&lt;project&gt;/.claude/</td>
                    <td className="p-3">Per-project overrides — same structure, project-scoped.</td>
                    <td className="p-3 font-mono text-xs">same</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Step-by-step</h2>
            <p className="text-[#333333] mb-8">From catalogue click to working skill in six steps.</p>
            <ol className="space-y-6">
              {steps.map((step, i) => (
                <li key={i} className="bg-white rounded-lg border border-gray-200 p-5 md:p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#FFDE59] text-[#1A1A1A] font-bold flex items-center justify-center">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{step.title}</h3>
                      <p className="text-[#333333] leading-relaxed mb-3">{step.body}</p>
                      {step.code && (
                        <pre className="bg-[#1A1A1A] text-green-400 p-4 rounded text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">{step.code}</pre>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">A realistic first five</h2>
            <p className="text-[#333333] mb-6">Start here. These are the most-used High-signal skills from the catalogue — the ones most people keep forever once they install them.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {['commit-helper', 'pr-open', 'review-pr', 'security-audit', 'site-health-check'].map(slug => {
                const skill = skillsData.skills.find(s => s.slug === slug)
                if (!skill) return null
                return (
                  <Link
                    key={slug}
                    href={`/claude-code-skills/${slug}`}
                    className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-5 hover:border-[#FFDE59] hover:shadow-sm transition"
                  >
                    <h3 className="font-bold text-[#1A1A1A] mb-1">{skill.name}</h3>
                    <p className="text-sm text-[#333333]">{skill.purpose}</p>
                  </Link>
                )
              })}
            </div>
            <p className="text-sm text-gray-500 mt-4">{signalCount} High-signal skills total · <Link href="/claude-code-skills" className="underline hover:text-[#1A1A1A]">browse all</Link></p>
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Common mistakes</h2>
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-red-400 p-5 rounded-r">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Saving the file with a .txt extension</h3>
                <p className="text-[#333333]">Claude Code only reads .md files from these directories. If your editor adds .txt, rename before restart.</p>
              </div>
              <div className="bg-white border-l-4 border-red-400 p-5 rounded-r">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Forgetting to restart</h3>
                <p className="text-[#333333]">Skills are loaded once at session start. A new file dropped mid-session won't appear until the next <code className="bg-gray-100 px-1 py-0.5 rounded">claude</code> invocation.</p>
              </div>
              <div className="bg-white border-l-4 border-red-400 p-5 rounded-r">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Skipping attribution</h3>
                <p className="text-[#333333]">MIT and Apache-2.0 both require you keep the copyright notice when redistributing. For your own <code className="bg-gray-100 px-1 py-0.5 rounded">~/.claude/</code> that's a nicety; if you commit a skill into a project repo, it's a licence requirement.</p>
              </div>
              <div className="bg-white border-l-4 border-red-400 p-5 rounded-r">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Running a bundled skill without reading the scripts</h3>
                <p className="text-[#333333]">Slash commands are just prompts — safe. Bundled skills can contain shell scripts that run with your permissions. Open the script before saving.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Frequently asked</h2>
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
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to write your own?</h2>
            <p className="text-gray-300 mb-6">Once you've installed a few and spotted a repeat pattern in your own work, it's time to build one. The template walkthrough covers the frontmatter, body structure, and testing loop.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/claude-code-skills/build-your-own" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Build your own skill</Link>
              <Link href="/claude-code-skills" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Back to catalogue</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
