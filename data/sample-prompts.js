// Sample prompts for the AI Prompt Examples page
export const samplePrompts = [
  // Content Ideation Category
  {
    id: 1,
    title: "Content Brainstorm Based on Expertise",
    description: "Generate original content ideas based on your unique knowledge",
    prompt: "As a [your role] with expertise in [your specialty areas], help me brainstorm 10 unique content ideas that showcase my perspective on [topic]. Each idea should highlight my belief that [your unique viewpoint]. Make sure the ideas reflect my [formal/conversational/technical] communication style and include opportunities to use my signature phrases like \"[your common expressions]\".",
    personalizationTip: "Include specific pain points you know your audience struggles with to make ideas more relevant.",
    category: "Content Ideation"
  },
  {
    id: 2,
    title: "Blog Post Draft in Your Voice",
    description: "Generate complete blog post drafts that sound like you",
    prompt: "Write a blog post draft about [topic] for my audience of [your audience]. The post should maintain my [voice characteristics] and include my typical structure of [your typical post structure]. Incorporate my perspective that [your unique viewpoint on this topic] and use phrases I commonly use like \"[your phrases]\". Include appropriate [technical terms/analogies/statistics] that align with my level of [formality/expertise]. The post should address my audience's challenge of [specific pain point] and offer my approach to solving it.",
    personalizationTip: "Include links to 1-2 of your existing blog posts to help AI match your style more precisely.",
    category: "Writing Assistance"
  },
  
  // Audience Engagement Category
  {
    id: 3,
    title: "Discussion-Generating Question Series",
    description: "Create engaging conversation starters",
    prompt: "Generate a series of 5 thought-provoking questions about [topic] that I can use to engage my audience. The questions should reflect my [voice characteristics] and thinking style as someone who believes [your philosophy related to this topic]. Frame each question using my typical questioning approach of [your question style, e.g., \"starting with context, challenging a common assumption, then asking for personal experience\"]. Include follow-up prompts that sound like my natural conversational style.",
    personalizationTip: "Include specific question formats that have generated good discussion for you in the past.",
    category: "Audience Engagement"
  },
  
  // Branding & Messaging Category
  {
    id: 4,
    title: "Core Message Articulation",
    description: "Define your primary message in your authentic voice",
    prompt: "Help me articulate my core message about [your primary topic/approach] in a way that maintains my [voice characteristics] and differentiates me from others in my field. The message should incorporate my foundational belief that [your core philosophy] and use phrases that sound like me such as \"[your phrases]\". Create variations of this message at different lengths (5 words, 15 words, 30 words, 60 words) while preserving my authentic voice and key differentiation points.",
    personalizationTip: "Include specific objections to your approach that you want to preemptively address in your messaging.",
    category: "Branding & Messaging"
  },
  
  // Sales & Nurture Category
  {
    id: 5,
    title: "Non-Pushy Sales Page Sections",
    description: "Create conversion content that maintains your integrity",
    prompt: "Draft the following sections for a sales page about my [offering] while maintaining my [voice characteristics] and non-pushy sales approach: [list needed sections]. The content should incorporate my sales philosophy that [your belief about ethical selling] and use phrases that sound like me such as \"[your phrases]\". Address my audience's challenge of [key pain point] and present my offering as the solution through my unique methodology of [your approach], all while preserving my authentic voice and integrity.",
    personalizationTip: "Include specific language patterns you use to invite consideration rather than pressure decisions.",
    category: "Sales & Nurture"
  },
  
  // Repurposing & Efficiency Category
  {
    id: 6,
    title: "Content Atomization Framework",
    description: "Break down larger content into platform-specific pieces",
    prompt: "Help me break down my [longer content piece, e.g., \"blog post, podcast episode\"] about [topic] into smaller content pieces for [list target platforms], while maintaining my [voice characteristics] and content approach. For each platform, create [number] content pieces that incorporate my perspective that [relevant philosophy] and use phrases that sound like me such as \"[your phrases]\". Ensure each piece works independently while encouraging consumption of the full original content.",
    personalizationTip: "Include specific content proportions or emphasis shifts you prefer for each platform.",
    category: "Repurposing & Efficiency"
  },
  
  // Industry-Specific: Coaching & Consulting
  {
    id: 7,
    title: "Client Case Study Framework",
    description: "Create compelling client success stories for coaches and consultants",
    prompt: "As a coach/consultant specializing in [your specialty], help me create a case study about my client [use initials or fictional name] who achieved [specific results]. The case study should follow my typical narrative style of [your storytelling approach] and highlight my unique methodology of [your approach/framework name]. Include my perspective that [your philosophy on transformation] and use phrases I commonly use like \"[your signature phrases]\". Structure this as a before/during/after story that emphasizes the specific challenges, the work we did together, and the measurable outcomes.",
    personalizationTip: "Include specific metrics or testimonial quotes from the actual client to make the case study more credible.",
    category: "Coaching & Consulting"
  },
  {
    id: 8,
    title: "Coaching Program Curriculum Outline",
    description: "Design a structured coaching program that reflects your methodology",
    prompt: "Help me outline a [duration] coaching program on [topic/transformation] that reflects my [voice characteristics] and coaching philosophy that [your core belief about coaching]. The program should include [number] modules, each with clear learning objectives, exercises, and accountability measures. Incorporate my unique approach of [your methodology] and use language that sounds like me such as \"[your phrases]\". For each module, suggest a powerful coaching question I could ask clients to prompt deeper reflection.",
    personalizationTip: "Include specific client transformation stories to illustrate the potential outcomes of each module.",
    category: "Coaching & Consulting"
  },
  
  // Industry-Specific: E-commerce & Product Marketing
  {
    id: 9,
    title: "Product Description Suite",
    description: "Create compelling product descriptions for e-commerce",
    prompt: "Write product descriptions for my [product name] in my brand voice that is [voice characteristics]. Create 4 versions: (1) a short 50-word description for category pages, (2) a detailed 200-word description for the product page, (3) 5 bullet points highlighting key features and benefits, and (4) 3 customer-centric FAQs with answers. Incorporate my brand's perspective that [your unique selling proposition] and use phrases that sound like my brand such as \"[your brand phrases]\". Emphasize how this product solves the customer problem of [specific pain point].",
    personalizationTip: "Include specific materials, dimensions, or technical specifications to ensure accuracy.",
    category: "E-commerce & Product Marketing"
  },
  {
    id: 10,
    title: "Email Marketing Sequence for Product Launch",
    description: "Create a strategic email sequence to launch a new product",
    prompt: "Design a 5-email sequence for launching my new [product name] to my email list of [describe your audience]. The emails should maintain my [voice characteristics] and follow my typical email structure of [your email format]. Incorporate my product philosophy that [your belief about your products] and use phrases I commonly use like \"[your phrases]\". The sequence should build anticipation, address objections, showcase benefits over features, include social proof, and end with a compelling call-to-action that aligns with my non-pushy selling approach.",
    personalizationTip: "Include specific customer testimonials or case studies from previous product launches to build credibility.",
    category: "E-commerce & Product Marketing"
  },
  
  // Industry-Specific: Health & Wellness
  {
    id: 11,
    title: "Wellness Protocol Explanation",
    description: "Explain complex health concepts in your authentic voice",
    prompt: "Help me explain the [specific health protocol/practice] to my audience of [your audience] who are seeking [specific health outcome]. The explanation should maintain my [voice characteristics] and reflect my health philosophy that [your core health belief]. Break down the complex science into accessible language while still respecting my audience's intelligence. Include my typical phrases like \"[your phrases]\" and address common misconceptions about this topic. Conclude with practical next steps that align with my approach of [your approach to health guidance].",
    personalizationTip: "Include specific research studies or data points you typically reference to support your explanations.",
    category: "Health & Wellness"
  },
  {
    id: 12,
    title: "Mindfulness Practice Script",
    description: "Create guided meditation or mindfulness scripts in your voice",
    prompt: "Write a [duration] guided [meditation/mindfulness practice] script focused on [specific benefit or outcome] that I can record for my clients. The script should reflect my [voice characteristics] and incorporate my perspective that [your philosophy on mindfulness/meditation]. Use my typical phrasing patterns like \"[your common expressions]\" and maintain my [formal/conversational/gentle] tone throughout. Include appropriate pauses, breathing cues, and visualization elements that align with my approach of [your specific approach to mindfulness practices].",
    personalizationTip: "Include specific sensory details or metaphors you typically use in your guidance work.",
    category: "Health & Wellness"
  },
  
  // Industry-Specific: Finance & Business
  {
    id: 13,
    title: "Financial Concept Explanation",
    description: "Break down complex financial topics in your unique voice",
    prompt: "Explain the concept of [financial concept] to my audience of [your audience] in a way that maintains my [voice characteristics] and teaching approach. Incorporate my financial philosophy that [your core belief about money/finance] and use analogies and examples that I typically use. Include my common phrases like \"[your phrases]\" and address the common misconception that [typical misconception about this topic]. The explanation should be educational without being condescending and should end with actionable advice that reflects my approach of [your approach to financial guidance].",
    personalizationTip: "Include specific financial examples with numbers that reflect the typical scenarios your audience faces.",
    category: "Finance & Business"
  },
  {
    id: 14,
    title: "Business Strategy Framework",
    description: "Create strategic business frameworks that reflect your methodology",
    prompt: "Develop a framework for [specific business challenge] that reflects my consulting approach and [voice characteristics]. The framework should have [number] key components, each with actionable steps and metrics. Incorporate my business philosophy that [your core belief about business] and use my typical terminology like \"[your business terms]\". The framework should address the common challenge that [specific pain point] and present my unique methodology of [your approach] as the solution. Include questions business owners should ask themselves at each stage.",
    personalizationTip: "Include specific case studies or client examples that demonstrate the framework in action.",
    category: "Finance & Business"
  }
];

export const categories = [
  "Content Ideation",
  "Writing Assistance",
  "Audience Engagement",
  "Branding & Messaging",
  "Sales & Nurture",
  "Repurposing & Efficiency",
  "Coaching & Consulting",
  "E-commerce & Product Marketing",
  "Health & Wellness",
  "Finance & Business"
];
