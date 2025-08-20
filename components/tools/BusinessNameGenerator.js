import { useState } from 'react'

export default function BusinessNameGenerator() {
  const [formData, setFormData] = useState({
    keywords: '',
    wordCount: 2,
    selectedTypes: [],
    businessType: ''
  })
  const [generatedNames, setGeneratedNames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [manualDomainChecking, setManualDomainChecking] = useState(false)

  const businessTypes = [
    { value: 'tech-startup', label: 'Tech Startup' },
    { value: 'local-business', label: 'Local Business' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'professional-service', label: 'Professional Service' },
    { value: 'creative-agency', label: 'Creative Agency' },
    { value: 'health-fitness', label: 'Health & Fitness' },
    { value: 'other', label: 'Other' }
  ]

  const wordTypes = [
    { value: 'tech', label: 'Tech Terms', description: 'Cloud, Digital, AI, Data' },
    { value: 'action', label: 'Action Words', description: 'Build, Launch, Create, Drive' },
    { value: 'business', label: 'Business Terms', description: 'Solutions, Labs, Hub, Works' },
    { value: 'adjectives', label: 'Descriptive', description: 'Smart, Bold, Fresh, Elite' },
    { value: 'premium', label: 'Premium', description: 'Elite, Luxe, Royal, Prime' },
    { value: 'creative', label: 'Creative', description: 'Canvas, Spark, Vision, Dream' }
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name === 'selectedTypes') {
      setFormData(prev => ({
        ...prev,
        selectedTypes: checked 
          ? [...prev.selectedTypes, value]
          : prev.selectedTypes.filter(type => type !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
      }))
    }
  }

  // Real domain checking function
  const checkDomainAvailability = async (domainName) => {
    try {
      // Clean the domain name
      const cleanDomain = domainName.toLowerCase().replace(/\s+/g, '') + '.com'
      
      // Try to resolve the domain using Google's public DNS API
      const response = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=A`)
      const data = await response.json()
      
      // If we get NXDOMAIN (Status 3), the domain is available
      if (data.Status === 3) {
        return true // Available
      } 
      // If we get a successful response with answers, the domain is taken
      else if (data.Status === 0 && data.Answer && data.Answer.length > 0) {
        return false // Taken
      } 
      // If we get SERVFAIL or other errors, try alternative method
      else {
        // Alternative: try to fetch the domain to see if it resolves
        try {
          // Use a timeout to avoid hanging
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 5000)
          
          const testResponse = await fetch(`https://${cleanDomain}`, { 
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-cache',
            signal: controller.signal
          })
          
          clearTimeout(timeoutId)
          return false // If we can reach it, it's taken
        } catch (fetchError) {
          // If fetch fails (network error, timeout, etc.), domain is likely available
          if (fetchError.name === 'AbortError') {
            console.log('Domain check timed out for:', cleanDomain)
          }
          return true // Likely available
        }
      }
    } catch (error) {
      console.error('Domain check failed for:', domainName, error)
      return undefined // Return undefined if check fails
    }
  }

  // Batch check multiple domains
  const checkDomainsBatch = async (names) => {
    const updatedNames = [...names]
    
    for (let i = 0; i < updatedNames.length; i++) {
      const name = updatedNames[i]
      const domainName = name.name.toLowerCase().replace(/\s+/g, '')
      
      // Set initial state to checking
      updatedNames[i] = { ...name, domainAvailable: undefined }
      setGeneratedNames([...updatedNames])
      
      // Check domain availability
      const isAvailable = await checkDomainAvailability(domainName)
      updatedNames[i] = { ...name, domainAvailable: isAvailable }
      setGeneratedNames([...updatedNames])
      
      // Small delay to avoid overwhelming the DNS service
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    return updatedNames
  }

  const generateWithClaude = async () => {
    const apiKey = process.env.NEXT_PUBLIC_CLAUDE_API_KEY
    
    if (!apiKey) {
      return generatePatternNames()
    }

    try {
      const prompt = buildClaudePrompt()
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: prompt
          }]
        })
      })

      if (!response.ok) {
        throw new Error('Claude API request failed')
      }

      const data = await response.json()
      const generatedText = data.content[0]?.text || ''
      
      const names = parseClaudeResponse(generatedText)
      
      // Check domains after generation
      if (names.length > 0) {
        await checkDomainsBatch(names)
      }
      
      return names
    } catch (error) {
      console.error('Claude generation failed, using pattern fallback:', error)
      const names = generatePatternNames()
      
      // Check domains for pattern names too
      if (names.length > 0) {
        await checkDomainsBatch(names)
      }
      
      return names
    }
  }

  const buildClaudePrompt = () => {
    const { keywords, wordCount, selectedTypes, businessType } = formData
    
    const typeDescriptions = {
      tech: 'tech terms like Cloud, Digital, AI, Data',
      action: 'action words like Build, Launch, Create, Drive',
      business: 'business terms like Solutions, Labs, Hub, Works',
      adjectives: 'descriptive adjectives like Smart, Bold, Fresh, Elite',
      premium: 'premium words like Elite, Luxe, Royal, Prime',
      creative: 'creative terms like Canvas, Spark, Vision, Dream'
    }
    
    const selectedTypesList = selectedTypes
      .map(type => typeDescriptions[type])
      .filter(Boolean)
      .join(', ')

    return `Generate 12 creative business names based on these requirements:

**Business Description:** ${keywords}
**Word Count:** ${wordCount} word${wordCount > 1 ? 's' : ''}
**Business Type:** ${businessType || 'General'}
**Style Preferences:** ${selectedTypesList || 'Any professional style'}

**Instructions:**
- Create ${wordCount}-word business names that are memorable and brandable
- Use the keywords creatively, don't just repeat them literally
- Make names that sound professional yet distinctive
- Avoid generic combinations
- Each name should feel unique and ownable

**Output Format:**
For each name, provide:
1. The business name
2. A brief explanation of the naming strategy

Example format:
1. [Business Name] - [Brief explanation]

Generate exactly 12 unique options.`
  }

  const parseClaudeResponse = (text) => {
    const lines = text.split('\n').filter(line => line.trim())
    const names = []
    
    for (let i = 0; i < lines.length && names.length < 12; i++) {
      const line = lines[i].trim()
      
      const match = line.match(/^\d+\.\s*(.+?)\s*-\s*(.+)$/)
      if (match) {
        const [, name, explanation] = match
        names.push({
          id: `claude-${names.length}`,
          name: name.trim(),
          explanation: explanation.trim(),
          domainAvailable: undefined, // Will be checked later
          isFavorite: false
        })
      }
    }
    
    return names.length > 0 ? names : generatePatternNames()
  }

  const generatePatternNames = () => {
    const { keywords, wordCount } = formData
    const baseWord = keywords.split(' ')[0] || 'Business'
    
    const prefixes = ['Tech', 'Smart', 'Digital', 'Quick', 'Pro', 'Easy', 'Next', 'Cloud', 'Modern', 'Elite']
    const suffixes = ['ly', 'ify', 'Hub', 'Labs', 'Pro', 'Flow', 'Sync', 'Wave', 'Works', 'Zone']
    const adjectives = ['Bold', 'Swift', 'Prime', 'Core', 'Peak', 'True', 'Pure', 'Bright']
    
    const names = []
    
    for (let i = 0; i < 12; i++) {
      let generatedName
      
      if (wordCount === 1) {
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
        generatedName = `${baseWord}${suffix}`
      } else if (wordCount === 2) {
        const usePrefix = Math.random() > 0.5
        if (usePrefix) {
          const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
          generatedName = `${prefix} ${baseWord}`
        } else {
          const suffix = suffixes[Math.floor(Math.random() * suffixes.length)]
          generatedName = `${baseWord} ${suffix}`
        }
      } else {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
        generatedName = `${adjective} ${baseWord} ${prefix}`
      }
      
      names.push({
        id: `pattern-${i}`,
        name: generatedName,
        explanation: `A professional name combining "${baseWord}" with modern business terminology`,
        domainAvailable: undefined, // Will be checked later
        isFavorite: false
      })
    }
    
    return names
  }

  const handleGenerate = async () => {
    if (!formData.keywords.trim()) {
      setError('Please describe your business or enter keywords')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const names = await generateWithClaude()
      setGeneratedNames(names)
    } catch (error) {
      setError('Failed to generate names. Please try again.')
      console.error('Generation error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFavorite = (nameId) => {
    setGeneratedNames(prev => 
      prev.map(name => 
        name.id === nameId 
          ? { ...name, isFavorite: !name.isFavorite }
          : name
      )
    )
  }

  const exportFavorites = () => {
    const favorites = generatedNames.filter(name => name.isFavorite)
    const favoriteNames = favorites.map(name => name.name).join('\n')
    const blob = new Blob([favoriteNames], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'favorite-business-names.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Manual domain check function
  const checkManualDomain = async (domainInput) => {
    if (!domainInput.trim()) return
    
    const cleanDomain = domainInput.toLowerCase().trim().replace(/\s+/g, '')
    const fullDomain = cleanDomain.endsWith('.com') ? cleanDomain : cleanDomain + '.com'
    
    setManualDomainChecking(true)
    
    try {
      const isAvailable = await checkDomainAvailability(cleanDomain)
      
      // Show result to user
      alert(`${fullDomain} is ${isAvailable ? 'AVAILABLE' : 'TAKEN'}`)
    } catch (error) {
      alert('Failed to check domain. Please try again.')
    } finally {
      setManualDomainChecking(false)
    }
  }

  const favorites = generatedNames.filter(name => name.isFavorite)

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-[#FFDE59] to-[#F0D000] p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-2">
          AI Business Name Generator
        </h2>
        <p className="text-[#1A1A1A] text-lg">
          Generate unique, brandable business names using AI and check domain availability
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Generation Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Describe your business or enter keywords *
            </label>
            <input
              type="text"
              name="keywords"
              value={formData.keywords}
              onChange={handleInputChange}
              placeholder="e.g., tech startup, coffee shop, fitness app, consulting..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-transparent"
              disabled={isLoading}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Number of words
              </label>
              <select
                name="wordCount"
                value={formData.wordCount}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-transparent"
                disabled={isLoading}
              >
                <option value={1}>1 word</option>
                <option value={2}>2 words</option>
                <option value={3}>3 words</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Business type (optional)
              </label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-transparent"
                disabled={isLoading}
              >
                <option value="">Any type</option>
                {businessTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Word style preferences (optional)
            </label>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {wordTypes.map(type => (
                <label key={type.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="selectedTypes"
                    value={type.value}
                    checked={formData.selectedTypes.includes(type.value)}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-[#FFDE59] focus:ring-[#FFDE59] border-gray-300 rounded"
                    disabled={isLoading}
                  />
                  <div>
                    <div className="font-medium text-gray-900">{type.label}</div>
                    <div className="text-sm text-gray-500">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Manual Domain Check */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label className="block text-gray-700 font-semibold mb-2">
              Check a specific domain
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="manualDomain"
                placeholder="e.g., techworks, mybusiness"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-transparent"
              />
              <button
                onClick={() => {
                  const input = document.getElementById('manualDomain')
                  checkManualDomain(input.value)
                }}
                disabled={manualDomainChecking}
                className="bg-[#1A1A1A] text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {manualDomainChecking ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </span>
                ) : (
                  'Check Domain'
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Enter a domain name without .com to check availability
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !formData.keywords.trim()}
            className="w-full bg-[#FFDE59] text-[#1A1A1A] py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#1A1A1A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Names...
              </span>
            ) : (
              '🚀 Generate Business Names'
            )}
          </button>
        </div>

        {/* Results */}
        {generatedNames.length > 0 && (
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Generated Names ({generatedNames.length})
                </h3>
                <p className="text-gray-600 mt-1">
                  Click the ❤️ to save your favorites
                </p>
              </div>
              
              {favorites.length > 0 && (
                <button
                  onClick={exportFavorites}
                  className="bg-[#1A1A1A] text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                >
                  📥 Export {favorites.length} Favorite{favorites.length === 1 ? '' : 's'}
                </button>
              )}
            </div>

            {/* Names Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedNames.map((name) => (
                <div
                  key={name.id}
                  className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                    name.isFavorite 
                      ? 'border-[#FFDE59] bg-yellow-50' 
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-lg text-gray-900 truncate">
                      {name.name}
                    </h4>
                    
                    <button
                      onClick={() => toggleFavorite(name.id)}
                      className={`text-lg transition-all duration-200 ml-2 ${
                        name.isFavorite 
                          ? 'text-red-500 hover:text-red-600' 
                          : 'text-gray-300 hover:text-red-400'
                      }`}
                      title={name.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      ❤️
                    </button>
                  </div>
                  
                  {/* Domain Info */}
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-gray-500">
                      {name.name.toLowerCase().replace(/\s+/g, '')}.com
                    </span>
                    <span className={`font-medium ${
                      name.domainAvailable === true 
                        ? 'text-green-600' 
                        : name.domainAvailable === false 
                        ? 'text-red-600' 
                        : 'text-gray-400'
                    }`}>
                      {name.domainAvailable === true && '✓ Available'}
                      {name.domainAvailable === false && '✗ Taken'}
                      {name.domainAvailable === undefined && '? Checking...'}
                    </span>
                  </div>
                  
                  {/* Explanation */}
                  {name.explanation && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {name.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Favorites Summary */}
            {favorites.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  ❤️ Your Favorites ({favorites.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {favorites.map((name) => (
                    <span
                      key={name.id}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {name.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 