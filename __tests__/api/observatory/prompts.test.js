import { _resetStoreForTesting } from '../../../lib/observatory/rateLimit'

// Mock the data loaders so tests don't touch the filesystem
jest.mock('../../../lib/observatory/loadRuns', () => ({
  loadPrompt: jest.fn(),
  loadAllRunsForPrompt: jest.fn(),
}))

// Silence the https module so Plausible events don't fire in tests
jest.mock('https', () => ({
  request: jest.fn(() => ({ on: jest.fn(), write: jest.fn(), end: jest.fn() })),
}))

import { loadPrompt, loadAllRunsForPrompt } from '../../../lib/observatory/loadRuns'
import handler from '../../../pages/api/observatory/prompts/[id]'

const FIXTURE_PROMPT = {
  id: 'code-explain-recursive',
  category: 'code',
  title: 'Explain a recursive function',
  prompt: 'Here is a recursive function…',
  test_inputs: [{ id: 'fibonacci-python', vars: { code: 'def fib(n): ...' } }],
  rubric: { criteria: ['Base case'], scoring_per_criterion: '0-3', pass_threshold: 2, judge_prompt_template: 'default' },
  models: ['claude-sonnet-4-6'],
  affiliate_tool_default: 'claude',
  added_date: '2026-05-23',
  schema_version: 1,
}

const FIXTURE_RUN = {
  schema_version: 1,
  run_id: '2026-05-31',
  prompt_id: 'code-explain-recursive',
  prompt_schema_version_at_run: 1,
  started_at: '2026-05-31T03:00:00Z',
  completed_at: '2026-05-31T03:10:00Z',
  results_by_input: [],
  delta_vs_previous_run: null,
  totals: { calls: 0, successful_calls: 0, failed_calls: 0, cost_usd: 0 },
}

function mockReq(overrides = {}) {
  return {
    method: 'GET',
    query: { id: 'code-explain-recursive' },
    headers: {},
    socket: { remoteAddress: '127.0.0.1' },
    url: '/api/observatory/prompts/code-explain-recursive',
    ...overrides,
  }
}

function mockRes() {
  const res = {
    statusCode: 200,
    _headers: {},
    _body: null,
    status(code) { this.statusCode = code; return this },
    json(data) { this._body = data; return this },
    send(data) { this._body = data; return this },
    setHeader(k, v) { this._headers[k] = v; return this },
  }
  return res
}

beforeEach(() => {
  _resetStoreForTesting()
  jest.clearAllMocks()
})

describe('GET /api/observatory/prompts/[id]', () => {
  test('returns valid JSON shape for known prompt', () => {
    loadPrompt.mockReturnValue(FIXTURE_PROMPT)
    loadAllRunsForPrompt.mockReturnValue([FIXTURE_RUN])

    const req = mockReq()
    const res = mockRes()
    handler(req, res)

    expect(res.statusCode).toBe(200)
    expect(res._body).toMatchObject({
      schema_version: 1,
      prompt_id: 'code-explain-recursive',
      prompt: expect.objectContaining({ id: 'code-explain-recursive' }),
      runs: expect.arrayContaining([expect.objectContaining({ run_id: '2026-05-31' })]),
    })
    expect(res._headers['Cache-Control']).toContain('max-age=86400')
  })

  test('returns 404 for unknown prompt', () => {
    loadPrompt.mockReturnValue(null)

    const req = mockReq({ query: { id: 'nonexistent-prompt' } })
    const res = mockRes()
    handler(req, res)

    expect(res.statusCode).toBe(404)
    expect(res._body).toMatchObject({ error: expect.stringContaining('not found') })
  })

  test('returns 400 for invalid prompt id format', () => {
    const req = mockReq({ query: { id: '../etc/passwd' } })
    const res = mockRes()
    handler(req, res)

    expect(res.statusCode).toBe(400)
  })

  test('returns 405 for non-GET requests', () => {
    const req = mockReq({ method: 'POST' })
    const res = mockRes()
    handler(req, res)

    expect(res.statusCode).toBe(405)
  })

  test('returns 429 after rate limit is exceeded', () => {
    loadPrompt.mockReturnValue(FIXTURE_PROMPT)
    loadAllRunsForPrompt.mockReturnValue([])

    // Hit the limit (60 req/hr default). Use a distinct IP per iteration group
    // by controlling headers. Since we want to test exhaustion, we call 61 times
    // with the same IP (empty headers → 'unknown').
    const ip = '10.0.0.1'
    for (let i = 0; i < 60; i++) {
      const req = mockReq({ headers: { 'x-forwarded-for': ip } })
      const res = mockRes()
      handler(req, res)
      expect(res.statusCode).toBe(200)
    }

    const req = mockReq({ headers: { 'x-forwarded-for': ip } })
    const res = mockRes()
    handler(req, res)
    expect(res.statusCode).toBe(429)
  })
})
