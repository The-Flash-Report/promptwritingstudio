import fs from 'fs'
import path from 'path'
import { seoUseCases } from '../../data/seo-use-cases'

export default function handler(req, res) {
  const baseUrl = 'https://promptwritingstudio.com'
  const today = new Date().toISOString().split('T')[0]

  // Static pages with their priorities
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/sitemap', priority: '0.7', changefreq: 'weekly' },
    { url: '/join', priority: '0.9', changefreq: 'monthly' },
    { url: '/ai-prompt-generator', priority: '0.9', changefreq: 'weekly' },
    { url: '/ai-prompt-examples', priority: '0.9', changefreq: 'weekly' },
    { url: '/chatgpt-prompt-templates', priority: '0.9', changefreq: 'weekly' },
    { url: '/roi-calculator', priority: '0.9', changefreq: 'monthly' },
    { url: '/calculators/ai-cost-comparison', priority: '0.9', changefreq: 'monthly' },
    { url: '/calculators/content-creation-speed', priority: '0.9', changefreq: 'monthly' },
    { url: '/calculators/business-ai-readiness', priority: '0.9', changefreq: 'monthly' },
    { url: '/calculators/ecommerce-ai-savings', priority: '0.9', changefreq: 'monthly' },
    { url: '/calculators/customer-service-ai-savings', priority: '0.9', changefreq: 'monthly' },
    { url: '/business-name-generator', priority: '0.8', changefreq: 'monthly' },
    { url: '/gemini-prompt-generator', priority: '0.8', changefreq: 'monthly' },
    { url: '/what-is-rag', priority: '0.85', changefreq: 'monthly' },
    { url: '/what-is-fine-tuning', priority: '0.85', changefreq: 'monthly' },
    { url: '/what-are-embeddings', priority: '0.85', changefreq: 'monthly' },
    { url: '/what-is-a-vector-database', priority: '0.85', changefreq: 'monthly' },
    { url: '/ai-glossary', priority: '0.8', changefreq: 'monthly' },
    { url: '/ai-history', priority: '0.8', changefreq: 'monthly' },
    { url: '/ai-models', priority: '0.8', changefreq: 'monthly' },
    { url: '/best-ai-tools', priority: '0.8', changefreq: 'monthly' },
    { url: '/ai-prompt-quiz', priority: '0.7', changefreq: 'monthly' },
    { url: '/video-tutorials', priority: '0.7', changefreq: 'monthly' },
    { url: '/vibe-coding', priority: '0.7', changefreq: 'monthly' },
    { url: '/claude-code-guide', priority: '0.7', changefreq: 'monthly' },
  ]

  // Dynamic modifier pages
  const modifiersDir = path.join(process.cwd(), 'data/modifiers')
  const modifierSlugs = fs.readdirSync(modifiersDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))

  // Dynamic use case pages
  const useCaseSlugs = seoUseCases.map(uc => uc.slug)

  // Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  // Static pages
  staticPages.forEach(page => {
    xml += `  <url>\n`
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`
    xml += `    <lastmod>${today}</lastmod>\n`
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`
    xml += `    <priority>${page.priority}</priority>\n`
    xml += `  </url>\n`
  })

  // Modifier pages
  modifierSlugs.forEach(slug => {
    xml += `  <url>\n`
    xml += `    <loc>${baseUrl}/chatgpt-prompts-for/${slug}</loc>\n`
    xml += `    <lastmod>${today}</lastmod>\n`
    xml += `    <changefreq>weekly</changefreq>\n`
    xml += `    <priority>0.8</priority>\n`
    xml += `  </url>\n`
  })

  // Use case pages
  useCaseSlugs.forEach(slug => {
    xml += `  <url>\n`
    xml += `    <loc>${baseUrl}/ai-prompt-generator/${slug}</loc>\n`
    xml += `    <lastmod>${today}</lastmod>\n`
    xml += `    <changefreq>weekly</changefreq>\n`
    xml += `    <priority>0.8</priority>\n`
    xml += `  </url>\n`
  })

  xml += '</urlset>'

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
  res.status(200).send(xml)
}
