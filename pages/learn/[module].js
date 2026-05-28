import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import TryItPanel from '../../components/learn/TryItPanel'
import {
  LEARN_MODULES,
  getAllModuleSlugs,
  getModuleBySlug,
} from '../../data/learn/modules'

const SITE_URL = 'https://promptwritingstudio.com'

export async function getStaticPaths() {
  return {
    paths: getAllModuleSlugs().map(slug => ({ params: { module: slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const mod = getModuleBySlug(params.module)
  if (!mod) {
    return { notFound: true }
  }
  const order = LEARN_MODULES.findIndex(m => m.slug === mod.slug)
  return {
    props: {
      mod,
      prev: order > 0 ? LEARN_MODULES[order - 1] : null,
      next: order < LEARN_MODULES.length - 1 ? LEARN_MODULES[order + 1] : null,
    },
  }
}

export default function LearnModulePage({ mod, prev, next }) {
  const pageUrl = `${SITE_URL}/learn/${mod.slug}`

  const learningResourceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: mod.title,
    description: mod.summary,
    url: pageUrl,
    learningResourceType: 'Lesson',
    teaches: mod.learningGoals,
    isPartOf: {
      '@type': 'Course',
      name: 'Interactive prompt-engineering modules',
      url: `${SITE_URL}/learn`,
    },
  }

  return (
    <Layout
      title={`${mod.title} | Prompt-engineering modules | PromptWritingStudio`}
      description={mod.summary}
      canonicalUrl={pageUrl}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }}
        />
      </Head>

      <article className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/learn" className="hover:text-[#1A1A1A] underline">
            All modules
          </Link>
          <span className="mx-2">/</span>
          <span>Module {mod.order}</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
            {mod.title}
          </h1>
          <p className="text-lg text-[#333333]">{mod.summary}</p>
        </header>

        <section className="mb-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
            What you will learn
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-[#333333]">
            {mod.learningGoals.map(g => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12 prose prose-neutral max-w-none">
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Concept</h2>
          {mod.concept.split(/\n\n+/).map((para, i) => (
            <p key={i} className="text-[#333333] leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-4">Worked example</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Before
              </h3>
              <pre className="whitespace-pre-wrap text-sm bg-[#F9F9F9] border border-[#E5E5E5] rounded-md p-4 text-[#333333]">
                {mod.workedExample.before}
              </pre>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                After
              </h3>
              <pre className="whitespace-pre-wrap text-sm bg-[#F9F9F9] border border-[#E5E5E5] rounded-md p-4 text-[#333333]">
                {mod.workedExample.after}
              </pre>
            </div>

            <div className="text-sm text-[#333333] bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <strong className="block text-[#1A1A1A] mb-1">Why it works</strong>
              {mod.workedExample.whyItWorks}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <TryItPanel
            moduleSlug={mod.slug}
            starterPrompt={mod.starterPrompt}
            hint={mod.tryItHint}
          />
        </section>

        <nav className="flex flex-col sm:flex-row gap-3 sm:justify-between border-t border-[#E5E5E5] pt-6">
          {prev ? (
            <Link
              href={`/learn/${prev.slug}`}
              className="text-sm text-[#1A1A1A] underline hover:no-underline"
            >
              &larr; {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/learn/${next.slug}`}
              className="text-sm text-[#1A1A1A] underline hover:no-underline sm:text-right"
            >
              {next.title} &rarr;
            </Link>
          ) : (
            <Link
              href="/learn"
              className="text-sm text-[#1A1A1A] underline hover:no-underline sm:text-right"
            >
              Back to all modules
            </Link>
          )}
        </nav>
      </article>
    </Layout>
  )
}
