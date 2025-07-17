import { useState } from 'react'

export default function AICalculatorExplainer({ 
  calculatorType, 
  results, 
  inputs, 
  onExplanationGenerated 
}) {
  const [explanation, setExplanation] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [error, setError] = useState('')

  const generateExplanation = async () => {
    setIsGenerating(true)
    setError('')
    
    try {
      const prompt = createExplanationPrompt(calculatorType, results, inputs)
      
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          model: 'claude'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate explanation')
      }

      const data = await response.json()
      const generatedExplanation = data.response
      
      setExplanation(generatedExplanation)
      setShowExplanation(true)
      
      if (onExplanationGenerated) {
        onExplanationGenerated(generatedExplanation)
      }
      
    } catch (error) {
      console.error('AI explanation error:', error)
      setError('Unable to generate AI explanation. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const createExplanationPrompt = (type, results, inputs) => {
    const basePrompt = `You are an AI business consultant helping users understand their calculator results and create actionable implementation plans.

Calculator Type: ${type}
User Inputs: ${JSON.stringify(inputs, null, 2)}
Results: ${JSON.stringify(results, null, 2)}

Please provide:
1. A clear explanation of what these results mean for their business
2. A specific 90-day implementation roadmap with actionable steps
3. Potential challenges they might face and how to overcome them
4. ROI optimization tips specific to their situation
5. Next steps they should take immediately

Keep the tone professional but encouraging. Format the response with clear sections and bullet points for readability. Focus on practical, actionable advice they can implement right away.

Make this personal to their specific inputs and results - don't give generic advice.`

    // Add calculator-specific context
    const contextPrompts = {
      'content-speed': 'Focus on content creation workflows, AI tool recommendations, and scaling content production efficiently.',
      'ecommerce-ai': 'Emphasize e-commerce automation, customer experience improvements, and revenue optimization strategies.',
      'business-readiness': 'Highlight AI adoption strategies, team training needs, and competitive advantage opportunities.',
      'customer-service': 'Focus on customer satisfaction improvements, cost reduction strategies, and automation implementation.',
      'cost-comparison': 'Emphasize ROI maximization, tool selection guidance, and cost optimization strategies.'
    }

    return basePrompt + '\n\n' + (contextPrompts[type] || 'Provide industry-specific recommendations based on the calculator results.')
  }

  if (!showExplanation && !isGenerating) {
    return (
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-full">
              <span className="text-xl">🧠</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Get AI-Powered Action Plan</h3>
              <p className="text-sm text-gray-600">
                Get personalized recommendations and a 90-day implementation roadmap
              </p>
            </div>
          </div>
          <button
            onClick={generateExplanation}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 transition-colors"
          >
            <span>✨</span>
            Generate Plan
          </button>
        </div>
      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
          <h3 className="font-semibold text-gray-900">AI is analyzing your results...</h3>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p>🔍 Analyzing your specific business situation</p>
          <p>📊 Creating personalized recommendations</p>
          <p>🚀 Building your 90-day action plan</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-center gap-2 text-red-700">
          <span>⚠️</span>
          <p>{error}</p>
          <button 
            onClick={generateExplanation}
            className="ml-auto text-red-600 hover:text-red-800 underline"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-full">
          <span className="text-xl">🧠</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI-Powered Action Plan</h3>
          <p className="text-sm text-gray-600">Personalized for your business situation</p>
        </div>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <div 
          className="whitespace-pre-wrap text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: explanation.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
          }}
        />
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            AI-generated recommendations • Powered by Claude
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowExplanation(false)}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Hide
            </button>
            <button
              onClick={generateExplanation}
              className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200"
            >
              Regenerate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 