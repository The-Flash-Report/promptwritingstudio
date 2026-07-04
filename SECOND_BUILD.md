# SECOND_BUILD.md — what to build next (2026-07-04)

**Context reset.** The original "pick a first build" investigation already ran and shipped:
the **Prompt Grader** (`/prompt-grader`) is live in prod (PR
[#53](https://github.com/The-Flash-Report/promptwritingstudio/pull/53), merged 2026-07-02),
on top of the studio backend (PRs #43–#47). See `MORNING.md` / `DECISIONS.md` for that run —
untouched. This doc answers the only question still open: **now that the Grader is live and
organic traffic is flat, what is the second build?**

Judged on the same lens: owned-data · inbound-only · search-independent · low-maintenance ·
creator audience · win = return visits + a compounding, AI-citable asset.

---

## 1. Verdict per feature (reframed as "next")

| # | Feature | Verdict | Deciding reason |
|---|---------|---------|-----------------|
| 5 | **A/B compare + shareable result cards** | **GO — build this** | The only candidate that manufactures its own distribution. Each grade already happens; a card turns it into an owned-data, AIO-resistant, shareable artifact. Zero new API cost, zero traffic dependency. |
| 6 | AI-citation optimisation | **CONDITIONAL — fold into #5** | Not a standalone build. It's schema/structure work that only has something worth citing once the result pages exist. Ship it *as* the markup on the cards, not as a project. |
| 3 | Public/shareable prompt library | **NO-GO (defer)** | Red-ocean listicle SERP (verified), needs volume the site doesn't have, commodity content AIO answers in one paragraph. Already rejected in D1. Revisit only after #5 generates volume. |
| 1 | Live playground / multi-model run | **NO-GO** | Recurring API cost on your dime (N model calls/run — the original feature-killer), no share loop, off-thesis for a creator audience. BYOK compare already exists for power users (#43). |
| 2 | Template library with variables | **DONE** | Shipped versioned + slot-filled in PR #45. |
| 4 | Versioning + basic scoring | **DONE** | This *is* the Grader (PR #53). |

---

## 2. Recommended first build + what to defer

**Build: shareable Grader result cards (the distribution loop).**

Every grade mints a persistent public page — `/g/[id]` — with a dynamic OG image:
*"This prompt scored 38/100. Here's why."* The card carries the verbatim-evidence critique
(the differentiated IP) and a "grade your own" CTA back to the tool.

Why it wins the lens cleanly:
- **Owned-data / AIO-resistant** — a grade of *a specific prompt* can't be pre-generated or
  summarised away. Passes the AIO test the public library fails.
- **Search-independent** — distribution is the user sharing a shocking score, not Google
  ranking page #301. This is the whole point given position 54.7.
- **Compounding asset** — each grade is a new indexed, structured page. The corpus grows
  with usage, not with editorial effort.
- **Return loop** — grade → share → someone grades theirs → returns. Self-priming.
- **Near-zero marginal cost** — the model call is already paid for in the grade; a card is
  render + storage, not new inference.

**Defer:** public library (#3) until there's volume to populate and curate it; standalone
playground (#1) indefinitely (cost + no distribution). **Fold in:** AI-citation schema (#6)
as `Dataset`/structured markup on the result pages — that's where citable owned-data lives.

**Explicitly out of scope:** the paid tier. The site is far below the 1k-visitor/month
monetisation gate; this build is a **reach + list-growth** play, not revenue. The paid stub
stays a waitlist until traffic justifies it.

---

## 3. Feature table (the investigation's four axes)

| # | Feature | API cost | Cold-start vs today | Build effort | Backlink/share score |
|---|---------|----------|---------------------|--------------|----------------------|
| 5 | Shareable result cards | **Low** (grade already paid; card = render+store) | **ABOVE** — needs no organic traffic; volume comes from grades + list | **Medium** — server-side grade persistence + dynamic OG + opt-in/moderation | **5/5** |
| 6 | AI-citation schema | None | Below alone; **Above** riding on #5 | Low (as part of #5) | 4/5 |
| 3 | Public prompt library | None | **BELOW** — needs volume + ranking it can't get | Medium + **ongoing moderation** | 3/5 |
| 1 | Live playground | **High, recurring** | N/A (on-demand) | Medium | 1/5 |
| 2 | Template library | None | — | **Shipped** (#45) | 2/5 |
| 4 | Versioning + scoring | Low | — | **Shipped** (#53) | 3/5 |

Site baseline (GSC, 28 days to 2026-07-04): **35 clicks · 4,589 impressions · CTR 0.76% ·
avg position 54.7.** Below any traffic-seeding threshold — which is *why* the answer is a
distribution loop, not another content surface.

---

## 4. Biggest risk

Not API cost (resolved: Haiku, per-IP meter, BYOK). The real risks, in order:

1. **The loop may never spark.** A share loop needs one ignition. Your 16K email + 11K
   YouTube is the single seeding channel and roughly a one-shot. If the card isn't
   *genuinely* shareable ("my prompt scored 12/100 😳" energy), it stalls at launch with no
   organic backfill to save it.
2. **Public grades = privacy + abuse + thin-content surface.** Making a user's prompt public
   must be **explicit opt-in, default private**, with a safety pass (the grader already
   refuses phishing — reuse it) and `noindex` until a quality/curation gate clears, or you
   invite an SEO thin-content ding at scale.
3. **Score variance (±10, per EVAL.md)** becomes public and screenshotted. Two runs of the
   same prompt showing 33 vs 41 is defensible in a private tool, awkward on a shared card.
   Freeze the score into the persisted card at mint time; never re-grade a public card.

---

## 5. Open questions for you

1. **Privacy model** — OK to make a graded prompt public on explicit opt-in (default
   private, "share this result" = deliberate)? That's the design assumption above.
2. **Seeding** — willing to spend one newsletter send + one YouTube mention to ignite the
   loop? That's the entire cold-start plan; without it the loop has no first push.
3. **Stripe** — is `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` live yet, or still the waitlist stub?
   Doesn't block this build (reach play), but decides whether shared cards funnel to a
   waitlist or a checkout.
