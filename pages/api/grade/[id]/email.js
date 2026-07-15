// POST /api/grade/[id]/email  { email, source? }
// Emails the full grade report for a stored grade record to the given address
// and adds the address to the PromptWritingStudio Resend segment. This is the
// capture at the value moment: a completed grade converts to a list signup.
//
// The report renders an already-persisted, already-paid-for record and never
// calls the AI gateway. Ownership is not required: the record id is a ~72-bit
// unguessable handle minted at grade time, and a per-IP daily cap limits abuse.
// The report email IS the welcome moment, so no separate welcome email fires.

import { getRecord } from '../../../../lib/grades/store'
import { renderGradeReportEmail, isEditsRecord } from '../../../../lib/grades/reportEmail'
import { checkReportEmailRateLimit, REPORT_EMAILS_DAILY_MAX } from '../../../../lib/grades/emailRateLimit'
import { addContactToSegment, sendEmail } from '../../../../lib/email/resend'

// Source attribution applied at the API boundary so the two grader surfaces
// stay measurable in Resend: prompt-grader-report vs agent-prompt-grader-report.
function reportSourceFor(record) {
  return isEditsRecord(record) ? 'agent-prompt-grader-report' : 'prompt-grader-report'
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function shareUrlIfPublic(req, record) {
  if (!record?.public) return null
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers.host
  return `${proto}://${host}/g/${record.id}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query
  const { email } = req.body || {}
  if (!id) {
    return res.status(400).json({ error: 'Missing grade id.', code: 'bad_request' })
  }

  const clean = typeof email === 'string' ? email.trim().toLowerCase() : ''
  if (!EMAIL_RE.test(clean)) {
    // Validate before consuming the rate budget so a bad address is cheap.
    return res.status(400).json({ error: 'Enter a valid email address.', code: 'bad_email' })
  }

  const { allowed, retryAfterSec } = checkReportEmailRateLimit(req)
  if (!allowed) {
    res.setHeader('Retry-After', String(retryAfterSec))
    return res.status(429).json({
      error: `You have sent your ${REPORT_EMAILS_DAILY_MAX} report emails for today. Try again tomorrow.`,
      code: 'rate_limited',
    })
  }

  let record
  try {
    record = await getRecord(id, { strong: true })
  } catch (err) {
    console.error('Report email load failed:', err?.name || 'UnknownError')
    return res.status(500).json({ error: 'Could not load this grade.' })
  }

  // Same 404 for missing, flagged, and scoreless so a caller cannot probe ids.
  if (!record || record.flagged || !record.grade) {
    return res.status(404).json({ error: 'Grade not found.', code: 'not_found' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from =
    process.env.RESEND_FROM ||
    'PromptWritingStudio <hello@send.promptwritingstudio.com>'
  const segmentId = process.env.RESEND_SEGMENT_ID

  if (!apiKey) {
    console.warn('Report email: RESEND_API_KEY missing, send skipped')
    return res.status(503).json({ error: 'Email is not configured right now. Try again later.', code: 'not_configured' })
  }

  const { subject, html } = renderGradeReportEmail(record, {
    shareUrl: shareUrlIfPublic(req, record),
  })
  const source = reportSourceFor(record)

  try {
    await sendEmail({
      apiKey,
      from,
      to: clean,
      subject,
      html,
      tags: [
        { name: 'type', value: 'grade-report' },
        { name: 'source', value: source },
      ],
    })
  } catch (err) {
    console.error('Report email send failed:', err?.message ? String(err.message).slice(0, 120) : 'UnknownError')
    return res.status(502).json({ error: 'Could not send the report. Try again in a moment.' })
  }

  // Segment add is best-effort: the user already has their report, so a segment
  // failure must not turn a delivered email into an error response.
  try {
    await addContactToSegment({ apiKey, segmentId, email: clean })
  } catch (err) {
    console.warn('Report email add-contact failed:', err?.name || 'UnknownError')
  }

  return res.status(200).json({ sent: true, email: clean, source })
}
