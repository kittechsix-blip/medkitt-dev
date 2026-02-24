// MedKitt — Potassium Disorders (Hyperkalemia & Hypokalemia) Management
// Initial Assessment → HyperK Severity → Severe HyperK Rx → K+ Elimination → HypoK Management → Periodic Paralysis
// 6 modules: Initial Assessment → HyperK Severity → Severe HyperK Rx → K+ Elimination → HypoK Management → Periodic Paralysis
// 24 nodes total.
export const POTASSIUM_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'k-start',
        type: 'question',
        module: 1,
        title: 'Potassium Level',
        body: 'What is the serum potassium level?\n\nConfirm result with clinical context. Consider repeating if unexpected.',
        options: [
            {
                label: 'Hyperkalemia (K+ > 5.5 mEq/L)',
                next: 'k-hyper-ecg',
            },
            {
                label: 'Hypokalemia (K+ < 3.5 mEq/L)',
                next: 'k-hypo-assess',
            },
            {
                label: 'Borderline / Unexpected Result',
                next: 'k-pseudo',
            },
        ],
    },
    {
        id: 'k-pseudo',
        type: 'info',
        module: 1,
        title: 'Pseudohyperkalemia & Lab Verification',
        body: '**Rule out pseudohyperkalemia before treating:**\n\n\u2022 In vitro hemolysis (most common artifact) \u2014 repeat lab\n\u2022 Severe polycythemia (platelets >1M or WBC >50K) \u2014 use heparinized tube or POC\n\u2022 Prolonged tourniquet application or fist clenching\n\u2022 Delayed sample processing\n\n**Point-of-care testing** is generally accurate but cannot detect hemolysis.\n\nIf lab reports severe hyperkalemia but ECG is normal \u2192 consider pseudohyperkalemia and repeat the lab.',
        citation: [1, 7],
        next: 'k-start',
    },
    {
        id: 'k-hyper-ecg',
        type: 'info',
        module: 1,
        title: 'Check ECG Immediately',
        body: 'The **first response** to a lab report of hyperkalemia should be to look at telemetry and obtain an ECG.\n\n[Hyperkalemia ECG Findings](#/info/k-hyper-ecg-info) \u2014 progression by K+ level\n\n**If ECG shows hyperkalemia features** \u2192 confirms diagnosis, treat as severe.\n\n**If severe lab value but normal ECG** \u2192 consider pseudohyperkalemia, repeat lab.\n\nMost patients with hyperkalemia are **asymptomatic**, even with severe elevations.',
        citation: [1, 5],
        next: 'k-hyper-severity',
    },
    // =====================================================================
    // MODULE 2: HYPERK SEVERITY
    // =====================================================================
    {
        id: 'k-hyper-severity',
        type: 'question',
        module: 2,
        title: 'Hyperkalemia Severity',
        body: 'Classify severity based on potassium level, ECG changes, chronicity, and ongoing K+ release.\n\n**Severe hyperkalemia (KDIGO):**\n\u2022 K+ \u2265 6.5 mEq/L with ECG changes\n\u2022 K+ \u2265 6.0 mEq/L with rapid rise or ongoing release (TLS, rhabdo)\n\n**Chronic hyperkalemia** (e.g., dialysis patients) is better tolerated than acute.\n\n**Most dangerous ECG findings:** Bradycardia (RR 12.3), QRS widening (RR 4.7), junctional rhythm (RR 7.5).',
        citation: [1, 5, 7],
        options: [
            {
                label: 'Severe Hyperkalemia',
                description: 'K+ \u22656.5 + ECG changes, K+ \u22657.0, or ongoing K+ release',
                next: 'k-hyper-step1',
            },
            {
                label: 'Moderate Hyperkalemia',
                description: 'K+ 5.5-6.5, no ECG changes, hemodynamically stable',
                next: 'k-hyper-mod',
            },
        ],
    },
    {
        id: 'k-hyper-mod',
        type: 'info',
        module: 2,
        title: 'Moderate Hyperkalemia Management',
        body: '**[1] Treat definable causes:**\n\u2022 Discontinue offending medications and nephrotoxins\n\u2022 Establish euvolemia with adequate perfusion\n\u2022 Consider renal diet with limited K+ intake\n\n**[2] Gentle kaliuresis:**\n\u2022 [Furosemide](#/drug/furosemide) 40-80 mg IV \u2014 may be sufficient as sole diuretic\n\u2022 Replace urine volume with Lactated Ringers to maintain even fluid balance\n\nIf single diuretic fails \u2192 escalate to aggressive kaliuresis strategy.',
        citation: [1],
        next: 'k-hyper-step3',
    },
    // =====================================================================
    // MODULE 3: SEVERE HYPERK RX
    // =====================================================================
    {
        id: 'k-hyper-step1',
        type: 'info',
        module: 3,
        title: 'Step 1: Temporizing Measures',
        body: '**Start ALL temporizing measures simultaneously.**\n\nThese shift K+ into cells and stabilize the myocardium. They are **temporizing only** \u2014 K+ will return to baseline in 2-4 hours without definitive elimination therapy.\n\n**Three interventions:**\n1. IV Calcium \u2192 membrane stabilization\n2. Insulin + Dextrose \u2192 intracellular K+ shift\n3. Beta-2 agonist \u2192 intracellular K+ shift\n\n**Do NOT provide temporizing measures without definitive therapy.** This will temporarily improve the K+ but hyperkalemia will inevitably recur.',
        citation: [1, 2],
        next: 'k-hyper-calcium',
    },
    {
        id: 'k-hyper-calcium',
        type: 'info',
        module: 3,
        title: 'IV Calcium \u2014 Membrane Stabilization',
        body: '**Indications:** ECG changes (especially bradycardia, QRS widening, conduction delays). Controversial for isolated peaked T-waves.\n\n**Dosing:**\n\u2022 Peripheral access: [Calcium Gluconate](#/drug/calcium-gluconate) **3 grams IV over 10 minutes**\n\u2022 Central access: [Calcium Chloride](#/drug/calcium-chloride) **1 gram IV over 10 minutes**\n\n**Duration:** 30-60 minutes only \u2014 may need to repeat 1-2 times.\n\nRapid IV calcium may cause flushing, nausea, abdominal discomfort.\n\n**Hyperkalemia is generally more dangerous than hypercalcemia** \u2014 err on the side of treating. Avoid pushing ionized calcium >3 mM.',
        citation: [1, 2, 11],
        next: 'k-hyper-insulin',
    },
    {
        id: 'k-hyper-insulin',
        type: 'info',
        module: 3,
        title: 'Insulin + Dextrose \u2014 K+ Shift',
        body: '**[Regular Insulin](#/drug/regular-insulin) 5 units IV bolus** (must be IV, NOT subcutaneous).\n\n**Dextrose co-administration:**\n\u2022 Glucose < 250 mg/dL \u2192 **D50W 2 ampules** (100 mL total) OR **D10W 500 mL over 4 hours** (preferred \u2014 less rebound hypoglycemia)\n\u2022 Glucose 180-250 \u2192 half-dose dextrose (25g)\n\u2022 Glucose > 250 \u2192 no dextrose needed\n\n**Monitor fingerstick glucose q1h for 4-6 hours.** If glucose < 70 \u2192 give additional dextrose.\n\n**Effect:** Onset 15-30 min. K+ reduction: 0.5-1.2 mEq/L. Duration: ~4 hours \u2014 plan for redosing or definitive therapy.',
        citation: [1, 3, 4],
        next: 'k-hyper-beta2',
    },
    {
        id: 'k-hyper-beta2',
        type: 'info',
        module: 3,
        title: 'Beta-2 Agonist \u2014 K+ Shift',
        body: '**Preferred:** [Terbutaline](#/drug/terbutaline) **0.5 mg SQ** \u2014 single injection, logistically superior.\n\n**Alternative:** [Albuterol](#/drug/albuterol-neb) **10-20 mg nebulized** (4-8 standard nebs back-to-back). Nearly always underdosed in practice \u2014 a single 2.5 mg neb is inadequate.\n\n**If hypotensive/bradycardic:** [Epinephrine](#/drug/epinephrine) infusion \u2014 treats both hyperkalemia AND hemodynamic instability simultaneously.\n\n**Effect:** Onset 5-30 min. K+ reduction: 0.5-1 mEq/L. Duration: 2-4 hours. Efficacy ~50% lower in ESRD.',
        citation: [1, 6],
        next: 'k-hyper-step2',
    },
    {
        id: 'k-hyper-step2',
        type: 'question',
        module: 3,
        title: 'Step 2: Volume Resuscitation',
        body: 'Assess volume status and serum bicarbonate to guide fluid choice.\n\n**Do NOT use normal saline** \u2014 high chloride content worsens hyperkalemia.\n\nIsotonic bicarbonate is the **preferred resuscitative fluid** for hyperkalemic patients with metabolic acidosis.',
        citation: [1, 8, 9],
        options: [
            {
                label: 'Bicarb < 22 mEq/L (metabolic acidosis)',
                description: 'Use isotonic bicarbonate for volume resuscitation',
                next: 'k-hyper-bicarb',
            },
            {
                label: 'Bicarb \u2265 22 mEq/L or euvolemic',
                description: 'Use LR or Plasmalyte if fluid needed. Proceed to kaliuresis.',
                next: 'k-hyper-step3',
            },
        ],
    },
    {
        id: 'k-hyper-bicarb',
        type: 'info',
        module: 3,
        title: 'Isotonic Bicarbonate Resuscitation',
        body: '**Preparation:** 3 ampules NaHCO\u2083 in 1 liter D5W = **150 mM isotonic bicarbonate solution**.\n\n**Dosing:** 500-1000 mL/hour if severely hypovolemic. Target serum bicarb 24-28 mEq/L.\n\n**Isotonic bicarb lowers K+ three ways:**\n1. Dilution\n2. Shifting K+ into muscle cells\n3. Alkalosis promotes renal K+ excretion\n\n**Common mistake:** Giving isotonic bicarb at 100-150 mL/hr alongside another crystalloid. This prevents achieving the full benefit \u2014 use isotonic bicarb AS the resuscitative fluid.\n\n**AVOID hypertonic bicarbonate** (ampules alone) \u2014 proven ineffective in multiple RCTs. Osmotic shifts counteract the K-lowering effect.\n\nOnce bicarb > 24 and still hypovolemic \u2192 switch to LR for remaining volume.',
        citation: [1, 8, 9],
        next: 'k-hyper-step3',
    },
    {
        id: 'k-hyper-step3',
        type: 'info',
        module: 3,
        title: 'Step 3: Kaliuresis (Diuretic Strategy)',
        body: 'Scale diuretic intensity to severity of hyperkalemia and renal function.\n\n**Normal renal function:**\n\u2022 [Furosemide](#/drug/furosemide) 60-160 mg IV alone may suffice\n\n**Moderate-severe renal dysfunction ("nephron bomb"):**\n\u2022 [Furosemide](#/drug/furosemide) 160-250 mg IV (or [Bumetanide](#/drug/bumetanide) 4-5 mg IV)\n\u2022 + [Chlorothiazide](#/drug/chlorothiazide) 500-1000 mg IV (or [Metolazone](#/drug/metolazone) 5-10 mg PO)\n\u2022 +/- [Acetazolamide](#/drug/acetazolamide) 250-1000 mg IV/PO\n\u2022 +/- [Fludrocortisone](#/drug/fludrocortisone) 0.2 mg PO (esp. patients on ACEi/ARB, tacrolimus)\n\n**Replace urine losses** with crystalloid:\n\u2022 Bicarb < 22 \u2192 isotonic bicarbonate\n\u2022 Bicarb \u2265 22 \u2192 Lactated Ringers\n\nIn life-threatening hyperK, **err on the side of excessive diuretic**. Large-volume diuresis is easily corrected with crystalloid.',
        citation: [1, 2],
        next: 'k-hyper-step3-response',
    },
    {
        id: 'k-hyper-step3-response',
        type: 'question',
        module: 3,
        title: 'Assess Diuretic Response',
        body: 'Monitor urine output. If the patient produces urine, check potassium content.\n\nIf making urine but K+ not falling \u2192 consider adding [Fludrocortisone](#/drug/fludrocortisone) 0.2 mg PO.\n\nCheck electrolytes (including Mg) frequently and replete as needed.',
        citation: [1],
        options: [
            {
                label: 'Making urine \u2014 K+ improving',
                description: 'Continue kaliuresis, replace urine volume, monitor',
                next: 'k-hyper-step4',
            },
            {
                label: 'Not making urine \u2014 kaliuresis failed',
                description: 'Anuric despite diuretics \u2192 dialysis indicated',
                next: 'k-hyper-step5',
            },
        ],
    },
    // =====================================================================
    // MODULE 4: K+ ELIMINATION
    // =====================================================================
    {
        id: 'k-hyper-step4',
        type: 'info',
        module: 4,
        title: 'Step 4: Potassium Binders',
        body: '[Lokelma (SZC)](#/drug/sodium-zirconium-cyclosilicate) **10 grams PO q8h**\n\nOnly **mildly effective** (~0.2 mM reduction at 4 hours, ~0.4 mM at 24 hours). Should NOT be relied upon as sole treatment.\n\nMay help **avoid or delay dialysis** in borderline cases.\n\n**Avoid Kayexalate** \u2014 antiquated, probably ineffective for acute hyperK, and can cause **colonic necrosis**.\n\nPatiromer is less effective than SZC (~0.23 mM at 7 hours). Only use if SZC unavailable.',
        citation: [1, 12, 13],
        next: 'k-hyper-monitor',
    },
    {
        id: 'k-hyper-step5',
        type: 'info',
        module: 4,
        title: 'Step 5: Dialysis',
        body: '**Indications for emergent dialysis:**\n1. Chronic hemodialysis patient (kaliuresis is futile)\n2. Failure of all other measures (anuric despite diuretic bomb, not a candidate for large-volume isotonic bicarb)\n\n**Do NOT delay dialysis** while hoping potassium binders will work.\n\nFor chronic HD patients, 5 grams of SZC daily on non-dialysis days may help reduce intradialytic hyperkalemia.',
        citation: [1],
        next: 'k-hyper-monitor',
    },
    {
        id: 'k-hyper-monitor',
        type: 'result',
        module: 4,
        title: 'Hyperkalemia Monitoring & Reassessment',
        body: '**Ongoing monitoring during acute hyperkalemia treatment.**\n\nRecheck K+ every 1-2 hours. Repeat ECG with any clinical change.\n\nInsulin K+ shift lasts ~4 hours \u2014 plan for redosing or definitive elimination.\n\nMonitor glucose q1h for 4-6 hours post-insulin. Check Mg, Ca, phosphorus frequently.\n\nReplace urine losses with appropriate crystalloid. Address underlying cause simultaneously.',
        recommendation: 'Recheck K+ every 1-2 hours during acute treatment. Repeat ECG with any clinical change. Insulin K+ shift lasts ~4 hours \u2014 plan for redosing or definitive elimination. Monitor glucose q1h for 4-6 hours post-insulin. Check Mg, Ca, phosphorus frequently. Replace urine losses with appropriate crystalloid. Address underlying cause simultaneously.',
        citation: [1, 2],
    },
    // =====================================================================
    // MODULE 5: HYPOK MANAGEMENT
    // =====================================================================
    {
        id: 'k-hypo-assess',
        type: 'question',
        module: 5,
        title: 'Hypokalemia Assessment',
        body: 'Check ECG for arrhythmia risk. [Hypokalemia ECG Findings](#/info/k-hypo-ecg-info)\n\nAssess for life-threatening features:\n\u2022 Arrhythmia (VT, TdP, new AF)\n\u2022 Respiratory failure\n\u2022 Paralysis or severe weakness',
        citation: [14, 15],
        options: [
            {
                label: 'Severe (K+ \u2264 2.5 or life-threatening features)',
                description: 'Arrhythmia, paralysis, respiratory failure, or K+ \u2264 2.5',
                next: 'k-hypo-severe',
            },
            {
                label: 'Mild-Moderate (K+ 2.5-3.5, stable)',
                description: 'No arrhythmia, hemodynamically stable',
                next: 'k-hypo-mild',
            },
            {
                label: 'Suspect Periodic Paralysis',
                description: 'Episodic weakness, triggers, family history',
                next: 'k-hypopp-assess',
            },
        ],
    },
    {
        id: 'k-hypo-severe',
        type: 'info',
        module: 5,
        title: 'Severe Hypokalemia \u2014 IV Replacement',
        body: '[Potassium Chloride IV](#/drug/potassium-chloride-iv) **5-10 mEq over 15-30 minutes** with continuous cardiac monitoring.\n\nRepeat until hemodynamically stable, ECG changes resolve, and K+ > 3 mEq/L. Then:\n\u2022 20-40 mEq IV at up to 10 mEq/hr (peripheral)\n\u2022 Up to 20 mEq/hr (central line + cardiac monitoring)\n\n**Use glucose-free fluids** \u2014 glucose stimulates insulin and worsens intracellular K+ shift.\n\n**Always check and correct magnesium** \u2014 up to 50% of hypokalemic patients have concurrent hypoMg, which makes K+ repletion refractory.\n\nIf Mg < 2.0 \u2192 [Magnesium Sulfate](#/drug/magnesium-sulfate/hypomagnesemia) 2g IV over 1 hour.',
        citation: [14, 15, 16],
        next: 'k-hypo-workup',
    },
    {
        id: 'k-hypo-mild',
        type: 'info',
        module: 5,
        title: 'Mild-Moderate Hypokalemia \u2014 Oral Replacement',
        body: '[Potassium Chloride Oral](#/drug/potassium-chloride-oral) **20-40 mEq PO**\n\nEach 20 mEq raises serum K+ ~0.2 mEq/L. KCl is the **preferred salt** (most causes of hypoK involve concurrent chloride losses).\n\nRecheck K+ in 2-4 hours.\n\n**Target K+ \u2265 4.0 mEq/L** \u2014 especially in heart failure and arrhythmia-prone patients.\n\n**Dietary potassium alone is INSUFFICIENT** \u2014 food K+ is coupled with phosphate, not chloride, and ineffective for replacing chloride-associated losses.\n\n**Always check magnesium** \u2014 hypoMg causes refractory hypokalemia via ROMK channel dysfunction.',
        citation: [14, 15, 16],
        next: 'k-hypo-workup',
    },
    {
        id: 'k-hypo-workup',
        type: 'info',
        module: 5,
        title: 'Hypokalemia Etiology',
        body: '**Common causes:**\n\u2022 Diuretics (thiazides > loops \u2014 0.6 vs 0.3 mEq/L decrease)\n\u2022 GI losses (vomiting, diarrhea, NG suction)\n\u2022 Refeeding syndrome\n\u2022 DKA treatment (insulin shifts K+ intracellularly)\n\u2022 Alkalosis\n\n**Workup:**\n\u2022 BMP, Mg, Phos\n\u2022 Urine K+ and Cl-\n\u2022 If urine K+ > 30 mEq/day \u2192 renal losses\n\u2022 If urine K+ < 25 mEq/day \u2192 extrarenal losses\n\n**Key:** Identify and treat the underlying cause in ALL patients.',
        citation: [14, 15],
        next: 'k-hypo-chronic',
    },
    {
        id: 'k-hypo-chronic',
        type: 'result',
        module: 5,
        title: 'Long-Term Hypokalemia Management',
        body: '**Chronic K+ replacement and prevention strategy.**\n\nOral KCl 50-75 mEq/day for chronic replacement.\n\nFor diuretic-induced hypokalemia: low-salt diet, consider K-sparing diuretic, ACEi/ARB, or beta-blocker addition.\n\nLoop diuretics cause less hypoK than thiazides. Correct hypomagnesemia. Target K+ \u2265 4.0 mEq/L in heart failure patients.',
        recommendation: 'Oral KCl 50-75 mEq/day for chronic replacement (raises K+ ~0.14 mEq/L, enhanced with ACEi/ARB). For diuretic-induced: low-salt diet, consider K-sparing diuretic, ACEi/ARB, or beta-blocker addition. Loop diuretics cause less hypoK than thiazides. Monitor renal function and potassium regularly. Correct hypomagnesemia. Target K+ \u2265 4.0 mEq/L in heart failure patients.',
        citation: [14, 15, 16],
    },
    // =====================================================================
    // MODULE 6: PERIODIC PARALYSIS
    // =====================================================================
    {
        id: 'k-hypopp-assess',
        type: 'question',
        module: 6,
        title: 'Periodic Paralysis Assessment',
        body: '**Hypokalemic Periodic Paralysis (HypoPP)**\n\nEpisodic flaccid paralysis, **proximal > distal**, with normal-to-decreased reflexes. Lasting minutes to days with spontaneous recovery.\n\n**Triggers:** Rest after strenuous exercise, carbohydrate-rich evening meals (morning attacks), stress, cold, high sodium intake, corticosteroids, alcohol\n\n**KEY DISTINCTION:** Hypokalemia in HypoPP is **transcellular redistribution, NOT true body K+ depletion**. This fundamentally changes treatment.\n\n**Genetics:** CACNA1 (calcium channel) or SCN4A (sodium channel) mutations.',
        citation: [17, 18],
        options: [
            {
                label: 'Confirmed/Suspected HypoPP \u2014 Treat Attack',
                description: 'Episodic weakness with triggers, family history, or prior episodes',
                next: 'k-hypopp-acute',
            },
            {
                label: 'Not Periodic Paralysis',
                description: 'Proceed to standard hypokalemia management',
                next: 'k-hypo-severe',
            },
        ],
    },
    {
        id: 'k-hypopp-acute',
        type: 'info',
        module: 6,
        title: 'HypoPP: Acute Attack Management',
        body: '**CRITICAL: This is NOT true K+ depletion \u2014 aggressive replacement causes dangerous rebound hyperkalemia.**\n\n[Potassium Chloride Oral](#/drug/potassium-chloride-oral) **1 mEq/kg oral** (~60 mEq for 60 kg patient)\n\u2022 Use **immediate-release or liquid** formulation ONLY\n\u2022 **AVOID slow-release** KCl \u2014 too slow and unpredictable\n\u2022 If no improvement in 30 min \u2192 0.3 mEq/kg additional dose\n\u2022 Monitor K+ every 30 minutes\n\n**For severe attacks requiring IV:**\n\u2022 Max rate 0.3 mEq/kg/hr with continuous cardiac monitoring\n\n**AVOID:**\n\u2022 Glucose-containing fluids (worsens intracellular shift)\n\u2022 Corticosteroids (known trigger)\n\u2022 Aggressive IV KCl (rebound hyperkalemia)\n\n**Resolution of weakness may lag behind K+ normalization.**',
        citation: [17, 18],
        next: 'k-hypopp-prevent',
    },
    {
        id: 'k-hypopp-prevent',
        type: 'result',
        module: 6,
        title: 'HypoPP: Prevention & Long-Term',
        body: '**Long-term prevention of hypokalemic periodic paralysis attacks.**\n\nTrigger avoidance: low sodium, low carbohydrate diet, avoid steroids/cold/stress/alcohol.\n\nDaily oral KCl 10-20 mEq TID (especially nocturnal dose for morning attacks).\n\nAcetazolamide is first-line pharmacologic prevention. If intolerant: K-sparing diuretics (triamterene, spironolactone, eplerenone).\n\nGenetic counseling: CACNA1 or SCN4A testing for family planning.',
        recommendation: 'Trigger avoidance: low sodium, low carbohydrate diet, avoid steroids/cold/stress/alcohol. Daily oral KCl 10-20 mEq TID (especially nocturnal dose for morning attacks). Acetazolamide is first-line pharmacologic prevention (mechanism uncertain \u2014 may involve systemic acidosis reducing attack susceptibility). If intolerant: K-sparing diuretics (triamterene, spironolactone, eplerenone). Magnesium supplementation may enhance renal K+ retention. Anesthetic precautions: strict K+ control, avoid glucose/salt loads, maintain temperature and acid-base balance. Genetic counseling: CACNA1 or SCN4A testing for family planning.',
        citation: [17, 18],
    },
];
export const POTASSIUM_NODE_COUNT = POTASSIUM_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const POTASSIUM_MODULE_LABELS = [
    'Initial Assessment',
    'HyperK Severity',
    'Severe HyperK Rx',
    'K+ Elimination',
    'HypoK Management',
    'Periodic Paralysis',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const POTASSIUM_CITATIONS = [
    { num: 1, text: 'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.' },
    { num: 2, text: 'Rossignol P, et al. Emergency management of severe hyperkalemia. Pharmacol Res. 2016;113(Pt A):585-591.' },
    { num: 3, text: 'Moussavi K, et al. Management of Hyperkalemia With Insulin and Glucose. J Emerg Med. 2019;57(1):36-42.' },
    { num: 4, text: 'Harel Z, Kamel KS. Optimal Dose of Intravenous Insulin for Hyperkalemia. PLoS One. 2016;11(5):e0154963.' },
    { num: 5, text: 'Durfey N, et al. Severe Hyperkalemia: Can the ECG Risk Stratify for Short-term Adverse Events? West J Emerg Med. 2017;18(5):963-971.' },
    { num: 6, text: 'Sowinski KM, et al. Subcutaneous terbutaline use in CKD to reduce potassium. Am J Kidney Dis. 2005;45(6):1040-5.' },
    { num: 7, text: 'Lindner G, et al. Acute hyperkalemia in the emergency department. Eur J Emerg Med. 2020;27(5):329-337.' },
    { num: 8, text: 'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.' },
    { num: 9, text: 'O\'Malley CM, et al. A randomized comparison of lactated Ringer\'s and 0.9% NaCl during renal transplantation. Anesth Analg. 2005;100(5):1518-24.' },
    { num: 10, text: 'Palmer BF, Clegg DJ. Diagnosis and Treatment of Hyperkalemia. Cleve Clin J Med. 2017;84(12):934-942.' },
    { num: 11, text: 'Gupta AA, et al. Dispelling myths and misconceptions about treatment of acute hyperkalemia. Am J Emerg Med. 2022;52:85-91.' },
    { num: 12, text: 'Sterns RH, et al. Ion-exchange resins for the treatment of hyperkalemia: are they safe and effective? J Am Soc Nephrol. 2010;21(5):733-5.' },
    { num: 13, text: 'Long B, et al. Controversies in Management of Hyperkalemia. J Emerg Med. 2018;55(2):192-205.' },
    { num: 14, text: 'Kim MJ, et al. Potassium Disorders: Hypokalemia and Hyperkalemia. Am Fam Physician. 2023;107(1):59-70.' },
    { num: 15, text: 'Gennari FJ. Hypokalemia. N Engl J Med. 1998;339(7):451-8.' },
    { num: 16, text: 'Ferreira JP, et al. Abnormalities of Potassium in Heart Failure: JACC State-of-the-Art Review. J Am Coll Cardiol. 2020;75(22):2836-2850.' },
    { num: 17, text: 'Statland JM, et al. Review of the Diagnosis and Treatment of Periodic Paralysis. Muscle Nerve. 2018;57(4):522-530.' },
    { num: 18, text: 'Weber F, Lehmann-Horn F. Hypokalemic Periodic Paralysis. GeneReviews. Updated 2018.' },
];
// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------
export const POTASSIUM_CLINICAL_NOTES = [
    'Regular insulin 5 units IV (not 10) with mandatory dextrose reduces hypoglycemia from 15-20% to <5% while maintaining similar K-lowering effect.',
    'Terbutaline 0.5 mg SQ is logistically superior to nebulized albuterol \u2014 single injection vs. 4-8 back-to-back nebs with similar efficacy.',
    'Normal saline worsens hyperkalemia via renal tubular chloride-bicarbonate exchange. Use LR or Plasmalyte.',
    'Kayexalate has NO role in acute hyperkalemia management. Risk of colonic necrosis supersedes any theoretical benefit.',
    'ECG sensitivity for peaked T-waves in hyperkalemia is only ~34%. Never rule out dangerous hyperkalemia based on normal ECG.',
    'Always check and correct magnesium in hypokalemia \u2014 up to 50% have concurrent hypoMg which makes K+ repletion refractory.',
    'Hypokalemic Periodic Paralysis involves transcellular K+ redistribution \u2014 NOT true depletion. Aggressive IV repletion risks dangerous rebound hyperkalemia.',
    'IV KCl rates >10 mEq/hr require central venous access and continuous cardiac monitoring.',
    'Glucose-containing IV fluids worsen hypokalemia by stimulating insulin release and driving K+ intracellularly.',
    'Fludrocortisone 0.2 mg PO is underutilized for hyperK in patients on ACEi/ARB or tacrolimus \u2014 replaces suppressed mineralocorticoid effect.',
    'Isotonic bicarbonate (150 mM) works for hyperK with metabolic acidosis. Hypertonic bicarbonate ampules are proven ineffective in multiple RCTs.',
    'For life-threatening hyperkalemia, err on excessive diuretic \u2014 large-volume diuresis is easily corrected with crystalloid; inadequate diuretic may require dialysis.',
];
