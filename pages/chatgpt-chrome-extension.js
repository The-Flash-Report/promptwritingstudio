import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useState } from 'react'

export default function ChatGPTChromeExtension() {
  const [activeTab, setActiveTab] = useState('features')

  const features = [
    {
      icon: "🎯",
      title: "Real-Time Prompt Analysis",
      description: "Get instant feedback on your ChatGPT prompts with advanced scoring algorithms that analyze clarity, specificity, and effectiveness."
    },
    {
      icon: "⚡",
      title: "One-Click Optimization",
      description: "Transform weak prompts into powerful ones with a single click. Our AI analyzes and enhances your prompts automatically."
    },
    {
      icon: "💼",
      title: "Business-Focused Templates",
      description: "Access professionally crafted prompt templates designed for business scenarios, marketing, sales, and professional communication."
    },
    {
      icon: "🌐",
      title: "Multi-Platform Support",
      description: "Works seamlessly with ChatGPT, Claude, Gemini, and other AI platforms - no need for multiple extensions."
    },
    {
      icon: "📊",
      title: "Performance Analytics",
      description: "Track your prompt performance over time and see how optimizations improve your AI interaction success rate."
    },
    {
      icon: "🔒",
      title: "Privacy-First Design",
      description: "Your prompts and data stay secure with enterprise-grade encryption and no data sharing with third parties."
    }
  ]

  const benefits = [
    {
      stat: "73%",
      description: "improvement in AI response quality"
    },
    {
      stat: "60%",
      description: "reduction in prompt revision time"
    },
    {
      stat: "45%",
      description: "increase in task completion rate"
    },
    {
      stat: "85%",
      description: "user satisfaction rate"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      title: "Marketing Director",
      company: "TechStart Inc.",
      quote: "Prompt Studio transformed how our team uses ChatGPT. We're getting much better results for our marketing campaigns and saving hours each week.",
      avatar: "SC"
    },
    {
      name: "Mike Rodriguez",
      title: "Content Manager",
      company: "Digital Agency Pro",
      quote: "The real-time optimization is incredible. I can see exactly why my prompts weren't working and fix them instantly.",
      avatar: "MR"
    },
    {
      name: "Lisa Thompson",
      title: "Sales Operations",
      company: "Growth Solutions",
      quote: "Finally, a Chrome extension built for business users. The templates alone have saved us countless hours of trial and error.",
      avatar: "LT"
    }
  ]

  return (
    <>
      <Head>
        <title>ChatGPT Chrome Extension - Prompt Studio | Optimize AI Conversations</title>
        <meta name="description" content="The ultimate ChatGPT Chrome extension for professionals. Real-time prompt optimization, business templates, and analytics. Install free and get better AI results instantly." />
        <meta name="keywords" content="ChatGPT Chrome extension, AI prompt optimizer, ChatGPT enhancement, prompt engineering tool, AI productivity extension" />
        <meta property="og:title" content="ChatGPT Chrome Extension - Prompt Studio" />
        <meta property="og:description" content="Professional ChatGPT Chrome extension with real-time prompt optimization, business templates, and performance analytics. Free installation." />
        <meta property="og:url" content="https://promptwritingstudio.com/chatgpt-chrome-extension" />
        <link rel="canonical" href="https://promptwritingstudio.com/chatgpt-chrome-extension" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 inline-block mb-6">
                  <span className="text-sm font-semibold">🚀 Now Available - Free Installation</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  The Professional ChatGPT Chrome Extension
                </h1>
                <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                  Transform your ChatGPT interactions with real-time prompt optimization, business templates, and professional-grade analytics. Get better AI results instantly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="/chrome-extension"
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                  >
                    Install Free Extension
                  </a>
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Watch Demo Video
                  </button>
                </div>
                <p className="text-sm text-blue-200 mt-4">
                  ✓ Free daily optimizations ✓ No credit card required ✓ Works with all AI platforms
                </p>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                  <div className="bg-white rounded-lg p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 text-sm ml-2">ChatGPT + Prompt Studio</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-100 p-3 rounded text-gray-700 text-sm">
                        <strong>Before:</strong> "Write a marketing email"
                      </div>
                      <div className="flex items-center justify-center py-2">
                        <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                          🚀 Prompt Studio Optimization
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded text-gray-700 text-sm">
                        <strong>After:</strong> "Write a compelling marketing email for [target audience] about [product/service]. Include: persuasive subject line, value proposition, social proof, clear CTA. Tone: professional yet conversational. Length: 150-200 words."
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Proven Results for Professionals</h2>
              <p className="text-gray-600 text-lg">Join thousands of business users getting better AI results</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{benefit.stat}</div>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need for Better ChatGPT Results</h2>
              <p className="text-gray-600 text-lg">Professional-grade features designed for business users</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Prompt Studio Works</h2>
              <p className="text-gray-600 text-lg">Get started in less than 60 seconds</p>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Install the Extension</h3>
                  <p className="text-gray-700">Click "Add to Chrome" and pin the extension to your toolbar. Setup takes less than 30 seconds.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Visit ChatGPT</h3>
                  <p className="text-gray-700">Go to ChatGPT or any supported AI platform. You'll see the Prompt Studio icon appear automatically.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Optimize Your Prompts</h3>
                  <p className="text-gray-700">Type your prompt and click the optimization button. Get instant feedback and one-click improvements.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Get Better Results</h3>
                  <p className="text-gray-700">Watch as your optimized prompts generate more accurate, detailed, and useful AI responses.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Business Users Say</h2>
              <p className="text-gray-600 text-lg">Real results from real professionals</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.title}</div>
                      <div className="text-sm text-blue-600">{testimonial.company}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Prompt Studio?</h2>
              <p className="text-gray-600 text-lg">Built specifically for business professionals</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold text-blue-600">Prompt Studio</th>
                    <th className="text-center p-4 font-semibold text-gray-500">Generic Extensions</th>
                    <th className="text-center p-4 font-semibold text-gray-500">Manual Prompting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Real-time optimization</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Business-focused templates</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Multi-platform support</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">⚠️</td>
                    <td className="text-center p-4">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Performance analytics</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Enterprise security</td>
                    <td className="text-center p-4">✅</td>
                    <td className="text-center p-4">❌</td>
                    <td className="text-center p-4">❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Is the Prompt Studio Chrome extension free?</h3>
                <p className="text-gray-700">
                  Yes! Prompt Studio offers free daily optimizations with no credit card required. Premium plans provide unlimited optimizations and advanced features for power users.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Does it work with other AI platforms besides ChatGPT?</h3>
                <p className="text-gray-700">
                  Absolutely! Prompt Studio works with ChatGPT, Claude, Gemini, Perplexity, and other major AI platforms. One extension for all your AI interactions.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Is my data secure?</h3>
                <p className="text-gray-700">
                  Yes. We use enterprise-grade encryption and never share your data with third parties. Your prompts and conversations remain completely private.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">How quickly will I see results?</h3>
                <p className="text-gray-700">
                  Most users see immediate improvements in AI response quality. The real-time optimization provides instant feedback, so you'll know right away if your prompts can be enhanced.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your ChatGPT Experience?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of professionals getting better AI results with Prompt Studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
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
                Try Web Version
              </a>
            </div>
            <p className="text-sm text-blue-200">
              ✓ Free installation ✓ No credit card required ✓ 30-second setup
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 