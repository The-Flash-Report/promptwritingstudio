# PRD: Irish Business Prompt Collections

**Owner:** bryan@becomeawritertoday.com
**Date:** 2026-05-27
**Status:** Draft

## 1. Problem

PromptWritingStudio competes in a saturated "AI prompts" SEO niche where US-focused content dominates. We have a geographic + domain advantage (Irish business audience, existing properties at tenderwatch.ie and vendors.ie) that is currently unused on the site. Generic competitors cannot easily replicate locale-specific content (GDPR nuances, Revenue correspondence conventions, Irish tender language).

## 2. Goal

Launch a defensible content moat of Irish/EU-business-specific prompt collections that:
- Ranks for low-competition, high-intent Irish queries
- Drives cross-traffic to/from tenderwatch.ie and vendors.ie
- Converts via the existing Teachable CTA (`Join Now` → `product_id=6640678`)

## 3. Non-Goals

- Building a new product or pricing tier
- Replacing existing US-focused prompt pages
- Adding new auth, dashboard, or DB schema
- App Router migration

## 4. Target Users

- Irish SME owners writing tender submissions, Revenue correspondence, grant applications
- EU-based marketers needing GDPR-aware copy/prompts
- Irish B2B software buyers/sellers (overlap with vendors.ie)

## 5. Scope — Five Collection Pillars

| # | Collection | Slug pattern | Cross-link |
|---|------------|--------------|------------|
| 1 | GDPR-Compliant AI Prompts for EU Businesses | `/gdpr-ai-prompts` + sub-pages | — |
| 2 | Irish SME Tender & Procurement Prompts | `/irish-tender-prompts` | tenderwatch.ie |
| 3 | Irish Business Writing (Revenue, grants, applications) | `/irish-business-writing-prompts` | — |
| 4 | Irish B2B Software Vendor Prompts | `/irish-b2b-vendor-prompts` | vendors.ie |
| 5 | Irish Market Research Prompts | `/irish-market-research-prompts` | — |

Each pillar = 1 hub page + 8–15 leaf prompt pages (target 50+ pages total in v1).

## 6. Implementation (matches existing pSEO pattern)

- **Data-driven, no new page files.** Reuse `/pages/chatgpt-prompts-for/[modifier].js` pattern.
- Create `/data/modifiers/irish-*.json` files for each leaf.
- Add a new collection index file: `/data/collections/irish-business.js` listing the pillars.
- New hub route: `/pages/irish-business-prompts/index.js` (single new file) reading the collections data.
- Link the hub from `/pages/chatgpt-prompt-templates.js` and from the footer.

## 7. Page Template Requirements

Each leaf page must include:
- H1 with the Irish-specific intent keyword
- 3–5 ready-to-copy prompts (with copy-to-clipboard button — reuse existing component)
- Irish-context callout (e.g. "Update [Eircode] and [PPS] fields before sending")
- GDPR safety note where data is involved
- Outbound contextual link to tenderwatch.ie or vendors.ie where relevant (rel="dofollow" on owned properties)
- FAQ block (3–5 Qs) for `FAQPage` schema
- Yellow `#FFDE59` "Join Now" CTA in mid-page + footer

## 8. SEO Requirements

- `<title>`: `<Intent> | Irish Business Prompts | PromptWritingStudio`
- Meta description ≤ 160 chars, includes "Ireland" or "Irish"
- Hreflang: `en-IE` primary, `en` alternate
- JSON-LD: `FAQPage` + `BreadcrumbList`
- Internal links: hub ↔ leaves, plus 2 sibling links per leaf
- Sitemap: auto-include via existing sitemap generation
- Target KW density: long-tail ("prompt for Revenue myEnquiries reply", "ChatGPT prompt for Enterprise Ireland grant application")

## 9. Cross-Property Strategy

- tenderwatch.ie: add reciprocal links from top 10 tender guides → `/irish-tender-prompts`
- vendors.ie: add "AI prompts for vendor outreach" sidebar widget → `/irish-b2b-vendor-prompts`
- UTM tag inbound links: `?utm_source=tenderwatch&utm_medium=referral`

## 10. CLI Workflow (content generation)

A repeatable local CLI flow to scaffold new collections:

```bash
npm run new:irish-prompt -- --pillar=tender --slug=enterprise-ireland-grant
```

Script (`/scripts/new-irish-prompt.js`) should:
1. Copy `/data/modifiers/_template.json` → new file
2. Pre-fill `locale: "en-IE"`, `collection: "irish-business"`, pillar
3. Open the file in `$EDITOR`
4. Print the resulting URL for preview

## 11. Success Metrics (90-day post-launch)

- 50+ Irish-locale pages indexed
- ≥ 5 pages ranking top 10 for `[query] + Ireland`
- ≥ 500 organic sessions/month from `.ie` queries
- ≥ 20 referral sessions/month from tenderwatch.ie + vendors.ie combined
- ≥ 3 Teachable conversions attributed (via UTM) within 90 days

## 12. Milestones

| Week | Deliverable |
|------|-------------|
| 1 | Scaffold script, template JSON, hub page, 1 pillar (Tender) with 10 leaves |
| 2 | GDPR + Business Writing pillars (20 leaves) |
| 3 | Vendor + Market Research pillars (20 leaves), cross-property links live |
| 4 | Schema, hreflang, sitemap audit, internal linking pass |

## 13. Risks & Mitigations

- **Thin content penalty** → enforce min 600 words + unique prompt examples per leaf
- **GDPR claims liability** → add "informational, not legal advice" disclaimer template
- **Maintenance drag** → all content data-driven; no per-page code

## 14. Open Questions

- Do we want a separate `/ie/` subdirectory for stricter geo-targeting, or stay flat with hreflang only?
- Should the Tender pillar gate the best prompts behind email capture (lead-gen for the course)?
- Reciprocal-link volume on tenderwatch.ie/vendors.ie — how many slots can we get without diluting host site SEO?
