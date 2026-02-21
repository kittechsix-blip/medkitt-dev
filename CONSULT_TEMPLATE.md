# New Consult Template — MedKitt

> Use this template when building a new clinical consult (decision tree) for MedKitt.
> Each consult follows the same pattern as the neurosyphilis workup.

---

## Step 1: Clinical Content (Andy provides)

Before building, Andy provides the clinical decision logic. This can be:
- A text document with the decision flow
- Curated evidence references (journal articles, guidelines)
- A verbal walkthrough that Claude captures

**What's needed:**
- **Topic name** — e.g., "Neurosyphilis Workup", "DKA Management", "Stroke Code"
- **Category** — which of the 23 EM categories it belongs to (e.g., Infectious Disease, Endocrinology)
- **Modules** — the logical phases of the workup (e.g., Serology → Stage → Symptoms → Treatment). Aim for 3-8 modules.
- **Decision nodes** — each branch point, info screen, and result endpoint
- **Treatment protocols** — drug/dose/route/frequency/duration + alternatives + allergy options
- **Evidence citations** — numbered references backing the clinical content
- **Key clinical notes** — pearls, caveats, pitfalls for the reference page

## Step 2: Create the Consult Data File

Create `src/data/trees/[consult-id].ts` following this pattern:

```typescript
import type { DecisionNode } from '../../models/types.js';

export const [CONSULT_NAME]_NODES: DecisionNode[] = [

  // MODULE 1: [MODULE NAME]
  {
    id: '[consult]-start',        // Entry node — always named [consult]-start
    type: 'info',                  // info = educational intro, question = choices, result = endpoint
    module: 1,                     // Module number (1-based)
    title: '[Module 1 Title]',
    body: '[Clinical content with \n for line breaks]',
    citation: [1, 2],             // Reference numbers
    next: '[next-node-id]',       // For info nodes — where Continue goes
  },

  // Question node
  {
    id: '[question-id]',
    type: 'question',
    module: 1,
    title: '[Question Title]',
    body: '[Question text]',
    citation: [1],
    options: [
      { label: 'Option A', description: 'What this means', next: '[next-id]' },
      { label: 'Option B', description: 'What this means', next: '[other-id]', urgency: 'critical' },
    ],
  },

  // Result node (endpoint)
  {
    id: '[result-id]',
    type: 'result',
    module: 6,
    title: '[Result Title]',
    body: '[Summary of findings]',
    recommendation: '[Clinical recommendation text]',
    confidence: 'definitive',      // definitive | recommended | consider
    citation: [1, 3, 5],
    treatment: {
      firstLine: {
        drug: '[Drug Name]',
        dose: '[Dose]',
        route: '[IV/IM/PO]',
        frequency: '[Schedule]',
        duration: '[Duration]',
        notes: '[Important notes]',
      },
      alternative: { /* same structure */ },
      pcnAllergy: { /* same structure */ },
      monitoring: '[Follow-up schedule text]',
    },
  },
];
```

**Node types:**
- `info` — Educational content with "Continue" button. Use for intros, explanations.
- `question` — Branch point with option buttons. Each option has a `next` node ID.
- `result` — Terminal endpoint with recommendation, optional treatment card, citations.
- `input` — Form fields (CSF values, labs). Reserved for future refinement.

**Urgency on options:** `critical` = red border, `urgent` = orange border, default = teal.

**Confidence on results:** `definitive` = teal badge, `recommended` = orange badge, `consider` = blue badge.

## Step 3: Create the Reference Table

Add to `src/components/reference-table.ts`:

1. **Diagnostic data** — test performance rows (sensitivity, specificity, role)
2. **Citations** — numbered evidence references
3. **Clinical notes** — key pearls and caveats

Or create a separate reference component if the consult has unique reference data that doesn't fit the existing structure.

## Step 4: Register the Consult

### 4a. Add to categories (`src/data/categories.ts`)

Find the right category and add a `DecisionTreeMeta` entry:

```typescript
{
  id: '[consult-id]',
  title: '[Consult Title]',
  subtitle: '[Brief description of the flow]',
  categoryId: '[category-id]',
  version: '1.0',
  nodeCount: [N],          // Total number of nodes
  entryNodeId: '[consult]-start',
}
```

### 4b. Wire into the wizard (`src/components/tree-wizard.ts`)

In `renderTreeWizard()`, add a case for the new consult:

```typescript
import { [CONSULT_NAME]_NODES } from '../data/trees/[consult-id].js';

// In renderTreeWizard():
if (treeId === '[consult-id]') {
  engine = new TreeEngine([CONSULT_NAME]_NODES);
}
```

### 4c. Update service worker (`docs/sw.js`)

Add to `ASSETS_TO_CACHE`:
```
'./data/trees/[consult-id].js',
```

Bump `CACHE_NAME` version.

## Step 5: Compile & Test

```bash
bun x tsc              # Compile TypeScript
# Start local server in docs/
# Navigate to the consult, test every path
# Verify all result nodes reachable
# Check reference citations render
```

## Step 6: Push

```bash
git add [files]
git commit -m "Add [consult name] consult"
git push
```

Clear phone SW cache (Settings → Safari → Advanced → Website Data → delete github.io) and verify.

---

## Checklist for New Consult

- [ ] Clinical content provided by Andy (decision flow, evidence, treatments)
- [ ] Data file created: `src/data/trees/[id].ts`
- [ ] All node IDs unique, all `next` references valid
- [ ] Entry node is `[id]-start`
- [ ] Every path reaches a result node
- [ ] Treatment nodes have firstLine + alternatives where applicable
- [ ] Citations array populated with reference numbers
- [ ] Reference table updated with diagnostic data + citations
- [ ] Category registered in `categories.ts` with correct nodeCount
- [ ] Wizard wired in `tree-wizard.ts`
- [ ] SW cache updated and version bumped
- [ ] `bun x tsc` compiles clean
- [ ] Browser tested: all paths, back navigation, flowchart, reference page
- [ ] Pushed to GitHub, phone cache cleared, verified on iPhone

---

## Reference: Neurosyphilis Consult Stats

- **42 nodes** across 6 modules
- **21 question** + 10 info + 10 result + 1 input nodes
- **5 treatment result nodes** with full drug cards
- **17 evidence citations**
- Built across 3 sessions using one-task-at-a-time workflow
