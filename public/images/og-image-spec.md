# OG Image Spec — PromptWritingStudio

**File to create:** `public/images/og-image.jpg`
**Dimensions:** 1200 x 630 px
**Format:** JPEG

## Design

- **Background:** solid `#FFDE59` (brand yellow)
- **Primary text:** "Prompt Writing Studio" — black `#1A1A1A`, large bold sans-serif (e.g. 72px)
- **Tagline:** "Prompt templates that actually work" — black `#1A1A1A`, medium weight (e.g. 40px)
- **Layout:** text centred vertically and horizontally on the yellow background
- No border, no logo needed; simplicity is intentional

## Tools to generate

Options in order of effort:

1. **Canva** — create 1200x630 blank canvas, fill `#FFDE59`, add text, export JPEG
2. **Figma** — frame at 1200x630, fill brand yellow, add text layers, export JPEG 80%+
3. **Node sharp** (if added later): `npm install --save-dev sharp` then run the script below
4. **ImageMagick CLI** (if available on machine):
   ```
   convert -size 1200x630 xc:'#FFDE59' \
     -font Helvetica-Bold -pointsize 72 -fill '#1A1A1A' \
     -gravity Center -annotate +0-60 'Prompt Writing Studio' \
     -font Helvetica -pointsize 40 \
     -annotate +0+40 'Prompt templates that actually work' \
     public/images/og-image.jpg
   ```

## Why this is deferred

`package.json` has no `sharp` or `canvas` dependency. Installing image-generation libs was out of scope for this autonomous pass. The autonomous session created `public/favicon.ico` programmatically (solid yellow, 32x32), but a 1200x630 JPEG with legible text requires a graphics library or design tool.

Once the image is created and placed at `public/images/og-image.jpg`, no code changes are needed — `components/layout/Layout.js` already references that path.
