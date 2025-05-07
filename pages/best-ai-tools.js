import { useState } from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

export default function BestAITools() {
  const currentYear = new Date().getFullYear();
  
  // Schema.org structured data for CollectionPage
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "headline": `Best AI Tools for ${currentYear}`,
    "description": `A comprehensive, regularly updated collection of the most powerful AI tools to enhance your productivity, creativity, and workflow in ${currentYear}.`,
    "keywords": "AI tools, artificial intelligence tools, best AI tools, AI software, productivity tools, AI writing tools, AI image generation, AI coding tools, vibe coding",
    "datePublished": "2025-05-07T00:00:00+00:00",
    "dateModified": "2025-05-07T00:00:00+00:00",
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
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Writing & Content Creation AI Tools"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Image Generation AI Tools"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Vibe Coding AI Tools"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Productivity & Automation AI Tools"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Business & Marketing AI Tools"
        }
      ]
    }
  };
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'writing', name: 'Writing & Content Creation' },
    { id: 'image', name: 'Image Generation' },
    { id: 'video', name: 'Video Creation' },
    { id: 'audio', name: 'Audio & Voice' },
    { id: 'research', name: 'Research & Analysis' },
    { id: 'productivity', name: 'Productivity & Automation' },
    { id: 'business', name: 'Business & Marketing' },
    { id: 'customer', name: 'Customer Support & Chatbots' },
    { id: 'coding', name: 'Coding & Development' },
    { id: 'ai-ide', name: 'AI IDEs & Coding Assistants' },
    { id: 'vibe-coding', name: 'Vibe Coding Tools' },
    { id: 'design', name: 'Design & UX' },
    { id: 'legal', name: 'Legal & Compliance' },
    { id: 'education', name: 'Education & Learning' },
    { id: 'voice', name: 'Voice & Language Processing' },
    { id: 'integration', name: 'Integration & Automation' },
    { id: 'nocode', name: 'No-Code AI Development' },
    { id: 'data', name: 'Data Analysis' }
  ];
  
  // AI Tools data
  const tools = [
    // Writing & Content Creation
    {
      name: "ChatGPT",
      description: "OpenAI's conversational AI model for text generation, creative writing, and problem-solving.",
      categories: ["writing", "research", "productivity"],
      url: "https://chat.openai.com",
      pricing: "Free / $20 per month"
    },
    {
      name: "Claude",
      description: "Anthropic's AI assistant focused on helpful, harmless, and honest interactions with strong reasoning capabilities.",
      categories: ["writing", "research", "productivity"],
      url: "https://claude.ai",
      pricing: "Free / $20 per month"
    },
    {
      name: "Jasper",
      description: "AI content creation platform for marketing teams to create blog posts, social media, and emails.",
      categories: ["writing", "business"],
      url: "https://www.jasper.ai",
      pricing: "From $39 per month"
    },
    {
      name: "Copy.ai",
      description: "AI copywriting tool for creating marketing copy, blog content, and social media posts.",
      categories: ["writing", "business"],
      url: "https://www.copy.ai",
      pricing: "Free / From $36 per month"
    },
    {
      name: "Writesonic",
      description: "AI writing platform for creating blog posts, ads, emails, and product descriptions.",
      categories: ["writing", "business"],
      url: "https://writesonic.com",
      pricing: "Free / From $16 per month"
    },
    {
      name: "Rytr",
      description: "AI writing assistant for blogs, emails, and marketing content with multiple language support.",
      categories: ["writing", "business"],
      url: "https://rytr.me",
      pricing: "Free / From $9 per month"
    },
    {
      name: "GrammarlyGO",
      description: "AI writing assistant that checks grammar, clarity, engagement, and delivery with generative capabilities.",
      categories: ["writing", "productivity"],
      url: "https://www.grammarly.com",
      pricing: "Free / From $12 per month"
    },
    {
      name: "Wordtune",
      description: "AI writing tool that helps rephrase sentences for clarity and tone adjustments.",
      categories: ["writing", "productivity"],
      url: "https://www.wordtune.com",
      pricing: "Free / From $9.99 per month"
    },
    
    // Image Generation
    {
      name: "DALL-E 3",
      description: "OpenAI's advanced text-to-image model that creates detailed, high-quality images from text prompts.",
      categories: ["image"],
      url: "https://openai.com/dall-e-3",
      pricing: "Varies (included with ChatGPT Plus)"
    },
    {
      name: "Midjourney",
      description: "AI art generator that creates stunning images from text descriptions via Discord.",
      categories: ["image"],
      url: "https://www.midjourney.com",
      pricing: "From $10 per month"
    },
    {
      name: "Stable Diffusion",
      description: "Open-source text-to-image model that can run locally or through various interfaces.",
      categories: ["image"],
      url: "https://stability.ai",
      pricing: "Free (open-source) / Paid options available"
    },
    {
      name: "Adobe Firefly",
      description: "AI image generation tool integrated with Adobe's Creative Cloud suite.",
      categories: ["image", "design"],
      url: "https://firefly.adobe.com",
      pricing: "Included with Creative Cloud / From $4.99 per month"
    },
    {
      name: "DreamStudio",
      description: "User interface for running Stable Diffusion models with various customization options.",
      categories: ["image"],
      url: "https://dreamstudio.ai",
      pricing: "Pay-as-you-go credits"
    },
    {
      name: "Leonardo.ai",
      description: "AI image generator with tools for creating consistent characters and environments.",
      categories: ["image"],
      url: "https://leonardo.ai",
      pricing: "Free / From $10 per month"
    },
    {
      name: "Craiyon",
      description: "Free AI image generator (formerly DALL-E mini) that creates images from text descriptions.",
      categories: ["image"],
      url: "https://www.craiyon.com",
      pricing: "Free / Premium options available"
    },
    
    // Video Creation
    {
      name: "Runway",
      description: "AI video editing and generation platform with text-to-video capabilities.",
      categories: ["video"],
      url: "https://runwayml.com",
      pricing: "Free / From $12 per month"
    },
    {
      name: "Synthesia",
      description: "AI video generation platform for creating videos with virtual presenters.",
      categories: ["video"],
      url: "https://www.synthesia.io",
      pricing: "From $30 per month"
    },
    {
      name: "Descript",
      description: "AI-powered video and audio editing platform with transcription and overdub features.",
      categories: ["video", "audio"],
      url: "https://www.descript.com",
      pricing: "Free / From $12 per month"
    },
    {
      name: "Pictory",
      description: "AI video creation tool that turns text into videos with automated editing.",
      categories: ["video"],
      url: "https://pictory.ai",
      pricing: "From $19 per month"
    },
    {
      name: "D-ID",
      description: "AI-powered digital people for video presentations and interactive experiences.",
      categories: ["video"],
      url: "https://www.d-id.com",
      pricing: "From $5.99 per month"
    },
    {
      name: "HeyGen",
      description: "AI video generation platform for creating professional videos with customizable avatars.",
      categories: ["video"],
      url: "https://www.heygen.com",
      pricing: "From $29 per month"
    },
    {
      name: "Fliki",
      description: "Text to video platform with realistic AI voices and stock media.",
      categories: ["video", "audio"],
      url: "https://fliki.ai",
      pricing: "Free / From $11 per month"
    },
    
    // Audio & Voice
    {
      name: "ElevenLabs",
      description: "AI voice generator with realistic voices and emotion control.",
      categories: ["audio", "voice"],
      url: "https://elevenlabs.io",
      pricing: "Free / From $5 per month"
    },
    {
      name: "Play.ht",
      description: "AI voice generator and text-to-speech platform with natural-sounding voices.",
      categories: ["audio", "voice"],
      url: "https://play.ht",
      pricing: "Free / From $14.25 per month"
    },
    {
      name: "Murf.ai",
      description: "AI voice generator for creating natural-sounding voiceovers for videos and presentations.",
      categories: ["audio", "voice"],
      url: "https://murf.ai",
      pricing: "Free / From $19 per month"
    },
    {
      name: "Resemble.ai",
      description: "AI voice cloning platform for creating custom voice avatars.",
      categories: ["audio", "voice"],
      url: "https://www.resemble.ai",
      pricing: "Contact for pricing"
    },
    {
      name: "Suno",
      description: "AI music generation platform that creates songs from text prompts.",
      categories: ["audio"],
      url: "https://suno.ai",
      pricing: "Free / Pro plans available"
    },
    {
      name: "Soundraw",
      description: "AI music generator for creating royalty-free music tracks.",
      categories: ["audio"],
      url: "https://soundraw.io",
      pricing: "From $16.99 per month"
    },
    {
      name: "LALAL.AI",
      description: "AI-powered stem separation tool for extracting vocals and instruments from audio.",
      categories: ["audio"],
      url: "https://www.lalal.ai",
      pricing: "Pay-per-minute / From $15"
    },
    
    // Research & Analysis
    {
      name: "Perplexity",
      description: "AI-powered search engine that provides comprehensive answers with citations.",
      categories: ["research"],
      url: "https://www.perplexity.ai",
      pricing: "Free / $20 per month"
    },
    {
      name: "Elicit",
      description: "AI research assistant that helps find, summarize, and analyze research papers.",
      categories: ["research"],
      url: "https://elicit.org",
      pricing: "Free / Pro plan available"
    },
    {
      name: "Consensus",
      description: "AI-powered search engine for scientific research papers with summarization.",
      categories: ["research"],
      url: "https://consensus.app",
      pricing: "Free / Pro plans available"
    },
    {
      name: "SciSpace",
      description: "AI research assistant for exploring scientific literature and generating insights.",
      categories: ["research"],
      url: "https://typeset.io",
      pricing: "Free / From $9 per month"
    },
    {
      name: "Scholarcy",
      description: "AI tool that reads research papers and creates summaries and flashcards.",
      categories: ["research"],
      url: "https://www.scholarcy.com",
      pricing: "Free / From $9.99 per month"
    },
    {
      name: "Semantic Scholar",
      description: "AI-powered research tool for finding and understanding scientific literature.",
      categories: ["research"],
      url: "https://www.semanticscholar.org",
      pricing: "Free"
    },
    {
      name: "Connected Papers",
      description: "Visual tool for exploring academic papers and their connections.",
      categories: ["research"],
      url: "https://www.connectedpapers.com",
      pricing: "Free / Pro plans available"
    },
    
    // Productivity & Automation
    {
      name: "Notion AI",
      description: "AI writing and productivity assistant integrated with Notion workspace.",
      categories: ["productivity", "writing"],
      url: "https://www.notion.so/product/ai",
      pricing: "$10 per month (plus Notion subscription)"
    },
    {
      name: "Mem",
      description: "AI-powered note-taking app that organizes information automatically.",
      categories: ["productivity", "research"],
      url: "https://mem.ai",
      pricing: "Free / From $8 per month"
    },
    {
      name: "Otter.ai",
      description: "AI meeting assistant that records, transcribes, and summarizes meetings.",
      categories: ["productivity", "audio"],
      url: "https://otter.ai",
      pricing: "Free / From $10 per month"
    },
    {
      name: "Fireflies.ai",
      description: "AI meeting assistant for recording, transcribing, and analyzing conversations.",
      categories: ["productivity", "audio"],
      url: "https://fireflies.ai",
      pricing: "Free / From $10 per month"
    },
    {
      name: "Zapier",
      description: "Automation platform with AI capabilities for connecting apps and workflows.",
      categories: ["productivity", "integration"],
      url: "https://zapier.com",
      pricing: "Free / From $19.99 per month"
    },
    {
      name: "Taskade",
      description: "AI-powered workspace for task management, notes, and real-time collaboration.",
      categories: ["productivity"],
      url: "https://www.taskade.com",
      pricing: "Free / From $5 per month"
    },
    {
      name: "Capacity",
      description: "AI knowledge management platform for support and operations.",
      categories: ["productivity", "customer"],
      url: "https://capacity.com",
      pricing: "Contact for pricing"
    },
    
    // Business & Marketing
    {
      name: "HubSpot",
      description: "CRM platform with AI capabilities for marketing, sales, and customer service.",
      categories: ["business"],
      url: "https://www.hubspot.com",
      pricing: "Free / Paid plans available"
    },
    {
      name: "Salesforce",
      description: "AI-driven customer relationship management platform for sales and marketing.",
      categories: ["business"],
      url: "https://www.salesforce.com",
      pricing: "From $25 per month"
    },
    {
      name: "Surfer SEO",
      description: "AI-powered SEO tool for content optimization and keyword research.",
      categories: ["business"],
      url: "https://surferseo.com",
      pricing: "From $69 per month"
    },
    {
      name: "Regie.ai",
      description: "AI sales messaging platform for outreach and content creation.",
      categories: ["business", "writing"],
      url: "https://www.regie.ai",
      pricing: "Contact for pricing"
    },
    {
      name: "Typeface",
      description: "AI content platform for brands to create consistent marketing materials.",
      categories: ["business", "writing"],
      url: "https://www.typeface.ai",
      pricing: "Contact for pricing"
    },
    
    // Coding & Development
    {
      name: "GitHub Copilot",
      description: "AI pair programmer that suggests code completions based on context.",
      categories: ["coding", "ai-ide"],
      url: "https://github.com/features/copilot",
      pricing: "From $10 per month"
    },
    {
      name: "Codeium",
      description: "AI coding assistant with support for multiple languages and IDEs.",
      categories: ["coding", "ai-ide"],
      url: "https://codeium.com",
      pricing: "Free / Pro plans available"
    },
    {
      name: "HuggingFace",
      description: "Platform for sharing and deploying AI models with thousands of open-source options.",
      categories: ["coding", "research", "nocode"],
      url: "https://huggingface.co",
      pricing: "Free / Enterprise options available"
    },
    
    // AI IDEs & Coding Assistants
    {
      name: "Cursor",
      description: "AI-first code editor with advanced code generation and editing capabilities based on VSCode.",
      categories: ["coding", "ai-ide", "vibe-coding"],
      url: "https://cursor.sh",
      pricing: "Free / Pro plans available"
    },
    {
      name: "Replit",
      description: "Collaborative coding platform with AI features for development and deployment.",
      categories: ["coding", "ai-ide"],
      url: "https://replit.com",
      pricing: "Free / From $7 per month"
    },
    {
      name: "Warp",
      description: "AI-powered terminal with code suggestions and command explanations.",
      categories: ["coding", "ai-ide"],
      url: "https://www.warp.dev",
      pricing: "Free / Team plans available"
    },
    {
      name: "Tabnine",
      description: "AI code completion tool supporting multiple languages and IDEs.",
      categories: ["coding", "ai-ide"],
      url: "https://www.tabnine.com",
      pricing: "Free / From $12 per month"
    },
    
    // Vibe Coding Tools
    {
      name: "Lovable",
      description: "AI-powered code editor with integrated chat and code generation capabilities for a smooth coding experience.",
      categories: ["coding", "ai-ide", "vibe-coding"],
      url: "https://lovable.ai",
      pricing: "Free / Pro plans available"
    },
    {
      name: "Bolt",
      description: "AI-powered code editor with advanced code generation and refactoring features for a seamless coding flow.",
      categories: ["coding", "ai-ide", "vibe-coding"],
      url: "https://boltcode.io",
      pricing: "Free / From $15 per month"
    },
    {
      name: "Windsurf",
      description: "AI-powered development environment with integrated AI assistance for a relaxed and productive coding experience.",
      categories: ["coding", "ai-ide", "vibe-coding"],
      url: "https://windsurf.io",
      pricing: "Free / Pro plans available"
    },
    {
      name: "Mutable",
      description: "AI-enhanced coding environment focused on creating a flow state for developers with context-aware suggestions.",
      categories: ["coding", "vibe-coding"],
      url: "https://mutable.ai",
      pricing: "Free / From $16 per month"
    },
    {
      name: "Codeflow",
      description: "Intuitive AI coding assistant that helps maintain your coding rhythm with smart completions and refactoring.",
      categories: ["coding", "vibe-coding"],
      url: "https://getcodeflow.dev",
      pricing: "Free / Pro plans available"
    },
    
    // Design & UX
    {
      name: "Uizard",
      description: "AI design tool for quickly creating app and website mockups.",
      categories: ["design"],
      url: "https://uizard.io",
      pricing: "Free / From $12 per month"
    },
    {
      name: "Galileo AI",
      description: "AI UI/UX design generator for creating interface designs from text.",
      categories: ["design"],
      url: "https://www.usegalileo.ai",
      pricing: "Contact for pricing"
    },
    {
      name: "Designs.ai",
      description: "AI design platform for creating logos, videos, and marketing materials.",
      categories: ["design", "business"],
      url: "https://designs.ai",
      pricing: "From $29 per month"
    },
    {
      name: "Framer",
      description: "Website builder with AI features for design and content generation.",
      categories: ["design"],
      url: "https://www.framer.com",
      pricing: "Free / From $5 per month"
    },
    
    // Legal & Compliance
    {
      name: "Spellbook",
      description: "AI contract drafting and review tool for legal professionals.",
      categories: ["legal"],
      url: "https://www.spellbook.legal",
      pricing: "Contact for pricing"
    },
    {
      name: "CaseText",
      description: "Legal research platform with AI for case analysis and document review.",
      categories: ["legal", "research"],
      url: "https://casetext.com",
      pricing: "Contact for pricing"
    },
    {
      name: "Harvey",
      description: "AI for legal professionals to draft, review, and analyze documents.",
      categories: ["legal"],
      url: "https://harvey.ai",
      pricing: "Contact for pricing"
    },
    
    // Education & Learning
    {
      name: "Duolingo Max",
      description: "AI-enhanced language learning platform with conversation practice.",
      categories: ["education"],
      url: "https://www.duolingo.com",
      pricing: "Free / From $6.99 per month"
    },
    {
      name: "Khan Academy Khanmigo",
      description: "AI tutor for students integrated with Khan Academy's learning platform.",
      categories: ["education"],
      url: "https://www.khanacademy.org/khanmigo",
      pricing: "Contact for pricing"
    },
    
    // Integration & Automation
    {
      name: "Make.com",
      description: "Visual automation platform for connecting apps and automating workflows.",
      categories: ["integration", "productivity"],
      url: "https://www.make.com",
      pricing: "Free / From $9 per month"
    },
    {
      name: "n8n",
      description: "Workflow automation tool with a focus on privacy and self-hosting.",
      categories: ["integration", "productivity"],
      url: "https://n8n.io",
      pricing: "Free (open-source) / Paid plans available"
    },
    
    // No-Code AI Development
    {
      name: "Teachable Machine",
      description: "Train machine learning models without code using Google's platform.",
      categories: ["nocode"],
      url: "https://teachablemachine.withgoogle.com",
      pricing: "Free"
    },
    {
      name: "Roboflow",
      description: "Computer vision model platform for training and deploying AI models.",
      categories: ["nocode", "data"],
      url: "https://roboflow.com",
      pricing: "Free / Paid plans available"
    },
    {
      name: "RunwayML",
      description: "Creative tools powered by machine learning for content creation.",
      categories: ["nocode", "video", "image"],
      url: "https://runwayml.com",
      pricing: "Free / From $12 per month"
    }
  ];
  
  // Filter tools based on selected category
  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.categories.includes(selectedCategory));

  return (
    <Layout>
      <Head>
        <title>Best AI Tools for {currentYear} | Ultimate Guide | PromptWritingStudio</title>
        <meta 
          name="description" 
          content={`Discover the best AI tools for ${currentYear}. A comprehensive, regularly updated collection of powerful AI tools for productivity, creativity, coding, and more.`}
        />
        <meta 
          name="keywords" 
          content="AI tools, artificial intelligence tools, best AI tools, AI software, productivity tools, AI writing tools, AI image generation, AI coding tools, vibe coding"
        />
        <meta property="og:title" content={`Best AI Tools for ${currentYear} | Ultimate Guide`} />
        <meta 
          property="og:description" 
          content={`Discover the best AI tools for ${currentYear}. A comprehensive, regularly updated collection of powerful AI tools for productivity, creativity, coding, and more.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://promptwritingstudio.com/best-ai-tools" />
        <link rel="canonical" href="https://promptwritingstudio.com/best-ai-tools" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best AI Tools for {currentYear}
            </h1>
            <p className="text-xl mb-8">
              A comprehensive, regularly updated collection of the most powerful AI tools to enhance your productivity, creativity, and workflow.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#1A1A1A]">Find the Perfect AI Tools for Your Needs</h2>
            
            {/* Category Filter */}
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4 text-[#1A1A1A]">Filter by Category:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#FFDE59] text-[#1A1A1A]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{tool.name}</h3>
                  <p className="text-gray-700 mb-4">{tool.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tool.categories.map(cat => (
                      <span 
                        key={cat} 
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                        onClick={() => setSelectedCategory(cat)}
                        style={{cursor: 'pointer'}}
                      >
                        {categories.find(c => c.id === cat)?.name || cat}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{tool.pricing}</span>
                    <a 
                      href={tool.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-1 rounded font-medium hover:bg-[#E5C84F] transition text-sm"
                    >
                      Try
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {/* No Results Message */}
            {filteredTools.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-700">No tools found for this category. Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1A1A]">Want to Master AI Prompts?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Learn how to get the most out of these AI tools with our expert-crafted prompt templates and training.
            </p>
            <a 
              href="/#pricing" 
              className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition inline-block"
            >
              Explore Our Courses
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
