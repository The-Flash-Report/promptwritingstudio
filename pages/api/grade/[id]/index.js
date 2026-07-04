// DELETE /api/grade/[id]  { manageToken }
// Owner removes a grade record (unpublish + delete). Capability-gated by the
// manageToken. Used by the "manage / delete this public result" link the
// grader shows after sharing. Idempotent-ish: a missing record returns 404.

import { getRecord, deleteRecord } from '../../../../lib/grades/store'
import { verifyManageToken } from '../../../../lib/grades/record'

// Purge the CDN copy of /g/[id] on delete so a removed grade disappears at once
// (Netlify tags the page with `grade-<id>`). Best-effort: absent locally.
async function purgeGrade(id) {
  try {
    const { purgeCache } = await import('@netlify/functions')
    await purgeCache({ tags: [`grade-${id}`] })
  } catch (err) {
    console.error('purgeCache failed:', err?.name || 'UnknownError')
  }
}

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE')
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
    console.error('Delete load failed:', err?.name || 'UnknownError')
    return res.status(500).json({ error: 'Could not load this grade.' })
  }

  if (!record || !verifyManageToken(manageToken, record.tokenHash)) {
    return res.status(404).json({ error: 'Grade not found.', code: 'not_found' })
  }

  try {
    await deleteRecord(id)
  } catch (err) {
    console.error('Delete failed:', err?.name || 'UnknownError')
    return res.status(500).json({ error: 'Could not delete this grade.' })
  }

  await purgeGrade(id)
  return res.status(200).json({ deleted: true, id })
}
