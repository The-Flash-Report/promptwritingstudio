import React, { useState, useEffect, useRef } from 'react';
import { usePromptOptimization, useUsageLimits } from '../hooks/usePromptOptimization';
import PromptProgressTracker from './PromptProgressTracker';
import PremiumFeaturePreviews from './PremiumFeaturePreviews';
import BatchOptimizer from './BatchOptimizer';
import AdvancedAnalyticsDashboard from './AdvancedAnalyticsDashboard';
import SocialShare from './SocialShare';

const PromptOptimizer = ({ 
  prompt, 
  onOptimize, 
  tier = 'free', 
  userId = null,
  context = null,
  industry = null,
  useCase = null,
  className = ''
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState([]);
  const [showProgressTracker, setShowProgressTracker] = useState(true);
  const progressTrackerRef = useRef(null);
  const [lastOptimizedPrompt, setLastOptimizedPrompt] = useState('');
  const [showBatchOptimizer, setShowBatchOptimizer] = useState(false);
  const [showAnalyticsDashboard, setShowAnalyticsDashboard] = useState(false);

  const usageLimits = useUsageLimits(tier, userId);
  
  const {
    analysis,
    research,
    loading,
    error,
    refetch,
    applySuggestion,
    applyAllSuggestions,
    isAnalyzing
  } = usePromptOptimization(prompt, {
    enableResearch: usageLimits.features.includes('research-insights'),
    context,
    industry,
    useCase,
    userId
  });

  // Show intro message for first-time users
  const [showIntro, setShowIntro] = useState(false);
  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('optimization_intro_seen');
    if (!hasSeenIntro && prompt.length > 20) {
      setShowIntro(true);
      localStorage.setItem('optimization_intro_seen', 'true');
    }
  }, [prompt]);

  // Handle optimization application with progress tracking
  const handleOptimizationApplied = (originalPrompt, optimizedPrompt, analysis) => {
    if (analysis && progressTrackerRef.current) {
      const beforeScore = (analysis.breakdown.clarity + analysis.breakdown.specificity + analysis.breakdown.completeness) / 3;
      const afterScore = analysis.score || beforeScore + 2; // Estimate improvement
      
      progressTrackerRef.current.recordOptimization(beforeScore, afterScore, analysis.breakdown);
    }
    
    setLastOptimizedPrompt(optimizedPrompt);
    usageLimits.incrementUsage();
    
    if (onOptimize) {
      onOptimize(optimizedPrompt);
    }
  };

  // Handle upgrade process
  const handleUpgrade = (targetTier = 'premium') => {
    // Track upgrade intent
    if (typeof gtag !== 'undefined') {
      gtag('event', 'upgrade_intent', {
        current_tier: tier,
        target_tier: targetTier,
        source: 'prompt_optimizer'
      });
    }
    
    // In production, redirect to payment page
    window.location.href = `/upgrade?plan=${targetTier}&source=optimizer`;
  };

  if (!prompt || prompt.length < 50) {
    return (
      <div className={`prompt-optimizer-placeholder ${className}`}>
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">AI Optimization Ready</h3>
          <p className="text-sm text-gray-500">
            Type at least 50 characters to get real-time AI suggestions
          </p>
        </div>
      </div>
    );
  }

  // Check usage limits
  if (!usageLimits.canUse) {
    return (
      <div className={`prompt-optimizer-upgrade ${className}`}>
        <UpgradePrompt 
          tier={tier}
          usageCount={usageLimits.usageCount}
          limit={usageLimits.limit}
          resetDate={usageLimits.resetDate}
        />
      </div>
    );
  }

  return (
    <div className={`prompt-optimizer ${className}`}>
      {/* Progress Tracker - Phase 2 Feature */}
      {showProgressTracker && (
        <PromptProgressTracker 
          ref={progressTrackerRef}
          userId={userId}
          className="mb-6"
        />
      )}

      {/* Premium Feature Previews - Phase 2 Feature */}
      <PremiumFeaturePreviews 
        currentTier={tier}
        onUpgrade={handleUpgrade}
        className="mb-6"
      />

      {/* Phase 3: Advanced Features */}
      {(tier === 'premium' || tier === 'pro') && (
        <div className="mb-6 space-y-4">
          {/* Feature Toggle Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowAnalyticsDashboard(!showAnalyticsDashboard)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showAnalyticsDashboard
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              📊 Analytics Dashboard
            </button>
            
            {tier === 'pro' && (
              <button
                onClick={() => setShowBatchOptimizer(!showBatchOptimizer)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showBatchOptimizer
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                📦 Batch Optimizer
              </button>
            )}
          </div>

          {/* Advanced Analytics Dashboard */}
          {showAnalyticsDashboard && (
            <AdvancedAnalyticsDashboard
              userId={userId}
              tier={tier}
              onUpgrade={handleUpgrade}
            />
          )}

          {/* Batch Optimizer (Pro Feature) */}
          {showBatchOptimizer && (
            <BatchOptimizer
              tier={tier}
              onUpgrade={handleUpgrade}
            />
          )}
        </div>
      )}

      {/* Intro tooltip for first-time users */}
      {showIntro && (
        <IntroTooltip onDismiss={() => setShowIntro(false)} />
      )}

      {/* Main optimization panel */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                {isAnalyzing ? (
                  <LoadingSpinner className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-white text-sm font-semibold">AI</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Optimization</h3>
                <p className="text-xs text-gray-500">
                  {isAnalyzing ? 'Analyzing your prompt...' : 'Real-time suggestions'}
                </p>
              </div>
            </div>
            
            {/* Usage indicator */}
            <UsageIndicator 
              remaining={usageLimits.remaining}
              tier={tier}
            />
          </div>
        </div>

        {/* Analysis content */}
        <div className="p-4">
          {error && (
            <ErrorMessage error={error} onRetry={refetch} />
          )}

          {analysis && (
            <div className="space-y-4">
              {/* Score visualization */}
              <ScoreVisualization 
                score={analysis.score}
                breakdown={analysis.breakdown}
                animated={!isAnalyzing}
              />

              {/* Suggestions */}
              {analysis.suggestions && analysis.suggestions.length > 0 && (
                <SuggestionsSection
                  suggestions={analysis.suggestions}
                  onApplySuggestion={(suggestion) => {
                    const optimized = applySuggestion(suggestion, prompt);
                    handleOptimizationApplied(prompt, optimized, analysis);
                    setAppliedSuggestions(prev => [...prev, suggestion.type]);
                  }}
                  appliedSuggestions={appliedSuggestions}
                />
              )}

              {/* Research insights (premium feature) */}
              {research && tier !== 'free' && (
                <ResearchInsights research={research} />
              )}

              {/* Action buttons */}
              <ActionButtons
                analysis={analysis}
                prompt={prompt}
                onApplyAll={() => {
                  const optimized = applyAllSuggestions(prompt);
                  handleOptimizationApplied(prompt, optimized, analysis);
                  setAppliedSuggestions(analysis.suggestions.map(s => s.type));
                }}
                onPreview={() => setShowPreview(true)}
                disabled={isAnalyzing}
              />

              {/* Social Share - Phase 3 Feature */}
              {appliedSuggestions.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      🎉 Great job! Share your optimization success
                    </div>
                    <SocialShare
                      originalPrompt={prompt}
                      optimizedPrompt={lastOptimizedPrompt || applyAllSuggestions(prompt)}
                      analysis={analysis}
                      userId={userId}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Preview modal */}
          {showPreview && analysis && (
            <PreviewModal
              originalPrompt={prompt}
              optimizedPrompt={applyAllSuggestions(prompt)}
              analysis={analysis}
              onApply={() => {
                const optimized = applyAllSuggestions(prompt);
                handleOptimizationApplied(prompt, optimized, analysis);
                setShowPreview(false);
              }}
              onClose={() => setShowPreview(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Individual components for better organization

const IntroTooltip = ({ onDismiss }) => (
  <div className="bg-blue-600 text-white p-3 rounded-lg mb-3 relative">
    <button
      onClick={onDismiss}
      className="absolute top-2 right-2 text-blue-200 hover:text-white"
    >
      ×
    </button>
    <div className="flex items-start space-x-2">
      <span className="text-lg">🎯</span>
      <div>
        <h4 className="font-semibold text-sm">AI Optimization Active!</h4>
        <p className="text-xs text-blue-100 mt-1">
          Get instant feedback to improve your prompts as you type
        </p>
      </div>
    </div>
  </div>
);

const UsageIndicator = ({ remaining, tier }) => (
  <div className="text-right">
    <div className="text-xs text-gray-500">
      {remaining} {remaining === 1 ? 'optimization' : 'optimizations'} left
    </div>
    {tier === 'free' && remaining <= 1 && (
      <div className="text-xs text-orange-600 font-medium">
        Upgrade for unlimited
      </div>
    )}
  </div>
);

const ScoreVisualization = ({ score, breakdown, animated }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center justify-between mb-3">
      <h4 className="font-medium text-gray-900">Prompt Quality Score</h4>
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-gray-900">{score}</span>
        <span className="text-gray-500">/10</span>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-3 text-sm">
      {Object.entries(breakdown).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="capitalize text-gray-600 mb-1">{key}</div>
          <div className={`font-semibold ${getScoreColor(value)}`}>
            {value}/10
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${getScoreBarColor(value)}`}
              style={{ width: animated ? `${value * 10}%` : '0%' }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SuggestionsSection = ({ suggestions, onApplySuggestion, appliedSuggestions }) => (
  <div>
    <h4 className="font-medium text-gray-900 mb-3">💡 Suggestions for Improvement</h4>
    <div className="space-y-2">
      {suggestions.map((suggestion, index) => (
        <SuggestionCard
          key={index}
          suggestion={suggestion}
          onApply={() => onApplySuggestion(suggestion)}
          applied={appliedSuggestions.includes(suggestion.type)}
        />
      ))}
    </div>
  </div>
);

const SuggestionCard = ({ suggestion, onApply, applied }) => (
  <div className={`border rounded-lg p-3 transition-all ${applied ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-xs font-medium text-gray-500 uppercase">
            {suggestion.type}
          </span>
          {applied && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Applied
            </span>
          )}
        </div>
        <p className="text-sm text-gray-700 mb-2">{suggestion.message}</p>
        {suggestion.preview && (
          <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border-l-2 border-blue-200">
            <strong>Preview:</strong> {suggestion.preview}
          </div>
        )}
      </div>
      
      {!applied && (
        <button
          onClick={onApply}
          className="ml-3 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
        >
          Apply
        </button>
      )}
    </div>
  </div>
);

const ResearchInsights = ({ research }) => (
  <div className="border-t pt-4">
    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
      🔍 Research Insights
      <span className="ml-2 text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
        Premium
      </span>
    </h4>
    <div className="space-y-2 text-sm">
      {research.insights?.slice(0, 2).map((insight, index) => (
        <div key={index} className="bg-purple-50 border border-purple-200 rounded p-2">
          <div className="font-medium text-purple-900">{insight.source}</div>
          <div className="text-purple-700">{insight.recommendation}</div>
        </div>
      ))}
    </div>
  </div>
);

const ActionButtons = ({ analysis, prompt, onApplyAll, onPreview, disabled }) => (
  <div className="flex space-x-2 pt-3 border-t">
    <button
      onClick={onPreview}
      disabled={disabled}
      className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded text-sm font-medium hover:bg-gray-200 disabled:opacity-50 transition-colors"
    >
      Preview Changes
    </button>
    <button
      onClick={onApplyAll}
      disabled={disabled}
      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
    >
      ✨ Apply All Magic
    </button>
  </div>
);

const UpgradePrompt = ({ tier, usageCount, limit, resetDate }) => (
  <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
    <div className="flex items-start space-x-3">
      <div className="text-orange-500">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">
          🚀 You've used all {limit} optimizations this month!
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Upgrade to Premium for 25 optimizations + research insights, or Pro for unlimited everything.
        </p>
        <div className="flex space-x-2">
          <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-700 transition-colors">
            Upgrade to Premium
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm font-medium hover:bg-gray-300 transition-colors">
            View Plans
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ErrorMessage = ({ error, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
    <div className="flex items-center space-x-2">
      <span className="text-red-500">⚠️</span>
      <span className="text-sm text-red-700">{error}</span>
      <button
        onClick={onRetry}
        className="text-red-600 hover:text-red-800 text-sm font-medium"
      >
        Retry
      </button>
    </div>
  </div>
);

const LoadingSpinner = ({ className }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

const PreviewModal = ({ originalPrompt, optimizedPrompt, analysis, onApply, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Preview Optimization</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-medium mb-2">Original Prompt</h4>
            <div className="bg-gray-50 p-3 rounded text-sm border h-32 overflow-auto">
              {originalPrompt}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Optimized Prompt</h4>
            <div className="bg-blue-50 p-3 rounded text-sm border h-32 overflow-auto">
              {optimizedPrompt}
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-medium mb-2">Improvements Applied</h4>
          <div className="space-y-1">
            {analysis.suggestions.map((suggestion, index) => (
              <div key={index} className="text-sm text-green-700 flex items-center space-x-1">
                <span>✓</span>
                <span>{suggestion.message}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onApply}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Helper functions
const getScoreColor = (score) => {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-yellow-600';
  return 'text-red-600';
};

const getScoreBarColor = (score) => {
  if (score >= 8) return 'bg-green-500';
  if (score >= 6) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default PromptOptimizer; 