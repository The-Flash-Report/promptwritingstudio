import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import EmailCapture from '../../components/ui/EmailCapture'
import { getAllPromptSummaries } from '../../lib/promptLibrary'
import { generateBreadcrumbSchema } from '../../lib/schemaGenerator'

const CATEGORY_COLORS = {
  business: 'bg-blue-100 text-blue-700',
  'content-creation': 'bg-pink-100 text-pink-700',
  copywriting: 'bg-green-100 text-green-700',
  marketing: 'bg-purple-100 text-purple-700',
  technical: 'bg-indigo-100 text-indigo-700',
  seo: 'bg-yellow-100 text-yellow-700',
}

const DIFFICULTY_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default function PromptLibraryIndex({ prompts, categories }) {
  const pageUrl = 'https://promptwritingstudio.com/prompt-library'
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://promptwritingstudio.com' },
    { name: 'Prompt Library', url: pageUrl },
  ])

  return (
    <Layout
      title="Prompt Library: Full-Length, Copy-Ready AI Prompts | PromptWritingStudio"
      description="A reference library of full-length, structured prompts for business, copywriting, marketing, SEO, content, and code. Each prompt has its own page you can copy and cite."
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
              Prompt Library
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">Full-Length Prompts You Can Copy and Cite</h1>
            <p className="text-xl text-gray-200">
              Every prompt here is a complete, structured template with placeholders you fill in, not a one-line idea.
              Each one has its own page so you can link to it, copy it, and reuse it.
            </p>
          </div>
        </div>
      </section>

      {/* Prompts by category */}
      <section className="py-12 md:py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            {categories.map(category => {
              const inCategory = prompts.filter(p => p.category === category.key)
              if (inCategory.length === 0) return null
              return (
                <div key={category.key} className="mb-12 last:mb-0">
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">{category.label}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {inCategory.map(prompt => (
                      <Link
                        key={prompt.slug}
                        href={`/prompt-library/${prompt.slug}`}
                        className="bg-white rounded-lg border border-[#E5E5E5] p-6 hover:border-[#FFDE59] hover:shadow-md transition group"
                      >
                        <div className="flex items-start justify-between mb-3 gap-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${CATEGORY_COLORS[prompt.category] || 'bg-gray-100 text-gray-700'}`}>
                            {prompt.categoryLabel}
                          </span>
                          {prompt.difficulty && (
                            <span className="text-xs text-gray-500 font-medium">
                              {DIFFICULTY_LABELS[prompt.difficulty] || prompt.difficulty}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-gray-700">{prompt.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{prompt.description}</p>
                        <span className="text-[#1A1A1A] font-semibold text-sm group-hover:underline">Open prompt →</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Capture */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">One good prompt in your inbox each week</h2>
            <p className="text-gray-600 mb-8">
              Join the list and get a full-length prompt worth saving, plus practical tips for writing your own. No hype,
              no spam.
            </p>
            <div className="flex justify-center">
              <EmailCapture source="prompt-library" label="" buttonText="Subscribe" theme="light" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const prompts = getAllPromptSummaries()
  // Resolve category labels here (server-side) so the client render never
  // imports lib/promptLibrary (which reads the filesystem).
  const seen = new Set()
  const categories = []
  for (const p of prompts) {
    if (seen.has(p.category)) continue
    seen.add(p.category)
    categories.push({ key: p.category, label: p.categoryLabel })
  }
  return { props: { prompts, categories } }
}
