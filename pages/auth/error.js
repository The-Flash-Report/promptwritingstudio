import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'

const errors = {
  configuration: {
    heading: 'Server Configuration Error',
    message: 'There is a problem with the server configuration.',
  },
  accessdenied: {
    heading: 'Access Denied',
    message: 'You do not have permission to sign in.',
  },
  verification: {
    heading: 'Verification Error',
    message: 'The sign-in link is no longer valid. It may have expired or already been used.',
  },
  default: {
    heading: 'Authentication Error',
    message: 'An error occurred during authentication.',
  },
}

export default function AuthError() {
  const router = useRouter()
  const { error } = router.query
  
  const errorInfo = errors[error] || errors.default

  return (
    <Layout
      title="Authentication Error - PromptWritingStudio"
      description="An error occurred during authentication"
    >
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <div className="bg-red-100 rounded-full p-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {errorInfo.heading}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {errorInfo.message}
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center space-y-4">
              {error === 'verification' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Expired Link:</strong> Sign-in links expire after 24 hours for security. Please request a new one.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Link
                  href="/auth/signin"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FFDE59] hover:bg-[#E5C84F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFDE59] transition-colors"
                >
                  Try signing in again
                </Link>

                <Link
                  href="/"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFDE59] transition-colors"
                >
                  Back to home
                </Link>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Still having trouble?{' '}
                  <a href="mailto:support@promptwritingstudio.com" className="text-[#1A1A1A] hover:underline">
                    Contact our support team
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 