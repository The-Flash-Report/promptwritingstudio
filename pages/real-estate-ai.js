import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "How can real estate agents use AI prompts in their daily work?",
    answer: "Real estate agents use AI prompts for writing property listings, crafting buyer and seller emails, generating market analysis summaries, creating social media content, drafting offer letters, writing neighborhood descriptions, developing blog posts for lead generation, and preparing CMA presentation narratives. The most immediate time savings come from property descriptions and client communication, where agents typically save 1 to 2 hours per listing."
  },
  {
    question: "Will AI-written property listings sound generic?",
    answer: "Not when you use well-crafted prompts. The key is providing specific details about the property, such as unique features, recent upgrades, neighborhood highlights, and the target buyer profile. Our prompts are designed to pull out what makes each property special and match the writing style to the price point and market. A luxury condo listing reads very differently from a starter home listing. With the right prompt, AI-generated descriptions are specific, compelling, and conversion-focused."
  },
  {
    question: "Can AI help me generate more leads as a real estate agent?",
    answer: "Yes. AI can help you create consistent content that attracts leads, including neighborhood guides, market update emails, social media posts, blog articles about local events, and targeted drip campaign sequences. Agents who post consistently on social media and email their database regularly generate significantly more leads. AI makes maintaining this consistency realistic even for solo agents."
  },
  {
    question: "What AI tools work best for real estate professionals?",
    answer: "ChatGPT and Claude are the most versatile for real estate writing tasks like listings, emails, and content creation. For visual content, tools like Canva AI help create social media graphics and listing presentations. For market data analysis, tools that integrate with MLS data provide the best results. Our course teaches prompt engineering techniques that work across all major AI platforms so you can use whichever tool fits your workflow."
  },
  {
    question: "How much time can AI save me on property listings?",
    answer: "Most agents report cutting listing description time from 30-60 minutes per property to 5-10 minutes. That includes generating the initial description with AI, customizing it with your personal knowledge of the property, and polishing the final version. For agents handling 10+ listings per month, that translates to 4-8 hours saved on listing descriptions alone. Additional time savings come from automated email drafts, social media content, and market analysis summaries."
  },
  {
    question: "Is it ethical for real estate agents to use AI for marketing?",
    answer: "Yes, as long as you follow a few key principles. All property claims must be accurate and verifiable. Do not let AI fabricate features, statistics, or neighborhood details. Always review AI output for accuracy before publishing. Comply with Fair Housing guidelines by avoiding discriminatory language. And be transparent with clients about your workflow if asked. AI is a writing assistant that helps you communicate more effectively, not a replacement for your expertise and professional obligations."
  },
  {
    question: "Can AI help with real estate market analysis?",
    answer: "AI is excellent at turning raw market data into readable summaries and presentations. You can provide recent sales data, market trends, and neighborhood statistics, then use prompts to generate CMA narratives, market update newsletters, buyer consultation presentations, and investment analysis summaries. AI does not replace an agent's local market knowledge, but it makes communicating that knowledge to clients much faster and more professional."
  },
  {
    question: "Do I need technical skills to use AI prompts for real estate?",
    answer: "No. If you can type a text message, you can use AI prompts. Our course is designed specifically for real estate professionals with no technical background. You copy a prompt template, fill in the details about your listing or client situation, paste it into ChatGPT or Claude, and get a polished draft in seconds. No coding, no special software, no learning curve beyond what we teach in the course."
  }
]

const promptExamples = [
  {
    title: "Compelling Property Listing",
    prompt: "Write a compelling MLS-ready property listing description for: [property type, e.g., 3-bedroom/2-bath single-family home] located in [neighborhood/city]. Key features: [list 5-8 features, e.g., renovated kitchen with quartz countertops, hardwood floors throughout, private backyard with mature trees, attached 2-car garage]. Square footage: [sq ft]. Year built: [year]. Recent upgrades: [list upgrades]. Price point: [price range]. Target buyer: [first-time buyer/family/downsizer/investor]. Write in an engaging, professional tone. Lead with the most compelling feature. Include a call to action. Keep it under 250 words. Avoid cliches like 'dream home' and 'won't last long.'",
    description: "Generate scroll-stopping listing descriptions in under 2 minutes"
  },
  {
    title: "Buyer Follow-Up Email Sequence",
    prompt: "Create a 5-email drip sequence for a real estate buyer lead who [attended an open house / inquired online / was referred by a past client] and is looking for a [property type] in [area] with a budget of [range]. For each email include: subject line, body text, and call to action. Email 1: Immediate follow-up (same day). Email 2: Value-add with market insight (day 3). Email 3: New listing alert style (day 7). Email 4: Social proof / testimonial (day 14). Email 5: Check-in with soft CTA (day 21). Tone should be helpful and consultative, not salesy. Keep each email under 150 words.",
    description: "Build nurture sequences that convert leads into clients"
  },
  {
    title: "Neighborhood Guide",
    prompt: "Write a comprehensive neighborhood guide for [neighborhood name] in [city, state] targeting [target audience: young professionals/families with children/retirees]. Include sections on: (1) Overview and vibe of the neighborhood (2 paragraphs), (2) Housing stock and typical price ranges, (3) Top 5 restaurants and cafes, (4) Schools and education options, (5) Parks and outdoor activities, (6) Commute times to [major employment center], (7) What locals love about living there, (8) Things to consider before moving there. Write in a warm, informative tone suitable for a real estate blog. Optimize for SEO with the keyword '[neighborhood name] real estate guide.' Include a CTA to contact me for available listings.",
    description: "Create SEO-optimized neighborhood content that attracts organic leads"
  },
  {
    title: "Seller Pre-Listing Presentation",
    prompt: "Create a pre-listing presentation outline and talking points for a homeowner in [neighborhood] who wants to sell their [property type]. Include: (1) Introduction and personal value proposition (why choose me), (2) Current market conditions summary for [neighborhood] (leave placeholders for specific data), (3) Pricing strategy overview with explanation of how I determine list price, (4) Marketing plan highlights (professional photography, staging consultation, MLS syndication, social media marketing, open houses), (5) Timeline from listing to close, (6) Common seller questions with suggested answers, (7) My commission structure and what it includes, (8) Closing statement with CTA to sign listing agreement. Format as talking points with supporting details.",
    description: "Win more listings with polished, professional presentations"
  },
  {
    title: "Market Update Newsletter",
    prompt: "Write a monthly real estate market update newsletter for [city/neighborhood] for [month, year]. Structure it as: (1) Engaging subject line, (2) Brief personal greeting, (3) Market snapshot: summarize the data I provide below in plain language with context for buyers and sellers, (4) What this means for buyers (2-3 actionable insights), (5) What this means for sellers (2-3 actionable insights), (6) Featured listing spotlight (leave placeholder), (7) One local community highlight or event, (8) CTA to schedule a consultation. Market data: [paste recent stats: median price, days on market, inventory levels, year-over-year changes]. Keep total newsletter under 400 words. Tone: professional, insightful, not overly salesy.",
    description: "Turn raw market data into engaging client newsletters"
  },
  {
    title: "Social Media Content Calendar",
    prompt: "Create a 2-week social media content calendar for a real estate agent specializing in [area/niche]. Generate 14 posts (one per day) across these categories: (1) 3 property showcase posts (with caption and hashtags), (2) 2 market insight posts sharing local stats, (3) 2 educational posts (buyer tips or seller tips), (4) 2 community spotlight posts (local business or event), (5) 2 personal brand posts (behind-the-scenes, client win, day in the life), (6) 2 engagement posts (polls, questions, this-or-that), (7) 1 testimonial or social proof post. For each post include: platform (Instagram/Facebook/LinkedIn), caption text, 5-10 relevant hashtags, and a suggested visual description. Keep captions under 100 words each.",
    description: "Plan two weeks of content in 10 minutes instead of 3 hours"
  }
]

const painPoints = [
  {
    icon: "📝",
    title: "Listing Descriptions",
    description: "Spending 30-60 minutes per listing trying to make each property sound unique and compelling"
  },
  {
    icon: "📧",
    title: "Client Communication",
    description: "Drowning in emails to buyers, sellers, and other agents while trying to maintain a personal touch"
  },
  {
    icon: "📊",
    title: "Market Analysis",
    description: "Turning raw MLS data into clear, client-friendly market summaries and CMA narratives"
  },
  {
    icon: "📱",
    title: "Content Consistency",
    description: "Knowing you should post on social media and email your database, but never having time to do it consistently"
  }
]

export default function RealEstateAI() {
  const [copiedPrompt, setCopiedPrompt] = useState(null)

  const copyToClipboard = (prompt, title) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(title)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'AI Prompts for Real Estate | Property Listings, Client Communication & Market Analysis',
    description: 'AI prompts built for real estate agents and brokers. Write property listings in 2 minutes, build drip campaigns, create neighborhood guides, and generate market analysis summaries with ChatGPT, Claude, and Gemini.',
    url: 'https://promptwritingstudio.com/real-estate-ai',
    datePublished: '2025-06-01',
    dateModified: '2026-02-01',
    keywords: ['AI prompts real estate', 'real estate listing description AI', 'AI for realtors', 'property listing generator', 'real estate marketing AI', 'realtor AI tools', 'real estate content creation', 'AI market analysis real estate']
  })

  return (
    <>
      <Head>
        <title>AI Prompts for Real Estate | Property Listings, Client Communication &amp; Market Analysis</title>
        <meta name="description" content="AI prompts built for real estate professionals. Write property listings in 2 minutes, build client drip campaigns, create neighborhood guides, and generate market summaries. Save 10+ hours per week." />
        <meta name="keywords" content="AI prompts real estate, real estate listing description AI, AI for realtors, property listing generator, real estate marketing AI, realtor AI tools, real estate content creation, AI market analysis real estate" />
        <link rel="canonical" href="https://promptwritingstudio.com/real-estate-ai" />
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
              AI Prompts That Help Real Estate Agents
              <span className="block text-[#FFDE59]">Close More and Write Less</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Stop spending hours on listing descriptions, client emails, and marketing content. Use AI prompts to write compelling property listings in 2 minutes, build drip campaigns that convert, and create consistent content that generates leads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="#prompts"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                See Real Estate AI Prompts
              </Link>
              <Link
                href="/claude-code-guide"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Start with Claude Code
              </Link>
            </div>
            <div className="text-white text-lg">
              <p>Used by agents, brokers, and real estate teams nationwide</p>
              <p>Works with ChatGPT, Claude, Gemini, and MLS-integrated tools</p>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                You Got Into Real Estate to Sell, Not to Write
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                These writing and content tasks eat into the time you should be spending with clients and closing deals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {painPoints.map((point, index) => (
                <div key={index} className="text-center p-6 bg-[#F9F9F9] rounded-lg border border-[#E5E5E5]">
                  <div className="text-4xl mb-4">{point.icon}</div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{point.title}</h3>
                  <p className="text-[#333333]">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prompt Examples Section */}
        <section id="prompts" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                AI Prompts Built for Real Estate Professionals
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Copy these prompts into ChatGPT, Claude, or your preferred AI tool. Customize the brackets with your property details and market.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {promptExamples.map((example, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-[#E5E5E5]">
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{example.title}</h3>
                  <p className="text-[#666666] mb-4">{example.description}</p>
                  <div className="bg-[#F9F9F9] p-4 rounded-lg mb-4 font-mono text-sm text-[#333333] leading-relaxed">
                    {example.prompt}
                  </div>
                  <button
                    onClick={() => copyToClipboard(example.prompt, example.title)}
                    className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
                  >
                    {copiedPrompt === example.title ? 'Copied!' : 'Copy Prompt'}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/claude-code-guide"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Start with Claude Code
              </Link>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                What AI Prompts Do for Your Real Estate Business
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-8 bg-[#F9F9F9] rounded-lg">
                <div className="text-4xl font-bold text-[#FFDE59] mb-2">2 min</div>
                <p className="text-lg font-bold text-[#1A1A1A] mb-2">Listing Descriptions</p>
                <p className="text-[#333333]">Down from 30-60 minutes per property. Write once, customize for MLS, Zillow, and social media.</p>
              </div>
              <div className="text-center p-8 bg-[#F9F9F9] rounded-lg">
                <div className="text-4xl font-bold text-[#FFDE59] mb-2">10 min</div>
                <p className="text-lg font-bold text-[#1A1A1A] mb-2">2-Week Content Calendar</p>
                <p className="text-[#333333]">Plan and write 14 social media posts across platforms in the time it used to take to write two.</p>
              </div>
              <div className="text-center p-8 bg-[#F9F9F9] rounded-lg">
                <div className="text-4xl font-bold text-[#FFDE59] mb-2">5 min</div>
                <p className="text-lg font-bold text-[#1A1A1A] mb-2">Drip Email Sequence</p>
                <p className="text-[#333333]">Build a 5-email nurture sequence for buyer or seller leads that sounds personal, not automated.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-[#333333]">
                Common questions about using AI prompts in real estate
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E5E5]">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">{faq.question}</h3>
                  <p className="text-[#333333] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Sell More Homes, Write Fewer Words: AI Prompts for Real Estate
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of real estate professionals who are using AI prompts to create listings faster, nurture leads consistently, and spend more time on what closes deals: building relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/claude-code-guide"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Start with Claude Code
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
