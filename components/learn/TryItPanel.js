import { useEffect, useState } from 'react'

// Per v1 PRD: anonymous persistence only — variants live in localStorage,
// keyed by module slug. No server-side store. No account, no auth.

function storageKey(moduleSlug) {
  return `pws.learn.variants.${moduleSlug}`
}

function loadVariants(moduleSlug) {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(storageKey(moduleSlug))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveVariants(moduleSlug, variants) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(storageKey(moduleSlug), JSON.stringify(variants))
  } catch {
    // Quota exceeded or storage blocked — fail silent, the run still worked.
  }
}

export default function TryItPanel({ moduleSlug, starterPrompt, hint }) {
  const [promptText, setPromptText] = useState(starterPrompt || '')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [remaining, setRemaining] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [variants, setVariants] = useState([])
  const [saveLabel, setSaveLabel] = useState('')

  useEffect(() => {
    setVariants(loadVariants(moduleSlug))
  }, [moduleSlug])

  async function runPrompt() {
    if (isRunning) return
    setIsRunning(true)
    setError('')
    setOutput('')

    try {
      const res = await fetch('/api/learn/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, moduleSlug }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Run failed.')
        if (typeof data.remaining === 'number') setRemaining(data.remaining)
      } else {
        setOutput(data.output || '')
        if (typeof data.remaining === 'number') setRemaining(data.remaining)
      }
    } catch {
      setError('Network error. Try again.')
    } finally {
      setIsRunning(false)
    }
  }

  function saveCurrentVariant() {
    if (!promptText.trim()) return
    const label = saveLabel.trim() || `Variant ${variants.length + 1}`
    const next = [
      ...variants,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        label,
        prompt: promptText,
        savedAt: new Date().toISOString(),
      },
    ]
    setVariants(next)
    saveVariants(moduleSlug, next)
    setSaveLabel('')
  }

  function loadVariant(id) {
    const v = variants.find(x => x.id === id)
    if (v) setPromptText(v.prompt)
  }

  function deleteVariant(id) {
    const next = variants.filter(x => x.id !== id)
    setVariants(next)
    saveVariants(moduleSlug, next)
  }

  function resetToStarter() {
    setPromptText(starterPrompt || '')
  }

  return (
    <div className="border border-[#E5E5E5] rounded-lg bg-white p-5 md:p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#1A1A1A]">Try it</h3>
        {remaining !== null && (
          <span className="text-xs text-gray-500">
            {remaining} runs left today
          </span>
        )}
      </div>

      <label htmlFor={`prompt-${moduleSlug}`} className="sr-only">
        Prompt
      </label>
      <textarea
        id={`prompt-${moduleSlug}`}
        value={promptText}
        onChange={e => setPromptText(e.target.value)}
        rows={8}
        className="w-full text-sm font-mono border border-[#E5E5E5] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-transparent"
        spellCheck={false}
      />

      {hint && (
        <p className="text-xs text-gray-500 mt-2">{hint}</p>
      )}

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          type="button"
          onClick={runPrompt}
          disabled={isRunning || !promptText.trim()}
          className="bg-[#FFDE59] text-black font-semibold px-5 py-2 rounded-md hover:bg-[#FFD633] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? 'Running...' : 'Run prompt'}
        </button>
        <button
          type="button"
          onClick={resetToStarter}
          className="border border-[#E5E5E5] text-[#333333] px-4 py-2 rounded-md hover:bg-gray-50"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-800">
          {error}
        </div>
      )}

      {output && (
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2">Model output</h4>
          <pre className="whitespace-pre-wrap text-sm bg-[#F9F9F9] border border-[#E5E5E5] rounded-md p-4 text-[#333333]">
            {output}
          </pre>
        </div>
      )}

      <div className="mt-6 pt-5 border-t border-[#E5E5E5]">
        <h4 className="text-sm font-semibold text-[#1A1A1A] mb-2">Save your variant</h4>
        <p className="text-xs text-gray-500 mb-3">
          Saved variants stay in your browser only. Clearing site data removes them.
        </p>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={saveLabel}
            onChange={e => setSaveLabel(e.target.value)}
            placeholder="Label (optional)"
            className="text-sm border border-[#E5E5E5] rounded-md px-3 py-2 flex-1 min-w-0"
          />
          <button
            type="button"
            onClick={saveCurrentVariant}
            disabled={!promptText.trim()}
            className="border border-[#1A1A1A] text-[#1A1A1A] font-semibold px-4 py-2 rounded-md hover:bg-[#1A1A1A] hover:text-white disabled:opacity-50"
          >
            Save variant
          </button>
        </div>

        {variants.length > 0 && (
          <ul className="mt-4 space-y-2">
            {variants.map(v => (
              <li
                key={v.id}
                className="flex items-center justify-between text-sm border border-[#E5E5E5] rounded-md px-3 py-2"
              >
                <span className="text-[#1A1A1A] truncate flex-1 mr-3">{v.label}</span>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => loadVariant(v.id)}
                    className="text-xs text-[#1A1A1A] underline hover:no-underline"
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteVariant(v.id)}
                    className="text-xs text-gray-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
