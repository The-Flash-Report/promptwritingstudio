import {
  genId,
  genManageToken,
  hashToken,
  verifyManageToken,
  overallPct,
  verdictFor,
  buildRecord,
  shareBlockReason,
  isCollectable,
  PRIVATE_TTL_MS,
} from '../../lib/grades/record'

const critique = {
  flagged: false,
  rubricId: 'prompt-quality',
  rubricVersion: 3,
  scale: { min: 0, max: 4 },
  target: 'claude',
  overall: { percentage: 38 },
  criteria: [{ id: 'clarity', name: 'Clarity', score: 2, justification: 'x', evidenceSpan: 'y' }],
  failureModes: ['vague'],
  rewrite: 'better prompt',
  summary: 'usable, with gaps',
  judge: { model: 'grader-haiku', fundedBy: 'studio' },
}

describe('grades/record', () => {
  describe('ids and tokens', () => {
    it('generates url-safe ids without padding or unsafe chars', () => {
      for (let i = 0; i < 50; i++) {
        expect(genId()).toMatch(/^[A-Za-z0-9_-]+$/)
      }
    })

    it('ids are effectively unique', () => {
      const ids = new Set(Array.from({ length: 500 }, () => genId()))
      expect(ids.size).toBe(500)
    })

    it('only the token hash is comparable; the raw token verifies, a wrong one does not', () => {
      const token = genManageToken()
      const h = hashToken(token)
      expect(h).not.toBe(token)
      expect(verifyManageToken(token, h)).toBe(true)
      expect(verifyManageToken('wrong', h)).toBe(false)
      expect(verifyManageToken(token, hashToken('other'))).toBe(false)
    })

    it('verifyManageToken rejects empties safely', () => {
      expect(verifyManageToken('', 'x')).toBe(false)
      expect(verifyManageToken('x', '')).toBe(false)
      expect(verifyManageToken(null, null)).toBe(false)
    })
  })

  describe('overallPct + verdictFor', () => {
    it('reads the nested percentage', () => {
      expect(overallPct(critique)).toBe(38)
      expect(overallPct({})).toBe(null)
      expect(overallPct({ overall: {} })).toBe(null)
    })

    it('maps scores to the grader verdicts', () => {
      expect(verdictFor(90)).toBe('Strong prompt')
      expect(verdictFor(90, { editsMode: true })).toBe('Strong agent prompt')
      expect(verdictFor(50)).toBe('Usable, with gaps')
      expect(verdictFor(10)).toBe('Needs a rewrite')
      expect(verdictFor(10, { editsMode: true })).toBe('Needs significant work')
      expect(verdictFor(null)).toBe('Not graded')
    })
  })

  describe('buildRecord', () => {
    it('builds a private record carrying the grade verbatim + a one-time token', () => {
      const { record, manageToken } = buildRecord({
        critique,
        promptText: 'write a blog post',
        target: 'claude',
        ipHash: 'abc123',
      })
      expect(record.public).toBe(false)
      expect(record.flagged).toBe(false)
      expect(record.overallPct).toBe(38)
      expect(record.promptText).toBe('write a blog post')
      expect(record.grade.summary).toBe('usable, with gaps')
      expect(record.tokenHash).toBe(hashToken(manageToken))
      expect(record.id).toMatch(/^[A-Za-z0-9_-]+$/)
      // The record must never carry the raw token.
      expect(JSON.stringify(record)).not.toContain(manageToken)
    })

    it('strips the transient meter/share from the persisted grade', () => {
      const { record } = buildRecord({
        critique: { ...critique, meter: { remaining: 2 }, share: { id: 'x' } },
        promptText: 'p',
      })
      expect(record.grade.meter).toBeUndefined()
      expect(record.grade.share).toBeUndefined()
    })

    it('rejects empty prompt text', () => {
      expect(() => buildRecord({ critique, promptText: '   ' })).toThrow()
      expect(() => buildRecord({ critique: null, promptText: 'p' })).toThrow()
    })
  })

  describe('shareBlockReason', () => {
    it('allows a normal scored record', () => {
      const { record } = buildRecord({ critique, promptText: 'p' })
      expect(shareBlockReason(record)).toBe(null)
    })
    it('blocks missing, flagged, and scoreless records', () => {
      expect(shareBlockReason(null)).toBe('not_found')
      expect(shareBlockReason({ flagged: true, grade: {} })).toBe('flagged')
      expect(shareBlockReason({ flagged: false, grade: { overall: {} } })).toBe('no_score')
    })
  })

  describe('isCollectable', () => {
    const base = { public: false, createdAt: new Date(0).toISOString(), grade: critique }
    it('collects an old private record', () => {
      expect(isCollectable(base, PRIVATE_TTL_MS + 1)).toBe(true)
    })
    it('never collects a public record, however old', () => {
      expect(isCollectable({ ...base, public: true }, PRIVATE_TTL_MS * 10)).toBe(false)
    })
    it('spares a fresh private record', () => {
      expect(isCollectable(base, 1000)).toBe(false)
    })
  })
})
