import Layout from '../../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'

export default function PromptVaultSuccess() {
  return (
    <Layout>
      <Head>
        <title>Thank You! Your Prompt Vault is Ready - PromptWritingStudio</title>
        <meta name="description" content="Thank you for purchasing The Prompt Vault! Check your email for download instructions." />
        <meta name="robots" content="noindex" />
      </Head>

      {/* Thank You Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F9F9F9] to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#28a745] text-white px-6 py-3 rounded-full font-bold mb-8">
              ✅ Payment Successful
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1A1A1A] leading-tight">
              Welcome to The Vault!
            </h1>
            
            <p className="text-xl md:text-2xl text-[#333333] mb-8 leading-relaxed">
              Your 50 business-ready AI templates are on their way
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-lg mb-12 border border-[#E5E5E5]">
              <h2 className="text-2xl font-bold mb-4 text-[#1A1A1A]">📧 Check Your Email</h2>
              <p className="text-[#333333] mb-6">
                We've sent your Prompt Vault PDF to your email address. If you don't see it in your inbox within 5 minutes, 
                please check your spam/promotions folder.
              </p>
              
              <div className="bg-[#F9F9F9] p-6 rounded-lg mb-6">
                <h3 className="font-bold mb-2">What's in your email:</h3>
                <ul className="text-left space-y-2 text-[#333333]">
                  <li>✅ Direct download link to your PDF</li>
                  <li>✅ Quick start guide</li>
                  <li>✅ Pro tips for maximum results</li>
                  <li>✅ Customer support contact</li>
                </ul>
              </div>
              
              <p className="text-sm text-[#666]">
                <strong>Didn't receive your email?</strong> Contact us at support@promptwritingstudio.com and we'll resend it immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upsell Section */}
      <section className="py-16 md:py-24 bg-[#FFDE59]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
                🚀 Ready to Take It Further?
              </h2>
              <p className="text-xl text-[#333333]">
                You just got 50 amazing prompts. Imagine having unlimited prompts + the skills to create your own...
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A]">
                      PromptWritingStudio Premium
                    </h3>
                    <p className="text-[#333333] mb-6">
                      Master the art of prompt engineering with our complete system. Learn to create prompts that get 
                      better results than 99% of AI users.
                    </p>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <span className="text-[#28a745] mr-2">✓</span>
                        <span>100+ advanced prompt templates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#28a745] mr-2">✓</span>
                        <span>Weekly prompt lessons & tutorials</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#28a745] mr-2">✓</span>
                        <span>Private community access</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#28a745] mr-2">✓</span>
                        <span>Monthly live Q&A sessions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-[#28a745] mr-2">✓</span>
                        <span>Email support & feedback</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-[#F9F9F9] p-6 rounded-lg mb-6">
                      <div className="text-sm text-[#666] mb-2">Special Customer Price</div>
                      <div className="text-4xl font-bold text-[#1A1A1A] mb-2">$19/month</div>
                      <div className="text-sm text-[#666] line-through mb-2">Regular: $25/month</div>
                      <div className="text-sm text-[#28a745] font-bold">Save $6/month</div>
                    </div>
                    
                    <Link 
                      href="https://courses.becomeawritertoday.com/purchase?product_id=6253746&coupon=VAULT6" 
                      className="bg-[#1A1A1A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#333333] transition-colors duration-200 inline-block w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Upgrade Now - $19/mo
                    </Link>
                    
                    <p className="text-xs text-[#666] mt-3">
                      30-day money-back guarantee • Cancel anytime
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1A1A]">
              Why Upgrade from Templates to Mastery?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">
                  📄 With Templates (What You Have):
                </h3>
                <ul className="space-y-3 text-[#333333]">
                  <li>• 50 proven prompts to copy-paste</li>
                  <li>• Works great for common tasks</li>
                  <li>• Saves time on routine work</li>
                  <li>• Fixed templates for specific needs</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">
                  🎓 With Mastery (Premium):
                </h3>
                <ul className="space-y-3 text-[#333333]">
                  <li>• Create unlimited custom prompts</li>
                  <li>• Adapt to any business challenge</li>
                  <li>• Stay ahead of AI developments</li>
                  <li>• Build your competitive advantage</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-[#F9F9F9] p-8 rounded-lg">
                <p className="text-lg text-[#333333] italic mb-4">
                  "The templates got me started, but the premium course taught me to think like an AI expert. 
                  Now I create prompts that consistently outperform anything I find online."
                </p>
                <div className="font-bold text-[#1A1A1A]">- Mike T., Digital Marketing Agency Owner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-16 md:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#1A1A1A]">
              Your Next Steps
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <div className="text-3xl mb-4">📧</div>
                <h3 className="font-bold mb-2">1. Check Your Email</h3>
                <p className="text-[#333333]">Download your Prompt Vault PDF and start using the templates immediately.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="font-bold mb-2">2. Pick 3 Prompts</h3>
                <p className="text-[#333333]">Choose 3 prompts that solve your biggest daily challenges and test them today.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="font-bold mb-2">3. Consider Upgrading</h3>
                <p className="text-[#333333]">Ready for unlimited prompts and expert training? Join Premium while you save $6/month.</p>
              </div>
            </div>
            
            <div className="mt-12">
              <Link 
                href="/" 
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
              >
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 