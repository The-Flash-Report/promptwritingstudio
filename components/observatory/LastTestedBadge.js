export default function LastTestedBadge({ date, model, score, maxScore, pass }) {
  const passLabel = pass ? 'Pass' : 'Fail';
  const passColor = pass
    ? 'text-green-700 bg-green-50 border-green-200'
    : 'text-red-700 bg-red-50 border-red-200';

  return (
    <div className="inline-flex flex-wrap items-center gap-2 text-sm">
      <span className="text-[#333333]">
        Last tested{' '}
        <time dateTime={date} className="font-medium">{date}</time>
        {' '}against{' '}
        <span className="font-mono font-medium text-[#1A1A1A]">{model}</span>
      </span>
      {score !== undefined && (
        <span className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${passColor}`}>
          {passLabel}{maxScore !== undefined ? ` (${score}/${maxScore})` : ` (${score})`}
        </span>
      )}
    </div>
  );
}
