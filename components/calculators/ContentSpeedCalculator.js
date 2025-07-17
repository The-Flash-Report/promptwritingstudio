import React, { useState } from 'react';
import AICalculatorExplainer from '../ai/AICalculatorExplainer';

const ContentSpeedCalculator = () => {
  const [inputs, setInputs] = useState({
    currentWordsPerHour: 300,
    contentType: 'blog-posts',
    weeklyPieces: 5,
    averageWordCount: 1000,
    hourlyRate: 50,
    skillLevel: 'intermediate'
  });
  
  const [results, setResults] = useState(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const contentTypes = {
    'blog-posts': { name: 'Blog Posts', aiSpeedMultiplier: 4.5, avgWords: 1000, editingMultiplier: 1.3 },
    'social-media': { name: 'Social Media Posts', aiSpeedMultiplier: 6, avgWords: 150, editingMultiplier: 1.1 },
    'email-campaigns': { name: 'Email Campaigns', aiSpeedMultiplier: 5, avgWords: 500, editingMultiplier: 1.2 },
    'newsletters': { name: 'Email Newsletters', aiSpeedMultiplier: 5.5, avgWords: 800, editingMultiplier: 1.25 },
    'product-descriptions': { name: 'Product Descriptions', aiSpeedMultiplier: 8, avgWords: 200, editingMultiplier: 1.15 },
    'ad-copy': { name: 'Ad Copy', aiSpeedMultiplier: 7, avgWords: 100, editingMultiplier: 1.25 },
    'landing-pages': { name: 'Landing Page Copy', aiSpeedMultiplier: 5.8, avgWords: 600, editingMultiplier: 1.3 },
    'case-studies': { name: 'Case Studies', aiSpeedMultiplier: 4, avgWords: 1500, editingMultiplier: 1.35 },
    'video-scripts': { name: 'Video Scripts', aiSpeedMultiplier: 6.5, avgWords: 300, editingMultiplier: 1.2 },
    'whitepapers': { name: 'Whitepapers/eBooks', aiSpeedMultiplier: 3.8, avgWords: 3000, editingMultiplier: 1.4 },
    'reports': { name: 'Reports & Documents', aiSpeedMultiplier: 3.5, avgWords: 2000, editingMultiplier: 1.4 }
  };

  const skillLevels = {
    'beginner': { 
      name: 'Beginner (0-3 months)', 
      multiplier: 0.6, 
      description: 'New to AI content creation, still learning prompts and workflows' 
    },
    'intermediate': { 
      name: 'Intermediate (3-12 months)', 
      multiplier: 0.8, 
      description: 'Some AI experience, familiar with basic prompting techniques' 
    },
    'advanced': { 
      name: 'Advanced (12+ months)', 
      multiplier: 1.0, 
      description: 'Experienced with AI workflows, custom prompts, and training data' 
    }
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateSavings = () => {
    const contentType = contentTypes[inputs.contentType];
    const skillLevel = skillLevels[inputs.skillLevel];
    const wordsPerPiece = inputs.averageWordCount || contentType.avgWords;
    
    // Current process calculations
    const hoursPerPiece = wordsPerPiece / inputs.currentWordsPerHour;
    const weeklyHours = hoursPerPiece * inputs.weeklyPieces;
    const monthlyHours = weeklyHours * 4.33;
    const yearlyHours = monthlyHours * 12;
    
    // AI-enhanced process calculations (including editing time and skill level)
    const baseAiSpeedMultiplier = contentType.aiSpeedMultiplier * skillLevel.multiplier;
    const aiWordsPerHour = inputs.currentWordsPerHour * baseAiSpeedMultiplier;
    const aiHoursPerPieceRaw = wordsPerPiece / aiWordsPerHour;
    const aiHoursPerPiece = aiHoursPerPieceRaw * contentType.editingMultiplier; // Factor in editing time
    const aiWeeklyHours = aiHoursPerPiece * inputs.weeklyPieces;
    const aiMonthlyHours = aiWeeklyHours * 4.33;
    const aiYearlyHours = aiMonthlyHours * 12;
    
    // Time savings
    const weeklyTimeSaved = weeklyHours - aiWeeklyHours;
    const monthlyTimeSaved = monthlyHours - aiMonthlyHours;
    const yearlyTimeSaved = yearlyHours - aiYearlyHours;
    
    // Financial savings
    const monthlyDollarSaved = monthlyTimeSaved * inputs.hourlyRate;
    const yearlyDollarSaved = yearlyTimeSaved * inputs.hourlyRate;
    
    // Productivity metrics
    const productivityIncrease = ((baseAiSpeedMultiplier - 1) * 100);
    const extraPiecesPerWeek = weeklyTimeSaved / aiHoursPerPiece;
    
    setResults({
      current: {
        hoursPerPiece: hoursPerPiece.toFixed(1),
        weeklyHours: weeklyHours.toFixed(1),
        monthlyHours: monthlyHours.toFixed(0),
        yearlyHours: yearlyHours.toFixed(0)
      },
      withAI: {
        hoursPerPiece: aiHoursPerPiece.toFixed(1),
        weeklyHours: aiWeeklyHours.toFixed(1),
        monthlyHours: aiMonthlyHours.toFixed(0),
        yearlyHours: aiYearlyHours.toFixed(0),
        wordsPerHour: aiWordsPerHour.toFixed(0)
      },
      savings: {
        weeklyHours: weeklyTimeSaved.toFixed(1),
        monthlyHours: monthlyTimeSaved.toFixed(0),
        yearlyHours: yearlyTimeSaved.toFixed(0),
        monthlyDollars: monthlyDollarSaved.toFixed(0),
        yearlyDollars: yearlyDollarSaved.toFixed(0)
      },
      productivity: {
        speedIncrease: baseAiSpeedMultiplier.toFixed(1),
        percentIncrease: productivityIncrease.toFixed(0),
        extraPiecesPerWeek: extraPiecesPerWeek.toFixed(1)
      },
      skillLevel: {
        name: skillLevel.name,
        description: skillLevel.description,
        multiplier: skillLevel.multiplier
      }
    });
    
    setShowEmailCapture(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    // Here you would integrate with your email service
    console.log('Email submitted:', email);
    alert('Thanks! Check your email for the "AI Creative Partner Setup Guide"');
    setShowEmailCapture(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Content Creation Speed Calculator
          </h2>
          <p className="text-lg text-gray-600">
            Get realistic time savings estimates based on your AI experience level. Includes editing time and skill-adjusted calculations for accurate results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Current Process</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={inputs.contentType}
                onChange={(e) => handleInputChange('contentType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(contentTypes).map(([key, type]) => (
                  <option key={key} value={key}>{type.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your AI Experience Level
              </label>
              <select
                value={inputs.skillLevel}
                onChange={(e) => handleInputChange('skillLevel', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(skillLevels).map(([key, level]) => (
                  <option key={key} value={key}>{level.name}</option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                {skillLevels[inputs.skillLevel].description}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Writing Speed (words per hour)
              </label>
              <input
                type="number"
                value={inputs.currentWordsPerHour}
                onChange={(e) => handleInputChange('currentWordsPerHour', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="50"
                max="1000"
              />
              <p className="text-sm text-gray-500 mt-1">Average: 250-400 words/hour</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pieces Created Per Week
              </label>
              <input
                type="number"
                value={inputs.weeklyPieces}
                onChange={(e) => handleInputChange('weeklyPieces', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Average Word Count Per Piece
              </label>
              <input
                type="number"
                value={inputs.averageWordCount}
                onChange={(e) => handleInputChange('averageWordCount', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="50"
                max="5000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Default: {contentTypes[inputs.contentType].avgWords} words
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Hourly Rate ($)
              </label>
              <input
                type="number"
                value={inputs.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="10"
                max="500"
              />
            </div>

            <button
              onClick={calculateSavings}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Calculate My Time Savings
            </button>
          </div>

          {/* Results Section */}
          {results && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Potential Savings</h3>
              
              {/* Speed Comparison */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Productivity Increase</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Speed:</span>
                    <span className="font-semibold">{inputs.currentWordsPerHour} words/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>With AI:</span>
                    <span className="font-semibold text-green-600">{results.withAI.wordsPerHour} words/hour</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Speed Increase:</span>
                    <span className="font-bold text-green-600">{results.productivity.speedIncrease}x faster</span>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 mb-2">
                    <span className="font-medium">✓ Includes editing time:</span> Calculations factor in {Math.round((contentTypes[inputs.contentType].editingMultiplier - 1) * 100)}% additional time for editing and fact-checking AI content.
                  </p>
                  <p className="text-sm text-blue-700 mb-2">
                    <span className="font-medium">🎯 Skill level adjustment:</span> Results adjusted for {results.skillLevel.name.toLowerCase()} ({Math.round(results.skillLevel.multiplier * 100)}% of expert level).
                  </p>
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">💡 Based on Prompt Writing Studio method:</span> Using experience-first prompting with your own content as training data.
                  </p>
                </div>
              </div>

              {/* Time Savings */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Time Savings</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{results.savings.weeklyHours}</div>
                    <div className="text-sm text-gray-600">Hours/Week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{results.savings.monthlyHours}</div>
                    <div className="text-sm text-gray-600">Hours/Month</div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <div className="text-3xl font-bold text-blue-600">{results.savings.yearlyHours}</div>
                  <div className="text-sm text-gray-600">Hours Saved Per Year</div>
                </div>
              </div>

              {/* Financial Impact */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Financial Impact</h4>
                <div className="text-center space-y-2">
                  <div>
                    <div className="text-2xl font-bold text-green-600">${results.savings.monthlyDollars}</div>
                    <div className="text-sm text-gray-600">Saved Per Month</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">${results.savings.yearlyDollars}</div>
                    <div className="text-sm text-gray-600">Saved Per Year</div>
                  </div>
                </div>
              </div>

              {/* Extra Capacity */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Extra Capacity</h4>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">+{results.productivity.extraPiecesPerWeek}</div>
                  <div className="text-sm text-gray-600">Extra {contentTypes[inputs.contentType].name.toLowerCase()} per week</div>
                </div>
              </div>

              {/* Skill Level Growth Opportunity */}
              {(inputs.skillLevel === 'beginner' || inputs.skillLevel === 'intermediate') && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-3">🚀 Growth Opportunity</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    {inputs.skillLevel === 'beginner' ? 
                      'As a beginner, you have huge potential for improvement! Advanced users see ' + 
                      Math.round(((1.0 / skillLevels[inputs.skillLevel].multiplier) - 1) * 100) + '% better results.' :
                      'You\'re making good progress! Advanced users achieve ' + 
                      Math.round(((1.0 / skillLevels[inputs.skillLevel].multiplier) - 1) * 100) + '% better time savings.'
                    }
                  </p>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      Potential: {Math.round(results.savings.monthlyHours / skillLevels[inputs.skillLevel].multiplier)} hours/month
                    </div>
                    <div className="text-sm text-gray-600">with advanced skills</div>
                  </div>
                </div>
              )}

              {/* AI-Powered Explanation */}
              <AICalculatorExplainer 
                calculatorType="content-speed"
                results={results}
                inputs={inputs}
                onExplanationGenerated={(explanation) => {
                  // Track AI explanation generation for analytics
                  console.log('AI explanation generated for content speed calculator')
                }}
              />

              {/* Prompt Vault CTA */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">💡 Ready to Accelerate These Savings?</h4>
                  <p className="text-gray-700 mb-4">
                    Get 50 business-ready prompt templates that transform your AI tools into content creation powerhouses. 
                    These proven prompts can help you achieve the {results.productivity.speedIncrease}x speed increase starting today.
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg mb-4 border border-yellow-300">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <span className="text-lg text-gray-500 line-through">$19</span>
                      <span className="text-2xl font-bold text-orange-600">$7</span>
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm font-medium">Launch Special</span>
                    </div>
                    <p className="text-sm text-gray-600">📧 Instant email delivery • 💯 30-day money-back guarantee</p>
                  </div>
                  
                  <a 
                    href="/prompt-vault" 
                    className="inline-block bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors duration-200"
                  >
                    Get The Prompt Vault - $7
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Email Capture Modal */}
        {showEmailCapture && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get Your Free "AI Creative Partner" Setup Guide
              </h3>
              <p className="text-gray-600 mb-6">
                Learn the experience-first prompting method and 3-Question Test framework that transforms AI from a generic tool into your personal creative partner.
              </p>
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Get Free Guide
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmailCapture(false)}
                    className="px-4 py-3 text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentSpeedCalculator; 