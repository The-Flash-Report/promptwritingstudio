import { useEffect, useState } from 'react'

export default function CalculatorAccessibility({ 
  currentStep, 
  totalSteps, 
  isCalculating, 
  hasResults,
  calculatorName 
}) {
  const [announcements, setAnnouncements] = useState('')

  useEffect(() => {
    // Announce step changes to screen readers
    if (currentStep && totalSteps) {
      setAnnouncements(`Step ${currentStep} of ${totalSteps}`)
    }
  }, [currentStep, totalSteps])

  useEffect(() => {
    // Announce calculation states
    if (isCalculating) {
      setAnnouncements('Calculating results, please wait...')
    } else if (hasResults) {
      setAnnouncements('Calculation complete. Results are now available.')
    }
  }, [isCalculating, hasResults])

  return (
    <>
      {/* Screen Reader Announcements */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        role="status"
      >
        {announcements}
      </div>

      {/* Skip Navigation */}
      <a 
        href="#calculator-results" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to Results
      </a>

      {/* Calculator Progress for Screen Readers */}
      {currentStep && totalSteps && (
        <div className="sr-only">
          <h2>Calculator Progress</h2>
          <p>Currently on step {currentStep} of {totalSteps} steps in the {calculatorName}.</p>
        </div>
      )}
    </>
  )
}

// Enhanced Input Component with Accessibility
export function AccessibleInput({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error = null,
  helpText = null,
  min = null,
  max = null,
  step = null
}) {
  const inputId = `input-${name}`
  const errorId = `error-${name}`
  const helpId = `help-${name}`

  return (
    <div className="space-y-2">
      <label 
        htmlFor={inputId}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
        `}
      />
      
      {helpText && (
        <p id={helpId} className="text-xs text-gray-500">
          {helpText}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Enhanced Select Component with Accessibility
export function AccessibleSelect({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [],
  required = false,
  error = null,
  helpText = null
}) {
  const selectId = `select-${name}`
  const errorId = `error-${name}`
  const helpId = `help-${name}`

  return (
    <div className="space-y-2">
      <label 
        htmlFor={selectId}
        className="block text-sm font-semibold text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
        `}
      >
        <option value="">Choose an option...</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helpText && (
        <p id={helpId} className="text-xs text-gray-500">
          {helpText}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
} 