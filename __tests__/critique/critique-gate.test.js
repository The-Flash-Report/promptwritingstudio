import handler from '../../pages/api/studio/critique'
import { signEntitlement } from '../../lib/studio/entitlements'

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

describe('critique endpoint gating — Phase 4 wiring', () => {
  const realSecret = process.env.STUDIO_ENTITLEMENT_SECRET
  beforeAll(() => {
    process.env.STUDIO_ENTITLEMENT_SECRET = SECRET
  })
  afterAll(() => {
    process.env.STUDIO_ENTITLEMENT_SECRET = realSecret
  })

  it('blocks a free caller with 402 upgrade_required (no provider call)', async () => {
    const req = { method: 'POST', headers: {}, body: { targetPrompt: 'do a thing' } }
    const res = mockRes()
    await handler(req, res)
    expect(res.statusCode).toBe(402)
    expect(res.body.code).toBe('upgrade_required')
  })

  it('lets a paid caller past the gate (GET rubric list stays open to all)', async () => {
    // GET is open regardless of tier.
    const getRes = mockRes()
    await handler({ method: 'GET', headers: {} }, getRes)
    expect(getRes.statusCode).toBe(200)
    expect(Array.isArray(getRes.body.rubrics)).toBe(true)

    // A valid paid token passes the gate; with no key + empty body it then fails
    // *inside* critique (bad target / no key) — i.e. NOT a 402, proving the gate
    // let it through.
    const token = signEntitlement({ tier: 'paid' }, SECRET)
    const req = {
      method: 'POST',
      headers: { 'x-studio-entitlement': token },
      body: { targetPrompt: '' }, // invalid on purpose
    }
    const res = mockRes()
    await handler(req, res)
    expect(res.statusCode).not.toBe(402)
  })
})
