import Head from 'next/head'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { useState } from 'react'

export default function HowToImproveChatGPTPrompts() {
  const [activeExample, setActiveExample] = useState(0)

  const beforeAfterExamples = [
    {
      category: "Business Email",
      before: "Write an email to customers about our new product.",
      after: "Write a professional email to existing customers announcing our new project management software. Include: benefit-focused subject line, 3 key features, pricing details, limited-time 20% discount offer, and clear CTA button. Tone: friendly but professional. Length: 150-200 words.",
      improvement: "Added specific details, structure, tone guidance, and clear objectives."
    },
    {
      category: "Content Creation",
      before: "Create a blog post about AI.",
      after: "Write a 1,500-word blog post titled 'How AI is Transforming Small Business Operations in 2025' for small business owners. Include: introduction with statistics, 5 practical AI applications with real examples, implementation tips, cost considerations, and conclusion with action steps. Tone: informative yet accessible. Include relevant keywords for SEO.",
      improvement: "Specified length, audience, structure, tone, and SEO requirements."
    },
    {
      category: "Data Analysis",
      before: "Analyze this data.",
      after: "Analyze the attached sales data spreadsheet for Q4 2024. Identify: top 3 performing products, seasonal trends, geographic patterns, and underperforming areas. Provide actionable recommendations for Q1 2025 strategy. Format as executive summary with bullet points and charts suggestions.",
      improvement: "Defined specific analysis tasks, output format, and business context."
    },
    {
      category: "Creative Writing",
      before: "Write a story.",
      after: "Write a 500-word short story about a small business owner who discovers an AI tool that revolutionizes their operations. Setting: modern day coffee shop. Character: struggling entrepreneur named Maya. Tone: inspiring and optimistic. Include dialogue and a clear transformation arc.",
      improvement: "Added character details, setting, length, tone, and story structure."
    }
  ]

  const promptFrameworks = [
    {
      name: "CLEAR Framework",
      description: "A simple structure for better prompts",
      components: [
        { letter: "C", word: "Context", description: "Provide background and situation" },
        { letter: "L", word: "Length", description: "Specify desired output length" },
        { letter: "E", word: "Examples", description: "Include relevant examples" },
        { letter: "A", word: "Audience", description: "Define target audience" },
        { letter: "R", word: "Role", description: "Assign a specific role to AI" }
      ]
    },
    {
      name: "SMART Prompting",
      description: "Business-oriented prompt structure",
      components: [
        { letter: "S", word: "Specific", description: "Be precise about what you want" },
        { letter: "M", word: "Measurable", description: "Include measurable outcomes" },
        { letter: "A", word: "Actionable", description: "Request actionable insights" },
        { letter: "R", word: "Relevant", description: "Keep it relevant to your goals" },
        { letter: "T", word: "Time-bound", description: "Set context and timeframes" }
      ]
    }
  ]

  const commonMistakes = [
    {
      mistake: "Being too vague",
      example: "Help me with marketing",
      fix: "Create a 30-day social media content calendar for a B2B SaaS company targeting small businesses",
      icon: "🎯"
    },
    {
      mistake: "No role assignment",
      example: "Write about productivity",
      fix: "As a productivity consultant, write an article about time management for remote workers",
      icon: "👤"
    },
    {
      mistake: "Missing output format",
      example: "Analyze my website",
      fix: "Conduct a UX audit of my website and provide findings in a report with: issues list, priority ranking, and action steps",
      icon: "📋"
    },
    {
      mistake: "No context provided",
      example: "Create a strategy",
      fix: "Create a content marketing strategy for a 3-person startup launching a meal delivery app in Austin, Texas",
      icon: "🌐"
    },
    {
      mistake: "Forgetting constraints",
      example: "Write social media posts",
      fix: "Write 5 LinkedIn posts about AI trends, each 100-150 words, professional tone, include relevant hashtags",
      icon: "⚖️"
    }
  ]

  const advancedTechniques = [
    {
      technique: "Chain of Thought",
      description: "Ask AI to show its reasoning process",
      example: "Solve this pricing problem step by step, showing your reasoning at each stage: [problem details]",
      benefit: "More accurate and explainable results"
    },
    {
      technique: "Few-Shot Learning",
      description: "Provide examples of desired output",
      example: "Write product descriptions like these examples: [Example 1], [Example 2]. Now write one for: [your product]",
      benefit: "Consistent style and format"
    },
    {
      technique: "Persona Assignment",
      description: "Give AI a specific professional role",
      example: "You are a senior marketing director with 10 years of experience. Review this campaign proposal and provide feedback.",
      benefit: "More relevant and expert-level responses"
    },
    {
      technique: "Iterative Refinement",
      description: "Build on previous responses",
      example: "Take your previous analysis and now focus specifically on the financial implications for small businesses.",
      benefit: "Deeper, more focused insights"
    }
  ]

  return (
    <>
      <Head>
        <title>How to Improve ChatGPT Prompts: Complete Guide for Better AI Results</title>
        <meta name="description" content="Learn proven techniques to write better ChatGPT prompts. Get actionable tips, examples, and frameworks to improve AI response quality by up to 75%." />
        <meta name="keywords" content="improve ChatGPT prompts, better AI results, prompt engineering, ChatGPT tips, AI prompt writing guide" />
        <meta property="og:title" content="How to Improve ChatGPT Prompts: Complete Guide for Better AI Results" />
        <meta property="og:description" content="Master the art of prompt writing with proven techniques and examples. Transform your ChatGPT interactions with professional prompt engineering strategies." />
        <meta property="og:url" content="https://promptwritingstudio.com/how-to-improve-chatgpt-prompts" />
        <link rel="canonical" href="https://promptwritingstudio.com/how-to-improve-chatgpt-prompts" />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How to Improve ChatGPT Prompts: The Complete Guide
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Transform your AI interactions with proven prompt engineering techniques. Get up to 75% better results from ChatGPT with these expert strategies.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <p className="text-lg font-semibold mb-2">⚡ Pro Tip</p>
              <p className="text-sm text-blue-100">Use our free Chrome extension for instant prompt optimization</p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                <p className="text-gray-700">Better response quality</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
                <p className="text-gray-700">Less revision time</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">45%</div>
                <p className="text-gray-700">Faster task completion</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
                <p className="text-gray-700">User satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Examples */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">See the Difference: Before vs After</h2>
              <p className="text-gray-600 text-lg">Real examples of prompt improvements with measurable results</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {beforeAfterExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setActiveExample(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeExample === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {example.category}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-red-600">❌ Weak Prompt</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-gray-800">{beforeAfterExamples[activeExample].before}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Issues:</strong> Vague, no context, missing specifications
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-green-600">✅ Optimized Prompt</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-gray-800">{beforeAfterExamples[activeExample].after}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Improvements:</strong> {beforeAfterExamples[activeExample].improvement}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">5 Most Common Prompt Mistakes</h2>
              <p className="text-gray-600 text-lg">Avoid these errors that 80% of users make</p>
            </div>

            <div className="space-y-6">
              {commonMistakes.map((mistake, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{mistake.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">
                        Mistake #{index + 1}: {mistake.mistake}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-red-600 mb-2">❌ Poor Example:</h4>
                          <div className="bg-red-50 border border-red-200 rounded p-3 text-sm">
                            "{mistake.example}"
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-green-600 mb-2">✅ Better Version:</h4>
                          <div className="bg-green-50 border border-green-200 rounded p-3 text-sm">
                            "{mistake.fix}"
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prompt Frameworks */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Professional Prompt Frameworks</h2>
              <p className="text-gray-600 text-lg">Proven structures used by prompt engineering experts</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {promptFrameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-3 text-blue-600">{framework.name}</h3>
                  <p className="text-gray-600 mb-6">{framework.description}</p>
                  
                  <div className="space-y-4">
                    {framework.components.map((component, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {component.letter}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{component.word}</h4>
                          <p className="text-sm text-gray-600">{component.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Techniques */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Advanced Prompt Engineering Techniques</h2>
              <p className="text-gray-600 text-lg">Professional strategies for complex tasks</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {advancedTechniques.map((technique, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{technique.technique}</h3>
                  <p className="text-gray-700 mb-4">{technique.description}</p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
                    <h4 className="font-medium text-blue-800 mb-2">Example:</h4>
                    <p className="text-sm text-blue-700 italic">"{technique.example}"</p>
                  </div>
                  
                  <div className="text-sm text-green-700">
                    <strong>Benefit:</strong> {technique.benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Step-by-Step Prompt Improvement Process</h2>
              <p className="text-gray-600 text-lg">Follow this process for any prompt optimization</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Define Your Objective</h3>
                    <p className="text-gray-700 mb-3">Clearly state what you want to achieve. Be specific about the desired outcome, format, and use case.</p>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      <strong>Example:</strong> "I need a professional email template to re-engage inactive customers for my SaaS business."
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Add Context and Constraints</h3>
                    <p className="text-gray-700 mb-3">Provide background information, target audience, length requirements, tone, and any specific constraints.</p>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      <strong>Example:</strong> "For B2B customers who haven't logged in for 30+ days. Email should be 150-200 words, professional but friendly tone."
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Assign a Role</h3>
                    <p className="text-gray-700 mb-3">Give ChatGPT a specific professional role or expertise level to improve response quality.</p>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      <strong>Example:</strong> "You are an experienced email marketing specialist with expertise in SaaS customer retention."
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Specify Output Format</h3>
                    <p className="text-gray-700 mb-3">Clearly describe how you want the response structured and formatted.</p>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      <strong>Example:</strong> "Include: compelling subject line, personalized greeting, value reminder, specific re-engagement offer, and clear CTA button text."
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">5</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Test and Iterate</h3>
                    <p className="text-gray-700 mb-3">Review the output, identify areas for improvement, and refine your prompt accordingly.</p>
                    <div className="bg-blue-50 p-3 rounded text-sm">
                      <strong>Tip:</strong> Ask follow-up questions like "Make this more persuasive" or "Adjust tone to be more urgent."
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Tools to Improve Your Prompts</h2>
              <p className="text-gray-600 text-lg">Get instant optimization and better results</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-3">Chrome Extension</h3>
                <p className="text-gray-700 mb-4">Real-time prompt optimization while you type. Works with ChatGPT, Claude, and more.</p>
                <a 
                  href="/chrome-extension"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                >
                  Install Free
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-3">Prompt Generator</h3>
                <p className="text-gray-700 mb-4">Create optimized prompts for any use case with our intelligent prompt builder.</p>
                <a 
                  href="/ai-prompt-generator"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-block"
                >
                  Try Now
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="text-3xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-3">Template Library</h3>
                <p className="text-gray-700 mb-4">Access 500+ professional prompt templates for business, marketing, and more.</p>
                <a 
                  href="/ai-prompt-examples"
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-block"
                >
                  Browse Templates
                </a>
              </div>
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
                <h3 className="text-xl font-semibold mb-3">How long should a good ChatGPT prompt be?</h3>
                <p className="text-gray-700">
                  There's no strict rule, but effective prompts are typically 50-200 words. The key is including all necessary context and instructions while staying focused. Longer prompts are fine if they add value.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Should I use technical jargon in my prompts?</h3>
                <p className="text-gray-700">
                  Use technical terms when they're relevant to your task, but avoid unnecessary jargon. ChatGPT understands technical language well, so be as specific as needed for your use case.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">How do I get consistent results from ChatGPT?</h3>
                <p className="text-gray-700">
                  Use consistent prompt structure, provide clear examples of desired output, and specify tone, format, and style preferences. Create templates for recurring tasks.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">What if ChatGPT doesn't understand my prompt?</h3>
                <p className="text-gray-700">
                  Break complex requests into smaller steps, provide more context, use clearer language, or rephrase your request. You can also ask ChatGPT to explain what it understood from your prompt.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Start Getting Better AI Results Today</h2>
            <p className="text-xl mb-8 text-blue-100">
              Apply these techniques or use our tools for instant prompt optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/chrome-extension"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Free Chrome Extension
              </a>
              <a 
                href="/ai-prompt-generator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Prompt Generator
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 