import data from '../data/ai-models.json'

export const AI_MODELS = data.models
export const AI_MODELS_META = data._meta

export function getAIModelById(id) {
  return data.models.find(m => m.id === id)
}

export function getAIModelsByVendor(vendor) {
  return data.models.filter(m => m.vendor === vendor)
}

// Map an internal vendor/role label to the current model — keeps editorial pages
// from hardcoding "Claude Opus 4.7" / "GPT-4o" so that bumping a version in the
// JSON propagates to all prose.
export function getCurrentModelByVendorTier(vendor, tier) {
  return data.models.find(m => m.vendor === vendor && m.tier === tier)
}
