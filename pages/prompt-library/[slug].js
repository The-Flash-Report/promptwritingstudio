import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import EmailCapture from '../../components/ui/EmailCapture'
import { getAllSlugs, getPromptBySlug, getAllPromptSummaries } from '../../lib/promptLibrary'
import { generateBreadcrumbSchema, generateArticleSchema } from '../../lib/schemaGenerator'

const DIFFICULTY_LABELS = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export default function PromptLibraryPage({ prompt, related }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const pageUrl = `https://promptwritingstudio.com/prompt-library/${prompt.slug}`
  const seoTitle = `${prompt.title} Prompt (Copy-Ready) | PromptWritingStudio`

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://promptwritingstudio.com' },
    { name: 'Prompt Library', url: 'https://promptwritingstudio.com/prompt-library' },
    { name: prompt.title, url: pageUrl },
  ])
  const articleSchema = generateArticleSchema({
    title: prompt.title,
    description: prompt.description,
    url: pageUrl,
    datePublished: '2025-01-15',
    dateModified: '2026-07-15',
    keywords: [...prompt.tags, prompt.categoryLabel, 'prompt template', 'AI prompt'],
  })

  return (
    <Layout title={seoTitle} description={prompt.description} canonicalUrl={pageUrl}>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      {/* Hero */}
      <section className="gradient-bg text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">{prompt.categoryLabel}</span>
              {prompt.difficulty && (
                <span className="bg-[#FFDE59]/20 text-[#FFDE59] px-3 py-1 rounded-full text-sm font-medium">
                  {DIFFICULTY_LABELS[prompt.difficulty] || prompt.difficulty}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{prompt.title}</h1>
            <p className="text-lg text-gray-200">{prompt.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">

            {/* The prompt */}
            <div className="mb-8">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h2 className="text-xl font-bold text-[#1A1A1A]">The prompt</h2>
                <button
                  onClick={copyToClipboard}
                  className="bg-[#FFDE59] text-[#1A1A1A] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#E5C84F] transition"
                >
                  {copied ? 'Copied!' : 'Copy prompt'}
                </button>
              </div>
              <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5">
                <pre className="font-mono text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{prompt.prompt}</pre>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Anything in [BRACKETS] is a placeholder. Replace it with your own detail before you run the prompt.
              </p>
            </div>

            {/* How to use it */}
            <div className="mb-10 bg-white border border-[#E5E5E5] rounded-lg p-6">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">How to use this prompt</h2>
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                {prompt.useCase && (
                  <div>
                    <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs mb-1">Best for</dt>
                    <dd className="text-[#333333]">{prompt.useCase}</dd>
                  </div>
                )}
                {prompt.estimatedTime && (
                  <div>
                    <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs mb-1">Time to run</dt>
                    <dd className="text-[#333333]">{prompt.estimatedTime}</dd>
                  </div>
                )}
                {prompt.difficulty && (
                  <div>
                    <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs mb-1">Level</dt>
                    <dd className="text-[#333333]">{DIFFICULTY_LABELS[prompt.difficulty] || prompt.difficulty}</dd>
                  </div>
                )}
                <div>
                  <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs mb-1">Category</dt>
                  <dd className="text-[#333333]">{prompt.categoryLabel}</dd>
                </div>
              </dl>
              {prompt.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {prompt.tags.map(tag => (
                    <span key={tag} className="text-xs bg-[#F9F9F9] border border-[#E5E5E5] text-gray-600 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Grade it */}
            <div className="mb-10 border-l-4 border-[#FFDE59] pl-5">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">Make it yours, then grade it</h2>
              <p className="text-gray-700 leading-relaxed">
                Once you fill in the placeholders, paste your version into the free Prompt Grader. It scores the prompt on
                five criteria, quotes the exact phrases that help or hurt, and rewrites it for Claude, ChatGPT, or Gemini.
              </p>
              <Link
                href="/prompt-grader"
                className="inline-block mt-4 bg-[#1A1A1A] text-white px-6 py-2 rounded-lg font-bold hover:bg-black transition text-sm"
              >
                Grade your version free
              </Link>
            </div>

            {/* Capture */}
            <div className="mb-12 bg-[#F9F9F9] rounded-lg p-6 border border-[#E5E5E5]">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">Get a prompt like this each week</h2>
              <p className="text-gray-600 text-sm mb-4">
                Join the list for one full-length prompt worth saving, plus practical tips. No hype, no spam.
              </p>
              <EmailCapture source="prompt-library" label="" buttonText="Subscribe" theme="light" />
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">More prompts in {prompt.categoryLabel}</h2>
                <div className="flex flex-wrap gap-3">
                  {related.map(item => (
                    <Link
                      key={item.slug}
                      href={`/prompt-library/${item.slug}`}
                      className="bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-2 rounded-lg text-sm font-medium text-[#1A1A1A] hover:border-[#FFDE59] hover:bg-[#FFDE59]/10 transition"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllSlugs().map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const prompt = getPromptBySlug(params.slug)
  if (!prompt) return { notFound: true }
  const related = getAllPromptSummaries()
    .filter(p => p.category === prompt.category && p.slug !== prompt.slug)
    .slice(0, 4)
  return { props: { prompt, related } }
}
