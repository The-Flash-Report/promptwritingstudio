import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function WhatIsVectorDB() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="What is a Vector Database? Practical Guide for RAG & Search | PromptWritingStudio"
      description="Understand vector databases for embeddings: how they store vectors, enable similarity search, and power RAG."
    >
      <EnhancedMeta
        title="What is a Vector Database?"
        description="Vector DBs explained: indexing, filters, hybrid search, and scale considerations for RAG and semantic search."
        url="https://promptwritingstudio.com/what-is-a-vector-database"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">What is a Vector Database?</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              A vector database stores embeddings and makes it fast to find similar items by meaning, not just keywords.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-are-embeddings" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">Embeddings Guide</Link>
              <Link href="/what-is-rag" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">RAG Guide</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { h: 'Similarity search', d: 'k‑NN and ANN search for top‑k relevant vectors.' },
              { h: 'Metadata filters', d: 'Filter results by product, version, permission, or region.' },
              { h: 'Hybrid search', d: 'Combine BM25 and vector for better short‑query performance.' },
              { h: 'Re‑indexing & updates', d: 'Efficiently update embeddings as content changes.' }
            ].map((x, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1">{x.h}</div>
                <div className="text-sm text-slate-600">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Choosing a vector DB */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">How to choose</h2>
            <ul className="space-y-3 text-slate-700">
              <li>Scale and latency requirements (QPS, p95 latency)</li>
              <li>Filter support and access control integration</li>
              <li>Hybrid search, re‑ranking, and observability</li>
              <li>Operational model: hosted vs self‑managed, backups, SLAs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Build robust search and RAG</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/what-are-embeddings" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Learn Embeddings</Link>
            <Link href="/what-is-rag" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">RAG Guide</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


