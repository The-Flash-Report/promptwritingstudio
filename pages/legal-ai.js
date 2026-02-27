import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "Is it safe to use AI tools like ChatGPT for legal work?",
    answer: "AI tools can be valuable assistants for legal professionals, but they must be used responsibly. Never paste confidential client information into public AI tools. Use AI for drafting templates, researching general legal concepts, and generating first drafts that you then review and verify. Always check AI output for accuracy, as AI can hallucinate case citations and legal precedents. Many firms now use enterprise AI tools with data privacy protections specifically designed for legal work."
  },
  {
    question: "Can AI replace lawyers or paralegals?",
    answer: "No. AI is a productivity tool, not a replacement for legal professionals. It cannot provide legal advice, exercise legal judgment, or understand the nuances of client relationships. What AI does well is handle repetitive writing tasks, draft initial documents, summarize lengthy texts, and organize research. This frees legal professionals to focus on higher-value work like strategy, negotiation, and client counseling."
  },
  {
    question: "How much time can lawyers save using AI prompts?",
    answer: "Legal professionals report saving 5 to 15 hours per week using AI effectively. The biggest time savings come from contract review and drafting (60-70% faster for first drafts), legal research summaries (cutting hours of reading to minutes), client communication drafting, and document review. A well-structured prompt can produce a first draft of a standard contract clause in 30 seconds versus 30 minutes of manual drafting."
  },
  {
    question: "What about AI hallucinating fake case citations?",
    answer: "This is a well-documented and serious concern. AI models can fabricate case names, citations, and legal holdings that sound plausible but do not exist. This has already led to sanctions against attorneys who submitted AI-generated briefs without verification. Our prompts are specifically designed to mitigate this risk by instructing the AI to flag uncertainty, avoid citing specific cases unless provided, and focus on general legal principles rather than fabricated precedents. Always verify every citation independently."
  },
  {
    question: "Which AI tool is best for legal professionals?",
    answer: "For general legal writing and research tasks, Claude and ChatGPT (GPT-4) are both excellent. Claude tends to be more careful and nuanced with complex legal reasoning, while GPT-4 is strong at drafting and formatting. For firms needing enterprise security, tools like Harvey AI, CoCounsel (by Thomson Reuters), and Casetext are purpose-built for legal work with proper data handling. Our course teaches prompt techniques that work across all platforms."
  },
  {
    question: "Can AI help with contract review and analysis?",
    answer: "Yes. AI is particularly strong at contract review tasks. You can use prompts to identify non-standard clauses, flag potential risks, compare contract versions, extract key terms and obligations, and generate clause summaries. However, AI should assist the review process, not replace a lawyer's analysis. Use it to speed up the initial review so you can focus your expertise on the provisions that matter most."
  },
  {
    question: "What ethical obligations should lawyers consider when using AI?",
    answer: "Lawyers must consider several ethical obligations: duty of competence (understanding how AI tools work and their limitations), duty of confidentiality (never sharing client data with unsecured AI tools), duty of supervision (reviewing all AI-generated work product), candor to the tribunal (verifying all citations and legal claims), and billing transparency (disclosing AI use and not billing AI-generated work at full attorney rates where applicable). Several state bars have issued guidance on these issues."
  },
  {
    question: "Do I need technical skills to use AI prompts for legal work?",
    answer: "No. If you can write a clear email, you can write an effective AI prompt. Our course teaches legal professionals how to structure prompts using plain language. The key skills are being specific about what you need, providing relevant context, and knowing how to review and refine AI output. No coding, programming, or technical background is required."
  }
]

const promptExamples = [
  {
    title: "Contract Clause Review",
    prompt: "You are an experienced contract attorney. Review the following contract clause and provide: (1) A plain-language summary of what this clause does, (2) Key obligations for each party, (3) Potential risks or red flags for [my client's position as buyer/seller/licensee], (4) Suggested modifications to make the clause more favorable to my client, (5) Any ambiguous language that could lead to disputes. Do NOT fabricate any case law. Focus on practical analysis.\n\n[Paste clause here]",
    description: "Quickly analyze contract clauses and identify risks"
  },
  {
    title: "Legal Research Memo",
    prompt: "Draft a legal research memorandum outline on the topic of [legal issue] in [jurisdiction]. Structure it as: (1) Issue presented, (2) Brief answer, (3) Statement of relevant facts (leave as placeholder), (4) Discussion of applicable legal principles and standards, (5) Analysis applying principles to the facts, (6) Conclusion. Focus on well-established legal principles rather than specific case citations. Flag any areas where the law is unsettled or where I should conduct additional research. Do NOT fabricate case names or citations.",
    description: "Generate structured research memo frameworks in minutes"
  },
  {
    title: "Client Communication Letter",
    prompt: "Draft a professional client letter explaining [legal situation/update] in plain language. The client is a [describe client: individual/small business owner/corporate executive] with [limited/moderate/extensive] legal knowledge. Include: (1) A clear summary of the current situation, (2) What this means for the client in practical terms, (3) Available options with pros and cons of each, (4) Recommended next steps, (5) Timeline and any deadlines. Keep the tone professional but approachable. Avoid unnecessary legal jargon, and define any legal terms that must be used.",
    description: "Write clear, professional client updates and advice letters"
  },
  {
    title: "Demand Letter Draft",
    prompt: "Draft a professional demand letter for a [type of claim: breach of contract/personal injury/unpaid invoice/IP infringement] matter. Include: (1) Identification of the parties, (2) Statement of the relevant facts (use placeholders for specific details), (3) Legal basis for the claim citing general legal principles, (4) Specific demand (damages amount, action required), (5) Deadline for response, (6) Consequences of non-compliance. Tone should be firm but professional. Do NOT cite specific case law. I will add jurisdiction-specific details and verify all claims before sending.",
    description: "Create persuasive demand letters with proper legal structure"
  },
  {
    title: "Deposition Preparation Questions",
    prompt: "Generate a list of deposition questions for a [type of case] case. The deponent is a [role: plaintiff/defendant/witness/expert] who [brief description of their involvement]. Organize questions into the following categories: (1) Background and qualifications, (2) Knowledge of relevant events, (3) Document-specific questions (leave placeholders for exhibit references), (4) Questions testing credibility, (5) Questions addressing potential defenses. Include follow-up questions for likely responses. Aim for 25-40 questions total.",
    description: "Prepare thorough deposition outlines in a fraction of the time"
  },
  {
    title: "Contract Drafting - First Pass",
    prompt: "Draft a [type of agreement: NDA/service agreement/licensing agreement/employment contract] between [Party A description] and [Party B description]. Include standard clauses for: (1) Definitions, (2) Scope and obligations of each party, (3) Payment terms, (4) Term and termination, (5) Confidentiality, (6) Intellectual property, (7) Limitation of liability, (8) Indemnification, (9) Dispute resolution, (10) General provisions (governing law, amendments, notices, severability). Use [jurisdiction] law as the governing framework. This is a first draft that will be extensively reviewed and modified by an attorney.",
    description: "Generate comprehensive first-draft contracts for attorney review"
  }
]

const painPoints = [
  {
    icon: "📑",
    title: "Contract Review Backlog",
    description: "Spending 3-5 hours reviewing a single complex contract, with dozens more waiting in the queue"
  },
  {
    icon: "🔍",
    title: "Legal Research Hours",
    description: "Manually searching through case law, statutes, and legal databases for hours to find relevant precedents"
  },
  {
    icon: "💬",
    title: "Client Communication",
    description: "Translating complex legal concepts into clear language clients can understand and act on"
  },
  {
    icon: "📝",
    title: "Document Drafting",
    description: "Writing the same types of letters, memos, and agreements repeatedly with minor variations"
  }
]

export default function LegalAI() {
  const [copiedPrompt, setCopiedPrompt] = useState(null)

  const copyToClipboard = (prompt, title) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(title)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'AI Prompts for Legal Professionals | Contract Review, Research & Client Communication',
    description: 'Discover AI prompts designed for lawyers, paralegals, and legal professionals. Speed up contract review, legal research, client letters, and document drafting with ChatGPT, Claude, and Gemini.',
    url: 'https://promptwritingstudio.com/legal-ai',
    datePublished: '2025-06-01',
    dateModified: '2026-02-01',
    keywords: ['AI prompts lawyers', 'legal AI tools', 'contract review AI', 'legal research AI', 'AI for law firms', 'legal document drafting AI', 'lawyer productivity AI', 'AI legal assistant']
  })

  return (
    <>
      <Head>
        <title>AI Prompts for Legal Professionals | Contract Review, Research &amp; Client Communication</title>
        <meta name="description" content="AI prompts built for lawyers and legal professionals. Speed up contract review by 60%, draft client letters in minutes, and streamline legal research with ChatGPT, Claude, and Gemini." />
        <meta name="keywords" content="AI prompts lawyers, legal AI tools, contract review AI, legal research AI, AI for law firms, legal document drafting AI, lawyer productivity AI, AI legal assistant" />
        <link rel="canonical" href="https://promptwritingstudio.com/legal-ai" />
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
              AI Prompts That Help Legal Professionals
              <span className="block text-[#FFDE59]">Bill More, Draft Less</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Stop spending hours on first drafts and routine research. Use AI prompts to review contracts 60% faster, draft client letters in minutes, and free up time for the high-value legal work that actually moves the needle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="#prompts"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                See Legal AI Prompts
              </Link>
              <Link
                href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Get the Full Course
              </Link>
            </div>
            <div className="text-white text-lg">
              <p>Trusted by attorneys, paralegals, and in-house counsel</p>
              <p>Works with ChatGPT, Claude, Gemini, and legal-specific AI platforms</p>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                The Productivity Problem in Legal Practice
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Legal professionals spend most of their time on tasks that AI can accelerate dramatically
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
                AI Prompts Designed for Legal Workflows
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Copy these prompts into ChatGPT, Claude, or your preferred AI tool. Customize the bracketed sections for your specific matter.
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
                href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Get 100+ Legal AI Prompts in the Full Course
              </Link>
            </div>
          </div>
        </section>

        {/* Important Disclaimer Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-[#FFF8E1] border-2 border-[#FFDE59] p-8 rounded-lg">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Important: Responsible AI Use in Legal Practice</h2>
              <ul className="space-y-3 text-[#333333]">
                <li className="flex items-start">
                  <span className="text-[#FFDE59] mr-3 font-bold text-lg">1.</span>
                  <span><strong>Never paste confidential client information</strong> into public AI tools. Use enterprise or on-premise solutions for sensitive data.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFDE59] mr-3 font-bold text-lg">2.</span>
                  <span><strong>Always verify AI output.</strong> AI can hallucinate case citations, misstate legal principles, and produce inaccurate analysis. Every AI-generated document must be reviewed by a qualified legal professional.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFDE59] mr-3 font-bold text-lg">3.</span>
                  <span><strong>Check your jurisdiction's ethics rules</strong> regarding AI use, disclosure requirements, and billing practices related to AI-assisted work.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#FFDE59] mr-3 font-bold text-lg">4.</span>
                  <span><strong>AI is a drafting assistant, not legal counsel.</strong> It does not replace the judgment, expertise, or ethical obligations of a licensed attorney.</span>
                </li>
              </ul>
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
                Common questions about using AI in legal practice
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
              Work Smarter, Not Longer: AI Prompts for Legal Professionals
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of legal professionals who are using AI prompts to draft faster, research smarter, and spend more time on the work that truly requires their expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Get the Full AI Prompt Course
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
