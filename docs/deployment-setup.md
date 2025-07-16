# Deployment Setup Guide

## 🚀 Repository Information

**GitHub Repository**: https://github.com/The-Flash-Report/promptwritingstudio
**Organization**: The-Flash-Report

## 🔐 API Configuration

### Organization-Level Secrets (Configured)
The following API secrets have been configured at the GitHub organization level:

- **CLAUDE_API_KEY** - Anthropic Claude API (base64 encoded)
- **PERPLEXITY_API_KEY** - Perplexity API (base64 encoded)

### Additional Secrets Required for Full AI Integration
When implementing the real AI integration tasks, add these secrets:

- **OPENAI_API_KEY** - OpenAI GPT-4 API
- **GOOGLE_API_KEY** - Google Gemini API
- **STRIPE_SECRET_KEY** - Stripe payment processing
- **STRIPE_PUBLISHABLE_KEY** - Stripe frontend integration
- **PAYPAL_CLIENT_ID** - PayPal payment integration
- **PAYPAL_CLIENT_SECRET** - PayPal payment processing
- **JWT_SECRET** - For user session management
- **DATABASE_URL** - For user data storage (when needed)

## 🌐 Deployment Options

### 1. Vercel (Recommended)
```bash
# Connect repository to Vercel
npm i -g vercel
vercel --prod
```

### 2. Netlify
```bash
# Build command
npm run build

# Publish directory
out
```

### 3. GitHub Pages
```bash
# Add to package.json
"homepage": "https://the-flash-report.github.io/promptwritingstudio"

# Deploy
npm run build
npm run deploy
```

## 🔧 Environment Variables Setup

### For Development (.env.local)
```env
CLAUDE_API_KEY=your_claude_api_key_here
PERPLEXITY_API_KEY=your_perplexity_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### For Production
Use the GitHub organization secrets or deploy platform environment variables.

## 📦 Build Process

### Current Build (Static)
```bash
npm run build
npm run export  # For static deployment
```

### Future Build (With API Integration)
```bash
npm run build  # Server-side rendering for API routes
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
      env:
        CLAUDE_API_KEY: ${{ secrets.CLAUDE_API_KEY }}
        PERPLEXITY_API_KEY: ${{ secrets.PERPLEXITY_API_KEY }}
    
    - name: Deploy to Vercel
      uses: vercel/action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] All environment variables configured
- [ ] API keys tested and validated
- [ ] Build process completes successfully
- [ ] Tests passing (when implemented)

### Post-Deployment
- [ ] SSL certificate active
- [ ] Domain pointing correctly
- [ ] Analytics tracking configured
- [ ] Error monitoring active
- [ ] Performance optimization verified

## 🚦 Feature Flags

For gradual rollout of AI integration features:

```javascript
// Feature flags for API integration
const FEATURES = {
  REAL_AI_CHAT: process.env.FEATURE_REAL_AI_CHAT === 'true',
  PAYMENT_INTEGRATION: process.env.FEATURE_PAYMENT === 'true',
  ANALYTICS_ADVANCED: process.env.FEATURE_ANALYTICS === 'true'
}
```

## 📊 Monitoring & Analytics

### Production Monitoring
- **Vercel Analytics** - Performance monitoring
- **Google Analytics 4** - User behavior tracking
- **Sentry** - Error monitoring (when implemented)
- **LogRocket** - User session recording (optional)

### API Usage Monitoring
- **OpenAI Usage Dashboard** - Token consumption tracking
- **Anthropic Console** - Claude API usage
- **Stripe Dashboard** - Payment processing metrics

## 🔒 Security Considerations

### API Key Management
- All keys stored as secrets (never in code)
- Base64 encoding for sensitive keys
- Key rotation schedule (quarterly)
- Usage monitoring and alerts

### Application Security
- Rate limiting on API routes
- Input validation and sanitization
- CORS configuration
- Security headers implementation

## 📞 Support & Maintenance

### Repository Management
- **Owner**: The-Flash-Report organization
- **Access**: Managed through GitHub organization settings
- **Backup**: Automated GitHub backups
- **Documentation**: Keep this guide updated with changes

### Update Process
1. Test changes in development
2. Create pull request for review
3. Deploy to staging environment
4. Production deployment after approval
5. Monitor for issues post-deployment 