import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout/Layout'
import Link from 'next/link'
import { seoUseCases } from '../../../data/seo-use-cases'
import { 
  promptComponents, 
  platformTemplates, 
  generatePrompt 
} from '../../../data/prompt-generator-components'

export default function SeoPromptGenerator() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [useCaseData, setUseCaseData] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('openai');
  const [selectedTemplate, setSelectedTemplate] = useState('detailed');
  const [componentValues, setComponentValues] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  // Set use case data based on slug
  useEffect(() => {
    if (slug) {
      const data = seoUseCases.find(useCase => useCase.slug === slug);
      if (data) {
        setUseCaseData(data);
        
        // Set default platform based on the slug if it's a platform-specific page
        if (slug === 'chatgpt-prompt') setSelectedPlatform('openai');
        if (slug === 'claude-prompt') setSelectedPlatform('anthropic');
        if (slug === 'gemini-prompt') setSelectedPlatform('google');
      }
    }
  }, [slug]);
  
  // Reset component values when platform or template changes
  useEffect(() => {
    setComponentValues({});
    setGeneratedPrompt('');
  }, [selectedPlatform, selectedTemplate]);
  
  // Handle component value changes
  const handleComponentChange = (componentId, value) => {
    setComponentValues(prev => ({
      ...prev,
      [componentId]: value
    }));
  };
  
  // Generate prompt from platform template
  const handleGeneratePrompt = () => {
    const prompt = generatePrompt(
      selectedPlatform,
      selectedTemplate,
      componentValues
    );
    setGeneratedPrompt(prompt);
  };
  
  // Copy prompt to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };
  
  // Get components for the selected template
  const getTemplateComponents = () => {
    if (!selectedPlatform || !selectedTemplate) return [];
    
    const template = platformTemplates[selectedPlatform][selectedTemplate];
    if (!template) return [];
    
    return template.components.map(componentId => promptComponents[componentId]);
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
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {useCaseData.h1}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto">
            {useCaseData.intro}
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg">
              {useCaseData.conceptDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Platform & Template Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h2 className="text-2xl font-bold mb-6">Configure Your Prompt</h2>
                
                {/* Platform Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AI Platform
                  </label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="openai">ChatGPT (OpenAI)</option>
                    <option value="anthropic">Claude (Anthropic)</option>
                    <option value="google">Gemini (Google)</option>
                  </select>
                </div>

                {/* Template Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Style
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="detailed">Detailed & Comprehensive</option>
                    <option value="concise">Concise & Direct</option>
                    <option value="creative">Creative & Engaging</option>
                    <option value="professional">Professional & Formal</option>
                  </select>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGeneratePrompt}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  Generate Optimized Prompt
                </button>
              </div>
            </div>

            {/* Right Column - Component Configuration & Generated Prompt */}
            <div className="lg:col-span-2">
              {/* Component Configuration */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Customize Your Prompt</h3>
                <div className="space-y-4">
                  {getTemplateComponents().map((component) => (
                    <div key={component.id} className="border border-gray-200 rounded-lg p-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {component.label}
                      </label>
                      {component.type === 'textarea' ? (
                        <textarea
                          value={componentValues[component.id] || ''}
                          onChange={(e) => handleComponentChange(component.id, e.target.value)}
                          placeholder={component.placeholder}
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <input
                          type="text"
                          value={componentValues[component.id] || ''}
                          onChange={(e) => handleComponentChange(component.id, e.target.value)}
                          placeholder={component.placeholder}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                      {component.description && (
                        <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Prompt */}
              {generatedPrompt && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Your Optimized Prompt</h3>
                    <button
                      onClick={copyToClipboard}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {copiedToClipboard ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800">{generatedPrompt}</pre>
                  </div>
                </div>
              )}

              {/* Related Use Cases */}
              <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
                <h3 className="text-xl font-bold mb-4">Related AI Prompt Use Cases</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {seoUseCases
                    .filter(useCase => useCase.slug !== slug)
                    .slice(0, 6)
                    .map((useCase) => (
                      <Link
                        key={useCase.slug}
                        href={`/ai-prompt-generator/${useCase.slug}`}
                        className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">{useCase.h1}</h4>
                        <p className="text-sm text-gray-600">{useCase.intro.substring(0, 100)}...</p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 
