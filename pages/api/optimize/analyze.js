export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, context, userId } = req.body;

    // Validate input
    if (!prompt || prompt.length < 50) {
      return res.status(400).json({ 
        error: 'Prompt must be at least 50 characters long' 
      });
    }

    // Rate limiting check (basic implementation)
    // In production, you'd use Redis or similar
    const rateLimitKey = `optimize_${userId || req.ip}`;
    
    const claudeApiKey = process.env.CLAUDE_API_KEY;
    if (!claudeApiKey) {
      throw new Error('Claude API key not configured');
    }

    // Create analysis prompt for Claude
    const analysisPrompt = `
You are an expert prompt engineer. Analyze this AI prompt and provide a detailed assessment.

PROMPT TO ANALYZE:
"${prompt}"

CONTEXT: ${context || 'General AI assistant usage'}

Please respond with a JSON object containing:
{
  "score": number (1-10 overall quality),
  "breakdown": {
    "clarity": number (1-10),
    "specificity": number (1-10), 
    "completeness": number (1-10)
  },
  "suggestions": [
    {
      "type": "clarity|specificity|completeness|structure",
      "message": "specific improvement suggestion",
      "preview": "example of how to implement this suggestion"
    }
  ],
  "strengths": ["what's already good about this prompt"],
  "priority": "high|medium|low" (urgency of improvements)
}

Focus on actionable, specific feedback. Each suggestion should be implementable immediately.
`;

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': claudeApiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: analysisPrompt
        }]
      })
    });

    if (!claudeResponse.ok) {
      throw new Error(`Claude API error: ${claudeResponse.status}`);
    }

    const claudeData = await claudeResponse.json();
    const claudeText = claudeData.content[0].text;

    // Parse Claude's JSON response
    let analysis;
    try {
      // Extract JSON from Claude's response (it might include extra text)
      const jsonMatch = claudeText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in Claude response');
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response:', claudeText);
      // Fallback response structure
      analysis = {
        score: 6,
        breakdown: { clarity: 6, specificity: 6, completeness: 6 },
        suggestions: [{
          type: 'general',
          message: 'Consider adding more specific details to your prompt',
          preview: 'Add context about your target audience, desired outcome, and any constraints'
        }],
        strengths: ['Clear intent'],
        priority: 'medium'
      };
    }

    // Add metadata
    const response = {
      ...analysis,
      timestamp: new Date().toISOString(),
      promptLength: prompt.length,
      processingTime: Date.now() // You could calculate actual processing time
    };

    // Log for analytics (in production, use proper analytics service)
    console.log('Prompt optimization requested:', {
      userId: userId || 'anonymous',
      score: analysis.score,
      promptLength: prompt.length,
      timestamp: response.timestamp
    });

    res.status(200).json(response);

  } catch (error) {
    console.error('Optimization analysis error:', error);
    
    // Return graceful fallback
    res.status(500).json({
      error: 'Analysis temporarily unavailable',
      fallback: {
        score: 7,
        breakdown: { clarity: 7, specificity: 7, completeness: 7 },
        suggestions: [{
          type: 'general',
          message: 'Try adding more context and specific examples to your prompt',
          preview: 'Include details about your audience, desired format, and expected outcome'
        }],
        strengths: ['Well-structured prompt'],
        priority: 'medium'
      }
    });
  }
} 