import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const GRADER_URL = '/prompt-grader'

const faqs = [
  {
    question: "What are Claude Artifacts?",
    answer: "Claude Artifacts are standalone, editable outputs that Claude generates in a dedicated panel next to your chat. Instead of burying a long document, a code file, or a working app inside the conversation, Claude opens it in its own window where you can preview it, run it, edit it, and reuse it. Anthropic creates an artifact automatically when the content is significant and self-contained, typically more than 15 lines, and is something you are likely to want to edit or iterate on. Supported types include Markdown documents, code snippets, single-page HTML sites, SVG images, diagrams, and interactive React components."
  },
  {
    question: "How do I turn Claude Artifacts on?",
    answer: "Open Claude, go to Settings, then Capabilities, and toggle Artifacts on. To build artifacts that run code or create downloadable files, also enable 'Code execution and file creation'. Once enabled, you do not have to ask for an artifact by name. When you prompt Claude to write a document, build a tool, or generate code, it opens the result in the artifact panel on its own."
  },
  {
    question: "Are Claude Artifacts free?",
    answer: "Yes. Artifacts are available on the Free, Pro, Max, Team, and Enterprise plans. Some advanced behaviour is gated to paid tiers: persistent storage for stateful apps (up to 20 MB per artifact) and MCP connections to external services require Pro or above. For writers building documents, outlines, and simple interactive tools, the free tier covers most of what you need."
  },
  {
    question: "How do I share or publish a Claude Artifact?",
    answer: "Open the artifact, then use the publish option in the panel header to generate a public link. Anyone with the link can view and interact with the artifact, and you can embed it on a website. You can also download the source if it is a code or document artifact. Published artifacts are public, so do not publish anything containing private data, client information, or unreleased work."
  },
  {
    question: "What is the difference between Claude Artifacts and Claude Projects?",
    answer: "An artifact is a single output: one document, one app, one diagram. A Project is a workspace that holds many chats and reference files around a shared goal, with persistent context across conversations. You create artifacts inside chats; you organise those chats inside Projects. Use an artifact when you want one deliverable. Use a Project when you want Claude to remember the context behind a whole body of work. See our Claude Projects guide for the workspace side."
  },
  {
    question: "Can Claude Artifacts edit a document in place?",
    answer: "Yes. In a Markdown document artifact you can highlight a section of text and choose 'Edit with Claude' to revise just that passage without regenerating the whole document. Every change is versioned, so you can switch between earlier versions using the version selector if a rewrite goes the wrong way. This makes artifacts far better than chat for any draft you expect to revise more than once."
  },
  {
    question: "Why is Claude not creating an artifact for my request?",
    answer: "Claude only opens an artifact when the output is substantial and self-contained, usually more than 15 lines, and reusable. Short answers, quick explanations, and conversational replies stay in the chat. If you want an artifact and are not getting one, ask explicitly: 'Put this in an artifact so I can edit it.' If artifacts still do not appear, confirm the feature is toggled on in Settings, Capabilities."
  }
]

const artifactTypes = [
  { type: "Markdown documents", forWriters: "Drafts, outlines, briefs, and SOPs you can edit in place and version." },
  { type: "Single-page HTML sites", forWriters: "Landing pages, lead-magnet pages, and one-page portfolios without a code editor." },
  { type: "Interactive React components", forWriters: "Quizzes, calculators, and small interactive tools to embed or share." },
  { type: "Code snippets", forWriters: "Scripts and automations you can copy out and run elsewhere." },
  { type: "SVG images", forWriters: "Simple logos, icons, and social graphics defined in editable code." },
  { type: "Diagrams and flowcharts", forWriters: "Content workflows, funnel maps, and process diagrams from a plain-text description." }
]

const examplePrompts = [
  {
    id: 'doc',
    label: 'Editable document you can iterate on',
    command: 'Create an artifact: a 700-word blog post outline on [TOPIC] for an audience of [AUDIENCE]. Use H2 sections, one sentence of intent per section, and a list of 3 supporting points under each. Keep it as an editable Markdown document so I can revise sections in place.'
  },
  {
    id: 'tool',
    label: 'Interactive tool to share',
    command: 'Build an artifact: a single-page interactive [TOOL TYPE, e.g. headline analyzer] as a React component. Inputs: [INPUTS]. Output: [WHAT IT SHOULD RETURN]. Style it clean and mobile-friendly. I want to publish it as a shareable link.'
  },
  {
    id: 'page',
    label: 'Landing page without a code editor',
    command: 'Create an artifact: a single-page HTML landing page for [OFFER]. Sections: hero with headline and subhead, three benefit blocks, one testimonial placeholder, and a single email-capture call to action. Inline CSS only, no external files. I will publish and embed it.'
  },
  {
    id: 'diagram',
    label: 'Process diagram from plain text',
    command: 'Create an artifact: a flowchart of my content production process. Steps: [LIST YOUR STEPS]. Show decision points where I [DESCRIBE THE DECISION]. Render it as a diagram I can screenshot.'
  }
]

export default function ClaudeArtifacts() {
  const [copiedCommand, setCopiedCommand] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(id)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Artifacts: What They Are and How to Use Them (2026)',
    description: 'A practical guide to Claude Artifacts for writers and builders. What they are, how to turn them on, what they can build, the prompts that produce good ones, and the failure modes to avoid.',
    url: 'https://promptwritingstudio.com/claude-artifacts',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['Claude Artifacts', 'how to use Claude Artifacts', 'what are Claude Artifacts', 'Claude Artifacts for writers', 'Claude Artifacts examples', 'Claude AI artifacts']
  })

  return (
    <>
      <Head>
        <title>Claude Artifacts: What They Are and How to Use Them (2026) | PromptWritingStudio</title>
        <meta name="description" content="What are Claude Artifacts and how do you use them? A practical 2026 guide for writers and builders: how to turn artifacts on, what they can build, copy-paste prompts, and the failure modes to avoid." />
        <meta name="keywords" content="Claude Artifacts, how to use Claude Artifacts, what are Claude Artifacts, Claude Artifacts examples, Claude Artifacts for writers, Claude AI artifacts, Claude Artifacts free" />
        <meta property="og:title" content="Claude Artifacts: What They Are and How to Use Them (2026)" />
        <meta property="og:description" content="A practical guide to Claude Artifacts for writers and builders. What they are, how to turn them on, what they build, and the prompts that produce good ones." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-artifacts" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-artifacts" />
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
              Claude Artifacts:
              <span className="block text-[#FFDE59]">What They Are and How to Use Them</span>
            </h1>

            {/* Answer Block - AEO */}
            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Claude Artifacts are standalone, editable outputs that Claude generates in a panel next to your chat. Instead of leaving a long document, a code file, or a working app stuck inside the conversation, Claude opens it in its own window where you can preview it, edit it in place, version it, and publish it as a shareable link. They work on the free plan, support documents, code, HTML sites, diagrams, and interactive React components, and are most useful for any output you expect to revise more than once.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              This guide is written for people who produce things: writers, marketers, and solo builders. The focus is the prompts that turn artifacts into useful work, not just the buttons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#how-to-use"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                How to Use Them
              </a>
              <a
                href="#prompts"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Copy the Prompts
              </a>
            </div>
          </div>
        </section>

        {/* What are Claude Artifacts */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              What Are Claude Artifacts?
            </h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                A Claude Artifact is a dedicated window that holds a single, self-contained output. When you ask Claude for a long document, a piece of code, a diagram, or a small app, it does not dump the result into the chat. It opens an artifact panel beside the conversation. That panel has a Preview tab that shows the output running or rendered, and a Code or source view you can read and copy.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                Anthropic triggers an artifact when the content is, in its words, <strong>significant and self-contained, typically more than 15 lines, and something you are likely to want to edit, iterate on, or reuse.</strong> A two-line answer stays in the chat. A 600-word draft becomes an artifact you can revise.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                The reason this matters: chat is where ideas are messy and disposable. An artifact is where a deliverable lives. You can edit a passage in place, switch between versions if a rewrite goes wrong, and publish the finished thing as a link. For anyone who writes or builds, that is the difference between talking about the work and actually shipping it.
              </p>
              <div className="bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
                <p className="text-[#333333]">
                  <strong>One-sentence definition:</strong> Claude Artifacts are editable, versioned, shareable outputs that open in their own panel beside the chat, so a draft or tool becomes a deliverable instead of a buried message.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to use */}
        <section id="how-to-use" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              How Do You Use Claude Artifacts?
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Setup takes under a minute. The skill is in the prompting, which comes after.
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">1</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Turn artifacts on</h3>
                    <p className="text-[#333333]">
                      Open Claude, go to Settings, then Capabilities, and toggle Artifacts on. If you want artifacts that run code or produce downloadable files, also enable Code execution and file creation. Artifacts are available on every plan, including the free tier.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">2</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Prompt for something substantial</h3>
                    <p className="text-[#333333]">
                      You do not have to say the word artifact. Ask for a draft, a tool, a page, or a diagram. When the output is long enough and self-contained, Claude opens it in the panel automatically. If it stays in the chat and you want it as an artifact, add: <em>Put this in an artifact so I can edit it.</em>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">3</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Preview, then edit in place</h3>
                    <p className="text-[#333333]">
                      Toggle between Preview and the source view in the panel. In a Markdown document, highlight a passage and choose Edit with Claude to rewrite just that section. Every change is versioned, so you can roll back with the version selector if a rewrite goes the wrong way.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">4</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Publish or download</h3>
                    <p className="text-[#333333]">
                      Use the publish option in the panel header to generate a public link anyone can open and interact with, or embed it on a site. For code and document artifacts you can download the source. Published artifacts are public, so keep private data out of anything you publish.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What they can build */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              What Can Claude Artifacts Build?
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Six artifact types matter most. Here is what each one is good for if your work is content rather than software.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Artifact type</th>
                    <th className="p-4 text-left font-semibold">What it is good for</th>
                  </tr>
                </thead>
                <tbody>
                  {artifactTypes.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">{row.type}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.forWriters}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>The pattern that holds across all six:</strong> use an artifact for anything you will touch more than once. A throwaway answer belongs in the chat. A draft, a page, a tool, or a workflow map belongs in an artifact where you can version and publish it.
              </p>
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              Weak Prompt vs Strong Prompt
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              The artifact feature is only as good as the prompt behind it. Most disappointing artifacts trace back to a vague request. Here is the same goal asked two ways.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Weak prompt</h3>
                <p className="text-[#333333] font-mono text-sm bg-gray-50 p-4 rounded mb-4">
                  Make me a content calendar.
                </p>
                <p className="text-[#666666] text-sm">
                  Claude guesses the format, the timeframe, the channels, and the columns. You get a generic table you have to rebuild. No clear deliverable, so it may not even become an artifact.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-2 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Strong prompt</h3>
                <p className="text-[#333333] font-mono text-sm bg-gray-50 p-4 rounded mb-4">
                  Create an artifact: an interactive 4-week content calendar as a React component. Columns: date, channel, hook, status. Pre-fill 3 LinkedIn posts and 1 newsletter per week on the theme of AI for writers. Let me edit cells and tick status. Mobile-friendly. I will publish the link.
                </p>
                <p className="text-[#666666] text-sm">
                  Format, scope, columns, sample content, interactivity, and the end goal are all specified. You get a working tool on the first pass, with little rework.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>The rule:</strong> name the artifact type, the structure, a sample of the content, and what you will do with it. Specificity is what separates a usable artifact from one you throw away.
              </p>
            </div>
          </div>
        </section>

        {/* Prompts */}
        <section id="prompts" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Copy-Paste Artifact Prompts
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Fill-in-the-blank templates for the four artifacts writers and builders reach for most. Replace the bracketed slots and paste into Claude.
              </p>
            </div>

            <div className="space-y-4">
              {examplePrompts.map((example) => (
                <div key={example.id} className="bg-[#F9F9F9] rounded-lg border border-gray-200 overflow-hidden">
                  <div className="flex justify-between items-center px-6 py-3 bg-gray-100 border-b border-gray-200">
                    <span className="font-semibold text-[#1A1A1A] text-sm">{example.label}</span>
                    <button
                      onClick={() => copyToClipboard(example.command, example.id)}
                      className="text-sm font-medium px-3 py-1 rounded bg-[#FFDE59] text-[#1A1A1A] hover:bg-[#E5C84F] transition-colors duration-200"
                    >
                      {copiedCommand === example.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="px-6 py-4">
                    <p className="text-[#333333] font-mono text-sm">{example.command}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#F9F9F9] border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                Want a full library of fill-in-the-blank prompts like these, organised by task? The <Link href="/chatgpt-prompt-templates" className="text-[#1A1A1A] font-semibold underline hover:no-underline">prompt template library</Link> has more, and the free <a href={GRADER_URL} className="text-[#1A1A1A] font-semibold underline hover:no-underline">Prompt Grader</a> scores your own version and shows you exactly what to fix.
              </p>
            </div>
          </div>
        </section>

        {/* Failure modes */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              Four Failure Modes (and How to Avoid Them)
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Most artifact frustration comes from a handful of avoidable mistakes. Here they are.
            </p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">1. No artifact appears</h3>
                <p className="text-[#333333]">
                  Claude only opens an artifact when the output is substantial and self-contained, usually more than 15 lines. Short requests stay in the chat. Fix: make the deliverable bigger or ask explicitly, <em>Put this in an artifact.</em> If nothing ever appears, the feature is off in Settings, Capabilities.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">2. Regenerating the whole thing for a small change</h3>
                <p className="text-[#333333]">
                  Asking Claude to redo the entire artifact to fix one paragraph wastes time and risks changing parts you liked. Fix: in a document, highlight the passage and use Edit with Claude. For other types, tell Claude exactly which section to change and leave the rest untouched.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">3. Publishing private data</h3>
                <p className="text-[#333333]">
                  A published artifact is public to anyone with the link. Writers paste client names, draft pricing, or unreleased work into an artifact and then publish it. Fix: treat publish as posting to the open web. Strip anything confidential before you generate the link.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">4. Treating an artifact like a project workspace</h3>
                <p className="text-[#333333]">
                  An artifact is one output. It does not carry context across separate chats. If you keep re-explaining your brand, audience, or style every session, you want a workspace, not an artifact. Fix: use a <Link href="/claude-projects" className="text-[#1A1A1A] font-semibold underline hover:no-underline">Claude Project</Link> to hold the persistent context, and create artifacts inside it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              The Feature Is Free. The Skill Is the Prompt.
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Artifacts turn Claude into a place where your drafts and tools actually ship. But the gap between a throwaway artifact and a useful one is entirely in how you ask. Prompt Writing Studio teaches the framework behind every strong prompt on this page, with a library you can use across writing, marketing, and building.
            </p>
            <a
              href={GRADER_URL}
              className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
            >
              Grade Your Prompt Free
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#333333] text-center mb-12">
              Common questions about Claude Artifacts, answered
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

        {/* Related guides */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                More Claude Guides
              </h2>
              <p className="text-lg text-[#333333] max-w-2xl mx-auto">
                Keep going with the rest of our practical Claude coverage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/claude-projects" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Projects Guide</h3>
                <p className="text-sm text-[#666666]">Workspaces that hold context across many chats. The companion to artifacts.</p>
              </Link>
              <Link href="/claude-code-guide" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Guide</h3>
                <p className="text-sm text-[#666666]">Anthropic's agentic coding CLI for building in the terminal.</p>
              </Link>
              <Link href="/chatgpt-prompt-templates" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Prompt Template Library</h3>
                <p className="text-sm text-[#666666]">Fill-in-the-blank prompts organised by task.</p>
              </Link>
              <Link href="/content-creators-ai" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">AI for Content Creators</h3>
                <p className="text-sm text-[#666666]">How writers and creators put AI to work day to day.</p>
              </Link>
              <Link href="/claude-vs-chatgpt" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude vs ChatGPT</h3>
                <p className="text-sm text-[#666666]">Which model fits which task, side by side.</p>
              </Link>
              <a href={GRADER_URL} className="block p-6 bg-[#1A1A1A] rounded-lg border border-[#1A1A1A] hover:bg-[#333333] transition">
                <h3 className="font-bold text-white mb-2">Prompt Writing Studio</h3>
                <p className="text-sm text-gray-300">The course behind every prompt framework on this site. Grade Your Prompt Free.</p>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
