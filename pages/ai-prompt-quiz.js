import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { FaCheckCircle, FaTimesCircle, FaShare, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'

const quizQuestions = [
  {
    id: 1,
    question: "What's the most important element of an effective AI prompt?",
    options: [
      "Making it as long as possible",
      "Being specific and clear about what you want",
      "Using technical jargon",
      "Asking multiple questions at once"
    ],
    correct: 1,
    explanation: "Specificity and clarity are crucial. AI models perform best when they understand exactly what you're asking for."
  },
  {
    id: 2,
    question: "Which technique helps AI maintain consistency in tone?",
    options: [
      "Using different writing styles in the same prompt",
      "Providing examples of the desired tone",
      "Writing in all caps",
      "Avoiding any tone specification"
    ],
    correct: 1,
    explanation: "Providing examples of the desired tone helps AI understand and maintain consistency throughout the response."
  },
  {
    id: 3,
    question: "What does 'prompt chaining' mean?",
    options: [
      "Using multiple AI tools simultaneously",
      "Writing very long prompts",
      "Breaking complex tasks into sequential prompts",
      "Copying prompts from other users"
    ],
    correct: 2,
    explanation: "Prompt chaining involves breaking complex tasks into smaller, sequential prompts for better results."
  },
  {
    id: 4,
    question: "When should you use role-playing in prompts?",
    options: [
      "Never, it confuses the AI",
      "Only for creative writing",
      "When you want specific expertise or perspective",
      "Only with advanced AI models"
    ],
    correct: 2,
    explanation: "Role-playing (e.g., 'Act as a marketing expert') helps AI provide responses from specific perspectives or expertise."
  },
  {
    id: 5,
    question: "What's the best way to get AI to write in your brand voice?",
    options: [
      "Tell it to 'write professionally'",
      "Provide examples of your existing content",
      "Use generic business language",
      "Avoid giving any style guidance"
    ],
    correct: 1,
    explanation: "Providing examples of your existing content helps AI learn and replicate your unique brand voice."
  },
  {
    id: 6,
    question: "Which prompt technique improves factual accuracy?",
    options: [
      "Asking AI to guess when unsure",
      "Requesting sources and verification",
      "Using emotional language",
      "Making prompts shorter"
    ],
    correct: 1,
    explanation: "Asking AI to cite sources, verify facts, or indicate uncertainty improves accuracy and reliability."
  },
  {
    id: 7,
    question: "What's a 'negative prompt'?",
    options: [
      "A prompt that creates negative content",
      "Telling AI what NOT to include or do",
      "A poorly written prompt",
      "A prompt that doesn't work"
    ],
    correct: 1,
    explanation: "Negative prompts specify what you don't want, helping AI avoid unwanted elements in responses."
  },
  {
    id: 8,
    question: "How can you make AI responses more creative?",
    options: [
      "Ask for boring, standard responses",
      "Use temperature settings and creative constraints",
      "Provide no context or guidelines",
      "Only use yes/no questions"
    ],
    correct: 1,
    explanation: "Creative constraints, temperature settings, and specific creative directions help generate more innovative responses."
  },
  {
    id: 9,
    question: "What's the best approach for iterating on AI outputs?",
    options: [
      "Accept the first response always",
      "Start over with completely new prompts",
      "Refine and build upon previous responses",
      "Use the same prompt repeatedly"
    ],
    correct: 2,
    explanation: "Iterative refinement - building upon and improving previous responses - typically yields the best results."
  },
  {
    id: 10,
    question: "When writing prompts for business content, you should:",
    options: [
      "Focus only on features and specifications",
      "Include target audience and business context",
      "Avoid mentioning your industry",
      "Use only formal language"
    ],
    correct: 1,
    explanation: "Including target audience, business context, and industry-specific details helps AI create more relevant business content."
  },
  {
    id: 11,
    question: "What's the most effective way to structure a complex prompt?",
    options: [
      "Write everything in one long paragraph",
      "Use bullet points and clear sections",
      "Write it backwards",
      "Use only questions"
    ],
    correct: 1,
    explanation: "Clear structure with bullet points and sections makes complex prompts easier for AI to understand and follow."
  },
  {
    id: 12,
    question: "How do you ensure AI generates content for the right audience?",
    options: [
      "Assume AI knows your audience",
      "Describe the audience's demographics, needs, and language level",
      "Use generic language for everyone",
      "Focus only on your own preferences"
    ],
    correct: 1,
    explanation: "Detailed audience descriptions including demographics, knowledge level, and needs help AI tailor content appropriately."
  }
];

const resultProfiles = {
  beginner: {
    title: "🌱 Prompt Writing Beginner",
    subtitle: "You're just getting started!",
    description: "You have a basic understanding of AI prompts but there's lots of room to grow. With the right guidance, you can quickly improve your results.",
    recommendations: [
      "Start with simple, clear requests",
      "Practice being specific about what you want",
      "Learn basic prompt structure and formatting",
      "Experiment with different AI tools"
    ],
    courseMatch: "Perfect for our Basic Plan - learn the fundamentals step by step."
  },
  intermediate: {
    title: "🚀 Prompt Writing Practitioner", 
    subtitle: "You've got the basics down!",
    description: "You understand core prompt principles and can create effective basic prompts. Ready to learn advanced techniques to get professional-level results.",
    recommendations: [
      "Learn advanced prompt techniques like chaining",
      "Master role-playing and persona prompts", 
      "Practice iterative prompt refinement",
      "Develop your unique voice and style"
    ],
    courseMatch: "Ready for our Pro Plan - advanced techniques and workflows."
  },
  advanced: {
    title: "⭐ Prompt Writing Expert",
    subtitle: "You're among the top tier!",
    description: "You have strong prompt writing skills and understand advanced concepts. You could benefit from specialized techniques and business applications.",
    recommendations: [
      "Focus on business-specific prompt strategies",
      "Learn prompt automation and scaling",
      "Master brand voice consistency techniques",
      "Explore advanced AI model capabilities"
    ],
    courseMatch: "Perfect for our Elite Plan - specialized business strategies and 1-on-1 coaching."
  },
  expert: {
    title: "🏆 Prompt Writing Master",
    subtitle: "You're a true AI prompt expert!",
    description: "Exceptional understanding of AI prompt engineering. You're ready to teach others and tackle the most complex prompt challenges.",
    recommendations: [
      "Consider teaching or consulting others",
      "Experiment with cutting-edge AI models",
      "Develop custom prompt frameworks",
      "Focus on industry-specific applications"
    ],
    courseMatch: "You might enjoy our Elite Plan for the community and advanced business applications."
  }
};

export default function AIPromptQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setShowResults(true)
    }
  }

  const handleShowExplanation = () => {
    setShowExplanation(true)
  }

  const getResultProfile = (finalScore) => {
    const percentage = (finalScore / quizQuestions.length) * 100
    if (percentage >= 90) return resultProfiles.expert
    if (percentage >= 75) return resultProfiles.advanced  
    if (percentage >= 60) return resultProfiles.intermediate
    return resultProfiles.beginner
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    // Here you would integrate with your email service
    console.log('Email submitted:', email)
    setEmailSubmitted(true)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setEmail('')
    setEmailSubmitted(false)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = "I just took the AI Prompt Writing Quiz! Test your knowledge:"

  if (showResults) {
    const profile = getResultProfile(score)
    const percentage = Math.round((score / quizQuestions.length) * 100)

    return (
      <Layout
        title="Your AI Prompt Writing Quiz Results | PromptWritingStudio"
        description="Discover your AI prompt writing skill level and get personalized recommendations to improve your results."
      >
        <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
                <div className="text-6xl mb-4">{profile.title.split(' ')[0]}</div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                  {profile.title.substring(2)}
                </h1>
                <p className="text-xl text-[#333333] mb-4">{profile.subtitle}</p>
                <div className="text-5xl font-bold text-[#1A1A1A] mb-2">{percentage}%</div>
                <p className="text-[#666666]">You scored {score} out of {quizQuestions.length} questions correctly</p>
              </div>
            </div>

            {/* Profile Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Your Prompt Writing Profile</h2>
              <p className="text-[#333333] text-lg mb-6">{profile.description}</p>
              
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Recommended Next Steps:</h3>
              <ul className="space-y-2 mb-6">
                {profile.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-[#333333] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-[#333333]">{rec}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#FFDE59] bg-opacity-20 border border-[#FFDE59] rounded-lg p-4">
                <h4 className="font-bold text-[#1A1A1A] mb-2">Perfect Course Match:</h4>
                <p className="text-[#333333] mb-4">{profile.courseMatch}</p>
                <a 
                  href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                  className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Course Options
                </a>
              </div>
            </div>

            {/* Email Capture */}
            {!emailSubmitted ? (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Get Your Detailed Results</h3>
                <p className="text-[#333333] mb-6">
                  Enter your email to receive a detailed breakdown of your results, personalized prompt templates, 
                  and exclusive tips to improve your AI prompt writing skills.
                </p>
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-[#FFDE59]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
                  >
                    Get Results
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl p-8 mb-8">
                <div className="flex items-center mb-4">
                  <FaCheckCircle className="text-[#333333] text-2xl mr-3" />
                  <h3 className="text-2xl font-bold text-[#1A1A1A]">Thank You!</h3>
                </div>
                <p className="text-[#333333]">
                  Check your email for detailed results and personalized recommendations. 
                  Your prompt writing journey starts now! 🚀
                </p>
              </div>
            )}

            {/* Social Sharing */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Share Your Results</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  className="flex items-center bg-[#F9F9F9] text-[#333333] px-6 py-3 rounded-lg hover:bg-[#E5E5E5] transition border border-[#E5E5E5]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="mr-2 text-[#1DA1F2]" />
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  className="flex items-center bg-[#F9F9F9] text-[#333333] px-6 py-3 rounded-lg hover:bg-[#E5E5E5] transition border border-[#E5E5E5]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="mr-2 text-[#0077B5]" />
                  LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  className="flex items-center bg-[#F9F9F9] text-[#333333] px-6 py-3 rounded-lg hover:bg-[#E5E5E5] transition border border-[#E5E5E5]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="mr-2 text-[#1877F2]" />
                  Facebook
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <button
                onClick={restartQuiz}
                className="bg-[#F9F9F9] text-[#333333] px-8 py-3 rounded-lg font-bold hover:bg-[#E5E5E5] transition mr-4 border border-[#E5E5E5]"
              >
                Take Quiz Again
              </button>
              <a
                href="/calculators"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
              >
                Try Our AI Calculators
              </a>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout
      title="AI Prompt Writing Quiz - Test Your Knowledge | PromptWritingStudio"
      description="Take our fun interactive quiz to discover your AI prompt writing skill level and get personalized recommendations to improve your results."
    >
      <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Quiz Header */}
          <div className="text-center mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E5E5E5]">
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                🧠 AI Prompt Writing Quiz
              </h1>
              <p className="text-xl text-[#333333] mb-6">
                Test your knowledge and discover your prompt writing skill level!
              </p>
              <div className="flex justify-center items-center space-x-4">
                <div className="bg-[#FFDE59] bg-opacity-20 px-4 py-2 rounded-lg border border-[#FFDE59]">
                  <span className="text-[#1A1A1A] font-bold">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                </div>
                <div className="flex-1 max-w-md bg-[#E5E5E5] rounded-full h-3">
                  <div 
                    className="bg-[#FFDE59] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">
              {quizQuestions[currentQuestion].question}
            </h2>
            
            <div className="space-y-4 mb-8">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-[#FFDE59] bg-[#FFDE59] bg-opacity-10 text-[#1A1A1A]'
                      : 'border-[#E5E5E5] hover:border-[#E5E5E5] hover:bg-[#F9F9F9]'
                  }`}
                  disabled={showExplanation}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-[#FFDE59] bg-[#FFDE59]'
                        : 'border-[#E5E5E5]'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-3 h-3 rounded-full bg-[#1A1A1A]"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className={`p-4 rounded-lg mb-6 ${
                selectedAnswer === quizQuestions[currentQuestion].correct
                  ? 'bg-[#F9F9F9] border border-[#E5E5E5]'
                  : 'bg-[#F9F9F9] border border-[#E5E5E5]'
              }`}>
                <div className="flex items-center mb-2">
                  {selectedAnswer === quizQuestions[currentQuestion].correct ? (
                    <FaCheckCircle className="text-[#333333] mr-2" />
                  ) : (
                    <FaTimesCircle className="text-[#666666] mr-2" />
                  )}
                  <span className="font-bold text-[#1A1A1A]">
                    {selectedAnswer === quizQuestions[currentQuestion].correct ? 'Correct!' : 'Not quite right.'}
                  </span>
                </div>
                <p className="text-[#333333]">{quizQuestions[currentQuestion].explanation}</p>
                {selectedAnswer !== quizQuestions[currentQuestion].correct && (
                  <p className="text-[#333333] mt-2">
                    <strong>Correct answer:</strong> {quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correct]}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              <div>
                {selectedAnswer !== null && !showExplanation && (
                  <button
                    onClick={handleShowExplanation}
                    className="bg-[#F9F9F9] text-[#333333] px-6 py-3 rounded-lg font-bold hover:bg-[#E5E5E5] transition border border-[#E5E5E5]"
                  >
                    Show Explanation
                  </button>
                )}
              </div>
              <div>
                {(showExplanation || selectedAnswer !== null) && (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
                  >
                    {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Current Score */}
          <div className="text-center">
            <div className="inline-block bg-white rounded-lg shadow border border-[#E5E5E5] px-6 py-3">
              <span className="text-[#666666]">Current Score: </span>
              <span className="font-bold text-[#1A1A1A]">{score} / {currentQuestion + (selectedAnswer !== null ? 1 : 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 