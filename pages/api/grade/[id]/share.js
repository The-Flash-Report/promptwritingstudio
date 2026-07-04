// POST /api/grade/[id]/share  { manageToken }
// Flips a private grade record public (opt-in share). Capability-gated: only a
// caller holding the manageToken returned at grade time can share. Refuses to
// publish a flagged (unsafe) grade. Idempotent — sharing an already-public
// record just returns its URL again.

import { getRecord, setPublic } from '../../../../lib/grades/store'
import { verifyManageToken, shareBlockReason } from '../../../../lib/grades/record'

function shareUrl(req, id) {
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers.host
  return `${proto}://${host}/g/${id}`
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query
  const { manageToken } = req.body || {}
  if (!id || !manageToken) {
    return res.status(400).json({ error: 'id and manageToken are required', code: 'bad_request' })
  }

  let record
  try {
    record = await getRecord(id, { strong: true })
  } catch (err) {
    console.error('Share load failed:', err?.name || 'UnknownError')
    return res.status(500).json({ error: 'Could not load this grade.' })
  }

  // Same 404 for missing and token-mismatch so a caller can't probe which ids
  // exist. shareBlockReason handles missing; verify handles wrong token.
  if (!record || !verifyManageToken(manageToken, record.tokenHash)) {
    return res.status(404).json({ error: 'Grade not found.', code: 'not_found' })
  }

  const block = shareBlockReason(record)
  if (block === 'flagged') {
    return res.status(403).json({ error: 'This grade cannot be shared.', code: 'flagged' })
  }
  if (block) {
    return res.status(409).json({ error: 'This grade cannot be shared.', code: block })
  }

  if (!record.public) {
    try {
      await setPublic(id, true)
    } catch (err) {
      console.error('Share publish failed:', err?.name || 'UnknownError')
      return res.status(500).json({ error: 'Could not publish this grade.' })
    }
  }

  return res.status(200).json({ url: shareUrl(req, id), id })
}
