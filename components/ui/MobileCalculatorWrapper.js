import { useState, useEffect } from 'react'

export default function MobileCalculatorWrapper({ children, title }) {
  const [isMobile, setIsMobile] = useState(false)
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Auto-scroll to results on mobile
  const scrollToResults = () => {
    if (isMobile) {
      setTimeout(() => {
        const resultsElement = document.getElementById('calculator-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  return (
    <div className="calculator-mobile-wrapper">
      {/* Mobile-specific enhancements */}
      {isMobile && (
        <>
          {/* Sticky calculator title on mobile */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-40 md:hidden">
            <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          </div>
          
          {/* Mobile keyboard helper */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 md:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-blue-600 mr-2">📱</span>
                <span className="text-sm text-blue-700 font-medium">Mobile Tip</span>
              </div>
              <button
                onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
                className="text-blue-600 text-sm underline"
              >
                {showKeyboardHelp ? 'Hide' : 'Show'} Tips
              </button>
            </div>
            
            {showKeyboardHelp && (
              <div className="mt-2 text-sm text-blue-600">
                <p>• Tap number fields to open numeric keyboard</p>
                <p>• Use device's back button to dismiss keyboard</p>
                <p>• Results will auto-scroll into view</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Enhanced calculator wrapper */}
      <div className={`
        calculator-content 
        ${isMobile ? 'mobile-calculator' : 'desktop-calculator'}
      `}>
        <style jsx>{`
          .mobile-calculator input[type="number"] {
            font-size: 16px !important; /* Prevents zoom on iOS */
            padding: 12px;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            transition: border-color 0.2s;
          }
          
          .mobile-calculator input[type="number"]:focus {
            border-color: #3b82f6;
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .mobile-calculator select {
            font-size: 16px !important;
            padding: 12px;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
          }
          
          .mobile-calculator button {
            min-height: 48px; /* Better touch targets */
            font-size: 16px;
          }
          
          .desktop-calculator input[type="number"],
          .desktop-calculator select {
            font-size: 14px;
            padding: 8px 12px;
          }

          /* Smooth scrolling for mobile results */
          @media (max-width: 767px) {
            html {
              scroll-behavior: smooth;
            }
          }
        `}</style>
        
        {children}
      </div>

      {/* Mobile scroll enhancement */}
      {isMobile && (
        <div className="mt-4 text-center">
          <button
            onClick={scrollToResults}
            className="text-blue-600 text-sm underline md:hidden"
          >
            📱 Scroll to Results
          </button>
        </div>
      )}
    </div>
  )
} 