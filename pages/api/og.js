// GET /api/og?s=<0-100>&v=<verdict>&p=<prompt excerpt>
// Renders the shareable grade card (1200x630 PNG) for social/OG previews.
// Stateless by design: it draws only from query params the /g/[id] page passes,
// so the edge runtime never needs Blobs access. The canonical page is the
// source of truth; this image is the preview.
//
// Uses next/server's ImageResponse (Next 13.5). Runs on the edge.

import { ImageResponse } from 'next/server'

export const config = { runtime: 'edge' }

const YELLOW = '#FFDE59'
const INK = '#1A1A1A'

function toneFor(pct) {
  if (pct >= 75) return '#16A34A' // green-600
  if (pct >= 45) return '#F59E0B' // amber-500
  return '#EF4444' // red-500
}

export default function handler(req) {
  const { searchParams } = new URL(req.url)
  const raw = parseInt(searchParams.get('s') ?? '', 10)
  const pct = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : null
  const verdict = (searchParams.get('v') || 'Prompt graded').slice(0, 40)
  const excerpt = (searchParams.get('p') || '').slice(0, 120)
  const tone = pct === null ? INK : toneFor(pct)

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ height: 14, width: '100%', background: YELLOW }} />
        <div style={{ display: 'flex', flex: 1, padding: '56px 64px' }}>
          {/* Score */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 360,
            }}
          >
            <div style={{ fontSize: 200, fontWeight: 800, color: tone, lineHeight: 1 }}>
              {pct === null ? '—' : pct}
            </div>
            <div style={{ fontSize: 30, color: '#6B7280', marginTop: 8 }}>out of 100</div>
          </div>
          {/* Verdict + excerpt */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, paddingLeft: 48 }}>
            <div style={{ fontSize: 58, fontWeight: 800, color: INK, lineHeight: 1.1 }}>{verdict}</div>
            {excerpt ? (
              <div style={{ fontSize: 30, color: '#374151', marginTop: 24, lineHeight: 1.35 }}>
                “{excerpt}{excerpt.length >= 120 ? '…' : ''}”
              </div>
            ) : null}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 64px 40px',
            fontSize: 28,
            fontWeight: 700,
            color: INK,
          }}
        >
          Prompt Grader · promptwritingstudio.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
