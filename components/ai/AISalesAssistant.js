import { useState, useRef, useEffect } from 'react'

export default function AISalesAssistant({ 
  currentPage, 
  userContext,
  trigger = 'button' // 'button', 'exitIntent', 'auto'
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      sendGreeting()
      setHasGreeted(true)
    }
  }, [isOpen, hasGreeted])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendGreeting = async () => {
    const greetingPrompt = `You are a helpful sales assistant for PromptWritingStudio. Create a friendly, personalized greeting for a user who is on the ${currentPage} page.

The greeting should:
1. Be warm and welcoming
2. Acknowledge what they're looking at
3. Offer specific help related to their current page
4. Mention key products (Prompt Vault $7, AI Course $25) if relevant
5. Be concise (2-3 sentences max)

User context: ${JSON.stringify(userContext)}

Return just the greeting message, no formatting.`

    try {
      const greeting = await getAIResponse(greetingPrompt)
      addMessage('assistant', greeting)
    } catch (error) {
      const fallbackGreeting = getFallbackGreeting()
      addMessage('assistant', fallbackGreeting)
    }
  }

  const getFallbackGreeting = () => {
    const greetings = {
      'calculator': "Hi! I see you're exploring our AI calculators. I'm here to help you understand your results and find the best next steps for your business. What questions do you have?",
      'prompt-vault': "Hello! Interested in our Prompt Vault? I can help you understand what's included and how it can save you hours of prompt testing. What would you like to know?",
      'pricing': "Hi there! Looking at our AI course? I'm here to answer any questions about what's included, how it works, and whether it's right for your situation. How can I help?",
      'default': "Hi! I'm here to help you find the right AI tools and resources for your business. Whether you have questions about our calculators, prompts, or course, I'm here to help!"
    }

    const pageType = currentPage?.includes('calculator') ? 'calculator' :
                     currentPage?.includes('prompt-vault') ? 'prompt-vault' :
                     currentPage?.includes('pricing') ? 'pricing' : 'default'

    return greetings[pageType]
  }

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isTyping) return

    const userMsg = currentMessage.trim()
    setCurrentMessage('')
    addMessage('user', userMsg)
    setIsTyping(true)

    try {
      const response = await getAIResponse(buildSalesPrompt(userMsg))
      addMessage('assistant', response)
    } catch (error) {
      addMessage('assistant', "I'm sorry, I'm having trouble responding right now. Would you like me to connect you with our team directly?")
    } finally {
      setIsTyping(false)
    }
  }

  const getAIResponse = async (prompt) => {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        model: 'claude',
        messages: messages.slice(-6) // Include last 6 messages for context
      })
    })

    if (!response.ok) {
      throw new Error('AI response failed')
    }

    const data = await response.json()
    return data.response
  }

  const buildSalesPrompt = (userMessage) => {
    return `You are a knowledgeable sales assistant for PromptWritingStudio, helping potential customers understand our products and make informed decisions.

PRODUCTS AVAILABLE:
1. **Prompt Vault ($7)**: 50+ professional business prompt templates 
   - One-time purchase, instant download
   - Perfect for beginners or those who want proven prompts
   - Covers business, marketing, content, customer service

2. **AI Prompt Writing Course ($25/month)**: Comprehensive training
   - Learn to write effective prompts for any AI model
   - Advanced techniques and strategies
   - Live examples and case studies
   - Money-back guarantee

3. **Free Tools**: 5 AI calculators, prompt examples, templates
   - Content creation speed calculator
   - E-commerce AI savings calculator  
   - Business AI readiness assessment
   - Customer service AI calculator
   - AI cost comparison calculator

CURRENT CONTEXT:
- User is on: ${currentPage}
- User context: ${JSON.stringify(userContext)}
- Conversation history: ${messages.slice(-4).map(m => `${m.role}: ${m.content}`).join('\n')}

USER MESSAGE: "${userMessage}"

INSTRUCTIONS:
- Be helpful, friendly, and consultative (not pushy)
- Ask clarifying questions to understand their needs
- Recommend the most appropriate solution for their situation
- Address objections with understanding and provide value
- If they ask about pricing, explain the value clearly
- If they're hesitant, offer alternatives (free tools first)
- Keep responses concise but informative
- Always aim to help them succeed, even if they don't purchase

Respond naturally as a helpful sales assistant would.`
  }

  const addMessage = (role, content) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      role,
      content,
      timestamp: new Date().toISOString()
    }])
  }

  const quickActions = [
    { text: "What's in the Prompt Vault?", action: () => handleQuickAction("Tell me what's included in the $7 Prompt Vault") },
    { text: "How does the course work?", action: () => handleQuickAction("How does the AI course work and what will I learn?") },
    { text: "Which calculators should I try?", action: () => handleQuickAction("Which AI calculators would be most relevant for my business?") },
    { text: "Is there a money-back guarantee?", action: () => handleQuickAction("What's your refund policy?") }
  ]

  const handleQuickAction = (message) => {
    setCurrentMessage(message)
    handleSendMessage()
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        
        <div className="absolute bottom-16 right-0 bg-white p-3 rounded-lg shadow-lg border max-w-xs">
          <p className="text-sm text-gray-700">
            👋 Questions about our AI tools? I'm here to help!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-xl border w-96 h-96 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b bg-purple-600 text-white rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-xs text-purple-100">Here to help with your questions</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-purple-200 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                message.role === 'user' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions (shown initially) */}
        {messages.length <= 1 && (
          <div className="p-3 border-t bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
            <div className="space-y-1">
              {quickActions.slice(0, 2).map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full text-left text-xs bg-white p-2 rounded border hover:bg-gray-50 text-gray-700"
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 