import Head from 'next/head'
import Layout from '../components/layout/Layout'

export default function Disclosure() {
  return (
    <Layout>
      <Head>
        <title>Affiliate & Editorial Disclosure - Prompt Writing Studio</title>
        <meta
          name="description"
          content="How Prompt Writing Studio makes money, which links are affiliate links, and how we keep reviews editorially independent."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Affiliate & Editorial Disclosure</h1>
            <p className="text-gray-600 mb-8">
              <strong>Last Updated:</strong> April 17, 2026
            </p>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How we make money</h2>
              <p className="mb-6">
                Prompt Writing Studio is operated by Bryan Collins. The site makes money in three main ways:
              </p>
              <ol className="mb-6 space-y-2 list-decimal pl-6">
                <li>
                  <strong>Affiliate commissions.</strong> When you click an affiliate link on this site and
                  buy a product or subscribe to a service, we may earn a commission at no extra cost to you.
                </li>
                <li>
                  <strong>Course + digital product sales.</strong> We sell educational products — including
                  the Prompt Writing Studio course — hosted through Teachable under the Become a Writer Today
                  brand. Those purchases are a direct relationship between you and Teachable.
                </li>
                <li>
                  <strong>Referral credits.</strong> Some tools (for example, Anthropic's Claude referral
                  programme) pay us in account credits rather than cash when you sign up through our link.
                  These are treated the same as affiliate commissions for the purposes of this disclosure.
                </li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Which links are affiliate links?</h2>
              <p className="mb-6">
                We do <em>not</em> mark every individual affiliate link inline, because this disclosure covers
                the whole site. You should assume that any outbound link to a paid AI tool, course, or software
                product on Prompt Writing Studio <strong>may</strong> be an affiliate or referral link. That
                currently includes, but is not limited to: Anthropic (Claude), OpenAI (ChatGPT), Jasper,
                Grammarly, Teachable, and various tools we recommend in our reviews and calculators.
              </p>
              <p className="mb-6">
                If a link is <em>not</em> an affiliate link — for example, a link to official documentation, a
                research paper, or a news article — it's included because it's the best source we can point you
                to, not because we are paid to send traffic there.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How this affects our reviews</h2>
              <p className="mb-6">
                Commercial relationships <strong>do not</strong> determine whether a tool gets a positive or
                negative review on this site. We review tools we actually use or have researched in depth. If we
                recommend a tool, it is because we think it is genuinely useful for the job, not because the
                affiliate commission is higher.
              </p>
              <p className="mb-6">
                When a tool has real limitations — pricing gotchas, weak features compared to alternatives,
                accuracy issues — we say so, even if we earn a commission on it. When we think a free or cheaper
                alternative is a better fit for most readers, we name it.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">AI-generated content</h2>
              <p className="mb-6">
                We use AI tools — including Claude — to help research, outline, and draft content on this site.
                Every article is reviewed and edited by a human (usually Bryan) before publication. Model
                version numbers, pricing, and feature claims are verified against vendor documentation at
                time of writing. These can change quickly, so always double-check critical numbers against the
                official source before making a buying decision.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">FTC compliance</h2>
              <p className="mb-6">
                This disclosure is published in accordance with the U.S. Federal Trade Commission's{' '}
                <a
                  href="https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers"
                  className="text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Endorsement Guides
                </a>
                , and with equivalent consumer-protection and advertising rules in other jurisdictions where our
                readers live.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Questions?</h2>
              <p className="mb-6">
                If something on this site is unclear — which links are affiliate links, whether a particular
                recommendation is sponsored, or how we tested a tool — email{' '}
                <a href="mailto:bryan@becomeawritertoday.com" className="text-blue-600 hover:text-blue-800 underline">
                  bryan@becomeawritertoday.com
                </a>{' '}
                and we will answer directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
