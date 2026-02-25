// MedKitt — Neonatal Resuscitation (NRP)
// Stepwise approach to neonatal resuscitation based on 2025 AHA/AAP NRP Algorithm.
// 6 modules: Preparation & Initial Assessment → Initial Steps (Golden 30s) → PPV → Chest Compressions → Medications & Vascular Access → Post-Resuscitation
// 25 nodes total.
// Source: 2025 AHA/AAP Guidelines, NRP 8th ed (AAP 2021), 2020 ILCOR Consensus, McFarlin (EMR 2019)

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const NEONATAL_RESUS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: PREPARATION & INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'nrp-start',
    type: 'info',
    module: 1,
    title: 'Neonatal Resuscitation (NRP)',
    body: '[NRP Steps Summary](#/info/nrp-summary) — quick-reference checklist for neonatal resuscitation.\n\n**Neonatal resuscitation** follows a systematic, stepwise approach from initial assessment through advanced interventions.\n\n**Key statistics:** [1]\n• ~90% of newborns transition without intervention beyond warmth, drying, and stimulation\n• ~10% need early support (PPV, supplemental O2)\n• <1% need extensive resuscitation (CPR + medications)\n\n**Modules:**\n• Module 1: Preparation & Initial Assessment — team, equipment, cord management, initial evaluation\n• Module 2: Initial Steps — Golden 30 Seconds (warm, dry, position, stimulate, clear)\n• Module 3: Positive Pressure Ventilation — PPV technique, corrective steps, advanced airway\n• Module 4: Chest Compressions — CPR technique, intubation\n• Module 5: Medications & Vascular Access — epinephrine, UVC, volume resuscitation\n• Module 6: Post-Resuscitation — APGAR, normothermia, NICU transfer\n\n**Cross-links:**\n• [Precipitous Delivery](#/tree/precip-delivery) — ED delivery management\n• [Shoulder Dystocia](#/tree/shoulder-dystocia) — if turtle sign during delivery',
    citation: [1, 2],
    next: 'nrp-preparation',
  },

  {
    id: 'nrp-preparation',
    type: 'info',
    module: 1,
    title: 'Team & Equipment Preparation',
    body: 'TEAM BRIEFING\n• Assign roles before delivery: **team leader**, airway manager, compressor, medication nurse, timekeeper/recorder\n• NRP pre-brief questions: gestational age, number of babies, risk factors (meconium, preeclampsia, prematurity), cord management plan\n• Communicate: **"vigorous" vs "non-vigorous"** dictates cord strategy\n\nEQUIPMENT CHECKLIST\n• **Radiant warmer** — turn ON now (prewarming)\n• **T-piece resuscitator** (preferred 2025) or self-inflating bag with manometer\n• **Pulse oximeter** — right hand/wrist (preductal)\n• **Cardiac monitor** — 3-lead ECG (most accurate HR)\n• **Suction** — bulb syringe + wall suction with 10F/12F catheter\n• **Intubation** — laryngoscope (Miller 0/00), ETT (2.5–4.0), stylet, tape\n• **UVC kit** — umbilical catheter (3.5F/5F), umbilical tape, sterile instruments\n• **Medications** — epinephrine 1:10,000, normal saline, D10W\n\n**Document:** cord clamping time, APGARs, time to ventilation [1][2]',
    citation: [1, 2],
    images: [
      {
        src: 'images/neonatal-resus/neonatal-monitoring.png',
        alt: 'Annotated photo of neonatal monitoring setup showing preductal O2 sat on right hand, temperature probe over liver (36.5-37.5°C), EKG probes, ETT, and umbilical catheter placement',
        caption: 'Neonatal monitoring: SpO2 on right hand (preductal). Temperature probe over liver (36.5-37.5°C).',
      },
    ],
    next: 'nrp-cord-mgmt',
  },

  {
    id: 'nrp-cord-mgmt',
    type: 'info',
    module: 1,
    title: 'Cord Management (2025 Update)',
    body: 'DELAYED CORD CLAMPING (DCC) — 2025 GUIDELINES [1][5]\n\n**Vigorous term/late preterm:**\n• DCC **30–60 seconds** recommended\n• Improves placental transfusion, iron stores, and hemoglobin\n\n**Non-vigorous ≥35 weeks:**\n• **Intact cord milking (ICM)** may be reasonable (compared to immediate clamping)\n• Milk cord toward baby 3–4 times over 2 seconds\n\n**Preterm 28–34 weeks:**\n• ICM when DCC isn\'t possible\n\n**<28 weeks:**\n• ICM is **NOT recommended** — risk of intraventricular hemorrhage\n\n**Clamp immediately if:**\n• Baby needs resuscitation and can\'t wait\n• Placental abruption, cord avulsion, or other emergency\n\n**Communicate cord management plan to the team before delivery.** [5]',
    citation: [1, 5],
    next: 'nrp-preterm',
  },

  {
    id: 'nrp-preterm',
    type: 'info',
    module: 1,
    title: 'Preterm Considerations',
    body: 'PRETERM ASSESSMENT [1][2]\n\n**Viability assessment:**\n• Dating most accurate in 1st trimester (±3–5 days)\n• Later dating accuracy: ±1–2 weeks\n• U/S: BPD + femur length for estimation\n\n**Preterm-specific needs:**\n• **Plastic wrap <32 weeks** — cover body (not face) to prevent heat loss\n• **Higher starting FiO2** — 21–30% for ≥35 wk, 21–30% for <35 wk (titrate to SpO2 targets)\n• **Temperature is critical** — hypothermia worsens all outcomes\n• **Surfactant** may be needed if <32 wk (NICU decision)\n\n**Gestational age estimation if unknown:**\n• Weight: ~500g at 23–24 wk, ~1000g at 28 wk, ~1500g at 32 wk, ~2500g at 37 wk\n• Sole creases, ear cartilage, breast tissue for Ballard score (post-resuscitation)\n\n**Both hypothermia AND hyperthermia worsen outcomes.** Target normothermia (36.5–37.5°C) for all infants. [1]',
    citation: [1, 2],
    next: 'nrp-initial-eval',
  },

  {
    id: 'nrp-initial-eval',
    type: 'question',
    module: 1,
    title: 'Initial Evaluation',
    body: 'INITIAL EVALUATION — The 3 Questions [1][2][3]\n\nAssess immediately at birth:\n\n**1. Term gestation?** (≥37 weeks)\n**2. Breathing or crying?**\n**3. Good muscle tone?** (flexed, active)',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Yes to ALL — vigorous',
        description: 'Term, breathing/crying, good tone → routine care',
        next: 'nrp-routine',
      },
      {
        label: 'No to ANY — needs intervention',
        description: 'Preterm, apneic, poor tone → initial steps',
        next: 'nrp-initial-steps',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'nrp-routine',
    type: 'result',
    module: 1,
    title: 'Vigorous — Routine Care',
    body: 'VIGOROUS NEWBORN\n\n• **Skin-to-skin** contact with mother\n• **Delayed cord clamping** 30–60 seconds\n• **Dry** the baby with warm towels\n• **Maintain normothermia** (36.5–37.5°C)\n• **APGAR scoring** at 1 and 5 minutes\n\nContinue monitoring for transition. If at any point the baby develops apnea, labored breathing, or HR <100 → proceed to initial steps.',
    recommendation: 'Vigorous newborn — routine care. Skin-to-skin, delayed cord clamping, dry, maintain normothermia. APGAR at 1 and 5 minutes. Monitor for transition.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 2: INITIAL STEPS — GOLDEN 30 SECONDS
  // =====================================================================

  {
    id: 'nrp-initial-steps',
    type: 'info',
    module: 2,
    title: 'Initial Steps — Golden 30 Seconds',
    body: 'INITIAL STEPS — Complete within 30 seconds [1][2][3]\n\n**W — WARM**\n• Radiant heater ON — **NO blankets on top** (blocks radiant heat)\n• Plastic wrap for <32 weeks\n\n**D — DRY**\n• Vigorously dry with warm towels\n• Remove wet towels — replace with dry\n\n**P — POSITION**\n• **Sniffing position** — slight neck extension to open airway\n• Shoulder roll if needed for neutral alignment\n\n**S — STIMULATE**\n• **Flick the soles of the feet**\n• **Rub the back** — up and down along the spine\n• Primary apnea always responds to stimulation\n\n**C — CLEAR AIRWAY (PRN)**\n• Suction **mouth then nose** ("M before N")\n• Avoid vigorous or deep suctioning — causes bradycardia via vagal stimulation\n• Only suction if secretions are obstructing the airway',
    citation: [1, 2, 3],
    next: 'nrp-meconium',
  },

  {
    id: 'nrp-meconium',
    type: 'info',
    module: 2,
    title: 'Meconium-Stained Fluid',
    body: 'MECONIUM MANAGEMENT (2025 Update) [1][6]\n\n**Vigorous baby + meconium:**\n• Proceed with normal initial steps\n• No special suctioning needed\n\n**Non-vigorous baby + meconium:**\n• **Do NOT delay PPV for suctioning** (2025 guideline change)\n• Begin PPV as indicated — ventilation is the priority\n• ET suctioning **only if airway is obstructed** (visible thick meconium blocking airway)\n\n**Meconium aspirator** is no longer routinely recommended — it delays time to PPV without proven benefit. [1][6]\n\n**Key teaching point:** "Primary apnea responds to stimulation. **Secondary apnea does NOT** — it requires PPV." [2]',
    citation: [1, 2, 6],
    next: 'nrp-golden30-eval',
  },

  {
    id: 'nrp-golden30-eval',
    type: 'question',
    module: 2,
    title: '30-Second Reassessment',
    body: '30-SECOND REASSESSMENT [1][2]\n\nAfter initial steps, evaluate:\n• **Breathing** — spontaneous, regular respirations?\n• **Heart rate** — auscultate or palpate umbilical stump (6 sec × 10)\n• **Tone** — flexed and active?\n• **Color** — improving?',
    citation: [1, 2],
    options: [
      {
        label: 'Breathing, HR ≥100',
        description: 'Responsive to initial steps → post-resuscitation care',
        next: 'nrp-postresus',
      },
      {
        label: 'Labored breathing or persistent cyanosis',
        description: 'Supplemental O2, CPAP, continued monitoring',
        next: 'nrp-breathing-support',
        urgency: 'urgent',
      },
      {
        label: 'Apnea/gasping OR HR <100',
        description: 'Secondary apnea — requires PPV immediately',
        next: 'nrp-ppv',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'nrp-breathing-support',
    type: 'info',
    module: 2,
    title: 'Breathing Support',
    body: 'SUPPLEMENTAL O2 / CPAP [1][2]\n\n**Pulse oximetry** — apply to **right hand/wrist** (preductal)\n• Do NOT use left hand or feet (postductal — lower readings are normal)\n\n**SpO2 targets by minute of life:** [1]\n• 1 min: 60–65%\n• 2 min: 65–70%\n• 3 min: 70–75%\n• 4 min: 75–80%\n• 5 min: 80–85%\n• 10 min: 85–95%\n\n**Labored breathing with adequate HR:**\n• Start **CPAP 5–6 cmH2O** via mask\n• Supplement O2 to meet SpO2 targets\n• Avoid hyperoxia — titrate FiO2 down as saturations improve\n\n**If worsening or HR drops <100 → proceed to PPV**\n\nContinue monitoring. Most babies with labored breathing improve with CPAP alone.',
    citation: [1, 2],
    next: 'nrp-postresus',
  },

  // =====================================================================
  // MODULE 3: POSITIVE PRESSURE VENTILATION
  // =====================================================================

  {
    id: 'nrp-ppv',
    type: 'info',
    module: 3,
    title: 'Positive Pressure Ventilation (PPV)',
    body: 'PPV — The Most Important Intervention in NRP [1][2][3]\n\n**T-piece resuscitator preferred** (2025) — provides consistent PIP and PEEP. Self-inflating bag acceptable if T-piece unavailable. [1]\n\n**TECHNIQUE:**\n• **C-E grip** — C fingers seal mask, E fingers lift jaw\n• **Mask seal** — covers mouth and nose, not eyes\n• **Sniffing position** — slight neck extension\n• **PIP** 20–25 cmH2O (avoid barotrauma)\n• **Rate** 40–60/min ("squeeze—release—release")\n• **FiO2** start at 21% for ≥35 weeks; 21–30% for <35 weeks\n• **Confirm chest rise** and bilateral breath sounds\n\n**SpO2 TARGETS by minute:** [1]\n• 1 min: 60–65% → 2 min: 65–70% → 3 min: 70–75%\n• 4 min: 75–80% → 5 min: 80–85% → 10 min: 85–95%\n• Monitor on right hand/wrist (preductal)\n• **Avoid hyperoxia** — titrate FiO2 to targets\n\n**Ventilation is the single most important intervention.** Most neonatal bradycardia is caused by inadequate ventilation. [2]',
    citation: [1, 2, 3],
    next: 'nrp-spo2-targets',
  },

  {
    id: 'nrp-spo2-targets',
    type: 'info',
    module: 3,
    title: 'SpO2 Targets & Monitoring',
    body: 'PREDUCTAL SpO2 TARGETS [1][2]\n\nMonitor on **right hand/wrist** (preductal — above the ductus arteriosus).\n\n**Target SpO2 by minute of life:**\n• 1 min: 60–65%\n• 2 min: 65–70%\n• 3 min: 70–75%\n• 4 min: 75–80%\n• 5 min: 80–85%\n• 10 min: 85–95%\n\n**Why preductal?** The right hand receives blood from the aorta BEFORE the ductus arteriosus. Left hand and feet receive mixed blood — lower SpO2 is expected and doesn\'t indicate poor oxygenation.\n\n**Titrate FiO2:**\n• Below target → increase FiO2 by 10–20%\n• Above target → decrease FiO2 by 10–20%\n• **Avoid hyperoxia** — especially in premature infants (retinopathy risk)\n\n**Cardiac monitor** (3-lead ECG) provides the most accurate HR — more reliable than pulse oximetry waveform during resuscitation. [1]',
    citation: [1, 2],
    next: 'nrp-ppv-eval',
  },

  {
    id: 'nrp-ppv-eval',
    type: 'question',
    module: 3,
    title: 'PPV Reassessment',
    body: 'PPV REASSESSMENT — after 30 seconds of effective PPV [1][2]\n\n**Check heart rate:**\n• Auscultate, palpate umbilical stump, or cardiac monitor\n• 6-second count × 10 for quick assessment',
    citation: [1, 2],
    options: [
      {
        label: 'HR ≥100 — improving',
        description: 'PPV effective → transition to post-resuscitation care',
        next: 'nrp-postresus',
      },
      {
        label: 'HR <100, not improving',
        description: 'Ventilation may be ineffective → corrective steps',
        next: 'nrp-corrective',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'nrp-corrective',
    type: 'info',
    module: 3,
    title: 'Corrective Steps — MR SOPA',
    body: 'MR SOPA — Corrective Steps for Ineffective Ventilation [1][2]\n\nIf HR is not improving with PPV, systematically troubleshoot:\n\n**M — Mask adjust**\n• Reapply mask — ensure tight seal, no air leak\n• Reposition C-E grip\n\n**R — Reposition**\n• Sniffing position — slight neck extension\n• Shoulder roll for alignment\n\n**S — Suction**\n• Suction mouth then nose\n• Clear any secretions obstructing airway\n\n**O — Open mouth**\n• Open baby\'s mouth slightly\n• Jaw thrust if needed\n\n**P — Pressure increase**\n• Increase PIP by 5 cmH2O increments\n• Up to 30–40 cmH2O if needed for chest rise\n\n**A — Alternative airway**\n• Consider ETT intubation or LMA (supraglottic airway)\n• LMA may be used for ≥34 weeks, >2 kg (2025 update) [1]\n\nIf still no improvement after corrective steps → proceed to advanced airway.',
    citation: [1, 2],
    next: 'nrp-advanced-airway',
  },

  {
    id: 'nrp-advanced-airway',
    type: 'info',
    module: 3,
    title: 'Advanced Airway',
    body: 'ADVANCED AIRWAY — ETT or LMA [1][2]\n\n**ETT Intubation:**\n• Use **cardiac monitor** to confirm HR before and after\n• **Attempt limit:** 30 seconds per attempt — ventilate between attempts\n• Confirm placement: chest rise, bilateral breath sounds, CO2 detector\n• Secure tube — neonatal ETTs are extremely easy to dislodge\n\n**LMA / Supraglottic Airway (2025 update):**\n• May use as **initial interface** for ≥34 weeks, >2 kg [1]\n• Faster to place than ETT\n• Cannot suction through LMA — switch to ETT if tracheal suctioning needed\n\n**When to intubate:**\n• Failed PPV despite corrective steps\n• Need for chest compressions (intubation required before CPR)\n• Prolonged PPV anticipated\n• Tracheal suctioning for airway obstruction\n• Special circumstances: CDH (congenital diaphragmatic hernia)\n\nSee ETT sizing reference →',
    citation: [1, 2],
    next: 'nrp-ett-sizing',
  },

  {
    id: 'nrp-ett-sizing',
    type: 'info',
    module: 3,
    title: 'ETT & Equipment Sizing',
    body: 'NEONATAL ETT SIZING [1][2]\n\n**ETT size = Gestational Age (weeks) / 10**\n\n**Sizing table:**\n• 23–24 weeks → ETT **2.5**\n• 25–28 weeks → ETT **3.0**\n• 29–34 weeks → ETT **3.5**\n• ≥35 weeks → ETT **3.5–4.0**\n\n**Laryngoscope blade:**\n• **Miller 0** — most neonates\n• **Miller 00** — extreme preterm (<28 weeks)\n\n**ETT depth at lip:**\n• **6 + weight (kg) = cm at lip**\n• Example: 3 kg baby → 6 + 3 = 9 cm at lip\n\n**Securing tips:**\n• Hold tube to roof of mouth during securing\n• Neonatal ETTs are **extremely easy to dislodge** — secure firmly\n• Confirm with CO2 detector + bilateral breath sounds\n• Recheck position after every patient movement',
    citation: [1, 2],
    images: [
      {
        src: 'images/neonatal-resus/neonatal-numbers.png',
        alt: 'Quick reference table comparing neonatal equipment sizes and medication doses for term versus preterm newborns',
        caption: 'Neonatal Numbers: Term vs Pre-Term equipment sizing and medication dosing.',
      },
    ],
    next: 'nrp-hr60-check',
  },

  {
    id: 'nrp-hr60-check',
    type: 'question',
    module: 3,
    title: 'HR <60 After Effective Ventilation?',
    body: 'CRITICAL DECISION POINT [1][2]\n\nAfter ensuring effective ventilation (confirmed chest rise, corrective steps applied):\n\n**Is the heart rate still <60 bpm?**\n\nHR <60 despite effective PPV indicates the need for chest compressions.',
    citation: [1, 2],
    options: [
      {
        label: 'Yes — HR <60 despite effective ventilation',
        description: 'Initiate chest compressions',
        next: 'nrp-cpr',
        urgency: 'critical',
      },
      {
        label: 'No — HR ≥60 and improving',
        description: 'Continue PPV → post-resuscitation care',
        next: 'nrp-postresus',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: CHEST COMPRESSIONS
  // =====================================================================

  {
    id: 'nrp-cpr',
    type: 'info',
    module: 4,
    title: 'Chest Compressions',
    body: 'NEONATAL CPR [1][2][3]\n\n**MUST secure airway first** — intubate or place LMA before starting compressions.\n\n**Technique — 2-thumb encircling:**\n• Both thumbs on **lower third of sternum**, just below the nipple line\n• Wrap fingers around the chest\n• Compress **1/3 of anteroposterior diameter**\n\n**Compression-to-ventilation ratio: 3:1**\n• "One—two—three—breathe" (120 events/min = 90 compressions + 30 breaths)\n• This is DIFFERENT from pediatric/adult CPR (15:2 or 30:2)\n\n**During CPR:**\n• Increase to **100% FiO2**\n• Establish vascular access: **UVC preferred** (fastest), IO as alternative\n• Prepare epinephrine\n\n**Goal: HR >60 bpm**\n• Reassess every 60 seconds\n• Once HR >60 → stop compressions, continue PPV\n• If HR remains <60 after 60 seconds of CPR → epinephrine [1][2]',
    citation: [1, 2, 3],
    next: 'nrp-cpr-eval',
  },

  {
    id: 'nrp-cpr-eval',
    type: 'question',
    module: 4,
    title: 'HR After 60 Seconds of CPR',
    body: 'CPR REASSESSMENT — after 60 seconds [1][2]\n\nPause compressions briefly to assess heart rate.\n\n**Is HR ≥60 bpm?**',
    citation: [1, 2],
    options: [
      {
        label: 'HR ≥60 — improving',
        description: 'Stop compressions, continue PPV → post-resuscitation care',
        next: 'nrp-postresus',
      },
      {
        label: 'HR still <60',
        description: 'Administer epinephrine',
        next: 'nrp-epinephrine',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 5: MEDICATIONS & VASCULAR ACCESS
  // =====================================================================

  {
    id: 'nrp-epinephrine',
    type: 'info',
    module: 5,
    title: 'Epinephrine',
    body: 'EPINEPHRINE — Neonatal Resuscitation [1][2][3]\n\n[Epinephrine](#/drug/epinephrine/neonatal resuscitation)\n\n**IV/IO (preferred):**\n• **0.01–0.03 mg/kg** of 1:10,000 (= 0.1–0.3 mL/kg)\n• Repeat every **3–5 minutes** as needed\n\n**ET (if no IV/IO access):**\n• **0.05–0.1 mg/kg** of 1:10,000 (= 0.5–1 mL/kg)\n• Higher dose needed via ET — absorption is unpredictable\n• Switch to IV/IO route as soon as access established\n\n**IV/IO is ALWAYS preferred over ET.** Establish UVC access as quickly as possible.\n\n**Preparation:**\n• Use **1:10,000 concentration** (0.1 mg/mL)\n• Pre-draw doses in labeled syringes\n• Flush with 1–3 mL NS after IV administration\n\n**Continue CPR between doses.** Do not stop compressions to give epinephrine. [1][2]',
    citation: [1, 2, 3],
    next: 'nrp-uvc',
  },

  {
    id: 'nrp-uvc',
    type: 'info',
    module: 5,
    title: 'Umbilical Venous Catheter (UVC)',
    body: 'UVC PROCEDURE [1][2]\n\n**Umbilical cord anatomy:**\n• **2 arteries** — thick-walled, small lumen (at top of cross-section)\n• **1 vein** — thin-walled, large lumen (at bottom of cross-section)\n• **Catheterize the VEIN** — larger, easier to cannulate\n\n**Catheter size:**\n• **5 French** — term\n• **3.5 French** — preterm\n\n**Procedure:**\n1. Tie **umbilical tape** at base of stump — gentle tie to control bleeding\n2. Cut cord 1–2 cm above skin\n3. Identify the single large-lumen vein\n4. **Prime catheter** with NS\n5. Insert gently — **only 2–4 cm** until blood aspirates freely\n6. Do NOT advance further — risk of hepatic injury\n\n**IO access** is an acceptable alternative if UVC cannot be placed quickly.\n\n**Once access is established:** give IV epinephrine (preferred over ET route). [1][2]',
    citation: [1, 2],
    images: [
      {
        src: 'images/neonatal-resus/uvc-anatomy.png',
        alt: 'Umbilical cord cross-section showing 2 arteries and 1 vein, with side view of UVC insertion through umbilical stump — insert only 2 cm deep',
        caption: 'UVC anatomy: 2 arteries (thick, small) + 1 vein (thin, large). Insert catheter only 2 cm deep.',
      },
    ],
    next: 'nrp-persistent',
  },

  {
    id: 'nrp-persistent',
    type: 'question',
    module: 5,
    title: 'Persistent Bradycardia',
    body: 'PERSISTENT HR <60 AFTER EPINEPHRINE [1][2]\n\nIf the heart rate remains <60 after epinephrine and ongoing CPR, consider reversible causes:\n\n• **Hypovolemia** — maternal hemorrhage, placental abruption, cord avulsion\n• **Pneumothorax** — especially after vigorous PPV\n• **Equipment failure** — ETT displacement, monitor malfunction\n• **Prolonged resuscitation** — >20 minutes without response',
    citation: [1, 2],
    options: [
      {
        label: 'Suspect hypovolemia',
        description: 'Volume resuscitation with NS or pRBCs',
        next: 'nrp-volume',
        urgency: 'critical',
      },
      {
        label: 'Suspect pneumothorax',
        description: 'Assess with POCUS → needle decompression',
        next: 'nrp-volume',
        urgency: 'critical',
      },
      {
        label: 'No response after 20 minutes',
        description: 'Consider discontinuation of resuscitation',
        next: 'nrp-discontinuation',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'nrp-volume',
    type: 'info',
    module: 5,
    title: 'Volume Resuscitation',
    body: 'VOLUME & GLUCOSE RESUSCITATION [1][2]\n\n**Hypovolemia — clinical signs:**\n• Pallor despite adequate oxygenation\n• Weak pulses\n• Poor response to resuscitation\n• Known maternal hemorrhage or placental abruption\n\n**Normal saline:**\n• **10 mL/kg** IV/IO — infuse over 5–10 minutes\n• May repeat if needed\n\n**O-negative pRBCs:**\n• **10 mL/kg** — for acute blood loss (abruption, cord avulsion)\n• Uncrossmatched O-negative\n\n**D10W (10% Dextrose):**\n• **2 mL/kg** IV — for hypoglycemia (glucose <40 mg/dL)\n• Neonates have limited glycogen stores — check glucose early\n\n**Naloxone:**\n• **No longer routinely recommended** in neonatal resuscitation\n• PPV is the treatment for respiratory depression, regardless of cause [1]\n\nReassess after volume — if HR improving → continue PPV → post-resuscitation care.',
    citation: [1, 2],
    next: 'nrp-postresus',
  },

  {
    id: 'nrp-discontinuation',
    type: 'result',
    module: 5,
    title: 'Discontinuation of Resuscitation',
    body: 'WHEN TO CONSIDER STOPPING [1][4]\n\n**No detectable heart rate after 20 minutes of comprehensive resuscitation** (effective ventilation, chest compressions, epinephrine, volume) may be an appropriate time to discuss discontinuation.\n\n**Factors to consider:**\n• Gestational age and estimated viability\n• Duration of no detectable HR\n• Presence of any reversible causes\n• Parental wishes (if known)\n• Local institutional guidelines\n\n**Team and family discussion:**\n• Involve the family if possible\n• Communicate clearly and compassionately\n• Support the team — neonatal resuscitation discontinuation is emotionally difficult\n\n**Document everything:**\n• Time of birth, APGAR scores\n• All interventions and timing\n• Time of decision to discontinue\n• Who was present and involved in decision',
    recommendation: 'After 20 minutes of comprehensive resuscitation without detectable HR, discuss discontinuation with the team and family. Document all interventions, timing, and personnel.',
    confidence: 'consider',
    citation: [1, 4],
  },

  // =====================================================================
  // MODULE 6: POST-RESUSCITATION
  // =====================================================================

  {
    id: 'nrp-postresus',
    type: 'result',
    module: 6,
    title: 'Post-Resuscitation Care',
    body: 'POST-RESUSCITATION MONITORING [1][2]\n\n**APGAR scoring:**\n• Assess at **1, 5, and 10 minutes** after birth\n• Appearance, Pulse, Grimace, Activity, Respiration\n\n**Normothermia:**\n• Target **36.5–37.5°C** — monitor continuously\n• Both hypothermia AND hyperthermia worsen outcomes\n• **Therapeutic hypothermia** criteria: ≥36 weeks, moderate-severe HIE, initiated within 6 hours under NICU conditions — NOT during active resuscitation [1]\n\n**Glucose monitoring:**\n• Check within 30–60 minutes of stabilization\n• Treat if <40 mg/dL: D10W 2 mL/kg IV\n\n**NICU transfer:**\n• Any neonate requiring PPV or more should be evaluated by NICU\n• Communicate resuscitation details during handoff\n• Document: all interventions, timing, cord clamping time, APGARs\n\n**Family communication:**\n• Update parents on baby\'s condition and plan\n• Allow skin-to-skin when stable\n\n**Team debrief:**\n• Review what went well and what could improve\n• Address emotional impact on team members [1][2]',
    recommendation: 'Post-resuscitation: APGAR at 1/5/10 min, maintain normothermia (36.5-37.5°C), check glucose, NICU transfer for any neonate requiring PPV or more. Therapeutic hypothermia eligibility: ≥36 wk, mod-severe HIE, within 6 hours. Team debrief.',
    confidence: 'definitive',
    citation: [1, 2],
  },

];

export const NEONATAL_RESUS_NODE_COUNT = NEONATAL_RESUS_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const NEONATAL_RESUS_MODULE_LABELS = [
  'Preparation & Initial Assessment',
  'Initial Steps — Golden 30 Seconds',
  'Positive Pressure Ventilation',
  'Chest Compressions',
  'Medications & Vascular Access',
  'Post-Resuscitation',
];

// -------------------------------------------------------------------
// Evidence Citations (8 references)
// -------------------------------------------------------------------

export const NEONATAL_RESUS_CITATIONS: Citation[] = [
  { num: 1, text: 'AHA/AAP. 2025 Guidelines for Neonatal Resuscitation. Circulation. 2025;152(Suppl 1):S399-S445.' },
  { num: 2, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. AAP; 2021.' },
  { num: 3, text: 'Aziz K, Lee HC, Escobedo MB, et al. Part 5: Neonatal Resuscitation. Circulation. 2020;142(16 suppl 2):S524-S550.' },
  { num: 4, text: 'Wyckoff MH, et al. Neonatal Life Support: 2020 ILCOR Consensus. Circulation. 2020;142(16 suppl 1):S185-S221.' },
  { num: 5, text: 'ACOG Committee Opinion No. 684: Delayed Umbilical Cord Clamping. Obstet Gynecol. 2017;129(1):e5-e10.' },
  { num: 6, text: 'Perlman JM, et al. Part 7: Neonatal Resuscitation. 2015 ILCOR Consensus. Circulation. 2015;132(16 suppl 1):S204-S241.' },
  { num: 7, text: 'Kattwinkel J, et al. Part 15: Neonatal Resuscitation. Circulation. 2010;122(18 suppl 3):S909-S919.' },
  { num: 8, text: 'McFarlin A. ED Management of Precipitous Delivery and Neonatal Resuscitation. Emerg Med Rep. 2019;40(11).' },
];

// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------

export const NEONATAL_RESUS_CLINICAL_NOTES: string[] = [
  '90% of newborns need no resuscitation. 10% need early support. <1% need extensive resuscitation (CPR + medications).',
  'Ventilation is the single most important intervention in neonatal resuscitation. Most bradycardia in newborns is caused by inadequate ventilation.',
  'Primary apnea responds to stimulation. Secondary apnea does NOT respond — requires PPV.',
  'T-piece resuscitators are preferred over self-inflating bags (2025). Supraglottic airway (LMA) may be used for ≥34 weeks as an initial interface.',
  'Both hypothermia AND hyperthermia worsen outcomes. Target normothermia (36.5-37.5°C). Therapeutic hypothermia should begin under NICU conditions, not during resuscitation.',
  'Meconium aspirator is no longer routinely recommended — delays time to PPV. Only intubate/suction if airway is obstructed.',
];
