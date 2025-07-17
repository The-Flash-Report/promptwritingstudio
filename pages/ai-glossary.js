import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AIGlossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !text) return text
    
    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  const getRelatedTerms = (currentTerm) => {
    const related = []
    
    // Find terms in same category (up to 2)
    const sameCategory = glossaryTerms.filter(term => 
      term.category === currentTerm.category && term.term !== currentTerm.term
    ).slice(0, 2)
    related.push(...sameCategory)
    
    // Find terms with shared keywords in definition (up to 2 more)
    if (related.length < 4) {
      const keywords = currentTerm.definition.toLowerCase().match(/\b\w{4,}\b/g) || []
      const keywordMatches = glossaryTerms.filter(term => {
        if (term.term === currentTerm.term || related.some(r => r.term === term.term)) return false
        const termText = (term.definition + ' ' + term.term).toLowerCase()
        return keywords.some(keyword => termText.includes(keyword))
      }).slice(0, 4 - related.length)
      related.push(...keywordMatches)
    }
    
    return related.slice(0, 4)
  }

  const scrollToTerm = (termName) => {
    const element = document.getElementById(termName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const categories = [
    { id: 'all', label: 'All Terms', icon: '📋', color: 'gray' },
    { id: 'basics', label: 'AI Basics', icon: '🤖', color: 'blue' },
    { id: 'business', label: 'Business Applications', icon: '💼', color: 'green' },
    { id: 'technology', label: 'Technology', icon: '⚙️', color: 'purple' },
    { id: 'ethics', label: 'Ethics & Safety', icon: '🛡️', color: 'orange' }
  ]

  const glossaryTerms = [
    {
      term: "Adversarial Examples",
      category: "ethics",
      definition: "Inputs deliberately designed to fool AI systems into making incorrect predictions or classifications. These attacks can compromise AI security in business applications.",
      businessExample: "Malicious images that trick facial recognition systems or spam emails designed to bypass AI filters."
    },
    {
      term: "Agent",
      category: "business",
      definition: "An AI system that perceives its environment and takes actions to achieve specific goals. Modern AI agents can perform complex business tasks autonomously.",
      businessExample: "AI customer service agents that handle inquiries, schedule appointments, and escalate issues without human intervention."
    },
    {
      term: "Algorithm",
      category: "technology",
      definition: "A set of rules or instructions that computers follow to solve problems or complete tasks. In AI, algorithms enable machines to learn from data and make decisions.",
      businessExample: "Recommendation algorithms that suggest products to customers based on their browsing history."
    },
    {
      term: "Alignment",
      category: "ethics",
      definition: "Ensuring AI systems pursue intended goals safely and beneficially, without causing unintended harm. Critical for responsible business AI deployment.",
      businessExample: "Training a hiring AI to focus on relevant skills rather than developing biased preferences based on historical data."
    },
    {
      term: "Anthropic",
      category: "business",
      definition: "AI safety company that developed Claude, focusing on creating safe and beneficial AI systems through constitutional AI approaches.",
      businessExample: "Businesses using Claude API for content creation and analysis due to its safety-focused training approach."
    },
    {
      term: "API (Application Programming Interface)",
      category: "technology",
      definition: "A way for different software applications to communicate. AI APIs allow businesses to integrate AI capabilities into their existing systems without building from scratch.",
      businessExample: "Using our <a href='/ai-prompt-generator' className='text-blue-600 hover:text-blue-800'>AI Prompt Generator</a> API to add prompt optimization to your content workflow."
    },
    {
      term: "Artificial General Intelligence (AGI)",
      category: "basics",
      definition: "Hypothetical AI that matches or exceeds human cognitive abilities across all domains. Unlike current AI that excels at specific tasks, AGI would be truly general-purpose.",
      businessExample: "Currently theoretical - would be an AI assistant capable of handling any business task as well as a human executive."
    },
    {
      term: "Artificial Intelligence (AI)",
      category: "basics",
      definition: "Computer systems designed to perform tasks that typically require human intelligence, such as recognizing speech, making decisions, or solving problems. In business, AI helps automate processes and gain insights from data.",
      businessExample: "Customer service chatbots that can answer common questions 24/7, or our <a href='/calculators/ai-cost-comparison' className='text-blue-600 hover:text-blue-800'>AI Cost Calculator</a> helping estimate implementation savings."
    },
    {
      term: "Attention Mechanism",
      category: "technology",
      definition: "A technique allowing AI models to focus on relevant parts of input data while processing information. Essential component of modern language models.",
      businessExample: "Email analysis systems that focus on key phrases to determine urgency and routing priorities."
    },
    {
      term: "Autoencoder",
      category: "technology",
      definition: "A neural network that learns compressed representations of data by encoding input into a smaller format and then reconstructing it.",
      businessExample: "Data compression systems that reduce file sizes while maintaining quality for efficient storage and transmission."
    },
    {
      term: "Automation",
      category: "business",
      definition: "Using AI and technology to perform tasks without human intervention. Reduces manual work and increases efficiency in business processes.",
      businessExample: "Automated invoice processing that extracts data and routes approvals without manual data entry."
    },
    {
      term: "Backpropagation",
      category: "technology",
      definition: "The primary algorithm for training neural networks by calculating errors and adjusting weights backward through the network layers.",
      businessExample: "The underlying process that enables AI systems to improve accuracy in tasks like fraud detection over time."
    },
    {
      term: "Batch Processing",
      category: "technology",
      definition: "Processing data in groups rather than individually, often more efficient for large-scale operations.",
      businessExample: "Processing thousands of customer transactions together overnight rather than one at a time during business hours."
    },
    {
      term: "Batch Size",
      category: "technology",
      definition: "The number of training examples processed simultaneously during AI model training. Affects training speed and memory usage.",
      businessExample: "Optimizing customer data analysis to process 100 records at once for faster insights generation."
    },
    {
      term: "Bias",
      category: "ethics",
      definition: "Unfair preferences or prejudices in AI systems, often reflecting biases present in training data. Can lead to discriminatory outcomes in business applications.",
      businessExample: "A hiring AI that unfairly favors certain demographics due to biased historical hiring data."
    },
    {
      term: "Big Data",
      category: "business",
      definition: "Extremely large datasets that require specialized tools and techniques for storage, processing, and analysis.",
      businessExample: "Analyzing millions of customer transactions to identify spending patterns and optimize product recommendations."
    },
    {
      term: "Bootstrapping",
      category: "technology",
      definition: "A training technique where a model uses its own predictions to improve performance, gradually building capabilities.",
      businessExample: "AI systems that start with basic customer categorization and gradually improve by learning from their own successful classifications."
    },
    {
      term: "Catastrophic Forgetting",
      category: "technology",
      definition: "When AI models lose previously learned knowledge while learning new tasks. Important consideration for business AI implementations.",
      businessExample: "A customer service AI forgetting how to handle returns when trained on new product categories."
    },
    {
      term: "Chain of Thought",
      category: "business",
      definition: "A prompting technique that encourages AI systems to show step-by-step reasoning, improving accuracy for complex problems.",
      businessExample: "Getting better financial analysis by asking AI to show each calculation step rather than just providing final results."
    },
    {
      term: "Chatbot",
      category: "business",
      definition: "AI-powered software that conducts conversations with users through text or voice. Modern chatbots can handle complex customer service interactions.",
      businessExample: "Website chatbots that answer customer questions, schedule appointments, and escalate complex issues to human agents."
    },
    {
      term: "ChatGPT",
      category: "business",
      definition: "A conversational AI model developed by OpenAI, widely used for content creation, customer service, and business automation.",
      businessExample: "Marketing teams using our <a href='/chatgpt-templates' className='text-blue-600 hover:text-blue-800'>ChatGPT Templates</a> to generate email campaigns, social media content, and product descriptions."
    },
    {
      term: "Checkpoint",
      category: "technology",
      definition: "A saved state of an AI model during training, allowing restoration to previous versions if needed.",
      businessExample: "Saving model versions during customer behavior analysis training to revert if new data causes performance drops."
    },
    {
      term: "Classification",
      category: "technology",
      definition: "The task of categorizing inputs into predefined classes or categories. Common AI application for organizing business data.",
      businessExample: "Automatically sorting customer emails into categories like complaints, inquiries, and compliments."
    },
    {
      term: "Claude",
      category: "business",
      definition: "An AI assistant developed by Anthropic, known for safety-focused training and helpful, harmless, and honest responses.",
      businessExample: "Businesses using Claude for content review and analysis due to its strong ethical guidelines and safety features."
    },
    {
      term: "Computer Vision",
      category: "business",
      definition: "AI capability that enables machines to interpret and understand visual information from images and videos, similar to human sight.",
      businessExample: "Quality control systems in manufacturing that automatically detect product defects."
    },
    {
      term: "Constitutional AI",
      category: "ethics",
      definition: "A training approach that uses a set of principles or 'constitution' to guide AI behavior toward helpful and harmless responses.",
      businessExample: "Customer service AIs trained with company values to ensure responses align with brand guidelines and ethics."
    },
    {
      term: "Convolutional Neural Network (CNN)",
      category: "technology",
      definition: "A neural network architecture particularly effective for processing grid-like data such as images. Foundation of computer vision applications.",
      businessExample: "Product image recognition systems in retail that automatically categorize and tag inventory photos."
    },
    {
      term: "Corpus",
      category: "technology",
      definition: "A large collection of text or speech data used for training language models and natural language processing systems.",
      businessExample: "Company knowledge bases used to train internal AI assistants on company-specific procedures and policies."
    },
    {
      term: "Cross-validation",
      category: "technology",
      definition: "A technique for assessing how well an AI model will perform on new, unseen data by testing it on different data subsets.",
      businessExample: "Testing a sales prediction model on different time periods to ensure it works reliably across various market conditions."
    },
    {
      term: "Data Augmentation",
      category: "technology",
      definition: "Techniques for artificially expanding training datasets by creating variations of existing data. Improves model performance and robustness.",
      businessExample: "Creating multiple versions of product photos with different lighting and angles to improve image recognition accuracy."
    },
    {
      term: "Data Mining",
      category: "business",
      definition: "The process of discovering patterns, correlations, and insights in large datasets using AI and statistical methods.",
      businessExample: "Analyzing customer purchase history to identify cross-selling opportunities and seasonal trends."
    },
    {
      term: "Data Privacy",
      category: "ethics",
      definition: "Protecting sensitive information when using AI systems. Includes securing customer data and complying with regulations like GDPR.",
      businessExample: "Ensuring customer data used to train AI models is anonymized and securely stored."
    },
    {
      term: "Deep Learning",
      category: "technology",
      definition: "A machine learning technique using artificial neural networks with multiple layers to recognize complex patterns. It's particularly effective for processing images, speech, and text.",
      businessExample: "Photo recognition in inventory management systems or voice assistants."
    },
    {
      term: "Diffusion Model",
      category: "technology",
      definition: "A generative AI model that creates data (often images) by learning to reverse a noise-adding process.",
      businessExample: "Creating unique product designs or marketing visuals from text descriptions for advertising campaigns."
    },
    {
      term: "Diffusion Process",
      category: "technology",
      definition: "The gradual addition and removal of noise used in diffusion models to generate new content from learned patterns.",
      businessExample: "AI-powered design tools that gradually refine rough sketches into polished marketing materials."
    },
    {
      term: "Discriminator",
      category: "technology",
      definition: "A component in Generative Adversarial Networks (GANs) that distinguishes between real and artificially generated data.",
      businessExample: "Systems that detect fraudulent documents by distinguishing between authentic and forged business records."
    },
    {
      term: "Dropout",
      category: "technology",
      definition: "A regularization technique that randomly ignores some neurons during training to prevent overfitting and improve generalization.",
      businessExample: "Ensuring customer behavior prediction models work well for new customers, not just training data."
    },
    {
      term: "Edge AI",
      category: "technology",
      definition: "Running AI algorithms locally on devices rather than in the cloud. Provides faster responses and better privacy for sensitive business data.",
      businessExample: "AI-powered security cameras that detect intrusions locally without sending footage to external servers."
    },
    {
      term: "Embedding",
      category: "technology",
      definition: "Dense vector representations that capture the meaning and relationships of words, images, or other data in a mathematical format.",
      businessExample: "Customer profile embeddings that help recommendation systems find similar customers for targeted marketing."
    },
    {
      term: "Emergent Behavior",
      category: "basics",
      definition: "Unexpected capabilities that arise from complex AI systems, often not explicitly programmed but emerging from training.",
      businessExample: "AI customer service systems spontaneously developing the ability to handle new types of inquiries not in their training."
    },
    {
      term: "Ensemble Learning",
      category: "technology",
      definition: "Combining multiple AI models to achieve better performance than any single model alone.",
      businessExample: "Using multiple fraud detection models together to achieve higher accuracy than any individual system."
    },
    {
      term: "Epoch",
      category: "technology",
      definition: "One complete pass through the entire training dataset during AI model training. Multiple epochs improve learning.",
      businessExample: "Training a sales forecasting model through 50 epochs to ensure it learns all seasonal patterns in historical data."
    },
    {
      term: "Ethical AI",
      category: "ethics",
      definition: "Development and use of AI systems that are fair, transparent, accountable, and respect human rights. Increasingly important for business reputation and compliance.",
      businessExample: "Ensuring AI-powered loan approval systems don't discriminate against protected groups."
    },
    {
      term: "Expert System",
      category: "technology",
      definition: "An AI system that uses a knowledge base and inference rules to solve problems in a specific domain, mimicking human expertise.",
      businessExample: "Medical diagnosis systems that help doctors identify conditions based on symptoms and test results."
    },
    {
      term: "Explainable AI (XAI)",
      category: "ethics",
      definition: "AI systems designed to provide clear explanations for their decisions and recommendations. Critical for business applications requiring transparency.",
      businessExample: "A loan approval system that explains specific factors that led to approval or denial decisions."
    },
    {
      term: "Feature Engineering",
      category: "technology",
      definition: "The process of selecting and transforming input variables to improve AI model performance.",
      businessExample: "Converting raw customer data into meaningful features like 'average purchase frequency' for better prediction models."
    },
    {
      term: "Federated Learning",
      category: "technology",
      definition: "Training AI models across distributed devices without centralizing sensitive data, preserving privacy while enabling learning.",
      businessExample: "Mobile apps that improve recommendations by learning from user behavior without uploading personal data to servers."
    },
    {
      term: "Fine-tuning",
      category: "technology",
      definition: "Adapting a pre-trained AI model to perform specific tasks by training it on domain-specific data.",
      businessExample: "Customizing a general customer service AI with your company's specific policies and product information."
    },
    {
      term: "Foundation Model",
      category: "technology",
      definition: "A large AI model trained on broad data that can be adapted to many different tasks and applications.",
      businessExample: "Using GPT-4 as a foundation for various business tasks like writing, analysis, and customer support."
    },
    {
      term: "Fuzzy Logic",
      category: "technology",
      definition: "A reasoning system that handles uncertainty and partial truth, useful for real-world business applications with ambiguous data.",
      businessExample: "Customer satisfaction scoring that considers 'somewhat satisfied' rather than just 'satisfied' or 'dissatisfied.'"
    },
    {
      term: "Generative Adversarial Network (GAN)",
      category: "technology",
      definition: "Two neural networks competing against each other - one generates fake data while the other tries to detect it, improving both.",
      businessExample: "Creating realistic product mockups or synthetic customer data for testing business strategies."
    },
    {
      term: "Generative AI",
      category: "business",
      definition: "AI systems that create new content such as text, images, audio, or code based on training data and user prompts.",
      businessExample: "Marketing teams using our <a href='/ai-prompt-examples' className='text-blue-600 hover:text-blue-800'>AI Prompt Examples</a> to generate blog posts, social media content, and product descriptions at scale."
    },
    {
      term: "Generative Pre-training",
      category: "technology",
      definition: "Training AI models to predict the next token in sequences, which teaches them language patterns and knowledge.",
      businessExample: "The foundation training that enables AI to complete business documents and generate coherent responses."
    },
    {
      term: "GPT (Generative Pre-trained Transformer)",
      category: "business",
      definition: "A large language model architecture that powers many popular AI tools like ChatGPT, known for generating human-like text.",
      businessExample: "Content creation, customer support automation, and business document generation using GPT-based tools."
    },
    {
      term: "Gradient Clipping",
      category: "technology",
      definition: "A technique to prevent training instability by limiting how much model weights can change in a single training step.",
      businessExample: "Ensuring stable training of financial prediction models that need consistent, reliable performance."
    },
    {
      term: "Gradient Descent",
      category: "technology",
      definition: "An optimization algorithm that iteratively adjusts model parameters to minimize errors during training.",
      businessExample: "The underlying process that helps customer behavior prediction models improve accuracy over time."
    },
    {
      term: "Ground Truth",
      category: "technology",
      definition: "Accurate reference data used for training and evaluating AI systems. Essential for measuring model performance.",
      businessExample: "Manually verified customer satisfaction scores used to train and test automated sentiment analysis systems."
    },
    {
      term: "AI Hallucination",
      category: "ethics",
      definition: "When AI systems generate false or misleading information presented confidently as fact. Important to understand when using AI for business content creation.",
      businessExample: "An AI writing assistant creating fake statistics for a marketing report that need human verification."
    },
    {
      term: "Human-in-the-Loop",
      category: "business",
      definition: "AI systems that combine automated processing with human oversight and intervention for complex or sensitive decisions.",
      businessExample: "Content moderation systems that flag potential issues for human review rather than automatically removing content."
    },
    {
      term: "Hyperparameter",
      category: "technology",
      definition: "Configuration settings that control how an AI model learns, such as learning rate or training duration.",
      businessExample: "Adjusting settings to optimize how quickly a sales forecasting model learns from new market data."
    },
    {
      term: "In-Context Learning",
      category: "business",
      definition: "An AI model's ability to learn and adapt to new tasks using only examples provided in the input prompt.",
      businessExample: "Showing an AI a few examples of your company's email style and having it write similar emails automatically."
    },
    {
      term: "Inference",
      category: "technology",
      definition: "The process of using a trained AI model to make predictions or generate outputs on new, unseen data.",
      businessExample: "Using a trained customer churn model to predict which current customers are likely to cancel subscriptions."
    },
    {
      term: "Instruction Following",
      category: "business",
      definition: "An AI system's ability to understand and execute human commands accurately and safely.",
      businessExample: "AI assistants that can follow complex business instructions like 'analyze Q3 sales data and prepare a summary for the board meeting.'"
    },
    {
      term: "Instruction Tuning",
      category: "technology",
      definition: "Training AI models specifically to follow human instructions and provide helpful responses to commands.",
      businessExample: "Training customer service AIs to understand and respond appropriately to various types of customer requests."
    },
    {
      term: "Interpretability",
      category: "ethics",
      definition: "The ability to understand and explain how AI models make decisions, crucial for business trust and regulatory compliance.",
      businessExample: "Being able to explain why an AI hiring system ranked certain candidates higher for management positions."
    },
    {
      term: "Jailbreaking",
      category: "ethics",
      definition: "Techniques used to bypass AI safety measures and restrictions, potentially leading to harmful or inappropriate outputs.",
      businessExample: "Attempting to get business AIs to generate inappropriate content by circumventing built-in safety guidelines."
    },
    {
      term: "Jitter",
      category: "technology",
      definition: "Small random variations added to training data to improve model robustness and prevent overfitting.",
      businessExample: "Adding slight variations to customer data during training to ensure models work well with real-world data inconsistencies."
    },
    {
      term: "K-Means Clustering",
      category: "technology",
      definition: "An algorithm that groups similar data points together, useful for customer segmentation and market analysis.",
      businessExample: "Automatically segmenting customers into groups based on purchasing behavior for targeted marketing campaigns."
    },
    {
      term: "Knowledge Distillation",
      category: "technology",
      definition: "Transferring knowledge from a large, complex AI model to a smaller, more efficient one while maintaining performance.",
      businessExample: "Creating a lightweight customer service AI that performs nearly as well as a large model but runs faster and cheaper."
    },
    {
      term: "Knowledge Graph",
      category: "business",
      definition: "A network structure representing relationships between entities, used to organize and connect business information.",
      businessExample: "Connecting customer data, product information, and purchase history to enable better recommendation systems."
    },
    {
      term: "Large Language Model (LLM)",
      category: "technology",
      definition: "AI systems trained on vast amounts of text data to understand and generate human-like language. These models can write, summarize, translate, and answer questions.",
      businessExample: "ChatGPT helping writers create marketing copy or customer support responses."
    },
    {
      term: "Latent Diffusion",
      category: "technology",
      definition: "A diffusion process that operates in a compressed representation space rather than on raw data, making generation more efficient.",
      businessExample: "Efficient generation of marketing images that requires less computational power while maintaining quality."
    },
    {
      term: "Latent Space",
      category: "technology",
      definition: "A hidden dimensional space where AI models encode and manipulate data representations, enabling generation and analysis.",
      businessExample: "The mathematical space where customer preferences are encoded, allowing recommendation systems to find similar customers."
    },
    {
      term: "Loss Function",
      category: "technology",
      definition: "A mathematical measure of the difference between AI model predictions and actual correct answers, used to guide learning.",
      businessExample: "Measuring how far off sales predictions are from actual sales to improve forecasting accuracy over time."
    },
    {
      term: "LSTM (Long Short-Term Memory)",
      category: "technology",
      definition: "A neural network architecture designed to remember important information over long sequences, useful for time-series data.",
      businessExample: "Analyzing customer behavior patterns over months to predict future purchasing trends and seasonal demands."
    },
    {
      term: "Machine Learning (ML)",
      category: "technology", 
      definition: "A subset of AI where computers learn patterns from data without being explicitly programmed for each task. The system improves its performance as it processes more information.",
      businessExample: "Email spam filters that get better at detecting unwanted messages over time."
    },
    {
      term: "Masked Language Model",
      category: "technology",
      definition: "A training approach where AI learns to predict hidden or masked words in text, helping it understand language context.",
      businessExample: "Training business writing AIs to understand context and generate appropriate content by learning from partially hidden text."
    },
    {
      term: "Model Compression",
      category: "technology",
      definition: "Techniques for reducing AI model size and computational requirements while maintaining performance.",
      businessExample: "Creating mobile-friendly versions of customer service AIs that work efficiently on smartphones and tablets."
    },
    {
      term: "Multimodal",
      category: "business",
      definition: "AI systems capable of processing and understanding multiple types of data simultaneously, such as text, images, and audio.",
      businessExample: "Customer service systems that can analyze both written complaints and attached photos to better understand issues."
    },
    {
      term: "Multi-Agent System",
      category: "business",
      definition: "Multiple AI agents working together or competing to solve complex problems that require diverse capabilities.",
      businessExample: "E-commerce systems where different AIs handle pricing, inventory, customer service, and fraud detection collaboratively."
    },
    {
      term: "Natural Language Processing (NLP)",
      category: "business",
      definition: "AI technology that enables computers to understand, interpret, and generate human language. It bridges the gap between human communication and computer understanding.",
      businessExample: "Automated analysis of customer reviews to identify common complaints or praise."
    },
    {
      term: "Neural Architecture Search",
      category: "technology",
      definition: "Automated methods for designing optimal neural network structures for specific tasks and datasets.",
      businessExample: "Automatically designing the best AI architecture for your specific customer behavior prediction needs."
    },
    {
      term: "Neural Network",
      category: "technology",
      definition: "Computing systems inspired by biological brain networks. They consist of interconnected nodes that process information and learn patterns, forming the basis of deep learning.",
      businessExample: "Fraud detection systems in banking that identify suspicious transaction patterns."
    },
    {
      term: "Normalization",
      category: "technology",
      definition: "Scaling data to standard ranges or distributions to improve AI model training stability and performance.",
      businessExample: "Standardizing customer data from different sources to ensure fair comparison in recommendation systems."
    },
    {
      term: "Online Learning",
      category: "technology",
      definition: "AI systems that continuously update and improve their performance as new data becomes available in real-time.",
      businessExample: "Fraud detection systems that immediately learn from new attack patterns to protect against emerging threats."
    },
    {
      term: "OpenAI",
      category: "business",
      definition: "AI research company that developed popular models like GPT-4 and ChatGPT, offering APIs for business integration.",
      businessExample: "Businesses integrating OpenAI's APIs to add content generation and analysis capabilities to their applications."
    },
    {
      term: "Optimization",
      category: "technology",
      definition: "The process of finding the best model parameters and configurations to achieve optimal performance for specific tasks.",
      businessExample: "Fine-tuning AI models to achieve the best balance between accuracy and speed for real-time customer service applications."
    },
    {
      term: "Overfitting",
      category: "technology",
      definition: "When an AI model performs well on training data but poorly on new, unseen data due to learning training-specific patterns.",
      businessExample: "A sales prediction model that works perfectly on historical data but fails to predict actual future sales accurately."
    },
    {
      term: "Parameter",
      category: "technology",
      definition: "Learnable weights and biases in neural networks that are adjusted during training to improve performance.",
      businessExample: "The millions of numerical values that enable a customer service AI to understand and respond appropriately to inquiries."
    },
    {
      term: "Perceptron",
      category: "technology",
      definition: "The simplest type of neural network, consisting of a single layer that can learn basic linear patterns.",
      businessExample: "Basic classification systems that can separate customers into simple categories like 'likely to buy' or 'unlikely to buy.'"
    },
    {
      term: "Perplexity",
      category: "technology",
      definition: "A measure of how well an AI language model predicts text, with lower perplexity indicating better performance.",
      businessExample: "Evaluating how well a customer service AI understands and responds to different types of business inquiries."
    },
    {
      term: "Pooling",
      category: "technology",
      definition: "A downsampling technique in neural networks that reduces data size while retaining important features.",
      businessExample: "Image analysis systems that focus on key product features while ignoring background details for faster processing."
    },
    {
      term: "Predictive Analytics",
      category: "business",
      definition: "Using AI to analyze current and historical data to make predictions about future events. Helps businesses make data-driven decisions.",
      businessExample: "Predicting which customers are likely to cancel subscriptions so you can proactively offer retention incentives."
    },
    {
      term: "Prompt Engineering",
      category: "business",
      definition: "The practice of crafting effective instructions or questions for AI systems to get desired outputs. Essential skill for maximizing AI tool effectiveness.",
      businessExample: "Using our <a href='/ai-prompt-generator' className='text-blue-600 hover:text-blue-800'>AI Prompt Generator</a> to create targeted marketing content that matches your brand voice."
    },
    {
      term: "PyTorch",
      category: "technology",
      definition: "A popular open-source machine learning framework used for developing and training AI models, known for flexibility and ease of use.",
      businessExample: "Development teams using PyTorch to build custom AI solutions for specific business needs and applications."
    },
    {
      term: "Quantization",
      category: "technology",
      definition: "Reducing AI model size and computational requirements by using fewer bits to represent model parameters.",
      businessExample: "Making AI models run efficiently on mobile devices for field sales teams and remote customer service."
    },
    {
      term: "Quantized Model",
      category: "technology",
      definition: "An AI model that has been optimized through quantization to use less memory and computational power.",
      businessExample: "Lightweight versions of recommendation engines that can run efficiently on edge devices and mobile applications."
    },
    {
      term: "Query",
      category: "business",
      definition: "An input, question, or request submitted to an AI system to obtain information or generate responses.",
      businessExample: "Customer questions submitted to AI chatbots or search queries processed by recommendation systems."
    },
    {
      term: "Recurrent Neural Network (RNN)",
      category: "technology",
      definition: "A neural network designed to process sequential data by maintaining memory of previous inputs in the sequence.",
      businessExample: "Analyzing customer purchase sequences over time to predict next likely purchases and optimize inventory."
    },
    {
      term: "Regularization",
      category: "technology",
      definition: "Techniques used during AI training to prevent overfitting and improve model generalization to new data.",
      businessExample: "Ensuring customer behavior models work well for new customers, not just the specific customers used in training."
    },
    {
      term: "Reinforcement Learning (RL)",
      category: "technology",
      definition: "AI learning approach where systems learn through trial and error, receiving rewards for good actions and penalties for bad ones.",
      businessExample: "AI trading systems that learn optimal investment strategies by testing different approaches and learning from results."
    },
    {
      term: "Reinforcement Learning from Human Feedback (RLHF)",
      category: "technology",
      definition: "Training AI systems using human preferences and feedback to ensure outputs align with human values and expectations.",
      businessExample: "Customer service AIs trained to provide responses that customers rate as helpful and appropriate."
    },
    {
      term: "Retrieval-Augmented Generation (RAG)",
      category: "business",
      definition: "AI technique that combines information retrieval with text generation to provide accurate, up-to-date responses using external knowledge.",
      businessExample: "Customer support AIs that can access current product manuals and policies to provide accurate, current information."
    },
    {
      term: "ROI (Return on Investment)",
      category: "business",
      definition: "A metric measuring the efficiency of an investment. In AI context, it compares the cost of implementing AI solutions against the benefits gained.",
      businessExample: "Use our <a href='/calculators/ai-cost-comparison' className='text-blue-600 hover:text-blue-800'>AI ROI Calculator</a> to estimate savings: if you spend $10,000 on AI tools that save 100 hours monthly at $50/hour, your monthly ROI is 400%."
    },
    {
      term: "Scaling Laws",
      category: "technology",
      definition: "Mathematical relationships that describe how AI model performance improves with increases in model size, data, or compute resources.",
      businessExample: "Understanding that doubling training data typically improves customer behavior prediction accuracy by a predictable amount."
    },
    {
      term: "Semantic Search",
      category: "business",
      definition: "Search technology that finds information based on meaning and context rather than just keyword matching.",
      businessExample: "Internal knowledge bases that understand questions like 'how to handle angry customers' even without exact keyword matches."
    },
    {
      term: "Sigmoid Function",
      category: "technology",
      definition: "A mathematical function that maps any input value to a range between 0 and 1, commonly used in AI for probability outputs.",
      businessExample: "Converting AI scores into probability percentages, like '85% chance this customer will make a purchase.'"
    },
    {
      term: "Stable Diffusion",
      category: "business",
      definition: "A popular open-source text-to-image generation model that creates images from text descriptions.",
      businessExample: "Marketing teams using Stable Diffusion to create custom product mockups and advertising visuals from text descriptions."
    },
    {
      term: "Supervised Learning",
      category: "technology",
      definition: "Machine learning approach where the AI learns from examples with known correct answers. Like teaching with answer sheets to help the system learn patterns.",
      businessExample: "Training a system to categorize customer support tickets by showing it thousands of pre-labeled examples."
    },
    {
      term: "Synthetic Data",
      category: "technology",
      definition: "Artificially generated data that mimics real data patterns, used for training when real data is limited or sensitive.",
      businessExample: "Creating fake customer profiles that maintain statistical patterns for testing new features without using real customer data."
    },
    {
      term: "Temperature",
      category: "business",
      definition: "A parameter controlling the randomness and creativity of AI outputs. Higher temperature = more creative, lower temperature = more predictable.",
      businessExample: "Setting low temperature for customer service responses (consistent) vs. high temperature for creative marketing content (varied)."
    },
    {
      term: "Tokenization",
      category: "technology",
      definition: "The process of breaking text into smaller units (tokens) that AI models can process, such as words or subwords.",
      businessExample: "Converting customer feedback into tokens that sentiment analysis systems can understand and categorize effectively."
    },
    {
      term: "Training Data",
      category: "technology",
      definition: "The information used to teach AI systems how to perform tasks. Quality and quantity of training data directly impacts AI performance.",
      businessExample: "Historical sales data used to train a forecasting model for inventory planning."
    },
    {
      term: "Transfer Learning",
      category: "technology",
      definition: "Technique where AI models trained on one task are adapted for related tasks. Reduces time and resources needed for implementation.",
      businessExample: "Using a pre-trained image recognition model and adapting it to identify your specific products."
    },
    {
      term: "Transformer",
      category: "technology",
      definition: "A neural network architecture that uses attention mechanisms to process data efficiently, forming the basis of modern language models.",
      businessExample: "The underlying technology powering business AI tools like ChatGPT, Claude, and automated content generation systems."
    },
    {
      term: "Turing Test",
      category: "basics",
      definition: "A test of a machine's ability to exhibit intelligent behavior indistinguishable from a human, proposed by Alan Turing.",
      businessExample: "Customer service chatbots that are so effective customers can't tell they're talking to an AI rather than a human."
    },
    {
      term: "Uncertainty Quantification",
      category: "business",
      definition: "Measuring how confident an AI system is in its predictions, crucial for business decision-making and risk assessment.",
      businessExample: "AI systems that not only predict customer churn but also indicate confidence levels to help prioritize intervention efforts."
    },
    {
      term: "Underfitting",
      category: "technology",
      definition: "When an AI model is too simple to capture underlying patterns in data, resulting in poor performance on both training and new data.",
      businessExample: "A customer segmentation model that's too basic to identify meaningful differences between customer groups."
    },
    {
      term: "Unsupervised Learning",
      category: "technology",
      definition: "Machine learning where AI finds hidden patterns in data without being given specific examples of what to look for. Useful for discovering unknown insights.",
      businessExample: "Analyzing customer behavior data to discover unexpected customer segments for targeted marketing."
    },
    {
      term: "Upsampling",
      category: "technology",
      definition: "Techniques for increasing the resolution, size, or frequency of data, often used in image processing and data augmentation.",
      businessExample: "Enhancing low-resolution product images for better display in e-commerce applications and marketing materials."
    },
    {
      term: "Validation Set",
      category: "technology",
      definition: "A portion of data used to evaluate AI model performance during training, separate from both training and final test data.",
      businessExample: "Setting aside recent customer data to test how well sales prediction models work before deploying them."
    },
    {
      term: "Vanishing Gradient",
      category: "technology",
      definition: "A problem in neural network training where gradients become too small to effectively update model weights in early layers.",
      businessExample: "Technical challenges that can prevent deep learning models from effectively learning complex customer behavior patterns."
    },
    {
      term: "Variational Autoencoder (VAE)",
      category: "technology",
      definition: "A type of neural network that learns to generate new data by learning probability distributions of the training data.",
      businessExample: "Generating synthetic customer data for testing business strategies without exposing real customer information."
    },
    {
      term: "Vector Database",
      category: "technology",
      definition: "A specialized database optimized for storing and searching high-dimensional vector embeddings used in AI applications.",
      businessExample: "Storing customer preference vectors to enable fast similarity searches for personalized product recommendations."
    },
    {
      term: "Vision Transformer",
      category: "technology",
      definition: "Applying transformer architecture (originally designed for text) to image processing tasks, often achieving superior results.",
      businessExample: "Advanced product image analysis systems that can understand complex visual features for automated categorization."
    },
    {
      term: "Weak Supervision",
      category: "technology",
      definition: "Learning from noisy, incomplete, or programmatically generated labels rather than manually annotated training data.",
      businessExample: "Training customer sentiment models using automatically detected keywords rather than manually labeled customer reviews."
    },
    {
      term: "Weight",
      category: "technology",
      definition: "Learnable parameters in neural networks that determine the strength of connections between neurons.",
      businessExample: "The millions of numerical values that determine how strongly different customer characteristics influence purchase predictions."
    },
    {
      term: "Word Embedding",
      category: "technology",
      definition: "Dense vector representations of words that capture semantic meaning and relationships in a mathematical format.",
      businessExample: "Understanding that 'customer' and 'client' are similar concepts for better automated categorization of business communications."
    },
    {
      term: "YOLO (You Only Look Once)",
      category: "technology",
      definition: "A real-time object detection algorithm that can identify and locate multiple objects in images very quickly.",
      businessExample: "Inventory management systems that can instantly identify and count products on shelves using camera feeds."
    },
    {
      term: "Zero-shot Learning",
      category: "business",
      definition: "AI's ability to perform tasks it wasn't explicitly trained for by leveraging knowledge from related tasks.",
      businessExample: "Customer service AIs handling new types of inquiries they've never seen before by applying general conversation skills."
    },
    {
      term: "Zero-shot Prompting",
      category: "business",
      definition: "Getting useful AI responses without providing specific examples, relying on the model's pre-trained knowledge.",
      businessExample: "Asking an AI to write a product description without showing examples, relying on its understanding of good marketing copy."
    },
    {
      term: "AI Assistant",
      category: "business",
      definition: "AI-powered software that helps users complete tasks through natural conversation and intelligent automation.",
      businessExample: "Virtual assistants that schedule meetings, draft emails, and manage customer inquiries across multiple business channels."
    },
    {
      term: "Agentic AI",
      category: "business",
      definition: "AI systems that can independently plan, execute tasks, and make decisions to achieve goals with minimal human oversight.",
      businessExample: "AI agents that autonomously manage inventory ordering, customer follow-ups, and marketing campaign optimization."
    },
    {
      term: "Benchmarking",
      category: "technology",
      definition: "Standardized tests used to evaluate and compare AI model performance across different tasks and datasets.",
      businessExample: "Testing customer service AIs against industry standards to ensure they meet quality and accuracy requirements."
    },
    {
      term: "Controllability",
      category: "ethics",
      definition: "The ability to direct, limit, or modify AI system behavior to ensure it operates within desired parameters.",
      businessExample: "Setting guardrails on customer service AIs to ensure responses stay professional and on-brand."
    },
    {
      term: "Deterministic Model",
      category: "technology",
      definition: "AI systems that produce the same output given identical inputs, providing predictable and consistent results.",
      businessExample: "Financial calculation systems that always produce the same result for identical transaction data."
    },
    {
      term: "Enterprise AI",
      category: "business",
      definition: "AI solutions designed specifically for large organizations, with enterprise-grade security, compliance, and scalability.",
      businessExample: "AI platforms that integrate with existing enterprise software while meeting corporate security and compliance requirements."
    },
    {
      term: "Few-Shot Learning",
      category: "business",
      definition: "AI's ability to learn new tasks quickly with just a few examples, reducing training time and data requirements.",
      businessExample: "Training a customer categorization system with just 5-10 examples of each customer type rather than thousands."
    },
    {
      term: "Probabilistic Model",
      category: "technology",
      definition: "AI systems that output probabilities and confidence scores rather than definitive answers, useful for uncertain situations.",
      businessExample: "Sales prediction models that indicate '75% chance of customer purchase' rather than definitive yes/no."
    },
    {
      term: "Reasoning",
      category: "business",
      definition: "AI's ability to think through problems logically, draw conclusions, and make decisions based on available information.",
      businessExample: "AI systems that can analyze market data, consider multiple factors, and explain their investment recommendations."
    },
    {
      term: "Responsible AI",
      category: "ethics",
      definition: "Development and deployment of AI systems that are ethical, fair, transparent, and accountable to stakeholders.",
      businessExample: "Implementing AI hiring tools with bias monitoring and ensuring diverse candidate evaluation processes."
    },
    {
      term: "Self-Learning",
      category: "technology",
      definition: "AI systems that continuously improve their performance by learning from new data and experiences without explicit retraining.",
      businessExample: "Fraud detection systems that automatically adapt to new attack patterns without manual updates."
    },
    {
      term: "Speech-to-Text",
      category: "business",
      definition: "AI technology that converts spoken words into written text, enabling voice-based interactions and transcription.",
      businessExample: "Automated meeting transcription services that convert conference calls into searchable text documents."
    },
    {
      term: "Steerability",
      category: "business",
      definition: "The ability to guide AI behavior and outputs in real-time to match specific requirements or preferences.",
      businessExample: "Adjusting AI writing tone from formal to casual mid-conversation based on customer preferences."
    },
    {
      term: "Strong AI",
      category: "basics",
      definition: "Theoretical AI with human-level general intelligence across all cognitive tasks. Also known as Artificial General Intelligence (AGI).",
      businessExample: "Currently theoretical - would be AI that could handle any business role from accounting to strategic planning."
    },
    {
      term: "Structured Data",
      category: "business",
      definition: "Organized information stored in predictable formats like databases, spreadsheets, and tables that AI can easily process.",
      businessExample: "Customer databases with defined fields for name, email, purchase history that AI can analyze for patterns."
    },
    {
      term: "Text-to-Speech",
      category: "business",
      definition: "AI technology that converts written text into natural-sounding spoken words, enabling voice-based interfaces.",
      businessExample: "Customer service systems that read order confirmations aloud or create audio versions of written content."
    },
    {
      term: "Unstructured Data",
      category: "business",
      definition: "Information without predefined organization like emails, social media posts, images, and documents that requires special AI processing.",
      businessExample: "Analyzing customer feedback from reviews, social media, and support emails to identify common themes."
    },
    {
      term: "Voice Processing",
      category: "business",
      definition: "AI technology that analyzes, understands, and responds to human speech for interactive applications.",
      businessExample: "Voice-activated customer support systems that understand spoken questions and provide appropriate responses."
    },
    {
      term: "Weak AI",
      category: "basics",
      definition: "AI systems designed for specific tasks rather than general intelligence. All current commercial AI falls into this category.",
      businessExample: "Specialized AI tools like recommendation engines, chatbots, and image recognition systems that excel at specific tasks."
    }
  ]

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Layout
      title="AI Glossary - 145+ Essential Artificial Intelligence Terms for Business Owners | PromptWritingStudio"
      description="Master AI terminology with our comprehensive 145+ term glossary. Clear, business-focused definitions of artificial intelligence terms every entrepreneur should know."
    >
      <EnhancedMeta
        title="AI Glossary - 145+ Essential Artificial Intelligence Terms for Business Owners"
        description="Master AI with our comprehensive 145+ term glossary. From machine learning to neural networks - all essential AI terms explained for entrepreneurs."
        url="https://promptwritingstudio.com/ai-glossary"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime="2024-01-22T00:00:00Z"
        modifiedTime="2024-01-22T00:00:00Z"
      />
      <OrganizationSchema />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AI Glossary: 145+ Terms for Business Owners
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Essential AI Terms Explained in Plain English
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg">
                Stop feeling lost in AI conversations. Master the terminology that matters 
                for your business success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">
                Why Understanding AI Terms Matters for Your Business
              </h2>
              
              <p className="text-lg text-gray-600 mb-6">
                The AI revolution is happening in boardrooms, not just research labs. Our comprehensive 
                145+ term glossary helps you understand what vendors mean when they pitch "machine learning solutions" 
                or consultants recommend "neural network implementations," so you can make informed decisions 
                that impact your bottom line.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                <h3 className="text-xl font-semibold mb-3 text-yellow-800">
                  💡 Business Owner's Reality Check
                </h3>
                <p className="text-yellow-700">
                  You don't need to become a data scientist, but understanding key AI terminology 
                  helps you ask better questions, evaluate solutions effectively, and avoid 
                  expensive mistakes in your AI investments.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-green-800">
                    ✅ What You'll Gain
                  </h3>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• Confidence in AI vendor conversations</li>
                    <li>• Better evaluation of AI proposals</li>
                    <li>• Understanding of costs and timelines</li>
                    <li>• Ability to spot AI buzzword marketing</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">
                    🎯 Focus Areas
                  </h3>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li>• Business applications over technical details</li>
                    <li>• ROI and cost considerations</li>
                    <li>• Implementation timelines and requirements</li>
                    <li>• Risk factors and ethical considerations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search AI terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Enhanced Results count */}
            <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    📊 {filteredTerms.length} of {glossaryTerms.length} terms
                  </div>
                  {searchTerm && (
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      🔍 Searching: "{searchTerm}"
                    </div>
                  )}
                </div>
                {selectedCategory !== 'all' && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{categories.find(cat => cat.id === selectedCategory)?.icon}</span>
                    <span>Category: {categories.find(cat => cat.id === selectedCategory)?.label}</span>
                  </div>
                )}
              </div>
              
              {filteredTerms.length > 0 && (
                <div className="mt-3 text-xs text-gray-500">
                  💡 Tip: Click on related terms to jump between definitions
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {filteredTerms.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow" id={item.term.toLowerCase().replace(/\s+/g, '-')}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 md:mb-0">
                      {highlightSearchTerm(item.term, searchTerm)}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1
                      ${item.category === 'basics' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'business' ? 'bg-green-100 text-green-800' :
                        item.category === 'technology' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'}`}>
                      <span className="text-sm">{categories.find(cat => cat.id === item.category)?.icon}</span>
                      {categories.find(cat => cat.id === item.category)?.label || item.category}
                    </span>
                  </div>
                  
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4">
                      {highlightSearchTerm(item.definition, searchTerm)}
                    </p>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-semibold text-blue-800 text-sm mb-2">
                        💼 Business Example:
                      </h4>
                      <p className="text-blue-700 text-sm" dangerouslySetInnerHTML={{
                        __html: item.businessExample
                      }}>
                      </p>
                    </div>

                    {/* Related Terms */}
                    {(() => {
                      const relatedTerms = getRelatedTerms(item)
                      return relatedTerms.length > 0 ? (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                          <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                            🔗 Related Terms
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {relatedTerms.map((relatedTerm, relatedIndex) => (
                              <button
                                key={relatedIndex}
                                onClick={() => scrollToTerm(relatedTerm.term)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors duration-200"
                              >
                                <span className="text-xs">{categories.find(cat => cat.id === relatedTerm.category)?.icon}</span>
                                {relatedTerm.term}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null
                    })()}
                  </div>
                </div>
              ))}
            </div>

            {filteredTerms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No terms found matching your search. Try different keywords or browse all categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A]">
              Ready to Apply Your AI Knowledge?
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Now that you understand the terminology, it's time to see how these AI concepts 
              can drive real business value for your company.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-blue-600 mb-2">📊 Calculate Impact</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Use our ROI calculator to estimate potential savings from AI implementation.
                </p>
                <Link 
                  href="/calculators/ai-cost-comparison"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Try Calculator →
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-green-600 mb-2">🚀 Get Started</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Learn practical AI prompt engineering with our free tools and guides.
                </p>
                <Link 
                  href="/ai-prompt-generator"
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Start Free →
                </Link>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-purple-600 mb-2">📚 Learn More</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore the complete history of AI and how it impacts modern business.
                </p>
                <Link 
                  href="/ai-history"
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  Read History →
                </Link>
              </div>
            </div>
            
            <Link 
              href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Master AI for Business Success
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-[#1A1A1A] text-center">
              Quick Reference: Most Important Terms for Business Owners
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['Machine Learning', 'Natural Language Processing', 'ROI (Return on Investment)', 'Automation'].map((term, index) => (
                <a 
                  key={index}
                  href={`#${term.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
                >
                  <span className="font-semibold text-blue-600 text-sm">{term}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 group"
          aria-label="Back to top"
        >
          <svg 
            className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </Layout>
  )
} 