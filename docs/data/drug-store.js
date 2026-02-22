// MedKitt — Drug Reference Store
// Centralized drug data for all medications used across decision trees.
// Each entry includes class, indications, dosing, contraindications, and citations.
// -------------------------------------------------------------------
// Drug Definitions (Alphabetical)
// -------------------------------------------------------------------
const ALTEPLASE = {
    id: 'alteplase',
    name: 'Alteplase (tPA)',
    genericName: 'Alteplase',
    drugClass: 'Thrombolytic (tissue plasminogen activator)',
    route: 'IV',
    indications: ['Massive (high-risk) pulmonary embolism', 'Acute ischemic stroke', 'Acute STEMI'],
    dosing: [
        {
            indication: 'High-risk PE',
            regimen: '100 mg IV over 2 hours: 0.6 mg/kg (max 50 mg) over first 15 min, remainder over next 1 hr 45 min. Stop UFH drip before infusion. Post-infusion: check PTT \u2014 if \u226475 restart UFH without bolus; if >75 repeat PTT q2hr until \u226475.',
        },
    ],
    contraindications: [
        'Absolute: Haemorrhagic stroke or stroke of unknown origin, Ischaemic stroke within 6 months, CNS neoplasm, Major trauma/surgery/head injury within 3 weeks, Bleeding diathesis, Active bleeding',
        'Relative: TIA within 6 months, Oral anticoagulation, Pregnancy or first postpartum week, Non-compressible puncture sites, Traumatic resuscitation, Refractory HTN (SBP >180), Advanced liver disease, Infective endocarditis, Active peptic ulcer',
    ],
    monitoring: 'Assess hemodynamic response 1\u20132 hours post-infusion. Check PTT before restarting heparin.',
    notes: 'Fibrinolytic therapy is the first-line reperfusion strategy for high-risk PE with hemodynamic instability (ESC 2019, Class I, Level B).',
    citations: [
        'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603.',
    ],
};
const AMIODARONE = {
    id: 'amiodarone',
    name: 'Amiodarone',
    genericName: 'Amiodarone hydrochloride',
    drugClass: 'Class III antiarrhythmic (multichannel blocker)',
    route: 'IV / PO',
    indications: ['A-Fib / A-Flutter rate control', 'A-Fib / A-Flutter rhythm control (cardioversion)', 'Ventricular tachycardia', 'Cardiac arrest (VF/pulseless VT)'],
    dosing: [
        {
            indication: 'A-Fib rate control',
            regimen: 'Load: 150 mg IV over 10 min. Infusion: 1 mg/min x 6 hr, then 0.5 mg/min x 18 hr. May re-bolus 150 mg x2-3 PRN (total 150-450 mg boluses). Do not conclude failure without adequate re-bolusing.',
        },
        {
            indication: 'A-Fib rhythm control (cardioversion)',
            regimen: 'Load: 300 mg (or 5-7 mg/kg) IV over 30-60 min. Then 1 mg/min infusion. Total 24hr IV dose: 1,200-3,000 mg. Convert to PO 400 mg BID after >24hr IV, until 10g cumulative dose reached, then 200 mg daily maintenance.',
        },
        {
            indication: 'Cardiac arrest (VF/pVT)',
            regimen: '300 mg IV/IO push. May repeat 150 mg x1.',
        },
    ],
    contraindications: [
        'Cardiogenic shock',
        'Severe sinus node dysfunction without pacemaker',
        'Second/third-degree AV block without pacemaker',
        'Known hypersensitivity to iodine (contains iodine)',
    ],
    cautions: [
        'QT prolongation \u2014 monitor QTc, hold if QTc >500ms',
        'Hepatotoxicity \u2014 check LFTs at baseline and periodically',
        'Thyroid dysfunction (both hypo and hyper) \u2014 contains 37% iodine by weight',
        'Pulmonary toxicity with chronic use \u2014 baseline CXR and PFTs recommended',
        'Phlebitis with peripheral IV \u2014 use central line when possible for infusions >24hr',
        'Potentiates warfarin \u2014 reduce warfarin dose by 30-50% when initiating',
    ],
    monitoring: 'Continuous telemetry during IV loading. QTc interval. LFTs, TFTs, CXR at baseline. For chronic use: TFTs, LFTs, PFTs, ophthalmologic exam every 6-12 months.',
    notes: 'Amiodarone is useful for critically ill patients due to relative hemodynamic stability compared to beta-blockers and CCBs. Achieves rate control in ~74% of patients. Chemical cardioversion may occur \u2014 continue infusion until critical illness resolves to prevent AF recurrence. Chronic use causes numerous side effects \u2014 plan transition to safer long-term agent (e.g., beta-blocker) after recovery.',
    citations: [
        'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
        'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
        'Bosch NA, et al. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434.',
    ],
};
const APIXABAN = {
    id: 'apixaban',
    name: 'Apixaban',
    genericName: 'Apixaban',
    drugClass: 'Direct oral anticoagulant (Factor Xa inhibitor)',
    route: 'PO',
    indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'Atrial fibrillation (stroke prevention)'],
    dosing: [
        {
            indication: 'PE / DVT treatment',
            regimen: '10 mg twice daily \u00D7 7 days, then 5 mg twice daily \u00D7 3\u20136 months. Extended therapy: 5 mg or 2.5 mg twice daily.',
        },
    ],
    cautions: [
        'Severe renal impairment (CrCl <25 mL/min) \u2014 limited data',
        'Moderate hepatic impairment (Child-Pugh B) \u2014 use with caution',
        'Strong CYP3A4 and P-gp inhibitors/inducers \u2014 avoid concomitant use',
    ],
    notes: 'Single-drug oral therapy \u2014 no initial parenteral heparin required. Particularly convenient for outpatient PE management.',
    citations: [
        'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.',
        'Renner E, Barnes GD. Antithrombotic Management of VTE: JACC Focus Seminar. J Am Coll Cardiol. 2020.',
    ],
};
const BENZATHINE_PENICILLIN = {
    id: 'benzathine-penicillin',
    name: 'Benzathine Penicillin G',
    genericName: 'Benzathine penicillin G',
    drugClass: 'Natural penicillin (long-acting IM depot)',
    route: 'IM',
    indications: ['Primary syphilis', 'Secondary syphilis', 'Early latent syphilis', 'Late latent syphilis', 'Tertiary syphilis (non-neurologic)'],
    dosing: [
        {
            indication: 'Primary / Secondary / Early latent syphilis',
            regimen: '2.4 million units IM \u00D7 1 dose.',
        },
        {
            indication: 'Late latent / Tertiary syphilis (non-neurologic)',
            regimen: '2.4 million units IM weekly \u00D7 3 weeks (3 doses).',
        },
    ],
    contraindications: [
        'Penicillin allergy (IgE-mediated / anaphylaxis)',
    ],
    cautions: [
        'Jarisch-Herxheimer reaction \u2014 fever, myalgia, headache within 24 hr of treatment. Self-limited. More common in secondary syphilis.',
        'Does NOT achieve treponemicidal levels in CSF \u2014 not adequate for neurosyphilis.',
    ],
    monitoring: 'Quantitative RPR at 6, 12, and 24 months post-treatment. Expect 4-fold decline by 6\u201312 months.',
    citations: [
        'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
        'IDSA. Practice Guidelines for the Management of Syphilis. 2025.',
    ],
};
const CEFTRIAXONE = {
    id: 'ceftriaxone',
    name: 'Ceftriaxone',
    genericName: 'Ceftriaxone',
    drugClass: 'Third-generation cephalosporin',
    route: 'IV',
    indications: ['Neurosyphilis (PCN allergy alternative)', 'Bacterial meningitis', 'Various serious infections'],
    dosing: [
        {
            indication: 'Neurosyphilis (if desensitization not feasible)',
            regimen: '2 g IV daily \u00D7 10\u201314 days.',
        },
    ],
    contraindications: [
        'Severe cephalosporin allergy',
        'Note: ~2\u20135% cross-reactivity with penicillin allergy \u2014 lower than historically believed',
    ],
    cautions: [
        'Biliary sludging \u2014 avoid co-administration with calcium-containing IV solutions in neonates',
        'Not first-line for neurosyphilis \u2014 limited evidence compared to IV penicillin G. Use only if desensitization is not feasible.',
    ],
    monitoring: 'CSF re-examination at 6 months post-treatment to document improvement.',
    citations: [
        'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
        'Marra CM, et al. Ceftriaxone for Neurosyphilis. Clin Infect Dis. 2019.',
    ],
};
const DABIGATRAN = {
    id: 'dabigatran',
    name: 'Dabigatran',
    genericName: 'Dabigatran etexilate',
    drugClass: 'Direct oral anticoagulant (Direct thrombin inhibitor)',
    route: 'PO',
    indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'Atrial fibrillation (stroke prevention)'],
    dosing: [
        {
            indication: 'PE / DVT treatment',
            regimen: 'Requires 5\u201310 days parenteral anticoagulation (LMWH or UFH) first, then 150 mg twice daily.',
        },
    ],
    cautions: [
        'CrCl <30 mL/min \u2014 contraindicated (predominantly renal clearance ~80%)',
        'Strong P-gp inhibitors in CrCl <50 mL/min \u2014 dose reduction or avoidance',
        'No dose adjustment for hepatic impairment (not hepatically metabolized)',
    ],
    notes: 'Requires initial parenteral anticoagulation bridge (unlike apixaban/rivaroxaban). Specific reversal agent: idarucizumab (Praxbind).',
    citations: [
        'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.',
    ],
};
const DIGOXIN = {
    id: 'digoxin',
    name: 'Digoxin',
    genericName: 'Digoxin',
    drugClass: 'Cardiac glycoside',
    route: 'IV / PO',
    indications: ['A-Fib / A-Flutter rate control (adjunctive)', 'Heart failure with reduced EF'],
    dosing: [
        {
            indication: 'A-Fib rate control (acute)',
            regimen: 'IV loading: 0.25 mg IV every 2 hours, up to 1.5 mg total. Onset: ~3 hours (vs 5 min for diltiazem). Slow onset makes it unsuitable as sole agent for acute rate control.',
        },
        {
            indication: 'A-Fib rate control (maintenance)',
            regimen: '0.125-0.25 mg PO daily. Adjust for renal function and age.',
        },
    ],
    contraindications: [
        'Hypertrophic obstructive cardiomyopathy (HOCM)',
        'WPW syndrome with atrial fibrillation',
        'Ventricular tachycardia/fibrillation',
        'Severe hypokalemia (increases toxicity risk)',
    ],
    cautions: [
        'Renal impairment \u2014 reduce dose, monitor levels (CrCl <50: reduce dose 50%)',
        'Hypokalemia and hypomagnesemia potentiate toxicity',
        'Post hoc analyses associate digoxin with increased mortality in AF \u2014 use at low doses',
        'Limited exertional efficacy \u2014 slows primarily resting heart rate',
        'Narrow therapeutic index \u2014 toxicity at levels >2.0 ng/mL',
        'Drug interactions: amiodarone increases digoxin levels 70-100%',
    ],
    monitoring: 'Serum digoxin level (target 0.5-0.9 ng/mL for AF). Serum potassium, magnesium, creatinine. ECG for toxicity signs (ST scooping, PAT with block, bidirectional VT).',
    notes: 'Best used as adjunctive therapy when hypotension limits further titration of beta-blockers or CCBs. Particularly useful in patients with concurrent heart failure. Avoid as sole agent for acute rate control due to slow onset. Use at lowest effective dose given mortality concerns.',
    citations: [
        'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
        'Michaud GF, Stevenson WG. Atrial Fibrillation. N Engl J Med. 2021;384(4):353-361.',
        'Ko D, et al. Atrial Fibrillation: A Review. JAMA. 2025;333(4):329-342.',
    ],
};
const DILTIAZEM = {
    id: 'diltiazem',
    name: 'Diltiazem',
    genericName: 'Diltiazem hydrochloride',
    drugClass: 'Nondihydropyridine calcium channel blocker',
    route: 'IV',
    indications: ['A-Fib / A-Flutter rate control', 'Supraventricular tachycardia'],
    dosing: [
        {
            indication: 'A-Fib rate control (acute)',
            regimen: 'Initial bolus: 0.25 mg/kg IV over 2 min (typically 20-25 mg). If inadequate response after 15 min, second bolus: 0.35 mg/kg IV over 2 min. Then continuous infusion: 5-15 mg/hr, titrate to heart rate.',
        },
    ],
    contraindications: [
        'EF \u226440% or moderate-to-severe LV systolic dysfunction (Class 3: Harm)',
        'Decompensated heart failure',
        'Severe hypotension (SBP <90)',
        'Sick sinus syndrome without pacemaker',
        'Second/third-degree AV block without pacemaker',
        'WPW with atrial fibrillation',
        'Concurrent IV beta-blocker use',
    ],
    cautions: [
        'Hypotension \u2014 most common adverse effect, especially with continuous infusion',
        'Obtain echo or check history for EF if unknown \u2014 CCBs are dangerous in HFrEF',
        'Accumulation with prolonged infusions \u2014 monitor closely and titrate down when able',
        'Negative inotropic effects may worsen borderline hemodynamics',
        'Consider metoprolol over diltiazem in critically ill patients due to lower hypotension risk',
    ],
    monitoring: 'Continuous heart rate and blood pressure monitoring during IV infusion. Reassess hemodynamics frequently. Transition to oral rate control agent when stable.',
    notes: 'Achieves rate control more rapidly than digoxin or amiodarone (90% vs 74%, with faster time to HR <90). First-line for A-Fib rate control when EF >40%. Do NOT combine with IV beta-blockers \u2014 risk of synergistic hypotension and bradycardia.',
    citations: [
        'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
        'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
    ],
};
const DOXYCYCLINE = {
    id: 'doxycycline',
    name: 'Doxycycline',
    genericName: 'Doxycycline',
    drugClass: 'Tetracycline antibiotic',
    route: 'PO',
    indications: ['Syphilis (PCN allergy alternative)', 'Chlamydia', 'Tick-borne diseases', 'Acne', 'Malaria prophylaxis'],
    dosing: [
        {
            indication: 'Primary / Secondary / Early latent syphilis (PCN allergy)',
            regimen: '100 mg PO BID \u00D7 14 days.',
        },
        {
            indication: 'Late latent / Tertiary syphilis (PCN allergy)',
            regimen: '100 mg PO BID \u00D7 28 days.',
        },
    ],
    contraindications: [
        'Pregnancy \u2014 tetracyclines cause fetal bone/teeth abnormalities',
        'Children < 8 years (tooth discoloration)',
    ],
    cautions: [
        'Photosensitivity \u2014 advise sun protection',
        'Esophageal ulceration \u2014 take with full glass of water, remain upright 30 min',
        'Not adequate for neurosyphilis \u2014 poor CSF penetration',
    ],
    monitoring: 'Quantitative RPR at 6, 12, and 24 months post-treatment.',
    notes: 'Alternative for non-pregnant PCN-allergic patients with early syphilis. Evidence is weaker than for penicillin G.',
    citations: [
        'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
    ],
};
const EDOXABAN = {
    id: 'edoxaban',
    name: 'Edoxaban',
    genericName: 'Edoxaban',
    drugClass: 'Direct oral anticoagulant (Factor Xa inhibitor)',
    route: 'PO',
    indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'Atrial fibrillation (stroke prevention)'],
    dosing: [
        {
            indication: 'PE / DVT treatment',
            regimen: 'Requires 5\u201310 days parenteral anticoagulation (LMWH) first, then 60 mg once daily. Reduce to 30 mg once daily if: CrCl 15\u201350 mL/min, body weight <60 kg, or concomitant P-glycoprotein inhibitors.',
        },
    ],
    cautions: [
        'CrCl >95 mL/min \u2014 reduced efficacy vs warfarin (avoid in AF indication)',
        'CrCl <15 mL/min \u2014 not recommended',
        'Moderate-severe hepatic impairment \u2014 not recommended',
    ],
    notes: 'Requires initial parenteral anticoagulation bridge. Once-daily dosing may improve adherence.',
    citations: [
        'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.',
    ],
};
const EPINEPHRINE = {
    id: 'epinephrine',
    name: 'Epinephrine (Intracavernosal)',
    genericName: 'Epinephrine',
    drugClass: 'Non-selective adrenergic agonist (alpha + beta)',
    route: 'Intracavernosal',
    indications: ['Ischemic priapism (alternative to phenylephrine)'],
    dosing: [
        {
            indication: 'Ischemic priapism',
            regimen: '20 mcg (2 mL of 10 mcg/mL solution) intracavernosal every 5 minutes, up to 5 doses total (100 mcg max). Mix: 1 mL epi from cardiac amp (100 mcg/mL) + 9 mL NS = 10 mcg/mL.',
        },
    ],
    contraindications: [
        'Uncontrolled hypertension',
        'MAO inhibitor use',
        'Do NOT give cardiac arrest doses (1 mg) to patients with a pulse',
    ],
    cautions: [
        'Has alpha AND beta1/2 effects \u2014 higher cardiovascular risk than phenylephrine',
        'Monitor BP and HR every 5 min between injections',
        'Hold if SBP > 160 or HR > 110',
    ],
    monitoring: 'BP/HR every 5 min during injections. Observe 60 min post-detumescence.',
    notes: 'Use only if phenylephrine is unavailable. Phenylephrine is preferred due to pure alpha-1 selectivity and lower cardiovascular risk. Onset: 1 min. Duration: 5\u201310 min.\n\nMIXING INSTRUCTIONS (10 mcg/mL):\n1. Take a 10 mL syringe and draw up 9 mL of normal saline\n2. Draw up 1 mL of epinephrine from the cardiac amp (cardiac amp contains 100 mcg/mL)\n3. Now you have 10 mL of epinephrine at 10 mcg/mL\n4. Each dose = 2 mL (20 mcg)\n\n\u26A0\uFE0F Do NOT give cardiac arrest doses (1 mg) to patients with a pulse.',
    citations: [
        'Bivalacqua TJ, et al. AUA/SMSNA Guideline on Priapism. J Urol. 2022;208(1):43-52.',
        'Graham BA, et al. Emergency Pharmacotherapy for Priapism. Expert Opin Pharmacother. 2022;23(12):1371-80.',
    ],
};
const ENOXAPARIN = {
    id: 'enoxaparin',
    name: 'Enoxaparin (LMWH)',
    genericName: 'Enoxaparin sodium',
    drugClass: 'Low molecular weight heparin',
    route: 'SC',
    indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'ACS', 'VTE prophylaxis'],
    dosing: [
        {
            indication: 'PE / DVT treatment',
            regimen: '1 mg/kg SC every 12 hours, or 1.5 mg/kg SC once daily.',
        },
        {
            indication: 'VTE prophylaxis',
            regimen: '40 mg SC once daily.',
        },
    ],
    contraindications: [
        'Heparin-induced thrombocytopenia (HIT) \u2014 absolute contraindication due to cross-reactivity with HIT antibodies',
        'Active major bleeding',
    ],
    cautions: [
        'Severe renal insufficiency (CrCl \u226430 mL/min) \u2014 significantly increased bleeding risk (OR 2.25 for major bleeding). Consider UFH when CrCl <25\u201330 mL/min.',
        'Neuraxial anesthesia \u2014 administer LMWH \u226512 hr before catheter placement/removal; delay dosing \u22654 hr after removal. No twice-daily LMWH with indwelling neuraxial catheter.',
        'Extreme body weight (<40 kg or >100 kg), pregnancy, pediatrics \u2014 consider anti-Xa monitoring. Monitor if >150 kg.',
        'Effects cannot be completely reversed by protamine sulfate.',
    ],
    monitoring: 'Anti-Xa levels if renal impairment, extremes of weight, or pregnancy. Platelet count if > 4 days of therapy (HIT screening).',
    citations: [
        'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020.',
        'Garcia DA, et al. Parenteral Anticoagulants: ACCP Evidence-Based Clinical Practice Guidelines. Chest. 2012.',
    ],
};
const ESMOLOL = {
    id: 'esmolol',
    name: 'Esmolol',
    genericName: 'Esmolol hydrochloride',
    drugClass: 'Ultra-short-acting beta-1 selective blocker',
    route: 'IV',
    indications: ['A-Fib / A-Flutter rate control', 'Supraventricular tachycardia', 'Perioperative tachycardia/hypertension'],
    dosing: [
        {
            indication: 'A-Fib rate control',
            regimen: 'Loading dose: 500 mcg/kg IV over 1 minute. Infusion: 50-200 mcg/kg/min, titrate by 50 mcg/kg/min every 4 min. May repeat loading dose with each infusion increase.',
        },
    ],
    contraindications: [
        'Severe sinus bradycardia',
        'Heart block greater than first degree without pacemaker',
        'Cardiogenic shock',
        'Decompensated heart failure',
        'WPW with atrial fibrillation',
    ],
    cautions: [
        'Hypotension \u2014 may occur especially at higher infusion rates',
        'Must be given as continuous infusion \u2014 eliminated within 9 min of stopping',
        'Use cautiously in patients on calcium channel blockers \u2014 risk of additive bradycardia/hypotension',
        'Bronchospasm \u2014 theoretical risk, though beta-1 selectivity is lost at high doses',
    ],
    monitoring: 'Continuous heart rate and blood pressure monitoring during infusion. Effects resolve within minutes of discontinuation \u2014 ideal for titration.',
    notes: 'Ultra-short-acting beta-blocker (half-life ~9 min). Particularly useful when rapid titration or reversal is needed \u2014 if hypotension occurs, effects resolve within minutes of stopping infusion. Ideal for patients with uncertain hemodynamics or when testing beta-blocker tolerance before committing to longer-acting agents.',
    citations: [
        'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
        'Prystowsky EN, et al. Treatment of Atrial Fibrillation. JAMA. 2015;314(3):278-88.',
    ],
};
const LIDOCAINE = {
    id: 'lidocaine',
    name: 'Lidocaine 1% (Without Epinephrine)',
    genericName: 'Lidocaine',
    drugClass: 'Amide local anesthetic',
    route: 'Local injection',
    indications: ['Dorsal penile nerve block', 'Local anesthesia for minor procedures', 'Nerve blocks'],
    dosing: [
        {
            indication: 'Dorsal penile nerve block',
            regimen: '10 mL total of 1% lidocaine WITHOUT epinephrine: 5 mL injected at 10 o\u2019clock and 5 mL at 2 o\u2019clock at penile base, under Buck\u2019s fascia.',
        },
    ],
    contraindications: [
        'Allergy to amide local anesthetics',
        'NEVER use with epinephrine on the penis \u2014 end-artery territory, risk of ischemic necrosis',
    ],
    cautions: [
        'Max dose without epi: 4.5 mg/kg',
        'Aspirate before injecting to avoid intravascular injection',
        'Wait 5\u201310 min for full anesthetic effect',
    ],
    monitoring: 'Test block adequacy with pinprick before procedure. Onset: 2\u20135 min. Duration: 30\u201360 min.',
    notes: 'For penile block, NEVER use formulations containing epinephrine. The penis is supplied by end-arteries \u2014 epinephrine can cause ischemic necrosis.',
    citations: [
        'Burnett AL, Sharlip ID. Standard Operating Procedures for Priapism. J Sex Med. 2013;10(1):180-94.',
    ],
};
const MAGNESIUM_SULFATE = {
    id: 'magnesium-sulfate',
    name: 'Magnesium Sulfate',
    genericName: 'Magnesium sulfate',
    drugClass: 'Electrolyte / Antiarrhythmic adjunct',
    route: 'IV',
    indications: ['A-Fib / A-Flutter adjunctive rate and rhythm control', 'Torsades de pointes', 'Hypomagnesemia', 'Eclampsia / Pre-eclampsia seizure prophylaxis'],
    dosing: [
        {
            indication: 'A-Fib (adjunctive)',
            regimen: 'Bolus: 2-4 g IV over 15-30 min. For aggressive repletion: continuous infusion per institutional protocol. Target serum level ~3-4 mg/dL for antiarrhythmic effect. Most administered magnesium is renally excreted \u2014 continuous infusion may be needed to replete intracellular stores.',
        },
        {
            indication: 'Torsades de pointes',
            regimen: '1-2 g IV over 5-60 min (faster for unstable patients).',
        },
    ],
    contraindications: [
        'Severe renal failure (GFR <30 mL/min or oliguria) for continuous infusion \u2014 use intermittent boluses instead',
        'Hypermagnesemia (>4 mg/dL)',
        'Myasthenia gravis (may worsen weakness)',
    ],
    cautions: [
        'Monitor for hypermagnesemia: loss of deep tendon reflexes (first sign), respiratory depression, cardiac arrest',
        'Check renal function before continuous infusion',
        'Calcium gluconate 1g IV is the antidote for magnesium toxicity',
    ],
    monitoring: 'Serum magnesium levels every 6-8 hours during infusion. Deep tendon reflexes. Respiratory rate. Renal function.',
    notes: 'Excellent safety profile \u2014 one meta-analysis detected no reported adverse events. Blocks slow calcium channels in SA and AV nodes. Even when cardioversion does not occur, magnesium reduces heart rate and augments efficacy of other antiarrhythmics and DC cardioversion. In one RCT, continuous magnesium infusion was superior to amiodarone for new-onset AF. The combination of aggressive magnesium loading plus amiodarone achieved 90% cardioversion rate in critically ill patients.',
    citations: [
        'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
        'Moran JL, et al. Parenteral MgSO4 vs Amiodarone for Atrial Tachyarrhythmias. Crit Care Med. 1995;23(11):1816-24.',
        'Bosch NA, et al. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434.',
    ],
};
const METOPROLOL = {
    id: 'metoprolol',
    name: 'Metoprolol',
    genericName: 'Metoprolol tartrate (IV) / Metoprolol succinate (PO)',
    drugClass: 'Beta-1 selective adrenergic blocker',
    route: 'IV / PO',
    indications: ['A-Fib / A-Flutter rate control', 'Hypertension', 'Heart failure (compensated, oral succinate)', 'Post-MI'],
    dosing: [
        {
            indication: 'A-Fib rate control (acute)',
            regimen: 'IV: 2.5-5 mg IV push over 2 min. Repeat every 5 min as needed, up to 15 mg total (3 doses).',
        },
        {
            indication: 'A-Fib rate control (maintenance)',
            regimen: 'PO tartrate: 25-100 mg BID. PO succinate (Toprol XL): 25-200 mg daily.',
        },
    ],
    contraindications: [
        'Severe sinus bradycardia (HR <50)',
        'Heart block greater than first degree without pacemaker',
        'Cardiogenic shock',
        'Decompensated heart failure (acute)',
        'WPW with atrial fibrillation',
    ],
    cautions: [
        'Safe in COPD \u2014 multiple studies demonstrate no adverse respiratory effects',
        'Use cautiously in decompensated HF but safe in compensated HFrEF',
        'May mask hypoglycemia symptoms in diabetic patients',
        'Do NOT combine with IV calcium channel blockers',
        'Intermittent dosing naturally encourages dose-by-dose reassessment \u2014 advantage over continuous infusions in unstable patients',
    ],
    monitoring: 'Heart rate and blood pressure before each IV dose. Hold if SBP <90 or HR <55.',
    notes: 'First-line for A-Fib rate control (Class 1 recommendation). Preferred in patients with CAD or compensated HFrEF. Many critically ill patients develop AF due to increased sympathetic tone \u2014 beta-blockers address the underlying physiological problem. A retrospective ICU study found lower failure rates with metoprolol vs diltiazem.',
    citations: [
        'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.',
        'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
        'Moskowitz A, et al. Management of AF with RVR in the ICU. Shock. 2017;48(4):436-440.',
    ],
};
const PENICILLIN_G_IV = {
    id: 'penicillin-g-iv',
    name: 'Penicillin G (Aqueous Crystalline)',
    genericName: 'Aqueous crystalline penicillin G',
    drugClass: 'Natural penicillin (IV formulation)',
    route: 'IV',
    indications: ['Neurosyphilis', 'Ocular syphilis', 'Otosyphilis'],
    dosing: [
        {
            indication: 'Neurosyphilis / Ocular / Otic syphilis',
            regimen: '18\u201324 million units/day IV, given as 3\u20134 million units IV q4h \u00D7 10\u201314 days. Achieves treponemicidal levels in CSF.',
        },
    ],
    contraindications: [
        'Penicillin allergy (IgE-mediated / anaphylaxis) \u2014 consider desensitization if no alternative',
    ],
    cautions: [
        'Jarisch-Herxheimer reaction \u2014 more common with higher organism burden',
        'Requires IV access and inpatient admission for duration of therapy',
    ],
    monitoring: 'CSF re-examination at 6 months. If CSF cell count not normalized, consider re-treatment. Quantitative RPR at 6, 12, 24 months.',
    citations: [
        'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
        'Ropper AH. Neurosyphilis. N Engl J Med. 2019;381(14):1358-1363.',
    ],
};
const PROCAINAMIDE = {
    id: 'procainamide',
    name: 'Procainamide',
    genericName: 'Procainamide hydrochloride',
    drugClass: 'Class IA antiarrhythmic (sodium channel blocker)',
    route: 'IV',
    indications: ['WPW with atrial fibrillation', 'Wide-complex tachycardia of uncertain origin', 'Atrial fibrillation (pharmacologic cardioversion \u2014 second-tier)'],
    dosing: [
        {
            indication: 'WPW + A-Fib / Wide-complex tachycardia',
            regimen: 'Loading: 20-50 mg/min IV infusion until arrhythmia suppressed, hypotension occurs, QRS widens >50%, or max dose 17 mg/kg reached. Maintenance: 1-4 mg/min IV infusion.',
        },
    ],
    contraindications: [
        'QT prolongation (QTc >500 ms)',
        'Torsades de pointes',
        'Complete heart block without pacemaker',
        'Systemic lupus erythematosus (drug may exacerbate)',
    ],
    cautions: [
        'Hypotension with rapid infusion \u2014 administer slowly',
        'QRS and QT prolongation \u2014 stop if QRS widens >50% from baseline',
        'Drug-induced lupus with chronic use',
        'Reduce dose in renal impairment (active metabolite NAPA is renally cleared)',
        'Monitor QTc continuously during loading',
    ],
    monitoring: 'Continuous ECG monitoring during loading. Blood pressure every 5 min. QRS width and QT interval. NAPA levels if chronic use.',
    notes: 'Key role in WPW + A-Fib where AV nodal blockers (beta-blockers, CCBs, digoxin, IV amiodarone) are contraindicated. Slows conduction through the accessory pathway. Also useful for wide-complex tachycardia of uncertain origin. Second-tier recommendation for pharmacologic cardioversion of AF per 2025 AHA guidelines.',
    citations: [
        'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
        'Panchal AR, et al. 2020 AHA Guidelines: Adult BLS and ALS. Circulation. 2020;142(16_suppl_2):S366-S468.',
    ],
};
const PROCAINE_PENICILLIN = {
    id: 'procaine-penicillin',
    name: 'Procaine Penicillin G + Probenecid',
    genericName: 'Procaine penicillin G with probenecid',
    drugClass: 'Natural penicillin (IM depot) + renal tubular secretion inhibitor',
    route: 'IM + PO',
    indications: ['Neurosyphilis (alternative to IV penicillin G)'],
    dosing: [
        {
            indication: 'Neurosyphilis',
            regimen: 'Procaine penicillin G 2.4 million units IM daily + probenecid 500 mg PO QID, both \u00D7 10\u201314 days.',
        },
    ],
    contraindications: [
        'Penicillin allergy',
        'Procaine allergy (rare)',
    ],
    cautions: [
        'Probenecid: avoid in renal stones, acute gout flare',
        'Requires daily IM injections \u2014 patient tolerance/compliance',
    ],
    notes: 'Equivalent outcomes to IV penicillin G for neurosyphilis (Dunaway et al., CID 2020). Allows outpatient treatment.',
    citations: [
        'CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.',
        'Dunaway SB, et al. Procaine Penicillin G vs Aqueous Crystalline Penicillin G for Neurosyphilis. Clin Infect Dis. 2020.',
    ],
};
const PHENYLEPHRINE = {
    id: 'phenylephrine',
    name: 'Phenylephrine (Intracavernosal)',
    genericName: 'Phenylephrine',
    drugClass: 'Selective alpha-1 adrenergic agonist',
    route: 'Intracavernosal',
    indications: ['Ischemic priapism (first-line)', 'Post-ICI prolonged erection'],
    dosing: [
        {
            indication: 'Ischemic priapism',
            regimen: '200 mcg (2 mL of 100 mcg/mL solution) intracavernosal every 5 minutes, up to 5 doses total (1 mg max). Corpora cavernosa communicate freely \u2014 inject one side only. Mix: 1 mL phenylephrine from vial (10 mg/mL) into 100 mL NS = 100 mcg/mL.',
        },
        {
            indication: 'Pediatric / Sickle cell',
            regimen: '100 mcg (1 mL of 100 mcg/mL) per injection. Lower dose recommended.',
        },
    ],
    contraindications: [
        'Uncontrolled hypertension',
        'MAO inhibitor use',
    ],
    cautions: [
        'Monitor BP and HR every 5 min between injections',
        'Hold if SBP > 160 or HR > 110',
        'Pure alpha-1 agonist \u2014 no intrinsic inotropy, no heart rate increase',
    ],
    monitoring: 'BP/HR every 5 min during injections. Observe 60 min post-detumescence.',
    notes: 'First-line sympathomimetic for ischemic priapism (AUA/SMSNA 2022). Alpha-1 selective = lower cardiovascular risk than epinephrine. 74% success alone, 70\u2013100% combined with aspiration. Onset: 1 min. Duration: 10\u201320 min.\n\nMIXING INSTRUCTIONS (100 mcg/mL):\n1. Take a 3 mL syringe, draw up 1 mL of phenylephrine from the vial (vial contains 10 mg/mL)\n2. Inject this 1 mL into a 100 mL bag of normal saline\n3. Now you have 100 mL of phenylephrine at 100 mcg/mL\n4. Draw up into a syringe \u2014 each 1 mL = 100 mcg\n5. Each dose = 2 mL (200 mcg)',
    image: {
        src: 'images/priapism/mixing-instructions.png',
        alt: 'Mixing instructions for phenylephrine (100 mcg/mL) showing vials, syringes, and labeled concentrations',
        caption: 'Mixing instructions for intracavernosal phenylephrine. (Source: EMCrit Podcast / EM:RAP)',
    },
    citations: [
        'Bivalacqua TJ, et al. AUA/SMSNA Guideline on Priapism. J Urol. 2022;208(1):43-52.',
        'Martin C, Cocchio C. Phenylephrine vs Terbutaline for Ischemic Priapism. Am J Emerg Med. 2016;34(2):222-4.',
        'Graham BA, et al. Emergency Pharmacotherapy for Priapism. Expert Opin Pharmacother. 2022;23(12):1371-80.',
    ],
};
const RIVAROXABAN = {
    id: 'rivaroxaban',
    name: 'Rivaroxaban',
    genericName: 'Rivaroxaban',
    drugClass: 'Direct oral anticoagulant (Factor Xa inhibitor)',
    route: 'PO',
    indications: ['Pulmonary embolism', 'Deep vein thrombosis', 'Atrial fibrillation (stroke prevention)', 'CAD/PAD secondary prevention'],
    dosing: [
        {
            indication: 'PE / DVT treatment',
            regimen: '15 mg twice daily with food \u00D7 21 days, then 20 mg once daily with food \u00D7 3\u20136 months. Extended therapy: 20 mg or 10 mg once daily.',
        },
    ],
    cautions: [
        'CrCl <30 mL/min \u2014 avoid (limited data, increased drug exposure)',
        'Moderate hepatic impairment (Child-Pugh B) \u2014 use with caution',
        'Must take with food (increases bioavailability by 39%)',
        'Strong CYP3A4 and P-gp inhibitors/inducers \u2014 avoid concomitant use',
    ],
    notes: 'Single-drug oral therapy \u2014 no initial parenteral heparin required. Take with food to ensure adequate absorption.',
    citations: [
        'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.',
        'Freund Y, et al. Acute Pulmonary Embolism: A Review. JAMA. 2022.',
    ],
};
const UFH = {
    id: 'ufh',
    name: 'Unfractionated Heparin (UFH)',
    genericName: 'Heparin sodium',
    drugClass: 'Unfractionated heparin (indirect thrombin/Xa inhibitor)',
    route: 'IV',
    indications: ['Pulmonary embolism (all risk levels)', 'DVT', 'ACS', 'Bridge anticoagulation'],
    dosing: [
        {
            indication: 'High-risk / Massive PE',
            regimen: 'Bolus 80 units/kg (or 5,000 units) IV, then continuous infusion at 18 units/kg/hour. Titrate to aPTT 60\u201380 seconds (1.5\u20132.5\u00D7 control).',
        },
        {
            indication: 'Standard PE / DVT',
            regimen: 'Bolus 80 units/kg IV, then 18 units/kg/hr continuous infusion. Adjust per institutional nomogram.',
        },
    ],
    contraindications: [
        'Active major hemorrhage',
        'Severe thrombocytopenia (platelets <25,000)',
        'History of heparin-induced thrombocytopenia (HIT)',
        'Spinal procedure or epidural within 12 hours',
    ],
    cautions: [
        'Renal insufficiency: UFH preferred over LMWH when CrCl <25\u201330 mL/min (not renally cleared)',
        'Obesity: may require higher initial doses and more frequent aPTT monitoring',
    ],
    monitoring: 'aPTT every 6 hours until therapeutic, then every 12\u201324 hours. Platelet count at baseline and every 2\u20133 days (HIT screening).',
    notes: 'Preferred over LMWH when: CrCl <30 mL/min, high bleeding risk (short half-life, fully reversible with protamine), or thrombolysis anticipated. Fully reversible with protamine sulfate.',
    citations: [
        'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020.',
        'Garcia DA, et al. Parenteral Anticoagulants: ACCP Evidence-Based Clinical Practice Guidelines. Chest. 2012.',
    ],
};
const VERAPAMIL = {
    id: 'verapamil',
    name: 'Verapamil',
    genericName: 'Verapamil hydrochloride',
    drugClass: 'Nondihydropyridine calcium channel blocker',
    route: 'IV',
    indications: ['A-Fib / A-Flutter rate control', 'Supraventricular tachycardia'],
    dosing: [
        {
            indication: 'A-Fib rate control (acute)',
            regimen: '2.5-5 mg IV over 2 min. May repeat with 5-10 mg every 15-30 min as needed. Maximum total dose: 20 mg.',
        },
    ],
    contraindications: [
        'EF \u226440% or moderate-to-severe LV systolic dysfunction',
        'Decompensated heart failure',
        'Severe hypotension',
        'Sick sinus syndrome without pacemaker',
        'Second/third-degree AV block without pacemaker',
        'WPW with atrial fibrillation',
        'Concurrent IV beta-blocker use',
        'Wide-complex tachycardia of uncertain origin',
    ],
    cautions: [
        'Hypotension \u2014 more common than with diltiazem',
        'Negative inotropic effects \u2014 may worsen borderline hemodynamics',
        'Randomized clinical trials examining verapamil for A-Fib are lacking',
        'Diltiazem is generally preferred among nondihydropyridine CCBs',
    ],
    monitoring: 'Continuous heart rate and blood pressure monitoring. Assess hemodynamic response after each dose.',
    notes: 'Alternative to diltiazem when diltiazem is unavailable. Generally less preferred due to limited RCT evidence and similar contraindication profile. Same EF restriction as diltiazem: CONTRAINDICATED if EF \u226440%.',
    citations: [
        'Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.',
        'Prystowsky EN, et al. Treatment of Atrial Fibrillation. JAMA. 2015;314(3):278-88.',
    ],
};
// -------------------------------------------------------------------
// Drug Registry (Alphabetical by name)
// -------------------------------------------------------------------
export const ALL_DRUGS = [
    ALTEPLASE,
    AMIODARONE,
    APIXABAN,
    BENZATHINE_PENICILLIN,
    CEFTRIAXONE,
    DABIGATRAN,
    DIGOXIN,
    DILTIAZEM,
    DOXYCYCLINE,
    EDOXABAN,
    ENOXAPARIN,
    EPINEPHRINE,
    ESMOLOL,
    LIDOCAINE,
    MAGNESIUM_SULFATE,
    METOPROLOL,
    PENICILLIN_G_IV,
    PHENYLEPHRINE,
    PROCAINAMIDE,
    PROCAINE_PENICILLIN,
    RIVAROXABAN,
    UFH,
    VERAPAMIL,
];
const DRUG_MAP = {};
for (const drug of ALL_DRUGS) {
    DRUG_MAP[drug.id] = drug;
}
/** Get a drug by ID */
export function getDrug(id) {
    return DRUG_MAP[id];
}
/** Get all drugs (already sorted alphabetically) */
export function getAllDrugs() {
    return ALL_DRUGS;
}
/** Lookup table: maps common drug name fragments to drug store IDs */
const NAME_TO_ID = [
    [/alteplase|tPA/i, 'alteplase'],
    [/amiodarone|cordarone/i, 'amiodarone'],
    [/apixaban/i, 'apixaban'],
    [/benzathine.*penicillin/i, 'benzathine-penicillin'],
    [/ceftriaxone/i, 'ceftriaxone'],
    [/dabigatran/i, 'dabigatran'],
    [/digoxin|digitalis|lanoxin/i, 'digoxin'],
    [/diltiazem|cardizem/i, 'diltiazem'],
    [/doxycycline/i, 'doxycycline'],
    [/edoxaban/i, 'edoxaban'],
    [/enoxaparin|LMWH|low.molecular/i, 'enoxaparin'],
    [/epinephrine|adrenaline/i, 'epinephrine'],
    [/esmolol|brevibloc/i, 'esmolol'],
    [/lidocaine/i, 'lidocaine'],
    [/magnesium sulfate|mag sulfate|MgSO4/i, 'magnesium-sulfate'],
    [/metoprolol|lopressor|toprol/i, 'metoprolol'],
    [/aqueous.*penicillin|penicillin G.*IV|crystalline.*penicillin/i, 'penicillin-g-iv'],
    [/phenylephrine/i, 'phenylephrine'],
    [/procainamide|pronestyl/i, 'procainamide'],
    [/procaine.*penicillin/i, 'procaine-penicillin'],
    [/rivaroxaban/i, 'rivaroxaban'],
    [/unfractionated heparin|^UFH$|heparin sodium/i, 'ufh'],
    [/verapamil|calan|isoptin/i, 'verapamil'],
];
/** Try to find a drug store ID from a drug name string. Returns undefined if no match. */
export function findDrugIdByName(name) {
    for (const [pattern, id] of NAME_TO_ID) {
        if (pattern.test(name))
            return id;
    }
    return undefined;
}
