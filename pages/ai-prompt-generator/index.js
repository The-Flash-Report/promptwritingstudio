import { useState, useEffect } from 'react'
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { generateCalculatorSchema, generateFAQSchema } from '../../lib/schemaGenerator'
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
  
  // Wizard state for step-by-step interface
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    useCase: '',
    platform: '',
    template: '',
    details: {}
  });
  const [showWizard, setShowWizard] = useState(true);
  const [justCompletedWizard, setJustCompletedWizard] = useState(false);
  
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

  // Wizard navigation functions
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const updateWizardData = (field, value) => {
    setWizardData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const startWizard = () => {
    setShowWizard(true);
    setCurrentStep(1);
    setJustCompletedWizard(false);
    setWizardData({
      useCase: '',
      platform: '',
      template: '',
      details: {}
    });
  };
  
  const completeWizard = () => {
    // Auto-fill the main generator with wizard data
    setSelectedPlatform(wizardData.platform);
    setSelectedTemplate(wizardData.template);
    setComponentValues(wizardData.details);
    setShowWizard(false);
    setActiveTab('generator');
    setJustCompletedWizard(true);
    // Auto-generate the prompt
    setTimeout(() => {
      handleGeneratePrompt();
      // Scroll to the generator section after prompt is generated
      setTimeout(() => {
        const generatorSection = document.getElementById('generator');
        if (generatorSection) {
          generatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Clear the completion flag after animation
        setTimeout(() => {
          setJustCompletedWizard(false);
        }, 3000);
      }, 200);
    }, 100);
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
  
  const webAppSchema = generateCalculatorSchema({
    name: 'Free AI Prompt Generator',
    description: 'Generate expert-level AI prompts in seconds. Choose your task, tone, and model — get a ready-to-use prompt for ChatGPT, Claude, or Gemini. Free, no signup required.',
    url: 'https://promptwritingstudio.com/ai-prompt-generator',
    keywords: ['ai prompt generator', 'chatgpt prompt generator', 'claude prompt generator', 'gemini prompt generator', 'free prompt generator'],
    category: 'AI Productivity'
  })

  const generatorFAQs = [
    { question: 'What is an AI prompt generator?', answer: 'An AI prompt generator is a tool that helps you create structured, optimised instructions for AI models like ChatGPT, Claude, or Gemini to produce higher-quality outputs. Instead of typing a vague request, you fill in guided fields and the generator applies proven prompt engineering frameworks automatically.' },
    { question: 'Are AI prompt generators free?', answer: 'Many prompt generators offer free tiers with basic features. Tools like AIPRM and FlowGPT have free plans, while advanced features typically require a paid subscription. The Prompt Writing Studio generator is completely free with no signup required.' },
    { question: 'Can I use an AI prompt generator for ChatGPT?', answer: 'Yes. Most prompt generators are designed to work with ChatGPT and other major LLMs. You can also use ChatGPT itself as a meta-prompt generator by asking it to write prompts for a specific task.' },
    { question: 'How is a prompt generator different from prompt engineering?', answer: 'A prompt generator automates the creation of prompts using templates and variables, while prompt engineering is the broader skill of manually crafting and refining prompts for optimal results. Generators are a tool that supports prompt engineering — they speed up the process but do not replace the underlying skill.' },
    { question: 'Do prompt generators work for image generation AI?', answer: 'Yes. Many generators support image AI tools like Midjourney, DALL-E, and Stable Diffusion with specialised templates for visual prompt creation, including style, lighting, composition, and negative prompt fields.' },
    { question: 'Is it safe to use AI prompt generators with business data?', answer: 'Exercise caution. Avoid entering sensitive or personal data into third-party tools. Check each tool\'s data retention policy and ensure GDPR compliance before use. For confidential business prompts, use a local or self-hosted generator rather than a public web tool.' },
    { question: 'What makes a good AI-generated prompt?', answer: 'A good prompt includes a clear role, specific context, defined output format, tone guidance, and explicit constraints. The best generators build all of these elements in automatically using frameworks like RICE (Role, Instructions, Context, Examples) or CRISPE.' }
  ]

  return (
    <Layout
      title="Free AI Prompt Generator — Create Perfect Prompts for ChatGPT, Gemini & Claude"
      description="Generate expert-level AI prompts in seconds. Choose your task, tone, and model — get a ready-to-use prompt. Free, no signup required."
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(generatorFAQs)) }}
        />
      </Head>

      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Prompt Generator
            </h1>
            <div className="answer-block max-w-2xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-5 mb-6 rounded-r-lg text-left" data-source="Prompt Writing Studio" data-attribution="Bryan Collins, Prompt Writing Studio">
              <p className="text-base leading-relaxed text-gray-100">An AI prompt generator is a tool that helps you write structured, effective instructions for ChatGPT, Claude, and Gemini. It turns a vague idea into a complete prompt using proven frameworks — including role assignment, context, task specification, and output format — to produce consistently better AI responses.</p>
            </div>
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

      {/* Step-by-Step Wizard Interface */}
      {showWizard && (
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Perfect AI Prompt in 4 Simple Steps</h2>
                  <p className="text-lg text-gray-600">Our guided wizard will help you build the perfect prompt for your needs</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Step {currentStep} of 4</span>
                    <span className="text-sm text-gray-500">{Math.round((currentStep / 4) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Step Content */}
                {currentStep === 1 && (
                  <div className="text-center">
                    <div className="text-4xl mb-6">🎯</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">What do you want to create?</h3>
                    <p className="text-gray-600 mb-8">Choose the type of content you want to generate with AI</p>
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      {['Content Creation', 'Business & Marketing', 'Creative Writing', 'Technical Writing', 'Email & Communication', 'Social Media'].map((useCase) => (
                        <button
                          key={useCase}
                          onClick={() => {
                            updateWizardData('useCase', useCase);
                            nextStep();
                          }}
                          className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200 text-left"
                        >
                          <div className="font-medium text-gray-900">{useCase}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="text-center">
                    <div className="text-4xl mb-6">🤖</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Which AI platform will you use?</h3>
                    <p className="text-gray-600 mb-8">Select the AI tool you'll be using</p>
                    <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                      {[
                        { id: 'openai', name: 'ChatGPT', icon: '💬', desc: 'OpenAI\'s ChatGPT' },
                        { id: 'anthropic', name: 'Claude', icon: '🧠', desc: 'Anthropic\'s Claude' },
                        { id: 'gemini', name: 'Gemini', icon: '🔮', desc: 'Google\'s Gemini' }
                      ].map((platform) => (
                        <button
                          key={platform.id}
                          onClick={() => {
                            updateWizardData('platform', platform.id);
                            nextStep();
                          }}
                          className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200"
                        >
                          <div className="text-3xl mb-2">{platform.icon}</div>
                          <div className="font-bold text-gray-900">{platform.name}</div>
                          <div className="text-sm text-gray-600">{platform.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="text-center">
                    <div className="text-4xl mb-6">📝</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose your prompt style</h3>
                    <p className="text-gray-600 mb-8">Select how detailed you want your prompt to be</p>
                    <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                      {[
                        { id: 'simple', name: 'Simple', desc: 'Basic prompt structure', icon: '⚡' },
                        { id: 'detailed', name: 'Detailed', desc: 'Comprehensive with examples', icon: '📋' },
                        { id: 'expert', name: 'Expert', desc: 'Advanced with specific instructions', icon: '🎯' }
                      ].map((template) => (
                        <button
                          key={template.id}
                          onClick={() => {
                            updateWizardData('template', template.id);
                            nextStep();
                          }}
                          className="p-6 border-2 border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200"
                        >
                          <div className="text-3xl mb-2">{template.icon}</div>
                          <div className="font-bold text-gray-900">{template.name}</div>
                          <div className="text-sm text-gray-600">{template.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="text-center">
                    <div className="text-4xl mb-6">✨</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to generate your prompt!</h3>
                    <p className="text-gray-600 mb-8">We'll create a customized prompt based on your selections</p>
                    <div className="bg-[#F9F9F9] rounded-lg p-6 mb-6 text-left">
                      <h4 className="font-semibold text-blue-900 mb-3">Your Selections:</h4>
                      <div className="space-y-2 text-sm text-[#1A1A1A]">
                        <div><strong>Use Case:</strong> {wizardData.useCase}</div>
                        <div><strong>Platform:</strong> {wizardData.platform === 'openai' ? 'ChatGPT' : wizardData.platform === 'anthropic' ? 'Claude' : 'Gemini'}</div>
                        <div><strong>Style:</strong> {wizardData.template === 'simple' ? 'Simple' : wizardData.template === 'detailed' ? 'Detailed' : 'Expert'}</div>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={completeWizard}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                      >
                        Generate My Prompt →
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                {currentStep > 1 && currentStep < 4 && (
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={prevStep}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      ← Previous Step
                    </button>
                    <button
                      onClick={() => setShowWizard(false)}
                      className="px-6 py-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Skip Wizard
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      
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
              
              {/* Wizard Restart Button */}
              <div className="text-center mt-4">
                <button
                  onClick={startWizard}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                >
                  <span>🪄</span>
                  <span className="ml-2">Start Guided Wizard</span>
                </button>
              </div>
            </div>

            {/* Success Message for Wizard Completion */}
            {justCompletedWizard && (
              <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center">
                  <div className="bg-green-500 rounded-full p-2 mr-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-1">🎉 Wizard Complete!</h3>
                    <p className="text-green-700">Your AI prompt has been generated and appears in the <strong>"Your Generated Prompt"</strong> section on the right. You can copy it and use it with your AI tool of choice!</p>
                  </div>
                </div>
              </div>
            )}

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
                          <div className="mt-2 p-2 bg-[#F9F9F9] text-[#1A1A1A] text-sm rounded-md">
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
                <div className={`md:w-1/2 p-6 md:p-8 bg-gray-50 transition-all duration-1000 ${justCompletedWizard ? 'ring-4 ring-green-400 ring-opacity-50 bg-green-50' : ''}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-xl font-semibold transition-all duration-500 ${justCompletedWizard ? 'text-green-800 text-2xl' : ''}`}>
                      {justCompletedWizard ? '✨ Your Generated Prompt' : 'Your Generated Prompt'}
                    </h3>
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
                    <div className="mt-4 p-4 bg-[#F9F9F9] rounded-lg">
                      <h3 className="font-medium text-[#1A1A1A] mb-2">
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

      {/* Success Metrics & Popular Combinations */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Thousands of Successful Users</h2>
              <p className="text-lg text-gray-600">See how our prompt generator is helping people create better AI content</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Success Metrics */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Success Metrics</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Prompts Generated Today</span>
                    <span className="text-2xl font-bold text-green-600">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Active Users This Week</span>
                    <span className="text-2xl font-bold text-blue-600">3,891</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="text-2xl font-bold text-purple-600">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Time Saved Per User</span>
                    <span className="text-2xl font-bold text-orange-600">2.5 hrs</span>
                  </div>
                </div>
              </div>
              
              {/* Popular Combinations */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Combinations</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Content Creation + ChatGPT + Detailed</div>
                      <div className="text-sm text-gray-600">Most popular for blog writing</div>
                    </div>
                    <span className="text-sm text-gray-500">🔥 Hot</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Business & Marketing + Claude + Expert</div>
                      <div className="text-sm text-gray-600">Perfect for professional content</div>
                    </div>
                    <span className="text-sm text-gray-500">⭐ Popular</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">Creative Writing + Gemini + Simple</div>
                      <div className="text-sm text-gray-600">Great for brainstorming</div>
                    </div>
                    <span className="text-sm text-gray-500">💡 Trending</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button
                    onClick={startWizard}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    Try These Combinations
                  </button>
                </div>
              </div>
              
              {/* Platform-Specific Generators */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform-Specific Generators</h3>
                <p className="text-gray-600 mb-6">
                  Get specialized prompts optimized for each AI platform's unique capabilities.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link 
                    href="/gemini-prompt-generator"
                    className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="text-3xl mr-4">💎</div>
                    <div>
                      <div className="font-semibold text-gray-900">Gemini Prompt Generator</div>
                      <div className="text-sm text-gray-600">Specialized for multimodal tasks</div>
                    </div>
                    <div className="ml-auto text-blue-600">→</div>
                  </Link>
                  <Link 
                    href="/chatgpt-prompt-templates"
                    className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="text-3xl mr-4">🤖</div>
                    <div>
                      <div className="font-semibold text-gray-900">ChatGPT Templates</div>
                      <div className="text-sm text-gray-600">Ready-to-use prompt templates</div>
                    </div>
                    <div className="ml-auto text-green-600">→</div>
                  </Link>
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
                  Yes — our library of prompt examples, model-specific guides, and the Claude Code walkthrough go well beyond what this generator produces. Start with the <Link href="/ai-prompt-examples" className="text-blue-600 hover:underline">prompt examples library</Link> or the <Link href="/claude-code-guide" className="text-blue-600 hover:underline">Claude Code guide</Link>.
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

      {/* What Is an AI Prompt Generator */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-6">What Is an AI Prompt Generator?</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>An AI prompt generator is a tool that creates structured, optimised instructions for AI models like ChatGPT, Claude, and Gemini. Rather than typing a casual request and hoping for a useful response, a prompt generator walks you through the key inputs — role, context, tone, format, and constraints — and assembles them into a properly engineered prompt.</p>
            <p>The gap between a vague AI request and a well-crafted prompt is significant. "Write a blog post about nutrition" produces a generic 500-word article. A structured prompt that specifies the target audience, desired word count, tone, key points to cover, and SEO angle produces something closer to a finished draft. Prompt generators close that gap automatically.</p>
            <p>Adoption of AI tools is accelerating across every industry. Marketers use prompt generators to create campaign briefs, ad copy, and social content at scale. Developers use them to generate boilerplate code, documentation, and test cases. Writers use them to overcome blank-page paralysis and produce first drafts faster. Educators use them to create lesson plans, quizzes, and explanations tailored to specific age groups.</p>
            <p>Whatever your use case, the underlying principle is the same: a more precise prompt produces a more useful output. Prompt generators make precision the default rather than the exception.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How the AI Prompt Generator Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#FFDE59] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold mb-3">Choose Your Platform & Task</h3>
              <p className="text-gray-600">Select the AI tool you are using (ChatGPT, Claude, Gemini) and the type of task — writing, coding, analysis, research, or business communications.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#FFDE59] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold mb-3">Fill In Your Specifics</h3>
              <p className="text-gray-600">Complete the guided fields with your specific details. The generator structures your input using proven prompt engineering frameworks from OpenAI, Anthropic, and Google.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#FFDE59] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold mb-3">Copy & Use Immediately</h3>
              <p className="text-gray-600">Copy your generated prompt with one click and paste it directly into your AI tool. No account needed, no waiting — results in seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes a Good Prompt */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">What Makes a Good AI Prompt?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Most people get generic results because their prompts are too vague. These five principles separate expert prompts from casual requests.</p>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border-l-4 border-[#FFDE59]">
              <h3 className="font-bold text-lg mb-2">1. Assign a Clear Role</h3>
              <p className="text-gray-600">Start your prompt by telling the AI who it is: "Act as an expert copywriter with 10 years of B2B SaaS experience." This primes the model to draw on relevant knowledge and adopt the right tone. Generic requests get generic responses — role assignment changes everything.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border-l-4 border-[#FFDE59]">
              <h3 className="font-bold text-lg mb-2">2. Provide Specific Context</h3>
              <p className="text-gray-600">Include the background information the AI needs to give a relevant answer. Who is the audience? What platform or format is the output for? What do they already know? Context reduces the AI having to guess, which is where hallucinations and generic responses come from.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border-l-4 border-[#FFDE59]">
              <h3 className="font-bold text-lg mb-2">3. Describe the Output Format</h3>
              <p className="text-gray-600">Specify exactly what you want back: a numbered list, a 500-word article, a JSON object, a table, bullet points with sub-bullets. Without format instructions, the AI picks whatever feels natural — which may not be what you need. Formatting instructions also prevent the AI from padding with unnecessary preamble.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border-l-4 border-[#FFDE59]">
              <h3 className="font-bold text-lg mb-2">4. Set Constraints</h3>
              <p className="text-gray-600">Tell the AI what NOT to do as well as what to do. "Do not use jargon. Do not start with 'Certainly!'. Avoid passive voice. Keep it under 200 words." Constraints dramatically tighten the output and reduce the need for editing. Think of them as guardrails that keep the AI on track.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border-l-4 border-[#FFDE59]">
              <h3 className="font-bold text-lg mb-2">5. Iterate, Do Not Start Over</h3>
              <p className="text-gray-600">Treat prompt writing as a conversation. If the first response is close but not quite right, refine it: "Good structure, but make the tone more casual and add two more examples." Iterating builds on context the AI already has. Starting fresh loses that context and often produces worse results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best AI Prompt Generator Tools */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Best AI Prompt Generator Tools in 2025</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Not all prompt generators are equal. Here is how the leading tools compare on price, features, model support, and ease of use.</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#1A1A1A] text-white">
                  <th className="text-left p-4">Tool</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Key Features</th>
                  <th className="text-left p-4">Model Support</th>
                  <th className="text-left p-4">Ease of Use</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#E5E5E5] bg-[#FFFBEA]">
                  <td className="p-4 font-semibold">Prompt Writing Studio</td>
                  <td className="p-4">Free</td>
                  <td className="p-4">Template library, guided wizard, use-case generators</td>
                  <td className="p-4">ChatGPT, Claude, Gemini</td>
                  <td className="p-4">Beginner-friendly</td>
                </tr>
                <tr className="border-b border-[#E5E5E5]">
                  <td className="p-4 font-semibold">ChatGPT Custom Instructions</td>
                  <td className="p-4">Free / Plus $20/mo</td>
                  <td className="p-4">System-level context, memory, GPT Builder</td>
                  <td className="p-4">ChatGPT only</td>
                  <td className="p-4">Moderate</td>
                </tr>
                <tr className="border-b border-[#E5E5E5] bg-[#F9F9F9]">
                  <td className="p-4 font-semibold">PromptPerfect</td>
                  <td className="p-4">Free tier / $9.99/mo</td>
                  <td className="p-4">Automated prompt optimisation, A/B testing</td>
                  <td className="p-4">GPT-4, Claude, Midjourney, Stable Diffusion</td>
                  <td className="p-4">Intermediate</td>
                </tr>
                <tr className="border-b border-[#E5E5E5]">
                  <td className="p-4 font-semibold">FlowGPT</td>
                  <td className="p-4">Free</td>
                  <td className="p-4">Community prompt library, discovery, sharing</td>
                  <td className="p-4">ChatGPT, Claude, Gemini, Llama</td>
                  <td className="p-4">Beginner-friendly</td>
                </tr>
                <tr className="border-b border-[#E5E5E5] bg-[#F9F9F9]">
                  <td className="p-4 font-semibold">AIPRM for ChatGPT</td>
                  <td className="p-4">Free / $9/mo</td>
                  <td className="p-4">Chrome extension, 4000+ community templates, SEO focus</td>
                  <td className="p-4">ChatGPT (browser only)</td>
                  <td className="p-4">Beginner-friendly</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Build Your Own AI Prompt Generator */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">How to Build Your Own AI Prompt Generator</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Advanced users can create custom prompt generation systems tailored to their specific workflows — no coding required.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-[#E5E5E5]">
              <h3 className="font-bold text-lg mb-3">Spreadsheet Method</h3>
              <p className="text-gray-600">Build a Google Sheets or Notion database with columns for Role, Context, Task, Format, and Constraints. Use dropdown menus to select values and a CONCATENATE formula to assemble the final prompt. This gives you a reusable library that your whole team can contribute to.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-[#E5E5E5]">
              <h3 className="font-bold text-lg mb-3">Meta-Prompting with ChatGPT or Claude</h3>
              <p className="text-gray-600">Use AI to generate prompts for AI. Ask ChatGPT or Claude: "Write an expert-level prompt for [task] that includes role assignment, context, output format, and constraints." Iterate on the output until you have a reusable template. This is the fastest way to build a prompt library from scratch.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-[#E5E5E5]">
              <h3 className="font-bold text-lg mb-3">No-Code Web Generator</h3>
              <p className="text-gray-600">Tools like Softr, Glide, or Webflow allow you to build a simple form-based prompt generator without writing code. Connect it to an Airtable or Google Sheets backend containing your prompt templates. This works well for teams that need a shared, branded prompt tool.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-[#E5E5E5]">
              <h3 className="font-bold text-lg mb-3">Team Prompt Framework Library</h3>
              <p className="text-gray-600">Structure your best prompts using a consistent framework (RICE: Role, Instructions, Context, Examples; or CRISPE: Capacity, Role, Insight, Statement, Personality, Experiment). Store them in Notion or Confluence with tags for use case, platform, and output type. A shared library cuts prompt-writing time by 60–80% for repeat tasks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance and GDPR */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Ethical and Compliance Considerations</h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">Using AI prompt generators responsibly means understanding the regulatory and ethical implications — especially for EU users.</p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 border border-[#E5E5E5] rounded-lg">
              <div className="w-3 h-3 rounded-full bg-[#FFDE59] mt-1.5 flex-shrink-0"></div>
              <div><strong className="block mb-1">GDPR and Personal Data</strong><span className="text-gray-600">Never input personal data (names, emails, health information, financial details) into third-party prompt tools. Under GDPR, processing personal data through an external service without a Data Processing Agreement can constitute a breach. Use anonymised or fictional data when testing prompts.</span></div>
            </div>
            <div className="flex items-start gap-4 p-5 border border-[#E5E5E5] rounded-lg">
              <div className="w-3 h-3 rounded-full bg-[#FFDE59] mt-1.5 flex-shrink-0"></div>
              <div><strong className="block mb-1">EU AI Act Implications</strong><span className="text-gray-600">The EU AI Act (effective 2025) introduces transparency requirements for AI-generated content. If you are using prompt generators to produce content for publication, clearly label AI-assisted work. Automated content generation workflows may fall under the Act's transparency obligations depending on use case and scale.</span></div>
            </div>
            <div className="flex items-start gap-4 p-5 border border-[#E5E5E5] rounded-lg">
              <div className="w-3 h-3 rounded-full bg-[#FFDE59] mt-1.5 flex-shrink-0"></div>
              <div><strong className="block mb-1">Bias Amplification</strong><span className="text-gray-600">Poorly structured prompts can amplify biases present in the underlying model. When generating content about people, groups, or sensitive topics, review outputs critically and use constraints to reduce stereotyping. Explicit instructions like "avoid generalisations" and "present balanced perspectives" significantly reduce bias in AI outputs.</span></div>
            </div>
            <div className="flex items-start gap-4 p-5 border border-[#E5E5E5] rounded-lg">
              <div className="w-3 h-3 rounded-full bg-[#FFDE59] mt-1.5 flex-shrink-0"></div>
              <div><strong className="block mb-1">Data Retention Policies</strong><span className="text-gray-600">Each AI provider has different data retention and training policies. OpenAI, Anthropic, and Google all allow opting out of model training via account settings. For business use, review each tool's Enterprise terms and use the API rather than consumer products wherever sensitive prompts are involved.</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {generatorFAQs.map((faq, i) => (
              <div key={i} className="border border-[#E5E5E5] rounded-lg p-6">
                <h3 className="font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8">More AI Prompt Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/ai-prompt-examples" className="bg-white rounded-lg p-6 border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors block">
              <h3 className="font-bold mb-2">AI Prompt Examples</h3>
              <p className="text-sm text-gray-600">Browse 500+ tested prompts across every category — copy and use instantly.</p>
            </Link>
            <Link href="/chatgpt-prompt-templates" className="bg-white rounded-lg p-6 border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors block">
              <h3 className="font-bold mb-2">ChatGPT Templates</h3>
              <p className="text-sm text-gray-600">100+ prompt templates organised by profession and use case.</p>
            </Link>
            <Link href="/ai-prompt-generator/how-to-write-effective-ai-prompts" className="bg-white rounded-lg p-6 border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors block">
              <h3 className="font-bold mb-2">How to Write AI Prompts</h3>
              <p className="text-sm text-gray-600">A step-by-step guide to prompt engineering for beginners.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">From prompts to working agents</h2>
            <p className="text-lg text-gray-700 mb-8">
              Prompts are the first 10%. The real leverage is inside Claude Code — sub-agents, MCP servers,
              hooks, and slash commands that run those prompts against your files, repos, and APIs.
            </p>
            <Link
              href="/claude-code-guide"
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
            >
              Read the Claude Code guide
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
