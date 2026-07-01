import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'
import { getAIModelById } from '../lib/ai-models'

// Pull current model facts from the central JSON so prices/names update in one place.
const opus = getAIModelById('claude-opus-4-8')
const sonnet = getAIModelById('claude-sonnet-4-6')
const haiku = getAIModelById('claude-haiku-4-5-20251001')

const steps = [
  {
    n: '1',
    title: 'Create a free account at claude.ai',
    body: 'Go to claude.ai in any browser, sign up with an email or Google account, and you are in. There is nothing to install for normal use. The free tier runs on Claude Sonnet and gives you a daily message allowance — enough to learn the ropes before you decide whether to pay.'
  },
  {
    n: '2',
    title: 'Type a plain instruction in the message box',
    body: 'Claude is a chat assistant. You write what you want in normal English and it replies. Start with something concrete you actually need done today — "Rewrite this paragraph to sound less formal" or "Explain how a 401k works to a 12-year-old." You do not need special syntax or commands.'
  },
  {
    n: '3',
    title: 'Give it context, not just a question',
    body: 'The single biggest jump in quality comes from telling Claude who you are, who the output is for, and what good looks like. Paste the source text, name the audience, and state the format you want. A vague prompt gets a vague answer — every time.'
  },
  {
    n: '4',
    title: 'Refine in the same conversation',
    body: 'Claude remembers everything inside a single chat. So you rarely get it perfect on the first try, and you do not need to. Reply with "Shorter," "More skeptical," or "Now turn that into five bullet points" and it builds on what came before. Treat it as a back-and-forth, not a vending machine.'
  },
  {
    n: '5',
    title: 'Use files, projects, and artifacts when you outgrow plain chat',
    body: 'Upload a PDF, spreadsheet, or image and ask Claude about it. Create a Project to keep related chats and reference files in one persistent workspace. When Claude builds something visual — a table, a document, a snippet of working code — it opens in an Artifact panel beside the chat so you can read and copy it cleanly.'
  }
]

const modelTiers = [
  {
    name: opus.display_name,
    role: 'The deep-thinking model',
    body: `Anthropic's most capable model. Reach for it on hard reasoning, long documents, and complex analysis where accuracy matters more than speed. Context window: ${opus.context_window_label}.`
  },
  {
    name: sonnet.display_name,
    role: 'The everyday workhorse',
    body: `Fast, capable, and what most people should use for almost everything — drafting, rewriting, summarising, brainstorming. This is the model behind the free tier. Context window: ${sonnet.context_window_label}.`
  },
  {
    name: haiku.display_name,
    role: 'The quick, lightweight model',
    body: `Built for speed on simple, high-volume tasks — short lookups, quick classifications, fast first drafts. Context window: ${haiku.context_window_label}.`
  }
]

const beforeAfter = {
  weak: 'Write a blog post about email marketing.',
  weakResult: 'You get a generic 800-word article that could have come from any AI, on any site, with no point of view and a forgettable intro.',
  strong: 'You are an email marketing consultant writing for solo founders who hate "salesy" copy. Write a 600-word blog post on the single biggest mistake beginners make with welcome emails. Open with a specific example, use plain language, no hype words, and end with one concrete action the reader can take today.',
  strongResult: 'You get a focused, opinionated draft aimed at a real reader, in the tone you asked for, with a usable structure. The only difference is the prompt.'
}

const templates = [
  {
    title: 'Rewrite / improve existing text',
    template: 'Rewrite the text below for [AUDIENCE]. Goal: [WHAT YOU WANT — clearer / shorter / friendlier / more persuasive]. Keep [WHAT MUST STAY]. Avoid [WORDS OR TONE TO CUT]. Here is the text:\n\n[PASTE TEXT]'
  },
  {
    title: 'Explain something complex',
    template: 'Explain [TOPIC] to [WHO — a beginner / my boss / a 10-year-old]. Use a real-world analogy, keep it under [LENGTH], and finish with the one thing I most need to remember.'
  },
  {
    title: 'Summarise a long document',
    template: 'Summarise the attached [DOCUMENT TYPE] for [PURPOSE]. Give me: (1) a three-sentence overview, (2) the [N] most important points as bullets, (3) anything that looks like a risk or a decision I need to make.'
  },
  {
    title: 'Plan or draft from scratch',
    template: 'I need to [TASK — write an email / plan a launch / outline an article]. Context: [SITUATION]. Audience: [WHO]. Constraints: [LENGTH, TONE, DEADLINE, MUST-INCLUDES]. Draft a first version, then list three things you would improve with more information from me.'
  }
]

const faqs = [
  {
    question: 'Is Claude free to use?',
    answer: 'Yes. Claude has a free tier at claude.ai that runs on Claude Sonnet with a daily message limit. It is enough to learn how Claude works and handle light daily use. The paid Claude Pro plan (around $20/month) raises your limits and unlocks access to the more capable Opus model. Heavy users can step up to Claude Max. If you only ever need occasional help with writing and questions, the free tier may be all you need.'
  },
  {
    question: 'How do I start using Claude as a complete beginner?',
    answer: 'Go to claude.ai, create a free account, and type what you want done in plain English — for example, "Summarise this article in five bullet points" with the article pasted below. There is no special syntax to learn and nothing to install. Claude replies, and you refine the result by chatting back ("shorter," "more formal," "add an example"). That loop is the whole skill.'
  },
  {
    question: 'What is the difference between Claude Opus, Sonnet, and Haiku?',
    answer: `Opus is the most capable model — use it for hard reasoning and long, complex documents (${opus.context_window_label} context). Sonnet is the everyday workhorse most people should use for drafting, rewriting, and summarising; it powers the free tier (${sonnet.context_window_label} context). Haiku is the fast, lightweight model for simple, high-volume tasks (${haiku.context_window_label} context). For most work, the default model is the right one — you only need to think about this when a task is unusually hard or unusually simple.`
  },
  {
    question: 'What is the best way to write a prompt for Claude?',
    answer: 'Give context, not just a question. Tell Claude who you are, who the output is for, what format you want, and what to avoid. Paste any source material directly into the chat. A prompt like "You are a recruiter writing for graduates — rewrite this job ad in plain language under 150 words, no buzzwords" beats "improve this job ad" every time. Then refine in the same conversation rather than starting over.'
  },
  {
    question: 'Can Claude read PDFs, spreadsheets, and images?',
    answer: 'Yes. You can upload PDFs, CSV and Excel files, images, and other documents directly into a chat and ask Claude to summarise, analyse, extract data, or answer questions about them. Claude can describe and reason about images you upload, but it does not generate images itself.'
  },
  {
    question: 'What can I actually use Claude for?',
    answer: 'Common beginner uses: rewriting and improving your own writing, summarising long documents, explaining complex topics, drafting emails and posts, brainstorming, planning, and answering research questions. Writers, in particular, lean on it for tone changes and first drafts. The fastest way to learn is to pick one real task from your week and run it through Claude today.'
  }
]

export default function HowToUseClaude() {
  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'How to Use Claude: A Beginner\'s Guide (2026)',
    description: 'A plain-English beginner\'s guide to using Claude AI — how to start, how to write prompts that work, the Opus/Sonnet/Haiku models explained, free vs paid plans, and copy-paste prompt templates.',
    url: 'https://promptwritingstudio.com/how-to-use-claude',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['how to use claude', 'how to use claude ai', 'claude ai beginner guide', 'claude ai tutorial', 'getting started with claude']
  })

  return (
    <>
      <Head>
        <title>How to Use Claude: A Beginner's Guide (2026) | PromptWritingStudio</title>
        <meta name="description" content="How to use Claude AI, explained for beginners: create an account, write prompts that work, understand the Opus/Sonnet/Haiku models, pick free vs paid, and copy-paste prompt templates to start today." />
        <meta name="keywords" content="how to use claude, how to use claude ai, claude ai beginner guide, claude ai tutorial, getting started with claude, claude prompts for beginners" />
        <meta property="og:title" content="How to Use Claude: A Beginner's Guide (2026)" />
        <meta property="og:description" content="A plain-English beginner's guide to using Claude AI — accounts, prompting basics, the models explained, plans, and copy-paste templates." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/how-to-use-claude" />
        <link rel="canonical" href="https://promptwritingstudio.com/how-to-use-claude" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Beginner's guide — updated June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              How to Use Claude
              <span className="block text-[#FFDE59]">A plain-English guide for beginners</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                To use Claude, go to claude.ai, create a free account, and type what you want done in plain English. Claude is an AI assistant from Anthropic that writes, summarises, explains, and analyses for you. The only skill that really matters is the prompt — giving Claude clear context gets dramatically better results than asking a vague question. This guide takes you from your first chat to prompts that actually work.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#getting-started" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Start in 5 steps
              </a>
              <a href="#templates" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Copy-paste templates
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">What is Claude?</h2>
            <p className="text-lg text-[#333333] mb-4">
              <strong>Claude is an AI assistant built by Anthropic.</strong> You talk to it in normal language and it talks back — writing drafts, rewriting your text, summarising documents, explaining hard topics, and answering questions. It works in your browser at claude.ai, with no setup required for everyday use.
            </p>
            <p className="text-lg text-[#333333] mb-4">
              If you have used ChatGPT, Claude will feel familiar. The differences show up in the work: Claude is widely preferred by writers for natural-sounding prose, and it is strong at following detailed instructions and handling long documents.
            </p>
            <p className="text-lg text-[#333333]">
              This page is about using Claude in the chat app for everyday tasks. If you are a developer who wants Claude to edit files and run code in your terminal, that is a separate tool — see our <Link href="/claude-code-guide" className="text-[#1A1A1A] underline font-semibold">Claude Code guide</Link>.
            </p>
          </div>
        </section>

        <section id="getting-started" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">How to start using Claude in 5 steps</h2>
            <p className="text-lg text-[#333333] mb-10">From a blank screen to a useful answer. No jargon.</p>
            <div className="space-y-5">
              {steps.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 flex gap-5 items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">{s.n}</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{s.title}</h3>
                    <p className="text-[#333333]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The one skill that matters: prompting</h2>
            <p className="text-lg text-[#333333] mb-8">
              Most beginners are disappointed by Claude for one reason — they ask vague questions and get vague answers. The fix is not a better model. It is a clearer prompt. Here is the same task, twice.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-2 border-gray-200">
                <span className="inline-block bg-gray-200 text-[#333333] text-sm font-bold px-3 py-1 rounded-full mb-3">Weak prompt</span>
                <p className="font-mono text-sm text-[#1A1A1A] bg-white p-4 rounded border border-gray-200 mb-3">{beforeAfter.weak}</p>
                <p className="text-[#333333] text-sm">{beforeAfter.weakResult}</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border-2 border-[#FFDE59]">
                <span className="inline-block bg-[#FFDE59] text-[#1A1A1A] text-sm font-bold px-3 py-1 rounded-full mb-3">Strong prompt</span>
                <p className="font-mono text-sm text-[#1A1A1A] bg-white p-4 rounded border border-gray-200 mb-3">{beforeAfter.strong}</p>
                <p className="text-[#333333] text-sm">{beforeAfter.strongResult}</p>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]"><strong>The pattern:</strong> say who Claude is, who the output is for, what format you want, and what to avoid — then paste any source material. That is 90% of good prompting. For a deeper set of ready-made prompts, see our <Link href="/ai-prompt-generator/claude-prompts" className="text-[#1A1A1A] underline font-semibold">Claude prompts library</Link>.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The biggest beginner mistake to avoid</h2>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#FFDE59]">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">Trusting facts and numbers without checking</h3>
              <p className="text-[#333333] mb-3">
                Claude can state something with full confidence and still be wrong — a fabricated statistic, a misremembered date, a citation that does not exist. This is called a hallucination, and every AI assistant does it.
              </p>
              <p className="text-[#333333]">
                <strong>How to avoid it:</strong> use Claude for thinking, drafting, and structure — then verify any specific fact, figure, quote, or legal or medical claim against a primary source before you rely on it. Ask Claude to flag what it is unsure about, and turn on web search when you need current information. Treat it as a brilliant, fast assistant who occasionally guesses — not an oracle.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Claude's models: Opus, Sonnet, and Haiku</h2>
            <p className="text-lg text-[#333333] mb-8">
              Claude comes in three sizes. You usually do not have to choose — Claude picks a sensible default — but it helps to know what they are.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {modelTiers.map((m, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">{m.name}</h3>
                  <p className="text-[#FFDE59] font-semibold text-sm mb-3 bg-[#1A1A1A] inline-block px-2 py-1 rounded">{m.role}</p>
                  <p className="text-[#333333] text-sm">{m.body}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-[#666666] mt-6">Model names and capabilities change as Anthropic ships new versions. Figures here reflect the current lineup as of June 2026.</p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Free vs paid: which Claude plan do you need?</h2>
            <p className="text-lg text-[#333333] mb-6">
              Start free. Upgrade only when you hit the daily limit often or you want the more capable Opus model for heavier work. The free tier runs on Sonnet and is genuinely useful for light daily tasks.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0 font-bold">+</span><span className="text-[#333333]"><strong>Free</strong> — Claude Sonnet with a daily message cap. Perfect for learning and occasional use.</span></li>
              <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0 font-bold">+</span><span className="text-[#333333]"><strong>Claude Pro (around $20/month)</strong> — higher limits, access to Opus, and features like Projects. The right tier for most regular users.</span></li>
              <li className="flex items-start"><span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0 font-bold">+</span><span className="text-[#333333]"><strong>Claude Max</strong> — much higher limits for power users who live in Claude all day.</span></li>
            </ul>
            <div className="bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">Not sure which paid tier fits — or whether to use the API instead? We break down the trade-offs in our <Link href="/claude-pro-vs-max-vs-api" className="text-[#1A1A1A] underline font-semibold">Claude Pro vs Max vs API guide</Link>. Pricing shifts, so check claude.ai for the current numbers before subscribing.</p>
            </div>
          </div>
        </section>

        <section id="templates" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">4 copy-paste prompt templates to start with</h2>
            <p className="text-lg text-[#333333] mb-10">
              Fill in the bracketed slots and paste straight into Claude. These cover the tasks beginners reach for most.
            </p>
            <div className="space-y-6">
              {templates.map((t, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{t.title}</h3>
                  <pre className="font-mono text-sm text-[#1A1A1A] bg-white p-4 rounded border border-gray-200 whitespace-pre-wrap">{t.template}</pre>
                </div>
              ))}
            </div>
            <p className="text-[#333333] mt-8">
              Want more than four? Our <Link href="/claude-prompts" className="text-[#1A1A1A] underline font-semibold">Claude prompts library</Link> has dozens of tested prompts by task, and the <Link href="/ai-prompt-generator" className="text-[#1A1A1A] underline font-semibold">free AI prompt generator</Link> builds one for your exact situation. Once you settle on a way you like Claude to behave, lock it in with a <Link href="/claude-system-prompt" className="text-[#1A1A1A] underline font-semibold">Claude system prompt</Link>, or go deeper on longer pieces with <Link href="/claude-for-writing" className="text-[#1A1A1A] underline font-semibold">Claude for writing</Link>.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions beginners ask most when they first open Claude.</p>
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

        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Knowing how to use Claude is step one. Getting great output is the prompt.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              The gap between a frustrating AI answer and a genuinely useful one is almost always the prompt — not the tool. PromptWritingStudio teaches the prompting system that works across Claude, ChatGPT, and Gemini, so you stop guessing and start getting the output you actually wanted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/prompt-grader" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Grade Your Prompt Free
              </a>
              <Link href="/ai-prompt-generator/claude-prompts" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Browse Claude prompts
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
