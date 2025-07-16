import Link from 'next/link';

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="bg-primary text-secondary font-bold px-4 py-1 rounded-md text-sm uppercase mb-4 inline-block">WHY CHOOSE US</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-secondary">Why Choose PromptWritingStudio?</h2>
          <p className="text-dark-gray text-lg max-w-3xl mx-auto">
            Unlike generic prompt guides that leave you confused, PromptWritingStudio gives you a complete system that works for any AI tool.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="feature-card text-center bg-off-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="icon-container bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-brain text-secondary text-2xl"></i>
            </div>
            <h3 className="font-display text-xl font-bold mb-3 text-secondary">AI-Optimized Templates</h3>
            <p className="text-dark-gray">
              Ready-to-use prompt templates specifically designed for content creators, marketers, and business owners.
            </p>
          </div>

          <div className="feature-card text-center bg-off-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="icon-container bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-bolt text-secondary text-2xl"></i>
            </div>
            <h3 className="font-display text-xl font-bold mb-3 text-secondary">Instant Results</h3>
            <p className="text-dark-gray">
              Start getting better AI outputs immediately with our proven prompt frameworks that work across ChatGPT, Claude, and other AI tools.
            </p>
          </div>

          <div className="feature-card text-center bg-off-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="icon-container bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-user-edit text-secondary text-2xl"></i>
            </div>
            <h3 className="font-display text-xl font-bold mb-3 text-secondary">Personalization System</h3>
            <p className="text-dark-gray">
              Learn how to customize prompts to match your brand voice and style, ensuring AI outputs that sound authentically like you.
            </p>
          </div>

          <div className="feature-card text-center bg-off-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="icon-container bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-clock text-secondary text-2xl"></i>
            </div>
            <h3 className="font-display text-xl font-bold mb-3 text-secondary">Time-Saving Workflow</h3>
            <p className="text-dark-gray">
              Complete content creation workflows that integrate AI prompts into your existing process, saving hours of work each week.
            </p>
          </div>

          <div className="feature-card text-center bg-off-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="icon-container bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-graduation-cap text-secondary text-2xl"></i>
            </div>
            <h3 className="font-display text-xl font-bold mb-3 text-secondary">Expert Guidance</h3>
            <p className="text-dark-gray">
              Learn from someone who's spent hundreds of hours testing and refining AI prompt techniques for maximum effectiveness.
            </p>
          </div>

          <div className="feature-card text-center bg-off-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="icon-container bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-sync text-secondary text-2xl"></i>
            </div>
            <h3 className="font-display text-xl font-bold mb-3 text-secondary">Latest AI Models & Updates</h3>
            <p className="text-dark-gray mb-3">
              Stay current with our comprehensive guide to the latest AI models including Llama 4, Grok 4, and Claude 4. Plus updated prompt techniques as AI tools evolve.
            </p>
            <Link href="/ai-models-2025" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
              View AI Models Guide →
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
            className="bg-primary text-secondary font-bold px-8 py-3 rounded-md text-lg hover:bg-primary-dark transition inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Now
          </a>
        </div>
      </div>
    </section>
  )
}
