import Layout from '../components/layout/Layout'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export default function About() {
  return (
    <Layout
      title="About PromptWritingStudio — Who This Site Is For"
      description="PromptWritingStudio is a practical resource for people building real work with Claude — Claude Code, MCP, sub-agents, hooks, and the rest of the stack."
    >
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About PromptWritingStudio</h1>
            <p className="text-xl mb-4">
              A working resource for people building real work with Claude — Claude Code, MCP, sub-agents, and hooks.
            </p>
            <p className="text-lg opacity-90">
              Run by Bryan Collins, writer and builder at Become a Writer Today.
            </p>
          </div>
        </div>
      </section>

      {/* What this site is */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What this site is</h2>

            <div className="prose prose-lg mx-auto">
              <p>
                PromptWritingStudio started as a prompt-engineering resource back when people were still pasting
                snippets into ChatGPT. It has narrowed since.
              </p>
              <p>
                Today it focuses on <strong>Claude</strong> — specifically the parts of the Claude stack that most
                material on the web glosses over: Claude Code, MCP servers, sub-agents, skills, hooks, CLAUDE.md files,
                and the plan-vs-API decisions that actually show up when you start shipping real work.
              </p>
              <p>
                Every guide here is pulled from real sessions. The MCP recipes are servers I run. The CLAUDE.md
                playbook is the one I use on this repo. The pricing and model data is pulled from a single source
                and checked weekly by an automated drift-check job — so when Anthropic ships a new model, the
                calculators and comparisons catch up within a week.
              </p>
              <p>
                If you are a solo operator, small team, or in-house AI lead trying to get Claude Code into
                production without burning a week on config, this site is for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who runs it */}
      <section className="py-16 md:py-20 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Who runs it</h2>

            <div className="prose prose-lg mx-auto">
              <p>
                I'm <strong>Bryan Collins</strong>. I write books and essays at{' '}
                <a href="https://becomeawritertoday.com/" target="_blank" rel="noopener noreferrer">
                  Become a Writer Today
                </a>{' '}
                and publish{' '}
                <a href="https://aiflashreport.com/" target="_blank" rel="noopener noreferrer">
                  AI Flash Report
                </a>
                , a daily AI-news briefing.
              </p>
              <p>
                I use Claude Code every day to build and maintain a small portfolio of sites — this one, a few
                news aggregators, a B2B directory, and some tools. Most of what you'll read here is the stuff I
                figured out while shipping that work, written up so the next person doesn't have to spend the
                same afternoon on it.
              </p>
              <p>
                I'm not an Anthropic employee. This is an independent site. Where I link to third-party tools,
                assume it may be an affiliate link unless stated otherwise — see the{' '}
                <Link href="/disclosure">affiliate disclosure</Link> for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we keep content accurate */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">How we keep content accurate</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F9F9F9] p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">Single source of truth</h3>
                <p className="text-gray-700">
                  Claude model IDs, prices, context windows, and plan limits live in one JSON file. Every
                  calculator and comparison page reads from it. Change the file, every page updates.
                </p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">Weekly drift check</h3>
                <p className="text-gray-700">
                  A scheduled job fetches Anthropic's models page and pricing page every Monday and opens a
                  GitHub issue when anything has changed since we last verified.
                </p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">Verified stamps</h3>
                <p className="text-gray-700">
                  Pages with volatile data (prices, plan limits) carry a "Last verified" stamp linking to the
                  source. If a stamp is old, the number is probably too.
                </p>
              </div>
              <div className="bg-[#F9F9F9] p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-3">Working guides only</h3>
                <p className="text-gray-700">
                  If I haven't actually used it, I don't publish it. The MCP stack, hooks recipes, and
                  CLAUDE.md playbook are all from real projects — not speculation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-20 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Spotted something wrong?</h2>
            <p className="text-lg mb-8 text-gray-700">
              Every page has a last-verified stamp. If you hit something that's out of date or plain wrong,
              tell me and I'll fix it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#1A1A1A] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#333333] transition"
            >
              Get in touch <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
