import { useState, useEffect } from 'react'
import { useCalculatorTracking } from './CalculatorAnalytics'

export default function ConversionOptimizer({ 
  calculatorName, 
  results = null, 
  showUrgency = true,
  showSocialProof = true 
}) {
  const [timeOnPage, setTimeOnPage] = useState(0)
  const [showExitIntent, setShowExitIntent] = useState(false)
  const { trackCTAClick } = useCalculatorTracking(calculatorName)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1)
    }, 1000)

    // Exit intent detection
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && timeOnPage > 30 && !showExitIntent) {
        setShowExitIntent(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      clearInterval(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [timeOnPage, showExitIntent])

  const handleCTAClick = (ctaType) => {
    trackCTAClick(ctaType)
  }

  return (
    <>
      {/* Results-based CTA */}
      {results && (
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white mb-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              🎉 You Could Save ${results.yearlySavings || '10,000+'} This Year!
            </h3>
            <p className="text-lg mb-4 opacity-90">
              Ready to implement AI and start saving immediately?
            </p>
            
            {showSocialProof && (
              <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-center space-x-4 text-sm">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span>4.8/5 from 150+ users</span>
                  <span>•</span>
                  <span>10,000+ calculations completed</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                onClick={() => handleCTAClick('course_purchase')}
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200 inline-flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                🚀 Start Saving Now - Get Course
                {showUrgency && <span className="ml-2 text-sm">(Limited Time)</span>}
              </a>
              <button
                onClick={() => handleCTAClick('free_prompts')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                📝 Get Free AI Prompts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time-based urgency */}
      {showUrgency && timeOnPage > 60 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">⏰</span>
            </div>
            <div className="ml-3">
              <h4 className="text-orange-800 font-semibold">Don't Let These Savings Slip Away!</h4>
              <p className="text-orange-700 text-sm">
                You've been calculating for {Math.floor(timeOnPage / 60)} minute{Math.floor(timeOnPage / 60) !== 1 ? 's' : ''}. 
                Take action now to start implementing these AI savings.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Social proof banner */}
      {showSocialProof && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="text-center">
            <p className="text-blue-800 font-medium mb-2">
              🔥 Join 10,000+ businesses already saving with AI
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-blue-600">
              <span>✅ Fortune 500 companies</span>
              <span>✅ Startups & SMBs</span>
              <span>✅ Freelancers</span>
            </div>
          </div>
        </div>
      )}

      {/* Exit intent modal */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wait! Don't Miss Out</h3>
              <p className="text-gray-600 mb-4">
                Get your free AI prompt starter pack and begin implementing these savings today.
              </p>
              <div className="space-y-3">
                <a
                  href="/ai-prompt-generator"
                  onClick={() => {
                    handleCTAClick('exit_intent_prompts')
                    setShowExitIntent(false)
                  }}
                  className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  🎁 Get Free AI Prompts
                </a>
                <button
                  onClick={() => setShowExitIntent(false)}
                  className="block w-full text-gray-500 text-sm hover:text-gray-700"
                >
                  No thanks, I'll continue browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Sticky CTA bar for mobile
export function StickyMobileCTA({ calculatorName, hasResults = false }) {
  const [isVisible, setIsVisible] = useState(false)
  const { trackCTAClick } = useCalculatorTracking(calculatorName)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      setIsVisible(scrollY > windowHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-4 z-40 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm font-semibold">
            {hasResults ? '🎯 Ready to implement?' : '🚀 Start saving with AI'}
          </div>
          <div className="text-xs opacity-90">
            {hasResults ? 'Get the course & prompts' : 'Calculate your savings first'}
          </div>
        </div>
        <a
          href={hasResults 
            ? "https://courses.becomeawritertoday.com/purchase?product_id=6253746"
            : "#calculator"
          }
          onClick={() => handleCTAClick(hasResults ? 'mobile_sticky_course' : 'mobile_sticky_calculator')}
          className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#E5C84F] transition-colors"
          target={hasResults ? "_blank" : undefined}
          rel={hasResults ? "noopener noreferrer" : undefined}
        >
          {hasResults ? 'Get Course' : 'Calculate'}
        </a>
      </div>
    </div>
  )
} 