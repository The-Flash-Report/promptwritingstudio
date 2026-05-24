import Head from 'next/head';
import Layout from '../../components/layout/Layout';
import ObservatoryIndex from '../../components/observatory/ObservatoryIndex';

const SITE_URL = 'https://promptwritingstudio.com';
const PAGE_URL = `${SITE_URL}/observatory`;

export default function ObservatoryIndexPage({ prompts, reports }) {
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'PWS Prompt Observatory',
    description:
      'Weekly benchmark tracking how Claude, GPT-4o, Gemini, and Llama perform on a curated set of real-world AI prompts. Scores are judged by rubric, not vibes.',
    url: PAGE_URL,
    creator: {
      '@type': 'Organization',
      name: 'PromptWritingStudio',
      url: SITE_URL,
    },
    temporalCoverage: '2026-05-17/..',
    variableMeasured: 'Rubric score (0–9 per prompt per model per run)',
    distribution: {
      '@type': 'DataDownload',
      contentUrl: `${SITE_URL}/api/observatory/index.json`,
      encodingFormat: 'application/json',
    },
    keywords: [
      'AI prompt benchmarks',
      'LLM evaluation',
      'Claude benchmark',
      'GPT-4o benchmark',
      'prompt quality score',
    ],
  };

  return (
    <Layout
      title="Prompt Observatory — Weekly AI Model Benchmarks | PromptWritingStudio"
      description="Weekly scores tracking how Claude, GPT-4o, Gemini, and Llama handle real-world prompts. Rubric-judged, deterministic, no vibes."
      canonicalUrl={PAGE_URL}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
        />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3">
            Prompt Observatory
          </h1>
          <p className="text-lg text-[#333333] max-w-2xl">
            Weekly benchmarks tracking how Claude, GPT-4o, Gemini, and Llama handle a curated set
            of real-world prompts. Every score comes from a structured rubric — no subjective
            ratings, no marketing claims.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Updated weekly · {prompts.length} prompts in corpus
          </p>
        </header>

        <ObservatoryIndex reports={reports} prompts={prompts} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const { loadAllPrompts } = require('../../lib/observatory/load_corpus');
  const { loadReportDates, loadReportByDate } = require('../../lib/observatory/load_runs');
  const prompts = loadAllPrompts();
  const dates = loadReportDates();
  const reports = dates.map(date => loadReportByDate(date)).filter(Boolean);

  return {
    props: { prompts, reports },
  };
}
