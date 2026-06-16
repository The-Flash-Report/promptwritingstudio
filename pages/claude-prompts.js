import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const COURSE_URL = 'https://courses.becomeawritertoday.com/purchase?product_id=6640678'

const faqs = [
  {
    question: "What makes a good Claude prompt?",
    answer: "A good Claude prompt gives Claude a role, one clear action, specific context, and an output format. Claude follows long, structured instructions faithfully, so being explicit pays off: 'Act as a senior copywriter. Rewrite the paragraph below to cut its word count by 30% while keeping the key claim. Return only the rewritten paragraph.' beats 'make this better' almost every time. Vague prompts get competent but generic answers; specific prompts make the quality jump visibly."
  },
  {
    question: "What is the best prompt structure for Claude?",
    answer: "Role, then task, then context, then format, then the input. Put the long reference material (a document, a transcript, data) near the bottom of the prompt and your instruction near the top or the very end. Anthropic recommends wrapping distinct pieces in XML tags so Claude knows where the instructions stop and the data begins, for example <document>...</document> followed by your question."
  },
  {
    question: "Should I use XML tags in Claude prompts?",
    answer: "Yes, when a prompt has multiple parts. Anthropic lists XML structuring as a core prompting technique. Tags like <context>, <example>, and <document> stop Claude from confusing your instructions with the material it is supposed to act on. For a one-line request you do not need them; for anything that pastes in a document, transcript, or dataset, they noticeably improve reliability."
  },
  {
    question: "How is prompting Claude different from prompting ChatGPT?",
    answer: "Claude tends to follow long, detailed, structured instructions more literally, so verbose well-organised prompts that might overwhelm another model often produce its best work. It also responds strongly to XML tags and to a clear system prompt that sets a persistent role. In practice that means you can hand Claude a 200-word brief with sections and it will honour each part, where a terser model might ignore the back half."
  },
  {
    question: "What is a Claude system prompt and when should I use one?",
    answer: "A system prompt is a persistent instruction that sets Claude's role and rules for the whole conversation, separate from each individual message. Use one when you want a consistent persona or constraint across many turns, such as 'You are a technical editor. You never change the meaning of a sentence, only its clarity.' For one-off requests, putting the role in the message itself is enough."
  },
  {
    question: "Why does Claude give vague or generic answers?",
    answer: "Almost always because the prompt was vague. The most common failure is asking for an outcome ('write a good email') without specifying audience, goal, length, and tone. Add those four things and the output changes immediately. The second most common failure is burying the actual instruction in the middle of a long block of pasted text, where it competes with the data for Claude's attention; move the instruction to the end and wrap the data in tags."
  }
]

const promptTemplates = [
  {
    id: 'rewrite',
    label: 'Rewrite / edit (writing)',
    description: 'Editing is where vague prompts fail hardest. This template forces a role, a single edit goal, a constraint, and a clean output.',
    content: `Act as a [senior copy editor / technical writer / plain-English specialist].

Rewrite the text inside <draft> to [goal: cut length by 30% / raise reading ease / make it more direct].

Rules:
- Keep the key claim and the facts unchanged.
- Do not add new information.
- Match a [confident, plain] tone.

Return only the rewritten version, no commentary.

<draft>
[paste your text here]
</draft>`
  },
  {
    id: 'analyse',
    label: 'Analyse a document (business)',
    description: 'The XML tags keep Claude from treating the document as instructions. The question goes last, after the material, where Claude weights it most.',
    content: `You are a [strategy analyst]. Read the document below and answer the question.

<document>
[paste report, contract, or transcript here]
</document>

Question: [What are the three biggest risks, and which one would you act on first and why?]

Format your answer as:
1. A one-sentence summary.
2. The three risks, ranked, one line each.
3. Your recommended first action.`
  },
  {
    id: 'firstdraft',
    label: 'First draft with examples (writing)',
    description: 'Few-shot examples are an official Anthropic technique. Two short samples teach Claude your style faster than three paragraphs describing it.',
    content: `Write a [LinkedIn post] about [topic] for [audience].

Match the style of these examples:

<example>
[paste one short post you like]
</example>

<example>
[paste a second short post you like]
</example>

Constraints: [under 120 words, no hashtags, end on a question].
Write three different versions so I can pick.`
  },
  {
    id: 'debug',
    label: 'Debug code (coding)',
    description: 'State the language, paste the error, paste the code in tags, and ask Claude to reason before fixing. Asking for the cause first prevents confident wrong patches.',
    content: `You are a senior [Python] engineer.

I am getting this error:
<error>
[paste the full error and stack trace]
</error>

Here is the relevant code:
<code>
[paste the function or file]
</code>

First, explain the most likely cause in two sentences.
Then give the corrected code.
Then list one test that would catch this regression.`
  },
  {
    id: 'think',
    label: 'Reason it through (extended thinking)',
    description: 'For problems with steps, asking Claude to think before answering measurably improves accuracy. Keep the final-answer format explicit so the thinking does not bleed into your deliverable.',
    content: `Solve the problem below. Think step by step before you answer.

<problem>
[paste the problem, calculation, or decision]
</problem>

Show your reasoning, then put the final answer on its own line prefixed with "Answer:".`
  }
]

const beforeAfter = [
  {
    weak: 'Write a product description.',
    strong: 'Act as an e-commerce copywriter. Write a 60-word product description for a stainless-steel insulated water bottle aimed at gym-goers. Lead with the benefit, name two features, end with a one-line call to action. No exclamation marks.',
    why: 'The weak version gives Claude no audience, length, structure, or tone, so it returns a generic paragraph you have to rewrite. The strong version fixes all four and the output is usable on the first try.'
  },
  {
    weak: 'Summarise this meeting.',
    strong: 'Summarise the transcript in <transcript> into: (1) decisions made, (2) action items with owners, (3) open questions. Keep each item to one line. If an owner is not stated, write "unassigned".',
    why: 'A bare "summarise" produces a wall of prose. Naming the exact sections and the fallback for missing data turns it into a structured artefact you can paste straight into your notes.'
  },
  {
    weak: 'Make this email more professional.',
    strong: 'Rewrite the email in <draft> to sound calm and professional without being stiff. Keep it under 90 words, keep the request and the deadline, and remove the apology in the opening line. Return only the rewritten email.',
    why: '"More professional" is subjective and unbounded. The strong version defines the tone, sets a length, and names the specific change to make, so Claude is not guessing what "professional" means to you.'
  }
]

const techniques = [
  {
    title: 'Be clear and direct',
    detail: 'State the role, the single action, and the output format. One action verb per prompt — write, analyse, rewrite, summarise, debug. If a colleague would need to ask a clarifying question, so will Claude.'
  },
  {
    title: 'Give examples (multishot)',
    detail: 'Two or three short examples of the output you want teach style faster than a paragraph describing it. This is Anthropic\'s "multishot" technique. Wrap each one in an <example> tag.'
  },
  {
    title: 'Let Claude think first',
    detail: 'For multi-step problems, add "think step by step before you answer". Reasoning before the final answer improves accuracy on analysis, maths, and decisions. Keep the final-answer format explicit so the working does not leak into your deliverable.'
  },
  {
    title: 'Use XML tags',
    detail: 'When a prompt mixes instructions with pasted material, wrap the material in tags like <document>, <draft>, or <transcript>. It tells Claude where your instruction ends and the data begins, which stops it acting on the wrong thing.'
  },
  {
    title: 'Set a system prompt / role',
    detail: 'For a persistent persona across many turns, put the role in a system prompt: "You are a technical editor who never changes meaning, only clarity." For a one-off, the role can live in the message itself.'
  },
  {
    title: 'Chain prompts for big jobs',
    detail: 'Break a large task into linked prompts — outline, then draft from the outline, then edit the draft — rather than asking for everything at once. Each step is easier to steer and easier to fix.'
  }
]

export default function ClaudePrompts() {
  const [copiedId, setCopiedId] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude Prompts: The Best Prompts and How to Write Good Ones',
    description: 'The best Claude prompts plus the method behind them. Copy-pasteable templates with variable slots for writing, business, and coding, weak-vs-strong examples, and the official Anthropic techniques that make them work.',
    url: 'https://promptwritingstudio.com/claude-prompts',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['claude prompts', 'best claude prompts', 'claude prompt examples', 'how to write claude prompts', 'claude ai prompts', 'good claude prompts']
  })

  return (
    <>
      <Head>
        <title>Claude Prompts: The Best Prompts and How to Write Good Ones | PromptWritingStudio</title>
        <meta name="description" content="The best Claude prompts and how to write your own. Copy-pasteable templates for writing, business, and coding, weak-vs-strong examples, and the official Anthropic techniques behind them." />
        <meta name="keywords" content="claude prompts, best claude prompts, claude prompt examples, how to write claude prompts, claude ai prompts, good claude prompts" />
        <meta property="og:title" content="Claude Prompts: The Best Prompts and How to Write Good Ones" />
        <meta property="og:description" content="Copy-pasteable Claude prompt templates for writing, business, and coding, plus weak-vs-strong examples and the official techniques that make them work." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-prompts" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-prompts" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude Prompts
              <span className="block text-[#FFDE59]">The best ones, and how to write your own</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                <strong>The short version:</strong> the best Claude prompts give Claude a role, one clear action, specific context, and an output format. Claude follows long, structured instructions faithfully, so being explicit beats being clever. Below are copy-pasteable templates for writing, business, and coding, each with variable slots — plus the official techniques that make them work and the weak-vs-strong examples that prove it.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#templates" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Jump to the templates
              </a>
              <a href="#techniques" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Learn the method
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">What makes a Claude prompt good</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                Most prompt lists hand you 50 prompts and never tell you why any of them work. That is a problem, because the moment your task differs from the example, you are stuck. The faster path is to learn the shape of a strong prompt once, then fill it in for anything.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                A strong Claude prompt has four parts: a <strong>role</strong> ("act as a senior editor"), one clear <strong>action</strong> ("rewrite", "analyse", "summarise"), specific <strong>context</strong> (audience, goal, constraints), and an <strong>output format</strong> (length, structure, what to return). Claude rewards this. It follows long, detailed instructions more literally than most models, so a structured 150-word brief that might overwhelm another tool tends to produce Claude's best work.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                The templates below are built on that shape. Replace anything in square brackets and paste your material into the tagged blocks.
              </p>
            </div>
          </div>
        </section>

        <section id="templates" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Five copy-pasteable Claude prompt templates</h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                One each for the jobs people actually hire Claude for: editing, document analysis, drafting, debugging, and reasoning. Fill the slots, paste your input, run it.
              </p>
            </div>

            <div className="space-y-8">
              {promptTemplates.map(template => (
                <div key={template.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{template.label}</h3>
                    <p className="text-[#333333]">{template.description}</p>
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

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                Want more in this shape, including ChatGPT versions? See the{' '}
                <Link href="/chatgpt-prompt-templates" className="text-[#1A1A1A] font-semibold underline">fill-in-the-blank prompt templates</Link>{' '}
                and the{' '}
                <Link href="/ai-prompt-examples" className="text-[#1A1A1A] font-semibold underline">prompt examples library</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Weak prompt vs strong prompt</h2>
            <p className="text-lg text-[#333333] mb-10">
              The single biggest lever is specificity. Here is the same request written two ways, with what changed and why the second wins.
            </p>

            <div className="space-y-8">
              {beforeAfter.map((pair, i) => (
                <div key={i} className="bg-[#F9F9F9] rounded-lg border border-gray-200 overflow-hidden">
                  <div className="grid md:grid-cols-2">
                    <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
                      <p className="text-xs font-bold uppercase tracking-wide text-red-500 mb-2">Weak</p>
                      <p className="text-[#333333] font-mono text-sm">{pair.weak}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-wide text-green-600 mb-2">Strong</p>
                      <p className="text-[#333333] font-mono text-sm">{pair.strong}</p>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-[#333333]"><strong>Why it wins:</strong> {pair.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="techniques" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">The six techniques behind every good Claude prompt</h2>
            <p className="text-lg text-[#333333] mb-10">
              These map to Anthropic's own prompt-engineering guidance: clarity, examples, thinking, XML structuring, roles, and chaining. Learn the six and you can build a prompt for any task, not just the ones on a list.
            </p>

            <div className="space-y-6">
              {techniques.map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-4">
                    <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <div>
                      <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{t.title}</h3>
                      <p className="text-[#333333]">{t.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                Source: Anthropic's prompt-engineering documentation lists clarity, examples (multishot), letting Claude think, XML tags, role / system prompts, and prompt chaining as its core techniques. The templates above are these six, applied.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Why your Claude prompts return generic answers</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-5">
                When Claude gives a bland, hedge-everything answer, the prompt is almost always the cause. Two failure modes account for most of it.
              </p>
              <ul className="space-y-4 text-lg text-[#333333]">
                <li><strong>You asked for an outcome, not a spec.</strong> "Write a good email" has no audience, goal, length, or tone, so Claude fills the gaps with the safest generic version. Add those four and the output changes on the next run.</li>
                <li><strong>You buried the instruction inside the data.</strong> When you paste a long document and drop your question in the middle, the question competes with the text for attention. Move the instruction to the end and wrap the document in an <code>&lt;document&gt;</code> tag so Claude knows what to act on.</li>
              </ul>
              <p className="text-lg text-[#333333] mt-6">
                Fix those two and most "Claude is not very good" complaints disappear. The model was waiting for a clearer brief.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Claude prompts vs ChatGPT prompts</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-5">
                The four-part shape works for both, but two things lean Claude-specific. Claude follows long, structured briefs more literally, so a detailed sectioned prompt that might overwhelm a terser model often produces its best work. And Claude responds strongly to XML tags and a persistent system prompt, which is why the templates above lean on both.
              </p>
              <p className="text-lg text-[#333333] mb-5">
                If you are choosing between the two for a given task, the{' '}
                <Link href="/claude-vs-chatgpt" className="text-[#1A1A1A] font-semibold underline">Claude vs ChatGPT comparison</Link>{' '}
                breaks down where each one wins, and the{' '}
                <Link href="/ai-models" className="text-[#1A1A1A] font-semibold underline">AI model comparison</Link>{' '}
                covers the wider lineup. If you are deciding which Claude plan you need, see{' '}
                <Link href="/claude-pro-vs-max-vs-api" className="text-[#1A1A1A] font-semibold underline">Claude Pro vs Max vs API</Link>.
              </p>
              <p className="text-lg text-[#333333]">
                New to Claude entirely? Start with{' '}
                <Link href="/how-to-use-claude" className="text-[#1A1A1A] font-semibold underline">how to use Claude</Link>. To set standing rules that apply to every prompt, see{' '}
                <Link href="/claude-system-prompt" className="text-[#1A1A1A] font-semibold underline">Claude system prompts</Link>, and for longer-form work read{' '}
                <Link href="/claude-for-writing" className="text-[#1A1A1A] font-semibold underline">Claude for writing</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions people ask most about writing prompts for Claude.</p>

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
              Templates get you started. The method makes you fast.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              PromptWritingStudio is the full course on writing prompts that work — for Claude, ChatGPT, and Gemini. You get the frameworks, a template library, and the practice to stop guessing and start getting first-draft-usable output every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={COURSE_URL} className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Join Now
              </a>
              <Link href="/claude-code-guide" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Using Claude for code? Read the guide
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
