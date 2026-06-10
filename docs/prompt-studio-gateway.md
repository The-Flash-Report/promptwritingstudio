# Prompt Studio — Gateway & Key-Handling Design (Phase 0)

Status: **Phase 0 + Phase 1 landed** (single-model BYOK end-to-end, plus
parallel multi-model compare). Phase 2 (templates) is next.

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
| `lib/gateway/compare.js` | `compareModels()` — parallel fan-out (bounded concurrency + backoff). |
| `pages/api/studio/run.js` | Phase-0 HTTP endpoint (single model). |
| `pages/api/studio/compare.js` | Phase-1 HTTP endpoint (N models side by side). |

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
| Prompt runs vs ≥3 models via one OpenRouter integration | ✅ done (`compareModels`; test-verified) |
| BYOK accepted, not stored, absent from logs/traces | ✅ done (client-only header; test-verified) |
| Compare view returns output + tokens + est. cost + latency per model | ✅ done (per-model + batch totals) |
| Swapping a model is config, not code | ✅ done (registry-only; test-verified) |
| No studio-funded spend on a BYOK run | ✅ done (single + fan-out test-verified) |

## Phase 1 — multi-model compare

`compareModels({ prompt, models, params, userKey })` → `{ prompt, results[], totals }`:

- Runs the same `gateway.complete()` across N models, **bounded concurrency**
  (default 4) and **exponential backoff** retries on transient codes
  (`rate_limited`, `upstream_error`). No gateway change — pure orchestration.
- **Partial failure is isolated:** a model that errors comes back as
  `{ ok: false, model, error, code }` next to the successes; the batch still
  returns. Input order preserved; duplicate model ids de-duped.
- `totals`: `{ models, succeeded, failed, costUsd (summed estimate),
  maxLatencyMs (parallel wall-clock, not the sum) }`.
- Endpoint `pages/api/studio/compare.js` meters the free tier per model in the
  batch and caps at 8 models/request.

## Phase 4 — persistence + freemium gating

Decided: **client-side saved library** (no DB/auth) + **gate per the brief**.

- `lib/studio/savedLibrary.js` — localStorage-backed saved prompts (injectable
  storage ⇒ SSR-safe + unit-testable). Immutable updates; `id`/`createdAt`/`rev`
  not patchable. Pure storage — no secrets (BYOK keys never go here).
- `lib/studio/entitlements.js` — feature gating. **Free** = `templates`,
  `run.single`; **Paid** = `compare.multi`, `critique`, `library.saved`. Tier is
  resolved from a signed (HMAC-SHA256) `x-studio-entitlement` header; no token or
  no `STUDIO_ENTITLEMENT_SECRET` ⇒ `free`. Honest best-effort gating: real for
  anyone holding a valid token; **issuing** tokens is an auth concern deferred.
- `pages/api/studio/entitlement.js` — `GET` returns `{ tier, features }` for UX
  gating. `compare.js` now returns **402 `upgrade_required`** for free callers.
  `critique.js` (#46) gets the same one-line gate when it merges.

## Open items for Bryan

1. **OpenRouter slugs** in `models.js` are placeholders for the repo's
   (fictional, 2026) model ids — verify against https://openrouter.ai/models
   before a live run.
2. Set `OPENROUTER_FREE_KEY` to enable the free tier; without it the studio is
   pure BYOK (still fully functional).
3. Set `STUDIO_ENTITLEMENT_SECRET` and wire a billing webhook to mint paid
   tokens (`signEntitlement`) once real auth/billing exists — until then every
   caller is `free` and paid features are locked.
4. CLAUDE.md drift is now fixed (no Prisma/NextAuth; client-only + localStorage).
