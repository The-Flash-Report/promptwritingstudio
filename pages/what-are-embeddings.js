import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function WhatAreEmbeddings() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  const uses = [
    { title: 'Semantic search', desc: 'Find by meaning, not exact keywords.' },
    { title: 'RAG retrieval', desc: 'Bring the most relevant chunks into the context.' },
    { title: 'Clustering & dedupe', desc: 'Group similar items, remove near‑duplicates.' },
    { title: 'Recommendations', desc: 'Suggest similar docs, tickets, or products.' }
  ]

  return (
    <Layout
      title="What are Embeddings? Plain‑English Guide with Business Examples | PromptWritingStudio"
      description="Understand embeddings: numeric vectors that capture meaning. How they work, where to use them, and how to choose models."
    >
      <EnhancedMeta
        title="What are Embeddings? Plain‑English Guide"
        description="Embeddings explained: how vector representations power search, RAG, clustering, and recommendations—plus tips for chunking and model choice."
        url="https://promptwritingstudio.com/what-are-embeddings"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime={published}
        modifiedTime={modified}
      />
      <OrganizationSchema />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-28 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">What are Embeddings?</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Embeddings turn text into numbers that capture meaning, enabling search by intent, not keywords.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-rag" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">RAG Guide</Link>
              <Link href="/ai-glossary" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">AI Glossary</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Uses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {uses.map((u, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1">{u.title}</div>
                <div className="text-sm text-slate-600">{u.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical tips */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800 mb-1">Chunking and overlap</div>
              <div className="text-sm text-slate-600">Use 300–800 token chunks with 10–20% overlap to retain context.</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800 mb-1">Hybrid search</div>
              <div className="text-sm text-slate-600">Combine BM25 and vector search for robustness on short queries.</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800 mb-1">Metadata filters</div>
              <div className="text-sm text-slate-600">Filter by product, version, region, or permissions at query time.</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800 mb-1">Model choice</div>
              <div className="text-sm text-slate-600">Pick domain‑suitable and multilingual models if your content requires it.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Power your search and RAG with embeddings</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/what-is-rag" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Learn RAG</Link>
            <Link href="/calculators" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">AI Calculators</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


