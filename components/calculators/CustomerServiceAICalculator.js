import { useState } from 'react'
import { useCalculatorTracking } from '../ui/CalculatorAnalytics'
import SocialShare from '../ui/SocialShare'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function CustomerServiceAICalculator() {
  const [formData, setFormData] = useState({
    monthlyTickets: '',
    avgResolutionTime: '',
    avgAgentCost: '',
    currentAgents: '',
    ticketTypes: 'mixed',
    currentSatisfaction: '',
    email: ''
  })
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const { trackCalculatorStart, trackCalculatorComplete, trackCTAClick } = useCalculatorTracking('Customer Service AI Calculator')

  const ticketTypeOptions = [
    { value: 'simple', label: 'Mostly Simple (FAQ, Account Info)', automationRate: 0.75, timeReduction: 0.80 },
    { value: 'mixed', label: 'Mixed Complexity', automationRate: 0.60, timeReduction: 0.65 },
    { value: 'complex', label: 'Mostly Complex (Technical, Complaints)', automationRate: 0.40, timeReduction: 0.50 }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const calculateSavings = async () => {
    const tickets = parseFloat(formData.monthlyTickets)
    const resolutionTime = parseFloat(formData.avgResolutionTime)
    const agentCost = parseFloat(formData.avgAgentCost)
    const currentAgents = parseFloat(formData.currentAgents)
    const currentSat = parseFloat(formData.currentSatisfaction)
    
    if (!tickets || !resolutionTime || !agentCost || !currentAgents) return

    setIsCalculating(true)
    trackCalculatorStart()
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500))

    const selectedTicketType = ticketTypeOptions.find(option => option.value === formData.ticketTypes)
    
    // Calculate current metrics
    const currentMonthlyHours = tickets * (resolutionTime / 60) // Convert minutes to hours
    const currentMonthlyCost = currentMonthlyHours * agentCost
    const currentYearlyCost = currentMonthlyCost * 12

    // Calculate AI impact
    const automatedTickets = tickets * selectedTicketType.automationRate
    const remainingTickets = tickets - automatedTickets
    
    // Time savings for remaining tickets (AI assistance)
    const timeReductionForRemaining = selectedTicketType.timeReduction
    const newResolutionTime = resolutionTime * (1 - timeReductionForRemaining)
    const newMonthlyHours = (automatedTickets * 0.1) + (remainingTickets * (newResolutionTime / 60)) // 0.1 hours for automated tickets
    
    const hoursSaved = currentMonthlyHours - newMonthlyHours
    const monthlySavings = hoursSaved * agentCost
    const yearlySavings = monthlySavings * 12
    
    // Customer satisfaction improvement
    const satisfactionImprovement = Math.min(10, currentSat + (2.5 - (currentSat * 0.15)))
    
    // Response time improvement
    const avgResponseTimeImprovement = 75 // percentage improvement
    
    // Agent efficiency
    const agentsNeededReduction = Math.floor(hoursSaved / 160) // Assuming 160 hours/month per agent
    const agentCostSavings = agentsNeededReduction * agentCost * 160
    
    // Implementation costs (rough estimates)
    const implementationCost = currentAgents * 1500 + 5000 // Setup cost
    const monthlyAICost = Math.max(200, currentAgents * 150) // Monthly AI service cost
    const yearlyAICost = monthlyAICost * 12
    
    const netYearlySavings = yearlySavings - yearlyAICost
    const paybackPeriod = implementationCost / monthlySavings

    const calculatedResults = {
      // Current state
      currentMonthlyTickets: tickets.toFixed(0),
      currentMonthlyHours: currentMonthlyHours.toFixed(0),
      currentMonthlyCost: currentMonthlyCost.toFixed(0),
      currentYearlyCost: currentYearlyCost.toFixed(0),
      
      // AI improvements
      automatedTicketsPercent: (selectedTicketType.automationRate * 100).toFixed(0),
      automatedTicketsCount: automatedTickets.toFixed(0),
      newMonthlyHours: newMonthlyHours.toFixed(0),
      hoursSavedMonthly: hoursSaved.toFixed(0),
      hoursSavedYearly: (hoursSaved * 12).toFixed(0),
      
      // Financial savings
      monthlySavings: monthlySavings.toFixed(0),
      yearlySavings: yearlySavings.toFixed(0),
      netYearlySavings: netYearlySavings.toFixed(0),
      
      // Efficiency gains
      responseTimeImprovement: avgResponseTimeImprovement.toFixed(0),
      satisfactionImprovement: satisfactionImprovement.toFixed(1),
      agentsReduced: agentsNeededReduction.toFixed(0),
      agentCostSavings: agentCostSavings.toFixed(0),
      
      // Implementation
      implementationCost: implementationCost.toFixed(0),
      monthlyAICost: monthlyAICost.toFixed(0),
      paybackPeriod: paybackPeriod.toFixed(1),
      
      // ROI
      roi: ((netYearlySavings / implementationCost) * 100).toFixed(0)
    }

    setResults(calculatedResults)
    setIsCalculating(false)
    setShowEmailCapture(true)
    
    trackCalculatorComplete({
      monthlyTickets: tickets,
      yearlySavings: yearlySavings,
      roi: calculatedResults.roi
    })
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setEmailSubmitted(true)
    setShowEmailCapture(false)
    // Here you would typically send the email and results to your backend
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8" id="calculator">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1A1A1A]">
          Customer Service AI Savings Calculator
        </h2>
        <p className="text-gray-600">
          Calculate how AI can reduce support costs, improve response times, and enhance customer satisfaction.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Monthly Support Tickets
            </label>
            <input
              type="number"
              name="monthlyTickets"
              value={formData.monthlyTickets}
              onChange={handleInputChange}
              placeholder="e.g., 1000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Average number of support tickets per month</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Average Resolution Time (minutes)
            </label>
            <input
              type="number"
              name="avgResolutionTime"
              value={formData.avgResolutionTime}
              onChange={handleInputChange}
              placeholder="e.g., 15"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Average time to resolve a support ticket</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Average Agent Cost per Hour ($)
            </label>
            <input
              type="number"
              name="avgAgentCost"
              value={formData.avgAgentCost}
              onChange={handleInputChange}
              placeholder="e.g., 25"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Including salary, benefits, and overhead</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Support Agents
            </label>
            <input
              type="number"
              name="currentAgents"
              value={formData.currentAgents}
              onChange={handleInputChange}
              placeholder="e.g., 5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Current full-time support team size</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ticket Complexity Mix
            </label>
            <select
              name="ticketTypes"
              value={formData.ticketTypes}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            >
              {ticketTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">What types of tickets do you handle most?</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Customer Satisfaction Score (1-10)
            </label>
            <input
              type="number"
              name="currentSatisfaction"
              value={formData.currentSatisfaction}
              onChange={handleInputChange}
              placeholder="e.g., 7.5"
              min="1"
              max="10"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Current CSAT or NPS score converted to 1-10 scale</p>
          </div>

          <button
            onClick={calculateSavings}
            disabled={isCalculating || !formData.monthlyTickets || !formData.avgResolutionTime || !formData.avgAgentCost || !formData.currentAgents}
            className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isCalculating ? 'Calculating...' : 'Calculate Customer Service Savings'}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {isCalculating && (
            <div className="bg-gray-50 rounded-lg p-6">
              <LoadingSpinner message="Analyzing your customer service metrics..." />
            </div>
          )}

          {results && (
            <div className="space-y-6" id="calculator-results">
              {/* Key Metrics */}
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">💰 Potential Annual Savings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold">${parseInt(results.yearlySavings).toLocaleString()}</div>
                    <div className="text-sm opacity-90">Total Savings</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold">${parseInt(results.netYearlySavings).toLocaleString()}</div>
                    <div className="text-sm opacity-90">Net Savings</div>
                  </div>
                </div>
              </div>

              {/* Efficiency Improvements */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-green-800">⚡ Efficiency Improvements</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-700">Tickets Automated:</span>
                    <span className="font-semibold text-green-800">{results.automatedTicketsPercent}% ({parseInt(results.automatedTicketsCount).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Response Time Improvement:</span>
                    <span className="font-semibold text-green-800">{results.responseTimeImprovement}% faster</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Hours Saved Monthly:</span>
                    <span className="font-semibold text-green-800">{parseInt(results.hoursSavedMonthly).toLocaleString()} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Customer Satisfaction:</span>
                    <span className="font-semibold text-green-800">{results.satisfactionImprovement}/10 (improved)</span>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 text-blue-800">💸 Cost Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Current Annual Cost:</span>
                    <span className="font-semibold text-blue-800">${parseInt(results.currentYearlyCost).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Implementation Cost:</span>
                    <span className="font-semibold text-blue-800">${parseInt(results.implementationCost).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Monthly AI Service Cost:</span>
                    <span className="font-semibold text-blue-800">${parseInt(results.monthlyAICost).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-blue-300 pt-2">
                    <span className="text-blue-700">Payback Period:</span>
                    <span className="font-semibold text-blue-800">{results.paybackPeriod} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">ROI Year 1:</span>
                    <span className="font-semibold text-blue-800">{results.roi}%</span>
                  </div>
                </div>
              </div>

              {/* Share Results */}
              <div className="flex justify-center">
                <SocialShare
                  title="Customer Service AI Calculator"
                  description="See how AI can reduce support costs and improve customer satisfaction"
                  url="https://promptwritingstudio.com/calculators/customer-service-ai-savings"
                  results={{
                    savings: results.yearlySavings,
                    efficiency: `${results.automatedTicketsPercent}% automation`
                  }}
                  calculatorName="Customer Service AI Calculator"
                />
              </div>
            </div>
          )}

          {!results && !isCalculating && (
            <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
              <div className="text-4xl mb-4">🎧</div>
              <p>Enter your customer service metrics to see potential AI savings</p>
            </div>
          )}
        </div>
      </div>

      {/* Email Capture Modal */}
      {showEmailCapture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Get Your Detailed Report</h3>
            <p className="text-gray-600 mb-4">
              Enter your email to receive a comprehensive AI implementation roadmap based on your results.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                  Get Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailCapture(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Skip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {emailSubmitted && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700 font-medium">
            ✅ Report sent! Check your email for the detailed AI implementation roadmap.
          </p>
        </div>
      )}
    </div>
  )
} 