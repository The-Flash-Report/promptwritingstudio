import Head from 'next/head'

export default function OrganizationSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PromptWritingStudio",
    "alternateName": "Prompt Writing Studio",
    "url": "https://promptwritingstudio.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://promptwritingstudio.com/images/logo.png",
      "width": 300,
      "height": 300
    },
    "description": "Learn to write effective AI prompts with PromptWritingStudio for ChatGPT, Claude, and Gemini. Master AI automation for business success.",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Bryan Collins",
      "image": "https://promptwritingstudio.com/images/bryan-collins.jpg"
    },
    "sameAs": [
      "https://www.youtube.com/@BryanCollinsWriter",
      "https://twitter.com/bryanjcollins",
      "https://www.linkedin.com/in/bryanjcollins/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "hello@promptwritingstudio.com",
      "availableLanguage": "English"
    },
    "areaServed": "Worldwide",
    "knowsAbout": [
      "AI Prompt Engineering",
      "ChatGPT Prompts", 
      "Business Automation",
      "Content Creation",
      "AI Tools",
      "Productivity"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Business Tools",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "PromptWritingStudio Course"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "WebApplication",
            "name": "AI ROI Calculator"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "WebApplication", 
            "name": "AI Prompt Generator"
          }
        }
      ]
    }
  }

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
    </Head>
  )
} 