import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { 
  promptComponents, 
  platformTemplates, 
  generatePrompt 
} from '../data/prompt-generator-components'

export default function GeminiPromptGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState('detailed');
  const [componentValues, setComponentValues] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  
  // Always use Google platform for this page
  const selectedPlatform = 'google';
  
  // Reset component values when template changes
  useEffect(() => {
    setComponentValues({});
    setGeneratedPrompt('');
  }, [selectedTemplate]);
  
  // Handle component value changes
  const handleComponentChange = (componentId, value) => {
    setComponentValues(prev => ({
      ...prev,
      [componentId]: value
    }));
  };
  
  // Generate prompt from platform template
  const handleGeneratePrompt = () => {
    const template = platformTemplates[selectedPlatform][selectedTemplate];
    if (template) {
      const prompt = generatePrompt(template, componentValues);
      setGeneratedPrompt(prompt);
    }
  };
  
  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  // Get current template
  const currentTemplate = platformTemplates[selectedPlatform][selectedTemplate];
  
  // Gemini-specific examples and tips
  const geminiExamples = [
    {
      title: "Image Analysis",
      prompt: "Analyze this image and describe what you see in detail. Focus on:\n- Main subjects and objects\n- Colors and composition\n- Mood and atmosphere\n- Any text or symbols present\n\nProvide your analysis in a structured format with clear headings."
    },
    {
      title: "Code Review",
      prompt: "Review the following code and provide feedback on:\n- Code quality and best practices\n- Potential bugs or issues\n- Performance optimizations\n- Readability improvements\n\nFormat your response with specific line references and actionable suggestions."
    },
    {
      title: "Creative Writing",
      prompt: "Write a short story (500-800 words) about a time traveler who discovers they can only travel to moments of great historical significance, but they can't change anything.\n\nStyle: Literary fiction\nTone: Contemplative and mysterious\nInclude: Rich sensory details and internal monologue"
    }
  ];

  return (
    <Layout 
      title="Gemini Prompt Generator - Create Optimized Prompts for Google's Gemini AI"
      description="Generate effective prompts for Google Gemini AI. Our specialized tool helps you create optimized prompts that leverage Gemini's multimodal capabilities for better results."
      canonical="https://promptwritingstudio.com/gemini-prompt-generator"
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Gemini Prompt Generator
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Create optimized prompts for Google's Gemini AI that leverage its multimodal capabilities
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">✨ Multimodal Support</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🧠 Advanced Reasoning</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">📊 Structured Outputs</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">🎯 Expert Templates</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Introduction */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Harness Gemini's Full Potential
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Google's Gemini excels at multimodal tasks, combining text, image, and code understanding. 
              Our specialized prompt generator helps you create prompts that leverage Gemini's unique capabilities 
              for professional and creative tasks.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Generator Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Build Your Gemini Prompt</h3>
                
                {/* Template Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Template Type
                  </label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.entries(platformTemplates[selectedPlatform]).map(([key, template]) => (
                      <option key={key} value={key}>
                        {template.name} - {template.description}
                      </option>
                    ))}
                  </select>
                  {currentTemplate && (
                    <p className="text-sm text-gray-600 mt-2">
                      Best for: {currentTemplate.bestFor.join(', ')}
                    </p>
                  )}
                </div>

                {/* Component Inputs */}
                {currentTemplate && currentTemplate.components.map(componentId => {
                  const component = promptComponents[componentId];
                  if (!component) return null;
                  
                  return (
                    <div key={componentId} className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {component.name}
                        {component.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <textarea
                        value={componentValues[componentId] || ''}
                        onChange={(e) => handleComponentChange(componentId, e.target.value)}
                        placeholder={component.placeholder}
                        rows={componentId === 'task' ? 3 : 2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <p className="text-xs text-gray-500 mt-1">{component.tips}</p>
                      {component.bestPractices?.google && (
                        <p className="text-xs text-blue-600 mt-1">
                          💡 Gemini tip: {component.bestPractices.google}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Generate Button */}
                <button
                  onClick={handleGeneratePrompt}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Generate Gemini Prompt
                </button>

                {/* Generated Prompt */}
                {generatedPrompt && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">Your Optimized Gemini Prompt:</h4>
                      <button
                        onClick={copyToClipboard}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          copiedToClipboard 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {copiedToClipboard ? '✓ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                        {generatedPrompt}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Gemini Features */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Gemini?</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">🖼️</span>
                    <span><strong>Multimodal:</strong> Understands text, images, and code simultaneously</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">🧠</span>
                    <span><strong>Advanced Reasoning:</strong> Excellent at complex problem-solving</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">📊</span>
                    <span><strong>Structured Output:</strong> Great for data analysis and formatting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">💻</span>
                    <span><strong>Code Understanding:</strong> Excellent for programming tasks</span>
                  </li>
                </ul>
              </div>

              {/* Example Prompts */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example Prompts</h3>
                <div className="space-y-4">
                  {geminiExamples.map((example, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">{example.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-3">{example.prompt}</p>
                      <button
                        onClick={() => {
                          setComponentValues({ task: example.prompt });
                          handleGeneratePrompt();
                        }}
                        className="text-blue-600 text-xs hover:underline mt-1"
                      >
                        Use this example →
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Links */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-3">
                  <Link href="/ai-prompt-generator" className="block text-blue-600 hover:underline text-sm">
                    → Multi-Platform AI Prompt Generator
                  </Link>
                  <Link href="/gemini-prompt-templates" className="block text-blue-600 hover:underline text-sm">
                    → Gemini Prompt Templates
                  </Link>
                  <Link href="/chatgpt-prompt-templates" className="block text-blue-600 hover:underline text-sm">
                    → ChatGPT Prompt Templates
                  </Link>
                  <Link href="/ai-prompt-examples" className="block text-blue-600 hover:underline text-sm">
                    → 101+ AI Prompt Examples
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Pro Tips for Gemini Prompts
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🎯</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Be Specific</h4>
                    <p className="text-gray-600 text-sm">Gemini performs better with clear, detailed instructions rather than vague requests.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">📋</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Use Structure</h4>
                    <p className="text-gray-600 text-sm">Break complex tasks into numbered steps or bullet points for better results.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🖼️</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Leverage Multimodal</h4>
                    <p className="text-gray-600 text-sm">Take advantage of Gemini's ability to understand images alongside text prompts.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl mr-3">🔄</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Iterate & Refine</h4>
                    <p className="text-gray-600 text-sm">Use follow-up prompts to refine and improve Gemini's responses.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to Master AI Prompt Writing?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Learn advanced prompt engineering techniques for Gemini, ChatGPT, and Claude. 
              Get access to 100+ professional templates and expert strategies.
            </p>
            <Link 
              href="/#pricing"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              View Course Details
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
