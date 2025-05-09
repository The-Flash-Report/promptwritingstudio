import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Script from 'next/script'
import { allAuthenticCreatorPrompts } from '../data/all-authentic-creator-prompts'

export default function AIPromptExamples() {
  // Define categories directly in the component
  const categories = [
    "Content Ideation",
    "Writing Assistance",
    "Audience Engagement",
    "Branding & Messaging",
    "Sales & Nurture",
    "Repurposing & Efficiency"
  ]
  
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPrompts, setFilteredPrompts] = useState([])
  const [copiedId, setCopiedId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const promptsPerPage = 10
  
  // Initialize filtered prompts
  useEffect(() => {
    setFilteredPrompts(allAuthenticCreatorPrompts)
  }, [])
  
  // Filter prompts when categories or search term changes
  useEffect(() => {
    let filtered = allAuthenticCreatorPrompts
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(prompt => selectedCategories.includes(prompt.category))
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(prompt => 
        prompt.title.toLowerCase().includes(term) || 
        prompt.description.toLowerCase().includes(term) ||
        prompt.prompt.toLowerCase().includes(term) ||
        prompt.category.toLowerCase().includes(term)
      )
    }
    
    setFilteredPrompts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedCategories, searchTerm])
  
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  // Calculate pagination
  const indexOfLastPrompt = currentPage * promptsPerPage
  const indexOfFirstPrompt = indexOfLastPrompt - promptsPerPage
  const currentPrompts = filteredPrompts.slice(indexOfFirstPrompt, indexOfLastPrompt)
  const totalPages = Math.ceil(filteredPrompts.length / promptsPerPage)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
  return (
    <Layout
      title="101 AI Prompt Examples & Generator for Content Creators | PromptWritingStudio"
      description="Browse our collection of 101 AI prompt examples and templates for ChatGPT, Claude, and other AI assistants. Find, customize, and use proven prompts to create authentic content that maintains your unique voice."
    >
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              101 AI Prompt Examples & Generator for ChatGPT, Claude & Gemini
            </h1>
            <p className="text-xl mb-8">
              Browse our collection of proven AI prompts for content creators, marketers, and business owners. Find, customize, and use expert-crafted prompts that maintain your authentic voice while saving hours of writing time.
            </p>
            <a href="https://courses.becomeawritertoday.com/purchase?product_id=6253746" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block" target="_blank" rel="noopener noreferrer">
              Join PromptWritingStudio From $25/month
            </a>
            <div className="mt-3">
              <a href="#ai-prompt-examples" className="text-white underline hover:text-[#FFDE59] transition-colors duration-200">
                Or browse free examples below
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction Section - Updated with new content */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">The Ultimate AI Prompt Generator & Examples Collection</h2>
            
            <div className="text-lg text-gray-700 space-y-6">
              <p>
                As a creator, your voice is your most valuable asset. Yet the pressure to consistently produce high-quality content can be overwhelming. AI tools like ChatGPT, Claude, and Gemini promise to help—but how do you use them without losing what makes your content uniquely yours?
              </p>
              
              <p>
                The secret is becoming what I call a "Chef Idea Officer" instead of a "Word Wrangler." This means:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Focus on generating ideas, insights, and direction (the high-value work only YOU can do)</li>
                <li>Let AI handle the mechanical aspects of writing (the time-consuming part)</li>
                <li>Maintain complete creative control over your content</li>
              </ul>
              
              <p>
                This collection of 101 AI prompt examples is designed specifically for non-fiction writers, business owners, content marketers, coaches, and consultants who want to leverage AI writing assistants while preserving their authentic voice.
              </p>
            </div>
            
            <div className="mt-8 bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">What Makes a Good AI Prompt?</h3>
              
              <p className="mb-4">The best AI prompts for content creation include:</p>
              <ul className="list-disc pl-6 space-y-1 mb-6">
                <li><strong>Clear context</strong> about who you are and your expertise</li>
                <li><strong>Specific instructions</strong> about the content format and structure</li>
                <li><strong>Voice guidance</strong> that captures your unique communication style</li>
                <li><strong>Examples</strong> of phrases or terminology you typically use</li>
                <li><strong>Audience information</strong> to ensure relevance to your readers</li>
              </ul>
            </div>
            
            <div className="mt-8 bg-gray-50 p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">How to Use This AI Prompt Generator</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-3">Each prompt example includes:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li className="text-gray-800">The purpose of the prompt</li>
                    <li className="text-gray-800">A template you can customize</li>
                    <li className="text-gray-800">Personalization tips to make it sound like you</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-3">To get the most value:</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li className="text-gray-800">Copy the prompt</li>
                    <li className="text-gray-800">Replace the [brackets] with your specific information</li>
                    <li className="text-gray-800">Add your unique phrases, terminology, and tone preferences</li>
                    <li className="text-gray-800">Paste it into ChatGPT, Claude, or Gemini</li>
                    <li className="text-gray-800">Refine the output to match your voice perfectly</li>
                  </ol>
                </div>
              </div>
              
              {/* Call-to-action removed as requested */}
            </div>
          </div>
        </div>
      </section>
      
      {/* Prompt Filtering Section */}
      <section id="ai-prompt-examples" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Browse Our Collection of 101 AI Prompt Examples</h2>
            <p className="text-center mb-6 text-gray-600">We're showing a sample of our prompt collection below. Use the category filters to explore specific prompt types or search for keywords to find exactly what you need.</p>
            
            {/* Table of Contents */}
            <div className="mb-12 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-center">Quick Navigation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-3 text-gray-800 border-b pb-2">AI Prompt Categories</h4>
                  <ul className="space-y-2 mt-3">
                    {categories.map(category => (
                      <li key={category}>
                        <a 
                          href={`#category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center text-gray-700 hover:text-[#FFDE59] transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          {category} Prompts
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-bold mb-3 text-gray-800 border-b pb-2">Popular AI Assistants</h4>
                    <ul className="space-y-2 mt-3">
                      <li>
                        <a href="#chatgpt-prompts" className="flex items-center text-gray-700 hover:text-[#FFDE59] transition-colors duration-200">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          ChatGPT Prompts
                        </a>
                      </li>
                      <li>
                        <a href="#claude-prompts" className="flex items-center text-gray-700 hover:text-[#FFDE59] transition-colors duration-200">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          Claude Prompts
                        </a>
                      </li>
                      <li>
                        <a href="#gemini-prompts" className="flex items-center text-gray-700 hover:text-[#FFDE59] transition-colors duration-200">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          Gemini Prompts
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-3 text-gray-800 border-b pb-2">Resources</h4>
                    <ul className="space-y-2 mt-3">
                      <li>
                        <a href="#what-is-prompt-engineering" className="flex items-center text-gray-700 hover:text-[#FFDE59] transition-colors duration-200">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          What is Prompt Engineering?
                        </a>
                      </li>
                      <li>
                        <a href="#ai-prompt-templates" className="flex items-center text-gray-700 hover:text-[#FFDE59] transition-colors duration-200">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          AI Prompt Templates
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Search AI Prompt Examples</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by keyword, title, or category..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">Filter by Category:</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategories.length === 0
                        ? 'bg-[#FFDE59] text-[#1A1A1A]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategories([])}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategories.includes(category)
                          ? 'bg-[#FFDE59] text-[#1A1A1A]'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        if (selectedCategories.includes(category)) {
                          setSelectedCategories(selectedCategories.filter(c => c !== category))
                        } else {
                          setSelectedCategories([...selectedCategories, category])
                        }
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results summary */}
            <div className="mb-6 text-gray-600">
              Showing {currentPrompts.length > 0 ? `${indexOfFirstPrompt + 1}-${Math.min(indexOfLastPrompt, filteredPrompts.length)}` : '0'} of {filteredPrompts.length} prompts
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedCategories.length > 0 && ` in ${selectedCategories.length} selected ${selectedCategories.length === 1 ? 'category' : 'categories'}`}
            </div>
            
            <div className="space-y-8">
              {currentPrompts.map(prompt => (
                <div key={prompt.id} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/4">
                      <h3 className="text-xl font-bold text-[#1A1A1A]">{prompt.title}</h3>
                      <p className="text-sm bg-[#FFDE59] text-[#1A1A1A] font-semibold px-2 py-1 rounded inline-block">{prompt.category}</p>
                    </div>
                    <div className="md:w-3/4">
                      <p className="text-gray-700 mb-4">
                        <strong>Purpose:</strong> {prompt.description}
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4 relative">
                        <button 
                          onClick={() => copyToClipboard(prompt.prompt, prompt.id)}
                          className="absolute top-2 right-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 p-2 rounded-full flex items-center justify-center w-8 h-8"
                          title="Copy to clipboard"
                          aria-label="Copy prompt to clipboard"
                        >
                          {copiedId === prompt.id ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          )}
                        </button>
                        <p className="text-gray-800 font-mono text-sm pr-10">
                          {prompt.prompt}
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm italic">
                        <strong>Personalization Tip:</strong> {prompt.personalizationTip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredPrompts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-700">No AI prompt examples found matching your criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <nav className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    // Show current page, first, last, and pages around current
                    if (
                      i + 1 === currentPage ||
                      i + 1 === 1 ||
                      i + 1 === totalPages ||
                      (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={i}
                          onClick={() => paginate(i + 1)}
                          className={`px-3 py-1 border-t border-b ${
                            currentPage === i + 1
                              ? 'bg-[#FFDE59] text-[#1A1A1A] font-bold'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      );
                    } else if (
                      (i + 1 === currentPage - 2 && currentPage > 3) ||
                      (i + 1 === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span
                          key={i}
                          className="px-2 py-1 border-t border-b bg-white text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-r-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why These AI Prompt Examples Will Transform Your Content Creation</h2>
            
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/4 flex justify-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                    <i className="fas fa-fingerprint text-2xl text-indigo-600"></i>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Maintain Your Authentic Voice</h3>
                  <p className="text-gray-700">
                    Each of our AI prompt examples includes personalization tips to ensure the AI output sounds authentically like you. No more generic, robotic-sounding content that could have been written by anyone.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/4 flex justify-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                    <i className="fas fa-clock text-2xl text-indigo-600"></i>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Save Hours Every Week</h3>
                  <p className="text-gray-700">
                    Stop staring at blank screens or spending hours refining AI outputs. These prompts for AI are designed to get you high-quality, on-brand content from the first generation.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/4 flex justify-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                    <i className="fas fa-th-large text-2xl text-indigo-600"></i>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Comprehensive Coverage</h3>
                  <p className="text-gray-700">
                    With 101 AI prompt ideas across 6 categories, you'll have the perfect prompt for virtually any content need: from ideation to writing, engagement to branding, sales to repurposing.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="md:w-1/4 flex justify-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center">
                    <i className="fas fa-graduation-cap text-2xl text-indigo-600"></i>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Learn Prompt Engineering</h3>
                  <p className="text-gray-700">
                    As you use these AI prompt examples, you'll naturally absorb the principles of effective prompt design, improving your ability to craft your own prompts for AI tools in any situation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Prompt Engineering Section - New for SEO */}
      <section id="what-is-prompt-engineering" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">What is AI Prompt Engineering?</h2>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <p className="text-lg mb-6">
                <strong>Prompt engineering</strong> is the art and science of crafting effective instructions for AI systems like ChatGPT, Claude, and Gemini to produce high-quality, relevant outputs. It's a crucial skill for anyone looking to leverage AI for content creation.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Key Elements of Effective AI Prompts</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">1. Clarity and Specificity</h4>
                  <p>Clear, specific instructions help the AI understand exactly what you want. Vague prompts lead to generic outputs.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">2. Context and Background</h4>
                  <p>Providing relevant context about yourself, your audience, and your goals helps the AI generate more tailored content.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">3. Voice and Style Guidance</h4>
                  <p>Including examples of your preferred tone, style, and vocabulary helps maintain your authentic voice.</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">4. Structure and Format</h4>
                  <p>Specifying the desired structure and format ensures the AI delivers content in a usable way.</p>
                </div>
              </div>
              
              <p className="text-lg mb-6">
                Our collection of 101 AI prompt examples incorporates these principles to help you generate better content while maintaining your unique voice.
              </p>
              
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Common Prompt Engineering Techniques</h3>
                
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mr-3 flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Role-Based Prompting</h4>
                      <p>Assigning a specific role to the AI (e.g., "Act as an expert copywriter") to influence its response style.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="mr-3 flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Chain-of-Thought Prompting</h4>
                      <p>Guiding the AI through a step-by-step thinking process to reach more logical conclusions.</p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="mr-3 flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold">Few-Shot Learning</h4>
                      <p>Providing examples of desired inputs and outputs to help the AI understand the pattern you want.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Prompt Templates Section - New for SEO */}
      <section id="ai-prompt-templates" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">AI Prompt Templates for Different Platforms</h2>
            
            <div className="space-y-8">
              <div id="chatgpt-prompts" className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 mr-2 bg-green-100 rounded-full flex items-center justify-center text-green-600">C</span>
                  ChatGPT Prompt Templates
                </h3>
                
                <p className="mb-6">
                  ChatGPT excels at creative writing, explanations, and conversational content. Our ChatGPT prompt examples are designed to leverage these strengths while maintaining your authentic voice.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold mb-2">ChatGPT Prompt Template Structure</h4>
                  <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <code>
                      1. Context: Who you are and what you need<br />
                      2. Task: Specific instructions for what to create<br />
                      3. Format: How you want the output structured<br />
                      4. Voice: Your tone, style, and vocabulary preferences<br />
                      5. Examples: Sample phrases or content you typically use
                    </code>
                  </pre>
                </div>
                
                <p>
                  Browse our <a href="#ai-prompt-examples" className="text-indigo-600 hover:underline">collection of ChatGPT prompts</a> to find examples tailored to your specific content needs.
                </p>
              </div>
              
              <div id="claude-prompts" className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 mr-2 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">C</span>
                  Claude Prompt Templates
                </h3>
                
                <p className="mb-6">
                  Claude is particularly strong at nuanced writing, detailed analysis, and maintaining consistent tone. Our Claude prompt examples take advantage of these capabilities.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold mb-2">Claude Prompt Best Practices</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Assign a clear role:</strong> Tell Claude to act as a specific expert (e.g., "Act as an experienced copywriter")</li>
                    <li><strong>Define the use case:</strong> Explain exactly what you need Claude to help with</li>
                    <li><strong>Include examples:</strong> Show Claude samples of your writing style or desired outputs</li>
                    <li><strong>Be specific:</strong> Provide detailed instructions about format, length, and style</li>
                    <li><strong>Describe your voice:</strong> Help Claude mimic your unique communication patterns</li>
                    <li><strong>Specify the Claude model:</strong> Different Claude models have different capabilities</li>
                  </ul>
                </div>
                
                <p>
                  Find Claude-optimized prompts in our <a href="#ai-prompt-examples" className="text-indigo-600 hover:underline">AI prompt examples collection</a>.
                </p>
              </div>
              
              <div id="gemini-prompts" className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <span className="w-8 h-8 mr-2 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">G</span>
                  Gemini Prompt Templates
                </h3>
                
                <p className="mb-6">
                  Google's Gemini excels at factual content, research synthesis, and structured outputs. Our Gemini prompt examples are crafted to maximize these strengths.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold mb-2">Gemini Prompt Framework</h4>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Start with a clear objective</li>
                    <li>Specify your expertise and audience</li>
                    <li>Detail your preferred content structure</li>
                    <li>Include voice and style guidance</li>
                    <li>Request fact-checking when appropriate</li>
                  </ol>
                </div>
                
                <p>
                  Explore our <a href="#ai-prompt-examples" className="text-indigo-600 hover:underline">Gemini-optimized prompts</a> in our comprehensive collection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions About Prompt Writing Studio</h2>
            
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">What is an AI prompt generator?</h3>
                <p className="text-gray-700">
                  An AI prompt generator is a tool or collection of templates that helps you create effective instructions for AI writing assistants like ChatGPT, Claude, and Gemini. Our AI prompt examples collection serves as a generator by providing 101 customizable templates across different categories that you can adapt to your specific needs.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">How do I write a good AI prompt?</h3>
                <p className="text-gray-700">
                  A good AI prompt includes clear context about who you are, specific instructions about what you want to create, guidance on format and structure, examples of your preferred tone and style, and information about your target audience. Our collection of AI prompt examples demonstrates these principles in action across different content types.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">What are the best prompts for ChatGPT?</h3>
                <p className="text-gray-700">
                  The best prompts for ChatGPT are specific, contextual, and include guidance on your preferred output format and style. For content creation, effective ChatGPT prompts typically include: (1) who you are and your expertise, (2) what you want to create, (3) your target audience, (4) your unique perspective, and (5) examples of your voice. Browse our <a href="#chatgpt-prompts" className="text-indigo-600 hover:underline">ChatGPT prompt templates</a> for specific examples.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">What makes these AI prompt examples different from others?</h3>
                <p className="text-gray-700">
                  These AI prompts are specifically designed to maintain your authentic voice while leveraging artificial intelligence. Each includes personalization tips and focuses on the "Chef Idea Officer" approach where you provide the direction and AI handles the mechanics. Unlike generic prompts, ours are tailored for content creators who want to preserve their unique perspective.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">What is prompt engineering and why is it important?</h3>
                <p className="text-gray-700">
                  Prompt engineering is the process of crafting effective instructions for AI systems to produce desired outputs. It's important because the quality of your prompt directly impacts the quality of AI-generated content. Good prompt engineering helps you get consistent, high-quality results that align with your goals and voice. Learn more in our <a href="#what-is-prompt-engineering" className="text-indigo-600 hover:underline">prompt engineering guide</a>.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Which AI tools can I use these prompts with?</h3>
                <p className="text-gray-700">
                  Our AI prompt examples work with any modern AI writing tool including ChatGPT, Claude, Gemini, and others. They're designed to be platform-agnostic while getting the best results from any AI assistant. We've included specific sections for <a href="#chatgpt-prompts" className="text-indigo-600 hover:underline">ChatGPT prompts</a>, <a href="#claude-prompts" className="text-indigo-600 hover:underline">Claude prompts</a>, and <a href="#gemini-prompts" className="text-indigo-600 hover:underline">Gemini prompts</a> with platform-specific optimizations.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Do I need to be a professional writer to use these AI prompt ideas?</h3>
                <p className="text-gray-700">
                  Not at all! These prompts for AI are designed for creators at all levels, from beginners to professionals. They're especially valuable for non-writers who need to create content regularly, such as business owners, marketers, and consultants. The prompts include clear instructions that anyone can customize.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Will these AI prompt examples work for my specific industry?</h3>
                <p className="text-gray-700">
                  Yes! Our prompts for AI are designed to be customized for any industry or niche. They focus on content types and structures rather than specific topics, making them versatile for any field. Simply replace the placeholder text with information relevant to your industry, audience, and expertise.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">How do I maintain my authentic voice when using AI prompts?</h3>
                <p className="text-gray-700">
                  To maintain your authentic voice when using AI prompts: (1) Include examples of your typical phrases and expressions in the prompt, (2) Specify your unique perspective on the topic, (3) Mention your communication style (formal, conversational, technical, etc.), (4) Reference your audience and how you typically address them, and (5) Edit the AI output to further align it with your voice. Each of our AI prompt examples includes personalization tips to help with this.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">How will I receive the AI prompt examples?</h3>
                <p className="text-gray-700">
                  You can browse and use all 101 AI prompt examples directly on this page. Simply filter by category or search for specific needs, then copy any prompt you want to use with your favorite AI assistant. For more advanced prompt templates and personalized guidance, consider our <a href="#pricing" className="text-indigo-600 hover:underline">PromptWritingStudio Basic plan</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Embed Section */}
      <section id="testimonial-embed" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What My Clients, Students and Readers Say</h2>
          <Script src="https://testimonial.to/js/iframeResizer.min.js" strategy="beforeInteractive" />
          <div className="testimonial-container">
            <iframe 
              height="800px" 
              id='testimonialto-become-a-writer-today-tag-all-light-animated' 
              src="https://embed-v2.testimonial.to/w/become-a-writer-today?animated=on&theme=light&shadowColor=ffffff&speed=1&tag=all&cc=off" 
              frameBorder="0" 
              scrolling="no" 
              width="100%"
            ></iframe>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section - Basic Plan */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Master AI Prompt Writing?</h2>
            <p className="text-xl text-gray-700 mb-8">
              These 101 AI prompt examples are just the beginning. Take your content creation to the next level with our complete PromptWritingStudio course and unlock the full potential of AI writing assistants.
            </p>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md mb-8">
              <h3 className="text-2xl font-bold mb-4">PromptWritingStudio Basic</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-[#1A1A1A]">$25</span>
                <span className="text-[#333333]"> per month</span>
              </div>
              <p className="text-[#333333] mb-6">Perfect for beginners who want to learn the fundamentals of AI prompt writing.</p>
              
              <ul className="space-y-3 mb-8 max-w-md mx-auto text-left">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1A1A1A] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-[#333333]">Weekly prompt lessons</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1A1A1A] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-[#333333]">25+ prompt templates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1A1A1A] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-[#333333]">Basic voice customization guide</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1A1A1A] mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-[#333333]">Email support</span>
                </li>
              </ul>
              
              <Link 
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746" 
                className="bg-[#FFDE59] text-[#1A1A1A] block text-center mt-8 px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </Link>
            </div>
            
            <p className="text-gray-600">
              All plans include a 30-day money-back guarantee. No risk, all reward.
            </p>
          </div>
        </div>
      </section>
      
      {/* Add Facebook Pixel */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1039444686812221');
            fbq('track', 'PageView');
          `,
        }}
      />
    </Layout>
  )
}
