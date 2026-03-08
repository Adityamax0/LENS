# LENS Guardian: Design Contract

This document serves as the **Master Source of Truth** for the LENS Semantic UI Architecture. All future visual regression remediations, auto-patches, and UI enhancements must strictly adhere to the semantic variables defined herein. Hard-coded values (e.g., `#ef4444`, `16px`) are strictly prohibited in patches if a corresponding semantic variable exists.

## 1. Core Semantic Variables (Source: `styles.css`)
The following CSS variables dictate the entire visual language of the application.

### Background Colors
- **`--bg-main`**: `#0f172a` (Primary app background)
- **`--bg-card`**: `#1e293b` (Elevated surfaces, stats cards, tables)
- **`--bg-sidebar`**: `#0b1120` (Left navigation sidebar)

### Typography
- **`--text-primary`**: `#f8fafc` (Headings, primary data, active links)
- **`--text-secondary`**: `#94a3b8` (Subtext, labels, inactive links)

### Brand & Interactive Elements
- **`--accent`**: `#6366f1` (Primary buttons, icons, active states)
- **`--accent-hover`**: `#4f46e5` (Hover states for primary elements)
- **`--border-color`**: `rgba(255, 255, 255, 0.1)` (Dividers, card borders, table rows)

### Status Indicators
- **`--error`**: `#ef4444` (High severity visual flags, alerts, destructive actions)
- **`--success`**: `#10b981` (Resolved issues, system health status)

## 2. LENS Guardian Protocols

### A. Semantic Awareness
Every proposed fix will be vetted against this contract. If the visual delta indicates a color shift from `--error` to a rogue hex like `#ff0000`, the patch generated will **enforce** `--error` rather than matching the rogue hex.

### B. Predictive Impact Analysis
Before applying a patch:
1. **Scope Search:** The engine will evaluate the CSS selector being modified.
2. **Impact Radius:** It will determine if modifying `.btn-primary`, for instance, will inadvertently break `.login-button` or `.refresh-btn`.
3. **High-Risk Flagging:** If a conflict exists, the patch will either scope the fix to the specific DOM node (`.header-actions .btn-primary`) or resolve the global conflict transparently.

### C. Autonomous Resolution Formatting
All future `audit_report.md` logs will include:
1. **Visual Delta**
2. **Root Cause**
3. **Design Contract Violation Analysis**
4. **Remediation Plan (Semantic Code Patch)**
5. **System Confidence Score (0-100%)**

---
*Signed: Sentinel-AI, LENS Guardian*
