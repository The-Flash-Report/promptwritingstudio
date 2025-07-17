export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, industry, useCase } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    if (!perplexityApiKey) {
      throw new Error('Perplexity API key not configured');
    }

    // Create research query for Perplexity
    const researchQuery = `
What are the current best practices for writing AI prompts ${industry ? `in the ${industry} industry` : ''}${useCase ? ` for ${useCase}` : ''}?

Specifically, provide insights on:
1. Current prompt engineering techniques that improve results
2. Common mistakes to avoid
3. Industry-specific considerations
4. Examples of effective prompt structures
5. Latest trends in AI prompt optimization

Focus on actionable advice that can be applied immediately to improve prompt effectiveness.
`;

    // Call Perplexity API
    const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${perplexityApiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [{
          role: 'user',
          content: researchQuery
        }],
        max_tokens: 1000,
        temperature: 0.3,
        return_citations: true
      })
    });

    if (!perplexityResponse.ok) {
      throw new Error(`Perplexity API error: ${perplexityResponse.status}`);
    }

    const perplexityData = await perplexityResponse.json();
    const researchContent = perplexityData.choices[0].message.content;

    // Parse research insights
    const insights = parseResearchContent(researchContent);

    // Add metadata
    const response = {
      insights: insights.insights,
      bestPractices: insights.bestPractices,
      examples: insights.examples,
      sources: perplexityData.citations || [],
      industry: industry || 'general',
      useCase: useCase || 'general',
      timestamp: new Date().toISOString()
    };

    // Log for analytics
    console.log('Research insights requested:', {
      industry: industry || 'general',
      useCase: useCase || 'general',
      timestamp: response.timestamp
    });

    res.status(200).json(response);

  } catch (error) {
    console.error('Research insights error:', error);
    
    // Return graceful fallback with general best practices
    res.status(500).json({
      error: 'Research temporarily unavailable',
      fallback: {
        insights: [
          {
            source: 'General Best Practices',
            recommendation: 'Use specific, actionable language in your prompts'
          },
          {
            source: 'Current Trends',
            recommendation: 'Include context about your target audience and desired outcome'
          },
          {
            source: 'Prompt Engineering',
            recommendation: 'Break complex tasks into step-by-step instructions'
          }
        ],
        bestPractices: [
          'Be specific about the desired format and length of the response',
          'Provide examples when possible to guide the AI',
          'Use clear, unambiguous language',
          'Include relevant context and background information'
        ],
        examples: [
          'Instead of "Write content" → "Write a 500-word blog post about sustainable fashion for millennials"',
          'Instead of "Help me" → "Help me create a social media strategy for a local bakery targeting busy parents"'
        ]
      }
    });
  }
}

// Helper function to parse research content into structured insights
function parseResearchContent(content) {
  const insights = [];
  const bestPractices = [];
  const examples = [];

  // Basic parsing - in production, you might use more sophisticated NLP
  const lines = content.split('\n').filter(line => line.trim());
  
  lines.forEach(line => {
    const cleanLine = line.trim().replace(/^\d+\.\s*/, '').replace(/^[-*]\s*/, '');
    
    if (cleanLine.length < 20) return; // Skip short lines
    
    // Categorize content based on keywords
    if (line.toLowerCase().includes('best practice') || 
        line.toLowerCase().includes('should') || 
        line.toLowerCase().includes('recommend')) {
      bestPractices.push(cleanLine);
    } else if (line.toLowerCase().includes('example') || 
               line.includes('→') || 
               line.includes('instead of')) {
      examples.push(cleanLine);
    } else if (cleanLine.length > 30) {
      insights.push({
        source: 'Current Research',
        recommendation: cleanLine
      });
    }
  });

  // Ensure we have at least some content
  if (insights.length === 0) {
    insights.push({
      source: 'General Guidance',
      recommendation: 'Focus on clarity, specificity, and providing adequate context in your prompts'
    });
  }

  if (bestPractices.length === 0) {
    bestPractices.push('Use specific language and clear instructions');
  }

  if (examples.length === 0) {
    examples.push('Add concrete examples to illustrate your desired outcome');
  }

  return {
    insights: insights.slice(0, 5), // Limit to top 5
    bestPractices: bestPractices.slice(0, 4), // Limit to top 4
    examples: examples.slice(0, 3) // Limit to top 3
  };
} 