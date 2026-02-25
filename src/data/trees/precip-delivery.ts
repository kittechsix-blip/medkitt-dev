// MedKitt — Precipitous Delivery
// Stepwise walkthrough of assessing active labor and delivering a baby in the ED.
// 5 modules: Initial Assessment → Preparation → Stage 1 (Labor) → Stage 2 (Delivery) → Stage 3 (Placenta & Postpartum)
// 20 nodes total.
// Source: Pope & Tibbles (ACEP 2012), VanRooyen & Scott (Tintinalli's 7e), McFarlin (EMR 2019), NRP 8e (AAP 2021)

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PRECIP_DELIVERY_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'precip-start',
    type: 'info',
    module: 1,
    title: 'Precipitous Delivery',
    body: '[Delivery Steps Summary](#/info/precip-delivery-summary) — quick-reference checklist to review immediately before delivery.\n\n**Precipitous delivery** occurs when labor and delivery happen rapidly — often before planned arrival at a delivery unit. ~3% of all US deliveries. [4]\n\n**Page OB and Pediatrics immediately.** Do not delay — even if delivery seems far off.\n\nThis consult provides a stepwise approach to assessing and managing an ED precipitous delivery:\n\n• Module 1: Initial Assessment — history, exam, and decision to deliver\n• Module 2: Preparation — team, equipment, positioning\n• Module 3: Stage 1 — Labor coaching and crowning\n• Module 4: Stage 2 — Head delivery, nuchal cord, shoulders, cord clamping, neonatal assessment\n• Module 5: Stage 3 — Placenta delivery, oxytocin, laceration assessment, postpartum monitoring',
    citation: [4],
    next: 'precip-history',
  },

  {
    id: 'precip-history',
    type: 'info',
    module: 1,
    title: 'Rapid OB History',
    body: 'OB HISTORY — RAPID ASSESSMENT\n• Gestational age / due date\n• Gravida / Para (G_P_)\n• Singleton vs multiples\n• Pregnancy complications (preeclampsia, GDM, placenta previa)\n• Contraction timing — onset, frequency, duration\n• Fluid leakage or bleeding (ROM, bloody show)\n\nSIGNS OF IMMINENT DELIVERY\n• **Crowning** — fetal head visible at introitus\n• **Perineal bulging** — stretching of perineum from descending head\n• **Irresistible urge to push** — involuntary bearing down\n• **Bloody show** — mucous plug passage\n• **Rupture of membranes** — gush of clear/blood-tinged fluid\n• **Anal sphincter relaxation** — suggests very low station\n\n**"Never trust a multip."** Multiparous patients can progress from 4 cm to delivery in minutes. [1][2][6]',
    citation: [1, 2, 6],
    next: 'precip-exam',
  },

  {
    id: 'precip-exam',
    type: 'info',
    module: 1,
    title: 'Cervical Exam',
    body: 'CERVICAL EXAM\n\n**Effacement** — thinning of the cervix, measured 0–100%. At 100% effacement the cervix is paper-thin.\n\n**Dilation** — opening of the cervical os, measured 0–10 cm. At 10 cm the cervix is fully dilated and ready for delivery.\n\n**Station** — position of the fetal presenting part relative to the ischial spines:\n• **-5 to -1** — presenting part is above the ischial spines (floating to engaged)\n• **0** — presenting part is at the level of the ischial spines (engaged)\n• **+1 to +5** — presenting part is below the ischial spines (descending to crowning)\n\nStation +3 to +5 with full dilation = imminent delivery. [1][2]',
    citation: [1, 2],
    images: [
      {
        src: 'images/precip-delivery/station.png',
        alt: 'Diagram showing fetal station measurement relative to ischial spines, ranging from -5 (floating) to +5 (crowning)',
        caption: 'Fetal station: measured relative to the ischial spines. 0 = engaged, +5 = crowning.',
      },
      {
        src: 'images/precip-delivery/effacement-dilation.png',
        alt: 'Illustration showing cervical effacement from 0% to 100% and dilation from 0 to 10 cm',
        caption: 'Cervical effacement (thinning) and dilation (opening). Fully dilated = 10 cm.',
      },
    ],
    next: 'precip-imminent',
  },

  {
    id: 'precip-imminent',
    type: 'question',
    module: 1,
    title: 'Is Delivery Imminent?',
    body: 'Is delivery imminent?\n\nDelivery is imminent if:\n• Crowning or fully dilated (10 cm)\n• Active pushing with visible presenting part\n• No time for safe transfer\n\nIf the patient can be safely transferred to L&D or a facility with OB capabilities, transfer is preferred. [7]',
    citation: [7],
    options: [
      {
        label: 'Yes — crowning or fully dilated',
        description: 'Prepare for ED delivery',
        next: 'precip-callhelp',
        urgency: 'critical',
      },
      {
        label: 'No — can safely transfer',
        description: 'Initiate EMTALA-compliant transfer',
        next: 'precip-transfer',
      },
    ],
  },

  {
    id: 'precip-transfer',
    type: 'result',
    module: 1,
    title: 'Transfer to OB Facility',
    body: 'EMTALA CONSIDERATIONS\n\n**Active labor is an emergency medical condition under EMTALA.** [7]\n\nA woman in active labor must be stabilized before transfer. If delivery is imminent, the hospital must deliver the baby regardless of OB availability.\n\nTRANSFER GUIDELINES\n• Ensure receiving facility has OB capabilities and has accepted the patient\n• **Antenatal transfer is always preferred over neonatal transfer** — a pregnant patient in a vehicle is safer than a newborn in an ambulance [3]\n• Document medical necessity for transfer\n• Send all records and lab results with the patient\n• Continuous fetal monitoring during transport if available',
    recommendation: 'Transfer to facility with OB capabilities. Antenatal transfer preferred over neonatal transfer. Ensure EMTALA compliance — active labor is an emergency medical condition.',
    confidence: 'recommended',
    citation: [3, 7],
  },

  // =====================================================================
  // MODULE 2: PREPARATION
  // =====================================================================

  {
    id: 'precip-callhelp',
    type: 'info',
    module: 2,
    title: 'Call for Help',
    body: 'CALL FOR HELP\n\n**Page OB and Pediatrics STAT** — even if you\'ve already called, confirm they are en route.\n\nTEAM ASSIGNMENTS\nMinimum 4 people:\n• **You** — delivering provider (at the perineum)\n• **Nurse 1** — assigned to mom (vitals, meds, documentation)\n• **Nurse 2** — assigned to baby (warming, stimulation, APGAR)\n• **Provider 2** — assigned to baby ([Neonatal Resuscitation](#/tree/neonatal-resus) if needed)\n\nEQUIPMENT — NEONATAL\n• Neonatal warmer — **turn on now** (prewarming)\n• [Neonatal Resuscitation](#/tree/neonatal-resus) equipment (bag-valve-mask, suction, O2)\n• Pulse oximetry for newborn\n\nIf you are alone, prepare what you can and call for backup. [1][3]',
    citation: [1, 3],
    next: 'precip-equipment',
  },

  {
    id: 'precip-equipment',
    type: 'info',
    module: 2,
    title: 'Equipment & Positioning',
    body: 'DELIVERY EQUIPMENT\n• Sterile gloves (two pairs)\n• Sterile scissors or scalpel (for cord cutting)\n• Umbilical cord clamps x2 (Kelly clamps work if cord clamps unavailable)\n• Bulb suction\n• Clean towels and warm blankets for baby\n• Chux pads / absorbent pads under the patient\n\nCONFIRM VERTEX PRESENTATION\nIf time permits, perform a **bedside ultrasound** to confirm vertex (head-down) presentation.\n**If NOT vertex → see Breech Delivery consult** (future)\n\nPERINEAL PREPARATION\n• Clean the perineum with antiseptic if time permits\n• Drape the patient\n• Position in dorsal lithotomy (feet in stirrups if available, or knees bent and supported) [1][2]',
    citation: [1, 2],
    next: 'precip-ready',
  },

  {
    id: 'precip-ready',
    type: 'info',
    module: 2,
    title: 'Ready to Deliver',
    body: 'PRE-DELIVERY CHECKLIST\n\n✓ OB and Peds paged\n✓ Team assigned (mom nurse, baby nurse, baby provider)\n✓ Neonatal warmer ON and prewarming\n✓ Delivery equipment at bedside\n✓ Patient positioned and draped\n✓ Vertex presentation confirmed (if time for U/S)\n\nYou are ready to deliver. The next modules walk through each stage of labor and delivery step by step. [1][2][3]',
    citation: [1, 2, 3],
    next: 'precip-stage1',
  },

  // =====================================================================
  // MODULE 3: STAGE 1 — LABOR
  // =====================================================================

  {
    id: 'precip-stage1',
    type: 'info',
    module: 3,
    title: 'Three Stages of Labor',
    body: 'THREE STAGES OF LABOR\n\n**Stage 1 — Cervical Dilation**\n• Latent phase: irregular contractions, 0–5 cm dilation\n• Active phase: strong regular contractions, nulliparous ~1.2 cm/hr, multiparous ~1.5 cm/hr\n• Transition: 8–10 cm, intense contractions, nausea/shaking common\n\n**Stage 2 — Delivery of the Baby**\nFrom full dilation to delivery. Active pushing: 1–2 hours (nulliparous), often shorter for multiparous.\n\n**Stage 3 — Delivery of the Placenta**\nFrom baby delivery to placenta delivery. Usually 5–15 minutes. Up to 30 minutes is normal.\n\n**"Never trust a multip."** Multiparous patients can progress through all stages much faster than expected. [1][2][6]',
    citation: [1, 2, 6],
    images: [
      {
        src: 'images/precip-delivery/stages-of-labor.png',
        alt: 'Diagram showing the three stages of labor with cervical dilation, delivery, and placenta phases',
        caption: 'The three stages of labor: dilation → delivery → placenta.',
      },
    ],
    next: 'precip-coaching',
  },

  {
    id: 'precip-coaching',
    type: 'info',
    module: 3,
    title: 'Coaching the Patient',
    body: 'COACHING THE PATIENT\n\n**During contractions:**\n• Take a deep breath at the start of each contraction\n• Bear down and push for **10 seconds x 3** per contraction\n• Rest between contractions — use this time for encouragement\n\n**When the head is crowning:**\n• Tell the patient to **STOP pushing**\n• Breathe through contractions — pant or blow\n• This allows controlled, slow delivery of the head and reduces perineal tearing\n\n**Reassure throughout.** Many patients having precipitous deliveries in the ED are terrified. Calm, clear communication makes a difference.\n\nYou are their doctor. They need to hear: "You\'re doing great. We\'re going to deliver this baby safely." [1][3][6]',
    citation: [1, 3, 6],
    next: 'precip-head',
  },

  // =====================================================================
  // MODULE 4: STAGE 2 — DELIVERY
  // =====================================================================

  {
    id: 'precip-head',
    type: 'info',
    module: 4,
    title: 'Delivering the Head',
    body: 'DELIVERING THE HEAD\n\n**Perineal support technique:**\n• Place one hand on the perineum with a towel — apply gentle **upward pressure** on the fetal chin through the perineum\n• Other hand on the fetal occiput — apply gentle **counter-pressure** to control the speed of delivery\n• Goal: **slow, controlled delivery** of the head to minimize perineal tearing\n\n**Key points:**\n• Let the uterus do the work — do NOT pull on the head\n• Between contractions, maintain gentle pressure to prevent rapid expulsion\n• The head will naturally extend as it delivers over the perineum\n\n**Routine suctioning of the nose and mouth is NO LONGER recommended** (NRP 8th edition). Only suction if the airway is visibly obstructed. [5]\n\nOnce the head is delivered, proceed immediately to check for nuchal cord. [1][2]',
    citation: [1, 2, 5],
    images: [
      {
        src: 'images/precip-delivery/perineum-support.png',
        alt: 'Illustration showing proper hand placement for perineal support during fetal head delivery',
        caption: 'Perineal support: one hand on perineum (upward pressure on chin), other hand on occiput (counter-pressure for controlled delivery).',
      },
    ],
    next: 'precip-nuchal',
  },

  {
    id: 'precip-nuchal',
    type: 'question',
    module: 4,
    title: 'Nuchal Cord Check',
    body: 'NUCHAL CORD CHECK\n\nImmediately after the head delivers, **sweep your finger around the baby\'s neck** feeling for the umbilical cord.\n\nNuchal cord occurs in 20–30% of deliveries and is usually manageable. [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'No nuchal cord',
        description: 'Proceed to shoulder delivery',
        next: 'precip-shoulders',
      },
      {
        label: 'Cord present — can slip over head',
        description: 'Reduce cord over head, then deliver',
        next: 'precip-shoulders',
      },
      {
        label: 'Cord too tight to reduce',
        description: 'Must clamp and cut before delivery',
        next: 'precip-nuchal-cut',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'precip-nuchal-cut',
    type: 'info',
    module: 4,
    title: 'Tight Nuchal Cord — Clamp and Cut',
    body: 'TIGHT NUCHAL CORD — CLAMP AND CUT\n\nIf the cord is too tight to slip over the baby\'s head:\n\n1. Apply **two clamps** on the cord close together\n2. **Cut between** the clamps with sterile scissors\n3. Unwrap the cord from the neck\n4. **Deliver the baby promptly** — the cord is now cut and the baby has no placental circulation\n\nThis is time-sensitive. Once the cord is cut, the baby must be delivered and assessed quickly. [1][2]',
    citation: [1, 2],
    next: 'precip-shoulders',
  },

  {
    id: 'precip-shoulders',
    type: 'info',
    module: 4,
    title: 'Shoulder Delivery',
    body: 'SHOULDER DELIVERY\n\n**Anterior shoulder (top):**\n• Apply gentle **DOWNWARD traction** on the head (toward the floor)\n• Guide the anterior shoulder under the pubic symphysis\n• The shoulder should slip out — do NOT force\n\n**Posterior shoulder (bottom):**\n• Then apply gentle **UPWARD traction** (toward the ceiling)\n• Deliver the posterior shoulder\n\n**CRITICAL SAFETY POINTS:**\n• Apply traction in the **long axis of the fetal neck** — pulling at an angle risks brachial plexus injury\n• Use steady, gentle traction — never jerk or twist\n• The body will follow the shoulders\n\n**If the head delivers but retracts against the perineum ("turtle sign") → [Shoulder Dystocia](#/tree/shoulder-dystocia).** This is an obstetric emergency requiring specific maneuvers (McRoberts, suprapubic pressure). **See [Shoulder Dystocia](#/tree/shoulder-dystocia) consult.** [1][2][3]',
    citation: [1, 2, 3],
    images: [
      {
        src: 'images/precip-delivery/shoulder-delivery.png',
        alt: 'Illustration showing downward and upward traction technique for delivering anterior and posterior fetal shoulders',
        caption: 'Shoulder delivery: gentle downward traction for anterior shoulder, then upward traction for posterior shoulder. Always along the long axis of the neck.',
      },
    ],
    next: 'precip-cord',
  },

  {
    id: 'precip-cord',
    type: 'info',
    module: 4,
    title: 'Cord Clamping & Cutting',
    body: 'CORD CLAMPING AND CUTTING\n\n**DO NOT DROP THE BABY.** The baby is wet and slippery.\n\n1. Place the baby directly on mom\'s abdomen — **skin-to-skin contact**\n2. Dry the baby vigorously with a warm towel\n3. Clamp the cord in **two places**, approximately **3 cm apart**, with the first clamp ~3 cm from the baby\'s abdomen\n4. **Cut between the two clamps** with sterile scissors\n\nDELAYED CORD CLAMPING\nCurrent NRP guidelines recommend delayed cord clamping (30–60 seconds) in vigorous term newborns. If the baby requires resuscitation, clamp and cut immediately. [5]\n\nNON-STERILE ENVIRONMENT\nIf delivery occurred without sterile instruments, clean the cord stump with antiseptic to prevent omphalitis (cord infection). [1][2]',
    citation: [1, 2, 5],
    images: [
      {
        src: 'images/precip-delivery/cord-clamping.png',
        alt: 'Illustration showing proper umbilical cord clamping technique with two clamps placed 3 cm apart',
        caption: 'Cord clamping: two clamps ~3 cm apart, cut between them. First clamp ~3 cm from the baby\'s abdomen.',
      },
    ],
    next: 'precip-baby',
  },

  {
    id: 'precip-baby',
    type: 'info',
    module: 4,
    title: 'Neonatal Assessment',
    body: 'IMMEDIATE NEONATAL ASSESSMENT\n\n**Dry and stimulate** the baby with warm towels. Most babies will cry and become pink within the first minute.\n\nAPGAR SCORING\nAssess at **1 minute and 5 minutes** after delivery:\n• Appearance (color)\n• Pulse (heart rate)\n• Grimace (reflex irritability)\n• Activity (muscle tone)\n• Respiration (breathing effort)\n\nNEONATAL TRANSITION STATISTICS [5]\n• **~90%** of newborns transition without any intervention beyond warmth, drying, and stimulation\n• **~10%** will need additional support (positive pressure ventilation, supplemental O2)\n• **<1%** will need chest compressions\n\n**If the baby is not breathing or heart rate is <100 bpm → initiate NRP ([Neonatal Resuscitation](#/tree/neonatal-resus) Program).** [5]\n\nEnsure the baby stays warm — hypothermia is a significant risk in ED deliveries. [1][5]',
    citation: [1, 5],
    next: 'precip-placenta',
  },

  // =====================================================================
  // MODULE 5: STAGE 3 — PLACENTA & POSTPARTUM
  // =====================================================================

  {
    id: 'precip-placenta',
    type: 'info',
    module: 5,
    title: 'Placental Delivery',
    body: 'STAGE 3 — PLACENTAL DELIVERY\n\nThe placenta typically delivers **5–15 minutes** after the baby. Up to 30 minutes is normal.\n\nSIGNS OF PLACENTAL SEPARATION\n• **Cord lengthening** — the cord appears to get longer as the placenta detaches\n• **Gush of blood** — normal separation bleeding\n• **Uterine fundus rises** — becomes firm and globular\n\nDELIVERY TECHNIQUE\n• Apply **gentle, steady traction** on the cord with one hand\n• Other hand on the uterine fundus — **guard against uterine inversion** by applying counter-pressure\n• May ask the patient to push gently\n\n**NEVER force the placenta.** Aggressive traction risks uterine inversion — a life-threatening emergency. If the placenta does not deliver within 30 minutes, this is a **retained placenta** requiring manual removal by OB. [1][2][8]',
    citation: [1, 2, 8],
    next: 'precip-placenta-exam',
  },

  {
    id: 'precip-placenta-exam',
    type: 'info',
    module: 5,
    title: 'Placental Examination',
    body: 'PLACENTAL EXAMINATION\n\nAfter delivery, inspect the placenta carefully:\n\n**COMPLETENESS**\n• All cotyledons (lobes) present — the maternal surface should look like a complete jigsaw puzzle\n• Check edges for torn vessels (suggests retained succenturiate lobe)\n• **Retained placental fragments → postpartum hemorrhage risk** [8]\n\n**CORD VESSELS**\n• Normal: **2 arteries + 1 vein** (3-vessel cord)\n• Single umbilical artery (2-vessel cord) occurs in ~1% of births — associated with renal and cardiac anomalies\n• Normal cord length: 35–70 cm\n\n**SAVE THE PLACENTA** — OB and pathology will want to examine it. Place in a basin or bag. [1][2]',
    citation: [1, 2],
    next: 'precip-oxytocin',
  },

  {
    id: 'precip-oxytocin',
    type: 'info',
    module: 5,
    title: 'Oxytocin & Uterine Massage',
    body: 'OXYTOCIN — POSTPARTUM UTEROTONIC\n\n[Oxytocin](#/drug/oxytocin/precipitous delivery) 20 units in 1L NS (or LR) at 250 mL/hr.\n\n**Do NOT give IV push** — can cause profound hypotension. [8]\n\n**Timing:** Start after the placenta is delivered. Do not wait to assess bleeding — **empiric oxytocin decreases postpartum hemorrhage risk.** [8]\n\nBIMANUAL UTERINE MASSAGE\n• Place one hand on the uterine fundus abdominally\n• Massage firmly until the uterus contracts and feels firm ("boggy" uterus = atony = hemorrhage risk)\n• Continue massage intermittently until uterine tone is maintained\n\n**Uterine atony is the #1 cause of postpartum hemorrhage.** Oxytocin + massage addresses this directly. [8]',
    citation: [8],
    next: 'precip-lacerations',
  },

  {
    id: 'precip-lacerations',
    type: 'info',
    module: 5,
    title: 'Laceration Assessment',
    body: 'LACERATION ASSESSMENT\n\nExamine the vaginal canal and perineum for tears:\n\n**CLASSIFICATION**\n• 1st degree — perineal skin/vaginal mucosa only\n• 2nd degree — extends into perineal muscles\n• 3rd degree — involves the anal sphincter\n• 4th degree — extends through the rectal mucosa\n\n**MANAGEMENT**\n• If you are comfortable → repair 1st and 2nd degree tears in the ED\n• 3rd and 4th degree tears → **defer to OB** (specialist repair required)\n• If deferring any repair → **pack the vaginal canal** with gauze to tamponade bleeding\n\nMONITOR FOR POSTPARTUM HEMORRHAGE\n• **PPH = blood loss >1000 mL** or signs of hypovolemia [8]\n• Monitor for 1 hour after placental delivery\n• Assess uterine tone, vaginal bleeding, vital signs every 15 minutes\n\n**If significant hemorrhage → see Postpartum Hemorrhage consult** (future). [1][8]',
    citation: [1, 8],
    next: 'precip-complete',
  },

  {
    id: 'precip-complete',
    type: 'result',
    module: 5,
    title: 'Delivery Complete',
    body: 'Delivery complete.\n\n**Congratulate the mother.**\n\nPOSTDELIVERY CHECKLIST\n✓ Uterus firm (not boggy)\n✓ Bleeding controlled\n✓ Vaginal/perineal lacerations assessed and addressed\n✓ Baby assessed — APGAR at 1 and 5 minutes documented\n✓ Placenta examined and saved for pathology\n✓ Oxytocin infusing\n✓ Skin-to-skin contact maintained\n\nMONITORING\n• Monitor mom for **1 hour post-placenta delivery**: uterine tone, vaginal bleeding, vital signs q15 min\n• Monitor baby: temperature, respiratory status, feeding\n• Document all times: delivery, placenta, APGAR scores, medications\n\nDISPOSITION\n• Admit to OB service for postpartum care\n• Neonatal assessment by pediatrics\n• If delivered at facility without OB: arrange transfer to appropriate facility after stabilization [7]',
    recommendation: 'Delivery complete. Monitor mom x1 hour (uterine tone, bleeding, vitals q15 min). Monitor baby (temp, respiratory, feeding). Admit to OB service. APGAR and all times documented.',
    confidence: 'definitive',
    citation: [1, 2, 3, 5, 7, 8],
  },

];

export const PRECIP_DELIVERY_NODE_COUNT = PRECIP_DELIVERY_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const PRECIP_DELIVERY_MODULE_LABELS = [
  'Initial Assessment',
  'Preparation',
  'Stage 1 — Labor',
  'Stage 2 — Delivery',
  'Stage 3 — Placenta & Postpartum',
];

// -------------------------------------------------------------------
// Evidence Citations (8 references)
// -------------------------------------------------------------------

export const PRECIP_DELIVERY_CITATIONS: Citation[] = [
  { num: 1, text: 'Pope JV, Tibbles CD. The difficult emergency delivery. In: Winters ME, ed. Emergency Department Resuscitations of the Critically Ill. ACEP; 2012.' },
  { num: 2, text: 'VanRooyen MJ, Scott JA. Ch 105: Emergency Delivery. Tintinalli\'s Emergency Medicine. 7th ed. McGraw-Hill; 2011.' },
  { num: 3, text: 'McFarlin A. ED Management of Precipitous Delivery and Neonatal Resuscitation. Emergency Medicine Reports. 2019;40(11).' },
  { num: 4, text: 'Martin JA, et al. Births: Final Data for 2015. Natl Vital Stat Rep. 2017;66(1):1-70.' },
  { num: 5, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. AAP; 2021.' },
  { num: 6, text: 'Kerrigan K. Emergency Delivery: Are You Prepared? Baystate Medical Center. (Video lecture).' },
  { num: 7, text: '42 U.S.C. § 1395dd. EMTALA.' },
  { num: 8, text: 'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186.' },
];
