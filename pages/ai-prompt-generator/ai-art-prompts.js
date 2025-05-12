import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { seoUseCases } from '../../data/seo-use-cases'
import { 
  promptComponents, 
  platformTemplates, 
  generatePrompt 
} from '../../data/prompt-generator-components'

export default function AiArtPrompts() {
  const [componentValues, setComponentValues] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [selectedArtStyle, setSelectedArtStyle] = useState('');
  
  const artStyles = [
    { value: 'photorealistic', label: 'Photorealistic' },
    { value: 'impressionist', label: 'Impressionist' },
    { value: 'surrealism', label: 'Surrealism' },
    { value: 'pop-art', label: 'Pop Art' },
    { value: 'cyberpunk', label: 'Cyberpunk' },
    { value: 'anime', label: 'Anime' },
    { value: 'digital-art', label: 'Digital Art' },
    { value: 'oil-painting', label: 'Oil Painting' },
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'pixel-art', label: 'Pixel Art' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'minimalist', label: 'Minimalist' }
  ];
  
  // Handle component value changes
  const handleComponentChange = (componentId, value) => {
    setComponentValues(prev => ({
      ...prev,
      [componentId]: value
    }));
  };
  
  // Generate art prompt
  const handleGeneratePrompt = () => {
    const subject = componentValues.subject || '';
    const style = selectedArtStyle || '';
    const details = componentValues.details || '';
    const lighting = componentValues.lighting || '';
    const colors = componentValues.colors || '';
    
    let prompt = `Create an image of ${subject}`;
    
    if (style) {
      prompt += ` in ${style} style`;
    }
    
    if (details) {
      prompt += `, with ${details}`;
    }
    
    if (lighting) {
      prompt += `, ${lighting} lighting`;
    }
    
    if (colors) {
      prompt += `, color palette: ${colors}`;
    }
    
    prompt += `. High quality, detailed, professional.`;
    
    setGeneratedPrompt(prompt);
  };
  
  // Copy prompt to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };
  
  return (
    <Layout
      title="AI Art Prompts | Create Effective Prompts for DALL-E, Midjourney & Stable Diffusion"
      description="Generate optimized prompts for AI image generation. Our free AI art prompt generator helps you create better prompts for DALL-E, Midjourney, and Stable Diffusion."
    >
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Art Prompts Generator
            </h1>
            <p className="text-xl mb-8">
              Create effective prompts for AI art generation tools like DALL-E, Midjourney, and Stable Diffusion.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#generator"
                className="bg-white text-[#1A1A1A] px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200"
              >
                Start Generating
              </a>
              <Link
                href="/ai-prompt-generator"
                className="bg-opacity-20 bg-white hover:bg-opacity-30 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                View All Generators
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Generator Section */}
      <section id="generator" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Generate Your AI Art Prompt
            </h2>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                {/* Left Panel - Controls */}
                <div className="md:w-1/2 p-6 md:p-8 border-r border-gray-200">
                  <h3 className="text-xl font-semibold mb-6">
                    Customize Your Art Prompt
                  </h3>
                  
                  {/* Subject Input */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      placeholder="What do you want to create? (e.g., 'a mountain landscape', 'a futuristic city')"
                      value={componentValues.subject || ''}
                      onChange={(e) => handleComponentChange('subject', e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Be specific about what you want to see in the image
                    </p>
                  </div>
                  
                  {/* Art Style Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Art Style</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      value={selectedArtStyle}
                      onChange={(e) => setSelectedArtStyle(e.target.value)}
                    >
                      <option value="">Select an art style</option>
                      {artStyles.map(style => (
                        <option key={style.value} value={style.value}>
                          {style.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">
                      The artistic style influences the overall look and feel
                    </p>
                  </div>
                  
                  {/* Details Input */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Details</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      rows="3"
                      placeholder="Additional details (e.g., 'with snow-capped peaks', 'with flying cars and neon lights')"
                      value={componentValues.details || ''}
                      onChange={(e) => handleComponentChange('details', e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Add specific details to enhance your image
                    </p>
                  </div>
                  
                  {/* Lighting Input */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Lighting</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      placeholder="Lighting conditions (e.g., 'sunset', 'dramatic', 'soft')"
                      value={componentValues.lighting || ''}
                      onChange={(e) => handleComponentChange('lighting', e.target.value)}
                    />
                  </div>
                  
                  {/* Colors Input */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Color Palette</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      placeholder="Color scheme (e.g., 'vibrant blues and oranges', 'monochromatic')"
                      value={componentValues.colors || ''}
                      onChange={(e) => handleComponentChange('colors', e.target.value)}
                    />
                  </div>
                  
                  <button
                    onClick={handleGeneratePrompt}
                    className="w-full bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
                    disabled={!componentValues.subject}
                  >
                    Generate Art Prompt
                  </button>
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
                    <div className="bg-white border border-gray-200 rounded-lg p-4 h-[300px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-mono text-sm">{generatedPrompt}</pre>
                    </div>
                  ) : (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 h-[300px] flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                        <h3 className="text-lg font-medium mb-2">No Prompt Generated Yet</h3>
                        <p>Fill in the form and click "Generate Art Prompt" to create your AI art prompt.</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Platform Information */}
                  {generatedPrompt && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">
                        Compatible with DALL-E, Midjourney & Stable Diffusion
                      </h3>
                      <p className="text-sm text-blue-700">
                        This prompt follows best practices for AI art generation and works with all major image generation models.
                      </p>
                      <div className="mt-3 text-sm">
                        <p className="font-medium text-blue-800">Platform-specific tips:</p>
                        <ul className="list-disc pl-5 mt-1 text-blue-700">
                          <li>For Midjourney, add "--ar 16:9" to specify aspect ratio</li>
                          <li>For DALL-E, be more descriptive with visual details</li>
                          <li>For Stable Diffusion, consider adding negative prompts</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Art Styles Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Popular Art Styles for AI Prompts
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Photorealistic</h3>
                <p className="text-gray-700 mb-3">
                  Creates images that look like real photographs with accurate lighting, textures, and details.
                </p>
                <p className="text-sm text-blue-600">
                  Example: "A photorealistic mountain landscape with snow-capped peaks, pine trees, and a clear blue sky"
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Digital Art</h3>
                <p className="text-gray-700 mb-3">
                  Modern digital illustration style with clean lines, vibrant colors, and a polished finish.
                </p>
                <p className="text-sm text-blue-600">
                  Example: "A digital art illustration of a futuristic cityscape with flying cars and neon lights"
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Anime</h3>
                <p className="text-gray-700 mb-3">
                  Japanese animation style with distinctive character designs, expressive eyes, and stylized features.
                </p>
                <p className="text-sm text-blue-600">
                  Example: "An anime-style portrait of a young hero with blue hair, determined expression, in a fantasy setting"
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Oil Painting</h3>
                <p className="text-gray-700 mb-3">
                  Classical painting style with rich textures, visible brushstrokes, and depth of color.
                </p>
                <p className="text-sm text-blue-600">
                  Example: "An oil painting of a sunset over the ocean with dramatic clouds and warm colors"
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link
                href="/ai-prompt-generator/seo/art-styles-for-ai-prompts"
                className="text-[#1A1A1A] font-medium hover:underline"
              >
                View all art styles for AI prompts →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Best Practices Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Best Practices for AI Art Prompts
            </h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-[#FFDE59] rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <span className="text-[#1A1A1A] font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Be Specific and Detailed</h3>
                  <p className="text-gray-700">
                    The more specific your prompt, the better results you'll get. Include details about the subject, style, lighting, colors, and composition.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-[#FFDE59] rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <span className="text-[#1A1A1A] font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Reference Specific Artists or Styles</h3>
                  <p className="text-gray-700">
                    Mentioning specific artists, art movements, or styles helps guide the AI toward a particular aesthetic. For example, "in the style of Van Gogh" or "cyberpunk aesthetic."
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-[#FFDE59] rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <span className="text-[#1A1A1A] font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Use Quality Modifiers</h3>
                  <p className="text-gray-700">
                    Include terms like "high quality," "detailed," "professional," "8K resolution," or "award-winning" to encourage the AI to generate more polished results.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="bg-[#FFDE59] rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <span className="text-[#1A1A1A] font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Consider Negative Prompts</h3>
                  <p className="text-gray-700">
                    For some AI tools like Stable Diffusion, you can specify what you don't want to see in the image. This helps avoid common issues like distorted hands or faces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Generators Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Explore Related Prompt Generators
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seoUseCases
                .filter(useCase => ['prompts-for-ai-art', 'best-prompts-for-ai-art', 'how-to-write-prompts-for-ai-art'].includes(useCase.slug))
                .map(useCase => (
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
            
            <div className="text-center mt-8">
              <Link
                href="/ai-prompt-generator"
                className="text-[#1A1A1A] font-medium hover:underline"
              >
                View all prompt generators →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
