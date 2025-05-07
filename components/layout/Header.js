import Link from 'next/link'

export default function Header() {
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
          <Link href="/about" className="text-[#333333] hover:text-[#1A1A1A] transition">
            About
          </Link>
          <Link href="/#features" className="text-[#333333] hover:text-[#1A1A1A] transition">
            Features
          </Link>
          <Link href="/#pricing" className="text-[#333333] hover:text-[#1A1A1A] transition">
            Pricing
          </Link>
          <Link href="/#testimonials" className="text-[#333333] hover:text-[#1A1A1A] transition">
            Testimonials
          </Link>
          <Link href="/#faq" className="text-[#333333] hover:text-[#1A1A1A] transition">
            FAQ
          </Link>
        </div>
        <div>
          <a 
            href="https://bryancollins.com/products/prompt-writing-studio" 
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
