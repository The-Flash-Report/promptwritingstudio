import { critiquePrompt } from '../../lib/critique'
import { getRubric, listRubrics } from '../../data/critique-rubrics'
import { renderJudgePrompt, parseJudgeResponse, computeOverall } from '../../lib/critique/judge'
import { MalformedCritiqueError, UnknownRubricError } from '../../lib/critique/errors'

const RUBRIC = getRubric('prompt-quality')
const AGENT_RUBRIC = getRubric('agent-prompt')

describe('rubric registry', () => {
  it('lists both rubrics', () => {
    const rubrics = listRubrics()
    const ids = rubrics.map(r => r.id)
    expect(ids).toContain('prompt-quality')
    expect(ids).toContain('agent-prompt')
  })

  it('prompt-quality version hash has not drifted (v1-6dfd72d2)', () => {
    expect(RUBRIC.version).toBe('v1-6dfd72d2')
  })

  it('agent-prompt rubric has rewriteMode edits and maxChars 24000', () => {
    expect(AGENT_RUBRIC.rewriteMode).toBe('edits')
    expect(AGENT_RUBRIC.maxChars).toBe(24000)
    expect(AGENT_RUBRIC.criteria).toHaveLength(5)
  })

  it('agent-prompt rubric has the expected criterion ids', () => {
    const ids = AGENT_RUBRIC.criteria.map(c => c.id)
    expect(ids).toEqual(['identity_scope', 'environment_context', 'behavioral_rules', 'failure_guidance', 'maintainability'])
  })
})

describe('agent rubric judge prompt', () => {
  const AGENT_TARGET = '# Assistant\n\nYou are a helpful coding assistant. Use Node.js.'

  it('renders edits-mode prompt containing "revisions" keyword, not "rewrite"', () => {
    const p = renderJudgePrompt(AGENT_TARGET, AGENT_RUBRIC)
    expect(p).toContain('revisions')
    expect(p).not.toContain('"rewrite"')
    for (const c of AGENT_RUBRIC.criteria) expect(p).toContain(c.id)
  })

  it('edits-mode prompt contains FILE TO CRITIQUE label', () => {
    const p = renderJudgePrompt(AGENT_TARGET, AGENT_RUBRIC)
    expect(p).toContain('FILE TO CRITIQUE')
  })
})

// A prompt that contains a verbatim phrase for each criterion, so grounded
// evidence spans can be validated.
const TARGET =
  'You are a senior copywriter. Write a 100-word product description in bullet points. Keep the tone friendly. For example, highlight benefits.'

// A well-formed, fully grounded judge response for the prompt-quality rubric.
function goodCriteria() {
  return [
    { id: 'role_context', score: 3, justification: 'Clear persona.', evidence_span: 'You are a senior copywriter' },
    { id: 'task_clarity', score: 3, justification: 'Specific task.', evidence_span: 'Write a 100-word product description' },
    { id: 'constraints', score: 2, justification: 'Tone given.', evidence_span: 'Keep the tone friendly' },
    { id: 'output_format', score: 3, justification: 'Format stated.', evidence_span: 'in bullet points' },
    { id: 'examples_or_criteria', score: 2, justification: 'An example is offered.', evidence_span: 'For example, highlight benefits' },
  ]
}

// A complete, valid judge envelope (criteria + grader extras).
function goodEnvelope(overrides = {}) {
  return {
    safety_flag: '',
    criteria: goodCriteria(),
    failure_modes: ['The word count is stated but the product itself is never named.'],
    rewrite: 'You are a senior copywriter. Write a 100-word description of [PRODUCT] in bullet points. Keep the tone friendly.',
    summary: 'Strong, specific prompt.',
    ...overrides,
  }
}

function makeJudgeFetch(payload) {
  const calls = []
  const content = typeof payload === 'string' ? payload : JSON.stringify(payload)
  const fetchImpl = async (url, opts) => {
    calls.push({ auth: opts.headers.Authorization, body: opts.body })
    return {
      ok: true,
      status: 200,
      json: async () => ({
        id: 'gen-judge',
        choices: [{ message: { content } }],
        usage: { prompt_tokens: 200, completion_tokens: 120 },
      }),
    }
  }
  return { fetchImpl, calls }
}

describe('critique judge — unit', () => {
  it('renders a judge prompt containing the target and every criterion id', () => {
    const p = renderJudgePrompt(TARGET, RUBRIC)
    expect(p).toContain(TARGET)
    for (const c of RUBRIC.criteria) expect(p).toContain(c.id)
  })

  it('parses a grounded response into per-criterion results', () => {
    const results = parseJudgeResponse(JSON.stringify({ criteria: goodCriteria() }), RUBRIC, TARGET)
    expect(results).toHaveLength(5)
    expect(results[0]).toMatchObject({ id: 'role_context', score: 3, grounded: true })
    expect(results[0].evidenceSpan).toBe('You are a senior copywriter')
  })

  it('tolerates a ```json code fence', () => {
    const fenced = '```json\n' + JSON.stringify({ criteria: goodCriteria() }) + '\n```'
    expect(() => parseJudgeResponse(fenced, RUBRIC, TARGET)).not.toThrow()
  })

  it('rejects an ungrounded score (no justification)', () => {
    const c = goodCriteria()
    c[1].justification = '   '
    expect(() => parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET)).toThrow(
      /ungrounded score for "task_clarity"/
    )
  })

  it('rejects a fabricated evidence span (not in the prompt)', () => {
    const c = goodCriteria()
    c[0].evidence_span = 'You are a brain surgeon'
    expect(() => parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET)).toThrow(/fabricated/)
  })

  it('requires an evidence span for any score above the minimum', () => {
    const c = goodCriteria()
    c[2].evidence_span = ''
    expect(() => parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET)).toThrow(/no evidence_span/)
  })

  it('allows an absent criterion (score 0, empty evidence)', () => {
    const c = goodCriteria()
    c[2] = { id: 'constraints', score: 0, justification: 'No constraints given.', evidence_span: '' }
    const results = parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET)
    expect(results[2]).toMatchObject({ id: 'constraints', score: 0, grounded: true })
  })

  it('rejects an out-of-range score', () => {
    const c = goodCriteria()
    c[0].score = 7
    expect(() => parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET)).toThrow(/out of range/)
  })

  it('rejects the wrong number of criteria', () => {
    const c = goodCriteria().slice(0, 3)
    expect(() => parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET)).toThrow(/expected 5 criteria/)
  })

  it('rejects non-JSON', () => {
    expect(() => parseJudgeResponse('the prompt is a solid 7/10', RUBRIC, TARGET)).toThrow(MalformedCritiqueError)
  })

  it('computes a weighted overall', () => {
    const results = parseJudgeResponse(JSON.stringify({ criteria: goodCriteria() }), RUBRIC, TARGET)
    const overall = computeOverall(results, RUBRIC)
    // weights [1,2,1,2,1] over scores [3,3,2,3,2] → 19/7 = 2.714
    expect(overall.score).toBeCloseTo(2.7, 5)
    expect(overall.max).toBe(3)
    expect(overall.percentage).toBe(90)
    expect(overall.pass).toBe(true)
  })
})

describe('critiquePrompt — end to end (mocked gateway)', () => {
  it('returns grounded criteria + overall + judge meta + grader extras', async () => {
    const { fetchImpl } = makeJudgeFetch(goodEnvelope())
    const result = await critiquePrompt({ targetPrompt: TARGET, userKey: 'sk-or-user', fetchImpl })

    expect(result.flagged).toBe(false)
    expect(result.rubricId).toBe('prompt-quality')
    expect(result.rubricVersion).toMatch(/^v1-/)
    expect(result.criteria).toHaveLength(5)
    result.criteria.forEach(c => {
      expect(c.justification.length).toBeGreaterThan(0) // grounded
    })
    expect(result.overall.pass).toBe(true)
    expect(result.summary).toBe('Strong, specific prompt.')
    expect(result.failureModes).toHaveLength(1)
    expect(result.rewrite).toContain('[PRODUCT]')
    expect(result.judge.model).toBe('claude-opus-4-7')
    expect(result.judge.fundedBy).toBe('user')
  })

  it('judges with the user key (zero studio spend) and never leaks it', async () => {
    const { fetchImpl, calls } = makeJudgeFetch(goodEnvelope({ summary: 'ok' }))
    const result = await critiquePrompt({
      targetPrompt: TARGET,
      userKey: 'sk-or-SECRET',
      studioFreeKey: 'sk-or-STUDIO',
      fetchImpl,
    })
    expect(calls[0].auth).toBe('Bearer sk-or-SECRET')
    expect(JSON.stringify(result)).not.toContain('sk-or-SECRET')
  })

  it('surfaces a malformed judge response as an error, not an ungrounded score', async () => {
    const bad = goodCriteria()
    bad[0].justification = ''
    const { fetchImpl } = makeJudgeFetch(goodEnvelope({ criteria: bad }))
    await expect(
      critiquePrompt({ targetPrompt: TARGET, userKey: 'sk-or-user', fetchImpl })
    ).rejects.toThrow(MalformedCritiqueError)
  })

  it('throws on an unknown rubric', async () => {
    const { fetchImpl } = makeJudgeFetch(goodEnvelope())
    await expect(
      critiquePrompt({ targetPrompt: TARGET, rubricId: 'nope', userKey: 'k', fetchImpl })
    ).rejects.toThrow(UnknownRubricError)
  })

  it('rejects an empty target prompt', async () => {
    await expect(critiquePrompt({ targetPrompt: '', userKey: 'k' })).rejects.toThrow(MalformedCritiqueError)
  })
})

describe('grounding match is punctuation-tolerant, not fabrication-tolerant', () => {
  it('accepts a span whose punctuation the judge normalized', () => {
    const c = goodCriteria()
    c[2].evidence_span = 'Keep the tone, friendly' // judge inserted a comma
    const results = parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET)
    expect(results[2].score).toBe(2)
  })

  it('still rejects invented words', () => {
    const c = goodCriteria()
    c[2].evidence_span = 'Keep the tone strictly formal'
    expect(() => parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET)).toThrow(/fabricated/)
  })

  it('rejects a punctuation-only span', () => {
    const c = goodCriteria()
    c[2].evidence_span = '"...!"'
    expect(() => parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET)).toThrow(/fabricated/)
  })
})

describe('salvage mode (judge retry)', () => {
  it('drops an unverifiable span but keeps the justified score', () => {
    const c = goodCriteria()
    c[2].evidence_span = 'friendly tone keep the' // reordered — unverifiable
    const results = parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET, { salvage: true })
    expect(results[2]).toMatchObject({ id: 'constraints', score: 2, grounded: false, evidenceSpan: '' })
    expect(results[0].grounded).toBe(true)
  })

  it('still throws on a missing justification even in salvage mode', () => {
    const c = goodCriteria()
    c[1].justification = ''
    expect(() => parseJudgeResponse(JSON.stringify({ criteria: c }), RUBRIC, TARGET, { salvage: true })).toThrow(
      /ungrounded/
    )
  })
})
