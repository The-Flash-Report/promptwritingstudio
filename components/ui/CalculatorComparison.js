import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CalculatorComparison({ 
  currentCalculator, 
  currentResults = null,
  showInline = false 
}) {
  const [savedResults, setSavedResults] = useState([])
  const [showComparison, setShowComparison] = useState(false)

  const calculatorConfigs = {
    'roi-calculator': {
      name: 'AI ROI Calculator',
      icon: '💰',
      color: 'yellow',
      keyMetrics: ['yearlySavings', 'hoursSevedPerWeek', 'taskType']
    },
    'ai-cost-comparison': {
      name: 'AI vs Human Cost Calculator',
      icon: '⚖️',
      color: 'blue',
      keyMetrics: ['yearlySavings', 'savingsPercent', 'paybackPeriod']
    },
    'customer-service-ai-savings': {
      name: 'Customer Service AI Calculator',
      icon: '🎧',
      color: 'indigo',
      keyMetrics: ['yearlySavings', 'automatedTicketsPercent', 'roi']
    },
    'business-ai-readiness': {
      name: 'Business AI Readiness',
      icon: '📊',
      color: 'red',
      keyMetrics: ['overallScore', 'readinessLevel', 'timeframe']
    },
    'content-creation-speed': {
      name: 'Content Creation Speed Calculator',
      icon: '✍️',
      color: 'green',
      keyMetrics: ['yearlyDollars', 'productivityIncrease', 'extraPiecesPerWeek']
    },
    'ecommerce-ai-savings': {
      name: 'E-commerce AI Calculator',
      icon: '🛒',
      color: 'purple',
      keyMetrics: ['yearlyTotalSavings', 'timeSavingsPercentage', 'platformBonus']
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem('calculator_comparison_results')
    if (saved) {
      try {
        setSavedResults(JSON.parse(saved))
      } catch (error) {
        console.warn('Failed to parse saved comparison results:', error)
      }
    }
  }, [])

  const saveResultsForComparison = () => {
    if (!currentResults) return

    const resultToSave = {
      id: Date.now(),
      calculator: currentCalculator,
      timestamp: new Date().toISOString(),
      results: currentResults,
      config: calculatorConfigs[currentCalculator]
    }

    const updatedResults = [...savedResults, resultToSave].slice(-5) // Keep last 5 results
    setSavedResults(updatedResults)
    localStorage.setItem('calculator_comparison_results', JSON.stringify(updatedResults))
    
    // Show success message
    alert('Results saved for comparison! 📊')
  }

  const removeResult = (id) => {
    const updatedResults = savedResults.filter(result => result.id !== id)
    setSavedResults(updatedResults)
    localStorage.setItem('calculator_comparison_results', JSON.stringify(updatedResults))
  }

  const clearAllResults = () => {
    setSavedResults([])
    localStorage.removeItem('calculator_comparison_results')
  }

  const formatMetricValue = (value, metric) => {
    if (!value) return 'N/A'
    
    // Format based on metric type
    if (metric.includes('Savings') || metric.includes('Dollars')) {
      return `$${parseInt(value).toLocaleString()}`
    }
    if (metric.includes('Percent') || metric.includes('Score')) {
      return `${value}%`
    }
    if (metric.includes('Hours')) {
      return `${value} hrs`
    }
    if (metric.includes('Period')) {
      return `${value} months`
    }
    
    return value
  }

  const getColorClasses = (color) => {
    const colors = {
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800',
      blue: 'bg-blue-100 border-blue-300 text-blue-800',
      indigo: 'bg-indigo-100 border-indigo-300 text-indigo-800',
      red: 'bg-red-100 border-red-300 text-red-800',
      green: 'bg-green-100 border-green-300 text-green-800',
      purple: 'bg-purple-100 border-purple-300 text-purple-800'
    }
    return colors[color] || colors.blue
  }

  if (showInline && savedResults.length === 0) {
    return null
  }

  return (
    <>
      {/* Save Current Results Button */}
      {currentResults && (
        <div className="mb-6 text-center">
          <button
            onClick={saveResultsForComparison}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            📊 Save Results for Comparison
          </button>
        </div>
      )}

      {/* Comparison Toggle */}
      {savedResults.length > 0 && (
        <div className="mb-6">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
          >
            {showComparison ? '📊 Hide' : '📊 Show'} Calculator Comparison ({savedResults.length} saved)
          </button>
        </div>
      )}

      {/* Comparison Display */}
      {showComparison && savedResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Calculator Results Comparison</h3>
            <button
              onClick={clearAllResults}
              className="text-red-600 hover:text-red-800 text-sm underline"
            >
              Clear All
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedResults.map((result) => (
                <div
                  key={result.id}
                  className={`border-2 rounded-lg p-4 ${getColorClasses(result.config?.color)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{result.config?.icon}</span>
                      <h4 className="font-semibold text-sm">{result.config?.name}</h4>
                    </div>
                    <button
                      onClick={() => removeResult(result.id)}
                      className="text-gray-500 hover:text-red-600 text-xs"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-2">
                    {result.config?.keyMetrics.map((metric) => (
                      <div key={metric} className="flex justify-between text-sm">
                        <span className="truncate mr-2">
                          {metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                        </span>
                        <span className="font-semibold">
                          {formatMetricValue(result.results[metric], metric)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-current border-opacity-30">
                    <div className="text-xs opacity-75">
                      {new Date(result.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          {savedResults.length >= 2 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">💡 Comparison Insights</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ComparisonInsights results={savedResults} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggested Calculators */}
      {!showInline && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Compare with Other Calculators
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(calculatorConfigs)
              .filter(([key]) => key !== currentCalculator)
              .slice(0, 3)
              .map(([key, config]) => (
                <Link
                  key={key}
                  href={key === 'roi-calculator' ? '/roi-calculator' : `/calculators/${key}`}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{config.icon}</span>
                    <h4 className="font-semibold text-gray-900 text-sm">{config.name}</h4>
                  </div>
                  <p className="text-xs text-gray-600">
                    Compare your {currentCalculator} results with this calculator
                  </p>
                </Link>
              ))
            }
          </div>
        </div>
      )}
    </>
  )
}

// Insights component for comparison analysis
function ComparisonInsights({ results }) {
  const insights = []

  // Find highest savings
  const savingsResults = results.filter(r => r.results.yearlySavings || r.results.yearlyDollars || r.results.yearlyTotalSavings)
  if (savingsResults.length > 1) {
    const highest = savingsResults.reduce((max, current) => {
      const currentSavings = current.results.yearlySavings || current.results.yearlyDollars || current.results.yearlyTotalSavings || 0
      const maxSavings = max.results.yearlySavings || max.results.yearlyDollars || max.results.yearlyTotalSavings || 0
      return currentSavings > maxSavings ? current : max
    })
    
    insights.push(`💰 Highest savings potential: ${highest.config.name} with $${parseInt(highest.results.yearlySavings || highest.results.yearlyDollars || highest.results.yearlyTotalSavings || 0).toLocaleString()}/year`)
  }

  // Check readiness score if available
  const readinessResult = results.find(r => r.results.overallScore)
  if (readinessResult) {
    const score = readinessResult.results.overallScore
    if (score < 60) {
      insights.push(`⚠️ AI Readiness Score of ${score}% suggests focusing on foundation building before major AI investments`)
    } else if (score >= 80) {
      insights.push(`✅ High AI Readiness Score of ${score}% indicates you're ready to pursue aggressive AI automation strategies`)
    }
  }

  // Time efficiency comparison
  const timeResults = results.filter(r => r.results.hoursSevedPerWeek || r.results.timeSavingsHours)
  if (timeResults.length > 1) {
    const totalHours = timeResults.reduce((sum, r) => sum + parseFloat(r.results.hoursSevedPerWeek || r.results.timeSavingsHours || 0), 0)
    insights.push(`⏰ Combined time savings across calculators: ${totalHours.toFixed(1)} hours/week`)
  }

  return (
    <div className="space-y-2">
      {insights.length > 0 ? (
        insights.map((insight, index) => (
          <p key={index} className="text-sm text-blue-800">
            {insight}
          </p>
        ))
      ) : (
        <p className="text-sm text-blue-800">
          Add more calculator results to see personalized insights and recommendations.
        </p>
      )}
    </div>
  )
} 