import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "Is it ethical for teachers to use AI in their work?",
    answer: "Yes. Using AI to improve teaching quality, reduce administrative burden, and create better learning experiences is widely considered ethical and beneficial. The key distinction is that AI helps teachers work more effectively, it does not replace the human relationship at the heart of education. Many education organizations, including ISTE and UNESCO, support responsible AI adoption by educators. The time you save on lesson planning and grading is time you can reinvest in direct student interaction."
  },
  {
    question: "How much time can teachers save using AI prompts?",
    answer: "Teachers report saving 5 to 10 hours per week when using AI prompts effectively. The biggest time savings come from lesson plan creation (70% faster), rubric development, differentiated materials generation, feedback writing, and parent communication drafts. A lesson plan that normally takes 45 minutes to write from scratch can be drafted in under 5 minutes with a well-crafted AI prompt, leaving you time to refine and personalize it."
  },
  {
    question: "Can AI help create differentiated instruction materials?",
    answer: "This is one of the most powerful applications of AI in education. You can use a single prompt to generate the same lesson content at multiple reading levels, create modified assignments for students with IEPs, produce extension activities for advanced learners, and adapt materials for English language learners. What used to take hours of manual differentiation can be accomplished in minutes."
  },
  {
    question: "Will AI-generated lesson plans align with curriculum standards?",
    answer: "When you specify the standards in your prompt (such as Common Core, NGSS, state standards, or your school's curriculum framework), AI can generate lesson plans that explicitly address those standards. However, you should always verify alignment yourself, as AI may not have the most current version of standards or may misinterpret specific requirements. Our prompts include built-in instructions to reference specific standards and learning objectives."
  },
  {
    question: "What AI tools work best for educators?",
    answer: "ChatGPT (GPT-4) and Claude are the most versatile general-purpose AI tools for educators. ChatGPT is particularly strong at generating creative lesson activities, while Claude excels at producing nuanced, well-structured educational content. Google Gemini integrates well with Google Workspace tools many schools already use. For specialized needs, tools like MagicSchool AI, Diffit, and Curipod are purpose-built for educators. The prompt techniques on this page work across all platforms."
  },
  {
    question: "How can AI help with grading and feedback?",
    answer: "AI can help create detailed rubrics, generate personalized written feedback on student work, draft comment banks for common issues, and suggest improvement strategies tailored to individual student needs. It does not replace teacher judgment in assigning grades, but it dramatically speeds up the feedback writing process. Teachers can paste a rubric and student response into AI and receive a draft of specific, constructive feedback in seconds."
  },
  {
    question: "Can I use these prompts for any grade level or subject?",
    answer: "Yes. The prompts on this page include placeholders for grade level, subject area, and specific learning objectives. They work for elementary through higher education, and across subjects including ELA, math, science, social studies, world languages, arts, and CTE. The prompt templates are designed to be adapted to your specific teaching context."
  },
  {
    question: "What about student data privacy when using AI tools?",
    answer: "Never input personally identifiable student information (names, grades, IDs, behavioral records) into public AI tools. Use AI for creating general materials, templates, and frameworks. When generating feedback, use anonymous identifiers or work with your school's approved AI platform that meets FERPA and COPPA requirements. Our prompts are designed to work without requiring any student-specific data."
  }
]

const promptExamples = [
  {
    title: "Standards-Aligned Lesson Plan",
    prompt: "Create a complete lesson plan for a [grade level] [subject] class on the topic of [topic]. Align it to [specific standard, e.g., CCSS.ELA-LITERACY.RI.5.2]. Include: (1) Learning objective using Bloom's taxonomy, (2) A 5-minute warm-up/hook activity, (3) Direct instruction with guided notes outline (15 min), (4) Guided practice activity (10 min), (5) Independent practice or group activity (15 min), (6) Exit ticket or formative assessment, (7) Materials needed, (8) Differentiation strategies for below-level, on-level, and advanced students. Format with clear headings.",
    description: "Generate complete, standards-aligned lesson plans in under 5 minutes"
  },
  {
    title: "Differentiated Reading Passages",
    prompt: "Write an informational text about [topic] at three different reading levels for [grade level] students. (1) Below grade level (Lexile [range]): Use simple sentences, high-frequency vocabulary, and short paragraphs. (2) On grade level (Lexile [range]): Use grade-appropriate vocabulary with some academic language. (3) Above grade level (Lexile [range]): Include complex sentences, domain-specific vocabulary, and nuanced concepts. All three versions should cover the same key facts and concepts. Include 3 comprehension questions for each version appropriate to that reading level.",
    description: "Create leveled reading materials for the same topic instantly"
  },
  {
    title: "Rubric Generator",
    prompt: "Create a detailed analytic rubric for a [grade level] [assignment type, e.g., persuasive essay/science lab report/oral presentation]. Include 4 performance levels: Exceeding (4), Meeting (3), Approaching (2), and Beginning (1). Evaluate these criteria: [list 4-5 criteria, e.g., thesis statement, evidence use, organization, conventions, presentation]. For each criterion and performance level, write a specific, observable descriptor (not vague language like 'good' or 'poor'). Include a row for total points and a space for written feedback.",
    description: "Build clear, specific rubrics for any assignment type"
  },
  {
    title: "Personalized Student Feedback",
    prompt: "I am a [grade level] [subject] teacher. A student submitted the following [assignment type] on [topic]. Using the rubric criteria below, write specific, constructive feedback that: (1) Starts with something the student did well (be specific, not generic praise), (2) Identifies 2-3 areas for improvement with concrete suggestions, (3) Includes one actionable next step the student can take immediately, (4) Uses encouraging, growth-mindset language appropriate for [grade level]. Keep the total feedback under 150 words.\n\nRubric criteria: [paste rubric]\nStudent work: [paste or describe student work]",
    description: "Generate specific, actionable feedback for each student in seconds"
  },
  {
    title: "Parent Communication Email",
    prompt: "Draft a professional email to parents/guardians about [choose: upcoming project, student progress concern, positive update, classroom event, behavior issue]. The tone should be warm, professional, and solution-oriented. Include: (1) A clear subject line, (2) Greeting and context, (3) Specific details about the situation (use placeholders for student name), (4) What the school/teacher is doing to support the student, (5) What parents can do at home, (6) An invitation to communicate further, (7) Professional closing. Keep it under 200 words. Avoid educational jargon.",
    description: "Write clear, professional parent emails for any situation"
  },
  {
    title: "Engaging Warm-Up Activities",
    prompt: "Generate 5 creative warm-up/bell-ringer activities for a [grade level] [subject] class that are studying [current unit/topic]. Each activity should: (1) Take 3-5 minutes, (2) Require no materials or only pencil and paper, (3) Activate prior knowledge or preview the day's lesson, (4) Engage multiple learning modalities (include at least one kinesthetic, one visual, and one discussion-based option), (5) Include brief instructions I can display on the board. Make them genuinely engaging, not just worksheet-style questions.",
    description: "Never start class flat again with creative, ready-to-use warm-ups"
  }
]

const painPoints = [
  {
    icon: "📚",
    title: "Grading Overload",
    description: "Spending evenings and weekends grading papers, writing feedback, and feeling like you never catch up"
  },
  {
    icon: "📋",
    title: "Lesson Planning Time",
    description: "Creating engaging, standards-aligned lesson plans that meet every student's needs takes hours every week"
  },
  {
    icon: "🎯",
    title: "Differentiation Demands",
    description: "Expected to differentiate for 25+ students with different levels, IEPs, and language needs in a single class"
  },
  {
    icon: "💬",
    title: "Communication Load",
    description: "Parent emails, progress reports, IEP documentation, and administrative paperwork on top of teaching"
  }
]

export default function EducationAI() {
  const [copiedPrompt, setCopiedPrompt] = useState(null)

  const copyToClipboard = (prompt, title) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(title)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'AI Prompts for Educators | Lesson Plans, Grading & Differentiated Instruction',
    description: 'AI prompts designed for teachers and educators. Create lesson plans in minutes, generate differentiated materials, write student feedback faster, and reclaim your evenings with ChatGPT, Claude, and Gemini.',
    url: 'https://promptwritingstudio.com/education-ai',
    datePublished: '2025-06-01',
    dateModified: '2026-02-01',
    keywords: ['AI prompts teachers', 'AI lesson plans', 'AI grading tools', 'differentiated instruction AI', 'teacher productivity AI', 'education AI tools', 'AI rubric generator', 'AI for educators']
  })

  return (
    <>
      <Head>
        <title>AI Prompts for Educators | Lesson Plans, Grading &amp; Differentiated Instruction</title>
        <meta name="description" content="AI prompts designed for teachers and educators. Create lesson plans in 5 minutes, generate differentiated materials instantly, and write personalized student feedback in seconds. Save 5-10 hours every week." />
        <meta name="keywords" content="AI prompts teachers, AI lesson plans, AI grading tools, differentiated instruction AI, teacher productivity AI, education AI tools, AI rubric generator, AI for educators" />
        <link rel="canonical" href="https://promptwritingstudio.com/education-ai" />
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
              AI Prompts That Give Teachers
              <span className="block text-[#FFDE59]">Their Evenings Back</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Stop spending your weekends on lesson plans and grading. Use AI prompts to create standards-aligned lessons in 5 minutes, differentiate for every learner, and write personalized feedback in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="#prompts"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                See Education AI Prompts
              </Link>
              <Link
                href="/claude-code-guide"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Start with Claude Code
              </Link>
            </div>
            <div className="text-white text-lg">
              <p>Used by K-12 teachers, college professors, and instructional coaches</p>
              <p>Works with ChatGPT, Claude, Gemini, and education-specific AI tools</p>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Teaching is Rewarding. The Paperwork is Not.
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                These are the time-consuming tasks that keep educators working well beyond the school day
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
                AI Prompts Built for the Classroom
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Copy these prompts into ChatGPT, Claude, or Gemini. Fill in the brackets with your grade level, subject, and specific needs.
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

        {/* Use Cases Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                What Educators Are Doing with AI Prompts
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-[#F9F9F9] rounded-lg border border-[#E5E5E5]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Lesson Planning</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li>Unit plans with daily breakdowns</li>
                  <li>Standards-aligned objectives</li>
                  <li>Cross-curricular connections</li>
                  <li>Substitute teacher plans</li>
                </ul>
              </div>
              <div className="p-6 bg-[#F9F9F9] rounded-lg border border-[#E5E5E5]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Assessment</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li>Rubrics for any assignment</li>
                  <li>Formative assessment questions</li>
                  <li>Test and quiz generation</li>
                  <li>Personalized student feedback</li>
                </ul>
              </div>
              <div className="p-6 bg-[#F9F9F9] rounded-lg border border-[#E5E5E5]">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">Differentiation</h3>
                <ul className="space-y-2 text-[#333333]">
                  <li>Leveled reading passages</li>
                  <li>Modified assignments for IEPs</li>
                  <li>Extension activities for gifted students</li>
                  <li>ELL-adapted materials</li>
                </ul>
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
                Common questions about using AI prompts in education
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
              Teach Smarter, Not Longer: AI Prompts for Educators
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of educators who are saving 5-10 hours per week with AI prompts. Spend less time on paperwork and more time doing what you love: teaching.
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
