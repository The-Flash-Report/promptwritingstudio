import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'

export default function PromptVault() {
  return (
    <Layout>
      <Head>
        <title>The Prompt Vault: 50 Business-Ready AI Templates - Only $7</title>
        <meta name="description" content="Transform your AI tools into business partners with 50 proven prompt templates. Email marketing, content creation, strategy, and more. Instant download for $7." />
        <meta name="keywords" content="AI prompts, business templates, ChatGPT prompts, AI tools, business automation" />
        <meta property="og:title" content="The Prompt Vault: 50 Business-Ready AI Templates - Only $7" />
        <meta property="og:description" content="Transform your AI tools into business partners with 50 proven prompt templates." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F9F9F9] to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-full font-bold mb-6">
              🚀 Launch Special: 65% Off
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1A1A1A] leading-tight">
              The Prompt Vault:<br />
              <span className="text-3xl md:text-5xl">50 Business-Ready AI Templates</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#333333] mb-8 leading-relaxed">
              Transform your AI tools from word-wranglers into business partners
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border border-[#E5E5E5]">
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1A1A1A]">$19</div>
                  <div className="text-sm text-[#666] line-through">Regular Price</div>
                </div>
                <div className="text-4xl text-[#FFDE59]">→</div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1A1A1A]">$7</div>
                  <div className="text-sm text-[#666]">Launch Price</div>
                </div>
              </div>
              
              <button className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-xl hover:bg-[#E5C84F] transition-colors duration-200 w-full md:w-auto">
                Get Instant Access - $7
              </button>
              
              <p className="text-sm text-[#666] mt-4">
                💳 Secure payment • 📧 Instant email delivery • 💯 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1A1A]">
              What's Inside The Vault
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <div className="bg-[#F9F9F9] p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">📧 Email Marketing (10 prompts)</h3>
                  <ul className="space-y-2 text-[#333333]">
                    <li>• Welcome series that converts</li>
                    <li>• Sales emails that don't feel salesy</li>
                    <li>• Subject lines that get opened</li>
                    <li>• Reactivation campaigns</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="bg-[#F9F9F9] p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">📝 Content Creation (15 prompts)</h3>
                  <ul className="space-y-2 text-[#333333]">
                    <li>• Daily email ideas that engage</li>
                    <li>• Social media content that converts</li>
                    <li>• Blog post outlines that rank</li>
                    <li>• Story-to-lesson frameworks</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="bg-[#F9F9F9] p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">💼 Business Strategy (10 prompts)</h3>
                  <ul className="space-y-2 text-[#333333]">
                    <li>• Competitive analysis frameworks</li>
                    <li>• Customer avatar deep-dives</li>
                    <li>• Value proposition crafting</li>
                    <li>• Market research templates</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="bg-[#F9F9F9] p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">🎯 Sales & Social (15 prompts)</h3>
                  <ul className="space-y-2 text-[#333333]">
                    <li>• LinkedIn posts that build authority</li>
                    <li>• Sales copy that converts</li>
                    <li>• Customer service responses</li>
                    <li>• Partnership outreach emails</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-[#FFDE59] p-6 rounded-lg inline-block">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">🎁 BONUS: Meta-Prompt Creator</h3>
                <p className="text-[#333333]">Create unlimited custom prompts for any business task</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 md:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1A1A]">
              Stop Fighting With AI Tools
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A]">❌ Without Proper Prompts:</h3>
                <ul className="space-y-3 text-[#333333]">
                  <li>• Generic, unhelpful responses</li>
                  <li>• Hours spent rewriting prompts</li>
                  <li>• Inconsistent output quality</li>
                  <li>• AI that sounds robotic, not human</li>
                  <li>• Wasted time and frustration</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A]">✅ With The Prompt Vault:</h3>
                <ul className="space-y-3 text-[#333333]">
                  <li>• Proven templates that work instantly</li>
                  <li>• Save 15+ hours per week</li>
                  <li>• Professional, consistent results</li>
                  <li>• AI that sounds like you</li>
                  <li>• Focus on business, not prompt engineering</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-xl hover:bg-[#E5C84F] transition-colors duration-200">
                Get The Vault - $7
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1A1A]">
              Why Business Owners Choose The Vault
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFDE59] mb-2">1,247+</div>
                <div className="text-[#333333]">Business owners using our prompts</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFDE59] mb-2">15+</div>
                <div className="text-[#333333]">Hours saved per week</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#FFDE59] mb-2">30-day</div>
                <div className="text-[#333333]">Money-back guarantee</div>
              </div>
            </div>
            
            <div className="bg-[#F9F9F9] p-8 rounded-lg text-center">
              <p className="text-lg text-[#333333] italic mb-4">
                "These prompts transformed how I use AI. Instead of spending hours trying to get good results, 
                I copy-paste and get exactly what I need in minutes."
              </p>
              <div className="font-bold text-[#1A1A1A]">- Sarah M., Marketing Consultant</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1A1A]">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">What format do I get the prompts in?</h3>
                <p className="text-[#333333]">You'll receive a professionally formatted PDF with all 50 prompts, plus usage instructions and customization tips. Perfect for copy-pasting into any AI tool.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Do these work with ChatGPT, Claude, and other AI tools?</h3>
                <p className="text-[#333333]">Yes! These prompts are designed to work across all major AI platforms including ChatGPT, Claude, Gemini, and any future AI tools.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">How quickly will I see results?</h3>
                <p className="text-[#333333]">Immediately! These are copy-paste ready templates. You can start using them within minutes of downloading.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">What if I'm not satisfied?</h3>
                <p className="text-[#333333]">We offer a 30-day money-back guarantee. If you're not completely satisfied, email us for a full refund.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-[#1A1A1A] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your AI Tools?
            </h2>
            
            <p className="text-xl mb-8 text-gray-300">
              Join 1,247+ business owners who've stopped fighting with AI and started getting results
            </p>
            
            <div className="bg-white p-8 rounded-lg text-[#1A1A1A] mb-8">
              <div className="text-2xl font-bold mb-4">🎯 What You Get Today:</div>
              <ul className="text-left space-y-2 mb-6">
                <li>✅ 50 business-ready prompt templates</li>
                <li>✅ Copy-paste ready for any AI tool</li>
                <li>✅ Professional PDF with usage guide</li>
                <li>✅ Bonus meta-prompt creator</li>
                <li>✅ 30-day money-back guarantee</li>
                <li>✅ Instant download via email</li>
              </ul>
              
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">Only $7</div>
                <div className="text-sm text-gray-600 mb-4">(Regular price $19)</div>
                
                <button className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-xl hover:bg-[#E5C84F] transition-colors duration-200 w-full md:w-auto">
                  Get Instant Access Now
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-400">
              Secure payment • Instant delivery • 30-day guarantee
            </p>
          </div>
        </div>
      </section>
    </Layout>
  )
} 