// Estimated cost from token usage + the per-1M pricing table.
//
// This is an ESTIMATE for side-by-side comparison, not a bill. OpenRouter
// charges its own (often slightly different) per-token price plus a
// credit-purchase fee, so we never present this as the amount the user paid.
// Returns null when we have no pricing entry (e.g. free-tier models).

const PER_MILLION = 1_000_000

export function estimateCostUsd(pricing, tokensIn, tokensOut) {
  if (!pricing) return null
  const inCost = (tokensIn / PER_MILLION) * pricing.input_per_1m
  const outCost = (tokensOut / PER_MILLION) * pricing.output_per_1m
  // Round to 6 dp — these numbers are tiny and we don't want float noise.
  return Math.round((inCost + outCost) * 1e6) / 1e6
}
