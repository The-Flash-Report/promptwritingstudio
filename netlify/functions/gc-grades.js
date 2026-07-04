// Scheduled cleanup of un-shared grade records. Every grade is persisted so it
// *can* be shared; most never are. This daily job deletes private records past
// their TTL (30 days) so the Blobs store doesn't grow unbounded. Public
// (shared) records are never touched.

import { getStore } from '@netlify/blobs'
import { isCollectable } from '../../lib/grades/record.js'

export const config = { schedule: '@daily' }

export default async function gcGrades() {
  const store = getStore('grades')
  const now = Date.now()
  let scanned = 0
  let deleted = 0

  const { blobs } = await store.list()
  for (const { key } of blobs || []) {
    scanned++
    try {
      const record = await store.get(key, { type: 'json' })
      if (isCollectable(record, now)) {
        await store.delete(key)
        deleted++
      }
    } catch (err) {
      console.error(`gc-grades: skip ${key}:`, err?.name || 'UnknownError')
    }
  }

  console.log(`gc-grades: scanned ${scanned}, deleted ${deleted}`)
  return new Response(JSON.stringify({ scanned, deleted }), {
    headers: { 'content-type': 'application/json' },
  })
}
