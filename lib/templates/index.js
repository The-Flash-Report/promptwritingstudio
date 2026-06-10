// Phase 2 — prompt templates (the course-derived library) as versioned,
// slot-filled prompts that feed the gateway.
//
// We deliberately stay file-based rather than standing up Langfuse: the repo is
// already data-driven, and a content hash gives us deterministic versioning
// with zero infra. Two sources are merged:
//   • data/studio-templates.js — guided-builder templates with real {{slots}}
//   • data/prompt-library.js   — the broader curated library (mostly static
//     bodies with [bracket] guidance, exposed here as runnable templates)
//
// A normalized Template is: { id, title, description, category, useCase, tags,
// difficulty, body, slots[], version, sourceModule }.

import { createHash } from 'crypto'
import { studioTemplates } from '../../data/studio-templates'
import { getAllPrompts } from '../../data/prompt-library'

const SLOT_RE = /\{\{\s*([\w.-]+)\s*\}\}/g

export class TemplateError extends Error {
  constructor(message, { status = 400, code = 'template_error' } = {}) {
    super(message)
    this.name = 'TemplateError'
    this.status = status
    this.code = code
  }
}

// Unique {{slot}} names in declaration order.
export function extractSlots(body) {
  const seen = new Set()
  const out = []
  for (const m of String(body).matchAll(SLOT_RE)) {
    if (!seen.has(m[1])) {
      seen.add(m[1])
      out.push(m[1])
    }
  }
  return out
}

// Deterministic, content-addressed version: any edit to the body changes it.
function versionOf(body) {
  return 'v1-' + createHash('sha256').update(body).digest('hex').slice(0, 8)
}

function normalize(raw) {
  // prompt-library entries store the text in `prompt`; studio templates in `body`.
  const body = raw.body ?? raw.prompt ?? ''
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description ?? '',
    category: raw.category ?? 'general',
    useCase: raw.useCase ?? '',
    tags: raw.tags ?? [],
    difficulty: raw.difficulty ?? 'intermediate',
    body,
    slots: extractSlots(body),
    version: versionOf(body),
    sourceModule: raw.sourceModule ?? `course:${raw.category ?? 'general'}`,
  }
}

// Built once per process. Studio templates win on id collisions.
let _cache = null
function loadAll() {
  if (_cache) return _cache
  const byId = new Map()
  for (const raw of getAllPrompts()) byId.set(raw.id, normalize(raw))
  for (const raw of studioTemplates) byId.set(raw.id, normalize(raw)) // precedence
  _cache = [...byId.values()]
  return _cache
}

// Lightweight summaries (no body) for list views.
export function listTemplates({ category } = {}) {
  const all = loadAll().map(({ body, ...summary }) => summary)
  return category ? all.filter(t => t.category === category) : all
}

export function getTemplate(id) {
  return loadAll().find(t => t.id === id) || null
}

function render(body, vars) {
  return body.replace(SLOT_RE, (_, name) => String(vars[name]))
}

// Fill a template's slots from `vars`. Throws TemplateError on an unknown id or
// (in strict mode) missing slot values. Returns the rendered prompt plus the
// resolved template id/version for traceability.
export function fillTemplate(idOrTemplate, vars = {}, { strict = true } = {}) {
  const template = typeof idOrTemplate === 'string' ? getTemplate(idOrTemplate) : idOrTemplate
  if (!template) {
    throw new TemplateError(`Unknown template: ${idOrTemplate}`, { status: 404, code: 'template_not_found' })
  }

  const missing = template.slots.filter(s => {
    const v = vars[s]
    return v === undefined || v === null || v === ''
  })
  if (strict && missing.length > 0) {
    throw new TemplateError(`Missing values for slots: ${missing.join(', ')}`, { code: 'missing_slots' })
  }

  return {
    templateId: template.id,
    version: template.version,
    slots: template.slots,
    missing,
    prompt: render(template.body, vars),
  }
}

// Only for tests — drops the memoised registry.
export function _resetCacheForTesting() {
  _cache = null
}
