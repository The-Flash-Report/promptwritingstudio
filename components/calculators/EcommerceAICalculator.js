import React, { useState } from 'react';

const EcommerceAICalculator = () => {
  const [inputs, setInputs] = useState({
    productCount: 100,
    newProductsPerMonth: 20,
    descriptionWordsPerProduct: 150,
    currentWritingSpeed: 200, // words per hour
    weeklyTickets: 50,
    avgResponseTime: 30, // minutes
    ticketResolutionTime: 15, // minutes
    customerServiceHourlyRate: 25,
    contentCreatorHourlyRate: 40,
    marketingEmailsPerMonth: 8,
    socialPostsPerWeek: 10,
    adCopiesPerMonth: 15,
    platformType: 'shopify'
  });
  
  const [results, setResults] = useState(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);

  const platformTypes = {
    'shopify': { name: 'Shopify', aiIntegration: 'Excellent', automationBonus: 1.2 },
    'woocommerce': { name: 'WooCommerce', aiIntegration: 'Good', automationBonus: 1.1 },
    'amazon': { name: 'Amazon Seller', aiIntegration: 'Good', automationBonus: 1.0 },
    'magento': { name: 'Magento', aiIntegration: 'Moderate', automationBonus: 0.95 },
    'bigcommerce': { name: 'BigCommerce', aiIntegration: 'Good', automationBonus: 1.1 },
    'custom': { name: 'Custom Platform', aiIntegration: 'Variable', automationBonus: 1.0 }
  };

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateSavings = () => {
    const platform = platformTypes[inputs.platformType];
    
    // Product Description Automation
    const hoursPerDescription = (inputs.descriptionWordsPerProduct / inputs.currentWritingSpeed);
    const monthlyDescriptionHours = inputs.newProductsPerMonth * hoursPerDescription;
    const monthlyDescriptionCost = monthlyDescriptionHours * inputs.contentCreatorHourlyRate;
    
    // AI can write descriptions 6x faster
    const aiDescriptionHours = monthlyDescriptionHours / 6;
    const aiDescriptionCost = aiDescriptionHours * inputs.contentCreatorHourlyRate;
    const descriptionSavings = monthlyDescriptionCost - aiDescriptionCost;
    
    // Customer Service Automation
    const monthlyTickets = inputs.weeklyTickets * 4.33;
    const avgTicketTimeHours = (inputs.avgResponseTime + inputs.ticketResolutionTime) / 60;
    const monthlyServiceHours = monthlyTickets * avgTicketTimeHours;
    const monthlyServiceCost = monthlyServiceHours * inputs.customerServiceHourlyRate;
    
    // AI can handle 70% of tickets automatically, reduce time by 60% for complex ones
    const automatedTickets = monthlyTickets * 0.7;
    const complexTickets = monthlyTickets * 0.3;
    const aiServiceHours = (complexTickets * avgTicketTimeHours * 0.4); // 60% time reduction
    const aiServiceCost = aiServiceHours * inputs.customerServiceHourlyRate;
    const serviceSavings = monthlyServiceCost - aiServiceCost;
    
    // Marketing Content Automation
    const emailHours = inputs.marketingEmailsPerMonth * 1.5; // 1.5 hours per email
    const socialHours = inputs.socialPostsPerWeek * 4.33 * 0.5; // 30 min per post
    const adHours = inputs.adCopiesPerMonth * 1; // 1 hour per ad set
    const totalMarketingHours = emailHours + socialHours + adHours;
    const monthlyMarketingCost = totalMarketingHours * inputs.contentCreatorHourlyRate;
    
    // AI reduces marketing content time by 75%
    const aiMarketingHours = totalMarketingHours * 0.25;
    const aiMarketingCost = aiMarketingHours * inputs.contentCreatorHourlyRate;
    const marketingSavings = monthlyMarketingCost - aiMarketingCost;
    
    // Platform-specific bonus
    const platformBonus = platform.automationBonus;
    const totalMonthlySavings = (descriptionSavings + serviceSavings + marketingSavings) * platformBonus;
    const yearlyTotalSavings = totalMonthlySavings * 12;
    
    // Additional metrics
    const totalCurrentHours = monthlyDescriptionHours + monthlyServiceHours + totalMarketingHours;
    const totalAIHours = aiDescriptionHours + aiServiceHours + aiMarketingHours;
    const timeSavingsHours = totalCurrentHours - totalAIHours;
    const timeSavingsPercentage = ((timeSavingsHours / totalCurrentHours) * 100);
    
    // Revenue impact estimates
    const fasterTimeToMarket = inputs.newProductsPerMonth * 2; // 2 days faster per product
    const improvedCustomerSat = monthlyTickets * 0.15; // 15% improvement
    const moreContentVolume = timeSavingsHours / 2; // Extra content pieces possible
    
    setResults({
      productDescriptions: {
        currentMonthlyCost: monthlyDescriptionCost.toFixed(0),
        aiMonthlyCost: aiDescriptionCost.toFixed(0),
        monthlySavings: descriptionSavings.toFixed(0),
        timeReduction: '83%',
        currentHours: monthlyDescriptionHours.toFixed(1),
        aiHours: aiDescriptionHours.toFixed(1)
      },
      customerService: {
        currentMonthlyCost: monthlyServiceCost.toFixed(0),
        aiMonthlyCost: aiServiceCost.toFixed(0),
        monthlySavings: serviceSavings.toFixed(0),
        automationRate: '70%',
        timeReduction: '60%',
        currentHours: monthlyServiceHours.toFixed(1),
        aiHours: aiServiceHours.toFixed(1)
      },
      marketing: {
        currentMonthlyCost: monthlyMarketingCost.toFixed(0),
        aiMonthlyCost: aiMarketingCost.toFixed(0),
        monthlySavings: marketingSavings.toFixed(0),
        timeReduction: '75%',
        currentHours: totalMarketingHours.toFixed(1),
        aiHours: aiMarketingHours.toFixed(1)
      },
      totals: {
        monthlyTotalSavings: totalMonthlySavings.toFixed(0),
        yearlyTotalSavings: yearlyTotalSavings.toFixed(0),
        timeSavingsHours: timeSavingsHours.toFixed(1),
        timeSavingsPercentage: timeSavingsPercentage.toFixed(0),
        platformBonus: ((platformBonus - 1) * 100).toFixed(0)
      },
      impact: {
        fasterTimeToMarket: fasterTimeToMarket.toFixed(0),
        improvedTickets: improvedCustomerSat.toFixed(0),
        extraContentPieces: moreContentVolume.toFixed(0)
      },
      platform: platform
    });
    
    setShowEmailCapture(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    
    // Here you would integrate with your email service
    console.log('Email submitted:', email);
    alert('Thanks! Check your email for the "E-commerce AI Toolkit"');
    setShowEmailCapture(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            E-commerce AI Savings Calculator
          </h2>
          <p className="text-lg text-gray-600">
            Calculate how much time and money you can save by automating your e-commerce operations with AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Store Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-commerce Platform
              </label>
              <select
                value={inputs.platformType}
                onChange={(e) => handleInputChange('platformType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(platformTypes).map(([key, platform]) => (
                  <option key={key} value={key}>{platform.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Product Count
                </label>
                <input
                  type="number"
                  value={inputs.productCount}
                  onChange={(e) => handleInputChange('productCount', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="10000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Products/Month
                </label>
                <input
                  type="number"
                  value={inputs.newProductsPerMonth}
                  onChange={(e) => handleInputChange('newProductsPerMonth', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Words per Product Description
              </label>
              <input
                type="number"
                value={inputs.descriptionWordsPerProduct}
                onChange={(e) => handleInputChange('descriptionWordsPerProduct', parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="50"
                max="1000"
              />
              <p className="text-sm text-gray-500 mt-1">Average: 100-200 words</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Writing Speed (words/hour)
                </label>
                <input
                  type="number"
                  value={inputs.currentWritingSpeed}
                  onChange={(e) => handleInputChange('currentWritingSpeed', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="50"
                  max="500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Creator Rate ($/hour)
                </label>
                <input
                  type="number"
                  value={inputs.contentCreatorHourlyRate}
                  onChange={(e) => handleInputChange('contentCreatorHourlyRate', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="10"
                  max="200"
                />
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mt-6">Customer Service</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Tickets/Week
                </label>
                <input
                  type="number"
                  value={inputs.weeklyTickets}
                  onChange={(e) => handleInputChange('weeklyTickets', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="1000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CS Hourly Rate ($)
                </label>
                <input
                  type="number"
                  value={inputs.customerServiceHourlyRate}
                  onChange={(e) => handleInputChange('customerServiceHourlyRate', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="10"
                  max="100"
                />
              </div>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mt-6">Marketing Content</h4>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emails/Month
                </label>
                <input
                  type="number"
                  value={inputs.marketingEmailsPerMonth}
                  onChange={(e) => handleInputChange('marketingEmailsPerMonth', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Posts/Week
                </label>
                <input
                  type="number"
                  value={inputs.socialPostsPerWeek}
                  onChange={(e) => handleInputChange('socialPostsPerWeek', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Copies/Month
                </label>
                <input
                  type="number"
                  value={inputs.adCopiesPerMonth}
                  onChange={(e) => handleInputChange('adCopiesPerMonth', parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="100"
                />
              </div>
            </div>

            <button
              onClick={calculateSavings}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Calculate My E-commerce Savings
            </button>
          </div>

          {/* Results Section */}
          {results && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Your AI Automation Savings</h3>
              
              {/* Platform Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Platform: {results.platform.name}</span>
                  <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                    AI Integration: {results.platform.aiIntegration}
                  </span>
                </div>
                {results.totals.platformBonus > 0 && (
                  <div className="text-sm text-blue-600 mt-1">
                    +{results.totals.platformBonus}% platform optimization bonus
                  </div>
                )}
              </div>

              {/* Product Descriptions */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">📝 Product Descriptions</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Monthly Cost:</span>
                    <span className="font-semibold">${results.productDescriptions.currentMonthlyCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>With AI:</span>
                    <span className="font-semibold text-green-600">${results.productDescriptions.aiMonthlyCost}</span>
                  </div>
                  <div className="flex justify-between text-lg border-t pt-2">
                    <span>Monthly Savings:</span>
                    <span className="font-bold text-green-600">${results.productDescriptions.monthlySavings}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Time reduction: {results.productDescriptions.timeReduction} ({results.productDescriptions.currentHours}h → {results.productDescriptions.aiHours}h)
                  </div>
                </div>
              </div>

              {/* Customer Service */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">🎧 Customer Service</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Monthly Cost:</span>
                    <span className="font-semibold">${results.customerService.currentMonthlyCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>With AI:</span>
                    <span className="font-semibold text-blue-600">${results.customerService.aiMonthlyCost}</span>
                  </div>
                  <div className="flex justify-between text-lg border-t pt-2">
                    <span>Monthly Savings:</span>
                    <span className="font-bold text-blue-600">${results.customerService.monthlySavings}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {results.customerService.automationRate} tickets automated, {results.customerService.timeReduction} time reduction on complex tickets
                  </div>
                </div>
              </div>

              {/* Marketing */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">📢 Marketing Content</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Monthly Cost:</span>
                    <span className="font-semibold">${results.marketing.currentMonthlyCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>With AI:</span>
                    <span className="font-semibold text-purple-600">${results.marketing.aiMonthlyCost}</span>
                  </div>
                  <div className="flex justify-between text-lg border-t pt-2">
                    <span>Monthly Savings:</span>
                    <span className="font-bold text-purple-600">${results.marketing.monthlySavings}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {results.marketing.timeReduction} time reduction across emails, social, and ads
                  </div>
                </div>
              </div>

              {/* Total Savings */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-3">💰 Total Savings</h4>
                <div className="text-center space-y-2">
                  <div>
                    <div className="text-3xl font-bold text-orange-600">${results.totals.monthlyTotalSavings}</div>
                    <div className="text-sm text-gray-600">Per Month</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-orange-600">${results.totals.yearlyTotalSavings}</div>
                    <div className="text-sm text-gray-600">Per Year</div>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {results.totals.timeSavingsHours} hours saved monthly ({results.totals.timeSavingsPercentage}% reduction)
                  </div>
                </div>
              </div>

              {/* Business Impact */}
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">🚀 Business Impact</h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between">
                    <span>Faster time-to-market:</span>
                    <span className="font-semibold text-indigo-600">{results.impact.fasterTimeToMarket} days/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Improved customer experience:</span>
                    <span className="font-semibold text-indigo-600">{results.impact.improvedTickets} better interactions</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extra content capacity:</span>
                    <span className="font-semibold text-indigo-600">+{results.impact.extraContentPieces} pieces/month</span>
                  </div>
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
                Get Your Free E-commerce AI Toolkit
              </h3>
              <p className="text-gray-600 mb-6">
                Download ready-to-use AI prompts for product descriptions, customer service responses, and marketing content that can save you thousands.
              </p>
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Get Free Toolkit
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

export default EcommerceAICalculator; 