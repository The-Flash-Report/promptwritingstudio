# Prompt Studio Chrome Extension MVP

A Chrome extension that optimizes AI prompts in real-time for ChatGPT, Claude, and Gemini.

## 🎯 Goals
1. **Discoverability** - Make users discover and try prompt optimization
2. **Delightful UX** - Smooth, intuitive experience that users love
3. **Revenue** - Convert free users to premium through usage limits

## 🚀 Quick Install for Testing

### 1. Add Icon Files (Required)
Add these PNG files to the `icons/` folder:
- `icon16.png` (16x16 pixels)
- `icon32.png` (32x32 pixels) 
- `icon48.png` (48x48 pixels)
- `icon128.png` (128x128 pixels)

**Quick hack for testing:** Use any PNG files and rename them to these sizes.

### 2. Install in Chrome
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `chrome-extension` folder
5. The extension should appear in your extensions list

### 3. Test the Extension
1. Visit https://chat.openai.com or https://claude.ai
2. Look for the floating 🚀 button (bottom right)
3. Click it to open the optimization popup
4. Try the extension popup by clicking the extension icon

## 📁 File Structure
```
chrome-extension/
├── manifest.json          # Extension configuration
├── popup.html             # Main popup interface
├── popup.js               # Popup logic and API calls
├── content.js             # Injected script for AI platforms
├── content.css            # Styling for injected elements
├── background.js          # Service worker for extension lifecycle
├── icons/                 # Extension icons (you need to add these)
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md              # This file
```

## ⚙️ Configuration

### API Integration
The extension calls your existing API at:
- `https://promptwritingstudio.com/api/ai/optimize`
- `https://promptwritingstudio.com/api/analytics/extension`

Make sure these endpoints exist and handle the extension requests.

### Usage Limits (Revenue Goal)
- Free: 3 optimizations per day
- Premium: Unlimited (set `isPremium: true` in storage for testing)
- Upgrade prompts trigger when limit reached

## 🧪 Features Included

### ✅ Discoverability Features
- Floating action button on AI platforms
- Auto-detection of ChatGPT, Claude, Gemini
- Welcome popup for new installs
- Right-click context menu optimization

### ✅ Delightful UX Features  
- Smooth animations and transitions
- Real-time prompt analysis
- One-click optimization application
- Success notifications
- Mobile-responsive design
- Auto-focus on textarea interaction

### ✅ Revenue Features
- Daily usage limits (3 free per day)
- Upgrade prompts when limit reached
- Premium feature previews
- Analytics tracking for conversion optimization
- Badge showing remaining uses

## 🔧 Development Notes

### Testing Premium Features
To test premium features without limits:
```javascript
// In browser console on extension popup:
chrome.storage.local.set({isPremium: true});
```

### Viewing Analytics
```javascript
// View stored analytics:
chrome.storage.local.get(['analytics'], console.log);
```

### Reset Usage Count
```javascript
// Reset daily usage:
chrome.storage.local.set({usageCount: 0});
```

## 📊 Success Metrics

### Discoverability
- [ ] 60% of AI platform visitors see the floating button
- [ ] 40% click to try optimization
- [ ] 80% complete onboarding demo

### Delightful UX
- [ ] 4.5+ user satisfaction rating
- [ ] 70% return usage within 7 days
- [ ] <3 second optimization response time

### Revenue
- [ ] 15% free-to-premium conversion within 30 days
- [ ] $1,500+ monthly recurring revenue
- [ ] 25% increase in overall platform engagement

## 🚀 Next Steps for Production

1. **Create proper icons** using brand colors and rocket logo
2. **Publish to Chrome Web Store** (requires developer account)
3. **Set up analytics tracking** on the main website
4. **Add Stripe integration** for premium upgrades
5. **Create onboarding flow** for new users
6. **A/B testing** for conversion optimization

## 📞 Support

If the extension doesn't work:
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Make sure icon files exist
4. Try reloading the extension

The extension automatically redirects to the landing page on install:
`https://promptwritingstudio.com/chrome-extension?source=install&welcome=true` 