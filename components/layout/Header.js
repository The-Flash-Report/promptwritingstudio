import Link from 'next/link'
import { useState } from 'react'
// TODO: Authentication temporarily disabled - no user accounts until backend is ready
// import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  // TODO: Session management disabled until user account system is implemented
  // const { data: session, status } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-[#FFDE59] rounded-lg flex items-center justify-center text-[#1A1A1A] font-bold text-xs md:text-sm">
              PWS
            </div>
            <span className="ml-2 text-lg md:text-xl font-bold text-[#1A1A1A] truncate">PromptWritingStudio</span>
          </Link>
          
          {/* Mobile menu button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-[#333333] hover:text-[#1A1A1A] transition p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
        
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {/* Business Tools - Most Important Category */}
              <div className="relative group">
                <button className="text-[#333333] hover:text-[#1A1A1A] transition font-medium flex items-center">
                  Tools
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link href="/calculators" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      📊 Business Calculators
                    </Link>
                    <Link href="/ai-prompt-generator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      🤖 AI Prompt Generator
                    </Link>
                    <Link href="/ai-prompt-generator/creative-writing-prompts" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      ✍️ Writing Prompts
                    </Link>
                    <Link href="/ai-prompt-quiz" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      🧠 Prompt Writing Quiz
                    </Link>
                    <Link href="/business-name-generator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      🏷️ Business Name Generator
                    </Link>
                  </div>
                </div>
              </div>

              {/* Learn Section */}
              <div className="relative group">
                <button className="text-[#333333] hover:text-[#1A1A1A] transition font-medium flex items-center">
                  Learn
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link href="/ai-history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      📜 AI History
                    </Link>
                    <Link href="/ai-glossary" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      📖 AI Glossary
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <Link href="/ai-prompt-examples" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      📚 Prompt Examples
                    </Link>
                    <Link href="/chatgpt-prompt-templates" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      📝 Templates
                    </Link>
                    <Link href="/best-ai-tools" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      🛠️ AI Tools Guide
                    </Link>
                  </div>
                </div>
              </div>

              {/* Direct Links - Most Important */}
              <Link href="/shop" className="text-[#333333] hover:text-[#1A1A1A] transition font-medium">
                Shop
              </Link>
              <Link href="/#pricing" className="text-[#333333] hover:text-[#1A1A1A] transition font-medium">
                Pricing
              </Link>
              <Link href="/about" className="text-[#333333] hover:text-[#1A1A1A] transition font-medium">
                About
              </Link>
            </div>
            
            {/* Get Started Button */}
            <a 
              href="https://courses.becomeawritertoday.com/purchase?product_id=6253746" 
              className="bg-[#FFDE59] text-[#1A1A1A] px-3 py-1.5 md:px-4 md:py-2 rounded-md font-bold hover:bg-[#E5C84F] transition text-sm md:text-base whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="pt-4 space-y-3">
              {/* Tools Section */}
              <div className="space-y-2">
                <div className="font-semibold text-[#1A1A1A] px-4 text-sm">Tools</div>
                <Link href="/calculators" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  📊 Business Calculators
                </Link>
                <Link href="/ai-prompt-generator" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  🤖 AI Prompt Generator
                </Link>
                <Link href="/ai-prompt-generator/creative-writing-prompts" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  ✍️ Writing Prompts
                </Link>
                <Link href="/ai-prompt-quiz" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  🧠 Prompt Writing Quiz
                </Link>
                <Link href="/business-name-generator" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  🏷️ Business Name Generator
                </Link>
              </div>
              
              {/* Learn Section */}
              <div className="space-y-2 border-t border-gray-100 pt-3">
                <div className="font-semibold text-[#1A1A1A] px-4 text-sm">Learn</div>
                <Link href="/ai-history" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  📜 AI History
                </Link>
                <Link href="/ai-glossary" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  📖 AI Glossary
                </Link>
                <Link href="/ai-prompt-examples" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  📚 Prompt Examples
                </Link>
                <Link href="/chatgpt-prompt-templates" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  📝 Templates
                </Link>
                <Link href="/best-ai-tools" className="block px-4 py-2 text-[#333333] hover:bg-gray-50" onClick={() => setIsMobileMenuOpen(false)}>
                  🛠️ AI Tools Guide
                </Link>
              </div>
              
              {/* Direct Links */}
              <div className="space-y-2 border-t border-gray-100 pt-3">
                <Link href="/shop" className="block px-4 py-2 text-[#333333] hover:bg-gray-50 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  🛒 Shop
                </Link>
                <Link href="/#pricing" className="block px-4 py-2 text-[#333333] hover:bg-gray-50 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  💰 Pricing
                </Link>
                <Link href="/about" className="block px-4 py-2 text-[#333333] hover:bg-gray-50 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  ℹ️ About
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
