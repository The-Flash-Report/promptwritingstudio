import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import EmailCapture from '../../components/ui/EmailCapture'
import { AI_WORKFORCE_MODULES } from '../../data/ai-workforce'

export async function getStaticPaths() {
  return {
    paths: AI_WORKFORCE_MODULES.map((m) => ({ params: { slug: m.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const module = AI_WORKFORCE_MODULES.find((m) => m.slug === params.slug) || null
  if (!module) return { notFound: true }

  const moduleIndex = AI_WORKFORCE_MODULES.findIndex((m) => m.slug === params.slug)
  const prevModule = module.prev ? AI_WORKFORCE_MODULES.find((m) => m.slug === module.prev) : null
  const nextModule = module.next ? AI_WORKFORCE_MODULES.find((m) => m.slug === module.next) : null

  return { props: { module, moduleIndex, prevModule: prevModule || null, nextModule: nextModule || null } }
}

function ContentBlock({ block }) {
  switch (block.type) {
    case 'lead':
      return <p className="text-lg text-[#333333] leading-relaxed mb-8 font-medium border-l-4 border-[#FFDE59] pl-4">{block.text}</p>
    case 'h2':
      return <h2 className="text-2xl font-bold text-[#1A1A1A] mt-10 mb-4">{block.text}</h2>
    case 'p':
      return <p className="text-[#333333] leading-relaxed mb-5">{block.text}</p>
    case 'example':
      return (
        <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{block.label}</p>
          <p className="text-[#333333]">{block.text}</p>
        </div>
      )
    case 'action':
      return (
        <div className="bg-[#FFF9DB] border-l-4 border-[#FFDE59] rounded-r-lg p-5 mb-6">
          <p className="text-xs font-bold uppercase tracking-wide text-[#1A1A1A] mb-2">{block.label || 'What to do this week'}</p>
          {Array.isArray(block.text) ? (
            <ul className="space-y-2 text-[#333333] list-disc pl-5">
              {block.text.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-[#333333]">{block.text}</p>
          )}
        </div>
      )
    case 'links':
      return (
        <div className="mt-8 mb-6 p-5 border border-[#E5E5E5] rounded-lg bg-white">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">{block.label || 'Read next'}</p>
          <ul className="space-y-2 text-sm text-[#333333]">
            {block.items.map((item, i) => {
              const isExternal = item.url && /^https?:/.test(item.url)
              return (
                <li key={i}>
                  {item.url ? (
                    <Link
                      href={item.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="text-indigo-600 hover:underline font-medium"
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <span className="font-medium">{item.text}</span>
                  )}
                  {item.note ? <span className="text-gray-600"> -- {item.note}</span> : null}
                </li>
              )
            })}
          </ul>
        </div>
      )
    case 'sources':
      return (
        <div className="mt-10 pt-6 border-t border-[#E5E5E5]">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Sources</h3>
          <ul className="space-y-1 text-sm text-[#333333]">
            {block.items.map((item, i) => {
              if (typeof item === 'string') return <li key={i} className="text-gray-600">{item}</li>
              const isExternal = item.url && /^https?:/.test(item.url)
              return (
                <li key={i} className="text-gray-600">
                  {item.url ? (
                    <a
                      href={item.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="text-indigo-600 hover:underline"
                    >
                      {item.text}
                    </a>
                  ) : (
                    item.text
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )
    default:
      return null
  }
}

export default function AIWorkforceModule({ module, moduleIndex, prevModule, nextModule }) {
  const totalModules = AI_WORKFORCE_MODULES.length
  const moduleNumber = moduleIndex + 1

  return (
    <>
      <Head>
        <title>{module.title} -- AI Workforce Track | PromptWritingStudio</title>
        <meta name="description" content={module.description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://promptwritingstudio.com/ai-workforce/${module.slug}`} />
      </Head>

      <Layout>
        <section className="gradient-bg py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <Link href="/ai-workforce" className="text-[#FFDE59] text-sm hover:underline mb-4 inline-block">
              AI Workforce Track
            </Link>
            <p className="text-sm text-white opacity-60 mb-2">
              Module {moduleNumber} of {totalModules}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{module.title}</h1>
            <p className="text-white opacity-80 text-lg">{module.description}</p>
            <p className="text-xs text-white opacity-50 mt-4">
              {module.readingTime} -- Last updated {module.lastUpdated}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="mb-4 flex gap-1">
              {AI_WORKFORCE_MODULES.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ai-workforce/${m.slug}`}
                  title={m.shortTitle}
                  className={`h-1.5 rounded-full flex-1 transition ${i === moduleIndex ? 'bg-[#FFDE59]' : 'bg-gray-200 hover:bg-gray-300'}`}
                />
              ))}
            </div>

            <div className="prose max-w-none mt-8">
              {module.content.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}
            </div>

            <nav className="flex justify-between items-center mt-12 pt-6 border-t border-[#E5E5E5]">
              {prevModule ? (
                <Link
                  href={`/ai-workforce/${prevModule.slug}`}
                  className="text-indigo-600 hover:underline text-sm font-medium"
                >
                  Previous: {prevModule.shortTitle}
                </Link>
              ) : (
                <span />
              )}
              {nextModule ? (
                <Link
                  href={`/ai-workforce/${nextModule.slug}`}
                  className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition text-sm"
                >
                  Next: {nextModule.shortTitle}
                </Link>
              ) : (
                <Link
                  href="/ai-workforce"
                  className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition text-sm"
                >
                  Back to track overview
                </Link>
              )}
            </nav>
          </div>
        </section>

        <section className="py-12 bg-[#F9F9F9] border-t border-[#E5E5E5]">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">AI capability changes fast</h2>
            <p className="text-[#333333] text-sm mb-6">
              One email per month when published benchmarks or labour-market research materially shifts the picture.
            </p>
            <div className="flex justify-center">
              <EmailCapture
                formName="ai-workforce-monthly"
                label="Monthly update on AI capability changes and what they mean for your role."
                buttonText="Get updates"
                source={`ai-workforce-${module.slug}`}
                theme="light"
              />
            </div>
          </div>
        </section>

        <section className="py-10 bg-white border-t border-[#E5E5E5]">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Related</h2>
            <ul className="space-y-2 text-sm text-[#333333]">
              <li>
                {/* TODO(vendors.ie): link to AI tools for workers category once V-IRISH-004 cluster URLs confirmed */}
                <span className="font-medium">AI tools for Irish workers</span> -- tool comparisons on Vendors.ie (link forthcoming)
              </li>
              <li>
                {/* TODO(P-LEARN-001): link to /learn once interactive prompt engineering resource ships */}
                <span className="font-medium">Hands-on prompt engineering</span> -- interactive practice resource (coming soon)
              </li>
              <li>
                <Link href="/best-ai-tools" className="text-indigo-600 hover:underline font-medium">
                  Best AI tools overview
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </Layout>
    </>
  )
}
