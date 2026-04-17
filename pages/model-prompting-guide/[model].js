import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { getAllModelSlugs, getModelGuideData } from '../../lib/modelGuides'
import { generateFAQSchema, generateBreadcrumbSchema, generateArticleSchema } from '../../lib/schemaGenerator'

export default function ModelGuidePage({ data }) {
  const [copiedIndex, setCopiedIndex] = useState(null)

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const pageUrl = `https://promptwritingstudio.com/model-prompting-guide/${data.model}`

  const faqSchema = generateFAQSchema(data.faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://promptwritingstudio.com' },
    { name: 'Model Prompting Guides', url: 'https://promptwritingstudio.com/model-prompting-guide' },
    { name: data.modelName, url: pageUrl }
  ])
  const articleSchema = generateArticleSchema({
    title: data.h1,
    description: data.seoData.description,
    url: pageUrl,
    datePublished: '2025-01-01',
    dateModified: '2026-04-12',
    keywords: ['prompt engineering', data.modelName, 'AI prompting', 'how to prompt']
  })

  const otherModels = (data.relatedModels || [])

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
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              Model Prompting Guide
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.h1}</h1>
            <p className="text-lg text-gray-200">{data.intro}</p>
          </div>
        </div>
      </section>

      {/* Model personality */}
      <section className="py-10 bg-white border-b border-[#E5E5E5]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#F9F9F9] border-l-4 border-[#FFDE59] rounded-r-lg p-6">
              <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">How {data.modelName} Thinks</h2>
              <p className="text-gray-700 leading-relaxed">{data.modelPersonality}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key strengths */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5">What {data.modelName} Does Best</h2>
            <ul className="space-y-2">
              {data.keyStrengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#1A1A1A] mt-0.5 flex-shrink-0 font-bold">→</span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Prompting tips */}
      <section className="py-12 md:py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">Prompting Techniques for {data.modelName}</h2>
            <div className="space-y-8">
              {data.promptingTips.map((tip, i) => (
                <div key={i} className="bg-white rounded-lg border border-[#E5E5E5] p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="bg-[#1A1A1A] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <h3 className="text-lg font-bold text-[#1A1A1A]">{tip.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-5 leading-relaxed">{tip.description}</p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Instead of</p>
                      <div className="bg-red-50 border border-red-200 rounded p-3">
                        <p className="font-mono text-sm text-gray-700 whitespace-pre-wrap">{tip.example.weak}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Try this</p>
                      <div className="bg-green-50 border border-green-200 rounded p-3 relative">
                        <p className="font-mono text-sm text-gray-800 whitespace-pre-wrap pr-16">{tip.example.strong}</p>
                        <button
                          onClick={() => copyToClipboard(tip.example.strong, i)}
                          className="absolute top-2 right-2 bg-[#FFDE59] text-[#1A1A1A] text-xs font-semibold px-2 py-1 rounded hover:bg-[#E5C84F] transition"
                        >
                          {copiedIndex === i ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to avoid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Common Mistakes with {data.modelName}</h2>
            <div className="space-y-4">
              {data.whatToAvoid.map((item, i) => (
                <div key={i} className="border border-[#E5E5E5] rounded-lg p-5">
                  <h3 className="font-semibold text-[#1A1A1A] mb-2 flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    {item.mistake}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.why}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* vs other models */}
      {(data.vsClaude || data.vsGPT4o || data.vsGemini || data.vsChatGPT) && (
        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">How {data.modelName} Compares</h2>
              <div className="space-y-4">
                {data.vsClaude && (
                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5">
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">vs Claude</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{data.vsClaude}</p>
                  </div>
                )}
                {data.vsGemini && (
                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5">
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">vs Gemini</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{data.vsGemini}</p>
                  </div>
                )}
                {data.vsGPT4o && (
                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5">
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">vs ChatGPT (GPT-4o)</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{data.vsGPT4o}</p>
                  </div>
                )}
                {data.vsChatGPT && (
                  <div className="bg-white border border-[#E5E5E5] rounded-lg p-5">
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">vs ChatGPT</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{data.vsChatGPT}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-[#1A1A1A] text-white rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Go Deeper with Claude</h2>
              <p className="text-gray-300 mb-6">If Claude is your main model, the Claude Code guide is the fastest way to move from chatting to building — sub-agents, MCP, hooks, and slash commands.</p>
              <Link
                href="/claude-code-guide"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
              >
                Read the Claude Code guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {data.faqs && data.faqs.length > 0 && (
        <section className="py-12 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {data.faqs.map((faq, i) => (
                  <div key={i} className="bg-white border border-[#E5E5E5] rounded-lg p-5">
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">{faq.question}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other model guides */}
      {otherModels.length > 0 && (
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Other Model Prompting Guides</h2>
              <div className="flex flex-wrap gap-3">
                {otherModels.map(slug => (
                  <Link
                    key={slug}
                    href={`/model-prompting-guide/${slug}`}
                    className="bg-[#F9F9F9] border border-[#E5E5E5] px-4 py-2 rounded-lg text-sm font-medium text-[#1A1A1A] hover:border-[#FFDE59] hover:bg-[#FFDE59]/10 transition capitalize"
                  >
                    {slug === 'chatgpt' ? 'ChatGPT (GPT-4o)' : slug.charAt(0).toUpperCase() + slug.slice(1)} Guide
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const slugs = getAllModelSlugs()
  return {
    paths: slugs.map(slug => ({ params: { model: slug } })),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const data = getModelGuideData(params.model)
  if (!data) return { notFound: true }
  return { props: { data } }
}
