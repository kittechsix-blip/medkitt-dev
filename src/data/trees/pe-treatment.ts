// MedKitt — Pulmonary Embolism Treatment Consult
// Risk stratification → management per Dell Seton hospital protocol (ESC 2019 guidelines).
// 5 modules: Risk Classification → High Risk → Intermediate-High → Intermediate-Low → Low Risk
// 29 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation, TestRow } from './neurosyphilis.js';

export const PE_TREATMENT_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RISK CLASSIFICATION
  // =====================================================================

  {
    id: 'pe-start',
    type: 'info',
    module: 1,
    title: 'PE Treatment: Risk Stratification',
    body: 'This consult guides acute pulmonary embolism management based on hemodynamic status, right ventricular function, cardiac biomarkers, and clinical severity.\n\nRISK CLASSIFICATION\n\u2022 High Risk: Hemodynamically unstable (RV enlargement + elevated troponin)\n\u2022 Intermediate-High: Stable, high clinical severity (PESI >86 or sPESI \u22651), RV enlargement + elevated troponin\n\u2022 Intermediate-Low: Stable, one of RV enlargement OR elevated troponin\n\u2022 Low Risk: Stable, low clinical severity (PESI <86 or sPESI = 0), no RV enlargement, no elevated troponin\n\nClinical severity is determined by PESI or sPESI score:\n\u2022 High severity: PESI > 86 (Class III\u2013V) or sPESI \u2265 1\n\u2022 Low severity: PESI < 86 (Class I\u2013II) or sPESI = 0',
    citation: [1],
    next: 'pe-hemodynamics',
  },

  {
    id: 'pe-hemodynamics',
    type: 'question',
    module: 1,
    title: 'Hemodynamic Status',
    body: 'Is the patient hemodynamically unstable?',
    options: [
      {
        label: 'Hemodynamically unstable',
        description: 'SBP < 90 mmHg sustained, vasopressor requirement, or cardiac arrest',
        next: 'pe-high-anticoag',
        urgency: 'critical',
      },
      {
        label: 'Hemodynamically stable',
        description: 'SBP \u2265 90 mmHg, adequate perfusion',
        next: 'pe-rv',
      },
    ],
  },

  {
    id: 'pe-rv',
    type: 'question',
    module: 1,
    title: 'RV Assessment',
    body: 'Is there RV enlargement or dysfunction on echocardiography or CTPA?',
    options: [
      {
        label: 'Yes \u2014 RV enlargement/dysfunction',
        description: 'Echo: RV dilation, hypokinesis, or CTPA: RV/LV ratio > 0.9',
        next: 'pe-troponin-rv-pos',
        urgency: 'urgent',
      },
      {
        label: 'No \u2014 Normal RV',
        description: 'No evidence of right ventricular strain',
        next: 'pe-troponin-rv-neg',
      },
    ],
  },

  {
    id: 'pe-troponin-rv-pos',
    type: 'question',
    module: 1,
    title: 'Troponin (RV Positive)',
    body: 'RV enlargement/dysfunction confirmed. Is troponin elevated?',
    options: [
      {
        label: 'Yes \u2014 Troponin elevated',
        description: 'Both RV dysfunction and elevated troponin \u2014 assess clinical severity',
        next: 'pe-severity',
        urgency: 'urgent',
      },
      {
        label: 'No \u2014 Troponin normal',
        description: 'RV dysfunction without biomarker elevation \u2014 intermediate-low risk',
        next: 'pe-int-low-anticoag',
      },
    ],
  },

  {
    id: 'pe-severity',
    type: 'question',
    module: 1,
    title: 'Clinical Severity (PESI / sPESI)',
    body: 'Both RV dysfunction and elevated troponin are present. Determine clinical severity using PESI or sPESI score.\n\nHigh severity: PESI > 86 (Class III\u2013V) or sPESI \u2265 1\nLow severity: PESI < 86 (Class I\u2013II) or sPESI = 0',
    calculatorLinks: [
      { id: 'pesi', label: 'Calculate PESI' },
      { id: 'spesi', label: 'Calculate sPESI' },
    ],
    citation: [1],
    options: [
      {
        label: 'High clinical severity',
        description: 'PESI > 86 (Class III\u2013V) or sPESI \u2265 1',
        next: 'pe-int-high-anticoag',
        urgency: 'urgent',
      },
      {
        label: 'Low clinical severity',
        description: 'PESI < 86 (Class I\u2013II) or sPESI = 0',
        next: 'pe-int-low-anticoag',
      },
    ],
  },

  {
    id: 'pe-troponin-rv-neg',
    type: 'question',
    module: 1,
    title: 'Troponin (RV Normal)',
    body: 'No RV enlargement/dysfunction. Is troponin elevated?',
    options: [
      {
        label: 'Yes \u2014 Troponin elevated',
        description: 'Elevated troponin without RV dysfunction \u2014 intermediate-low risk',
        next: 'pe-int-low-anticoag',
      },
      {
        label: 'No \u2014 Troponin normal',
        description: 'No RV dysfunction, no biomarker elevation \u2014 low risk',
        next: 'pe-low-anticoag',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: HIGH RISK MANAGEMENT
  // =====================================================================

  {
    id: 'pe-high-anticoag',
    type: 'question',
    module: 2,
    title: 'Systemic Anticoagulation \u2014 High Risk',
    body: 'HIGH RISK PE: Hemodynamically unstable.\n\nIs systemic anticoagulation contraindicated?\n\nAbsolute contraindications:\n\u2022 Life-threatening active bleeding\n\u2022 Platelet count < 25\n\u2022 Spinal procedure and/or epidural placement (discuss with proceduralist)\n\nRelative contraindications:\n\u2022 Brain metastases conferring risk of bleeding (renal, choriocarcinoma, melanoma, thyroid cancer)\n\u2022 Intracranial or CNS bleeding within the past 4 weeks\n\u2022 Recent high-risk surgery or bleeding event\n\u2022 Active but non-life-threatening bleeding\n\u2022 Active GI ulceration at high risk of bleeding\n\u2022 Platelets < 50',
    citation: [1],
    options: [
      {
        label: 'Not contraindicated \u2014 Start IV heparin',
        description: 'Start intravenous unfractionated heparin infusion',
        next: 'pe-high-heparin',
      },
      {
        label: 'Contraindicated',
        description: 'Absolute or relative contraindication to anticoagulation',
        next: 'pe-high-anticoag-contra',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'pe-high-anticoag-contra',
    type: 'result',
    module: 2,
    title: 'High Risk PE \u2014 Anticoagulation Contraindicated',
    body: 'Systemic anticoagulation is contraindicated in this patient.',
    recommendation: 'Goals of care discussion. Consider IVC filter placement.',
    confidence: 'consider',
    citation: [1],
  },

  {
    id: 'pe-high-heparin',
    type: 'info',
    module: 2,
    title: 'IV Heparin Started \u2014 Evaluate for Thrombolytics',
    body: 'Intravenous [unfractionated heparin](#/drug/ufh) infusion initiated.\n\nDose: Bolus 80 units/kg (or 5,000 units) IV, then continuous infusion at 18 units/kg/hour.\n\nNow evaluate for systemic thrombolysis. Review contraindications to fibrinolysis before proceeding.',
    next: 'pe-high-lytic-check',
  },

  {
    id: 'pe-high-lytic-check',
    type: 'question',
    module: 2,
    title: 'Thrombolytics \u2014 Contraindication Screen',
    body: 'Are thrombolytics contraindicated?\n\nAbsolute contraindications to fibrinolysis:\n\u2022 History of haemorrhagic stroke or stroke of unknown origin\n\u2022 Ischaemic stroke in previous 6 months\n\u2022 Central nervous system neoplasm\n\u2022 Major trauma, surgery, or head injury in previous 3 weeks\n\u2022 Bleeding diathesis\n\u2022 Active bleeding\n\nRelative contraindications:\n\u2022 Transient ischaemic attack in previous 6 months\n\u2022 Oral anticoagulation\n\u2022 Pregnancy or first post-partum week\n\u2022 Non-compressible puncture sites\n\u2022 Traumatic resuscitation\n\u2022 Refractory hypertension (systolic BP > 180 mmHg)\n\u2022 Advanced liver disease\n\u2022 Infective endocarditis\n\u2022 Active peptic ulcer',
    citation: [1],
    options: [
      {
        label: 'Not contraindicated \u2014 Give thrombolytics',
        description: 'No absolute or relative contraindications to fibrinolysis',
        next: 'pe-high-lytic-protocol',
      },
      {
        label: 'Contraindicated',
        description: 'Absolute or relative contraindication to fibrinolysis',
        next: 'pe-high-lytic-contra',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'pe-high-lytic-contra',
    type: 'result',
    module: 2,
    title: 'High Risk PE \u2014 Thrombolytics Contraindicated',
    body: 'Thrombolytics are contraindicated in this patient. Anticoagulation with IV [heparin](#/drug/ufh) continues.',
    recommendation: 'Consider goals of care discussion and IVC filter placement.',
    confidence: 'consider',
    citation: [1],
  },

  {
    id: 'pe-high-lytic-protocol',
    type: 'info',
    module: 2,
    title: 'Alteplase Protocol',
    body: 'SYSTEMIC THROMBOLYSIS PROTOCOL\n\n1. Stop [unfractionated heparin](#/drug/ufh) drip\n\n2. Start 100 mg of [alteplase](#/drug/alteplase) administered over 2 hours\n   \u2022 0.6 mg/kg up to a max of 50 mg administered over first 15 minutes\n   \u2022 Remainder administered over next 1 hour 45 minutes\n   \u2022 Adjust based on clinical severity\n\n3. When [alteplase](#/drug/alteplase) infusion is complete, check PTT level:\n   a. If PTT \u2264 75: Start intravenous [unfractionated heparin](#/drug/ufh) gtt without initial bolus\n   b. If PTT > 75: Repeat PTT level q 2 hours until PTT \u2264 75, then start intravenous [unfractionated heparin](#/drug/ufh) gtt without initial bolus',
    citation: [1],
    next: 'pe-high-lytic-response',
  },

  {
    id: 'pe-high-lytic-response',
    type: 'question',
    module: 2,
    title: 'Thrombolytic Response Assessment',
    body: 'Evaluate response to thrombolytics (1\u20132 hours):\n\nSBP > 90 mmHg with improvement in clinical condition?',
    options: [
      {
        label: 'Yes \u2014 SBP > 90, clinical improvement',
        description: 'Hemodynamic recovery after thrombolysis',
        next: 'pe-high-respond-yes',
      },
      {
        label: 'No \u2014 Persistent hemodynamic compromise',
        description: 'No improvement despite thrombolytic therapy',
        next: 'pe-high-respond-no',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'pe-high-respond-yes',
    type: 'result',
    module: 2,
    title: 'Thrombolysis Successful \u2014 Continue Anticoagulation',
    body: 'Patient responded to thrombolytic therapy with hemodynamic improvement.',
    recommendation: 'Continue anticoagulation. Transition to long-term therapy when clinically stable.',
    confidence: 'definitive',
    citation: [1],
  },

  {
    id: 'pe-high-respond-no',
    type: 'result',
    module: 2,
    title: 'Thrombolysis Failed \u2014 Rescue Interventions',
    body: 'No hemodynamic improvement after thrombolytic therapy.',
    recommendation: 'Consider rescue interventions:\n\u2022 Mechanical thrombectomy\n\u2022 Low-dose catheter-directed thrombolysis\n\u2022 IVC filter placement\n\u2022 Transfer to a cardiac center for surgical thrombectomy\n\u2022 ECMO',
    confidence: 'definitive',
    citation: [1],
  },

  // =====================================================================
  // MODULE 3: INTERMEDIATE-HIGH RISK MANAGEMENT
  // =====================================================================

  {
    id: 'pe-int-high-anticoag',
    type: 'question',
    module: 3,
    title: 'Systemic Anticoagulation \u2014 Intermediate-High Risk',
    body: 'INTERMEDIATE-HIGH RISK PE: Hemodynamically stable with RV dysfunction, elevated troponin, and high clinical severity.\n\nIs systemic anticoagulation contraindicated?\n\n*** Screen for enrollment in clinical trial ***',
    citation: [1],
    options: [
      {
        label: 'Not contraindicated',
        description: 'Start IV unfractionated heparin infusion and evaluate reperfusion strategy',
        next: 'pe-int-high-strategy',
      },
      {
        label: 'Contraindicated',
        description: 'Cannot anticoagulate',
        next: 'pe-int-high-contra',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'pe-int-high-contra',
    type: 'result',
    module: 3,
    title: 'Intermediate-High Risk \u2014 Anticoag Contraindicated',
    body: 'Systemic anticoagulation is contraindicated.\n\nIVC filter recommendations (ESC 2019):\n\u2022 IVC filters should be considered in patients with acute PE and absolute contraindications to anticoagulation (Class IIa, Level C)\n\u2022 IVC filters should be considered in cases of PE recurrence despite therapeutic anticoagulation (Class IIa, Level C)\n\u2022 Routine use of IVC filters is not recommended (Class III, Level A)\n\nIf able to tolerate periprocedural anticoagulation, consider:\n\u2022 Percutaneous mechanical thrombectomy\n\u2022 Transfer for surgical thrombectomy',
    recommendation: 'Consider goals of care discussion and IVC filter placement. If periprocedural anticoagulation tolerable, consider interventional approach.',
    confidence: 'consider',
    citation: [1],
  },

  {
    id: 'pe-int-high-strategy',
    type: 'question',
    module: 3,
    title: 'Reperfusion Strategy',
    body: 'IV [heparin](#/drug/ufh) initiated. Evaluate for invasive reperfusion strategy vs trial of systemic anticoagulation.\n\n*** Screen for enrollment in clinical trial ***\n\nAssess clot burden and clinical findings to guide management approach.',
    citation: [1],
    options: [
      {
        label: 'CDT \u2014 Moderate/segmental findings',
        description: 'Moderate to severe clinical findings or segmental/subsegmental without proximal or saddle thrombus',
        next: 'pe-int-high-cdt',
      },
      {
        label: 'CDT + Mechanical \u2014 Severe/proximal clot',
        description: 'Severe clinical findings or large proximal clot burden',
        next: 'pe-int-high-severe',
        urgency: 'urgent',
      },
      {
        label: 'Systemic heparin trial \u2014 Monitor',
        description: 'Trial of systemic heparin as initial management strategy',
        next: 'pe-int-high-heparin',
      },
    ],
  },

  {
    id: 'pe-int-high-cdt',
    type: 'result',
    module: 3,
    title: 'Catheter-Directed Thrombolysis (CDT)',
    body: 'Moderate to severe clinical findings or segmental/subsegmental thrombus without proximal or saddle involvement.',
    recommendation: 'Low-dose catheter-directed thrombolysis / EKOS.',
    confidence: 'recommended',
    citation: [1],
  },

  {
    id: 'pe-int-high-severe',
    type: 'result',
    module: 3,
    title: 'Severe Clot Burden \u2014 Aggressive Intervention',
    body: 'Severe clinical findings or large proximal clot burden.',
    recommendation: 'Recommended interventions:\n1. Low-dose catheter-directed thrombolysis / EKOS\n2. Percutaneous mechanical thrombectomy\n\nIf clinical worsening despite invasive treatment:\n\u2022 Mechanical thrombectomy (if not already performed)\n\u2022 Consider transfer to a cardiac center for surgical thrombectomy or ECMO',
    confidence: 'definitive',
    citation: [1],
  },

  {
    id: 'pe-int-high-heparin',
    type: 'result',
    module: 3,
    title: 'Systemic Heparin Trial \u2014 Monitor',
    body: 'Trial of systemic [heparin](#/drug/ufh) chosen as initial management strategy. Monitor closely for clinical worsening.',
    recommendation: 'Continue IV [heparin](#/drug/ufh) with close monitoring.\n\nIf clinical worsening, consider escalation:\n\u2022 Low-dose catheter-directed thrombolysis / EKOS\n\u2022 Percutaneous mechanical thrombectomy\n\u2022 Systemic thrombolysis',
    confidence: 'recommended',
    citation: [1],
  },

  // =====================================================================
  // MODULE 4: INTERMEDIATE-LOW RISK MANAGEMENT
  // =====================================================================

  {
    id: 'pe-int-low-anticoag',
    type: 'question',
    module: 4,
    title: 'Systemic Anticoagulation \u2014 Intermediate-Low Risk',
    body: 'INTERMEDIATE-LOW RISK PE: Hemodynamically stable with one of RV enlargement OR elevated troponin (not both with high clinical severity).\n\nIs systemic anticoagulation contraindicated?',
    citation: [1],
    options: [
      {
        label: 'Not contraindicated',
        description: 'Start anticoagulation therapy',
        next: 'pe-int-low-treat',
      },
      {
        label: 'Contraindicated',
        description: 'Cannot anticoagulate',
        next: 'pe-int-low-contra',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'pe-int-low-contra',
    type: 'result',
    module: 4,
    title: 'Intermediate-Low Risk \u2014 Anticoag Contraindicated',
    body: 'Systemic anticoagulation is contraindicated.',
    recommendation: 'Consider goals of care discussion and IVC filter placement.\n\nIVC filter recommendations (ESC 2019):\n\u2022 IVC filters should be considered with absolute contraindications to anticoagulation (Class IIa, Level C)\n\u2022 Routine use of IVC filters is not recommended (Class III, Level A)',
    confidence: 'consider',
    citation: [1],
  },

  {
    id: 'pe-int-low-treat',
    type: 'result',
    module: 4,
    title: 'Intermediate-Low Risk \u2014 Anticoagulation',
    body: 'Start systemic anticoagulation:\n\u2022 Intravenous [unfractionated heparin](#/drug/ufh) infusion, or\n\u2022 [LMWH (enoxaparin)](#/drug/enoxaparin) 1 mg/kg SC\n\n[LMWH](#/drug/enoxaparin) Contraindications & Cautions:\n\u2022 Severe renal insufficiency (CrCl \u226430 mL/min) \u2014 significantly increased bleeding risk (OR 2.25 for major bleeding). Consider UFH when CrCl <25\u201330 mL/min.\n\u2022 Heparin-induced thrombocytopenia (HIT) \u2014 absolute contraindication due to cross-reactivity.\n\u2022 Neuraxial anesthesia \u2014 administer LMWH \u226512 hr before catheter placement/removal; delay dosing \u22654 hr after removal. No twice-daily LMWH with indwelling neuraxial catheter.\n\u2022 Extreme body weight (<40 kg or >100 kg), pregnancy, pediatrics \u2014 consider anti-Xa monitoring. Monitor if >150 kg.\n\u2022 LMWH effects cannot be completely reversed by protamine sulfate.',
    recommendation: 'Initiate anticoagulation and monitor for clinical worsening.\n\nIf clinical worsening, consider escalation:\n\u2022 Low-dose catheter-directed thrombolysis / EKOS\n\u2022 Percutaneous mechanical thrombectomy\n\u2022 Systemic thrombolysis',
    confidence: 'recommended',
    citation: [1],
  },

  // =====================================================================
  // MODULE 5: LOW RISK MANAGEMENT
  // =====================================================================

  {
    id: 'pe-low-anticoag',
    type: 'question',
    module: 5,
    title: 'Systemic Anticoagulation \u2014 Low Risk',
    body: 'LOW RISK PE: Hemodynamically stable, low clinical severity, no RV dysfunction, no elevated troponin.\n\nIs systemic anticoagulation contraindicated?',
    citation: [1],
    options: [
      {
        label: 'Not contraindicated',
        description: 'Start anticoagulation therapy',
        next: 'pe-low-treat',
      },
      {
        label: 'Contraindicated',
        description: 'Cannot anticoagulate',
        next: 'pe-low-contra',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'pe-low-contra',
    type: 'result',
    module: 5,
    title: 'Low Risk PE \u2014 Anticoag Contraindicated',
    body: 'Systemic anticoagulation is contraindicated.',
    recommendation: 'Consider IVC filter placement.',
    confidence: 'consider',
    citation: [1],
  },

  {
    id: 'pe-low-treat',
    type: 'question',
    module: 5,
    title: 'Low Risk PE \u2014 Treatment & Disposition',
    body: 'Start anticoagulation:\n\u2022 Intravenous [unfractionated heparin](#/drug/ufh) infusion\n\u2022 [LMWH (enoxaparin)](#/drug/enoxaparin) 1 mg/kg SC\n\u2022 [Oral anticoagulation](#/info/doac-pe) ([rivaroxaban](#/drug/rivaroxaban) or [edoxaban](#/drug/edoxaban) preferred)\n\n[LMWH](#/drug/enoxaparin) Contraindications & Cautions:\n\u2022 Severe renal insufficiency (CrCl \u226430 mL/min) \u2014 significantly increased bleeding risk (OR 2.25 for major bleeding). Consider UFH when CrCl <25\u201330 mL/min.\n\u2022 Heparin-induced thrombocytopenia (HIT) \u2014 absolute contraindication due to cross-reactivity.\n\u2022 Neuraxial anesthesia \u2014 administer LMWH \u226512 hr before catheter placement/removal; delay dosing \u22654 hr after removal. No twice-daily LMWH with indwelling neuraxial catheter.\n\u2022 Extreme body weight (<40 kg or >100 kg), pregnancy, pediatrics \u2014 consider anti-Xa monitoring. Monitor if >150 kg.\n\u2022 LMWH effects cannot be completely reversed by protamine sulfate.\n\nConsider discharge home if ALL criteria met:\n\u2022 Clinically stable\n\u2022 No other reason for hospitalization\n\u2022 Easy access to medical care\n\u2022 Family and social support',
    citation: [1],
    options: [
      {
        label: 'Admit \u2014 Inpatient anticoagulation',
        description: 'Does not meet all discharge criteria',
        next: 'pe-low-admit',
      },
      {
        label: 'Discharge home \u2014 Meets all criteria',
        description: 'Clinically stable, access to care, family/social support',
        next: 'pe-low-discharge',
      },
    ],
  },

  {
    id: 'pe-low-admit',
    type: 'result',
    module: 5,
    title: 'Low Risk PE \u2014 Inpatient Anticoagulation',
    body: 'Patient does not meet discharge criteria. Admit for anticoagulation initiation and monitoring.',
    recommendation: 'Start anticoagulation ([UFH](#/drug/ufh), [LMWH](#/drug/enoxaparin) SC, or oral) and monitor. Reassess discharge eligibility when clinically appropriate. See [LMWH](#/drug/enoxaparin) contraindications/cautions in treatment options.',
    confidence: 'recommended',
    citation: [1],
  },

  {
    id: 'pe-low-discharge',
    type: 'result',
    module: 5,
    title: 'Low Risk PE \u2014 Outpatient Management',
    body: 'Patient meets all discharge criteria:\n\u2022 Clinically stable\n\u2022 No other reason for hospitalization\n\u2022 Easy access to medical care\n\u2022 Family and social support',
    recommendation: 'Discharge home on oral anticoagulation ([rivaroxaban](#/drug/rivaroxaban) or [edoxaban](#/drug/edoxaban) preferred) with close outpatient follow-up.',
    confidence: 'recommended',
    citation: [1],
  },

];

export const PE_TREATMENT_NODE_COUNT = PE_TREATMENT_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for flowchart progress bar)
// -------------------------------------------------------------------

export const PE_TREATMENT_MODULE_LABELS = [
  'Risk Classification',
  'High Risk',
  'Intermediate-High',
  'Intermediate-Low',
  'Low Risk',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const PE_TREATMENT_CITATIONS: Citation[] = [
  { num: 1, text: 'Konstantinides SV, et al. 2019 ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603.' },
  { num: 2, text: 'Aujesky D, et al. Derivation and Validation of a Prognostic Model for Pulmonary Embolism (PESI). Am J Respir Crit Care Med. 2005;172(8):1041-1046.' },
  { num: 3, text: 'Freund Y, Cohen-Aubart F, Bloom B. Acute Pulmonary Embolism: A Review. JAMA. 2022;328(13):1336-1345.' },
  { num: 4, text: 'Goldhaber SZ, Bounameaux H. Pulmonary Embolism and Deep Vein Thrombosis. Lancet. 2012;379(9828):1835-1846.' },
  { num: 5, text: 'Konstantinides SV, et al. Management of Pulmonary Embolism: An Update. J Am Coll Cardiol. 2016;67(8):976-990.' },
  { num: 6, text: 'Di Nisio M, van Es N, B\u00fcller HR. Deep Vein Thrombosis and Pulmonary Embolism. Lancet. 2016;388(10063):3060-3073.' },
  { num: 7, text: 'Zuin M, Bikdeli B, et al. International Clinical Practice Guideline Recommendations for Acute Pulmonary Embolism: Harmony, Dissonance, and Silence. J Am Coll Cardiol. 2024;83(21):2068-2082.' },
];

// -------------------------------------------------------------------
// Diagnostic Test / Risk Marker Data (for reference page)
// -------------------------------------------------------------------

export const PE_TREATMENT_DIAGNOSTIC_TESTS: TestRow[] = [
  { test: 'PESI Score (original)', sensitivity: '\u2014', specificity: '\u2014', role: '11-variable scoring system. Class I\u2013II (\u226485): low risk. Class III\u2013V (>86): high clinical severity.' },
  { test: 'sPESI Score (simplified)', sensitivity: '\u2014', specificity: '\u2014', role: '6-variable scoring. Score 0: low risk (~1% mortality). Score \u22651: intermediate/high risk (~10.9% mortality).' },
  { test: 'CT RV/LV ratio > 0.9', sensitivity: '~80%', specificity: '~85%', role: 'Predicts RV dysfunction on initial CTA. Key marker for submassive classification.' },
  { test: 'Troponin elevation', sensitivity: '~73%', specificity: '~55%', role: 'RV myocardial injury marker. Combined with RV dysfunction \u2192 intermediate-high risk.' },
  { test: 'BNP > 100 / NT-proBNP > 600', sensitivity: '~85%', specificity: '~55%', role: 'RV strain marker. Elevated in acute RV pressure overload. Supports risk stratification.' },
];

// -------------------------------------------------------------------
// Key Clinical Notes (for reference page)
// -------------------------------------------------------------------

export const PE_TREATMENT_CLINICAL_NOTES: string[] = [
  'High risk PE = hemodynamically unstable (SBP < 90 sustained, vasopressors, or cardiac arrest). Do not delay treatment for additional imaging in unstable patients.',
  'Intermediate-high risk requires ALL THREE: RV dysfunction + elevated troponin + high clinical severity (PESI > 86 or sPESI \u2265 1). If any one is absent, classify as intermediate-low.',
  'Alteplase protocol for high-risk PE: 100 mg IV over 2 hours (0.6 mg/kg up to 50 mg over first 15 min, remainder over next 1 hr 45 min). Check PTT post-infusion before restarting heparin.',
  'Absolute contraindications to anticoagulation: life-threatening active bleeding, platelets < 25, spinal procedure/epidural. Relative: brain mets, ICH within 4 weeks, recent surgery, platelets < 50.',
  'Low-risk PE patients may be candidates for outpatient management if: clinically stable, no other reason for hospitalization, easy access to medical care, and family/social support.',
  'IVC filters should only be considered with absolute contraindications to anticoagulation or PE recurrence despite therapeutic anticoagulation. Routine use is NOT recommended (ESC Class III, Level A).',
];
