import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout/Layout'
import Link from 'next/link'
import { 
  useCaseTemplates, 
  generateFromUseCase 
} from '../../../data/prompt-generator-components'

// Map URL slugs to use case IDs
const useCaseMap = {
  'blog-post': 'blogPost',
  'product-description': 'productDescription',
  'marketing-email': 'emailCampaign',
  'social-media-content': 'socialMediaPost',
  'seo-content': 'seoContent'
};

// SEO metadata for each use case
const useCaseSeoData = {
  'blogPost': {
    title: 'Blog Post AI Prompt Generator | ChatGPT, Claude & Gemini',
    description: 'Create optimized AI prompts for blog post writing. Our generator builds effective prompts for ChatGPT, Claude, and Gemini based on official best practices.',
    h1: 'Blog Post AI Prompt Generator',
    intro: 'Create effective AI prompts specifically designed for writing blog posts. Our generator helps you craft prompts that get better results from ChatGPT, Claude, and Gemini.',
    benefits: [
      'Save hours of writing time with AI-assisted blog creation',
      'Maintain your authentic voice while leveraging AI capabilities',
      'Create comprehensive, well-structured blog content that engages readers',
      'Optimize your prompts based on official best practices from OpenAI, Anthropic, and Google'
    ],
    keywords: ['blog post AI prompt', 'ChatGPT blog writing', 'AI blog generator', 'content creation prompts']
  },
  'productDescription': {
    title: 'Product Description AI Prompt Generator | ChatGPT, Claude & Gemini',
    description: 'Create compelling product descriptions with AI. Our generator builds effective prompts for ChatGPT, Claude, and Gemini based on official best practices.',
    h1: 'Product Description AI Prompt Generator',
    intro: 'Create effective AI prompts specifically designed for writing persuasive product descriptions. Our generator helps you craft prompts that get better results from ChatGPT, Claude, and Gemini.',
    benefits: [
      'Create compelling product descriptions that convert browsers to buyers',
      'Highlight key features and benefits in a persuasive way',
      'Maintain consistent brand voice across all product listings',
      'Save time while scaling your product content creation'
    ],
    keywords: ['product description AI', 'ChatGPT product content', 'AI product copy', 'ecommerce writing prompts']
  },
  'emailCampaign': {
    title: 'Marketing Email AI Prompt Generator | ChatGPT, Claude & Gemini',
    description: 'Create effective marketing emails with AI. Our generator builds optimized prompts for ChatGPT, Claude, and Gemini based on official best practices.',
    h1: 'Marketing Email AI Prompt Generator',
    intro: 'Create effective AI prompts specifically designed for writing marketing emails. Our generator helps you craft prompts that get better results from ChatGPT, Claude, and Gemini.',
    benefits: [
      'Create engaging marketing emails that drive action',
      'Craft compelling subject lines that improve open rates',
      'Develop email sequences for nurturing campaigns',
      'Save time while maintaining your brand voice'
    ],
    keywords: ['email marketing AI', 'ChatGPT email writing', 'AI email generator', 'marketing email prompts']
  },
  'socialMediaPost': {
    title: 'Social Media AI Prompt Generator | ChatGPT, Claude & Gemini',
    description: 'Create engaging social media content with AI. Our generator builds effective prompts for ChatGPT, Claude, and Gemini based on official best practices.',
    h1: 'Social Media Content AI Prompt Generator',
    intro: 'Create effective AI prompts specifically designed for writing social media posts. Our generator helps you craft prompts that get better results from ChatGPT, Claude, and Gemini.',
    benefits: [
      'Create platform-optimized content for Instagram, Twitter, LinkedIn, and Facebook',
      'Generate multiple post variations from a single prompt',
      'Maintain your authentic voice across social platforms',
      'Save hours of content creation time'
    ],
    keywords: ['social media AI', 'ChatGPT social posts', 'AI content creator', 'social media prompts']
  },
  'seoContent': {
    title: 'SEO Content AI Prompt Generator | ChatGPT, Claude & Gemini',
    description: 'Create search-optimized content with AI. Our generator builds effective prompts for ChatGPT, Claude, and Gemini based on official best practices.',
    h1: 'SEO Content AI Prompt Generator',
    intro: 'Create effective AI prompts specifically designed for writing SEO-optimized content. Our generator helps you craft prompts that get better results from ChatGPT, Claude, and Gemini.',
    benefits: [
      'Create content that ranks well in search engines',
      'Balance SEO optimization with engaging writing',
      'Generate comprehensive content that covers your topic thoroughly',
      'Save time while creating high-quality, search-friendly content'
    ],
    keywords: ['SEO content AI', 'ChatGPT SEO writing', 'AI SEO generator', 'search optimized prompts']
  }
};

export default function UseCasePromptGenerator() {
  const router = useRouter();
  const { slug: useCaseSlug } = router.query;
  
  const [useCaseId, setUseCaseId] = useState('');
  const [useCaseVariables, setUseCaseVariables] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [seoData, setSeoData] = useState(null);
  
  // Set use case ID based on slug
  useEffect(() => {
    if (useCaseSlug && useCaseMap[useCaseSlug]) {
      const id = useCaseMap[useCaseSlug];
      setUseCaseId(id);
      setSeoData(useCaseSeoData[id]);
    }
  }, [useCaseSlug]);
  
  // Reset use case variables when use case changes
  useEffect(() => {
    setUseCaseVariables({});
    setGeneratedPrompt('');
  }, [useCaseId]);
  
  // Handle use case variable changes
  const handleVariableChange = (variableId, value) => {
    setUseCaseVariables(prev => ({
      ...prev,
      [variableId]: value
    }));
  };
  
  // Generate prompt from use case template
  const handleGeneratePrompt = () => {
    const result = generateFromUseCase(
      useCaseId,
      useCaseVariables
    );
    setGeneratedPrompt(result.prompt);
  };
  
  // Copy prompt to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };
  
  // Get variables for the selected use case
  const getUseCaseVariables = () => {
    if (!useCaseId) return [];
    
    const useCase = useCaseTemplates[useCaseId];
    if (!useCase) return [];
    
    return useCase.variables;
  };
  
  // If page is not yet loaded or use case not found
  if (!useCaseId || !useCaseTemplates[useCaseId] || !seoData) {
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
      title={seoData.title}
      description={seoData.description}
    >
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {seoData.h1}
            </h1>
            <p className="text-xl mb-8">
              {seoData.intro}
            </p>
            <Link
              href="/ai-prompt-generator"
              className="bg-white text-[#1A1A1A] px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200 inline-block"
            >
              View All Prompt Templates
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Benefits of Using Our {useCaseTemplates[useCaseId].name} Prompt Generator
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {seoData.benefits.map((benefit, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-[#FFDE59] rounded-full p-2 mr-4">
                      <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="text-gray-800">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Generator Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Generate Your {useCaseTemplates[useCaseId].name} Prompt
            </h2>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Left Panel - Controls */}
                <div className="md:w-1/2 p-6 md:p-8 border-r border-gray-200">
                  <h3 className="text-xl font-semibold mb-6">
                    Customize Your Prompt
                  </h3>
                  
                  {/* Use Case Variables */}
                  <div className="space-y-6">
                    {getUseCaseVariables().map(variable => (
                      <div key={variable.id} className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                          {variable.name}
                          {variable.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        
                        {variable.inputType === 'textarea' ? (
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                            rows="4"
                            placeholder={variable.placeholder}
                            value={useCaseVariables[variable.id] || ''}
                            onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                          />
                        ) : variable.inputType === 'select' ? (
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                            value={useCaseVariables[variable.id] || ''}
                            onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                          >
                            <option value="">Select an option</option>
                            {variable.options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                            placeholder={variable.placeholder}
                            value={useCaseVariables[variable.id] || ''}
                            onChange={(e) => handleVariableChange(variable.id, e.target.value)}
                          />
                        )}
                        
                        <p className="text-sm text-gray-500 mt-1">{variable.description}</p>
                      </div>
                    ))}
                    
                    <button
                      onClick={handleGeneratePrompt}
                      className="w-full bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
                    >
                      Generate Prompt
                    </button>
                  </div>
                </div>
                
                {/* Right Panel - Generated Prompt */}
                <div className="md:w-1/2 p-6 md:p-8 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Your Generated Prompt</h3>
                    {generatedPrompt && (
                      <button
                        onClick={copyToClipboard}
                        className="text-[#1A1A1A] px-4 py-2 rounded-md bg-[#FFDE59] hover:bg-[#E5C84F] transition-colors duration-200 flex items-center"
                      >
                        {copiedToClipboard ? (
                          <>
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                            </svg>
                            Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  
                  {generatedPrompt ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 h-[500px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-mono text-sm">{generatedPrompt}</pre>
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 h-[500px] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                        <h3 className="text-lg font-medium mb-2">No Prompt Generated Yet</h3>
                        <p>Fill in the form and click "Generate Prompt" to create your AI prompt.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Templates Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Explore Related Prompt Templates
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(useCaseMap)
                .filter(([slug, id]) => id !== useCaseId)
                .slice(0, 3)
                .map(([slug, id]) => (
                  <Link 
                    key={slug}
                    href={`/ai-prompt-generator/use-case/${slug}`}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-xl font-semibold mb-2">{useCaseTemplates[id].name}</h3>
                    <p className="text-gray-700 mb-4">{useCaseTemplates[id].description}</p>
                    <span className="text-[#1A1A1A] font-medium hover:underline">
                      Try this template →
                    </span>
                  </Link>
                ))}
            </div>
            
            <div className="text-center mt-8">
              <Link
                href="/ai-prompt-generator"
                className="text-[#1A1A1A] font-medium hover:underline"
              >
                View all prompt templates →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on use cases
  const paths = Object.keys(useCaseMap).map(slug => ({
    params: { slug }
  }));
  
  return { paths, fallback: false };
}

// This function gets called at build time
export async function getStaticProps({ params }) {
  const useCaseSlug = params.slug;
  
  // Check if this is a valid use case
  if (!useCaseMap[useCaseSlug]) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {}
  };
}


