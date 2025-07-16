import { useState, useEffect } from 'react'
import LiveChatTester from './LiveChatTester'

export default function PromptOptimizer({ initialPrompt = '', onOptimizedPrompt }) {
  const [originalPrompt, setOriginalPrompt] = useState(initialPrompt)
  const [optimizedPrompt, setOptimizedPrompt] = useState('')
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationScores, setOptimizationScores] = useState(null)
  const [selectedModel, setSelectedModel] = useState('openai')
  const [optimizationSteps, setOptimizationSteps] = useState([])
  const [realTimeAnalysis, setRealTimeAnalysis] = useState(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [showChatTester, setShowChatTester] = useState(false)
  const [useRealAI, setUseRealAI] = useState(true)
  const [optimizationSettings, setOptimizationSettings] = useState({
    includeExamples: true,
    addConstraints: true,
    improveClarity: true,
    addStructure: true,
    optimizeForLength: 'medium' // short, medium, long
  })

  const models = [
    { id: 'openai', name: 'OpenAI (GPT-4)', icon: '🤖', color: 'bg-green-50 border-green-200' },
    { id: 'anthropic', name: 'Anthropic (Claude)', icon: '🧠', color: 'bg-purple-50 border-purple-200' },
    { id: 'google', name: 'Google (Gemini)', icon: '✨', color: 'bg-blue-50 border-blue-200' },
    { id: 'image', name: 'Image Generation (DALL-E/Midjourney)', icon: '🎨', color: 'bg-pink-50 border-pink-200' }
  ]

  // Enhanced optimization techniques based on latest research
  const optimizationTechniques = {
    openai: {
      patterns: [
        { name: 'Role Definition', check: /you are|act as|as a/i, weight: 20 },
        { name: 'Clear Instructions', check: /please|help|create|write|analyze/i, weight: 15 },
        { name: 'Output Format', check: /format|structure|organize|output/i, weight: 15 },
        { name: 'Examples', check: /example|for instance|such as/i, weight: 10 },
        { name: 'Constraints', check: /must|should|avoid|don\'t/i, weight: 10 }
      ],
      improvements: [
        'Add clear role definition with expertise level',
        'Include specific output format requirements', 
        'Add relevant examples to guide the AI',
        'Set clear constraints and boundaries',
        'Use step-by-step instructions for complex tasks'
      ]
    },
    anthropic: {
      patterns: [
        { name: 'XML Structure', check: /<[^>]+>/g, weight: 25 },
        { name: 'Thinking Process', check: /think|consider|analyze|reasoning/i, weight: 20 },
        { name: 'Constitutional AI', check: /helpful|harmless|honest/i, weight: 15 },
        { name: 'Clear Sections', check: /\n\n|\n###|\n\*\*/g, weight: 10 }
      ],
      improvements: [
        'Use XML tags for clear structure (<task>, <context>, <output>)',
        'Include thinking process instructions',
        'Add constitutional AI principles',
        'Structure with clear sections and headers',
        'Specify desired reasoning approach'
      ]
    },
    google: {
      patterns: [
        { name: 'Task Definition', check: /task:|goal:|objective:/i, weight: 20 },
        { name: 'Context Setting', check: /context:|background:|situation:/i, weight: 18 },
        { name: 'Output Specification', check: /output:|result:|provide:/i, weight: 15 },
        { name: 'Quality Criteria', check: /quality|accurate|detailed|comprehensive/i, weight: 12 }
      ],
      improvements: [
        'Start with clear task definition',
        'Provide comprehensive context',
        'Specify exact output requirements',
        'Include quality criteria and success metrics',
        'Add relevant domain knowledge'
      ]
    },
    image: {
      patterns: [
        { name: 'Visual Description', check: /detailed|high quality|realistic|artistic/i, weight: 20 },
        { name: 'Style Specification', check: /style|art style|aesthetic|look/i, weight: 18 },
        { name: 'Technical Parameters', check: /resolution|4k|hd|lighting|composition/i, weight: 15 },
        { name: 'Mood/Atmosphere', check: /mood|atmosphere|feeling|vibe/i, weight: 12 }
      ],
      improvements: [
        'Add specific visual style descriptors',
        'Include technical quality parameters',
        'Specify composition and framing',
        'Add mood and atmosphere details',
        'Include negative prompts to avoid unwanted elements'
      ]
    }
  }

  // Real-time analysis as user types
  useEffect(() => {
    if (originalPrompt.length > 10) {
      const analysis = analyzePromptRealTime(originalPrompt)
      setRealTimeAnalysis(analysis)
    } else {
      setRealTimeAnalysis(null)
    }
  }, [originalPrompt, selectedModel])

  // Initialize with provided prompt
  useEffect(() => {
    if (initialPrompt && initialPrompt !== originalPrompt) {
      setOriginalPrompt(initialPrompt)
    }
  }, [initialPrompt])

  // Enhanced prompt analysis with detailed scoring
  const analyzePromptRealTime = (prompt) => {
    const techniques = optimizationTechniques[selectedModel]
    const analysis = {
      scores: {
        clarity: 0,
        specificity: 0,
        structure: 0,
        completeness: 0,
        modelOptimization: 0
      },
      suggestions: [],
      warnings: [],
      wordCount: prompt.split(' ').length,
      characterCount: prompt.length,
      readabilityScore: 0
    }

    // Clarity analysis
    const clarityIndicators = ['clearly', 'specifically', 'exactly', 'precisely', 'detailed', 'step-by-step']
    const clarityScore = clarityIndicators.filter(word => 
      prompt.toLowerCase().includes(word)).length * 15
    analysis.scores.clarity = Math.min(100, clarityScore + (prompt.split('.').length > 2 ? 25 : 0))

    // Specificity analysis  
    const specificWords = ['example', 'format', 'style', 'length', 'tone', 'audience', 'goal']
    analysis.scores.specificity = Math.min(100, specificWords.filter(word => 
      prompt.toLowerCase().includes(word)).length * 12 + 20)

    // Structure analysis
    let structureScore = 0
    if (prompt.includes('\n')) structureScore += 30
    if (prompt.match(/^\d+\.|^-|^\*/gm)) structureScore += 25
    if (prompt.includes(':')) structureScore += 20
    analysis.scores.structure = Math.min(100, structureScore + 25)

    // Completeness analysis
    const completenessFactors = prompt.length > 100 ? 30 : 0
    const hasRole = /you are|act as|as a/i.test(prompt) ? 20 : 0
    const hasOutput = /output|format|provide|create/i.test(prompt) ? 25 : 0
    analysis.scores.completeness = Math.min(100, completenessFactors + hasRole + hasOutput + 25)

    // Model-specific optimization
    let modelScore = 0
    techniques.patterns.forEach(pattern => {
      if (pattern.check.test(prompt)) {
        modelScore += pattern.weight
      }
    })
    analysis.scores.modelOptimization = Math.min(100, modelScore)

    // Generate suggestions
    if (analysis.scores.clarity < 70) {
      analysis.suggestions.push('Add clearer instructions and specific requirements')
    }
    if (analysis.scores.structure < 60) {
      analysis.suggestions.push('Improve structure with bullet points or numbered steps')
    }
    if (analysis.scores.completeness < 70) {
      analysis.suggestions.push('Add role definition and output format specification')
    }
    if (analysis.scores.modelOptimization < 60) {
      analysis.suggestions.push(`Optimize for ${selectedModel} using specific techniques`)
    }

    // Warnings
    if (prompt.length < 50) {
      analysis.warnings.push('Prompt might be too short for complex tasks')
    }
    if (prompt.length > 2000) {
      analysis.warnings.push('Very long prompt - consider breaking into sections')
    }
    if (!prompt.includes('?') && !prompt.includes('.')) {
      analysis.warnings.push('Missing punctuation may affect clarity')
    }

    // Readability score (simplified)
    const avgWordsPerSentence = prompt.split(/[.!?]+/).reduce((acc, sentence) => 
      acc + sentence.split(' ').length, 0) / prompt.split(/[.!?]+/).length
    analysis.readabilityScore = Math.max(0, 100 - (avgWordsPerSentence - 15) * 2)

    return analysis
  }

  // Advanced prompt optimization with real AI
  const optimizePrompt = async () => {
    setIsOptimizing(true)
    setOptimizationSteps([])
    
    try {
      if (useRealAI) {
        // Real AI optimization using Claude
        const steps = [
          { step: 1, action: 'Connecting to AI optimization engine...', status: 'processing' }
        ]
        setOptimizationSteps(steps)

        const response = await fetch('/api/ai/optimize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: originalPrompt,
            targetModel: selectedModel,
            optimizationSettings
          })
        })

        if (!response.ok) {
          throw new Error(`Optimization failed: ${response.status}`)
        }

        steps[0] = { step: 1, action: 'AI optimization engine connected', status: 'completed' }
        steps.push({ step: 2, action: 'Analyzing prompt structure and clarity...', status: 'processing' })
        setOptimizationSteps([...steps])

        const result = await response.json()

        steps[1] = { step: 2, action: 'Prompt analysis completed', status: 'completed' }
        steps.push({ step: 3, action: 'Applying AI-powered improvements...', status: 'processing' })
        setOptimizationSteps([...steps])

        await delay(1000) // Simulate processing time for UX

        steps[2] = { step: 3, action: 'AI optimization completed successfully', status: 'completed' }
        setOptimizationSteps([...steps])

        // Update with AI results
        setOptimizedPrompt(result.optimized)
        
        // Create scores from AI analysis
        const aiScores = {
          clarity: result.analysis?.optimizedScore || 85,
          specificity: result.analysis?.optimizedScore || 85,
          structure: result.analysis?.optimizedScore || 85,
          completeness: result.analysis?.optimizedScore || 85,
          modelOptimization: result.analysis?.optimizedScore || 85
        }
        setOptimizationScores(aiScores)

        onOptimizedPrompt && onOptimizedPrompt(result.optimized)

      } else {
        // Fall back to original mock optimization
        await performMockOptimization()
      }
      
    } catch (error) {
      console.error('Optimization error:', error)
      setOptimizationSteps(prev => [...prev, { 
        step: prev.length + 1, 
        action: `Error: ${error.message}. Falling back to basic optimization...`, 
        status: 'error' 
      }])
      
      // Fall back to mock optimization on error
      await performMockOptimization()
    } finally {
      setIsOptimizing(false)
    }
  }

  // Mock optimization as fallback
  const performMockOptimization = async () => {
    const steps = []
    let optimized = originalPrompt.trim()

    // Step 1: Add role if missing
    steps.push({ step: 1, action: 'Analyzing role definition...', status: 'processing' })
    setOptimizationSteps([...steps])
    
    if (!optimized.match(/you are|act as|as a/i)) {
      const roleAddition = getRoleForModel(selectedModel)
      optimized = `${roleAddition} ${optimized}`
      steps[0] = { step: 1, action: 'Added expert role definition', status: 'completed' }
      setOptimizationSteps([...steps])
    } else {
      steps[0] = { step: 1, action: 'Role definition already present', status: 'completed' }
      setOptimizationSteps([...steps])
    }

    await delay(800)

    // Step 2: Improve structure
    steps.push({ step: 2, action: 'Improving structure and clarity...', status: 'processing' })
    setOptimizationSteps([...steps])

    if (optimizationSettings.addStructure && optimized.length > 100 && !optimized.includes('\n\n')) {
      optimized = addStructureToPrompt(optimized)
      steps[1] = { step: 2, action: 'Enhanced structure with clear sections', status: 'completed' }
    } else {
      steps[1] = { step: 2, action: 'Structure optimization completed', status: 'completed' }
    }
    setOptimizationSteps([...steps])

    await delay(800)

    // Step 3: Add model-specific optimizations
    steps.push({ step: 3, action: `Optimizing for ${selectedModel}...`, status: 'processing' })
    setOptimizationSteps([...steps])

    optimized = applyModelSpecificOptimizations(optimized, selectedModel)
    steps[2] = { step: 3, action: `Applied ${selectedModel} best practices`, status: 'completed' }
    setOptimizationSteps([...steps])

    await delay(800)

    // Step 4: Add examples if requested
    if (optimizationSettings.includeExamples && !optimized.toLowerCase().includes('example')) {
      steps.push({ step: 4, action: 'Adding examples and clarifications...', status: 'processing' })
      setOptimizationSteps([...steps])
      
      optimized += '\n\nPlease provide specific examples to illustrate your points where relevant.'
      steps[3] = { step: 4, action: 'Added example requirements', status: 'completed' }
      setOptimizationSteps([...steps])
      
      await delay(600)
    }

    // Step 5: Final analysis
    steps.push({ step: steps.length + 1, action: 'Running final analysis...', status: 'processing' })
    setOptimizationSteps([...steps])

    const finalScores = analyzePromptRealTime(optimized)
    setOptimizationScores(finalScores.scores)
    
    steps[steps.length - 1] = { 
      step: steps.length, 
      action: `Optimization complete! Improved overall score by ${
        Math.round(Object.values(finalScores.scores).reduce((a, b) => a + b, 0) / 5) - 
        Math.round(Object.values(realTimeAnalysis?.scores || {}).reduce((a, b) => a + b, 0) / 5)
      } points`, 
      status: 'completed' 
    }
    setOptimizationSteps([...steps])

    setOptimizedPrompt(optimized)
    onOptimizedPrompt && onOptimizedPrompt(optimized)
  }

  // Helper functions
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const getRoleForModel = (model) => {
    const roles = {
      openai: 'You are an expert AI assistant with specialized knowledge in your domain.',
      anthropic: 'You are a thoughtful and helpful AI assistant who thinks step by step.',
      google: 'You are a knowledgeable AI assistant focused on providing accurate and comprehensive responses.',
      image: 'You are an expert in visual design and artistic creation.'
    }
    return roles[model] || roles.openai
  }

  const addStructureToPrompt = (prompt) => {
    if (prompt.length < 200) return prompt
    
    // Split into sentences and group logically
    const sentences = prompt.split(/(?<=[.!?])\s+/)
    if (sentences.length < 3) return prompt

    let structured = sentences[0] + '\n\n'
    
    // Add task section
    if (sentences.length > 1) {
      structured += `**Task**: ${sentences[1]}\n\n`
    }
    
    // Add remaining as requirements
    if (sentences.length > 2) {
      structured += `**Requirements**:\n`
      sentences.slice(2).forEach((sentence, index) => {
        structured += `${index + 1}. ${sentence}\n`
      })
    }

    return structured
  }

  const applyModelSpecificOptimizations = (prompt, model) => {
    switch (model) {
      case 'anthropic':
        if (!prompt.includes('<task>')) {
          return `<task>\n${prompt}\n</task>\n\n<instructions>\nPlease think through this step by step and provide a comprehensive response.\n</instructions>`
        }
        return prompt

      case 'google':
        if (!prompt.toLowerCase().includes('task:')) {
          return `**Task**: ${prompt}\n\n**Context**: Please consider all relevant factors and provide a detailed response.\n\n**Output**: Provide a well-structured and comprehensive answer.`
        }
        return prompt

      case 'image':
        if (!prompt.includes('highly detailed')) {
          return `${prompt}, highly detailed, professional quality, optimal lighting and composition`
        }
        return prompt

      default: // OpenAI
        if (!prompt.toLowerCase().includes('format') && !prompt.toLowerCase().includes('output')) {
          return `${prompt}\n\nPlease provide your response in a clear, well-structured format with specific examples where relevant.`
        }
        return prompt
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getOverallScore = (scores) => {
    if (!scores) return 0
    return Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Prompt Optimizer</h2>
        <p className="text-gray-600">Automatically optimize your prompts for better AI responses using advanced techniques</p>
      </div>

      {/* Model Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Target AI Model
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {models.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                selectedModel === model.id 
                  ? `${model.color} border-current shadow-md` 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="text-2xl mb-2">{model.icon}</div>
              <div className="text-xs font-medium text-gray-700">{model.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Original Prompt Input */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Original Prompt
          </label>
          {realTimeAnalysis && (
            <span className={`text-sm font-medium ${getScoreColor(getOverallScore(realTimeAnalysis.scores))}`}>
              Score: {getOverallScore(realTimeAnalysis.scores)}/100
            </span>
          )}
        </div>
        <textarea
          value={originalPrompt}
          onChange={(e) => setOriginalPrompt(e.target.value)}
          placeholder="Enter your prompt to optimize..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-32 font-mono text-sm"
        />
        
        {/* Real-time stats */}
        {realTimeAnalysis && (
          <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-500">
            <span>{realTimeAnalysis.wordCount} words</span>
            <span>{realTimeAnalysis.characterCount} characters</span>
            <span>Readability: {Math.round(realTimeAnalysis.readabilityScore)}/100</span>
          </div>
        )}
      </div>

      {/* Real-time Analysis */}
      {realTimeAnalysis && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Real-time Analysis</h3>
          
          {/* Score bars */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
            {Object.entries(realTimeAnalysis.scores).map(([key, score]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-gray-700">{score}</div>
                <div className="text-xs text-gray-600 capitalize mb-1">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      score >= 80 ? 'bg-green-500' : 
                      score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {realTimeAnalysis.suggestions.length > 0 && (
            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-700 mb-2">💡 Suggestions:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {realTimeAnalysis.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {realTimeAnalysis.warnings.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">⚠️ Warnings:</h4>
              <ul className="text-sm text-orange-600 space-y-1">
                {realTimeAnalysis.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Advanced Options */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
        >
          <span>{showAdvancedOptions ? '▼' : '▶'}</span>
          Advanced Options
        </button>
        
        {showAdvancedOptions && (
          <div className="mt-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={optimizationSettings.includeExamples}
                  onChange={(e) => setOptimizationSettings(prev => ({
                    ...prev, includeExamples: e.target.checked
                  }))}
                />
                <span className="text-sm">Include example requirements</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={optimizationSettings.addConstraints}
                  onChange={(e) => setOptimizationSettings(prev => ({
                    ...prev, addConstraints: e.target.checked
                  }))}
                />
                <span className="text-sm">Add constraint boundaries</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={optimizationSettings.improveClarity}
                  onChange={(e) => setOptimizationSettings(prev => ({
                    ...prev, improveClarity: e.target.checked
                  }))}
                />
                <span className="text-sm">Improve clarity</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={optimizationSettings.addStructure}
                  onChange={(e) => setOptimizationSettings(prev => ({
                    ...prev, addStructure: e.target.checked
                  }))}
                />
                <span className="text-sm">Add structure formatting</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* AI Mode Toggle & Actions */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useRealAI}
                onChange={(e) => setUseRealAI(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Use Real AI Optimization {useRealAI ? '🧠' : '⚙️'}
              </span>
            </label>
            {useRealAI && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Powered by Claude
              </span>
            )}
          </div>

          {optimizedPrompt && (
            <button
              onClick={() => setShowChatTester(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm"
            >
              <span>💬</span>
              Test with Live AI
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={optimizePrompt}
            disabled={!originalPrompt.trim() || isOptimizing}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
          >
            {isOptimizing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {useRealAI ? 'AI Optimizing...' : 'Optimizing...'}
              </>
            ) : (
              <>
                <span>⚡</span>
                {useRealAI ? 'AI Optimize' : 'Optimize Prompt'}
              </>
            )}
          </button>

          {originalPrompt && !isOptimizing && (
            <button
              onClick={() => setShowChatTester(true)}
              className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              <span>🧪</span>
              Test Original
            </button>
          )}
        </div>
      </div>

      {/* Optimization Steps */}
      {optimizationSteps.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-3">Optimization Progress</h3>
          <div className="space-y-2">
            {optimizationSteps.map((step, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.status === 'completed' ? 'bg-green-500 text-white' :
                  step.status === 'processing' ? 'bg-blue-500 text-white animate-pulse' :
                  'bg-red-500 text-white'
                }`}>
                  {step.status === 'completed' ? '✓' : 
                   step.status === 'error' ? '✗' : step.step}
                </div>
                <span className={`text-sm ${
                  step.status === 'completed' ? 'text-green-700' :
                  step.status === 'processing' ? 'text-blue-700' :
                  'text-red-700'
                }`}>
                  {step.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Optimized Prompt Output */}
      {optimizedPrompt && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Optimized Prompt
            </label>
            {optimizationScores && (
              <span className={`text-sm font-medium ${getScoreColor(getOverallScore(optimizationScores))}`}>
                New Score: {getOverallScore(optimizationScores)}/100
              </span>
            )}
          </div>
          <div className="relative">
            <textarea
              value={optimizedPrompt}
              onChange={(e) => setOptimizedPrompt(e.target.value)}
              className="w-full p-4 border border-green-300 bg-green-50 rounded-lg min-h-32 font-mono text-sm"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(optimizedPrompt)}
                className="bg-white border border-gray-300 rounded px-3 py-1 text-xs hover:bg-gray-50 shadow-sm"
              >
                📋 Copy
              </button>
              <button
                onClick={() => setOriginalPrompt(optimizedPrompt)}
                className="bg-blue-600 text-white rounded px-3 py-1 text-xs hover:bg-blue-700 shadow-sm"
              >
                ↻ Use as Input
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Model-Specific Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">
          {models.find(m => m.id === selectedModel)?.name} Optimization Tips
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          {optimizationTechniques[selectedModel].improvements.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Live Chat Tester Modal */}
      {showChatTester && (
        <LiveChatTester
          initialPrompt={optimizedPrompt || originalPrompt}
          onClose={() => setShowChatTester(false)}
        />
      )}
    </div>
  )
} 