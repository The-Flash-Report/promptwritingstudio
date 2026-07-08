import { useEffect, useState } from 'react'
import EmailCapture from './EmailCapture'

// Sitewide newsletter popup — the native replacement for the old ConvertBox
// embed. Triggers once per session on exit-intent (desktop) or after the
// visitor scrolls ~55% of the page (all devices), whichever fires first.
// Gated by sessionStorage so it never nags a visitor twice in one session.

const SESSION_KEY = 'pws_newsletter_popup_shown'
const SCROLL_THRESHOLD = 0.55

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Don't re-show within the same session.
    try {
      if (sessionStorage.getItem(SESSION_KEY) === '1') return
    } catch (e) {}

    let fired = false
    const open = () => {
      if (fired) return
      fired = true
      try { sessionStorage.setItem(SESSION_KEY, '1') } catch (e) {}
      setIsOpen(true)
      cleanup()
    }

    // Exit-intent — desktop pointers only.
    const hasFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches

    const handleMouseOut = (e) => {
      if (e && e.relatedTarget === null && e.clientY <= 0) open()
    }

    // Scroll-depth — works on touch devices where exit-intent can't fire.
    const handleScroll = () => {
      const scrolled = window.scrollY + window.innerHeight
      const height = document.documentElement.scrollHeight
      if (height > 0 && scrolled / height >= SCROLL_THRESHOLD) open()
    }

    const cleanup = () => {
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('scroll', handleScroll)
    }

    if (hasFinePointer) window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return cleanup
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Subscribe to the PromptWritingStudio newsletter"
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl leading-none"
        >
          &times;
        </button>
        <div className="text-center mb-4">
          <div className="text-5xl mb-3">⌨️</div>
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            One last thing before you go
          </h3>
          <p className="text-[#333333]">
            Get a short email when there's a new Claude Code skill worth installing,
            a guide worth reading, or a tool worth trying. No hype, no spam.
          </p>
        </div>
        <div className="flex justify-center">
          <EmailCapture
            label=""
            buttonText="Subscribe"
            source="popup"
            theme="light"
          />
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
