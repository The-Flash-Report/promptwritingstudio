import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../../components/layout/Layout'
import LastVerified from '../../../components/LastVerified'
import { generateArticleSchema } from '../../../lib/schemaGenerator'
import skillsData from '../../../data/claude-code-skills.json'

const TIER_ORDER = ['signal', 'solid', 'situational']
const TIER_LABELS = {
  'signal': 'High signal',
  'solid': 'Solid',
  'situational': 'Situational'
}

function shortLicence(licence) {
  if (!licence) return 'Unknown'
  return licence.split('(')[0].trim()
}

function licenceClass(licence) {
  const n = shortLicence(licence)
  if (n.startsWith('MIT') || n.startsWith('Apache') || n.startsWith('BSD') || n.startsWith('CC0') || n.startsWith('Unlicense')) {
    return 'bg-green-100 text-green-800'
  }
  return 'bg-gray-100 text-gray-700'
}

export default function CategoryPage({ category, skillsByTier, lastVerified, skillCount }) {
  if (!category) return null

  const article = generateArticleSchema({
    title: `${category.name} — Claude Code Skills`,
    description: `${skillCount} Claude Code skills in the ${category.name.toLowerCase()} category — all licence-verified and safe to reuse.`,
    slug: `claude-code-skills/category/${category.id}`,
    datePublished: lastVerified
  })

  return (
    <>
      <Head>
        <title>{category.name} — Claude Code Skills | PromptWritingStudio</title>
        <meta name="description" content={`${skillCount} licence-safe Claude Code skills for ${category.name.toLowerCase()}. Every entry from an MIT/Apache-2.0/BSD/CC0 repo.`} />
        <link rel="canonical" href={`https://promptwritingstudio.com/claude-code-skills/category/${category.id}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-14">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <nav className="text-sm text-gray-300 mb-4">
              <Link href="/claude-code-skills" className="hover:text-white">Claude Code Skills</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-400">{category.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {category.name}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl">{category.description}</p>
            <div className="mt-5">
              <LastVerified date={lastVerified} label="Category verified" className="!text-white/70" />
            </div>
          </div>
        </section>

        {TIER_ORDER.map(tierId => {
          const tierSkills = skillsByTier[tierId] || []
          if (tierSkills.length === 0) return null
          return (
            <section key={tierId} className={`py-14 ${tierId === 'signal' ? 'bg-white' : tierId === 'solid' ? 'bg-[#F9F9F9]' : 'bg-white'}`}>
              <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">{TIER_LABELS[tierId]}</h2>
                  <span className="text-sm text-gray-500">({tierSkills.length})</span>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {tierSkills.map(skill => (
                    <Link
                      key={skill.slug}
                      href={`/claude-code-skills/${skill.slug}`}
                      className="bg-white border border-gray-200 rounded-lg p-5 hover:border-[#FFDE59] hover:shadow-sm transition"
                    >
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <h3 className="text-lg font-bold text-[#1A1A1A]">{skill.name}</h3>
                        <span className={`${licenceClass(skill.source.licence)} text-xs font-mono px-2 py-0.5 rounded whitespace-nowrap`}>{shortLicence(skill.source.licence)}</span>
                      </div>
                      <p className="text-sm text-[#333333]">{skill.purpose}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )
        })}

        <section className="py-12 bg-[#1A1A1A] text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl">
            <Link href="/claude-code-skills" className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block">Back to full catalogue</Link>
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: skillsData.categories.map(c => ({ params: { category: c.id } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const category = skillsData.categories.find(c => c.id === params.category)
  if (!category) return { notFound: true }
  const skills = skillsData.skills.filter(s => s.category === category.id)
  const skillsByTier = skills.reduce((acc, s) => {
    acc[s.tier] = acc[s.tier] || []
    acc[s.tier].push(s)
    return acc
  }, {})
  return {
    props: {
      category,
      skillsByTier,
      skillCount: skills.length,
      lastVerified: skillsData._meta.lastVerified
    }
  }
}
