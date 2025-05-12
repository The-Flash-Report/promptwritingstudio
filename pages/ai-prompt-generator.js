import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { 
  promptComponents, 
  platformTemplates, 
  useCaseTemplates, 
  generatePrompt, 
  generateFromUseCase 
} from '../data/prompt-generator-components'

export default function AIPromptGenerator() {
  // State for the generator
  const [selectedPlatform, setSelectedPlatform] = useState('openai')
  const [selectedTemplate, setSelectedTemplate] = useState('basic')
  const [selectedUseCase, setSelectedUseCase] = useState('')
  const [componentValues, setComponentValues] = useState({})
  const [useCaseVariables, setUseCaseVariables] = useState({})
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [activeTab, setActiveTab] = useState('platform') // 'platform', 'useCase'
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  
  // Reset component values when platform or template changes
  useEffect(() => {
    setComponentValues({})
    setGeneratedPrompt('')
  }, [selectedPlatform, selectedTemplate])
  
  // Reset use case variables when use case changes
  useEffect(() => {
    setUseCaseVariables({})
    setGeneratedPrompt('')
  }, [selectedUseCase])
  
  // Handle component value changes
  const handleComponentChange = (componentId, value) => {
    setComponentValues(prev => ({
      ...prev,
      [componentId]: value
    }))
  }
  
  // Handle use case variable changes
  const handleVariableChange = (variableId, value) => {
    setUseCaseVariables(prev => ({
      ...prev,
      [variableId]: value
    }))
  }
  
  // Generate prompt from platform template
  const handleGenerateFromPlatform = () => {
    const prompt = generatePrompt(
      selectedPlatform,
      selectedTemplate,
      componentValues
    )
    setGeneratedPrompt(prompt)
  }
  
  // Generate prompt from use case template
  const handleGenerateFromUseCase = () => {
    const result = generateFromUseCase(
      selectedUseCase,
      useCaseVariables
    )
    setGeneratedPrompt(result.prompt)
    setSelectedPlatform(result.platform)
  }
  
  // Copy prompt to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
    setCopiedToClipboard(true)
    setTimeout(() => setCopiedToClipboard(false), 2000)
  }
  
  // Get components for the selected template
  const getTemplateComponents = () => {
    if (!selectedPlatform || !selectedTemplate) return []
    
    const template = platformTemplates[selectedPlatform][selectedTemplate]
    if (!template) return []
    
    return template.components.map(componentId => promptComponents[componentId])
  }
  
  // Get variables for the selected use case
  const getUseCaseVariables = () => {
    if (!selectedUseCase) return []
    
    const useCase = useCaseTemplates[selectedUseCase]
    if (!useCase) return []
    
    return useCase.variables
  }
  
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
              Create optimized prompts for ChatGPT, Claude, and Gemini using official best practices. Build effective prompts that get better results from AI assistants.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setActiveTab('platform')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  activeTab === 'platform' 
                    ? 'bg-white text-[#1A1A1A]' 
                    : 'bg-opacity-20 bg-white hover:bg-opacity-30'
                }`}
              >
                Platform-Based
              </button>
              <button 
                onClick={() => setActiveTab('useCase')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  activeTab === 'useCase' 
                    ? 'bg-white text-[#1A1A1A]' 
                    : 'bg-opacity-20 bg-white hover:bg-opacity-30'
                }`}
              >
                Use Case Templates
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Generator Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Left Panel - Controls */}
                <div className="md:w-1/2 p-6 md:p-8 border-r border-gray-200">
                  {activeTab === 'platform' ? (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Build Your Prompt</h2>
                      
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
                      
                      {/* Component Inputs */}
                      <div className="space-y-6 mt-8">
                        <h3 className="text-lg font-semibold">Customize Your Prompt</h3>
                        
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
                          onClick={handleGenerateFromPlatform}
                          className="w-full bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
                          disabled={!selectedPlatform || !selectedTemplate}
                        >
                          Generate Prompt
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Use Case Templates</h2>
                      
                      {/* Use Case Selection */}
                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Select a Use Case</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {Object.entries(useCaseTemplates).map(([id, useCase]) => (
                            <button
                              key={id}
                              onClick={() => setSelectedUseCase(id)}
                              className={`px-4 py-3 rounded-md text-left ${
                                selectedUseCase === id
                                  ? 'bg-[#1A1A1A] text-white'
                                  : 'bg-gray-100 hover:bg-gray-200'
                              }`}
                            >
                              <div className="font-medium">{useCase.name}</div>
                              <div className="text-sm opacity-80">{useCase.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Use Case Variables */}
                      {selectedUseCase && (
                        <div className="space-y-6 mt-8">
                          <h3 className="text-lg font-semibold">
                            Customize {useCaseTemplates[selectedUseCase].name}
                          </h3>
                          
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
                            onClick={handleGenerateFromUseCase}
                            className="w-full bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
                          >
                            Generate Prompt
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                {/* Right Panel - Generated Prompt */}
                <div className="md:w-1/2 p-6 md:p-8 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Your Generated Prompt</h2>
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
                    <div className="bg-white border border-gray-200 rounded-lg p-4 h-[600px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-mono text-sm">{generatedPrompt}</pre>
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 h-[600px] flex items-center justify-center">
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
                  {selectedPlatform && generatedPrompt && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">
                        {selectedPlatform === 'openai' ? 'ChatGPT' : selectedPlatform === 'anthropic' ? 'Claude' : 'Gemini'} Best Practices
                      </h3>
                      <p className="text-sm text-blue-700">
                        {selectedPlatform === 'openai' 
                          ? 'This prompt follows OpenAI\'s recommended practices for clear instructions, proper formatting, and specific guidance.'
                          : selectedPlatform === 'anthropic'
                          ? 'This prompt uses Claude\'s XML tagging system and follows Anthropic\'s guidelines for effective prompting.'
                          : 'This prompt follows Google\'s Gemini best practices for structured, clear instructions and specific formatting.'}
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
          </div>
        </div>
      </section>
      
      {/* Educational Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">AI Prompt Engineering Best Practices</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Learn how to create effective prompts that get better results from AI assistants like ChatGPT, Claude, and Gemini.
            </p>
            
            <div className="space-y-8">
              {/* Best Practice Cards */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Be Clear and Specific</h3>
                  <p className="text-gray-700">
                    The most effective prompts clearly state what you want the AI to do. Include all necessary details and be specific about your requirements.
                  </p>
                  <div className="mt-4 p-3 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800 mb-1">Good Example:</div>
                    <p className="text-sm text-green-700">
                      "Write a 500-word blog post about sustainable gardening practices for beginners. Include 5 actionable tips, focus on organic methods, and use a conversational tone."
                    </p>
                  </div>
                  <div className="mt-2 p-3 bg-red-50 rounded-md">
                    <div className="font-medium text-red-800 mb-1">Poor Example:</div>
                    <p className="text-sm text-red-700">
                      "Write about gardening."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Structure Your Prompts</h3>
                  <p className="text-gray-700">
                    Organize your prompts with clear sections and formatting. This helps the AI understand different parts of your request.
                  </p>
                  <div className="mt-4 p-3 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800 mb-1">Good Example:</div>
                    <p className="text-sm text-green-700 whitespace-pre-line">
                      "# Task
                      Analyze this customer feedback and identify key themes.
                      
                      # Context
                      This feedback is from our annual customer survey with 500 responses.
                      
                      # Format
                      Present findings in a bulleted list with main themes and supporting evidence."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Provide Examples (Few-Shot Learning)</h3>
                  <p className="text-gray-700">
                    When you need a specific format or style, show examples of what you want. This technique, called few-shot learning, significantly improves results.
                  </p>
                  <div className="mt-4 p-3 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800 mb-1">Good Example:</div>
                    <p className="text-sm text-green-700 whitespace-pre-line">
                      "Generate product descriptions in this style:
                      
                      Example 1: The Nimbus 2000 - Our fastest broom yet, perfect for Quidditch enthusiasts who demand speed and precision. Hand-polished handle with custom engraving.
                      
                      Example 2: The Firebolt Supreme - Professional-grade racing broom with superfine aerodynamic handle and individually selected twigs for unsurpassable balance and pinpoint precision."
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">Ask for Reasoning</h3>
                  <p className="text-gray-700">
                    For complex problems, ask the AI to show its work or explain its reasoning. This leads to more accurate and thoughtful responses.
                  </p>
                  <div className="mt-4 p-3 bg-green-50 rounded-md">
                    <div className="font-medium text-green-800 mb-1">Good Example:</div>
                    <p className="text-sm text-green-700">
                      "Analyze whether this business should expand into the European market. Think step by step, considering market size, competition, regulatory challenges, and potential ROI before making a recommendation."
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <Link 
                href="/ai-prompt-examples" 
                className="text-[#1A1A1A] font-medium hover:underline"
              >
                Browse our collection of 101 AI prompt examples →
              </Link>
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
