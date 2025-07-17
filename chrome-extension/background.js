// Background service worker for Prompt Studio Extension
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // First install
    chrome.storage.local.set({
      usageCount: 0,
      isPremium: false,
      installDate: Date.now(),
      lastResetDate: new Date().toDateString()
    });
    
    // Open welcome page
    chrome.tabs.create({
      url: 'https://promptwritingstudio.com/chrome-extension?source=install&welcome=true'
    });
  } else if (details.reason === 'update') {
    // Extension updated
    console.log('Prompt Studio Extension updated');
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'openPopup':
      // Try to open the extension popup (limited browser support)
      chrome.action.openPopup?.();
      break;
      
    case 'trackEvent':
      // Handle analytics tracking
      handleAnalytics(request.event, request.data);
      break;
      
    case 'checkPremium':
      // Check premium status
      chrome.storage.local.get(['isPremium'], (result) => {
        sendResponse({ isPremium: result.isPremium || false });
      });
      return true;
      
    case 'upgradeToPremium':
      // Handle premium upgrade
      chrome.storage.local.set({ isPremium: true });
      sendResponse({ success: true });
      break;
  }
});

// Daily usage reset
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyReset') {
    chrome.storage.local.set({
      usageCount: 0,
      lastResetDate: new Date().toDateString()
    });
  }
});

// Set up daily reset alarm
chrome.alarms.create('dailyReset', {
  when: getNextMidnight(),
  periodInMinutes: 24 * 60 // 24 hours
});

function getNextMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime();
}

function handleAnalytics(eventName, data) {
  // Store analytics locally and batch sync
  chrome.storage.local.get(['analytics'], (result) => {
    const analytics = result.analytics || [];
    analytics.push({
      event: eventName,
      data,
      timestamp: Date.now(),
      url: data.url || 'unknown'
    });
    
    // Keep only last 100 events
    if (analytics.length > 100) {
      analytics.splice(0, analytics.length - 100);
    }
    
    chrome.storage.local.set({ analytics });
    
    // Sync if we have enough events
    if (analytics.length >= 10) {
      syncAnalytics(analytics);
    }
  });
}

async function syncAnalytics(events) {
  try {
    const response = await fetch('https://promptwritingstudio.com/api/analytics/extension', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ events })
    });
    
    if (response.ok) {
      // Clear synced events
      chrome.storage.local.set({ analytics: [] });
    }
  } catch (error) {
    console.warn('Failed to sync analytics:', error);
  }
}

// Badge updates for usage
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.usageCount) {
    const remaining = Math.max(0, 3 - (changes.usageCount.newValue || 0));
    
    if (remaining === 0) {
      chrome.action.setBadgeText({ text: '!' });
      chrome.action.setBadgeBackgroundColor({ color: '#ef4444' });
      chrome.action.setTitle({ title: 'Prompt Studio - Daily limit reached! Click to upgrade.' });
    } else {
      chrome.action.setBadgeText({ text: remaining.toString() });
      chrome.action.setBadgeBackgroundColor({ color: '#10b981' });
      chrome.action.setTitle({ title: `Prompt Studio - ${remaining} optimizations remaining today` });
    }
  }
});

// Context menu for right-click optimization
chrome.contextMenus.create({
  id: 'optimizePrompt',
  title: 'Optimize with Prompt Studio',
  contexts: ['selection'],
  documentUrlPatterns: [
    'https://chat.openai.com/*',
    'https://claude.ai/*',
    'https://gemini.google.com/*'
  ]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'optimizePrompt' && info.selectionText) {
    // Send selected text to content script for optimization
    chrome.tabs.sendMessage(tab.id, {
      action: 'optimizeSelection',
      text: info.selectionText
    });
  }
});

// Periodic cleanup and maintenance
setInterval(() => {
  // Clean up old analytics data
  chrome.storage.local.get(['analytics'], (result) => {
    if (result.analytics && result.analytics.length > 0) {
      const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      const recentAnalytics = result.analytics.filter(
        event => event.timestamp > oneWeekAgo
      );
      
      if (recentAnalytics.length !== result.analytics.length) {
        chrome.storage.local.set({ analytics: recentAnalytics });
      }
    }
  });
}, 60 * 60 * 1000); // Every hour 