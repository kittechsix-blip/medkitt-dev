// MedKitt — Priapism Treatment Consult
// Classification → Duration → Penile Block → Aspiration → Phenylephrine → Reassessment → Escalation
// AUA/SMSNA 2022 + EAU guidelines. 7 modules, 46 nodes.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PRIAPISM_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: CLASSIFICATION
  // =====================================================================

  {
    id: 'priapism-start',
    type: 'info',
    module: 1,
    title: 'Priapism: Overview',
    body: 'Priapism = prolonged erection lasting > 4 hours, unrelated to sexual stimulation.\n\nTwo types:\n\u2022 Ischemic (low-flow) \u2014 EMERGENCY. Most common. Veno-occlusive.\n\u2022 Non-ischemic (high-flow) \u2014 NOT an emergency. Arterial. Usually post-trauma.\n\nHistory to obtain:\n\u2022 Duration of erection\n\u2022 Pain level\n\u2022 Trauma history (straddle injury, perineal blunt trauma)\n\u2022 PDE5 inhibitor or intracavernosal injection (ICI) use\n\u2022 Sickle cell disease\n\u2022 Medications (antipsychotics, trazodone, anticoagulants)',
    citation: [1, 2, 8],
    next: 'priapism-differential',
  },

  {
    id: 'priapism-differential',
    type: 'info',
    module: 1,
    title: 'Ischemic vs Non-Ischemic: Key Differences',
    body: 'ISCHEMIC (Low-Flow)\n\u2022 Painful, fully rigid\n\u2022 No trauma history\n\u2022 Dark blood on aspiration\n\u2022 Compartment syndrome of the penis\n\u2022 UROLOGIC EMERGENCY\n\nNON-ISCHEMIC (High-Flow)\n\u2022 Painless or mild discomfort\n\u2022 Partially erect (not fully rigid)\n\u2022 Trauma history (straddle injury, kick, fall)\n\u2022 Bright red blood on aspiration\n\u2022 Arterial fistula \u2192 unregulated inflow\n\u2022 NOT an emergency\n\nIf unsure, corporal blood gas or Color Doppler ultrasound can help differentiate.',
    citation: [1, 2, 10, 11],
    next: 'priapism-type',
  },

  {
    id: 'priapism-type',
    type: 'question',
    module: 1,
    title: 'Classification',
    body: 'Based on history and exam, which type of priapism is this?',
    options: [
      {
        label: 'Ischemic (low-flow)',
        description: 'Painful, fully rigid, no trauma, dark blood expected',
        next: 'priapism-ischemic-confirm',
        urgency: 'critical',
      },
      {
        label: 'Non-ischemic (high-flow)',
        description: 'Painless or mild discomfort, partially erect, post-traumatic',
        next: 'priapism-nonischemic-info',
      },
      {
        label: 'Uncertain \u2014 need blood gas',
        description: 'Clinical picture unclear, aspirate for corporal blood gas',
        next: 'priapism-bloodgas',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'priapism-bloodgas',
    type: 'info',
    module: 1,
    title: 'Corporal Blood Gas Analysis',
    body: 'Aspirate blood from corpus cavernosum and send for blood gas.\n\nBLOOD COLOR\n\u2022 Dark, deoxygenated = ischemic\n\u2022 Bright red, oxygenated = non-ischemic\n\nISCHEMIC PATTERN\n\u2022 pO\u2082 < 30 mmHg\n\u2022 pCO\u2082 > 60 mmHg\n\u2022 pH < 7.25\n\nNON-ISCHEMIC PATTERN\n\u2022 pO\u2082 > 90 mmHg\n\u2022 pCO\u2082 < 40 mmHg\n\u2022 pH 7.35\u20137.45\n\nNote: Exact cutoffs are not standardized across studies, but the pattern of hypoxia + hypercarbia + acidosis reliably identifies ischemic priapism.\n\nColor Doppler ultrasound is a complementary noninvasive option if available.',
    citation: [1, 2, 9, 10, 11],
    next: 'priapism-bloodgas-result',
  },

  {
    id: 'priapism-bloodgas-result',
    type: 'question',
    module: 1,
    title: 'Blood Gas Result',
    body: 'What does the corporal blood gas show?',
    options: [
      {
        label: 'Ischemic pattern',
        description: 'pO\u2082 < 30, pCO\u2082 > 60, pH < 7.25, dark blood',
        next: 'priapism-ischemic-confirm',
        urgency: 'critical',
      },
      {
        label: 'Non-ischemic pattern',
        description: 'pO\u2082 > 90, pCO\u2082 < 40, pH 7.35\u20137.45, bright red blood',
        next: 'priapism-nonischemic-info',
      },
    ],
  },

  // --- Non-ischemic branch (terminal) ---

  {
    id: 'priapism-nonischemic-info',
    type: 'info',
    module: 1,
    title: 'Non-Ischemic Priapism',
    body: 'NOT a urologic emergency.\n\n\u2022 Usually from perineal trauma \u2192 arterial fistula\n\u2022 Partially tumescent, painless\n\u2022 62% resolve spontaneously\n\u2022 No aspiration or phenylephrine needed\n\u2022 ED risk much lower than ischemic type',
    citation: [1, 2, 3, 7],
    next: 'priapism-nonischemic-result',
  },

  {
    id: 'priapism-nonischemic-result',
    type: 'result',
    module: 1,
    title: 'Non-Ischemic Priapism \u2014 Observation',
    body: 'Non-ischemic priapism is not an emergency.\n\n\u2022 Most cases resolve on their own\n\u2022 If persistent: selective arterial embolization (85\u2013100% success)\n\u2022 Requires interventional radiology referral\n\u2022 Erectile function preserved in 80\u2013100% of cases',
    recommendation: 'Observation is first-line. If persistent or patient prefers intervention, refer to interventional radiology for selective arterial embolization. Urology follow-up within 1\u20132 weeks.',
    confidence: 'recommended',
    citation: [1, 2, 7, 11],
  },

  // --- Ischemic branch entry ---

  {
    id: 'priapism-ischemic-confirm',
    type: 'info',
    module: 1,
    title: 'Ischemic Priapism \u2014 Emergency',
    body: 'UROLOGIC EMERGENCY.\n\n\u2022 Ischemic priapism = compartment syndrome of the penis\n\u2022 Smooth muscle necrosis begins at 4\u20136 hours\n\u2022 Delayed treatment > 24 hours \u2192 30\u201370% erectile dysfunction\n\u2022 Time-sensitive: proceed to assess duration and etiology now',
    citation: [1, 2, 8],
    next: 'priapism-sickle-check',
  },

  // =====================================================================
  // MODULE 2: DURATION & ETIOLOGY
  // =====================================================================

  {
    id: 'priapism-sickle-check',
    type: 'question',
    module: 2,
    title: 'Sickle Cell Disease?',
    body: 'Does this patient have sickle cell disease (SCD)?\n\n\u2022 ~40% of males with SCD experience priapism\n\u2022 SCD priapism has specific initial management steps',
    citation: [1, 6],
    options: [
      {
        label: 'Yes \u2014 Sickle cell disease',
        description: 'Known HbSS, HbSC, or sickle-beta thalassemia',
        next: 'priapism-scd-duration',
        urgency: 'urgent',
      },
      {
        label: 'No \u2014 Not sickle cell',
        description: 'No sickle cell disease',
        next: 'priapism-duration',
      },
    ],
  },

  // --- SCD branch ---

  {
    id: 'priapism-scd-duration',
    type: 'question',
    module: 2,
    title: 'SCD Priapism \u2014 Duration',
    body: 'How long has the erection been present?\n\n\u2022 < 4 hours: supportive measures may help\n\u2022 \u2265 4 hours: requires emergent procedural intervention',
    citation: [1, 6],
    options: [
      {
        label: '< 4 hours',
        description: 'Erection less than 4 hours',
        next: 'priapism-scd-supportive',
      },
      {
        label: '\u2265 4 hours',
        description: 'Erection 4 hours or longer',
        next: 'priapism-scd-emergent',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'priapism-scd-supportive',
    type: 'info',
    module: 2,
    title: 'SCD Priapism < 4hr \u2014 Supportive Care',
    body: 'Try supportive measures first:\n\n\u2022 IV hydration (NS bolus)\n\u2022 Analgesia (ketorolac, opioids PRN)\n\u2022 Warm shower or warm packs\n\u2022 Supplemental O\u2082\n\n\u26A0\uFE0F Do NOT use RBC transfusion to treat priapism in SCD patients.\n\nMonitor for resolution. If no improvement, proceed to aspiration.',
    citation: [1, 6],
    next: 'priapism-scd-supportive-response',
  },

  {
    id: 'priapism-scd-supportive-response',
    type: 'question',
    module: 2,
    title: 'SCD Supportive Care Response',
    body: 'Did supportive measures produce detumescence (complete resolution of rigidity)?',
    options: [
      {
        label: 'Yes \u2014 Resolved',
        description: 'Erection resolving with supportive care',
        next: 'priapism-scd-resolved',
      },
      {
        label: 'No \u2014 Persistent or now \u2265 4hr',
        description: 'No improvement, or duration now \u2265 4 hours',
        next: 'priapism-scd-emergent',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'priapism-scd-resolved',
    type: 'result',
    module: 2,
    title: 'SCD Priapism \u2014 Resolved',
    body: 'Priapism resolved with supportive care.\n\n\u2022 Hematology follow-up for recurrence prevention\n\u2022 Options: hydroxyurea, GnRH agonists, PDE5i prophylaxis\n\n[Return Precautions](#/info/priapism-return-precautions)',
    recommendation: 'Discharge with hematology follow-up. Discuss recurrence prevention. Return immediately for any erection lasting > 4 hours.',
    confidence: 'definitive',
    citation: [1, 6],
  },

  {
    id: 'priapism-scd-emergent',
    type: 'info',
    module: 2,
    title: 'SCD Priapism \u2265 4hr \u2014 Emergent',
    body: 'SCD priapism \u2265 4 hours requires the same procedural treatment as non-SCD ischemic priapism.\n\n\u2022 Continue IV hydration and analgesia\n\u2022 Hematology consult for crisis management\n\u2022 Do NOT use RBC transfusion to treat priapism\n\u2022 Proceed to penile block for anesthesia',
    citation: [1, 6],
    next: 'priapism-penile-block-intro',
  },

  // --- Non-SCD duration assessment ---

  {
    id: 'priapism-duration',
    type: 'question',
    module: 2,
    title: 'Ischemic Priapism \u2014 Duration',
    body: 'How long has the erection been present? Duration drives treatment urgency and prognosis.',
    citation: [1, 2],
    options: [
      {
        label: 'Post-ICI, < 4 hours',
        description: 'After intracavernosal injection (alprostadil, papaverine, etc.)',
        next: 'priapism-post-ici',
      },
      {
        label: '4\u201336 hours',
        description: 'Standard ischemic priapism window',
        next: 'priapism-penile-block-intro',
        urgency: 'urgent',
      },
      {
        label: '> 36\u201348 hours',
        description: 'Prolonged ischemic priapism, high risk of necrosis',
        next: 'priapism-prolonged',
        urgency: 'critical',
      },
    ],
  },

  // --- Post-ICI branch ---

  {
    id: 'priapism-post-ici',
    type: 'info',
    module: 2,
    title: 'Post-ICI Prolonged Erection (< 4hr)',
    body: 'Post-intracavernosal injection priapism.\n\nConservative measures (try briefly, < 30\u201360 min):\n\u2022 Ice packs\n\u2022 Attempt ejaculation\n\u2022 Exercise (walking, climbing stairs)\n\n\u26A0\uFE0F Do NOT let conservative measures delay treatment.\nIf fully rigid and painful, proceed directly to phenylephrine.',
    citation: [1, 4, 5],
    next: 'priapism-post-ici-response',
  },

  {
    id: 'priapism-post-ici-response',
    type: 'question',
    module: 2,
    title: 'Post-ICI Response',
    body: 'Did conservative measures produce detumescence?',
    options: [
      {
        label: 'Yes \u2014 Resolving',
        description: 'Erection subsiding',
        next: 'priapism-post-ici-resolved',
      },
      {
        label: 'No \u2014 Persistent or now \u2265 4hr',
        description: 'No improvement, proceed to procedural intervention',
        next: 'priapism-penile-block-intro',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'priapism-post-ici-resolved',
    type: 'result',
    module: 2,
    title: 'Post-ICI Priapism \u2014 Resolved',
    body: 'Prolonged erection resolved with conservative measures.\n\n\u2022 Observe 30\u201360 min to confirm sustained resolution\n\u2022 Adjust ICI dose on follow-up with urology\n\n[Return Precautions](#/info/priapism-return-precautions)',
    recommendation: 'Observe 30\u201360 minutes. Discharge with urology follow-up to adjust ICI dose. Return immediately for any erection > 4 hours.',
    confidence: 'definitive',
    citation: [1, 5],
  },

  // --- Prolonged (> 36-48hr) ---

  {
    id: 'priapism-prolonged',
    type: 'info',
    module: 2,
    title: 'Prolonged Ischemic Priapism (> 36\u201348hr)',
    body: 'Duration > 36\u201348 hours:\n\n\u2022 Smooth muscle necrosis likely advanced\n\u2022 Aspiration + phenylephrine less likely to succeed\n\u2022 Still attempt aspiration + phenylephrine first\n\u2022 If unsuccessful: immediate surgical consultation\n\u2022 AUA/SMSNA recommends early penile prosthesis over delayed placement\n\nProceed to penile block.',
    citation: [1, 7, 8],
    next: 'priapism-penile-block-intro',
  },

  // =====================================================================
  // MODULE 3: PENILE BLOCK
  // =====================================================================

  {
    id: 'priapism-penile-block-intro',
    type: 'info',
    module: 3,
    title: 'Dorsal Penile Nerve Block \u2014 Overview',
    body: 'Adequate anesthesia is essential before aspiration.\n\nDorsal penile nerve block provides excellent analgesia for corporal aspiration and irrigation.\n\nAgent: 1% lidocaine WITHOUT epinephrine\n\u2022 The penis is supplied by end-arteries\n\u2022 NEVER use epinephrine \u2014 risk of ischemic necrosis\n\nDose: ~10 mL total (5 mL per side)',
    citation: [1, 9],
    images: [
      {
        src: 'images/priapism/penile-block.png',
        alt: 'Dorsal penile nerve block injection sites and cross-sectional anatomy showing dorsal nerves, arteries, and corpora',
        caption: 'Fig 1a: Injection sites at penile base. Fig 1b: Cross-section showing dorsal nerves. (Courtesy: Frank M. Corl, MS, Johns Hopkins Medical Institutions)',
      },
    ],
    next: 'priapism-penile-block-technique',
  },

  {
    id: 'priapism-penile-block-technique',
    type: 'info',
    module: 3,
    title: 'Dorsal Penile Nerve Block \u2014 Technique',
    body: 'PROCEDURE\n\n1. Clean the base of the penis with antiseptic\n2. Identify the **10 o\'clock** and **2 o\'clock** positions at the penile base\n3. Insert a **27-gauge needle** at the **10 o\'clock** position\n4. Advance under Buck\'s fascia (feel a slight pop)\n5. Aspirate to ensure you\'re not in a vessel\n6. Inject 5 mL of 1% lidocaine (no epi)\n7. Repeat at the **2 o\'clock** position with 5 mL\n\n**You must pop through Buck\'s fascia to anesthetize the nerve.**\n\nTotal: 10 mL of 1% lidocaine without epinephrine\n\n\u26A0\uFE0F Avoid the 12 o\'clock midline (dorsal vein and deep dorsal artery)',
    citation: [1, 9],
    images: [
      {
        src: 'images/priapism/do-not-inject.png',
        alt: 'Clock-face diagram showing safe injection zones — do not inject near the 6 o\'clock (ventral) or 12 o\'clock (dorsal midline) positions',
        caption: 'Safe injection zones: avoid 12 o\'clock (dorsal neurovascular bundle) and 6 o\'clock (ventral urethra).',
      },
    ],
    next: 'priapism-penile-block-complete',
  },

  {
    id: 'priapism-penile-block-complete',
    type: 'info',
    module: 3,
    title: 'Penile Block \u2014 Confirm Anesthesia',
    body: '\u2022 Wait 5\u201310 minutes for full anesthetic effect\n\u2022 Test with pinprick on penile shaft\n\u2022 If inadequate, supplement with additional local at injection sites\n\nWhen adequate anesthesia confirmed, proceed to corporal aspiration.',
    citation: [1],
    next: 'priapism-aspiration-intro',
  },

  // =====================================================================
  // MODULE 4: CORPORAL ASPIRATION
  // =====================================================================

  {
    id: 'priapism-aspiration-intro',
    type: 'info',
    module: 4,
    title: 'Corporal Aspiration \u2014 Setup',
    body: 'EQUIPMENT\n\u2022 18\u201321 gauge butterfly needle or angiocath\n\u2022 Three-way stopcock\n\u2022 20\u201360 mL syringe (for aspiration)\n\u2022 10\u201320 mL syringe with normal saline (for irrigation)\n\u2022 Sterile prep and drape\n\nINJECTION SITE\n\u2022 Lateral aspect of proximal penile shaft\n\u2022 2 o\'clock or 10 o\'clock position\n\u2022 AVOID 12 o\'clock (dorsal neurovascular bundle)\n\u2022 AVOID 6 o\'clock (urethra)\n\nSingle-side entry is sufficient \u2014 the two corpora communicate via the intercavernosal septum.',
    citation: [1, 2, 5, 9],
    images: [
      {
        src: 'images/priapism/cross-section.png',
        alt: 'Cross-sectional anatomy of the penis showing corpora cavernosa, corpus spongiosum, urethra, tunica albuginea, and neurovascular structures',
        caption: 'Penile cross-section: Corpora cavernosa (paired), corpus spongiosum (ventral), urethra, and dorsal neurovascular bundle. (Courtesy: Frank M. Corl, MS, Johns Hopkins Medical Institutions)',
      },
      {
        src: 'images/priapism/aspiration-setup.png',
        alt: 'Three-way stopcock connected to butterfly needle and syringes for priapism aspiration setup',
        caption: 'Aspiration setup: Three-way stopcock, butterfly needle, aspiration syringe, and saline irrigation syringe. (Source: EmDocs.net)',
      },
    ],
    next: 'priapism-aspiration-technique',
  },

  {
    id: 'priapism-aspiration-technique',
    type: 'info',
    module: 4,
    title: 'Corporal Aspiration \u2014 Procedure',
    body: 'PROCEDURE\n\n1. Insert needle at 2 or 10 o\'clock into corpus cavernosum\n2. Aspirate dark, deoxygenated blood\n3. Continue aspirating until blood turns bright red\n   (bright red = fresh arterial inflow restored)\n4. Typically 20\u201330 mL per aspiration cycle\n\nTIP: Can send initial aspirate for blood gas if type not yet confirmed.\n\nIRRIGATION\n5. After aspiration, irrigate with 20\u201330 mL normal saline\n6. Re-aspirate\n7. Repeat aspiration\u2013irrigation cycles until aspirate is bright red\n\nIrrigation clears clotted blood and metabolic waste, improving resolution rates.',
    citation: [1, 2, 3, 9],
    images: [
      {
        src: 'images/priapism/aspiration-procedure.png',
        alt: 'Corporal aspiration procedure showing needle inserted into corpus cavernosum with three-way stopcock and syringe connected',
        caption: 'Aspiration in progress: Needle in corpus cavernosum, stopcock connected, syringe aspirating blood. (Source: Mieczkowski JM et al., 2021)',
      },
    ],
    next: 'priapism-aspiration-response',
  },

  {
    id: 'priapism-aspiration-response',
    type: 'question',
    module: 4,
    title: 'Aspiration Response',
    body: 'Did aspiration and irrigation produce detumescence?\n\n\u2022 Aspiration + irrigation alone: ~36% success rate\n\u2022 If not resolved, proceed to phenylephrine injection',
    citation: [1, 3],
    options: [
      {
        label: 'Yes \u2014 Detumescence',
        description: 'Penis becoming flaccid after aspiration/irrigation',
        next: 'priapism-aspiration-success',
      },
      {
        label: 'No \u2014 Still rigid',
        description: 'Persistent rigidity, proceed to phenylephrine',
        next: 'priapism-phenylephrine-intro',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'priapism-aspiration-success',
    type: 'result',
    module: 4,
    title: 'Aspiration Successful',
    body: 'Priapism resolved with aspiration and irrigation.\n\n\u2022 Observe 30\u201360 min to confirm sustained resolution\n\u2022 Urology follow-up in 1\u20132 days\n\n[Return Precautions](#/info/priapism-return-precautions)',
    recommendation: 'Observe 30\u201360 minutes to confirm sustained detumescence. Discharge with urology follow-up in 1\u20132 days. Return immediately for recurrence > 4 hours.',
    confidence: 'definitive',
    citation: [1, 3, 9],
  },

  // =====================================================================
  // MODULE 5: PHENYLEPHRINE INJECTION
  // =====================================================================

  {
    id: 'priapism-phenylephrine-intro',
    type: 'info',
    module: 5,
    title: 'Intracavernosal Phenylephrine',
    body: 'Phenylephrine = first-line sympathomimetic (AUA/SMSNA 2022).\n\nWhy phenylephrine?\n\u2022 Pure alpha-1 agonist \u2192 no intrinsic inotropy, no increase in heart rate\n\u2022 Causes smooth muscle contraction \u2192 venous outflow\n\u2022 74% success rate (vs 25% terbutaline)\n\u2022 Combined with aspiration: 70\u2013100% success\n\nOnset: 1 minute | Duration: 10\u201320 minutes\n\nTap for mixing instructions:\n\u2022 [Phenylephrine](#/drug/phenylephrine) \u2014 first-line\n\u2022 [Epinephrine](#/drug/epinephrine) \u2014 alternative if no phenylephrine',
    citation: [1, 3, 4, 5],
    images: [
      {
        src: 'images/priapism/mixing-instructions.png',
        alt: 'Drug mixing instructions for epinephrine (10 mcg/mL) and phenylephrine (100 mcg/mL) showing vials, syringes, and labeled concentrations',
        caption: 'Mixing instructions for intracavernosal sympathomimetics. (Source: EMCrit Podcast / EM:RAP)',
      },
    ],
    next: 'priapism-phenylephrine-dose',
  },

  {
    id: 'priapism-phenylephrine-dose',
    type: 'info',
    module: 5,
    title: 'Phenylephrine \u2014 Dosing Protocol',
    body: '\u26A0\uFE0F The corpora cavernosa communicate freely \u2014 only ONE side needs to be injected.\n\nPHENYLEPHRINE (first-line)\n\u2022 200 mcg (2 mL of 100 mcg/mL solution) per dose\n\u2022 Inject into corpus cavernosum\n\u2022 Every 5 minutes\n\u2022 Up to 5 doses TOTAL (= 1 mg max)\n\nEPINEPHRINE (alternative \u2014 if phenylephrine unavailable)\n\u2022 20 mcg (2 mL of 10 mcg/mL solution) per dose\n\u2022 Inject into corpus cavernosum\n\u2022 Every 5 minutes\n\u2022 Up to 5 doses TOTAL (= 100 mcg max)\n\nMONITORING\n\u2022 Check BP and HR every 5 min between injections\n\u2022 HOLD if SBP > 160 or HR > 110\n\u2022 Contraindicated: uncontrolled HTN, MAO inhibitor use\n\nPEDIATRIC / SCD: use lower dose (100 mcg phenylephrine per injection)',
    citation: [1, 4, 5],
    next: 'priapism-phenylephrine-inject',
  },

  {
    id: 'priapism-phenylephrine-inject',
    type: 'info',
    module: 5,
    title: 'Phenylephrine \u2014 Injection Technique',
    body: 'TECHNIQUE\n\n1. Inject 2 mL phenylephrine (200 mcg) through the same needle used for aspiration\n2. Wait 5 minutes\n3. Re-aspirate to remove additional stagnant blood\n4. Assess for detumescence\n5. If still rigid, repeat injection (up to 5 doses total)\n\nRemember: Corpora cavernosa communicate freely.\nOnly one side needs injection. 5 doses = 5 doses TOTAL, not per side.\n\nAlternating approach:\n\u2022 Aspirate \u2192 Inject phenylephrine \u2192 Wait 5 min \u2192 Aspirate again \u2192 Reassess\n\u2022 Continue cycling up to 5 doses',
    citation: [1, 5],
    next: 'priapism-phenylephrine-response',
  },

  {
    id: 'priapism-phenylephrine-response',
    type: 'question',
    module: 5,
    title: 'Phenylephrine Response',
    body: 'After phenylephrine injection(s), has detumescence occurred?\n\n\u2022 May require up to 5 doses (every 5 min)\n\u2022 Combined aspiration + phenylephrine: 70\u2013100% success',
    citation: [1, 3, 4],
    options: [
      {
        label: 'Yes \u2014 Detumescence',
        description: 'Resolution after phenylephrine',
        next: 'priapism-phenylephrine-success',
      },
      {
        label: 'No \u2014 Refractory after 1 hour',
        description: 'Persistent rigidity despite max phenylephrine',
        next: 'priapism-refractory',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'priapism-phenylephrine-success',
    type: 'result',
    module: 5,
    title: 'Phenylephrine Successful',
    body: 'Priapism resolved with aspiration + phenylephrine.\n\n[Return Precautions](#/info/priapism-return-precautions)',
    recommendation: 'Observe 60 minutes. Monitor BP/HR. Discharge with urology follow-up in 1\u20132 days. Return immediately for recurrence > 4 hours.',
    confidence: 'definitive',
    citation: [1, 3, 4, 5],
  },

  // =====================================================================
  // MODULE 6: REASSESSMENT
  // =====================================================================

  {
    id: 'priapism-refractory',
    type: 'info',
    module: 6,
    title: 'Refractory Ischemic Priapism',
    body: 'Failed aspiration, irrigation, and phenylephrine (1 hour max).\n\n\u2022 This is refractory ischemic priapism\n\u2022 Requires surgical intervention\n\u2022 Duration of priapism determines surgical approach\n\u2022 Urgent urology consultation required',
    citation: [1, 7],
    next: 'priapism-refractory-duration',
  },

  {
    id: 'priapism-refractory-duration',
    type: 'question',
    module: 6,
    title: 'Refractory \u2014 Total Duration',
    body: 'How long has the priapism been present in total? This determines the surgical strategy.',
    citation: [1, 7],
    options: [
      {
        label: '< 36 hours total',
        description: 'Still within window for shunting procedures',
        next: 'priapism-shunting-info',
        urgency: 'urgent',
      },
      {
        label: '\u2265 36\u201348 hours total',
        description: 'Prolonged duration, consider immediate prosthesis',
        next: 'priapism-prosthesis-consider',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 7: SURGICAL ESCALATION
  // =====================================================================

  {
    id: 'priapism-shunting-info',
    type: 'info',
    module: 7,
    title: 'Surgical Shunting',
    body: 'Shunting creates a pathway for blood to drain from the corpora cavernosa.\n\nTwo categories:\n\u2022 DISTAL shunts \u2014 preferred first (less invasive, lower morbidity)\n\u2022 PROXIMAL shunts \u2014 if distal fails (more invasive, higher complication rate)\n\nDistal shunts connect corpus cavernosum to glans penis.\nProximal shunts connect to corpus spongiosum or saphenous vein.\n\nUrology consultation required for all shunting procedures.',
    citation: [1, 7],
    next: 'priapism-shunting-types',
  },

  {
    id: 'priapism-shunting-types',
    type: 'question',
    module: 7,
    title: 'Shunt Selection',
    body: 'Which shunt is being performed? Distal shunts are attempted first.',
    citation: [1, 7],
    options: [
      {
        label: 'Distal shunt',
        description: 'Winter, Ebbehoj, Al-Ghorab, or T-shunt (corporoglanular)',
        next: 'priapism-distal-shunt',
      },
      {
        label: 'Proximal shunt',
        description: 'Quackels or Grayhack (if distal shunt failed)',
        next: 'priapism-proximal-shunt',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'priapism-distal-shunt',
    type: 'info',
    module: 7,
    title: 'Distal Shunt Procedures',
    body: 'WINTER (percutaneous)\n\u2022 Tru-Cut biopsy needle through glans into distal corpora\n\nEBBEHOJ (percutaneous)\n\u2022 No. 11 scalpel blade through glans into corpora\n\nAL-GHORAB (open)\n\u2022 Open excision of distal tunica albuginea through glans incision\n\nT-SHUNT (variation)\n\u2022 No. 10 blade with 90-degree rotation\n\nAll create a fistula at the glans for blood to drain into the corpus spongiosum.',
    citation: [1, 7],
    next: 'priapism-shunt-response',
  },

  {
    id: 'priapism-proximal-shunt',
    type: 'info',
    module: 7,
    title: 'Proximal Shunt Procedures',
    body: 'QUACKELS\n\u2022 Corporospongiosal shunt at penoscrotal junction\n\nGRAYHACK\n\u2022 Saphenous vein-to-corpus cavernosum anastomosis\n\n\u26A0\uFE0F More invasive, higher complication rate.\nUsed only when distal shunts fail.',
    citation: [1, 7],
    next: 'priapism-shunt-response',
  },

  {
    id: 'priapism-shunt-response',
    type: 'question',
    module: 7,
    title: 'Post-Shunt Assessment',
    body: 'Did surgical shunting produce detumescence?',
    options: [
      {
        label: 'Yes \u2014 Detumescence',
        description: 'Resolution after shunt procedure',
        next: 'priapism-shunt-success',
      },
      {
        label: 'No \u2014 Persistent',
        description: 'Shunting failed to resolve priapism',
        next: 'priapism-shunt-fail',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'priapism-shunt-success',
    type: 'result',
    module: 7,
    title: 'Shunt Successful',
    body: 'Priapism resolved with surgical shunting.\n\n\u2022 Post-op monitoring per urology\n\u2022 ED risk depends on duration of priapism before resolution\n\u2022 Consider PDE5i trial at 4\u20136 weeks for erectile rehabilitation\n\n[Return Precautions](#/info/priapism-return-precautions)',
    recommendation: 'Post-op monitoring per urology. Follow-up within 48 hours. Counsel on erectile dysfunction risk (depends on duration). PDE5i trial at 4\u20136 weeks for rehabilitation.',
    confidence: 'definitive',
    citation: [1, 7],
  },

  {
    id: 'priapism-shunt-fail',
    type: 'result',
    module: 7,
    title: 'Shunting Failed',
    body: 'Shunting has failed to produce detumescence.\n\nOptions:\n\u2022 If distal shunt attempted \u2192 may try proximal shunt\n\u2022 If both failed, or duration > 48hr with necrotic tissue:\n  \u2192 Immediate penile prosthesis recommended (AUA/SMSNA 2022)\n\nEarly prosthesis (within days) has better outcomes than delayed placement:\n\u2022 Easier implantation\n\u2022 Less penile fibrosis\n\u2022 Better length preservation\n\u2022 Patient satisfaction 60\u2013100%',
    recommendation: 'Urgent urology consultation for penile prosthesis implantation. Early implantation preferred over delayed. If proximal shunt not yet attempted, consider before prosthesis.',
    confidence: 'recommended',
    citation: [1, 7, 8],
  },

  // --- Prolonged priapism prosthesis pathway ---

  {
    id: 'priapism-prosthesis-consider',
    type: 'info',
    module: 7,
    title: 'Prolonged Priapism (> 36\u201348hr) \u2014 Prosthesis',
    body: 'Duration > 36\u201348 hours with failed medical management:\n\n\u2022 Smooth muscle necrosis likely advanced\n\u2022 AUA/SMSNA 2022: consider immediate penile prosthesis\n\u2022 Still attempt aspiration + phenylephrine first if not yet done\n\u2022 If unsuccessful, do not delay surgical consultation\n\nEarly prosthesis placement (within days) has better outcomes:\n\u2022 Easier implantation before fibrosis develops\n\u2022 Better penile length preservation\n\u2022 Patient satisfaction 60\u2013100%',
    citation: [1, 7, 8],
    next: 'priapism-prosthesis-attempt',
  },

  {
    id: 'priapism-prosthesis-attempt',
    type: 'question',
    module: 7,
    title: 'Treatment Approach \u2014 Prolonged Priapism',
    body: 'After attempting aspiration + phenylephrine, what is the plan?',
    citation: [1, 7],
    options: [
      {
        label: 'Detumescence achieved',
        description: 'Aspiration + phenylephrine succeeded despite prolonged duration',
        next: 'priapism-prolonged-resolved',
      },
      {
        label: 'Shunting procedure',
        description: 'Proceed to surgical shunt attempt',
        next: 'priapism-shunting-info',
        urgency: 'urgent',
      },
      {
        label: 'Immediate penile prosthesis',
        description: 'Urology recommends immediate prosthesis placement',
        next: 'priapism-prosthesis-result',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'priapism-prolonged-resolved',
    type: 'result',
    module: 7,
    title: 'Prolonged Priapism \u2014 Resolved',
    body: 'Detumescence achieved despite prolonged duration.\n\n\u2022 High risk of erectile dysfunction (30\u201370% at > 24hr duration)\n\u2022 Urology follow-up within 48 hours\n\u2022 Early erectile rehabilitation counseling\n\u2022 PDE5i trial at 4\u20136 weeks\n\n[Return Precautions](#/info/priapism-return-precautions)',
    recommendation: 'Observe. Urology follow-up within 48 hours. High probability of ED given prolonged duration. Early erectile rehabilitation counseling. PDE5i trial at 4\u20136 weeks.',
    confidence: 'recommended',
    citation: [1, 2, 8],
  },

  {
    id: 'priapism-prosthesis-result',
    type: 'result',
    module: 7,
    title: 'Immediate Penile Prosthesis',
    body: 'Immediate prosthesis implantation for refractory prolonged ischemic priapism.\n\nAUA/SMSNA 2022: early placement preferred over delayed.\n\nBenefits:\n\u2022 Prevents penile shortening from fibrosis\n\u2022 Restores erectile function\n\u2022 Avoids difficult delayed implantation in scarred tissue\n\u2022 Patient satisfaction 60\u2013100%',
    recommendation: 'Urology proceeding with penile prosthesis implantation. Post-op care per urology team. This is the definitive treatment for refractory prolonged ischemic priapism.',
    confidence: 'definitive',
    citation: [1, 7, 8],
  },

];

export const PRIAPISM_NODE_COUNT = PRIAPISM_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for wizard progress bar)
// -------------------------------------------------------------------

export const PRIAPISM_MODULE_LABELS = [
  'Classification',
  'Duration',
  'Penile Block',
  'Aspiration',
  'Phenylephrine',
  'Reassessment',
  'Escalation',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const PRIAPISM_CITATIONS: Citation[] = [
  { num: 1, text: 'Bivalacqua TJ, Allen BK, Brock GB, et al. The Diagnosis and Management of Recurrent Ischemic Priapism, Priapism in Sickle Cell Patients, and Non-Ischemic Priapism: An AUA/SMSNA Guideline. J Urol. 2022;208(1):43-52.' },
  { num: 2, text: 'Salonia A, Eardley I, Giuliano F, et al. European Association of Urology Guidelines on Priapism. Eur Urol. 2014;65(2):480-9.' },
  { num: 3, text: 'Capogrosso P, Dimitropolous K, Russo GI, et al. Conservative and Medical Treatments of Non-Sickle Cell Disease-Related Ischemic Priapism: A Systematic Review by the EAU. Int J Impot Res. 2024;36(1):6-19.' },
  { num: 4, text: 'Martin C, Cocchio C. Effect of Phenylephrine and Terbutaline on Ischemic Priapism: A Retrospective Review. Am J Emerg Med. 2016;34(2):222-4.' },
  { num: 5, text: 'Graham BA, et al. An Overview of Emergency Pharmacotherapy for Priapism. Expert Opin Pharmacother. 2022;23(12):1371-1380.' },
  { num: 6, text: 'Kavanagh PL, Fasipe TA, Wun T. Sickle Cell Disease: A Review. JAMA. 2022;328(1):57-68.' },
  { num: 7, text: 'Milenkovic U, Cocci A, Veeratterapillay R, et al. Surgical and Minimally Invasive Treatment of Ischaemic and Non-Ischaemic Priapism: A Systematic Review. Int J Impot Res. 2024;36(1):36-49.' },
  { num: 8, text: 'Pang KH, Alnajjar HM, Lal A, Muneer A. An Update on Mechanisms and Treatment Options for Priapism. Nat Rev Urol. 2025.' },
  { num: 9, text: 'Burnett AL, Sharlip ID. Standard Operating Procedures for Priapism. J Sex Med. 2013;10(1):180-94.' },
  { num: 10, text: 'Melman A, Serels S. Priapism. Int J Impot Res. 2000;12 Suppl 4:S133-9.' },
  { num: 11, text: 'McHugh K, Gibbons RC. Point-of-Care Ultrasound Diagnosis of High Flow Priapism. J Emerg Med. 2022;62(2):207-209.' },
];

// -------------------------------------------------------------------
// Clinical Notes (for reference page)
// -------------------------------------------------------------------

export const PRIAPISM_CLINICAL_NOTES: string[] = [
  'Ischemic priapism is a urologic EMERGENCY \u2014 equivalent to compartment syndrome. Smooth muscle necrosis begins at 4\u20136 hours.',
  'Delayed treatment > 24 hours is associated with 30\u201370% erectile dysfunction rate.',
  'Corporal blood gas distinguishes ischemic from non-ischemic when exam is unclear. Ischemic: pO\u2082 < 30, dark blood. Non-ischemic: pO\u2082 > 90, bright red.',
  'Phenylephrine is the recommended first-line sympathomimetic (AUA/SMSNA 2022). Alpha-1 selective = lower cardiovascular risk than epinephrine.',
  'Phenylephrine dosing: 200 mcg (2 mL of 100 mcg/mL) every 5 min, up to 5 doses total (1 mg max). Corpora communicate freely \u2014 only one side needs injection. Monitor BP/HR every 5 min. Hold if SBP > 160 or HR > 110.',
  'Sickle cell priapism < 4hr: try supportive care first (IV fluids, analgesia). Do NOT use RBC transfusion to treat priapism.',
  'Non-ischemic priapism is NOT an emergency. 62% resolve spontaneously. Selective arterial embolization for persistent cases.',
  'For refractory priapism > 48hr, AUA/SMSNA recommends considering immediate penile prosthesis over delayed implantation.',
  'NEVER use epinephrine with local anesthetic for penile block \u2014 end-artery territory, risk of ischemic necrosis.',
  'Distal shunts preferred over proximal shunts \u2014 less invasive, lower morbidity, attempted first.',
];
