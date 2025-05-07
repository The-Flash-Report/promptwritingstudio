import Layout from '../components/layout/Layout'
import Link from 'next/link'
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
              Browse our comprehensive library of expert-crafted ChatGPT prompt templates for various use cases. Get better results and save hours of time with our tested and optimized prompts.
            </p>
            <a href="#prompt-categories" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block">
              Browse Templates
            </a>
          </div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Master the Art of Prompt Engineering</h2>
            <p className="text-lg text-gray-700 mb-6">
              The quality of your ChatGPT outputs depends directly on the quality of your prompts. Our expert-crafted templates help you get consistently better results for specific use cases and tasks.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Each template in our library has been tested and refined to ensure it produces high-quality, relevant outputs. Simply copy the template, customize it with your specific details, and get better results instantly.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search text-2xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Find</h3>
                <p className="text-gray-700">Browse our library of templates for your specific use case</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-edit text-2xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Customize</h3>
                <p className="text-gray-700">Replace the placeholders with your specific details</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-rocket text-2xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Results</h3>
                <p className="text-gray-700">Enjoy better outputs and save hours of refinement time</p>
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
                  <h3 className="text-xl font-bold mb-2 text-indigo-700">ChatGPT Prompts for {modifier.modifierName}</h3>
                  <p className="text-gray-700 mb-4 flex-grow">{modifier.promptTemplates.length}+ expert-crafted templates for {modifier.modifierName.toLowerCase()} tasks</p>
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      <i className="fas fa-fire text-orange-500 mr-1"></i> {modifier.searchVolume} monthly searches
                    </span>
                    <span className="text-indigo-600 font-medium">View Templates <i className="fas fa-arrow-right ml-1"></i></span>
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Michael Chen</h4>
                    <p className="text-gray-600 text-sm">Marketing Director</p>
                  </div>
                </div>
                <div className="mb-4">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
                <p className="text-gray-700">
                  "These prompt templates have completely transformed our content creation process. We're now producing better marketing copy in half the time. The ROI has been incredible."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-gray-600 text-sm">Content Creator</p>
                  </div>
                </div>
                <div className="mb-4">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
                <p className="text-gray-700">
                  "As a content creator, I was skeptical about AI tools, but these prompt templates have changed my mind. The quality of output is remarkable, and I can create content 3x faster."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 gradient-bg text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master ChatGPT?</h2>
            <p className="text-xl mb-8">
              Get access to our full library of premium prompt templates and start creating better content today.
            </p>
            <Link 
              href="/#pricing" 
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
            >
              View Pricing Plans
            </Link>
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
