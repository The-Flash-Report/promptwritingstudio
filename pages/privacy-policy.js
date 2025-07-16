import Head from 'next/head'
import Layout from '../components/layout/Layout'

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - Prompt Writing Studio</title>
        <meta name="description" content="Privacy Policy for Prompt Writing Studio - How we collect, use, and protect your personal information." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <p className="mb-6">
                At Prompt Writing Studio ("we," "our," or "us"), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1.1 Information You Provide</h3>
              <ul className="mb-4">
                <li><strong>Contact Information:</strong> Email address, name when you subscribe to our newsletter or contact us</li>
                <li><strong>Communication Data:</strong> Messages you send us through contact forms or email</li>
                <li><strong>Survey Data:</strong> Responses to surveys or feedback forms you complete voluntarily</li>
                <li><strong>Course Enrollment:</strong> Information provided when enrolling in courses through our partner Teachable</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1.2 Information Automatically Collected</h3>
              <ul className="mb-4">
                <li><strong>Usage Data:</strong> Information about how you use our calculators and tools</li>
                <li><strong>Device Information:</strong> IP address, browser type, device type, operating system</li>
                <li><strong>Analytics Data:</strong> Page views, time spent on pages, click-through rates via Google Analytics</li>
                <li><strong>Cookies and Tracking:</strong> Data collected through cookies and similar technologies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1.3 AI Integration Data</h3>
              <ul className="mb-4">
                <li><strong>Prompt Content:</strong> Text you enter into our AI optimization tools (processed securely and not stored permanently)</li>
                <li><strong>Usage Metrics:</strong> API usage statistics and token consumption for optimization</li>
                <li><strong>Chat History:</strong> Temporary conversation data during live AI testing (deleted after session)</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Service Provision</h3>
              <ul className="mb-4">
                <li>Providing and improving our calculators and AI tools</li>
                <li>Processing your requests and responding to inquiries</li>
                <li>Delivering newsletter content and course information</li>
                <li>Technical support and customer service</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Communication</h3>
              <ul className="mb-4">
                <li>Sending educational content and course promotions</li>
                <li>Notifying you about updates to our services</li>
                <li>Responding to your questions and feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3 Analytics and Improvement</h3>
              <ul className="mb-4">
                <li>Analyzing website usage patterns and user behavior</li>
                <li>Improving our tools and user experience</li>
                <li>Measuring the effectiveness of our content and marketing</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. How We Share Your Information</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Third-Party Service Providers</h3>
              <ul className="mb-4">
                <li><strong>Teachable:</strong> Course platform for enrollment and delivery</li>
                <li><strong>Email Service Providers:</strong> For newsletter and email marketing</li>
                <li><strong>Google Analytics:</strong> For website analytics and performance tracking</li>
                <li><strong>AI Services:</strong> Claude (Anthropic) and Perplexity for AI optimization features</li>
                <li><strong>Hosting Providers:</strong> For website hosting and content delivery</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Legal Requirements</h3>
              <p className="mb-4">
                We may disclose your information if required by law, court order, or government request, or to protect our rights, property, or safety.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 Business Transfers</h3>
              <p className="mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Data Security</h2>

              <p className="mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>

              <ul className="mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure API integrations with base64 encoding</li>
                <li>Regular backups and disaster recovery procedures</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Data Retention</h2>

              <ul className="mb-4">
                <li><strong>Email Subscribers:</strong> Until you unsubscribe or request deletion</li>
                <li><strong>Contact Form Data:</strong> 3 years from last contact</li>
                <li><strong>Analytics Data:</strong> 26 months (Google Analytics default)</li>
                <li><strong>AI Chat Sessions:</strong> Deleted immediately after session ends</li>
                <li><strong>Calculator Usage:</strong> Aggregated data retained indefinitely for improvement purposes</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Your Rights</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 Access and Control</h3>
              <ul className="mb-4">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 California Privacy Rights</h3>
              <p className="mb-4">
                California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected and how it's used.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.3 EU Privacy Rights</h3>
              <p className="mb-4">
                EU residents have rights under the General Data Protection Regulation (GDPR), including the right to object to processing and the right to data portability.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. International Transfers</h2>

              <p className="mb-4">
                Your information may be processed and stored in countries outside your residence, including the United States. We ensure appropriate safeguards are in place for international data transfers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Children's Privacy</h2>

              <p className="mb-4">
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Updates to This Policy</h2>

              <p className="mb-4">
                We may update this Privacy Policy periodically. We will notify you of significant changes by posting the updated policy on our website and updating the "Last Updated" date.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Contact Information</h2>

              <p className="mb-4">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Email:</strong> privacy@promptwritingstudio.com</p>
                <p><strong>Website:</strong> Contact form at /contact</p>
                <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">11. Third-Party Links</h2>

              <p className="mb-4">
                Our website may contain links to third-party websites. This Privacy Policy does not apply to those sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">12. Consent</h2>

              <p className="mb-6">
                By using our website and services, you consent to the collection and use of your information as described in this Privacy Policy. You may withdraw consent at any time by contacting us or adjusting your browser settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 