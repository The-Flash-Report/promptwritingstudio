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

// Edits mode runs ONE attempt instead of two: a rich agent file makes the
// judge slow enough (~2.3k input tokens, generation near the cap) that a
// retry cannot fit inside Netlify's ~30s function wall — observed as 504s on
// an 8.8k-char CLAUDE.md on the PR #54 preview, twice. A single attempt at
// the full 2000 budget completes in ~20s worst case; a tighter 1300 cap was
// tried and truncated the judge mid-JSON on the same file. Salvage-from-the-
// start absorbs the validation-failure class (unverifiable excerpts/spans)
// that would otherwise want the retry. Fabricated content is still dropped,
// never displayed.
const JUDGE_MAX_TOKENS_EDITS = 2000

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
  // In edits mode the target selector is not shown and the rewrite is not produced,
  // so skip the target validation — any value (including the UI default) is fine.
  if (rubric.rewriteMode !== 'edits' && !REWRITE_TARGETS[target]) {
    throw new MalformedCritiqueError(`Unknown rewrite target: ${target}`)
  }

  const judgePrompt = renderJudgePrompt(targetPrompt, rubric, { target })

  // Deterministic judging: temperature 0.
  // Full mode: one strict attempt + one salvaging retry (chat prompts are small;
  // two attempts fit the function wall comfortably).
  // Edits mode: ONE attempt with salvage active and a tighter token cap — see
  // JUDGE_MAX_TOKENS_EDITS. A second attempt cannot fit the wall on big files.
  const isEdits = rubric.rewriteMode === 'edits'
  const maxAttempts = isEdits ? 1 : 2
  const maxTokens = isEdits ? JUDGE_MAX_TOKENS_EDITS : JUDGE_MAX_TOKENS
  let judged, envelope, extras, criteria
  let lastErr = null
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    judged = await complete({
      prompt: judgePrompt,
      model: judgeModel,
      params: { temperature: 0, maxTokens },
      userKey,
      studioFreeKey,
      studioAnthropicKey,
      fetchImpl,
      signal,
    })
    try {
      envelope = parseEnvelope(judged.output)
      extras = parseGraderExtras(envelope, targetPrompt, rubric)
      // Salvage drops an unverifiable span/excerpt (keeps the justified score)
      // rather than 502ing: last attempt in full mode, only attempt in edits.
      const salvage = isEdits || attempt > 0
      criteria = extras.flagged
        ? null
        : parseJudgeResponse(envelope, rubric, targetPrompt, { salvage })
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
  const isEditsMode = rubric.rewriteMode === 'edits'

  return {
    flagged: false,
    rubricId: rubric.id,
    rubricVersion: rubric.version,
    scale: { min: rubric.scale.min, max: rubric.scale.max },
    ...(isEditsMode ? {} : { target }),
    criteria,
    overall,
    failureModes: extras.failureModes,
    ...(isEditsMode
      ? { revisions: extras.revisions }
      : { rewrite: extras.rewrite }),
    summary: typeof envelope.summary === 'string' ? envelope.summary : '',
    judge: judgeMeta,
  }
}

export { getRubric, listRubrics } from '../../data/critique-rubrics'
