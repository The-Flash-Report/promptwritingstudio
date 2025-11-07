export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Content Creator',
      quote: 'I was spending 15+ hours a week on content creation. With PromptWritingStudio, I\'ve cut that down to just 5 hours while actually increasing my output quality. The prompt templates alone have saved me thousands in outsourcing costs.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director',
      quote: 'Our team struggled with getting consistent results from AI tools. The 4-question framework from PromptWritingStudio completely changed our approach. We\'ve seen a 40% increase in campaign effectiveness since implementing these strategies.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Freelance Writer',
      quote: 'The "platform translator" prompt alone was worth the subscription. I can now create tailored content for 5 different social platforms in the time it used to take me to write for just one. My clients are amazed at how I maintain my unique voice across all formats.',
      rating: 5
    }
  ]
  
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What My Clients and Students Say</h2>
        
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card mb-8 bg-[#F9F9F9] p-6 md:p-8 rounded-lg shadow-sm border border-[#E5E5E5]">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-[#FFDE59] bg-opacity-20 flex items-center justify-center text-[#1A1A1A] mb-3 border border-[#FFDE59]">
                  <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="font-bold text-center text-[#1A1A1A]">{testimonial.name}</h4>
                <p className="text-[#333333] text-sm text-center">{testimonial.role}</p>
                <div className="mt-2 text-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star text-yellow-400"></i>
                  ))}
                </div>
              </div>
              
              <div className="md:w-3/4">
                <div className="relative">
                  <i className="fas fa-quote-left text-4xl text-[#FFDE59] absolute -top-4 -left-2 opacity-30"></i>
                  <p className="text-[#333333] text-lg relative z-10 pl-6 pt-2">"{testimonial.quote}"</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">As Seen On</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E5E5]">
            <img 
              src="/images/social proof.png" 
              alt="Featured in Forbes, Lifehacker, Copyblogger, and USA Today" 
              className="max-w-full h-auto mx-auto"
            />
          </div>
          
          <div className="mt-10">
            <a 
              href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio" 
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
