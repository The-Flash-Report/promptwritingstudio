import { useEffect, useRef, useState } from 'react'
import { emitFormEvent, formatFormId, readClientAttribution } from '../../lib/email/clientAttribution'

export default function EmailCapture({
  formName = 'pws-newsletter',
  label = 'Get practical Claude Code tips in your inbox — no hype, no spam.',
  buttonText = 'Subscribe',
  source = '',
  theme = 'dark'
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [attribution, setAttribution] = useState(() => ({
    form_id: formatFormId(source || 'newsletter'),
    signup_page: '',
    signup_utm_source: '',
    signup_utm_medium: '',
    signup_utm_campaign: '',
    signup_referrer: '',
  }))

  const formRef = useRef(null)
  const viewedRef = useRef(false)
  const startedRef = useRef(false)
  const slug = source || 'newsletter'

  useEffect(() => {
    setAttribution(readClientAttribution(slug))
  }, [slug])

  useEffect(() => {
    if (viewedRef.current) return
    const el = formRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !viewedRef.current) {
            viewedRef.current = true
            emitFormEvent('Form Viewed', slug)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [slug])

  const handleFocus = () => {
    if (startedRef.current) return
    startedRef.current = true
    emitFormEvent('Form Started', slug)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    setError('')
    const currentAttr = readClientAttribution(slug)
    setAttribution(currentAttr)
    emitFormEvent('Form Submitted', slug)
    try {
      const body = new URLSearchParams()
      body.append('form-name', formName)
      body.append('email', email)
      if (source) body.append('source', source)
      body.append('form_id', currentAttr.form_id)
      body.append('signup_page', currentAttr.signup_page)
      body.append('signup_utm_source', currentAttr.signup_utm_source)
      body.append('signup_utm_medium', currentAttr.signup_utm_medium)
      body.append('signup_utm_campaign', currentAttr.signup_utm_campaign)
      body.append('signup_referrer', currentAttr.signup_referrer)
      // POST to the static /__forms.html endpoint, not "/". On this Next.js
      // site "/" is served by the SSR runtime (GET/HEAD only) and returns 405,
      // so submissions silently fail. /__forms.html is the static form-
      // declaration file Netlify's form handler actually intercepts.
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      })
      if (!res.ok) throw new Error(`status ${res.status}`)
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setError('Something went wrong. Try again in a moment.')
    }
  }

  const isDark = theme === 'dark'
  const labelColor = isDark ? 'text-white' : 'text-[#1A1A1A]'
  const inputBase = 'flex-grow min-w-0 px-4 py-3 rounded-lg text-[#1A1A1A] bg-white border focus:outline-none focus:ring-2 focus:ring-[#FFDE59]'
  const inputBorder = isDark ? 'border-transparent' : 'border-gray-300'

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`${isDark ? 'bg-white/10 text-white border-white/20' : 'bg-green-50 text-green-900 border-green-200'} border rounded-lg p-4 max-w-md w-full`}
      >
        <p className="font-semibold">Thanks — check your inbox.</p>
        <p className="text-sm opacity-80 mt-1">Confirmation email on its way. If you don't see it in a minute, check spam.</p>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      name={formName}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onFocus={handleFocus}
      onSubmit={handleSubmit}
      className="w-full max-w-md"
    >
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="form_id" value={attribution.form_id} />
      <input type="hidden" name="signup_page" value={attribution.signup_page} />
      <input type="hidden" name="signup_utm_source" value={attribution.signup_utm_source} />
      <input type="hidden" name="signup_utm_medium" value={attribution.signup_utm_medium} />
      <input type="hidden" name="signup_utm_campaign" value={attribution.signup_utm_campaign} />
      <input type="hidden" name="signup_referrer" value={attribution.signup_referrer} />
      <p style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label>Do not fill this out: <input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
      </p>
      {label && (
        <p className={`text-sm mb-2 ${labelColor} opacity-90`}>{label}</p>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          aria-label="Email address"
          className={`${inputBase} ${inputBorder}`}
          disabled={status === 'submitting'}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="bg-[#FFDE59] text-[#1A1A1A] px-5 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'submitting' ? 'Sending…' : buttonText}
        </button>
      </div>
      {error && (
        <p role="alert" className={`text-sm mt-2 ${isDark ? 'text-red-200' : 'text-red-700'}`}>{error}</p>
      )}
    </form>
  )
}
