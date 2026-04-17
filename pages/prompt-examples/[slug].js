import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { getAllPromptExampleSlugs, getPromptExampleData } from '../../lib/promptExamples'
import { generateFAQSchema, generateBreadcrumbSchema, generateArticleSchema } from '../../lib/schemaGenerator'

export default function PromptExamplePage({ data }) {
  const [copiedImproved, setCopiedImproved] = useState(false)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedImproved(true)
    setTimeout(() => setCopiedImproved(false), 2000)
  }

  const pageUrl = `https://promptwritingstudio.com/prompt-examples/${data.slug}`

  const faqSchema = generateFAQSchema(data.faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://promptwritingstudio.com' },
    { name: 'Prompt Examples', url: 'https://promptwritingstudio.com/prompt-examples' },
    { name: data.title, url: pageUrl }
  ])
  const articleSchema = generateArticleSchema({
    title: data.h1,
    description: data.seoData.description,
    url: pageUrl,
    datePublished: '2025-01-01',
    dateModified: '2026-04-12',
    keywords: [data.technique, data.category, 'prompt engineering', 'prompt examples']
  })

  return (
    <Layout title={data.seoData.title} description={data.seoData.description} canonicalUrl={pageUrl}>
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      {/* Hero */}
      <section className="gradient-bg text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">{data.category}</span>
              <span className="bg-[#FFDE59]/20 text-[#FFDE59] px-3 py-1 rounded-full text-sm font-medium">{data.technique}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.h1}</h1>
            <p className="text-lg text-gray-200">{data.intro}</p>
          </div>
        </div>
      </section>

      {/* Main comparison */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">

            {/* Weak prompt */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-red-100 text-red-700 font-semibold text-sm px-3 py-1 rounded-full">Weak Prompt</span>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <p className="font-mono text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{data.weakPrompt.text}</p>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">Why it underperforms:</p>
                <ul className="space-y-1">
                  {data.weakPrompt.problems.map((problem, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Improved prompt */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-green-100 text-green-700 font-semibold text-sm px-3 py-1 rounded-full">Improved Prompt</span>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-5 relative">
                <p className="font-mono text-gray-800 text-sm leading-relaxed whitespace-pre-wrap pr-24">{data.improvedPrompt.text}</p>
                <button
                  onClick={() => copyToClipboard(data.improvedPrompt.text)}
                  className="absolute top-4 right-4 bg-[#FFDE59] text-[#1A1A1A] text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#E5C84F] transition"
                >
                  {copiedImproved ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="mt-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">What changed:</p>
                <ul className="space-y-1">
                  {data.improvedPrompt.improvements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Output comparison */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Output Comparison</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Output from weak prompt</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 h-full">
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{data.outputComparison.weak}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Output from improved prompt</p>
                  <div className="bg-gray-50 border border-green-200 rounded-lg p-4 h-full">
                    <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{data.outputComparison.improved}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why it works */}
            <div className="mb-10 bg-[#F9F9F9] rounded-lg p-6 border border-[#E5E5E5]">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-3">Why It Works</h2>
              <p className="text-gray-700 leading-relaxed">{data.whyItWorks}</p>
            </div>

            {/* Technique explained */}
            <div className="mb-12 border-l-4 border-[#FFDE59] pl-5">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">The Technique: {data.technique}</h2>
              <p className="text-gray-700 leading-relaxed">{data.technique_explained}</p>
            </div>

            {/* CTA */}
            <div className="bg-[#1A1A1A] text-white rounded-xl p-8 text-center mb-12">
              <h2 className="text-2xl font-bold mb-3">Next step: use it in Claude Code</h2>
              <p className="text-gray-300 mb-6">Prompts like this one are most useful when they are pinned into a CLAUDE.md or wrapped in a slash command. The Claude Code guide shows you how.</p>
              <Link
                href="/claude-code-guide"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
              >
                Read the Claude Code guide
              </Link>
            </div>

            {/* FAQs */}
            {data.faqs && data.faqs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {data.faqs.map((faq, i) => (
                    <div key={i} className="border border-[#E5E5E5] rounded-lg p-5">
                      <h3 className="font-semibold text-[#1A1A1A] mb-2">{faq.question}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related */}
            {data.relatedSlugs && data.relatedSlugs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">More Prompt Examples</h2>
                <div className="flex flex-wrap gap-3">
                  {data.relatedSlugs.map(slug => (
                    <Link
                      key={slug}
                      href={`/prompt-examples/${slug}`}
                      className="bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-2 rounded-lg text-sm font-medium text-[#1A1A1A] hover:border-[#FFDE59] hover:bg-[#FFDE59]/10 transition"
                    >
                      {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
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
  const slugs = getAllPromptExampleSlugs()
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const data = getPromptExampleData(params.slug)
  if (!data) return { notFound: true }
  return { props: { data } }
}
