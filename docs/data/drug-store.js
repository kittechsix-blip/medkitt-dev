// MedKitt — Drug Reference Store
// Centralized drug data for all medications used across decision trees.
// Each entry includes class, indications, dosing, contraindications, and citations.
// -------------------------------------------------------------------
// Drug Definitions (Alphabetical)
// -------------------------------------------------------------------
const ACETAZOLAMIDE = {
    id: 'acetazolamide',
    name: 'Acetazolamide',
    genericName: 'Acetazolamide',
    drugClass: 'Carbonic anhydrase inhibitor',
    route: 'IV/PO',
    indications: ['Hyperkalemia (nephron bomb — third diuretic)', 'Hypokalemic periodic paralysis (prevention)', 'Metabolic alkalosis', 'Acute mountain sickness'],
    dosing: [
        {
            indication: 'Hyperkalemia (nephron bomb)',
            regimen: '250-1000 mg IV or PO. Third agent added to loop + thiazide for maximal kaliuresis.',
        },
        {
            indication: 'Periodic paralysis prevention',
            regimen: 'Variable dosing — no standardized regimen. Typically 125-500 mg PO BID.',
        },
        {
            indication: 'Metabolic alkalosis',
            regimen: '250-500 mg IV q6-8h.',
        },
    ],
    contraindications: [
        'Severe hepatic insufficiency',
        'Hyponatremia',
        'Hypokalemia (except when combined with K-sparing agents)',
        'Sulfonamide allergy (cross-reactivity)',
    ],
    cautions: [
        'Causes metabolic acidosis (loss of bicarbonate) — desired effect in alkalosis but monitor in acidotic patients',
        'Kidney stones (long-term use)',
        'Paresthesias common',
    ],
    monitoring: 'Serum bicarbonate, potassium, renal function. ABG if concern for worsening acidosis.',
    notes: 'Blocks carbonic anhydrase in proximal tubule — promotes sodium bicarbonate excretion. In the nephron bomb, provides a third point of sequential nephron blockade (proximal tubule). For hypokalemic periodic paralysis: first-line preventive agent — mechanism may involve systemic acidosis reducing attack susceptibility.',
    citations: [
        'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
        'Statland JM, et al. Review of the Diagnosis and Treatment of Periodic Paralysis. Muscle Nerve. 2018;57(4):522-530.',
    ],
};
const ACYCLOVIR = {
    id: 'acyclovir',
    name: 'Acyclovir',
    genericName: 'Acyclovir',
    drugClass: 'Antiviral (Nucleoside Analog)',
    route: 'IV',
    indications: ['Neonatal HSV (suspected or confirmed)', 'HSV encephalitis'],
    dosing: [
        {
            indication: 'Neonatal HSV (0-3 months)',
            regimen: '20 mg/kg IV q8h. Duration: minimum 5 doses or until HSV PCR results negative. If PCR not resulted after 5 doses, contact ID.',
        },
    ],
    cautions: [
        'Crystalline nephropathy — ensure adequate hydration',
        'Infuse over 1 hour',
    ],
    monitoring: 'Renal function (BUN, creatinine). Urine output. Hold tube #4 CSF for HSV PCR. Surface cultures: conjunctiva, throat, nasopharynx, rectum, vesicle fluid if present.',
    notes: 'Empiric acyclovir should be started in any neonate with suspected HSV — fever, seizures, vesicular rash, CSF pleocytosis, or elevated LFTs without other explanation. Do not wait for PCR results to initiate treatment.',
    citations: [
        'Kimberlin DW, et al. Guidance on Management of Asymptomatic Neonates Born to Women with Active Genital Herpes Lesions. Pediatrics. 2013;131(2):e572-e579.',
        'Red Book: 2021-2024 Report of the Committee on Infectious Diseases. American Academy of Pediatrics.',
    ],
};
const ALBUTEROL_NEB = {
    id: 'albuterol-neb',
    name: 'Albuterol (Nebulized)',
    genericName: 'Albuterol sulfate',
    drugClass: 'Beta-2 adrenergic agonist',
    route: 'Inhaled (nebulized)',
    indications: ['Hyperkalemia (potassium shift)', 'Acute bronchospasm'],
    dosing: [
        {
            indication: 'Hyperkalemia',
            regimen: '10-20 mg nebulized (4-8 standard 2.5 mg nebulizers administered back-to-back). Onset: 30 minutes. Peak: 90-120 minutes. Duration: 2-4 hours.',
        },
        {
            indication: 'Bronchospasm',
            regimen: '2.5 mg nebulized q20 min x 3 doses, then q1-4h PRN.',
        },
    ],
    contraindications: [
        'Known hypersensitivity to albuterol',
    ],
    cautions: [
        'Nearly always UNDERDOSED for hyperkalemia in clinical practice',
        'Standard 2.5 mg neb dose is inadequate — need 10-20 mg total',
        'Efficacy ~50% lower in ESRD patients',
        'Tachycardia, tremor, hyperglycemia',
    ],
    monitoring: 'Heart rate, potassium level, glucose.',
    notes: 'In reality, albuterol is nearly always underdosed for hyperkalemia. The real-world efficacy is consequently minimal. Terbutaline SQ is preferred when available — logistically simpler (single injection vs. prolonged nebulization). Expected K+ reduction: 0.6-1.0 mEq/L (at adequate dose).',
    citations: [
        'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
    ],
};
const AMOXICILLIN_CLAVULANATE = {
    id: 'amoxicillin-clavulanate',
    name: 'Amoxicillin-Clavulanate (Augmentin)',
    genericName: 'Amoxicillin / Clavulanic acid',
    drugClass: 'Aminopenicillin + beta-lactamase inhibitor',
    route: 'PO',
    indications: ['Pediatric UTI (alternative outpatient)', 'Otitis media', 'Sinusitis', 'Bite wounds'],
    dosing: [
        {
            indication: 'Pediatric UTI',
            regimen: '20-40 mg/kg/day divided BID. Max 875 mg/dose.',
            weightCalc: { dosePerKg: 40, unit: 'mg', maxDose: 875, dailyDivided: 2 },
        },
    ],
    contraindications: [
        'IgE-mediated penicillin allergy',
        'History of cholestatic jaundice with amoxicillin-clavulanate',
    ],
    cautions: [
        'Diarrhea common (clavulanate component)',
        'Hepatotoxicity rare but possible',
    ],
    monitoring: 'Clinical response. LFTs if prolonged course or hepatic symptoms. Repeat urine culture if no improvement at 48-72 hours.',
    notes: 'Alternative empiric outpatient antibiotic for pediatric febrile UTI when cephalexin not tolerated. Per DCMC EBOC guidelines.',
    citations: [
        'Dell Children\'s EBOC. First Febrile Urinary Tract Infection Clinical Pathway. May 2017.',
        'Roberts KB. Urinary tract infection: clinical practice guideline for febrile infants and children 2 to 24 months. Pediatrics. 2011;128(3):595-610.',
    ],
};
const AMPICILLIN = {
    id: 'ampicillin',
    name: 'Ampicillin',
    genericName: 'Ampicillin sodium',
    drugClass: 'Aminopenicillin',
    route: 'IV',
    indications: ['Neonatal sepsis (empiric)', 'Meningitis (GBS, Listeria, Enterococcus coverage)'],
    dosing: [
        {
            indication: 'Non-meningitic (0-7 days)',
            regimen: '50 mg/kg IV q8h.',
        },
        {
            indication: 'Non-meningitic (8-28 days)',
            regimen: '50 mg/kg IV q6h.',
        },
        {
            indication: 'Meningitic (0-7 days)',
            regimen: '100 mg/kg IV q8h.',
        },
        {
            indication: 'Meningitic (8-28 days)',
            regimen: '75 mg/kg IV q6h.',
        },
        {
            indication: 'Meningitic (>28 days, added to Ceftriaxone)',
            regimen: '75 mg/kg IV q6h.',
        },
    ],
    contraindications: [
        'IgE-mediated penicillin allergy',
    ],
    cautions: [
        'Rash common (non-allergic maculopapular rash, especially with concurrent EBV infection)',
    ],
    monitoring: 'Clinical response. CBC, CRP, blood cultures. CSF cultures if meningitis suspected.',
    notes: 'Covers GBS, Listeria monocytogenes, and Enterococcus — organisms not covered by cephalosporins. Always pair with Gentamicin (0-7d) or Ceftriaxone/Cefepime (8-28d). Meningitic doses are higher to achieve adequate CSF penetration.',
    citations: [
        'Puopolo KM, et al. Management of Neonates Born at ≥35 0/7 Weeks\' Gestation With Suspected or Proven Early-Onset Bacterial Sepsis. Pediatrics. 2018;142(6):e20182894.',
        'Red Book: 2021-2024 Report of the Committee on Infectious Diseases. American Academy of Pediatrics.',
    ],
};
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
            weightCalc: { dosePerKg: 0.6, unit: 'mg', maxDose: 50, label: 'Bolus (first 15 min)' },
        },
        {
            indication: 'Acute ischemic stroke (0\u20134.5h)',
            regimen: '0.9 mg/kg IV (max 90 mg): Give 10% as IV bolus over 1 min, remaining 90% infused over 60 min. BP must be <185/110 before and <180/105 for 24h after. No antithrombotics \u00D7 24h post-infusion.',
            weightCalc: { dosePerKg: 0.9, unit: 'mg', maxDose: 90 },
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
            weightCalc: { dosePerKg: 5, unit: 'mg', label: 'Load (5 mg/kg)' },
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
const ASPIRIN = {
    id: 'aspirin',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic acid',
    drugClass: 'Antiplatelet (COX inhibitor)',
    route: 'PO',
    indications: ['Acute ischemic stroke', 'Acute coronary syndrome', 'Secondary stroke prevention', 'DAPT (dual antiplatelet therapy)'],
    dosing: [
        {
            indication: 'Acute ischemic stroke (no IVT)',
            regimen: '160\u2013325 mg PO within 24\u201348 hours of symptom onset. If given via NG tube: use non-enteric-coated formulation or crush enteric-coated.',
        },
        {
            indication: 'Post-IVT stroke',
            regimen: 'Hold aspirin for 24 hours post-thrombolysis. Obtain NCCT at 24h to exclude hemorrhagic transformation before starting. Then 81\u2013325 mg daily.',
        },
        {
            indication: 'DAPT (minor stroke)',
            regimen: '325 mg loading dose + clopidogrel 300 mg on day 1. Then aspirin 81 mg + clopidogrel 75 mg daily \u00D7 21 days, followed by single antiplatelet.',
        },
    ],
    contraindications: [
        'Active intracranial hemorrhage',
        'Known aspirin allergy or NSAID-exacerbated respiratory disease',
        'Active GI bleeding',
    ],
    cautions: [
        'GI bleeding risk \u2014 consider PPI co-therapy if DAPT',
        'Platelet dysfunction lasts 7\u201310 days (irreversible COX inhibition)',
        'Avoid concurrent NSAIDs (competitive COX-1 binding reduces aspirin efficacy)',
    ],
    monitoring: 'No routine monitoring required. Monitor for signs of bleeding.',
    notes: 'Aspirin within 24\u201348h of acute ischemic stroke reduces early recurrent stroke (IST and CAST trials). DAPT with aspirin + clopidogrel for 21 days (POINT trial) reduces stroke recurrence in minor stroke/TIA (NNT 38) with modest bleeding increase.',
    citations: [
        'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
        'Johnston SC, et al. Clopidogrel and Aspirin in Acute Ischemic Stroke and High-Risk TIA (POINT). N Engl J Med. 2018;379(3):215-225.',
    ],
};
const ATORVASTATIN = {
    id: 'atorvastatin',
    name: 'Atorvastatin (Lipitor)',
    genericName: 'Atorvastatin calcium',
    drugClass: 'HMG-CoA reductase inhibitor (statin)',
    route: 'PO',
    indications: ['Acute coronary syndrome', 'Hyperlipidemia', 'Secondary cardiovascular prevention'],
    dosing: [
        {
            indication: 'ACS / NSTEMI (high-intensity)',
            regimen: 'Atorvastatin 80 mg PO daily. Initiate within 24 hours of presentation regardless of baseline LDL. Continue indefinitely. Alternative: Rosuvastatin 20-40 mg daily.',
        },
    ],
    contraindications: [
        'Active liver disease or unexplained persistent transaminase elevation',
        'Pregnancy and lactation',
    ],
    cautions: [
        'Myopathy/rhabdomyolysis — risk increased with CYP3A4 inhibitors, high dose, advanced age, renal impairment',
        'Hepatotoxicity — check LFTs at baseline and if symptoms develop',
        'New-onset diabetes — modest risk increase with high-intensity therapy (NNH ~250)',
        'Drug interactions — avoid concomitant strong CYP3A4 inhibitors (clarithromycin, itraconazole, HIV protease inhibitors)',
    ],
    monitoring: 'Lipid panel at 4-12 weeks, then annually. LFTs at baseline. CK if myalgia develops. Target LDL <70 mg/dL (consider <55 if very high risk).',
    notes: 'PROVE IT-TIMI 22 trial: high-intensity atorvastatin 80mg reduced cardiovascular events by 16% vs moderate-intensity pravastatin after ACS. Pleiotropic effects include plaque stabilization, anti-inflammatory properties, and endothelial function improvement. Initiate before discharge — in-hospital statin initiation improves long-term adherence.',
    citations: [
        'Cannon CP, et al. Intensive versus Moderate Lipid Lowering with Statins after Acute Coronary Syndromes (PROVE IT-TIMI 22). N Engl J Med. 2004;350(15):1495-1504.',
        'Grundy SM, et al. 2018 AHA/ACC Guideline on the Management of Blood Cholesterol. J Am Coll Cardiol. 2019;73(24):e285-e350.',
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
        {
            indication: 'Atrial fibrillation (stroke prevention)',
            regimen: '5 mg BID. Dose-reduce to 2.5 mg BID if \u22652 of: age \u226580, weight \u226460 kg, creatinine \u22651.5 mg/dL.',
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
const BIKTARVY = {
    id: 'biktarvy',
    name: 'Biktarvy (BIC/FTC/TAF)',
    genericName: 'Bictegravir / Emtricitabine / Tenofovir alafenamide',
    drugClass: 'INSTI + dual NRTI combination (single-tablet regimen)',
    route: 'PO',
    indications: ['HIV post-exposure prophylaxis (PEP)', 'HIV treatment (ART)'],
    dosing: [
        {
            indication: 'HIV PEP',
            regimen: '1 tablet (50/200/25 mg) PO once daily x 28 days. Take with or without food. Start as soon as possible, within 72 hours of exposure.',
        },
    ],
    contraindications: [
        'Co-administration with dofetilide',
        'Co-administration with rifampin (reduces bictegravir levels)',
    ],
    cautions: [
        'CrCl <30 mL/min \u2014 not recommended (limited data)',
        'Lactic acidosis / severe hepatomegaly with steatosis \u2014 rare but serious class effect of NRTIs',
        'HBV co-infection \u2014 severe hepatitis flare may occur upon discontinuation (contains FTC/TAF, active against HBV)',
        'Drug interactions \u2014 avoid polyvalent cation-containing antacids within 2 hours',
    ],
    monitoring: 'Renal function (BMP) at baseline and 2 weeks. HIV testing at baseline, 4\u20136 weeks, and 3 months.',
    notes: 'Preferred single-tablet PEP regimen per 2025 CDC guidelines. High barrier to resistance. Well tolerated with low discontinuation rates. TAF has less renal/bone toxicity than TDF.',
    citations: [
        'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV. MMWR. 2025;74(1):1-56.',
        'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
    ],
};
const BIVALIRUDIN = {
    id: 'bivalirudin',
    name: 'Bivalirudin (Angiomax)',
    genericName: 'Bivalirudin',
    drugClass: 'Direct thrombin inhibitor',
    route: 'IV',
    indications: ['ACS undergoing PCI', 'HIT with thrombosis requiring anticoagulation'],
    dosing: [
        {
            indication: 'NSTEMI undergoing PCI',
            regimen: 'Bolus: 0.75 mg/kg IV, then infusion 1.75 mg/kg/hr during procedure. Discontinue at end of PCI or continue at 0.25 mg/kg/hr if needed. ACT target: 225-300 seconds.',
            weightCalc: [{ dosePerKg: 0.75, unit: 'mg', label: 'IV Bolus' }, { dosePerKg: 1.75, unit: 'mg', label: 'Infusion (per hour)' }],
        },
    ],
    contraindications: [
        'Active major bleeding',
        'Hypersensitivity to bivalirudin',
    ],
    cautions: [
        'Acute stent thrombosis — higher risk in first 4 hours post-PCI vs UFH+GPI. Mitigated by continuing infusion post-procedure.',
        'Renal impairment — reduce infusion rate: CrCl 10-29 mL/min reduce to 1 mg/kg/hr; dialysis 0.25 mg/kg/hr',
        'Short half-life (25 min) — advantage for bleeding risk but requires attention to timing',
        'No reversal agent — allow drug to clear (short half-life is the "antidote")',
    ],
    monitoring: 'ACT during PCI (target 225-300s). aPTT if used post-PCI. Renal function. Signs of bleeding.',
    notes: 'HORIZONS-AMI and EUROMAX trials demonstrated reduced bleeding with bivalirudin vs UFH + glycoprotein IIb/IIIa inhibitors during PCI, at cost of increased acute stent thrombosis (mitigated by post-PCI infusion). Preferred when bleeding risk is high or HIT history.',
    citations: [
        'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.',
        'Stone GW, et al. Bivalirudin during Primary PCI (HORIZONS-AMI). N Engl J Med. 2008;358(21):2218-2230.',
    ],
};
const BUDESONIDE_NEB = {
    id: 'budesonide-neb',
    name: 'Budesonide (Nebulized)',
    genericName: 'Budesonide',
    drugClass: 'Inhaled corticosteroid',
    route: 'Inhaled (nebulized)',
    indications: ['Croup (alternative to oral dexamethasone)', 'Asthma (maintenance)'],
    dosing: [
        {
            indication: 'Croup',
            regimen: '2 mg nebulized as a single dose. Use when child cannot tolerate oral medication. Onset: 2-4 hours.',
        },
        {
            indication: 'Asthma maintenance',
            regimen: '0.25-1 mg nebulized BID.',
        },
    ],
    contraindications: [
        'Known hypersensitivity to budesonide',
        'Primary treatment of status asthmaticus (not for acute rescue)',
    ],
    cautions: [
        'Slower onset than oral dexamethasone for croup',
        'Oral thrush with repeated use — rinse mouth after administration',
        'More expensive and less convenient than oral dexamethasone',
    ],
    monitoring: 'Clinical response. Reassess croup severity 2-4 hours after administration.',
    notes: 'Reserved for children who cannot tolerate oral dexamethasone (vomiting, refusal). A 2023 Cochrane review confirmed efficacy for croup, but oral dexamethasone remains preferred due to ease of administration and faster onset. Single-dose safety profile is excellent.',
    citations: [
        'Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.',
        'Gates A, Johnson DW, Klassen TP. Glucocorticoids for Croup in Children. JAMA Pediatrics. 2019;173(6):595-596.',
    ],
};
const BUMETANIDE = {
    id: 'bumetanide',
    name: 'Bumetanide',
    genericName: 'Bumetanide',
    drugClass: 'Loop diuretic',
    route: 'IV',
    indications: ['Hyperkalemia (kaliuresis — alternative to furosemide)', 'Volume overload'],
    dosing: [
        {
            indication: 'Hyperkalemia (nephron bomb)',
            regimen: '2-5 mg IV. Equivalent to furosemide 80-200 mg IV (1:40 ratio).',
        },
        {
            indication: 'Volume overload',
            regimen: '0.5-2 mg IV, may repeat q2-3h.',
        },
    ],
    contraindications: [
        'Anuria',
        'Severe hypovolemia',
        'Hepatic coma',
    ],
    cautions: [
        'More predictable oral bioavailability than furosemide (~80% vs ~50%)',
        'Same electrolyte monitoring as furosemide',
        'Replace urine losses',
    ],
    monitoring: 'Urine output, electrolytes including K/Mg, fluid balance.',
    notes: 'Alternative loop diuretic when furosemide is unavailable. Conversion: bumetanide 1 mg ≈ furosemide 40 mg. Same mechanism (Na-K-2Cl blockade in thick ascending limb).',
    citations: [
        'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
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
const CALCIUM_CHLORIDE = {
    id: 'calcium-chloride',
    name: 'Calcium Chloride',
    genericName: 'Calcium chloride',
    drugClass: 'Electrolyte / membrane stabilizer',
    route: 'IV (central line only)',
    indications: ['Hyperkalemia (membrane stabilization)', 'Hypocalcemia (severe)'],
    dosing: [
        {
            indication: 'Hyperkalemia (central access)',
            regimen: '1 gram IV over 10 minutes. May repeat 1-2 times. Effect lasts 30-60 minutes.',
        },
        {
            indication: 'Severe hypocalcemia',
            regimen: '500 mg-1 gram IV over 10 minutes.',
        },
    ],
    contraindications: [
        'Peripheral IV administration (causes severe tissue necrosis)',
        'Digoxin toxicity (relative)',
        'Hypercalcemia',
    ],
    cautions: [
        'CENTRAL LINE ONLY — causes severe extravasation injury peripherally',
        'Contains 3x more elemental calcium than calcium gluconate per gram',
        'Rapid infusion → bradycardia, cardiac arrest',
    ],
    monitoring: 'Continuous cardiac monitoring. Check ionized calcium. Verify central line placement before infusion.',
    notes: 'Preferred over calcium gluconate when CENTRAL access is available — provides 3x more elemental calcium per gram (~270 mg Ca per gram). Use calcium gluconate if only peripheral access. For hyperkalemia: treats the rhythm, not the potassium — must follow with definitive K+ lowering therapy.',
    citations: [
        'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
        'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
    ],
};
const CALCIUM_GLUCONATE = {
    id: 'calcium-gluconate',
    name: 'Calcium Gluconate',
    genericName: 'Calcium gluconate',
    drugClass: 'Electrolyte / membrane stabilizer',
    route: 'IV',
    indications: ['Hyperkalemia (membrane stabilization)', 'Hypocalcemia'],
    dosing: [
        {
            indication: 'Hyperkalemia (peripheral access)',
            regimen: '3 grams IV over 10 minutes. May repeat 1-2 times if persistent dangerous arrhythmia. Effect lasts 30-60 minutes.',
        },
        {
            indication: 'Hypocalcemia',
            regimen: '1-2 grams IV over 10-20 minutes.',
        },
    ],
    contraindications: [
        'Digoxin toxicity (relative — calcium may worsen digitalis effects)',
        'Hypercalcemia',
    ],
    cautions: [
        'Lasts only 30-60 minutes — must address underlying hyperkalemia',
        'Rapid infusion may cause flushing, nausea, hypotension',
        'Chronic renal failure without ECG changes: risk of calciphylaxis — may withhold',
    ],
    monitoring: 'Continuous cardiac monitoring during infusion. Repeat ECG after dose. Check ionized calcium — avoid iCa >3 mM.',
    notes: 'First-line for hyperkalemia with ECG changes. Use calcium gluconate for PERIPHERAL access (less tissue necrosis risk than calcium chloride). Contains ~270 mg elemental calcium per 10 mL (1 gram). For isolated peaked T-waves without other ECG changes, use is controversial.',
    citations: [
        'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
        'Rossignol P, et al. Emergency management of severe hyperkalemia. Pharmacol Res. 2016;113(Pt A):585-591.',
    ],
};
const CEFAZOLIN = {
    id: 'cefazolin',
    name: 'Cefazolin (Ancef)',
    genericName: 'Cefazolin sodium',
    drugClass: 'First-generation cephalosporin',
    route: 'IV',
    indications: ['Pediatric UTI (inpatient first-line)', 'Surgical prophylaxis'],
    dosing: [
        {
            indication: 'Pediatric UTI (inpatient)',
            regimen: '50 mg/kg/day divided q8h. Max 2000 mg/dose.',
            weightCalc: { dosePerKg: 50, unit: 'mg', maxDose: 2000, dailyDivided: 3 },
        },
        {
            indication: 'Neonatal UTI',
            regimen: '50 mg/kg/day divided q8h.',
            weightCalc: { dosePerKg: 50, unit: 'mg', dailyDivided: 3 },
        },
    ],
    contraindications: [
        'IgE-mediated cephalosporin allergy',
    ],
    cautions: [
        'Adjust for renal impairment',
    ],
    monitoring: 'Renal function, CBC with prolonged use. Repeat urine culture if no clinical improvement at 48-72 hours.',
    notes: 'First-line empiric IV antibiotic for inpatient pediatric UTI per DCMC EBOC guidelines.',
    citations: [
        'Dell Children\'s EBOC. First Febrile Urinary Tract Infection Clinical Pathway. May 2017.',
        'Dell Children\'s EBOC. UTI Management Pathway (Neonatal). September 2024.',
        'Roberts KB. Urinary tract infection: clinical practice guideline for febrile infants and children 2 to 24 months. Pediatrics. 2011;128(3):595-610.',
    ],
};
const CEFEPIME = {
    id: 'cefepime',
    name: 'Cefepime (Maxipime)',
    genericName: 'Cefepime hydrochloride',
    drugClass: '4th-Generation Cephalosporin',
    route: 'IV',
    indications: ['Neonatal sepsis/meningitis (alternative when Ceftriaxone contraindicated)'],
    dosing: [
        {
            indication: 'Sepsis/meningitis (0-28 days)',
            regimen: '50 mg/kg IV q12h.',
        },
        {
            indication: 'Meningitis (>28 days)',
            regimen: '50 mg/kg IV q8h.',
        },
    ],
    contraindications: [
        'Severe cephalosporin allergy',
    ],
    cautions: [
        'Neurotoxicity (seizures) — especially in renal impairment',
        'Dose adjust for renal impairment',
    ],
    monitoring: 'Renal function, CBC. Monitor for neurotoxicity (altered mental status, seizures) especially with renal impairment or prolonged courses.',
    notes: 'Use when Ceftriaxone is contraindicated: GA <37 weeks, postnatal age <7 days, receiving calcium-containing IV products, or bilirubin >10 mg/dL. Broader gram-negative coverage than Ceftriaxone including Pseudomonas aeruginosa.',
    citations: [
        'Puopolo KM, et al. Management of Neonates Born at ≥35 0/7 Weeks\' Gestation With Suspected or Proven Early-Onset Bacterial Sepsis. Pediatrics. 2018;142(6):e20182894.',
        'Bradley JS, et al. Nelson\'s Pediatric Antimicrobial Therapy. 29th ed. American Academy of Pediatrics; 2023.',
    ],
};
const CEFTRIAXONE = {
    id: 'ceftriaxone',
    name: 'Ceftriaxone',
    genericName: 'Ceftriaxone',
    drugClass: 'Third-generation cephalosporin',
    route: 'IV',
    indications: ['Neurosyphilis (PCN allergy alternative)', 'Bacterial meningitis', 'Various serious infections', 'Pediatric sepsis / neonatal fever', 'Pediatric meningitis', 'Pediatric UTI'],
    dosing: [
        {
            indication: 'Neurosyphilis (if desensitization not feasible)',
            regimen: '2 g IV daily \u00D7 10\u201314 days.',
        },
        {
            indication: 'Pediatric Fever / Neonatal Sepsis',
            regimen: '50 mg/kg IV q24h (standard). 50 mg/kg IM/IV x1 (single pre-discharge dose). Max 2 g/dose.',
            weightCalc: [
                { dosePerKg: 50, unit: 'mg', maxDose: 2000, label: 'Standard (q24h)' },
                { dosePerKg: 50, unit: 'mg', maxDose: 2000, label: 'Single dose (IM/IV x1)' },
            ],
        },
        {
            indication: 'Pediatric Meningitis',
            regimen: '50 mg/kg IV q12h (meningitic dose). Max 2 g/dose.',
            weightCalc: { dosePerKg: 50, unit: 'mg', maxDose: 2000, label: 'Meningitic (q12h)' },
        },
        {
            indication: 'Pediatric UTI (inpatient/pre-discharge)',
            regimen: '75 mg/kg IV or IM prior to discharge. Max 2 g/dose.',
            weightCalc: { dosePerKg: 75, unit: 'mg', maxDose: 2000 },
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
const CEPHALEXIN = {
    id: 'cephalexin',
    name: 'Cephalexin (Keflex)',
    genericName: 'Cephalexin',
    drugClass: 'First-generation cephalosporin',
    route: 'PO',
    indications: ['Pediatric UTI (first-line outpatient)', 'Skin and soft tissue infections'],
    dosing: [
        {
            indication: 'Pediatric UTI',
            regimen: '50-100 mg/kg/day divided TID-QID. Max 1000 mg/dose.',
            weightCalc: { dosePerKg: 75, unit: 'mg', maxDose: 1000, dailyDivided: 4 },
        },
        {
            indication: 'Neonatal UTI',
            regimen: '\u226428 days: 75 mg/kg/day divided q8h. \u226529 days: 100 mg/kg/day divided q6h.',
            weightCalc: [{ dosePerKg: 75, unit: 'mg', dailyDivided: 3, label: '\u226428 days (q8h)' }, { dosePerKg: 100, unit: 'mg', dailyDivided: 4, label: '\u226529 days (q6h)' }],
        },
    ],
    contraindications: [
        'IgE-mediated cephalosporin allergy',
    ],
    cautions: [
        'Adjust for renal impairment',
        'GI side effects common',
    ],
    monitoring: 'Renal function in neonates and prolonged courses. Repeat urine culture if no clinical improvement at 48-72 hours.',
    notes: 'First-line empiric outpatient antibiotic for pediatric febrile UTI per DCMC EBOC guidelines.',
    citations: [
        'Dell Children\'s EBOC. First Febrile Urinary Tract Infection Clinical Pathway. May 2017.',
        'Dell Children\'s EBOC. UTI Management Pathway (Neonatal). September 2024.',
        'Roberts KB. Urinary tract infection: clinical practice guideline for febrile infants and children 2 to 24 months. Pediatrics. 2011;128(3):595-610.',
    ],
};
const DARUNAVIR = {
    id: 'darunavir',
    name: 'Darunavir (Prezista)',
    genericName: 'Darunavir',
    drugClass: 'Protease inhibitor (PI)',
    route: 'PO',
    indications: ['HIV post-exposure prophylaxis (alternative regimen)', 'HIV treatment (ART)'],
    dosing: [
        {
            indication: 'HIV PEP (alternative)',
            regimen: '800 mg PO once daily + ritonavir 100 mg PO once daily x 28 days. Must be taken with food. Always co-administer with ritonavir (pharmacokinetic booster).',
        },
    ],
    contraindications: [
        'Co-administration with alfuzosin, ergot derivatives, cisapride, pimozide, oral midazolam/triazolam, St. John\u2019s wort, lovastatin, simvastatin',
        'Severe hepatic impairment (Child-Pugh C)',
    ],
    cautions: [
        'Sulfonamide allergy \u2014 darunavir contains a sulfonamide moiety; use with caution',
        'Hepatotoxicity \u2014 monitor LFTs, especially in HBV/HCV co-infection',
        'Multiple CYP3A4 drug interactions \u2014 review full medication list',
        'Skin rash \u2014 including rare Stevens-Johnson syndrome',
    ],
    monitoring: 'LFTs at baseline and 2 weeks. Renal function. HIV testing at baseline, 4\u20136 weeks, and 3 months.',
    notes: 'Alternative 3rd agent for PEP when INSTI-based regimen cannot be used. Must be boosted with ritonavir. Higher pill burden and more drug interactions than dolutegravir.',
    citations: [
        'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV. MMWR. 2025;74(1):1-56.',
        'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
    ],
};
const DEXAMETHASONE = {
    id: 'dexamethasone',
    name: 'Dexamethasone',
    genericName: 'Dexamethasone',
    drugClass: 'Corticosteroid (glucocorticoid)',
    route: 'PO/IM/IV',
    indications: ['Croup (standard of care)', 'Cerebral edema', 'Antiemetic (chemotherapy)', 'Bacterial meningitis (adjunctive)', 'Airway edema'],
    dosing: [
        {
            indication: 'Croup',
            regimen: '0.6 mg/kg PO as a single dose (max 16 mg). Low-dose alternative: 0.15 mg/kg PO (non-inferior). If unable to tolerate oral: 0.6 mg/kg IM.',
            weightCalc: [{ dosePerKg: 0.6, unit: 'mg', maxDose: 16, label: 'Standard dose' }, { dosePerKg: 0.15, unit: 'mg', label: 'Low-dose alternative' }],
        },
        {
            indication: 'Cerebral edema',
            regimen: '10 mg IV loading dose, then 4 mg IV/IM q6h.',
        },
        {
            indication: 'Airway edema / post-extubation stridor',
            regimen: '0.5 mg/kg IV q6h x 4 doses, starting 12-24 hours before planned extubation.',
            weightCalc: { dosePerKg: 0.5, unit: 'mg' },
        },
    ],
    contraindications: [
        'Systemic fungal infections',
        'Known hypersensitivity to dexamethasone',
    ],
    cautions: [
        'Single-dose use for croup is safe with minimal adverse effects',
        'Hyperglycemia with repeated dosing — monitor glucose in diabetics',
        'Immunosuppression with prolonged use — not a concern with single dose',
        'May mask signs of infection with prolonged use',
    ],
    monitoring: 'Clinical response. For croup: reassess severity 2-3 hours after dose. For prolonged use: blood glucose, signs of infection.',
    notes: 'Standard of care for croup in ALL severities. A 2023 Cochrane review (45 RCTs, 5,888 children) showed glucocorticoids significantly reduce croup scores at 2, 6, 12, and 24 hours vs placebo. NNT = 7 to prevent one return visit. Single dose provides sustained benefit due to long half-life (~36 hours). Reduces return visits/readmissions by ~50% (RR 0.52). Low-dose (0.15 mg/kg) is non-inferior to standard dose in a 1,252-patient RCT.',
    citations: [
        'Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.',
        'Bjornson CL, et al. A Randomized Trial of a Single Dose of Oral Dexamethasone for Mild Croup. N Engl J Med. 2004;351(13):1306-13.',
        'Parker CM, Cooper MN. Prednisolone Versus Dexamethasone for Croup: A Randomized Controlled Trial. Pediatrics. 2019;144(3):e20183772.',
        'Gates A, Johnson DW, Klassen TP. Glucocorticoids for Croup in Children. JAMA Pediatrics. 2019;173(6):595-596.',
    ],
};
const CLEVIDIPINE = {
    id: 'clevidipine',
    name: 'Clevidipine (Cleviprex)',
    genericName: 'Clevidipine butyrate',
    drugClass: 'Ultra-short-acting dihydropyridine CCB',
    route: 'IV',
    indications: ['Acute hypertension in stroke (pre/post thrombolysis)', 'Perioperative hypertension', 'Hypertensive emergency'],
    dosing: [
        {
            indication: 'Acute stroke BP management',
            regimen: 'Start 1\u20132 mg/hr IV. Double dose every 90 seconds until target BP achieved. Usual maintenance: 4\u20136 mg/hr. Max 21 mg/hr (or 1000 mL per 24h due to lipid load).',
        },
    ],
    contraindications: [
        'Severe aortic stenosis',
        'Defective lipid metabolism (e.g., pathologic hyperlipidemia, lipoid nephrosis, acute pancreatitis with hyperlipidemia)',
        'Allergy to soy or egg products (lipid emulsion vehicle)',
    ],
    cautions: [
        'Lipid emulsion vehicle \u2014 contributes 2 kcal/mL to caloric intake',
        'No preservative \u2014 must be used within 12 hours of puncture',
        'Rebound hypertension possible if discontinued abruptly \u2014 transition to oral agent',
        'Reflex tachycardia may occur',
    ],
    monitoring: 'Continuous arterial BP monitoring recommended. Heart rate. Lipid panel if prolonged use >24h.',
    notes: 'Ultra-short half-life (~1 min) allows precise, rapid BP titration. Achieves target BP faster than nicardipine in clinical trials. Arterial-selective vasodilator \u2014 reduces afterload without venodilation. Does not reduce cerebral blood flow. Consider when nicardipine is unavailable or faster titration is needed.',
    citations: [
        'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
        'Pollack CV, et al. Clevidipine for Acute Hypertension: A Systematic Review and Meta-Analysis. Crit Care Med. 2019.',
    ],
};
const CHLOROTHIAZIDE = {
    id: 'chlorothiazide',
    name: 'Chlorothiazide',
    genericName: 'Chlorothiazide sodium',
    drugClass: 'Thiazide diuretic',
    route: 'IV',
    indications: ['Hyperkalemia (nephron bomb — synergistic with loop diuretic)', 'Volume overload (diuretic resistance)'],
    dosing: [
        {
            indication: 'Hyperkalemia (nephron bomb)',
            regimen: '500-1000 mg IV. Give WITH loop diuretic for sequential nephron blockade.',
        },
    ],
    contraindications: [
        'Anuria',
        'Sulfonamide hypersensitivity (cross-reactivity possible)',
    ],
    cautions: [
        'Only use WITH a loop diuretic — thiazide alone has minimal effect on K+ excretion',
        'Risk of severe hypokalemia, hyponatremia, hypomagnesemia when combined with loop diuretic',
        'Monitor electrolytes frequently',
    ],
    monitoring: 'Electrolytes q2-4h when used in nephron bomb. Urine output.',
    notes: 'IV thiazide for synergistic diuresis ("sequential nephron blockade") — blocks NaCl cotransporter in distal convoluted tubule. Metolazone (PO) is an alternative if IV chlorothiazide unavailable.',
    citations: [
        'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
    ],
};
const CIPROFLOXACIN = {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin',
    drugClass: 'Fluoroquinolone',
    route: 'PO/IV',
    indications: ['Pediatric UTI (IgE-mediated allergy to penicillins AND cephalosporins)', 'Complicated UTI'],
    dosing: [
        {
            indication: 'Pediatric UTI',
            regimen: '20 mg/kg/day divided BID. Max 750 mg/dose (oral).',
            weightCalc: { dosePerKg: 20, unit: 'mg', maxDose: 750, dailyDivided: 2 },
        },
    ],
    contraindications: [
        'Concurrent tizanidine use',
        'QT prolongation risk',
    ],
    cautions: [
        'FDA black box warnings (tendon rupture, peripheral neuropathy, CNS effects)',
        'Generally avoided in children except when benefits outweigh risks',
        'Musculoskeletal adverse events in pediatric patients',
    ],
    monitoring: 'Renal function, QTc if concurrent QT-prolonging agents. Monitor for tendon pain, neuropathy symptoms.',
    notes: 'Reserved for IgE-mediated allergy to penicillins AND cephalosporins in pediatric UTI. Use with caution in pediatric patients \u2014 FDA approval limited. TMP-SMX only 71% susceptible among E. coli isolates, making ciprofloxacin preferred fluoroquinolone alternative.',
    citations: [
        'Dell Children\'s EBOC. First Febrile Urinary Tract Infection Clinical Pathway. May 2017.',
        'Roberts KB. Urinary tract infection: clinical practice guideline for febrile infants and children 2 to 24 months. Pediatrics. 2011;128(3):595-610.',
    ],
};
const CLOPIDOGREL = {
    id: 'clopidogrel',
    name: 'Clopidogrel (Plavix)',
    genericName: 'Clopidogrel bisulfate',
    drugClass: 'Antiplatelet (P2Y12 antagonist)',
    route: 'PO',
    indications: ['Minor ischemic stroke (DAPT)', 'High-risk TIA', 'Acute coronary syndrome', 'Secondary prevention (stent, PAD)', 'ACS / NSTEMI (P2Y12 inhibitor)'],
    dosing: [
        {
            indication: 'Minor stroke / high-risk TIA (DAPT)',
            regimen: '300 mg loading dose on day 1 + aspirin 325 mg. Then 75 mg daily + aspirin 81 mg \u00D7 21 days total DAPT. After 21 days: single antiplatelet (either agent).',
        },
        {
            indication: 'ACS / NSTEMI (conservative strategy)',
            regimen: '300 mg loading dose, then 75 mg daily \u00D7 12 months.',
        },
        {
            indication: 'ACS / NSTEMI (pre-PCI)',
            regimen: '600 mg loading dose, then 75 mg daily \u00D7 12 months. Hold \u22655 days before CABG.',
        },
    ],
    contraindications: [
        'Active pathological bleeding (intracranial hemorrhage, GI bleeding)',
        'Hypersensitivity to clopidogrel',
    ],
    cautions: [
        'CYP2C19 poor metabolizers \u2014 reduced conversion to active metabolite, diminished antiplatelet effect. Consider ticagrelor if known poor metabolizer.',
        'Concurrent omeprazole/esomeprazole \u2014 may reduce clopidogrel efficacy (CYP2C19 inhibition). Use pantoprazole if PPI needed.',
        'Hold 5\u20137 days before elective surgery',
        'Increased bleeding risk with DAPT \u2014 NNH 122 for moderate-severe hemorrhage (POINT trial)',
    ],
    monitoring: 'No routine monitoring. CYP2C19 genotyping if available may guide therapy. Monitor for bleeding.',
    notes: 'POINT trial: DAPT \u00D7 21 days reduced 90-day stroke from 6.5% to 5.0% (NNT 38) in minor stroke/TIA. CHANCE trial: similar benefit in Chinese population. Duration beyond 21 days increases bleeding without additional benefit.',
    citations: [
        'Johnston SC, et al. Clopidogrel and Aspirin in Acute Ischemic Stroke and High-Risk TIA (POINT). N Engl J Med. 2018;379(3):215-225.',
        'Wang Y, et al. Clopidogrel with Aspirin in Acute Minor Stroke or TIA (CHANCE). N Engl J Med. 2013;369(1):11-19.',
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
const DOLUTEGRAVIR = {
    id: 'dolutegravir',
    name: 'Dolutegravir (Tivicay)',
    genericName: 'Dolutegravir',
    drugClass: 'Integrase strand transfer inhibitor (INSTI)',
    route: 'PO',
    indications: ['HIV post-exposure prophylaxis (PEP)', 'HIV treatment (ART)'],
    dosing: [
        {
            indication: 'HIV PEP',
            regimen: '50 mg PO once daily x 28 days (with TDF/FTC backbone). Take with or without food.',
        },
    ],
    contraindications: [
        'Co-administration with dofetilide (increased dofetilide levels)',
    ],
    cautions: [
        'Drug interactions \u2014 avoid polyvalent cation-containing antacids/supplements within 2 hours (chelation reduces absorption)',
        'Metformin \u2014 dolutegravir increases metformin levels; limit metformin to 1000 mg/day',
        'Insomnia and neuropsychiatric effects \u2014 reported in some patients',
        'Weight gain \u2014 observed with long-term INSTI use',
    ],
    monitoring: 'HIV testing at baseline, 4\u20136 weeks, and 3 months. Renal function if on TDF backbone.',
    notes: 'Preferred 3rd agent for PEP when used with TDF/FTC backbone. High barrier to resistance. Well tolerated. Safe in pregnancy.',
    citations: [
        'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV. MMWR. 2025;74(1):1-56.',
        'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
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
            weightCalc: [{ dosePerKg: 0.25, unit: 'mg', label: 'Initial bolus' }, { dosePerKg: 0.35, unit: 'mg', label: 'Second bolus (if needed)' }],
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
    name: 'Epinephrine',
    genericName: 'Epinephrine',
    drugClass: 'Non-selective adrenergic agonist (alpha + beta)',
    route: 'IV/IO/SQ/ET/Intracavernosal',
    indications: ['Hyperkalemia with hemodynamic instability', 'Ischemic priapism (alternative to phenylephrine)', 'Neonatal resuscitation (NRP)'],
    dosing: [
        {
            indication: 'Hyperkalemia with hypotension/bradycardia',
            regimen: 'Epinephrine infusion 2-10 mcg/min IV. Treats both hyperkalemia AND hemodynamic instability simultaneously. Beta-2 effect shifts K+ intracellularly.',
        },
        {
            indication: 'Ischemic priapism',
            regimen: '20 mcg (2 mL of 10 mcg/mL solution) intracavernosal every 5 minutes, up to 5 doses total (100 mcg max). Mix: 1 mL epi from cardiac amp (100 mcg/mL) + 9 mL NS = 10 mcg/mL.',
        },
        {
            indication: 'Neonatal resuscitation (NRP) — IV/IO',
            regimen: '0.01-0.03 mg/kg of 1:10,000 (0.1-0.3 mL/kg) IV/IO. Repeat every 3-5 minutes. Flush with 1-3 mL NS. IV/IO preferred over ET route.',
            weightCalc: [
                { dosePerKg: 0.01, unit: 'mg', label: 'Low dose (0.01 mg/kg)' },
                { dosePerKg: 0.03, unit: 'mg', label: 'High dose (0.03 mg/kg)' },
            ],
        },
        {
            indication: 'Neonatal resuscitation (NRP) — ET',
            regimen: '0.05-0.1 mg/kg of 1:10,000 (0.5-1 mL/kg) via endotracheal tube. Use only if IV/IO access not available. Higher dose needed — absorption is unpredictable via ET route.',
            weightCalc: [
                { dosePerKg: 0.05, unit: 'mg', label: 'Low dose ET (0.05 mg/kg)' },
                { dosePerKg: 0.1, unit: 'mg', label: 'High dose ET (0.1 mg/kg)' },
            ],
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
        'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
        'AHA/AAP. 2025 Guidelines for Neonatal Resuscitation. Circulation. 2025;152(Suppl 1):S399-S445.',
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
            weightCalc: [{ dosePerKg: 1, unit: 'mg', label: 'BID dosing' }, { dosePerKg: 1.5, unit: 'mg', label: 'Daily dosing' }],
        },
        {
            indication: 'VTE prophylaxis',
            regimen: '40 mg SC once daily.',
        },
        {
            indication: 'ACS / NSTEMI',
            regimen: '1 mg/kg SC every 12 hours. Duration: until invasive strategy or up to 8 days. CrCl <30 mL/min: 1 mg/kg SC once daily. If PCI >8h after last SC dose: supplemental 0.3 mg/kg IV bolus in cath lab.',
            weightCalc: { dosePerKg: 1, unit: 'mg' },
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
    indications: ['Dorsal penile nerve block', 'Hematoma block', 'Local anesthesia for minor procedures', 'Nerve blocks'],
    dosing: [
        {
            indication: 'Dorsal penile nerve block',
            regimen: '10 mL total of 1% lidocaine WITHOUT epinephrine: 5 mL injected at 10 o\u2019clock and 5 mL at 2 o\u2019clock at penile base, under Buck\u2019s fascia.',
        },
        {
            indication: 'Hematoma block',
            regimen: '5–10 mL of 1% plain lidocaine (10 mg/mL) injected directly into fracture hematoma via 20-gauge needle. Aspirate dark blood to confirm placement. US-guided for improved accuracy. Wait 5–10 min for full effect. For combined radius + ulna fractures, second injection into ulnar hematoma.',
            weightCalc: { dosePerKg: 4.5, unit: 'mg', label: 'Max dose (1% = 10 mg/mL)' },
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
        'Hematoma block: fracture hematoma contiguous with marrow space — rapid systemic absorption similar to IO',
    ],
    monitoring: 'Test block adequacy with pinprick before procedure. Onset: 2\u20135 min. Duration: 30\u201360 min.',
    notes: 'For penile block, NEVER use formulations containing epinephrine. The penis is supplied by end-arteries \u2014 epinephrine can cause ischemic necrosis.',
    citations: [
        'Burnett AL, Sharlip ID. Standard Operating Procedures for Priapism. J Sex Med. 2013;10(1):180-94.',
    ],
};
const FONDAPARINUX = {
    id: 'fondaparinux',
    name: 'Fondaparinux (Arixtra)',
    genericName: 'Fondaparinux sodium',
    drugClass: 'Synthetic factor Xa inhibitor (indirect)',
    route: 'SC',
    indications: ['ACS / NSTEMI (conservative management)', 'DVT/PE treatment', 'VTE prophylaxis'],
    dosing: [
        {
            indication: 'NSTEMI (conservative / ischemia-guided strategy)',
            regimen: '2.5 mg SC once daily. Start on presentation, continue until discharge or up to 8 days. If patient goes to PCI: supplement with UFH 60 units/kg bolus (catheter thrombosis risk).',
        },
    ],
    contraindications: [
        'CrCl <30 mL/min — contraindicated',
        'Active major bleeding',
        'Bacterial endocarditis',
        'Body weight <50 kg — increased bleeding risk',
    ],
    cautions: [
        'Catheter thrombosis if used alone during PCI — must supplement with UFH bolus in cath lab',
        'Cannot monitor with aPTT — use anti-Xa levels if monitoring needed',
        'Neuraxial anesthesia — risk of spinal/epidural hematoma',
        'No reversal agent available',
    ],
    monitoring: 'Renal function at baseline. Anti-Xa levels only if needed (not routine). CBC for bleeding. Signs of catheter thrombosis if proceeding to PCI.',
    notes: 'OASIS-5 trial: fondaparinux 2.5 mg daily was noninferior to enoxaparin for ischemic events in NSTEMI but with 50% reduction in major bleeding (2.2% vs 4.1%) and significantly lower mortality at 6 months. Preferred anticoagulant for conservative/ischemia-guided management strategy. Must supplement with UFH if patient undergoes PCI due to catheter thrombosis risk.',
    citations: [
        'Yusuf S, et al. Comparison of Fondaparinux and Enoxaparin in Acute Coronary Syndromes (OASIS-5). N Engl J Med. 2006;354(14):1464-1476.',
        'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.',
    ],
};
const FLUDROCORTISONE = {
    id: 'fludrocortisone',
    name: 'Fludrocortisone',
    genericName: 'Fludrocortisone acetate',
    drugClass: 'Mineralocorticoid',
    route: 'PO',
    indications: ['Hyperkalemia (adjunct — stimulates renal K+ excretion)', 'Adrenal insufficiency', 'Orthostatic hypotension'],
    dosing: [
        {
            indication: 'Hyperkalemia adjunct',
            regimen: '0.2 mg PO once. Especially useful in patients on ACEi/ARB, tacrolimus, or with suspected type IV RTA.',
        },
    ],
    contraindications: [
        'Systemic fungal infections',
        'Active heart failure (sodium retention)',
    ],
    cautions: [
        'Sodium retention → fluid overload, edema, hypertension',
        'Hypokalemia with prolonged use',
        'Consider if patient making urine but K+ not falling (inadequate urine K+ content)',
    ],
    monitoring: 'Blood pressure, serum potassium, fluid status.',
    notes: 'Underutilized adjunct for hyperkalemia. Replaces the mineralocorticoid effect suppressed by ACEi/ARBs, tacrolimus, and other causes of type IV RTA. Stimulates ENaC sodium reabsorption and ROMK potassium secretion in the collecting duct. Most effective when combined with adequate sodium delivery to the collecting duct (i.e., after volume resuscitation).',
    citations: [
        'Palmer BF, Clegg DJ. Diagnosis and Treatment of Hyperkalemia. Cleve Clin J Med. 2017;84(12):934-942.',
    ],
};
const FUROSEMIDE = {
    id: 'furosemide',
    name: 'Furosemide',
    genericName: 'Furosemide',
    drugClass: 'Loop diuretic',
    route: 'IV',
    indications: ['Hyperkalemia (kaliuresis)', 'Volume overload / pulmonary edema', 'Acute kidney injury (oliguric)'],
    dosing: [
        {
            indication: 'Hyperkalemia (normal renal function)',
            regimen: '40-80 mg IV. May be sufficient as sole diuretic.',
        },
        {
            indication: 'Hyperkalemia (moderate-severe renal dysfunction)',
            regimen: '160-250 mg IV. Combine with thiazide +/- acetazolamide for synergistic "nephron bomb."',
        },
        {
            indication: 'Volume overload',
            regimen: '40-160 mg IV, dose based on renal function and prior diuretic exposure.',
        },
    ],
    contraindications: [
        'Anuria unresponsive to fluid challenge',
        'Severe hypovolemia/dehydration',
        'Hepatic coma (electrolyte shifts)',
    ],
    cautions: [
        'Higher doses needed in renal dysfunction (diuretic resistance)',
        'Replace urine losses with crystalloid to avoid hypovolemia — use isotonic bicarb if bicarb <22, LR if bicarb ≥22',
        'Monitor electrolytes: K, Mg, Na, Ca frequently',
        'Ototoxicity at very high doses or rapid infusion',
    ],
    monitoring: 'Urine output (target response within 1-2 hours), serum electrolytes including Mg, fluid balance.',
    notes: 'Cornerstone of kaliuresis strategy. For life-threatening hyperkalemia, err on the side of more diuretic — excessive diuresis is easily corrected with crystalloid, but inadequate diuretic may lead to unnecessary dialysis. In the "nephron bomb," furosemide blocks the Na-K-2Cl cotransporter in the thick ascending limb.',
    citations: [
        'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
        'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
    ],
};
const GENTAMICIN = {
    id: 'gentamicin',
    name: 'Gentamicin',
    genericName: 'Gentamicin sulfate',
    drugClass: 'Aminoglycoside',
    route: 'IV',
    indications: ['Neonatal sepsis (0-7 days, synergy with Ampicillin)'],
    dosing: [
        {
            indication: 'Neonatal sepsis (0-7 days)',
            regimen: '4 mg/kg IV q24h.',
        },
        {
            indication: 'Neonatal sepsis (8-28 days, if extended use)',
            regimen: '5 mg/kg IV q24h.',
        },
    ],
    contraindications: [
        'Known hypersensitivity to aminoglycosides',
    ],
    cautions: [
        'Nephrotoxicity — monitor renal function',
        'Ototoxicity — risk increases with prolonged use',
        'Neuromuscular blockade — caution with concurrent paralytics',
    ],
    monitoring: 'Drug levels not needed for empiric rule-out period (≤48h). If >2 doses anticipated, obtain trough before 3rd dose (goal <1 mcg/mL). Renal function (BUN, creatinine). Audiometry if prolonged course.',
    notes: 'Provides synergistic bactericidal activity with Ampicillin against GBS and Listeria. Standard empiric pairing for neonatal sepsis in the first week of life (Ampicillin + Gentamicin). Transition to Ceftriaxone/Cefepime-based regimen after 7 days of life.',
    citations: [
        'Puopolo KM, et al. Management of Neonates Born at ≥35 0/7 Weeks\' Gestation With Suspected or Proven Early-Onset Bacterial Sepsis. Pediatrics. 2018;142(6):e20182894.',
        'Red Book: 2021-2024 Report of the Committee on Infectious Diseases. American Academy of Pediatrics.',
    ],
};
const LABETALOL = {
    id: 'labetalol',
    name: 'Labetalol',
    genericName: 'Labetalol hydrochloride',
    drugClass: 'Combined alpha-1 and beta-adrenergic blocker',
    route: 'IV',
    indications: ['Acute stroke BP management (pre/post thrombolysis)', 'Hypertensive emergency', 'Preeclampsia/eclampsia'],
    dosing: [
        {
            indication: 'Pre-thrombolysis BP (target <185/110)',
            regimen: '10\u201320 mg IV bolus over 1\u20132 min. May repeat once. If BP still >185/110 after 2 doses, consider nicardipine infusion. Do NOT proceed with thrombolysis if BP remains uncontrolled.',
        },
        {
            indication: 'Post-thrombolysis BP (target <180/105 \u00D7 24h)',
            regimen: '10 mg IV bolus, then 2\u20138 mg/min continuous infusion. Titrate to maintain BP <180/105. Max 300 mg/24h.',
        },
    ],
    contraindications: [
        'Severe bradycardia (HR <60)',
        'Heart block greater than first degree without pacemaker',
        'Cardiogenic shock or decompensated HF',
        'Severe reactive airway disease / status asthmaticus',
        'Pheochromocytoma (without prior alpha-blockade)',
    ],
    cautions: [
        'Bronchospasm \u2014 beta-2 blockade at higher doses may precipitate bronchospasm in asthma/COPD',
        'Bradycardia \u2014 monitor HR; hold if HR <55',
        'Hepatotoxicity \u2014 rare idiosyncratic reaction; monitor LFTs if prolonged use',
        'Orthostatic hypotension \u2014 keep patient supine during IV administration',
    ],
    monitoring: 'Continuous BP monitoring (arterial line preferred). Heart rate. Neuro checks every 15 min during active titration.',
    notes: 'First-line IV antihypertensive for acute stroke per AHA/ASA guidelines. Onset: 2\u20135 min IV. Duration: 2\u20134 hours. Alpha:beta blockade ratio is ~1:7 (predominantly beta). Does not increase intracranial pressure. Preferred over nitroprusside (which can raise ICP).',
    citations: [
        'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
        'Whelton PK, et al. 2017 ACC/AHA Guideline for Prevention, Detection, Evaluation, and Management of High Blood Pressure. J Am Coll Cardiol. 2018;71(19):e127-e248.',
    ],
};
const MAGNESIUM_SULFATE = {
    id: 'magnesium-sulfate',
    name: 'Magnesium Sulfate',
    genericName: 'Magnesium sulfate',
    drugClass: 'Electrolyte / Antiarrhythmic adjunct',
    route: 'IV',
    indications: ['A-Fib / A-Flutter adjunctive rate and rhythm control', 'Torsades de pointes', 'Hypomagnesemia', 'Eclampsia / Pre-eclampsia seizure prophylaxis', 'Hypomagnesemia / Hypokalemia adjunct'],
    dosing: [
        {
            indication: 'A-Fib (adjunctive)',
            regimen: 'Bolus: 2-4 g IV over 15-30 min. For aggressive repletion: continuous infusion per institutional protocol. Target serum level ~3-4 mg/dL for antiarrhythmic effect. Most administered magnesium is renally excreted \u2014 continuous infusion may be needed to replete intracellular stores.',
        },
        {
            indication: 'Torsades de pointes',
            regimen: '1-2 g IV over 5-60 min (faster for unstable patients).',
        },
        {
            indication: 'Hypomagnesemia / Hypokalemia (adjunct)',
            regimen: '2 g IV over 1 hour. Correct hypomagnesemia before potassium repletion \u2014 hypokalemia is refractory until Mg is repleted.',
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
        {
            indication: 'ACS / NSTEMI (anti-ischemic)',
            regimen: 'IV: 5 mg IV push over 2 min, repeat every 5 min × 3 doses (total 15 mg). Hold if HR <60 or SBP <100. PO: 25-50 mg PO q6h starting 15 min after last IV dose. Target HR: <70 bpm. Transition to metoprolol succinate 50-200 mg daily for long-term.',
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
        'Cocaine/methamphetamine-associated ACS — avoid beta-blockers acutely (may worsen coronary vasospasm due to unopposed alpha stimulation). Use benzodiazepines and nitroglycerin instead.',
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
const METOLAZONE = {
    id: 'metolazone',
    name: 'Metolazone',
    genericName: 'Metolazone',
    drugClass: 'Thiazide-like diuretic',
    route: 'PO',
    indications: ['Hyperkalemia (nephron bomb — synergistic with loop diuretic)', 'Diuretic resistance in heart failure'],
    dosing: [
        {
            indication: 'Hyperkalemia (nephron bomb)',
            regimen: '5-10 mg PO. Give 30 min before IV loop diuretic for optimal synergy.',
        },
        {
            indication: 'Diuretic resistance',
            regimen: '2.5-10 mg PO daily, given 30 min before loop diuretic.',
        },
    ],
    contraindications: [
        'Anuria',
        'Hepatic coma',
    ],
    cautions: [
        'Oral only — use IV chlorothiazide if enteral route unavailable',
        'Potent synergy with loop diuretics can cause rapid, profound diuresis',
        'Monitor for severe hypokalemia, hyponatremia, hypomagnesemia',
    ],
    monitoring: 'Electrolytes q2-4h during acute use. Urine output. Daily weights.',
    notes: 'Oral alternative to IV chlorothiazide for sequential nephron blockade. Effective even in severe renal impairment (unlike hydrochlorothiazide). Give 30 min before loop diuretic for optimal timing of sequential blockade.',
    citations: [
        'Weisberg LS. Management of severe hyperkalemia. Crit Care Med. 2008;36(12):3246-51.',
    ],
};
const NICARDIPINE = {
    id: 'nicardipine',
    name: 'Nicardipine (Cardene)',
    genericName: 'Nicardipine hydrochloride',
    drugClass: 'Dihydropyridine calcium channel blocker',
    route: 'IV',
    indications: ['Acute stroke BP management (pre/post thrombolysis)', 'Hypertensive emergency', 'Perioperative hypertension'],
    dosing: [
        {
            indication: 'Pre-thrombolysis BP (target <185/110)',
            regimen: '5 mg/hr IV infusion. Titrate by 2.5 mg/hr every 5\u201315 min. Max 15 mg/hr. Once target achieved, decrease to 3 mg/hr and titrate to maintain.',
        },
        {
            indication: 'Post-thrombolysis BP (target <180/105 \u00D7 24h)',
            regimen: '5 mg/hr IV infusion, titrate by 2.5 mg/hr every 5\u201315 min to maintain BP <180/105. Max 15 mg/hr.',
        },
    ],
    contraindications: [
        'Advanced aortic stenosis',
        'Hypersensitivity to nicardipine or other dihydropyridine CCBs',
    ],
    cautions: [
        'Reflex tachycardia \u2014 may need to combine with beta-blocker',
        'Peripheral phlebitis \u2014 change IV site every 12h or use central line',
        'Hepatic impairment \u2014 reduce dose (extensively hepatically metabolized)',
        'Transition to oral antihypertensive when stable \u2014 onset of oral agent overlaps with nicardipine wean',
    ],
    monitoring: 'Continuous arterial BP monitoring recommended. Heart rate. IV site inspection every 4\u20136h (phlebitis risk).',
    notes: 'Second-line to labetalol for acute stroke BP management. Preferred when beta-blocker contraindicated (asthma, bradycardia, HF). Onset: 5\u201310 min. Does not increase ICP. Arterial-selective vasodilator. More predictable dose-response than labetalol for continuous infusion.',
    citations: [
        'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
        'Liu-Deryke X, et al. Management of Hypertension in Acute Ischemic Stroke. Ann Pharmacother. 2006;40(12):2234-46.',
    ],
};
const NITROGLYCERIN = {
    id: 'nitroglycerin',
    name: 'Nitroglycerin',
    genericName: 'Nitroglycerin (glyceryl trinitrate)',
    drugClass: 'Organic nitrate (vasodilator)',
    route: 'SL / IV',
    indications: ['Acute coronary syndrome', 'Angina pectoris', 'Acute pulmonary edema', 'Hypertensive emergency', 'Tocolysis (uterine relaxation)'],
    dosing: [
        {
            indication: 'ACS / NSTEMI (initial)',
            regimen: 'SL: 0.4 mg (1 tablet or spray) every 5 min × 3 doses. IV: Start 5-10 mcg/min, titrate by 5-10 mcg/min every 3-5 min. Target: symptom relief and SBP >100. Max typically 200 mcg/min.',
        },
        {
            indication: 'Tocolysis (Shoulder Dystocia / Zavanelli)',
            regimen: 'SL: 0.4 mg (1 spray or tablet) × 1 dose. Provides rapid uterine relaxation to facilitate cephalic replacement (Zavanelli maneuver) prior to emergency cesarean section. Onset: 1-2 minutes SL. Alternative to terbutaline SQ.',
        },
    ],
    contraindications: [
        'Systolic BP <90 mmHg or ≥30 mmHg below baseline',
        'Right ventricular infarction (preload-dependent)',
        'Phosphodiesterase-5 inhibitor use within 24h (sildenafil/vardenafil) or 48h (tadalafil)',
        'Severe aortic stenosis',
        'Hypertrophic obstructive cardiomyopathy',
    ],
    cautions: [
        'Hypotension — especially with concurrent antihypertensives, volume depletion, or RV involvement',
        'Reflex tachycardia — may worsen ischemia; consider concurrent beta-blocker',
        'Headache — most common side effect (vasodilation)',
        'Tolerance develops with continuous IV infusion >24-48h',
        'Must use non-PVC IV tubing — nitroglycerin adsorbs to standard PVC',
    ],
    monitoring: 'Continuous BP monitoring during IV infusion. Heart rate. Symptom response. 12-lead ECG for ST-segment changes.',
    notes: 'Nitroglycerin provides symptomatic relief in ACS through coronary vasodilation, preload reduction, and afterload reduction. No proven mortality benefit in ACS (ISIS-4, GISSI-3), but effective for symptom management. Always rule out RV infarction (right-sided ECG, V4R) before administration — nitrates can cause catastrophic hypotension in RV failure. SL nitroglycerin that relieves chest pain does NOT differentiate cardiac from non-cardiac causes.',
    citations: [
        'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.',
        'Thadani U. Nitrate Therapy and Nitrate Tolerance in Patients with Coronary Artery Disease. Curr Pharm Des. 2014;20(25):3966-79.',
    ],
};
const OXYTOCIN = {
    id: 'oxytocin',
    name: 'Oxytocin (Pitocin)',
    genericName: 'Oxytocin',
    drugClass: 'Uterotonic',
    route: 'IV infusion',
    indications: ['Precipitous Delivery — Third Stage (PPH prevention)', 'Postpartum hemorrhage', 'Labor augmentation'],
    dosing: [
        {
            indication: 'Precipitous Delivery — Third Stage',
            regimen: '20 units in 1L NS (or LR). Infuse at 250 mL/hr. Max 40 units over 4–10 hrs. Start after placental delivery. Do NOT give IV push — can cause profound hypotension.',
        },
    ],
    contraindications: [
        'Hypersensitivity to oxytocin',
    ],
    cautions: [
        'Water intoxication with prolonged high-dose infusion (antidiuretic effect)',
        'Uterine hyperstimulation — can cause fetal distress if given before delivery',
        'Do NOT give IV push — risk of severe hypotension, tachycardia, and cardiac arrhythmia',
    ],
    monitoring: 'Uterine tone, vaginal bleeding, vital signs, fluid balance. If prolonged infusion: monitor for signs of water intoxication (hyponatremia, confusion, seizures).',
    notes: 'First-line uterotonic for PPH prevention and treatment. Uterine atony is the most common cause of postpartum hemorrhage. Empiric use after placental delivery is recommended — do not wait for signs of bleeding. Combine with bimanual uterine massage until uterus is firm.',
    citations: [
        'ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186.',
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
const PRASUGREL = {
    id: 'prasugrel',
    name: 'Prasugrel (Effient)',
    genericName: 'Prasugrel hydrochloride',
    drugClass: 'Antiplatelet (irreversible P2Y12 antagonist)',
    route: 'PO',
    indications: ['ACS undergoing PCI (high ischemic risk)', 'NSTEMI/UA managed with PCI'],
    dosing: [
        {
            indication: 'ACS / NSTEMI post-PCI',
            regimen: '60 mg loading dose at time of PCI, then 10 mg PO daily × 12 months. Aspirin 81 mg daily concurrent (do not exceed 100 mg/day). For patients <60 kg: consider 5 mg daily maintenance.',
        },
    ],
    contraindications: [
        'Prior stroke or TIA — absolute contraindication (net clinical harm in TRITON-TIMI 38)',
        'Active pathological bleeding',
        'Hypersensitivity to prasugrel',
    ],
    cautions: [
        'Age ≥75 years — generally not recommended due to increased bleeding risk (no net clinical benefit in TRITON-TIMI 38 subgroup)',
        'Body weight <60 kg — consider 5 mg daily maintenance dose',
        'CABG-related bleeding — hold 7 days before elective CABG (longer offset than ticagrelor)',
        'More potent and less variable platelet inhibition than clopidogrel — advantage in high ischemic risk but higher bleeding',
        'Not dependent on CYP2C19 metabolism — no genotype interaction (advantage over clopidogrel)',
    ],
    monitoring: 'No routine monitoring required. Monitor for signs of bleeding. Hemoglobin/hematocrit if bleeding suspected.',
    notes: 'TRITON-TIMI 38 trial: prasugrel reduced cardiovascular death/MI/stroke by 19% vs clopidogrel in ACS patients undergoing PCI (NNT 46), but increased major bleeding (NNH 167). NET CLINICAL HARM in patients with prior stroke/TIA — this is an absolute contraindication. Reserved for high ischemic risk patients (e.g., diabetics, stent thrombosis history) undergoing PCI when ticagrelor is not appropriate.',
    citations: [
        'Wiviott SD, et al. Prasugrel versus Clopidogrel in Patients with Acute Coronary Syndromes (TRITON-TIMI 38). N Engl J Med. 2007;357(20):2001-2015.',
        'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.',
    ],
};
const PREDNISOLONE = {
    id: 'prednisolone',
    name: 'Prednisolone',
    genericName: 'Prednisolone',
    drugClass: 'Corticosteroid (glucocorticoid)',
    route: 'PO',
    indications: ['Croup (alternative to dexamethasone)', 'Asthma exacerbation', 'Inflammatory conditions'],
    dosing: [
        {
            indication: 'Croup',
            regimen: '1 mg/kg PO as a single dose (max 60 mg). Non-inferior to dexamethasone 0.6 mg/kg in a 1,252-patient RCT.',
            weightCalc: { dosePerKg: 1, unit: 'mg', maxDose: 60 },
        },
        {
            indication: 'Asthma exacerbation',
            regimen: '1-2 mg/kg/day PO (max 60 mg) for 3-5 days.',
            weightCalc: { dosePerKg: 2, unit: 'mg', maxDose: 60 },
        },
    ],
    contraindications: [
        'Systemic fungal infections',
        'Known hypersensitivity',
    ],
    cautions: [
        'Shorter half-life than dexamethasone (~12-36 hours vs ~36 hours) — may need additional doses for prolonged symptoms',
        'Available as liquid formulation — easier for young children who cannot swallow tablets',
        'Bitter taste — may cause vomiting in some children',
    ],
    monitoring: 'Clinical response. For croup: reassess severity 2-3 hours after dose.',
    notes: 'Non-inferior alternative to dexamethasone for croup based on Parker et al. (2019) — 1,252 children randomized to prednisolone 1 mg/kg vs dexamethasone 0.6 mg/kg showed equivalent outcomes for symptom relief and 7-day return visits. Advantage: widely available as liquid formulation. Disadvantage: shorter half-life means symptoms may recur, and bitter taste may cause vomiting.',
    citations: [
        'Parker CM, Cooper MN. Prednisolone Versus Dexamethasone for Croup: A Randomized Controlled Trial. Pediatrics. 2019;144(3):e20183772.',
        'Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.',
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
const POTASSIUM_CHLORIDE_IV = {
    id: 'potassium-chloride-iv',
    name: 'Potassium Chloride (IV)',
    genericName: 'Potassium chloride',
    drugClass: 'Electrolyte supplement',
    route: 'IV',
    indications: ['Severe hypokalemia (K+ ≤2.5 mEq/L)', 'Hypokalemia with arrhythmia or paralysis'],
    dosing: [
        {
            indication: 'Severe hypokalemia (life-threatening)',
            regimen: '5-10 mEq IV over 15-30 minutes with continuous cardiac monitoring. Repeat until K+ >3 mEq/L and hemodynamically stable.',
        },
        {
            indication: 'Subsequent replacement',
            regimen: '20-40 mEq IV. Rate: max 10 mEq/hr via peripheral IV (max concentration 10 mEq/100 mL), max 20 mEq/hr via central line with cardiac monitoring.',
        },
    ],
    contraindications: [
        'Hyperkalemia',
        'Severe renal failure with anuria (unable to excrete K+)',
        'Untreated Addison disease',
    ],
    cautions: [
        'Rates >10 mEq/hr require central venous access + continuous cardiac monitoring',
        'Use GLUCOSE-FREE IV fluids as carrier (glucose stimulates insulin → worsens intracellular K+ shift)',
        'Always check and correct magnesium first (hypoMg makes K repletion refractory)',
        'Risk of phlebitis at peripheral sites with concentrated solutions',
    ],
    monitoring: 'Continuous cardiac monitoring during infusion. Recheck K+ every 2-4 hours. Monitor Mg concurrently. Fingerstick glucose if also receiving insulin.',
    notes: 'IV KCl is ONLY for severe hypokalemia or patients who cannot take oral. Oral KCl is safer (lower rebound hyperkalemia risk). Serum K+ decreases ~0.3 mEq/L per 100 mEq total body deficit, but this relationship is highly variable. KCl is the preferred salt (corrects concurrent chloride deficiency from most common causes).',
    citations: [
        'Kim MJ, et al. Potassium Disorders: Hypokalemia and Hyperkalemia. Am Fam Physician. 2023;107(1):59-70.',
        'Gennari FJ. Hypokalemia. N Engl J Med. 1998;339(7):451-8.',
    ],
};
const POTASSIUM_CHLORIDE_ORAL = {
    id: 'potassium-chloride-oral',
    name: 'Potassium Chloride (Oral)',
    genericName: 'Potassium chloride',
    drugClass: 'Electrolyte supplement',
    route: 'PO',
    indications: ['Mild-moderate hypokalemia (K+ 2.5-3.5 mEq/L)', 'Chronic potassium replacement', 'Hypokalemic periodic paralysis (acute attack — immediate-release only)'],
    dosing: [
        {
            indication: 'Acute replacement',
            regimen: '20-40 mEq PO. Each 20 mEq raises serum K+ ~0.2 mEq/L. Recheck in 2-4 hours.',
        },
        {
            indication: 'Chronic replacement',
            regimen: '50-75 mEq PO daily in divided doses (raises serum K+ ~0.14 mEq/L with enhanced effect when combined with ACEi/ARB).',
        },
        {
            indication: 'Periodic paralysis (acute attack)',
            regimen: '1 mEq/kg (~60 mEq for 60 kg patient) IMMEDIATE-RELEASE or liquid only. Then 0.3 mEq/kg q30min if no improvement. AVOID slow-release — too slow and unpredictable. HIGH rebound hyperkalemia risk.',
        },
    ],
    contraindications: [
        'Hyperkalemia',
        'GI obstruction or stricture (for solid dosage forms)',
        'Severe renal impairment with oliguria',
    ],
    cautions: [
        'GI irritation — take with food and full glass of water',
        'Dietary potassium alone is INSUFFICIENT for replacement (food K+ is coupled with phosphate, not chloride)',
        'For periodic paralysis: use immediate-release/liquid ONLY, monitor K+ q30 min, watch for rebound hyperkalemia',
    ],
    monitoring: 'Recheck serum K+ 2-4 hours after acute dose. Check Mg (hypoMg causes refractory hypoK). BMP for chronic replacement.',
    notes: 'Potassium chloride is the PREFERRED salt for most causes of hypokalemia (corrects concurrent metabolic alkalosis and chloride depletion). Potassium bicarbonate may be preferred in RTA with metabolic acidosis. Potassium phosphate for refeeding syndrome. Safer than IV route due to gradual absorption.',
    citations: [
        'Kim MJ, et al. Potassium Disorders: Hypokalemia and Hyperkalemia. Am Fam Physician. 2023;107(1):59-70.',
        'Gennari FJ. Hypokalemia. N Engl J Med. 1998;339(7):451-8.',
        'Statland JM, et al. Review of the Diagnosis and Treatment of Periodic Paralysis. Muscle Nerve. 2018;57(4):522-530.',
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
const RITONAVIR = {
    id: 'ritonavir',
    name: 'Ritonavir (Norvir)',
    genericName: 'Ritonavir',
    drugClass: 'Protease inhibitor (pharmacokinetic booster)',
    route: 'PO',
    indications: ['Pharmacokinetic booster for darunavir (PEP alternative)', 'Pharmacokinetic booster for other PIs'],
    dosing: [
        {
            indication: 'PK booster for darunavir (PEP)',
            regimen: '100 mg PO once daily x 28 days. Always co-administer with darunavir 800 mg. Take with food.',
        },
    ],
    contraindications: [
        'Co-administration with alfuzosin, amiodarone, flecainide, ergot derivatives, lovastatin, simvastatin, pimozide, sildenafil (for PAH), oral midazolam/triazolam',
    ],
    cautions: [
        'Potent CYP3A4 inhibitor \u2014 extensive drug interactions; review full medication list',
        'GI side effects (nausea, diarrhea, dysgeusia) \u2014 common at boosting doses',
        'Hepatotoxicity \u2014 monitor LFTs in hepatic impairment',
        'Lipid elevations with prolonged use',
    ],
    monitoring: 'LFTs at baseline. Review drug interaction list before prescribing.',
    notes: 'Used at sub-therapeutic dose (100 mg) solely as a pharmacokinetic booster to increase darunavir levels via CYP3A4 inhibition. Not used as a standalone antiretroviral at this dose.',
    citations: [
        'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
    ],
};
const RACEMIC_EPINEPHRINE = {
    id: 'racemic-epinephrine',
    name: 'Racemic Epinephrine (Nebulized)',
    genericName: 'Racemic epinephrine',
    drugClass: 'Alpha/beta adrenergic agonist',
    route: 'Inhaled (nebulized)',
    indications: ['Croup (moderate-severe)', 'Post-extubation stridor'],
    dosing: [
        {
            indication: 'Croup',
            regimen: '0.5 mL of 2.25% racemic epinephrine diluted in 4.5 mL normal saline, nebulized. May repeat as needed. Alternative: L-epinephrine 0.5 mL/kg of 1:1000 (max 5 mL) nebulized.',
        },
        {
            indication: 'Post-extubation stridor',
            regimen: '0.5 mL of 2.25% in 4.5 mL NS nebulized. May repeat x1.',
        },
    ],
    contraindications: [
        'Known hypersensitivity',
        'Use with caution in underlying cardiac disease',
    ],
    cautions: [
        'Effects are TRANSIENT — onset within minutes, duration only 1-2 hours',
        'MUST observe minimum 2 hours after administration for symptom rebound',
        'Tachycardia and tremor are expected side effects',
        'Multiple doses → strong indicator for hospital admission',
    ],
    monitoring: 'Heart rate, respiratory status. Observe minimum 2 hours after each dose for rebound symptoms. Monitor for return of stridor at rest.',
    notes: 'Provides rapid mucosal vasoconstriction reducing subglottic edema. Relief is temporary — the underlying inflammation persists. Repeated doses may prevent intubation in severe cases. L-epinephrine (1:1000) is an acceptable alternative where racemic formulation is unavailable. Children who require >2 doses should generally be admitted. Always administer with concurrent glucocorticoid (dexamethasone).',
    citations: [
        'Cherry JD. Croup. N Engl J Med. 2008;358(4):384-91.',
        'Zoorob R, Sidani M, Murray J. Croup: An Overview. Am Fam Physician. 2011;83(9):1067-73.',
        'Smith DK, McDermott AJ, Sullivan JF. Croup: Diagnosis and Management. Am Fam Physician. 2018;97(9):575-580.',
    ],
};
const REGULAR_INSULIN = {
    id: 'regular-insulin',
    name: 'Regular Insulin (IV)',
    genericName: 'Insulin regular (human)',
    drugClass: 'Hormone / potassium-shifting agent',
    route: 'IV',
    indications: ['Hyperkalemia (potassium shift)'],
    dosing: [
        {
            indication: 'Hyperkalemia',
            regimen: '5 units regular insulin IV bolus (NOT subcutaneous). Must give with dextrose unless glucose >250 mg/dL.',
        },
        {
            indication: 'Dextrose co-administration',
            regimen: 'If glucose <250: D50W 2 ampules (100 mL total, 50g dextrose) OR D10W 500 mL over 4 hours. If glucose 180-250: half-dose dextrose (25g). If glucose >250: no dextrose needed.',
        },
    ],
    contraindications: [
        'Severe hypoglycemia (give dextrose first)',
    ],
    cautions: [
        'Must be given IV — subcutaneous absorption is unpredictable in critical illness',
        '5 units (not 10) reduces hypoglycemia risk from 15-20% to <5% with similar K-lowering effect',
        'Potassium shift lasts ~4 hours — may need redosing',
        'Risk factors for hypoglycemia: renal dysfunction, no diabetes, low baseline glucose, low body weight, female sex',
    ],
    monitoring: 'Fingerstick glucose every 1 hour for 4-6 hours after administration. If glucose <70 mg/dL, give additional dextrose preemptively. Recheck potassium at 1-2 hours.',
    notes: 'D10W infusion (500 mL over 4 hours) is preferred over D50W bolus — causes less rebound hypoglycemia and less venous irritation. Effect onset: 15-30 minutes. Expected K+ reduction: 0.5-1.2 mEq/L. Duration: ~4 hours — plan definitive elimination therapy.',
    citations: [
        'Moussavi K, et al. Management of Hyperkalemia With Insulin and Glucose. J Emerg Med. 2019;57(1):36-42.',
        'Harel Z, Kamel KS. Optimal Dose of Intravenous Insulin for Hyperkalemia. PLoS One. 2016;11(5):e0154963.',
        'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
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
        {
            indication: 'Atrial fibrillation (stroke prevention)',
            regimen: '20 mg daily with food (CrCl >50 mL/min). 15 mg daily with food (CrCl 15-50 mL/min). Avoid if CrCl <15 mL/min.',
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
const SODIUM_ZIRCONIUM_CYCLOSILICATE = {
    id: 'sodium-zirconium-cyclosilicate',
    name: 'Lokelma (Sodium Zirconium Cyclosilicate)',
    genericName: 'Sodium zirconium cyclosilicate',
    drugClass: 'Potassium binder',
    route: 'PO',
    indications: ['Hyperkalemia (adjunct — potassium elimination)'],
    dosing: [
        {
            indication: 'Acute hyperkalemia',
            regimen: '10 grams PO every 8 hours for up to 48-72 hours.',
        },
        {
            indication: 'Maintenance',
            regimen: '10 grams PO daily (range 5-15 grams daily). For chronic HD patients: 5 grams daily on non-dialysis days.',
        },
    ],
    contraindications: [
        'NPO patients (oral only)',
        'Severe constipation, bowel obstruction, impaction',
        'Abnormal post-operative bowel motility',
    ],
    cautions: [
        'Only MILDLY effective (~0.2 mM reduction at 4h, ~0.4 mM at 24h)',
        'Do NOT rely on as sole treatment for severe hyperkalemia',
        'Do NOT delay dialysis while waiting for SZC to work',
        'Each 5g dose contains 400 mg sodium (18 mEq) — 10g q8h = ~677 mL NS equivalent sodium/day',
        'May alter GI absorption of pH-dependent drugs (separate by 2 hours): increased absorption of weak acids (furosemide, atorvastatin), decreased exposure to weak bases (dabigatran, tacrolimus, clopidogrel)',
    ],
    monitoring: 'Serum potassium, signs of volume overload/edema, GI symptoms.',
    notes: 'Next-generation potassium binder (replaces Kayexalate which is antiquated and dangerous). May help avoid or delay dialysis in borderline cases. For anuric patients with severe hyperkalemia, SZC alone will inevitably fail. Patiromer is an alternative but even less effective for acute management (~0.23 mM at 7 hours).',
    citations: [
        'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
        'Long B, et al. Controversies in Management of Hyperkalemia. J Emerg Med. 2018;55(2):192-205.',
    ],
};
const TDF_FTC = {
    id: 'tdf-ftc',
    name: 'Tenofovir/Emtricitabine (Truvada)',
    genericName: 'Tenofovir disoproxil fumarate / Emtricitabine',
    drugClass: 'Dual NRTI combination (backbone)',
    route: 'PO',
    indications: ['HIV post-exposure prophylaxis (PEP backbone)', 'HIV pre-exposure prophylaxis (PrEP)', 'HIV treatment (ART backbone)'],
    dosing: [
        {
            indication: 'HIV PEP (backbone)',
            regimen: '1 tablet (300/200 mg) PO once daily x 28 days. Combine with dolutegravir 50 mg daily or darunavir/ritonavir. Take with or without food.',
        },
    ],
    contraindications: [
        'CrCl <60 mL/min for TDF-based formulations (nephrotoxic)',
    ],
    cautions: [
        'Renal toxicity (TDF) \u2014 monitor creatinine at baseline and 2 weeks; avoid if CrCl <60',
        'Bone mineral density decrease \u2014 TDF associated with bone loss (TAF-based alternatives preferred if risk factors)',
        'Lactic acidosis / hepatomegaly with steatosis \u2014 rare NRTI class effect',
        'HBV co-infection \u2014 severe hepatitis flare may occur upon discontinuation (both FTC and TDF active against HBV)',
    ],
    monitoring: 'Renal function at baseline and 2 weeks. HIV testing at baseline, 4\u20136 weeks, and 3 months. HBV serology at baseline.',
    notes: 'Preferred dual-NRTI backbone for PEP when used with a 3rd agent (dolutegravir or darunavir/r). Also used for PrEP. TAF-based alternatives (e.g., Biktarvy, Descovy) have less renal/bone toxicity.',
    citations: [
        'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV. MMWR. 2025;74(1):1-56.',
        'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV. JAMA. 2023;329(1):63-84.',
    ],
};
const TERBUTALINE = {
    id: 'terbutaline',
    name: 'Terbutaline',
    genericName: 'Terbutaline sulfate',
    drugClass: 'Beta-2 adrenergic agonist',
    route: 'SQ',
    indications: ['Hyperkalemia (potassium shift)', 'Acute asthma/bronchospasm', 'Tocolysis (uterine relaxation)'],
    dosing: [
        {
            indication: 'Hyperkalemia',
            regimen: '0.5 mg SQ (or 7 mcg/kg SQ). Onset: 5 minutes. Peak effect: 30-60 minutes. Duration: 3-6 hours.',
        },
        {
            indication: 'Asthma',
            regimen: '0.25 mg SQ, may repeat q15-30 min PRN, max 0.5 mg in 4 hours.',
        },
        {
            indication: 'Tocolysis (Shoulder Dystocia / Zavanelli)',
            regimen: '0.25 mg SQ or IM × 1 dose. Provides rapid uterine relaxation to facilitate cephalic replacement (Zavanelli maneuver) prior to emergency cesarean section. Onset: 5 minutes SQ.',
        },
    ],
    contraindications: [
        'Baseline tachycardia (relative)',
        'Risk of tachyarrhythmia (relative)',
        'Active myocardial infarction (relative)',
        'History of seizures (rare, relative)',
        'Brittle diabetes (relative)',
    ],
    cautions: [
        'Beta-2 metabolic effects: hyperglycemia, hypokalemia, hyperlactatemia',
        'Some beta-1 activity (~10:1 beta-2:beta-1 ratio)',
        'MAO inhibitors/TCAs increase hypertension risk',
    ],
    monitoring: 'Heart rate, blood pressure, serum potassium, glucose.',
    notes: 'Terbutaline is logistically superior to nebulized albuterol for hyperkalemia — single SQ injection vs. 4-8 back-to-back nebulizers. Similar potassium-lowering efficacy. Bioavailability: 100% SQ. Peak plasma concentration: ~30 min. ~90% renally eliminated, ~60% unchanged drug. Expected K+ reduction: ~0.5-1 mEq/L.',
    citations: [
        'Sowinski KM, et al. Subcutaneous terbutaline use in CKD to reduce potassium concentrations. Am J Kidney Dis. 2005;45(6):1040-5.',
        'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
    ],
};
const TENECTEPLASE = {
    id: 'tenecteplase',
    name: 'Tenecteplase (TNKase)',
    genericName: 'Tenecteplase',
    drugClass: 'Thrombolytic (tissue plasminogen activator)',
    route: 'IV',
    indications: ['Acute ischemic stroke (0\u20134.5h)', 'Acute STEMI'],
    dosing: [
        {
            indication: 'Acute ischemic stroke',
            regimen: '0.25 mg/kg IV bolus (max 25 mg) given over 5 seconds. Single dose \u2014 no infusion required. BP must be <185/110 before administration and <180/105 for 24h after.',
            weightCalc: { dosePerKg: 0.25, unit: 'mg', maxDose: 25 },
        },
    ],
    contraindications: [
        'Active internal bleeding or ICH',
        'History of hemorrhagic stroke or stroke of unknown origin',
        'Ischemic stroke within 3 months',
        'Intracranial neoplasm, AVM, or aneurysm',
        'Known bleeding diathesis',
        'Severe uncontrolled hypertension (>185/110 despite treatment)',
        'See full contraindications list in [Thrombolysis Contraindications](#/info/stroke-contraindications)',
    ],
    cautions: [
        'No antithrombotics \u00D7 24h post-administration',
        'Repeat NCCT at 24h before starting antiplatelets/anticoagulants',
        'Angioedema risk \u2014 higher in patients on ACE inhibitors',
        'Fibrinogen depletion less than alteplase (more fibrin-specific)',
    ],
    monitoring: 'Neuro checks every 15 min \u00D7 2h, then every 30 min \u00D7 6h, then hourly \u00D7 16h. BP every 15 min \u00D7 2h, then every 30 min \u00D7 6h. Any neurological decline \u2192 emergent NCCT.',
    notes: 'Single IV bolus (vs 60-min alteplase infusion) \u2014 significantly simpler administration. AcT trial (2024): tenecteplase 0.25 mg/kg was noninferior to alteplase for functional outcome at 90 days with similar safety profile. Preferred thrombolytic per 2026 AHA/ASA guidelines due to ease of administration and equivalent efficacy.',
    citations: [
        'Mendelson SJ, Prabhakaran S. Diagnosis and Management of Transient Ischemic Attack and Acute Ischemic Stroke: A Review. JAMA. 2021;325(11):1088-1098.',
        'Bhatt DL, et al. Tenecteplase vs Alteplase for Acute Ischemic Stroke (AcT). Lancet. 2024.',
        'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.',
    ],
};
const TICAGRELOR = {
    id: 'ticagrelor',
    name: 'Ticagrelor (Brilinta)',
    genericName: 'Ticagrelor',
    drugClass: 'Antiplatelet (reversible P2Y12 antagonist)',
    route: 'PO',
    indications: ['Minor ischemic stroke (alternative DAPT)', 'High-risk TIA', 'Acute coronary syndrome'],
    dosing: [
        {
            indication: 'Minor stroke / high-risk TIA (alternative DAPT)',
            regimen: '180 mg loading dose on day 1 + aspirin 325 mg. Then 90 mg BID + aspirin 81 mg \u00D7 30 days total. Alternative to aspirin + clopidogrel when CYP2C19 poor metabolizer status is known or suspected.',
        },
        {
            indication: 'ACS / NSTEMI (preferred P2Y12)',
            regimen: '180 mg loading dose, then 90 mg BID \u00D7 12 months. Aspirin 81 mg daily (do NOT exceed 100 mg/day \u2014 higher doses reduce ticagrelor efficacy). Preferred first-line P2Y12 per PLATO trial. After 12 months: may reduce to 60 mg BID for extended therapy (PEGASUS-TIMI 54).',
        },
    ],
    contraindications: [
        'Active pathological bleeding',
        'History of intracranial hemorrhage',
        'Severe hepatic impairment (Child-Pugh C)',
    ],
    cautions: [
        'Dyspnea \u2014 occurs in ~14% of patients; usually mild, self-limited, not related to bronchospasm',
        'Bradycardia \u2014 ventricular pauses reported; use cautiously with sick sinus syndrome or AV block',
        'Do not exceed aspirin 100 mg/day with ticagrelor (higher aspirin doses reduce ticagrelor efficacy)',
        'Reversible antiplatelet effect \u2014 offset ~5 days (vs 7\u201310 days for clopidogrel)',
        'CYP3A4 interactions \u2014 avoid strong inhibitors (ketoconazole) and strong inducers (rifampin)',
    ],
    monitoring: 'No routine monitoring required. Monitor for bleeding and dyspnea.',
    notes: 'THALES trial: ticagrelor + aspirin \u00D7 30 days reduced 30-day stroke/death from 6.6% to 5.5% (NNT 91) in mild-to-moderate stroke. Not dependent on CYP2C19 metabolism (advantage over clopidogrel in poor metabolizers). Higher cost and twice-daily dosing compared to clopidogrel.',
    citations: [
        'Johnston SC, et al. Ticagrelor and Aspirin or Aspirin Alone in Acute Ischemic Stroke or TIA (THALES). N Engl J Med. 2020;383(3):207-217.',
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
        {
            indication: 'ACS / NSTEMI',
            regimen: 'Bolus: 60 units/kg IV (max 4,000 units). Infusion: 12 units/kg/hr (max 1,000 units/hr). Target aPTT: 50-70 seconds (1.5-2.0× control). Lower doses than PE due to concurrent dual antiplatelet therapy. Adjust per institutional nomogram.',
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
const VANCOMYCIN = {
    id: 'vancomycin',
    name: 'Vancomycin',
    genericName: 'Vancomycin hydrochloride',
    drugClass: 'Glycopeptide',
    route: 'IV',
    indications: ['Meningitis (>28 days, added to Ceftriaxone for MRSA/resistant organism coverage)'],
    dosing: [
        {
            indication: 'Meningitic',
            regimen: '15 mg/kg IV q6h.',
        },
        {
            indication: 'Non-meningitic',
            regimen: '15 mg/kg IV q8h.',
        },
    ],
    contraindications: [
        'Known hypersensitivity to vancomycin',
    ],
    cautions: [
        'Red Man Syndrome — infuse over at least 1 hour',
        'Nephrotoxicity — especially with concurrent aminoglycosides',
        'Ototoxicity with prolonged use',
    ],
    monitoring: 'Obtain trough before 4th dose (goal trough 15-20 mcg/mL for meningitis). Renal function (BUN, creatinine). Drug levels needed if >2 doses anticipated.',
    notes: 'Added to Ceftriaxone for meningitis in infants >28 days to cover MRSA and resistant GBS/pneumococcus. Not needed in the 0-28 day empiric sepsis regimen (Ampicillin + Gentamicin or Ampicillin + Ceftriaxone provides adequate coverage).',
    citations: [
        'Tunkel AR, et al. Practice Guidelines for the Management of Bacterial Meningitis. Clin Infect Dis. 2004;39(9):1267-1284.',
        'Red Book: 2021-2024 Report of the Committee on Infectious Diseases. American Academy of Pediatrics.',
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
    ACETAZOLAMIDE,
    ACYCLOVIR,
    ALBUTEROL_NEB,
    ALTEPLASE,
    AMIODARONE,
    AMOXICILLIN_CLAVULANATE,
    AMPICILLIN,
    APIXABAN,
    ASPIRIN,
    ATORVASTATIN,
    BENZATHINE_PENICILLIN,
    BIKTARVY,
    BIVALIRUDIN,
    BUDESONIDE_NEB,
    BUMETANIDE,
    CALCIUM_CHLORIDE,
    CALCIUM_GLUCONATE,
    CEFAZOLIN,
    CEFEPIME,
    CEFTRIAXONE,
    CEPHALEXIN,
    CHLOROTHIAZIDE,
    CIPROFLOXACIN,
    CLEVIDIPINE,
    CLOPIDOGREL,
    DABIGATRAN,
    DARUNAVIR,
    DEXAMETHASONE,
    DIGOXIN,
    DILTIAZEM,
    DOLUTEGRAVIR,
    DOXYCYCLINE,
    EDOXABAN,
    ENOXAPARIN,
    EPINEPHRINE,
    ESMOLOL,
    FLUDROCORTISONE,
    FONDAPARINUX,
    FUROSEMIDE,
    GENTAMICIN,
    LABETALOL,
    LIDOCAINE,
    SODIUM_ZIRCONIUM_CYCLOSILICATE,
    MAGNESIUM_SULFATE,
    METOLAZONE,
    METOPROLOL,
    NICARDIPINE,
    NITROGLYCERIN,
    OXYTOCIN,
    PENICILLIN_G_IV,
    PHENYLEPHRINE,
    POTASSIUM_CHLORIDE_IV,
    POTASSIUM_CHLORIDE_ORAL,
    PRASUGREL,
    PREDNISOLONE,
    PROCAINAMIDE,
    PROCAINE_PENICILLIN,
    RACEMIC_EPINEPHRINE,
    REGULAR_INSULIN,
    RITONAVIR,
    RIVAROXABAN,
    TENECTEPLASE,
    TDF_FTC,
    TERBUTALINE,
    TICAGRELOR,
    UFH,
    VANCOMYCIN,
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
    [/acetazolamide|diamox/i, 'acetazolamide'],
    [/acyclovir|zovirax/i, 'acyclovir'],
    [/albuterol|proventil|ventolin/i, 'albuterol-neb'],
    [/alteplase|tPA/i, 'alteplase'],
    [/amiodarone|cordarone/i, 'amiodarone'],
    [/amoxicillin.clavulanate|augmentin|amox.clav/i, 'amoxicillin-clavulanate'],
    [/ampicillin/i, 'ampicillin'],
    [/apixaban/i, 'apixaban'],
    [/aspirin|ASA|acetylsalicylic/i, 'aspirin'],
    [/atorvastatin|lipitor/i, 'atorvastatin'],
    [/biktarvy|BIC\/FTC\/TAF/i, 'biktarvy'],
    [/bivalirudin|angiomax/i, 'bivalirudin'],
    [/budesonide|pulmicort/i, 'budesonide-neb'],
    [/bumetanide|bumex/i, 'bumetanide'],
    [/benzathine.*penicillin/i, 'benzathine-penicillin'],
    [/calcium\s*chloride/i, 'calcium-chloride'],
    [/calcium\s*gluconate/i, 'calcium-gluconate'],
    [/cefazolin|ancef/i, 'cefazolin'],
    [/cefepime|maxipime/i, 'cefepime'],
    [/ceftriaxone/i, 'ceftriaxone'],
    [/cephalexin|keflex/i, 'cephalexin'],
    [/chlorothiazide|diuril/i, 'chlorothiazide'],
    [/ciprofloxacin|cipro/i, 'ciprofloxacin'],
    [/clevidipine|cleviprex/i, 'clevidipine'],
    [/clopidogrel|plavix/i, 'clopidogrel'],
    [/dabigatran/i, 'dabigatran'],
    [/darunavir|prezista/i, 'darunavir'],
    [/dexamethasone|decadron/i, 'dexamethasone'],
    [/digoxin|digitalis|lanoxin/i, 'digoxin'],
    [/diltiazem|cardizem/i, 'diltiazem'],
    [/dolutegravir|tivicay/i, 'dolutegravir'],
    [/doxycycline/i, 'doxycycline'],
    [/edoxaban/i, 'edoxaban'],
    [/enoxaparin|LMWH|low.molecular/i, 'enoxaparin'],
    [/epinephrine|adrenaline/i, 'epinephrine'],
    [/esmolol|brevibloc/i, 'esmolol'],
    [/fludrocortisone|florinef/i, 'fludrocortisone'],
    [/fondaparinux|arixtra/i, 'fondaparinux'],
    [/furosemide|lasix/i, 'furosemide'],
    [/gentamicin|garamycin/i, 'gentamicin'],
    [/labetalol/i, 'labetalol'],
    [/lidocaine/i, 'lidocaine'],
    [/lokelma|sodium\s*zirconium|szc/i, 'sodium-zirconium-cyclosilicate'],
    [/magnesium sulfate|mag sulfate|MgSO4/i, 'magnesium-sulfate'],
    [/metolazone|zaroxolyn/i, 'metolazone'],
    [/metoprolol|lopressor|toprol/i, 'metoprolol'],
    [/nicardipine|cardene/i, 'nicardipine'],
    [/nitroglycerin|nitro|glyceryl trinitrate|NTG/i, 'nitroglycerin'],
    [/oxytocin|pitocin/i, 'oxytocin'],
    [/aqueous.*penicillin|penicillin G.*IV|crystalline.*penicillin/i, 'penicillin-g-iv'],
    [/phenylephrine/i, 'phenylephrine'],
    [/kcl\s*iv|potassium\s*chloride.*iv|iv\s*potassium/i, 'potassium-chloride-iv'],
    [/kcl\s*oral|potassium\s*chloride.*oral|oral\s*potassium|k-dur|klor-con/i, 'potassium-chloride-oral'],
    [/procainamide|pronestyl/i, 'procainamide'],
    [/procaine.*penicillin/i, 'procaine-penicillin'],
    [/prasugrel|effient/i, 'prasugrel'],
    [/prednisolone|prelone|orapred/i, 'prednisolone'],
    [/racemic.*epinephrine|neb.*epinephrine|vaponefrin/i, 'racemic-epinephrine'],
    [/regular\s*insulin|insulin\s*regular|humulin/i, 'regular-insulin'],
    [/ritonavir|norvir/i, 'ritonavir'],
    [/rivaroxaban/i, 'rivaroxaban'],
    [/tenecteplase|TNKase/i, 'tenecteplase'],
    [/tenofovir.*emtricitabine|truvada|TDF\/FTC/i, 'tdf-ftc'],
    [/terbutaline|brethine/i, 'terbutaline'],
    [/ticagrelor|brilinta/i, 'ticagrelor'],
    [/unfractionated heparin|^UFH$|heparin sodium/i, 'ufh'],
    [/vancomycin|vancocin/i, 'vancomycin'],
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
