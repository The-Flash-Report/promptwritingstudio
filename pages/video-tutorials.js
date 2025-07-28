import Head from 'next/head'
import Layout from '../components/layout/Layout'
import YouTubeVideoSection from '../components/ui/YouTubeVideoSection'
import Link from 'next/link'

export default function VideoTutorialsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Prompt Writing Video Tutorials",
    "description": "Free video tutorials on AI prompt writing for ChatGPT, Claude, and Gemini. Learn step-by-step techniques from expert Bryan Collins.",
    "url": "https://promptwritingstudio.com/video-tutorials",
    "mainEntity": [
      {
        "@type": "VideoPlaylist",
        "name": "Writing With AI",
        "description": "Complete tutorial series on writing effective AI prompts for business and content creation",
        "url": "https://www.youtube.com/playlist?list=PLxQrU2dxeHH5O0Wb2AFOD3oATFEtQGoL8",
        "publisher": {
          "@type": "Organization",
          "name": "PromptWritingStudio"
        }
      },
      {
        "@type": "VideoPlaylist", 
        "name": "Vibe Coding for Creators",
        "description": "Coding tutorials and technical guides for content creators using AI tools",
        "url": "https://www.youtube.com/playlist?list=PLxQrU2dxeHH59wUfRImkLPs3yLJW3IYkE",
        "publisher": {
          "@type": "Organization",
          "name": "PromptWritingStudio"
        }
      }
    ],
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
          "name": "Video Tutorials",
          "item": "https://promptwritingstudio.com/video-tutorials"
        }
      ]
    }
  }

  return (
    <>
      <Head>
        <title>AI Prompt Writing Video Tutorials - Free YouTube Playlists | PromptWritingStudio</title>
        <meta name="description" content="Free video tutorials on AI prompt writing for ChatGPT, Claude, and Gemini. Learn step-by-step techniques from expert Bryan Collins. Watch complete playlists on YouTube." />
        <meta name="keywords" content="AI prompt tutorials, ChatGPT video tutorials, Claude tutorials, Gemini tutorials, AI writing videos, prompt engineering videos, free AI tutorials" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Prompt Writing Video Tutorials - Free YouTube Playlists" />
        <meta property="og:description" content="Free video tutorials on AI prompt writing for ChatGPT, Claude, and Gemini. Learn step-by-step techniques from expert Bryan Collins." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://promptwritingstudio.com/video-tutorials" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Prompt Writing Video Tutorials" />
        <meta name="twitter:description" content="Free video tutorials on AI prompt writing for ChatGPT, Claude, and Gemini" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://promptwritingstudio.com/video-tutorials" />
        
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-yellow-400 to-yellow-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              🎥 AI Prompt Writing Video Tutorials
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 mb-8 max-w-4xl mx-auto">
              Master AI prompt writing with our comprehensive video tutorials. 
              Learn step-by-step techniques for ChatGPT, Claude, and Gemini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#writing-with-ai"
                className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Watch Writing Tutorials
              </a>
              <a
                href="#coding-tutorials"
                className="bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-800 transition-colors"
              >
                Watch Coding Tutorials
              </a>
            </div>
          </div>
        </section>

        {/* Writing With AI Playlist */}
        <section id="writing-with-ai" className="py-16">
          <YouTubeVideoSection
            title="Writing With AI - Complete Tutorial Series"
            description="Master the art of writing effective AI prompts for ChatGPT, Claude, and Gemini. Learn business automation strategies and content creation techniques."
            playlistId="PLxQrU2dxeHH5O0Wb2AFOD3oATFEtQGoL8"
            playlistTitle="Writing With AI"
            videoCount={12}
            category="AI Writing Education"
          />
        </section>

        {/* Coding Tutorials Playlist */}
        <section id="coding-tutorials" className="py-16 bg-white">
          <YouTubeVideoSection
            title="Vibe Coding for Creators - Technical Tutorials"
            description="Learn coding and technical skills for content creators. Master tools and automation techniques to enhance your AI workflow."
            playlistId="PLxQrU2dxeHH59wUfRImkLPs3yLJW3IYkE"
            playlistTitle="Vibe Coding for Creators"
            videoCount={8}
            category="Coding Education"
          />
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                More Learning Resources
              </h2>
              <p className="text-xl text-gray-600">
                Complement your video learning with our comprehensive tools and guides
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  AI Prompt Examples
                </h3>
                <p className="text-gray-600 mb-4">
                  Browse 500+ real-world AI prompt examples for every use case
                </p>
                <Link href="/ai-prompt-examples" className="text-yellow-600 font-semibold hover:text-yellow-700">
                  Explore Examples →
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">🧮</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  AI Calculators
                </h3>
                <p className="text-gray-600 mb-4">
                  Calculate ROI, costs, and savings from AI implementation
                </p>
                <Link href="/calculators" className="text-yellow-600 font-semibold hover:text-yellow-700">
                  Try Calculators →
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Complete Course
                </h3>
                <p className="text-gray-600 mb-4">
                  Get the full PromptWritingStudio course with lifetime access
                </p>
                <a 
                  href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                  className="text-yellow-600 font-semibold hover:text-yellow-700"
                >
                  Get the Course →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-yellow-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Content with AI?
            </h2>
            <p className="text-xl text-yellow-100 mb-8">
              Join thousands of creators who've mastered AI prompt writing and automated their content creation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get the Complete Course
              </a>
              <a
                href="/ai-prompt-generator"
                className="bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-800 transition-colors"
              >
                Try Free Prompt Generator
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
} 