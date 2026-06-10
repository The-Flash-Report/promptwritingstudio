// pages/api/studio/critique.js
// Phase 3: critique a user's prompt via LLM-as-judge against a rubric.
//   POST { targetPrompt, rubricId?, judgeModel? }  (+ x-user-api-key header)
//   GET  → list available rubrics
//
// Same client-only BYOK handling as the other studio endpoints: the key arrives
// in the x-user-api-key header, is used in-memory for the judge call only, and
// is never stored, logged, returned, or traced.

import { critiquePrompt, listRubrics } from '../../../lib/critique'
import { CritiqueError } from '../../../lib/critique/errors'
import { GatewayError } from '../../../lib/gateway/errors'
import { checkRateLimit } from '../../../lib/observatory/rateLimit'

const FREE_TIER_MAX_PER_HOUR = 20

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ rubrics: listRubrics() })
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userKey = req.headers['x-user-api-key'] || null
  const { targetPrompt, rubricId, judgeModel } = req.body || {}

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
    const critique = await critiquePrompt({ targetPrompt, rubricId, judgeModel, userKey })
    return res.status(200).json(critique)
  } catch (err) {
    if (err instanceof CritiqueError || err instanceof GatewayError) {
      return res.status(err.status).json({ error: err.message, code: err.code })
    }
    console.error('Studio critique failed:', err?.name || 'UnknownError')
    return res.status(500).json({ error: 'Internal error critiquing the prompt.' })
  }
}
