import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { FaCheckCircle, FaTimesCircle, FaShare, FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa'

const quizQuestions = [
  // EASY LEVEL (Questions 1-4) 🟢
  {
    id: 1,
    question: "What's the most important element of an effective AI prompt?",
    difficulty: "easy",
    icon: "🎯",
    options: [
      "Making it as long as possible",
      "Being specific and clear about what you want",
      "Using technical jargon",
      "Asking multiple questions at once"
    ],
    correct: 1,
    explanation: "Specificity and clarity are crucial. AI models perform best when they understand exactly what you're asking for."
  },
  {
    id: 2,
    question: "Which technique helps AI maintain consistency in tone?",
    difficulty: "easy",
    icon: "🎨",
    options: [
      "Using different writing styles in the same prompt",
      "Providing examples of the desired tone",
      "Writing in all caps",
      "Avoiding any tone specification"
    ],
    correct: 1,
    explanation: "Providing examples of the desired tone helps AI understand and maintain consistency throughout the response."
  },
  {
    id: 3,
    question: "When writing prompts for business content, you should:",
    difficulty: "easy",
    icon: "💼",
    options: [
      "Focus only on features and specifications",
      "Include target audience and business context",
      "Avoid mentioning your industry",
      "Use only formal language"
    ],
    correct: 1,
    explanation: "Including target audience, business context, and industry-specific details helps AI create more relevant business content."
  },
  {
    id: 4,
    question: "What's a 'negative prompt'?",
    difficulty: "easy",
    icon: "🚫",
    options: [
      "A prompt that creates negative content",
      "Telling AI what NOT to include or do",
      "A poorly written prompt",
      "A prompt that doesn't work"
    ],
    correct: 1,
    explanation: "Negative prompts specify what you don't want, helping AI avoid unwanted elements in responses.",
    tooltip: "Negative prompts help you guide AI away from unwanted content or approaches"
  },
  
  // MEDIUM LEVEL (Questions 5-8) 🟡
  {
    id: 5,
    question: "What's the best way to get AI to write in your brand voice?",
    difficulty: "medium",
    icon: "🎪",
    options: [
      "Tell it to 'write professionally'",
      "Provide examples of your existing content",
      "Use generic business language",
      "Avoid giving any style guidance"
    ],
    correct: 1,
    explanation: "Providing examples of your existing content helps AI learn and replicate your unique brand voice."
  },
  {
    id: 6,
    question: "What does 'prompt chaining' mean?",
    difficulty: "medium",
    icon: "🔗",
    options: [
      "Using multiple AI tools simultaneously",
      "Writing very long prompts",
      "Breaking complex tasks into sequential prompts",
      "Copying prompts from other users"
    ],
    correct: 2,
    explanation: "Prompt chaining involves breaking complex tasks into smaller, sequential prompts for better results.",
    tooltip: "Prompt chaining: Breaking one big task into smaller, connected steps"
  },
  {
    id: 7,
    question: "When should you use role-playing in prompts?",
    difficulty: "medium",
    icon: "🎭",
    options: [
      "Never, it confuses the AI",
      "Only for creative writing",
      "When you want specific expertise or perspective",
      "Only with advanced AI models"
    ],
    correct: 2,
    explanation: "Role-playing helps AI provide responses from specific perspectives and expertise areas."
  },
  {
    id: 8,
    question: "What's the best approach for iterating on AI outputs?",
    difficulty: "medium",
    icon: "🔄",
    options: [
      "Accept the first response always",
      "Start over with completely new prompts",
      "Refine and build upon previous responses",
      "Use the same prompt repeatedly"
    ],
    correct: 2,
    explanation: "Iterative refinement - building upon and improving previous responses - typically yields the best results."
  },
  
  // HARD LEVEL (Questions 9-12) 🔴
  {
    id: 9,
    question: "What's the most effective way to train AI to understand your unique voice?",
    difficulty: "hard",
    icon: "🧠",
    options: [
      "Tell it to 'write professionally'",
      "Upload 5-10 examples of your best work as training data",
      "Use generic business templates",
      "Copy other people's writing styles"
    ],
    correct: 1,
    explanation: "Training data from your best work creates personalized AI assistants. This aligns with experience-first prompting and multishot techniques.",
    tooltip: "Training data: Real examples of your work that teach AI your style"
  },
  {
    id: 10,
    question: "Before implementing any AI use case, what three questions should you ask?",
    difficulty: "hard",
    icon: "✅",
    options: [
      "Is it trending? Is it cheap? Is it fast?",
      "Will it save 2+ hours weekly? Takes <30 min setup? 80%+ quality?", 
      "Can AI do it? Is it complicated? Will it impress people?",
      "Is it automated? Is it scalable? Is it measurable?"
    ],
    correct: 1,
    explanation: "The 3-Question Test ensures practical value: 2+ hours saved weekly, under 30 minutes setup time, and at least 80% quality compared to manual work.",
    tooltip: "The 3-Question Test: A framework for evaluating AI implementation value"
  },
  {
    id: 11,
    question: "What's the difference between 'Chief Idea Officer' vs 'Word Wrangler' approach?",
    difficulty: "hard", 
    icon: "👑",
    options: [
      "Chief Idea Officer counts words, Word Wrangler focuses on ideas",
      "Word Wrangler brings experiences, AI amplifies ideas",
      "Chief Idea Officer brings experiences, AI amplifies ideas", 
      "They're the same approach with different names"
    ],
    correct: 2,
    explanation: "As Chief Idea Officer, you bring real experiences and insights, then use AI to develop these into content - not the other way around.",
    tooltip: "Chief Idea Officer: You lead with ideas and experiences, AI helps execute"
  },
  {
    id: 12,
    question: "How should you structure complex prompts for best results?",
    difficulty: "hard",
    icon: "🏗️",
    options: [
      "Write everything in one long paragraph",
      "Use XML tags to organize different sections clearly",
      "Use only bullet points",
      "Keep everything as short as possible"
    ],
    correct: 1,
    explanation: "XML tags help structure complex prompts clearly, improving AI understanding and following advanced prompting best practices.",
    tooltip: "XML tags: Special formatting that helps organize complex prompts (like <context> and <task>)"
  }
];

// Custom prompt templates based on skill level
const promptTemplates = {
  beginner: [
    {
      title: "Experience-First Content Template",
      template: `<role>Act as my creative partner for content creation</role>

<context>
I'm a [your profession] who helps [target audience] with [main challenge].
My unique experience: [specific experience or story]
</context>

<task>
Help me turn this experience into [content type] that:
- Connects with [specific audience]
- Shows [key insight from experience]
- Leads to [desired action]
</task>

<style>
Tone: [your brand voice]
Format: [specific format requirements]
</style>`,
      example: `<role>Act as my creative partner for content creation</role>

<context>
I'm a business coach who helps small business owners with productivity challenges.
My unique experience: Last week I helped a client reduce their email time from 3 hours to 45 minutes daily using AI automation.
</context>

<task>
Help me turn this experience into a LinkedIn post that:
- Connects with overwhelmed business owners
- Shows the power of strategic AI implementation
- Leads to booking a discovery call
</task>

<style>
Tone: Professional but conversational, data-driven
Format: Hook + Story + Insight + CTA
</style>`
    },
    {
      title: "Context-Heavy Business Template", 
      template: `<business_context>
Company: [company name and what you do]
Audience: [detailed audience description]
Current challenge: [specific problem you're solving]
</business_context>

<task>
Create [specific deliverable] that addresses [challenge] by [approach].
Include: [specific elements needed]
</task>

<examples>
Here are 2-3 examples of my best work:
[paste examples of your voice/style]
</examples>`,
      example: `<business_context>
Company: PromptWritingStudio - teach entrepreneurs how to use AI effectively
Audience: Small business owners (25-50 employees) struggling with content creation
Current challenge: They want to use AI but don't know how to write effective prompts
</business_context>

<task>
Create a welcome email sequence that addresses their prompt writing fears by showing simple, practical examples.
Include: Real business examples, step-by-step guidance, quick wins
</task>

<examples>
Here are 2-3 examples of my best work:
[paste your best email examples showing tone and approach]
</examples>`
    }
  ],
  intermediate: [
    {
      title: "Training Data + Chain of Thought Template",
      template: `<role>You are my specialized content creation partner</role>

<training_data>
Here are 5 examples of my best [content type]:
[Example 1 with brief note about why it worked]
[Example 2 with brief note about why it worked]
[Example 3 with brief note about why it worked]
</training_data>

<current_situation>
Business context: [specific situation]
Challenge: [what you're trying to solve]
Goal: [specific outcome desired]
</current_situation>

<process>
Think through this step by step:
1. Analyze what made my examples effective
2. Identify key patterns in my voice/approach
3. Apply those patterns to this new situation
4. Create [deliverable] that maintains my style
</process>

<constraints>
- Must save me at least 2 hours vs doing manually
- Quality should be 80%+ of my best work
- Should be ready to use with minimal editing
</constraints>`,
      example: `<role>You are my specialized email marketing partner</role>

<training_data>
Here are 5 examples of my best sales emails:
[Email 1: Story-driven, personal experience, soft CTA - 23% open rate]
[Email 2: Problem/solution, data-driven, clear value prop - 31% click rate]
[Email 3: Case study format, specific results, urgency - 18% conversion]
</training_data>

<current_situation>
Business context: Launching AI prompt writing course to existing list of 2,500 subscribers
Challenge: Previous course launch only converted 3%, need better email sequence
Goal: 10%+ conversion rate on course sales email sequence
</current_situation>

<process>
Think through this step by step:
1. Analyze what made my examples effective
2. Identify key patterns in my voice/approach  
3. Apply those patterns to this course launch
4. Create 5-email sequence that maintains my style
</process>

<constraints>
- Must save me at least 2 hours vs writing manually
- Quality should be 80%+ of my best work
- Should be ready to send with minimal editing
</constraints>`
    },
    {
      title: "Visual + Context Prompting Template",
      template: `<visual_input>
[Describe or upload screenshot/image of current situation]
</visual_input>

<context>
What I'm trying to achieve: [specific goal]
Current problem: [what's not working]
My experience with this: [relevant background]
</context>

<analysis_request>
Based on the visual and context:
1. Diagnose what you see
2. Compare to best practices in [field]
3. Provide specific, actionable improvements
4. Prioritize recommendations by impact vs effort
</analysis_request>

<output_format>
- Quick wins (can implement today)
- Medium-term improvements (this week)
- Long-term optimizations (this month)
</output_format>`,
      example: `<visual_input>
[Screenshot of my current LinkedIn profile banner and first 3 posts]
</visual_input>

<context>
What I'm trying to achieve: Position myself as the go-to AI prompt expert for business owners
Current problem: Low engagement (average 15 likes per post) and few DM inquiries
My experience with this: 8 years of content marketing, but new to personal branding on LinkedIn
</context>

<analysis_request>
Based on the visual and context:
1. Diagnose what you see in my current approach
2. Compare to best practices for LinkedIn thought leadership
3. Provide specific, actionable improvements for content and profile
4. Prioritize recommendations by impact vs effort
</analysis_request>

<output_format>
- Quick wins (can implement today)
- Medium-term improvements (this week)  
- Long-term optimizations (this month)
</output_format>`
    }
  ],
  advanced: [
    {
      title: "Iterative Refinement + Claude Project Template",
      template: `<project_setup>
You are my [specialized role] Claude Project. You have been trained on my specific approach to [domain].

Core philosophy: AI as creative partner - I bring ideas and experiences, you amplify them.
</project_setup>

<my_voice_training>
Analyze these 10 examples of my best [content type]:
[Upload your best examples with performance notes]

Key patterns you should maintain:
- [Pattern 1 from your content]
- [Pattern 2 from your content]  
- [Pattern 3 from your content]
</my_voice_training>

<current_challenge>
Experience/situation: [specific business situation you've encountered]
What I learned: [key insights from this experience]
How I want to package this: [content format/distribution]
</current_challenge>

<iterative_process>
First draft: Create initial version based on my voice patterns
Review criteria: Does it pass the 3-question test? (2hr save, 30min setup, 80% quality)
Refinement: I'll provide feedback, you'll adjust based on my additional context
Final output: Ready-to-use content that sounds authentically like me
</iterative_process>`,
      example: `<project_setup>
You are my LinkedIn Content Creation Claude Project. You have been trained on my specific approach to business storytelling.

Core philosophy: AI as creative partner - I bring real business experiences, you help me turn them into engaging content.
</project_setup>

<my_voice_training>
Analyze these 10 examples of my best LinkedIn posts:
[Upload top-performing posts with engagement metrics]

Key patterns you should maintain:
- Start with a specific moment or experience
- Include actual numbers/data when possible
- End with actionable insight + soft CTA
- Use line breaks for readability
- Professional but conversational tone
</my_voice_training>

<current_challenge>
Experience/situation: Yesterday a client told me their AI implementation failed because they tried to replace human judgment instead of augmenting it
What I learned: Most AI failures happen when people try to remove themselves from the equation entirely
How I want to package this: LinkedIn post that gets business owners thinking differently about AI adoption
</current_challenge>

<iterative_process>
First draft: Create initial LinkedIn post based on my voice patterns
Review criteria: Does it pass the 3-question test? (Saves me 2+ hours vs manual writing, took <30min to create, 80%+ quality of my best posts)
Refinement: I'll provide feedback on tone/messaging, you'll adjust 
Final output: Ready-to-post content that sounds authentically like me
</iterative_process>`
    },
    {
      title: "Multi-Modal Experience Documentation Template",
      template: `<experience_capture>
What happened: [specific business situation/client interaction/result]
Context: [background that matters]
Data: [specific numbers, metrics, before/after]
Visual elements: [screenshots, photos, charts if relevant]
</experience_capture>

<insight_extraction>
<thinking>
Let me think through what made this experience valuable:
- What was unique about this situation?
- What would others in my position want to know?
- How does this connect to broader trends/challenges?
- What's the actionable takeaway?
</thinking>

Key insight: [the main learning]
Why it matters: [broader implications]
What others should do: [specific action]
</insight_extraction>

<content_development>
Primary platform: [where this story works best]
Secondary formats: [how to repurpose across platforms]
Distribution strategy: [when/how to share]
Engagement hooks: [what will make people care]
</content_development>

<output_specifications>
Time investment: 30-60 minutes to document experience
AI amplification: Turn documentation into 3-5 pieces of content
Quality target: 80%+ of my best manual work
Expected outcome: [specific business goal]
</output_specifications>`,
      example: `<experience_capture>
What happened: Client saved 15 hours/week by implementing my "daily brain dump" AI workflow
Context: Marketing agency owner, 12 employees, was personally writing all client reports
Data: Went from 15 hours weekly report writing to 2 hours of review/editing
Visual elements: Before/after screenshots of their reporting process
</experience_capture>

<insight_extraction>
<thinking>
Let me think through what made this experience valuable:
- Most agency owners don't realize how much time they spend on reports
- The key was documenting their thought process, not just automating the writing
- This connects to the broader "Chief Idea Officer" concept
- Other agency owners could replicate this exact system
</thinking>

Key insight: Documentation of your expertise is more valuable than the writing itself
Why it matters: AI can't read your mind - it needs your thought patterns as input
What others should do: Spend 30 min documenting how you think about problems, then let AI handle execution
</insight_extraction>

<content_development>
Primary platform: LinkedIn case study post (storytelling format)
Secondary formats: Email to list, YouTube video walkthrough, client testimonial
Distribution strategy: Post during business hours, engage in comments, share in relevant groups
Engagement hooks: "15 hours to 2 hours" hook, specific system description
</content_development>

<output_specifications>
Time investment: 45 minutes to document this client win
AI amplification: Turn into LinkedIn post + email + video script
Quality target: Match engagement of my best case study posts (100+ likes)
Expected outcome: 3-5 discovery call bookings from this content
</output_specifications>`
    }
  ],
  expert: [
    {
      title: "Master-Level Experience Synthesis Template",
      template: `<meta_framework>
You are helping me synthesize patterns across multiple client experiences to create scalable frameworks.

My approach: Document experiences → Extract patterns → Create systems → Teach others
Your role: Help identify transferable principles and create teaching frameworks
</meta_framework>

<experience_database>
Client/situation cluster: [group of similar situations you've handled]

Pattern recognition request:
<thinking>
Analyzing experiences 1-10:
- What challenges appeared repeatedly?
- Which solutions worked across different contexts?
- What variables determined success/failure?
- How do these connect to broader business principles?
</thinking>

Data points to analyze:
[Experience 1]: [situation] → [approach] → [result] → [time invested]
[Experience 2]: [situation] → [approach] → [result] → [time invested]
[Pattern continues...]
</experience_database>

<framework_development>
Create a teachable framework that:
1. Identifies the core problem pattern
2. Provides decision criteria for different approaches
3. Includes implementation templates
4. Anticipates common failure points
5. Scales across industries/contexts

Framework criteria:
- Passes 3-question test for my students (saves 2hr+, <30min setup, 80%+ results)
- Can be taught in single session
- Includes practical tools/templates
- Addresses most common failure modes
</framework_development>

<validation_process>
Test framework against these scenarios: [edge cases/variations]
Refine based on: [specific feedback criteria]
Document: [what to track for continuous improvement]
</validation_process>`,
      example: `<meta_framework>
You are helping me synthesize patterns across multiple client experiences to create scalable frameworks.

My approach: Document AI implementation failures → Extract patterns → Create prevention systems → Teach others
Your role: Help identify transferable principles and create "AI Implementation Success Framework"
</meta_framework>

<experience_database>
Client/situation cluster: Small businesses (10-50 employees) who tried AI automation and failed

Pattern recognition request:
<thinking>
Analyzing 15 failed AI implementations:
- What did they try to automate first? (usually customer service or content)
- Why did it fail? (tried to replace human judgment vs augment it)
- What would have worked? (started with internal processes first)
- How much time/money was wasted? (average 3 months, $15K invested)
</thinking>

Data points to analyze:
[Client A]: Automated customer chat → Lost 3 major clients → Reverted in 2 weeks → 40hrs fixing
[Client B]: AI content creation → Brand voice disaster → Manual rewrites → 25hrs recovery
[Client C]: AI email responses → Confused customers → Trust issues → 60hrs damage control
[Pattern continues across 15 implementations...]
</experience_database>

<framework_development>
Create "AI Implementation Success Framework" that:
1. Identifies readiness criteria before any AI deployment
2. Provides phased rollout approach (internal → customer-facing)
3. Includes failure prevention checklists
4. Anticipates common mistakes (automation vs augmentation)
5. Scales across service businesses

Framework criteria:
- Saves businesses from 3-month failures (80+ hours saved)
- Can be implemented in 30-min planning session
- Includes ready-to-use assessment tools
- Prevents 90% of common AI implementation failures
</framework_development>

<validation_process>
Test framework against these scenarios: Tech-savvy vs traditional businesses, B2B vs B2C contexts
Refine based on: Implementation success rates, time to value, client satisfaction
Document: Success metrics, failure patterns, optimization opportunities
</validation_process>`
    },
    {
      title: "Advanced System Prompt Architecture Template",
      template: `<system_architecture>
You are a specialized Claude Project designed to replicate my [specific expertise] and decision-making process.

Expertise modeling:
- Years of experience: [number]
- Unique perspective: [what makes your approach different]
- Decision frameworks: [how you evaluate options]
- Communication patterns: [how you explain complex topics]
</system_architecture>

<multi_modal_inputs>
Text inputs: [documents, notes, communications]
Visual inputs: [screenshots, diagrams, photos relevant to decisions]
Data inputs: [spreadsheets, analytics, performance metrics]
Context inputs: [industry trends, competitive landscape, client history]
</multi_modal_inputs>

<reasoning_process>
<thinking>
When I encounter [type of problem], I typically:
1. First assess: [key factors I evaluate]
2. Then consider: [stakeholder perspectives]
3. Apply frameworks: [specific methodologies I use]
4. Validate with: [how I check my reasoning]
5. Communicate by: [how I explain decisions]
</thinking>

For complex situations, chain through:
- Immediate implications
- Second-order effects  
- Long-term consequences
- Implementation challenges
- Success metrics
</reasoning_process>

<output_calibration>
Quality standards:
- Decisions should match 90%+ of my manual analysis
- Explanations should teach, not just conclude
- Recommendations should be immediately actionable
- Time investment should be <20% of manual process

Continuous improvement:
- Track decision accuracy over time
- Gather feedback on communication clarity
- Refine based on real-world outcomes
- Update with new experiences/data
</output_calibration>

<adaptation_protocols>
Adjust approach based on:
- Stakeholder expertise level (novice → expert)
- Urgency (quick decision → thorough analysis)
- Risk tolerance (conservative → aggressive)
- Available resources (limited → abundant)
</adaptation_protocols>`,
      example: `<system_architecture>
You are a specialized Claude Project designed to replicate my business strategy consulting expertise and decision-making process.

Expertise modeling:
- Years of experience: 12 years across 200+ small business transformations
- Unique perspective: Focus on "profitable growth without burnout" for service businesses
- Decision frameworks: ROI analysis + implementation difficulty + team capacity assessment
- Communication patterns: Data-driven insights with practical next steps and realistic timelines
</system_architecture>

<multi_modal_inputs>
Text inputs: Financial statements, team structure docs, client feedback
Visual inputs: Current org chart, workflow diagrams, marketing materials
Data inputs: Revenue trends, client acquisition costs, employee utilization rates
Context inputs: Industry benchmarks, competitive analysis, economic conditions
</multi_modal_inputs>

<reasoning_process>
<thinking>
When I encounter growth strategy questions, I typically:
1. First assess: Current capacity utilization and cash flow trends
2. Then consider: Owner's personal goals and team capability gaps
3. Apply frameworks: 10x Revenue Framework + Team Scaling Matrix
4. Validate with: Similar client case studies and industry benchmarks
5. Communicate by: Leading with the financial impact, then implementation steps
</thinking>

For complex growth decisions, chain through:
- Revenue impact (immediate 6-month projection)
- Team impact (hiring needs, training requirements)
- Operational impact (system/process changes needed)
- Implementation challenges (timeline, budget, risk factors)
- Success metrics (leading and lagging indicators)
</reasoning_process>

<output_calibration>
Quality standards:
- Strategy recommendations should match 95% of my manual analysis
- Financial projections should be within 10% of my estimates
- Implementation plans should be immediately actionable with clear next steps
- Time investment should be <15% of manual consulting process (3 hours → 30 minutes)

Continuous improvement:
- Track client implementation success rates
- Gather feedback on recommendation clarity and usefulness
- Refine based on actual vs projected outcomes
- Update framework with new market data and client experiences
</output_calibration>

<adaptation_protocols>
Adjust approach based on:
- Business maturity (startup → established → scaling)
- Decision urgency (quarterly planning → crisis response)
- Risk tolerance (conservative growth → aggressive expansion)
- Available capital (bootstrapped → funded → profitable)
</adaptation_protocols>`
    }
  ]
};

const resultProfiles = {
  beginner: {
    title: "🌱 Emerging Chief Idea Officer",
    subtitle: "Ready to become AI's creative partner!",
    description: "You understand AI's potential but haven't yet mastered the art of being a 'Chief Idea Officer' - bringing your experiences and ideas while letting AI amplify them. Focus on experience-first prompting rather than generic requests.",
    recommendations: [
      "Start documenting your daily experiences and insights (30 min/day)",
      "Practice context-heavy prompting with specific business situations",
      "Learn the 3-Question Test: 2hr+ saved, <30min setup, 80%+ quality",
      "Use AI as creative partner, not replacement for your thinking"
    ],
    courseMatch: "Perfect for our Basic Plan - learn the experience-first methodology step by step."
  },
  intermediate: {
    title: "🚀 Practicing Chief Idea Officer", 
    subtitle: "You're building your experience-first approach!",
    description: "You grasp the 'AI as creative partner' concept and understand training data importance. Ready to master advanced techniques like Claude Projects, visual prompting, and iterative refinement based on real business outcomes.",
    recommendations: [
      "Create your first Claude Project with 5-10 examples of your best work",
      "Master XML tags and chain-of-thought prompting (Anthropic best practices)", 
      "Practice visual prompting with screenshots and images",
      "Develop iterative refinement workflows for consistent quality"
    ],
    courseMatch: "Ready for our Pro Plan - advanced Claude Projects and visual prompting techniques."
  },
  advanced: {
    title: "⭐ Strategic AI Implementation Expert",
    subtitle: "You're mastering the art and science!",
    description: "You've moved beyond 'word wrangling' to strategic AI partnership. You understand training data, context-heavy prompting, and the 3-Question Test. Ready for advanced business applications and framework development.",
    recommendations: [
      "Develop signature AI workflows that save 10+ hours weekly",
      "Create custom frameworks from client/business patterns",
      "Master multi-modal prompting (text + visuals + data)",
      "Build systems for scaling your expertise through AI"
    ],
    courseMatch: "Perfect for our Elite Plan - specialized business systems and framework development."
  },
  expert: {
    title: "🏆 AI Partnership Master",
    subtitle: "You've achieved true AI mastery!",
    description: "You exemplify the 'Chief Idea Officer' approach - documenting experiences, extracting patterns, and creating scalable systems. You understand advanced Claude capabilities and can teach others to achieve 80%+ quality in <30min setup time.",
    recommendations: [
      "Synthesize your experience patterns into teachable frameworks",
      "Develop industry-specific AI implementation methodologies",
      "Create advanced Claude Project architectures for complex decisions",
      "Consider consulting/teaching others your systematic approach"
    ],
    courseMatch: "You might enjoy our Elite Plan for the mastermind community and teaching opportunities."
  }
};

export default function AIPromptQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [failedQuestions, setFailedQuestions] = useState([])
  const [isRetakeMode, setIsRetakeMode] = useState(false)
  const [retakeQuestions, setRetakeQuestions] = useState([])
  const [showTooltip, setShowTooltip] = useState(null)

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    const currentQuestions = isRetakeMode ? retakeQuestions : quizQuestions
    const newAnswers = [...answers, selectedAnswer]
    setAnswers(newAnswers)
    
    const isCorrect = selectedAnswer === currentQuestions[currentQuestion].correct
    if (isCorrect) {
      setScore(score + 1)
    } else {
      // Track failed questions for retake option
      setFailedQuestions(prev => [...prev, currentQuestions[currentQuestion]])
    }

    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setShowResults(true)
    }
  }

  const startRetakeFailedQuestions = () => {
    setRetakeQuestions(failedQuestions)
    setIsRetakeMode(true)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setFailedQuestions([])
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'  
      case 'hard': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyIcon = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '🟢'
      case 'medium': return '🟡'
      case 'hard': return '🔴'
      default: return '⚪'
    }
  }

  const handleShowExplanation = () => {
    setShowExplanation(true)
  }

  const getResultProfile = (finalScore) => {
    const totalQuestions = isRetakeMode ? retakeQuestions.length : quizQuestions.length
    const percentage = (finalScore / totalQuestions) * 100
    if (percentage >= 90) return resultProfiles.expert
    if (percentage >= 75) return resultProfiles.advanced  
    if (percentage >= 60) return resultProfiles.intermediate
    return resultProfiles.beginner
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    // Here you would integrate with your email service
    console.log('Email submitted:', email)
    setEmailSubmitted(true)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setEmail('')
    setEmailSubmitted(false)
    setFailedQuestions([])
    setIsRetakeMode(false)
    setRetakeQuestions([])
    setShowTooltip(null)
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = "I just took the AI Prompt Writing Quiz! Test your knowledge:"

  if (showResults) {
    const profile = getResultProfile(score)
    const percentage = Math.round((score / (isRetakeMode ? retakeQuestions.length : quizQuestions.length)) * 100)

    return (
      <Layout
        title={isRetakeMode ? "Retake Results - Chief Idea Officer Assessment | PromptWritingStudio" : "Your Chief Idea Officer Assessment Results | PromptWritingStudio"}
        description="Discover your AI partnership skill level and get personalized prompt templates based on your experience-first approach assessment."
      >
        <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Results Header */}
            <div className="text-center mb-12">
              {isRetakeMode && (
                <div className="bg-[#22C55E] bg-opacity-10 border border-[#22C55E] rounded-xl p-6 mb-6">
                  <div className="text-4xl mb-2">🎯</div>
                  <h2 className="text-xl font-bold text-[#22C55E] mb-2">Retake Complete!</h2>
                  <p className="text-[#666666]">
                    You scored {score} out of {retakeQuestions.length} on your second attempt. 
                    {score === retakeQuestions.length ? " Perfect! 🎉" : " Keep practicing! 💪"}
                  </p>
                </div>
              )}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
                <div className="text-6xl mb-4">{profile.title.split(' ')[0]}</div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                  {profile.title.substring(2)}
                </h1>
                <p className="text-xl text-[#333333] mb-4">{profile.subtitle}</p>
                <div className="text-5xl font-bold text-[#1A1A1A] mb-2">{percentage}%</div>
                <p className="text-[#666666]">
                  You scored {score} out of {isRetakeMode ? retakeQuestions.length : quizQuestions.length} questions correctly
                  {isRetakeMode && " in retake mode"}
                </p>
              </div>
            </div>

            {/* Profile Description */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Your Prompt Writing Profile</h2>
              <p className="text-[#333333] text-lg mb-6">{profile.description}</p>
              
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Recommended Next Steps:</h3>
              <ul className="space-y-2 mb-6">
                {profile.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheckCircle className="text-[#333333] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-[#333333]">{rec}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#FFDE59] bg-opacity-20 border border-[#FFDE59] rounded-lg p-4">
                <h4 className="font-bold text-[#1A1A1A] mb-2">Perfect Course Match:</h4>
                <p className="text-[#333333] mb-4">{profile.courseMatch}</p>
                <a 
                  href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                  className="bg-[#FFDE59] text-[#1A1A1A] px-6 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Course Options
                </a>
              </div>
            </div>

            {/* Custom Prompt Templates */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">🎯 Your Custom Prompt Templates</h2>
              <p className="text-[#333333] mb-6">
                Based on your skill level, here are personalized prompt templates to help you get better results:
              </p>
              
              <div className="space-y-6">
                {promptTemplates[Object.keys(resultProfiles).find(key => resultProfiles[key] === profile)].map((template, index) => (
                  <div key={index} className="border border-[#E5E5E5] rounded-lg p-6">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{template.title}</h3>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-[#333333] mb-2">Template:</h4>
                      <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-lg p-4 font-mono text-sm">
                        {template.template}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-[#333333] mb-2">Example:</h4>
                      <div className="bg-[#FFDE59] bg-opacity-10 border border-[#FFDE59] rounded-lg p-4 text-sm">
                        {template.example}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Tools */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">🛠️ Recommended Tools for Your Level</h2>
              <p className="text-[#333333] mb-6">
                These tools will help you put your prompt writing skills into practice and get better results:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-[#E5E5E5] rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">🚀 AI Prompt Optimizer</h3>
                  <p className="text-[#666666] mb-4">
                    Test and refine your prompts with real AI models. Get instant feedback and optimization suggestions.
                  </p>
                  <a 
                    href="/ai-prompt-generator" 
                    className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
                  >
                    Try Optimizer
                  </a>
                </div>
                
                <div className="border border-[#E5E5E5] rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">💬 Live Chat Tester</h3>
                  <p className="text-[#666666] mb-4">
                    Test your prompts with real Claude and Perplexity AI models. See results instantly.
                  </p>
                  <a 
                    href="/ai-prompt-generator" 
                    className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
                  >
                    Test Prompts
                  </a>
                </div>
                
                <div className="border border-[#E5E5E5] rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">📊 AI Calculators</h3>
                  <p className="text-[#666666] mb-4">
                    Calculate time savings, cost benefits, and ROI from using AI in your business.
                  </p>
                  <a 
                    href="/calculators" 
                    className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
                  >
                    View Calculators
                  </a>
                </div>
                
                <div className="border border-[#E5E5E5] rounded-lg p-6 hover:shadow-md transition">
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">📚 Prompt Library</h3>
                  <p className="text-[#666666] mb-4">
                    Access 500+ proven prompts for business, content creation, and productivity.
                  </p>
                  <a 
                    href="/ai-prompt-examples" 
                    className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
                  >
                    Browse Library
                  </a>
                </div>
              </div>
            </div>

            {/* Email Capture */}
            {!emailSubmitted ? (
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
                <h3 className="text-2xl font-bold text-[#1A1A1A] mb-4">Get Your Detailed Results</h3>
                <p className="text-[#333333] mb-6">
                  Enter your email to receive a detailed breakdown of your results, personalized prompt templates, 
                  and exclusive tips to improve your AI prompt writing skills.
                </p>
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFDE59] focus:border-[#FFDE59]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
                  >
                    Get Results
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl p-8 mb-8">
                <div className="flex items-center mb-4">
                  <FaCheckCircle className="text-[#333333] text-2xl mr-3" />
                  <h3 className="text-2xl font-bold text-[#1A1A1A]">Thank You!</h3>
                </div>
                <p className="text-[#333333]">
                  Check your email for detailed results and personalized recommendations. 
                  Your prompt writing journey starts now! 🚀
                </p>
              </div>
            )}

            {/* Social Sharing */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">Share Your Results</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  className="flex items-center bg-[#F9F9F9] text-[#333333] px-6 py-3 rounded-lg hover:bg-[#E5E5E5] transition border border-[#E5E5E5]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="mr-2 text-[#1DA1F2]" />
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  className="flex items-center bg-[#F9F9F9] text-[#333333] px-6 py-3 rounded-lg hover:bg-[#E5E5E5] transition border border-[#E5E5E5]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="mr-2 text-[#0077B5]" />
                  LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  className="flex items-center bg-[#F9F9F9] text-[#333333] px-6 py-3 rounded-lg hover:bg-[#E5E5E5] transition border border-[#E5E5E5]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="mr-2 text-[#1877F2]" />
                  Facebook
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-[#E5E5E5] mb-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">🔄 Want to Improve Your Score?</h3>
                <p className="text-[#666666] mb-4">
                  {failedQuestions.length > 0 ? 
                    `You got ${failedQuestions.length} questions wrong. Want to retry just those questions, or take the full quiz again?` :
                    "Take the quiz again to see how much you've learned, or try our other tools to practice your prompt writing skills."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {failedQuestions.length > 0 && (
                    <button
                      onClick={startRetakeFailedQuestions}
                      className="bg-[#FF6B6B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#FF5252] transition"
                    >
                      🎯 Retry Failed Questions ({failedQuestions.length})
                    </button>
                  )}
                  <button
                    onClick={restartQuiz}
                    className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
                  >
                    🔄 Retake Full Quiz
                  </button>
                  <a
                    href="/ai-prompt-generator"
                    className="bg-[#F9F9F9] text-[#333333] px-8 py-3 rounded-lg font-bold hover:bg-[#E5E5E5] transition border border-[#E5E5E5]"
                  >
                    🚀 Practice with AI Tools
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
          <Layout
        title={isRetakeMode ? "Retake Mode - AI Prompt Assessment | PromptWritingStudio" : "Advanced AI Prompt Assessment - Chief Idea Officer Skills Test | PromptWritingStudio"}
        description={isRetakeMode ? "Retake failed questions to improve your score and understanding." : "Take our comprehensive 12-question assessment based on real business experience and Anthropic's best practices. Discover your 'Chief Idea Officer' skill level and get personalized templates."}
      >
      <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Quiz Header */}
                      <div className="text-center mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#E5E5E5]">
                <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
                  🧠 Advanced AI Prompt Writing Assessment
                </h1>
                <p className="text-xl text-[#333333] mb-6">
                  {isRetakeMode ? 
                    `🎯 Retake Mode: Focusing on ${retakeQuestions.length} questions you missed` :
                    "Discover your 'Chief Idea Officer' skill level! Quick 5-minute assessment with personalized prompt templates."
                  }
                </p>
              <div className="flex justify-center items-center space-x-4">
                <div className="bg-[#FFDE59] bg-opacity-20 px-4 py-2 rounded-lg border border-[#FFDE59]">
                  <span className="text-[#1A1A1A] font-bold">
                    Question {currentQuestion + 1} of {isRetakeMode ? retakeQuestions.length : quizQuestions.length}
                  </span>
                </div>
                <div className="flex-1 max-w-md bg-[#E5E5E5] rounded-full h-3">
                  <div 
                    className="bg-[#FFDE59] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / (isRetakeMode ? retakeQuestions.length : quizQuestions.length)) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Difficulty Progress Indicator */}
              {!isRetakeMode && (
                <div className="mt-6 flex justify-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-[#666666]">Progress:</span>
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`w-3 h-3 rounded-full ${currentQuestion >= i-1 ? 'bg-green-400' : 'bg-gray-200'}`}></div>
                    ))}
                    <span className="text-xs text-green-600 font-medium">Easy</span>
                    {[5,6,7,8].map(i => (
                      <div key={i} className={`w-3 h-3 rounded-full ${currentQuestion >= i-1 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                    ))}
                    <span className="text-xs text-yellow-600 font-medium">Medium</span>
                    {[9,10,11,12].map(i => (
                      <div key={i} className={`w-3 h-3 rounded-full ${currentQuestion >= i-1 ? 'bg-red-400' : 'bg-gray-200'}`}></div>
                    ))}
                    <span className="text-xs text-red-600 font-medium">Hard</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-[#E5E5E5]">
            {/* Question Header with Difficulty */}
            <div className="flex items-center justify-between mb-6">
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor((isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].difficulty)}`}>
                {getDifficultyIcon((isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].difficulty)} 
                {(isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].difficulty?.toUpperCase() || 'QUESTION'}
              </div>
              {(isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].tooltip && (
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowTooltip(currentQuestion)}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="text-[#666666] hover:text-[#333333] transition"
                  >
                    ℹ️
                  </button>
                  {showTooltip === currentQuestion && (
                    <div className="absolute right-0 top-8 bg-[#1A1A1A] text-white p-3 rounded-lg shadow-lg z-10 w-64 text-sm">
                      {(isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].tooltip}
                      <div className="absolute -top-2 right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-[#1A1A1A]"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-start space-x-4 mb-8">
              <div className="text-4xl">
                {(isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].icon}
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] flex-1">
                {(isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].question}
              </h2>
            </div>
            
            <div className="space-y-4 mb-8">
              {(isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-[#FFDE59] bg-[#FFDE59] bg-opacity-10 text-[#1A1A1A]'
                      : 'border-[#E5E5E5] hover:border-[#E5E5E5] hover:bg-[#F9F9F9]'
                  }`}
                  disabled={showExplanation}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-[#FFDE59] bg-[#FFDE59]'
                        : 'border-[#E5E5E5]'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-3 h-3 rounded-full bg-[#1A1A1A]"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className={`p-4 rounded-lg mb-6 ${
                selectedAnswer === (isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].correct
                  ? 'bg-[#F9F9F9] border border-[#E5E5E5]'
                  : 'bg-[#F9F9F9] border border-[#E5E5E5]'
              }`}>
                <div className="flex items-center mb-2">
                  {selectedAnswer === (isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].correct ? (
                    <FaCheckCircle className="text-[#333333] mr-2" />
                  ) : (
                    <FaTimesCircle className="text-[#666666] mr-2" />
                  )}
                  <span className="font-bold text-[#1A1A1A]">
                    {selectedAnswer === (isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].correct ? 'Correct! 🎉' : 'Not quite right. 🤔'}
                  </span>
                </div>
                <p className="text-[#333333]">{(isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].explanation}</p>
                {selectedAnswer !== (isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].correct && (
                  <p className="text-[#333333] mt-2">
                    <strong>Correct answer:</strong> {(isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].options[(isRetakeMode ? retakeQuestions : quizQuestions)[currentQuestion].correct]}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between">
              <div>
                {selectedAnswer !== null && !showExplanation && (
                  <button
                    onClick={handleShowExplanation}
                    className="bg-[#F9F9F9] text-[#333333] px-6 py-3 rounded-lg font-bold hover:bg-[#E5E5E5] transition border border-[#E5E5E5]"
                  >
                    Show Explanation
                  </button>
                )}
              </div>
              <div>
                {(showExplanation || selectedAnswer !== null) && (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition"
                  >
                    {currentQuestion < (isRetakeMode ? retakeQuestions.length : quizQuestions.length) - 1 ? 'Next Question' : (isRetakeMode ? 'Complete Retake' : 'See Results')}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Current Score */}
          <div className="text-center">
            <div className="inline-block bg-white rounded-lg shadow border border-[#E5E5E5] px-6 py-3">
              <span className="text-[#666666]">
                {isRetakeMode ? 'Retake Score: ' : 'Current Score: '}
              </span>
              <span className="font-bold text-[#1A1A1A]">
                {score} / {currentQuestion + (selectedAnswer !== null ? 1 : 0)}
              </span>
              {score > 0 && (
                <span className="ml-2 text-[#22C55E]">
                  {score === currentQuestion + (selectedAnswer !== null ? 1 : 0) ? '🎉' : '👍'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 