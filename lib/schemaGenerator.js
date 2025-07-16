// Utility functions for dynamic schema generation

export function generateCalculatorSchema(calculatorConfig) {
  const {
    name,
    description,
    url,
    keywords = [],
    category = 'Business',
    inputs = [],
    outputs = []
  } = calculatorConfig

  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": category,
    "operatingSystem": "Web Browser",
    "keywords": keywords.join(', '),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "PromptWritingStudio",
      "url": "https://promptwritingstudio.com"
    },
    "softwareRequirements": "Web Browser",
    "isAccessibleForFree": true,
    "featureList": [
      "Free to use",
      "Instant results",
      "No registration required",
      "Mobile responsive",
      "Accurate calculations"
    ],
    "potentialAction": {
      "@type": "UseAction",
      "target": url,
      "object": {
        "@type": "WebApplication",
        "name": name
      }
    }
  }
}

export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

export function generateHowToSchema(title, steps, url) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${title}`,
    "description": `Step-by-step guide to using our ${title.toLowerCase()}`,
    "totalTime": "PT5M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Web Browser"
      },
      {
        "@type": "HowToSupply",
        "name": "Business Data"
      }
    ],
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": `${url}#step-${index + 1}`
    }))
  }
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

export function generateRatingSchema(name, rating = { value: 4.8, count: 150 }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.value,
      "reviewCount": rating.count,
      "bestRating": "5",
      "worstRating": "1"
    }
  }
}

// Default calculator FAQ items
export const defaultCalculatorFAQs = [
  {
    question: "Is this calculator free to use?",
    answer: "Yes, all our AI business calculators are completely free to use with no registration required."
  },
  {
    question: "How accurate are the calculations?",
    answer: "Our calculators use industry-standard formulas and real-world data. Results are estimates to help with business planning and should be verified with your specific situation."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account creation is required. You can use all calculators immediately without any signup process."
  },
  {
    question: "Can I save my results?",
    answer: "You can bookmark the page or take screenshots of your results. We recommend copying important calculations for your records."
  }
]

// SEO-focused keywords for different calculator types
export const calculatorKeywords = {
  roi: [
    'AI ROI calculator',
    'artificial intelligence return on investment',
    'business automation savings',
    'AI cost savings calculator',
    'productivity calculator',
    'automation ROI'
  ],
  costComparison: [
    'AI vs human cost calculator',
    'automation vs hiring costs',
    'AI vs employee cost comparison',
    'hiring decision calculator',
    'AI implementation costs'
  ],
  contentCreation: [
    'content creation speed calculator',
    'AI writing productivity',
    'content automation calculator',
    'writing efficiency calculator'
  ],
  ecommerce: [
    'e-commerce AI calculator',
    'online store automation',
    'product description automation',
    'ecommerce AI savings'
  ]
} 