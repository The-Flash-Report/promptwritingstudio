// Feature gating for the studio (Phase 4).
//
// Free  = templates + single-model run.
// Paid  = multi-model compare + critique + saved library.
//
// There is no auth in the repo yet, so a caller's tier comes from a SIGNED
// entitlement token (HMAC-SHA256) in the `x-studio-entitlement` header. This is
// honest "best-effort" gating: enforcement is real for anyone holding a valid
// token, and issuing tokens is an auth concern deferred to a later phase. With
// no token (or no STUDIO_ENTITLEMENT_SECRET configured) the caller is `free`.

import { createHmac, timingSafeEqual } from 'crypto'

export class EntitlementError extends Error {
  constructor(feature) {
    super(`"${feature}" requires the paid plan.`)
    this.name = 'EntitlementError'
    this.status = 402 // Payment Required
    this.code = 'upgrade_required'
    this.feature = feature
  }
}

const TIER_ORDER = { free: 0, paid: 1 }

// Minimum tier per feature. Add features here, not in endpoint code.
//
// `critique` moved paid → free (2026-07-01): the grader is the wedge feature,
// so keyless callers get it free but METERED (3/day/IP — see
// lib/studio/rateLimit). Paid = `critique.unlimited`, which skips the meter.
export const FEATURES = {
  templates: 'free',
  'run.single': 'free',
  critique: 'free',
  'compare.multi': 'paid',
  'critique.unlimited': 'paid',
  'library.saved': 'paid',
}

function b64url(buf) {
  return Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

// Mint a token (for tests / a future billing webhook). payload e.g. { tier: 'paid', exp }.
export function signEntitlement(payload, secret) {
  const body = b64url(JSON.stringify(payload))
  const sig = b64url(createHmac('sha256', secret).update(body).digest())
  return `${body}.${sig}`
}

export function verifyEntitlement(token, secret) {
  if (!token || !secret) return null
  const [body, sig] = String(token).split('.')
  if (!body || !sig) return null
  const expected = b64url(createHmac('sha256', secret).update(body).digest())
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  let payload
  try {
    payload = JSON.parse(Buffer.from(body.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'))
  } catch {
    return null
  }
  if (payload.exp && Date.now() / 1000 > payload.exp) return null
  return payload
}

// Resolve the caller's tier from the request. Defaults to 'free'.
export function getTier(req, { secret = process.env.STUDIO_ENTITLEMENT_SECRET } = {}) {
  const token = req?.headers?.['x-studio-entitlement']
  const payload = verifyEntitlement(token, secret)
  return payload && payload.tier === 'paid' ? 'paid' : 'free'
}

export function isFeatureAllowed(feature, tier) {
  const required = FEATURES[feature]
  if (required == null) return false // unknown feature → deny by default
  return TIER_ORDER[tier] >= TIER_ORDER[required]
}

// Throw EntitlementError (402) when the tier can't use the feature.
export function assertFeature(feature, tier) {
  if (!isFeatureAllowed(feature, tier)) throw new EntitlementError(feature)
}

// A client-facing map of which features the tier can use (for UX gating).
export function featureMapForTier(tier) {
  return Object.fromEntries(Object.keys(FEATURES).map(f => [f, isFeatureAllowed(f, tier)]))
}
