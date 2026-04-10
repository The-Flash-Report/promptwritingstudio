---
description: Security standards for the PromptWritingStudio codebase
globs: ["**/*.js", "**/*.jsx", "pages/api/**"]
---

# Security

## Pre-Commit Checks

Before any commit, verify:
- No hardcoded secrets (API keys, passwords, tokens)
- All user inputs validated
- SQL injection prevention (parameterized queries via Prisma)
- XSS prevention (sanitized HTML)
- CSRF protection on state-changing endpoints
- Error messages don't expose internal details

## Secret Management

- NEVER hardcode secrets in source code
- ALWAYS use environment variables or a secret manager
- Validate that required secrets exist during startup
- Rotate any potentially compromised credentials immediately

## NextAuth.js Specific

- Validate callback URLs to prevent open redirects
- Ensure NEXTAUTH_SECRET is strong and rotated periodically
- Check session validation on all protected API routes
- Use proper CSRF tokens on forms

## API Routes

- Validate and sanitize all request body/query parameters
- Apply rate limiting on sensitive endpoints (auth, form submissions)
- Return appropriate HTTP status codes
- Never expose stack traces or internal paths in responses

## Response Protocol

When a vulnerability is discovered:
1. Stop current work immediately
2. Document the vulnerability
3. Remediate critical issues before continuing
4. Rotate credentials if potentially compromised
5. Review codebase for similar patterns
