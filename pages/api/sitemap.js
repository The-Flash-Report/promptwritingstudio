import fs from 'fs'
import path from 'path'
import { seoUseCases } from '../../data/seo-use-cases'
import { listPromptIds } from '../../lib/observatory/loadRuns'
import { getAllModelSlugs } from '../../lib/modelGuides'
import { LEARN_MODULES } from '../../data/learn/modules'
import aiModels from '../../data/ai-models.json'
import claudeCodeSkills from '../../data/claude-code-skills.json'
import { AI_WORKFORCE_MODULES } from '../../data/ai-workforce'
import { getAllSlugs as getAllPromptLibrarySlugs } from '../../lib/promptLibrary'

// THE live sitemap. `next.config.js` rewrites /sitemap.xml here — there is
// deliberately NO static public/sitemap.xml (a stale hand-committed copy
// shadowed this generator for a month and hid every new page from Google;
// removed 2026-07-02). Add new routes here, nowhere else.

// Every static page file under pages/ (minus api/, _app, _document, 404 and
// deliberate orphans). Regenerate with:
//   ls pages/*.js pages/*/*.js | grep -v api/ | grep -vE "_app|_document|404|\["
const STATIC_ROUTES = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/prompt-grader', priority: '0.95', changefreq: 'weekly' },
  { url: '/agent-prompt-grader', priority: '0.95', changefreq: 'weekly' },
  { url: '/ai-prompt-generator', priority: '0.9', changefreq: 'weekly' },
  { url: '/ai-prompt-examples', priority: '0.9', changefreq: 'weekly' },
  { url: '/chatgpt-prompt-templates', priority: '0.9', changefreq: 'weekly' },
  { url: '/claude-prompt-templates', priority: '0.8', changefreq: 'monthly' },
  { url: '/gemini-prompt-templates', priority: '0.8', changefreq: 'monthly' },
  { url: '/roi-calculator', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators/ai-cost-comparison', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators/business-ai-readiness', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators/claude-code-vs-cursor-cost', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators/claude-model-selector', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators/claude-plan-picker', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators/claude-prompt-cost', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators/content-creation-speed', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators/customer-service-ai-savings', priority: '0.9', changefreq: 'monthly' },
  { url: '/calculators/ecommerce-ai-savings', priority: '0.9', changefreq: 'monthly' },
  { url: '/tools/mad-libs-prompt-creator', priority: '0.8', changefreq: 'monthly' },
  { url: '/tools/prompt-diagnostic-quiz', priority: '0.8', changefreq: 'monthly' },
  { url: '/prompts/content-creators', priority: '0.8', changefreq: 'monthly' },
  { url: '/prompts/hr-managers', priority: '0.8', changefreq: 'monthly' },
  { url: '/prompts/marketing-professionals', priority: '0.8', changefreq: 'monthly' },
  { url: '/prompts/sales-teams', priority: '0.8', changefreq: 'monthly' },
  { url: '/prompts/small-business-owners', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-guide', priority: '0.9', changefreq: 'weekly' },
  { url: '/claude-code-skills', priority: '0.85', changefreq: 'weekly' },
  { url: '/claude-code-skills/build-your-own', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-skills/install-guide', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-mcp-stack', priority: '0.85', changefreq: 'monthly' },
  { url: '/claude-code-tutorial', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-generator', priority: '0.7', changefreq: 'monthly' },
  { url: '/claude-code-hooks-recipes', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-slash-commands', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-sub-agents', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-review', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-pricing', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-alternatives', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-code-vs-cursor', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-md-playbook', priority: '0.85', changefreq: 'monthly' },
  { url: '/claude-pro-vs-max-vs-api', priority: '0.85', changefreq: 'monthly' },
  { url: '/claude-artifacts', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-context-window', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-for-business', priority: '0.7', changefreq: 'monthly' },
  { url: '/claude-for-coding', priority: '0.7', changefreq: 'monthly' },
  { url: '/claude-for-writing', priority: '0.7', changefreq: 'monthly' },
  { url: '/claude-projects', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-prompts', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-sonnet-vs-opus', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-system-prompt', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-vs-chatgpt', priority: '0.8', changefreq: 'monthly' },
  { url: '/claude-vs-gemini', priority: '0.8', changefreq: 'monthly' },
  { url: '/how-to-use-claude', priority: '0.8', changefreq: 'monthly' },
  { url: '/skills-vs-mcp-vs-hooks', priority: '0.8', changefreq: 'monthly' },
  { url: '/vibe-coding', priority: '0.7', changefreq: 'monthly' },
  { url: '/model-prompting-guide', priority: '0.8', changefreq: 'monthly' },
  { url: '/learn', priority: '0.8', changefreq: 'monthly' },
  { url: '/ai-workforce', priority: '0.8', changefreq: 'monthly' },
  { url: '/prompt-examples', priority: '0.85', changefreq: 'weekly' },
  { url: '/prompt-library', priority: '0.85', changefreq: 'weekly' },
  { url: '/ai-models', priority: '0.85', changefreq: 'weekly' },
  { url: '/ai-prompt-generator/ai-art-prompts', priority: '0.7', changefreq: 'monthly' },
  { url: '/what-is-rag', priority: '0.85', changefreq: 'monthly' },
  { url: '/what-is-fine-tuning', priority: '0.85', changefreq: 'monthly' },
  { url: '/what-are-embeddings', priority: '0.85', changefreq: 'monthly' },
  { url: '/what-is-a-vector-database', priority: '0.85', changefreq: 'monthly' },
  { url: '/rag-chunking-strategies', priority: '0.8', changefreq: 'monthly' },
  { url: '/rag-evaluation', priority: '0.8', changefreq: 'monthly' },
  { url: '/self-rag', priority: '0.8', changefreq: 'monthly' },
  { url: '/corrective-rag', priority: '0.8', changefreq: 'monthly' },
  { url: '/speculative-rag', priority: '0.8', changefreq: 'monthly' },
  { url: '/graphrag', priority: '0.8', changefreq: 'monthly' },
  { url: '/hybridrag', priority: '0.8', changefreq: 'monthly' },
  { url: '/auto-rag', priority: '0.8', changefreq: 'monthly' },
  { url: '/flare-active-rag', priority: '0.8', changefreq: 'monthly' },
  { url: '/info-rag', priority: '0.8', changefreq: 'monthly' },
  { url: '/morag', priority: '0.8', changefreq: 'monthly' },
  { url: '/r2ag', priority: '0.8', changefreq: 'monthly' },
  { url: '/ra-rag', priority: '0.8', changefreq: 'monthly' },
  { url: '/content-creators-ai', priority: '0.8', changefreq: 'monthly' },
  { url: '/service-business-ai', priority: '0.8', changefreq: 'monthly' },
  { url: '/ecommerce-ai', priority: '0.8', changefreq: 'monthly' },
  { url: '/education-ai', priority: '0.7', changefreq: 'monthly' },
  { url: '/healthcare-ai', priority: '0.7', changefreq: 'monthly' },
  { url: '/legal-ai', priority: '0.7', changefreq: 'monthly' },
  { url: '/real-estate-ai', priority: '0.7', changefreq: 'monthly' },
  { url: '/custom-ai-agents', priority: '0.7', changefreq: 'monthly' },
  { url: '/vision-ai-prompts', priority: '0.7', changefreq: 'monthly' },
  { url: '/replit-vs-lovable', priority: '0.7', changefreq: 'monthly' },
  { url: '/anthropic-api-pricing', priority: '0.8', changefreq: 'weekly' },
  { url: '/api-pricing', priority: '0.8', changefreq: 'weekly' },
  { url: '/best-ai-tools', priority: '0.8', changefreq: 'monthly' },
  { url: '/business-name-generator', priority: '0.8', changefreq: 'monthly' },
  { url: '/gemini-prompt-generator', priority: '0.8', changefreq: 'monthly' },
  { url: '/ai-prompt-quiz', priority: '0.7', changefreq: 'monthly' },
  { url: '/ai-glossary', priority: '0.8', changefreq: 'monthly' },
  { url: '/ai-history', priority: '0.8', changefreq: 'monthly' },
  { url: '/video-tutorials', priority: '0.7', changefreq: 'monthly' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  { url: '/sitemap', priority: '0.7', changefreq: 'weekly' },
  { url: '/disclosure', priority: '0.5', changefreq: 'yearly' },
  { url: '/privacy-policy', priority: '0.5', changefreq: 'yearly' },
  { url: '/cookie-policy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms-of-service', priority: '0.5', changefreq: 'yearly' },
  { url: '/legal-disclaimer', priority: '0.5', changefreq: 'yearly' },
]
// Deliberate exclusions: /ai-prompt-generator/enhanced (orphaned demo page),
// /join (removed — the course is closed and the page 404s).

function urlEntry(baseUrl, today, loc, changefreq = 'weekly', priority = '0.8') {
  return (
    `  <url>\n` +
    `    <loc>${baseUrl}${loc}</loc>\n` +
    `    <lastmod>${today}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority}</priority>\n` +
    `  </url>\n`
  )
}

export default function handler(req, res) {
  const baseUrl = 'https://promptwritingstudio.com'
  const today = new Date().toISOString().split('T')[0]

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  STATIC_ROUTES.forEach(p => {
    xml += urlEntry(baseUrl, today, p.url, p.changefreq, p.priority)
  })

  // /chatgpt-prompts-for/[modifier]
  const modifiersDir = path.join(process.cwd(), 'data/modifiers')
  fs.readdirSync(modifiersDir)
    .filter(f => f.endsWith('.json'))
    .forEach(f => {
      xml += urlEntry(baseUrl, today, `/chatgpt-prompts-for/${f.replace('.json', '')}`)
    })

  // /ai-prompt-generator/[slug] — de-duped (data has carried duplicate slugs before)
  new Set(seoUseCases.map(uc => uc.slug)).forEach(slug => {
    xml += urlEntry(baseUrl, today, `/ai-prompt-generator/${slug}`)
  })

  // /ai-models/[slug] — route param is the model id (see pages/ai-models/[slug].js)
  ;(aiModels.models || []).forEach(m => {
    if (m.id) xml += urlEntry(baseUrl, today, `/ai-models/${m.id}`, 'weekly', '0.8')
  })

  // /prompt-examples/[slug]
  const examplesDir = path.join(process.cwd(), 'data/prompt-examples')
  fs.readdirSync(examplesDir)
    .filter(f => f.endsWith('.json'))
    .forEach(f => {
      xml += urlEntry(baseUrl, today, `/prompt-examples/${f.replace('.json', '')}`)
    })

  // /prompt-library/[slug] — one URL per library prompt (slug from lib/promptLibrary)
  getAllPromptLibrarySlugs().forEach(slug => {
    xml += urlEntry(baseUrl, today, `/prompt-library/${slug}`, 'monthly', '0.7')
  })

  // /model-prompting-guide/[model]
  getAllModelSlugs().forEach(slug => {
    xml += urlEntry(baseUrl, today, `/model-prompting-guide/${slug}`, 'monthly', '0.8')
  })

  // /learn/[module]
  LEARN_MODULES.forEach(m => {
    xml += urlEntry(baseUrl, today, `/learn/${m.slug}`, 'monthly', '0.7')
  })

  // /ai-workforce/[slug]
  AI_WORKFORCE_MODULES.forEach(p => {
    if (p.slug) xml += urlEntry(baseUrl, today, `/ai-workforce/${p.slug}`, 'monthly', '0.7')
  })

  // /claude-code-skills/[slug] + /claude-code-skills/category/[category]
  const skills = Array.isArray(claudeCodeSkills) ? claudeCodeSkills : claudeCodeSkills.skills
  skills.forEach(s => {
    if (s.slug) xml += urlEntry(baseUrl, today, `/claude-code-skills/${s.slug}`, 'monthly', '0.75')
  })
  new Set(skills.map(s => s.category).filter(Boolean)).forEach(cat => {
    xml += urlEntry(baseUrl, today, `/claude-code-skills/category/${cat}`, 'monthly', '0.7')
  })

  // Observatory URLs — emits nothing until corpus is populated
  const observatoryPromptIds = listPromptIds()
  if (observatoryPromptIds.length > 0) {
    xml += urlEntry(baseUrl, today, '/observatory')
    observatoryPromptIds.forEach(id => {
      xml += urlEntry(baseUrl, today, `/observatory/${id}`, 'weekly', '0.7')
    })
  }

  xml += '</urlset>'

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  res.status(200).send(xml)
}
