# Implementation Plan: EM Decision Tree PWA

> **Last Updated:** 2026-02-19
> **Total Tasks:** 12
> **Status:** Task 0 complete (this document)

---

## Task 1: PWA Shell & Project Scaffolding
**Status:** Complete
**Files:** `docs/index.html`, `docs/style.css`, `docs/manifest.json`, `docs/sw.js`, `docs/icons/`
**Description:**
- Create `docs/` directory for GitHub Pages deployment
- Build the HTML shell with meta tags, CSP, manifest link, viewport, safe areas
- Port the CSS design system from `src/views/style.css` (all custom properties, core styles)
- Add mobile-first base styles (touch targets, safe areas, bottom nav)
- Create PWA manifest with app name, icons, theme color, standalone display
- Create service worker with cache-first offline strategy
- Create placeholder app icon (192px, 512px)
- Verify: opens in browser, installs as PWA, works offline after first load
**Security:** CSP meta tag, no inline scripts, no external resources

## Task 2: TypeScript Setup & Data Model
**Status:** Complete
**Files:** `src/models/types.ts`, `tsconfig.json`
**Description:**
- Configure TypeScript compilation (target ES2020, strict mode)
- Implement all interfaces from PRD.md Section 4: DecisionNode, NodeOption, NodeInput, ResultNode, TreatmentRegimen, DrugRegimen, Category, DecisionTreeMeta, TreeSession
- Verify: `tsc --noEmit` passes with no errors

## Task 3: Hash Router & App Entry Point
**Status:** Complete
**Files:** `src/services/router.ts`, `src/app.ts`
**Description:**
- Implement hash-based SPA router (`#/`, `#/category/:id`, `#/tree/:id`, `#/tree/:id/node/:nodeId`)
- App entry point: initialize router, render initial view
- Route → component mapping
- Browser back/forward button support via `hashchange` event
- Compile and verify: navigation between routes works in browser

## Task 4: Category Grid (Home Screen)
**Status:** Complete
**Files:** `src/components/category-grid.ts`, `src/data/categories.ts`
**Description:**
- Define all 23 categories + Add button as data
- Render responsive grid (3 columns on phone, more on wider screens)
- Each category card: emoji icon, name, count of available trees
- "Add" card: opens simple prompt for custom category name
- Store custom categories in LocalStorage
- Verify: grid renders, tap navigates to category view, custom categories persist

## Task 5: Category View & Tree List
**Status:** Complete
**Files:** `src/components/category-view.ts`
**Description:**
- Show category header (icon, name)
- List available decision trees within the category
- Each tree card: title, subtitle, node count
- Tap navigates to tree wizard view
- Empty state for categories with no trees yet ("Coming soon")
- Back navigation to home

## Task 6: Neurosyphilis Decision Tree Data
**Status:** Complete
**Files:** `src/data/trees/neurosyphilis.ts`
**Description:**
- Encode all 6 modules from PRD.md as DecisionNode objects
- Module 1: Serology Interpreter (traditional + reverse-sequence branches)
- Module 2: Stage Classification
- Module 3: Symptom Screen (neurologic, ocular, otic)
- Module 4: LP Decision Engine (including HIV advanced toggle)
- Module 5: CSF Interpreter (input fields for WBC, protein, VDRL)
- Module 6: Treatment Recommendations (all regimens with citations)
- Include diagnostic test performance data as reference nodes
- Include all evidence citations as node metadata
- Verify: data loads without errors, all node IDs resolve, no broken links

## Task 7: Tree Engine (Navigation & State)
**Status:** Complete
**Files:** `src/services/tree-engine.ts`, `src/services/storage.ts`
**Description:**
- TreeEngine class: start tree, navigate to node, go back, record answer
- Evaluate branching logic based on accumulated answers
- Handle checkbox nodes (multiple selections → conditional branching)
- Handle input nodes (CSF values → threshold-based branching)
- TreeSession management: save/restore in-progress sessions via LocalStorage
- Storage service: safe LocalStorage wrapper with JSON parse/stringify
- Verify: engine correctly traverses all paths in neurosyphilis tree

## Task 8: Wizard UI Component
**Status:** Complete
**Files:** `src/components/tree-wizard.ts`
**Description:**
- Render one decision node at a time (question, info, input, or result)
- Progress indicator (Module X of 6)
- Back button with history stack
- Option buttons (radio for single-select, checkboxes for multi-select)
- Input fields for CSF values with appropriate labels and units
- Transition animations between nodes
- Flowchart toggle button at bottom
- Verify: complete walkthrough of neurosyphilis tree via wizard

## Task 9: Result Card & Treatment Display
**Status:** Complete (built as part of Task 8 wizard)
**Files:** `src/components/result-card.ts`
**Description:**
- Color-coded urgency header (critical=red, recommended=orange, routine=teal)
- Treatment regimen display with dose-highlight styling
- Expandable sections: PCN allergy alternatives, monitoring schedule, references
- "Start Over" button to reset tree
- Verify: all terminal nodes display correct treatment with proper formatting

## Task 10: Visual Flowchart Mini-Map
**Status:** Complete
**Files:** `src/components/tree-flowchart.ts`
**Description:**
- Render decision tree as visual flowchart (simplified node graph)
- Highlight current position in the tree
- Show completed path vs remaining branches
- Color-code nodes by type (question=blue, result=teal/red, info=gray)
- Tappable nodes (jump to specific point if already visited)
- Toggle overlay from wizard view
- Verify: flowchart accurately reflects tree structure and current position

## Task 11: Reference Tables & Info Panels
**Status:** Not Started
**Files:** `src/components/reference-table.ts`
**Description:**
- Diagnostic test performance table (from PRD.md Section 3)
- Treatment monitoring schedule table
- Evidence citations panel with expandable references
- Accessible from result cards and as standalone reference
- Responsive table design for mobile (horizontal scroll or card layout)

## Task 12: Build, Test & Deploy
**Status:** Not Started
**Files:** All
**Description:**
- Final TypeScript compilation to `docs/app.js`
- Update service worker cache list with all assets
- Cross-browser testing (Safari iOS, Chrome, Firefox)
- PWA installation test on iPhone
- Offline mode test (airplane mode after first load)
- Accessibility audit (VoiceOver, keyboard navigation)
- Security review (CSP, no innerHTML with user data, no eval)
- Create GitHub repository or update existing em-medkitt repo
- Enable GitHub Pages from `docs/` directory
- Verify: full end-to-end test of neurosyphilis workup on iPhone

---

## Dependencies

```
Task 1 (PWA Shell) → blocks all other tasks
Task 2 (Data Model) → blocks Tasks 4, 5, 6, 7
Task 3 (Router) → blocks Tasks 4, 5, 8
Task 6 (Tree Data) → blocks Tasks 7, 8, 9, 10
Task 7 (Tree Engine) → blocks Tasks 8, 9, 10
Tasks 8, 9, 10, 11 can be parallelized after dependencies met
Task 12 (Deploy) → requires all other tasks complete
```
