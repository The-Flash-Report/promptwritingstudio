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

  const managePreferences = () => {
    // For now, just accept - could implement more detailed preferences
    acceptCookies()
  }

  // Don't render anything while loading or if already consented
  if (isLoading || !showBanner) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-25 z-40 pointer-events-none" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start gap-3">
                {/* Cookie Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-600 text-lg">🍪</span>
                  </div>
                </div>
                
                {/* Text Content */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    We value your privacy
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                    Essential cookies are required for basic functionality, while analytics cookies help us improve our service.{' '}
                    <Link href="/cookie-policy" className="text-blue-600 hover:text-blue-800 underline">
                      Learn more about our cookie policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
              <button
                onClick={declineCookies}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Decline
              </button>
              
              <button
                onClick={managePreferences}
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Manage
              </button>
              
              <button
                onClick={acceptCookies}
                className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
              >
                Accept All
              </button>
            </div>
          </div>

          {/* Additional Info Row */}
          <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex flex-wrap items-center gap-4">
              <span>
                🔒 Your data is secured and protected
              </span>
              <span>
                📊 Analytics help us improve your experience
              </span>
              <span>
                ⚙️ Essential cookies are always active
              </span>
              <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
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