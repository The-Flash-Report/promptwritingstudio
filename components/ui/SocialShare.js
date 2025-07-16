import { useState } from 'react'
import { useCalculatorTracking } from './CalculatorAnalytics'

export default function SocialShare({ 
  title, 
  description, 
  url, 
  results = null,
  calculatorName = 'AI Calculator'
}) {
  const [showShare, setShowShare] = useState(false)
  const { trackCalculatorShare } = useCalculatorTracking(calculatorName)

  const shareText = results 
    ? `🎯 Just calculated ${results.savings || 'amazing'} savings with the ${title}! ${description}`
    : `🚀 Check out this ${title} - ${description}`

  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(shareText)

  const shareLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}&via=bryanjcollins`,
      icon: '𝕏',
      color: 'hover:bg-black'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${shareTitle}`,
      icon: '💼',
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareTitle}`,
      icon: '📘',
      color: 'hover:bg-blue-500'
    },
    {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${shareTitle}%20${shareUrl}`,
      icon: '✉️',
      color: 'hover:bg-gray-600'
    }
  ]

  const handleShare = (platform, shareUrl) => {
    trackCalculatorShare(platform.toLowerCase())
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${url}`)
      setShowShare(false)
      // Show toast notification
      alert('Link copied to clipboard!')
      trackCalculatorShare('copy_link')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowShare(!showShare)}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        Share Results
      </button>

      {showShare && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 min-w-[280px]">
          <div className="mb-3">
            <h4 className="font-semibold text-gray-900 mb-2">Share Your Results</h4>
            <p className="text-sm text-gray-600">Let others know about your savings potential!</p>
          </div>
          
          <div className="space-y-2">
            {shareLinks.map((platform) => (
              <button
                key={platform.name}
                onClick={() => handleShare(platform.name, platform.url)}
                className={`w-full flex items-center px-3 py-2 text-left rounded-md transition-colors border border-gray-200 hover:border-gray-300 ${platform.color} hover:text-white`}
              >
                <span className="text-lg mr-3">{platform.icon}</span>
                <span className="font-medium">Share on {platform.name}</span>
              </button>
            ))}
            
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center px-3 py-2 text-left rounded-md transition-colors border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            >
              <span className="text-lg mr-3">🔗</span>
              <span className="font-medium">Copy Link</span>
            </button>
          </div>
          
          <button
            onClick={() => setShowShare(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
} 