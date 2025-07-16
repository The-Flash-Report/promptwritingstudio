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
  const [showTester, setShowTester] = useState(false)
  const [testMessage, setTestMessage] = useState('')
  const [testResult, setTestResult] = useState(null)

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

  const testResponse = async () => {
    setTestResult('Testing...')
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: testMessage,
          model: 'claude', // Hardcoded for testing
          messages: [] // No previous messages for testing
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to get AI response for testing')
      }

      const data = await response.json()
      setTestResult(data.response)
    } catch (error) {
      setTestResult(`Error: ${error.message}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 my-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Live Chat Response Tester</h3>
          <button
            onClick={() => setShowTester(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Message
            </label>
            <textarea
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              placeholder="Enter a customer message to test..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <button
            onClick={testResponse}
            disabled={!testMessage.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Test Response
          </button>
          
          {testResult && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">AI Response:</h4>
              <div className="bg-gray-50 p-3 rounded text-sm">
                {testResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 