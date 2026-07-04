// GET /api/og?s=<0-100>&v=<verdict>&p=<prompt excerpt>
// Renders the shareable grade card (1200x630 PNG) for social/OG previews.
//
// Node route (not edge): Next's edge ImageResponse returns an empty body on
// Netlify's runtime, so we render with satori (JSX -> SVG) + @resvg/resvg-js
// (SVG -> PNG) — the fallback named in SHAREABLE_CARDS_PRD.md §7. Fonts are
// bundled TTFs (Roboto, Apache-2.0); netlify.toml force-includes them in the
// function bundle. Stateless: draws only from query params, so no Blobs here.

import { readFileSync } from 'fs'
import { join } from 'path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const YELLOW = '#FFDE59'
const INK = '#1A1A1A'

// Load fonts once per warm instance.
let FONTS = null
function fonts() {
  if (!FONTS) {
    const dir = join(process.cwd(), 'assets', 'og')
    FONTS = [
      { name: 'Roboto', data: readFileSync(join(dir, 'Roboto-Regular.ttf')), weight: 400, style: 'normal' },
      { name: 'Roboto', data: readFileSync(join(dir, 'Roboto-Bold.ttf')), weight: 700, style: 'normal' },
    ]
  }
  return FONTS
}

function toneFor(pct) {
  if (pct >= 75) return '#16A34A'
  if (pct >= 45) return '#F59E0B'
  return '#EF4444'
}

export default async function handler(req, res) {
  const raw = parseInt(req.query.s ?? '', 10)
  const pct = Number.isFinite(raw) ? Math.max(0, Math.min(100, raw)) : null
  const verdict = String(req.query.v || 'Prompt graded').slice(0, 40)
  const excerpt = String(req.query.p || '').slice(0, 120)
  const tone = pct === null ? INK : toneFor(pct)

  const element = {
    type: 'div',
    props: {
      style: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        fontFamily: 'Roboto',
      },
      children: [
        { type: 'div', props: { style: { height: 14, width: '100%', background: YELLOW } } },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flex: 1, padding: '56px 64px' },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 360,
                  },
                  children: [
                    { type: 'div', props: { style: { fontSize: 200, fontWeight: 700, color: tone, lineHeight: 1 }, children: pct === null ? '—' : String(pct) } },
                    { type: 'div', props: { style: { fontSize: 30, color: '#6B7280', marginTop: 8 }, children: 'out of 100' } },
                  ],
                },
              },
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, paddingLeft: 48 },
                  children: [
                    { type: 'div', props: { style: { fontSize: 58, fontWeight: 700, color: INK, lineHeight: 1.1 }, children: verdict } },
                    excerpt
                      ? { type: 'div', props: { style: { fontSize: 30, color: '#374151', marginTop: 24, lineHeight: 1.35 }, children: `“${excerpt}${excerpt.length >= 120 ? '…' : ''}”` } }
                      : null,
                  ],
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', padding: '0 64px 40px', fontSize: 28, fontWeight: 700, color: INK },
            children: 'Prompt Grader · promptwritingstudio.com',
          },
        },
      ],
    },
  }

  try {
    const svg = await satori(element, { width: 1200, height: 630, fonts: fonts() })
    const png = new Resvg(svg).render().asPng()
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    return res.status(200).send(png)
  } catch (err) {
    console.error('OG render failed:', err?.name || 'UnknownError', err?.message)
    return res.status(500).json({ error: 'Could not render card.' })
  }
}
