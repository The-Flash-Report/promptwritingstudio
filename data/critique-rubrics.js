// Critique rubrics — the structured config the LLM-as-judge consumes.
//
// This is course IP: the dimensions a good prompt is scored on. Each rubric is
// versioned (a content hash, like templates) so a Critique can be tied to the
// exact rubric it was judged against. Scoring is 0-3 per criterion, matching
// the existing observatory judge (scripts/observatory).
//
// Shape: { id, version, title, scale: {min,max,labels}, passThreshold (on the
// normalized 0-max scale), judgeInstructions, criteria: [{ id, name,
// description, weight }] }.

import { createHash } from 'crypto'

const SCALE = {
  min: 0,
  max: 3,
  labels: {
    0: 'Absent — the prompt does nothing here',
    1: 'Weak — present but vague or incomplete',
    2: 'Adequate — clearly present and usable',
    3: 'Excellent — explicit, specific, and well-formed',
  },
}

const RUBRICS = [
  {
    id: 'prompt-quality',
    title: 'Prompt Quality',
    scale: SCALE,
    passThreshold: 2.0,
    judgeInstructions:
      'You are an expert prompt-engineering instructor. Judge the prompt as a set of instructions to an AI — not whether its topic is good. Be strict and concrete.',
    criteria: [
      {
        id: 'role_context',
        name: 'Role & context',
        description: 'Sets a clear role/persona and supplies the context the model needs.',
        weight: 1,
      },
      {
        id: 'task_clarity',
        name: 'Task clarity',
        description: 'States the task specifically and unambiguously — a reader knows exactly what to produce.',
        weight: 2,
      },
      {
        id: 'constraints',
        name: 'Constraints & scope',
        description: 'Specifies constraints, scope, length, tone, or boundaries.',
        weight: 1,
      },
      {
        id: 'output_format',
        name: 'Output format',
        description: 'Defines the desired output structure or format.',
        weight: 2,
      },
      {
        id: 'examples_or_criteria',
        name: 'Examples or success criteria',
        description: 'Gives examples, or explicit quality/success criteria, to steer the result.',
        weight: 1,
      },
    ],
  },
]

function versionOf(rubric) {
  // Hash the scoring-relevant config so any change to criteria/weights/scale
  // bumps the version (and invalidates old Critiques tied to it).
  const material = JSON.stringify({
    criteria: rubric.criteria,
    scale: rubric.scale,
    passThreshold: rubric.passThreshold,
    judgeInstructions: rubric.judgeInstructions,
  })
  return 'v1-' + createHash('sha256').update(material).digest('hex').slice(0, 8)
}

const _byId = new Map(RUBRICS.map(r => [r.id, { ...r, version: versionOf(r) }]))

export const DEFAULT_RUBRIC_ID = 'prompt-quality'

export function getRubric(id = DEFAULT_RUBRIC_ID) {
  return _byId.get(id) || null
}

export function listRubrics() {
  return [..._byId.values()].map(({ judgeInstructions, ...summary }) => summary)
}
