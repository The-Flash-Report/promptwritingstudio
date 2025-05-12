import Layout from '../components/layout/Layout'
import Link from 'next/link'
import Script from 'next/script'
import { getAllModifiers } from '../lib/modifiers'

export default function ChatGPTPromptTemplates({ modifiers }) {
  return (
    <Layout
      title="ChatGPT Prompt Templates - Expert-Crafted Templates for Better Results | PromptWritingStudio"
      description="Browse our comprehensive library of expert-crafted ChatGPT prompt templates for various use cases. Get better results from ChatGPT with our tested prompts."
    >
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              ChatGPT Prompt Templates
            </h1>
            <p className="text-xl mb-8">
              Browse our comprehensive library of expert-crafted ChatGPT prompt templates based on OpenAI's best practices. Get better results and maintain your authentic voice with our tested and optimized prompts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#prompt-categories" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block">
                Browse Templates
              </a>
              <Link href="/ai-prompt-generator/seo/chatgpt-prompt" className="bg-white text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors duration-200 inline-block">
                Try ChatGPT Prompt Generator
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Master the Art of ChatGPT Prompt Engineering</h2>
            <p className="text-lg text-gray-700 mb-6">
              The quality of your ChatGPT outputs depends directly on the quality of your prompts. Our expert-crafted templates follow OpenAI's best practices to help you get consistently better results while maintaining your authentic voice.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Each template in our library includes the key components of effective prompts: clear context, specific instructions, format guidance, examples, and audience information. Simply customize with your details to transform generic AI outputs into content that sounds like you.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-bold mb-3">ChatGPT Prompt Best Practices</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700"><strong>Be specific and detailed</strong> - The more specific your instructions, the better your results</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700"><strong>Include context about who you are</strong> - Help ChatGPT understand your perspective and expertise</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700"><strong>Specify format and structure</strong> - Clearly define how you want the output organized</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-700"><strong>Define your audience</strong> - Tell ChatGPT who will be reading the content</span>
                </li>
              </ul>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Find</h3>
                <p className="text-gray-700">Browse our library of templates for your specific use case</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Customize</h3>
                <p className="text-gray-700">Replace the placeholders with your specific details and voice</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Results</h3>
                <p className="text-gray-700">Enjoy authentic, high-quality outputs that sound like you</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section id="prompt-categories" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Browse ChatGPT Prompt Categories</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modifiers.map((modifier, index) => (
                <Link 
                  key={index} 
                  href={`/chatgpt-prompts-for/${modifier.slug}`}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col h-full"
                >
                  <h3 className="text-xl font-bold mb-2 text-gray-800">ChatGPT Prompts for {modifier.modifierName}</h3>
                  <p className="text-gray-700 mb-4 flex-grow">{modifier.promptTemplates.length}+ expert-crafted templates for {modifier.modifierName.toLowerCase()} tasks</p>
                  <div className="flex justify-end items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-blue-500 font-medium">View Templates <i className="fas fa-arrow-right ml-1"></i></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Use Our ChatGPT Prompt Templates?</h2>
            
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-clock text-2xl text-indigo-600"></i>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Save Hours of Time</h3>
                  <p className="text-gray-700">
                    Stop wasting time refining prompts through trial and error. Our templates give you optimal results from the first try, saving you hours of experimentation and refinement.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-chart-line text-2xl text-indigo-600"></i>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Get Consistent Results</h3>
                  <p className="text-gray-700">
                    Our templates are designed to produce consistent, high-quality outputs every time. No more unpredictable results or outputs that miss the mark.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-graduation-cap text-2xl text-indigo-600"></i>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">Learn Prompt Engineering</h3>
                  <p className="text-gray-700">
                    By using our templates, you'll learn the principles of effective prompt engineering. Over time, you'll develop the skills to create your own powerful prompts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonial-embed" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What My Clients, Students and Readers Say</h2>
          <Script src="https://testimonial.to/js/iframeResizer.min.js" strategy="beforeInteractive" />
          <div className="testimonial-container">
            <iframe 
              height="800px" 
              id='testimonialto-become-a-writer-today-tag-all-light-animated' 
              src="https://embed-v2.testimonial.to/w/become-a-writer-today?animated=on&theme=light&shadowColor=ffffff&speed=1&tag=all&cc=off" 
              frameBorder="0" 
              scrolling="no" 
              width="100%"
            ></iframe>
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
                  <h2 className="text-2xl font-bold mb-4">Try Our ChatGPT Prompt Generator</h2>
                  <p className="text-gray-700 mb-6">
                    Want to create your own custom ChatGPT prompts? Use our interactive prompt generator to build effective prompts based on OpenAI's best practices that maintain your authentic voice.                  
                  </p>
                  <Link 
                    href="/ai-prompt-generator/seo/chatgpt-prompt" 
                    className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-flex items-center"
                  >
                    <span>Create Custom ChatGPT Prompts</span>
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
                      <span>Based on OpenAI's best practices</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-indigo-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Customizable prompt components</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master AI Prompt Writing?</h2>
            <p className="text-xl mb-8">
              Get access to our full library of premium prompt templates, personalized guidance, and expert techniques to create content that truly sounds like you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/#pricing" 
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
              >
                View Pricing Plans
              </Link>
              <Link 
                href="/ai-prompt-generator" 
                className="bg-white text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors duration-200 inline-block"
              >
                Explore All Prompt Generators
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const modifiers = getAllModifiers()
  
  return {
    props: {
      modifiers
    }
  }
}
