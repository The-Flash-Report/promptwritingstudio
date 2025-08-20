import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function SelfRAG() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="Self‑RAG: Reflect‑Retrieve‑Revise for Better Answers | PromptWritingStudio"
      description="Self‑RAG adds self‑reflection loops to retrieval: draft, check gaps, retrieve more, and revise with citations."
    >
      <EnhancedMeta
        title="Self‑RAG: Reflect, Retrieve, Revise"
        description="How self‑reflection loops improve RAG quality by identifying gaps, retrieving more evidence, and revising answers."
        url="https://promptwritingstudio.com/self-rag"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime={published}
        modifiedTime={modified}
      />
      <OrganizationSchema />

      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-28 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Self‑RAG</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Add a reflect‑then‑retrieve loop: produce a draft, detect missing facts, retrieve extra context, and revise with citations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-rag" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">RAG Basics</Link>
              <Link href="/rag-evaluation" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">Evaluate RAG</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Self-RAG Means for Business */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">
              What Self-RAG Means for Your Business
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center max-w-4xl mx-auto">
              Self-RAG reduces costly mistakes by double-checking information before responding. Critical for businesses where wrong answers hurt trust or compliance.
            </p>
            
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">The Self-Correcting AI That Protects Your Business</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">How It Works</h4>
                  <p className="text-slate-600 mb-4">
                    Self-RAG doesn't just answer — it double-checks itself by reflecting on its response, identifying gaps, and retrieving additional information to ensure accuracy.
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Generates initial answer</li>
                    <li>• Self-assesses confidence level</li>
                    <li>• Identifies missing information</li>
                    <li>• Retrieves additional context</li>
                    <li>• Revises with corrections</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Real Business Example</h4>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm text-slate-700 font-medium mb-2">Financial Advisory Service:</p>
                    <p className="text-sm text-slate-600 mb-3">
                      A financial advisor's AI says "Our minimum investment is $10,000" then double-checks recent policy updates and corrects itself: "Actually, we lowered it to $5,000 last month."
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Result:</strong> Prevents costly compliance violations and maintains client trust through accurate, up-to-date information.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm text-slate-700">
                  <strong>Bottom Line:</strong> Self-RAG is essential for businesses in regulated industries, financial services, healthcare, or any field where accuracy directly impacts customer trust and legal compliance.
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
              { h: 'Draft & reflect', d: 'Generate an initial answer and self‑assess confidence and missing evidence.' },
              { h: 'Targeted re‑retrieval', d: 'Issue follow‑up queries for specific gaps identified by the reflection.' },
              { h: 'Revise with citations', d: 'Incorporate new evidence and cite sources explicitly.' },
              { h: 'Stop conditions', d: 'Limit loops by confidence thresholds, token budgets, or max rounds.' }
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
              <Link href="/corrective-rag" className="text-blue-600 hover:underline">Corrective RAG</Link>
              <Link href="/r2ag" className="text-blue-600 hover:underline">R^2AG</Link>
              <Link href="/flare-active-rag" className="text-blue-600 hover:underline">FLARE / Active RAG</Link>
              <Link href="/ra-rag" className="text-blue-600 hover:underline">RA‑RAG</Link>
              <Link href="/rag-evaluation" className="text-blue-600 hover:underline">RAG Evaluation</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Reduce omissions and improve faithfulness</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rag-evaluation" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">RAG Evaluation</Link>
            <Link href="/rag-chunking-strategies" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">Chunking Strategies</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


