import React, { useState } from 'react';

const ContentSpeedCalculator = () => {
  const [inputs, setInputs] = useState({
    currentWordsPerHour: 300,
    contentType: 'blog-posts',
    weeklyPieces: 5,
    averageWordCount: 1000,
    hourlyRate: 50
  });
  
  const [results, setResults] = useState(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const contentTypes = {
    'blog-posts': { name: 'Blog Posts', aiSpeedMultiplier: 4.5, avgWords: 1000 },
    'social-media': { name: 'Social Media Posts', aiSpeedMultiplier: 6, avgWords: 150 },
    'email-campaigns': { name: 'Email Campaigns', aiSpeedMultiplier: 5, avgWords: 500 },
    'product-descriptions': { name: 'Product Descriptions', aiSpeedMultiplier: 8, avgWords: 200 },
    'ad-copy': { name: 'Ad Copy', aiSpeedMultiplier: 7, avgWords: 100 },
    'reports': { name: 'Reports & Documents', aiSpeedMultiplier: 3.5, avgWords: 2000 }
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateSavings = () => {
    const contentType = contentTypes[inputs.contentType];
    const wordsPerPiece = inputs.averageWordCount || contentType.avgWords;
    
    // Current process calculations
    const hoursPerPiece = wordsPerPiece / inputs.currentWordsPerHour;
    const weeklyHours = hoursPerPiece * inputs.weeklyPieces;
    const monthlyHours = weeklyHours * 4.33;
    const yearlyHours = monthlyHours * 12;
    
    // AI-enhanced process calculations
    const aiWordsPerHour = inputs.currentWordsPerHour * contentType.aiSpeedMultiplier;
    const aiHoursPerPiece = wordsPerPiece / aiWordsPerHour;
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
    const productivityIncrease = ((contentType.aiSpeedMultiplier - 1) * 100);
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
        speedIncrease: contentType.aiSpeedMultiplier.toFixed(1),
        percentIncrease: productivityIncrease.toFixed(0),
        extraPiecesPerWeek: extraPiecesPerWeek.toFixed(1)
      }
    });
    
    setShowEmailCapture(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    // Here you would integrate with your email service
    console.log('Email submitted:', email);
    alert('Thanks! Check your email for the "Content Creation Automation Guide"');
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
            Discover how much time and money you could save with AI-powered content creation
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
            </div>
          )}
        </div>

        {/* Email Capture Modal */}
        {showEmailCapture && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get Your Free Content Creation Automation Guide
              </h3>
              <p className="text-gray-600 mb-6">
                Learn the exact AI prompts and workflows that can 4-8x your content creation speed.
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