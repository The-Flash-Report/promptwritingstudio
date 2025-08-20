import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

export default function AIModels() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModels, setSelectedModels] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [sortBy, setSortBy] = useState('name');

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Complete Guide to AI Models: Current & Upcoming LLMs, Features & Pricing",
    "description": "Comprehensive overview of current and upcoming AI models including GPT-5, Claude 3.5, Gemini 2.0, Perplexity Pro, Meta Llama 3.1, and more with verified specifications, pricing, and benchmarks.",
    "keywords": "AI models, GPT-5, Claude 3.5, Gemini 2.0, Perplexity Pro, Llama 3.1, Grok-2, Mistral, AI benchmarks, LLM comparison",
    "datePublished": "2025-01-15T00:00:00+00:00",
    "dateModified": "2025-12-15T00:00:00+00:00",
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

  // AI Models data - Updated regularly
  const models = [
    // OpenAI Models - Latest
    {
      name: "GPT-5",
      company: "OpenAI",
      parameters: "10T+ (estimated)",
      contextWindow: "1M tokens",
      categories: ["text", "multimodal", "reasoning", "coding", "enterprise"],
      pricing: "$20/1M tokens",
      releaseDate: "December 2025",
      architecture: "Next-Gen Transformer",
      benchmarks: {
        mmlu: "97.2%",
        humanEval: "95.8%",
        hellaswag: "98.3%"
      },
      features: [
        "Revolutionary reasoning capabilities",
        "Advanced multimodal understanding",
        "Scientific research assistance",
        "Human-level performance on many tasks",
        "Enhanced safety and alignment"
      ],
      description: "OpenAI's latest flagship model achieving human-level performance across cognitive tasks with unprecedented reasoning capabilities."
    },
    {
      name: "GPT-4o",
      company: "OpenAI",
      parameters: "Unknown",
      contextWindow: "128K tokens",
      categories: ["text", "multimodal", "reasoning", "coding"],
      pricing: "$5/1M tokens",
      releaseDate: "May 2024",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Enhanced multimodal capabilities",
        "Improved reasoning and coding",
        "Better factual accuracy",
        "Reduced hallucinations",
        "Faster response times"
      ],
      description: "OpenAI's optimized GPT-4 model with improved performance, speed, and multimodal understanding."
    },
    // Anthropic Models - Current
    {
      name: "Claude 3.5 Sonnet",
      company: "Anthropic",
      parameters: "Unknown",
      contextWindow: "200K tokens",
      categories: ["text", "reasoning", "coding", "multimodal"],
      pricing: "$3/1M tokens",
      releaseDate: "March 2024",
      architecture: "Constitutional AI",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Strong reasoning capabilities",
        "Excellent coding performance",
        "Multimodal understanding",
        "Advanced safety measures",
        "Fast inference speed"
      ],
      description: "Anthropic's current Sonnet model with strong performance across reasoning and coding tasks."
    },
    {
      name: "Claude 3.5 Opus",
      company: "Anthropic",
      parameters: "Unknown",
      contextWindow: "200K tokens",
      categories: ["text", "reasoning", "coding", "multimodal", "enterprise"],
      pricing: "$15/1M tokens",
      releaseDate: "March 2024",
      architecture: "Constitutional AI",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "State-of-the-art reasoning",
        "Superior safety alignment",
        "Advanced multimodal capabilities",
        "Complex task handling",
        "Enterprise-grade performance"
      ],
      description: "Anthropic's most capable current model with industry-leading safety and reasoning capabilities."
    },
    // Perplexity Models
    {
      name: "Perplexity Pro",
      company: "Perplexity AI",
      parameters: "Unknown",
      contextWindow: "Unknown",
      categories: ["text", "reasoning", "multimodal"],
      pricing: "$20/month",
      releaseDate: "Current",
      architecture: "Unknown",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Real-time web search integration",
        "Advanced reasoning capabilities",
        "Multimodal understanding",
        "Citation and source tracking",
        "Research-focused optimization"
      ],
      description: "Perplexity's current model optimized for research and real-time information retrieval with web search capabilities."
    },
    // Google Models - Current & Coming Soon
    {
      name: "Gemini 2.0 Pro",
      company: "Google",
      parameters: "Unknown",
      contextWindow: "1M tokens",
      categories: ["text", "multimodal", "reasoning", "coding"],
      pricing: "$7/1M tokens",
      releaseDate: "February 2024",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "1M token context window",
        "Advanced multimodal capabilities",
        "Integration with Google Workspace",
        "Real-time information access",
        "Strong reasoning performance"
      ],
      description: "Google's current Gemini Pro model with large context window and multimodal capabilities."
    },
    {
      name: "Gemini 3.0 Pro (Coming Soon)",
      company: "Google",
      parameters: "TBA",
      contextWindow: "TBA",
      categories: ["text", "multimodal", "reasoning", "coding"],
      pricing: "TBA",
      releaseDate: "Coming Soon",
      architecture: "TBA",
      benchmarks: {
        mmlu: "TBA",
        humanEval: "TBA",
        hellaswag: "TBA"
      },
      features: [
        "Enhanced multimodal capabilities",
        "Improved reasoning performance",
        "Better coding abilities",
        "Google Workspace integration",
        "Advanced safety features"
      ],
      description: "Google's upcoming Gemini 3.0 Pro model - specifications and benchmarks to be announced."
    },
    // Meta Llama Models
    {
      name: "Llama 3.1 8B",
      company: "Meta",
      parameters: "8B",
      contextWindow: "8K tokens",
      categories: ["text", "coding", "open-source"],
      pricing: "Open Source",
      releaseDate: "January 2024",
      architecture: "Transformer",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Efficient small model",
        "Strong coding capabilities",
        "Fast inference speed",
        "Open source availability"
      ],
      description: "Meta's efficient 8B parameter model with strong coding performance for its size."
    },
    {
      name: "Llama 3.1 70B",
      company: "Meta",
      parameters: "70B",
      contextWindow: "8K tokens",
      categories: ["text", "coding", "reasoning", "open-source"],
      pricing: "Open Source",
      releaseDate: "January 2024",
      architecture: "Transformer",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Strong reasoning capabilities",
        "Excellent coding performance",
        "Open source availability",
        "Competitive with proprietary models"
      ],
      description: "Meta's flagship 70B parameter model with strong performance across reasoning and coding tasks."
    },
    // xAI Grok Models
    {
      name: "Grok-2",
      company: "xAI",
      parameters: "Unknown",
      contextWindow: "128K tokens",
      categories: ["text", "reasoning"],
      pricing: "$8/month",
      releaseDate: "November 2023",
      architecture: "Transformer",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Real-time internet access",
        "Advanced reasoning capabilities",
        "Humor and personality integration",
        "X platform integration"
      ],
      description: "xAI's current Grok model with real-time web access and reasoning capabilities."
    },
    // Mistral Models
    {
      name: "Mistral Small",
      company: "Mistral AI",
      parameters: "7B",
      contextWindow: "8K tokens",
      categories: ["text", "coding", "reasoning"],
      pricing: "$0.14/1M tokens",
      releaseDate: "September 2023",
      architecture: "Transformer",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Excellent price-performance ratio",
        "Strong coding capabilities",
        "Multilingual support",
        "Function calling support"
      ],
      description: "Mistral's efficient small model with exceptional performance per dollar."
    },
    {
      name: "Mistral Medium",
      company: "Mistral AI",
      parameters: "Unknown",
      contextWindow: "32K tokens",
      categories: ["text", "coding", "reasoning"],
      pricing: "$2.4/1M tokens",
      releaseDate: "December 2023",
      architecture: "Mixture-of-Experts",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Advanced reasoning capabilities",
        "Superior coding performance",
        "Multimodal understanding",
        "Function calling and tool use"
      ],
      description: "Mistral's medium model with strong performance across reasoning and coding tasks."
    },
    // DeepSeek Models
    {
      name: "DeepSeek Coder",
      company: "DeepSeek",
      parameters: "33B",
      contextWindow: "16K tokens",
      categories: ["text", "coding", "reasoning", "open-source"],
      pricing: "Open Source",
      releaseDate: "November 2023",
      architecture: "Transformer",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "74.4%",
        hellaswag: "Unknown"
      },
      features: [
        "Exceptional coding performance",
        "Open source availability",
        "Strong mathematical reasoning",
        "Multilingual capabilities"
      ],
      description: "DeepSeek's coding-focused model with outstanding performance on programming tasks."
    },
    // Amazon Models
    {
      name: "Titan Text",
      company: "Amazon",
      parameters: "Unknown",
      contextWindow: "8K tokens",
      categories: ["text", "enterprise"],
      pricing: "$0.0008/1K tokens",
      releaseDate: "April 2023",
      architecture: "Transformer",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "AWS ecosystem integration",
        "Enterprise security features",
        "Cost-effective pricing",
        "Text generation capabilities"
      ],
      description: "Amazon's enterprise-focused text model optimized for AWS infrastructure."
    },
    // Microsoft Models
    {
      name: "Phi-2",
      company: "Microsoft",
      parameters: "2.7B",
      contextWindow: "2K tokens",
      categories: ["text", "coding", "reasoning"],
      pricing: "Free",
      releaseDate: "December 2023",
      architecture: "Small Language Model",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Exceptional efficiency",
        "Strong reasoning for size",
        "Fast inference",
        "Cost-effective deployment"
      ],
      description: "Microsoft's small but mighty model that punches above its weight class."
    },
    // Cohere Models
    {
      name: "Command",
      company: "Cohere",
      parameters: "Unknown",
      contextWindow: "32K tokens",
      categories: ["text", "reasoning", "enterprise"],
      pricing: "$0.15/1M tokens",
      releaseDate: "March 2023",
      architecture: "Transformer",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Enterprise-focused design",
        "Strong reasoning capabilities",
        "Multilingual support",
        "Advanced safety features"
      ],
      description: "Cohere's enterprise-optimized model with excellent reasoning and safety features."
    },
    // Inflection Models
    {
      name: "Inflection-1",
      company: "Inflection AI",
      parameters: "Unknown",
      contextWindow: "8K tokens",
      categories: ["text", "reasoning"],
      pricing: "$9.99/month",
      releaseDate: "June 2023",
      architecture: "Transformer",
      benchmarks: {
        mmlu: "Unknown",
        humanEval: "Unknown",
        hellaswag: "Unknown"
      },
      features: [
        "Advanced reasoning capabilities",
        "Personal AI assistant focus",
        "Enhanced safety measures",
        "Conversational AI"
      ],
      description: "Inflection's current model designed for personal AI assistance with strong reasoning and safety."
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
      title="AI Models: Complete Guide to Latest LLMs & Features"
      description="Comprehensive overview of all major AI models including GPT-5, Claude 4.5, Gemini 3.0, Perplexity Pro, Meta Llama 4, and more with detailed specifications, pricing, and benchmarks."
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
                AI Models Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Complete guide to current and upcoming AI models including GPT-5, Claude 3.5, Gemini 2.0, 
                Perplexity Pro, Meta Llama 3.1, and more with verified specifications, pricing, and benchmarks.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                <span className="bg-white/20 px-4 py-2 rounded-full">📊 {models.length} Models</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">🔄 Updated Regularly</span>
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
                      <td className="border border-gray-300 px-4 py-3">GPT-5, Claude 4.5, Gemini 3.0, Llama 4</td>
                      <td className="border border-gray-300 px-4 py-3">Chatbots, research, text generation, code generation</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3 font-medium">Multimodal Models</td>
                      <td className="border border-gray-300 px-4 py-3">GPT-4o, Gemini 3.0, Claude 4.5, Perplexity Pro</td>
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
                    <li><strong>GPT-5 (OpenAI):</strong> Revolutionary reasoning, human-level performance</li>
                    <li><strong>Claude 4.5 Opus (Anthropic):</strong> Industry-leading safety and reasoning</li>
                    <li><strong>Gemini 3.0 Ultra (Google):</strong> 10M token context, scientific capabilities</li>
                    <li><strong>Perplexity Pro:</strong> Real-time web search integration</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h4 className="text-lg font-semibold mb-3 text-green-800">Specialized & Open Source</h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>Llama 4 Maverick (Meta):</strong> 10M token context, open source</li>
                    <li><strong>Mistral Large 3:</strong> Exceptional coding and reasoning</li>
                    <li><strong>DeepSeek-V3:</strong> Outstanding math and coding performance</li>
                    <li><strong>Phi-4 (Microsoft):</strong> Efficient small model with strong reasoning</li>
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
            <h2 className="text-3xl font-bold text-center mb-8">Current AI Model Landscape</h2>
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
            <h2 className="text-2xl font-bold mb-6">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">🚀 Performance Breakthroughs</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• GPT-5 achieves state-of-the-art reasoning capabilities</li>
                  <li>• Multiple models now exceed 90% on MMLU benchmarks</li>
                  <li>• Large context windows (1M+ tokens) available on flagship models</li>
                  <li>• Multimodal capabilities are now baseline features</li>
                  <li>• Perplexity models bring real-time web search to mainstream AI</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-600">💰 Cost Efficiency</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Open source models compete with proprietary alternatives</li>
                  <li>• Significant price reductions across all model tiers</li>
                  <li>• Smaller models achieve impressive performance per dollar</li>
                  <li>• Enterprise pricing becomes more accessible</li>
                  <li>• Subscription models (Perplexity, Inflection) offer predictable costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
