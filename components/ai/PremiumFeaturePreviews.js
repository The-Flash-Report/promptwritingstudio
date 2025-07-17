import React, { useState } from 'react';

const PremiumFeaturePreviews = ({ currentTier = 'free', onUpgrade, className = '' }) => {
  const [showPreview, setShowPreview] = useState(null);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Premium features definition
  const premiumFeatures = {
    unlimitedOptimizations: {
      id: 'unlimited-optimizations',
      name: 'Unlimited Optimizations',
      description: 'Optimize as many prompts as you want without daily limits',
      icon: '⚡',
      tier: 'premium',
      benefit: 'No more waiting - optimize freely!',
      preview: 'See how your productivity increases with unlimited access'
    },
    researchInsights: {
      id: 'research-insights', 
      name: 'AI Research Insights',
      description: 'Get industry-specific best practices powered by Perplexity AI',
      icon: '🔍',
      tier: 'premium',
      benefit: 'Stay ahead with latest prompt techniques',
      preview: 'Preview: "Latest trends in AI prompting for e-commerce..."'
    },
    batchOptimization: {
      id: 'batch-optimization',
      name: 'Batch Optimization',
      description: 'Upload and optimize multiple prompts at once',
      icon: '📦',
      tier: 'pro',
      benefit: 'Save hours optimizing prompt libraries',
      preview: 'Upload CSV/TXT files with 50+ prompts'
    },
    customModels: {
      id: 'custom-models',
      name: 'Custom AI Models',
      description: 'Fine-tune optimization for your specific use case',
      icon: '🎯',
      tier: 'pro',
      benefit: 'Personalized optimization algorithms',
      preview: 'Train on your best-performing prompts'
    },
    advancedAnalytics: {
      id: 'advanced-analytics',
      name: 'Advanced Analytics',
      description: 'Detailed ROI tracking, team insights, and performance metrics',
      icon: '📊',
      tier: 'premium',
      benefit: 'Measure real business impact',
      preview: 'See conversion rates, time saved, revenue generated'
    },
    prioritySupport: {
      id: 'priority-support',
      name: 'Priority Support',
      description: '24/7 expert help with prompt optimization strategies',
      icon: '🆘',
      tier: 'pro',
      benefit: 'Get personal guidance from AI experts',
      preview: 'Live chat with prompt engineering specialists'
    }
  };

  // Get features available for user's tier
  const getAvailableFeatures = (tier) => {
    const tierLevels = { free: 0, premium: 1, pro: 2 };
    const userLevel = tierLevels[tier] || 0;
    
    return Object.values(premiumFeatures).filter(feature => {
      const featureLevel = tierLevels[feature.tier] || 0;
      return featureLevel <= userLevel;
    });
  };

  // Get locked features for user's tier
  const getLockedFeatures = (tier) => {
    const tierLevels = { free: 0, premium: 1, pro: 2 };
    const userLevel = tierLevels[tier] || 0;
    
    return Object.values(premiumFeatures).filter(feature => {
      const featureLevel = tierLevels[feature.tier] || 0;
      return featureLevel > userLevel;
    });
  };

  const availableFeatures = getAvailableFeatures(currentTier);
  const lockedFeatures = getLockedFeatures(currentTier);

  // Show feature preview
  const showFeaturePreview = (feature) => {
    setShowPreview(feature);
    
    // Track preview engagement for conversion optimization
    if (typeof gtag !== 'undefined') {
      gtag('event', 'premium_feature_preview', {
        feature_id: feature.id,
        current_tier: currentTier
      });
    }
  };

  return (
    <div className={`premium-feature-previews ${className}`}>
      {/* Locked Features Showcase */}
      {lockedFeatures.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Unlock Premium Features
            </h3>
            <button
              onClick={() => setShowComparisonModal(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Compare Plans →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedFeatures.slice(0, 4).map(feature => (
              <div
                key={feature.id}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all group"
                onClick={() => showFeaturePreview(feature)}
              >
                {/* Lock overlay */}
                <div className="absolute top-2 right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  🔒
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="text-2xl opacity-60">{feature.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {feature.description}
                    </p>
                    <div className="mt-2 text-xs text-orange-600 font-medium">
                      {feature.tier === 'premium' ? 'Premium Feature' : 'Pro Feature'}
                    </div>
                    <div className="mt-1 text-xs text-green-600">
                      ✨ {feature.benefit}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 italic">
                  Click to preview →
                </div>
              </div>
            ))}
          </div>
          
          {/* Upgrade CTA */}
          <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">
                  Ready to unlock these features?
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                  Join 1,200+ professionals optimizing prompts with premium tools
                </p>
              </div>
              <button
                onClick={onUpgrade}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Available Features */}
      {availableFeatures.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Your {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)} Features
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableFeatures.map(feature => (
              <div
                key={feature.id}
                className="flex items-center space-x-1 bg-green-50 border border-green-200 rounded-full px-3 py-1"
              >
                <span className="text-sm">{feature.icon}</span>
                <span className="text-xs font-medium text-green-800">{feature.name}</span>
                <span className="text-xs text-green-600">✓</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Preview Modal */}
      {showPreview && (
        <FeaturePreviewModal
          feature={showPreview}
          currentTier={currentTier}
          onClose={() => setShowPreview(null)}
          onUpgrade={onUpgrade}
        />
      )}

      {/* Plan Comparison Modal */}
      {showComparisonModal && (
        <PlanComparisonModal
          currentTier={currentTier}
          onClose={() => setShowComparisonModal(false)}
          onUpgrade={onUpgrade}
        />
      )}
    </div>
  );
};

// Feature Preview Modal
const FeaturePreviewModal = ({ feature, currentTier, onClose, onUpgrade }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-2xl w-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold">{feature.name}</h3>
              <div className="text-sm text-orange-600 font-medium">
                {feature.tier === 'premium' ? 'Premium Feature' : 'Pro Feature'}
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">{feature.description}</p>
          
          {/* Feature Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-2">Preview:</h4>
            <div className="text-sm text-gray-600 italic">
              {feature.preview}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✨</span>
              <span className="text-sm font-medium text-green-800">{feature.benefit}</span>
            </div>
          </div>
        </div>

        {/* ROI Calculation */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Estimated Value</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-blue-700 font-medium">Time Saved</div>
              <div className="text-blue-600">2-5 hours/week</div>
            </div>
            <div>
              <div className="text-blue-700 font-medium">Productivity Boost</div>
              <div className="text-blue-600">40-60% improvement</div>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={() => {
              onUpgrade();
              onClose();
            }}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Upgrade to {feature.tier === 'premium' ? 'Premium' : 'Pro'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Plan Comparison Modal  
const PlanComparisonModal = ({ currentTier, onClose, onUpgrade }) => {
  const plans = {
    free: {
      name: 'Free',
      price: '$0',
      period: '/month',
      features: [
        '3 optimizations/day',
        'Basic scoring',
        'Standard suggestions',
        'Community support'
      ],
      limitations: ['Daily limits', 'Basic features only']
    },
    premium: {
      name: 'Premium',
      price: '$25',
      period: '/month',
      popular: true,
      features: [
        '25 optimizations/day',
        'AI research insights',
        'Advanced analytics',
        'Progress tracking',
        'Priority support',
        'All free features'
      ],
      benefits: ['Perfect for professionals', 'ROI tracking']
    },
    pro: {
      name: 'Pro',
      price: '$47',
      period: '/month',
      features: [
        'Unlimited optimizations',
        'Batch processing',
        'Custom AI models',
        'Team collaboration',
        'API access',
        'White-label options',
        'All premium features'
      ],
      benefits: ['Best for teams & agencies', 'Advanced customization']
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[80vh] overflow-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Choose Your Plan</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(plans).map(([tierKey, plan]) => (
              <div
                key={tierKey}
                className={`border-2 rounded-lg p-6 relative ${
                  plan.popular 
                    ? 'border-blue-500 bg-blue-50' 
                    : currentTier === tierKey
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                {currentTier === tierKey && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                    Current Plan
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.benefits && (
                  <div className="mb-4">
                    {plan.benefits.map((benefit, index) => (
                      <div key={index} className="text-xs text-blue-600 font-medium">
                        ✨ {benefit}
                      </div>
                    ))}
                  </div>
                )}

                {plan.limitations && (
                  <div className="mb-4">
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="text-xs text-gray-500">
                        ⚠️ {limitation}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    if (tierKey !== currentTier) {
                      onUpgrade(tierKey);
                    }
                    onClose();
                  }}
                  disabled={tierKey === currentTier}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    tierKey === currentTier
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tierKey === currentTier ? 'Current Plan' : `Upgrade to ${plan.name}`}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>✅ 30-day money-back guarantee • ✅ Cancel anytime • ✅ Instant activation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeaturePreviews; 