import Layout from '../components/layout/Layout'
import Head from 'next/head'
import Link from 'next/link'

export default function ContentCreatorsAI() {
  const painPoints = [
    {
      icon: "⏰",
      title: "Time Crunch",
      description: "Spending 20+ hours weekly on content creation"
    },
    {
      icon: "🔄",
      title: "Consistency Struggle",
      description: "Can't maintain a regular posting schedule"
    },
    {
      icon: "🔥",
      title: "Creator Burnout",
      description: "Exhausted from constant content pressure"
    },
    {
      icon: "📈",
      title: "Scaling Issues",
      description: "Can't grow audience without more content"
    }
  ]

  const workflows = [
    {
      icon: "🎯",
      title: "30-day content calendar",
      description: "Generate a full month of topic ideas, hooks, and outlines in one sitting — then refine with Claude or ChatGPT.",
      tool: "Prompt Creator",
      href: "/tools/mad-libs-prompt-creator"
    },
    {
      icon: "📝",
      title: "YouTube + podcast scripts",
      description: "Turn a rough idea into a structured script with intro, hook, beats, and call-to-action.",
      tool: "Prompt Examples",
      href: "/ai-prompt-examples"
    },
    {
      icon: "📱",
      title: "Platform-tuned captions",
      description: "Rewrite one piece of content for LinkedIn, X, Instagram, and TikTok without losing voice.",
      tool: "ChatGPT Templates",
      href: "/chatgpt-prompt-templates"
    },
    {
      icon: "🎨",
      title: "Repurposing one → ten",
      description: "Turn a single long-form piece into clips, threads, quotes, and email — using the same source of truth.",
      tool: "Prompt Writing Quiz",
      href: "/ai-prompt-quiz"
    }
  ]

  return (
    <>
      <Head>
        <title>AI Prompts for Content Creators — Save 20+ Hours Weekly | PromptWritingStudio</title>
        <meta name="description" content="Free AI prompts, templates, and calculators for content creators. Build a 30-day content calendar in 2 hours, repurpose one piece into ten, and stop burning out." />
        <meta name="keywords" content="AI prompts, content creation, YouTube scripts, social media content, AI content calendar, content repurposing" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI Prompts for
              <span className="block text-[#FFDE59]">Content Creators</span>
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto">
              Stop spending 20+ hours weekly on content creation. Use AI prompts and calculators built for creators
              who ship on a schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="#workflows"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                See the workflows
              </Link>
              <Link
                href="/tools/mad-libs-prompt-creator"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Try the Prompt Creator
              </Link>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Sound familiar?
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                The same four problems come up on every creator call.
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

        {/* Workflows Section */}
        <section id="workflows" className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                Four workflows that cut creator time
              </h2>
              <p className="text-xl text-[#333333] max-w-3xl mx-auto">
                Each one is built on free tools on this site — no signup required.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {workflows.map((w, index) => (
                <Link
                  key={index}
                  href={w.href}
                  className="bg-white p-8 rounded-lg shadow-lg border border-[#E5E5E5] hover:border-[#FFDE59] transition block"
                >
                  <div className="text-4xl mb-4">{w.icon}</div>
                  <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3">{w.title}</h3>
                  <p className="text-[#333333] mb-4">{w.description}</p>
                  <div className="bg-[#FFDE59] bg-opacity-20 p-3 rounded-lg">
                    <span className="text-[#1A1A1A] font-semibold">Try: {w.tool} →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-8 text-center">
              More resources for creators
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/prompts/content-creators" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Creator prompt library</h3>
                <p className="text-sm text-[#666666]">Curated prompts for YouTube, podcasts, newsletters, and social.</p>
              </Link>
              <Link href="/ai-models" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Which model to use?</h3>
                <p className="text-sm text-[#666666]">Claude, GPT, Gemini compared on price, context, and writing quality.</p>
              </Link>
              <Link href="/calculators/content-creation-speed" className="block p-6 bg-[#F9F9F9] rounded-lg border border-gray-200 hover:border-[#FFDE59] transition">
                <h3 className="font-bold text-[#1A1A1A] mb-2">Content speed calculator</h3>
                <p className="text-sm text-[#666666]">Estimate hours saved when AI handles drafting for you.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start creating more content in less time
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Free AI prompts, templates, and calculators — no signup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/ai-prompt-generator"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
              >
                Try the Prompt Generator
              </Link>
              <Link
                href="/calculators"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Browse Calculators
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
