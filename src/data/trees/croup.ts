// MedKitt — Croup (Laryngotracheobronchitis) Management
// Initial Assessment → Treatment by Severity → Observation & Response → Disposition
// 4 modules: Initial Assessment → Treatment → Observation → Disposition
// 13 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CROUP_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'croup-start',
    type: 'info',
    module: 1,
    title: 'Croup — Clinical Recognition',
    body: '**Croup (laryngotracheobronchitis)** is a parainfluenza viral infection causing subglottic inflammation.\n\n**Classic presentation:**\n\u2022 Barking "seal-like" cough\n\u2022 Inspiratory stridor\n\u2022 Hoarseness\n\u2022 Low-grade fever\n\u2022 URI prodrome (1-3 days)\n\n**Epidemiology:** 3% of children aged 6 months to 3 years. Peak incidence 1-2 years. Male:female 1.4:1. Most common in fall/winter.\n\n**Most cases are mild and self-limited** \u2014 only 1-8% require hospitalization, <3% of admitted patients require intubation.',
    citation: [1, 2, 7],
    next: 'croup-severity',
  },

  {
    id: 'croup-severity',
    type: 'question',
    module: 1,
    title: 'Severity Assessment',
    body: 'Classify croup severity based on clinical findings. The **Westley Croup Score** guides management.\n\nAssess: stridor, retractions, air entry, cyanosis, and level of consciousness.\n\n**Key distinction:** Stridor at rest vs. only with agitation determines the threshold for epinephrine.',
    citation: [2, 4, 7],
    options: [
      {
        label: 'Mild',
        description: 'Occasional barking cough, no stridor at rest, no retractions',
        next: 'croup-mild-tx',
      },
      {
        label: 'Moderate',
        description: 'Stridor at rest, mild retractions, no significant distress',
        next: 'croup-mod-tx',
      },
      {
        label: 'Severe',
        description: 'Significant stridor at rest, marked retractions, agitation/distress',
        next: 'croup-severe-tx',
      },
      {
        label: 'Impending Respiratory Failure',
        description: 'Decreased LOC, cyanosis, poor/absent air entry',
        urgency: 'critical',
        next: 'croup-failure-tx',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: TREATMENT BY SEVERITY
  // =====================================================================

  {
    id: 'croup-mild-tx',
    type: 'info',
    module: 2,
    title: 'Mild Croup — Glucocorticoid Only',
    body: '**Single dose glucocorticoid is standard of care for ALL severities of croup.**\n\n**First-line:**\n\u2022 [Dexamethasone](#/drug/dexamethasone) **0.6 mg/kg PO** (max 16 mg) \u2014 single dose\n\n**Non-inferior alternatives:**\n\u2022 [Dexamethasone](#/drug/dexamethasone) **0.15 mg/kg PO** \u2014 lower dose equally effective [3][6]\n\u2022 [Prednisolone](#/drug/prednisolone) **1 mg/kg PO** \u2014 non-inferior for symptom relief and 7-day outcomes [6]\n\n**If unable to tolerate oral:**\n\u2022 [Budesonide](#/drug/budesonide-neb) **2 mg nebulized** \u2014 effective alternative [5][9]\n\u2022 [Dexamethasone](#/drug/dexamethasone) **0.6 mg/kg IM**\n\n**NNT = 7** to prevent one return visit. Reduces return visits/readmissions by ~50%. Safe single-dose profile.',
    citation: [1, 2, 3, 5, 6, 8],
    next: 'croup-mild-obs',
  },

  {
    id: 'croup-mod-tx',
    type: 'info',
    module: 2,
    title: 'Moderate Croup — Dexamethasone + Epinephrine',
    body: '**Step 1: Glucocorticoid**\n\u2022 [Dexamethasone](#/drug/dexamethasone) **0.6 mg/kg PO/IM** (max 16 mg) \u2014 single dose\n\n**Step 2: Nebulized Epinephrine**\n\u2022 [Racemic Epinephrine](#/drug/racemic-epinephrine) **0.5 mL of 2.25%** in 4.5 mL normal saline\n\u2022 OR L-epinephrine **0.5 mL/kg of 1:1000** (max 5 mL) nebulized\n\nEpinephrine provides rapid but **temporary** relief (onset minutes, duration 1-2 hours). Must observe minimum 2 hours after administration.\n\n**Keep child calm** \u2014 agitation worsens airway obstruction.',
    citation: [2, 4, 7],
    next: 'croup-epi-obs',
  },

  {
    id: 'croup-severe-tx',
    type: 'info',
    module: 2,
    title: 'Severe Croup — Aggressive Treatment',
    body: '**Step 1: Glucocorticoid**\n\u2022 [Dexamethasone](#/drug/dexamethasone) **0.6 mg/kg PO/IM** (max 16 mg) \u2014 single dose\n\n**Step 2: Nebulized Epinephrine**\n\u2022 [Racemic Epinephrine](#/drug/racemic-epinephrine) **0.5 mL of 2.25%** in 4.5 mL NS\n\u2022 OR L-epinephrine **0.5 mL/kg of 1:1000** (max 5 mL) neb\n\u2022 **May repeat epinephrine** \u2014 repeated doses can prevent intubation in many cases [4]\n\n**Additional considerations:**\n\u2022 Heliox (70:30 He:O\u2082) \u2014 may provide short-term benefit when combined with dex, but limited evidence [11]\n\u2022 Continuous monitoring with pulse oximetry\n\u2022 **Minimize interventions that cause agitation** \u2014 crying worsens obstruction\n\u2022 Have airway equipment at bedside',
    citation: [2, 4, 7, 11],
    next: 'croup-epi-obs',
  },

  {
    id: 'croup-failure-tx',
    type: 'info',
    module: 2,
    title: 'Impending Respiratory Failure',
    body: '**This is a clinical emergency \u2014 activate airway team.**\n\n**Immediate interventions:**\n\u2022 [Dexamethasone](#/drug/dexamethasone) **0.6 mg/kg IM** (if not already given)\n\u2022 [Racemic Epinephrine](#/drug/racemic-epinephrine) nebulized \u2014 may repeat\n\u2022 **Blow-by oxygen** \u2014 do NOT agitate the child\n\u2022 **Call anesthesia/ENT for airway backup**\n\n**Airway management:**\n\u2022 Use endotracheal tube **0.5-1.0 size smaller** than age-predicted (subglottic narrowing)\n\u2022 Oral intubation preferred \u2014 may need smaller tube than expected\n\u2022 Have surgical airway equipment available\n\n**Rule out alternative diagnoses:** bacterial tracheitis, epiglottitis, foreign body, peritonsillar abscess.',
    citation: [2, 4],
    next: 'croup-icu',
  },

  // =====================================================================
  // MODULE 3: OBSERVATION & RESPONSE
  // =====================================================================

  {
    id: 'croup-mild-obs',
    type: 'question',
    module: 3,
    title: 'Post-Dexamethasone Observation',
    body: 'Observe for **1-2 hours** after dexamethasone administration.\n\nMost children start feeling better within **2-3 hours** of steroid treatment. Dexamethasone has a long half-life (~36 hours) \u2014 single dose provides sustained benefit.\n\nReassess: stridor, retractions, work of breathing, ability to take fluids.',
    citation: [3, 5, 8],
    options: [
      {
        label: 'Improved \u2014 No stridor at rest',
        description: 'Tolerating fluids, comfortable, no significant work of breathing',
        next: 'croup-discharge',
      },
      {
        label: 'Not improving or worsening',
        description: 'Persistent stridor at rest, increased work of breathing',
        next: 'croup-mod-tx',
      },
    ],
  },

  {
    id: 'croup-epi-obs',
    type: 'question',
    module: 3,
    title: 'Post-Epinephrine Observation',
    body: '**Observe minimum 2 hours after last nebulized epinephrine dose.**\n\nEpinephrine benefits are transient \u2014 symptoms may recur as effect wears off (rebound).\n\nMonitor for: return of stridor at rest, worsening retractions, tachycardia, respiratory fatigue.\n\n**Cold air exposure** (30 min outdoors at <10\u00b0C) may provide additional benefit if available \u2014 one RCT showed improvement in mild-moderate croup. [10]',
    citation: [4, 7, 10],
    options: [
      {
        label: 'Improved after 2+ hours',
        description: 'No stridor at rest, tolerating fluids, comfortable',
        next: 'croup-discharge',
      },
      {
        label: 'Partial improvement \u2014 needs repeat epi',
        description: 'Some improvement but persistent stridor at rest',
        next: 'croup-repeat-epi',
      },
      {
        label: 'Not improving or worsening',
        description: 'No response to treatment, clinical deterioration',
        next: 'croup-admit',
      },
    ],
  },

  {
    id: 'croup-repeat-epi',
    type: 'info',
    module: 3,
    title: 'Repeat Nebulized Epinephrine',
    body: '**Repeat nebulized epinephrine** at same dose:\n\u2022 [Racemic Epinephrine](#/drug/racemic-epinephrine) **0.5 mL of 2.25%** in 4.5 mL NS\n\u2022 OR L-epinephrine **0.5 mL/kg of 1:1000** (max 5 mL) neb\n\n**Repeated doses may prevent intubation** in many cases. [4]\n\nRestart 2-hour observation clock after each dose.\n\n**Escalation considerations:**\n\u2022 Multiple doses of epinephrine \u2192 strong indicator for admission\n\u2022 If requiring >2 doses \u2192 consider ICU level monitoring\n\u2022 **Failure to improve with dexamethasone + epinephrine** \u2192 consider alternative diagnoses (bacterial tracheitis, foreign body)',
    citation: [4],
    next: 'croup-re-obs',
  },

  {
    id: 'croup-re-obs',
    type: 'question',
    module: 3,
    title: 'Post-Repeat Observation',
    body: 'Reassess after **2 hours** from last epinephrine dose.\n\nChildren requiring multiple doses of nebulized epinephrine have a higher likelihood of needing admission.',
    citation: [4, 7],
    options: [
      {
        label: 'Improved \u2014 stable for discharge',
        description: 'No stridor at rest for 2+ hours, comfortable, tolerating fluids',
        next: 'croup-discharge',
      },
      {
        label: 'Not improving \u2014 admit',
        description: 'Persistent symptoms requiring ongoing monitoring',
        next: 'croup-admit',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: DISPOSITION
  // =====================================================================

  {
    id: 'croup-discharge',
    type: 'result',
    module: 4,
    title: 'Discharge Home',
    body: '**Discharge criteria:**\n\u2022 No stridor at rest for \u22652 hours after last epinephrine\n\u2022 Tolerating oral fluids\n\u2022 Comfortable, not in distress\n\u2022 Reliable caregiver with access to emergency care\n\n**Parent education:**\n\u2022 Symptoms are often **worse at night** \u2014 warn parents\n\u2022 Barking cough typically lasts 1-2 days, may continue up to 5-7 days\n\u2022 Keep child calm \u2014 agitation worsens symptoms\n\u2022 Acetaminophen/ibuprofen for fever and comfort\n\u2022 **Humidified air and cool mist lack evidence of benefit** [2][9]\n\n[Croup: When to Return to the ED](#/info/croup-return-precautions) \u2014 shareable parent handout\n\n**No additional steroid doses needed** \u2014 single dose of dexamethasone provides sustained benefit (half-life ~36 hours).',
    recommendation: 'Discharge with return precautions. Single-dose dexamethasone provides sustained benefit. Symptoms worse at night \u2014 warn parents. Follow up with pediatrician in 1-2 days if symptoms persist beyond 3 days. Return immediately for worsening stridor, breathing difficulty, or inability to drink fluids.',
    citation: [2, 3, 5, 9],
  },

  {
    id: 'croup-admit',
    type: 'result',
    module: 4,
    title: 'Hospital Admission',
    body: '**Admission criteria:**\n\u2022 Persistent stridor at rest despite dexamethasone + epinephrine\n\u2022 Requiring multiple doses of nebulized epinephrine\n\u2022 Significant respiratory distress\n\u2022 Unable to tolerate oral fluids\n\u2022 Young infant (<6 months) with moderate-severe croup\n\u2022 Unreliable follow-up or social concerns\n\n**Inpatient management:**\n\u2022 Continuous pulse oximetry\n\u2022 PRN nebulized epinephrine\n\u2022 Minimize agitation \u2014 keep parent at bedside\n\u2022 Reassess for alternative diagnoses if not improving: **bacterial tracheitis** (progressive toxicity, purulent secretions, radiographic findings) [4]\n\u2022 **Antibiotics only for suspected bacterial complications** \u2014 not routine for croup',
    recommendation: 'Admit for continued monitoring and PRN nebulized epinephrine. Minimize agitation. Continuous pulse oximetry. Reassess if failing to improve \u2014 consider bacterial tracheitis or other causes. Most admitted children improve within 24-48 hours.',
    citation: [2, 4],
  },

  {
    id: 'croup-icu',
    type: 'result',
    module: 4,
    title: 'ICU Admission / Airway Management',
    body: '**ICU admission criteria:**\n\u2022 Impending or actual respiratory failure\n\u2022 Requiring intubation\n\u2022 Severe croup unresponsive to maximal medical therapy\n\n**Intubation pearls:**\n\u2022 Use ETT **0.5-1.0 size smaller** than age-predicted\n\u2022 Oral intubation preferred\n\u2022 Have multiple smaller tube sizes available\n\u2022 ENT/anesthesia at bedside for surgical airway backup\n\n**Post-intubation:**\n\u2022 Continue dexamethasone 0.6 mg/kg q6-12h (consider for extubation facilitation)\n\u2022 Sedation to prevent self-extubation\n\u2022 Plan extubation with leak test after 24-72 hours\n\n**<3% of hospitalized croup patients require intubation** \u2014 this is rare.',
    recommendation: 'ICU admission with continuous monitoring. ETT 0.5-1.0 size smaller than predicted. Continue dexamethasone. Plan extubation with leak test after 24-72 hours of improvement. Consult ENT if atypical course or concern for structural airway pathology.',
    confidence: 'definitive',
    citation: [2, 4],
  },

];

export const CROUP_NODE_COUNT = CROUP_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const CROUP_MODULE_LABELS = [
  'Initial Assessment',
  'Treatment',
  'Observation',
  'Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const CROUP_CITATIONS: Citation[] = [
  { num: 1, text: 'Eskander A, de Almeida JR, Irish JC. Acute Upper Airway Obstruction. N Engl J Med. 2019;381(20):1940-1949.' },
  { num: 2, text: 'Zoorob R, Sidani M, Murray J. Croup: An Overview. Am Fam Physician. 2011;83(9):1067-73.' },
  { num: 3, text: 'Aregbesola A, Tam CM, Kothari A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.' },
  { num: 4, text: 'Cherry JD. Croup. N Engl J Med. 2008;358(4):384-91.' },
  { num: 5, text: 'Gates A, Johnson DW, Klassen TP. Glucocorticoids for Croup in Children. JAMA Pediatrics. 2019;173(6):595-596.' },
  { num: 6, text: 'Parker CM, Cooper MN. Prednisolone Versus Dexamethasone for Croup: A Randomized Controlled Trial. Pediatrics. 2019;144(3):e20183772.' },
  { num: 7, text: 'Smith DK, McDermott AJ, Sullivan JF. Croup: Diagnosis and Management. Am Fam Physician. 2018;97(9):575-580.' },
  { num: 8, text: 'Bjornson CL, Klassen TP, Williamson J, et al. A Randomized Trial of a Single Dose of Oral Dexamethasone for Mild Croup. N Engl J Med. 2004;351(13):1306-13.' },
  { num: 9, text: 'Petrocheilou A, Tanou K, Kalampouka E, et al. Viral Croup: Diagnosis and a Treatment Algorithm. Pediatr Pulmonol. 2014;49(5):421-9.' },
  { num: 10, text: 'Siebert JN, Salomon C, Taddeo I, et al. Outdoor Cold Air Versus Room Temperature Exposure for Croup Symptoms: A Randomized Controlled Trial. Pediatrics. 2023;152(3):e2023061365.' },
  { num: 11, text: 'Moraa I, Sturman N, McGuire TM, van Driel ML. Heliox for Croup in Children. Cochrane Database Syst Rev. 2021;8:CD006822.' },
];

// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------

export const CROUP_CLINICAL_NOTES: string[] = [
  'Single-dose dexamethasone 0.6 mg/kg PO is standard of care for ALL severities of croup \u2014 reduces return visits by ~50% (NNT 7).',
  'Low-dose dexamethasone (0.15 mg/kg) and prednisolone (1 mg/kg) are non-inferior alternatives based on a 1,252-patient RCT.',
  'Nebulized epinephrine provides rapid but transient relief \u2014 requires minimum 2-hour observation for potential rebound.',
  'Humidified air and cool mist have NO evidence of benefit. However, 30-minute outdoor cold air exposure (<10\u00b0C) showed benefit in one RCT.',
  'Use ETT 0.5-1.0 size smaller than age-predicted if intubation needed \u2014 subglottic narrowing is the hallmark of croup.',
  'Antibiotics have no role in uncomplicated croup \u2014 reserve for suspected bacterial tracheitis.',
  'Heliox (70:30) has limited and low-certainty evidence \u2014 not recommended as routine adjunct.',
];
