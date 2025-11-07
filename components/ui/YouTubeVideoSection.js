import Head from 'next/head'

export default function YouTubeVideoSection({ 
  title = "Learn AI Prompt Writing",
  description = "Master the art of writing effective AI prompts with our comprehensive video tutorials",
  playlistId,
  playlistTitle,
  videoCount = 0,
  category = "AI Education"
}) {
  
  // Video schema for the playlist
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoPlaylist",
    "name": playlistTitle,
    "description": `${description} - Complete tutorial series with ${videoCount} videos`,
    "url": `https://www.youtube.com/playlist?list=${playlistId}`,
    "thumbnailUrl": `https://img.youtube.com/vi/${playlistId}/maxresdefault.jpg`,
    "uploadDate": "2024-01-01",
    "duration": "PT60M",
    "embedUrl": `https://www.youtube.com/embed/videoseries?list=${playlistId}`,
    "publisher": {
      "@type": "Organization",
      "name": "PromptWritingStudio",
      "url": "https://promptwritingstudio.com"
    },
    "creator": {
      "@type": "Person",
      "name": "Bryan Collins",
      "url": "https://www.youtube.com/@BryanCollinsWriter"
    },
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/WatchAction",
      "userInteractionCount": 1000
    },
    "genre": category,
    "keywords": "AI prompts, ChatGPT, Claude, Gemini, prompt engineering, AI writing, content creation"
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoSchema)
          }}
        />
      </Head>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* YouTube Playlist Embed */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&rel=0&modestbranding=1`}
                  title={playlistTitle}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              {/* Playlist Info */}
              <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {playlistTitle}
                </h3>
                <p className="text-gray-600 mb-3">
                  Complete tutorial series with {videoCount} videos covering everything you need to know about AI prompt writing.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    📺 {videoCount} videos • ⏱️ 60+ minutes
                  </span>
                  <a
                    href={`https://www.youtube.com/playlist?list=${playlistId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                  >
                    Watch on YouTube
                    <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Video Benefits */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  What You'll Learn
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Step-by-step prompt writing techniques
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    ChatGPT, Claude, and Gemini best practices
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Business automation strategies
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Real-world examples and case studies
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-500 mr-2">✓</span>
                    Advanced prompt engineering techniques
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Perfect For
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Content Creators
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Business Owners
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Marketers
                  </div>
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Writers
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-lg text-white">
                <h4 className="text-lg font-semibold mb-2">
                  🎯 Ready to Master AI Prompts?
                </h4>
                <p className="text-yellow-100 mb-4">
                  Join thousands of creators who've transformed their content with AI
                </p>
                <a
                  href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio"
                  className="inline-block bg-white text-yellow-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Get the Complete Course
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 