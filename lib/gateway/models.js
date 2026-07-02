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
export const ROUTE_ANTHROPIC = 'anthropic'

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
  // --- Anthropic-direct (the grader judge; studio-funded via ANTHROPIC_API_KEY,
  // the key already live in prod for /api/learn/run). `studioFunded` means the
  // studio pays real money for keyless callers — the endpoint MUST meter it.
  'grader-sonnet': {
    label: 'Claude Sonnet 4.6',
    vendor: 'Anthropic',
    route: ROUTE_ANTHROPIC,
    anthropicModel: 'claude-sonnet-4-6',
    pricingId: 'claude-sonnet-4-6',
    free: false,
    studioFunded: true,
  },
  'grader-haiku': {
    label: 'Claude Haiku 4.5',
    vendor: 'Anthropic',
    route: ROUTE_ANTHROPIC,
    anthropicModel: 'claude-haiku-4-5',
    pricingId: 'claude-haiku-4-5',
    free: false,
    studioFunded: true,
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

// Models the studio funds with a real (non-free-tier) provider key for
// keyless callers. Endpoints exposing these must apply their own metering.
export function isStudioFunded(id) {
  const m = REGISTRY[id]
  return Boolean(m && m.studioFunded)
}

// The provider-side model identifier for a registry entry, per its route.
export function providerSlug(id) {
  const m = REGISTRY[id]
  if (!m) return null
  return m.route === ROUTE_ANTHROPIC ? m.anthropicModel : m.openrouterSlug
}

// Per-1M-token prices for an internal model id, or null when we have no entry
// (e.g. free models). Used only for ESTIMATED cost — never billed.
export function getPricing(id) {
  const m = REGISTRY[id]
  if (!m || !m.pricingId) return null
  return apiPricing.models.find(p => p.id === m.pricingId) || null
}
