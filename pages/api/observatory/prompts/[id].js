import https from 'https'
import { checkRateLimit } from '../../../../lib/observatory/rateLimit'
import { loadPrompt, loadAllRunsForPrompt } from '../../../../lib/observatory/loadRuns'

const PLAUSIBLE_DOMAIN = 'promptwritingstudio.com'

// Fire-and-forget: never awaited, never fails the response
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
    // silent — never propagate analytics failures
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

  const { id } = req.query
  if (!id || typeof id !== 'string' || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
    return res.status(400).json({ error: 'Invalid prompt id' })
  }

  const prompt = loadPrompt(id)
  if (!prompt) {
    return res.status(404).json({ error: 'Prompt not found', prompt_id: id })
  }

  const runs = loadAllRunsForPrompt(id)

  firePlausibleEvent('observatory_api_call', req)

  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400')
  res.setHeader('X-RateLimit-Remaining', String(remaining))
  return res.status(200).json({
    schema_version: 1,
    prompt_id: id,
    prompt,
    runs,
  })
}
