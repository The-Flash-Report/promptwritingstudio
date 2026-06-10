// Course-derived "guided builder" templates that use real machine slots
// ({{slot}}), as opposed to the free-text [bracket] guidance in the broader
// prompt library. These are the prompts the studio's guided builders fill in
// from structured inputs, then hand to the gateway.
//
// Keep `body` slots in {{double_brace}} form — that's what the slot-filling
// engine in lib/templates/index.js extracts and renders.

export const studioTemplates = [
  {
    id: 'tpl-cold-outreach-email',
    title: 'Cold Outreach Email',
    description: 'A concise, personalised B2B cold email with a single clear ask.',
    category: 'copywriting',
    useCase: 'B2B cold outreach',
    tags: ['email', 'sales', 'outreach'],
    difficulty: 'intermediate',
    sourceModule: 'course:outreach-emails',
    body: `You are an expert B2B copywriter. Write a cold outreach email to a {{recipient_role}} at {{company}}.

Goal of the email: {{goal}}
What we offer: {{offer}}
Desired call to action: {{cta}}

Constraints:
- Under 120 words, plain text, no subject-line clichés.
- Open with a specific, relevant observation — not "I hope this finds you well".
- One clear ask only.`,
  },
  {
    id: 'tpl-blog-outline',
    title: 'SEO Blog Post Outline',
    description: 'A structured, search-intent-aware outline for a blog post.',
    category: 'seo',
    useCase: 'Content planning',
    tags: ['seo', 'content', 'outline'],
    difficulty: 'beginner',
    sourceModule: 'course:content-planning',
    body: `Create a detailed blog post outline.

Topic: {{topic}}
Primary keyword: {{keyword}}
Target reader: {{audience}}
Desired word count: {{word_count}}

Return an H1, 5-8 H2 sections (each with 2-3 bullet sub-points), and a one-line meta description. Match the search intent for the primary keyword.`,
  },
  {
    id: 'tpl-product-description',
    title: 'Ecommerce Product Description',
    description: 'A benefit-led product description in a specified brand voice.',
    category: 'marketing',
    useCase: 'Ecommerce copy',
    tags: ['ecommerce', 'product', 'copywriting'],
    difficulty: 'beginner',
    sourceModule: 'course:ecommerce-copy',
    body: `Write a product description for an online store.

Product: {{product}}
Key features: {{features}}
Target customer: {{audience}}
Brand voice: {{voice}}

Lead with the main benefit, weave in the features as benefits, and end with a short call to action. Keep it under 90 words.`,
  },
]
