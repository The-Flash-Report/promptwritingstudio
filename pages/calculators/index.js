import Layout from '../../components/layout/Layout'
import OrganizationSchema from '../../components/ui/OrganizationSchema'
import Head from 'next/head'
import Link from 'next/link'

export default function CalculatorsHub() {
  const calculators = [
    {
      title: 'AI ROI Calculator',
      description: 'Calculate exactly how much time and money you could save with AI automation',
      url: '/roi-calculator',
      keywords: ['ROI', 'savings', 'automation', 'productivity'],
      color: 'from-yellow-400 to-orange-500',
      icon: '💰',
      benefits: ['Time savings analysis', 'Cost reduction metrics', 'Business impact assessment']
    },
    {
      title: 'AI vs Human Cost Calculator',
      description: 'Compare the true cost of AI automation vs hiring employees or contractors',
      url: '/calculators/ai-cost-comparison',
      keywords: ['hiring vs AI', 'cost comparison', 'automation vs human'],
      color: 'from-blue-500 to-purple-600',
      icon: '⚖️',
      benefits: ['Hiring decision support', 'Payback period analysis', 'Quality score comparison']
    },
    {
      title: 'Content Creation Speed Calculator',
      description: 'Calculate how much time and money you save using AI for content creation',
      url: '/calculators/content-creation-speed',
      keywords: ['content speed', 'writing productivity', 'AI content'],
      color: 'from-green-500 to-teal-600',
      icon: '✍️',
      benefits: ['Time savings analysis', 'Productivity increase metrics', 'ROI calculations']
    },
    {
      title: 'E-commerce AI Calculator',
      description: 'Calculate savings from automating product descriptions, customer service, and marketing',
      url: '/calculators/ecommerce-ai-savings',
      keywords: ['e-commerce AI', 'online store automation', 'product descriptions'],
      color: 'from-purple-500 to-pink-600',
      icon: '🛒',
      benefits: ['Product description automation', 'Customer service savings', 'Marketing efficiency']
    },
    {
      title: 'Customer Service AI Calculator',
      description: 'Calculate support ticket reduction, response time improvement, and staff savings',
      url: '/calculators/customer-service-ai-savings',
      keywords: ['customer service AI', 'support automation', 'helpdesk AI'],
      color: 'from-indigo-500 to-blue-600',
      icon: '🎧',
      benefits: ['Ticket volume reduction', 'Response time improvement', 'Staff cost savings']
    },
    {
      title: 'Business AI Readiness Score',
      description: 'Assess your business readiness for AI implementation with actionable recommendations',
      url: '/calculators/business-ai-readiness',
      keywords: ['AI readiness', 'business AI score', 'AI adoption'],
      color: 'from-red-500 to-pink-600',
      icon: '📊',
      benefits: ['Readiness assessment', 'Implementation roadmap', 'Priority recommendations']
    }
  ]

  const collectionsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Business Calculators",
    "description": "Free AI calculators for business owners. Calculate ROI, compare AI vs human costs, assess readiness, and plan implementation.",
    "url": "https://promptwritingstudio.com/calculators",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://promptwritingstudio.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Calculators",
          "item": "https://promptwritingstudio.com/calculators"
        }
      ]
    },
    "mainEntity": calculators.filter(calc => !calc.comingSoon).map((calc, index) => ({
      "@type": "WebApplication",
      "name": calc.title,
      "description": calc.description,
      "url": `https://promptwritingstudio.com${calc.url}`,
      "applicationCategory": "BusinessApplication",
      "isAccessibleForFree": true,
      "position": index + 1
    }))
  }

  return (
    <Layout
      title="AI Business Calculators - Free Tools for ROI, Cost Analysis & Planning | PromptWritingStudio"
      description="Free AI calculators for business owners. Calculate ROI, compare AI vs human costs, assess readiness, and plan implementation. Get instant results and actionable insights."
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collectionsSchema)
          }}
        />
      </Head>
      <OrganizationSchema />
      {/* Hero Section */}
      <section className="gradient-bg py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AI Business Calculators
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Free tools to calculate ROI, compare costs, and plan your AI implementation strategy
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">6+</div>
                <div className="text-sm">Calculators</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Free</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">Instant</div>
                <div className="text-sm">Results</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Choose Your Calculator
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each calculator is designed for specific business decisions and provides instant, 
                actionable insights with detailed reports and implementation guides.
              </p>
              <div className="mt-4 text-sm">
                <Link href="/what-is-rag" className="text-blue-600 hover:text-blue-800 font-semibold">
                  New: What is RAG (Retrieval‑Augmented Generation)? →
                </Link>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {calculators.map((calc, index) => (
                <div key={index} className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 ${calc.comingSoon ? 'opacity-75' : ''}`}>
                  <div className={`bg-gradient-to-r ${calc.color} p-6 text-white`}>
                    <div className="flex items-center mb-3">
                      <span className="text-3xl mr-3">{calc.icon}</span>
                      <div>
                        <h3 className="text-xl font-bold">{calc.title}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{calc.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {calc.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Target Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {calc.keywords.map((keyword, i) => (
                          <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {calc.comingSoon ? (
                      <div className="bg-gray-100 text-gray-500 py-3 px-4 rounded-lg text-center font-semibold">
                        Coming Soon
                      </div>
                    ) : (
                      <Link
                        href={calc.url}
                        className={`block w-full bg-gradient-to-r ${calc.color} text-white py-3 px-4 rounded-lg font-bold text-center hover:opacity-90 transition-opacity duration-200`}
                      >
                        Use Calculator
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Our Calculators */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Why Use Our AI Calculators?
              </h2>
              <p className="text-lg text-gray-600">
                Based on real business data and industry best practices
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Accurate Data</h3>
                <p className="text-gray-600 text-sm">
                  Based on real business metrics from 1000+ implementations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Instant Results</h3>
                <p className="text-gray-600 text-sm">
                  Get comprehensive analysis in under 2 minutes
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Detailed Reports</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive guides with implementation steps
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">100% Free</h3>
                <p className="text-gray-600 text-sm">
                  No sign-up required, unlimited usage
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Use Cases */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Popular Business Use Cases
              </h2>
              <p className="text-lg text-gray-600">
                See how other business owners are using these calculators
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  scenario: 'Content Marketing Agency',
                  challenge: 'Deciding whether to hire writers or use AI',
                  calculator: 'AI vs Human Cost Calculator',
                  result: 'Saved $4,800/month by using AI for 80% of content'
                },
                {
                  scenario: 'E-commerce Store Owner',
                  challenge: 'Calculating ROI of automating product descriptions',
                  calculator: 'AI ROI Calculator',
                  result: 'Projected $18,000 yearly savings with 15-hour weekly reduction'
                },
                {
                  scenario: 'SaaS Customer Support',
                  challenge: 'Evaluating chatbot implementation costs',
                  calculator: 'Customer Service AI Calculator',
                  result: 'Identified 70% ticket reduction potential worth $36K/year'
                },
                {
                  scenario: 'Real Estate Agency',
                  challenge: 'Automating listing descriptions and client communications',
                  calculator: 'AI ROI Calculator',
                  result: 'Found 20-hour weekly savings worth $2,400/month'
                },
                {
                  scenario: 'Professional Services Firm',
                  challenge: 'Assessing readiness for AI adoption',
                  calculator: 'Business AI Readiness Score',
                  result: 'Received detailed roadmap with priority implementation steps'
                },
                {
                  scenario: 'Marketing Consultant',
                  challenge: 'Comparing costs of hiring vs AI for multiple clients',
                  calculator: 'AI vs Human Cost Calculator',
                  result: 'Scaled services 300% without proportional staff increase'
                }
              ].map((useCase, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-800 mb-2">{useCase.scenario}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Challenge:</strong> {useCase.challenge}
                  </p>
                  <p className="text-sm text-blue-600 mb-3">
                    <strong>Used:</strong> {useCase.calculator}
                  </p>
                  <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                    <strong>Result:</strong> {useCase.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Prompt Collections */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Professional Prompt Collections
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Specialized AI prompts designed for specific professional roles and industries
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/prompts/marketing-professionals" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-600">Marketing Professionals</h3>
                <p className="text-gray-600 text-sm">Campaign strategies, copy optimization, and analytics prompts</p>
              </Link>
              
              <Link href="/prompts/sales-teams" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group">
                <div className="text-2xl mb-3">📞</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-600">Sales Teams</h3>
                <p className="text-gray-600 text-sm">Prospecting, objection handling, and closing prompts</p>
              </Link>
              
              <Link href="/prompts/content-creators" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group">
                <div className="text-2xl mb-3">📱</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-600">Content Creators</h3>
                <p className="text-gray-600 text-sm">Viral content, audience growth, and monetization strategies</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Implement Your AI Strategy?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              After calculating your potential savings, learn how to implement AI in your business 
              with our comprehensive PromptWritingStudio course.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Learning Now
              </a>
              <Link
                href="/ai-prompt-generator"
                className="border border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Try Free Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 