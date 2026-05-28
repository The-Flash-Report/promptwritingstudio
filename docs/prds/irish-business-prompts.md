# PRD: Irish Business Prompt Collections

**Owner:** bryan@becomeawritertoday.com
**Date:** 2026-05-27
**Status:** Draft (rewrite v2)

## 1. Problem

PromptWritingStudio competes in a saturated "AI prompts" SEO niche where US-focused content dominates. We have a geographic and domain advantage (Irish business audience, existing properties at tenderwatch.ie and vendors.ie) that is currently unused on the site. Generic competitors cannot easily replicate locale-specific content (Irish DPC guidance, Revenue correspondence conventions, eTenders/OGP tender language).

Equally important: AI Overviews (AIO) are collapsing generic prompt-collection traffic. Any new content surface on PWS must pass an AIO-resistance test before it ships. Generic "ChatGPT prompts for marketing" is dead. Locale-bound, source-anchored, data-derived prompts that reference specific Irish forms, agencies, and datasets are AIO-resistant by construction.

## 2. Goal

Launch a defensible content moat of Irish/EU-business-specific prompt collections that:
- Ranks for low-competition, high-intent Irish queries that AIO cannot answer from training data
- Drives cross-traffic between PWS, tenderwatch.ie, and vendors.ie
- Sits behind the existing PWS course CTA at thread-footer placement (no email gating, no lead magnets)

## 3. Non-Goals

- Building a new product or pricing tier
- Replacing existing US-focused prompt pages
- Adding new auth, dashboard, or DB schema
- App Router migration
- Email capture, lead magnets, or gated downloads (coaching funnel retired)
- PDF downloads as primary artefact (see Calculator > PDF rule, §10)

## 4. Target Users

- Irish SME owners writing tender submissions, Revenue correspondence, grant applications
- EU-based marketers needing GDPR-aware copy/prompts grounded in DPC guidance
- Irish B2B software buyers/sellers (overlap with vendors.ie)
- Irish supplier-side procurement teams (overlap with tenderwatch.ie)

## 5. Scope: Five Collection Pillars + AIO-Resistance Test

Each pillar must pass the AIO test: "Can AIO answer this in one paragraph from training data?" If yes, the pillar is rejected or rescoped. The specificity column below is the load-bearing AIO defence.

| # | Collection | Slug pattern | AIO-resistance anchor | Cross-link |
|---|------------|--------------|------------------------|------------|
| 1 | GDPR-Compliant AI Prompts for EU Businesses | `/gdpr-ai-prompts` + sub-pages | Irish DPC guidance docs, DPC enforcement cases, Irish data-transfer rulings (Schrems) | none |
| 2 | Irish SME Tender & Procurement Prompts | `/irish-tender-prompts` | eTenders.gov.ie notice formats, OGP framework templates, named CPV codes, RFT structure | tenderwatch.ie |
| 3 | Irish Business Writing | `/irish-business-writing-prompts` | Revenue myEnquiries replies, RCT (Relevant Contracts Tax) scenarios, PAYE Modernisation contexts, Enterprise Ireland and LEO grant application templates | none |
| 4 | Irish B2B Software Vendor Prompts | `/irish-b2b-vendor-prompts` | vendors.ie vendor data (slugs, pricing, integrations, Irish-billing flags, support locale) | vendors.ie |
| 5 | Irish Market Research Prompts | `/irish-market-research-prompts` | CSO datasets, CRO company filings, UK Companies House for cross-border subsidiaries, named market reports | none |

### Pillar AIO-test notes

- **Pillar 1 (GDPR)**: passes because Irish DPC has separate enforcement history and guidance from the broader EDPB. Generic "GDPR prompts" do not.
- **Pillar 2 (tenders)**: passes because eTenders/OGP language and Irish-specific tendering conventions are not in AIO training data with any depth.
- **Pillar 3 (Business writing)**: previously vague. Now anchored to specific Revenue surfaces (myEnquiries, RCT, PAYE Modernisation) and Irish grant bodies (EI, LEO). Generic "Irish business writing" would fail; this scoping passes.
- **Pillar 4 (B2B vendor)**: passes because the prompts are derived from vendors.ie's proprietary vendor dataset. AIO cannot reproduce.
- **Pillar 5 (Market research)**: previously vague. Now anchored to CSO (Central Statistics Office), CRO (Companies Registration Office), and Companies House data. Generic "Irish market research prompts" would fail; data-source-anchored scoping passes.

Each pillar = 1 hub page + 8 to 15 leaf prompt pages (v1 target: 50+ pages total).

## 6. Implementation (matches existing pSEO pattern)

- **Data-driven, no new page files.** Reuse `/pages/chatgpt-prompts-for/[modifier].js` pattern.
- Create `/data/modifiers/irish-*.json` files for each leaf.
- Add a new collection index file: `/data/collections/irish-business.js` listing the pillars.
- New hub route: `/pages/irish-business-prompts/index.js` (single new file) reading the collections data.
- Link the hub from `/pages/chatgpt-prompt-templates.js` and from the footer.

## 7. Page Template Requirements

Each leaf page must include:
- H1 with the Irish-specific intent keyword
- 3 to 5 ready-to-copy prompts (with copy-to-clipboard button, reuse existing component)
- Irish-context callout (e.g. "Update [Eircode] and [PPS] fields before sending")
- Source anchor: explicit citation of the Irish form, agency, or dataset the prompt addresses (load-bearing for AIO resistance)
- GDPR safety note where personal data is involved
- Outbound contextual link to tenderwatch.ie or vendors.ie where relevant (see §9 for volume cap)
- FAQ block (3 to 5 Qs) for `FAQPage` schema
- Yellow `#FFDE59` "Join Now" CTA at thread footer only (mid-page CTA removed; no email capture, no gated downloads)

## 8. SEO Requirements

- `<title>`: `<Intent> | Irish Business Prompts | PromptWritingStudio`
- Meta description max 160 chars, includes "Ireland" or "Irish"
- Hreflang: `en-IE` primary, `en` alternate
- JSON-LD: `FAQPage` + `BreadcrumbList`
- Internal links: hub to/from leaves, plus 2 sibling links per leaf
- Sitemap: auto-include via existing sitemap generation
- Target KW shape: long-tail, source-anchored ("prompt for Revenue myEnquiries reply", "ChatGPT prompt for Enterprise Ireland HPSU grant", "prompt for eTenders RFT response")

## 9. Cross-Portfolio Strategy

Portfolio shape (current state):
- **Vendors.ie**: buyer-side Irish B2B software content (vendor reviews, comparisons, category guides)
- **Tenderwatch.ie**: supplier-side Irish procurement content (tender alerts, award analysis, supplier guides)
- **PWS Irish prompts**: cross-links into both, sitting upstream of the buyer/supplier workflow (the prompt is what they paste into ChatGPT before drafting the tender / the vendor outreach)

Link-volume rule (per cross-site-linker convention): **1 to 2 cross-portfolio links per pillar leaf page, maximum.** No widget sidebars, no link farms. Contextual in-paragraph links only.

- Pillar 2 (tenders) leaves: 1 to 2 contextual links into tenderwatch.ie (tender guides, supplier directory, contract-award pages)
- Pillar 4 (vendor) leaves: 1 to 2 contextual links into vendors.ie (vendor profiles, category pages, comparison tools)
- Reciprocal: tenderwatch.ie tender guides and vendors.ie category hubs add 1 contextual link to the matching PWS pillar leaf
- UTM tag inbound links: `?utm_source=tenderwatch&utm_medium=referral` or `?utm_source=vendors&utm_medium=referral`

## 10. Downloadable Artefacts: Calculator > PDF

If any pillar produces a reference artefact (e.g. "GDPR risk checklist", "tender response template", "vendor evaluation matrix"), it ships as a **searchable, interactive web tool**, not a PDF. This is a hard rule across the portfolio.

Examples:
- Pillar 1: GDPR prompt risk checker (interactive web form) instead of GDPR-Prompt-Checklist.pdf
- Pillar 2: eTenders RFT structure walker (web tool with fillable sections) instead of Tender-Response-Template.pdf
- Pillar 3: Revenue myEnquiries reply builder (interactive composer) instead of Revenue-Letter-Templates.pdf

PDFs do not rank, do not get indexed well, do not produce return visits, and cannot be updated without a fresh download. Web tools do all four.

## 11. CLI Workflow (content generation)

A repeatable local CLI flow to scaffold new collections:

```bash
npm run new:irish-prompt -- --pillar=tender --slug=enterprise-ireland-grant
```

Script (`/scripts/new-irish-prompt.js`) should:
1. Copy `/data/modifiers/_template.json` to new file
2. Pre-fill `locale: "en-IE"`, `collection: "irish-business"`, pillar slug, source-anchor field (mandatory)
3. Open the file in `$EDITOR`
4. Print the resulting URL for preview

## 12. Success Indicators (leading, not lagging)

Site is over the 1k/mo organic threshold but the moat takes time to compound, and conversion attribution on a single Teachable product is too noisy at this volume. Use leading indicators only:

- Organic impressions for `[query] + Ireland` long-tail patterns (GSC)
- Ranking velocity: time from index to first top-20 ranking per leaf
- Time-on-page and scroll depth on leaf pages (engagement quality proxy)
- Cross-portfolio referral traffic volume (tenderwatch.ie + vendors.ie inbound sessions)
- Index coverage rate: indexed leaves / shipped leaves
- Source-anchor density: percentage of leaves citing a specific Irish form / agency / dataset (target: 100%)

Explicit non-targets: no Teachable conversion targets, no email signups (no email capture), no revenue attribution at this stage.

## 13. Scope and Kill Gates

**v1 scope:**
- Pillar 1 (GDPR) with 10 source-anchored leaves
- Pillar 2 (Tenders) with 10 source-anchored leaves
- Hub page + collection index + cross-links to Tenderwatch (Pillar 2 leaves)
- CLI scaffold script
- All artefacts as web tools, not PDFs

**Kill gate (expand):**
- If v1 hits 500+ monthly organic impressions on the `+ Ireland` pattern within 60 days of full indexing, expand to Pillars 3, 4, 5.

**Kill gate (reduce):**
- If v1 traffic is under 100 monthly impressions at 60 days post-indexing, stop expansion. Audit source-anchor quality (was the AIO-resistance test actually applied to each leaf?). Either fix or kill the moat.

**Kill gate (hard stop):**
- If two pillars fail the AIO-resistance test in practice (i.e. AIO is serving the query directly with no PWS click-through), drop the affected pillars and reassess the moat hypothesis.

Mode-based execution: ship Pillar 1 and 2 in one focused mode block. Defer Pillars 3 to 5 to a later block, gated on the expand criterion above. No calendar phasing.

## 14. Risks & Mitigations

- **Thin content penalty**: enforce minimum 600 words + unique prompt examples per leaf + source-anchor field populated.
- **GDPR claims liability**: add "informational, not legal advice" disclaimer template on Pillar 1 leaves.
- **Maintenance drag**: all content data-driven; no per-page code.
- **AIO erosion**: source-anchor field is the load-bearing defence. If a leaf does not cite a specific Irish form / agency / dataset, it does not ship.
- **Cross-link dilution**: 1-to-2 cap per leaf prevents link-farm signal on the host site.

## 15. Open Questions

- Do we want a separate `/ie/` subdirectory for stricter geo-targeting, or stay flat with hreflang only?
- Affiliate angle: where a prompt explicitly references using ChatGPT or Claude, do we add an affiliate link to Anthropic / OpenAI consumer plans where partner programs exist? (Currently neither has a public affiliate program for consumer plans; revisit if that changes.)
- Should the CLI scaffold enforce a source-anchor field at JSON-schema validation time (block build if missing)?
