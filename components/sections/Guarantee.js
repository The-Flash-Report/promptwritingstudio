import Link from 'next/link';

export default function Guarantee() {
  return (
    <section id="guarantee" className="py-16 md:py-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg p-8 md:p-12 shadow-medium border border-[#E5E5E5]">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">30-Day Money-Back Guarantee</h2>
            
            <p className="body-large text-[#333333] mb-6">
              Try PromptWritingStudio risk-free. If you're not completely satisfied with the results you're getting, simply email us within 30 days of purchase for a full refund, no questions asked.
            </p>
            
            <p className="text-[#333333] mb-8">
              We're confident that our proven system will transform your AI content creation process, saving you time and helping you create better content. But if it doesn't work for you, we don't want your money.
            </p>
            
            <Link 
              href="#pricing" 
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
            >
              Join Risk-Free Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
