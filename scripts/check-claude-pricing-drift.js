#!/usr/bin/env node
// Weekly drift check: compares data/claude-models.json against Anthropic's live
// docs. If the current-model pricing strings no longer appear on the page,
// writes a delta report to stdout and exits non-zero (so the workflow opens an
// issue). We do NOT auto-update the JSON — Bryan reviews and commits.
//
// Checks:
//   1. Each current model ID appears on the models overview page
//   2. Each current model's input + output prices match the page text
//   3. Each consumer plan ID appears on the pricing page (name check only —
//      plan prices and limits change wording too often for strict match)

const fs = require('fs')
const path = require('path')

const models = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'claude-models.json'), 'utf-8'))
const plans = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'claude-plans.json'), 'utf-8'))

const MODELS_URL = 'https://platform.claude.com/docs/en/about-claude/models/overview'
const PRICING_URL = 'https://claude.com/pricing'

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'pws-drift-check/1.0' } })
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  return res.text()
}

function reportSection(title) {
  console.log(`\n## ${title}\n`)
}

async function main() {
  const issues = []
  let modelsHtml, pricingHtml

  try {
    modelsHtml = await fetchText(MODELS_URL)
  } catch (e) {
    issues.push(`Could not fetch models page: ${e.message}`)
  }

  try {
    pricingHtml = await fetchText(PRICING_URL)
  } catch (e) {
    issues.push(`Could not fetch pricing page: ${e.message}`)
  }

  console.log('# Claude pricing drift check')
  console.log(`\nRan: ${new Date().toISOString()}`)
  console.log(`\n- Models SSOT last verified: ${models._meta.lastVerified}`)
  console.log(`- Plans SSOT last verified: ${plans._meta.lastVerified}`)

  if (modelsHtml) {
    reportSection('Current model checks')
    for (const m of models.current) {
      const aliasFound = modelsHtml.includes(m.alias)
      const idFound = modelsHtml.includes(m.id)
      const inputPriceFound = modelsHtml.includes(`$${m.inputPricePerMTok} / input MTok`) || modelsHtml.includes(`\\$${m.inputPricePerMTok} / input MTok`)
      const outputPriceFound = modelsHtml.includes(`$${m.outputPricePerMTok} / output MTok`) || modelsHtml.includes(`\\$${m.outputPricePerMTok} / output MTok`)

      const ok = (aliasFound || idFound) && inputPriceFound && outputPriceFound
      const icon = ok ? 'OK  ' : 'DRIFT'
      console.log(`- [${icon}] ${m.name} (${m.alias}): alias=${aliasFound} id=${idFound} inPrice=${inputPriceFound} outPrice=${outputPriceFound}`)

      if (!ok) {
        issues.push(`${m.name}: model ID or pricing no longer found on source page. Expected $${m.inputPricePerMTok}/$${m.outputPricePerMTok} per MTok.`)
      }
    }
  }

  if (pricingHtml) {
    reportSection('Consumer plan checks (name presence only)')
    for (const p of plans.consumer) {
      const lower = pricingHtml.toLowerCase()
      const nameFound = lower.includes(p.name.toLowerCase().split(' ')[0])
      const icon = nameFound ? 'OK  ' : 'DRIFT'
      console.log(`- [${icon}] ${p.name}: name found on pricing page = ${nameFound}`)
      if (!nameFound) {
        issues.push(`Plan "${p.name}" name no longer found on pricing page — plan may have been renamed or retired.`)
      }
    }
  }

  reportSection('Summary')
  if (issues.length === 0) {
    console.log('No drift detected. SSOT files still match live sources.')
    process.exit(0)
  } else {
    console.log(`${issues.length} drift item(s) detected:\n`)
    issues.forEach((i, idx) => console.log(`${idx + 1}. ${i}`))
    console.log('\nNext step: review the live pages manually, update `data/claude-models.json` and/or `data/claude-plans.json`, bump `_meta.lastVerified`, commit.')
    process.exit(1)
  }
}

main().catch(e => {
  console.error('Drift check crashed:', e)
  process.exit(2)
})
