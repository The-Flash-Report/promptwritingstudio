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

**Amended during Phase 3 (D2a):** the keyless judge is **Haiku 4.5**, not Sonnet. Empirical: Sonnet grades took 18-30s on the live preview and Netlify functions cut off around 26s — the eval's second grade timed out mid-flight. Haiku returns in 5-7s, costs a third as much, and the grounding contract (rejected fabrications, forced evidence) holds the quality floor; EVAL.md verifies the ranking discriminates correctly on Haiku. Sonnet remains available per-request via BYOK `judgeModel`. Also discovered: prod inference runs through the **Netlify AI Gateway** (`ANTHROPIC_BASE_URL` + gateway-minted key), which the gateway route now honors like the SDK does.

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

---

# DECISIONS — second-build investigation, 2026-07-04

Follow-up run (see `SECOND_BUILD.md`). The first-build question above is settled and shipped;
this asks what comes next given a live Grader and flat organic traffic (GSC: 35 clicks /
4,589 impressions / 28 days / avg position 54.7).

## D9. Second build = shareable Grader result cards, not a public library or a playground

**Chosen:** turn each grade into a persistent public page `/g/[id]` with a dynamic OG card
("this prompt scored 38/100 — here's why"). Distribution loop, owned-data, AIO-resistant,
search-independent. Fold AI-citation schema (candidate #6) in as `Dataset` markup on those
pages rather than as a standalone project.

**Why:** it's the only candidate that manufactures its own distribution — the site can't rank
(position 54.7), so the second build must not depend on ranking. The model call is already
paid for in the grade, so marginal API cost is ~nil (kills the playground's recurring-cost
problem). Each card is a new indexed, structured, citable page whose corpus grows with usage,
not editorial effort. A grade of a *specific* prompt passes the AIO test the public library
fails.

**Rejected:**
- **Public prompt library (#3)** — verified red-ocean listicle SERP; commodity content AIO
  answers in one paragraph; needs volume the site doesn't have. Already rejected in D1.
  Defer until the card loop generates volume.
- **Live playground / multi-model run (#1)** — recurring inference cost on our dime, no share
  loop, off-thesis for a creator audience; BYOK compare already exists (#43).
- **AI-citation as a standalone build (#6)** — nothing worth citing until result pages exist;
  demoted to markup on #5.

## D10. Scope excludes the paid tier (below the monetisation gate)

**Why:** GSC confirms the site is far under the 1k-visitor/month threshold; this build is a
reach + list-growth play, not revenue. The paid stub stays a waitlist until traffic justifies
turning on Stripe. Rejected: bolting checkout onto the share loop now — premature, and dilutes
the "grade → share → return" habit with a paywall before there's habit to monetise.

**Open for Bryan (blocking design, not code):** (1) public-grade privacy model — assumed
explicit opt-in, default private; (2) willingness to seed via one newsletter + one YouTube
mention — the entire cold-start plan; (3) Stripe link live or still stub.

## D11. OG render = Node satori+resvg (not edge ImageResponse); delete purges CDN

Two calls made during the build, both forced by deploy-preview verification (the PRD's M0):

**OG rendering** — the PRD's primary was Next edge `ImageResponse`. On Netlify's runtime it
returned HTTP 200 with an **empty body** (content-length 0). Switched `/api/og` to a **Node**
route rendering `satori` (JSX→SVG) + `@resvg/resvg-js` (SVG→PNG) — the fallback the PRD named.
Fonts are bundled Roboto TTFs (Apache-2.0) force-included via `netlify.toml`
`[functions] included_files`. Verified live on the preview: 200, `image/png`, 1200×630, ~27KB,
score+verdict dominant. Rejected: on-demand vs render-at-mint — chose on-demand + immutable CDN
cache (simpler, no PNG storage, no native binary at mint).

**Deletion cache** — the public page is cached (`s-maxage`), so a deleted grade kept serving
from the CDN (a privacy bug: removal must be immediate). Fix: the page emits `Cache-Tag:
grade-<id>`, `DELETE` calls Netlify `purgeCache({ tags })` to invalidate at once, and the 404
branch is `no-store` so a share/unshare transition isn't masked by a cached 404. Verified:
page returns 404 within seconds of delete.
