import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { allAuthenticCreatorPrompts } from '../data/all-authentic-creator-prompts'
import { categories } from '../data/sample-prompts'
import EnhancedMeta from '../components/ui/EnhancedMeta'

// ChatGPT-specific template categories with enhanced interactivity
const chatgptTemplateCategories = [
  {
    name: "Business & Marketing",
    description: "Templates for email marketing, content creation, and sales copy",
    icon: "💼",
    templates: [
      {
        title: "Email Marketing Campaign",
        description: "Create engaging email sequences that convert",
        difficulty: "Intermediate",
        estimatedTime: "10-15 minutes",
        template: `Act as an expert email marketer. Create a 5-email welcome sequence for [your business/service]. 

Email 1: Welcome & Set Expectations
Email 2: Share Your Story/Origin
Email 3: Provide Value/Free Resource  
Email 4: Social Proof/Testimonials
Email 5: Clear Call-to-Action

For each email:
- Subject line that gets opened
- Personal greeting using [prospect name]
- Value-focused content
- Clear next step
- Your brand voice: [describe your communication style]

Target audience: [describe your ideal customer]
Main goal: [conversion objective]
Free resource: [lead magnet you're offering]`,
        fillableFields: [
          { field: "[your business/service]", placeholder: "e.g., Digital Marketing Agency" },
          { field: "[prospect name]", placeholder: "e.g., first name" },
          { field: "[describe your communication style]", placeholder: "e.g., friendly but professional" },
          { field: "[describe your ideal customer]", placeholder: "e.g., small business owners" },
          { field: "[conversion objective]", placeholder: "e.g., book a consultation" },
          { field: "[lead magnet you're offering]", placeholder: "e.g., Marketing Checklist" }
        ],
        downloadable: true,
        category: "Business & Marketing"
      },
      {
        title: "Social Media Content Calendar",
        description: "Generate a month's worth of engaging social media posts",
        difficulty: "Beginner",
        estimatedTime: "5-10 minutes",
        template: `As a social media strategist, create a 30-day content calendar for [platform] focused on [your industry/niche].

For each post include:
- Hook/attention-grabbing opening
- Value-driven content
- Clear call-to-action
- Relevant hashtags for [your industry]
- Best posting time recommendation

Content mix:
- 40% educational/value posts
- 30% behind-the-scenes/personal
- 20% promotional/sales
- 10% user-generated content/engagement

My brand voice: [your communication style]
Target audience: [ideal follower description]
Main business goal: [what you want to achieve]`,
        fillableFields: [
          { field: "[platform]", placeholder: "e.g., Instagram, LinkedIn, Twitter" },
          { field: "[your industry/niche]", placeholder: "e.g., fitness coaching" },
          { field: "[your industry]", placeholder: "e.g., #fitness #coaching" },
          { field: "[your communication style]", placeholder: "e.g., motivational and encouraging" },
          { field: "[ideal follower description]", placeholder: "e.g., busy professionals wanting to get fit" },
          { field: "[what you want to achieve]", placeholder: "e.g., drive traffic to website" }
        ],
        downloadable: true,
        category: "Business & Marketing"
      }
    ]
  },
  {
    name: "Content Creation",
    description: "Blog posts, articles, and long-form content templates",
    icon: "✍️",
    templates: [
      {
        title: "Blog Post Outline Generator",
        description: "Create comprehensive blog post structures",
        difficulty: "Intermediate",
        estimatedTime: "8-12 minutes",
        template: `As an expert content strategist, create a detailed blog post outline for "[your blog post topic]".

Target keyword: [main SEO keyword]
Target audience: [reader description]
Word count goal: [desired length]

Include:
1. SEO-optimized title (under 60 characters)
2. Meta description (under 160 characters)  
3. Introduction hook
4. 5-7 main sections with subheadings
5. Key points for each section
6. Internal linking opportunities
7. Call-to-action suggestions
8. FAQ section ideas

Writing style: [your preferred tone/style]
Unique angle: [your perspective on this topic]`,
        fillableFields: [
          { field: "[your blog post topic]", placeholder: "e.g., How to Start a Side Hustle" },
          { field: "[main SEO keyword]", placeholder: "e.g., side hustle ideas" },
          { field: "[reader description]", placeholder: "e.g., 9-5 workers wanting extra income" },
          { field: "[desired length]", placeholder: "e.g., 2000-2500 words" },
          { field: "[your preferred tone/style]", placeholder: "e.g., conversational and actionable" },
          { field: "[your perspective on this topic]", placeholder: "e.g., focus on low-investment opportunities" }
        ],
        downloadable: true,
        category: "Content Creation"
      },
      {
        title: "Video Script Template",
        description: "Create engaging video scripts for any platform",
        difficulty: "Advanced",
        estimatedTime: "15-20 minutes",
        template: `Write a compelling video script for [platform: YouTube/Instagram/TikTok] about "[video topic]".

Video length: [desired duration]
Target audience: [viewer description]
Main goal: [educate/entertain/sell/inspire]

Script structure:
- Hook (first 3 seconds)
- Problem identification
- Solution presentation
- Social proof/examples
- Clear call-to-action
- Closing/subscribe reminder

Include:
- Visual cues [when to show graphics/text]
- Tone changes [when to be serious/lighthearted]
- Engagement prompts [questions for comments]

My speaking style: [your presentation style]
Key message: [main takeaway for viewers]`,
        fillableFields: [
          { field: "[platform: YouTube/Instagram/TikTok]", placeholder: "e.g., YouTube" },
          { field: "[video topic]", placeholder: "e.g., 5 Productivity Hacks for Entrepreneurs" },
          { field: "[desired duration]", placeholder: "e.g., 8-10 minutes" },
          { field: "[viewer description]", placeholder: "e.g., busy entrepreneurs" },
          { field: "[educate/entertain/sell/inspire]", placeholder: "e.g., educate" },
          { field: "[your presentation style]", placeholder: "e.g., energetic and direct" },
          { field: "[main takeaway for viewers]", placeholder: "e.g., simple systems save hours daily" }
        ],
        downloadable: true,
        category: "Content Creation"
      }
    ]
  },
  {
    name: "Business Operations",
    description: "Templates for proposals, reports, and business communications",
    icon: "📊",
    templates: [
      {
        title: "Client Proposal Template",
        description: "Professional proposals that win more business",
        difficulty: "Advanced",
        estimatedTime: "20-25 minutes",
        template: `Create a professional service proposal for [client name] for [type of project/service].

Client background: [what you know about their business]
Project scope: [what they need help with]
Your expertise: [relevant experience/credentials]

Proposal sections:
1. Executive Summary
2. Understanding of Client Needs
3. Proposed Solution & Methodology
4. Timeline & Deliverables
5. Investment & Payment Terms
6. Why Choose [Your Business]
7. Next Steps

Include:
- Clear project objectives
- Specific deliverables with deadlines
- Transparent pricing structure
- Risk mitigation strategies
- Success metrics/KPIs

Communication style: [professional/friendly/technical]
Competitive advantage: [what sets you apart]`,
        fillableFields: [
          { field: "[client name]", placeholder: "e.g., ABC Company" },
          { field: "[type of project/service]", placeholder: "e.g., website redesign" },
          { field: "[what you know about their business]", placeholder: "e.g., e-commerce retailer struggling with conversions" },
          { field: "[what they need help with]", placeholder: "e.g., improve online sales" },
          { field: "[relevant experience/credentials]", placeholder: "e.g., 5 years UX design, 50+ e-commerce projects" },
          { field: "[Your Business]", placeholder: "e.g., DesignPro Studio" },
          { field: "[professional/friendly/technical]", placeholder: "e.g., professional but approachable" },
          { field: "[what sets you apart]", placeholder: "e.g., data-driven design process" }
        ],
        downloadable: true,
        category: "Business Operations"
      }
    ]
  },
  {
    name: "Creative & Personal",
    description: "Templates for storytelling, creative writing, and personal projects",
    icon: "🎨",
    templates: [
      {
        title: "Personal Brand Story",
        description: "Craft your compelling origin story",
        difficulty: "Intermediate",
        estimatedTime: "15-20 minutes",
        template: `Help me write my personal brand story that connects with [target audience].

Background information:
- My profession: [current role/business]
- My expertise: [what I'm known for]
- My transformation: [challenge I overcame]
- My mission: [what I want to help others achieve]

Story elements to include:
1. Where I started (the struggle)
2. The turning point (what changed)
3. The journey (what I learned)
4. Where I am now (current success)
5. My mission (how I help others)

Tone: [inspiring/relatable/professional]
Length: [short/medium/long version needed]
Use case: [website bio/speaking intro/social media]

Make it: Authentic, memorable, and relevant to my audience's challenges.`,
        fillableFields: [
          { field: "[target audience]", placeholder: "e.g., aspiring entrepreneurs" },
          { field: "[current role/business]", placeholder: "e.g., Business Coach" },
          { field: "[what I'm known for]", placeholder: "e.g., helping startups scale" },
          { field: "[challenge I overcame]", placeholder: "e.g., failed first business" },
          { field: "[what I want to help others achieve]", placeholder: "e.g., avoid costly startup mistakes" },
          { field: "[inspiring/relatable/professional]", placeholder: "e.g., inspiring" },
          { field: "[short/medium/long version needed]", placeholder: "e.g., medium (2-3 paragraphs)" },
          { field: "[website bio/speaking intro/social media]", placeholder: "e.g., website about page" }
        ],
        downloadable: true,
        category: "Creative & Personal"
      }
    ]
  }
]

export default function ChatGPTTemplates() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedTemplate, setExpandedTemplate] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [downloadedTemplates, setDownloadedTemplates] = useState([])
  const [showTemplateBuilder, setShowTemplateBuilder] = useState(null)
  const [filledTemplates, setFilledTemplates] = useState({})
  const [templateProgress, setTemplateProgress] = useState({})
  const [favorites, setFavorites] = useState([])
  const [showLivePreview, setShowLivePreview] = useState(null)
  const [completedTemplates, setCompletedTemplates] = useState(0)
  const [showTutorial, setShowTutorial] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Load saved data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('templateFavorites')
      const savedProgress = localStorage.getItem('templateProgress')
      const savedCompleted = localStorage.getItem('completedTemplates')
      const savedFilled = localStorage.getItem('filledTemplates')
      
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
      if (savedProgress) setTemplateProgress(JSON.parse(savedProgress))
      if (savedCompleted) setCompletedTemplates(parseInt(savedCompleted))
      if (savedFilled) setFilledTemplates(JSON.parse(savedFilled))
    }
  }, [])

  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('templateFavorites', JSON.stringify(favorites))
    }
  }, [favorites])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('templateProgress', JSON.stringify(templateProgress))
    }
  }, [templateProgress])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('completedTemplates', completedTemplates.toString())
    }
  }, [completedTemplates])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('filledTemplates', JSON.stringify(filledTemplates))
    }
  }, [filledTemplates])

  // Get all templates from all categories
  const allTemplates = chatgptTemplateCategories.flatMap(category => 
    category.templates.map(template => ({ ...template, category: category.name }))
  )

  // Filter templates based on category and search
  const filteredTemplates = allTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.template.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Toggle favorite
  const toggleFavorite = (templateId) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  // Update field in template builder
  const updateTemplateField = (templateIndex, field, value) => {
    setFilledTemplates(prev => ({
      ...prev,
      [templateIndex]: {
        ...prev[templateIndex],
        [field]: value
      }
    }))

    // Update progress
    const template = allTemplates[templateIndex]
    const filled = filledTemplates[templateIndex] || {}
    const totalFields = template.fillableFields?.length || 0
    const filledFields = Object.keys({ ...filled, [field]: value }).length
    const progress = totalFields > 0 ? (filledFields / totalFields) * 100 : 0
    
    setTemplateProgress(prev => ({
      ...prev,
      [templateIndex]: progress
    }))
  }

  // Generate live preview
  const generateLivePreview = (templateIndex) => {
    const template = allTemplates[templateIndex]
    const filled = filledTemplates[templateIndex] || {}
    
    let preview = template.template
    template.fillableFields?.forEach(fieldObj => {
      const placeholder = filled[fieldObj.field] || fieldObj.placeholder
      preview = preview.replaceAll(fieldObj.field, placeholder)
    })
    
    return preview
  }

  // Copy template to clipboard
  const copyToClipboard = async (template, templateIndex) => {
    try {
      const textToCopy = filledTemplates[templateIndex] ? generateLivePreview(templateIndex) : template
      await navigator.clipboard.writeText(textToCopy)
      setCopiedId(templateIndex)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Handle template download
  const downloadTemplate = (template, templateIndex) => {
    // Show email capture for first download
    if (!emailSubmitted && downloadedTemplates.length === 0) {
      setShowEmailCapture(true)
      return
    }
    
    const content = filledTemplates[templateIndex] ? generateLivePreview(templateIndex) : template.template
    
    // Create downloadable file
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.title.replace(/\s+/g, '_')}_ChatGPT_Template.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setDownloadedTemplates(prev => [...prev, templateIndex])
    setCompletedTemplates(prev => prev + 1)
  }

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    setEmailSubmitted(true)
    setShowEmailCapture(false)
    alert('Thanks! Check your email for the Complete ChatGPT Template Pack with 50+ templates.')
  }

  // Tutorial steps
  const tutorialSteps = [
    { 
      title: "Welcome to ChatGPT Templates!", 
      content: "Learn how to customize and use our professional templates for maximum results." 
    },
    { 
      title: "Choose Your Template", 
      content: "Browse by category or search for specific needs. Each template shows difficulty and time estimates." 
    },
    { 
      title: "Use the Template Builder", 
      content: "Click 'Customize' to fill in your specific information with our guided builder." 
    },
    { 
      title: "Preview & Download", 
      content: "See how your template looks before copying or downloading as a file." 
    },
    { 
      title: "Track Your Progress", 
      content: "Save favorites and track how many templates you've completed." 
    }
  ]

  const pageTitle = "Free ChatGPT Templates - 20+ Ready-to-Use Prompts for Business & Content"
  const pageDescription = "Get 20+ free ChatGPT templates for email marketing, content creation, business proposals, and more. Download ready-to-use prompts that get better results from ChatGPT instantly."

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ChatGPT Templates Collection",
    "description": pageDescription,
    "url": "https://promptwritingstudio.com/chatgpt-templates",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allTemplates.length,
      "itemListElement": allTemplates.slice(0, 10).map((template, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": template.title,
        "description": template.description,
        "text": template.template.substring(0, 200) + "..."
      }))
    }
  }

  return (
    <>
      <EnhancedMeta 
        title={pageTitle}
        description={pageDescription}
        canonicalUrl="https://promptwritingstudio.com/chatgpt-templates"
        structuredData={structuredData}
      />
      
      <Layout title={pageTitle} description={pageDescription}>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Section with Progress Tracking */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Free ChatGPT Templates
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Get better results from ChatGPT with our collection of ready-to-use templates. 
                Download professional prompts for business, marketing, content creation, and more.
              </p>
              
              {/* Progress Dashboard */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-8 max-w-2xl mx-auto">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-semibold text-green-600">{completedTemplates}</span> templates completed • 
                    <span className="font-semibold text-purple-600"> {favorites.length}</span> favorites saved
                  </div>
                  <button
                    onClick={() => setShowTutorial(true)}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition-colors"
                  >
                    🎯 Quick Guide
                  </button>
                </div>
                {completedTemplates > 0 && (
                  <div className="mt-2 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((completedTemplates / allTemplates.length) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
              
              {/* Quick stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{allTemplates.length}+</div>
                  <div className="text-sm text-gray-600">Templates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{chatgptTemplateCategories.length}</div>
                  <div className="text-sm text-gray-600">Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-600">Free Downloads</div>
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
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                {/* Category Filter */}
                <div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Categories ({allTemplates.length})</option>
                    {chatgptTemplateCategories.map(category => {
                      const count = allTemplates.filter(t => t.category === category.name).length
                      return (
                        <option key={category.name} value={category.name}>
                          {category.name} ({count})
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
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    // Filter favorites
                  }}
                  className="px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
                >
                  ❤️ Favorites ({favorites.length})
                </button>
                <button
                  className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                >
                  🚀 Beginner Friendly
                </button>
                <button
                  className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                >
                  ⚡ Quick Setup (&lt;10 min)
                </button>
              </div>
              
              {/* Results count */}
              <div className="text-sm text-gray-600">
                Showing {filteredTemplates.length} of {allTemplates.length} templates
                {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
            </div>

            {/* Category Overview Cards */}
            {selectedCategory === 'all' && !searchTerm && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {chatgptTemplateCategories.map((category) => (
                  <div
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all hover:scale-105"
                  >
                    <div className="text-4xl mb-4 text-center">{category.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-4">
                      {category.description}
                    </p>
                    <div className="text-center">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {category.templates.length} templates
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Enhanced Templates Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredTemplates.map((template, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {template.title}
                        </h3>
                        <p className="text-green-100 text-sm mb-2">
                          {template.description}
                        </p>
                        <div className="flex gap-2 text-xs">
                          <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded">
                            {template.difficulty}
                          </span>
                          <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded">
                            ⏱️ {template.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-3">
                        <button
                          onClick={() => toggleFavorite(index)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(index)
                              ? 'bg-pink-500 text-white'
                              : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                          }`}
                        >
                          ❤️
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Template Content */}
                  <div className="p-6">
                    {/* Progress Bar */}
                    {templateProgress[index] > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Completion Progress</span>
                          <span>{Math.round(templateProgress[index])}%</span>
                        </div>
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${templateProgress[index]}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 rounded-lg p-4 mb-4 relative">
                      <pre className={`text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed ${
                        expandedTemplate === index ? '' : 'max-h-32 overflow-hidden'
                      }`}>
                        {showLivePreview === index && filledTemplates[index] ? generateLivePreview(index) : template.template}
                      </pre>
                      
                      {/* Expand/Collapse & Preview Toggle */}
                      <div className="absolute bottom-2 left-2 flex gap-2">
                        {template.template.length > 200 && (
                          <button
                            onClick={() => setExpandedTemplate(expandedTemplate === index ? null : index)}
                            className="text-blue-600 text-xs hover:text-blue-800"
                          >
                            {expandedTemplate === index ? '↑ Show Less' : '↓ Show More'}
                          </button>
                        )}
                        
                        {filledTemplates[index] && (
                          <button
                            onClick={() => setShowLivePreview(showLivePreview === index ? null : index)}
                            className="text-purple-600 text-xs hover:text-purple-800"
                          >
                            {showLivePreview === index ? '📝 Show Template' : '👁️ Show Preview'}
                          </button>
                        )}
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <button
                          onClick={() => setShowTemplateBuilder(showTemplateBuilder === index ? null : index)}
                          className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium hover:bg-purple-600 transition-all"
                          title="Customize this template"
                        >
                          ⚙️ Customize
                        </button>
                        
                        <button
                          onClick={() => copyToClipboard(template.template, index)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                            copiedId === index 
                              ? 'bg-green-500 text-white' 
                              : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                        >
                          {copiedId === index ? '✓ Copied!' : '📋 Copy'}
                        </button>
                        
                        {template.downloadable && (
                          <button
                            onClick={() => downloadTemplate(template, index)}
                            className="bg-green-500 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-600 transition-all"
                          >
                            ⬇ Download
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Template Builder */}
                    {showTemplateBuilder === index && template.fillableFields && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-purple-800 mb-4">📝 Template Builder</h4>
                        <div className="space-y-3">
                          {template.fillableFields.map((fieldObj, fieldIndex) => (
                            <div key={fieldIndex}>
                              <label className="block text-xs font-medium text-purple-700 mb-1">
                                {fieldObj.field.replace(/[\[\]]/g, '').replace(/\//g, ' / ')}
                              </label>
                              <input
                                type="text"
                                placeholder={fieldObj.placeholder}
                                value={filledTemplates[index]?.[fieldObj.field] || ''}
                                onChange={(e) => updateTemplateField(index, fieldObj.field, e.target.value)}
                                className="w-full p-2 border border-purple-300 rounded text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="text-xs text-purple-600">
                            💡 Fill in your specific details to customize the template
                          </span>
                          <button
                            onClick={() => setShowTemplateBuilder(null)}
                            className="bg-purple-500 text-white px-3 py-1 rounded text-xs hover:bg-purple-600"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Usage Tips */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="text-blue-600">💡</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            <strong>Usage Tip:</strong> Click "Customize" to fill in your specific information, then copy the personalized template to ChatGPT for best results.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No templates found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Show All Templates
                </button>
              </div>
            )}

            {/* Calculator Cross-Links - Quick SEO Boost */}
            <section className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-center mb-6">Measure Your ChatGPT Impact</h3>
              <p className="text-center text-gray-600 mb-8">
                Use these templates with our calculators to quantify time and cost savings from ChatGPT automation.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Link href="/calculators/content-creation-speed" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group">
                  <div className="text-2xl mb-3">⚡</div>
                  <h4 className="font-semibold text-green-600 group-hover:text-green-700 mb-2">Content Speed Calculator</h4>
                  <p className="text-sm text-gray-600">Calculate how much faster you create content with ChatGPT templates</p>
                </Link>
                <Link href="/calculators/ai-cost-comparison" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group">
                  <div className="text-2xl mb-3">💰</div>
                  <h4 className="font-semibold text-blue-600 group-hover:text-blue-700 mb-2">ROI Calculator</h4>
                  <p className="text-sm text-gray-600">Compare ChatGPT costs vs hiring writers and content creators</p>
                </Link>
                <Link href="/calculators/business-ai-readiness" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition group">
                  <div className="text-2xl mb-3">📋</div>
                  <h4 className="font-semibold text-purple-600 group-hover:text-purple-700 mb-2">Business Assessment</h4>
                  <p className="text-sm text-gray-600">Evaluate your team's readiness for ChatGPT implementation</p>
                </Link>
              </div>
              <div className="text-center mt-6">
                <Link href="/calculators" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                  View All Business Calculators
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>

            {/* CTA Section */}
            <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-700 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Want More ChatGPT Templates?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Get our complete collection of 100+ ChatGPT templates plus our advanced prompt engineering course.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/ai-prompt-generator" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Try Our Prompt Generator
                </Link>
                <Link href="/pricing" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                  Get Full Course Access
                </Link>
              </div>
            </div>
          </div>

          {/* Tutorial Modal */}
          {showTutorial && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 my-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">ChatGPT Template Tutorial</h3>
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Step 1: Choose Your Template</h4>
                    <p className="text-blue-800 text-sm">
                      Browse our collection of proven ChatGPT templates. Each template is designed for specific use cases and optimized for best results.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Step 2: Customize Variables</h4>
                    <p className="text-green-800 text-sm">
                      Replace the placeholder variables with your specific information. The more detailed you are, the better your results will be.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Step 3: Copy & Use</h4>
                    <p className="text-purple-800 text-sm">
                      Copy the customized template and paste it directly into ChatGPT. You can further refine the response through conversation.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Pro Tips:</h4>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Use specific examples in your variables</li>
                      <li>• Adjust tone and style to match your brand</li>
                      <li>• Combine multiple templates for complex tasks</li>
                      <li>• Save your best variations for future use</li>
                    </ul>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowTutorial(false)}
                  className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Got It! Let's Start
                </button>
              </div>
            </div>
          )}

          {/* Email Capture Modal */}
          {showEmailCapture && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 my-4 max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4">Get Your Free ChatGPT Template Library</h3>
                <p className="text-gray-600 mb-4">
                  Download our complete collection of proven ChatGPT templates for business, content creation, and productivity.
                </p>
                <form onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                      Get Free Templates
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowEmailCapture(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Skip
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
} 