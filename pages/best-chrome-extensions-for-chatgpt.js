import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useState } from 'react'

export default function BestChromeExtensionsForChatGPT() {
  const [expandedExtension, setExpandedExtension] = useState(null)

  const extensions = [
    {
      name: "Prompt Studio",
      category: "Prompt Optimization",
      rating: 4.9,
      users: "10,000+",
      price: "Free",
      description: "Professional AI prompt optimization with real-time analysis and business-focused templates.",
      features: [
        "Real-time prompt analysis and scoring",
        "One-click optimization for ChatGPT, Claude, and Gemini",
        "Business-focused prompt templates",
        "Works across all major AI platforms",
        "Free daily optimizations with premium options"
      ],
      pros: [
        "Designed for business professionals",
        "Works with multiple AI platforms",
        "Real-time feedback and scoring",
        "Free tier available"
      ],
      cons: [
        "Newer to market",
        "Premium features require subscription"
      ],
      bestFor: "Business professionals, content creators, and anyone wanting better AI results",
      highlight: true
    },
    {
      name: "WebChatGPT",
      category: "Web Access",
      rating: 4.5,
      users: "200,000+",
      price: "Free",
      description: "Adds internet access to ChatGPT for up-to-date information and web search capabilities.",
      features: [
        "Real-time web search integration",
        "Current information access",
        "Multiple search engines",
        "Customizable search parameters"
      ],
      bestFor: "Users needing current information and web search"
    },
    {
      name: "ChatGPT Writer",
      category: "Writing Assistant",
      rating: 4.6,
      users: "400,000+",
      price: "Free",
      description: "AI writing assistant for emails, messages, and content creation across websites.",
      features: [
        "Email and message composition",
        "Multi-language support",
        "Integration with Gmail and other platforms",
        "Privacy-focused design"
      ],
      bestFor: "Email writing and quick content generation"
    },
    {
      name: "Merlin",
      category: "All-in-One AI",
      rating: 4.3,
      users: "100,000+",
      price: "Freemium",
      description: "Comprehensive AI assistant with multiple AI models and productivity features.",
      features: [
        "Multiple AI model access",
        "YouTube and website summarization",
        "Email and social media integration",
        "Blog writing assistance"
      ],
      bestFor: "Users wanting multiple AI models in one extension"
    },
    {
      name: "ChatGPT for Google",
      category: "Search Enhancement",
      rating: 4.4,
      users: "300,000+",
      price: "Free",
      description: "Displays ChatGPT responses alongside Google search results for enhanced search experience.",
      features: [
        "Side-by-side search and AI results",
        "Multiple search engine support",
        "Customizable display options",
        "Dark mode support"
      ],
      bestFor: "Enhanced search experience with AI insights"
    }
  ]

  const categories = [
    {
      name: "Prompt Optimization",
      description: "Extensions that improve your prompts for better AI responses",
      icon: "🎯"
    },
    {
      name: "Productivity",
      description: "Tools that streamline your workflow with AI assistance",
      icon: "⚡"
    },
    {
      name: "Web Integration",
      description: "Extensions that connect AI with web browsing and search",
      icon: "🌐"
    },
    {
      name: "Writing Assistance",
      description: "AI-powered writing tools for emails, content, and communication",
      icon: "✍️"
    }
  ]

  return (
    <>
      <Head>
        <title>15 Best Chrome Extensions for ChatGPT in 2025 | Prompt Studio</title>
        <meta name="description" content="Discover the top Chrome extensions for ChatGPT that boost productivity, improve prompts, and enhance AI interactions. Compare features, pricing, and user reviews." />
        <meta name="keywords" content="ChatGPT Chrome extensions, AI productivity tools, prompt optimization, ChatGPT enhancements, AI browser extensions" />
        <meta property="og:title" content="15 Best Chrome Extensions for ChatGPT in 2025" />
        <meta property="og:description" content="Comprehensive guide to the most useful Chrome extensions for ChatGPT users. Find tools for prompt optimization, productivity, and enhanced AI interactions." />
        <meta property="og:url" content="https://promptwritingstudio.com/best-chrome-extensions-for-chatgpt" />
        <link rel="canonical" href="https://promptwritingstudio.com/best-chrome-extensions-for-chatgpt" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              15 Best Chrome Extensions for ChatGPT in 2025
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Supercharge your AI interactions with these powerful Chrome extensions. From prompt optimization to productivity tools, find the perfect extension for your needs.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <p className="text-lg font-semibold mb-2">🎯 Top Pick: Prompt Studio</p>
              <p className="text-sm text-blue-100">Professional prompt optimization with real-time analysis</p>
            </div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Extension Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="text-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Extension Reviews */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-12">Top ChatGPT Chrome Extensions</h2>
          
          <div className="space-y-8">
            {extensions.map((extension, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${extension.highlight ? 'ring-2 ring-blue-500' : ''}`}
              >
                {extension.highlight && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2">
                    <span className="font-semibold">⭐ Editor's Choice - Best Overall</span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">{extension.name}</h3>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {extension.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★★★★★</span>
                          <span>{extension.rating}</span>
                        </div>
                        <span>{extension.users} users</span>
                        <span className="font-semibold text-green-600">{extension.price}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{extension.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          {extension.features.map((feature, i) => (
                            <li key={i}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {expandedExtension === index && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Pros:</h4>
                            <ul className="list-disc list-inside text-green-700 space-y-1">
                              {extension.pros?.map((pro, i) => (
                                <li key={i}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                          
                          {extension.cons && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Cons:</h4>
                              <ul className="list-disc list-inside text-red-700 space-y-1">
                                {extension.cons.map((con, i) => (
                                  <li key={i}>{con}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Best For:</h4>
                            <p className="text-gray-700">{extension.bestFor}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="lg:w-48 flex flex-col gap-3">
                      {extension.highlight ? (
                        <a 
                          href="/chrome-extension"
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center"
                        >
                          Try Prompt Studio Free
                        </a>
                      ) : (
                        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                          Visit Chrome Store
                        </button>
                      )}
                      
                      <button 
                        onClick={() => setExpandedExtension(expandedExtension === index ? null : index)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {expandedExtension === index ? 'Show Less' : 'Read Full Review'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Why Prompt Studio Stands Out</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">🎯 Business-Focused Design</h3>
                <p className="text-gray-700 mb-4">
                  Unlike generic prompt tools, Prompt Studio is built specifically for business professionals who need reliable, consistent AI results for work.
                </p>
                
                <h3 className="text-xl font-semibold mb-4 text-blue-600">⚡ Real-Time Optimization</h3>
                <p className="text-gray-700 mb-4">
                  Get instant feedback on your prompts with our advanced scoring system that analyzes clarity, specificity, and effectiveness.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">🌐 Multi-Platform Support</h3>
                <p className="text-gray-700 mb-4">
                  Works seamlessly with ChatGPT, Claude, Gemini, and other AI platforms - no need for multiple extensions.
                </p>
                
                <h3 className="text-xl font-semibold mb-4 text-blue-600">📊 Built-in Analytics</h3>
                <p className="text-gray-700 mb-4">
                  Track your prompt performance and see how optimizations improve your AI interactions over time.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <a 
                href="/chrome-extension"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 inline-block"
              >
                Install Prompt Studio Free Today
              </a>
              <p className="text-sm text-gray-600 mt-2">Free daily optimizations • No credit card required</p>
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">How to Install Chrome Extensions for ChatGPT</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-semibold">Visit the Chrome Web Store</h3>
                  <p className="text-gray-700">Open Chrome and navigate to the Chrome Web Store or click extension links above.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-semibold">Click "Add to Chrome"</h3>
                  <p className="text-gray-700">Review permissions and click the blue "Add to Chrome" button to install.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-semibold">Pin to Toolbar</h3>
                  <p className="text-gray-700">Click the extensions icon and pin your new extension for easy access.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-semibold">Start Using</h3>
                  <p className="text-gray-700">Visit ChatGPT or your preferred AI platform and start using your new extension!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Are Chrome extensions for ChatGPT safe?</h3>
              <p className="text-gray-700">
                Reputable extensions from verified developers are generally safe. Always check reviews, permissions, and download from the official Chrome Web Store. Avoid extensions requesting excessive permissions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Which extension is best for business use?</h3>
              <p className="text-gray-700">
                Prompt Studio is specifically designed for business professionals, offering prompt optimization, multi-platform support, and business-focused templates that improve AI interactions for work scenarios.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Do I need multiple extensions?</h3>
              <p className="text-gray-700">
                It depends on your needs. A comprehensive extension like Prompt Studio can handle prompt optimization across multiple AI platforms, reducing the need for multiple tools.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-3">Will extensions slow down my browser?</h3>
              <p className="text-gray-700">
                Well-designed extensions have minimal impact on browser performance. If you notice slowdowns, try disabling extensions one by one to identify any problematic ones.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Optimize Your AI Interactions?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals using Prompt Studio to get better results from AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/chrome-extension"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Install Free Chrome Extension
              </a>
              <a 
                href="/ai-prompt-generator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try AI Prompt Generator
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 