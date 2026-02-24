// MedKitt — A-Fib RVR (Atrial Fibrillation with Rapid Ventricular Response) Consult
// Initial assessment → hemodynamic stability → rate/rhythm control → anticoagulation → disposition.
// 6 modules: Initial Assessment → Unstable Pathway → Rate Control → Refractory → Anticoagulation → Disposition
// 20 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const AFIB_RVR_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'afib-start',
    type: 'info',
    module: 1,
    title: 'A-Fib RVR: Initial Assessment',
    body: 'Atrial fibrillation with rapid ventricular response (RVR) is characterized by an irregularly irregular rhythm with a ventricular rate typically 120\u2013180 bpm. Confirm with 12-lead ECG.\n\nCOMMON PRECIPITANTS\n\u2022 Electrolyte abnormalities (K\u207a, Mg\u00b2\u207a)\n\u2022 Sepsis / infection\n\u2022 Pulmonary embolism\n\u2022 Thyrotoxicosis\n\u2022 Alcohol use / withdrawal\n\u2022 Pain / agitation\n\u2022 Respiratory failure / hypoxia\n\u2022 Underlying cardiac disease (valvular, ischemic, HF)\n\nAlways treat underlying causes alongside rate control. A-Fib RVR is often a symptom of another process \u2014 rate control alone may be insufficient if the precipitant is not addressed.',
    citation: [1, 3],
    next: 'afib-stability',
  },

  {
    id: 'afib-stability',
    type: 'question',
    module: 1,
    title: 'Hemodynamic Stability',
    body: 'Is the patient hemodynamically stable?',
    options: [
      {
        label: 'Hemodynamically stable',
        description: 'Adequate BP, perfusion, no acute HF or ischemia',
        next: 'afib-stable-drugs',
      },
      {
        label: 'Hemodynamically unstable',
        description: 'Hypotension, acute HF, ongoing ischemia, altered mental status, or shock',
        next: 'afib-unstable-wpw',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: UNSTABLE PATHWAY
  // =====================================================================

  {
    id: 'afib-unstable-wpw',
    type: 'question',
    module: 2,
    title: 'WPW / Pre-Excitation Screen',
    body: 'Is there evidence of WPW / pre-excitation syndrome?\n\nLook for: irregular wide-complex tachycardia, rate >200, variable QRS morphology, delta waves on prior ECG. WPW + A-Fib is a life-threatening emergency.',
    options: [
      {
        label: 'Yes \u2014 WPW / pre-excitation suspected',
        description: 'Irregular wide-complex tachycardia, delta waves, rate >200',
        next: 'afib-wpw-result',
        urgency: 'critical',
      },
      {
        label: 'No \u2014 No pre-excitation',
        description: 'Standard A-Fib RVR without accessory pathway',
        next: 'afib-cardioversion-protocol',
      },
    ],
  },

  {
    id: 'afib-wpw-result',
    type: 'result',
    module: 2,
    title: 'WPW + A-Fib Management',
    body: 'WPW with atrial fibrillation is a life-threatening emergency.\n\nAV nodal blocking agents are ABSOLUTELY CONTRAINDICATED \u2014 including beta-blockers, calcium channel blockers, digoxin, and IV amiodarone. These agents may paradoxically accelerate ventricular response through the accessory pathway and precipitate ventricular fibrillation.',
    recommendation: 'Immediate [synchronized cardioversion](#/info/cardioversion-afib) (200J biphasic). If cardioversion is not immediately available, [Procainamide](#/drug/procainamide) may be used as a temporizing measure.',
    confidence: 'definitive',
    citation: [2, 3],
  },

  {
    id: 'afib-cardioversion-protocol',
    type: 'info',
    module: 2,
    title: 'Synchronized Cardioversion Protocol',
    body: 'SYNCHRONIZED CARDIOVERSION PROTOCOL\n\n1. PREPARATION\n\u2022 Confirm synchronization is enabled on defibrillator\n\u2022 Apply pads: anterior/lateral placement preferred (EPIC trial)\n\u2022 Hyperinflation may impair conduction \u2014 cardiovert at end-expiration if possible\n\n2. SEDATION\n\u2022 Midazolam 3\u20135 mg IV bolus, additional 2 mg q2min PRN to adequate sedation\n\u2022 Alternative: MidaKet for patients resistant to midazolam\n\u2022 Flumazenil 0.5\u20131 mg IV available for reversal\n\n3. CARDIOVERSION\n\u2022 Start at 200J biphasic (use maximal energy available)\n\u2022 Escalate energy if initial attempt unsuccessful\n\n4. POST-CARDIOVERSION\n\u2022 Consider [Amiodarone](#/drug/amiodarone) to maintain sinus rhythm (150mg IV bolus, then 1 mg/min infusion)\n\u2022 Consider IV [Magnesium Sulfate](#/drug/magnesium-sulfate) 2\u20134g to enhance cardioversion success\n\u2022 If cardioversion not immediately feasible, IV [Amiodarone](#/drug/amiodarone) may be used as temporizing measure',
    citation: [1, 2, 5],
    next: 'afib-cardioversion-result',
  },

  {
    id: 'afib-cardioversion-result',
    type: 'result',
    module: 2,
    title: 'Post-Cardioversion Management',
    body: 'Patient has undergone or is undergoing cardioversion for hemodynamically unstable A-Fib RVR.',
    recommendation: 'Continue [Amiodarone](#/drug/amiodarone) infusion to prevent recurrence. Monitor for reversion to A-Fib. Treat underlying precipitants (sepsis, PE, electrolyte abnormalities). Consider anticoagulation assessment once stabilized.',
    confidence: 'recommended',
    citation: [1],
  },

  // =====================================================================
  // MODULE 3: STABLE \u2014 RATE CONTROL
  // =====================================================================

  {
    id: 'afib-stable-drugs',
    type: 'info',
    module: 3,
    title: 'First-Line Rate Control Agents',
    body: 'FIRST-LINE AGENTS FOR RATE CONTROL\n\nBeta-Blockers (Class 1 recommendation):\n\u2022 [Metoprolol](#/drug/metoprolol) \u2014 2.5\u20135 mg IV q5min, up to 15 mg total\n\u2022 [Esmolol](#/drug/esmolol) \u2014 Ultra-short-acting, ideal when rapid titration needed\n\u2022 Safe in COPD (multiple studies confirm no adverse respiratory effects)\n\u2022 Preferred in CAD or compensated HFrEF\n\u2022 Use cautiously in decompensated heart failure\n\nCalcium Channel Blockers:\n\u2022 [Diltiazem](#/drug/diltiazem) \u2014 0.25 mg/kg IV bolus, onset within minutes\n\u2022 [Verapamil](#/drug/verapamil) \u2014 Alternative CCB, less commonly used\n\u2022 90% rate control vs 74% with amiodarone or digoxin\n\u2022 \u26a0\ufe0f CONTRAINDICATED if EF \u226440% or decompensated HF (Class 3: Harm)\n\u2022 Obtain echo or check history for EF if unknown\n\nAdjunctive:\n\u2022 IV [Magnesium Sulfate](#/drug/magnesium-sulfate) \u2014 Reasonable to add (Class 2a). Blocks slow Ca channels at AV node with minimal toxicity.\n\n\u26a0\ufe0f Do NOT combine beta-blockers with calcium channel blockers \u2014 risk of synergistic hypotension.',
    citation: [1, 2, 4],
    next: 'afib-rate-controlled',
  },

  {
    id: 'afib-rate-controlled',
    type: 'question',
    module: 3,
    title: 'Rate Control Assessment',
    body: 'Is the ventricular rate now controlled?\n\nTarget heart rate:\n\u2022 ICU / critically ill: <130 bpm may be reasonable\n\u2022 Outpatient / stable: <100\u2013110 bpm (RACE II trial)\n\u2022 Titrate primarily to control symptoms rather than strict targets\n\u2022 Some patients may benefit from mild compensatory tachycardia \u2014 do not aggressively normalize if rate is due to underlying process',
    options: [
      {
        label: 'Yes \u2014 Rate controlled',
        description: 'Heart rate at target, symptoms improved',
        next: 'afib-onset-assessment',
      },
      {
        label: 'No \u2014 Rate still uncontrolled',
        description: 'Heart rate remains above target despite first-line agent',
        next: 'afib-refractory',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: REFRACTORY RATE CONTROL
  // =====================================================================

  {
    id: 'afib-refractory',
    type: 'question',
    module: 4,
    title: 'Refractory Rate Control',
    body: 'Select second-line intervention for refractory rate control.\n\nFirst-line agent was insufficient. Re-evaluate for underlying causes (sepsis, hypovolemia, pain, PE). Ensure adequate trial of first-line agent before escalating.\n\n\u26a0\ufe0f Avoid combining beta-blockers with calcium channel blockers.',
    options: [
      {
        label: 'Add IV Magnesium',
        description: 'Blocks slow Ca channels at AV node. Excellent safety profile.',
        next: 'afib-refractory-mg',
      },
      {
        label: 'Add Digoxin',
        description: 'Adjunctive when hypotension limits beta-blocker/CCB titration.',
        next: 'afib-refractory-dig',
      },
      {
        label: 'Switch to Amiodarone',
        description: 'More hemodynamically stable. May achieve cardioversion.',
        next: 'afib-refractory-amio',
      },
      {
        label: 'Consider Rhythm Control',
        description: 'When rate control strategy has failed.',
        next: 'afib-rhythm-control',
      },
    ],
  },

  {
    id: 'afib-refractory-mg',
    type: 'info',
    module: 4,
    title: 'Add IV Magnesium',
    body: 'IV [Magnesium Sulfate](#/drug/magnesium-sulfate)\n\n\u2022 2\u20134 grams IV bolus, may follow with continuous infusion\n\u2022 Blocks slow calcium channels in SA and AV nodes\n\u2022 Minimal toxicity \u2014 one meta-analysis detected no adverse events\n\u2022 Even if cardioversion doesn\u2019t occur, magnesium reduces heart rate and augments efficacy of other antiarrhythmics\n\u2022 Contraindicated if GFR <30 mL/min or oliguria \u2014 use intermittent boluses instead\n\u2022 Target serum level ~3\u20134 mg/dL for optimal antiarrhythmic effect',
    citation: [1, 6],
    next: 'afib-refractory-reassess',
  },

  {
    id: 'afib-refractory-dig',
    type: 'info',
    module: 4,
    title: 'Add Digoxin',
    body: '[Digoxin](#/drug/digoxin)\n\n\u2022 Useful when hypotension limits further titration of beta-blockers or CCBs\n\u2022 Slow onset: ~3 hours to achieve rate control (vs 5 min for diltiazem)\n\u2022 Limited efficacy during exertion \u2014 slows primarily resting heart rate\n\u2022 \u26a0\ufe0f Post hoc analyses associate digoxin with increased mortality in A-Fib\n\u2022 Use at low doses, typically in combination with other AV nodal agents\n\u2022 May be particularly useful in patients with concurrent heart failure',
    citation: [1, 2, 3],
    next: 'afib-refractory-reassess',
  },

  {
    id: 'afib-refractory-amio',
    type: 'info',
    module: 4,
    title: 'Switch to Amiodarone',
    body: '[Amiodarone](#/drug/amiodarone)\n\n\u2022 Load with 150 mg IV bolus over 10 min, then 1 mg/min infusion\n\u2022 May need to re-bolus 150 mg x2\u20133 (total 150\u2013450 mg in boluses)\n\u2022 More hemodynamically stable than beta-blockers or CCBs\n\u2022 May achieve chemical cardioversion \u2014 beneficial if rhythm control desired\n\u2022 74% rate control achieved in clinical trials\n\u2022 \u26a0\ufe0f Do not conclude amiodarone has failed without adequate re-bolusing\n\u2022 If cardioversion occurs, continue infusion until critical illness resolves',
    citation: [1, 2, 5],
    next: 'afib-refractory-reassess',
  },

  {
    id: 'afib-rhythm-control',
    type: 'info',
    module: 4,
    title: 'Consider Rhythm Control',
    body: 'RHYTHM CONTROL STRATEGY\n\nConsider when rate control strategy has failed or in new-onset AF where conversion is desirable.\n\nStepwise approach:\n1. IV [Magnesium Sulfate](#/drug/magnesium-sulfate) infusion (front-line, excellent safety)\n2. [Amiodarone](#/drug/amiodarone) if magnesium alone insufficient\n3. DC cardioversion (especially in intubated patients)\n\nFactors favoring rhythm control:\n\u2022 New-onset AF (NOAF) \u2014 likely to revert\n\u2022 Pulmonary hypertension, mitral stenosis, diastolic dysfunction\n\u2022 Heart failure with reduced EF\n\u2022 Failure of rate control\n\nFactors favoring rate control:\n\u2022 Chronic/longstanding AF\n\u2022 Onset >48 hours without anticoagulation\n\u2022 Ongoing severe physiological stress',
    citation: [1, 3, 7],
    next: 'afib-refractory-reassess',
  },

  {
    id: 'afib-refractory-reassess',
    type: 'question',
    module: 4,
    title: 'Post-Intervention Reassessment',
    body: 'Is the rate now controlled after second-line intervention?',
    options: [
      {
        label: 'Yes \u2014 Rate controlled',
        description: 'Heart rate at target, symptoms improved',
        next: 'afib-onset-assessment',
      },
      {
        label: 'No \u2014 Still refractory',
        description: 'Consider combining agents or rhythm control if not yet attempted',
        next: 'afib-refractory',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 5: AF ONSET & ANTICOAGULATION
  // =====================================================================

  {
    id: 'afib-onset-assessment',
    type: 'question',
    module: 5,
    title: 'AF Onset Assessment',
    body: 'Is this new-onset AF or known/chronic AF?\n\nDistinguishing onset is important for anticoagulation decisions and rhythm control candidacy.\n\nNew-onset AF (NOAF): First episode, occurring during current hospitalization or acute illness. Often reverts spontaneously as underlying cause resolves.\n\nKnown/Chronic AF: Pre-existing AF documented prior to current presentation, or AF duration >48 hours.',
    options: [
      {
        label: 'New-onset AF (NOAF)',
        description: 'First episode during current illness/hospitalization',
        next: 'afib-noaf-anticoag',
      },
      {
        label: 'Known/Chronic AF or onset >48 hours',
        description: 'Pre-existing AF or duration exceeds 48 hours',
        next: 'afib-cha2ds2vasc',
      },
    ],
  },

  {
    id: 'afib-noaf-anticoag',
    type: 'info',
    module: 5,
    title: 'NOAF \u2014 Anticoagulation Considerations',
    body: 'NEW-ONSET AF IN CRITICAL ILLNESS\n\nAnticoagulation is generally NOT recommended for NOAF:\n\u2022 Retrospective studies show anticoagulation increases bleeding risk without reducing stroke incidence\n\u2022 Most patients with NOAF will revert to sinus rhythm as critical illness resolves\n\u2022 Survey of UK intensivists: 64% do not routinely anticoagulate NOAF\n\nExceptions \u2014 consider anticoagulation if:\n\u2022 AF persists >48 hours\n\u2022 High stroke risk with low bleeding risk\n\u2022 AF continues beyond resolution of acute illness\n\nIf AF persists for weeks, reassess with [CHA\u2082DS\u2082-VASc scoring](#/calculator/cha2ds2vasc) as chronic AF management becomes appropriate.',
    citation: [3, 8, 9],
    next: 'afib-disposition',
  },

  {
    id: 'afib-cha2ds2vasc',
    type: 'info',
    module: 5,
    title: 'CHA\u2082DS\u2082-VASc Assessment',
    body: 'ANTICOAGULATION FOR KNOWN/CHRONIC AF\n\nAssess stroke risk using [CHA\u2082DS\u2082-VASc score](#/calculator/cha2ds2vasc):\n\nAnticoagulation Recommendations:\n\u2022 Score \u22652 (men) or \u22653 (women) \u2192 Anticoagulate (strong recommendation)\n\u2022 Score 1 (men) or 2 (women) \u2192 Consider anticoagulation\n\u2022 Score 0 (men) or 1 (women) \u2192 May omit anticoagulation\n\nPreferred agents: [Apixaban](#/drug/apixaban/atrial fibrillation), [Rivaroxaban](#/drug/rivaroxaban/atrial fibrillation) (DOACs preferred over warfarin)\n\n\u26a0\ufe0f If AF duration >48 hours and patient is NOT anticoagulated:\n\u2022 Consider TEE to exclude left atrial appendage thrombus before cardioversion\n\u2022 Or initiate anticoagulation for \u22653 weeks before elective cardioversion',
    calculatorLinks: [
      { id: 'cha2ds2vasc', label: 'Calculate CHA\u2082DS\u2082-VASc' },
    ],
    citation: [1, 3, 10],
    next: 'afib-disposition',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'afib-disposition',
    type: 'result',
    module: 6,
    title: 'A-Fib RVR \u2014 Disposition & Follow-Up',
    body: 'DISPOSITION CONSIDERATIONS\n\n\u2022 Continue rate control agent that achieved control\n\u2022 Target resting HR <100\u2013110 bpm for outpatient management\n\u2022 Assess heart rate response during exertion (ambulatory monitoring or brisk walk)\n\u2022 Ensure electrolytes are corrected (K\u207a, Mg\u00b2\u207a)\n\u2022 Address underlying precipitants\n\u2022 Cardiology follow-up for: new-onset AF, rhythm control consideration, AV node ablation candidacy\n\u2022 For patients with refractory symptoms despite optimal medical therapy, AV node ablation with permanent pacemaker may be considered',
    recommendation: 'Disposition based on clinical stability and rate control achieved. Ensure anticoagulation addressed per [CHA\u2082DS\u2082-VASc](#/calculator/cha2ds2vasc). Arrange cardiology follow-up. Review [Discharge Instructions](#/info/afib-discharge) with patient before discharge.',
    confidence: 'recommended',
    citation: [1, 2, 3],
  },

];

export const AFIB_RVR_NODE_COUNT = AFIB_RVR_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for flowchart progress bar)
// -------------------------------------------------------------------

export const AFIB_RVR_MODULE_LABELS = [
  'Initial Assessment',
  'Unstable Pathway',
  'Rate Control',
  'Refractory',
  'Anticoagulation',
  'Disposition',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const AFIB_RVR_CITATIONS: Citation[] = [
  { num: 1, text: 'Joglar JA, Chung MK, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. J Am Coll Cardiol. 2024;83(1):109-279.' },
  { num: 2, text: 'Wigginton JG, Agarwal S, et al. Part 9: Adult Advanced Life Support: 2025 AHA Guidelines for CPR and ECC. Circulation. 2025;152(16_suppl_2):S538-S577.' },
  { num: 3, text: 'Ko D, Chung MK, et al. Atrial Fibrillation: A Review. JAMA. 2025;333(4):329-342.' },
  { num: 4, text: 'Prystowsky EN, Padanilam BJ, Fogel RI. Treatment of Atrial Fibrillation. JAMA. 2015;314(3):278-88.' },
  { num: 5, text: 'Panchal AR, Bartos JA, et al. Part 3: Adult Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(16_suppl_2):S366-S468.' },
  { num: 6, text: 'Michaud GF, Stevenson WG. Atrial Fibrillation. N Engl J Med. 2021;384(4):353-361.' },
  { num: 7, text: 'Bosch NA, Cimini J, Walkey AJ. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434.' },
  { num: 8, text: 'Chyou JY, Barkoudah E, et al. Atrial Fibrillation Occurring During Acute Hospitalization: AHA Scientific Statement. Circulation. 2023;147(15):e676-e698.' },
  { num: 9, text: 'Long B, Brady WJ, Gottlieb M. Emergency Medicine Updates: Atrial Fibrillation with Rapid Ventricular Response. Am J Emerg Med. 2023;74:57-64.' },
  { num: 10, text: 'Wolfes J, Ellermann C, et al. Comparison of Latest ESC, ACC/AHA/ACCP/HRS, and CCS Guidelines on AF Management. JACC Clin Electrophysiol. 2025;11(4):836-849.' },
];
