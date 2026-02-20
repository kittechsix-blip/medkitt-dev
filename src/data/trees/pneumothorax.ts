// EM Decision Trees — Pneumothorax POCUS Consult
// Ultrasound-guided diagnosis of pneumothorax using sequential sonographic signs.
// 4 modules: Technique/VPPI → Lung Sliding → A' Profile → Lung Point + M-Mode
// 7 evidence citations.

import type { DecisionNode } from '../../models/types.js';
import type { Citation, TestRow } from './neurosyphilis.js';

export const PNEUMOTHORAX_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: EXAMINATION TECHNIQUE + VPPI FOUNDATION
  // =====================================================================

  {
    id: 'pneumothorax-start',
    type: 'info',
    module: 1,
    title: 'Pneumothorax POCUS: VPPI & Technique',
    body: 'THE VISCERAL-PARIETAL PLEURAL INTERFACE (VPPI)\nThe VPPI is the anatomic foundation for all ultrasound signs used to diagnose pneumothorax. In healthy lungs, the visceral and parietal pleura appear as a single echogenic line ~0.2\u20130.3 mm thick on ultrasound. When air accumulates between these layers, it disrupts their normal contact, producing the key diagnostic findings:\n\n\u2022 Absent lung sliding \u2014 air prevents visceral-parietal contact (100% sensitivity, 78% specificity)\n\u2022 Absent B-lines \u2014 comet-tail artifacts require direct pleural contact; their absence with no sliding = A\u2019 profile\n\u2022 Lung point \u2014 where collapsed lung intermittently contacts the chest wall (100% specificity, pathognomonic)\n\nA-lines seen in pneumothorax are horizontal reverberation artifacts from the parietal pleura-air interface, replacing normal lung parenchymal signals from an intact VPPI.\n\nEXAMINATION TECHNIQUE\nProbe: High-frequency linear (5\u201312 MHz), longitudinal orientation.\nPosition: Anterior chest wall, 3rd\u20134th intercostal space, mid-clavicular line. Scan laterally.\nPatient: Supine \u2014 free air rises to the most anterior (least dependent) portions of the chest.',
    citation: [1, 2, 3, 7],
    images: [
      {
        src: 'images/pneumothorax/us-anatomy.png',
        alt: 'Ultrasound anatomy of the anterior chest wall showing ribs, intercostal muscle, and the visceral-parietal pleural interface (VPPI)',
        caption: 'Normal pleural anatomy: Ribs cast acoustic shadows. The VPPI (pleural line) is visible between rib shadows.',
      },
    ],
    next: 'ptx-lung-sliding',
  },

  // =====================================================================
  // MODULE 2: LUNG SLIDING ASSESSMENT
  // =====================================================================

  {
    id: 'ptx-lung-sliding',
    type: 'question',
    module: 2,
    title: 'Step 1: Assess Lung Sliding',
    body: 'In B-mode, observe the pleural line between rib shadows. Lung sliding appears as a shimmering, back-and-forth movement at the VPPI with respiration.\n\nIs lung sliding present at this scanning location?',
    citation: [1, 3],
    options: [
      {
        label: 'Lung sliding present',
        description: 'Normal shimmering movement visible at pleural line',
        next: 'ptx-sliding-blines',
      },
      {
        label: 'Lung sliding absent',
        description: 'No pleural movement observed at this location',
        next: 'ptx-blines-check',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'ptx-sliding-blines',
    type: 'question',
    module: 2,
    title: 'B-Lines Assessment',
    body: 'Lung sliding is present, which effectively rules out pneumothorax at this scanning location.\n\nAre B-lines (vertical comet-tail artifacts extending from the pleural line to the bottom of the screen) also visible?',
    citation: [1],
    images: [
      {
        src: 'images/pneumothorax/b-lines.png',
        alt: 'Ultrasound image showing B-lines: vertical comet-tail artifacts extending from the pleural line',
        caption: 'B-lines: Vertical hyperechoic comet-tail artifacts arising from the pleural line.',
      },
    ],
    options: [
      {
        label: 'B-lines present',
        description: 'Vertical hyperechoic artifacts arising from pleural line',
        next: 'ptx-excluded-blines',
      },
      {
        label: 'No B-lines (A-lines only)',
        description: 'Only horizontal reverberation artifacts visible',
        next: 'ptx-excluded-sliding',
      },
    ],
  },

  {
    id: 'ptx-excluded-blines',
    type: 'result',
    module: 2,
    title: 'Pneumothorax Excluded',
    body: 'B-lines arise from the visceral-parietal pleural interface and cannot be generated when air separates the pleurae. The presence of B-lines reliably excludes pneumothorax at this scanning zone.\n\nLung sliding + B-lines = strongest evidence against pneumothorax.',
    citation: [1, 2, 4],
    recommendation: 'No pneumothorax at this scanning location. B-lines confirm pleural apposition. If clinical suspicion remains, scan additional intercostal spaces.',
    confidence: 'definitive',
    images: [
      {
        src: 'images/pneumothorax/b-lines.png',
        alt: 'Ultrasound image showing B-lines: vertical comet-tail artifacts extending from the pleural line',
        caption: 'B-lines: Vertical hyperechoic artifacts arising from the pleural line, confirming visceral-parietal contact.',
      },
    ],
  },

  {
    id: 'ptx-excluded-sliding',
    type: 'result',
    module: 2,
    title: 'Pneumothorax Excluded',
    body: 'Lung sliding confirms the visceral and parietal pleura are apposed and moving together with respiration. No pneumothorax at this scanning zone.\n\nNormal A-line pattern (horizontal reverberation artifacts) with lung sliding is the expected finding in healthy aerated lung.',
    citation: [1, 3],
    recommendation: 'No pneumothorax at this location. Normal lung sliding with A-lines. If clinical suspicion remains, scan additional intercostal spaces.',
    confidence: 'definitive',
  },

  // =====================================================================
  // MODULE 3: A' PROFILE ASSESSMENT
  // =====================================================================

  {
    id: 'ptx-blines-check',
    type: 'question',
    module: 3,
    title: 'Step 2: Evaluate for Pneumothorax',
    body: 'Lung sliding is absent. Next, check for B-lines (comet-tail artifacts extending vertically from the pleural line).\n\nAbsent lung sliding alone has 100% sensitivity but only 78% specificity for pneumothorax \u2014 it can also occur with atelectasis, consolidation, lung contusion, prior pleurodesis, or mainstem intubation.\n\nAre B-lines present?',
    citation: [1, 2, 3],
    images: [
      {
        src: 'images/pneumothorax/b-lines.png',
        alt: 'Ultrasound image showing B-lines: vertical comet-tail artifacts extending from the pleural line',
        caption: 'B-lines: Vertical hyperechoic comet-tail artifacts arising from the pleural line.',
      },
    ],
    options: [
      {
        label: 'B-lines present',
        description: 'Vertical comet-tail artifacts visible despite absent sliding',
        next: 'ptx-other-causes',
      },
      {
        label: 'No B-lines \u2014 A-lines only (A\u2019 profile)',
        description: 'Only horizontal reverberation artifacts with no lung sliding',
        next: 'ptx-a-profile',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'ptx-other-causes',
    type: 'result',
    module: 3,
    title: 'Absent Sliding with B-Lines',
    body: 'Absent lung sliding with B-lines present is NOT consistent with pneumothorax. B-lines require intact visceral-parietal pleural contact to be generated.\n\nConsider alternative causes of absent lung sliding:\n\u2022 Atelectasis\n\u2022 Consolidation / pneumonia\n\u2022 Lung contusion (trauma)\n\u2022 Pleural adhesions / prior pleurodesis\n\u2022 Mainstem intubation\n\u2022 Apnea / respiratory arrest',
    citation: [1, 3, 7],
    recommendation: 'Pneumothorax excluded at this location. Investigate alternative etiology for absent lung sliding. Clinical correlation required.',
    confidence: 'recommended',
  },

  {
    id: 'ptx-a-profile',
    type: 'info',
    module: 3,
    title: 'Pneumothorax Suspected',
    body: 'Absent lung sliding + only A-lines (no B-lines) = A\u2019 profile.\n\nThis profile is highly suspicious for pneumothorax but is not pathognomonic on its own. The combined absence of lung sliding and B-lines with presence of a lung point provides the highest diagnostic accuracy (pooled sensitivity 89%, specificity 99%).\n\nProceed to search for the lung point \u2014 the only sign with 100% specificity for pneumothorax.',
    citation: [1, 2, 3],
    next: 'ptx-lung-point',
  },

  // =====================================================================
  // MODULE 4: LUNG POINT + M-MODE CONFIRMATION
  // =====================================================================

  {
    id: 'ptx-lung-point',
    type: 'question',
    module: 4,
    title: 'Step 3: Search for Lung Point',
    body: 'Scan laterally from the anterior chest wall. The lung point is where the collapsed lung margin meets the chest wall \u2014 it appears as sudden replacement of the A\u2019 profile by lung sliding or B-lines at a specific location.\n\nThe lung point has 79\u2013100% sensitivity and 100% specificity, making it the only pathognomonic sign of pneumothorax. Its location along the chest wall can also estimate pneumothorax size.\n\nWas a lung point identified?',
    citation: [2, 3, 4],
    images: [
      {
        src: 'images/pneumothorax/lung-point.png',
        alt: 'CT scan showing pneumothorax alongside ultrasound image of the lung point where collapsed lung meets chest wall',
        caption: 'Lung point: The transition zone where absent lung sliding meets normal sliding, marking the pneumothorax edge.',
      },
    ],
    options: [
      {
        label: 'Lung point identified',
        description: 'Transition from A\u2019 profile to lung sliding found',
        next: 'ptx-confirmed',
        urgency: 'critical',
      },
      {
        label: 'No lung point found',
        description: 'A\u2019 profile persists across entire anterior-lateral chest',
        next: 'ptx-mmode',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'ptx-confirmed',
    type: 'result',
    module: 4,
    title: 'Pneumothorax Confirmed',
    body: 'The lung point is pathognomonic for pneumothorax \u2014 it is the ONLY sign with 100% specificity. It represents the exact location where the separated visceral pleura intermittently contacts the parietal pleura at the pneumothorax margin.\n\nLung point location can estimate size:\n\u2022 Anterior only \u2192 small pneumothorax\n\u2022 Lateral chest wall \u2192 moderate\n\u2022 Posterior or not found \u2192 large / complete\n\nUltrasound demonstrates superior sensitivity (90.9%) compared to supine CXR (50.2%) with comparable specificity (98.2% vs 99.4%).',
    citation: [3, 4, 6],
    recommendation: 'Pneumothorax confirmed (pathognomonic finding). Correlate clinically for management: observation vs aspiration vs chest tube based on size, symptoms, and hemodynamic status.',
    confidence: 'definitive',
  },

  {
    id: 'ptx-mmode',
    type: 'question',
    module: 4,
    title: 'Step 4: M-Mode Confirmation',
    body: 'No lung point was found, but A\u2019 profile is present. Use M-mode for additional confirmation.\n\nPlace the M-mode cursor at the pleural line and observe the pattern:\n\u2022 Seashore sign (normal): Granular pattern below the pleural line = lung movement\n\u2022 Barcode / stratosphere sign (abnormal): Horizontal parallel lines throughout = no lung movement\n\nThe barcode sign is suggestive but not diagnostic alone \u2014 it can occur with any cause of absent lung sliding.\n\nWhat is the M-mode pattern?',
    citation: [4, 5, 7],
    images: [
      {
        src: 'images/pneumothorax/m-mode-barcode.png',
        alt: 'M-mode comparison: Normal seashore sign (left) showing granular pattern below pleura vs pneumothorax barcode/stratosphere sign (right) showing horizontal parallel lines',
        caption: 'M-mode: Seashore sign (normal lung, left) vs Barcode/Stratosphere sign (pneumothorax, right).',
      },
    ],
    options: [
      {
        label: 'Barcode / stratosphere sign',
        description: 'Horizontal parallel lines throughout \u2014 no lung movement',
        next: 'ptx-likely',
        urgency: 'critical',
      },
      {
        label: 'Seashore sign',
        description: 'Granular pattern below pleural line \u2014 normal lung movement',
        next: 'ptx-reassess',
      },
    ],
  },

  {
    id: 'ptx-likely',
    type: 'result',
    module: 4,
    title: 'Pneumothorax Likely',
    body: 'A\u2019 profile + barcode/stratosphere sign on M-mode is highly suggestive of pneumothorax.\n\nThe barcode sign alone is suggestive but not diagnostic \u2014 it can occur with other causes of absent lung sliding. Combined with the A\u2019 profile (no lung sliding + no B-lines + no lung point found), clinical suspicion should be high.\n\nAbsence of a lung point may indicate a large or complete pneumothorax where no transition zone is accessible.\n\nThe Society of Critical Care Medicine recommends ultrasound to complement or replace conventional CXR for pneumothorax diagnosis, particularly when rapid results are needed.',
    citation: [1, 4, 5],
    recommendation: 'High clinical suspicion for pneumothorax. Consider CT chest for confirmation if patient is hemodynamically stable. If unstable with clinical concern for tension pneumothorax, proceed with emergent intervention (needle decompression or chest tube).',
    confidence: 'recommended',
  },

  {
    id: 'ptx-reassess',
    type: 'result',
    module: 4,
    title: 'Reassess \u2014 Findings Inconsistent',
    body: 'A\u2019 profile was identified (no lung sliding, no B-lines) but M-mode shows seashore sign, which indicates normal lung movement. These findings are inconsistent.\n\nPossible explanations:\n\u2022 Probe position shifted between B-mode and M-mode assessment\n\u2022 Intermittent or small pneumothorax\n\u2022 Subcutaneous emphysema mimicking absent lung sliding\n\u2022 Technical artifact',
    citation: [4, 7],
    recommendation: 'Inconsistent findings. Recommend re-scanning with careful attention to probe position. If clinical suspicion persists, consider CT chest for definitive evaluation.',
    confidence: 'consider',
  },
];

/** Total node count for metadata */
export const PNEUMOTHORAX_NODE_COUNT = PNEUMOTHORAX_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for flowchart)
// -------------------------------------------------------------------

export const PNEUMOTHORAX_MODULE_LABELS = ['Technique', 'Sliding', 'A\u2019 Profile', 'Lung Point'];

// -------------------------------------------------------------------
// Evidence Citations (7 references)
// -------------------------------------------------------------------

export const PNEUMOTHORAX_CITATIONS: Citation[] = [
  { num: 1, text: 'Frankel HL, et al. Guidelines for the Appropriate Use of Bedside General and Cardiac Ultrasonography in the Evaluation of Critically Ill Patients\u2014Part I: General Ultrasonography. Crit Care Med. 2015;43(11):2479-502.' },
  { num: 2, text: 'Picano E, et al. Lung Ultrasound for the Cardiologist. JACC Cardiovasc Imaging. 2018;11(11):1692-1705.' },
  { num: 3, text: 'Lichtenstein DA, et al. Ultrasound Diagnosis of Occult Pneumothorax. Crit Care Med. 2005;33(6):1231-8.' },
  { num: 4, text: 'Buda N, et al. Basics of Point-of-Care Lung Ultrasonography. N Engl J Med. 2023;389(21):e44.' },
  { num: 5, text: 'Stewart DL, et al. Use of Point-of-Care Ultrasonography in the NICU for Diagnostic and Procedural Purposes. Pediatrics. 2022.' },
  { num: 6, text: 'Alrajhi K, et al. Test Characteristics of Ultrasonography for the Detection of Pneumothorax: A Systematic Review and Meta-Analysis. Chest. 2012.' },
  { num: 7, text: 'Volpicelli G. Sonographic Diagnosis of Pneumothorax. Intensive Care Med. 2011;37(2):224-32.' },
];

// -------------------------------------------------------------------
// Diagnostic Test Performance (US vs CXR for pneumothorax)
// -------------------------------------------------------------------

export const PNEUMOTHORAX_DIAGNOSTIC_TESTS: TestRow[] = [
  { test: 'Lung Ultrasound', sensitivity: '90.9%', specificity: '98.2%', role: 'Superior sensitivity to supine CXR. Recommended for rapid bedside evaluation.' },
  { test: 'Supine Chest X-ray', sensitivity: '50.2%', specificity: '99.4%', role: 'Misses ~50% of pneumothoraces. May miss anterior or small pneumothoraces.' },
  { test: 'Lung Sliding (absent)', sensitivity: '95\u2013100%', specificity: '78\u201391%', role: 'Screening sign. Absence does NOT confirm PTX alone.' },
  { test: 'Lung Point', sensitivity: '79\u2013100%', specificity: '100%', role: 'Pathognomonic. Only sign that definitively confirms pneumothorax.' },
  { test: 'A\u2019 Profile + Lung Point', sensitivity: '89%', specificity: '99%', role: 'Combined approach provides highest diagnostic accuracy.' },
];

export const PNEUMOTHORAX_CLINICAL_NOTES: string[] = [
  'Lung sliding is 95\u2013100% sensitive for ruling out pneumothorax at the scanning location, but only 78\u201391% specific.',
  'Absent lung sliding does NOT confirm pneumothorax \u2014 also seen in mainstem intubation, pleurodesis, ARDS, apnea, consolidation.',
  'B-lines reliably EXCLUDE pneumothorax \u2014 they require direct visceral-parietal pleural contact to be generated.',
  'The lung point is the ONLY pathognomonic sign (100% specificity). Its position estimates pneumothorax size.',
  'Barcode/stratosphere sign on M-mode is suggestive but not diagnostic alone \u2014 confirms absent lung movement, not the cause.',
  'Ultrasound sensitivity (90.9%) is nearly double supine CXR (50.2%) for pneumothorax detection. SCCM recommends US to complement or replace CXR.',
];
