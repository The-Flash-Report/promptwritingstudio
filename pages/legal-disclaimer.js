import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'

export default function LegalDisclaimer() {
  return (
    <Layout>
      <Head>
        <title>Legal Disclaimer — PromptWritingStudio</title>
        <meta
          name="description"
          content="Legal disclaimer for PromptWritingStudio — how we source information, limits of the guidance on this site, third-party trademarks, and how to report errors."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Legal Disclaimer</h1>
            <p className="text-gray-600 mb-8">
              <strong>Last Updated:</strong> April 17, 2026
            </p>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                PromptWritingStudio (the &ldquo;Site&rdquo;) is an independent, editorially-run resource operated
                by Bryan Collins. This page explains the legal limits of the information we publish. Please read
                it alongside our{' '}
                <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-800 underline">
                  Terms of Service
                </Link>
                ,{' '}
                <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                  Privacy Policy
                </Link>
                , and{' '}
                <Link href="/disclosure" className="text-blue-600 hover:text-blue-800 underline">
                  Affiliate &amp; Editorial Disclosure
                </Link>
                .
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">No professional advice</h2>
              <p className="mb-6">
                Content on this Site — including guides, calculators, comparisons, code snippets, prompt templates,
                and AI model information — is published for <strong>general informational and educational purposes
                only</strong>. It is not legal, financial, tax, medical, accounting, employment, or other
                professional advice. You should not act or refrain from acting based solely on anything you read
                here. For decisions that have legal, financial, commercial, or safety consequences, consult a
                qualified professional licensed in your jurisdiction.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Accuracy, currency, and AI drift</h2>
              <p className="mb-6">
                The AI landscape moves fast. Model names, pricing, context-window sizes, plan limits, rate limits,
                and feature availability change frequently and without notice. We pull Claude model data from a
                single source-of-truth file that is checked weekly against vendor documentation, and we stamp
                pages that carry volatile data with a &ldquo;Last verified&rdquo; date. Even so, any number,
                feature claim, or recommendation on this Site may be out of date or incorrect by the time you
                read it. <strong>Always verify critical numbers against the primary vendor source before making
                a purchase or integration decision.</strong>
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">AI-generated content</h2>
              <p className="mb-6">
                We use AI tools — including Claude — to help research, outline, and draft content on this Site.
                Every page is reviewed and edited by a human (usually Bryan) before publication. AI can make
                mistakes, and even reviewed content may contain errors, omissions, or outdated information. Treat
                anything the Site produces through an interactive tool (prompt generators, calculators, quizzes,
                comparisons) as a starting point, not a final answer.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Calculators and tools</h2>
              <p className="mb-6">
                Calculators on this Site (including the Claude Plan Picker, Prompt Cost Calculator, ROI
                Calculator, and others) produce <em>estimates only</em>, using assumptions that we document on
                each page. Outputs are not quotes, binding predictions, or commitments from any third party.
                Your actual costs, savings, and usage will vary with your workload, the pricing in effect at the
                time, applicable taxes, currency conversion, and the specific model / tier you choose.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Third-party products and trademarks</h2>
              <p className="mb-6">
                We discuss, compare, and link to third-party products including but not limited to
                <strong> Claude</strong> and <strong>Claude Code</strong> (Anthropic), <strong>ChatGPT</strong>
                and the OpenAI API (OpenAI), <strong>Gemini</strong> (Google), <strong>Cursor</strong>, and
                various MCP servers. All product names, logos, and brands are the property of their respective
                owners. Use of these names on this Site is for identification and comparison purposes only and
                does not imply endorsement, affiliation, or sponsorship. PromptWritingStudio is not operated by,
                affiliated with, or endorsed by Anthropic, OpenAI, Google, or any other vendor discussed on the
                Site unless explicitly stated.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">External links</h2>
              <p className="mb-6">
                We link out to vendor documentation, research, tutorials, and other resources we think are useful.
                We do not control those sites and are not responsible for their content, accuracy, availability,
                privacy practices, or terms. Linking out does not imply endorsement of everything on the linked
                page.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Affiliate relationships</h2>
              <p className="mb-6">
                Some outbound links on this Site are affiliate or referral links, meaning we may earn a
                commission or account credit if you sign up or buy through them. This never increases your price
                and it does not determine whether a tool gets a positive or negative review. Full details are in
                our{' '}
                <Link href="/disclosure" className="text-blue-600 hover:text-blue-800 underline">
                  Affiliate &amp; Editorial Disclosure
                </Link>
                .
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use at your own risk</h2>
              <p className="mb-6">
                You are solely responsible for how you use the information, prompts, and code on this Site.
                Copy-pasting a prompt template, running a suggested Claude Code command, installing an MCP
                server, or wiring up a hooks recipe can have real consequences in your environment — including
                data loss, unexpected bills, security exposure, or breaking production systems. Review everything
                you run. Test in a safe environment first. Never paste secrets, credentials, or regulated data
                into AI tools without understanding the provider&rsquo;s data-handling policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitation of liability</h2>
              <p className="mb-6">
                To the maximum extent permitted by law, PromptWritingStudio, its operator, and its contributors
                are <strong>not liable</strong> for any direct, indirect, incidental, consequential, special, or
                punitive damages arising from your use of this Site or its content — including but not limited
                to lost profits, lost data, service disruptions, incorrect billing from third-party AI vendors,
                or reliance on any estimate, recommendation, or comparison published here. The Site is provided
                on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, without warranties of any kind,
                express or implied, including warranties of merchantability, fitness for a particular purpose,
                and non-infringement. See our{' '}
                <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-800 underline">
                  Terms of Service
                </Link>{' '}
                for the full contractual version of this limitation.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Jurisdiction</h2>
              <p className="mb-6">
                PromptWritingStudio is operated from Ireland by Bryan Collins. Information on the Site may not
                be appropriate or available for use in all jurisdictions. You are responsible for complying with
                local law wherever you access the Site.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Reporting errors</h2>
              <p className="mb-6">
                If you spot something on this Site that is wrong, out of date, or misleading — including stale
                pricing, a broken example, or a tool comparison that no longer holds — please email{' '}
                <a
                  href="mailto:bryan@becomeawritertoday.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  bryan@becomeawritertoday.com
                </a>{' '}
                and we will fix it. Corrections are faster than complaints.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to this disclaimer</h2>
              <p className="mb-6">
                We may update this disclaimer from time to time to reflect changes to the Site, the AI landscape,
                or applicable law. The &ldquo;Last Updated&rdquo; date at the top of this page indicates when the
                disclaimer was most recently changed. Continued use of the Site after an update means you accept
                the updated disclaimer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
