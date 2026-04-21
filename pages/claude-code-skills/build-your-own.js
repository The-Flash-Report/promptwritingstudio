import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import LastVerified from '../../components/LastVerified'
import { generateFAQSchema, generateArticleSchema } from '../../lib/schemaGenerator'
import skillsData from '../../data/claude-code-skills.json'

const faqs = [
  {
    question: "When should I write a skill versus just re-prompting?",
    answer: "Rule of three: once you've typed the same instructions three times, it's a skill. Until then, just prompt. Skills are cheap to write but non-zero — they add files to maintain, slash commands to remember, and review overhead. The break-even is usually around task #3 or #4 of the same kind."
  },
  {
    question: "Slash command, subagent, or bundled skill — which one?",
    answer: "Slash command (~/.claude/commands/) for a named prompt you invoke manually — 80% of skills fit here. Subagent (~/.claude/agents/) when you want Claude to delegate to a specialist with a fresh context window and narrow tools. Bundled skill (~/.claude/skills/<name>/) when the workflow needs scripts, helper files, or multi-file templates. Start as a slash command; graduate later."
  },
  {
    question: "What goes in the frontmatter?",
    answer: "Minimum: description (what the skill does, in one sentence). Optional: allowed-tools (restrict which tools the skill can use), model (force a specific Claude model, useful for Haiku-only light tasks), and name (defaults to filename). Keep frontmatter tight — everything the skill's body can say, let it say."
  },
  {
    question: "How long should a skill be?",
    answer: "Shorter than you think. 20-80 lines of markdown covers most real skills. If yours hits 200 lines, it's probably doing two jobs — split it. The best skills read like instructions to a competent colleague: 'run X, check Y, if Z then do W, report back in this format.'"
  },
  {
    question: "How do I test a skill before trusting it?",
    answer: "Three-pass test: dry-run (tell Claude to describe what it would do without executing), happy-path run, edge-case run. For each, check the output format and that Claude didn't skip steps. A skill that silently drops steps 3-5 when the input is unusual is worse than no skill."
  },
  {
    question: "Should I version-control my skills?",
    answer: "Yes — keep ~/.claude/ or a mirror repo under git. It's rare to regret pushing, common to lose skills to an accidental rm. For shareable skills, publish to a public GitHub repo with an MIT licence and link-friendly frontmatter. For stack-specific ones, commit them into the project's .claude/ directory so the team inherits them."
  },
  {
    question: "Can I ship a skill to this catalogue?",
    answer: "Not via form submission yet — this is a curated directory. If you want your skill considered: publish it on GitHub with an MIT or Apache-2.0 licence, let it mature for 30+ days with at least one real-world use case, and mention @bryanjcollins on X with a link. Criteria: clear licence, real workflow (not a stub), not a duplicate."
  }
]

const frontmatterFields = [
  { field: "description", required: true, desc: "One-line plain-English summary of what the skill does. Claude Code shows this in autocomplete." },
  { field: "allowed-tools", required: false, desc: "Array of tool names the skill can use (e.g. [Bash, Read, Edit]). Omit to allow all tools." },
  { field: "model", required: false, desc: "Force a specific Claude model — 'claude-haiku-4-5' for lightweight tasks, 'claude-opus-4-7' for deep reasoning." },
  { field: "argument-hint", required: false, desc: "What input, if any, the skill expects. Shown in autocomplete after the slash command." }
]

const bodySections = [
  { title: "Purpose (1 sentence)", desc: "What this skill does, not how. Skip to step 2 if the description frontmatter already covers it." },
  { title: "When to use", desc: "Two or three sentences on the trigger conditions — what problem does this solve, and when does it NOT apply." },
  { title: "Steps", desc: "Numbered, specific, and skippable. Each step should produce a checkable outcome. Think 'run git status, check branch, if dirty then stage'." },
  { title: "Output format", desc: "Tell Claude the shape of the reply — a table? bullet list? commit message? Without this, output wanders." },
  { title: "Failure modes", desc: "What the skill should do when it encounters unexpected state. 'If tests fail, report the failure and stop — do not --no-verify.'" }
]

export default function BuildYourOwnSkill() {
  const faqSchema = generateFAQSchema(faqs)
  const article = generateArticleSchema({
    title: "Build your own Claude Code skill — SKILL.md template walkthrough",
    description: "A walkthrough of the frontmatter, body structure, and testing loop for writing your own Claude Code skill. Copy-paste SKILL.md template included.",
    slug: "claude-code-skills/build-your-own",
    datePublished: skillsData._meta.lastVerified
  })

  return (
    <>
      <Head>
        <title>Build Your Own Claude Code Skill — SKILL.md Template Walkthrough | PromptWritingStudio</title>
        <meta name="description" content="How to write a Claude Code skill from scratch: frontmatter, body structure, testing loop, licence. Copy-paste SKILL.md template included." />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-skills/build-your-own" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-14">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <nav className="text-sm text-gray-300 mb-4">
              <Link href="/claude-code-skills" className="hover:text-white">Claude Code Skills</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">Build your own</span>
            </nav>
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">SKILL.md walkthrough</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Build your own Claude Code skill
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              A skill is a 20-80 line markdown file with YAML frontmatter. Here's how to write one that doesn't need rewriting two weeks later.
            </p>
            <div className="mt-5">
              <LastVerified date={skillsData._meta.lastVerified} label="Walkthrough verified" className="!text-white/70" />
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                A Claude Code skill is a markdown file with YAML frontmatter (<code className="bg-gray-100 px-1.5 py-0.5 rounded">description:</code> is the only required field) and a body of plain-English instructions. Write it like a playbook for a competent colleague: purpose, when-to-use, numbered steps, output format, failure modes. Test with three passes — dry-run, happy path, edge case — then ship.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Rule of three</h2>
            <p className="text-[#333333] mb-4">Skills are cheap but not free. They add files to maintain and slash commands to remember. Only write a skill when you've typed the same instructions three times.</p>
            <div className="bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-5 rounded-r">
              <p className="text-[#1A1A1A] font-semibold mb-2">The pattern:</p>
              <ul className="text-[#333333] space-y-1">
                <li>• <strong>Once:</strong> just prompt it.</li>
                <li>• <strong>Twice:</strong> maybe copy the prompt into a note.</li>
                <li>• <strong>Three times:</strong> write the skill.</li>
                <li>• <strong>Five times in a week:</strong> promote to a subagent with its own tools.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Frontmatter fields</h2>
            <p className="text-[#333333] mb-6">Only <code className="bg-gray-100 px-1.5 py-0.5 rounded">description</code> is required. Every other field is a tool, not a tax.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden bg-white">
                <thead className="bg-[#F9F9F9]">
                  <tr>
                    <th className="p-3 border-b border-gray-200 text-sm font-semibold text-[#1A1A1A]">Field</th>
                    <th className="p-3 border-b border-gray-200 text-sm font-semibold text-[#1A1A1A]">Required</th>
                    <th className="p-3 border-b border-gray-200 text-sm font-semibold text-[#1A1A1A]">What it does</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-[#333333]">
                  {frontmatterFields.map(f => (
                    <tr key={f.field}>
                      <td className="p-3 border-b border-gray-100 font-mono text-xs">{f.field}</td>
                      <td className="p-3 border-b border-gray-100">{f.required ? <span className="text-red-600 font-semibold">Required</span> : 'Optional'}</td>
                      <td className="p-3 border-b border-gray-100">{f.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Body structure</h2>
            <p className="text-[#333333] mb-6">Five sections, in this order. Most skills don't need all five — but the ones that earn their keep have at least three.</p>
            <ol className="space-y-4">
              {bodySections.map((s, i) => (
                <li key={i} className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-5">
                  <div className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFDE59] text-[#1A1A1A] font-bold flex items-center justify-center text-sm">{i + 1}</span>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A] mb-1">{s.title}</h3>
                      <p className="text-[#333333]">{s.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Copy-paste template</h2>
            <p className="text-[#333333] mb-6">Drop this into <code className="bg-gray-100 px-1.5 py-0.5 rounded">~/.claude/commands/&lt;your-skill&gt;.md</code> and fill in the blanks. The comments show what each block does.</p>
            <pre className="bg-[#1A1A1A] text-green-400 p-5 rounded-lg overflow-x-auto text-xs leading-relaxed whitespace-pre-wrap">{`---
description: One-line summary of what this skill does (shown in autocomplete).
allowed-tools: [Bash, Read, Edit, Grep]  # optional — restrict tool access
argument-hint: <file-path>                # optional — shown after /<name> in UI
---

# <Skill Name>

## Purpose

One sentence on what this skill does. Skip if the frontmatter description already covers it.

## When to use it

Two or three sentences on the trigger conditions. What problem does this solve?
When does this NOT apply?

## Steps

1. Run <command A>. If output is X, stop and report.
2. Read <file>. Extract <specific thing>.
3. Run <command B> with <extracted thing>.
4. If <condition>, do <action>. Otherwise, do <other action>.

## Output format

Report back in this shape:

\`\`\`
Finding 1: <summary>
Finding 2: <summary>
Recommendation: <single sentence>
\`\`\`

## Failure modes

- If <tool> is not installed, report the missing dependency and stop.
- If <file> does not exist, report and stop — do not create it.
- Do not use --no-verify or skip steps silently.
`}</pre>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Testing loop</h2>
            <p className="text-[#333333] mb-6">Three passes before you trust a new skill with real work.</p>
            <div className="space-y-4">
              <div className="bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-5 rounded-r">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Pass 1 — Dry-run</h3>
                <p className="text-[#333333]">Run the skill with a note: <em>&quot;describe what you&apos;d do without running anything&quot;</em>. Check the steps match your intent. Catches wrong order, missing checks, skipped validation.</p>
              </div>
              <div className="bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-5 rounded-r">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Pass 2 — Happy path</h3>
                <p className="text-[#333333]">Run on a normal input. Compare output format against what you specified. Common issue: Claude drops the output-format section when the input is simple.</p>
              </div>
              <div className="bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-5 rounded-r">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Pass 3 — Edge case</h3>
                <p className="text-[#333333]">Feed it something weird — empty file, huge file, missing dependency, conflicting state. The skill should fail loudly, not silently skip steps. If it papers over the problem, add an explicit failure-mode instruction.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Checklist before you save</h2>
            <ul className="space-y-2 text-[#333333]">
              <li className="flex gap-3"><span>☐</span><span><strong>Frontmatter valid YAML?</strong> A broken <code className="bg-gray-100 px-1 py-0.5 rounded">description:</code> silently drops the skill from autocomplete.</span></li>
              <li className="flex gap-3"><span>☐</span><span><strong>Description under 100 chars?</strong> Longer and it wraps in autocomplete.</span></li>
              <li className="flex gap-3"><span>☐</span><span><strong>Steps numbered and specific?</strong> 'Run tests' is a bug; 'run <code className="bg-gray-100 px-1 py-0.5 rounded">npm test -- --coverage</code> and report failures by file' is a skill.</span></li>
              <li className="flex gap-3"><span>☐</span><span><strong>Failure modes spelled out?</strong> Especially for anything that mutates state (commit, push, deploy, delete).</span></li>
              <li className="flex gap-3"><span>☐</span><span><strong>Output format specified?</strong> 'Report back' is vague — pick a shape.</span></li>
              <li className="flex gap-3"><span>☐</span><span><strong>No hardcoded secrets?</strong> Skills live in dotfiles that often get pushed. Read twice.</span></li>
              <li className="flex gap-3"><span>☐</span><span><strong>Attribution preserved if forked?</strong> MIT and Apache-2.0 require the original copyright notice in redistributions.</span></li>
            </ul>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Patterns worth copying</h2>
            <p className="text-[#333333] mb-6">Skills in the catalogue that show these patterns well — open and read the source to pick up the style.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {['skill-md-template', 'commit-helper', 'drift-check', 'legal-sweep'].map(slug => {
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
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6">Frequently asked</h2>
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

        <section className="py-16 bg-[#1A1A1A] text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Browse the catalogue for inspiration</h2>
            <p className="text-gray-300 mb-6">{skillsData.skills.length} skills across {skillsData.categories.length} categories — all licence-verified, all open to forking and adapting.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/claude-code-skills" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Browse {skillsData.skills.length} skills</Link>
              <Link href="/claude-code-skills/install-guide" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Install guide</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
