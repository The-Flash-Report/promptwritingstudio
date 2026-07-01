// pages/api/studio/critique.js
// The Prompt Grader endpoint: critique a user's prompt via LLM-as-judge.
//   POST { targetPrompt, target?, rubricId? }  (+ optional x-user-api-key header)
//   GET  → list available rubrics
//
// Funding + metering policy (see DECISIONS.md D2/D3):
//   BYOK (x-user-api-key)      → unmetered, user pays their provider.
//   Paid (x-studio-entitlement) → unmetered, studio-funded (Anthropic direct).
//   Keyless free               → studio-funded, 3 grades/day per IP.
//
// Same client-only BYOK handling as the other studio endpoints: the key arrives
// in the x-user-api-key header, is used in-memory for the judge call only, and
// is never stored, logged, returned, or traced.

import { critiquePrompt, listRubrics, DEFAULT_JUDGE_MODEL, GRADER_JUDGE_MODEL } from '../../../lib/critique'
import { CritiqueError } from '../../../lib/critique/errors'
import { GatewayError } from '../../../lib/gateway/errors'
import { getModel } from '../../../lib/gateway/models'
import { getTier, isFeatureAllowed } from '../../../lib/studio/entitlements'
import { checkGradeRateLimit, GRADES_DAILY_MAX } from '../../../lib/studio/rateLimit'
import { recordGradeSpend } from '../../../lib/studio/budget'

const MAX_PROMPT_CHARS = 8000

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ rubrics: listRubrics() })
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const userKey = req.headers['x-user-api-key'] || null
  const { targetPrompt, target, rubricId } = req.body || {}

  if (typeof targetPrompt !== 'string' || targetPrompt.trim() === '') {
    return res.status(400).json({ error: 'targetPrompt is required', code: 'bad_request' })
  }
  if (targetPrompt.length > MAX_PROMPT_CHARS) {
    return res.status(400).json({
      error: `Prompt exceeds ${MAX_PROMPT_CHARS} characters.`,
      code: 'bad_request',
    })
  }

  const tier = getTier(req)
  const unlimited = Boolean(userKey) || isFeatureAllowed('critique.unlimited', tier)

  let meter = null
  if (!unlimited) {
    const { allowed, remaining, retryAfterSec } = checkGradeRateLimit(req)
    if (!allowed) {
      res.setHeader('Retry-After', String(retryAfterSec))
      return res.status(429).json({
        error: `You have used your ${GRADES_DAILY_MAX} free grades for today. Upgrade for unlimited grading, or come back tomorrow.`,
        code: 'rate_limited',
        meter: { remaining: 0, limit: GRADES_DAILY_MAX },
      })
    }
    meter = { remaining, limit: GRADES_DAILY_MAX }
  }

  // Keyless callers always run on the studio-funded grader judge. BYOK callers
  // may pick any registry model; an unknown id falls back to the default.
  const requestedModel = req.body?.judgeModel
  const judgeModel = userKey
    ? (requestedModel && getModel(requestedModel) ? requestedModel : DEFAULT_JUDGE_MODEL)
    : GRADER_JUDGE_MODEL

  try {
    const critique = await critiquePrompt({ targetPrompt, rubricId, target, judgeModel, userKey })
    if (critique.judge?.fundedBy === 'studio') {
      recordGradeSpend({
        inputTokens: critique.judge.tokensIn,
        outputTokens: critique.judge.tokensOut,
      })
    }
    return res.status(200).json({ ...critique, meter })
  } catch (err) {
    if (err instanceof CritiqueError || err instanceof GatewayError) {
      return res.status(err.status).json({ error: err.message, code: err.code })
    }
    console.error('Studio critique failed:', err?.name || 'UnknownError')
    return res.status(500).json({ error: 'Internal error critiquing the prompt.' })
  }
}
