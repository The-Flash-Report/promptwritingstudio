import Head from 'next/head'

export default function EnhancedMeta({ 
  title,
  description,
  url,
  image = 'https://promptwritingstudio.com/images/pws-opengraph-yellow.png',
  type = 'website',
  calculator = null,
  publishedTime,
  modifiedTime
}) {
  
  // Enhanced description with CTR-focused language
  const enhancedDescription = calculator 
    ? `${description} ✅ Free calculator ✅ Instant results ✅ No signup required. Used by 10,000+ businesses.`
    : description

  // Structured title for better search visibility  
  const structuredTitle = calculator
    ? `${title} 🧮 Free Tool | PromptWritingStudio`
    : title

  return (
    <Head>
      {/* Enhanced meta description */}
      <meta name="description" content={enhancedDescription} />
      
      {/* Additional meta tags for better CTR */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="PromptWritingStudio" />
      <meta property="og:title" content={structuredTitle} />
      <meta property="og:description" content={enhancedDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - PromptWritingStudio Calculator`} />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bryanjcollins" />
      <meta name="twitter:creator" content="@bryanjcollins" />
      <meta name="twitter:title" content={structuredTitle} />
      <meta name="twitter:description" content={enhancedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${title} - Free AI Calculator`} />
      
      {/* LinkedIn specific */}
      <meta property="og:type" content="article" />
      <meta property="article:author" content="Bryan Collins" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Calculator-specific meta */}
      {calculator && (
        <>
          <meta name="calculator-type" content={calculator.type} />
          <meta name="calculator-category" content={calculator.category} />
          <meta name="free-calculator" content="true" />
          <meta name="instant-results" content="true" />
          <meta name="no-signup" content="true" />
        </>
      )}
      
      {/* Enhanced keywords for better context */}
      <meta name="keywords" content={`
        ${calculator?.keywords?.join(', ') || ''},
        AI calculator, business calculator, free calculator, 
        AI automation, business automation, ROI calculator,
        cost savings, productivity tools, PromptWritingStudio
      `.replace(/\s+/g, ' ').trim()} />
      
      {/* Author and publisher info */}
      <meta name="author" content="Bryan Collins" />
      <meta name="publisher" content="PromptWritingStudio" />
      
      {/* Additional SEO enhancements */}
      <link rel="canonical" href={url} />
      <meta name="theme-color" content="#3B82F6" />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured data for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": url,
            "image": image,
            "mainEntity": calculator ? {
              "@type": "SoftwareApplication",
              "name": title,
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer", 
                "price": "0",
                "priceCurrency": "USD"
              }
            } : undefined,
            "publisher": {
              "@type": "Organization",
              "name": "PromptWritingStudio",
              "url": "https://promptwritingstudio.com"
            }
          })
        }}
      />
    </Head>
  )
} 