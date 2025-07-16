// pages/api/ai/chat.js
// Real-time AI chat endpoint for testing optimized prompts

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, model = 'claude', messages = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Get API keys from environment variables
    const claudeKey = process.env.CLAUDE_API_KEY;
    const perplexityKey = process.env.PERPLEXITY_API_KEY;

    let response;
    let usage = {};

    switch (model) {
      case 'claude':
        if (!claudeKey) {
          return res.status(500).json({ error: 'Claude API key not configured' });
        }
        response = await callClaudeAPI(prompt, messages, claudeKey);
        break;

      case 'perplexity':
        if (!perplexityKey) {
          return res.status(500).json({ error: 'Perplexity API key not configured' });
        }
        response = await callPerplexityAPI(prompt, messages, perplexityKey);
        break;

      case 'openai':
        // Future implementation when OpenAI key is added
        return res.status(501).json({ error: 'OpenAI integration coming soon' });

      case 'google':
        // Future implementation when Google key is added
        return res.status(501).json({ error: 'Google Gemini integration coming soon' });

      default:
        return res.status(400).json({ error: 'Invalid model specified' });
    }

    // Return the AI response with metadata
    res.status(200).json({
      response: response.content,
      model,
      usage: response.usage || {},
      timestamp: new Date().toISOString(),
      promptLength: prompt.length,
      responseLength: response.content.length
    });

  } catch (error) {
    console.error('AI Chat API Error:', error);
    res.status(500).json({ 
      error: 'Failed to process AI request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Claude API integration
async function callClaudeAPI(prompt, messages, apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': Buffer.from(apiKey, 'base64').toString('utf-8'),
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages: [
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user',
          content: prompt
        }
      ]
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

// Perplexity API integration
async function callPerplexityAPI(prompt, messages, apiKey) {
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Buffer.from(apiKey, 'base64').toString('utf-8')}`
    },
    body: JSON.stringify({
      model: 'llama-3.1-sonar-small-128k-online',
      messages: [
        ...messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1024,
      temperature: 0.7,
      top_p: 0.9,
      search_domain_filter: ["perplexity.ai"],
      return_images: false,
      return_related_questions: false,
      search_recency_filter: "month",
      top_k: 0,
      stream: false,
      presence_penalty: 0,
      frequency_penalty: 1
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Perplexity API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  
  return {
    content: data.choices[0].message.content,
    usage: {
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0
    }
  };
}

// Rate limiting configuration
const rateLimit = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10; // 10 requests per minute

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const limit = rateLimit.get(ip);
  
  if (now > limit.resetTime) {
    limit.count = 1;
    limit.resetTime = now + windowMs;
    return false;
  }

  if (limit.count >= maxRequests) {
    return true;
  }

  limit.count++;
  return false;
} 