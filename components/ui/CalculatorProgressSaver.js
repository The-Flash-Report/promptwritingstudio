import { useEffect, useState } from 'react'

export function useCalculatorProgress(calculatorName, initialFormData = {}) {
  const [formData, setFormData] = useState(initialFormData)
  const [isRestored, setIsRestored] = useState(false)
  const [showRestorePrompt, setShowRestorePrompt] = useState(false)

  const storageKey = `calculator_progress_${calculatorName.replace(/\s+/g, '_').toLowerCase()}`

  // Load saved progress on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        const savedTimestamp = new Date(parsed.timestamp)
        const now = new Date()
        const hoursSinceLastSave = (now - savedTimestamp) / (1000 * 60 * 60)

        // Only restore if saved within last 7 days
        if (hoursSinceLastSave < 168) {
          setShowRestorePrompt(true)
        } else {
          // Clear old data
          localStorage.removeItem(storageKey)
        }
      } catch (error) {
        console.warn('Failed to parse saved calculator data:', error)
        localStorage.removeItem(storageKey)
      }
    }
  }, [storageKey])

  // Auto-save form data when it changes
  useEffect(() => {
    if (isRestored && Object.keys(formData).length > 0) {
      const dataToSave = {
        formData,
        timestamp: new Date().toISOString(),
        calculatorName
      }
      localStorage.setItem(storageKey, JSON.stringify(dataToSave))
    }
  }, [formData, storageKey, isRestored, calculatorName])

  const restoreProgress = () => {
    const savedData = localStorage.getItem(storageKey)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData(parsed.formData)
        setIsRestored(true)
        setShowRestorePrompt(false)
      } catch (error) {
        console.warn('Failed to restore calculator progress:', error)
      }
    }
  }

  const clearProgress = () => {
    localStorage.removeItem(storageKey)
    setFormData(initialFormData)
    setShowRestorePrompt(false)
    setIsRestored(true)
  }

  const startFresh = () => {
    setFormData(initialFormData)
    setShowRestorePrompt(false)
    setIsRestored(true)
  }

  return {
    formData,
    setFormData,
    showRestorePrompt,
    restoreProgress,
    clearProgress,
    startFresh
  }
}

export default function CalculatorProgressSaver({ 
  showRestorePrompt, 
  onRestore, 
  onStartFresh, 
  calculatorName 
}) {
  if (!showRestorePrompt) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">💾</div>
          <h3 className="text-xl font-bold text-gray-900">Resume Previous Session?</h3>
        </div>
        
        <p className="text-gray-600 mb-6 text-center">
          We found a previous {calculatorName} session. Would you like to continue where you left off?
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onRestore}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Resume Session
          </button>
          <button
            onClick={onStartFresh}
            className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Start Fresh
          </button>
        </div>
        
        <p className="text-xs text-gray-500 text-center mt-3">
          Your progress is automatically saved as you fill out the calculator
        </p>
      </div>
    </div>
  )
}

// Progress indicator component
export function CalculatorProgressIndicator({ currentStep, totalSteps, completedFields, totalFields }) {
  const stepProgress = totalSteps ? (currentStep / totalSteps) * 100 : 0
  const fieldProgress = totalFields ? (completedFields / totalFields) * 100 : 0
  const overallProgress = Math.max(stepProgress, fieldProgress)

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm text-gray-500">{Math.round(overallProgress)}% complete</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${overallProgress}%` }}
        ></div>
      </div>
      
      {totalSteps && (
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{completedFields} of {totalFields} fields</span>
        </div>
      )}
    </div>
  )
}

// Auto-save indicator
export function AutoSaveIndicator({ lastSaved }) {
  if (!lastSaved) return null

  const timeAgo = Math.round((Date.now() - lastSaved) / 1000)
  let displayTime = 'just now'

  if (timeAgo > 60) {
    displayTime = `${Math.round(timeAgo / 60)} min ago`
  } else if (timeAgo > 5) {
    displayTime = `${timeAgo} sec ago`
  }

  return (
    <div className="flex items-center text-xs text-gray-500 mb-2">
      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
      Auto-saved {displayTime}
    </div>
  )
} 