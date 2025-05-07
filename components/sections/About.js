export default function About() {
  return (
    <section className="py-12 md:py-16 gradient-bg text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 text-center md:text-left">
            <img 
              src="/images/bryan-collins.jpg" 
              alt="Bryan Collins" 
              className="rounded-lg shadow-xl max-w-full mx-auto"
            />
            <h3 className="text-2xl font-bold mt-6 mb-2 text-white">Bryan Collins</h3>
            <p className="text-white font-medium">USA Today Best-Selling Author</p>
            
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/Becomeawritertoday/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="https://twitter.com/BryanJCollins" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCglNILz3uBqPer5EMJ_pzVg" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/bryancollins99/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="https://www.instagram.com/becomeawritertoday/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <span className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-4 py-1 rounded-full font-bold text-sm mb-4">MEET YOUR INSTRUCTOR</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Hi, I'm Bryan Collins</h2>
            
            <p className="text-lg text-white mb-4 leading-relaxed">
              As a USA Today Best-Selling Author, I've helped thousands of students write more effectively and build successful online businesses over the past decade.
            </p>
            
            <p className="text-lg text-white mb-4 leading-relaxed">
              When AI tools like ChatGPT emerged, I immediately saw their potential to transform content creation. But I also noticed how many people were struggling to get quality results.
            </p>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3 text-white">Why I Created PromptWritingStudio</h3>
              <p className="text-lg text-white mb-4 leading-relaxed">
                I've invested 100+ hours studying AI content creation systems and refined them into a proven, seamless system that will save you countless hours of frustration.
              </p>
              <p className="text-lg text-white mb-4 leading-relaxed">
                These prompt techniques have saved me thousands of dollars on outsourcing and hiring, and now I want to share them with you so you can experience the same benefits.
              </p>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3 text-white">Check Out My AI News Aggregator</h3>
              <p className="text-lg text-white mb-4 leading-relaxed">
                I also built <a href="https://aiflashreport.com/" className="text-[#FFDE59] font-medium underline hover:text-white" target="_blank" rel="noopener noreferrer">AI Flash Report</a>, a curated news aggregator that helps you stay up-to-date with the latest developments in artificial intelligence without the noise and hype.
              </p>
            </div>
            
            <div className="mt-8">
              <a 
                href="https://aiflashreport.com/" 
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit AI Flash Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
