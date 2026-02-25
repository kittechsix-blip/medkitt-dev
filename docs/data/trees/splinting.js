// MedKitt — Splint Recommendations (Adults)
// Hub-and-spoke reference lookup: body region → fracture-splint mapping → application technique.
// 5 modules: Overview → Humerus → Forearm → Wrist & Hand → Lower Extremity
// 17 nodes total.
// Source: ALiEM Splinter Series, WikEM, Boyd et al. (2009), Eiff & Hatch (2018), multiple authors
export const SPLINTING_NODES = [
    // =====================================================================
    // MODULE 1: OVERVIEW
    // =====================================================================
    {
        id: 'splint-start',
        type: 'question',
        module: 1,
        title: 'Splint Recommendations (Adults)',
        body: '[General Splinting Principles](#/info/splint-principles) — materials, padding, technique, neurovascular checks.\n[Quick Reference Table](#/info/splint-summary) — all fractures → splint types at a glance.\n\n**Select a body region:**',
        images: [
            {
                src: 'images/splinting/proper-application.png',
                alt: 'Illustration showing proper splint application technique with plaster dipped in lukewarm water, smoothed in layers, and molded with flat palms to avoid pressure points',
                caption: 'General splinting technique: Dip plaster in lukewarm water, smooth layers, mold with flat palms (not fingers).',
            },
            {
                src: 'images/splinting/splint-position.png',
                alt: 'Reference diagram showing joints in position of function for splint immobilization including wrist extension, MCP flexion, and ankle neutral',
                caption: 'Position of function: Maintain joint positioning unless otherwise specified by fracture type.',
            },
        ],
        options: [
            {
                label: 'Humerus',
                description: 'Proximal, shaft, supracondylar',
                next: 'splint-humerus',
            },
            {
                label: 'Forearm',
                description: 'Olecranon, radius/ulna, distal',
                next: 'splint-forearm',
            },
            {
                label: 'Wrist & Hand',
                description: 'Carpal, metacarpal, phalanx',
                next: 'splint-wrist-hand',
            },
            {
                label: 'Lower Extremity',
                description: 'Ankle, foot, distal tib/fib',
                next: 'splint-lower-ext',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: HUMERUS
    // =====================================================================
    {
        id: 'splint-humerus',
        type: 'question',
        module: 2,
        title: 'Humerus',
        body: '**FRACTURE → SPLINT GUIDE**\n\n• **Proximal humerus** → Sling / cuff and collar [9][10]\n• **Humeral shaft** → Coaptation splint (→ functional brace at 1–2 weeks) [7][8]\n• **Supracondylar (adult)** → Long arm posterior splint or double sugar tong [3][6]',
        citation: [3, 6, 7, 8, 9, 10],
        options: [
            {
                label: 'Sling / Cuff & Collar',
                description: 'Proximal humerus fractures',
                next: 'splint-sling',
            },
            {
                label: 'Coaptation Splint',
                description: 'Humeral shaft fractures',
                next: 'splint-coaptation',
            },
            {
                label: 'Long Arm Posterior',
                description: 'Supracondylar, elbow fractures',
                next: 'splint-long-arm-post',
            },
            {
                label: 'Double Sugar Tong',
                description: 'Unstable supracondylar fractures',
                next: 'splint-double-sugar-tong',
            },
        ],
    },
    {
        id: 'splint-sling',
        type: 'info',
        module: 2,
        title: 'Sling / Cuff & Collar',
        body: '**INDICATIONS**\n• Proximal humerus fracture (non-displaced or minimally displaced)\n• Greater tuberosity fracture\n• Shoulder dislocation post-reduction\n\n**MATERIALS**\n• Standard triangular arm sling OR cuff and collar\n• Swathe (elastic bandage around torso) for added stability if needed\n\n**APPLICATION**\n1. Arm rests in sling with elbow at 90° flexion\n2. Forearm supported across the body\n3. Wrist should be neutral (not dangling)\n4. If swathe used: wrap elastic bandage around upper arm and torso to prevent arm abduction\n\n**POSITION**\n• Elbow at 90°, arm adducted against the body\n• Allow gentle pendulum exercises (Codman exercises) after 1–2 days to prevent shoulder stiffness\n\n**PEARLS**\n• PROFHER trial (2015): sling alone is equivalent to surgery for most displaced proximal humerus fractures in adults [9]\n• Ensure padding under axilla if swathe is used — prevents skin breakdown\n• Avoid prolonged full immobilization (>2 weeks) — frozen shoulder risk\n• No imaging needed for isolated greater tuberosity fractures with <5mm displacement',
        citation: [3, 9, 10],
        next: 'splint-humerus',
    },
    {
        id: 'splint-coaptation',
        type: 'info',
        module: 2,
        title: 'Coaptation Splint',
        body: '**INDICATIONS**\n• Humeral shaft fracture (midshaft diaphyseal)\n• Initial stabilization before functional bracing\n\n**MATERIALS**\n• 6-inch plaster or fiberglass (10–12 layers)\n• Stockinette, 3–4 layers Webril, elastic bandage\n• Arm sling\n\n**APPLICATION**\n1. Measure from axilla, down medial arm, around the elbow, back up lateral arm to the deltoid insertion (U-shape)\n2. Apply stockinette and Webril padding — **extra padding in axilla and over olecranon**\n3. Dip plaster in lukewarm water, squeeze excess, apply in U-shape\n4. Mold plaster snugly around medial arm, elbow, and lateral arm\n5. Secure with elastic bandage — wrap distally to proximally\n6. Place arm in sling with elbow at 90°\n\n**POSITION**\n• Elbow at 90° flexion\n• Arm adducted against torso\n• Forearm in neutral rotation\n\n**TRANSITION TO FUNCTIONAL BRACE**\nAt 1–2 weeks: convert to a prefabricated humeral functional brace. Sarmiento (2000): 98% union rate with functional bracing, mean angulation <8° [8]. FISH trial (2020): functional bracing was non-inferior to surgery for closed humeral shaft fractures [7].\n\n**PEARLS**\n• Do NOT wrap plaster circumferentially — this is a splint, not a cast\n• The U-shape provides medial-lateral stability while allowing swelling\n• A common mistake: splint too short — must extend well above the fracture\n• Check radial nerve function before and after application (wrist drop = radial nerve palsy)',
        citation: [3, 6, 7, 8],
        images: [
            {
                src: 'images/splinting/coaptation.png',
                alt: 'Illustration showing coaptation splint applied in U-shape from axilla around the elbow to the deltoid, secured with elastic bandage and arm sling',
                caption: 'Coaptation splint: U-shape from axilla around elbow to deltoid. Arm in sling at 90°.',
            },
            {
                src: 'images/splinting/functional-brace.png',
                alt: 'Photograph of a humeral functional brace for midshaft fractures, showing the prefabricated clamshell design that allows elbow and shoulder motion',
                caption: 'Functional brace: Transition at 1–2 weeks. 98% union rate (Sarmiento 2000).',
            },
        ],
        next: 'splint-humerus',
    },
    {
        id: 'splint-long-arm-post',
        type: 'info',
        module: 2,
        title: 'Long Arm Posterior Splint',
        body: '**INDICATIONS**\n• Supracondylar fracture (adult)\n• Olecranon fracture (non-operative)\n• Coronoid fracture\n• Proximal radius/ulna fracture\n• Elbow dislocation post-reduction\n\n**MATERIALS**\n• 4-inch plaster or fiberglass (10–12 layers)\n• Stockinette, 3–4 layers Webril, elastic bandage\n\n**APPLICATION**\n1. Measure from proximal palmar crease to mid-upper arm (posterior surface)\n2. Apply stockinette from hand to upper arm\n3. Apply Webril — **extra padding over olecranon and ulnar styloid**\n4. Apply plaster slab along posterior surface of forearm and arm\n5. Mold at the elbow to maintain 90° flexion\n6. Secure with elastic bandage — wrap distally to proximally\n7. Ensure fingers and thumb have full ROM\n\n**POSITION**\n• Elbow at 90° flexion\n• Forearm in neutral rotation (thumb pointing up)\n• Wrist in slight extension (15–20°)\n\n**PEARLS**\n• Splint should be wide enough to cover >50% of the arm circumference for stability\n• Must NOT extend past the proximal palmar crease — allow full MCP flexion\n• For supracondylar fractures: ensure the anterior humeral line bisects the capitellum on lateral x-ray post-splinting\n• Neurovascular check: median, radial, ulnar nerve function + radial pulse + capillary refill',
        citation: [3, 5, 6],
        images: [
            {
                src: 'images/splinting/long-arm-posterior.png',
                alt: 'Illustration showing long arm posterior splint extending from proximal palmar crease along the posterior forearm and arm to mid-upper arm with elbow at 90 degrees',
                caption: 'Long arm posterior: Posterior slab from palm to upper arm. Elbow at 90°, forearm neutral.',
            },
        ],
        next: 'splint-humerus',
    },
    // =====================================================================
    // MODULE 3: FOREARM
    // =====================================================================
    {
        id: 'splint-forearm',
        type: 'question',
        module: 3,
        title: 'Forearm',
        body: '**FRACTURE → SPLINT GUIDE**\n\n• **Olecranon / coronoid** → Long arm posterior splint\n• **Radius/ulna proximal or midshaft** → Long arm posterior, or double sugar tong (unstable/complex)\n• **Radius distal, isolated** → Thumb spica or volar\n• **Radius/ulna distal, complex** → Sugar tong (**A+P preferred at our institution**) [1][2]\n• **Ulna styloid** → Sugar tong (**A+P preferred**) [1][2]\n\n**INSTITUTION PREFERENCE:** A+P (anterior + posterior) splints are preferred over sugar tong for forearm and distal radius/ulna fractures. Two separate plaster slabs — no wrapping around the elbow — provides equivalent stabilization with less bulk and better patient comfort.',
        citation: [1, 2, 3],
        options: [
            {
                label: 'Sugar Tong (Single)',
                description: 'Distal forearm fractures + A+P alternative',
                next: 'splint-sugar-tong',
            },
            {
                label: 'Double Sugar Tong',
                description: 'Supracondylar + distal forearm combined',
                next: 'splint-double-sugar-tong',
            },
            {
                label: 'Long Arm Posterior',
                description: 'Olecranon, proximal radius/ulna',
                next: 'splint-long-arm-post',
            },
            {
                label: 'Thumb Spica',
                description: 'Isolated distal radius, scaphoid',
                next: 'splint-thumb-spica',
            },
            {
                label: 'Volar Splint',
                description: 'Isolated distal radius, non-displaced',
                next: 'splint-volar',
            },
        ],
    },
    {
        id: 'splint-sugar-tong',
        type: 'info',
        module: 3,
        title: 'Sugar Tong (Single) + A+P Alternative',
        body: '**INDICATIONS**\n• Distal radius and/or ulna fracture\n• Colles fracture (dorsally displaced distal radius)\n• Smith fracture (volar displaced distal radius)\n• Barton fracture\n\n**MATERIALS**\n• 4-inch plaster (10 layers)\n• Stockinette, 3–4 layers Webril, elastic bandage\n\n**SUGAR TONG APPLICATION**\n1. Measure from dorsal MCP joints, around the elbow, to the palmar crease\n2. Apply stockinette and Webril — **extra padding over olecranon and both styloids**\n3. Apply plaster slab from dorsal hand, along dorsal forearm, around the flexed elbow (90°), along volar forearm to palmar crease\n4. Mold the wrist: slight flexion (10°) + ulnar deviation for Colles; neutral for Smith\n5. Secure with elastic bandage\n6. Ensure thumb and fingers remain free\n\n**A+P SPLINT ALTERNATIVE (PREFERRED)**\nInstead of wrapping around the elbow:\n1. Apply a **posterior slab** from dorsal MCP joints to proximal forearm\n2. Apply an **anterior (volar) slab** from palmar crease to proximal forearm\n3. Secure both with elastic bandage\n4. Provides equivalent AP stability without elbow restriction\n5. Better patient comfort, easier to adjust, less risk of elbow stiffness\n\n**POSITION**\n• Wrist: 10° flexion + ulnar deviation (dorsal displacement)\n• Forearm: neutral rotation\n• Elbow (sugar tong only): 90° flexion\n\n**PEARLS**\n• A+P eliminates the need to wrap around the elbow while maintaining AP stability\n• Sugar tong prevents pronation/supination — use when rotational control is critical\n• For Colles: mold the volar slab into slight flexion and ulnar deviation with 3-point pressure\n• Check capillary refill, sensation, and finger ROM after application\n\n**INSTITUTION NOTE**\nA+P splints preferred over sugar tong — no wrapping around elbow. [1][2]',
        citation: [1, 2, 3, 4, 5],
        images: [
            {
                src: 'images/splinting/sugar-tong.png',
                alt: 'Illustration showing single sugar tong splint extending from dorsal hand around the flexed elbow to the palmar crease, with elbow at 90 degrees',
                caption: 'Sugar tong: Dorsal hand → around elbow → palmar crease. A+P alternative: two separate slabs, no elbow wrap.',
            },
        ],
        next: 'splint-forearm',
    },
    {
        id: 'splint-double-sugar-tong',
        type: 'info',
        module: 3,
        title: 'Double Sugar Tong',
        body: '**INDICATIONS**\n• Supracondylar fracture with concurrent distal forearm fracture\n• Highly unstable distal radius/ulna fractures requiring rotational and AP control\n• Complex elbow fracture-dislocations (temporary stabilization)\n\n**MATERIALS**\n• 4-inch plaster (10 layers) — TWO separate slabs\n• Stockinette, 3–4 layers Webril, elastic bandage\n\n**APPLICATION**\n1. **First slab (forearm sugar tong):** From dorsal MCP joints, along dorsal forearm, around the elbow, along volar forearm to palmar crease — identical to standard sugar tong\n2. **Second slab (arm sugar tong):** From lateral upper arm, around the elbow, to medial upper arm — provides additional medial-lateral stability at the elbow\n3. Apply stockinette and Webril before EACH slab\n4. Mold the wrist in slight flexion + ulnar deviation (if distal fracture present)\n5. Secure each slab with elastic bandage\n6. Confirm elbow at 90° flexion\n\n**POSITION**\n• Elbow at 90° flexion\n• Forearm in neutral rotation\n• Wrist in slight flexion + ulnar deviation if distal fracture present\n\n**PEARLS**\n• Provides the most stability of any splint for the upper extremity — controls AP, medial-lateral, and rotational forces\n• Bulky and uncomfortable — use only when maximum stability is required\n• Two slabs allow for swelling — safer than circumferential casting in the acute setting\n• Monitor for compartment syndrome — especially with combined fractures\n• Mark the elastic bandage layers clearly so the patient can loosen if swelling increases',
        citation: [3, 5, 6],
        images: [
            {
                src: 'images/splinting/double-sugar-tong.png',
                alt: 'Illustration showing double sugar tong splint with two overlapping plaster slabs providing forearm and upper arm stabilization around the elbow',
                caption: 'Double sugar tong: Two slabs for maximum stability. Forearm + arm sugar tong combined.',
            },
        ],
        next: 'splint-forearm',
    },
    // =====================================================================
    // MODULE 4: WRIST & HAND
    // =====================================================================
    {
        id: 'splint-wrist-hand',
        type: 'question',
        module: 4,
        title: 'Wrist & Hand',
        body: '**FRACTURE → SPLINT GUIDE**\n\n**Carpal Bones**\n• Scaphoid, trapezium, lunate fracture → Thumb spica [3][6]\n• Lunate dislocation → Sugar tong (**A+P preferred**) [1]\n• Triquetrum, pisiform, trapezoid, capitate, hamate → Volar splint [3]\n\n**Soft Tissue**\n• UCL injury (gamekeeper/skier thumb) → Thumb spica\n• Thumb MCP dislocation → Thumb spica\n• De Quervain tenosynovitis → Thumb spica\n\n**Metacarpals**\n• 1st metacarpal (Bennett, Rolando) → Thumb spica [6]\n• 2nd / 3rd metacarpal → Radial gutter or volar [3]\n• 4th / 5th metacarpal (boxer fracture) → Ulnar gutter [3][6]\n\n**Phalanges**\n• 1st phalanx (thumb) → Thumb spica\n• 2nd / 3rd proximal or middle → Radial gutter or buddy taping\n• 4th / 5th proximal or middle → Ulnar gutter or buddy taping\n• Distal phalanx → Aluminum U-shaped (stack) splint\n\n**BUDDY TAPING:** Tape injured finger to adjacent finger with padding between. Allows protected ROM. Appropriate for stable, non-displaced proximal/middle phalanx fractures.\n\n**ALUMINUM FINGER SPLINT:** Moldable metal splint for distal phalanx fractures and mallet finger. Keep DIP in extension (stack splint). Leave PIP free.',
        citation: [1, 3, 6],
        options: [
            {
                label: 'Thumb Spica',
                description: 'Scaphoid, 1st MC, thumb injuries',
                next: 'splint-thumb-spica',
            },
            {
                label: 'Volar Splint',
                description: 'Carpal fractures, stable wrist injuries',
                next: 'splint-volar',
            },
            {
                label: 'Ulnar Gutter',
                description: '4th/5th MC, boxer fracture',
                next: 'splint-ulnar-gutter',
            },
            {
                label: 'Radial Gutter',
                description: '2nd/3rd MC and phalanx fractures',
                next: 'splint-radial-gutter',
            },
        ],
    },
    {
        id: 'splint-thumb-spica',
        type: 'info',
        module: 4,
        title: 'Thumb Spica',
        body: '**INDICATIONS**\n• Scaphoid fracture (confirmed or suspected — snuffbox tenderness)\n• Trapezium fracture\n• Lunate fracture\n• 1st metacarpal fracture (Bennett, Rolando)\n• Thumb MCP dislocation post-reduction\n• UCL injury (gamekeeper/skier thumb)\n• De Quervain tenosynovitis\n• Isolated distal radius fracture (alternative to volar)\n\n**MATERIALS**\n• 4-inch plaster or fiberglass (8–10 layers)\n• Stockinette (with thumb hole cut), 2–3 layers Webril, elastic bandage\n\n**APPLICATION**\n1. Apply stockinette to hand and forearm — **cut a thumb hole**\n2. Apply Webril — **extra padding over radial styloid and 1st MCP joint**\n3. Apply plaster slab along the radial side of the forearm, wrapping around the thumb to include the first metacarpal and thumb to the IP joint\n4. Plaster extends from mid-forearm to just past the thumb IP joint\n5. Mold the plaster around the thumb in a "C" position (thumb abducted and slightly opposed, as if holding a can)\n6. Secure with elastic bandage\n7. Ensure 2nd–5th fingers have full ROM\n\n**POSITION**\n• Wrist in 15–20° extension\n• Thumb: abducted, slightly opposed (functional position)\n• Thumb IP joint included in splint (scaphoid) or free (soft tissue only)\n\n**PEARLS**\n• For suspected scaphoid fracture with negative initial x-rays: immobilize in thumb spica for 10–14 days, then repeat imaging (MRI or repeat x-ray) [3][6]\n• The "anatomical snuffbox" tenderness test has high sensitivity (~90%) but low specificity — err on the side of splinting\n• Distinguish from volar splint: thumb spica immobilizes the thumb; volar does not\n• For UCL injuries: include the thumb MCP but leave IP free to prevent stiffness',
        citation: [3, 4, 6],
        images: [
            {
                src: 'images/splinting/thumb-spica.png',
                alt: 'Illustration showing thumb spica splint wrapping from mid-forearm around the radial side to include the thumb in a functional position with the 2nd through 5th fingers free',
                caption: 'Thumb spica: Radial forearm slab including thumb to IP joint. "C" position (holding a can).',
            },
        ],
        next: 'splint-wrist-hand',
    },
    {
        id: 'splint-volar',
        type: 'info',
        module: 4,
        title: 'Volar Splint',
        body: '**INDICATIONS**\n• Non-displaced or minimally displaced distal radius fracture\n• Triquetrum fracture (dorsal chip)\n• Pisiform, trapezoid, capitate, hamate fracture\n• 2nd / 3rd metacarpal fracture (alternative to radial gutter)\n• Carpal tunnel syndrome (night splint)\n• Wrist sprain\n• Tendon injury (initial stabilization)\n\n**MATERIALS**\n• 4-inch plaster or fiberglass (8–10 layers)\n• Stockinette, 2–3 layers Webril, elastic bandage\n\n**APPLICATION**\n1. Measure plaster from proximal palmar crease to mid-forearm (volar surface)\n2. Apply stockinette from hand to forearm\n3. Apply Webril — **extra padding over ulnar styloid**\n4. Apply plaster slab along volar surface of forearm\n5. Mold with gentle pressure — maintain wrist in slight extension\n6. Secure with elastic bandage — wrap distally to proximally\n7. Ensure thumb and all fingers have full ROM\n\n**POSITION**\n• Wrist in 15–20° extension (position of function)\n• Fingers free — must be able to make a full fist\n• Thumb completely free\n\n**PEARLS**\n• The simplest and most commonly applied ED splint\n• Does NOT control pronation/supination — if rotational control needed, use sugar tong or A+P\n• For buckle (torus) fractures in adults: volar splint with ortho follow-up in 1 week\n• Ensure splint does NOT extend past the proximal palmar crease — blocking MCP flexion causes finger stiffness\n• Can be converted to a short arm cast at follow-up if needed',
        citation: [3, 6],
        images: [
            {
                src: 'images/splinting/volar.png',
                alt: 'Illustration showing volar splint applied along the palmar surface of the forearm from proximal palmar crease to mid-forearm with all fingers and thumb free',
                caption: 'Volar splint: Volar forearm slab. Simplest ED splint. All fingers and thumb free.',
            },
        ],
        next: 'splint-wrist-hand',
    },
    {
        id: 'splint-ulnar-gutter',
        type: 'info',
        module: 4,
        title: 'Ulnar Gutter',
        body: '**INDICATIONS**\n• 4th metacarpal fracture\n• 5th metacarpal fracture (boxer fracture)\n• 4th / 5th proximal phalanx fracture\n• 4th / 5th middle phalanx fracture (non-displaced)\n\n**MATERIALS**\n• 4-inch plaster or fiberglass (8–10 layers)\n• Stockinette, 2–3 layers Webril, elastic bandage\n• Finger separator padding (cotton between 3rd and 4th fingers)\n\n**APPLICATION**\n1. Place cotton padding between 3rd and 4th fingers\n2. Apply stockinette from fingertips (4th and 5th digits) to mid-forearm\n3. Apply Webril — **extra padding over ulnar styloid and 5th MCP**\n4. Apply plaster slab along the ulnar side of the forearm and hand, extending from mid-forearm to the fingertips of the 4th and 5th digits\n5. Mold the plaster around the ulnar border of the hand\n6. Ensure the MCP joints are in **70–90° flexion** (critical!)\n7. IP joints in slight flexion (10–20°) or comfortable position\n8. Secure with elastic bandage\n\n**POSITION**\n• Wrist in 20–30° extension\n• **MCP joints at 70–90° flexion** — this is the most important positioning element\n• IP joints in slight flexion\n\n**WHY 70–90° MCP FLEXION?**\nThe collateral ligaments of the MCP joints are taut in flexion and lax in extension. Immobilizing in extension allows the ligaments to shorten → permanent MCP stiffness ("intrinsic minus" hand). [3][6]\n\n**PEARLS**\n• Boxer fractures (5th MC neck) with <40° angulation and no rotational deformity: ulnar gutter splint with ortho follow-up [6]\n• Always check for rotational malignment: have the patient flex fingers into a fist — all fingertips should point toward the scaphoid tubercle\n• The "fight bite" rule: ANY laceration over the MCP from a punch is an open joint until proven otherwise → irrigate, antibiotics, hand surgery consult\n• 3rd finger should be left free when possible to improve function',
        citation: [3, 5, 6],
        images: [
            {
                src: 'images/splinting/ulnar-gutter.png',
                alt: 'Illustration showing ulnar gutter splint extending from mid-forearm along the ulnar border to the 4th and 5th fingertips with MCP joints flexed at 70 to 90 degrees',
                caption: 'Ulnar gutter: MCP at 70–90° flexion (critical). Ulnar forearm slab to 4th/5th fingertips.',
            },
        ],
        next: 'splint-wrist-hand',
    },
    {
        id: 'splint-radial-gutter',
        type: 'info',
        module: 4,
        title: 'Radial Gutter',
        body: '**INDICATIONS**\n• 2nd metacarpal fracture\n• 3rd metacarpal fracture\n• 2nd / 3rd proximal phalanx fracture\n• 2nd / 3rd middle phalanx fracture (non-displaced)\n\n**MATERIALS**\n• 4-inch plaster or fiberglass (8–10 layers)\n• Stockinette, 2–3 layers Webril, elastic bandage\n• Finger separator padding (cotton between 3rd and 4th fingers)\n\n**APPLICATION**\nMirror image of the ulnar gutter splint, applied to the radial side:\n1. Place cotton padding between 3rd and 4th fingers\n2. Apply stockinette from fingertips (2nd and 3rd digits) to mid-forearm\n3. Apply Webril — **extra padding over radial styloid and 2nd MCP**\n4. Apply plaster slab along the radial side of the forearm and hand, extending from mid-forearm to the fingertips of the 2nd and 3rd digits\n5. Mold plaster around the radial border of the hand\n6. Ensure MCP joints at **70–90° flexion**\n7. IP joints in slight flexion (10–20°)\n8. Secure with elastic bandage\n\n**POSITION**\n• Wrist in 20–30° extension\n• **MCP joints at 70–90° flexion**\n• IP joints in slight flexion\n\n**PEARLS**\n• Same principles as ulnar gutter — MCP flexion is critical to prevent collateral ligament contracture\n• Always check for rotational malignment before splinting\n• 2nd and 3rd metacarpal fractures tolerate LESS angulation than 4th/5th (more rigid carpometacarpal joints)\n• If 2nd or 3rd MC is significantly angulated (>10°) → ortho referral, may need operative fixation\n• Can also use a volar splint for non-displaced 2nd/3rd MC fractures if gutter splint is not available',
        citation: [3, 6],
        next: 'splint-wrist-hand',
    },
    // =====================================================================
    // MODULE 5: LOWER EXTREMITY
    // =====================================================================
    {
        id: 'splint-lower-ext',
        type: 'question',
        module: 5,
        title: 'Lower Extremity',
        body: '**FRACTURE → SPLINT GUIDE**\n\n• **Distal tibia or distal fibula** → Posterior short leg (± stirrup for added stability) [3][6]\n• **Ankle sprain grade 2/3** → Stirrup splint [3]\n• **Talus, calcaneus, navicular, cuboid, cuneiform** → Posterior short leg [3][6]\n• **Metatarsal (2nd–5th)** → Posterior short leg or hard-soled shoe [3]\n• **Lisfranc** → Posterior short leg (non-weight bearing, ortho follow-up) [6]\n\n**5th METATARSAL SPECIAL CASES:**\n• Zone 1 (tuberosity/pseudo-Jones) → Hard-soled shoe, weight bear as tolerated\n• Zone 2 (Jones fracture, metaphyseal-diaphyseal junction) → Posterior short leg, non-weight bearing, ortho follow-up (high nonunion risk)\n• Zone 3 (shaft stress fracture) → Posterior short leg, non-weight bearing',
        citation: [3, 6],
        options: [
            {
                label: 'Posterior Short Leg',
                description: 'Ankle, foot, distal tib/fib',
                next: 'splint-post-short-leg',
            },
            {
                label: 'Stirrup Splint',
                description: 'Ankle sprains, lateral malleolus',
                next: 'splint-stirrup',
            },
        ],
    },
    {
        id: 'splint-post-short-leg',
        type: 'info',
        module: 5,
        title: 'Posterior Short Leg',
        body: '**INDICATIONS**\n• Distal tibia fracture (non-operative)\n• Distal fibula (lateral malleolus) fracture\n• Bimalleolar / trimalleolar ankle fracture (initial stabilization)\n• Talus, calcaneus, navicular, cuboid, cuneiform fracture\n• Metatarsal fracture (non-displaced)\n• Jones fracture (5th MT zone 2)\n• Lisfranc injury\n• Achilles tendon rupture (initial, with ankle in plantarflexion)\n\n**MATERIALS**\n• 6-inch plaster (12–15 layers for adults)\n• Stockinette, 3–4 layers Webril, elastic bandage\n\n**APPLICATION**\n1. Patient prone with knee flexed to 90° (foot accessible) or seated with foot hanging off stretcher\n2. Apply stockinette from toes to mid-calf\n3. Apply Webril — **extra padding over malleoli, calcaneus, and Achilles tendon**\n4. Measure plaster from toe base to just below the knee on the posterior surface\n5. Dip plaster in lukewarm water, squeeze, apply along posterior leg from toes to tibial tuberosity\n6. Fold plaster at the toes to create a smooth edge and foot plate\n7. **Mold the ankle at 90° dorsiflexion** (neutral) — this is the critical position\n8. Smooth plaster with flat palms\n9. Secure with elastic bandage — start at toes, wrap proximally\n\n**POSITION**\n• **Ankle at 90° (neutral dorsiflexion)** — prevents equinus contracture\n• Subtalar joint in neutral (not inverted or everted)\n• Exception: Achilles rupture — 20° plantarflexion\n\n**ADDING A STIRRUP**\nFor additional medial-lateral stability (bimalleolar/trimalleolar fractures):\n• Apply a U-shaped plaster slab from medial mid-calf, under the heel, to lateral mid-calf\n• Apply over the posterior slab before elastic bandage\n\n**PEARLS**\n• This is the workhorse lower extremity ED splint — covers almost everything\n• Must extend to the toes to prevent metatarsal/forefoot fractures from shifting\n• Extra Webril over Achilles prevents pressure necrosis (a common complication)\n• Plaster slab should be wider than the posterior leg — wrap the edges around the sides for better contouring\n• Always assess: dorsalis pedis pulse, posterior tibial pulse, sensation in all foot compartments',
        citation: [3, 6],
        images: [
            {
                src: 'images/splinting/post-short-leg.png',
                alt: 'Illustration showing posterior short leg splint applied along the posterior surface from toes to just below the knee with ankle held at 90 degrees neutral dorsiflexion',
                caption: 'Posterior short leg: Posterior slab toes to tibial tuberosity. Ankle at 90° (neutral). Add stirrup for stability.',
            },
        ],
        next: 'splint-lower-ext',
    },
    {
        id: 'splint-stirrup',
        type: 'info',
        module: 5,
        title: 'Stirrup Splint',
        body: '**INDICATIONS**\n• Ankle sprain grade 2 (moderate — partial ligament tear)\n• Ankle sprain grade 3 (severe — complete ligament tear)\n• Isolated lateral malleolus fracture (stable, non-displaced)\n• Supplemental stability for posterior short leg splint\n\n**MATERIALS**\n• 4-inch plaster (8–10 layers)\n• Stockinette, 2–3 layers Webril, elastic bandage\n\n**APPLICATION**\n1. Apply stockinette from toes to mid-calf\n2. Apply Webril — **extra padding over both malleoli**\n3. Measure plaster from medial mid-calf, under the heel, to lateral mid-calf (U-shape)\n4. Dip plaster, squeeze excess\n5. Apply U-shaped slab: medial leg → under heel → lateral leg\n6. **Mold at 90° dorsiflexion** — maintain neutral ankle position\n7. Secure with elastic bandage\n8. Toes should remain visible and mobile\n\n**POSITION**\n• Ankle at 90° (neutral dorsiflexion)\n• Subtalar joint neutral — not inverted or everted\n\n**STIRRUP ALONE vs. WITH POSTERIOR SLAB**\n• **Stirrup alone:** Grade 2/3 ankle sprains — provides medial-lateral stability while allowing some plantarflexion/dorsiflexion for early mobilization\n• **Stirrup + posterior slab:** Fractures — maximum stability, prevents all ankle motion\n\n**PEARLS**\n• For ankle sprains: stirrup alone allows early protected motion, which improves healing compared to rigid immobilization [3]\n• The U-shape prevents inversion/eversion — the mechanism of most ankle sprains\n• Air splint (Aircast) can be substituted for stable grade 2 sprains and is easier for the patient to remove for icing and exercises\n• Ottawa Ankle Rules: no splint needed if rules are negative — patients can weight-bear with support\n• Always assess: anterior drawer test, squeeze test (syndesmosis), and base of 5th metatarsal (associated fracture)',
        citation: [3, 6],
        images: [
            {
                src: 'images/splinting/stirrup.png',
                alt: 'Illustration showing stirrup splint applied in U-shape from medial mid-calf under the heel to lateral mid-calf providing medial-lateral ankle stability',
                caption: 'Stirrup: U-shape medial → under heel → lateral. Provides medial-lateral stability. Add posterior slab for fractures.',
            },
        ],
        next: 'splint-lower-ext',
    },
];
export const SPLINTING_NODE_COUNT = SPLINTING_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const SPLINTING_MODULE_LABELS = [
    'Overview',
    'Humerus',
    'Forearm',
    'Wrist & Hand',
    'Lower Extremity',
];
// -------------------------------------------------------------------
// Evidence Citations (10 references)
// -------------------------------------------------------------------
export const SPLINTING_CITATIONS = [
    { num: 1, text: 'Cheng J, Balch H, Guthrie D. "The Splinter Series." ALiEM (Academic Life in Emergency Medicine). https://www.aliem.com/splinter-series/' },
    { num: 2, text: 'WikEM. "Splinting." wikem.org/wiki/Splinting.' },
    { num: 3, text: 'Boyd AS, Benjamin HJ, Asplund C. Splints and Casts: Indications and Methods. Am Fam Physician. 2009;80(5):491-9.' },
    { num: 4, text: 'Patel DS, Statuta SM, Ahmed N. Common Fractures of the Radius and Ulna. Am Fam Physician. 2021;103(6):345-354.' },
    { num: 5, text: 'Black WS, Becker JA. Common Forearm Fractures in Adults. Am Fam Physician. 2009;80(10):1096-102.' },
    { num: 6, text: 'Eiff MP, Hatch RL. Fracture Management for Primary Care. 3rd ed. Elsevier; 2018.' },
    { num: 7, text: 'Rämö L, et al. Effect of Surgery vs Functional Bracing on Functional Outcome Among Patients With Closed Displaced Humeral Shaft Fractures: The FISH RCT. JAMA. 2020;323(18):1792-1801.' },
    { num: 8, text: 'Sarmiento A, et al. Functional Bracing for Fractures of the Humeral Diaphysis. JBJS. 2000;82(4):478-86.' },
    { num: 9, text: 'Rangan A, et al. Surgical vs Nonsurgical Treatment of Displaced Fractures of the Proximal Humerus: The PROFHER RCT. JAMA. 2015;313(10):1037-47.' },
    { num: 10, text: 'Simon LM, et al. Acute Shoulder Injuries in Adults. Am Fam Physician. 2023;107(5):503-512.' },
];
