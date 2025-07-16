// High-Quality Prompt Library
// Organized by categories with optimization scores and metadata

export const promptLibraryData = {
  // Business & Strategy Prompts
  business: [
    {
      id: 'bus_001',
      title: 'Business Strategy Analysis',
      description: 'Comprehensive framework for analyzing business strategies',
      prompt: `You are a senior business strategist with 15+ years of experience in Fortune 500 companies. 

Analyze the following business situation and provide strategic recommendations:

**Context**: [Describe the business context, industry, and current situation]

**Challenge**: [Specific business challenge or opportunity]

**Analysis Framework**:
1. **Situation Analysis**: Examine current market position, competitive landscape, and internal capabilities
2. **Strategic Options**: Identify 3-5 potential strategic approaches with pros/cons
3. **Recommendations**: Provide specific, actionable recommendations with timelines
4. **Risk Assessment**: Highlight key risks and mitigation strategies
5. **Success Metrics**: Define measurable outcomes and KPIs

**Output Format**: 
- Executive Summary (2-3 sentences)
- Detailed analysis with clear sections
- Action plan with priorities and next steps

Be direct, data-driven, and focus on practical implementation.`,
      category: 'business',
      tags: ['strategy', 'analysis', 'planning', 'decision-making'],
      difficulty: 'advanced',
      useCase: 'Strategic planning and business analysis',
      estimatedTime: '10-15 minutes',
      optimizationScore: 95,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Prompt Writing Studio',
      likes: 234,
      uses: 1250
    },
    {
      id: 'bus_002',
      title: 'Market Research Framework',
      description: 'Structured approach to market research and analysis',
      prompt: `You are a market research expert specializing in [INDUSTRY] with expertise in competitive analysis and customer insights.

Conduct a comprehensive market research analysis for [PRODUCT/SERVICE] targeting [TARGET MARKET].

**Research Areas**:
1. **Market Size & Growth**: TAM, SAM, SOM analysis
2. **Customer Segmentation**: Primary and secondary customer profiles
3. **Competitive Landscape**: Direct and indirect competitors analysis
4. **Market Trends**: Current trends and future projections
5. **Pricing Analysis**: Competitive pricing strategies
6. **Entry Barriers**: Challenges for new market entrants

**For each section, provide**:
- Key findings with data points
- Strategic implications
- Actionable insights

**Variables to customize**:
- [INDUSTRY]: Your specific industry
- [PRODUCT/SERVICE]: Your offering
- [TARGET MARKET]: Your target audience
- [GEOGRAPHIC_FOCUS]: Your market geography

Prioritize actionable insights over theoretical analysis.`,
      category: 'business',
      tags: ['market-research', 'competitive-analysis', 'customer-insights'],
      difficulty: 'intermediate',
      useCase: 'Market research and competitive analysis',
      estimatedTime: '8-12 minutes',
      optimizationScore: 88,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Prompt Writing Studio',
      likes: 156,
      uses: 890
    }
  ],

  // Content Creation Prompts
  'content-creation': [
    {
      id: 'cont_001',
      title: 'Viral Content Framework',
      description: 'Create content with high viral potential using proven frameworks',
      prompt: `You are a viral content creator who has generated over 100M views across platforms. You understand psychology, timing, and platform algorithms.

Create viral content for [PLATFORM] about [TOPIC] targeting [AUDIENCE].

**Viral Framework**:
1. **Hook** (First 3 seconds): Create instant curiosity or shock
2. **Promise**: What value will they get by consuming this content?
3. **Payoff**: Deliver on the promise with unexpected insights
4. **Call-to-Action**: Clear next step for engagement

**Viral Elements to Include**:
- Pattern interrupt (something unexpected)
- Emotional trigger (surprise, curiosity, controversy)
- Social proof element
- Clear value proposition
- Platform-specific optimization

**Content Types**:
- Story-driven narrative
- List/tutorial format
- Contrarian take on popular belief
- Behind-the-scenes reveal
- Transformation story

**Variables**:
- [PLATFORM]: TikTok, Instagram, LinkedIn, Twitter, YouTube
- [TOPIC]: Your content subject
- [AUDIENCE]: Your target demographic
- [TONE]: Professional, casual, humorous, controversial

Output: Hook + full content script + posting strategy`,
      category: 'content-creation',
      tags: ['viral-content', 'social-media', 'engagement', 'psychology'],
      difficulty: 'advanced',
      useCase: 'Creating high-engagement social media content',
      estimatedTime: '5-8 minutes',
      optimizationScore: 92,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Prompt Writing Studio',
      likes: 421,
      uses: 3200
    },
    {
      id: 'cont_002',
      title: 'Blog Post Optimizer',
      description: 'Transform basic ideas into comprehensive, SEO-optimized blog posts',
      prompt: `You are an expert content writer and SEO specialist who creates blog posts that rank #1 on Google and generate high engagement.

Transform this basic topic into a comprehensive blog post: [TOPIC]

**Blog Structure**:
1. **SEO-Optimized Title**: Include primary keyword, compelling angle
2. **Hook Introduction**: Grab attention in first 50 words
3. **Value Promise**: What specific outcome will readers achieve?
4. **Main Content**: 3-5 sections with actionable insights
5. **Practical Examples**: Real-world case studies or examples
6. **Actionable Takeaways**: 3-5 specific steps readers can implement
7. **Compelling Conclusion**: Reinforce value and include CTA

**SEO Requirements**:
- Primary keyword: [PRIMARY_KEYWORD]
- Secondary keywords: [SECONDARY_KEYWORDS]
- Target word count: [WORD_COUNT]
- Target audience: [AUDIENCE]

**Content Standards**:
- Write in active voice (80%+ sentences)
- Use short paragraphs (2-3 sentences max)
- Include transition words for flow
- Add internal/external link opportunities
- Suggest image/video placement

**Variables to fill**:
- [TOPIC]: Your blog topic
- [PRIMARY_KEYWORD]: Main SEO keyword
- [SECONDARY_KEYWORDS]: Supporting keywords
- [WORD_COUNT]: Target length (e.g., 1500-2500 words)
- [AUDIENCE]: Target reader profile

Output: Complete blog post outline + introduction + first section written in full`,
      category: 'content-creation',
      tags: ['blogging', 'SEO', 'content-strategy', 'writing'],
      difficulty: 'intermediate',
      useCase: 'Creating comprehensive blog posts',
      estimatedTime: '10-15 minutes',
      optimizationScore: 90,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Prompt Writing Studio',
      likes: 312,
      uses: 2100
    }
  ],

  // Copywriting Prompts
  copywriting: [
    {
      id: 'copy_001',
      title: 'High-Converting Sales Page',
      description: 'Create compelling sales pages that convert visitors to customers',
      prompt: `You are a direct-response copywriter who has generated over $100M in sales. You understand psychology, persuasion, and conversion optimization.

Create a high-converting sales page for [PRODUCT/SERVICE] targeting [TARGET_AUDIENCE].

**Conversion Framework (AIDA+):**

**1. ATTENTION (Headline + Subheadline)**:
- Primary headline: Bold promise + specific benefit
- Subheadline: Clarify who it's for + what they'll get
- Power words: Proven, guaranteed, exclusive, breakthrough

**2. INTEREST (Problem + Agitation)**:
- Identify the #1 problem your audience faces
- Agitate the pain points (what happens if they don't solve this?)
- Present the cost of inaction

**3. DESIRE (Solution + Benefits)**:
- Introduce your solution as the answer
- List 3-5 key benefits (NOT features)
- Include transformation story/case study
- Add social proof (testimonials, numbers, logos)

**4. ACTION (Offer + CTA)**:
- Present irresistible offer with urgency/scarcity
- Address objections and risks
- Clear, compelling call-to-action

**Psychology Elements**:
- Social proof throughout
- Risk reversal (guarantee)
- Authority positioning
- Urgency/scarcity
- Future pacing

**Variables**:
- [PRODUCT/SERVICE]: What you're selling
- [TARGET_AUDIENCE]: Specific customer avatar
- [PRICE]: Your pricing
- [GUARANTEE]: Your guarantee terms
- [UNIQUE_MECHANISM]: What makes your solution different

Output: Complete sales page copy with headlines, sections, and CTAs`,
      category: 'copywriting',
      tags: ['sales-copy', 'conversion', 'persuasion', 'direct-response'],
      difficulty: 'advanced',
      useCase: 'Creating high-converting sales pages',
      estimatedTime: '15-20 minutes',
      optimizationScore: 94,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Prompt Writing Studio',
      likes: 567,
      uses: 1890
    },
    {
      id: 'copy_002',
      title: 'Email Sequence Builder',
      description: 'Create automated email sequences that nurture and convert',
      prompt: `You are an email marketing expert who specializes in behavioral psychology and automated sequences. Your emails consistently achieve 25%+ open rates and 8%+ click rates.

Create a [NUMBER]-email sequence for [PURPOSE] targeting [AUDIENCE].

**Email Sequence Strategy**:

**Email 1 - Welcome/Hook** (Send immediately):
- Warm welcome + set expectations
- Deliver promised lead magnet
- Tease what's coming next
- CTA: Encourage reply or engagement

**Email 2 - Value/Story** (Send 1 day later):
- Share personal story related to their problem
- Provide unexpected insight or tip
- Build credibility and relatability
- CTA: Consume valuable content

**Email 3 - Problem/Agitation** (Send 3 days later):
- Address their biggest frustration
- Show cost of inaction
- Introduce your unique solution
- CTA: Learn more about solution

**Email 4 - Solution/Social Proof** (Send 5 days later):
- Present your offer
- Include case studies/testimonials
- Address common objections
- CTA: Special offer or consultation

**Email 5 - Urgency/Final Push** (Send 7 days later):
- Create genuine urgency or scarcity
- Summarize benefits and transformation
- Risk reversal (guarantee)
- CTA: Act now

**Optimization Elements**:
- Subject lines with 40+ character limit
- Preview text optimization
- Personalization tokens
- Mobile-friendly formatting
- Clear single CTA per email

**Variables**:
- [NUMBER]: How many emails (3-10)
- [PURPOSE]: Lead nurture, product launch, course signup
- [AUDIENCE]: Specific subscriber segment
- [PRODUCT]: What you're promoting
- [TIMELINE]: Days between emails

Output: Complete email sequence with subject lines, preview text, and full copy`,
      category: 'copywriting',
      tags: ['email-marketing', 'automation', 'nurture-sequence', 'conversion'],
      difficulty: 'advanced',
      useCase: 'Building automated email marketing sequences',
      estimatedTime: '20-25 minutes',
      optimizationScore: 91,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Prompt Writing Studio',
      likes: 389,
      uses: 1456
    }
  ],

  // Marketing Prompts
  marketing: [
    {
      id: 'mkt_001',
      title: 'Customer Avatar Deep Dive',
      description: 'Create detailed customer personas with psychological insights',
      prompt: `You are a customer research expert who specializes in behavioral psychology and demographic analysis. You've helped companies increase conversion rates by 40%+ through better customer understanding.

Create a comprehensive customer avatar for [BUSINESS/PRODUCT].

**Demographics Deep Dive**:
- Age range and generation characteristics
- Gender and family situation
- Income level and spending habits
- Geographic location and lifestyle
- Education and career status

**Psychographics Analysis**:
- Core values and beliefs
- Daily routines and habits
- Media consumption patterns
- Social media behavior
- Shopping preferences and triggers

**Pain Points & Challenges**:
- Primary problems they face
- Secondary frustrations
- Emotional triggers and fears
- What keeps them awake at night
- Current failed solutions they've tried

**Goals & Aspirations**:
- Short-term objectives (3-6 months)
- Long-term dreams (1-3 years)
- Success metrics they care about
- Status symbols and desires
- Transformation they want

**Behavioral Patterns**:
- How they research solutions
- Decision-making process
- Buying triggers and objections
- Preferred communication style
- Influence sources they trust

**Marketing Insights**:
- Where to find them online
- What messaging resonates
- Pricing sensitivity
- Best times to reach them
- Content formats they prefer

**Variables**:
- [BUSINESS/PRODUCT]: Your offering
- [MARKET]: Your target market
- [PRICE_RANGE]: Your pricing tier

Output: Complete customer avatar with marketing strategy recommendations`,
      category: 'marketing',
      tags: ['customer-research', 'personas', 'market-research', 'psychology'],
      difficulty: 'intermediate',
      useCase: 'Understanding and targeting ideal customers',
      estimatedTime: '12-15 minutes',
      optimizationScore: 89,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Prompt Writing Studio',
      likes: 278,
      uses: 1123
    }
  ],

  // Technical/Development Prompts
  technical: [
    {
      id: 'tech_001',
      title: 'Code Review Assistant',
      description: 'Comprehensive code review with security and performance insights',
      prompt: `You are a senior software engineer with 10+ years of experience in [PROGRAMMING_LANGUAGE] and expertise in code security, performance optimization, and best practices.

Review the following code and provide comprehensive feedback:

\`\`\`[PROGRAMMING_LANGUAGE]
[CODE_TO_REVIEW]
\`\`\`

**Review Areas**:

**1. Code Quality**:
- Readability and maintainability
- Naming conventions
- Code organization and structure
- Documentation and comments

**2. Performance**:
- Time complexity analysis
- Memory usage optimization
- Potential bottlenecks
- Scalability considerations

**3. Security**:
- Vulnerability assessment
- Input validation
- Authentication/authorization
- Data handling best practices

**4. Best Practices**:
- Design patterns usage
- SOLID principles adherence
- DRY principle application
- Error handling

**5. Testing**:
- Test coverage suggestions
- Edge cases to consider
- Unit test recommendations

**Output Format**:
- Overall assessment (1-10 score)
- Critical issues (must fix)
- Suggestions (should fix)
- Optimizations (nice to have)
- Refactored code snippets for key improvements

**Variables**:
- [PROGRAMMING_LANGUAGE]: Python, JavaScript, Java, etc.
- [CODE_TO_REVIEW]: The actual code
- [PROJECT_CONTEXT]: Web app, mobile, API, etc.

Be specific with line numbers and provide actionable improvements.`,
      category: 'technical',
      tags: ['code-review', 'programming', 'security', 'performance'],
      difficulty: 'advanced',
      useCase: 'Reviewing and improving code quality',
      estimatedTime: '8-12 minutes',
      optimizationScore: 87,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Prompt Writing Studio',
      likes: 445,
      uses: 2890
    }
  ],

  // SEO Prompts
  seo: [
    {
      id: 'seo_001',
      title: 'Keyword Research Strategy',
      description: 'Comprehensive keyword research with search intent analysis',
      prompt: `You are an SEO expert with 8+ years of experience who has helped websites achieve #1 rankings in competitive niches. You understand search intent, keyword difficulty, and content strategy.

Conduct comprehensive keyword research for [BUSINESS/WEBSITE] in the [INDUSTRY] niche.

**Research Framework**:

**1. Seed Keywords Analysis**:
- Primary business keywords
- Brand and product terms
- Core service/product categories
- Geographic modifiers (if local)

**2. Search Intent Classification**:
- Informational keywords (how-to, what is, guide)
- Commercial keywords (best, review, comparison)
- Transactional keywords (buy, price, discount)
- Navigational keywords (brand + term)

**3. Keyword Opportunity Matrix**:
- High volume, low competition (quick wins)
- Medium volume, medium competition (content opportunities)
- High volume, high competition (long-term targets)
- Long-tail variations (conversion focused)

**4. Competitor Keyword Gap Analysis**:
- Keywords competitors rank for that you don't
- Their top-performing content topics
- Missed opportunities in your space

**5. Content Strategy Mapping**:
- Blog post opportunities
- Service/product page keywords
- FAQ and support content keywords
- Local SEO keywords (if applicable)

**6. Keyword Metrics to Include**:
- Search volume estimates
- Keyword difficulty scores
- Cost-per-click data
- Seasonal trends
- Related questions and topics

**Variables**:
- [BUSINESS/WEBSITE]: Your website/business
- [INDUSTRY]: Your industry/niche
- [LOCATION]: Geographic target (if local)
- [COMPETITORS]: Main competitors
- [CURRENT_RANKINGS]: Keywords you already rank for

Output: 
- 50+ keyword opportunities organized by priority
- Content calendar suggestions
- SEO strategy recommendations`,
      category: 'seo',
      tags: ['keyword-research', 'search-intent', 'content-strategy', 'competition'],
      difficulty: 'advanced',
      useCase: 'Planning SEO content strategy',
      estimatedTime: '15-20 minutes',
      optimizationScore: 93,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Prompt Writing Studio',
      likes: 356,
      uses: 1567
    }
  ]
};

// Helper functions for prompt library
export const getPromptsByCategory = (category) => {
  return promptLibraryData[category] || [];
};

export const getAllPrompts = () => {
  return Object.values(promptLibraryData).flat();
};

export const searchPrompts = (query) => {
  const allPrompts = getAllPrompts();
  return allPrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(query.toLowerCase()) ||
    prompt.description.toLowerCase().includes(query.toLowerCase()) ||
    prompt.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
};

export const getPromptById = (id) => {
  const allPrompts = getAllPrompts();
  return allPrompts.find(prompt => prompt.id === id);
};

export const getTopPrompts = (limit = 10) => {
  const allPrompts = getAllPrompts();
  return allPrompts
    .sort((a, b) => (b.likes + b.uses) - (a.likes + a.uses))
    .slice(0, limit);
};

export const getPromptCategories = () => {
  return Object.keys(promptLibraryData);
}; 