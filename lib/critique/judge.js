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

export function renderJudgePrompt(targetPrompt, rubric) {
  const criteriaBlock = rubric.criteria
    .map((c, i) => `${i + 1}. [${c.id}] ${c.name} — ${c.description}`)
    .join('\n')
  const scaleBlock = Object.entries(rubric.scale.labels)
    .map(([n, label]) => `  ${n} = ${label}`)
    .join('\n')

  return `${rubric.judgeInstructions}

Score each criterion on this scale:
${scaleBlock}

GROUNDING RULES (mandatory):
- Every criterion needs a one-sentence "justification".
- Any score above ${rubric.scale.min} needs an "evidence_span": a SHORT verbatim quote copied from the prompt that supports the score.
- If a criterion is entirely absent, score it ${rubric.scale.min} and use an empty evidence_span.
- Never invent an evidence_span. Copy it character-for-character from the prompt.

PROMPT TO CRITIQUE:
<<<PROMPT
${targetPrompt}
PROMPT

RUBRIC CRITERIA:
${criteriaBlock}

Return ONLY this JSON, nothing else:
{"criteria":[{"id":"<criterion id>","score":<int>,"justification":"<one sentence>","evidence_span":"<verbatim quote or empty string>"}],"summary":"<one-sentence overall takeaway>"}`
}

function stripCodeFence(text) {
  const m = String(text).match(/^\s*```(?:json)?\s*\n([\s\S]*?)\n```\s*$/)
  return m ? m[1] : text
}

const normalize = s => String(s).replace(/\s+/g, ' ').trim().toLowerCase()

// Parse + validate the judge's JSON against the rubric. Returns grounded
// per-criterion results in rubric order. Throws MalformedCritiqueError on any
// shape, range, or grounding violation.
export function parseJudgeResponse(text, rubric, targetPrompt) {
  let obj
  try {
    obj = JSON.parse(stripCodeFence(text).trim())
  } catch (e) {
    throw new MalformedCritiqueError(`judge returned non-JSON: ${String(e.message).slice(0, 120)}`)
  }

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
