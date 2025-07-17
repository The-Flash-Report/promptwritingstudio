import { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { 
  writingPromptCategories,
  writingPromptTemplates,
  generateRandomPrompt,
  generateCombinationPrompt,
  writingChallenges
} from '../../data/creative-writing-prompts'

export default function CreativeWritingPrompts() {
  const [selectedCategory, setSelectedCategory] = useState('fiction');
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [customElements, setCustomElements] = useState({
    genre: '',
    character: '',
    setting: '',
    conflict: '',
    theme: ''
  });
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [randomPrompt, setRandomPrompt] = useState('');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [activeTab, setActiveTab] = useState('category'); // 'category', 'custom', 'random', 'challenge'

  // Generate initial random prompt
  useEffect(() => {
    setRandomPrompt(generateRandomPrompt());
  }, []);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedTemplate(0);
    setGeneratedPrompt('');
  };

  // Handle template selection
  const handleTemplateSelection = (templateIndex) => {
    setSelectedTemplate(templateIndex);
    setGeneratedPrompt('');
  };

  // Generate prompt from category template
  const handleGenerateFromCategory = () => {
    const categoryTemplates = writingPromptTemplates[selectedCategory];
    if (categoryTemplates && categoryTemplates[selectedTemplate]) {
      const prompts = categoryTemplates[selectedTemplate].prompts;
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      setGeneratedPrompt(randomPrompt);
    }
  };

  // Generate custom combination prompt
  const handleGenerateCustom = () => {
    const prompt = generateCombinationPrompt(customElements);
    setGeneratedPrompt(prompt);
  };

  // Generate new random prompt
  const handleNewRandomPrompt = () => {
    const newPrompt = generateRandomPrompt();
    setRandomPrompt(newPrompt);
    setGeneratedPrompt(newPrompt);
  };

  // Handle custom element changes
  const handleCustomElementChange = (element, value) => {
    setCustomElements(prev => ({
      ...prev,
      [element]: value
    }));
  };

  // Copy prompt to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 2000);
  };

  // Get current template prompts
  const getCurrentPrompts = () => {
    const categoryTemplates = writingPromptTemplates[selectedCategory];
    if (categoryTemplates && categoryTemplates[selectedTemplate]) {
      return categoryTemplates[selectedTemplate].prompts;
    }
    return [];
  };

  return (
    <Layout
      title="Creative Writing Prompt Generator | Free Writing Prompts for Authors & Writers"
      description="Generate unlimited creative writing prompts for fiction, poetry, characters, and more. Free tool for writers with 500+ unique prompts across all genres and writing styles."
    >
      {/* Hero Section */}
      <section className="gradient-bg text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Creative Writing Prompt Generator
            </h1>
            <p className="text-xl mb-8">
              Spark your creativity with unlimited writing prompts for fiction, poetry, character development, and more. Perfect for overcoming writer's block and exploring new ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#generator"
                className="bg-white text-[#1A1A1A] px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors duration-200"
              >
                Start Generating Prompts
              </a>
              <Link
                href="/ai-prompt-generator"
                className="bg-opacity-20 bg-white hover:bg-opacity-30 px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                View AI Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Random Prompt */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h2 className="text-lg font-semibold mb-4">⚡ Quick Writing Prompt</h2>
              <p className="text-gray-700 mb-4 text-lg leading-relaxed">{randomPrompt}</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleNewRandomPrompt}
                  className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-medium hover:bg-[#E5C84F] transition-colors duration-200"
                >
                  New Random Prompt
                </button>
                <button
                  onClick={() => copyToClipboard(randomPrompt)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
                >
                  {copiedToClipboard ? 'Copied!' : 'Copy Prompt'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Perfect for Writers of All Levels</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-[#FFDE59] rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Break Writer's Block</h3>
                <p className="text-gray-700">
                  Get unstuck with fresh, inspiring prompts designed to jumpstart your creativity and get words flowing again.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-[#FFDE59] rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Practice Specific Skills</h3>
                <p className="text-gray-700">
                  Target specific writing skills like dialogue, character development, setting creation, and narrative voice.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-[#FFDE59] rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Explore New Genres</h3>
                <p className="text-gray-700">
                  Step outside your comfort zone with prompts spanning fiction, poetry, memoir, and experimental writing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Generator Section */}
      <section id="generator" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Generate Your Writing Prompts
            </h2>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 justify-center" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab('category')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'category'
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    By Category
                  </button>
                  <button
                    onClick={() => setActiveTab('custom')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'custom'
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Custom Builder
                  </button>
                  <button
                    onClick={() => setActiveTab('random')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'random'
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Random Prompts
                  </button>
                  <button
                    onClick={() => setActiveTab('challenge')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'challenge'
                        ? 'border-yellow-500 text-yellow-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Challenges
                  </button>
                </nav>
              </div>
            </div>

            {/* Category Generator */}
            {activeTab === 'category' && (
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Panel - Controls */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Choose Your Writing Focus</h3>
                    
                    {/* Category Selection */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-3">Writing Category</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(writingPromptCategories).map(([key, category]) => (
                          <button
                            key={key}
                            onClick={() => handleCategoryChange(key)}
                            className={`p-4 rounded-lg text-left transition-colors duration-200 ${
                              selectedCategory === key
                                ? 'bg-[#1A1A1A] text-white'
                                : 'bg-white hover:bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="text-2xl mr-3">{category.icon}</span>
                              <div>
                                <div className="font-medium">{category.name}</div>
                                <div className="text-sm opacity-75">{category.description}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Template Selection */}
                    {selectedCategory && writingPromptTemplates[selectedCategory] && (
                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-3">Prompt Type</label>
                        <div className="space-y-2">
                          {writingPromptTemplates[selectedCategory].map((template, index) => (
                            <button
                              key={index}
                              onClick={() => handleTemplateSelection(index)}
                              className={`w-full p-3 rounded-lg text-left transition-colors duration-200 ${
                                selectedTemplate === index
                                  ? 'bg-[#FFDE59] text-[#1A1A1A]'
                                  : 'bg-white hover:bg-gray-100'
                              }`}
                            >
                              <div className="font-medium">{template.title}</div>
                              <div className="text-sm opacity-75">{template.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleGenerateFromCategory}
                      disabled={!selectedCategory}
                      className="w-full bg-[#1A1A1A] text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Generate Writing Prompt
                    </button>
                  </div>

                  {/* Right Panel - Output */}
                  <div>
                    <h3 className="text-xl font-semibold mb-6">Your Writing Prompt</h3>
                    
                    {generatedPrompt ? (
                      <div className="bg-white rounded-lg p-6 mb-4">
                        <p className="text-gray-800 text-lg leading-relaxed mb-4">{generatedPrompt}</p>
                        <button
                          onClick={() => copyToClipboard(generatedPrompt)}
                          className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-medium hover:bg-[#E5C84F] transition-colors duration-200"
                        >
                          {copiedToClipboard ? 'Copied!' : 'Copy Prompt'}
                        </button>
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg p-6 text-center text-gray-500">
                        <div className="text-4xl mb-4">✍️</div>
                        <p>Select a category and click "Generate" to get your writing prompt!</p>
                      </div>
                    )}

                    {/* Show available prompts preview */}
                    {selectedCategory && writingPromptTemplates[selectedCategory] && (
                      <div className="bg-white rounded-lg p-6">
                        <h4 className="font-semibold mb-3">Preview Prompts ({getCurrentPrompts().length} available)</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {getCurrentPrompts().slice(0, 3).map((prompt, index) => (
                            <p key={index} className="text-sm text-gray-600 border-l-2 border-gray-200 pl-3">
                              {prompt.substring(0, 100)}...
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Custom Builder */}
            {activeTab === 'custom' && (
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold mb-6 text-center">Build a Custom Writing Prompt</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Genre</label>
                      <input
                        type="text"
                        placeholder="e.g., mystery, romance, sci-fi, literary fiction"
                        value={customElements.genre}
                        onChange={(e) => handleCustomElementChange('genre', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Character</label>
                      <input
                        type="text"
                        placeholder="e.g., a retired detective, a time-traveling artist"
                        value={customElements.character}
                        onChange={(e) => handleCustomElementChange('character', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Setting</label>
                      <input
                        type="text"
                        placeholder="e.g., a 24-hour diner, Mars colony, Victorian London"
                        value={customElements.setting}
                        onChange={(e) => handleCustomElementChange('setting', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Conflict</label>
                      <input
                        type="text"
                        placeholder="e.g., must solve a crime before midnight, falling in love with a rival"
                        value={customElements.conflict}
                        onChange={(e) => handleCustomElementChange('conflict', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Theme</label>
                      <input
                        type="text"
                        placeholder="e.g., redemption, identity, the cost of progress"
                        value={customElements.theme}
                        onChange={(e) => handleCustomElementChange('theme', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFDE59]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateCustom}
                    className="w-full bg-[#1A1A1A] text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 mb-6"
                  >
                    Build My Custom Prompt
                  </button>

                  {generatedPrompt && (
                    <div className="bg-white rounded-lg p-6">
                      <h4 className="font-semibold mb-3">Your Custom Writing Prompt:</h4>
                      <p className="text-gray-800 text-lg leading-relaxed mb-4">{generatedPrompt}</p>
                      <button
                        onClick={() => copyToClipboard(generatedPrompt)}
                        className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-medium hover:bg-[#E5C84F] transition-colors duration-200"
                      >
                        {copiedToClipboard ? 'Copied!' : 'Copy Prompt'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Random Prompts */}
            {activeTab === 'random' && (
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="max-w-2xl mx-auto text-center">
                  <h3 className="text-xl font-semibold mb-6">Random Writing Prompts</h3>
                  <p className="text-gray-600 mb-8">
                    Get completely random prompts from all categories. Perfect for spontaneous writing sessions!
                  </p>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => {
                        const prompt = generateRandomPrompt();
                        setGeneratedPrompt(prompt);
                      }}
                      className="bg-[#1A1A1A] text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                      Generate Random Prompt
                    </button>
                    
                    {generatedPrompt && (
                      <div className="bg-white rounded-lg p-6 text-left">
                        <p className="text-gray-800 text-lg leading-relaxed mb-4">{generatedPrompt}</p>
                        <button
                          onClick={() => copyToClipboard(generatedPrompt)}
                          className="bg-[#FFDE59] text-[#1A1A1A] px-4 py-2 rounded-lg font-medium hover:bg-[#E5C84F] transition-colors duration-200"
                        >
                          {copiedToClipboard ? 'Copied!' : 'Copy Prompt'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Writing Challenges */}
            {activeTab === 'challenge' && (
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-xl font-semibold mb-6 text-center">Writing Challenges</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Daily Challenges */}
                    <div className="bg-white rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">📅</span>
                        <h4 className="text-lg font-semibold">Daily Challenges</h4>
                      </div>
                      <p className="text-gray-600 mb-4">Quick daily writing exercises to build consistency.</p>
                      <div className="space-y-3">
                        {writingChallenges.daily.map((challenge, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Weekly Challenges */}
                    <div className="bg-white rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">📆</span>
                        <h4 className="text-lg font-semibold">Weekly Challenges</h4>
                      </div>
                      <p className="text-gray-600 mb-4">Deeper projects to develop your skills over a week.</p>
                      <div className="space-y-3">
                        {writingChallenges.weekly.map((challenge, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Monthly Challenges */}
                    <div className="bg-white rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">🗓️</span>
                        <h4 className="text-lg font-semibold">Monthly Challenges</h4>
                      </div>
                      <p className="text-gray-600 mb-4">Ambitious long-term projects for serious growth.</p>
                      <div className="space-y-3">
                        {writingChallenges.monthly.map((challenge, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{challenge}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Use Writing Prompts Effectively</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">💡 For Beginners</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2">•</span>
                    <span>Start with a simple fiction prompt and write for 10-15 minutes without stopping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2">•</span>
                    <span>Don't worry about perfect grammar or structure - focus on getting ideas down</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2">•</span>
                    <span>Try different categories to discover what you enjoy writing most</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2">•</span>
                    <span>Use character prompts to practice creating distinct voices</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">🚀 For Advanced Writers</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2">•</span>
                    <span>Combine multiple prompts to create complex, layered stories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2">•</span>
                    <span>Use prompts to practice specific techniques you want to improve</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2">•</span>
                    <span>Challenge yourself with constraint-based exercises to push creativity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#FFDE59] mr-2">•</span>
                    <span>Adapt prompts to fit ongoing projects or world-building exercises</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Take Your Writing Further?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Join PromptWritingStudio for advanced writing courses, personalized feedback, and access to our complete library of 500+ professional writing prompts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746" 
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join PromptWritingStudio From $25/month
              </a>
              <Link
                href="/ai-prompt-generator"
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
              >
                Explore More Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 