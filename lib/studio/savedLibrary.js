// Saved prompt library — per-user persistence (Phase 4).
//
// Client-side by decision: entries live in localStorage, matching the existing
// studio (PROMPT_STUDIO_SETUP.md). Nothing leaves the browser, so there's no DB
// or auth to stand up. The store takes an injectable `storage` (anything with
// getItem/setItem) so it's SSR-safe and unit-testable without a browser.
//
// All updates are immutable: methods return new objects/arrays and rewrite the
// whole collection rather than mutating in place.
//
// NOTE: saving is a PAID feature ('library.saved' in entitlements). This module
// is pure storage; the UI gates access via the entitlement endpoint. Don't put
// secrets (e.g. BYOK keys) in here — it's plaintext localStorage.

const STORAGE_KEY = 'pws.studio.savedLibrary'

function genId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID()
  return `sp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

// Returns the browser's localStorage, or null on the server / when unavailable.
export function getBrowserStorage() {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null
  } catch {
    return null // Safari private mode etc.
  }
}

export function createSavedLibrary(storage = getBrowserStorage(), { now = () => Date.now() } = {}) {
  if (!storage) {
    throw new Error('No storage available (server-side or disabled). Call from the browser.')
  }

  function readAll() {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return []
    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  function writeAll(items) {
    storage.setItem(STORAGE_KEY, JSON.stringify(items))
    return items
  }

  return {
    // Newest first.
    list() {
      return readAll().slice().sort((a, b) => b.updatedAt - a.updatedAt)
    },

    get(id) {
      return readAll().find(it => it.id === id) || null
    },

    // Add a new entry. Returns the created item.
    save({ title, body, tags = [], source = 'manual' }) {
      if (!body || typeof body !== 'string') throw new Error('`body` is required.')
      const ts = now()
      const item = {
        id: genId(),
        title: title || 'Untitled prompt',
        body,
        tags,
        source,
        rev: 1,
        createdAt: ts,
        updatedAt: ts,
      }
      writeAll([...readAll(), item])
      return item
    },

    // Immutable patch. Returns the updated item, or null if not found.
    update(id, patch = {}) {
      const items = readAll()
      const idx = items.findIndex(it => it.id === id)
      if (idx === -1) return null
      const prev = items[idx]
      // id/createdAt/rev are not patchable from the outside.
      const { id: _i, createdAt: _c, rev: _r, ...safe } = patch
      const next = { ...prev, ...safe, rev: prev.rev + 1, updatedAt: now() }
      writeAll(items.map((it, i) => (i === idx ? next : it)))
      return next
    },

    remove(id) {
      const items = readAll()
      const next = items.filter(it => it.id !== id)
      writeAll(next)
      return next.length !== items.length
    },

    clear() {
      writeAll([])
    },
  }
}
