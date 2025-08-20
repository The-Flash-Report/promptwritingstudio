import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function RAGEvaluation() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="RAG Evaluation: Measuring Recall, Precision, and Faithfulness | PromptWritingStudio"
      description="Learn how to evaluate RAG systems with a golden set. Track recall, precision, citation coverage, latency, and costs."
    >
      <EnhancedMeta
        title="RAG Evaluation: Practical Guide"
        description="Build a small golden set and measure answer correctness, citation faithfulness, recall/precision, latency, and cost per query."
        url="https://promptwritingstudio.com/rag-evaluation"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">RAG Evaluation</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              A reliable RAG needs measurable quality. Start with a 50–200 question golden set and track accuracy, citations, latency, and cost.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rag-chunking-strategies" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">Chunking Strategies</Link>
              <Link href="/what-is-rag" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">RAG Guide</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { h: 'Answer correctness', d: 'Does the answer match the expected ground truth?' },
              { h: 'Citation faithfulness', d: 'Are claims supported by retrieved sources? No extra‑context fabrications.' },
              { h: 'Recall & precision', d: 'Do retrieved chunks cover needed facts, and are they mostly relevant?' },
              { h: 'Latency & cost', d: 'Is p95 latency and token spend acceptable for your SLA and budget?' }
            ].map((x, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-1">{x.h}</div>
                <div className="text-sm text-slate-600">{x.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Evaluation process</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Collect 50–200 representative questions with expected answers and source citations.</li>
              <li>Run your pipeline and record outputs, retrieved sources, tokens, and latency.</li>
              <li>Score correctness and faithfulness; track recall/precision for retrieval.</li>
              <li>Iterate on chunking, k, re‑ranking, and prompts; re‑test and compare results.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Improve your RAG reliability</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rag-chunking-strategies" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Chunking Strategies</Link>
            <Link href="/calculators" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">AI Calculators</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


