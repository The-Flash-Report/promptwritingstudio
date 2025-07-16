import { useState, useEffect } from 'react'
import { promptComponents } from '../../data/prompt-generator-components'

export default function AIAgentBuilder({ onAgentCreated, existingAgent = null }) {
  const [agentName, setAgentName] = useState('')
  const [agentDescription, setAgentDescription] = useState('')
  const [agentRole, setAgentRole] = useState('')
  const [systemPrompt, setSystemPrompt] = useState('')
  const [knowledgeBase, setKnowledgeBase] = useState('')
  const [selectedComponents, setSelectedComponents] = useState([])
  const [agentCategory, setAgentCategory] = useState('general')
  const [conversationStarters, setConversationStarters] = useState([''])
  const [agentInstructions, setAgentInstructions] = useState({
    tone: 'professional',
    responseLength: 'medium',
    expertise: '',
    constraints: ''
  })

  const categories = [
    'general', 'business', 'content-creation', 'copywriting', 
    'education', 'technical', 'creative', 'customer-support'
  ]

  const toneOptions = [
    'professional', 'casual', 'friendly', 'formal', 'creative', 'helpful'
  ]

  const responseLengthOptions = [
    { value: 'brief', label: 'Brief (1-2 sentences)' },
    { value: 'medium', label: 'Medium (1-2 paragraphs)' },
    { value: 'detailed', label: 'Detailed (3+ paragraphs)' },
    { value: 'comprehensive', label: 'Comprehensive (Full analysis)' }
  ]

  // Pre-built agent templates
  const agentTemplates = {
    'content-strategist': {
      name: 'Content Strategist',
      description: 'Expert in content marketing and strategy planning',
      role: 'You are a senior content strategist with 10+ years of experience in digital marketing.',
      systemPrompt: 'Analyze content needs and provide strategic recommendations...',
      category: 'content-creation'
    },
    'copywriter': {
      name: 'Conversion Copywriter',
      description: 'Specialist in high-converting sales copy and marketing materials',
      role: 'You are a conversion copywriter who understands psychology and persuasion.',
      systemPrompt: 'Create compelling copy that drives action...',
      category: 'copywriting'
    },
    'business-analyst': {
      name: 'Business Analyst',
      description: 'Expert in business strategy and market analysis',
      role: 'You are a business analyst with expertise in strategy and operations.',
      systemPrompt: 'Provide detailed business analysis and recommendations...',
      category: 'business'
    }
  }

  // Initialize with existing agent
  useEffect(() => {
    if (existingAgent) {
      setAgentName(existingAgent.name || '')
      setAgentDescription(existingAgent.description || '')
      setAgentRole(existingAgent.role || '')
      setSystemPrompt(existingAgent.systemPrompt || '')
      setKnowledgeBase(existingAgent.knowledgeBase || '')
      setSelectedComponents(existingAgent.components || [])
      setAgentCategory(existingAgent.category || 'general')
      setConversationStarters(existingAgent.conversationStarters || [''])
      setAgentInstructions(existingAgent.instructions || {
        tone: 'professional',
        responseLength: 'medium',
        expertise: '',
        constraints: ''
      })
    }
  }, [existingAgent])

  // Load template
  const loadTemplate = (templateKey) => {
    const template = agentTemplates[templateKey]
    if (template) {
      setAgentName(template.name)
      setAgentDescription(template.description)
      setAgentRole(template.role)
      setSystemPrompt(template.systemPrompt)
      setAgentCategory(template.category)
    }
  }

  // Add conversation starter
  const addConversationStarter = () => {
    setConversationStarters([...conversationStarters, ''])
  }

  // Update conversation starter
  const updateConversationStarter = (index, value) => {
    const updated = [...conversationStarters]
    updated[index] = value
    setConversationStarters(updated)
  }

  // Remove conversation starter
  const removeConversationStarter = (index) => {
    setConversationStarters(conversationStarters.filter((_, i) => i !== index))
  }

  // Generate system prompt from components
  const generateSystemPrompt = () => {
    let prompt = `Role: ${agentRole}\n\n`
    
    if (agentInstructions.expertise) {
      prompt += `Expertise: ${agentInstructions.expertise}\n\n`
    }
    
    prompt += `Instructions:\n`
    prompt += `- Respond in a ${agentInstructions.tone} tone\n`
    prompt += `- Provide ${agentInstructions.responseLength} responses\n`
    
    if (agentInstructions.constraints) {
      prompt += `- Follow these constraints: ${agentInstructions.constraints}\n`
    }
    
    if (knowledgeBase) {
      prompt += `\nKnowledge Base:\n${knowledgeBase}\n`
    }
    
    setSystemPrompt(prompt)
  }

  // Save agent
  const saveAgent = () => {
    const agent = {
      id: existingAgent?.id || Date.now(),
      name: agentName,
      description: agentDescription,
      role: agentRole,
      systemPrompt,
      knowledgeBase,
      components: selectedComponents,
      category: agentCategory,
      conversationStarters: conversationStarters.filter(s => s.trim()),
      instructions: agentInstructions,
      createdAt: existingAgent?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    // Save to localStorage
    const existingAgents = JSON.parse(localStorage.getItem('aiAgents') || '[]')
    
    if (existingAgent) {
      const index = existingAgents.findIndex(a => a.id === existingAgent.id)
      existingAgents[index] = agent
    } else {
      existingAgents.push(agent)
    }
    
    localStorage.setItem('aiAgents', JSON.stringify(existingAgents))
    onAgentCreated && onAgentCreated(agent)
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          {existingAgent ? 'Edit AI Agent' : 'Create AI Agent'}
        </h2>
        <p className="text-gray-600 mt-1">
          Build specialized AI assistants for specific tasks and use cases
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Templates */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Start Templates</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {Object.entries(agentTemplates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => loadTemplate(key)}
                className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-left transition-colors"
              >
                <div className="font-medium text-gray-800">{template.name}</div>
                <div className="text-sm text-gray-600 mt-1">{template.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent Name *
            </label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="e.g., Content Strategy Expert"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={agentCategory}
              onChange={(e) => setAgentCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={agentDescription}
            onChange={(e) => setAgentDescription(e.target.value)}
            placeholder="Briefly describe what this agent specializes in..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-20"
          />
        </div>

        {/* Agent Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agent Role *
          </label>
          <textarea
            value={agentRole}
            onChange={(e) => setAgentRole(e.target.value)}
            placeholder="You are a [role] with expertise in [domain]..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
          />
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Response Instructions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
              <select
                value={agentInstructions.tone}
                onChange={(e) => setAgentInstructions({...agentInstructions, tone: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {toneOptions.map(tone => (
                  <option key={tone} value={tone}>
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Response Length</label>
              <select
                value={agentInstructions.responseLength}
                onChange={(e) => setAgentInstructions({...agentInstructions, responseLength: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {responseLengthOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Knowledge Base */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Knowledge Base (Optional)
          </label>
          <textarea
            value={knowledgeBase}
            onChange={(e) => setKnowledgeBase(e.target.value)}
            placeholder="Add specific knowledge, facts, or context this agent should know..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
          />
        </div>

        {/* Conversation Starters */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Conversation Starters</h3>
          {conversationStarters.map((starter, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={starter}
                onChange={(e) => updateConversationStarter(index, e.target.value)}
                placeholder="e.g., Help me create a content strategy for..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {conversationStarters.length > 1 && (
                <button
                  onClick={() => removeConversationStarter(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addConversationStarter}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add conversation starter
          </button>
        </div>

        {/* Generate System Prompt */}
        <div className="flex gap-4">
          <button
            onClick={generateSystemPrompt}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            🔄 Generate System Prompt
          </button>
        </div>

        {/* System Prompt Preview */}
        {systemPrompt && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              System Prompt (Auto-generated)
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32 bg-gray-50"
            />
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={saveAgent}
            disabled={!agentName.trim() || !agentRole.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {existingAgent ? 'Update Agent' : 'Create Agent'}
          </button>
        </div>
      </div>
    </div>
  )
} 