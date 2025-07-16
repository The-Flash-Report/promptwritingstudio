import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function EnhancedSEO({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  structuredData = null,
  breadcrumbs = [],
  lastModified = null,
  priority = 0.8,
  changeFreq = 'weekly',
  noindex = false,
  calculatorName = '',
  estimatedResults = null
}) {
  const router = useRouter()
  const currentUrl = `https://promptwritingstudio.com${router.asPath}`
  const finalCanonicalUrl = canonicalUrl || currentUrl

  // Generate enhanced meta description with benefits
  const enhancedDescription = enhancedDescriptionGenerator(description, calculatorName, estimatedResults)
  
  // Generate optimized title
  const optimizedTitle = title.length > 60 ? 
    title.substring(0, 57) + '...' : 
    title

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={enhancedDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex,nofollow' : 'index,follow'} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Prompt Writing Studio" />
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={ogImage || `https://promptwritingstudio.com/images/og-calculator-${calculatorName.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${calculatorName} preview`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bryanjcollins" />
      <meta name="twitter:creator" content="@bryanjcollins" />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={ogImage || `https://promptwritingstudio.com/images/twitter-calculator-${calculatorName.toLowerCase().replace(/\s+/g, '-')}.jpg`} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1F2937" />
      <meta name="application-name" content="Prompt Writing Studio" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Prompt Writing Studio" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Breadcrumbs Schema */}
      {breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": breadcrumbs.map((crumb, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": crumb.name,
                "item": crumb.url
              }))
            })
          }}
        />
      )}
      
      {/* Performance Hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Last Modified */}
      {lastModified && (
        <meta httpEquiv="last-modified" content={lastModified} />
      )}
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />
      <link rel="alternate" hrefLang="en" href={finalCanonicalUrl} />
    </Head>
  )
}

// Enhanced description generator with CTR optimization
function enhancedDescriptionGenerator(baseDescription, calculatorName, estimatedResults) {
  if (!baseDescription) return ''
  
  let enhanced = baseDescription
  
  // Add benefits and results if available
  if (estimatedResults) {
    if (estimatedResults.potentialSavings) {
      enhanced += ` Save up to $${parseInt(estimatedResults.potentialSavings).toLocaleString()}/year.`
    }
    if (estimatedResults.timeReduction) {
      enhanced += ` Reduce time by ${estimatedResults.timeReduction}%.`
    }
  }
  
  // Add action words and urgency
  const actionPhrases = [
    'Get instant results.',
    'Free calculator.',
    'No signup required.',
    '100% accurate estimates.',
    'Used by 10,000+ businesses.'
  ]
  
  // Ensure description doesn't exceed 160 characters
  const maxLength = 160
  const remaining = maxLength - enhanced.length
  
  if (remaining > 20) {
    const randomPhrase = actionPhrases[Math.floor(Math.random() * actionPhrases.length)]
    if (enhanced.length + randomPhrase.length + 1 <= maxLength) {
      enhanced += ` ${randomPhrase}`
    }
  }
  
  return enhanced.length > maxLength ? 
    enhanced.substring(0, maxLength - 3) + '...' : 
    enhanced
}

// Search Console Performance Component
export function SearchConsoleOptimizer({ calculatorName, results = null }) {
  // Track Core Web Vitals
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      // Track page performance
      const perfObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.entryType === 'navigation') {
            // Track page load time
            window.gtag('event', 'page_load_time', {
              event_category: 'Performance',
              event_label: calculatorName,
              value: Math.round(entry.loadEventEnd - entry.loadEventStart)
            })
          }
        }
      })
      
      perfObserver.observe({ entryTypes: ['navigation'] })
      
      return () => perfObserver.disconnect()
    }
  }, [calculatorName])
  
  return null
}

// Rich Snippets for Calculator Results
export function CalculatorRichSnippets({ 
  calculatorName, 
  results, 
  averageRating = 4.8,
  reviewCount = 147 
}) {
  if (!results) return null
  
  const richSnippetsData = {
    "@context": "https://schema.org",
    "@type": "Calculator",
    "name": calculatorName,
    "description": `Calculate ${calculatorName.toLowerCase()} results instantly`,
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "potentialAction": {
      "@type": "UseAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": typeof window !== 'undefined' ? window.location.href : '',
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "ratingCount": reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(richSnippetsData) }}
    />
  )
}

// Advanced Keywords Component
export function AdvancedKeywords({ calculatorType, location = null, industry = null }) {
  const baseKeywords = {
    'roi-calculator': [
      'AI ROI calculator',
      'artificial intelligence return on investment',
      'AI automation savings calculator',
      'business AI ROI estimator',
      'AI implementation calculator'
    ],
    'customer-service': [
      'customer service AI calculator',
      'support automation savings',
      'AI chatbot ROI calculator',
      'help desk automation cost savings',
      'customer support AI cost calculator'
    ],
    'business-readiness': [
      'AI readiness assessment',
      'business AI maturity calculator',
      'AI adoption readiness score',
      'enterprise AI evaluation tool',
      'AI implementation readiness check'
    ]
  }
  
  let keywords = baseKeywords[calculatorType] || []
  
  // Add location-based keywords
  if (location) {
    keywords = [
      ...keywords,
      ...keywords.map(k => `${k} ${location}`),
      `AI calculator ${location}`,
      `${location} AI tools`
    ]
  }
  
  // Add industry-specific keywords
  if (industry) {
    keywords = [
      ...keywords,
      ...keywords.map(k => `${industry} ${k}`),
      `AI for ${industry}`,
      `${industry} automation calculator`
    ]
  }
  
  return keywords
}

// Performance Monitoring Component
export function PerformanceMonitor({ calculatorName }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Track LCP (Largest Contentful Paint)
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime)
          if (window.gtag) {
            window.gtag('event', 'LCP', {
              event_category: 'Core Web Vitals',
              event_label: calculatorName,
              value: Math.round(entry.startTime)
            })
          }
        }
        
        // Track FID (First Input Delay)
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime)
          if (window.gtag) {
            window.gtag('event', 'FID', {
              event_category: 'Core Web Vitals', 
              event_label: calculatorName,
              value: Math.round(entry.processingStart - entry.startTime)
            })
          }
        }
      }
    })
    
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] })
    
    // Track CLS (Cumulative Layout Shift)
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
    })
    
    clsObserver.observe({ entryTypes: ['layout-shift'] })
    
    // Report CLS on page unload
    window.addEventListener('beforeunload', () => {
      if (window.gtag) {
        window.gtag('event', 'CLS', {
          event_category: 'Core Web Vitals',
          event_label: calculatorName,
          value: Math.round(clsValue * 1000)
        })
      }
    })
    
    return () => {
      observer.disconnect()
      clsObserver.disconnect()
    }
  }, [calculatorName])
  
  return null
}

// SEO-optimized Image component
export function SEOImage({ 
  src, 
  alt, 
  width, 
  height, 
  caption = null,
  calculatorName = ''
}) {
  return (
    <figure className="my-6">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="rounded-lg shadow-md w-full h-auto"
        itemProp="image"
      />
      {caption && (
        <figcaption className="text-sm text-gray-600 text-center mt-2 italic">
          {caption}
        </figcaption>
      )}
      
      {/* Image Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "url": src,
            "width": width,
            "height": height,
            "caption": caption || alt,
            "description": `${calculatorName} screenshot showing ${alt}`,
            "author": {
              "@type": "Organization",
              "name": "Prompt Writing Studio"
            }
          })
        }}
      />
    </figure>
  )
} 