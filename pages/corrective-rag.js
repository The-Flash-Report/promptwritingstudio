import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function CorrectiveRAG() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="Corrective RAG: Detect and Fix Hallucinations | PromptWritingStudio"
      description="Corrective RAG adds a verification pass to detect unsupported claims and fetch targeted evidence to correct them."
    >
      <EnhancedMeta
        title="Corrective RAG"
        description="Verification and correction loop: flag unsupported claims, retrieve evidence, and repair the answer."
        url="https://promptwritingstudio.com/corrective-rag"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime={published}
        modifiedTime={modified}
      />
      <OrganizationSchema />

      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-28 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Corrective RAG</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Prevents embarrassing mistakes by automatically re-checking questionable information.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-rag" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">RAG Basics</Link>
              <Link href="/rag-evaluation" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">Evaluate RAG</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What Corrective RAG Means for Business */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">
              What Corrective RAG Means for Your Business
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center max-w-4xl mx-auto">
              Corrective RAG prevents embarrassing mistakes by automatically re-checking questionable information before it reaches your customers.
            </p>
            
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">The AI That Catches Its Own Mistakes</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">How It Works</h4>
                  <p className="text-slate-600 mb-4">
                    Corrective RAG doesn't just provide information — it actively monitors for potential errors, suspicious data, or outdated information, then automatically re-verifies before responding.
                  </p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Detects suspicious information</li>
                    <li>• Automatically re-verifies data</li>
                    <li>• Prevents outdated responses</li>
                    <li>• Maintains data quality</li>
                    <li>• Protects brand reputation</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Real Business Example</h4>
                  <div className="bg-rose-50 p-4 rounded-lg border-l-4 border-rose-500">
                    <p className="text-sm text-slate-700 font-medium mb-2">E-commerce Pricing:</p>
                    <p className="text-sm text-slate-600 mb-3">
                      E-commerce AI finds outdated "$299 price" for a product, detects it's suspicious, re-searches, and finds current "$199 sale price."
                    </p>
                    <p className="text-sm text-slate-600">
                      <strong>Result:</strong> Prevents customers from seeing outdated pricing that could damage trust, while ensuring they get accurate, current information that drives sales.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-sm text-slate-700">
                  <strong>Bottom Line:</strong> Corrective RAG is essential for businesses where data accuracy directly impacts customer trust, sales, or compliance — particularly e-commerce, financial services, and any business with frequently changing information.
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
              { h: 'Claim extraction', d: 'Turn answer statements into verifiable claims.' },
              { h: 'Evidence search', d: 'Retrieve supporting or contradicting sources for each claim.' },
              { h: 'Repair policy', d: 'Replace or remove unsupported claims and add citations.' },
              { h: 'Audit trail', d: 'Log claim/evidence pairs for compliance review.' }
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
              <Link href="/r2ag" className="text-blue-600 hover:underline">R^2AG</Link>
              <Link href="/ra-rag" className="text-blue-600 hover:underline">RA‑RAG</Link>
              <Link href="/speculative-rag" className="text-blue-600 hover:underline">Speculative RAG</Link>
              <Link href="/rag-evaluation" className="text-blue-600 hover:underline">RAG Evaluation</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t text-center">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Increase trust with evidence‑backed outputs</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rag-chunking-strategies" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Chunking Strategies</Link>
            <Link href="/rag-evaluation" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">RAG Evaluation</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


