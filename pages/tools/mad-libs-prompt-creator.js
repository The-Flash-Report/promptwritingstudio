import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Head from 'next/head'

// Mad Libs template data
const promptTemplates = [
  {
    id: 'business-email',
    title: 'Professional Email Generator',
    category: 'Business Communication',
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
    title: 'Viral Content Creator',
    category: 'Social Media',
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
  }
];

export default function MadLibsPromptCreator() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [sharedCount, setSharedCount] = useState(0);

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
    
    // Replace placeholders with form data
    selectedTemplate.fields.forEach(field => {
      const value = formData[field.id] || `[${field.label.toUpperCase()}]`;
      prompt = prompt.replace(`{${field.id}}`, value);
    });

    setGeneratedPrompt(prompt);
    setShowResult(true);
  };

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

  const isFormComplete = selectedTemplate && selectedTemplate.fields.every(field => 
    formData[field.id] && formData[field.id].trim() !== ''
  );

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
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {promptTemplates.map(template => (
                <div
                  key={template.id}
                  className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer transition-all ${
                    selectedTemplate?.id === template.id ? 'ring-2 ring-purple-600 transform scale-105' : 'hover:shadow-xl'
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="text-2xl mb-3">{template.category === 'Business Communication' ? '📧' : template.category === 'Social Media' ? '📱' : '💰'}</div>
                  <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <div className="text-sm text-purple-600 font-semibold">
                    {template.fields.length} fields to customize
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

                <button
                  onClick={generatePrompt}
                  disabled={!isFormComplete}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                    isFormComplete
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isFormComplete ? 'Generate My Custom Prompt' : 'Fill in all fields to continue'}
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
              href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Upgrade to PromptWritingStudio Pro
            </a>
          </div>
        </section>
      </Layout>
    </>
  )
} 