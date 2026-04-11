import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const { category, platform, q } = req.query

  // Load modifier data
  const modifiersDir = path.join(process.cwd(), 'data/modifiers')
  const modifierFiles = fs.readdirSync(modifiersDir).filter(f => f.endsWith('.json'))

  const allCategories = modifierFiles.map(file => {
    const slug = file.replace('.json', '')
    const data = JSON.parse(fs.readFileSync(path.join(modifiersDir, file), 'utf8'))
    return {
      category: slug,
      name: data.modifierName,
      templateCount: data.promptTemplates ? data.promptTemplates.length : 0,
      url: `https://promptwritingstudio.com/chatgpt-prompts-for/${slug}`,
      templates: (data.promptTemplates || []).map(t => ({
        title: t.title,
        description: t.description,
        prompt: t.prompt,
        category: t.category || data.modifierName,
        wordCount: t.wordCount || null
      }))
    }
  })

  // Filter by category if specified
  if (category) {
    const match = allCategories.find(c => c.category === category)
    if (!match) {
      return res.status(404).json({ error: 'Category not found', available: allCategories.map(c => c.category) })
    }
    return res.status(200).json(match)
  }

  // Search by query
  if (q) {
    const query = q.toLowerCase()
    const results = []
    allCategories.forEach(cat => {
      cat.templates.forEach(t => {
        if (t.title.toLowerCase().includes(query) || t.description.toLowerCase().includes(query)) {
          results.push({ ...t, categoryName: cat.name, categorySlug: cat.category })
        }
      })
    })
    return res.status(200).json({ query: q, resultCount: results.length, results: results.slice(0, 20) })
  }

  // Return category index
  res.status(200).json({
    totalCategories: allCategories.length,
    totalTemplates: allCategories.reduce((sum, c) => sum + c.templateCount, 0),
    categories: allCategories.map(({ category, name, templateCount, url }) => ({ category, name, templateCount, url }))
  })
}
