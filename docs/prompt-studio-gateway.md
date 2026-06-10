# Prompt Studio — Gateway & Key-Handling Design (Phase 0)

Status: **Phase 0 + Phase 1 merged** (single-model BYOK end-to-end, plus
parallel multi-model compare). Phase 2 (templates) in review (PR #45). This
branch adds **Phase 3 — critique (LLM-as-judge)**.

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

## Phase 3 — critique (LLM-as-judge)

The teaching feature: critique a user's prompt against a rubric and return
**grounded** per-criterion scores. A JS port of the observatory judge
(`scripts/observatory/_lib/judge.py`), retargeted from "score a model's output"
to "score a prompt".

- `data/critique-rubrics.js` — the rubric config (course IP): `{ id, version,
  scale (0–3), passThreshold, judgeInstructions, criteria: [{ id, name,
  description, weight }] }`. Versioned by content hash. Default: `prompt-quality`
  (role/context, task clarity, constraints, output format, examples/criteria).
- `lib/critique/judge.js` — `renderJudgePrompt`, `parseJudgeResponse`,
  `computeOverall`. Ports the observatory robustness (code-fence strip, shape +
  range validation) and **adds the grounding contract**: every criterion needs a
  non-empty justification, and any score > 0 must cite an `evidence_span` that
  actually appears in the prompt — a fabricated or missing span is rejected, not
  surfaced. "This is a 7/10" with no grounding is a parse error by construction.
- `lib/critique/index.js` — `critiquePrompt({ targetPrompt, rubricId, judgeModel,
  userKey })` runs the judge through the **same gateway** (temperature 0), so
  BYOK / free tier / cost / key-safety all apply. Returns `{ rubricId,
  rubricVersion, scale, criteria[{score,justification,evidenceSpan,weight}],
  overall{score,max,percentage,pass}, summary, judge{model,tokens,cost,latency} }`.
- `pages/api/studio/critique.js` — `POST` to critique; `GET` lists rubrics.
  Client-only BYOK header; free tier metered.

## Next (Phase 4, after review)

Saved prompts/library per user + free-vs-paid gating. **Blocked on a persistence
decision** (no DB/auth in the repo today — see Open items).

## Open items for Bryan

1. **CLAUDE.md drift:** it documents Prisma/NextAuth/Postgres that aren't
   installed. Phase 4 (saved library + freemium gating) needs a real decision on
   persistence/auth. Flagging now; not blocking Phase 0/1.
2. **OpenRouter slugs** in `models.js` are placeholders for the repo's
   (fictional, 2026) model ids — verify against https://openrouter.ai/models
   before a live run.
3. Set `OPENROUTER_FREE_KEY` in the environment to enable the free tier; without
   it, the studio is pure BYOK (still fully functional).
