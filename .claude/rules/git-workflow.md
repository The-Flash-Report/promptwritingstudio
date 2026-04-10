---
description: Git workflow conventions
globs: ["**"]
---

# Git Workflow

## Commit Format

```
<type>: <description>
```

Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

## PR Guidelines

- Analyze full commit history, not just the latest commit
- Use `git diff [base-branch]...HEAD` for comprehensive review
- Write detailed PR summaries with test plans
- Push new branches with the `-u` flag
