import { useState, useEffect, useRef } from 'react'

export default function InteractiveTimeline({ periods, activeIndex, onPeriodSelect }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visiblePeriods, setVisiblePeriods] = useState(new Set())
  const timelineRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePeriodClick = (index) => {
    onPeriodSelect(index)
    
    // Smooth scroll to section
    const element = document.getElementById(`period-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
      <div ref={timelineRef} className="relative">
        {/* Progress Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-80 bg-gray-200 rounded-full">
          <div 
            className="w-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>

        {/* Timeline Dots */}
        <div className="space-y-8">
          {periods.map((period, index) => (
            <button
              key={index}
              onClick={() => handlePeriodClick(index)}
              className={`group relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
                activeIndex === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-white scale-125 shadow-lg'
                  : 'bg-white border-gray-300 hover:border-blue-400'
              }`}
            >
              {/* Tooltip */}
              <div className="absolute left-8 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                <div className="text-sm font-semibold text-gray-900">{period.period}</div>
                <div className="text-xs text-gray-600">{period.title}</div>
              </div>
              
              {/* Connecting line to tooltip */}
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-2 h-px bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 