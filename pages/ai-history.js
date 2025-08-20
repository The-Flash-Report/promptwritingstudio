import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import Link from 'next/link'

export default function AIHistory() {
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
      period: "Deep Learning Revolution (2017 - 2020s)",
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
          year: "2022",
          event: "ChatGPT launches to public",
          detail: "Conversational AI reaches 100M users in 60 days, bringing AI to mainstream"
        },
        {
          year: "2024",
          event: "Multimodal AI agents emerge",
          detail: "AI systems combine vision, language, and reasoning for complex real-world tasks"
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              The Complete History of
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              From Ancient Greek automata to ChatGPT: Understanding 2,400 years of humanity's quest to create artificial minds
            </p>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto border border-white border-opacity-20">
              <p className="text-lg leading-relaxed">
                Every business leader implementing AI today is part of a story that began with ancient philosophers. 
                Understanding this timeline reveals patterns that help you make smarter AI decisions and avoid repeating historical mistakes.
              </p>
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

      {/* Timeline */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900">
              The Complete AI Timeline
            </h2>
            
            <div className="space-y-16">
              {timelinePeriods.map((period, index) => (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  {index < timelinePeriods.length - 1 && (
                    <div className="absolute left-8 top-24 w-1 h-full bg-gradient-to-b from-blue-200 to-indigo-200 -z-10"></div>
                  )}
                  
                  <div className="flex items-start">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg">
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-6">
                          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                            {period.period}
                          </span>
                          <h3 className="text-3xl font-bold text-slate-900 mt-2">
                            {period.title}
                          </h3>
                          <p className="text-lg text-slate-600 mt-3 leading-relaxed">
                            {period.description}
                          </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {period.events.map((event, eventIndex) => (
                            <div key={eventIndex} className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:bg-slate-100 transition-colors duration-200">
                              <div className="font-semibold text-blue-700 text-sm mb-2">
                                {event.year}
                              </div>
                              <div className="font-medium text-slate-800 mb-2 text-sm">
                                {event.event}
                              </div>
                              <div className="text-xs text-slate-600 leading-relaxed">
                                {event.detail}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              <Link 
                href="/what-is-rag"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all duration-200 transform hover:scale-105"
              >
                What is RAG?
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
    </Layout>
  )
} 