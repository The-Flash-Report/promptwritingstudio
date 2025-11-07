import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Head from 'next/head'

// Quiz questions data
const quizQuestions = [
  {
    id: 1,
    question: "How specific are your prompts?",
    type: "multiple-choice",
    options: [
      { id: 'a', text: "Very vague (e.g., 'Help me with marketing')", score: 1 },
      { id: 'b', text: "Somewhat specific (e.g., 'Write a marketing email')", score: 2 },
      { id: 'c', text: "Detailed (e.g., 'Write a marketing email to SaaS customers about a new feature')", score: 3 },
      { id: 'd', text: "Extremely detailed with context, audience, and desired outcome", score: 4 }
    ],
    category: "specificity"
  },
  {
    id: 2,
    question: "Do you provide context in your prompts?",
    type: "multiple-choice",
    options: [
      { id: 'a', text: "Never - I just ask for what I want", score: 1 },
      { id: 'b', text: "Sometimes - when I remember to", score: 2 },
      { id: 'c', text: "Usually - I include some background", score: 3 },
      { id: 'd', text: "Always - I provide detailed context, audience, and constraints", score: 4 }
    ],
    category: "context"
  },
  {
    id: 3,
    question: "How do you handle follow-up questions from the AI?",
    type: "multiple-choice",
    options: [
      { id: 'a', text: "I get frustrated and start over with a new prompt", score: 1 },
      { id: 'b', text: "I answer briefly and hope for the best", score: 2 },
      { id: 'c', text: "I provide clarification and additional context", score: 3 },
      { id: 'd', text: "I use it as an opportunity to refine and improve the output", score: 4 }
    ],
    category: "iteration"
  },
  {
    id: 4,
    question: "What's your biggest challenge with AI responses?",
    type: "multiple-choice",
    options: [
      { id: 'a', text: "They're too generic and not useful", score: 1 },
      { id: 'b', text: "They don't match my tone or style", score: 2 },
      { id: 'c', text: "They're close but need significant editing", score: 3 },
      { id: 'd', text: "They're good but could be more tailored to my specific use case", score: 4 }
    ],
    category: "output-quality"
  },
  {
    id: 5,
    question: "How do you structure your prompts?",
    type: "multiple-choice",
    options: [
      { id: 'a', text: "One long sentence with everything mixed together", score: 1 },
      { id: 'b', text: "A paragraph explaining what I need", score: 2 },
      { id: 'c', text: "Separate sentences for different requirements", score: 3 },
      { id: 'd', text: "Clear sections with role, task, context, and format specifications", score: 4 }
    ],
    category: "structure"
  },
  {
    id: 6,
    question: "Do you specify the desired output format?",
    type: "multiple-choice",
    options: [
      { id: 'a', text: "Never - I let the AI decide", score: 1 },
      { id: 'b', text: "Sometimes - for specific tasks like lists", score: 2 },
      { id: 'c', text: "Usually - I mention if I want bullets, paragraphs, etc.", score: 3 },
      { id: 'd', text: "Always - I specify length, format, tone, and structure", score: 4 }
    ],
    category: "format"
  },
  {
    id: 7,
    question: "How do you handle multiple requirements in one prompt?",
    type: "multiple-choice",
    options: [
      { id: 'a', text: "I mention everything at once and hope it works", score: 1 },
      { id: 'b', text: "I prioritize the most important requirement", score: 2 },
      { id: 'c', text: "I break them into numbered points", score: 3 },
      { id: 'd', text: "I separate prompts or use clear hierarchical structure", score: 4 }
    ],
    category: "complexity"
  },
  {
    id: 8,
    question: "What do you do when the AI gives you the wrong type of response?",
    type: "multiple-choice",
    options: [
      { id: 'a', text: "Accept it and try to make it work", score: 1 },
      { id: 'b', text: "Ask it to try again with the same prompt", score: 2 },
      { id: 'c', text: "Clarify what went wrong and what I actually need", score: 3 },
      { id: 'd', text: "Analyze why it misunderstood and improve my prompt structure", score: 4 }
    ],
    category: "troubleshooting"
  }
];

// Diagnostic results based on score ranges
const getDiagnosticResult = (totalScore, categoryScores) => {
  const averageScore = totalScore / quizQuestions.length;
  
  if (averageScore >= 3.5) {
    return {
      level: "Advanced Prompt Engineer",
      color: "green",
      summary: "You're already using advanced prompting techniques effectively!",
      mainIssues: [
        "Fine-tuning for specific use cases",
        "Advanced prompt chaining techniques",
        "Platform-specific optimization"
      ],
      recommendations: [
        "Experiment with role-based prompting for even better results",
        "Try prompt chaining for complex multi-step tasks",
        "Focus on platform-specific optimizations (ChatGPT vs Claude vs Gemini)",
        "Consider building custom prompt templates for recurring tasks"
      ],
      quickFix: "Your prompts are already strong. Focus on creating reusable templates for your most common tasks."
    };
  } else if (averageScore >= 2.5) {
    return {
      level: "Intermediate Prompter",
      color: "yellow",
      summary: "You understand the basics but have room for improvement in key areas.",
      mainIssues: [
        "Inconsistent context provision",
        "Limited output format specification",
        "Ineffective iteration strategies"
      ],
      recommendations: [
        "Always include context: audience, purpose, constraints, and desired outcome",
        "Specify exact output format: length, structure, tone, and style",
        "Use numbered requirements to avoid confusion",
        "Practice the 'Role-Task-Context-Format' prompt structure"
      ],
      quickFix: "Start every prompt with: 'You are a [ROLE]. Your task is to [TASK]. Context: [CONTEXT]. Output format: [FORMAT].'"
    };
  } else {
    return {
      level: "Beginner Prompter",
      color: "red",
      summary: "Your prompts are too vague and lack essential elements for good AI responses.",
      mainIssues: [
        "Extremely vague requests",
        "No context or background provided",
        "Poor handling of AI follow-up questions",
        "No output format specification"
      ],
      recommendations: [
        "Be specific: instead of 'help with marketing', say 'write a 150-word email to existing customers about our new product launch'",
        "Always provide context: who is your audience, what's the purpose, what constraints exist",
        "Specify the format: length, tone, structure, and style you want",
        "Use the AI's follow-up questions to improve your prompts"
      ],
      quickFix: "Before hitting send, ask yourself: WHO is this for, WHAT exactly do I want, WHY am I asking, and HOW should it be formatted?"
    };
  }
};

export default function PromptDiagnosticQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (questionId, answerId, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { answerId, score }
    }));

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0);
    
    // Calculate category scores
    const categoryScores = {};
    quizQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer && question.category) {
        if (!categoryScores[question.category]) {
          categoryScores[question.category] = { total: 0, count: 0 };
        }
        categoryScores[question.category].total += answer.score;
        categoryScores[question.category].count += 1;
      }
    });

    return getDiagnosticResult(totalScore, categoryScores);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const results = quizCompleted ? calculateResults() : null;

  return (
    <>
      <Head>
        <title>AI Prompt Diagnostic Quiz - Why Aren't Your Prompts Working? | PromptWritingStudio</title>
        <meta name="description" content="Take our free diagnostic quiz to discover why your AI prompts aren't working. Get personalized recommendations to improve your ChatGPT, Claude, and Gemini results." />
        <meta name="keywords" content="AI prompt diagnostic, ChatGPT not working, improve AI prompts, prompt engineering quiz, fix AI responses, better ChatGPT results" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Prompt Diagnostic Quiz - Why Aren't Your Prompts Working?" />
        <meta property="og:description" content="Take our free diagnostic quiz to discover why your AI prompts aren't working. Get personalized recommendations to improve your results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://promptwritingstudio.com/tools/prompt-diagnostic-quiz" />
        
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Quiz",
              "name": "AI Prompt Diagnostic Quiz",
              "description": "Interactive quiz to diagnose problems with AI prompt effectiveness and provide personalized improvement recommendations",
              "url": "https://promptwritingstudio.com/tools/prompt-diagnostic-quiz",
              "educationalLevel": "Beginner to Advanced",
              "timeRequired": "PT5M",
              "author": {
                "@type": "Organization",
                "name": "PromptWritingStudio",
                "url": "https://promptwritingstudio.com"
              },
              "publisher": {
                "@type": "Organization", 
                "name": "PromptWritingStudio",
                "url": "https://promptwritingstudio.com"
              },
              "about": {
                "@type": "Thing",
                "name": "AI Prompt Engineering",
                "description": "The art and science of crafting effective prompts for artificial intelligence systems"
              },
              "teaches": [
                "AI prompt optimization",
                "ChatGPT prompt engineering", 
                "Claude prompt techniques",
                "Gemini prompt strategies"
              ],
              "interactionStatistic": {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/CommentAction",
                "userInteractionCount": 1500
              }
            })
          }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-red-600 to-orange-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              🔍 AI Prompt Diagnostic Quiz
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-4xl mx-auto">
              Discover exactly why your AI prompts aren't working and get personalized 
              recommendations to 10x your results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg">
                ⏱️ Takes 3 minutes • 📧 Free detailed report
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        {!showResults && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-red-600 h-3 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {quizQuestions[currentQuestion].question}
                </h2>
                
                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(quizQuestions[currentQuestion].id, option.id, option.score)}
                      className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors group"
                    >
                      <span className="text-gray-900 group-hover:text-red-700">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Results Section */}
        {showResults && results && (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Results Header */}
              <div className={`bg-gradient-to-r ${
                results.color === 'green' ? 'from-green-500 to-green-600' :
                results.color === 'yellow' ? 'from-yellow-500 to-orange-500' :
                'from-red-500 to-red-600'
              } rounded-lg p-8 text-white text-center mb-8`}>
                <h2 className="text-3xl font-bold mb-4">
                  Your Prompt Skill Level: {results.level}
                </h2>
                <p className="text-xl opacity-90">
                  {results.summary}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Main Issues */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-red-600">
                    🚫 Main Issues Identified
                  </h3>
                  <ul className="space-y-2">
                    {results.mainIssues.map((issue, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span className="text-gray-700">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Fix */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-green-600">
                    ⚡ Quick Fix
                  </h3>
                  <p className="text-gray-700 bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    {results.quickFix}
                  </p>
                </div>
              </div>

              {/* Detailed Recommendations */}
              <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">
                  📋 Personalized Recommendations
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {results.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course CTA Section */}
              <div className="mt-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg p-8 text-white text-center">
                <h3 className="text-3xl font-bold mb-4">
                  🚀 Ready to Master AI Prompting?
                </h3>
                <p className="text-xl mb-6 opacity-90">
                  Get step-by-step training, templates, and advanced techniques to transform your AI results
                </p>
                <div className="space-y-4">
                  <a
                    href="https://newsletter.becomeawritertoday.com/products/prompt-writing-studio"
                    className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
                  >
                    🎯 Get Advanced AI Prompt Training
                  </a>
                  <p className="text-sm opacity-75">
                    Join 2,000+ professionals who've mastered AI prompting
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={restartQuiz}
                    className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Retake Quiz
                  </button>
                  <a
                    href="/ai-prompt-examples"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                  >
                    See Example Prompts
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {!showResults && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center mb-12">
                What You'll Discover
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-3">Exact Problem Areas</h3>
                  <p className="text-gray-600">
                    Identify the specific issues preventing your prompts from working effectively
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">🛠️</div>
                  <h3 className="text-xl font-semibold mb-3">Actionable Solutions</h3>
                  <p className="text-gray-600">
                    Get step-by-step recommendations tailored to your current skill level
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-xl font-semibold mb-3">Measurable Improvement</h3>
                  <p className="text-gray-600">
                    Most users see 5-10x better results within a week of implementing our recommendations
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  )
} 