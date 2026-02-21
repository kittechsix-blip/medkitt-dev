# MedKitt: Project Overview

> A complete breakdown of everything built, how it works, and the decisions behind it.
> Written for devmorphosis reference.

---

## What Is It

MedKitt is a mobile-first Progressive Web App (PWA) that provides evidence-based clinical decision trees — called **consults** — for emergency medicine physicians. The first consult is a complete **neurosyphilis workup** covering serology interpretation through treatment.

**Live:** https://kittechsix-blip.github.io/em-medkitt/
**Repo:** https://github.com/kittechsix-blip/em-medkitt

## Why It Exists

ER physicians need fast, structured guidance for complex clinical workups at the bedside. "Does this syphilis patient need a lumbar puncture?" has no formal decision tree in the medical literature. This app creates one based on current evidence (CDC 2021 guidelines, JAMA 2025, Lancet 2023, NEJM, IDSA 2025), accessible from a phone during a shift.

## The Pivot

Started as an **Electrobun desktop app** prototype (a framework evaluation for bundling web apps as native desktop apps). Pivoted to PWA because the actual use case is a physician standing at a patient's bedside with their phone — not sitting at a laptop. The Electrobun prototype's app logic was 100% vanilla HTML/CSS/JS in a WebView, so the content transferred 1:1 to a PWA.

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Platform | PWA | Works on any phone, installable, offline-capable |
| Language | Vanilla TypeScript | Zero runtime dependencies, full offline, fast load |
| Styling | CSS custom properties | Dark-first medical theme, consistent design tokens |
| Offline | Service worker (cache-first) | Works on airplane mode after first load |
| Storage | LocalStorage | Session persistence only — no patient data ever stored |
| Build | Bun (`bun x tsc`) | Fast TypeScript compilation |
| Deploy | GitHub Pages from `docs/` | Free, automatic, no CI/CD needed |

**Zero npm runtime dependencies.** No React, no framework, no build toolchain beyond TypeScript compilation. The entire app is static files served from a `docs/` folder.

---

## Architecture

```
em-medkitt/
├── src/                          # TypeScript source
│   ├── models/types.ts           # All interfaces (DecisionNode, Treatment, etc.)
│   ├── services/
│   │   ├── router.ts             # Hash-based SPA router
│   │   ├── storage.ts            # Safe LocalStorage wrapper
│   │   └── tree-engine.ts        # Tree traversal engine (navigation, history, state)
│   ├── components/
│   │   ├── category-grid.ts      # Home screen — 23 EM category cards
│   │   ├── category-view.ts      # Category detail — list of consults
│   │   ├── tree-wizard.ts        # Step-by-step wizard UI (478 lines, the core)
│   │   ├── tree-flowchart.ts     # Decision map overlay (module progress + path trace)
│   │   └── reference-table.ts    # Diagnostic test tables + evidence citations
│   ├── data/
│   │   ├── categories.ts         # 23 EM categories with metadata
│   │   └── trees/
│   │       └── neurosyphilis.ts  # 42 decision nodes across 6 modules (649 lines)
│   └── app.ts                    # Entry point — routes + service worker registration
├── docs/                         # Compiled output — what GitHub Pages serves (176KB total)
│   ├── index.html                # HTML shell with CSP, PWA meta tags
│   ├── style.css                 # Full design system (27KB)
│   ├── sw.js                     # Service worker
│   ├── manifest.json             # PWA install config
│   ├── icons/                    # SVG + PNG icons
│   └── [compiled JS modules]     # 12 JS files mirroring src/ structure
├── CLAUDE.md                     # Project instructions for Claude Code
├── CONSULT_TEMPLATE.md           # Template for building new consults
├── IMPLEMENTATION_PLAN.md        # 12-task build plan
├── PRD.md                        # Full clinical spec (source of truth for content)
├── TECH_STACK.md                 # Architecture decisions
├── FRONTEND_GUIDELINES.md        # Design system docs
└── progress.txt                  # Session-by-session build log
```

**Total source code:** ~2,600 lines of TypeScript across 12 active files.

---

## How It Works

### The Data Model

Everything flows from the `DecisionNode` interface:

```typescript
interface DecisionNode {
  id: string;              // Unique node ID (e.g., 'serology-start')
  type: NodeType;          // 'question' | 'info' | 'result' | 'input'
  module: ModuleNumber;    // 1-6 (maps to phases of the workup)
  title: string;           // Display title
  body: string;            // Clinical content
  citation?: number[];     // Evidence reference numbers
  options?: NodeOption[];  // For questions — the choices
  next?: string;           // For info nodes — where Continue goes
  recommendation?: string; // For results — clinical recommendation
  treatment?: TreatmentRegimen; // For results — drug/dose/duration
  confidence?: Confidence; // For results — definitive/recommended/consider
}
```

A consult is just an array of `DecisionNode` objects. The neurosyphilis consult has 42 nodes.

### The Tree Engine

`TreeEngine` is a class that manages traversal through the node array:

- **`startTree()`** — Initialize a new session from the entry node
- **`selectOption(index)`** — User picks an option, engine navigates to the next node, records the answer
- **`continueToNext()`** — For info nodes, follow the `next` pointer
- **`goBack()`** — Pop the history stack, return to previous node
- **`jumpToHistory(index)`** — Jump back to any visited node (used by the flowchart)
- **`getAnswerHistory()`** — Returns the full decision path for the summary

Every navigation action auto-saves to LocalStorage, so interrupted sessions resume where you left off.

### The Wizard UI

`tree-wizard.ts` (478 lines) is the core UI. It renders one node at a time based on the node type:

- **Question nodes** → Title + body text + option buttons (color-coded by urgency)
- **Info nodes** → Title + body text + "Continue" button
- **Result nodes** → Urgency badge + body + recommendation box + treatment card + expandable citations + decision path summary + Start Over/Home buttons

Treatment cards show:
- First-line drug with dose highlight (monospace teal pill)
- Expandable alternative regimen
- Expandable PCN allergy alternatives
- Expandable follow-up monitoring schedule

### The Decision Map (Flowchart)

A bottom-sheet overlay with two sections:

1. **Module progress bar** — 6 dots showing completed (teal), current (teal + glow), and upcoming (dim) modules
2. **Path trace** — Vertical timeline of every visited node with the answer selected, plus dimmed upcoming branches from the current node

Visited nodes are tappable — clicking one jumps back to that point in the decision flow (history is truncated, answers cleaned up).

### The Reference Page

Standalone page at `#/reference` with:
- 10 CSF diagnostic test performance cards (sensitivity, specificity, clinical role)
- Meta-analysis ranking
- 6 key clinical notes (pearls and pitfalls)
- All 17 evidence citations
- Clinical disclaimer

Result cards also have expandable inline citations showing just the references relevant to that specific recommendation.

### Routing

Hash-based SPA router (`#/`, `#/category/:id`, `#/tree/:id`, `#/reference`). No server needed — works with static file hosting. Browser back/forward supported via `hashchange` listener.

### Offline Strategy

Service worker uses cache-first strategy:
1. On first visit, pre-caches all 17 static assets
2. On subsequent visits, serves from cache (instant load)
3. Falls back to network if not cached
4. Old caches cleaned up when version bumps

The entire app is 176KB. After first load, it works with no network connection.

---

## The Neurosyphilis Consult

### Clinical Flow

6 modules, 42 nodes:

```
Module 1: Serology Interpreter
  → Educational intro (NTT vs treponemal tests)
  → Algorithm selection (Traditional vs Reverse-Sequence)
  → Result interpretation (both reactive, one reactive, nonreactive)
  → Syphilis confirmed / unlikely / false positive endpoints

Module 2: Stage Classification
  → Primary / Secondary / Early Latent / Late Latent / Tertiary / Unknown

Module 3: Symptom Screen
  → Neurologic symptoms (cognitive, motor, CN palsies, meningismus, stroke)
  → Ocular symptoms (vision changes, eye pain)
  → Otic symptoms (hearing loss, tinnitus)

Module 4: LP Decision Engine
  → Determines if lumbar puncture is indicated based on:
    - Neurologic/ocular/otic symptoms
    - Tertiary stage
    - HIV status
    - Treatment failure
    - High RPR titer

Module 5: CSF Interpreter
  → CSF-VDRL result (reactive = diagnostic)
  → CSF parameters if nonreactive (WBC, protein, additional testing)
  → Clinical judgment pathway

Module 6: Treatment
  → Neurosyphilis: IV PCN G 18-24M units/day x 10-14 days
  → Primary/Secondary: Benzathine PCN G 2.4M IM x 1
  → Early Latent: Benzathine PCN G 2.4M IM x 1
  → Late Latent: Benzathine PCN G 2.4M IM weekly x 3
  → All with PCN allergy alternatives + monitoring schedules
```

### Evidence Base

17 curated references including:
- CDC STI Treatment Guidelines 2021
- JAMA Syphilis Review 2025
- Lancet Syphilis Seminar 2023
- NEJM Neurosyphilis Review 2019
- IDSA OI Guidelines 2025
- European RCT on Ceftriaxone vs PCN (Lancet ID 2021)

---

## Design System

Dark-first medical UI optimized for phone screens in clinical environments:

- **Background:** `#0f0f1a` (near-black)
- **Surface:** `#1a1a2e` (dark purple-gray)
- **Primary action:** `#00d4aa` (teal) — used for buttons, dose highlights, active states
- **Danger:** `#ff4757` (red) — critical urgency options
- **Warning:** `#ffa502` (orange) — urgent options, recommended badges
- **Info:** `#3498db` (blue) — consider badges
- **Text:** `#e8e8f0` (off-white)

All colors defined as CSS custom properties — change the tokens, change the whole app.

**Mobile-first constraints:**
- 44px minimum touch targets everywhere
- Safe area padding for notched phones
- Portrait orientation optimized
- No horizontal scrolling
- Card-based layouts (no tables)

---

## Security

- **CSP enforced:** `default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'`
- **No innerHTML with user input** — only used for clearing containers (`= ''`)
- **No eval()** — zero matches in entire codebase
- **No external resources** — everything self-hosted, no CDN
- **No patient data stored** — decision inputs are ephemeral per session
- **LocalStorage** only stores: UI preferences, custom categories, session navigation state

---

## Build Process

The entire build is one command:

```bash
bun x tsc
```

TypeScript compiles `src/` → `docs/`. That's it. No bundler, no minifier, no build pipeline. The `docs/` folder IS the app.

To deploy: `git push`. GitHub Pages serves `docs/` automatically.

---

## What Was Built, Session by Session

### Session 1 (Tasks 0-7): Foundation + Engine
- Created 6 planning documents (PRD, TECH_STACK, FRONTEND_GUIDELINES, IMPLEMENTATION_PLAN, CLAUDE.md, progress.txt)
- Built PWA shell (HTML, CSS design system, manifest, service worker, icons)
- Set up TypeScript with data model interfaces
- Built hash router and app entry point
- Built category grid (23 EM categories) and category view
- Created all 42 neurosyphilis decision nodes (649 lines of clinical data)
- Built TreeEngine for navigation, history, state management

### Session 2 (Tasks 8-10): UI + Visualization
- Built the wizard UI component (478 lines — the core of the app)
- Added serology test reference descriptions per user request
- Verified all result cards and treatment displays
- Built the decision map overlay (module progress bar + path trace)
- End-to-end tested through all 6 modules

### Session 3 (Tasks 11-12): Reference + Ship
- Built reference tables (diagnostic test performance, clinical notes, 17 citations)
- Added inline expandable citations on result cards
- Security review, accessibility audit (fixed heading hierarchy)
- Full end-to-end browser test
- Enabled GitHub Pages deployment
- Renamed app to MedKitt, updated icon
- Created consult template for future clinical workups
- Tested on iPhone, verified PWA install

---

## Stats

| Metric | Value |
|--------|-------|
| Source files | 12 active TypeScript files |
| Lines of code | ~2,600 lines TypeScript + ~850 lines CSS |
| Decision nodes | 42 (21 question, 10 info, 10 result, 1 input) |
| Treatment endpoints | 5 with full drug cards |
| Evidence citations | 17 |
| EM categories | 23 + custom Add |
| Deployed size | 176KB total |
| Dependencies | 0 runtime, 1 dev (TypeScript) |
| Build command | `bun x tsc` |
| Sessions to build | 3 |
| Git commits | 9 |

---

## Template for New Consults

The app is designed as a platform. Adding a new consult (e.g., DKA Management, Stroke Code) follows a documented template (`CONSULT_TEMPLATE.md`):

1. Provide clinical content (decision flow, evidence, treatments)
2. Create data file with DecisionNode array
3. Register in categories, wire into wizard
4. Compile, test, push

The wizard UI, flowchart, reference system, and treatment cards all work automatically with any new consult data — no UI code changes needed.

---

## Key Lessons

- **No framework needed** — vanilla TypeScript + DOM APIs are enough for a focused clinical tool
- **One task per session** kept each session focused and productive across 3 sessions
- **Cache-first service worker** means instant loads but requires version bumping for updates
- **Card-based layouts** work better than tables on mobile for clinical reference data
- **Expandable `<details>` elements** reduce cognitive load — show the essential info first, details on demand
- **Module progress + path trace** is more practical than a full flowchart on a phone screen
- **Session persistence** matters — physicians get interrupted constantly, the app remembers where they were
- **Evidence citations on every recommendation** builds trust — physicians want to see the source
