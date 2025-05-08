import Link from 'next/link';

export default function WhatYouGet() {
  const features = [
    {
      title: "4-Question Framework",
      description: "The simple framework that gets AI to solve your specific creative problems and generate ideas your audience actually wants.",
      icon: "question-circle"
    },
    {
      title: "Content Calendar Creator",
      description: "How to create a month of content from a single AI-assisted creative session and never run out of ideas.",
      icon: "calendar-alt"
    },
    {
      title: "Prompt Stacking Method",
      description: "The method that builds increasingly valuable content assets and transforms mediocre first drafts into polished content.",
      icon: "layer-group"
    },
    {
      title: "Platform Translator",
      description: "The technique that adapts your content for each social channel, helping you maintain your unique voice across all platforms.",
      icon: "sync"
    },
    {
      title: "Email Support",
      description: "Get personalized help for your specific AI use cases and questions directly from Bryan via email.",
      icon: "envelope"
    },
    {
      title: "Bonus: Custom GPTs",
      description: "Access to a dozen ChatGPT bots delivered straight to your inbox, designed specifically for content creators.",
      icon: "gift"
    }
  ];
  
  return (
    <section id="what-you-get" className="py-16 md:py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <span className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-4 py-1 rounded-full font-bold text-sm mb-4">WHAT'S INCLUDED</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">What You'll Get</h2>
          <p className="text-lg text-[#333333] max-w-3xl mx-auto leading-relaxed">
            Plug-and-Play AI Prompts Delivered to Your Inbox 3 Times a Week
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-10 shadow-medium rounded-lg border border-[#E5E5E5]">
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-[#F9F9F9] w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border border-[#E5E5E5]">
                    <i className={`fas fa-${feature.icon} text-2xl text-[#1A1A1A]`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-[#1A1A1A]">{feature.title}</h3>
                    <p className="text-[#333333]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746" 
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
