import { useEffect } from 'react'

export default function CalculatorAnalytics({ calculatorName, eventAction, eventData = {} }) {
  
  const trackEvent = (eventName, properties = {}) => {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'Calculator',
        event_label: calculatorName,
        calculator_name: calculatorName,
        ...properties
      })
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', 'CompleteRegistration', {
        content_name: calculatorName,
        content_category: 'Calculator',
        ...properties
      })
    }

    // Custom analytics (if using other platforms)
    if (typeof analytics !== 'undefined') {
      analytics.track(eventName, {
        calculator: calculatorName,
        category: 'AI Tools',
        ...properties
      })
    }
  }

  useEffect(() => {
    if (eventAction) {
      trackEvent(eventAction, eventData)
    }
  }, [eventAction, eventData, calculatorName])

  return null
}

// Hook for easy calculator tracking
export function useCalculatorTracking(calculatorName) {
  const trackCalculatorStart = () => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_start', {
        event_category: 'Calculator',
        event_label: calculatorName,
        calculator_name: calculatorName
      })
    }
  }

  const trackCalculatorComplete = (results) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_complete', {
        event_category: 'Calculator', 
        event_label: calculatorName,
        calculator_name: calculatorName,
        value: results?.savings || 0
      })
    }
  }

  const trackCalculatorShare = (platform) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_share', {
        event_category: 'Calculator',
        event_label: calculatorName,
        calculator_name: calculatorName,
        platform: platform
      })
    }
  }

  const trackCTAClick = (ctaType) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_cta_click', {
        event_category: 'Calculator',
        event_label: calculatorName,
        calculator_name: calculatorName,
        cta_type: ctaType
      })
    }
  }

  return {
    trackCalculatorStart,
    trackCalculatorComplete,
    trackCalculatorShare,
    trackCTAClick
  }
} 