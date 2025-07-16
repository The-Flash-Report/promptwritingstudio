import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import BusinessAIReadinessCalculator from '../../components/calculators/BusinessAIReadinessCalculator'
import RelatedCalculators from '../../components/ui/RelatedCalculators'
import CalculatorBreadcrumbs from '../../components/ui/CalculatorBreadcrumbs'
import CalculatorSchema from '../../components/ui/CalculatorSchema'
import RichSnippets from '../../components/ui/RichSnippets'
import EnhancedMeta from '../../components/ui/EnhancedMeta'

const BusinessAIReadinessPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Business AI Readiness Assessment",
    "description": "Comprehensive assessment tool to evaluate your business readiness for AI implementation",
    "url": "https://promptwritingstudio.com/calculators/business-ai-readiness",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Multi-dimensional AI readiness assessment",
      "Strategic readiness evaluation",
      "Technology infrastructure analysis", 
      "Operational readiness scoring",
      "Personalized implementation roadmap"
    ]
  }

  const faqData = [
    {
      question: "How long does the Business AI Readiness Assessment take?",
      answer: "The comprehensive assessment takes about 10-15 minutes to complete. It covers 5 key dimensions with multiple questions to provide an accurate readiness score."
    },
    {
      question: "What does my AI readiness score mean?",
      answer: "Scores are categorized as: 80-100 (High - Ready for AI), 60-79 (Medium - Preparation needed), 40-59 (Low - Foundation building required), Below 40 (Significant preparation needed). Each comes with specific recommendations."
    },
    {
      question: "Can I retake the assessment after making improvements?",
      answer: "Absolutely! We recommend retaking the assessment every 3-6 months as you implement improvements to track your progress toward AI readiness."
    },
    {
      question: "Is this assessment suitable for all business sizes?",
      answer: "Yes, the assessment is designed for businesses of all sizes, from startups to large enterprises. Questions and recommendations are tailored based on your company size and industry."
    }
  ]

  return (
    <Layout>
      <Head>
        <title>Business AI Readiness Assessment - Score Your AI Implementation Readiness | PromptWritingStudio</title>
        <EnhancedMeta
          description="Take our comprehensive Business AI Readiness Assessment. Get your AI readiness score and personalized implementation roadmap. Free assessment tool for businesses."
          keywords="business AI readiness assessment, AI implementation score, AI adoption evaluation, business AI strategy, AI readiness calculator"
          ogTitle="Business AI Readiness Assessment - Get Your AI Implementation Score"
          ogDescription="Discover how ready your business is for AI implementation. Take our comprehensive assessment and get a personalized roadmap."
          canonicalUrl="https://promptwritingstudio.com/calculators/business-ai-readiness"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <CalculatorBreadcrumbs 
            items={[
              { name: 'Home', href: '/' },
              { name: 'Calculators', href: '/calculators' },
              { name: 'Business AI Readiness', href: '/calculators/business-ai-readiness' }
            ]}
          />

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A]">
              Business AI Readiness Assessment
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Evaluate your organization's readiness for AI implementation across strategic, 
              operational, and technical dimensions. Get a personalized roadmap for AI adoption success.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                5-Dimension Assessment
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Strategic Readiness
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Technology Evaluation
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Implementation Roadmap
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-16">
            <BusinessAIReadinessCalculator />
          </div>

          {/* Assessment Dimensions */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">What We Assess</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Business Foundation</h3>
                <p className="text-gray-600">
                  Company size, industry sector, revenue, and foundational business characteristics 
                  that impact AI adoption potential.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💾</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Data & Technology</h3>
                <p className="text-gray-600">
                  Data quality, system integration, cloud adoption, and technical team capabilities 
                  necessary for AI implementation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Strategic Readiness</h3>
                <p className="text-gray-600">
                  AI strategy definition, leadership support, budget allocation, and timeline 
                  for implementation initiatives.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Operational Readiness</h3>
                <p className="text-gray-600">
                  Process documentation, change management capabilities, training culture, 
                  and risk tolerance for new technologies.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Experience</h3>
                <p className="text-gray-600">
                  Current AI tool usage, automation level, and experience working with 
                  technology vendors and implementations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Readiness Score</h3>
                <p className="text-gray-600">
                  Comprehensive scoring across all dimensions with personalized recommendations 
                  and implementation timeline guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Readiness Levels */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A] text-center">
              AI Readiness Levels
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-green-500">
                <h3 className="text-lg font-semibold mb-3 text-green-800">High Readiness (80-100)</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Timeline:</strong> 0-3 months</p>
                  <p><strong>Status:</strong> Ready for AI implementation</p>
                  <p><strong>Focus:</strong> Pilot projects and scaling</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-yellow-500">
                <h3 className="text-lg font-semibold mb-3 text-yellow-800">Medium Readiness (60-79)</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Timeline:</strong> 3-6 months</p>
                  <p><strong>Status:</strong> Preparation needed</p>
                  <p><strong>Focus:</strong> Foundation building</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-orange-500">
                <h3 className="text-lg font-semibold mb-3 text-orange-800">Low Readiness (40-59)</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Timeline:</strong> 6-12 months</p>
                  <p><strong>Status:</strong> Foundation building required</p>
                  <p><strong>Focus:</strong> Infrastructure and processes</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500">
                <h3 className="text-lg font-semibold mb-3 text-red-800">Very Low (Below 40)</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Timeline:</strong> 12+ months</p>
                  <p><strong>Status:</strong> Significant preparation needed</p>
                  <p><strong>Focus:</strong> Digital transformation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">Why Assess Your AI Readiness?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-800">🎯 Strategic Benefits</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span><strong>Identify gaps:</strong> Understand what needs to be addressed before AI implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span><strong>Prioritize investments:</strong> Focus resources on the most critical areas first</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span><strong>Set realistic timelines:</strong> Plan AI initiatives based on current capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span><strong>Minimize risks:</strong> Avoid common pitfalls in AI adoption</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-800">📈 Operational Benefits</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span><strong>Benchmark progress:</strong> Track readiness improvements over time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span><strong>Get team alignment:</strong> Create shared understanding of AI readiness</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span><strong>Personalized roadmap:</strong> Receive specific next steps for your situation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span><strong>Resource planning:</strong> Understand staffing and budget requirements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementation Phases */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A] text-center">
              AI Implementation Journey
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
                <h3 className="text-lg font-semibold mb-2">Assessment</h3>
                <p className="text-sm text-gray-600">Evaluate current state across all AI readiness dimensions</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
                <h3 className="text-lg font-semibold mb-2">Foundation</h3>
                <p className="text-sm text-gray-600">Build necessary infrastructure, processes, and capabilities</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
                <h3 className="text-lg font-semibold mb-2">Pilot</h3>
                <p className="text-sm text-gray-600">Launch small-scale AI projects to test and learn</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
                <h3 className="text-lg font-semibold mb-2">Scale</h3>
                <p className="text-sm text-gray-600">Expand successful AI initiatives across the organization</p>
              </div>
            </div>
          </div>

          {/* Schema and Rich Snippets */}
          <CalculatorSchema 
            name="Business AI Readiness Assessment"
            description="Comprehensive multi-dimensional assessment to evaluate business readiness for AI implementation"
            url="https://promptwritingstudio.com/calculators/business-ai-readiness"
          />

          <RichSnippets
            title="Business AI Readiness Assessment"
            description="Free comprehensive assessment to evaluate your business AI implementation readiness"
            faqs={faqData}
            breadcrumbs={[
              { name: 'Home', url: 'https://promptwritingstudio.com' },
              { name: 'Calculators', url: 'https://promptwritingstudio.com/calculators' },
              { name: 'Business AI Readiness', url: 'https://promptwritingstudio.com/calculators/business-ai-readiness' }
            ]}
          />

          {/* Related Calculators */}
          <RelatedCalculators 
            currentCalculator="business-ai-readiness"
            calculators={[
              {
                title: 'Customer Service AI Calculator',
                description: 'Calculate support cost reduction and efficiency gains',
                url: '/calculators/customer-service-ai-savings',
                icon: '🎧'
              },
              {
                title: 'AI vs Human Cost Calculator',
                description: 'Compare the costs of AI automation versus human labor',
                url: '/calculators/ai-cost-comparison',
                icon: '⚖️'
              },
              {
                title: 'ROI Calculator',
                description: 'Calculate return on investment for business initiatives',
                url: '/roi-calculator',
                icon: '💰'
              }
            ]}
          />

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#FFDE59] to-[#E5C84F] rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#1A1A1A]">
              Ready to Begin Your AI Journey?
            </h2>
            <p className="text-lg text-[#1A1A1A] mb-6">
              Get expert guidance on AI implementation strategy and execution with Prompt Writing Studio.
            </p>
            <a
              href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
              className="inline-block bg-[#1A1A1A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Prompt Writing Studio
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BusinessAIReadinessPage 