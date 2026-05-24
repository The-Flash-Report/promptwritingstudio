import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';

const SITE_URL = 'https://promptwritingstudio.com';

const DIRECTION_COLORS = {
  degraded: 'text-red-600',
  improved: 'text-green-600',
};

export default function ObservatoryReportPage({ report, date, prompts }) {
  const { frontmatter: fm, body } = report;
  const promptMap = Object.fromEntries((prompts || []).map(p => [p.id, p]));
  const pageUrl = `${SITE_URL}/observatory/${date}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Observatory Run — ${date}`,
    description: `Weekly AI model benchmark results for ${date}. ${fm.total_prompts_run} prompts · ${fm.total_models} models · ${fm.total_calls} calls.`,
    url: pageUrl,
    datePublished: `${date}T03:18:42Z`,
    dateModified: `${date}T03:18:42Z`,
    author: {
      '@type': 'Organization',
      name: 'PromptWritingStudio',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PromptWritingStudio',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
    },
    isPartOf: {
      '@type': 'Dataset',
      name: 'PWS Prompt Observatory',
      url: `${SITE_URL}/observatory`,
    },
  };

  return (
    <Layout
      title={`Observatory Run ${date} — AI Model Benchmarks | PromptWritingStudio`}
      description={`Weekly benchmark results for ${date}. ${fm.total_prompts_run} prompts, ${fm.total_models} models, ${fm.total_calls} API calls. Score changes and flags.`}
      canonicalUrl={pageUrl}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/observatory" className="hover:underline">Observatory</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1A1A]">{date}</span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-3">
            Observatory Run — {date}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-[#333333]">
            <span>{fm.total_prompts_run} prompts</span>
            <span>{fm.total_models} models</span>
            <span>{fm.total_calls} calls</span>
            <span>${Number(fm.total_cost_usd).toFixed(4)} total cost</span>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <StatCard
            label="Top movers"
            value={fm.top_movers?.length ?? 0}
            color={fm.top_movers?.length ? '#dc2626' : '#16a34a'}
          />
          <StatCard
            label="Broken"
            value={fm.broken?.length ?? 0}
            color={fm.broken?.length ? '#dc2626' : '#16a34a'}
          />
          <StatCard
            label="Newly passing"
            value={fm.newly_passing?.length ?? 0}
            color={fm.newly_passing?.length ? '#16a34a' : '#6b7280'}
          />
        </div>

        {fm.top_movers?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">Top movers</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-[#E5E5E5] rounded-lg overflow-hidden">
                <thead className="bg-[#F9F9F9]">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A1A1A]">Prompt</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A1A1A]">Model</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A1A1A]">Change</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A1A1A]">Direction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {fm.top_movers.map((m, i) => {
                    const prompt = promptMap[m.prompt_id];
                    return (
                      <tr key={i} className="hover:bg-[#F9F9F9]">
                        <td className="px-4 py-3">
                          <Link
                            href={`/observatory/prompts/${m.prompt_id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {prompt?.title || m.prompt_id}
                          </Link>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs">{m.model}</td>
                        <td className="px-4 py-3 font-medium">
                          {m.score_change > 0 ? '+' : ''}{m.score_change}
                        </td>
                        <td className={`px-4 py-3 font-medium capitalize ${DIRECTION_COLORS[m.direction] || ''}`}>
                          {m.direction}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {fm.broken?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">Broken (newly failing)</h2>
            <ul className="space-y-2">
              {fm.broken.map((b, i) => {
                const prompt = promptMap[b.prompt_id];
                return (
                  <li key={i} className="flex items-center gap-3 p-3 border border-red-200 bg-red-50 rounded-lg text-sm">
                    <span className="text-red-600 font-bold">✗</span>
                    <Link
                      href={`/observatory/prompts/${b.prompt_id}`}
                      className="font-medium text-red-700 hover:underline"
                    >
                      {prompt?.title || b.prompt_id}
                    </Link>
                    <span className="text-red-600 font-mono text-xs">{b.model}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {fm.newly_passing?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">Newly passing</h2>
            <ul className="space-y-2">
              {fm.newly_passing.map((p, i) => {
                const prompt = promptMap[p.prompt_id];
                return (
                  <li key={i} className="flex items-center gap-3 p-3 border border-green-200 bg-green-50 rounded-lg text-sm">
                    <span className="text-green-600 font-bold">✓</span>
                    <Link
                      href={`/observatory/prompts/${p.prompt_id}`}
                      className="font-medium text-green-700 hover:underline"
                    >
                      {prompt?.title || p.prompt_id}
                    </Link>
                    <span className="text-green-600 font-mono text-xs">{p.model}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {body && (
          <section className="mt-10 prose prose-sm max-w-none">
            <div className="border-t border-[#E5E5E5] pt-8">
              <pre className="whitespace-pre-wrap text-sm text-[#333333] font-sans leading-relaxed">
                {body}
              </pre>
            </div>
          </section>
        )}

        <div className="mt-10 pt-6 border-t border-[#E5E5E5]">
          <Link href="/observatory" className="text-sm text-blue-600 hover:underline">
            ← All observatory runs
          </Link>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="border border-[#E5E5E5] rounded-lg p-4 text-center">
      <div className="text-3xl font-bold" style={{ color }}>{value}</div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

export async function getStaticPaths() {
  const { loadReportDates } = require('../../lib/observatory/load_runs');
  const dates = loadReportDates();
  return {
    paths: dates.map(date => ({ params: { date } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { loadReportByDate } = require('../../lib/observatory/load_runs');
  const { loadAllPrompts } = require('../../lib/observatory/load_corpus');
  const report = loadReportByDate(params.date);
  if (!report) return { notFound: true };
  const prompts = loadAllPrompts();
  return {
    props: { report, date: params.date, prompts },
  };
}
