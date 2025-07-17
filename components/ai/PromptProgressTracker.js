import React, { useState, useEffect } from 'react';

const PromptProgressTracker = ({ userId = 'anonymous', className = '' }) => {
  const [progress, setProgress] = useState({
    totalOptimizations: 0,
    averageScoreImprovement: 0,
    badges: [],
    weeklyStats: [],
    currentStreak: 0
  });

  const [showDashboard, setShowDashboard] = useState(false);

  // Badge definitions
  const availableBadges = {
    firstOptimization: {
      id: 'first-optimization',
      name: 'First Steps',
      description: 'Completed your first prompt optimization',
      icon: '🎯',
      requirement: 'optimization_count >= 1'
    },
    clarityMaster: {
      id: 'clarity-master', 
      name: 'Clarity Master',
      description: 'Achieved 8+ clarity scores 5 times',
      icon: '🔍',
      requirement: 'high_clarity_count >= 5'
    },
    specificityGuru: {
      id: 'specificity-guru',
      name: 'Specificity Guru', 
      description: 'Achieved 8+ specificity scores 5 times',
      icon: '🎯',
      requirement: 'high_specificity_count >= 5'
    },
    consistentUser: {
      id: 'consistent-user',
      name: 'Consistent Optimizer',
      description: 'Used optimization 7 days in a row',
      icon: '🔥',
      requirement: 'current_streak >= 7'
    },
    powerUser: {
      id: 'power-user',
      name: 'Power User',
      description: 'Completed 25+ optimizations',
      icon: '⚡',
      requirement: 'optimization_count >= 25'
    },
    improvementChampion: {
      id: 'improvement-champion',
      name: 'Improvement Champion',
      description: 'Average improvement of 3+ points',
      icon: '🏆',
      requirement: 'average_improvement >= 3'
    }
  };

  // Load progress from localStorage
  useEffect(() => {
    const storedProgress = localStorage.getItem(`progress_${userId}`);
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, [userId]);

  // Save progress to localStorage
  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    localStorage.setItem(`progress_${userId}`, JSON.stringify(newProgress));
  };

  // Record a new optimization
  const recordOptimization = (beforeScore, afterScore, breakdown) => {
    const improvement = afterScore - beforeScore;
    const newProgress = { ...progress };
    
    // Update basic stats
    newProgress.totalOptimizations += 1;
    newProgress.averageScoreImprovement = 
      ((newProgress.averageScoreImprovement * (newProgress.totalOptimizations - 1)) + improvement) / newProgress.totalOptimizations;
    
    // Update weekly stats
    const today = new Date().toISOString().split('T')[0];
    const existingDay = newProgress.weeklyStats.find(day => day.date === today);
    
    if (existingDay) {
      existingDay.optimizations += 1;
      existingDay.totalImprovement += improvement;
    } else {
      newProgress.weeklyStats.push({
        date: today,
        optimizations: 1,
        totalImprovement: improvement
      });
    }
    
    // Keep only last 30 days
    newProgress.weeklyStats = newProgress.weeklyStats.slice(-30);
    
    // Update streak
    newProgress.currentStreak = calculateStreak(newProgress.weeklyStats);
    
    // Check for new badges
    const newBadges = checkForNewBadges(newProgress, breakdown);
    newProgress.badges = [...new Set([...newProgress.badges, ...newBadges])];
    
    saveProgress(newProgress);
    
    // Show celebration for new badges
    if (newBadges.length > 0) {
      showBadgeNotification(newBadges);
    }
  };

  // Calculate current streak
  const calculateStreak = (weeklyStats) => {
    if (weeklyStats.length === 0) return 0;
    
    const sortedStats = weeklyStats.sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    let currentDate = new Date();
    
    for (const stat of sortedStats) {
      const statDate = new Date(stat.date);
      const daysDiff = Math.floor((currentDate - statDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= streak + 1) {
        streak++;
        currentDate = statDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Check for new badges
  const checkForNewBadges = (progressData, breakdown) => {
    const newBadges = [];
    const stats = {
      optimization_count: progressData.totalOptimizations,
      average_improvement: progressData.averageScoreImprovement,
      current_streak: progressData.currentStreak,
      high_clarity_count: 0, // Would need to track this separately
      high_specificity_count: 0 // Would need to track this separately  
    };
    
    Object.values(availableBadges).forEach(badge => {
      if (!progressData.badges.includes(badge.id)) {
        // Simple evaluation - in production you'd have more sophisticated logic
        if (evaluateBadgeRequirement(badge.requirement, stats)) {
          newBadges.push(badge.id);
        }
      }
    });
    
    return newBadges;
  };

  // Simple badge requirement evaluation
  const evaluateBadgeRequirement = (requirement, stats) => {
    // This is a simplified version - in production you'd use a proper expression evaluator
    if (requirement.includes('optimization_count >= 1')) return stats.optimization_count >= 1;
    if (requirement.includes('optimization_count >= 25')) return stats.optimization_count >= 25;
    if (requirement.includes('current_streak >= 7')) return stats.current_streak >= 7;
    if (requirement.includes('average_improvement >= 3')) return stats.average_improvement >= 3;
    return false;
  };

  // Show badge notification
  const showBadgeNotification = (newBadges) => {
    newBadges.forEach(badgeId => {
      const badge = availableBadges[badgeId];
      if (badge) {
        // Simple notification - in production you'd use a toast library
        setTimeout(() => {
          alert(`🎉 New Badge Earned: ${badge.icon} ${badge.name}\n${badge.description}`);
        }, 500);
      }
    });
  };

  // Expose the record function for parent components
  React.useImperativeHandle(React.forwardRef((props, ref) => ref), () => ({
    recordOptimization
  }));

  return (
    <div className={`prompt-progress-tracker ${className}`}>
      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{progress.totalOptimizations}</div>
              <div className="text-xs text-gray-600">Optimizations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                +{progress.averageScoreImprovement.toFixed(1)}
              </div>
              <div className="text-xs text-gray-600">Avg Improvement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{progress.currentStreak}</div>
              <div className="text-xs text-gray-600">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{progress.badges.length}</div>
              <div className="text-xs text-gray-600">Badges</div>
            </div>
          </div>
          
          <button
            onClick={() => setShowDashboard(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Dashboard
          </button>
        </div>
      </div>

      {/* Badge Display */}
      {progress.badges.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Badges</h4>
          <div className="flex flex-wrap gap-2">
            {progress.badges.slice(-3).map(badgeId => {
              const badge = availableBadges[badgeId];
              return badge ? (
                <div
                  key={badge.id}
                  className="flex items-center space-x-1 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1"
                  title={badge.description}
                >
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-xs font-medium text-yellow-800">{badge.name}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Progress Dashboard Modal */}
      {showDashboard && (
        <ProgressDashboard
          progress={progress}
          availableBadges={availableBadges}
          onClose={() => setShowDashboard(false)}
        />
      )}
    </div>
  );
};

// Progress Dashboard Component
const ProgressDashboard = ({ progress, availableBadges, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Progress Dashboard</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        {/* Value Demonstration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {(progress.averageScoreImprovement * progress.totalOptimizations * 2).toFixed(0)} min
            </div>
            <div className="text-sm text-blue-700 font-medium">Time Saved</div>
            <div className="text-xs text-gray-600 mt-1">
              Based on 2 min saved per point improvement
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {(progress.averageScoreImprovement * 15).toFixed(0)}%
            </div>
            <div className="text-sm text-green-700 font-medium">Better AI Results</div>
            <div className="text-xs text-gray-600 mt-1">
              Estimated improvement in AI output quality
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              ${(progress.totalOptimizations * 5).toFixed(0)}
            </div>
            <div className="text-sm text-purple-700 font-medium">Value Generated</div>
            <div className="text-xs text-gray-600 mt-1">
              Based on $5 value per optimization
            </div>
          </div>
        </div>

        {/* All Badges */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Achievement Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.values(availableBadges).map(badge => {
              const earned = progress.badges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`border rounded-lg p-4 text-center transition-all ${
                    earned 
                      ? 'bg-yellow-50 border-yellow-300 shadow-sm' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="text-3xl mb-2">{earned ? badge.icon : '⚪'}</div>
                  <div className={`font-medium text-sm ${earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {badge.name}
                  </div>
                  <div className={`text-xs mt-1 ${earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {badge.description}
                  </div>
                  {earned && (
                    <div className="mt-2 text-xs text-green-600 font-medium">✓ Earned</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {progress.weeklyStats.length > 0 ? (
              <div className="space-y-2">
                {progress.weeklyStats.slice(-7).map((day, index) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{day.date}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{day.optimizations} optimizations</span>
                      <span className="text-sm text-green-600">
                        +{day.totalImprovement.toFixed(1)} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Start optimizing prompts to see your activity here!
              </div>
            )}
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
          <div className="text-center">
            <h4 className="font-semibold text-gray-900 mb-2">
              Unlock Advanced Analytics
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              Get detailed insights, custom goals, and unlimited optimizations
            </p>
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PromptProgressTracker; 