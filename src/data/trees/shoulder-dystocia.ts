// MedKitt — Shoulder Dystocia Management
// Linear protocol for recognition and stepwise resolution of shoulder dystocia.
// 5 modules: Recognition → Initial Response → First-Line (McRoberts + Suprapubic) → Second-Line (Rotational + Posterior Arm) → Last Resort
// 11 nodes total.
// Source: ACOG Practice Bulletin (2002/2015), Gherman et al. (1997/2000), Stitely & Gherman (2014), multiple authors

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const SHOULDER_DYSTOCIA_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'sd-start',
    type: 'info',
    module: 1,
    title: 'Shoulder Dystocia — Recognition',
    body: '[Shoulder Dystocia Steps Summary](#/info/sd-summary) — quick-reference escalation checklist to review before delivery.\n\n**Shoulder dystocia occurs when the baby\'s anterior shoulder becomes impacted behind the mother\'s pubic symphysis after delivery of the fetal head.** The remainder of the baby does not follow the head as it usually does during vaginal delivery.\n\nKEY FACTS\n• Cannot be predicted with any degree of accuracy [1]\n• Cannot be prevented by any specific strategies or maneuvers [1]\n• Occurs in approximately 1.5% of vaginal deliveries [9]\n\nTWO SIGNS OF SHOULDER DYSTOCIA\n**1. Failure to deliver** — The baby\'s body does not emerge with standard traction and maternal pushing after delivery of the fetal head.\n\n**2. The "Turtle Sign"** — The fetal head suddenly retracts back against the mother\'s perineum after emerging from the vagina. The baby\'s cheeks bulge out, resembling a turtle pulling its head back into its shell. This retraction is caused by the anterior shoulder catching on the posterior surface of the maternal pubic bone.',
    citation: [1, 9],
    next: 'sd-initial',
  },

  // =====================================================================
  // MODULE 2: INITIAL RESPONSE
  // =====================================================================

  {
    id: 'sd-initial',
    type: 'info',
    module: 2,
    title: 'Initial Response — Call for Help & Start the Clock',
    body: '**As soon as shoulder dystocia is recognized, the delivering clinician must act immediately and calmly.**\n\nIMMEDIATE ACTIONS\n• **Announce** "shoulder dystocia" clearly to the room\n• **Call for help** — request a second obstetrician if available\n• **Call pediatrics/NICU** — for neonatal evaluation and potential resuscitation\n• **Call anesthesia** — in case procedural intervention is needed\n• **Request extra personnel** — nurses, additional hands\n• **Designate a timekeeper** — call out elapsed time every 30 seconds\n• **Designate a note taker** — record timing of events and maneuvers attempted\n\nTIME WINDOW\n**You have approximately 4–5 minutes** to deliver a previously well-oxygenated term infant before the risk of hypoxic brain injury becomes significant. [2][3]\n\n• Wood (1973): fetal pH drops ~0.04 units per minute during shoulder dystocia [4]\n• Leung (2011): pH drop ~0.01 units per minute; 4–5 min before ischemic neuropathy risk [2]\n• This time frame depends on the oxygenation and acidosis status of the fetus prior to onset\n\nDO NOT PANIC\nBy restraining panic, keeping a cool head, and employing a previously thought-out set of maneuvers, almost all shoulder dystocias can be resolved with excellent results. [1]',
    citation: [1, 2, 3, 4],
    next: 'sd-traction',
  },

  {
    id: 'sd-traction',
    type: 'info',
    module: 2,
    title: 'Traction — Normal vs. "Excessive" Force',
    body: 'Unless a baby falls out of the mother, some traction is always applied to the infant\'s head during delivery. This is standard of care practiced by obstetricians across the United States and described in major obstetrical textbooks (Williams Obstetrics, Stanford Handbook). [1]\n\nAXIAL TRACTION\nPer ACOG (2014): because the infant\'s position within the pelvis is at some angle relative to the horizontal plane, **axial traction is generally applied in the direction below the horizontal plane** (downward axial traction). This is distinguished from downward lateral traction or lateral bending. [1]\n\nON "EXCESSIVE FORCE"\nSome investigators (Allen 1991, Gonik) have attempted to quantify "excessive force" using piezoelectric fingertip sensors. There is no universally accepted threshold. [12]\n\nWhen all maneuvers have been exhausted and the only options are maximal extraction effort, hypoxic neurologic damage, or fetal death — **the risk of brachial plexus or other injury must be accepted** to save the baby\'s life. [1]',
    citation: [1, 12],
    next: 'sd-mcroberts',
  },

  // =====================================================================
  // MODULE 3: FIRST-LINE — McROBERTS + SUPRAPUBIC
  // =====================================================================

  {
    id: 'sd-mcroberts',
    type: 'info',
    module: 3,
    title: 'McRoberts Maneuver + Suprapubic Pressure',
    body: '**McRoberts maneuver and suprapubic pressure should be implemented rapidly and simultaneously as the first intervention.** Together they resolve 50–60% of all shoulder dystocias. [5][6]\n\nMcROBERTS MANEUVER\nNamed for William A. McRoberts, Jr. (University of Texas at Houston).\n• **Sharply flex the mother\'s legs upon her abdomen** (hyperflexion of hips)\n• This rotates the symphysis pubis cephalad and straightens the sacrum\n• Does NOT change actual pelvic dimensions — changes the angle of inclination between symphysis and sacral promontory [7]\n• Significantly reduces required fetal extractive forces and brachial plexus stretching [8]\n• McRoberts alone resolves 39–42% of shoulder dystocias [5][6]\n\nSUPRAPUBIC PRESSURE\n• An assistant makes a fist and places it just above the maternal pubic bone\n• Push the fetal anterior shoulder to one side (toward the oblique diameter)\n• Shoulder dystocias are frequently caused by shoulders entering the pelvis in direct AP orientation instead of the more physiologic oblique diameter\n• Pushing the shoulder to an oblique position often frees it\n\nCOMPLICATIONS (RARE)\n• Symphyseal separation\n• Transient femoral neuropathy from overly aggressive hyperflexion',
    citation: [5, 6, 7, 8],
    images: [
      {
        src: 'images/shoulder-dystocia/mcroberts-maneuver.jpg',
        alt: 'Illustration showing McRoberts maneuver with maternal legs sharply flexed onto abdomen while an assistant applies suprapubic pressure to the fetal anterior shoulder, with inset diagram showing pelvic rotation and opening of the birth canal',
      },
    ],
    next: 'sd-first-check',
  },

  {
    id: 'sd-first-check',
    type: 'question',
    module: 3,
    title: 'First-Line Resolution Check',
    body: 'McRoberts maneuver + suprapubic pressure have been applied.\n\n**Did the shoulder dystocia resolve?**\n\nExpected success rate: 50–60% with both maneuvers combined. [5][6]',
    citation: [5, 6],
    options: [
      {
        label: 'Yes — Resolved',
        description: 'Baby delivered successfully',
        next: 'sd-resolved',
      },
      {
        label: 'No — Still impacted',
        description: 'Proceed to second-line maneuvers',
        next: 'sd-rotational',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: SECOND-LINE — ROTATIONAL + POSTERIOR ARM
  // =====================================================================

  {
    id: 'sd-rotational',
    type: 'info',
    module: 4,
    title: 'Wood\'s Screw & Rubin\'s Maneuver',
    body: '**Rotational maneuvers use progressive corkscrew rotation of the posterior shoulder to release the impacted anterior shoulder.**\n\nWOOD\'S SCREW MANEUVER (1943)\n• Apply pressure on the **anterior surface of the posterior shoulder**\n• Progressively rotate the posterior shoulder 180° in a corkscrew fashion\n• This rotates the baby\'s shoulder girdle, freeing the anterior shoulder from behind the symphysis\n\nRUBIN\'S MANEUVER (Variation)\n• Apply pressure on the **posterior surface of the posterior shoulder**\n• This has the advantage of **flexing the shoulders across the chest**, decreasing the bisacromial diameter\n• The reduced shoulder width makes passage through the pelvis easier\n\nBOTH DIRECTIONS\nTry clockwise and counter-clockwise rotation — one direction may succeed where the other fails.\n\nGurewitsch & Allen (2005) suggest rotational maneuvers may place **less stretch on the brachial plexus** than McRoberts or suprapubic pressure. [10]',
    citation: [10, 12],
    images: [
      {
        src: 'images/shoulder-dystocia/rotational-maneuver.jpg',
        alt: 'Two-panel illustration showing Wood\'s screw maneuver with progressive rotation of the posterior shoulder in corkscrew fashion to release the impacted anterior shoulder',
      },
    ],
    next: 'sd-posterior-arm',
  },

  {
    id: 'sd-posterior-arm',
    type: 'info',
    module: 4,
    title: 'Delivery of the Posterior Arm',
    body: '**If rotational maneuvers fail, attempt delivery of the posterior arm.** Hoffman (2011) found this maneuver had the highest rate of successful delivery compared to all other maneuvers. [9]\n\nTECHNIQUE\n• Insert hand behind the posterior shoulder of the fetus\n• Locate the posterior arm\n• **Sweep the arm across the fetal chest** and deliver it\n• With the posterior arm delivered, rotate the baby to dislodge the anterior shoulder\n• Complete delivery\n\nRISKS\n• Humeral fracture: 12.4% in Gherman\'s 1998 series (11 of 89 cases) [11]\n• Almost all humeral fractures heal quickly without permanent damage\n• A small price to pay for delivery in a life-threatening situation\n\nEVIDENCE COMPARISON\n• Leung (2011): Rotational methods vs posterior arm — similar success rates, but rotational methods may have less fetal injury (4.4% vs 21%) [2]\n• Hoffman (2011): Posterior arm had highest success rate with no difference in injury rates [9]\n• Spain (2015): No individual maneuver associated with morbidity after adjusting for duration/severity — "use the maneuver most likely to result in successful delivery" [13]',
    citation: [2, 9, 11, 13],
    images: [
      {
        src: 'images/shoulder-dystocia/posterior-arm-delivery.jpg',
        alt: 'Two-panel illustration showing delivery of the posterior arm by sweeping it across the fetal chest to reduce the shoulder girdle width and facilitate delivery',
      },
    ],
    next: 'sd-second-check',
  },

  {
    id: 'sd-second-check',
    type: 'question',
    module: 4,
    title: 'Second-Line Resolution Check',
    body: 'Rotational maneuvers and/or posterior arm delivery have been attempted.\n\n**Did the shoulder dystocia resolve?**\n\nMcFarland (1996) found that McRoberts + suprapubic + Wood\'s screw + posterior arm delivery were sufficient to resolve **all** remaining cases in his series. [6]',
    citation: [6],
    options: [
      {
        label: 'Yes — Resolved',
        description: 'Baby delivered successfully',
        next: 'sd-resolved',
      },
      {
        label: 'No — Still impacted',
        description: 'Proceed to last-resort maneuvers',
        next: 'sd-last-resort',
        urgency: 'critical',
      },
    ],
  },

  // =====================================================================
  // MODULE 5: LAST RESORT
  // =====================================================================

  {
    id: 'sd-last-resort',
    type: 'info',
    module: 5,
    title: 'Last Resort Maneuvers',
    body: '**If all standard maneuvers have failed, consider these last-resort options. Each carries significant maternal and/or fetal risk.**\n\nZAVANELLI MANEUVER (Cephalic Replacement)\nFirst described by Dr. Zavanelli (1977, Pleasanton, CA).\n• Set up for **emergency cesarean section** first\n• Rotate fetal head to occiput anterior position\n• Flex the head and apply constant firm pressure to push it back into the vagina\n• Administer tocolytics to relax the uterus: [Terbutaline](#/drug/terbutaline/tocolysis) 0.25 mg SQ or [Nitroglycerin](#/drug/nitroglycerin/tocolysis) 0.4 mg SL\n• Perform immediate cesarean section after head replacement\n• O\'Leary (1993): 53 of 59 heads replaced; 5-min Apgar <6 in 61%; 2 deaths [14]\n• Sanberg (1999): 77.3% success in 84 cases; complications included fractures, Erb palsy, brain damage [15]\n\nALL-FOURS MANEUVER (Gaskin)\n• Place mother on hands and knees\n• May change the angle of the symphysis relative to the stuck shoulder\n• Bruner (1998): resolved 82% of 82 cases (2–3 min to reposition) [16]\n• Practicality limited: exhausted patient, epidural in place, requires repositioning\n\nDELIBERATE CLAVICLE FRACTURE\n• Theoretically decreases bisacromial diameter\n• In practice the clavicle is difficult to fracture intentionally\n• Risk of great vessel injury, lung damage\n• Most reports involve deceased fetuses\n\nSYMPHYSIOTOMY\n• Transection of symphyseal ligaments gains 2–3 cm pelvic circumference\n• Performed under local analgesia in ~5 minutes\n• Major risk: bladder and urethral injury\n• Reserved for settings remote from cesarean capability [17]\n\nABDOMINAL RESCUE (O\'Shaughnessy 1998)\n• Laparotomy + hysterotomy → manually rotate fetal shoulders → complete vaginal delivery\n• Absolute last resort',
    citation: [14, 15, 16, 17],
    next: 'sd-protocols',
  },

  {
    id: 'sd-protocols',
    type: 'info',
    module: 5,
    title: 'Recommended Protocols — Summary',
    body: '**The most important aspect of resolving shoulder dystocia is having a clear, well-rehearsed sequence of maneuvers in mind before it occurs.** [1]\n\nACOG PROTOCOL (2002, reaffirmed 2015) [1]\n1. McRoberts maneuver + suprapubic pressure\n2. Episiotomy (controversial)\n3. Rotational maneuvers\n4. Delivery of posterior arm\n5. Zavanelli / symphysiotomy if all else fails\n\nGHERMAN USC PROTOCOL (1998) [11]\n1. McRoberts maneuver\n2. Suprapubic pressure\n3. Procto-episiotomy\n4. Wood\'s corkscrew maneuver\n5. Posterior arm extraction\n6. Zavanelli / symphysiotomy\n\nKEY EVIDENCE\n• No maneuver has been clearly shown to be superior to any other [13]\n• The number of maneuvers required correlates with injury rate [6]\n• As fetal weight increases, more maneuvers are typically required [6]\n• CNGOF (Sentilhes 2016): episiotomy is NOT routinely required for shoulder dystocia maneuvers [18]\n\nTHREE KEYS TO SUCCESS\n**1. Recognize** the shoulder dystocia\n**2. Know** the maneuvers\n**3. Implement** them in a calm, controlled, organized fashion [1]',
    citation: [1, 6, 11, 13, 18],
    next: 'sd-resolved',
  },

  {
    id: 'sd-resolved',
    type: 'result',
    module: 5,
    title: 'Shoulder Dystocia — Resolved',
    body: 'POST-DELIVERY MANAGEMENT\n• **Immediate neonatal assessment** — Pediatrics/NICU should already be present\n• **Apgar scores** at 1 and 5 minutes\n• **Evaluate for injury:**\n  - Brachial plexus palsy (Erb\'s) — asymmetric arm movement, "waiter\'s tip" posture\n  - Clavicle fracture — crepitus, asymmetric Moro reflex\n  - Humeral fracture — if posterior arm delivery was performed\n• **Maternal assessment** — check for vaginal/cervical lacerations, postpartum hemorrhage\n• **Document thoroughly:**\n  - Time of head delivery and time of body delivery (head-to-body interval)\n  - All maneuvers attempted and in what order\n  - Personnel present and their roles\n  - Neonatal condition at delivery\n  - Estimated blood loss\n\nKEY TAKEAWAY\nSometimes, even in the most expert hands and with relatively mild shoulder dystocias, fetal or maternal injury will occur. Injury does not necessarily indicate substandard care. [1]',
    recommendation: 'Shoulder dystocia resolved. Complete neonatal assessment, evaluate for brachial plexus injury and fractures, assess maternal status, and document all maneuvers and timing thoroughly.',
    confidence: 'recommended',
    citation: [1, 19],
  },

];

export const SHOULDER_DYSTOCIA_NODE_COUNT = SHOULDER_DYSTOCIA_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const SHOULDER_DYSTOCIA_MODULE_LABELS = [
  'Recognition',
  'Initial Response',
  'First-Line',
  'Second-Line',
  'Last Resort',
];

// -------------------------------------------------------------------
// Evidence Citations (18 references)
// -------------------------------------------------------------------

export const SHOULDER_DYSTOCIA_CITATIONS: Citation[] = [
  { num: 1, text: 'American College of Obstetricians and Gynecologists. Practice Bulletin No. 40: Shoulder Dystocia. ACOG; 2002 (Reaffirmed 2015). See also: ACOG. Neonatal Brachial Plexus Palsy. 2014.' },
  { num: 2, text: 'Leung TY, Stuart O, Sahota DS, et al. Head-to-body delivery interval and risk of fetal acidosis and hypoxic ischaemic encephalopathy in shoulder dystocia: a retrospective review. BJOG. 2011;118(4):474-479.' },
  { num: 3, text: 'Lerner HM. Shoulder dystocia and hypoxic brain injury: a review. Clin Obstet Gynecol. 2011;54(1):148-155.' },
  { num: 4, text: 'Wood C, Ng KH, Hounslow D, Benning H. Time — an important variable in normal delivery. J Obstet Gynaecol Br Commonw. 1973;80(4):295-300.' },
  { num: 5, text: 'Gherman RB, Goodwin TM, Sorokin Y, et al. The McRoberts\' maneuver for the alleviation of shoulder dystocia: how successful is it? Am J Obstet Gynecol. 1997;176(3):656-661.' },
  { num: 6, text: 'McFarland MB, Langer O, Piper JM, Berkus MD. Perinatal outcome and the type and number of maneuvers in shoulder dystocia. Int J Gynaecol Obstet. 1996;55(3):219-224.' },
  { num: 7, text: 'Gherman RB, Tramont J, Muffley P, Goodwin TM. Analysis of McRoberts\' maneuver by x-ray pelvimetry. Obstet Gynecol. 2000;95(1):43-47.' },
  { num: 8, text: 'Gonik B, Allen R, Sorab J. Objective evaluation of the shoulder dystocia phenomenon: effect of maternal pelvic orientation on force reduction. Obstet Gynecol. 1989;74(1):44-48.' },
  { num: 9, text: 'Hoffman MK, Bailit JL, Branch DW, et al. A comparison of obstetric maneuvers for the acute management of shoulder dystocia. Obstet Gynecol. 2011;117(6):1272-1278.' },
  { num: 10, text: 'Gurewitsch ED, Allen RH. Reducing the risk of shoulder dystocia-related permanent brachial plexus injury. Obstet Gynecol Surv. 2005;60(8):527-541.' },
  { num: 11, text: 'Gherman RB, Ouzounian JG, Goodwin TM. Obstetric maneuvers for shoulder dystocia and associated fetal morbidity. Am J Obstet Gynecol. 1998;178(6):1126-1130.' },
  { num: 12, text: 'Stitely ML, Gherman RB. Shoulder dystocia: management and documentation. Semin Perinatol. 2014;38(4):194-200.' },
  { num: 13, text: 'Spain JE, Frey HA, Tuuli MG, et al. Neonatal morbidity associated with shoulder dystocia maneuvers. Am J Obstet Gynecol. 2015;212(3):353.e1-5.' },
  { num: 14, text: 'O\'Leary JA, Leonetti HB. Shoulder dystocia: prevention and treatment. Am J Obstet Gynecol. 1990;162(1):5-9. See also: O\'Leary JA. Cephalic replacement for shoulder dystocia: present status and future role of the Zavanelli maneuver. Obstet Gynecol. 1993;82(5):847-850.' },
  { num: 15, text: 'Sandberg EC. The Zavanelli maneuver: 12 years of recorded experience. Obstet Gynecol. 1999;93(2):312-317.' },
  { num: 16, text: 'Bruner JP, Drummond SB, Meenan AL, Gaskin IM. All-fours maneuver for reducing shoulder dystocia during labor. J Reprod Med. 1998;43(5):439-443.' },
  { num: 17, text: 'Hartfield VJ. Symphysiotomy for shoulder dystocia. Am J Obstet Gynecol. 1986;155(2):228.' },
  { num: 18, text: 'Sentilhes L, Sénat MV, Boulard H, et al. Shoulder dystocia: guidelines for clinical practice from the French College of Gynecologists and Obstetricians (CNGOF). Eur J Obstet Gynecol Reprod Biol. 2016;203:156-161.' },
  { num: 19, text: 'Images: McRoberts Maneuver, Wood\'s Screw & Rubin\'s Maneuver, and Posterior Arm Delivery illustrations generated with AI assistance for educational purposes.' },
];
