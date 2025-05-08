import Layout from '../components/layout/Layout'
import Hero from '../components/sections/Hero'
import ProblemSolution from '../components/sections/ProblemSolution'
import WhatYouGet from '../components/sections/WhatYouGet'
import Features from '../components/sections/Features'
import Pricing from '../components/sections/Pricing'
import Testimonials from '../components/sections/Testimonials'
import TestimonialEmbed from '../components/sections/TestimonialEmbed'
import Guarantee from '../components/sections/Guarantee'
import FAQ from '../components/sections/FAQ'
import Instructor from '../components/sections/Instructor'

export default function Home() {
  return (
    <Layout 
      title="PromptWritingStudio - Master AI Prompts for Better Results"
      description="Learn to write effective AI prompts with PromptWritingStudio for ChatGPT, Claude, and Gemini. Join our community of prompt engineers today."
    >
      <Hero />
      <ProblemSolution />
      <WhatYouGet />
      <Features />
      <Pricing />
      <Testimonials />
      <Guarantee />
      <FAQ />
      <Instructor />
      <TestimonialEmbed />
    </Layout>
  )
}
