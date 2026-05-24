const WIDTH = 80;
const HEIGHT = 28;
const PADDING = 3;

export default function PromptSparkline({ scores, passThreshold, maxScore }) {
  if (!scores || scores.length < 2) {
    return <span className="text-xs text-gray-400 font-mono">{scores?.[0] ?? '—'}</span>;
  }

  const innerW = WIDTH - PADDING * 2;
  const innerH = HEIGHT - PADDING * 2;
  const high = maxScore ?? Math.max(...scores);
  const low = 0;
  const range = high - low || 1;

  const toX = i => PADDING + (i / (scores.length - 1)) * innerW;
  const toY = v => PADDING + (1 - (v - low) / range) * innerH;

  const points = scores.map((s, i) => `${toX(i)},${toY(s)}`).join(' ');
  const thresholdY = passThreshold !== undefined ? toY(passThreshold) : null;

  const last = scores[scores.length - 1];
  const prev = scores[scores.length - 2];
  const trend = last > prev ? 'up' : last < prev ? 'down' : 'flat';
  const strokeColor = trend === 'up' ? '#16a34a' : trend === 'down' ? '#dc2626' : '#6b7280';

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      aria-label={`Score sparkline: ${scores.join(', ')}`}
      role="img"
      className="inline-block align-middle"
    >
      {thresholdY !== null && (
        <line
          x1={PADDING}
          y1={thresholdY}
          x2={WIDTH - PADDING}
          y2={thresholdY}
          stroke="#d1d5db"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={toX(scores.length - 1)} cy={toY(last)} r="2.5" fill={strokeColor} />
    </svg>
  );
}
