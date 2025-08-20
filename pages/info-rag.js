import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function InFORAG() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="InFO‑RAG: Information‑Focused Retrieval Augmented Generation | PromptWritingStudio"
      description="InFO‑RAG prioritizes information coverage and diversity, selecting sources to maximize answer completeness."
    >
      <EnhancedMeta
        title="InFO‑RAG"
        description="Select context to maximize information coverage and reduce missed facts, not just top similarity."
        url="https://promptwritingstudio.com/info-rag"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime={published}
        modifiedTime={modified}
      />
      <OrganizationSchema />

      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-28 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">InFO‑RAG</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Prioritizes the most business-critical information first, keeping conversations focused and valuable.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-rag" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">RAG Basics</Link>
              <Link href="/rag-evaluation" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">Evaluate RAG</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What InFO-RAG Means for Business */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">
              What InFO-RAG Means for Your Business
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center max-w-4xl mx-auto">
              InFO-RAG prioritizes the most business-critical information first, keeping conversations focused and valuable.
            </p>
            
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">The AI That Knows What Matters Most to Your Business</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">How It Works</h4>
                  <p className="text-slate-600 mb-4">
                    InFO-RAG doesn't just retrieve information — it intelligently ranks and prioritizes the most critical, actionable information that directly impacts your business outcomes.
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Ranks information by business impact</li>
                    <li>• Prioritizes critical deadlines</li>
                    <li>• Focuses on actionable insights</li>
                    <li>• Filters out low-priority details</li>
                    <li>• Maintains conversation relevance</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Real Business Example</h4>
                  <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500">
                    <p className="text-sm text-slate-700 font-medium mb-2">Insurance Claims Processing:</p>
                    <p className="text-sm text-slate-600 mb-3">
                      Insurance chatbot prioritizes critical claim deadlines and coverage limits over minor policy details when customers ask about accident claims.
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Result:</strong> Customers get the information they need to take immediate action, while avoiding information overload that could delay critical decisions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-slate-700">
                  <strong>Bottom Line:</strong> InFO-RAG is perfect for businesses where information overload is a problem, or where you need to ensure customers focus on the most critical, actionable information that drives business outcomes.
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
              { h: 'Coverage objective', d: 'Re‑rank for maximal coverage of sub‑topics, sections, or entities.' },
              { h: 'Diversity penalty', d: 'Avoid redundancy by down‑weighting near‑duplicate chunks.' },
              { h: 'Query decomposition', d: 'Split complex queries into facets and retrieve per facet.' },
              { h: 'Balanced k', d: 'Allocate k across facets to fit token budget and maintain recall.' }
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
              <Link href="/morag" className="text-blue-600 hover:underline">MoRAG</Link>
              <Link href="/self-rag" className="text-blue-600 hover:underline">Self‑RAG</Link>
              <Link href="/r2ag" className="text-blue-600 hover:underline">R^2AG</Link>
              <Link href="/rag-evaluation" className="text-blue-600 hover:underline">RAG Evaluation</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Reduce omissions on complex questions</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rag-chunking-strategies" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Chunking Strategies</Link>
            <Link href="/rag-evaluation" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">RAG Evaluation</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


