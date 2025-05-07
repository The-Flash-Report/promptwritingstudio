import Link from 'next/link';
import TypewriterEffect from '../ui/TypewriterEffect';

export default function Hero() {
  const aiTools = ['ChatGPT', 'Claude', 'Gemini']
  
  return (
    <header className="gradient-bg py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 hero-content mb-8 md:mb-0">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">
              Master the Art of AI Prompt Writing for <TypewriterEffect phrases={aiTools} />
            </h1>
            <p className="body-large mb-6 text-white">
              Join busy creators and professionals who are unlocking the full potential of AI with expert-crafted prompts, templates, and strategies.
            </p>
              <p className="text-white mb-3">
                <strong>I've invested 100+ hours</strong> studying AI content creation systems and refined them into a proven system that will save you countless hours of frustration.
              </p>
              <p className="text-white mb-6">
                These prompt techniques have saved me thousands of dollars on outsourcing and hiring, and now I want to share them with you.
              </p>
            
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#pricing" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition text-center">
                Join Now
              </Link>
              <Link href="#problem-solution" className="border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition text-center">
                See How It Works
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-1 rounded-lg shadow-medium border border-[#E5E5E5]">
              <svg className="w-full h-auto rounded-lg bg-[#F9F9F9]" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="600" height="400" rx="8" fill="#F9F9F9"/>
                <circle cx="300" cy="180" r="100" fill="#FFDE59" fillOpacity="0.2"/>
                <path d="M250 160C250 160 270 140 300 140C330 140 350 160 350 160M260 200C260 200 280 220 300 220C320 220 340 200 340 200" stroke="#1A1A1A" strokeWidth="8" strokeLinecap="round"/>
                <path d="M150 100L200 100L200 150M450 100L400 100L400 150M150 300L200 300L200 250M450 300L400 300L400 250" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round"/>
                <rect x="220" y="80" width="160" height="20" rx="4" fill="#FFDE59" fillOpacity="0.5"/>
                <rect x="240" y="110" width="120" height="10" rx="4" fill="#FFDE59" fillOpacity="0.5"/>
                <rect x="220" y="300" width="160" height="20" rx="4" fill="#FFDE59" fillOpacity="0.5"/>
                <rect x="240" y="330" width="120" height="10" rx="4" fill="#FFDE59" fillOpacity="0.5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
