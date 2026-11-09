// Slim ESM Resend REST + PostHog attribution helper for Next.js API routes
// (the grade-report email).
//
// This is a deliberate, minimal duplicate of the send + add-contact +
// set-if-empty attribution logic in netlify/functions/submission-created.js.
// That function is CommonJS and runs on the Netlify Forms webhook runtime;
// reusing it here would couple two runtimes, so the shared lines are
// duplicated on purpose rather than refactored. Both paths read the same
// RESEND_* and POSTHOG_* env vars, so a key rotation moves them together.

import { createHash } from 'crypto'

const RESEND_API = 'https://api.resend.com'
const POSTHOG_ENDPOINT = 'https://eu.i.posthog.com/i/v0/e/'
// Public PostHog EU project token (same client-side key shipped across all sites).
const POSTHOG_PUBLIC_TOKEN =
  process.env.POSTHOG_API_KEY ||
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  'phc_pBxJ3BtqHYzDS52caeqcRBzEmSd697fSc6BwCfnrLTXR' // gitleaks:allow
const SITE = 'promptwritingstudio'
const HOST = 'promptwritingstudio.com'
const SOURCE_MAX_LENGTH = 120

export function sanitizeSlug(val, fallback = 'grade-report-email') {
  const raw = String(val || '')
    .trim()
    .toLowerCase()
    .replace(/^promptwritingstudio@/, '')
  const clean = raw
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return clean || fallback
}

export function sanitizePage(pageInput, fallbackUrl) {
  const raw = String(pageInput || '').trim()
  if (raw.startsWith('/')) {
    return raw.split('?')[0].split('#')[0].slice(0, SOURCE_MAX_LENGTH)
  }
  for (const candidate of [raw, fallbackUrl]) {
    if (!candidate) continue
    try {
      const parsed = new URL(String(candidate))
      if (parsed.pathname) {
        return parsed.pathname.slice(0, SOURCE_MAX_LENGTH)
      }
    } catch {
      // ignore invalid URL
    }
  }
  return ''
}

export function sanitizeUtm(val) {
  const v = String(val || '').trim().toLowerCase()
  return /^[a-z0-9._~+:-]{1,60}$/.test(v) ? v : ''
}

export function sanitizeReferrer(val) {
  const v = String(val || '').trim().toLowerCase()
  if (!v) return ''
  if (/^[a-z0-9.-]{1,80}$/.test(v) && !v.includes('/')) {
    return v
  }
  try {
    const host = new URL(v).hostname.toLowerCase()
    return /^[a-z0-9.-]{1,80}$/.test(host) ? host : ''
  } catch {
    return ''
  }
}

export function buildAttribution(body = {}, headers = {}, defaultSlug = 'grade-report-email') {
  const slug = sanitizeSlug(body.form_id || defaultSlug, defaultSlug)
  const source_surface = `${SITE}@${slug}`
  const fallbackReferer = headers.referer || headers.Referer || ''
  const signup_page = sanitizePage(body.signup_page, fallbackReferer)
  const signup_utm_source = sanitizeUtm(body.signup_utm_source || body.utm_source)
  const signup_utm_medium = sanitizeUtm(body.signup_utm_medium || body.utm_medium)
  const signup_utm_campaign = sanitizeUtm(body.signup_utm_campaign || body.utm_campaign)
  const signup_referrer = sanitizeReferrer(body.signup_referrer)

  return {
    source_surface,
    signup_page,
    signup_utm_source,
    signup_utm_medium,
    signup_utm_campaign,
    signup_referrer,
  }
}

function isEmptyProp(val) {
  return val === null || val === undefined || val === '' || val === 'unknown'
}

export async function getExistingContact({ apiKey, segmentId, email }) {
  if (!segmentId || !apiKey || !email) {
    return { exists: false, properties: {} }
  }
  try {
    const resp = await fetch(
      `${RESEND_API}/audiences/${segmentId}/contacts/${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )
    if (resp.status === 200) {
      const body = await resp.json().catch(() => ({}))
      const contact = body && body.data ? body.data : body || {}
      return {
        exists: true,
        properties:
          contact && typeof contact.properties === 'object' && contact.properties
            ? contact.properties
            : {},
      }
    }
    return { exists: false, properties: {} }
  } catch (err) {
    console.warn('resend get-contact failed (non-fatal):', err?.message)
    return { exists: false, properties: {} }
  }
}

export async function patchContactAttribution({
  apiKey,
  email,
  existingProperties = {},
  attribution = {},
}) {
  if (!apiKey || !email) return { patched: false, properties: {} }

  const toPatch = {}
  const keys = [
    'source_surface',
    'signup_page',
    'signup_utm_source',
    'signup_utm_medium',
    'signup_utm_campaign',
    'signup_referrer',
  ]

  for (const key of keys) {
    const val = attribution[key]
    if (val && isEmptyProp(existingProperties[key])) {
      toPatch[key] = val
    }
  }

  if (Object.keys(toPatch).length === 0) {
    return { patched: false, properties: {} }
  }

  try {
    const resp = await fetch(`${RESEND_API}/contacts/${encodeURIComponent(email)}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: toPatch }),
    })
    if (!resp.ok) {
      const body = await resp.text().catch(() => '')
      console.warn(`resend patch-contact ${resp.status}: ${body.slice(0, 200)}`)
      return { patched: false, properties: toPatch }
    }
    return { patched: true, properties: toPatch }
  } catch (err) {
    console.warn('resend patch-contact failed (non-fatal):', err?.message)
    return { patched: false, properties: toPatch }
  }
}

// Add a subscriber to the Resend audience/segment and apply set-if-empty
// attribution properties. Idempotent: an already-present contact returns
// non-2xx on POST, which we treat as a soft success (re-subscribe), matching
// the Netlify Forms path.
export async function addContactToSegment({
  apiKey,
  segmentId,
  email,
  attribution = null,
}) {
  if (!segmentId) return { added: false, exists: false, reason: 'no_segment' }

  const { exists, properties: existingProperties } = await getExistingContact({
    apiKey,
    segmentId,
    email,
  })

  const resp = await fetch(`${RESEND_API}/audiences/${segmentId}/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, unsubscribed: false }),
  })

  let added = true
  let reason = null
  if (!resp.ok) {
    const body = await resp.text().catch(() => '')
    console.warn(`resend add-contact ${resp.status}: ${body.slice(0, 200)}`)
    added = resp.status === 409 || body.toLowerCase().includes('already exists')
    reason = `status_${resp.status}`
  }

  if (attribution && (added || exists)) {
    await patchContactAttribution({
      apiKey,
      email,
      existingProperties,
      attribution,
    })
  }

  return reason ? { added, exists, reason } : { added, exists }
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

function hashEmailDistinctId(email) {
  if (!email) return `pws_anon_${Date.now()}`
  const hash = createHash('sha256')
    .update(String(email).trim().toLowerCase())
    .digest('hex')
    .slice(0, 32)
  return `pws_${hash}`
}

export async function capturePostHogEvent({
  event,
  email,
  attribution = {},
  extraProperties = {},
}) {
  try {
    const form_id = attribution.source_surface || `${SITE}@grade-report-email`
    const signup_page = attribution.signup_page || ''
    const labelled = Boolean(form_id && signup_page)
    await fetch(POSTHOG_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_PUBLIC_TOKEN,
        event,
        distinct_id: hashEmailDistinctId(email),
        properties: {
          $host: HOST,
          $process_person_profile: false,
          site: SITE,
          form_id,
          source_surface: form_id,
          signup_page,
          utm_source: attribution.signup_utm_source || '',
          utm_medium: attribution.signup_utm_medium || '',
          utm_campaign: attribution.signup_utm_campaign || '',
          signup_referrer: attribution.signup_referrer || '',
          labelled,
          ...extraProperties,
        },
      }),
    })
  } catch (err) {
    console.warn(`PostHog ${event} failed (non-fatal):`, err?.message)
  }
}
