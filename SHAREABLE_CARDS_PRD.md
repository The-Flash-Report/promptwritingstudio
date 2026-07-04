# PRD — Shareable Grader Result Cards

**Status:** draft for ratification · **Date:** 2026-07-04 · **Owner build target:** one PR cluster
**Decision source:** `SECOND_BUILD.md` / `DECISIONS.md` D9. **Scope note:** build only — the
distribution/marketing plan lives elsewhere. This spec is what to build and how.

---

## 0. Root problem (what this actually solves)

PromptWritingStudio has a working Grader but **no way to grow** — organic is flat (GSC:
35 clicks / 4,589 impressions / 28 days, avg position 54.7), so it cannot rank its way to
traffic. The site needs a **search-independent distribution loop**: a unit of value users
*want to share*, that also compounds as owned, AI-citable content. A grade is that unit —
but only if the shared artifact is share-*worthy*. So this build's success is not "a URL
exists"; it is "**the card makes someone want to send it**" (a surprising score + a crisp
verdict), and the DoD must test that, not just round-trips. This is the brief's own #1 risk
(the loop never sparks) pulled into the spec so it shapes what a *good* card is.

## 1. Goal (one sentence)

Turn any prompt grade into a **persistent, public, opt-in, share-worthy URL** (`/g/[id]`)
with a **rendered OG card**, so a grade becomes a shareable, indexable, AI-citable artifact —
without a DB, without auth, without new inference cost.

## 2. Why this shape (constraints that pin the design)

- **No DB, no auth** (`CLAUDE.md` Stack). Persistence must be serverless-native →
  **Netlify Blobs**, not Prisma/Postgres.
- **Grades are already computed** by `pages/api/studio/critique.js` (returns a full
  grounded critique object). The card **must reuse that object frozen** — no re-grading,
  no new model call at share time. Marginal API cost = 0.
- **User prompts are user content.** Public exposure is **explicit opt-in, default
  private**, with an owner-held delete capability. Privacy is a correctness requirement.
- **Score variance is ±10** (`EVAL.md`). The public number must be **frozen at mint** and
  never re-derived, or two loads show different scores.

## 3. Scope

### In
- Server-side persistence of each grade as an immutable record (Netlify Blobs).
- Public page `/g/[id]` (ISR) rendering the frozen critique with the existing result UI.
- Opt-in share flow that flips a record public + renders its OG PNG once.
- Dynamic OG/Twitter card image (render-at-mint, stored, served static).
- `Review` JSON-LD + canonical/OG meta; noindex-until-public gate.
- Owner delete/unpublish via capability token; GC cron for un-shared records.

### Out (explicit — do not build)
- **Paid tier / Stripe.** Verified 2026-07-04 via Stripe MCP: **no PWS payment link exists**
  (`NEXT_PUBLIC_STRIPE_PAYMENT_LINK` unset → waitlist stub). Cards funnel to the existing
  email/waitlist capture. Paid flip stays out until the site clears the traffic gate.
- **Public browsable gallery/index of all grades** — that is the rejected "public library"
  (D1/D9). Cards are shared point-to-point via random-id URLs, not browsable. A curated
  "hall of fame" is a possible *later* follow-up, not this PR.
- **Cross-model A/B compare on a prompt** (the other half of brief candidate #5) — that runs
  N model calls per prompt (recurring cost, the playground problem). Deferred. The "A/B"
  we ship is *result-card sharing*, not multi-model runs.
- **Moderation dashboard** beyond the automated `safety_flag` refusal + capability delete.

## 4. Architecture / data flow

```
User grades a prompt
  └─ POST /api/studio/critique            (EXISTING; add: persist + return id)
       → critique object (frozen)
       → write Blob grades/<id>.json  { public:false, ...critique, ipHash, ttl }
       → return { ...critique, shareId:<id>, manageToken:<cap> }

User clicks "Share this result" (opt-in, default OFF)
  └─ POST /api/grade/[id]/share  { manageToken }
       → load record; reject if flagged | missing | token-mismatch
       → render OG PNG (satori → resvg) → write Blob grades/<id>.png
       → patch record { public:true, ogRendered:true }
       → return { url: https://promptwritingstudio.com/g/<id> }

Anyone opens the share URL
  └─ GET /g/[id]   (ISR getStaticProps, fallback:'blocking', revalidate)
       → read Blob grades/<id>.json (consistency:'strong' on cold read)
       → if !public → 404 + noindex
       → render frozen critique via existing result components
       → <meta og:image> → /api/og/[id].png  (streams stored Blob)

Owner deletes
  └─ DELETE /api/grade/[id]  { manageToken } → remove json + png

GC (scheduled Netlify function, daily)
  └─ list grades/*.json where public:false && createdAt > TTL → delete json (+png)
```

## 5. Data model — the persisted record

`grades/<id>.json` (id = 12-char url-safe nanoid, server-generated, non-sequential):

```jsonc
{
  "id": "V1StGXR8_Z5j",
  "createdAt": "2026-07-04T10:00:00.000Z",
  "public": false,              // flips true on share opt-in
  "flagged": false,             // safety_flag hit → never mintable/shareable
  "ipHash": "sha256(salt+ip)",  // abuse tracing only; never raw IP, never logged elsewhere

  // ── frozen grade snapshot (verbatim from critiquePrompt() return) ──
  "promptText": "…the graded prompt…",   // user content → gates public exposure
  "overall": 38,
  "scale": { "min": 0, "max": 100 },
  "rubricId": "prompt-grader",
  "rubricVersion": 3,
  "target": "claude",
  "criteria": [ { "id":"clarity","score":2,"justification":"…","evidence_span":"…" } ],
  "failureModes": [ "…" ],
  "rewrite": "…",               // or "revisions":[…] in edits-mode rubrics
  "summary": "…",
  "judge": { "model": "grader-haiku", "fundedBy": "studio", "latencyMs": 6200 },  // verbatim from critique.judge (NOT a flat "judgeModel" — that key does not exist)
  "ogRendered": false
}
```

`manageToken` (capability): a random 32-byte token returned **once** at critique time and
**never stored in the record** — store only `sha256(manageToken)` in the record and compare
hashes. Possession of the token authorizes share/unpublish/delete. No user accounts needed.

## 6. Persistence — Netlify Blobs

- Store: `getStore('grades')` via `@netlify/blobs` (works in Node functions and the Next
  runtime on `@netlify/plugin-nextjs`).
- **Consistency:** default eventual is fine for reads; use `{ consistency: 'strong' }` for
  the **first** page read right after mint and for the share endpoint's load-then-patch, so
  a just-created/just-flipped record is visible (portfolio-known Blobs eventual-consistency
  gotcha).
- **Keys:** `<id>.json`, `<id>.png`. PNG stored as blob with `contentType:image/png`.
- **GC:** daily scheduled function deletes `public:false` records older than **30 days**
  (`ttl` derived from `createdAt`). Public records persist indefinitely.

## 7. OG image — render at mint, serve static

- Lib: **satori** (JSX → SVG) + **@resvg/resvg-js** (SVG → PNG) inside the Node share
  function. (`@vercel/og`'s `ImageResponse` is the alternative; satori+resvg keeps it in the
  Node runtime and avoids edge/Blobs-access friction — see Risks.)
- **Font:** satori needs an embedded TTF; the site's "system font stack, no external fonts"
  rule is for web pages — the OG raster bundles one TTF as a **build asset** (e.g. Inter),
  which does not violate that rule. Ship the .ttf under `assets/og/`.
- Size **1200×630**, design-system palette (`#FFDE59` accent, `#1A1A1A` text, white bg).
- Layout: big **`{overall}/100`** dial, the one-line `summary`, a truncated prompt excerpt
  (≤120 chars), "Prompt Grader · promptwritingstudio.com" footer.
- Rendered **once** at share time, stored; `/api/og/[id].png` streams the stored blob with
  long `Cache-Control` (immutable — records are frozen). No per-request rendering.

## 8. Privacy & safety (mandatory)

1. **Default private.** A grade is `public:false` until the user explicitly opts in on the
   result screen (checkbox OFF by default, copy: *"Make this result public — your prompt
   text will be visible to anyone with the link."*).
2. **Reuse the safety path.** If the critique came back `flagged`, the record is `flagged`
   and the share endpoint **refuses to mint** (the grader already refuses phishing, per
   `EVAL.md` — reuse, don't re-implement).
3. **Owner delete.** `manageToken` gives the owner a capability URL to unpublish/delete;
   surfaced on the result screen after sharing ("Manage / delete this public result").
4. **No raw IP persisted.** Only a salted hash, for abuse tracing.
5. **Enumeration-safe.** Random nanoid ids; private/absent records 404. No listing endpoint.

## 9. SEO / AI-citation (the payoff)

- `/g/[id]` when public: canonical self, `og:image` = stored PNG, `twitter:card =
  summary_large_image`, title `"This prompt scored {overall}/100 · Prompt Grader"`,
  description = `summary`.
- **JSON-LD `Review`**: `reviewRating` = `{ ratingValue: overall, bestRating: 100 }`,
  `itemReviewed` = a `CreativeWork` (the prompt), `author` = an `Organization`
  (PromptWritingStudio Prompt Grader), `reviewBody` = summary + criteria. This is the
  citable owned-data unit ("PromptWritingStudio's grader scored this prompt X/100 because…").
- **Thin-content guard:** the page renders the *full* critique (criteria + evidence spans +
  failure modes + rewrite) = substantial unique content per page, not a bare number.
  Indexing gated on `public:true`; `noindex` otherwise.
- Sitemap: add `/pages/sitemap-grades.xml.js` generated from a Blobs list of `public:true`
  keys (or defer to v1.1 and rely on share links — flag as an open toggle).

## 10. Components / files to build

| Path | Type | Work |
|---|---|---|
| `lib/grades/store.js` | new | Blobs read/write/list/delete; strong-consistency helpers; schema validate |
| `lib/grades/record.js` | new | build record from critique object; capability token gen/verify (hash) |
| `lib/grades/og.js` | new | satori+resvg render → PNG buffer; card layout |
| `pages/api/studio/critique.js` | **edit** | after successful critique: persist private record, return `shareId` + `manageToken` (no behaviour change when caller ignores them) |
| `pages/api/grade/[id]/share.js` | new | opt-in flip → public + OG render; token-gated; idempotent |
| `pages/api/grade/[id]/index.js` | new | `DELETE` (token-gated) unpublish/remove |
| `pages/api/og/[id].js` | new | stream stored PNG blob, immutable cache |
| `pages/g/[id].js` | new | ISR page; 404/noindex when private; reuses result UI |
| `components/tools/PromptGrader.js` | **edit** | add "Share this result" opt-in + post-share manage link (default OFF) |
| `netlify/functions/gc-grades.js` | new | scheduled daily GC of stale private records |
| `pages/sitemap-grades.xml.js` | new (v1.1 toggle) | list public grade URLs |

Reuse: existing result-rendering markup from `PromptGrader.js` should be extracted into a
shared `components/tools/GradeResult.js` so `/g/[id]` and the live grader render identically.

## 11. Milestones (de-risk first; not calendar)

- **M0 — Spike (the one real unknown).** In a throwaway Netlify Node function on a deploy
  preview: satori+resvg render a PNG with a bundled font, and write+read-back a Blob with
  `consistency:'strong'`. Proves the two integrations before any product code. **Gate: if
  OG-render-in-Node is painful, fall back to `@vercel/og` edge + fetch-record-over-HTTP.**
- **M1 — Persist + capability.** Extract `GradeResult`; add record write + token to
  `critique.js`; `lib/grades/*`. Unit tests.
- **M2 — Public page.** `/g/[id]` ISR, private → 404/noindex, renders frozen critique.
- **M3 — Share flow.** `share.js` opt-in → public + OG render; wire `SocialShare.js` to the
  card URL; result-screen opt-in UI + manage link.
- **M4 — SEO/schema + lifecycle.** `Review` JSON-LD, OG/Twitter meta, canonical, `/api/og`,
  GC cron, delete endpoint, (optional) sitemap segment.
- **M5 — Eval + DoD** on the deploy preview.

## 12. Definition of Done / test plan

**Unit**
- Record built from a real critique object round-trips; schema validation rejects malformed.
- `manageToken`: generated once, only its hash stored; verify accepts correct, rejects wrong.
- Flagged critique → share endpoint returns refusal, mints nothing.
- GC selects only `public:false && age>30d`; never a public record.

**Integration (deploy preview, real Blobs)**
- Grade → response carries `shareId` + `manageToken`; a private record exists; `/g/<id>`
  **404s** (not public yet).
- Share with correct token → record `public:true`, `<id>.png` exists; `/g/<id>` returns 200,
  HTML contains correct `og:image`, `Review` JSON-LD with `ratingValue == overall`.
- Share with **wrong/absent token** → 403, no state change.
- Delete with token → json + png gone; `/g/<id>` → 404.
- Random non-existent id → 404 (enumeration-safe).
- **Regression:** grading a prompt and NOT sharing leaves the existing flow byte-identical
  (opt-in default OFF); no card, no public record surfaced.

**Visual / share-worthiness** (per §0 — the card must make someone want to send it)
- OG PNG legible at 1200×630 **and at feed-thumbnail scale (~halved)**: the **score + a
  one-line verdict** must read at a glance as the dominant elements; summary, prompt excerpt,
  brand footer secondary.
- Result screen surfaces the share affordance **at the moment of reaction** (adjacent to the
  score, not buried below the rewrite), opt-in default OFF.

**Perf/cost**
- Share (incl. OG render) < 3s; no model call in the share path (assert zero gateway spend).
- `/g/[id]` served from ISR cache on repeat load.

## 13. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| OG-render-in-Node + Blobs access integration unproven | **High** | M0 spike gates the whole build; `@vercel/og` edge fallback named |
| User prompts contain PII, made public | High | Opt-in default OFF + explicit copy + capability delete + no raw IP |
| Thin-content SEO ding at scale | Med | Full critique on page + index gated on public + optional min-length |
| Client tampering to mint arbitrary card content | Med | Card content is **server-persisted from the critique**, never client-supplied; share only flips a flag |
| Blobs eventual consistency shows stale/missing record post-mint | Med | `consistency:'strong'` on the post-mint reads |
| Storage growth from un-shared grades | Low | GC cron, 30-day TTL on private records |
| satori font licensing | Low | Bundle an OFL font (Inter) as build asset |

## 14. Ratified decisions (Bryan, 2026-07-04)

1. **Privacy model — LOCKED.** Default-private + explicit opt-in + capability-token delete.
2. **Sitemap of public grades — LOCKED.** Link-only for v1 (no sitemap segment); revisit as
   a v1.1 toggle once volume + quality are proven. Lower thin-content risk at launch.
3. **Prompt text on the card — LOCKED.** Full graded prompt shown on `/g/[id]` (the user
   opted in); OG image shows an excerpt (≤120 chars) only.
