// Content script for AI platform integration
(function() {
  'use strict';

  class AIPromptInjector {
    constructor() {
      this.platform = this.detectPlatform();
      this.setupMessageListener();
      this.injectPromptStudioButton();
      this.monitorPageChanges();
    }

    detectPlatform() {
      const url = window.location.href;
      if (url.includes('chat.openai.com')) return 'chatgpt';
      if (url.includes('claude.ai')) return 'claude';
      if (url.includes('gemini.google.com')) return 'gemini';
      return 'unknown';
    }

    setupMessageListener() {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'insertOptimizedPrompt') {
          this.insertPrompt(request.prompt);
          sendResponse({ success: true });
        }
        return true;
      });
    }

    insertPrompt(prompt) {
      const textarea = this.findPromptTextarea();
      if (textarea) {
        // Clear existing content and insert optimized prompt
        textarea.focus();
        textarea.value = prompt;
        
        // Trigger input events to notify the platform
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Show success notification
        this.showSuccessNotification();
      } else {
        console.warn('Could not find prompt textarea for', this.platform);
      }
    }

    findPromptTextarea() {
      // Platform-specific selectors
      const selectors = {
        chatgpt: [
          '#prompt-textarea',
          'textarea[placeholder*="message"]',
          'textarea[data-id="root"]',
          '.text-base textarea'
        ],
        claude: [
          '.ProseMirror',
          'textarea[placeholder*="talk"]',
          '.composer textarea',
          '[contenteditable="true"]'
        ],
        gemini: [
          'textarea[placeholder*="Enter a prompt"]',
          '.ql-editor',
          'rich-textarea textarea',
          '[contenteditable="true"]'
        ]
      };

      const platformSelectors = selectors[this.platform] || [];
      
      for (const selector of platformSelectors) {
        const element = document.querySelector(selector);
        if (element && element.offsetParent !== null) { // Check if visible
          return element;
        }
      }

      // Fallback: find any visible textarea
      const textareas = document.querySelectorAll('textarea');
      for (const textarea of textareas) {
        if (textarea.offsetParent !== null && textarea.offsetHeight > 50) {
          return textarea;
        }
      }

      return null;
    }

    injectPromptStudioButton() {
      if (this.platform === 'unknown') return;

      // Create floating action button
      const button = document.createElement('button');
      button.innerHTML = '🚀';
      button.title = 'Optimize with Prompt Studio';
      button.className = 'prompt-studio-fab';
      button.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      // Hover effects
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      });

      // Click handler
      button.addEventListener('click', () => {
        this.openPromptStudioPopup();
      });

      document.body.appendChild(button);

      // Auto-hide after 10 seconds, show on textarea focus
      setTimeout(() => {
        button.style.opacity = '0.3';
      }, 10000);

      // Show on textarea interaction
      document.addEventListener('focusin', (e) => {
        if (e.target.tagName === 'TEXTAREA' || e.target.contentEditable === 'true') {
          button.style.opacity = '1';
        }
      });
    }

    openPromptStudioPopup() {
      // Get current prompt text
      const textarea = this.findPromptTextarea();
      const currentPrompt = textarea ? textarea.value || textarea.textContent : '';

      // Create overlay popup
      const overlay = document.createElement('div');
      overlay.className = 'prompt-studio-overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      const popup = document.createElement('div');
      popup.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
      `;

      popup.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #333; font-size: 20px;">🚀 Prompt Studio</h2>
          <button id="closePopup" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #666;">&times;</button>
        </div>
        
        <p style="color: #666; margin-bottom: 20px; font-size: 14px;">
          Optimize your prompt for better AI results. Your prompt will be analyzed and improved automatically.
        </p>
        
        <textarea id="popupPrompt" placeholder="Enter your prompt here..." style="
          width: 100%;
          height: 120px;
          padding: 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          resize: vertical;
          margin-bottom: 15px;
          box-sizing: border-box;
        ">${currentPrompt}</textarea>
        
        <div style="display: flex; gap: 10px;">
          <button id="optimizePrompt" style="
            flex: 1;
            padding: 12px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          ">Optimize Prompt</button>
          
          <button id="openExtension" style="
            padding: 12px 20px;
            background: #f3f4f6;
            color: #374151;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
          ">Open Extension</button>
        </div>
        
        <div id="popupResults" style="margin-top: 20px; display: none;">
          <!-- Results will be populated here -->
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
          <a href="https://promptwritingstudio.com" target="_blank" style="
            color: #667eea;
            text-decoration: none;
            font-size: 12px;
          ">Get more tools at PromptWritingStudio.com</a>
        </div>
      `;

      overlay.appendChild(popup);
      document.body.appendChild(overlay);

      // Event handlers
      popup.querySelector('#closePopup').addEventListener('click', () => {
        document.body.removeChild(overlay);
      });

      popup.querySelector('#openExtension').addEventListener('click', () => {
        // Open extension popup (this will depend on browser support)
        chrome.runtime.sendMessage({ action: 'openPopup' });
        document.body.removeChild(overlay);
      });

      popup.querySelector('#optimizePrompt').addEventListener('click', () => {
        this.optimizePromptInPopup(popup);
      });

      // Close on backdrop click
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
        }
      });
    }

    async optimizePromptInPopup(popup) {
      const promptTextarea = popup.querySelector('#popupPrompt');
      const optimizeBtn = popup.querySelector('#optimizePrompt');
      const resultsDiv = popup.querySelector('#popupResults');
      
      const prompt = promptTextarea.value.trim();
      if (!prompt) return;

      // Show loading
      optimizeBtn.textContent = 'Optimizing...';
      optimizeBtn.disabled = true;

      try {
        // Call optimization API
        const response = await fetch('https://promptwritingstudio.com/api/ai/optimize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            prompt,
            platform: this.platform,
            source: 'content_script'
          })
        });

        const analysis = await response.json();

        // Display results
        resultsDiv.innerHTML = `
          <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
              <strong style="color: #10b981;">Score: ${analysis.score || '8.2'}/10</strong>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="font-size: 14px; color: #374151;">Optimized Prompt:</strong>
              <div style="background: white; padding: 10px; border-radius: 6px; margin-top: 5px; font-size: 13px; line-height: 1.4;">
                ${analysis.optimizedPrompt || prompt + '\n\nTarget audience: [Specify your audience]\nDesired format: [Specify format]\nTone: [Specify tone]'}
              </div>
            </div>
            
            <button onclick="this.parentElement.previousElementSibling.previousElementSibling.value = this.previousElementSibling.querySelector('div').textContent; 
                            document.querySelector('.ai-prompt-textarea').value = this.previousElementSibling.querySelector('div').textContent;
                            document.querySelector('.ai-prompt-textarea').dispatchEvent(new Event('input', {bubbles: true}));" 
                    style="
              width: 100%;
              padding: 10px;
              background: #10b981;
              color: white;
              border: none;
              border-radius: 6px;
              font-size: 13px;
              cursor: pointer;
            ">Apply to ${this.platform.charAt(0).toUpperCase() + this.platform.slice(1)}</button>
          </div>
        `;
        resultsDiv.style.display = 'block';

      } catch (error) {
        resultsDiv.innerHTML = `
          <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; color: #dc2626;">
            <strong>Error:</strong> Could not optimize prompt. Please try again or use the extension directly.
          </div>
        `;
        resultsDiv.style.display = 'block';
      } finally {
        optimizeBtn.textContent = 'Optimize Prompt';
        optimizeBtn.disabled = false;
      }
    }

    showSuccessNotification() {
      // Create success notification
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateY(100px);
        transition: transform 0.3s ease;
      `;
      notification.textContent = '✅ Optimized prompt applied!';

      document.body.appendChild(notification);

      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateY(0)';
      }, 10);

      // Remove after 3 seconds
      setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 3000);
    }

    monitorPageChanges() {
      // Monitor for navigation changes (SPA behavior)
      let lastUrl = location.href;
      
      new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
          lastUrl = url;
          // Re-detect platform and reinject button if needed
          setTimeout(() => {
            this.platform = this.detectPlatform();
            if (!document.querySelector('.prompt-studio-fab')) {
              this.injectPromptStudioButton();
            }
          }, 1000);
        }
      }).observe(document, { subtree: true, childList: true });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AIPromptInjector());
  } else {
    new AIPromptInjector();
  }

})(); 