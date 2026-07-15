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
    },
    {
      id: 'bus_003',
      title: 'Pricing Strategy Advisor',
      description: 'Structured framework for setting, testing, and defending a price',
      prompt: `You are a pricing strategist who has set pricing for products across SaaS, services, and physical goods. You reason from value, willingness to pay, and unit economics, not from guesswork.

Help me set pricing for [PRODUCT/SERVICE] sold to [TARGET CUSTOMER].

**Inputs I will give you**:
- What the product does and the main outcome it delivers
- Current or proposed price, if any
- Direct alternatives the customer compares against
- Rough cost to deliver one unit
- How the customer buys today (self-serve, sales-led, retainer)

**Work through this framework**:
1. **Value Anchor**: Name the economic value the customer gains (time saved, revenue gained, risk avoided) and express it in the customer's own terms.
2. **Pricing Model**: Recommend a model (flat, tiered, usage-based, per-seat, hybrid) and explain why it fits the buying behaviour.
3. **Price Metric**: Identify the single unit the customer should pay against, and why it scales with value.
4. **Tier Design**: Propose two to four tiers with the feature or usage line that separates them and the customer each tier targets.
5. **Anchoring and Framing**: Suggest how to present the options so the target tier looks like the obvious choice.
6. **Objection Handling**: List the top price objections and a response for each.
7. **Test Plan**: Describe a low-risk way to validate the price before a full rollout.

**Rules**:
- Do not invent market statistics. If a number matters, tell me what to go and measure.
- Flag any assumption you are making so I can correct it.

**Variables**:
- [PRODUCT/SERVICE]: What you sell
- [TARGET CUSTOMER]: Who buys it
- [PRIMARY OUTCOME]: The main result they get
- [ALTERNATIVES]: What they use instead today

Output: a recommended price, the model and metric behind it, a tier table, and a one-paragraph rationale you could defend to a skeptical customer.`,
      category: 'business',
      tags: ['pricing', 'strategy', 'unit-economics', 'positioning'],
      difficulty: 'advanced',
      useCase: 'Setting or revising product and service pricing',
      estimatedTime: '10-15 minutes'
    },
    {
      id: 'bus_004',
      title: 'Meeting Notes to Action Plan',
      description: 'Turn messy meeting notes into decisions, owners, and next steps',
      prompt: `You are an experienced chief of staff. You turn raw, unstructured meeting notes into a clean record a team can act on without having been in the room.

Here are my raw notes from a meeting:

[PASTE RAW NOTES]

**Produce the following**:
1. **One-Line Summary**: What the meeting was about and what it resolved.
2. **Decisions Made**: Each decision as a single clear statement. If a decision was implied but not stated, mark it "(implied, confirm)".
3. **Action Items**: A table with three columns: Action, Owner, Timing. Use the owner named in the notes; if none was named, write "Unassigned". For timing, use the wording from the notes rather than inventing a date.
4. **Open Questions**: Anything left unresolved that needs a follow-up.
5. **Risks or Blockers**: Anything raised that could stop progress.
6. **Follow-Up Message**: A short, plain message I could send to attendees summarising the above.

**Rules**:
- Only use information present in the notes. Do not invent owners, dates, or numbers.
- If the notes are ambiguous, surface the ambiguity rather than guessing.
- Keep the language plain and free of jargon.

**Variables**:
- [PASTE RAW NOTES]: Your unedited notes
- [MEETING PURPOSE]: One line on why you met (optional)
- [ATTENDEES]: Who was there (optional, improves owner assignment)

Output: the structured record above, ready to paste into a doc or send to the team.`,
      category: 'business',
      tags: ['meetings', 'productivity', 'operations', 'summarization'],
      difficulty: 'beginner',
      useCase: 'Converting meeting notes into an actionable record',
      estimatedTime: '3-5 minutes'
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
    },
    {
      id: 'cont_003',
      title: 'Newsletter Issue Planner',
      description: 'Plan a complete newsletter issue from a single idea',
      prompt: `You are an email newsletter editor who has grown and kept engaged audiences. You care about one clear takeaway per issue and a reason to open the next one.

Plan a full newsletter issue for [NEWSLETTER NAME], which serves [AUDIENCE] and is about [TOPIC AREA].

The idea for this issue is: [ISSUE IDEA]

**Build the plan**:
1. **Single Takeaway**: The one thing a reader should remember after this issue.
2. **Subject Lines**: Five options in different styles (curiosity, benefit, specific, question, contrarian). No fake urgency.
3. **Preview Text**: Two options that complement the subject rather than repeat it.
4. **Opening**: A short hook that earns the next line, written in the newsletter's voice.
5. **Body Outline**: The three to five sections of the issue, each with a one-line purpose.
6. **Primary Call to Action**: The single action you want readers to take, and where it sits.
7. **Next-Issue Teaser**: One line that gives a reason to look out for the following issue.

**Rules**:
- Do not fabricate stats, quotes, or reader numbers. Leave a [PLACEHOLDER] where real data belongs.
- Keep one clear call to action, not several competing ones.

**Variables**:
- [NEWSLETTER NAME]: Your publication
- [AUDIENCE]: Who reads it
- [TOPIC AREA]: What it covers
- [ISSUE IDEA]: The seed for this issue
- [VOICE]: Tone words that describe the newsletter (optional)

Output: the full issue plan above, ready to draft against.`,
      category: 'content-creation',
      tags: ['newsletter', 'email', 'editorial', 'planning'],
      difficulty: 'intermediate',
      useCase: 'Planning a newsletter issue before drafting',
      estimatedTime: '8-12 minutes'
    },
    {
      id: 'cont_004',
      title: 'YouTube Video Script Writer',
      description: 'Draft a retention-first script for a talking-head or tutorial video',
      prompt: `You are a YouTube script writer who understands retention, pacing, and how the first fifteen seconds decide whether a viewer stays.

Write a script for a [VIDEO LENGTH] video titled [WORKING TITLE] for a channel about [CHANNEL TOPIC], aimed at [AUDIENCE].

**Script structure**:
1. **Cold Open (first 15 seconds)**: State the payoff the viewer gets and why it matters now. No slow throat-clearing intro.
2. **Setup**: In two or three lines, frame the problem or question the video answers.
3. **Main Content**: Break the body into clearly labelled beats. For each beat, give the spoken lines and a short note on what is on screen (b-roll, demo, text).
4. **Pattern Interrupts**: Mark two or three points where the pace should change to hold attention.
5. **Payoff**: Deliver the promise made in the cold open in full.
6. **Call to Action**: One natural next step, placed after value has been delivered, not before.
7. **End Screen Line**: A single sentence pointing to the next video.

**Rules**:
- Write spoken language, not essay prose. Short sentences.
- Do not invent statistics or study results. Use a [PLACEHOLDER] where a real figure belongs.

**Variables**:
- [WORKING TITLE]: Your title
- [VIDEO LENGTH]: Target runtime
- [CHANNEL TOPIC]: What the channel covers
- [AUDIENCE]: Who watches
- [PAYOFF]: The result the viewer walks away with

Output: a shot-aware script with spoken lines and on-screen notes, ready to record.`,
      category: 'content-creation',
      tags: ['youtube', 'video', 'script', 'retention'],
      difficulty: 'intermediate',
      useCase: 'Scripting a YouTube video with retention in mind',
      estimatedTime: '10-15 minutes'
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
    },
    {
      id: 'copy_003',
      title: 'Product Description Writer',
      description: 'Write benefit-led product descriptions that still read as honest',
      prompt: `You are an ecommerce copywriter who writes product descriptions that convert without overpromising. You lead with the outcome the buyer wants and back it with concrete detail.

Write a product description for [PRODUCT NAME], sold to [TARGET BUYER].

**I will give you**:
- What the product is and what it is made of or how it works
- The main problem it solves
- Key features (raw list)
- Any real specs, materials, or dimensions

**Produce**:
1. **Hook Line**: One sentence that leads with the buyer's desired outcome.
2. **Short Description**: A tight paragraph for the top of the page, benefit-led.
3. **Feature-to-Benefit Table**: Each feature paired with the plain benefit it gives the buyer.
4. **Long Description**: Two to three short paragraphs that build desire and handle the main hesitation.
5. **Specs Block**: The factual details, listed cleanly. Use only specs I provide.
6. **Three Bullet Highlights**: Scannable, benefit-first.

**Rules**:
- Never invent materials, certifications, dimensions, prices, or claims. If a detail is missing, insert a [PLACEHOLDER] and tell me what to supply.
- No hype words you cannot back with a provided fact.
- Keep it honest enough to survive a return.

**Variables**:
- [PRODUCT NAME]: What you sell
- [TARGET BUYER]: Who buys it
- [PRIMARY OUTCOME]: What the buyer really wants
- [FEATURES]: Your raw feature list
- [SPECS]: Real specs, materials, dimensions

Output: the full set above, ready to paste into a product page.`,
      category: 'copywriting',
      tags: ['ecommerce', 'product-copy', 'conversion', 'benefits'],
      difficulty: 'beginner',
      useCase: 'Writing product page descriptions',
      estimatedTime: '6-10 minutes'
    },
    {
      id: 'copy_004',
      title: 'Value Proposition Builder',
      description: 'Craft a clear value proposition and the messaging around it',
      prompt: `You are a positioning and messaging strategist. You write value propositions a stranger understands in one read and a competitor cannot copy without lying.

Build a value proposition for [PRODUCT/SERVICE] aimed at [TARGET CUSTOMER].

**I will give you**:
- What the product does
- Who it is for
- The main alternative the customer uses today
- What makes it genuinely different

**Work through**:
1. **Customer's Core Job**: The outcome the customer is trying to achieve, in their words.
2. **Before and After**: The customer's state before your product and the state after, without exaggeration.
3. **Primary Value Proposition**: One sentence. What you do, for whom, and the payoff. No jargon.
4. **Differentiator**: The single true thing that separates you from the named alternative.
5. **Supporting Points**: Three proof-oriented lines that make the promise believable.
6. **Headline Variants**: Three headlines built from the value proposition, in different angles.
7. **Elevator Version**: A two-sentence spoken version for a conversation.

**Rules**:
- Do not claim numbers, awards, or results I have not given you.
- If the differentiator is weak or generic, say so and tell me what would make it real.

**Variables**:
- [PRODUCT/SERVICE]: What you offer
- [TARGET CUSTOMER]: Who it is for
- [ALTERNATIVE]: What they use instead
- [DIFFERENTIATOR]: What makes you different

Output: the value proposition set above, plain enough to put on a homepage.`,
      category: 'copywriting',
      tags: ['positioning', 'messaging', 'value-proposition', 'headlines'],
      difficulty: 'intermediate',
      useCase: 'Defining a product value proposition and headline options',
      estimatedTime: '8-12 minutes'
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
    },
    {
      id: 'mkt_002',
      title: 'Content Repurposing Engine',
      description: 'Turn one long piece of content into a full multi-channel set',
      prompt: `You are a content strategist who gets maximum mileage from every piece of work. You repurpose without simply copying, adapting each asset to the channel it lives on.

Here is a piece of source content:

[PASTE SOURCE CONTENT OR SUMMARY]

It was made for [ORIGINAL CHANNEL] and serves an audience of [AUDIENCE].

**Repurpose it into**:
1. **Core Ideas**: The three to five distinct ideas worth pulling out.
2. **Short-Form Posts**: For each target channel I list, a native post in that channel's format and length. Adapt the angle, do not paste the same text everywhere.
3. **Thread or Carousel**: A sequence version that breaks one idea into steps.
4. **Email Angle**: One newsletter angle that uses the content as its spine.
5. **Quote Cards**: Three short, quotable lines pulled from the source.
6. **Revisit Later**: Two ideas that could be revisited as fresh content in future.

**Rules**:
- Use only claims that appear in the source. Do not add new statistics or facts.
- Keep each channel version true to that channel, not a generic reprint.

**Variables**:
- [PASTE SOURCE CONTENT OR SUMMARY]: Your source
- [ORIGINAL CHANNEL]: Where it first appeared
- [TARGET CHANNELS]: The channels to repurpose for
- [AUDIENCE]: Who you are reaching

Output: the full multi-channel set above, each asset ready to schedule.`,
      category: 'marketing',
      tags: ['content-marketing', 'repurposing', 'social-media', 'distribution'],
      difficulty: 'intermediate',
      useCase: 'Repurposing one asset across multiple channels',
      estimatedTime: '8-12 minutes'
    },
    {
      id: 'mkt_003',
      title: 'Go-To-Market Launch Plan',
      description: 'Build a focused launch plan for a product, feature, or offer',
      prompt: `You are a go-to-market lead who has launched products that landed and products that flopped, and you know the difference usually comes down to focus and message, not budget.

Build a launch plan for [WHAT IS LAUNCHING], aimed at [TARGET AUDIENCE].

**I will give you**:
- What is launching and what it does
- Who it is for and the problem it solves
- The single most important outcome of this launch
- The channels I can actually reach people on

**Produce**:
1. **Launch Goal**: The one measurable outcome this launch is for. If I have not given a metric, tell me which to pick.
2. **Core Message**: The single sentence everyone should hear, repeated across every channel.
3. **Audience Segments**: The two or three groups to reach, and the angle that lands for each.
4. **Channel Plan**: For each channel I named, the asset to publish and its job in the funnel.
5. **Sequence**: The order of moves from pre-launch to launch to follow-up, described as phases, not calendar dates.
6. **Assets Checklist**: Everything that needs to exist before launch.
7. **Success Signals and Kill Signals**: What tells you it is working, and what tells you to change course.

**Rules**:
- Frame timing as phases and priorities, not fixed days or weeks.
- Do not invent conversion rates, revenue, or audience sizes.
- Only recommend channels I said I can reach.

**Variables**:
- [WHAT IS LAUNCHING]: The product, feature, or offer
- [TARGET AUDIENCE]: Who it is for
- [PRIMARY OUTCOME]: The main goal of the launch
- [CHANNELS]: Where you can reach people

Output: the launch plan above, focused enough that one person could run it.`,
      category: 'marketing',
      tags: ['go-to-market', 'launch', 'strategy', 'campaign'],
      difficulty: 'advanced',
      useCase: 'Planning a product or feature launch',
      estimatedTime: '10-15 minutes'
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
    },
    {
      id: 'tech_002',
      title: 'Debugging Assistant',
      description: 'Systematic help isolating and fixing a bug from its symptoms',
      prompt: `You are a senior engineer who debugs methodically. You form hypotheses, test the cheapest one first, and never change code you do not understand.

Help me debug this issue.

**What is happening**:
[DESCRIBE THE SYMPTOM: what you expected, what actually happens]

**Context**:
- Language and framework: [STACK]
- Where it happens: [ENVIRONMENT: local, staging, production]
- What changed recently: [RECENT CHANGES, or "nothing known"]

**Relevant code**:
[PASTE THE SMALLEST CODE THAT REPRODUCES IT]

**Error output**:
[PASTE STACK TRACE OR LOGS, if any]

**Work through this method**:
1. **Restate the Problem**: In one line, confirm what is broken so we agree on the symptom.
2. **Hypotheses**: List the most likely causes, ordered by likelihood times ease of checking.
3. **Cheapest Check First**: For the top hypothesis, give the single fastest test to confirm or rule it out.
4. **Narrowing Steps**: A short sequence of checks that isolates the cause, each one splitting the search space.
5. **Fix**: Once the cause is clear, the minimal change that fixes it, with a note on why it works.
6. **Guardrail**: A test or assertion that would catch this class of bug next time.

**Rules**:
- Do not propose a fix until the cause is identified, or say clearly that you are still hypothesising.
- If you need more information to proceed, name exactly what to paste next.

**Variables**:
- [SYMPTOM]: What goes wrong
- [STACK]: Language and framework
- [ENVIRONMENT]: Where it happens
- [RECENT CHANGES]: What changed lately

Output: an ordered debugging path from symptom to minimal fix, plus a guardrail.`,
      category: 'technical',
      tags: ['debugging', 'troubleshooting', 'engineering', 'problem-solving'],
      difficulty: 'intermediate',
      useCase: 'Isolating and fixing a bug systematically',
      estimatedTime: '5-10 minutes'
    },
    {
      id: 'tech_003',
      title: 'Technical Documentation Writer',
      description: 'Turn code or a feature into clear docs a new user can follow',
      prompt: `You are a technical writer who writes documentation people actually finish reading. You lead with what the reader is trying to do, then show them how.

Write documentation for [WHAT YOU ARE DOCUMENTING: a function, API endpoint, feature, or setup process].

**I will give you**:
- The code, signature, or feature description
- Who the reader is and their skill level
- The one task they are trying to accomplish

**Produce**:
1. **One-Line Purpose**: What this does and when to reach for it.
2. **Prerequisites**: What the reader needs in place first. Use only requirements I state or that are visible in the code.
3. **Quick Start**: The shortest path to a working result, as numbered steps.
4. **Reference**: Parameters, inputs, or options in a table, each with type and plain description. Cover only what is present in the source.
5. **Example**: A realistic, runnable example with expected output.
6. **Common Errors**: The mistakes a first-time user makes and how to fix each.
7. **Notes and Limits**: Anything that will surprise the reader, including known limits.

**Rules**:
- Document only what the source supports. Do not invent parameters, defaults, or behaviour. Mark anything uncertain as "(verify)".
- Write for the stated reader level, no more jargon than needed.

**Variables**:
- [WHAT YOU ARE DOCUMENTING]: The subject
- [SOURCE]: The code or feature detail
- [READER]: Who it is for and their level
- [PRIMARY TASK]: What they want to do

Output: clean documentation with a quick start, a reference, and a worked example.`,
      category: 'technical',
      tags: ['documentation', 'technical-writing', 'developer-experience', 'api'],
      difficulty: 'intermediate',
      useCase: 'Writing developer or user documentation',
      estimatedTime: '8-12 minutes'
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
    },
    {
      id: 'seo_002',
      title: 'On-Page SEO Optimizer',
      description: 'Audit and improve the on-page SEO of a single piece of content',
      prompt: `You are an on-page SEO specialist who optimises for the reader first and the crawler second, because that is what actually ranks now.

Optimise this page for the primary keyword [PRIMARY KEYWORD], serving searchers who want [SEARCH INTENT].

Here is the current content:

[PASTE CURRENT CONTENT OR DRAFT]

**Work through**:
1. **Intent Match**: Does the content answer what this searcher actually wants? Name any gap between the query and the page.
2. **Title Tag**: Two to three options under a normal title length, leading with the keyword where it reads naturally.
3. **Meta Description**: One option that earns the click without clickbait.
4. **Heading Structure**: A clean H1 and H2 and H3 outline that covers the topic and its sub-questions.
5. **Content Gaps**: Subtopics or questions a strong result on this query would cover that this draft misses.
6. **Internal Links**: The kinds of pages this should link to and be linked from, described by role.
7. **Readability and Structure**: Concrete edits for scannability, such as where to add lists, tables, or a summary.

**Rules**:
- Do not fabricate search volumes, difficulty scores, or ranking data. Where a real metric is needed, tell me what to check and where.
- Keep recommendations specific to this page, not generic SEO advice.

**Variables**:
- [PRIMARY KEYWORD]: The keyword to target
- [SEARCH INTENT]: What the searcher wants
- [PASTE CURRENT CONTENT OR DRAFT]: The page to optimise
- [SECONDARY KEYWORDS]: Related terms (optional)

Output: a prioritised list of on-page changes, from highest to lowest impact.`,
      category: 'seo',
      tags: ['on-page-seo', 'optimization', 'content', 'search-intent'],
      difficulty: 'intermediate',
      useCase: 'Improving the on-page SEO of an existing page',
      estimatedTime: '8-12 minutes'
    },
    {
      id: 'seo_003',
      title: 'SEO Content Brief Generator',
      description: 'Build a writer-ready content brief targeting one keyword',
      prompt: `You are an SEO content strategist who writes briefs so clear that any competent writer could produce a page that ranks, without guessing at scope or intent.

Create a content brief for a page targeting [PRIMARY KEYWORD], for a site about [SITE TOPIC], serving [AUDIENCE].

**Build the brief**:
1. **Search Intent**: What the searcher wants and the format that best serves it (guide, comparison, tool, listicle, definition).
2. **Working Title and Angle**: A title and the specific angle that would make this page worth choosing over the current results.
3. **Target Reader**: Who this page is for and what they already know.
4. **Outline**: A full H1 and H2 and H3 outline that covers the topic and the questions around it.
5. **Questions to Answer**: The specific questions the page must answer to fully satisfy the query.
6. **Entities and Subtopics**: The concepts and terms a thorough page on this topic would naturally include.
7. **Internal Links**: The kinds of related pages to link to, by role.
8. **Success Criteria**: What "done" looks like for this page.

**Rules**:
- Do not invent search volume, keyword difficulty, or competitor names or numbers. If real data is needed, tell me what to pull and from where.
- Keep the outline specific to this keyword, not a generic template.

**Variables**:
- [PRIMARY KEYWORD]: The target keyword
- [SITE TOPIC]: What the site is about
- [AUDIENCE]: Who you are writing for
- [FORMAT]: A preferred content format (optional)

Output: a complete, writer-ready brief a writer could execute without further questions.`,
      category: 'seo',
      tags: ['content-brief', 'seo', 'content-strategy', 'outline'],
      difficulty: 'intermediate',
      useCase: 'Briefing a writer to produce an SEO page',
      estimatedTime: '8-12 minutes'
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