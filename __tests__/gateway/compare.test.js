import { compareModels } from '../../lib/gateway/compare'

// Fake OpenRouter whose behaviour is keyed by model slug so we can make some
// models succeed and others fail within one batch. Records Authorization
// headers so we can assert which key funded each call.
function makeFakeFetch(behaviour = {}) {
  const calls = []
  let inFlight = 0
  let maxInFlight = 0
  const fetchImpl = async (url, opts) => {
    inFlight++
    maxInFlight = Math.max(maxInFlight, inFlight)
    calls.push({ slug: JSON.parse(opts.body).model, auth: opts.headers.Authorization })
    await new Promise(r => setTimeout(r, 5)) // let parallelism overlap
    inFlight--
    const slug = JSON.parse(opts.body).model
    const status = behaviour[slug]?.status ?? 200
    if (status !== 200) {
      return { ok: false, status, json: async () => ({}) }
    }
    return {
      ok: true,
      status: 200,
      json: async () => ({
        id: `gen-${slug}`,
        choices: [{ message: { content: `out:${slug}` } }],
        usage: { prompt_tokens: 100, completion_tokens: 50 },
      }),
    }
  }
  return { fetchImpl, calls, getMaxInFlight: () => maxInFlight }
}

const noSleep = async () => {}

describe('compareModels — Phase 1', () => {
  it('runs ≥3 models and returns a result + tokens + cost + latency per model', async () => {
    const { fetchImpl } = makeFakeFetch()
    const { results, totals } = await compareModels({
      prompt: 'hi',
      models: ['claude-sonnet-4-6', 'gpt-4o', 'gemini-2-5-pro'],
      userKey: 'sk-or-user',
      fetchImpl,
    })

    expect(results).toHaveLength(3)
    results.forEach(r => {
      expect(r.ok).toBe(true)
      expect(r.output).toMatch(/^out:/)
      expect(r.tokensIn).toBe(100)
      expect(r.tokensOut).toBe(50)
      expect(typeof r.latencyMs).toBe('number')
    })
    expect(totals.succeeded).toBe(3)
    expect(totals.failed).toBe(0)
    // 3 × (100/1e6*input + 50/1e6*output); all > 0, summed.
    expect(totals.costUsd).toBeGreaterThan(0)
  })

  it('preserves input order', async () => {
    const { fetchImpl } = makeFakeFetch()
    const { results } = await compareModels({
      prompt: 'hi',
      models: ['gpt-4o', 'claude-sonnet-4-6', 'gemini-2-5-pro'],
      userKey: 'sk-or-user',
      fetchImpl,
    })
    expect(results.map(r => r.model)).toEqual(['gpt-4o', 'claude-sonnet-4-6', 'gemini-2-5-pro'])
  })

  it('actually runs models in parallel (bounded by concurrency)', async () => {
    const { fetchImpl, getMaxInFlight } = makeFakeFetch()
    await compareModels({
      prompt: 'hi',
      models: ['claude-sonnet-4-6', 'gpt-4o', 'gemini-2-5-pro', 'claude-opus-4-7'],
      userKey: 'sk-or-user',
      concurrency: 4,
      fetchImpl,
    })
    expect(getMaxInFlight()).toBeGreaterThan(1)
  })

  it('one model failing does not sink the batch', async () => {
    const { fetchImpl } = makeFakeFetch({ 'openai/gpt-4o': { status: 500 } })
    const { results, totals } = await compareModels({
      prompt: 'hi',
      models: ['claude-sonnet-4-6', 'gpt-4o', 'gemini-2-5-pro'],
      userKey: 'sk-or-user',
      fetchImpl,
      retries: 0,
    })
    const failed = results.find(r => !r.ok)
    expect(failed.model).toBe('gpt-4o')
    expect(failed.code).toBe('upstream_error')
    expect(totals.succeeded).toBe(2)
    expect(totals.failed).toBe(1)
  })

  it('retries transient failures with backoff', async () => {
    let attempts = 0
    const fetchImpl = async (url, opts) => {
      attempts++
      if (attempts < 2) return { ok: false, status: 429, json: async () => ({}) }
      return {
        ok: true,
        status: 200,
        json: async () => ({
          id: 'g',
          choices: [{ message: { content: 'ok' } }],
          usage: { prompt_tokens: 1, completion_tokens: 1 },
        }),
      }
    }
    const { results } = await compareModels({
      prompt: 'hi',
      models: ['gpt-4o'],
      userKey: 'sk-or-user',
      fetchImpl,
      retries: 2,
      sleepImpl: noSleep,
    })
    expect(results[0].ok).toBe(true)
    expect(attempts).toBe(2)
  })

  it('de-dupes repeated models', async () => {
    const { fetchImpl, calls } = makeFakeFetch()
    const { results } = await compareModels({
      prompt: 'hi',
      models: ['gpt-4o', 'gpt-4o', 'claude-sonnet-4-6'],
      userKey: 'sk-or-user',
      fetchImpl,
    })
    expect(results).toHaveLength(2)
    expect(calls).toHaveLength(2)
  })

  it('BYOK fan-out funds every call with the user key (zero studio spend)', async () => {
    const { fetchImpl, calls } = makeFakeFetch()
    const { results } = await compareModels({
      prompt: 'hi',
      models: ['claude-sonnet-4-6', 'gpt-4o'],
      userKey: 'sk-or-USER',
      studioFreeKey: 'sk-or-STUDIO',
      fetchImpl,
    })
    calls.forEach(c => expect(c.auth).toBe('Bearer sk-or-USER'))
    results.forEach(r => expect(r.fundedBy).toBe('user'))
  })

  it('never leaks the key in the results', async () => {
    const { fetchImpl } = makeFakeFetch()
    const out = await compareModels({
      prompt: 'hi',
      models: ['gpt-4o'],
      userKey: 'sk-or-SECRET-xyz',
      fetchImpl,
    })
    expect(JSON.stringify(out)).not.toContain('sk-or-SECRET-xyz')
  })

  it('throws on an empty models array', async () => {
    await expect(compareModels({ prompt: 'hi', models: [], userKey: 'k' })).rejects.toThrow()
  })
})
