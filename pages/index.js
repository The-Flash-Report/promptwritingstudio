import Layout from '../components/layout/Layout'
import { useEffect, useState } from 'react'
import Hero from '../components/sections/Hero'
import ROICalculator from '../components/tools/ROICalculator'
import Link from 'next/link'
import ProblemSolution from '../components/sections/ProblemSolution'
import WhatYouGet from '../components/sections/WhatYouGet'
import Features from '../components/sections/Features'
import Pricing from '../components/sections/Pricing'
import Testimonials from '../components/sections/Testimonials'
import TestimonialEmbed from '../components/sections/TestimonialEmbed'
import Guarantee from '../components/sections/Guarantee'
import FAQ from '../components/sections/FAQ'
import Instructor from '../components/sections/Instructor'
import IndustryNavigation from '../components/sections/IndustryNavigation'
import Head from 'next/head'

export default function Home() {
  const [showExitModal, setShowExitModal] = useState(false)

  // Exit-intent modal (homepage only)
  useEffect(() => {
    const checkoutUrl = 'https://checkout.teachable.com/secure/37332/checkout/order_g23vx78p'

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
      // Trigger when the cursor leaves at the top of the viewport
      if (e.relatedTarget === null && e.clientY <= 0) {
        try { sessionStorage.setItem('exit_intent_handled', '1') } catch (e) {}
        // Add a 2-second delay to make it less aggressive
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
    "alternateName": "Prompt Studio",
    "url": "https://promptwritingstudio.com",
    "logo": "https://promptwritingstudio.com/images/logo.png",
    "description": "Get 500+ free ChatGPT prompt templates and examples. Generate custom AI prompts for business, writing, and creativity.",
    "sameAs": [
      "https://twitter.com/promptstudio",
      "https://linkedin.com/company/promptwritingstudio"
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Free AI Prompt Examples",
        "description": "500+ free AI prompt examples for ChatGPT, Claude, and Gemini",
        "url": "https://promptwritingstudio.com/ai-prompt-examples",
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer", 
        "name": "ChatGPT Templates",
        "description": "Ready-to-use ChatGPT templates for business and content creation",
        "url": "https://promptwritingstudio.com/chatgpt-templates",
        "price": "0",
        "priceCurrency": "USD"
      },
      {
        "@type": "Service",
        "name": "AI Prompt Generator",
        "description": "Free tool to generate custom AI prompts for any use case",
        "url": "https://promptwritingstudio.com/ai-prompt-generator"
      }
    ],
    "mainEntity": {
      "@type": "WebSite",
      "name": "Prompt Studio",
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
        title="Save 20+ Hours Weekly with AI Prompts - Business Automation Tools"
        description="Save 20+ hours weekly with proven AI prompts for business automation. Free ChatGPT templates, calculators, and tools that increase productivity and reduce costs."
      >
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div role="dialog" aria-modal="true" className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🚀 Save 20+ Hours Weekly!</h3>
              <p className="text-gray-700">Don't miss out on proven AI prompts that automate your business tasks. Get instant access to the complete system and start saving time today.</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => { window.location.href = 'https://checkout.teachable.com/secure/37332/checkout/order_g23vx78p' }}
                className="w-full bg-[#FFDE59] text-[#1A1A1A] py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors"
              >
                Start Saving Time Now
              </button>
              <button
                onClick={() => setShowExitModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
      <Hero />
      <ProblemSolution />
      <WhatYouGet />
      
      {/* Industry-Specific Landing Pages */}
      <IndustryNavigation />
      
              {/* Interactive Business Tools Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🛠️ Free Business AI Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Save 10+ hours weekly with our proven business automation tools
              </p>
            </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/tools/mad-libs-prompt-creator" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition group">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600">Business Prompt Creator</h3>
              <p className="text-gray-600 mb-4">Create custom business prompts in 2 minutes. Automate email responses, content creation, and customer service. Save 5+ hours weekly!</p>
              <span className="text-purple-600 font-semibold">Save Time Now →</span>
            </Link>
            
            <Link href="/tools/prompt-diagnostic-quiz" className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition group">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-red-600">AI ROI Assessment</h3>
              <p className="text-gray-600 mb-4">Discover exactly how much time and money your business could save with AI. Get personalized ROI recommendations in 3 minutes.</p>
              <span className="text-red-600 font-semibold">Calculate Savings →</span>
            </Link>
          </div>
        </div>
      </section>
      
              <Features />

        {/* Business Lead Magnet Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              📊 Get Your FREE Business AI ROI Report
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Discover exactly how much your business could save with AI automation. 
              Get a personalized report showing your potential time and cost savings.
            </p>
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Free ROI Calculator + Business Prompt Pack
              </h3>
              <ul className="text-left text-gray-600 mb-6 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Personalized savings calculation
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  50+ business automation prompts
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Industry-specific recommendations
                </li>
              </ul>
              <Link 
                href="/calculators/ai-cost-comparison"
                className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Calculate My Business Savings →
              </Link>
            </div>
          </div>
        </section>

        <Pricing />
      <Testimonials />
      <Guarantee />
      <FAQ />
      
      {/* ROI Calculator - Secondary Tool */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-3 text-[#1A1A1A]">
                Bonus: Calculate Your AI Savings
              </h3>
              <p className="text-base text-gray-600 max-w-xl mx-auto">
                Quick tool to estimate potential time and cost savings from AI automation.
              </p>
            </div>
            <ROICalculator />
            
            {/* Calculator Cross-Links */}
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">
                Explore our other business calculators:
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/calculators/ai-cost-comparison"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  AI vs Human Cost Calculator
                </Link>
                <Link 
                  href="/calculators"
                  className="text-blue-600 hover:text-blue-800 text-sm underline"
                >
                  View All Calculators
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
                Test Your AI Prompt Writing Skills
              </h2>
              <p className="text-lg text-[#333333] mb-8 max-w-2xl mx-auto">
                Take our interactive quiz to discover your current skill level and get personalized recommendations to improve your AI prompt writing results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/ai-prompt-quiz"
                  className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
                >
                  Take the Quiz Now
                </Link>
                <div className="text-sm text-[#666666]">
                  ⏱️ Takes 5 minutes • 📊 Get instant results • 🎯 Personalized recommendations
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
