// LLM-as-judge for prompt critique — a JS port of the observatory judge
// (scripts/observatory/_lib/judge.py), adapted to score a *user's prompt*
// against a rubric instead of a model's output.
//
// Grounding is the whole point (per the brief: "a score with no criterion +
// justification is a bug"). Every criterion must come back with a non-empty
// justification, and any score above 0 must cite an evidence_span that actually
// appears in the prompt — otherwise we reject the judge's output rather than
// surface an ungrounded number.

import { MalformedCritiqueError } from './errors'

// Rewrite-style guidance per target model family. The rewrite is the part
// users copy out, so it should follow the target vendor's prompting idiom.
export const REWRITE_TARGETS = {
  claude: 'Claude: use XML tags to separate sections (e.g. <context>, <task>, <format>), state the role first, put instructions before data.',
  chatgpt: 'ChatGPT: use a clear system-style role line, numbered instructions, and markdown headings for sections.',
  gemini: 'Gemini: lead with the task definition, provide context in labelled sections, and state output requirements explicitly at the end.',
}
export const DEFAULT_REWRITE_TARGET = 'claude'

export function renderJudgePrompt(targetPrompt, rubric, { target = DEFAULT_REWRITE_TARGET } = {}) {
  const criteriaBlock = rubric.criteria
    .map((c, i) => `${i + 1}. [${c.id}] ${c.name} — ${c.description}`)
    .join('\n')
  const scaleBlock = Object.entries(rubric.scale.labels)
    .map(([n, label]) => `  ${n} = ${label}`)
    .join('\n')
  const rewriteStyle = REWRITE_TARGETS[target] || REWRITE_TARGETS[DEFAULT_REWRITE_TARGET]

  return `${rubric.judgeInstructions}

Score each criterion on this scale:
${scaleBlock}

GROUNDING RULES (mandatory):
- Every criterion needs a one-sentence "justification" that refers to THIS prompt's actual words. Generic advice that could apply to any prompt ("be more specific", "add more detail") is forbidden.
- Any score above ${rubric.scale.min} needs an "evidence_span": a SHORT verbatim quote copied from the prompt that supports the score.
- If a criterion is entirely absent, score it ${rubric.scale.min} and use an empty evidence_span.
- Never invent an evidence_span. Copy it character-for-character from the prompt.

CALIBRATION (mandatory):
- Do not give courtesy points. A one-line prompt with no role, format, or constraints scores ${rubric.scale.min} on those criteria.
- Reserve ${rubric.scale.max} for criteria that are explicit and specific in the text. "Implied" is at most 1.
- A genuinely excellent prompt should score near the top. Do not manufacture faults to seem rigorous; if a criterion is fully met, say so and quote it.

FAILURE MODES:
- List up to 4 "failure_modes": the concrete ways THIS prompt will go wrong when run (ambiguities the model must guess at, missing inputs it will invent, conflicting instructions). Each item must name the specific gap, not generic risk. If the prompt is airtight, return fewer items or an empty list.

REWRITE:
- Produce "rewrite": a complete, improved version of the prompt that preserves the author's intent and fixes the weaknesses you scored.
- Style it for ${rewriteStyle}
- Where the original is missing information only the author knows, insert a [PLACEHOLDER LIKE THIS] rather than inventing facts.
- The rewrite must be self-contained and ready to paste. Do not include commentary.

SAFETY:
- If the prompt's purpose is to cause harm (weapons, malware, fraud, exploitation, targeted harassment or similar), set "safety_flag" to a one-sentence reason, score every criterion ${rubric.scale.min} with empty evidence_span and justification "not graded", and return an empty "rewrite" and empty "failure_modes". Do not improve harmful prompts.
- Otherwise "safety_flag" must be an empty string. An edgy-but-legitimate prompt (e.g. a villain in fiction, security research framing) is NOT flagged.

PROMPT TO CRITIQUE:
<<<PROMPT
${targetPrompt}
PROMPT

RUBRIC CRITERIA:
${criteriaBlock}

Return ONLY this JSON, nothing else:
{"safety_flag":"<empty string, or one-sentence reason>","criteria":[{"id":"<criterion id>","score":<int>,"justification":"<one sentence>","evidence_span":"<verbatim quote or empty string>"}],"failure_modes":["<specific way this prompt goes wrong>"],"rewrite":"<the full improved prompt, or empty string if flagged>","summary":"<one-sentence overall takeaway>"}`
}

function stripCodeFence(text) {
  const m = String(text).match(/^\s*```(?:json)?\s*\n([\s\S]*?)\n```\s*$/)
  return m ? m[1] : text
}

const normalize = s => String(s).replace(/\s+/g, ' ').trim().toLowerCase()

// Parse the judge's raw output into the envelope object (one JSON.parse for
// all consumers). Throws MalformedCritiqueError on non-JSON.
export function parseEnvelope(text) {
  try {
    return JSON.parse(stripCodeFence(String(text)).trim())
  } catch (e) {
    throw new MalformedCritiqueError(`judge returned non-JSON: ${String(e.message).slice(0, 120)}`)
  }
}

const MAX_FAILURE_MODES = 6

// Validate the grader-specific fields of the envelope: safety flag, failure
// modes, rewrite. Same philosophy as parseJudgeResponse — a malformed or
// ungrounded field is REJECTED, never surfaced.
export function parseGraderExtras(envelope, targetPrompt) {
  const safetyReason = typeof envelope.safety_flag === 'string' ? envelope.safety_flag.trim() : ''
  if (safetyReason !== '') {
    return { flagged: true, safetyReason, failureModes: [], rewrite: '' }
  }

  const rawModes = envelope.failure_modes
  if (!Array.isArray(rawModes)) {
    throw new MalformedCritiqueError('failure_modes missing or not an array')
  }
  const failureModes = rawModes
    .map(m => (typeof m === 'string' ? m.trim() : ''))
    .filter(m => m !== '')
    .slice(0, MAX_FAILURE_MODES)

  const rewrite = typeof envelope.rewrite === 'string' ? envelope.rewrite.trim() : ''
  if (rewrite === '') {
    throw new MalformedCritiqueError('rewrite missing or empty')
  }
  if (normalize(rewrite) === normalize(targetPrompt)) {
    throw new MalformedCritiqueError('rewrite is identical to the original prompt')
  }

  return { flagged: false, safetyReason: '', failureModes, rewrite }
}

// Parse + validate the judge's JSON against the rubric. Returns grounded
// per-criterion results in rubric order. Throws MalformedCritiqueError on any
// shape, range, or grounding violation.
export function parseJudgeResponse(text, rubric, targetPrompt) {
  const obj = typeof text === 'object' && text !== null ? text : parseEnvelope(text)

  const items = obj.criteria
  if (!Array.isArray(items) || items.length !== rubric.criteria.length) {
    throw new MalformedCritiqueError(
      `expected ${rubric.criteria.length} criteria, got ${Array.isArray(items) ? items.length : typeof items}`
    )
  }

  const { min, max } = rubric.scale
  const normalizedPrompt = normalize(targetPrompt)
  const byId = new Map(items.map(it => [it && it.id, it]))

  return rubric.criteria.map((criterion, i) => {
    // Match by id, fall back to positional so a judge that drops ids still works.
    const item = byId.get(criterion.id) ?? items[i]
    if (!item || typeof item !== 'object') {
      throw new MalformedCritiqueError(`missing result for criterion "${criterion.id}"`)
    }

    const score = Number(item.score)
    if (!Number.isInteger(score) || score < min || score > max) {
      throw new MalformedCritiqueError(`score for "${criterion.id}" out of range ${min}-${max}: ${item.score}`)
    }

    const justification = typeof item.justification === 'string' ? item.justification.trim() : ''
    if (justification === '') {
      // Ungrounded score → reject (this is the anti-hallucination contract).
      throw new MalformedCritiqueError(`ungrounded score for "${criterion.id}": no justification`)
    }

    const evidenceSpan = typeof item.evidence_span === 'string' ? item.evidence_span.trim() : ''
    if (score > min) {
      if (evidenceSpan === '') {
        throw new MalformedCritiqueError(`score ${score} for "${criterion.id}" has no evidence_span`)
      }
      if (!normalizedPrompt.includes(normalize(evidenceSpan))) {
        throw new MalformedCritiqueError(`evidence_span for "${criterion.id}" not found in the prompt (fabricated)`)
      }
    }

    return {
      id: criterion.id,
      name: criterion.name,
      weight: criterion.weight,
      score,
      justification,
      evidenceSpan,
      grounded: true,
    }
  })
}

// Weighted overall on the rubric's scale, plus a percentage and pass flag.
export function computeOverall(criteriaResults, rubric) {
  const totalWeight = criteriaResults.reduce((s, c) => s + c.weight, 0)
  const weightedSum = criteriaResults.reduce((s, c) => s + c.score * c.weight, 0)
  const score = totalWeight ? weightedSum / totalWeight : 0
  const rounded = Math.round(score * 10) / 10
  return {
    score: rounded,
    max: rubric.scale.max,
    percentage: Math.round((score / rubric.scale.max) * 100),
    pass: rounded >= rubric.passThreshold,
  }
}
