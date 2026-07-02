// Edits mode must run exactly ONE judge attempt (function-wall constraint) with
// salvage active; full mode keeps its strict-then-salvage two attempts.
import { critiquePrompt } from '../../lib/critique'

const FILE = 'You are the repo agent. Build with npm run build. Never push to main. On errors, stop and report.'

function countingFetch(payload) {
  let n = 0
  const fetchImpl = async () => {
    n++
    return {
      ok: true, status: 200,
      json: async () => ({ id: 'msg', content: [{ type: 'text', text: JSON.stringify(payload) }], usage: { input_tokens: 100, output_tokens: 100 } }),
    }
  }
  return { fetchImpl, calls: () => n }
}

const agentEnvelope = {
  safety_flag: '',
  criteria: [
    { id: 'identity_scope', score: 2, justification: 'Role stated.', evidence_span: 'You are the repo agent' },
    { id: 'environment_context', score: 2, justification: 'Build cmd given.', evidence_span: 'Build with npm run build' },
    { id: 'behavioral_rules', score: 2, justification: 'Concrete ban.', evidence_span: 'Never push to main' },
    { id: 'failure_guidance', score: 2, justification: 'Error path given.', evidence_span: 'On errors, stop and report' },
    { id: 'maintainability', score: 0, justification: 'No structure.', evidence_span: '' },
  ],
  failure_modes: ['No directory map: the agent will guess at paths.'],
  revisions: [
    { issue: 'Identity lacks project name', before_excerpt: 'You are the repo agent', after_excerpt: 'You are the agent for the ACME web repo' },
    // one fabricated excerpt — salvage must DROP it on the single attempt, not retry
    { issue: 'Fabricated', before_excerpt: 'this text is not in the file', after_excerpt: 'anything' },
  ],
  summary: 'Decent skeleton.',
}

test('edits mode: single attempt, fabricated revision dropped via salvage', async () => {
  const { fetchImpl, calls } = countingFetch(agentEnvelope)
  const result = await critiquePrompt({
    targetPrompt: FILE, rubricId: 'agent-prompt', judgeModel: 'grader-haiku',
    studioAnthropicKey: 'k', fetchImpl,
  })
  expect(calls()).toBe(1) // never retries in edits mode
  expect(result.revisions).toHaveLength(1)
  expect(result.revisions[0].before_excerpt).toBe('You are the repo agent')
})
