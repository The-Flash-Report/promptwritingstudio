import { useState, useEffect } from 'react'
import { 
  promptLibraryData, 
  getPromptsByCategory, 
  getAllPrompts, 
  searchPrompts, 
  getTopPrompts,
  getPromptCategories 
} from '../../data/prompt-library'

export default function PromptLibrary({ onPromptSelect }) {
  const [prompts, setPrompts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [favorites, setFavorites] = useState(new Set())
  const [userPrompts, setUserPrompts] = useState([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [showNewPromptModal, setShowNewPromptModal] = useState(false)
  const [sortBy, setSortBy] = useState('popularity') // popularity, recent, alphabetical
  const [filterBy, setFilterBy] = useState('all') // all, beginner, intermediate, advanced

  const categories = ['all', ...getPromptCategories(), 'user-created']

  // Load prompts and user data from localStorage
  useEffect(() => {
    const savedUserPrompts = localStorage.getItem('userPrompts')
    const savedFavorites = localStorage.getItem('favoritePrompts')
    
    if (savedUserPrompts) {
      setUserPrompts(JSON.parse(savedUserPrompts))
    }
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
    
    // Load initial prompts
    loadPrompts()
  }, [])

  // Load prompts based on selected category
  const loadPrompts = () => {
    let loadedPrompts = []
    
    if (selectedCategory === 'all') {
      loadedPrompts = [...getAllPrompts(), ...userPrompts]
    } else if (selectedCategory === 'user-created') {
      loadedPrompts = userPrompts
    } else {
      loadedPrompts = getPromptsByCategory(selectedCategory)
    }
    
    setPrompts(loadedPrompts)
  }

  // Update prompts when category changes
  useEffect(() => {
    loadPrompts()
  }, [selectedCategory, userPrompts])

  // Save prompt to user library
  const savePrompt = (promptData) => {
    const newPrompt = {
      id: `user_${Date.now()}`,
      title: promptData.title || 'Untitled Prompt',
      description: promptData.description || '',
      prompt: promptData.content || promptData.prompt,
      category: promptData.category || selectedCategory,
      tags: promptData.tags || [],
      difficulty: promptData.difficulty || 'intermediate',
      useCase: promptData.useCase || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'You',
      likes: 0,
      uses: 0,
      optimizationScore: 70 // Default score for user prompts
    }
    
    const updatedUserPrompts = [...userPrompts, newPrompt]
    setUserPrompts(updatedUserPrompts)
    localStorage.setItem('userPrompts', JSON.stringify(updatedUserPrompts))
    setShowNewPromptModal(false)
  }

  // Toggle favorite
  const toggleFavorite = (promptId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(promptId)) {
      newFavorites.delete(promptId)
    } else {
      newFavorites.add(promptId)
    }
    setFavorites(newFavorites)
    localStorage.setItem('favoritePrompts', JSON.stringify([...newFavorites]))
  }

  // Increment usage count
  const incrementUsage = (promptId) => {
    if (promptId.startsWith('user_')) {
      const updatedUserPrompts = userPrompts.map(prompt => 
        prompt.id === promptId 
          ? { ...prompt, uses: prompt.uses + 1 }
          : prompt
      )
      setUserPrompts(updatedUserPrompts)
      localStorage.setItem('userPrompts', JSON.stringify(updatedUserPrompts))
    }
  }

  // Filter and sort prompts
  const getFilteredPrompts = () => {
    let filtered = prompts

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(prompt => 
        prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        prompt.useCase.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(prompt => favorites.has(prompt.id))
    }

    // Difficulty filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(prompt => prompt.difficulty === filterBy)
    }

    // Sort
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => ((b.likes || 0) + (b.uses || 0)) - ((a.likes || 0) + (a.uses || 0)))
        break
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'optimization':
        filtered.sort((a, b) => (b.optimizationScore || 0) - (a.optimizationScore || 0))
        break
    }

    return filtered
  }

  const filteredPrompts = getFilteredPrompts()

  // Handle prompt selection
  const handlePromptSelect = (prompt) => {
    incrementUsage(prompt.id)
    onPromptSelect(prompt)
  }

  // Get difficulty badge color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Prompt Library</h2>
          <p className="text-gray-600 mt-1">
            {filteredPrompts.length} professional prompts ready to use
          </p>
        </div>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          onClick={() => setShowNewPromptModal(true)}
        >
          <span>+</span>
          Add Prompt
        </button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search prompts by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularity">Most Popular</option>
            <option value="recent">Most Recent</option>
            <option value="alphabetical">A-Z</option>
            <option value="optimization">Best Optimized</option>
          </select>

          {/* Favorites Toggle */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              showFavoritesOnly 
                ? 'border-red-500 bg-red-50 text-red-700' 
                : 'border-gray-300 text-gray-600 hover:border-red-400'
            }`}
          >
            ♥ Favorites {showFavoritesOnly && `(${favorites.size})`}
          </button>
        </div>
      </div>

      {/* Prompt Grid */}
      {filteredPrompts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium text-gray-600 mb-2">No prompts found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.map(prompt => (
            <div key={prompt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{prompt.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(prompt.difficulty)}`}>
                      {prompt.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">
                      Score: {prompt.optimizationScore}/100
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(prompt.id)}
                  className={`text-xl ${favorites.has(prompt.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
                >
                  ♥
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{prompt.description}</p>

              {/* Use Case */}
              {prompt.useCase && (
                <p className="text-xs text-blue-600 mb-3 italic">💡 {prompt.useCase}</p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {prompt.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                    {tag}
                  </span>
                ))}
                {prompt.tags.length > 3 && (
                  <span className="text-gray-400 text-xs">+{prompt.tags.length - 3}</span>
                )}
              </div>

              {/* Stats and Actions */}
              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                <div className="flex gap-4">
                  <span>♥ {prompt.likes || 0}</span>
                  <span>↗ {prompt.uses || 0}</span>
                  {prompt.estimatedTime && <span>⏱ {prompt.estimatedTime}</span>}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handlePromptSelect(prompt)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Use This Prompt
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Prompt Modal */}
      {showNewPromptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full my-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add New Prompt</h3>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.target)
              savePrompt({
                title: formData.get('title'),
                description: formData.get('description'),
                content: formData.get('content'),
                category: formData.get('category'),
                useCase: formData.get('useCase'),
                tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(Boolean)
              })
            }}>
              <div className="space-y-4">
                <input
                  name="title"
                  placeholder="Prompt title"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="description" 
                  placeholder="Brief description"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <textarea
                  name="content"
                  placeholder="Your prompt content..."
                  required
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="useCase"
                  placeholder="What is this prompt best for?"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  name="tags"
                  placeholder="Tags (comma separated)"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <select name="category" className="w-full p-2 border border-gray-300 rounded">
                  {getPromptCategories().map(cat => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewPromptModal(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Prompt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 