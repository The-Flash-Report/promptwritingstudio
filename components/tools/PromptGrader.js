import { useEffect, useState } from 'react'
import EmailCapture from '../ui/EmailCapture'
import { createSavedLibrary, getBrowserStorage } from '../../lib/studio/savedLibrary'

const TARGETS = [
  { id: 'claude', label: 'Claude' },
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'gemini', label: 'Gemini' },
]

const EXAMPLES = [
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

// Free-plan history cap (client-side; the paid plan lifts it).
const FREE_HISTORY_MAX = 3

const SCORE_COLORS = ['bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-green-500']

function getLibrary() {
  const storage = getBrowserStorage()
  return storage ? createSavedLibrary(storage) : null
}

function loadHistory() {
  const lib = getLibrary()
  if (!lib) return []
  return lib.list().filter(it => it.source === 'prompt-grader')
}

function saveToHistory(prompt, result) {
  const lib = getLibrary()
  if (!lib) return []
  const title = prompt.length > 64 ? `${prompt.slice(0, 64)}…` : prompt
  const item = lib.save({ title, body: prompt, tags: [`score:${result.overall.percentage}`], source: 'prompt-grader' })
  lib.update(item.id, { grade: result })
  // Free plan keeps the newest FREE_HISTORY_MAX grades.
  const entries = lib.list().filter(it => it.source === 'prompt-grader')
  entries.slice(FREE_HISTORY_MAX).forEach(old => lib.remove(old.id))
  return loadHistory()
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

export default function PromptGrader() {
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
    setHistory(loadHistory())
    setGradedOnce(loadHistory().length > 0)
  }, [])

  async function grade() {
    if (!prompt.trim() || status === 'grading') return
    setStatus('grading')
    setError('')
    setCopied(false)
    try {
      const res = await fetch('/api/studio/critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetPrompt: prompt, target }),
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
        setHistory(saveToHistory(prompt, data))
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
          Paste your prompt
        </label>
        <textarea
          id="grader-input"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={7}
          maxLength={8000}
          placeholder="Paste the prompt you give ChatGPT, Claude, or Gemini. The grader scores it on 5 criteria and rewrites it."
          className="w-full border border-gray-300 rounded-lg p-4 text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#FFDE59] resize-y"
        />
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-sm text-gray-500">No prompt handy? Try one:</span>
          {EXAMPLES.map(ex => (
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
          <button
            type="button"
            onClick={grade}
            disabled={status === 'grading' || !prompt.trim() || outOfGrades}
            className="sm:ml-auto bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'grading' ? 'Grading…' : 'Grade my prompt'}
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

          {gradedOnce && (
            <div className="bg-white rounded-lg shadow-md border border-[#E5E5E5] p-6">
              <h3 className="font-bold text-[#1A1A1A]">Keep your graded prompts</h3>
              <p className="text-sm text-[#333333] mt-1 mb-3">
                Your last {FREE_HISTORY_MAX} grades are saved in this browser. Get prompt-writing tips and first
                access to the unlimited plan by email.
              </p>
              <EmailCapture source="prompt-grader" label="" buttonText="Subscribe" theme="light" />
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
