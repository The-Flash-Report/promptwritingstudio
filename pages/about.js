import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

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
                Picture this: Dublin journalism school graduate, failed freelance career, working as a care worker while writing tech articles for pennies. Not exactly the path to creative success.
              </p>
              
              <p>
                But failure taught me resilience. I climbed from care worker to corporate copywriter, eventually helping a FTSE 100 company sell millions in boring software. The work was lucrative but soul-crushing—there's only so much accounting software copy you can write before it kills your creativity.
              </p>
              
              <p>
                I escaped corporate life to build my own content business. Six self-published books, multiple websites, thousands of blog posts. I lived by "little writing"—300 words daily, tracked obsessively on spreadsheets.
              </p>
              
              <p>
                Then ChatGPT changed everything.
              </p>
              
              <p>
                Suddenly, anyone could generate 300 words in seconds. But most of it was garbage—predictable, soulless, forgettable. The creators freaking out about AI "replacing" them were missing the point.
              </p>
              
              <p>
                AI doesn't replace creativity. It amplifies it. If you feed it your authentic experiences and ideas.
              </p>
              
              <p>
                While others churn out generic AI content, I use these tools to scale my authentic voice. That client success story becomes a case study. That business insight becomes a month of content. That random conversation becomes tomorrow's newsletter.
              </p>
              
              <p>
                With OpenAI's latest models hitting 500M weekly users and tools like Claude Sonnet 3.7 getting smarter by the month, the creators who master prompt writing now will dominate the next decade.
              </p>
              
              <p>
                PromptWritingStudio teaches you to be a Chief Idea Officer, not a word wrangler. You bring the ideas. AI handles the execution.
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
                <div className="bg-[#FFDE59] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-graduation-cap text-2xl text-[#1A1A1A]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Learn by Example</h3>
                <p className="text-gray-600">
                  We believe in practical learning. Our platform provides hundreds of real-world examples and templates that you can adapt to your specific needs.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="bg-[#FFDE59] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-sync-alt text-2xl text-[#1A1A1A]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Iterative Improvement</h3>
                <p className="text-gray-600">
                  Prompt engineering is an iterative process. We teach you how to systematically refine your prompts based on the results you get.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="bg-[#FFDE59] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-users text-2xl text-[#1A1A1A]"></i>
                </div>
                <h3 className="text-xl font-bold mb-4">Community-Driven</h3>
                <p className="text-gray-600">
                  Our community of prompt engineers shares insights, techniques, and feedback to help everyone improve their skills.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="bg-[#FFDE59] bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <i className="fas fa-chart-line text-2xl text-[#1A1A1A]"></i>
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
      
      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-xl mb-8">
              Have questions about our services or want to learn more? We'd love to hear from you!
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Contact Us <FaArrowRight className="ml-2" />
            </Link>
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
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="https://courses.becomeawritertoday.com/purchase?product_id=6253746" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
              <a href="https://aiflashreport.com/" className="border border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-[#1A1A1A] transition inline-block" target="_blank" rel="noopener noreferrer">
                Check Out AI Flash Report
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
