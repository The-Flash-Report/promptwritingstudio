import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../../components/layout/Layout';
import ShownIO from '../../../components/observatory/ShownIO';
import PromptSparkline from '../../../components/observatory/PromptSparkline';
import LastTestedBadge from '../../../components/observatory/LastTestedBadge';

const SITE_URL = 'https://promptwritingstudio.com';

// Disabled until Bryan signs off — contract §10 "Affiliate links live"
const AFFILIATE_LINKS_ENABLED = false;

const AFFILIATE_URLS = {
  claude: 'https://claude.ai',
  chatgpt: 'https://chatgpt.com',
  gemini: 'https://gemini.google.com',
};

const AFFILIATE_LABELS = {
  claude: 'Try Claude',
  chatgpt: 'Try ChatGPT',
  gemini: 'Try Gemini',
};

const MODEL_DISPLAY = {
  'claude-opus-4-7': 'Claude Opus 4.7',
  'claude-sonnet-4-6': 'Claude Sonnet 4.6',
  'claude-haiku-4-5': 'Claude Haiku 4.5',
  'gpt-4o': 'GPT-4o',
  'gpt-4o-mini': 'GPT-4o mini',
  'gemini-2.5-pro': 'Gemini 2.5 Pro',
  'gemini-2.5-flash': 'Gemini 2.5 Flash',
  'llama-3.3-70b': 'Llama 3.3 70B',
};

export default function PromptDetailPage({ prompt, runs, lastRunDate, modelRows }) {
  const pageUrl = `${SITE_URL}/observatory/prompts/${prompt.id}`;
  const maxScore = prompt.rubric.criteria.length * 3;

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: prompt.title,
    description: `Benchmark prompt in the PWS Prompt Observatory corpus. Category: ${prompt.category}. Tests: ${prompt.rubric.criteria.join('; ')}.`,
    url: pageUrl,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'PWS Prompt Observatory Corpus',
      url: `${SITE_URL}/observatory#corpus`,
    },
    termCode: prompt.id,
  };

  const latestRun = runs[runs.length - 1];

  return (
    <Layout
      title={`${prompt.title} — Prompt Observatory | PromptWritingStudio`}
      description={`How Claude, GPT-4o, Gemini, and Llama handle: "${prompt.title}". Rubric-scored weekly. Last tested ${lastRunDate}.`}
      canonicalUrl={pageUrl}
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
        />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/observatory" className="hover:underline">Observatory</Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{prompt.category}</span>
          <span className="mx-2">/</span>
          <span className="text-[#1A1A1A]">{prompt.title}</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
              {prompt.category}
            </span>
            <span className="text-xs text-gray-400">Added {prompt.added_date}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-3">
            {prompt.title}
          </h1>
          {lastRunDate && modelRows.length > 0 && (
            <LastTestedBadge
              date={lastRunDate}
              model={prompt.models[0]}
              score={modelRows.find(r => r.model === prompt.models[0])?.latestScore}
              maxScore={maxScore}
              pass={modelRows.find(r => r.model === prompt.models[0])?.latestPass}
            />
          )}
        </header>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">Model scores over time</h2>
          {modelRows.length === 0 ? (
            <p className="text-[#333333] text-sm">No run data yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-[#E5E5E5] rounded-lg overflow-hidden">
                <thead className="bg-[#F9F9F9]">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A1A1A]">Model</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A1A1A]">Trend</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A1A1A]">Latest score</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A1A1A]">Pass</th>
                    <th className="text-left px-4 py-3 font-semibold text-[#1A1A1A]">Last tested</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  {modelRows.map(row => (
                    <tr key={row.model} className="hover:bg-[#F9F9F9]">
                      <td className="px-4 py-3 font-mono text-xs">{MODEL_DISPLAY[row.model] || row.model}</td>
                      <td className="px-4 py-3">
                        <PromptSparkline
                          scores={row.scores}
                          passThreshold={prompt.rubric.pass_threshold}
                          maxScore={maxScore}
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-[#1A1A1A]">
                        {row.latestScore}/{maxScore}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded border ${row.latestPass ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-700 bg-red-50 border-red-200'}`}>
                          {row.latestPass ? 'Pass' : 'Fail'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{row.lastRunDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-2">Rubric</h2>
          <p className="text-sm text-gray-500 mb-3">
            Each criterion scored 0–3. Pass threshold: {prompt.rubric.pass_threshold}/{maxScore}.
          </p>
          <ul className="space-y-2">
            {prompt.rubric.criteria.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#333333]">
                <span className="text-gray-400 flex-shrink-0 font-mono">{i + 1}.</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {AFFILIATE_LINKS_ENABLED && AFFILIATE_URLS[prompt.affiliate_tool_default] && (
          <section className="mb-10 p-4 bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg flex items-center justify-between">
            <span className="text-sm text-[#333333]">
              Best model for this prompt: <strong>{MODEL_DISPLAY[prompt.models[0]] || prompt.models[0]}</strong>
            </span>
            <a
              href={AFFILIATE_URLS[prompt.affiliate_tool_default]}
              rel="noopener noreferrer nofollow"
              target="_blank"
              className="text-sm font-medium text-[#1A1A1A] bg-[#FFDE59] px-4 py-2 rounded hover:bg-[#E5C84F] transition-colors"
            >
              {AFFILIATE_LABELS[prompt.affiliate_tool_default] || `Try ${prompt.affiliate_tool_default}`}
            </a>
          </section>
        )}

        {latestRun && latestRun.results_by_input.map(inputResult => (
          <section key={inputResult.test_input_id} className="mb-10">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-4">
              Latest outputs — run {lastRunDate}
            </h2>
            <div className="space-y-6">
              {inputResult.results_by_model.map(modelResult => {
                const testInput = prompt.test_inputs.find(t => t.id === inputResult.test_input_id);
                return (
                  <div key={modelResult.model}>
                    <div className="mb-2">
                      <LastTestedBadge
                        date={lastRunDate}
                        model={modelResult.model}
                        score={modelResult.judge.primary.total}
                        maxScore={maxScore}
                        pass={modelResult.judge.primary.pass}
                      />
                    </div>
                    <ShownIO
                      prompt={prompt.prompt}
                      testInput={testInput}
                      output={modelResult.output}
                      model={MODEL_DISPLAY[modelResult.model] || modelResult.model}
                    />
                    {modelResult.judge.primary.criteria_scores && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {prompt.rubric.criteria.map((criterion, ci) => {
                          const score = modelResult.judge.primary.criteria_scores[ci];
                          return (
                            <span
                              key={ci}
                              className="text-xs px-2 py-0.5 rounded border bg-white border-[#E5E5E5] text-[#333333]"
                              title={criterion}
                            >
                              {ci + 1}: {score}/3
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <div className="mt-10 pt-6 border-t border-[#E5E5E5]">
          <Link href="/observatory" className="text-sm text-blue-600 hover:underline">
            ← Observatory index
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { loadAllPrompts } = require('../../../lib/observatory/load_corpus');
  const prompts = loadAllPrompts();
  return {
    paths: prompts.map(p => ({ params: { id: p.id } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { loadPromptById } = require('../../../lib/observatory/load_corpus');
  const { loadRunsForPrompt } = require('../../../lib/observatory/load_runs');
  const prompt = loadPromptById(params.id);
  if (!prompt) return { notFound: true };

  const runs = loadRunsForPrompt(params.id);
  const lastRunDate = runs.length > 0 ? runs[runs.length - 1].run_id : null;

  const modelRows = prompt.models.map(model => {
    const scores = [];
    let latestScore = null;
    let latestPass = null;
    let lastRunDateForModel = null;

    for (const run of runs) {
      for (const inputResult of run.results_by_input) {
        const modelResult = inputResult.results_by_model.find(r => r.model === model);
        if (modelResult && !modelResult.error) {
          scores.push(modelResult.judge.primary.total);
          latestScore = modelResult.judge.primary.total;
          latestPass = modelResult.judge.primary.pass;
          lastRunDateForModel = run.run_id;
        }
      }
    }

    return { model, scores, latestScore, latestPass, lastRunDate: lastRunDateForModel };
  }).filter(r => r.scores.length > 0);

  return {
    props: {
      prompt,
      runs,
      lastRunDate,
      modelRows,
    },
  };
}
