import { createHash } from 'crypto'

const store = new Map()
const DEFAULT_MAX = 60
const DEFAULT_WINDOW_MS = 60 * 60 * 1000

function getIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers['x-nf-client-connection-ip'] || req.socket?.remoteAddress || 'unknown'
}

// Hash IP so we don't store raw addresses in memory
function hashIp(ip) {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16)
}

export function checkRateLimit(req, { max = DEFAULT_MAX, windowMs = DEFAULT_WINDOW_MS } = {}) {
  const key = hashIp(getIp(req))
  const now = Date.now()
  const windowStart = now - windowMs

  const prev = store.get(key) || []
  const recent = prev.filter(t => t > windowStart)

  if (recent.length >= max) {
    return { allowed: false, remaining: 0 }
  }

  recent.push(now)
  store.set(key, recent)

  // Prune stale keys when store grows large (best-effort in serverless)
  if (store.size > 10000) {
    for (const [k, times] of store.entries()) {
      if (!times.some(t => t > windowStart)) store.delete(k)
    }
  }

  return { allowed: true, remaining: max - recent.length }
}

// Only exported for tests — do not call in production code
export function _resetStoreForTesting() {
  store.clear()
}
