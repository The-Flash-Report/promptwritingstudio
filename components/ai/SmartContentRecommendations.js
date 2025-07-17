import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SmartContentRecommendations({ 
  currentPage, 
  userBehavior, 
  calculatorResults 
}) {
  const [recommendations, setRecommendations] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showRecommendations, setShowRecommendations] = useState(false)

  useEffect(() => {
    // Auto-generate recommendations when component mounts or context changes
    if (currentPage || userBehavior || calculatorResults) {
      generateRecommendations()
    }
  }, [currentPage, userBehavior, calculatorResults])

  const generateRecommendations = async () => {
    setIsGenerating(true)
    
    try {
      const context = buildContextForAI()
      const aiRecommendations = await getAIRecommendations(context)
      const structuredRecommendations = parseRecommendations(aiRecommendations)
      
      setRecommendations(structuredRecommendations)
      setShowRecommendations(true)
    } catch (error) {
      console.error('Failed to generate recommendations:', error)
      // Fallback to rule-based recommendations
      const fallbackRecommendations = getFallbackRecommendations()
      setRecommendations(fallbackRecommendations)
      setShowRecommendations(true)
    } finally {
      setIsGenerating(false)
    }
  }

  const buildContextForAI = () => {
    return {
      currentPage,
      userBehavior: userBehavior || {},
      calculatorResults: calculatorResults || {},
      availableContent: getAvailableContent(),
      businessGoals: 'increase course sales and email signups'
    }
  }

  const getAIRecommendations = async (context) => {
    const prompt = `You are a smart content recommendation engine for PromptWritingStudio. Based on user context, recommend the most relevant next actions.

Current Context:
- Page: ${context.currentPage}
- User Behavior: ${JSON.stringify(context.userBehavior)}
- Calculator Results: ${JSON.stringify(context.calculatorResults)}

Available Content/Tools:
- 5 AI Calculators: Content Speed, E-commerce AI, Business Readiness, Customer Service, Cost Comparison
- Prompt Vault ($7 product): 50+ business prompt templates
- AI Course ($25): Advanced prompt writing course
- Free Content: AI prompt examples, ChatGPT templates, AI art prompts
- AI Tools: Prompt optimizer, Live chat tester, AI agent builder

Recommend 3-4 items in this JSON format:
{
  "recommendations": [
    {
      "type": "calculator|product|content|tool",
      "title": "Clear action-oriented title",
      "description": "Why this is relevant to their situation",
      "url": "/path/to/content",
      "priority": "high|medium|low",
      "cta": "Action-oriented button text",
      "reasoning": "Why this recommendation makes sense"
    }
  ]
}

Prioritize:
1. Prompt Vault ($7) for engaged users who haven't purchased
2. Related calculators based on their interests
3. Free tools that move them toward course purchase
4. Content that addresses their specific business needs

Make recommendations feel personal and immediately actionable.`

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
      throw new Error('AI recommendation failed')
    }

    const data = await response.json()
    return data.response
  }

  const parseRecommendations = (aiResponse) => {
    try {
      // Try to extract JSON from AI response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return parsed.recommendations || []
      }
    } catch (error) {
      console.error('Failed to parse AI recommendations:', error)
    }
    
    return getFallbackRecommendations()
  }

  const getFallbackRecommendations = () => {
    // Rule-based fallback recommendations
    const fallbacks = []
    
    // Always include Prompt Vault for engaged users
    fallbacks.push({
      type: 'product',
      title: 'Get Professional Prompt Templates',
      description: 'Skip the trial and error - get 50+ proven business prompts for just $7',
      url: '/prompt-vault',
      priority: 'high',
      cta: 'Get Templates Now',
      reasoning: 'Cost-effective way to get immediate value'
    })

    // Add calculator recommendations based on current page
    if (currentPage?.includes('content')) {
      fallbacks.push({
        type: 'calculator',
        title: 'Calculate Your Content ROI',
        description: 'See how much time and money AI can save in your content creation',
        url: '/calculators/content-creation-speed',
        priority: 'medium',
        cta: 'Calculate Savings',
        reasoning: 'Related to content interests'
      })
    }

    // Add course recommendation for qualified users
    if (calculatorResults && Object.keys(calculatorResults).length > 0) {
      fallbacks.push({
        type: 'product',
        title: 'Master AI Prompt Writing',
        description: 'Take your AI results to the next level with our comprehensive course',
        url: '/pricing',
        priority: 'medium',
        cta: 'View Course',
        reasoning: 'User has engaged with calculators'
      })
    }

    return fallbacks.slice(0, 3) // Return top 3
  }

  const getAvailableContent = () => {
    return [
      { title: 'Content Speed Calculator', url: '/calculators/content-creation-speed', type: 'calculator' },
      { title: 'E-commerce AI Calculator', url: '/calculators/ecommerce-ai-savings', type: 'calculator' },
      { title: 'Business AI Readiness', url: '/calculators/business-ai-readiness', type: 'calculator' },
      { title: 'Customer Service Calculator', url: '/calculators/customer-service-ai-savings', type: 'calculator' },
      { title: 'AI Cost Comparison', url: '/calculators/ai-cost-comparison', type: 'calculator' },
      { title: 'Prompt Vault', url: '/prompt-vault', type: 'product' },
      { title: 'AI Course', url: '/pricing', type: 'course' },
      { title: 'AI Prompt Examples', url: '/ai-prompt-examples', type: 'content' },
      { title: 'ChatGPT Templates', url: '/chatgpt-templates', type: 'content' }
    ]
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-green-200 bg-green-50'
      case 'medium': return 'border-blue-200 bg-blue-50'
      case 'low': return 'border-gray-200 bg-gray-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'calculator': return '🧮'
      case 'product': return '💎'
      case 'content': return '📝'
      case 'tool': return '🔧'
      case 'course': return '🎓'
      default: return '✨'
    }
  }

  if (!showRecommendations && !isGenerating) {
    return null // Don't show anything initially
  }

  if (isGenerating) {
    return (
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          <span className="text-blue-800 font-medium">Finding personalized recommendations...</span>
        </div>
      </div>
    )
  }

  if (!recommendations || recommendations.length === 0) {
    return null
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">🎯</span>
        <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">AI-Powered</span>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)} hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{getTypeIcon(rec.type)}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                
                <div className="flex items-center justify-between">
                  <Link href={rec.url}>
                    <a className="inline-flex items-center gap-1 bg-purple-600 text-white px-3 py-2 text-sm rounded-lg hover:bg-purple-700 transition-colors">
                      {rec.cta}
                      <span>→</span>
                    </a>
                  </Link>
                  
                  {rec.priority === 'high' && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Popular
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Recommendations personalized by AI • Based on your activity and interests
        </p>
      </div>
    </div>
  )
} 