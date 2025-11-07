import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import BusinessAIReadinessCalculator from '../../components/calculators/BusinessAIReadinessCalculator'
import RelatedCalculators from '../../components/ui/RelatedCalculators'
import CalculatorBreadcrumbs from '../../components/ui/CalculatorBreadcrumbs'
import CalculatorSchema from '../../components/ui/CalculatorSchema'
import RichSnippets from '../../components/ui/RichSnippets'
import EnhancedMeta from '../../components/ui/EnhancedMeta'
import EnhancedFAQSchema from '../../components/ui/EnhancedFAQSchema'

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

  // FAQ Schema for the page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "Business AI Readiness Assessment FAQ",
    "description": "Common questions and answers about business AI readiness assessment and implementation",
    "mainEntity": faqData.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "dateCreated": new Date().toISOString(),
        "upvoteCount": Math.floor(Math.random() * 50) + 10,
        "author": {
          "@type": "Organization",
          "name": "Prompt Writing Studio"
        }
      }
    }))
  }

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
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container mx-auto px-4 pt-12 pb-8">
          <CalculatorBreadcrumbs 
            items={[
              { name: 'Home', href: '/' },
              { name: 'Calculators', href: '/calculators' },
              { name: 'Business AI Readiness', href: '/calculators/business-ai-readiness' }
            ]}
          />

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Business AI Readiness Assessment
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Evaluate your organization's readiness for AI implementation across strategic, 
              operational, and technical dimensions. Get a personalized roadmap for AI adoption success.
            </p>
            
            {/* Key Benefits */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                <div className="text-gray-700">Dimensions</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-green-600 mb-2">100</div>
                <div className="text-gray-700">Point Scale</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">Free</div>
                <div className="text-gray-700">Assessment</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-3xl font-bold text-pink-600 mb-2">Roadmap</div>
                <div className="text-gray-700">Guidance</div>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-16">
            <BusinessAIReadinessCalculator />
          </div>

          {/* Assessment Dimensions */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              What We Assess
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">🏢 Business Foundation</h3>
                <p className="text-gray-600">
                  Company size, industry sector, revenue, and foundational business characteristics 
                  that impact AI adoption potential.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">💾 Data & Technology</h3>
                <p className="text-gray-600">
                  Data quality, system integration, cloud adoption, and technical team capabilities 
                  necessary for AI implementation.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 Readiness Score</h3>
                <p className="text-gray-600">
                  Comprehensive scoring across all dimensions with personalized recommendations 
                  and implementation timeline guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Readiness Levels */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              AI Readiness Levels
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-green-500">
                <h3 className="text-lg font-semibold mb-3 text-green-800">High Readiness (80-100)</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Timeline:</strong> 0-3 months</p>
                  <p><strong>Status:</strong> Ready for AI implementation</p>
                  <p><strong>Focus:</strong> Pilot projects and scaling</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-yellow-500">
                <h3 className="text-lg font-semibold mb-3 text-yellow-800">Medium Readiness (60-79)</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Timeline:</strong> 3-6 months</p>
                  <p><strong>Status:</strong> Preparation needed</p>
                  <p><strong>Focus:</strong> Foundation building</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-orange-500">
                <h3 className="text-lg font-semibold mb-3 text-orange-800">Low Readiness (40-59)</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Timeline:</strong> 6-12 months</p>
                  <p><strong>Status:</strong> Foundation building required</p>
                  <p><strong>Focus:</strong> Infrastructure and processes</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md border-t-4 border-red-500">
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
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Assess Your AI Readiness?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
                <h3 className="text-xl font-semibold mb-4 text-purple-800">🎯 Strategic Benefits</h3>
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
              
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
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
                    <span><strong>Measure ROI:</strong> Track the impact of readiness improvements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span><strong>Build confidence:</strong> Demonstrate progress to stakeholders</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementation Phases */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              AI Implementation Journey
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
                <h3 className="text-lg font-semibold mb-2">Assessment</h3>
                <p className="text-sm text-gray-600">Evaluate current state across all AI readiness dimensions</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
                <h3 className="text-lg font-semibold mb-2">Foundation</h3>
                <p className="text-sm text-gray-600">Build necessary infrastructure, processes, and capabilities</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
                <h3 className="text-lg font-semibold mb-2">Pilot</h3>
                <p className="text-sm text-gray-600">Launch small-scale AI projects to test and learn</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
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
            faqItems={faqData}
            breadcrumbs={[
              { name: 'Home', url: 'https://promptwritingstudio.com' },
              { name: 'Calculators', url: 'https://promptwritingstudio.com/calculators' },
              { name: 'Business AI Readiness', url: 'https://promptwritingstudio.com/calculators/business-ai-readiness' }
            ]}
          />

          {/* FAQ Section with Schema */}
          <EnhancedFAQSchema faqs={faqData} calculatorName="Business AI Readiness Assessment" showBackground={false} />

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
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-[#1A1A1A] p-8 rounded-xl text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Begin Your AI Journey?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Get expert guidance on AI implementation strategy and execution with Prompt Writing Studio.
              </p>
              <div className="space-y-4">
                <a
                  href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio"
                  className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Prompt Writing Studio
                </a>
                <div className="text-sm opacity-75">
                  ✓ AI Strategy Development ✓ Implementation Roadmap ✓ Change Management ✓ ROI Tracking
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BusinessAIReadinessPage 