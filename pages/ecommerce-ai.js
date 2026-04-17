import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function EcommerceAI() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Implement email capture
    console.log('Email captured:', email)
    setIsSubmitting(false)
    setEmail('')
  }

  const painPoints = [
    {
      icon: "📝",
      title: "Product Descriptions",
      description: "Hours spent writing compelling product copy"
    },
    {
      icon: "📧",
      title: "Customer Service",
      description: "Overwhelmed with customer inquiries and support"
    },
    {
      icon: "📱",
      title: "Content Creation",
      description: "Struggling to create engaging social media content"
    },
    {
      icon: "💰",
      title: "Low Conversion",
      description: "Products not converting despite good traffic"
    }
  ]

  const solutions = [
    {
      icon: "🛍️",
      title: "Product Description Generator",
      description: "Turn product features into compelling sales copy in minutes",
      tool: "AI Product Copywriter"
    },
    {
      icon: "🤖",
      title: "Customer Service Automation",
      description: "Handle 80% of customer inquiries automatically",
      tool: "AI Customer Service Bot"
    },
    {
      icon: "📸",
      title: "Social Media Content",
      description: "Generate engaging posts for all platforms instantly",
      tool: "Content Creator Suite"
    },
    {
      icon: "📊",
      title: "Conversion Optimization",
      description: "AI-powered product page optimization for higher sales",
      tool: "Conversion Optimizer"
    }
  ]

  return (
    <>
      <Head>
        <title>AI E-commerce Automation - Increase Sales 40% with AI Prompts | PromptWritingStudio</title>
        <meta name="description" content="Turn AI prompts into 40% more e-commerce sales. Generate product descriptions in minutes, automate customer service, and create engaging content. Join 1,000+ store owners who've automated their way to growth." />
        <meta name="keywords" content="AI e-commerce, product description generator, e-commerce automation, AI customer service, e-commerce content creation" />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Turn AI Prompts Into
              <span className="block text-[#FFDE59]">40% More E-commerce Sales</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Stop struggling with product descriptions and customer service. Use AI to generate compelling copy in minutes, automate support, and create content that converts visitors into buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="#tools"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Try Free AI Tools
              </Link>
              <Link
                href="/calculators/ecommerce-ai-savings"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                See the Savings Calculator
              </Link>
            </div>
            <div className="text-white text-lg">
              <p>⚡ Free tools. No signup required.</p>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Sound Familiar?
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                These are the exact challenges that keep e-commerce stores from scaling
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {painPoints.map((point, index) => (
                <div key={index} className="text-center p-6 bg-[#F9F9F9] rounded-lg border border-[#E5E5E5]">
                  <div className="text-4xl mb-4">{point.icon}</div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{point.title}</h3>
                  <p className="text-[#333333]">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="tools" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Here's How AI Prompts Solve Your E-commerce Problems
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                These AI-powered tools are already helping 1,000+ e-commerce stores increase sales
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-[#E5E5E5]">
                  <div className="text-4xl mb-4">{solution.icon}</div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{solution.title}</h3>
                  <p className="text-[#333333] mb-4">{solution.description}</p>
                  <div className="bg-[#FFDE59] bg-opacity-20 p-3 rounded-lg">
                    <span className="text-[#1A1A1A] font-semibold">{solution.tool}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/ai-prompt-generator"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Try All AI Tools Free
              </Link>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Ready to Boost Your E-commerce Sales?
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Join thousands of store owners who are already increasing sales with AI prompts
              </p>
            </div>
            
            <div className="text-center">
              <Link 
                href="/"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200 inline-block mb-6"
              >
                See Real Customer Results
              </Link>
              <p className="text-[#666666] text-sm">
                Check out our homepage for authentic testimonials from real customers
              </p>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center">
              More e-commerce AI resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/calculators/ecommerce-ai-savings" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">E-commerce savings calculator</h3>
                <p className="text-sm text-[#666666]">Estimate what AI on product descriptions and customer service is worth to your store.</p>
              </Link>
              <Link href="/ai-prompt-examples" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Prompt examples library</h3>
                <p className="text-sm text-[#666666]">Real prompts for product copy, email, and support — not fluff.</p>
              </Link>
              <Link href="/ai-models" className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Which model to use?</h3>
                <p className="text-sm text-[#666666]">Claude, GPT, Gemini compared on price and writing quality.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start scaling your store with AI
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Free AI prompts, templates, and calculators — no signup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/ai-prompt-generator"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Try the Prompt Generator
              </Link>
              <Link
                href="/calculators"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Browse Calculators
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
