/**
 * AI Prompt Generator Component System
 * 
 * This file defines the data structure for the AI prompt generator component system.
 * It includes:
 * 1. Core components that make up a well-structured prompt
 * 2. Platform-specific templates and best practices
 * 3. Use case templates for common scenarios
 * 4. Helper functions for generating prompts
 */

// =========================================
// CORE COMPONENTS
// =========================================

/**
 * Core components that make up a well-structured prompt
 * These are based on best practices from OpenAI, Anthropic, and Google
 */
export const promptComponents = {
  task: {
    id: "task",
    name: "Task Definition",
    description: "Clearly define what you want the AI to do",
    required: true,
    platforms: ["openai", "anthropic", "google"],
    inputType: "textarea",
    placeholder: "Write a blog post about...",
    examples: [
      "Write a comprehensive blog post about renewable energy technologies",
      "Analyze the following customer feedback and identify key themes",
      "Create a marketing email for our new product launch"
    ],
    tips: "Be specific about what you want. Include details like length, depth, and focus.",
    bestPractices: {
      openai: "Start with a clear instruction at the beginning of your prompt.",
      anthropic: "Use XML tags to clearly define the task: <task>Your task description</task>",
      google: "Begin with a direct statement of what you want Gemini to do."
    }
  },
  
  context: {
    id: "context",
    name: "Context & Background",
    description: "Provide relevant information and constraints",
    required: false,
    platforms: ["openai", "anthropic", "google"],
    inputType: "textarea",
    placeholder: "Our target audience is...",
    examples: [
      "Our company sells eco-friendly home products to environmentally conscious consumers aged 25-45.",
      "This analysis is for an internal team meeting where we'll decide on product improvements.",
      "The customer data comes from our Q1 2025 satisfaction survey with 500 respondents."
    ],
    tips: "Include any background information the AI needs to understand your request. Mention constraints, audience, and purpose.",
    bestPractices: {
      openai: "Use delimiters like ### or --- to separate context from instructions.",
      anthropic: "Place context in its own section: <context>Your context here</context>",
      google: "Clearly separate context from instructions using headers or sections."
    }
  },
  
  format: {
    id: "format",
    name: "Output Format",
    description: "Specify how you want the response structured",
    required: false,
    platforms: ["openai", "anthropic", "google"],
    inputType: "textarea",
    placeholder: "Format the response as...",
    examples: [
      "Format the response as a bulleted list with 5-7 main points, each with 2-3 sentences of explanation.",
      "Respond in a table with three columns: Issue, Impact, and Recommendation.",
      "Write in markdown format with H2 headings for each section and code examples where relevant."
    ],
    tips: "Be explicit about the structure, length, and formatting you want.",
    bestPractices: {
      openai: "Specify the exact format, including any headers, sections, or structural elements.",
      anthropic: "Use <format> tags and be specific about structure: <format>JSON with fields: title, description, steps</format>",
      google: "Clearly define the output structure, especially for technical formats like JSON or tables."
    }
  },
  
  examples: {
    id: "examples",
    name: "Examples (Few-Shot Learning)",
    description: "Provide examples of desired inputs and outputs",
    required: false,
    platforms: ["openai", "anthropic", "google"],
    inputType: "textarea",
    placeholder: "Example 1: Input... Output...",
    examples: [
      "Example 1:\nInput: Customer complaint about shipping delay\nOutput: 'We apologize for the delay in your shipment. Our team is working to expedite your order...'",
      "Example: When I ask 'Summarize this article', respond with a 3-paragraph summary with these sections: Overview, Key Points, Conclusion.",
      "Example of good response:\n- Point 1: Clear and concise\n- Point 2: Evidence-based\n- Point 3: Actionable advice"
    ],
    tips: "Providing examples (few-shot learning) significantly improves AI performance on specific formats or styles.",
    bestPractices: {
      openai: "Include 2-3 examples of desired input-output pairs for complex tasks.",
      anthropic: "Use <example> tags for each example: <example>Input: X\nOutput: Y</example>",
      google: "For complex outputs, always provide at least one full example of the desired result."
    }
  },
  
  reasoning: {
    id: "reasoning",
    name: "Reasoning Method",
    description: "Specify how you want the AI to approach the problem",
    required: false,
    platforms: ["openai", "anthropic", "google"],
    inputType: "select",
    options: [
      { value: "step_by_step", label: "Step-by-Step (Chain of Thought)" },
      { value: "pros_cons", label: "Pros and Cons Analysis" },
      { value: "multiple_perspectives", label: "Multiple Perspectives" },
      { value: "first_principles", label: "First Principles Thinking" },
      { value: "none", label: "No Specific Reasoning Method" }
    ],
    examples: [
      "Think step by step to solve this problem, showing your work at each stage.",
      "Analyze this decision by listing all pros and cons, then make a recommendation.",
      "Approach this question from at least three different perspectives before concluding."
    ],
    tips: "Asking the AI to show its reasoning often produces more accurate and thoughtful responses.",
    bestPractices: {
      openai: "Use phrases like 'Let's think step by step' or 'Reason through this carefully'.",
      anthropic: "Claude responds well to explicit reasoning requests: 'Think through this step by step before answering.'",
      google: "For complex problems, always ask Gemini to show its work or reasoning process."
    }
  },
  
  tone: {
    id: "tone",
    name: "Tone & Style",
    description: "Define the voice and style for the response",
    required: false,
    platforms: ["openai", "anthropic", "google"],
    inputType: "select",
    options: [
      { value: "professional", label: "Professional" },
      { value: "conversational", label: "Conversational" },
      { value: "academic", label: "Academic" },
      { value: "enthusiastic", label: "Enthusiastic" },
      { value: "technical", label: "Technical" },
      { value: "simple", label: "Simple & Clear" }
    ],
    examples: [
      "Write in a professional tone suitable for a business audience.",
      "Use a conversational, friendly tone as if explaining to a colleague.",
      "Write in an academic style with proper citations and technical terminology."
    ],
    tips: "Specifying tone helps ensure the response matches your needs and audience expectations.",
    bestPractices: {
      openai: "Directly specify the tone: 'Write in a [tone] style...'",
      anthropic: "Claude responds well to tone guidance in system prompts or at the beginning of your request.",
      google: "Be explicit about tone requirements, especially for content creation tasks."
    }
  },
  
  audience: {
    id: "audience",
    name: "Target Audience",
    description: "Specify who the content is for",
    required: false,
    platforms: ["openai", "anthropic", "google"],
    inputType: "textarea",
    placeholder: "This content is for...",
    examples: [
      "This explanation is for technical team members with programming experience.",
      "Write for small business owners with limited marketing knowledge.",
      "The audience is high school students learning about climate change."
    ],
    tips: "Defining your audience helps the AI adjust complexity, terminology, and examples appropriately.",
    bestPractices: {
      openai: "Specify audience characteristics and knowledge level clearly.",
      anthropic: "Include audience information in your context section.",
      google: "Define audience expertise level and background for better tailored responses."
    }
  },
  
  constraints: {
    id: "constraints",
    name: "Constraints & Requirements",
    description: "Specify limitations or requirements",
    required: false,
    platforms: ["openai", "anthropic", "google"],
    inputType: "textarea",
    placeholder: "Requirements: Keep it under 500 words...",
    examples: [
      "Keep the response under 300 words and avoid industry jargon.",
      "Must include at least 3 data points from the provided research.",
      "Do not mention competitors by name. Focus only on our product advantages."
    ],
    tips: "Clear constraints help ensure the AI's response meets your specific requirements.",
    bestPractices: {
      openai: "List constraints explicitly at the beginning or end of your prompt.",
      anthropic: "Use <constraints> tags to clearly separate these requirements.",
      google: "Number your constraints for clarity and emphasis."
    }
  }
};

// =========================================
// PLATFORM-SPECIFIC TEMPLATES
// =========================================

/**
 * Templates optimized for each AI platform
 * These combine components in ways that work best for each platform
 */
export const platformTemplates = {
  openai: {
    basic: {
      name: "Basic ChatGPT Prompt",
      description: "Simple prompt with essential components",
      components: ["task", "context", "format"],
      template: "# Task\n{{task}}\n\n{{#if context}}# Context\n{{context}}\n\n{{/if}}{{#if format}}# Format\n{{format}}{{/if}}",
      bestFor: ["Quick queries", "Simple content creation", "Basic information requests"]
    },
    detailed: {
      name: "Detailed ChatGPT Prompt",
      description: "Comprehensive prompt with all components",
      components: ["task", "context", "format", "examples", "reasoning", "tone", "audience", "constraints"],
      template: "# Task\n{{task}}\n\n{{#if context}}# Context\n{{context}}\n\n{{/if}}{{#if audience}}# Audience\n{{audience}}\n\n{{/if}}{{#if format}}# Format\n{{format}}\n\n{{/if}}{{#if examples}}# Examples\n{{examples}}\n\n{{/if}}{{#if reasoning}}# Reasoning Approach\n{{reasoning}}\n\n{{/if}}{{#if tone}}# Tone\n{{tone}}\n\n{{/if}}{{#if constraints}}# Constraints\n{{constraints}}{{/if}}",
      bestFor: ["Complex content creation", "Technical writing", "Detailed analysis"]
    },
    cot: {
      name: "Chain-of-Thought Prompt",
      description: "Optimized for problem-solving with step-by-step reasoning",
      components: ["task", "context", "reasoning"],
      template: "# Problem\n{{task}}\n\n{{#if context}}# Context\n{{context}}\n\n{{/if}}# Approach\nThink through this step-by-step and show your reasoning for each step.",
      bestFor: ["Problem solving", "Math questions", "Logic puzzles", "Complex reasoning"]
    }
  },
  
  anthropic: {
    basic: {
      name: "Basic Claude Prompt",
      description: "Simple prompt with XML tags for structure",
      components: ["task", "context", "format"],
      template: "<task>{{task}}</task>\n\n{{#if context}}<context>{{context}}</context>\n\n{{/if}}{{#if format}}<format>{{format}}</format>{{/if}}",
      bestFor: ["Quick queries", "Simple content creation", "Basic information requests"]
    },
    detailed: {
      name: "Detailed Claude Prompt",
      description: "Comprehensive prompt with XML structure",
      components: ["task", "context", "format", "examples", "reasoning", "tone", "audience", "constraints"],
      template: "<task>{{task}}</task>\n\n{{#if context}}<context>{{context}}</context>\n\n{{/if}}{{#if audience}}<audience>{{audience}}</audience>\n\n{{/if}}{{#if format}}<format>{{format}}</format>\n\n{{/if}}{{#if examples}}<examples>{{examples}}</examples>\n\n{{/if}}{{#if reasoning}}<reasoning>{{reasoning}}</reasoning>\n\n{{/if}}{{#if tone}}<tone>{{tone}}</tone>\n\n{{/if}}{{#if constraints}}<constraints>{{constraints}}</constraints>{{/if}}",
      bestFor: ["Complex content creation", "Technical writing", "Detailed analysis"]
    },
    system: {
      name: "Claude System Prompt",
      description: "Using Claude's system prompt capability",
      components: ["task", "context", "constraints", "tone"],
      template: "Human: I need your help with a task.\n\nAssistant: I'll help you with your task. What do you need?\n\nHuman: <task>{{task}}</task>\n\n{{#if context}}<context>{{context}}</context>\n\n{{/if}}{{#if constraints}}<constraints>{{constraints}}</constraints>\n\n{{/if}}{{#if tone}}<tone>{{tone}}</tone>{{/if}}",
      bestFor: ["Role-based interactions", "Constrained responses", "Consistent tone"]
    }
  },
  
  google: {
    basic: {
      name: "Basic Gemini Prompt",
      description: "Simple prompt with clear structure",
      components: ["task", "context", "format"],
      template: "Task: {{task}}\n\n{{#if context}}Context: {{context}}\n\n{{/if}}{{#if format}}Format: {{format}}{{/if}}",
      bestFor: ["Quick queries", "Simple content creation", "Basic information requests"]
    },
    detailed: {
      name: "Detailed Gemini Prompt",
      description: "Comprehensive prompt with all components",
      components: ["task", "context", "format", "examples", "reasoning", "tone", "audience", "constraints"],
      template: "Task: {{task}}\n\n{{#if context}}Context: {{context}}\n\n{{/if}}{{#if audience}}Audience: {{audience}}\n\n{{/if}}{{#if format}}Format: {{format}}\n\n{{/if}}{{#if examples}}Examples: {{examples}}\n\n{{/if}}{{#if reasoning}}Reasoning Approach: {{reasoning}}\n\n{{/if}}{{#if tone}}Tone: {{tone}}\n\n{{/if}}{{#if constraints}}Constraints: {{constraints}}{{/if}}",
      bestFor: ["Complex content creation", "Technical writing", "Detailed analysis"]
    },
    structured: {
      name: "Structured Output Gemini Prompt",
      description: "Optimized for getting structured data responses",
      components: ["task", "format", "examples"],
      template: "Task: {{task}}\n\nI need the response in this exact format:\n{{format}}\n\n{{#if examples}}Example of expected output:\n{{examples}}{{/if}}",
      bestFor: ["Data extraction", "JSON outputs", "Tabular data", "Structured information"]
    }
  }
};

// =========================================
// USE CASE TEMPLATES
// =========================================

/**
 * Pre-configured templates for common use cases
 * These combine components with specific values for popular scenarios
 */
export const useCaseTemplates = {
  blogPost: {
    name: "Blog Post Creation",
    description: "Generate a well-structured blog post on your topic",
    defaultPlatform: "anthropic",
    components: {
      task: "Write a comprehensive blog post about {{topic}}. The post should be informative, engaging, and provide valuable insights for the reader.",
      format: "Structure the blog post with:\n1. An attention-grabbing introduction\n2. 3-5 main sections with subheadings\n3. Practical examples or case studies\n4. A conclusion with key takeaways\n5. Use markdown formatting with proper headings (H2, H3) and bullet points where appropriate.",
      tone: "professional",
      audience: "The audience is {{audience}} who are interested in {{topic}} but may not have deep expertise in the subject.",
      constraints: "The blog post should be approximately 1000-1500 words. Include at least one example or case study. Avoid excessive jargon without explanation."
    },
    variables: [
      {
        id: "topic",
        name: "Blog Topic",
        description: "What is the blog post about?",
        required: true,
        inputType: "text",
        placeholder: "e.g., Sustainable Investing Strategies"
      },
      {
        id: "audience",
        name: "Target Audience",
        description: "Who will be reading this blog post?",
        required: true,
        inputType: "text",
        placeholder: "e.g., Young professionals interested in finance"
      }
    ]
  },
  
  productDescription: {
    name: "Product Description",
    description: "Create compelling product descriptions for marketing",
    defaultPlatform: "openai",
    components: {
      task: "Write a persuasive product description for {{productName}}, which is a {{productType}}.",
      context: "Key features and benefits include:\n{{features}}",
      format: "Structure the description with:\n1. An attention-grabbing headline\n2. A compelling opening sentence\n3. 3-5 bullet points highlighting key features and benefits\n4. A persuasive closing statement with call to action",
      tone: "enthusiastic",
      audience: "The target customers are {{audience}}.",
      constraints: "Keep the description between 150-250 words. Focus on benefits rather than just features. Use persuasive language that creates desire."
    },
    variables: [
      {
        id: "productName",
        name: "Product Name",
        description: "What is the name of your product?",
        required: true,
        inputType: "text",
        placeholder: "e.g., EcoBoost Pro 3000"
      },
      {
        id: "productType",
        name: "Product Type",
        description: "What type of product is this?",
        required: true,
        inputType: "text",
        placeholder: "e.g., portable solar charger"
      },
      {
        id: "features",
        name: "Key Features & Benefits",
        description: "List the main features and benefits",
        required: true,
        inputType: "textarea",
        placeholder: "e.g., - 10,000mAh capacity\n- Fast charging technology\n- Waterproof design\n- Compact and lightweight"
      },
      {
        id: "audience",
        name: "Target Audience",
        description: "Who is this product for?",
        required: true,
        inputType: "text",
        placeholder: "e.g., outdoor enthusiasts and travelers"
      }
    ]
  },
  
  emailCampaign: {
    name: "Marketing Email",
    description: "Create effective marketing emails",
    defaultPlatform: "openai",
    components: {
      task: "Write a marketing email for {{purpose}} that will be sent to our {{audienceType}} audience.",
      context: "Our company is {{companyDescription}}. The key message we want to convey is: {{keyMessage}}",
      format: "Structure the email with:\n1. An attention-grabbing subject line\n2. A personalized greeting\n3. A compelling opening paragraph\n4. 2-3 paragraphs or bullet points with key information\n5. A clear call-to-action\n6. A professional sign-off",
      tone: "{{tone}}",
      constraints: "Keep the email concise (250-350 words). Make sure the call-to-action is clear and compelling. Avoid spam trigger words."
    },
    variables: [
      {
        id: "purpose",
        name: "Email Purpose",
        description: "What is the goal of this email?",
        required: true,
        inputType: "text",
        placeholder: "e.g., announcing our summer sale"
      },
      {
        id: "audienceType",
        name: "Audience Type",
        description: "Who will receive this email?",
        required: true,
        inputType: "text",
        placeholder: "e.g., existing customers who haven't purchased in 3 months"
      },
      {
        id: "companyDescription",
        name: "Company Description",
        description: "Brief description of your company",
        required: true,
        inputType: "text",
        placeholder: "e.g., an eco-friendly skincare brand focused on natural ingredients"
      },
      {
        id: "keyMessage",
        name: "Key Message",
        description: "The main point you want to communicate",
        required: true,
        inputType: "text",
        placeholder: "e.g., our new summer collection is now available with 20% off"
      },
      {
        id: "tone",
        name: "Email Tone",
        description: "What tone should the email have?",
        required: true,
        inputType: "select",
        options: [
          { value: "professional", label: "Professional" },
          { value: "conversational", label: "Conversational" },
          { value: "enthusiastic", label: "Enthusiastic" },
          { value: "urgent", label: "Urgent" }
        ]
      }
    ]
  },
  
  socialMediaPost: {
    name: "Social Media Content",
    description: "Create engaging social media posts",
    defaultPlatform: "google",
    components: {
      task: "Create {{postCount}} social media post(s) for {{platform}} about {{topic}}.",
      context: "Our brand voice is {{brandVoice}}. The goal of these posts is to {{goal}}.",
      format: "For each post include:\n1. The post text (within character limits)\n2. A suggestion for the type of image that would complement the post",
      constraints: "Adhere to platform character limits. Instagram: 2,200 characters, Twitter/X: 280 characters, LinkedIn: 3,000 characters, Facebook: 63,206 characters."
    },
    variables: [
      {
        id: "platform",
        name: "Social Platform",
        description: "Which social media platform is this for?",
        required: true,
        inputType: "select",
        options: [
          { value: "instagram", label: "Instagram" },
          { value: "twitter", label: "Twitter/X" },
          { value: "linkedin", label: "LinkedIn" },
          { value: "facebook", label: "Facebook" }
        ]
      },
      {
        id: "topic",
        name: "Post Topic",
        description: "What is the post about?",
        required: true,
        inputType: "text",
        placeholder: "e.g., our upcoming virtual workshop on digital marketing"
      },
      {
        id: "postCount",
        name: "Number of Posts",
        description: "How many post variations do you need?",
        required: true,
        inputType: "select",
        options: [
          { value: "1", label: "1 post" },
          { value: "3", label: "3 posts" },
          { value: "5", label: "5 posts" }
        ]
      },
      {
        id: "brandVoice",
        name: "Brand Voice",
        description: "How would you describe your brand's voice and tone?",
        required: true,
        inputType: "text",
        placeholder: "e.g., professional but approachable, with occasional humor"
      },
      {
        id: "goal",
        name: "Post Goal",
        description: "What do you want to achieve with these posts?",
        required: true,
        inputType: "text",
        placeholder: "e.g., drive sign-ups for our upcoming webinar"
      }
    ]
  },
  
  seoContent: {
    name: "SEO-Optimized Content",
    description: "Create content designed to rank well in search engines",
    defaultPlatform: "anthropic",
    components: {
      task: "Write SEO-optimized content about {{topic}} targeting the keyword '{{keyword}}'.",
      context: "This content will be published on our website which is about {{websiteDescription}}. Our competitors in this space include {{competitors}}.",
      format: "Structure the content with:\n1. An engaging H1 title that includes the target keyword\n2. An introduction that hooks the reader and includes the keyword\n3. Logical H2 and H3 subheadings that incorporate relevant secondary keywords\n4. 800-1200 words of informative, valuable content\n5. A conclusion with a clear call-to-action\n6. Meta description suggestion (under 160 characters)",
      reasoning: "first_principles",
      audience: "Our target audience is {{audience}} who are searching for information about {{topic}}.",
      constraints: "Naturally incorporate the target keyword 3-5 times. Include semantic variations of the keyword. Ensure readability and value to the reader comes first, SEO second. Include suggestions for internal linking opportunities."
    },
    variables: [
      {
        id: "topic",
        name: "Content Topic",
        description: "What is the content about?",
        required: true,
        inputType: "text",
        placeholder: "e.g., home office ergonomics"
      },
      {
        id: "keyword",
        name: "Target Keyword",
        description: "Primary keyword to target",
        required: true,
        inputType: "text",
        placeholder: "e.g., best ergonomic home office setup"
      },
      {
        id: "websiteDescription",
        name: "Website Description",
        description: "What is your website about?",
        required: true,
        inputType: "text",
        placeholder: "e.g., a resource for remote workers with productivity tips and product reviews"
      },
      {
        id: "competitors",
        name: "Main Competitors",
        description: "Who are your main competitors?",
        required: true,
        inputType: "text",
        placeholder: "e.g., RemoteWork.org, HomeOfficeHQ.com"
      },
      {
        id: "audience",
        name: "Target Audience",
        description: "Who is your target audience?",
        required: true,
        inputType: "text",
        placeholder: "e.g., remote professionals aged 25-45 who work from home"
      }
    ]
  }
};

// =========================================
// HELPER FUNCTIONS
// =========================================

/**
 * Generate a prompt based on selected components and platform
 * @param {string} platform - The AI platform (openai, anthropic, google)
 * @param {string} templateId - The template ID to use
 * @param {Object} componentValues - Values for each component
 * @returns {string} The generated prompt
 */
export function generatePrompt(platform, templateId, componentValues) {
  // Import Handlebars dynamically to avoid SSR issues
  const Handlebars = require('handlebars');
  
  const template = platformTemplates[platform][templateId];
  if (!template) return "Template not found";
  
  // Register Handlebars helpers
  Handlebars.registerHelper('if', function(conditional, options) {
    if (conditional) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  
  // Compile the template with Handlebars
  try {
    const compiledTemplate = Handlebars.compile(template.template);
    
    // Process the template with the component values
    return compiledTemplate(componentValues);
  } catch (error) {
    console.error('Error compiling template:', error);
    return `Error generating prompt: ${error.message}`;
  }
}

/**
 * Generate a prompt from a use case template
 * @param {string} useCaseId - The use case template ID
 * @param {Object} variables - Values for the template variables
 * @returns {Object} The generated prompt and platform
 */
export function generateFromUseCase(useCaseId, variables) {
  // Import Handlebars dynamically to avoid SSR issues
  const Handlebars = require('handlebars');
  
  const useCase = useCaseTemplates[useCaseId];
  if (!useCase) return { prompt: "Use case not found", platform: null };
  
  const componentValues = {};
  
  // Fill in component values from the use case template
  for (const [componentId, template] of Object.entries(useCase.components)) {
    try {
      // Compile the component template
      const compiledTemplate = Handlebars.compile(template);
      
      // Process the template with the variables
      componentValues[componentId] = compiledTemplate(variables);
    } catch (error) {
      console.error(`Error compiling template for ${componentId}:`, error);
      componentValues[componentId] = `Error: ${error.message}`;
    }
  }
  
  // Generate the prompt using the platform's detailed template
  const platform = useCase.defaultPlatform;
  return {
    prompt: generatePrompt(platform, 'detailed', componentValues),
    platform
  };
}

// Export everything for use in the application
export default {
  promptComponents,
  platformTemplates,
  useCaseTemplates,
  generatePrompt,
  generateFromUseCase
};
