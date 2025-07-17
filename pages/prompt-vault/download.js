import Layout from '../../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function PromptVaultDownload() {
  const [downloadStarted, setDownloadStarted] = useState(false)

  const handleDownload = () => {
    setDownloadStarted(true)
    // TODO: Replace with actual PDF file path when ready
    window.open('/files/prompt-vault.pdf', '_blank')
  }

  return (
    <Layout>
      <Head>
        <title>Download Your Prompt Vault - PromptWritingStudio</title>
        <meta name="description" content="Download your 50 business-ready AI prompt templates PDF." />
        <meta name="robots" content="noindex" />
      </Head>

      {/* Download Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F9F9F9] to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#28a745] text-white px-6 py-3 rounded-full font-bold mb-8">
              ✅ Access Granted
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1A1A1A] leading-tight">
              Your Prompt Vault Awaits
            </h1>
            
            <p className="text-xl md:text-2xl text-[#333333] mb-8 leading-relaxed">
              Ready to transform your AI tools into business partners?
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12 border border-[#E5E5E5]">
              <h2 className="text-2xl font-bold mb-6 text-[#1A1A1A]">📥 Download Your PDF</h2>
              
              <div className="bg-[#F9F9F9] p-6 rounded-lg mb-6">
                <h3 className="font-bold mb-3 text-[#1A1A1A]">What you're getting:</h3>
                <ul className="text-left space-y-2 text-[#333333]">
                  <li>✅ 50 business-ready prompt templates</li>
                  <li>✅ Copy-paste ready for ChatGPT, Claude, Gemini</li>
                  <li>✅ Organized by business function</li>
                  <li>✅ Complete usage instructions</li>
                  <li>✅ Bonus meta-prompt creator</li>
                  <li>✅ Pro tips for maximum results</li>
                </ul>
              </div>
              
              <button 
                onClick={handleDownload}
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-xl hover:bg-[#E5C84F] transition-colors duration-200 mb-4"
              >
                📥 Download PDF Now (2.1 MB)
              </button>
              
              {downloadStarted && (
                <div className="bg-[#d4edda] border border-[#c3e6cb] text-[#155724] p-4 rounded-lg mt-4">
                  <strong>Download started!</strong> If your download didn't start automatically, 
                  <button onClick={handleDownload} className="underline ml-1">click here</button>.
                </div>
              )}
              
              <p className="text-sm text-[#666] mt-4">
                <strong>Having trouble?</strong> Email us at support@promptwritingstudio.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1A1A]">
              🚀 Quick Start Guide
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-[#FFDE59] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
                <h3 className="font-bold mb-2">Choose Your Tool</h3>
                <p className="text-[#333333]">Open ChatGPT, Claude, or your preferred AI tool</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFDE59] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
                <h3 className="font-bold mb-2">Pick a Prompt</h3>
                <p className="text-[#333333]">Find the prompt that matches your current need</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFDE59] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
                <h3 className="font-bold mb-2">Customize & Use</h3>
                <p className="text-[#333333]">Replace [brackets] with your details and hit enter</p>
              </div>
            </div>
            
            <div className="bg-[#F9F9F9] p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">💡 Pro Tips for Best Results:</h3>
              <ul className="space-y-3 text-[#333333]">
                <li>• <strong>Be specific:</strong> Replace [brackets] with detailed, specific information</li>
                <li>• <strong>Test variations:</strong> Try the same prompt with different AI tools</li>
                <li>• <strong>Save winners:</strong> Keep a collection of your best-performing prompts</li>
                <li>• <strong>Iterate:</strong> Refine the output by asking follow-up questions</li>
                <li>• <strong>Combine prompts:</strong> Use multiple prompts in sequence for complex tasks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Example Preview */}
      <section className="py-16 md:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1A1A]">
              📝 Example: Email Marketing Prompt
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h3 className="font-bold mb-4 text-[#1A1A1A]">Daily Email Generator (From Section 2)</h3>
              <div className="bg-[#f8f9fa] p-6 rounded-lg font-mono text-sm">
                <p className="mb-4">You're an expert direct-response copywriter who writes engaging daily emails for [your audience].</p>
                <p className="mb-4">Write a 500-word email about [topic] that:</p>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Opens with a personal story or observation</li>
                  <li>Connects to a business lesson</li>
                  <li>Ends with a clear call-to-action for [your offer]</li>
                  <li>Uses conversational, story-driven tone</li>
                  <li>Includes emotional hooks and curiosity gaps</li>
                </ul>
                <p>Style: Bryan Collins' approach - personal, direct, no fluff.</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-[#333333] mb-4">
                This is just 1 of 50 prompts in your vault. Each one is designed to save you hours of work!
              </p>
              <button 
                onClick={handleDownload}
                className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Get All 50 Prompts Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Next Steps */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">🤝 Need Help?</h3>
                <div className="space-y-4">
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold mb-2">📧 Email Support</h4>
                    <p className="text-[#333333]">support@promptwritingstudio.com</p>
                    <p className="text-sm text-[#666]">We typically respond within 24 hours</p>
                  </div>
                  
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold mb-2">💬 Quick Questions</h4>
                    <p className="text-[#333333]">Check the FAQ section in your PDF</p>
                    <p className="text-sm text-[#666]">Most common questions are answered there</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">🎯 What's Next?</h3>
                <div className="space-y-4">
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Ready for More?</h4>
                    <p className="text-[#333333] mb-3">
                      Join PromptWritingStudio for 100+ advanced prompts, weekly lessons, and expert support.
                    </p>
                    <Link 
                      href="https://courses.becomeawritertoday.com/purchase?product_id=6253746" 
                      className="bg-[#1A1A1A] text-white px-4 py-2 rounded font-bold text-sm hover:bg-[#333333] transition-colors duration-200 inline-block"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Upgrade to Premium
                    </Link>
                  </div>
                  
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Share Your Success</h4>
                    <p className="text-[#333333]">
                      Got great results? Email us your story - we love hearing from customers!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 