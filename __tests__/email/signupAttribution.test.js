import emailHandler from '../../pages/api/grade/[id]/email'
import { _resetReportEmailStoreForTesting } from '../../lib/grades/emailRateLimit'
import { getRecord } from '../../lib/grades/store'

jest.mock('../../lib/grades/store', () => ({
  getRecord: jest.fn(),
}))

const submissionCreated = require('../../netlify/functions/submission-created')

function createMockRes() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value
    },
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
}

function sampleGradeRecord() {
  return {
    id: 'grade-123',
    public: false,
    flagged: false,
    grade: {
      flagged: false,
      rubricId: 'prompt-quality',
      rubricVersion: 3,
      scale: { min: 0, max: 4 },
      target: 'claude',
      overall: { score: 3, max: 4, percentage: 75, pass: true },
      summary: 'Strong prompt.',
      failureModes: [],
      criteria: [
        {
          id: 'clarity',
          name: 'Clarity',
          score: 3,
          justification: 'Specific task.',
          evidenceSpan: 'Write a summary',
          grounded: true,
        },
      ],
      rewrite: 'You are an editor. Write a summary of [TEXT].',
    },
  }
}

describe('R268 signup attribution', () => {
  const origEnv = { ...process.env }
  const origFetch = global.fetch

  beforeEach(() => {
    process.env.RESEND_API_KEY = 're_test_key'
    process.env.RESEND_SEGMENT_ID = 'seg_pws_123'
    _resetReportEmailStoreForTesting()
  })

  afterEach(() => {
    process.env = { ...origEnv }
    global.fetch = origFetch
    jest.restoreAllMocks()
  })

  describe('netlify/functions/submission-created.js', () => {
    it('creates contact, patches all 6 attribution fields when new, fires welcome event, and emits PostHog Signup Confirmed with $host', async () => {
      const calls = []
      global.fetch = jest.fn(async (url, opts = {}) => {
        calls.push({ url, method: opts.method || 'GET', body: opts.body ? JSON.parse(opts.body) : null })
        if (url.includes('/audiences/seg_pws_123/contacts/') && (opts.method === 'GET' || !opts.method)) {
          return { ok: false, status: 404, json: async () => ({}) }
        }
        if (url.endsWith('/audiences/seg_pws_123/contacts') && opts.method === 'POST') {
          return { ok: true, status: 200, json: async () => ({ id: 'c_1' }) }
        }
        if (url.includes('/contacts/reader%40example.com') && opts.method === 'PATCH') {
          return { ok: true, status: 200, json: async () => ({ id: 'c_1' }) }
        }
        if (url.endsWith('/events/send') && opts.method === 'POST') {
          return { ok: true, status: 200, json: async () => ({ sent: true }) }
        }
        if (url.includes('eu.i.posthog.com')) {
          return { ok: true, status: 200, json: async () => ({ status: 1 }) }
        }
        throw new Error(`Unexpected fetch: ${url}`)
      })

      const resp = await submissionCreated.handler({
        headers: { referer: 'https://promptwritingstudio.com/claude-code-guide?utm_source=x' },
        body: JSON.stringify({
          payload: {
            form_name: 'pws-newsletter',
            data: {
              email: 'Reader@Example.com',
              source: 'footer',
              form_id: 'promptwritingstudio@footer',
              signup_page: '/claude-code-guide',
              signup_utm_source: 'newsletter',
              signup_utm_medium: 'email',
              signup_utm_campaign: 'r268',
              signup_referrer: 'google.com',
            },
          },
        }),
      })

      expect(resp.statusCode).toBe(200)
      expect(resp.body).toBe('sent')

      const patchCall = calls.find(c => c.method === 'PATCH' && c.url.includes('/contacts/reader%40example.com'))
      expect(patchCall).toBeDefined()
      expect(patchCall.body).toEqual({
        properties: {
          source_surface: 'promptwritingstudio@footer',
          signup_page: '/claude-code-guide',
          signup_utm_source: 'newsletter',
          signup_utm_medium: 'email',
          signup_utm_campaign: 'r268',
          signup_referrer: 'google.com',
        },
      })

      const welcomeCall = calls.find(c => c.url.endsWith('/events/send'))
      expect(welcomeCall).toBeDefined()

      const phCall = calls.find(c => c.url.includes('eu.i.posthog.com'))
      expect(phCall).toBeDefined()
      expect(phCall.body.event).toBe('Signup Confirmed')
      expect(phCall.body.properties.$host).toBe('promptwritingstudio.com')
      expect(phCall.body.properties.$process_person_profile).toBe(false)
      expect(phCall.body.properties.form_id).toBe('promptwritingstudio@footer')
      expect(phCall.body.properties.signup_page).toBe('/claude-code-guide')
      expect(phCall.body.properties.is_new).toBe(true)
      expect(phCall.body.properties.labelled).toBe(true)
    })

    it('skips fireWelcomeEvent on repeat signups and applies set-if-empty (overwriting "unknown" but preserving existing values)', async () => {
      const calls = []
      global.fetch = jest.fn(async (url, opts = {}) => {
        calls.push({ url, method: opts.method || 'GET', body: opts.body ? JSON.parse(opts.body) : null })
        if (url.includes('/audiences/seg_pws_123/contacts/') && (opts.method === 'GET' || !opts.method)) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              id: 'c_existing',
              properties: {
                source_surface: 'unknown',
                signup_page: '/original-page',
                signup_utm_source: 'first-touch',
              },
            }),
          }
        }
        if (url.endsWith('/audiences/seg_pws_123/contacts') && opts.method === 'POST') {
          return { ok: false, status: 409, text: async () => 'Contact already exists' }
        }
        if (url.includes('/contacts/repeat%40example.com') && opts.method === 'PATCH') {
          return { ok: true, status: 200, json: async () => ({ id: 'c_existing' }) }
        }
        if (url.includes('eu.i.posthog.com')) {
          return { ok: true, status: 200, json: async () => ({ status: 1 }) }
        }
        throw new Error(`Unexpected fetch: ${url}`)
      })

      const resp = await submissionCreated.handler({
        headers: {},
        body: JSON.stringify({
          payload: {
            form_name: 'pws-newsletter',
            referrer: 'https://promptwritingstudio.com/second-page',
            data: {
              email: 'repeat@example.com',
              source: 'popup',
              signup_utm_source: 'second-touch',
              signup_utm_medium: 'social',
            },
          },
        }),
      })

      expect(resp.statusCode).toBe(200)
      const welcomeCall = calls.find(c => c.url.endsWith('/events/send'))
      expect(welcomeCall).toBeUndefined()

      const patchCall = calls.find(c => c.method === 'PATCH')
      expect(patchCall).toBeDefined()
      // source_surface was "unknown" so it gets filled; signup_page and signup_utm_source were already set so preserved; signup_utm_medium was empty so filled
      expect(patchCall.body).toEqual({
        properties: {
          source_surface: 'promptwritingstudio@popup',
          signup_utm_medium: 'social',
        },
      })

      const phCall = calls.find(c => c.url.includes('eu.i.posthog.com'))
      expect(phCall.body.event).toBe('Signup Confirmed')
      expect(phCall.body.properties.is_new).toBe(false)
      expect(phCall.body.properties.$host).toBe('promptwritingstudio.com')
    })

    it('emits Signup Failed to PostHog when Resend add-contact fails with 500', async () => {
      const calls = []
      global.fetch = jest.fn(async (url, opts = {}) => {
        calls.push({ url, method: opts.method || 'GET', body: opts.body ? JSON.parse(opts.body) : null })
        if (url.includes('/audiences/seg_pws_123/contacts/') && (opts.method === 'GET' || !opts.method)) {
          return { ok: false, status: 404, json: async () => ({}) }
        }
        if (url.endsWith('/audiences/seg_pws_123/contacts') && opts.method === 'POST') {
          return { ok: false, status: 500, text: async () => 'Internal error' }
        }
        if (url.includes('eu.i.posthog.com')) {
          return { ok: true, status: 200, json: async () => ({ status: 1 }) }
        }
        throw new Error(`Unexpected fetch: ${url}`)
      })

      const resp = await submissionCreated.handler({
        headers: {},
        body: JSON.stringify({
          payload: {
            form_name: 'pws-newsletter',
            data: { email: 'fail@example.com', source: 'homepage' },
          },
        }),
      })

      expect(resp.statusCode).toBe(500)
      const phCall = calls.find(c => c.url.includes('eu.i.posthog.com'))
      expect(phCall).toBeDefined()
      expect(phCall.body.event).toBe('Signup Failed')
      expect(phCall.body.properties.$host).toBe('promptwritingstudio.com')
      expect(phCall.body.properties.reason).toBe('resend_write_failed')
    })
  })

  describe('pages/api/grade/[id]/email.js', () => {
    it('sends report email, patches attribution via set-if-empty with promptwritingstudio@grade-report-email, and emits Signup Confirmed', async () => {
      getRecord.mockResolvedValue(sampleGradeRecord())

      const calls = []
      global.fetch = jest.fn(async (url, opts = {}) => {
        calls.push({ url, method: opts.method || 'GET', body: opts.body ? JSON.parse(opts.body) : null })
        if (url.endsWith('/emails') && opts.method === 'POST') {
          return { ok: true, status: 200, json: async () => ({ id: 'em_1' }) }
        }
        if (url.includes('/audiences/seg_pws_123/contacts/') && (opts.method === 'GET' || !opts.method)) {
          return {
            ok: true,
            status: 200,
            json: async () => ({
              id: 'c_1',
              properties: {
                source_surface: 'bawt@word-bank',
                signup_page: '',
              },
            }),
          }
        }
        if (url.endsWith('/audiences/seg_pws_123/contacts') && opts.method === 'POST') {
          return { ok: true, status: 200, json: async () => ({ id: 'c_1' }) }
        }
        if (url.includes('/contacts/grader%40example.com') && opts.method === 'PATCH') {
          return { ok: true, status: 200, json: async () => ({ id: 'c_1' }) }
        }
        if (url.includes('eu.i.posthog.com')) {
          return { ok: true, status: 200, json: async () => ({ status: 1 }) }
        }
        throw new Error(`Unexpected fetch: ${url}`)
      })

      const req = {
        method: 'POST',
        query: { id: 'grade-123' },
        headers: {
          host: 'promptwritingstudio.com',
          referer: 'https://promptwritingstudio.com/prompt-grader?utm_source=youtube',
        },
        body: {
          email: 'grader@example.com',
          source: 'prompt-grader-report',
          form_id: 'promptwritingstudio@grade-report-email',
          signup_page: '/prompt-grader',
          signup_utm_source: 'youtube',
          signup_referrer: 'youtube.com',
        },
      }
      const res = createMockRes()

      await emailHandler(req, res)

      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual({
        sent: true,
        email: 'grader@example.com',
        source: 'prompt-grader-report',
      })

      // Existing contact already had source_surface = "bawt@word-bank", so PATCH only fills empty keys
      const patchCall = calls.find(c => c.method === 'PATCH' && c.url.includes('/contacts/grader%40example.com'))
      expect(patchCall).toBeDefined()
      expect(patchCall.body).toEqual({
        properties: {
          signup_page: '/prompt-grader',
          signup_utm_source: 'youtube',
          signup_referrer: 'youtube.com',
        },
      })

      const phCall = calls.find(c => c.url.includes('eu.i.posthog.com'))
      expect(phCall).toBeDefined()
      expect(phCall.body.event).toBe('Signup Confirmed')
      expect(phCall.body.properties.$host).toBe('promptwritingstudio.com')
      expect(phCall.body.properties.form_id).toBe('promptwritingstudio@grade-report-email')
      expect(phCall.body.properties.signup_page).toBe('/prompt-grader')
      expect(phCall.body.properties.is_new).toBe(false)
    })

    it('emits Signup Failed on invalid email', async () => {
      const calls = []
      global.fetch = jest.fn(async (url, opts = {}) => {
        calls.push({ url, method: opts.method || 'GET', body: opts.body ? JSON.parse(opts.body) : null })
        return { ok: true, status: 200, json: async () => ({}) }
      })

      const req = {
        method: 'POST',
        query: { id: 'grade-123' },
        headers: { referer: 'https://promptwritingstudio.com/prompt-grader' },
        body: { email: 'not-an-email' },
      }
      const res = createMockRes()

      await emailHandler(req, res)

      expect(res.statusCode).toBe(400)
      const phCall = calls.find(c => c.url.includes('eu.i.posthog.com'))
      expect(phCall).toBeDefined()
      expect(phCall.body.event).toBe('Signup Failed')
      expect(phCall.body.properties.$host).toBe('promptwritingstudio.com')
      expect(phCall.body.properties.reason).toBe('bad_email')
    })
  })
})
