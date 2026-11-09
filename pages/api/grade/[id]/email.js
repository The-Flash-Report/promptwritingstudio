// POST /api/grade/[id]/email  { email, source?, form_id?, signup_page?, signup_utm_*?, signup_referrer? }
// Emails the full grade report for a stored grade record to the given address,
// adds the address to the PromptWritingStudio Resend segment with set-if-empty
// attribution properties, and emits server-side PostHog Signup Confirmed / Failed.

import { getRecord } from '../../../../lib/grades/store'
import { renderGradeReportEmail, isEditsRecord } from '../../../../lib/grades/reportEmail'
import { checkReportEmailRateLimit, REPORT_EMAILS_DAILY_MAX } from '../../../../lib/grades/emailRateLimit'
import {
  addContactToSegment,
  buildAttribution,
  capturePostHogEvent,
  sendEmail,
} from '../../../../lib/email/resend'

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
  const body = req.body || {}
  const { email } = body
  const attribution = buildAttribution(body, req.headers || {}, 'grade-report-email')

  if (!id) {
    await capturePostHogEvent({
      event: 'Signup Failed',
      email: email || 'missing',
      attribution,
      extraProperties: { reason: 'bad_request' },
    })
    return res.status(400).json({ error: 'Missing grade id.', code: 'bad_request' })
  }

  const clean = typeof email === 'string' ? email.trim().toLowerCase() : ''
  if (!EMAIL_RE.test(clean)) {
    // Validate before consuming the rate budget so a bad address is cheap.
    await capturePostHogEvent({
      event: 'Signup Failed',
      email: clean || 'invalid',
      attribution,
      extraProperties: { reason: 'bad_email' },
    })
    return res.status(400).json({ error: 'Enter a valid email address.', code: 'bad_email' })
  }

  const { allowed, retryAfterSec } = checkReportEmailRateLimit(req)
  if (!allowed) {
    res.setHeader('Retry-After', String(retryAfterSec))
    await capturePostHogEvent({
      event: 'Signup Failed',
      email: clean,
      attribution,
      extraProperties: { reason: 'rate_limited' },
    })
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
    await capturePostHogEvent({
      event: 'Signup Failed',
      email: clean,
      attribution,
      extraProperties: { reason: 'store_error' },
    })
    return res.status(500).json({ error: 'Could not load this grade.' })
  }

  // Same 404 for missing, flagged, and scoreless so a caller cannot probe ids.
  if (!record || record.flagged || !record.grade) {
    await capturePostHogEvent({
      event: 'Signup Failed',
      email: clean,
      attribution,
      extraProperties: { reason: 'not_found' },
    })
    return res.status(404).json({ error: 'Grade not found.', code: 'not_found' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from =
    process.env.RESEND_FROM ||
    'PromptWritingStudio <hello@send.promptwritingstudio.com>'
  const segmentId = process.env.RESEND_SEGMENT_ID

  if (!apiKey) {
    console.warn('Report email: RESEND_API_KEY missing, send skipped')
    await capturePostHogEvent({
      event: 'Signup Failed',
      email: clean,
      attribution,
      extraProperties: { reason: 'not_configured' },
    })
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
    await capturePostHogEvent({
      event: 'Signup Failed',
      email: clean,
      attribution,
      extraProperties: { reason: 'send_failed' },
    })
    return res.status(502).json({ error: 'Could not send the report. Try again in a moment.' })
  }

  // Segment add is best-effort: the user already has their report, so a segment
  // failure must not turn a delivered email into an error response.
  let segResult = { added: false, exists: false }
  try {
    segResult = await addContactToSegment({
      apiKey,
      segmentId,
      email: clean,
      attribution,
    })
  } catch (err) {
    console.warn('Report email add-contact failed:', err?.name || 'UnknownError')
  }

  await capturePostHogEvent({
    event: 'Signup Confirmed',
    email: clean,
    attribution,
    extraProperties: {
      is_new: !segResult.exists,
      report_source: source,
    },
  })

  return res.status(200).json({ sent: true, email: clean, source })
}
