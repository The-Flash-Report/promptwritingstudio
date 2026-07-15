#!/usr/bin/env node
// Deterministic "prompt of the week" broadcast DRAFT generator. Zero LLM calls.
//
// This assembles a ready-to-send broadcast draft from the prompt library and
// nothing else: same week in, same bytes out. It NEVER sends anything. The
// output is a draft Bryan pastes into Resend and sends manually. There is no
// send path in this repo by design (PWS is bench; approve-first on any
// broadcast).
//
// Usage:
//   node scripts/generate-prompt-of-the-week.js            # print draft to stdout
//   node scripts/generate-prompt-of-the-week.js --write    # also write broadcasts/prompt-of-the-week-<year>-W<week>.md
//   node scripts/generate-prompt-of-the-week.js --out path.md
//   node scripts/generate-prompt-of-the-week.js --date 2026-07-15   # pin the ISO week
//   node scripts/generate-prompt-of-the-week.js --week 29           # pin the selection index
//
// Determinism: stdout carries no wall-clock timestamp, so two runs in the same
// ISO week produce byte-identical output (the DoD "run twice, diff" check).

const fs = require('fs')
const path = require('path')
const { pathToFileURL } = require('url')

// ISO 8601 week number (Monday-based, week that contains the first Thursday).
function isoWeek(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
  const day = (d.getUTCDay() + 6) % 7
  d.setUTCDate(d.getUTCDate() - day + 3)
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4))
  const week = 1 + Math.round(((d - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7)
  return { year: d.getUTCFullYear(), week }
}

function parseArgs(argv) {
  const args = { write: false, out: null, week: null, date: null }
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--write') args.write = true
    else if (a === '--out') args.out = argv[++i]
    else if (a === '--week') args.week = parseInt(argv[++i], 10)
    else if (a === '--date') args.date = argv[++i]
  }
  return args
}

function buildDraft(prompt, label) {
  const url = `https://promptwritingstudio.com/prompt-library/${prompt.slug}`
  const subject = `${prompt.title}: a prompt worth saving`
  return `# Prompt of the week (${label})

Subject: ${subject}

Hi there,

This week's prompt from the PromptWritingStudio library is ${prompt.title}. ${prompt.description}.

It is a full-length template, so fill in anything in [BRACKETS] with your own detail before you run it.

---

${prompt.prompt}

---

Copy the latest version, see how to use it, and grade your own edit here:
${url}

Until next week,
Bryan

You are getting this because you subscribed at promptwritingstudio.com. The unsubscribe link is at the bottom of this email.
`
}

;(async () => {
  const args = parseArgs(process.argv)
  const libUrl = pathToFileURL(path.join(__dirname, '..', 'lib', 'promptLibrary.js')).href
  const lib = await import(libUrl)

  const now = args.date ? new Date(`${args.date}T12:00:00Z`) : new Date()
  const { year, week } = isoWeek(now)
  const label = `${year}-W${String(week).padStart(2, '0')}`
  const weekNumber = Number.isInteger(args.week) ? args.week : week

  const prompt = lib.getPromptOfTheWeek(weekNumber)
  if (!prompt) {
    console.error('No prompts in the library; nothing to generate.')
    process.exit(1)
  }

  const draft = buildDraft(prompt, label)
  process.stdout.write(draft)

  if (args.write || args.out) {
    const outPath = args.out || path.join(__dirname, '..', 'broadcasts', `prompt-of-the-week-${label}.md`)
    fs.mkdirSync(path.dirname(outPath), { recursive: true })
    fs.writeFileSync(outPath, draft)
    // stderr so stdout stays byte-stable for the determinism diff.
    console.error(`Wrote ${outPath}`)
  }
})().catch(err => {
  console.error(err)
  process.exit(1)
})
