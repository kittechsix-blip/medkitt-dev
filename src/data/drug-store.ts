// MedKitt — Drug Reference Store
// Centralized drug data for all medications used across decision trees.
// Each entry includes class, indications, dosing, contraindications, and citations.

export interface DrugDose {
  indication: string;
  regimen: string;
}

export interface DrugEntry {
  id: string;
  name: string;
  genericName: string;
  drugClass: string;
  route: string;
  indications: string[];
  dosing: DrugDose[];
  contraindications?: string[];
  cautions?: string[];
  monitoring?: string;
  notes?: string;
  citations: string[];
}

// -------------------------------------------------------------------
// Drug Definitions (Alphabetical)
// -------------------------------------------------------------------

const ALTEPLASE: DrugEntry = {
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

const APIXABAN: DrugEntry = {
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

const BENZATHINE_PENICILLIN: DrugEntry = {
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

const CEFTRIAXONE: DrugEntry = {
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

const DABIGATRAN: DrugEntry = {
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

const DOXYCYCLINE: DrugEntry = {
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

const EDOXABAN: DrugEntry = {
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

const ENOXAPARIN: DrugEntry = {
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

const PENICILLIN_G_IV: DrugEntry = {
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

const PROCAINE_PENICILLIN: DrugEntry = {
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

const RIVAROXABAN: DrugEntry = {
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

const UFH: DrugEntry = {
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

// -------------------------------------------------------------------
// Drug Registry (Alphabetical by name)
// -------------------------------------------------------------------

export const ALL_DRUGS: DrugEntry[] = [
  ALTEPLASE,
  APIXABAN,
  BENZATHINE_PENICILLIN,
  CEFTRIAXONE,
  DABIGATRAN,
  DOXYCYCLINE,
  EDOXABAN,
  ENOXAPARIN,
  PENICILLIN_G_IV,
  PROCAINE_PENICILLIN,
  RIVAROXABAN,
  UFH,
];

const DRUG_MAP: Record<string, DrugEntry> = {};
for (const drug of ALL_DRUGS) {
  DRUG_MAP[drug.id] = drug;
}

/** Get a drug by ID */
export function getDrug(id: string): DrugEntry | undefined {
  return DRUG_MAP[id];
}

/** Get all drugs (already sorted alphabetically) */
export function getAllDrugs(): DrugEntry[] {
  return ALL_DRUGS;
}

/** Lookup table: maps common drug name fragments to drug store IDs */
const NAME_TO_ID: [RegExp, string][] = [
  [/alteplase|tPA/i, 'alteplase'],
  [/apixaban/i, 'apixaban'],
  [/benzathine.*penicillin/i, 'benzathine-penicillin'],
  [/ceftriaxone/i, 'ceftriaxone'],
  [/dabigatran/i, 'dabigatran'],
  [/doxycycline/i, 'doxycycline'],
  [/edoxaban/i, 'edoxaban'],
  [/enoxaparin|LMWH|low.molecular/i, 'enoxaparin'],
  [/aqueous.*penicillin|penicillin G.*IV|crystalline.*penicillin/i, 'penicillin-g-iv'],
  [/procaine.*penicillin/i, 'procaine-penicillin'],
  [/rivaroxaban/i, 'rivaroxaban'],
  [/unfractionated heparin|^UFH$|heparin sodium/i, 'ufh'],
];

/** Try to find a drug store ID from a drug name string. Returns undefined if no match. */
export function findDrugIdByName(name: string): string | undefined {
  for (const [pattern, id] of NAME_TO_ID) {
    if (pattern.test(name)) return id;
  }
  return undefined;
}
