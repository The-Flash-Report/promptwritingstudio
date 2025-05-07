# Programmatic SEO Guide for PromptWritingStudio

This guide provides detailed instructions for implementing and maintaining the programmatic SEO strategy for PromptWritingStudio. The approach uses Next.js dynamic routes to generate SEO-optimized pages targeting specific keywords related to AI prompts.

## Table of Contents

1. [Strategy Overview](#strategy-overview)
2. [Technical Implementation](#technical-implementation)
3. [Content Structure](#content-structure)
4. [Keyword Research Process](#keyword-research-process)
5. [Adding New Modifier Pages](#adding-new-modifier-pages)
6. [Updating Existing Pages](#updating-existing-pages)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Best Practices](#best-practices)

## Strategy Overview

Our programmatic SEO strategy targets long-tail keywords related to specific use cases for AI prompts (e.g., "ChatGPT prompts for resume writing"). By creating dedicated pages for each use case (which we call "modifiers"), we can:

1. Capture highly targeted search traffic
2. Provide specific, valuable content to users
3. Scale our SEO efforts efficiently
4. Build topical authority in the AI prompt space

The core of this strategy is the `/chatgpt-prompts-for/[modifier].js` dynamic route, which generates pages based on JSON data files in the `/data/modifiers/` directory.

## Technical Implementation

### File Structure

```
/pages
  chatgpt-prompt-templates.js (Hub page)
  chatgpt-prompts-for/[modifier].js (Dynamic template)
/data
  /modifiers
    resume.json
    business.json
    email-marketing.json
    etc...
/lib
  modifiers.js (Helper functions)
```

### Key Components

1. **Dynamic Route**: `/pages/chatgpt-prompts-for/[modifier].js` serves as the template for all modifier pages.

2. **Data Files**: Each JSON file in `/data/modifiers/` contains all the content for a specific modifier page.

3. **Hub Page**: `/pages/chatgpt-prompt-templates.js` serves as a central directory linking to all modifier pages.

4. **Helper Functions**: `/lib/modifiers.js` contains utility functions for loading and processing modifier data.

## Content Structure

Each modifier JSON file should follow this structure:

```json
{
  "title": "ChatGPT Prompts for Resume Writing",
  "description": "Expert-crafted ChatGPT prompts for creating standout resumes. Get templates and examples to help you land your dream job.",
  "heading": "ChatGPT Prompts for Resume Writing",
  "subheading": "Use these expert-crafted prompts to create a standout resume that gets you noticed by recruiters.",
  "keywords": ["resume writing", "cv writing", "job application", "career"],
  "prompts": [
    {
      "title": "Professional Resume Summary",
      "prompt": "Create a professional resume summary for a [POSITION] with [X YEARS] experience in [INDUSTRY]. Include skills in [SKILL 1], [SKILL 2], and [SKILL 3].",
      "example": "Example output text here..."
    },
    // More prompts...
  ],
  "examples": [
    {
      "title": "Before and After Example",
      "before": "Original resume text...",
      "after": "Improved resume text..."
    }
    // More examples...
  ],
  "faqs": [
    {
      "question": "How can ChatGPT help with my resume?",
      "answer": "ChatGPT can help you craft compelling bullet points, generate professional summaries, tailor your resume to specific job descriptions, and more."
    }
    // More FAQs...
  ],
  "relatedModifiers": ["cover-letter", "linkedin-profile", "job-interview"]
}
```

## Keyword Research Process

1. **Identify Seed Keywords**: Start with broad terms like "ChatGPT prompts" or "AI prompts"

2. **Expand with Modifiers**: Use tools like Ahrefs, SEMrush, or Google Keyword Planner to find modifiers (e.g., "for resume", "for business", "for email marketing")

3. **Analyze Search Volume and Difficulty**: Prioritize keywords with:
   - Monthly search volume > 100
   - Keyword difficulty < 30
   - Clear search intent that matches our content

4. **Group by Topic Clusters**: Organize keywords into related groups that can be targeted by a single page

5. **Document in Spreadsheet**: Maintain a master keyword list in the `resources/google_us_chatgpt-prompts_matching-terms_2025-05-07_15-03-52.csv` file

## Adding New Modifier Pages

1. **Create JSON Data File**:
   - Create a new file in `/data/modifiers/` named after your modifier (e.g., `social-media.json`)
   - Follow the content structure outlined above
   - Ensure all required fields are completed

2. **Update Hub Page**:
   - Add a link to the new page in `/pages/chatgpt-prompt-templates.js`
   - Include it in the appropriate category section

3. **Test the Page**:
   - Run the development server: `npm run dev`
   - Navigate to `/chatgpt-prompts-for/[your-modifier]`
   - Verify all content displays correctly

4. **Optimize Content**:
   - Ensure title and headings include target keywords
   - Add internal links to related pages
   - Include schema markup if applicable

5. **Deploy**:
   - Commit and push changes to GitHub
   - Verify the page builds correctly on Netlify

## Updating Existing Pages

1. **Identify Pages to Update**:
   - Review analytics to find underperforming pages
   - Check for outdated content or broken links

2. **Edit JSON Data**:
   - Update the relevant JSON file in `/data/modifiers/`
   - Consider adding new prompts, examples, or FAQs

3. **Test Changes**:
   - Verify updates in development environment
   - Check responsive design on multiple devices

4. **Deploy Updates**:
   - Commit and push changes to GitHub
   - Monitor performance after updates

## Monitoring & Analytics

1. **Track Key Metrics**:
   - Organic traffic to modifier pages
   - Keyword rankings
   - Conversion rates from SEO traffic
   - Bounce rates and time on page

2. **Regular Audits**:
   - Monthly review of top-performing pages
   - Quarterly content gap analysis
   - Bi-annual comprehensive SEO audit

3. **Competitor Analysis**:
   - Monitor competitor keyword targeting
   - Identify content gaps and opportunities

## Best Practices

1. **Content Quality**:
   - Prioritize value and uniqueness over keyword density
   - Include actionable, specific prompt templates
   - Provide real examples of AI outputs

2. **Technical SEO**:
   - Ensure proper meta tags on all pages
   - Optimize page load speed
   - Use semantic HTML structure
   - Implement schema markup where appropriate

3. **Internal Linking**:
   - Link between related modifier pages
   - Create clear pathways from hub page to all modifiers
   - Use descriptive anchor text with keywords

4. **External Promotion**:
   - Share new pages on social media
   - Consider building backlinks to key pages
   - Engage with relevant communities

5. **Continuous Improvement**:
   - Regularly add new modifier pages
   - Update existing content with fresh examples
   - Refine based on user feedback and analytics

---

By following this guide, you'll be able to effectively implement and maintain the programmatic SEO strategy for PromptWritingStudio, driving targeted organic traffic and establishing authority in the AI prompt space.
