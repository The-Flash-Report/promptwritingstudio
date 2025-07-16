import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent')
    if (!hasConsented) {
      setShowBanner(true)
    }
    setIsLoading(false)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setShowBanner(false)
    
    // Disable non-essential cookies
    // This would disable Google Analytics, marketing cookies, etc.
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      })
    }
  }

  // Don't render anything while loading or if already consented
  if (isLoading || !showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          {/* Cookie Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <span className="text-amber-600 text-lg">🍪</span>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600 mb-3">
              We use cookies to improve your experience.{' '}
              <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-800 underline text-xs">
                Learn more
              </Link>
            </p>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={declineCookies}
                className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Decline
              </button>
              
              <button
                onClick={acceptCookies}
                className="px-3 py-1.5 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors font-medium"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Optional: Advanced cookie management hook
export function useCookieConsent() {
  const [hasConsented, setHasConsented] = useState(null)
  const [consentType, setConsentType] = useState(null)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    setHasConsented(!!consent)
    setConsentType(consent)
  }, [])

  const updateConsent = (type) => {
    localStorage.setItem('cookieConsent', type)
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setHasConsented(true)
    setConsentType(type)
  }

  const revokeConsent = () => {
    localStorage.removeItem('cookieConsent')
    localStorage.removeItem('cookieConsentDate')
    setHasConsented(false)
    setConsentType(null)
  }

  return {
    hasConsented,
    consentType,
    updateConsent,
    revokeConsent,
    isAccepted: consentType === 'accepted',
    isDeclined: consentType === 'declined'
  }
} 