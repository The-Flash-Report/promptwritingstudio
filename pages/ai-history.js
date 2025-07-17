import { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import TypewriterEffect from '../components/ui/TypewriterEffect'
import InteractiveTimeline from '../components/ui/InteractiveTimeline'
import ExpandableTimelineCard from '../components/ui/ExpandableTimelineCard'
import AIHistoryQuiz from '../components/ui/AIHistoryQuiz'
import Link from 'next/link'

export default function AIHistory() {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.pageYOffset / totalHeight) * 100
      setReadingProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const aiTerms = ['ChatGPT', 'Claude', 'Gemini', 'Machine Learning', 'Neural Networks']
  const timelinePeriods = [
    {
      period: "Ancient Origins (384 BC - 1600s)",
      title: "The Dream of Artificial Beings",
      description: "From Greek myths to medieval automatons, humanity has long dreamed of creating artificial intelligence",
      color: "from-purple-600 to-purple-800",
      events: [
        {
          year: "384-322 BC",
          event: "Aristotle develops syllogistic logic",
          detail: "Creates the first formal system of logical reasoning, laying groundwork for computational thinking"
        },
        {
          year: "1st Century",
          event: "Hero of Alexandria creates automatons",
          detail: "Built mechanical devices powered by water and steam, considered early programmable machines"
        },
        {
          year: "1206",
          event: "Al-Jazari's programmable orchestra",
          detail: "Created programmable mechanical human musicians, pioneering automation concepts"
        },
        {
          year: "1275", 
          event: "Ramon Llull invents Ars Magna",
          detail: "Mechanical tool for combining concepts to generate new knowledge - an early information processor"
        },
        {
          year: "1580",
          event: "Rabbi Judah Loew creates the Golem",
          detail: "Legendary clay being brought to life through mystical means, reflecting humanity's desire for artificial servants"
        }
      ]
    },
    {
      period: "Scientific Revolution (1600s - 1800s)",
      title: "Mathematical Foundations",
      description: "The development of mathematics, logic, and mechanical calculation that would make AI possible",
      color: "from-blue-700 to-blue-900",
      events: [
        {
          year: "1642",
          event: "Pascal invents mechanical calculator",
          detail: "First digital calculating machine, proving complex operations could be mechanized"
        },
        {
          year: "1672",
          event: "Leibniz develops binary arithmetic",
          detail: "Creates binary number system and improved calculating machines, fundamental to modern computing"
        },
        {
          year: "1763",
          event: "Thomas Bayes develops probability theory",
          detail: "Publishes work on statistical inference that becomes central to modern machine learning"
        },
        {
          year: "1801",
          event: "Jacquard programmable loom",
          detail: "Uses punched cards to control textile patterns - first programmable machine for industry"
        },
        {
          year: "1854",
          event: "George Boole creates Boolean algebra",
          detail: "Develops mathematical logic that becomes the foundation of computer science and AI reasoning"
        }
      ]
    },
    {
      period: "Computing Era (1900s - 1950s)",
      title: "Electronic Brains Emerge",
      description: "The invention of computers and the theoretical foundations that made artificial intelligence possible",
      color: "from-indigo-600 to-indigo-800",
      events: [
        {
          year: "1910-1913",
          event: "Russell & Whitehead publish Principia Mathematica",
          detail: "Proves mathematics can be reduced to mechanical reasoning in formal logic"
        },
        {
          year: "1936",
          event: "Alan Turing invents Turing Machine",
          detail: "Creates theoretical foundation for all modern computation and artificial intelligence"
        },
        {
          year: "1943",
          event: "McCulloch & Pitts create artificial neurons",
          detail: "First mathematical model of neural networks, connecting brain science to computing"
        },
        {
          year: "1946",
          event: "ENIAC - first electronic computer",
          detail: "Room-sized computer proves electronic calculation is possible, setting stage for AI"
        },
        {
          year: "1950",
          event: "Turing Test proposed",
          detail: "Alan Turing's test for machine intelligence becomes the benchmark for artificial intelligence"
        }
      ]
    },
    {
      period: "Birth of AI (1950s - 1960s)",
      title: "The Dartmouth Dream",
      description: "AI officially emerges as a field, with early breakthroughs and bold predictions",
      color: "from-emerald-600 to-emerald-800",
      events: [
        {
          year: "1956",
          event: "Dartmouth Conference coins 'Artificial Intelligence'",
          detail: "John McCarthy organizes the founding conference of AI as an academic discipline"
        },
        {
          year: "1957",
          event: "Frank Rosenblatt invents the Perceptron",
          detail: "First artificial neural network capable of learning, generates massive media excitement"
        },
        {
          year: "1958",
          event: "John McCarthy creates LISP",
          detail: "Programming language becomes the foundation for AI research for decades"
        },
        {
          year: "1965",
          event: "ELIZA chatbot created",
          detail: "First conversational AI program, demonstrates natural language processing potential"
        },
        {
          year: "1966",
          event: "Shakey the robot",
          detail: "First mobile robot controlled by AI, capable of navigation and planning"
        }
      ]
    },
    {
      period: "First AI Winter (1970s - 1980s)",
      title: "Reality Check and Resurgence",
      description: "Overpromising leads to funding cuts, but research continues and expert systems emerge",
      color: "from-slate-600 to-slate-800",
      events: [
        {
          year: "1973",
          event: "Lighthill Report criticizes AI",
          detail: "British government report leads to massive funding cuts after unmet promises"
        },
        {
          year: "1975",
          event: "Minsky introduces 'frames'",
          detail: "Knowledge representation method that becomes foundation for object-oriented programming"
        },
        {
          year: "1980",
          event: "Expert systems become commercial",
          detail: "R1 system saves Digital Equipment Corporation $40M annually, proving AI's business value"
        },
        {
          year: "1982",
          event: "John Hopfield popularizes neural networks",
          detail: "Hopfield networks revive interest in connectionist approaches to AI"
        },
        {
          year: "1986",
          event: "Backpropagation algorithm rediscovered",
          detail: "Rumelhart, Hinton, and Williams show how to train multi-layer neural networks"
        }
      ]
    },
    {
      period: "AI Boom & Bust (1980s - 1990s)",
      title: "Expert Systems and Second Winter",
      description: "Billion-dollar industry emerges and collapses, but AI continues advancing behind the scenes",
      color: "from-orange-600 to-orange-800",
      events: [
        {
          year: "1985",
          event: "Expert systems industry reaches $1 billion",
          detail: "Companies worldwide deploy rule-based systems for decision support and automation"
        },
        {
          year: "1987",
          event: "AI hardware market collapses",
          detail: "Specialized Lisp machines become obsolete as PCs become more powerful"
        },
        {
          year: "1991",
          event: "Japan's Fifth Generation Project ends",
          detail: "Ambitious AI goals unmet, but project advances parallel computing and logic programming"
        },
        {
          year: "1992",
          event: "TD-Gammon masters backgammon",
          detail: "Neural network using temporal difference learning plays at world championship level"
        },
        {
          year: "1997",
          event: "IBM's Deep Blue defeats Kasparov",
          detail: "Computer beats world chess champion, proving AI can excel at strategic thinking"
        }
      ]
    },
    {
      period: "Modern AI Renaissance (2000s - 2010s)",
      title: "Data-Driven Intelligence",
      description: "Internet-scale data and powerful algorithms enable breakthrough applications",
      color: "from-teal-600 to-teal-800",
      events: [
        {
          year: "2006",
          event: "Geoffrey Hinton pioneers deep learning",
          detail: "Shows how to train deep neural networks, sparking AI revolution"
        },
        {
          year: "2009",
          event: "ImageNet dataset created",
          detail: "Massive visual database enables breakthrough advances in computer vision"
        },
        {
          year: "2011",
          event: "IBM Watson wins Jeopardy!",
          detail: "AI system demonstrates human-level performance at natural language understanding"
        },
        {
          year: "2012",
          event: "AlexNet revolutionizes computer vision",
          detail: "Deep learning achieves dramatic breakthrough in image recognition, sparking AI boom"
        },
        {
          year: "2016",
          event: "AlphaGo defeats Go world champion",
          detail: "AI masters the most complex board game, using deep learning and tree search"
        }
      ]
    },
    {
      period: "Deep Learning Revolution (2017 - 2021)",
      title: "Transformers and Foundation Models",
      description: "Breakthrough architectures enable human-level language understanding and generation",
      color: "from-violet-600 to-violet-800",
      events: [
        {
          year: "2017",
          event: "Transformer architecture invented",
          detail: "Google's 'Attention Is All You Need' paper revolutionizes natural language processing"
        },
        {
          year: "2018",
          event: "BERT advances language understanding",
          detail: "Google's bidirectional encoder achieves breakthrough results across NLP tasks"
        },
        {
          year: "2020",
          event: "GPT-3 demonstrates emergent capabilities",
          detail: "OpenAI's 175B parameter model shows human-like text generation and reasoning"
        },
        {
          year: "2021",
          event: "GitHub Copilot launches",
          detail: "AI-powered code completion proves AI can augment professional work at scale"
        },
        {
          year: "2021",
          event: "DALL-E creates images from text",
          detail: "OpenAI demonstrates AI can generate original images from natural language descriptions"
        }
      ]
    },
    {
      period: "The Great AI Awakening (2022-2024)",
      title: "When AI Went Mainstream",
      description: "The moment artificial intelligence crashed the mainstream party and never left",
      color: "from-rose-600 to-rose-800",
      events: [
        {
          year: "Nov 2022",
          event: "ChatGPT launches to public",
          detail: "Reached 1M users in 5 days, 100M in 2 months - fastest-growing consumer app in history"
        },
        {
          year: "Mar 2023",
          event: "GPT-4 and Claude released same day",
          detail: "OpenAI and Anthropic trigger the 'AI arms race' with competing advanced models"
        },
        {
          year: "Mar 2023",
          event: "Google issues 'Code Red' for Bard",
          detail: "Google founders return to company as ChatGPT threatens search monopoly"
        },
        {
          year: "May 2023",
          event: "ChatGPT plugins ecosystem",
          detail: "AI transforms from chatbot to platform with web browsing, code execution, integrations"
        },
        {
          year: "2024",
          event: "Multimodal AI becomes standard",
          detail: "GPT-4o, Claude 3.7, Gemini all support text, images, audio, and video simultaneously"
        }
      ]
    },
    {
      period: "AI Explosion Era (2024-Present)",
      title: "When Everyone Got Superpowers",
      description: "The year AI stopped being a toy and became a necessity",
      color: "from-emerald-600 to-emerald-800",
      events: [
        {
          year: "2024",
          event: "AI reasoning models emerge",
          detail: "OpenAI's o1 and Claude's reasoning capabilities show AI can 'think' through complex problems"
        },
        {
          year: "2024",
          event: "AI agents take action",
          detail: "Claude Computer Use allows AI to control computers, marking shift from chat to autonomous action"
        },
        {
          year: "2025",
          event: "Hybrid reasoning revolution",
          detail: "Claude 3.7 Sonnet introduces choice between fast responses and deep thinking"
        },
        {
          year: "2025",
          event: "Enterprise AI transformation",
          detail: "AI transitions from experimental tool to core business infrastructure across industries"
        },
        {
          year: "Present",
          event: "AI accessibility revolution",
          detail: "Superhuman AI capabilities available to anyone with a smartphone and $20/month subscription"
        }
      ]
    }
  ]

  const businessInsights = [
    {
      title: "Pattern Recognition Across Eras",
      insight: "Each AI boom follows the same pattern: breakthrough technology → inflated expectations → reality check → practical applications → mainstream adoption.",
      relevance: "Understanding this cycle helps you time AI investments and avoid both hype and premature dismissal."
    },
    {
      title: "The Data Advantage",
      insight: "Modern AI's success comes from the combination of algorithms + data + compute power. Previous AI winters occurred when any of these elements was missing.",
      relevance: "Ensure your AI initiatives have quality data and sufficient computational resources, not just good algorithms."
    },
    {
      title: "Narrow to General Progression", 
      insight: "AI consistently succeeds first in narrow, well-defined domains before expanding to general applications.",
      relevance: "Start with specific business problems where AI has clear success metrics before attempting broader automation."
    },
    {
      title: "Human-AI Collaboration",
      insight: "The most successful AI implementations augment human capabilities rather than completely replacing humans.",
      relevance: "Design AI systems that enhance your team's productivity rather than threatening their roles."
    }
  ]

  const modernContext = {
    title: "Why This Time Is Different",
    points: [
      {
        heading: "Internet-Scale Data",
        description: "Unlike previous eras, we now have access to massive datasets from global digital interactions"
      },
      {
        heading: "Cloud Computing Power", 
        description: "Distributed computing makes advanced AI accessible to businesses of all sizes"
      },
      {
        heading: "Transfer Learning",
        description: "Pre-trained models can be adapted for specific business needs without starting from scratch"
      },
      {
        heading: "API-First Approach",
        description: "AI capabilities are available as services, eliminating the need for deep technical expertise"
      }
    ]
  }

  return (
    <Layout
      title="Complete History of Artificial Intelligence - From Ancient Dreams to Modern Business Reality | PromptWritingStudio"
      description="Explore the complete journey of AI from ancient Greek automata to modern ChatGPT. Discover patterns, business lessons, and insights for entrepreneurs implementing AI today."
    >
      <EnhancedMeta
        title="Complete History of Artificial Intelligence - Ancient Origins to Modern Business"
        description="Comprehensive timeline of AI development from ancient automata to ChatGPT. Essential reading for business leaders seeking to understand AI's evolution and business potential."
        url="https://promptwritingstudio.com/ai-history"
        image="https://promptwritingstudio.com/images/ai-history-preview.jpg"
        type="article"
        publishedTime="2024-01-22T00:00:00Z"
        modifiedTime="2024-01-22T00:00:00Z"
      />
      <OrganizationSchema />

      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-28 relative overflow-hidden">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-900 z-50">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              The Complete History of
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                <TypewriterEffect phrases={aiTerms} />
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed animate-fade-in-up">
              From Ancient Greek automata to modern AI: Understanding 2,400 years of humanity's quest to create artificial minds
            </p>
            
            {/* Enhanced CTA Section */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-cyan-300">🎯 For Business Leaders</h3>
                <p className="text-lg leading-relaxed mb-6">
                  Understand AI patterns to make smarter investment decisions and avoid historical mistakes.
                </p>
                <button 
                  onClick={() => setShowQuiz(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  🧠 Test Your AI Knowledge
                </button>
              </div>
              
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-15 transition-all duration-300 transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-purple-300">📚 For AI Enthusiasts</h3>
                <p className="text-lg leading-relaxed mb-6">
                  Explore the fascinating journey from ancient automata to modern artificial intelligence.
                </p>
                <a 
                  href="#timeline"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 inline-block"
                >
                  🚀 Explore Timeline
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-slate-900">
                  Why AI History Matters for Your Business
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  The story of artificial intelligence isn't just academic history—it's a roadmap for understanding 
                  how revolutionary technologies evolve from impossible dreams to everyday business tools.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Today's AI breakthrough moments echo patterns from centuries past, offering valuable insights 
                  for modern entrepreneurs navigating the current AI revolution.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">
                  🎯 Key Business Insight
                </h3>
                <p className="text-blue-800 leading-relaxed">
                  AI has experienced multiple "winters" and "booms" throughout history. Understanding these cycles 
                  helps you time your AI investments wisely, avoid both premature adoption and missed opportunities, 
                  and recognize which AI applications are likely to succeed versus fail.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-6 text-slate-900">
                The Repeating Patterns of AI Evolution
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔬</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Breakthrough</h4>
                  <p className="text-sm text-slate-600">New technology or algorithm discovered</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Hype</h4>
                  <p className="text-sm text-slate-600">Inflated expectations and bold predictions</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">❄️</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Winter</h4>
                  <p className="text-sm text-slate-600">Reality check leads to funding cuts</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <h4 className="font-semibold text-slate-800 mb-2">Adoption</h4>
                  <p className="text-sm text-slate-600">Practical applications drive mainstream use</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section id="timeline" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                The Complete AI Timeline
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Click on any era to explore the key breakthroughs, failures, and lessons that shaped artificial intelligence. 
                Each period reveals patterns that help modern businesses understand AI's evolution.
              </p>
            </div>
            
            {/* Interactive Navigation Timeline */}
            <InteractiveTimeline 
              periods={timelinePeriods}
              activeIndex={activeTimelineIndex}
              onPeriodSelect={setActiveTimelineIndex}
            />
            
            {/* Expandable Timeline Cards */}
            <div className="space-y-0">
              {timelinePeriods.map((period, index) => (
                <ExpandableTimelineCard
                  key={index}
                  period={period}
                  index={index}
                  isActive={activeTimelineIndex === index}
                  onToggle={setActiveTimelineIndex}
                />
              ))}
            </div>

            {/* Timeline Summary Stats */}
            <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-slate-900">
                🏆 AI History at a Glance
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2,400+</div>
                  <div className="text-sm text-blue-700">Years of AI Dreams</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-sm text-purple-700">Key Breakthroughs</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                  <div className="text-sm text-green-700">AI Winters Survived</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                  <div className="text-3xl font-bold text-orange-600 mb-2">100M+</div>
                  <div className="text-sm text-orange-700">ChatGPT Users in 60 Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quiz Section */}
      {showQuiz && (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  🧠 Test Your AI History Knowledge
                </h2>
                <p className="text-lg text-slate-600">
                  Put your understanding to the test with our interactive quiz about AI history milestones!
                </p>
                <button
                  onClick={() => setShowQuiz(false)}
                  className="mt-4 text-slate-500 hover:text-slate-700 underline"
                >
                  Skip Quiz →
                </button>
              </div>
              <AIHistoryQuiz 
                onComplete={(results) => {
                  console.log('Quiz completed:', results)
                  // You could track this with analytics
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Modern AI Deep Dive */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900">
              The Modern AI Revolution: A Deeper Look
            </h2>
            
            {/* November 30, 2022: The Day That Changed Everything */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100 mb-8">
                <h3 className="text-3xl font-bold mb-6 text-red-900">
                  November 30, 2022: The Day That Changed Everything
                </h3>
                <p className="text-lg text-red-800 mb-6 leading-relaxed">
                  OpenAI quietly released ChatGPT, and the world collectively lost its mind. In just 5 days, it hit 1 million users. 
                  Two months later? 100 million monthly active users - making it the fastest-growing consumer app in history. 
                  For context, TikTok took 9 months to reach that milestone.
                </p>
                <div className="bg-white bg-opacity-60 rounded-lg p-6 border border-red-200">
                  <h4 className="font-bold text-red-900 mb-3">🎯 Why This Mattered</h4>
                  <p className="text-red-800 leading-relaxed">
                    ChatGPT wasn't just another tech product—it was the first AI that felt genuinely conversational. 
                    No more clunky interfaces or robotic responses. This was AI that could crack jokes, admit mistakes, 
                    and have actual conversations.
                  </p>
                </div>
              </div>
            </div>

            {/* The AI Arms Race */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-slate-900">
                The "Oh Snap" Moment for Big Tech
              </h3>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h4 className="text-xl font-bold mb-4 text-blue-900">
                    🚨 Google's Code Red
                  </h4>
                  <p className="text-blue-800 leading-relaxed mb-4">
                    When ChatGPT launched, Google executives reportedly issued a "code red" alert. CEO Sundar Pichai called 
                    emergency meetings, and Google co-founders Larry Page and Sergey Brin—who had stepped down from day-to-day 
                    operations—suddenly returned to help with the AI crisis.
                  </p>
                  <p className="text-sm text-blue-700 font-medium">
                    The Panic Was Real: ChatGPT represented an existential threat to Google's search monopoly.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-100">
                  <h4 className="text-xl font-bold mb-4 text-purple-900">
                    ⚔️ March 2023: Battle of the Bots
                  </h4>
                  <ul className="text-purple-800 space-y-2 text-sm">
                    <li><strong>March 14:</strong> OpenAI drops GPT-4, making ChatGPT even smarter</li>
                    <li><strong>March 14:</strong> Anthropic launches Claude (yes, the same day!)</li>
                    <li><strong>March 21:</strong> Google fires back with Bard</li>
                    <li><strong>March 23:</strong> OpenAI introduces plugins, turning ChatGPT into a super-app</li>
                  </ul>
                  <p className="text-sm text-purple-700 font-medium mt-4">
                    Plot Twist: Italy became the first country to ban ChatGPT over privacy concerns.
                  </p>
                </div>
              </div>
            </div>

            {/* The Business Revolution */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-slate-900">
                How AI Transformed Work
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h4 className="font-bold text-green-900 mb-3">💼 The Productivity Boom</h4>
                  <ul className="text-green-800 text-sm space-y-2">
                    <li>• Writers used AI to overcome writer's block</li>
                    <li>• Programmers used AI to debug code and write functions</li>
                    <li>• Marketers used AI to create campaigns and analyze data</li>
                    <li>• Students used AI to... well, let's not go there</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-100">
                  <h4 className="font-bold text-yellow-900 mb-3">💳 The Subscription Economy</h4>
                  <p className="text-yellow-800 text-sm">
                    ChatGPT Plus launched at $20/month, proving people would pay for better AI. 
                    Soon, everyone had AI subscriptions alongside their Netflix and Spotify.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-3">🏢 The Enterprise Invasion</h4>
                  <p className="text-indigo-800 text-sm">
                    OpenAI launched ChatGPT Enterprise, promising businesses that their data wouldn't be used for training. 
                    Suddenly, Fortune 500 companies were integrating AI into everything.
                  </p>
                </div>
              </div>
            </div>

            {/* Cultural Phenomenon */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-slate-900">
                The Cultural Phenomenon
              </h3>
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-slate-900">🎭 AI Becomes Internet Culture</h4>
                    <ul className="text-slate-700 space-y-2">
                      <li>• People shared hilarious AI-generated images</li>
                      <li>• "ChatGPT, write me a..." became a meme format</li>
                      <li>• AI detection tools became as common as spell-checkers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-slate-900">🤔 The Big Scary Questions</h4>
                    <ul className="text-slate-700 space-y-2">
                      <li>• Will AI replace human jobs?</li>
                      <li>• Can AI be creative?</li>
                      <li>• Are we creating something we can't control?</li>
                      <li>• Why does AI sometimes make stuff up?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Current AI Landscape */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-slate-900">
                The Current AI Landscape (2025)
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-4">1. OpenAI</h4>
                  <p className="text-blue-800 text-sm">Still the market leader with ChatGPT and the most recognizable AI brand</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="font-bold text-purple-900 mb-4">2. Anthropic</h4>
                  <p className="text-purple-800 text-sm">The safety-focused challenger with Claude, known for thoughtful responses</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                  <h4 className="font-bold text-red-900 mb-4">3. Google</h4>
                  <p className="text-red-800 text-sm">The search giant with Gemini, leveraging their massive data advantage</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
                <h4 className="text-2xl font-bold mb-6 text-emerald-900">
                  🚀 The Feature Wars: Every AI Needs Everything
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="text-emerald-800 space-y-3">
                      <li><strong>Web Search:</strong> Claude finally got web search in March 2025</li>
                      <li><strong>Code Execution:</strong> All major AIs can now run code</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="text-emerald-800 space-y-3">
                      <li><strong>Image Generation:</strong> Built-in image creation became standard</li>
                      <li><strong>Voice Conversations:</strong> Natural speech became the norm</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* What Made This Era Special */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-slate-900">
                What Made This Era Special
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-3">💬 The Conversation Revolution</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">
                      Previous AI required expertise to use. ChatGPT, Claude, and Gemini felt like chatting with a really smart friend who happened to know everything.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                    <h4 className="font-bold text-green-900 mb-3">🌍 The Accessibility Breakthrough</h4>
                    <p className="text-green-800 text-sm leading-relaxed">
                      You didn't need to be a programmer or researcher. Anyone with a smartphone could access superhuman intelligence.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                    <h4 className="font-bold text-purple-900 mb-3">🎨 The Creative Explosion</h4>
                    <p className="text-purple-800 text-sm leading-relaxed">
                      These weren't just tools—they were creative collaborators. Writers, artists, musicians, and creators found new ways to push boundaries.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                    <h4 className="font-bold text-orange-900 mb-3">⚡ The Productivity Multiplier</h4>
                    <p className="text-orange-800 text-sm leading-relaxed">
                      Complex tasks that once took hours could be done in minutes. Research, writing, coding, and analysis became accessible to everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Looking Forward */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-8 text-center">
                Looking Forward: The Next Chapter
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                  <h4 className="font-bold text-blue-200 mb-3">🤖 The Agent Revolution</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    The next frontier is AI agents that can perform tasks independently, with Claude already showing "computer use" capabilities.
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                  <h4 className="font-bold text-blue-200 mb-3">🎯 The Multimodal Future</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Future AI will seamlessly work with text, images, audio, video, and 3D content—making current interfaces look primitive.
                  </p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                  <h4 className="font-bold text-blue-200 mb-3">🔗 The Integration Era</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    The future isn't about visiting AI websites—it's about AI being built into every app, device, and service we use.
                  </p>
                </div>
              </div>
              <div className="text-center bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                <p className="text-sm opacity-90 leading-relaxed italic">
                  The story of modern AI is still being written. Every conversation with ChatGPT, every creative project with Claude, 
                  and every search with Gemini is part of humanity's ongoing experiment with artificial intelligence. We're not just 
                  using these tools—we're teaching them, and they're teaching us what it means to think, create, and collaborate in the age of AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Insights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900">
              Business Lessons from AI History
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {businessInsights.map((insight, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                  <h3 className="text-xl font-bold mb-4 text-blue-900">
                    {insight.title}
                  </h3>
                  <p className="text-blue-800 mb-6 leading-relaxed">
                    {insight.insight}
                  </p>
                  <div className="bg-white bg-opacity-60 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-700 font-medium">
                      💡 Business Application: {insight.relevance}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-green-900">
                  ✅ What Successful AI Adopters Did Right
                </h3>
                <ul className="space-y-3 text-green-800">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    Started with specific, well-defined problems with clear ROI
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    Focused on augmenting human capabilities, not replacing them
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    Invested heavily in data quality and preparation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    Built internal AI expertise gradually through training
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    Measured results rigorously and iterated quickly
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-3 mt-1">•</span>
                    Maintained realistic expectations about AI capabilities
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-red-900">
                  ❌ Historical Mistakes to Avoid
                </h3>
                <ul className="space-y-3 text-red-800">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    Over-promising on AI capabilities and timeline
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    Trying to automate everything at once without focus
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    Ignoring the importance of human expertise and oversight
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    Underestimating implementation complexity and costs
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    Following hype cycles instead of business value
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-3 mt-1">•</span>
                    Neglecting data privacy and ethical considerations
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Context */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              {modernContext.title}
            </h2>
            
            <p className="text-xl mb-12 opacity-90 leading-relaxed max-w-4xl mx-auto">
              We're currently in the most accessible AI era in history. Unlike previous AI winters that required 
              specialized hardware and expertise, today's AI tools can be implemented by any business owner 
              with the right knowledge and approach.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {modernContext.points.map((point, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
                  <h3 className="text-lg font-bold mb-4 text-blue-200">
                    {point.heading}
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white border-opacity-20">
              <h3 className="text-3xl font-bold mb-6">
                🚀 The Current AI Revolution
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <h4 className="font-bold text-blue-200 mb-3">Foundation Models</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Pre-trained models like GPT-4 and Claude provide general intelligence that can be adapted 
                    for specific business needs without training from scratch.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-200 mb-3">Multimodal Capabilities</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Modern AI can process text, images, audio, and video simultaneously, enabling 
                    rich business applications across all media types.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-blue-200 mb-3">Agent-Based Systems</h4>
                  <p className="text-sm opacity-90 leading-relaxed">
                    AI agents can now perform complex multi-step tasks autonomously, from research 
                    and analysis to content creation and customer service.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/calculators/ai-cost-comparison"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Calculate Your AI ROI
              </Link>
              <Link 
                href="/ai-glossary"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all duration-200 transform hover:scale-105"
              >
                Learn AI Terms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-slate-50 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-slate-900 text-center">
              Continue Your AI Journey
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Link 
                href="/ai-glossary"
                className="group bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <h4 className="font-bold text-blue-600 mb-3 group-hover:text-blue-700">📚 AI Glossary</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Essential AI terms every business owner should know, explained in plain English
                </p>
              </Link>
              <Link 
                href="/calculators"
                className="group bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <h4 className="font-bold text-blue-600 mb-3 group-hover:text-blue-700">🧮 AI Calculators</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Calculate potential savings and ROI from AI implementation in your business
                </p>
              </Link>
              <Link 
                href="/ai-prompt-generator"
                className="group bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <h4 className="font-bold text-blue-600 mb-3 group-hover:text-blue-700">✨ AI Tools</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Free AI prompt generators and business tools to get started today
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles for Enhanced Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Smooth hover effects for cards */
        .timeline-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .timeline-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        /* Custom scrollbar for timeline */
        .timeline-container::-webkit-scrollbar {
          width: 8px;
        }

        .timeline-container::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        .timeline-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }

        .timeline-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }

        /* Enhanced typing cursor effect */
        .typing-effect::after {
          content: '|';
          animation: blink 1s infinite;
          color: #22d3ee;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* Pulse effect for interactive elements */
        .pulse-on-hover:hover {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Enhanced gradient animations */
        .gradient-animation {
          background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #ec4899, #06b6d4);
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </Layout>
  )
} 