// Phase 3 — critique (the differentiator).
//
// Runs the user's prompt through an LLM-as-judge against a rubric and returns
// grounded per-criterion scores + justifications + evidence spans, plus a
// weighted overall. The judge call goes through the SAME gateway as everything
// else, so BYOK, the free tier, cost estimation, and key safety all apply
// unchanged — the user's key is never stored, logged, or returned.

import { complete } from '../gateway'
import { getRubric } from '../../data/critique-rubrics'
import { renderJudgePrompt, parseJudgeResponse, computeOverall } from './judge'
import { UnknownRubricError, MalformedCritiqueError } from './errors'

// A strong, cheap-enough default judge; override per call. Must be a model id
// in the gateway registry.
export const DEFAULT_JUDGE_MODEL = 'claude-opus-4-7'

export async function critiquePrompt({
  targetPrompt,
  rubricId,
  judgeModel = DEFAULT_JUDGE_MODEL,
  userKey = null,
  // Injectable for tests; production callers pass none of these.
  studioFreeKey,
  fetchImpl,
  signal,
} = {}) {
  if (!targetPrompt || typeof targetPrompt !== 'string') {
    throw new MalformedCritiqueError('A non-empty `targetPrompt` string is required.')
  }
  const rubric = getRubric(rubricId)
  if (!rubric) throw new UnknownRubricError(rubricId)

  const judgePrompt = renderJudgePrompt(targetPrompt, rubric)

  // Deterministic judging: temperature 0.
  const judged = await complete({
    prompt: judgePrompt,
    model: judgeModel,
    params: { temperature: 0, maxTokens: 1024 },
    userKey,
    studioFreeKey,
    fetchImpl,
    signal,
  })

  const criteria = parseJudgeResponse(judged.output, rubric, targetPrompt)
  const overall = computeOverall(criteria, rubric)

  return {
    rubricId: rubric.id,
    rubricVersion: rubric.version,
    scale: { min: rubric.scale.min, max: rubric.scale.max },
    criteria,
    overall,
    summary: extractSummary(judged.output),
    judge: {
      model: judged.model,
      tokensIn: judged.tokensIn,
      tokensOut: judged.tokensOut,
      costUsd: judged.costUsd,
      latencyMs: judged.latencyMs,
      fundedBy: judged.fundedBy,
    },
  }
}

function extractSummary(rawOutput) {
  try {
    const m = String(rawOutput).match(/^\s*```(?:json)?\s*\n([\s\S]*?)\n```\s*$/)
    const obj = JSON.parse((m ? m[1] : rawOutput).trim())
    return typeof obj.summary === 'string' ? obj.summary : ''
  } catch {
    return ''
  }
}

export { getRubric, listRubrics } from '../../data/critique-rubrics'
