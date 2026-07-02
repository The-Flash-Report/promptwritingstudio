// Critique rubrics — the structured config the LLM-as-judge consumes.
//
// This is course IP: the dimensions a good prompt is scored on. Each rubric is
// versioned (a content hash, like templates) so a Critique can be tied to the
// exact rubric it was judged against. Scoring is 0-3 per criterion, matching
// the existing observatory judge (scripts/observatory).
//
// Shape: { id, version, title, scale: {min,max,labels}, passThreshold (on the
// normalized 0-max scale), judgeInstructions, criteria: [{ id, name,
// description, weight }], rewriteMode: 'full'|'edits', maxChars }.

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

const AGENT_SCALE = {
  min: 0,
  max: 3,
  labels: {
    0: 'Absent — the file says nothing about this',
    1: 'Weak — mentioned but too vague to act on',
    2: 'Adequate — clear enough to guide the agent',
    3: 'Excellent — explicit, specific, and unambiguous',
  },
}

const RUBRICS = [
  {
    id: 'prompt-quality',
    title: 'Prompt Quality',
    rewriteMode: 'full',
    maxChars: 8000,
    scale: SCALE,
    passThreshold: 2.0,
    judgeInstructions:
      'You are an expert prompt-engineering instructor. Judge the prompt as a set of instructions to an AI — not whether its topic is good. Be strict and concrete: score what is actually written, quote it, and never award points for what the author probably meant.',
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
  {
    id: 'agent-prompt',
    title: 'Agent Prompt Quality',
    rewriteMode: 'edits',
    maxChars: 24000,
    scale: AGENT_SCALE,
    passThreshold: 2.0,
    judgeInstructions:
      'You are a senior AI-engineering reviewer specialising in CLAUDE.md files and agent system prompts. You are scoring a CLAUDE.md or agent system prompt — not a chat prompt. The file exists to give a persistent AI agent its identity, operating context, behavioural rules, and failure-handling guidance. Be strict: score only what is actually written. Never award points for intent, convention, or what a reasonable developer "probably meant". Quote verbatim from the file for every score above 0.',
    criteria: [
      {
        id: 'identity_scope',
        name: 'Identity and scope',
        description:
          "Declares what the agent is, what project or codebase it operates in, and what is in- and out-of-scope. A bare 'You are a helpful assistant' scores 0.",
        weight: 1,
      },
      {
        id: 'environment_context',
        name: 'Environment and context',
        description:
          'Supplies the concrete facts the agent needs to act without guessing: stack, paths, commands, external dependencies, and any non-obvious constraints of the runtime environment.',
        weight: 2,
      },
      {
        id: 'behavioral_rules',
        name: 'Behavioural rules',
        description:
          'States explicit do/do-not rules that govern agent behaviour: commit hygiene, secret handling, file-mutation policy, approval gates, tone. Vague advice ("be careful") scores 1 at most.',
        weight: 2,
      },
      {
        id: 'failure_guidance',
        name: 'Failure and escalation guidance',
        description:
          'Explains what the agent should do when it is uncertain, hits an error, or encounters a decision that exceeds its authority — not just "ask the user".',
        weight: 1,
      },
      {
        id: 'maintainability',
        name: 'Maintainability',
        description:
          'The file is structured so a new developer (or a future version of the agent) can navigate and update it without guessing: sections are labelled, the reasoning behind non-obvious rules is present, and stale or contradictory guidance is absent.',
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
