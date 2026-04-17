import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "Is Claude Code free to use?",
    answer: "Claude Code itself is free to install via npm. However, you need either an Anthropic API key with credits or a Claude Pro ($20/month) or Claude Max ($100-200/month) subscription to power the AI behind it. API usage is billed per token, so costs depend on how much you use it. For light use, expect around $5-20 per month in API costs. Heavy daily usage with Opus models can run significantly higher."
  },
  {
    question: "What is the difference between Claude Code and Cursor?",
    answer: "Claude Code runs entirely in your terminal and works with any editor or IDE. Cursor is a standalone code editor (forked from VS Code) with AI built into the interface. Claude Code is better if you prefer working in the terminal, need deep git integration, or want to use your existing editor. Cursor is better if you want a visual IDE with inline AI suggestions. Many developers use both: Cursor for active editing and Claude Code for complex refactors, git operations, and codebase-wide changes."
  },
  {
    question: "Does Claude Code work with any programming language?",
    answer: "Yes. Claude Code works with any programming language or framework. It reads and writes files regardless of the language. It is particularly strong with JavaScript, TypeScript, Python, Rust, Go, Java, C++, Ruby, and PHP, but it can handle anything from Haskell to COBOL. The quality of output depends on how well the underlying Claude model was trained on that language."
  },
  {
    question: "Can Claude Code break my project?",
    answer: "Claude Code can make destructive changes if you let it. It will ask for permission before running dangerous commands, and it follows a safety protocol for git operations (it won't force push to main without explicit permission, for example). That said, always use version control and review changes before committing. Claude Code works best when you treat it like a capable but fallible junior developer: trust but verify."
  },
  {
    question: "What is a CLAUDE.md file?",
    answer: "CLAUDE.md is a special markdown file you place in your project root to give Claude Code persistent context about your project. It can include coding conventions, architecture decisions, common commands, and anything else Claude should know before making changes. Think of it as onboarding documentation for your AI pair programmer. Claude Code reads it automatically at the start of every session."
  },
  {
    question: "Can Claude Code create pull requests?",
    answer: "Yes. Claude Code has deep git integration. It can stage changes, write commit messages, create branches, push to remotes, and open pull requests using the gh CLI. You can say 'create a PR for these changes' and it will handle the entire workflow, including writing a descriptive PR title and body based on the actual code changes."
  },
  {
    question: "How does Claude Code compare to GitHub Copilot?",
    answer: "They serve different purposes. GitHub Copilot provides real-time inline code completions as you type in your editor. Claude Code is an agentic tool that can autonomously read your entire codebase, make multi-file changes, run tests, manage git, and execute terminal commands. Copilot is a typing assistant. Claude Code is closer to a pair programmer who can independently complete tasks. Many developers use both together."
  },
  {
    question: "What models does Claude Code use?",
    answer: "Claude Code is powered by Anthropic's Claude models. It primarily uses Claude Sonnet for fast operations and Claude Opus for complex reasoning tasks. The specific model version updates automatically as Anthropic releases improvements. As of February 2026, it uses Claude Opus 4 for its most capable mode and Claude Sonnet 4 for standard operations."
  },
  {
    question: "Can Claude Code access the internet?",
    answer: "Yes. Claude Code can perform web searches to look up documentation, find solutions to errors, and research APIs. It can also fetch content from URLs when you provide them. This is useful when you need it to reference current documentation or integrate with a new library it might not have training data about."
  },
  {
    question: "Is Claude Code safe for production codebases?",
    answer: "Claude Code is designed for professional use on real codebases. It follows safety protocols including asking permission for destructive operations, never force-pushing without consent, and preferring new commits over amending existing ones. That said, you should always review its changes, run your test suite, and use proper code review practices. Anthropic uses Claude Code internally to build their own products."
  }
]

const exampleCommands = [
  {
    id: 'fix-bug',
    label: 'Fix a specific bug',
    command: 'Fix the authentication bug where users are logged out after refreshing the page'
  },
  {
    id: 'add-tests',
    label: 'Add unit tests',
    command: 'Add comprehensive unit tests for the user authentication module with at least 90% coverage'
  },
  {
    id: 'refactor-ts',
    label: 'Refactor to TypeScript',
    command: 'Refactor the components in src/components/dashboard/ from JavaScript to TypeScript with proper type definitions'
  },
  {
    id: 'create-pr',
    label: 'Create a pull request',
    command: 'Create a PR for the changes on this branch with a detailed description of what was changed and why'
  },
  {
    id: 'explain-code',
    label: 'Understand unfamiliar code',
    command: 'Explain the data flow in src/lib/api.js and how the caching layer works'
  },
  {
    id: 'add-feature',
    label: 'Build a new feature',
    command: 'Add a dark mode toggle to the settings page that persists the user preference in localStorage and applies it globally'
  },
  {
    id: 'fix-perf',
    label: 'Diagnose performance issues',
    command: 'Find and fix the performance bottleneck causing slow page loads on the /dashboard route'
  },
  {
    id: 'update-deps',
    label: 'Update dependencies',
    command: 'Update all outdated npm packages to their latest stable versions and fix any breaking changes'
  }
]

const comparisonData = [
  { feature: "Type", claudeCode: "Terminal CLI / agentic tool", cursor: "AI-powered code editor (VS Code fork)", copilot: "Inline code completion" },
  { feature: "Interface", claudeCode: "Terminal (works with any editor)", cursor: "Standalone IDE", copilot: "Plugin for existing editors" },
  { feature: "Multi-file editing", claudeCode: "Yes, entire codebase", cursor: "Yes, with Composer", copilot: "Limited (mostly single-file)" },
  { feature: "Git integration", claudeCode: "Deep (commits, PRs, branches)", cursor: "Basic", copilot: "None" },
  { feature: "Terminal commands", claudeCode: "Yes, runs any command", cursor: "Limited", copilot: "No" },
  { feature: "Autonomous agents", claudeCode: "Yes (background agents)", cursor: "Yes (Agent mode)", copilot: "No" },
  { feature: "Plan mode", claudeCode: "Yes", cursor: "No (manual planning)", copilot: "No" },
  { feature: "Web search", claudeCode: "Yes", cursor: "Yes (with @web)", copilot: "No" },
  { feature: "MCP support", claudeCode: "Yes (extensible)", cursor: "Yes", copilot: "No" },
  { feature: "Codebase search", claudeCode: "Built-in grep/glob", cursor: "Codebase indexing", copilot: "Basic context window" },
  { feature: "Starting price", claudeCode: "API usage (~$5-20/mo) or Claude Pro ($20/mo)", cursor: "$20/mo (Pro)", copilot: "$10/mo (Individual)" },
  { feature: "Best for", claudeCode: "Complex refactors, git ops, terminal workflows", cursor: "Daily coding with AI inline", copilot: "Quick inline completions" }
]

export default function ClaudeCodeGuide() {
  const [copiedCommand, setCopiedCommand] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(id)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Code Guide: How to Use Anthropic\'s Agentic Coding CLI (2026)',
    description: 'A comprehensive, hands-on guide to Claude Code, Anthropic\'s agentic coding tool for developers. Covers installation, features, workflows, pricing, and practical tips from daily use.',
    url: 'https://promptwritingstudio.com/claude-code-guide',
    datePublished: '2026-02-01',
    dateModified: '2026-02-27',
    keywords: ['Claude Code guide', 'Claude Code tutorial', 'how to use Claude Code', 'Anthropic Claude Code', 'Claude Code CLI', 'agentic coding', 'AI coding tool']
  })

  return (
    <>
      <Head>
        <title>Claude Code Guide: How to Use Anthropic's Agentic Coding CLI (2026) | PromptWritingStudio</title>
        <meta name="description" content="A practical guide to Claude Code, Anthropic's agentic coding tool. Learn how to install it, use key features, write effective prompts, and integrate it into your development workflow." />
        <meta name="keywords" content="Claude Code guide, Claude Code tutorial, how to use Claude Code, Anthropic Claude Code, Claude Code CLI, agentic coding tool, AI developer tools 2026" />
        <meta property="og:title" content="Claude Code Guide: How to Use Anthropic's Agentic Coding CLI (2026)" />
        <meta property="og:description" content="A practical guide to Claude Code. Installation, features, workflows, pricing, and tips from someone who uses it daily to build real projects." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-code-guide" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-code-guide" />
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
              Claude Code Guide:
              <span className="block text-[#FFDE59]">Anthropic's Agentic Coding CLI</span>
            </h1>

            {/* Answer Block - AEO */}
            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                Claude Code is Anthropic's official command-line tool that turns Claude into an agentic coding assistant. It runs in your terminal, reads and writes files across your entire codebase, executes commands, manages git workflows, searches the web, and runs tests autonomously. It is powered by Claude Opus and Sonnet models and works with any programming language, framework, or editor.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              I use Claude Code every day to build and maintain this site. This guide covers everything I have learned about making it work in a real development workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#installation"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Explore Features
              </a>
            </div>
          </div>
        </section>

        {/* What is Claude Code */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              What is Claude Code?
            </h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                Claude Code is Anthropic's official agentic coding tool. It is a command-line interface (CLI) that runs directly in your terminal and gives Claude deep access to your development environment. Unlike chatbot-style AI assistants where you paste code snippets back and forth, Claude Code operates inside your project. It can read every file, understand the full architecture, make coordinated changes across dozens of files, run your test suite, and commit the results to git.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                The word "agentic" matters here. Claude Code does not just answer questions about code. It takes action. Tell it to fix a bug and it will search your codebase, identify the problem, edit the relevant files, run the tests to verify the fix, and offer to commit the changes. Tell it to refactor a module and it will update every import, every test, and every reference across your project.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                Under the hood, Claude Code is powered by Anthropic's Claude models. It uses Claude Sonnet for fast, routine operations and can escalate to Claude Opus for complex reasoning tasks that require deeper understanding of your codebase. It automatically chooses the right model for the task, though you can configure this.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                I started using Claude Code to build and maintain PromptWritingStudio. Every page you see on this site, including this one, has been built or edited with Claude Code running alongside my workflow. It handles the tedious parts (creating boilerplate, updating imports, writing tests) so I can focus on the content and architecture decisions that actually matter.
              </p>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              How to Install Claude Code
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Getting Claude Code running takes about five minutes. Here is the step-by-step process.
            </p>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">1</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Install Node.js (if you do not have it)</h3>
                    <p className="text-[#333333] mb-3">
                      Claude Code requires Node.js version 18 or higher. Check your version or install it from nodejs.org.
                    </p>
                    <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm relative">
                      <code>node --version</code>
                      <button
                        onClick={() => copyToClipboard('node --version', 'step1')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
                      >
                        {copiedCommand === 'step1' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">2</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Install Claude Code globally via npm</h3>
                    <p className="text-[#333333] mb-3">
                      This installs the <code className="bg-gray-100 px-2 py-1 rounded text-sm">claude</code> command globally so you can run it from any directory.
                    </p>
                    <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm relative">
                      <code>npm install -g @anthropic-ai/claude-code</code>
                      <button
                        onClick={() => copyToClipboard('npm install -g @anthropic-ai/claude-code', 'step2')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
                      >
                        {copiedCommand === 'step2' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">3</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Set up your API key or sign in</h3>
                    <p className="text-[#333333] mb-3">
                      You have two options. Set an Anthropic API key as an environment variable, or sign in with your Claude Pro or Max subscription when prompted.
                    </p>
                    <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm mb-3 relative">
                      <code>export ANTHROPIC_API_KEY=your-api-key-here</code>
                      <button
                        onClick={() => copyToClipboard('export ANTHROPIC_API_KEY=your-api-key-here', 'step3')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
                      >
                        {copiedCommand === 'step3' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <p className="text-sm text-[#666666]">
                      Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-[#FFDE59] underline hover:text-[#E5C84F]">console.anthropic.com</a>. Or skip this step and authenticate via your browser when you first launch Claude Code.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1">4</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Navigate to your project and start Claude Code</h3>
                    <p className="text-[#333333] mb-3">
                      Open your terminal, navigate to your project directory, and run the <code className="bg-gray-100 px-2 py-1 rounded text-sm">claude</code> command. That is it. Claude Code will read your project structure and you can start giving it instructions.
                    </p>
                    <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm relative">
                      <code>cd your-project-directory<br/>claude</code>
                      <button
                        onClick={() => copyToClipboard('cd your-project-directory\nclaude', 'step4')}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white text-xs bg-gray-700 px-2 py-1 rounded"
                      >
                        {copiedCommand === 'step4' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Tip:</strong> On your first run, Claude Code will ask for permission to access your project files and run commands. Accept these permissions so it can work effectively. You can always revoke permissions or adjust them later.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Key Features of Claude Code
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Claude Code is not just a chatbot in your terminal. Here is what it can actually do, based on my daily experience using it.
              </p>
            </div>

            <div className="space-y-8">
              {/* Feature 1: Agentic Coding */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Agentic Coding</h3>
                <p className="text-[#333333] mb-4">
                  This is the core capability. Claude Code does not just suggest code; it reads files, writes changes, searches your codebase, runs tests, and executes terminal commands autonomously. You describe what you want done, and it does the work. It reads files before editing them, searches for related code across the project, makes coordinated changes, and verifies the result.
                </p>
                <p className="text-[#333333]">
                  When I ask it to fix a bug, it starts by reading the relevant files, traces the issue through the code, makes the fix, runs the test suite, and tells me if the tests pass. If they do not, it iterates on the fix. This loop of read, edit, test, repeat is what makes it agentic rather than just conversational.
                </p>
              </div>

              {/* Feature 2: Multi-file editing */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Multi-File Editing Across Entire Codebases</h3>
                <p className="text-[#333333] mb-4">
                  Claude Code understands your project as a whole, not just individual files. It can rename a function and update every import, every test, and every reference across hundreds of files. It can refactor a component from JavaScript to TypeScript and update every file that uses it.
                </p>
                <p className="text-[#333333]">
                  This is where it pulls ahead of copy-paste chatbot workflows. When I refactored the schema generation system for this site, Claude Code updated the generator functions, every page that imported them, and the corresponding tests in a single operation. Doing that manually would have taken an hour. It took three minutes.
                </p>
              </div>

              {/* Feature 3: Git Integration */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Deep Git Integration</h3>
                <p className="text-[#333333] mb-4">
                  Claude Code treats git as a first-class citizen. It can create branches, stage specific files, write meaningful commit messages based on the actual changes, push to remotes, and create pull requests with detailed descriptions. It follows a safety protocol: it never force-pushes to main, prefers creating new commits over amending, and warns you before destructive operations.
                </p>
                <p className="text-[#333333]">
                  My typical workflow: I make a series of changes with Claude Code, review the diff, then say "commit these changes." It writes a commit message that accurately describes what changed and why, stages the right files, and creates the commit. For pull requests, it generates a summary with bullet points based on the full commit history.
                </p>
              </div>

              {/* Feature 4: Terminal Commands */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Terminal Command Execution</h3>
                <p className="text-[#333333] mb-4">
                  Claude Code can run any terminal command: npm install, running test suites, building your project, starting dev servers, linting, formatting, and more. It uses command output to inform its next steps. If a build fails, it reads the error, fixes the code, and tries again.
                </p>
                <p className="text-[#333333]">
                  This is particularly powerful for debugging. When a test fails, Claude Code does not just read the test file. It runs the test, reads the failure output, traces the issue to the source, fixes it, and re-runs the test to confirm. That feedback loop makes it significantly more effective than a tool that cannot execute code.
                </p>
              </div>

              {/* Feature 5: Web Search */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Web Search for Documentation</h3>
                <p className="text-[#333333]">
                  Claude Code can search the web to look up current documentation, find solutions to specific errors, and research APIs. When it encounters a library it does not have training data about, or when documentation has changed since its training cutoff, it can look up the latest information. You can also give it URLs to fetch and read directly.
                </p>
              </div>

              {/* Feature 6: Plan Mode */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Plan Mode for Complex Tasks</h3>
                <p className="text-[#333333] mb-4">
                  For complex changes that affect many parts of your codebase, plan mode is invaluable. Instead of jumping straight into editing, Claude Code first creates a detailed plan: which files need to change, what the changes will be, and in what order. You review and approve the plan before any code is modified.
                </p>
                <p className="text-[#333333]">
                  I use plan mode for anything that touches more than three or four files. It forces Claude Code to think through the full scope of changes before acting, which prevents the kind of half-finished refactors that can leave your codebase in a broken state.
                </p>
              </div>

              {/* Feature 7: Slash Commands */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Slash Commands</h3>
                <p className="text-[#333333] mb-4">
                  Claude Code includes built-in slash commands for common operations:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border border-gray-100">
                    <code className="text-sm font-mono text-[#1A1A1A] font-bold">/help</code>
                    <p className="text-sm text-[#666666] mt-1">Show available commands and usage information</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-100">
                    <code className="text-sm font-mono text-[#1A1A1A] font-bold">/clear</code>
                    <p className="text-sm text-[#666666] mt-1">Clear conversation history and start fresh</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-100">
                    <code className="text-sm font-mono text-[#1A1A1A] font-bold">/compact</code>
                    <p className="text-sm text-[#666666] mt-1">Compress conversation context to save tokens</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-100">
                    <code className="text-sm font-mono text-[#1A1A1A] font-bold">/commit</code>
                    <p className="text-sm text-[#666666] mt-1">Stage and commit changes with an AI-generated message</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-100">
                    <code className="text-sm font-mono text-[#1A1A1A] font-bold">/review-pr</code>
                    <p className="text-sm text-[#666666] mt-1">Review a pull request with detailed feedback</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-100">
                    <code className="text-sm font-mono text-[#1A1A1A] font-bold">/fast</code>
                    <p className="text-sm text-[#666666] mt-1">Toggle faster output mode for quick operations</p>
                  </div>
                </div>
              </div>

              {/* Feature 8: MCP */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">MCP Server Integration</h3>
                <p className="text-[#333333]">
                  Claude Code supports the Model Context Protocol (MCP), which allows you to connect it to external tools and data sources. MCP servers can give Claude Code access to databases, APIs, file systems, and custom tools. This makes it extensible beyond its built-in capabilities. If you have a custom internal tool or API, you can create an MCP server for it and Claude Code will use it naturally as part of its workflow.
                </p>
              </div>

              {/* Feature 9: IDE Integration */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">IDE Integration (VS Code Extension)</h3>
                <p className="text-[#333333]">
                  While Claude Code is primarily a terminal tool, it also has a VS Code extension that brings the same capabilities into your editor. You get the agentic workflow, file editing, terminal execution, and git integration directly inside VS Code. The extension opens Claude Code in a panel within your editor, so you can see changes in real time without switching windows. For developers who prefer a visual IDE but want Claude Code's capabilities, this is the best of both worlds.
                </p>
              </div>

              {/* Feature 10: Background Agents */}
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Background Agents and Parallel Task Execution</h3>
                <p className="text-[#333333]">
                  Claude Code can run tasks in the background while you continue working on other things. You can kick off a long-running operation like a large refactor or test suite, and Claude Code will notify you when it completes. For teams, this means multiple Claude Code instances can work on different parts of a project simultaneously. You can also spawn background agents for specific tasks, essentially running parallel AI-assisted development workstreams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use Effectively */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              How to Use Claude Code Effectively
            </h2>
            <p className="text-xl text-[#333333] mb-12">
              After months of daily use, here are the workflow practices that make the biggest difference.
            </p>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Start with Clear, Specific Instructions</h3>
                <p className="text-[#333333] mb-4">
                  Vague instructions produce vague results. Instead of "fix the styles," say "fix the mobile layout on the pricing page where the cards overlap on screens narrower than 768px." The more context you provide about what is wrong and what you want, the better the output.
                </p>
                <p className="text-[#333333]">
                  Include file paths when you know them. Mention the expected behavior. Describe the current behavior. Claude Code is smart, but it is not psychic. The same prompting principles that work with ChatGPT or Claude chat work here. Be specific, be clear, and provide context.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Use Plan Mode for Complex Changes</h3>
                <p className="text-[#333333] mb-4">
                  If a task touches more than a few files, ask Claude Code to plan first. Say "plan how you would add dark mode support to the entire application" before saying "do it." This gives you a chance to review the approach, catch potential issues, and refine the strategy before any code changes.
                </p>
                <p className="text-[#333333]">
                  I have seen Claude Code go down the wrong path on complex refactors when it dives in without planning. Plan mode prevents that. It is the difference between a developer who thinks before coding and one who starts typing immediately.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Let It Read Before It Edits</h3>
                <p className="text-[#333333] mb-4">
                  Claude Code is designed to read files before modifying them. Do not fight this instinct. When it asks to read a file or search the codebase, let it. The more context it gathers, the better its edits will be.
                </p>
                <p className="text-[#333333]">
                  If you are starting a new session and jumping into a complex task, consider opening with something like "read the key files in the authentication system so you understand the current architecture." Giving Claude Code time to understand the codebase before asking it to change things leads to better results.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Use CLAUDE.md for Project Context</h3>
                <p className="text-[#333333] mb-4">
                  Create a CLAUDE.md file in your project root. This is Claude Code's equivalent of onboarding documentation. Include your coding conventions, project architecture, common commands (how to run tests, how to build, how to deploy), and any quirks that are specific to your project.
                </p>
                <div className="bg-[#1A1A1A] text-green-400 p-4 rounded-lg font-mono text-sm mb-4 overflow-x-auto">
                  <pre>{`# CLAUDE.md

## Project Overview
Next.js site with Tailwind CSS, deployed on Vercel.

## Key Commands
- npm run dev: Start dev server
- npm run build: Production build
- npm run test: Run test suite

## Conventions
- Use functional components only
- Tailwind for all styling (no CSS modules)
- Brand colors: bg-[#1A1A1A], bg-[#FFDE59], bg-[#F9F9F9]
- Import Layout from '../components/layout/Layout'

## Architecture
- /pages: Next.js pages
- /components: Reusable components
- /lib: Utility functions and helpers`}</pre>
                </div>
                <p className="text-[#333333]">
                  Claude Code reads this file automatically at the start of every session. It saves you from repeating the same context every time you start working.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Review Changes Before Committing</h3>
                <p className="text-[#333333] mb-4">
                  Claude Code will not commit changes unless you ask it to. Use this to your advantage. After it makes edits, review the diff. Run your dev server and check the result in the browser. Run your tests. Only then ask it to commit.
                </p>
                <p className="text-[#333333]">
                  This is the same practice you would follow with a human developer. Claude Code is capable and fast, but it can make mistakes. A quick review catches issues before they enter your git history. Treat Claude Code like a skilled junior developer: trust the output, but always review.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Commands */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Example Prompts and Commands
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Here are real prompts I use with Claude Code. Copy any of them and adapt to your project.
              </p>
            </div>

            <div className="space-y-4">
              {exampleCommands.map((example) => (
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

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Pro tip:</strong> The best prompts for Claude Code are the same ones you would give a capable human developer. Describe the desired outcome, include relevant context, and mention any constraints. You do not need special prompt syntax or keywords.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              Claude Code Pricing
            </h2>
            <p className="text-lg text-[#333333] mb-8">
              Claude Code itself is free to install. The cost comes from the AI models powering it. You have two options.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Anthropic API (Pay As You Go)</h3>
                <p className="text-[#666666] mb-4">Best for developers who want flexibility</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">Pay only for what you use, token by token</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">Claude Sonnet: ~$3 per million input tokens, ~$15 per million output tokens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">Claude Opus: ~$15 per million input tokens, ~$75 per million output tokens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">Typical daily use: $5 to $20 per month for moderate usage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">Full control over spending with usage limits</span>
                  </li>
                </ul>
                <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1A1A1A] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#333333] transition-colors duration-200">
                  Get API Key
                </a>
              </div>

              <div className="bg-white p-8 rounded-lg border-2 border-[#FFDE59]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Claude Pro / Max Subscription</h3>
                <p className="text-[#666666] mb-4">Best for heavy daily users</p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">Claude Pro: $20/month with generous usage limits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">Claude Max: $100/month or $200/month for higher limits</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">No per-token billing; predictable monthly cost</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">Access to Claude Code plus the web chat interface</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2 mt-1 flex-shrink-0">+</span>
                    <span className="text-[#333333]">Authenticate via browser; no API key management</span>
                  </li>
                </ul>
                <a href="https://claude.ai/upgrade" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200">
                  Subscribe to Claude
                </a>
              </div>
            </div>

            <div className="bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>My experience:</strong> I use the API for flexibility. On a typical day of building pages and features for this site, I spend between $2 and $10 in API credits. Heavy refactoring days with Claude Opus can cost more, but those are also the days where Claude Code saves me the most time. The ROI is clear: hours of work compressed into minutes.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Claude Code vs Cursor vs GitHub Copilot
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                These tools serve different purposes. Here is how they compare across the features that matter.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-left font-semibold">Claude Code</th>
                    <th className="p-4 text-left font-semibold">Cursor</th>
                    <th className="p-4 text-left font-semibold">GitHub Copilot</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-4 border-b border-gray-200 font-semibold text-[#1A1A1A]">{row.feature}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.claudeCode}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.cursor}</td>
                      <td className="p-4 border-b border-gray-200 text-[#333333]">{row.copilot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-[#F9F9F9] p-6 rounded-lg">
              <p className="text-[#333333]">
                <strong>Bottom line:</strong> These tools are complementary, not competing. Many developers (including me) use Copilot for inline completions while typing, Cursor for visual editing sessions, and Claude Code for complex multi-file refactors, git operations, and tasks that require terminal execution. The right choice depends on the task at hand.
              </p>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Who is Claude Code For?
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Claude Code is built for people who ship code. Here is where it fits best.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">{"</>"}</div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Individual Developers</h3>
                <p className="text-[#333333] mb-4">
                  If you are a solo developer or freelancer, Claude Code is like having a senior engineer available 24/7. It handles the repetitive work (writing tests, updating dependencies, fixing lint errors) so you can focus on architecture and features. It is particularly valuable for solo developers who do not have a team to bounce ideas off of or delegate tedious tasks to.
                </p>
                <p className="text-sm text-[#666666]">
                  Best for: full-stack developers, freelancers, indie hackers
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">{"{ }"}</div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Development Teams</h3>
                <p className="text-[#333333] mb-4">
                  For teams, Claude Code accelerates code reviews, automates pull request creation, and helps maintain consistency across a large codebase. Team members can use shared CLAUDE.md files to ensure Claude Code follows the same conventions. Background agents mean multiple tasks can run in parallel across different team members.
                </p>
                <p className="text-sm text-[#666666]">
                  Best for: startup engineering teams, agencies, enterprise dev teams
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <div className="text-3xl mb-4">{">>>"}</div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Open Source Maintainers</h3>
                <p className="text-[#333333] mb-4">
                  Open source maintainers deal with a constant stream of issues, pull requests, and contributor questions. Claude Code can triage issues, review PRs, suggest fixes, update documentation, and manage releases. For maintainers who are stretched thin, it handles the operational overhead that burns people out.
                </p>
                <p className="text-sm text-[#666666]">
                  Best for: library authors, framework maintainers, community project leads
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#333333] text-center mb-12">
              Common questions about Claude Code, answered from hands-on experience
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-[#F9F9F9] border border-gray-200 rounded-lg overflow-hidden">
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

        {/* Authority Links */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 text-center">
              Official Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Claude Code Documentation</span>
              </a>
              <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Anthropic Official Website</span>
              </a>
              <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Anthropic API Console</span>
              </a>
              <a href="https://www.npmjs.com/package/@anthropic-ai/claude-code" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Claude Code on npm</span>
              </a>
              <a href="https://github.com/anthropics/claude-code" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Claude Code on GitHub</span>
              </a>
              <a href="https://docs.anthropic.com/en/docs/about-claude/models" target="_blank" rel="noopener noreferrer" className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#FFDE59] hover:bg-white transition-all duration-200 bg-white">
                <span className="text-[#FFDE59] mr-3 text-xl">&#8599;</span>
                <span className="font-semibold text-gray-900">Claude Models and Pricing</span>
              </a>
            </div>
          </div>
        </section>

        {/* Claude Code Hub — deeper guides */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                More Claude Code Resources
              </h2>
              <p className="text-lg text-[#333333] max-w-2xl mx-auto">
                Every guide, comparison, and calculator on this site for people working with Claude Code day-to-day.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/claude-code-mcp-stack" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <div className="text-2xl mb-2">🧩</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Minimum Viable MCP Stack</h3>
                <p className="text-sm text-[#666666]">Five MCP servers that pull their weight, with copy-paste .mcp.json.</p>
              </Link>
              <Link href="/claude-pro-vs-max-vs-api" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <div className="text-2xl mb-2">💳</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Pro vs Max vs API</h3>
                <p className="text-sm text-[#666666]">Which Claude plan fits your usage — Pro, Max 5x, Max 20x, or API.</p>
              </Link>
              <Link href="/calculators/claude-plan-picker" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Plan Picker</h3>
                <p className="text-sm text-[#666666]">Interactive calculator — recommends the cheapest plan that fits your actual usage.</p>
              </Link>
              <Link href="/claude-md-playbook" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <div className="text-2xl mb-2">📘</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">CLAUDE.md Playbook</h3>
                <p className="text-sm text-[#666666]">How to write a CLAUDE.md that keeps Claude Code on-rails.</p>
              </Link>
              <Link href="/claude-code-hooks-recipes" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <div className="text-2xl mb-2">🪝</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code Hooks Recipes</h3>
                <p className="text-sm text-[#666666]">Working hook examples — pre-commit checks, telemetry, guardrails.</p>
              </Link>
              <Link href="/skills-vs-mcp-vs-hooks" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <div className="text-2xl mb-2">🧠</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Skills vs MCP vs Hooks</h3>
                <p className="text-sm text-[#666666]">When to use each extension point — and when to skip it.</p>
              </Link>
              <Link href="/claude-code-vs-cursor" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <div className="text-2xl mb-2">🆚</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude Code vs Cursor</h3>
                <p className="text-sm text-[#666666]">Head-to-head on features, workflow, and price.</p>
              </Link>
              <Link href="/calculators/claude-code-vs-cursor-cost" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <div className="text-2xl mb-2">🧮</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Cost Calculator: Claude Code vs Cursor</h3>
                <p className="text-sm text-[#666666]">Monthly API + subscription cost at your usage.</p>
              </Link>
              <Link href="/calculators/claude-prompt-cost" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] hover:bg-white transition">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="font-bold text-[#1A1A1A] mb-2">Claude API Prompt Cost</h3>
                <p className="text-sm text-[#666666]">Estimate the cost of a single Claude API call by model and token count.</p>
              </Link>
            </div>

            <div className="mt-10 text-center">
              <Link href="/calculators" className="inline-flex items-center text-[#1A1A1A] font-semibold underline hover:no-underline">
                See all Claude + AI calculators →
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
