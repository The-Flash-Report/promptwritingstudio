import Link from 'next/link'

export default function IndustryNavigation() {
  const industries = [
    {
      title: "Content Creators",
      description: "YouTube, Instagram, Bloggers, Podcasters",
      icon: "🎬",
      painPoint: "Spending 20+ hours weekly on content creation?",
      solution: "Generate 30 days of content in 2 hours with AI prompts",
      features: ["Content Calendar Generator", "Script Writer", "Social Media Captions", "Content Repurposing"],
      cta: "Scale Your Content",
      href: "/content-creators-ai",
      color: "from-purple-500 to-pink-500",
      stats: "2,000+ creators automated"
    },
    {
      title: "Service Businesses",
      description: "Consultants, Agencies, Freelancers, Professionals",
      icon: "💼",
      painPoint: "Drowning in manual processes and client tasks?",
      solution: "Automate 80% of your business tasks with AI prompts",
      features: ["Proposal Generator", "Email Automation", "FAQ Templates", "Client Onboarding"],
      cta: "Automate Your Business",
      href: "/service-business-ai",
      color: "from-blue-500 to-cyan-500",
      stats: "1,500+ businesses automated"
    },
    {
      title: "E-commerce Stores",
      description: "Online Stores, Dropshipping, Product Sellers",
      icon: "🛍️",
      painPoint: "Struggling with product descriptions and low conversion?",
      solution: "Turn AI prompts into 40% more e-commerce sales",
      features: ["Product Description Generator", "Customer Service Bot", "Content Creator Suite", "Conversion Optimizer"],
      cta: "Boost Your Sales",
      href: "/ecommerce-ai",
      color: "from-green-500 to-emerald-500",
      stats: "1,000+ stores automated"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
            Choose Your Industry
          </h2>
          <p className="text-xl text-[#333333] max-w-3xl mx-auto">
            Get AI prompts and consulting specifically designed for your business type
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-[#E5E5E5] overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Header */}
              <div className={`bg-gradient-to-r ${industry.color} p-6 text-white text-center`}>
                <div className="text-4xl mb-2">{industry.icon}</div>
                <h3 className="text-2xl font-bold mb-1">{industry.title}</h3>
                <p className="text-white text-opacity-90">{industry.description}</p>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-[#333333] font-medium mb-2">{industry.painPoint}</p>
                  <p className="text-[#666666] text-sm">{industry.solution}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-[#1A1A1A] mb-3">Key Tools:</h4>
                  <ul className="space-y-2">
                    {industry.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-[#333333]">
                        <span className="text-[#FFDE59] mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-[#666666] mb-3">{industry.stats}</div>
                  <Link 
                    href={industry.href}
                    className={`bg-gradient-to-r ${industry.color} text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity duration-200 block`}
                  >
                    {industry.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-[#666666] mb-4">
            Not sure which category fits you? 
          </p>
          <Link 
            href="/ai-prompt-generator"
            className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
          >
            Try All AI Tools Free
          </Link>
        </div>
      </div>
    </section>
  )
}
