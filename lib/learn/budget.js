// Soft daily-spend telemetry for /learn Claude calls.
// In-memory only — resets on cold start. Treat as a best-effort alarm,
// not a hard cap. Server logs warn when exceeded so Bryan can spot bursts.

const DAILY_SPEND_ALERT_USD = 1.5

// Haiku 4.5 pricing (per 1M tokens): $1 input, $5 output (rough — verify in prod)
const INPUT_USD_PER_TOKEN = 1 / 1_000_000
const OUTPUT_USD_PER_TOKEN = 5 / 1_000_000

let dayKey = ''
let spentUsd = 0

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function recordSpend({ inputTokens = 0, outputTokens = 0 }) {
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
      `[learn-budget] daily spend ${spentUsd.toFixed(4)} USD exceeds alert threshold ${DAILY_SPEND_ALERT_USD} USD (day=${today})`
    )
  }

  return { spentUsdToday: spentUsd, callUsd }
}

export function _resetBudgetForTesting() {
  dayKey = ''
  spentUsd = 0
}
