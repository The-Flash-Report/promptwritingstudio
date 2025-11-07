import { useState } from 'react'
import Link from 'next/link'

export default function Pricing() {
  const plan = {
    name: "Complete Course",
    price: "$197",
    period: "one-time payment",
    description: "Everything you need to master AI prompt writing with lifetime access to all content and updates.",
    features: [
      "Complete prompt writing course",
      "100+ advanced prompt templates",
      "Voice customization system",
      "Content creation workflows", 
      "Private community access",
      "Monthly live Q&A sessions",
      "Custom prompt development guide",
      "Team collaboration templates",
      "Priority email support",
      "Lifetime access to all updates",
      "30-day money-back guarantee"
    ],
    cta: "Get Complete Access",
    popular: true
  }
  
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="badge mb-4">PRICING</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">Complete AI Prompt Writing Course</h2>
          <p className="body-large text-[#333333] max-w-3xl mx-auto">
            Get lifetime access to everything you need to master AI prompt writing. One-time payment, no subscriptions.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="card overflow-hidden transition-all duration-300 shadow-large border-2 border-[#FFDE59] relative">
            <div className="absolute top-0 right-0 bg-[#FFDE59] text-[#1A1A1A] py-1 px-4 text-sm font-medium">
              Best Value
            </div>
            
            <div className="p-8 md:p-12 text-center">
              <h3 className="font-display text-3xl font-bold mb-4 text-[#1A1A1A]">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#1A1A1A]">{plan.price}</span>
                <span className="text-[#333333] text-lg ml-2">{plan.period}</span>
              </div>
              <p className="text-[#333333] mb-8 text-lg">{plan.description}</p>
              
              <ul className="space-y-4 mb-10 text-left max-w-lg mx-auto">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-6 h-6 text-[#1A1A1A] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-[#333333]">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio" 
                className="bg-[#FFDE59] text-[#1A1A1A] inline-block text-center px-12 py-4 rounded-lg font-bold hover:bg-[#E5C84F] transition text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {plan.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
