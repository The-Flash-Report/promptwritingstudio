import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { allAuthenticCreatorPrompts } from '../data/all-authentic-creator-prompts'
import { categories } from '../data/sample-prompts'
import EnhancedMeta from '../components/ui/EnhancedMeta'

// ChatGPT-specific template categories
const chatgptTemplateCategories = [
  {
    name: "Business & Marketing",
    description: "Templates for email marketing, content creation, and sales copy",
    icon: "💼",
    templates: [
      {
        title: "Email Marketing Campaign",
        description: "Create engaging email sequences that convert",
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
        downloadable: true
      },
      {
        title: "Social Media Content Calendar",
        description: "Generate a month's worth of engaging social media posts",
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
        downloadable: true
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
        downloadable: true
      },
      {
        title: "Video Script Template",
        description: "Create engaging video scripts for any platform",
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
        downloadable: true
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
        downloadable: true
      },
      {
        title: "Meeting Agenda Creator",
        description: "Structure productive meetings with clear outcomes",
        template: `Create a comprehensive meeting agenda for [meeting purpose/type].

Meeting details:
- Duration: [time allotted]
- Attendees: [who will be there]
- Main objective: [primary goal]
- Decision needed: [what needs to be decided]

Agenda structure:
1. Opening & Check-in (5 minutes)
2. Agenda Review & Objectives
3. [Main topic 1] - Discussion & Decision
4. [Main topic 2] - Discussion & Decision  
5. Action Items & Next Steps
6. Closing & Follow-up

For each topic include:
- Time allocation
- Discussion leader
- Desired outcome
- Supporting materials needed

Meeting style: [formal/informal approach]
Follow-up requirements: [how decisions will be documented]`,
        downloadable: true
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
        downloadable: true
      },
      {
        title: "Course Outline Creator",
        description: "Design educational content and online courses",
        template: `Create a comprehensive course outline for "[course topic]" targeting [student level: beginner/intermediate/advanced].

Course overview:
- Main learning objective: [what students will achieve]
- Target audience: [who this is for]
- Course duration: [number of modules/weeks]
- Delivery method: [online/in-person/hybrid]

For each module include:
1. Module title and learning objectives
2. Key concepts to cover
3. Practical exercises/assignments
4. Resources and materials needed
5. Assessment methods
6. Estimated time to complete

Additional elements:
- Prerequisites (if any)
- Bonus materials/resources
- Community/support structure
- Pricing strategy recommendations

Teaching style: [my preferred instructional approach]
Success metrics: [how students will measure progress]`,
        downloadable: true
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

  // Copy template to clipboard
  const copyToClipboard = async (template, id) => {
    try {
      await navigator.clipboard.writeText(template)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Handle template download
  const downloadTemplate = (template, templateId) => {
    // Show email capture for first download
    if (!emailSubmitted && downloadedTemplates.length === 0) {
      setShowEmailCapture(true)
      return
    }
    
    // Create downloadable file
    const blob = new Blob([template.template], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.title.replace(/\s+/g, '_')}_ChatGPT_Template.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    setDownloadedTemplates(prev => [...prev, templateId])
  }

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    // Here you would integrate with your email service
    console.log('Email submitted:', email)
    setEmailSubmitted(true)
    setShowEmailCapture(false)
    
    // Show success message
    alert('Thanks! Check your email for the Complete ChatGPT Template Pack with 50+ templates.')
  }

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
            
            {/* Header Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Free ChatGPT Templates
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Get better results from ChatGPT with our collection of ready-to-use templates. 
                Download professional prompts for business, marketing, content creation, and more.
              </p>
              
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

            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
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
              
              {/* Results count */}
              <div className="mt-4 text-sm text-gray-600">
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

            {/* Templates Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredTemplates.map((template, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {template.title}
                        </h3>
                        <p className="text-green-100 text-sm">
                          {template.description}
                        </p>
                      </div>
                      <span className="bg-white bg-opacity-20 text-white text-xs px-2 py-1 rounded-full ml-3 whitespace-nowrap">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Template Preview */}
                  <div className="p-6">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4 relative">
                      <pre className={`text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed ${
                        expandedTemplate === index ? '' : 'max-h-32 overflow-hidden'
                      }`}>
                        {template.template}
                      </pre>
                      
                      {/* Expand/Collapse */}
                      {template.template.length > 200 && (
                        <button
                          onClick={() => setExpandedTemplate(expandedTemplate === index ? null : index)}
                          className="absolute bottom-2 left-2 text-blue-600 text-xs hover:text-blue-800"
                        >
                          {expandedTemplate === index ? '↑ Show Less' : '↓ Show More'}
                        </button>
                      )}
                      
                      {/* Action Buttons */}
                      <div className="absolute top-2 right-2 flex gap-2">
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
                    
                    {/* Usage Tips */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="text-blue-600">💡</span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            <strong>Usage Tip:</strong> Replace [bracketed text] with your specific information for best results. Copy this template to ChatGPT and personalize it for your needs.
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

          {/* Email Capture Modal */}
          {showEmailCapture && !emailSubmitted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-md w-full p-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">📧</div>
                  <h3 className="text-xl font-bold mb-2">Get the Complete Template Pack!</h3>
                  <p className="text-gray-600 mb-6">
                    Download this template plus 50+ more ChatGPT templates for business, marketing, and content creation.
                  </p>
                  
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Download Template Pack
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