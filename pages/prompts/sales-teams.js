import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import salesTeamsData from '../../data/modifiers/sales-teams.json'

export default function SalesTeamsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": salesTeamsData.seoData.title,
    "description": salesTeamsData.seoData.description,
    "url": "https://promptwritingstudio.com/prompts/sales-teams",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://promptwritingstudio.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Prompts",
          "item": "https://promptwritingstudio.com/prompts"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Sales Teams",
          "item": "https://promptwritingstudio.com/prompts/sales-teams"
        }
      ]
    }
  }

  return (
    <>
      <Head>
        <title>{salesTeamsData.seoData.title}</title>
        <meta name="description" content={salesTeamsData.seoData.description} />
        <meta name="keywords" content={salesTeamsData.seoData.keywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={salesTeamsData.seoData.title} />
        <meta property="og:description" content={salesTeamsData.seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://promptwritingstudio.com/prompts/sales-teams" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={salesTeamsData.seoData.title} />
        <meta name="twitter:description" content={salesTeamsData.seoData.description} />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://promptwritingstudio.com/prompts/sales-teams" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-500 to-blue-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              📞 {salesTeamsData.heroSection.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              {salesTeamsData.heroSection.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#prompts"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                View Prompts
              </a>
              <a
                href="/tools/mad-libs-prompt-creator"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors"
              >
                Create Custom Prompts
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Sales Teams Choose AI Prompts
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {salesTeamsData.benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prompts Section */}
        <section id="prompts" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Professional Sales AI Prompts
            </h2>
            
            <div className="grid gap-8">
              {salesTeamsData.promptCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-2xl font-bold mb-6 text-blue-600">
                    {category.icon} {category.name}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.prompts.map((prompt, promptIndex) => (
                      <div key={promptIndex} className="border border-gray-200 rounded-lg p-6">
                        <h4 className="font-semibold mb-2">{prompt.title}</h4>
                        <p className="text-gray-600 text-sm mb-4">{prompt.description}</p>
                        <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-500">
                          <code className="text-sm">{prompt.template}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Sales Use Cases for AI
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {salesTeamsData.useCases.map((useCase, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-2xl mb-3">{useCase.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {salesTeamsData.faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Collections */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Related Professional Collections
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/prompts/marketing-professionals" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition group">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-600">Marketing Professionals</h3>
                <p className="text-gray-600 text-sm">Campaign strategies and optimization prompts</p>
              </Link>
              
              <Link href="/prompts/content-creators" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition group">
                <div className="text-2xl mb-3">📱</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-600">Content Creators</h3>
                <p className="text-gray-600 text-sm">Viral content and audience growth prompts</p>
              </Link>
              
              <Link href="/prompts/small-business-owners" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition group">
                <div className="text-2xl mb-3">🏪</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-600">Small Business Owners</h3>
                <p className="text-gray-600 text-sm">Business automation and growth prompts</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to 10x Your Sales Results with AI?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of sales professionals who've mastered AI prompts and automated their prospecting and closing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get the Complete Course
              </a>
              <a
                href="/tools/mad-libs-prompt-creator"
                className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors"
              >
                Create Custom Prompts
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
} 