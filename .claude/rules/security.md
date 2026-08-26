---
description: Security standards for the PromptWritingStudio codebase
globs: ["**/*.js", "**/*.jsx", "pages/api/**"]
---

# Security

## Pre-Commit Checks

Before any commit, verify:
- No hardcoded secrets (API keys, passwords, tokens)
- All user inputs validated
- XSS prevention (sanitized HTML)
- CSRF protection on state-changing endpoints
- Error messages don't expose internal details
- No user API keys (BYOK `x-user-api-key`) stored, logged, or traced — in-memory for one call only

## Secret Management

- NEVER hardcode secrets in source code
- ALWAYS use environment variables or a secret manager
- Validate that required secrets exist during startup
- Rotate any potentially compromised credentials immediately

## Not applicable here

This site has NO auth, NO NextAuth, NO Prisma, NO database (see CLAUDE.md
Stack). Entitlement is a signed HMAC header (`STUDIO_ENTITLEMENT_SECRET`,
`lib/studio/entitlements.js`). Do not add NextAuth/Prisma-shaped checks or
"fix" their absence.

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
