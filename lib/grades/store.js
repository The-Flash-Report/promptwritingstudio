// Netlify Blobs persistence for shareable grade records. The site has no DB
// (CLAUDE.md), so grades that need a public URL live in a Blobs store. Keys are
// the record id; values are the JSON record from lib/grades/record.js.
//
// Consistency: Blobs is eventually-consistent by default. Reads that must see a
// just-written value (the page render right after mint, the load-then-patch in
// the share endpoint) pass { consistency: 'strong' }. See
// reference_netlify_blobs_eventual_consistency.
//
// All Blobs access is isolated here and never runs at build time — callers are
// SSR (getServerSideProps) or API routes, never getStaticProps. Import is lazy
// so a missing Blobs context never breaks a build/prerender.

const STORE_NAME = 'grades'

async function store() {
  const { getStore } = await import('@netlify/blobs')
  return getStore(STORE_NAME)
}

export async function putRecord(record) {
  const s = await store()
  await s.setJSON(record.id, record)
  return record
}

export async function getRecord(id, { strong = false } = {}) {
  if (!id) return null
  const s = await store()
  const data = await s.get(id, { type: 'json', consistency: strong ? 'strong' : 'eventual' })
  return data || null
}

export async function setPublic(id, isPublic) {
  const s = await store()
  const record = await s.get(id, { type: 'json', consistency: 'strong' })
  if (!record) return null
  const updated = { ...record, public: Boolean(isPublic) }
  await s.setJSON(id, updated)
  return updated
}

export async function deleteRecord(id) {
  const s = await store()
  await s.delete(id)
}

// GC support: list all record blobs (metadata only). Used by the scheduled
// cleanup of un-shared records. Kept out of the request path.
export async function listRecords() {
  const s = await store()
  const { blobs } = await s.list()
  return blobs || []
}
