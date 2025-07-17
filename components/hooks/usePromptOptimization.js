import { useState, useEffect, useCallback, useRef } from 'react';

// Custom hook for real-time prompt optimization
export const usePromptOptimization = (prompt, options = {}) => {
  const {
    debounceMs = 2000,
    minLength = 50,
    enableResearch = false,
    context,
    industry,
    useCase,
    userId
  } = options;

  const [analysis, setAnalysis] = useState(null);
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usageCount, setUsageCount] = useState(0);
  
  // Cache for storing results
  const cacheRef = useRef(new Map());
  const timeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  // Debounced prompt value
  const [debouncedPrompt, setDebouncedPrompt] = useState('');

  // Debounce the prompt input
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedPrompt(prompt);
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [prompt, debounceMs]);

  // Analysis function
  const analyzePrompt = useCallback(async (promptToAnalyze) => {
    if (!promptToAnalyze || promptToAnalyze.length < minLength) {
      setAnalysis(null);
      setResearch(null);
      setError(null);
      return;
    }

    // Check cache first
    const cacheKey = `${promptToAnalyze}_${context || ''}_${industry || ''}_${useCase || ''}`;
    const cached = cacheRef.current.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) { // 24 hour cache
      setAnalysis(cached.analysis);
      setResearch(cached.research);
      return;
    }

    setLoading(true);
    setError(null);

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      // Parallel requests for analysis and research
      const requests = [
        fetch('/api/optimize/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: promptToAnalyze,
            context,
            userId
          }),
          signal: abortControllerRef.current.signal
        })
      ];

      if (enableResearch) {
        requests.push(
          fetch('/api/optimize/research', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: promptToAnalyze,
              industry,
              useCase
            }),
            signal: abortControllerRef.current.signal
          })
        );
      }

      const responses = await Promise.allSettled(requests);
      
      // Handle analysis response
      const analysisResponse = responses[0];
      let analysisData = null;
      
      if (analysisResponse.status === 'fulfilled' && analysisResponse.value.ok) {
        analysisData = await analysisResponse.value.json();
        
        // Handle fallback response format
        if (analysisData.fallback) {
          analysisData = analysisData.fallback;
          console.log('Using fallback analysis response');
        }
        
        setAnalysis(analysisData);
        setUsageCount(prev => prev + 1);
      } else {
        throw new Error('Analysis request failed');
      }

      // Handle research response if enabled
      let researchData = null;
      if (enableResearch && responses[1]) {
        const researchResponse = responses[1];
        if (researchResponse.status === 'fulfilled' && researchResponse.value.ok) {
          researchData = await researchResponse.value.json();
          
          // Handle fallback response format
          if (researchData.fallback) {
            researchData = researchData.fallback;
            console.log('Using fallback research response');
          }
          
          setResearch(researchData);
        }
      }

      // Cache the results
      cacheRef.current.set(cacheKey, {
        analysis: analysisData,
        research: researchData,
        timestamp: Date.now()
      });

      // Cleanup old cache entries (keep only last 50)
      if (cacheRef.current.size > 50) {
        const entries = Array.from(cacheRef.current.entries());
        const sortedEntries = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
        cacheRef.current.clear();
        sortedEntries.slice(0, 50).forEach(([key, value]) => {
          cacheRef.current.set(key, value);
        });
      }

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Optimization error:', err);
        setError('Analysis temporarily unavailable. Please try again.');
        
        // Set basic fallback analysis
        setAnalysis({
          score: 7,
          breakdown: { clarity: 7, specificity: 7, completeness: 7 },
          suggestions: [{
            type: 'general',
            message: 'Consider adding more specific context to your prompt',
            preview: 'Include details about your target audience and desired outcome'
          }],
          strengths: ['Clear structure'],
          priority: 'medium'
        });
      }
    } finally {
      setLoading(false);
    }
  }, [minLength, context, industry, useCase, userId, enableResearch]);

  // Trigger analysis when debounced prompt changes
  useEffect(() => {
    if (debouncedPrompt) {
      analyzePrompt(debouncedPrompt);
    }
  }, [debouncedPrompt, analyzePrompt]);

  // Manual refetch function
  const refetch = useCallback(() => {
    if (prompt) {
      analyzePrompt(prompt);
    }
  }, [prompt, analyzePrompt]);

  // Apply suggestion function
  const applySuggestion = useCallback((suggestion, currentPrompt) => {
    if (!suggestion.preview) return currentPrompt;
    
    // Simple implementation - in production, you might use more sophisticated prompt modification
    const improvedPrompt = `${currentPrompt}\n\n${suggestion.preview}`;
    return improvedPrompt;
  }, []);

  // Apply all suggestions function
  const applyAllSuggestions = useCallback((currentPrompt) => {
    if (!analysis?.suggestions) return currentPrompt;
    
    let improvedPrompt = currentPrompt;
    
    // Apply suggestions based on priority
    const prioritizedSuggestions = analysis.suggestions.sort((a, b) => {
      const priority = { high: 3, medium: 2, low: 1 };
      return (priority[b.priority] || 2) - (priority[a.priority] || 2);
    });
    
    prioritizedSuggestions.forEach(suggestion => {
      if (suggestion.preview) {
        improvedPrompt = applySuggestion(suggestion, improvedPrompt);
      }
    });
    
    return improvedPrompt;
  }, [analysis, applySuggestion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    analysis,
    research,
    loading,
    error,
    usageCount,
    refetch,
    applySuggestion,
    applyAllSuggestions,
    isAnalyzing: loading && debouncedPrompt.length >= minLength
  };
};

// Hook for usage limits based on user tier
export const useUsageLimits = (tier = 'free', userId = null) => {
  const [usageCount, setUsageCount] = useState(0);
  const [resetDate, setResetDate] = useState(new Date());

  const limits = {
    free: { optimizations: 3, features: ['basic-scoring'] },
    premium: { optimizations: 25, features: ['basic-scoring', 'research-insights'] },
    pro: { optimizations: Infinity, features: ['all'] }
  };

  const currentLimit = limits[tier] || limits.free;

  useEffect(() => {
    // In production, you'd fetch usage from your database
    const storedUsage = localStorage.getItem(`usage_${userId || 'anonymous'}`);
    const storedReset = localStorage.getItem(`usage_reset_${userId || 'anonymous'}`);
    
    if (storedUsage && storedReset) {
      const resetTime = new Date(storedReset);
      if (Date.now() < resetTime.getTime()) {
        setUsageCount(parseInt(storedUsage, 10));
        setResetDate(resetTime);
      } else {
        // Reset usage if period expired
        setUsageCount(0);
        const newResetDate = new Date();
        newResetDate.setMonth(newResetDate.getMonth() + 1);
        setResetDate(newResetDate);
        localStorage.setItem(`usage_reset_${userId || 'anonymous'}`, newResetDate.toISOString());
      }
    }
  }, [userId]);

  const incrementUsage = useCallback(() => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(`usage_${userId || 'anonymous'}`, newCount.toString());
  }, [usageCount, userId]);

  const canUse = usageCount < currentLimit.optimizations;
  const remaining = Math.max(0, currentLimit.optimizations - usageCount);

  return {
    usageCount,
    limit: currentLimit.optimizations,
    remaining,
    canUse,
    tier,
    features: currentLimit.features,
    resetDate,
    incrementUsage
  };
}; 