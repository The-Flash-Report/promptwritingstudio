// IndexNow: ping Bing (and IndexNow partners) that URLs changed, for instant indexing.
// Run after a production deploy: node scripts/indexnow-submit.mjs
// This site serves its sitemap from a Next.js route (no static dist file), so we
// fetch the live sitemap and follow any nested sitemap index. Key file must be
// live at the host root (public/<KEY>.txt is served there by Next).
const KEY = "1ba197b2fe7937eefeb26d0f845dbd2b";
const HOST = "promptwritingstudio.com";
async function locs(url, depth = 0) {
  const out = [];
  const xml = await (await fetch(url)).text();
  const isIndex = /<sitemapindex/i.test(xml);
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = m[1].trim();
    if (isIndex && depth < 3) out.push(...await locs(loc, depth + 1));
    else if (!isIndex) out.push(loc);
  }
  return out;
}
const list = [...new Set(await locs(`https://${HOST}/sitemap.xml`))];
if (!list.length) { console.error("no sitemap URLs found from live sitemap"); process.exit(1); }
const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: list.slice(0, 10000) };
const r = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
});
console.error(`IndexNow submitted ${list.length} URLs -> HTTP ${r.status}`);
