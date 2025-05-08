import Script from 'next/script'

export default function TestimonialEmbed() {
  return (
    <section id="testimonial-embed" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">What My Clients, Students and Readers Say</h2>
        <Script src="https://testimonial.to/js/iframeResizer.min.js" strategy="beforeInteractive" />
        <div className="testimonial-container">
          <iframe 
            height="800px" 
            id='testimonialto-become-a-writer-today-tag-all-light-animated' 
            src="https://embed-v2.testimonial.to/w/become-a-writer-today?animated=on&theme=light&shadowColor=ffffff&speed=1&tag=all&cc=off" 
            frameBorder="0" 
            scrolling="no" 
            width="100%"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
