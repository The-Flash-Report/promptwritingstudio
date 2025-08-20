import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function R2AG() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="R^2AG: Retrieval‑Refinement Augmented Generation | PromptWritingStudio"
      description="R^2AG adds a refinement stage after initial generation using focused retrieval to correct and improve answers."
    >
      <EnhancedMeta
        title="R^2AG"
        description="Retrieval‑Refinement loop to upgrade initial answers with targeted evidence and edits."
        url="https://promptwritingstudio.com/r2ag"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime={published}
        modifiedTime={modified}
      />
      <OrganizationSchema />

      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-28 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">R²AG</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Combines your internal knowledge with external market data for more strategic conversations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-rag" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">RAG Basics</Link>
              <Link href="/rag-evaluation" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">Evaluate RAG</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What R²AG Means for Business */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">
              What R²AG Means for Your Business
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center max-w-4xl mx-auto">
              R²AG combines your internal knowledge with external market data for more strategic conversations that give you a competitive edge.
            </p>
            
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">The Strategic AI That Knows Your Market Position</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">How It Works</h4>
                  <p className="text-slate-600 mb-4">
                    R²AG doesn't just search your internal documents — it combines your proprietary data with external market intelligence to provide strategic insights and competitive analysis.
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Searches internal knowledge base</li>
                    <li>• Integrates external market data</li>
                    <li>• Provides competitive positioning</li>
                    <li>• Offers strategic recommendations</li>
                    <li>• Combines multiple data sources</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Real Business Example</h4>
                  <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
                    <p className="text-sm text-slate-700 font-medium mb-2">Real Estate Agency:</p>
                    <p className="text-sm text-slate-600 mb-3">
                      A real estate agent's AI combines internal listings with external data: "This $500k house is 15% below neighborhood average based on recent Zillow comps, and we have similar properties at $485k and $520k."
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Result:</strong> Provides clients with market context and competitive positioning that drives better decision-making and sales.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-slate-700">
                  <strong>Bottom Line:</strong> R²AG is perfect for businesses that need to stay competitive by combining internal expertise with external market intelligence — ideal for real estate, consulting, financial services, and competitive industries.
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
              { h: 'Focused queries', d: 'Extract missing claims and turn them into retrieval queries.' },
              { h: 'Selective refinement', d: 'Edit only the sections affected by new evidence to save tokens.' },
              { h: 'Citations first', d: 'Require citations for changed content to prevent regressions.' },
              { h: 'Evaluation loop', d: 'Track lift in correctness/faithfulness vs extra latency/cost.' }
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
              <Link href="/self-rag" className="text-blue-600 hover:underline">Self‑RAG</Link>
              <Link href="/corrective-rag" className="text-blue-600 hover:underline">Corrective RAG</Link>
              <Link href="/speculative-rag" className="text-blue-600 hover:underline">Speculative RAG</Link>
              <Link href="/ra-rag" className="text-blue-600 hover:underline">RA‑RAG</Link>
              <Link href="/rag-evaluation" className="text-blue-600 hover:underline">RAG Evaluation</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Upgrade quality with minimal complexity</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/self-rag" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Self‑RAG</Link>
            <Link href="/what-is-rag" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">RAG Basics</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


