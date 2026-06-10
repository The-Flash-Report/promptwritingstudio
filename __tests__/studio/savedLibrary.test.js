import { createSavedLibrary } from '../../lib/studio/savedLibrary'

// Minimal in-memory localStorage stand-in (the store only needs get/setItem).
function memStorage(initial = {}) {
  const map = new Map(Object.entries(initial))
  return {
    getItem: k => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, v),
    _dump: () => Object.fromEntries(map),
  }
}

describe('savedLibrary — Phase 4', () => {
  it('saves an entry and reads it back', () => {
    const lib = createSavedLibrary(memStorage())
    const item = lib.save({ title: 'Cold email', body: 'Write an email to {{x}}', tags: ['email'] })
    expect(item.id).toBeTruthy()
    expect(item.rev).toBe(1)
    expect(lib.get(item.id)).toMatchObject({ title: 'Cold email', body: 'Write an email to {{x}}' })
    expect(lib.list()).toHaveLength(1)
  })

  it('requires a body', () => {
    const lib = createSavedLibrary(memStorage())
    expect(() => lib.save({ title: 'no body' })).toThrow(/body/)
  })

  it('lists newest first', () => {
    let t = 1000
    const lib = createSavedLibrary(memStorage(), { now: () => t++ })
    const a = lib.save({ body: 'a' })
    const b = lib.save({ body: 'b' })
    expect(lib.list()[0].id).toBe(b.id) // b saved later
    lib.update(a.id, { title: 'bumped' }) // now a is newest
    expect(lib.list()[0].id).toBe(a.id)
  })

  it('updates immutably and bumps rev + updatedAt', () => {
    const store = memStorage()
    const lib = createSavedLibrary(store)
    const item = lib.save({ body: 'v1' })
    const updated = lib.update(item.id, { body: 'v2' })
    expect(updated.rev).toBe(2)
    expect(updated.body).toBe('v2')
    expect(updated.updatedAt).toBeGreaterThanOrEqual(item.updatedAt)
    // id and createdAt are not patchable.
    expect(lib.update(item.id, { id: 'hacked', createdAt: 0 })).toMatchObject({ id: item.id, createdAt: item.createdAt })
  })

  it('returns null when updating a missing id', () => {
    const lib = createSavedLibrary(memStorage())
    expect(lib.update('nope', { body: 'x' })).toBeNull()
  })

  it('removes an entry', () => {
    const lib = createSavedLibrary(memStorage())
    const item = lib.save({ body: 'x' })
    expect(lib.remove(item.id)).toBe(true)
    expect(lib.remove(item.id)).toBe(false)
    expect(lib.list()).toHaveLength(0)
  })

  it('tolerates corrupt storage by treating it as empty', () => {
    const lib = createSavedLibrary(memStorage({ 'pws.studio.savedLibrary': 'not json' }))
    expect(lib.list()).toEqual([])
  })

  it('throws when no storage is available (server-side)', () => {
    expect(() => createSavedLibrary(null)).toThrow(/No storage/)
  })
})
