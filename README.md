# PromptWritingStudio Next.js

This is the Next.js implementation of the PromptWritingStudio landing page, designed to support programmatic SEO and provide a modern, component-based architecture with a clean, simplified design focused on readability and conversion.

**Repository**: https://github.com/The-Flash-Report/promptwritingstudio

## Key Features
- 📚 Professional AI Prompt Library
- ⚡ Real-time Prompt Optimizer
- 🤖 AI Agent Builder
- 📊 Analytics Dashboard
- 🛠️ Template Builder

## Project Structure

```
/components
  /layout
    Header.js - Site header with navigation
    Footer.js - Site footer with links
    Layout.js - Main layout wrapper with FloatingCTA
  /ui
    TypewriterEffect.js - Animated text effect for hero
    FloatingCTA.js - Sticky call-to-action button
  /sections
    Hero.js - Main landing page hero section
    ProblemSolution.js - Problem/solution presentation
    WhatYouGet.js - Benefits and features section
    Features.js - Core features with icons
    Pricing.js - Pricing plans and options
    Testimonials.js - User testimonials and social proof
    TestimonialEmbed.js - Embedded testimonial iframe from testimonial.to
    Guarantee.js - Money-back guarantee section
    FAQ.js - Frequently asked questions
    Instructor.js - About the instructor section
/pages
  index.js - Main landing page
  chatgpt-prompt-templates.js - Hub page for templates
  chatgpt-prompts-for/[modifier].js - Dynamic SEO pages
  ai-prompt-generator/seo/[slug].js - Dynamic SEO pages for AI prompts
  sitemap.js - HTML sitemap for all pages
  [slug].js - Generic dynamic pages
/data
  seo-use-cases.js - Data for programmatic SEO pages (45+ use cases)
  prompt-generator-components.js - Components for AI prompt generator
  /modifiers - JSON data for programmatic SEO pages
    resume.json
    business.json
    email-marketing.json
/lib
  modifiers.js - Helper functions for modifier data
/public
  /images - Site images and assets
/styles
  globals.css - Global CSS styles
```

## Programmatic SEO Implementation

The site implements a comprehensive programmatic SEO strategy targeting AI prompt-related keywords:

### Content Structure
- **45+ Specialized Content Pages** organized into categories:
  - Art & Image Generation (Art Styles for AI Prompts, AI Image Prompts, etc.)
  - Effectiveness & Best Practices (How to Write Effective AI Prompts, Best AI Prompts, etc.)
  - Platform-Specific (Midjourney AI Prompts, Character AI Prompts, etc.)
  - Business & Professional (AI Prompts for Business, AI Prompts for Teachers, etc.)
  - Specialized Content (AI Writing Prompts, AI Chat Prompts, etc.)

### Implementation Details
- **Dynamic Page Template**: `/pages/ai-prompt-generator/seo/[slug].js` renders all SEO pages
- **Data Source**: `/data/seo-use-cases.js` contains all page metadata and content
- **Concept Descriptions**: Each page includes a highlighted concept description that explains the topic
- **HTML Sitemap**: `/pages/sitemap.js` organizes all pages into logical categories

### SEO Metadata
Each page in `seo-use-cases.js` includes:
- `slug`: URL path segment
- `title`: SEO-optimized page title
- `description`: Meta description
- `h1`: Main heading
- `intro`: Introductory paragraph
- `conceptDescription`: Highlighted explanation of the concept
- `searchVolume`: Monthly search volume (from Ahrefs)
- `parentKeyword`: Main category keyword
- `relatedKeywords`: Array of related search terms

## Design Rules & Conventions

### Component Structure
- Each section should be a standalone component in `/components/sections`
- UI elements used across multiple sections should be in `/components/ui`
- Layout components that wrap other components go in `/components/layout`

### Styling Guidelines
- Use Tailwind CSS for all styling
- Follow the simplified color scheme:
  - Primary: #FFDE59 (Yellow) - For buttons and accents
  - Text: #1A1A1A (Black) - For headings and important text
  - Secondary Text: #333333 - For body text
  - Backgrounds: White or #F9F9F9 for alternating sections
  - Borders: #E5E5E5 - For subtle separation
- Maintain consistent spacing (py-16 md:py-24 for sections)
- Use responsive classes (md:, lg:) for different screen sizes
- Cards should have rounded-lg corners and subtle shadows
- Use system fonts for optimal readability and performance

### Content Guidelines
- Maintain "Join Now" as the primary CTA text throughout the site
- All "Join Now" CTAs link directly to the Basic plan purchase URL (https://courses.becomeawritertoday.com/purchase?product_id=6253746)
- Pricing links for each plan:
  - Basic plan: https://courses.becomeawritertoday.com/purchase?product_id=6253746
  - Pro plan: https://courses.becomeawritertoday.com/purchase?product_id=6253756
  - Elite plan: https://courses.becomeawritertoday.com/purchase?product_id=6253752
- Use benefit-driven headlines and copy
- Include social proof and credibility indicators
- Each section should have a clear purpose and call-to-action

## Programmatic SEO Workflow

### Overview
The site uses dynamic routes to generate SEO-optimized pages for different prompt modifiers (e.g., resume, business, email marketing). This allows us to target specific keywords and provide tailored content.

### Adding New Modifier Pages

1. Create a new JSON file in `/data/modifiers/` following the existing pattern
2. The JSON should include:
   - `title`: Page title
   - `description`: Meta description
   - `heading`: Main H1 heading
   - `subheading`: Supporting text
   - `prompts`: Array of prompt templates
   - `examples`: Example outputs
   - `faqs`: Frequently asked questions
   - `relatedModifiers`: Related topics

3. The dynamic route at `/pages/chatgpt-prompts-for/[modifier].js` will automatically generate a new page using this data
4. Update the hub page at `/chatgpt-prompt-templates.js` to include links to the new page

### SEO Best Practices
- Each page should target a specific keyword cluster
- Use keyword-rich titles, headings, and content
- Include internal links between related pages
- Ensure all pages have proper meta tags

## Deployment Process

### GitHub
1. Push changes to the GitHub repository:
```bash
git add .
git commit -m "Descriptive commit message"
git push origin main
```

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Environment variables: Add any required env vars

3. For static export (recommended):
   - Update `next.config.js` to include `output: 'export'`
   - Run `npm run build` locally to test the export

4. Deploy settings:
   - Enable auto-publishing on push to main
   - Configure custom domain if needed
   - Set up redirect rules for any legacy URLs

## Getting Started

### Prerequisites
- Node.js 14.x or higher
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/promptwritingstudio-next.git
cd promptwritingstudio-next
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Testing

Before deploying, test the following:
- Responsive design on multiple devices
- All links and CTAs work correctly
- Dynamic SEO pages load properly
- Images are optimized and load quickly
- Forms submit correctly

## Design System

The project uses a simplified design system following Apple's Human Interface Guidelines:

### Typography
- System font stack for optimal readability and performance
- Consistent text sizes following a clear hierarchy
- Optimized line heights for better readability

### Color Palette
- Primary: #FFDE59 (Yellow) - For buttons and interactive elements
- Dark: #1A1A1A - For headings and important text
- Text: #333333 - For body text
- Light: #F9F9F9 - For section backgrounds
- Border: #E5E5E5 - For subtle separation

### Components
- Buttons: Yellow background with black text for primary actions
- Cards: White background with subtle borders
- Badges: Yellow background with rounded corners
- Sections: Alternating white and light gray backgrounds

## Future Enhancements

- Integration with a headless CMS for content management
- Stripe integration for payment processing
- Newsletter subscription functionality
- User authentication and dashboard
- Blog section with related content
- A/B testing for conversion optimization
