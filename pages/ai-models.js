import { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import LastVerified from '../components/LastVerified';
import { AI_MODELS, AI_MODELS_META } from '../lib/ai-models';
import { generateFAQSchema } from '../lib/schemaGenerator';
import MarketShareSection from '../components/sections/MarketShareSection';
import AIFlashReportTrackerNote from '../components/ui/AIFlashReportTrackerNote';
import marketShareSnapshot from '../data/ai-models-market-share/2026-05.json';

export default function AIModels() {
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedModels, setSelectedModels] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "AI Models Compared: Claude, GPT, Gemini, Llama, Mistral & More",
    "description": "Up-to-date comparison of the major AI models — Claude Opus 4.8, Sonnet 4.6, Haiku 4.5, GPT-5, GPT-4o, Gemini 2.5 Pro, Llama 3.3, Mistral Large and more — with context windows, pricing, and feature differences.",
    "keywords": "AI models, Claude Opus 4.8, Claude Sonnet 4.6, GPT-5, GPT-4o, Gemini 2.5 Pro, Llama 3.3, Mistral, LLM comparison",
    "datePublished": "2025-01-15T00:00:00+00:00",
    "dateModified": `${AI_MODELS_META.lastVerified}T00:00:00+00:00`,
    "author": {
      "@type": "Organization",
      "name": "PromptWritingStudio",
      "url": "https://promptwritingstudio.com"
    }
  };

  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "AI Model Market Share - Monthly Snapshots",
    "description": "Monthly estimated market share of major AI models by API call volume, derived from public usage signals including OpenRouter leaderboard data, Hugging Face download counts, and Stack Overflow Developer Survey data.",
    "url": "https://promptwritingstudio.com/ai-models",
    "creator": {
      "@type": "Organization",
      "name": "PromptWritingStudio",
      "url": "https://promptwritingstudio.com"
    },
    "dateModified": marketShareSnapshot._meta.snapshot_date,
    "temporalCoverage": `${marketShareSnapshot._meta.trend_months[0]}/${marketShareSnapshot._meta.period}`,
    "variableMeasured": "AI model API call share (estimated percentage)",
    "measurementTechnique": marketShareSnapshot._meta.methodology,
    "license": "https://creativecommons.org/licenses/by/4.0/"
  };

  // FAQPage schema — mirrors visible content on this page (section headings + body copy).
  // Each Q&A maps to a section the user can read on the page.
  const faqs = [
    {
      question: "What are supervised learning models?",
      answer: "Supervised learning models are trained with labeled data for specific tasks. They are used for speech recognition, text classification, fraud detection, regression analysis, and include algorithms like KNN, K-means, and Random Forest."
    },
    {
      question: "What are unsupervised learning models?",
      answer: "Unsupervised learning models discover patterns in unlabeled data. They are used for trend analysis, clustering algorithms, traffic pattern recognition, anomaly detection, and dimensionality reduction."
    },
    {
      question: "What are reinforcement learning models?",
      answer: "Reinforcement learning models learn by trial-and-error and are goal-oriented. They are used in robotics control, stock trading strategies, gaming AI, autonomous systems, and resource optimization."
    },
    {
      question: "What are the notable flagship text and multimodal AI models?",
      answer: "Claude Opus 4.8 (Anthropic) for agentic coding and long-horizon reasoning with a 1M context window; Claude Sonnet 4.6 (Anthropic) for the best price-performance day-to-day with a 1M context window; GPT-5 (OpenAI) as a flagship multimodal model; and Gemini 2.5 Pro (Google) with a 1M+ token context window."
    },
    {
      question: "What are the notable specialized and open-source AI models?",
      answer: "Llama 3.3 70B (Meta) with open weights and a 128K context window; Mistral Large 2 as an EU-hosted option for data residency; DeepSeek V3, an open-weights MoE with strong coding performance; and Claude Haiku 4.5 (Anthropic), which is fast, cheap, and still strong on extraction."
    },
    {
      question: "What's changed in the AI model landscape?",
      answer: "Claude, GPT, and Gemini families all now ship tiered lineups (flagship, mid, and small). Long context windows (200K–1M+ tokens) are now table stakes on flagship models. Multimodal (text plus vision, and sometimes audio/video) is baseline, not a premium feature. Agentic tool use and computer use is pushing model choice toward Claude for coding workflows. Reasoning and thinking modes are a separate purchase decision from raw model size."
    },
    {
      question: "How do AI models compare on cost efficiency?",
      answer: "Open-weight models (Llama 3.3, DeepSeek V3) are close to proprietary on many tasks. Mid-tier models (Sonnet, GPT-4o, Gemini Flash) handle 80%+ of real workloads. Small models (Haiku, Gemini Flash Lite) shine in high-volume pipelines. Prompt caching and batch APIs materially cut cost on repeated-context workloads."
    }
  ];

  const faqSchemaData = generateFAQSchema(faqs);

  const categoryLabels = {
    text: 'Text Generation',
    multimodal: 'Multimodal',
    coding: 'Code Generation',
    reasoning: 'Advanced Reasoning',
    'open-source': 'Open Source',
    enterprise: 'Enterprise'
  };

  // AI Models data - sourced from data/ai-models.json (single source of truth across the site).
  // Update there, not here.
  const models = AI_MODELS.map(m => ({
    slug: m.id,
    name: m.display_name,
    company: m.vendor,
    tier: m.tier || 'unknown',
    parameters: m.parameters || 'Unknown',
    contextWindow: m.context_window_label || 'Unknown',
    contextTokens: m.context_window || 0,
    categories: m.categories || [],
    pricing: m.pricing_label,
    releaseDate: m.released,
    releaseYear: (m.released || '').slice(0, 4) || 'Unknown',
    features: m.features || [],
    description: m.description
  }));

  const vendors = [...new Set(models.map(m => m.company))].sort();
  const tiers = [...new Set(models.map(m => m.tier))].sort();
  const allCategories = [...new Set(models.flatMap(m => m.categories))].sort();
  const years = [...new Set(models.map(m => m.releaseYear))].sort().reverse();

  const filteredModels = models.filter(m => {
    if (selectedVendor !== 'all' && m.company !== selectedVendor) return false;
    if (selectedTier !== 'all' && m.tier !== selectedTier) return false;
    if (selectedCategory !== 'all' && !m.categories.includes(selectedCategory)) return false;
    if (selectedYear !== 'all' && m.releaseYear !== selectedYear) return false;
    return true;
  });

  const sortedModels = [...filteredModels].sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name) * dir;
      case 'company':
        return a.company.localeCompare(b.company) * dir;
      case 'tier':
        return a.tier.localeCompare(b.tier) * dir;
      case 'context':
        return (a.contextTokens - b.contextTokens) * dir;
      case 'release':
        return (new Date(a.releaseDate) - new Date(b.releaseDate)) * dir;
      default:
        return 0;
    }
  });

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDir('asc');
    }
  };

  const resetFilters = () => {
    setSelectedVendor('all');
    setSelectedTier('all');
    setSelectedCategory('all');
    setSelectedYear('all');
  };

  const sortIndicator = (column) => sortBy === column ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '';

  // Toggle model selection for comparison
  const toggleModelSelection = (model) => {
    setSelectedModels(prev => {
      const isSelected = prev.find(m => m.name === model.name);
      if (isSelected) {
        return prev.filter(m => m.name !== model.name);
      } else if (prev.length < 4) {
        return [...prev, model];
      }
      return prev;
    });
  };

  return (
    <Layout
      title="AI Models Compared — Claude, GPT, Gemini, Llama & More (2026)"
      description="Up-to-date comparison of the major AI models — Claude Opus 4.8, Sonnet 4.6, Haiku 4.5, GPT-5, GPT-4o, Gemini 2.5 Pro, Llama 3.3, Mistral Large, DeepSeek V3 — with context windows, pricing, and feature differences."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                AI Models Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Side-by-side look at the major AI models — Claude Opus 4.8, Sonnet 4.6, Haiku 4.5, GPT-5, GPT-4o,
                Gemini 2.5 Pro, Llama 3.3, Mistral Large, DeepSeek V3 — with context windows, pricing, and what each is best at.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                <span className="bg-white/20 px-4 py-2 rounded-full">📊 {models.length} Models</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">🔄 Updated Regularly</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">⚡ Interactive Comparison</span>
              </div>
              <div className="mt-6 text-white/80">
                <LastVerified date={AI_MODELS_META.lastVerified} source="https://github.com/The-Flash-Report/promptwritingstudio/blob/main/data/ai-models.json" className="!text-white/80" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Multi-axis Filter Row */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-wrap items-end gap-4">
              <div className="flex-1 min-w-[160px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                <select
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All vendors</option>
                  {vendors.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[160px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
                <select
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All tiers</option>
                  {tiers.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[160px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All categories</option>
                  {allCategories.map(c => <option key={c} value={c}>{categoryLabels[c] || c}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[140px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Release year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All years</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-500">
              Showing {sortedModels.length} of {models.length} models
            </div>

            {/* Comparison Bar */}
            {selectedModels.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-blue-800">
                      Compare Selected Models ({selectedModels.length}/4):
                    </span>
                    <div className="flex gap-2 ml-2">
                      {selectedModels.map(model => (
                        <span
                          key={model.name}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          {model.name}
                          <button
                            onClick={() => toggleModelSelection(model)}
                            className="text-blue-600 hover:text-blue-800 ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {showComparison ? 'Hide Comparison' : 'Compare Models'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Comparison Table */}
          {showComparison && selectedModels.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-x-auto">
              <h3 className="text-2xl font-bold mb-6">Model Comparison</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Specification</th>
                    {selectedModels.map(model => (
                      <th key={model.name} className="text-left py-3 px-4 min-w-48">
                        {model.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Company</td>
                    {selectedModels.map(model => (
                      <td key={model.name} className="py-3 px-4">{model.company}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Parameters</td>
                    {selectedModels.map(model => (
                      <td key={model.name} className="py-3 px-4">{model.parameters}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Context Window</td>
                    {selectedModels.map(model => (
                      <td key={model.name} className="py-3 px-4">{model.contextWindow}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Pricing</td>
                    {selectedModels.map(model => (
                      <td key={model.name} className="py-3 px-4">{model.pricing}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">MMLU Score</td>
                    {selectedModels.map(model => (
                      <td key={model.name} className="py-3 px-4">{model.benchmarks.mmlu}</td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">HumanEval Score</td>
                    {selectedModels.map(model => (
                      <td key={model.name} className="py-3 px-4">{model.benchmarks.humanEval}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Release Date</td>
                    {selectedModels.map(model => (
                      <td key={model.name} className="py-3 px-4">{model.releaseDate}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Important Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Information Accuracy Notice</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>This guide contains verified information about current AI models. Some specifications (parameters, benchmarks, context windows) are marked as "Unknown" when we cannot verify the accuracy from official sources. We prioritize accuracy over completeness and update information as it becomes publicly available.</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Model Types and Architectures */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-8 text-center">AI Model Types and Architectures</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
              AI models are built upon a variety of architectures, each suited to distinct tasks and applications. 
              Here's a comprehensive breakdown of the major types and leading models available today.
            </p>

            {/* Learning Approaches */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">By Learning Approach</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-blue-800">Supervised Learning Models</h4>
                  <p className="text-gray-700 mb-3">Trained with labeled data for specific tasks</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Speech recognition</li>
                    <li>• Text classification</li>
                    <li>• Fraud detection</li>
                    <li>• Regression analysis</li>
                    <li>• KNN, K-means, Random Forest</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-green-800">Unsupervised Learning Models</h4>
                  <p className="text-gray-700 mb-3">Discover patterns in unlabeled data</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Trend analysis</li>
                    <li>• Clustering algorithms</li>
                    <li>• Traffic pattern recognition</li>
                    <li>• Anomaly detection</li>
                    <li>• Dimensionality reduction</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-purple-800">Reinforcement Learning Models</h4>
                  <p className="text-gray-700 mb-3">Learn by trial-and-error, goal-oriented</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Robotics control</li>
                    <li>• Stock trading strategies</li>
                    <li>• Gaming AI</li>
                    <li>• Autonomous systems</li>
                    <li>• Resource optimization</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Model Architecture Categories */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">By Model Architecture</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Category</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Key Models & Architectures</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Main Applications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Rule-Based Systems</td>
                      <td className="border border-gray-300 px-4 py-3">Static decision trees, Expert systems</td>
                      <td className="border border-gray-300 px-4 py-3">Simple chatbots, automation, business rules</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Machine Learning</td>
                      <td className="border border-gray-300 px-4 py-3">Linear/Logistic Regression, Decision Trees, Random Forest</td>
                      <td className="border border-gray-300 px-4 py-3">Spam filters, prediction, classification, recommendation systems</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Deep Learning</td>
                      <td className="border border-gray-300 px-4 py-3">CNNs, RNNs, LSTMs, GRUs</td>
                      <td className="border border-gray-300 px-4 py-3">Image recognition, time series, language modeling, speech processing</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Transformer Models</td>
                      <td className="border border-gray-300 px-4 py-3">BERT, GPT, T5, RoBERTa</td>
                      <td className="border border-gray-300 px-4 py-3">NLP, text generation, translation, question answering</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Generative Models</td>
                      <td className="border border-gray-300 px-4 py-3">GANs, VAEs, Diffusion, Stable Diffusion</td>
                      <td className="border border-gray-300 px-4 py-3">Synthetic data/images, video synthesis, 3D scene creation</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">Large Language Models</td>
                      <td className="border border-gray-300 px-4 py-3">Claude Opus 4.8, Claude Sonnet 4.6, GPT-5, Gemini 2.5 Pro, Llama 3.3</td>
                      <td className="border border-gray-300 px-4 py-3">Chatbots, research, text generation, code generation</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Multimodal Models</td>
                      <td className="border border-gray-300 px-4 py-3">GPT-4o, Gemini 2.5 Pro, Claude Sonnet 4.6</td>
                      <td className="border border-gray-300 px-4 py-3">Text + images + audio, cross-modal understanding, content creation</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3 font-medium">3D Generation Models</td>
                      <td className="border border-gray-300 px-4 py-3">NeRFs, Stable Virtual Camera, Luma AI</td>
                      <td className="border border-gray-300 px-4 py-3">3D environments from images, virtual reality, gaming assets</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notable Flagship Models */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-blue-600">Notable Flagship AI Models</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h4 className="text-lg font-semibold mb-3 text-blue-800">Text & Multimodal</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Claude Opus 4.8 (Anthropic):</strong> Agentic coding + long-horizon reasoning, 1M context</li>
                    <li><strong>Claude Sonnet 4.6 (Anthropic):</strong> Best price-performance for day-to-day, 1M context</li>
                    <li><strong>GPT-5 (OpenAI):</strong> Flagship multimodal model</li>
                    <li><strong>Gemini 2.5 Pro (Google):</strong> 1M+ token context window</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h4 className="text-lg font-semibold mb-3 text-green-800">Specialized & Open Source</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Llama 3.3 70B (Meta):</strong> Open weights, 128K context</li>
                    <li><strong>Mistral Large 2:</strong> EU-hosted option for data residency</li>
                    <li><strong>DeepSeek V3:</strong> Open-weights MoE with strong coding performance</li>
                    <li><strong>Claude Haiku 4.5 (Anthropic):</strong> Fast, cheap, still strong on extraction</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-gray-800">Key Takeaways</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• AI models range from classic ML approaches to cutting-edge deep learning architectures</li>
                <li>• Large Language Models and multimodal models dominate current innovation</li>
                <li>• Generative models enable rich creation of synthetic data, images, and videos</li>
                <li>• Transformer-based models power most language and content generation tasks</li>
                <li>• Open-source projects are democratizing access to cutting-edge capabilities</li>
                <li>• Model selection depends on the specific task requirements and constraints</li>
              </ul>
            </div>
          </div>

          {/* Sortable Filterable Model Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-700">
                  <tr>
                    <th className="px-3 py-3 w-12"></th>
                    <th
                      className="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleSort('name')}
                    >
                      Model{sortIndicator('name')}
                    </th>
                    <th
                      className="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-100 hidden sm:table-cell"
                      onClick={() => toggleSort('company')}
                    >
                      Vendor{sortIndicator('company')}
                    </th>
                    <th
                      className="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-100 hidden md:table-cell"
                      onClick={() => toggleSort('tier')}
                    >
                      Tier{sortIndicator('tier')}
                    </th>
                    <th
                      className="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-100 hidden md:table-cell"
                      onClick={() => toggleSort('context')}
                    >
                      Context{sortIndicator('context')}
                    </th>
                    <th className="px-3 py-3 font-semibold hidden lg:table-cell">Pricing</th>
                    <th
                      className="px-3 py-3 font-semibold cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                      onClick={() => toggleSort('release')}
                    >
                      Released{sortIndicator('release')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedModels.map((model) => {
                    const isSelected = !!selectedModels.find(m => m.name === model.name);
                    return (
                      <tr
                        key={model.slug}
                        data-vendor={model.company}
                        data-tier={model.tier}
                        data-categories={model.categories.join(',')}
                        data-year={model.releaseYear}
                        className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
                      >
                        <td className="px-3 py-3 align-top">
                          <input
                            type="checkbox"
                            aria-label={`Compare ${model.name}`}
                            checked={isSelected}
                            onChange={() => toggleModelSelection(model)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-3 py-3 align-top">
                          <Link href={`/ai-models/${model.slug}`} className="font-semibold text-blue-700 hover:underline">
                            {model.name}
                          </Link>
                          <div className="text-xs text-gray-500 mt-1 max-w-md">{model.description}</div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {model.categories.slice(0, 3).map(cat => (
                              <span key={cat} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                                {categoryLabels[cat] || cat}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-3 align-top text-gray-700 hidden sm:table-cell">{model.company}</td>
                        <td className="px-3 py-3 align-top text-gray-700 hidden md:table-cell capitalize">{model.tier}</td>
                        <td className="px-3 py-3 align-top text-gray-700 hidden md:table-cell whitespace-nowrap">{model.contextWindow}</td>
                        <td className="px-3 py-3 align-top text-gray-700 hidden lg:table-cell text-xs">{model.pricing}</td>
                        <td className="px-3 py-3 align-top text-gray-700 hidden lg:table-cell whitespace-nowrap">{model.releaseDate}</td>
                      </tr>
                    );
                  })}
                  {sortedModels.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-3 py-8 text-center text-gray-500">
                        No models match the current filters.{' '}
                        <button onClick={resetFilters} className="text-blue-600 hover:underline">
                          Reset filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">What's changed</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Claude, GPT, and Gemini families all now ship tiered lineups (flagship + mid + small)</li>
                  <li>• Long context windows (200K–1M+ tokens) are now table stakes on flagship models</li>
                  <li>• Multimodal (text + vision, and sometimes audio/video) is baseline, not a premium feature</li>
                  <li>• Agentic tool use + computer use is pushing model choice toward Claude for coding workflows</li>
                  <li>• Reasoning/thinking modes are a separate purchase decision from raw model size</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-600">Cost efficiency</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Open-weight models (Llama 3.3, DeepSeek V3) are close to proprietary on many tasks</li>
                  <li>• Mid-tier models (Sonnet, GPT-4o, Gemini Flash) handle 80%+ of real workloads</li>
                  <li>• Small models (Haiku, Gemini Flash Lite) shine in high-volume pipelines</li>
                  <li>• Prompt caching and batch APIs materially cut cost on repeated-context workloads</li>
                </ul>
              </div>
            </div>
            <AIFlashReportTrackerNote className="mt-6 pt-4 border-t border-gray-100" />
          </div>

          <MarketShareSection snapshotData={marketShareSnapshot} />
        </div>
      </div>

      {/* FAQ Section — mirrors FAQPage JSON-LD schema */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal Links Section */}
      <div className="bg-[#F9F9F9] py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Explore More AI Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a href="/ai-prompt-generator" className="bg-white rounded-lg p-6 border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors">
              <h3 className="font-bold mb-2">AI Prompt Generator</h3>
              <p className="text-sm text-gray-600">Generate optimised prompts for any of these models — free, no signup required.</p>
            </a>
            <a href="/ai-prompt-examples" className="bg-white rounded-lg p-6 border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors">
              <h3 className="font-bold mb-2">AI Prompt Examples</h3>
              <p className="text-sm text-gray-600">Browse 500+ tested prompts for ChatGPT, Claude, Gemini, and more.</p>
            </a>
            <a href="/ai-glossary" className="bg-white rounded-lg p-6 border border-[#E5E5E5] hover:border-[#FFDE59] transition-colors">
              <h3 className="font-bold mb-2">AI Glossary</h3>
              <p className="text-sm text-gray-600">Understand the terms and concepts behind every model on this page.</p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
