// MedKitt — Echo-EPSS for Systolic Function
// Stepwise approach to evaluating systolic dysfunction using POCUS and E-point septal separation.
// 5 modules: Overview → PLAX View → M-Mode & Measurement → Interpretation → Grey Zone Assessment
// 10 nodes total.
// Source: Stenberg Y et al. (2021), McKaigney CJ et al. (2014), Prats MI & Bahner DP (2020), CoreUltrasound.com

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ECHO_EPSS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: OVERVIEW
  // =====================================================================

  {
    id: 'epss-start',
    type: 'info',
    module: 1,
    title: 'EPSS for Systolic Function',
    body: '**E-point septal separation (EPSS) >7 mm is a validated threshold for detecting reduced left ventricular ejection fraction (LVEF).** [1][2][3]\n\nThis measurement provides an objective, rapid assessment that complements visual estimation of cardiac function.\n\nWHAT IS EPSS?\nEPSS measures the shortest distance between the anterior mitral valve leaflet at its peak opening (E-point) and the interventricular septum during early diastole. A wider gap suggests reduced LV contractility and/or LV dilation.\n\nCLINICAL SIGNIFICANCE\n• EPSS >7 mm → suggests LVEF <50% (reduced systolic function)\n• EPSS >10 mm → indicates more severe dysfunction [2][4]\n• **100% sensitivity for severe systolic dysfunction (LVEF ≤30%) when >7 mm** [2]\n• Specificity is moderate (52%) — best when combined with other echo findings [5]\n\nIMPORTANT LIMITATIONS\n**EPSS may be inaccurate in:** aortic regurgitation, mitral stenosis, hypertrophic cardiomyopathy, and non-sinus rhythms. [3] The measurement remains valid even with abnormal septal motion, including paradoxical septal movement. [6][7]\n\n**Pediatric thresholds:** 6.0 mm for children overall, 4.9 mm for children 0–3 years old. [8]',
    citation: [1, 2, 3, 4, 5, 6, 7, 8],
    next: 'epss-plax',
  },

  // =====================================================================
  // MODULE 2: POSITIONING & PLAX VIEW
  // =====================================================================

  {
    id: 'epss-plax',
    type: 'info',
    module: 2,
    title: 'Patient Positioning & PLAX View',
    body: 'PATIENT POSITIONING\nPosition the patient supine or in left lateral decubitus. Left lateral decubitus brings the heart closer to the chest wall and often improves image quality.\n\nPROBE SELECTION\nUse a phased-array cardiac transducer (2–5 MHz). Its small footprint fits between rib spaces.\n\nOBTAIN PARASTERNAL LONG-AXIS (PLAX) VIEW\n• Place the transducer in the 3rd–4th intercostal space, right next to the sternum\n• Probe marker points toward the patient\'s **left hip** (standard mode)\n• Hug the sternum as you slide up and down rib spaces to find the best window\n\nOPTIMIZE THE VIEW\nClearly visualize all three key structures:\n• **Interventricular septum** — horizontal across the screen\n• **Anterior mitral valve leaflet** — opening and closing within the LV\n• **Left ventricular cavity** — posterior to the septum\n\nRemember the **3 L\'s**: parasternal **L**ong axis should have the **L**eft ventricle on the **L**eft side of the screen. [3]',
    citation: [3],
    images: [
      {
        src: 'images/echo-epss/plax-anatomy.png',
        alt: 'Parasternal long-axis view composite showing probe position on chest, ultrasound image with labeled structures (RVOT, LVOT, LV, MV, LA, AV, inferior wall), and anatomic cross-section diagram',
        caption: 'PLAX view: Probe at 3rd–4th ICS near sternum, marker toward left hip. Key structures: septum, MV leaflets, LV cavity.',
      },
    ],
    next: 'epss-mmode',
  },

  // =====================================================================
  // MODULE 3: M-MODE & MEASUREMENT
  // =====================================================================

  {
    id: 'epss-mmode',
    type: 'info',
    module: 3,
    title: 'Activate M-Mode Through the Mitral Valve',
    body: 'CURSOR PLACEMENT\nWith a good PLAX view on screen, activate M-mode and position the cursor:\n\n• Place the M-mode cursor **perpendicular to the interventricular septum**\n• The cursor should pass through the **tips of the mitral valve leaflets** at the level where they open in early diastole\n• Ensure both the **septum and anterior mitral leaflet** are clearly visible on the M-mode tracing [3]\n\nOPTIMIZING THE TRACING\n• Adjust sweep speed so you can see 3–4 cardiac cycles\n• The septum should appear as a continuous bright line at the top of the M-mode display\n• The mitral valve should show its characteristic M-shaped motion pattern below the septum\n• If the tracing is unclear, return to 2D mode and readjust the cursor position',
    citation: [3],
    images: [
      {
        src: 'images/echo-epss/mmode-cursor.png',
        alt: 'Parasternal long-axis view with M-mode cursor line (dashed white line) positioned through the mitral valve leaflets, with cyan indicator dot at the top',
        caption: 'M-mode cursor positioned through the tips of the mitral valve leaflets in PLAX view.',
      },
    ],
    next: 'epss-measure',
  },

  {
    id: 'epss-measure',
    type: 'info',
    module: 3,
    title: 'Measure EPSS',
    body: '**Measure the shortest distance between the peak of the anterior mitral valve leaflet (E-point) and the interventricular septum during early diastole.** [1][2]\n\nIDENTIFYING THE E-POINT\nOn the M-mode tracing, the anterior mitral leaflet traces a characteristic pattern:\n• **E-point** — the tallest peak, representing maximal opening during early diastole\n• **A-point** — a smaller peak just before systole, from atrial contraction\n\nMeasure from the E-point peak to the nearest edge of the septum.\n\nE-WAVE & A-WAVE PHYSIOLOGY\nThe **E wave** represents early passive ventricular filling driven by the pressure gradient between the left atrium and left ventricle after mitral valve opening. This flow reflects the interplay of LA pressure, LV compliance, and the rate of ventricular relaxation. [1][2]\n\nThe **A wave** occurs later in diastole when the atrium contracts, actively propelling additional blood into the ventricle. It primarily reflects ventricular compliance and atrial contractility. [2]\n\nEPSS is measured at the peak of the E wave — it reflects both the amplitude of mitral valve excursion (influenced by filling dynamics) and left ventricular size, particularly outflow tract dilation.',
    citation: [1, 2, 3, 4],
    images: [
      {
        src: 'images/echo-epss/mmode-epoint.png',
        alt: 'M-mode tracing showing the interventricular septum as a bright line at top and the mitral valve motion below, with labeled Septum and E-point arrow indicating the measurement location',
        caption: 'M-mode: The E-point is the peak of the anterior mitral leaflet\'s excursion toward the septum. Measure the gap between them.',
      },
      {
        src: 'images/echo-epss/epss-example.png',
        alt: 'Split-screen ultrasound showing 2D PLAX view with M-mode cursor (top) and M-mode tracing (bottom) with caliper measurement reading 1.63 cm EPSS, indicating heart failure',
        caption: 'Example: EPSS measured at 1.63 cm (16.3 mm) — consistent with severe systolic dysfunction.',
      },
    ],
    next: 'epss-interpret',
  },

  // =====================================================================
  // MODULE 4: INTERPRETATION
  // =====================================================================

  {
    id: 'epss-interpret',
    type: 'question',
    module: 4,
    title: 'Interpret EPSS Results',
    body: 'What is the measured EPSS value?\n\nTHRESHOLDS\n• **< 7 mm** → Normal systolic function likely\n• **7–10 mm** → Grey zone — assess for signs of fluid overload\n• **> 10 mm** → Reduced systolic function (heart failure likely)',
    citation: [2, 4],
    images: [
      {
        src: 'images/echo-epss/epss-thresholds.png',
        alt: 'EPSS threshold reference: EPSS greater than 10 mm indicates heart failure, EPSS less than 7 mm indicates not heart failure',
        caption: 'EPSS thresholds: >10 mm = heart failure, <7 mm = normal function. 7–10 mm is the grey zone.',
      },
    ],
    options: [
      {
        label: 'EPSS < 7 mm',
        description: 'Normal systolic function likely',
        next: 'epss-normal',
      },
      {
        label: 'EPSS 7–10 mm',
        description: 'Grey zone — look for B-lines and IVC',
        next: 'epss-grey',
        urgency: 'urgent',
      },
      {
        label: 'EPSS > 10 mm',
        description: 'Reduced systolic function — heart failure likely',
        next: 'epss-hf',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'epss-normal',
    type: 'result',
    module: 4,
    title: 'EPSS < 7 mm — Normal Systolic Function',
    body: 'EPSS < 7 mm suggests preserved left ventricular ejection fraction (LVEF ≥50%).\n\nThe anterior mitral leaflet reaches close to the septum during early diastole, indicating adequate ventricular filling dynamics and normal LV cavity size.\n\nCLINICAL INTEGRATION\n• Combine with visual estimation of global cardiac function across multiple views\n• Consider alternative quantitative measures if clinical suspicion for dysfunction persists: MAPSE (mitral annular plane systolic excursion) or fractional shortening [1][9][5]\n\nLIMITATIONS REMINDER\nEPSS may be inaccurate in: aortic regurgitation, mitral stenosis, HCM, and non-sinus rhythms. [3]\nPediatric thresholds: 6.0 mm (children), 4.9 mm (age 0–3 years). [8]\n\nFor a video explanation of EPSS measurement, visit [Core Ultrasound — Basic Cardiac Function](https://coreultrasound.com/basic-cardiac-function/).',
    recommendation: 'EPSS < 7 mm — normal systolic function likely. Correlate with clinical presentation and other echo views. If suspicion for dysfunction persists, obtain formal echocardiography.',
    confidence: 'recommended',
    citation: [1, 2, 3, 5, 8, 9],
  },

  {
    id: 'epss-hf',
    type: 'result',
    module: 4,
    title: 'EPSS > 10 mm — Reduced Systolic Function',
    body: 'EPSS > 10 mm indicates significant left ventricular systolic dysfunction. [2][4]\n\n**EPSS has 100% sensitivity for detecting LVEF ≤30% when >7 mm.** [2] A measurement >10 mm strongly suggests severe reduction in ejection fraction.\n\nThe increased separation reflects poor ventricular contractility and/or significant LV dilation — the anterior mitral leaflet cannot reach the septum during early diastolic filling.\n\nCLINICAL NEXT STEPS\n• Assess for signs of fluid overload: B-lines on lung ultrasound, IVC plethora\n• Obtain additional echo views (A4C, PSAX) for visual estimation of global function\n• Consider formal echocardiography for quantitative LVEF\n• Initiate heart failure management as clinically indicated\n\nLIMITATIONS REMINDER\nEPSS may be inaccurate in: aortic regurgitation, mitral stenosis, HCM, and non-sinus rhythms. [3]\nPediatric thresholds: 6.0 mm (children), 4.9 mm (age 0–3 years). [8]\n\nFor a video explanation of EPSS measurement, visit [Core Ultrasound — Basic Cardiac Function](https://coreultrasound.com/basic-cardiac-function/).',
    recommendation: 'EPSS > 10 mm — high likelihood of severe systolic dysfunction (LVEF ≤30%). Consider formal echo, initiate heart failure workup, and manage per clinical presentation.',
    confidence: 'definitive',
    citation: [2, 3, 4, 5, 8],
  },

  // =====================================================================
  // MODULE 5: GREY ZONE ASSESSMENT
  // =====================================================================

  {
    id: 'epss-grey',
    type: 'question',
    module: 5,
    title: 'EPSS 7–10 mm — Grey Zone Assessment',
    body: 'EPSS is in the grey zone (7–10 mm). **Look for additional signs of fluid overload to help determine if systolic function is truly reduced.**\n\nASSESS B-LINES (Lung Ultrasound)\n• Scan bilateral anterior chest with linear or curvilinear probe\n• B-lines are vertical hyperechoic artifacts extending from the pleural line to the bottom of the screen\n• ≥3 B-lines per intercostal space in ≥2 zones bilaterally = pulmonary edema\n\nASSESS IVC (Subcostal View)\n• Measure IVC diameter and respiratory variation\n• IVC >2.1 cm with <50% collapse on sniff = elevated RA pressure (plethoric IVC)\n• Suggests fluid overload / elevated filling pressures\n\nAre B-lines or IVC plethora present?',
    citation: [2, 5],
    images: [
      {
        src: 'images/echo-epss/blines-comparison.png',
        alt: 'Side-by-side lung ultrasound comparison: normal dry lung (left) versus lung with B-lines indicating pulmonary edema (right)',
        caption: 'Lung ultrasound: Normal/dry lung (left) vs B-lines indicating pulmonary edema (right). Credit: CoreUltrasound.com.',
      },
      {
        src: 'images/echo-epss/ivc-assessment.png',
        alt: 'Subcostal ultrasound views showing IVC assessment for volume status with two comparison images',
        caption: 'IVC assessment: Evaluate diameter and respiratory collapse. Plethoric IVC (>2.1 cm, <50% collapse) suggests elevated RA pressure. Credit: CoreUltrasound.com.',
      },
    ],
    options: [
      {
        label: 'B-Lines or IVC plethora present',
        description: 'Evidence of fluid overload — likely reduced EF',
        next: 'epss-overload',
        urgency: 'urgent',
      },
      {
        label: 'No B-lines, IVC normal',
        description: 'No signs of fluid overload — indeterminate',
        next: 'epss-indeterminate',
      },
    ],
  },

  {
    id: 'epss-overload',
    type: 'result',
    module: 5,
    title: 'Grey Zone + Fluid Overload — Likely Reduced EF',
    body: 'EPSS 7–10 mm **with** signs of fluid overload (B-lines and/or IVC plethora) supports the diagnosis of reduced left ventricular systolic function.\n\nThe combination of borderline EPSS with pulmonary edema or elevated right-sided pressures increases the likelihood that LVEF is truly reduced.\n\nCLINICAL NEXT STEPS\n• Assess additional echo views (A4C, PSAX) for visual estimation of global function\n• Consider MAPSE as an additional quantitative measure [1][9]\n• Obtain formal echocardiography for quantitative LVEF\n• Initiate heart failure management as clinically indicated\n• Evaluate for underlying etiology (ischemia, valvular disease, cardiomyopathy)\n\nLIMITATIONS REMINDER\nEPSS may be inaccurate in: aortic regurgitation, mitral stenosis, HCM, and non-sinus rhythms. [3]\nPediatric thresholds: 6.0 mm (children), 4.9 mm (age 0–3 years). [8]\n\nFor a video explanation of EPSS measurement, visit [Core Ultrasound — Basic Cardiac Function](https://coreultrasound.com/basic-cardiac-function/).',
    recommendation: 'EPSS in grey zone with fluid overload signs — likely reduced systolic function. Recommend formal echocardiography and heart failure workup.',
    confidence: 'recommended',
    citation: [1, 2, 3, 5, 8, 9],
  },

  {
    id: 'epss-indeterminate',
    type: 'result',
    module: 5,
    title: 'Grey Zone, No Overload — Indeterminate',
    body: 'EPSS 7–10 mm **without** signs of fluid overload. The clinical significance is indeterminate.\n\nEPSS specificity is moderate (52%) at the >7 mm threshold [2] — false positives can occur, particularly in this borderline range.\n\nPOSSIBLE EXPLANATIONS\n• Early / compensated systolic dysfunction without volume overload\n• False positive — normal LVEF with borderline EPSS\n• Conditions that affect EPSS accuracy (AR, MS, HCM, non-sinus rhythm)\n\nCLINICAL NEXT STEPS\n• Integrate with visual estimation of global function on multiple views\n• Consider MAPSE (≥10 mm normal, <10 mm suggests reduced LVEF) [1][9]\n• Consider fractional shortening on PSAX (normal ≥25%) [5]\n• Obtain formal echocardiography if clinical suspicion for dysfunction persists\n\nLIMITATIONS REMINDER\nEPSS may be inaccurate in: aortic regurgitation, mitral stenosis, HCM, and non-sinus rhythms. [3]\nPediatric thresholds: 6.0 mm (children), 4.9 mm (age 0–3 years). [8]\n\nFor a video explanation of EPSS measurement, visit [Core Ultrasound — Basic Cardiac Function](https://coreultrasound.com/basic-cardiac-function/).',
    recommendation: 'EPSS in grey zone without fluid overload — indeterminate. Correlate clinically and consider formal echocardiography. MAPSE and fractional shortening may provide additional data points.',
    confidence: 'consider',
    citation: [1, 2, 3, 5, 8, 9],
  },

];

export const ECHO_EPSS_NODE_COUNT = ECHO_EPSS_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const ECHO_EPSS_MODULE_LABELS = [
  'Overview',
  'PLAX View',
  'M-Mode & Measurement',
  'Interpretation',
  'Grey Zone',
];

// -------------------------------------------------------------------
// Evidence Citations (9 references)
// -------------------------------------------------------------------

export const ECHO_EPSS_CITATIONS: Citation[] = [
  { num: 1, text: 'Stenberg Y, Wallinder L, Lindberg A, et al. Preoperative Point-of-Care Assessment of Left Ventricular Systolic Dysfunction With Transthoracic Echocardiography. Anesth Analg. 2021;132(3):717-725.' },
  { num: 2, text: 'McKaigney CJ, Krantz MJ, La Rocque CL, et al. E-Point Septal Separation: A Bedside Tool for Emergency Physician Assessment of Left Ventricular Ejection Fraction. Am J Emerg Med. 2014;32(6):493-7.' },
  { num: 3, text: 'Prats MI, Bahner DP. Application of Focused Cardiac Ultrasound in Emergency Medicine. American College of Emergency Physicians. 2020.' },
  { num: 4, text: 'Satılmış Siliv N, Yamanoglu A, Pınar P, et al. Estimation of Cardiac Systolic Function Based on Mitral Valve Movements: An Accurate Bedside Tool for Emergency Physicians in Dyspneic Patients. J Ultrasound Med. 2019;38(4):1027-1038.' },
  { num: 5, text: 'Bahl A, Johnson S, Altwail M, et al. Left Ventricular Ejection Fraction Assessment by Emergency Physician-Performed Bedside Echocardiography: A Prospective Comparative Evaluation of Multiple Modalities. J Emerg Med. 2021;61(6):711-719.' },
  { num: 6, text: 'Ginzton LE, Kulick D. Mitral Valve E-Point Septal Separation as an Indicator of Ejection Fraction in Patients With Reversed Septal Motion. Chest. 1985;88(3):429-31.' },
  { num: 7, text: 'Ahmadpour H, Shah AA, Allen JW, et al. Mitral E Point Septal Separation: A Reliable Index of Left Ventricular Performance in Coronary Artery Disease. Am Heart J. 1983;106(1 Pt 1):21-8.' },
  { num: 8, text: 'Chen E, Ramgopal S, Lorenz D, Jone PN, Horowitz R. Use of E-Point Septal Separation to Screen for Left Ventricular Function in Children. Am J Emerg Med. 2025;99:39-45.' },
  { num: 9, text: 'Schick AL, Kaine JC, Al-Sadhan NA, et al. Focused Cardiac Ultrasound With Mitral Annular Plane Systolic Excursion (MAPSE) Detection of Left Ventricular Dysfunction. Am J Emerg Med. 2023;68:52-58.' },
];
