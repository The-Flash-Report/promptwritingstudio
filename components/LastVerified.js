export default function LastVerified({ date, source, label = 'Pricing verified', className = '' }) {
  if (!date) return null
  const formatted = new Date(date + (date.length === 7 ? '-01' : '')).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  return (
    <p className={`text-xs text-gray-500 ${className}`}>
      {label} {formatted}
      {source && (
        <>
          {' · '}
          <a href={source} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">
            source
          </a>
        </>
      )}
    </p>
  )
}
