// Submits an email to the Netlify-detected `pws-newsletter` form, which the
// build bot declares in /public/__forms.html and which the
// netlify/functions/submission-created.js handler turns into a Resend contact +
// welcome automation.
//
// POST to the static /__forms.html endpoint, NOT "/". On this Next.js site "/"
// is served by the SSR runtime (GET/HEAD only) and returns 405, so submissions
// there silently fail. /__forms.html is the static form-declaration file that
// Netlify's form handler actually intercepts. Every caller must reuse the
// declared form name (`pws-newsletter`) and distinguish itself via `source`.
export async function submitNewsletter(email, source = '') {
  if (!email) throw new Error('email is required')
  const body = new URLSearchParams()
  body.append('form-name', 'pws-newsletter')
  body.append('email', email)
  if (source) body.append('source', source)
  const res = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!res.ok) throw new Error(`status ${res.status}`)
  return true
}
