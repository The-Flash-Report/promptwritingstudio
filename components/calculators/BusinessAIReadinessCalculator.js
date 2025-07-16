import { useState } from 'react'
import { useCalculatorTracking } from '../ui/CalculatorAnalytics'
import SocialShare from '../ui/SocialShare'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function BusinessAIReadinessCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Business Basics
    companySize: '',
    industry: '',
    annualRevenue: '',
    
    // Data & Technology
    dataQuality: '',
    systemsIntegration: '',
    cloudAdoption: '',
    techTeamSize: '',
    
    // Strategic Readiness
    aiStrategy: '',
    leadershipBuyIn: '',
    budgetAllocation: '',
    timeframe: '',
    
    // Operational Readiness
    processDocumentation: '',
    changeManagement: '',
    trainingCulture: '',
    riskTolerance: '',
    
    // Current AI Usage
    currentAIUsage: '',
    automationLevel: '',
    vendorExperience: '',
    
    email: ''
  })
  const [results, setResults] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const { trackCalculatorStart, trackCalculatorComplete, trackCTAClick } = useCalculatorTracking('Business AI Readiness Calculator')

  const totalSteps = 5

  const assessmentQuestions = {
    1: {
      title: "Business Foundation",
      questions: [
        {
          key: 'companySize',
          label: 'Company Size',
          type: 'select',
          options: [
            { value: 'startup', label: 'Startup (1-10 employees)', score: 8 },
            { value: 'small', label: 'Small Business (11-50 employees)', score: 9 },
            { value: 'medium', label: 'Medium Business (51-200 employees)', score: 10 },
            { value: 'large', label: 'Large Enterprise (200+ employees)', score: 7 }
          ]
        },
        {
          key: 'industry',
          label: 'Industry Sector',
          type: 'select',
          options: [
            { value: 'tech', label: 'Technology/Software', score: 10 },
            { value: 'ecommerce', label: 'E-commerce/Retail', score: 9 },
            { value: 'healthcare', label: 'Healthcare', score: 8 },
            { value: 'finance', label: 'Finance/Banking', score: 9 },
            { value: 'manufacturing', label: 'Manufacturing', score: 7 },
            { value: 'education', label: 'Education', score: 6 },
            { value: 'consulting', label: 'Consulting/Services', score: 8 },
            { value: 'other', label: 'Other', score: 6 }
          ]
        },
        {
          key: 'annualRevenue',
          label: 'Annual Revenue',
          type: 'select',
          options: [
            { value: 'under1m', label: 'Under $1M', score: 6 },
            { value: '1m-10m', label: '$1M - $10M', score: 8 },
            { value: '10m-100m', label: '$10M - $100M', score: 10 },
            { value: 'over100m', label: 'Over $100M', score: 9 }
          ]
        }
      ]
    },
    2: {
      title: "Data & Technology Infrastructure",
      questions: [
        {
          key: 'dataQuality',
          label: 'How would you rate your data quality and organization?',
          type: 'select',
          options: [
            { value: 'excellent', label: 'Excellent - Clean, organized, easily accessible', score: 10 },
            { value: 'good', label: 'Good - Mostly organized with some cleanup needed', score: 8 },
            { value: 'fair', label: 'Fair - Data exists but needs significant organization', score: 5 },
            { value: 'poor', label: 'Poor - Data is scattered and unorganized', score: 2 }
          ]
        },
        {
          key: 'systemsIntegration',
          label: 'How well integrated are your business systems?',
          type: 'select',
          options: [
            { value: 'fully', label: 'Fully integrated with APIs and data flow', score: 10 },
            { value: 'mostly', label: 'Mostly integrated with some manual processes', score: 7 },
            { value: 'partially', label: 'Partially integrated, many silos exist', score: 4 },
            { value: 'isolated', label: 'Systems are mostly isolated', score: 2 }
          ]
        },
        {
          key: 'cloudAdoption',
          label: 'Current cloud adoption level',
          type: 'select',
          options: [
            { value: 'cloud-native', label: 'Cloud-native, fully in the cloud', score: 10 },
            { value: 'hybrid', label: 'Hybrid approach with cloud and on-premise', score: 8 },
            { value: 'migrating', label: 'Currently migrating to cloud', score: 6 },
            { value: 'on-premise', label: 'Primarily on-premise infrastructure', score: 3 }
          ]
        },
        {
          key: 'techTeamSize',
          label: 'Technical team capabilities',
          type: 'select',
          options: [
            { value: 'strong', label: 'Strong internal tech team with AI experience', score: 10 },
            { value: 'adequate', label: 'Adequate tech team, some AI knowledge', score: 7 },
            { value: 'limited', label: 'Limited tech team, minimal AI experience', score: 4 },
            { value: 'outsourced', label: 'Mostly outsourced tech work', score: 5 }
          ]
        }
      ]
    },
    3: {
      title: "Strategic Readiness",
      questions: [
        {
          key: 'aiStrategy',
          label: 'Do you have a defined AI strategy?',
          type: 'select',
          options: [
            { value: 'comprehensive', label: 'Comprehensive strategy with clear roadmap', score: 10 },
            { value: 'basic', label: 'Basic strategy, exploring opportunities', score: 7 },
            { value: 'informal', label: 'Informal discussions about AI potential', score: 4 },
            { value: 'none', label: 'No formal AI strategy yet', score: 1 }
          ]
        },
        {
          key: 'leadershipBuyIn',
          label: 'Leadership support for AI initiatives',
          type: 'select',
          options: [
            { value: 'champion', label: 'Leadership actively champions AI adoption', score: 10 },
            { value: 'supportive', label: 'Generally supportive of AI exploration', score: 8 },
            { value: 'neutral', label: 'Neutral, open to business case', score: 5 },
            { value: 'skeptical', label: 'Skeptical about AI value proposition', score: 2 }
          ]
        },
        {
          key: 'budgetAllocation',
          label: 'Budget allocated for AI initiatives',
          type: 'select',
          options: [
            { value: 'dedicated', label: 'Dedicated AI budget with clear allocation', score: 10 },
            { value: 'flexible', label: 'Flexible budget, funds available for right projects', score: 8 },
            { value: 'limited', label: 'Limited budget, need strong ROI justification', score: 5 },
            { value: 'none', label: 'No specific budget allocated', score: 2 }
          ]
        },
        {
          key: 'timeframe',
          label: 'Timeline for AI implementation',
          type: 'select',
          options: [
            { value: 'immediate', label: 'Ready to start immediately', score: 10 },
            { value: 'short', label: '3-6 months preparation time', score: 8 },
            { value: 'medium', label: '6-12 months planning phase', score: 6 },
            { value: 'long', label: 'Long-term consideration (1+ years)', score: 3 }
          ]
        }
      ]
    },
    4: {
      title: "Operational Readiness",
      questions: [
        {
          key: 'processDocumentation',
          label: 'How well documented are your business processes?',
          type: 'select',
          options: [
            { value: 'excellent', label: 'Thoroughly documented and standardized', score: 10 },
            { value: 'good', label: 'Well documented with minor gaps', score: 8 },
            { value: 'basic', label: 'Basic documentation exists', score: 5 },
            { value: 'poor', label: 'Minimal documentation, process knowledge in heads', score: 2 }
          ]
        },
        {
          key: 'changeManagement',
          label: 'Organizational change management capability',
          type: 'select',
          options: [
            { value: 'excellent', label: 'Excellent track record with change initiatives', score: 10 },
            { value: 'good', label: 'Generally good at implementing changes', score: 8 },
            { value: 'fair', label: 'Mixed success with organizational changes', score: 5 },
            { value: 'poor', label: 'Struggle with change adoption', score: 2 }
          ]
        },
        {
          key: 'trainingCulture',
          label: 'Learning and training culture',
          type: 'select',
          options: [
            { value: 'strong', label: 'Strong learning culture, regular training', score: 10 },
            { value: 'moderate', label: 'Moderate focus on learning and development', score: 7 },
            { value: 'limited', label: 'Limited formal training programs', score: 4 },
            { value: 'minimal', label: 'Minimal investment in employee development', score: 2 }
          ]
        },
        {
          key: 'riskTolerance',
          label: 'Risk tolerance for new technology adoption',
          type: 'select',
          options: [
            { value: 'high', label: 'High - Comfortable being early adopter', score: 10 },
            { value: 'moderate', label: 'Moderate - Willing to try proven solutions', score: 8 },
            { value: 'low', label: 'Low - Prefer to wait for market maturity', score: 4 },
            { value: 'very-low', label: 'Very Low - Only adopt when absolutely necessary', score: 2 }
          ]
        }
      ]
    },
    5: {
      title: "Current AI & Automation Experience",
      questions: [
        {
          key: 'currentAIUsage',
          label: 'Current use of AI tools or services',
          type: 'select',
          options: [
            { value: 'advanced', label: 'Using multiple AI tools across departments', score: 10 },
            { value: 'moderate', label: 'Using some AI tools (ChatGPT, etc.)', score: 7 },
            { value: 'minimal', label: 'Minimal AI tool usage', score: 4 },
            { value: 'none', label: 'No current AI usage', score: 1 }
          ]
        },
        {
          key: 'automationLevel',
          label: 'Current level of business process automation',
          type: 'select',
          options: [
            { value: 'high', label: 'High - Many processes automated', score: 10 },
            { value: 'moderate', label: 'Moderate - Some key processes automated', score: 7 },
            { value: 'low', label: 'Low - Basic automation in place', score: 4 },
            { value: 'manual', label: 'Mostly manual processes', score: 2 }
          ]
        },
        {
          key: 'vendorExperience',
          label: 'Experience working with technology vendors',
          type: 'select',
          options: [
            { value: 'extensive', label: 'Extensive experience with tech implementations', score: 10 },
            { value: 'moderate', label: 'Some experience with vendor partnerships', score: 7 },
            { value: 'limited', label: 'Limited vendor management experience', score: 4 },
            { value: 'none', label: 'No formal vendor management experience', score: 2 }
          ]
        }
      ]
    }
  }

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    })
  }

  const calculateReadinessScore = async () => {
    setIsCalculating(true)
    trackCalculatorStart()
    
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    let totalScore = 0
    let maxPossibleScore = 0
    const categoryScores = {}

    // Calculate scores for each category
    Object.keys(assessmentQuestions).forEach(stepKey => {
      const step = assessmentQuestions[stepKey]
      let categoryScore = 0
      let categoryMaxScore = 0
      
      step.questions.forEach(question => {
        const selectedValue = formData[question.key]
        const selectedOption = question.options.find(opt => opt.value === selectedValue)
        
        if (selectedOption) {
          categoryScore += selectedOption.score
        }
        categoryMaxScore += 10 // Max score per question
      })
      
      categoryScores[step.title] = {
        score: categoryScore,
        maxScore: categoryMaxScore,
        percentage: Math.round((categoryScore / categoryMaxScore) * 100)
      }
      
      totalScore += categoryScore
      maxPossibleScore += categoryMaxScore
    })

    const overallScore = Math.round((totalScore / maxPossibleScore) * 100)
    
    // Determine readiness level and recommendations
    let readinessLevel, levelColor, recommendations, nextSteps, timeframe

    if (overallScore >= 80) {
      readinessLevel = "High - Ready for AI Implementation"
      levelColor = "text-green-600"
      timeframe = "0-3 months"
      recommendations = [
        "Begin with pilot AI projects in high-impact areas",
        "Establish AI governance and ethics guidelines",
        "Scale successful AI initiatives across departments",
        "Invest in advanced AI training for your team"
      ]
      nextSteps = [
        "Define specific AI use cases and success metrics",
        "Select AI vendor partners or internal development approach",
        "Create detailed implementation timeline",
        "Establish measurement and optimization processes"
      ]
    } else if (overallScore >= 60) {
      readinessLevel = "Medium - Prepare for AI Implementation"
      levelColor = "text-yellow-600"
      timeframe = "3-6 months"
      recommendations = [
        "Improve data quality and organization",
        "Enhance system integration capabilities",
        "Develop AI strategy and get leadership alignment",
        "Start with simple AI tools to build experience"
      ]
      nextSteps = [
        "Audit and improve data infrastructure",
        "Create formal AI strategy document",
        "Begin team AI literacy training",
        "Identify and prioritize AI use cases"
      ]
    } else if (overallScore >= 40) {
      readinessLevel = "Low - Foundation Building Required"
      levelColor = "text-orange-600"
      timeframe = "6-12 months"
      recommendations = [
        "Focus on data collection and organization",
        "Improve business process documentation",
        "Build internal technical capabilities",
        "Start with basic automation before AI"
      ]
      nextSteps = [
        "Implement data management systems",
        "Document and standardize key processes",
        "Invest in team training and capability building",
        "Explore simple automation opportunities"
      ]
    } else {
      readinessLevel = "Very Low - Significant Preparation Needed"
      levelColor = "text-red-600"
      timeframe = "12+ months"
      recommendations = [
        "Establish basic data collection practices",
        "Invest in foundational technology infrastructure",
        "Build organizational change management capabilities",
        "Focus on manual process optimization first"
      ]
      nextSteps = [
        "Conduct comprehensive technology and process audit",
        "Develop 2-3 year digital transformation roadmap",
        "Secure leadership commitment and budget",
        "Start with basic digitization of manual processes"
      ]
    }

    const calculatedResults = {
      overallScore,
      readinessLevel,
      levelColor,
      timeframe,
      recommendations,
      nextSteps,
      categoryScores,
      totalScore,
      maxPossibleScore
    }

    setResults(calculatedResults)
    setIsCalculating(false)
    setShowEmailCapture(true)
    
    trackCalculatorComplete({
      overallScore,
      readinessLevel,
      categories: Object.keys(categoryScores).length
    })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateReadinessScore()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepComplete = () => {
    const currentQuestions = assessmentQuestions[currentStep]?.questions || []
    return currentQuestions.every(question => formData[question.key])
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    setEmailSubmitted(true)
    setShowEmailCapture(false)
  }

  if (results) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8" id="calculator-results">
        {/* Results Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-[#1A1A1A]">
            Your AI Readiness Score
          </h2>
          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-6 text-white">
            <div className="text-6xl font-bold mb-2">{results.overallScore}</div>
            <div className="text-xl">out of 100</div>
            <div className={`text-2xl font-semibold mt-2 ${results.levelColor.replace('text-', 'text-white')}`}>
              {results.readinessLevel}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">Category Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(results.categoryScores).map(([category, data], index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">{category}</span>
                  <span className="text-lg font-bold text-blue-600">{data.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${data.percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {data.score} out of {data.maxScore} points
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Timeline */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3 text-blue-800">⏱️ Recommended Timeline</h3>
          <p className="text-blue-700">
            Based on your readiness score, we recommend beginning AI implementation in <strong>{results.timeframe}</strong>.
          </p>
        </div>

        {/* Recommendations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-green-800">✅ Recommendations</h3>
            <ul className="space-y-2">
              {results.recommendations.map((rec, index) => (
                <li key={index} className="text-green-700 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="text-lg font-bold mb-4 text-orange-800">🚀 Next Steps</h3>
            <ol className="space-y-2">
              {results.nextSteps.map((step, index) => (
                <li key={index} className="text-orange-700 flex items-start">
                  <span className="text-orange-500 mr-2 font-bold">{index + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Share Results */}
        <div className="text-center mb-6">
          <SocialShare
            title="Business AI Readiness Assessment"
            description={`I scored ${results.overallScore}/100 on my AI readiness assessment!`}
            url="https://promptwritingstudio.com/calculators/business-ai-readiness"
            results={{
              score: results.overallScore,
              level: results.readinessLevel
            }}
            calculatorName="Business AI Readiness Calculator"
          />
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold mb-3 text-[#1A1A1A]">Ready to Start Your AI Journey?</h3>
          <p className="text-gray-600 mb-4">
            Get personalized guidance on implementing AI in your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
              onClick={() => trackCTAClick('course_purchase')}
              className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Prompt Writing Studio
            </a>
            <a
              href="/calculators/ai-cost-comparison"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Calculate AI ROI
            </a>
          </div>
        </div>

        {/* Retake Assessment */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setResults(null)
              setCurrentStep(1)
              setFormData({})
            }}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-8" id="calculator">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
            Business AI Readiness Assessment
          </h2>
          <div className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
        
        <p className="text-gray-600">
          Assess your organization's readiness for AI implementation across key dimensions.
        </p>
      </div>

      {isCalculating ? (
        <div className="text-center py-12">
          <LoadingSpinner message="Analyzing your AI readiness across all dimensions..." />
        </div>
      ) : (
        <>
          {/* Current Step Questions */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-6 text-[#1A1A1A]">
              {assessmentQuestions[currentStep]?.title}
            </h3>
            
            <div className="space-y-6">
              {assessmentQuestions[currentStep]?.questions.map((question, index) => (
                <div key={index}>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    {question.label}
                  </label>
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name={question.key}
                          value={option.value}
                          checked={formData[question.key] === option.value}
                          onChange={(e) => handleInputChange(question.key, e.target.value)}
                          className="mt-1 mr-3 text-red-500 focus:ring-red-500"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {currentStep === totalSteps ? 'Calculate Readiness Score' : 'Next'}
            </button>
          </div>
        </>
      )}

      {/* Email Capture Modal */}
      {showEmailCapture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4 my-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Get Your Free AI Implementation Roadmap
            </h3>
            <p className="text-gray-600 mb-6">
              Download a personalized AI implementation plan based on your readiness score, including specific tools, timelines, and ROI projections.
            </p>
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Get Free Roadmap
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmailCapture(false)}
                  className="px-4 py-3 text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {emailSubmitted && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700 font-medium">
            ✅ Roadmap sent! Check your email for your personalized AI implementation guide.
          </p>
        </div>
      )}
    </div>
  )
} 