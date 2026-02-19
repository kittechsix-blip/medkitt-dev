# Frontend Guidelines: EM Decision Tree PWA

> **Last Updated:** 2026-02-19
> **Design Philosophy:** Dark-first medical UI optimized for night shifts and bedside use.

---

## Color Palette

### Core Colors (inherited from em-medkitt)

| Token | Hex | RGB | Role |
|-------|-----|-----|------|
| `--color-bg` | `#0f0f1a` | 15, 15, 26 | App background — near-black for low eye strain |
| `--color-surface` | `#1a1a2e` | 26, 26, 46 | Card/panel backgrounds |
| `--color-surface-hover` | `#252542` | 37, 37, 66 | Hover states on surfaces |
| `--color-border` | `#2d2d4a` | 45, 45, 74 | Subtle borders and dividers |
| `--color-text` | `#e8e8ec` | 232, 232, 236 | Primary text |
| `--color-text-muted` | `#9a9ab0` | 154, 154, 176 | Secondary text, labels, captions |

### Semantic Colors

| Token | Hex | Role | Used For |
|-------|-----|------|----------|
| `--color-primary` | `#00d4aa` | Teal — primary action | Active states, dose highlights, CTAs |
| `--color-primary-dark` | `#00b894` | Teal dark — hover | Primary button hover |
| `--color-danger` | `#ff4757` | Red — urgent/critical | LP required, treat now, critical alerts |
| `--color-warning` | `#ffa502` | Orange — caution | Consider LP, borderline results |
| `--color-info` | `#3498db` | Blue — informational | Decision branch points, info panels |

### Decision Tree Node Colors

| Node Type | Background | Border | Text Color |
|-----------|-----------|--------|------------|
| Question | `rgba(52, 152, 219, 0.1)` | `--color-info` | `--color-text` |
| Action/Result (routine) | `rgba(0, 212, 170, 0.1)` | `--color-primary` | `--color-text` |
| Action/Result (urgent) | `rgba(255, 71, 87, 0.1)` | `--color-danger` | `--color-text` |
| Action/Result (consider) | `rgba(255, 165, 2, 0.1)` | `--color-warning` | `--color-text` |
| Info/Reference | `var(--color-surface)` | `--color-border` | `--color-text-muted` |

### Category Badge Colors (drug categories, inherited)

| Token | Hex | Category |
|-------|-----|----------|
| `--color-cardiac` | `#ff6b6b` | Cardiac medications |
| `--color-pain` | `#feca57` | Pain management |
| `--color-sedation` | `#48dbfb` | Sedation agents |
| `--color-paralytic` | `#ff9ff3` | Paralytics |

---

## Typography

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Body text | System sans-serif | 16px | 400 | `--color-text` |
| Section headers | System sans-serif | 20-24px | 600 | `--color-text` |
| Labels / captions | System sans-serif | 12-13px | 500-600 | `--color-text-muted` |
| Drug doses / clinical values | SF Mono, Monaco, monospace | 14px | 400 | `--color-primary` |
| Node question text | System sans-serif | 18px | 500 | `--color-text` |
| Option buttons | System sans-serif | 16px | 500 | `--color-text` |

### Font Stacks
```css
--font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-mono: 'SF Mono', Monaco, monospace;
```

---

## Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Buttons, small cards |
| `--radius-md` | 10px | Cards, panels |
| `--radius-lg` | 14px | Modals, large containers |
| `--shadow-sm` | `0 2px 4px rgba(0,0,0,0.3)` | Subtle elevation |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | Cards on hover |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | Modals, overlays |

---

## Mobile-First Patterns

### Touch Targets
- Minimum 44x44px (Apple HIG)
- Option buttons: full-width, minimum 48px height
- Back button: prominent, top-left or swipe-right gesture
- Bottom navigation bar for primary actions (thumb zone)

### Responsive Breakpoints
| Breakpoint | Target |
|-----------|--------|
| 0-428px | iPhone (primary) |
| 429-768px | Tablet |
| 769px+ | Desktop |

### Safe Areas
```css
padding-bottom: env(safe-area-inset-bottom); /* iPhone notch/home indicator */
padding-top: env(safe-area-inset-top);
```

---

## Component Patterns

### Wizard Step Card
```
┌─────────────────────────────────┐
│ ← Back          Module 3 of 6  │  ← header with progress
├─────────────────────────────────┤
│                                 │
│  Does the patient have          │  ← question text (18px, bold)
│  neurologic symptoms?           │
│                                 │
│  ┌─────────────────────────┐    │
│  │ ☑ Cognitive dysfunction │    │  ← checkbox options
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ ☐ Motor/sensory deficits│    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ ☐ Cranial nerve palsies │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │     Continue →           │    │  ← primary action button
│  └─────────────────────────┘    │
│                                 │
│  📋 View flowchart              │  ← toggle to flowchart view
└─────────────────────────────────┘
```

### Result Card
```
┌─────────────────────────────────┐
│ 🔴 LP INDICATED                 │  ← color-coded urgency header
├─────────────────────────────────┤
│                                 │
│  Based on: neurologic symptoms  │
│  present (cranial nerve palsy)  │
│                                 │
│  TREATMENT                      │
│  ┌─────────────────────────┐    │
│  │ Aqueous crystalline     │    │
│  │ penicillin G             │    │
│  │ 18-24M units/day IV     │    │  ← dose-highlight class
│  │ 3-4M units q4h          │    │
│  │ Duration: 10-14 days    │    │
│  └─────────────────────────┘    │
│                                 │
│  ▸ PCN allergy alternatives     │  ← expandable section
│  ▸ Monitoring schedule          │
│  ▸ References                   │
│                                 │
│  ┌─────────────────────────┐    │
│  │   Start Over             │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

### Dose Highlight
```css
.dose-highlight {
  background: rgba(0, 212, 170, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-mono);
  color: var(--color-primary);
}
```

### Category Grid
```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ 🫁       │ │ ❤️       │ │ 🏥       │
│ Airway   │ │ Cardio   │ │ Crit Care│
└──────────┘ └──────────┘ └──────────┘
┌──────────┐ ┌──────────┐ ┌──────────┐
│ 🔬       │ │ 💊       │ │ 🚑       │
│ Derm     │ │ Drugs    │ │ EM       │
└──────────┘ └──────────┘ └──────────┘
...
┌──────────┐
│ ➕       │
│ Add      │
└──────────┘
```

---

## CSS Class Conventions

| Pattern | Example | Purpose |
|---------|---------|---------|
| `.btn-{variant}` | `.btn-primary`, `.btn-secondary` | Button styles |
| `.node-{type}` | `.node-question`, `.node-result` | Decision tree node styling |
| `.urgency-{level}` | `.urgency-critical`, `.urgency-routine` | Color-coded urgency |
| `.module-{n}` | `.module-3` | Module-specific styling |
| `.dose-highlight` | — | Monospace teal pill for dosing values |
| `.algo-step` | `.algo-step.decision`, `.algo-step.action` | Algorithm step cards |

---

## Hover & Interaction States

All hover effects use CSS only — **never use JavaScript hover handlers**.

```css
/* Standard hover pattern */
.interactive-element {
  transition: all 0.2s;
}
.interactive-element:hover {
  border-color: var(--color-primary);
  /* or background: var(--color-surface-hover); */
}

/* Active/selected state */
.interactive-element.active {
  background: rgba(0, 212, 170, 0.15);
  color: var(--color-primary);
}
```

---

## Accessibility Checklist

- [ ] All interactive elements are focusable and have visible focus indicators
- [ ] Color is never the sole means of conveying information
- [ ] Contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- [ ] All images and icons have alt text or aria-labels
- [ ] Semantic HTML: `<nav>`, `<main>`, `<section>`, `<button>`, `<form>`
- [ ] `role` and `aria-*` attributes where semantic HTML is insufficient
- [ ] Skip-to-content link for keyboard users
- [ ] Reduced motion support: `@media (prefers-reduced-motion: reduce)`

---

## Security Rules

- No `innerHTML` with user input — use `textContent` or DOM APIs
- No `eval()`, no `Function()` constructor, no dynamic script creation
- No inline event handlers in HTML — attach via `addEventListener`
- Content Security Policy header (set via meta tag):
  ```html
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'">
  ```
- No external resources loaded at runtime
- Sanitize any user input (custom category names) before rendering
