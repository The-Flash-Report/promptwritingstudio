import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { getProductById } from '../data/shop-products'

export default function SalesVault() {
  const product = getProductById('sales-vault')
  
  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <Layout>
      <Head>
        <title>{product.title} - {product.subtitle} | PromptWritingStudio</title>
        <meta name="description" content={product.description} />
        <meta name="keywords" content="sales prompts, AI sales, sales automation, sales scripts" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {product.badge && (
              <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full font-bold mb-6">
                {product.icon} {product.badge}
              </div>
            )}
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1A1A1A] leading-tight">
              {product.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-[#333333] mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8 border border-gray-200 inline-block">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#1A1A1A]">${product.originalPrice}</div>
                  <div className="text-sm text-[#666] line-through">Regular Price</div>
                </div>
                <div className="text-4xl text-green-500">→</div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#1A1A1A]">${product.price}</div>
                  <div className="text-sm text-[#666]">Special Price</div>
                </div>
              </div>
              
              <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition-colors duration-200 w-full md:w-auto">
                Get Instant Access - ${product.price}
              </button>
              
              <p className="text-sm text-[#666] mt-4">
                📧 {product.deliveryTime} • 💯 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A1A1A]">
              What's Inside {product.title}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-green-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">✅ Complete Sales Arsenal</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">•</span>
                      <span className="text-[#333333]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">🎯 Perfect For:</h3>
                <ul className="space-y-3 text-[#333333]">
                  <li>• Sales professionals & teams</li>
                  <li>• Business owners & entrepreneurs</li>
                  <li>• Freelancers & consultants</li>
                  <li>• Anyone who needs to sell</li>
                  <li>• Sales managers & trainers</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-50 p-6 rounded-lg inline-block border border-yellow-200">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">🔥 Bonus Materials Included</h3>
                <p className="text-[#333333]">Sales psychology frameworks and objection-handling cheat sheets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#1A1A1A]">
              Join {product.testimonialCount} Who've Boosted Their Sales
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-[#333333] italic mb-4">
                "These sales prompts transformed my cold outreach. My response rate went from 2% to 15% in just two weeks. 
                The objection handling templates alone saved me months of trial and error."
              </p>
              <div className="font-bold text-[#1A1A1A]">- Sarah M., Sales Consultant</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1A1A]">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Will these prompts work in my industry?</h3>
                <p className="text-[#333333]">Yes! These prompts are designed to be adaptable across all industries. Simply customize the placeholders with your specific product/service details.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Do I need sales experience to use these?</h3>
                <p className="text-[#333333]">Not at all! These prompts are perfect for beginners and include guidance on when and how to use each template.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Can I use these with any AI tool?</h3>
                <p className="text-[#333333]">Absolutely! These prompts work with ChatGPT, Claude, Gemini, and any current or future AI models.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Sales Process?
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              Get instant access to 30 proven sales prompts and start closing more deals today.
            </p>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8 inline-block">
              <div className="text-2xl font-bold mb-2">Only ${product.price}</div>
              <div className="text-sm opacity-75">{product.deliveryTime} • 30-day guarantee</div>
            </div>
            
            <button className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-xl hover:bg-yellow-400 transition-colors duration-200">
              Get {product.title} Now
            </button>
            
            <p className="text-sm mt-4 opacity-75">
              🔒 Secure payment • 💯 Money-back guarantee • 📧 Instant delivery
            </p>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6 text-[#1A1A1A]">You Might Also Like</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/prompt-vault" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                The Prompt Vault - $7
              </Link>
              <Link href="/ecommerce-vault" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors">
                E-commerce Pack - $15
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 