import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'
import EnhancedMeta from '../../components/ui/EnhancedMeta'
import OrganizationSchema from '../../components/ui/OrganizationSchema'
import {
  glossaryTerms,
  glossaryTermsBySlug,
  categoriesById,
} from '../../data/glossary'

export async function getStaticPaths() {
  return {
    paths: glossaryTerms.map((t) => ({ params: { slug: t.slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const term = glossaryTermsBySlug[params.slug] || null
  if (!term) return { notFound: true }
  const related = (term.relatedTerms || [])
    .map((slug) => glossaryTermsBySlug[slug])
    .filter(Boolean)
    .map((t) => ({ slug: t.slug, term: t.term, shortDefinition: t.shortDefinition || '' }))
  return { props: { term, related } }
}

export default function GlossaryTermPage({ term, related }) {
  const cat = categoriesById[term.category]
  const url = `https://promptwritingstudio.com/glossary/${term.slug}`

  const definedTerm = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.shortDefinition || term.definition,
    url,
    inDefinedTermSet: 'https://promptwritingstudio.com/glossary',
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://promptwritingstudio.com/' },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://promptwritingstudio.com/glossary' },
      { '@type': 'ListItem', position: 3, name: term.term, item: url },
    ],
  }

  return (
    <Layout
      title={`What is ${term.term}? | PromptWritingStudio Glossary`}
      description={term.shortDefinition || term.definition.slice(0, 155)}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTerm) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />
      </Head>
      <EnhancedMeta
        title={`What is ${term.term}?`}
        description={term.shortDefinition || term.definition.slice(0, 155)}
        url={url}
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
      />
      <OrganizationSchema />

      <section className="py-10 border-b border-[#E5E5E5] bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="max-w-3xl mx-auto text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/glossary" className="hover:text-gray-700">Glossary</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{term.term}</span>
          </nav>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              {cat && (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cat.badge}`}>
                  {cat.label}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
              {term.term}
            </h1>
            {term.shortDefinition && (
              <p className="text-xl text-gray-600">{term.shortDefinition}</p>
            )}
            {term.aliases && term.aliases.length > 0 && (
              <p className="text-sm text-gray-500 mt-3">
                Also known as: {term.aliases.join(', ')}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Definition</h2>
            <p className="text-gray-700">{term.definition}</p>

            {term.businessExample && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 mt-6 not-prose">
                <h3 className="font-semibold text-blue-800 text-sm mb-2">
                  Business Example
                </h3>
                <p className="text-blue-700 text-sm">{term.businessExample}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {(related.length > 0 || (term.relatedPages && term.relatedPages.length > 0)) && (
        <section className="py-12 bg-[#F9F9F9] border-t border-[#E5E5E5]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              {related.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Related terms</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-10">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/glossary/${r.slug}`}
                        className="block bg-white rounded-lg p-4 border border-[#E5E5E5] hover:border-blue-300 hover:shadow-sm transition"
                      >
                        <div className="font-semibold text-blue-700">{r.term}</div>
                        {r.shortDefinition && (
                          <div className="text-sm text-gray-600 mt-1">{r.shortDefinition}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {term.relatedPages && term.relatedPages.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Learn more</h2>
                  <ul className="space-y-3">
                    {term.relatedPages.map((p) => (
                      <li key={p.href}>
                        <Link
                          href={p.href}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {p.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white border-t border-[#E5E5E5]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4">
              Turn this term into results
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              PromptWritingStudio shows you how to apply concepts like{' '}
              <span className="font-semibold">{term.term}</span> to real marketing and content work.
            </p>
            <a
              href="https://courses.becomeawritertoday.com/purchase?product_id=6640678"
              className="inline-block bg-[#FFDE59] text-black font-bold px-8 py-4 rounded-lg hover:bg-yellow-400 transition"
            >
              Join Now
            </a>
            <div className="mt-8">
              <Link href="/glossary" className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back to glossary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
