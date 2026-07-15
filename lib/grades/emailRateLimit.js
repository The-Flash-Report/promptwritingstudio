// Per-IP daily cap on grade-report emails. In-memory and best-effort in
// serverless (a cold start resets it), same shape as lib/studio/rateLimit.
//
// The report email renders an already-persisted, already-paid-for grade record
// and never calls the AI gateway, so this is anti-spam on the Resend send (and
// on segment writes), not a spend cap. A determined abuser can exceed it across
// cold starts; the ceiling that matters (AI cost) is untouched.

import { createHash } from 'crypto'

const store = new Map()

export const REPORT_EMAILS_DAILY_MAX = 5
export const REPORT_EMAILS_WINDOW_MS = 24 * 60 * 60 * 1000

function getIp(req) {
  // Prefer Netlify's real-connection header over x-forwarded-for, whose first
  // entry a client can spoof to reset the meter.
  const nf = req.headers['x-nf-client-connection-ip']
  if (nf) return nf
  const fwd = req.headers['x-forwarded-for']
  if (fwd) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

function hashIp(ip) {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16)
}

export function checkReportEmailRateLimit(
  req,
  { max = REPORT_EMAILS_DAILY_MAX, windowMs = REPORT_EMAILS_WINDOW_MS } = {}
) {
  const key = hashIp(getIp(req))
  const now = Date.now()
  const windowStart = now - windowMs

  const prev = store.get(key) || []
  const recent = prev.filter(t => t > windowStart)

  if (recent.length >= max) {
    return { allowed: false, remaining: 0, retryAfterSec: Math.ceil(windowMs / 1000) }
  }

  recent.push(now)
  store.set(key, recent)

  if (store.size > 10000) {
    for (const [k, times] of store.entries()) {
      if (!times.some(t => t > windowStart)) store.delete(k)
    }
  }

  return { allowed: true, remaining: max - recent.length, retryAfterSec: 0 }
}

export function _resetReportEmailStoreForTesting() {
  store.clear()
}
