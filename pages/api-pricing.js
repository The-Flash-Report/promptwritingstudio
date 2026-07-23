import Layout from '../components/layout/Layout';
import ApiPricingCalculator from '../components/calculators/ApiPricingCalculator';
import { generateCalculatorSchema, generateFAQSchema } from '../lib/schemaGenerator';
import pricingData from '../data/api-pricing.json';

const SITE_URL = 'https://promptwritingstudio.com';
const PAGE_URL = `${SITE_URL}/api-pricing`;

const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'LLM API Pricing Dataset',
  description:
    'Input/output token prices and prompt-cache pricing for major LLM API providers, updated monthly.',
  url: PAGE_URL,
  dateModified: pricingData.last_updated,
  creator: {
    '@type': 'Organization',
    name: 'PromptWritingStudio',
    url: SITE_URL,
  },
  distribution: {
    '@type': 'DataDownload',
    encodingFormat: 'application/json',
    contentUrl: PAGE_URL,
  },
  keywords:
    'LLM pricing, API token cost, prompt caching, Claude pricing, GPT-4o pricing, Gemini pricing',
};

const calculatorSchema = generateCalculatorSchema({
  name: 'LLM API Cost Calculator',
  description:
    'Calculate cost per API call across major LLM providers. Enter input tokens, output tokens, and cache hit ratio.',
  url: PAGE_URL,
  keywords: [
    'LLM cost calculator',
    'API token pricing',
    'prompt caching calculator',
    'Claude vs GPT-4o cost',
    'Gemini API pricing',
  ],
  category: 'AI / Developer Tools',
});

const faqs = [
  {
    question: 'What is prompt caching and why does it reduce costs?',
    answer:
      'Prompt caching lets a provider store a fixed portion of your prompt (like a long system prompt) so it does not have to be re-processed on every call. You pay a lower "cache read" rate instead of the full input rate. Anthropic charges 10% of the input price for cache reads. OpenAI applies 50% of the input price automatically for eligible cached prefixes.',
  },
  {
    question: 'How does Anthropic prompt caching work?',
    answer:
      'Anthropic uses explicit cache control markers. You write tokens to the cache at 1.25x the input price (one-time), then read them back at 0.1x the input price on subsequent calls within a 5-minute TTL window. For repeated workloads with a stable system prompt, savings of 80-90% on the input portion are typical.',
  },
  {
    question: 'How does OpenAI automatic caching work?',
    answer:
      'OpenAI automatically caches the prefix of prompts longer than 1024 tokens. There is no explicit setup -- you pay 50% of the normal input price for any tokens served from cache. Cache hits are reflected in your usage data.',
  },
  {
    question: 'How does Gemini context caching work?',
    answer:
      'Gemini context caching stores content explicitly via the API and charges a reduced per-token rate when that content is served. You also pay a separate hourly storage fee per cached token. For high-frequency use cases with large stable contexts, the storage cost is small relative to the per-token savings.',
  },
  {
    question: 'Which provider is cheapest for high-volume API calls?',
    answer:
      'Gemini 2.5 Flash is consistently the lowest cost per token for input-heavy workloads. Claude Haiku 4.5 and GPT-4o mini are competitive on cost. However, cost per token is only one dimension -- output quality and latency matter too. Use the calculator above with your actual task shape to compare.',
  },
  {
    question: 'Why are some prices marked as unverified?',
    answer:
      "OpenAI's pricing page blocked automated fetches on the date this page was last updated. Prices for OpenAI models are based on the most recently available public data but may be out of date. Always confirm at openai.com/api/pricing before making production budget decisions.",
  },
];

const faqSchema = generateFAQSchema(faqs);

export default function ApiPricing() {
  const models = pricingData.models;

  return (
    <Layout
      title="LLM API Pricing Calculator 2026 -- Claude, GPT-4o, Gemini with Cache"
      description="Compare LLM API costs across Claude, GPT-4o, and Gemini. Enter your token shape and cache hit ratio to see real cost per call. Includes prompt caching explainer."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <div className="bg-[#1A1A1A] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            LLM API Pricing Calculator
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Sticker prices do not tell you what you will actually pay. Input your real task shape
            -- tokens in, tokens out, cache hit ratio -- and see cost per call across every major
            provider, including what prompt caching actually saves.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Last updated: {pricingData.last_updated}. For a broader model comparison, see{' '}
            <a href="/ai-models" className="underline text-[#FFDE59]">
              AI Models Guide
            </a>
            .
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* Calculator */}
        <section id="calculator">
          <ApiPricingCalculator />
        </section>

        {/* Pricing table */}
        <section id="pricing-table">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Current API Prices</h2>
          <p className="text-[#333333] mb-6 text-sm">
            Prices in USD per 1M tokens. Source links open the vendor pricing page.
            Rows marked "unverified" could not be confirmed by automated fetch.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[#F9F9F9] border border-[#E5E5E5]">
                  <th className="px-4 py-3 text-left font-semibold text-[#1A1A1A]">Model</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#1A1A1A]">Input /1M</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#1A1A1A]">Output /1M</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#1A1A1A]">Cache read /1M</th>
                  <th className="px-4 py-3 text-right font-semibold text-[#1A1A1A]">Cache write /1M</th>
                  <th className="px-4 py-3 text-left font-semibold text-[#1A1A1A]">Verified</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m, i) => (
                  <tr key={m.id} className={`border border-[#E5E5E5] ${i % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'}`}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#1A1A1A]">{m.display_name}</div>
                      <div className="text-xs text-gray-500">{m.vendor}</div>
                    </td>
                    <td className="px-4 py-3 text-right text-[#333333]">${m.input_per_1m.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-[#333333]">${m.output_per_1m.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-[#333333]">
                      {m.cache_read_per_1m != null ? `$${m.cache_read_per_1m}` : '--'}
                    </td>
                    <td className="px-4 py-3 text-right text-[#333333]">
                      {m.cache_write_per_1m != null ? `$${m.cache_write_per_1m}` : '--'}
                    </td>
                    <td className="px-4 py-3">
                      {m.verified ? (
                        <a
                          href={m.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs underline text-[#333333]"
                        >
                          {m.last_verified}
                        </a>
                      ) : (
                        <span className="text-xs text-orange-600">
                          unverified --{' '}
                          <a
                            href={m.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            check
                          </a>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[#333333] mt-4">
            Prices change.{' '}
            <a href="https://aiflashreport.com/prices/" className="underline text-[#1A1A1A]">
              AI Flash Report
            </a>{' '}
            tracks per-model price history and sends a{' '}
            <a href="https://aiflashreport.com/changes/" className="underline text-[#1A1A1A]">
              weekly change digest
            </a>
            .
          </p>
        </section>

        {/* Caching explainer */}
        <section id="caching">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">How Prompt Caching Works</h2>
          <p className="text-[#333333] mb-8">
            Every provider calls it something different and prices it differently. Here is what
            each model actually does -- with a worked example using the same scenario: a customer
            support bot with a 10,000-token system prompt, called 1,000 times.
          </p>

          <div className="space-y-8">
            {/* Anthropic */}
            <div className="border border-[#E5E5E5] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">Anthropic -- explicit cache control</h3>
              <p className="text-sm text-[#333333] mb-4">
                You mark cache breakpoints in your prompt. Anthropic stores everything up to that point.
                Write cost: 1.25x input price (one-time per TTL window). Read cost: 0.1x input price.
                Default TTL is 5 minutes; extended caching available.
              </p>
              <div className="bg-[#F9F9F9] rounded p-4 text-sm font-mono">
                <p className="font-sans font-semibold text-[#1A1A1A] mb-2">
                  Sonnet 4.6 -- 10k token system prompt, 1,000 calls
                </p>
                <p>Without cache: 1,000 x (10,000 x $3.00/1M) = <strong>$30.00</strong></p>
                <p>Cache write (once): 10,000 x $3.75/1M = $0.038</p>
                <p>Cache reads (x1,000): 1,000 x (10,000 x $0.30/1M) = $3.00</p>
                <p className="mt-1 text-green-700 font-semibold">Total: $3.04 -- 90% savings on the cached portion</p>
              </div>
            </div>

            {/* OpenAI */}
            <div className="border border-[#E5E5E5] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">OpenAI -- automatic prefix caching</h3>
              <p className="text-sm text-[#333333] mb-4">
                No setup required. For prompts over 1,024 tokens, OpenAI automatically caches
                the longest cacheable prefix. You pay 50% of the input price for cached tokens.
                Cache hits are visible in your usage response.
              </p>
              <div className="bg-[#F9F9F9] rounded p-4 text-sm font-mono">
                <p className="font-sans font-semibold text-[#1A1A1A] mb-2">
                  GPT-4o -- 10k token system prompt, 1,000 calls (prices unverified)
                </p>
                <p>Without cache: 1,000 x (10,000 x $2.50/1M) = <strong>$25.00</strong></p>
                <p>With cache (50% rate): 1,000 x (10,000 x $1.25/1M) = <strong>$12.50</strong></p>
                <p className="mt-1 text-green-700 font-semibold">50% savings on the input portion</p>
              </div>
            </div>

            {/* Gemini */}
            <div className="border border-[#E5E5E5] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">Gemini -- explicit context caching with storage fee</h3>
              <p className="text-sm text-[#333333] mb-4">
                You create a cache object via the API. Cached input tokens cost $0.125/1M (Gemini
                2.5 Pro, under 200K context) vs $1.25/1M normal -- a 90% reduction per token.
                Storage is billed separately at $4.50/1M tokens/hour. For high-frequency workloads
                the token savings exceed the storage cost quickly.
              </p>
              <div className="bg-[#F9F9F9] rounded p-4 text-sm font-mono">
                <p className="font-sans font-semibold text-[#1A1A1A] mb-2">
                  Gemini 2.5 Pro -- 10k token system prompt, 1,000 calls, 1 hour
                </p>
                <p>Without cache: 1,000 x (10,000 x $1.25/1M) = <strong>$12.50</strong></p>
                <p>Cache reads: 1,000 x (10,000 x $0.125/1M) = $1.25</p>
                <p>Storage (1 hr): 10,000 x $4.50/1M/hr = $0.045</p>
                <p className="mt-1 text-green-700 font-semibold">Total: $1.30 -- 90% savings on the input portion</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-[#E5E5E5] rounded-lg p-5">
                <h3 className="font-semibold text-[#1A1A1A] mb-2">{faq.question}</h3>
                <p className="text-[#333333] text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Related Resources</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <a
              href="/ai-models"
              className="border border-[#E5E5E5] rounded-lg p-5 hover:border-[#FFDE59] transition-colors block"
            >
              <h3 className="font-bold text-[#1A1A1A] mb-1">AI Models Guide</h3>
              <p className="text-sm text-[#333333]">
                Full comparison of Claude, GPT, Gemini, Llama with context windows and capabilities.
              </p>
            </a>
            <a
              href="/ai-prompt-generator"
              className="border border-[#E5E5E5] rounded-lg p-5 hover:border-[#FFDE59] transition-colors block"
            >
              <h3 className="font-bold text-[#1A1A1A] mb-1">AI Prompt Generator</h3>
              <p className="text-sm text-[#333333]">
                Generate optimised prompts for any model -- reduce tokens, improve output quality.
              </p>
            </a>
            <a
              href="/ai-glossary"
              className="border border-[#E5E5E5] rounded-lg p-5 hover:border-[#FFDE59] transition-colors block"
            >
              <h3 className="font-bold text-[#1A1A1A] mb-1">AI Glossary</h3>
              <p className="text-sm text-[#333333]">
                Definitions for tokens, context window, prompt caching, and other key terms.
              </p>
            </a>
          </div>
        </section>

      </div>
    </Layout>
  );
}
