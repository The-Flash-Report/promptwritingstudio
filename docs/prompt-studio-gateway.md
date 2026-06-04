# Prompt Studio — Gateway & Key-Handling Design (Phase 0)

Status: **Phase 0 landed** (one model, BYOK, end-to-end). This is the
report-back checkpoint before building Phase 1 (multi-model fan-out).

## What this layer is

The studio's defensibility is the opinionated structure (templates, guided
builders, the critique rubric) — not model access. So the gateway does one
job cleanly and gets out of the way: run a prompt against a model, return
output + tokens + cost + latency, while keeping studio inference cost ≈ $0 via
BYOK.

## The single interface

All app code calls one function. OpenRouter vs (future) provider-direct is a
routing detail owned by the registry, never by callers.

```js
import { gateway } from 'lib/gateway'

const result = await gateway.complete({
  prompt,            // string, required
  model,             // internal id, e.g. 'claude-sonnet-4-6'
  params,            // { temperature, maxTokens } — optional
  userKey,           // BYOK key (in-memory only) — null ⇒ try free tier
})
// → { model, label, vendor, route, output,
//     tokensIn, tokensOut, costUsd, costEstimated, latencyMs,
//     fundedBy: 'user' | 'studio', providerResponseId }
```

`studioFreeKey`, `fetchImpl`, and `signal` are injectable (tests / future
streaming + cancellation); production callers pass none of them.

## Files

| File | Role |
|---|---|
| `lib/gateway/models.js` | Registry: internal id → OpenRouter slug, vendor, `free` flag, `pricingId`. **Add/swap a model here only.** |
| `lib/gateway/openrouter.js` | OpenRouter backend (OpenAI-compatible `fetch`). The only place a key touches the wire. |
| `lib/gateway/cost.js` | Estimated cost from tokens × `data/api-pricing.json`. |
| `lib/gateway/errors.js` | Typed errors carrying safe HTTP `status` + `code`. |
| `lib/gateway/index.js` | `complete()` — validation, funding policy, routing, result assembly. |
| `pages/api/studio/run.js` | Phase-0 HTTP endpoint (single model). |

## Key-handling design (decided: client-only BYOK)

There is **no DB or auth in the repo today** (CLAUDE.md describes Prisma/NextAuth
that isn't installed). Rather than stand that up just to store secrets, keys are
**client-only**:

- The key lives in the browser (sessionStorage) and is sent per request in the
  `x-user-api-key` **header** — kept out of the JSON body so it can't land in
  body logs.
- The server uses it in-memory for exactly one call, then drops it. It is
  **never persisted, never logged, never returned to the client, never attached
  to a trace.** `lib/gateway/index.js` has no `console.log` of inputs; the result
  object is assembled field-by-field with no key field; error paths surface
  typed messages only and never echo the request.
- This is verified by tests: the returned object cannot contain the key, and a
  BYOK call authorizes the provider with the *user's* key even when a studio key
  is also present (zero studio spend).

## Funding policy (decided: BYOK + capped free tier)

- **BYOK is default.** A user key ⇒ `fundedBy: 'user'`, studio spend = $0.
- **Capped free tier:** with no user key, only models flagged `free` in the
  registry run, drawing on `OPENROUTER_FREE_KEY` (OpenRouter's rate-limited free
  models). A paid model with no key throws `MissingKeyError` *before* any provider
  call. The free path is metered per-IP/hour via the existing
  `lib/observatory/rateLimit`. A user's key is never used to fund anyone else; the
  studio key never funds a paid model.

## Reuse map (what already existed)

- **Rubric + LLM-as-judge:** `scripts/observatory/_lib/judge.py` +
  `judge_templates/default.txt` + the `rubric` block in
  `data/observatory/prompts/*.json` (criteria[], 0–3 scoring, pass_threshold).
  Phase 3 critique = **port this grounded judge to JS** (decided), not new infra.
- **Template library:** `data/prompt-library.js` (slot-filled prompts) feeds Phase 2.
- **Pricing:** `data/api-pricing.json` (per-1M token prices) drives cost estimates.
- **Rate limiting:** `lib/observatory/rateLimit.js`.

## Phase-1 acceptance criteria — status

| Criterion | Status |
|---|---|
| Prompt runs vs ≥3 models via one OpenRouter integration | Gateway + registry ready (4 paid + 1 free registered); fan-out endpoint is Phase 1 |
| BYOK accepted, not stored, absent from logs/traces | ✅ done (client-only header; test-verified) |
| Compare view returns output + tokens + est. cost + latency per model | Per-model result shape ✅ done; compare endpoint is Phase 1 |
| Swapping a model is config, not code | ✅ done (registry-only; test-verified) |
| No studio-funded spend on a BYOK run | ✅ done (test-verified) |

## Next (Phase 1, after review)

Add `pages/api/studio/compare.js` that fans the same `gateway.complete()` out
across N models in parallel (bounded concurrency + backoff, mirroring the
observatory's per-provider semaphore), returning an array of the same result
objects for side-by-side display. **No gateway change required.**

## Open items for Bryan

1. **CLAUDE.md drift:** it documents Prisma/NextAuth/Postgres that aren't
   installed. Phase 4 (saved library + freemium gating) needs a real decision on
   persistence/auth. Flagging now; not blocking Phase 0/1.
2. **OpenRouter slugs** in `models.js` are placeholders for the repo's
   (fictional, 2026) model ids — verify against https://openrouter.ai/models
   before a live run.
3. Set `OPENROUTER_FREE_KEY` in the environment to enable the free tier; without
   it, the studio is pure BYOK (still fully functional).
