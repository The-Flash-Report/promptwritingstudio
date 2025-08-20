import { useState } from 'react'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getModifierSlugs, getModifierData } from '../../lib/modifiers'

export default function ModifierPage({ modifierData }) {
  const router = useRouter()
  const [activePromptIndex, setActivePromptIndex] = useState(null)
  const { 
    modifierName, 
    promptTemplates, 
    useCases, 
    faqs, 
    relatedModifiers,
    seoData
  } = modifierData

  const togglePrompt = (index) => {
    if (activePromptIndex === index) {
      setActivePromptIndex(null)
    } else {
      setActivePromptIndex(index)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Prompt copied to clipboard!')
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
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
            <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">ChatGPT Prompts</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {promptTemplates.length}+ Expert-Crafted ChatGPT Prompts for {modifierName}
            </h1>
            <p className="text-xl mb-8">
              Save hours and get better results with our tested and optimized prompts specifically designed for {modifierName.toLowerCase()} professionals and enthusiasts.
            </p>
            <a href="#prompt-templates" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block">
              View Prompt Templates
            </a>
          </div>
        </div>
      </section>

      {/* Special Image Tutorial Section - Only for Image Modifier */}
      {modifierName.toLowerCase() === 'image' && (
        <section className="py-12 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">🎨</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">5-Minute AI Image Creation Tutorial</h2>
                  <p className="text-lg text-gray-600">Learn how to create stunning AI images in just 5 minutes with our proven process</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Choose Your Style</h3>
                        <p className="text-gray-600 text-sm">Pick from photorealistic, artistic, or stylized approaches based on your needs</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Use Our Templates</h3>
                        <p className="text-gray-600 text-sm">Copy one of our expert-crafted prompts below and customize it for your project</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Generate & Refine</h3>
                        <p className="text-gray-600 text-sm">Paste into DALL-E, Midjourney, or your preferred AI image generator</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Pro Tips for Best Results</h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Be specific about lighting, mood, and artistic style</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Include technical details like aspect ratio and resolution</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Mention what NOT to include to avoid unwanted elements</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        <span>Use our examples below as starting points</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <a href="#prompt-templates" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 inline-flex items-center">
                    <span>Start Creating Images Now</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why You Need Specialized ChatGPT Prompts for {modifierName}</h2>
            <p className="text-lg text-gray-700 mb-6">
              ChatGPT is a powerful AI assistant, but getting the best results for {modifierName.toLowerCase()} requires carefully crafted prompts that follow OpenAI's best practices. Generic prompts often lead to generic outputs that don't maintain your authentic voice.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our {modifierName.toLowerCase()} prompts are designed based on OpenAI's official guidelines and include all the key components of effective prompts: clear context, specific instructions, format guidance, examples, and audience information.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold mb-3">ChatGPT Prompt Best Practices for {modifierName}</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700"><strong>Be specific about your {modifierName.toLowerCase()} goals</strong> - Tell ChatGPT exactly what you're trying to achieve</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700"><strong>Include your expertise level</strong> - Help ChatGPT understand your {modifierName.toLowerCase()} background</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700"><strong>Define your audience</strong> - Specify who will be consuming your {modifierName.toLowerCase()} content</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700"><strong>Request your authentic voice</strong> - Ask for content that sounds like you wrote it</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#F9F9F9] p-8 rounded-xl border border-[#E5E5E5] mt-8">
              <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">What Makes Our {modifierName} Prompts Different</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span><strong>Context-Rich Instructions</strong>: Each prompt includes the necessary context for ChatGPT to understand exactly what you need.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span><strong>Structured Outputs</strong>: Our prompts guide ChatGPT to deliver responses in useful, structured formats.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span><strong>Industry-Specific Language</strong>: We include the right terminology and concepts for {modifierName.toLowerCase()} to get more relevant results.</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span><strong>Voice Preservation</strong>: Our prompts are designed to maintain your authentic voice in the outputs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Examples Section - Only for Image Modifier */}
      {modifierName.toLowerCase() === 'image' && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">See What These Prompts Can Create</h2>
                <p className="text-lg text-gray-600">Visual examples of AI-generated images using our prompt templates</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Example 1: Detailed Scene */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6">
                  <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🏰</div>
                      <div className="text-sm">AI-Generated Scene</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Detailed Scene Generator</h3>
                  <p className="text-sm text-gray-600 mb-3">Creates rich, atmospheric environments with specific lighting and mood</p>
                  <div className="text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">DALL-E</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded ml-2">Midjourney</span>
                  </div>
                </div>
                
                {/* Example 2: Character Design */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6">
                  <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">👤</div>
                      <div className="text-sm">AI-Generated Character</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Character Design Prompt</h3>
                  <p className="text-sm text-gray-600 mb-3">Detailed character descriptions with personality and visual traits</p>
                  <div className="text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">DALL-E</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded ml-2">Stable Diffusion</span>
                  </div>
                </div>
                
                {/* Example 3: Product Visualization */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6">
                  <div className="bg-gray-200 rounded-lg h-48 mb-4 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📱</div>
                      <div className="text-sm">AI-Generated Product</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Product Visualization</h3>
                  <p className="text-sm text-gray-600 mb-3">Professional product shots with perfect lighting and composition</p>
                  <div className="text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">DALL-E</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded ml-2">Midjourney</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-sm text-gray-500 mb-4">
                  💡 <strong>Pro Tip:</strong> These are placeholder examples. Use our prompts below to create your own stunning AI images!
                </p>
                <a href="#prompt-templates" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  <span>View All Prompt Templates</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Prompt Templates Section */}
      <section id="prompt-templates" className="py-16 md:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#1A1A1A]">Expert-Crafted {modifierName} Prompt Templates</h2>
            <p className="text-lg text-[#333333] mb-12 text-center">
              Click on any prompt to view the full template. Copy and paste into ChatGPT to use.
            </p>
            {promptTemplates.map((template, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm mb-8">
                <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A]">{template.title}</h3>
                <p className="text-gray-700 mb-6">{template.description}</p>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 font-mono text-sm mb-6 whitespace-pre-wrap">
                  {template.prompt}
                </div>
                
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => copyToClipboard(template.prompt)}
                    className="text-sm bg-[#FFDE59] text-black px-4 py-2 rounded-lg hover:bg-[#E5C84F] transition"
                  >
                    <i className="fas fa-copy mr-2"></i>
                    Copy to Clipboard
                  </button>
                  <span className="text-sm text-gray-500">
                    {template.wordCount} words | {template.category}
                  </span>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => togglePrompt(index)}
                    className="flex items-center text-[#1A1A1A] font-medium"
                  >
                    {activePromptIndex === index ? (
                      <>
                        <i className="fas fa-chevron-up mr-2"></i> Hide Details
                      </>
                    ) : (
                      <>
                        <i className="fas fa-chevron-down mr-2"></i> Show Example & Tips
                      </>
                    )}
                  </button>
                  
                  {activePromptIndex === index && (
                    <div className="mt-4 space-y-6">
                      {template.example && (
                        <div>
                          <h4 className="font-bold mb-2">Example Output:</h4>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm whitespace-pre-wrap">
                            {template.example}
                          </div>
                        </div>
                      )}
                      
                      {template.tips && (
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <h4 className="font-bold text-yellow-800 mb-2">Pro Tips:</h4>
                          <ul className="list-disc pl-5 text-sm text-yellow-800">
                            {template.tips.map((tip, i) => (
                              <li key={i} className="mb-1">{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How Professionals Use These {modifierName} Prompts</h2>
            
            <div className="space-y-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      <i className={`${useCase.icon} text-2xl text-indigo-600`}></i>
                    </div>
                    <h3 className="text-xl font-bold">{useCase.title}</h3>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-700">{useCase.description}</p>
                    <div className="mt-3 text-sm text-indigo-600 font-medium">
                      Recommended prompt: {useCase.recommendedPrompt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#1A1A1A]">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#F9F9F9] p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-3 text-[#1A1A1A]">{faq.question}</h3>
                  <div className="text-[#333333] space-y-4">
                    {/* Format the answer text by splitting on numbered points */}
                    {faq.answer.split(/(?=\d+\))/).map((part, i) => {
                      if (!part.trim()) return null;
                      
                      // Check if this part starts with a number
                      const isNumbered = /^\d+\)/.test(part.trim());
                      
                      if (isNumbered) {
                        // This is a numbered point
                        const [number, ...rest] = part.trim().split(' ');
                        return (
                          <div key={i} className="flex mb-3">
                            <span className="font-bold mr-2 flex-shrink-0">{number}</span>
                            <span>{rest.join(' ')}</span>
                          </div>
                        );
                      } else {
                        // This is a regular paragraph
                        return <p key={i} className="mb-3">{part.trim()}</p>;
                      }
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Prompts Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#1A1A1A]">Explore More ChatGPT Prompts</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {relatedModifiers.slice(0, 4).map((related, index) => (
                <Link 
                  key={index} 
                  href={`/chatgpt-prompts-for/${related.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block bg-white p-6 rounded-xl hover:shadow-md transition border border-[#E5E5E5]"
                >
                  <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">ChatGPT Prompts for {related}</h3>
                  <p className="text-[#333333]">Discover expert-crafted prompts to improve your {related.toLowerCase()} results.</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* AI Prompt Generator Promo */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 flex items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Create Your Own {modifierName} Prompts</h2>
                  <p className="text-gray-700 mb-6">
                    Want to create custom ChatGPT prompts for {modifierName.toLowerCase()}? Use our interactive prompt generator to build effective prompts based on OpenAI's best practices that maintain your authentic voice.                  
                  </p>
                  <Link 
                    href={`/ai-prompt-generator/chatgpt-prompt-for-${router.query.modifier}`}
                    className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-flex items-center"
                  >
                    <span>Create {modifierName} Prompts</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 bg-indigo-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm inline-block mb-4">
                    <svg className="w-16 h-16 text-indigo-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Features:</h3>
                  <ul className="text-left text-sm space-y-2 max-w-xs mx-auto">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{modifierName}-specific components</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Based on OpenAI's best practices</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Maintains your authentic voice</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>100% free, no sign-up required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 gradient-bg text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master ChatGPT for {modifierName}?</h2>
            <p className="text-xl mb-8">
              Get access to our full library of premium prompt templates and start creating content that truly sounds like you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#pricing" 
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
              >
                View Pricing Plans
              </Link>
              <Link 
                href="/chatgpt-prompt-templates" 
                className="border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] hover:border-[#FFDE59] transition"
              >
                Browse All Templates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticPaths() {
  // Get all modifier slugs
  const modifiers = getModifierSlugs()
  
  // Map the slugs to the required format for Next.js
  const paths = modifiers.map(modifier => ({
    params: { modifier }
  }))
  
  // For Netlify deployment, ensure we're returning a complete array of paths
  // and setting fallback to false to generate all pages at build time
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  try {
    // Get data for this specific modifier
    const modifierData = getModifierData(params.modifier)
    
    return {
      props: {
        modifierData
      }
    }
  } catch (error) {
    console.error(`Error in getStaticProps for modifier ${params.modifier}:`, error)
    
    // Return fallback data to prevent build failures
    return {
      props: {
        modifierData: {
          modifierName: params.modifier,
          promptTemplates: [],
          useCases: [],
          faqs: [],
          relatedModifiers: [],
          seoData: {
            title: `${params.modifier} Prompts`,
            description: `ChatGPT prompts for ${params.modifier}`
          }
        }
      }
    }
  }
}
