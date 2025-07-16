import Layout from '../../components/layout/Layout'
import Link from 'next/link'

export default function VerifyRequest() {
  return (
    <Layout
      title="Check Your Email - PromptWritingStudio"
      description="We've sent you a sign-in link"
    >
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="bg-green-100 rounded-full p-4">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a sign-in link to your email address.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900">
                  Almost there!
                </h3>
                <p className="text-sm text-gray-600">
                  Click the link in your email to sign in to your PromptWritingStudio account.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Tip:</strong> Check your spam folder if you don't see the email within a few minutes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-4">
                  The sign-in link will expire in 24 hours for security.
                </p>
                
                <Link
                  href="/auth/signin"
                  className="text-sm text-[#1A1A1A] hover:underline font-medium"
                >
                  ← Back to sign in
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Having trouble?{' '}
            <a href="mailto:support@promptwritingstudio.com" className="text-[#1A1A1A] hover:underline">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </Layout>
  )
} 