// Slim ESM Resend REST helper for Next.js API routes (the grade-report email).
//
// This is a deliberate, minimal duplicate of the send + add-contact logic in
// netlify/functions/submission-created.js. That function is CommonJS and runs
// on the Netlify Forms webhook runtime; reusing it here would couple two
// runtimes, so the ~15 shared lines are duplicated on purpose rather than
// refactored. Both paths read the same RESEND_* env vars, so a key rotation
// moves them together (single source, acceptable coupling).

const RESEND_API = 'https://api.resend.com'

// Add a subscriber to the Resend audience/segment. Idempotent: an
// already-present contact returns non-2xx, which we treat as a soft success
// (re-subscribe), matching the Netlify Forms path.
export async function addContactToSegment({ apiKey, segmentId, email }) {
  if (!segmentId) return { added: false, reason: 'no_segment' }
  const resp = await fetch(`${RESEND_API}/audiences/${segmentId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  })
  if (!resp.ok) {
    const body = await resp.text().catch(() => '')
    console.warn(`resend add-contact ${resp.status}: ${body.slice(0, 200)}`)
    return { added: false, reason: `status_${resp.status}` }
  }
  return { added: true }
}

// Send a transactional email. Throws on a hard send failure so the caller can
// return a 5xx and the user can retry.
export async function sendEmail({ apiKey, from, to, subject, html, tags = [] }) {
  const resp = await fetch(`${RESEND_API}/emails`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html, tags }),
  })
  if (!resp.ok) {
    const body = await resp.text().catch(() => '')
    throw new Error(`Resend ${resp.status}: ${body.slice(0, 200)}`)
  }
  return resp.json()
}
