import React, { useState } from 'react';

const SocialShare = ({ 
  originalPrompt, 
  optimizedPrompt, 
  analysis, 
  userId = 'anonymous',
  className = '' 
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareTemplate, setShareTemplate] = useState('improvement');
  const [customMessage, setCustomMessage] = useState('');

  // Calculate improvement metrics
  const improvement = analysis ? 
    (analysis.score || 8) - ((analysis.breakdown?.clarity + analysis.breakdown?.specificity + analysis.breakdown?.completeness) / 3 || 5) 
    : 2.5;

  // Share templates
  const shareTemplates = {
    improvement: {
      title: 'Share Your Improvement',
      icon: '📈',
      template: `🎯 Just improved my AI prompt by +${improvement.toFixed(1)} points using @PromptStudio!\n\nBefore: Basic prompt\nAfter: Optimized for clarity, specificity & results\n\n#AIPrompts #ProductivityHack #PromptEngineering`,
      visual: 'improvement-card'
    },
    achievement: {
      title: 'Share Achievement',
      icon: '🏆',
      template: `💪 Leveling up my AI game with PromptWritingStudio!\n\n✅ Optimized another prompt\n✅ Getting better results from AI\n✅ Saving time every day\n\nWho else is optimizing their AI prompts? 🚀\n\n#AIProductivity #PromptEngineering`,
      visual: 'achievement-badge'
    },
    tutorial: {
      title: 'Share Knowledge',
      icon: '🧠',
      template: `💡 Pro tip: Your AI prompts can always be better!\n\nJust learned how to:\n• Add more context\n• Be more specific\n• Structure for better results\n\nTrying @PromptStudio for real-time optimization 🎯\n\n#AITips #PromptWriting`,
      visual: 'tip-card'
    },
    stats: {
      title: 'Share Your Stats',
      icon: '📊',
      template: `📊 My AI optimization stats this month:\n\n⚡ 15 prompts optimized\n⏱️ 45 minutes saved\n📈 Average +2.8 point improvement\n💰 $225 value generated\n\nOptimizing with @PromptStudio 🚀\n\n#AIProductivity #ROI`,
      visual: 'stats-card'
    }
  };

  // Generate shareable image (placeholder for now)
  const generateShareImage = async (template) => {
    // In production, you'd generate an actual image using Canvas API or service
    return `https://promptwritingstudio.com/api/share-image?template=${template}&improvement=${improvement}&userId=${userId}`;
  };

  // Share to different platforms
  const shareToPlatform = async (platform) => {
    const template = shareTemplates[shareTemplate];
    const message = customMessage || template.template;
    const url = 'https://promptwritingstudio.com/ai-prompt-generator';
    
    // Track sharing event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'social_share', {
        platform: platform,
        template: shareTemplate,
        improvement: improvement,
        user_id: userId
      });
    }

    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(message)}`;
        break;
      case 'facebook':
        shareUrl = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'copy':
        await navigator.clipboard.writeText(`${message}\n\n${url}`);
        alert('Copied to clipboard!');
        return;
      default:
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className={`social-share ${className}`}>
      {/* Quick Share Button */}
      <button
        onClick={() => setShowShareModal(true)}
        className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <span>📱</span>
        <span>Share Success</span>
      </button>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Share Your Success! 🎉</h3>
                <button onClick={() => setShowShareModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">
                  ×
                </button>
              </div>

              {/* Template Selection */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Choose a template:</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(shareTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => setShareTemplate(key)}
                      className={`p-3 border-2 rounded-lg text-left transition-all ${
                        shareTemplate === key
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{template.icon}</span>
                        <span className="font-medium text-sm">{template.title}</span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {template.template.substring(0, 80)}...
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Preview:</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <SharePreview 
                    template={shareTemplates[shareTemplate]}
                    improvement={improvement}
                    analysis={analysis}
                  />
                </div>
              </div>

              {/* Custom Message */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Customize your message:</h4>
                <textarea
                  rows={4}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder={shareTemplates[shareTemplate].template}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave empty to use the default template
                </p>
              </div>

              {/* Share Buttons */}
              <div className="space-y-4">
                <h4 className="font-medium">Share on:</h4>
                <div className="grid grid-cols-2 gap-3">
                  <ShareButton
                    platform="twitter"
                    icon="🐦"
                    name="Twitter"
                    color="bg-blue-500 hover:bg-blue-600"
                                         onClick={() => shareToPlatform('twitter')}
                  />
                  <ShareButton
                    platform="linkedin"
                    icon="💼"
                    name="LinkedIn"
                    color="bg-blue-700 hover:bg-blue-800"
                                         onClick={() => shareToPlatform('linkedin')}
                   />
                   <ShareButton
                     platform="facebook"
                     icon="📘"
                     name="Facebook"
                     color="bg-blue-600 hover:bg-blue-700"
                     onClick={() => shareToPlatform('facebook')}
                   />
                   <ShareButton
                     platform="copy"
                     icon="📋"
                     name="Copy Link"
                     color="bg-gray-600 hover:bg-gray-700"
                     onClick={() => shareToPlatform('copy')}
                  />
                </div>
              </div>

              {/* Sharing Benefits */}
              <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">Why share your success?</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Help others discover AI prompt optimization</li>
                  <li>• Build your reputation as an AI productivity expert</li>
                  <li>• Connect with other prompt engineering enthusiasts</li>
                  <li>• Get feedback and tips from the community</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Share Preview Component
const SharePreview = ({ template, improvement, analysis }) => {
  return (
    <div className="space-y-3">
      {/* Mock Social Media Post */}
      <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
        <div className="flex items-start space-x-3 mb-3">
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
          <div className="flex-1">
            <div className="font-medium">Your Name</div>
            <div className="text-sm text-gray-500">@yourhandle · now</div>
          </div>
        </div>
        
        <div className="text-gray-900 whitespace-pre-line mb-3">
          {template.template}
        </div>
        
        {/* Mock visual card */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <MockVisualCard template={template} improvement={improvement} analysis={analysis} />
        </div>
        
        <div className="flex items-center space-x-6 text-gray-500 text-sm mt-3">
          <span>💬 Reply</span>
          <span>🔄 Retweet</span>
          <span>❤️ Like</span>
          <span>📤 Share</span>
        </div>
      </div>
    </div>
  );
};

// Mock Visual Card for different templates
const MockVisualCard = ({ template, improvement, analysis }) => {
  const cardContent = {
    'improvement-card': (
      <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">+{improvement.toFixed(1)} Points</div>
          <div className="text-lg mb-4">Prompt Improvement</div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium">Clarity</div>
              <div>{analysis?.breakdown?.clarity || 8}/10</div>
            </div>
            <div>
              <div className="font-medium">Specificity</div>
              <div>{analysis?.breakdown?.specificity || 7}/10</div>
            </div>
            <div>
              <div className="font-medium">Complete</div>
              <div>{analysis?.breakdown?.completeness || 9}/10</div>
            </div>
          </div>
          <div className="mt-4 text-xs opacity-90">Powered by PromptWritingStudio</div>
        </div>
      </div>
    ),
    'achievement-badge': (
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 text-center">
        <div className="text-4xl mb-2">🏆</div>
        <div className="text-xl font-bold mb-2">Optimization Master</div>
        <div className="text-sm">Completed another prompt optimization</div>
        <div className="mt-4 text-xs opacity-90">PromptWritingStudio.com</div>
      </div>
    ),
    'tip-card': (
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
        <div className="text-2xl mb-3">💡 Pro Tip</div>
        <div className="text-lg mb-2">Better AI prompts = Better results</div>
        <div className="text-sm opacity-90 mb-4">
          Always optimize for clarity, specificity, and context
        </div>
        <div className="text-xs">Learn more at PromptWritingStudio.com</div>
      </div>
    ),
    'stats-card': (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="text-lg font-bold mb-4">📊 My AI Optimization Stats</div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-2xl font-bold">15</div>
            <div>Prompts Optimized</div>
          </div>
          <div>
            <div className="text-2xl font-bold">45m</div>
            <div>Time Saved</div>
          </div>
          <div>
            <div className="text-2xl font-bold">+2.8</div>
            <div>Avg Improvement</div>
          </div>
          <div>
            <div className="text-2xl font-bold">$225</div>
            <div>Value Generated</div>
          </div>
        </div>
        <div className="mt-4 text-xs opacity-90">Track your progress at PromptWritingStudio.com</div>
      </div>
    )
  };

  return cardContent[template.visual] || cardContent['improvement-card'];
};

// Share Button Component
const ShareButton = ({ platform, icon, name, color, onClick }) => (
  <button
    onClick={onClick}
    className={`${color} text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2`}
  >
    <span>{icon}</span>
    <span>{name}</span>
  </button>
);

export default SocialShare; 