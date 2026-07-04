// Shareable-grade record: the immutable snapshot persisted per grade so it can
// have a public URL (/g/[id]) and an OG card. Pure logic only — no Blobs, no
// network — so it unit-tests without infra. Storage lives in lib/grades/store.
//
// Design (see SHAREABLE_CARDS_PRD.md):
//  - The record stores the /api/studio/critique response VERBATIM as `grade`,
//    so the public page renders with the exact shape the live grader uses. No
//    field remapping, no drift.
//  - A grade is private (public:false) until the owner opts in to share.
//  - Ownership is capability-based: a 32-byte manageToken is returned ONCE at
//    creation; only its sha256 is stored. Possession authorises share/delete.
//    No accounts, matching the repo's no-auth constraint.

import { createHash, randomBytes, timingSafeEqual } from 'crypto'

export const PRIVATE_TTL_MS = 30 * 24 * 60 * 60 * 1000 // un-shared records GC'd after 30d

// URL-safe id (no ambiguous chars from base64); ~72 bits, non-sequential.
export function genId() {
  return randomBytes(9).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function genManageToken() {
  return randomBytes(32).toString('hex')
}

export function hashToken(token) {
  return createHash('sha256').update(String(token)).digest('hex')
}

export function verifyManageToken(token, tokenHash) {
  if (!token || !tokenHash) return false
  const a = Buffer.from(hashToken(token))
  const b = Buffer.from(String(tokenHash))
  return a.length === b.length && timingSafeEqual(a, b)
}

// Convenience accessor: the headline 0-100 number (object on the critique).
export function overallPct(grade) {
  const pct = grade?.overall?.percentage
  return typeof pct === 'number' ? pct : null
}

// One-line verdict for the OG card + <title> (mirrors the grader UI's copy).
export function verdictFor(pct, { editsMode = false } = {}) {
  if (typeof pct !== 'number') return 'Not graded'
  if (pct >= 75) return editsMode ? 'Strong agent prompt' : 'Strong prompt'
  if (pct >= 45) return 'Usable, with gaps'
  return editsMode ? 'Needs significant work' : 'Needs a rewrite'
}

// Build the private record from a successful (non-flagged) critique response.
// `critique` is the object returned by /api/studio/critique (without `meter`).
export function buildRecord({ critique, promptText, target, ipHash, now = Date.now, id, manageToken }) {
  if (!critique || typeof critique !== 'object') throw new Error('critique required')
  if (typeof promptText !== 'string' || promptText.trim() === '') throw new Error('promptText required')

  const resolvedId = id || genId()
  const resolvedToken = manageToken || genManageToken()
  const createdAt = new Date(now()).toISOString()

  // Never persist the transient meter; strip it defensively.
  const { meter, share, ...grade } = critique

  return {
    record: {
      id: resolvedId,
      createdAt,
      public: false,
      flagged: Boolean(grade.flagged),
      promptText,
      target: target || grade.target || null,
      overallPct: overallPct(grade),
      rubricId: grade.rubricId || null,
      rubricVersion: grade.rubricVersion ?? null,
      tokenHash: hashToken(resolvedToken),
      ipHash: ipHash || null,
      grade,
    },
    manageToken: resolvedToken,
  }
}

// A record may be made public only if it exists, isn't flagged, and has a score.
export function shareBlockReason(record) {
  if (!record) return 'not_found'
  if (record.flagged) return 'flagged'
  if (overallPct(record.grade) === null) return 'no_score'
  return null
}

// GC predicate: an un-shared record older than the TTL is collectable.
export function isCollectable(record, now = Date.now()) {
  if (!record || record.public) return false
  const age = now - new Date(record.createdAt).getTime()
  return age > PRIVATE_TTL_MS
}
