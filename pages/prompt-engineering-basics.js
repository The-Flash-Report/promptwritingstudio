import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import RichSnippets from '../components/ui/RichSnippets'
import RelatedCalculators from '../components/ui/RelatedCalculators'
import EnhancedFAQSchema from '../components/ui/EnhancedFAQSchema'

export default function PromptEngineeringBasics() {
  const currentYear = new Date().getFullYear()
  
  const faqItems = [
    {
      question: "What are the most important prompt engineering basics to learn first?",
      answer: "Start with clear instruction writing, providing context, specifying output format, using examples, and iterative refinement. These five fundamentals form the foundation of effective prompt engineering."
    },
    {
      question: "How do I know if my prompts are working effectively?",
      answer: "Measure consistency, relevance, and quality of outputs. If the AI produces what you intended 80%+ of the time, your prompt is effective. Track time savings and use tools like our Content Speed Calculator to measure ROI."
    },
    {
      question: "What's the difference between prompting ChatGPT vs Claude vs Gemini?",
      answer: "Each model has unique strengths: ChatGPT excels at conversational tasks, Claude at analysis and reasoning, Gemini at multimodal tasks. The basic prompting principles remain the same, but you may need to adjust tone and complexity."
    },
    {
      question: "Can I use the same prompts for different business tasks?",
      answer: "While basic structures are reusable, effective prompts should be customized for specific tasks, audiences, and contexts. Our prompt templates provide a starting framework that you can adapt."
    },
    {
      question: "How long should a good prompt be?",
      answer: "There's no ideal length - focus on clarity and completeness. Simple tasks may need 1-2 sentences, while complex business scenarios might require 100-200 words. Include all necessary context without being verbose."
    }
  ]

  const howToSteps = [
    {
      name: "Start with Clear Instructions",
      text: "Write specific, actionable instructions. Instead of 'write content,' say 'write a 300-word blog post introduction about sustainable packaging for e-commerce businesses.'"
    },
    {
      name: "Add Relevant Context",
      text: "Provide background information, target audience, industry specifics, and any constraints. Context helps AI understand your situation and produce relevant outputs."
    },
    {
      name: "Specify Output Format",
      text: "Define exactly how you want the response structured - bullet points, paragraphs, tables, or specific formats. Include length requirements and style preferences."
    },
    {
      name: "Use Examples and Templates",
      text: "Show the AI what good output looks like by providing examples or templates. This dramatically improves consistency and quality of results."
    },
    {
      name: "Test and Refine Iteratively",
      text: "Test your prompts, analyze results, and refine based on what works. Small adjustments can lead to significant improvements in output quality."
    }
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Prompt Engineering Basics: Complete Beginner's Guide ${currentYear}`,
    "description": "Learn prompt engineering basics with practical examples, templates, and step-by-step tutorials. Master the fundamentals of AI communication for business success.",
    "keywords": "prompt engineering basics, prompt engineering tutorial, how to prompt AI, AI prompting guide, prompt engineering fundamentals",
    "datePublished": `${currentYear}-01-15T00:00:00+00:00`,
    "dateModified": `${currentYear}-01-15T00:00:00+00:00`,
    "author": {
      "@type": "Organization",
      "name": "PromptWritingStudio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PromptWritingStudio",
      "url": "https://promptwritingstudio.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://promptwritingstudio.com/prompt-engineering-basics"
    }
  }

  return (
    <Layout>
      <Head>
        <title>Prompt Engineering Basics: Complete Beginner's Guide {currentYear} | PromptWritingStudio</title>
        <meta name="description" content="Master prompt engineering basics with our step-by-step guide. Learn fundamental techniques, see practical examples, and start automating business tasks with AI today." />
        <meta name="keywords" content="prompt engineering basics, prompt engineering tutorial, how to prompt AI, AI prompting guide, prompt engineering fundamentals, beginner prompt engineering" />
        <link rel="canonical" href="https://promptwritingstudio.com/prompt-engineering-basics" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <EnhancedMeta
        title={`Prompt Engineering Basics: Complete Beginner's Guide ${currentYear}`}
        description="Master prompt engineering basics with step-by-step tutorials, practical examples, and proven techniques for business automation."
        url="https://promptwritingstudio.com/prompt-engineering-basics"
        image="https://promptwritingstudio.com/images/prompt-engineering-basics-tutorial.jpg"
        type="article"
        publishedTime={`${currentYear}-01-15T00:00:00Z`}
        modifiedTime={`${currentYear}-01-15T00:00:00Z`}
      />

      <RichSnippets
        pageType="tutorial"
        title={`Prompt Engineering Basics: Complete Beginner's Guide ${currentYear}`}
        description="Step-by-step guide to mastering prompt engineering fundamentals"
        url="https://promptwritingstudio.com/prompt-engineering-basics"
        image="https://promptwritingstudio.com/images/prompt-engineering-basics-tutorial.jpg"
        howToSteps={howToSteps}
        faqItems={faqItems}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-100 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1A1A1A] leading-tight">
              Prompt Engineering Basics
            </h1>
            <p className="text-xl md:text-2xl text-[#333333] mb-8 leading-relaxed">
              Master the fundamentals of AI communication and start automating your business tasks today
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg mb-8">
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-2xl mr-2">🎓</span>
                <span>Beginner-Friendly</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-2xl mr-2">⚡</span>
                <span>Practical Examples</span>
              </div>
              <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-2xl mr-2">🛠️</span>
                <span>Ready-to-Use Templates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 rounded-xl mb-12">
              <h2 className="text-3xl font-bold mb-4">Quick Start: Your First Effective Prompt</h2>
              <p className="text-xl leading-relaxed mb-6">
                Transform this common mistake into a powerful business tool in 60 seconds:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-500 bg-opacity-20 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">❌ Vague Prompt:</h3>
                  <code className="text-sm">"Write an email"</code>
                </div>
                <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">✅ Effective Prompt:</h3>
                  <code className="text-sm">"Write a 100-word follow-up email to customers who viewed our pricing page but didn't purchase. Tone: helpful, not pushy. Include one benefit and a 15% discount offer."</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Fundamentals */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The 5 Fundamentals of Prompt Engineering</h2>
            
            <div className="space-y-8">
              {/* Fundamental 1 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-start space-x-6">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <span className="text-3xl">1️⃣</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Be Specific and Clear</h3>
                    <p className="text-gray-700 mb-6">
                      Vague instructions lead to unpredictable results. The more specific you are, the better your outputs will be.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-700 mb-2">❌ Too Vague:</h4>
                        <p className="text-sm">"Create marketing content"</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-700 mb-2">✅ Specific:</h4>
                        <p className="text-sm">"Create 3 Instagram captions for a fitness app, targeting working professionals aged 25-40, emphasizing time efficiency"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fundamental 2 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-start space-x-6">
                  <div className="bg-green-100 p-4 rounded-full">
                    <span className="text-3xl">2️⃣</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Provide Context</h3>
                    <p className="text-gray-700 mb-6">
                      Give the AI background information about your situation, audience, and goals.
                    </p>
                    
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                      <h4 className="font-bold mb-3">Context Template:</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• <strong>Role:</strong> "You are a [professional role] at a [company type]"</li>
                        <li>• <strong>Audience:</strong> "Writing for [target audience with demographics]"</li>
                        <li>• <strong>Purpose:</strong> "The goal is to [specific objective]"</li>
                        <li>• <strong>Constraints:</strong> "Keep it under [length] and avoid [restrictions]"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fundamental 3 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-start space-x-6">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <span className="text-3xl">3️⃣</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Define Output Format</h3>
                    <p className="text-gray-700 mb-6">
                      Specify exactly how you want the response structured. This ensures consistent, usable results.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-bold mb-2">📝 Text Format</h4>
                        <p className="text-xs">Paragraphs, bullet points, numbered lists, headlines</p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                        <h4 className="font-bold mb-2">📊 Data Format</h4>
                        <p className="text-xs">Tables, CSV, JSON, structured data</p>
                      </div>
                      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                        <h4 className="font-bold mb-2">🎨 Creative Format</h4>
                        <p className="text-xs">Scripts, templates, frameworks, outlines</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fundamental 4 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-start space-x-6">
                  <div className="bg-orange-100 p-4 rounded-full">
                    <span className="text-3xl">4️⃣</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Use Examples</h3>
                    <p className="text-gray-700 mb-6">
                      Show the AI what good output looks like. Examples are the fastest way to improve prompt performance.
                    </p>
                    
                    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-bold mb-3">Example Structure:</h4>
                      <p className="text-sm mb-3">"Here's an example of the format I want:"</p>
                      <div className="bg-white p-3 rounded border border-green-300">
                        <p className="text-xs font-mono">
                          <strong>Headline:</strong> [Benefit-focused title]<br/>
                          <strong>Problem:</strong> [Customer pain point]<br/>
                          <strong>Solution:</strong> [How you solve it]<br/>
                          <strong>CTA:</strong> [Clear next step]
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fundamental 5 */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-start space-x-6">
                  <div className="bg-red-100 p-4 rounded-full">
                    <span className="text-3xl">5️⃣</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Test and Iterate</h3>
                    <p className="text-gray-700 mb-6">
                      Great prompts aren't built overnight. Test, measure, and refine based on results.
                    </p>
                    
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="bg-blue-500 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl">🧪</span>
                        </div>
                        <h5 className="font-bold text-sm">Test</h5>
                        <p className="text-xs text-gray-600">Try your prompt</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-500 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl">📊</span>
                        </div>
                        <h5 className="font-bold text-sm">Measure</h5>
                        <p className="text-xs text-gray-600">Analyze results</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-purple-500 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl">🔧</span>
                        </div>
                        <h5 className="font-bold text-sm">Refine</h5>
                        <p className="text-xs text-gray-600">Improve prompt</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-orange-500 text-white p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
                          <span className="text-xl">🔄</span>
                        </div>
                        <h5 className="font-bold text-sm">Repeat</h5>
                        <p className="text-xs text-gray-600">Continuous improvement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Exercise Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Practice Exercise: Build Your First Business Prompt</h2>
            
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-xl mb-8">
              <h3 className="text-2xl font-bold mb-4">Scenario: Customer Support Email</h3>
              <p className="text-lg mb-4">
                Your e-commerce business receives complaints about delayed shipping. You need a template for support staff to respond professionally while retaining customers.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="text-xl font-bold mb-4">Step 1: Define Your Goal</h4>
                <p className="text-gray-700 mb-4">What do you want to achieve?</p>
                <div className="bg-white p-4 rounded-lg border border-gray-300">
                  <p className="text-sm">Create a professional, empathetic response that acknowledges the problem, provides a solution, and retains the customer relationship.</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h4 className="text-xl font-bold mb-4">Step 2: Build Your Prompt</h4>
                <p className="text-gray-700 mb-4">Apply the 5 fundamentals:</p>
                <div className="bg-white p-4 rounded-lg border border-gray-300">
                  <p className="text-sm font-mono">
                    "You are a customer service manager at an e-commerce company. Write a response email to a customer complaining about delayed shipping. 
                    <br/><br/>
                    Context: Customer ordered 5 days ago, expected delivery was yesterday, package is 2 days delayed due to weather.
                    <br/><br/>
                    Format: Professional email with subject line, greeting, acknowledgment, explanation, solution, and closing.
                    <br/><br/>
                    Tone: Empathetic but not overly apologetic, solution-focused.
                    <br/><br/>
                    Include: Tracking update, 15% discount code for next order, and direct contact information."
                  </p>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="text-xl font-bold mb-4">Why This Works</h4>
                <ul className="space-y-2 text-green-800">
                  <li>✅ Clear role and context</li>
                  <li>✅ Specific situation details</li>
                  <li>✅ Defined output format</li>
                  <li>✅ Tone guidance</li>
                  <li>✅ Required elements listed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Avoid These Common Beginner Mistakes</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 p-8 rounded-xl border border-red-200">
                <h3 className="text-2xl font-bold mb-4 text-red-700">❌ What NOT to Do</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold">Being Too Generic</h4>
                    <p className="text-sm text-red-600">"Write a blog post about marketing"</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold">Giving No Context</h4>
                    <p className="text-sm text-red-600">"Create an ad for my product"</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold">Expecting Mind Reading</h4>
                    <p className="text-sm text-red-600">"Make it sound professional"</p>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-bold">Not Testing Variations</h4>
                    <p className="text-sm text-red-600">Using the same prompt forever without optimization</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-8 rounded-xl border border-green-200">
                <h3 className="text-2xl font-bold mb-4 text-green-700">✅ Best Practices</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-bold">Be Hyper-Specific</h4>
                    <p className="text-sm text-green-600">Include audience, length, tone, and purpose</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-bold">Set the Scene</h4>
                    <p className="text-sm text-green-600">Provide industry, company type, and situation context</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-bold">Define Success</h4>
                    <p className="text-sm text-green-600">Specify exactly what good output looks like</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-bold">Iterate Systematically</h4>
                    <p className="text-sm text-green-600">Test one variable at a time and measure results</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready-to-Use Templates */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Apply What You've Learned?</h2>
            <p className="text-xl text-gray-700 mb-12">
              Use these tools to practice and implement prompt engineering in your business
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-blue-50 p-8 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold mb-4">🧮 Calculate Your Potential Savings</h3>
                <p className="text-gray-700 mb-6">
                  See exactly how much time and money you could save by implementing these prompt engineering basics in your content creation workflow.
                </p>
                <Link href="/calculators/content-creation-speed" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors inline-block">
                  Calculate Time Savings
                </Link>
              </div>

              <div className="bg-green-50 p-8 rounded-xl border border-green-200">
                <h3 className="text-xl font-bold mb-4">📚 Practice with Real Examples</h3>
                <p className="text-gray-700 mb-6">
                  Browse 500+ proven prompt examples organized by business function to see these basics in action.
                </p>
                <Link href="/ai-prompt-examples" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors inline-block">
                  View Prompt Library
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Master Advanced Techniques</h3>
              <p className="text-lg mb-6 opacity-90">
                Ready to go beyond the basics? Get the complete system with advanced strategies, industry-specific templates, and ongoing support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/prompt-vault" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  🔐 Get 50 Business Templates - $7
                </Link>
                <a 
                  href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                  className="bg-yellow-400 text-purple-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🚀 Complete Course - $25/month
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <EnhancedFAQSchema 
        faqs={faqItems}
        calculatorName="Prompt Engineering Basics Guide"
      />

      {/* Related Calculators */}
      <RelatedCalculators currentCalculator="/prompt-engineering-basics" />
    </Layout>
  )
} 