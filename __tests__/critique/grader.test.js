// Grader-specific contract: the Anthropic-direct judge route, the rewrite +
// failure-mode validation, and the deterministic safety path.

import { critiquePrompt, GRADER_JUDGE_MODEL } from '../../lib/critique'
import { parseGraderExtras } from '../../lib/critique/judge'
import { MalformedCritiqueError } from '../../lib/critique/errors'
import { MissingKeyError } from '../../lib/gateway/errors'

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
