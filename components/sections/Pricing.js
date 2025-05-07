import { useState } from 'react'
import Link from 'next/link'

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$25",
      period: "per month",
      description: "Perfect for beginners who want to learn the fundamentals of AI prompt writing.",
      features: [
        "Weekly prompt lessons",
        "25+ prompt templates",
        "Basic voice customization guide",
        "Email support"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$37",
      period: "per month",
      description: "Our most popular plan for serious content creators who want to master AI prompts.",
      features: [
        "Everything in Basic",
        "50+ advanced prompt templates",
        "Complete voice customization system",
        "Content creation workflows",
        "Private community access",
        "Monthly live Q&A sessions"
      ],
      cta: "Join Now",
      popular: true
    },
    {
      name: "Elite",
      price: "$97",
      period: "per month",
      description: "For professionals and teams who need personalized guidance and premium support.",
      features: [
        "Everything in Pro",
        "Custom prompt development",
        "1-on-1 coaching session (30 min)",
        "Team collaboration templates",
        "Priority email support",
        "Early access to new features"
      ],
      cta: "Upgrade to Elite",
      popular: false
    }
  ]
  
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="badge mb-4">PRICING</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">Choose Your Plan</h2>
          <p className="body-large text-[#333333] max-w-3xl mx-auto">
            Select the plan that best fits your needs. All plans include a 30-day money-back guarantee.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`card overflow-hidden transition-all duration-300 ${plan.popular ? 'shadow-large border-2 border-[#FFDE59] relative' : 'shadow-medium hover:shadow-large'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#FFDE59] text-[#1A1A1A] py-1 px-4 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl font-bold mb-2 text-[#1A1A1A]">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[#1A1A1A]">{plan.price}</span>
                  <span className="text-[#333333]"> {plan.period}</span>
                </div>
                <p className="text-[#333333] mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-[#1A1A1A] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-[#333333]">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={plan.name === "Basic" ? "https://bryancollins.com/products/prompt-writing-studio" : 
                        plan.name === "Pro" ? "#" : 
                        "#"} 
                  className="bg-[#FFDE59] text-[#1A1A1A] block text-center mt-8 px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
