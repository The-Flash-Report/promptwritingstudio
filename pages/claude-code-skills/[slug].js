import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import LastVerified from '../../components/LastVerified'
import EmailCapture from '../../components/ui/EmailCapture'
import { generateFAQSchema, generateArticleSchema } from '../../lib/schemaGenerator'
import skillsData from '../../data/claude-code-skills.json'

const TIER_LABELS = {
  'signal': { color: '#FFDE59', label: 'High signal', desc: 'Battle-tested, used daily.' },
  'solid': { color: '#A3D9A5', label: 'Solid', desc: 'Useful in the right context.' },
  'situational': { color: '#CBD5E1', label: 'Situational', desc: 'Niche — add when the need arises.' }
}

function shortLicence(licence) {
  if (!licence) return 'Unknown'
  return licence.split('(')[0].trim()
}

function licenceClass(licence) {
  const n = shortLicence(licence)
  if (n.startsWith('MIT') || n.startsWith('Apache') || n.startsWith('BSD') || n.startsWith('CC0') || n.startsWith('Unlicense')) {
    return 'bg-green-100 text-green-800 border-green-200'
  }
  return 'bg-gray-100 text-gray-700 border-gray-200'
}

export default function SkillPage({ skill, category, lastVerified }) {
  if (!skill) return null

  const tier = TIER_LABELS[skill.tier] || TIER_LABELS.solid

  const skillFaqs = [
    { question: `What does ${skill.name} do?`, answer: skill.shortAnswer },
    { question: `When should I use ${skill.name}?`, answer: skill.whenToUse },
    { question: `Is ${skill.name} safe to copy into my own project?`, answer: `Yes, under the ${shortLicence(skill.source.licence)} licence. ${skill.source.type === 'community' ? `Preserve the attribution to ${skill.source.author} and link back to ${skill.source.repoUrl || 'the source repo'}.` : skill.source.type === 'official' ? `It's from Anthropic's official skills repository — check their LICENSE and NOTICE files before forking.` : `It's an original — ${skill.source.author} published it under MIT, so attribution-plus-commercial-use is fine.`}` },
    ...(skill.caveats ? [{ question: `Are there caveats?`, answer: skill.caveats }] : [])
  ]

  const faqSchema = generateFAQSchema(skillFaqs)
  const article = generateArticleSchema({
    title: `${skill.name} — Claude Code Skill (${shortLicence(skill.source.licence)})`,
    description: skill.purpose,
    slug: `claude-code-skills/${skill.slug}`,
    datePublished: lastVerified
  })

  const related = (skill.related || [])
    .map(slug => skillsData.skills.find(s => s.slug === slug))
    .filter(Boolean)

  const sourceLabel = skill.source.type === 'official' ? 'Official (Anthropic)' : skill.source.type === 'community' ? 'Community' : 'Original'

  return (
    <>
      <Head>
        <title>{skill.name} — Claude Code Skill ({shortLicence(skill.source.licence)}) | PromptWritingStudio</title>
        <meta name="description" content={skill.purpose} />
        <link rel="canonical" href={`https://promptwritingstudio.com/claude-code-skills/${skill.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-14">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <nav className="text-sm text-gray-300 mb-4">
              <Link href="/claude-code-skills" className="hover:text-white">Claude Code Skills</Link>
              <span className="mx-2">/</span>
              <Link href={`/claude-code-skills/category/${skill.category}`} className="hover:text-white">{category?.name}</Link>
            </nav>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: tier.color, color: '#1A1A1A' }}
              >
                {tier.label}
              </span>
              <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${licenceClass(skill.source.licence)}`}>
                {shortLicence(skill.source.licence)}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-white">
                {sourceLabel}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {skill.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl">{skill.purpose}</p>
            <div className="mt-5">
              <LastVerified date={lastVerified} label="Entry verified" className="!text-white/70" />
            </div>
          </div>
        </section>

        <section id="short-answer" className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">{skill.shortAnswer}</p>
            </div>
          </div>
        </section>

        <section id="when-to-use" className="py-12 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">When to use it</h2>
            <p className="text-[#333333] leading-relaxed">{skill.whenToUse}</p>
          </div>
        </section>

        {skill.setup && skill.setup.length > 0 && (
          <section id="setup" className="py-12 bg-[#F9F9F9]">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Setup</h2>
              <ol className="space-y-3">
                {skill.setup.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#FFDE59] text-[#1A1A1A] font-bold text-sm flex items-center justify-center">{i + 1}</span>
                    <p className="text-[#333333] leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {skill.exampleTranscript && (
          <section id="example" className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Example</h2>
              <pre className="bg-[#1A1A1A] text-green-400 p-5 rounded-lg overflow-x-auto text-sm leading-relaxed whitespace-pre-wrap">{skill.exampleTranscript}</pre>
            </div>
          </section>
        )}

        <section id="source" className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Source &amp; attribution</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                <div>
                  <dt className="text-gray-500 font-semibold uppercase tracking-wide text-xs mb-0.5">Author</dt>
                  <dd className="text-[#1A1A1A]">
                    {skill.source.authorUrl ? (
                      <a href={skill.source.authorUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-black">{skill.source.author}</a>
                    ) : (
                      skill.source.author
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 font-semibold uppercase tracking-wide text-xs mb-0.5">Licence</dt>
                  <dd className="text-[#1A1A1A] font-mono">{skill.source.licence}</dd>
                </div>
                {skill.source.repo && (
                  <div className="sm:col-span-2">
                    <dt className="text-gray-500 font-semibold uppercase tracking-wide text-xs mb-0.5">Source</dt>
                    <dd className="text-[#1A1A1A]">
                      {skill.source.repoUrl ? (
                        <a href={skill.source.repoUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-black break-all">{skill.source.repo}</a>
                      ) : (
                        skill.source.repo
                      )}
                    </dd>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <dt className="text-gray-500 font-semibold uppercase tracking-wide text-xs mb-0.5">Type</dt>
                  <dd className="text-[#1A1A1A]">{sourceLabel}</dd>
                </div>
              </dl>
              <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                {skill.source.type === 'community' && 'Reused under a permissive licence. Preserve attribution when forking.'}
                {skill.source.type === 'official' && 'From Anthropic\'s official skills repository. Check their LICENSE and NOTICE files for specifics.'}
                {skill.source.type === 'original' && 'Original pattern published under MIT — attribution preserved by convention, not licence requirement.'}
              </p>
            </div>
          </div>
        </section>

        {skill.caveats && (
          <section id="caveats" className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">Caveats</h2>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-5 rounded-r">
                <p className="text-[#1A1A1A]">{skill.caveats}</p>
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section id="related" className="py-12 bg-[#F9F9F9]">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5">Related skills</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map(r => (
                  <Link
                    key={r.slug}
                    href={`/claude-code-skills/${r.slug}`}
                    className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#FFDE59] hover:shadow-sm transition"
                  >
                    <h3 className="font-bold text-[#1A1A1A] mb-1">{r.name}</h3>
                    <p className="text-sm text-[#333333]">{r.purpose}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="newsletter" className="py-14 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold text-white mb-3">New skills, explained plainly.</h2>
              <p className="text-gray-300 mb-6">One short email when a new Claude Code skill is worth installing — and when to skip the hype. No spam.</p>
              <EmailCapture source={`skill:${skill.slug}`} label="" buttonText="Subscribe" theme="dark" />
            </div>
          </div>
        </section>

        <section className="py-10 bg-white text-center border-t border-gray-200">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <p className="text-[#333333] mb-4">{skillsData.skills.length} skills across {skillsData.categories.length} categories, all licence-verified.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/claude-code-skills" className="bg-[#FFDE59] text-[#1A1A1A] px-5 py-2.5 rounded-lg font-bold hover:bg-[#E5C84F] transition">Back to catalogue</Link>
              <Link href={`/claude-code-skills/category/${skill.category}`} className="border-2 border-[#1A1A1A] text-[#1A1A1A] px-5 py-2.5 rounded-lg font-bold hover:bg-[#1A1A1A] hover:text-white transition">More in {category?.name}</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: skillsData.skills.map(s => ({ params: { slug: s.slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const skill = skillsData.skills.find(s => s.slug === params.slug)
  if (!skill) return { notFound: true }
  const category = skillsData.categories.find(c => c.id === skill.category) || null
  return {
    props: {
      skill,
      category,
      lastVerified: skillsData._meta.lastVerified
    }
  }
}
