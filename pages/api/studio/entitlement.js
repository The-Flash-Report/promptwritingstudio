// pages/api/studio/entitlement.js
// Phase 4: report the caller's tier and which features it unlocks, so the
// client can gate the UI. Tier comes from the signed x-studio-entitlement
// header (see lib/studio/entitlements.js); no token ⇒ free.

import { getTier, featureMapForTier } from '../../../lib/studio/entitlements'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const tier = getTier(req)
  return res.status(200).json({ tier, features: featureMapForTier(tier) })
}
