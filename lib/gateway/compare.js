// Phase 1 — multi-model compare.
//
// Fan the SAME gateway.complete() call out across N models in parallel so the
// UI can show output + tokens + estimated cost + latency side by side. This
// adds no model-specific logic and does not change the gateway: it's pure
// orchestration on top of the single interface.
//
// Concurrency is bounded (mirrors the observatory's per-provider semaphore so a
// wide fan-out can't hammer the provider) and transient failures get a couple
// of backoff retries. One model failing never sinks the batch — its slot comes
// back as { ok: false, ... } alongside the successes.

import { complete } from './index'
import { GatewayError } from './errors'

const DEFAULT_CONCURRENCY = 4
const DEFAULT_RETRIES = 2
const RETRYABLE_CODES = new Set(['rate_limited', 'upstream_error'])

const defaultSleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// Run `fn` over `items` with at most `limit` in flight, preserving input order.
async function mapWithConcurrency(items, limit, fn) {
  const results = new Array(items.length)
  let next = 0
  async function worker() {
    while (next < items.length) {
      const i = next++
      results[i] = await fn(items[i], i)
    }
  }
  const workers = Array.from({ length: Math.min(limit, items.length) }, worker)
  await Promise.all(workers)
  return results
}

async function completeWithRetry(args, { retries, baseDelayMs, sleepImpl }) {
  let attempt = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await complete(args)
    } catch (err) {
      const code = err instanceof GatewayError ? err.code : null
      if (!RETRYABLE_CODES.has(code) || attempt >= retries) throw err
      // Exponential backoff: 1x, 2x, 4x ... of base delay.
      await sleepImpl(baseDelayMs * 2 ** attempt)
      attempt++
    }
  }
}

export async function compareModels({
  prompt,
  models = [],
  params = {},
  userKey = null,
  concurrency = DEFAULT_CONCURRENCY,
  retries = DEFAULT_RETRIES,
  baseDelayMs = 500,
  // Injectable for tests; production callers pass none of these.
  studioFreeKey = process.env.OPENROUTER_FREE_KEY || null,
  fetchImpl,
  sleepImpl = defaultSleep,
  signal,
} = {}) {
  if (!Array.isArray(models) || models.length === 0) {
    throw new GatewayError('At least one model is required.', { status: 400, code: 'bad_request' })
  }
  // De-dupe while preserving order — comparing a model against itself is noise.
  const uniqueModels = [...new Set(models)]

  const results = await mapWithConcurrency(uniqueModels, concurrency, async model => {
    try {
      const result = await completeWithRetry(
        { prompt, model, params, userKey, studioFreeKey, fetchImpl, signal },
        { retries, baseDelayMs, sleepImpl }
      )
      return { ok: true, ...result }
    } catch (err) {
      const code = err instanceof GatewayError ? err.code : 'internal_error'
      // Surface a typed, key-safe message — never the raw error.
      const message = err instanceof GatewayError ? err.message : 'Internal error running this model.'
      return { ok: false, model, error: message, code }
    }
  })

  const succeeded = results.filter(r => r.ok)
  const totals = {
    models: results.length,
    succeeded: succeeded.length,
    failed: results.length - succeeded.length,
    // Sum of estimated costs (free-tier nulls count as 0).
    costUsd: succeeded.reduce((sum, r) => sum + (r.costUsd || 0), 0),
    // Wall-clock is bounded by the slowest model, not the sum (they run parallel).
    maxLatencyMs: succeeded.reduce((max, r) => Math.max(max, r.latencyMs || 0), 0),
  }

  return { prompt, results, totals }
}
