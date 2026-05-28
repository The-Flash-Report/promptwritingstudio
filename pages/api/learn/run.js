// pages/api/learn/run.js
// Server-side Claude call for the /learn try-it panels.
// Haiku model, capped output tokens, per-IP daily rate limit, spend telemetry.

import Anthropic from '@anthropic-ai/sdk'
import { checkLearnRateLimit, LEARN_DAILY_MAX } from '../../../lib/learn/rateLimit'
import { recordSpend } from '../../../lib/learn/budget'
import { getModuleBySlug } from '../../../data/learn/modules'

const MAX_OUTPUT_TOKENS = 500
const MAX_PROMPT_CHARS = 8000
const MODEL = 'claude-haiku-4-5'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, moduleSlug } = req.body || {}

  if (typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'prompt is required' })
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    return res.status(400).json({ error: `prompt exceeds ${MAX_PROMPT_CHARS} characters` })
  }
  if (moduleSlug && !getModuleBySlug(moduleSlug)) {
    return res.status(400).json({ error: 'unknown moduleSlug' })
  }

  const { allowed, remaining, retryAfterSec } = checkLearnRateLimit(req)
  if (!allowed) {
    res.setHeader('Retry-After', String(retryAfterSec))
    return res.status(429).json({
      error: `Daily limit of ${LEARN_DAILY_MAX} runs reached. Try again tomorrow.`,
      limit: LEARN_DAILY_MAX,
      remaining: 0,
    })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is not configured for AI runs.' })
  }

  try {
    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      messages: [{ role: 'user', content: prompt }],
    })

    const output = (message.content || [])
      .filter(block => block.type === 'text')
      .map(block => block.text)
      .join('\n')
      .trim()

    const inputTokens = message.usage?.input_tokens || 0
    const outputTokens = message.usage?.output_tokens || 0
    const { spentUsdToday, callUsd } = recordSpend({ inputTokens, outputTokens })

    return res.status(200).json({
      output,
      stopReason: message.stop_reason || null,
      model: MODEL,
      moduleSlug: moduleSlug || null,
      remaining,
      limit: LEARN_DAILY_MAX,
      usage: {
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        call_usd: Number(callUsd.toFixed(6)),
        spent_usd_today: Number(spentUsdToday.toFixed(6)),
      },
    })
  } catch (err) {
    const status = typeof err?.status === 'number' ? err.status : 500
    const message =
      status === 429
        ? 'Upstream model is rate-limited. Try again in a few seconds.'
        : 'Run failed. Try a shorter prompt or try again in a moment.'
    if (process.env.NODE_ENV !== 'production') {
      console.error('[learn/run] error', err)
    }
    return res.status(status === 429 ? 429 : 500).json({ error: message })
  }
}
