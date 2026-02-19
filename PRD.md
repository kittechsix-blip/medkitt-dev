# PRD: EM Decision Tree PWA

> **Status:** Planning Complete — Ready to Build
> **Last Updated:** 2026-02-19
> **First Decision Tree:** Neurosyphilis Workup

---

## 1. Clinical Problem Statement

An EM physician has a patient with positive syphilis serology. They need to answer:

1. **What do these serology results mean?** (traditional vs reverse-sequence, discordant results, prozone)
2. **What stage of syphilis is this?** (primary, secondary, early latent, late latent, tertiary, unknown)
3. **Does this patient need a lumbar puncture?** (neurologic, ocular, otic symptoms; HIV risk factors; treatment failure)
4. **If I did the LP, what do the CSF results mean?** (CSF-VDRL, WBC, protein, FTA-ABS, TPPA, PCR)
5. **What's the treatment?** (full regimen by diagnosis, PCN allergy alternatives)

**No formal decision tree exists in the literature.** This tool creates one based on CDC 2021 STI Treatment Guidelines, IDSA/OARAC 2025 HIV OI Guidelines, and current evidence.

**Target user:** EM docs in the ED, using their phone at bedside during a busy shift.

---

## 2. Decision Tree Logic

### Module 1: Serology Interpreter

**Entry point:** Patient has a positive syphilis test result.

```
Q: Which testing algorithm was used?
├── Traditional (NTT screen → treponemal confirm)
│   ├── RPR/VDRL reactive + treponemal reactive → CONFIRMED SYPHILIS → go to Module 2
│   ├── RPR/VDRL reactive + treponemal nonreactive → LIKELY FALSE POSITIVE
│   │   └── Note: False positives common with HIV, autoimmune disease, pregnancy,
│   │         vaccinations, injection drug use, older age. Usually low titer (<1:8).
│   └── RPR/VDRL nonreactive → SYPHILIS UNLIKELY
│       └── Caveat: 30% of primary syphilis is seronegative. NTTs become reactive
│             3-4 weeks after infection. Consider prozone phenomenon (false-negative
│             at very high titers — request dilution).
│
└── Reverse-Sequence (treponemal screen → NTT reflex)
    ├── Treponemal reactive + NTT reactive → CONFIRMED SYPHILIS → go to Module 2
    ├── Treponemal reactive + NTT nonreactive
    │   └── Requires SECOND treponemal test (different antigen)
    │       ├── Second treponemal reactive → Possible: previously treated, untreated
    │       │   late latent, or early syphilis with low NTT. Stage and treat.
    │       └── Second treponemal nonreactive → FALSE POSITIVE treponemal screen
    └── Treponemal nonreactive → SYPHILIS UNLIKELY
```

**Key interpretive principles (displayed as reference):**
- Use same test method (VDRL or RPR) for serial monitoring, preferably same lab
- VDRL and RPR titers cannot be directly compared; RPR titers are frequently slightly higher
- NTTs become reactive 3-4 weeks after infection
- Treponemal antibodies remain positive for life regardless of treatment
- Prozone phenomenon: false-negative NTT at very high titers — always request dilution if clinical suspicion high
- HIV-specific: most have accurate serologic responses; rarely higher/lower/delayed titers in early syphilis

### Module 2: Stage Classification

```
Q: Clinical presentation and history?
├── PRIMARY: painless chancre, regional lymphadenopathy
├── SECONDARY: diffuse rash (palms/soles), condylomata lata, mucous patches,
│   lymphadenopathy, constitutional symptoms
├── EARLY LATENT: asymptomatic, acquired within prior 12 months
│   (based on documented seroconversion, symptoms, or exposure)
├── LATE LATENT: asymptomatic, acquired >12 months ago or unknown duration
├── TERTIARY: gummatous disease, cardiovascular syphilis (aortitis),
│   or late neurologic manifestations (tabes dorsalis, general paresis)
└── UNKNOWN DURATION: no clear timeline → treat as late latent
```

### Module 3: Symptom Screen

```
Q: Does the patient have neurologic symptoms?
   □ Cognitive dysfunction / altered mental status
   □ Motor or sensory deficits
   □ Cranial nerve palsies
   □ Meningismus / signs of meningitis
   □ Stroke symptoms
   □ Loss of vibration sense
   → ANY checked = NEUROLOGIC SYMPTOMS PRESENT → Module 4 (LP INDICATED)

Q: Does the patient have ocular symptoms?
   □ Vision changes / vision loss
   □ Uveitis / retinitis on exam
   □ Photophobia
   → If checked:
     └── Q: Cranial nerve dysfunction present on exam?
         ├── YES → LP INDICATED → Module 5
         └── NO (isolated ocular findings, confirmed on exam)
             → TREAT AS NEUROSYPHILIS without LP → Module 6 (Treatment)

Q: Does the patient have otic symptoms?
   □ Hearing loss (moderate or greater severity)
   □ Tinnitus
   □ Vertigo
   → If checked + normal neurologic exam:
     → CSF likely normal. TREAT AS NEUROSYPHILIS without LP → Module 6

NOTE: Neurologic symptoms have HIGH SPECIFICITY (91.6-100%) but LOW
SENSITIVITY (1.5-38.1%) for neurosyphilis. Absence of symptoms does NOT
guarantee CSF-VDRL is nonreactive.
```

### Module 4: LP Decision Engine

```
IF neurologic symptoms present (from Module 3):
   → LP INDICATED → proceed to Module 5

IF tertiary syphilis (from Module 2):
   → LP INDICATED before treatment → proceed to Module 5

IF asymptomatic:
   Q: HIV status?
   ├── HIV NEGATIVE
   │   └── Q: Treatment failure? (NTT titers not declining fourfold at 12-24 months)
   │       ├── YES + NTT ≥1:32 → CONSIDER LP → Module 5
   │       ├── YES + NTT <1:32 → Assess for reinfection, consider retreatment
   │       └── NO → LP NOT INDICATED → Module 6 (stage-appropriate treatment)
   │
   └── HIV POSITIVE
       └── [Default simple path]
           Q: Neurologic, hearing, or vision concerns?
           ├── YES → LP INDICATED → Module 5
           └── NO → LP NOT INDICATED → Module 6

           [Advanced toggle — HIV detail]
           Q: CD4 count?
           Q: Serum RPR titer?
           Q: On antiretroviral therapy?
           ├── CD4 ≤350 AND/OR RPR ≥1:32 → INCREASED NEUROSYPHILIS RISK
           │   → CONSIDER LP → Module 5
           │   Note: Evidence that identification of asymptomatic neurosyphilis
           │   predicts treatment failure is insufficient, even in HIV+ patients.
           ├── Treatment failure (no fourfold NTT decline at 12-24 months)
           │   → CONSIDER LP → Module 5
           └── None of above → LP NOT INDICATED → Module 6

IMPORTANT: Reactive treponemal test + nonreactive NTT + no neurologic symptoms
= LOW neurosyphilis risk. CSF examination NOT recommended.
```

### Module 5: CSF Interpreter

**Input fields:** CSF-WBC, CSF-protein, CSF-VDRL result

```
STEP 1: CSF-VDRL result
├── REACTIVE (no blood contamination)
│   → DIAGNOSTIC OF NEUROSYPHILIS in presence of neurologic signs/symptoms
│   → Module 6 (neurosyphilis treatment)
│
└── NONREACTIVE
    └── STEP 2: Assess other CSF parameters
        Q: CSF-WBC count?
        ├── HIV-NEGATIVE: >5 cells/mm³ = elevated (sensitive but not specific)
        └── HIV-POSITIVE: >20 cells/mm³ = more specific cutoff
            (>5 can be elevated from HIV itself)

        Q: CSF protein elevated?
        └── Note: Low sensitivity AND specificity for neurosyphilis

        IF elevated WBC or protein with negative CSF-VDRL:
        → NEUROSYPHILIS STILL POSSIBLE — proceed to Step 3

        IF normal WBC AND protein AND negative CSF-VDRL:
        → NEUROSYPHILIS UNLIKELY → Module 6 (stage-appropriate treatment)

STEP 3: Additional CSF testing (when CSF-VDRL negative but suspicion remains)
├── CSF FTA-ABS or CSF TP-PA
│   ├── NONREACTIVE → Neurosyphilis HIGHLY UNLIKELY
│   │   (especially with nonspecific neurologic symptoms)
│   └── REACTIVE → Does NOT confirm neurosyphilis (less specific than VDRL)
│       but supports clinical suspicion
│       → CONSIDER empiric neurosyphilis treatment → Module 6
│
└── [Advanced: CSF PCR for T. pallidum]
    Performance: Specificity 97-100%, Sensitivity 27-42.5%
    ├── POSITIVE → Strong evidence for active CNS infection
    │   → TREAT AS NEUROSYPHILIS → Module 6
    └── NEGATIVE → Does NOT rule out neurosyphilis (low sensitivity)

    Note: CDC does not recommend CSF PCR. Not standardized.
    Most useful when CSF-VDRL negative + treponemal test positive
    (confirms active infection vs passive antibody transfer).
    Serodiscrepant samples (RPR-/treponemal+): 47.4% PCR positive.

CLINICAL BOTTOM LINE: If clinical suspicion for neurosyphilis remains HIGH
despite negative CSF-VDRL, TREAT EMPIRICALLY as neurosyphilis.
```

### Module 6: Treatment Recommendations

**Neurosyphilis / Ocular Syphilis / Otosyphilis:**
```
FIRST-LINE:
  Aqueous crystalline penicillin G
  18-24 million units/day IV
  Given as 3-4 million units q4h OR continuous infusion
  Duration: 10-14 days
  Rationale: Achieves treponemicidal levels in CSF

ALTERNATIVE:
  Procaine penicillin G 2.4 million units IM once daily
  PLUS probenecid 500 mg PO four times daily
  Duration: 10-14 days
  Note: Equivalent outcomes to IV penicillin G (Dunaway et al., CID 2020)

PCN ALLERGY:
  → Penicillin desensitization STRONGLY RECOMMENDED (CDC)
  → Penicillin remains the only proven effective therapy for neurosyphilis

  If desensitization not feasible:
  Ceftriaxone 2g IV daily for 10-14 days
  (European data shows similar efficacy — Bettuzzi et al., Lancet ID 2021)
  Note: US/UK guidelines more conservative on ceftriaxone

  Ceftriaxone 1-2g daily (IV or IM) for 10-14 days
  (for PCN-allergic nonpregnant adults)

  Doxycycline 200mg PO BID x 28 days — LIMITED DATA for neurosyphilis

  Azithromycin: NOT RECOMMENDED (widespread macrolide resistance)

HIV+ PATIENTS:
  Same treatment regimens. ART improves outcomes (CSF WBC and VDRL
  more likely to normalize in patients receiving antiretrovirals).
```

**Primary & Secondary Syphilis (no neurosyphilis):**
```
  Benzathine penicillin G 2.4 million units IM × 1 dose
```

**Early Latent Syphilis (no neurosyphilis):**
```
  Benzathine penicillin G 2.4 million units IM × 1 dose
```

**Late Latent / Unknown Duration (no neurosyphilis):**
```
  Benzathine penicillin G 2.4 million units IM weekly × 3 doses
```

**Tertiary (no neurosyphilis, e.g., gummatous/cardiovascular):**
```
  Benzathine penicillin G 2.4 million units IM weekly × 3 doses
  (after CSF evaluation rules out neurosyphilis)
```

**Follow-up Monitoring (display as reference):**
```
Early syphilis: NTT titers at 3, 6, 9, 12, 24 months
  → Fourfold decline within 12-24 months = successful treatment
  → 15-20% have serologic nonresponse (titers remain reactive, usually ≤1:8)

Late latent: NTT titers at 6, 12, 18, 24 months
  → Fourfold decline if initially high (≥1:32)
  → Many with low titers and late latent do NOT achieve fourfold decline
```

---

## 3. Diagnostic Test Performance Reference

| Test | Sensitivity | Specificity | Key Role |
|------|------------|-------------|----------|
| CSF-VDRL | 49-87.5% | 74-100% | Cornerstone. Reactive = diagnostic (with neuro signs) |
| CSF-RPR | 51.5-81.8% | 81.8-100% | Similar to VDRL, may be less sensitive |
| CSF FTA-ABS | 91-100% | ~55% | High sensitivity. Negative = rules out neurosyphilis |
| CSF TP-PA | ~97% | ~84% | Highest sensitivity. Negative = rules out |
| CSF TPHA | 91-100% | ~55% | Similar to FTA-ABS |
| CSF PCR (qPCR) | 41-42.5% | 97-100% | Confirms active CNS infection when positive |
| CSF PCR (nested) | 27% | 100% | Most specific but least sensitive |
| CSF WBC >5/mm³ | Sensitive | Not specific | Baseline for non-HIV |
| CSF WBC >20/mm³ | — | More specific | Better cutoff for HIV+ patients |
| CSF protein | Low | Low | Normalizes slowly after treatment |

**Network meta-analysis ranking** (Ding et al., European Neurology 2023):
CSF-TPHA > TRUST > CSF-VDRL > CSF-EIA > RPR (by superiority index)

**Neurologic symptom diagnostic accuracy** (Davis et al., CID 2018):
- Specificity: 91.6-100%
- Sensitivity: 1.5-38.1%
- Absence of symptoms does NOT rule out neurosyphilis

---

## 4. Data Model

```typescript
// Decision tree node types
interface DecisionNode {
  id: string;
  type: 'question' | 'info' | 'result' | 'input';
  module: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  body: string;           // Clinical content / question text
  citation?: string[];    // Reference numbers
  options?: NodeOption[];  // For question nodes
  inputs?: NodeInput[];    // For input nodes (CSF values)
  next?: string;          // Default next node ID
}

interface NodeOption {
  label: string;
  description?: string;
  next: string;           // Node ID to navigate to
  urgency?: 'routine' | 'urgent' | 'critical';
}

interface NodeInput {
  name: string;
  type: 'number' | 'select' | 'checkbox';
  label: string;
  unit?: string;
  options?: { label: string; value: string }[];
}

// Result / recommendation node
interface ResultNode extends DecisionNode {
  type: 'result';
  recommendation: string;
  treatment?: TreatmentRegimen;
  confidence: 'definitive' | 'recommended' | 'consider';
}

interface TreatmentRegimen {
  firstLine: DrugRegimen;
  alternative?: DrugRegimen;
  pcnAllergy?: DrugRegimen;
  monitoring: string;
}

interface DrugRegimen {
  drug: string;
  dose: string;
  route: string;
  frequency: string;
  duration: string;
  notes?: string;
}

// Category system
interface Category {
  id: string;
  name: string;
  icon: string;
  decisionTrees: DecisionTreeMeta[];
  isCustom: boolean;
}

interface DecisionTreeMeta {
  id: string;
  title: string;
  subtitle: string;
  categoryId: string;
  version: string;
  nodeCount: number;
  entryNodeId: string;
}

// User session state
interface TreeSession {
  treeId: string;
  currentNodeId: string;
  history: string[];       // Stack of visited node IDs for back navigation
  answers: Record<string, string | number | boolean>;
  startedAt: number;
}
```

---

## 5. UI/UX Requirements

### Interaction Pattern: Dual-Mode
1. **Step-by-step wizard** (primary): One question at a time. Big tap targets. Clear back button. Each screen is one decision node.
2. **Visual flowchart** (secondary): Mini-map showing the entire decision tree. Current position highlighted. Tappable nodes.

### Mobile-First Design
- iPhone primary target (375px-428px width)
- Large tap targets (minimum 44x44px per Apple HIG)
- Bottom navigation for thumb reachability
- Swipe gestures for back/forward navigation
- No horizontal scrolling
- Readable without zooming (16px minimum body text)

### Key Screens
1. **Home**: Category grid (23 categories + Add)
2. **Category view**: List of available decision trees within a category
3. **Tree view**: The wizard interface with flowchart mini-map toggle
4. **Result view**: Recommendation card with treatment details
5. **Reference view**: Test performance table, monitoring schedule

### Accessibility
- High contrast text (WCAG AA minimum on dark background)
- Semantic HTML for screen readers
- Focus management for keyboard/VoiceOver navigation

---

## 6. PWA Technical Requirements

### Service Worker
- Cache all static assets (HTML, CSS, JS, icons)
- Cache-first strategy for offline operation
- Background sync for any future features requiring network

### Web App Manifest
- `display: standalone` (full-screen, no browser chrome)
- Theme color matching `--color-bg` (#0f0f1a)
- App icon set (192px, 512px minimum)
- `orientation: portrait`

### Deployment
- GitHub Pages (free, same workflow as Workflow Kitt)
- Single-page app with client-side routing (hash-based)

### Storage
- LocalStorage for tree session state, user preferences, custom categories
- No server, no API calls, no external dependencies at runtime

---

## 7. Category System

23 predefined EM categories + user-created custom categories.

| # | Category | Icon | Initial Content |
|---|----------|------|-----------------|
| 1 | Airway | 🫁 | — |
| 2 | Cardiology | ❤️ | — |
| 3 | Critical Care | 🏥 | — |
| 4 | Dermatology | 🔬 | — |
| 5 | Drugs | 💊 | — |
| 6 | Emergency Medicine | 🚑 | — |
| 7 | Endocrinology | ⚡ | — |
| 8 | Gastroenterology | 🔄 | — |
| 9 | Hematology | 🩸 | — |
| 10 | Infectious Disease | 🦠 | **Neurosyphilis Workup** |
| 11 | Nerve Blocks | 💉 | — |
| 12 | Neurology | 🧠 | — |
| 13 | OB/GYN | 👶 | — |
| 14 | Orthopedics | 🦴 | — |
| 15 | Pediatrics | 🧒 | — |
| 16 | Procedures | 🔧 | — |
| 17 | Pulmonology | 🌬️ | — |
| 18 | Renal | 💧 | — |
| 19 | Rheumatology | 🤲 | — |
| 20 | Toxicology | ☠️ | — |
| 21 | Trauma | 🩹 | — |
| 22 | Ultrasound | 📡 | — |
| 23 | + Add | ➕ | User-created |

---

## 8. Evidence Citations

1. Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187. doi:10.15585/mmwr.rr7004a1
2. Tuddenham S, Katz SS, Ghanem KG. Syphilis Laboratory Guidelines: Performance Characteristics of Nontreponemal Antibody Tests. Clin Infect Dis. 2020;71(Suppl 1):S21-S42. doi:10.1093/cid/ciaa306
3. Ding D, Gao J, Zhang W, Xu D. The Diagnostic Performance of Laboratory Tests of Neurosyphilis: A Systematic Review and Network Meta-Analysis. European Neurology. 2023;86(6):418-429. doi:10.1159/000531341
4. Chevalier FJ, Bacon O, Johnson KA, Cohen SE. Syphilis. JAMA. 2025;:2840085. doi:10.1001/jama.2025.17362
5. Ropper AH. Neurosyphilis. N Engl J Med. 2019;381(14):1358-1363. doi:10.1056/NEJMra1906228
6. Peeling RW, Mabey D, Chen XS, Garcia PJ. Syphilis. Lancet. 2023;402(10398):336-346. doi:10.1016/S0140-6736(22)02348-0
7. Ghanem KG, Ram S, Rice PA. The Modern Epidemic of Syphilis. N Engl J Med. 2020;382(9):845-854. doi:10.1056/NEJMra1901593
8. Vanhaecke C, Grange P, Benhaddou N, et al. Clinical and Biological Characteristics of 40 Patients With Neurosyphilis and Evaluation of T. pallidum Nested PCR in CSF Samples. Clin Infect Dis. 2016;63(9):1180-1186. doi:10.1093/cid/ciw499
9. Benson C, Brooks J, Dhanireddy S, et al. Guidelines for the Prevention and Treatment of Opportunistic Infections in Adults and Adolescents With HIV. IDSA/OARAC. 2025.
10. Bettuzzi T, Jourdes A, Robineau O, et al. Ceftriaxone Compared With Benzylpenicillin in the Treatment of Neurosyphilis in France. Lancet Infect Dis. 2021;21(10):1441-1447. doi:10.1016/S1473-3099(20)30857-4
11. Dunaway SB, Maxwell CL, Tantalo LC, Sahi SK, Marra CM. Neurosyphilis Treatment Outcomes After IV Penicillin G Versus IM Procaine Penicillin Plus Oral Probenecid. Clin Infect Dis. 2020;71(2):267-273. doi:10.1093/cid/ciz795
12. Davis AP, Stern J, Tantalo L, et al. How Well Do Neurologic Symptoms Identify Individuals With Neurosyphilis? Clin Infect Dis. 2018;66(3):363-367. doi:10.1093/cid/cix799
13. Salle R, Grange PA, Ollagnier G, et al. Comparison of Molecular and Serological Assays on CSF for the Diagnosis of Neurosyphilis. JEADV. 2023;37(2):390-394. doi:10.1111/jdv.18604
14. Vrbová E, Mikalová L, Grillová L, et al. A Retrospective Study on Nested PCR Detection of Syphilis Treponemes in Clinical Samples. PLoS One. 2020;15(8):e0237949. doi:10.1371/journal.pone.0237949
15. Tuddenham S, Hamill MM, Ghanem KG. Diagnosis and Treatment of Sexually Transmitted Infections: A Review. JAMA. 2022;327(2):161-172. doi:10.1001/jama.2021.23487
16. Miller JM, Binnicker MJ, Campbell S, et al. Guide to Utilization of the Microbiology Laboratory for Diagnosis of Infectious Diseases: 2024 Update by IDSA and ASM. Clin Infect Dis. 2024;:ciae104. doi:10.1093/cid/ciae104
17. Thompson MA, Horberg MA, Agwu AL, et al. Primary Care Guidance for Persons With HIV: 2020 Update by HIVMA of IDSA. Clin Infect Dis. 2021;73(11):e3572-e3605. doi:10.1093/cid/ciaa1391

---

## 9. Disclaimer

This tool is for **educational and clinical decision support purposes only**. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols. Not FDA-validated. Not for use as a sole diagnostic instrument.
