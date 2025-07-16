import Layout from '../../components/layout/Layout'
import CostComparisonCalculator from '../../components/calculators/CostComparisonCalculator'
import RelatedCalculators from '../../components/ui/RelatedCalculators'
import CalculatorBreadcrumbs from '../../components/ui/CalculatorBreadcrumbs'
import CalculatorSchema from '../../components/ui/CalculatorSchema'
import OrganizationSchema from '../../components/ui/OrganizationSchema'
import RichSnippets from '../../components/ui/RichSnippets'
import Link from 'next/link'

export default function AICostComparisonPage() {
  return (
    <Layout
      title="AI vs Human Cost Calculator - Compare Automation vs Hiring Costs | PromptWritingStudio"
      description="Compare the true cost of AI automation vs hiring employees or contractors. Free calculator shows exact savings, payback period, and implementation guide."
    >
      <CalculatorSchema
        calculatorName="AI vs Human Cost Calculator"
        description="Compare the true cost of AI automation vs hiring employees or contractors"
        url="https://promptwritingstudio.com/calculators/ai-cost-comparison"
        category="Cost Comparison Analysis"
        keywords={[
          'AI vs human cost calculator',
          'automation vs hiring costs',
          'AI vs employee cost comparison',
          'hiring decision calculator',
          'AI implementation costs',
          'automation cost analysis',
          'AI vs contractor costs',
          'business automation calculator'
        ]}
        expectedInputs={['Task complexity', 'Current costs', 'AI tool costs', 'Implementation time']}
        expectedOutputs={['Cost comparison', 'Payback period', 'Annual savings', 'Break-even analysis']}
      />
      <OrganizationSchema />
      <RichSnippets
        title="AI vs Human Cost Calculator - Compare Automation vs Hiring Costs"
        description="Compare the true cost of AI automation vs hiring employees or contractors. Free calculator shows exact savings, payback period, and implementation guide."
        url="https://promptwritingstudio.com/calculators/ai-cost-comparison"
        image="https://promptwritingstudio.com/images/cost-comparison-calculator-preview.jpg"
        howToSteps={[
          {
            name: "Define Your Task",
            text: "Describe the business task you're considering automating or hiring for."
          },
          {
            name: "Enter Current Costs",
            text: "Input current costs including wages, benefits, training, and overhead for human workers."
          },
          {
            name: "Set AI Implementation Costs",
            text: "Enter AI tool costs, setup time, and any implementation expenses."
          },
          {
            name: "Compare Results",
            text: "Review side-by-side comparison with payback period and long-term savings analysis."
          }
        ]}
      />
      <CalculatorBreadcrumbs currentTitle="AI vs Human Cost Calculator" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AI vs Human Cost Calculator
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Should you hire a person or use AI? Get the exact numbers to make the right business decision.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">60-90%</div>
                <div className="text-sm">Cost Reduction</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">2-6 months</div>
                <div className="text-sm">Payback Period</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">AI Availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <CostComparisonCalculator />
          </div>
        </div>
      </section>

      {/* When to Choose AI vs Human */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                When to Choose AI vs Human Workers
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Make informed decisions about automation vs hiring with these key factors
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Choose AI */}
              <div className="bg-green-50 border border-green-200 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-green-800">Choose AI When:</h3>
                </div>
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Tasks are repetitive and follow clear patterns</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>High volume, low-complexity work</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Need 24/7 availability</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Consistent quality requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Instant scalability needed</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Budget constraints for hiring</span>
                  </li>
                </ul>
              </div>

              {/* Choose Human */}
              <div className="bg-blue-50 border border-blue-200 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-blue-800">Choose Human When:</h3>
                </div>
                <ul className="space-y-3 text-blue-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Complex decision-making required</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>High emotional intelligence needed</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Creative problem solving essential</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Personal relationships matter</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Regulatory or compliance requirements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Highly specialized expertise needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison Examples */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Real-World Cost Comparisons
              </h2>
              <p className="text-lg text-gray-600">
                See how businesses are saving with AI automation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  task: 'Content Writing',
                  human: '$3,000/mo',
                  ai: '$200/mo',
                  savings: '93%',
                  description: '50 blog posts per month'
                },
                {
                  task: 'Customer Support',
                  human: '$4,000/mo',
                  ai: '$500/mo',
                  savings: '88%',
                  description: '1,000 tickets per month'
                },
                {
                  task: 'Product Descriptions',
                  human: '$2,400/mo',
                  ai: '$150/mo',
                  savings: '94%',
                  description: '200 descriptions per month'
                },
                {
                  task: 'Social Media',
                  human: '$2,000/mo',
                  ai: '$300/mo',
                  savings: '85%',
                  description: '120 posts per month'
                },
                {
                  task: 'Email Marketing',
                  human: '$1,800/mo',
                  ai: '$180/mo',
                  savings: '90%',
                  description: '20 campaigns per month'
                },
                {
                  task: 'Data Analysis',
                  human: '$6,000/mo',
                  ai: '$800/mo',
                  savings: '87%',
                  description: '15 reports per month'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-800 mb-2">{item.task}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Human:</span>
                      <span className="text-red-600 font-semibold">{item.human}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AI:</span>
                      <span className="text-green-600 font-semibold">{item.ai}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="font-semibold">Savings:</span>
                      <span className="text-green-600 font-bold">{item.savings}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Considerations */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Beyond Just Cost: Implementation Factors
              </h2>
              <p className="text-lg text-gray-600">
                Consider these factors when making your AI vs human decision
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Setup Time</h3>
                  <p className="text-gray-600">
                    AI: 1-2 weeks to setup and optimize prompts<br/>
                    Human: 2-8 weeks for hiring and training
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Scalability</h3>
                  <p className="text-gray-600">
                    AI: Instant scaling up or down<br/>
                    Human: Months to hire for increased capacity
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Control</h3>
                  <p className="text-gray-600">
                    AI: Consistent quality, requires initial prompt optimization<br/>
                    Human: Variable quality, ongoing management needed
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-yellow-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Ongoing Management</h3>
                  <p className="text-gray-600">
                    AI: Minimal oversight once optimized<br/>
                    Human: Daily management, feedback, and development
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Risk Factors</h3>
                  <p className="text-gray-600">
                    AI: Technology dependency, prompt optimization needed<br/>
                    Human: Turnover risk, sick days, vacation coverage
                  </p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Long-term Costs</h3>
                  <p className="text-gray-600">
                    AI: Stable monthly costs, occasional tool upgrades<br/>
                    Human: Annual raises, benefits increases, turnover costs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Implement AI in Your Business?
            </h2>
            <p className="text-lg mb-4 opacity-90">
              Our PromptWritingStudio course teaches you the exact prompts and processes 
              to achieve the cost savings shown in your calculation.
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-6">
              <p className="text-sm">
                🎯 <strong>Next Step:</strong> Calculate your overall{' '}
                <Link href="/roi-calculator" className="underline hover:text-blue-200">
                  AI ROI potential
                </Link>{' '}
                to see total business impact.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Learning Now
              </a>
              <Link
                href="/roi-calculator"
                className="border border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Try ROI Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <RelatedCalculators currentCalculator="/calculators/ai-cost-comparison" />
    </Layout>
  )
} 