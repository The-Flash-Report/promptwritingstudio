import Layout from '../components/layout/Layout'
import { useEffect, useState } from 'react'
import Hero from '../components/sections/Hero'
import ROICalculator from '../components/tools/ROICalculator'
import Link from 'next/link'
import TestimonialEmbed from '../components/sections/TestimonialEmbed'
import Instructor from '../components/sections/Instructor'
import IndustryNavigation from '../components/sections/IndustryNavigation'
import Head from 'next/head'

export default function Home() {
  const [showExitModal, setShowExitModal] = useState(false)

  // Exit-intent modal (homepage only)
  useEffect(() => {
    // Skip if already handled this session
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('exit_intent_handled') === '1') {
        return
      }
    } catch (e) {}

    // Only apply on devices with a mouse pointer
    if (typeof window !== 'undefined' && window.matchMedia && !window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const handleMouseOut = (e) => {
      if (!e) return
      if (e.relatedTarget === null && e.clientY <= 0) {
        try { sessionStorage.setItem('exit_intent_handled', '1') } catch (e) {}
        setTimeout(() => {
          setShowExitModal(true)
        }, 2000)
      }
    }

    window.addEventListener('mouseout', handleMouseOut)
    return () => window.removeEventListener('mouseout', handleMouseOut)
  }, [])

  // Allow closing modal with Escape
  useEffect(() => {
    if (!showExitModal) return
    const onKey = (e) => {
      if (e.key === 'Escape') setShowExitModal(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showExitModal])

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
      "url": "https://promptwritingstudio.com",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://promptwritingstudio.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
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
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div role="dialog" aria-modal="true" className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">One last thing before you go</h3>
              <p className="text-gray-700">Grab the free Claude Code starter guide — the same checklist we use to onboard new teams into Claude Code in an afternoon.</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => { window.location.href = '/claude-code-guide' }}
                className="w-full bg-[#FFDE59] text-[#1A1A1A] py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors"
              >
                Read the Claude Code guide
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}

      <Hero />

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
              <p className="text-sm text-gray-600">Claude Opus 4 vs Sonnet 4 vs GPT-5 vs Gemini 2.5 — context, price, and what each is best at.</p>
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
    </Layout>
    </>
  )
}
