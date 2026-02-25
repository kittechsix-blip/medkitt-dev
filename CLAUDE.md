# MedKitt — Project Instructions

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
- Primary action: `--color-primary: #3CB371` (forest green)
- Accent: `--color-umber-light: #B87333` (copper/bronze)
- Urgency: `--color-danger: #ff4757` (red), `--color-warning: #ffa502` (orange)
- Decisions: `--color-info: #3498db` (blue)
- Dosing values: `.dose-highlight` class (monospace green pill)
- Full palette in `FRONTEND_GUIDELINES.md`

## Weight-Based Dose Calculator (MANDATORY)

Every drug with mg/kg dosing MUST include a `weightCalc` field on its `DrugDose` entry. This powers an inline calculator in the Pharmacy modal that lets clinicians enter patient weight (or estimate it from age) to get the exact dose.

**Interface:**
```typescript
interface WeightCalc {
  dosePerKg: number;       // dose per kg (e.g., 0.6 for 0.6 mg/kg)
  unit: string;            // "mg", "mcg", "units", etc.
  maxDose?: number;        // max single dose cap
  dailyDivided?: number;   // if /day dose, number of divisions (e.g., 3 for q8h)
  label?: string;          // optional label (e.g., "Low-dose alternative")
}
```

**Rules:**
- Single calc: `weightCalc: { dosePerKg: 0.6, unit: 'mg', maxDose: 16 }`
- Multiple calcs (array): `weightCalc: [{ dosePerKg: 0.25, unit: 'mg', label: 'Initial bolus' }, { dosePerKg: 0.35, unit: 'mg', label: 'Second bolus' }]`
- For `/day` regimens: set `dailyDivided` (e.g., `3` for q8h, `4` for q6h, `2` for BID). The calculator divides daily total by this number and applies `maxDose` to the per-dose result.
- Always set `maxDose` when the regimen specifies one.
- Use `label` when there are multiple calculations or when the calc only covers part of a complex regimen (e.g., "Bolus" vs "Infusion").
- Skip drugs where mg/kg is a max ceiling for a rate-titrated infusion (e.g., Procainamide 17 mg/kg max).

## Indication-Aware Drug Links (MANDATORY)

Every drug hyperlink in a consult tree MUST include an indication hint so the Pharmacy modal scrolls to the correct dosing subcategory. This prevents clinicians from seeing irrelevant dosing (e.g., opening Ceftriaxone from Peds Fever and seeing neurosyphilis dosing).

**Link syntax:** `[DrugName](#/drug/drug-id/indication-hint)`

**Examples:**
- `[Ceftriaxone](#/drug/ceftriaxone/pediatric fever)` — scrolls to "Pediatric Fever / Neonatal Sepsis" dosing
- `[Ceftriaxone](#/drug/ceftriaxone/pediatric meningitis)` — scrolls to "Pediatric Meningitis" dosing
- `[Clopidogrel](#/drug/clopidogrel/acs)` — scrolls to "ACS / NSTEMI" dosing
- `[Apixaban](#/drug/apixaban/atrial fibrillation)` — scrolls to AF stroke prevention dosing

**Rules for every new consult:**
1. Every drug referenced in a tree MUST have a dosing entry in `drug-store.ts` that matches the consult's use case (indication, dose, frequency).
2. Every mg/kg dose in that entry MUST have a `weightCalc` field.
3. Every `[Drug](#/drug/id)` link in the tree MUST include an `/indication-hint` suffix that matches the dosing card's indication text.
4. The hint uses space-separated keywords that are matched against the dosing card's `data-indication` attribute (case-insensitive, all words must appear).
5. If a drug is used the same way as an existing entry (e.g., first entry in the drug store), the hint can be omitted — but prefer always including it for clarity.

**When building a new consult, always audit:**
- Does each referenced drug have a dosing entry for THIS consult's clinical context?
- Does each mg/kg entry have `weightCalc`?
- Does each drug link include the right indication hint?

**Pediatric weight estimation (built into calculator UI):**
- < 1 year: (months × 0.5) + 3.5 kg
- 1–10 years: (years × 2) + 10 kg
- > 10 years: (years × 2) + 20 kg

## Steps Summary Info Page (MANDATORY for Emergent/Resuscitation Consults)

Every consult involving an **emergent procedure, resuscitation, or time-critical protocol** MUST include a Steps Summary info page. This gives clinicians a one-page quick-reference checklist they can review immediately before performing the procedure.

**When to include:** Emergent deliveries, resuscitations (NRP, cardiac arrest), hemorrhage protocols (PPH), emergency procedures, any consult where a clinician needs to mentally rehearse steps under time pressure.

**Implementation pattern:**
1. Create an `InfoPage` in `info-page.ts` with:
   - Sectioned bullet points covering each major phase of the protocol
   - Each bullet is a `[one-line step description](#/node/node-id)` link
   - Links close the modal and jump directly to the detailed node in the tree
   - Cross-consult links use `[text](#/tree/tree-id)` format
2. Register in `INFO_PAGES` map
3. Add as **first line** of the start node's body: `[Consult Title Steps Summary](#/info/page-id) — brief description.`

**Technical details:**
- `#/node/node-id` links dispatch `medkitt-jump-node` custom event → `TreeEngine.jumpToNode()`
- `#/tree/tree-id` links use `window.location.hash` navigation
- Info modal closes automatically before navigation

**Existing examples:** Precipitous Delivery (`precip-delivery-summary`), Shoulder Dystocia (`sd-summary`)

## Clinical Content

- All decision tree logic is in `PRD.md` — the source of truth
- 17 evidence citations — never invent clinical content
- Neurosyphilis tree has 6 modules: Serology → Stage → Symptoms → LP Decision → CSF Interpreter → Treatment
- Treatment includes full drug/dose/duration + PCN allergy alternatives

## Category System

19 EM categories (alphabetical) + custom "Add" option + 2 tool categories (Pharmacy, Med-Calc).

**Category view conventions (ALWAYS follow):**
- Consults within each category are **sorted alphabetically** by title (`category-view.ts` sorts at render time)
- Categories with **3+ consults** show a search/filter input at the top
- When adding a new consult to `categories.ts`, no need to maintain alphabetical order in the data array — the view handles sorting automatically

## Current Status

v1.21 — 16 consults, Pharmacy (71 drugs), Med-Calc (PESI/sPESI/CHA₂DS₂-VASc/NIHSS/TIMI/BAS)

Core build tasks (all complete):
- [x] Tasks 0-12: Foundation → PWA shell → TypeScript → Router → Categories → Wizard → Results → References → Deploy

Post-v1.0 additions:
- [x] Pneumothorax POCUS consult (Ultrasound) — 12 nodes, 4 modules
- [x] PE Treatment consult (Pulmonology) — 29 nodes, 5 modules
- [x] Drug Reference category — 12 drugs, searchable list + detail modals
- [x] Medical Calculators category — PESI + sPESI with real-time scoring
- [x] Modal overlay system — drug and info references as slide-up modals
- [x] Inline drug hyperlinks — auto-linked across all trees
- [x] DOAC info modal — oral anticoagulation reference with dosing table
- [x] Flowchart removed — user found it useless on mobile
- [x] Basic Echo Views consult (Ultrasound) — 8 nodes, 6 modules, 10 images, teaching reference
- [x] Clickable header logo — navigates to home from any page
