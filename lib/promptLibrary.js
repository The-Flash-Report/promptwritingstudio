// Read-only view layer over data/prompt-library.js for the public AEO surface.
//
// data/prompt-library.js is treated as immutable here (it is also consumed by
// the client-side studio library and generator, so this module never edits it).
// This layer does two things the raw data cannot do safely:
//   1. Derives a STABLE per-prompt slug so each prompt gets a canonical URL.
//      Slugs come from data/prompt-library-slugs.json (an id -> slug map) when
//      present, so a future title edit never moves a published URL; a prompt
//      with no map entry falls back to a slug derived from its title.
//   2. Returns only real, author-provided fields. Any invented engagement
//      metrics in the raw data are never read or forwarded here (portfolio ban
//      on model-inlined numbers), so they cannot reach a public page.

import fs from 'fs'
import path from 'path'
import { promptLibraryData } from '../data/prompt-library.js'

// Load the id -> slug map. Read via fs (not a JSON import) so this module loads
// identically under Next's build, the sitemap route, and a bare-node script
// (native ESM would need an import attribute webpack does not emit). A missing
// or unreadable map is non-fatal: slugs fall back to the title-derived form.
function loadSlugMap() {
  try {
    const p = path.join(process.cwd(), 'data', 'prompt-library-slugs.json')
    return JSON.parse(fs.readFileSync(p, 'utf8'))
  } catch (err) {
    return {}
  }
}

const slugMap = loadSlugMap()

// Category -> human label for the index and breadcrumbs.
export const CATEGORY_LABELS = {
  business: 'Business & Strategy',
  'content-creation': 'Content Creation',
  copywriting: 'Copywriting',
  marketing: 'Marketing',
  technical: 'Technical & Development',
  seo: 'SEO',
}

export function slugifyTitle(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Honest fallback publish date for any entry missing a per-entry publishedAt.
// This is the date the /prompt-library/<slug> surface first went live (PR #60),
// so a future entry that forgets publishedAt still serializes a real, stable
// date instead of an empty string or a non-deterministic build date.
export const PROMPT_LIBRARY_PUBLISHED_FALLBACK = '2026-07-15'

// The only fields forwarded to public surfaces. Explicit allow-list: anything
// not named here (including any invented metrics on the raw entry) is dropped.
function toSafePrompt(entry) {
  const slug = slugMap[entry.id] || slugifyTitle(entry.title)
  return {
    id: entry.id,
    slug,
    title: entry.title || '',
    description: entry.description || '',
    prompt: entry.prompt || '',
    category: entry.category || '',
    categoryLabel: CATEGORY_LABELS[entry.category] || entry.category || '',
    tags: Array.isArray(entry.tags) ? entry.tags : [],
    difficulty: entry.difficulty || '',
    useCase: entry.useCase || '',
    estimatedTime: entry.estimatedTime || '',
    // Real per-entry publish date for Article schema (datePublished). Falls back
    // to the surface launch date, never to '' or a build date. The invented
    // engagement metrics and placeholder createdAt/updatedAt are still dropped.
    publishedAt: entry.publishedAt || PROMPT_LIBRARY_PUBLISHED_FALLBACK,
  }
}

function rawEntries() {
  return Object.values(promptLibraryData).flat()
}

// All prompts as safe objects, ordered by slug so any index-based selection
// (e.g. the prompt of the week) is stable across runs.
export function getAllSafePrompts() {
  return rawEntries()
    .map(toSafePrompt)
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

// Lighter shape for the index grid (no full prompt body).
export function getAllPromptSummaries() {
  return getAllSafePrompts().map(({ prompt, ...rest }) => rest)
}

export function getAllSlugs() {
  return getAllSafePrompts().map(p => p.slug)
}

export function getPromptBySlug(slug) {
  return getAllSafePrompts().find(p => p.slug === slug) || null
}

// Deterministic selection for the prompt-of-the-week broadcast: index into the
// slug-sorted list by week number, so a given week always resolves to the same
// prompt (no LLM, no randomness).
export function getPromptOfTheWeek(weekNumber) {
  const all = getAllSafePrompts()
  if (all.length === 0) return null
  const idx = ((Number(weekNumber) % all.length) + all.length) % all.length
  return all[idx]
}
