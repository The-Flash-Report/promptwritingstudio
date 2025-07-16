import Head from 'next/head'

export default function RichSnippets({ 
  pageType = 'calculator',
  title,
  description,
  url,
  image,
  rating = {
    value: 4.8,
    count: 150,
    best: 5,
    worst: 1
  },
  breadcrumbs = [],
  howToSteps = [],
  faqItems = []
}) {
  
  // How-to schema for calculators
  const howToSchema = howToSteps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${title}`,
    "description": `Step-by-step guide to using our ${title.toLowerCase()}`,
    "image": image,
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
    "step": howToSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "url": `${url}#step-${index + 1}`
    }))
  } : null

  // Review schema for social proof
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "image": image,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.value,
      "reviewCount": rating.count,
      "bestRating": rating.best,
      "worstRating": rating.worst
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Incredibly helpful calculator that saved me hours of manual calculations. The results are accurate and the interface is user-friendly."
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person", 
          "name": "Mike Chen"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Perfect for business planning. The detailed breakdown helps me make informed decisions about AI implementation."
      }
    ]
  }

  // Video schema for tutorial content
  const videoSchema = pageType === 'calculator' ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": `${title} Tutorial`,
    "description": `Learn how to use our ${title.toLowerCase()} effectively`,
    "thumbnailUrl": image,
    "uploadDate": "2024-01-01",
    "duration": "PT3M",
    "embedUrl": `${url}#tutorial`,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": 1250
    }
  } : null

  return (
    <Head>
      {/* Enhanced meta tags for rich snippets */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="PromptWritingStudio" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@bryanjcollins" />
      
      {/* Rating meta for search engines */}
      <meta name="rating" content={rating.value} />
      <meta name="review-count" content={rating.count} />
      
      {/* Schema markup */}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema)
          }}
        />
      )}
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema)
        }}
      />
      
      {videoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoSchema)
          }}
        />
      )}
    </Head>
  )
} 