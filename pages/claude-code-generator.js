import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const COURSE_URL = 'https://courses.becomeawritertoday.com/purchase?product_id=6640678'

const faqs = [
  {
    question: "Can Claude generate code?",
    answer: "Yes. Claude can generate working code from a plain-English description. In the Claude chat app you describe what you want and paste the result into your editor. With Claude Code, the command-line tool, Claude writes the files directly into your project, runs them, and fixes its own errors. The quality of the output depends almost entirely on how specific your prompt is."
  },
  {
    question: "Is Claude good at generating code?",
    answer: "Claude is strong across JavaScript, TypeScript, Python, Go, Rust, Java, and SQL, and handles most other languages well. It is best at scoped, well-described tasks: a function, a component, a script, a query. Vague one-line prompts produce generic code. The prompt templates on this page are built to give Claude the constraints it needs to generate code you can actually ship."
  },
  {
    question: "What is the difference between Claude and Claude Code as a code generator?",
    answer: "Claude (claude.ai) generates code as text in a chat window that you copy into your project. Claude Code is a terminal tool that generates code straight into your files, runs it, and iterates until tests pass. Use the chat app for one-off snippets and learning. Use Claude Code when you want the generated code applied across a real codebase."
  },
  {
    question: "How do I get Claude to generate better code?",
    answer: "Give it three things: the exact language and framework version, the inputs and expected outputs, and the constraints (error handling, naming, no external libraries, etc.). Then ask it to explain its approach before writing. Specificity beats length. A weak prompt like 'write a login function' produces guesswork; a strong prompt that names the framework, the auth method, and the return shape produces code you can paste in."
  },
  {
    question: "Is Claude code generation free?",
    answer: "The Claude chat app has a free tier you can use to generate code, with usage limits. Claude Pro is $20/month for higher limits. Claude Code, the terminal tool, runs on either an Anthropic API key (billed per token, roughly $5-20/month for light use) or a Claude Pro/Max subscription. Verify current pricing on Anthropic's site, as plans change."
  }
]

const promptTemplates = [
  {
    id: 'function',
    label: 'Generate a single function',
    template: `Write a [LANGUAGE] function called [NAME] that [WHAT IT DOES].

Inputs: [LIST PARAMETERS AND TYPES]
Returns: [RETURN TYPE AND SHAPE]
Constraints:
- Handle [EDGE CASE] by [BEHAVIOUR]
- Do not use external libraries
- Add a one-line comment above each block

Explain your approach in one sentence before writing the code.`
  },
  {
    id: 'component',
    label: 'Generate a UI component',
    template: `Generate a [FRAMEWORK] component named [NAME] that [WHAT IT DOES].

Props: [LIST PROPS AND TYPES]
Styling: [TAILWIND / CSS MODULES / STYLED-COMPONENTS]
State: [WHAT IT TRACKS]
Behaviour: [INTERACTIONS]

Match this existing file's conventions: [PASTE A SAMPLE COMPONENT].
Return only the component file, no explanation.`
  },
  {
    id: 'script',
    label: 'Generate a utility script',
    template: `Write a [LANGUAGE] script that [TASK].

Input: [FILE / API / STDIN — describe the format]
Output: [WHAT IT SHOULD PRODUCE AND WHERE]
Steps: [NUMBER THE STEPS IF ORDER MATTERS]
Error handling: print a clear message and exit non-zero on [FAILURE CASE].

Use only the standard library. Add usage instructions as a comment at the top.`
  },
  {
    id: 'sql',
    label: 'Generate a SQL query',
    template: `Write a [POSTGRES / MYSQL / SQLITE] query that [GOAL].

Tables and columns: [PASTE SCHEMA]
Filters: [CONDITIONS]
Grouping / ordering: [REQUIREMENTS]

Optimise for readability over cleverness. Explain any join in one sentence.`
  },
  {
    id: 'build',
    label: 'Build a small project (Claude Code)',
    template: `Build a [PROJECT TYPE] in [FRAMEWORK].

Goal: [WHAT THE USER SHOULD BE ABLE TO DO]
Stack: [LANGUAGES, LIBRARIES, VERSIONS]
File structure: [HOW YOU WANT IT ORGANISED, OR "you decide"]

Work in plan mode first. Show me the file plan before writing anything,
then build it one file at a time and run it when done.`
  }
]

export default function ClaudeCodeGenerator() {
  const [copiedId, setCopiedId] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Code Generator: How to Use Claude to Generate Code (2026)',
    description: 'How to use Claude and Claude Code as a code generator, with copy-paste prompt templates for functions, components, scripts, SQL, and small builds.',
    url: 'https://promptwritingstudio.com/claude-code-generator',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['claude code generator', 'claude code builder', 'generate code with claude', 'claude code prompts', 'claude ai code generation']
  })

  return (
    <>
      <Head>
        <title>Claude Code Generator: How to Use Claude to Generate Code (2026) | PromptWritingStudio</title>
        <meta name="description" content="Use Claude as a code generator. Copy-paste prompt templates for generating functions, UI components, scripts, and SQL — plus how Claude Code builds straight into your project." />
        <meta name="keywords" content="claude code generator, claude code builder, generate code with claude, claude code prompts, claude ai code generation, claude code examples" />
        <meta property="og:title" content="Claude Code Generator: How to Use Claude to Generate Code (2026)" />
        <meta property="og:description" content="Copy-paste prompt templates that turn Claude into a reliable code generator for functions, components, scripts, SQL, and small builds." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-code-generator" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-generator" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        {/* Hero */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Updated June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Code Generator
              <span className="block text-[#FFDE59] text-3xl md:text-4xl mt-3">Prompts that turn Claude into a reliable code generator</span>
            </h1>

            {/* AEO answer block */}
            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                A Claude code generator is using Claude to write working code from a plain-English description. You can do this two ways: in the Claude chat app, where Claude returns code you copy into your editor, or with Claude Code, the terminal tool that writes code straight into your project and runs it. The prompt templates below give Claude the constraints it needs to generate code you can ship, not generic placeholder snippets.
              </p>
            </div>

            <a href="#templates" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
              Get the Prompt Templates
            </a>
          </div>
        </section>

        {/* Two ways */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Two ways to generate code with Claude</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Claude chat app (claude.ai)</h3>
                <p className="text-[#333333]">You describe the code, Claude returns it as text, and you paste it into your editor. Best for one-off functions, learning a new pattern, or generating a snippet you will adapt by hand. Has a free tier.</p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Claude Code (terminal)</h3>
                <p className="text-[#333333]">Claude writes generated code directly into your project files, runs it, and fixes its own errors. This is the "builder" workflow — best when you want generated code applied across a real codebase. See the <Link href="/claude-code-guide" className="text-[#1A1A1A] font-semibold underline hover:no-underline">full Claude Code guide</Link>.</p>
              </div>
            </div>
            <p className="text-lg text-[#333333] mt-8">
              Both run on the same Claude models, so the prompting principles are identical. The difference is only where the code lands.
            </p>
          </div>
        </section>

        {/* The rule */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Weak prompt vs strong prompt</h2>
            <p className="text-lg text-[#333333] mb-6">The single biggest factor in code-generation quality is specificity. Compare these two prompts for the same task.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-red-400">
                <p className="font-semibold text-red-600 mb-2">Weak — produces guesswork</p>
                <p className="font-mono text-sm text-[#333333]">"Write a function to validate an email."</p>
                <p className="text-sm text-[#666666] mt-3">Claude guesses the language, the return type, and how strict to be. You get generic code you have to rewrite.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                <p className="font-semibold text-green-600 mb-2">Strong — produces shippable code</p>
                <p className="font-mono text-sm text-[#333333]">"Write a TypeScript function isValidEmail(input: string): boolean. Trim whitespace, reject empty strings, and use a single RFC-5322-pragmatic regex. No external libraries."</p>
                <p className="text-sm text-[#666666] mt-3">Named language, signature, edge cases, and constraint. Claude returns exactly what you asked for.</p>
              </div>
            </div>
            <p className="text-lg text-[#333333] mt-8 font-semibold">
              The rule: name the language and version, the inputs and outputs, and the constraints. The templates below do this for you.
            </p>
          </div>
        </section>

        {/* Templates */}
        <section id="templates" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Claude code generator prompt templates</h2>
            <p className="text-lg text-[#333333] mb-8">Copy a template, fill the bracketed slots, and paste it into Claude or Claude Code. Each one is built to give Claude the constraints it needs.</p>
            <div className="space-y-6">
              {promptTemplates.map((t) => (
                <div key={t.id} className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{t.label}</h3>
                  <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm relative whitespace-pre-wrap">
                    {t.template}
                    <button
                      onClick={() => copyToClipboard(t.template, t.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
                    >
                      {copiedId === t.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common failure */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The most common code-generation failure</h2>
            <p className="text-lg text-[#333333] mb-4">
              Generated code that looks correct but uses a library version you do not have, or a pattern that does not match your codebase. Claude defaults to the most common convention it has seen, which may not be yours.
            </p>
            <p className="text-lg text-[#333333]">
              <strong>The fix:</strong> paste a sample file from your project and add "match this file's conventions" to your prompt. In Claude Code, this is automatic — it reads your existing files first. In the chat app you have to supply the context yourself.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center">Claude code generator FAQ</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-[#F9F9F9] rounded-lg border border-gray-200 group">
                  <summary className="px-5 py-4 font-semibold text-[#1A1A1A] cursor-pointer">{faq.question}</summary>
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Course CTA */}
        <section className="py-16 gradient-bg">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Write prompts that get it right the first time</h2>
            <p className="text-lg text-gray-100 mb-8">
              Code generation is just one place specific prompts pay off. PromptWritingStudio teaches the prompting system behind every template on this page — so you stop rewriting AI output and start shipping it.
            </p>
            <a href={COURSE_URL} className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200 inline-block">
              Join Now
            </a>
          </div>
        </section>

        {/* Related Claude Code pages */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8 text-center">Go deeper on Claude Code</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/claude-code-guide" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Guide</h3>
                <p className="text-sm text-[#666666]">Install it, learn the features, and set up a real development workflow.</p>
              </Link>
              <Link href="/claude-md-playbook" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">CLAUDE.md Playbook</h3>
                <p className="text-sm text-[#666666]">Give Claude Code persistent project context so it generates on-convention code.</p>
              </Link>
              <Link href="/claude-code-vs-cursor" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code vs Cursor</h3>
                <p className="text-sm text-[#666666]">Which agentic coding tool fits your workflow and budget.</p>
              </Link>
              <Link href="/claude-code-pricing" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Pricing</h3>
                <p className="text-sm text-[#666666]">What it actually costs to run Claude Code at your usage level.</p>
              </Link>
              <Link href="/claude-code-review" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Review</h3>
                <p className="text-sm text-[#666666]">Our hands-on verdict on where the generator workflow shines and stalls.</p>
              </Link>
              <Link href="/claude-code-alternatives" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Alternatives</h3>
                <p className="text-sm text-[#666666]">Other code-generation tools worth comparing before you commit.</p>
              </Link>
              <Link href="/claude-code-mcp-stack" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Minimum Viable MCP Stack</h3>
                <p className="text-sm text-[#666666]">Five MCP servers worth installing, with copy-paste config.</p>
              </Link>
              <Link href="/calculators" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude + AI Calculators</h3>
                <p className="text-sm text-[#666666]">Cost and plan calculators for Claude, Claude Code, and the API.</p>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
