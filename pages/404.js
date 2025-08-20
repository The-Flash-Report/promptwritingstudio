import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Custom404() {
  const [selectedIndustry, setSelectedIndustry] = useState(null)

  const industries = [
    {
      title: "Content Creators",
      description: "YouTube, Instagram, Bloggers, Podcasters",
      icon: "🎬",
      href: "/content-creators-ai",
      color: "from-purple-500 to-pink-500",
      painPoint: "Spending 20+ hours on content creation?"
    },
    {
      title: "Service Businesses",
      description: "Consultants, Agencies, Freelancers",
      icon: "💼",
      href: "/service-business-ai",
      color: "from-blue-500 to-cyan-500",
      painPoint: "Drowning in manual processes?"
    },
    {
      title: "E-commerce Stores",
      description: "Online Stores, Dropshipping, Product Sellers",
      icon: "🛍️",
      href: "/ecommerce-ai",
      color: "from-green-500 to-emerald-500",
      painPoint: "Struggling with low conversion?"
    }
  ]

  const funMessages = [
    "Oops! Looks like this AI prompt got lost in the matrix! 🤖",
    "404: AI couldn't find this page (and it's usually pretty good at finding things!) 🔍",
    "This page is like a prompt without context - it doesn't exist! 📝",
    "Error 404: Page not found in the AI training data! 🧠",
    "Looks like this prompt didn't generate the right page! 🎯"
  ]

  const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)]

  return (
    <>
      <Head>
        <title>404 - Page Not Found | PromptWritingStudio</title>
        <meta name="description" content="Oops! This page doesn't exist. But don't worry - we have plenty of AI prompts and tools to help you succeed!" />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] via-[#2A2A2A] to-[#1A1A1A] flex items-center justify-center py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            {/* Fun 404 Message */}
            <div className="mb-12">
              <div className="text-8xl md:text-9xl font-bold text-[#FFDE59] mb-6 animate-bounce">
                404
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                {randomMessage}
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Don't worry! While this page might be missing, we have plenty of AI prompts and tools to help you succeed. 
                Let's get you back on track!
              </p>
            </div>

            {/* Industry Selection */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                What brings you here today? 🎯
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {industries.map((industry, index) => (
                  <div 
                    key={index}
                    className={`bg-white rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                      selectedIndustry === index ? 'ring-4 ring-[#FFDE59]' : ''
                    }`}
                    onClick={() => setSelectedIndustry(index)}
                  >
                    <div className={`bg-gradient-to-r ${industry.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}>
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{industry.title}</h3>
                    <p className="text-[#666666] text-sm mb-3">{industry.description}</p>
                    <p className="text-[#333333] font-medium text-sm">{industry.painPoint}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {selectedIndustry !== null && (
                <div className="mb-8">
                  <Link 
                    href={industries[selectedIndustry].href}
                    className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
                  >
                    Take Me to {industries[selectedIndustry].title} 🚀
                  </Link>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/"
                  className="bg-white text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  🏠 Go Home
                </Link>
                <Link 
                  href="/ai-prompt-generator"
                  className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
                >
                  🛠️ Try AI Tools
                </Link>
                <Link 
                  href="/calculators"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
                >
                  📊 Calculators
                </Link>
              </div>
            </div>

            {/* Fun AI Facts */}
            <div className="mt-16 p-6 bg-white bg-opacity-10 rounded-xl border border-white border-opacity-20">
              <h3 className="text-xl font-bold text-white mb-4">
                🤖 Fun AI Fact While You're Here:
              </h3>
              <p className="text-gray-300">
                Did you know? The first AI program was written in 1951 to play checkers! 
                Now we're using AI to write prompts, create content, and automate businesses. 
                How far we've come! 🚀
              </p>
            </div>

            {/* Search Suggestion */}
            <div className="mt-8 text-gray-400">
              <p className="text-sm">
                💡 Pro tip: Use the search bar above to find what you're looking for, 
                or check out our <Link href="/ai-prompt-examples" className="text-[#FFDE59] hover:underline">prompt examples</Link>!
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
