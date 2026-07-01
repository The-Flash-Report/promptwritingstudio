import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import PromptGrader from '../components/tools/PromptGrader'
import { generateFAQSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: 'What does the Prompt Grader actually check?',
    answer:
      'It scores your prompt on five criteria: role and context, task clarity, constraints and scope, output format, and examples or success criteria. Every score comes with a justification that quotes your actual prompt text, a list of the specific ways your prompt is likely to go wrong, and a full rewrite you can copy.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes. You get 3 full grades per day free, no signup required. The Pro plan removes the daily cap, keeps your complete grading history, and rewrites your prompt for Claude, ChatGPT, and Gemini in one pass.',
  },
  {
    question: 'Which AI model powers the grading?',
    answer:
      'Claude Sonnet 4.6 via the Anthropic API, run at temperature 0 for consistent scoring. The grader uses a strict rubric: any critique that fails to quote your prompt verbatim is rejected and re-run rather than shown to you.',
  },
  {
    question: 'How is this different from asking ChatGPT to improve my prompt?',
    answer:
      'A raw model gives you vague praise and generic advice like "add more detail". The grader enforces a grounding contract: every criterion score must cite a verbatim quote from your prompt as evidence, so the feedback is about your actual words, not boilerplate. You also get a consistent 0 to 100 score you can compare across drafts.',
  },
  {
    question: 'Do you store my prompts?',
    answer:
      'No. Grading happens in a single API call and your prompt is not saved on our servers. Your grade history lives in your own browser (localStorage) and never leaves your device.',
  },
  {
    question: 'What do the scores mean?',
    answer:
      '75 or above means the prompt is strong: specific, structured, and ready to use. 45 to 74 means it works but the model is guessing at things you could specify. Below 45 means the model has to invent most of the details, so results will be inconsistent.',
  },
]

export default function PromptGraderPage() {
  return (
    <Layout
      title="Prompt Grader: Score Your AI Prompt and Get a Rewrite | PromptWritingStudio"
      description="Paste your ChatGPT, Claude, or Gemini prompt and get a 0 to 100 score, specific feedback that quotes your actual words, and a professional rewrite. 3 free grades a day."
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Prompt Grader',
              url: 'https://promptwritingstudio.com/prompt-grader',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              description:
                'Scores AI prompts on five criteria with evidence-grounded feedback and produces an improved rewrite.',
            }),
          }}
        />
      </Head>

      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">How good is your prompt?</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Paste any prompt. Get a score out of 100, feedback that quotes your exact words, the ways it will go
            wrong, and a rewrite you can copy. Free, 3 grades a day.
          </p>
        </div>
      </section>

      {/* The tool */}
      <section className="py-12 md:py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <PromptGrader />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-[#1A1A1A] text-center">What the grader checks</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[
              ['Role and context', 'Does the prompt tell the model who it is and what it needs to know?'],
              ['Task clarity', 'Could a stranger read your prompt and know exactly what to produce?'],
              ['Constraints and scope', 'Length, tone, boundaries: the guardrails that stop generic output.'],
              ['Output format', 'Structure the result so you can use it without reformatting.'],
              ['Examples or criteria', 'Show the model what good looks like, or tell it how it will be judged.'],
              ['Failure modes', 'The specific gaps where the model will guess, invent, or drift off task.'],
            ].map(([title, body]) => (
              <div key={title} className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5">
                <h3 className="font-bold text-[#1A1A1A]">{title}</h3>
                <p className="text-[#333333] text-sm mt-1">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#333333] mt-8">
            Every critique must quote your prompt. If the judge returns feedback without evidence, we reject it
            instead of showing it to you. That rule is enforced in code, not just in the prompt.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-[#1A1A1A] text-center mb-8">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map(faq => (
              <details key={faq.question} className="bg-white border border-[#E5E5E5] rounded-lg p-5">
                <summary className="font-bold text-[#1A1A1A] cursor-pointer">{faq.question}</summary>
                <p className="text-[#333333] mt-3">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Want to write better prompts from scratch?</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/ai-prompt-examples"
              className="border border-gray-300 px-5 py-2 rounded-lg font-semibold text-[#333333] hover:border-[#FFDE59] transition"
            >
              Before and after prompt examples
            </Link>
            <Link
              href="/chatgpt-prompt-templates"
              className="border border-gray-300 px-5 py-2 rounded-lg font-semibold text-[#333333] hover:border-[#FFDE59] transition"
            >
              Prompt templates
            </Link>
            <Link
              href="/claude-prompts"
              className="border border-gray-300 px-5 py-2 rounded-lg font-semibold text-[#333333] hover:border-[#FFDE59] transition"
            >
              Claude prompt guide
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
