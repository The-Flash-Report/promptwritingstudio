import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema, generateHowToSchema } from '../lib/schemaGenerator'

const PAGE_URL = 'https://promptwritingstudio.com/claude-code-tutorial'
const COURSE_URL = 'https://courses.becomeawritertoday.com/purchase?product_id=6640678'

// Steps used for both the visible walkthrough and the HowTo schema.
const howToSteps = [
  { name: 'Install Claude Code', text: 'Confirm Node.js 18+ is installed, then run npm install -g @anthropic-ai/claude-code to add the claude command globally.' },
  { name: 'Launch your first session', text: 'Move into a project folder and run claude. Authenticate with your Claude Pro/Max login or an Anthropic API key when prompted.' },
  { name: 'Send your first prompt', text: 'Ask Claude Code to explain the project. This is a read-only prompt that teaches you how the read-then-act loop works with zero risk.' },
  { name: 'Complete your first real task', text: 'Give it one small, specific job — a copy fix, a tiny feature, a renamed variable — and watch it read, edit, and report back.' },
  { name: 'Review the diff', text: 'Read every change before accepting it. Treat Claude Code like a fast junior developer: trust the work, but verify it.' },
  { name: 'Commit the change', text: 'Ask Claude Code to commit. It writes the message, stages the right files, and creates the commit so your first session ends in clean git history.' }
]

const faqs = [
  {
    question: "What is the fastest way to start a Claude Code tutorial as a beginner?",
    answer: "Install Claude Code with npm install -g @anthropic-ai/claude-code, open a terminal inside any project folder, and run claude. Your very first prompt should be a read-only request like 'Explain what this project does.' That lets you watch how Claude Code reads files before it acts, with no risk of breaking anything. Once you understand that read-then-act loop, you give it a small real task, review the change, and commit. The whole first session takes about 15 minutes."
  },
  {
    question: "Do I need to know how to code to follow a Claude Code tutorial?",
    answer: "You need to be comfortable opening a terminal, navigating into a folder, and reading a code change before you approve it. You do not need to write code yourself. Claude Code writes it. But you do need enough judgement to tell whether a change looks reasonable, which is why this tutorial has you start with read-only prompts and small, low-risk tasks before anything serious. If you have never used a terminal, spend ten minutes on the cd and ls commands first."
  },
  {
    question: "What should my first prompt to Claude Code be?",
    answer: "Make your first prompt read-only so it cannot change anything. Good examples: 'Explain what this project does and how it is structured,' or 'Walk me through how the login flow works.' Claude Code will read the relevant files and summarise them. This teaches you its core behaviour (it reads before it acts) and builds your confidence before you ask it to edit code. Save editing prompts for your second or third request."
  },
  {
    question: "How do I give Claude Code a good first task?",
    answer: "Pick one small, specific, reversible change. Bad: 'improve the homepage.' Good: 'In components/Hero.js, change the headline text to \"Build faster with AI\" and nothing else.' Specific instructions with a file path and a clear expected outcome produce clean results. Keep the first task to a single file so the diff is easy to review. You can scale up to multi-file tasks once you trust the workflow."
  },
  {
    question: "What does Claude Code cost for a beginner just learning it?",
    answer: "Claude Code is free to install. The AI behind it costs money. A Claude Pro subscription at $20/month gives predictable flat-rate access and is the simplest option for someone learning. If you prefer pay-as-you-go, an Anthropic API key bills per token, and a light learning session typically costs well under a dollar. For exact plan guidance, use the Claude Plan Picker calculator on this site."
  },
  {
    question: "How is this tutorial different from the Claude Code guide?",
    answer: "This page is a linear first-session walkthrough: it takes one beginner from a fresh terminal to a committed change in roughly fifteen minutes, in order. The Claude Code guide is the reference hub. It covers every feature, the full pricing breakdown, comparison tables against Cursor and Copilot, and advanced workflows. Start here to get your hands dirty, then move to the guide once you want depth."
  }
]

// Real worked examples — absorbs "claude code examples" intent.
const workedExamples = [
  {
    label: 'Read-only: understand the project',
    safe: true,
    prompt: 'Explain what this project does, the main folders, and where the homepage lives.'
  },
  {
    label: 'First real task: a one-file text change',
    safe: true,
    prompt: 'In the homepage file, change the main headline to "Ship features in minutes" and change nothing else.'
  },
  {
    label: 'Fix a small, specific bug',
    safe: true,
    prompt: 'The contact form submit button does nothing on mobile. Find why and fix only that, then tell me what was wrong.'
  },
  {
    label: 'Add a tiny feature',
    safe: false,
    prompt: 'Add a "back to top" button that appears after the user scrolls 600px down the page. Plan it first, then wait for my go-ahead.'
  },
  {
    label: 'Commit your work',
    safe: true,
    prompt: 'Commit these changes with a clear message describing what changed and why.'
  }
]

export default function ClaudeCodeTutorial() {
  const [copied, setCopied] = useState(null)

  const copy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const howToSchema = generateHowToSchema('Claude Code (First Session Walkthrough)', howToSteps, PAGE_URL)
  const articleSchema = generateArticleSchema({
    title: 'Claude Code Tutorial: Your First Session, Step by Step (2026)',
    description: 'A beginner Claude Code tutorial that walks you through one full first session — install, first prompt, first real task, and your first commit — in about 15 minutes.',
    url: PAGE_URL,
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['claude code tutorial', 'claude code for beginners', 'claude code examples', 'how to use claude code', 'claude code first session', 'claude code walkthrough']
  })

  return (
    <>
      <Head>
        <title>Claude Code Tutorial: Your First Session, Step by Step (2026) | PromptWritingStudio</title>
        <meta name="description" content="A beginner Claude Code tutorial that walks you through one full first session: install, your first prompt, your first real task, and your first commit — in about 15 minutes." />
        <meta name="keywords" content="claude code tutorial, claude code for beginners, claude code examples, how to use claude code, claude code first session, claude code walkthrough 2026" />
        <meta property="og:title" content="Claude Code Tutorial: Your First Session, Step by Step (2026)" />
        <meta property="og:description" content="Go from a fresh terminal to your first committed change with Claude Code in about 15 minutes. A linear, beginner-friendly walkthrough with copy-paste prompts." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={PAGE_URL} />
        <link rel="canonical" href={PAGE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        {/* Hero */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Beginner tutorial · Updated June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Code Tutorial:
              <span className="block text-[#FFDE59]">Your First Session, Step by Step</span>
            </h1>

            {/* Direct-answer block — AEO */}
            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                This Claude Code tutorial walks one beginner through a single first session, in order: install the tool, launch it inside a project, send a safe read-only prompt, complete one small real task, review the change, and make your first commit. It takes about 15 minutes. Every step has a copy-paste prompt you can run as you read.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
              No theory dump. You will type real commands and finish with a committed change in your own project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#step-1" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Start the Walkthrough
              </a>
              <Link href="/claude-code-guide" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                See the Full Reference Guide
              </Link>
            </div>
          </div>
        </section>

        {/* Who this is for + what differs */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Who this tutorial is for</h2>
            <p className="text-lg text-[#333333] mb-4">
              You have heard about Claude Code, maybe installed it, and then stared at a blinking cursor with no idea what to type. This page fixes that. It is a linear, do-it-with-me walkthrough of one complete first session.
            </p>
            <p className="text-lg text-[#333333] mb-4">
              You need three things: a terminal you can open, a code project you do not mind experimenting in, and the willingness to read a change before you approve it. That is the whole prerequisite list.
            </p>
            <div className="bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Tutorial vs reference:</strong> this page gets your hands dirty in one sitting. When you want the deep version — every feature, pricing tables, and how it compares to Cursor and GitHub Copilot — read the <Link href="/claude-code-guide" className="text-[#1A1A1A] underline font-semibold">Claude Code guide</Link>. Bookmark both.
              </p>
            </div>
          </div>
        </section>

        {/* Step 1 — Install (kept brief, linked out) */}
        <section id="step-1" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex items-center mb-6">
              <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">1</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Install Claude Code</h2>
            </div>
            <p className="text-lg text-[#333333] mb-4">
              Claude Code needs Node.js 18 or higher. Check it, then install the tool globally so the <code className="bg-gray-100 px-2 py-1 rounded text-sm">claude</code> command works from any folder.
            </p>
            <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm relative mb-4">
              <code>node --version<br/>npm install -g @anthropic-ai/claude-code</code>
              <button onClick={() => copy('node --version\nnpm install -g @anthropic-ai/claude-code', 'install')} className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded">
                {copied === 'install' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[#333333]">
              That is all the setup this tutorial covers on purpose. If the install errors out, or you want the full setup options (API key vs subscription, Windows notes, IDE extension), follow the dedicated <Link href="/claude-code-skills/install-guide" className="text-[#1A1A1A] underline font-semibold">install guide</Link>, then come back here.
            </p>
          </div>
        </section>

        {/* Step 2 — Launch */}
        <section id="step-2" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex items-center mb-6">
              <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">2</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Launch your first session</h2>
            </div>
            <p className="text-lg text-[#333333] mb-4">
              Open your terminal, move into a project you can safely experiment in, and run the command.
            </p>
            <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm relative mb-4">
              <code>cd path/to/your-project<br/>claude</code>
              <button onClick={() => copy('cd path/to/your-project\nclaude', 'launch')} className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded">
                {copied === 'launch' ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-[#333333] mb-4">
              The first time you run it, Claude Code asks you to sign in. Use your Claude Pro or Max login if you have one, or paste an Anthropic API key. It will then ask permission to read your project files. Say yes.
            </p>
            <p className="text-[#333333]">
              You now have a prompt waiting for you. Do not rush to ask it to build something. The next step is the most important one for a beginner.
            </p>
          </div>
        </section>

        {/* Step 3 — First prompt (read-only) */}
        <section id="step-3" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex items-center mb-6">
              <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">3</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Send your first prompt (make it read-only)</h2>
            </div>
            <p className="text-lg text-[#333333] mb-4">
              Your first prompt should be impossible to get wrong. Ask Claude Code to <strong>explain</strong> the project, not change it. Reading cannot break anything, and it teaches you the single most important thing about how the tool works: it reads files before it acts.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="flex justify-between items-center px-6 py-3 bg-gray-100 border-b border-gray-200">
                <span className="font-semibold text-[#1A1A1A] text-sm">Paste this first</span>
                <button onClick={() => copy('Explain what this project does, the main folders, and where the homepage lives.', 'p3')} className="text-sm font-medium px-3 py-1 rounded bg-[#FFDE59] text-[#1A1A1A] hover:bg-[#E5C84F]">
                  {copied === 'p3' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="px-6 py-4">
                <p className="text-[#333333] font-mono text-sm">Explain what this project does, the main folders, and where the homepage lives.</p>
              </div>
            </div>
            <p className="text-[#333333]">
              Watch what happens. Claude Code opens a few files, then writes you a plain-English summary. That read-then-explain loop is the same loop it uses for every task, including ones that change code. Once you have seen it work safely, you will trust it on real edits.
            </p>
          </div>
        </section>

        {/* Step 4 — First real task */}
        <section id="step-4" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex items-center mb-6">
              <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">4</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Complete your first real task</h2>
            </div>
            <p className="text-lg text-[#333333] mb-4">
              Now give it one small job. The rule for a first task: <strong>one file, one specific change, easy to reverse.</strong> Vague prompts produce messy results, so name the file and the exact outcome.
            </p>

            {/* Before/after — moat requirement */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <p className="text-sm font-bold text-red-700 mb-2">Weak prompt</p>
                <p className="text-[#333333] font-mono text-sm">"Improve the homepage."</p>
                <p className="text-sm text-[#666666] mt-3">Too open. Claude Code has to guess what "improve" means and may touch files you did not expect.</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <p className="text-sm font-bold text-green-700 mb-2">Strong prompt</p>
                <p className="text-[#333333] font-mono text-sm">"In the homepage file, change the main headline to 'Ship features in minutes' and change nothing else."</p>
                <p className="text-sm text-[#666666] mt-3">Names the file, the exact text, and a hard boundary. The diff will be one line.</p>
              </div>
            </div>

            <p className="text-[#333333] mb-4">
              For anything bigger than a single file, add three words to your prompt: <strong>"plan it first."</strong> Claude Code will lay out what it intends to change before touching anything, and you approve the plan. This one habit prevents most beginner accidents.
            </p>
            <div className="bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Known failure mode:</strong> a brand-new beginner asks for a huge change ("rebuild the whole nav"), accepts everything without reading, and ends up with a broken project and no idea what changed. Avoid it by keeping task one tiny, and by reading the diff in the next step before you accept.
              </p>
            </div>
          </div>
        </section>

        {/* Step 5 — Review */}
        <section id="step-5" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex items-center mb-6">
              <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">5</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Review the change before you accept it</h2>
            </div>
            <p className="text-lg text-[#333333] mb-4">
              When Claude Code proposes an edit, it shows you a diff: the old lines and the new lines side by side. Read it. For your one-line headline change this takes five seconds, which is exactly why a small first task matters.
            </p>
            <p className="text-[#333333] mb-4">
              You are not checking whether the code is perfect. You are checking whether it did what you asked and nothing more. If the diff touches a file you did not expect, stop and ask why before accepting.
            </p>
            <p className="text-[#333333]">
              This is the same habit you would apply to a fast junior developer: trust the work, but verify it. The review step is not optional, and it is the single thing that separates people who use Claude Code safely from people who break their projects.
            </p>
          </div>
        </section>

        {/* Step 6 — Commit */}
        <section id="step-6" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="flex items-center mb-6">
              <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">6</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A]">Make your first commit</h2>
            </div>
            <p className="text-lg text-[#333333] mb-4">
              End your first session by saving the change to git. You do not have to remember the commands — just ask.
            </p>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
              <div className="flex justify-between items-center px-6 py-3 bg-gray-100 border-b border-gray-200">
                <span className="font-semibold text-[#1A1A1A] text-sm">Final prompt</span>
                <button onClick={() => copy('Commit these changes with a clear message describing what changed and why.', 'p6')} className="text-sm font-medium px-3 py-1 rounded bg-[#FFDE59] text-[#1A1A1A] hover:bg-[#E5C84F]">
                  {copied === 'p6' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="px-6 py-4">
                <p className="text-[#333333] font-mono text-sm">Commit these changes with a clear message describing what changed and why.</p>
              </div>
            </div>
            <p className="text-[#333333]">
              Claude Code writes the commit message, stages the right files, and creates the commit. That is the full loop: prompt, edit, review, commit. You just shipped your first change with an AI pair programmer. Everything else you will ever do with Claude Code is a bigger version of these six steps.
            </p>
          </div>
        </section>

        {/* Worked examples — absorbs "claude code examples" */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Claude Code examples to run next</h2>
              <p className="text-lg text-[#333333] max-w-2xl mx-auto">
                Once your first session works, try these in order. The green ones are safe for beginners; the last asks Claude Code to plan before acting.
              </p>
            </div>
            <div className="space-y-4">
              {workedExamples.map((ex, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex justify-between items-center px-6 py-3 bg-gray-100 border-b border-gray-200">
                    <span className="font-semibold text-[#1A1A1A] text-sm">
                      {ex.safe ? 'Safe: ' : 'Caution: '}{ex.label}
                    </span>
                    <button onClick={() => copy(ex.prompt, `ex${i}`)} className="text-sm font-medium px-3 py-1 rounded bg-[#FFDE59] text-[#1A1A1A] hover:bg-[#E5C84F]">
                      {copied === `ex${i}` ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-[#333333] font-mono text-sm">{ex.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>The prompt skill carries over:</strong> writing clear instructions for Claude Code is the same skill as writing clear prompts for ChatGPT or Claude chat — name the outcome, give context, set boundaries. If you want to get systematically better at that, the <a href={COURSE_URL} className="text-[#1A1A1A] underline font-semibold">Prompt Writing Studio course</a> teaches the prompting patterns that make every AI tool, including Claude Code, far more reliable.
              </p>
            </div>
          </div>
        </section>

        {/* What to learn next — internal links */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Where to go after your first session</h2>
              <p className="text-lg text-[#333333] max-w-2xl mx-auto">
                You have the loop. These are the next things worth learning, in roughly the order most beginners need them.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/claude-code-guide" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Full Claude Code Guide</h3>
                <p className="text-sm text-[#666666]">The complete reference: every feature, pricing, and tool comparisons.</p>
              </Link>
              <Link href="/claude-md-playbook" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">CLAUDE.md Playbook</h3>
                <p className="text-sm text-[#666666]">Give Claude Code persistent project context so you stop repeating yourself.</p>
              </Link>
              <Link href="/calculators/claude-plan-picker" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Plan Picker</h3>
                <p className="text-sm text-[#666666]">Find the cheapest plan that covers how much you actually use it.</p>
              </Link>
              <Link href="/claude-code-mcp-stack" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Minimum Viable MCP Stack</h3>
                <p className="text-sm text-[#666666]">The five MCP servers worth adding once the basics feel easy.</p>
              </Link>
              <Link href="/claude-code-vs-cursor" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code vs Cursor</h3>
                <p className="text-sm text-[#666666]">How the terminal workflow compares to a visual AI editor.</p>
              </Link>
              <Link href="/claude-code-review" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Review</h3>
                <p className="text-sm text-[#666666]">Our hands-on verdict once you have run it for real work.</p>
              </Link>
              <Link href="/claude-code-pricing" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Pricing</h3>
                <p className="text-sm text-[#666666]">What it costs on each plan, and where the API beats a subscription.</p>
              </Link>
              <Link href="/claude-code-skills/install-guide" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Skills Install Guide</h3>
                <p className="text-sm text-[#666666]">Add slash commands and subagents to automate your repeated workflows.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">
              Claude Code Tutorial FAQ
            </h2>
            <p className="text-xl text-[#333333] text-center mb-12">
              The questions beginners ask on their first day
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

        {/* Course CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Get better at the part that actually matters
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Claude Code is only as good as the instructions you give it. The prompts in this tutorial are simple on purpose — but real work needs real prompting skill. The Prompt Writing Studio course teaches the patterns that make Claude Code, ChatGPT, and every other AI tool produce work you can trust.
            </p>
            <a href={COURSE_URL} className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
              Join Now
            </a>
          </div>
        </section>
      </Layout>
    </>
  )
}
