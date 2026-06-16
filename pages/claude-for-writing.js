import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'
import { getAIModelById } from '../lib/ai-models'

const COURSE_URL = 'https://courses.becomeawritertoday.com/purchase?product_id=6640678'

// Pull live model facts from the central JSON so names/prices update in one place.
const opus = getAIModelById('claude-opus-4-7')
const sonnet = getAIModelById('claude-sonnet-4-6')
const haiku = getAIModelById('claude-haiku-4-5-20251001')

const modelPicker = [
  {
    model: opus.display_name,
    use: 'Hard, high-stakes writing',
    detail: `Book chapters, long essays, dense technical docs, anything where you want the model to hold a 30-page argument in its head. ${opus.context_window_label} context. Slowest and priciest of the three, worth it when quality matters more than speed.`
  },
  {
    model: sonnet.display_name,
    use: 'Daily writing workhorse',
    detail: `The right default for most writing tasks: blog drafts, newsletters, rewrites, outlines, email. Fast, ${sonnet.context_window_label} context, and good enough that most writers never need to reach for Opus. This is the one to live in.`
  },
  {
    model: haiku.display_name,
    use: 'Bulk, low-stakes text',
    detail: `Headlines, subject-line variations, tagging, quick reformatting, first-pass summaries of short pieces. ${haiku.context_window_label} context. Use it when you need volume and speed and the output gets a human edit anyway.`
  }
]

const beforeAfter = {
  weak: 'Write a blog post about email marketing.',
  weakResult: 'A generic 600-word listicle: "In today\'s digital landscape, email marketing remains a powerful tool..." Bland intro, five obvious tips, no point of view.',
  strong: `You are writing for solo consultants who already send a monthly newsletter but get almost no replies.

Write a 900-word blog post on why their emails get ignored and three specific fixes.

Constraints:
- Open with a concrete failure scenario, not a definition.
- Plain, direct sentences. No "in today's digital landscape" openers.
- One example per fix, drawn from a one-person consulting business.
- End with a single action the reader can take this week.
- Voice: dry, practical, slightly contrarian. Short paragraphs.`,
  strongResult: 'A post that opens on a consultant staring at a 0.4% reply rate, names the real cause (writing to a list like it\'s a billboard), and gives three fixes with concrete examples. On-voice, useful, publishable with a light edit.'
}

const voiceSteps = [
  {
    title: '1. Give it a sample, not an adjective',
    body: '"Write in a friendly tone" means almost nothing. Paste 300-500 words you have already written and say: "Match the voice in this sample — sentence length, rhythm, vocabulary." Claude is unusually good at mimicking a concrete sample. Adjectives produce generic prose; samples produce yours.'
  },
  {
    title: '2. Name what to avoid',
    body: 'Tell it the patterns you hate. "No em dashes. No rhetorical questions as openers. Never start a sentence with \'In today\'s.\' Avoid the words leverage, robust, seamless." A short ban-list removes most of the AI-tells in one move.'
  },
  {
    title: '3. Set the reader, not just the topic',
    body: 'Voice is partly a function of audience. "Writing for a skeptical CFO" and "writing for a first-time founder" produce different prose from the same instruction. Define the reader and the register follows.'
  },
  {
    title: '4. Build a reusable style block',
    body: 'Once you find a voice that works, save the instructions as a block you paste at the top of every chat — or pin it in a Claude Project so it applies automatically. This is the difference between re-explaining your voice daily and having it on tap.'
  }
]

const editSteps = [
  {
    title: 'Line edit without rewriting',
    body: 'Paste your draft and say: "Line-edit for clarity and rhythm. Keep my voice and my structure. Do not add ideas, do not reorder paragraphs. Return the edited text, then a short bullet list of the changes and why." The constraints stop Claude from quietly turning your piece into its piece.'
  },
  {
    title: 'Critique before it touches a word',
    body: 'Sometimes you want diagnosis, not surgery. "Read this draft as a tough editor. List the three weakest paragraphs and why. Do not rewrite anything yet." Then you fix the real problems instead of accepting a smooth rewrite that buries them.'
  },
  {
    title: 'Tighten to a word count',
    body: '"Cut this from 1,100 words to 800 without losing any of the three main arguments. Show me what you cut." The "show me what you cut" clause keeps you in control of the edit instead of trusting it blind.'
  },
  {
    title: 'Catch your tics',
    body: '"List every word or phrase I use more than twice, and every sentence longer than 30 words." Claude is a fast, honest mirror for the habits you stop noticing in your own writing.'
  }
]

const longFormSteps = [
  {
    title: 'Outline first, in a separate turn',
    body: 'Do not ask for a 3,000-word piece in one shot. Get the outline first: "Give me a section-by-section outline with a one-line purpose for each section." Approve or fix the structure, then write section by section. The result holds together; the one-shot version drifts.'
  },
  {
    title: 'Use the long context, but anchor it',
    body: `Opus and Sonnet both ship with ${opus.context_window_label} context, so you can paste an entire transcript, research dump, or prior draft. But say what to do with it: "Use the attached interview only as source material. Do not invent quotes. Cite the speaker by name." Long context plus a tight instruction is where Claude earns its keep for long-form.`
  },
  {
    title: 'Write in passes, not one giant prompt',
    body: 'Pass one: get the argument down, ugly but complete. Pass two: "Now improve flow and transitions, keep the content." Pass three: line edit. Separating drafting from polishing produces better writing than asking for "a great finished post" in a single turn.'
  },
  {
    title: 'Keep a running brief in a Project',
    body: 'For a book or a long series, a Claude Project holds your style guide, character notes, or argument spine across chats. You stop re-establishing context every session, and consistency across chapters improves noticeably.'
  }
]

const failures = [
  {
    title: 'Asking for "engaging" or "compelling" copy',
    fix: 'These words push the model toward hype and filler. Ask for specific qualities instead: "short sentences," "one concrete example per point," "no adjectives in the first paragraph." Specific beats flattering every time.'
  },
  {
    title: 'Letting it rewrite when you wanted an edit',
    fix: 'If you paste a draft and say "improve this," Claude will often rebuild it in its own voice. Add "keep my voice and structure; line-edit only" whenever you want a polish, not a replacement.'
  },
  {
    title: 'Accepting invented facts in non-fiction',
    fix: 'Claude can produce confident, plausible, wrong details — fake stats, fake quotes. For anything factual, instruct "only use facts from the source I gave you; flag anything you are unsure about," and verify names, numbers, and dates yourself.'
  },
  {
    title: 'Starting from a blank prompt every time',
    fix: 'Re-typing your voice and rules in each chat is slow and inconsistent. Save a reusable style block or a Project. The single biggest quality-of-life upgrade in writing with Claude is not re-explaining yourself.'
  }
]

const faqs = [
  {
    question: 'Which Claude model is best for writing?',
    answer: `For most writing, ${sonnet.display_name} is the right default — fast, cheap enough for daily use, and capable enough for blog posts, newsletters, rewrites, and outlines, with a ${sonnet.context_window_label} context window. Reach for ${opus.display_name} when the task is genuinely hard: long-form essays, book chapters, or dense documents where you want the model holding a long argument together. ${haiku.display_name} is for high-volume, low-stakes text like headline variations and quick summaries. In claude.ai, the app often routes you to the right model automatically, but you can pick manually when it matters.`
  },
  {
    question: 'How do I get Claude to write in my voice?',
    answer: 'Give it a concrete sample of your writing rather than adjectives. Paste 300-500 words and say "match the voice in this sample." Then add a short ban-list of patterns you dislike (em dashes, rhetorical-question openers, words like "leverage" or "seamless"), and define the reader you are writing for. Adjectives like "friendly" produce generic prose; a real sample plus a ban-list produces something close to your actual voice.'
  },
  {
    question: 'Is Claude good for editing my own writing?',
    answer: 'Yes, and it is often more useful as an editor than as a first-drafter. The key is constraint: tell it "line-edit for clarity, keep my voice and structure, do not add ideas," and ask it to list the changes it made. You can also use it for critique without rewriting ("name the three weakest paragraphs and why"), for cutting to a word count, and for catching repeated words and overlong sentences you have stopped noticing.'
  },
  {
    question: 'Can Claude write long-form content like a full article or book chapter?',
    answer: `Yes. Claude is one of the stronger tools for long-form because ${opus.display_name} and ${sonnet.display_name} ship with ${opus.context_window_label} context windows. The trick is not to ask for the whole thing in one prompt. Get an outline first, approve the structure, then write section by section. For a book or long series, keep your style guide and notes in a Claude Project so consistency holds across chats.`
  },
  {
    question: 'Will Claude make my writing sound like AI?',
    answer: 'It can, if you let it. Out of the box, Claude reaches for words like "leverage," "robust," and "seamless," and openers like "In today\'s fast-paced world." You remove most of this with a ban-list in your prompt and by giving it a sample of your real voice to match. The default output is the AI-sounding version; the steered output is much closer to human writing.'
  },
  {
    question: 'Is the free version of Claude good enough for writing?',
    answer: 'For occasional writing, yes. Claude Free runs on Sonnet with a daily message cap, which is fine for the odd blog post or rewrite. If you write daily or work on long pieces, Claude Pro at $20/month gives you higher limits, access to Opus, Projects, and Artifacts. For most working writers the Pro tier pays for itself quickly in volume alone.'
  },
  {
    question: 'How is writing with Claude different from writing with ChatGPT?',
    answer: 'Most professional writers find Claude produces more natural prose out of the box and follows tone instructions more faithfully, which makes it the stronger choice for long-form and nuanced rewrites. ChatGPT is faster for short-form marketing copy and pairs with DALL-E for images. The honest test is to draft the same piece in both and keep the voice you prefer. Good prompting transfers between them either way.'
  },
  {
    question: 'What is the best prompt structure for writing tasks in Claude?',
    answer: 'A reliable structure has four parts: role and reader ("you are writing for skeptical CFOs"), the task and length ("a 900-word post on X"), constraints ("short sentences, one example per point, no em dashes"), and a voice anchor (a pasted sample to match). Vague prompts like "write a blog post about email marketing" produce generic filler; a structured prompt produces something publishable with a light edit.'
  }
]

export default function ClaudeForWriting() {
  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Claude for Writing (2026): The Practical Guide to Drafting, Voice, and Editing',
    description: 'How to use Claude for writing: which model to pick, prompting for your voice and tone, editing your own drafts, and handling long-form. Copy-ready prompt templates and a before/after example.',
    url: 'https://promptwritingstudio.com/claude-for-writing',
    datePublished: '2026-06-16',
    dateModified: '2026-06-16',
    keywords: ['Claude for writing', 'using Claude for writing', 'Claude writing prompts', 'best Claude model for writing', 'Claude editing', 'write in my voice with Claude']
  })

  return (
    <>
      <Head>
        <title>Claude for Writing (2026): The Practical Guide to Drafting, Voice & Editing | PromptWritingStudio</title>
        <meta name="description" content="Claude for writing, the practical way: which model to pick, how to prompt for your tone and voice, editing your own drafts, and long-form. With copy-ready templates and a before/after example." />
        <meta name="keywords" content="Claude for writing, using Claude for writing, Claude writing prompts, best Claude model for writing, Claude editing, write in my voice with Claude, Claude long-form writing" />
        <meta property="og:title" content="Claude for Writing (2026): The Practical Guide to Drafting, Voice & Editing" />
        <meta property="og:description" content="How to actually use Claude for writing — model choice, voice prompting, editing, and long-form, with copy-ready templates." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://promptwritingstudio.com/claude-for-writing" />
        <link rel="canonical" href="https://promptwritingstudio.com/claude-for-writing" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: June 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Claude for Writing
              <span className="block text-[#FFDE59]">Model choice, voice, editing, and long-form — the practical version</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/10 border-l-4 border-[#FFDE59] p-6 mb-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-100">
                <strong>Short answer:</strong> Claude is the AI most professional writers prefer for serious work because it produces more natural prose and follows tone instructions faithfully. To use Claude for writing well, default to {sonnet.display_name} for daily drafting, give it a sample of your real voice instead of adjectives, and treat it as an editor with tight constraints rather than a one-shot author. The model matters less than the prompt.
              </p>
            </div>

            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              This is the guide I wish I had the first week I used Claude to draft — what to pick, how to prompt, and the mistakes that make output sound like a robot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#model" className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Which model to use
              </a>
              <a href="#voice" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Prompting for your voice
              </a>
            </div>
          </div>
        </section>

        {/* Which model */}
        <section id="model" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Which Claude model should you use for writing?</h2>
            <p className="text-lg text-[#333333] mb-8">
              Claude comes in three tiers. For writing, the honest answer is that you will live in the middle one and rarely need the top. Here is the mental model.
            </p>
            <div className="space-y-5">
              {modelPicker.map((m, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 rounded-lg border border-gray-200">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-[#1A1A1A] flex-1 min-w-0">{m.model}</h3>
                    <span className="bg-[#FFDE59] text-[#1A1A1A] text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">{m.use}</span>
                  </div>
                  <p className="text-[#333333]">{m.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-white border-l-4 border-[#FFDE59] p-6 rounded-r-lg">
              <p className="text-[#333333]">
                <strong>The shortcut:</strong> in claude.ai the app usually routes you to the right model automatically. Default to {sonnet.display_name} for everyday writing and only switch up to {opus.display_name} when a piece is genuinely hard. If you want help deciding by task and budget, the <Link href="/calculators/claude-model-selector" className="text-[#1A1A1A] font-semibold underline">Claude model selector</Link> walks you through it.
              </p>
            </div>
          </div>
        </section>

        {/* Before / after */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Before and after: the same task, two prompts</h2>
            <p className="text-lg text-[#333333] mb-8">
              The single biggest lever on writing quality is the prompt, not the model. Here is the same blog-post request, lazy versus scoped.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Weak prompt</h3>
                <pre className="whitespace-pre-wrap text-sm text-[#333333] bg-[#F9F9F9] p-4 rounded mb-4 font-mono">{beforeAfter.weak}</pre>
                <p className="text-[#666666] text-sm"><strong>What you get:</strong> {beforeAfter.weakResult}</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-[#FFDE59]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">Strong prompt</h3>
                <pre className="whitespace-pre-wrap text-sm text-[#333333] bg-[#F9F9F9] p-4 rounded mb-4 font-mono">{beforeAfter.strong}</pre>
                <p className="text-[#666666] text-sm"><strong>What you get:</strong> {beforeAfter.strongResult}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Voice */}
        <section id="voice" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">How do you get Claude to write in your voice?</h2>
            <p className="text-lg text-[#333333] mb-8">
              Voice is where most people give up on AI writing — the output is competent but generic. Four moves fix that.
            </p>
            <div className="space-y-5">
              {voiceSteps.map((s, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{s.title}</h3>
                  <p className="text-[#333333]">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-[#1A1A1A] p-6 rounded-lg">
              <p className="text-sm font-semibold text-[#FFDE59] mb-2">Copy-ready voice block</p>
              <pre className="whitespace-pre-wrap text-sm text-gray-100 font-mono">{`Voice rules for everything I ask you to write:
- Match the voice in this sample: [paste 300-500 of your words].
- Short, plain sentences. One idea per sentence where possible.
- No em dashes. No rhetorical questions as openers.
- Never start a sentence with "In today's".
- Ban-list: leverage, robust, seamless, unlock, delve, navigate.
- Write for: [describe the exact reader].`}</pre>
            </div>
          </div>
        </section>

        {/* Editing */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Using Claude to edit your own writing</h2>
            <p className="text-lg text-[#333333] mb-8">
              Claude is often more valuable as an editor than as a first-drafter — but only if you constrain it. Tell it to edit, and it will edit. Say "improve this," and it will quietly rewrite your piece in its own voice.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {editSteps.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{s.title}</h3>
                  <p className="text-[#333333] text-sm">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Long-form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Long-form: articles, essays, and book chapters</h2>
            <p className="text-lg text-[#333333] mb-8">
              Long-form is where Claude pulls ahead, thanks to {opus.context_window_label} context windows on {opus.display_name} and {sonnet.display_name}. But the one-shot "write me a 3,000-word article" prompt always disappoints. Work in passes instead.
            </p>
            <div className="space-y-5">
              {longFormSteps.map((s, i) => (
                <div key={i} className="bg-[#F9F9F9] p-6 rounded-lg border-l-4 border-[#FFDE59]">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{s.title}</h3>
                  <p className="text-[#333333]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Failure modes */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">Four mistakes that make Claude's writing worse</h2>
            <div className="space-y-5">
              {failures.map((f, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{f.title}</h3>
                  <p className="text-[#333333]"><strong className="text-[#1A1A1A]">Fix:</strong> {f.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course CTA */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The model is the easy part. The prompting is the skill.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Everything on this page is one piece of a larger system: writing prompts that get your voice, your structure, and your standards out of the model every time — without re-explaining yourself. That system is what <a href={COURSE_URL} className="text-[#FFDE59] font-semibold underline">PromptWritingStudio</a> teaches. Not a list of one-off tricks — the repeatable method for writing with AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={COURSE_URL} className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200">
                Join Now
              </a>
              <Link href="/model-prompting-guide/claude" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200">
                Claude prompting guide
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-xl text-[#333333] text-center mb-12">The questions writers ask most when they start using Claude.</p>
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

        {/* Related */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8">Keep going</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/claude-vs-chatgpt" className="bg-white border border-gray-200 px-6 py-3 rounded-lg font-semibold text-[#1A1A1A] hover:border-[#FFDE59] transition">Claude vs ChatGPT</Link>
              <Link href="/claude-prompts" className="bg-white border border-gray-200 px-6 py-3 rounded-lg font-semibold text-[#1A1A1A] hover:border-[#FFDE59] transition">Claude prompts library</Link>
              <Link href="/how-to-use-claude" className="bg-white border border-gray-200 px-6 py-3 rounded-lg font-semibold text-[#1A1A1A] hover:border-[#FFDE59] transition">How to use Claude</Link>
              <Link href="/claude-system-prompt" className="bg-white border border-gray-200 px-6 py-3 rounded-lg font-semibold text-[#1A1A1A] hover:border-[#FFDE59] transition">Claude system prompts</Link>
              <Link href="/model-prompting-guide" className="bg-white border border-gray-200 px-6 py-3 rounded-lg font-semibold text-[#1A1A1A] hover:border-[#FFDE59] transition">Model prompting guides</Link>
              <Link href="/ai-prompt-examples" className="bg-white border border-gray-200 px-6 py-3 rounded-lg font-semibold text-[#1A1A1A] hover:border-[#FFDE59] transition">AI prompt examples</Link>
              <Link href="/chatgpt-prompt-templates" className="bg-white border border-gray-200 px-6 py-3 rounded-lg font-semibold text-[#1A1A1A] hover:border-[#FFDE59] transition">Prompt templates</Link>
              <Link href="/ai-prompt-generator" className="bg-white border border-gray-200 px-6 py-3 rounded-lg font-semibold text-[#1A1A1A] hover:border-[#FFDE59] transition">Free prompt generator</Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
