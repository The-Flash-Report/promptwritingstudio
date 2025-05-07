# Deployment Guide for PromptWritingStudio

This guide provides step-by-step instructions for deploying the PromptWritingStudio Next.js project using GitHub and Netlify.

## Table of Contents

1. [GitHub Repository Setup](#github-repository-setup)
2. [Preparing for Deployment](#preparing-for-deployment)
3. [Netlify Deployment Process](#netlify-deployment-process)
4. [Custom Domain Configuration](#custom-domain-configuration)
5. [Continuous Deployment](#continuous-deployment)
6. [Troubleshooting](#troubleshooting)

## GitHub Repository Setup

### Creating a New Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `promptwritingstudio-next`)
4. Add a description (optional)
5. Choose visibility (public or private)
6. Click "Create repository"

### Pushing Your Local Code

```bash
# Initialize Git if not already done
git init

# Add the remote repository
git remote add origin https://github.com/yourusername/promptwritingstudio-next.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Push to GitHub
git push -u origin main
```

### Branch Management

- Use `main` as your primary branch
- Consider using feature branches for major changes
- Protect the `main` branch in repository settings to require pull request reviews

## Preparing for Deployment

### Configure Next.js for Static Export

1. Update `next.config.js` to include static export configuration:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
```

2. Test the static export locally:

```bash
npm run build
```

This will generate a static export in the `out` directory.

### Update Package.json Scripts

Ensure your `package.json` has the correct build scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Netlify Deployment Process

### Manual Deployment

1. Log in to [Netlify](https://app.netlify.com/)
2. Click "Add new site" > "Import an existing project"
3. Choose "GitHub" as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select your repository (`promptwritingstudio-next`)
6. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
7. Click "Deploy site"

### Using Netlify CLI (Alternative)

1. Install Netlify CLI:
```bash
npm install netlify-cli -g
```

2. Log in to Netlify:
```bash
netlify login
```

3. Initialize Netlify in your project:
```bash
netlify init
```

4. Follow the prompts to connect to your GitHub repository and configure build settings

5. Deploy your site:
```bash
netlify deploy --prod
```

## Custom Domain Configuration

### Adding a Custom Domain

1. In the Netlify dashboard, go to your site settings
2. Click on "Domain settings"
3. Click "Add custom domain"
4. Enter your domain name (e.g., `promptwritingstudio.com`)
5. Follow the verification process

### DNS Configuration

#### Option 1: Using Netlify DNS
1. In Domain settings, click "Set up Netlify DNS"
2. Follow the instructions to update your domain's nameservers

#### Option 2: Using External DNS
1. Add a CNAME record pointing to your Netlify site
   - Name: www (or subdomain)
   - Value: your-site-name.netlify.app
2. Add an A record for the apex domain
   - Name: @
   - Value: Netlify's load balancer IP addresses (provided in Netlify's DNS settings)

### HTTPS Setup

Netlify automatically provisions a free SSL certificate through Let's Encrypt. To ensure it's enabled:

1. Go to your site's "Domain settings"
2. Under "HTTPS", ensure "SSL/TLS certificate" is enabled
3. Select "Let's Encrypt Certificate"

## Continuous Deployment

### Automatic Deployments

Netlify automatically deploys your site when you push to the connected branch (usually `main`). To configure this:

1. Go to your site's "Deploys" settings
2. Under "Continuous Deployment", confirm that "Auto publish" is enabled
3. Configure branch deploys if needed (e.g., deploy preview branches)

### Deploy Contexts

Create a `netlify.toml` file in your project root to configure different deployment contexts:

```toml
[build]
  command = "npm run build"
  publish = "out"

[context.production]
  environment = { NODE_VERSION = "16" }

[context.deploy-preview]
  command = "npm run build"
```

### Environment Variables

1. Go to your site's "Build & deploy" settings
2. Under "Environment", click "Edit variables"
3. Add any required environment variables for your build

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Netlify dashboard
   - Ensure all dependencies are properly installed
   - Verify that build commands are correct

2. **Missing Content**
   - Confirm the publish directory is set correctly
   - Check that static files are included in the build

3. **Routing Issues**
   - Ensure `trailingSlash: true` is set in `next.config.js`
   - Add appropriate redirects in `netlify.toml` if needed

### Netlify Functions (Optional)

If you need server-side functionality, consider using Netlify Functions:

1. Create a `/netlify/functions` directory in your project
2. Add your serverless functions as JavaScript files
3. Configure function settings in `netlify.toml`:

```toml
[functions]
  directory = "netlify/functions"
```

### Rollbacks

If a deployment causes issues:

1. Go to the "Deploys" tab in your Netlify dashboard
2. Find a previous working deploy
3. Click the three-dot menu and select "Publish deploy"

---

By following this guide, you'll be able to successfully deploy and maintain your PromptWritingStudio Next.js project on Netlify with continuous deployment from GitHub.
