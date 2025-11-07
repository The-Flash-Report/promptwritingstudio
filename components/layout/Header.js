import Link from 'next/link'
// TODO: Authentication temporarily disabled - no user accounts until backend is ready
// import { useSession, signIn, signOut } from 'next-auth/react'

export default function Header() {
  // TODO: Session management disabled until user account system is implemented
  // const { data: session, status } = useSession()
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <svg className="h-8 w-8 md:h-10 md:w-10 text-[#1A1A1A]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#FFDE59" fillOpacity="0.2"/>
            <path d="M30 30H70M30 50H60M30 70H50" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            <circle cx="80" cy="70" r="10" fill="currentColor"/>
          </svg>
          <span className="ml-2 text-lg md:text-xl font-bold text-[#1A1A1A] truncate">PromptWritingStudio</span>
        </Link>
        <div className="hidden md:flex space-x-6">
          {/* Business Tools - Most Important Category */}
          <div className="relative group">
            <button className="text-[#333333] hover:text-[#1A1A1A] transition font-semibold flex items-center">
              Tools
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
              <div className="py-2">
                <Link href="/calculators" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">
                  📊 Business Calculators
                </Link>
                <Link href="/ai-prompt-generator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  🤖 AI Prompt Generator
                </Link>
                <Link href="/gemini-prompt-generator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  💎 Gemini Prompt Generator
                </Link>
                <Link href="/tools/mad-libs-prompt-creator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  🎯 Mad Libs Prompt Creator
                </Link>
                <Link href="/tools/prompt-diagnostic-quiz" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  🔍 Prompt Diagnostic Quiz
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
            <button className="text-[#333333] hover:text-[#1A1A1A] transition font-semibold flex items-center">
              Learn
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
              <div className="py-2">
                <Link href="/video-tutorials" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">
                  🎥 Video Tutorials
                </Link>
                <Link href="/ai-history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">
                  📜 AI History
                </Link>
                <Link href="/ai-glossary" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold">
                  📖 AI Glossary
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link href="/ai-prompt-examples" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  📚 Prompt Examples
                </Link>
                <Link href="/chatgpt-prompt-templates" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  📝 Templates
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link href="/prompts/marketing-professionals" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  📊 Marketing Professionals
                </Link>
                <Link href="/prompts/sales-teams" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  📞 Sales Teams
                </Link>
                <Link href="/prompts/hr-managers" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  👥 HR Managers
                </Link>
                <Link href="/prompts/content-creators" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  📱 Content Creators
                </Link>
                <Link href="/prompts/small-business-owners" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  🏪 Small Business
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <Link href="/best-ai-tools" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  🛠️ AI Tools Guide
                </Link>
              </div>
            </div>
          </div>

          {/* Direct Links - Most Important */}
          <Link href="/#pricing" className="text-[#333333] hover:text-[#1A1A1A] transition font-semibold">
            Pricing
          </Link>
          <Link href="/about" className="text-[#333333] hover:text-[#1A1A1A] transition font-semibold">
            About
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {/* TODO: Authentication UI temporarily disabled - no user accounts until backend is ready */}
          {/* 
          {status === 'loading' ? (
            <div className="animate-pulse bg-gray-200 h-8 w-20 rounded-md"></div>
          ) : session ? (
            <div className="flex items-center space-x-3">
              <Link
                href="/dashboard"
                className="text-[#333333] hover:text-[#1A1A1A] transition text-sm md:text-base"
              >
                Dashboard
              </Link>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-[#333333] hover:text-[#1A1A1A] transition text-sm md:text-base">
                  <span>{session.user.name || session.user.email}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    {session.user.subscriptionPlan && (
                      <Link
                        href="/courses"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Courses
                      </Link>
                    )}
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => signIn()}
                className="text-[#333333] hover:text-[#1A1A1A] transition text-sm md:text-base"
              >
                Sign In
              </button>
              <a 
                href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio" 
                className="bg-[#FFDE59] text-[#1A1A1A] px-3 py-1.5 md:px-4 md:py-2 rounded-md font-bold hover:bg-[#E5C84F] transition text-sm md:text-base whitespace-nowrap"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            </>
          )}
          */}
          
          {/* Simplified header without authentication - courses handled by external Teachable platform */}
          <a 
            href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio" 
            className="bg-[#FFDE59] text-[#1A1A1A] px-3 py-1.5 md:px-4 md:py-2 rounded-md font-bold hover:bg-[#E5C84F] transition text-sm md:text-base whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  )
}
