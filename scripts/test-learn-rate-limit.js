#!/usr/bin/env node
// Verifies the per-IP daily rate limit blocks the 21st call.
// Run directly: node scripts/test-learn-rate-limit.js

const { checkLearnRateLimit, LEARN_DAILY_MAX, _resetLearnStoreForTesting } =
  require('../lib/learn/rateLimit')

_resetLearnStoreForTesting()

const fakeReq = {
  headers: { 'x-forwarded-for': '203.0.113.7' },
  socket: { remoteAddress: '203.0.113.7' },
}

let lastResult
for (let i = 1; i <= LEARN_DAILY_MAX; i++) {
  lastResult = checkLearnRateLimit(fakeReq)
  if (!lastResult.allowed) {
    console.error(`UNEXPECTED: call ${i} was blocked. Result:`, lastResult)
    process.exit(1)
  }
}

const blocked = checkLearnRateLimit(fakeReq)
if (blocked.allowed) {
  console.error(`UNEXPECTED: call ${LEARN_DAILY_MAX + 1} was allowed. Result:`, blocked)
  process.exit(1)
}

console.log(
  `OK: calls 1..${LEARN_DAILY_MAX} allowed, call ${LEARN_DAILY_MAX + 1} blocked (remaining=${blocked.remaining}, retryAfterSec=${blocked.retryAfterSec}).`
)
process.exit(0)
