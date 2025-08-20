import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function ServiceBusinessAI() {
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
      title: "Manual Processes",
      description: "Spending hours on repetitive client tasks"
    },
    {
      icon: "📧",
      title: "Client Communication",
      description: "Drowning in emails and follow-ups"
    },
    {
      icon: "📊",
      title: "Proposal Creation",
      description: "Hours spent writing custom proposals"
    },
    {
      icon: "🔄",
      title: "Scaling Limitations",
      description: "Can't grow without hiring more staff"
    }
  ]

  const solutions = [
    {
      icon: "📋",
      title: "Proposal Generator",
      description: "Turn service descriptions into proposals in minutes",
      tool: "AI Proposal Generator"
    },
    {
      icon: "📧",
      title: "Email Automation",
      description: "Handle 80% of client communications automatically",
      tool: "Email Sequence Builder"
    },
    {
      icon: "❓",
      title: "FAQ Templates",
      description: "Instant responses to common client questions",
      tool: "FAQ Response System"
    },
    {
      icon: "📅",
      title: "Client Onboarding",
      description: "Automate new client setup and welcome process",
      tool: "Onboarding Automation"
    }
  ]

  // Note: Using real testimonials from homepage instead of placeholder examples

  const consultingPackages = [
    {
      name: "AI Business Strategy Session",
      price: "$750",
      duration: "2 hours",
      includes: [
        "Business process audit & AI opportunity assessment",
        "Custom AI prompt library for your industry",
        "Automation workflow design",
        "30-day implementation roadmap",
        "Follow-up email support"
      ],
      cta: "Book Strategy Session",
      popular: false
    },
    {
      name: "AI Implementation & Training",
      price: "$2,500",
      duration: "6 weeks",
      includes: [
        "Everything in Strategy Session",
        "Weekly 1-on-1 coaching calls",
        "Custom AI tool setup & training",
        "Team training sessions",
        "Performance tracking & optimization",
        "60-day post-implementation support"
      ],
      cta: "Start Implementation",
      popular: true
    },
    {
      name: "AI Business Transformation",
      price: "$5,000",
      duration: "12 weeks",
      includes: [
        "Everything in Implementation",
        "Advanced AI prompt engineering",
        "Business process optimization",
        "Team scaling strategies",
        "Revenue growth tactics",
        "Lifetime access to updates"
      ],
      cta: "Start Transformation",
      popular: false
    }
  ]

  return (
    <>
      <Head>
        <title>AI Business Automation for Service Businesses - Automate 80% of Tasks | PromptWritingStudio</title>
        <meta name="description" content="Automate 80% of your service business tasks with AI prompts. Generate proposals in minutes, handle client communication automatically, and scale without hiring. Join 1,500+ business owners who've automated their way to growth." />
        <meta name="keywords" content="AI business automation, service business automation, AI proposals, client communication automation, business process automation, AI consulting" />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Prompts That Automate
              <span className="block text-[#FFDE59]">80% of Your Business Tasks</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Stop drowning in manual processes. Use AI to generate proposals in minutes, handle client communication automatically, and scale your service business without hiring more staff.
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
              <p>🎯 Join 1,500+ business owners who've automated their way to growth</p>
              <p>⚡ See results in weeks, not months</p>
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
                These are the exact challenges that keep service business owners stuck and overwhelmed
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
                Here's How AI Prompts Solve Your Business Problems
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                These AI-powered tools are already helping 1,500+ service businesses automate and scale
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
                Ready to Automate Your Business?
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Join thousands of business owners who are already automating 80% of their tasks with AI prompts
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
                Ready to Automate Your Business with AI?
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Choose the level of support that fits your business goals and budget
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
              Start Automating Your Business Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join 1,500+ service business owners who've already transformed their operations with AI prompts
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
