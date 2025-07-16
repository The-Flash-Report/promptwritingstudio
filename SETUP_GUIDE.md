# PromptWritingStudio Setup Guide

## Overview
This guide will help you set up the authentication system and required environment variables for PromptWritingStudio.

## ✅ What's Already Implemented

### Authentication System
- ✅ NextAuth.js configuration with email/magic link authentication
- ✅ Prisma database schema with user, session, and custom models
- ✅ Sign-in, verification, and error pages
- ✅ Protected dashboard page
- ✅ Header authentication UI with user dropdown
- ✅ Session management throughout the app

### Database Models
- ✅ User accounts with subscription status
- ✅ Prompt history and favorites
- ✅ Custom templates storage
- ✅ Course progress tracking

---

## 🚀 Setup Instructions

### 1. Environment Variables

Create a `.env` file in your project root with these variables:

```bash
# Database (choose one option)
DATABASE_URL="postgresql://username:password@localhost:5432/promptwritingstudio?schema=public"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-key-here"

# Email Provider Configuration (for magic link authentication)
EMAIL_FROM="noreply@promptwritingstudio.com"
EMAIL_SERVER_USER="your-smtp-username"
EMAIL_SERVER_PASSWORD="your-smtp-password"
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"

# Google Analytics 4
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Stripe (for payments - Phase 2)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 2. Database Setup Options

#### Option A: Local PostgreSQL
1. Install PostgreSQL locally
2. Create a database: `createdb promptwritingstudio`
3. Update DATABASE_URL with your local credentials

#### Option B: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string and update DATABASE_URL
5. Format: `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres`

### 3. Email Configuration

#### Gmail SMTP (Recommended for development)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: Google Account → Security → App passwords
3. Use these settings:
   ```
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="youremail@gmail.com"
   EMAIL_SERVER_PASSWORD="your-16-character-app-password"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

#### Alternative Email Providers
- **SendGrid**: More reliable for production
- **Mailgun**: Good for transactional emails
- **AWS SES**: Cost-effective for high volume

### 4. Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use an online generator and add it to NEXTAUTH_SECRET.

### 5. Google Analytics Setup

1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new GA4 property
3. Get your Measurement ID (starts with G-)
4. Add it to NEXT_PUBLIC_GA_ID

---

## 🛠️ Database Migration

After setting up your database, run the migration:

```bash
npx prisma migrate dev --name init
```

This will:
- Create all the database tables
- Set up the relationships
- Generate the Prisma client

---

## 🧪 Testing the Setup

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Test Authentication Flow
1. Go to http://localhost:3000
2. Click "Sign In" in the header
3. Enter your email address
4. Check your email for the magic link
5. Click the link to sign in
6. You should be redirected to the dashboard

### 3. Verify Database
1. Check your database to see the user record
2. Or use Prisma Studio: `npx prisma studio`

---

## 📊 Analytics Verification

### Google Analytics 4
1. Go to your GA4 property
2. Check Real-time reports
3. Navigate your site to see events appearing

### Plausible (Already configured)
1. Check https://plausible.io for existing analytics
2. Should continue working alongside GA4

---

## 🔧 Troubleshooting

### Common Issues

#### "next: command not found"
- Use `npx next dev` instead of `npm run dev`
- Or install Next.js globally: `npm install -g next`

#### Email not sending
- Check spam folder
- Verify SMTP credentials
- Try Gmail App Password method
- Check EMAIL_FROM matches a valid domain

#### Database connection error
- Verify DATABASE_URL format
- Check database is running (if local)
- Test connection with Prisma Studio: `npx prisma studio`

#### Authentication redirect loop
- Check NEXTAUTH_URL matches your domain
- Verify NEXTAUTH_SECRET is set
- Clear browser cookies and try again

---

## 🎯 Next Steps (P1 Tasks)

After authentication is working:

1. **Payment Integration** (Stripe)
   - Set up Stripe account
   - Configure webhooks
   - Add subscription management

2. **Enhanced Prompt Generator**
   - User-specific prompt history
   - Favorites functionality
   - Advanced templates

3. **Course Content Delivery**
   - Protected course content
   - Progress tracking
   - Video integration

---

## 🔒 Security Notes

### Production Checklist
- [ ] Use strong NEXTAUTH_SECRET (32+ characters)
- [ ] Set up proper CORS policies
- [ ] Use environment-specific database
- [ ] Configure proper email provider
- [ ] Set up SSL certificates
- [ ] Regular database backups

### Development Tips
- Never commit `.env` file
- Use different databases for dev/staging/prod
- Test email functionality thoroughly
- Monitor authentication logs

---

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review server logs in terminal
3. Test database connection with Prisma Studio
4. Verify all environment variables are set correctly

The authentication system is now ready for users to sign up and access protected content! 🎉 