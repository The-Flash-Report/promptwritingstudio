export default function Instructor() {
  return (
    <section id="instructor" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="badge mb-4">ABOUT THE INSTRUCTOR</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">Meet Bryan Collins</h2>
          <p className="body-large text-[#333333] max-w-3xl mx-auto">USA Today Best-Selling Author and Content Creation Expert</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl mx-auto">
          <div className="md:w-1/4 text-center md:text-left">
            <img 
              src="/images/bryan-collins.jpg" 
              alt="Bryan Collins" 
              className="rounded-lg shadow-medium max-w-full mx-auto w-48 h-auto"
            />
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              <a href="https://www.facebook.com/Becomeawritertoday/" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] hover:text-[#666666] transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="https://twitter.com/BryanJCollins" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] hover:text-[#666666] transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCglNILz3uBqPer5EMJ_pzVg" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] hover:text-[#666666] transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/bryancollins99/" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] hover:text-[#666666] transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="https://www.instagram.com/becomeawritertoday/" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] hover:text-[#666666] transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <p className="body-large text-[#333333] mb-4">
              Hi, I'm Bryan Collins, a Forbes contributor, content creator, and AI prompt engineer. I've spent the last decade helping creators and professionals produce better content faster.
            </p>
            
            <p className="text-[#333333] mb-4">
              When AI tools like ChatGPT emerged, I immediately recognized their potential to transform content creation. I've invested hundreds of hours testing and refining AI prompt techniques that actually work.
            </p>
            
            <p className="text-[#333333] mb-4">
              My work has been featured in Forbes, Fast Company, and Lifehacker, and I've helped thousands of students and professionals master content creation through my courses and coaching.
            </p>
            
            <p className="text-[#333333]">
              Now, I'm sharing my complete AI prompt writing system with you through PromptWritingStudio. These are the exact techniques I use every day to create high-quality content in a fraction of the time it used to take.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
