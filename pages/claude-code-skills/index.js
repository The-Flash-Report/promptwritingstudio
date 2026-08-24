import { useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import LastVerified from '../../components/LastVerified'
import { generateFAQSchema } from '../../lib/schemaGenerator'
import skillsData from '../../data/claude-code-skills.json'

const faqs = [
  {
    question: "What is a Claude Code skill?",
    answer: "A Claude Code skill is a reusable capability — a slash command, subagent, or skill file — that lives in your .claude/ directory and extends what Claude Code can do. Skills are markdown files with frontmatter describing when they fire and what they do. Unlike MCP servers (which add capabilities) or hooks (which enforce rules), skills package a workflow: 'when I type /commit, do these things'. Official spec: anthropics/skills on GitHub."
  },
  {
    question: "How is this catalogue different from awesome-claude-code?",
    answer: "The biggest community catalogue — hesreallyhim/awesome-claude-code (39.9k stars) — is licensed CC BY-NC-ND. You can link to it but cannot republish entries. This directory is the opposite: every skill is from a repo with an explicit permissive licence (MIT, Apache-2.0, BSD, CC0, Unlicense) that allows reuse. You can copy any skill here into your own .claude/ without legal friction."
  },
  {
    question: "Can I use these skills commercially?",
    answer: "Yes, with attribution where the licence requires it. MIT, Apache-2.0, BSD, CC0, and Unlicense all permit commercial use. MIT and Apache require you preserve the original copyright notice — so when you fork a skill, keep the 'Source: <author>' comment at the top. We exclude any skill from a repo with unclear or restrictive licensing."
  },
  {
    question: "How are skills different from subagents and slash commands?",
    answer: "The lines blur. A slash command (~/.claude/commands/name.md) is a named prompt you invoke manually. A subagent (~/.claude/agents/name.md) is a specialist you hand work off to. A skill (~/.claude/skills/name/SKILL.md) is a bundle with richer frontmatter and sometimes scripts. This catalogue covers all three — what matters is the workflow, not the file type. See /skills-vs-mcp-vs-hooks for the deeper decision tree."
  },
  {
    question: "How often is this catalogue updated?",
    answer: "Skills are re-verified quarterly. The lastVerified date is shown on the hub and on every skill page. Stars counts, last-commit dates, and source licence are checked on each re-verification. If a repo changes licence or goes dormant, entries are pulled or flagged."
  },
  {
    question: "How do I install a skill from this catalogue?",
    answer: "Every skill page has a setup block — usually 2-4 steps. Typical flow: (1) save the .md file at ~/.claude/commands/<name>.md (or ~/.claude/skills/<name>/SKILL.md for bundled skills), (2) restart Claude Code, (3) invoke by typing the slash command. Full walkthrough on the Install guide page."
  },
  {
    question: "Can I submit a skill I've written?",
    answer: "Not yet — this is a curated directory. If you've written a skill you want featured, publish it on GitHub with an MIT or Apache-2.0 licence, and mention @bryanjcollins on X with a link. Criteria for inclusion: clear licence, published for at least 30 days, at least one real-world use case, and not a duplicate of an existing entry."
  }
]

// The skills Bryan runs himself. Every slug below must exist in
// data/claude-code-skills.json, because each card links to its catalogue page.
const dailyDrivers = [
  {
    slug: 'site-picker',
    name: 'Site Picker',
    command: '/projects',
    why: 'A portfolio of sites means a portfolio of context I cannot hold in my head. This prints the list, loads the memory file for whichever one I pick, and runs the git and gh checks in parallel, so the session opens with the outstanding work already on screen instead of me going to find it.'
  },
  {
    slug: 'commit-helper',
    name: 'Commit Helper',
    command: '/commit',
    why: 'Stage the relevant changes, write a conventional-commit message, push. Trivial to do by hand, which is exactly why it earned a skill: the friction was never difficulty, it was repetition.'
  },
  {
    slug: 'qa-swarm',
    name: 'QA Swarm',
    command: '/qa',
    why: 'Fans three to five subagents at the current project, each auditing a different dimension, then synthesises one report. The parallelism is the whole point. Run the same audit sequentially and it is slow enough that I skip it, which means it never runs.'
  },
  {
    slug: 'deploy-netlify',
    name: 'Deploy to Netlify',
    command: '/deploy',
    why: 'Build, preview, then push to main and let Netlify auto-deploy. No Netlify CLI in the loop. The preview step is the part that justifies the skill, because it is the step a human under time pressure drops first.'
  },
  {
    slug: 'drift-check',
    name: 'Drift Check',
    command: '/drift-check',
    why: 'Verifies reference data (model names, prices, dependency versions) against upstream and flags what has gone stale. This site carries several AI pricing pages, and a pricing table that is quietly six months out of date does more damage than no table at all.'
  },
  {
    slug: 'legal-sweep',
    name: 'Legal Sweep',
    command: '/legal-sweep',
    why: 'Audits a site for a legal disclaimer page and a footer link, then creates and wires one up if it is missing. Dull, easy to forget when you run more than one site, and genuinely unpleasant to discover you forgot.'
  }
]

const LICENCE_LABELS = {
  'MIT': { color: 'green', label: 'MIT' },
  'Apache-2.0': { color: 'green', label: 'Apache-2.0' },
  'BSD-3-Clause': { color: 'green', label: 'BSD' },
  'BSD-2-Clause': { color: 'green', label: 'BSD' },
  'CC0': { color: 'green', label: 'CC0' },
  'Unlicense': { color: 'green', label: 'Unlicense' },
}

const TIER_LABELS = {
  'signal': { color: '#FFDE59', label: 'High signal' },
  'solid': { color: '#A3D9A5', label: 'Solid' },
  'situational': { color: '#CBD5E1', label: 'Situational' }
}

function licenceBadgeClass(licence) {
  const normalised = (licence || '').split('(')[0].trim()
  if (normalised.startsWith('MIT')) return 'bg-green-100 text-green-800'
  if (normalised.startsWith('Apache')) return 'bg-green-100 text-green-800'
  if (normalised.startsWith('BSD')) return 'bg-green-100 text-green-800'
  if (normalised.startsWith('CC0')) return 'bg-green-100 text-green-800'
  if (normalised.startsWith('Unlicense')) return 'bg-green-100 text-green-800'
  return 'bg-gray-100 text-gray-700'
}

function shortLicence(licence) {
  if (!licence) return 'Unknown'
  return licence.split('(')[0].trim()
}

export default function ClaudeCodeSkillsHub() {
  const { skills, categories, tiers, _meta } = skillsData

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTier, setActiveTier] = useState('all')

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      if (activeCategory !== 'all' && skill.category !== activeCategory) return false
      if (activeTier !== 'all' && skill.tier !== activeTier) return false
      if (search) {
        const haystack = `${skill.name} ${skill.purpose} ${skill.tags.join(' ')}`.toLowerCase()
        if (!haystack.includes(search.toLowerCase())) return false
      }
      return true
    })
  }, [skills, activeCategory, activeTier, search])

  const stats = useMemo(() => {
    const communityCount = skills.filter(s => s.source.type === 'community').length
    const originalCount = skills.filter(s => s.source.type === 'original').length
    const officialCount = skills.filter(s => s.source.type === 'official').length
    const repos = new Set(skills.map(s => s.source.repo).filter(Boolean))
    return { total: skills.length, communityCount, originalCount, officialCount, repoCount: repos.size }
  }, [skills])

  const faqSchema = generateFAQSchema(faqs)
  const hubUrl = 'https://promptwritingstudio.com/claude-code-skills'
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": 'Claude Code Skills Catalogue — Licence-Safe Skills, Subagents & Slash Commands',
    "description": `${stats.total} Claude Code skills curated from ${stats.repoCount} permissive-licence repos. Every entry verified for MIT/Apache-2.0/BSD/CC0 licence so you can copy without legal friction.`,
    "url": hubUrl,
    "dateModified": _meta.lastVerified,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Prompt Writing Studio",
      "url": "https://promptwritingstudio.com"
    },
    "about": { "@type": "Thing", "name": "Claude Code Skills" },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": stats.total,
      "itemListElement": skills.map((s, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `${hubUrl}/${s.slug}`,
        "name": s.purpose
      }))
    }
  }

  return (
    <>
      <Head>
        <title>Claude Code Skills: The 6 I Actually Run, Plus {stats.total} You Can Copy | PromptWritingStudio</title>
        <meta name="description" content={`The six Claude Code skills that survived daily use on my own sites, with why each one stuck, plus a catalogue of ${stats.total} more from MIT, Apache-2.0, BSD and CC0 repos you can copy without a licensing argument.`} />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-skills" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">Claude Code · Skills Catalogue</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Claude Code Skills: the ones I actually run, plus {stats.total} you can copy
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              I write skills for my own sites. Plenty get renamed, folded into another skill, or quietly retired once the workflow they automated stops existing. The ones below survived that and still fire most weeks, with the reason each one stuck. Under them sits the full catalogue: {stats.total} skills, subagents and slash commands from {stats.repoCount} repos with explicit permissive licences, so you can copy any of them into your <code className="bg-black/30 px-1.5 py-0.5 rounded text-sm">.claude/</code> directory without a licensing argument.
            </p>
            <div className="mt-6">
              <LastVerified
                date={_meta.lastVerified}
                label="Catalogue verified"
                className="!text-white/70"
              />
            </div>
          </div>
        </section>

        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed mb-4">
                A useful rule of thumb: a skill is worth writing once you have typed the same long instruction into Claude Code enough times to be sure of its shape. Building one earlier mostly wastes the effort, because you are automating a workflow you have not settled on yet.
              </p>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                On licensing: the biggest community list, <strong>awesome-claude-code</strong>, is CC&nbsp;BY-NC-ND. You can link to it but cannot republish entries. This directory is the opposite. Every skill comes from a repo with an <strong>MIT, Apache-2.0, BSD, CC0, or Unlicense</strong> licence, so you can copy, fork and adapt without a legal argument. Start with the <strong>High-signal</strong> tier.
              </p>
            </div>
          </div>
        </section>

        {/* The skills I actually run */}
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3">The six I actually run</h2>
            <p className="text-lg text-[#333333] mb-8">
              I maintain a portfolio of sites, so most of my skills exist to stop me doing the same twenty minutes of chores on each one. These are the six that fire most weeks. Each links through to its full page in the catalogue.
            </p>

            <div className="space-y-4">
              {dailyDrivers.map(skill => (
                <Link
                  key={skill.slug}
                  href={`/claude-code-skills/${skill.slug}`}
                  className="block bg-[#F9F9F9] border-l-4 border-[#FFDE59] rounded-r-lg p-6 hover:bg-[#FFDE59]/10 transition"
                >
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <h3 className="text-lg font-bold text-[#1A1A1A]">{skill.name}</h3>
                    <code className="text-sm font-mono bg-[#1A1A1A] text-[#FFDE59] px-2 py-0.5 rounded">{skill.command}</code>
                  </div>
                  <p className="text-[#333333]">{skill.why}</p>
                </Link>
              ))}
            </div>

            <div className="mt-8 bg-[#1A1A1A] p-6 rounded-lg">
              <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-2">The pattern underneath them</p>
              <p className="text-gray-200 leading-relaxed">
                Look at the six and they fall into two shapes. Four of them gather state from several places at once and hand back a decision: which project needs attention, what failed the audit, what has drifted, what is missing. Two of them just execute a boring sequence I would otherwise do by hand. Both shapes work. The shape to be wary of is a skill that tries to be clever about a judgement call: when it gets that call wrong you have to reconstruct its reasoning before you can correct it, which can cost more than doing the thing yourself.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <input
                type="text"
                placeholder="Search skills…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:border-[#FFDE59] focus:outline-none"
              />
              <div className="flex flex-wrap gap-2">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:border-[#FFDE59] focus:outline-none"
                >
                  <option value="all">All categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <select
                  value={activeTier}
                  onChange={(e) => setActiveTier(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:border-[#FFDE59] focus:outline-none"
                >
                  <option value="all">All tiers</option>
                  <option value="signal">High signal</option>
                  <option value="solid">Solid</option>
                  <option value="situational">Situational</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">Showing <strong>{filteredSkills.length}</strong> of {stats.total} skills · {stats.communityCount} from community repos · {stats.originalCount} originals · {stats.officialCount} from anthropics/skills</p>
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-6xl">
            {filteredSkills.length === 0 ? (
              <p className="text-center text-gray-500 py-16">No skills match those filters. Try widening them.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredSkills.map(skill => {
                  const category = categories.find(c => c.id === skill.category)
                  const tier = TIER_LABELS[skill.tier]
                  return (
                    <Link
                      key={skill.slug}
                      href={`/claude-code-skills/${skill.slug}`}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-[#FFDE59] transition group flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <h3 className="text-lg font-bold text-[#1A1A1A] group-hover:text-black">{skill.name}</h3>
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ backgroundColor: tier?.color + '40', color: '#1A1A1A' }}
                        >
                          {tier?.label}
                        </span>
                      </div>
                      <p className="text-sm text-[#333333] mb-4 flex-1">{skill.purpose}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs mt-auto">
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">{category?.name}</span>
                        <span className={`${licenceBadgeClass(skill.source.licence)} px-2 py-0.5 rounded font-mono`}>{shortLicence(skill.source.licence)}</span>
                        <span className="text-gray-400 ml-auto">View details →</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Browse by category</h2>
            <p className="text-[#333333] mb-8">{categories.length} categories, skills ranked inside each by tier.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map(c => {
                const count = skills.filter(s => s.category === c.id).length
                return (
                  <Link
                    key={c.id}
                    href={`/claude-code-skills/category/${c.id}`}
                    className="bg-[#F9F9F9] hover:bg-[#FFDE59]/20 border border-gray-200 hover:border-[#FFDE59] rounded-lg p-5 transition group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-[#1A1A1A]">{c.name}</h3>
                      <span className="text-sm text-gray-500">{count}</span>
                    </div>
                    <p className="text-sm text-[#333333]">{c.description}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9] border-y border-gray-200">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Repos we excluded (and why)</h2>
            <p className="text-[#333333] mb-6">Transparency about licence. If you're surprised a well-known repo is missing, this section probably explains it.</p>
            <div className="space-y-3">
              {_meta.excluded.map((entry, i) => (
                <div key={i} className="bg-white border-l-4 border-red-400 p-5 rounded-r">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-bold text-[#1A1A1A]">{entry.repo}</h3>
                    <span className="text-xs font-mono bg-red-50 text-red-800 px-2 py-0.5 rounded">{entry.licence}</span>
                  </div>
                  <p className="text-sm text-[#333333]">{entry.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 text-center">Frequently asked</h2>
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

        <section className="py-16 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">Next steps</h2>
            <p className="text-[#333333] mb-8">Two companion walkthroughs — one for installing, one for writing your own.</p>
            <div className="grid md:grid-cols-2 gap-5">
              <Link href="/claude-code-skills/install-guide" className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-6 hover:border-[#FFDE59] hover:shadow-sm transition">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Install a skill in 60 seconds</h3>
                <p className="text-sm text-[#333333] mb-3">Where each file lives (<code className="bg-gray-100 px-1 py-0.5 rounded">~/.claude/commands/</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">agents/</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">skills/</code>), how to invoke, and how to keep attribution clean.</p>
                <span className="text-sm font-semibold text-[#1A1A1A]">Read the install guide →</span>
              </Link>
              <Link href="/claude-code-skills/build-your-own" className="bg-[#F9F9F9] border border-gray-200 rounded-lg p-6 hover:border-[#FFDE59] hover:shadow-sm transition">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Build your own skill</h3>
                <p className="text-sm text-[#333333] mb-3">The SKILL.md walkthrough — frontmatter fields, body structure, copy-paste template, and the three-pass testing loop before you trust it with real work.</p>
                <span className="text-sm font-semibold text-[#1A1A1A]">Read the template walkthrough →</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1A1A] text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">Related reading</h2>
            <p className="text-gray-300 mb-6">Skills complement MCP servers and hooks. The decision tree below walks through which extension type fits which problem.</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-10">
              <Link href="/skills-vs-mcp-vs-hooks" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Skills vs MCP vs Hooks</Link>
              <Link href="/claude-code-guide" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition">Claude Code Guide</Link>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">More Claude hubs</h3>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
              <Link href="/claude-code-mcp-stack" className="bg-[#2A2A2A] border border-gray-700 text-gray-100 px-5 py-2 rounded-lg text-sm font-semibold hover:border-[#FFDE59] hover:text-white transition">MCP stack</Link>
              <Link href="/claude-pro-vs-max-vs-api" className="bg-[#2A2A2A] border border-gray-700 text-gray-100 px-5 py-2 rounded-lg text-sm font-semibold hover:border-[#FFDE59] hover:text-white transition">Pro vs Max vs API</Link>
              <Link href="/calculators/claude-plan-picker" className="bg-[#2A2A2A] border border-gray-700 text-gray-100 px-5 py-2 rounded-lg text-sm font-semibold hover:border-[#FFDE59] hover:text-white transition">Plan picker calculator</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
