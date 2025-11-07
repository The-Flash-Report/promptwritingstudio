import Layout from '../components/layout/Layout'
import BusinessNameGenerator from '../components/tools/BusinessNameGenerator'

export default function BusinessNameGeneratorPage() {
  return (
    <Layout 
      title="AI Business Name Generator - Create Unique Brand Names | PromptWritingStudio"
      description="Generate creative, brandable business names using AI technology. Check domain availability instantly and find the perfect name for your startup or business."
    >
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI Business Name Generator
            </h1>
            <p className="text-xl mb-8">
              Generate unique, brandable business names using AI and check domain availability instantly
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🧠</span>
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">⚡</span>
                <span>Lightning Fast</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">🌐</span>
                <span>Domain Check</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-2">💾</span>
                <span>Save Favorites</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tool Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <BusinessNameGenerator />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
                Why Use Our AI Name Generator?
              </h2>
              <p className="text-lg text-gray-600">
                Get professional-quality business names that actually work for your brand
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#FFDE59] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Smart AI Technology</h3>
                <p className="text-gray-600">
                  Our Claude AI understands your business context and generates names that actually make sense for your industry.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFDE59] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Domain Availability</h3>
                <p className="text-gray-600">
                  Instantly see which domains are available so you can secure your online presence right away.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFDE59] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Lightning Fast Results</h3>
                <p className="text-gray-600">
                  Get 12 unique business name suggestions in seconds, not hours. Perfect for brainstorming sessions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFDE59] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Customizable Styles</h3>
                <p className="text-gray-600">
                  Choose from tech, creative, premium, and other naming styles to match your brand personality.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFDE59] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💾</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Save & Export</h3>
                <p className="text-gray-600">
                  Favorite the names you love and export them as a text file to share with your team or investors.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#FFDE59] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🆓</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Completely Free</h3>
                <p className="text-gray-600">
                  Generate unlimited business names at no cost. No signup required, no hidden fees, no limits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Get professional business names in three simple steps
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#1A1A1A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Describe Your Business</h3>
                <p className="text-gray-600">
                  Tell us about your business idea, industry, or enter relevant keywords that represent your brand.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#1A1A1A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Customize Preferences</h3>
                <p className="text-gray-600">
                  Choose your preferred word count, business type, and naming style to get more targeted results.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#1A1A1A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Get Your Names</h3>
                <p className="text-gray-600">
                  Receive 12 unique, AI-generated business names with explanations and domain availability checks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#FFDE59]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
              Need More Than Just a Name?
            </h2>
            <p className="text-lg text-[#1A1A1A] mb-8">
              Once you have your perfect business name, learn how to create compelling content with AI prompts that convert visitors into customers.
            </p>
            <a 
              href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio"
              className="bg-[#1A1A1A] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors duration-200 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Prompt Writing Studio
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
} 