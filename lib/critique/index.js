// Phase 3 — critique (the differentiator).
//
// Runs the user's prompt through an LLM-as-judge against a rubric and returns
// grounded per-criterion scores + justifications + evidence spans, plus a
// weighted overall. The judge call goes through the SAME gateway as everything
// else, so BYOK, the free tier, cost estimation, and key safety all apply
// unchanged — the user's key is never stored, logged, or returned.

import { complete } from '../gateway'
import { getRubric } from '../../data/critique-rubrics'
import {
  renderJudgePrompt,
  parseJudgeResponse,
  parseEnvelope,
  parseGraderExtras,
  computeOverall,
  DEFAULT_REWRITE_TARGET,
  REWRITE_TARGETS,
} from './judge'
import { UnknownRubricError, MalformedCritiqueError } from './errors'

// A strong, cheap-enough default judge; override per call. Must be a model id
// in the gateway registry.
export const DEFAULT_JUDGE_MODEL = 'claude-opus-4-7'

// The judge the grader endpoint uses for keyless (studio-funded) callers:
// Anthropic-direct Sonnet, funded by ANTHROPIC_API_KEY, metered upstream.
export const GRADER_JUDGE_MODEL = 'grader-sonnet'

// Rewrite + failure modes need more room than scores alone.
const JUDGE_MAX_TOKENS = 2000

export async function critiquePrompt({
  targetPrompt,
  rubricId,
  target = DEFAULT_REWRITE_TARGET,
  judgeModel = DEFAULT_JUDGE_MODEL,
  userKey = null,
  // Injectable for tests; production callers pass none of these.
  studioFreeKey,
  studioAnthropicKey,
  fetchImpl,
  signal,
} = {}) {
  if (!targetPrompt || typeof targetPrompt !== 'string') {
    throw new MalformedCritiqueError('A non-empty `targetPrompt` string is required.')
  }
  const rubric = getRubric(rubricId)
  if (!rubric) throw new UnknownRubricError(rubricId)
  if (!REWRITE_TARGETS[target]) {
    throw new MalformedCritiqueError(`Unknown rewrite target: ${target}`)
  }

  const judgePrompt = renderJudgePrompt(targetPrompt, rubric, { target })

  // Deterministic judging: temperature 0.
  const judged = await complete({
    prompt: judgePrompt,
    model: judgeModel,
    params: { temperature: 0, maxTokens: JUDGE_MAX_TOKENS },
    userKey,
    studioFreeKey,
    studioAnthropicKey,
    fetchImpl,
    signal,
  })

  const envelope = parseEnvelope(judged.output)
  const judgeMeta = {
    model: judged.model,
    tokensIn: judged.tokensIn,
    tokensOut: judged.tokensOut,
    costUsd: judged.costUsd,
    latencyMs: judged.latencyMs,
    fundedBy: judged.fundedBy,
  }

  const extras = parseGraderExtras(envelope, targetPrompt)
  if (extras.flagged) {
    // Deterministic safety path: no scores, no rewrite, an honest reason.
    return {
      flagged: true,
      safetyReason: extras.safetyReason,
      rubricId: rubric.id,
      rubricVersion: rubric.version,
      judge: judgeMeta,
    }
  }

  const criteria = parseJudgeResponse(envelope, rubric, targetPrompt)
  const overall = computeOverall(criteria, rubric)

  return {
    flagged: false,
    rubricId: rubric.id,
    rubricVersion: rubric.version,
    scale: { min: rubric.scale.min, max: rubric.scale.max },
    target,
    criteria,
    overall,
    failureModes: extras.failureModes,
    rewrite: extras.rewrite,
    summary: typeof envelope.summary === 'string' ? envelope.summary : '',
    judge: judgeMeta,
  }
}

export { getRubric, listRubrics } from '../../data/critique-rubrics'
