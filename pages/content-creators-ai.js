import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function ContentCreatorsAI() {
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
      icon: "⏰",
      title: "Time Crunch",
      description: "Spending 20+ hours weekly on content creation"
    },
    {
      icon: "🔄",
      title: "Consistency Struggle",
      description: "Can't maintain regular posting schedule"
    },
    {
      icon: "🔥",
      title: "Creator Burnout",
      description: "Exhausted from constant content pressure"
    },
    {
      icon: "📈",
      title: "Scaling Issues",
      description: "Can't grow audience without more content"
    }
  ]

  const solutions = [
    {
      icon: "🎯",
      title: "AI Content Calendar",
      description: "Generate 30 days of content in 2 hours",
      tool: "Content Calendar Generator"
    },
    {
      icon: "📝",
      title: "Script Writer",
      description: "Turn ideas into YouTube scripts instantly",
      tool: "YouTube Script Generator"
    },
    {
      icon: "📱",
      title: "Social Media Captions",
      description: "Create engaging captions for any platform",
      tool: "Caption Creator"
    },
    {
      icon: "🎨",
      title: "Content Repurposing",
      description: "Turn one piece into 10+ formats",
      tool: "Repurposing Tool"
    }
  ]

  // Note: Using real testimonials from homepage instead of placeholder examples

  const consultingPackages = [
    {
      name: "AI Content Strategy Session",
      price: "$500",
      duration: "2 hours",
      includes: [
        "Content audit & AI opportunity assessment",
        "Custom AI prompt library for your niche",
        "Content automation workflow design",
        "30-day implementation plan",
        "Follow-up email support"
      ],
      cta: "Book Strategy Session",
      popular: false
    },
    {
      name: "AI Content Implementation",
      price: "$1,500",
      duration: "4 weeks",
      includes: [
        "Everything in Strategy Session",
        "Weekly 1-on-1 coaching calls",
        "Custom AI tool setup & training",
        "Content calendar creation",
        "Performance tracking & optimization",
        "30-day post-implementation support"
      ],
      cta: "Start Implementation",
      popular: true
    },
    {
      name: "AI Content Mastery Program",
      price: "$3,000",
      duration: "12 weeks",
      includes: [
        "Everything in Implementation",
        "Advanced AI prompt engineering",
        "Content monetization strategies",
        "Audience growth tactics",
        "Brand partnership guidance",
        "Lifetime access to updates"
      ],
      cta: "Join Mastery Program",
      popular: false
    }
  ]

  return (
    <>
      <Head>
        <title>AI Prompts for Content Creators - Save 20+ Hours Weekly | PromptWritingStudio</title>
        <meta name="description" content="Stop spending 20+ hours on content creation. Use AI prompts to generate 30 days of content in 2 hours. Join 2,000+ creators who've automated their way to success." />
        <meta name="keywords" content="AI prompts, content creation, YouTube scripts, social media content, AI content calendar, content automation" />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Prompts That Turn Content Creators Into
              <span className="block text-[#FFDE59]">Content Machines</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Stop spending 20+ hours weekly on content creation. Use AI to generate 30 days of content in 2 hours and scale your audience without burnout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="#tools"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Try Free AI Tools
              </Link>
              <Link 
                href="#consulting"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Book AI Strategy Session
              </Link>
            </div>
            <div className="text-white text-lg">
              <p>🎯 Join 2,000+ creators who've automated their way to success</p>
              <p>⚡ Get results in days, not months</p>
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
                These are the exact challenges that keep content creators stuck and overwhelmed
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
                Here's How AI Prompts Solve Your Problems
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                These AI-powered tools are already helping 2,000+ creators scale their content
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
                Ready to Transform Your Content Creation?
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Join thousands of creators who are already saving 20+ hours weekly with AI prompts
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

        {/* Consulting Services Section */}
        <section id="consulting" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Ready to Scale Your Content with AI?
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Choose the level of support that fits your goals and budget
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {consultingPackages.map((pkg, index) => (
                <div 
                  key={index} 
                  className={`bg-white p-8 rounded-lg shadow-lg border-2 ${
                    pkg.popular ? 'border-[#FFDE59] relative' : 'border-[#E5E5E5]'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FFDE59] text-[#1A1A1A] py-2 px-6 rounded-lg font-bold text-sm">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{pkg.name}</h3>
                    <div className="text-3xl font-bold text-[#1A1A1A] mb-1">{pkg.price}</div>
                    <div className="text-[#333333]">{pkg.duration}</div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#FFDE59] mr-2 text-xl">✓</span>
                        <span className="text-[#333333]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full bg-[#FFDE59] text-[#1A1A1A] py-3 px-6 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200">
                    {pkg.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Creating More Content in Less Time
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join 2,000+ content creators who've already transformed their workflow with AI prompts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/ai-prompt-generator"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Try Free AI Tools Now
              </Link>
              <Link 
                href="#consulting"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Book AI Strategy Session
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
