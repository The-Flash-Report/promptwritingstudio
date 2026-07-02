import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import PromptGrader from '../components/tools/PromptGrader'
import { generateFAQSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: 'What is a CLAUDE.md file?',
    answer:
      'CLAUDE.md is a special file that Claude Code reads at the start of every session. It tells the agent what project it is working in, what rules to follow, what tools to use, and how to behave when things go wrong. A well-written CLAUDE.md is the difference between an agent that makes consistent decisions and one that guesses differently every session.',
  },
  {
    question: 'How is this different from the chat prompt grader?',
    answer:
      'The chat prompt grader scores one-shot instructions you type into Claude or ChatGPT. The agent prompt grader scores persistent configuration files: CLAUDE.md files and system prompts that stay in place across many sessions. The criteria are different: agent files need to nail identity, environment context, behavioural rules, and failure guidance. A great chat prompt and a great CLAUDE.md are written for completely different purposes.',
  },
  {
    question: 'What does the grader actually check?',
    answer:
      'Five criteria: identity and scope (does the file say what the agent is?), environment and context (stack, paths, and commands, the facts the agent needs to act without guessing), behavioural rules (explicit do/do-not instructions that govern commits, secrets, and approvals), failure and escalation guidance (what happens when the agent is uncertain or exceeds its authority), and maintainability (can a new developer or future agent navigate and update the file without guessing?). Every score comes with a verbatim quote from your file as evidence.',
  },
  {
    question: 'Why targeted edits instead of a full rewrite?',
    answer:
      'A CLAUDE.md or system prompt can be thousands of words long. Rewriting the entire file in one pass would erase context only you know: project history, intentional trade-offs, bespoke conventions. Targeted edits show you exactly which lines to change and why, leaving everything else intact.',
  },
  {
    question: 'Is it free?',
    answer:
      'Yes. You get 3 free grades per day, no signup required. The same daily pool covers both the chat prompt grader and this agent grader. Pro removes the daily cap.',
  },
  {
    question: 'Do you store my CLAUDE.md?',
    answer:
      'No. Grading happens in a single API call and your file is not saved on our servers. Your grade history lives in your own browser and never leaves your device.',
  },
  {
    question: 'What if my CLAUDE.md scores high but the agent still misbehaves?',
    answer:
      "The grader scores what is written, not how well the agent follows it in practice. A high score means the file is clear and complete; runtime behaviour also depends on the model, the tools available, and how you invoke the agent. If the file scores well but behaviour is still wrong, the issue is likely in the invocation or the tool setup, not the instructions.",
  },
]

const HOW_IT_WORKS = [
  {
    title: 'Identity and scope',
    body: 'Does the file declare what the agent is, what project it operates in, and what is out of scope?',
  },
  {
    title: 'Environment and context',
    body: 'Stack, file paths, commands, dependencies: the concrete facts the agent needs to act without guessing.',
  },
  {
    title: 'Behavioural rules',
    body: 'Explicit do/do-not rules for commits, secrets, approvals, and tone. Vague advice scores low.',
  },
  {
    title: 'Failure and escalation',
    body: 'What the agent should do when uncertain or when a decision exceeds its authority.',
  },
  {
    title: 'Maintainability',
    body: 'Clear sections, reasoning behind non-obvious rules, no stale or contradictory guidance.',
  },
  {
    title: 'Targeted edits',
    body: 'Because the file may be thousands of words, the grader returns before/after patches, not a full rewrite.',
  },
]

export default function AgentPromptGraderPage() {
  return (
    <Layout
      title="Agent Prompt Grader: Score Your CLAUDE.md or System Prompt | PromptWritingStudio"
      description="Paste your CLAUDE.md or agent system prompt and get a score on 5 agent-specific criteria (identity, environment context, behavioural rules, failure guidance, and maintainability) plus targeted edits. Free, 3 grades a day."
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
              name: 'Agent Prompt Grader',
              url: 'https://promptwritingstudio.com/agent-prompt-grader',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              description:
                'Scores CLAUDE.md files and agent system prompts on five agent-specific criteria with evidence-grounded feedback and targeted edits.',
            }),
          }}
        />
      </Head>

      {/* Hero */}
      <section className="bg-[#1A1A1A] text-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">Is your CLAUDE.md doing its job?</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Paste your CLAUDE.md or agent system prompt. Get a score on 5 agent-specific criteria, feedback that
            quotes your exact words, and targeted edits you can apply immediately. Free, 3 grades a day.
          </p>
        </div>
      </section>

      {/* The tool */}
      <section className="py-12 md:py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <PromptGrader
            rubricId="agent-prompt"
            historySource="agent-prompt-grader"
          />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-3xl font-bold text-[#1A1A1A] text-center">What the grader checks</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {HOW_IT_WORKS.map(({ title, body }) => (
              <div key={title} className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5">
                <h3 className="font-bold text-[#1A1A1A]">{title}</h3>
                <p className="text-[#333333] text-sm mt-1">{body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#333333] mt-8">
            Every score must cite a verbatim quote from your file. If the judge returns feedback without evidence,
            we reject it instead of showing it to you. That rule is enforced in code, not just in the prompt.
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
          <h2 className="text-2xl font-bold text-[#1A1A1A]">Related tools and guides</h2>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/prompt-grader"
              className="border border-gray-300 px-5 py-2 rounded-lg font-semibold text-[#333333] hover:border-[#FFDE59] transition"
            >
              Chat prompt grader
            </Link>
            <Link
              href="/claude-md-playbook"
              className="border border-gray-300 px-5 py-2 rounded-lg font-semibold text-[#333333] hover:border-[#FFDE59] transition"
            >
              CLAUDE.md playbook
            </Link>
            <Link
              href="/claude-code-guide"
              className="border border-gray-300 px-5 py-2 rounded-lg font-semibold text-[#333333] hover:border-[#FFDE59] transition"
            >
              Claude Code guide
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
