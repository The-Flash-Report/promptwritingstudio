import { useState, useEffect } from 'react'

export default function TypewriterEffect({ phrases }) {
  const [displayText, setDisplayText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 50 : 1500
    const currentPhrase = phrases[phraseIndex]

    const timer = setTimeout(() => {
      if (isDeleting) {
        // Deleting text
        setDisplayText(currentPhrase.substring(0, charIndex - 1))
        setCharIndex(prev => prev - 1)
      } else {
        // Typing text
        setDisplayText(currentPhrase.substring(0, charIndex + 1))
        setCharIndex(prev => prev + 1)
      }

      // If finished typing the phrase
      if (!isDeleting && charIndex === currentPhrase.length - 1) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      }

      // If finished deleting the phrase
      if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, phraseIndex, phrases])

  return (
    <span className="typing-effect">{displayText}</span>
  )
}
