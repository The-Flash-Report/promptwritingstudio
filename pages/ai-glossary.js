import Layout from '../components/layout/Layout'
import EnhancedMeta from '../components/ui/EnhancedMeta'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AIGlossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isIndexOpen, setIsIndexOpen] = useState(false)
  const [showScrollButtons, setShowScrollButtons] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = typeof window !== 'undefined' ? window.scrollY : 0
      setShowScrollButtons(y > 500)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const categories = [
    { id: 'all', label: 'All Terms' },
    { id: 'basics', label: 'AI Basics' },
    { id: 'business', label: 'Business Applications' },
    { id: 'technology', label: 'Technology' },
    { id: 'ethics', label: 'Ethics & Safety' }
  ]

  const glossaryTerms = [
    {
      term: "Artificial Intelligence (AI)",
      category: "basics",
      definition: "Computer systems designed to perform tasks that typically require human intelligence, such as recognizing speech, making decisions, or solving problems. In business, AI helps automate processes and gain insights from data.",
      businessExample: "Customer service chatbots that can answer common questions 24/7."
    },
    {
      term: "Machine Learning (ML)",
      category: "technology", 
      definition: "A subset of AI where computers learn patterns from data without being explicitly programmed for each task. The system improves its performance as it processes more information.",
      businessExample: "Email spam filters that get better at detecting unwanted messages over time."
    },
    {
      term: "Large Language Model (LLM)",
      category: "technology",
      definition: "AI systems trained on vast amounts of text data to understand and generate human-like language. These models can write, summarize, translate, and answer questions.",
      businessExample: "ChatGPT helping writers create marketing copy or customer support responses."
    },
    {
      term: "Deep Learning",
      category: "technology",
      definition: "A machine learning technique using artificial neural networks with multiple layers to recognize complex patterns. It's particularly effective for processing images, speech, and text.",
      businessExample: "Photo recognition in inventory management systems or voice assistants."
    },
    {
      term: "Neural Network",
      category: "technology",
      definition: "Computing systems inspired by biological brain networks. They consist of interconnected nodes that process information and learn patterns, forming the basis of deep learning.",
      businessExample: "Fraud detection systems in banking that identify suspicious transaction patterns."
    },
    {
      term: "Natural Language Processing (NLP)",
      category: "business",
      definition: "AI technology that enables computers to understand, interpret, and generate human language. It bridges the gap between human communication and computer understanding.",
      businessExample: "Automated analysis of customer reviews to identify common complaints or praise."
    },
    {
      term: "Computer Vision",
      category: "business",
      definition: "AI capability that enables machines to interpret and understand visual information from images and videos, similar to human sight.",
      businessExample: "Quality control systems in manufacturing that automatically detect product defects."
    },
    {
      term: "Prompt Engineering",
      category: "business",
      definition: "The practice of crafting effective instructions or questions for AI systems to get desired outputs. Essential skill for maximizing AI tool effectiveness.",
      businessExample: "Writing specific prompts to generate targeted marketing content that matches your brand voice."
    },
    {
      term: "Automation",
      category: "business",
      definition: "Using AI and technology to perform tasks without human intervention. Reduces manual work and increases efficiency in business processes.",
      businessExample: "Automated invoice processing that extracts data and routes approvals without manual data entry."
    },
    {
      term: "Artificial General Intelligence (AGI)",
      category: "basics",
      definition: "Hypothetical AI that matches or exceeds human cognitive abilities across all domains. Unlike current AI that excels at specific tasks, AGI would be truly general-purpose.",
      businessExample: "Currently theoretical - would be an AI assistant capable of handling any business task as well as a human executive."
    },
    {
      term: "Algorithm",
      category: "technology",
      definition: "A set of rules or instructions that computers follow to solve problems or complete tasks. In AI, algorithms enable machines to learn from data and make decisions.",
      businessExample: "Recommendation algorithms that suggest products to customers based on their browsing history."
    },
    {
      term: "Training Data",
      category: "technology",
      definition: "The information used to teach AI systems how to perform tasks. Quality and quantity of training data directly impacts AI performance.",
      businessExample: "Historical sales data used to train a forecasting model for inventory planning."
    },
    {
      term: "API (Application Programming Interface)",
      category: "technology",
      definition: "A way for different software applications to communicate. AI APIs allow businesses to integrate AI capabilities into their existing systems without building from scratch.",
      businessExample: "Using OpenAI's API to add AI writing capabilities to your company's content management system."
    },
    {
      term: "Supervised Learning",
      category: "technology",
      definition: "Machine learning approach where the AI learns from examples with known correct answers. Like teaching with answer sheets to help the system learn patterns.",
      businessExample: "Training a system to categorize customer support tickets by showing it thousands of pre-labeled examples."
    },
    {
      term: "Unsupervised Learning",
      category: "technology",
      definition: "Machine learning where AI finds hidden patterns in data without being given specific examples of what to look for. Useful for discovering unknown insights.",
      businessExample: "Analyzing customer behavior data to discover unexpected customer segments for targeted marketing."
    },
    {
      term: "ROI (Return on Investment)",
      category: "business",
      definition: "A metric measuring the efficiency of an investment. In AI context, it compares the cost of implementing AI solutions against the benefits gained.",
      businessExample: "Calculating savings from AI automation: if you spend $10,000 on AI tools that save 100 hours monthly at $50/hour, your monthly ROI is 400%."
    },
    {
      term: "Chatbot",
      category: "business",
      definition: "AI-powered software that conducts conversations with users through text or voice. Modern chatbots can handle complex customer service interactions.",
      businessExample: "Website chatbots that answer customer questions, schedule appointments, and escalate complex issues to human agents."
    },
    {
      term: "Predictive Analytics",
      category: "business",
      definition: "Using AI to analyze current and historical data to make predictions about future events. Helps businesses make data-driven decisions.",
      businessExample: "Predicting which customers are likely to cancel subscriptions so you can proactively offer retention incentives."
    },
    {
      term: "Bias",
      category: "ethics",
      definition: "Unfair preferences or prejudices in AI systems, often reflecting biases present in training data. Can lead to discriminatory outcomes in business applications.",
      businessExample: "A hiring AI that unfairly favors certain demographics due to biased historical hiring data."
    },
    {
      term: "Ethical AI",
      category: "ethics",
      definition: "Development and use of AI systems that are fair, transparent, accountable, and respect human rights. Increasingly important for business reputation and compliance.",
      businessExample: "Ensuring AI-powered loan approval systems don't discriminate against protected groups."
    },
    {
      term: "AI Hallucination",
      category: "ethics",
      definition: "When AI systems generate false or misleading information presented as fact. Important to understand when using AI for business content creation.",
      businessExample: "An AI writing assistant creating fake statistics for a marketing report that need human verification."
    },
    {
      term: "Explainable AI (XAI)",
      category: "ethics",
      definition: "AI systems designed to provide clear explanations for their decisions and recommendations. Critical for business applications requiring transparency.",
      businessExample: "A loan approval system that explains specific factors that led to approval or denial decisions."
    },
    {
      term: "Data Privacy",
      category: "ethics",
      definition: "Protecting sensitive information when using AI systems. Includes securing customer data and complying with regulations like GDPR.",
      businessExample: "Ensuring customer data used to train AI models is anonymized and securely stored."
    },
    {
      term: "Transfer Learning",
      category: "technology",
      definition: "Technique where AI models trained on one task are adapted for related tasks. Reduces time and resources needed for implementation.",
      businessExample: "Using a pre-trained image recognition model and adapting it to identify your specific products."
    },
    {
      term: "Edge AI",
      category: "technology",
      definition: "Running AI algorithms locally on devices rather than in the cloud. Provides faster responses and better privacy for sensitive business data.",
      businessExample: "AI-powered security cameras that detect intrusions locally without sending footage to external servers."
    },
    {
      term: "Generative AI",
      category: "basics",
      definition: "AI that creates new content such as text, images, audio, or code based on patterns learned from data.",
      businessExample: "Automatically drafting blog outlines or product descriptions from a short brief."
    },
    {
      term: "Retrieval-Augmented Generation (RAG)",
      category: "technology",
      definition: "An approach that combines information retrieval from your documents with a generative model so answers are grounded in trusted sources.",
      businessExample: "A support assistant that answers questions using your help center and policy docs."
    },
    { term: "Auto-RAG", category: "technology", definition: "Automates retrieval configuration and prompt assembly for RAG to reduce manual tuning.", businessExample: "Adaptive k and templates based on query type and past evals." },
    { term: "Self-RAG", category: "technology", definition: "Adds reflect-retrieve-revise loops: draft, detect gaps, retrieve more, and revise with citations.", businessExample: "Improve coverage for complex support answers with a second retrieval pass." },
    { term: "FLARE / Active RAG", category: "technology", definition: "Triggers retrieval mid-generation when uncertainty is detected, then continues with new context.", businessExample: "Long answers fetch extra citations only when needed." },
    { term: "R^2AG", category: "technology", definition: "Retrieval-Refinement loop that adds focused retrieval to refine an initial answer.", businessExample: "Refine a draft policy answer by pulling targeted sections from the handbook." },
    { term: "GraphRAG", category: "technology", definition: "Uses a knowledge graph of entities and relations to guide retrieval across multi-hop questions.", businessExample: "Supply chain Q&A that traverses product → vendor → contract relations." },
    { term: "InFO-RAG", category: "technology", definition: "Information-focused RAG that selects diverse, complementary chunks to maximize coverage.", businessExample: "Executive summaries pulling distinct sections rather than redundant paragraphs." },
    { term: "HybridRAG", category: "technology", definition: "Combines BM25 and vector retrieval with re-ranking for robust performance.", businessExample: "Short keyword queries still find exact matches while semantic recall stays high." },
    { term: "Corrective RAG", category: "technology", definition: "Verifies claims, retrieves evidence for unsupported parts, and repairs the answer.", businessExample: "Compliance summaries that remove or fix unverified statements." },
    { term: "Speculative RAG", category: "technology", definition: "Pipelines retrieval and generation using fast drafts to prefetch likely evidence.", businessExample: "Lower latency answers by overlapping fetch and generation." },
    { term: "Reliability-Aware RAG (RA-RAG)", category: "technology", definition: "Estimates answer confidence and applies risk-based policies (tighten citations, escalate).", businessExample: "High-risk finance queries require more citations or human review." },
    { term: "MoRAG (Multi-Fusion RAG)", category: "technology", definition: "Fuses multiple retrieval channels (BM25, vector, graph) and re-rankers to pick best context.", businessExample: "Mixed PDFs, tickets, and wiki content retrieved via multiple signals." },
    {
      term: "Fine-tuning",
      category: "technology",
      definition: "Further training a pre-trained model on your domain data to specialize behavior and tone.",
      businessExample: "Adapting a writing model to match your brand voice across marketing channels."
    },
    {
      term: "Embeddings",
      category: "technology",
      definition: "Numeric vector representations of text, images, or other data that capture meaning for search and clustering.",
      businessExample: "Finding similar support tickets by meaning rather than exact keywords."
    },
    {
      term: "Vector Database",
      category: "technology",
      definition: "A database optimized to store and search embeddings using similarity queries.",
      businessExample: "Retrieving the most relevant knowledge base articles to answer a customer question."
    },
    {
      term: "Token",
      category: "technology",
      definition: "A small chunk of text used for pricing, limits, and processing in language models.",
      businessExample: "Estimating monthly API costs based on the number of tokens processed."
    },
    {
      term: "Context Window",
      category: "technology",
      definition: "The maximum number of tokens a model can consider at once when generating an answer.",
      businessExample: "Splitting long PDFs into sections so the model can summarize each chapter accurately."
    },
    {
      term: "Temperature",
      category: "technology",
      definition: "A setting that controls randomness in generated outputs; lower is more deterministic, higher is more creative.",
      businessExample: "Using a low temperature for legal copy and a higher one for brainstorming ad ideas."
    },
    {
      term: "Top-p (Nucleus Sampling)",
      category: "technology",
      definition: "A sampling method that limits choices to the top probability mass to control variability in outputs.",
      businessExample: "Producing varied but on-brand headlines without going off-topic."
    },
    {
      term: "Inference",
      category: "technology",
      definition: "Running a trained model to get outputs for a given input.",
      businessExample: "Serving chatbot replies within a defined latency target during peak traffic."
    },
    {
      term: "Latency",
      category: "technology",
      definition: "The time it takes for a system to return a response after receiving a request.",
      businessExample: "Keeping checkout assistant responses under one second to avoid cart abandonment."
    },
    {
      term: "Rate Limit",
      category: "technology",
      definition: "The maximum number of requests allowed to an API within a given time period.",
      businessExample: "Throttling bulk content generation to avoid 429 errors during campaigns."
    },
    {
      term: "Cost per Token",
      category: "business",
      definition: "Usage-based pricing for model inputs and outputs measured in tokens.",
      businessExample: "Forecasting monthly AI spend for your content pipeline using token-based pricing."
    },
    {
      term: "Human-in-the-Loop",
      category: "business",
      definition: "A process where humans review, correct, or guide AI outputs to ensure quality and compliance.",
      businessExample: "Editors approving AI-generated ad copy before publishing."
    },
    {
      term: "Guardrails",
      category: "ethics",
      definition: "Policies, filters, and constraints that keep AI outputs safe, compliant, and on-brand.",
      businessExample: "Blocking medical or investment advice in a consumer chatbot."
    },
    {
      term: "Prompt Injection",
      category: "ethics",
      definition: "A security attack where malicious instructions are embedded in content to override or hijack model behavior.",
      businessExample: "A pasted email tries to make the assistant reveal system prompts or credentials."
    },
    {
      term: "Data Labeling",
      category: "business",
      definition: "Tagging data with the correct categories or attributes for training and evaluating models.",
      businessExample: "Labeling support intents to improve automated ticket routing accuracy."
    },
    {
      term: "Synthetic Data",
      category: "technology",
      definition: "Artificially generated data used to train or evaluate models when real data is scarce or sensitive.",
      businessExample: "Creating edge-case conversations to improve a customer service bot's reliability."
    },
    {
      term: "Model Drift",
      category: "technology",
      definition: "When a model's performance degrades over time as real-world data changes.",
      businessExample: "Retraining models when product names or pricing policies change."
    },
    {
      term: "MLOps",
      category: "technology",
      definition: "Practices and tooling for deploying, monitoring, and maintaining machine learning systems in production.",
      businessExample: "Tracking win rates and response quality for an AI sales assistant."
    },
    {
      term: "RLHF (Reinforcement Learning from Human Feedback)",
      category: "technology",
      definition: "A technique that aligns model behavior using feedback from human evaluators.",
      businessExample: "Calibrating tone for customer support replies to increase CSAT."
    },
    {
      term: "Zero-shot Learning",
      category: "technology",
      definition: "Getting models to perform tasks using clear instructions without providing examples.",
      businessExample: "Categorizing customer feedback with only well-written guidelines in the prompt."
    },
    {
      term: "Few-shot Learning",
      category: "technology",
      definition: "Guiding a model's behavior by providing a handful of examples in the prompt.",
      businessExample: "Showing three compliant headlines and asking the model to generate ten more."
    },
    {
      term: "Prompt Chaining",
      category: "business",
      definition: "Linking multiple prompts and steps to complete a larger workflow.",
      businessExample: "Outline → draft → edit → summarize pipeline for content production."
    },
    {
      term: "System Prompt",
      category: "business",
      definition: "A hidden instruction that sets the assistant's overall behavior and constraints.",
      businessExample: "Configuring an HR assistant to always prioritize compliance and confidentiality."
    },
    {
      term: "Function Calling (Tool Use)",
      category: "technology",
      definition: "Allowing models to call structured tools or APIs to retrieve data or take actions.",
      businessExample: "A chatbot booking meetings through your calendar API when asked."
    },
    {
      term: "Grounding",
      category: "technology",
      definition: "Constraining model outputs to reference specific, trusted data sources.",
      businessExample: "A sales bot that quotes prices only from the latest catalog."
    },
    {
      term: "Explainability Metrics",
      category: "ethics",
      definition: "Techniques for interpreting model decisions and identifying key factors that drove an outcome.",
      businessExample: "Providing feature importance to justify credit approval decisions."
    },
    {
      term: "Data Residency",
      category: "ethics",
      definition: "The geographic location where data is stored and processed, often required by regulation or policy.",
      businessExample: "Configuring EU-only hosting for GDPR-sensitive customer data."
    },
    {
      term: "PII (Personally Identifiable Information)",
      category: "ethics",
      definition: "Data that can identify an individual and requires careful handling and protection.",
      businessExample: "Masking emails and phone numbers in logs to meet compliance requirements."
    },
    {
      term: "GDPR / SOC 2",
      category: "ethics",
      definition: "Common privacy and security frameworks that vendors may need to comply with.",
      businessExample: "Completing vendor due diligence for AI tools that process customer data."
    },
    {
      term: "Knowledge Graph",
      category: "technology",
      definition: "A structured representation of entities and their relationships used for reasoning and search.",
      businessExample: "Surfacing cross-sell opportunities by linking products, customers, and interactions."
    },
    {
      term: "Agent",
      category: "business",
      definition: "An AI system that plans and executes steps toward a goal, often using tools autonomously.",
      businessExample: "An AI assistant that researches prospects, drafts outreach, and schedules meetings."
    },
    {
      term: "Multi-Agent Orchestration",
      category: "technology",
      definition: "Coordinating multiple specialized agents to collaborate on complex tasks.",
      businessExample: "Researcher → writer → fact-checker → editor working together in a pipeline."
    },
    {
      term: "A/B Testing",
      category: "business",
      definition: "Running controlled experiments to compare two variants and measure impact.",
      businessExample: "Testing AI-written vs. human-written subject lines to improve open rates."
    },
    {
      term: "Prompt Template",
      category: "business",
      definition: "A reusable, parameterized instruction that produces consistent outputs.",
      businessExample: "Generating consistent product descriptions from SKU data using a standard template."
    },
    {
      term: "JSON Mode (Structured Output)",
      category: "technology",
      definition: "Configuring a model to return outputs in a strict schema for reliable parsing.",
      businessExample: "Capturing lead details in JSON so your CRM can ingest them automatically."
    },
    { term: "Attention Mechanism", category: "technology", definition: "A neural network component that helps models focus on the most relevant parts of the input.", businessExample: "Improving summarization accuracy by attending to key sentences in long documents." },
    { term: "Autoencoder", category: "technology", definition: "A neural network that learns a compressed representation of data and then reconstructs it.", businessExample: "Detecting anomalies in transactions by comparing reconstructions to originals." },
    { term: "Backpropagation", category: "technology", definition: "Training method that adjusts neural network weights by propagating error gradients backward.", businessExample: "Speeding up training of a forecasting model with efficient backpropagation." },
    { term: "BERT (Bidirectional Encoder Representations from Transformers)", category: "technology", definition: "A transformer model that reads text bidirectionally for stronger language understanding.", businessExample: "Accurately classifying customer intents in incoming emails." },
    { term: "Big Data", category: "technology", definition: "Extremely large datasets that require specialized storage and processing.", businessExample: "Analyzing billions of events to detect fraud patterns at scale." },
    { term: "Black Box", category: "technology", definition: "A system whose internal decision-making is hard to interpret.", businessExample: "Using explainability tools to interpret a black-box credit model." },
    { term: "CNN (Convolutional Neural Network)", category: "technology", definition: "A neural network architecture effective for images and other grid-like data.", businessExample: "Detecting product defects from manufacturing line camera feeds." },
    { term: "Corpus", category: "technology", definition: "A large collection of text used to train or evaluate language models.", businessExample: "Training a custom search tool on your help center corpus." },
    { term: "CUDA", category: "technology", definition: "NVIDIA's parallel computing platform for accelerating workloads on GPUs.", businessExample: "Reducing model training time by leveraging CUDA-accelerated GPUs." },
    { term: "Data Mining", category: "technology", definition: "Discovering patterns and insights from large datasets.", businessExample: "Finding high-value customer segments from purchase histories." },
    { term: "Diffusion Model", category: "technology", definition: "A generative model that learns to reverse noise to create realistic data.", businessExample: "Generating product mockups from text descriptions for marketing." },
    { term: "Discriminator", category: "technology", definition: "In a GAN, the network that distinguishes real data from generated data.", businessExample: "Improving image quality by training a stronger discriminator." },
    { term: "Dropout", category: "technology", definition: "A regularization technique that randomly disables neurons during training to prevent overfitting.", businessExample: "Reducing overfitting in a lead-scoring model for better generalization." },
    { term: "Ensemble Learning", category: "technology", definition: "Combining multiple models to improve accuracy and robustness.", businessExample: "Blending models to boost churn prediction performance." },
    { term: "Epoch", category: "technology", definition: "One complete pass through the training dataset.", businessExample: "Monitoring loss by epoch to decide when to stop training." },
    { term: "Foundation Model", category: "technology", definition: "A large pre-trained model that can be adapted to many downstream tasks.", businessExample: "Starting with a foundation model then fine-tuning to your brand tone." },
    { term: "Feature", category: "technology", definition: "An individual measurable variable used by a model to make predictions.", businessExample: "Using last-30-day spend as a feature in a retention model." },
    { term: "Federated Learning", category: "technology", definition: "Training a model across decentralized devices or servers while keeping data local.", businessExample: "Improving mobile keyboard suggestions without uploading user texts." },
    { term: "GPU (Graphics Processing Unit)", category: "technology", definition: "Hardware optimized for parallel computations used to accelerate AI workloads.", businessExample: "Cutting model training time from days to hours using GPUs." },
    { term: "Gradient Descent", category: "technology", definition: "An optimization algorithm that iteratively adjusts parameters to minimize error.", businessExample: "Training forecasting models efficiently with stochastic gradient descent." },
    { term: "Ground Truth", category: "technology", definition: "Accurate reference data used as the standard for training and evaluation.", businessExample: "Using verified labels from support teams to evaluate intent models." },
    { term: "Hyperparameter", category: "technology", definition: "A configuration value set before training that influences how a model learns.", businessExample: "Tuning learning rate and batch size to speed up training without losing accuracy." },
    { term: "Hidden Layer", category: "technology", definition: "Layers in a neural network between input and output that learn intermediate representations.", businessExample: "Deeper networks with more hidden layers capture complex customer patterns." },
    { term: "Heuristic", category: "technology", definition: "A practical rule or shortcut that provides good-enough solutions.", businessExample: "Using a heuristic rule to flag obviously invalid leads before ML runs." },
    { term: "Interpretability", category: "ethics", definition: "How understandable a model’s decisions are to humans.", businessExample: "Providing reason codes for loan decisions to meet compliance requirements." },
    { term: "IoT (Internet of Things)", category: "technology", definition: "A network of connected devices that collect and exchange data.", businessExample: "Predictive maintenance on factory machines using IoT sensor data." },
    { term: "Imitation Learning", category: "technology", definition: "Training models to mimic expert behavior from demonstrations.", businessExample: "Teaching a warehouse robot optimal picking by imitating human experts." },
    { term: "Inductive Bias", category: "technology", definition: "Assumptions a learning algorithm makes to generalize from limited data.", businessExample: "Choosing a linear model when you assume a roughly linear relationship." },
    { term: "JSON (JavaScript Object Notation)", category: "technology", definition: "A lightweight data format used for APIs and structured model outputs.", businessExample: "Returning structured results from a chatbot for CRM ingestion." },
    { term: "Jupyter Notebook", category: "technology", definition: "An interactive environment for prototyping data science and ML.", businessExample: "Exploring customer cohorts and training quick baselines in notebooks." },
    { term: "Jailbreaking", category: "ethics", definition: "Attempts to circumvent an AI system’s safety or policy constraints.", businessExample: "Blocking prompts designed to make a chatbot reveal secrets or unsafe content." },
    { term: "Joint Distribution", category: "technology", definition: "A probability distribution over two or more variables at the same time.", businessExample: "Modeling demand as a function of price and seasonality jointly." },
    { term: "Just-in-time Learning", category: "business", definition: "Delivering information or training precisely when needed.", businessExample: "Surfacing drafting tips inside the editor at the moment of writing." },
    { term: "k-means Clustering", category: "technology", definition: "An unsupervised algorithm that partitions data into k groups based on similarity.", businessExample: "Segmenting customers into behavior-based clusters for campaigns." },
    { term: "Kernel", category: "technology", definition: "A function that computes similarity in algorithms like SVMs.", businessExample: "Using an RBF kernel to separate non-linear classes in quality control." },
    { term: "k-NN (k-Nearest Neighbors)", category: "technology", definition: "A simple algorithm that classifies or regresses using the closest training examples.", businessExample: "Recommending similar products by finding nearest neighbors in feature space." },
    { term: "KPI (Key Performance Indicator)", category: "business", definition: "A measurable value that indicates how effectively objectives are being met.", businessExample: "Tracking CSAT and first-response time to measure chatbot impact." },
    { term: "Loss Function", category: "technology", definition: "A metric that measures the difference between predictions and actual values during training.", businessExample: "Using cross-entropy loss for classification tasks like spam detection." },
    { term: "LSTM (Long Short-Term Memory)", category: "technology", definition: "A recurrent neural network architecture designed to capture long-range dependencies.", businessExample: "Forecasting demand from long historical sequences of sales data." },
    { term: "Learning Rate", category: "technology", definition: "Controls how much model weights change with each training step.", businessExample: "Scheduling the learning rate to stabilize training and improve accuracy." },
    { term: "Latent Space", category: "technology", definition: "A compressed representation where similar inputs are close together.", businessExample: "Finding related products by distance in latent space." },
    { term: "Model", category: "technology", definition: "A mathematical representation that maps inputs to outputs after training.", businessExample: "A lead-scoring model ranks prospects by conversion likelihood." },
    { term: "Multimodal", category: "technology", definition: "Models that process and combine multiple data types like text, images, and audio.", businessExample: "Searching product catalog by text description and image together." },
    { term: "Monte Carlo", category: "technology", definition: "Methods that use repeated random sampling to estimate results.", businessExample: "Simulating revenue scenarios to plan inventory buffers." },
    { term: "NLU (Natural Language Understanding)", category: "technology", definition: "AI capability focused on deriving meaning and intent from human language.", businessExample: "Routing customer tickets by understanding intent and urgency." },
    { term: "Normalization", category: "technology", definition: "Scaling features to standard ranges to stabilize and speed up training.", businessExample: "Normalizing numeric inputs to improve churn model performance." },
    { term: "Noise", category: "technology", definition: "Random variation in data that can obscure true signals.", businessExample: "Filtering noisy sensor readings before predicting failures." },
    { term: "Overfitting", category: "technology", definition: "When a model memorizes training data and performs poorly on new data.", businessExample: "Using validation sets and regularization to prevent overfitting in forecasts." },
    { term: "Optimization", category: "technology", definition: "Techniques for improving model performance or resource usage.", businessExample: "Optimizing prompts and caching to reduce API costs." },
    { term: "One-shot Learning", category: "technology", definition: "Learning to perform a task from a single example.", businessExample: "Recognizing a new SKU from one labeled product image." },
    { term: "OpenAI", category: "technology", definition: "An AI research and product company providing widely used language model APIs.", businessExample: "Adding AI writing to your CMS via an API integration." },
    { term: "Outlier", category: "technology", definition: "A data point that significantly differs from others.", businessExample: "Flagging suspicious transactions as outliers for review." },
    { term: "Prompt (Input)", category: "business", definition: "The instruction or question given to a model to produce an output.", businessExample: "Using a clear prompt template to generate consistent product copy." },
    { term: "Parameter", category: "technology", definition: "A value a model learns during training, such as a weight.", businessExample: "Large models with more parameters can capture complex patterns but cost more to run." },
    { term: "Preprocessing", category: "technology", definition: "Cleaning and transforming raw data before training or inference.", businessExample: "Removing PII and standardizing formats before training a support classifier." },
    { term: "PyTorch", category: "technology", definition: "A popular open-source deep learning framework.", businessExample: "Rapidly prototyping and training custom models for internal tools." },
    { term: "Precision", category: "technology", definition: "Of the items predicted positive, the fraction that are actually positive.", businessExample: "Measuring precision to ensure a fraud detector avoids false accusations." },
    { term: "Quantization", category: "technology", definition: "Reducing model size and speed requirements by using lower-precision numbers.", businessExample: "Running models on edge devices by quantizing to 8-bit integers." },
    { term: "Query", category: "technology", definition: "A request for information from a database or AI system.", businessExample: "Running a semantic search query to find the most relevant policy." },
    { term: "Q-learning", category: "technology", definition: "A reinforcement learning algorithm that learns action values to maximize reward.", businessExample: "Optimizing ad bidding strategies via simulated environments." },
    { term: "Quality Assurance (QA)", category: "business", definition: "Processes to test and validate AI systems for reliability and safety.", businessExample: "Human review of chatbot responses before full rollout." },
    { term: "Quantum Computing", category: "technology", definition: "Computation based on quantum mechanics that may accelerate certain algorithms.", businessExample: "Exploratory research into faster optimization for logistics routing." },
    { term: "Reinforcement Learning", category: "technology", definition: "Training agents to take actions in an environment to maximize reward.", businessExample: "Learning optimal pricing strategies through simulation." },
    { term: "RNN (Recurrent Neural Network)", category: "technology", definition: "A neural network designed for sequential data by sharing state across steps.", businessExample: "Predicting time-series demand from previous days’ sales." },
    { term: "Robotics", category: "technology", definition: "Integrating AI with physical machines to sense, plan, and act.", businessExample: "Warehouse robots that pick and pack orders collaboratively with humans." },
    { term: "Regression", category: "technology", definition: "A modeling approach to predict continuous numeric values.", businessExample: "Forecasting monthly revenue by region with regression models." },
    { term: "Recall", category: "technology", definition: "Of the actual positives, the fraction correctly identified by the model.", businessExample: "Tracking recall so a support classifier catches most urgent tickets." },
    { term: "Self-attention", category: "technology", definition: "A mechanism where each token attends to other tokens to capture long-range context.", businessExample: "Generating coherent summaries of long policies using self-attention." },
    { term: "Semantics", category: "technology", definition: "Relating to the meaning of words or data rather than surface form.", businessExample: "Using semantic search to find relevant knowledge by meaning, not keywords." },
    { term: "Softmax", category: "technology", definition: "A function that converts raw scores into probabilities that sum to 1.", businessExample: "Interpreting class probabilities for spam vs. not-spam decisions." },
    { term: "Transformer", category: "technology", definition: "A neural network architecture built on self-attention that underpins modern language models.", businessExample: "Using transformer models to automate customer email replies." },
    { term: "Turing Test", category: "basics", definition: "A test of whether a machine’s behavior is indistinguishable from a human’s in conversation.", businessExample: "Evaluating chatbot naturalness during usability studies." },
    { term: "Underfitting", category: "technology", definition: "When a model is too simple to capture true patterns in data.", businessExample: "Adding features and model capacity to fix underfitting in predictions." },
    { term: "Upsampling", category: "technology", definition: "Increasing the resolution or quantity of data points, often for class balancing.", businessExample: "Balancing rare positive cases in training to improve detector recall." },
    { term: "User Interface (UI)", category: "business", definition: "The visual and interactive layer where users interact with AI systems.", businessExample: "Designing clear explanations and feedback controls in a support assistant UI." },
    { term: "Uncertainty", category: "technology", definition: "A measure of confidence or variability in a model’s predictions.", businessExample: "Escalating conversations to humans when prediction uncertainty is high." },
    { term: "Validation", category: "technology", definition: "Evaluating a model on unseen data to tune hyperparameters and prevent overfitting.", businessExample: "Using a validation set to pick the best churn model." },
    { term: "Vector", category: "technology", definition: "An array of numbers representing data in a model, often used for similarity.", businessExample: "Comparing product vectors to recommend similar items." },
    { term: "VAE (Variational Autoencoder)", category: "technology", definition: "A generative model that learns a probabilistic latent space to create new data.", businessExample: "Generating synthetic variations of product images for testing." },
    { term: "Vanilla", category: "technology", definition: "The basic, unmodified version of a model or algorithm.", businessExample: "Starting with a vanilla transformer before adding custom modules." },
    { term: "Visualization", category: "technology", definition: "Graphical representation of data or model behavior for insights.", businessExample: "Dashboards that track precision, recall, and latency over time." },
    { term: "Weight", category: "technology", definition: "A parameter in a neural network that scales the influence of an input.", businessExample: "Inspecting learned weights to diagnose model behavior." },
    { term: "Word Embedding", category: "technology", definition: "A vector representation of a word that captures meaning and context.", businessExample: "Finding similar terms in customer feedback using word embeddings." },
    { term: "Weak AI", category: "basics", definition: "AI designed for specific tasks rather than general intelligence.", businessExample: "A specialized invoice extraction tool that does one job very well." },
    { term: "Workflow", category: "business", definition: "A defined sequence of steps to accomplish a task, often automated with AI.", businessExample: "Research → draft → review → publish workflow for content teams." },
    { term: "Whisper", category: "technology", definition: "An automatic speech recognition model for transcribing audio.", businessExample: "Transcribing sales calls to feed CRM notes automatically." },
    { term: "XGBoost", category: "technology", definition: "A high-performance gradient boosting framework for tabular data.", businessExample: "Winning baseline for churn prediction on structured datasets." },
    { term: "XML (eXtensible Markup Language)", category: "technology", definition: "A markup language for structured data exchange.", businessExample: "Exporting product feeds for integrations that require XML." },
    { term: "Xavier Initialization", category: "technology", definition: "A method for setting initial neural network weights to improve training stability.", businessExample: "Stabilizing deep network training for image classification." },
    { term: "YOLO (You Only Look Once)", category: "technology", definition: "A real-time object detection algorithm that predicts boxes and classes in one pass.", businessExample: "Detecting shelf stock levels from live camera feeds." },
    { term: "Yield", category: "business", definition: "The output or results produced by a process; sometimes used to describe throughput or productivity.", businessExample: "Measuring content yield per hour when using AI drafting tools." },
    { term: "Y-axis", category: "technology", definition: "The vertical axis in a chart used to plot values.", businessExample: "Standardizing KPI dashboards so teams read axes consistently." },
    { term: "Year-over-year (YoY)", category: "business", definition: "A comparison of a metric against the same period last year.", businessExample: "Reporting YoY improvement in support resolution time after AI rollout." },
    { term: "Z-score", category: "technology", definition: "A standardized score indicating how many standard deviations a value is from the mean.", businessExample: "Flagging anomalous spend spikes using high z-scores." },
    { term: "Zettabyte", category: "technology", definition: "A unit of digital information equal to one sextillion bytes (10^21).", businessExample: "Understanding the scale of global data growth that drives AI adoption." },
    { term: "Zipf's Law", category: "technology", definition: "An observation that word frequency is inversely proportional to rank.", businessExample: "Designing search and autocomplete that handle long-tail queries." },
    { term: "Zone of Proximal Development", category: "business", definition: "An education concept applied to AI-assisted learning: tasks a user can do with guidance.", businessExample: "Guided prompting that helps analysts complete complex workflows." }
  ]

  const filteredTerms = glossaryTerms
    .filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory
    return matchesSearch && matchesCategory
  })
    .sort((a, b) => a.term.localeCompare(b.term))

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const lettersPresent = Array.from(new Set(
    filteredTerms
      .map(t => (t.term && t.term[0] ? t.term[0].toUpperCase() : ''))
      .filter(ch => /[A-Z]/.test(ch))
  )).sort()

  let previousLetter = ''

  return (
    <Layout
      title="AI Glossary - Essential Artificial Intelligence Terms for Business Owners | PromptWritingStudio"
      description="Master AI terminology with our comprehensive glossary. Clear, business-focused definitions of key artificial intelligence terms every entrepreneur should know."
    >
      <EnhancedMeta
        title="AI Glossary - Essential Artificial Intelligence Terms for Business Owners"
        description="Understand AI with clear, business-focused definitions. From machine learning to neural networks - essential AI terms explained for entrepreneurs."
        url="https://promptwritingstudio.com/ai-glossary"
        image="https://promptwritingstudio.com/images/ai-glossary-preview.jpg"
        type="article"
        publishedTime="2024-01-22T00:00:00Z"
        modifiedTime="2025-08-20T00:00:00Z"
      />
      <OrganizationSchema />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AI Glossary for Business Owners
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
                The AI revolution is happening in boardrooms, not just research labs. When vendors 
                pitch "machine learning solutions" or consultants recommend "neural network implementations," 
                you need to understand what they're really offering and how it impacts your bottom line.
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
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mb-6">
              Showing {filteredTerms.length} of {glossaryTerms.length} terms
            </p>
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Anchor target for A–Z index */}
            <div id="a-z-index" className="h-0" />
            {/* Sticky A–Z Index (Mobile: collapsible) */}
            <div className="md:hidden sticky top-0 z-20 bg-white/90 backdrop-blur border-b mb-6">
              <button
                type="button"
                aria-expanded={isIndexOpen}
                onClick={() => setIsIndexOpen(open => !open)}
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-[#1A1A1A]"
              >
                <span>A–Z Index</span>
                <span className="text-gray-500">{isIndexOpen ? 'Hide' : 'Show'}</span>
              </button>
              {isIndexOpen && (
                <div className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar px-3 pb-3">
                  {alphabet.map((ch) => {
                    const enabled = lettersPresent.includes(ch)
                    return enabled ? (
                      <a
                        key={ch}
                        href={`#letter-${ch}`}
                        onClick={() => setIsIndexOpen(false)}
                        className="px-2 py-1 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                      >
                        {ch}
                      </a>
                    ) : (
                      <span
                        key={ch}
                        className="px-2 py-1 text-xs font-semibold text-gray-300"
                      >
                        {ch}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Sticky A–Z Index (Desktop: always visible) */}
            <div className="hidden md:block sticky top-0 z-20 bg-white/90 backdrop-blur border-b py-2 mb-6">
              <div className="flex gap-2 overflow-x-auto whitespace-nowrap no-scrollbar">
                {alphabet.map((ch) => {
                  const enabled = lettersPresent.includes(ch)
                  return enabled ? (
                    <a
                      key={ch}
                      href={`#letter-${ch}`}
                      className="px-2 py-1 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                    >
                      {ch}
                    </a>
                  ) : (
                    <span
                      key={ch}
                      className="px-2 py-1 text-xs font-semibold text-gray-300"
                    >
                      {ch}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Floating scroll buttons */}
            {showScrollButtons && (
              <div className="fixed bottom-6 right-4 z-30 flex flex-col gap-2">
                <button
                  type="button"
                  aria-label="Back to top"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white/90 backdrop-blur border border-gray-300 shadow-sm hover:shadow px-3 py-2 rounded-md text-xs font-semibold text-gray-700"
                >
                  Top
                </button>
                <button
                  type="button"
                  aria-label="Back to A–Z index"
                  onClick={() => {
                    const el = document.getElementById('a-z-index')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="bg-white/90 backdrop-blur border border-gray-300 shadow-sm hover:shadow px-3 py-2 rounded-md text-xs font-semibold text-gray-700"
                >
                  Index
                </button>
              </div>
            )}
            <div className="space-y-8">
              {filteredTerms.map((item, index) => {
                const currentLetter = item.term && item.term[0] ? item.term[0].toUpperCase() : ''
                const showLetterAnchor = currentLetter && currentLetter !== previousLetter
                if (showLetterAnchor) {
                  previousLetter = currentLetter
                }
                return (
                  <div key={index}>
                    {showLetterAnchor && (
                      <div id={`letter-${currentLetter}`} className="mb-2">
                        <div className="text-xs uppercase tracking-wider text-gray-400">{currentLetter}</div>
                      </div>
                    )}
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow" id={item.term.toLowerCase().replace(/\s+/g, '-')}> 
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2 md:mb-0">
                      {item.term}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block
                      ${item.category === 'basics' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'business' ? 'bg-green-100 text-green-800' :
                        item.category === 'technology' ? 'bg-purple-100 text-purple-800' :
                        'bg-orange-100 text-orange-800'}`}>
                      {categories.find(cat => cat.id === item.category)?.label || item.category}
                    </span>
                  </div>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4">
                      {item.definition}
                    </p>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <h4 className="font-semibold text-blue-800 text-sm mb-2">
                        💼 Business Example:
                      </h4>
                      <p className="text-blue-700 text-sm">
                        {item.businessExample}
                      </p>
                        </div>
                        {item.term === 'Retrieval-Augmented Generation (RAG)' && (
                          <div className="mt-3">
                            <Link href="/what-is-rag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Learn more about RAG →
                            </Link>
                          </div>
                        )}
                        {item.term === 'Fine-tuning' && (
                          <div className="mt-3">
                            <Link href="/what-is-fine-tuning" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Learn more about Fine‑Tuning →
                            </Link>
                          </div>
                        )}
                        {item.term === 'Embeddings' && (
                          <div className="mt-3">
                            <Link href="/what-are-embeddings" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Learn more about Embeddings →
                            </Link>
                          </div>
                        )}
                        {item.term === 'Vector Database' && (
                          <div className="mt-3">
                            <Link href="/what-is-a-vector-database" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              Learn more about Vector Databases →
                            </Link>
                          </div>
                        )}
                        {item.term === 'Auto-RAG' && (
                          <div className="mt-3"><Link href="/auto-rag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about Auto‑RAG →</Link></div>
                        )}
                        {item.term === 'Self-RAG' && (
                          <div className="mt-3"><Link href="/self-rag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about Self‑RAG →</Link></div>
                        )}
                        {item.term === 'FLARE / Active RAG' && (
                          <div className="mt-3"><Link href="/flare-active-rag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about FLARE / Active RAG →</Link></div>
                        )}
                        {item.term === 'R^2AG' && (
                          <div className="mt-3"><Link href="/r2ag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about R^2AG →</Link></div>
                        )}
                        {item.term === 'GraphRAG' && (
                          <div className="mt-3"><Link href="/graphrag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about GraphRAG →</Link></div>
                        )}
                        {item.term === 'InFO-RAG' && (
                          <div className="mt-3"><Link href="/info-rag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about InFO‑RAG →</Link></div>
                        )}
                        {item.term === 'HybridRAG' && (
                          <div className="mt-3"><Link href="/hybridrag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about HybridRAG →</Link></div>
                        )}
                        {item.term === 'Corrective RAG' && (
                          <div className="mt-3"><Link href="/corrective-rag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about Corrective RAG →</Link></div>
                        )}
                        {item.term === 'Speculative RAG' && (
                          <div className="mt-3"><Link href="/speculative-rag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about Speculative RAG →</Link></div>
                        )}
                        {item.term === 'Reliability-Aware RAG (RA-RAG)' && (
                          <div className="mt-3"><Link href="/ra-rag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about RA‑RAG →</Link></div>
                        )}
                        {item.term === 'MoRAG (Multi-Fusion RAG)' && (
                          <div className="mt-3"><Link href="/morag" className="text-blue-600 hover:text-blue-800 text-sm font-medium">Learn more about MoRAG →</Link></div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
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

      {/* Further Reading */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold mb-6 text-[#1A1A1A] text-center">
              Further Reading
            </h3>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <a
                  href="https://developers.google.com/machine-learning/glossary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Google Machine Learning Glossary →
                </a>
                <p className="text-sm text-gray-600 mt-2">Clear, concise definitions from Google’s ML team.</p>
              </li>
              <li className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <a
                  href="https://www.nist.gov/itl/ai-risk-management-framework"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  NIST AI Risk Management Framework →
                </a>
                <p className="text-sm text-gray-600 mt-2">Authoritative US guidance on managing AI risks.</p>
              </li>
              <li className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <a
                  href="https://www.ibm.com/topics/artificial-intelligence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  IBM AI Topics & Glossary →
                </a>
                <p className="text-sm text-gray-600 mt-2">High-level explainers on AI concepts and use cases.</p>
              </li>
              <li className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <a
                  href="https://developer.nvidia.com/deep-learning-ai-glossary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  NVIDIA Deep Learning & AI Glossary →
                </a>
                <p className="text-sm text-gray-600 mt-2">Hardware-aware definitions for modern AI workloads.</p>
              </li>
              <li className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 md:col-span-2">
                <a
                  href="https://platform.openai.com/tokenizer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  OpenAI Tokenizer (Tokens & Context Windows) →
                </a>
                <p className="text-sm text-gray-600 mt-2">Interactive tool to understand tokens and context limits.</p>
              </li>
            </ul>
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
              {['Retrieval-Augmented Generation (RAG)', 'Human-in-the-Loop', 'Guardrails', 'Agent'].map((term, index) => (
                <a 
                  key={index}
                  href={`#${term.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-center"
                >
                  <span className="font-semibold text-blue-600 text-sm">{term}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
} 