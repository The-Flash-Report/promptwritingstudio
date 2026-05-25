import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import EmailCapture from '../../components/ui/EmailCapture'
import { AI_WORKFORCE_MODULES } from '../../data/ai-workforce'

export default function AIWorkforceIndex() {
  return (
    <>
      <Head>
        <title>AI Workforce Defensive Literacy -- Protect Your Career in an AI Economy | PromptWritingStudio</title>
        <meta
          name="description"
          content="A free 5-module track for working professionals. Understand where AI capability boundaries sit, audit your role, and build the skills that compound in an AI-augmented workplace."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://promptwritingstudio.com/ai-workforce" />
      </Head>

      <Layout>
        <section className="gradient-bg py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <p className="text-sm uppercase tracking-widest text-[#FFDE59] mb-4 font-semibold">Free Track</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
              AI Workforce Defensive Literacy
            </h1>
            <p className="text-xl text-white opacity-90 max-w-2xl mx-auto mb-8">
              Published ranges from McKinsey, OECD, and Goldman Sachs suggest 25--40% of current work tasks could be
              automated at today's AI capability levels. This track helps you understand which tasks, what it means for
              your role, and what to do about it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/ai-workforce/${AI_WORKFORCE_MODULES[0].slug}`}
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
              >
                Start Module 1
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">What this track covers</h2>
            <p className="text-[#333333] mb-10 text-lg">
              Five modules designed for non-developer professionals. No jargon. Each module has worked examples from
              common roles and links to primary sources for the claims it makes.
            </p>

            <div className="space-y-4">
              {AI_WORKFORCE_MODULES.map((module, i) => (
                <Link
                  key={module.slug}
                  href={`/ai-workforce/${module.slug}`}
                  className="flex items-start gap-5 p-5 rounded-lg border border-[#E5E5E5] hover:border-[#FFDE59] hover:shadow-sm transition group"
                >
                  <span className="text-2xl font-bold text-[#FFDE59] min-w-[2rem] group-hover:text-[#E5C84F] transition">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-[#1A1A1A] text-lg mb-1">{module.title}</h3>
                    <p className="text-[#333333] text-sm">{module.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{module.readingTime} read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#F9F9F9]">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">AI capability changes fast</h2>
            <p className="text-[#333333] mb-8">
              We update this track when published capability benchmarks or labour-market research materially shifts the
              picture. One email per month, when something changes that matters for your planning.
            </p>
            <div className="flex justify-center">
              <EmailCapture
                formName="ai-workforce-monthly"
                label="Monthly update: what changed in AI capability and what it means for your role."
                buttonText="Get updates"
                source="ai-workforce"
                theme="light"
              />
            </div>
            <p className="text-xs text-gray-400 mt-4">No spam. Unsubscribe any time.</p>
          </div>
        </section>

        <section className="py-12 bg-white border-t border-[#E5E5E5]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Related resources</h2>
            <ul className="space-y-3 text-sm text-[#333333]">
              <li>
                {/* TODO(vendors.ie): link to AI tools for workers category once V-IRISH-004 cluster URLs confirmed */}
                <span className="font-medium">AI tools for Irish workers</span> -- practical tool comparisons on Vendors.ie
                (link forthcoming)
              </li>
              <li>
                {/* TODO(P-LEARN-001): link to /learn once interactive prompt engineering resource is shipped */}
                <span className="font-medium">Hands-on prompt engineering practice</span> -- the interactive learning
                resource (coming soon)
              </li>
              <li>
                <Link href="/best-ai-tools" className="text-indigo-600 hover:underline font-medium">
                  Best AI tools overview
                </Link>{' '}
                -- tools mentioned in this track and how they compare
              </li>
            </ul>
          </div>
        </section>
      </Layout>
    </>
  )
}
