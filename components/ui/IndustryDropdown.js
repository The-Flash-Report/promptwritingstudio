import { useState } from 'react'
import Link from 'next/link'

export default function IndustryDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const industries = [
    {
      title: "Content Creators",
      description: "YouTube, Instagram, Bloggers",
      href: "/content-creators-ai",
      icon: "🎬"
    },
    {
      title: "Service Businesses", 
      description: "Consultants, Agencies, Freelancers",
      href: "/service-business-ai",
      icon: "💼"
    },
    {
      title: "E-commerce Stores",
      description: "Online Stores, Dropshipping",
      href: "/ecommerce-ai", 
      icon: "🛍️"
    }
  ]

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center space-x-1 text-white hover:text-[#FFDE59] transition-colors duration-200"
      >
        <span>Industries</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-[#E5E5E5] z-50"
        >
          <div className="p-4">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Choose Your Industry</h3>
            <div className="space-y-3">
              {industries.map((industry, index) => (
                <Link
                  key={index}
                  href={industry.href}
                  className="flex items-center p-3 rounded-lg hover:bg-[#F9F9F9] transition-colors duration-200 group"
                >
                  <div className="text-2xl mr-3">{industry.icon}</div>
                  <div>
                    <div className="font-semibold text-[#1A1A1A] group-hover:text-[#FFDE59] transition-colors duration-200">
                      {industry.title}
                    </div>
                    <div className="text-sm text-[#666666]">{industry.description}</div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E5E5]">
              <Link
                href="/ai-prompt-generator"
                className="block text-center bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-semibold hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Try All Tools Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
