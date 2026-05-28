import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { LEARN_MODULES, DEFERRED_MODULES } from '../../data/learn/modules'

const SITE_URL = 'https://promptwritingstudio.com'
const PAGE_URL = `${SITE_URL}/learn`

export default function LearnIndexPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Interactive prompt-engineering modules',
    description:
      'Step through structured prompt patterns, run them live against Claude, and iterate. No code required.',
    provider: {
      '@type': 'Organization',
      name: 'PromptWritingStudio',
      url: SITE_URL,
    },
    hasCourseInstance: LEARN_MODULES.map(m => ({
      '@type': 'CourseInstance',
      name: m.title,
      url: `${PAGE_URL}/${m.slug}`,
      courseMode: 'online',
    })),
  }

  return (
    <Layout
      title="Interactive prompt-engineering modules | PromptWritingStudio"
      description="Step through structured prompt patterns, run them live against Claude, and iterate. Non-technical, free, no signup."
      canonicalUrl={PAGE_URL}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
        />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
            Learn prompt engineering by doing
          </h1>
          <p className="text-lg text-[#333333] max-w-2xl">
            Short modules on the patterns that move AI output from generic to useful. Each module has
            a concept, a worked example, and a try-it panel that runs your prompt against Claude
            live. No code. No signup. Twenty runs a day per browser.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-[#1A1A1A] mb-4">Available now</h2>
          <ul className="space-y-4">
            {LEARN_MODULES.map(m => (
              <li
                key={m.slug}
                className="border border-[#E5E5E5] rounded-lg p-5 hover:border-[#1A1A1A] transition-colors bg-white"
              >
                <Link href={`/learn/${m.slug}`} className="block">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-xs font-mono text-gray-500">
                      Module {m.order}
                    </span>
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">{m.title}</h3>
                  </div>
                  <p className="text-sm text-[#333333]">{m.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {DEFERRED_MODULES.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-3">Coming soon</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              {DEFERRED_MODULES.map(m => (
                <li key={m.slug}>{m.title}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="border-t border-[#E5E5E5] pt-8 mt-8 text-sm text-gray-600">
          <p className="mb-2">
            <strong className="text-[#1A1A1A]">How runs work.</strong> Each try-it panel sends your
            prompt to a Claude model running on our server. We do not store your prompts or outputs.
            Saved variants live in your browser only.
          </p>
          <p>
            <strong className="text-[#1A1A1A]">Limits.</strong> 20 runs per browser per day. Output
            capped at 500 tokens to keep costs predictable.
          </p>
        </section>
      </div>
    </Layout>
  )
}
