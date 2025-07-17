import Layout from '../components/layout/Layout'
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
import Head from 'next/head'

export default function Home() {
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

  // FAQ Schema for homepage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is this different from other AI courses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike generic AI courses, AI Prompt Writing Studio delivers actionable templates, workflows and tutorials directly to your inbox several times weekly. This isn't theoretical—it's a practical system refined through 100+ hours of testing that you can implement immediately."
        }
      },
      {
        "@type": "Question", 
        "name": "Will this work with ChatGPT, Claude, or other AI tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! The prompt techniques and frameworks taught in PromptWritingStudio work across all major AI platforms including ChatGPT (3.5 and 4), Claude, Gemini, and others. The principles are universal and can be adapted to any current or future AI tool."
        }
      },
      {
        "@type": "Question",
        "name": "I'm not technical - will I be able to use this?", 
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! PromptWritingStudio is designed for non-technical users. No coding or technical background is required. If you can type and follow simple instructions, you can master these prompt techniques."
        }
      },
      {
        "@type": "Question",
        "name": "How long will it take to see results?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Many students report immediate improvements in their AI outputs after applying just the first few lessons. The complete course can be completed in a weekend, though most students prefer to work through it over 1-2 weeks to practice each technique."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer a money-back guarantee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer a 30-day 100% money-back guarantee. If you're not completely satisfied with the course, simply email us within 30 days of purchase for a full refund, no questions asked."
        }
      }
    ]
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>
      
      <Layout 
        title="Prompt Studio - Free AI Prompt Examples, Templates & Generator"
        description="Get 500+ free ChatGPT prompt templates and examples. Generate custom AI prompts for business, writing, and creativity. Start optimizing your AI results today."
      >
      <Hero />
      <ProblemSolution />
      <WhatYouGet />
      <Features />
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
