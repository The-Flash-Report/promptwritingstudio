// pages/api/studio/templates.js
// Phase 2: browse the course-derived template library.
//   GET /api/studio/templates              → all templates (summaries)
//   GET /api/studio/templates?category=seo → filtered by category
//   GET /api/studio/templates?id=tpl-...   → one full template (incl. body + slots)
//
// Read-only and content-only: no keys, no provider calls. Run a template via
// the run/compare endpoints with { templateId, inputs }.

import { listTemplates, getTemplate } from '../../../lib/templates'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id, category } = req.query

  if (id) {
    const template = getTemplate(id)
    if (!template) {
      return res.status(404).json({ error: `Unknown template: ${id}`, code: 'template_not_found' })
    }
    return res.status(200).json({ template })
  }

  const templates = listTemplates({ category })
  return res.status(200).json({ count: templates.length, templates })
}
