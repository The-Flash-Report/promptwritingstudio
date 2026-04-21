import { useState } from 'react'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    setError('')
    try {
      const body = new URLSearchParams()
      body.append('form-name', formName)
      body.append('email', email)
      if (source) body.append('source', source)
      const res = await fetch('/', {
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
      <div className={`${isDark ? 'bg-white/10 text-white border-white/20' : 'bg-green-50 text-green-900 border-green-200'} border rounded-lg p-4 max-w-md w-full`}>
        <p className="font-semibold">Thanks — check your inbox.</p>
        <p className="text-sm opacity-80 mt-1">Confirmation email on its way. If you don't see it in a minute, check spam.</p>
      </div>
    )
  }

  return (
    <form
      name={formName}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="w-full max-w-md"
    >
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="source" value={source} />
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
        <p className={`text-sm mt-2 ${isDark ? 'text-red-200' : 'text-red-700'}`}>{error}</p>
      )}
    </form>
  )
}
