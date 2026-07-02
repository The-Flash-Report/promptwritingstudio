# Prompt Grader — architecture & ops

Shipped 2026-07-01 (overnight mission). The site's interactive wedge: paste a
prompt → grounded scored critique + failure modes + rewrite. Front end at
`/prompt-grader`, engine at `POST /api/studio/critique`.

## The meta-problem: the grader's own prompt must be excellent

A prompt-grading product lives or dies on whether its feedback is specific.
Generic filler ("be more specific", "add more detail") would be fatal — it's
the exact thing the product exists to eliminate. We do NOT rely on prompt
wording alone to prevent it; the contract is enforced in code:

1. **Evidence spans, validated.** The judge must return, per criterion, a
   `justification` and (for any score above 0) an `evidence_span` — a verbatim
   quote from the user's prompt. `lib/critique/judge.js#parseJudgeResponse`
   normalizes whitespace/case and checks the span actually occurs in the
   prompt. A fabricated span, missing justification, out-of-range score, or
   wrong criterion count throws `MalformedCritiqueError` (HTTP 502): **we show
   an error before we show an ungrounded critique.**
2. **Calibration block** in the judge prompt (`renderJudgePrompt`): no courtesy
   points, "implied" caps at 1/3, top marks require explicit text, and — the
   inverse failure — don't manufacture faults on a genuinely excellent prompt.
3. **Deterministic scoring**: temperature 0, versioned rubric
   (`data/critique-rubrics.js`, content-hash version, weighted criteria). A
   score is comparable across drafts because the rubric version rides along in
   the response.
4. **Failure modes** (`failure_modes[]`): the judge must name how *this* prompt
   goes wrong (what the model will guess/invent). Validated: must be an array;
   empty allowed only because an airtight prompt legitimately has none.
5. **Rewrite** (`rewrite`): validated non-empty and not identical to the input
   (whitespace-insensitive). The judge is instructed to insert
   `[PLACEHOLDERS]` for facts only the author knows rather than inventing
   them — the no-fabrication rule extends to the rewrite.
6. **Safety flag** (`safety_flag`): if the prompt's purpose is harm, the judge
   sets a one-sentence reason; the pipeline then returns a deterministic
   `{ flagged: true }` result with **no scores and no rewrite** ("we don't
   improve harmful prompts"), instead of hoping the model refuses mid-JSON.
   Edgy-but-legitimate (fiction, security research) is explicitly not flagged.

The full judge prompt is assembled in `lib/critique/judge.js#renderJudgePrompt`
from the rubric + grounding rules + calibration + rewrite-target style
(`REWRITE_TARGETS`: claude / chatgpt / gemini idioms).

## Request flow

```
POST /api/studio/critique { targetPrompt, target?, rubricId? }
  → 400 (missing/oversized prompt, before metering)
  → meter: keyless+unpaid → 3/day/IP (lib/studio/rateLimit), else skip
  → judge model: keyless → 'grader-haiku' (Anthropic-direct, studio-funded; Sonnet hit Netlify's ~30s function wall)
                 BYOK    → body.judgeModel if registered, else default
  → lib/critique.critiquePrompt → gateway.complete (temp 0)
  → parseEnvelope → safety? → flagged result
                  → parseGraderExtras + parseJudgeResponse → scores/rewrite
  → recordGradeSpend (telemetry when studio-funded)
  → 200 { criteria, overall, failureModes, rewrite, summary, judge, meter }
```

Funding matrix (`lib/gateway/index.js#resolveFunding`):

| Caller | Key used | Meter |
|---|---|---|
| Keyless free | `ANTHROPIC_API_KEY` (env) | 3 grades/day/IP |
| Paid entitlement (`x-studio-entitlement`) | `ANTHROPIC_API_KEY` | none |
| BYOK (`x-user-api-key`) | user's key, in-memory only | none |

Known trade-off: a grade is counted at meter time, so a 502 from a malformed
judge response still consumes one of the 3 free slots. Acceptable v1; fix by
splitting the meter into peek/commit if it shows up in practice.

## Cost & abuse posture

~1,100 tokens in + ~700 out per grade on Haiku 4.5 ($1/$5 per MTok) ≈ **$0.005/grade** (agent-rubric grades run larger inputs, ≈ $0.010 worst case), so the
worst case per IP is ~$0.04/day. `lib/studio/budget.js` logs a warning past
$3/day total studio-funded spend (Netlify function logs). The in-memory meter
resets on cold start (same accepted weakness as /learn's).

## Front end

`components/tools/PromptGrader.js` on `pages/prompt-grader.js`:

- History: last 3 grades in localStorage via the tested
  `lib/studio/savedLibrary` (source `prompt-grader`; full result stored via
  `update(id, { grade })`). Free plan prunes to 3; nothing leaves the browser.
- Email moment: after a successful grade — existing Netlify Forms capture
  (`source: prompt-grader`); the paywall boundary shows a founding-member
  waitlist capture (`source: prompt-grader-upgrade`) while Stripe is stubbed.
- Paywall stub: set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` to a Stripe Payment Link
  and the upgrade card switches from waitlist to a live "Upgrade to Pro"
  button. Token minting for `x-studio-entitlement` (true unlimited) needs the
  Stripe webhook → `signEntitlement` step, still TODO.

## Bryan's go-live checklist

1. Nothing — the free tier works with prod env as-is (`ANTHROPIC_API_KEY` is
   already set; verified by live probe of /api/learn/run).
2. Optional: create a Stripe Payment Link, set `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`.
3. Later: Stripe webhook → mint entitlement tokens (`STUDIO_ENTITLEMENT_SECRET`)
   so paying users actually skip the meter; until then Pro buyers would only
   have the payment link, so keep the waitlist until the webhook exists.
4. Watch `[grader-budget]` warnings in Netlify function logs.
