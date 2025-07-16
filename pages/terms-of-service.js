import Head from 'next/head'
import Layout from '../components/layout/Layout'

export default function TermsOfService() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service - Prompt Writing Studio</title>
        <meta name="description" content="Terms of Service for Prompt Writing Studio - Legal terms and conditions for using our AI prompt tools and services." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <p className="mb-6">
                Welcome to Prompt Writing Studio ("we," "us," "our," or "the Service"). These Terms of Service ("Terms") govern your use of our website, tools, and services. By accessing or using our Service, you agree to be bound by these Terms.
              </p>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-red-800 mb-2">⚠️ Important Notice</h3>
                <p className="text-red-700">
                  Please read these Terms carefully before using our Service. If you do not agree to these Terms, you may not access or use our Service.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>

              <p className="mb-4">
                By accessing, browsing, or using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you are using the Service on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Description of Service</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Free Tools and Resources</h3>
              <ul className="mb-4">
                <li><strong>AI Prompt Generator:</strong> Tools for creating and optimizing AI prompts</li>
                <li><strong>Calculators:</strong> Content creation speed, ROI, and e-commerce savings calculators</li>
                <li><strong>Prompt Library:</strong> Collection of professionally crafted AI prompts</li>
                <li><strong>Educational Content:</strong> Articles, guides, and resources about AI prompt writing</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 AI Integration Services</h3>
              <ul className="mb-4">
                <li><strong>Real-time Optimization:</strong> AI-powered prompt enhancement using Claude and Perplexity</li>
                <li><strong>Live Chat Testing:</strong> Interactive testing of prompts with various AI models</li>
                <li><strong>Performance Analytics:</strong> Usage tracking and effectiveness metrics</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3 Educational Courses</h3>
              <ul className="mb-4">
                <li><strong>Teachable Integration:</strong> Access to prompt writing courses and training materials</li>
                <li><strong>Email Newsletter:</strong> Regular updates, tips, and course information</li>
                <li><strong>Premium Content:</strong> Advanced guides and exclusive resources</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. User Accounts and Registration</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Account Creation</h3>
              <p className="mb-4">
                While most of our tools are available without registration, some features may require you to provide your email address or create an account. You are responsible for maintaining the confidentiality of your account information.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Account Security</h3>
              <ul className="mb-4">
                <li>You are responsible for all activities that occur under your account</li>
                <li>You must notify us immediately of any unauthorized use</li>
                <li>We reserve the right to suspend or terminate accounts for violations</li>
                <li>You must provide accurate and complete information</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Acceptable Use Policy</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.1 Permitted Uses</h3>
              <ul className="mb-4">
                <li>Use our tools for legitimate business and educational purposes</li>
                <li>Create and optimize prompts for AI systems</li>
                <li>Access educational content and resources</li>
                <li>Share feedback and suggestions for improvement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4.2 Prohibited Uses</h3>
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <p className="font-semibold text-red-800 mb-2">You may NOT use our Service to:</p>
                <ul className="text-red-700">
                  <li>Create prompts for illegal, harmful, or unethical purposes</li>
                  <li>Generate content that violates intellectual property rights</li>
                  <li>Attempt to reverse engineer or exploit our AI integrations</li>
                  <li>Spam, harass, or abuse other users or our systems</li>
                  <li>Distribute malware, viruses, or harmful code</li>
                  <li>Circumvent rate limits or security measures</li>
                  <li>Resell or redistribute our services without permission</li>
                  <li>Create content that promotes hate, violence, or discrimination</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Intellectual Property Rights</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Our Content</h3>
              <p className="mb-4">
                All content on our website, including but not limited to text, graphics, logos, images, software, and prompt templates, is the property of Prompt Writing Studio or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 User-Generated Content</h3>
              <ul className="mb-4">
                <li><strong>Your Prompts:</strong> You retain ownership of prompts you create using our tools</li>
                <li><strong>License to Us:</strong> You grant us a limited license to process and optimize your prompts</li>
                <li><strong>No Permanent Storage:</strong> We do not permanently store your prompt content</li>
                <li><strong>Feedback:</strong> Any feedback you provide may be used to improve our services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.3 DMCA Policy</h3>
              <p className="mb-4">
                We respect intellectual property rights and will respond to valid DMCA takedown notices. If you believe your copyright has been infringed, please contact us with detailed information about the alleged infringement.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Privacy and Data Protection</h2>

              <p className="mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Service, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 AI Processing</h3>
              <ul className="mb-4">
                <li>Prompts are processed by third-party AI services (Claude, Perplexity)</li>
                <li>Chat sessions are temporary and not permanently stored</li>
                <li>Usage analytics are collected to improve service quality</li>
                <li>We implement security measures to protect your data</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Course Sales and Teachable Integration</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.1 Course Enrollment</h3>
              <p className="mb-4">
                Course sales and enrollment are processed through our partner Teachable. When you purchase a course, you are subject to both our Terms and Teachable's Terms of Service.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7.2 Refund Policy</h3>
              <ul className="mb-4">
                <li><strong>Course Refunds:</strong> Governed by Teachable's refund policy</li>
                <li><strong>Satisfaction Guarantee:</strong> We offer a 30-day money-back guarantee for courses</li>
                <li><strong>Refund Process:</strong> Contact us or Teachable support for refund requests</li>
                <li><strong>Digital Products:</strong> Courses are digital products delivered instantly</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Third-Party Services</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.1 AI Service Providers</h3>
              <ul className="mb-4">
                <li><strong>Anthropic (Claude):</strong> AI optimization and chat services</li>
                <li><strong>Perplexity AI:</strong> Research and information services</li>
                <li><strong>Future Integrations:</strong> OpenAI, Google, and other AI providers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.2 Analytics and Marketing</h3>
              <ul className="mb-4">
                <li><strong>Google Analytics:</strong> Website usage analysis</li>
                <li><strong>Email Marketing:</strong> Newsletter and course promotion services</li>
                <li><strong>Social Media:</strong> Integration with social platforms</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8.3 Disclaimer</h3>
              <p className="mb-4">
                We are not responsible for the availability, content, or practices of third-party services. Your use of third-party services is subject to their respective terms and conditions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Disclaimers and Limitations</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.1 Service Availability</h3>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <p className="text-yellow-800">
                  Our Service is provided "as is" and "as available." We do not guarantee uninterrupted or error-free operation. We reserve the right to modify, suspend, or discontinue the Service at any time.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.2 AI-Generated Content</h3>
              <ul className="mb-4">
                <li>AI optimization results are suggestions, not guarantees</li>
                <li>Users are responsible for verifying AI-generated content</li>
                <li>We do not guarantee the accuracy or effectiveness of optimized prompts</li>
                <li>AI models may produce biased or inappropriate content</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9.3 Educational Content</h3>
              <ul className="mb-4">
                <li>Courses and content are for educational purposes only</li>
                <li>Results may vary based on individual effort and circumstances</li>
                <li>We do not guarantee specific outcomes or earnings</li>
                <li>Content is based on current best practices and may become outdated</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Limitation of Liability</h2>

              <div className="bg-gray-50 border border-gray-300 p-4 rounded-lg mb-6">
                <p className="font-semibold mb-2">IMPORTANT LIMITATION:</p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROMPT WRITING STUDIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10.1 Maximum Liability</h3>
              <p className="mb-4">
                Our total liability to you for all claims arising from or relating to the Service shall not exceed the amount you paid us in the twelve (12) months preceding the claim, or $100, whichever is greater.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Indemnification</h2>

              <p className="mb-4">
                You agree to indemnify, defend, and hold harmless Prompt Writing Studio and its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:
              </p>

              <ul className="mb-4">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Content you create or share using our tools</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Termination</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.1 Termination by You</h3>
              <p className="mb-4">
                You may stop using our Service at any time. If you have a paid subscription or course access, termination does not automatically entitle you to a refund.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.2 Termination by Us</h3>
              <p className="mb-4">
                We may suspend or terminate your access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12.3 Effect of Termination</h3>
              <ul className="mb-4">
                <li>Your right to use the Service ceases immediately</li>
                <li>We may delete your account and associated data</li>
                <li>Provisions regarding liability, indemnification, and dispute resolution survive</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">13. Dispute Resolution</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.1 Governing Law</h3>
              <p className="mb-4">
                These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13.2 Dispute Resolution Process</h3>
              <ol className="mb-4">
                <li><strong>Informal Resolution:</strong> Contact us first to attempt informal resolution</li>
                <li><strong>Mediation:</strong> If informal resolution fails, disputes may be subject to mediation</li>
                <li><strong>Arbitration:</strong> Binding arbitration may be required for certain disputes</li>
                <li><strong>Class Action Waiver:</strong> You waive the right to participate in class actions</li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">14. Changes to Terms</h2>

              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by:
              </p>

              <ul className="mb-4">
                <li>Posting updated Terms on our website</li>
                <li>Updating the "Last Updated" date</li>
                <li>Sending email notifications for significant changes</li>
                <li>Displaying prominent notices on our website</li>
              </ul>

              <p className="mb-4">
                Your continued use of the Service after changes take effect constitutes acceptance of the new Terms.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">15. Miscellaneous</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.1 Entire Agreement</h3>
              <p className="mb-4">
                These Terms, together with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and Prompt Writing Studio.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.2 Severability</h3>
              <p className="mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.3 Waiver</h3>
              <p className="mb-4">
                Our failure to enforce any provision of these Terms does not constitute a waiver of that provision or any other provision.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">15.4 Assignment</h3>
              <p className="mb-4">
                You may not assign or transfer your rights under these Terms without our written consent. We may assign our rights and obligations under these Terms without restriction.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">16. Contact Information</h2>

              <p className="mb-4">
                If you have questions about these Terms, please contact us:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Email:</strong> legal@promptwritingstudio.com</p>
                <p><strong>Support:</strong> Contact form at /contact</p>
                <p><strong>Address:</strong> [Your Business Address]</p>
                <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">17. Acknowledgment</h2>

              <p className="mb-6">
                By using our Service, you acknowledge that you have read these Terms, understand them, and agree to be bound by them. You also acknowledge that these Terms may be updated from time to time, and you are responsible for reviewing them periodically.
              </p>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800">
                  <strong>Thank you for using Prompt Writing Studio!</strong> We're committed to providing valuable tools and resources to help you master AI prompt writing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 