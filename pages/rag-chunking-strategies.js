import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function RAGChunkingStrategies() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="RAG Chunking Strategies: Sizes, Overlap, and Metadata | PromptWritingStudio"
      description="Choose effective RAG chunk sizes, overlap, and metadata to improve retrieval quality and reduce costs."
    >
      <EnhancedMeta
        title="RAG Chunking Strategies"
        description="Practical guide to chunk sizes (300–800 tokens), overlap (10–20%), semantic vs fixed, and metadata best practices."
        url="https://promptwritingstudio.com/rag-chunking-strategies"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">RAG Chunking Strategies</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Good chunking boosts accuracy and lowers cost. Start with 300–800 tokens and 10–20% overlap, then evaluate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-rag" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">RAG Guide</Link>
              <Link href="/what-are-embeddings" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">Embeddings Guide</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strategies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { h: 'Fixed window', d: 'Simple and fast; consistent chunk sizes.' },
              { h: 'Semantic splitting', d: 'Split by headings or boundaries to keep concepts intact.' },
              { h: 'Overlap', d: 'Keep 10–20% to preserve context across boundaries.' },
              { h: 'Metadata', d: 'Capture source URL, section, version/date, access level.' }
            ].map((x, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1">{x.h}</div>
                <div className="text-sm text-slate-600">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Evaluate and iterate</h2>
            <ul className="space-y-3 text-slate-700">
              <li>Track answer correctness and citation coverage on a golden set.</li>
              <li>Monitor token usage and latency as you vary chunk sizes and k.</li>
              <li>Use re‑ranking for large corpora when recall drops.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Ship higher‑quality RAG</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rag-evaluation" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">RAG Evaluation</Link>
            <Link href="/what-is-rag" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">RAG Guide</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


