// Per-IP daily meter for studio-funded grades (the free tier of the Prompt
// Grader). Same shape as lib/learn/rateLimit — in-memory, best-effort in
// serverless (a cold start resets it; acceptable for a free-tier cap, the
// spend telemetry in lib/studio/budget is the alarm for abuse).

import { createHash } from 'crypto'

const store = new Map()

export const GRADES_DAILY_MAX = 3
export const GRADES_WINDOW_MS = 24 * 60 * 60 * 1000

function getIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers['x-nf-client-connection-ip'] || req.socket?.remoteAddress || 'unknown'
}

function hashIp(ip) {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16)
}

export function checkGradeRateLimit(req, { max = GRADES_DAILY_MAX, windowMs = GRADES_WINDOW_MS } = {}) {
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

export function _resetGradeStoreForTesting() {
  store.clear()
}
