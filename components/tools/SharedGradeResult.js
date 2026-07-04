// Read-only renderer for a frozen grade snapshot (the `grade` object stored in
// a share record). Mirrors the live grader's result markup but has no state or
// actions — it renders a persisted grade on /g/[id]. Kept separate from
// PromptGrader so the interactive tool is untouched by the public view.

const SCORE_COLORS = ['bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-green-500']

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

function verdict(pct, editsMode) {
  if (pct >= 75) return editsMode ? 'Strong agent prompt' : 'Strong prompt'
  if (pct >= 45) return 'Usable, with gaps'
  return editsMode ? 'Needs significant work' : 'Needs a rewrite'
}

export default function SharedGradeResult({ grade, promptText }) {
  if (!grade || grade.flagged) return null
  const pct = grade.overall?.percentage ?? 0
  const editsMode = grade.rubricId === 'agent-prompt'
  const tone = pct >= 75 ? 'text-green-600' : pct >= 45 ? 'text-amber-500' : 'text-red-500'

  return (
    <div className="space-y-6">
      {/* Score + summary */}
      <div className="bg-white rounded-lg shadow-md border border-[#E5E5E5] p-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="text-center">
            <div className={`text-6xl font-bold ${tone}`}>{pct}</div>
            <div className="text-sm text-gray-500 mt-1">out of 100</div>
            <div className="mt-2 font-semibold text-[#1A1A1A]">{verdict(pct, editsMode)}</div>
          </div>
          <div className="md:col-span-2">
            {grade.summary && <p className="text-[#333333]">{grade.summary}</p>}
            {grade.failureModes?.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold text-[#1A1A1A] text-sm uppercase tracking-wide">
                  How this prompt goes wrong
                </h4>
                <ul className="mt-2 space-y-1">
                  {grade.failureModes.map((m, i) => (
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

      {/* The graded prompt */}
      {promptText && (
        <div className="bg-[#F9F9F9] rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="font-bold text-[#1A1A1A] mb-3">The graded prompt</h3>
          <pre className="whitespace-pre-wrap text-sm text-[#333333] font-sans bg-white border border-gray-200 rounded-lg p-4">
            {promptText}
          </pre>
        </div>
      )}

      {/* Score breakdown */}
      {grade.criteria?.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-[#E5E5E5] p-6">
          <h3 className="font-bold text-[#1A1A1A] mb-4">Score breakdown</h3>
          <div className="space-y-4">
            {grade.criteria.map(c => (
              <div key={c.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-[#1A1A1A]">{c.name}</span>
                  <ScoreBar score={c.score} max={grade.scale?.max ?? 4} />
                </div>
                {c.justification && <p className="text-sm text-[#333333] mt-1">{c.justification}</p>}
                {c.evidenceSpan && (
                  <p className="text-sm text-gray-500 mt-1">
                    From the prompt: <span className="italic">"{c.evidenceSpan}"</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rewrite */}
      {!editsMode && grade.rewrite && (
        <div className="bg-[#F9F9F9] rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="font-bold text-[#1A1A1A] mb-3">Rewritten prompt</h3>
          <pre className="whitespace-pre-wrap text-sm text-[#333333] font-sans bg-white border border-gray-200 rounded-lg p-4">
            {grade.rewrite}
          </pre>
        </div>
      )}

      {/* Edits */}
      {editsMode && grade.revisions?.length > 0 && (
        <div className="bg-[#F9F9F9] rounded-lg border border-[#E5E5E5] p-6">
          <h3 className="font-bold text-[#1A1A1A] mb-4">Suggested edits</h3>
          <div className="space-y-4">
            {grade.revisions.map((rev, i) => (
              <div key={i} className="bg-white border border-[#E5E5E5] rounded-lg p-4">
                <p className="text-sm font-semibold text-[#1A1A1A] mb-2">{rev.issue}</p>
                <div>
                  <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Before</span>
                  <pre className="whitespace-pre-wrap text-sm text-red-700 bg-red-50 border border-red-100 rounded p-3 mt-1 font-sans">
                    {rev.before_excerpt}
                  </pre>
                </div>
                <div className="mt-2">
                  <span className="text-xs uppercase tracking-wide text-gray-400 font-semibold">After</span>
                  <pre className="whitespace-pre-wrap text-sm text-green-800 bg-green-50 border border-green-100 rounded p-3 mt-1 font-sans">
                    {rev.after_excerpt}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
