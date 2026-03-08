<div align="center">

```
██╗     ███████╗███╗   ██╗███████╗
██║     ██╔════╝████╗  ██║██╔════╝
██║     █████╗  ██╔██╗ ██║███████╗
██║     ██╔══╝  ██║╚██╗██║╚════██║
███████╗███████╗██║ ╚████║███████║
╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝
```

**Layout Error Navigation System**

*An autonomous, self-healing UI guardian that enforces your Design System — automatically.*

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-Latest-40B5A4?style=flat-square&logo=googlechrome&logoColor=white)](https://pptr.dev)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](./LICENSE)
[![CI Status](https://img.shields.io/badge/CI%2FCD-Ready-brightgreen?style=flat-square&logo=githubactions&logoColor=white)](./github/workflows)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-ff69b4?style=flat-square)](./CONTRIBUTING.md)

</div>

---

## ◈ What is LENS?

LENS is a **zero-touch, closed-loop visual regression engine**. It's not a simple screenshot diff tool — it's a *Semantic UI Guardian* that:

- 🔍 **Detects** hard-coded hex values, `!important` overrides, and CSS drift in real-time
- 📋 **Reports** structured audit logs with exact file locations and severity ratings
- 🔧 **Remediates** violations *autonomously* by patching rogue values back to Design Contract tokens
- 🚀 **Integrates** directly into your CI/CD pipeline — blocking bad code before it ever ships

> Think of LENS as a linter, a visual tester, and a self-healing agent rolled into one.

---

## ◈ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        LENS AUDIT LOOP                          │
│                                                                 │
│   PR / Push ──► capture.js ──► pixelmatch ──► Violation?        │
│                     │                            │              │
│               DOM style scan              ┌──────▼──────┐       │
│               vs DESIGN_CONTRACT          │ audit_report │      │
│                                           │     .md      │      │
│                                           └──────┬───────┘      │
│                                                  │              │
│                                         ┌────────▼────────┐     │
│                                         │  notifier.js    │     │
│                                         │  Email + Slack  │     │
│                                         └────────┬────────┘     │
│                                                  │              │
│                                         ┌────────▼────────┐     │
│                                         │  Auto-Patch CSS │     │
│                                         │  AST Transform  │     │
│                                         └────────┬────────┘     │
│                                                  │              │
│                                         ✅ AUTONOMOUS COMMIT     │
└─────────────────────────────────────────────────────────────────┘
```

---

## ◈ File Taxonomy

| File | Role | Description |
|------|------|-------------|
| `DESIGN_CONTRACT.md` | 📜 Master Source of Truth | All approved design tokens & semantic CSS variables |
| `styles.css` | 🎨 Core Stylesheet | UI styles mapped exclusively to Design Contract variables |
| `capture.js` | 🔬 Audit Engine | Puppeteer-driven headless browser — captures, diffs, patches |
| `notifier.js` | 📡 Alerting Layer | Email & Slack webhook dispatcher for drift events |
| `app.js` | ⚙️ App Server | Local dev server orchestration |
| `index.html` | 🖥️ Target UI | The interface under surveillance |
| `audit_report.md` | 📊 Dynamic Output | Generated violation report with severity flags & patches |
| `package.json` | 📦 Dependency Manager | NPM scripts, Puppeteer, pixelmatch |

---

## ◈ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Serve the Application
```bash
# Option A — Node server
npm run start

# Option B — Python server
python -m http.server 8080
```

### 3. Capture Golden Baseline *(first run only)*
```bash
npm run capture:baseline
```

### 4. Run Audit Loop
```bash
npm run audit
```

### 5. Trigger Autonomous Self-Heal
```bash
npm run remediate
```

---

## ◈ The Audit Pipeline

### 🔴 Detection
The headless engine navigates to the target environment, captures `current.png`, and compares it against `baseline.png` using **pixelmatch**. Simultaneously, it scans the computed DOM styles for:
- Hard-coded hex values (e.g., `#ff0000` instead of `var(--error)`)
- `!important` overrides that bypass the Design Contract
- Element visibility mutations (e.g., `display: none` on critical UI elements)

### 🟡 Report Generation
When a violation is found, LENS generates a structured `audit_report.md`:

```markdown
# LENS Guardian Audit Report
**Status:** 🚨 High-Risk Style Drift Detected

- **Violation:** Hard-coded hex `#ff0000` overrides semantic system
- **Location:** `.login-button` in `styles.css:294`
- **Severity:** HIGH — Breaks Dark Mode & Accessibility Guidelines
- **Semantic Patch:** Replace `#ff0000 !important` with `var(--error)`
```

### 🟢 Autonomous Remediation
LENS maps the rogue value to the closest approved token in the Design Contract, executes an AST transformation on the stylesheet, verifies compliance, and commits using the standardized format:

```
AUTONOMOUS REPAIR: Resolved style drift via Design Contract enforcement (Token: var(--error))
```

---

## ◈ CI/CD Integration

LENS is built for pipeline-first workflows. Drop this into your `.github/workflows/lens-audit.yml`:

```yaml
name: LENS Visual Audit

on:
  pull_request:
  push:
    branches: [main]

jobs:
  lens-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Start Dev Server
        run: |
          python -m http.server 8080 &
          npx wait-on http://localhost:8080

      - name: Run LENS Audit
        run: npm run audit

      - name: Upload Audit Report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: lens-audit-report
          path: audit_report.md
```

---

## ◈ Design Contract

The `DESIGN_CONTRACT.md` is the **single source of truth** for all visual decisions. LENS enforces it automatically — any deviation triggers the audit pipeline.

```css
/* ✅ COMPLIANT — uses semantic token */
.login-button {
  background-color: var(--primary);
  color: var(--on-primary);
  border: 1px solid var(--border);
}

/* 🚨 VIOLATION — hard-coded value detected */
.login-button {
  background-color: #1a73e8 !important;
}
```

---

## ◈ NPM Scripts Reference

| Command | Action |
|---------|--------|
| `npm run start` | Start local dev server |
| `npm run capture:baseline` | Capture golden baseline screenshot |
| `npm run audit` | Execute full audit loop (detect + report) |
| `npm run remediate` | Force autonomous patch (self-heal) |

---

## ◈ Roadmap

- [x] Headless visual capture engine
- [x] pixelmatch diff comparison
- [x] Email + Slack alerting via `notifier.js`
- [x] Autonomous CSS remediation with AST transforms
- [x] Structured audit report generation
- [ ] **Docker containerization** for cloud-native CI
- [ ] **Multi-browser support** via Playwright (WebKit, Firefox)
- [ ] **Mobile viewport simulation** for responsive regression testing
- [ ] **LLM-assisted patch suggestions** for complex layout drift
- [ ] **Dashboard UI** for historical audit visualization

---

## ◈ Tech Stack

<div align="center">

| Layer | Technology |
|-------|------------|
| Browser Automation | Puppeteer (Headless Chrome) |
| Visual Diff | pixelmatch + pngjs |
| Runtime | Node.js 18+ |
| Dev Server | Python HTTP Server / npm |
| Notifications | Nodemailer + Slack Webhooks |
| CI/CD | GitHub Actions |

</div>

---

## ◈ Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change. All PRs run through the LENS audit pipeline automatically.

---

## ◈ License

MIT — see [LICENSE](./LICENSE) for details.

---

<div align="center">

**Built to eliminate silent UI regressions. Forever.**

*LENS — See Everything. Break Nothing.*

</div>
