import fs from 'fs'
import path from 'path'

const promptExamplesDirectory = path.join(process.cwd(), 'data/prompt-examples')

export function getAllPromptExampleSlugs() {
  try {
    if (!fs.existsSync(promptExamplesDirectory)) return []
    return fs
      .readdirSync(promptExamplesDirectory)
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace(/\.json$/, ''))
  } catch (error) {
    console.error('Error getting prompt example slugs:', error)
    return []
  }
}

export function getPromptExampleData(slug) {
  try {
    const fullPath = path.join(promptExamplesDirectory, `${slug}.json`)
    if (!fs.existsSync(fullPath)) return null
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error loading prompt example data for ${slug}:`, error)
    return null
  }
}

export function getAllPromptExamples() {
  return getAllPromptExampleSlugs().map(slug => getPromptExampleData(slug)).filter(Boolean)
}
