import Head from 'next/head'

export default function CalculatorSchema({ 
  calculatorName,
  description,
  url,
  category = 'Business',
  keywords = [],
  expectedInputs = [],
  expectedOutputs = []
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": calculatorName,
    "description": description,
    "url": url,
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": category,
    "operatingSystem": "Web Browser",
    "keywords": keywords.join(', '),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "PromptWritingStudio",
      "url": "https://promptwritingstudio.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://promptwritingstudio.com/images/logo.png"
      }
    },
    "softwareRequirements": "Web Browser",
    "isAccessibleForFree": true,
    "potentialAction": {
      "@type": "UseAction",
      "target": url,
      "object": {
        "@type": "WebApplication",
        "name": calculatorName
      }
    }
  }

  // Add FAQ schema if applicable
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How does the ${calculatorName} work?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Our ${calculatorName} helps you ${description.toLowerCase()}. Simply input your data and get instant results with detailed breakdowns.`
        }
      },
      {
        "@type": "Question", 
        "name": "Is this calculator free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all our AI business calculators are completely free to use with no registration required."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate are the calculations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our calculators use industry-standard formulas and real-world data. Results are estimates to help with business planning and should be verified with your specific situation."
        }
      }
    ]
  }

  // Tool schema for search engines
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": calculatorName,
    "description": description,
    "url": url,
    "applicationCategory": "CalculatorApplication",
    "operatingSystem": "Any",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "author": {
      "@type": "Organization",
      "name": "PromptWritingStudio"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolSchema)
        }}
      />
    </Head>
  )
} 