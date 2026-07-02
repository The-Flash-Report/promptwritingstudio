import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const GRADER_URL = '/prompt-grader'

const faqs = [
  {
    question: "What is a Claude Project?",
    answer: "A Claude Project is a self-contained workspace inside Claude.ai that bundles three things together: a knowledge base of files you upload, a set of custom instructions Claude follows in every chat, and the chat history for that workspace. Instead of re-explaining your style guide, audience, and context in every conversation, you set it once and every chat in the project inherits it. Anthropic describes Projects as having \"their own chat histories and knowledge bases.\""
  },
  {
    question: "Are Claude Projects free?",
    answer: "Yes, partly. Per Anthropic's documentation, Projects are available to all users, including free accounts, and free users can create a maximum of five projects. However, enhanced project knowledge with RAG (the retrieval system that lets Claude search across large uploaded knowledge bases) is only available on paid plans: Claude Pro, Max, Team, or Enterprise. So a free user can build a project, but the document-search capacity is more limited."
  },
  {
    question: "How big can a Claude Project knowledge base be?",
    answer: "Claude's context window is 200K tokens, which is roughly 150,000 words or about 500 pages of text. On paid plans, Anthropic says RAG mode can \"expand capacity by up to 10x\" so Claude retrieves only the relevant chunks of your uploaded files rather than loading everything at once. For writers, that means you can upload a full back catalogue of past articles, a brand style guide, and reference material without blowing the limit."
  },
  {
    question: "What is the difference between Claude Projects and custom instructions?",
    answer: "Profile custom instructions apply to every chat across your whole account and have roughly a 1,500-character limit. Project instructions apply only to chats inside that one project and support far more (around 8,000 characters). The practical split: put your identity and default tone in your profile, and put domain-specific rules (this client's voice, this newsletter's format, this series' constraints) in each project."
  },
  {
    question: "Can I use Claude Projects for writing instead of coding?",
    answer: "Yes. While developers use Projects for codebases, the feature is just as useful for writers. Upload your style guide, three of your best past articles, and your audience notes; set custom instructions describing your voice and structure rules; then every draft, outline, and edit you request inside that project comes back already aligned to your standards. You stop re-teaching Claude your style on every single chat."
  },
  {
    question: "Do Claude Projects remember previous chats?",
    answer: "Each project keeps its own chat history, so you can return to past conversations within that workspace. However, a brand-new chat does not automatically read the content of your other chats. What every new chat does inherit is the project's knowledge base and custom instructions. If you want continuity of decisions across chats, record those decisions in a file and add it to the knowledge base."
  },
  {
    question: "Can I share a Claude Project with my team?",
    answer: "Sharing and collaboration features are limited to Team and Enterprise plans, where you can grant permission-based access and let multiple people contribute to the same project. On Pro and free plans, a project is private to your account. A common workaround for solo writers and small teams is to document the project's instructions and knowledge files so they can be recreated by a collaborator."
  }
]

const setupSteps = [
  {
    title: 'Create the project and name it for the job',
    body: 'In the Claude.ai sidebar, click Projects, then Create project. Name it after the recurring job it serves, not the topic. "Weekly Newsletter" or "Acme Corp blog" beats "Writing" because you will reuse the workspace for every instance of that job.'
  },
  {
    title: 'Add custom instructions (the voice and the rules)',
    body: 'Open the project, find the instructions panel, and write the rules Claude should follow in every chat here: who the audience is, the tone, the structure, the words to avoid, and how you want drafts delivered. This field holds far more than profile instructions, so be specific. Treat it like onboarding a new ghostwriter.'
  },
  {
    title: 'Upload your knowledge base',
    body: 'Add the documents that define good output: your style guide, two or three of your strongest published pieces, your audience research, product fact sheets, and any glossary of terms. Claude reads these to ground its writing in your actual standards rather than generic best practice.'
  },
  {
    title: 'Start a chat and request work',
    body: 'Open a new chat inside the project and give it a normal request: "Draft a 700-word post on X for our audience." The draft arrives already shaped by your instructions and knowledge. Iterate in that chat, and start a fresh chat for the next piece. All of them inherit the same setup.'
  }
]

const writerWorkflows = [
  {
    name: 'The newsletter project',
    setup: 'Knowledge base: last 5 issues, subscriber persona, your section structure. Instructions: word count, voice, banned phrases, sign-off format.',
    payoff: 'Every issue starts from your established format and voice. You spend your time on the idea, not re-teaching Claude your house style.'
  },
  {
    name: 'The client voice project',
    setup: 'One project per client. Knowledge base: their brand guidelines, three approved past pieces, their product list. Instructions: their tone, their audience, their no-go words.',
    payoff: 'You switch clients by switching projects, and the voice switches with you. No more cross-contaminating one client\'s tone into another\'s draft.'
  },
  {
    name: 'The book or long-form project',
    setup: 'Knowledge base: your outline, character or argument notes, completed chapters. Instructions: POV, tense, style constraints, what is canon.',
    payoff: 'Claude keeps continuity with what you have already written instead of contradicting earlier chapters or drifting in tone.'
  },
  {
    name: 'The repurposing project',
    setup: 'Knowledge base: a long-form source piece plus your platform rules. Instructions: how a LinkedIn post, a thread, and a newsletter blurb should each be shaped.',
    payoff: 'Drop in one article and pull out five platform-native variants that already match how each channel should sound.'
  }
]

const beforeAfter = {
  before: 'Write me a blog post about email marketing for small businesses. Make it sound professional but friendly. Around 800 words. Don\'t be too salesy. Our audience is non-technical owners. Use short paragraphs and a clear takeaway at the end. Avoid jargon like "leverage" and "synergy"...',
  after: 'Draft an 800-word post on email marketing for our audience.'
}

export default function ClaudeProjects() {
  const [copied, setCopied] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Projects: How to Set Up a Custom Workspace for Writing (2026)',
    description: 'A practical guide to Claude Projects for writers. What they are, how to set one up, how to use project knowledge and custom instructions, and four workflows that save hours of re-explaining your style.',
    url: 'https://promptwritingstudio.com/claude-projects',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['claude projects', 'claude projects guide', 'how to use claude projects', 'claude project knowledge', 'claude custom instructions', 'claude projects for writers']
  })

  return (
    <>
      <Head>
        <title>Claude Projects: How to Set Up a Custom Writing Workspace (2026) | PromptWritingStudio</title>
        <meta name="description" content="What Claude Projects are and how to set one up for writing. Use project knowledge and custom instructions so every chat matches your voice. Step-by-step guide with writer workflows." />
        <meta name="keywords" content="claude projects, claude projects guide, how to use claude projects, claude project knowledge, claude custom instructions, claude projects for writers, claude workspace" />
        <meta property="og:title" content="Claude Projects: How to Set Up a Custom Writing Workspace (2026)" />
        <meta property="og:description" content="A practical guide to Claude Projects for writers: knowledge base, custom instructions, setup steps, and four workflows that stop you re-teaching Claude your style." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-projects" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-projects" />
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
        {/* Hero */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Projects:
              <span className="block text-[#FFDE59]">Set Up a Workspace That Knows Your Style</span>
            </h1>

            {/* Answer Block - AEO */}
            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Claude Projects are self-contained workspaces inside Claude.ai that combine a knowledge base of uploaded files, a set of custom instructions, and their own chat history. You set your audience, voice, and rules once, and every chat in the project follows them automatically. For writers, that means you stop re-explaining your style in every conversation. Projects are available on free and paid plans; free accounts can create up to five.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Most guides to Claude Projects are written for developers managing code. This one is written for writers managing voice, clients, and deadlines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#setup"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Jump to Setup
              </a>
              <a
                href="#workflows"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                See Writer Workflows
              </a>
            </div>
          </div>
        </section>

        {/* What is a Claude Project */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              What is a Claude Project?
            </h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                A Claude Project is a workspace inside <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-[#1A1A1A] underline hover:no-underline">Claude.ai</a> that holds three things together: a knowledge base of files you upload, custom instructions Claude follows in every chat, and the chat history for that workspace. Anthropic describes Projects as &quot;self-contained workspaces with their own chat histories and knowledge bases.&quot;
              </p>
              <p className="text-lg text-[#333333] mb-6">
                The problem a project solves is repetition. Without one, you open a fresh Claude chat and re-explain who your audience is, what tone you want, how long the piece should be, and which words to avoid. You do that every single time. A project lets you define all of that once. Every new chat inside the project inherits it.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                Think of it as the difference between briefing a new freelancer on every job and having one writer who already knows the brand. The knowledge base is their reference shelf. The custom instructions are their standing brief. The chat history is their record of past work for you.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                Projects are available to all Claude users, including free accounts, though some capabilities differ by plan. We cover the plan differences below so you know what you actually get.
              </p>
            </div>
          </div>
        </section>

        {/* The two building blocks */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                The Two Building Blocks: Knowledge and Instructions
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Everything a project does well comes from these two parts. Get them right and the rest follows.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Project Knowledge (the reference shelf)</h3>
                <p className="text-[#333333] mb-4">
                  The knowledge base is where you upload documents that define good output: your style guide, your best past articles, audience research, product facts, a glossary. Claude reads these to ground its writing in your real standards instead of generic advice.
                </p>
                <p className="text-[#333333] mb-4">
                  Claude&apos;s context window is 200K tokens, roughly 150,000 words or about 500 pages. On paid plans, Anthropic says RAG mode can &quot;expand capacity by up to 10x,&quot; so Claude retrieves only the relevant parts of large knowledge bases rather than loading everything at once.
                </p>
                <p className="text-sm text-[#666666]">
                  <strong>Writer move:</strong> upload three of your strongest pieces, not thirty mediocre ones. Claude imitates what it sees. Feed it your best.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Custom Instructions (the standing brief)</h3>
                <p className="text-[#333333] mb-4">
                  Project instructions are the rules Claude follows in every chat inside the project. Anthropic notes you can &quot;define project instructions for each project to further tailor Claude&apos;s responses,&quot; from tone to perspective.
                </p>
                <p className="text-[#333333] mb-4">
                  These hold far more than profile-level instructions (project instructions support roughly 8,000 characters versus about 1,500 for your account profile), so you can be genuinely specific about voice, structure, and constraints.
                </p>
                <p className="text-sm text-[#666666]">
                  <strong>Writer move:</strong> profile for identity and default tone; project instructions for the domain-specific rules of this client, newsletter, or series.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Why It Matters: One Prompt, Before and After
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              The same request, written for a blank Claude chat versus a properly configured project. The project absorbs everything you would otherwise have to type every time.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <p className="text-sm font-bold text-[#666666] uppercase tracking-wide mb-3">Weak: blank chat, every detail crammed in</p>
                <p className="text-[#333333] font-mono text-sm leading-relaxed">{beforeAfter.before}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-[#FFDE59]">
                <p className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wide mb-3">Strong: inside a configured project</p>
                <p className="text-[#333333] font-mono text-sm leading-relaxed mb-4">{beforeAfter.after}</p>
                <p className="text-sm text-[#666666]">
                  The audience, tone, length, paragraph style, banned words, and takeaway format all live in the project. You only type what is unique to this piece.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Setup */}
        <section id="setup" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              How to Set Up a Claude Project (Step by Step)
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Setup takes about ten minutes and you do it once per recurring job. Here is the order that works.
            </p>

            <div className="space-y-6">
              {setupSteps.map((step, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start">
                    <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">{index + 1}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{step.title}</h3>
                      <p className="text-[#333333]">{step.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Tip:</strong> once a project produces work you are happy with, duplicate it as the template for the next client or series. You inherit the structure and only swap the specifics, which is far faster than building from scratch each time.
              </p>
            </div>
          </div>
        </section>

        {/* Custom instructions template */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              A Fill-in-the-Blank Custom Instructions Template
            </h2>
            <p className="text-lg text-[#333333] mb-6">
              Paste this into your project instructions and replace the bracketed parts. It covers the things Claude most often gets wrong when it does not know your context.
            </p>

            <div className="bg-[#1A1A1A] text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto relative">
              <button
                onClick={() => copyToClipboard(
`You are writing for [PUBLICATION / CLIENT].

AUDIENCE: [who reads this, their level of expertise, what they care about].

VOICE: [e.g. direct, warm, plain-spoken. First person or second person. Contractions allowed?].

STRUCTURE: [opening style, paragraph length, use of subheads, how every piece should end].

WORD COUNT: default to [N] words unless I say otherwise.

ALWAYS: [non-negotiables, e.g. one clear takeaway, concrete examples, short paragraphs].

NEVER: [banned words and habits, e.g. no "leverage", "unlock", "game-changer", no fluffy intros].

DELIVERY: give me the draft only, no preamble, unless I ask for options.`,
                  'template'
                )}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
              >
                {copied === 'template' ? 'Copied' : 'Copy'}
              </button>
              <pre className="whitespace-pre-wrap">{`You are writing for [PUBLICATION / CLIENT].

AUDIENCE: [who reads this, their level of expertise, what they care about].

VOICE: [e.g. direct, warm, plain-spoken. First person or second person. Contractions allowed?].

STRUCTURE: [opening style, paragraph length, use of subheads, how every piece should end].

WORD COUNT: default to [N] words unless I say otherwise.

ALWAYS: [non-negotiables, e.g. one clear takeaway, concrete examples, short paragraphs].

NEVER: [banned words and habits, e.g. no "leverage", "unlock", "game-changer", no fluffy intros].

DELIVERY: give me the draft only, no preamble, unless I ask for options.`}</pre>
            </div>

            <p className="text-[#333333] mt-6">
              For more reusable starting points you can drop straight into a project, see our <Link href="/how-to-use-claude" className="text-[#1A1A1A] underline hover:no-underline">guide to using Claude</Link> and the broader <Link href="/chatgpt-prompt-templates" className="text-[#1A1A1A] underline hover:no-underline">prompt template library</Link>.
            </p>
          </div>
        </section>

        {/* Writer workflows */}
        <section id="workflows" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Four Claude Project Workflows for Writers
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Each is one project you set up once and reuse for every instance of that job.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {writerWorkflows.map((flow, index) => (
                <div key={index} className="bg-white p-8 rounded-lg border border-gray-200">
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">{flow.name}</h3>
                  <p className="text-[#333333] mb-4"><strong className="text-[#1A1A1A]">Set up:</strong> {flow.setup}</p>
                  <p className="text-[#333333]"><strong className="text-[#1A1A1A]">Payoff:</strong> {flow.payoff}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Known failure mode */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              The Mistake Most People Make With Claude Projects
            </h2>
            <p className="text-lg text-[#333333] mb-6">
              The common failure is treating the knowledge base like a junk drawer. People upload every document they own, assume more context is better, and then wonder why drafts feel muddled.
            </p>
            <p className="text-lg text-[#333333] mb-6">
              Claude imitates what you give it. Upload thirty average articles and you get average writing back. Upload your three best pieces and a tight style guide, and the output sharpens. Curate the knowledge base the way you would curate a portfolio.
            </p>
            <p className="text-lg text-[#333333] mb-6">
              The second mistake is expecting a new chat to remember decisions made in another chat. Within a project, each chat is separate; what carries across is the knowledge base and instructions, not the conversation. If a decision matters long-term (a naming convention, a positioning call), write it into a file and add it to the knowledge base so it persists.
            </p>
            <p className="text-lg text-[#333333]">
              A related point: Claude Projects are about persistent context, not the in-chat interactive previews. If you want those rich previews of drafts, documents, or code, that is a separate feature covered in our guide to <Link href="/claude-artifacts" className="text-[#1A1A1A] underline hover:no-underline">Claude Artifacts</Link>.
            </p>
          </div>
        </section>

        {/* Plan differences */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              What You Get on Each Plan
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Projects exist on every plan, but the capacity and collaboration features differ. Here is the breakdown based on Anthropic&apos;s documentation.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Capability</th>
                    <th className="p-4 text-left font-semibold">Free</th>
                    <th className="p-4 text-left font-semibold">Pro / Max</th>
                    <th className="p-4 text-left font-semibold">Team / Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-50">
                    <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">Create projects</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">Up to 5</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">Yes</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">Yes</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">Custom instructions</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">Yes</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">Yes</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">Yes</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">Enhanced knowledge (RAG)</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">No</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">Yes (up to 10x capacity)</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">Yes</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">Share / collaborate</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">No</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">No</td>
                    <td className="p-4 border-b border-gray-200 text-[#333333]">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-[#666666] mt-4">
              Plan capabilities and limits change. Confirm current details against Anthropic&apos;s support documentation before relying on them. For help choosing between Claude plans, see our <Link href="/claude-pro-vs-max-vs-api" className="text-[#1A1A1A] underline hover:no-underline">Claude Pro vs Max vs API comparison</Link>.
            </p>
          </div>
        </section>

        {/* Course CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                A Project Is Only as Good as Its Instructions
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                The custom instructions field is where most writers lose the gains. If your prompts are vague, your project produces vague work. PromptWritingStudio teaches you to write the precise, repeatable prompts that make a workspace like this genuinely save you hours.
              </p>
              <a
                href={GRADER_URL}
                className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Grade Your Prompt Free
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#333333] text-center mb-12">
              Common questions about Claude Projects, answered for writers
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="p-5 cursor-pointer hover:bg-gray-100 font-semibold text-gray-900 list-none flex justify-between items-center">
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

        {/* Related resources */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                More Claude Guides for Writers
              </h2>
              <p className="text-lg text-[#333333] max-w-2xl mx-auto">
                Keep building your Claude setup with these companion guides and tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/claude-artifacts" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Artifacts Guide</h3>
                <p className="text-sm text-[#666666]">The in-chat preview feature for drafts, docs, and code, explained for writers.</p>
              </Link>
              <Link href="/how-to-use-claude" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">How to Use Claude</h3>
                <p className="text-sm text-[#666666]">A practical walkthrough of Claude for everyday writing work.</p>
              </Link>
              <Link href="/claude-pro-vs-max-vs-api" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Pro vs Max vs API</h3>
                <p className="text-sm text-[#666666]">Which Claude plan fits how you actually use it.</p>
              </Link>
              <Link href="/claude-vs-chatgpt" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude vs ChatGPT</h3>
                <p className="text-sm text-[#666666]">How the two assistants compare for writing work.</p>
              </Link>
              <Link href="/calculators/claude-plan-picker" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Plan Picker</h3>
                <p className="text-sm text-[#666666]">Interactive calculator that recommends the cheapest plan for your usage.</p>
              </Link>
              <Link href="/chatgpt-prompt-templates" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Prompt Template Library</h3>
                <p className="text-sm text-[#666666]">Hundreds of prompts organised by role and task.</p>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
