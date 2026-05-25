import { useState, useCallback } from 'react';
import pricingData from '../../data/api-pricing.json';

function computeCost(model, inputTokens, outputTokens, cacheHitPct) {
  const hitRatio = Math.min(Math.max(cacheHitPct / 100, 0), 1);
  const cached = inputTokens * hitRatio;
  const nonCached = inputTokens * (1 - hitRatio);

  let inputCost;
  if (hitRatio > 0 && model.cache_read_per_1m != null) {
    inputCost = (nonCached * model.input_per_1m + cached * model.cache_read_per_1m) / 1_000_000;
  } else {
    inputCost = (inputTokens * model.input_per_1m) / 1_000_000;
  }

  const outputCost = (outputTokens * model.output_per_1m) / 1_000_000;
  return inputCost + outputCost;
}

function computeBaselineCost(model, inputTokens, outputTokens) {
  return (inputTokens * model.input_per_1m + outputTokens * model.output_per_1m) / 1_000_000;
}

function fmt(n) {
  if (n < 0.0001) return '$0.0000';
  if (n < 0.01) return `$${n.toFixed(5)}`;
  return `$${n.toFixed(4)}`;
}

export default function ApiPricingCalculator() {
  const [inputs, setInputs] = useState({ inputTokens: 10000, outputTokens: 2000, cacheHitPct: 50 });
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: Number(value) }));
  };

  const calculate = useCallback(() => {
    const { inputTokens, outputTokens, cacheHitPct } = inputs;
    const rows = pricingData.models.map(model => {
      const withCache = computeCost(model, inputTokens, outputTokens, cacheHitPct);
      const baseline = computeBaselineCost(model, inputTokens, outputTokens);
      const savings = baseline - withCache;
      const savingsPct = baseline > 0 ? (savings / baseline) * 100 : 0;
      return { model, withCache, baseline, savings, savingsPct };
    });
    rows.sort((a, b) => a.withCache - b.withCache);
    setResults(rows);
  }, [inputs]);

  return (
    <div className="bg-white rounded-lg border border-[#E5E5E5] p-6">
      <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Cost Calculator</h2>
      <p className="text-[#333333] mb-6 text-sm">
        Enter your task shape to see cost per call across providers. Cache write cost excluded
        (amortized). Gemini storage billed separately.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="inputTokens" className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Input tokens
          </label>
          <input
            id="inputTokens"
            name="inputTokens"
            type="number"
            min="1"
            value={inputs.inputTokens}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E5E5E5] rounded text-sm focus:outline-none focus:border-[#1A1A1A]"
          />
          <p className="text-xs text-gray-500 mt-1">~750 words = 1,000 tokens</p>
        </div>
        <div>
          <label htmlFor="outputTokens" className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Output tokens
          </label>
          <input
            id="outputTokens"
            name="outputTokens"
            type="number"
            min="1"
            value={inputs.outputTokens}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E5E5E5] rounded text-sm focus:outline-none focus:border-[#1A1A1A]"
          />
          <p className="text-xs text-gray-500 mt-1">Typical reply length</p>
        </div>
        <div>
          <label htmlFor="cacheHitPct" className="block text-sm font-medium text-[#1A1A1A] mb-1">
            Cache hit ratio (%)
          </label>
          <input
            id="cacheHitPct"
            name="cacheHitPct"
            type="number"
            min="0"
            max="100"
            value={inputs.cacheHitPct}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#E5E5E5] rounded text-sm focus:outline-none focus:border-[#1A1A1A]"
          />
          <p className="text-xs text-gray-500 mt-1">0 = no cache; 80 = high reuse</p>
        </div>
      </div>

      <button
        onClick={calculate}
        className="bg-[#FFDE59] text-[#1A1A1A] font-semibold px-6 py-2 rounded hover:bg-yellow-400 transition-colors text-sm"
      >
        Calculate cost
      </button>

      {results && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
            Cost per call: {inputs.inputTokens.toLocaleString()} in / {inputs.outputTokens.toLocaleString()} out
            {inputs.cacheHitPct > 0 ? `, ${inputs.cacheHitPct}% cache hit` : ', no cache'}
          </h3>
          <div className="space-y-3">
            {results.map(({ model, withCache, baseline, savingsPct }, i) => (
              <div
                key={model.id}
                className={`border rounded-lg p-4 ${i === 0 ? 'border-[#FFDE59] bg-yellow-50' : 'border-[#E5E5E5]'}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="font-semibold text-[#1A1A1A] text-sm">{model.display_name}</span>
                    <span className="text-gray-500 text-xs ml-2">{model.vendor}</span>
                    {i === 0 && (
                      <span className="ml-2 text-xs bg-[#FFDE59] text-[#1A1A1A] px-2 py-0.5 rounded font-medium">cheapest</span>
                    )}
                    {!model.verified && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">price unverified</span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#1A1A1A]">{fmt(withCache)}</span>
                    {inputs.cacheHitPct > 0 && model.cache_read_per_1m != null && (
                      <span className="text-xs text-green-600 ml-2">
                        saves {savingsPct.toFixed(0)}% vs {fmt(baseline)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-500">
                  <span>In: ${model.input_per_1m}/1M</span>
                  <span>Out: ${model.output_per_1m}/1M</span>
                  {model.cache_read_per_1m != null && (
                    <span>Cache read: ${model.cache_read_per_1m}/1M</span>
                  )}
                  {model.cache_type === 'gemini' && inputs.cacheHitPct > 0 && (
                    <span className="text-orange-600">+ storage cost</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Prices sourced from vendor pages. OpenAI prices unverified -- check{' '}
            <a href="https://openai.com/api/pricing/" className="underline" target="_blank" rel="noopener noreferrer">
              openai.com/api/pricing
            </a>{' '}
            for current rates.
          </p>
        </div>
      )}
    </div>
  );
}
