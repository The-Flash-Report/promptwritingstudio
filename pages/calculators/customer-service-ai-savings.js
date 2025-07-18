import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import CustomerServiceAICalculator from '../../components/calculators/CustomerServiceAICalculator'
import RelatedCalculators from '../../components/ui/RelatedCalculators'
import CalculatorBreadcrumbs from '../../components/ui/CalculatorBreadcrumbs'
import CalculatorSchema from '../../components/ui/CalculatorSchema'
import RichSnippets from '../../components/ui/RichSnippets'
import EnhancedMeta from '../../components/ui/EnhancedMeta'

const CustomerServiceAIPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Customer Service AI Savings Calculator",
    "description": "Calculate potential savings from implementing AI in customer service operations",
    "url": "https://promptwritingstudio.com/calculators/customer-service-ai-savings",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Calculate ticket automation potential",
      "Estimate response time improvements", 
      "Analyze agent cost savings",
      "ROI calculation with implementation costs",
      "Customer satisfaction impact assessment"
    ]
  }

  const faqData = [
    {
      question: "How accurate are the customer service AI savings estimates?",
      answer: "Our calculations are based on industry averages and real-world AI implementation data. Results typically range from 60-80% accuracy, depending on your specific business context and implementation approach."
    },
    {
      question: "What types of customer service tickets can AI handle?",
      answer: "AI excels at handling routine inquiries like account questions, password resets, order status, basic troubleshooting, and FAQ responses. Complex issues requiring empathy or creative problem-solving still need human agents."
    },
    {
      question: "How long does it take to implement customer service AI?",
      answer: "Basic AI chatbots can be deployed in 2-4 weeks, while comprehensive AI customer service systems typically take 3-6 months to fully implement and optimize."
    },
    {
      question: "Will AI replace all customer service agents?",
      answer: "No, AI augments human agents rather than replacing them entirely. Most businesses see 40-75% ticket automation, with agents handling complex issues and providing oversight."
    }
  ]

  return (
    <Layout>
      <Head>
        <title>Customer Service AI Savings Calculator - Calculate Support Cost Reduction | PromptWritingStudio</title>
        <EnhancedMeta
          description="Calculate how AI can reduce customer service costs, improve response times, and boost satisfaction. Free calculator shows potential savings from support automation."
          keywords="customer service AI calculator, support automation savings, AI chatbot ROI, customer service costs, help desk automation"
          ogTitle="Customer Service AI Savings Calculator - See Your Potential Cost Reduction"
          ogDescription="Discover how much you can save with AI-powered customer service. Calculate ticket automation, response time improvements, and agent cost savings."
          canonicalUrl="https://promptwritingstudio.com/calculators/customer-service-ai-savings"
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
              { name: 'Customer Service AI Savings', href: '/calculators/customer-service-ai-savings' }
            ]}
          />

          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#1A1A1A]">
              Customer Service AI Savings Calculator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover how AI can transform your customer service operations. Calculate potential savings, 
              efficiency gains, and customer satisfaction improvements from implementing AI-powered support.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Ticket Automation Analysis
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Response Time Improvement
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Agent Cost Savings
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                ROI Calculation
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-16">
            <CustomerServiceAICalculator />
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">How Customer Service AI Works</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Automated Ticket Handling</h3>
                <p className="text-gray-600">
                  AI chatbots and virtual assistants handle routine inquiries 24/7, instantly resolving 
                  common customer questions without human intervention.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Intelligent Routing</h3>
                <p className="text-gray-600">
                  Complex issues are automatically categorized and routed to the right specialist, 
                  reducing resolution time and improving first-contact resolution rates.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Agent Assistance</h3>
                <p className="text-gray-600">
                  AI provides real-time suggestions, knowledge base search, and response templates 
                  to help human agents resolve issues faster and more accurately.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A] text-center">
              Key Benefits of AI-Powered Customer Service
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-indigo-800">💰 Cost Reduction</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• 40-75% reduction in routine ticket handling</li>
                  <li>• Lower agent staffing requirements</li>
                  <li>• Reduced training and onboarding costs</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-blue-800">🚀 Improved Efficiency</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• 24/7 instant response capability</li>
                  <li>• Faster resolution times</li>
                  <li>• Higher first-contact resolution</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-green-800">😊 Better Experience</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Instant responses for common questions</li>
                  <li>• Consistent service quality</li>
                  <li>• Multilingual support capabilities</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-purple-800">📈 Scalability</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Handle volume spikes without hiring</li>
                  <li>• Easy expansion to new channels</li>
                  <li>• Automated capacity management</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-orange-800">🎯 Agent Empowerment</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Focus on complex, high-value interactions</li>
                  <li>• AI-powered response suggestions</li>
                  <li>• Automated case summarization</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-3 text-red-800">📊 Data Insights</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Customer sentiment analysis</li>
                  <li>• Trend identification and reporting</li>
                  <li>• Performance optimization recommendations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Implementation Guide */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">Customer Service AI Implementation Roadmap</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Phase 1: Assessment & Planning (Weeks 1-2)</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Audit current support tickets and categorize by complexity</li>
                  <li>• Identify high-volume, routine inquiries for automation</li>
                  <li>• Set baseline metrics for response time and satisfaction</li>
                  <li>• Choose AI platform and integration approach</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Phase 2: Setup & Training (Weeks 3-6)</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Configure AI chatbot with knowledge base</li>
                  <li>• Create automated workflows for common scenarios</li>
                  <li>• Train AI on historical ticket data</li>
                  <li>• Set up escalation rules to human agents</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Phase 3: Pilot Testing (Weeks 7-10)</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Deploy AI for limited ticket types or channels</li>
                  <li>• Monitor performance and customer feedback</li>
                  <li>• Refine AI responses and escalation triggers</li>
                  <li>• Train support team on AI collaboration</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold mb-2">Phase 4: Full Deployment (Weeks 11-16)</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Roll out AI across all support channels</li>
                  <li>• Implement advanced features like sentiment analysis</li>
                  <li>• Optimize agent workflows with AI assistance</li>
                  <li>• Establish ongoing monitoring and improvement processes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Schema and Rich Snippets */}
          <CalculatorSchema 
            name="Customer Service AI Savings Calculator"
            description="Calculate potential cost savings and efficiency improvements from implementing AI in customer service operations"
            url="https://promptwritingstudio.com/calculators/customer-service-ai-savings"
          />

          <RichSnippets
            title="Customer Service AI Savings Calculator"
            description="Free calculator to estimate cost savings from AI customer service implementation"
            faqs={faqData}
            breadcrumbs={[
              { name: 'Home', url: 'https://promptwritingstudio.com' },
              { name: 'Calculators', url: 'https://promptwritingstudio.com/calculators' },
              { name: 'Customer Service AI Savings', url: 'https://promptwritingstudio.com/calculators/customer-service-ai-savings' }
            ]}
          />

          {/* Related Calculators */}
          <RelatedCalculators 
            currentCalculator="customer-service-ai-savings"
            calculators={[
              {
                title: 'AI vs Human Cost Calculator',
                description: 'Compare the costs of AI automation versus human labor',
                url: '/calculators/ai-cost-comparison',
                icon: '⚖️'
              },
              {
                title: 'Business AI Readiness Score',
                description: 'Assess your business readiness for AI implementation',
                url: '/calculators/business-ai-readiness',
                icon: '📊'
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
              Ready to Transform Your Customer Service?
            </h2>
            <p className="text-lg text-[#1A1A1A] mb-6">
              Learn advanced AI strategies for customer service optimization in Prompt Writing Studio.
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

export default CustomerServiceAIPage 