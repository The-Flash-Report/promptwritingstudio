import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
  callbacks: {
    async session({ session, user }) {
      // Add custom user data to session
      session.user.id = user.id
      session.user.subscriptionStatus = user.subscriptionStatus
      session.user.subscriptionPlan = user.subscriptionPlan
      session.user.onboardingCompleted = user.onboardingCompleted
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.subscriptionStatus = user.subscriptionStatus
        token.subscriptionPlan = user.subscriptionPlan
      }
      return token
    },
  },
  events: {
    async createUser({ user }) {
      // Track new user signup
      console.log('New user created:', user.email)
      // You can add analytics tracking here
    },
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development',
}) 