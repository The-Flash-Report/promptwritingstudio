// pages/api/studio/run.js
// Phase-0 vertical slice: run ONE prompt against ONE model through the gateway.
//
// BYOK key handling is client-only: the user's key arrives in the
// `x-user-api-key` header (kept out of the JSON body so it never lands in body
// logs), is handed straight to the gateway for a single in-memory call, and is
// never stored, never returned, and never logged. We deliberately do not echo
// the request body on error.
//
// Phase-1 (multi-model compare) will add a sibling endpoint that fans this same
// gateway.complete() call out across N models — no change to the gateway.

import { gateway } from '../../../lib/gateway'
import { GatewayError } from '../../../lib/gateway/errors'
import { fillTemplate, TemplateError } from '../../../lib/templates'
import { checkRateLimit } from '../../../lib/observatory/rateLimit'

// Free-tier abuse cap (per IP/hour) for unauthenticated, studio-funded runs.
const FREE_TIER_MAX_PER_HOUR = 20

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userKey = req.headers['x-user-api-key'] || null
  const { prompt, model, params, templateId, inputs } = req.body || {}

  // A request supplies either a raw `prompt` or a `templateId` + `inputs` to
  // fill the template's slots. Resolve the template first so a missing-slot
  // error short-circuits before any provider call.
  let resolvedPrompt = prompt
  let template = null
  if (templateId) {
    try {
      const filled = fillTemplate(templateId, inputs || {})
      resolvedPrompt = filled.prompt
      template = { id: filled.templateId, version: filled.version }
    } catch (err) {
      if (err instanceof TemplateError) {
        return res.status(err.status).json({ error: err.message, code: err.code })
      }
      throw err
    }
  }

  // Only meter the studio-funded free path. BYOK runs cost the studio nothing,
  // so the user's own key (and the provider's own limits) governs them.
  if (!userKey) {
    const { allowed } = checkRateLimit(req, { max: FREE_TIER_MAX_PER_HOUR })
    if (!allowed) {
      return res.status(429).json({
        error: 'Free-tier limit reached for this hour. Add your own API key to keep going.',
        code: 'rate_limited',
      })
    }
  }

  try {
    const result = await gateway.complete({ prompt: resolvedPrompt, model, params, userKey })
    return res.status(200).json(template ? { ...result, template } : result)
  } catch (err) {
    if (err instanceof GatewayError) {
      return res.status(err.status).json({ error: err.message, code: err.code })
    }
    // Never surface internal details (or anything derived from the key).
    console.error('Studio run failed:', err?.name || 'UnknownError')
    return res.status(500).json({ error: 'Internal error running the prompt.' })
  }
}
