import React, { useState, useEffect } from 'react';

const AdvancedAnalyticsDashboard = ({ userId = 'anonymous', tier = 'free', onUpgrade, className = '' }) => {
  const [analytics, setAnalytics] = useState({
    totalOptimizations: 0,
    totalTimeSaved: 0,
    averageImprovement: 0,
    valueGenerated: 0,
    weeklyData: [],
    topPromptTypes: [],
    performanceMetrics: {},
    goals: []
  });

  const [dateRange, setDateRange] = useState('30d'); // '7d', '30d', '90d', 'all'
  const [showGoalModal, setShowGoalModal] = useState(false);

  const hasAccess = tier === 'premium' || tier === 'pro';

  // Load analytics data
  useEffect(() => {
    if (hasAccess) {
      loadAnalyticsData(dateRange);
    }
  }, [userId, dateRange, hasAccess]);

  const loadAnalyticsData = async (range) => {
    try {
      // In production, this would call your analytics API
      const mockData = generateMockAnalyticsData(range);
      setAnalytics(mockData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  // Generate mock analytics data for demo
  const generateMockAnalyticsData = (range) => {
    const daysBack = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
    
    const weeklyData = [];
    const today = new Date();
    
    for (let i = daysBack; i >= 0; i -= 7) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      weeklyData.push({
        week: date.toISOString().split('T')[0],
        optimizations: Math.floor(Math.random() * 15) + 5,
        avgImprovement: Math.random() * 3 + 2,
        timeSaved: Math.floor(Math.random() * 30) + 15
      });
    }

    return {
      totalOptimizations: weeklyData.reduce((sum, w) => sum + w.optimizations, 0),
      totalTimeSaved: weeklyData.reduce((sum, w) => sum + w.timeSaved, 0),
      averageImprovement: weeklyData.reduce((sum, w) => sum + w.avgImprovement, 0) / weeklyData.length,
      valueGenerated: weeklyData.reduce((sum, w) => sum + w.timeSaved * 15, 0), // $15/hour value
      weeklyData,
      topPromptTypes: [
        { type: 'Marketing Copy', count: 45, avgImprovement: 3.2 },
        { type: 'Business Emails', count: 32, avgImprovement: 2.8 },
        { type: 'Content Creation', count: 28, avgImprovement: 3.5 },
        { type: 'Social Media', count: 19, avgImprovement: 2.5 }
      ],
      performanceMetrics: {
        bestDay: 'Tuesday',
        peakHour: '10 AM',
        consistencyScore: 85,
        efficiencyTrend: '+12%'
      },
      goals: [
        { id: 1, name: '100 Optimizations', target: 100, current: 75, deadline: '2025-02-15' },
        { id: 2, name: '5 Hours Saved', target: 300, current: 245, deadline: '2025-02-01' }
      ]
    };
  };

  if (!hasAccess) {
    return (
      <div className={`analytics-dashboard-locked ${className}`}>
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics Dashboard</h3>
          <p className="text-gray-600 mb-6">
            Track your optimization ROI, set goals, and measure real business impact
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-2xl mx-auto">
            <FeaturePreview
              icon="💰"
              title="ROI Tracking"
              description="Calculate exact time & money saved from optimizations"
            />
            <FeaturePreview
              icon="📈"
              title="Performance Trends"
              description="See improvement patterns over time"
            />
            <FeaturePreview
              icon="🎯"
              title="Custom Goals"
              description="Set and track optimization targets"
            />
            <FeaturePreview
              icon="📋"
              title="Detailed Reports"
              description="Export analytics for team review"
            />
          </div>

          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-6 text-sm max-w-md mx-auto">
            <strong>Premium Feature:</strong> Advanced analytics help users optimize 40% faster and prove ROI to stakeholders
          </div>

          <button
            onClick={() => onUpgrade('premium')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Upgrade to Premium - $25/month
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`analytics-dashboard ${className}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📊</span>
              <div>
                <h2 className="text-xl font-bold">Analytics Dashboard</h2>
                <p className="text-blue-100">Track your optimization performance</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-white text-gray-700 px-3 py-1 rounded-lg text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="all">All time</option>
              </select>
              
              <button
                onClick={() => setShowGoalModal(true)}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-30 transition-colors"
              >
                Set Goals
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Optimizations"
              value={analytics.totalOptimizations}
              suffix=""
              icon="⚡"
              color="blue"
              trend="+15%"
            />
            <MetricCard
              title="Time Saved"
              value={Math.round(analytics.totalTimeSaved)}
              suffix=" min"
              icon="⏱️"
              color="green"
              trend="+8%"
            />
            <MetricCard
              title="Avg Improvement"
              value={analytics.averageImprovement.toFixed(1)}
              suffix=" pts"
              icon="📈"
              color="purple"
              trend="+3%"
            />
            <MetricCard
              title="Value Generated"
              value={Math.round(analytics.valueGenerated)}
              suffix=""
              prefix="$"
              icon="💰"
              color="orange"
              trend="+12%"
            />
          </div>

          {/* Weekly Performance Chart */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Performance Over Time</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <WeeklyChart data={analytics.weeklyData} />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Prompt Types */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Top Prompt Categories</h3>
              <div className="space-y-3">
                {analytics.topPromptTypes.map((type, index) => (
                  <div key={type.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-medium">{type.type}</div>
                        <div className="text-sm text-gray-600">{type.count} optimizations</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">+{type.avgImprovement.toFixed(1)}</div>
                      <div className="text-xs text-gray-500">avg improvement</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
              <div className="space-y-4">
                <InsightCard
                  icon="📅"
                  title="Best Performance Day"
                  value={analytics.performanceMetrics.bestDay}
                  description="You optimize most effectively on Tuesdays"
                />
                <InsightCard
                  icon="🕙"
                  title="Peak Optimization Hour"
                  value={analytics.performanceMetrics.peakHour}
                  description="Your most productive optimization time"
                />
                <InsightCard
                  icon="📊"
                  title="Consistency Score"
                  value={`${analytics.performanceMetrics.consistencyScore}%`}
                  description="How regularly you use optimization"
                />
                <InsightCard
                  icon="⚡"
                  title="Efficiency Trend"
                  value={analytics.performanceMetrics.efficiencyTrend}
                  description="Month-over-month improvement"
                />
              </div>
            </div>
          </div>

          {/* Goals Progress */}
          {analytics.goals.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Goal Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analytics.goals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>
          )}

          {/* Export Options */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Export Analytics</h4>
                <p className="text-sm text-gray-600">Download your data for presentations or reports</p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  Export PDF
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goal Setting Modal */}
      {showGoalModal && (
        <GoalSettingModal
          onClose={() => setShowGoalModal(false)}
          onSave={(goal) => {
            setAnalytics(prev => ({
              ...prev,
              goals: [...prev.goals, { ...goal, id: Date.now() }]
            }));
            setShowGoalModal(false);
          }}
        />
      )}
    </div>
  );
};

// Individual Components
const FeaturePreview = ({ icon, title, description }) => (
  <div className="bg-white border border-blue-200 rounded-lg p-4 text-center">
    <div className="text-2xl mb-2">{icon}</div>
    <h4 className="font-medium text-gray-900 mb-1">{title}</h4>
    <p className="text-xs text-gray-600">{description}</p>
  </div>
);

const MetricCard = ({ title, value, suffix = '', prefix = '', icon, color, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    green: 'bg-green-50 border-green-200 text-green-600',
    purple: 'bg-purple-50 border-purple-200 text-purple-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600'
  };

  return (
    <div className={`${colorClasses[color]} border rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className="text-xs font-medium text-green-600">{trend}</span>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
      </div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );
};

const WeeklyChart = ({ data }) => (
  <div className="h-64 flex items-end space-x-2">
    {data.map((week, index) => {
      const maxOptimizations = Math.max(...data.map(w => w.optimizations));
      const height = (week.optimizations / maxOptimizations) * 200 + 20;
      
      return (
        <div key={week.week} className="flex-1 flex flex-col items-center">
          <div className="text-xs text-gray-600 mb-2">
            {week.optimizations}
          </div>
          <div
            className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
            style={{ height: `${height}px` }}
          />
          <div className="text-xs text-gray-500 mt-2">
            {new Date(week.week).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      );
    })}
  </div>
);

const InsightCard = ({ icon, title, value, description }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
    <div className="flex items-center space-x-3">
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <div className="font-medium text-gray-900">{title}</div>
        <div className="text-lg font-bold text-blue-600">{value}</div>
        <div className="text-xs text-gray-600">{description}</div>
      </div>
    </div>
  </div>
);

const GoalCard = ({ goal }) => {
  const progress = Math.min((goal.current / goal.target) * 100, 100);
  const isCompleted = goal.current >= goal.target;
  
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">{goal.name}</h4>
        <span className={`text-xs px-2 py-1 rounded-full ${
          isCompleted ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {isCompleted ? 'Completed' : 'In Progress'}
        </span>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
          <span>{goal.current} / {goal.target}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isCompleted ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="text-xs text-gray-500">
        Deadline: {new Date(goal.deadline).toLocaleDateString()}
      </div>
    </div>
  );
};

const GoalSettingModal = ({ onClose, onSave }) => {
  const [goalData, setGoalData] = useState({
    name: '',
    target: '',
    deadline: ''
  });

  const handleSave = () => {
    if (goalData.name && goalData.target && goalData.deadline) {
      onSave({
        ...goalData,
        target: parseInt(goalData.target),
        current: 0
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">Set New Goal</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
            <input
              type="text"
              value={goalData.name}
              onChange={(e) => setGoalData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., 100 Optimizations"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Number</label>
            <input
              type="number"
              value={goalData.target}
              onChange={(e) => setGoalData(prev => ({ ...prev, target: e.target.value }))}
              placeholder="100"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
            <input
              type="date"
              value={goalData.deadline}
              onChange={(e) => setGoalData(prev => ({ ...prev, deadline: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
        </div>
        
        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard; 