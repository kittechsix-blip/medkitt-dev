# EM Decision Tree PWA — Project Instructions

> Read this file at the start of every session working on this project.

---

## Project Overview

**What:** Mobile-first PWA for EM clinical decision trees. First tree: Neurosyphilis workup.
**Who:** Andy, EM physician at Dell Seton Medical Center.
**Where:** `~/Desktop/em-medkitt/`
**Deploy:** GitHub Pages from `docs/` directory.
**Status:** Foundation docs complete. Building from IMPLEMENTATION_PLAN.md.

## Key Files

| File | Purpose |
|------|---------|
| `PRD.md` | Full clinical spec — decision tree logic, evidence, data model |
| `TECH_STACK.md` | Architecture decisions, file structure, PWA requirements |
| `FRONTEND_GUIDELINES.md` | Design system, color palette, component patterns, security rules |
| `IMPLEMENTATION_PLAN.md` | Numbered task list — build from the next incomplete task |
| `progress.txt` | Session-by-session progress log |
| `docs/` | GitHub Pages deployment directory (built app lives here) |
| `src/` | TypeScript source code |

## Build Workflow

Each session:
1. Read this file + `progress.txt` + `IMPLEMENTATION_PLAN.md`
2. Find the next incomplete task
3. Tell the user what you're implementing and why
4. Implement it following patterns in `FRONTEND_GUIDELINES.md`
5. Test it works
6. Check for security issues
7. Update `CLAUDE.md` status and `progress.txt`
8. STOP — one task per session

## Technical Rules

- **Vanilla TypeScript** — no frameworks, no npm runtime dependencies
- **CSS custom properties** — all colors from design tokens, never hardcode hex values
- **Mobile-first** — 44px minimum touch targets, safe areas, portrait orientation
- **Offline-first** — service worker caches everything, works without network
- **No innerHTML with user input** — use textContent or DOM APIs
- **No eval()** — no dynamic code execution
- **No external resources** — everything self-hosted, no CDN
- **No patient data stored** — decision inputs are ephemeral per session
- **CSP enforced** — via meta tag in index.html

## Design System

- Dark theme: `--color-bg: #0f0f1a`, `--color-surface: #1a1a2e`
- Primary action: `--color-primary: #00d4aa` (teal)
- Urgency: `--color-danger: #ff4757` (red), `--color-warning: #ffa502` (orange)
- Decisions: `--color-info: #3498db` (blue)
- Dosing values: `.dose-highlight` class (monospace teal pill)
- Full palette in `FRONTEND_GUIDELINES.md`

## Clinical Content

- All decision tree logic is in `PRD.md` — the source of truth
- 17 evidence citations — never invent clinical content
- Neurosyphilis tree has 6 modules: Serology → Stage → Symptoms → LP Decision → CSF Interpreter → Treatment
- Treatment includes full drug/dose/duration + PCN allergy alternatives

## Category System

23 EM categories (alphabetical) + custom "Add" option. Only Infectious Disease has content initially. Categories: Airway, Cardiology, Critical Care, Dermatology, Drugs, Emergency Medicine, Endocrinology, Gastroenterology, Hematology, Infectious Disease, Nerve Blocks, Neurology, OB/GYN, Orthopedics, Pediatrics, Procedures, Pulmonology, Renal, Rheumatology, Toxicology, Trauma, Ultrasound.

## Current Status

- [x] Task 0: Foundation documents (PRD, CLAUDE, TECH_STACK, FRONTEND_GUIDELINES, IMPLEMENTATION_PLAN, progress.txt)
- [x] Task 1: PWA Shell & Project Scaffolding
- [x] Task 2: TypeScript Setup & Data Model
- [x] Task 3: Hash Router & App Entry Point
- [x] Task 4: Category Grid (Home Screen)
- [x] Task 5: Category View & Tree List
- [x] Task 6: Neurosyphilis Decision Tree Data
- [x] Task 7: Tree Engine (Navigation & State)
- [x] Task 8: Wizard UI Component
- [x] Task 9: Result Card & Treatment Display
- [x] Task 10: Visual Flowchart Mini-Map
- [ ] Task 11: Reference Tables & Info Panels
- [ ] Task 12: Build, Test & Deploy
