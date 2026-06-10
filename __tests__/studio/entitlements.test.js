import {
  signEntitlement,
  verifyEntitlement,
  getTier,
  isFeatureAllowed,
  assertFeature,
  featureMapForTier,
  EntitlementError,
} from '../../lib/studio/entitlements'

const SECRET = 'test-secret-123'
const reqWith = token => ({ headers: token ? { 'x-studio-entitlement': token } : {} })

describe('entitlements — Phase 4', () => {
  describe('token signing/verification', () => {
    it('round-trips a valid token', () => {
      const token = signEntitlement({ tier: 'paid' }, SECRET)
      expect(verifyEntitlement(token, SECRET)).toMatchObject({ tier: 'paid' })
    })

    it('rejects a tampered token', () => {
      const token = signEntitlement({ tier: 'paid' }, SECRET)
      const tampered = token.slice(0, -2) + (token.endsWith('a') ? 'bb' : 'aa')
      expect(verifyEntitlement(tampered, SECRET)).toBeNull()
    })

    it('rejects a token signed with a different secret', () => {
      const token = signEntitlement({ tier: 'paid' }, 'other-secret')
      expect(verifyEntitlement(token, SECRET)).toBeNull()
    })

    it('rejects an expired token', () => {
      const token = signEntitlement({ tier: 'paid', exp: Math.floor(Date.now() / 1000) - 10 }, SECRET)
      expect(verifyEntitlement(token, SECRET)).toBeNull()
    })

    it('returns null with no token or no secret', () => {
      expect(verifyEntitlement(null, SECRET)).toBeNull()
      expect(verifyEntitlement(signEntitlement({ tier: 'paid' }, SECRET), null)).toBeNull()
    })
  })

  describe('getTier', () => {
    it('defaults to free with no token', () => {
      expect(getTier(reqWith(null), { secret: SECRET })).toBe('free')
    })
    it('returns paid for a valid paid token', () => {
      const token = signEntitlement({ tier: 'paid' }, SECRET)
      expect(getTier(reqWith(token), { secret: SECRET })).toBe('paid')
    })
    it('falls back to free for an invalid token', () => {
      expect(getTier(reqWith('garbage.token'), { secret: SECRET })).toBe('free')
    })
  })

  describe('feature gating per the brief', () => {
    it('free unlocks templates + single-model run only', () => {
      expect(isFeatureAllowed('templates', 'free')).toBe(true)
      expect(isFeatureAllowed('run.single', 'free')).toBe(true)
      expect(isFeatureAllowed('compare.multi', 'free')).toBe(false)
      expect(isFeatureAllowed('critique', 'free')).toBe(false)
      expect(isFeatureAllowed('library.saved', 'free')).toBe(false)
    })

    it('paid unlocks everything', () => {
      for (const f of ['templates', 'run.single', 'compare.multi', 'critique', 'library.saved']) {
        expect(isFeatureAllowed(f, 'paid')).toBe(true)
      }
    })

    it('unknown features are denied by default', () => {
      expect(isFeatureAllowed('nope', 'paid')).toBe(false)
    })

    it('assertFeature throws a 402 EntitlementError for a gated feature', () => {
      try {
        assertFeature('critique', 'free')
        throw new Error('should have thrown')
      } catch (err) {
        expect(err).toBeInstanceOf(EntitlementError)
        expect(err.status).toBe(402)
        expect(err.code).toBe('upgrade_required')
      }
    })

    it('featureMapForTier reflects the tier', () => {
      expect(featureMapForTier('free')['compare.multi']).toBe(false)
      expect(featureMapForTier('paid')['compare.multi']).toBe(true)
    })
  })
})
