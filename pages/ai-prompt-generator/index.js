import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { seoUseCases } from '../../data/seo-use-cases'
import { 
  promptComponents, 
  platformTemplates, 
  generatePrompt 
} from '../../data/prompt-generator-components'
import CustomTemplateBuilder from '../../components/ui/CustomTemplateBuilder'
import YouTubeVideoSection from '../../components/ui/YouTubeVideoSection'

export default function AIPromptGenerator() {
  const [selectedPlatform, setSelectedPlatform] = useState('openai');
  const [selectedTemplate, setSelectedTemplate] = useState('detailed');
  const [componentValues, setComponentValues] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [activeTab, setActiveTab] = useState('generator'); // 'generator', 'builder'
  const [customTemplates, setCustomTemplates] = useState([]);
  const [showCustomTemplates, setShowCustomTemplates] = useState(false);
  
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
    let prompt;
    
    if (selectedTemplate.startsWith('custom_')) {
      // Handle custom template
      const templateName = selectedTemplate.replace('custom_', '').replace(/_/g, ' ');
      const customTemplate = customTemplates.find(t => t.name.toLowerCase() === templateName);
      
      if (customTemplate) {
        // Use Handlebars to process custom template
        const Handlebars = require('handlebars');
        try {
          const compiledTemplate = Handlebars.compile(customTemplate.template);
          prompt = compiledTemplate(componentValues);
        } catch (error) {
          console.error('Error compiling custom template:', error);
          prompt = `Error generating prompt: ${error.message}`;
        }
      } else {
        prompt = 'Custom template not found';
      }
    } else {
      // Handle built-in template
      prompt = generatePrompt(
        selectedPlatform,
        selectedTemplate,
        componentValues
      );
    }
    
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
    if (!selectedTemplate) return [];
    
    let template;
    
    // Check if it's a custom template
    if (selectedTemplate.startsWith('custom_')) {
      const templateName = selectedTemplate.replace('custom_', '').replace(/_/g, ' ');
      template = customTemplates.find(t => t.name.toLowerCase() === templateName);
    } else {
      // Built-in template
      if (!selectedPlatform) return [];
      template = platformTemplates[selectedPlatform][selectedTemplate];
    }
    
    if (!template) return [];
    
    return template.components.map(componentId => promptComponents[componentId]).filter(Boolean);
  };

  // Load custom templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('customTemplates');
    if (saved) {
      try {
        setCustomTemplates(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load custom templates:', e);
      }
    }
  }, []);

  // Save custom templates to localStorage
  const saveTemplates = (templates) => {
    try {
      localStorage.setItem('customTemplates', JSON.stringify(templates));
      setCustomTemplates(templates);
    } catch (e) {
      console.error('Failed to save custom templates:', e);
    }
  };

  // Handle new custom template creation
  const handleTemplateCreated = (newTemplate) => {
    const updatedTemplates = [...customTemplates, newTemplate];
    saveTemplates(updatedTemplates);
    setActiveTab('generator');
    alert('Template saved successfully! You can find it in the custom templates section.');
  };

  // Get available templates (built-in + custom)
  const getAvailableTemplates = () => {
    const builtInTemplates = selectedPlatform ? platformTemplates[selectedPlatform] : {};
    const customTemplateMap = {};
    
    customTemplates.forEach(template => {
      customTemplateMap[`custom_${template.name.replace(/\s+/g, '_').toLowerCase()}`] = template;
    });

    return { ...builtInTemplates, ...customTemplateMap };
  };
  
  return (
    <Layout
      title="AI Prompt Generator | Create Optimized Prompts for ChatGPT, Claude & Gemini"
      description="Build effective AI prompts using best practices from OpenAI, Anthropic, and Google. Our AI prompt generator helps you create optimized prompts for ChatGPT, Claude, and Gemini."
    >
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Prompt Generator
            </h1>
            <p className="text-xl mb-8">
              Create effective prompts for ChatGPT, Claude, and Gemini using official best practices from OpenAI, Anthropic, and Google.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#generator"
                className="bg-white text-[#1A1A1A] px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200"
              >
                Start Generating
              </a>
              <a
                href="#use-cases"
                className="bg-opacity-20 bg-white hover:bg-opacity-30 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                View Specialized Generators
              </a>
              <Link
                href="/ai-prompt-examples"
                className="bg-opacity-20 bg-white hover:bg-opacity-30 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Browse 101 Prompt Examples
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Use This Generator Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Use Our AI Prompt Generator?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-[#FFDE59] rounded-full p-2 mr-4">
                    <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-800">Based on official best practices from AI providers</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-[#FFDE59] rounded-full p-2 mr-4">
                    <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-800">100% free with no sign-up required</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-[#FFDE59] rounded-full p-2 mr-4">
                    <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-800">Works with all major AI platforms and models</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start">
                  <div className="bg-[#FFDE59] rounded-full p-2 mr-4">
                    <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="text-gray-800">Customizable templates for different use cases</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Generator Section */}
      <section id="generator" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Generate Your AI Prompt
            </h2>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 justify-center" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('generator')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'generator'
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Use Templates
                  </button>
                  <button
                    onClick={() => setActiveTab('builder')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'builder'
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Build Custom Template
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'generator' && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Left Panel - Controls */}
                <div className="md:w-1/2 p-6 md:p-8 border-r border-gray-200">
                  <h3 className="text-xl font-semibold mb-6">
                    Customize Your Prompt
                  </h3>
                  
                  {/* Platform Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Select AI Platform</label>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedPlatform('openai')}
                        className={`px-4 py-2 rounded-md ${
                          selectedPlatform === 'openai'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        ChatGPT
                      </button>
                      <button
                        onClick={() => setSelectedPlatform('anthropic')}
                        className={`px-4 py-2 rounded-md ${
                          selectedPlatform === 'anthropic'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        Claude
                      </button>
                      <button
                        onClick={() => setSelectedPlatform('google')}
                        className={`px-4 py-2 rounded-md ${
                          selectedPlatform === 'google'
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        Gemini
                      </button>
                    </div>
                  </div>
                  
                  {/* Template Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Select Template Type</label>
                    
                    {/* Built-in Templates */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-600 mb-2">Built-in Templates</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedPlatform && Object.entries(platformTemplates[selectedPlatform]).map(([id, template]) => (
                          <button
                            key={id}
                            onClick={() => setSelectedTemplate(id)}
                            className={`px-4 py-2 rounded-md ${
                              selectedTemplate === id
                                ? 'bg-[#1A1A1A] text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {template.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Templates */}
                    {customTemplates.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-600">Custom Templates</h4>
                          <button
                            onClick={() => setShowCustomTemplates(!showCustomTemplates)}
                            className="text-yellow-600 hover:text-yellow-700 text-sm"
                          >
                            {showCustomTemplates ? 'Hide' : 'Show'} ({customTemplates.length})
                          </button>
                        </div>
                        {showCustomTemplates && (
                          <div className="flex flex-wrap gap-3">
                            {customTemplates.map((template, index) => {
                              const customId = `custom_${template.name.replace(/\s+/g, '_').toLowerCase()}`;
                              return (
                                <button
                                  key={customId}
                                  onClick={() => setSelectedTemplate(customId)}
                                  className={`px-4 py-2 rounded-md ${
                                    selectedTemplate === customId
                                      ? 'bg-yellow-500 text-black'
                                      : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                                  }`}
                                >
                                  {template.name} ✨
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Component Inputs */}
                  <div className="space-y-6 mt-8">
                    {getTemplateComponents().map(component => (
                      <div key={component.id} className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                          {component.name}
                          {component.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        
                        {component.inputType === 'textarea' ? (
                          <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                            rows="4"
                            placeholder={component.placeholder}
                            value={componentValues[component.id] || ''}
                            onChange={(e) => handleComponentChange(component.id, e.target.value)}
                          />
                        ) : component.inputType === 'select' ? (
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                            value={componentValues[component.id] || ''}
                            onChange={(e) => handleComponentChange(component.id, e.target.value)}
                          >
                            <option value="">Select an option</option>
                            {component.options.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                            placeholder={component.placeholder}
                            value={componentValues[component.id] || ''}
                            onChange={(e) => handleComponentChange(component.id, e.target.value)}
                          />
                        )}
                        
                        {/* Component Tips */}
                        <p className="text-sm text-gray-500 mt-1">{component.tips}</p>
                        
                        {/* Platform-specific best practice */}
                        {component.bestPractices && component.bestPractices[selectedPlatform] && (
                          <div className="mt-2 p-2 bg-blue-50 text-blue-800 text-sm rounded-md">
                            <strong>{selectedPlatform === 'openai' ? 'ChatGPT' : selectedPlatform === 'anthropic' ? 'Claude' : 'Gemini'} tip:</strong> {component.bestPractices[selectedPlatform]}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <button
                      onClick={handleGeneratePrompt}
                      className="w-full bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
                      disabled={!selectedPlatform || !selectedTemplate}
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
                  
                  {/* Platform Information */}
                  {generatedPrompt && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">
                        Optimized for {selectedPlatform === 'openai' ? 'ChatGPT' : selectedPlatform === 'anthropic' ? 'Claude' : 'Gemini'}
                      </h3>
                      <p className="text-sm text-blue-700">
                        This prompt follows official best practices from {selectedPlatform === 'openai' ? 'OpenAI' : selectedPlatform === 'anthropic' ? 'Anthropic' : 'Google'} for effective prompt engineering.
                      </p>
                      <a 
                        href={
                          selectedPlatform === 'openai'
                            ? 'https://platform.openai.com/docs/guides/text'
                            : selectedPlatform === 'anthropic'
                            ? 'https://docs.anthropic.com/claude/docs/introduction-to-prompt-design'
                            : 'https://ai.google.dev/gemini-api/docs/prompting-strategies'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-1 inline-block"
                      >
                        Learn more about {selectedPlatform === 'openai' ? 'ChatGPT' : selectedPlatform === 'anthropic' ? 'Claude' : 'Gemini'} prompting →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}

            {/* Custom Template Builder Tab */}
            {activeTab === 'builder' && (
              <CustomTemplateBuilder onTemplateCreated={handleTemplateCreated} />
            )}
          </div>
        </div>
      </section>
      
      {/* Specialized Use Cases Section */}
      <section id="use-cases" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Specialized Prompt Generators
            </h2>
            <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
              Looking for a more specialized prompt generator? We've created optimized generators for specific use cases and AI platforms.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seoUseCases.map(useCase => (
                <Link 
                  key={useCase.slug}
                  href={`/ai-prompt-generator/seo/${useCase.slug}`}
                  className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="text-xl font-semibold mb-2">{useCase.h1}</h3>
                  <p className="text-gray-700 mb-4">{useCase.intro.substring(0, 100)}...</p>
                  <span className="text-[#1A1A1A] font-medium hover:underline">
                    Try this generator →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Best Practices Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Best Practices for AI Prompt Writing
            </h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-[#FFDE59] rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <span className="text-[#1A1A1A] font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Be Specific and Detailed</h3>
                  <p className="text-gray-700">
                    The more specific your prompt, the better results you'll get. Include details about what you want, any constraints, and your expectations for the output.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-[#FFDE59] rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <span className="text-[#1A1A1A] font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Provide Context</h3>
                  <p className="text-gray-700">
                    Give the AI relevant background information. This might include your goals, audience, or any specific requirements that will help the AI understand what you need.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-[#FFDE59] rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <span className="text-[#1A1A1A] font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Use Clear Structure</h3>
                  <p className="text-gray-700">
                    Organize your prompt with clear sections and formatting. This helps the AI understand different parts of your request and respond accordingly.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-[#FFDE59] rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <span className="text-[#1A1A1A] font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Iterate and Refine</h3>
                  <p className="text-gray-700">
                    Don't expect perfect results on the first try. Use the initial output to refine your prompt, adding more specificity or examples as needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  Is this prompt generator really free?
                </h3>
                <p className="text-gray-700">
                  Yes, our AI prompt generator is completely free to use with no sign-up required. It works entirely in your browser with no API costs.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  How does this generator work?
                </h3>
                <p className="text-gray-700">
                  Our generator uses templates based on official best practices from AI providers like OpenAI, Anthropic, and Google. It processes your inputs client-side to create optimized prompts without sending your data to any servers.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  Can I save my generated prompts?
                </h3>
                <p className="text-gray-700">
                  Currently, you can copy your generated prompts to save them elsewhere. We're working on adding a feature to save prompts directly in your account for PromptWritingStudio members.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">
                  Do you have more advanced prompt templates?
                </h3>
                <p className="text-gray-700">
                  Yes! Our PromptWritingStudio membership includes access to over 100 advanced prompt templates, personalized guidance, and a community of prompt engineers. <a href="https://courses.becomeawritertoday.com/purchase?product_id=6253746" className="text-blue-600 hover:underline">Learn more about our membership</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Video Tutorials Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <YouTubeVideoSection
            title="Master AI Prompt Generation with Video Tutorials"
            description="Learn advanced prompt engineering techniques through our comprehensive video series. Perfect for users of our AI prompt generator."
            playlistId="PLxQrU2dxeHH5O0Wb2AFOD3oATFEtQGoL8"
            playlistTitle="Writing With AI"
            videoCount={12}
            category="AI Writing Education"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Take Your AI Prompting to the Next Level</h2>
            <p className="text-lg text-gray-700 mb-8">
              Join PromptWritingStudio to access our complete library of expert-crafted prompts, advanced techniques, and personalized guidance.
            </p>
            <a 
              href="https://courses.becomeawritertoday.com/purchase?product_id=6253746" 
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join PromptWritingStudio From $25/month
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
