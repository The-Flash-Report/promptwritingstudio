import fs from 'fs'
import path from 'path'

const RUNS_DIR = path.join(process.cwd(), 'data/observatory/runs')
const PROMPTS_DIR = path.join(process.cwd(), 'data/observatory/prompts')

export function loadPrompt(promptId) {
  const filePath = path.join(PROMPTS_DIR, `${promptId}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function listPromptIds() {
  if (!fs.existsSync(PROMPTS_DIR)) return []
  return fs.readdirSync(PROMPTS_DIR)
    .filter(f => f.endsWith('.json') && f !== '.gitkeep')
    .map(f => f.replace('.json', ''))
}

function listRunDates() {
  if (!fs.existsSync(RUNS_DIR)) return []
  return fs.readdirSync(RUNS_DIR)
    .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .reverse()
}

function loadRunFile(runDate, promptId) {
  const filePath = path.join(RUNS_DIR, runDate, `${promptId}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function loadAllRunsForPrompt(promptId) {
  const dates = listRunDates()
  const runs = []
  for (const date of dates) {
    const run = loadRunFile(date, promptId)
    if (run) runs.push(run)
  }
  return runs
}

// Returns a flat array of all run objects across all prompts and dates
export function loadAllRuns() {
  const dates = listRunDates()
  const runs = []
  for (const date of dates) {
    const dateDir = path.join(RUNS_DIR, date)
    if (!fs.existsSync(dateDir)) continue
    const files = fs.readdirSync(dateDir)
      .filter(f => f.endsWith('.json') && f !== '_index.json')
    for (const file of files) {
      const promptId = file.replace('.json', '')
      const run = loadRunFile(date, promptId)
      if (run) runs.push(run)
    }
  }
  return runs
}
