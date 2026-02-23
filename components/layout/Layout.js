import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import FloatingCTA from '../ui/FloatingCTA'
import CookieConsent from '../ui/CookieConsent'

export default function Layout({ children, title, description, canonicalUrl }) {
  return (
    <>
      <Head>
        <title>{title || 'PromptWritingStudio - Master AI Prompts for Better Results'}</title>
        <meta name="description" content={description || 'Learn to write effective AI prompts with PromptWritingStudio for ChatGPT, Claude, and Gemini.'} />
        <meta property="og:title" content={title || 'PromptWritingStudio - Master AI Prompts'} />
        <meta property="og:description" content={description || 'Learn to write effective AI prompts with PromptWritingStudio.'} />
        <meta property="og:image" content="/images/og-image.jpg" />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:type" content="website" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />
      <CookieConsent />
    </>
  )
}
