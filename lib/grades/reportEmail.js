// Deterministic HTML renderer for the grade-report email. Pure logic only: it
// builds the email body from a stored grade record (lib/grades/record.js shape)
// with no network or Blobs access, so it unit-tests without infra.
//
// Grounding contract carried through from the judge: an evidence quote is shown
// ONLY when the criterion's `grounded` flag is true. The salvage path in
// lib/critique/judge.js drops unverifiable spans (grounded:false), and this
// renderer must never surface a quote that was not verbatim from the prompt.
//
// House rules honored here: no em dashes in any copy, no course CTA, the only
// links are the two grader pages and the public share URL when the grade is
// public. Inline styles match the welcome email in submission-created.js.

import { overallPct, verdictFor } from './record'

const SITE_URL = 'https://promptwritingstudio.com'

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// True when the record came from the agent-prompt grader (edits mode): its
// grade carries a rubricId of 'agent-prompt' and a revisions array instead of
// a single rewrite.
export function isEditsRecord(record) {
  const grade = record?.grade || {}
  return grade.rubricId === 'agent-prompt' || Array.isArray(grade.revisions)
}

// Source attribution so the two grader surfaces stay measurable in Resend.
export function reportEmailSource(record) {
  return isEditsRecord(record) ? 'agent-prompt-grader-report' : 'prompt-grader-report'
}

function criterionBlock(criterion, maxScore) {
  const name = escapeHtml(criterion.name || criterion.id || 'Criterion')
  const score = Number.isFinite(criterion.score) ? criterion.score : 0
  const justification = escapeHtml(criterion.justification || '')
  // Evidence quote is gated on the grounded flag: a false flag means the span
  // could not be verified verbatim and must not be surfaced.
  const showQuote = criterion.grounded === true && typeof criterion.evidenceSpan === 'string' && criterion.evidenceSpan.trim() !== ''
  const quote = showQuote
    ? `<p style="font-size:13px;color:#777;margin:4px 0 0;">From your prompt: <span style="font-style:italic;">"${escapeHtml(criterion.evidenceSpan.trim())}"</span></p>`
    : ''

  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #EEEEEE;">
      <p style="margin:0;font-weight:600;color:#1A1A1A;font-size:14px;">${name} <span style="color:#888;font-weight:400;">${score} / ${maxScore}</span></p>
      <p style="font-size:13px;color:#444;margin:4px 0 0;">${justification}</p>
      ${quote}
    </td>
  </tr>`
}

function rewriteSection(grade) {
  if (typeof grade.rewrite !== 'string' || grade.rewrite.trim() === '') return ''
  return `<h3 style="font-size:16px;color:#1A1A1A;margin:24px 0 8px;">Rewritten prompt</h3>
    <pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace;font-size:13px;color:#333;background:#F9F9F9;border:1px solid #E5E5E5;border-radius:8px;padding:14px;margin:0;">${escapeHtml(grade.rewrite.trim())}</pre>
    <p style="font-size:12px;color:#888;margin:8px 0 0;">Anything in [BRACKETS] is a detail only you know. Fill it in before you run the prompt.</p>`
}

function revisionsSection(grade) {
  if (!Array.isArray(grade.revisions) || grade.revisions.length === 0) return ''
  const rows = grade.revisions
    .map(
      rev => `<div style="border:1px solid #E5E5E5;border-radius:8px;padding:12px;margin:0 0 10px;">
        <p style="margin:0 0 6px;font-weight:600;color:#1A1A1A;font-size:14px;">${escapeHtml(rev.issue || '')}</p>
        <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;color:#999;">Before</p>
        <pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#9A3412;background:#FEF2F2;border:1px solid #FECACA;border-radius:6px;padding:8px;margin:0 0 8px;">${escapeHtml(rev.before_excerpt || '')}</pre>
        <p style="margin:0 0 2px;font-size:11px;text-transform:uppercase;letter-spacing:0.04em;color:#999;">After</p>
        <pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#166534;background:#F0FDF4;border:1px solid #BBF7D0;border-radius:6px;padding:8px;margin:0;">${escapeHtml(rev.after_excerpt || '')}</pre>
      </div>`
    )
    .join('')
  return `<h3 style="font-size:16px;color:#1A1A1A;margin:24px 0 8px;">Suggested edits</h3>${rows}`
}

function failureModesSection(grade) {
  if (!Array.isArray(grade.failureModes) || grade.failureModes.length === 0) return ''
  const items = grade.failureModes
    .map(m => `<li style="margin:0 0 4px;">${escapeHtml(m)}</li>`)
    .join('')
  return `<h3 style="font-size:16px;color:#1A1A1A;margin:24px 0 8px;">How this prompt goes wrong</h3>
    <ul style="font-size:13px;color:#444;line-height:1.5;padding-left:18px;margin:0;">${items}</ul>`
}

// Build the report email. Returns { subject, html, source }.
export function renderGradeReportEmail(record, { shareUrl = null } = {}) {
  if (!record || !record.grade) {
    throw new Error('renderGradeReportEmail requires a record with a grade')
  }
  const grade = record.grade
  const editsMode = isEditsRecord(record)
  const pct = overallPct(grade)
  const verdict = verdictFor(pct, { editsMode })
  const scoreLabel = typeof pct === 'number' ? `${pct}/100` : 'not scored'
  const maxScore = grade.scale?.max ?? 4

  const subject =
    typeof pct === 'number'
      ? `Your prompt scored ${pct} out of 100: ${verdict}`
      : `Your prompt grade report`

  const summary = grade.summary ? `<p style="font-size:14px;color:#444;line-height:1.55;margin:0 0 4px;">${escapeHtml(grade.summary)}</p>` : ''

  const criteria = Array.isArray(grade.criteria) ? grade.criteria : []
  const breakdown = criteria.length
    ? `<h3 style="font-size:16px;color:#1A1A1A;margin:24px 0 8px;">Score breakdown</h3>
       <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
         ${criteria.map(c => criterionBlock(c, maxScore)).join('')}
       </table>`
    : ''

  const improvement = editsMode ? revisionsSection(grade) : rewriteSection(grade)

  const shareLink = shareUrl
    ? `<li style="margin:0 0 4px;"><a href="${escapeHtml(shareUrl)}" style="color:#1A1A1A;">Your public result page</a></li>`
    : ''

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#1A1A1A;">
  <p style="font-size:13px;color:#888;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">Your prompt grade</p>
  <h1 style="font-size:40px;margin:0;line-height:1;">${escapeHtml(scoreLabel)}</h1>
  <p style="font-size:16px;font-weight:600;color:#1A1A1A;margin:6px 0 16px;">${escapeHtml(verdict)}</p>
  ${summary}
  ${failureModesSection(grade)}
  ${breakdown}
  ${improvement}
  <hr style="border:none;border-top:1px solid #E5E5E5;margin:28px 0 16px;">
  <p style="font-size:13px;color:#444;margin:0 0 6px;">Grade another prompt any time:</p>
  <ul style="font-size:13px;color:#444;line-height:1.6;padding-left:18px;margin:0;">
    <li style="margin:0 0 4px;"><a href="${SITE_URL}/prompt-grader" style="color:#1A1A1A;">Prompt Grader</a> for chat prompts</li>
    <li style="margin:0 0 4px;"><a href="${SITE_URL}/agent-prompt-grader" style="color:#1A1A1A;">Agent Prompt Grader</a> for CLAUDE.md and system prompts</li>
    ${shareLink}
  </ul>
  <p style="margin-top:24px;font-size:12px;color:#999;">
    You are getting this because you asked for your grade report at
    <a href="${SITE_URL}" style="color:#777;">promptwritingstudio.com</a> and joined the list.
    Reply to unsubscribe.
  </p>
</body>
</html>`

  return { subject, html, source: reportEmailSource(record) }
}
