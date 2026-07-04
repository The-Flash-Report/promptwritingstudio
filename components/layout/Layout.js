import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import FloatingCTA from '../ui/FloatingCTA'
import CookieConsent from '../ui/CookieConsent'

export default function Layout({ children, title, description, canonicalUrl, ogImage }) {
  const router = useRouter()
  const siteUrl = 'https://promptwritingstudio.com'
  const currentUrl = canonicalUrl || `${siteUrl}${router.asPath.split('?')[0]}`
  const socialImage = ogImage || `${siteUrl}/images/og-image.jpg`
  // Most pages render their OWN <Head><title> BEFORE <Layout> in the tree, so
  // a Layout-emitted default title comes later and silently overrides them
  // (next/head keeps the last occurrence). Only emit title/description here
  // when the page passes them as props; pages without props are expected to
  // carry their own <Head> block (all 68 did as of 2026-07-02).
  const pageTitle = title || 'PromptWritingStudio — Practical Guides for Claude Code, MCP & Sub-agents'
  const pageDescription = description || 'Working guides, templates, and comparisons for building real work with Claude — Claude Code, Projects, Artifacts, Skills, MCP, sub-agents, and hooks.'

  return (
    <>
      <Head>
        {title && <title>{pageTitle}</title>}
        {description && <meta name="description" content={pageDescription} />}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Prompt Writing Studio" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImage} />
        <meta name="twitter:site" content="@BryanJCollins" />
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
