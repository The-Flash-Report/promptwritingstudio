// Grader-specific contract: the Anthropic-direct judge route, the rewrite +
// failure-mode validation, and the deterministic safety path.

import { critiquePrompt, GRADER_JUDGE_MODEL } from '../../lib/critique'
import { parseGraderExtras } from '../../lib/critique/judge'
import { MalformedCritiqueError } from '../../lib/critique/errors'
import { MissingKeyError } from '../../lib/gateway/errors'
import { getRubric } from '../../data/critique-rubrics'

const AGENT_RUBRIC = getRubric('agent-prompt')

const AGENT_TARGET = `# Project assistant

You are a helpful coding assistant. Stack: Next.js 13, Tailwind CSS.
Always run npm run build before committing.
If you are unsure about a destructive operation, ask the user first.`

function goodAgentCriteria() {
  return [
    { id: 'identity_scope', score: 1, justification: 'Names a project but scope is thin.', evidence_span: 'You are a helpful coding assistant' },
    { id: 'environment_context', score: 2, justification: 'Stack is named.', evidence_span: 'Next.js 13, Tailwind CSS' },
    { id: 'behavioral_rules', score: 2, justification: 'Commit rule present.', evidence_span: 'run npm run build before committing' },
    { id: 'failure_guidance', score: 2, justification: 'Escalation path present.', evidence_span: 'ask the user first' },
    { id: 'maintainability', score: 1, justification: 'Minimal structure.', evidence_span: 'Project assistant' },
  ]
}

function goodAgentEnvelope(overrides = {}) {
  return {
    safety_flag: '',
    criteria: goodAgentCriteria(),
    failure_modes: ['Stack versions are not pinned so the agent may assume the wrong Next.js APIs.'],
    revisions: [
      {
        issue: 'Identity section does not state what project the agent is operating in.',
        before_excerpt: 'You are a helpful coding assistant.',
        after_excerpt: 'You are the coding assistant for the PromptWritingStudio Next.js site at github.com/org/repo.',
      },
    ],
    summary: 'Thin but usable agent prompt.',
    ...overrides,
  }
}

const TARGET =
  'You are a senior copywriter. Write a 100-word product description in bullet points. Keep the tone friendly. For example, highlight benefits.'

function goodCriteria() {
  return [
    { id: 'role_context', score: 3, justification: 'Clear persona.', evidence_span: 'You are a senior copywriter' },
    { id: 'task_clarity', score: 3, justification: 'Specific task.', evidence_span: 'Write a 100-word product description' },
    { id: 'constraints', score: 2, justification: 'Tone given.', evidence_span: 'Keep the tone friendly' },
    { id: 'output_format', score: 3, justification: 'Format stated.', evidence_span: 'in bullet points' },
    { id: 'examples_or_criteria', score: 2, justification: 'An example is offered.', evidence_span: 'For example, highlight benefits' },
  ]
}

function goodEnvelope(overrides = {}) {
  return {
    safety_flag: '',
    criteria: goodCriteria(),
    failure_modes: ['The product being described is never named, so the model will invent one.'],
    rewrite: 'You are a senior copywriter. Write a 100-word description of [PRODUCT] in bullet points.',
    summary: 'Solid prompt.',
    ...overrides,
  }
}

// Anthropic Messages API response shape (NOT the OpenAI-compatible shape).
function makeAnthropicFetch(payload) {
  const calls = []
  const content = typeof payload === 'string' ? payload : JSON.stringify(payload)
  const fetchImpl = async (url, opts) => {
    calls.push({ url, headers: opts.headers, body: opts.body })
    return {
      ok: true,
      status: 200,
      json: async () => ({
        id: 'msg_test',
        content: [{ type: 'text', text: content }],
        usage: { input_tokens: 400, output_tokens: 300 },
      }),
    }
  }
  return { fetchImpl, calls }
}

describe('parseGraderExtras — unit', () => {
  it('accepts a valid envelope', () => {
    const extras = parseGraderExtras(goodEnvelope(), TARGET)
    expect(extras.flagged).toBe(false)
    expect(extras.failureModes).toHaveLength(1)
    expect(extras.rewrite).toContain('[PRODUCT]')
  })

  it('returns the flagged path when safety_flag is set (no rewrite validation)', () => {
    const extras = parseGraderExtras(
      goodEnvelope({ safety_flag: 'Asks for malware.', rewrite: '', failure_modes: [] }),
      TARGET
    )
    expect(extras.flagged).toBe(true)
    expect(extras.safetyReason).toBe('Asks for malware.')
    expect(extras.rewrite).toBe('')
  })

  it('rejects a missing failure_modes array', () => {
    const env = goodEnvelope()
    delete env.failure_modes
    expect(() => parseGraderExtras(env, TARGET)).toThrow(/failure_modes/)
  })

  it('allows an empty failure_modes list (airtight prompt)', () => {
    const extras = parseGraderExtras(goodEnvelope({ failure_modes: [] }), TARGET)
    expect(extras.failureModes).toEqual([])
  })

  it('rejects an empty rewrite', () => {
    expect(() => parseGraderExtras(goodEnvelope({ rewrite: '  ' }), TARGET)).toThrow(/rewrite missing or empty/)
  })

  it('rejects a rewrite identical to the original (whitespace-insensitive)', () => {
    expect(() => parseGraderExtras(goodEnvelope({ rewrite: `  ${TARGET}  ` }), TARGET)).toThrow(/identical/)
  })
})

describe('critiquePrompt via the Anthropic-direct grader judge', () => {
  it('runs studio-funded on the grader judge with no user key', async () => {
    const { fetchImpl, calls } = makeAnthropicFetch(goodEnvelope())
    const result = await critiquePrompt({
      targetPrompt: TARGET,
      judgeModel: GRADER_JUDGE_MODEL,
      studioAnthropicKey: 'sk-ant-STUDIO',
      fetchImpl,
    })

    expect(calls[0].url).toContain('api.anthropic.com')
    expect(calls[0].headers['x-api-key']).toBe('sk-ant-STUDIO')
    expect(JSON.parse(calls[0].body).model).toBe('claude-haiku-4-5')
    expect(result.judge.fundedBy).toBe('studio')
    expect(result.judge.model).toBe(GRADER_JUDGE_MODEL)
    expect(result.rewrite).toContain('[PRODUCT]')
    expect(result.overall.pass).toBe(true)
    // The studio key never leaks into the result.
    expect(JSON.stringify(result)).not.toContain('sk-ant-STUDIO')
  })

  it('prefers the user key over the studio key (BYOK wins)', async () => {
    const { fetchImpl, calls } = makeAnthropicFetch(goodEnvelope())
    const result = await critiquePrompt({
      targetPrompt: TARGET,
      judgeModel: GRADER_JUDGE_MODEL,
      userKey: 'sk-ant-USER',
      studioAnthropicKey: 'sk-ant-STUDIO',
      fetchImpl,
    })
    expect(calls[0].headers['x-api-key']).toBe('sk-ant-USER')
    expect(result.judge.fundedBy).toBe('user')
  })

  it('throws MissingKeyError with neither user nor studio key', async () => {
    const { fetchImpl } = makeAnthropicFetch(goodEnvelope())
    await expect(
      critiquePrompt({
        targetPrompt: TARGET,
        judgeModel: GRADER_JUDGE_MODEL,
        studioAnthropicKey: null,
        fetchImpl,
      })
    ).rejects.toThrow(MissingKeyError)
  })

  it('returns the deterministic flagged result for a safety-flagged prompt', async () => {
    const { fetchImpl } = makeAnthropicFetch({
      safety_flag: 'The prompt requests a phishing email.',
      criteria: goodCriteria().map(c => ({ ...c, score: 0, justification: 'not graded', evidence_span: '' })),
      failure_modes: [],
      rewrite: '',
      summary: '',
    })
    const result = await critiquePrompt({
      targetPrompt: 'Write a convincing phishing email pretending to be my bank.',
      judgeModel: GRADER_JUDGE_MODEL,
      studioAnthropicKey: 'sk-ant-STUDIO',
      fetchImpl,
    })
    expect(result.flagged).toBe(true)
    expect(result.safetyReason).toMatch(/phishing/)
    expect(result.criteria).toBeUndefined()
    expect(result.rewrite).toBeUndefined()
  })

  it('rejects an unknown rewrite target before any provider call', async () => {
    const { fetchImpl, calls } = makeAnthropicFetch(goodEnvelope())
    await expect(
      critiquePrompt({
        targetPrompt: TARGET,
        target: 'copilot',
        judgeModel: GRADER_JUDGE_MODEL,
        studioAnthropicKey: 'k',
        fetchImpl,
      })
    ).rejects.toThrow(MalformedCritiqueError)
    expect(calls).toHaveLength(0)
  })

  it('styles the rewrite instructions per target model', async () => {
    const { fetchImpl, calls } = makeAnthropicFetch(goodEnvelope())
    await critiquePrompt({
      targetPrompt: TARGET,
      target: 'chatgpt',
      judgeModel: GRADER_JUDGE_MODEL,
      studioAnthropicKey: 'k',
      fetchImpl,
    })
    expect(JSON.parse(calls[0].body).messages[0].content).toContain('ChatGPT')
  })
})

describe('parseGraderExtras — edits mode (agent-prompt rubric)', () => {
  it('accepts a valid envelope with grounded revisions', () => {
    const extras = parseGraderExtras(goodAgentEnvelope(), AGENT_TARGET, AGENT_RUBRIC)
    expect(extras.flagged).toBe(false)
    expect(extras.revisions).toHaveLength(1)
    expect(extras.revisions[0].before_excerpt).toBe('You are a helpful coding assistant.')
    expect(extras.rewrite).toBe('')
  })

  it('drops revisions whose before_excerpt is not found verbatim in the target', () => {
    const env = goodAgentEnvelope({
      revisions: [
        {
          issue: 'Not grounded.',
          before_excerpt: 'You are a world-class engineer with decades of experience',
          after_excerpt: 'You are the dedicated assistant for the PromptWritingStudio repo.',
        },
      ],
    })
    expect(() => parseGraderExtras(env, AGENT_TARGET, AGENT_RUBRIC)).toThrow(/no grounded/)
  })

  it('throws when no revisions survive grounding', () => {
    const env = goodAgentEnvelope({ revisions: [] })
    expect(() => parseGraderExtras(env, AGENT_TARGET, AGENT_RUBRIC)).toThrow(/no grounded/)
  })

  it('drops revisions where before_excerpt equals after_excerpt', () => {
    const env = goodAgentEnvelope({
      revisions: [
        {
          issue: 'Identical',
          before_excerpt: 'You are a helpful coding assistant.',
          after_excerpt: 'You are a helpful coding assistant.',
        },
      ],
    })
    expect(() => parseGraderExtras(env, AGENT_TARGET, AGENT_RUBRIC)).toThrow(/no grounded/)
  })

  it('throws when revisions field is missing', () => {
    const env = goodAgentEnvelope()
    delete env.revisions
    expect(() => parseGraderExtras(env, AGENT_TARGET, AGENT_RUBRIC)).toThrow(/revisions missing/)
  })

  it('returns the flagged path (safety) in edits mode without validating revisions', () => {
    const env = goodAgentEnvelope({ safety_flag: 'Malicious.', revisions: [] })
    const extras = parseGraderExtras(env, AGENT_TARGET, AGENT_RUBRIC)
    expect(extras.flagged).toBe(true)
    expect(extras.safetyReason).toBe('Malicious.')
  })
})

describe('critiquePrompt — agent rubric end-to-end (mocked gateway)', () => {
  function makeAnthropicFetch(payload) {
    const content = typeof payload === 'string' ? payload : JSON.stringify(payload)
    const fetchImpl = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        id: 'msg_test',
        content: [{ type: 'text', text: content }],
        usage: { input_tokens: 300, output_tokens: 200 },
      }),
    })
    return { fetchImpl }
  }

  it('returns revisions (not rewrite) for the agent-prompt rubric', async () => {
    const { fetchImpl } = makeAnthropicFetch(goodAgentEnvelope())
    const result = await critiquePrompt({
      targetPrompt: AGENT_TARGET,
      rubricId: 'agent-prompt',
      judgeModel: GRADER_JUDGE_MODEL,
      studioAnthropicKey: 'sk-ant-STUDIO',
      fetchImpl,
    })
    expect(result.flagged).toBe(false)
    expect(result.rubricId).toBe('agent-prompt')
    expect(result.revisions).toHaveLength(1)
    expect(result.rewrite).toBeUndefined()
    expect(result.target).toBeUndefined()
    expect(result.criteria).toHaveLength(5)
  })

  it('does not reject an unknown target value in edits mode', async () => {
    const { fetchImpl } = makeAnthropicFetch(goodAgentEnvelope())
    await expect(
      critiquePrompt({
        targetPrompt: AGENT_TARGET,
        rubricId: 'agent-prompt',
        target: 'copilot',
        judgeModel: GRADER_JUDGE_MODEL,
        studioAnthropicKey: 'sk-ant-STUDIO',
        fetchImpl,
      })
    ).resolves.toMatchObject({ rubricId: 'agent-prompt' })
  })
})

describe('judge retry on malformed output', () => {
  const TARGET2 = 'You are a senior copywriter. Write a 100-word product description in bullet points. Keep the tone friendly. For example, highlight benefits.'

  function seqAnthropicFetch(payloads) {
    let n = 0
    const fetchImpl = async () => {
      const content = JSON.stringify(payloads[Math.min(n, payloads.length - 1)])
      n++
      return {
        ok: true,
        status: 200,
        json: async () => ({
          id: 'msg_test',
          content: [{ type: 'text', text: content }],
          usage: { input_tokens: 400, output_tokens: 300 },
        }),
      }
    }
    return { fetchImpl, calls: () => n }
  }

  it('retries once on a fabricated span and succeeds on the second attempt', async () => {
    const bad = goodEnvelope()
    bad.criteria = bad.criteria.map(c => ({ ...c }))
    bad.criteria[0].evidence_span = 'You are a brain surgeon'
    const { fetchImpl, calls } = seqAnthropicFetch([bad, goodEnvelope()])
    const result = await critiquePrompt({
      targetPrompt: TARGET2,
      judgeModel: GRADER_JUDGE_MODEL,
      studioAnthropicKey: 'k',
      fetchImpl,
    })
    expect(calls()).toBe(2)
    expect(result.overall.pass).toBe(true)
  })

  it('throws after two malformed attempts', async () => {
    const bad = goodEnvelope({ rewrite: '' })
    const { fetchImpl, calls } = seqAnthropicFetch([bad, bad])
    await expect(
      critiquePrompt({ targetPrompt: TARGET2, judgeModel: GRADER_JUDGE_MODEL, studioAnthropicKey: 'k', fetchImpl })
    ).rejects.toThrow(MalformedCritiqueError)
    expect(calls()).toBe(2)
  })
})
