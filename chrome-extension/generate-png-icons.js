#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create canvas functionality using Node.js (fallback if no canvas package)
function createPWSIcon(size) {
  // SVG template for PWS lettermark with brand colors
  const svgContent = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Yellow background -->
      <rect width="${size}" height="${size}" fill="#FFDE59" rx="${size * 0.15}"/>
      
      <!-- Black PWS text -->
      <text x="${size/2}" y="${size/2}" 
            font-family="system-ui, -apple-system, sans-serif" 
            font-size="${size * 0.35}" 
            font-weight="700" 
            text-anchor="middle" 
            dominant-baseline="central" 
            fill="#1A1A1A">PWS</text>
    </svg>
  `.trim();
  
  return svgContent;
}

// Icon sizes needed for Chrome extension
const iconSizes = [
  { size: 16, name: 'icon16.png' },
  { size: 32, name: 'icon32.png' },
  { size: 48, name: 'icon48.png' },
  { size: 128, name: 'icon128.png' }
];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('🚀 Generating PWS lettermark icons...');

// Create SVG files (which work as icons in many cases)
iconSizes.forEach(({ size, name }) => {
  const svgContent = createPWSIcon(size);
  const svgName = name.replace('.png', '.svg');
  const svgPath = path.join(iconsDir, svgName);
  
  fs.writeFileSync(svgPath, svgContent);
  console.log(`✅ Created ${svgName} (${size}x${size})`);
});

// Create a simple base64 data URL version for immediate use
const createDataURL = (size) => {
  const svgContent = createPWSIcon(size);
  const base64 = Buffer.from(svgContent).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
};

// Create a manifest update suggestion
const manifestUpdate = `
// Update your manifest.json to use SVG icons temporarily:
{
  "icons": {
    "16": "icons/icon16.svg",
    "32": "icons/icon32.svg", 
    "48": "icons/icon48.svg",
    "128": "icons/icon128.svg"
  },
  "action": {
    "default_icon": {
      "16": "icons/icon16.svg",
      "32": "icons/icon32.svg",
      "48": "icons/icon48.svg",
      "128": "icons/icon128.svg"
    }
  }
}
`;

fs.writeFileSync(path.join(iconsDir, 'manifest-update.txt'), manifestUpdate);

console.log('\n✅ PWS lettermark icons created successfully!');
console.log('📁 Location: chrome-extension/icons/');
console.log('📋 SVG icons created (Chrome supports SVG icons)');
console.log('📝 See manifest-update.txt for how to use them');
console.log('\n🚀 Ready to test your extension!'); 