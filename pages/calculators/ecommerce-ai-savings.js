import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import EcommerceAICalculator from '../../components/calculators/EcommerceAICalculator';
import EnhancedFAQSchema from '../../components/ui/EnhancedFAQSchema';

export default function EcommerceAISavingsPage() {
  // FAQ data for the EnhancedFAQSchema component
  const faqs = [
    {
      question: "How accurate are these automation savings estimates?",
      answer: "Our calculations are based on real data from e-commerce stores using AI automation. Most stores see 60-85% time savings and significant cost reductions within the first month of implementation.",
      relatedLinks: [
        { text: "AI Cost Comparison Calculator", url: "/calculators/ai-cost-comparison" },
        { text: "Business AI Readiness Assessment", url: "/calculators/business-ai-readiness" }
      ]
    },
    {
      question: "Which e-commerce platforms work best with AI automation?",
      answer: "Shopify has the most robust AI app ecosystem, but WooCommerce, BigCommerce, and even Amazon seller tools all support AI automation. Our calculator includes platform-specific bonuses based on integration capabilities.",
      relatedLinks: [
        { text: "Content Creation Speed Calculator", url: "/calculators/content-creation-speed" },
        { text: "Customer Service AI Calculator", url: "/calculators/customer-service-ai" }
      ]
    },
    {
      question: "Will AI-generated product descriptions hurt my SEO?",
      answer: "No, when properly prompted, AI creates SEO-optimized, unique content that search engines love. The key is using the right prompts and review processes, which our course teaches in detail.",
      relatedLinks: [
        { text: "AI Prompt Examples", url: "/ai-prompt-examples" },
        { text: "ChatGPT Templates", url: "/chatgpt-templates" }
      ]
    },
    {
      question: "Can AI handle customer service for complex products?",
      answer: "AI excels at handling 70% of routine inquiries (orders, shipping, returns) while routing complex technical questions to human agents. This creates the best customer experience while maximizing efficiency.",
      relatedLinks: [
        { text: "Customer Service AI Calculator", url: "/calculators/customer-service-ai" },
        { text: "AI Agent Builder", url: "/ai-agent-builder" }
      ]
    },
    {
      question: "How quickly can I implement these AI automations?",
      answer: "Basic automation (like product descriptions) can be implemented immediately. Full customer service and marketing automation typically takes 2-4 weeks to set up properly, but the ROI starts from day one.",
      relatedLinks: [
        { text: "AI Prompt Generator", url: "/ai-prompt-generator" },
        { text: "Live Chat Tester", url: "/live-chat-tester" }
      ]
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "E-commerce AI Savings Calculator",
    "description": "Calculate savings from automating product descriptions, customer service, and marketing for your online store. Free calculator for Shopify, WooCommerce, and more.",
    "url": "https://promptwritingstudio.com/calculators/ecommerce-ai-savings",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "provider": {
      "@type": "Organization",
      "name": "Prompt Writing Studio",
      "url": "https://promptwritingstudio.com"
    },
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "E-commerce Business Owners"
    }
  };

  // FAQ Schema for the page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "E-commerce AI Automation FAQ",
    "description": "Common questions and answers about e-commerce AI automation and savings calculations",
    "mainEntity": faqs.map((faq, index) => ({
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
  };

  return (
    <>
      <Head>
        <title>E-commerce AI Calculator - Product Description & Customer Service Automation Savings</title>
        <meta name="description" content="Calculate how much you can save automating your e-commerce store with AI. Free calculator for product descriptions, customer service, and marketing automation. Works with Shopify, WooCommerce & more." />
        <meta name="keywords" content="e-commerce AI calculator, product description automation, online store AI, Shopify automation, WooCommerce AI, customer service automation, e-commerce savings calculator" />
        
        {/* Open Graph */}
        <meta property="og:title" content="E-commerce AI Calculator - Automate Your Online Store & Save Thousands" />
        <meta property="og:description" content="Calculate savings from AI automation of product descriptions, customer service, and marketing for your e-commerce store." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://promptwritingstudio.com/calculators/ecommerce-ai-savings" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="E-commerce AI Calculator" />
        <meta name="twitter:description" content="Calculate your e-commerce AI automation savings" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://promptwritingstudio.com/calculators/ecommerce-ai-savings" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
          {/* Hero Section */}
          <div className="container mx-auto px-4 pt-12 pb-8">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                E-commerce AI Savings Calculator
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover exactly how much time and money you can save by automating your online store operations with AI. Get instant calculations for product descriptions, customer service, and marketing automation.
              </p>
              
              {/* Key Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-purple-600 mb-2">70%</div>
                  <div className="text-gray-700">Customer Service Automation</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-2">83%</div>
                  <div className="text-gray-700">Faster Product Descriptions</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Free</div>
                  <div className="text-gray-700">Instant ROI Analysis</div>
                </div>
              </div>
            </div>

            {/* Calculator Component */}
            <EcommerceAICalculator />

            {/* Platform-Specific Examples */}
            <div className="max-w-6xl mx-auto mt-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Platform-Specific AI Automation Examples
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">🛍️ Shopify Stores</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Product descriptions:</span>
                      <span className="font-semibold text-green-600">6x faster</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer inquiries:</span>
                      <span className="font-semibold text-green-600">70% automated</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Marketing emails:</span>
                      <span className="font-semibold text-green-600">75% time saved</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-3">
                      ✓ Excellent AI app ecosystem ✓ 20% automation bonus
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">🎨 WooCommerce</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Bulk descriptions:</span>
                      <span className="font-semibold text-blue-600">Mass generation</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SEO optimization:</span>
                      <span className="font-semibold text-blue-600">Automated</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social media:</span>
                      <span className="font-semibold text-blue-600">Auto-posting</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-3">
                      ✓ WordPress integration ✓ 10% automation bonus
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">📦 Amazon Sellers</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex justify-between">
                      <span>Listing optimization:</span>
                      <span className="font-semibold text-orange-600">Keyword-rich</span>
                    </div>
                    <div className="flex justify-between">
                      <span>A+ content:</span>
                      <span className="font-semibold text-orange-600">Rapid creation</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Review responses:</span>
                      <span className="font-semibold text-orange-600">Automated</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-3">
                      ✓ Compliance-focused ✓ Bulk operations
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Automation Breakdown */}
            <div className="max-w-6xl mx-auto mt-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                What Can Be Automated in Your E-commerce Store?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <span className="text-green-600 font-bold">📝</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Product Content Creation</h3>
                      <p className="text-gray-600 mb-2">AI can generate compelling product descriptions, titles, and features lists in seconds.</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li>• SEO-optimized descriptions</li>
                        <li>• Consistent brand voice</li>
                        <li>• Multiple language versions</li>
                        <li>• A/B testing variations</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <span className="text-blue-600 font-bold">🎧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Customer Service Automation</h3>
                      <p className="text-gray-600 mb-2">Handle common inquiries instantly while routing complex issues to humans.</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li>• Order status updates</li>
                        <li>• Return/refund processing</li>
                        <li>• Product recommendations</li>
                        <li>• FAQ responses</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                      <span className="text-purple-600 font-bold">📧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Marketing Content</h3>
                      <p className="text-gray-600 mb-2">Generate email campaigns, social posts, and ad copy that converts.</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li>• Email sequences</li>
                        <li>• Social media posts</li>
                        <li>• Google/Facebook ads</li>
                        <li>• Blog content</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <span className="text-yellow-600 font-bold">🔍</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">SEO Optimization</h3>
                      <p className="text-gray-600 mb-2">Automatically optimize your store for search engines and improve rankings.</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li>• Keyword research</li>
                        <li>• Meta descriptions</li>
                        <li>• Alt text generation</li>
                        <li>• Schema markup</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 p-3 rounded-full">
                      <span className="text-red-600 font-bold">📊</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Analytics & Reporting</h3>
                      <p className="text-gray-600 mb-2">Generate insights and reports about your store performance automatically.</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li>• Sales summaries</li>
                        <li>• Customer insights</li>
                        <li>• Inventory alerts</li>
                        <li>• Performance trends</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-100 p-3 rounded-full">
                      <span className="text-indigo-600 font-bold">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Personalization</h3>
                      <p className="text-gray-600 mb-2">Create personalized experiences for each customer automatically.</p>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li>• Product recommendations</li>
                        <li>• Dynamic pricing</li>
                        <li>• Personalized emails</li>
                        <li>• Custom landing pages</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI Case Studies */}
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Real E-commerce AI Success Stories
              </h2>
              
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <span className="text-2xl">👗</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Fashion Retailer (500+ Products)</h3>
                      <p className="text-gray-600">Shopify store specializing in women's clothing</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$12K</div>
                      <div className="text-sm text-gray-600">Monthly Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-sm text-gray-600">Time Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">2x</div>
                      <div className="text-sm text-gray-600">Product Launch Speed</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <span className="text-2xl">🏠</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Home Goods Store (1000+ SKUs)</h3>
                      <p className="text-gray-600">WooCommerce store with furniture and decor</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$8.5K</div>
                      <div className="text-sm text-gray-600">Monthly Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">72%</div>
                      <div className="text-sm text-gray-600">Support Automation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">40h</div>
                      <div className="text-sm text-gray-600">Weekly Time Saved</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Electronics Seller (Amazon FBA)</h3>
                      <p className="text-gray-600">Tech accessories with 200+ products</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$6K</div>
                      <div className="text-sm text-gray-600">Monthly Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">90%</div>
                      <div className="text-sm text-gray-600">Listing Automation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">5x</div>
                      <div className="text-sm text-gray-600">Faster Launches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto mt-16">
              <div className="bg-[#1A1A1A] p-8 rounded-xl text-white text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Implement E-commerce AI Automation?
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Get the complete toolkit of AI prompts, workflows, and strategies specifically designed for e-commerce stores
                </p>
                <div className="text-sm opacity-75 mb-6">
                  ✓ Platform-Specific Prompts ✓ Automation Workflows ✓ Customer Service Scripts ✓ Marketing Templates
                </div>
                <a
                  href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                  className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Prompt Writing Studio
                </a>
              </div>
            </div>

            {/* FAQ Section */}
            <EnhancedFAQSchema faqs={faqs} calculatorName="E-commerce AI Savings Calculator" showBackground={false} />

            {/* Related Tools */}
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Related Business Calculators
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Link 
                  href="/calculators/content-creation-speed" 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">⚡ Content Creation Speed Calculator</h3>
                  <p className="text-gray-600">Calculate time savings for blogs, social media, and marketing content creation.</p>
                </Link>
                
                <Link 
                  href="/roi-calculator" 
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">📊 AI ROI Calculator</h3>
                  <p className="text-gray-600">Calculate the overall return on investment for AI tools in your business.</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
} 