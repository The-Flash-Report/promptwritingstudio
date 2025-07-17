import React, { useState, useCallback } from 'react';

const BatchOptimizer = ({ tier = 'free', onUpgrade, className = '' }) => {
  const [prompts, setPrompts] = useState([]);
  const [optimizing, setOptimizing] = useState(false);
  const [results, setResults] = useState([]);
  const [uploadMethod, setUploadMethod] = useState('paste'); // 'paste', 'file'
  const [batchProgress, setBatchProgress] = useState(0);

  // Check if user has access to batch optimization
  const hasAccess = tier === 'pro';

  // Handle file upload
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      let parsedPrompts = [];

      if (file.name.endsWith('.csv')) {
        // Parse CSV
        const lines = content.split('\n').filter(line => line.trim());
        parsedPrompts = lines.map((line, index) => ({
          id: `csv_${index}`,
          content: line.replace(/"/g, '').trim(),
          source: 'CSV Upload'
        }));
      } else if (file.name.endsWith('.txt')) {
        // Parse TXT (each line is a prompt)
        const lines = content.split('\n').filter(line => line.trim());
        parsedPrompts = lines.map((line, index) => ({
          id: `txt_${index}`,
          content: line.trim(),
          source: 'TXT Upload'
        }));
      } else {
        alert('Please upload a CSV or TXT file');
        return;
      }

      setPrompts(parsedPrompts.slice(0, 50)); // Limit to 50 prompts
    };
    reader.readAsText(file);
  }, []);

  // Handle text paste
  const handleTextPaste = useCallback((text) => {
    const lines = text.split('\n').filter(line => line.trim());
    const parsedPrompts = lines.map((line, index) => ({
      id: `paste_${index}`,
      content: line.trim(),
      source: 'Pasted Text'
    }));
    setPrompts(parsedPrompts.slice(0, 50));
  }, []);

  // Optimize all prompts
  const optimizeAll = async () => {
    if (!hasAccess) {
      onUpgrade('pro');
      return;
    }

    setOptimizing(true);
    setBatchProgress(0);
    setResults([]);

    const optimizedResults = [];

    for (let i = 0; i < prompts.length; i++) {
      const prompt = prompts[i];
      
      try {
        // Call optimization API
        const response = await fetch('/api/optimize/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: prompt.content,
            context: 'batch_optimization'
          })
        });

        const analysis = await response.json();
        
        // Apply suggestions to get optimized version
        let optimizedContent = prompt.content;
        if (analysis.suggestions) {
          // Simple optimization application
          analysis.suggestions.forEach(suggestion => {
            if (suggestion.preview) {
              optimizedContent += `\n\n${suggestion.preview}`;
            }
          });
        }

        optimizedResults.push({
          ...prompt,
          original: prompt.content,
          optimized: optimizedContent,
          analysis,
          improvement: analysis.score ? analysis.score - 5 : 2.5 // Estimate improvement
        });

      } catch (error) {
        optimizedResults.push({
          ...prompt,
          original: prompt.content,
          optimized: prompt.content,
          error: 'Optimization failed',
          improvement: 0
        });
      }

      setBatchProgress(Math.round(((i + 1) / prompts.length) * 100));
      
      // Small delay to prevent API rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setResults(optimizedResults);
    setOptimizing(false);

    // Track batch optimization completion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'batch_optimization_complete', {
        prompt_count: prompts.length,
        average_improvement: optimizedResults.reduce((acc, r) => acc + r.improvement, 0) / optimizedResults.length,
        tier: tier
      });
    }
  };

  // Export results
  const exportResults = (format = 'csv') => {
    if (results.length === 0) return;

    let content = '';
    
    if (format === 'csv') {
      content = 'Original,Optimized,Improvement\n';
      content += results.map(r => 
        `"${r.original.replace(/"/g, '""')}","${r.optimized.replace(/"/g, '""')}","${r.improvement}"`
      ).join('\n');
    } else {
      // JSON format
      content = JSON.stringify(results, null, 2);
    }

    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch_optimization_results.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!hasAccess) {
    return (
      <div className={`batch-optimizer-locked ${className}`}>
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-dashed border-purple-200 rounded-lg p-8 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Batch Optimization</h3>
          <p className="text-gray-600 mb-4">
            Upload CSV/TXT files with 50+ prompts and optimize them all at once
          </p>
          
          <div className="bg-white border border-purple-200 rounded-lg p-4 mb-4 text-left max-w-md mx-auto">
            <h4 className="font-medium mb-2">What you get:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Upload CSV/TXT files with 50+ prompts</li>
              <li>• Optimize entire prompt libraries at once</li>
              <li>• Export optimized results</li>
              <li>• Save hours of manual optimization</li>
              <li>• Perfect for teams and agencies</li>
            </ul>
          </div>

          <div className="bg-purple-100 border border-purple-200 rounded-lg p-3 mb-4 text-sm">
            <strong>ROI Example:</strong> Optimize 50 prompts in 10 minutes vs 5 hours manually = 
            <span className="text-purple-700 font-bold"> $500+ value per batch</span>
          </div>

          <button
            onClick={() => onUpgrade('pro')}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Upgrade to Pro - $47/month
          </button>
          
          <p className="text-xs text-gray-500 mt-2">
            Includes unlimited optimizations + all premium features
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`batch-optimizer ${className}`}>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📦</span>
            <div>
              <h3 className="text-lg font-semibold">Batch Optimization</h3>
              <p className="text-purple-100 text-sm">Optimize up to 50 prompts at once</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Upload Methods */}
          <div className="mb-6">
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setUploadMethod('paste')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  uploadMethod === 'paste'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Paste Text
              </button>
              <button
                onClick={() => setUploadMethod('file')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  uploadMethod === 'file'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Upload File
              </button>
            </div>

            {uploadMethod === 'paste' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste your prompts (one per line):
                </label>
                <textarea
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                  placeholder="Write a blog post about AI&#10;Create a marketing email for our product&#10;Generate social media content&#10;..."
                  onChange={(e) => handleTextPaste(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload CSV or TXT file:
                </label>
                <input
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleFileUpload}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  CSV: Each row should contain one prompt. TXT: One prompt per line.
                </p>
              </div>
            )}
          </div>

          {/* Prompt Preview */}
          {prompts.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Loaded Prompts ({prompts.length})
              </h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-40 overflow-y-auto">
                {prompts.slice(0, 5).map((prompt, index) => (
                  <div key={prompt.id} className="text-sm text-gray-600 mb-1">
                    {index + 1}. {prompt.content.substring(0, 80)}
                    {prompt.content.length > 80 && '...'}
                  </div>
                ))}
                {prompts.length > 5 && (
                  <div className="text-sm text-gray-500 italic">
                    ... and {prompts.length - 5} more prompts
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Optimization Controls */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={optimizeAll}
                disabled={prompts.length === 0 || optimizing}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {optimizing ? 'Optimizing...' : `Optimize All (${prompts.length})`}
              </button>
              {optimizing && (
                <div className="mt-2">
                  <div className="w-64 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${batchProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{batchProgress}% complete</p>
                </div>
              )}
            </div>

            {results.length > 0 && (
              <div className="flex space-x-2">
                <button
                  onClick={() => exportResults('csv')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Export CSV
                </button>
                <button
                  onClick={() => exportResults('json')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Export JSON
                </button>
              </div>
            )}
          </div>

          {/* Results */}
          {results.length > 0 && (
            <BatchResults results={results} />
          )}
        </div>
      </div>
    </div>
  );
};

// Batch Results Component
const BatchResults = ({ results }) => {
  const [selectedResult, setSelectedResult] = useState(null);
  
  const averageImprovement = results.reduce((acc, r) => acc + r.improvement, 0) / results.length;
  const totalTimeSaved = results.length * 3; // Estimate 3 minutes saved per prompt

  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">Optimization Complete! 🎉</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-green-700 font-medium">Prompts Optimized</div>
            <div className="text-green-600 text-lg font-bold">{results.length}</div>
          </div>
          <div>
            <div className="text-green-700 font-medium">Avg Improvement</div>
            <div className="text-green-600 text-lg font-bold">+{averageImprovement.toFixed(1)} pts</div>
          </div>
          <div>
            <div className="text-green-700 font-medium">Time Saved</div>
            <div className="text-green-600 text-lg font-bold">{totalTimeSaved} min</div>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-medium">#</th>
              <th className="text-left p-3 font-medium">Original Preview</th>
              <th className="text-left p-3 font-medium">Improvement</th>
              <th className="text-left p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={result.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <div className="truncate max-w-xs">
                    {result.original.substring(0, 60)}...
                  </div>
                </td>
                <td className="p-3">
                  <span className={`font-medium ${
                    result.improvement > 2 ? 'text-green-600' : 
                    result.improvement > 1 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {result.error ? 'Error' : `+${result.improvement.toFixed(1)} pts`}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedResult(result)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <ResultDetailModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}
    </div>
  );
};

// Result Detail Modal
const ResultDetailModal = ({ result, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">Optimization Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-medium mb-2">Original Prompt</h4>
            <div className="bg-gray-50 p-4 rounded-lg text-sm border h-40 overflow-auto">
              {result.original}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Optimized Prompt</h4>
            <div className="bg-blue-50 p-4 rounded-lg text-sm border h-40 overflow-auto">
              {result.optimized}
            </div>
          </div>
        </div>

        {result.analysis && (
          <div className="mb-6">
            <h4 className="font-medium mb-2">Analysis</h4>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <div className="text-green-700 font-medium">Overall Score</div>
                  <div className="text-green-600 text-lg font-bold">{result.analysis.score}/10</div>
                </div>
                <div>
                  <div className="text-green-700 font-medium">Improvement</div>
                  <div className="text-green-600 text-lg font-bold">+{result.improvement.toFixed(1)}</div>
                </div>
                <div>
                  <div className="text-green-700 font-medium">Suggestions Applied</div>
                  <div className="text-green-600 text-lg font-bold">
                    {result.analysis.suggestions?.length || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

export default BatchOptimizer; 