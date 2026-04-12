---
description: Coding style standards for the PromptWritingStudio codebase
globs: ["**/*.js", "**/*.jsx"]
---

# Coding Style

## Core Principles

- **Immutability**: Create new objects, never mutate existing ones.
- **Simplicity**: Build only what's needed. No speculative abstractions.
- **Readability**: Code should be self-documenting. Prefer clarity over cleverness.

## File Organization

- Target 200-400 lines per file, max 800.
- One component per file for React components.
- Group related utilities in focused modules.

## Naming

- `camelCase` for functions and variables
- `PascalCase` for React components and types
- `UPPER_SNAKE_CASE` for constants
- Boolean variables prefixed with `is`, `has`, `should`, `can`
- Descriptive names — no single-letter variables except loop counters

## Functions

- Keep under 50 lines
- Max 4 levels of nesting
- Single responsibility — one function does one thing
- Early returns to reduce nesting

## Error Handling

- All errors require explicit handling
- User-facing: friendly messages
- Server-side: detailed logging
- Validate inputs at system boundaries (API routes, form handlers)
- Use schema-based validation where possible

## Quality Checklist

- [ ] No magic numbers — use named constants
- [ ] No console.log in production code
- [ ] No unused imports or variables
- [ ] Error cases handled explicitly
- [ ] No deeply nested conditionals
