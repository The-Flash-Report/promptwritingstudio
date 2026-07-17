import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import ROICalculator from '../components/tools/ROICalculator'
import Link from 'next/link'
import TestimonialEmbed from '../components/sections/TestimonialEmbed'
import Instructor from '../components/sections/Instructor'
import IndustryNavigation from '../components/sections/IndustryNavigation'
import EmailCapture from '../components/ui/EmailCapture'
import Head from 'next/head'

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Prompt Writing Studio",
    "url": "https://promptwritingstudio.com",
    "logo": "https://promptwritingstudio.com/images/logo.png",
    "description": "Practical guides, templates, and comparisons for building with Claude — Claude Code, Projects, Artifacts, Skills, MCP, sub-agents, and hooks.",
    "sameAs": [
      "https://twitter.com/promptstudio",
      "https://linkedin.com/company/promptwritingstudio"
    ],
    "mainEntity": {
      "@type": "WebSite",
      "name": "Prompt Writing Studio",
      "url": "https://promptwritingstudio.com"
    }
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Layout
        title="Prompt Writing Studio — Practical Guides for Claude Code, MCP & Sub-agents"
        description="Working guides, templates, and comparisons for people building real work with Claude — Claude Code, Projects, Artifacts, Skills, MCP, sub-agents, and hooks."
      >

      <Hero />

      {/* Prompt Grader — the interactive tool */}
      <section className="py-12 bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">How good is your prompt? Grade it in 20 seconds.</h2>
              <p className="text-gray-300 mt-2 max-w-2xl">
                Paste any ChatGPT, Claude, or Gemini prompt. Get a score out of 100, feedback that quotes your
                exact words, and a rewrite you can copy. 3 free grades a day, no signup.
              </p>
            </div>
            <Link
              href="/prompt-grader"
              className="shrink-0 bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition"
            >
              Grade Your Prompt Free
            </Link>
          </div>
        </div>
      </section>

      {/* Start Here — entry points for Claude-focused content */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Start Here</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four working guides built from real projects — not marketing fluff. Pick the one closest to
              what you're trying to build this week.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/claude-code-guide" className="bg-white p-6 rounded-lg shadow hover:shadow-lg border border-gray-200 transition group">
              <div className="text-3xl mb-3">⌨️</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600">Claude Code Guide</h3>
              <p className="text-sm text-gray-600">From install to first useful session — sub-agents, slash commands, MCP, and hooks.</p>
            </Link>
            <Link href="/ai-models" className="bg-white p-6 rounded-lg shadow hover:shadow-lg border border-gray-200 transition group">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600">AI Models Compared</h3>
              <p className="text-sm text-gray-600">Claude Opus 4.8 vs Sonnet 4.6 vs GPT-5 vs Gemini 2.5 — context, price, and what each is best at.</p>
            </Link>
            <Link href="/what-is-rag" className="bg-white p-6 rounded-lg shadow hover:shadow-lg border border-gray-200 transition group">
              <div className="text-3xl mb-3">🧠</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600">RAG Explained</h3>
              <p className="text-sm text-gray-600">Retrieval-augmented generation without the buzzwords — when to use it, when to skip it.</p>
            </Link>
            <Link href="/calculators" className="bg-white p-6 rounded-lg shadow hover:shadow-lg border border-gray-200 transition group">
              <div className="text-3xl mb-3">🧮</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600">AI Calculators</h3>
              <p className="text-sm text-gray-600">Cost, ROI, and AI-vs-human decisions — answer the "is this worth it?" question with numbers.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Industry-Specific Landing Pages */}
      <IndustryNavigation />

      {/* Interactive Business Tools Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Free AI Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical tools for picking the right model, writing better prompts, and sizing a project before
              you build it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/tools/mad-libs-prompt-creator" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition group">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600">Prompt Creator</h3>
              <p className="text-gray-600 mb-4">Turn a vague idea into a structured Claude or GPT prompt in under two minutes. Useful for email, content, and customer support workflows.</p>
              <span className="text-purple-600 font-semibold">Build a prompt →</span>
            </Link>

            <Link href="/tools/prompt-diagnostic-quiz" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition group">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-red-600">Prompt Diagnostic Quiz</h3>
              <p className="text-gray-600 mb-4">Three-minute diagnostic on where your prompts are losing accuracy, cost, or clarity — with a short improvement plan at the end.</p>
              <span className="text-red-600 font-semibold">Start the quiz →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ROI Calculator - Secondary Tool */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-3 text-[#1A1A1A]">
                Quick AI ROI Calculator
              </h3>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                Rough-cut estimate of the time and cost savings from moving a task onto Claude or GPT.
              </p>
            </div>
            <ROICalculator />

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">
                Related calculators:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/calculators/ai-cost-comparison"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  AI vs Human Cost
                </Link>
                <Link
                  href="/calculators"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  All calculators
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Promotion Section */}
      <section className="py-12 bg-[#F9F9F9] border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 border border-[#E5E5E5]">
              <div className="text-6xl mb-4">🧠</div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Test your prompt-writing skills
              </h2>
              <p className="text-lg text-[#333333] mb-8 max-w-2xl mx-auto">
                Short, interactive quiz that scores your current prompting baseline and hands back a targeted
                reading list for the gaps.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/ai-prompt-quiz"
                  className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
                >
                  Take the Quiz
                </Link>
                <div className="text-sm text-[#666666]">
                  ⏱️ 5 minutes • 📊 Instant results • 🎯 Personalised recommendations
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Instructor />
      <TestimonialEmbed />

      {/* Newsletter signup */}
      <section className="py-16 md:py-24 bg-[#1A1A1A] text-white border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get practical Claude tips in your inbox
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              A short email when there's a new Claude Code skill worth installing, a guide worth
              reading, or a tool worth trying. No hype, no spam — unsubscribe anytime.
            </p>
            <div className="flex justify-center">
              <EmailCapture label="" buttonText="Subscribe" source="homepage" theme="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* Free tools CTA */}
      <section className="py-16 md:py-24 bg-[#F9F9F9] border-t border-[#E5E5E5]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Ready to write better prompts that actually work?
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              The free guides and tools on this site walk you through proven prompt patterns and workflows,
              applied to real email, content, and business tasks. Start from our{' '}
              <Link href="/chatgpt-prompt-templates" className="text-blue-600 hover:text-blue-700 underline font-medium">free ChatGPT prompt templates</Link>{' '}
              or build your own below.
            </p>
            <Link
              href="/ai-prompt-generator"
              className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
            >
              Try the Free Prompt Generator
            </Link>
          </div>
        </div>
      </section>
    </Layout>
    </>
  )
}
