import Layout from '../components/layout/Layout'
import ROICalculator from '../components/tools/ROICalculator'
import RelatedCalculators from '../components/ui/RelatedCalculators'
import CalculatorBreadcrumbs from '../components/ui/CalculatorBreadcrumbs'
import CalculatorSchema from '../components/ui/CalculatorSchema'
import OrganizationSchema from '../components/ui/OrganizationSchema'
import RichSnippets from '../components/ui/RichSnippets'
import Link from 'next/link'

export default function ROICalculatorPage() {
  return (
    <Layout
      title="AI ROI Calculator - Calculate Your Business Savings | PromptWritingStudio"
      description="Discover how much time and money your business could save with AI automation. Free calculator shows your potential yearly savings in minutes."
    >
      <CalculatorSchema
        calculatorName="AI ROI Calculator"
        description="Calculate exactly how much time and money your business could save with AI automation"
        url="https://promptwritingstudio.com/roi-calculator"
        category="Business ROI Analysis"
        keywords={[
          'AI ROI calculator',
          'artificial intelligence return on investment',
          'business automation savings',
          'AI cost savings calculator',
          'productivity calculator',
          'automation ROI',
          'AI business benefits',
          'time savings calculator'
        ]}
        expectedInputs={['Hours per week', 'Hourly rate', 'Task type']}
        expectedOutputs={['Weekly savings', 'Monthly savings', 'Yearly savings', 'Hours saved']}
      />
      <OrganizationSchema />
      <RichSnippets
        title="AI ROI Calculator - Calculate Your Business Savings"
        description="Discover how much time and money your business could save with AI automation. Free calculator shows your potential yearly savings in minutes."
        url="https://promptwritingstudio.com/roi-calculator"
        image="https://promptwritingstudio.com/images/roi-calculator-preview.jpg"
        howToSteps={[
          {
            name: "Enter Your Current Hours",
            text: "Input how many hours per week you spend on specific business tasks that could be automated with AI."
          },
          {
            name: "Set Your Hourly Rate", 
            text: "Enter your hourly rate or the cost of having someone else do these tasks."
          },
          {
            name: "Select Task Type",
            text: "Choose the type of task from our predefined categories to get accurate time-saving estimates."
          },
          {
            name: "Get Your Results",
            text: "Review your potential weekly, monthly, and yearly savings with detailed breakdowns."
          }
        ]}
      />
      <CalculatorBreadcrumbs currentTitle="AI ROI Calculator" />
      
      {/* Hero Section */}
      <section className="gradient-bg py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              AI ROI Calculator
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover exactly how much time and money your business could save with AI automation
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">10-20</div>
                <div className="text-sm">Hours Saved/Week</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">$5K-$50K</div>
                <div className="text-sm">Yearly Savings</div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-3">
                <div className="text-2xl font-bold">60-85%</div>
                <div className="text-sm">Time Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
                Why Business Owners Choose AI Automation
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Join thousands of business owners who are using AI to streamline operations, 
                reduce costs, and focus on growing their business instead of repetitive tasks.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFDE59] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Save 10-20 Hours/Week</h3>
                <p className="text-gray-600">
                  Automate repetitive tasks like content creation, customer service, and data analysis. 
                  Reclaim your time for strategic work that grows your business.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFDE59] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Reduce Costs by 60-80%</h3>
                <p className="text-gray-600">
                  Cut outsourcing costs and reduce the need for additional hires. 
                  AI can handle tasks that would otherwise cost thousands per month.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFDE59] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">Scale Without Hiring</h3>
                <p className="text-gray-600">
                  Handle increased workload without proportional staff increases. 
                  AI scales with your business needs instantly and affordably.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="py-16 md:py-20 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
                Popular Business Automation Tasks
              </h2>
              <p className="text-lg text-gray-600">
                See what other business owners are automating with AI
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { task: 'Email Marketing', savings: '80%', description: 'Automated subject lines, content, and personalization' },
                { task: 'Customer Service', savings: '60%', description: 'Instant responses, FAQ automation, ticket routing' },
                { task: 'Content Creation', savings: '70%', description: 'Blog posts, social media, product descriptions' },
                { task: 'Data Analysis', savings: '65%', description: 'Report generation, trend analysis, insights' },
                { task: 'Social Media', savings: '75%', description: 'Post creation, scheduling, engagement responses' },
                { task: 'Research & Planning', savings: '60%', description: 'Market research, competitor analysis, planning docs' }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-[#1A1A1A]">{item.task}</h3>
                    <span className="text-green-600 font-bold">{item.savings} saved</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1A1A1A]">
              Ready to Start Saving Time and Money?
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Our PromptWritingStudio course teaches you exactly how to implement 
              these AI automations in your business, step by step.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700">
                💡 <strong>Pro Tip:</strong> Use our{' '}
                <Link href="/calculators/ai-cost-comparison" className="underline hover:text-blue-900">
                  AI vs Human Cost Calculator
                </Link>{' '}
                to compare automation costs vs hiring decisions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://courses.becomeawritertoday.com/purchase?product_id=6253746"
                className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#E5C84F] transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Learning Now
              </a>
              <Link
                href="/ai-prompt-generator"
                className="border border-[#1A1A1A] text-[#1A1A1A] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1A1A1A] hover:text-white transition-colors duration-200"
              >
                Try Free Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <RelatedCalculators currentCalculator="/roi-calculator" />
    </Layout>
  )
} 