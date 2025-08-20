import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function WhatIsRAG() {
  const published = '2025-08-20T00:00:00Z'
  const modified = '2025-08-20T00:00:00Z'

  const steps = [
    {
      title: 'Prepare your knowledge',
      desc: 'Split documents into small chunks (e.g., 300–800 tokens) and add metadata like source, author, date, and access controls.'
    },
    {
      title: 'Create embeddings',
      desc: 'Convert each chunk into a numeric vector that captures semantic meaning (embeddings).'
    },
    {
      title: 'Store in a vector database',
      desc: 'Save vectors and metadata in a vector DB for fast similarity search (e.g., Pinecone, Weaviate, FAISS).'
    },
    {
      title: 'Retrieve relevant chunks',
      desc: 'At question time, embed the user query, search the vector DB, and optionally re-rank results.'
    },
    {
      title: 'Generate grounded answer',
      desc: 'Send the question + top chunks to an LLM with a prompt template that cites sources and follows guardrails.'
    }
  ]

  const components = [
    { name: 'Embeddings model', detail: 'Turns text into vectors. Choose domain-appropriate, multilingual if needed.' },
    { name: 'Vector database', detail: 'Stores vectors with filters, hybrid search, re-indexing, and scale features.' },
    { name: 'Retriever', detail: 'Similarity search with filters; often k=3–8. Add hybrid BM25 + vector for robustness.' },
    { name: 'Re-ranker (optional)', detail: 'Improves result ordering for long corpora or noisy data.' },
    { name: 'Prompt template', detail: 'Instructs the LLM to answer only from provided context and cite sources.' },
    { name: 'LLM', detail: 'Generates final response. Select based on latency, cost, and quality.' }
  ]

  const pitfalls = [
    { p: 'Hallucinations from weak grounding', fix: 'Use stricter prompts, increase k modestly, add re-ranking, and require citations.' },
    { p: 'Stale or missing data', fix: 'Automate ingestion pipelines and schedule re-embeddings when source content changes.' },
    { p: 'Oversized chunks', fix: 'Right-size chunking (semantic or fixed), include overlap, and carry key metadata.' },
    { p: 'Prompt injection via pasted content', fix: 'Sanitize inputs, apply content policies, and constrain the assistant to context.' },
    { p: 'Over-reliance on fine-tuning', fix: 'Use RAG for facts; fine-tune for tone/format. Combine when appropriate.' }
  ]

  return (
    <Layout
      title="What is RAG? Retrieval‑Augmented Generation Explained for Business | PromptWritingStudio"
      description="Learn how Retrieval‑Augmented Generation (RAG) combines your documents with generative AI to deliver accurate, source‑grounded answers. When to use it, costs, stack options, and pitfalls."
    >
      <EnhancedMeta
        title="What is RAG? Retrieval‑Augmented Generation Explained for Business"
        description="Clear, practical guide to RAG: how it works, when to use it vs fine‑tuning, key components, costs, and common pitfalls — with links to tools and calculators."
        url="https://promptwritingstudio.com/what-is-rag"
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              What is RAG (Retrieval‑Augmented Generation)?
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              RAG combines a search step over your private knowledge with a generative model so answers are accurate, up‑to‑date, and cite sources.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/ai-glossary" className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100">Browse AI Glossary</Link>
              <Link href="/calculators/ai-cost-comparison" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900">Estimate AI ROI</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What RAG Means for Business */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 text-center">
              What RAG Means for Your Business
            </h2>
            <p className="text-lg text-slate-700 mb-8 text-center max-w-4xl mx-auto">
              RAG isn't just technical jargon — it's a practical way to make your AI assistant actually know your business instead of making things up.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Basic RAG: Your AI Knows Your Documents</h3>
                <p className="text-slate-600 mb-4">
                  Your AI assistant can pull from your company's actual documents instead of making stuff up.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-slate-700 font-medium">Example:</p>
                  <p className="text-sm text-slate-600">
                    A SaaS company's chatbot answers "What's our refund policy?" by pulling the exact policy from their terms of service document instead of hallucinating fake rules.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Smart RAG: Cost-Effective & Fast</h3>
                <p className="text-slate-600 mb-4">
                  Saves money by only searching your knowledge base when needed, making responses faster and cheaper.
                </p>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-slate-700 font-medium">Example:</p>
                  <p className="text-sm text-slate-600">
                    An e-commerce site's AI knows basic shipping info by heart but only searches the inventory database when asked "Do you have size 10 Nike Air Max in red?" — saving API costs on simple questions.
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Advanced RAG: Strategic Business Intelligence</h3>
                <p className="text-slate-600 mb-4">
                  Combines your internal knowledge with external market data for more strategic conversations.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm text-slate-700 font-medium">Example:</p>
                  <p className="text-sm text-slate-600">
                    A real estate agent's AI combines internal listings with external data: "This $500k house is 15% below neighborhood average based on recent Zillow comps, and we have similar properties at $485k and $520k."
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Enterprise RAG: Complete Business Context</h3>
                <p className="text-slate-600 mb-4">
                  Understands relationships in your business data, giving strategic insights instead of just isolated facts.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <p className="text-sm text-slate-700 font-medium">Example:</p>
                  <p className="text-sm text-slate-600">
                    HR system knows "John Smith" connects to "Marketing Department," "2019 hire date," "reports to Sarah," and "worked on Tesla campaign" — providing complete employee context.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-600 mb-4">
                Ready to see how different RAG approaches can solve your specific business challenges?
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/auto-rag" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Auto-RAG</Link>
                <Link href="/self-rag" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">Self-RAG</Link>
                <Link href="/flare-active-rag" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">FLARE/Active RAG</Link>
                <Link href="/r2ag" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">R²AG</Link>
                <Link href="/graphrag" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">GraphRAG</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems RAG Solves */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Why businesses use RAG</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-2">Reduce hallucinations</h3>
                <p className="text-slate-600 text-sm">Ground answers in your documents to improve factual accuracy and trust.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-2">Keep answers current</h3>
                <p className="text-slate-600 text-sm">No need to retrain models for policy or price updates — just re‑index sources.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-800 mb-2">Control and compliance</h3>
                <p className="text-slate-600 text-sm">Cite sources, filter by permissions, and log provenance for audits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900">How RAG works (5 steps)</h2>
            <div className="grid md:grid-cols-5 gap-4">
              {steps.map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mb-3">{i + 1}</div>
                  <div className="font-semibold text-slate-800 mb-1">{s.title}</div>
                  <div className="text-sm text-slate-600">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core components */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Core components</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {components.map((c, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <div className="font-semibold text-slate-800 mb-1">{c.name}</div>
                  <div className="text-sm text-slate-600">{c.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RAG vs Fine-tuning */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">RAG vs fine‑tuning</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="text-left p-3">Use‑case</th>
                    <th className="text-left p-3">Choose RAG when…</th>
                    <th className="text-left p-3">Choose fine‑tuning when…</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-3">Facts from your content</td>
                    <td className="p-3">You need answers grounded in private docs with citations</td>
                    <td className="p-3">You need consistent tone/style but facts can be generic</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Frequent updates</td>
                    <td className="p-3">Sources change often; re‑index is easier than retraining</td>
                    <td className="p-3">Core behavior rarely changes; cost of training is justified</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-3">Strict compliance</td>
                    <td className="p-3">You must cite sources and restrict to approved materials</td>
                    <td className="p-3">You want brand voice or structured formats by default</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation checklist */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Implementation checklist</h2>
            <ul className="grid md:grid-cols-2 gap-4 text-slate-700">
              <li className="bg-white border border-blue-100 rounded-lg p-4">Define high‑value questions and success metrics (answer quality, citation coverage, latency).</li>
              <li className="bg-white border border-blue-100 rounded-lg p-4">Choose chunking strategy (fixed vs semantic) with 10–20% overlap.</li>
              <li className="bg-white border border-blue-100 rounded-lg p-4">Capture metadata (source URL, section, date, access level).</li>
              <li className="bg-white border border-blue-100 rounded-lg p-4">Add hybrid retrieval (BM25 + vector) and optional re‑ranking.</li>
              <li className="bg-white border border-blue-100 rounded-lg p-4">Template prompts to “answer only from context” and cite sources.</li>
              <li className="bg-white border border-blue-100 rounded-lg p-4">Evaluate regularly with a small golden set and track regressions.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stack options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Popular stacks</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-2">Hosted & simple</div>
                <ul className="list-disc list-inside text-slate-600">
                  <li>LLM: OpenAI or Anthropic</li>
                  <li>Vector DB: Pinecone, Weaviate</li>
                  <li>Orchestration: LangChain or LlamaIndex</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-2">Open source</div>
                <ul className="list-disc list-inside text-slate-600">
                  <li>LLM: Open models (e.g., Llama)</li>
                  <li>Vector DB: FAISS, Qdrant</li>
                  <li>Orchestration: Haystack, Guidance</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="font-semibold text-slate-800 mb-2">Enterprise</div>
                <ul className="list-disc list-inside text-slate-600">
                  <li>Access control at query time</li>
                  <li>PII redaction and audit logs</li>
                  <li>SLAs and cost monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost & performance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Cost and performance tips</h2>
            <div className="grid md:grid-cols-2 gap-6 text-slate-700 text-sm">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="font-semibold mb-2">Control context size</div>
                <p>Smaller, relevant chunks reduce tokens and improve quality. Start with k=4–6.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="font-semibold mb-2">Cache smartly</div>
                <p>Memoize retrieval for common queries and reuse responses where policy allows.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="font-semibold mb-2">Refresh cadence</div>
                <p>Schedule re‑embeddings for changed documents; avoid reprocessing the entire corpus.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="font-semibold mb-2">Evaluate routinely</div>
                <p>Track answer correctness, citation coverage, latency, and cost per query.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pitfalls */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Common pitfalls and fixes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pitfalls.map((x, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-red-100">
                  <div className="font-semibold text-slate-800">{x.p}</div>
                  <div className="text-sm text-slate-600 mt-1">Fix: {x.fix}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">Security and governance</h2>
            <ul className="space-y-3 text-slate-700">
              <li>Enforce access control filters at retrieval time (user, team, region).</li>
              <li>Redact PII and sensitive data in ingestion pipelines where required.</li>
              <li>Log sources used for each answer for audits and quality reviews.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Related reading */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Related reading</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <Link href="/what-is-fine-tuning" className="text-blue-600 hover:underline">What is Fine‑Tuning?</Link>
              <Link href="/what-are-embeddings" className="text-blue-600 hover:underline">What are Embeddings?</Link>
              <Link href="/what-is-a-vector-database" className="text-blue-600 hover:underline">What is a Vector Database?</Link>
              <Link href="/rag-chunking-strategies" className="text-blue-600 hover:underline">RAG Chunking Strategies</Link>
              <Link href="/rag-evaluation" className="text-blue-600 hover:underline">RAG Evaluation</Link>
              <Link href="/hybridrag" className="text-blue-600 hover:underline">HybridRAG</Link>
              <Link href="/graphrag" className="text-blue-600 hover:underline">GraphRAG</Link>
              <Link href="/self-rag" className="text-blue-600 hover:underline">Self‑RAG</Link>
              <Link href="/corrective-rag" className="text-blue-600 hover:underline">Corrective RAG</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Put RAG to work in your business</h2>
          <p className="text-slate-600 mb-8 max-w-3xl mx-auto">Estimate ROI, generate great prompts, and explore more AI fundamentals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculators" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">AI Calculators Hub</Link>
            <Link href="/ai-prompt-generator" className="border border-blue-600 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">AI Prompt Generator</Link>
            <Link href="/ai-glossary" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-white">AI Glossary</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}


