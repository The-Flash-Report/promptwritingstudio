import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

const toolsItems = [
  { href: '/calculators', label: '📊 Business Calculators', bold: true },
  { href: '/ai-prompt-generator', label: '🤖 AI Prompt Generator' },
  { href: '/gemini-prompt-generator', label: '💎 Gemini Prompt Generator' },
  { href: '/tools/mad-libs-prompt-creator', label: '🎯 Mad Libs Prompt Creator' },
  { href: '/tools/prompt-diagnostic-quiz', label: '🔍 Prompt Diagnostic Quiz' },
  { href: '/ai-prompt-quiz', label: '🧠 Prompt Writing Quiz' },
  { href: '/business-name-generator', label: '🏷️ Business Name Generator' },
]

const learnItems = [
  { href: '/video-tutorials', label: '🎥 Video Tutorials', bold: true },
  { href: '/ai-history', label: '📜 AI History', bold: true },
  { href: '/ai-glossary', label: '📖 AI Glossary', bold: true },
  { type: 'divider' },
  { href: '/ai-prompt-examples', label: '📚 Prompt Examples' },
  { href: '/chatgpt-prompt-templates', label: '📝 Templates' },
  { type: 'divider' },
  { href: '/prompts/marketing-professionals', label: '📊 Marketing Professionals' },
  { href: '/prompts/sales-teams', label: '📞 Sales Teams' },
  { href: '/prompts/hr-managers', label: '👥 HR Managers' },
  { href: '/prompts/content-creators', label: '📱 Content Creators' },
  { href: '/prompts/small-business-owners', label: '🏪 Small Business' },
  { type: 'divider' },
  { href: '/best-ai-tools', label: '🛠️ AI Tools Guide' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toggleDropdown = useCallback((name) => {
    setOpenDropdown((prev) => (prev === name ? null : name))
  }, [])

  const handleDropdownKeyDown = useCallback((event, name) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setOpenDropdown(name)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpenDropdown(null)
    }
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const renderDropdownChevron = () => (
    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  )

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <svg className="h-8 w-8 md:h-10 md:w-10 text-[#1A1A1A]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="#FFDE59" fillOpacity="0.2"/>
            <path d="M30 30H70M30 50H60M30 70H50" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
            <circle cx="80" cy="70" r="10" fill="currentColor"/>
          </svg>
          <span className="ml-2 text-lg md:text-xl font-bold text-[#1A1A1A] truncate">PromptWritingStudio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6" ref={dropdownRef}>
          {/* Business Tools - Most Important Category */}
          <div className="relative group">
            <button
              className="text-[#333333] hover:text-[#1A1A1A] transition font-semibold flex items-center"
              onClick={() => toggleDropdown('tools')}
              onKeyDown={(e) => handleDropdownKeyDown(e, 'tools')}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'tools'}
            >
              Tools
              {renderDropdownChevron()}
            </button>
            <div
              className={`absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                openDropdown === 'tools'
                  ? 'visible opacity-100'
                  : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
              }`}
              role="menu"
            >
              <div className="py-2">
                {toolsItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 ${item.bold ? 'font-semibold' : ''}`}
                    role="menuitem"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Learn Section */}
          <div className="relative group">
            <button
              className="text-[#333333] hover:text-[#1A1A1A] transition font-semibold flex items-center"
              onClick={() => toggleDropdown('learn')}
              onKeyDown={(e) => handleDropdownKeyDown(e, 'learn')}
              aria-haspopup="true"
              aria-expanded={openDropdown === 'learn'}
            >
              Learn
              {renderDropdownChevron()}
            </button>
            <div
              className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                openDropdown === 'learn'
                  ? 'visible opacity-100'
                  : 'invisible opacity-0 group-hover:visible group-hover:opacity-100'
              }`}
              role="menu"
            >
              <div className="py-2">
                {learnItems.map((item, index) =>
                  item.type === 'divider' ? (
                    <div key={`divider-${index}`} className="border-t border-gray-100 my-1"></div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 ${item.bold ? 'font-semibold' : ''}`}
                      role="menuitem"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.label}
                    </Link>
                  )
                )}
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

        {/* Right side: CTA + Hamburger */}
        <div className="flex items-center space-x-3">
          <a
            href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
            className="bg-[#FFDE59] text-[#1A1A1A] px-3 py-1.5 md:px-4 md:py-2 rounded-md font-bold hover:bg-[#E5C84F] transition text-sm md:text-base whitespace-nowrap"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Started
          </a>

          {/* Hamburger button - mobile only */}
          <button
            className="md:hidden p-2 text-[#1A1A1A] hover:bg-gray-100 rounded-md transition"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            {/* Header with close button */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <span className="text-lg font-bold text-[#1A1A1A]">Menu</span>
              <button
                onClick={closeMobileMenu}
                className="p-2 text-[#1A1A1A] hover:bg-gray-100 rounded-md transition"
                aria-label="Close navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile nav items */}
            <div className="px-4 py-4">
              {/* Tools section */}
              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tools</h3>
                {toolsItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block py-2 text-[#333333] hover:text-[#1A1A1A] hover:bg-blue-50 rounded px-2 transition ${item.bold ? 'font-semibold' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-200 my-3"></div>

              {/* Learn section */}
              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Learn</h3>
                {learnItems.map((item, index) =>
                  item.type === 'divider' ? (
                    <div key={`mobile-divider-${index}`} className="border-t border-gray-100 my-2"></div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block py-2 text-[#333333] hover:text-[#1A1A1A] hover:bg-blue-50 rounded px-2 transition ${item.bold ? 'font-semibold' : ''}`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>

              <div className="border-t border-gray-200 my-3"></div>

              {/* Direct links */}
              <div className="mb-4">
                <Link
                  href="/#pricing"
                  className="block py-2 text-[#333333] hover:text-[#1A1A1A] hover:bg-blue-50 rounded px-2 transition font-semibold"
                  onClick={closeMobileMenu}
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="block py-2 text-[#333333] hover:text-[#1A1A1A] hover:bg-blue-50 rounded px-2 transition font-semibold"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </div>

              <div className="border-t border-gray-200 my-3"></div>

              {/* CTA */}
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
                className="block w-full text-center bg-[#FFDE59] text-[#1A1A1A] px-4 py-3 rounded-md font-bold hover:bg-[#E5C84F] transition"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
