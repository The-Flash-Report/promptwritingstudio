import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { generateFAQSchema, generateArticleSchema } from '../lib/schemaGenerator'

const faqs = [
  {
    question: "What is vision AI prompting and how is it different from image generation?",
    answer: "Vision AI prompting is about using AI to analyze and understand images you provide, not about creating new images. When you upload a photo, screenshot, chart, or document to models like GPT-4 Vision, Claude, or Gemini, you can ask the AI to describe what it sees, extract data, interpret charts, read handwriting, analyze designs, and much more. Image generation (like DALL-E or Midjourney) creates images from text. Vision AI does the opposite: it creates text understanding from images."
  },
  {
    question: "Which AI models support vision and image understanding?",
    answer: "As of 2026, the major models with strong vision capabilities are: GPT-5 and GPT-4o (OpenAI/ChatGPT), Claude Opus 4.7 and Claude Sonnet 4.6 (Anthropic), and Gemini 2.5 Pro (Google). All three platforms allow you to upload images alongside text prompts. Each has slightly different strengths: GPT-4o is fast and versatile, Claude excels at detailed document analysis, and Gemini handles very large images and videos well."
  },
  {
    question: "What types of images can vision AI analyze?",
    answer: "Vision AI can analyze virtually any image type: photographs, screenshots, charts and graphs, handwritten notes, receipts and invoices, product images, architectural plans, medical images (for educational purposes), whiteboard notes, code screenshots, maps, infographics, scanned documents, and more. The key to getting good results is writing a clear prompt that tells the AI exactly what information you want extracted from the image."
  },
  {
    question: "How accurate is AI vision analysis?",
    answer: "Accuracy depends on image quality and the complexity of the task. For clear, well-lit images with printed text, accuracy is very high (95%+ for text extraction). Chart reading and data extraction is generally reliable but should be verified for precise numbers. Complex visual reasoning tasks (like interpreting ambiguous diagrams or reading poor handwriting) are less reliable. Always verify critical data extracted by AI vision, especially numbers and technical details."
  },
  {
    question: "Can I use vision AI for business document processing?",
    answer: "Yes. This is one of the most practical applications. You can use vision AI to extract data from invoices and receipts, digitize handwritten meeting notes, analyze competitor screenshots, read and summarize lengthy PDF documents, extract information from business cards, interpret dashboard screenshots, and process forms. Many businesses use vision AI to automate data entry tasks that previously required manual input."
  },
  {
    question: "What makes a good vision AI prompt different from a text-only prompt?",
    answer: "Vision prompts need to be specific about what you want the AI to focus on in the image. A vague prompt like 'What do you see?' produces vague results. A strong vision prompt specifies: (1) what the image contains (a chart, a product photo, a screenshot), (2) what specific information you want extracted, (3) the format you want the response in (table, bullet points, JSON), and (4) any context that helps interpretation. For example, telling the AI 'This is a quarterly sales chart for a SaaS company' produces much better analysis than just uploading the chart."
  },
  {
    question: "Are there privacy concerns with uploading images to AI models?",
    answer: "Yes, you should be thoughtful about what images you upload. Avoid uploading images containing sensitive personal information, confidential business data, medical records, or proprietary designs to public AI platforms unless your organization has an enterprise agreement with data handling protections. Most consumer AI platforms state that uploaded images may be used for model training unless you opt out. Check your platform's data policy and use enterprise tiers for sensitive content."
  },
  {
    question: "Can vision AI read handwriting accurately?",
    answer: "Modern vision AI models are surprisingly good at reading handwriting, especially when the writing is reasonably legible. GPT-4 Vision and Claude both handle printed handwriting well and can manage cursive with moderate accuracy. For best results, ensure good lighting and contrast in the image, and tell the AI in your prompt that the image contains handwriting and what type of content to expect. Very messy handwriting or unusual scripts may still be challenging."
  }
]

const promptExamples = [
  {
    title: "Chart and Graph Data Extraction",
    prompt: "I am uploading a [bar chart / line graph / pie chart] showing [describe what the chart represents, e.g., quarterly revenue by product line]. Please: (1) Describe the overall trend shown in the chart, (2) Extract all data points into a markdown table with rows and columns, (3) Identify the highest and lowest values, (4) Note any significant patterns, anomalies, or inflection points, (5) Suggest 2-3 business insights based on the data. If any values are difficult to read precisely, provide your best estimate and flag it with an asterisk.",
    description: "Turn visual charts into structured data and actionable insights"
  },
  {
    title: "Screenshot Analysis and Documentation",
    prompt: "I am uploading a screenshot of [a software interface / website / error message / dashboard]. Please: (1) Describe what is shown in the screenshot, (2) Identify all visible UI elements, labels, and data points, (3) [If error: explain what the error likely means and suggest 3 possible solutions], [If dashboard: extract all visible metrics and KPIs into a table], [If website: analyze the layout, UX patterns, and content hierarchy], (4) Note anything that appears unusual or problematic. Format your response with clear headings.",
    description: "Document and analyze any screen capture with precision"
  },
  {
    title: "Product Image Analysis for E-commerce",
    prompt: "I am uploading a product image for an e-commerce listing. Please analyze this image and provide: (1) A detailed product description based on what you see (materials, colors, design features, approximate dimensions), (2) 5 bullet points highlighting key selling features visible in the image, (3) Suggested product title optimized for search (under 80 characters), (4) 3 potential customer questions this image might raise, (5) Suggestions for additional product photos that would help customers make a purchase decision. Target audience: [describe target customer].",
    description: "Generate product listings and descriptions from photos alone"
  },
  {
    title: "Document and Receipt OCR",
    prompt: "I am uploading a [receipt / invoice / form / business card / handwritten note]. Please extract all text and data from this image. Format the extracted information as follows: (1) For receipts/invoices: Create a structured table with line items, quantities, prices, and totals. Include the vendor name, date, and any reference numbers. (2) For business cards: Extract name, title, company, phone, email, website, and address into a structured format. (3) For handwritten notes: Transcribe the text as accurately as possible, preserving the structure. Flag any text you are uncertain about with [?]. (4) For forms: Extract all field labels and their corresponding values into a table.",
    description: "Digitize paper documents into structured, usable data"
  },
  {
    title: "Design and UI Feedback",
    prompt: "I am uploading a [website design / app mockup / marketing material / logo design]. Please provide a professional design review covering: (1) First impression and overall visual impact, (2) Layout and visual hierarchy analysis (where does the eye go first?), (3) Typography assessment (readability, font choices, sizing), (4) Color usage and contrast (including accessibility considerations), (5) Consistency with [industry/brand type] design conventions, (6) 3 specific strengths of the design, (7) 3 specific areas for improvement with actionable suggestions, (8) Mobile responsiveness considerations (if applicable). Be constructive and specific in your feedback.",
    description: "Get detailed design feedback without hiring a design consultant"
  },
  {
    title: "Whiteboard and Meeting Notes Digitizer",
    prompt: "I am uploading a photo of a whiteboard [or flip chart / sticky notes / handwritten meeting notes] from a [type of meeting: brainstorm, sprint planning, strategy session]. Please: (1) Transcribe all visible text, preserving groupings and spatial relationships as much as possible, (2) Organize the content into logical sections with clear headings, (3) Create a structured summary of the key topics and decisions captured, (4) Generate a formatted list of action items if any are visible, (5) Identify any diagrams, flowcharts, or visual frameworks and describe them in text. If any text is unclear, note it as [illegible] and provide your best guess in parentheses.",
    description: "Never lose whiteboard insights again with instant digital capture"
  }
]

const useCases = [
  {
    icon: "📊",
    title: "Chart and Data Reading",
    description: "Extract data from charts, graphs, and dashboards. Turn visual data into tables, summaries, and insights without manual data entry."
  },
  {
    icon: "📄",
    title: "Document Analysis",
    description: "Read receipts, invoices, handwritten notes, business cards, and scanned documents. Extract structured data from paper-based sources."
  },
  {
    icon: "📸",
    title: "Screenshot Interpretation",
    description: "Analyze software interfaces, error messages, website designs, and dashboard screenshots. Document, debug, and review any screen capture."
  },
  {
    icon: "🛍️",
    title: "Product Image Analysis",
    description: "Generate product descriptions, identify features, and create e-commerce listings from product photos alone."
  },
  {
    icon: "🎨",
    title: "Design Review",
    description: "Get professional feedback on website designs, app mockups, logos, and marketing materials. Assess visual hierarchy, typography, and UX."
  },
  {
    icon: "📝",
    title: "Whiteboard Digitization",
    description: "Capture and organize meeting notes, brainstorming sessions, and flowcharts from whiteboard photos into structured digital formats."
  }
]

export default function VisionAIPrompts() {
  const [copiedPrompt, setCopiedPrompt] = useState(null)

  const copyToClipboard = (prompt, title) => {
    navigator.clipboard.writeText(prompt)
    setCopiedPrompt(title)
    setTimeout(() => setCopiedPrompt(null), 2000)
  }

  const faqSchema = generateFAQSchema(faqs)
  const articleSchema = generateArticleSchema({
    title: 'Vision AI Prompts | How to Write Prompts for Image Understanding in ChatGPT, Claude & Gemini',
    description: 'Learn how to write effective prompts for vision AI and image understanding. Extract data from charts, analyze screenshots, read documents, and review designs using GPT-4 Vision, Claude, and Gemini multimodal capabilities.',
    url: 'https://promptwritingstudio.com/vision-ai-prompts',
    datePublished: '2025-06-01',
    dateModified: '2026-02-01',
    keywords: ['vision AI prompts', 'GPT-4 vision prompts', 'Claude vision', 'Gemini multimodal prompts', 'image analysis AI', 'AI image understanding', 'vision prompting', 'multimodal AI prompts', 'chart reading AI', 'screenshot analysis AI']
  })

  return (
    <>
      <Head>
        <title>Vision AI Prompts | How to Write Prompts for Image Understanding in ChatGPT, Claude &amp; Gemini</title>
        <meta name="description" content="Learn to write effective vision AI prompts for image analysis. Extract chart data, read documents, analyze screenshots, and review designs using GPT-4 Vision, Claude, and Gemini multimodal features." />
        <meta name="keywords" content="vision AI prompts, GPT-4 vision prompts, Claude vision, Gemini multimodal prompts, image analysis AI, AI image understanding, vision prompting, multimodal AI prompts" />
        <link rel="canonical" href="https://promptwritingstudio.com/vision-ai-prompts" />
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
            <p className="text-[#FFDE59] font-semibold text-lg mb-4">Last updated: April 2026</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Vision AI Prompts: Teach AI to
              <span className="block text-[#FFDE59]">See and Understand Your Images</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Claude, GPT, and Gemini can now analyze images, read documents, extract chart data, and review designs. The key to getting accurate results? Writing the right prompt. Learn how to craft vision prompts that turn any image into actionable information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="#prompts"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                See Vision AI Prompts
              </Link>
              <Link
                href="/ai-models"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Compare Vision Models
              </Link>
            </div>
            <div className="text-white text-lg">
              <p>Not about generating images. About using AI to understand them.</p>
              <p>Works with GPT-5/GPT-4o, Claude Opus 4.7 / Sonnet 4.6, and Gemini 2.5 Pro</p>
            </div>
          </div>
        </section>

        {/* What is Vision AI Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                What is Vision AI Prompting?
              </h2>
            </div>
            <div className="prose max-w-none">
              <div className="bg-[#F9F9F9] p-8 rounded-lg border border-[#E5E5E5] mb-8">
                <p className="text-lg text-[#333333] mb-4">
                  <strong>Vision AI prompting</strong> is the skill of writing text instructions that guide AI models to analyze, interpret, and extract information from images you upload. It is the opposite of image generation.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-bold text-[#1A1A1A] mb-2">Image Generation (NOT this)</h3>
                    <p className="text-[#666666] text-sm">Text goes in, image comes out. Tools like DALL-E, Midjourney, and Stable Diffusion create images from text descriptions.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-2 border-[#FFDE59]">
                    <h3 className="font-bold text-[#1A1A1A] mb-2">Vision AI (THIS page)</h3>
                    <p className="text-[#666666] text-sm">Image goes in, text comes out. You upload an image and ask AI to analyze, read, extract, describe, or review what it sees.</p>
                  </div>
                </div>
              </div>
              <p className="text-lg text-[#333333]">
                Modern AI models from OpenAI (GPT-5, GPT-4o), Anthropic (Claude Opus 4.7, Claude Sonnet 4.6, Claude Haiku 4.5), and Google (Gemini 2.5 Pro, Gemini 2.5 Flash) all support multimodal input. This means you can upload an image alongside your text prompt and the AI will analyze both together. The quality of your results depends almost entirely on how well you write your vision prompt.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                What Can You Do with Vision AI Prompts?
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Six practical categories where vision AI saves hours of manual work
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg border border-[#E5E5E5]">
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{useCase.title}</h3>
                  <p className="text-[#333333]">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prompt Examples Section */}
        <section id="prompts" className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Vision AI Prompt Templates You Can Use Today
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Upload your image to ChatGPT, Claude, or Gemini, then paste one of these prompts alongside it. Customize the bracketed sections for your specific image.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {promptExamples.map((example, index) => (
                <div key={index} className="bg-[#F9F9F9] p-8 rounded-lg shadow-lg border border-[#E5E5E5]">
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">{example.title}</h3>
                  <p className="text-[#666666] mb-4">{example.description}</p>
                  <div className="bg-white p-4 rounded-lg mb-4 font-mono text-sm text-[#333333] leading-relaxed">
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

        {/* Tips Section */}
        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                5 Rules for Writing Better Vision AI Prompts
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">1. Tell the AI what the image is</h3>
                <p className="text-[#333333]">Do not just upload an image and ask "What do you see?" Instead, say "I am uploading a quarterly revenue bar chart for a SaaS company." Context dramatically improves accuracy and relevance.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">2. Specify exactly what you want extracted</h3>
                <p className="text-[#333333]">Be explicit: "Extract all data points into a table" or "Transcribe all visible text." The more specific your request, the more useful the output. Ask for numbered lists, tables, or structured formats.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">3. Request uncertainty flags</h3>
                <p className="text-[#333333]">Include instructions like "If any values are hard to read, mark them with [?] and provide your best estimate." This prevents the AI from confidently stating incorrect information.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">4. Use high-quality images</h3>
                <p className="text-[#333333]">Ensure good lighting, sharp focus, and sufficient resolution. Crop to the relevant area. A clean, well-lit photo of a receipt will give far better results than a blurry, angled shot in poor lighting.</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-[#E5E5E5]">
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">5. Define the output format</h3>
                <p className="text-[#333333]">Tell the AI how you want the results: "Format as a markdown table," "Return as JSON," "Write as bullet points." Without format instructions, you will get a generic paragraph that is harder to use.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Model Comparison Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Vision Capabilities by AI Model
              </h2>
              <p className="text-xl text-[#333333]">
                How the major models compare for image understanding tasks
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg border border-[#E5E5E5]">
                <thead>
                  <tr className="bg-[#1A1A1A] text-white">
                    <th className="p-4 text-left">Capability</th>
                    <th className="p-4 text-center">GPT-5 / GPT-4o</th>
                    <th className="p-4 text-center">Claude Sonnet 4.6</th>
                    <th className="p-4 text-center">Gemini 2.5 Pro</th>
                  </tr>
                </thead>
                <tbody className="text-[#333333]">
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="p-4 font-semibold">Text/OCR Extraction</td>
                    <td className="p-4 text-center">Excellent</td>
                    <td className="p-4 text-center">Excellent</td>
                    <td className="p-4 text-center">Excellent</td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5] bg-[#F9F9F9]">
                    <td className="p-4 font-semibold">Chart/Graph Reading</td>
                    <td className="p-4 text-center">Very Good</td>
                    <td className="p-4 text-center">Excellent</td>
                    <td className="p-4 text-center">Very Good</td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="p-4 font-semibold">Handwriting Recognition</td>
                    <td className="p-4 text-center">Good</td>
                    <td className="p-4 text-center">Good</td>
                    <td className="p-4 text-center">Good</td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5] bg-[#F9F9F9]">
                    <td className="p-4 font-semibold">Design/UI Review</td>
                    <td className="p-4 text-center">Very Good</td>
                    <td className="p-4 text-center">Excellent</td>
                    <td className="p-4 text-center">Very Good</td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="p-4 font-semibold">Large Image Support</td>
                    <td className="p-4 text-center">Good</td>
                    <td className="p-4 text-center">Good</td>
                    <td className="p-4 text-center">Excellent</td>
                  </tr>
                  <tr className="bg-[#F9F9F9]">
                    <td className="p-4 font-semibold">Video Analysis</td>
                    <td className="p-4 text-center">Limited</td>
                    <td className="p-4 text-center">No</td>
                    <td className="p-4 text-center">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#666666] mt-4 text-center">
              Model capabilities are evolving rapidly. Ratings based on testing as of April 2026.
            </p>
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
                Common questions about vision AI prompting and image understanding
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
              Master Vision AI Prompting and Multimodal AI
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Vision prompting is one of the most underused AI capabilities. Learn how to write prompts that turn images into structured data, actionable insights, and professional analysis. Our course covers text prompting, vision prompting, and advanced techniques for every major AI platform.
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
