import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import EnhancedMeta from '../components/ui/EnhancedMeta';

export default function ChromeExtension() {
  const router = useRouter();
  const [isInstalled, setIsInstalled] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const { source, welcome } = router.query;

  useEffect(() => {
    // Check if extension is installed (Chrome only)
    if (typeof window !== 'undefined' && window.chrome && window.chrome.runtime) {
      // Try to detect if extension is installed
      const extensionId = 'your-extension-id'; // Replace with actual ID
      try {
        chrome.runtime.sendMessage(extensionId, { ping: true }, (response) => {
          if (response && response.pong) {
            setIsInstalled(true);
          }
        });
      } catch (e) {
        // Extension not installed
      }
    }

    // Auto-show demo for new visitors
    if (!welcome && !localStorage.getItem('seenExtensionDemo')) {
      setTimeout(() => setShowDemo(true), 2000);
      localStorage.setItem('seenExtensionDemo', 'true');
    }
  }, [welcome]);

  const handleInstallClick = () => {
    // Track installation attempt
    if (typeof gtag !== 'undefined') {
      gtag('event', 'extension_install_clicked', {
        source: source || 'direct',
        page: 'chrome-extension'
      });
    }

    // Redirect to Chrome Web Store (when published)
    window.open('https://chrome.google.com/webstore/detail/prompt-studio/[extension-id]', '_blank');
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Prompt Studio - AI Prompt Optimizer",
    "description": "Chrome extension that instantly optimizes your AI prompts for ChatGPT, Claude, and Gemini. Get better results with professional prompt engineering.",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Chrome Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Prompt Writing Studio"
    },
    "screenshot": "https://promptwritingstudio.com/images/extension-screenshot.jpg",
    "downloadUrl": "https://chrome.google.com/webstore/detail/prompt-studio/[extension-id]"
  };

  return (
    <Layout>
      <EnhancedMeta 
        title="Prompt Studio Chrome Extension - Optimize AI Prompts Instantly"
        description="Free Chrome extension that analyzes and optimizes your AI prompts in real-time. Works with ChatGPT, Claude, and Gemini. Get better AI results instantly."
        canonical="https://promptwritingstudio.com/chrome-extension"
        schema={schema}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
                <span className="text-2xl mr-2">🚀</span>
                {welcome ? 'Welcome! Thanks for installing Prompt Studio' : 'New Chrome Extension'}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Optimize AI Prompts
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Instantly in Your Browser
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Free Chrome extension that analyzes and improves your prompts in real-time. 
                Works seamlessly with ChatGPT, Claude, and Gemini.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                {isInstalled ? (
                  <div className="flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-lg font-medium">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Extension Installed ✅
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleInstallClick}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      Install Free Extension
                    </button>
                    <button
                      onClick={() => setShowDemo(true)}
                      className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      Watch Demo
                    </button>
                  </>
                )}
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  100% Free
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  Privacy Focused
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  No API Keys Required
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-1">✓</span>
                  HTTPS Encrypted
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Professional prompt optimization in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Detect & Analyze</h3>
                <p className="text-gray-600">
                  Extension automatically detects when you're using ChatGPT, Claude, or Gemini and analyzes your prompt quality in real-time.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Optimize Instantly</h3>
                <p className="text-gray-600">
                  Get specific improvement suggestions based on professional prompt engineering principles and best practices.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Apply & Improve</h3>
                <p className="text-gray-600">
                  One-click application of optimizations directly into your AI chat. Get better results immediately.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Privacy Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Privacy-First Design
              </h2>
              <p className="text-xl text-gray-600">
                Unlike competitors, we handle security so you don't have to
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">No API Keys Required</h3>
                <p className="text-gray-600 mb-4">
                  Unlike other tools that require you to provide your own OpenAI or Claude API keys, 
                  we handle all API management on our secure servers.
                </p>
                <div className="bg-green-50 p-3 rounded text-sm text-green-800">
                  <strong>✅ Your advantage:</strong> Just install and use - no complex setup
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">Minimal Data Collection</h3>
                <p className="text-gray-600 mb-4">
                  We only process prompts when you click "optimize" and don't store them permanently. 
                  No browsing history, no personal data, no account required for basic use.
                </p>
                <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
                  <strong>✅ Privacy-first:</strong> Your data stays private and secure
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Security Comparison</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Feature</th>
                      <th className="text-center py-3 px-4 bg-yellow-50">Prompt Studio</th>
                      <th className="text-center py-3 px-4">Other Extensions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">API Key Management</td>
                      <td className="py-3 px-4 text-center bg-yellow-50">
                        <span className="text-green-600 font-semibold">✅ Server-side (secure)</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-red-600">❌ User provides keys</span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Setup Complexity</td>
                      <td className="py-3 px-4 text-center bg-yellow-50">
                        <span className="text-green-600 font-semibold">✅ Zero setup</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-red-600">❌ Complex configuration</span>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Data Storage</td>
                      <td className="py-3 px-4 text-center bg-yellow-50">
                        <span className="text-green-600 font-semibold">✅ Not permanently stored</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-orange-600">⚠️ Varies by provider</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Cost to User</td>
                      <td className="py-3 px-4 text-center bg-yellow-50">
                        <span className="text-green-600 font-semibold">✅ Fixed pricing</span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-red-600">❌ Tool + API costs</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Section */}
        {showDemo && (
          <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Extension Demo</h3>
                  <button
                    onClick={() => setShowDemo(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-2">Before Optimization (Score: 4/10)</h4>
                    <div className="bg-white p-4 rounded border text-gray-700">
                      "Write me a blog post about AI"
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                      <span className="text-lg mr-2">🚀</span>
                      Prompt Studio Analysis
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-2">After Optimization (Score: 9/10)</h4>
                    <div className="bg-white p-4 rounded border text-gray-700">
                      "Write a comprehensive 1,500-word blog post about the practical applications of AI in small businesses. 
                      Target audience: Small business owners with limited technical knowledge. 
                      Tone: Professional yet accessible. 
                      Include: 3 specific AI tools, implementation costs, and actionable next steps. 
                      Format: Introduction, 3 main sections, conclusion with call-to-action."
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 p-4 rounded">
                      <strong>Improvements Made:</strong>
                      <ul className="mt-2 space-y-1 text-gray-700">
                        <li>• Added specific word count</li>
                        <li>• Defined target audience</li>
                        <li>• Specified tone and style</li>
                        <li>• Included content requirements</li>
                        <li>• Requested clear structure</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-4 rounded">
                      <strong>Better Results:</strong>
                      <ul className="mt-2 space-y-1 text-gray-700">
                        <li>• More targeted content</li>
                        <li>• Appropriate length</li>
                        <li>• Actionable advice</li>
                        <li>• Professional structure</li>
                        <li>• Ready to publish</li>
                      </ul>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleInstallClick}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                      Install Extension Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-600">
                Start free, upgrade when you need more
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Tier */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Free</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-4">$0</div>
                  <p className="text-gray-600 mb-6">Perfect for trying out prompt optimization</p>
                  
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      3 optimizations per day
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Basic scoring system
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Works with all AI platforms
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      One-click optimization
                    </li>
                  </ul>
                </div>
              </div>

              {/* Premium Tier */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <div className="text-3xl font-bold mb-4">
                  <span className="line-through text-sm opacity-75">$12.00</span>
                  <span className="block">$9.97/mo</span>
                </div>
                <p className="text-blue-100 mb-6">
                  For professionals who rely on AI daily
                  <span className="block text-xs mt-1 text-yellow-300">20% better than competitors</span>
                </p>
                  
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Unlimited optimizations
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Advanced analytics
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Research-backed suggestions
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Prompt templates library
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-400 mr-2">✓</span>
                      Priority support
                    </li>
                  </ul>
                  
                  <button className="w-full bg-white text-purple-600 font-semibold py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Start Free Trial
                  </button>
                </div>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-4">$29/mo</div>
                  <p className="text-gray-600 mb-6">For teams and businesses</p>
                  
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Everything in Premium
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Team management
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      Custom prompt templates
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      API access
                    </li>
                    <li className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      White-label options
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your AI Prompts?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of professionals getting better AI results with optimized prompts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleInstallClick}
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                <span className="text-2xl mr-2">🚀</span>
                Install Free Extension
              </button>
              <a
                href="/ai-prompt-examples"
                className="inline-flex items-center px-6 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                Browse Prompt Examples
              </a>
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Installation Instructions</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">For Chrome Users</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                    Click "Install Free Extension" above
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                    You'll be redirected to Chrome Web Store
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                    Click "Add to Chrome" button
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
                    Confirm by clicking "Add extension"
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">5</span>
                    Visit ChatGPT, Claude, or Gemini to start optimizing!
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</span>
                    Look for the 🚀 button on AI platforms
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</span>
                    Type or paste your prompt
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</span>
                    Click "Analyze & Optimize"
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</span>
                    Review suggestions and score
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3">5</span>
                    Apply improvements with one click
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 