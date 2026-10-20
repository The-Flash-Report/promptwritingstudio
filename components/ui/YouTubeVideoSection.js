import Head from 'next/head'

export default function YouTubeVideoSection({ 
  title = "Learn AI Prompt Writing",
  description = "Master the art of writing effective AI prompts with our comprehensive video tutorials",
  playlistId,
  playlistTitle,
  videoCount = 0,
  category = "AI Education",
  itemBlurb,
  keywords = "AI prompts, ChatGPT, Claude, Gemini, prompt engineering, AI writing, content creation"
}) {

  // Video schema for the playlist.
  // Counts and ids are the live, public-visible values from the YouTube Data API
  // for channel UCglNILz3uBqPer5EMJ_pzVg. Do not invent thumbnails, durations or
  // view counts here: a playlist id is not a video id, so img.youtube.com/vi/<playlistId>
  // does not resolve, and fabricated interaction counts are a structured-data violation.
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoPlaylist",
    "name": playlistTitle,
    "description": `${description} Currently ${videoCount} public videos.`,
    "url": `https://www.youtube.com/playlist?list=${playlistId}`,
    "numberOfItems": videoCount,
    "embedUrl": `https://www.youtube.com/embed/videoseries?list=${playlistId}`,
    "publisher": {
      "@type": "Organization",
      "name": "PromptWritingStudio",
      "url": "https://promptwritingstudio.com"
    },
    "creator": {
      "@type": "Person",
      "name": "Bryan Collins",
      "url": "https://www.youtube.com/channel/UCglNILz3uBqPer5EMJ_pzVg"
    },
    "genre": category,
    "keywords": keywords
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
                  {itemBlurb || `A running series of ${videoCount} videos, updated as new ones publish.`}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {videoCount} {videoCount === 1 ? 'video' : 'videos'}
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
                  href="/claude-code-guide"
                  className="inline-block bg-white text-yellow-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Start with Claude Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 