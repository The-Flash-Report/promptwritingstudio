import { gateway } from '../../lib/gateway'
import { listModels, getModel } from '../../lib/gateway/models'
import { MissingKeyError, AuthProviderError, BadRequestError } from '../../lib/gateway/errors'

// A fake OpenRouter that records what it was called with, so we can assert on
// the Authorization header (which key was actually used) without a network call.
function makeFakeFetch({ usage = { prompt_tokens: 100, completion_tokens: 50 }, status = 200 } = {}) {
  const calls = []
  const fetchImpl = async (url, opts) => {
    calls.push({ url, opts })
    if (status !== 200) {
      return { ok: false, status, json: async () => ({}) }
    }
    return {
      ok: true,
      status: 200,
      json: async () => ({
        id: 'gen-123',
        choices: [{ message: { content: 'hello from the model' } }],
        usage,
      }),
    }
  }
  return { fetchImpl, calls }
}

describe('gateway.complete — Phase 0', () => {
  it('runs a BYOK prompt end-to-end and returns output + tokens + cost + latency', async () => {
    const { fetchImpl, calls } = makeFakeFetch()
    const result = await gateway.complete({
      prompt: 'Explain recursion',
      model: 'claude-sonnet-4-6',
      userKey: 'sk-or-user-XYZ',
      fetchImpl,
    })

    expect(result.output).toBe('hello from the model')
    expect(result.tokensIn).toBe(100)
    expect(result.tokensOut).toBe(50)
    expect(typeof result.latencyMs).toBe('number')
    // Sonnet: input $3/1M, output $15/1M → 100/1e6*3 + 50/1e6*15 = 0.00105
    expect(result.costUsd).toBeCloseTo(0.00105, 8)
    expect(result.fundedBy).toBe('user')
    expect(calls).toHaveLength(1)
  })

  it('BYOK uses the user key and incurs ZERO studio-funded spend', async () => {
    const { fetchImpl, calls } = makeFakeFetch()
    const result = await gateway.complete({
      prompt: 'hi',
      model: 'gpt-4o',
      userKey: 'sk-or-user-XYZ',
      studioFreeKey: 'sk-or-STUDIO-should-not-be-used',
      fetchImpl,
    })

    // The provider was authorized with the USER key, not the studio key.
    expect(calls[0].opts.headers.Authorization).toBe('Bearer sk-or-user-XYZ')
    expect(result.fundedBy).toBe('user')
  })

  it('never leaks the key in the returned result object', async () => {
    const { fetchImpl } = makeFakeFetch()
    const result = await gateway.complete({
      prompt: 'hi',
      model: 'gpt-4o',
      userKey: 'sk-or-SECRET-123',
      fetchImpl,
    })
    expect(JSON.stringify(result)).not.toContain('sk-or-SECRET-123')
    expect(result).not.toHaveProperty('userKey')
    expect(result).not.toHaveProperty('apiKey')
  })

  it('falls back to the studio key ONLY for free-tier models', async () => {
    const { fetchImpl, calls } = makeFakeFetch({ usage: { prompt_tokens: 10, completion_tokens: 10 } })
    const result = await gateway.complete({
      prompt: 'hi',
      model: 'llama-3.3-70b-free',
      userKey: null,
      studioFreeKey: 'sk-or-STUDIO',
      fetchImpl,
    })
    expect(calls[0].opts.headers.Authorization).toBe('Bearer sk-or-STUDIO')
    expect(result.fundedBy).toBe('studio')
    expect(result.costUsd).toBeNull() // free model has no pricing entry
  })

  it('refuses a paid model when no user key is supplied', async () => {
    const { fetchImpl, calls } = makeFakeFetch()
    await expect(
      gateway.complete({ prompt: 'hi', model: 'gpt-4o', userKey: null, studioFreeKey: 'sk-or-STUDIO', fetchImpl })
    ).rejects.toThrow(MissingKeyError)
    expect(calls).toHaveLength(0) // never reached the provider
  })

  it('maps a 401 from the provider to AuthProviderError', async () => {
    const { fetchImpl } = makeFakeFetch({ status: 401 })
    await expect(
      gateway.complete({ prompt: 'hi', model: 'gpt-4o', userKey: 'bad', fetchImpl })
    ).rejects.toThrow(AuthProviderError)
  })

  it('rejects an empty prompt', async () => {
    const { fetchImpl } = makeFakeFetch()
    await expect(
      gateway.complete({ prompt: '', model: 'gpt-4o', userKey: 'k', fetchImpl })
    ).rejects.toThrow(BadRequestError)
  })

  it('swapping a model is a config change, not a code change', async () => {
    // Every registered model resolves through the same complete() path with no
    // model-specific branches in the gateway.
    const ids = listModels().map(m => m.id)
    expect(ids.length).toBeGreaterThanOrEqual(3)
    for (const id of ids) {
      const { fetchImpl } = makeFakeFetch()
      const cfg = getModel(id)
      const result = await gateway.complete({
        prompt: 'x',
        model: id,
        userKey: 'sk-or-user',
        fetchImpl,
      })
      expect(result.model).toBe(id)
      expect(result.route).toBe(cfg.route)
    }
  })
})
