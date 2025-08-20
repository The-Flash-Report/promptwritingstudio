import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function MoRAG() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="Multi‑Fusion Retrieval Augmented Generation (MoRAG) | PromptWritingStudio"
      description="MoRAG fuses multiple retrieval signals (BM25, vector, graph, re‑rankers) for higher quality context selection."
    >
      <EnhancedMeta
        title="MoRAG: Multi‑Fusion RAG"
        description="Fuse multiple retrieval channels and re‑rankers to pick the best context across diverse content."
        url="https://promptwritingstudio.com/morag"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime={published}
        modifiedTime={modified}
      />
      <OrganizationSchema />

      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-28 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">MoRAG</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Combines multiple approaches for enterprise-level accuracy and performance. Best for large businesses where mistakes are expensive and speed matters.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-rag" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">RAG Basics</Link>
              <Link href="/rag-evaluation" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">Evaluate RAG</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What MoRAG Means for Business */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">
              What MoRAG Means for Your Business
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center max-w-4xl mx-auto">
              MoRAG combines multiple approaches for enterprise-level accuracy and performance. Best for large businesses where mistakes are expensive and speed matters.
            </p>
            
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">The Enterprise AI That Leaves Nothing to Chance</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">How It Works</h4>
                  <p className="text-slate-600 mb-4">
                    MoRAG doesn't rely on a single approach — it combines multiple RAG strategies, redundancy systems, and verification methods to ensure maximum accuracy and reliability for enterprise operations.
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Combines multiple RAG approaches</li>
                    <li>• Implements redundancy systems</li>
                    <li>• Uses cross-verification methods</li>
                    <li>• Ensures enterprise-level accuracy</li>
                    <li>• Optimizes for speed and reliability</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Real Business Example</h4>
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-slate-700 font-medium mb-2">Enterprise Software Company:</p>
                    <p className="text-sm text-slate-600 mb-3">
                      Enterprise software company combines product docs, customer tickets, Slack discussions, and competitor analysis to answer complex pre-sales questions about feature comparisons.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Result:</strong> Provides comprehensive, accurate answers that combine multiple perspectives, ensuring sales teams have the most complete information to close deals.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-sm text-slate-700">
                  <strong>Bottom Line:</strong> MoRAG is the ultimate solution for enterprise businesses where accuracy is non-negotiable, mistakes are costly, and you need the highest level of reliability combined with optimal performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { h: 'Channel fusion', d: 'Blend BM25, vector, graph, and domain indexes.' },
              { h: 'De‑duplication', d: 'Remove near‑duplicate chunks to free tokens.' },
              { h: 'Re‑ranking', d: 'Use cross‑encoders to prioritize the most useful snippets.' },
              { h: 'Budget allocator', d: 'Distribute tokens across channels based on expected gain.' }
            ].map((x, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1">{x.h}</div>
                <div className="text-sm text-slate-600">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See also */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">See also</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <Link href="/hybridrag" className="text-blue-600 hover:underline">HybridRAG</Link>
              <Link href="/graphrag" className="text-blue-600 hover:underline">GraphRAG</Link>
              <Link href="/info-rag" className="text-blue-600 hover:underline">InFO‑RAG</Link>
              <Link href="/ra-rag" className="text-blue-600 hover:underline">RA‑RAG</Link>
              <Link href="/rag-evaluation" className="text-blue-600 hover:underline">RAG Evaluation</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Best context from many sources</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hybridrag" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">HybridRAG</Link>
            <Link href="/rag-chunking-strategies" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">Chunking Strategies</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


