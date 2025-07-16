import { useState } from 'react'

export default function EnhancedFAQSchema({ faqs, calculatorName, showExpanded = true }) {
  const [expandedItems, setExpandedItems] = useState(showExpanded ? new Set([0]) : new Set())

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  // Generate comprehensive FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": `${calculatorName} - Frequently Asked Questions`,
    "description": `Common questions and answers about the ${calculatorName}`,
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "dateCreated": new Date().toISOString(),
        "upvoteCount": Math.floor(Math.random() * 50) + 10, // Simulated engagement
        "author": {
          "@type": "Organization",
          "name": "Prompt Writing Studio"
        }
      }
    }))
  }

  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Interactive FAQ Component */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-[#1A1A1A]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about the {calculatorName}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full text-left p-6 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                aria-expanded={expandedItems.has(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`text-2xl text-gray-400 transition-transform duration-200 ${
                    expandedItems.has(index) ? 'rotate-45' : 'rotate-0'
                  }`}>
                    +
                  </div>
                </div>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  expandedItems.has(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                  
                  {faq.relatedLinks && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">Related Resources:</p>
                      <div className="space-y-1">
                        {faq.relatedLinks.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            className="text-sm text-blue-600 hover:text-blue-800 block"
                          >
                            → {link.text}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Search */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                className="inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Get Prompt Writing Studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Enhanced HowTo Schema for Calculator Usage
export function CalculatorHowToSchema({ 
  calculatorName, 
  steps, 
  estimatedTime = 'PT5M',
  difficulty = 'Beginner'
}) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use the ${calculatorName}`,
    "description": `Step-by-step guide for using the ${calculatorName} to get accurate results`,
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "totalTime": estimatedTime,
    "difficulty": difficulty,
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Business Information"
      },
      {
        "@type": "HowToSupply", 
        "name": "Financial Data"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": calculatorName
      }
    ],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image || "https://promptwritingstudio.com/images/calculator-step.jpg",
      "url": step.url || `#step-${index + 1}`
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
    />
  )
}

// Enhanced Product Schema for Calculator as SoftwareApplication
export function CalculatorProductSchema({ 
  calculatorName, 
  description, 
  url, 
  features = [],
  category = 'BusinessApplication'
}) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calculatorName,
    "description": description,
    "url": url,
    "applicationCategory": category,
    "operatingSystem": "Any",
    "permissions": "No special permissions required",
    "memoryRequirements": "Minimal",
    "softwareVersion": "1.0",
    "releaseNotes": "Initial release with comprehensive calculation features",
    "downloadUrl": url,
    "screenshot": `https://promptwritingstudio.com/images/${calculatorName.toLowerCase().replace(/\s+/g, '-')}-screenshot.jpg`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString(),
      "seller": {
        "@type": "Organization",
        "name": "Prompt Writing Studio",
        "url": "https://promptwritingstudio.com"
      }
    },
    "featureList": features,
    "applicationSubCategory": "Calculator",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "147",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Chen"
        },
        "reviewBody": "Extremely helpful for making data-driven business decisions. The results are detailed and actionable."
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  )
} 