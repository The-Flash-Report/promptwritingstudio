import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout/Layout'
import EnhancedMeta from '../../components/ui/EnhancedMeta'
import OrganizationSchema from '../../components/ui/OrganizationSchema'
import EmailCapture from '../../components/ui/EmailCapture'
import { glossaryTerms, categories, categoriesById } from '../../data/glossary'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function GlossaryIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isIndexOpen, setIsIndexOpen] = useState(false)
  const [showScrollButtons, setShowScrollButtons] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollButtons(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const matchesSearch = (t, q) => {
    if (!q) return true
    const needle = q.toLowerCase()
    return (
      t.term.toLowerCase().includes(needle) ||
      t.definition.toLowerCase().includes(needle) ||
      (t.aliases || []).some((a) => a.toLowerCase().includes(needle))
    )
  }

  const filteredTerms = glossaryTerms
    .filter((t) => matchesSearch(t, searchTerm))
    .filter((t) => selectedCategory === 'all' || t.category === selectedCategory)
    .sort((a, b) => a.term.localeCompare(b.term))

  const lettersPresent = Array.from(
    new Set(filteredTerms.map((t) => t.term[0].toUpperCase()).filter((ch) => /[A-Z]/.test(ch)))
  ).sort()

  const definedTermSet = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'PromptWritingStudio Glossary',
    url: 'https://promptwritingstudio.com/glossary',
    hasDefinedTerm: glossaryTerms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.shortDefinition || t.definition,
      url: `https://promptwritingstudio.com/glossary/${t.slug}`,
      inDefinedTermSet: 'https://promptwritingstudio.com/glossary',
    })),
  }

  let previousLetter = ''

  return (
    <Layout
      title="AI & Prompting Glossary — Clear Definitions for Business Owners | PromptWritingStudio"
      description="Browse every key AI, prompting, RAG, and agents term with plain-English definitions and business examples. Searchable, filterable, A–Z indexed."
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }}
        />
      </Head>
      <EnhancedMeta
        title="AI & Prompting Glossary — Clear Definitions for Business Owners"
        description="Every key AI, prompting, RAG, and agents term explained in plain English with business examples."
        url="https://promptwritingstudio.com/glossary"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
      />
      <OrganizationSchema />

      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Glossary</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              AI, prompting, RAG, and agents — explained in plain English
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg">
                Search {glossaryTerms.length}+ terms, filter by category, or jump straight to a
                letter. Every entry includes a business example.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search glossary..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:w-56">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Showing {filteredTerms.length} of {glossaryTerms.length} terms
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div id="a-z-index" className="h-0" />
            <div className="md:hidden sticky top-0 z-20 bg-white/90 backdrop-blur border-b mb-6">
              <button
                type="button"
                aria-expanded={isIndexOpen}
                onClick={() => setIsIndexOpen((open) => !open)}
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-[#1A1A1A]"
              >
                <span>A–Z Index</span>
                <span className="text-gray-500">{isIndexOpen ? 'Hide' : 'Show'}</span>
              </button>
              {isIndexOpen && (
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar px-3 pb-3">
                  {ALPHABET.map((ch) =>
                    lettersPresent.includes(ch) ? (
                      <a
                        key={ch}
                        href={`#letter-${ch}`}
                        onClick={() => setIsIndexOpen(false)}
                        className="px-2 py-1 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        {ch}
                      </a>
                    ) : (
                      <span key={ch} className="px-2 py-1 text-xs font-semibold text-gray-300">
                        {ch}
                      </span>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="hidden md:block sticky top-0 z-20 bg-white/90 backdrop-blur border-b py-2 mb-6">
              <div className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar">
                {ALPHABET.map((ch) =>
                  lettersPresent.includes(ch) ? (
                    <a
                      key={ch}
                      href={`#letter-${ch}`}
                      className="px-2 py-1 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      {ch}
                    </a>
                  ) : (
                    <span key={ch} className="px-2 py-1 text-xs font-semibold text-gray-300">
                      {ch}
                    </span>
                  )
                )}
              </div>
            </div>

            {showScrollButtons && (
              <div className="fixed bottom-6 right-4 z-30 flex flex-col gap-2">
                <button
                  type="button"
                  aria-label="Back to top"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white/90 backdrop-blur border border-gray-300 shadow-sm hover:shadow px-3 py-2 rounded-md text-xs font-semibold text-gray-700"
                >
                  Top
                </button>
              </div>
            )}

            <div className="space-y-6">
              {filteredTerms.map((item) => {
                const currentLetter = item.term[0].toUpperCase()
                const showLetterAnchor = currentLetter !== previousLetter
                if (showLetterAnchor) previousLetter = currentLetter
                const cat = categoriesById[item.category]
                return (
                  <div key={item.slug}>
                    {showLetterAnchor && (
                      <div id={`letter-${currentLetter}`} className="mb-2">
                        <div className="text-xs uppercase tracking-wider text-gray-400">
                          {currentLetter}
                        </div>
                      </div>
                    )}
                    <Link
                      href={`/glossary/${item.slug}`}
                      className="block border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-300 transition"
                    >
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                        <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 md:mb-0">
                          {item.term}
                        </h3>
                        {cat && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${cat.badge}`}>
                            {cat.label}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">
                        {item.shortDefinition || item.definition}
                      </p>
                      <span className="text-blue-600 text-sm font-medium mt-3 inline-block">
                        Read more →
                      </span>
                    </Link>
                  </div>
                )
              })}
            </div>

            {filteredTerms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No terms found. Try different keywords or clear the filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#F9F9F9] border-t border-[#E5E5E5]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A]">
              Put these ideas to work
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The PromptWritingStudio course turns glossary knowledge into repeatable workflows
              for content, marketing, and support.
            </p>
            <a
              href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
              className="inline-block bg-[#FFDE59] text-black font-bold px-8 py-4 rounded-lg hover:bg-yellow-400 transition"
            >
              Join Now
            </a>
            <div className="mt-10">
              <EmailCapture source="glossary" theme="light" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
