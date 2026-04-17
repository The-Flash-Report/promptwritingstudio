import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { getAllPromptExamples } from '../../lib/promptExamples'
import { generateBreadcrumbSchema } from '../../lib/schemaGenerator'

const CATEGORY_COLORS = {
  'Content Creation': 'bg-blue-100 text-blue-700',
  'Email Marketing': 'bg-purple-100 text-purple-700',
  'Social Media': 'bg-pink-100 text-pink-700',
  'E-commerce': 'bg-orange-100 text-orange-700',
  'Sales': 'bg-green-100 text-green-700',
  'SEO': 'bg-yellow-100 text-yellow-700',
  'Development': 'bg-indigo-100 text-indigo-700',
  'Ideation': 'bg-teal-100 text-teal-700',
  'Advertising': 'bg-red-100 text-red-700',
  'Communication': 'bg-gray-100 text-gray-700',
  'Customer Service': 'bg-cyan-100 text-cyan-700',
}

export default function PromptExamplesIndex({ examples }) {
  const pageUrl = 'https://promptwritingstudio.com/prompt-examples'
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://promptwritingstudio.com' },
    { name: 'Prompt Examples', url: pageUrl }
  ])

  const categories = [...new Set(examples.map(e => e.category))].sort()

  return (
    <Layout
      title="Prompt Examples: Before & After Comparisons | PromptWritingStudio"
      description="See exactly how to improve AI prompts across 10+ use cases. Each example shows a weak prompt, an improved version, and real output comparisons. Copy any prompt free."
      canonicalUrl={pageUrl}
    >
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      {/* Hero */}
      <section className="gradient-bg text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              Prompt Engineering
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              Prompt Examples: Before & After
            </h1>
            <p className="text-xl text-gray-200 mb-6">
              Each example shows a real weak prompt, an improved version with specific changes explained, and the difference in output. Copy any improved prompt and use it immediately.
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-300">
              <span>{examples.length} examples</span>
              <span>·</span>
              <span>{categories.length} categories</span>
              <span>·</span>
              <span>All prompts free to copy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Examples grid */}
      <section className="py-12 md:py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {examples.map(example => (
                <Link
                  key={example.slug}
                  href={`/prompt-examples/${example.slug}`}
                  className="bg-white rounded-lg border border-[#E5E5E5] p-6 hover:border-[#FFDE59] hover:shadow-md transition group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${CATEGORY_COLORS[example.category] || 'bg-gray-100 text-gray-700'}`}>
                      {example.category}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-gray-700">{example.h1}</h2>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{example.intro}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">{example.technique}</span>
                    <span className="text-[#1A1A1A] font-semibold text-sm group-hover:underline">See example →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">From Examples to Working Agents</h2>
            <p className="text-gray-600 mb-8">Once your prompts are sharp, the next upgrade is pairing them with Claude Code — where the same prompts drive file edits, test runs, and multi-step agents on your own codebase.</p>
            <Link
              href="/claude-code-guide"
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
            >
              Read the Claude Code guide
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const examples = getAllPromptExamples()
  return { props: { examples } }
}
