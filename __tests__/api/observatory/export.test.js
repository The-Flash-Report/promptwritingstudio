import { _resetStoreForTesting } from '../../../lib/observatory/rateLimit'

jest.mock('../../../lib/observatory/loadRuns', () => ({
  loadAllRuns: jest.fn(),
}))

jest.mock('https', () => ({
  request: jest.fn(() => ({ on: jest.fn(), write: jest.fn(), end: jest.fn() })),
}))

import { loadAllRuns } from '../../../lib/observatory/loadRuns'
import handler from '../../../pages/api/observatory/export'

const FIXTURE_RUN = {
  schema_version: 1,
  run_id: '2026-05-31',
  prompt_id: 'code-explain-recursive',
  prompt_schema_version_at_run: 1,
  started_at: '2026-05-31T03:00:00Z',
  completed_at: '2026-05-31T03:10:00Z',
  results_by_input: [
    {
      test_input_id: 'fibonacci-python',
      results_by_model: [
        {
          model: 'claude-sonnet-4-6',
          output: 'This function computes fibonacci.',
          judge: {
            primary: {
              criteria_scores: [3, 2],
              total: 5,
              pass: true,
              judge_model: 'claude-opus-4-7',
              judge_run_at: '2026-05-31T03:08:00Z',
            },
            cross_check: null,
          },
          tokens_in: 100,
          tokens_out: 50,
          cost_usd: 0.002,
          provider_response_id: 'msg_abc',
          completed_at: '2026-05-31T03:05:00Z',
          error: null,
        },
      ],
    },
  ],
  delta_vs_previous_run: {
    previous_run_id: '2026-05-24',
    by_model: {
      'claude-sonnet-4-6': { score_change: 0, output_diff_ratio: 0.1, flagged: false },
    },
  },
  totals: { calls: 1, successful_calls: 1, failed_calls: 0, cost_usd: 0.002 },
}

function mockReq(overrides = {}) {
  return {
    method: 'GET',
    query: {},
    headers: {},
    socket: { remoteAddress: '127.0.0.1' },
    url: '/api/observatory/export',
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

describe('GET /api/observatory/export', () => {
  test('returns CSV with correct headers when runs exist', () => {
    loadAllRuns.mockReturnValue([FIXTURE_RUN])

    const req = mockReq()
    const res = mockRes()
    handler(req, res)

    expect(res.statusCode).toBe(200)
    expect(res._headers['Content-Type']).toContain('text/csv')
    expect(res._headers['Content-Disposition']).toMatch(/attachment; filename="pws-observatory-\d{4}-\d{2}-\d{2}\.csv"/)

    const lines = res._body.split('\n')
    expect(lines[0]).toBe('run_id,prompt_id,test_input_id,model,score_total,pass,cost_usd,tokens_in,tokens_out,flagged,error')
  })

  test('CSV data row matches fixture values', () => {
    loadAllRuns.mockReturnValue([FIXTURE_RUN])

    const req = mockReq()
    const res = mockRes()
    handler(req, res)

    const lines = res._body.split('\n')
    expect(lines).toHaveLength(2) // header + 1 data row
    const row = lines[1].split(',')
    expect(row[0]).toBe('2026-05-31')           // run_id
    expect(row[1]).toBe('code-explain-recursive') // prompt_id
    expect(row[2]).toBe('fibonacci-python')       // test_input_id
    expect(row[3]).toBe('claude-sonnet-4-6')      // model
    expect(row[4]).toBe('5')                      // score_total
    expect(row[5]).toBe('true')                   // pass
    expect(row[9]).toBe('false')                  // flagged
  })

  test('returns CSV header row only when no runs exist', () => {
    loadAllRuns.mockReturnValue([])

    const req = mockReq()
    const res = mockRes()
    handler(req, res)

    expect(res.statusCode).toBe(200)
    const lines = res._body.split('\n').filter(Boolean)
    expect(lines).toHaveLength(1)
    expect(lines[0]).toContain('run_id')
  })

  test('returns 405 for non-GET requests', () => {
    const req = mockReq({ method: 'POST' })
    const res = mockRes()
    handler(req, res)

    expect(res.statusCode).toBe(405)
  })

  test('returns 429 after rate limit is exceeded', () => {
    loadAllRuns.mockReturnValue([])

    const ip = '10.0.0.2'
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
