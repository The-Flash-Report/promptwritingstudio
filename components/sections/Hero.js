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
          <div className="md:w-1/2 flex justify-center items-center">
            <div className="bg-white p-1 rounded-lg shadow-medium border border-[#E5E5E5] max-w-full">
              <div className="relative rounded-lg bg-[#F9F9F9] overflow-hidden" style={{width: '450px', height: '450px'}}>
                <iframe 
                  src="https://www.youtube.com/embed/uKmZkUu1tOM?si=3a4uUk77LyUKAIm9" 
                  title="PromptWritingStudio Introduction" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  width="450"
                  height="450"
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
