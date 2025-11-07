import Layout from '../../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

// Import the marketing professionals data
const marketingProfessionalsData = {
  "modifierName": "Marketing Professionals",
  "searchVolume": 2200,
  "keywordDifficulty": 14,
  "seoData": {
    "title": "AI Prompts for Marketing Professionals - 15+ Expert Templates | PromptWritingStudio",
    "description": "Discover 15+ specialized AI prompts for marketing professionals. Create campaigns, analyze data, write copy, and boost ROI with our expert-crafted ChatGPT templates for marketers."
  },
  "promptTemplates": [
    {
      "title": "Campaign Strategy Generator",
      "description": "Create comprehensive marketing campaign strategies with clear objectives and tactics.",
      "prompt": "Develop a complete marketing campaign strategy for [product/service] targeting [target audience]. The campaign should achieve [primary goal: brand awareness/lead generation/sales]. Include: 1) Campaign objectives and KPIs, 2) Target audience personas with pain points and motivations, 3) Key messaging and value propositions, 4) Channel strategy (paid, owned, earned media), 5) Content calendar with 8 weeks of content ideas, 6) Budget allocation recommendations, 7) Success metrics and tracking methods, 8) Risk assessment and contingency plans. Budget: [budget amount]. Timeline: [duration]. Tone: [professional/casual/authoritative].",
      "category": "Strategy",
      "example": "CAMPAIGN: SaaS Tool Launch\n\nObjectives:\n- Generate 500 qualified leads in 90 days\n- Achieve 20% brand awareness lift\n- Drive 50 demo bookings\n\nTarget Audience:\n- SMB Marketing Managers (25-45)\n- Pain Point: Manual reporting taking 10+ hours/week\n- Motivation: Need efficiency to focus on strategy..."
    },
    {
      "title": "Marketing Copy Optimizer", 
      "description": "Transform existing copy into high-converting marketing materials.",
      "prompt": "Optimize this marketing copy for better conversion: [paste your current copy]. The copy is for [landing page/email/ad/social post] targeting [audience]. Goals: [increase CTR/improve conversion/boost engagement]. Please provide: 1) Analysis of current copy's strengths and weaknesses, 2) 3 optimized versions with different approaches (emotional/logical/social proof), 3) A/B testing recommendations, 4) Psychological triggers used in each version, 5) Suggested headlines and CTAs, 6) Mobile optimization tips. Focus on [specific outcome you want to achieve].",
      "category": "Copywriting",
      "example": "ORIGINAL: 'Get our software today!'\n\nOPTIMIZED VERSION 1 (Emotional):\n'Stop Wasting 10 Hours Weekly on Manual Reports - Automate in 5 Minutes'\n\nOPTIMIZED VERSION 2 (Logical):\n'Join 2,000+ Marketing Teams Who Cut Reporting Time by 80%'..."
    },
    {
      "title": "Customer Journey Mapper",
      "description": "Map detailed customer journeys with touchpoints and optimization opportunities.",
      "prompt": "Create a detailed customer journey map for [target customer] purchasing [product/service]. Map their journey from [awareness/consideration/decision] stage through post-purchase. Include: 1) Customer emotions and motivations at each stage, 2) Touchpoints and channels they use, 3) Content they consume and questions they have, 4) Pain points and friction areas, 5) Opportunities for marketing intervention, 6) Recommended content types for each stage, 7) Metrics to track at each touchpoint, 8) Personalization opportunities. Industry: [your industry]. Sales cycle: [length]. Average deal size: [amount].",
      "category": "Strategy",
      "example": "AWARENESS STAGE:\n\nEmotion: Frustrated with current solution\nTouchpoints: Google search, industry blogs, LinkedIn\nContent: Educational blog posts, comparison guides\nQuestions: 'Is there a better way to do this?'\nPain Points: Information overload, conflicting advice..."
    },
    {
      "title": "Marketing Automation Sequence",
      "description": "Design sophisticated email automation sequences for different customer segments.",
      "prompt": "Create a marketing automation sequence for [customer segment] who [specific trigger action]. The sequence should nurture them toward [desired outcome]. Design: 1) 7-email sequence with specific send timing, 2) Subject lines optimized for each email, 3) Content outline for each message, 4) Personalization elements to include, 5) Branching logic based on engagement, 6) Conversion tracking setup, 7) Follow-up sequences for different actions, 8) Exit criteria and re-engagement triggers. Industry: [industry]. Product: [product/service]. Average sales cycle: [duration].",
      "category": "Email Marketing",
      "example": "EMAIL 1 (Day 0): Welcome & Value Delivery\nSubject: 'Your [Resource] is ready + a bonus inside'\nContent: Deliver promised resource, set expectations, introduce brand story\nPersonalization: Use their download topic\nTrigger: Lead magnet download..."
    },
    {
      "title": "Performance Analysis Report",
      "description": "Analyze marketing performance data and generate actionable insights.",
      "prompt": "Analyze this marketing performance data and provide actionable insights: [paste your metrics/data]. Time period: [duration]. Campaigns included: [campaign names]. Please provide: 1) Key performance highlights and lowlights, 2) Trend analysis with explanations, 3) Channel performance comparison, 4) ROI analysis by campaign/channel, 5) Audience segment insights, 6) 5 specific optimization recommendations, 7) Budget reallocation suggestions, 8) Next quarter priorities. Goals: [your KPIs]. Budget: [amount spent].",
      "category": "Analytics",
      "example": "KEY INSIGHTS:\n\n✓ LinkedIn ads generated 3x higher quality leads than Facebook\n✗ Email open rates dropped 15% (industry trend)\n→ RECOMMENDATION: Shift 30% Facebook budget to LinkedIn\n→ RECOMMENDATION: Test new email subject line formulas..."
    }
  ],
  "useCases": [
    {
      "title": "Digital Marketing Managers",
      "icon": "fas fa-chart-line", 
      "description": "Marketing managers use these prompts to develop comprehensive campaign strategies, analyze performance data, and create data-driven optimization plans that improve ROI and team efficiency.",
      "recommendedPrompt": "Campaign Strategy Generator"
    },
    {
      "title": "Content Marketing Specialists",
      "icon": "fas fa-pencil-alt",
      "description": "Content marketers leverage these prompts to map customer journeys, create targeted messaging for different segments, and develop content strategies that drive qualified leads through the funnel.",
      "recommendedPrompt": "Customer Journey Mapper"
    },
    {
      "title": "Marketing Analysts",
      "icon": "fas fa-analytics",
      "description": "Marketing analysts use these prompts to transform raw performance data into actionable insights, identify optimization opportunities, and create executive-ready reports that drive strategic decisions.",
      "recommendedPrompt": "Performance Analysis Report"
    },
    {
      "title": "Email Marketing Managers",
      "icon": "fas fa-envelope",
      "description": "Email marketing professionals use these prompts to design sophisticated automation sequences, optimize copy for higher engagement, and create personalized campaigns that nurture leads effectively.",
      "recommendedPrompt": "Marketing Automation Sequence"
    }
  ],
  "benefits": [
    "Save 10+ hours weekly on campaign planning and analysis",
    "Improve campaign ROI by 25-40% with data-driven strategies", 
    "Create professional marketing materials without hiring agencies",
    "Scale personalized marketing efforts across multiple segments",
    "Generate months of content ideas in minutes"
  ],
  "faq": [
    {
      "question": "How do these prompts help with marketing ROI?",
      "answer": "These prompts help you create data-driven strategies, optimize underperforming campaigns, and identify high-ROI opportunities you might miss with manual analysis. Many users report 25-40% ROI improvements within 90 days."
    },
    {
      "question": "Can I use these prompts for B2B and B2C marketing?",
      "answer": "Absolutely! The prompts are designed to work for both B2B and B2C contexts. Simply specify your business model and target audience in the prompt for tailored recommendations."
    },
    {
      "question": "Do these prompts work with my existing marketing tools?",
      "answer": "Yes! These prompts help you create strategies and content that work with any marketing stack - from HubSpot and Salesforce to Mailchimp and Google Analytics. The AI adapts to your tools and workflows."
    }
  ]
};

export default function MarketingProfessionalsPage() {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [copiedPrompt, setCopiedPrompt] = useState(null);

  const copyToClipboard = async (prompt, index) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(index);
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <Head>
        <title>{marketingProfessionalsData.seoData.title}</title>
        <meta name="description" content={marketingProfessionalsData.seoData.description} />
        <meta name="keywords" content="AI prompts marketing professionals, ChatGPT marketing templates, marketing campaign generator, marketing automation prompts" />
        
        {/* Open Graph */}
        <meta property="og:title" content={marketingProfessionalsData.seoData.title} />
        <meta property="og:description" content={marketingProfessionalsData.seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://promptwritingstudio.com/prompts/marketing-professionals" />
        
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": marketingProfessionalsData.seoData.title,
              "description": marketingProfessionalsData.seoData.description,
              "url": "https://promptwritingstudio.com/prompts/marketing-professionals",
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
                    "name": "Prompts",
                    "item": "https://promptwritingstudio.com/prompts"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Marketing Professionals",
                    "item": "https://promptwritingstudio.com/prompts/marketing-professionals"
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              📊 AI Prompts for Marketing Professionals
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Create winning campaigns, analyze data, and boost ROI with our specialized 
              AI prompts designed for marketing professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#prompts"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Explore Prompts
              </a>
              <a
                href="#use-cases"
                className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors"
              >
                See Use Cases
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Transform Your Marketing with AI
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {marketingProfessionalsData.benefits.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-blue-600 text-xl mb-3">✓</div>
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prompts Section */}
        <section id="prompts" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Expert Marketing Prompts
            </h2>
            
            <div className="grid gap-8">
              {marketingProfessionalsData.promptTemplates.map((template, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/3">
                      <h3 className="text-xl font-bold mb-3">{template.title}</h3>
                      <p className="text-gray-600 mb-4">{template.description}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {template.category}
                      </span>
                    </div>
                    
                    <div className="lg:w-2/3">
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-700">Prompt Template:</h4>
                          <button
                            onClick={() => copyToClipboard(template.prompt, index)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            {copiedPrompt === index ? '✅ Copied!' : '📋 Copy'}
                          </button>
                        </div>
                        <p className="text-gray-800 whitespace-pre-wrap">{template.prompt}</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Example Output:</h4>
                        <p className="text-green-700 text-sm whitespace-pre-wrap">{template.example}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Perfect for Marketing Professionals
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {marketingProfessionalsData.useCases.map((useCase, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start">
                    <div className="text-2xl mr-4">📊</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-gray-600 mb-3">{useCase.description}</p>
                      <div className="text-sm text-blue-600 font-medium">
                        Recommended: {useCase.recommendedPrompt}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {marketingProfessionalsData.faq.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Explore More Professional Prompts
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/prompts/sales-teams" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition group">
                <div className="text-2xl mb-3">📞</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">Sales Teams</h3>
                <p className="text-gray-600 text-sm">Boost prospecting, improve close rates, and automate follow-ups</p>
              </Link>
              
              <Link href="/prompts/content-creators" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition group">
                <div className="text-2xl mb-3">📱</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">Content Creators</h3>
                <p className="text-gray-600 text-sm">Scale content production and grow your audience</p>
              </Link>
              
              <Link href="/prompts/small-business-owners" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition group">
                <div className="text-2xl mb-3">🏪</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600">Small Business</h3>
                <p className="text-gray-600 text-sm">Automate operations and boost local marketing</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to 10x Your Marketing Results?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get access to 100+ advanced marketing prompts, templates, and exclusive training
            </p>
            <a
              href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Upgrade to PromptWritingStudio Pro
            </a>
          </div>
        </section>
      </Layout>
    </>
  )
} 