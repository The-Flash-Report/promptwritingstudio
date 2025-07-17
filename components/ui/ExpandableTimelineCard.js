import { useState, useRef, useEffect } from 'react'

export default function ExpandableTimelineCard({ 
  period, 
  index, 
  isActive, 
  onToggle 
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef(null)

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    onToggle(index)
  }

  const getColorClasses = (baseColor) => {
    const colorMap = {
      'from-purple-600 to-purple-800': 'border-purple-200 bg-purple-50',
      'from-blue-700 to-blue-900': 'border-blue-200 bg-blue-50',
      'from-indigo-600 to-indigo-800': 'border-indigo-200 bg-indigo-50',
      'from-emerald-600 to-emerald-800': 'border-emerald-200 bg-emerald-50',
      'from-slate-600 to-slate-800': 'border-slate-200 bg-slate-50',
      'from-orange-600 to-orange-800': 'border-orange-200 bg-orange-50',
      'from-teal-600 to-teal-800': 'border-teal-200 bg-teal-50',
      'from-violet-600 to-violet-800': 'border-violet-200 bg-violet-50',
      'from-rose-600 to-rose-800': 'border-rose-200 bg-rose-50'
    }
    return colorMap[baseColor] || 'border-gray-200 bg-gray-50'
  }

  return (
    <div 
      ref={cardRef}
      id={`period-${index}`}
      className={`relative mb-16 transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Timeline Line */}
      {index < 8 && (
        <div className="absolute left-8 top-24 w-1 h-full bg-gradient-to-b from-blue-200 to-indigo-200 -z-10"></div>
      )}
      
      <div className="flex items-start">
        {/* Enhanced Timeline Dot */}
        <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${period.color} rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer`}>
          <span className="relative">
            {index + 1}
            {isExpanded && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </span>
        </div>
        
        {/* Enhanced Content Card */}
        <div className="ml-8 flex-1">
          <div className={`bg-white rounded-2xl shadow-lg border-2 ${getColorClasses(period.color)} overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
            
            {/* Header - Always Visible */}
            <div 
              className="p-8 cursor-pointer select-none"
              onClick={handleToggle}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    {period.period}
                  </span>
                  <h3 className="text-3xl font-bold text-slate-900 mt-2 mb-3">
                    {period.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {period.description}
                  </p>
                </div>
                
                <div className={`ml-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Quick Stats Preview */}
              <div className="flex items-center space-x-6 mt-4 text-sm">
                <div className="flex items-center text-slate-500">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  {period.events.length} major events
                </div>
                <div className="flex items-center text-slate-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Click to explore
                </div>
              </div>
            </div>
            
            {/* Expandable Content */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="px-8 pb-8">
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="text-xl font-bold text-slate-900 mb-6">Key Historical Events</h4>
                  
                  {/* Interactive Events Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {period.events.map((event, eventIndex) => (
                      <div 
                        key={eventIndex} 
                        className="group bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-blue-700 text-sm bg-blue-100 px-2 py-1 rounded">
                            {event.year}
                          </div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-600 transition-colors"></div>
                        </div>
                        <div className="font-medium text-slate-800 mb-2 text-sm group-hover:text-slate-900">
                          {event.event}
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-700">
                          {event.detail}
                        </div>
                        
                        {/* Hover Effect */}
                        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="text-xs text-blue-600 font-medium">
                            💡 Impact: Revolutionary breakthrough →
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Business Impact Section */}
                  <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h5 className="font-bold text-blue-900 mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Business Impact Today
                    </h5>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      Understanding this era helps modern businesses recognize patterns in {period.title.toLowerCase()} 
                      and apply historical lessons to current AI implementation strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 