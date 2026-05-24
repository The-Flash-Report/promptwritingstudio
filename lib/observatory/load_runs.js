const fs = require('fs');
const path = require('path');

const RUNS_DIR = path.join(process.cwd(), 'data/observatory/runs');
const REPORTS_DIR = path.join(process.cwd(), 'data/observatory/reports');

function loadRunDates() {
  if (!fs.existsSync(RUNS_DIR)) return [];
  return fs
    .readdirSync(RUNS_DIR)
    .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .reverse();
}

function loadRunsByDate(date) {
  const dir = path.join(RUNS_DIR, date);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
}

function loadRunsForPrompt(promptId) {
  const dates = loadRunDates();
  const runs = [];
  for (const date of dates) {
    const filePath = path.join(RUNS_DIR, date, `${promptId}.json`);
    if (fs.existsSync(filePath)) {
      runs.push(JSON.parse(fs.readFileSync(filePath, 'utf8')));
    }
  }
  return runs.sort((a, b) => a.run_id.localeCompare(b.run_id));
}

function parseReportFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };

  const raw = match[1];
  const body = content.slice(match[0].length).trim();
  const frontmatter = {};

  const lines = raw.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (!kvMatch) { i++; continue; }

    const key = kvMatch[1];
    const val = kvMatch[2].trim();

    if (val === '' || val === '[]') {
      // possibly an array block
      const items = [];
      i++;
      while (i < lines.length && lines[i].startsWith('  - ')) {
        const item = {};
        const itemLine = lines[i].slice(4);
        const firstField = itemLine.match(/^(\w+):\s*(.+)$/);
        if (firstField) item[firstField[1]] = coerce(firstField[2]);
        i++;
        while (i < lines.length && lines[i].startsWith('    ')) {
          const fieldMatch = lines[i].trim().match(/^(\w+):\s*(.+)$/);
          if (fieldMatch) item[fieldMatch[1]] = coerce(fieldMatch[2]);
          i++;
        }
        items.push(item);
      }
      frontmatter[key] = val === '[]' ? [] : items;
      continue;
    }

    frontmatter[key] = coerce(val);
    i++;
  }

  return { frontmatter, body };
}

function coerce(val) {
  if (val === 'true') return true;
  if (val === 'false') return false;
  const n = Number(val);
  if (!isNaN(n) && val !== '') return n;
  return val;
}

function loadReportByDate(date) {
  const filePath = path.join(REPORTS_DIR, `${date}.md`);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  const { frontmatter, body } = parseReportFrontmatter(content);
  return { date, frontmatter, body };
}

function loadReportDates() {
  if (!fs.existsSync(REPORTS_DIR)) return [];
  return fs
    .readdirSync(REPORTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
    .filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))
    .sort()
    .reverse();
}

module.exports = {
  loadRunDates,
  loadRunsByDate,
  loadRunsForPrompt,
  loadReportByDate,
  loadReportDates,
};
