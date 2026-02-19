# Tech Stack: EM Decision Tree PWA

> **Last Updated:** 2026-02-19

---

## Architecture

**Progressive Web App (PWA)** — mobile-first, fully offline, zero backend.

### Why PWA (not Electrobun)
- Primary use case: phone at bedside in the ED
- Electrobun = desktop only (macOS/Windows/Linux), no mobile support
- PWA gives "Add to Home Screen" on iPhone — native-feeling, full-screen, no browser chrome
- Service worker = fully offline (works in airplane mode)
- GitHub Pages deployment = free, instant updates, same workflow as Workflow Kitt
- Desktop works too — any browser can access it
- Zero download — no 60MB bundle to install

### Decision: Electrobun was evaluated and documented in em-medkitt README.md as a framework assessment. The clinical tool pivots to PWA for mobile access.

---

## Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Language** | Vanilla TypeScript | No framework — compiled to JS via Bun or tsc |
| **Markup** | Semantic HTML5 | Accessibility-first, screen reader compatible |
| **Styling** | Vanilla CSS | CSS custom properties (design tokens), no preprocessor |
| **Offline** | Service Worker | Cache-first strategy for all static assets |
| **Manifest** | Web App Manifest | `display: standalone`, portrait, theme color |
| **Storage** | LocalStorage | Session state, user preferences, custom categories |
| **Routing** | Hash-based SPA | Client-side, no server needed (`#/category/infectious-disease`) |
| **Build** | Bun | TypeScript compilation, no bundler needed for vanilla app |
| **Deployment** | GitHub Pages | Static hosting, HTTPS by default |
| **Icons** | Emoji + SVG | Category icons use emoji; app icons are SVG/PNG |
| **Fonts** | System stack | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| **Monospace** | SF Mono / Monaco | For dosing values and clinical data |

---

## No External Dependencies

- No React, Vue, Svelte, or any UI framework
- No Tailwind, Bootstrap, or CSS framework
- No npm packages at runtime
- No API calls, no backend, no database
- No analytics or tracking (privacy-first for clinical use)
- No CDN dependencies — everything ships with the app

---

## File Structure (planned)

```
em-medkitt/
├── docs/                          # GitHub Pages serves from here
│   ├── index.html                 # Single page app shell
│   ├── style.css                  # Global styles + design tokens
│   ├── app.js                     # Compiled TypeScript → JS
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # Service worker
│   ├── icons/                     # App icons (192px, 512px)
│   └── data/
│       ├── categories.json        # Category definitions
│       └── trees/
│           └── neurosyphilis.json # Decision tree data
├── src/                           # TypeScript source
│   ├── app.ts                     # App entry point + router
│   ├── components/                # UI components
│   │   ├── category-grid.ts       # Home screen category grid
│   │   ├── tree-wizard.ts         # Step-by-step wizard
│   │   ├── tree-flowchart.ts      # Visual flowchart mini-map
│   │   ├── result-card.ts         # Treatment recommendation display
│   │   └── reference-table.ts     # Test performance / monitoring tables
│   ├── data/                      # Decision tree data
│   │   ├── categories.ts          # Category definitions
│   │   └── trees/
│   │       └── neurosyphilis.ts   # Neurosyphilis decision tree nodes
│   ├── models/                    # TypeScript interfaces
│   │   └── types.ts               # DecisionNode, Category, TreeSession, etc.
│   ├── services/                  # Business logic
│   │   ├── tree-engine.ts         # Navigation, answer tracking, branching logic
│   │   ├── storage.ts             # LocalStorage abstraction
│   │   └── router.ts              # Hash-based routing
│   └── utils/                     # Helpers
│       └── dom.ts                 # DOM manipulation utilities
├── PRD.md                         # Clinical spec + decision tree logic
├── CLAUDE.md                      # Project instructions
├── TECH_STACK.md                  # This file
├── FRONTEND_GUIDELINES.md         # Design system
├── IMPLEMENTATION_PLAN.md         # Build checklist
├── progress.txt                   # Session tracking
└── README.md                      # Existing Electrobun readme (legacy)
```

---

## PWA Requirements

### Service Worker (`sw.js`)
```
Cache name: em-medkitt-v{version}
Strategy: Cache-first, network-fallback
Cached assets: index.html, style.css, app.js, manifest.json, all data/*.json
Update: New service worker activates on next visit after deploy
```

### Web App Manifest (`manifest.json`)
```json
{
  "name": "EM Decision Trees",
  "short_name": "EM Trees",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#0f0f1a",
  "background_color": "#0f0f1a",
  "start_url": "/em-medkitt/",
  "scope": "/em-medkitt/",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### LocalStorage Keys
| Key | Type | Purpose |
|-----|------|---------|
| `em-tree-session` | JSON | Current in-progress tree session |
| `em-tree-history` | JSON | Recently completed tree sessions |
| `em-custom-categories` | JSON | User-created categories |
| `em-preferences` | JSON | UI preferences (flowchart visible, etc.) |

---

## Security Considerations

- No user input is sent to any server (no network requests)
- No patient data is stored (decision inputs are ephemeral per session)
- LocalStorage contains only UI preferences and category metadata
- Content Security Policy: restrict to self-hosted assets only
- No eval(), no inline scripts, no dynamic script loading
- All clinical content is static, versioned, and auditable in git
