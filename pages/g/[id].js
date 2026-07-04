// Public grade page: /g/[id]
// Renders a frozen, opt-in-public grade snapshot. Private or missing records
// 404 (so unshared grades never leak). The score is frozen at mint, so the
// number here never drifts. Carries a dynamic OG card + Review JSON-LD, the
// citable owned-data unit this whole build exists to create.

import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import SharedGradeResult from '../../components/tools/SharedGradeResult'
import { getRecord } from '../../lib/grades/store'
import { overallPct, verdictFor } from '../../lib/grades/record'

const SITE = 'https://promptwritingstudio.com'

export default function SharedGradePage({ record, ogImage }) {
  const grade = record.grade
  const pct = overallPct(grade)
  const editsMode = grade.rubricId === 'agent-prompt'
  const verdict = verdictFor(pct, { editsMode })
  const title = `This prompt scored ${pct}/100 · Prompt Grader`
  const description = grade.summary || `${verdict} — graded by the free Prompt Grader.`
  const canonical = `${SITE}/g/${record.id}`

  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: pct, bestRating: 100, worstRating: 0 },
    itemReviewed: {
      '@type': 'CreativeWork',
      name: (record.promptText || '').slice(0, 100),
      text: record.promptText || '',
    },
    author: { '@type': 'Organization', name: 'PromptWritingStudio Prompt Grader' },
    reviewBody: grade.summary || '',
    url: canonical,
  }

  return (
    <Layout title={title} description={description} canonicalUrl={canonical} ogImage={ogImage}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">Prompt Grader result</p>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mt-1">
            This prompt scored {pct}/100 — {verdict.toLowerCase()}
          </h1>
        </div>

        <SharedGradeResult grade={grade} promptText={record.promptText} />

        <div className="mt-10 bg-[#1A1A1A] text-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold">How would your prompt score?</h2>
          <p className="mt-2 text-gray-300">
            Paste any prompt and get a grounded 0–100 score, the ways it goes wrong, and a rewrite. Free, no signup.
          </p>
          <Link
            href="/prompt-grader"
            className="inline-block mt-4 bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
          >
            Grade my prompt
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params
  let record = null
  try {
    record = await getRecord(id, { strong: true })
  } catch (err) {
    console.error('Grade page load failed:', err?.name || 'UnknownError')
  }

  // Missing, private, or flagged → 404 (unshared grades must not leak).
  if (!record || !record.public || record.flagged) {
    return { notFound: true }
  }

  const pct = overallPct(record.grade)
  const editsMode = record.grade.rubricId === 'agent-prompt'
  const verdict = verdictFor(pct, { editsMode })
  const excerpt = (record.promptText || '').replace(/\s+/g, ' ').trim().slice(0, 120)

  const proto = context.req.headers['x-forwarded-proto'] || 'https'
  const host = context.req.headers.host
  const ogImage =
    `${proto}://${host}/api/og?s=${encodeURIComponent(pct)}` +
    `&v=${encodeURIComponent(verdict)}&p=${encodeURIComponent(excerpt)}`

  // Immutable once public — let the CDN cache it hard.
  context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800')

  return { props: { record, ogImage } }
}
