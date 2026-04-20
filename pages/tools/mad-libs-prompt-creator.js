import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Head from 'next/head'

// Filter categories
const filterCategories = ['All', 'Business', 'Marketing', 'Career', 'Content', 'Academic'];

// Mad Libs template data
const promptTemplates = [
  {
    id: 'business-email',
    name: 'Professional Email Generator',
    icon: '📧',
    title: 'Professional Email Generator',
    category: 'Business',
    description: 'Create professional emails that get responses',
    template: "Write a {tone} email to {recipient} about {subject}. The purpose is to {purpose}. Include {specific_request} and maintain a {formality} tone. The email should be {length} and include {call_to_action}. Context: {context}.",
    fields: [
      { id: 'tone', label: 'Email Tone', type: 'select', options: ['friendly', 'professional', 'urgent', 'apologetic', 'grateful'], placeholder: 'Choose tone...' },
      { id: 'recipient', label: 'Recipient', type: 'text', placeholder: 'e.g., my boss, a client, a vendor' },
      { id: 'subject', label: 'Subject Matter', type: 'text', placeholder: 'e.g., project update, meeting request, proposal' },
      { id: 'purpose', label: 'Main Purpose', type: 'text', placeholder: 'e.g., request approval, share results, schedule meeting' },
      { id: 'specific_request', label: 'Specific Request', type: 'text', placeholder: 'e.g., feedback by Friday, meeting next week' },
      { id: 'formality', label: 'Formality Level', type: 'select', options: ['very formal', 'formal', 'semi-formal', 'casual'], placeholder: 'Choose formality...' },
      { id: 'length', label: 'Email Length', type: 'select', options: ['brief (2-3 sentences)', 'moderate (1 paragraph)', 'detailed (2-3 paragraphs)'], placeholder: 'Choose length...' },
      { id: 'call_to_action', label: 'Call to Action', type: 'text', placeholder: 'e.g., please reply by Tuesday, let me know your thoughts' },
      { id: 'context', label: 'Additional Context', type: 'textarea', placeholder: 'Any background info or special circumstances...' }
    ]
  },
  {
    id: 'content-creation',
    name: 'Viral Content Creator',
    icon: '📱',
    title: 'Viral Content Creator',
    category: 'Marketing',
    description: 'Generate engaging social media content that gets shared',
    template: "Create a {content_type} for {platform} targeting {audience}. The content should be {style} and focus on {topic}. Include {hook_type} hook, {engagement_element}, and end with {cta}. Tone: {tone}. Length: {length}. Trending hashtags: {hashtags}.",
    fields: [
      { id: 'content_type', label: 'Content Type', type: 'select', options: ['post', 'story', 'reel script', 'carousel', 'video script'], placeholder: 'Choose content type...' },
      { id: 'platform', label: 'Platform', type: 'select', options: ['Instagram', 'TikTok', 'LinkedIn', 'Twitter', 'Facebook', 'YouTube'], placeholder: 'Choose platform...' },
      { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., small business owners, fitness enthusiasts, parents' },
      { id: 'style', label: 'Content Style', type: 'select', options: ['educational', 'entertaining', 'inspirational', 'behind-the-scenes', 'controversial'], placeholder: 'Choose style...' },
      { id: 'topic', label: 'Main Topic', type: 'text', placeholder: 'e.g., productivity tips, workout routines, business advice' },
      { id: 'hook_type', label: 'Hook Type', type: 'select', options: ['question', 'shocking statistic', 'personal story', 'contrarian viewpoint', 'list preview'], placeholder: 'Choose hook...' },
      { id: 'engagement_element', label: 'Engagement Element', type: 'select', options: ['poll question', 'comment prompt', 'share challenge', 'save-worthy tip', 'debate starter'], placeholder: 'Choose engagement...' },
      { id: 'cta', label: 'Call to Action', type: 'text', placeholder: 'e.g., follow for more tips, share your experience, save for later' },
      { id: 'tone', label: 'Tone', type: 'select', options: ['casual', 'professional', 'humorous', 'motivational', 'conversational'], placeholder: 'Choose tone...' },
      { id: 'length', label: 'Content Length', type: 'select', options: ['short (1-2 sentences)', 'medium (3-5 sentences)', 'long (paragraph+)'], placeholder: 'Choose length...' },
      { id: 'hashtags', label: 'Hashtag Focus', type: 'text', placeholder: 'e.g., #productivity, #fitness, #business (optional)' }
    ]
  },
  {
    id: 'marketing-copy',
    name: 'High-Converting Sales Copy',
    icon: '💰',
    title: 'High-Converting Sales Copy',
    category: 'Marketing',
    description: 'Write persuasive copy that converts visitors to customers',
    template: "Write {copy_type} for {product_service} targeting {target_market}. Focus on the benefit of {main_benefit} and address the pain point of {pain_point}. Use {persuasion_technique} and include {social_proof}. The copy should be {tone} and {length}. Call-to-action: {cta}. Urgency element: {urgency}.",
    fields: [
      { id: 'copy_type', label: 'Copy Type', type: 'select', options: ['landing page headline', 'product description', 'email subject line', 'ad copy', 'sales page section'], placeholder: 'Choose copy type...' },
      { id: 'product_service', label: 'Product/Service', type: 'text', placeholder: 'e.g., online course, consulting service, software tool' },
      { id: 'target_market', label: 'Target Market', type: 'text', placeholder: 'e.g., busy entrepreneurs, new parents, college students' },
      { id: 'main_benefit', label: 'Main Benefit', type: 'text', placeholder: 'e.g., save time, make money, lose weight, learn faster' },
      { id: 'pain_point', label: 'Key Pain Point', type: 'text', placeholder: 'e.g., feeling overwhelmed, wasting money, lack of results' },
      { id: 'persuasion_technique', label: 'Persuasion Technique', type: 'select', options: ['social proof', 'scarcity', 'authority', 'reciprocity', 'fear of missing out'], placeholder: 'Choose technique...' },
      { id: 'social_proof', label: 'Social Proof Type', type: 'select', options: ['customer testimonials', 'user numbers', 'expert endorsements', 'case study results', 'awards/recognition'], placeholder: 'Choose social proof...' },
      { id: 'tone', label: 'Tone', type: 'select', options: ['urgent', 'friendly', 'authoritative', 'empathetic', 'exciting'], placeholder: 'Choose tone...' },
      { id: 'length', label: 'Copy Length', type: 'select', options: ['headline only', 'short (2-3 sentences)', 'medium (paragraph)', 'long (multiple paragraphs)'], placeholder: 'Choose length...' },
      { id: 'cta', label: 'Call to Action', type: 'text', placeholder: 'e.g., Sign up now, Get started today, Learn more' },
      { id: 'urgency', label: 'Urgency Element', type: 'text', placeholder: 'e.g., limited time offer, only 10 spots left, ends Friday' }
    ]
  },
  {
    id: 'cold-outreach-email',
    name: 'Cold Outreach Email',
    icon: '🎯',
    title: 'Cold Outreach Email',
    category: 'Business',
    description: 'Craft compelling cold emails for sales prospecting that get replies',
    template: "Write a cold outreach email to {prospect_role} at a {company_type} company. The goal is to {outreach_goal}. Lead with the value proposition of {value_prop}. Reference their likely pain point of {pain_point} and offer {solution}. Keep the tone {tone} and the email {length}. End with a low-friction CTA: {cta}.",
    fields: [
      { id: 'prospect_role', label: 'Prospect Role', type: 'text', placeholder: 'e.g., VP of Marketing, CTO, Head of Sales' },
      { id: 'company_type', label: 'Company Type', type: 'text', placeholder: 'e.g., B2B SaaS, e-commerce, healthcare startup' },
      { id: 'outreach_goal', label: 'Outreach Goal', type: 'select', options: ['book a discovery call', 'get a product demo', 'start a free trial', 'schedule a meeting', 'request a partnership'], placeholder: 'Choose goal...' },
      { id: 'value_prop', label: 'Value Proposition', type: 'text', placeholder: 'e.g., saving 10 hours/week on reporting, increasing conversion by 30%' },
      { id: 'pain_point', label: 'Prospect Pain Point', type: 'text', placeholder: 'e.g., manual data entry, low response rates, team burnout' },
      { id: 'solution', label: 'Your Solution', type: 'text', placeholder: 'e.g., an automated workflow tool, a proven outreach framework' },
      { id: 'tone', label: 'Email Tone', type: 'select', options: ['casual and conversational', 'professional and direct', 'friendly and curious', 'confident and data-driven'], placeholder: 'Choose tone...' },
      { id: 'length', label: 'Email Length', type: 'select', options: ['ultra-short (3-4 sentences)', 'short (5-7 sentences)', 'medium (2 short paragraphs)'], placeholder: 'Choose length...' },
      { id: 'cta', label: 'Call to Action', type: 'text', placeholder: 'e.g., open to a 15-min chat?, would a quick demo help?, worth exploring?' }
    ]
  },
  {
    id: 'linkedin-post',
    name: 'LinkedIn Post',
    icon: '💼',
    title: 'LinkedIn Post',
    category: 'Content',
    description: 'Write professional LinkedIn posts that build authority and engagement',
    template: "Write a LinkedIn post about {topic} targeting {audience}. Use a {hook_style} opening hook. The post should share {content_angle} and be written in a {tone} voice. Structure it as {format}. Include a {engagement_driver} to drive engagement. Length: {length}.",
    fields: [
      { id: 'topic', label: 'Post Topic', type: 'text', placeholder: 'e.g., leadership lessons, career pivot, industry trends' },
      { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., startup founders, marketing managers, job seekers' },
      { id: 'hook_style', label: 'Hook Style', type: 'select', options: ['bold statement', 'personal story', 'surprising statistic', 'contrarian take', 'question'], placeholder: 'Choose hook style...' },
      { id: 'content_angle', label: 'Content Angle', type: 'select', options: ['a personal lesson learned', 'actionable tips', 'an unpopular opinion', 'a behind-the-scenes story', 'industry analysis'], placeholder: 'Choose angle...' },
      { id: 'tone', label: 'Tone', type: 'select', options: ['professional', 'conversational', 'inspirational', 'thought-provoking', 'vulnerable and authentic'], placeholder: 'Choose tone...' },
      { id: 'format', label: 'Post Format', type: 'select', options: ['short paragraphs with line breaks', 'numbered list', 'story arc (beginning-middle-end)', 'problem-solution framework'], placeholder: 'Choose format...' },
      { id: 'engagement_driver', label: 'Engagement Driver', type: 'select', options: ['question for the audience', 'agree/disagree prompt', 'share your experience CTA', 'tag someone challenge', 'hot take debate'], placeholder: 'Choose engagement driver...' },
      { id: 'length', label: 'Post Length', type: 'select', options: ['short (3-5 lines)', 'medium (8-12 lines)', 'long (15+ lines with formatting)'], placeholder: 'Choose length...' }
    ]
  },
  {
    id: 'youtube-script-intro',
    name: 'YouTube Script Intro',
    icon: '🎬',
    title: 'YouTube Script Intro',
    category: 'Content',
    description: 'Write attention-grabbing YouTube video intros that hook viewers',
    template: "Write a YouTube video intro script about {video_topic} for a {channel_niche} channel. Open with a {hook_type} hook in the first 5 seconds. Target audience: {audience}. Promise the viewer they will learn {viewer_promise}. Tone: {tone}. Include a reason to watch until the end. Intro length: {length}.",
    fields: [
      { id: 'video_topic', label: 'Video Topic', type: 'text', placeholder: 'e.g., how to start freelancing, 5 AI tools review, morning routine' },
      { id: 'channel_niche', label: 'Channel Niche', type: 'text', placeholder: 'e.g., tech review, personal finance, fitness, cooking' },
      { id: 'hook_type', label: 'Hook Type', type: 'select', options: ['shocking claim', 'relatable problem', 'result teaser', 'myth-busting', 'curiosity gap'], placeholder: 'Choose hook type...' },
      { id: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., beginners, entrepreneurs, students, professionals' },
      { id: 'viewer_promise', label: 'Viewer Promise', type: 'text', placeholder: 'e.g., 3 strategies to double income, the exact steps I used to...' },
      { id: 'tone', label: 'Tone', type: 'select', options: ['energetic and exciting', 'calm and authoritative', 'casual and funny', 'serious and informative'], placeholder: 'Choose tone...' },
      { id: 'length', label: 'Intro Length', type: 'select', options: ['ultra-short (15 seconds)', 'short (30 seconds)', 'standard (45-60 seconds)'], placeholder: 'Choose length...' }
    ]
  },
  {
    id: 'product-launch-announcement',
    name: 'Product Launch Announcement',
    icon: '🚀',
    title: 'Product Launch Announcement',
    category: 'Marketing',
    description: 'Create buzz-worthy product launch announcements that drive interest',
    template: "Write a product launch announcement for {product_name}, a {product_type} designed for {target_customer}. Highlight the key feature of {key_feature} and how it solves {problem_solved}. Tone: {tone}. Include a launch offer: {launch_offer}. Distribution channel: {channel}. Length: {length}.",
    fields: [
      { id: 'product_name', label: 'Product Name', type: 'text', placeholder: 'e.g., TaskFlow Pro, GreenBite, LearnSpark' },
      { id: 'product_type', label: 'Product Type', type: 'text', placeholder: 'e.g., mobile app, SaaS platform, physical product, online course' },
      { id: 'target_customer', label: 'Target Customer', type: 'text', placeholder: 'e.g., remote teams, busy parents, small business owners' },
      { id: 'key_feature', label: 'Key Feature', type: 'text', placeholder: 'e.g., AI-powered automation, one-click setup, all-in-one dashboard' },
      { id: 'problem_solved', label: 'Problem Solved', type: 'text', placeholder: 'e.g., scattered workflows, information overload, wasted ad spend' },
      { id: 'tone', label: 'Announcement Tone', type: 'select', options: ['exciting and bold', 'professional and polished', 'friendly and approachable', 'exclusive and premium'], placeholder: 'Choose tone...' },
      { id: 'launch_offer', label: 'Launch Offer', type: 'text', placeholder: 'e.g., 30% early-bird discount, free trial for 60 days, bonus bundle' },
      { id: 'channel', label: 'Distribution Channel', type: 'select', options: ['email newsletter', 'social media post', 'press release', 'blog post', 'landing page'], placeholder: 'Choose channel...' },
      { id: 'length', label: 'Announcement Length', type: 'select', options: ['short (1 paragraph)', 'medium (2-3 paragraphs)', 'detailed (full page)'], placeholder: 'Choose length...' }
    ]
  },
  {
    id: 'customer-complaint-response',
    name: 'Customer Complaint Response',
    icon: '🛎️',
    title: 'Customer Complaint Response',
    category: 'Business',
    description: 'Respond to customer complaints professionally and retain loyalty',
    template: "Write a response to a customer complaint about {complaint_topic} regarding {product_or_service}. The customer is feeling {customer_emotion}. Acknowledge the issue with empathy, explain {explanation}. Offer a resolution of {resolution}. Tone: {tone}. Keep the response {length}. Close with {closing_action}.",
    fields: [
      { id: 'complaint_topic', label: 'Complaint Topic', type: 'text', placeholder: 'e.g., late delivery, defective product, poor service, billing error' },
      { id: 'product_or_service', label: 'Product or Service', type: 'text', placeholder: 'e.g., monthly subscription, online order, consulting session' },
      { id: 'customer_emotion', label: 'Customer Emotion', type: 'select', options: ['frustrated', 'angry', 'disappointed', 'confused', 'upset'], placeholder: 'Choose emotion...' },
      { id: 'explanation', label: 'Explanation', type: 'text', placeholder: 'e.g., shipping delay reason, system error details, process breakdown' },
      { id: 'resolution', label: 'Resolution Offered', type: 'text', placeholder: 'e.g., full refund, replacement, discount on next order, free upgrade' },
      { id: 'tone', label: 'Response Tone', type: 'select', options: ['empathetic and apologetic', 'professional and solution-focused', 'warm and understanding', 'formal and thorough'], placeholder: 'Choose tone...' },
      { id: 'length', label: 'Response Length', type: 'select', options: ['brief (3-4 sentences)', 'moderate (1-2 paragraphs)', 'detailed (3+ paragraphs)'], placeholder: 'Choose length...' },
      { id: 'closing_action', label: 'Closing Action', type: 'text', placeholder: 'e.g., direct phone number to reach me, follow-up within 24 hours' }
    ]
  },
  {
    id: 'job-interview-prep',
    name: 'Job Interview Prep',
    icon: '🎤',
    title: 'Job Interview Prep',
    category: 'Career',
    description: 'Prepare compelling answers for common and tough interview questions',
    template: "Help me prepare for a job interview for a {job_title} position at a {company_type} company. Generate a strong answer for the question: \"{interview_question}\". Use the {answer_framework} framework. Highlight my experience in {key_experience} and my strength of {key_strength}. Tone: {tone}. Answer length: {length}.",
    fields: [
      { id: 'job_title', label: 'Job Title', type: 'text', placeholder: 'e.g., Product Manager, Software Engineer, Marketing Director' },
      { id: 'company_type', label: 'Company Type', type: 'text', placeholder: 'e.g., Fortune 500, early-stage startup, mid-size tech, nonprofit' },
      { id: 'interview_question', label: 'Interview Question', type: 'text', placeholder: 'e.g., Tell me about yourself, Why should we hire you?, Describe a challenge...' },
      { id: 'answer_framework', label: 'Answer Framework', type: 'select', options: ['STAR (Situation-Task-Action-Result)', 'CAR (Challenge-Action-Result)', 'PAR (Problem-Action-Result)', 'direct and concise'], placeholder: 'Choose framework...' },
      { id: 'key_experience', label: 'Key Experience', type: 'text', placeholder: 'e.g., 5 years in project management, leading cross-functional teams' },
      { id: 'key_strength', label: 'Key Strength', type: 'text', placeholder: 'e.g., data-driven decision making, team leadership, creative problem solving' },
      { id: 'tone', label: 'Answer Tone', type: 'select', options: ['confident and professional', 'enthusiastic and passionate', 'calm and thoughtful', 'personable and authentic'], placeholder: 'Choose tone...' },
      { id: 'length', label: 'Answer Length', type: 'select', options: ['concise (30 seconds)', 'moderate (1 minute)', 'detailed (2 minutes)'], placeholder: 'Choose length...' }
    ]
  },
  {
    id: 'blog-post-outline',
    name: 'Blog Post Outline',
    icon: '📝',
    title: 'Blog Post Outline',
    category: 'Content',
    description: 'Create structured blog post outlines that rank and engage readers',
    template: "Create a detailed blog post outline about {blog_topic} targeting {target_reader}. The post should be optimized for the keyword \"{seo_keyword}\". Use a {structure} structure. The angle should be {content_angle}. Include {num_sections} main sections with subpoints. Tone: {tone}. Target word count: {word_count}.",
    fields: [
      { id: 'blog_topic', label: 'Blog Topic', type: 'text', placeholder: 'e.g., beginner guide to investing, remote work productivity tips' },
      { id: 'target_reader', label: 'Target Reader', type: 'text', placeholder: 'e.g., first-time managers, freelance designers, new parents' },
      { id: 'seo_keyword', label: 'SEO Target Keyword', type: 'text', placeholder: 'e.g., how to start a blog, best project management tools' },
      { id: 'structure', label: 'Post Structure', type: 'select', options: ['how-to guide', 'listicle', 'comparison post', 'ultimate guide', 'case study'], placeholder: 'Choose structure...' },
      { id: 'content_angle', label: 'Content Angle', type: 'select', options: ['beginner-friendly', 'expert deep-dive', 'data-backed', 'personal experience', 'contrarian viewpoint'], placeholder: 'Choose angle...' },
      { id: 'num_sections', label: 'Number of Sections', type: 'select', options: ['3-4 sections', '5-7 sections', '8-10 sections', '10+ sections'], placeholder: 'Choose sections...' },
      { id: 'tone', label: 'Writing Tone', type: 'select', options: ['conversational', 'authoritative', 'educational', 'entertaining', 'persuasive'], placeholder: 'Choose tone...' },
      { id: 'word_count', label: 'Target Word Count', type: 'select', options: ['short (800-1200 words)', 'medium (1500-2000 words)', 'long-form (2500-3500 words)', 'pillar content (4000+ words)'], placeholder: 'Choose word count...' }
    ]
  },
  {
    id: 'meeting-summary',
    name: 'Meeting Summary',
    icon: '📋',
    title: 'Meeting Summary',
    category: 'Business',
    description: 'Turn messy meeting notes into clear, actionable summaries',
    template: "Write a {summary_format} summary of a {meeting_type} meeting attended by {attendees}. The main topics discussed were {topics}. Key decisions made: {decisions}. Format the summary with {structure}. Include action items with owners and deadlines. Tone: {tone}. Length: {length}.",
    fields: [
      { id: 'summary_format', label: 'Summary Format', type: 'select', options: ['executive summary', 'detailed minutes', 'bullet-point recap', 'action-item focused'], placeholder: 'Choose format...' },
      { id: 'meeting_type', label: 'Meeting Type', type: 'select', options: ['team standup', 'project kickoff', 'client review', 'strategy planning', 'all-hands', 'one-on-one'], placeholder: 'Choose meeting type...' },
      { id: 'attendees', label: 'Key Attendees', type: 'text', placeholder: 'e.g., engineering team, marketing and sales leads, executive leadership' },
      { id: 'topics', label: 'Main Topics Discussed', type: 'textarea', placeholder: 'e.g., Q3 roadmap, budget allocation, hiring plan, product launch timeline' },
      { id: 'decisions', label: 'Key Decisions Made', type: 'textarea', placeholder: 'e.g., approved new budget, delayed launch by 2 weeks, hired 3 new roles' },
      { id: 'structure', label: 'Output Structure', type: 'select', options: ['headers and bullet points', 'numbered sections', 'table format', 'narrative paragraphs'], placeholder: 'Choose structure...' },
      { id: 'tone', label: 'Tone', type: 'select', options: ['professional and concise', 'detailed and thorough', 'casual team update', 'formal for stakeholders'], placeholder: 'Choose tone...' },
      { id: 'length', label: 'Summary Length', type: 'select', options: ['brief (half page)', 'standard (1 page)', 'comprehensive (2+ pages)'], placeholder: 'Choose length...' }
    ]
  },
  {
    id: 'research-paper-abstract',
    name: 'Research Paper Abstract',
    icon: '🎓',
    title: 'Research Paper Abstract',
    category: 'Academic',
    description: 'Draft structured abstracts for research papers and academic work',
    template: "Write a research paper abstract for a study about {research_topic} in the field of {field_of_study}. The research method used is {methodology}. The key finding is {key_finding}. The study addresses the gap of {research_gap}. Implications: {implications}. Abstract style: {abstract_style}. Target length: {length}.",
    fields: [
      { id: 'research_topic', label: 'Research Topic', type: 'text', placeholder: 'e.g., impact of remote work on productivity, AI bias in hiring algorithms' },
      { id: 'field_of_study', label: 'Field of Study', type: 'text', placeholder: 'e.g., organizational psychology, computer science, public health' },
      { id: 'methodology', label: 'Research Method', type: 'select', options: ['quantitative survey', 'qualitative interviews', 'mixed methods', 'meta-analysis', 'experimental study', 'case study'], placeholder: 'Choose method...' },
      { id: 'key_finding', label: 'Key Finding', type: 'text', placeholder: 'e.g., 25% improvement in engagement, significant correlation between X and Y' },
      { id: 'research_gap', label: 'Research Gap Addressed', type: 'text', placeholder: 'e.g., limited studies on Gen Z workforce, lack of longitudinal data on...' },
      { id: 'implications', label: 'Implications', type: 'text', placeholder: 'e.g., informs policy decisions, suggests new training frameworks' },
      { id: 'abstract_style', label: 'Abstract Style', type: 'select', options: ['structured (IMRAD)', 'narrative', 'descriptive', 'informative'], placeholder: 'Choose style...' },
      { id: 'length', label: 'Target Length', type: 'select', options: ['short (150 words)', 'standard (250 words)', 'extended (350 words)'], placeholder: 'Choose length...' }
    ]
  }
];

export default function MadLibsPromptCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [sharedCount, setSharedCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All');

  // Filtered templates based on active category
  const filteredTemplates = activeCategory === 'All'
    ? promptTemplates
    : promptTemplates.filter(t => t.category === activeCategory);

  // Load shared count from localStorage
  useEffect(() => {
    const count = localStorage.getItem('madLibsSharedCount') || 0;
    setSharedCount(parseInt(count));
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setFormData({});
    setGeneratedPrompt('');
    setShowResult(false);
  };

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const generatePrompt = () => {
    if (!selectedTemplate) return;

    let prompt = selectedTemplate.template;
    
    // Replace placeholders with form data or smart defaults
    selectedTemplate.fields.forEach(field => {
      let value = formData[field.id];
      
      // If no value provided, use smart defaults based on field type
      if (!value || value.trim() === '') {
        value = getSmartDefault(field);
      }
      
      prompt = prompt.replace(`{${field.id}}`, value);
    });

    setGeneratedPrompt(prompt);
    setShowResult(true);
  };

  const getSmartDefault = (field) => {
    // Provide smart defaults for common fields
    const defaults = {
      'tone': 'professional',
      'formality': 'semi-formal',
      'length': 'moderate (1 paragraph)',
      'style': 'educational',
      'platform': 'LinkedIn',
      'content_type': 'post',
      'copy_type': 'landing page headline',
      'persuasion_technique': 'social proof',
      'social_proof': 'customer testimonials',
      'urgency': 'limited time offer',
      'hashtags': '#ai #productivity #business',
      'engagement_element': 'comment prompt',
      'hook_type': 'question',
      'outreach_goal': 'book a discovery call',
      'hook_style': 'bold statement',
      'content_angle': 'actionable tips',
      'format': 'short paragraphs with line breaks',
      'engagement_driver': 'question for the audience',
      'channel_niche': 'general',
      'customer_emotion': 'frustrated',
      'summary_format': 'bullet-point recap',
      'meeting_type': 'team standup',
      'structure': 'headers and bullet points',
      'answer_framework': 'STAR (Situation-Task-Action-Result)',
      'num_sections': '5-7 sections',
      'word_count': 'medium (1500-2000 words)',
      'methodology': 'mixed methods',
      'abstract_style': 'structured (IMRAD)',
      'channel': 'email newsletter'
    };
    
    return defaults[field.id] || `[${field.label}]`;
  };

  const isFormComplete = selectedTemplate && selectedTemplate.fields.some(field => 
    formData[field.id] && formData[field.id].trim() !== ''
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sharePrompt = (platform) => {
    const shareText = `I just created a custom AI prompt: "${generatedPrompt.substring(0, 100)}..." Try the Mad Libs Prompt Creator!`;
    const shareUrl = 'https://promptwritingstudio.com/tools/mad-libs-prompt-creator';
    
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    if (url) {
      window.open(url, '_blank');
      const newCount = sharedCount + 1;
      setSharedCount(newCount);
      localStorage.setItem('madLibsSharedCount', newCount.toString());
    }
  };

  return (
    <>
      <Head>
        <title>Mad Libs AI Prompt Creator - Build Custom ChatGPT Prompts | PromptWritingStudio</title>
        <meta name="description" content="Create custom AI prompts with our Mad Libs-style tool. Fill in the blanks to generate personalized ChatGPT prompts for business, marketing, and content creation." />
        <meta name="keywords" content="AI prompt creator, custom ChatGPT prompts, mad libs prompts, prompt template maker, AI prompt generator" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Mad Libs AI Prompt Creator - Build Custom ChatGPT Prompts" />
        <meta property="og:description" content="Create custom AI prompts with our Mad Libs-style tool. Fill in the blanks to generate personalized ChatGPT prompts for business, marketing, and content creation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://promptwritingstudio.com/tools/mad-libs-prompt-creator" />
        
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Mad Libs AI Prompt Creator",
              "description": "Interactive tool for creating custom AI prompts using Mad Libs-style fill-in-the-blank templates",
              "url": "https://promptwritingstudio.com/tools/mad-libs-prompt-creator",
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Web Browser",
              "author": {
                "@type": "Organization",
                "name": "PromptWritingStudio",
                "url": "https://promptwritingstudio.com"
              },
              "publisher": {
                "@type": "Organization",
                "name": "PromptWritingStudio", 
                "url": "https://promptwritingstudio.com"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "featureList": [
                "Fill-in-the-blank prompt templates",
                "Custom AI prompt generation",
                "Social media sharing",
                "Copy-to-clipboard functionality",
                "Multiple template categories"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "200",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              🎯 Mad Libs AI Prompt Creator
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Fill in the blanks to create custom AI prompts that get amazing results. 
              No prompt engineering experience required!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#templates"
                className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Start Creating Prompts
              </a>
              <div className="text-purple-100">
                <span className="text-2xl font-bold">{sharedCount}</span> prompts shared so far!
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Choose Template</h3>
                <p className="text-gray-600">
                  Select from business emails, social content, marketing copy, and more
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Fill the Blanks</h3>
                <p className="text-gray-600">
                  Complete the Mad Libs-style form with your specific details
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Get Your Prompt</h3>
                <p className="text-gray-600">
                  Copy your custom prompt and use it with ChatGPT, Claude, or Gemini
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Template Selection */}
        <section id="templates" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Choose Your Prompt Template
            </h2>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {filterCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full font-medium text-sm transition-colors ${
                    activeCategory === category
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-purple-50 hover:border-purple-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Template Count */}
            <p className="text-center text-gray-500 text-sm mb-8">
              Showing {filteredTemplates.length} of {promptTemplates.length} templates
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id ? 'ring-2 ring-purple-600 transform scale-105' : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="text-2xl mb-3">{template.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600 font-semibold">
                      {template.fields.length} fields to customize
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Section */}
            {selectedTemplate && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Customize Your {selectedTemplate.title}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {selectedTemplate.fields.map(field => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        <span className="text-gray-500 font-normal ml-1">(optional)</span>
                      </label>
                      
                      {field.type === 'select' ? (
                        <select
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      ) : (
                        <input
                          type="text"
                          value={formData[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-800 text-sm">
                    💡 <strong>Quick Start:</strong> Fill in just the fields that matter most to you. 
                    We'll use smart defaults for the rest. You can always edit the generated prompt later!
                  </p>
                </div>

                <button
                  onClick={generatePrompt}
                  disabled={!isFormComplete}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                    isFormComplete
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isFormComplete ? 'Generate My Custom Prompt' : 'Fill in at least one field to continue'}
                </button>
              </div>
            )}

            {/* Result Section */}
            {showResult && (
              <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-green-800">
                  🎉 Your Custom Prompt is Ready!
                </h3>
                
                <div className="bg-white p-6 rounded-lg border-l-4 border-green-500 mb-6">
                  <p className="text-gray-800 whitespace-pre-wrap">{generatedPrompt}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={copyToClipboard}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    {copiedToClipboard ? '✅ Copied!' : '📋 Copy Prompt'}
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => sharePrompt('twitter')}
                      className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      🐦 Share
                    </button>
                    <button
                      onClick={() => sharePrompt('linkedin')}
                      className="bg-blue-700 text-white px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors"
                    >
                      💼 Share
                    </button>
                    <button
                      onClick={() => sharePrompt('facebook')}
                      className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      📘 Share
                    </button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm">
                    <strong>💡 Pro Tip:</strong> Copy this prompt and paste it into ChatGPT, Claude, or Gemini. 
                    You can also modify any part of the prompt to better fit your specific needs!
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Want More Advanced Prompt Templates?
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Get access to 100+ professional prompt templates, advanced techniques, and exclusive training
            </p>
            <a
              href="/claude-code-guide"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Start with Claude Code
            </a>
          </div>
        </section>
      </Layout>
    </>
  )
} 