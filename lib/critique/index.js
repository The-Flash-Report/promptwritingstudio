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
// Anthropic-direct Haiku, funded by ANTHROPIC_API_KEY, metered upstream.
// Haiku over Sonnet because grades run inside a Netlify function with a ~26s
// wall: Sonnet at temp 0 takes 18-30s per grade (observed on the PR #53
// preview — the eval's second grade timed out), Haiku 5-7s. The grounding
// contract rejects low-quality judging regardless of model; EVAL.md verifies
// the ranking holds on Haiku. Sonnet stays available via BYOK/judgeModel.
export const GRADER_JUDGE_MODEL = 'grader-haiku'

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

  // Deterministic judging: temperature 0. One retry when the judge output
  // fails validation (fabricated span, missing rewrite, bad shape): rejecting
  // ungrounded critiques is the contract, but the caller shouldn't pay for a
  // judge hiccup when a second attempt usually parses clean.
  let judged, envelope, extras, criteria
  let lastErr = null
  for (let attempt = 0; attempt < 2; attempt++) {
    judged = await complete({
      prompt: judgePrompt,
      model: judgeModel,
      params: { temperature: 0, maxTokens: JUDGE_MAX_TOKENS },
      userKey,
      studioFreeKey,
      studioAnthropicKey,
      fetchImpl,
      signal,
    })
    try {
      envelope = parseEnvelope(judged.output)
      extras = parseGraderExtras(envelope, targetPrompt)
      // Attempt 1 is strict; the retry salvages a persistently unverifiable
      // span (drops the quote, keeps the justified score) rather than 502ing.
      criteria = extras.flagged
        ? null
        : parseJudgeResponse(envelope, rubric, targetPrompt, { salvage: attempt > 0 })
      lastErr = null
      break
    } catch (err) {
      if (!(err instanceof MalformedCritiqueError)) throw err
      lastErr = err
    }
  }
  if (lastErr) throw lastErr

  const judgeMeta = {
    model: judged.model,
    tokensIn: judged.tokensIn,
    tokensOut: judged.tokensOut,
    costUsd: judged.costUsd,
    latencyMs: judged.latencyMs,
    fundedBy: judged.fundedBy,
  }
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
