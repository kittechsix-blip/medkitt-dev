// MedKitt — Distal Radius Fracture Reduction
// "Obtain & Maintain" assessment framework → Hematoma Block → TRAMP reduction mnemonic.
// 5 modules: Assessment → Analgesia → TRAMP Reduction → Post-Reduction → Special Populations
// 17 nodes total.
// Source: Dr. Arun Sayal (EM Cases), AO Foundation, 11 hematoma block peer-reviewed references

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const DISTAL_RADIUS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: ASSESSMENT
  // =====================================================================

  {
    id: 'dr-start',
    type: 'info',
    module: 1,
    title: 'Distal Radius Fracture Reduction',
    body: '[Reduction Steps Summary](#/info/dr-summary) — quick-reference TRAMP checklist to review before reduction.\n\n**"Obtain & Maintain"** — the two questions that guide every fracture decision: [1]\n\n**1. OBTAIN — Is the current position acceptable?**\nIf yes → immobilize and follow up. If no → reduce.\n\n**2. MAINTAIN — Will the fracture shift?**\nIf stable → fiberglass OK. If unstable → plaster cast with proper molding.\n\nThis framework applies to every fracture you encounter. For distal radius, the TRAMP mnemonic provides the systematic reduction technique.\n\n[Pediatric Considerations](#/node/dr-peds) — remodeling potential, acceptable angulation by age, growth plate risks.',
    citation: [1],
    next: 'dr-assess',
  },

  {
    id: 'dr-assess',
    type: 'question',
    module: 1,
    title: 'Fracture Assessment — Is Reduction Needed?',
    body: 'Evaluate the fracture on AP and lateral radiographs.\n\n**Acceptable position criteria:**\n• Radial height maintained\n• Radial inclination >15°\n• Volar tilt neutral or positive\n• No significant dorsal angulation\n• No intra-articular step-off >2 mm\n\n**Is the current position acceptable?**',
    citation: [1, 2],
    options: [
      {
        label: 'Acceptable — stable fracture',
        description: 'Immobilize only, no reduction needed',
        next: 'dr-stable',
      },
      {
        label: 'Unacceptable — needs reduction',
        description: 'Proceed to analgesia and TRAMP reduction',
        next: 'dr-analgesia',
      },
      {
        label: 'Open / grossly unstable / comminuted',
        description: 'Surgical consult required',
        next: 'dr-surgical',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'dr-stable',
    type: 'result',
    module: 1,
    title: 'Stable Fracture — Immobilize Only',
    body: '**Buckle (torus) fractures:**\n• Removable wrist splint for 3–4 weeks\n• No follow-up x-ray needed — these do not displace\n\n**Minimally displaced, stable:**\n• Short arm splint or cast\n• Fiberglass is acceptable (no molding needed for stable fractures)\n• Ensure thumb, fingers, and elbow remain FREE\n\n**Follow-up:**\n• Ortho clinic in 5–7 days for repeat films\n• Return precautions: increasing pain, numbness/tingling, inability to move fingers',
    recommendation: 'Stable fracture — immobilize with splint or cast. Ortho follow-up in 5–7 days.',
    confidence: 'recommended',
    citation: [1],
  },

  {
    id: 'dr-surgical',
    type: 'result',
    module: 1,
    title: 'Surgical Consult Required',
    body: '**Indications for operative management:**\n• Open fracture (any grade)\n• Grossly unstable / comminuted distal radius\n• Intra-articular step-off >2 mm\n• Radiocarpal subluxation\n• Associated distal radioulnar joint (DRUJ) instability\n• Failed closed reduction (2 attempts)\n\n**ED management while awaiting consult:**\n• Irrigate open wounds, apply sterile dressing\n• Reduce gross deformity if neurovascularly compromised\n• Splint in position of comfort\n• Antibiotics for open fractures (cefazolin ± gentamicin)\n• Update tetanus if needed\n• Neurovascular exam — document median nerve function',
    recommendation: 'Surgical consult required. Irrigate, splint, antibiotics if open, and consult orthopedics.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 2: ANALGESIA
  // =====================================================================

  {
    id: 'dr-analgesia',
    type: 'question',
    module: 2,
    title: 'Analgesia Selection',
    body: '**Choose your analgesia approach.** Hematoma block is the preferred technique for most ED reductions — faster discharge (1.5 vs 4.6 hours), no NPO requirement, no monitoring team needed. [3][4][6]\n\nFor complex reductions or patient anxiety, procedural sedation remains appropriate. Regional anesthesia offers superior and longer-lasting analgesia but requires more setup time.',
    citation: [3, 4, 6],
    options: [
      {
        label: 'Hematoma block (preferred)',
        description: 'Fastest — inject local into fracture site',
        next: 'dr-hema-block',
      },
      {
        label: 'Procedural sedation',
        description: 'Ketamine, propofol, or etomidate',
        next: 'dr-proc-sed',
      },
      {
        label: 'Regional anesthesia',
        description: 'Bier block or US-guided nerve blocks',
        next: 'dr-regional',
      },
    ],
  },

  {
    id: 'dr-hema-block',
    type: 'info',
    module: 2,
    title: 'Hematoma Block Technique',
    body: '[Hematoma Block Evidence](#/info/dr-hema-evidence) — comprehensive efficacy data, technique variations, and comparative studies.\n\n**TECHNIQUE:**\n1. Identify the fracture site on dorsal aspect of wrist\n2. Prep skin with chlorhexidine\n3. Insert **20-gauge needle** at dorsal fracture line\n4. **Aspirate** — dark blood confirms placement in fracture hematoma\n5. Inject **5–10 mL of 1% plain** [Lidocaine](#/drug/lidocaine/hematoma block)\n6. For combined radius + ulna fractures: second injection into ulnar hematoma\n7. Wait **5–10 minutes** for full anesthetic effect\n\n**ULTRASOUND GUIDANCE** improves accuracy and reduces pain during injection. [5][7][8]\n\n**SAFETY:** Max dose 4.5 mg/kg without epinephrine. Fracture hematoma is contiguous with marrow space — absorption is rapid, similar to IO administration. [3][5][6]',
    citation: [3, 5, 6, 7, 8],
    images: [
      {
        src: 'images/distal-radius/hematoma-block.png',
        alt: 'Illustration showing hematoma block technique with 20-gauge needle inserted at dorsal fracture line, aspirating dark blood to confirm placement in fracture hematoma before injecting lidocaine',
        caption: 'Hematoma block: Insert needle at dorsal fracture line, aspirate dark blood to confirm, inject 5–10 mL 1% lidocaine.',
      },
    ],
    next: 'dr-traction',
  },

  {
    id: 'dr-proc-sed',
    type: 'info',
    module: 2,
    title: 'Procedural Sedation',
    body: '**Procedural sedation** provides excellent analgesia and amnesia but requires more resources and time.\n\n**COMMON AGENTS:**\n• **Ketamine** 1–2 mg/kg IV — dissociative, maintains airway reflexes\n• **Propofol** 0.5–1 mg/kg IV — rapid onset/offset, no analgesia (add fentanyl)\n• **Etomidate** 0.1–0.15 mg/kg IV — hemodynamically stable\n\n**REQUIREMENTS:**\n• NPO assessment (ideally 2+ hours for clear liquids)\n• Dedicated monitoring nurse\n• Capnography, pulse oximetry, cardiac monitor\n• Resuscitation equipment at bedside\n• Longer ED stay (mean 4.6 hours vs 1.5 hours for hematoma block) [4]\n\n**BEST FOR:** Complex reductions, highly anxious patients, pediatric patients who cannot cooperate with hematoma block.',
    citation: [4],
    next: 'dr-traction',
  },

  {
    id: 'dr-regional',
    type: 'info',
    module: 2,
    title: 'Regional Anesthesia',
    body: '**BIER BLOCK (IV Regional)**\n• Double-cuff tourniquet on affected arm\n• Exsanguinate, inflate proximal cuff to 100 mmHg above SBP\n• Inject 40–50 mL 0.5% lidocaine IV into dorsal hand vein\n• Switch to distal cuff after 5 min\n• Maintain tourniquet minimum 20 min to prevent systemic toxicity\n• Comparable efficacy to hematoma block with better patient satisfaction in some studies [10]\n\n**US-GUIDED NERVE BLOCKS**\n• Median + radial nerve blocks at wrist or forearm\n• Axillary brachial plexus block for complete coverage\n• Superior analgesia and longer duration than hematoma block [12][13]\n• Higher success rate for closed reduction (94% vs 74%) [12]\n• Requires ultrasound proficiency and additional setup time [9][11]\n\n**EVIDENCE:** Cochrane review found insufficient evidence to recommend one technique over another. Choice depends on clinician skill and patient factors. [9]',
    citation: [9, 10, 11, 12, 13],
    next: 'dr-traction',
  },

  // =====================================================================
  // MODULE 3: TRAMP REDUCTION
  // =====================================================================

  {
    id: 'dr-traction',
    type: 'info',
    module: 3,
    title: 'T — Traction',
    body: '**TRACTION — Disimpact the fracture first.** [1]\n\nBefore you can reduce the fracture, you must recreate length by separating the fragments.\n\n**TECHNIQUE:**\n• Patient seated, arm pronated on table\n• Apply **longitudinal traction** — waterski position (lean back, steady pull)\n• Make small circles to free the distal fragment\n• Goal: recreate the length that was lost from impaction\n• Do NOT try to reduce yet — just get the fragments apart\n\n**FINGER TRAPS:** Place traps on the **thumb, index, and middle fingers** (digits 1–3) — this positions the hand in ulnar deviation during traction, which helps maintain radial length. Hang arm with 5–10 lbs of countertraction at the elbow. This frees your hands for reduction and splinting.\n\n**KEY POINT:** If you skip traction, the fragments are locked together and reduction will fail.',
    citation: [1],
    images: [
      {
        src: 'images/distal-radius/finger-trap-traction.png',
        alt: 'Illustration showing finger trap traction setup with hand suspended from finger traps and countertraction weights at elbow for sustained traction during distal radius fracture reduction',
        caption: 'Traction: Finger traps with countertraction for sustained pull. Frees hands for reduction and splinting.',
      },
    ],
    next: 'dr-reduce',
  },

  {
    id: 'dr-reduce',
    type: 'info',
    module: 3,
    title: 'R — Reduction',
    body: '**REDUCTION — Exaggerate, then correct.** [1]\n\nThe key insight: you must first increase the deformity to unlock the periosteum, then push the fragment back into place.\n\n**TECHNIQUE:**\n1. With traction maintained, **exaggerate the deformity** (extend the wrist further dorsally)\n2. This unlocks the dorsal periosteal hinge\n3. Now **push the distal fragment palmar** (volar) with your thumbs\n4. Simultaneously apply **ulnar deviation** to restore radial inclination\n5. You should feel a satisfying "clunk" as the fragment reduces\n\n**WHY ULNAR DEVIATION IS CRITICAL:** Ulnar deviation maintains radial length. Without it, the radius shortens relative to the ulna, losing the reduction. This is one of the most important steps — always ulnar deviate during and after reduction.\n\n**COMMON MISTAKE:** Trying to push the fragment into place without first exaggerating — the locked periosteum blocks reduction.\n\n**BOTH BONES:** If ulna is also fractured, reduce radius first (restores radial length), then assess ulna — it often reduces with the radius.',
    citation: [1],
    images: [
      {
        src: 'images/distal-radius/reduction-technique.png',
        alt: 'Four-step illustration showing distal radius reduction technique: traction to recreate length, exaggeration of deformity to unlock periosteum, palmar push to reduce fragment, and final alignment',
        caption: 'Reduction: (1) Traction, (2) Exaggerate deformity, (3) Push palmar + ulnar deviate, (4) Fragment reduces.',
      },
    ],
    next: 'dr-apply',
  },

  {
    id: 'dr-apply',
    type: 'info',
    module: 3,
    title: 'A — Apply Splint Materials',
    body: '**APPLY — Plaster, not fiberglass, when molding matters.** [1]\n\nFiberglass sets too rigid too fast — you cannot mold it to maintain reduction. Save fiberglass for stable fractures that don\'t need molding.\n\n**PLASTER TECHNIQUE:**\n• **10 layers** of plaster (standard thickness for adults)\n• **6-inch width** for distal radius\n• Measure length on the **uninjured side** — wrist to proximal forearm\n• Cut a **thumb hole** before applying\n• **Minimal padding** at the fracture site — padding defeats molding\n  - 2 layers of Webril only\n  - More padding = less effective mold = fracture shifts\n\n**CRITICAL CONCEPT:** The purpose of the splint is to hold the reduction. Excessive padding creates a gap between the splint and skin, allowing the fracture to move inside the splint.',
    citation: [1],
    images: [
      {
        src: 'images/distal-radius/tramp.png',
        alt: 'TRAMP mnemonic visual summary showing the five steps of distal radius fracture reduction: Traction, Reduction, Apply, Mold, Position with accompanying x-ray images',
        caption: 'TRAMP mnemonic: Traction → Reduction → Apply → Mold → Position. Plaster over fiberglass when molding matters.',
      },
    ],
    next: 'dr-mold',
  },

  {
    id: 'dr-mold',
    type: 'info',
    module: 3,
    title: 'M — Mold',
    body: '**MOLD — Flat hands, oval shape, don\'t squeeze, don\'t move.** [1][2]\n\nThis is where most reductions are lost. Improper molding lets the fracture shift back.\n\n**TECHNIQUE:**\n• Use **flat hands** (thenar eminences) — never fingertips\n• Create an **oval cross-section**, NOT a circle\n  - "Straight cast → crooked bone, crooked cast → straight bone"\n• Apply **3-point pressure**: dorsal at fracture, volar proximal and distal\n• Hold the mold — **DO NOT move your hands while plaster sets**\n• Wait for the **exothermic reaction** (heat) — plaster is setting\n• Setting time: approximately 3–5 minutes\n\n**3-POINT MOLD PRINCIPLE:**\nThe oval shape and 3-point pressure create a mechanical block that prevents the fracture from re-displacing dorsally. A round cast provides no resistance to displacement.\n\n**DO NOT SQUEEZE** — squeezing creates pressure points → skin breakdown. Mold with broad, flat pressure only.',
    citation: [1, 2],
    images: [
      {
        src: 'images/distal-radius/splint-position.png',
        alt: 'Illustration showing proper hand positioning for 3-point molding of plaster cast with flat hands creating oval cross-section and pressure points marked at dorsal fracture site, volar proximal, and volar distal',
        caption: 'Mold: Flat hands, oval cross-section, 3-point pressure. Do NOT squeeze. Do NOT move while setting.',
      },
    ],
    next: 'dr-position',
  },

  {
    id: 'dr-position',
    type: 'info',
    module: 3,
    title: 'P — Position',
    body: '**POSITION — 10° flexion, ulnar deviation, everything else FREE.** [1]\n\n**WRIST POSITION:**\n• **10° flexion** (slight volar tilt) — counteracts dorsal displacement\n• **Ulnar deviation** — restores radial inclination\n• Hold position with thumb + index finger + middle finger\n\n**WHAT MUST BE FREE:**\n• **Elbow** — cast stops below elbow (short arm)\n• **MCP joints** — cast stops at distal palmar crease\n• **Thumb** — full ROM through thumb hole\n\n**WHY THESE THREE:**\n• Immobilizing the elbow doesn\'t improve stability for distal radius\n• Blocking MCPs → finger stiffness → poor functional outcome\n• Thumb immobilization → unnecessary disability\n\n**SUGAR-TONG SPLINT:** For highly unstable fractures, a sugar-tong (elbow-to-palm with forearm loop) prevents pronation/supination and provides additional stability.',
    citation: [1],
    images: [
      {
        src: 'images/distal-radius/proper-splint.png',
        alt: 'Photograph showing completed short arm cast with proper oval cross-section, thumb hole, and correct positioning at 10 degrees flexion with ulnar deviation',
        caption: 'Position: 10° flexion, ulnar deviation. Elbow, MCPs, and thumb remain free.',
      },
    ],
    next: 'dr-post-xray',
  },

  // =====================================================================
  // MODULE 4: POST-REDUCTION
  // =====================================================================

  {
    id: 'dr-post-xray',
    type: 'question',
    module: 4,
    title: 'Post-Reduction Assessment',
    body: '**Obtain post-reduction AP and lateral films.** [1]\n\n**ASSESSMENT CRITERIA:**\n• **2nd metacarpal line** should be parallel to the radial shaft on AP view\n• **Cast index** <0.80 (AP width ÷ lateral width of cast at fracture) — oval shape confirmed\n• Radial height, inclination, and volar tilt restored\n• No intra-articular step-off\n\n**"Straight cast = crooked bone. Crooked cast = straight bone."**\nIf the cast looks perfectly round on x-ray, the mold is inadequate and the fracture will re-displace.\n\n**Is the reduction acceptable?**',
    citation: [1],
    options: [
      {
        label: 'Acceptable reduction',
        description: 'Good alignment, cast index <0.80',
        next: 'dr-dispo',
      },
      {
        label: 'Inadequate — re-attempt',
        description: 'Alignment not acceptable, try again',
        next: 'dr-re-attempt',
        urgency: 'urgent',
      },
      {
        label: 'Won\'t maintain — surgical consult',
        description: 'Reduces but immediately re-displaces',
        next: 'dr-surgical',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'dr-re-attempt',
    type: 'info',
    module: 4,
    title: 'Re-Attempt Reduction',
    body: '**Assess what went wrong before trying again.** [1]\n\n**COMMON FAILURES:**\n• Insufficient traction — fragments still impacted\n• Did not exaggerate deformity — periosteum still locked\n• Round cast (poor mold) — no mechanical block to re-displacement\n• Too much padding — mold doesn\'t transmit to bone\n• Moved hands during plaster setting — lost the mold\n\n**BEFORE RE-ATTEMPT:**\n• Remove the current cast/splint completely\n• **Top up analgesia** — additional hematoma block or supplemental sedation\n• Reassess the fracture pattern on the post-reduction films\n• Address the specific failure point\n\n**RE-ATTEMPT THE FULL TRAMP SEQUENCE:**\nDo not skip steps. Start from Traction and work through each step again.\n\n**IF 2 ATTEMPTS FAIL** → consult orthopedics for operative management. Repeated manipulation increases soft tissue swelling and complication risk.',
    citation: [1],
    next: 'dr-traction',
  },

  {
    id: 'dr-dispo',
    type: 'result',
    module: 4,
    title: 'Disposition & Follow-Up',
    body: '**DISCHARGE INSTRUCTIONS:**\n• **Elevation** — keep hand above heart for 48 hours to minimize swelling\n• **Ice** — 20 min on / 20 min off over cast padding\n• **Finger exercises** — wiggle fingers frequently to prevent stiffness\n• **Neurovascular checks** — ensure fingers remain pink, warm, with normal sensation\n\n**RETURN IMMEDIATELY IF:**\n• Increasing pain not relieved by elevation and medication\n• Numbness, tingling, or inability to move fingers\n• Fingers turn blue, white, or cold\n• Cast feels too tight or causes pressure sores\n\n**COMPARTMENT SYNDROME WARNING:**\nAny of the above symptoms could indicate compartment syndrome — a surgical emergency.\n\n**FOLLOW-UP:**\n• **Ortho clinic in 5–7 days** for repeat films\n• 1-week x-ray checks for re-displacement (especially first 2 weeks)\n• Cast duration: typically 4–6 weeks for adults, 3–4 weeks for children',
    recommendation: 'Successful reduction. Discharge with elevation, ice, finger exercises, neurovascular check instructions, and ortho follow-up in 5–7 days.',
    confidence: 'recommended',
    citation: [1],
  },

  // =====================================================================
  // MODULE 5: SPECIAL POPULATIONS
  // =====================================================================

  {
    id: 'dr-peds',
    type: 'info',
    module: 5,
    title: 'Pediatric Considerations',
    body: '**Remodeling potential changes what counts as "acceptable."** [1]\n\nChildren\'s fractures can remodel — but ONLY in the plane of joint motion. **Rotation does NOT remodel.** Any malrotation must be corrected.\n\n**ACCEPTABLE ANGULATION BY AGE:**\n• <10 years: up to 15–20° sagittal angulation may remodel\n• 10–16 years: less tolerance — aim for <10° angulation\n• Younger children tolerate more because more growth remaining\n\n**BUCKLE (TORUS) FRACTURES:**\n• Compression failure of one cortex — inherently stable\n• Removable splint for 3–4 weeks, no reduction needed\n• Evidence supports removable splint equal to casting [1]\n\n**GREENSTICK FRACTURES:**\n• Incomplete fracture — one cortex intact\n• May need reduction if significantly angulated\n• Do NOT complete the fracture — the intact cortex provides stability\n\n**GROWTH PLATE RISK:**\n• Delayed reduction increases risk of growth plate injury\n• Physeal fractures (Salter-Harris) → reduce early\n• Radial neck fractures in children: delayed reduction risks permanent growth arrest [1]\n\n**KEY DIFFERENCE:** Children tolerate more angulation but are less forgiving of delays. Reduce promptly if needed.',
    citation: [1],
    next: 'dr-assess',
  },

];

export const DISTAL_RADIUS_NODE_COUNT = DISTAL_RADIUS_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const DISTAL_RADIUS_MODULE_LABELS = [
  'Assessment',
  'Analgesia',
  'TRAMP Reduction',
  'Post-Reduction',
  'Special Populations',
];

// -------------------------------------------------------------------
// Evidence Citations (13 references)
// -------------------------------------------------------------------

export const DISTAL_RADIUS_CITATIONS: Citation[] = [
  { num: 1, text: 'Sayal A. Fracture Reduction Demonstration. Emergency Medicine Cases. YouTube. https://www.youtube.com/watch?v=vAk_Ns76xVI' },
  { num: 2, text: 'AO Surgery Reference. Distal Radius — Splinting and Positioning. AO Foundation. https://surgeryreference.aofoundation.org/' },
  { num: 3, text: 'Fink PB, Wheeler AR, Smith WR, et al. Wilderness Medical Society Clinical Practice Guidelines for Treatment of Acute Pain in Austere Environments: 2024 Update. Wilderness Environ Med. 2024;35(2):198-218.' },
  { num: 4, text: 'Hagness C, Golding M, Varndell W. Use and Efficacy of Haematoma Blocks in Managing Closed Reduction of Distal Radius Fractures by ENPs. Injury. 2025;56(8):112526.' },
  { num: 5, text: 'Gawel RJ, Chen AE. Ultrasound-Guided Hematoma Block for Distal Forearm Fracture Reduction in Adolescent With Difficult Airway. Pediatr Emerg Care. 2025;41(2):143-145.' },
  { num: 6, text: 'Singh A, Khalil P. POCUS-Guided Hematoma Block for Forearm Fracture Reduction. Pediatr Emerg Care. 2021;37(10):533-535.' },
  { num: 7, text: 'Fathi M, Moezzi M, Abbasi S, et al. Ultrasound-Guided Hematoma Block in Distal Radial Fracture Reduction: A Randomised Clinical Trial. Emerg Med J. 2015;32(6):474-7.' },
  { num: 8, text: 'Gottlieb M, Cosby K. Ultrasound-Guided Hematoma Block for Distal Radial and Ulnar Fractures. J Emerg Med. 2015;48(3):310-2.' },
  { num: 9, text: 'Handoll HH, Madhok R, Dodds C. Anaesthesia for Treating Distal Radial Fracture in Adults. Cochrane Database Syst Rev. 2002;(3):CD003320.' },
  { num: 10, text: 'Oakley B, Busby C, Kulkarni S, et al. Bier\'s Block vs Haematoma Block for Manipulation of Distal Radial Fractures. Ann R Coll Surg Engl. 2023;105(5):434-440.' },
  { num: 11, text: 'Guirguis J, et al. Regional Anaesthesia vs Haematoma Block in Distal Radius Fracture Management. Injury. 2025;56(12):112815.' },
  { num: 12, text: 'Christensen AB, et al. Ultrasound-Guided Nerve Blocks Improve Success of Closed Reduction of Colles\' Fractures: A Randomised Controlled Trial. Acta Anaesthesiol Scand. 2025;69(6):e70063.' },
  { num: 13, text: 'Rook B, et al. Ultrasound-guided Axillary Nerve Block vs Fracture Hematoma Block for Forearm Fracture Analgesia: A Randomised Controlled Trial. Am J Emerg Med. 2025;100:175-181.' },
];

// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------

export const DISTAL_RADIUS_CLINICAL_NOTES: string[] = [
  '"Obtain & Maintain" framework — two questions for every fracture: Is the current position acceptable? Will it shift?',
  'TRAMP mnemonic: Traction → Reduction → Apply → Mold → Position.',
  'Hematoma block reduces ED time to 1.5 hours vs 4.6 hours for procedural sedation.',
  'Plaster over fiberglass when molding matters — fiberglass sets too rigid too fast.',
  'Apply 10 layers of 6-inch plaster with minimal padding (2 layers Webril) at the fracture site.',
  'Mold with flat hands creating an oval cross-section. Do NOT squeeze. Do NOT move hands while setting.',
  '"Straight cast = crooked bone, crooked cast = straight bone" — a round cast cannot resist displacement.',
  'Post-reduction: 2nd metacarpal line parallel to radius, cast index <0.80 confirms adequate mold.',
  'Pediatric remodeling occurs in the plane of joint motion only — rotation does NOT remodel.',
  'Delayed pediatric reduction risks growth plate injury — reduce promptly if needed.',
];
