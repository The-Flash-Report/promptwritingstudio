import Link from 'next/link';
import { useState } from 'react';

export default function FAQ() {
  const faqs = [
    {
      question: 'How is this different from other AI courses?',
      answer: 'Unlike generic AI courses, AI Prompt Writing Studio delivers actionable templates, workflows and tutorials directly to your inbox several times weekly. This isn\'t theoretical—it\'s a practical system refined through 100+ hours of testing that you can implement immediately.',
      icon: 'graduation-cap'
    },
    {
      question: "Will this work with ChatGPT, Claude, or other AI tools?",
      answer: "Yes! The prompt techniques and frameworks taught in PromptWritingStudio work across all major AI platforms including ChatGPT (3.5 and 4), Claude, Gemini, and others. The principles are universal and can be adapted to any current or future AI tool."
    },
    {
      question: "I'm not technical - will I be able to use this?",
      answer: "Absolutely! PromptWritingStudio is designed for non-technical users. No coding or technical background is required. If you can type and follow simple instructions, you can master these prompt techniques."
    },
    {
      question: "How long will it take to see results?",
      answer: "Many students report immediate improvements in their AI outputs after applying just the first few lessons. The complete course can be completed in a weekend, though most students prefer to work through it over 1-2 weeks to practice each technique."
    },
    {
      question: "Do you offer a money-back guarantee?",
      answer: "Yes! We offer a 30-day 100% money-back guarantee. If you're not completely satisfied with the course, simply email us within 30 days of purchase for a full refund, no questions asked."
    },
    {
      question: "How long do I have access to the course?",
      answer: "You'll have lifetime access to the course materials, including all future updates and improvements. As AI technology evolves, we'll continue to update the content to ensure you always have the most effective prompt techniques."
    },
  ]
  
  const [openIndex, setOpenIndex] = useState(null)
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge mb-4">FAQ</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">Frequently Asked Questions</h2>
            <p className="body-large text-[#333333]">Everything you need to know about PromptWritingStudio</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-[#F9F9F9] overflow-hidden transition-all duration-300 rounded-lg border border-[#E5E5E5]"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-display text-lg font-medium text-[#1A1A1A]">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 text-[#1A1A1A] transition-transform duration-300 ${openIndex === index ? 'transform rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 p-4 pt-0' : 'max-h-0'}`}
                >
                  <p className="text-[#333333]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
