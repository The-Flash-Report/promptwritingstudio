import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useState } from 'react'

export default function AIPromptEngineeringTools() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedTool, setSelectedTool] = useState(null)

  const categories = [
    { id: 'all', name: 'All Tools', count: 15 },
    { id: 'optimization', name: 'Optimization', count: 5 },
    { id: 'templates', name: 'Templates', count: 4 },
    { id: 'analytics', name: 'Analytics', count: 3 },
    { id: 'education', name: 'Education', count: 3 }
  ]

  const tools = [
    {
      id: 'prompt-studio',
      name: 'Prompt Studio',
      category: 'optimization',
      type: 'Chrome Extension + Web Platform',
      pricing: 'Free + Premium',
      rating: 4.9,
      users: '10,000+',
      description: 'Professional AI prompt optimization platform with real-time analysis, business templates, and multi-platform support.',
      features: [
        'Real-time prompt scoring and optimization',
        'Business-focused templates and frameworks',
        'Multi-platform support (ChatGPT, Claude, Gemini)',
        'Performance analytics and tracking',
        'Chrome extension for seamless integration',
        'Free daily optimizations'
      ],
      pros: [
        'Designed for business professionals',
        'Works across multiple AI platforms',
        'Real-time feedback and scoring',
        'Professional template library',
        'Free tier available'
      ],
      cons: [
        'Premium features require subscription',
        'Newer platform (launched 2024)'
      ],
      bestFor: 'Business professionals, content creators, marketing teams',
      highlight: true,
      useCases: ['Business communications', 'Content marketing', 'Customer service', 'Sales outreach']
    },
    {
      id: 'promptperfect',
      name: 'PromptPerfect',
      category: 'optimization',
      type: 'Web Platform',
      pricing: '$9.99/month',
      rating: 4.3,
      users: '50,000+',
      description: 'Multi-model prompt optimizer supporting various AI platforms with A/B testing capabilities.',
      features: [
        'Multi-model optimization',
        'A/B testing for prompts',
        'Performance metrics',
        'Template library'
      ],
      bestFor: 'Advanced prompt engineers and researchers',
      useCases: ['Research', 'Advanced optimization', 'Model comparison']
    },
    {
      id: 'promptbase',
      name: 'PromptBase',
      category: 'templates',
      type: 'Marketplace',
      pricing: 'Pay per prompt',
      rating: 4.5,
      users: '300,000+',
      description: 'Largest marketplace for buying and selling AI prompts with 200k+ templates.',
      features: [
        'Massive prompt library',
        'Community-driven content',
        'Prompt marketplace',
        'Multiple AI model support'
      ],
      bestFor: 'Finding specific prompts and selling custom prompts',
      useCases: ['Prompt discovery', 'Template purchasing', 'Prompt selling']
    },
    {
      id: 'learn-prompting',
      name: 'Learn Prompting',
      category: 'education',
      type: 'Educational Platform',
      pricing: 'Free + $21/month',
      rating: 4.7,
      users: '48,000+',
      description: 'Comprehensive prompt engineering education platform with courses and certifications.',
      features: [
        'Structured learning courses',
        'Certification programs',
        'Expert-led training',
        'Community support'
      ],
      bestFor: 'Learning prompt engineering fundamentals',
      useCases: ['Education', 'Skill development', 'Certification']
    },
    {
      id: 'jasper',
      name: 'Jasper',
      category: 'templates',
      type: 'Enterprise Platform',
      pricing: '$39/month+',
      rating: 4.4,
      users: '100,000+',
      description: 'Enterprise AI writing platform with advanced prompt templates and brand voice.',
      features: [
        'Brand voice training',
        'Enterprise templates',
        'Team collaboration',
        'Content workflows'
      ],
      bestFor: 'Large teams and enterprises',
      useCases: ['Enterprise content', 'Brand consistency', 'Team workflows']
    },
    {
      id: 'anthropic-console',
      name: 'Anthropic Console',
      category: 'analytics',
      type: 'Developer Platform',
      pricing: 'Usage-based',
      rating: 4.6,
      users: '25,000+',
      description: 'Official Claude API platform with prompt testing and optimization tools.',
      features: [
        'Claude API access',
        'Prompt testing environment',
        'Usage analytics',
        'Model fine-tuning'
      ],
      bestFor: 'Developers working with Claude',
      useCases: ['API development', 'Model testing', 'Technical integration']
    }
  ]

  const toolTypes = [
    {
      type: 'Optimization Tools',
      description: 'AI-powered tools that analyze and improve your prompts in real-time',
      icon: '🎯',
      examples: ['Prompt Studio', 'PromptPerfect', 'SmartGPT'],
      benefits: ['Better response quality', 'Time savings', 'Consistent results']
    },
    {
      type: 'Template Libraries',
      description: 'Collections of pre-built, tested prompts for various use cases',
      icon: '📚',
      examples: ['PromptBase', 'Jasper Templates', 'ChatGPT Prompt Library'],
      benefits: ['Quick start', 'Proven formats', 'Industry-specific content']
    },
    {
      type: 'Analytics Platforms',
      description: 'Tools for measuring and tracking prompt performance over time',
      icon: '📊',
      examples: ['Anthropic Console', 'OpenAI Playground', 'Custom dashboards'],
      benefits: ['Performance insights', 'ROI measurement', 'Optimization guidance']
    },
    {
      type: 'Educational Resources',
      description: 'Courses, guides, and training materials for learning prompt engineering',
      icon: '🎓',
      examples: ['Learn Prompting', 'Google AI Courses', 'Prompt Engineering guides'],
      benefits: ['Skill development', 'Best practices', 'Certification']
    }
  ]

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory)

  const promptEngineeringProcess = [
    {
      step: 1,
      title: 'Define Objectives',
      description: 'Clearly outline what you want to achieve with your AI interaction',
      tips: ['Be specific about desired outcomes', 'Consider your audience', 'Set measurable goals']
    },
    {
      step: 2,
      title: 'Choose the Right Tool',
      description: 'Select prompt engineering tools that match your use case and skill level',
      tips: ['Consider your budget', 'Evaluate feature requirements', 'Check platform compatibility']
    },
    {
      step: 3,
      title: 'Create and Test',
      description: 'Develop prompts using frameworks and test them across different scenarios',
      tips: ['Use proven frameworks', 'Test with various inputs', 'Measure response quality']
    },
    {
      step: 4,
      title: 'Analyze and Improve',
      description: 'Use analytics to understand performance and continuously optimize',
      tips: ['Track key metrics', 'A/B test variations', 'Iterate based on results']
    }
  ]

  return (
    <>
      <Head>
        <title>15 Best AI Prompt Engineering Tools in 2025 | Complete Guide</title>
        <meta name="description" content="Discover the top AI prompt engineering tools for 2025. Compare features, pricing, and use cases of optimization tools, templates, and analytics platforms." />
        <meta name="keywords" content="AI prompt engineering tools, prompt optimization software, ChatGPT tools, AI prompt generators, prompt engineering platforms" />
        <meta property="og:title" content="15 Best AI Prompt Engineering Tools in 2025" />
        <meta property="og:description" content="Comprehensive guide to AI prompt engineering tools. Find the perfect platform for optimization, templates, analytics, and education." />
        <meta property="og:url" content="https://promptwritingstudio.com/ai-prompt-engineering-tools" />
        <link rel="canonical" href="https://promptwritingstudio.com/ai-prompt-engineering-tools" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                15 Best AI Prompt Engineering Tools in 2025
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover the most powerful tools for optimizing AI prompts, from real-time analyzers to comprehensive template libraries and analytics platforms.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
                <p className="text-lg font-semibold mb-2">🚀 Market Leader: Prompt Studio</p>
                <p className="text-sm text-blue-100">Professional prompt optimization with business-focused features</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <p className="text-gray-700">Tools reviewed</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">500K+</div>
                <p className="text-gray-700">Active users</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                <p className="text-gray-700">Improvement in results</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
                <p className="text-gray-700">Time saved</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Types Overview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Types of Prompt Engineering Tools</h2>
              <p className="text-gray-600 text-lg">Understanding the different categories and their benefits</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {toolTypes.map((toolType, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{toolType.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">{toolType.type}</h3>
                      <p className="text-gray-700 mb-4">{toolType.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Popular Examples:</h4>
                        <div className="flex flex-wrap gap-2">
                          {toolType.examples.map((example, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Key Benefits:</h4>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {toolType.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tool Categories Filter */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Compare AI Prompt Engineering Tools</h2>
              <p className="text-gray-600 text-lg">Filter by category to find the perfect tool for your needs</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Tools Grid */}
            <div className="space-y-6">
              {filteredTools.map(tool => (
                <div 
                  key={tool.id}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden border ${tool.highlight ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  {tool.highlight && (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2">
                      <span className="font-semibold">⭐ Recommended - Best for Business</span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl font-bold text-gray-900">{tool.name}</h3>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {tool.type}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★★★★★</span>
                            <span>{tool.rating}</span>
                          </div>
                          <span>{tool.users} users</span>
                          <span className="font-semibold text-green-600">{tool.pricing}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{tool.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {tool.features.map((feature, i) => (
                              <li key={i}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        
                        {selectedTool === tool.id && (
                          <div className="space-y-4">
                            {tool.pros && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Pros:</h4>
                                <ul className="list-disc list-inside text-green-700 space-y-1">
                                  {tool.pros.map((pro, i) => (
                                    <li key={i}>{pro}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {tool.cons && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Cons:</h4>
                                <ul className="list-disc list-inside text-red-700 space-y-1">
                                  {tool.cons.map((con, i) => (
                                    <li key={i}>{con}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                              <p className="text-gray-700">{tool.bestFor}</p>
                            </div>
                            
                            {tool.useCases && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Common Use Cases:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {tool.useCases.map((useCase, i) => (
                                    <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                      {useCase}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="lg:w-48 flex flex-col gap-3">
                        {tool.highlight ? (
                          <a 
                            href="/chrome-extension"
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center"
                          >
                            Try Free
                          </a>
                        ) : (
                          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                            Visit Website
                          </button>
                        )}
                        
                        <button 
                          onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {selectedTool === tool.id ? 'Show Less' : 'Full Review'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Guide */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Your Prompt Engineering Journey</h2>
              <p className="text-gray-600 text-lg">Step-by-step process for getting started with prompt engineering tools</p>
            </div>

            <div className="space-y-8">
              {promptEngineeringProcess.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-700 mb-3">{step.description}</p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Pro Tips:</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        {step.tips.map((tip, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tool Selection Guide */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Choose the Right Tool</h2>
              <p className="text-gray-600 text-lg">Consider these factors when selecting prompt engineering tools</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl mb-4">💼</div>
                <h3 className="text-xl font-semibold mb-3">Your Use Case</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Business communications → Prompt Studio</li>
                  <li>• Academic research → PromptPerfect</li>
                  <li>• Content creation → Jasper</li>
                  <li>• Learning → Learn Prompting</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3">Budget</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Free tools: Prompt Studio (basic)</li>
                  <li>• Under $15/month: Promptimize AI</li>
                  <li>• $15-30/month: Learn Prompting</li>
                  <li>• Enterprise: Jasper, Custom solutions</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">Experience Level</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Beginner: Prompt Studio</li>
                  <li>• Intermediate: PromptBase</li>
                  <li>• Advanced: PromptPerfect</li>
                  <li>• Expert: Custom solutions</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl mb-4">🌐</div>
                <h3 className="text-xl font-semibold mb-3">Platform Needs</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Multi-platform: Prompt Studio</li>
                  <li>• ChatGPT only: SmartGPT</li>
                  <li>• Claude focus: Anthropic Console</li>
                  <li>• Custom models: API solutions</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl mb-4">👥</div>
                <h3 className="text-xl font-semibold mb-3">Team Size</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Solo: Prompt Studio, PromptBase</li>
                  <li>• Small team: Promptimize AI</li>
                  <li>• Large team: Jasper</li>
                  <li>• Enterprise: Custom solutions</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="text-2xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-3">Analytics Needs</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Basic metrics: Most tools</li>
                  <li>• Advanced analytics: Prompt Studio</li>
                  <li>• A/B testing: PromptPerfect</li>
                  <li>• Custom tracking: API solutions</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Prompt Studio */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Why Prompt Studio Leads the Market</h2>
            <p className="text-lg text-gray-700 mb-8">
              The only prompt engineering platform built specifically for business professionals
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">🎯 Business-First Design</h3>
                <p className="text-gray-700 mb-4">
                  Unlike generic tools, Prompt Studio is built for business users with templates, analytics, and features that matter for professional work.
                </p>
                
                <h3 className="text-xl font-semibold mb-4 text-blue-600">⚡ Real-Time Optimization</h3>
                <p className="text-gray-700">
                  Get instant feedback on your prompts with advanced scoring algorithms that analyze clarity, specificity, and business effectiveness.
                </p>
              </div>
              
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">🌐 Multi-Platform Support</h3>
                <p className="text-gray-700 mb-4">
                  Works seamlessly with ChatGPT, Claude, Gemini, and other AI platforms. One tool for all your AI interactions.
                </p>
                
                <h3 className="text-xl font-semibold mb-4 text-blue-600">📊 Professional Analytics</h3>
                <p className="text-gray-700">
                  Track your prompt performance, measure ROI, and optimize your AI strategy with comprehensive analytics and reporting.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <a 
                href="/chrome-extension"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 inline-block"
              >
                Try Prompt Studio Free
              </a>
              <p className="text-sm text-gray-600 mt-2">Free daily optimizations • No credit card required</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">What are AI prompt engineering tools?</h3>
                <p className="text-gray-700">
                  These are software platforms and services designed to help users create, optimize, and manage AI prompts more effectively. They include optimization engines, template libraries, analytics platforms, and educational resources.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Do I need special technical skills?</h3>
                <p className="text-gray-700">
                  Most modern prompt engineering tools are designed for non-technical users. Tools like Prompt Studio offer intuitive interfaces that anyone can use, while more advanced platforms may require some technical knowledge.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Which tool is best for beginners?</h3>
                <p className="text-gray-700">
                  Prompt Studio is ideal for beginners because it provides real-time guidance, has a user-friendly interface, offers free tiers, and includes business-focused templates that are easy to understand and apply.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">How much should I expect to pay?</h3>
                <p className="text-gray-700">
                  Pricing varies widely: free tools like Prompt Studio (basic), $10-25/month for most platforms, and $50+ for enterprise solutions. Many tools offer free trials or freemium models to try before purchasing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Master AI Prompt Engineering?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Start with the leading prompt optimization platform designed for business professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/chrome-extension"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Free with Chrome Extension
              </a>
              <a 
                href="/ai-prompt-generator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Web Platform
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 