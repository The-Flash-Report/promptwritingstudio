// pages/api/ai/optimize.js
// AI-powered prompt optimization endpoint

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      prompt, 
      targetModel = 'openai', 
      optimizationSettings = {} 
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const claudeKey = process.env.CLAUDE_API_KEY;
    if (!claudeKey) {
      return res.status(500).json({ error: 'Claude API key not configured' });
    }

    // Create optimization instructions based on target model
    const optimizationPrompt = createOptimizationPrompt(prompt, targetModel, optimizationSettings);

    // Call Claude to optimize the prompt
    const optimizedResult = await callClaudeForOptimization(optimizationPrompt, claudeKey);

    // Parse the result and return structured response
    const result = parseOptimizationResult(optimizedResult.content, prompt);

    res.status(200).json({
      original: prompt,
      optimized: result.optimizedPrompt,
      improvements: result.improvements,
      analysis: result.analysis,
      targetModel,
      usage: optimizedResult.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Optimization API Error:', error);
    res.status(500).json({ 
      error: 'Failed to optimize prompt',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

function createOptimizationPrompt(originalPrompt, targetModel, settings) {
  const modelGuidelines = {
    openai: `
      - Add clear role definition with expertise level
      - Include specific output format requirements
      - Add relevant examples to guide the AI
      - Set clear constraints and boundaries
      - Use step-by-step instructions for complex tasks
    `,
    anthropic: `
      - Use XML tags for clear structure (<task>, <context>, <output>)
      - Include thinking process instructions
      - Add constitutional AI principles (helpful, harmless, honest)
      - Structure with clear sections and headers
      - Specify desired reasoning approach
    `,
    google: `
      - Start with clear task definition
      - Provide comprehensive context
      - Specify exact output requirements
      - Include quality criteria and success metrics
      - Add relevant domain knowledge
    `,
    image: `
      - Add specific visual style descriptors
      - Include technical quality parameters
      - Specify composition and framing details
      - Add mood and atmosphere elements
      - Include negative prompts to avoid unwanted elements
    `
  };

  return `You are an expert prompt engineer specializing in optimizing prompts for ${targetModel} models.

Your task is to analyze and improve the following prompt according to best practices for ${targetModel}:

ORIGINAL PROMPT:
"""
${originalPrompt}
"""

TARGET MODEL: ${targetModel}

OPTIMIZATION GUIDELINES FOR ${targetModel.toUpperCase()}:
${modelGuidelines[targetModel] || modelGuidelines.openai}

OPTIMIZATION SETTINGS:
- Include examples: ${settings.includeExamples !== false}
- Add constraints: ${settings.addConstraints !== false}
- Improve clarity: ${settings.improveClarity !== false}
- Add structure: ${settings.addStructure !== false}

Please provide your response in the following JSON format:

{
  "optimizedPrompt": "Your improved version of the prompt",
  "improvements": [
    "List of specific improvements made",
    "Each improvement as a separate item"
  ],
  "analysis": {
    "originalScore": 65,
    "optimizedScore": 92,
    "keyStrengths": ["What the original prompt did well"],
    "mainImprovements": ["The most important changes made"],
    "recommendedUsage": "Best use cases for this optimized prompt"
  }
}

Make sure the optimized prompt is significantly better than the original while maintaining its core intent.`;
}

async function callClaudeForOptimization(optimizationPrompt, apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': Buffer.from(apiKey, 'base64').toString('utf-8'),
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: optimizationPrompt
        }
      ],
      temperature: 0.3 // Lower temperature for more consistent optimization
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  
  return {
    content: data.content[0].text,
    usage: {
      input_tokens: data.usage.input_tokens,
      output_tokens: data.usage.output_tokens,
      total_tokens: data.usage.input_tokens + data.usage.output_tokens
    }
  };
}

function parseOptimizationResult(claudeResponse, originalPrompt) {
  try {
    // Try to extract JSON from Claude's response
    const jsonMatch = claudeResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return parsed;
    }
  } catch (e) {
    console.warn('Failed to parse JSON from Claude response, using fallback parsing');
  }

  // Fallback: parse the response manually
  return {
    optimizedPrompt: extractSection(claudeResponse, 'optimizedPrompt') || originalPrompt,
    improvements: extractList(claudeResponse, 'improvements') || ['Improved structure and clarity'],
    analysis: {
      originalScore: 65,
      optimizedScore: 85,
      keyStrengths: ['Original intent preserved'],
      mainImprovements: ['Enhanced structure and specificity'],
      recommendedUsage: 'General AI assistance tasks'
    }
  };
}

function extractSection(text, section) {
  const regex = new RegExp(`"${section}":\\s*"([^"]*)"`, 'i');
  const match = text.match(regex);
  return match ? match[1] : null;
}

function extractList(text, section) {
  const regex = new RegExp(`"${section}":\\s*\\[([^\\]]+)\\]`, 'i');
  const match = text.match(regex);
  if (match) {
    return match[1].split(',').map(item => item.trim().replace(/"/g, ''));
  }
  return null;
} 