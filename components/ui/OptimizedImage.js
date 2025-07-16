import Image from 'next/image'
import { useState } from 'react'

export default function OptimizedImage({
  src,
  alt,
  title,
  width,
  height,
  priority = false,
  className = "",
  calculatorName = null,
  ...props
}) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Enhanced alt text for calculators
  const enhancedAlt = calculatorName 
    ? `${alt} - ${calculatorName} interface showing calculation inputs and results for business ROI analysis`
    : alt

  // Fallback image for calculators
  const fallbackSrc = calculatorName 
    ? '/images/calculator-placeholder.jpg'
    : '/images/placeholder.jpg'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      <Image
        src={imageError ? fallbackSrc : src}
        alt={enhancedAlt}
        title={title || alt}
        width={width}
        height={height}
        priority={priority}
        className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true)
          setImageLoaded(true)
        }}
        // Performance optimizations
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />

      {/* Structured data for images */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": src,
            "name": alt,
            "description": enhancedAlt,
            "width": width,
            "height": height,
            "creator": {
              "@type": "Organization",
              "name": "PromptWritingStudio"
            },
            "copyrightHolder": {
              "@type": "Organization", 
              "name": "PromptWritingStudio"
            },
            "license": "https://promptwritingstudio.com/license"
          })
        }}
      />
    </div>
  )
}

// Calculator screenshot component with enhanced SEO
export function CalculatorScreenshot({ 
  calculatorName, 
  src, 
  alt,
  width = 600,
  height = 400 
}) {
  const enhancedAlt = `${calculatorName} screenshot showing the calculator interface with input fields, calculation results, and savings breakdown - Free AI business calculator by PromptWritingStudio`
  
  return (
    <OptimizedImage
      src={src}
      alt={enhancedAlt}
      title={`${calculatorName} Calculator Interface`}
      width={width}
      height={height}
      calculatorName={calculatorName}
      className="rounded-lg shadow-lg border border-gray-200"
      priority={true}
    />
  )
} 