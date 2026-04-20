import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "Can AI prompts be used for medical documentation while maintaining HIPAA compliance?",
    answer: "Yes. AI prompts can help draft clinical notes, discharge summaries, and referral letters. However, you should never paste Protected Health Information (PHI) into public AI tools like ChatGPT or Claude. Use de-identified data or your organization's HIPAA-compliant AI platform. The prompts we teach focus on templates and structures that you fill in with patient-specific details locally."
  },
  {
    question: "How much time can healthcare professionals save using AI prompts?",
    answer: "Based on reports from physicians and nurses using AI-assisted documentation, most save between 1 to 3 hours per day. The biggest time savings come from drafting clinical notes, patient education materials, and after-visit summaries. Some practitioners report cutting documentation time by up to 50%."
  },
  {
    question: "What AI tools work best for healthcare professionals?",
    answer: "ChatGPT (GPT-4) and Claude are the most versatile general-purpose AI tools for healthcare writing tasks. For clinical documentation specifically, tools like Nuance DAX, Abridge, and Suki are purpose-built. Our course teaches prompt engineering techniques that work across all major AI platforms so you can use whichever tool your organization approves."
  },
  {
    question: "Can AI help with patient communication and education materials?",
    answer: "Absolutely. AI excels at translating complex medical information into plain language that patients can understand. You can use prompts to generate patient education handouts, post-procedure instructions, medication guides, and FAQ sheets tailored to specific conditions and reading levels. This improves patient comprehension and reduces follow-up questions."
  },
  {
    question: "Is AI accurate enough for medical research summaries?",
    answer: "AI can help you quickly summarize and compare research papers, identify key findings, and draft literature review sections. However, AI should always be used as a starting point, not a final authority. Always verify citations, check for hallucinated references, and apply your clinical judgment. Our prompts include built-in instructions that ask AI to flag uncertainty and cite sources."
  },
  {
    question: "Do I need technical skills to use AI prompts in healthcare?",
    answer: "No. If you can type an email, you can use AI prompts. Our course is designed specifically for healthcare professionals with no programming or technical background. We teach you how to write clear, structured prompts that produce reliable, useful output for your specific clinical or administrative needs."
  },
  {
    question: "How can AI help reduce physician burnout?",
    answer: "Documentation burden is one of the top drivers of physician burnout, with doctors spending nearly two hours on paperwork for every hour of patient care. AI prompts can automate first drafts of clinical notes, pre-populate templates, generate patient letters, and handle routine administrative writing. By reducing the documentation workload, AI gives clinicians more time for patient care and personal well-being."
  },
  {
    question: "What are the limitations of using AI in healthcare settings?",
    answer: "AI should not be used for diagnosis, treatment decisions, or replacing clinical judgment. It can produce inaccurate or fabricated information (hallucinations), so all AI output must be reviewed by a qualified professional. Patient data privacy must be maintained at all times. AI is best used as a writing and productivity assistant, not a clinical decision-making tool."
  }
]

const promptExamples = [
  {
    title: "Clinical Note Draft",
    prompt: "You are a medical documentation assistant. Draft a SOAP note for a [specialty] visit. The patient is a [age]-year-old [gender] presenting with [chief complaint]. Include sections for Subjective, Objective, Assessment, and Plan. Use professional medical terminology. Leave bracketed placeholders for specific vitals, lab values, and examination findings that I will fill in.",
    description: "Generate structured SOAP notes in seconds instead of minutes"
  },
  {
    title: "Patient Education Handout",
    prompt: "Create a patient education handout about [condition/procedure] written at a 6th-grade reading level. Include: (1) What the condition is in simple terms, (2) Common symptoms, (3) Treatment options explained simply, (4) When to seek emergency care, (5) Lifestyle changes that help, (6) A FAQ section with 3 common patient questions. Format with clear headings and bullet points. Avoid medical jargon or define it in parentheses when necessary.",
    description: "Create clear, readable patient materials in any language"
  },
  {
    title: "Referral Letter",
    prompt: "Draft a professional referral letter from a [referring specialty] to a [receiving specialty] for a patient with [condition]. Include: the reason for referral, relevant medical history summary, current medications, recent test results summary, and specific questions for the specialist. Use a formal medical letter format. Keep it concise (under 300 words) while including all clinically relevant information.",
    description: "Draft polished referral letters that cover all key details"
  },
  {
    title: "Research Literature Summary",
    prompt: "Summarize the following research study for a clinical audience. Structure your summary as: (1) Study objective, (2) Methods (study design, population, intervention, outcomes measured), (3) Key findings with specific numbers/statistics, (4) Limitations the authors noted, (5) Clinical implications. Then provide a plain-language summary suitable for sharing with patients. Flag if any information seems uncertain or if you cannot verify specific claims. [Paste abstract or study text]",
    description: "Quickly distill research papers into actionable clinical summaries"
  },
  {
    title: "Discharge Summary",
    prompt: "Generate a discharge summary template for a patient hospitalized for [condition]. Include: (1) Admission diagnosis and date, (2) Hospital course summary, (3) Procedures performed, (4) Discharge diagnosis, (5) Discharge medications with dosages, (6) Follow-up appointments needed, (7) Activity restrictions, (8) Warning signs that require immediate medical attention, (9) Patient education provided. Use clear headings and leave bracketed placeholders for patient-specific details.",
    description: "Create thorough discharge documents that reduce readmissions"
  },
  {
    title: "Prior Authorization Appeal Letter",
    prompt: "Write a prior authorization appeal letter for [medication/procedure] for a patient with [diagnosis]. Include: (1) Patient background and diagnosis, (2) Medical necessity justification citing current clinical guidelines, (3) Previous treatments tried and why they were insufficient, (4) Expected clinical benefit of the requested treatment, (5) Consequences of denial on patient outcomes, (6) Supporting evidence from peer-reviewed literature. Use a professional, persuasive tone. Address it to the insurance company medical director.",
    description: "Craft compelling appeals that get treatments approved faster"
  }
]

const painPoints = [
  {
    icon: "📋",
    title: "Documentation Burden",
    description: "Spending 2 hours on paperwork for every 1 hour of patient care, leading to late nights and burnout"
  },
  {
    icon: "💬",
    title: "Patient Communication",
    description: "Struggling to create clear patient education materials and after-visit summaries that patients actually understand"
  },
  {
    icon: "🔬",
    title: "Research Overload",
    description: "No time to stay current with medical literature when hundreds of new studies publish weekly in your specialty"
  },
  {
    icon: "📄",
    title: "Administrative Tasks",
    description: "Prior authorizations, referral letters, and insurance appeals eating into clinical and personal time"
  }
]

export default function HealthcareAI() {
  const [copiedPrompt, setCopiedPrompt] = useState(null)

  const copyToClipboard = (prompt, title) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(title)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'AI Prompts for Healthcare | Save Hours on Documentation & Patient Communication',
    description: 'Discover AI prompts designed for healthcare professionals. Reduce documentation burden, improve patient communication, and streamline clinical workflows with ChatGPT, Claude, and Gemini.',
    url: 'https://promptwritingstudio.com/healthcare-ai',
    datePublished: '2025-06-01',
    dateModified: '2026-02-01',
    keywords: ['AI prompts healthcare', 'medical documentation AI', 'clinical notes AI', 'patient communication AI', 'healthcare AI tools', 'physician burnout AI', 'SOAP notes AI', 'medical writing prompts']
  })

  return (
    <>
      <Head>
        <title>AI Prompts for Healthcare | Save Hours on Documentation &amp; Patient Communication</title>
        <meta name="description" content="Discover AI prompts designed for healthcare professionals. Cut documentation time by 50%, create patient education materials in minutes, and streamline referrals, discharge summaries, and prior authorizations." />
        <meta name="keywords" content="AI prompts healthcare, medical documentation AI, clinical notes AI, patient communication AI, healthcare AI tools, physician burnout AI, SOAP notes AI, medical writing prompts" />
        <link rel="canonical" href="https://promptwritingstudio.com/healthcare-ai" />
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
              AI Prompts That Give Healthcare Professionals
              <span className="block text-[#FFDE59]">Hours Back Every Day</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Stop spending 2 hours on documentation for every 1 hour of patient care. Use AI prompts to draft clinical notes, patient education materials, and administrative documents in minutes instead of hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="#prompts"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                See Healthcare AI Prompts
              </Link>
              <Link
                href="/claude-code-guide"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Start with Claude Code
              </Link>
            </div>
            <div className="text-white text-lg">
              <p>Used by physicians, nurses, and healthcare administrators worldwide</p>
              <p>Works with ChatGPT, Claude, Gemini, and HIPAA-compliant AI platforms</p>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                The Documentation Crisis in Healthcare
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                These challenges are driving burnout and taking clinicians away from what matters most: patient care
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {painPoints.map((point, index) => (
                <div key={index} className="text-center p-6 bg-[#F9F9F9] rounded-lg border border-[#E5E5E5]">
                  <div className="text-4xl mb-4">{point.icon}</div>
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{point.title}</h3>
                  <p className="text-[#333333]">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prompt Examples Section */}
        <section id="prompts" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                AI Prompts Built for Healthcare Workflows
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Copy these prompts into ChatGPT, Claude, or Gemini. Customize the bracketed sections for your specific use case.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {promptExamples.map((example, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-[#E5E5E5]">
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{example.title}</h3>
                  <p className="text-[#666666] mb-4">{example.description}</p>
                  <div className="bg-[#F9F9F9] p-4 rounded-lg mb-4 font-mono text-sm text-[#333333] leading-relaxed">
                    {example.prompt}
                  </div>
                  <button
                    onClick={() => copyToClipboard(example.prompt, example.title)}
                    className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
                  >
                    {copiedPrompt === example.title ? 'Copied!' : 'Copy Prompt'}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/claude-code-guide"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Start with Claude Code
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                How Healthcare Professionals Use AI Prompts
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                A simple workflow that integrates with your existing practice
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center p-8 bg-[#F9F9F9] rounded-lg">
                <div className="text-4xl font-bold text-[#FFDE59] mb-4">1</div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Choose a Prompt Template</h3>
                <p className="text-[#333333]">Select from our library of healthcare-specific prompts for documentation, patient communication, or research tasks.</p>
              </div>
              <div className="text-center p-8 bg-[#F9F9F9] rounded-lg">
                <div className="text-4xl font-bold text-[#FFDE59] mb-4">2</div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Customize and Generate</h3>
                <p className="text-[#333333]">Fill in the bracketed placeholders with your specific details. Paste into your preferred AI tool and generate a draft in seconds.</p>
              </div>
              <div className="text-center p-8 bg-[#F9F9F9] rounded-lg">
                <div className="text-4xl font-bold text-[#FFDE59] mb-4">3</div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Review and Use</h3>
                <p className="text-[#333333]">Review the AI output, make clinical edits as needed, and use the finished document. Always apply your professional judgment.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-[#333333]">
                Common questions about using AI prompts in healthcare settings
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-[#E5E5E5]">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">{faq.question}</h3>
                  <p className="text-[#333333] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Reclaim Hours Every Day with AI-Powered Documentation
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of healthcare professionals who are using AI prompts to reduce documentation burden, improve patient communication, and focus on what they do best: caring for patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/claude-code-guide"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Start with Claude Code
              </Link>
              <Link
                href="/ai-prompt-generator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Try Free AI Prompt Generator
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
