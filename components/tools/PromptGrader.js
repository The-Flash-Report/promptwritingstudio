import { useEffect, useState } from 'react'
import EmailCapture from '../ui/EmailCapture'
import { createSavedLibrary, getBrowserStorage } from '../../lib/studio/savedLibrary'

const TARGETS = [
  { id: 'claude', label: 'Claude' },
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'gemini', label: 'Gemini' },
]

const CHAT_EXAMPLES = [
  { label: 'Weak prompt', text: 'write a blog post about productivity' },
  {
    label: 'Decent prompt',
    text: 'Write a 600-word blog post about time-blocking for freelance designers. Friendly tone, include 3 practical examples.',
  },
  {
    label: 'Strong prompt',
    text: 'You are an experienced productivity coach who writes for creative freelancers. Write a 600-word blog post about time-blocking for freelance designers juggling 3+ clients. Structure: a hook about context-switching costs, 3 practical time-blocking techniques with a concrete example each, and a closing action step. Friendly, direct tone. Avoid generic advice like "stay focused". Format with H2 subheadings and short paragraphs.',
  },
]

const AGENT_EXAMPLES = [
  {
    label: 'Thin CLAUDE.md',
    text: 'You are a helpful coding assistant. Help the user with their code.',
  },
  {
    label: 'Partial CLAUDE.md',
    text: `# Project assistant\n\nYou help with a Next.js site. Use Tailwind for styling. Don't break existing pages.`,
  },
]

// Free-plan history cap (client-side; the paid plan lifts it).
const FREE_HISTORY_MAX = 3

const SCORE_COLORS = ['bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-green-500']

function getLibrary() {
  const storage = getBrowserStorage()
  return storage ? createSavedLibrary(storage) : null
}

function loadHistory(historySource) {
  const lib = getLibrary()
  if (!lib) return []
  return lib.list().filter(it => it.source === historySource)
}

function saveToHistory(prompt, result, historySource) {
  const lib = getLibrary()
  if (!lib) return []
  const title = prompt.length > 64 ? `${prompt.slice(0, 64)}…` : prompt
  const rubricTag = `rubric:${result.rubricId || 'prompt-quality'}`
  const item = lib.save({
    title,
    body: prompt,
    tags: [`score:${result.overall.percentage}`, rubricTag],
    source: historySource,
  })
  lib.update(item.id, { grade: result })
  // Free plan keeps the newest FREE_HISTORY_MAX grades per source.
  const entries = lib.list().filter(it => it.source === historySource)
  entries.slice(FREE_HISTORY_MAX).forEach(old => lib.remove(old.id))
  return loadHistory(historySource)
}

function ScoreBar({ score, max }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-6 rounded-full ${i < score ? SCORE_COLORS[Math.min(score, 3)] : 'bg-gray-200'}`}
        />
      ))}
    </div>
  )
}

function OverallBadge({ overall }) {
  const pct = overall.percentage
  const tone = pct >= 75 ? 'text-green-600' : pct >= 45 ? 'text-amber-500' : 'text-red-500'
  const verdict = pct >= 75 ? 'Strong prompt' : pct >= 45 ? 'Usable, with gaps' : 'Needs a rewrite'
  return (
    <div className="text-center">
      <div className={`text-6xl font-bold ${tone}`}>{pct}</div>
      <div className="text-sm text-gray-500 mt-1">out of 100</div>
      <div className="mt-2 font-semibold text-[#1A1A1A]">{verdict}</div>
    </div>
  )
}

export default function PromptGrader({
  rubricId = 'prompt-quality',
  historySource = 'prompt-grader',
  placeholder,
  examples,
  heading,
} = {}) {
  const isEditsMode = rubricId === 'agent-prompt'
  const effectiveExamples = examples ?? (isEditsMode ? AGENT_EXAMPLES : CHAT_EXAMPLES)
  const effectivePlaceholder =
    placeholder ??
    (isEditsMode
      ? 'Paste your CLAUDE.md or agent system prompt. The grader scores it on 5 agent-specific criteria and suggests targeted edits.'
      : 'Paste the prompt you give ChatGPT, Claude, or Gemini. The grader scores it on 5 criteria and rewrites it.')
  const effectiveHeading = heading ?? (isEditsMode ? 'Paste your CLAUDE.md or system prompt' : 'Paste your prompt')
  const effectiveMaxLength = isEditsMode ? 24000 : 8000
  const gradeButtonLabel = isEditsMode ? 'Grade my agent prompt' : 'Grade my prompt'

  const [prompt, setPrompt] = useState('')
  const [target, setTarget] = useState('claude')
  const [status, setStatus] = useState('idle') // idle | grading | done | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [meter, setMeter] = useState(null)
  const [history, setHistory] = useState([])
  const [gradedOnce, setGradedOnce] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setHistory(loadHistory(historySource))
    setGradedOnce(loadHistory(historySource).length > 0)
  }, [historySource])

  async function grade() {
    if (!prompt.trim() || status === 'grading') return
    setStatus('grading')
    setError('')
    setCopied(false)
    try {
      const body = { targetPrompt: prompt, rubricId }
      if (!isEditsMode) body.target = target
      const res = await fetch('/api/studio/critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.meter) setMeter(data.meter)
        setError(data.error || 'Grading failed. Try again in a moment.')
        setStatus('error')
        return
      }
      setResult(data)
      if (data.meter) setMeter(data.meter)
      setStatus('done')
      setGradedOnce(true)
      if (!data.flagged) {
        setHistory(saveToHistory(prompt, data, historySource))
      }
    } catch (e) {
      setError('Could not reach the grader. Check your connection and try again.')
      setStatus('error')
    }
  }

  function copyRewrite() {
    if (!result?.rewrite) return
    navigator.clipboard.writeText(result.rewrite).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function restore(item) {
    setPrompt(item.body)
    if (item.grade) {
      setResult(item.grade)
      setStatus('done')
    }
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const outOfGrades = meter && meter.remaining === 0
  const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK

  return (
    <div className="max-w-3xl mx-auto">
      {/* Input */}
      <div className="bg-white rounded-lg shadow-md border border-[#E5E5E5] p-6">
        <label htmlFor="grader-input" className="block font-bold text-[#1A1A1A] mb-2">
          {effectiveHeading}
        </label>
        <textarea
          id="grader-input"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={isEditsMode ? 12 : 7}
          maxLength={effectiveMaxLength}
          placeholder={effectivePlaceholder}
          className="w-full border border-gray-300 rounded-lg p-4 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#FFDE59] resize-y"
        />
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-sm text-gray-500">No prompt handy? Try one:</span>
          {effectiveExamples.map(ex => (
            <button
              key={ex.label}
              type="button"
              onClick={() => setPrompt(ex.text)}
              className="text-sm px-3 py-1 rounded-full border border-gray-300 text-[#333333] hover:border-[#FFDE59] hover:bg-yellow-50 transition"
            >
              {ex.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-5">
          {!isEditsMode && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#333333]">Rewrite for:</span>
              {TARGETS.map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTarget(t.id)}
                  className={`text-sm px-3 py-1 rounded-full border transition ${
                    target === t.id
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'border-gray-300 text-[#333333] hover:border-gray-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
          <button
            type="button"
            onClick={grade}
            disabled={status === 'grading' || !prompt.trim() || outOfGrades}
            className={`${!isEditsMode ? 'sm:ml-auto' : ''} bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {status === 'grading' ? 'Grading…' : gradeButtonLabel}
          </button>
        </div>
        {meter && !outOfGrades && (
          <p className="text-sm text-gray-500 mt-3">
            {meter.remaining} of {meter.limit} free grades left today.
          </p>
        )}
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      </div>

      {/* Out of grades: the paywall boundary */}
      {outOfGrades && (
        <div className="mt-6 bg-[#1A1A1A] text-white rounded-lg p-6">
          <h3 className="text-xl font-bold">You have used your {meter.limit} free grades for today</h3>
          <p className="mt-2 text-gray-300">
            The Pro plan removes the daily cap and keeps your full grading history: unlimited grades, all three
            model rewrites, and a saved prompt library.
          </p>
          {paymentLink ? (
            <a
              href={paymentLink}
              className="inline-block mt-4 bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
            >
              Upgrade to Pro
            </a>
          ) : (
            <div className="mt-4">
              <EmailCapture
                source="prompt-grader-upgrade"
                label="Pro launches soon. Join the founding-member list and get it at the launch price."
                buttonText="Join the list"
                theme="dark"
              />
            </div>
          )}
          <p className="text-sm text-gray-400 mt-3">Or come back tomorrow: 3 free grades every day.</p>
        </div>
      )}

      {/* Flagged result */}
      {status === 'done' && result?.flagged && (
        <div className="mt-6 bg-amber-50 border border-amber-300 rounded-lg p-6">
          <h3 className="font-bold text-[#1A1A1A]">This prompt was not graded</h3>
          <p className="text-[#333333] mt-2">
            The grader declined to score or improve this prompt: {result.safetyReason} If you think this is a
            mistake, rephrase the legitimate goal (for example, name the fictional or research context) and try
            again.
          </p>
        </div>
      )}

      {/* Result */}
      {status === 'done' && result && !result.flagged && (
        <div className="mt-6 space-y-6">
          <div className="bg-white rounded-lg shadow-md border border-[#E5E5E5] p-6">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <OverallBadge overall={result.overall} />
              <div className="md:col-span-2">
                <p className="text-[#333333]">{result.summary}</p>
                {result.failureModes?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wide">
                      How this prompt goes wrong
                    </h4>
                    <ul className="mt-2 space-y-1">
                      {result.failureModes.map((m, i) => (
                        <li key={i} className="text-[#333333] text-sm flex gap-2">
                          <span className="text-red-400 font-bold shrink-0">!</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-[#E5E5E5] p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-4">Score breakdown</h3>
            <div className="space-y-4">
              {result.criteria.map(c => (
                <div key={c.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-[#1A1A1A]">{c.name}</span>
                    <ScoreBar score={c.score} max={result.scale.max} />
                  </div>
                  <p className="text-sm text-[#333333] mt-1">{c.justification}</p>
                  {c.evidenceSpan && (
                    <p className="text-sm text-gray-500 mt-1">
                      From your prompt: <span className="italic">"{c.evidenceSpan}"</span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isEditsMode && result.revisions?.length > 0 && (
            <div className="bg-[#F9F9F9] rounded-lg border border-[#E5E5E5] p-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4">Suggested edits</h3>
              <div className="space-y-4">
                {result.revisions.map((rev, i) => (
                  <div key={i} className="bg-white border border-[#E5E5E5] rounded-lg p-4">
                    <p className="text-sm font-semibold text-[#1A1A1A] mb-2">{rev.issue}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Before</span>
                        <pre className="whitespace-pre-wrap text-sm text-red-700 bg-red-50 border border-red-100 rounded p-3 mt-1 font-sans">
                          {rev.before_excerpt}
                        </pre>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">After</span>
                        <pre className="whitespace-pre-wrap text-sm text-green-800 bg-green-50 border border-green-100 rounded p-3 mt-1 font-sans">
                          {rev.after_excerpt}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isEditsMode && result.rewrite && (
            <div className="bg-[#F9F9F9] rounded-lg border border-[#E5E5E5] p-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="font-bold text-[#1A1A1A]">
                  Rewritten for {TARGETS.find(t => t.id === (result.target || target))?.label}
                </h3>
                <button
                  type="button"
                  onClick={copyRewrite}
                  className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition text-sm"
                >
                  {copied ? 'Copied!' : 'Copy rewrite'}
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-[#333333] font-sans bg-white border border-gray-200 rounded-lg p-4">
                {result.rewrite}
              </pre>
              <p className="text-sm text-gray-500 mt-3">
                Anything in [BRACKETS] is a detail only you know. Fill it in before you run the prompt.
              </p>
            </div>
          )}

          {gradedOnce && (
            <div className="bg-white rounded-lg shadow-md border border-[#E5E5E5] p-6">
              <h3 className="font-bold text-[#1A1A1A]">Keep your graded prompts</h3>
              <p className="text-sm text-[#333333] mt-1 mb-3">
                Your last {FREE_HISTORY_MAX} grades are saved in this browser. Get prompt-writing tips and first
                access to the unlimited plan by email.
              </p>
              <EmailCapture source={historySource} label="" buttonText="Subscribe" theme="light" />
            </div>
          )}
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="mt-10">
          <h3 className="font-bold text-[#1A1A1A] mb-3">Recent grades on this device</h3>
          <div className="space-y-2">
            {history.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => restore(item)}
                className="w-full text-left bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 hover:border-[#FFDE59] transition flex items-center justify-between gap-4"
              >
                <span className="text-sm text-[#333333] truncate">{item.title}</span>
                {item.grade?.overall && (
                  <span className="text-sm font-bold text-[#1A1A1A] shrink-0">
                    {item.grade.overall.percentage}/100
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            The free plan keeps your last {FREE_HISTORY_MAX} grades. Pro keeps everything.
          </p>
        </div>
      )}
    </div>
  )
}
