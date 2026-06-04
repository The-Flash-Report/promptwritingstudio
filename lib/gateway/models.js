// Gateway model registry — the single source of truth for which models the
// studio exposes and how each one is routed.
//
// Swapping or adding a model is a CONFIG change here, never a code change in
// the gateway or API routes (Phase-1 acceptance criterion). The rest of the
// app refers to models by their stable internal `id`; the registry maps that
// id to an OpenRouter slug (or, later, a provider-direct route).
//
// `pricingId` points at an entry in data/api-pricing.json so cost estimates
// stay in one place. OpenRouter applies its own pricing (plus a credit-purchase
// fee), so costs computed from this table are clearly labelled ESTIMATES.
//
// NOTE: the `:free` slugs below are OpenRouter's rate-limited free tier. Verify
// every slug against https://openrouter.ai/models before a live run — model
// availability on OpenRouter changes over time.

import apiPricing from '../../data/api-pricing.json'

export const ROUTE_OPENROUTER = 'openrouter'

// Internal id -> routing + display config.
const REGISTRY = {
  'claude-opus-4-7': {
    label: 'Claude Opus 4.7',
    vendor: 'Anthropic',
    route: ROUTE_OPENROUTER,
    openrouterSlug: 'anthropic/claude-opus-4',
    pricingId: 'claude-opus-4-7',
    free: false,
  },
  'claude-sonnet-4-6': {
    label: 'Claude Sonnet 4.6',
    vendor: 'Anthropic',
    route: ROUTE_OPENROUTER,
    openrouterSlug: 'anthropic/claude-sonnet-4',
    pricingId: 'claude-sonnet-4-6',
    free: false,
  },
  'gpt-4o': {
    label: 'GPT-4o',
    vendor: 'OpenAI',
    route: ROUTE_OPENROUTER,
    openrouterSlug: 'openai/gpt-4o',
    pricingId: 'gpt-4o',
    free: false,
  },
  'gemini-2-5-pro': {
    label: 'Gemini 2.5 Pro',
    vendor: 'Google',
    route: ROUTE_OPENROUTER,
    openrouterSlug: 'google/gemini-2.5-pro',
    pricingId: 'gemini-2-5-pro',
    free: false,
  },
  // --- Free tier (OpenRouter rate-limited, studio-funded demo) -------------
  'llama-3.3-70b-free': {
    label: 'Llama 3.3 70B (free)',
    vendor: 'Meta',
    route: ROUTE_OPENROUTER,
    openrouterSlug: 'meta-llama/llama-3.3-70b-instruct:free',
    pricingId: null,
    free: true,
  },
}

export function getModel(id) {
  return REGISTRY[id] || null
}

export function listModels() {
  return Object.entries(REGISTRY).map(([id, m]) => ({ id, ...m }))
}

export function isFreeModel(id) {
  const m = REGISTRY[id]
  return Boolean(m && m.free)
}

// Per-1M-token prices for an internal model id, or null when we have no entry
// (e.g. free models). Used only for ESTIMATED cost — never billed.
export function getPricing(id) {
  const m = REGISTRY[id]
  if (!m || !m.pricingId) return null
  return apiPricing.models.find(p => p.id === m.pricingId) || null
}
