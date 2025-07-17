// Popup functionality for Prompt Studio Chrome Extension
class PromptOptimizer {
  constructor() {
    this.initializeElements();
    this.loadUserData();
    this.bindEvents();
    this.trackUsage();
  }

  initializeElements() {
    this.promptInput = document.getElementById('promptInput');
    this.analyzeBtn = document.getElementById('analyzeBtn');
    this.usageInfo = document.getElementById('usageInfo');
    this.usageCount = document.getElementById('usageCount');
    this.upgradeBtn = document.getElementById('upgradeBtn');
    this.results = document.getElementById('results');
    this.loading = document.getElementById('loading');
    this.scoreValue = document.getElementById('scoreValue');
    this.suggestions = document.getElementById('suggestions');
    this.applyBtn = document.getElementById('applyBtn');
    
    // API Key management elements
    this.apiConfig = document.getElementById('apiConfig');
    this.apiStatus = document.getElementById('apiStatus');
    this.apiKeyInput = document.getElementById('apiKeyInput');
    this.saveApiKeyBtn = document.getElementById('saveApiKey');
    this.removeApiKeyBtn = document.getElementById('removeApiKey');
    this.configureApiBtn = document.getElementById('configureApi');
    this.setupApiBtn = document.getElementById('setupApiBtn');
  }

  async loadUserData() {
    try {
      const data = await chrome.storage.local.get(['usageCount', 'lastResetDate', 'isPremium', 'apiKey']);
      
      // Reset daily count if it's a new day
      const today = new Date().toDateString();
      if (data.lastResetDate !== today) {
        await chrome.storage.local.set({
          usageCount: 0,
          lastResetDate: today
        });
        this.usageCount.textContent = '0 of 3';
      } else {
        const remaining = Math.max(0, 3 - (data.usageCount || 0));
        this.usageCount.textContent = `${remaining} of 3`;
      }

      // Hide usage info if user is premium or has API key
      if (data.isPremium || data.apiKey) {
        this.usageInfo.style.display = 'none';
      }

      // Handle API key state
      this.updateApiKeyUI(data.apiKey);

      this.updateUIState();
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  updateApiKeyUI(apiKey) {
    if (apiKey) {
      // User has API key - show connected status
      this.apiStatus.style.display = 'block';
      this.apiConfig.style.display = 'none';
      this.usageInfo.style.display = 'none';
    } else {
      // No API key - show usage limits and option to add key
      this.apiStatus.style.display = 'none';
      this.apiConfig.style.display = 'none';
      this.usageInfo.style.display = 'block';
    }
  }

  async saveApiKey() {
    const apiKey = this.apiKeyInput.value.trim();
    
    if (!apiKey) {
      this.showError('Please enter a valid API key');
      return;
    }

    if (!apiKey.startsWith('sk-ant-')) {
      this.showError('Invalid Claude API key format. Should start with "sk-ant-"');
      return;
    }

    try {
      // Test the API key
      await this.testApiKey(apiKey);
      
      // Save the API key
      await chrome.storage.local.set({ apiKey: apiKey });
      
      this.updateApiKeyUI(apiKey);
      this.trackEvent('api_key_saved');
      
      this.showSuccess('API key saved successfully!');
    } catch (error) {
      this.showError('Invalid API key. Please check and try again.');
    }
  }

  async removeApiKey() {
    await chrome.storage.local.remove('apiKey');
    this.apiKeyInput.value = '';
    this.updateApiKeyUI(null);
    this.trackEvent('api_key_removed');
    this.showSuccess('API key removed');
  }

  showApiConfig() {
    this.apiConfig.style.display = 'block';
    this.apiStatus.style.display = 'none';
  }

  async testApiKey(apiKey) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }]
      })
    });

    if (!response.ok) {
      throw new Error('Invalid API key');
    }
  }

  async getUserApiKey() {
    const data = await chrome.storage.local.get(['apiKey']);
    return data.apiKey;
  }

  bindEvents() {
    this.analyzeBtn.addEventListener('click', () => this.analyzePrompt());
    this.upgradeBtn.addEventListener('click', () => this.openUpgradePage());
    this.applyBtn.addEventListener('click', () => this.applyOptimizations());
    
    // API Key management events
    this.saveApiKeyBtn.addEventListener('click', () => this.saveApiKey());
    this.removeApiKeyBtn.addEventListener('click', () => this.removeApiKey());
    this.configureApiBtn.addEventListener('click', () => this.showApiConfig());
    this.setupApiBtn.addEventListener('click', () => this.showApiConfig());
    
    // Real-time analysis as you type
    let analysisTimeout;
    this.promptInput.addEventListener('input', () => {
      const prompt = this.promptInput.value.trim();
      
      // Track engagement
      this.trackEvent('prompt_typing', { length: prompt.length });
      
      // Clear previous timeout
      clearTimeout(analysisTimeout);
      
      // Real-time scoring and basic analysis
      if (prompt.length > 20) {
        this.showLiveScore(prompt);
        
        // Debounced full analysis after 2 seconds of no typing
        analysisTimeout = setTimeout(() => {
          this.performLiveAnalysis(prompt);
        }, 2000);
      } else {
        this.hideLiveScore();
      }
    });

    // Auto-analyze on paste (delightful UX)
    this.promptInput.addEventListener('paste', () => {
      setTimeout(() => {
        if (this.promptInput.value.length > 50) {
          this.showSuggestion();
        }
      }, 500);
    });
  }

  async analyzePrompt() {
    const prompt = this.promptInput.value.trim();
    
    if (!prompt || prompt.length < 20) {
      this.showError('Please enter a prompt with at least 20 characters.');
      return;
    }

    // Check usage limits (revenue goal)
    const canUse = await this.checkUsageLimit();
    if (!canUse) {
      this.showUpgradePrompt();
      return;
    }

    this.showLoading(true);
    this.trackEvent('prompt_analysis_started', { promptLength: prompt.length });

    try {
      const analysis = await this.callOptimizationAPI(prompt);
      this.displayResults(analysis);
      await this.incrementUsage();
      
      this.trackEvent('prompt_analysis_completed', {
        score: analysis.score,
        suggestions: analysis.suggestions.length
      });
    } catch (error) {
      console.error('Analysis error:', error);
      this.showError('Analysis failed. Please try again.');
      this.trackEvent('prompt_analysis_error', { error: error.message });
    } finally {
      this.showLoading(false);
    }
  }

  async callOptimizationAPI(prompt) {
    // Security: Validate prompt length and content
    if (prompt.length > 5000) {
      throw new Error('Prompt too long (max 5000 characters)');
    }
    
    // Check if user has API key configured
    const userApiKey = await this.getUserApiKey();
    
    if (userApiKey) {
      // Use user's Claude API key directly (cost-effective model)
      return await this.callClaudeDirectly(prompt, userApiKey);
    } else {
      // Fallback to server API (limited usage)
      return await this.callServerAPI(prompt);
    }
  }

  async callClaudeDirectly(prompt, apiKey) {
    const platform = await this.detectCurrentPlatform();
    
    // Create optimization prompt
    const optimizationPrompt = `You are an expert prompt engineer. Analyze and improve this prompt for ${platform}.

Original prompt: "${prompt}"

Please provide:
1. A quality score (1-10)
2. 3-4 specific improvement suggestions
3. An optimized version of the prompt

Respond in JSON format:
{
  "score": 7.5,
  "suggestions": ["Add target audience", "Specify output format", "Include context"],
  "optimizedPrompt": "Improved version here"
}`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: [{ role: 'user', content: optimizationPrompt }]
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your Claude API key.');
      }
      if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again in a moment.');
      }
      throw new Error(`Claude API error (${response.status})`);
    }

    const data = await response.json();
    const content = data.content[0].text;
    
    try {
      return JSON.parse(content);
    } catch (e) {
      // Fallback parsing if JSON is malformed
      return {
        score: this.calculateQuickScore(prompt),
        suggestions: ['Add more context', 'Be more specific', 'Define output format'],
        optimizedPrompt: prompt + '\n\nTarget audience: [specify]\nDesired format: [specify]\nTone: [specify]'
      };
    }
  }

  async callServerAPI(prompt) {
    // Use the existing PromptWritingStudio API with security headers
    const response = await fetch('https://promptwritingstudio.com/api/ai/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'PromptStudio-Extension/1.0',
        'X-Extension-Version': '1.0.0',
        'X-Request-Source': 'chrome_extension'
      },
      body: JSON.stringify({
        prompt: prompt.trim(),
        platform: await this.detectCurrentPlatform(),
        source: 'chrome_extension',
        timestamp: Date.now(),
        // Privacy: No personal data sent
        sessionId: this.getAnonymousSessionId()
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      throw new Error(`Service temporarily unavailable (${response.status})`);
    }

    return await response.json();
  }

  getAnonymousSessionId() {
    // Create anonymous session ID (no personal data)
    let sessionId = localStorage.getItem('pws_session_id');
    if (!sessionId) {
      sessionId = 'ext_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('pws_session_id', sessionId);
    }
    return sessionId;
  }

  async detectCurrentPlatform() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = tab.url;
      
      if (url.includes('chat.openai.com')) return 'chatgpt';
      if (url.includes('claude.ai')) return 'claude';
      if (url.includes('gemini.google.com')) return 'gemini';
      return 'general';
    } catch {
      return 'general';
    }
  }

  displayResults(analysis) {
    // Update score with animation
    this.scoreValue.textContent = analysis.score || '7.2';
    this.scoreValue.style.color = this.getScoreColor(analysis.score);

    // Display suggestions
    this.suggestions.innerHTML = '';
    const suggestions = analysis.suggestions || [
      'Add specific context about your target audience',
      'Include the desired output format',
      'Specify the tone and style you want'
    ];

    suggestions.forEach(suggestion => {
      const div = document.createElement('div');
      div.className = 'suggestion';
      div.textContent = suggestion;
      this.suggestions.appendChild(div);
    });

    // Store optimized version for application
    this.optimizedPrompt = analysis.optimizedPrompt || this.generateOptimizedPrompt(suggestions);

    // Show results with animation
    this.results.style.display = 'block';
    this.results.style.opacity = '0';
    setTimeout(() => {
      this.results.style.transition = 'opacity 0.3s ease';
      this.results.style.opacity = '1';
    }, 10);
  }

  generateOptimizedPrompt(suggestions) {
    // Simple optimization based on suggestions
    let optimized = this.promptInput.value;
    
    if (suggestions.some(s => s.includes('audience'))) {
      optimized += '\n\nTarget audience: [Specify your audience]';
    }
    if (suggestions.some(s => s.includes('format'))) {
      optimized += '\nDesired format: [Specify output format]';
    }
    if (suggestions.some(s => s.includes('tone'))) {
      optimized += '\nTone: [Specify tone and style]';
    }
    
    return optimized;
  }

  getScoreColor(score) {
    if (score >= 8) return '#10b981'; // Green
    if (score >= 6) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  }

  async applyOptimizations() {
    if (!this.optimizedPrompt) return;

    try {
      // Try to inject into current AI platform
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      await chrome.tabs.sendMessage(tab.id, {
        action: 'insertOptimizedPrompt',
        prompt: this.optimizedPrompt
      });

      this.trackEvent('prompt_applied', { platform: await this.detectCurrentPlatform() });
      this.showSuccess('Optimized prompt applied!');
    } catch (error) {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(this.optimizedPrompt);
      this.showSuccess('Optimized prompt copied to clipboard!');
      this.trackEvent('prompt_copied', { fallback: true });
    }
  }

  async checkUsageLimit() {
    const data = await chrome.storage.local.get(['usageCount', 'isPremium', 'apiKey']);
    
    // Premium users or users with API keys have unlimited access
    if (data.isPremium || data.apiKey) return true;
    
    const usageCount = data.usageCount || 0;
    return usageCount < 3;
  }

  async incrementUsage() {
    const data = await chrome.storage.local.get(['usageCount']);
    const newCount = (data.usageCount || 0) + 1;
    
    await chrome.storage.local.set({ usageCount: newCount });
    
    const remaining = Math.max(0, 3 - newCount);
    this.usageCount.textContent = `${remaining} of 3`;
    
    if (remaining === 0) {
      this.showUpgradePrompt();
    }
  }

  showUpgradePrompt() {
    this.usageInfo.style.background = 'rgba(239, 68, 68, 0.2)';
    this.usageCount.textContent = '0 of 3';
    this.upgradeBtn.textContent = '🚀 Upgrade for Unlimited Access';
    this.upgradeBtn.style.background = '#ef4444';
    
    // Show upgrade benefits with API key alternative
    this.results.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h3 style="margin: 0 0 15px; font-size: 16px;">Daily Limit Reached!</h3>
        <p style="margin: 0 0 15px; font-size: 13px; opacity: 0.9;">
          Choose how to get unlimited optimizations:
        </p>
        
        <div style="display: grid; gap: 12px; margin-bottom: 15px;">
          <!-- Premium Option -->
          <div style="background: rgba(255, 222, 89, 0.1); padding: 12px; border-radius: 6px; border: 1px solid rgba(255, 222, 89, 0.3);">
            <strong style="color: #D97706;">🎯 Premium: $9.97/mo</strong><br/>
            <span style="font-size: 11px; opacity: 0.8;">Everything included + courses</span>
          </div>
          
          <!-- API Key Option -->
          <div style="background: rgba(16, 185, 129, 0.1); padding: 12px; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.3);">
            <strong style="color: #059669;">🔑 Your Claude API</strong><br/>
            <span style="font-size: 11px; opacity: 0.8;">Pay only for your usage (~$0.07/optimization)</span>
          </div>
        </div>
        
        <div style="display: grid; gap: 8px;">
          <button class="upgrade-btn" onclick="window.open('https://promptwritingstudio.com/chrome-extension?utm_source=extension&utm_medium=popup&utm_campaign=premium_upgrade&utm_content=daily_limit', '_blank')">
            Choose Premium Plan
          </button>
          <button onclick="document.getElementById('apiConfig').style.display='block'; document.getElementById('results').style.display='none';" 
                  style="width: 100%; padding: 8px; background: #10b981; color: white; border: none; border-radius: 6px; font-size: 13px; cursor: pointer;">
            Setup Your API Key
          </button>
        </div>
      </div>
    `;
    this.results.style.display = 'block';
  }

  openUpgradePage() {
    const url = 'https://promptwritingstudio.com/chrome-extension?utm_source=extension&utm_medium=popup&utm_campaign=premium_upgrade&utm_content=usage_limit';
    chrome.tabs.create({ url });
    this.trackEvent('upgrade_clicked', { 
      source: 'popup',
      pricing: '$9.97_per_month',
      competitor_comparison: '20_percent_better_pricing'
    });
  }

  showSuggestion() {
    // Delightful UX: Show suggestion to analyze
    if (this.promptInput.value.length > 50) {
      this.analyzeBtn.style.background = '#10b981';
      this.analyzeBtn.textContent = '✨ Analyze This Prompt';
      setTimeout(() => {
        this.analyzeBtn.textContent = 'Analyze & Optimize Prompt';
        this.analyzeBtn.style.background = '#10b981';
      }, 3000);
    }
  }

  showLoading(show) {
    this.loading.style.display = show ? 'block' : 'none';
    this.analyzeBtn.disabled = show;
    this.analyzeBtn.textContent = show ? 'Analyzing...' : 'Analyze & Optimize Prompt';
  }

  showError(message) {
    // Simple error display
    this.results.innerHTML = `
      <div style="text-align: center; color: #ef4444; padding: 20px;">
        ${message}
      </div>
    `;
    this.results.style.display = 'block';
  }

  showSuccess(message) {
    // Success feedback
    this.applyBtn.style.background = '#10b981';
    this.applyBtn.textContent = '✅ ' + message;
    setTimeout(() => {
      this.applyBtn.style.background = '#f59e0b';
      this.applyBtn.textContent = 'Apply All Improvements';
    }, 2000);
  }

  updateUIState() {
    // Update UI based on current state
    const platform = this.detectCurrentPlatform();
    if (platform !== 'general') {
      this.analyzeBtn.textContent = `Optimize for ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
    }
  }

  trackEvent(eventName, data = {}) {
    // Analytics tracking
    chrome.storage.local.get(['userId'], (result) => {
      const userId = result.userId || 'anonymous_' + Date.now();
      
      // Store analytics data locally and sync periodically
      const event = {
        event: eventName,
        userId,
        timestamp: Date.now(),
        data
      };
      
      chrome.storage.local.get(['analytics'], (result) => {
        const analytics = result.analytics || [];
        analytics.push(event);
        
        // Keep only last 100 events
        if (analytics.length > 100) {
          analytics.splice(0, analytics.length - 100);
        }
        
        chrome.storage.local.set({ analytics, userId });
      });
    });
  }

  // Real-time scoring and analysis methods
  showLiveScore(prompt) {
    const score = this.calculateQuickScore(prompt);
    const scoreElement = document.getElementById('scoreValue');
    const liveIndicator = document.getElementById('liveIndicator');
    
    if (!liveIndicator) {
      // Create live score indicator
      const indicator = document.createElement('div');
      indicator.id = 'liveIndicator';
      indicator.style.cssText = `
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        border-radius: 6px;
        padding: 8px 12px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #059669;
        text-align: center;
      `;
      this.promptInput.parentNode.insertBefore(indicator, this.promptInput.nextSibling);
    }
    
    const indicator = document.getElementById('liveIndicator');
    indicator.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
        <div style="font-weight: 600;">Live Score: ${score}/10</div>
        <div style="font-size: 10px; opacity: 0.8;">${this.getScoreDescription(score)}</div>
      </div>
    `;
    indicator.style.borderColor = this.getScoreColor(score);
    indicator.style.color = this.getScoreColor(score);
  }

  trackUsage() {
    // Track extension usage for discoverability insights
    this.trackEvent('extension_opened', {
      url: window.location.href,
      userAgent: navigator.userAgent
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PromptOptimizer();
});

// Periodic analytics sync (every 5 minutes)
setInterval(() => {
  chrome.storage.local.get(['analytics'], (result) => {
    if (result.analytics && result.analytics.length > 10) {
      // Send analytics to server
      fetch('https://promptwritingstudio.com/api/analytics/extension', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: result.analytics })
      }).then(() => {
        chrome.storage.local.set({ analytics: [] });
      }).catch(console.error);
    }
  });
}, 5 * 60 * 1000);