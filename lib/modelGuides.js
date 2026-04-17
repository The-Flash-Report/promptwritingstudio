import fs from 'fs'
import path from 'path'

const modelGuidesDirectory = path.join(process.cwd(), 'data/model-guides')

export function getAllModelSlugs() {
  try {
    if (!fs.existsSync(modelGuidesDirectory)) return []
    return fs
      .readdirSync(modelGuidesDirectory)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace(/\.json$/, ''))
  } catch (error) {
    console.error('Error getting model guide slugs:', error)
    return []
  }
}

export function getModelGuideData(slug) {
  try {
    const fullPath = path.join(modelGuidesDirectory, `${slug}.json`)
    if (!fs.existsSync(fullPath)) return null
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error loading model guide data for ${slug}:`, error)
    return null
  }
}

export function getAllModelGuides() {
  return getAllModelSlugs().map(slug => getModelGuideData(slug)).filter(Boolean)
}
