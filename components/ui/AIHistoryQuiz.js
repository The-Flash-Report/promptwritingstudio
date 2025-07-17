import { useState, useEffect } from 'react'

export default function AIHistoryQuiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)

  const quizQuestions = [
    {
      id: 1,
      question: "When was ChatGPT first released to the public?",
      options: [
        "October 2022",
        "November 2022", 
        "December 2022",
        "January 2023"
      ],
      correct: 1,
      explanation: "ChatGPT was released on November 30, 2022, and reached 1 million users in just 5 days!"
    },
    {
      id: 2,
      question: "Which AI model was released on the same day as GPT-4?",
      options: [
        "Google Bard",
        "Anthropic Claude",
        "Meta LLaMA", 
        "Microsoft Copilot"
      ],
      correct: 1,
      explanation: "Anthropic launched Claude on March 14, 2023 - the exact same day OpenAI released GPT-4!"
    },
    {
      id: 3,
      question: "What was Google's internal response to ChatGPT's launch called?",
      options: [
        "AI Alert",
        "Code Red",
        "Emergency Protocol",
        "Crisis Mode"
      ],
      correct: 1,
      explanation: "Google issued a 'Code Red' alert and brought back founders Larry Page and Sergey Brin to help address the ChatGPT threat."
    },
    {
      id: 4,
      question: "How long did it take ChatGPT to reach 100 million users?",
      options: [
        "1 month",
        "2 months",
        "3 months",
        "6 months"
      ],
      correct: 1,
      explanation: "ChatGPT reached 100 million users in just 2 months, making it the fastest-growing consumer app in history!"
    },
    {
      id: 5,
      question: "Which breakthrough paper introduced the Transformer architecture?",
      options: [
        "Attention Is All You Need",
        "Deep Learning Revolution",
        "Neural Networks Unleashed",
        "The AI Breakthrough"
      ],
      correct: 0,
      explanation: "Google's 'Attention Is All You Need' paper in 2017 introduced Transformers, revolutionizing natural language processing."
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateScore()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    quizQuestions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correct++
      }
    })
    setScore(correct)
    setShowResults(true)
    if (onComplete) {
      onComplete({ score: correct, total: quizQuestions.length, timeSpent })
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100
    if (percentage >= 80) return "🎉 AI History Expert! You really know your stuff!"
    if (percentage >= 60) return "👍 Good knowledge! You're well-versed in AI history."
    if (percentage >= 40) return "📚 Not bad! Keep learning about AI history."
    return "🤔 Time to brush up on your AI history knowledge!"
  }

  if (showResults) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🏆</span>
          </div>
          
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h3>
          <p className="text-xl text-gray-600 mb-6">{getScoreMessage()}</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="text-3xl font-bold text-blue-600">{score}/{quizQuestions.length}</div>
              <div className="text-sm text-blue-700">Correct Answers</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="text-3xl font-bold text-green-600">{Math.round((score/quizQuestions.length)*100)}%</div>
              <div className="text-sm text-green-700">Accuracy</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
              <div className="text-3xl font-bold text-purple-600">{formatTime(timeSpent)}</div>
              <div className="text-sm text-purple-700">Time Taken</div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {quizQuestions.map((question, index) => (
              <div key={question.id} className="text-left bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                    selectedAnswers[question.id] === question.correct
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {selectedAnswers[question.id] === question.correct ? '✓' : '✗'}
                  </span>
                  <span className="font-semibold text-gray-900">Question {index + 1}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{question.question}</p>
                <p className="text-xs text-gray-500">{question.explanation}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentQuestion(0)
                setSelectedAnswers({})
                setShowResults(false)
                setScore(0)
                setTimeSpent(0)
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🔄 Take Quiz Again
            </button>
            <a
              href="/ai-prompt-generator"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              🚀 Try AI Tools
            </a>
          </div>
        </div>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">🧠 Test Your AI Knowledge</h3>
        <div className="text-sm text-gray-500">
          ⏱️ {formatTime(timeSpent)}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-gray-900 mb-6">{question.question}</h4>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(question.id, index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswers[question.id] === index
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  selectedAnswers[question.id] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[question.id] === index && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>
        
        <button
          onClick={handleNext}
          disabled={selectedAnswers[question.id] === undefined}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next →'}
        </button>
      </div>
    </div>
  )
} 