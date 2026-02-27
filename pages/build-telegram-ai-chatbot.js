import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "How much does it cost to build a Telegram AI chatbot?",
    answer: "The Telegram Bot API is completely free. Your main cost is the AI API. OpenAI charges roughly $0.01 to $0.03 per conversation turn with GPT-4o-mini, and $0.01 to $0.10 with GPT-4o depending on message length. Anthropic's Claude Haiku is similarly affordable at roughly $0.25 per million input tokens. For a low-traffic bot handling 100 conversations per day, expect to spend $5 to $30 per month on API costs. Hosting on Replit or Railway starts free and scales to $5 to $20 per month for always-on deployment."
  },
  {
    question: "Do I need to know how to code to build a Telegram AI chatbot?",
    answer: "For the method described in this tutorial, basic familiarity with Node.js or Python is helpful. You do not need to be an expert programmer. If you can copy code, install packages, and edit configuration variables, you can follow along. For a completely no-code approach, platforms like Chatfuel, ManyChat, and Botpress let you build Telegram bots with visual interfaces and no programming required."
  },
  {
    question: "Can I use Claude instead of ChatGPT for my Telegram bot?",
    answer: "Yes. The Anthropic API works as a drop-in replacement for OpenAI in most bot architectures. Instead of calling the OpenAI completions endpoint, you call the Anthropic messages endpoint. The code structure is nearly identical. Claude is particularly strong for bots that need nuanced conversation, detailed analysis, or careful instruction following. We include code examples for both OpenAI and Anthropic in this tutorial."
  },
  {
    question: "How do I keep my Telegram bot running 24/7?",
    answer: "You need to deploy your bot to a server that runs continuously. Free options include Replit (with the Always On feature on paid plans), Railway (free tier includes 500 hours per month), and Render (free tier with some limitations). For production bots, a $5 per month VPS from DigitalOcean, Linode, or Vultr gives you full control and reliable uptime. You can also use serverless functions on AWS Lambda or Vercel, triggered by Telegram webhooks."
  },
  {
    question: "Is it safe to put my OpenAI API key in a Telegram bot?",
    answer: "Never hardcode your API key directly in your source code. Always use environment variables to store sensitive keys. On platforms like Replit, Railway, and Render, you can set environment variables in the dashboard without exposing them in your code. Also set usage limits on your OpenAI or Anthropic account to prevent unexpected charges if your bot gets heavy traffic or is abused."
  },
  {
    question: "Can my Telegram bot remember previous conversations?",
    answer: "Yes, but you need to implement conversation memory. The simplest approach is storing the last N messages in an array and sending them as context with each new API call. For persistent memory across bot restarts, store conversations in a database like SQLite, PostgreSQL, or Redis. Most AI APIs support a messages array where you include previous conversation turns, giving the bot context about what was discussed earlier."
  },
  {
    question: "How many users can my Telegram AI chatbot handle?",
    answer: "Telegram's Bot API can handle thousands of concurrent users. The bottleneck is usually your AI API rate limits and server capacity. OpenAI allows 500 to 10,000 requests per minute depending on your tier. For a bot serving hundreds of users simultaneously, you should implement a message queue and handle API calls asynchronously. Most small to medium bots serving up to 1,000 daily users will work fine with a basic setup."
  },
  {
    question: "Can I train my Telegram bot on my own data or documents?",
    answer: "Yes. The simplest approach is using a system prompt that includes your custom knowledge. For larger knowledge bases, you can implement RAG (Retrieval-Augmented Generation) where your bot searches a vector database of your documents and includes relevant context in each API call. OpenAI also offers fine-tuning for training models on your specific data. For most use cases, a well-crafted system prompt plus RAG is more cost-effective than fine-tuning."
  }
]

const nodeCode = `const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai');

// Initialize Telegram Bot
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Store conversation history per user
const conversations = new Map();

// System prompt - customize this for your bot
const SYSTEM_PROMPT = \`You are a helpful AI assistant for
Prompt Writing Studio. You help users learn about AI
prompt engineering, recommend tools, and answer questions
about using AI effectively. Be concise, practical, and
friendly. If you do not know something, say so honestly.\`;

// Handle incoming messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  // Skip non-text messages
  if (!userMessage) return;

  // Get or create conversation history
  if (!conversations.has(chatId)) {
    conversations.set(chatId, []);
  }
  const history = conversations.get(chatId);

  // Add user message to history
  history.push({ role: 'user', content: userMessage });

  // Keep only last 10 messages for context
  if (history.length > 10) {
    history.splice(0, history.length - 10);
  }

  try {
    // Send typing indicator
    bot.sendChatAction(chatId, 'typing');

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...history
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    const reply = response.choices[0].message.content;

    // Add assistant response to history
    history.push({ role: 'assistant', content: reply });

    // Send reply to user
    bot.sendMessage(chatId, reply);
  } catch (error) {
    console.error('Error:', error.message);
    bot.sendMessage(chatId,
      'Sorry, I encountered an error. Please try again.'
    );
  }
});

console.log('Bot is running...');`

const pythonCode = `import os
import telebot
from anthropic import Anthropic

# Initialize Telegram Bot
bot = telebot.TeleBot(os.environ['TELEGRAM_BOT_TOKEN'])

# Initialize Anthropic (Claude)
client = Anthropic(api_key=os.environ['ANTHROPIC_API_KEY'])

# Store conversation history per user
conversations = {}

# System prompt - customize for your bot
SYSTEM_PROMPT = """You are a helpful AI assistant for
Prompt Writing Studio. You help users learn about AI
prompt engineering, recommend tools, and answer questions
about using AI effectively. Be concise, practical, and
friendly. If you do not know something, say so honestly."""

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    chat_id = message.chat.id
    user_text = message.text

    # Get or create conversation history
    if chat_id not in conversations:
        conversations[chat_id] = []
    history = conversations[chat_id]

    # Add user message
    history.append({
        "role": "user",
        "content": user_text
    })

    # Keep last 10 messages
    if len(history) > 10:
        history = history[-10:]
        conversations[chat_id] = history

    try:
        # Send typing indicator
        bot.send_chat_action(chat_id, 'typing')

        # Call Claude API
        response = client.messages.create(
            model="claude-3-5-haiku-20241022",
            max_tokens=1000,
            system=SYSTEM_PROMPT,
            messages=history
        )

        reply = response.content[0].text

        # Add assistant response to history
        history.append({
            "role": "assistant",
            "content": reply
        })

        # Send reply
        bot.send_message(chat_id, reply)
    except Exception as e:
        print(f"Error: {e}")
        bot.send_message(
            chat_id,
            "Sorry, I encountered an error. "
            "Please try again."
        )

print("Bot is running...")
bot.polling()`

const useCases = [
  {
    title: "Customer Support",
    description: "Build a bot that answers customer questions using your product documentation. Train it on your FAQ, knowledge base, and support articles so it can handle common queries 24/7 without human intervention.",
    example: "A SaaS company bot that answers billing questions, explains features, and troubleshoots common issues."
  },
  {
    title: "FAQ Bot",
    description: "Create a bot that answers frequently asked questions about your business, service, or community. Perfect for reducing repetitive questions in groups and channels.",
    example: "A community bot that answers 'How do I get started?' and 'What are the rules?' without moderator intervention."
  },
  {
    title: "Lead Generation",
    description: "Build a conversational bot that qualifies leads by asking relevant questions and collecting contact information. Connect it to your CRM or email list.",
    example: "A real estate bot that asks about budget, location preferences, and timeline, then sends qualified leads to agents."
  },
  {
    title: "Course Companion",
    description: "Create an AI tutor that helps students understand course material, answers questions about lessons, and provides practice exercises based on your curriculum.",
    example: "A language learning bot that quizzes users on vocabulary, corrects grammar, and provides conversation practice."
  }
]

export default function BuildTelegramAIChatbot() {
  const [copiedCode, setCopiedCode] = useState(null)
  const [activeTab, setActiveTab] = useState('node')
  const [openFaq, setOpenFaq] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'How To Build an AI Chatbot for Telegram [Easy Steps]',
    description: 'Step-by-step tutorial for building an AI-powered Telegram chatbot using Node.js or Python with OpenAI or Anthropic APIs. Includes code examples, deployment guide, and no-code alternatives.',
    url: 'https://promptwritingstudio.com/build-telegram-ai-chatbot',
    datePublished: '2026-02-01',
    dateModified: '2026-02-27',
    keywords: ['how to build AI chatbot Telegram', 'Telegram AI bot tutorial', 'create Telegram chatbot', 'Telegram bot OpenAI', 'Telegram bot Claude', 'AI chatbot tutorial', 'BotFather tutorial']
  })

  return (
    <>
      <Head>
        <title>How To Build an AI Chatbot for Telegram [Easy Steps] | PromptWritingStudio</title>
        <meta name="description" content="Step-by-step tutorial for building an AI-powered Telegram chatbot. Includes code for Node.js and Python, OpenAI and Claude integration, and free deployment options." />
        <meta name="keywords" content="how to build AI chatbot Telegram, Telegram AI bot tutorial, create Telegram chatbot, Telegram bot OpenAI, Telegram bot Claude, BotFather tutorial" />
        <meta property="og:title" content="How To Build an AI Chatbot for Telegram [Easy Steps]" />
        <meta property="og:description" content="Build your own AI chatbot for Telegram with this step-by-step guide. Code examples for Node.js and Python included." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/build-telegram-ai-chatbot" />
        <link rel="canonical" href="https://promptwritingstudio.com/build-telegram-ai-chatbot" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: February 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              How To Build an AI Chatbot
              <span className="block text-[#FFDE59]">for Telegram [Easy Steps]</span>
            </h1>

            {/* AEO Answer Block */}
            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                A Telegram AI chatbot is an automated bot that runs inside Telegram and uses AI models like GPT-4 or Claude to understand and respond to user messages in natural language. You can build one in under an hour using the free Telegram Bot API combined with an AI API from OpenAI or Anthropic. The bot can answer questions, provide customer support, or serve as a personalized AI assistant for your audience.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Follow this step-by-step tutorial to build, customize, and deploy your own AI chatbot on Telegram. No prior bot-building experience required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#steps"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Start the Tutorial
              </a>
              <Link
                href="/best-telegram-ai-chatbots"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                See Best Telegram AI Bots
              </Link>
            </div>
          </div>
        </section>

        {/* What You'll Build Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                What You Will Build
              </h2>
            </div>
            <div className="bg-[#F9F9F9] p-8 rounded-lg border-2 border-[#FFDE59]">
              <p className="text-lg text-[#333333] mb-6">
                By the end of this tutorial, you will have a working Telegram chatbot that:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#FFDE59] font-bold mr-3 mt-1">&#10003;</span>
                  <span className="text-[#333333]">Responds to any user message with intelligent, context-aware AI replies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFDE59] font-bold mr-3 mt-1">&#10003;</span>
                  <span className="text-[#333333]">Remembers conversation history so it can follow multi-turn discussions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFDE59] font-bold mr-3 mt-1">&#10003;</span>
                  <span className="text-[#333333]">Uses a custom system prompt so you control its personality and knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFDE59] font-bold mr-3 mt-1">&#10003;</span>
                  <span className="text-[#333333]">Runs 24/7 on a free or low-cost hosting platform</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFDE59] font-bold mr-3 mt-1">&#10003;</span>
                  <span className="text-[#333333]">Works with either OpenAI (ChatGPT) or Anthropic (Claude) as the AI backend</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prerequisites Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Prerequisites
              </h2>
              <p className="text-xl text-[#333333]">
                What you need before you start
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Telegram Account</h3>
                <p className="text-[#333333]">A free Telegram account. Download the app at telegram.org if you do not have one. You will use Telegram's BotFather to create your bot.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">AI API Key</h3>
                <p className="text-[#333333]">An API key from OpenAI (platform.openai.com) or Anthropic (console.anthropic.com). Both offer free trial credits for new accounts.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Node.js or Python</h3>
                <p className="text-[#333333]">Either Node.js (v18+) or Python (3.9+) installed on your computer. We provide code examples for both languages in this tutorial.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Tutorial */}
        <section id="steps" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Step-by-Step Tutorial
              </h2>
              <p className="text-xl text-[#333333]">
                Follow these 8 steps to build and deploy your Telegram AI chatbot
              </p>
            </div>

            <div className="space-y-12">
              {/* Step 1 */}
              <div className="border-l-4 border-[#FFDE59] pl-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Step 1: Create a Bot with BotFather</h3>
                <p className="text-[#333333] mb-4">
                  BotFather is Telegram's official bot for creating and managing bots. Open Telegram, search for <strong>@BotFather</strong>, and start a conversation.
                </p>
                <div className="bg-[#F9F9F9] p-4 rounded-lg mb-4">
                  <ol className="space-y-2 text-[#333333]">
                    <li>1. Open Telegram and search for <code className="bg-white px-2 py-0.5 rounded text-sm">@BotFather</code></li>
                    <li>2. Send the command <code className="bg-white px-2 py-0.5 rounded text-sm">/newbot</code></li>
                    <li>3. Choose a display name for your bot (e.g., "My AI Assistant")</li>
                    <li>4. Choose a username ending in "bot" (e.g., "my_ai_assistant_bot")</li>
                    <li>5. BotFather will send you an <strong>API token</strong> - save this securely</li>
                  </ol>
                </div>
                <p className="text-sm text-[#666666]">
                  Your API token looks like: <code className="bg-[#F9F9F9] px-2 py-0.5 rounded text-sm">123456789:ABCdefGHIjklMNOpqrSTUvwxYZ</code>. Keep it private. Anyone with this token can control your bot.
                </p>
              </div>

              {/* Step 2 */}
              <div className="border-l-4 border-[#FFDE59] pl-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Step 2: Set Up Your Development Environment</h3>
                <p className="text-[#333333] mb-4">
                  Create a new project folder and initialize it. Choose Node.js or Python based on your preference.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold text-[#1A1A1A] mb-2">Node.js</h4>
                    <code className="text-sm text-[#333333] block">
                      mkdir my-telegram-bot<br />
                      cd my-telegram-bot<br />
                      npm init -y
                    </code>
                  </div>
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold text-[#1A1A1A] mb-2">Python</h4>
                    <code className="text-sm text-[#333333] block">
                      mkdir my-telegram-bot<br />
                      cd my-telegram-bot<br />
                      python -m venv venv<br />
                      source venv/bin/activate
                    </code>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="border-l-4 border-[#FFDE59] pl-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Step 3: Install Dependencies</h3>
                <p className="text-[#333333] mb-4">
                  Install the Telegram bot library and your AI SDK of choice.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold text-[#1A1A1A] mb-2">Node.js + OpenAI</h4>
                    <code className="text-sm text-[#333333] block">
                      npm install node-telegram-bot-api openai
                    </code>
                  </div>
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold text-[#1A1A1A] mb-2">Python + Anthropic</h4>
                    <code className="text-sm text-[#333333] block">
                      pip install pyTelegramBotAPI anthropic
                    </code>
                  </div>
                </div>
              </div>

              {/* Step 4 & 5 - Code Examples */}
              <div className="border-l-4 border-[#FFDE59] pl-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Steps 4 & 5: Write the Bot Code and Connect to AI</h3>
                <p className="text-[#333333] mb-4">
                  Here is the complete bot code. It handles incoming Telegram messages, sends them to the AI API, and returns the response to the user. Choose your preferred language:
                </p>

                {/* Language Tab Switcher */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab('node')}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors duration-200 ${
                      activeTab === 'node'
                        ? 'bg-[#FFDE59] text-[#1A1A1A]'
                        : 'bg-[#F9F9F9] text-[#666666] hover:bg-[#E5E5E5]'
                    }`}
                  >
                    Node.js + OpenAI
                  </button>
                  <button
                    onClick={() => setActiveTab('python')}
                    className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors duration-200 ${
                      activeTab === 'python'
                        ? 'bg-[#FFDE59] text-[#1A1A1A]'
                        : 'bg-[#F9F9F9] text-[#666666] hover:bg-[#E5E5E5]'
                    }`}
                  >
                    Python + Claude
                  </button>
                </div>

                {/* Code Block */}
                <div className="relative">
                  <div className="bg-[#1A1A1A] p-6 rounded-lg overflow-x-auto">
                    <pre className="text-sm text-gray-300 leading-relaxed">
                      <code>{activeTab === 'node' ? nodeCode : pythonCode}</code>
                    </pre>
                  </div>
                  <button
                    onClick={() => copyToClipboard(activeTab === 'node' ? nodeCode : pythonCode, activeTab)}
                    className="absolute top-3 right-3 bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#E5C84F] transition-colors duration-200"
                  >
                    {copiedCode === activeTab ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>

              {/* Step 6 */}
              <div className="border-l-4 border-[#FFDE59] pl-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Step 6: Add Custom Knowledge and System Prompts</h3>
                <p className="text-[#333333] mb-4">
                  The <code className="bg-[#F9F9F9] px-2 py-0.5 rounded text-sm">SYSTEM_PROMPT</code> variable is where you define your bot's personality, knowledge, and behavior rules. This is the most important part of customization.
                </p>
                <div className="bg-[#F9F9F9] p-6 rounded-lg mb-4">
                  <h4 className="font-bold text-[#1A1A1A] mb-3">Tips for effective system prompts:</h4>
                  <ul className="space-y-2 text-[#333333]">
                    <li><strong>Define the role:</strong> "You are a customer support agent for [Company Name]"</li>
                    <li><strong>Set boundaries:</strong> "Only answer questions about our products. For other topics, politely redirect."</li>
                    <li><strong>Include key facts:</strong> Add your pricing, policies, or FAQ answers directly in the prompt</li>
                    <li><strong>Set the tone:</strong> "Be professional but friendly. Use short paragraphs. Avoid jargon."</li>
                    <li><strong>Handle unknowns:</strong> "If you are not sure about something, say 'I am not certain, please contact support@company.com'"</li>
                  </ul>
                </div>
              </div>

              {/* Step 7 */}
              <div className="border-l-4 border-[#FFDE59] pl-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Step 7: Deploy Your Bot</h3>
                <p className="text-[#333333] mb-4">
                  Your bot needs to run on a server to work 24/7. Here are three beginner-friendly options:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold text-[#1A1A1A] mb-2">Replit</h4>
                    <p className="text-[#333333] text-sm mb-2">Upload your code to Replit, set environment variables in the Secrets tab, and click Run. Use the Always On feature (paid) for 24/7 uptime.</p>
                    <a href="https://replit.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">replit.com</a>
                  </div>
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold text-[#1A1A1A] mb-2">Railway</h4>
                    <p className="text-[#333333] text-sm mb-2">Connect your GitHub repo, set environment variables, and deploy. Free tier gives 500 hours per month. Automatic deployments on code push.</p>
                    <a href="https://railway.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">railway.app</a>
                  </div>
                  <div className="bg-[#F9F9F9] p-4 rounded-lg">
                    <h4 className="font-bold text-[#1A1A1A] mb-2">VPS (DigitalOcean)</h4>
                    <p className="text-[#333333] text-sm mb-2">For production bots. $4 to $6 per month for a droplet with full control. Use PM2 (Node.js) or systemd (Python) to keep the bot running.</p>
                    <a href="https://digitalocean.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">digitalocean.com</a>
                  </div>
                </div>
              </div>

              {/* Step 8 */}
              <div className="border-l-4 border-[#FFDE59] pl-6">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Step 8: Test and Iterate</h3>
                <p className="text-[#333333] mb-4">
                  Once deployed, test your bot thoroughly:
                </p>
                <div className="bg-[#F9F9F9] p-6 rounded-lg">
                  <ul className="space-y-2 text-[#333333]">
                    <li><strong>Test basic conversation:</strong> Send simple questions and verify the responses make sense</li>
                    <li><strong>Test multi-turn memory:</strong> Ask a follow-up question that references your previous message</li>
                    <li><strong>Test edge cases:</strong> Send empty messages, very long messages, and non-text content (images, stickers)</li>
                    <li><strong>Test error handling:</strong> Temporarily use an invalid API key to confirm error messages work</li>
                    <li><strong>Refine the system prompt:</strong> Based on test results, adjust your system prompt to improve response quality</li>
                    <li><strong>Monitor costs:</strong> Check your OpenAI or Anthropic dashboard after testing to understand per-message costs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* No-Code Alternatives Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                No-Code Alternatives
              </h2>
              <p className="text-xl text-[#333333]">
                If you prefer building without code, these platforms support Telegram bot creation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Chatfuel</h3>
                <p className="text-[#333333] mb-3">Visual flow builder with Telegram integration. Drag-and-drop interface for creating conversation flows. Supports AI responses via ChatGPT plugin. Best for marketing and lead generation bots.</p>
                <p className="text-sm text-[#666666]">Free tier available. Paid plans from $15/mo.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">ManyChat</h3>
                <p className="text-[#333333] mb-3">Popular no-code bot platform with Telegram support alongside Instagram, WhatsApp, and Messenger. Strong automation features and CRM integrations. Best for e-commerce and customer engagement.</p>
                <p className="text-sm text-[#666666]">Free tier available. Pro from $15/mo.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Botpress</h3>
                <p className="text-[#333333] mb-3">Open-source bot building platform with a visual studio. Advanced NLU (Natural Language Understanding) built in. Supports Telegram, web chat, and other channels. Best for complex conversational AI.</p>
                <p className="text-sm text-[#666666]">Free tier available. Paid plans from $50/mo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Use Cases for Telegram AI Chatbots
              </h2>
              <p className="text-xl text-[#333333]">
                Four practical applications you can build with this tutorial
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-[#F9F9F9] p-8 rounded-lg border border-[#E5E5E5]">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{useCase.title}</h3>
                  <p className="text-[#333333] mb-3">{useCase.description}</p>
                  <p className="text-sm text-[#666666] italic">Example: {useCase.example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Official Documentation and Resources
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <a href="https://core.telegram.org/bots/api" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-lg border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors duration-200 block">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Telegram Bot API Documentation</h3>
                <p className="text-[#333333] text-sm">The official reference for all Bot API methods, types, and updates. Essential for advanced bot features.</p>
                <p className="text-blue-600 text-sm mt-2">core.telegram.org/bots/api</p>
              </a>
              <a href="https://core.telegram.org/bots/tutorial" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-lg border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors duration-200 block">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Telegram BotFather Guide</h3>
                <p className="text-[#333333] text-sm">Official guide for creating bots, setting commands, descriptions, and profile pictures using BotFather.</p>
                <p className="text-blue-600 text-sm mt-2">core.telegram.org/bots/tutorial</p>
              </a>
              <a href="https://platform.openai.com/docs/api-reference" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-lg border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors duration-200 block">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">OpenAI API Reference</h3>
                <p className="text-[#333333] text-sm">Documentation for GPT-4o, GPT-4o-mini, and other OpenAI models. Covers authentication, endpoints, and parameters.</p>
                <p className="text-blue-600 text-sm mt-2">platform.openai.com/docs</p>
              </a>
              <a href="https://docs.anthropic.com/en/docs" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-lg border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors duration-200 block">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Anthropic API Documentation</h3>
                <p className="text-[#333333] text-sm">Documentation for Claude models including messages API, system prompts, and conversation handling.</p>
                <p className="text-blue-600 text-sm mt-2">docs.anthropic.com</p>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-[#333333]">
                Common questions about building Telegram AI chatbots
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#F9F9F9] p-6 rounded-lg shadow-sm border border-[#E5E5E5]">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left flex justify-between items-center"
                  >
                    <h3 className="text-lg font-bold text-[#1A1A1A] pr-4">{faq.question}</h3>
                    <span className="text-[#FFDE59] text-2xl flex-shrink-0">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === index && (
                    <p className="text-[#333333] leading-relaxed mt-3 pt-3 border-t border-[#E5E5E5]">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Master AI Prompt Engineering
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Building a Telegram bot is just the beginning. The real skill is writing system prompts that make your bot actually useful. Learn prompt engineering frameworks, advanced techniques, and real-world applications in our full course.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Get the Full AI Prompt Course
              </Link>
              <Link
                href="/telegram-ai-channel"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Join Free Telegram Channel
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
