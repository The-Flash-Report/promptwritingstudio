# Search Console — Observatory Submission

One-time manual step after the first corpus PR lands and Netlify deploys.

## Why

The sitemap at `https://promptwritingstudio.com/api/sitemap` conditionally emits
`/observatory` and `/observatory/[id]` URLs once `data/observatory/prompts/` contains
JSON files. Until then it emits nothing (no 404s). After the first corpus PR merges
and Netlify rebuilds, these URLs go live and need to be submitted.

## Steps

1. Open [Google Search Console](https://search.google.com/search-console) for `promptwritingstudio.com`
2. **Sitemaps** → confirm `https://promptwritingstudio.com/api/sitemap` is already listed (it should be from prior setup)
3. Click **Resubmit** on the sitemap (or remove + re-add if the button is absent)
4. Go to **URL Inspection** and paste `https://promptwritingstudio.com/observatory`
5. Click **Request Indexing** to fast-track the index page
6. Repeat step 4–5 for 2–3 high-priority prompt URLs (e.g. `https://promptwritingstudio.com/observatory/code-explain-recursive`)

Crawling the rest via sitemap is sufficient — no need to hand-submit every prompt URL.

## Notes

- The sitemap's `changefreq` for observatory URLs is `weekly` to match the run cadence
- The sitemap will automatically include new prompt IDs as corpus grows (no sitemap code changes needed)
- Healthcheck cron (C4 contract §9) is **not yet implemented** — file a follow-up issue to wire the Mailgun dead-man's-switch
