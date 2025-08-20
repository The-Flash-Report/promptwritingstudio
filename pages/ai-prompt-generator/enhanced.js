import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import PromptLibrary from '../../components/ui/PromptLibrary'
import PromptOptimizer from '../../components/ai/PromptOptimizer'
import AIAgentBuilder from '../../components/ai/AIAgentBuilder'
import CustomTemplateBuilder from '../../components/ui/CustomTemplateBuilder'
import { generatePrompt } from '../../data/prompt-generator-components'
import { getTopPrompts, getPromptCategories } from '../../data/prompt-library'

export default function EnhancedAIPromptGenerator() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [promptHistory, setPromptHistory] = useState([])
  const [favoritePrompts, setFavoritePrompts] = useState(new Set())
  const [aiAgents, setAiAgents] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  
  // Load data from localStorage
  useEffect(() => {
    const history = localStorage.getItem('promptHistory')
    const favorites = localStorage.getItem('favoritePrompts')
    const agents = localStorage.getItem('aiAgents')
    
    if (history) setPromptHistory(JSON.parse(history))
    if (favorites) setFavoritePrompts(new Set(JSON.parse(favorites)))
    if (agents) setAiAgents(JSON.parse(agents))
    
    // Create recent activity from various sources
    createRecentActivity()
  }, [])

  // Create recent activity feed
  const createRecentActivity = () => {
    const activities = []
    
    // Add from prompt history
    const history = JSON.parse(localStorage.getItem('promptHistory') || '[]')
    history.slice(0, 3).forEach(item => {
      activities.push({
        id: `history_${item.id}`,
        type: 'prompt_used',
        title: 'Used prompt',
        description: item.original.substring(0, 60) + '...',
        timestamp: item.timestamp,
        icon: '💬'
      })
    })
    
    // Add from AI agents
    const agents = JSON.parse(localStorage.getItem('aiAgents') || '[]')
    agents.slice(0, 2).forEach(agent => {
      activities.push({
        id: `agent_${agent.id}`,
        type: 'agent_created',
        title: 'Created AI Agent',
        description: agent.name,
        timestamp: agent.createdAt,
        icon: '🤖'
      })
    })
    
    // Sort by timestamp
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    setRecentActivity(activities.slice(0, 5))
  }

  // Save to history when prompt is generated/optimized
  const saveToHistory = (prompt, optimized = false) => {
    const historyItem = {
      id: Date.now(),
      original: prompt,
      optimized: optimized ? generatedPrompt : null,
      timestamp: new Date().toISOString(),
      category: 'custom'
    }
    
    const updatedHistory = [historyItem, ...promptHistory.slice(0, 49)] // Keep last 50
    setPromptHistory(updatedHistory)
    localStorage.setItem('promptHistory', JSON.stringify(updatedHistory))
    createRecentActivity() // Refresh activity feed
  }

  // Handle prompt optimization
  const handleOptimizedPrompt = (optimized) => {
    setGeneratedPrompt(optimized)
    saveToHistory(currentPrompt, true)
  }

  // Handle prompt selection from library
  const handlePromptSelect = (prompt) => {
    setCurrentPrompt(prompt.prompt || prompt.content)
    setSelectedPrompt(prompt)
    setActiveTab('optimizer') // Switch to optimizer tab
  }

  // Handle AI agent creation
  const handleAgentCreated = (agent) => {
    setAiAgents(prev => [...prev, agent])
    createRecentActivity()
    setActiveTab('dashboard') // Return to dashboard
  }

  // Toggle favorite
  const toggleFavorite = (promptId) => {
    const newFavorites = new Set(favoritePrompts)
    if (newFavorites.has(promptId)) {
      newFavorites.delete(promptId)
    } else {
      newFavorites.add(promptId)
    }
    setFavoritePrompts(newFavorites)
    localStorage.setItem('favoritePrompts', JSON.stringify([...newFavorites]))
  }

  // Get stats for dashboard
  const getStats = () => {
    return {
      totalPrompts: promptHistory.length,
      favoriteCount: favoritePrompts.size,
      aiAgents: aiAgents.length,
      categoriesUsed: new Set(promptHistory.map(p => p.category)).size
    }
  }

  const stats = getStats()
  const topPrompts = getTopPrompts(6)

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'optimizer', label: '⚡ Optimizer', icon: '⚡' },
    { id: 'library', label: '📚 Library', icon: '📚' },
    { id: 'agents', label: '🤖 AI Agents', icon: '🤖' },
    { id: 'builder', label: '🛠️ Template Builder', icon: '🛠️' }
  ]

  return (
    <Layout
      title="AI Prompt Studio - Professional Prompt Engineering Tools"
      description="Professional prompt engineering tools for content creators, marketers, and AI enthusiasts. Generate, optimize, and manage AI prompts with advanced features."
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Prompt Studio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional prompt engineering tools for content creators, marketers, and AI enthusiasts
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8">
            <div className="bg-white rounded-lg shadow-lg p-1 flex flex-wrap gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#FFDE59] text-[#1A1A1A] shadow-md'
                      : 'text-gray-600 hover:text-[#1A1A1A] hover:bg-[#F9F9F9]'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {activeTab === 'dashboard' && (
              <div className="p-8">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Prompt Studio</h2>
                    <p className="text-gray-600">Everything you need to create, optimize, and manage AI prompts</p>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-[#F9F9F9] rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalPrompts}</div>
                      <div className="text-blue-800 font-medium">Prompts Created</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{stats.favoriteCount}</div>
                      <div className="text-green-800 font-medium">Favorites</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{stats.aiAgents}</div>
                      <div className="text-purple-800 font-medium">AI Agents</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-6 text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">{getPromptCategories().length}</div>
                      <div className="text-orange-800 font-medium">Categories</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <button
                      onClick={() => setActiveTab('optimizer')}
                      className="p-6 border border-[#E5E5E5] rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] text-left transition-all group"
                    >
                      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
                      <div className="font-bold text-lg mb-2">Optimize Prompt</div>
                      <div className="text-gray-600 text-sm">Improve your existing prompts with AI-powered optimization</div>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('library')}
                      className="p-6 border border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 text-left transition-all group"
                    >
                      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">📚</div>
                      <div className="font-bold text-lg mb-2">Browse Library</div>
                      <div className="text-gray-600 text-sm">Explore professional prompt templates and examples</div>
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('agents')}
                      className="p-6 border border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 text-left transition-all group"
                    >
                      <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
                      <div className="font-bold text-lg mb-2">Create AI Agent</div>
                      <div className="text-gray-600 text-sm">Build specialized AI assistants for specific tasks</div>
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                      {recentActivity.length > 0 ? (
                        <div className="space-y-3">
                          {recentActivity.map(activity => (
                            <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <div className="text-2xl">{activity.icon}</div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-800">{activity.title}</div>
                                <div className="text-sm text-gray-600 truncate">{activity.description}</div>
                                <div className="text-xs text-gray-500">
                                  {new Date(activity.timestamp).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <div className="text-4xl mb-2">📝</div>
                          <p>No recent activity yet</p>
                          <p className="text-sm">Start by creating or optimizing prompts!</p>
                        </div>
                      )}
                    </div>

                    {/* Top Prompts */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Prompts</h3>
                      <div className="space-y-3">
                        {topPrompts.map(prompt => (
                          <div key={prompt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                              <div className="font-medium text-gray-800 text-sm truncate">{prompt.title}</div>
                              <div className="text-xs text-gray-600 flex items-center gap-2">
                                <span className="bg-gray-200 px-2 py-0.5 rounded text-xs">{prompt.category}</span>
                                <span>♥ {prompt.likes}</span>
                                <span>↗ {prompt.uses}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handlePromptSelect(prompt)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Use
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Prompts */}
                  {promptHistory.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Recent Prompts</h3>
                      <div className="space-y-2">
                        {promptHistory.slice(0, 5).map(item => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <div className="text-sm text-gray-800 truncate">{item.original}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-2">
                                <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                {item.optimized && <span className="text-green-600">✓ Optimized</span>}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setCurrentPrompt(item.original)
                                  setActiveTab('optimizer')
                                }}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                Optimize
                              </button>
                              <button
                                onClick={() => toggleFavorite(item.id)}
                                className={`text-lg ${favoritePrompts.has(item.id) ? 'text-red-500' : 'text-gray-400'}`}
                              >
                                ♥
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'optimizer' && (
              <div className="p-8">
                <PromptOptimizer 
                  initialPrompt={currentPrompt}
                  onOptimizedPrompt={handleOptimizedPrompt}
                />
              </div>
            )}

            {activeTab === 'library' && (
              <div className="p-8">
                <PromptLibrary onPromptSelect={handlePromptSelect} />
              </div>
            )}

            {activeTab === 'agents' && (
              <div className="p-8">
                <AIAgentBuilder onAgentCreated={handleAgentCreated} />
              </div>
            )}

            {activeTab === 'builder' && (
              <div className="p-8">
                <CustomTemplateBuilder />
              </div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#F9F9F9] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Smart Optimization</h3>
              <p className="text-gray-600">Automatically improve your prompts for better AI responses using proven techniques and real-time analysis</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Agents</h3>
              <p className="text-gray-600">Create specialized AI assistants for specific tasks and domains with custom knowledge bases</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Library</h3>
              <p className="text-gray-600">Access curated prompt templates with optimization scores, usage analytics, and community favorites</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 