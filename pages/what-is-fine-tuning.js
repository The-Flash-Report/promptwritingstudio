import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function WhatIsFineTuning() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  return (
    <Layout
      title="What is Fine‑Tuning? When to Use It vs RAG | PromptWritingStudio"
      description="Learn when to fine‑tune a model vs use RAG. Compare benefits, costs, data needs, and risks with a simple decision guide."
    >
      <EnhancedMeta
        title="What is Fine‑Tuning? When to Use It vs RAG"
        description="Clear, practical guide: fine‑tuning vs RAG, decision matrix, data requirements, costs, and risks."
        url="https://promptwritingstudio.com/what-is-fine-tuning"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">What is Fine‑Tuning?</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Fine‑tuning adapts a pre‑trained model to your style or formats. Use RAG when you need factual answers from your documents; fine‑tune for tone and task patterns.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-is-rag" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">What is RAG?</Link>
              <Link href="/ai-glossary" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">AI Glossary</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Decision matrix */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Fine‑tuning vs RAG: quick guide</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="text-left p-3">Scenario</th>
                    <th className="text-left p-3">Prefer RAG</th>
                    <th className="text-left p-3">Prefer Fine‑tuning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">Up‑to‑date factual answers</td>
                    <td className="p-3">Answers must cite and follow latest docs</td>
                    <td className="p-3">Not ideal—training cadence too slow</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Brand voice & consistent formats</td>
                    <td className="p-3">Prompt templates may be enough</td>
                    <td className="p-3">Great fit for tone and structure</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Limited or sensitive data</td>
                    <td className="p-3">Index private docs without training</td>
                    <td className="p-3">Requires careful data prep & policy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Costs & data needs */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800 mb-1">Data requirements</div>
              <div className="text-sm text-slate-600">Hundreds–thousands of high‑quality examples for stable gains.</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800 mb-1">Cost model</div>
              <div className="text-sm text-slate-600">One‑time training + inference cost; retrain when behavior drifts.</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="font-semibold text-slate-800 mb-1">Risks</div>
              <div className="text-sm text-slate-600">Overfitting, leakage, outdated behavior; mitigate with evals and policy.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Choose the right approach</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/what-is-rag" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Learn RAG</Link>
            <Link href="/calculators" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">AI Calculators</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


