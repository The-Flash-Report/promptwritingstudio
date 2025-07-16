import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import { useState } from 'react'
import Link from 'next/link'

export default function AIGlossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Terms' },
    { id: 'basics', label: 'AI Basics' },
    { id: 'business', label: 'Business Applications' },
    { id: 'technology', label: 'Technology' },
    { id: 'ethics', label: 'Ethics & Safety' }
  ]

  const glossaryTerms = [
    {
      term: "Artificial Intelligence (AI)",
      category: "basics",
      definition: "Computer systems designed to perform tasks that typically require human intelligence, such as recognizing speech, making decisions, or solving problems. In business, AI helps automate processes and gain insights from data.",
      businessExample: "Customer service chatbots that can answer common questions 24/7."
    },
    {
      term: "Machine Learning (ML)",
      category: "technology", 
      definition: "A subset of AI where computers learn patterns from data without being explicitly programmed for each task. The system improves its performance as it processes more information.",
      businessExample: "Email spam filters that get better at detecting unwanted messages over time."
    },
    {
      term: "Large Language Model (LLM)",
      category: "technology",
      definition: "AI systems trained on vast amounts of text data to understand and generate human-like language. These models can write, summarize, translate, and answer questions.",
      businessExample: "ChatGPT helping writers create marketing copy or customer support responses."
    },
    {
      term: "Deep Learning",
      category: "technology",
      definition: "A machine learning technique using artificial neural networks with multiple layers to recognize complex patterns. It's particularly effective for processing images, speech, and text.",
      businessExample: "Photo recognition in inventory management systems or voice assistants."
    },
    {
      term: "Neural Network",
      category: "technology",
      definition: "Computing systems inspired by biological brain networks. They consist of interconnected nodes that process information and learn patterns, forming the basis of deep learning.",
      businessExample: "Fraud detection systems in banking that identify suspicious transaction patterns."
    },
    {
      term: "Natural Language Processing (NLP)",
      category: "business",
      definition: "AI technology that enables computers to understand, interpret, and generate human language. It bridges the gap between human communication and computer understanding.",
      businessExample: "Automated analysis of customer reviews to identify common complaints or praise."
    },
    {
      term: "Computer Vision",
      category: "business",
      definition: "AI capability that enables machines to interpret and understand visual information from images and videos, similar to human sight.",
      businessExample: "Quality control systems in manufacturing that automatically detect product defects."
    },
    {
      term: "Prompt Engineering",
      category: "business",
      definition: "The practice of crafting effective instructions or questions for AI systems to get desired outputs. Essential skill for maximizing AI tool effectiveness.",
      businessExample: "Writing specific prompts to generate targeted marketing content that matches your brand voice."
    },
    {
      term: "Automation",
      category: "business",
      definition: "Using AI and technology to perform tasks without human intervention. Reduces manual work and increases efficiency in business processes.",
      businessExample: "Automated invoice processing that extracts data and routes approvals without manual data entry."
    },
    {
      term: "Artificial General Intelligence (AGI)",
      category: "basics",
      definition: "Hypothetical AI that matches or exceeds human cognitive abilities across all domains. Unlike current AI that excels at specific tasks, AGI would be truly general-purpose.",
      businessExample: "Currently theoretical - would be an AI assistant capable of handling any business task as well as a human executive."
    },
    {
      term: "Algorithm",
      category: "technology",
      definition: "A set of rules or instructions that computers follow to solve problems or complete tasks. In AI, algorithms enable machines to learn from data and make decisions.",
      businessExample: "Recommendation algorithms that suggest products to customers based on their browsing history."
    },
    {
      term: "Training Data",
      category: "technology",
      definition: "The information used to teach AI systems how to perform tasks. Quality and quantity of training data directly impacts AI performance.",
      businessExample: "Historical sales data used to train a forecasting model for inventory planning."
    },
    {
      term: "API (Application Programming Interface)",
      category: "technology",
      definition: "A way for different software applications to communicate. AI APIs allow businesses to integrate AI capabilities into their existing systems without building from scratch.",
      businessExample: "Using OpenAI's API to add AI writing capabilities to your company's content management system."
    },
    {
      term: "Supervised Learning",
      category: "technology",
      definition: "Machine learning approach where the AI learns from examples with known correct answers. Like teaching with answer sheets to help the system learn patterns.",
      businessExample: "Training a system to categorize customer support tickets by showing it thousands of pre-labeled examples."
    },
    {
      term: "Unsupervised Learning",
      category: "technology",
      definition: "Machine learning where AI finds hidden patterns in data without being given specific examples of what to look for. Useful for discovering unknown insights.",
      businessExample: "Analyzing customer behavior data to discover unexpected customer segments for targeted marketing."
    },
    {
      term: "ROI (Return on Investment)",
      category: "business",
      definition: "A metric measuring the efficiency of an investment. In AI context, it compares the cost of implementing AI solutions against the benefits gained.",
      businessExample: "Calculating savings from AI automation: if you spend $10,000 on AI tools that save 100 hours monthly at $50/hour, your monthly ROI is 400%."
    },
    {
      term: "Chatbot",
      category: "business",
      definition: "AI-powered software that conducts conversations with users through text or voice. Modern chatbots can handle complex customer service interactions.",
      businessExample: "Website chatbots that answer customer questions, schedule appointments, and escalate complex issues to human agents."
    },
    {
      term: "Predictive Analytics",
      category: "business",
      definition: "Using AI to analyze current and historical data to make predictions about future events. Helps businesses make data-driven decisions.",
      businessExample: "Predicting which customers are likely to cancel subscriptions so you can proactively offer retention incentives."
    },
    {
      term: "Bias",
      category: "ethics",
      definition: "Unfair preferences or prejudices in AI systems, often reflecting biases present in training data. Can lead to discriminatory outcomes in business applications.",
      businessExample: "A hiring AI that unfairly favors certain demographics due to biased historical hiring data."
    },
    {
      term: "Ethical AI",
      category: "ethics",
      definition: "Development and use of AI systems that are fair, transparent, accountable, and respect human rights. Increasingly important for business reputation and compliance.",
      businessExample: "Ensuring AI-powered loan approval systems don't discriminate against protected groups."
    },
    {
      term: "AI Hallucination",
      category: "ethics",
      definition: "When AI systems generate false or misleading information presented as fact. Important to understand when using AI for business content creation.",
      businessExample: "An AI writing assistant creating fake statistics for a marketing report that need human verification."
    },
    {
      term: "Explainable AI (XAI)",
      category: "ethics",
      definition: "AI systems designed to provide clear explanations for their decisions and recommendations. Critical for business applications requiring transparency.",
      businessExample: "A loan approval system that explains specific factors that led to approval or denial decisions."
    },
    {
      term: "Data Privacy",
      category: "ethics",
      definition: "Protecting sensitive information when using AI systems. Includes securing customer data and complying with regulations like GDPR.",
      businessExample: "Ensuring customer data used to train AI models is anonymized and securely stored."
    },
    {
      term: "Transfer Learning",
      category: "technology",
      definition: "Technique where AI models trained on one task are adapted for related tasks. Reduces time and resources needed for implementation.",
      businessExample: "Using a pre-trained image recognition model and adapting it to identify your specific products."
    },
    {
      term: "Edge AI",
      category: "technology",
      definition: "Running AI algorithms locally on devices rather than in the cloud. Provides faster responses and better privacy for sensitive business data.",
      businessExample: "AI-powered security cameras that detect intrusions locally without sending footage to external servers."
    }
  ]

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout
      title="AI Glossary - Essential Artificial Intelligence Terms for Business Owners | PromptWritingStudio"
      description="Master AI terminology with our comprehensive glossary. Clear, business-focused definitions of key artificial intelligence terms every entrepreneur should know."
    >
      <EnhancedMeta
        title="AI Glossary - Essential Artificial Intelligence Terms for Business Owners"
        description="Understand AI with clear, business-focused definitions. From machine learning to neural networks - essential AI terms explained for entrepreneurs."
        url="https://promptwritingstudio.com/ai-glossary"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime="2024-01-22T00:00:00Z"
        modifiedTime="2024-01-22T00:00:00Z"
      />
      <OrganizationSchema />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AI Glossary for Business Owners
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Essential AI Terms Explained in Plain English
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg">
                Stop feeling lost in AI conversations. Master the terminology that matters 
                for your business success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">
                Why Understanding AI Terms Matters for Your Business
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                The AI revolution is happening in boardrooms, not just research labs. When vendors 
                pitch "machine learning solutions" or consultants recommend "neural network implementations," 
                you need to understand what they're really offering and how it impacts your bottom line.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <h3 className="text-xl font-semibold mb-3 text-yellow-800">
                  💡 Business Owner's Reality Check
                </h3>
                <p className="text-yellow-700">
                  You don't need to become a data scientist, but understanding key AI terminology 
                  helps you ask better questions, evaluate solutions effectively, and avoid 
                  expensive mistakes in your AI investments.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-green-800">
                    ✅ What You'll Gain
                  </h3>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• Confidence in AI vendor conversations</li>
                    <li>• Better evaluation of AI proposals</li>
                    <li>• Understanding of costs and timelines</li>
                    <li>• Ability to spot AI buzzword marketing</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">
                    🎯 Focus Areas
                  </h3>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Business applications over technical details</li>
                    <li>• ROI and cost considerations</li>
                    <li>• Implementation timelines and requirements</li>
                    <li>• Risk factors and ethical considerations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search AI terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mb-6">
              Showing {filteredTerms.length} of {glossaryTerms.length} terms
            </p>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {filteredTerms.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow" id={item.term.toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 md:mb-0">
                      {item.term}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block
                      ${item.category === 'basics' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'business' ? 'bg-green-100 text-green-800' :
                        item.category === 'technology' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'}`}>
                      {categories.find(cat => cat.id === item.category)?.label || item.category}
                    </span>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4">
                      {item.definition}
                    </p>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-semibold text-blue-800 text-sm mb-2">
                        💼 Business Example:
                      </h4>
                      <p className="text-blue-700 text-sm">
                        {item.businessExample}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTerms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No terms found matching your search. Try different keywords or browse all categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A]">
              Ready to Apply Your AI Knowledge?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Now that you understand the terminology, it's time to see how these AI concepts 
              can drive real business value for your company.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-blue-600 mb-2">📊 Calculate Impact</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Use our ROI calculator to estimate potential savings from AI implementation.
                </p>
                <Link 
                  href="/calculators/ai-cost-comparison"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Try Calculator →
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-green-600 mb-2">🚀 Get Started</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Learn practical AI prompt engineering with our free tools and guides.
                </p>
                <Link 
                  href="/ai-prompt-generator"
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Start Free →
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-purple-600 mb-2">📚 Learn More</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore the complete history of AI and how it impacts modern business.
                </p>
                <Link 
                  href="/ai-history"
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  Read History →
                </Link>
              </div>
            </div>
            
            <Link 
              href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Master AI for Business Success
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-[#1A1A1A] text-center">
              Quick Reference: Most Important Terms for Business Owners
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['Machine Learning', 'Natural Language Processing', 'ROI (Return on Investment)', 'Automation'].map((term, index) => (
                <a 
                  key={index}
                  href={`#${term.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
                >
                  <span className="font-semibold text-blue-600 text-sm">{term}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 