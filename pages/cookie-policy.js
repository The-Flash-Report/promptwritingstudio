import Head from 'next/head'
import Layout from '../components/layout/Layout'

export default function CookiePolicy() {
  return (
    <Layout>
      <Head>
        <title>Cookie Policy - Prompt Writing Studio</title>
        <meta name="description" content="Cookie Policy for Prompt Writing Studio - Learn about how we use cookies and tracking technologies." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <p className="mb-6">
                This Cookie Policy explains how Prompt Writing Studio ("we," "us," or "our") uses cookies and similar tracking technologies when you visit our website. This policy should be read alongside our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">1. What Are Cookies?</h2>

              <p className="mb-4">
                Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings, which can make your next visit easier and the site more useful to you.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Types of Cookies We Use</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.1 Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the website to function properly and cannot be disabled in our systems. They are usually only set in response to actions made by you which amount to a request for services.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Examples:</h4>
                <ul>
                  <li>Session management cookies</li>
                  <li>Security and authentication cookies</li>
                  <li>Calculator preference cookies</li>
                  <li>Form data storage cookies</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.2 Analytics Cookies</h3>
              <p className="mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Services:</h4>
                <ul>
                  <li><strong>Google Analytics:</strong> Tracks page views, user behavior, and site performance</li>
                  <li><strong>Google Tag Manager:</strong> Manages tracking codes and analytics</li>
                  <li><strong>Hotjar (if implemented):</strong> User behavior analysis and heatmaps</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.3 Functional Cookies</h3>
              <p className="mb-4">
                These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Examples:</h4>
                <ul>
                  <li>Theme preferences (light/dark mode)</li>
                  <li>Language settings</li>
                  <li>Calculator input memory</li>
                  <li>Prompt library favorites</li>
                  <li>AI model preferences</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2.4 Marketing Cookies</h3>
              <p className="mb-4">
                These cookies track your browsing habits to deliver advertisements that are more relevant to you and your interests.
              </p>
              
              <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Services:</h4>
                <ul>
                  <li><strong>Google Ads:</strong> Conversion tracking and remarketing</li>
                  <li><strong>Facebook Pixel:</strong> Social media advertising and analytics</li>
                  <li><strong>LinkedIn Insight Tag:</strong> Professional network advertising</li>
                  <li><strong>Email Marketing Platforms:</strong> Campaign tracking and personalization</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Cookie Duration</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Session Cookies</h3>
              <p className="mb-4">
                These cookies are temporary and are deleted when you close your browser. They're used for essential site functionality and security.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Persistent Cookies</h3>
              <p className="mb-4">
                These cookies remain on your device for a set period or until you delete them. Different cookies have different expiration periods:
              </p>
              
              <ul className="mb-4">
                <li><strong>Analytics Cookies:</strong> Up to 26 months (Google Analytics)</li>
                <li><strong>Functional Cookies:</strong> Up to 1 year</li>
                <li><strong>Marketing Cookies:</strong> Varies by provider (typically 30-90 days)</li>
                <li><strong>Preference Cookies:</strong> Up to 1 year</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Third-Party Cookies</h2>

              <p className="mb-4">
                Some cookies are placed by third-party services that appear on our pages. We use various third-party services, and these services may set their own cookies.
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Service</th>
                      <th className="px-4 py-2 text-left">Purpose</th>
                      <th className="px-4 py-2 text-left">Cookie Names</th>
                      <th className="px-4 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Google Analytics</td>
                      <td className="px-4 py-2">Website analytics</td>
                      <td className="px-4 py-2">_ga, _gid, _gat</td>
                      <td className="px-4 py-2">2 years</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Google Tag Manager</td>
                      <td className="px-4 py-2">Tag management</td>
                      <td className="px-4 py-2">_gtm</td>
                      <td className="px-4 py-2">Session</td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Teachable</td>
                      <td className="px-4 py-2">Course platform</td>
                      <td className="px-4 py-2">_teachable_session</td>
                      <td className="px-4 py-2">Session</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Managing Your Cookie Preferences</h2>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.1 Browser Settings</h3>
              <p className="mb-4">
                Most web browsers allow you to control cookies through their settings. You can set your browser to:
              </p>
              
              <ul className="mb-4">
                <li>Block all cookies</li>
                <li>Allow only first-party cookies</li>
                <li>Delete cookies when you close your browser</li>
                <li>Notify you when cookies are being set</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.2 Browser-Specific Instructions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Chrome</h4>
                  <p className="text-sm">Settings → Privacy and Security → Cookies and other site data</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Firefox</h4>
                  <p className="text-sm">Settings → Privacy & Security → Cookies and Site Data</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Safari</h4>
                  <p className="text-sm">Preferences → Privacy → Manage Website Data</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Edge</h4>
                  <p className="text-sm">Settings → Site permissions → Cookies and site data</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5.3 Opt-Out Tools</h3>
              <ul className="mb-4">
                <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
                <li><strong>Network Advertising Initiative:</strong> <a href="http://www.networkadvertising.org/choices/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">NAI Opt-Out Tool</a></li>
                <li><strong>Digital Advertising Alliance:</strong> <a href="http://www.aboutads.info/choices/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">DAA Opt-Out Tool</a></li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Impact of Disabling Cookies</h2>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-amber-800 mb-2">⚠️ Important Note</h3>
                <p className="text-amber-700">
                  Disabling certain cookies may impact your experience on our website. Some features may not work properly or at all.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.1 If You Disable Essential Cookies:</h3>
              <ul className="mb-4">
                <li>Calculator functions may not save your inputs</li>
                <li>Security features may be compromised</li>
                <li>Form submissions may not work properly</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.2 If You Disable Functional Cookies:</h3>
              <ul className="mb-4">
                <li>Your preferences won't be remembered</li>
                <li>You'll need to re-enter settings each visit</li>
                <li>Personalized features will be unavailable</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6.3 If You Disable Analytics Cookies:</h3>
              <ul className="mb-4">
                <li>We can't improve our website based on usage data</li>
                <li>Error tracking and performance monitoring are affected</li>
                <li>Content optimization becomes less effective</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Mobile Apps and Future Platforms</h2>

              <p className="mb-4">
                If we develop mobile applications or other platforms, they may use similar tracking technologies. This policy will be updated to reflect any new tracking methods.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Updates to This Policy</h2>

              <p className="mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">9. Contact Us</h2>

              <p className="mb-4">
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
              </p>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Email:</strong> privacy@promptwritingstudio.com</p>
                <p><strong>Subject Line:</strong> Cookie Policy Inquiry</p>
                <p><strong>Website:</strong> Contact form at /contact</p>
                <p><strong>Response Time:</strong> We aim to respond within 48 hours</p>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">10. Additional Resources</h2>

              <p className="mb-4">
                For more information about cookies and online privacy, visit:
              </p>
              
              <ul className="mb-6">
                <li><a href="https://www.allaboutcookies.org/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">All About Cookies</a></li>
                <li><a href="https://cookiepedia.co.uk/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Cookiepedia</a></li>
                <li><a href="https://ico.org.uk/for-the-public/online/cookies/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">ICO Cookies Guide</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 