/**
 * Site glossary — data-driven source of truth.
 *
 * Add a term: append an entry below. Slug = URL segment under /glossary/<slug>.
 * Categories are defined in `categories`; use their `id` on each term.
 *
 * NOTE: Seeded with ~20 representative terms across all categories. The full
 * 170-term dataset lives in /pages/ai-glossary.js and should be migrated here.
 * See TODO in the PR description.
 */

export const categories = [
  { id: 'basics', label: 'AI Basics', badge: 'bg-blue-100 text-blue-800' },
  { id: 'business', label: 'Business Applications', badge: 'bg-green-100 text-green-800' },
  { id: 'technology', label: 'Technology', badge: 'bg-purple-100 text-purple-800' },
  { id: 'ethics', label: 'Ethics & Safety', badge: 'bg-orange-100 text-orange-800' },
  { id: 'prompting', label: 'Prompting', badge: 'bg-yellow-100 text-yellow-800' },
  { id: 'rag', label: 'RAG', badge: 'bg-pink-100 text-pink-800' },
  { id: 'agents', label: 'Agents & Tools', badge: 'bg-indigo-100 text-indigo-800' },
]

export const glossaryTerms = [
  {
    slug: 'artificial-intelligence',
    term: 'Artificial Intelligence (AI)',
    aliases: ['AI'],
    category: 'basics',
    shortDefinition: 'Computer systems that perform tasks typically requiring human intelligence.',
    definition:
      'Computer systems designed to perform tasks that typically require human intelligence, such as recognizing speech, making decisions, or solving problems. In business, AI helps automate processes and gain insights from data.',
    businessExample: 'Customer service chatbots that can answer common questions 24/7.',
    relatedTerms: ['machine-learning', 'large-language-model', 'generative-ai'],
  },
  {
    slug: 'machine-learning',
    term: 'Machine Learning (ML)',
    aliases: ['ML'],
    category: 'technology',
    shortDefinition: 'A subset of AI where systems learn patterns from data instead of explicit rules.',
    definition:
      'A subset of AI where computers learn patterns from data without being explicitly programmed for each task. The system improves its performance as it processes more information.',
    businessExample: 'Email spam filters that get better at detecting unwanted messages over time.',
    relatedTerms: ['deep-learning', 'supervised-learning', 'training-data'],
  },
  {
    slug: 'large-language-model',
    term: 'Large Language Model (LLM)',
    aliases: ['LLM'],
    category: 'technology',
    shortDefinition: 'AI trained on vast text data to understand and generate human-like language.',
    definition:
      'AI systems trained on vast amounts of text data to understand and generate human-like language. These models can write, summarize, translate, and answer questions.',
    businessExample: 'ChatGPT helping writers create marketing copy or customer support responses.',
    relatedTerms: ['generative-ai', 'prompt-engineering', 'foundation-model'],
    relatedPages: [
      { href: '/ai-models', label: 'Compare AI Models' },
      { href: '/claude-vs-chatgpt', label: 'Claude vs ChatGPT' },
    ],
  },
  {
    slug: 'generative-ai',
    term: 'Generative AI',
    category: 'basics',
    shortDefinition: 'AI that creates new content — text, images, audio, or code.',
    definition:
      'AI that creates new content such as text, images, audio, or code based on patterns learned from data.',
    businessExample: 'Automatically drafting blog outlines or product descriptions from a short brief.',
    relatedTerms: ['large-language-model', 'prompt-engineering', 'diffusion-model'],
  },
  {
    slug: 'prompt-engineering',
    term: 'Prompt Engineering',
    aliases: ['prompt design', 'prompting'],
    category: 'prompting',
    shortDefinition: 'Crafting effective instructions for AI systems to get desired outputs.',
    definition:
      'The practice of crafting effective instructions or questions for AI systems to get desired outputs. Essential skill for maximizing AI tool effectiveness.',
    businessExample:
      'Writing specific prompts to generate targeted marketing content that matches your brand voice.',
    relatedTerms: ['system-prompt', 'few-shot-learning', 'prompt-template'],
    relatedPages: [
      { href: '/chatgpt-prompt-templates', label: 'ChatGPT Prompt Templates' },
      { href: '/ai-prompt-generator', label: 'AI Prompt Generator' },
    ],
  },
  {
    slug: 'system-prompt',
    term: 'System Prompt',
    category: 'prompting',
    shortDefinition: "A hidden instruction that sets the assistant's overall behavior and constraints.",
    definition:
      "A hidden instruction that sets the assistant's overall behavior and constraints.",
    businessExample: 'Configuring an HR assistant to always prioritize compliance and confidentiality.',
    relatedTerms: ['prompt-engineering', 'guardrails'],
  },
  {
    slug: 'few-shot-learning',
    term: 'Few-shot Learning',
    category: 'prompting',
    shortDefinition: "Guiding a model's behavior with a handful of examples in the prompt.",
    definition:
      "Guiding a model's behavior by providing a handful of examples in the prompt.",
    businessExample: 'Showing three compliant headlines and asking the model to generate ten more.',
    relatedTerms: ['zero-shot-learning', 'prompt-engineering'],
  },
  {
    slug: 'zero-shot-learning',
    term: 'Zero-shot Learning',
    category: 'prompting',
    shortDefinition: 'Getting models to perform tasks from instructions alone, no examples.',
    definition:
      'Getting models to perform tasks using clear instructions without providing examples.',
    businessExample: 'Categorizing customer feedback with only well-written guidelines in the prompt.',
    relatedTerms: ['few-shot-learning', 'prompt-engineering'],
  },
  {
    slug: 'prompt-template',
    term: 'Prompt Template',
    category: 'prompting',
    shortDefinition: 'A reusable, parameterized instruction that produces consistent outputs.',
    definition:
      'A reusable, parameterized instruction that produces consistent outputs.',
    businessExample: 'Generating consistent product descriptions from SKU data using a standard template.',
    relatedTerms: ['prompt-engineering', 'prompt-chaining'],
    relatedPages: [{ href: '/chatgpt-prompt-templates', label: 'ChatGPT Prompt Templates' }],
  },
  {
    slug: 'retrieval-augmented-generation',
    term: 'Retrieval-Augmented Generation (RAG)',
    aliases: ['RAG'],
    category: 'rag',
    shortDefinition: 'Combining document retrieval with generation so answers are grounded in your data.',
    definition:
      'An approach that combines information retrieval from your documents with a generative model so answers are grounded in trusted sources.',
    businessExample: 'A support assistant that answers questions using your help center and policy docs.',
    relatedTerms: ['embeddings', 'vector-database', 'grounding'],
    relatedPages: [{ href: '/what-is-rag', label: 'What is RAG?' }],
  },
  {
    slug: 'embeddings',
    term: 'Embeddings',
    category: 'technology',
    shortDefinition: 'Numeric vector representations of data that capture meaning.',
    definition:
      'Numeric vector representations of text, images, or other data that capture meaning for search and clustering.',
    businessExample: 'Finding similar support tickets by meaning rather than exact keywords.',
    relatedTerms: ['vector-database', 'retrieval-augmented-generation'],
    relatedPages: [{ href: '/what-are-embeddings', label: 'What are Embeddings?' }],
  },
  {
    slug: 'vector-database',
    term: 'Vector Database',
    category: 'technology',
    shortDefinition: 'A database optimized to search embeddings by similarity.',
    definition: 'A database optimized to store and search embeddings using similarity queries.',
    businessExample: 'Retrieving the most relevant knowledge base articles to answer a customer question.',
    relatedTerms: ['embeddings', 'retrieval-augmented-generation'],
    relatedPages: [{ href: '/what-is-a-vector-database', label: 'What is a Vector Database?' }],
  },
  {
    slug: 'fine-tuning',
    term: 'Fine-tuning',
    category: 'technology',
    shortDefinition: 'Further training a pre-trained model on your domain data.',
    definition:
      'Further training a pre-trained model on your domain data to specialize behavior and tone.',
    businessExample: 'Adapting a writing model to match your brand voice across marketing channels.',
    relatedTerms: ['foundation-model', 'rlhf'],
    relatedPages: [{ href: '/what-is-fine-tuning', label: 'What is Fine-tuning?' }],
  },
  {
    slug: 'token',
    term: 'Token',
    category: 'technology',
    shortDefinition: 'A chunk of text used for pricing, limits, and processing in LLMs.',
    definition:
      'A small chunk of text used for pricing, limits, and processing in language models.',
    businessExample: 'Estimating monthly API costs based on the number of tokens processed.',
    relatedTerms: ['context-window', 'cost-per-token'],
  },
  {
    slug: 'context-window',
    term: 'Context Window',
    category: 'technology',
    shortDefinition: 'The maximum tokens a model can consider at once.',
    definition:
      'The maximum number of tokens a model can consider at once when generating an answer.',
    businessExample: 'Splitting long PDFs into sections so the model can summarize each chapter accurately.',
    relatedTerms: ['token'],
  },
  {
    slug: 'hallucination',
    term: 'AI Hallucination',
    category: 'ethics',
    shortDefinition: 'When AI generates false or misleading information presented as fact.',
    definition:
      'When AI systems generate false or misleading information presented as fact. Important to understand when using AI for business content creation.',
    businessExample: 'An AI writing assistant creating fake statistics for a marketing report that need human verification.',
    relatedTerms: ['guardrails', 'grounding', 'human-in-the-loop'],
  },
  {
    slug: 'guardrails',
    term: 'Guardrails',
    category: 'ethics',
    shortDefinition: 'Policies and filters that keep AI outputs safe, compliant, and on-brand.',
    definition:
      'Policies, filters, and constraints that keep AI outputs safe, compliant, and on-brand.',
    businessExample: 'Blocking medical or investment advice in a consumer chatbot.',
    relatedTerms: ['hallucination', 'prompt-injection'],
  },
  {
    slug: 'human-in-the-loop',
    term: 'Human-in-the-Loop',
    category: 'business',
    shortDefinition: 'Humans review, correct, or guide AI outputs to ensure quality.',
    definition:
      'A process where humans review, correct, or guide AI outputs to ensure quality and compliance.',
    businessExample: 'Editors approving AI-generated ad copy before publishing.',
    relatedTerms: ['guardrails', 'quality-assurance'],
  },
  {
    slug: 'agent',
    term: 'Agent',
    category: 'agents',
    shortDefinition: 'An AI system that plans and executes steps toward a goal, often using tools.',
    definition:
      'An AI system that plans and executes steps toward a goal, often using tools autonomously.',
    businessExample: 'An AI assistant that researches prospects, drafts outreach, and schedules meetings.',
    relatedTerms: ['function-calling', 'multi-agent-orchestration'],
  },
  {
    slug: 'function-calling',
    term: 'Function Calling (Tool Use)',
    aliases: ['tool use'],
    category: 'agents',
    shortDefinition: 'Letting models call structured tools or APIs to fetch data or take actions.',
    definition:
      'Allowing models to call structured tools or APIs to retrieve data or take actions.',
    businessExample: 'A chatbot booking meetings through your calendar API when asked.',
    relatedTerms: ['agent', 'json-mode'],
  },
  {
    slug: 'prompt-injection',
    term: 'Prompt Injection',
    category: 'ethics',
    shortDefinition: 'A security attack embedding malicious instructions to hijack model behavior.',
    definition:
      'A security attack where malicious instructions are embedded in content to override or hijack model behavior.',
    businessExample: 'A pasted email tries to make the assistant reveal system prompts or credentials.',
    relatedTerms: ['guardrails', 'jailbreaking'],
  },
]

export const glossaryTermsBySlug = Object.fromEntries(
  glossaryTerms.map((t) => [t.slug, t])
)

export const categoriesById = Object.fromEntries(categories.map((c) => [c.id, c]))
