// Endpoint policy for the Prompt Grader (DECISIONS.md D3): critique is FREE
// but METERED for keyless callers (3/day/IP); BYOK and paid entitlements skip
// the meter. These tests run with no ANTHROPIC_API_KEY so the gateway throws
// MissingKeyError (401) — reaching 401 proves the caller passed the gate and
// the meter; a metered-out caller gets 429 before any provider work.

import handler from '../../pages/api/studio/critique'
import { signEntitlement } from '../../lib/studio/entitlements'
import { _resetGradeStoreForTesting, GRADES_DAILY_MAX } from '../../lib/studio/rateLimit'

const SECRET = 'gate-test-secret'

function mockRes() {
  const res = { statusCode: null, body: null, headers: {} }
  res.status = code => {
    res.statusCode = code
    return res
  }
  res.json = payload => {
    res.body = payload
    return res
  }
  res.setHeader = (k, v) => {
    res.headers[k] = v
  }
  return res
}

function postReq({ headers = {}, ip = '1.2.3.4', body = { targetPrompt: 'do a thing' } } = {}) {
  return { method: 'POST', headers: { 'x-forwarded-for': ip, ...headers }, body }
}

describe('critique endpoint — free-metered grader policy', () => {
  const realSecret = process.env.STUDIO_ENTITLEMENT_SECRET
  const realAnthropicKey = process.env.ANTHROPIC_API_KEY
  beforeAll(() => {
    process.env.STUDIO_ENTITLEMENT_SECRET = SECRET
    delete process.env.ANTHROPIC_API_KEY // force MissingKeyError past the meter
  })
  afterAll(() => {
    process.env.STUDIO_ENTITLEMENT_SECRET = realSecret
    if (realAnthropicKey !== undefined) process.env.ANTHROPIC_API_KEY = realAnthropicKey
  })
  beforeEach(() => _resetGradeStoreForTesting())

  it('GET lists rubrics without auth', async () => {
    const res = mockRes()
    await handler({ method: 'GET', headers: {} }, res)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.rubrics)).toBe(true)
  })

  it('rejects a missing targetPrompt with 400 before metering', async () => {
    const res = mockRes()
    await handler(postReq({ body: {} }), res)
    expect(res.statusCode).toBe(400)
    // A bad request must not consume a grade.
    const res2 = mockRes()
    await handler(postReq(), res2)
    expect(res2.statusCode).toBe(401) // reached the gateway ⇒ meter had a slot
  })

  it('lets a keyless free caller through the gate (no 402)', async () => {
    const res = mockRes()
    await handler(postReq(), res)
    expect(res.statusCode).toBe(401) // MissingKeyError from the gateway, NOT 402/429
    expect(res.body.code).toBe('missing_key')
  })

  it(`meters keyless callers at ${GRADES_DAILY_MAX}/day/IP with 429 after`, async () => {
    for (let i = 0; i < GRADES_DAILY_MAX; i++) {
      const res = mockRes()
      await handler(postReq(), res)
      expect(res.statusCode).toBe(401) // allowed through the meter
    }
    const res = mockRes()
    await handler(postReq(), res)
    expect(res.statusCode).toBe(429)
    expect(res.body.code).toBe('rate_limited')
    expect(res.body.meter).toEqual({ remaining: 0, limit: GRADES_DAILY_MAX })
  })

  it('meters per IP, not globally', async () => {
    for (let i = 0; i < GRADES_DAILY_MAX; i++) {
      await handler(postReq({ ip: '9.9.9.9' }), mockRes())
    }
    const res = mockRes()
    await handler(postReq({ ip: '8.8.8.8' }), res)
    expect(res.statusCode).toBe(401) // fresh IP, fresh meter
  })

  it('a valid paid token skips the meter entirely', async () => {
    const token = signEntitlement({ tier: 'paid' }, SECRET)
    for (let i = 0; i < GRADES_DAILY_MAX + 2; i++) {
      const res = mockRes()
      await handler(postReq({ headers: { 'x-studio-entitlement': token } }), res)
      expect(res.statusCode).toBe(401) // never 429
    }
  })

  it('rejects an oversized prompt with 400', async () => {
    const res = mockRes()
    await handler(postReq({ body: { targetPrompt: 'x'.repeat(8001) } }), res)
    expect(res.statusCode).toBe(400)
  })
})
