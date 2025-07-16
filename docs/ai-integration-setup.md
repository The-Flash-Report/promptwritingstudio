# AI Integration Setup Guide

## Overview

The Prompt Writing Studio now includes real AI integration with Claude and Perplexity APIs for live prompt optimization and testing.

## Required Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Claude API Key (Anthropic) - base64 encoded
CLAUDE_API_KEY=your_base64_encoded_claude_api_key_here

# Perplexity AI API Key - base64 encoded  
PERPLEXITY_API_KEY=your_base64_encoded_perplexity_api_key_here

# OpenAI API Key - for future integration
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key - for future integration
GOOGLE_API_KEY=your_google_api_key_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## API Key Configuration

### Claude (Anthropic) API
1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Encode it in base64: `echo "your_api_key" | base64`
3. Add to `.env` as `CLAUDE_API_KEY`

### Perplexity AI API  
1. Get your API key from [Perplexity AI](https://www.perplexity.ai/settings/api)
2. Encode it in base64: `echo "your_api_key" | base64`
3. Add to `.env` as `PERPLEXITY_API_KEY`

## GitHub Organization Setup

As mentioned in your setup, API secrets are configured at the GitHub organization level:
- Repository: `https://github.com/The-Flash-Report/promptwritingstudio`
- Claude and Perplexity API secrets are base64 encoded
- Additional API secrets can be added as needed

## Features Enabled

### 1. Real AI Optimization
- Uses Claude 3 Sonnet for intelligent prompt optimization
- Model-specific optimization techniques
- Real-time analysis and scoring

### 2. Live Chat Testing  
- Test prompts with real AI models
- Multi-model support (Claude, Perplexity)
- Usage tracking and analytics
- Chat history and conversation management

### 3. API Endpoints

#### `/api/ai/chat`
- Real-time AI chat for prompt testing
- Supports Claude and Perplexity models
- Rate limiting and error handling

#### `/api/ai/optimize`
- AI-powered prompt optimization
- Model-specific improvements
- Detailed analysis and suggestions

## Usage

### In the Prompt Optimizer:
1. Toggle "Use Real AI Optimization" to enable Claude-powered optimization
2. Select your target model
3. Click "AI Optimize" for real improvements
4. Use "Test with Live AI" to chat with optimized prompts

### Testing Prompts:
1. Use the "Test Original" or "Test with Live AI" buttons
2. Select between Claude and Perplexity models
3. Chat in real-time to validate prompt effectiveness
4. Monitor token usage and response quality

## Error Handling

- Automatic fallback to mock optimization if API fails
- Rate limiting (10 requests per minute per IP)
- Graceful error messages
- Development mode shows detailed error information

## Security

- API keys are base64 encoded for additional security
- Rate limiting prevents abuse
- Environment variables are never exposed to client
- Error messages don't leak sensitive information

## Troubleshooting

### Common Issues:

1. **API Key Not Working**
   - Verify base64 encoding is correct
   - Check API key has proper permissions
   - Ensure environment variables are loaded

2. **Optimization Fails**
   - Component automatically falls back to mock optimization
   - Check network connectivity
   - Verify API endpoints are accessible

3. **Rate Limiting**
   - Current limit: 10 requests per minute per IP
   - Wait before retrying
   - Consider implementing user-based rate limiting

## Development

To test the integration locally:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev
```

## Production Deployment

For production deployment:
1. Configure environment variables in your hosting platform
2. Ensure API keys are properly base64 encoded
3. Set up monitoring for API usage and costs
4. Configure appropriate rate limiting
5. Enable error logging and monitoring

## Future Integrations

The system is designed to easily add:
- OpenAI GPT-4 support
- Google Gemini integration
- Custom model endpoints
- Image generation models (DALL-E, Midjourney)
- Additional AI providers 