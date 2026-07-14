import { useState } from 'react'

export default function ROICalculator() {
  const [formData, setFormData] = useState({
    hoursPerWeek: '',
    hourlyRate: '',
    taskType: ''
  })
  const [results, setResults] = useState(null)

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
  }

  const resetCalculator = () => {
    setFormData({
      hoursPerWeek: '',
      hourlyRate: '',
      taskType: ''
    })
    setResults(null)
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
        ) : (
          // Results
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

            <button
              onClick={resetCalculator}
              className="w-full text-gray-500 hover:text-gray-700 py-2"
            >
              Calculate for a different task
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
