import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import LastVerified from '../components/LastVerified'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'
import { CURRENT_MODELS, LEGACY_MODELS, MODELS_META } from '../lib/claude-data'

// Approximate word equivalent for a token count. Anthropic's rough guide is
// ~0.75 words per token for English prose. Used only for human-readable scale.
const WORDS_PER_TOKEN = 0.75

function tokensToWords(tokens) {
  return Math.round((tokens * WORDS_PER_TOKEN) / 1000) * 1000
}

function formatTokens(tokens) {
  if (tokens >= 1000000) return `${tokens / 1000000}M`
  if (tokens >= 1000) return `${tokens / 1000}K`
  return String(tokens)
}

function formatWords(words) {
  if (words >= 1000000) return `~${(words / 1000000).toFixed(1)}M words`
  if (words >= 1000) return `~${Math.round(words / 1000)}K words`
  return `~${words} words`
}

const faqs = [
  {
    question: "What is the Claude context window?",
    answer: "The context window is the total amount of text Claude can hold in working memory for a single request — your prompt, any files or pasted text, the conversation history, and Claude's own reply all count against it. It is measured in tokens, not words. One token is roughly 0.75 of an English word, so a 200,000-token window holds about 150,000 words. When a conversation exceeds the window, the oldest content drops out and Claude can no longer 'see' it."
  },
  {
    question: "How big is Claude's context window?",
    answer: `It depends on the model. ${CURRENT_MODELS.map(m => `${m.name} has a ${formatTokens(m.contextTokens)}-token window`).join(', ')}. The flagship and workhorse models reach 1,000,000 tokens — roughly 750,000 words, or several full-length books — while the fastest model holds 200,000 tokens. Limits change as new models ship, so always check the live figure rather than memorising a number.`
  },
  {
    question: "How many words fit in a 1M token context window?",
    answer: "About 750,000 words, using Anthropic's rough guide of 0.75 words per token. That is the length of roughly seven to nine full novels, or a mid-sized codebase. In practice you rarely want to fill it — large contexts cost more, run slower, and can dilute Claude's focus on the part that matters."
  },
  {
    question: "Does a bigger context window make Claude smarter?",
    answer: "No. The context window controls how much Claude can read at once, not how well it reasons. Reasoning quality is a function of the model tier. A larger window lets you feed in more source material, but stuffing it with irrelevant text usually hurts answer quality — a focused 5,000-token prompt beats a bloated 500,000-token one. Use the window for relevant material, not as a dumping ground."
  },
  {
    question: "What happens when I exceed Claude's context window?",
    answer: "In the API you get an error if a single request is too large. In the Claude.ai chat, long conversations are truncated — the earliest messages silently fall out of scope, so Claude appears to 'forget' things you said earlier. The fix is to start a fresh conversation, summarise the important points into a new prompt, or use Projects to keep reference material attached."
  },
  {
    question: "Does the context window affect cost?",
    answer: "On the API, yes — you pay per input token, so a request that fills a 1M-token window costs far more than a tight prompt. On consumer Pro and Max subscriptions there is no per-token charge, but very large contexts count more heavily against your usage limits. Either way, the cheapest and fastest prompt is the one that includes only what Claude needs."
  }
]

const tips = [
  {
    title: 'Send only what matters',
    body: 'Paste the relevant section, not the entire document. A focused 3,000-token prompt almost always outperforms a 300,000-token data dump — and it is cheaper and faster.'
  },
  {
    title: 'Start fresh conversations often',
    body: 'In a long chat, old turns quietly drop out of scope. When a thread drifts, open a new conversation and paste a two-line summary of what Claude needs to remember.'
  },
  {
    title: 'Summarise instead of re-pasting',
    body: 'Rather than re-attaching a long file every turn, ask Claude to summarise it once, then carry the summary forward. You preserve the signal and reclaim the tokens.'
  },
  {
    title: 'Put the question last',
    body: 'When you do load a large context, place your actual instruction at the end of the prompt. Models attend strongly to the most recent text, so the ask should be the last thing Claude reads.'
  },
  {
    title: 'Match the model to the job',
    body: 'You do not need a 1M-token window to rewrite an email. Reserve the large-context models for whole-codebase or whole-book tasks; use the fast model for short, high-volume work.'
  }
]

const longContextModels = CURRENT_MODELS.filter(m => m.contextTokens >= 1000000)

const article = generateArticleSchema({
  title: 'Claude Context Window: Token Limits by Model and How to Manage It (2026)',
  description: 'A plain-English guide to the Claude context window — what it is, the token limit for every current model, the 1M-token window, and practical ways to manage it.',
  slug: 'claude-context-window',
  datePublished: '2026-06-16'
})

export default function ClaudeContextWindow() {
  const faqSchema = generateFAQSchema(faqs)
  const flagship = CURRENT_MODELS[0]

  return (
    <>
      <Head>
        <title>Claude Context Window: Token Limits by Model (2026) | PromptWritingStudio</title>
        <meta name="description" content="What the Claude context window is, the token limit for every current Claude model, the 1M-token window explained, and practical tips to manage it without wasting tokens." />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-context-window" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
            <p className="text-sm font-semibold text-[#FFDE59] uppercase tracking-wide mb-3">Claude · Reference</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Claude Context Window: Token Limits by Model and How to Manage It
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              What the context window actually is, the exact token limit for every current Claude model, and how to work inside it without wasting tokens or losing your thread.
            </p>
            <LastVerified date={MODELS_META.lastVerified} source={MODELS_META.source} label="Model limits verified" className="mt-4 text-gray-300" />
          </div>
        </section>

        <section className="py-10 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="bg-white rounded-lg border-l-4 border-[#FFDE59] p-6 md:p-8 shadow-sm">
              <h2 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide mb-2">The short answer</h2>
              <p className="text-lg text-[#1A1A1A] leading-relaxed">
                The <strong>Claude context window</strong> is the total text Claude can hold in working memory for one request — your prompt, attached files, the conversation so far, and Claude's reply all count. It is measured in <strong>tokens</strong> (≈0.75 of a word each). Claude's top models reach <strong>{formatTokens(flagship.contextTokens)} tokens</strong> ({formatWords(tokensToWords(flagship.contextTokens))}); the fastest model holds 200K. A bigger window lets you feed in more, but it does not make Claude smarter — focused prompts still win.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">What is a context window?</h2>
            <p className="text-[#333333] mb-4 leading-relaxed">
              Think of the context window as Claude's short-term memory for a single request. Everything you put in front of it — the instruction you type, any documents or code you paste, the back-and-forth of the conversation, and the answer it writes — has to fit inside one budget.
            </p>
            <p className="text-[#333333] mb-4 leading-relaxed">
              That budget is counted in <strong>tokens</strong>, not words or characters. A token is a chunk of text — often a short word or part of a longer one. Anthropic's rough rule of thumb is that one token is about <strong>0.75 of an English word</strong>, so 1,000 tokens is roughly 750 words.
            </p>
            <p className="text-[#333333] mb-4 leading-relaxed">
              The single most useful thing to understand: <strong>input and output share the same window.</strong> If a model has a 200,000-token window and your prompt uses 180,000 of them, Claude has only 20,000 tokens left to write its answer. Long inputs squeeze the room available for the reply.
            </p>
            <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5 mt-6">
              <p className="text-[#1A1A1A]"><strong>One-line definition:</strong> the context window is the maximum amount of text — prompt plus reply — that Claude can process in a single request, measured in tokens.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2 text-center">Context window by Claude model</h2>
            <p className="text-[#333333] mb-8 text-center max-w-2xl mx-auto">Current models, with the token limit and the rough word equivalent. Figures pulled live from our model data, verified {MODELS_META.lastVerified}.</p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-gray-200 text-sm">
                <thead className="bg-[#1A1A1A] text-white">
                  <tr>
                    <th className="p-3 text-left">Model</th>
                    <th className="p-3 text-left">Tier</th>
                    <th className="p-3 text-left">Context window</th>
                    <th className="p-3 text-left">≈ Words</th>
                    <th className="p-3 text-left">Max output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {CURRENT_MODELS.map(m => (
                    <tr key={m.id}>
                      <td className="p-3 font-semibold text-[#1A1A1A]">{m.name}</td>
                      <td className="p-3 text-[#333333] capitalize">{m.tier}</td>
                      <td className="p-3 text-[#333333]">{m.contextTokens.toLocaleString()} tokens</td>
                      <td className="p-3 text-[#333333]">{formatWords(tokensToWords(m.contextTokens))}</td>
                      <td className="p-3 text-[#333333]">{m.maxOutputTokens.toLocaleString()} tokens</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Word counts are approximate (0.75 words/token). Older models —{' '}
              {LEGACY_MODELS.filter(m => m.status === 'legacy').slice(0, 3).map(m => m.name).join(', ')} — mostly held 200K tokens. Limits change with each release; verified against{' '}
              <a href={MODELS_META.source} target="_blank" rel="noopener noreferrer" className="underline">Anthropic's model docs</a> on {MODELS_META.lastVerified}.
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">The 1M-token context window, explained</h2>
            <p className="text-[#333333] mb-4 leading-relaxed">
              Claude's flagship and workhorse models — {longContextModels.map(m => m.name).join(' and ')} — carry a <strong>1,000,000-token</strong> context window. That is about <strong>750,000 words</strong>: seven to nine full-length novels, or a substantial software codebase, in a single request.
            </p>
            <p className="text-[#333333] mb-4 leading-relaxed">
              It unlocks genuinely new workflows. You can drop an entire repository in and ask for an architecture review, paste a 300-page contract and ask for the risky clauses, or feed a year of meeting notes and ask for the decisions that were never followed up.
            </p>
            <p className="text-[#333333] mb-4 leading-relaxed">
              Two caveats keep it honest. First, <strong>more context is not free</strong>: on the API you pay per input token, so filling a 1M window is expensive, and even on subscriptions it counts harder against your limits. Second, <strong>large contexts can dilute focus</strong> — burying your real question inside 800,000 tokens of background often produces a worse answer than a tight, relevant prompt.
            </p>
            <div className="bg-[#FFDE59]/10 border-l-4 border-[#FFDE59] p-5 rounded-r mt-6">
              <p className="text-[#1A1A1A]"><strong>Rule of thumb:</strong> use the big window to include material Claude genuinely needs to read — not as an excuse to skip deciding what is relevant.</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2">How to manage the context window</h2>
            <p className="text-[#333333] mb-8">Five habits that keep your prompts sharp, cheap, and inside the limit.</p>
            <div className="space-y-4">
              {tips.map((tip, i) => (
                <div key={i} className="bg-white p-5 rounded-lg border border-[#E5E5E5]">
                  <h3 className="font-bold text-[#1A1A1A] mb-1">{i + 1}. {tip.title}</h3>
                  <p className="text-[#333333] leading-relaxed">{tip.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">A prompt template for large-context tasks</h2>
            <p className="text-[#333333] mb-5 leading-relaxed">
              When you do need to load a long document, structure the prompt so Claude knows what to ignore and what to act on. Fill in the slots:
            </p>
            <div className="bg-[#1A1A1A] text-gray-100 rounded-lg p-5 text-sm leading-relaxed font-mono whitespace-pre-wrap">
{`You are reviewing the material below. Do not summarise all of it.

GOAL: [the one thing you want — e.g. "find every clause that limits liability"]
SCOPE: [which part to focus on — e.g. "sections 4 to 9 only"]
FORMAT: [how to answer — e.g. "a bullet list, clause number then plain-English risk"]

--- MATERIAL START ---
[paste your document, code, or notes here]
--- MATERIAL END ---

Now do the GOAL. Quote the exact text you are referring to.`}
            </div>
            <p className="text-[#333333] mt-5 leading-relaxed">
              <strong>Why it works:</strong> the goal and format sit at the top and bottom — the two positions models attend to most — and the explicit "do not summarise all of it" stops Claude from spending its output budget restating what you pasted.
            </p>
            <p className="text-[#333333] mt-4 leading-relaxed">
              Want hundreds more fill-in-the-blank prompts like this, organised by job to be done? That is the core of the{' '}
              <a href="https://courses.becomeawritertoday.com/purchase?product_id=6640678" className="text-[#1A1A1A] font-semibold underline">Prompt Writing Studio course</a> — the prompt engineering system, not a list of one-off tricks.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 text-center">Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="p-4 cursor-pointer hover:bg-gray-50 font-semibold text-gray-900 list-none flex justify-between items-center">
                    <span>{faq.question}</span>
                    <span className="text-gray-400 ml-4 text-xl flex-shrink-0">+</span>
                  </summary>
                  <div className="px-4 pb-4"><p className="text-gray-600 leading-relaxed">{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-6 text-center">Keep going</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/claude-sonnet-vs-opus" className="block bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Claude Sonnet vs Opus</h3>
                <p className="text-[#333333] text-sm">Which tier to pick — and why the bigger window does not always mean the better model.</p>
              </Link>
              <Link href="/claude-code-guide" className="block bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Claude Code guide</h3>
                <p className="text-[#333333] text-sm">How context management plays out in agentic coding sessions.</p>
              </Link>
              <Link href="/claude-pro-vs-max-vs-api" className="block bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Claude Pro vs Max vs API</h3>
                <p className="text-[#333333] text-sm">How large contexts affect cost and usage limits across plans.</p>
              </Link>
              <Link href="/calculators/claude-prompt-cost" className="block bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Claude prompt cost calculator</h3>
                <p className="text-[#333333] text-sm">See what a large-context request actually costs in input tokens.</p>
              </Link>
              <Link href="/anthropic-api-pricing" className="block bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Anthropic API pricing</h3>
                <p className="text-[#333333] text-sm">Per-token input and output rates by model, where context size hits the bill.</p>
              </Link>
              <Link href="/claude-vs-gemini" className="block bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-1">Claude vs Gemini</h3>
                <p className="text-[#333333] text-sm">How the two stack up on context window and long-document handling.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#1A1A1A] text-center">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-4">Stop wasting tokens on weak prompts</h2>
            <p className="text-gray-300 mb-6">Knowing the context window is the easy part. Writing prompts that get a great answer in the fewest tokens is the skill. The Prompt Writing Studio course is the full system — templates, frameworks, and the engineering behind prompts that work the first time.</p>
            <a href="https://courses.becomeawritertoday.com/purchase?product_id=6640678" className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">Join Now</a>
          </div>
        </section>
      </Layout>
    </>
  )
}
