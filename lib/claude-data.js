import models from '../data/claude-models.json'
import plans from '../data/claude-plans.json'

export const CURRENT_MODELS = models.current
export const LEGACY_MODELS = models.legacy
export const MODELS_META = models._meta

export const CONSUMER_PLANS = plans.consumer
export const TEAM_PLANS = plans.team
export const API_PLAN = plans.api
export const PLANS_META = plans._meta

export function getModelById(id) {
  return [...models.current, ...models.legacy].find(m => m.id === id || m.alias === id)
}

export function getCurrentModelByTier(tier) {
  return models.current.find(m => m.tier === tier)
}

export function getConsumerPlan(id) {
  return plans.consumer.find(p => p.id === id)
}
