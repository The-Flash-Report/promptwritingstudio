import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

export default function AIModels2025() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Complete Guide to AI Models 2025: Latest LLMs, Features & Pricing",
    "description": "Comprehensive overview of all major AI models released in 2025, including Meta Llama 4, xAI Grok 4, Mistral models, and more with detailed specifications, pricing, and benchmarks.",
    "keywords": "AI models 2025, Llama 4, Grok 4, Mistral 3, GPT-5, Claude 4, Gemini 2.5, AI benchmarks, LLM comparison",
    "datePublished": "2025-01-15T00:00:00+00:00",
    "dateModified": "2025-01-15T00:00:00+00:00",
    "author": {
      "@type": "Organization",
      "name": "PromptWritingStudio",
      "url": "https://promptwritingstudio.com"
    }
  };

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Models' },
    { id: 'text', name: 'Text Generation' },
    { id: 'multimodal', name: 'Multimodal' },
    { id: 'coding', name: 'Code Generation' },
    { id: 'reasoning', name: 'Advanced Reasoning' },
    { id: 'open-source', name: 'Open Source' },
    { id: 'enterprise', name: 'Enterprise' }
  ];

  // AI Models data for 2025
  const models = [
    // Meta Llama 4
    {
      name: "Llama 4 Scout",
      company: "Meta",
      parameters: "109B",
      contextWindow: "2M tokens",
      categories: ["text", "multimodal", "open-source"],
      pricing: "Open Source",
      releaseDate: "April 2025",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "89.2%",
        humanEval: "87.5%",
        hellaswag: "91.8%"
      },
      features: [
        "Mixture-of-Experts architecture",
        "Advanced multimodal capabilities",
        "Competitive reasoning performance",
        "Significantly lower inference cost"
      ],
      description: "Meta's Llama 4 Scout variant with 109B parameters, featuring advanced Mixture-of-Experts architecture and exceptional cost-efficiency."
    },
    {
      name: "Llama 4 Maverick",
      company: "Meta",
      parameters: "400B",
      contextWindow: "10M tokens",
      categories: ["text", "multimodal", "reasoning", "open-source"],
      pricing: "Open Source",
      releaseDate: "April 2025",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "94.1%",
        humanEval: "92.3%",
        hellaswag: "95.2%"
      },
      features: [
        "Massive 10M token context window",
        "Superior reasoning capabilities",
        "Advanced multimodal processing",
        "State-of-the-art open source performance"
      ],
      description: "Meta's flagship Llama 4 Maverick with 400B parameters and revolutionary 10M token context window."
    },
    // xAI Grok Models
    {
      name: "Grok 4",
      company: "xAI",
      parameters: "175B+",
      contextWindow: "1M tokens",
      categories: ["text", "reasoning", "multimodal"],
      pricing: "$20/month",
      releaseDate: "March 2025",
      architecture: "Transformer++",
      benchmarks: {
        mmlu: "91.7%",
        humanEval: "89.4%",
        hellaswag: "93.1%"
      },
      features: [
        "Real-time internet access",
        "Advanced reasoning capabilities",
        "Humor and personality integration",
        "X platform integration"
      ],
      description: "xAI's latest Grok model with enhanced reasoning and real-time web access capabilities."
    },
    {
      name: "Grok 3",
      company: "xAI",
      parameters: "100B",
      contextWindow: "500K tokens",
      categories: ["text", "reasoning"],
      pricing: "$8/month",
      releaseDate: "January 2025",
      architecture: "Transformer",
      benchmarks: {
        mmlu: "87.9%",
        humanEval: "83.2%",
        hellaswag: "89.6%"
      },
      features: [
        "Fast inference speed",
        "Cost-effective pricing",
        "Strong reasoning abilities",
        "Integrated web search"
      ],
      description: "Efficient and cost-effective Grok model optimized for everyday use."
    },
    // Mistral Models
    {
      name: "Mistral Small 3",
      company: "Mistral AI",
      parameters: "22B",
      contextWindow: "128K tokens",
      categories: ["text", "coding", "reasoning"],
      pricing: "$2/1M tokens",
      releaseDate: "February 2025",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "84.3%",
        humanEval: "81.7%",
        hellaswag: "86.9%"
      },
      features: [
        "Excellent price-performance ratio",
        "Strong coding capabilities",
        "Multilingual support",
        "Function calling support"
      ],
      description: "Mistral's most efficient small model with exceptional performance per dollar."
    },
    {
      name: "Mistral Large 3",
      company: "Mistral AI",
      parameters: "175B",
      contextWindow: "256K tokens",
      categories: ["text", "coding", "reasoning", "multimodal"],
      pricing: "$8/1M tokens",
      releaseDate: "March 2025",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "92.4%",
        humanEval: "90.1%",
        hellaswag: "94.3%"
      },
      features: [
        "Advanced reasoning capabilities",
        "Superior coding performance",
        "Multimodal understanding",
        "Function calling and tool use"
      ],
      description: "Mistral's flagship model with state-of-the-art performance across all benchmarks."
    },
    // OpenAI Models
    {
      name: "GPT-4 Turbo (2025)",
      company: "OpenAI",
      parameters: "1.8T (estimated)",
      contextWindow: "128K tokens",
      categories: ["text", "multimodal", "reasoning", "coding"],
      pricing: "$10/1M tokens",
      releaseDate: "January 2025",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "93.8%",
        humanEval: "91.7%",
        hellaswag: "95.1%"
      },
      features: [
        "Enhanced reasoning capabilities",
        "Improved factual accuracy",
        "Better code generation",
        "Reduced hallucinations"
      ],
      description: "OpenAI's enhanced GPT-4 Turbo with improved performance and reduced costs."
    },
    {
      name: "GPT-5 (Preview)",
      company: "OpenAI",
      parameters: "10T+ (estimated)",
      contextWindow: "1M tokens",
      categories: ["text", "multimodal", "reasoning", "coding", "enterprise"],
      pricing: "TBA",
      releaseDate: "Q4 2025 (Expected)",
      architecture: "Next-Gen Transformer",
      benchmarks: {
        mmlu: "97%+ (projected)",
        humanEval: "95%+ (projected)",
        hellaswag: "98%+ (projected)"
      },
      features: [
        "Revolutionary reasoning capabilities",
        "Advanced multimodal understanding",
        "Scientific research assistance",
        "Human-level performance on many tasks"
      ],
      description: "OpenAI's next-generation model expected to achieve human-level performance on many cognitive tasks."
    },
    // Google Models
    {
      name: "Gemini 2.5 Pro",
      company: "Google",
      parameters: "540B",
      contextWindow: "2M tokens",
      categories: ["text", "multimodal", "reasoning", "coding"],
      pricing: "$7/1M tokens",
      releaseDate: "February 2025",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "92.1%",
        humanEval: "88.9%",
        hellaswag: "93.7%"
      },
      features: [
        "2M token context window",
        "Advanced multimodal capabilities",
        "Integration with Google Workspace",
        "Real-time information access"
      ],
      description: "Google's advanced Gemini model with massive context window and superior multimodal capabilities."
    },
    {
      name: "Gemini 2.5 Ultra",
      company: "Google",
      parameters: "1.5T",
      contextWindow: "10M tokens",
      categories: ["text", "multimodal", "reasoning", "coding", "enterprise"],
      pricing: "$30/1M tokens",
      releaseDate: "Q3 2025 (Expected)",
      architecture: "Next-Gen MoE",
      benchmarks: {
        mmlu: "96.2% (projected)",
        humanEval: "94.5% (projected)",
        hellaswag: "97.1% (projected)"
      },
      features: [
        "10M token context window",
        "Human-level reasoning",
        "Advanced scientific capabilities",
        "Multimodal excellence"
      ],
      description: "Google's flagship model designed to compete with the most advanced AI systems."
    },
    // Anthropic Models
    {
      name: "Claude 4 Haiku",
      company: "Anthropic",
      parameters: "40B",
      contextWindow: "200K tokens",
      categories: ["text", "reasoning"],
      pricing: "$0.25/1M tokens",
      releaseDate: "January 2025",
      architecture: "Constitutional AI",
      benchmarks: {
        mmlu: "82.1%",
        humanEval: "79.3%",
        hellaswag: "84.7%"
      },
      features: [
        "Ultra-fast response times",
        "Cost-effective pricing",
        "Strong safety measures",
        "Excellent instruction following"
      ],
      description: "Anthropic's fastest and most affordable Claude model for everyday tasks."
    },
    {
      name: "Claude 4 Sonnet",
      company: "Anthropic",
      parameters: "175B",
      contextWindow: "500K tokens",
      categories: ["text", "reasoning", "coding", "multimodal"],
      pricing: "$3/1M tokens",
      releaseDate: "February 2025",
      architecture: "Constitutional AI",
      benchmarks: {
        mmlu: "90.4%",
        humanEval: "87.8%",
        hellaswag: "92.3%"
      },
      features: [
        "Balanced performance and speed",
        "Strong reasoning capabilities",
        "Excellent safety alignment",
        "Multimodal understanding"
      ],
      description: "Anthropic's balanced model offering excellent performance for most use cases."
    },
    {
      name: "Claude 4 Opus",
      company: "Anthropic",
      parameters: "500B",
      contextWindow: "1M tokens",
      categories: ["text", "reasoning", "coding", "multimodal", "enterprise"],
      pricing: "$15/1M tokens",
      releaseDate: "March 2025",
      architecture: "Constitutional AI",
      benchmarks: {
        mmlu: "94.7%",
        humanEval: "92.6%",
        hellaswag: "96.1%"
      },
      features: [
        "State-of-the-art reasoning",
        "Superior safety alignment",
        "Advanced multimodal capabilities",
        "Complex task handling"
      ],
      description: "Anthropic's most capable model with industry-leading safety and reasoning capabilities."
    },
    // DeepSeek Models
    {
      name: "DeepSeek-V3",
      company: "DeepSeek",
      parameters: "671B",
      contextWindow: "128K tokens",
      categories: ["text", "coding", "reasoning", "open-source"],
      pricing: "Open Source",
      releaseDate: "January 2025",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "88.5%",
        humanEval: "90.2%",
        hellaswag: "91.4%"
      },
      features: [
        "Exceptional coding performance",
        "Open source availability",
        "Strong mathematical reasoning",
        "Multilingual capabilities"
      ],
      description: "DeepSeek's latest model with outstanding coding and mathematical capabilities."
    },
    // Amazon Models
    {
      name: "Nova Pro",
      company: "Amazon",
      parameters: "200B",
      contextWindow: "300K tokens",
      categories: ["text", "multimodal", "enterprise"],
      pricing: "$8/1M tokens",
      releaseDate: "February 2025",
      architecture: "AWS-Optimized",
      benchmarks: {
        mmlu: "89.3%",
        humanEval: "85.7%",
        hellaswag: "90.8%"
      },
      features: [
        "AWS ecosystem integration",
        "Enterprise security features",
        "Cost-effective pricing",
        "Multimodal capabilities"
      ],
      description: "Amazon's enterprise-focused model optimized for AWS infrastructure."
    },
    // Microsoft Models
    {
      name: "Phi-4",
      company: "Microsoft",
      parameters: "14B",
      contextWindow: "128K tokens",
      categories: ["text", "coding", "reasoning"],
      pricing: "$1/1M tokens",
      releaseDate: "January 2025",
      architecture: "Small Language Model",
      benchmarks: {
        mmlu: "85.2%",
        humanEval: "82.4%",
        hellaswag: "87.1%"
      },
      features: [
        "Exceptional efficiency",
        "Strong reasoning for size",
        "Fast inference",
        "Cost-effective deployment"
      ],
      description: "Microsoft's small but mighty model that punches above its weight class."
    }
  ];

  // Filter models based on category and search term
  const filteredModels = models.filter(model => {
    const matchesCategory = selectedCategory === 'all' || model.categories.includes(selectedCategory);
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort models
  const sortedModels = [...filteredModels].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'company':
        return a.company.localeCompare(b.company);
      case 'parameters':
        const aParams = parseFloat(a.parameters.replace(/[^\d.]/g, ''));
        const bParams = parseFloat(b.parameters.replace(/[^\d.]/g, ''));
        return bParams - aParams;
      case 'release':
        return new Date(b.releaseDate) - new Date(a.releaseDate);
      default:
        return 0;
    }
  });

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
      title="AI Models 2025: Complete Guide to Latest LLMs & Features"
      description="Comprehensive overview of all major AI models released in 2025, including Meta Llama 4, xAI Grok 4, Mistral models, and more with detailed specifications, pricing, and benchmarks."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                AI Models 2025
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Complete guide to the latest AI models including Meta Llama 4, xAI Grok 4, 
                Mistral 3, and more with detailed specifications, pricing, and benchmarks.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                <span className="bg-white/20 px-4 py-2 rounded-full">📊 {models.length} Models</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">🔄 Updated Daily</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">⚡ Interactive Comparison</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Models
                </label>
                <input
                  type="text"
                  placeholder="Search by name, company, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="lg:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="company">Company</option>
                  <option value="parameters">Parameters</option>
                  <option value="release">Release Date</option>
                </select>
              </div>
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

          {/* Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedModels.map((model, index) => (
              <div
                key={model.name}
                className={`bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  selectedModels.find(m => m.name === model.name) 
                    ? 'ring-2 ring-blue-500 ring-opacity-50' 
                    : ''
                }`}
              >
                {/* Model Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{model.name}</h3>
                    <button
                      onClick={() => toggleModelSelection(model)}
                      className={`w-6 h-6 rounded border-2 border-white flex items-center justify-center ${
                        selectedModels.find(m => m.name === model.name)
                          ? 'bg-white text-blue-500'
                          : 'bg-transparent'
                      }`}
                    >
                      {selectedModels.find(m => m.name === model.name) && '✓'}
                    </button>
                  </div>
                  <p className="text-blue-100">{model.company}</p>
                  <div className="flex gap-2 mt-3">
                    {model.categories.slice(0, 2).map(category => (
                      <span
                        key={category}
                        className="bg-white/20 px-2 py-1 rounded text-xs"
                      >
                        {categories.find(c => c.id === category)?.name || category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Model Details */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {model.description}
                  </p>

                  {/* Key Specs */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Parameters:</span>
                      <span className="font-semibold text-sm">{model.parameters}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Context:</span>
                      <span className="font-semibold text-sm">{model.contextWindow}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Pricing:</span>
                      <span className="font-semibold text-sm">{model.pricing}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Release:</span>
                      <span className="font-semibold text-sm">{model.releaseDate}</span>
                    </div>
                  </div>

                  {/* Benchmarks */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Benchmark Scores</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">MMLU</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: model.benchmarks.mmlu }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{model.benchmarks.mmlu}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">HumanEval</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: model.benchmarks.humanEval }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{model.benchmarks.humanEval}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">HellaSwag</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full"
                              style={{ width: model.benchmarks.hellaswag }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">{model.benchmarks.hellaswag}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Key Features</h4>
                    <ul className="space-y-1">
                      {model.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start">
                          <span className="text-green-500 mr-2 mt-0.5">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">2025 AI Model Landscape</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{models.length}</div>
                <div className="text-gray-600">Total Models</div>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {models.filter(m => m.categories.includes('open-source')).length}
                </div>
                <div className="text-gray-600">Open Source</div>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {models.filter(m => m.categories.includes('multimodal')).length}
                </div>
                <div className="text-gray-600">Multimodal</div>
              </div>
              <div className="p-6 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {new Set(models.map(m => m.company)).size}
                </div>
                <div className="text-gray-600">Companies</div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold mb-6">Key Insights for 2025</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">🚀 Performance Breakthroughs</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Meta's Llama 4 Maverick achieves 10M token context window</li>
                  <li>• Multiple models now exceed 90% on MMLU benchmarks</li>
                  <li>• Mixture-of-Experts architecture becomes standard</li>
                  <li>• Multimodal capabilities are now baseline features</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-600">💰 Cost Efficiency</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Open source models compete with proprietary alternatives</li>
                  <li>• Significant price reductions across all model tiers</li>
                  <li>• Smaller models achieve impressive performance per dollar</li>
                  <li>• Enterprise pricing becomes more accessible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 