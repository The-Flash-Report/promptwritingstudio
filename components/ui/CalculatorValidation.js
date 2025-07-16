import { useState, useEffect } from 'react'

// Custom validation hook
export function useFormValidation(formData, validationRules) {
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  const [touchedFields, setTouchedFields] = useState(new Set())

  const validateField = (fieldName, value, rules) => {
    const fieldRules = rules[fieldName]
    if (!fieldRules) return null

    // Required validation
    if (fieldRules.required && (!value || value.toString().trim() === '')) {
      return fieldRules.required.message || `${fieldName} is required`
    }

    // Number validation
    if (fieldRules.type === 'number') {
      const numValue = parseFloat(value)
      if (isNaN(numValue)) {
        return 'Please enter a valid number'
      }
      
      if (fieldRules.min !== undefined && numValue < fieldRules.min) {
        return `Value must be at least ${fieldRules.min}`
      }
      
      if (fieldRules.max !== undefined && numValue > fieldRules.max) {
        return `Value must be no more than ${fieldRules.max}`
      }
    }

    // Email validation
    if (fieldRules.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
    }

    // Custom validation function
    if (fieldRules.validate && typeof fieldRules.validate === 'function') {
      const customError = fieldRules.validate(value, formData)
      if (customError) return customError
    }

    return null
  }

  const validateForm = () => {
    const newErrors = {}
    let formIsValid = true

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName], validationRules)
      if (error) {
        newErrors[fieldName] = error
        formIsValid = false
      }
    })

    setErrors(newErrors)
    setIsValid(formIsValid)
    return formIsValid
  }

  const validateSingleField = (fieldName, value) => {
    const error = validateField(fieldName, value, validationRules)
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }))
    
    setTouchedFields(prev => new Set([...prev, fieldName]))
    return !error
  }

  const clearFieldError = (fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      validateForm()
    }
  }, [formData])

  return {
    errors,
    isValid,
    validateForm,
    validateSingleField,
    clearFieldError,
    touchedFields,
    setTouchedFields
  }
}

// Smart form field component with validation
export function ValidatedInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  min = null,
  max = null,
  step = null,
  helpText = null,
  error = null,
  showTooltip = false,
  tooltip = null,
  formatter = null,
  parser = null
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [showTooltipState, setShowTooltipState] = useState(false)

  const inputId = `input-${name}`
  const errorId = `error-${name}`
  const helpId = `help-${name}`

  const handleChange = (e) => {
    let newValue = e.target.value
    
    // Apply parser if provided (e.g., remove currency symbols)
    if (parser && typeof parser === 'function') {
      newValue = parser(newValue)
    }
    
    onChange({ target: { name, value: newValue } })
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    if (onBlur) {
      onBlur(e)
    }
  }

  const displayValue = formatter && value ? formatter(value) : value

  return (
    <div className="space-y-2 relative">
      <div className="flex items-center gap-2">
        <label 
          htmlFor={inputId}
          className="block text-sm font-semibold text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
        </label>
        
        {showTooltip && tooltip && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTooltipState(true)}
              onMouseLeave={() => setShowTooltipState(false)}
              onFocus={() => setShowTooltipState(true)}
              onBlur={() => setShowTooltipState(false)}
              className="w-4 h-4 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center hover:bg-gray-500"
              aria-label="Help"
            >
              ?
            </button>
            
            {showTooltipState && (
              <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-10">
                {tooltip}
                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={type}
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          aria-describedby={`${helpText ? helpId : ''} ${error ? errorId : ''}`.trim()}
          aria-invalid={error ? 'true' : 'false'}
          className={`w-full px-4 py-3 border rounded-lg text-lg transition-all duration-200
            ${error 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : isFocused 
                ? 'border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' 
                : 'border-gray-300 hover:border-gray-400'
            }
          `}
        />
        
        {/* Validation indicator */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {error && (
            <div className="text-red-500 text-xl" aria-label="Error">⚠️</div>
          )}
          {!error && value && (
            <div className="text-green-500 text-xl" aria-label="Valid">✅</div>
          )}
        </div>
      </div>
      
      {helpText && !error && (
        <p id={helpId} className="text-xs text-gray-500">
          {helpText}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-xs text-red-600 flex items-center gap-1" role="alert">
          <span>⚠️</span>
          {error}
        </p>
      )}
    </div>
  )
}

// Error boundary component for calculator errors
export class CalculatorErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Calculator Error:', error, errorInfo)
    
    // Track error in analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'calculator_error', {
        event_category: 'Error',
        event_label: this.props.calculatorName,
        error_message: error.message
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">❌</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Calculator Error
          </h3>
          <p className="text-red-600 mb-4">
            Something went wrong with the calculator. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Validation rules generator
export const createValidationRules = (calculatorType) => {
  const commonRules = {
    email: {
      type: 'email',
      required: { message: 'Email is required for results' }
    }
  }

  const typeSpecificRules = {
    'roi-calculator': {
      hoursPerWeek: {
        type: 'number',
        required: { message: 'Hours per week is required' },
        min: 0.1,
        max: 168,
        validate: (value) => {
          if (value > 80) return 'Consider if this is realistic for sustainable work'
          return null
        }
      },
      hourlyRate: {
        type: 'number',
        required: { message: 'Hourly rate is required' },
        min: 1,
        max: 1000,
        validate: (value) => {
          if (value < 10) return 'Hourly rate seems low - double check this value'
          return null
        }
      }
    },
    'customer-service': {
      monthlyTickets: {
        type: 'number',
        required: { message: 'Monthly tickets is required' },
        min: 1,
        max: 100000
      },
      avgResolutionTime: {
        type: 'number',
        required: { message: 'Average resolution time is required' },
        min: 1,
        max: 480
      },
      avgAgentCost: {
        type: 'number',
        required: { message: 'Agent cost is required' },
        min: 10,
        max: 200
      },
      currentAgents: {
        type: 'number',
        required: { message: 'Number of agents is required' },
        min: 1,
        max: 1000
      }
    }
  }

  return {
    ...commonRules,
    ...(typeSpecificRules[calculatorType] || {})
  }
}

// Input formatters and parsers
export const formatters = {
  currency: (value) => {
    if (!value) return ''
    const num = parseFloat(value)
    return isNaN(num) ? value : `$${num.toLocaleString()}`
  },
  
  percentage: (value) => {
    if (!value) return ''
    const num = parseFloat(value)
    return isNaN(num) ? value : `${num}%`
  },
  
  hours: (value) => {
    if (!value) return ''
    const num = parseFloat(value)
    return isNaN(num) ? value : `${num} hrs`
  }
}

export const parsers = {
  currency: (value) => {
    return value.replace(/[$,\s]/g, '')
  },
  
  percentage: (value) => {
    return value.replace(/[%\s]/g, '')
  },
  
  hours: (value) => {
    return value.replace(/[hrs\s]/g, '')
  }
} 