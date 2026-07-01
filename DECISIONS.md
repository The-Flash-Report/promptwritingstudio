# DECISIONS.md — overnight mission, 2026-07-01

Every major call, with the alternatives I rejected and why. Newest at the bottom.

## D1. Wedge = Prompt Grader (with rewrite), not Builder or Library-as-app

**Chosen:** `/prompt-grader` — paste a prompt, get grounded per-criterion scores (with verbatim evidence quotes), the prompt's likely failure modes, and a rewritten version with a copy button. Free: 3 grades/day. Paid line: unlimited + saved history + Claude/ChatGPT/Gemini rewrite variants.

**Why:**
- **Return-visit potential wins it.** You grade every *new* prompt you write — a recurring job. A builder is used when starting from scratch (rarer); a library is browsed once and copied from.
- **It's 70% built.** `lib/critique` is the most differentiated IP in the repo: an LLM-as-judge whose parser *rejects* any critique that lacks a justification and a verbatim evidence span from the user's prompt. The mission's hardest requirement ("'be more specific' is banned; every critique must quote the user's prompt") is already enforced at the code level, with tests. Building the builder instead would abandon the repo's best asset.
- **Cleanest paywall line.** Grades/day is a natural meter (mirrors the existing `/learn` 20-runs/day pattern, live in prod). "Unlimited + history" is an obvious upgrade. The builder's paywall (pay for… more questions?) is mushy.
- **The builder and library become features of the grader, not rivals:** the rewrite *is* the builder's output; example prompts from the 250-prompt inventory seed the empty state; saved history *is* the personal library.

**Rejected:**
- **(b) Prompt Builder standalone** — `mad-libs-prompt-creator` already exists client-side and nobody returns to it; guided interviews have high first-use value, low repeat value. Merged its best part (multi-model output variants) into the grader's rewrite.
- **(c) Library-as-app** — weakest paywall and lowest defensibility (prompt libraries are commodity; AIO answers "give me a marketing prompt" in one paragraph — fails Bryan's AIO-resistance test). The grader passes: your specific prompt's critique can't be pre-generated.
- **A brand-new fourth idea** — nothing beat "ship the engine that's already tested". Overnight scope favours wiring proven parts over inventing.

## D2. Inference = Anthropic direct (new gateway route), not OpenRouter

**Chosen:** add `route: 'anthropic'` to the existing gateway registry (`lib/gateway/anthropic.js`), judge model `claude-sonnet-4-6`, funded by the `ANTHROPIC_API_KEY` that is *verified live in prod* (I probed `/api/learn/run` — real Haiku response). BYOK header continues to work (an Anthropic key for this route).

**Why:** the mission specifies the Anthropic API; the OpenRouter path has never run live (placeholder slugs, `OPENROUTER_FREE_KEY` unset); `learn/run.js` proves the direct pattern in production. The registry was designed so routes are config — this is the designed extension point, not a rewrite.

**Rejected:**
- OpenRouter free-tier models as the free grader — free-tier Llama judging quality is the product's first impression; a bad judge kills trust in one visit. Also the key isn't configured, so it would ship dead.
- Using the orphaned `/api/ai/optimize.js` — it fabricates fallback scores (65→85) when parsing fails, the exact anti-pattern the mission bans, and uses a conflicting base64 `CLAUDE_API_KEY` convention.
- Opus as judge — 5× the cost per grade for marginal gain on a 5-criterion rubric; Sonnet 4.6 at temperature 0 with a hard grounding contract is the right cost/quality point for a free tier. (Default changed from the registry's never-run `claude-opus-4-7`.)

## D3. Free/paid line: critique flips from paid-gated to free-metered (3/day/IP)

**Chosen:** `FEATURES.critique` moves `paid → free`; a new per-IP daily meter (3 studio-funded grades/day) protects spend, mirroring `lib/learn/rateLimit`. Paid (`x-studio-entitlement` token) skips the meter. BYOK skips it too. Paid keeps: saved history beyond last 3, multi-model rewrite variants, compare.

**Why:** the current gate (critique = paid, with no way to pay) means the wedge feature is dead on arrival. The mission's free tier must be "genuinely useful" — 3 real grades/day is; a 402 wall is not. Cost exposure at 3/day/IP with Sonnet ≈ $0.02/grade is trivially safe alongside the existing learn budget telemetry.

**Rejected:** hourly metering (the current dead code uses 20/hr — wrong shape for "come back tomorrow" habit formation); requiring BYOK for any free use (kills non-technical users, one of the mission's five test personas).

## D4. Grader output extends the judge contract: rewrite + failure modes + safety flag, one call

**Chosen:** the judge returns, in the same JSON: per-criterion scores (existing grounding contract unchanged), `failure_modes` (how *this* prompt goes wrong), `rewrite` (validated: non-empty, ≠ input), `safety_flag`. One model call per grade.

**Why:** a second call for the rewrite doubles cost and latency for zero quality gain — the judge has already analysed the prompt. Failure modes are the mission's fourth critique dimension and fit the grounding contract (each must reference the prompt). The safety flag makes the dangerous-prompt path *deterministic*: flagged ⇒ scores suppressed, no rewrite, honest message — instead of hoping the model refuses gracefully mid-critique.

**Rejected:** separate `/rewrite` endpoint (cost/latency); adding "failure modes" as a 6th scored criterion (it's commentary about the prompt, not a property the prompt should *contain* — scoring it would punish good prompts for not "having" failure modes).

## D5. Ship as a PR + deploy preview, not a push to main

**Chosen:** branch `feat/prompt-grader`, PR, Netlify deploy preview; Phase 3 eval runs against the preview URL (which has the prod env vars). Main/live site untouched until Bryan merges.

**Why:** every autonomous-agent norm in this household (orchestrator, salvage rules, /pr-merge-when-ready) is built on "agents never merge; Bryan ratifies in the morning". Auto-deploying a new paywalled product to production overnight violates that harder than any speed gain justifies. The mission's "regression-check all live pages" is satisfied better this way: live pages are *provably* unchanged (nothing deployed), and the preview gets the full check.

**Rejected:** direct deploy to main — irreversible-ish (public), against standing rules.

## D6. Stripe = payment-link stub + waitlist capture, not checkout code

**Chosen:** the upgrade moment reads `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`; unset (tonight), it renders a "Founding member — €7/mo" waitlist card wired to the existing Netlify Forms email capture (`source: prompt-grader-upgrade`). The entitlement verifier already exists; minting tokens stays a Stripe-webhook TODO documented in `docs/prompt-grader.md`.

**Why:** real Stripe needs account decisions only Bryan can make (product, price, tax). A payment-link env var is the smallest honest stub: paste a link, the paywall goes live, zero code change. Meanwhile the boundary still *earns* something tonight: emails.

**Rejected:** full Stripe Checkout integration with test keys — untestable end-to-end without credentials, and it would sit as dead code shaped by guesses.

## D7. Replace the 20 dead Teachable checkout links with /prompt-grader

**Chosen:** all 20 occurrences of the closed course's 404ing checkout URL (across 19 claude-* traffic pages) become links to `/prompt-grader`.

**Why:** CLAUDE.md explicitly bans that URL; these are the highest-traffic pages; the mission is precisely "turn content into a tool people return to". Dead CTA → live tool funnel is the single highest-leverage integration edit available, and it's a bug fix besides.

**Rejected:** leaving them for a separate cleanup PR (they're the funnel — shipping the grader without inbound links from the traffic surface would strand it like the studio API was stranded).

## D8. History = localStorage via existing savedLibrary; free keeps last 3, paid unlimited

**Why:** no DB exists and standing up one overnight for v1 history is scope creep; `lib/studio/savedLibrary.js` is tested and SSR-safe. The free cap creates the "save your library" email moment and the paid upsell honestly. Rejected: cookie/server sessions (no auth), IndexedDB (overkill for <100 items).
