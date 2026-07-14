import { useState } from 'react'
import EmailCapture from '../ui/EmailCapture'
import LastVerified from '../LastVerified'
import subscriptionPricing from '../../data/subscription-pricing.json'

export default function CostComparisonCalculator() {
  const [formData, setFormData] = useState({
    taskType: '',
    volume: '',
    humanCost: '',
    aiTool: ''
  })
  const [results, setResults] = useState(null)

  const taskTypes = [
    {
      value: 'content-writing',
      label: 'Content Writing',
      unit: 'articles/month',
      humanTime: 3,
      aiTime: 0.5,
      quality: 0.85
    },
    {
      value: 'customer-support',
      label: 'Customer Support',
      unit: 'tickets/month',
      humanTime: 0.25,
      aiTime: 0.05,
      quality: 0.80
    },
    {
      value: 'data-analysis',
      label: 'Data Analysis',
      unit: 'reports/month',
      humanTime: 8,
      aiTime: 1.5,
      quality: 0.90
    },
    {
      value: 'social-media',
      label: 'Social Media Management',
      unit: 'posts/month',
      humanTime: 0.5,
      aiTime: 0.1,
      quality: 0.75
    },
    {
      value: 'email-marketing',
      label: 'Email Marketing',
      unit: 'emails/month',
      humanTime: 2,
      aiTime: 0.25,
      quality: 0.85
    },
    {
      value: 'product-descriptions',
      label: 'Product Descriptions',
      unit: 'descriptions/month',
      humanTime: 0.75,
      aiTime: 0.1,
      quality: 0.90
    },
    {
      value: 'research',
      label: 'Research & Analysis',
      unit: 'research projects/month',
      humanTime: 12,
      aiTime: 2,
      quality: 0.85
    },
    {
      value: 'translations',
      label: 'Translation Services',
      unit: 'pages/month',
      humanTime: 0.5,
      aiTime: 0.05,
      quality: 0.95
    }
  ]

  // AI subscription prices come from the dated data/subscription-pricing.json
  // source (each plan carries its own source_url + last_verified), never
  // hardcoded here.
  const aiTools = subscriptionPricing.plans.map(plan => ({
    value: plan.id,
    label: plan.label,
    cost: plan.monthly_usd
  }))

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const calculateComparison = () => {
    const volume = parseFloat(formData.volume)
    const humanCostPerHour = parseFloat(formData.humanCost)
    const selectedTask = taskTypes.find(task => task.value === formData.taskType)
    const selectedAI = aiTools.find(tool => tool.value === formData.aiTool)

    if (!volume || !humanCostPerHour || !selectedTask || !selectedAI) return

    // Human calculations
    const humanHoursPerMonth = volume * selectedTask.humanTime
    const humanMonthlyCost = humanHoursPerMonth * humanCostPerHour
    const humanYearlyCost = humanMonthlyCost * 12

    // AI calculations
    const aiHoursPerMonth = volume * selectedTask.aiTime
    const aiMonthlyCost = selectedAI.cost + (aiHoursPerMonth * (humanCostPerHour * 0.1)) // 10% human oversight
    const aiYearlyCost = aiMonthlyCost * 12

    // Savings calculations
    const monthlySavings = humanMonthlyCost - aiMonthlyCost
    const yearlySavings = humanYearlyCost - aiYearlyCost
    const savingsPercent = ((monthlySavings / humanMonthlyCost) * 100).toFixed(0)
    const paybackPeriod = selectedAI.cost / monthlySavings

    // Time savings
    const timeSavedHours = humanHoursPerMonth - aiHoursPerMonth
    const timeSavedPercent = ((timeSavedHours / humanHoursPerMonth) * 100).toFixed(0)

    const calculatedResults = {
      humanMonthlyCost: humanMonthlyCost.toFixed(0),
      humanYearlyCost: humanYearlyCost.toFixed(0),
      humanHoursPerMonth: humanHoursPerMonth.toFixed(1),
      aiMonthlyCost: aiMonthlyCost.toFixed(0),
      aiYearlyCost: aiYearlyCost.toFixed(0),
      aiHoursPerMonth: aiHoursPerMonth.toFixed(1),
      monthlySavings: monthlySavings.toFixed(0),
      yearlySavings: yearlySavings.toFixed(0),
      savingsPercent,
      timeSavedHours: timeSavedHours.toFixed(1),
      timeSavedPercent,
      paybackPeriod: paybackPeriod.toFixed(1),
      qualityScore: (selectedTask.quality * 100).toFixed(0),
      taskType: selectedTask.label,
      aiTool: selectedAI.label,
      volume,
      unit: selectedTask.unit
    }

    setResults(calculatedResults)
  }

  const resetCalculator = () => {
    setFormData({
      taskType: '',
      volume: '',
      humanCost: '',
      aiTool: ''
    })
    setResults(null)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          AI vs Human Cost Calculator
        </h2>
        <p className="text-white text-lg opacity-90">
          Compare the true cost of AI automation vs hiring employees or contractors
        </p>
      </div>

      <div className="p-6 md:p-8">
        {!results ? (
          // Initial Calculator Form
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                What type of work are you comparing?
              </label>
              <select
                name="taskType"
                value={formData.taskType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a task type...</option>
                {taskTypes.map(task => (
                  <option key={task.value} value={task.value}>
                    {task.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Volume per month
                {formData.taskType && (
                  <span className="text-gray-500 font-normal">
                    {' '}({taskTypes.find(t => t.value === formData.taskType)?.unit})
                  </span>
                )}
              </label>
              <input
                type="number"
                name="volume"
                value={formData.volume}
                onChange={handleInputChange}
                placeholder="e.g., 50"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Human hourly rate (employee or contractor cost)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  name="humanCost"
                  value={formData.humanCost}
                  onChange={handleInputChange}
                  placeholder="25"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Include total cost: salary + benefits + overhead (typically 1.5-2x base salary)
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                AI tool preference
              </label>
              <select
                name="aiTool"
                value={formData.aiTool}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select AI tools...</option>
                {aiTools.map(tool => (
                  <option key={tool.value} value={tool.value}>
                    {tool.label} (${tool.cost}/month)
                  </option>
                ))}
              </select>
              <LastVerified
                date={subscriptionPricing.last_updated}
                label="Plan prices last verified"
                className="mt-2"
              />
            </div>

            <button
              onClick={calculateComparison}
              disabled={!formData.taskType || !formData.volume || !formData.humanCost || !formData.aiTool}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Compare Costs
            </button>
          </div>
        ) : (
          // Results + Email Capture
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                AI vs Human: Cost Comparison Results
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Human Cost Card */}
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-red-800 mb-3">Human Cost</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-red-600">Monthly:</span>
                      <span className="font-bold text-red-800">${results.humanMonthlyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Yearly:</span>
                      <span className="font-bold text-red-800">${results.humanYearlyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Hours/month:</span>
                      <span className="font-bold text-red-800">{results.humanHoursPerMonth}h</span>
                    </div>
                  </div>
                </div>

                {/* AI Cost Card */}
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-800 mb-3">AI Cost</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-600">Monthly:</span>
                      <span className="font-bold text-green-800">${results.aiMonthlyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Yearly:</span>
                      <span className="font-bold text-green-800">${results.aiYearlyCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Hours/month:</span>
                      <span className="font-bold text-green-800">{results.aiHoursPerMonth}h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Summary */}
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-6">
                <h4 className="text-xl font-bold text-blue-800 mb-4">Your Savings with AI</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">${results.monthlySavings}</div>
                    <div className="text-sm text-blue-600">Monthly Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">${results.yearlySavings}</div>
                    <div className="text-sm text-blue-600">Yearly Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{results.savingsPercent}%</div>
                    <div className="text-sm text-blue-600">Cost Reduction</div>
                  </div>
                </div>
              </div>

              {/* Additional Insights */}
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2">Time Savings</h5>
                  <p className="text-gray-600">
                    AI saves you <strong>{results.timeSavedHours} hours per month</strong> ({results.timeSavedPercent}% reduction)
                    for {results.volume} {results.unit}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2">Payback Period</h5>
                  <p className="text-gray-600">
                    Your AI investment pays for itself in <strong>{results.paybackPeriod} months</strong>
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2">Quality Score</h5>
                  <p className="text-gray-600">
                    AI delivers <strong>{results.qualityScore}%</strong> of human quality for {results.taskType.toLowerCase()}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2">Scalability</h5>
                  <p className="text-gray-600">
                    AI costs stay fixed while human costs increase linearly with volume
                  </p>
                </div>
              </div>
            </div>

            {/* Newsletter capture: real Netlify Forms -> Resend pipeline */}
            <div className="border-t border-gray-200 pt-6">
              <div className="text-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Get Your AI vs Human Implementation Guide
                </h4>
                <p className="text-gray-600">
                  Receive a detailed breakdown with specific tools, implementation steps, and ROI tracking templates.
                </p>
              </div>
              <div className="flex justify-center">
                <EmailCapture
                  source="calculator-ai-cost-comparison"
                  theme="light"
                  label="We'll also send you our weekly AI automation insights. Unsubscribe anytime."
                  buttonText="Send My Implementation Guide"
                />
              </div>
            </div>

            <button
              onClick={resetCalculator}
              className="w-full text-gray-500 hover:text-gray-700 py-2"
            >
              Compare a different task
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
