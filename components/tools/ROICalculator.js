import { useState } from 'react'

export default function ROICalculator() {
  const [formData, setFormData] = useState({
    hoursPerWeek: '',
    hourlyRate: '',
    taskType: '',
    email: ''
  })
  const [results, setResults] = useState(null)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const taskTypes = [
    { value: 'content-creation', label: 'Content Creation', timeSaved: 0.7 },
    { value: 'customer-service', label: 'Customer Service', timeSaved: 0.6 },
    { value: 'email-marketing', label: 'Email Marketing', timeSaved: 0.8 },
    { value: 'social-media', label: 'Social Media Management', timeSaved: 0.75 },
    { value: 'data-analysis', label: 'Data Analysis & Reporting', timeSaved: 0.65 },
    { value: 'product-descriptions', label: 'Product Descriptions', timeSaved: 0.85 },
    { value: 'customer-communications', label: 'Customer Communications', timeSaved: 0.7 },
    { value: 'research', label: 'Research & Planning', timeSaved: 0.6 },
    { value: 'other', label: 'Other Business Tasks', timeSaved: 0.5 }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const calculateROI = () => {
    const hours = parseFloat(formData.hoursPerWeek)
    const rate = parseFloat(formData.hourlyRate)
    const selectedTask = taskTypes.find(task => task.value === formData.taskType)
    
    if (!hours || !rate || !selectedTask) return

    const timeSavedPercent = selectedTask.timeSaved
    const hoursSevedPerWeek = hours * timeSavedPercent
    const weeklySavings = hoursSevedPerWeek * rate
    const monthlySavings = weeklySavings * 4.33 // Average weeks per month
    const yearlySavings = monthlySavings * 12

    const calculatedResults = {
      hoursSevedPerWeek: hoursSevedPerWeek.toFixed(1),
      weeklySavings: weeklySavings.toFixed(0),
      monthlySavings: monthlySavings.toFixed(0),
      yearlySavings: yearlySavings.toFixed(0),
      timeSavedPercent: (timeSavedPercent * 100).toFixed(0),
      taskType: selectedTask.label
    }

    setResults(calculatedResults)
    setShowEmailCapture(true)
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    
    // TODO: Integration with email service (ConvertKit/Mailchimp)
    console.log('Email submitted:', formData.email, 'Results:', results)
    
    // For now, just show success message
    setEmailSubmitted(true)
    
    // In real implementation, you would:
    // 1. Send email to your email service
    // 2. Generate and send PDF report
    // 3. Add to email sequence
    // 4. Track conversion in analytics
  }

  const resetCalculator = () => {
    setFormData({
      hoursPerWeek: '',
      hourlyRate: '',
      taskType: '',
      email: ''
    })
    setResults(null)
    setShowEmailCapture(false)
    setEmailSubmitted(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-[#FFDE59] to-[#F0D000] p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          AI ROI Calculator
        </h2>
        <p className="text-[#1A1A1A] text-lg">
          Discover how much time and money you could save with AI automation
        </p>
      </div>

      <div className="p-6 md:p-8">
        {!results ? (
          // Initial Calculator Form
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                How many hours per week do you spend on this task?
              </label>
              <input
                type="number"
                name="hoursPerWeek"
                value={formData.hoursPerWeek}
                onChange={handleInputChange}
                placeholder="e.g., 10"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                What's your hourly rate (or hourly cost for this work)?
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  placeholder="50"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-transparent"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Include your time value or what you pay contractors/employees
              </p>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                What type of task is this?
              </label>
              <select
                name="taskType"
                value={formData.taskType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-transparent"
              >
                <option value="">Select a task type...</option>
                {taskTypes.map(task => (
                  <option key={task.value} value={task.value}>
                    {task.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={calculateROI}
              disabled={!formData.hoursPerWeek || !formData.hourlyRate || !formData.taskType}
              className="w-full bg-[#FFDE59] text-[#1A1A1A] py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Calculate My Savings
            </button>
          </div>
        ) : !emailSubmitted ? (
          // Results + Email Capture
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">
                Your AI Automation Savings Potential
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-[#F9F9F9] p-4 rounded-lg border">
                  <div className="text-3xl font-bold text-[#1A1A1A]">
                    {results.hoursSevedPerWeek}
                  </div>
                  <div className="text-sm text-gray-600">Hours Saved/Week</div>
                </div>
                <div className="bg-[#F9F9F9] p-4 rounded-lg border">
                  <div className="text-3xl font-bold text-green-600">
                    ${results.monthlySavings}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Savings</div>
                </div>
                <div className="bg-[#FFDE59] p-4 rounded-lg border">
                  <div className="text-3xl font-bold text-[#1A1A1A]">
                    ${results.yearlySavings}
                  </div>
                  <div className="text-sm text-[#1A1A1A]">Yearly Savings</div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-800">
                  <strong>AI can save you {results.timeSavedPercent}% of the time</strong> you currently spend on {results.taskType.toLowerCase()}, 
                  freeing up <strong>{results.hoursSevedPerWeek} hours per week</strong> for higher-value activities.
                </p>
              </div>
            </div>

            {!showEmailCapture ? (
              <button
                onClick={() => setShowEmailCapture(true)}
                className="w-full bg-[#FFDE59] text-[#1A1A1A] py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Get Detailed Report & Action Plan
              </button>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <h4 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                    Get Your Personalized AI Implementation Plan
                  </h4>
                  <p className="text-gray-600">
                    Enter your email to receive a detailed report with specific prompts and strategies for your business.
                  </p>
                </div>
                
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-transparent"
                />
                
                <button
                  type="submit"
                  className="w-full bg-[#1A1A1A] text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Send My Free Report
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  We'll also send you weekly AI automation tips. Unsubscribe anytime.
                </p>
              </form>
            )}

            <button
              onClick={resetCalculator}
              className="w-full text-gray-500 hover:text-gray-700 py-2"
            >
              Calculate for a different task →
            </button>
          </div>
        ) : (
          // Success State
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                Check Your Email!
              </h3>
              <p className="text-gray-600 mb-4">
                We've sent your personalized AI implementation report to <strong>{formData.email}</strong>
              </p>
              <p className="text-gray-600 mb-6">
                Your potential yearly savings: <span className="text-2xl font-bold text-green-600">${results.yearlySavings}</span>
              </p>
            </div>

            <div className="bg-[#F9F9F9] p-6 rounded-lg">
              <h4 className="font-semibold text-[#1A1A1A] mb-3">
                Ready to start saving time and money?
              </h4>
              <p className="text-gray-600 mb-4">
                Our PromptWritingStudio course shows you exactly how to implement these AI automations in your business.
              </p>
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Learning Now
              </a>
            </div>

            <button
              onClick={resetCalculator}
              className="w-full text-gray-500 hover:text-gray-700 py-2"
            >
              Calculate for another task →
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 