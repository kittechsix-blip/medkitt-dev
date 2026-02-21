// MedKitt — Basic Echo Views (Transthoracic Echocardiography)
// Linear teaching reference: 5 standard TTE views with probe positioning, anatomy identification, and optimization tips.
// 6 modules: Intro/Overview → PLAX → PSAX → A4C → Subxiphoid → IVC
// Source: Mike Avula, 5MinSono.com (Dr. Jailyn Avila, MD) + PocketICU.com
export const ECHO_VIEWS_NODES = [
    // =====================================================================
    // MODULE 1: INTRODUCTION — PROBE, ORIENTATION, TROUBLESHOOTING
    // =====================================================================
    {
        id: 'echo-views-start',
        type: 'info',
        module: 1,
        title: 'Basic Echo: Probe & Orientation',
        body: 'PROBE SELECTION\nThe probe of choice is the cardiac (phased array) probe — its small footprint fits between rib spaces. If unavailable, the curvilinear probe can be used as a substitute.\n\nPROBE ORIENTATION\nTwo conventions exist and you MUST know which your machine uses:\n\n• Standard mode — indicator on the LEFT of the screen. Probe marker points to patient\'s right side or head.\n• Cardiac mode — indicator on the RIGHT of the screen. Probe marker directions are flipped.\n\nThink of the heart as an upside-down cone:\n• Long axis (PLAX): In cardiac mode, probe marker → patient\'s RIGHT SHOULDER\n• Short axis (PSAX): In cardiac mode, probe marker → patient\'s LEFT SHOULDER\n\nIf your image looks flipped (e.g., LV on the wrong side), check: (1) is the screen in cardiac or standard mode? (2) where is the probe marker pointing?\n\nGETTING BETTER VIEWS\n• Use plenty of ultrasound gel\n• Apply firm pressure (push until the patient says "ow")\n• Move in a circular pattern to find the window\n• Left lateral decubitus position brings the heart closer to the chest wall\n• Have the patient raise their arm above their head',
        citation: [1, 2],
        images: [
            {
                src: 'images/echo-views/probe.png',
                alt: 'S4-2 phased array cardiac ultrasound probe',
                caption: 'Phased array probe (S4-2): preferred for transthoracic echo due to small footprint.',
            },
            {
                src: 'images/echo-views/clock-diagram.png',
                alt: 'Clock diagram showing probe indicator directions for PLAX (4 o\'clock), PSAX (7 o\'clock), Subxiphoid/A4C (9 o\'clock), and IVC (12 o\'clock)',
                caption: 'Probe indicator directions by view (standard mode).',
            },
            {
                src: 'images/echo-views/better-views-tips.png',
                alt: 'Four tips for better echo views: more jelly, firm pressure, circular window search, and left lateral decubitus positioning',
                caption: 'Troubleshooting: Jelly → Pressure → Window → Position.',
            },
        ],
        next: 'echo-views-overview',
    },
    {
        id: 'echo-views-overview',
        type: 'info',
        module: 1,
        title: 'The Basic Echo Views of POCUS',
        body: 'SUGGESTED PROTOCOL ORDER\nDevelop a systematic approach — always scan in the same sequence:\n\n1. Parasternal Long Axis (PLAX)\n2. Parasternal Short Axis (PSAX) — rotate 90° from PLAX\n3. Apical 4-Chamber (A4C) — slide down to the apex\n4. Subxiphoid 4-Chamber — move to the subxiphoid region\n5. Subcostal IVC — rotate to longitudinal, aim cephalad\n\nEach view shows different structures and provides unique information. The following modules walk through each view one at a time.',
        citation: [1],
        images: [
            {
                src: 'images/echo-views/focus-overview.png',
                alt: 'Overview of the four basic FoCUS echo windows on the chest: PLAX, PSAX, Apical 4-chamber, and Subxiphoid, each with corresponding ultrasound image and anatomic diagram',
                caption: 'The basic views of Focused Cardiac Ultrasound (FoCUS) with probe positions and corresponding anatomy.',
            },
        ],
        next: 'echo-views-plax',
    },
    // =====================================================================
    // MODULE 2: PARASTERNAL LONG AXIS (PLAX)
    // =====================================================================
    {
        id: 'echo-views-plax',
        type: 'info',
        module: 2,
        title: 'Parasternal Long Axis (PLAX)',
        body: 'PROBE POSITION\nPlace the probe at the nipple line (4th intercostal space), right next to the sternum. Keep perpendicular to the skin. In cardiac mode, the probe marker points toward the patient\'s right shoulder.\n\nOPTIMIZING THE VIEW\n• Hug the sternum as you slide up and down rib spaces to find the best window\n• Tilt and rock the probe to center the heart on screen\n• If the image is poor, try one interspace higher or lower\n\nTHE 3 L\'s TO SUCCESS\nThe parasternal Long axis should have the Left ventricle on the Left side of the screen.\nThe cardiac septum should be horizontal.\n\nSTRUCTURES TO IDENTIFY\n• Right ventricle (RV) — anterior, at top of screen\n• Interventricular septum (IVS)\n• Left ventricle (LV) — posterior to septum\n• Aortic valve & aortic outflow tract\n• Mitral valve (anterior & posterior leaflets)\n• Left atrium (LA)\n• Pericardium\n• Descending aorta — circular structure posterior to the LA',
        citation: [1, 2],
        images: [
            {
                src: 'images/echo-views/plax-labeled.png',
                alt: 'Parasternal long axis ultrasound view with labeled structures: right ventricular outflow tract (anterior), interventricular septum, left ventricle, aorta, aortic valve, mitral valve, and left atrium (posterior). Anatomic diagram overlay in lower right.',
                caption: 'PLAX: RV outflow tract (anterior) → IVS → LV → Mitral valve → LA (posterior). Descending aorta visible behind LA.',
            },
        ],
        next: 'echo-views-psax',
    },
    // =====================================================================
    // MODULE 3: PARASTERNAL SHORT AXIS (PSAX)
    // =====================================================================
    {
        id: 'echo-views-psax',
        type: 'info',
        module: 3,
        title: 'Parasternal Short Axis (PSAX)',
        body: 'PROBE POSITION\nFrom the PLAX position, rotate the probe 90° clockwise. In cardiac mode, the probe marker now points toward the patient\'s left shoulder.\n\nOPTIMIZING THE VIEW\n• Keep the probe in the same rib space — only rotate, don\'t slide\n• The LV should appear as a circle (not an oval) — if oval, adjust your rotation angle\n\nFANNING THROUGH LEVELS\nOnce in short axis, fan (tilt) the probe to see three key levels:\n\n• Fan toward the apex (inferiorly) → Mid-papillary view\n  — Cross-section of LV at the level of the papillary muscles\n  — Two bright bumps visible inside the LV cavity\n\n• Fan toward the base (superiorly) → "Fish mouth" view\n  — Mitral valve appears as a fish mouth opening and closing\n\n• Fan further toward the base → "Mercedes-Benz" sign\n  — Aortic valve with 3 cusps forming a Mercedes-Benz logo\n\nSTRUCTURES TO IDENTIFY\n• Left ventricle (circular cross-section)\n• Right ventricle (crescent wrapping around the LV)\n• Interventricular septum\n• Anterior & posterior papillary muscles (mid-papillary level)\n• Mitral valve leaflets (base level)\n• Aortic valve cusps (base level)',
        citation: [1, 2],
        images: [
            {
                src: 'images/echo-views/psax-anatomy.png',
                alt: 'Parasternal short axis view showing cross-section of left and right ventricles at the papillary muscle level, with anatomic diagram showing anterior wall, posterior wall, septum, and papillary muscles',
                caption: 'PSAX at papillary muscle level: Circular LV with anterior and posterior papillary muscles. RV wraps around the septum.',
            },
        ],
        next: 'echo-views-a4c',
    },
    // =====================================================================
    // MODULE 4: APICAL 4-CHAMBER (A4C)
    // =====================================================================
    {
        id: 'echo-views-a4c',
        type: 'info',
        module: 4,
        title: 'Apical 4-Chamber (A4C)',
        body: 'PROBE POSITION\nSlide down to the apex of the heart — the point of maximal impulse (PMI). The probe marker should point toward the patient\'s left axilla.\n\nOPTIMIZING THE VIEW\n• Palpate the PMI first, then place the probe\n• The probe should be angled up toward the right shoulder\n• Left lateral decubitus position is especially helpful for this view\n• All four chambers should be visible with the apex at the top of the screen\n\nSTRUCTURES TO IDENTIFY\n• Left ventricle (LV) — screen left\n• Right ventricle (RV) — screen right\n• Left atrium (LA) — below LV\n• Right atrium (RA) — below RV\n• Mitral valve — between LV and LA\n• Tricuspid valve — between RV and RA\n• Interatrial septum\n• Interventricular septum\n• Papillary muscles (within LV)',
        citation: [1, 2],
        images: [
            {
                src: 'images/echo-views/a4c-anatomy.png',
                alt: 'Apical 4-chamber echocardiogram showing all four cardiac chambers (RV, LV, RA, LA), tricuspid valve, aortic valve, mitral valve, interventricular septum, interatrial septum, papillary muscles, and apex. Anatomic cross-section diagram alongside.',
                caption: 'A4C: All four chambers visible with the apex at the top. LV on the left, RV on the right.',
            },
        ],
        next: 'echo-views-subcostal',
    },
    // =====================================================================
    // MODULE 5: SUBXIPHOID 4-CHAMBER
    // =====================================================================
    {
        id: 'echo-views-subcostal',
        type: 'info',
        module: 5,
        title: 'Subxiphoid 4-Chamber',
        body: 'PROBE POSITION\nWith the patient\'s knees bent, use an overhand grip and place the probe flat in the subxiphoid region (below the xiphoid process). The probe marker should point toward the patient\'s left side.\n\nOPTIMIZING THE VIEW\n• Start on the right side and use the liver as an acoustic window — this avoids bowel gas interference\n• Have the patient take a deep breath to bring the heart into view\n• Keep the probe nearly flat against the abdomen — almost parallel to the skin\n• Apply firm downward pressure\n• If the image is still poor, try pushing slightly to the patient\'s right to use more of the liver window\n\nSTRUCTURES TO IDENTIFY\n• Liver — near field (closest to probe)\n• Right ventricle (RV) — closest cardiac chamber to the probe\n• Left ventricle (LV)\n• Right atrium (RA)\n• Left atrium (LA)\n• Pericardium — bright echogenic line surrounding the heart',
        citation: [1, 2],
        images: [
            {
                src: 'images/echo-views/subxiphoid-view.png',
                alt: 'Subxiphoid view of the heart showing anatomic diagram with liver, RV, LV, RA, LA labeled alongside corresponding ultrasound image',
                caption: 'Subxiphoid 4-chamber: Liver as acoustic window. RV is closest chamber to the probe.',
            },
        ],
        next: 'echo-views-ivc',
    },
    // =====================================================================
    // MODULE 6: SUBCOSTAL IVC
    // =====================================================================
    {
        id: 'echo-views-ivc',
        type: 'info',
        module: 6,
        title: 'Subcostal IVC',
        body: 'PROBE POSITION\nFrom the subxiphoid position, rotate to a longitudinal orientation and aim toward the patient\'s head until you see the IVC entering the right atrium.\n\nOPTIMIZING THE VIEW\n• The IVC runs parallel to the aorta — the IVC is thin-walled and compressible, the aorta is thick-walled and pulsatile\n• Use the liver as your acoustic window\n• Fan left and right to center the IVC in the long axis\n• You should see the IVC draining into the right atrium\n• The hepatic vein can be seen joining the IVC — this is your measurement landmark\n\nSTRUCTURES TO IDENTIFY\n• Inferior vena cava (IVC) — thin-walled, collapsible with respiration\n• Right atrium — where the IVC drains\n• Hepatic vein — entering the IVC\n• Liver — surrounding acoustic window\n• Aorta — nearby, thick-walled, pulsatile (don\'t confuse with IVC)',
        citation: [1, 2],
        images: [
            {
                src: 'images/echo-views/ivc-labeled.png',
                alt: 'Subcostal IVC ultrasound showing IVC entering the right atrium with labeled liver, hepatic vein (HV), portal vein (PV), and RA',
                caption: 'Subcostal IVC: IVC draining into RA. Hepatic vein (HV) and portal vein (PV) visible. Liver as acoustic window.',
            },
        ],
        next: 'echo-views-complete',
    },
    // =====================================================================
    // SUMMARY / RESULT NODE
    // =====================================================================
    {
        id: 'echo-views-complete',
        type: 'result',
        module: 6,
        title: 'Basic Echo Views — Quick Reference',
        body: 'PROTOCOL ORDER\n1. PLAX — Parasternal Long Axis\n2. PSAX — Parasternal Short Axis (90° from PLAX)\n3. A4C — Apical 4-Chamber\n4. Subxiphoid — Subxiphoid 4-Chamber\n5. IVC — Subcostal IVC',
        citation: [1, 2],
        recommendation: 'PROBE POSITION REMINDERS\n\n• PLAX: 4th ICS, next to sternum, marker → right shoulder\n• PSAX: Same spot, rotate 90° clockwise, marker → left shoulder\n• A4C: Apex / PMI, marker → left axilla\n• Subxiphoid: Below xiphoid, overhand grip, flat angle, marker → patient\'s left\n• IVC: Rotate longitudinal from subxiphoid, aim cephalad\n\nKEY TIPS\n• Phased array probe preferred (small footprint for rib spaces)\n• Know your machine\'s indicator convention (cardiac vs standard mode)\n• PLAX: "3 L\'s" — Long axis, Left ventricle, Left side of screen\n• PSAX: LV should look circular, not oval — adjust rotation if needed\n• Use the liver as acoustic window for subxiphoid and IVC views\n• Left lateral decubitus position helps for parasternal and apical views',
        confidence: 'definitive',
    },
];
/** Total node count for metadata */
export const ECHO_VIEWS_NODE_COUNT = ECHO_VIEWS_NODES.length;
// -------------------------------------------------------------------
// Module Labels
// -------------------------------------------------------------------
export const ECHO_VIEWS_MODULE_LABELS = ['Intro', 'PLAX', 'PSAX', 'A4C', 'Subxiphoid', 'IVC'];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const ECHO_VIEWS_CITATIONS = [
    { num: 1, text: 'Avula M. "Basic Transthoracic Echocardiography." 5MinSono.com. Dr. Jailyn Avila, MD.' },
    { num: 2, text: 'PocketICU.com — Cardiac ultrasound reference images and protocols.' },
];
