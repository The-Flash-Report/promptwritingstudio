import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "What is the difference between a custom GPT, a Gemini Gem, and a Claude Project?",
    answer: "Custom GPTs are personalized chatbots you build inside ChatGPT using instructions, knowledge files, and optional API actions. Gemini Gems are custom AI personas you create in Google Gemini with system instructions and deep Google Workspace integration. Claude Projects are persistent workspaces in Claude where you add custom instructions, upload knowledge files, and set style preferences. All three let you create specialized AI agents, but they differ in customization depth, sharing options, and ecosystem integration."
  },
  {
    question: "Do I need a paid subscription to create custom AI agents?",
    answer: "Yes, all three platforms require a paid plan. Custom GPTs require ChatGPT Plus ($20 per month) or a Team or Enterprise plan. Gemini Gems require Gemini Advanced ($19.99 per month) as part of Google One AI Premium. Claude Projects require Claude Pro ($20 per month) or a Team plan. None of these features are available on free tiers."
  },
  {
    question: "Can I share my custom GPT, Gem, or Claude Project with others?",
    answer: "Custom GPTs offer the most sharing flexibility. You can share them via a direct link, publish them to the GPT Store for anyone to discover, or keep them private. Gemini Gems can be shared with a link, but there is no public marketplace. Claude Projects cannot be shared publicly at all. They are limited to your personal account or your team workspace."
  },
  {
    question: "How many knowledge files can I upload to each platform?",
    answer: "Custom GPTs allow up to 20 files with a total size limit of approximately 512 MB. Claude Projects support uploading files up to 200,000 tokens of context (roughly 150,000 words across all files). Gemini Gems currently have more limited file upload capabilities and rely more heavily on system instructions and Google Workspace integration for knowledge."
  },
  {
    question: "Which platform is best for creating a customer support bot?",
    answer: "Custom GPTs are the strongest option for customer support bots because they support API actions, allowing your bot to look up order statuses, check inventory, or interact with your CRM in real time. Gemini Gems work well if your support operations run on Google Workspace. Claude Projects are better suited for internal support and knowledge management rather than customer-facing bots."
  },
  {
    question: "Can I connect my custom AI agent to external APIs or tools?",
    answer: "Custom GPTs support custom actions, which let you connect to any external API using an OpenAPI specification. This is a powerful feature for building agents that interact with databases, CRMs, or other services. Gemini Gems integrate deeply with Google Workspace but do not support arbitrary external API connections. Claude Projects do not currently support external API connections, focusing instead on knowledge-based assistance."
  },
  {
    question: "What is the best platform for a writing assistant?",
    answer: "Claude Projects is the strongest choice for a dedicated writing assistant. Claude excels at long-form writing, nuanced editing, and maintaining consistent voice and tone. You can upload style guides, sample content, and brand guidelines as knowledge files and set detailed style preferences. Custom GPTs are a close second, especially if you need your writing assistant to also generate images with DALL-E or browse the web for research."
  },
  {
    question: "How do I write good instructions for my custom AI agent?",
    answer: "Effective instructions follow a consistent pattern across all platforms: start with a clear role definition (who the agent is), define the scope (what it should and should not do), set the tone and style, provide specific rules for handling edge cases, and include example interactions. Be specific rather than vague. Instead of saying 'be helpful,' say 'respond to every question with a direct answer in the first sentence, followed by supporting details in bullet points.'"
  },
  {
    question: "Can I use custom AI agents for my business without coding?",
    answer: "Yes, all three platforms are designed for non-technical users. Creating a custom GPT, Gemini Gem, or Claude Project requires no coding at all. You write natural language instructions, upload documents, and configure settings through a visual interface. The only exception is if you want to add custom API actions to a GPT, which requires basic understanding of API endpoints and JSON formatting."
  },
  {
    question: "Which platform offers the best value for money?",
    answer: "All three platforms cost approximately $20 per month. The best value depends on your ecosystem. If you already pay for Google One, Gemini Advanced adds Gems at no additional cost. If you need the widest range of capabilities including image generation, web browsing, and code execution, ChatGPT Plus with custom GPTs offers the most features. If your primary need is writing, analysis, or working with large documents, Claude Pro with Projects gives you the largest context window and strongest reasoning capabilities."
  }
]

const comparisonData = [
  { feature: "Platform", gpt: "OpenAI / ChatGPT", gem: "Google / Gemini", claude: "Anthropic / Claude" },
  { feature: "Feature Name", gpt: "Custom GPTs", gem: "Gems", claude: "Projects" },
  { feature: "Required Plan", gpt: "ChatGPT Plus ($20/mo)", gem: "Gemini Advanced ($19.99/mo)", claude: "Claude Pro ($20/mo)" },
  { feature: "Knowledge Upload", gpt: "Up to 20 files, ~512 MB total", gem: "Limited file support", claude: "Up to 200K tokens (~150K words)" },
  { feature: "Custom Instructions", gpt: "Detailed system prompt", gem: "System instructions", claude: "Custom instructions + style preferences" },
  { feature: "API / Actions", gpt: "Yes (OpenAPI spec)", gem: "No (Google integrations only)", claude: "No" },
  { feature: "Web Browsing", gpt: "Yes (toggleable)", gem: "Yes (built-in)", claude: "No" },
  { feature: "Image Generation", gpt: "Yes (DALL-E)", gem: "Yes (Imagen)", claude: "No" },
  { feature: "Code Execution", gpt: "Yes (Code Interpreter)", gem: "Yes (limited)", claude: "No (analysis only)" },
  { feature: "Public Sharing", gpt: "Yes (GPT Store + links)", gem: "Yes (links only)", claude: "No (team only)" },
  { feature: "Context Window", gpt: "128K tokens", gem: "1M+ tokens", claude: "200K tokens" },
  { feature: "Ecosystem Integration", gpt: "Third-party APIs", gem: "Google Workspace (Docs, Sheets, Gmail)", claude: "Standalone" },
  { feature: "Best For", gpt: "Versatile agents with API connections", gem: "Google Workspace automation", claude: "Writing, analysis, large documents" }
]

const promptTemplates = [
  {
    id: 'gpt-customer-support',
    title: 'Custom GPT: Customer Support Agent',
    platform: 'ChatGPT',
    prompt: `You are a customer support specialist for [Company Name]. Your role is to help customers resolve issues quickly and professionally.

## Core Behavior
- Always greet the customer warmly and acknowledge their concern in the first sentence
- Ask clarifying questions before providing solutions
- Provide step-by-step instructions when troubleshooting
- If you cannot resolve an issue, explain clearly what the next step is (escalation to human agent, email follow-up, etc.)

## Tone and Style
- Professional but friendly, never robotic
- Use short paragraphs and bullet points for clarity
- Avoid jargon unless the customer uses it first
- Mirror the customer's level of formality

## Knowledge Scope
- You have access to the uploaded product documentation, FAQ database, and troubleshooting guides
- If a question falls outside your knowledge, say: "I want to make sure I give you accurate information. Let me connect you with our specialist team for this specific issue."
- Never make up product features, pricing, or policies

## Rules
- Never share internal processes or employee information
- Do not offer discounts or refunds unless documented in the uploaded policies
- Always confirm the customer's issue is resolved before ending the conversation
- Log every interaction topic for quality tracking`
  },
  {
    id: 'gpt-writing-assistant',
    title: 'Custom GPT: Writing Assistant',
    platform: 'ChatGPT',
    prompt: `You are a professional writing assistant specializing in clear, engaging content for business professionals.

## Core Behavior
- When given a topic, always ask about the target audience, desired tone, and word count before writing
- Produce clean, scannable content with clear headings and short paragraphs
- Use active voice and concrete language over passive voice and abstractions
- Every piece of content should have a clear thesis or main takeaway

## Writing Standards
- Paragraphs: 2-4 sentences maximum
- Sentences: Vary length but favor 15-20 words on average
- Headings: Use action-oriented or benefit-driven headings
- Transitions: Connect ideas naturally between sections
- Jargon: Define any technical terms on first use

## Editing Mode
When asked to edit existing content:
1. First identify the three biggest issues (clarity, structure, or engagement)
2. Explain each issue with a specific example from the text
3. Provide the revised version with changes highlighted in bold
4. Explain why each change improves the writing

## Content Types You Excel At
- Blog posts and articles (500-2,000 words)
- Email newsletters
- LinkedIn posts and social media content
- Executive summaries and reports
- Product descriptions and landing page copy`
  },
  {
    id: 'gem-workspace-assistant',
    title: 'Gemini Gem: Google Workspace Productivity Assistant',
    platform: 'Gemini',
    prompt: `You are a Google Workspace productivity expert. Your role is to help users get more done with Google Docs, Sheets, Slides, Gmail, and Calendar.

## Core Behavior
- When a user describes a task, first identify which Google Workspace tool is best suited for it
- Provide specific, actionable instructions with exact menu paths and keyboard shortcuts
- Suggest automation opportunities using Google Apps Script when appropriate
- Offer templates and formatting best practices for each tool

## Areas of Expertise
- Google Sheets: Formulas, pivot tables, data validation, conditional formatting, QUERY function, importrange
- Google Docs: Formatting, collaboration features, add-ons, voice typing, version history
- Gmail: Filters, labels, templates, scheduling, search operators
- Google Slides: Design principles, master slides, animations, speaker notes
- Google Calendar: Scheduling, time blocking, appointment slots, shared calendars

## Response Format
1. Direct answer to the question
2. Step-by-step instructions (numbered)
3. Pro tip or shortcut that saves time
4. Related feature the user might not know about

## Rules
- Always provide Google-specific solutions first before suggesting third-party tools
- Include keyboard shortcuts for both Mac (Cmd) and Windows (Ctrl)
- When suggesting formulas, explain what each part does
- If a task requires Google Apps Script, provide the complete code with comments`
  },
  {
    id: 'gem-research-analyst',
    title: 'Gemini Gem: Research Analyst',
    platform: 'Gemini',
    prompt: `You are a research analyst who helps professionals gather, synthesize, and present information effectively.

## Core Behavior
- When given a research topic, first define the scope: What specific questions need answering? What is the decision this research supports?
- Present findings in a structured format with executive summary, key findings, supporting evidence, and recommendations
- Distinguish clearly between facts, expert opinions, and your own analysis
- Always note the limitations of available information

## Research Process
1. Clarify the research question and desired outcome
2. Identify the most relevant and credible sources
3. Synthesize information across multiple sources
4. Highlight contradictions or gaps in available data
5. Present actionable conclusions

## Output Formats
- Executive Brief: 1 page, key findings and recommendations only
- Full Report: Structured with sections, citations, and appendix
- Comparison Matrix: Side-by-side analysis of options
- SWOT Analysis: Strengths, weaknesses, opportunities, threats

## Quality Standards
- Cite sources and note when information may be outdated
- Use data and statistics to support claims where possible
- Present multiple perspectives on controversial or complex topics
- Flag assumptions explicitly`
  },
  {
    id: 'claude-content-strategist',
    title: 'Claude Project: Content Strategist',
    platform: 'Claude',
    prompt: `You are a content strategist who helps plan, create, and optimize content for business growth.

## Role
You serve as a senior content strategist with expertise in SEO, content marketing, audience development, and editorial planning. You help transform business goals into content strategies that drive measurable results.

## Core Behavior
- Start every content discussion by asking: Who is the audience? What action should they take? What stage of the buyer journey is this for?
- Recommend content formats based on the topic, audience, and distribution channel
- Every piece of content advice should connect back to a business objective
- Provide specific, actionable recommendations rather than general best practices

## Content Planning
When asked to create a content plan:
1. Define the content pillar or theme
2. Map topics to buyer journey stages (awareness, consideration, decision)
3. Suggest primary and secondary keywords for each piece
4. Recommend content format (blog, video script, newsletter, social post)
5. Propose a publishing schedule with dependencies

## Writing Guidelines
- Use the uploaded brand voice guide and style preferences for all content
- Headlines: Specific, benefit-driven, include the primary keyword naturally
- Introductions: Hook in the first sentence, promise a clear takeaway, keep under 100 words
- Body: Use the inverted pyramid structure, most important information first
- CTAs: One clear call to action per piece, aligned with the content goal

## SEO Standards
- Primary keyword in title, H1, first paragraph, and meta description
- Secondary keywords distributed naturally in H2s and body text
- Internal links to related content on the site
- External links to authoritative sources only`
  },
  {
    id: 'claude-code-reviewer',
    title: 'Claude Project: Code Reviewer',
    platform: 'Claude',
    prompt: `You are a senior software engineer conducting thorough, constructive code reviews.

## Role
You review code with the goal of improving quality, maintainability, and team learning. You are not a gatekeeper but a collaborator who helps developers write better code.

## Review Process
For every code review:
1. Understand the purpose: What problem does this code solve?
2. Check correctness: Does it work as intended? Are there edge cases?
3. Evaluate readability: Can another developer understand this in 6 months?
4. Assess performance: Are there obvious bottlenecks or unnecessary operations?
5. Verify security: Are there input validation, authentication, or data exposure concerns?

## Feedback Format
- **Critical**: Must fix before merging (bugs, security issues, data loss risks)
- **Suggestion**: Would improve the code but not blocking (refactoring, naming, patterns)
- **Nitpick**: Minor style or preference issues (formatting, comments)
- **Praise**: Call out things done well to reinforce good practices

## Communication Style
- Be specific: "This function could throw a null reference on line 42 when user.address is undefined" not "Check for nulls"
- Explain why: Always explain the reasoning behind a suggestion
- Offer alternatives: Show how you would write it differently
- Ask questions: "Is this intentional?" is better than "This is wrong"
- Be kind: Remember there is a human on the other end

## Standards
- Follow the project's existing patterns and conventions documented in the uploaded style guide
- Prioritize consistency over personal preference
- Focus on logic and architecture, not formatting (that is what linters are for)`
  }
]

export default function CustomAIAgents() {
  const [copiedPrompt, setCopiedPrompt] = useState(null)
  const [activeTab, setActiveTab] = useState('gpt')

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedPrompt(id)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'How to Create Custom GPTs, Gemini Gems, and Claude Projects: The Complete Guide (2026)',
    description: 'Learn how to create custom AI agents on ChatGPT, Google Gemini, and Claude. Step-by-step tutorials, comparison table, prompt templates, and best practices for Custom GPTs, Gemini Gems, and Claude Projects.',
    url: 'https://promptwritingstudio.com/custom-ai-agents',
    datePublished: '2026-02-01',
    dateModified: '2026-02-27',
    keywords: ['custom GPT', 'how to create custom GPT', 'custom Gemini Gems', 'Claude Projects tutorial', 'custom AI agents guide', 'GPT Builder', 'Gem Manager', 'AI agent comparison']
  })

  return (
    <>
      <Head>
        <title>How to Create Custom GPTs, Gemini Gems, and Claude Projects (2026) | PromptWritingStudio</title>
        <meta name="description" content="The complete guide to creating custom AI agents. Step-by-step tutorials for Custom GPTs (ChatGPT), Gemini Gems (Google), and Claude Projects (Anthropic) with comparison table, prompt templates, and best practices." />
        <meta name="keywords" content="custom GPT, how to create custom GPT, custom Gemini Gems, Claude Projects tutorial, custom AI agents guide, GPT Builder, Gem Manager, AI agent comparison 2026" />
        <meta property="og:title" content="How to Create Custom GPTs, Gemini Gems & Claude Projects: Complete Guide (2026)" />
        <meta property="og:description" content="Step-by-step tutorials for building custom AI agents on ChatGPT, Google Gemini, and Claude. Includes comparison table, prompt templates, and best practices." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/custom-ai-agents" />
        <link rel="canonical" href="https://promptwritingstudio.com/custom-ai-agents" />
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
              How to Create Custom AI Agents:
              <span className="block text-[#FFDE59]">GPTs, Gemini Gems, and Claude Projects</span>
            </h1>

            {/* Answer Block - AEO */}
            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Custom AI agents let you build specialized chatbots without any coding. Custom GPTs (ChatGPT) offer the most features, including API connections, image generation, and a public store. Gemini Gems (Google) excel at Google Workspace integration. Claude Projects (Anthropic) provide the best writing quality and largest knowledge base capacity. All three require a paid plan at approximately $20 per month. Choose based on your ecosystem and primary use case.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              The definitive guide to building, configuring, and deploying custom AI agents across all three major platforms. Includes step-by-step tutorials, prompt templates, and a head-to-head comparison.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#comparison"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                See Platform Comparison
              </a>
              <a
                href="#templates"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Get Prompt Templates
              </a>
            </div>
          </div>
        </section>

        {/* What Are Custom AI Agents */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              What Are Custom AI Agents?
            </h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                Custom AI agents are personalized versions of large language models that you configure to behave in specific ways. Instead of getting a generic chatbot that tries to do everything, you create a focused assistant that knows your business, follows your rules, and speaks in your voice.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                Think of it this way: a standard AI chatbot is a general-purpose intern on their first day. A custom AI agent is a trained specialist who has read your handbook, knows your processes, and understands exactly how you want things done.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                All three major AI platforms now offer their own version of this concept:
              </p>

              <div className="grid md:grid-cols-3 gap-6 my-8">
                <div className="bg-[#F9F9F9] p-6 rounded-lg border-t-4 border-[#10A37F]">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Custom GPTs</h3>
                  <p className="text-sm text-[#666666] mb-3">OpenAI / ChatGPT</p>
                  <p className="text-[#333333]">
                    The most mature platform. Build chatbots with custom instructions, knowledge files, API actions, and DALL-E image generation. Share publicly through the GPT Store.
                  </p>
                </div>
                <div className="bg-[#F9F9F9] p-6 rounded-lg border-t-4 border-[#4285F4]">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Gemini Gems</h3>
                  <p className="text-sm text-[#666666] mb-3">Google</p>
                  <p className="text-[#333333]">
                    Deep Google Workspace integration. Create AI personas that work natively with Docs, Sheets, Gmail, and Calendar. Ideal for teams already in the Google ecosystem.
                  </p>
                </div>
                <div className="bg-[#F9F9F9] p-6 rounded-lg border-t-4 border-[#D97706]">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Claude Projects</h3>
                  <p className="text-sm text-[#666666] mb-3">Anthropic</p>
                  <p className="text-[#333333]">
                    Best for writing and analysis. Upload large knowledge bases, set detailed style preferences, and get the most nuanced, well-reasoned responses of any platform.
                  </p>
                </div>
              </div>

              <p className="text-lg text-[#333333]">
                Below, I break down each platform in detail: how to create an agent step by step, what works, what does not, and which one is right for your specific needs.
              </p>
            </div>
          </div>
        </section>

        {/* Custom GPTs Deep Dive */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-4">
              <span className="bg-[#10A37F] text-white text-sm font-bold px-4 py-1 rounded-full">CUSTOM GPTs</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              Custom GPTs (OpenAI / ChatGPT): The Complete Guide
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                Custom GPTs are the most feature-rich custom AI agents available. Launched in November 2023 and significantly expanded since, they let you create specialized chatbots that combine custom instructions, uploaded knowledge, API integrations, web browsing, image generation, and code execution in a single agent.
              </p>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">What Are Custom GPTs?</h3>
              <p className="text-[#333333] mb-6">
                A custom GPT is a tailored version of ChatGPT that follows your specific instructions, has access to your uploaded documents, and can optionally connect to external services through API actions. Once created, it lives in your ChatGPT sidebar and behaves exactly as you configured it every time you open a conversation.
              </p>
              <p className="text-[#333333] mb-6">
                Unlike a standard ChatGPT conversation where you paste your instructions every time, a custom GPT remembers its role, rules, and knowledge permanently. It is the difference between briefing a contractor before every task and hiring a full-time employee who already knows the playbook.
              </p>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">How to Create a Custom GPT: Step by Step</h3>

              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#10A37F] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Open GPT Builder</h4>
                      <p className="text-[#333333]">
                        Go to <strong>chat.openai.com</strong> and click <strong>"Explore GPTs"</strong> in the sidebar, then click <strong>"Create"</strong> in the top right. You need a ChatGPT Plus subscription ($20 per month) or higher. The GPT Builder interface has two tabs: <strong>Create</strong> (conversational setup) and <strong>Configure</strong> (manual setup). I recommend starting in the Configure tab for more control.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#10A37F] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Set the Name and Description</h4>
                      <p className="text-[#333333]">
                        Give your GPT a clear, descriptive name that signals its purpose. The description appears when others discover your GPT, so make it specific. Example: instead of "Marketing Helper," use "B2B SaaS Email Campaign Writer" so users immediately know what it does and whether it matches their needs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#10A37F] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Write Your Instructions</h4>
                      <p className="text-[#333333] mb-3">
                        This is the most important step. Your instructions define the GPT's personality, behavior, knowledge scope, and rules. The Instructions field accepts up to about 8,000 characters. Structure your instructions with clear sections:
                      </p>
                      <ul className="list-disc pl-5 text-[#333333] space-y-1">
                        <li><strong>Role definition:</strong> Who is this agent? What is its expertise?</li>
                        <li><strong>Behavioral rules:</strong> How should it respond? What should it avoid?</li>
                        <li><strong>Output format:</strong> Should it use bullet points, tables, specific lengths?</li>
                        <li><strong>Edge cases:</strong> What should it do when it does not know something?</li>
                        <li><strong>Conversation starters:</strong> What questions should it ask first?</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#10A37F] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Upload Knowledge Files</h4>
                      <p className="text-[#333333]">
                        Upload up to 20 files that your GPT can reference during conversations. Supported formats include PDF, DOCX, TXT, CSV, JSON, and more. This is how you give your GPT domain-specific knowledge: product documentation, FAQs, style guides, process documents, pricing sheets, or research papers. The GPT uses retrieval to search these files when relevant to a user's question.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#10A37F] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">5</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Configure Capabilities</h4>
                      <p className="text-[#333333] mb-3">
                        Toggle the built-in capabilities your GPT needs:
                      </p>
                      <ul className="list-disc pl-5 text-[#333333] space-y-1">
                        <li><strong>Web Browsing:</strong> Lets the GPT search the internet for current information</li>
                        <li><strong>DALL-E Image Generation:</strong> Lets the GPT create images from text descriptions</li>
                        <li><strong>Code Interpreter:</strong> Lets the GPT write and execute Python code, analyze data files, and create charts</li>
                      </ul>
                      <p className="text-[#333333] mt-3">
                        Only enable what your GPT actually needs. A customer support bot probably does not need image generation. A data analysis agent definitely needs Code Interpreter.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#10A37F] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">6</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Add Custom Actions (Optional)</h4>
                      <p className="text-[#333333]">
                        Actions connect your GPT to external APIs. You define an OpenAPI specification (a JSON or YAML file describing API endpoints), and your GPT can call those APIs during conversations. This is how you build agents that check order statuses in Shopify, create tickets in Jira, look up contacts in HubSpot, or query your own database. Actions are the most powerful feature of custom GPTs but require some technical knowledge to set up.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#10A37F] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">7</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Test and Publish</h4>
                      <p className="text-[#333333]">
                        Use the preview panel on the right side of GPT Builder to test your agent in real time. Ask it questions that test edge cases, not just the happy path. When satisfied, click <strong>"Save"</strong> and choose your sharing setting: <strong>Only me</strong> (private), <strong>Anyone with a link</strong> (semi-public), or <strong>Everyone</strong> (listed in the GPT Store).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Best Practices for Custom GPT Instructions</h3>
              <ul className="list-disc pl-5 text-[#333333] space-y-2 mb-8">
                <li><strong>Be specific about what the GPT should NOT do.</strong> Constraints are more reliable than open-ended directives. "Never provide medical diagnoses" is clearer than "be careful with health topics."</li>
                <li><strong>Include example interactions.</strong> Show the GPT a sample user question and your ideal response. This grounds the behavior more effectively than abstract rules.</li>
                <li><strong>Define the first message.</strong> Use Conversation Starters to guide users into providing the information your GPT needs to help them.</li>
                <li><strong>Structure instructions with markdown headers.</strong> The model processes structured instructions more reliably than wall-of-text paragraphs.</li>
                <li><strong>Iterate based on real use.</strong> Your first version will have gaps. Use it for a week, note where it fails, and refine the instructions.</li>
              </ul>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Example Use Cases for Custom GPTs</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Customer Support Bot</h4>
                  <p className="text-sm text-[#333333]">Upload your FAQ database and product docs. Add API actions to check order status. The GPT handles tier-1 support questions 24/7, escalating complex issues to humans.</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Writing Assistant</h4>
                  <p className="text-sm text-[#333333]">Upload your brand voice guide and sample content. The GPT writes blog posts, emails, and social media content that matches your established tone and style.</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Research Analyst</h4>
                  <p className="text-sm text-[#333333]">Enable web browsing and Code Interpreter. Upload your research framework. The GPT searches the web, analyzes data, creates visualizations, and produces structured reports.</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Course Companion</h4>
                  <p className="text-sm text-[#333333]">Upload course materials and lesson plans. Students interact with the GPT to get explanations, quiz themselves, and work through exercises at their own pace.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Limitations of Custom GPTs</h3>
              <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-8">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Requires ChatGPT Plus ($20/mo).</strong> Free-tier users cannot create or use custom GPTs.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>No free API access.</strong> Using custom GPTs through the API requires separate API billing, which can be expensive at scale.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Knowledge file retrieval is imperfect.</strong> The GPT does not always find the right information in uploaded files, especially with large or complex documents.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Instructions can be jailbroken.</strong> Determined users can sometimes get the GPT to reveal its system instructions. Do not put sensitive information in the instructions field.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Limited analytics.</strong> You get basic usage counts but no detailed analytics on how users interact with your GPT.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>GPT Store discovery is limited.</strong> Publishing to the GPT Store does not guarantee users will find your GPT. Discoverability depends on SEO, reviews, and category ranking.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Gemini Gems Deep Dive */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-4">
              <span className="bg-[#4285F4] text-white text-sm font-bold px-4 py-1 rounded-full">GEMINI GEMS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              Gemini Gems (Google): The Complete Guide
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                Gemini Gems are Google's answer to custom AI agents. Introduced in 2024 as part of Gemini Advanced, Gems let you create custom AI personas with specific instructions that persist across conversations. Where Gems really stand out is their native integration with Google Workspace, making them the clear choice for anyone whose workflow lives in Google's ecosystem.
              </p>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">What Are Gemini Gems?</h3>
              <p className="text-[#333333] mb-6">
                A Gem is a custom version of Gemini that follows your instructions every time you start a conversation with it. You define the Gem's personality, expertise, response style, and rules. Unlike a regular Gemini chat where you paste your context each time, a Gem retains its configuration permanently and is accessible from your Gem library with one click.
              </p>
              <p className="text-[#333333] mb-6">
                Gems also benefit from Gemini's massive context window (over 1 million tokens), which means they can process extremely long documents, entire codebases, or lengthy conversation histories without losing track of earlier context.
              </p>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">How to Create a Gemini Gem: Step by Step</h3>

              <div className="space-y-6 mb-8">
                <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#4285F4] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Open Gem Manager</h4>
                      <p className="text-[#333333]">
                        Go to <strong>gemini.google.com</strong> and look for the <strong>"Gem manager"</strong> option in the left sidebar. You need Gemini Advanced ($19.99 per month), which is part of the Google One AI Premium plan. This plan also includes 2 TB of Google storage and Gemini features across Google Workspace apps. Click <strong>"New Gem"</strong> to start building.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#4285F4] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Name Your Gem</h4>
                      <p className="text-[#333333]">
                        Choose a name that clearly communicates the Gem's purpose. Google provides some pre-built Gems as examples (Learning Coach, Brainstormer, Career Guide), but creating your own from scratch gives you full control. The name appears in your sidebar and is what you click to start a conversation with that Gem.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#4285F4] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Write System Instructions</h4>
                      <p className="text-[#333333] mb-3">
                        The system instructions field is where you define everything about your Gem's behavior. This is equivalent to the Instructions field in GPT Builder. Structure your instructions clearly:
                      </p>
                      <ul className="list-disc pl-5 text-[#333333] space-y-1">
                        <li><strong>Identity:</strong> Who is this Gem? What is its area of expertise?</li>
                        <li><strong>Response style:</strong> How should it communicate? Formal or casual? Brief or detailed?</li>
                        <li><strong>Task focus:</strong> What specific tasks should it handle?</li>
                        <li><strong>Constraints:</strong> What should it avoid doing or saying?</li>
                        <li><strong>Google integration notes:</strong> Mention which Google tools it should reference or suggest</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#4285F4] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Leverage Google Workspace Integration</h4>
                      <p className="text-[#333333]">
                        This is where Gems differentiate themselves. Gemini can access your Google Drive files, reference Gmail conversations, pull data from Google Sheets, and help with Google Docs editing. When writing your Gem's instructions, you can direct it to pull context from specific Google Workspace data. For example, a sales reporting Gem can be instructed to always reference the latest data from a specific Google Sheet.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#4285F4] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">5</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Test Your Gem</h4>
                      <p className="text-[#333333]">
                        Click <strong>"Save"</strong> and then open a conversation with your Gem. Test it with a variety of prompts, including questions that fall outside its intended scope. Pay attention to whether it follows your instructions consistently. If it drifts from your intended behavior, go back and add more specific constraints or examples to the system instructions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#4285F4] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">6</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Share (Optional)</h4>
                      <p className="text-[#333333]">
                        You can share your Gem with others via a direct link. Recipients need Gemini Advanced to use it. There is no public marketplace like the GPT Store, so sharing is limited to people you directly send the link to. This makes Gems more suited for internal team use than public-facing applications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Best Practices for Gemini Gems</h3>
              <ul className="list-disc pl-5 text-[#333333] space-y-2 mb-8">
                <li><strong>Lean into Google Workspace integration.</strong> If your Gem does not use Google tools, you are not leveraging the platform's unique advantage. A Gem that only uses text instructions is functionally similar to a custom GPT with fewer features.</li>
                <li><strong>Use the massive context window strategically.</strong> Gemini's 1M+ token context window means you can paste entire documents directly into conversations. Reference these in your instructions.</li>
                <li><strong>Keep instructions focused.</strong> Gems work best when they have a clear, narrow purpose. A "do everything" Gem will underperform compared to five specialized Gems.</li>
                <li><strong>Reference specific Google features.</strong> Instruct your Gem to suggest Google-specific solutions: "When the user needs a spreadsheet, provide the Google Sheets formula, not the Excel equivalent."</li>
                <li><strong>Test with real workflows.</strong> Try your Gem in actual work scenarios, not just synthetic test questions.</li>
              </ul>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Example Use Cases for Gemini Gems</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-[#F9F9F9] p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Google Workspace Automation</h4>
                  <p className="text-sm text-[#333333]">A Gem that helps you automate tasks across Google Docs, Sheets, and Gmail. Ask it to draft emails based on spreadsheet data, format documents, or create meeting agendas from Calendar events.</p>
                </div>
                <div className="bg-[#F9F9F9] p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Research Assistant</h4>
                  <p className="text-sm text-[#333333]">Leverage Gemini's web access and massive context window to research topics thoroughly. The Gem can search the web, synthesize findings, and help you organize research in Google Docs.</p>
                </div>
                <div className="bg-[#F9F9F9] p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Data Analyst</h4>
                  <p className="text-sm text-[#333333]">Connect the Gem to your Google Sheets data. Ask it to analyze trends, suggest formulas, create pivot table instructions, and explain data patterns in plain language.</p>
                </div>
                <div className="bg-[#F9F9F9] p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Meeting Preparation Coach</h4>
                  <p className="text-sm text-[#333333]">A Gem that reviews your calendar, pulls relevant documents from Drive, and prepares briefing notes before important meetings. It can also draft follow-up emails after the meeting ends.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Limitations of Gemini Gems</h3>
              <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-8">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Requires Gemini Advanced ($19.99/mo).</strong> Part of Google One AI Premium. Free Gemini users cannot create or use Gems.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Fewer customization options than Custom GPTs.</strong> No custom API actions, no file uploads to the Gem itself (you rely on Drive integration instead), and no equivalent of Code Interpreter.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>No public marketplace.</strong> You cannot publish Gems for public discovery. Sharing is limited to direct links.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Google ecosystem dependency.</strong> Gems are most valuable if you use Google Workspace. If your team uses Microsoft 365 or other tools, the main advantage of Gems disappears.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Less mature than Custom GPTs.</strong> The feature launched later and has seen fewer updates. The customization interface is simpler but also more limited.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Instructions can be inconsistently followed.</strong> Gemini sometimes drifts from system instructions more than GPT-4 or Claude, especially with complex or multi-part rules.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Claude Projects Deep Dive */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="mb-4">
              <span className="bg-[#D97706] text-white text-sm font-bold px-4 py-1 rounded-full">CLAUDE PROJECTS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              Claude Projects (Anthropic): The Complete Guide
            </h2>

            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                Claude Projects are Anthropic's approach to custom AI workspaces. Rather than building a standalone chatbot like a custom GPT, you create a persistent workspace where Claude has access to your documents, follows your custom instructions, and writes in your preferred style. Projects are designed for deep, ongoing work rather than quick one-off interactions.
              </p>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">What Are Claude Projects?</h3>
              <p className="text-[#333333] mb-6">
                A Claude Project is a dedicated workspace where you configure Claude's behavior for a specific purpose. Each Project has its own set of custom instructions, uploaded knowledge files, and style preferences. When you open a Project and start a conversation, Claude automatically has access to all the context you have added, without you needing to re-upload or re-explain anything.
              </p>
              <p className="text-[#333333] mb-6">
                What makes Projects unique is the combination of Claude's strong writing and reasoning abilities with a generous knowledge base (up to 200,000 tokens of project knowledge). Claude is widely considered the best AI model for writing quality, nuanced analysis, and following complex instructions faithfully. Projects let you harness these strengths in a persistent, organized way.
              </p>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">How to Create a Claude Project: Step by Step</h3>

              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#D97706] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">1</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Create a New Project</h4>
                      <p className="text-[#333333]">
                        Go to <strong>claude.ai</strong> and click <strong>"Projects"</strong> in the left sidebar, then <strong>"Create Project."</strong> You need a Claude Pro subscription ($20 per month) or a Team plan. Give your Project a descriptive name and an optional description. The description is for your own reference and helps you organize multiple Projects.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#D97706] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">2</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Write Custom Instructions</h4>
                      <p className="text-[#333333] mb-3">
                        Click the <strong>"Set custom instructions"</strong> field within your Project. These instructions tell Claude how to behave in every conversation within this Project. Claude is excellent at following detailed, multi-section instructions. Structure yours like this:
                      </p>
                      <ul className="list-disc pl-5 text-[#333333] space-y-1">
                        <li><strong>Role and expertise:</strong> Define who Claude should be in this Project</li>
                        <li><strong>Knowledge scope:</strong> What topics to cover and what to defer on</li>
                        <li><strong>Response format:</strong> Length, structure, tone, use of headers and lists</li>
                        <li><strong>Interaction style:</strong> Should Claude ask questions first? Provide options? Give direct answers?</li>
                        <li><strong>Quality standards:</strong> Specific criteria for what a good response looks like</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#D97706] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">3</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Upload Knowledge Files</h4>
                      <p className="text-[#333333]">
                        Add files to your Project by clicking <strong>"Add content"</strong> in the Project knowledge section. Claude supports PDF, TXT, CSV, and other text-based formats. You can upload up to 200,000 tokens of knowledge (roughly 150,000 words), which is enough for extensive documentation, style guides, research papers, or entire book manuscripts. Claude reads these files directly into its context window, meaning it can reference them accurately without the retrieval inconsistencies that sometimes affect GPTs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#D97706] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">4</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Set Style Preferences</h4>
                      <p className="text-[#333333]">
                        Claude Projects let you configure style preferences that affect how Claude writes across all conversations in the Project. This is separate from the custom instructions and specifically controls writing output: tone (formal, casual, academic), level of detail (concise, thorough, comprehensive), and specific formatting preferences. This feature is particularly valuable for writers and content teams who need consistent voice across all AI-generated content.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#D97706] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">5</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Start Conversations</h4>
                      <p className="text-[#333333]">
                        Open a new chat within your Project. Claude now has access to all your uploaded files, follows your custom instructions, and writes in your specified style. Each conversation within a Project is separate, but they all share the same knowledge base and instructions. You can have multiple ongoing conversations in a single Project, each exploring different aspects of the same domain.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#D97706] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">6</span>
                    <div>
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Iterate and Refine</h4>
                      <p className="text-[#333333]">
                        After using your Project for several conversations, refine the custom instructions based on what works and what does not. You can update knowledge files, adjust style preferences, and modify instructions at any time. Changes take effect in new conversations immediately. Claude Projects are designed for ongoing, evolving work rather than set-and-forget configurations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Best Practices for Claude Projects</h3>
              <ul className="list-disc pl-5 text-[#333333] space-y-2 mb-8">
                <li><strong>Upload high-quality reference documents.</strong> Claude reads project files directly into its context window rather than using retrieval. This means the quality and organization of your files directly affects response quality. Well-structured documents with clear headings produce better results than raw data dumps.</li>
                <li><strong>Use style preferences for writing consistency.</strong> If you are using Claude for content creation, upload sample pieces that exemplify your brand voice. Reference them in your instructions: "Match the tone and structure of the sample articles in the project knowledge."</li>
                <li><strong>Create separate Projects for different domains.</strong> A "Blog Writing" Project and a "Technical Documentation" Project will each perform better than a single "Writing" Project trying to do both.</li>
                <li><strong>Take advantage of the large context window.</strong> Claude's 200K token context window means you can upload comprehensive reference materials. Do not be afraid to include detailed examples, style guides, and extensive documentation.</li>
                <li><strong>Be explicit about what Claude should ask before acting.</strong> Claude tends to be helpful and will produce output immediately. If you want it to ask clarifying questions first, state this explicitly: "Before writing any content, always ask about the target audience, desired word count, and publishing platform."</li>
              </ul>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Example Use Cases for Claude Projects</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Writing Assistant</h4>
                  <p className="text-sm text-[#333333]">Upload your style guide, sample articles, and brand guidelines. Claude writes new content that matches your voice perfectly. Best-in-class for long-form blog posts, newsletters, and editorial content.</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Code Reviewer</h4>
                  <p className="text-sm text-[#333333]">Upload your coding standards, architecture documentation, and example code. Claude reviews pull requests, suggests improvements, and explains its reasoning clearly. Excellent at catching logic errors and suggesting cleaner patterns.</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Content Strategist</h4>
                  <p className="text-sm text-[#333333]">Upload your content calendar, competitor analysis, and SEO keyword research. Claude helps plan content strategies, write briefs, and prioritize topics based on business goals and search opportunity.</p>
                </div>
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-[#1A1A1A] mb-2">Research Synthesizer</h4>
                  <p className="text-sm text-[#333333]">Upload academic papers, reports, and source materials. Claude reads everything, identifies key themes, and produces structured summaries. Its 200K context window handles research corpora that would overwhelm other platforms.</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Limitations of Claude Projects</h3>
              <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-8">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Requires Claude Pro ($20/mo).</strong> Free-tier Claude users cannot create Projects.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>No public sharing.</strong> Projects cannot be shared publicly or through a link. They are limited to your personal account or team workspace. This makes Claude Projects unsuitable for customer-facing chatbots.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>No web browsing.</strong> Claude cannot search the internet within Projects. All knowledge must be uploaded manually or provided in the conversation.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>No image generation.</strong> Claude does not generate images. If your workflow requires visual content, you will need a separate tool.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>No API actions or external integrations.</strong> Claude Projects cannot connect to external APIs, databases, or tools. They are self-contained workspaces.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 mt-1 flex-shrink-0">-</span>
                    <span className="text-[#333333]"><strong>Usage limits on Pro plan.</strong> Claude Pro has usage limits that can be reached during heavy use. Extended thinking and long conversations consume more of your allocation.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">
              Custom GPTs vs Gemini Gems vs Claude Projects
            </h2>
            <p className="text-xl text-[#333333] text-center mb-12 max-w-3xl mx-auto">
              Every feature that matters, compared side by side across all three platforms
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-left font-semibold">Custom GPTs</th>
                    <th className="p-4 text-left font-semibold">Gemini Gems</th>
                    <th className="p-4 text-left font-semibold">Claude Projects</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">{row.feature}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.gpt}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.gem}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.claude}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Which Platform Should You Choose */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center">
              Which Platform Should You Choose?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg border-t-4 border-[#10A37F]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Choose Custom GPTs If:</h3>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start">
                    <span className="text-[#10A37F] mr-3 font-bold">1.</span>
                    <span>You need the most feature-rich custom agent (API actions, image gen, code execution)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#10A37F] mr-3 font-bold">2.</span>
                    <span>You want to share your agent publicly or build for an audience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#10A37F] mr-3 font-bold">3.</span>
                    <span>You need your agent to connect to external tools and databases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#10A37F] mr-3 font-bold">4.</span>
                    <span>You want a customer-facing chatbot or support agent</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#10A37F] mr-3 font-bold">5.</span>
                    <span>You value the largest ecosystem and community of builders</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg border-t-4 border-[#4285F4]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Choose Gemini Gems If:</h3>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start">
                    <span className="text-[#4285F4] mr-3 font-bold">1.</span>
                    <span>Your workflow is centered around Google Workspace (Docs, Sheets, Gmail)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4285F4] mr-3 font-bold">2.</span>
                    <span>You already pay for Google One AI Premium</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4285F4] mr-3 font-bold">3.</span>
                    <span>You need to process very long documents (1M+ token context window)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4285F4] mr-3 font-bold">4.</span>
                    <span>You want a simple setup without complex configurations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#4285F4] mr-3 font-bold">5.</span>
                    <span>Your team standardizes on Google tools for collaboration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg border-t-4 border-[#D97706]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Choose Claude Projects If:</h3>
                <ul className="space-y-3 text-[#333333]">
                  <li className="flex items-start">
                    <span className="text-[#D97706] mr-3 font-bold">1.</span>
                    <span>Writing quality is your top priority (blog posts, reports, editorial content)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D97706] mr-3 font-bold">2.</span>
                    <span>You need an agent that follows complex, nuanced instructions faithfully</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D97706] mr-3 font-bold">3.</span>
                    <span>You work with large reference documents and need accurate knowledge retrieval</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D97706] mr-3 font-bold">4.</span>
                    <span>Your use case is internal (personal or team) rather than public-facing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#D97706] mr-3 font-bold">5.</span>
                    <span>You value thoughtful, well-reasoned analysis over speed</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1A1A1A] text-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">The Bottom Line</h3>
              <p className="text-lg text-gray-200 max-w-3xl mx-auto mb-6">
                Custom GPTs are the Swiss army knife: the most features, the most flexibility, and the largest audience. Gemini Gems are the specialist tool for Google-powered workflows. Claude Projects are the writing desk: the best place for thoughtful, high-quality content and deep analysis. Most professionals will benefit from using two or even all three, each for what it does best.
              </p>
              <p className="text-[#FFDE59] font-semibold text-lg">
                Start with the platform where you already have a paid subscription. Build one agent, use it for a week, and evaluate before adding more.
              </p>
            </div>
          </div>
        </section>

        {/* Prompt Templates */}
        <section id="templates" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">
              Ready-to-Use Prompt Templates
            </h2>
            <p className="text-xl text-[#333333] text-center mb-8 max-w-3xl mx-auto">
              Copy these templates directly into your custom GPT instructions, Gem system instructions, or Claude Project custom instructions. Adapt them to your specific needs.
            </p>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <button
                onClick={() => setActiveTab('gpt')}
                className={`px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200 ${
                  activeTab === 'gpt'
                    ? 'bg-[#10A37F] text-white'
                    : 'bg-gray-200 text-[#333333] hover:bg-gray-300'
                }`}
              >
                Custom GPTs
              </button>
              <button
                onClick={() => setActiveTab('gem')}
                className={`px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200 ${
                  activeTab === 'gem'
                    ? 'bg-[#4285F4] text-white'
                    : 'bg-gray-200 text-[#333333] hover:bg-gray-300'
                }`}
              >
                Gemini Gems
              </button>
              <button
                onClick={() => setActiveTab('claude')}
                className={`px-6 py-3 rounded-lg font-bold text-sm transition-colors duration-200 ${
                  activeTab === 'claude'
                    ? 'bg-[#D97706] text-white'
                    : 'bg-gray-200 text-[#333333] hover:bg-gray-300'
                }`}
              >
                Claude Projects
              </button>
            </div>

            {/* Template Cards */}
            <div className="space-y-6">
              {promptTemplates
                .filter(template => {
                  if (activeTab === 'gpt') return template.platform === 'ChatGPT'
                  if (activeTab === 'gem') return template.platform === 'Gemini'
                  if (activeTab === 'claude') return template.platform === 'Claude'
                  return false
                })
                .map(template => (
                  <div key={template.id} className="bg-[#F9F9F9] p-6 rounded-lg border border-[#E5E5E5]">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-[#1A1A1A]">{template.title}</h3>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${
                        template.platform === 'ChatGPT' ? 'bg-[#10A37F]' :
                        template.platform === 'Gemini' ? 'bg-[#4285F4]' :
                        'bg-[#D97706]'
                      }`}>
                        {template.platform}
                      </span>
                    </div>
                    <div className="bg-white p-4 rounded-lg font-mono text-sm text-[#333333] whitespace-pre-wrap max-h-64 overflow-y-auto border border-gray-200">
                      {template.prompt}
                    </div>
                    <button
                      onClick={() => copyToClipboard(template.prompt, template.id)}
                      className="mt-4 bg-[#FFDE59] text-[#1A1A1A] px-6 py-2 rounded-lg font-bold text-sm hover:bg-[#E5C84F] transition-colors duration-200"
                    >
                      {copiedPrompt === template.id ? 'Copied!' : 'Copy Template'}
                    </button>
                  </div>
                ))
              }
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#333333] text-center mb-12">
              Common questions about custom GPTs, Gemini Gems, and Claude Projects
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="p-5 cursor-pointer hover:bg-gray-50 font-semibold text-gray-900 list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-gray-400 ml-4 text-xl flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Authority Links */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
              Official Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="https://help.openai.com/en/articles/8554397-creating-a-gpt" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">OpenAI: Creating a GPT</span>
              </a>
              <a href="https://support.google.com/gemini/answer/15383007" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Google: Gemini Gems Guide</span>
              </a>
              <a href="https://support.anthropic.com/en/articles/9517075-what-are-projects" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Anthropic: Claude Projects</span>
              </a>
              <a href="https://chatgpt.com/gpts" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">GPT Store</span>
              </a>
              <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Google Gemini</span>
              </a>
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-[#F9F9F9] transition-all duration-200">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Claude AI</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Master AI Prompts Across Every Platform
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Custom GPTs, Gemini Gems, and Claude Projects all depend on one thing: the quality of your instructions. Learn the prompt engineering frameworks that work across ChatGPT, Gemini, Claude, and every AI tool you use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Get the Prompt Writing Course
              </Link>
              <Link
                href="/ai-prompt-generator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Try Free AI Prompt Generator
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
