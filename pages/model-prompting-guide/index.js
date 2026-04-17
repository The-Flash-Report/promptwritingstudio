import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import { getAllModelGuides } from '../../lib/modelGuides'
import { generateBreadcrumbSchema } from '../../lib/schemaGenerator'

const MODEL_ICONS = {
  chatgpt: '⚡',
  claude: '🔷',
  gemini: '✦'
}

export default function ModelGuidesIndex({ guides }) {
  const pageUrl = 'https://promptwritingstudio.com/model-prompting-guide'
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://promptwritingstudio.com' },
    { name: 'Model Prompting Guides', url: pageUrl }
  ])

  return (
    <Layout
      title="AI Model Prompting Guides: ChatGPT, Claude & Gemini | PromptWritingStudio"
      description="Learn how to write better prompts for ChatGPT, Claude, and Gemini. Each guide covers model-specific techniques, what to avoid, and copy-ready examples."
      canonicalUrl={pageUrl}
    >
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </Head>

      {/* Hero */}
      <section className="gradient-bg text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
              Model-Specific Guidance
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              How to Prompt Each AI Model
            </h1>
            <p className="text-xl text-gray-200">
              ChatGPT, Claude, and Gemini are built differently — and respond better to different prompting approaches. These guides cover exactly what changes between models and why.
            </p>
          </div>
        </div>
      </section>

      {/* Model cards */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {guides.map(guide => (
                <Link
                  key={guide.model}
                  href={`/model-prompting-guide/${guide.model}`}
                  className="bg-white rounded-xl border border-[#E5E5E5] p-6 hover:border-[#FFDE59] hover:shadow-md transition group"
                >
                  <div className="text-3xl mb-4">{MODEL_ICONS[guide.model] || '◆'}</div>
                  <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-gray-700">
                    {guide.modelName}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">{guide.intro}</p>
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Best for</p>
                    <ul className="space-y-1">
                      {guide.keyStrengths.slice(0, 3).map((strength, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                          <span className="text-[#1A1A1A] flex-shrink-0">→</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="text-[#1A1A1A] font-semibold text-sm group-hover:underline">Read the guide →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 text-center">Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="text-left p-4 font-semibold">Use Case</th>
                    <th className="text-center p-4 font-semibold">ChatGPT</th>
                    <th className="text-center p-4 font-semibold">Claude</th>
                    <th className="text-center p-4 font-semibold">Gemini</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Complex reasoning', '★★★★', '★★★★★', '★★★★'],
                    ['Creative writing', '★★★★★', '★★★★', '★★★'],
                    ['Code generation', '★★★★★', '★★★★', '★★★★'],
                    ['Long document analysis', '★★★', '★★★★★', '★★★★★'],
                    ['Real-time information', '★★★', '★★', '★★★★★'],
                    ['Instruction following', '★★★★★', '★★★★★', '★★★★'],
                    ['Google Workspace integration', '★', '★', '★★★★★'],
                  ].map(([useCase, gpt, claude, gemini], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'}>
                      <td className="p-4 font-medium text-[#1A1A1A] border-b border-[#E5E5E5]">{useCase}</td>
                      <td className="p-4 text-center text-yellow-500 border-b border-[#E5E5E5]">{gpt}</td>
                      <td className="p-4 text-center text-yellow-500 border-b border-[#E5E5E5]">{claude}</td>
                      <td className="p-4 text-center text-yellow-500 border-b border-[#E5E5E5]">{gemini}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">Ratings are relative, not absolute. All three models are capable across most tasks.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">Working with Claude?</h2>
            <p className="text-gray-600 mb-8">If Claude is your main model, start with the Claude Code guide — the most practical skill upgrade for writers, marketers, and operators in 2026.</p>
            <Link
              href="/claude-code-guide"
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
            >
              Read the Claude Code guide
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const guides = getAllModelGuides()
  return { props: { guides } }
}
