import { useSession, getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../components/layout/Layout'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <Layout title="Loading...">
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFDE59] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!session) {
    return null // Will redirect to sign in
  }

  return (
    <Layout
      title="Dashboard - PromptWritingStudio"
      description="Your PromptWritingStudio dashboard"
    >
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Welcome back, {session.user.name || session.user.email}!
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  {session.user.subscriptionPlan ? (
                    <span className="bg-[#FFDE59] text-black px-2 py-1 rounded-full font-medium">
                      {session.user.subscriptionPlan.toUpperCase()} Plan
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      Free Trial
                    </span>
                  )}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/ai-prompt-generator"
                  className="block p-3 bg-[#FFDE59] text-black rounded-md hover:bg-[#E5C84F] transition-colors"
                >
                  <div className="font-medium">Generate AI Prompt</div>
                  <div className="text-sm opacity-75">Create optimized prompts</div>
                </a>
                <a
                  href="/ai-prompt-generator?tab=builder"
                  className="block p-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <div className="font-medium">Build Custom Template</div>
                  <div className="text-sm opacity-75">Design your own templates</div>
                </a>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">
                    {session.user.subscriptionPlan || 'Free Trial'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    session.user.subscriptionStatus === 'active' 
                      ? 'text-green-600' 
                      : 'text-gray-600'
                  }`}>
                    {session.user.subscriptionStatus || 'Trial'}
                  </span>
                </div>
                <div className="pt-3 border-t">
                  {!session.user.subscriptionPlan && (
                    <a
                      href="/#pricing"
                      className="text-[#1A1A1A] hover:underline text-sm font-medium"
                    >
                      Upgrade to Pro →
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Getting Started</h2>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  {!session.user.onboardingCompleted ? (
                    <>
                      <p className="mb-3">Complete your setup:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Account created
                        </li>
                        <li className="flex items-center text-sm">
                          <svg className="h-4 w-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Try the prompt generator
                        </li>
                        <li className="flex items-center text-sm">
                          <svg className="h-4 w-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Save your first prompt
                        </li>
                      </ul>
                    </>
                  ) : (
                    <p>Welcome back! Ready to create some amazing prompts?</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course Progress Section (if subscribed) */}
          {session.user.subscriptionPlan && (
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h2>
                <p className="text-gray-600 mb-4">
                  Continue your prompt engineering journey with our comprehensive course.
                </p>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Course content coming soon!</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#FFDE59] h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
} 