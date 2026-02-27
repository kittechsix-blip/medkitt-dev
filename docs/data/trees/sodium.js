// MedKitt — Sodium Disorders (Hyponatremia & Hypernatremia) Management
// Initial Assessment → HypoNa Etiology → Emergency HypoNa Rx → SIAD & Specific Causes → HyperNa Assessment → HyperNa Treatment
// 6 modules: Initial Assessment → HypoNa Etiology → Emergency HypoNa Rx → SIAD & Specific Causes → HyperNa Assessment → HyperNa Treatment
// 28 nodes total.
export const SODIUM_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'na-start',
        type: 'question',
        module: 1,
        title: 'Sodium Level',
        body: '[Sodium Disorders Steps Summary](#/info/na-summary) \u2014 stepwise management of hyponatremia and hypernatremia.\n\nWhat is the serum sodium level?\n\nConfirm result with clinical context. Consider repeating if unexpected or if sample was drawn from an IV-containing arm.',
        options: [
            {
                label: 'Hyponatremia (Na+ < 135 mEq/L)',
                next: 'na-hypo-symptoms',
            },
            {
                label: 'Hypernatremia (Na+ > 145 mEq/L)',
                next: 'na-hyper-assess',
            },
        ],
    },
    {
        id: 'na-hypo-symptoms',
        type: 'question',
        module: 1,
        title: 'Symptom Severity',
        body: 'Assess for neurological symptoms of hyponatremia. Symptom severity \u2014 not the sodium number alone \u2014 determines urgency of treatment.\n\n**Severe symptoms:**\n\u2022 Seizures\n\u2022 Obtundation or coma\n\u2022 Respiratory arrest\n\n**Moderate symptoms:**\n\u2022 Nausea and vomiting\n\u2022 Confusion or disorientation\n\u2022 Severe headache\n\n**Mild or asymptomatic:**\n\u2022 Subtle cognitive changes, gait instability, or fatigue\n\u2022 Incidental finding on labs',
        citation: [1, 5],
        options: [
            {
                label: 'Severe or Moderate Symptoms',
                description: 'Seizures, coma, respiratory arrest, vomiting, confusion',
                next: 'na-hypo-emergency',
                urgency: 'critical',
            },
            {
                label: 'Mild or Asymptomatic',
                description: 'Subtle changes, incidental finding, stable',
                next: 'na-hypo-initial',
            },
        ],
    },
    {
        id: 'na-hypo-initial',
        type: 'info',
        module: 1,
        title: 'Initial Laboratory Package',
        body: '**Order the diagnostic triad simultaneously:**\n\n\u2022 **Serum osmolality** \u2014 distinguishes true hypotonic hyponatremia from non-hypotonic causes\n\u2022 **Urine osmolality** \u2014 determines if ADH is active (>100 mOsm/kg) or suppressed (<100)\n\u2022 **Urine sodium** \u2014 distinguishes renal from extrarenal sodium losses\n\n[Hyponatremia Lab Interpretation](#/info/na-lab-interpretation) \u2014 stepwise algorithm for interpreting results\n\n**Additional labs:** BMP, Mg, Phos, TSH, cortisol (AM), glucose, lipid panel, serum protein\n\n**Give empirically:** [Thiamine](#/drug/thiamine/hyponatremia) **100 mg IV** \u2014 all patients undergoing sodium correction are at risk for osmotic demyelination syndrome (ODS), and thiamine deficiency dramatically increases this risk. [ODS Risk Factors](#/info/na-ods-risk)\n\n**Check potassium** \u2014 concurrent hypokalemia is common and must be corrected simultaneously. [Potassium Disorders](#/tree/potassium)\n\nResults typically return within 1-2 hours. Proceed to etiology once available.',
        citation: [1, 3, 8],
        next: 'na-hypo-etiology',
    },
    {
        id: 'na-hypo-etiology',
        type: 'question',
        module: 1,
        title: 'Serum Osmolality Result',
        body: 'The serum osmolality determines whether this is **true hypotonic hyponatremia** or a non-hypotonic cause.\n\n**Hypotonic (<275 mOsm/kg):** True hyponatremia \u2014 excess water relative to sodium. Proceed to urine osmolality.\n\n**Non-hypotonic (\u2265275 mOsm/kg):** Pseudohyponatremia or translocational hyponatremia. The sodium is artifactually low or diluted by effective osmoles.\n\n[Non-Hypotonic Hyponatremia](#/info/na-non-hypotonic-info) \u2014 detailed explanation of translocational and pseudohyponatremia causes',
        citation: [1, 4],
        options: [
            {
                label: 'Serum Osm \u2265 275 (Non-Hypotonic)',
                description: 'Hyperglycemia, mannitol, pseudohyponatremia',
                next: 'na-non-hypotonic',
            },
            {
                label: 'Serum Osm < 275 (Hypotonic)',
                description: 'True hyponatremia \u2014 proceed to urine osm',
                next: 'na-hypo-urine-osm',
            },
        ],
    },
    {
        id: 'na-non-hypotonic',
        type: 'result',
        module: 1,
        title: 'Non-Hypotonic Hyponatremia',
        body: '**This is NOT true hyponatremia.** The measured sodium is low but total body water and sodium balance may be normal.\n\n**Translocational (elevated osm):**\n\u2022 Hyperglycemia \u2014 correct Na+ by adding **1.6 mEq/L for every 100 mg/dL glucose above 100** (use 2.4 mEq/L if glucose >400)\n\u2022 Mannitol, IV contrast, glycine (TURP syndrome)\n\u2022 Treatment: correct the underlying osmole\n\n**Pseudohyponatremia (normal osm):**\n\u2022 Severe hyperlipidemia (triglycerides >1500)\n\u2022 Paraproteinemia (myeloma, Waldenstr\u00f6m)\n\u2022 Confirm with **point-of-care sodium** (direct ISE, not affected by protein/lipid interference)\n\u2022 Treatment: treat the underlying condition\n\n[Non-Hypotonic Hyponatremia](#/info/na-non-hypotonic-info)',
        recommendation: 'Non-hypotonic hyponatremia does not require sodium-directed therapy. For hyperglycemia: correct Na+ by +1.6 mEq/L per 100 mg/dL glucose above 100 (use 2.4 if glucose >400). For pseudohyponatremia: confirm with POC sodium (direct ISE). Treat the underlying cause (insulin for hyperglycemia, address hyperlipidemia or paraproteinemia). No hypertonic saline needed.',
        citation: [1, 2, 4],
    },
    // =====================================================================
    // MODULE 2: HYPONA ETIOLOGY
    // =====================================================================
    {
        id: 'na-hypo-urine-osm',
        type: 'question',
        module: 2,
        title: 'Urine Osmolality',
        body: 'Urine osmolality determines whether ADH (vasopressin) is active.\n\n**Urine Osm < 100 mOsm/kg** \u2014 ADH is appropriately suppressed. The kidney is maximally diluting urine. The problem is **excessive water intake or inadequate solute intake** overwhelming the kidney\u2019s diluting capacity.\n\n**Urine Osm > 100 mOsm/kg** \u2014 ADH is active (either appropriately or inappropriately). The kidney is concentrating urine when it should be diluting. Proceed to urine sodium to differentiate causes.',
        citation: [1, 3, 6],
        options: [
            {
                label: 'Urine Osm < 100 (ADH suppressed)',
                description: 'Water excess: polydipsia, beer potomania, tea-and-toast',
                next: 'na-hypo-water-excess',
            },
            {
                label: 'Urine Osm > 100 (ADH active)',
                description: 'Proceed to urine sodium for etiology',
                next: 'na-hypo-urine-na',
            },
        ],
    },
    {
        id: 'na-hypo-water-excess',
        type: 'result',
        module: 2,
        title: 'Water Intake > Solute Intake',
        body: '**ADH is suppressed \u2014 the kidney is doing its job.** The problem is excessive free water intake or severely low solute intake overwhelming diluting capacity (~20 L/day max).\n\n**Causes:**\n\u2022 **Primary polydipsia** \u2014 psychiatric patients, often on medications that cause dry mouth\n\u2022 **Beer potomania** \u2014 low-solute diet (beer has minimal protein/electrolytes, so minimal obligate solute excretion)\n\u2022 **Tea-and-toast diet** \u2014 elderly with inadequate protein/salt intake\n\u2022 **Marathon/exercise-associated hyponatremia** \u2014 excess hypotonic fluid intake during exercise\n\n**HIGH overcorrection risk.** Once water intake is restricted, the kidney rapidly excretes free water (no ADH to stop it). Na+ can rise dangerously fast.\n\n**Management:**\n\u2022 Restrict free water intake\n\u2022 For beer potomania/low solute: [Oral Urea](#/drug/oral-urea/siad) 15-30g PO daily to increase obligate water excretion\n\u2022 **Proactive DDAVP clamp** strongly recommended: [Desmopressin (DDAVP)](#/drug/desmopressin/ddavp clamp) 2 mcg IV q6-8h to prevent uncontrolled water excretion\n\u2022 [DDAVP Clamp-Bolus Protocol](#/info/na-ddavp-clamp) \u2014 full protocol\n\u2022 Check Na+ every 2 hours \u2014 do NOT allow >8-10 mEq/L rise in 24 hours\n\u2022 [Overcorrection Rescue Protocol](#/info/na-overcorrection) if overcorrecting',
        recommendation: 'High overcorrection risk \u2014 once water restriction begins, the kidney rapidly excretes free water with no ADH to stop it. Restrict free water. Strongly consider proactive DDAVP clamp (2 mcg IV q6-8h) to control correction rate. For beer potomania/low solute: add oral urea 15-30g/day. Check Na+ q2h. Maximum correction 8-10 mEq/L in 24 hours. Have D5W and DDAVP rescue available at bedside.',
        citation: [1, 6, 7],
    },
    {
        id: 'na-hypo-urine-na',
        type: 'question',
        module: 2,
        title: 'Urine Sodium',
        body: 'Urine sodium differentiates **renal sodium losses** from **extrarenal losses** in the setting of ADH-mediated hyponatremia.\n\n**Urine Na < 30 mEq/L** \u2014 The kidney is retaining sodium. Volume depletion (hypovolemic) or edematous states (hypervolemic) with reduced effective arterial blood volume.\n\n**Urine Na > 30 mEq/L** \u2014 The kidney is wasting sodium. SIAD, diuretics, adrenal insufficiency, cerebral salt wasting, or renal failure.\n\n**Caveat:** Diuretics can raise urine Na even in hypovolemic patients. Check urine Na **before** or >48 hours after last diuretic dose if possible.',
        citation: [1, 3],
        options: [
            {
                label: 'Urine Na < 30 mEq/L',
                description: 'Low UNa \u2014 kidney retaining sodium',
                next: 'na-hypo-low-una',
            },
            {
                label: 'Urine Na > 30 mEq/L',
                description: 'High UNa \u2014 kidney wasting sodium',
                next: 'na-hypo-high-una',
            },
        ],
    },
    {
        id: 'na-hypo-low-una',
        type: 'question',
        module: 2,
        title: 'Low UNa \u2014 Volume Assessment',
        body: 'The kidney is retaining sodium, indicating **reduced effective circulating volume.** The key distinction is between true hypovolemia and hypervolemic states with reduced effective arterial blood volume.\n\n**Hypovolemic (dry):**\n\u2022 GI losses (vomiting, diarrhea)\n\u2022 Third-spacing (pancreatitis, burns)\n\u2022 Diaphoresis, insensible losses\n\u2022 Clinical: tachycardia, orthostatic hypotension, poor skin turgor, dry mucous membranes\n\n**Hypervolemic (edematous):**\n\u2022 Heart failure\n\u2022 Cirrhosis\n\u2022 Nephrotic syndrome\n\u2022 Clinical: peripheral edema, ascites, JVD, pulmonary rales',
        citation: [1, 2],
        options: [
            {
                label: 'Hypovolemic (volume depleted)',
                description: 'GI losses, third-spacing, dehydration',
                next: 'na-hypo-hypovolemic',
            },
            {
                label: 'Hypervolemic (edematous)',
                description: 'Heart failure, cirrhosis, nephrotic syndrome',
                next: 'na-hypo-hypervolemic',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: EMERGENCY HYPONA RX
    // =====================================================================
    {
        id: 'na-hypo-emergency',
        type: 'info',
        module: 3,
        title: 'Emergency Hypertonic Saline',
        body: '**Immediate treatment for severe symptomatic hyponatremia** (seizures, coma, respiratory distress).\n\n[3% Hypertonic Saline](#/drug/hypertonic-saline/severe symptomatic) **100-150 mL IV bolus over 10-20 minutes.** Repeat up to 2 additional times (total 3 boluses) if severe symptoms persist.\n\n**Target:** Raise Na+ by **4-6 mEq/L** in the first 1-2 hours \u2014 this is sufficient to reverse cerebral edema and stop seizures. Each 100 mL bolus of 3% NaCl raises Na+ approximately **2 mEq/L** in a 70 kg adult.\n\n**Peripheral access is acceptable for boluses** \u2014 do NOT delay treatment for central line placement. Central access is preferred only for continuous infusions.\n\n**SALSA Trial (2021):** Bolus 3% NaCl was noninferior to continuous infusion for symptomatic hyponatremia, with lower overcorrection rates.\n\n**Give empirically:** [Thiamine](#/drug/thiamine/hyponatremia) **100 mg IV** now if not already given \u2014 thiamine deficiency increases ODS risk.\n\n**After stabilization:** Recheck Na+ at 1 hour. If symptoms improved, proceed to correction limits.',
        citation: [5, 7, 14],
        next: 'na-hypo-correction-limits',
    },
    {
        id: 'na-hypo-correction-limits',
        type: 'info',
        module: 3,
        title: 'Correction Rate Limits',
        body: '**Overcorrection causes osmotic demyelination syndrome (ODS)** \u2014 a devastating and often irreversible pontine and extrapontine injury.\n\n**Maximum correction rates:**\n\u2022 **Standard risk:** \u226410 mEq/L in first 24 hours, \u226418 mEq/L in 48 hours\n\u2022 **High risk for ODS:** \u22648 mEq/L in first 24 hours\n\n[ODS Risk Factors](#/info/na-ods-risk) \u2014 high-risk populations include: Na+ \u2264105, alcohol use disorder, liver disease, malnutrition, hypokalemia, thiamine deficiency\n\n**Key principle:** The goal is to correct enough to stop symptoms (4-6 mEq/L rise), then **slow down.** The acute danger is cerebral edema; the correction danger is ODS.\n\n**If overcorrecting** (Na+ rising faster than target):\n\u2022 [Overcorrection Rescue Protocol](#/info/na-overcorrection) \u2014 [Desmopressin (DDAVP)](#/drug/desmopressin/overcorrection rescue) 2 mcg IV stat + D5W 3 mL/kg/hr to lower Na+ back to safe trajectory\n\n**Monitor:** Check Na+ every 2 hours during active correction. Use a tracking sheet to plot the correction trajectory.\n\n**Concurrent potassium correction counts toward sodium correction** \u2014 if you give 40 mEq KCl, expect Na+ to rise ~1 mEq/L as K+ enters cells and Na+ exits.',
        citation: [1, 5, 7, 15],
        next: 'na-hypo-ddavp-decision',
    },
    {
        id: 'na-hypo-ddavp-decision',
        type: 'question',
        module: 3,
        title: 'DDAVP Clamp Strategy',
        body: 'The **DDAVP clamp** (also called "proactive DDAVP" or "DDAVP clamp-and-bolus") is the safest approach to controlled sodium correction.\n\n**How it works:** DDAVP locks the kidneys in a maximally concentrating state (prevents free water excretion). This gives the clinician **complete control** over the correction rate \u2014 Na+ rises only from administered hypertonic saline boluses, not from unpredictable renal water excretion.\n\n[DDAVP Clamp-Bolus Protocol](#/info/na-ddavp-clamp) \u2014 full initiation and monitoring protocol\n\n**Strongest indications for proactive clamp:**\n\u2022 Na+ \u2264120 mEq/L\n\u2022 High ODS risk (alcoholism, liver disease, malnutrition)\n\u2022 Reversible cause likely to self-correct (hypovolemia, diuretics, beer potomania)\n\u2022 Any situation where overcorrection would be catastrophic',
        citation: [1, 7],
        options: [
            {
                label: 'Start DDAVP Clamp',
                description: 'High-risk or Na+ \u2264120 \u2014 lock kidneys, control correction with boluses',
                next: 'na-hypo-ddavp-protocol',
            },
            {
                label: 'Monitor Without Clamp',
                description: 'Lower risk, Na+ >120, close monitoring available',
                next: 'na-hypo-initial',
            },
        ],
    },
    {
        id: 'na-hypo-ddavp-protocol',
        type: 'info',
        module: 3,
        title: 'DDAVP Clamp-Bolus Protocol',
        body: '**Step 1 \u2014 Lock the kidneys:**\n[Desmopressin (DDAVP)](#/drug/desmopressin/ddavp clamp) **2 mcg IV q6-8h** (schedule doses around the clock). This prevents all renal free water excretion.\n\n**Step 2 \u2014 Controlled bolus correction:**\n[3% Hypertonic Saline](#/drug/hypertonic-saline/ddavp clamp bolus) **100 mL IV bolus** \u2014 each bolus raises Na+ approximately **2 mEq/L** in a 70 kg adult. Give boluses every 4-6 hours as needed to achieve target correction rate.\n\n**Step 3 \u2014 Monitor:**\n\u2022 Check Na+ **every 2 hours** during active clamp\n\u2022 Track cumulative 24-hour correction on a flow sheet\n\u2022 Target: 4-6 mEq/L rise in first 24 hours for high-risk patients, up to 10 mEq/L for standard risk\n\n**Step 4 \u2014 Discontinue clamp:**\n\u2022 Once Na+ >125 mEq/L and underlying cause addressed\n\u2022 Taper: extend DDAVP interval to q12h for 24 hours, then stop\n\u2022 Continue monitoring Na+ q4-6h for 24 hours after stopping DDAVP\n\n**If Na+ rises too fast despite clamp:** Confirm DDAVP dosing is adequate (urine Osm should be >500). Give **D5W 3 mL/kg/hr** to actively lower Na+ back to safe trajectory.\n\n[DDAVP Clamp-Bolus Protocol](#/info/na-ddavp-clamp) \u2014 expanded protocol with discontinuation guidance',
        citation: [1, 7, 8],
        next: 'na-hypo-etiology',
    },
    // =====================================================================
    // MODULE 4: SIAD & SPECIFIC CAUSES
    // =====================================================================
    {
        id: 'na-hypo-high-una',
        type: 'question',
        module: 4,
        title: 'High UNa \u2014 Differential',
        body: 'Urine Na >30 mEq/L with ADH-mediated hyponatremia. The kidney is actively wasting sodium. The three main causes are:\n\n**SIAD (Syndrome of Inappropriate Antidiuresis):**\n\u2022 Most common cause of euvolemic hyponatremia\n\u2022 Euvolemic on exam, urine Osm >100, urine Na >30, low uric acid\n\u2022 [SIAD Causes & Diagnosis](#/info/na-siad-causes) \u2014 medications, malignancy, neurologic, pulmonary\n\n**Diuretic-induced:**\n\u2022 Thiazides >> loops (thiazides impair dilution; loops impair concentration)\n\u2022 May have UNa >30 despite being volume depleted\n\u2022 Check urine Na 48 hours after holding diuretic \u2014 if still >30, not solely diuretic\n\n**Adrenal insufficiency:**\n\u2022 Primary (Addison) or secondary (pituitary)\n\u2022 Cortisol is a tonic inhibitor of ADH \u2014 deficiency \u2192 unopposed ADH secretion\n\u2022 Check AM cortisol and ACTH',
        citation: [1, 3, 6],
        options: [
            {
                label: 'SIAD (euvolemic, no diuretic)',
                description: 'Euvolemic, Urine Osm >100, Urine Na >30, low uric acid',
                next: 'na-siad-treatment',
            },
            {
                label: 'Diuretic-Induced',
                description: 'On thiazide or recent diuretic use',
                next: 'na-hypo-diuretic',
            },
            {
                label: 'Adrenal Insufficiency',
                description: 'Suspect cortisol deficiency, on chronic steroids, or critically ill',
                next: 'na-hypo-adrenal',
            },
        ],
    },
    {
        id: 'na-siad-treatment',
        type: 'info',
        module: 4,
        title: 'SIAD Treatment',
        body: '**First-line: Fluid restriction**\n\u2022 Restrict to 800-1000 mL/day total fluid intake\n\u2022 Effective only if urine Osm < 500 AND urine Osm/serum Osm ratio < 1.0\n\u2022 If ratio >1.0, every mL of urine excretes more water than intake replaces \u2014 fluid restriction will fail\n\n**Second-line: Oral urea**\n[Oral Urea](#/drug/oral-urea/siad) **15-30g PO daily** (titrate up to 60g/day). Creates obligate osmotic diuresis. Bitter taste \u2014 mix with orange juice or cola. Ure-Na brand designed for palatability.\n\n**Third-line: Salt tabs + loop diuretic**\n[Sodium Chloride Tablets](#/drug/nacl-tablets/siad) **1-3g PO TID** + [Furosemide](#/drug/furosemide/siad) **20-40 mg PO daily**. The loop diuretic impairs urinary concentration (breaks the medullary gradient), and salt tabs replace renal sodium losses.\n\n**NOT recommended: Vaptans** (tolvaptan, conivaptan). Unpredictable overcorrection risk, hepatotoxicity, expensive, no mortality benefit. European guidelines and IBCC explicitly recommend against.\n\n**Treat the underlying cause:** Discontinue offending medication (SSRIs, carbamazepine, NSAIDs, opioids). Evaluate for occult malignancy if no obvious cause identified. [SIAD Causes & Diagnosis](#/info/na-siad-causes)',
        citation: [6, 8, 9],
        next: 'na-hypo-monitoring',
    },
    {
        id: 'na-hypo-diuretic',
        type: 'result',
        module: 4,
        title: 'Diuretic-Induced Hyponatremia',
        body: '**Thiazide diuretics are the most common medication cause of hyponatremia.** Typically occurs within 2 weeks of initiation, especially in elderly women with low body mass.\n\n**Mechanism:** Thiazides impair the kidney\u2019s diluting segment (distal convoluted tubule) while preserving the concentrating segment. Loops do the opposite \u2014 they impair concentration, which is why loop diuretics rarely cause severe hyponatremia and are even used to treat SIAD.\n\n**Management:**\n\u2022 **Hold the thiazide immediately** \u2014 never rechallenge\n\u2022 Replace volume deficit with normal saline if hypovolemic\n\u2022 Check and correct potassium and magnesium\n\n**HIGH overcorrection risk.** Once the thiazide is discontinued and volume is restored, the kidney rapidly excretes free water (ADH suppresses, diluting segment recovers). Na+ can rise 15-20 mEq/L in 24 hours without intervention.\n\n\u2022 **If Na+ <120:** Proactive [Desmopressin (DDAVP)](#/drug/desmopressin/ddavp clamp) clamp strongly recommended\n\u2022 Check Na+ every 2 hours for at least 24 hours after holding the diuretic\n\u2022 [Overcorrection Rescue Protocol](#/info/na-overcorrection) if Na+ rising too fast',
        recommendation: 'Hold thiazide immediately and never rechallenge. Replace volume deficit with NS if hypovolemic. Correct K+ and Mg2+. HIGH overcorrection risk once diuretic held \u2014 consider proactive DDAVP clamp if Na+ <120. Monitor Na+ q2h for 24 hours. Have D5W and DDAVP rescue at bedside. Switch to loop diuretic if ongoing diuresis needed.',
        citation: [1, 2, 7],
    },
    {
        id: 'na-hypo-adrenal',
        type: 'result',
        module: 4,
        title: 'Adrenal Insufficiency',
        body: '**Cortisol deficiency causes hyponatremia through two mechanisms:**\n\u2022 Cortisol tonically inhibits ADH \u2014 deficiency leads to unopposed ADH secretion\n\u2022 Reduced cardiac output and GFR \u2192 nonosmotic ADH release\n\n**Diagnosis:**\n\u2022 AM cortisol <3 mcg/dL \u2192 virtually diagnostic\n\u2022 AM cortisol 3-18 mcg/dL \u2192 cosyntropin stimulation test\n\u2022 AM cortisol >18 mcg/dL \u2192 AI unlikely\n\u2022 Check ACTH to distinguish primary (high ACTH) from secondary (low ACTH)\n\n**If hemodynamically unstable:**\n\u2022 **Stress-dose hydrocortisone 100 mg IV** immediately \u2014 do NOT wait for cortisol results\n\u2022 Then 50 mg IV q8h until stable\n\u2022 Normal saline for volume resuscitation\n\n**If stable:**\n\u2022 Draw cortisol/ACTH, then start hydrocortisone 20 mg AM / 10 mg PM\n\u2022 Na+ corrects as cortisol is replaced\n\u2022 Monitor for overcorrection \u2014 ADH suppresses once cortisol is adequate',
        recommendation: 'Check AM cortisol and ACTH. If hemodynamically unstable, give stress-dose hydrocortisone 100 mg IV stat (do not wait for results), then 50 mg IV q8h. If stable, draw labs then start physiologic replacement (20 mg AM / 10 mg PM). Na+ corrects as cortisol is replaced. Monitor for overcorrection once ADH suppresses. Endocrinology consult for all new adrenal insufficiency diagnoses.',
        citation: [1, 2, 3],
    },
    {
        id: 'na-hypo-hypovolemic',
        type: 'result',
        module: 4,
        title: 'Hypovolemic Hyponatremia',
        body: '**Volume depletion triggers nonosmotic ADH release** \u2014 the body prioritizes volume over tonicity. ADH retains free water, diluting sodium.\n\n**Common causes:**\n\u2022 GI losses (vomiting, diarrhea, NG suction)\n\u2022 Third-spacing (pancreatitis, burns, bowel obstruction)\n\u2022 Diaphoresis, insensible losses in febrile patients\n\u2022 Cerebral salt wasting (post-neurosurgery)\n\n**Management:**\n\u2022 **Normal saline (0.9% NaCl)** for volume resuscitation \u2014 NS is hypertonic relative to the patient\u2019s serum in severe hyponatremia\n\u2022 Replace ongoing losses (NG output, drain output)\n\u2022 Correct potassium and magnesium\n\n**HIGH overcorrection risk.** Once euvolemia is restored, ADH suppresses abruptly. The kidney suddenly excretes a large volume of dilute urine ("aquaresis"), and Na+ can rise 15-20 mEq/L in hours.\n\n\u2022 **If Na+ <120:** Proactive [Desmopressin (DDAVP)](#/drug/desmopressin/ddavp clamp) clamp before volume resuscitation\n\u2022 Watch for sudden increase in urine output \u2014 this signals ADH suppression and imminent rapid Na+ rise\n\u2022 Check Na+ every 2 hours during resuscitation\n\u2022 [Overcorrection Rescue Protocol](#/info/na-overcorrection) at bedside',
        recommendation: 'Resuscitate with normal saline. HIGH overcorrection risk once euvolemia restored and ADH suppresses. If Na+ <120, start proactive DDAVP clamp before NS resuscitation. Monitor Na+ q2h. Watch for sudden urine output increase (signals ADH suppression). Correct K+ and Mg2+ concurrently. Have D5W and DDAVP rescue at bedside. Maximum correction 8-10 mEq/L in 24 hours.',
        citation: [1, 4, 7],
    },
    {
        id: 'na-hypo-hypervolemic',
        type: 'result',
        module: 4,
        title: 'Hypervolemic Hyponatremia',
        body: '**Edematous states with reduced effective arterial blood volume** trigger ADH release despite total body water excess.\n\n**Causes:**\n\u2022 **Heart failure** \u2014 poor forward flow \u2192 baroreceptor-mediated ADH release\n\u2022 **Cirrhosis** \u2014 splanchnic vasodilation \u2192 reduced effective arterial volume\n\u2022 **Nephrotic syndrome** \u2014 hypoalbuminemia \u2192 reduced oncotic pressure\n\n**Management:**\n\u2022 **Fluid restriction** 1-1.5 L/day (first-line for all three)\n\u2022 [Furosemide](#/drug/furosemide/hypernatremia) **20-40 mg IV** for diuresis \u2014 loop diuretics produce dilute urine and help correct Na+\n\u2022 Treat the underlying condition (guideline-directed HF therapy, TIPS for cirrhosis)\n\u2022 **Sodium restriction** <2g/day\n\n**Avoid:**\n\u2022 Normal saline \u2014 worsens total body sodium and edema\n\u2022 Hypertonic saline \u2014 only if severe symptoms (seizures/coma), and only as temporizing bolus\n\u2022 Vaptans \u2014 unpredictable overcorrection, hepatotoxicity, no mortality benefit\n\n**Prognosis:** Hyponatremia in HF and cirrhosis is an independent marker of disease severity and mortality.',
        recommendation: 'Fluid restriction 1-1.5 L/day. Loop diuretic (furosemide 20-40 mg IV) for diuresis. Sodium restriction <2g/day. Treat the underlying disease (GDMT for HF, TIPS for cirrhosis). Avoid NS, hypertonic saline (unless seizures/coma), and vaptans. Hyponatremia is a marker of disease severity. Goal Na+ correction is slow and may not normalize until underlying disease improves.',
        citation: [1, 2, 8],
    },
    // =====================================================================
    // MODULE 5: HYPERNA ASSESSMENT
    // =====================================================================
    {
        id: 'na-hypo-monitoring',
        type: 'result',
        module: 5,
        title: 'HypoNa Monitoring & Disposition',
        body: '**Ongoing monitoring during hyponatremia treatment.**\n\n**Active correction (Na+ <125 or symptomatic):**\n\u2022 Check Na+ every **2 hours**\n\u2022 Plot correction trajectory on flow sheet\n\u2022 Track all IV fluids, PO intake, and urine output\n\u2022 I&O catheter for accurate urine measurement\n\n**Stable/improving (Na+ 125-130):**\n\u2022 Check Na+ every **4-6 hours**\n\u2022 Continue fluid restriction or treatment of underlying cause\n\n**ICU admission criteria:**\n\u2022 Na+ <120 mEq/L\n\u2022 Active DDAVP clamp in progress\n\u2022 Severe neurological symptoms\n\u2022 Active overcorrection requiring D5W infusion\n\u2022 Receiving hypertonic saline\n\n**Step-down from ICU:**\n\u2022 Na+ >125 and stable uptrend\n\u2022 DDAVP clamp successfully discontinued\n\u2022 Underlying cause addressed\n\n**Discharge criteria:**\n\u2022 Na+ >130 mEq/L and stable\n\u2022 Underlying cause treated or managed\n\u2022 Outpatient follow-up with repeat Na+ in 1-2 weeks',
        recommendation: 'Monitor Na+ q2h during active correction, q4-6h once stable. ICU for Na+ <120, DDAVP clamp, severe symptoms, or hypertonic saline infusion. Track correction trajectory on flow sheet. Correct concurrent K+ and Mg2+. Step down when Na+ >125 and stable. Discharge when Na+ >130 with underlying cause addressed. Outpatient Na+ recheck in 1-2 weeks.',
        citation: [1, 5, 8],
    },
    {
        id: 'na-hyper-assess',
        type: 'question',
        module: 5,
        title: 'Hypernatremia Assessment',
        body: 'Hypernatremia (Na+ >145 mEq/L) is **almost always a free water deficit** \u2014 either inadequate intake or excessive loss. Rarely, it results from sodium gain.\n\n**Assess volume status and urine output:**\n\n**Volume depleted (most common):**\n\u2022 Inadequate water intake (altered mental status, intubated, elderly, infant)\n\u2022 GI losses + inadequate replacement\n\u2022 Insensible losses (fever, burns, mechanical ventilation)\n\u2022 Diuretic use without free water replacement\n\n**Polyuria (>3 L/day):**\n\u2022 Diabetes insipidus (central or nephrogenic)\n\u2022 Osmotic diuresis (hyperglycemia, mannitol, urea)\n\u2022 Post-obstructive diuresis\n\n**Volume overloaded (iatrogenic):**\n\u2022 Excessive hypertonic saline, NaHCO\u2083, or high-Na medications\n\u2022 Excess NS resuscitation with inadequate free water\n\n[Hypernatremia Causes](#/info/na-hyper-causes) \u2014 7-category breakdown of all etiologies',
        citation: [2, 10, 13],
        options: [
            {
                label: 'Volume Depleted',
                description: 'Inadequate water intake, GI/insensible losses, most common',
                next: 'na-hyper-fwd',
            },
            {
                label: 'Polyuria (>3 L/day)',
                description: 'Diabetes insipidus, osmotic diuresis',
                next: 'na-hyper-di',
            },
            {
                label: 'Volume Overloaded (iatrogenic)',
                description: 'Excess sodium administration, NS resuscitation',
                next: 'na-hyper-overload',
            },
        ],
    },
    {
        id: 'na-hyper-di',
        type: 'question',
        module: 5,
        title: 'Diabetes Insipidus Workup',
        body: '**Polyuria with dilute urine (Urine Osm <300 mOsm/kg) suggests diabetes insipidus.**\n\n**Central DI** \u2014 deficient ADH production:\n\u2022 Post-neurosurgery (pituitary), head trauma, brain death\n\u2022 Tumors (craniopharyngioma, metastases)\n\u2022 Autoimmune hypophysitis\n\u2022 **Diagnostic clue:** Urine Osm rises >50% after DDAVP 2 mcg IV trial\n\n**Nephrogenic DI** \u2014 kidney resistant to ADH:\n\u2022 Lithium (most common medication cause \u2014 up to 40% of long-term users)\n\u2022 Hypercalcemia, hypokalemia\n\u2022 Sickle cell disease, amyloidosis\n\u2022 Pregnancy (placental vasopressinase)\n\u2022 **Diagnostic clue:** Urine Osm does NOT rise after DDAVP trial\n\n**DDAVP trial interpretation:**\n\u2022 Give DDAVP 2 mcg IV, measure urine Osm at 0 and 2 hours\n\u2022 >50% rise \u2192 central DI (kidney responds to exogenous ADH)\n\u2022 <50% rise \u2192 nephrogenic DI (kidney does not respond)',
        citation: [10, 12],
        options: [
            {
                label: 'Central DI',
                description: 'Urine Osm rises >50% with DDAVP, or post-neurosurgery/trauma',
                next: 'na-hyper-central-di',
            },
            {
                label: 'Nephrogenic DI',
                description: 'Urine Osm does not respond to DDAVP, lithium, hypercalcemia',
                next: 'na-hyper-nephrogenic-di',
            },
        ],
    },
    {
        id: 'na-hyper-central-di',
        type: 'info',
        module: 5,
        title: 'Central DI Treatment',
        body: '**Replace ADH with DDAVP + replace free water deficit.**\n\n**DDAVP replacement:**\n[Desmopressin (DDAVP)](#/drug/desmopressin/central diabetes insipidus) **2 mcg IV q8-12h** (acute inpatient) OR **10 mcg intranasal BID** (stable/outpatient)\n\n**Free water replacement:** Calculate deficit and replace (see next step).\n\n**Post-neurosurgical DI:**\n\u2022 Often a **triphasic response:**\n  1. DI phase (days 1-5): polyuria, rising Na+\n  2. SIAD phase (days 5-10): oliguria, falling Na+ (uncontrolled ADH release from dying neurons)\n  3. Permanent DI (if >80% of neurons destroyed)\n\u2022 **Critical:** Monitor Na+ closely during transitions \u2014 do NOT continue DDAVP blindly into the SIAD phase (will cause dangerous hyponatremia)\n\u2022 Check urine output and Na+ q4-6h in the first 2 weeks post-surgery\n\n**Brain death evaluation:** Central DI with polyuria is a supportive finding but not diagnostic alone. If urine output >300 mL/hr with urine Osm <200, strongly suggestive.',
        citation: [10, 12],
        next: 'na-hyper-fwd',
    },
    {
        id: 'na-hyper-nephrogenic-di',
        type: 'info',
        module: 5,
        title: 'Nephrogenic DI Treatment',
        body: '**The kidney does not respond to ADH \u2014 DDAVP is ineffective.** Treatment relies on reducing solute load and using pharmacologic tricks.\n\n**Step 1 \u2014 Remove the offending agent:**\n\u2022 **Lithium** \u2014 discuss with psychiatry before discontinuing. Amiloride 5-10 mg BID blocks lithium entry into collecting duct cells (partially protective even if lithium continued)\n\u2022 **Hypercalcemia** \u2014 treat aggressively (IV saline, calcitonin, bisphosphonates)\n\u2022 **Hypokalemia** \u2014 correct to >3.5 mEq/L\n\n**Step 2 \u2014 Thiazide paradox:**\n\u2022 Thiazide diuretic (HCTZ 25 mg daily) + amiloride 5 mg BID\n\u2022 **Paradoxical antidiuresis** \u2014 thiazides cause mild volume depletion \u2192 increased proximal tubular reabsorption \u2192 less water delivered to diluting segment \u2192 less urine output\n\u2022 Combined with low-sodium diet (<2g/day) to enhance the effect\n\n**Step 3 \u2014 Large free water volumes:**\n\u2022 Patients may require **10-20 liters/day** of free water intake to keep up with urinary losses\n\u2022 If unable to drink enough: D5W IV to match urine output + ongoing losses\n\u2022 Enteral free water via NG/OG tube if intubated\n\n**NSAIDs** (indomethacin 50 mg TID) can reduce urine output by 25-50% but GI/renal toxicity limits long-term use.',
        citation: [10, 12],
        next: 'na-hyper-fwd',
    },
    // =====================================================================
    // MODULE 6: HYPERNA TREATMENT
    // =====================================================================
    {
        id: 'na-hyper-fwd',
        type: 'info',
        module: 6,
        title: 'Free Water Deficit & Replacement',
        body: '**Calculate the free water deficit (FWD) to guide replacement volume.**\n\n**Formula:** FWD (liters) = TBW \u00d7 [(Na/140) - 1]\n\u2022 TBW = weight (kg) \u00d7 0.6 (men) or \u00d7 0.5 (women/elderly)\n\u2022 Example: 70 kg male, Na+ 160 \u2192 TBW = 42L, FWD = 42 \u00d7 (160/140 - 1) = **6.0 liters**\n\n**The FWD formula underestimates true deficit** \u2014 it does not account for ongoing losses (insensible, urinary, GI). Add ~1-1.5 L/day for ongoing losses.\n\n**Fluid choice (order of preference):**\n1. **Enteral free water** (PO or NG/OG tube) \u2014 safest, most physiologic\n2. **D5W IV** \u2014 if NPO or insufficient enteral intake (D5W = free water once glucose is metabolized)\n3. **0.45% NaCl** \u2014 only half is free water; use if concurrent volume depletion\n\n**Correction rate:**\n\u2022 **Acute hypernatremia (<48 hours):** Can correct 1 mEq/L/hr safely\n\u2022 **Chronic hypernatremia (>48 hours or unknown):** Maximum **10-12 mEq/L per 24 hours** \u2014 rapid correction risks cerebral edema\n\u2022 Most hypernatremia in hospitalized patients is chronic \u2192 correct slowly\n\n**Replace the deficit over 48-72 hours** \u2014 not in a single bolus. Divide calculated free water evenly.\n\n**Address the underlying cause simultaneously** \u2014 free water alone does not fix DI, ongoing GI losses, or medication causes.',
        citation: [10, 11, 13],
        calculatorLinks: [{ id: 'fwd', label: 'Free Water Deficit' }],
        next: 'na-hyper-monitoring',
    },
    {
        id: 'na-hyper-overload',
        type: 'info',
        module: 6,
        title: 'Hypernatremia + Volume Overload',
        body: '**Iatrogenic hypernatremia from excessive sodium administration** is increasingly common in ICU patients receiving NS boluses, NaHCO\u2083, and high-sodium medications.\n\n**Causes:**\n\u2022 Large-volume NS resuscitation without free water\n\u2022 NaHCO\u2083 infusions (isotonic bicarb = 150 mEq Na/L)\n\u2022 High-sodium medications (piperacillin-tazobactam = 4.7 mEq Na per gram)\n\u2022 Hypertonic saline overcorrection during hyponatremia treatment\n\n**Management \u2014 natriuretic diuresis + free water:**\n\u2022 [Furosemide](#/drug/furosemide/hypernatremia) **20-40 mg IV** \u2014 produces hypotonic urine (Na+ ~75 mEq/L), removing more sodium than water\n\u2022 Replace urine volume with **D5W or enteral free water** to lower Na+ while diuresing excess sodium\n\u2022 Thiazide + amiloride if loop diuretic insufficient\n\n**Target:** Negative sodium balance (remove more Na+ than you give) while maintaining neutral or positive water balance.\n\n**Switch IV fluids** from NS to D5W or 0.45% NaCl for maintenance. Review all sodium-containing medications and minimize where possible.\n\n**Monitor:** Na+ every 4-6 hours. Strict I&O. Daily weights.',
        citation: [10, 13, 16],
        next: 'na-hyper-monitoring',
    },
    {
        id: 'na-hyper-monitoring',
        type: 'result',
        module: 6,
        title: 'Hypernatremia Monitoring & Disposition',
        body: '**Ongoing monitoring during hypernatremia treatment.**\n\n**Active correction:**\n\u2022 Check Na+ every **4-6 hours**\n\u2022 Strict intake and output (I&O catheter recommended)\n\u2022 Daily weights\n\u2022 Monitor for signs of cerebral edema during correction (headache, confusion, seizures)\n\n**Correction targets:**\n\u2022 Chronic: maximum 10-12 mEq/L decrease in 24 hours\n\u2022 Acute (<48h): can correct 1 mEq/L/hr\n\u2022 Target Na+ 140-145 mEq/L\n\n**Overcorrection is RARE in hypernatremia** (unlike hyponatremia). Cerebral edema from overcorrection is theoretical but reported only in aggressive pediatric correction.\n\n**ICU admission criteria:**\n\u2022 Na+ >160 mEq/L\n\u2022 Hemodynamic instability\n\u2022 Active DI with massive polyuria\n\u2022 Unable to maintain adequate free water intake\n\n**Hospital-acquired hypernatremia** (Na+ develops during admission) carries mortality up to 40-60% in ICU patients \u2014 reflects severity of underlying illness, not sodium toxicity per se.\n\n[Hypernatremia in the Elderly](#/node/na-hyper-elderly) \u2014 special considerations for geriatric patients',
        recommendation: 'Monitor Na+ q4-6h during active correction. Correct chronic hypernatremia slowly (max 10-12 mEq/L/day). ICU for Na+ >160, hemodynamic instability, or active DI with massive polyuria. Overcorrection risk is low (unlike hyponatremia). Hospital-acquired hypernatremia reflects underlying illness severity. Address the cause (free water access, DI treatment, medication review). Target Na+ 140-145. Discharge when Na+ <150 and free water access is ensured.',
        citation: [10, 11, 13, 16],
    },
    {
        id: 'na-hyper-elderly',
        type: 'info',
        module: 6,
        title: 'Hypernatremia in the Elderly',
        body: '**Hypernatremia in elderly patients is almost always chronic and related to impaired thirst or access to water.**\n\n**Why the elderly are vulnerable:**\n\u2022 **Diminished thirst** \u2014 aging blunts the thirst response to hypertonicity\n\u2022 **Reduced total body water** \u2014 TBW factor ~0.45-0.50 (vs 0.60 in younger adults)\n\u2022 **Impaired renal concentrating ability** \u2014 maximum urine Osm declines with age\n\u2022 **Functional limitations** \u2014 dementia, immobility, dependence on caregivers for water access\n\u2022 **Medications** \u2014 diuretics, lithium, laxatives\n\n**Key management differences:**\n\u2022 **Usually chronic** \u2192 correct slowly (max 10-12 mEq/L/day)\n\u2022 **Oral water first** if patient can swallow safely \u2014 200-300 mL PO every 2-4 hours\n\u2022 If unable to drink: **D5W IV** or enteral free water via NG tube\n\u2022 **ICU is usually NOT needed** unless Na+ >160 or hemodynamically unstable\n\u2022 Avoid overdiuresis \u2014 elderly have limited renal reserve\n\n**Discharge planning is critical:**\n\u2022 Ensure caregivers provide regular water access\n\u2022 Set water intake schedule (not reliant on patient requesting water)\n\u2022 Review and minimize diuretics\n\u2022 Follow-up Na+ in 1 week',
        citation: [10, 13, 16],
        next: 'na-hyper-monitoring',
    },
];
export const SODIUM_NODE_COUNT = SODIUM_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const SODIUM_MODULE_LABELS = [
    'Initial Assessment',
    'HypoNa Etiology',
    'Emergency HypoNa Rx',
    'SIAD & Specific Causes',
    'HyperNa Assessment',
    'HyperNa Treatment',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const SODIUM_CITATIONS = [
    { num: 1, text: 'Adrogu\u00e9 HJ et al. Diagnosis and Management of Hyponatremia. JAMA. 2022;328(3):280-291.' },
    { num: 2, text: 'Miller NE et al. Sodium Disorders: Hyponatremia and Hypernatremia. AFP. 2023;108(5):476-486.' },
    { num: 3, text: 'Hoorn EJ, Zietse R. Diagnosis and Treatment of Hyponatremia: Guidelines. JASN. 2017;28(5):1340-1349.' },
    { num: 4, text: 'Seay NW et al. Body Tonicity Disorders Core Curriculum. AJKD. 2020;75(2):272-286.' },
    { num: 5, text: 'Spasovski G et al. Clinical Practice Guideline on Hyponatraemia. Eur J Endocrinol. 2014;170(3):G1-G47.' },
    { num: 6, text: 'Adrogu\u00e9 HJ, Madias NE. Syndrome of Inappropriate Antidiuresis. NEJM. 2023;389(16):1499-1509.' },
    { num: 7, text: 'Sterns RH. Disorders of Plasma Sodium. NEJM. 2015;372(1):55-65.' },
    { num: 8, text: 'Verbalis JG et al. Hyponatremia: Expert Panel Recommendations. Am J Med. 2013;126(10S1):S1-42.' },
    { num: 9, text: 'Decaux G et al. Treatment of Euvolemic Hyponatremia by Urea. Crit Care. 2010;14(5):R184.' },
    { num: 10, text: 'Adrogu\u00e9 HJ, Madias NE. Hypernatremia. NEJM. 2000;342(20):1493-1499.' },
    { num: 11, text: 'Feigin E et al. Correction Rate and Mortality in Severe Hypernatremia. JAMA Netw Open. 2023;6(9):e2335415.' },
    { num: 12, text: 'Bichet DG. Diagnosis and Management of Nephrogenic DI. Semin Nephrol. 2023;43(2):151402.' },
    { num: 13, text: 'Lindner G et al. Hypernatremia in Critically Ill. J Crit Care. 2013;28(2):216.e11-20.' },
    { num: 14, text: 'Baek SH et al. SALSA Trial: Bolus vs Continuous 3% Saline. JAMA Intern Med. 2021;181(1):81-92.' },
    { num: 15, text: 'Ayus JC et al. Correction Rates in Severe Hyponatremia Meta-Analysis. JAMA Intern Med. 2025;185(1):38-51.' },
    { num: 16, text: 'Polderman KH et al. Hypernatremia in the ICU: Quality of Care. Crit Care Med. 1999;27(6):1105-8.' },
];
// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------
export const SODIUM_CLINICAL_NOTES = [
    'Symptom severity \u2014 not the sodium number \u2014 determines urgency. A patient with Na+ 118 and seizures needs emergent hypertonic saline; Na+ 118 found incidentally may need only slow correction.',
    'The DDAVP clamp-and-bolus strategy gives the clinician complete control over correction rate. DDAVP locks kidneys in concentrating mode; Na+ rises only from administered 3% boluses.',
    'Overcorrection is the most dangerous complication of hyponatremia treatment. ODS is devastating and often irreversible. Maximum 10 mEq/L in 24 hours (8 for high-risk patients).',
    'Thiazides cause hyponatremia by impairing dilution while preserving concentration. Loops do the opposite \u2014 loops impair concentration and are used to TREAT SIAD.',
    'Concurrent potassium correction counts toward sodium correction \u2014 40 mEq KCl raises Na+ approximately 1 mEq/L as K+ enters cells and Na+ exits.',
    'Beer potomania and primary polydipsia have the HIGHEST overcorrection risk. Once water intake is restricted, the kidney rapidly dumps free water with no ADH to stop it.',
    'Vaptans (tolvaptan, conivaptan) are NOT recommended: unpredictable overcorrection risk, hepatotoxicity, expensive, no mortality benefit. European guidelines explicitly advise against.',
    'Oral urea (Ure-Na) is second-line for SIAD after fluid restriction fails. Creates obligate osmotic diuresis. Extremely bitter \u2014 mix with flavored liquids for palatability.',
    'Thiamine 100 mg IV should be given empirically to ALL patients undergoing Na+ correction \u2014 thiamine deficiency dramatically increases ODS risk.',
    'The free water deficit formula underestimates true deficit by not accounting for ongoing losses. Add 1-1.5 L/day for insensible/urinary/GI losses on top of calculated FWD.',
    'Hospital-acquired hypernatremia carries 40-60% ICU mortality \u2014 but this reflects illness severity, not sodium toxicity. Prevention (scheduled free water) is more effective than treatment.',
    'Lithium-induced nephrogenic DI affects up to 40% of long-term users. Amiloride 5-10 mg BID blocks lithium entry into collecting duct cells and is partially protective.',
    'Post-neurosurgical DI often follows a triphasic pattern: DI (days 1-5) \u2192 SIAD (days 5-10) \u2192 permanent DI. Monitor closely during transitions \u2014 continuing DDAVP into the SIAD phase causes dangerous hyponatremia.',
    'Elderly hypernatremia is almost always chronic and related to impaired thirst. Correct slowly, ensure caregiver-driven water access on a schedule, and review diuretics.',
];
