// pages/api/studio/compare.js
// Phase-1: run ONE prompt against N models in parallel for side-by-side compare.
//
// Same key handling as the single-run endpoint: the BYOK key arrives in the
// x-user-api-key header, is used in-memory only, and is never stored, logged,
// returned, or traced. A BYOK fan-out incurs zero studio-funded spend.
//
// Free-tier metering counts each model in the batch against the per-IP/hour cap,
// since each model is its own studio-funded call.

import { compareModels } from '../../../lib/gateway'
import { GatewayError } from '../../../lib/gateway/errors'
import { checkRateLimit } from '../../../lib/observatory/rateLimit'

const FREE_TIER_MAX_PER_HOUR = 20
const MAX_MODELS_PER_REQUEST = 8

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userKey = req.headers['x-user-api-key'] || null
  const { prompt, models, params } = req.body || {}

  if (!Array.isArray(models) || models.length === 0) {
    return res.status(400).json({ error: 'Provide a non-empty `models` array.', code: 'bad_request' })
  }
  if (models.length > MAX_MODELS_PER_REQUEST) {
    return res.status(400).json({
      error: `Compare at most ${MAX_MODELS_PER_REQUEST} models per request.`,
      code: 'too_many_models',
    })
  }

  // Meter only the studio-funded free path: one token per model in the fan-out.
  if (!userKey) {
    let allowed = true
    for (let i = 0; i < models.length; i++) {
      if (!checkRateLimit(req, { max: FREE_TIER_MAX_PER_HOUR }).allowed) {
        allowed = false
        break
      }
    }
    if (!allowed) {
      return res.status(429).json({
        error: 'Free-tier limit reached for this hour. Add your own API key to keep going.',
        code: 'rate_limited',
      })
    }
  }

  try {
    const result = await compareModels({ prompt, models, params, userKey })
    return res.status(200).json(result)
  } catch (err) {
    if (err instanceof GatewayError) {
      return res.status(err.status).json({ error: err.message, code: err.code })
    }
    console.error('Studio compare failed:', err?.name || 'UnknownError')
    return res.status(500).json({ error: 'Internal error running the comparison.' })
  }
}
