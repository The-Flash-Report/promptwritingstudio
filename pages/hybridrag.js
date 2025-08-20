import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function HybridRAG() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="HybridRAG: BM25 + Vector + Re‑Rankers | PromptWritingStudio"
      description="HybridRAG combines keyword search, semantic vectors, and re‑ranking to improve retrieval robustness and quality."
    >
      <EnhancedMeta
        title="HybridRAG"
        description="Blend BM25 and vector retrieval with re‑rankers for short queries and diverse corpora."
        url="https://promptwritingstudio.com/hybridrag"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime={published}
        modifiedTime={modified}
      />
      <OrganizationSchema />

      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-28 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">HybridRAG</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Searches both structured data (CRM, inventory) and unstructured content (emails, documents) across multiple systems.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-rag" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">RAG Basics</Link>
              <Link href="/rag-evaluation" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">Evaluate RAG</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What HybridRAG Means for Business */}
      <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">
              What HybridRAG Means for Your Business
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center max-w-4xl mx-auto">
              HybridRAG searches both structured data (CRM, inventory) and unstructured content (emails, documents) across multiple systems.
            </p>
            
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">The AI That Connects All Your Business Data</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">How It Works</h4>
                  <p className="text-slate-600 mb-4">
                    HybridRAG doesn't limit itself to one type of data — it intelligently searches across your entire business ecosystem, from structured databases to unstructured conversations and documents.
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Searches structured databases</li>
                    <li>• Analyzes unstructured content</li>
                    <li>• Connects multiple data sources</li>
                    <li>• Provides comprehensive insights</li>
                    <li>• Bridges data silos</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Real Business Example</h4>
                  <div className="bg-cyan-50 p-4 rounded-lg border-l-4 border-cyan-500">
                    <p className="text-sm text-slate-700 font-medium mb-2">Restaurant Booking System:</p>
                    <p className="text-sm text-slate-600 mb-3">
                      Restaurant booking system searches both reservation database AND customer notes to find "the couple who requested the quiet corner table for their anniversary last month."
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Result:</strong> Provides personalized service that combines hard data with human insights, creating memorable customer experiences that drive loyalty and repeat business.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-slate-700">
                  <strong>Bottom Line:</strong> HybridRAG is perfect for businesses with multiple data systems, customer service operations, or those that need to provide personalized experiences by combining structured and unstructured information.
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
              { h: 'BM25 recall', d: 'Great for short or keyword‑heavy queries and exact matches.' },
              { h: 'Vector semantics', d: 'Find by meaning; robust to paraphrase and synonymy.' },
              { h: 'Cross‑encoder re‑rank', d: 'Re‑rank top candidates for higher precision.' },
              { h: 'Filters & access', d: 'Apply permissions and metadata filters across both paths.' }
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
              <Link href="/morag" className="text-blue-600 hover:underline">MoRAG</Link>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Increase retrieval robustness</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rag-evaluation" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">RAG Evaluation</Link>
            <Link href="/rag-chunking-strategies" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">Chunking Strategies</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


