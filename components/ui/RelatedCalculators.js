import Link from 'next/link'

export default function RelatedCalculators({ currentCalculator, showAll = false }) {
  const allCalculators = [
    {
      title: 'AI ROI Calculator',
      description: 'Calculate your potential time and cost savings with AI',
      url: '/roi-calculator',
      icon: '💰',
      color: 'from-yellow-400 to-orange-500',
      category: 'general'
    },
    {
      title: 'AI vs Human Cost Calculator',
      description: 'Compare automation costs vs hiring employees',
      url: '/calculators/ai-cost-comparison',
      icon: '⚖️',
      color: 'from-blue-500 to-purple-600',
      category: 'comparison'
    },
    {
      title: 'Customer Service AI Calculator',
      description: 'Calculate support cost reduction and efficiency gains',
      url: '/calculators/customer-service-ai-savings',
      icon: '🎧',
      color: 'from-indigo-500 to-blue-600',
      category: 'customer-service'
    },
    {
      title: 'Business AI Readiness Score',
      description: 'Assess your business readiness for AI implementation',
      url: '/calculators/business-ai-readiness',
      icon: '📊',
      color: 'from-red-500 to-pink-600',
      category: 'assessment'
    },
    {
      title: 'Content Creation Speed Calculator',
      description: 'Measure AI content creation productivity gains',
      url: '/calculators/content-creation-speed',
      icon: '✍️',
      color: 'from-green-500 to-teal-600',
      category: 'content',
      comingSoon: true
    },
    {
      title: 'E-commerce AI Calculator',
      description: 'Calculate savings for online store automation',
      url: '/calculators/ecommerce-ai-savings',
      icon: '🛒',
      color: 'from-purple-500 to-pink-600',
      category: 'ecommerce',
      comingSoon: true
    }
  ]

  // Filter out current calculator and limit results
  const relatedCalculators = allCalculators
    .filter(calc => calc.url !== currentCalculator)
    .slice(0, showAll ? allCalculators.length : 3)

  if (relatedCalculators.length === 0) return null

  return (
    <section className="py-12 bg-gray-50 border-t">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2 text-[#1A1A1A]">
              {showAll ? 'All Calculators' : 'Try These Calculators Next'}
            </h3>
            <p className="text-gray-600">
              {showAll 
                ? 'Explore our complete suite of AI business calculators'
                : 'Get more insights with our other AI business calculators'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCalculators.map((calculator, index) => (
              <div key={index} className="relative group">
                {calculator.comingSoon ? (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 opacity-75">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${calculator.color} flex items-center justify-center text-2xl mr-4`}>
                        {calculator.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-400">{calculator.title}</h4>
                        <span className="text-sm text-orange-500 font-medium">Coming Soon</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">{calculator.description}</p>
                  </div>
                ) : (
                  <Link href={calculator.url} className="block">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-200 group-hover:scale-105">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${calculator.color} flex items-center justify-center text-2xl mr-4`}>
                          {calculator.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#1A1A1A] group-hover:text-blue-600">
                            {calculator.title}
                          </h4>
                          <div className="text-sm text-blue-600 font-medium">Try Calculator →</div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{calculator.description}</p>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
          
          {!showAll && (
            <div className="text-center mt-8">
              <Link 
                href="/calculators" 
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
              >
                View All Calculators
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              
              <div className="flex justify-center gap-4 text-sm">
                <Link 
                  href="/ai-history"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  📚 Learn AI History
                </Link>
                <Link 
                  href="/ai-glossary"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  📖 AI Terms Glossary
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 