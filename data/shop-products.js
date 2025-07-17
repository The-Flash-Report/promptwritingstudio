// Shop Products Database
// Add new products here and they'll automatically appear on the shop page

export const productCategories = {
  'business': {
    name: 'Business & Marketing',
    icon: '💼',
    description: 'Prompts for business operations, marketing, and growth'
  },
  'creative': {
    name: 'Creative & Content',
    icon: '🎨',
    description: 'Prompts for creative work, content creation, and storytelling'
  },
  'technical': {
    name: 'Technical & Analytics',
    icon: '⚡',
    description: 'Prompts for data analysis, coding, and technical tasks'
  },
  'specialized': {
    name: 'Specialized Industries',
    icon: '🏭',
    description: 'Industry-specific prompts for professionals'
  }
}

export const products = [
  // Featured Product
  {
    id: 'prompt-vault',
    title: 'The Prompt Vault',
    subtitle: '50 Business-Ready AI Templates',
    description: '50 professional prompt templates designed specifically for business owners and marketers.',
    category: 'business',
    price: 7,
    originalPrice: 19,
    featured: true,
    status: 'available', // available, coming-soon, sold-out
    icon: '🔥',
    features: [
      '15 Content Creation prompts',
      '10 Email Marketing templates', 
      '10 Social Media prompts',
      '10 Business Strategy frameworks',
      '5 Productivity & Systems prompts',
      'BONUS: Meta-prompt creator'
    ],
    url: '/prompt-vault',
    deliveryTime: 'Instant download',
    format: 'PDF',
    launchDate: null,
    badge: 'Launch Special: 65% OFF'
  },

  // Custom AI Pack
  {
    id: 'custom-ai-pack',
    title: 'Custom AI Pack',
    subtitle: 'Personalized AI Prompts for Your Business',
    description: 'Get 10 custom AI prompts tailored specifically to your business needs and industry.',
    category: 'business',
    price: 9,
    originalPrice: null,
    featured: false,
    status: 'available',
    icon: '🎯',
    features: [
      '10 custom prompts for your specific business',
      'Industry-tailored language and examples',
      'One revision round included',
      '48-hour delivery',
      'Works with any AI model'
    ],
    url: '/custom-ai-pack',
    deliveryTime: '48-hour delivery',
    format: 'Email delivery',
    launchDate: null,
    badge: 'Custom Service'
  },

  // Business & Marketing Packs
  {
    id: 'sales-vault',
    title: 'Sales Mastery Vault',
    subtitle: '30 High-Converting Sales Prompts',
    description: 'Transform your sales process with AI-powered prompts for prospecting, objection handling, and closing.',
    category: 'business',
    price: 12,
    originalPrice: 25,
    featured: false,
    status: 'pre-order',
    icon: '💰',
    features: [
      '10 Prospecting & Lead Generation prompts',
      '8 Objection handling responses',
      '7 Closing & negotiation prompts',
      '5 Follow-up sequences',
      'Sales psychology frameworks'
    ],
    url: '/sales-vault',
    deliveryTime: '2-3 weeks after launch',
    format: 'PDF',
    launchDate: '2024-04-01',
    badge: 'Pre-Order Special'
  },

  {
    id: 'ecommerce-vault',
    title: 'E-commerce Power Pack',
    subtitle: '40 E-commerce Growth Prompts', 
    description: 'Boost your online store with prompts for product descriptions, customer service, and marketing campaigns.',
    category: 'business',
    price: 15,
    originalPrice: 29,
    featured: false,
    status: 'pre-order',
    icon: '🛒',
    features: [
      '15 Product description templates',
      '10 Customer service responses',
      '8 Email marketing campaigns',
      '7 Social media promotions',
      'A/B testing frameworks'
    ],
    url: '/ecommerce-vault',
    deliveryTime: '2-3 weeks after launch',
    format: 'PDF',
    launchDate: '2024-04-01',
    badge: 'Pre-Order Special'
  },

  {
    id: 'startup-vault',
    title: 'Startup Launch Kit',
    subtitle: '35 Startup Growth Prompts',
    description: 'Everything you need to launch and scale your startup with AI-powered business development prompts.',
    category: 'business', 
    price: 19,
    originalPrice: 39,
    featured: false,
    status: 'pre-order',
    icon: '🚀',
    features: [
      '10 Business plan & strategy prompts',
      '8 Investor pitch templates',
      '7 Product development prompts',
      '6 Marketing launch prompts',
      '4 Team building frameworks'
    ],
    url: '/startup-vault',
    deliveryTime: '2-3 weeks after launch',
    format: 'PDF',
    launchDate: '2024-04-01',
    badge: 'Pre-Order Special'
  },

  // Creative & Content Packs
  {
    id: 'content-creator-vault',
    title: 'Content Creator Vault',
    subtitle: '45 Viral Content Prompts',
    description: 'Create engaging content that converts with prompts designed for social media, blogs, and video content.',
    category: 'creative',
    price: 14,
    originalPrice: 28,
    featured: false,
    status: 'pre-order',
    icon: '📱',
    features: [
      '15 Viral social media prompts',
      '12 Blog post templates',
      '10 Video script prompts',
      '8 Email newsletter ideas',
      'Content calendar frameworks'
    ],
    url: '/content-creator-vault',
    deliveryTime: '2-3 weeks after launch', 
    format: 'PDF',
    launchDate: '2024-04-15',
    badge: 'Pre-Order Special'
  },

  {
    id: 'copywriting-vault',
    title: 'Copywriting Mastery Pack',
    subtitle: '50 High-Converting Copy Prompts',
    description: 'Master the art of persuasive writing with proven copywriting prompts for ads, sales pages, and emails.',
    category: 'creative',
    price: 17,
    originalPrice: 34,
    featured: false,
    status: 'pre-order',
    icon: '✍️',
    features: [
      '20 Sales page prompts',
      '15 Ad copy templates',
      '10 Email sales sequences',
      '5 Landing page frameworks',
      'Psychology-based persuasion prompts'
    ],
    url: '/copywriting-vault',
    deliveryTime: '2-3 weeks after launch',
    format: 'PDF', 
    launchDate: '2024-04-15',
    badge: 'Pre-Order Special'
  },

  {
    id: 'storytelling-vault',
    title: 'Storytelling Secrets',
    subtitle: '25 Compelling Story Prompts',
    description: 'Craft stories that captivate and convert with narrative frameworks used by top content creators.',
    category: 'creative',
    price: 9,
    originalPrice: 19,
    featured: false,
    status: 'pre-order',
    icon: '📚',
    features: [
      '10 Personal brand story prompts',
      '8 Customer success story templates',
      '7 Origin story frameworks',
      'Emotional storytelling techniques',
      'Story-to-lesson conversion prompts'
    ],
    url: '/storytelling-vault',
    deliveryTime: '2-3 weeks after launch',
    format: 'PDF',
    launchDate: '2024-04-15',
    badge: 'Pre-Order Special'
  },

  // Technical & Analytics Packs
  {
    id: 'analytics-vault',
    title: 'AI Analytics Prompts',
    subtitle: '30 Data Analysis Prompts',
    description: 'Turn data into insights with AI prompts for analysis, reporting, and business intelligence.',
    category: 'technical',
    price: 12,
    originalPrice: 24,
    featured: false,
    status: 'coming-soon',
    icon: '📊',
    features: [
      '10 Data analysis prompts',
      '8 Report generation templates',
      '7 Insight discovery prompts',
      '5 Visualization frameworks',
      'KPI monitoring prompts'
    ],
    url: '/analytics-vault',
    deliveryTime: 'Instant download',
    format: 'PDF',
    launchDate: '2024-04-15',
    badge: 'Coming Soon'
  },

  {
    id: 'developer-vault',
    title: 'Developer Productivity Pack',
    subtitle: '35 Coding & Development Prompts',
    description: 'Accelerate your development workflow with AI prompts for coding, debugging, and documentation.',
    category: 'technical',
    price: 16,
    originalPrice: 32,
    featured: false,
    status: 'coming-soon',
    icon: '💻',
    features: [
      '15 Code generation prompts',
      '10 Debugging assistance prompts',
      '6 Documentation templates',
      '4 Code review prompts',
      'Architecture planning frameworks'
    ],
    url: '/developer-vault',
    deliveryTime: 'Instant download',
    format: 'PDF',
    launchDate: '2024-05-01',
    badge: 'Coming Soon'
  },

  // Specialized Industry Packs
  {
    id: 'healthcare-vault',
    title: 'Healthcare Professional Pack',
    subtitle: '25 Medical & Health Prompts',
    description: 'Specialized prompts for healthcare professionals, patient communication, and medical documentation.',
    category: 'specialized',
    price: 22,
    originalPrice: 44,
    featured: false,
    status: 'coming-soon',
    icon: '🏥',
    features: [
      '10 Patient communication prompts',
      '8 Medical documentation templates',
      '4 Research analysis prompts',
      '3 Treatment planning frameworks',
      'Medical education prompts'
    ],
    url: '/healthcare-vault',
    deliveryTime: 'Instant download',
    format: 'PDF',
    launchDate: '2024-06-01',
    badge: 'Coming Soon'
  },

  {
    id: 'education-vault',
    title: 'Educator\'s Toolkit',
    subtitle: '40 Teaching & Education Prompts',
    description: 'Transform your teaching with AI prompts for lesson planning, assessment, and student engagement.',
    category: 'specialized',
    price: 18,
    originalPrice: 36,
    featured: false,
    status: 'coming-soon',
    icon: '🎓',
    features: [
      '15 Lesson planning prompts',
      '10 Assessment creation templates',
      '8 Student engagement prompts',
      '4 Curriculum development frameworks',
      '3 Parent communication templates'
    ],
    url: '/education-vault',
    deliveryTime: 'Instant download',
    format: 'PDF',
    launchDate: '2024-06-15',
    badge: 'Coming Soon'
  },

  {
    id: 'real-estate-vault',
    title: 'Real Estate Agent Pack',
    subtitle: '30 Property & Client Prompts',
    description: 'Boost your real estate business with prompts for listings, client communication, and market analysis.',
    category: 'specialized',
    price: 20,
    originalPrice: 40,
    featured: false,
    status: 'coming-soon',
    icon: '🏠',
    features: [
      '12 Property listing prompts',
      '8 Client communication templates',
      '6 Market analysis prompts',
      '4 Negotiation frameworks',
      'Lead generation prompts'
    ],
    url: '/real-estate-vault',
    deliveryTime: 'Instant download',
    format: 'PDF',
    launchDate: '2024-07-01',
    badge: 'Coming Soon'
  }
]

// Helper functions
export const getAvailableProducts = () => products.filter(p => p.status === 'available')
export const getPreOrderProducts = () => products.filter(p => p.status === 'pre-order')
export const getComingSoonProducts = () => products.filter(p => p.status === 'coming-soon')
export const getFeaturedProduct = () => products.find(p => p.featured)
export const getProductsByCategory = (category) => products.filter(p => p.category === category)
export const getProductById = (id) => products.find(p => p.id === id) 