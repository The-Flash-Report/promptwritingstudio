import { useState, useEffect } from 'react'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      if (scrollTop > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-[#F9F9F9] shadow-lg transform transition-transform duration-300 z-50 border-t border-[#E5E5E5] ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="hidden md:block">
          <p className="font-bold text-[#1A1A1A]">PromptWritingStudio - Only $197 one-time</p>
        </div>
        <a 
          href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio" 
          className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 flex-shrink-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Now
        </a>
      </div>
    </div>
  )
}
