import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { getCurrentModelByTier } from '../lib/claude-data'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const opus = getCurrentModelByTier('flagship')
const sonnet = getCurrentModelByTier('workhorse')
const haiku = getCurrentModelByTier('fast')

const faqs = [
  {
    question: "Is Claude good for coding?",
    answer: `Yes. Claude is one of the strongest coding models available. ${opus.name} handles hard reasoning, large refactors, and multi-file changes; ${sonnet.name} is the everyday workhorse for writing functions, tests, and small features; ${haiku.name} is the fast, cheap option for boilerplate and quick lookups. You can use any of them three ways: chatting at claude.ai, calling the API from your own code, or running Claude Code in your terminal.`
  },
  {
    question: "Which Claude model is best for coding?",
    answer: `For most day-to-day coding, ${sonnet.name} is the right default — it is fast, cheap enough to run all day, and capable enough for the large majority of tasks. Reach for ${opus.name} when a problem needs deep reasoning: a gnarly bug, a large refactor, or planning a feature that touches many files. Use ${haiku.name} for high-volume, low-stakes work like generating test fixtures or classifying code. The cost climbs with capability, so start on Sonnet and only escalate when the output is not good enough.`
  },
  {
    question: "What is the difference between using Claude in chat and using Claude Code?",
    answer: "Claude in chat (claude.ai) is copy-paste: you paste code in, read the answer, paste it back into your editor. It is perfect for learning, one-off questions, and explaining unfamiliar code. Claude Code is an agent that runs in your terminal, reads your real files, runs commands, and edits code directly across your whole project. Chat is the lowest-friction way to start; Claude Code is what you graduate to once you are doing this every day."
  },
  {
    question: "Do I need to be a developer to use Claude for coding?",
    answer: "No. Claude in chat is genuinely usable by non-developers for small scripts, spreadsheet formulas, and automating repetitive tasks — you describe what you want in plain English and paste the result where it runs. The catch is that Claude only knows what you tell it. The better your prompt (what the code should do, what tools you have, what the input and output look like), the better the result. That is the whole skill, and it is closer to clear writing than to engineering."
  },
  {
    question: "How much does it cost to use Claude for coding?",
    answer: `Claude in chat is free with daily limits, or ${'$'}20/month for Claude Pro, which also unlocks Claude Code. Heavy daily Claude Code users move to Max plans for higher limits. The API is pay-per-token (${sonnet.name} and ${opus.name} are priced separately) and only works out cheaper for apps and automations you ship, not for your own hands-on-keyboard coding. Start on Pro, prove the workflow, then scale the plan to your real usage.`
  },
  {
    question: "Can Claude write code in any programming language?",
    answer: "Claude is strong across mainstream languages — Python, JavaScript and TypeScript, Java, Go, Rust, SQL, shell, HTML and CSS — and competent in most others. It is best where there is a lot of public code to learn from, so popular languages and frameworks get better results than niche or proprietary ones. For obscure stacks, give Claude more context: paste an example file, name the exact version, and describe the conventions you follow."
  },
  {
    question: "Why does Claude sometimes write code that does not run?",
    answer: "Almost always because it is guessing at something you did not tell it: a library version, a function signature, a file path, or how your data is actually shaped. Claude will confidently invent a plausible-looking API rather than admit it does not know. The fix is context, not a better model — paste the real error, the relevant file, and the exact versions you are on, and ask it to fix that specific failure rather than rewrite from scratch."
  }
]

const promptTemplates = [
  {
    id: 'feature',
    label: 'Write a new function or feature',
    when: 'Best in chat or Claude Code when you know exactly what you want built.',
    content: `You are writing [LANGUAGE] for a [TYPE OF PROJECT].

Write a function that [WHAT IT SHOULD DO].

Inputs: [DESCRIBE INPUTS + TYPES]
Output: [DESCRIBE EXPECTED OUTPUT + TYPE]
Constraints: [e.g. no external libraries, must handle empty input, must be O(n)]

Conventions to follow:
- [e.g. type hints on every argument]
- [e.g. early returns, no nested conditionals deeper than 2]

Return only the function plus a one-line comment on anything non-obvious. Do not explain unless I ask.`
  },
  {
    id: 'debug',
    label: 'Debug an error',
    when: 'Paste the real error and the real file. The most common newcomer mistake is describing the bug instead of showing it.',
    content: `I'm getting this error in [LANGUAGE]:

[PASTE THE FULL ERROR MESSAGE AND STACK TRACE]

Here is the relevant code:

[PASTE THE CODE THAT THROWS — include enough context, not just the one line]

Versions: [LANGUAGE/RUNTIME VERSION], [KEY LIBRARY VERSIONS]

Tell me the root cause in one sentence, then give me the minimal fix. Do not refactor anything I didn't ask about.`
  },
  {
    id: 'explain',
    label: 'Understand unfamiliar code',
    when: 'The fastest way into a new codebase. Works great in chat.',
    content: `Explain this [LANGUAGE] code to me as if I'm an experienced developer who has never seen this codebase.

[PASTE THE CODE]

Cover, in this order:
1. What it does in one sentence.
2. The flow, step by step.
3. Anything surprising, risky, or non-idiomatic.
4. What I'd need to know before changing it.

Be concise. No line-by-line narration.`
  },
  {
    id: 'tests',
    label: 'Write tests for existing code',
    when: 'Hand Claude the function and your test framework. It is reliably good at this.',
    content: `Write tests for this [LANGUAGE] function using [TEST FRAMEWORK, e.g. pytest, Jest, Go testing].

[PASTE THE FUNCTION]

Cover:
- The happy path
- Edge cases: [empty input, nulls, boundary values — name the ones that matter here]
- Any error conditions the function is supposed to raise

Use the same assertion style as this existing test: [PASTE ONE EXISTING TEST, or say "use idiomatic [FRAMEWORK] style"]. Return only the test file.`
  },
  {
    id: 'refactor',
    label: 'Refactor without breaking behaviour',
    when: 'A job for the flagship model. Always tell it what must NOT change.',
    content: `Refactor this [LANGUAGE] code for [GOAL: readability / performance / fewer dependencies].

[PASTE THE CODE]

Hard rules:
- The public behaviour must not change. Same inputs, same outputs.
- Do not add new dependencies.
- [Any other constraint that matters]

Show me the refactored version, then a short bullet list of exactly what changed and why. Flag anything I should test before trusting it.`
  }
]

export default function ClaudeForCoding() {
  const [copiedId, setCopiedId] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude for Coding: The Practical Guide (Models, Workflows, Prompts)',
    description: 'How to use Claude for coding — the three ways to use it, which model to pick, copy-paste prompt templates, and the workflows that actually work. A plain-English starting point.',
    url: 'https://promptwritingstudio.com/claude-for-coding',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['claude for coding', 'claude coding', 'is claude good for coding', 'best claude model for coding', 'claude code prompts', 'claude vs chatgpt coding']
  })

  return (
    <>
      <Head>
        <title>Claude for Coding: The Practical Guide (Models, Workflows, Prompts) | PromptWritingStudio</title>
        <meta name="description" content="How to use Claude for coding: the three ways to run it, which Claude model to pick, copy-paste prompt templates, and the workflows that actually work. A plain-English starting point." />
        <meta name="keywords" content="claude for coding, claude coding, is claude good for coding, best claude model for coding, claude code prompts, claude vs chatgpt for coding" />
        <meta property="og:title" content="Claude for Coding: The Practical Guide" />
        <meta property="og:description" content="The three ways to use Claude for coding, which model to pick, and copy-paste prompt templates that actually work." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-for-coding" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-for-coding" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude for Coding
              <span className="block text-[#FFDE59]">Which model, which workflow, which prompt</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                <strong>Using Claude for coding</strong> means one of three things: chatting at claude.ai, calling the API from your own code, or running Claude Code in your terminal. Pick {sonnet.name} as your default model and {opus.name} for hard problems. The quality of what you get back is mostly decided by your prompt — which is the part this guide actually helps with.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              A no-hype starting point: the three ways to use it, how to choose a model, and five copy-paste prompt templates you can use today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#prompts" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Jump to the prompt templates
              </a>
              <a href="#models" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Which model should I use?
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The three ways to use Claude for coding</h2>
            <p className="text-lg text-[#333333] mb-8">
              People say "Claude for coding" to mean very different things. They map to three levels of friction. Start at the top and move down as your usage grows.
            </p>

            <div className="space-y-4">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">1. Claude in chat (claude.ai)</h3>
                <p className="text-[#333333] mb-3">Copy-paste. You paste code in, read the answer, paste it back into your editor. Zero setup. Best for learning, one-off questions, explaining unfamiliar code, and small scripts. This is where everyone should start.</p>
                <p className="text-[#333333]"><strong>Good for:</strong> beginners, quick fixes, understanding code, anything you can describe in a paragraph.</p>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">2. The Claude API</h3>
                <p className="text-[#333333] mb-3">Calling Claude from your own code, paying per token. This is not for writing your code — it is for building apps and automations that use Claude as a feature. If you are asking "how do I use Claude to help me code", this is not the answer; chat or Claude Code is.</p>
                <p className="text-[#333333]"><strong>Good for:</strong> shipping a product that calls Claude, scripted or high-volume jobs.</p>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">3. Claude Code (terminal agent)</h3>
                <p className="text-[#333333] mb-3">An agent that runs in your terminal, reads your real files, runs commands, and edits code across your whole project — no copy-paste. This is what you graduate to once you are coding with Claude every day. It is a step up in power and a step up in setup.</p>
                <p className="text-[#333333]"><strong>Good for:</strong> daily development, multi-file changes, real projects. See the <Link href="/claude-code-guide" className="text-blue-600 underline font-semibold">full Claude Code guide</Link> when you are ready.</p>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Rule of thumb:</strong> if you are reading this, start in chat. Move to <Link href="/claude-code-guide" className="text-blue-600 underline">Claude Code</Link> when copy-pasting between the browser and your editor starts to feel slow. Reach for the API only when you are building software that calls Claude, not when you are coding for yourself.
              </p>
            </div>
          </div>
        </section>

        <section id="models" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Which Claude model is best for coding?</h2>
            <p className="text-lg text-[#333333] mb-8">
              Anthropic ships three current models. They trade capability against speed and cost. The mistake newcomers make is reaching for the biggest model by default — most coding does not need it, and you pay for the privilege.
            </p>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold px-3 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">Default</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{sonnet.name} — your everyday workhorse</h3>
                    <p className="text-[#333333]">Fast, cheap enough to run all day, and capable enough for the large majority of coding tasks: writing functions, tests, small features, and routine debugging. Make this your default and only escalate when the output is not good enough.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="bg-[#1A1A1A] text-white font-bold px-3 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">Hard</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{opus.name} — for the hard problems</h3>
                    <p className="text-[#333333]">Anthropic's most capable model, with a 1M-token context window. Reach for it on gnarly bugs, large refactors, and planning features that touch many files. It costs more, so use it deliberately — not as a reflex.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="bg-gray-200 text-[#1A1A1A] font-bold px-3 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm">Volume</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{haiku.name} — fast and cheap</h3>
                    <p className="text-[#333333]">The small, fast model for high-volume, low-stakes work: generating test fixtures, classifying code, quick lookups. Rarely your main coding model, but useful for scripted jobs where speed and cost matter more than depth.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                In claude.ai and Claude Code, you often do not pick manually — the product routes your request to a sensible model. Model names and pricing shift over time; for the current lineup and full pricing, see <Link href="/ai-models" className="text-blue-600 underline">the model comparison</Link> and <Link href="/claude-code-pricing" className="text-blue-600 underline">Claude Code pricing</Link>. Weighing Claude against ChatGPT? Read <Link href="/claude-vs-chatgpt" className="text-blue-600 underline">Claude vs ChatGPT</Link>.
              </p>
            </div>
          </div>
        </section>

        <section id="prompts" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Five copy-paste prompt templates for coding</h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                The single biggest lever on Claude's coding output is the prompt, not the model. These work in chat or Claude Code. Fill in the brackets, paste the real code, and be specific about what must <em>not</em> change.
              </p>
            </div>

            <div className="space-y-8">
              {promptTemplates.map(template => (
                <div key={template.id} className="bg-[#F9F9F9] rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{template.label}</h3>
                    <p className="text-[#333333]">{template.when}</p>
                  </div>
                  <div className="relative">
                    <pre className="bg-[#1A1A1A] text-green-400 p-6 overflow-x-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">{template.content}</pre>
                    <button
                      onClick={() => copyToClipboard(template.content, template.id)}
                      className="absolute top-4 right-4 bg-[#FFDE59] text-[#1A1A1A] text-xs font-semibold px-3 py-1.5 rounded hover:bg-[#E5C84F] transition"
                    >
                      {copiedId === template.id ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-lg text-[#333333] mb-4">Want more coding prompts in this fill-in-the-blank style?</p>
              <Link href="/chatgpt-prompts-for/coding" className="inline-block bg-white border-2 border-[#1A1A1A] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#F9F9F9] transition">
                Browse the coding prompt templates
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">A before-and-after that shows why prompts matter</h2>
            <p className="text-lg text-[#333333] mb-8">
              Same model, same task, two prompts. The difference is entirely in what context you hand over.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border-l-4 border-red-300">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Weak prompt</h3>
                <p className="font-mono text-sm text-[#333333] bg-[#F9F9F9] p-4 rounded mb-4">"Fix my login function, it's broken."</p>
                <p className="text-[#333333]">Claude has to guess the language, the framework, what "broken" means, and what the code looks like. It will invent a plausible login function that almost certainly does not match yours — and may use a library you do not have.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-green-400">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Strong prompt</h3>
                <p className="font-mono text-sm text-[#333333] bg-[#F9F9F9] p-4 rounded mb-4">"Here's my Node/Express login handler [paste]. It returns 500 on valid credentials. Error: [paste stack trace]. Using bcrypt 5.x. Find the root cause and give the minimal fix."</p>
                <p className="text-[#333333]">Now Claude has the real code, the real error, and the versions. It can pinpoint the actual bug instead of rewriting your auth from scratch.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The failure mode to watch for: confident guessing</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-5">
                The most common way Claude lets you down is not writing bad code — it is writing <em>plausible</em> code for a situation you did not fully describe. Asked about a library it is unsure of, Claude will invent a clean-looking function name and signature rather than say it does not know. The result compiles in your head and fails in your terminal.
              </p>
              <p className="text-lg text-[#333333] mb-5">Three habits keep you out of that trap:</p>
              <ul className="space-y-4 text-lg text-[#333333]">
                <li><strong>Paste the real thing.</strong> Real code, real error, real version numbers. Never describe what the code does when you can show it.</li>
                <li><strong>Constrain the change.</strong> Tell Claude what must not change ("same inputs and outputs", "no new dependencies"). Open-ended requests invite rewrites you did not want.</li>
                <li><strong>Run it before you trust it.</strong> Treat every snippet as a draft until your tests or your terminal say otherwise. Then feed the actual error back in rather than starting over.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">A simple workflow once you are past copy-paste</h2>
            <p className="text-lg text-[#333333] mb-8">
              When chat starts feeling slow, this is the loop most people settle into with Claude Code. It keeps you in control while letting the agent do the typing.
            </p>

            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">1. Ask for a plan first, not code</h3>
                <p className="text-[#333333]">Have Claude lay out how it would tackle the task before it writes anything. Read the plan, correct what it got wrong, then let it execute. This catches wrong assumptions before they become wrong code.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">2. Work in small steps</h3>
                <p className="text-[#333333]">One function, one bug, one file at a time. Small changes are easy to review and easy to roll back. Sprawling "do everything" requests are where things quietly go off the rails.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">3. Give it persistent context</h3>
                <p className="text-[#333333]">In Claude Code, a <Link href="/claude-md-playbook" className="text-blue-600 underline">CLAUDE.md file</Link> tells the agent your conventions, commands, and gotchas every session, so you stop repeating yourself and it stops guessing.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">4. Review every change</h3>
                <p className="text-[#333333]">You are still the engineer. Read the diff, run the tests, and feed real errors back in. Claude is a fast pair, not a replacement for judgement.</p>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                Ready to set this up properly? Start with the <Link href="/claude-code-guide" className="text-blue-600 underline">Claude Code guide</Link>, follow the <Link href="/claude-code-skills/install-guide" className="text-blue-600 underline">install walkthrough</Link>, and if you are weighing tools, read <Link href="/claude-code-vs-cursor" className="text-blue-600 underline">Claude Code vs Cursor</Link> or the wider field of <Link href="/claude-code-alternatives" className="text-blue-600 underline">Claude Code alternatives</Link>. Want our hands-on take first? See the <Link href="/claude-code-review" className="text-blue-600 underline">Claude Code review</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions people ask before they get started with Claude for coding.</p>

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

        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The model is the easy part. The prompt is the skill.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              You have seen it on this page: same model, wildly different output depending on how you ask. Prompt Writing Studio teaches the prompting frameworks behind these templates — so you get production-ready results from Claude on the first try, not the fifth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://courses.becomeawritertoday.com/purchase?product_id=6640678" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Join Now
              </a>
              <Link href="/chatgpt-prompt-templates" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Browse free prompt templates
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
