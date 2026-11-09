// Client-side signup attribution + cookie-free PostHog form funnel beacons.
// Matches the R268 portfolio contract:
//   - site: "promptwritingstudio"
//   - $host: "promptwritingstudio.com"
//   - $process_person_profile: false
//   - events: "Form Viewed", "Form Started", "Form Submitted"

const SITE = 'promptwritingstudio'
const HOST = 'promptwritingstudio.com'
const POSTHOG_ENDPOINT = 'https://eu.i.posthog.com/i/v0/e/'
const POSTHOG_PUBLIC_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  'phc_pBxJ3BtqHYzDS52caeqcRBzEmSd697fSc6BwCfnrLTXR' // gitleaks:allow

let pageDistinctId = null

export function getPageDistinctId() {
  if (pageDistinctId) return pageDistinctId
  const rand =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  pageDistinctId = `pws_${rand.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 32)}`
  return pageDistinctId
}

export function formatFormId(slug) {
  const raw = String(slug || 'newsletter').trim().toLowerCase()
  if (raw.startsWith(`${SITE}@`)) return raw
  const clean =
    raw
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'newsletter'
  return `${SITE}@${clean}`
}

export function readClientAttribution(slug) {
  const form_id = formatFormId(slug)
  if (typeof window === 'undefined') {
    return {
      form_id,
      signup_page: '',
      signup_utm_source: '',
      signup_utm_medium: '',
      signup_utm_campaign: '',
      signup_referrer: '',
    }
  }

  const signup_page = (window.location?.pathname || '').slice(0, 120)
  const params = new URLSearchParams(window.location?.search || '')
  const cleanUtm = (val) => {
    const v = String(val || '').trim().toLowerCase()
    return /^[a-z0-9._~+:-]{1,60}$/.test(v) ? v : ''
  }

  let signup_referrer = ''
  if (typeof document !== 'undefined' && document.referrer) {
    try {
      const host = new URL(document.referrer).hostname.toLowerCase()
      if (/^[a-z0-9.-]{1,80}$/.test(host)) {
        signup_referrer = host
      }
    } catch {
      signup_referrer = ''
    }
  }

  return {
    form_id,
    signup_page,
    signup_utm_source: cleanUtm(params.get('utm_source')),
    signup_utm_medium: cleanUtm(params.get('utm_medium')),
    signup_utm_campaign: cleanUtm(params.get('utm_campaign')),
    signup_referrer,
  }
}

function isAllowedClientHost() {
  if (typeof window === 'undefined' || !window.location) return false
  const h = window.location.hostname
  return h === HOST || h === `www.${HOST}`
}

export function emitFormEvent(event, slug) {
  if (!isAllowedClientHost()) return
  const attr = readClientAttribution(slug)
  const payload = JSON.stringify({
    api_key: POSTHOG_PUBLIC_TOKEN,
    event,
    distinct_id: getPageDistinctId(),
    properties: {
      $host: HOST,
      $process_person_profile: false,
      site: SITE,
      form_id: attr.form_id,
      signup_page: attr.signup_page,
      utm_source: attr.signup_utm_source,
      utm_medium: attr.signup_utm_medium,
      utm_campaign: attr.signup_utm_campaign,
      signup_referrer: attr.signup_referrer,
    },
  })

  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([payload], { type: 'application/json' })
      if (navigator.sendBeacon(POSTHOG_ENDPOINT, blob)) return
    }
  } catch {
    // Fall back to fetch below.
  }

  try {
    if (typeof fetch === 'function') {
      fetch(POSTHOG_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // Non-fatal.
  }
}
