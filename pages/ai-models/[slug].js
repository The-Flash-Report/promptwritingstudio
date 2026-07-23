import Link from 'next/link';
import Layout from '../../components/layout/Layout';
import LastVerified from '../../components/LastVerified';
import { AI_MODELS, AI_MODELS_META } from '../../lib/ai-models';
import AIFlashReportTrackerNote from '../../components/ui/AIFlashReportTrackerNote';

const CATEGORY_LABELS = {
  text: 'Text Generation',
  multimodal: 'Multimodal',
  coding: 'Code Generation',
  reasoning: 'Advanced Reasoning',
  'open-source': 'Open Source',
  enterprise: 'Enterprise'
};

export async function getStaticPaths() {
  return {
    paths: AI_MODELS.map(m => ({ params: { slug: m.id } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const model = AI_MODELS.find(m => m.id === params.slug);
  if (!model) return { notFound: true };

  const sameVendor = AI_MODELS
    .filter(m => m.vendor === model.vendor && m.id !== model.id)
    .map(m => ({ slug: m.id, display_name: m.display_name, tier: m.tier || null }));

  const sharedCategory = (model.categories || [])[0];
  const relatedByCategory = sharedCategory
    ? AI_MODELS
        .filter(m => m.id !== model.id && (m.categories || []).includes(sharedCategory))
        .slice(0, 4)
        .map(m => ({ slug: m.id, display_name: m.display_name, vendor: m.vendor }))
    : [];

  return {
    props: {
      model,
      sameVendor,
      relatedByCategory,
      lastVerified: AI_MODELS_META.lastVerified
    }
  };
}

export default function ModelDetail({ model, sameVendor, relatedByCategory, lastVerified }) {
  const title = `${model.display_name} (${model.vendor}) | AI Models Compared`;
  const description = model.description || `${model.display_name} from ${model.vendor}. Context window, pricing, and feature details.`;
  const url = `https://promptwritingstudio.com/ai-models/${model.id}`;

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: model.display_name,
    applicationCategory: 'AIApplication',
    operatingSystem: 'Cloud',
    description: model.description,
    url,
    datePublished: model.released,
    creator: { '@type': 'Organization', name: model.vendor },
    publisher: { '@type': 'Organization', name: model.vendor }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://promptwritingstudio.com/' },
      { '@type': 'ListItem', position: 2, name: 'AI Models', item: 'https://promptwritingstudio.com/ai-models' },
      { '@type': 'ListItem', position: 3, name: model.display_name, item: url }
    ]
  };

  return (
    <Layout title={title} description={description}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/ai-models" className="hover:text-blue-600">AI Models</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-700">{model.display_name}</span>
          </nav>

          <header className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
              {model.tier && (
                <span className="inline-block bg-blue-600 text-white px-2 py-1 rounded font-semibold uppercase tracking-wide">
                  {model.tier}
                </span>
              )}
              <span className="text-gray-500">{model.vendor}</span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-500">Released {model.released}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{model.display_name}</h1>
            {model.description && (
              <p className="mt-3 text-lg text-gray-700 max-w-3xl">{model.description}</p>
            )}
            <div className="mt-4">
              <LastVerified
                date={model.last_verified_at || lastVerified}
                source={model.verification_source || 'https://github.com/The-Flash-Report/promptwritingstudio/blob/main/data/ai-models.json'}
              />
            </div>
          </header>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Key specifications</h2>
            <div className="overflow-x-auto rounded border border-gray-200">
              <table className="min-w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-3 py-2 font-medium bg-gray-50 w-48">Vendor</td><td className="px-3 py-2">{model.vendor}</td></tr>
                  <tr><td className="px-3 py-2 font-medium bg-gray-50">Tier</td><td className="px-3 py-2 capitalize">{model.tier || 'Unknown'}</td></tr>
                  <tr><td className="px-3 py-2 font-medium bg-gray-50">Context window</td><td className="px-3 py-2">{model.context_window_label || 'Unknown'}</td></tr>
                  <tr><td className="px-3 py-2 font-medium bg-gray-50">Pricing</td><td className="px-3 py-2">{model.pricing_label}</td></tr>
                  <tr><td className="px-3 py-2 font-medium bg-gray-50">Released</td><td className="px-3 py-2">{model.released}</td></tr>
                  {model.parameters && (
                    <tr><td className="px-3 py-2 font-medium bg-gray-50">Parameters</td><td className="px-3 py-2">{model.parameters}</td></tr>
                  )}
                  <tr>
                    <td className="px-3 py-2 font-medium bg-gray-50">Categories</td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {(model.categories || []).map(c => (
                          <span key={c} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            {CATEGORY_LABELS[c] || c}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {model.verification_notes && (
              <p className="mt-3 text-xs text-gray-500 italic">Note: {model.verification_notes}</p>
            )}
          </section>

          {model.features && model.features.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key features</h2>
              <ul className="space-y-2">
                {model.features.map((f, i) => (
                  <li key={i} className="flex items-start text-gray-800">
                    <span className="text-blue-600 mr-2 mt-1">•</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {sameVendor.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Other models from {model.vendor}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sameVendor.map(m => (
                  <li key={m.slug}>
                    <Link href={`/ai-models/${m.slug}`} className="block border border-gray-200 rounded p-3 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      <div className="font-semibold text-blue-700">{m.display_name}</div>
                      {m.tier && <div className="text-xs text-gray-500 capitalize">{m.tier}</div>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {relatedByCategory.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Compare with similar models</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedByCategory.map(m => (
                  <li key={m.slug}>
                    <Link href={`/ai-models/${m.slug}`} className="block border border-gray-200 rounded p-3 hover:border-blue-500 hover:bg-blue-50 transition-colors">
                      <div className="font-semibold text-blue-700">{m.display_name}</div>
                      <div className="text-xs text-gray-500">{m.vendor}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-12 pt-6 border-t border-gray-200">
            <AIFlashReportTrackerNote className="mb-4" />
            <Link href="/ai-models" className="text-blue-600 hover:underline">
              ← Back to all AI models
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
