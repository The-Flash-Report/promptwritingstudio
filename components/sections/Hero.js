import Link from 'next/link';
import TypewriterEffect from '../ui/TypewriterEffect';

export default function Hero() {
  const claudeTopics = ['Claude Code', 'Sub-agents', 'MCP Servers', 'Skills', 'Hooks']

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
              Start with the Claude Code guide, or jump straight into the MCP stack, plan picker,
              and other calculators below.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/claude-code-guide"
                className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-2.5 md:px-8 md:py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition text-center text-sm md:text-base inline-flex items-center justify-center"
              >
                Start with Claude Code
              </Link>
              <Link
                href="/calculators"
                className="border border-white text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition text-center text-sm md:text-base inline-flex items-center justify-center"
              >
                Browse Free Calculators
              </Link>
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
