const fs = require('fs');
const path = require('path');

const PROMPTS_DIR = path.join(process.cwd(), 'data/observatory/prompts');

function loadAllPrompts() {
  if (!fs.existsSync(PROMPTS_DIR)) return [];
  return fs
    .readdirSync(PROMPTS_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(PROMPTS_DIR, f), 'utf8')))
    .sort((a, b) => a.id.localeCompare(b.id));
}

function loadPromptById(id) {
  const filePath = path.join(PROMPTS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

module.exports = { loadAllPrompts, loadPromptById };
