import { useState, useRef, useEffect } from 'react'

export default function LiveChatTester({ initialPrompt = '', onClose }) {
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [selectedModel, setSelectedModel] = useState('claude')
  const [isLoading, setIsLoading] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [usage, setUsage] = useState({})
  const messagesEndRef = useRef(null)
  const [testPrompt, setTestPrompt] = useState(initialPrompt)

  const models = [
    { id: 'claude', name: 'Claude 3 Sonnet', icon: '🧠', available: true },
    { id: 'perplexity', name: 'Perplexity AI', icon: '🔍', available: true },
    { id: 'openai', name: 'OpenAI GPT-4', icon: '🤖', available: false },
    { id: 'google', name: 'Google Gemini', icon: '✨', available: false }
  ]

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize chat with the prompt if provided
  useEffect(() => {
    if (initialPrompt && messages.length === 0) {
      setMessages([{
        id: Date.now(),
        role: 'system',
        content: `Testing prompt: "${initialPrompt.substring(0, 100)}${initialPrompt.length > 100 ? '...' : ''}"`,
        timestamp: new Date().toISOString()
      }])
    }
  }, [initialPrompt])

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setCurrentMessage('')
    setIsLoading(true)
    setConnectionStatus('connecting')

    try {
      // Prepare the prompt - use test prompt if this is the first message
      const promptToSend = messages.length <= 1 && testPrompt 
        ? `${testPrompt}\n\nUser: ${currentMessage}` 
        : currentMessage

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptToSend,
          model: selectedModel,
          messages: messages.filter(msg => msg.role !== 'system').map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get AI response')
      }

      const data = await response.json()
      setConnectionStatus('connected')
      setUsage(data.usage)

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp,
        model: data.model,
        usage: data.usage
      }

      setMessages(prev => [...prev, aiMessage])

    } catch (error) {
      console.error('Chat error:', error)
      setConnectionStatus('error')
      
      const errorMessage = {
        id: Date.now() + 1,
        role: 'error',
        content: `Error: ${error.message}`,
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages(initialPrompt ? [{
      id: Date.now(),
      role: 'system',
      content: `Testing prompt: "${initialPrompt.substring(0, 100)}${initialPrompt.length > 100 ? '...' : ''}"`,
      timestamp: new Date().toISOString()
    }] : [])
    setUsage({})
    setConnectionStatus('disconnected')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600'
      case 'connecting': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return '✅'
      case 'connecting': return '🔄'
      case 'error': return '❌'
      default: return '⚪'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Live AI Chat Tester</h3>
            <div className={`flex items-center gap-2 text-sm ${getStatusColor()}`}>
              <span>{getStatusIcon()}</span>
              <span className="capitalize">{connectionStatus}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Model Selection */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-4 mb-2">
            <label className="text-sm font-medium text-gray-700">AI Model:</label>
            <div className="flex gap-2">
              {models.map(model => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  disabled={!model.available}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    selectedModel === model.id
                      ? 'bg-blue-600 text-white'
                      : model.available 
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="mr-1">{model.icon}</span>
                  {model.name}
                  {!model.available && ' (Soon)'}
                </button>
              ))}
            </div>
          </div>

          {/* Usage Statistics */}
          {Object.keys(usage).length > 0 && (
            <div className="flex gap-4 text-xs text-gray-600">
              <span>Tokens: {usage.total_tokens || usage.input_tokens + usage.output_tokens}</span>
              <span>Input: {usage.input_tokens || usage.prompt_tokens}</span>
              <span>Output: {usage.output_tokens || usage.completion_tokens}</span>
            </div>
          )}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.role === 'error'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : message.role === 'system'
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="text-xs opacity-75 mb-1">
                    {models.find(m => m.id === message.model)?.name || message.model}
                  </div>
                )}
                
                <div className="whitespace-pre-wrap">{message.content}</div>
                
                <div className="text-xs opacity-75 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span className="text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Test Prompt Display */}
        {testPrompt && (
          <div className="p-3 bg-blue-50 border-t border-blue-200">
            <div className="text-xs text-blue-600 font-medium mb-1">Testing with prompt:</div>
            <div className="text-sm text-blue-800 max-h-20 overflow-y-auto">
              {testPrompt}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <textarea
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              rows="2"
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <span>📤</span>
                )}
                Send
              </button>
              <button
                onClick={clearChat}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm"
              >
                Clear
              </button>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  )
} 