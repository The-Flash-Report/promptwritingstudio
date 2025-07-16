import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { allAuthenticCreatorPrompts } from '../data/all-authentic-creator-prompts'
import { categories } from '../data/sample-prompts'
import EnhancedMeta from '../components/ui/EnhancedMeta'

export default function AIPromptExamples() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [showCustomizer, setShowCustomizer] = useState(null)
  const [customizedPrompts, setCustomizedPrompts] = useState({})
  const [promptRatings, setPromptRatings] = useState({})
  const [usageCount, setUsageCount] = useState(0)
  const [showTutorial, setShowTutorial] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Load saved data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('promptFavorites')
      const savedRatings = localStorage.getItem('promptRatings')
      const savedUsage = localStorage.getItem('promptUsageCount')
      
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
      if (savedRatings) setPromptRatings(JSON.parse(savedRatings))
      if (savedUsage) setUsageCount(parseInt(savedUsage))
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('promptFavorites', JSON.stringify(favorites))
    }
  }, [favorites])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('promptRatings', JSON.stringify(promptRatings))
    }
  }, [promptRatings])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('promptUsageCount', usageCount.toString())
    }
  }, [usageCount])

  // Filter prompts based on category and search
  const filteredPrompts = allAuthenticCreatorPrompts.filter(prompt => {
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Toggle favorite
  const toggleFavorite = (promptId) => {
    setFavorites(prev => 
      prev.includes(promptId) 
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId]
    )
  }

  // Rate prompt
  const ratePrompt = (promptId, rating) => {
    setPromptRatings(prev => ({ ...prev, [promptId]: rating }))
  }

  // Customize prompt
  const customizePrompt = (promptId, customizedText) => {
    setCustomizedPrompts(prev => ({ ...prev, [promptId]: customizedText }))
  }

  // Copy prompt to clipboard with tracking
  const copyToClipboard = async (prompt, id) => {
    try {
      const textToCopy = customizedPrompts[id] || prompt
      await navigator.clipboard.writeText(textToCopy)
      setCopiedId(id)
      setUsageCount(prev => prev + 1)
      setTimeout(() => setCopiedId(null), 2000)
      
      // Show email capture after first copy
      if (!emailSubmitted && !showEmailCapture) {
        setTimeout(() => setShowEmailCapture(true), 1000)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmailSubmitted(true)
    setShowEmailCapture(false)
    alert('Thanks! Check your email for the Complete Prompt Library with 500+ examples.')
  }

  // Tutorial steps
  const tutorialSteps = [
    { 
      title: "Welcome to AI Prompt Examples!", 
      content: "This interactive guide will show you how to get the most from our prompt collection." 
    },
    { 
      title: "Search & Filter", 
      content: "Use the search bar and category filter to find exactly what you need." 
    },
    { 
      title: "Customize Prompts", 
      content: "Click the edit button to customize prompts with your specific information." 
    },
    { 
      title: "Save Favorites", 
      content: "Heart prompts you love to save them for later." 
    },
    { 
      title: "Rate & Improve", 
      content: "Rate prompts to help us improve our collection." 
    }
  ]

  const pageTitle = "500+ Free AI Prompt Examples - ChatGPT, Claude & Gemini Templates"
  const pageDescription = "Get 500+ free AI prompt examples for ChatGPT, Claude, and Gemini. Copy-paste ready prompts for business, content creation, marketing, and more. Boost your AI results instantly."

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI Prompt Examples Collection",
    "description": pageDescription,
    "url": "https://promptwritingstudio.com/ai-prompt-examples",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allAuthenticCreatorPrompts.length,
      "itemListElement": allAuthenticCreatorPrompts.slice(0, 10).map((prompt, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": prompt.title,
        "description": prompt.description,
        "text": prompt.prompt.substring(0, 200) + "..."
      }))
    }
  }

  return (
    <>
      <EnhancedMeta 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://promptwritingstudio.com/ai-prompt-examples"
        structuredData={structuredData}
      />
      
      <Layout title={pageTitle} description={pageDescription}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Section with Interactive Elements */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                500+ Free AI Prompt Examples
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Copy-paste ready prompts for ChatGPT, Claude, Gemini, and other AI models. 
                Boost your results with proven prompts for business, content creation, and creativity.
              </p>
              
              {/* Progress & Tutorial Bar */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-8 max-w-2xl mx-auto">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">{usageCount}</span> prompts used • 
                    <span className="font-semibold text-purple-600"> {favorites.length}</span> favorites saved
                  </div>
                  <button
                    onClick={() => setShowTutorial(true)}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                  >
                    📚 Quick Tutorial
                  </button>
                </div>
                {usageCount > 0 && (
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((usageCount / 10) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
              
              {/* Quick stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{allAuthenticCreatorPrompts.length}+</div>
                  <div className="text-sm text-gray-600">Prompt Examples</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">6</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-600">Free to Use</div>
                </div>
              </div>
            </div>

            {/* Enhanced Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                {/* Search */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search prompts by keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                {/* Category Filter */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Categories ({allAuthenticCreatorPrompts.length})</option>
                    {categories.map(category => {
                      const count = allAuthenticCreatorPrompts.filter(p => p.category === category).length
                      return (
                        <option key={category} value={category}>
                          {category} ({count})
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              {/* Quick Filter Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === 'all' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    const favoritePrompts = allAuthenticCreatorPrompts.filter(p => favorites.includes(p.id))
                    // This would need more complex filtering logic
                  }}
                  className="px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                >
                  ❤️ Favorites ({favorites.length})
                </button>
                <button
                  onClick={() => {
                    // Filter highly rated prompts
                    const highRatedIds = Object.entries(promptRatings)
                      .filter(([id, rating]) => rating >= 4)
                      .map(([id]) => parseInt(id))
                  }}
                  className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
                >
                  ⭐ Top Rated
                </button>
              </div>
              
              {/* Results count */}
              <div className="text-sm text-gray-600">
                Showing {filteredPrompts.length} of {allAuthenticCreatorPrompts.length} prompts
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
            </div>

            {/* Enhanced Prompts Grid with More Interactivity */}
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredPrompts.map((prompt) => (
                <div key={prompt.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {prompt.title}
                        </h3>
                        <p className="text-blue-100 text-sm">
                          {prompt.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <button
                          onClick={() => toggleFavorite(prompt.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(prompt.id)
                              ? 'bg-pink-500 text-white'
                              : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                          }`}
                        >
                          ❤️
                        </button>
                        <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                          {prompt.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Prompt Content */}
                  <div className="p-6">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 relative">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                        {customizedPrompts[prompt.id] || prompt.prompt}
                      </pre>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => setShowCustomizer(showCustomizer === prompt.id ? null : prompt.id)}
                          className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-purple-600 transition-all"
                          title="Customize this prompt"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                            copiedId === prompt.id 
                              ? 'bg-green-500 text-white' 
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          {copiedId === prompt.id ? '✓ Copied!' : '📋 Copy'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Prompt Customizer */}
                    {showCustomizer === prompt.id && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-purple-800 mb-2">Customize Your Prompt</h4>
                        <textarea
                          value={customizedPrompts[prompt.id] || prompt.prompt}
                          onChange={(e) => customizePrompt(prompt.id, e.target.value)}
                          className="w-full h-32 p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm font-mono"
                          placeholder="Edit the prompt to match your specific needs..."
                        />
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-purple-600">
                            💡 Replace [bracketed text] with your specific information
                          </span>
                          <button
                            onClick={() => setShowCustomizer(null)}
                            className="bg-purple-500 text-white px-3 py-1 rounded text-xs hover:bg-purple-600"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Rating System */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-600">Rate this prompt:</span>
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={() => ratePrompt(prompt.id, star)}
                            className={`text-lg transition-colors ${
                              (promptRatings[prompt.id] || 0) >= star
                                ? 'text-yellow-400'
                                : 'text-gray-300 hover:text-yellow-300'
                            }`}
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {promptRatings[prompt.id] ? `You rated: ${promptRatings[prompt.id]}/5` : 'Not rated'}
                      </div>
                    </div>
                    
                    {/* Personalization Tip */}
                    {prompt.personalizationTip && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <span className="text-yellow-600">💡</span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              <strong>Pro Tip:</strong> {prompt.personalizationTip}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredPrompts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No prompts found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Show All Prompts
                </button>
              </div>
            )}

            {/* Calculator Cross-Links - Quick SEO Boost */}
            <section className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6">Calculate Your AI Savings</h3>
              <p className="text-center text-gray-600 mb-8">
                Ready to implement AI in your business? Use our calculators to see potential time and cost savings.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/calculators/content-creation-speed" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group">
                  <div className="text-2xl mb-3">📝</div>
                  <h4 className="font-semibold text-blue-600 group-hover:text-blue-700 mb-2">Content Creation Calculator</h4>
                  <p className="text-sm text-gray-600">Calculate time savings using AI for blogs, emails, and social media</p>
                </Link>
                <Link href="/calculators/ai-cost-comparison" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group">
                  <div className="text-2xl mb-3">💰</div>
                  <h4 className="font-semibold text-green-600 group-hover:text-green-700 mb-2">AI vs Human Cost</h4>
                  <p className="text-sm text-gray-600">Compare automation costs vs hiring employees or contractors</p>
                </Link>
                <Link href="/calculators/business-ai-readiness" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group">
                  <div className="text-2xl mb-3">📊</div>
                  <h4 className="font-semibold text-purple-600 group-hover:text-purple-700 mb-2">AI Readiness Assessment</h4>
                  <p className="text-sm text-gray-600">Evaluate your business readiness for AI implementation</p>
                </Link>
              </div>
              <div className="text-center mt-6">
                <Link href="/calculators" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  View All Calculators 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Want Even More AI Prompts?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Get our complete library of 1000+ prompts plus weekly updates with new examples.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-prompt-generator" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Try Our Prompt Generator
                </Link>
                <Link href="/pricing" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Get Full Course Access
                </Link>
              </div>
            </div>
          </div>

          {/* Interactive Tutorial Modal */}
          {showTutorial && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-bold mb-2">{tutorialSteps[currentStep].title}</h3>
                  <p className="text-gray-600 mb-6">
                    {tutorialSteps[currentStep].content}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                      disabled={currentStep === 0}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                    >
                      ← Previous
                    </button>
                    
                    <div className="flex gap-1">
                      {tutorialSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {currentStep < tutorialSteps.length - 1 ? (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowTutorial(false)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Get Started!
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Capture Modal */}
          {showEmailCapture && !emailSubmitted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold mb-2">Great Choice!</h3>
                  <p className="text-gray-600 mb-6">
                    Get our complete library of 1000+ AI prompts delivered to your inbox, plus weekly updates with fresh examples.
                  </p>
                  
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Get Complete Library
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEmailCapture(false)}
                        className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </form>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    No spam. Unsubscribe anytime. We respect your privacy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}
