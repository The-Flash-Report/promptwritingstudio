// The model gateway — the ONE interface the rest of the app calls.
//
//   gateway.complete({ prompt, model, params, userKey })
//
// App code never talks to OpenRouter (or, later, a provider-direct route)
// itself. Whether a model goes over OpenRouter or a direct provider is a
// routing detail owned by the registry (lib/gateway/models.js), so swapping a
// model is config, not code (Phase-1 acceptance criterion).
//
// ── SECURITY (non-negotiable) ────────────────────────────────────────────
//  • BYOK by default: `userKey` is the user's own OpenRouter key. It is used
//    in-memory for exactly one call and then dropped. It is NEVER logged,
//    NEVER persisted, NEVER returned to the client, and NEVER attached to a
//    trace. There is intentionally no `console.log` of inputs in this module.
//  • The returned result object is built field-by-field and contains no key.
//  • A funded free tier exists ONLY for models flagged `free` in the registry,
//    drawing on a studio key from the environment — never a user's key, and
//    never funding a paid model.
//
// A BYOK run therefore produces ZERO studio-funded token spend.

import { getModel, isFreeModel, getPricing } from './models'
import { callOpenRouter } from './openrouter'
import { estimateCostUsd } from './cost'
import { BadRequestError, MissingKeyError, GatewayError } from './errors'

const ROUTE_HANDLERS = {
  openrouter: callOpenRouter,
}

// Resolve who pays and which key to use, enforcing the BYOK + capped-free-tier
// policy. Returns { apiKey, fundedBy }. Throws when neither path is available.
function resolveFunding({ modelId, userKey, studioFreeKey }) {
  if (userKey) {
    return { apiKey: userKey, fundedBy: 'user' }
  }
  if (isFreeModel(modelId) && studioFreeKey) {
    return { apiKey: studioFreeKey, fundedBy: 'studio' }
  }
  throw new MissingKeyError()
}

export async function complete({
  prompt,
  model: modelId,
  params = {},
  userKey = null,
  // Injectable for tests; defaults to env so prod code passes nothing.
  studioFreeKey = process.env.OPENROUTER_FREE_KEY || null,
  fetchImpl = fetch,
  signal,
} = {}) {
  if (!prompt || typeof prompt !== 'string') {
    throw new BadRequestError('A non-empty `prompt` string is required.')
  }
  const modelConfig = getModel(modelId)
  if (!modelConfig) {
    throw new BadRequestError(`Unknown model: ${modelId}`)
  }

  const { apiKey, fundedBy } = resolveFunding({ modelId, userKey, studioFreeKey })

  const handler = ROUTE_HANDLERS[modelConfig.route]
  if (!handler) {
    throw new GatewayError(`No handler for route: ${modelConfig.route}`)
  }

  const startedAt = Date.now()
  const resp = await handler({
    slug: modelConfig.openrouterSlug,
    prompt,
    params,
    apiKey,
    fetchImpl,
    signal,
  })
  const latencyMs = Date.now() - startedAt

  const costUsd = estimateCostUsd(getPricing(modelId), resp.tokensIn, resp.tokensOut)

  // Built explicitly — note the absence of any key field.
  return {
    model: modelId,
    label: modelConfig.label,
    vendor: modelConfig.vendor,
    route: modelConfig.route,
    output: resp.text,
    tokensIn: resp.tokensIn,
    tokensOut: resp.tokensOut,
    costUsd, // estimated; null for free-tier models
    costEstimated: true,
    latencyMs,
    fundedBy, // 'user' (BYOK) | 'studio' (free tier)
    providerResponseId: resp.providerResponseId,
  }
}

// Re-export the Phase-1 fan-out so callers import everything from one barrel.
export { compareModels } from './compare'
import { compareModels as _compareModels } from './compare'

export const gateway = { complete, compareModels: _compareModels }
export default gateway
