import Link from 'next/link';

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="py-16 md:py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge mb-4">THE CHALLENGE</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">The Problem with AI Content Creation</h2>
            <p className="body-large text-[#333333]">Now that you know who I am, let me show you the challenges most creators face:</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white hover:shadow-medium transition-shadow duration-300 p-6 rounded-lg border border-[#E5E5E5]">
              <div className="flex items-start">
                <div className="bg-[#F9F9F9] w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-[#E5E5E5]">
                  <i className="fas fa-times text-[#1A1A1A] text-lg"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-[#1A1A1A]">Generic AI Outputs</h3>
                  <p className="text-[#333333]">AI content that sounds robotic and lacks your unique voice, making your brand indistinguishable from competitors.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white hover:shadow-medium transition-shadow duration-300 p-6 rounded-lg border border-[#E5E5E5]">
              <div className="flex items-start">
                <div className="bg-[#F9F9F9] w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-[#E5E5E5]">
                  <i className="fas fa-times text-[#1A1A1A] text-lg"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-[#1A1A1A]">Wasted Time</h3>
                  <p className="text-[#333333]">Hours spent rewriting AI outputs, searching for the right prompts, and trying to make content sound authentic.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white hover:shadow-medium transition-shadow duration-300 p-6 rounded-lg border border-[#E5E5E5]">
              <div className="flex items-start">
                <div className="bg-[#F9F9F9] w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-[#E5E5E5]">
                  <i className="fas fa-times text-[#1A1A1A] text-lg"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-[#1A1A1A]">Inconsistent Results</h3>
                  <p className="text-[#333333]">Frustration from getting great AI outputs one day and unusable content the next, with no clear system.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white hover:shadow-medium transition-shadow duration-300 p-6 rounded-lg border border-[#E5E5E5]">
              <div className="flex items-start">
                <div className="bg-[#F9F9F9] w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-[#E5E5E5]">
                  <i className="fas fa-times text-[#1A1A1A] text-lg"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-[#1A1A1A]">Overwhelm</h3>
                  <p className="text-[#333333]">Too many conflicting prompt techniques from social media, YouTube videos, and blog posts without a cohesive system.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-12">
            <span className="badge mb-4">THE SOLUTION</span>
            <h2 className="font-display text-3xl font-bold mb-4 text-[#1A1A1A]">My Proven System</h2>
            <p className="body-large text-[#333333] mb-8">PromptWritingStudio gives you the complete framework I've developed that solves these problems.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white hover:shadow-medium transition-shadow duration-300 p-6 rounded-lg border border-[#E5E5E5]">
              <div className="flex items-start">
                <div className="bg-[#FFDE59] bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-[#FFDE59]">
                  <i className="fas fa-check text-[#1A1A1A] text-lg"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-[#1A1A1A]">Maintain Your Voice</h3>
                  <p className="text-[#333333]">Templates that ensure AI outputs sound like you wrote them, preserving your unique style and brand voice.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white hover:shadow-medium transition-shadow duration-300 p-6 rounded-lg border border-[#E5E5E5]">
              <div className="flex items-start">
                <div className="bg-[#FFDE59] bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-[#FFDE59]">
                  <i className="fas fa-check text-[#1A1A1A] text-lg"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-[#1A1A1A]">Save Hours Weekly</h3>
                  <p className="text-[#333333]">Cut content creation time by 50% with proven prompts that work the first time, every time.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white hover:shadow-medium transition-shadow duration-300 p-6 rounded-lg border border-[#E5E5E5]">
              <div className="flex items-start">
                <div className="bg-[#FFDE59] bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-[#FFDE59]">
                  <i className="fas fa-check text-[#1A1A1A] text-lg"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-[#1A1A1A]">Consistent Quality</h3>
                  <p className="text-[#333333]">A reliable system that delivers high-quality outputs consistently, eliminating the frustration of hit-or-miss results.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white hover:shadow-medium transition-shadow duration-300 p-6 rounded-lg border border-[#E5E5E5]">
              <div className="flex items-start">
                <div className="bg-[#FFDE59] bg-opacity-20 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-[#FFDE59]">
                  <i className="fas fa-check text-[#1A1A1A] text-lg"></i>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium mb-3 text-[#1A1A1A]">Simple Framework</h3>
                  <p className="text-[#333333]">A clear, step-by-step system that eliminates confusion and gives you exactly what you need without the overwhelm.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="#pricing" 
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
