// MedKitt — Clinical Calculator Component
// Standalone calculators for scoring systems (PESI, sPESI, etc.)
// Renders interactive forms with real-time score computation.

import { router } from '../services/router.js';

// -------------------------------------------------------------------
// Calculator Interfaces
// -------------------------------------------------------------------

interface SelectOption {
  label: string;
  points: number;
}

interface CalculatorField {
  name: string;
  label: string;
  type: 'number' | 'toggle' | 'select';
  /** Fixed points added when toggle is ON */
  points: number;
  /** For number fields: if true, the field value itself is the point value (e.g., age) */
  valueIsPoints?: boolean;
  /** Subtitle text shown below the label */
  description?: string;
  /** Unit label for number inputs */
  unit?: string;
  /** For select fields: the available options */
  selectOptions?: SelectOption[];
}

interface CalculatorResultRange {
  /** Minimum score (inclusive) */
  min: number;
  /** Maximum score (exclusive, or Infinity for the last range) */
  max: number;
  /** Risk class label (e.g., "Class I", "Low Risk") */
  label: string;
  /** Risk level description */
  risk: string;
  /** 30-day mortality text */
  mortality: string;
  /** CSS color variable name */
  colorVar: string;
}

interface CalculatorDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fields: CalculatorField[];
  results: CalculatorResultRange[];
  /** Threshold text shown below score */
  thresholdNote: string;
  /** Source citations */
  citations: string[];
}

// -------------------------------------------------------------------
// PESI Calculator Definition
// -------------------------------------------------------------------

const PESI_CALCULATOR: CalculatorDefinition = {
  id: 'pesi',
  title: 'PESI Score',
  subtitle: 'Pulmonary Embolism Severity Index',
  description: 'The PESI is an 11-variable clinical prediction tool that stratifies patients with acute PE according to their 30-day mortality risk.',
  fields: [
    { name: 'age', label: 'Age', type: 'number', points: 0, valueIsPoints: true, unit: 'years', description: 'Points = age in years' },
    { name: 'male', label: 'Male sex', type: 'toggle', points: 10 },
    { name: 'cancer', label: 'History of cancer', type: 'toggle', points: 30 },
    { name: 'heart-failure', label: 'History of heart failure', type: 'toggle', points: 10 },
    { name: 'chronic-lung', label: 'History of chronic lung disease', type: 'toggle', points: 10 },
    { name: 'hr', label: 'Heart rate \u2265 110', type: 'toggle', points: 20 },
    { name: 'sbp', label: 'Systolic BP < 100 mmHg', type: 'toggle', points: 30 },
    { name: 'rr', label: 'Respiratory rate \u2265 30', type: 'toggle', points: 20 },
    { name: 'temp', label: 'Temperature < 36\u00B0C (96.8\u00B0F)', type: 'toggle', points: 20 },
    { name: 'ams', label: 'Altered mental status', type: 'toggle', points: 60, description: 'Disorientation, lethargy, stupor, or coma' },
    { name: 'spo2', label: 'O\u2082 saturation < 90%', type: 'toggle', points: 20 },
  ],
  results: [
    { min: -Infinity, max: 66, label: 'Class I', risk: 'Very Low Risk', mortality: '30-day mortality: 0\u20131.6%', colorVar: '--color-primary' },
    { min: 66, max: 86, label: 'Class II', risk: 'Low Risk', mortality: '30-day mortality: 1.7\u20133.5%', colorVar: '--color-primary' },
    { min: 86, max: 106, label: 'Class III', risk: 'Intermediate Risk', mortality: '30-day mortality: 3.2\u20137.1%', colorVar: '--color-warning' },
    { min: 106, max: 126, label: 'Class IV', risk: 'High Risk', mortality: '30-day mortality: 4.0\u201311.4%', colorVar: '--color-danger' },
    { min: 126, max: Infinity, label: 'Class V', risk: 'Very High Risk', mortality: '30-day mortality: 10.0\u201324.5%', colorVar: '--color-danger' },
  ],
  thresholdNote: 'Clinical severity threshold: PESI > 86 (Class III+) = High severity',
  citations: [
    'Aujesky D, et al. Derivation and Validation of a Prognostic Model for Pulmonary Embolism. Am J Respir Crit Care Med. 2005;172(8):1041-1046.',
    'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603.',
  ],
};

// -------------------------------------------------------------------
// sPESI Calculator Definition
// -------------------------------------------------------------------

const SPESI_CALCULATOR: CalculatorDefinition = {
  id: 'spesi',
  title: 'sPESI Score',
  subtitle: 'Simplified Pulmonary Embolism Severity Index',
  description: 'The sPESI is a 6-item scoring system that stratifies PE patients by 30-day mortality risk. Each present variable scores 1 point.',
  fields: [
    { name: 'age80', label: 'Age > 80 years', type: 'toggle', points: 1 },
    { name: 'cancer', label: 'History of cancer', type: 'toggle', points: 1 },
    { name: 'cardiopulm', label: 'History of chronic cardiopulmonary disease', type: 'toggle', points: 1, description: 'Heart failure or chronic lung disease' },
    { name: 'hr', label: 'Heart rate > 109/min', type: 'toggle', points: 1 },
    { name: 'sbp', label: 'Systolic BP < 100 mmHg', type: 'toggle', points: 1 },
    { name: 'spo2', label: 'O\u2082 saturation < 90%', type: 'toggle', points: 1 },
  ],
  results: [
    { min: -Infinity, max: 1, label: 'Score 0', risk: 'Low Risk', mortality: '30-day mortality: ~1.0%', colorVar: '--color-primary' },
    { min: 1, max: Infinity, label: 'Score \u2265 1', risk: 'Intermediate / High Risk', mortality: '30-day mortality: ~10.9%', colorVar: '--color-danger' },
  ],
  thresholdNote: 'Clinical severity threshold: sPESI \u2265 1 = High severity',
  citations: [
    'Jim\u00E9nez D, et al. Simplification of the Pulmonary Embolism Severity Index for Prognostication in Patients With Acute Symptomatic PE. Arch Intern Med. 2010;170(15):1383-1389.',
    'Freund Y, et al. Acute Pulmonary Embolism: A Review. JAMA. 2022;328(13):1336-1345.',
  ],
};

// -------------------------------------------------------------------
// CHA₂DS₂-VASc Calculator Definition
// -------------------------------------------------------------------

const CHA2DS2VASC_CALCULATOR: CalculatorDefinition = {
  id: 'cha2ds2vasc',
  title: 'CHA\u2082DS\u2082-VASc Score',
  subtitle: 'Stroke Risk in Atrial Fibrillation',
  description: 'The CHA\u2082DS\u2082-VASc score estimates stroke risk in patients with non-valvular atrial fibrillation to guide anticoagulation decisions. Score ranges from 0-9.',
  fields: [
    { name: 'chf', label: 'Congestive Heart Failure', type: 'toggle', points: 1, description: 'CHF or LV ejection fraction \u226440%' },
    { name: 'htn', label: 'Hypertension', type: 'toggle', points: 1, description: 'Resting BP >140/90 or current antihypertensive use' },
    { name: 'age75', label: 'Age \u2265 75 years', type: 'toggle', points: 2 },
    { name: 'diabetes', label: 'Diabetes Mellitus', type: 'toggle', points: 1, description: 'Fasting glucose >125 or on hypoglycemic treatment' },
    { name: 'stroke', label: 'Stroke / TIA / Thromboembolism', type: 'toggle', points: 2, description: 'Prior stroke, TIA, or systemic embolism' },
    { name: 'vascular', label: 'Vascular Disease', type: 'toggle', points: 1, description: 'Prior MI, peripheral artery disease, or aortic plaque' },
    { name: 'age65', label: 'Age 65-74 years', type: 'toggle', points: 1 },
    { name: 'female', label: 'Female Sex', type: 'toggle', points: 1 },
  ],
  results: [
    { min: -Infinity, max: 1, label: 'Score 0', risk: 'Low Risk', mortality: 'Annual stroke risk: 0%', colorVar: '--color-primary' },
    { min: 1, max: 2, label: 'Score 1', risk: 'Low-Moderate Risk', mortality: 'Annual stroke risk: 1.3%', colorVar: '--color-warning' },
    { min: 2, max: 3, label: 'Score 2', risk: 'Moderate Risk', mortality: 'Annual stroke risk: 2.2%', colorVar: '--color-warning' },
    { min: 3, max: 4, label: 'Score 3', risk: 'Moderate-High Risk', mortality: 'Annual stroke risk: 3.2%', colorVar: '--color-danger' },
    { min: 4, max: 5, label: 'Score 4', risk: 'High Risk', mortality: 'Annual stroke risk: 4.0%', colorVar: '--color-danger' },
    { min: 5, max: 6, label: 'Score 5', risk: 'High Risk', mortality: 'Annual stroke risk: 6.7%', colorVar: '--color-danger' },
    { min: 6, max: 7, label: 'Score 6', risk: 'Very High Risk', mortality: 'Annual stroke risk: 9.8%', colorVar: '--color-danger' },
    { min: 7, max: 8, label: 'Score 7', risk: 'Very High Risk', mortality: 'Annual stroke risk: 9.6%', colorVar: '--color-danger' },
    { min: 8, max: 9, label: 'Score 8', risk: 'Very High Risk', mortality: 'Annual stroke risk: 6.7%', colorVar: '--color-danger' },
    { min: 9, max: Infinity, label: 'Score 9', risk: 'Very High Risk', mortality: 'Annual stroke risk: 15.2%', colorVar: '--color-danger' },
  ],
  thresholdNote: 'Score \u22652 (men) or \u22653 (women): Anticoagulation recommended. Score 1 (men) or 2 (women): Consider anticoagulation. Score 0 (men) or 1 (women): May omit anticoagulation.',
  citations: [
    'Lip GY, et al. Refining Clinical Risk Stratification for Predicting Stroke and Thromboembolism in Atrial Fibrillation Using a Novel Risk Factor-Based Approach: The Euro Heart Survey on Atrial Fibrillation. Chest. 2010;137(2):263-272.',
    'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. J Am Coll Cardiol. 2024;83(1):109-279.',
  ],
};

// -------------------------------------------------------------------
// NIHSS Calculator Definition
// -------------------------------------------------------------------

const NIHSS_CALCULATOR: CalculatorDefinition = {
  id: 'nihss',
  title: 'NIHSS',
  subtitle: 'NIH Stroke Scale',
  description: 'The NIHSS is a 15-item clinical assessment tool used to quantify stroke severity. Score ranges from 0 (no symptoms) to 42 (maximum deficit). Guides treatment decisions including thrombolysis eligibility and EVT criteria.',
  fields: [
    {
      name: 'loc',
      label: '1a. Level of Consciousness',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'Alert', points: 0 },
        { label: 'Not alert, arousable by minor stimulation', points: 1 },
        { label: 'Not alert, requires repeated stimulation', points: 2 },
        { label: 'Unresponsive or reflexive responses only', points: 3 },
      ],
    },
    {
      name: 'loc-questions',
      label: '1b. LOC Questions',
      type: 'select',
      points: 0,
      description: 'Ask month and age',
      selectOptions: [
        { label: 'Both correct', points: 0 },
        { label: 'One correct', points: 1 },
        { label: 'Neither correct', points: 2 },
      ],
    },
    {
      name: 'loc-commands',
      label: '1c. LOC Commands',
      type: 'select',
      points: 0,
      description: 'Open/close eyes, grip and release',
      selectOptions: [
        { label: 'Both correct', points: 0 },
        { label: 'One correct', points: 1 },
        { label: 'Neither correct', points: 2 },
      ],
    },
    {
      name: 'gaze',
      label: '2. Best Gaze',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'Normal', points: 0 },
        { label: 'Partial gaze palsy', points: 1 },
        { label: 'Forced deviation or total gaze paresis', points: 2 },
      ],
    },
    {
      name: 'visual',
      label: '3. Visual Fields',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'No visual loss', points: 0 },
        { label: 'Partial hemianopia', points: 1 },
        { label: 'Complete hemianopia', points: 2 },
        { label: 'Bilateral hemianopia (blind)', points: 3 },
      ],
    },
    {
      name: 'facial',
      label: '4. Facial Palsy',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'Normal symmetric movements', points: 0 },
        { label: 'Minor paralysis (flattened nasolabial fold)', points: 1 },
        { label: 'Partial paralysis (lower face)', points: 2 },
        { label: 'Complete paralysis (upper and lower face)', points: 3 },
      ],
    },
    {
      name: 'left-arm',
      label: '5a. Left Arm Motor',
      type: 'select',
      points: 0,
      description: 'Hold arm at 90\u00B0 (sitting) or 45\u00B0 (supine) for 10 sec',
      selectOptions: [
        { label: 'No drift \u2014 holds for full 10 sec', points: 0 },
        { label: 'Drift \u2014 holds but drifts before 10 sec', points: 1 },
        { label: 'Some effort against gravity', points: 2 },
        { label: 'No effort against gravity', points: 3 },
        { label: 'No movement', points: 4 },
      ],
    },
    {
      name: 'right-arm',
      label: '5b. Right Arm Motor',
      type: 'select',
      points: 0,
      description: 'Hold arm at 90\u00B0 (sitting) or 45\u00B0 (supine) for 10 sec',
      selectOptions: [
        { label: 'No drift \u2014 holds for full 10 sec', points: 0 },
        { label: 'Drift \u2014 holds but drifts before 10 sec', points: 1 },
        { label: 'Some effort against gravity', points: 2 },
        { label: 'No effort against gravity', points: 3 },
        { label: 'No movement', points: 4 },
      ],
    },
    {
      name: 'left-leg',
      label: '6a. Left Leg Motor',
      type: 'select',
      points: 0,
      description: 'Hold leg at 30\u00B0 (supine) for 5 sec',
      selectOptions: [
        { label: 'No drift \u2014 holds for full 5 sec', points: 0 },
        { label: 'Drift \u2014 holds but drifts before 5 sec', points: 1 },
        { label: 'Some effort against gravity', points: 2 },
        { label: 'No effort against gravity', points: 3 },
        { label: 'No movement', points: 4 },
      ],
    },
    {
      name: 'right-leg',
      label: '6b. Right Leg Motor',
      type: 'select',
      points: 0,
      description: 'Hold leg at 30\u00B0 (supine) for 5 sec',
      selectOptions: [
        { label: 'No drift \u2014 holds for full 5 sec', points: 0 },
        { label: 'Drift \u2014 holds but drifts before 5 sec', points: 1 },
        { label: 'Some effort against gravity', points: 2 },
        { label: 'No effort against gravity', points: 3 },
        { label: 'No movement', points: 4 },
      ],
    },
    {
      name: 'ataxia',
      label: '7. Limb Ataxia',
      type: 'select',
      points: 0,
      description: 'Finger-nose-finger and heel-shin',
      selectOptions: [
        { label: 'Absent', points: 0 },
        { label: 'Present in one limb', points: 1 },
        { label: 'Present in two or more limbs', points: 2 },
      ],
    },
    {
      name: 'sensory',
      label: '8. Sensory',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'Normal \u2014 no sensory loss', points: 0 },
        { label: 'Mild-moderate \u2014 less sharp or dull', points: 1 },
        { label: 'Severe or total \u2014 unaware of touch', points: 2 },
      ],
    },
    {
      name: 'language',
      label: '9. Best Language',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'No aphasia \u2014 normal', points: 0 },
        { label: 'Mild-moderate aphasia', points: 1 },
        { label: 'Severe aphasia \u2014 fragmentary expression', points: 2 },
        { label: 'Mute or global aphasia', points: 3 },
      ],
    },
    {
      name: 'dysarthria',
      label: '10. Dysarthria',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'Normal', points: 0 },
        { label: 'Mild-moderate \u2014 slurring but understandable', points: 1 },
        { label: 'Severe \u2014 unintelligible or mute', points: 2 },
      ],
    },
    {
      name: 'extinction',
      label: '11. Extinction/Inattention',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'No abnormality', points: 0 },
        { label: 'Inattention to one modality (visual, tactile, auditory, spatial)', points: 1 },
        { label: 'Profound hemi-inattention or extinction to more than one modality', points: 2 },
      ],
    },
  ],
  results: [
    { min: -Infinity, max: 1, label: 'Score 0', risk: 'No Stroke Symptoms', mortality: 'No measurable deficit', colorVar: '--color-primary' },
    { min: 1, max: 5, label: 'Score 1\u20134', risk: 'Minor Stroke', mortality: 'Consider DAPT, MRI preferred', colorVar: '--color-primary' },
    { min: 5, max: 16, label: 'Score 5\u201315', risk: 'Moderate Stroke', mortality: 'IVT candidate if within window', colorVar: '--color-warning' },
    { min: 16, max: 21, label: 'Score 16\u201320', risk: 'Moderate-Severe Stroke', mortality: 'IVT + evaluate for EVT', colorVar: '--color-danger' },
    { min: 21, max: Infinity, label: 'Score 21\u201342', risk: 'Severe Stroke', mortality: 'IVT + EVT if LVO. High mortality risk.', colorVar: '--color-danger' },
  ],
  thresholdNote: 'NIHSS \u22656: EVT eligibility threshold (anterior LVO). NIHSS 0\u20135 with disabling deficit: still consider IVT. NIHSS 0\u20135 nondisabling: DAPT pathway.',
  citations: [
    'Brott T, et al. Measurements of Acute Cerebral Infarction: A Clinical Examination Scale. Stroke. 1989;20(7):864-870.',
    'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
    'Mendelson SJ, Prabhakaran S. Diagnosis and Management of TIA and Acute Ischemic Stroke: A Review. JAMA. 2021;325(11):1088-1098.',
  ],
};

// -------------------------------------------------------------------
// TIMI Risk Score Calculator Definition
// -------------------------------------------------------------------

const TIMI_CALCULATOR: CalculatorDefinition = {
  id: 'timi',
  title: 'TIMI Risk Score',
  subtitle: 'Thrombolysis in Myocardial Infarction — NSTEMI/UA',
  description: 'The TIMI Risk Score for UA/NSTEMI is a 7-variable risk assessment tool that predicts 14-day mortality, new/recurrent MI, and severe recurrent ischemia requiring urgent revascularization. Each variable scores 1 point.',
  fields: [
    { name: 'age65', label: 'Age ≥ 65 years', type: 'toggle', points: 1 },
    { name: 'cad-risk', label: '≥ 3 CAD risk factors', type: 'toggle', points: 1, description: 'HTN, DM, dyslipidemia, smoking, family history of premature CAD' },
    { name: 'stenosis', label: 'Known CAD (stenosis ≥ 50%)', type: 'toggle', points: 1, description: 'Prior catheterization showing ≥50% stenosis' },
    { name: 'st-deviation', label: 'ST deviation ≥ 0.5mm', type: 'toggle', points: 1, description: 'ST depression or transient ST elevation on presenting ECG' },
    { name: 'anginal-events', label: '≥ 2 anginal events in 24h', type: 'toggle', points: 1, description: 'Severe anginal symptoms in prior 24 hours' },
    { name: 'aspirin-use', label: 'Aspirin use in prior 7 days', type: 'toggle', points: 1, description: 'Patient was taking aspirin before presentation' },
    { name: 'biomarkers', label: 'Elevated cardiac biomarkers', type: 'toggle', points: 1, description: 'Troponin I or T above institutional upper limit of normal' },
  ],
  results: [
    { min: -Infinity, max: 1, label: 'Score 0', risk: 'Very Low Risk', mortality: '14-day event rate: 4.7%', colorVar: '--color-primary' },
    { min: 1, max: 2, label: 'Score 1', risk: 'Low Risk', mortality: '14-day event rate: 4.7%', colorVar: '--color-primary' },
    { min: 2, max: 3, label: 'Score 2', risk: 'Low Risk', mortality: '14-day event rate: 8.3%', colorVar: '--color-primary' },
    { min: 3, max: 4, label: 'Score 3', risk: 'Intermediate Risk', mortality: '14-day event rate: 13.2%', colorVar: '--color-warning' },
    { min: 4, max: 5, label: 'Score 4', risk: 'High Risk', mortality: '14-day event rate: 19.9%', colorVar: '--color-danger' },
    { min: 5, max: 6, label: 'Score 5', risk: 'High Risk', mortality: '14-day event rate: 26.2%', colorVar: '--color-danger' },
    { min: 6, max: 7, label: 'Score 6-7', risk: 'Very High Risk', mortality: '14-day event rate: 40.9%', colorVar: '--color-danger' },
    { min: 7, max: Infinity, label: 'Score 6-7', risk: 'Very High Risk', mortality: '14-day event rate: 40.9%', colorVar: '--color-danger' },
  ],
  thresholdNote: 'TIMI 0-2: Low risk (conservative strategy reasonable). TIMI 3: Intermediate (delayed invasive 25-72h). TIMI ≥4: High risk (early invasive <24h recommended).',
  citations: [
    'Antman EM, et al. The TIMI Risk Score for Unstable Angina/Non-ST Elevation MI: A Method for Prognostication and Therapeutic Decision Making. JAMA. 2000;284(7):835-842.',
    'Amsterdam EA, et al. 2014 AHA/ACC Guideline for the Management of Patients with Non-ST-Elevation Acute Coronary Syndromes. J Am Coll Cardiol. 2014;64(24):e189-e228.',
  ],
};

// -------------------------------------------------------------------
// BAS (Bronchiolitis Assessment Score) Calculator Definition
// -------------------------------------------------------------------

const BAS_CALCULATOR: CalculatorDefinition = {
  id: 'bas',
  title: 'BAS',
  subtitle: 'Bronchiolitis Assessment Score',
  description: 'The BAS is a 6-variable clinical assessment tool used to quantify bronchiolitis severity in pediatric patients. Score ranges from 0 (mild) to 12 (severe). Guides respiratory support escalation, weaning decisions, and disposition.',
  fields: [
    {
      name: 'respiratory-rate',
      label: 'Respiratory Rate (age-adjusted)',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: '<2 mos: <50 \u00B7 2-12 mos: <40 \u00B7 >1 yr: <30', points: 0 },
        { label: '<2 mos: 50-60 \u00B7 2-12 mos: 40-50 \u00B7 >1 yr: 30-40', points: 1 },
        { label: '<2 mos: >60 \u00B7 2-12 mos: >50 \u00B7 >1 yr: >40', points: 2 },
      ],
    },
    {
      name: 'fio2-spo2',
      label: 'FiO\u2082 AND O\u2082 Sat',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'FiO\u2082 \u226424% AND SpO\u2082 >90%', points: 0 },
        { label: 'FiO\u2082 25-39% AND SpO\u2082 >90%', points: 1 },
        { label: 'FiO\u2082 \u226540% AND SpO\u2082 >90%', points: 2 },
      ],
    },
    {
      name: 'breath-sounds',
      label: 'Breath Sounds',
      type: 'select',
      points: 0,
      description: 'Crackles don\u2019t change score',
      selectOptions: [
        { label: 'Good air movement, few crackles, few wheezes', points: 0 },
        { label: 'Decreased air movement, I-E wheezes, or crackles', points: 1 },
        { label: 'Diminished or absent breath sounds, severe wheezing, prolonged expiratory phase', points: 2 },
      ],
    },
    {
      name: 'work-of-breathing',
      label: 'Work of Breathing',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'None to mild subcostal retractions, abdominal breathing', points: 0 },
        { label: 'Moderate retractions, nasal flaring', points: 1 },
        { label: 'Severe retractions, nasal flaring, grunting, head bobbing', points: 2 },
      ],
    },
    {
      name: 'mental-status',
      label: 'Mental Status',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'Normal to mildly irritable', points: 0 },
        { label: 'Agitated, restless', points: 1 },
        { label: 'Lethargic', points: 2 },
      ],
    },
    {
      name: 'color',
      label: 'Color',
      type: 'select',
      points: 0,
      selectOptions: [
        { label: 'Normal', points: 0 },
        { label: 'Pale', points: 1 },
        { label: 'Cyanotic', points: 2 },
      ],
    },
  ],
  results: [
    { min: -Infinity, max: 4, label: 'Mild', risk: 'Mild', mortality: 'Weanable. Consider discharge if feeding and hydrating well.', colorVar: '--color-primary' },
    { min: 4, max: 9, label: 'Moderate', risk: 'Moderate', mortality: 'Maintain current support. Supplemental O\u2082 or HFNC may be needed.', colorVar: '--color-warning' },
    { min: 9, max: Infinity, label: 'Severe', risk: 'Severe', mortality: 'Increase support. Contact primary team. Consider critical care consult.', colorVar: '--color-danger' },
  ],
  thresholdNote: 'Mild (0-3): Weanable. Moderate (4-8): Maintain. Severe (9-12): Increase support. Reassess Q15min on HFNC initiation, Q4h on maintenance.',
  citations: [
    'Dell Children\u2019s Medical Center EBOC. Bronchiolitis Clinical Pathway. Rev Oct 2019.',
    'Dell Children\u2019s Medical Center EBOC. HFNC Initiation, Maintenance, and Weaning Pathway. Rev Nov 2021.',
  ],
};

// -------------------------------------------------------------------
// Calculator Registry
// -------------------------------------------------------------------

const CALCULATORS: Record<string, CalculatorDefinition> = {
  'pesi': PESI_CALCULATOR,
  'spesi': SPESI_CALCULATOR,
  'cha2ds2vasc': CHA2DS2VASC_CALCULATOR,
  'nihss': NIHSS_CALCULATOR,
  'timi': TIMI_CALCULATOR,
  'bas': BAS_CALCULATOR,
};

// -------------------------------------------------------------------
// Calculator Metadata (for list views)
// -------------------------------------------------------------------

export interface CalculatorMeta {
  id: string;
  title: string;
  subtitle: string;
}

/** Get all available calculators sorted alphabetically by title */
export function getAllCalculators(): CalculatorMeta[] {
  return Object.values(CALCULATORS)
    .map(c => ({ id: c.id, title: c.title, subtitle: c.subtitle }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

// -------------------------------------------------------------------
// Render: Calculator List (Medical Calculators category)
// -------------------------------------------------------------------

/** Render the calculator list view with search */
export function renderCalculatorList(container: HTMLElement): void {
  container.innerHTML = '';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'btn-text';
  backBtn.textContent = '\u2190 Categories';
  backBtn.addEventListener('click', () => router.navigate('/'));
  container.appendChild(backBtn);

  // Header
  const header = document.createElement('div');
  header.className = 'category-view-header';

  const icon = document.createElement('span');
  icon.className = 'category-view-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '\uD83E\uDDEE'; // 🧮

  const name = document.createElement('h2');
  name.className = 'category-view-name';
  name.textContent = 'Medical Calculators';

  header.appendChild(icon);
  header.appendChild(name);
  container.appendChild(header);

  // Search bar
  const searchWrap = document.createElement('div');
  searchWrap.className = 'calculator-search-wrap';

  const searchInput = document.createElement('input');
  searchInput.type = 'search';
  searchInput.className = 'calculator-search-input';
  searchInput.placeholder = 'Search calculators\u2026';
  searchInput.setAttribute('aria-label', 'Search calculators');

  searchWrap.appendChild(searchInput);
  container.appendChild(searchWrap);

  // Calculator list
  const list = document.createElement('div');
  list.className = 'tree-list';
  container.appendChild(list);

  const allCalcs = getAllCalculators();

  function renderList(filter: string): void {
    list.innerHTML = '';
    const query = filter.toLowerCase().trim();
    const filtered = query
      ? allCalcs.filter(c => c.title.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query))
      : allCalcs;

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      const emptyText = document.createElement('p');
      emptyText.textContent = 'No calculators match your search.';
      empty.appendChild(emptyText);
      list.appendChild(empty);
      return;
    }

    for (const calc of filtered) {
      const card = document.createElement('button');
      card.className = 'tree-card';
      card.setAttribute('aria-label', `${calc.title} \u2014 ${calc.subtitle}`);

      card.addEventListener('click', () => {
        router.navigate(`/calculator/${calc.id}`);
      });

      const title = document.createElement('div');
      title.className = 'tree-card-title';
      title.textContent = calc.title;

      const subtitle = document.createElement('div');
      subtitle.className = 'tree-card-subtitle';
      subtitle.textContent = calc.subtitle;

      card.appendChild(title);
      card.appendChild(subtitle);
      list.appendChild(card);
    }
  }

  searchInput.addEventListener('input', () => renderList(searchInput.value));
  renderList('');
}

// -------------------------------------------------------------------
// Render: Calculator
// -------------------------------------------------------------------

/** Render a clinical calculator into a container */
export function renderCalculator(container: HTMLElement, calculatorId: string): void {
  const calc = CALCULATORS[calculatorId];
  if (!calc) {
    renderCalcNotFound(container, calculatorId);
    return;
  }

  container.innerHTML = '';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'btn-text';
  backBtn.textContent = '\u2190 Back';
  backBtn.addEventListener('click', () => history.back());
  container.appendChild(backBtn);

  // Header
  const header = document.createElement('div');
  header.className = 'calculator-header';

  const title = document.createElement('h1');
  title.className = 'calculator-title';
  title.textContent = calc.title;
  header.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'calculator-subtitle';
  subtitle.textContent = calc.subtitle;
  header.appendChild(subtitle);

  container.appendChild(header);

  // Description
  const desc = document.createElement('p');
  desc.className = 'calculator-description';
  desc.textContent = calc.description;
  container.appendChild(desc);

  // Score display (will update in real-time)
  const scoreDisplay = document.createElement('div');
  scoreDisplay.className = 'calculator-score-display';
  scoreDisplay.id = 'calc-score-display';
  container.appendChild(scoreDisplay);

  // Form
  const form = document.createElement('div');
  form.className = 'calculator-form';

  // State for field values
  const fieldValues: Record<string, number> = {};
  for (const field of calc.fields) {
    fieldValues[field.name] = 0;
  }

  // Render fields
  for (const field of calc.fields) {
    const fieldEl = document.createElement('div');
    fieldEl.className = 'calculator-field';

    if (field.type === 'number') {
      renderNumberField(fieldEl, field, fieldValues, () => updateScore(calc, fieldValues, scoreDisplay));
    } else if (field.type === 'select') {
      renderSelectField(fieldEl, field, fieldValues, () => updateScore(calc, fieldValues, scoreDisplay));
    } else {
      renderToggleField(fieldEl, field, fieldValues, () => updateScore(calc, fieldValues, scoreDisplay));
    }

    form.appendChild(fieldEl);
  }

  container.appendChild(form);

  // Threshold note
  const threshold = document.createElement('div');
  threshold.className = 'calculator-threshold';
  threshold.textContent = calc.thresholdNote;
  container.appendChild(threshold);

  // Citations
  const citationSection = document.createElement('details');
  citationSection.className = 'calculator-citations';

  const citSummary = document.createElement('summary');
  citSummary.textContent = `References (${calc.citations.length})`;
  citationSection.appendChild(citSummary);

  const citList = document.createElement('ol');
  citList.className = 'calculator-citation-list';
  for (const cit of calc.citations) {
    const li = document.createElement('li');
    li.textContent = cit;
    citList.appendChild(li);
  }
  citationSection.appendChild(citList);
  container.appendChild(citationSection);

  // Initial score render
  updateScore(calc, fieldValues, scoreDisplay);
}

// -------------------------------------------------------------------
// Field Renderers
// -------------------------------------------------------------------

function renderNumberField(
  container: HTMLElement,
  field: CalculatorField,
  values: Record<string, number>,
  onChange: () => void,
): void {
  const label = document.createElement('label');
  label.className = 'calculator-field-label';
  label.textContent = field.label;
  container.appendChild(label);

  if (field.description) {
    const desc = document.createElement('span');
    desc.className = 'calculator-field-desc';
    desc.textContent = field.description;
    container.appendChild(desc);
  }

  const inputRow = document.createElement('div');
  inputRow.className = 'calculator-number-row';

  const input = document.createElement('input');
  input.type = 'number';
  input.className = 'calculator-number-input';
  input.inputMode = 'numeric';
  input.min = '0';
  input.max = '150';
  input.placeholder = '0';
  input.setAttribute('aria-label', field.label);

  input.addEventListener('input', () => {
    const val = parseInt(input.value, 10);
    values[field.name] = isNaN(val) ? 0 : val;
    onChange();
  });

  inputRow.appendChild(input);

  if (field.unit) {
    const unit = document.createElement('span');
    unit.className = 'calculator-number-unit';
    unit.textContent = field.unit;
    inputRow.appendChild(unit);
  }

  container.appendChild(inputRow);

  // Points indicator
  const points = document.createElement('span');
  points.className = 'calculator-field-points';
  points.textContent = field.valueIsPoints ? 'pts = age' : `+${field.points} pts`;
  container.appendChild(points);
}

function renderToggleField(
  container: HTMLElement,
  field: CalculatorField,
  values: Record<string, number>,
  onChange: () => void,
): void {
  const row = document.createElement('div');
  row.className = 'calculator-toggle-row';

  const labelWrap = document.createElement('div');
  labelWrap.className = 'calculator-toggle-label-wrap';

  const label = document.createElement('span');
  label.className = 'calculator-field-label';
  label.textContent = field.label;
  labelWrap.appendChild(label);

  if (field.description) {
    const desc = document.createElement('span');
    desc.className = 'calculator-field-desc';
    desc.textContent = field.description;
    labelWrap.appendChild(desc);
  }

  row.appendChild(labelWrap);

  // Points badge
  const pointsBadge = document.createElement('span');
  pointsBadge.className = 'calculator-field-points';
  pointsBadge.textContent = `+${field.points}`;
  row.appendChild(pointsBadge);

  // Toggle switch
  const toggleLabel = document.createElement('label');
  toggleLabel.className = 'calculator-toggle';
  toggleLabel.setAttribute('aria-label', `${field.label}: toggle`);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'calculator-toggle-input';

  const slider = document.createElement('span');
  slider.className = 'calculator-toggle-slider';

  toggleLabel.appendChild(checkbox);
  toggleLabel.appendChild(slider);
  row.appendChild(toggleLabel);

  checkbox.addEventListener('change', () => {
    values[field.name] = checkbox.checked ? field.points : 0;
    onChange();
  });

  container.appendChild(row);
}

function renderSelectField(
  container: HTMLElement,
  field: CalculatorField,
  values: Record<string, number>,
  onChange: () => void,
): void {
  const row = document.createElement('div');
  row.className = 'calculator-select-row';

  const labelWrap = document.createElement('div');
  labelWrap.className = 'calculator-toggle-label-wrap';

  const label = document.createElement('span');
  label.className = 'calculator-field-label';
  label.textContent = field.label;
  labelWrap.appendChild(label);

  if (field.description) {
    const desc = document.createElement('span');
    desc.className = 'calculator-field-desc';
    desc.textContent = field.description;
    labelWrap.appendChild(desc);
  }

  row.appendChild(labelWrap);
  container.appendChild(row);

  const selectRow = document.createElement('div');
  selectRow.className = 'calculator-select-input-row';

  const select = document.createElement('select');
  select.className = 'calculator-select-input';
  select.setAttribute('aria-label', field.label);

  if (field.selectOptions) {
    for (const opt of field.selectOptions) {
      const option = document.createElement('option');
      option.value = String(opt.points);
      option.textContent = `${opt.label} (${opt.points})`;
      select.appendChild(option);
    }
  }

  select.addEventListener('change', () => {
    values[field.name] = parseInt(select.value, 10);
    onChange();
  });

  selectRow.appendChild(select);
  container.appendChild(selectRow);
}

// -------------------------------------------------------------------
// Score Computation & Display
// -------------------------------------------------------------------

function updateScore(
  calc: CalculatorDefinition,
  values: Record<string, number>,
  display: HTMLElement,
): void {
  // Sum all field values
  let score = 0;
  for (const field of calc.fields) {
    if (field.valueIsPoints) {
      score += values[field.name]; // Number field: value IS the points
    } else {
      score += values[field.name]; // Toggle: 0 or field.points
    }
  }

  // Find matching result range
  let result: CalculatorResultRange | null = null;
  for (const r of calc.results) {
    if (score >= r.min && score < r.max) {
      result = r;
      break;
    }
  }

  // Render score display
  display.innerHTML = '';

  const scoreNum = document.createElement('div');
  scoreNum.className = 'calculator-score-number';
  scoreNum.textContent = String(score);
  display.appendChild(scoreNum);

  if (result) {
    const badge = document.createElement('div');
    badge.className = 'calculator-risk-badge';
    badge.style.borderColor = `var(${result.colorVar})`;
    badge.style.color = `var(${result.colorVar})`;

    const classLabel = document.createElement('span');
    classLabel.className = 'calculator-risk-class';
    classLabel.textContent = result.label;
    badge.appendChild(classLabel);

    const riskLabel = document.createElement('span');
    riskLabel.className = 'calculator-risk-level';
    riskLabel.textContent = result.risk;
    badge.appendChild(riskLabel);

    display.appendChild(badge);

    const mortality = document.createElement('div');
    mortality.className = 'calculator-mortality';
    mortality.textContent = result.mortality;
    display.appendChild(mortality);
  }
}

// -------------------------------------------------------------------
// Not Found
// -------------------------------------------------------------------

function renderCalcNotFound(container: HTMLElement, id: string): void {
  container.innerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'empty-state';

  const icon = document.createElement('div');
  icon.className = 'empty-state-icon';
  icon.textContent = '\u2753';

  const title = document.createElement('h3');
  title.textContent = 'Calculator Not Found';

  const sub = document.createElement('p');
  sub.textContent = `No calculator with ID "${id}" exists.`;

  const homeBtn = document.createElement('button');
  homeBtn.className = 'btn-primary';
  homeBtn.textContent = 'Go Home';
  homeBtn.style.marginTop = '16px';
  homeBtn.addEventListener('click', () => router.navigate('/'));

  wrap.appendChild(icon);
  wrap.appendChild(title);
  wrap.appendChild(sub);
  wrap.appendChild(homeBtn);
  container.appendChild(wrap);
}
