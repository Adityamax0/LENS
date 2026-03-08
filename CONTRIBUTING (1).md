# Contributing to LENS

Thank you for your interest in contributing to LENS. This document outlines the process for contributing to keep the codebase clean and the audit engine trustworthy.

---

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/lens.git`
3. **Install** dependencies: `npm install`
4. **Create a branch**: `git checkout -b feat/your-feature-name`

---

## Branch Naming Convention

| Type | Format | Example |
|------|--------|---------|
| Feature | `feat/description` | `feat/playwright-support` |
| Bug Fix | `fix/description` | `fix/diff-threshold` |
| Docs | `docs/description` | `docs/update-readme` |
| Chore | `chore/description` | `chore/upgrade-puppeteer` |

---

## Commit Messages

LENS enforces structured commits. Use the following format:

```
type(scope): short description

[optional body]
[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Examples:**
```
feat(capture): add multi-viewport screenshot support
fix(notifier): handle missing Slack webhook gracefully
docs(readme): update CI/CD integration section
```

> Note: Commits prefixed with `AUTONOMOUS REPAIR:` are reserved for the LENS bot.

---

## Pull Request Process

1. Ensure `npm run audit` passes with zero violations on your branch
2. Update `DESIGN_CONTRACT.md` if you're adding new design tokens
3. Add/update tests if applicable
4. Fill out the PR template completely
5. Request a review from a maintainer

---

## Code Style

- Use `const`/`let` — never `var`
- Async/await over raw Promises
- Descriptive variable names over short abbreviations
- Comment the *why*, not the *what*

---

## Reporting Issues

When filing a bug, include:
- LENS version (`npm list lens`)
- Node.js version (`node -v`)
- The generated `audit_report.md` if applicable
- Steps to reproduce

---

## Security

If you discover a security vulnerability, **do not** open a public issue. Contact the maintainers directly.

---

*Every contribution runs through the LENS audit pipeline. See Everything. Break Nothing.*
