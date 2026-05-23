import https from 'https'
import { checkRateLimit } from '../../../lib/observatory/rateLimit'
import { loadAllRuns } from '../../../lib/observatory/loadRuns'

const PLAUSIBLE_DOMAIN = 'promptwritingstudio.com'

// CSV columns: one row per (run_id, prompt_id, test_input_id, model)
// Excludes full output text and internal audit fields (provider_response_id)
const CSV_HEADERS = [
  'run_id',
  'prompt_id',
  'test_input_id',
  'model',
  'score_total',
  'pass',
  'cost_usd',
  'tokens_in',
  'tokens_out',
  'flagged',
  'error',
]

function escapeCell(value) {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function runsToRows(runs) {
  const rows = []
  for (const run of runs) {
    const flagsByModel = run.delta_vs_previous_run?.by_model || {}
    for (const input of run.results_by_input || []) {
      for (const result of input.results_by_model || []) {
        rows.push([
          run.run_id,
          run.prompt_id,
          input.test_input_id,
          result.model,
          result.judge?.primary?.total ?? '',
          result.judge?.primary?.pass ?? '',
          result.cost_usd ?? '',
          result.tokens_in ?? '',
          result.tokens_out ?? '',
          flagsByModel[result.model]?.flagged ?? '',
          result.error ?? '',
        ].map(escapeCell).join(','))
      }
    }
  }
  return rows
}

function firePlausibleEvent(name, req) {
  const body = JSON.stringify({
    name,
    url: `https://${PLAUSIBLE_DOMAIN}${req.url || '/'}`,
    domain: PLAUSIBLE_DOMAIN,
  })
  const options = {
    hostname: 'plausible.io',
    path: '/api/event',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
      'User-Agent': req.headers['user-agent'] || 'promptwritingstudio-server',
      'X-Forwarded-For': req.headers['x-forwarded-for'] || '',
    },
  }
  try {
    const request = https.request(options)
    request.on('error', () => {})
    request.write(body)
    request.end()
  } catch {
    // silent
  }
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { allowed, remaining } = checkRateLimit(req)
  if (!allowed) {
    res.setHeader('Retry-After', '3600')
    return res.status(429).json({ error: 'Rate limit exceeded. Try again in 1 hour.' })
  }

  const runs = loadAllRuns()
  const rows = runsToRows(runs)
  const today = new Date().toISOString().split('T')[0]
  const csvLines = [CSV_HEADERS.join(','), ...rows]
  const csv = csvLines.join('\n')

  firePlausibleEvent('observatory_dataset_download', req)

  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', `attachment; filename="pws-observatory-${today}.csv"`)
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-RateLimit-Remaining', String(remaining))
  return res.status(200).send(csv)
}
