import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { seoUseCases } from '../../data/seo-use-cases'

export default function UseCasePromptPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [useCaseData, setUseCaseData] = useState(null);
  const [copiedPrompt, setCopiedPrompt] = useState(null);
  
  // Set use case data based on slug
  useEffect(() => {
    if (slug) {
      const data = seoUseCases.find(useCase => useCase.slug === slug);
      if (data) {
        setUseCaseData(data);
      }
    }
  }, [slug]);
  
  // Copy prompt to clipboard
  const copyToClipboard = (prompt, promptTitle) => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(promptTitle);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };
  
  // If page is not yet loaded or use case not found
  if (!useCaseData) {
    return (
      <Layout
        title="AI Prompt Generator | Create Optimized Prompts for ChatGPT, Claude & Gemini"
        description="Build effective AI prompts using best practices from OpenAI, Anthropic, and Google. Our AI prompt generator helps you create optimized prompts for ChatGPT, Claude, and Gemini."
      >
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Loading...</h1>
          <p>Please wait while we prepare your prompt generator.</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout
      title={useCaseData.title}
      description={useCaseData.description}
    >
      {/* Hero Section */}
              <section className="bg-[#1A1A1A] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {useCaseData.h1}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            {useCaseData.intro}
          </p>
          <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-[#333333] text-lg">
              {useCaseData.conceptDescription}
            </p>
          </div>
          
          {/* Course CTA Button */}
          <div className="text-center">
            <p className="text-lg mb-4 text-white">Want to master AI prompts like a pro?</p>
            <Link 
              href="/course" 
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200 font-semibold inline-block"
            >
              Join Prompt Writing Studio Course
            </Link>
            <p className="text-sm text-gray-300 mt-3">Learn to create powerful AI prompts that get results</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Ready-to-Use Prompts */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Ready-to-Use AI Prompts for {useCaseData.h1.replace('AI Prompts for ', '').replace('AI ', '')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Example Prompts */}
              {useCaseData.examplePrompts ? (
                useCaseData.examplePrompts.map((prompt, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#FFDE59]">
                    <h3 className="text-xl font-bold mb-3">{prompt.title}</h3>
                    <p className="text-gray-600 mb-4">{prompt.description}</p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{prompt.prompt}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(prompt.prompt, prompt.title)}
                      className="w-full bg-[#FFDE59] text-[#1A1A1A] py-2 px-4 rounded-lg hover:bg-[#E5C84F] transition-colors duration-200 font-semibold"
                    >
                      {copiedPrompt === prompt.title ? 'Copied!' : 'Copy Prompt'}
                    </button>
                  </div>
                ))
              ) : (
                // Fallback to generic prompts based on use case
                getGenericPrompts(useCaseData.slug).map((prompt, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-[#FFDE59]">
                    <h3 className="text-xl font-bold mb-3">{prompt.title}</h3>
                    <p className="text-gray-600 mb-4">{prompt.description}</p>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{prompt.prompt}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(prompt.prompt, prompt.title)}
                      className="w-full bg-[#FFDE59] text-[#1A1A1A] py-2 px-4 rounded-lg hover:bg-[#E5C84F] transition-colors duration-200 font-semibold"
                    >
                      {copiedPrompt === prompt.title ? 'Copied!' : 'Copy Prompt'}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">How to Use These Prompts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-[#F9F9F9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1A1A1A]">1</span>
                </div>
                <h3 className="font-semibold mb-2">Copy the Prompt</h3>
                <p className="text-gray-600">Click the "Copy Prompt" button to copy the prompt to your clipboard.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#F9F9F9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1A1A1A]">2</span>
                </div>
                <h3 className="font-semibold mb-2">Paste in AI Tool</h3>
                <p className="text-gray-600">Paste the prompt into ChatGPT, Claude, Gemini, or your preferred AI tool.</p>
              </div>
              <div className="text-center">
                <div className="bg-[#F9F9F9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#1A1A1A]">3</span>
                </div>
                <h3 className="font-semibold mb-2">Customize & Use</h3>
                <p className="text-gray-600">Fill in the bracketed sections with your specific information and get results!</p>
              </div>
            </div>
          </div>

          {/* Related Use Cases */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Explore More AI Prompt Use Cases</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {seoUseCases
                .filter(useCase => useCase.slug !== slug)
                .slice(0, 6)
                .map((useCase) => (
                  <Link
                    key={useCase.slug}
                    href={`/ai-prompt-generator/${useCase.slug}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200"
                  >
                    <h4 className="font-semibold text-gray-900 mb-2">{useCase.h1}</h4>
                    <p className="text-sm text-gray-600">{useCase.intro.substring(0, 100)}...</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Helper function to generate generic prompts based on use case
function getGenericPrompts(slug) {
  const basePrompts = {
    'ai-prompts-for-resume': [
      {
        title: "Resume Summary Generator",
        description: "Create a compelling professional summary for your resume",
        prompt: "Write a professional resume summary for a [YOUR PROFESSION] with [X YEARS] of experience in [INDUSTRY]. My key skills include [SKILL 1], [SKILL 2], and [SKILL 3]. I have experience with [RELEVANT ACHIEVEMENTS]. Make it compelling and tailored for [TARGET POSITION]."
      },
      {
        title: "Resume Bullet Point Enhancer",
        description: "Transform basic job descriptions into achievement-focused bullet points",
        prompt: "Transform these job responsibilities into powerful, achievement-focused resume bullet points: [LIST YOUR RESPONSIBILITIES]. For context, I was a [JOB TITLE] at [COMPANY TYPE/INDUSTRY]. Use the formula: Action verb + Task + Result/Impact. Include metrics where possible."
      },
      {
        title: "Skills Section Optimizer",
        description: "Create a tailored skills section based on job requirements",
        prompt: "Based on this job description: [PASTE JOB DESCRIPTION], create an optimized Skills section for my resume. Include both technical and soft skills that are relevant. Organize into categories like Technical Skills, Soft Skills, and Industry Knowledge."
      }
    ],
    'ai-prompts-for-business': [
      {
        title: "Business Plan Generator",
        description: "Create a comprehensive business plan outline",
        prompt: "Help me create a business plan for [BUSINESS IDEA]. Include sections for Executive Summary, Market Analysis, Marketing Strategy, Operations Plan, and Financial Projections. Focus on [SPECIFIC INDUSTRY] and target market of [TARGET AUDIENCE]."
      },
      {
        title: "Marketing Strategy Creator",
        description: "Develop a marketing strategy for your business",
        prompt: "Create a marketing strategy for my [BUSINESS TYPE] business. My target audience is [TARGET AUDIENCE] and I want to focus on [GOAL - e.g., brand awareness, lead generation, sales]. Include digital marketing, content strategy, and budget considerations."
      },
      {
        title: "Customer Persona Builder",
        description: "Define your ideal customer profile",
        prompt: "Help me create a detailed customer persona for my [BUSINESS TYPE] business. Include demographics, psychographics, pain points, goals, and buying behavior. My target market is [DESCRIBE YOUR TARGET MARKET]."
      }
    ],
    'ai-prompts-for-marketing': [
      {
        title: "Social Media Content Calendar",
        description: "Plan your social media content strategy",
        prompt: "Create a 30-day social media content calendar for [BUSINESS TYPE]. Include content themes, post types, best posting times, and engagement strategies. Focus on platforms like [PLATFORMS] and target audience of [TARGET AUDIENCE]."
      },
      {
        title: "Email Marketing Campaign",
        description: "Design an email marketing campaign",
        prompt: "Design an email marketing campaign for [CAMPAIGN PURPOSE]. Target audience is [TARGET AUDIENCE]. Include subject lines, email content, call-to-action, and follow-up sequence. Goal is to [SPECIFIC GOAL]."
      },
      {
        title: "Content Marketing Strategy",
        description: "Develop a content marketing plan",
        prompt: "Create a content marketing strategy for [BUSINESS TYPE]. Target audience is [TARGET AUDIENCE]. Include content types, publishing schedule, distribution channels, and success metrics. Focus on [CONTENT GOALS]."
      }
    ],
    'ai-prompts-for-sales': [
      {
        title: "Sales Pitch Creator",
        description: "Craft a compelling sales pitch",
        prompt: "Create a sales pitch for [PRODUCT/SERVICE]. Target audience is [TARGET AUDIENCE]. Include problem identification, solution presentation, value proposition, and call-to-action. Focus on [KEY BENEFITS] and address [COMMON OBJECTIONS]."
      },
      {
        title: "Follow-up Email Templates",
        description: "Create follow-up email sequences for sales",
        prompt: "Create 3 follow-up email templates for [PRODUCT/SERVICE] sales. Include initial follow-up, value-add follow-up, and final follow-up. Tone should be [TONE - professional, friendly, etc.] and focus on [VALUE PROPOSITION]."
      },
      {
        title: "Objection Handling Guide",
        description: "Prepare responses to common sales objections",
        prompt: "Help me prepare responses to common sales objections for [PRODUCT/SERVICE]. Common objections include [LIST OBJECTIONS]. For each objection, provide a response that acknowledges the concern and presents a solution."
      }
    ]
  };
  
  // Return prompts for the specific slug, or default prompts
  return basePrompts[slug] || [
    {
      title: "General AI Assistant",
      description: "Get help with any task using AI",
      prompt: "You are a helpful AI assistant. Help me with [DESCRIBE YOUR TASK OR QUESTION]. Provide detailed, actionable advice and examples where helpful."
    },
    {
      title: "Content Creator",
      description: "Generate creative content for your needs",
      prompt: "Help me create [TYPE OF CONTENT] about [TOPIC]. Target audience is [AUDIENCE]. Include [SPECIFIC ELEMENTS]. Make it engaging and informative."
    },
    {
      title: "Problem Solver",
      description: "Get help solving a specific problem",
      prompt: "I'm facing this challenge: [DESCRIBE YOUR PROBLEM]. Context: [ADDITIONAL CONTEXT]. Please help me brainstorm solutions and provide actionable steps to resolve this."
    }
  ];
} 
