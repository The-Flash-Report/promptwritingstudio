import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real implementation, you would send this to your API
    console.log('Subscribing email:', email)
    setIsSubmitted(true)
    setEmail('')
    // Reset form state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }
  
  return (
    <section className="py-16 md:py-24 gradient-bg text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="md:w-1/3">
              <img 
                src="/images/Money Back Guarantee.jpg" 
                alt="Money Back Guarantee" 
                className="rounded-lg shadow-md max-w-full h-auto"
              />
            </div>
            <div className="md:w-2/3 text-left">
              <span className="inline-block bg-[#FFDE59] text-[#1A1A1A] px-4 py-1 rounded-full font-bold text-sm mb-4">YOUR GUARANTEE</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Plug-and-Play AI Prompts Delivered to Your Inbox</h2>
              <p className="text-xl mb-6">Get bite-sized lessons three times a week directly in your inbox. No long-term commitment - cancel anytime.</p>
              <p className="mb-4">This course comes with a 14-day money-back guarantee. Try it out, and if you don't like it, just email me for a full refund.</p>
            </div>
          </div>
          
          {isSubmitted ? (
            <div className="bg-white text-[#1A1A1A] rounded-lg p-4 mb-8 inline-block border border-[#E5E5E5]">
              <i className="fas fa-check-circle mr-2 text-[#FFDE59]"></i>
              <span>Thanks for subscribing! Check your inbox soon.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-lg text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                required
              />
              <button
                type="submit"
                className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
              >
                Subscribe
              </button>
            </form>
          )}
          
          <p className="text-sm opacity-80 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  )
}
