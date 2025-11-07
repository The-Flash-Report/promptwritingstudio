import Head from 'next/head'
import Layout from '../components/layout/Layout'
import YouTubeVideoSection from '../components/ui/YouTubeVideoSection'
import Link from 'next/link'

export default function VideoTutorialsPage() {
  // Featured videos from your channel
  const featuredVideos = [
    {
      id: 'uKmZkUu1tOM',
      title: 'PromptWritingStudio Introduction',
      description: 'Learn how AI prompt writing can transform your content creation and business automation',
      thumbnail: 'https://img.youtube.com/vi/uKmZkUu1tOM/maxresdefault.jpg',
      duration: '3:45'
    }
  ]

  // AI Writing Tutorials Playlist
  const writingPlaylist = {
    id: 'PLxQrU2dxeHH5O0Wb2AFOD3oATFEtQGoL8',
    title: 'Writing With AI - Complete Tutorial Series',
    description: 'Master the art of writing effective AI prompts for ChatGPT, Claude, and Gemini. Learn business automation strategies and content creation techniques.',
    videoCount: 12,
    category: 'AI Writing Education'
  }

  // Coding Tutorials Playlist
  const codingPlaylist = {
    id: 'PLxQrU2dxeHH59wUfRImkLPs3yLJW3IYkE',
    title: 'Vibe Coding for Creators - Technical Tutorials',
    description: 'Learn coding and technical skills for content creators. Master tools and automation techniques to enhance your AI workflow.',
    videoCount: 8,
    category: 'Coding Education'
  }

  // AI Business Applications Playlist
  const businessPlaylist = {
    id: 'PLxQrU2dxeHH5O0Wb2AFOD3oATFEtQGoL8', // You can update this with actual playlist ID
    title: 'AI for Business - Automation & Growth',
    description: 'Discover how AI can automate your business processes, improve customer service, and drive growth through smart prompt engineering.',
    videoCount: 6,
    category: 'Business AI'
  }

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AI Prompt Writing Video Tutorials",
    "description": "Free video tutorials on AI prompt writing for ChatGPT, Claude, and Gemini. Learn step-by-step techniques from expert Bryan Collins.",
    "url": "https://promptwritingstudio.com/video-tutorials",
    "mainEntity": [
      {
        "@type": "VideoPlaylist",
        "name": writingPlaylist.title,
        "description": writingPlaylist.description,
        "url": `https://www.youtube.com/playlist?list=${writingPlaylist.id}`,
        "publisher": {
          "@type": "Organization",
          "name": "PromptWritingStudio"
        }
      },
      {
        "@type": "VideoPlaylist", 
        "name": codingPlaylist.title,
        "description": codingPlaylist.description,
        "url": `https://www.youtube.com/playlist?list=${codingPlaylist.id}`,
        "publisher": {
          "@type": "Organization",
          "name": "PromptWritingStudio"
        }
      },
      {
        "@type": "VideoPlaylist",
        "name": businessPlaylist.title,
        "description": businessPlaylist.description,
        "url": `https://www.youtube.com/playlist?list=${businessPlaylist.id}`,
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
                href="#featured-videos"
                className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Watch Featured Videos
              </a>
              <a
                href="#writing-tutorials"
                className="bg-yellow-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-800 transition-colors"
              >
                Writing Tutorials
              </a>
            </div>
          </div>
        </section>

        {/* Featured Videos Section */}
        <section id="featured-videos" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🚀 Featured AI Videos
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start with these essential videos to understand AI prompt writing fundamentals
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVideos.map((video, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {video.description}
                    </p>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold"
                    >
                      Watch on YouTube
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribe to Channel CTA */}
            <div className="text-center mt-12">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  📺 Subscribe to Our YouTube Channel
                </h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Get notified when we release new AI tutorials, tips, and strategies. 
                  Join our community of AI enthusiasts and content creators.
                </p>
                <a
                  href="https://www.youtube.com/channel/UCglNILz3uBqPer5EMJ_pzVg?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Subscribe to Channel
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Writing With AI Playlist */}
        <section id="writing-tutorials" className="py-16 bg-gray-50">
          <YouTubeVideoSection
            title={writingPlaylist.title}
            description={writingPlaylist.description}
            playlistId={writingPlaylist.id}
            playlistTitle="Writing With AI"
            videoCount={writingPlaylist.videoCount}
            category={writingPlaylist.category}
          />
        </section>

        {/* Coding Tutorials Playlist */}
        <section id="coding-tutorials" className="py-16 bg-white">
          <YouTubeVideoSection
            title={codingPlaylist.title}
            description={codingPlaylist.description}
            playlistId={codingPlaylist.id}
            playlistTitle="Vibe Coding for Creators"
            videoCount={codingPlaylist.videoCount}
            category={codingPlaylist.category}
          />
        </section>

        {/* AI Business Applications Playlist */}
        <section id="business-ai" className="py-16 bg-gray-50">
          <YouTubeVideoSection
            title={businessPlaylist.title}
            description={businessPlaylist.description}
            playlistId={businessPlaylist.id}
            playlistTitle="AI for Business"
            videoCount={businessPlaylist.videoCount}
            category={businessPlaylist.category}
          />
        </section>

        {/* Video Categories Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                🎯 Video Categories
              </h2>
              <p className="text-xl text-gray-600">
                Explore different aspects of AI prompt writing and implementation
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200">
                <div className="text-4xl mb-4">✍️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Prompt Engineering
                </h3>
                <p className="text-gray-700 mb-4">
                  Learn advanced techniques for crafting effective AI prompts that get better results
                </p>
                <a href="#writing-tutorials" className="text-blue-600 font-semibold hover:text-blue-700">
                  Watch Tutorials →
                </a>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg border border-green-200">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Technical Implementation
                </h3>
                <p className="text-gray-700 mb-4">
                  Master the technical side of AI integration and automation
                </p>
                <a href="#coding-tutorials" className="text-green-600 font-semibold hover:text-green-700">
                  Watch Tutorials →
                </a>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border border-purple-200">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Business Applications
                </h3>
                <p className="text-gray-700 mb-4">
                  Discover how AI can transform your business processes and growth
                </p>
                <a href="#business-ai" className="text-purple-600 font-semibold hover:text-purple-700">
                  Watch Tutorials →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                📚 More Learning Resources
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
                  href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio"
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
                href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio"
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