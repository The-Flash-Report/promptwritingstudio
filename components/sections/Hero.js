import { useState } from 'react';
import Link from 'next/link';
import TypewriterEffect from '../ui/TypewriterEffect';

export default function Hero() {
  const claudeTopics = ['Claude Code', 'Sub-agents', 'MCP Servers', 'Skills', 'Hooks']
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleCtaClick = () => {
    setIsRedirecting(true)
  }

  return (
    <header className="gradient-bg py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 hero-content mb-8 md:mb-0">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
              The Practical Guide to <TypewriterEffect phrases={claudeTopics} />
            </h1>
            <p className="text-base md:text-lg mb-4 md:mb-6 text-white">
              Working guides, templates, and comparisons for people building real work with Claude —
              Claude Code, Projects, Artifacts, Skills, MCP, sub-agents, and hooks.
            </p>
            <p className="text-sm md:text-base text-white mb-2 md:mb-3">
              No hype. Every recipe is pulled from real Claude Code sessions and checked against
              Anthropic's current docs before it ships.
            </p>
            <p className="text-sm md:text-base text-white mb-4 md:mb-6">
              Start with the Claude Code guide below, or grab the prompt templates and calculators
              trusted by thousands of solo operators, small teams, and in-house AI leads.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/claude-code-guide"
                className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-2.5 md:px-8 md:py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition text-center text-sm md:text-base inline-flex items-center justify-center"
              >
                Start with Claude Code
              </Link>
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
                className={`border border-white text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition text-center text-sm md:text-base inline-flex items-center justify-center ${isRedirecting ? 'opacity-80 pointer-events-none' : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCtaClick}
                aria-busy={isRedirecting}
              >
                {isRedirecting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Redirecting...
                  </>
                ) : (
                  'Get the Course'
                )}
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="bg-white p-1 rounded-lg shadow-medium border border-[#E5E5E5] w-full max-w-[450px]">
              <div className="relative rounded-lg bg-[#F9F9F9] overflow-hidden w-full aspect-square">
                <iframe
                  src="https://www.youtube.com/embed/uKmZkUu1tOM?si=3a4uUk77LyUKAIm9"
                  title="PromptWritingStudio Introduction"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
