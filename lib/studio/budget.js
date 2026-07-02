// Soft daily-spend telemetry for studio-funded grader calls, mirroring
// lib/learn/budget. In-memory only — resets on cold start. Best-effort alarm,
// not a hard cap: the per-IP daily meter is the cap; this is the burst alarm.

const DAILY_SPEND_ALERT_USD = 3

// Sonnet 4.6 pricing (per 1M tokens): $3 input, $15 output — matches
// data/api-pricing.json (last_verified 2026-05-25).
const INPUT_USD_PER_TOKEN = 3 / 1_000_000
const OUTPUT_USD_PER_TOKEN = 15 / 1_000_000

let dayKey = ''
let spentUsd = 0

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function recordGradeSpend({ inputTokens = 0, outputTokens = 0 }) {
  const today = todayKey()
  if (today !== dayKey) {
    dayKey = today
    spentUsd = 0
  }

  const callUsd = inputTokens * INPUT_USD_PER_TOKEN + outputTokens * OUTPUT_USD_PER_TOKEN
  spentUsd += callUsd

  if (spentUsd > DAILY_SPEND_ALERT_USD) {
    // Visible in Netlify function logs. Best-effort signal — not a hard stop.
    console.warn(
      `[grader-budget] daily spend ${spentUsd.toFixed(4)} USD exceeds alert threshold ${DAILY_SPEND_ALERT_USD} USD (day=${today})`
    )
  }

  return { spentUsdToday: spentUsd, callUsd }
}

export function _resetGradeBudgetForTesting() {
  dayKey = ''
  spentUsd = 0
}
