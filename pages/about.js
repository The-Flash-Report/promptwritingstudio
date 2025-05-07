import Layout from '../components/layout/Layout'

export default function About() {
  return (
    <Layout 
      title="About PromptWritingStudio - Our Mission and Approach"
      description="Learn about PromptWritingStudio's mission to help everyone master the art of AI prompt engineering for better results."
    >
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About PromptWritingStudio</h1>
            <p className="text-xl mb-8">
              We're on a mission to help everyone master the art of AI prompt engineering and get better results from any AI platform.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Story</h2>
            
            <div className="prose prose-lg mx-auto">
              <p>
                PromptWritingStudio was born from a simple observation: while AI tools like ChatGPT, Claude, and Gemini are incredibly powerful, most people struggle to get the results they want because they don't know how to communicate effectively with AI.
              </p>
              
              <p>
                Our founder, after spending countless hours refining prompts for various projects, realized that prompt engineering is both an art and a science that can be taught. What started as a collection of personal templates and strategies quickly grew into a comprehensive platform designed to help others master this essential skill.
              </p>
              
              <p>
                Today, PromptWritingStudio serves thousands of users worldwide, from content creators and marketers to educators and developers. Our mission remains the same: to democratize prompt engineering knowledge and help everyone get better results from AI tools.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Approach</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-graduation-cap text-2xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Learn by Example</h3>
                <p className="text-gray-600">
                  We believe in practical learning. Our platform provides hundreds of real-world examples and templates that you can adapt to your specific needs.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-sync-alt text-2xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Iterative Improvement</h3>
                <p className="text-gray-600">
                  Prompt engineering is an iterative process. We teach you how to systematically refine your prompts based on the results you get.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-users text-2xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Community-Driven</h3>
                <p className="text-gray-600">
                  Our community of prompt engineers shares insights, techniques, and feedback to help everyone improve their skills.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-chart-line text-2xl text-indigo-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Data-Driven</h3>
                <p className="text-gray-600">
                  We use analytics and testing to identify which prompt strategies work best for different AI models and use cases.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master AI Prompting?</h2>
            <p className="text-xl mb-8">
              Join our community of prompt engineers and start getting better results from AI tools today.
            </p>
            <a href="/#pricing" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block">
              Get Started
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
