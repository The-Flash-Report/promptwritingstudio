import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { 
  products, 
  productCategories, 
  getFeaturedProduct, 
  getAvailableProducts, 
  getPreOrderProducts,
  getComingSoonProducts,
  getProductsByCategory 
} from '../data/shop-products'

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [showPreOrderModal, setShowPreOrderModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  const featuredProduct = getFeaturedProduct()
  const availableProducts = getAvailableProducts().filter(p => !p.featured)
  const preOrderProducts = getPreOrderProducts().filter(p => !p.featured)
  const comingSoonProducts = getComingSoonProducts()
  
  // Include both available and pre-order products in main display
  const allActiveProducts = [...availableProducts, ...preOrderProducts]
  
  const filteredProducts = activeCategory === 'all' 
    ? allActiveProducts 
    : getProductsByCategory(activeCategory).filter(p => !p.featured && (p.status === 'available' || p.status === 'pre-order'))

  const displayProducts = showComingSoon ? comingSoonProducts : filteredProducts
  
  const handlePreOrderClick = (product) => {
    setSelectedProduct(product)
    setShowPreOrderModal(true)
  }
  return (
    <Layout>
      <Head>
        <title>Shop - AI Prompt Templates & Tools | PromptWritingStudio</title>
        <meta name="description" content="Get professional AI prompt templates and tools to supercharge your business. Instant downloads, proven results, affordable prices." />
        <meta name="keywords" content="AI prompts, business templates, ChatGPT prompts, prompt vault, AI tools" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#F9F9F9] to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1A1A1A] leading-tight">
              AI Tools & Templates
            </h1>
            <p className="text-xl md:text-2xl text-[#333333] mb-8 leading-relaxed">
              Professional-grade AI prompt templates and tools to accelerate your business
            </p>
            <div className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-full font-bold mb-8">
              💡 Instantly downloadable • 30-day guarantee
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      {featuredProduct && (
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12 border border-yellow-200">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    {featuredProduct.badge && (
                      <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
                        {featuredProduct.icon} FEATURED: {featuredProduct.badge}
                      </div>
                    )}
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
                      {featuredProduct.title}
                    </h2>
                    
                    <p className="text-xl text-[#333333] mb-4">
                      {featuredProduct.description}
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="font-bold mb-3 text-[#1A1A1A]">What's included:</h3>
                      <ul className="space-y-2 text-[#333333]">
                        {featuredProduct.features.map((feature, index) => (
                          <li key={index}>✅ {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                      <div className="mb-4">
                        <div className="flex items-center justify-center gap-4 mb-2">
                          <span className="text-2xl text-gray-500 line-through">${featuredProduct.originalPrice}</span>
                          <span className="text-4xl font-bold text-orange-600">${featuredProduct.price}</span>
                        </div>
                        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold inline-block">
                          {Math.round((1 - featuredProduct.price / featuredProduct.originalPrice) * 100)}% OFF Launch Special
                        </div>
                      </div>
                      
                      <Link 
                        href={featuredProduct.url} 
                        className="block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-xl hover:bg-[#E5C84F] transition-colors duration-200 mb-4"
                      >
                        Get Instant Access
                      </Link>
                      
                      <p className="text-sm text-[#666]">
                        📧 {featuredProduct.deliveryTime}<br />
                        💯 30-day money-back guarantee<br />
                        🔒 Secure payment processing
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-700 text-center">
                        <div className="font-bold mb-2">⭐⭐⭐⭐⭐</div>
                        <div className="italic mb-2">"These prompts saved me hours of work and improved my results immediately!"</div>
                        <div className="text-xs">- Sarah K., Marketing Director</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Catalog */}
      <section className="py-16 md:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
                {showComingSoon ? 'Coming Soon' : 'Available Now'}
              </h2>
              <p className="text-xl text-[#333333]">
                {showComingSoon 
                  ? 'More AI tools and templates in development' 
                  : 'Professional AI prompt packs ready for instant download'
                }
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={() => {setActiveCategory('all'); setShowComingSoon(false);}}
                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  activeCategory === 'all' && !showComingSoon
                    ? 'bg-[#FFDE59] text-[#1A1A1A]'
                    : 'bg-white text-[#333333] hover:bg-gray-100'
                }`}
              >
                All Available
              </button>
              {Object.entries(productCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => {setActiveCategory(key); setShowComingSoon(false);}}
                  className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                    activeCategory === key && !showComingSoon
                      ? 'bg-[#FFDE59] text-[#1A1A1A]'
                      : 'bg-white text-[#333333] hover:bg-gray-100'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
              <button
                onClick={() => setShowComingSoon(true)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 ${
                  showComingSoon
                    ? 'bg-[#FFDE59] text-[#1A1A1A]'
                    : 'bg-white text-[#333333] hover:bg-gray-100'
                }`}
              >
                🚀 Coming Soon
              </button>
            </div>
            
            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`bg-white p-6 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-lg ${
                    product.status === 'coming-soon' ? 'opacity-75' : ''
                  }`}
                >
                  <div className="text-center">
                    {product.badge && (
                      <div className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold mb-3">
                        {product.badge}
                      </div>
                    )}
                    
                    <div className="text-4xl mb-4">{product.icon}</div>
                    <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">{product.title}</h3>
                    <p className="text-[#333333] mb-4 h-12">{product.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                                              {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                      <span className="text-2xl font-bold text-[#1A1A1A]">${product.price}</span>
                    </div>
                    </div>
                    
                    {product.status === 'available' ? (
                      <Link 
                        href={product.url} 
                        className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
                      >
                        Get Now
                      </Link>
                    ) : product.status === 'pre-order' ? (
                      <button 
                        onClick={() => handlePreOrderClick(product)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200"
                      >
                        Pre-Order Now
                      </button>
                    ) : (
                      <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-bold">
                        {product.launchDate ? `Coming ${new Date(product.launchDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : 'Coming Soon'}
                      </div>
                    )}
                    
                    <div className="mt-3 text-xs text-gray-500">
                      {product.deliveryTime} • {product.format}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {displayProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">No products found</h3>
                <p className="text-[#333333]">Try selecting a different category</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
                What Our Customers Say
              </h2>
              <p className="text-xl text-[#333333]">
                Real feedback from professionals using our AI prompt templates
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#F9F9F9] p-6 rounded-lg">
                <div className="text-yellow-500 text-xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-[#333333] mb-4 italic">
                  "The Prompt Vault completely transformed how I approach content creation. What used to take hours now takes minutes."
                </p>
                <div className="text-sm text-[#666]">
                  <strong>Sarah M.</strong><br />
                  Marketing Director
                </div>
              </div>
              
              <div className="bg-[#F9F9F9] p-6 rounded-lg">
                <div className="text-yellow-500 text-xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-[#333333] mb-4 italic">
                  "These prompts are incredibly well-crafted. I've seen immediate improvements in my AI outputs."
                </p>
                <div className="text-sm text-[#666]">
                  <strong>Mike T.</strong><br />
                  Business Owner
                </div>
              </div>
              
              <div className="bg-[#F9F9F9] p-6 rounded-lg">
                <div className="text-yellow-500 text-xl mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-[#333333] mb-4 italic">
                  "The sales prompts alone have helped me close more deals. Worth every penny!"
                </p>
                <div className="text-sm text-[#666]">
                  <strong>Jennifer L.</strong><br />
                  Sales Professional
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-16 md:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
                Free Resources
              </h2>
              <p className="text-xl text-[#333333]">
                Get started with our free AI tools and templates
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A]">Free AI Prompt Generator</h3>
                <p className="text-[#333333] mb-6">
                  Create custom AI prompts for any use case with our interactive generator tool.
                </p>
                <Link 
                  href="/ai-prompt-generator" 
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200 inline-block"
                >
                  Try Generator
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A]">500+ Free Examples</h3>
                <p className="text-[#333333] mb-6">
                  Browse our collection of free AI prompt examples for various industries and use cases.
                </p>
                <Link 
                  href="/ai-prompt-examples" 
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors duration-200 inline-block"
                >
                  Browse Examples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Membership CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want Everything + Expert Training?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join PromptWritingStudio for unlimited prompts, weekly lessons, community access, and personal support.
            </p>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8 inline-block">
              <div className="text-2xl font-bold mb-2">Starting at $25/month</div>
              <div className="text-sm opacity-75">100+ templates • Weekly lessons • Community access</div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/pricing" 
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
              >
                View Premium Plans
              </Link>
              <Link 
                href="/prompt-vault" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Start with $7 Vault
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#1A1A1A]">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">How do I get my purchase after buying?</h3>
                <p className="text-[#333333]">All digital products are delivered instantly via email. You'll receive a download link within minutes of purchase.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Do these prompts work with all AI tools?</h3>
                <p className="text-[#333333]">Yes! Our prompts are designed to work with ChatGPT, Claude, Gemini, and any current or future AI models.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">What if I'm not satisfied with my purchase?</h3>
                <p className="text-[#333333]">We offer a 30-day money-back guarantee on all products. If you're not completely satisfied, email us for a full refund.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#1A1A1A]">Can I use these prompts for my business?</h3>
                <p className="text-[#333333]">Absolutely! All prompts come with commercial usage rights. Use them in your business, with clients, or modify them as needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Order Modal */}
      {showPreOrderModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-[#1A1A1A]">Pre-Order: {selectedProduct.title}</h3>
                <button 
                  onClick={() => setShowPreOrderModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-blue-800">
                    <strong>Pre-Order Special:</strong> Get this product at the discounted price and be first to receive it when it's ready!
                  </p>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-blue-600">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Expected delivery:</strong> {selectedProduct.deliveryTime}
                  {selectedProduct.launchDate && (
                    <span> (Launch date: {new Date(selectedProduct.launchDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })})</span>
                  )}
                </p>
              </div>

              {/* Netlify Form */}
              <form 
                name="pre-orders" 
                method="POST" 
                data-netlify="true" 
                netlify-honeypot="bot-field"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  
                  fetch('/', {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                  }).then(() => {
                    setShowPreOrderModal(false);
                    alert('Thank you for your pre-order! We\'ll email you with payment details and updates.');
                  }).catch((error) => {
                    alert('There was an error submitting your pre-order. Please try again.');
                  });
                }}
              >
                <input type="hidden" name="form-name" value="pre-orders" />
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="product" value={selectedProduct.title} />
                <input type="hidden" name="price" value={selectedProduct.price} />
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company/Business (Optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="use-case" className="block text-sm font-medium text-gray-700 mb-1">
                      How will you use this product? (Optional)
                    </label>
                    <textarea
                      id="use-case"
                      name="use-case"
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="This helps us customize the content for your needs..."
                    ></textarea>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold mb-2">What happens next:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• We'll email you with secure payment details</li>
                      <li>• You'll get updates on development progress</li>
                      <li>• First access when the product is ready</li>
                      <li>• 30-day money-back guarantee</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPreOrderModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Submit Pre-Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
} 