import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { seoUseCases } from '../../data/seo-use-cases'
import { 
  promptComponents, 
  platformTemplates, 
  generatePrompt 
} from '../../data/prompt-generator-components'
import CustomTemplateBuilder from '../../components/ui/CustomTemplateBuilder'
import PromptOptimizer from '../../components/ai/PromptOptimizer'

export default function AIPromptGenerator() {
  const [selectedPlatform, setSelectedPlatform] = useState('openai');
  const [selectedTemplate, setSelectedTemplate] = useState('detailed');
  const [componentValues, setComponentValues] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [activeTab, setActiveTab] = useState('generator'); // 'generator', 'builder'
  const [customTemplates, setCustomTemplates] = useState([]);
  const [showCustomTemplates, setShowCustomTemplates] = useState(false);
  const [showOptimization, setShowOptimization] = useState(false);
  
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

  // Handle prompt optimization
  const handlePromptOptimize = (optimizedPrompt) => {
    setGeneratedPrompt(optimizedPrompt);
    setCopiedToClipboard(false); // Reset copy status
    
    // Track optimization usage for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'prompt_optimized', {
        platform: selectedPlatform,
        template: selectedTemplate,
        original_length: generatedPrompt.length,
        optimized_length: optimizedPrompt.length
      });
    }
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

  // Launch with specific AI platform
  const launchWithPlatform = (platform) => {
    // Copy prompt to clipboard first
    navigator.clipboard.writeText(generatedPrompt);
    
    // Platform URLs
    const platformUrls = {
      'openai': 'https://chat.openai.com/',
      'anthropic': 'https://claude.ai/',
      'google': 'https://gemini.google.com/'
    };
    
    // Open platform in new tab
    window.open(platformUrls[platform], '_blank');
    
    // Show success message
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 3000);
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
  
  // HowTo Schema for AI Prompt Generator
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Create Effective AI Prompts",
    "description": "Step-by-step guide to creating optimized prompts for ChatGPT, Claude, and Gemini using best practices.",
    "image": "https://promptwritingstudio.com/images/ai-prompt-generator-guide.jpg",
    "totalTime": "PT10M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Access to AI tool (ChatGPT, Claude, or Gemini)"
      },
      {
        "@type": "HowToSupply", 
        "name": "Clear objective for your AI task"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Choose Your Use Case",
        "text": "Select the specific type of content or task you want AI to help with from our generator options.",
        "image": "https://promptwritingstudio.com/images/step-1-choose-use-case.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Fill in Context Details",
        "text": "Provide specific information about your audience, goals, and any relevant background information.",
        "image": "https://promptwritingstudio.com/images/step-2-add-context.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Specify Output Requirements",
        "text": "Define the format, length, tone, and style you want for the AI-generated content.",
        "image": "https://promptwritingstudio.com/images/step-3-specify-output.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Generate and Test Your Prompt",
        "text": "Use our generator to create your optimized prompt, then test it with your preferred AI platform.",
        "image": "https://promptwritingstudio.com/images/step-4-generate-test.jpg"
      },
      {
        "@type": "HowToStep",
        "name": "Refine Based on Results", 
        "text": "Adjust the prompt based on the AI output quality and iterate until you get the desired results.",
        "image": "https://promptwritingstudio.com/images/step-5-refine-prompt.jpg"
      }
    ],
    "author": {
      "@type": "Person",
      "name": "Bryan Collins"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Prompt Writing Studio"
    }
  }
  
  return (
    <Layout
      title="Free AI Prompt Generator - Create Custom ChatGPT & AI Art Prompts"
      description="Create custom AI prompts for ChatGPT, Claude, Gemini & AI art tools. Free generator uses best practices from OpenAI, Anthropic & Google. Get better AI results instantly."
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      </Head>
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
                  
                  {/* Template Information */}
                  {selectedPlatform && selectedTemplate && platformTemplates[selectedPlatform][selectedTemplate] && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        {platformTemplates[selectedPlatform][selectedTemplate].name}
                      </h4>
                      <p className="text-sm text-blue-800 mb-2">
                        {platformTemplates[selectedPlatform][selectedTemplate].explanation}
                      </p>
                      <div className="text-xs text-blue-700">
                        <strong>Best for:</strong> {platformTemplates[selectedPlatform][selectedTemplate].bestFor.join(', ')}
                      </div>
                    </div>
                  )}
                  
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
                    <>
                      <div className="bg-white border border-gray-200 rounded-lg p-4 h-[400px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap font-mono text-sm">{generatedPrompt}</pre>
                      </div>
                      
                      {/* AI Optimization Toggle */}
                      <div className="mt-4">
                        <button
                          onClick={() => setShowOptimization(!showOptimization)}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <span className="mr-2">✨</span>
                          {showOptimization ? 'Hide AI Optimization' : 'Get AI Optimization Suggestions'}
                          <svg className={`w-4 h-4 ml-1 transition-transform ${showOptimization ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* AI Optimization Panel */}
                      {showOptimization && (
                        <div className="mt-4">
                          <PromptOptimizer
                            prompt={generatedPrompt}
                            onOptimize={handlePromptOptimize}
                            tier="free" // You can make this dynamic based on user auth
                            context={`${selectedPlatform} prompt generation`}
                            useCase="prompt optimization"
                            className="w-full"
                          />
                        </div>
                      )}
                    </>
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

                  {/* Quick Launch Buttons */}
                  {generatedPrompt && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">🚀 Quick Launch (copies prompt & opens platform):</h4>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => launchWithPlatform('openai')}
                          className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0734a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                          </svg>
                          ChatGPT
                        </button>
                        
                        <button
                          onClick={() => launchWithPlatform('anthropic')}
                          className="flex items-center px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors duration-200 text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                          Claude
                        </button>
                        
                        <button
                          onClick={() => launchWithPlatform('google')}
                          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                          Gemini
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        ✨ Prompt copied to clipboard automatically when you click a platform
                      </p>
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
                  href={`/ai-prompt-generator/${useCase.slug}`}
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
