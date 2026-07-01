import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "What is a Claude system prompt?",
    answer: "A Claude system prompt is a separate instruction block that sets Claude's role, rules, tone, and constraints before the conversation starts. In the Anthropic Messages API it is passed as a dedicated `system` parameter, not as a user message. It applies to every turn of the conversation, so you define behaviour once instead of repeating it in each request. Anthropic's own guidance puts it plainly: 'Setting a role in the system prompt focuses Claude's behavior and tone for your use case.'"
  },
  {
    question: "What is the difference between a system prompt and a user prompt?",
    answer: "The user prompt is the specific request for this turn — the question or task. The system prompt is the standing context that frames how Claude should answer every request in the session: who it is, what it knows, what format to use, and what to avoid. A useful frame: the system prompt is the job description, the user prompt is the individual ticket. Put durable rules in the system prompt and the one-off ask in the user prompt."
  },
  {
    question: "How do I set a system prompt for Claude?",
    answer: "In the Anthropic API you pass it as the `system` field on the messages.create call, alongside the `messages` array. In Claude.ai you set standing behaviour through a Project's custom instructions, which act as a persistent system prompt for every chat in that Project. In tools built on the API (chatbots, agents, internal apps) the developer sets the system prompt in code and the end user never sees it."
  },
  {
    question: "How long should a Claude system prompt be?",
    answer: "As long as it needs to be and no longer. A single role sentence already changes output. Most production system prompts run from a paragraph to a page: role, a few hard rules, output format, and any domain context Claude cannot infer. Every line competes with the user's actual request for attention, so cut anything that is not earning its place. If a rule has never changed an output, delete it."
  },
  {
    question: "Can I use XML tags in a Claude system prompt?",
    answer: "Yes, and Claude is specifically trained to parse them. Anthropic recommends wrapping different content types in their own tags — for example `<instructions>`, `<context>`, and `<examples>` — so Claude can tell rules apart from data. This matters most when the prompt mixes instructions, reference material, and examples. Use consistent, descriptive tag names across your prompts."
  },
  {
    question: "Why is Claude ignoring my system prompt?",
    answer: "Usually one of three things. First, you put the instruction in a user message instead of the `system` field, so it reads as a one-off rather than a standing rule. Second, the prompt is contradictory — it tells Claude to be brief and thorough at once — and Claude picks one. Third, you used negative phrasing ('do not use markdown') which is weaker than positive phrasing ('write in flowing prose paragraphs'). Fix the channel, remove the contradiction, and state what to do rather than what to avoid."
  },
  {
    question: "Does the system prompt count toward token usage?",
    answer: "Yes. The system prompt is sent with every request, so it is billed as input tokens on each turn of the conversation. A long system prompt that repeats on a high-traffic app adds up. This is another reason to keep it tight — and, for stable system prompts, to look at prompt caching so the repeated block is not reprocessed at full cost every call."
  }
]

const templates = [
  {
    id: 'support',
    label: 'Customer support assistant',
    description: 'A role, a tone, hard limits, and an escape hatch. The escalation rule is what stops the bot from inventing policy.',
    content: `You are a customer support assistant for [COMPANY], a [WHAT YOU SELL] company.

Role and tone:
- Friendly, concise, and practical. No corporate filler.
- Answer in plain language. Assume the customer is busy.

Rules:
- Only answer using the information in <knowledge_base>. If the answer is not there, say so.
- Never invent prices, policies, refund terms, or delivery dates.
- For billing disputes, account deletion, or anything legal, do not resolve it yourself. Reply: "I'll pass this to a human agent" and stop.

Output format:
- A direct answer first, in 1-3 sentences.
- Then any steps as a short numbered list, only if steps are needed.`
  },
  {
    id: 'writer',
    label: 'Brand-voice content writer',
    description: 'The before/after value here is voice consistency. Without the voice rules Claude drifts to generic marketing copy by the third paragraph.',
    content: `You are a content writer for [BRAND], writing for [TARGET READER].

Voice:
- Direct and concrete. Short sentences. No hype words ("revolutionary", "game-changing", "unlock").
- Write at roughly an 8th-grade reading level.
- Use the second person ("you") and active voice.

Rules:
- Lead with the reader's problem, not the product.
- Every claim needs a concrete example, number, or step behind it.
- Do not use em dashes or exclamation marks.

Output format:
- A one-sentence hook, then the body in short paragraphs of 2-3 sentences.
- End with a single, specific call to action.`
  },
  {
    id: 'analyst',
    label: 'Document analyst (grounded answers)',
    description: 'This pattern forces Claude to quote before it concludes, which is the most reliable way to cut hallucinated claims on long documents.',
    content: `You are a research analyst. You answer questions strictly from the documents provided.

Rules:
- Before answering, find and quote the passages that support your answer.
- If the documents do not contain the answer, reply: "Not stated in the source documents."
- Never use outside knowledge to fill gaps. Never guess.

Output format:
<evidence>
- Quote the relevant lines, with the source name for each.
</evidence>
<answer>
- Your conclusion, in plain language, grounded only in the evidence above.
</answer>`
  },
  {
    id: 'coding',
    label: 'Coding assistant (single role line)',
    description: 'Proof that one sentence works. This is Anthropic’s own minimal example. Add rules only when you see a behaviour you want to change.',
    content: `You are a helpful coding assistant specializing in Python.

- Prefer the standard library before reaching for dependencies.
- Show the working code first, then a one-line explanation of the tricky part.
- If a request is ambiguous, ask one clarifying question before writing code.`
  }
]

const mistakes = [
  {
    title: 'Putting standing rules in the user message',
    detail: 'If a rule should apply to every turn — role, tone, format, hard limits — it belongs in the system prompt, not pasted at the top of each user message. Rules in the user turn read as a one-off and get diluted as the conversation grows. The system prompt is the only place that reliably persists across the whole session.'
  },
  {
    title: 'Telling Claude what not to do',
    detail: 'Negative instructions are weak. "Do not use markdown" is less reliable than "Write your response as flowing prose paragraphs." Anthropic’s guidance is explicit: tell Claude what to do instead of what not to do. Whenever you catch yourself writing "don’t", rewrite it as the positive behaviour you actually want.'
  },
  {
    title: 'Contradicting yourself',
    detail: 'A prompt that says "be thorough and detailed" in one line and "keep it short" in another forces Claude to pick a winner, and it may not pick yours. Read your system prompt as a single instruction set and resolve every conflict. If two rules genuinely apply in different situations, say which situation triggers which.'
  },
  {
    title: 'Stuffing reference data into the role',
    detail: 'A 2,000-word system prompt that pastes your entire price list and FAQ buries the actual rules. Keep the system prompt to role, rules, and format. Pass bulky reference material as structured context — wrapped in XML tags like <knowledge_base> — so Claude can tell instructions apart from data, and so you can swap the data without rewriting the role.'
  },
  {
    title: 'No escape hatch',
    detail: 'Without an explicit "if you do not know, say so" rule, Claude will try to be helpful and may fill the gap with a plausible guess. Every grounded use case — support, analysis, anything customer-facing — needs a stated fallback: what Claude should say or do when the answer is not available. This single line removes most hallucinated answers.'
  },
  {
    title: 'Letting it go stale',
    detail: 'Model behaviour, your product, and your policies all change. A system prompt that names a deprecated feature or an old refund policy will confidently steer Claude wrong. Review system prompts when you ship a product change, and re-test them when you move to a new Claude model — newer models often need less aggressive prompting than older ones.'
  }
]

export default function ClaudeSystemPrompt() {
  const [copiedId, setCopiedId] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude System Prompt: How to Write Effective System Prompts (With Templates)',
    description: 'What a Claude system prompt is, how to write one that actually changes output, four copy-paste templates, and the common mistakes that make Claude ignore your instructions.',
    url: 'https://promptwritingstudio.com/claude-system-prompt',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['claude system prompt', 'claude system prompt example', 'how to write a claude system prompt', 'claude system prompt template', 'anthropic system prompt']
  })

  return (
    <>
      <Head>
        <title>Claude System Prompt: How to Write Effective System Prompts (With Templates) | PromptWritingStudio</title>
        <meta name="description" content="What a Claude system prompt is, how to write one that changes output, four copy-paste templates, and the mistakes that make Claude ignore your instructions." />
        <meta name="keywords" content="claude system prompt, claude system prompt example, claude system prompt template, how to write a claude system prompt, anthropic system prompt" />
        <meta property="og:title" content="Claude System Prompt: How to Write Effective System Prompts" />
        <meta property="og:description" content="What a Claude system prompt is, how to write one that changes output, four templates you can copy, and the mistakes that make Claude ignore your instructions." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-system-prompt" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-system-prompt" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The Claude System Prompt Guide
              <span className="block text-[#FFDE59]">Set the rules once, get them every turn</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                A Claude system prompt is a separate instruction block that sets Claude&apos;s role, rules, tone, and limits before the conversation starts. In the Anthropic API you pass it as the <code className="bg-black/30 px-1.5 py-0.5 rounded text-[#FFDE59]">system</code> field, and it applies to every turn. Define behaviour once instead of repeating it in every message. This guide covers what it is, how to write one that actually changes output, four templates you can copy, and the mistakes that make Claude ignore you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#how-to-write" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                How to write one
              </a>
              <a href="#templates" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Jump to templates
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">What is a Claude system prompt?</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-6">
                A system prompt is the standing context you give Claude before any specific request. It tells Claude who it is, what it knows, how to respond, and what it must not do. In the Anthropic Messages API it is a dedicated parameter called <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#1A1A1A]">system</code>, passed separately from the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#1A1A1A]">messages</code> array that holds the actual conversation.
              </p>
              <p className="text-lg text-[#333333] mb-6">
                The point is persistence. Anything in the system prompt applies to <strong>every turn</strong> of the conversation, so you set behaviour once rather than re-stating it in each message. Anthropic&apos;s own prompt-engineering guidance is blunt about its value: <em>&quot;Setting a role in the system prompt focuses Claude&apos;s behavior and tone for your use case. Even a single sentence makes a difference.&quot;</em>
              </p>
              <p className="text-lg text-[#333333] mb-6">
                If you are writing one-off prompts in a chat, you may never touch a system prompt directly. If you are building anything that reuses Claude — a support bot, an internal tool, a content pipeline, a Claude.ai Project — the system prompt is where the real control lives.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">System prompt vs user prompt</h2>
            <p className="text-lg text-[#333333] mb-8">
              The two are different jobs. Mixing them up is the single most common reason a system prompt fails to stick.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">System prompt</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li>Standing rules that apply to every turn</li>
                  <li>Role, tone, format, hard limits, domain context</li>
                  <li>Set once, in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">system</code> field</li>
                  <li>The end user usually never sees it</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">User prompt</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li>The specific request for this one turn</li>
                  <li>The question, the task, the input data</li>
                  <li>Sent in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">messages</code> array</li>
                  <li>Changes with every interaction</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Rule of thumb:</strong> the system prompt is the job description, the user prompt is the individual ticket. If a rule should hold no matter what the user asks next, it goes in the system prompt.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Where you set the system prompt</h2>
            <p className="text-lg text-[#333333] mb-8">
              Where it lives depends on how you use Claude. Three common cases:
            </p>

            <div className="space-y-4">
              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">The Anthropic API</h3>
                    <p className="text-[#333333]">Pass your text in the <code className="bg-white px-1.5 py-0.5 rounded text-sm border border-gray-200">system</code> field on the <code className="bg-white px-1.5 py-0.5 rounded text-sm border border-gray-200">messages.create</code> call. This is the canonical way and the one every other surface is built on top of.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Claude.ai Projects</h3>
                    <p className="text-[#333333]">In Claude.ai, a Project&apos;s custom instructions act as a persistent system prompt for every chat inside that Project. Use them to set a standing role and rules without re-typing them in each conversation.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                <div className="flex items-start gap-4">
                  <span className="bg-[#FFDE59] text-[#1A1A1A] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">3</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">Apps and agents built on the API</h3>
                    <p className="text-[#333333]">In a product — a chatbot, an internal tool, an agent — the developer sets the system prompt in code. The end user types only user prompts and never sees the rules governing the assistant.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#1A1A1A] rounded-lg overflow-hidden relative">
              <pre className="text-green-400 p-6 overflow-x-auto font-mono text-sm leading-relaxed">{`# The system prompt is a dedicated parameter (Python SDK)
message = client.messages.create(
    model="claude-opus-4-...",
    max_tokens=1024,
    system="You are a helpful coding assistant specializing in Python.",
    messages=[
        {"role": "user", "content": "How do I sort a list of dicts by key?"}
    ],
)`}</pre>
            </div>
            <p className="text-sm text-gray-500 mt-3">Source: Anthropic prompt-engineering documentation. Use the current model string for whichever Claude model you are calling.</p>
          </div>
        </section>

        <section id="how-to-write" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">How to write an effective Claude system prompt</h2>
            <p className="text-lg text-[#333333] mb-10">Five moves do almost all the work. Start with a role, add only the rules you actually need to change a behaviour you have seen.</p>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">1. Give Claude a specific role</h3>
                <p className="text-[#333333]">One sentence sets tone and focus. &quot;You are a customer support assistant for an accounting-software company&quot; outperforms &quot;You are a helpful assistant&quot;. Specificity beats length — name the job, the company type, and who the reader is.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">2. State rules as positives</h3>
                <p className="text-[#333333]">Tell Claude what to do, not what to avoid. Replace &quot;don&apos;t be verbose&quot; with &quot;answer in 1-3 sentences, then stop&quot;. Anthropic&apos;s guidance is explicit on this: positive instructions are more reliable than prohibitions.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">3. Specify the output format</h3>
                <p className="text-[#333333]">If you want a particular shape, say so: &quot;a direct answer first, then a numbered list of steps&quot;. Format drift is the most common complaint about Claude output, and it is almost always because the format was never stated.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">4. Structure with XML tags</h3>
                <p className="text-[#333333]">Claude is trained to read XML tags. Wrap distinct content types in their own tags — <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&lt;instructions&gt;</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&lt;context&gt;</code>, <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">&lt;examples&gt;</code> — so Claude can tell your rules apart from your reference data.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">5. Add an escape hatch</h3>
                <p className="text-[#333333]">Tell Claude what to do when it does not know: &quot;If the answer is not in the provided documents, say so and stop.&quot; Without this line Claude tries to be helpful and may guess. One sentence removes most hallucinated answers.</p>
              </div>
            </div>

            <div className="mt-8 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>Adding context helps too.</strong> Anthropic notes that explaining <em>why</em> a rule matters improves compliance — &quot;answer in plain language because our readers are non-technical&quot; works better than the bare instruction, because Claude generalises from the reason.
              </p>
            </div>
          </div>
        </section>

        <section id="templates" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">Four Claude system prompt templates</h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Fill in the bracketed slots and paste into the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-base">system</code> field or your Project instructions. Copy the shape — the value is in the structure, not the exact words.
              </p>
            </div>

            <div className="space-y-8">
              {templates.map(template => (
                <div key={template.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{template.label}</h3>
                    <p className="text-[#333333]">{template.description}</p>
                  </div>
                  <div className="relative">
                    <pre className="bg-[#1A1A1A] text-green-400 p-6 overflow-x-auto font-mono text-sm leading-relaxed">{template.content}</pre>
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

            <div className="mt-10 bg-[#F9F9F9] border border-gray-200 rounded-lg p-6">
              <p className="text-[#333333]">
                Need ready-made prompts rather than system-prompt scaffolding? See our <Link href="/claude-prompts" className="text-blue-600 hover:underline font-semibold">Claude prompts library</Link> for task-level prompts, or build one interactively with the <Link href="/ai-prompt-generator/claude-prompt" className="text-blue-600 hover:underline font-semibold">Claude prompt generator</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Common mistakes (and why Claude ignores you)</h2>
            <p className="text-lg text-[#333333] mb-10">When a system prompt does not stick, it is almost always one of these six.</p>

            <div className="space-y-5">
              {mistakes.map((m, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border-l-4 border-red-300">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{m.title}</h3>
                  <p className="text-[#333333]">{m.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">A note on cost and model choice</h2>
            <div className="prose max-w-none">
              <p className="text-lg text-[#333333] mb-5">
                The system prompt is sent on every request, so it is billed as input tokens each turn. On a high-traffic app a long system prompt is a recurring cost, not a one-off. Two things help: keep the prompt tight, and look at prompt caching so a stable system block is not reprocessed at full price on every call.
              </p>
              <p className="text-lg text-[#333333] mb-5">
                Model choice matters too. Newer Claude models follow instructions more literally and often need <em>less</em> aggressive prompting than older ones — phrases like &quot;CRITICAL: you MUST&quot; that were needed before can cause over-triggering now. Re-test your system prompt when you change models. To estimate per-call cost across models, use our <Link href="/calculators/claude-prompt-cost" className="text-blue-600 hover:underline font-semibold">Claude prompt cost calculator</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions people ask when they first start writing system prompts for Claude.</p>

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

        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Want prompts that work without the trial and error?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              System prompts are one layer. PromptWritingStudio teaches the full system — roles, structure, examples, and the patterns that get consistent output from Claude, ChatGPT, and Gemini — with templates you can reuse across every project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/prompt-grader" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Grade Your Prompt Free
              </a>
              <Link href="/claude-code-guide" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Read the Claude Code guide
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
