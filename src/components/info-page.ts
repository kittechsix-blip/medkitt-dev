// MedKitt — Clinical Info Modals
// Slide-up modal overlays for detailed clinical reference content.
// Triggered from inline links in decision tree body text.
// User stays in tree context — close modal to continue.

// -------------------------------------------------------------------
// Info Page Definitions
// -------------------------------------------------------------------

interface InfoCitation {
  num: number;
  text: string;
}

interface DrugDosing {
  drug: string;
  regimen: string;
}

interface InfoPage {
  id: string;
  title: string;
  subtitle: string;
  sections: InfoSection[];
  citations: InfoCitation[];
  /** If true, show a Share button that uses Web Share API to text/email the content */
  shareable?: boolean;
}

interface PictographGroup {
  count: number;
  color: string;
  label: string;
  symbol?: string;
}

interface Pictograph {
  title: string;
  groups: PictographGroup[];
}

interface InfoSection {
  heading?: string;
  body: string;
  drugTable?: DrugDosing[];
  pictographs?: Pictograph[];
}

// -------------------------------------------------------------------
// DOAC for PE
// -------------------------------------------------------------------

const DOAC_PE_PAGE: InfoPage = {
  id: 'doac-pe',
  title: 'Oral Anticoagulation for PE',
  subtitle: 'Direct Oral Anticoagulants (DOACs)',
  sections: [
    {
      body: 'Direct oral anticoagulants (DOACs)\u2014specifically apixaban, rivaroxaban, edoxaban, and dabigatran\u2014are the preferred oral anticoagulants for low-risk pulmonary embolism due to their noninferior efficacy compared to warfarin, lower major bleeding risk, and simplified administration without need for monitoring. [1\u20134]',
    },
    {
      heading: 'Advantages Over Warfarin',
      body: 'Meta-analyses demonstrate that DOACs are associated with a 39% relative reduction in major bleeding compared to vitamin K antagonists while maintaining similar efficacy for preventing recurrent VTE. [3]\n\nIn low-risk PE patients specifically, DOACs showed absolute differences in symptomatic VTE recurrence ranging from \u22120.4% to 0.3% compared to conventional therapy, with reduced bleeding risk (absolute risk difference \u22120.6%). [2]',
    },
    {
      heading: 'Dosing Regimens',
      body: '',
      drugTable: [
        {
          drug: 'Apixaban',
          regimen: '10 mg twice daily \u00D7 7 days, then 5 mg twice daily \u00D7 3\u20136 months. Extended therapy: 5 mg or 2.5 mg twice daily. [4]',
        },
        {
          drug: 'Rivaroxaban',
          regimen: '15 mg twice daily \u00D7 21 days, then 20 mg once daily \u00D7 3\u20136 months. Extended therapy: 20 mg or 10 mg once daily. [4]',
        },
        {
          drug: 'Edoxaban',
          regimen: 'Requires 5\u201310 days parenteral anticoagulation (LMWH) first, then 60 mg once daily (30 mg if CrCl 15\u201350 mL/min, weight <60 kg, or on P-glycoprotein inhibitors). [4]',
        },
        {
          drug: 'Dabigatran',
          regimen: 'Requires 5\u201310 days parenteral anticoagulation first, then 150 mg twice daily. [4]',
        },
      ],
    },
    {
      heading: 'Clinical Considerations',
      body: 'Apixaban and rivaroxaban offer the advantage of single-drug oral therapy without requiring initial heparin, making them particularly convenient for outpatient management of low-risk PE. [3][5]\n\nThe choice among DOACs is guided by pharmacologic properties, patient characteristics (particularly renal function), concomitant medications, and patient preference for once versus twice-daily dosing. [3\u20134]',
    },
  ],
  citations: [
    { num: 1, text: 'Tritschler T, Kraaijpoel N, Le Gal G, Wells PS. Venous Thromboembolism: Advances in Diagnosis and Treatment. JAMA. 2018.' },
    { num: 2, text: 'Freund Y, Cohen-Aubart F, Bloom B. Acute Pulmonary Embolism: A Review. JAMA. 2022.' },
    { num: 3, text: 'Di Nisio M, van Es N, B\u00FCller HR. Deep Vein Thrombosis and Pulmonary Embolism. Lancet. 2016.' },
    { num: 4, text: 'Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.' },
    { num: 5, text: 'Renner E, Barnes GD. Antithrombotic Management of Venous Thromboembolism: JACC Focus Seminar. J Am Coll Cardiol. 2020.' },
  ],
};

// -------------------------------------------------------------------
// Priapism Return Precautions
// -------------------------------------------------------------------

const PRIAPISM_RETURN_PRECAUTIONS: InfoPage = {
  id: 'priapism-return-precautions',
  title: 'Return Precautions',
  subtitle: 'Patient Discharge Instructions \u2014 Priapism',
  shareable: true,
  sections: [
    {
      body: 'You were treated today for priapism (a prolonged erection). Please return to the emergency department immediately if you experience any of the following:',
    },
    {
      heading: 'Return Immediately If:',
      body: '\u2022 Your erection returns and lasts more than 4 hours\n\u2022 You develop severe pain in your penis\n\u2022 You notice increasing swelling, redness, or warmth of the penis\n\u2022 You develop fever (temperature over 100.4\u00B0F or 38\u00B0C)\n\u2022 You have difficulty urinating or cannot urinate\n\u2022 You notice any discharge from the penis',
    },
    {
      heading: 'Important Information',
      body: '\u2022 Even after successful treatment, priapism can recur. This is especially true if you have sickle cell disease or take certain medications.\n\u2022 Time is critical \u2014 if an erection lasts more than 4 hours, seek emergency care right away. Delays in treatment can lead to permanent erectile dysfunction.\n\u2022 Continue taking any medications prescribed by your doctor as directed.\n\u2022 Follow up with urology as instructed.',
    },
    {
      heading: 'Questions?',
      body: 'If you have concerns about your recovery or symptoms that are not emergencies, contact your primary care doctor or the urology clinic during business hours.',
    },
  ],
  citations: [
    { num: 1, text: 'Bivalacqua TJ, Allen BK, Brock G, et al. Acute Ischemic Priapism: An AUA/SMSNA Guideline. J Urol. 2021;206(5):1114-1121.' },
    { num: 2, text: 'Salonia A, Eardley I, Giuliano F, et al. European Association of Urology Guidelines on Priapism. Eur Urol. 2014;65(2):480-9.' },
  ],
};

// -------------------------------------------------------------------
// Synchronized Cardioversion for A-Fib
// -------------------------------------------------------------------

const CARDIOVERSION_AFIB_PAGE: InfoPage = {
  id: 'cardioversion-afib',
  title: 'Synchronized Cardioversion',
  subtitle: 'Procedure for Atrial Fibrillation / Flutter',
  sections: [
    {
      body: 'Synchronized cardioversion is the definitive treatment for hemodynamically unstable A-Fib/Flutter and for WPW with atrial fibrillation. Success depends on energy selection, pad placement, synchronization, and pre/post-treatment with antiarrhythmics.',
    },
    {
      heading: '1. Preparation',
      body: '\u2022 Confirm synchronization is enabled on the defibrillator\n\u2022 Apply pads: anterior/lateral placement preferred (EPIC trial found superior to anterior/posterior) [1]\n\u2022 Hyperinflation may impair conduction \u2014 cardiovert at end-expiration if possible\n\u2022 If ventilated and cardioversion failing, briefly disconnect to promote chest deflation (if oxygenation allows)',
    },
    {
      heading: '2. Sedation (Non-Intubated Patients)',
      body: '\u2022 Midazolam 3\u20135 mg IV bolus, then 2 mg IV q2min PRN to adequate sedation\n\u2022 Target: eyes closed, no response to gentle stimuli, sluggish response to loud commands\n\u2022 Alternative: MidaKet for patients resistant to midazolam\n\u2022 Flumazenil 0.5\u20131 mg IV available for reversal if adverse effects (hypoxemia, excessive somnolence, laryngospasm)',
    },
    {
      heading: '3. Energy & Synchronization',
      body: '\u2022 Use 200J biphasic (maximal energy available) [2]\n\u2022 Rationale: No evidence that a single high-energy shock is more dangerous than low-energy. Higher initial energy reduces need for repeat cardioversion \u2014 critical in non-intubated patients where sedation may wear off.\n\u2022 Ensure shock delivery is synchronized to the QRS complex\n\u2022 If initial attempt unsuccessful, escalate energy and reconfirm pad contact',
    },
    {
      heading: '4. Post-Cardioversion',
      body: '\u2022 Amiodarone 150 mg IV over 10 min, then 1 mg/min infusion to maintain sinus rhythm\n\u2022 IV Magnesium Sulfate 2\u20134 g to augment cardioversion success\n\u2022 Continue amiodarone until critical illness significantly improved \u2014 stopping early risks reversion to A-Fib (42% reversion rate in one study) [3]\n\u2022 Monitor for post-cardioversion bradycardia (especially if baseline HR was <100)',
    },
    {
      heading: 'Special Considerations',
      body: '\u2022 WPW + A-Fib: Cardioversion is first-line. Do NOT use AV nodal blockers (beta-blockers, CCBs, digoxin, IV amiodarone) [1][2]\n\u2022 Critically ill patients: Standalone DC cardioversion often fails \u2014 patients frequently revert to A-Fib. Pre/post-treatment with amiodarone + magnesium improves sustained conversion [3]\n\u2022 Anticoagulation: If AF duration >48 hours and not anticoagulated, consider TEE to exclude atrial thrombus before elective cardioversion',
    },
  ],
  citations: [
    { num: 1, text: 'Wigginton JG, et al. Part 9: Adult Advanced Life Support: 2025 AHA Guidelines for CPR and ECC. Circulation. 2025;152(16_suppl_2):S538-S577.' },
    { num: 2, text: 'Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(16_suppl_2):S366-S468.' },
    { num: 3, text: 'Bosch NA, Cimini J, Walkey AJ. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434.' },
  ],
};

// -------------------------------------------------------------------
// A-Fib RVR Discharge Instructions
// -------------------------------------------------------------------

const AFIB_DISCHARGE_PAGE: InfoPage = {
  id: 'afib-discharge',
  title: 'Discharge Instructions',
  shareable: true,
  subtitle: 'Atrial Fibrillation with Rapid Ventricular Response',
  sections: [
    {
      heading: 'Return to the ED Immediately If You Experience',
      body: '**Serious Warning Signs:**\n\u2022 Chest pain or pressure\n\u2022 Severe shortness of breath or difficulty breathing\n\u2022 Fainting or loss of consciousness\n\u2022 Severe dizziness or lightheadedness\n\u2022 Confusion or difficulty speaking\n\u2022 Weakness or numbness on one side of your body (signs of stroke)\n\u2022 Heart rate that feels extremely fast or irregular and does not improve with rest\n\u2022 Coughing up blood\n\u2022 Severe bleeding (especially if you are taking blood thinners)\n\n**Other Concerning Symptoms:**\n\u2022 Palpitations (racing or fluttering heartbeat) that are much worse than usual or do not go away\n\u2022 Swelling in your legs, ankles, or abdomen that is new or worsening\n\u2022 Persistent nausea or vomiting\n\u2022 Inability to take your prescribed medications',
    },
    {
      heading: 'What to Do at Home',
      body: '**Take Your Medications:**\n\u2022 Take all medications exactly as prescribed, including rate control medications (beta-blockers or calcium channel blockers), blood thinners (anticoagulants) if prescribed, and any other heart medications\n\u2022 Do not stop or change your medications without talking to your doctor first\n\u2022 Set reminders to help you remember to take your medications on time\n\n**Monitor Your Symptoms:**\n\u2022 Check your pulse regularly as instructed by your doctor\n\u2022 Rest and stay calm if you feel your heart racing\n\u2022 Keep a log of any symptoms you experience, including when they occur and how long they last\n\n**Lifestyle Modifications:**\n\u2022 Limit or avoid alcohol \u2014 it can trigger atrial fibrillation episodes\n\u2022 Avoid caffeine if it worsens your symptoms\n\u2022 Get adequate sleep and manage stress\n\u2022 Maintain a healthy weight\n\u2022 Stay hydrated but follow any fluid restrictions your doctor has given you',
    },
    {
      heading: 'Follow-Up Care',
      body: '**Appointments:**\n\u2022 Schedule follow-up with your primary care doctor or cardiologist within 1\u20132 weeks (or as directed)\n\u2022 Keep all scheduled appointments, even if you are feeling better\n\u2022 Bring a list of your current medications and any questions\n\n**Blood Work:**\n\u2022 If you are taking blood thinners, you may need regular blood tests to monitor their effectiveness\n\u2022 Follow your doctor\u2019s instructions about when to have these tests done\n\n**Questions to Ask Your Doctor:**\n\u2022 What is my target heart rate?\n\u2022 How often should I check my pulse?\n\u2022 What activities are safe for me?\n\u2022 Do I need to make any changes to my diet?\n\u2022 When can I return to work or normal activities?',
    },
    {
      heading: 'Important Reminders',
      body: '\u2022 Atrial fibrillation increases your risk of stroke \u2014 this is why blood thinners may be prescribed\n\u2022 Even if you feel better, continue taking all medications as prescribed\n\u2022 Call your doctor\u2019s office if you have questions or concerns that are not emergencies\n\u2022 Wear a medical alert bracelet if you are taking blood thinners',
    },
  ],
  citations: [
    { num: 1, text: 'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. J Am Coll Cardiol. 2024;83(1):109-279.' },
  ],
};

// -------------------------------------------------------------------
// PEP Patient Information Sheet
// -------------------------------------------------------------------

const PEP_PATIENT_INFO: InfoPage = {
  id: 'pep-patient-info',
  title: 'PEP: What You Need to Know',
  subtitle: 'Patient Information \u2014 Post-Exposure Prophylaxis for HIV',
  sections: [
    {
      heading: 'What Is PEP?',
      body: 'PEP stands for post-exposure prophylaxis. It is a 28-day course of HIV medications taken after a possible exposure to HIV. PEP can prevent HIV infection if started within 72 hours of exposure. The sooner you start, the better it works.',
    },
    {
      heading: 'How Likely Is HIV Transmission?',
      body: 'The risk of getting HIV from a single exposure varies by type:\n\n\u2022 Receptive anal intercourse: ~1.4% per exposure (highest sexual risk)\n\u2022 Receptive vaginal intercourse: ~0.08% per exposure\n\u2022 Insertive anal or vaginal intercourse: ~0.04\u20130.11% per exposure\n\u2022 Needlestick injury: ~0.23% per exposure\n\u2022 Mucous membrane splash: ~0.09% per exposure\n\u2022 Sharing injection drug needles: ~0.63% per exposure\n\nRisk is higher if the source person has a high viral load (not on treatment) and lower if the source person is on HIV treatment with an undetectable viral load.',
    },
    {
      heading: 'How Well Does PEP Work?',
      body: 'PEP is highly effective when taken correctly:\n\n\u2022 Reduces HIV risk by approximately 80% or more\n\u2022 Most effective when started within hours of exposure \u2014 ideally within 2 hours\n\u2022 Must be taken every day for the full 28 days to work\n\u2022 Missing doses or stopping early significantly reduces effectiveness\n\u2022 PEP does not protect against other sexually transmitted infections',
    },
    {
      heading: 'Common Side Effects',
      body: 'Most people tolerate PEP well. Side effects are usually mild and improve over the first 1\u20132 weeks:\n\n\u2022 Nausea (most common \u2014 take with food to help)\n\u2022 Fatigue or tiredness\n\u2022 Headache\n\u2022 Diarrhea or stomach discomfort\n\u2022 Difficulty sleeping\n\n**When to call your doctor:**\n\u2022 Severe nausea or vomiting that prevents you from taking the medication\n\u2022 Yellowing of skin or eyes\n\u2022 Dark-colored urine\n\u2022 Rash\n\u2022 Any severe or worsening symptoms',
    },
    {
      heading: 'Important Reminders',
      body: '\u2022 Take your medication at the same time every day\n\u2022 Complete all 28 days \u2014 do not stop early even if you feel fine\n\u2022 You will need follow-up HIV testing at 4\u20136 weeks and 3 months\n\u2022 Visit your doctor at 2 weeks to check for side effects and blood work\n\u2022 Use condoms and safe practices during and after PEP until your final HIV test is negative\n\u2022 If you have ongoing risk for HIV, ask your doctor about PrEP (pre-exposure prophylaxis) \u2014 a daily medication to prevent HIV before exposure',
    },
  ],
  shareable: true,
  citations: [
    { num: 1, text: 'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV \u2014 CDC Recommendations, 2025. MMWR. 2025;74(1):1-56.' },
    { num: 2, text: 'Kofman AD, et al. 2025 US PHS Guidelines for Management of Occupational Exposures to HIV. Infect Control Hosp Epidemiol. 2025;46(9):863-873.' },
  ],
};

// -------------------------------------------------------------------
// Hepatitis B Serology Interpretation
// -------------------------------------------------------------------

const HBV_SEROLOGY_PAGE: InfoPage = {
  id: 'hbv-serology',
  title: 'Hepatitis B Serology',
  subtitle: 'Interpretation & Post-Exposure Management',
  sections: [
    {
      heading: 'The Three Markers',
      body: '**HBsAg (Surface Antigen)** — present on the virus surface. Positive = active infection (acute or chronic).\n\n**HBsAb (Surface Antibody)** — also called anti-HBs. Positive = immunity (from vaccination or resolved infection).\n\n**HBcAb (Core Antibody)** — also called anti-HBc. Positive = prior or current infection (does not develop from vaccination).',
    },
    {
      heading: 'Interpretation',
      body: '',
      drugTable: [
        {
          drug: 'Susceptible (not immune)',
          regimen: 'HBsAg (−), HBsAb (−), HBcAb (−) — never infected, not vaccinated. Needs vaccination.',
        },
        {
          drug: 'Immune (vaccination)',
          regimen: 'HBsAg (−), HBsAb (+), HBcAb (−) — successfully vaccinated. No action needed.',
        },
        {
          drug: 'Immune (natural infection)',
          regimen: 'HBsAg (−), HBsAb (+), HBcAb (+) — prior infection, now resolved with immunity. No action needed.',
        },
        {
          drug: 'Acute infection',
          regimen: 'HBsAg (+), HBsAb (−), HBcAb (+), IgM core Ab (+) — actively infected, early stage. Refer for monitoring; most adults clear spontaneously.',
        },
        {
          drug: 'Chronic infection',
          regimen: 'HBsAg (+), HBsAb (−), HBcAb (+), IgM core Ab (−) — persistent infection >6 months. Refer hepatology for treatment evaluation.',
        },
        {
          drug: 'Isolated core Ab+',
          regimen: 'HBsAg (−), HBsAb (−), HBcAb (+) — possible resolved infection with waned antibody, false positive, or occult infection. Check HBV DNA if clinical concern.',
        },
      ],
    },
    {
      heading: 'Post-Exposure Actions',
      body: '**If exposed patient is susceptible (all markers negative):**\n\u2022 Source HBV-positive or unknown: give HBIG (0.06 mL/kg IM) + start HBV vaccine series\n\u2022 Source HBV-negative: start HBV vaccine series (no HBIG needed)\n\u2022 HBIG is most effective within 24 hours; give within 7 days of exposure\n\n**If exposed patient was previously vaccinated (HBsAb+):**\n\u2022 HBsAb \u226510 mIU/mL: protected, no treatment needed\n\u2022 HBsAb <10 mIU/mL (non-responder): give HBIG + vaccine booster\n\n**If exposed patient has chronic HBV (HBsAg+):**\n\u2022 HBIG and vaccine will not help — refer hepatology\n\u2022 Ensure patient is connected to HBV care',
    },
    {
      heading: 'HBV Vaccine Series',
      body: '\u2022 Standard: 0, 1, and 6 months (3-dose series)\n\u2022 Accelerated: Heplisav-B (HepB-CpG) — 2 doses, 1 month apart\n\u2022 Check HBsAb 1\u20132 months after final dose to confirm response (\u226510 mIU/mL)',
    },
  ],
  citations: [
    { num: 1, text: 'Schillie S, et al. Prevention of Hepatitis B Virus Infection in the United States: Recommendations of the ACIP. MMWR. 2018;67(1):1-31.' },
    { num: 2, text: 'Terrault NA, et al. Update on Prevention, Diagnosis, and Treatment of Chronic Hepatitis B: AASLD 2018 Hepatitis B Guidance. Hepatology. 2018;67(4):1560-1599.' },
    { num: 3, text: 'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV — CDC Recommendations, 2025. MMWR. 2025;74(1):1-56.' },
  ],
};

// -------------------------------------------------------------------
// Thrombolysis Contraindications (Stroke)
// -------------------------------------------------------------------

const STROKE_CONTRAINDICATIONS_PAGE: InfoPage = {
  id: 'stroke-contraindications',
  title: 'Thrombolysis Contraindications',
  subtitle: 'IV Thrombolysis Eligibility \u2014 Acute Ischemic Stroke',
  sections: [
    {
      heading: 'Absolute Contraindications',
      body: '\u2022 Active internal bleeding (excluding menses)\n\u2022 History of hemorrhagic stroke or stroke of unknown origin\n\u2022 Ischemic stroke within 3 months\n\u2022 Significant head trauma or intracranial/spinal surgery within 3 months\n\u2022 Intracranial neoplasm, AVM, or aneurysm\n\u2022 Known bleeding diathesis (platelets <100,000, INR >1.7, aPTT >40s, PT >15s)\n\u2022 Current anticoagulant use with INR >1.7 or PT >15s\n\u2022 Low-molecular-weight heparin at therapeutic dose within 24 hours\n\u2022 Direct thrombin inhibitor or factor Xa inhibitor within 48 hours (unless lab testing shows normal levels)\n\u2022 Blood glucose <50 mg/dL',
    },
    {
      heading: 'Relative Contraindications',
      body: '**Time-Based:**\n\u2022 Rapidly improving or minor symptoms (but disabling deficits still warrant treatment)\n\u2022 Pregnancy (weigh risk-benefit; not an absolute contraindication)\n\u2022 Seizure at stroke onset (if residual deficits are due to stroke, not postictal)\n\u2022 Major surgery or serious trauma within 14 days\n\n**Lab/Medication-Based:**\n\u2022 Arterial puncture at non-compressible site within 7 days\n\u2022 Lumbar puncture within 7 days\n\u2022 GI or urinary tract hemorrhage within 21 days\n\u2022 Myocardial infarction within 3 months\n\n**Imaging-Based:**\n\u2022 Large hypodensity on NCCT (>1/3 MCA territory) \u2014 suggests extensive infarction, higher hemorrhagic conversion risk\n\u2022 Intracranial hemorrhage on baseline imaging',
    },
    {
      heading: 'Blood Pressure Requirements',
      body: '**Before thrombolysis:** BP must be <185/110 mmHg\n\u2022 [Labetalol](#/drug/labetalol) 10\u201320 mg IV bolus (first-line)\n\u2022 [Nicardipine](#/drug/nicardipine) 5 mg/hr IV infusion (if labetalol insufficient)\n\u2022 [Clevidipine](#/drug/clevidipine) 1\u20132 mg/hr IV (alternative)\n\nIf BP cannot be reduced to <185/110: **do NOT give thrombolysis**\n\n**After thrombolysis:** Maintain BP <180/105 \u00D7 24 hours\n\u2022 Same agents as above; neuro checks every 15 min',
    },
    {
      heading: 'Extended Window Considerations (4.5\u20139h)',
      body: 'Patients in the 4.5\u20139 hour window may still be eligible for IVT if:\n\u2022 Perfusion imaging shows salvageable tissue (DWI-FLAIR mismatch on MRI, or CT perfusion with favorable penumbra)\n\u2022 No additional contraindications beyond standard list\n\u2022 Based on EXTEND trial evidence [3]',
    },
  ],
  citations: [
    { num: 1, text: 'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.' },
    { num: 2, text: 'Mendelson SJ, Prabhakaran S. Diagnosis and Management of TIA and Acute Ischemic Stroke: A Review. JAMA. 2021;325(11):1088-1098.' },
    { num: 3, text: 'Ma H, et al. Thrombolysis Guided by Perfusion Imaging up to 9 Hours after Onset of Stroke (EXTEND). N Engl J Med. 2019;380(19):1795-1803.' },
  ],
};

// -------------------------------------------------------------------
// Stroke Imaging: CT vs MRI
// -------------------------------------------------------------------

const STROKE_IMAGING_PAGE: InfoPage = {
  id: 'stroke-imaging',
  title: 'Stroke Imaging: CT vs MRI',
  subtitle: 'When to Use Each Modality',
  sections: [
    {
      body: 'Even when MRI is available, **CT stroke protocol is preferred when speed is critical** \u2014 particularly for suspected large vessel occlusion (LVO) where every minute of delay to endovascular therapy (EVT) worsens outcomes. [1][2]\n\nThe ACR Appropriateness Criteria state that "the rapidity of diagnosis afforded by CTA is a strongly relevant clinical consideration" and that MRI "may delay EVT...which detracts from the usefulness of this study due to the potential harm of delayed treatment." [2]',
    },
    {
      heading: 'When to Choose CT Over MRI (Even if MRI is Available)',
      body: '**Suspected LVO / thrombectomy candidate**\n\u2022 CTA is faster; delays to EVT worsen outcomes [1]\n\n**Severe/disabling deficits within 4.5 hours**\n\u2022 NCCT sufficient to exclude hemorrhage and initiate thrombolysis; DWI not necessary [2]\n\n**Unstable or agitated patient**\n\u2022 CT faster, less motion artifact, no sedation needed [2]\n\n**MRI contraindications** (pacemaker, cochlear implant, metallic foreign body, severe claustrophobia)\n\u2022 CT is safe alternative [1][2]\n\n**Collateral assessment needed**\n\u2022 Multiphase CTA provides collateral status for thrombectomy selection [3]\n\n**Perfusion imaging in extended window (6\u201324h)**\n\u2022 CT perfusion is faster than MRI perfusion in most settings [1][4]',
    },
    {
      heading: 'When MRI is Preferred Over CT',
      body: '**Wake-up stroke / unknown onset**\n\u2022 DWI-FLAIR mismatch determines thrombolysis eligibility [1]\n\n**TIA or minor stroke with resolved symptoms**\n\u2022 DWI detects infarct in ~40% of TIAs (CT only ~4%) [2][3]\n\n**Posterior fossa stroke**\n\u2022 CT limited by bone artifact; MRI superior [4]\n\n**Stroke mimics suspected**\n\u2022 MRI better differentiates ischemia from mimics [4]\n\n**Renal insufficiency or contrast allergy**\n\u2022 Time-of-flight MRA avoids iodinated contrast [1][5]\n\n**Small/lacunar infarcts**\n\u2022 DWI more sensitive for small lesions [4]\n\n**Large infarct assessment for EVT eligibility**\n\u2022 DWI may be needed to determine core volume [1]',
    },
    {
      heading: 'Key Performance Differences',
      body: '**Hemorrhage detection**\n\u2022 CT: High sensitivity/specificity\n\u2022 MRI: Equivalent with GRE/SWI [1]\n\n**Acute infarct detection (\u22643h)**\n\u2022 CT: 47\u201353% sensitive\n\u2022 MRI (DWI): 88% sensitive [2]\n\n**LVO detection (CTA vs MRA)**\n\u2022 CTA: 92\u2013100% sensitive\n\u2022 MRA: Slightly inferior, especially distally [2][3]\n\n**Acquisition time**\n\u2022 CT (NCCT + CTA + CTP): ~5\u201310 min\n\u2022 MRI: ~20\u201330 min [4]\n\n**Perfusion imaging**\n\u2022 CT: Validated thresholds; faster\n\u2022 MRI: Equivalent accuracy; slower [4][5]',
    },
    {
      heading: 'Bottom Line',
      body: 'In the hyperacute setting with disabling deficits and suspected LVO, **CT-based protocols (NCCT + CTA \u00B1 CTP) should be the default** due to speed, even when MRI is available. [1][2]\n\nReserve MRI for wake-up strokes, TIA workup, posterior circulation strokes, stroke mimics, or when contrast is contraindicated. [2][6]',
    },
  ],
  citations: [
    { num: 1, text: 'Powers WJ. Acute Ischemic Stroke. N Engl J Med. 2020;383(3):252-260.' },
    { num: 2, text: 'Pannell JS, Corey AS, Shih RY, et al. ACR Appropriateness Criteria\u00AE Cerebrovascular Diseases\u2014Stroke and Stroke-Related Conditions. J Am Coll Radiol. 2024;21(6S):S21-S64.' },
    { num: 3, text: 'Mendelson SJ, Prabhakaran S. Diagnosis and Management of TIA and Acute Ischemic Stroke: A Review. JAMA. 2021;325(11):1088-1098.' },
    { num: 4, text: 'Patel P, Yavagal D, Khandelwal P. Hyperacute Management of Ischemic Strokes: JACC Focus Seminar. J Am Coll Cardiol. 2020;75(15):1844-1856.' },
    { num: 5, text: 'Amin HP, Madsen TE, Bravata DM, et al. Diagnosis, Workup, Risk Reduction of TIA in the ED: AHA Scientific Statement. Stroke. 2023;54(3):e109-e121.' },
    { num: 6, text: 'Zerna C, Thomalla G, Campbell BCV, et al. Current Practice and Future Directions in the Diagnosis and Acute Treatment of Ischaemic Stroke. Lancet. 2018;392(10154):1247-1256.' },
    { num: 7, text: 'Wintermark M, Sanelli PC, Albers GW, et al. Imaging Recommendations for Acute Stroke and TIA Patients: ASNR/ACR/SNIS Joint Statement. AJNR Am J Neuroradiol. 2013;34(11):E117-27.' },
  ],
};

// -------------------------------------------------------------------
// Stroke Consent: Patient Info (Shareable)
// -------------------------------------------------------------------

const STROKE_CONSENT_PAGE: InfoPage = {
  id: 'stroke-consent',
  title: 'Thrombolysis: What You Need to Know',
  subtitle: 'Patient Information \u2014 Clot-Dissolving Treatment for Stroke',
  shareable: true,
  sections: [
    {
      heading: 'Your Chances of Recovery',
      body: '',
      pictographs: [
        {
          title: 'WITHOUT Treatment (out of 100 people like you)',
          groups: [
            { count: 26, color: '#66BB6A', label: '~26 people recover with little or no disability' },
            { count: 44, color: '#FFCA28', label: '~44 people have moderate disability' },
            { count: 30, color: '#EF5350', label: '~30 people have severe disability or die' },
          ],
        },
        {
          title: 'WITH Tenecteplase Treatment (out of 100 people like you)',
          groups: [
            { count: 73, color: '#66BB6A', label: '~73 people recover with little or no disability' },
            { count: 8, color: '#FFCA28', label: '~8 people have moderate disability' },
            { count: 17, color: '#EF5350', label: '~19 people have severe disability or die' },
            { count: 2, color: '#EF5350', label: '~2 people have brain bleeding (included in totals above)', symbol: '\u26A0\uFE0F' },
          ],
        },
      ],
    },
    {
      heading: 'What Is Happening?',
      body: 'You are having a stroke. A blood clot is blocking blood flow to part of your brain. Without treatment, the affected brain tissue will be permanently damaged.',
    },
    {
      heading: 'What Is the Treatment?',
      body: 'We are recommending a clot-dissolving medication (called a thrombolytic) given through your IV. This medication works by breaking up the blood clot that is blocking blood flow to your brain.\n\nThe sooner this medication is given, the better the chance of recovery. Every minute of delay means more brain tissue at risk.',
    },
    {
      heading: 'What Are the Benefits?',
      body: 'Clinical trials show that patients who receive this treatment are significantly more likely to recover with little or no disability:\n\n\u2022 Without treatment: about 26% of patients achieve a good outcome\n\u2022 With treatment: about 39% of patients achieve a good outcome\n\u2022 The earlier the treatment, the greater the benefit\n\u2022 For every 100 patients treated, approximately 13 additional patients recover well',
    },
    {
      heading: 'What Are the Risks?',
      body: 'The main risk is bleeding:\n\n\u2022 Symptomatic bleeding into the brain occurs in approximately 2\u20137% of patients\n\u2022 This can sometimes be life-threatening\n\u2022 Your medical team will monitor you very closely for the first 24 hours\n\u2022 Minor bleeding (gums, IV site) is more common and usually manageable\n\nOther possible side effects:\n\u2022 Allergic reaction (rare)\n\u2022 Swelling of the tongue or lips (angioedema \u2014 rare, more common if taking ACE inhibitors)',
    },
    {
      heading: 'What Happens If We Don\u2019t Treat?',
      body: 'Without clot-dissolving medication, the blocked area of your brain will continue to lose blood flow. This can lead to:\n\n\u2022 Permanent weakness or paralysis\n\u2022 Difficulty speaking or understanding speech\n\u2022 Vision loss\n\u2022 Disability requiring long-term care\n\u2022 In severe cases, death',
    },
    {
      heading: 'Emergency Consent',
      body: 'Because time is critical in stroke treatment, emergency consent may be obtained if the patient is unable to communicate and no family member is immediately available. This is standard practice supported by medical guidelines \u2014 the benefit of rapid treatment outweighs the delay of waiting for formal consent.',
    },
  ],
  citations: [
    { num: 1, text: 'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.' },
    { num: 2, text: 'Wardlaw JM, et al. Thrombolysis for Acute Ischaemic Stroke. Cochrane Database Syst Rev. 2014.' },
  ],
};

// -------------------------------------------------------------------
// P2Y12 Inhibitor Selection (NSTEMI)
// -------------------------------------------------------------------

const NSTEMI_ANTIPLATELET_PAGE: InfoPage = {
  id: 'nstemi-antiplatelet-cx',
  title: 'P2Y12 Inhibitor Selection',
  subtitle: 'Choosing Between Ticagrelor, Prasugrel, and Clopidogrel',
  sections: [
    {
      body: 'All three P2Y12 inhibitors reduce ischemic events when combined with aspirin after ACS/PCI. Selection depends on bleeding risk, ischemic risk, concomitant medications, and specific patient characteristics.',
    },
    {
      heading: 'Ticagrelor (Preferred First-Line)',
      body: '\u2022 PLATO trial: 16% relative reduction in CV death/MI/stroke vs clopidogrel (NNT 54)\n\u2022 Reversible P2Y12 inhibition \u2014 offset in ~3-5 days\n\u2022 Not dependent on CYP2C19 metabolism\n\u2022 **KEY:** Aspirin must be \u2264100 mg/day (higher doses reduce ticagrelor efficacy)\n\u2022 Side effects: dyspnea (~14%, usually mild), bradycardia\n\u2022 Twice-daily dosing may reduce adherence\n\u2022 Loading: 180 mg \u2192 Maintenance: 90 mg BID \u00D7 12 months',
    },
    {
      heading: 'Prasugrel (High Ischemic Risk)',
      body: '\u2022 TRITON-TIMI 38: 19% relative reduction in CV death/MI/stroke vs clopidogrel (NNT 46)\n\u2022 More potent and less variable platelet inhibition\n\u2022 **ABSOLUTE CONTRAINDICATION: Prior stroke or TIA** (net clinical harm)\n\u2022 Generally avoid if age \u226575 (no net benefit) or weight <60 kg (consider 5mg maintenance)\n\u2022 Irreversible \u2014 offset ~7 days (longest of the three)\n\u2022 Best for: diabetic patients, prior stent thrombosis on clopidogrel\n\u2022 Loading: 60 mg at PCI \u2192 Maintenance: 10 mg daily \u00D7 12 months',
    },
    {
      heading: 'Clopidogrel (High Bleeding Risk / OAC)',
      body: '\u2022 Least potent P2Y12 inhibitor but lowest bleeding risk\n\u2022 **Preferred for triple therapy** (OAC + DAPT)\n\u2022 Prodrug requiring CYP2C19 activation \u2014 ~30% of population are poor metabolizers with reduced efficacy\n\u2022 Avoid concurrent omeprazole/esomeprazole (CYP2C19 inhibition) \u2014 use pantoprazole\n\u2022 Loading: 300-600 mg \u2192 Maintenance: 75 mg daily \u00D7 12 months',
    },
    {
      heading: 'Decision Matrix',
      body: '',
      drugTable: [
        { drug: 'Standard ACS (no OAC needed)', regimen: 'Ticagrelor 90mg BID \u2014 first-line per PLATO trial. Aspirin \u2264100mg.' },
        { drug: 'High ischemic risk (diabetes, stent thrombosis)', regimen: 'Prasugrel 10mg daily \u2014 if NO prior stroke/TIA, age <75, weight \u226560kg.' },
        { drug: 'On oral anticoagulation (AF, VTE)', regimen: 'Clopidogrel 75mg daily \u2014 lowest bleeding in triple/dual therapy.' },
        { drug: 'CYP2C19 poor metabolizer', regimen: 'Ticagrelor or prasugrel \u2014 NOT clopidogrel (reduced efficacy).' },
        { drug: 'CABG likely/planned', regimen: 'Consider deferring P2Y12 until anatomy known. If loaded: hold per drug-specific timing.' },
      ],
    },
  ],
  citations: [
    { num: 1, text: 'Wallentin L, et al. Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes (PLATO). N Engl J Med. 2009;361(11):1045-1057.' },
    { num: 2, text: 'Wiviott SD, et al. Prasugrel versus Clopidogrel in Patients with Acute Coronary Syndromes (TRITON-TIMI 38). N Engl J Med. 2007;357(20):2001-2015.' },
    { num: 3, text: 'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.' },
  ],
};

// -------------------------------------------------------------------
// Conservative Management (NSTEMI)
// -------------------------------------------------------------------

const NSTEMI_CONSERVATIVE_PAGE: InfoPage = {
  id: 'nstemi-conservative',
  title: 'Conservative Management',
  subtitle: 'Ischemia-Guided Strategy for Low-Risk NSTEMI',
  sections: [
    {
      body: 'A conservative (ischemia-guided) strategy is appropriate for low-risk NSTEMI patients (TIMI 0-2) without high-risk features. Catheterization is reserved for those who develop recurrent ischemia or have positive stress testing.',
    },
    {
      heading: 'Who Qualifies?',
      body: '\u2022 TIMI score 0-2\n\u2022 No hemodynamic instability\n\u2022 No refractory angina\n\u2022 No sustained arrhythmias\n\u2022 No heart failure signs\n\u2022 Low-risk troponin trajectory (trending down)',
    },
    {
      heading: 'Medical Therapy',
      body: '**Anticoagulation:** Fondaparinux 2.5 mg SC daily preferred (lowest bleeding \u2014 OASIS-5 trial)\n**Antiplatelet:** Aspirin 81 mg + clopidogrel 75 mg (or ticagrelor 90 mg BID)\n**Anti-ischemic:** Metoprolol \u2014 target HR <70. Nitroglycerin PRN.\n**Statin:** Atorvastatin 80 mg immediately\n**ACE inhibitor:** Within 24h if no contraindications',
    },
    {
      heading: 'Stress Testing Before Discharge',
      body: '**Options (in order of preference):**\n\u2022 Exercise treadmill test (if can exercise and ECG interpretable)\n\u2022 Stress echocardiography\n\u2022 Pharmacologic stress MRI/nuclear\n\n**Timing:** Before discharge or within 72 hours\n**If positive:** Upgrade to invasive strategy (catheterization)\n**If negative:** Discharge with medical therapy and close follow-up',
    },
    {
      heading: 'Upgrade to Invasive Strategy If:',
      body: '\u2022 Positive stress test\n\u2022 Recurrent angina at rest or with minimal exertion\n\u2022 New/worsening heart failure\n\u2022 New sustained arrhythmia\n\u2022 Hemodynamic instability\n\u2022 Rising troponin trajectory',
    },
  ],
  citations: [
    { num: 1, text: 'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e189-e228.' },
    { num: 2, text: 'Yusuf S, et al. Comparison of Fondaparinux and Enoxaparin in Acute Coronary Syndromes (OASIS-5). N Engl J Med. 2006;354(14):1464-1476.' },
  ],
};

// -------------------------------------------------------------------
// Bedside Echo in ACS (NSTEMI)
// -------------------------------------------------------------------

const NSTEMI_POCUS_PAGE: InfoPage = {
  id: 'nstemi-pocus',
  title: 'Bedside Echo in ACS',
  subtitle: 'POCUS Assessment for NSTEMI',
  sections: [
    {
      body: 'Bedside echocardiography (POCUS) in ACS provides rapid assessment of ventricular function, wall motion abnormalities, and mechanical complications. Can be performed in <5 minutes and guides immediate management decisions.',
    },
    {
      heading: 'What to Look For',
      body: '**Regional Wall Motion Abnormalities (RWMA):**\n\u2022 Hypokinesis (reduced movement)\n\u2022 Akinesis (absent movement)\n\u2022 Dyskinesis (paradoxical movement)\n\u2022 Distribution suggests culprit vessel territory\n\n**Global LV Function:**\n\u2022 Visual EF estimate (normal >55%, reduced <40%)\n\u2022 E-point septal separation (EPSS) \u2014 >10mm suggests EF <40%\n\n**RV Assessment:**\n\u2022 RV dilation (RV:LV ratio >0.6 suggests RV involvement)\n\u2022 RV free wall motion \u2014 McConnell sign (RV free wall akinesis with apical sparing) = acute RV strain\n\u2022 TAPSE <16mm = RV dysfunction',
    },
    {
      heading: 'Mechanical Complications (Emergent)',
      body: '\u2022 **Free wall rupture:** pericardial effusion + tamponade physiology\n\u2022 **VSD:** new color flow across interventricular septum; step-up in O\u2082 saturation PA vs RA\n\u2022 **Papillary muscle rupture:** severe acute MR with flail leaflet\n\u2022 **LV aneurysm:** thin, akinetic wall segment (late complication)\n\nAll mechanical complications require emergent surgical consultation.',
    },
    {
      heading: 'Views to Obtain',
      body: '\u2022 **Parasternal long axis (PLAX):** Global LV function, MR, pericardial effusion, EPSS\n\u2022 **Parasternal short axis (PSAX):** Segmental wall motion (sweep base to apex)\n\u2022 **Apical 4-chamber (A4C):** Comparative RV/LV size, TAPSE, regional WMA\n\u2022 **Subxiphoid:** Pericardial effusion, RV size\n\u2022 **IVC:** Volume status (collapsibility guides fluid management)\n\nFor detailed echo technique, see [Basic Echo Views](#/tree/echo-views)',
    },
  ],
  citations: [
    { num: 1, text: 'Collet JP, et al. 2020 ESC Guidelines for Management of ACS without Persistent ST-Elevation. Eur Heart J. 2021;42(14):1289-1367.' },
    { num: 2, text: 'Via G, et al. International Evidence-Based Recommendations for Focused Cardiac Ultrasound. J Am Soc Echocardiogr. 2014;27(7):683.e1-683.e33.' },
  ],
};

// -------------------------------------------------------------------
// MINOCA Workup & Management
// -------------------------------------------------------------------

const NSTEMI_MINOCA_PAGE: InfoPage = {
  id: 'nstemi-minoca',
  title: 'MINOCA Workup & Management',
  subtitle: 'Myocardial Infarction with Non-Obstructive Coronary Arteries',
  sections: [
    {
      body: 'MINOCA is defined as acute MI (troponin criteria) with non-obstructive coronary arteries (\u226450% stenosis) on angiography. Accounts for 5-10% of all MI presentations. Requires systematic evaluation to determine etiology and guide therapy \u2014 standard ACS regimens may be harmful.',
    },
    {
      heading: 'Etiologies',
      body: '',
      drugTable: [
        { drug: 'Coronary spasm (most common)', regimen: 'Treat with CCBs (diltiazem/amlodipine) and nitrates. AVOID beta-blockers (may worsen spasm). Provocative testing (acetylcholine challenge) in cath lab may confirm.' },
        { drug: 'Plaque disruption/erosion', regimen: 'Standard ACS therapy appropriate (DAPT + statin). OCT/IVUS may identify plaque features not seen on angiography.' },
        { drug: 'Spontaneous coronary artery dissection (SCAD)', regimen: 'Conservative management preferred. AVOID anticoagulation (may extend dissection). DAPT controversial. Most heal spontaneously. PCI may worsen dissection.' },
        { drug: 'Takotsubo (stress cardiomyopathy)', regimen: 'Supportive care. AVOID catecholamines/inotropes. Beta-blocker if no cardiogenic shock. EF typically recovers in 1-4 weeks. Screen for QT prolongation.' },
        { drug: 'Myocarditis', regimen: 'Treat underlying cause. NSAIDs may worsen myocarditis. Anticoagulation if severe LV dysfunction. Cardiac MRI diagnostic (late gadolinium enhancement pattern).' },
        { drug: 'Coronary thromboembolism', regimen: 'Evaluate for: AF, PFO, endocarditis, hypercoagulable state. Anticoagulation if embolic source identified.' },
      ],
    },
    {
      heading: 'Mandatory Workup',
      body: '**Cardiac MRI (within 7 days):**\n\u2022 Distinguishes ischemic vs non-ischemic patterns\n\u2022 T2 mapping: identifies edema (acute injury)\n\u2022 Late gadolinium enhancement: scar pattern\n  \u2014 Subendocardial: ischemic (plaque, spasm, embolism)\n  \u2014 Subepicardial/mid-wall: myocarditis\n  \u2014 Absent with edema: Takotsubo\n\n**Additional testing as indicated:**\n\u2022 OCT/IVUS during index cath (plaque erosion, dissection)\n\u2022 Provocative testing (acetylcholine challenge for spasm)\n\u2022 Hypercoagulability panel if embolic etiology suspected\n\u2022 Screening for pheochromocytoma if Takotsubo',
    },
    {
      heading: 'Key Principle',
      body: '**Do not reflexively apply standard ACS therapy.** Each MINOCA etiology has specific management \u2014 some standard ACS medications can cause harm:\n\n\u2022 Beta-blockers worsen coronary spasm\n\u2022 Anticoagulation extends SCAD dissection\n\u2022 Catecholamines worsen Takotsubo\n\u2022 NSAIDs worsen myocarditis\n\nDetermine etiology FIRST, then tailor therapy accordingly.',
    },
  ],
  citations: [
    { num: 1, text: 'Tamis-Holland JE, et al. Contemporary Diagnosis and Management of Patients with MI in the Absence of Obstructive CAD: AHA Scientific Statement. Circulation. 2019;139(18):e891-e908.' },
    { num: 2, text: 'Collet JP, et al. 2020 ESC Guidelines for Management of ACS without Persistent ST-Elevation. Eur Heart J. 2021;42(14):1289-1367.' },
    { num: 3, text: 'Hayes SN, et al. Spontaneous Coronary Artery Dissection: AHA Scientific Statement. Circulation. 2018;137(19):e523-e557.' },
  ],
};

// -------------------------------------------------------------------
// Hyperkalemia ECG Findings
// -------------------------------------------------------------------

const K_HYPER_ECG_PAGE: InfoPage = {
  id: 'k-hyper-ecg-info',
  title: 'Hyperkalemia ECG Findings',
  subtitle: 'ECG Progression by Potassium Level',
  sections: [
    {
      heading: 'Early Changes (K+ 5.5-6.5 mEq/L)',
      body: '**Peaked T-waves** — narrow-based, symmetric, tall. Most sensitive early finding but not specific. Best seen in precordial leads V2-V4.\n\nFlattened P-waves.\n\nST-segment depression.',
    },
    {
      heading: 'Moderate Changes (K+ 6.5-7.5 mEq/L)',
      body: 'PR interval prolongation → first-degree AV block.\n\nFurther P-wave flattening or complete loss of P-waves.\n\nContinued T-wave peaking.',
    },
    {
      heading: 'Severe Changes (K+ 7.0-8.0 mEq/L)',
      body: '**QRS widening** (> 120 ms) — intraventricular conduction delay.\n\nLoss of P-waves.\n\nBradycardia from prolonged PR and QRS.\n\nBundle branch block patterns.\n\nJunctional or escape rhythms.\n\nSecond- or third-degree AV block.',
    },
    {
      heading: 'Life-Threatening (K+ > 8.0 mEq/L)',
      body: '**Sine wave pattern** — merged wide QRS complexes with peaked T-waves. Pathognomonic.\n\nVentricular fibrillation.\n\nAsystole or pulseless electrical activity.\n\nComplete heart block.',
    },
    {
      heading: 'Most Dangerous ECG Findings',
      body: 'The following findings are associated with serious adverse events (VF, cardiac arrest, death within 6 hours):\n\n• **Bradycardia** — RR 12.3\n• **Junctional rhythm** — RR 7.5\n• **Prolonged QRS** — RR 4.7\n\nFrequency in severe hyperkalemia (K+ ≥ 6.5):\n• Peaked T-waves: 35.7%\n• Prolonged PR: 12.1%\n• Bradycardia: 12.0%\n• Widened QRS: 7.8%\n• Escape rhythm: 7.1%\n• High-degree AV block: 3.5%\n• Ventricular arrhythmias: 0.7%',
    },
    {
      heading: 'Clinical Pearls',
      body: 'ECG changes typically do not manifest until K+ exceeds 6.5 mEq/L. [1]\n\nECG changes have **low sensitivity** for detecting hyperkalemia and do not correlate reliably with specific K+ levels. [2]\n\nThe **rate of potassium rise** is often more important than the absolute level — patients with lower baseline K+ who experience rapid increases are at higher risk. [3]\n\nChronic hyperkalemia (e.g., dialysis patients) is better tolerated — these patients may have elevated K+ with fewer ECG manifestations. [1]\n\n**Never rule out dangerous hyperkalemia based on a normal ECG.** Sensitivity for peaked T-waves is only ~34%. [3]',
    },
  ],
  citations: [
    { num: 1, text: 'Sandau KE, et al. Update to Practice Standards for ECG Monitoring in Hospital Settings. Circulation. 2017;136(19):e273-e344.' },
    { num: 2, text: 'Kim MJ, et al. Potassium Disorders: Hypokalemia and Hyperkalemia. Am Fam Physician. 2023;107(1):59-70.' },
    { num: 3, text: 'Nakayama T, et al. Baseline Potassium Levels and Their Association With ECG Abnormalities in Hyperkalaemia. Nephrology. 2025;30(7):e70100.' },
    { num: 4, text: 'Durfey N, et al. Severe Hyperkalemia: Can the ECG Risk Stratify? West J Emerg Med. 2017;18(5):963-971.' },
  ],
};

// -------------------------------------------------------------------
// Hypokalemia ECG Findings
// -------------------------------------------------------------------

const K_HYPO_ECG_PAGE: InfoPage = {
  id: 'k-hypo-ecg-info',
  title: 'Hypokalemia ECG Findings',
  subtitle: 'ECG Changes and Arrhythmia Risk',
  sections: [
    {
      heading: 'Classic ECG Findings',
      body: 'The earliest change is **decreased T-wave amplitude**, progressing as potassium declines.\n\n• **T-wave flattening/inversion** (27% of patients) — most common finding\n• **ST-segment depression** (16%) — upsloping morphology\n• **QTc prolongation** (14%) — often actually QTU prolongation with T-U wave fusion\n• **Prominent U waves** (> 1 mm amplitude) — most specific finding\n• U waves larger than T-waves in same lead (U:T ratio > 1)\n\nBest seen in leads V2 and V3.\n\nECG changes are present in only about **40% of hypokalemic patients**. [1]',
    },
    {
      heading: 'Quantitative ECG Effects',
      body: 'For each 1 mmol/L decrease in potassium within the low range (2.0-4.1): [4]\n\n• QTc prolongation: **+12.8 ms**\n• T-wave amplitude reduction: **-43.1 μV**\n• PR interval prolongation: **+4.6 ms**\n• P-wave duration prolongation: **+2.7 ms**',
    },
    {
      heading: 'Arrhythmia Risk',
      body: 'QTc prolongation increases risk of **Torsades de Pointes**.\n\n**AVOID QT-prolonging drugs** in hypokalemia:\n• Amiodarone, sotalol\n• Fluoroquinolones\n• Ondansetron\n• Haloperidol, droperidol\n• Methadone\n\nOther arrhythmias:\n• First- or second-degree AV block\n• Atrial fibrillation\n• PVCs\n• Ventricular tachycardia\n• Ventricular fibrillation and cardiac arrest\n\n**Digitalis toxicity** is potentiated by hypokalemia — monitor carefully in patients on digoxin.',
    },
    {
      heading: 'Severe Hypokalemia (K+ < 2.5 mEq/L)',
      body: 'Characteristic findings include:\n\n• **Prominent U waves** with T-U fusion\n• ST-segment depression\n• T-wave flattening or inversion\n• Apparent QT prolongation (often QTU interval)\n• Widened QRS in severe cases\n\nLife-threatening arrhythmias may occur: VT, Torsades de Pointes, VF, cardiac arrest. [2] [3]',
    },
    {
      heading: 'Clinical Pearls',
      body: 'ECG changes do NOT reliably correlate with specific K+ levels. [2]\n\nThe **rapidity of decline** is more predictive of ECG changes than the absolute level. [2]\n\nConsider hypokalemia in any patient with **new-onset AF or VT**.\n\nU waves are a classic teaching point but present in only ~20% of hypokalemic patients — QTc prolongation is the most clinically significant finding.\n\nAlways obtain ECG when hypokalemia is identified to determine treatment urgency. [2]',
    },
  ],
  citations: [
    { num: 1, text: 'Kildegaard H, et al. Prevalence and Prognostic Value of ECG Abnormalities in Hypokalemia. J Intern Med. 2024;295(4):544-556.' },
    { num: 2, text: 'Kim MJ, et al. Potassium Disorders: Hypokalemia and Hyperkalemia. Am Fam Physician. 2023;107(1):59-70.' },
    { num: 3, text: 'Sandau KE, et al. Update to Practice Standards for ECG Monitoring in Hospital Settings. Circulation. 2017;136(19):e273-e344.' },
    { num: 4, text: 'Krogager ML, et al. Relationship Between Serum K+ and ECG Characteristics in 163,547 Individuals. J Electrocardiol. 2019;57:104-111.' },
  ],
};

// -------------------------------------------------------------------
// Croup Return Precautions
// -------------------------------------------------------------------

const CROUP_RETURN_PRECAUTIONS: InfoPage = {
  id: 'croup-return-precautions',
  title: 'When to Return to the Emergency Department',
  subtitle: 'Patient Discharge Instructions — Croup',
  shareable: true,
  sections: [
    {
      body: 'Your child has been diagnosed with **croup**, a viral infection that causes swelling in the airway. Most children improve within 2 days with treatment, but it\'s important to watch for warning signs that your child needs to return for medical care.',
    },
    {
      heading: 'Call 911 or Return to the Emergency Department Immediately If Your Child Has',
      body: '**Breathing Problems:**\n• Difficulty breathing that is getting worse\n• Struggling to breathe (chest pulling in deeply between or below the ribs with each breath)\n• Fast breathing or working very hard to breathe\n• Noisy breathing when resting (stridor) that doesn\'t improve or gets worse\n• Pauses in breathing or stops breathing briefly\n\n**Serious Warning Signs:**\n• Blue or gray color around the lips, mouth, or fingernails\n• Extreme drowsiness or difficulty waking up\n• Confusion or unusual behavior\n• Drooling or difficulty swallowing\n• Unable to drink fluids or refusing all liquids',
    },
    {
      heading: 'Return to Your Doctor or Emergency Department If Your Child Has',
      body: '• Symptoms that don\'t improve after taking the prescribed steroid medicine\n• Barking cough that lasts more than 3 days\n• Fever above 103°F (39.4°C) or fever that lasts more than 3 days\n• Symptoms that improve and then suddenly get worse\n• Trouble sleeping due to breathing problems',
    },
    {
      heading: 'What to Expect at Home',
      body: '• Symptoms are often **worse at night** and may improve during the day\n• The barking cough typically lasts 1-2 days but can continue for up to 5-7 days\n• Your child may sound worse than they actually are — the barking cough can be scary but doesn\'t always mean severe illness\n• Keep your child calm, as crying and agitation can make breathing more difficult',
    },
    {
      heading: 'Home Care Tips',
      body: '• Give the steroid medicine exactly as prescribed\n• Keep your child comfortable and calm\n• Offer plenty of fluids to prevent dehydration\n• Use acetaminophen or ibuprofen for fever or discomfort (follow dosing instructions)\n• Keep your child\'s head elevated during sleep if comfortable',
    },
    {
      heading: 'When Symptoms Usually Improve',
      body: 'Most children start feeling better within 2-3 hours after receiving steroid medication. The cough should gradually improve over the next 2 days. If your child is not improving as expected, contact your doctor.\n\n**Trust your instincts.** If you are worried about your child\'s breathing or overall condition, seek medical attention right away. It\'s always better to be checked and reassured than to wait too long.',
    },
  ],
  citations: [
    { num: 1, text: 'Bjornson CL, Johnson DW. Croup. Lancet. 2008;371(9609):329-39.' },
    { num: 2, text: 'Cherry JD. Croup. N Engl J Med. 2008;358(4):384-91.' },
    { num: 3, text: 'Zoorob R, Sidani M, Murray J. Croup: An Overview. Am Fam Physician. 2011;83(9):1067-73.' },
    { num: 4, text: 'Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.' },
  ],
};

// -------------------------------------------------------------------
// Pediatric UTI Definition & Urinalysis
// -------------------------------------------------------------------

const UTI_DEFINITION_PAGE: InfoPage = {
  id: 'uti-definition-info',
  title: 'UTI Definition & Urinalysis',
  subtitle: 'DCMC Diagnostic Criteria',
  sections: [
    {
      heading: 'UTI Definition',
      body: 'The presence of pyuria and/or bacteriuria on urinalysis AND a positive urine culture.\n\n\u2022 Pyuria: \u22655 WBCs/hpf in centrifuged specimen (DCMC uses centrifuged specimens) or \u226510 WBCs/hpf in counting chamber\n\u2022 Urine culture positive: \u226550,000 CFU/mL by catheterization or suprapubic aspiration\n\u2022 Clean catch: \u2265100,000 CFU/mL optimal, 50,000-100,000 acceptable with decreased sensitivity/specificity',
    },
    {
      heading: 'Positive UA Definition',
      body: 'The presence of Leukocyte Esterase OR Nitrites OR microscopic analysis positive for leukocytes or bacteria is suggestive of active UTI.\n\nWhen more than one finding is present simultaneously, sensitivity and specificity increase significantly.\n\n\u2022 Urine dipstick alone cannot report WBC count and bacterial presence \u2014 use with caution\n\u2022 If bag specimen UA is positive, obtain catheterized specimen for culture to avoid contamination',
    },
    {
      heading: 'Complicated UTI',
      body: 'Defined as UTI with any of the following:\n\u2022 Functional or anatomic abnormality of the urinary tract\n\u2022 Indwelling urinary catheter\n\u2022 Recent urinary tract instrumentation\n\u2022 Recent antibiotic use\n\u2022 Immunosuppression',
    },
    {
      heading: 'Neonatal UTI Definition',
      body: 'For infants <48 weeks PMA and >7 days of life:\n\n\u2022 UTI defined as >50,000 CFU/mL in catheter obtained specimen\n\u2022 Exclusions: History of Candida infection (consult ID), concomitant bacteremia or meningitis\n\u2022 ESBL: Bacteria with particular resistance to penicillins \u2014 requires expanded antibiotic coverage',
    },
  ],
  citations: [
    { num: 1, text: 'Dell Children\'s EBOC. First Febrile UTI Clinical Pathway. May 2017.' },
    { num: 2, text: 'Dell Children\'s EBOC. UTI Management Pathway (Neonatal). September 2024.' },
    { num: 3, text: 'Roberts KB. UTI: clinical practice guideline for febrile infants 2 to 24 months. Pediatrics. 2011;128(3):595-610.' },
  ],
};

// -------------------------------------------------------------------
// HSV Workup Criteria (Peds Fever)
// -------------------------------------------------------------------

const PF_HSV_CRITERIA_PAGE: InfoPage = {
  id: 'pf-hsv-criteria',
  title: 'HSV Workup Criteria',
  subtitle: 'When to add Acyclovir and order HSV testing',
  sections: [
    {
      heading: 'Clinical Features Suggesting HSV',
      body: '\u2022 Skin vesicles (mouth, scalp, trunk) \u2014 most specific finding\n\u2022 Seizures (especially focal)\n\u2022 Lethargy or irritability out of proportion to fever\n\u2022 Hepatosplenomegaly\n\u2022 Temperature instability (hypothermia or hyperthermia)\n\u2022 Apnea or respiratory distress\n\u2022 Poor feeding\n\u2022 Bulging fontanelle',
    },
    {
      heading: 'Laboratory Red Flags',
      body: '\u2022 Thrombocytopenia\n\u2022 Transaminitis (elevated AST/ALT)\n\u2022 Coagulopathy (elevated PT/INR)\n\u2022 CSF pleocytosis (especially lymphocytic)\n\u2022 Elevated CSF protein',
    },
    {
      heading: 'Risk Factors',
      body: '\u2022 Maternal history of genital HSV (especially primary outbreak near delivery)\n\u2022 Vaginal delivery with active lesions\n\u2022 Prolonged rupture of membranes\n\u2022 Fetal scalp electrode use\n\u2022 Age <21 days (highest risk period)',
    },
    {
      heading: 'HSV Testing to Order',
      body: '\u2022 HSV PCR \u2014 blood (plasma)\n\u2022 HSV PCR \u2014 CSF\n\u2022 Surface cultures: conjunctiva, throat, nasopharynx, rectum\n\u2022 Vesicle fluid: viral culture and/or PCR (if lesions present)\n\u2022 AST, ALT (hepatic involvement screen)',
    },
    {
      heading: 'Treatment',
      body: '\u2022 [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h\n\u2022 Duration: minimum 5 doses or until HSV PCR results negative\n\u2022 If PCR not resulted after 5 doses \u2192 contact Infectious Disease\n\u2022 Ensure adequate hydration (crystalline nephropathy risk)',
    },
  ],
  citations: [
    { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
    { num: 3, text: 'Kimberlin DW, et al. Guidance on Management of Asymptomatic Neonates Born to Women With Active Genital Herpes Lesions. Pediatrics. 2013;131(2):e572-e549.' },
  ],
};

// -------------------------------------------------------------------
// Ceftriaxone Contraindications in Neonates (Peds Fever)
// -------------------------------------------------------------------

const PF_CEFTRIAXONE_CI_PAGE: InfoPage = {
  id: 'pf-ceftriaxone-ci',
  title: 'Ceftriaxone Contraindications (<28 Days)',
  subtitle: 'Use Cefepime as alternative when contraindicated',
  sections: [
    {
      heading: 'Absolute Contraindications',
      body: '\u2022 Gestational age <37 weeks (any postnatal age)\n\u2022 Postnatal age <7 days (any gestational age)\n\u2022 Receiving calcium-containing IV products (risk of fatal Ceftriaxone-calcium precipitates in lungs/kidneys)\n\u2022 Known cephalosporin anaphylaxis',
    },
    {
      heading: 'Relative Contraindications (Use with Caution)',
      body: '\u2022 Total bilirubin >10 mg/dL\n\u2022 Risk factors for hyperbilirubinemia:\n  \u2022 ABO incompatibility\n  \u2022 G6PD deficiency\n  \u2022 Significant bruising/cephalohematoma\n  \u2022 East Asian ethnicity\n  \u2022 Exclusive breastfeeding with weight loss >10%\n\u2022 Ceftriaxone displaces bilirubin from albumin \u2192 increased free bilirubin \u2192 kernicterus risk',
    },
    {
      heading: 'Alternative Agent',
      body: '\u2022 [Cefepime](#/drug/cefepime) \u2014 4th-generation cephalosporin\n\u2022 Dosing 0-28 days: 50 mg/kg IV q12h\n\u2022 Dosing >28 days: 50 mg/kg IV q8h\n\u2022 Broader gram-negative spectrum than Ceftriaxone\n\u2022 No calcium interaction, no significant bilirubin displacement',
    },
  ],
  citations: [
    { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
  ],
};

// -------------------------------------------------------------------
// Antimicrobial Dosing Reference (Peds Fever)
// -------------------------------------------------------------------

const PF_ABX_DOSING_PAGE: InfoPage = {
  id: 'pf-abx-dosing',
  title: 'Antimicrobial Dosing Reference',
  subtitle: 'Age-based dosing for febrile infant workup',
  sections: [
    {
      heading: 'Empiric Sepsis Coverage (0-7 Days)',
      body: '\u2022 [Ampicillin](#/drug/ampicillin) 50 mg/kg IV q8h + [Gentamicin](#/drug/gentamicin) 4 mg/kg IV q24h\n\u2022 Covers: GBS, Listeria, E. coli, Enterococcus\n\u2022 Duration: 48h rule-out period (d/c if cultures negative + well-appearing)',
    },
    {
      heading: 'Empiric Sepsis Coverage (8-21 Days)',
      body: '\u2022 [Ceftriaxone](#/drug/ceftriaxone) 50 mg/kg IV q24h (or [Cefepime](#/drug/cefepime) if [CI](#/info/pf-ceftriaxone-ci))\n\u2022 Duration: 48h rule-out period',
    },
    {
      heading: 'Empiric Sepsis Coverage (22-28 Days)',
      body: '\u2022 [Ceftriaxone](#/drug/ceftriaxone) 50 mg/kg IV q24h (or [Cefepime](#/drug/cefepime) if [CI](#/info/pf-ceftriaxone-ci))\n\u2022 Duration: 24-36h rule-out period',
    },
    {
      heading: 'Meningitis Dosing (0-7 Days)',
      body: '\u2022 [Ampicillin](#/drug/ampicillin) 100 mg/kg IV q8h + [Cefepime](#/drug/cefepime) 50 mg/kg IV q12h\n\u2022 D/C [Gentamicin](#/drug/gentamicin) when switching to meningitic dosing\n\u2022 Consider adding [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h',
    },
    {
      heading: 'Meningitis Dosing (8-28 Days)',
      body: '\u2022 [Ceftriaxone](#/drug/ceftriaxone) 50 mg/kg IV q12h + [Ampicillin](#/drug/ampicillin) 75 mg/kg IV q6h\n\u2022 Consider adding [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h',
    },
    {
      heading: 'Meningitis Dosing (29-60 Days)',
      body: '\u2022 [Ceftriaxone](#/drug/ceftriaxone) 50 mg/kg IV q12h + [Vancomycin](#/drug/vancomycin) 15 mg/kg IV q6h\n\u2022 Consider adding [Acyclovir](#/drug/acyclovir) 20 mg/kg IV q8h',
    },
    {
      heading: 'UTI Treatment',
      body: '\u2022 [Cefazolin](#/drug/cefazolin) 17 mg/kg IV q8h (without bacteremia)\n\u2022 [Cefazolin](#/drug/cefazolin) 33 mg/kg IV q8h (with bacteremia)\n\u2022 Step-down: [Cephalexin](#/drug/cephalexin) 17 mg/kg PO TID\n\u2022 Low-risk 29-60d UTI: [Cephalexin](#/drug/cephalexin) 17 mg/kg PO TID (oral from start)\n\u2022 Total treatment: 10 days (IV + PO combined)',
    },
    {
      heading: 'Drug Level Monitoring',
      body: '\u2022 [Gentamicin](#/drug/gentamicin): trough before 3rd dose if >2 doses anticipated (goal <1 mcg/mL)\n\u2022 [Vancomycin](#/drug/vancomycin): trough before 4th dose (goal 15-20 mcg/mL for meningitis)\n\u2022 If extended antibiotic course anticipated, monitor renal function (BMP)',
    },
  ],
  citations: [
    { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
    { num: 9, text: 'Dell Children\u2019s EBOC. Febrile Infant 0-60 Days Clinical Pathway. 2024.' },
  ],
};

// -------------------------------------------------------------------
// UTI Risk Factors & Screening (Peds Fever)
// -------------------------------------------------------------------

const PF_UTI_RISK_PAGE: InfoPage = {
  id: 'pf-uti-risk',
  title: 'UTI Risk Factors & Screening',
  subtitle: 'Age-specific screening criteria',
  sections: [
    {
      heading: 'Infants 0-2 Months',
      body: '\u2022 All febrile infants 0-2 months should have UA obtained\n\u2022 If UA positive \u2192 send catheterized urine culture\n\u2022 Bag specimens: acceptable for screening UA only, NEVER for culture',
    },
    {
      heading: 'Infants 2-6 Months (Female, Not Toilet-Trained)',
      body: 'UTI probability increases with number of risk factors:\n\n\u2022 Non-Black race\n\u2022 Temperature \u226539\u00b0C (102.2\u00b0F)\n\u2022 Fever \u22652 days\n\u2022 No other source identified\n\u2022 Age <12 months\n\n\u22652 risk factors \u2192 screen with UA',
    },
    {
      heading: 'Infants 2-6 Months (Male)',
      body: '\u2022 Uncircumcised \u2192 always screen with UA\n\u2022 Circumcised \u2192 screen if \u22653 of the female risk factors present\n\u2022 UTI prevalence in circumcised males is ~0.2% vs ~2% in uncircumcised',
    },
    {
      heading: 'Common Uropathogens',
      body: '**Gram-negative (most common):**\n\u2022 E. coli (80-90% of pediatric UTIs)\n\u2022 Klebsiella\n\u2022 Proteus (more common in males)\n\u2022 Enterobacter\n\u2022 Pseudomonas (consider if recent instrumentation)\n\n**Gram-positive:**\n\u2022 Enterococcus\n\u2022 Group B Streptococcus (neonates)\n\u2022 Staphylococcus saprophyticus (rare in infants)\n\n**Non-pathogens (likely contaminant):**\n\u2022 Lactobacillus\n\u2022 Coagulase-negative Staphylococcus\n\u2022 Corynebacterium',
    },
  ],
  citations: [
    { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
    { num: 8, text: 'Roberts KB, et al. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Children 2 to 24 Months. Pediatrics. 2011;128(3):595-610.' },
  ],
};

// -------------------------------------------------------------------
// UA Interpretation (Peds Fever)
// -------------------------------------------------------------------

const PF_UA_INTERPRET_PAGE: InfoPage = {
  id: 'pf-ua-interpret',
  title: 'UA Interpretation',
  subtitle: 'Positive UA criteria and culture thresholds',
  sections: [
    {
      heading: 'Positive UA Definition',
      body: '**ANY of the following:**\n\u2022 Leukocyte esterase (LE): trace or greater\n\u2022 Nitrites: positive (very specific but low sensitivity in infants)\n\u2022 WBC: >5/hpf (centrifuged) or >10/hpf (uncentrifuged)\n\u2022 Bacteria on Gram stain\n\nNote: In neonates <30 days, LE and nitrites have lower sensitivity. A negative UA does not rule out UTI in this age group if clinical suspicion is high.',
    },
    {
      heading: 'Culture Thresholds',
      body: '\u2022 Catheterized specimen: \u226550,000 CFU/mL (single organism) = positive\n\u2022 Suprapubic aspirate: any growth = positive\n\u2022 Bag specimen: NEVER use for culture (high false-positive rate, 85% contamination)\n\u2022 Mixed flora or multiple organisms \u2192 likely contamination \u2192 repeat if clinically indicated',
    },
    {
      heading: 'Enhanced UA (if available)',
      body: '\u2022 Cell count with differential (automated)\n\u2022 WBC >20 cells/\u00b5L suggests UTI\n\u2022 Bacteria >50,000/mL on flow cytometry\n\u2022 More sensitive than standard dipstick in young infants',
    },
    {
      heading: 'Clinical Correlation',
      body: '\u2022 Positive UA + positive culture = confirmed UTI \u2192 treat\n\u2022 Positive UA + negative culture = possible early/partially treated UTI or contamination\n\u2022 Negative UA + positive culture = possible UTI (especially neonates) \u2192 treat\n\u2022 Negative UA + negative culture = UTI excluded',
    },
  ],
  citations: [
    { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
    { num: 8, text: 'Roberts KB, et al. Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Children 2 to 24 Months. Pediatrics. 2011;128(3):595-610.' },
  ],
};

// -------------------------------------------------------------------
// Discharge Criteria & Return Precautions (Peds Fever)
// -------------------------------------------------------------------

const PF_DISCHARGE_PAGE: InfoPage = {
  id: 'pf-discharge',
  title: 'Discharge Criteria & Return Precautions',
  subtitle: 'Checklist before ED discharge',
  shareable: true,
  sections: [
    {
      heading: 'ED Discharge Criteria (ALL must be met)',
      body: '\u2022 Well-appearing on exam\n\u2022 Tolerating oral liquids\n\u2022 Reliable caregiver with transportation\n\u2022 PCP or ED follow-up within 24 hours confirmed\n\u2022 Caregiver comfortable with home observation\n\u2022 Good social support (telephone access, reasonable proximity to ED)\n\u2022 Return precaution education completed and understood',
    },
    {
      heading: 'Return Precautions for Caregivers',
      body: 'Bring your baby back to the emergency department immediately if:\n\n\u2022 Temperature rises above 100.4\u00b0F (38\u00b0C) again\n\u2022 Baby becomes difficult to wake or unusually sleepy\n\u2022 Baby stops eating or drinking, or has fewer than 3 wet diapers in 24 hours\n\u2022 Baby develops a rash, especially blisters or purple spots\n\u2022 Baby has trouble breathing (fast breathing, grunting, ribs showing)\n\u2022 Baby is crying inconsolably and cannot be comforted\n\u2022 Baby seems limp, floppy, or weaker than usual\n\u2022 You are worried for any reason \u2014 trust your instincts',
    },
    {
      heading: 'Follow-Up Instructions',
      body: '\u2022 PCP or ED follow-up in 24 hours for repeat assessment\n\u2022 If blood cultures were sent: results typically available at 24-48h. If positive, you will be called to return.\n\u2022 If on antibiotics: complete the full course as prescribed\n\u2022 Monitor temperature at home: rectal thermometer is most accurate for infants',
    },
  ],
  citations: [
    { num: 1, text: 'Pantell RH, et al. Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics. 2021;148(2):e2021052228.' },
    { num: 9, text: 'Dell Children\u2019s EBOC. Febrile Infant 0-60 Days Clinical Pathway. 2024.' },
  ],
};

// -------------------------------------------------------------------
// Bronchiolitis — NOT Recommended Interventions
// -------------------------------------------------------------------

const BRONCH_NOT_RECOMMENDED: InfoPage = {
  id: 'bronch-not-recommended',
  title: 'NOT Recommended Interventions',
  subtitle: 'Evidence-Based Exclusions — Bronchiolitis',
  sections: [
    {
      heading: 'Labs & Diagnostics — NOT Recommended',
      body: 'The following are **NOT recommended** in routine bronchiolitis:\n\n\u2022 **Chest X-ray** — Does not change management. Leads to inappropriate antibiotic use [1][2]\n\u2022 **Viral testing** — Does not change management in uncomplicated bronchiolitis [1]\n\u2022 **CBC / Blood culture** — Not recommended in well-appearing infants >90 days of age [1]',
    },
    {
      heading: 'Treatments — NOT Recommended',
      body: '\u2022 **Albuterol / bronchodilators** — No benefit in bronchiolitis. Not the same mechanism as asthma [5]\n\u2022 **Epinephrine (racemic)** — Not recommended for routine use\n\u2022 **Systemic or inhaled corticosteroids** — No benefit. Do not reduce admission rates or LOS [1]\n\u2022 **Antibiotics** — Bronchiolitis is viral. Antibiotics do not help unless secondary bacterial infection confirmed [7]\n\u2022 **Hypertonic saline (3%)** — Mixed evidence, not recommended in the ED setting [6]\n\u2022 **Chest physiotherapy** — No benefit. May worsen respiratory distress [8]\n\u2022 **Deep suction beyond nasopharynx** — Harmful. Use gentle superficial nasal suction only [1]',
    },
  ],
  citations: [
    { num: 1, text: 'Ralston SL, et al. Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis. Pediatrics. 2014;134(5):e1474-e1502.' },
    { num: 2, text: 'Christakis DA, et al. Variation in Inpatient Diagnostic Testing and Management of Bronchiolitis. Pediatrics. 2005;115(4):878-84.' },
    { num: 5, text: 'Gadomski AM, Scribani MB. Bronchodilators for Bronchiolitis. Cochrane Database Syst Rev. 2014;(6):CD001266.' },
    { num: 6, text: 'Zhang L, et al. Nebulized Hypertonic Saline for Acute Bronchiolitis. Cochrane Database Syst Rev. 2017;(12):CD006458.' },
    { num: 7, text: 'Spurling GK, et al. Antibiotics for Bronchiolitis in Children. Cochrane Database Syst Rev. 2011;(6):CD005189.' },
    { num: 8, text: 'Perrotta C, et al. Chest Physiotherapy for Acute Bronchiolitis. Cochrane Database Syst Rev. 2012;(2):CD004873.' },
  ],
};

// -------------------------------------------------------------------
// Bronchiolitis — HFNC Protocol Reference
// -------------------------------------------------------------------

const BRONCH_HFNC_PROTOCOL: InfoPage = {
  id: 'bronch-hfnc-protocol',
  title: 'HFNC Protocol Reference',
  subtitle: 'Weight-Based Flow Rates & Monitoring',
  sections: [
    {
      heading: 'Starting Flow Rates',
      body: '\u2022 **<7 kg:** 4 LPM\n\u2022 **7\u20139 kg:** 6 LPM\n\u2022 **>9 kg:** 6 LPM\n\nStart FiO\u2082 at 21%, titrate to maintain SpO\u2082 \u226590% awake or \u226588% asleep.',
    },
    {
      heading: 'Maximum Flow Rates',
      body: '\u2022 **\u22647 kg:** 2 LPM/kg (e.g., 5 kg = 10 LPM, 7 kg = 14 LPM)\n\u2022 **>7 kg:** 14 LPM\n\nEscalate by 2 LPM at a time. Monitor for signs of excess flow.',
    },
    {
      heading: 'Monitoring',
      body: '\u2022 **Initiation:** Q15 min assessment \u2014 BAS score, RR, pulse ox, WOB\n\u2022 **Maintenance:** Continuous pulse ox. Suction PRN. BAS Q4h or per PEWS.\n\u2022 Document HR, RR, pulse ox.',
    },
    {
      heading: 'Contraindications',
      body: '\u2022 Nasal obstruction\n\u2022 Ingestion/toxins\n\u2022 Life-threatening hypoxia, apnea, or hemodynamic instability\n\u2022 Trauma (maxillofacial, suspected base of skull fracture, chest)\n\u2022 Pneumothorax\n\u2022 Foreign body aspiration',
    },
    {
      heading: 'Proceed with Caution',
      body: '\u2022 Decreased level of consciousness\n\u2022 Congenital heart disease\n\u2022 Asthma\n\u2022 Chronic lung disease',
    },
    {
      heading: 'Critical Care Consult Triggers',
      body: '\u2022 Any patient worsening after 60 minutes on HFNC\n\u2022 Severe respiratory distress on HFNC\n\u2022 FiO\u2082 >50%\n\u2022 Flow rates above recommended parameters\n\u2022 Apnea\n\u2022 **NICU consideration:** <44 weeks corrected gestational age, prematurity <32 weeks and <44 weeks post-menstrual age',
    },
  ],
  citations: [
    { num: 1, text: 'Dell Children\'s Medical Center EBOC. Bronchiolitis Clinical Pathway. Rev Oct 2019.' },
    { num: 2, text: 'Dell Children\'s Medical Center EBOC. HFNC Initiation, Maintenance, and Weaning Pathway. Rev Nov 2021.' },
    { num: 3, text: 'New South Wales Ministry of Health. Humidified High Flow Nasal Cannula Oxygen Guideline for Metropolitan Pediatric Wards and EDs. 2016.' },
  ],
};

// -------------------------------------------------------------------
// Bronchiolitis — HFNC Weaning & Holiday Protocol
// -------------------------------------------------------------------

const BRONCH_HFNC_WEANING: InfoPage = {
  id: 'bronch-hfnc-weaning',
  title: 'HFNC Weaning & Holiday Protocol',
  subtitle: 'Stepwise De-escalation',
  sections: [
    {
      heading: 'Prerequisites for Weaning',
      body: '\u2022 Stable on current HFNC settings for **\u22654 hours**\n\u2022 BAS consistently <9\n\u2022 Adequate oral intake or stable on NG/IV fluids',
    },
    {
      heading: 'Weaning Steps',
      body: '\u2022 O\u2082 wean first \u2014 decrease FiO\u2082 to maintain SpO\u2082 goals\n\u2022 Flow wean by physician order \u2014 generally not until stabilized 8\u201312 hours\n\u2022 Decrease flow by **2 LPM every 4 hours**\n\u2022 Change to nasal cannula when on 2 LPM for 4 hours\n\u2022 If BAS \u22659 after decrease, return to previous flow rate',
    },
    {
      heading: 'Holiday Protocol — Eligibility Criteria',
      body: '**All must be met:**\n\u2022 FiO\u2082 <40%\n\u2022 SpO\u2082 >90% awake and >88% asleep\n\u2022 HR within normal limits while calm\n\u2022 BAS <9\n\n**Exclusions:**\n\u2022 Born <32 weeks gestation\n\u2022 Cardiac disease requiring home medications\n\u2022 Chronic lung disease or on home oxygen\n\u2022 Significant neuromuscular disease',
    },
    {
      heading: 'Holiday Protocol — Procedure',
      body: '**Start Holiday BID:**\n\u2022 FiO\u2082 >21%: change to 2 LPM at 100%\n\u2022 FiO\u2082 at 21%: take off HFNC, keep on room air\n\u2022 Monitor in room minimum 5 minutes \u2014 if immediate deterioration, return to previous settings\n\n**Reassess within 30\u201360 minutes:**',
    },
    {
      heading: 'Holiday Outcomes',
      body: '**PASS:** HR, RR, WOB acceptable AND SpO\u2082 >90% \u2192 Wean NC 1 LPM or stay on room air\n\n**PASS TO LFNC:** HR, RR, WOB acceptable BUT SpO\u2082 <90% awake / 88% asleep \u2192 Titrate nasal cannula up to 2 LPM\n\n**NO PASS (Clinical Decompensation):** Severe WOB, HR increase >20 bpm, RR increase by 10 \u2192 Return to previous HFNC settings',
    },
  ],
  citations: [
    { num: 1, text: 'Dell Children\'s Medical Center EBOC. HFNC Initiation, Maintenance, and Weaning Pathway. Rev Nov 2021.' },
  ],
};

// -------------------------------------------------------------------
// Bronchiolitis — HFNC Feeding Guidelines
// -------------------------------------------------------------------

const BRONCH_FEEDING: InfoPage = {
  id: 'bronch-feeding',
  title: 'HFNC Feeding Guidelines',
  subtitle: 'Nutrition Management During Respiratory Support',
  sections: [
    {
      heading: 'Initial Assessment',
      body: 'Upon initiation of HFNC, the child should remain **NPO for approximately 1 hour** to assess clinical response. The attending physician will then determine the appropriate method of nutrition.',
    },
    {
      heading: 'Hydration Options',
      body: 'If hydration status is of concern:\n\u2022 **Nasogastric tube (NGT)** \u2014 recommend initial trial of Pedialyte before EBM or formula\n\u2022 **IV fluids (IVF)**\n\u2022 **NGT + IVF**\n\u2022 **Nasojejunal tube (NJT)**',
    },
    {
      heading: 'Feeding by BAS Score',
      body: '\u2022 **Mild (BAS 0\u20133):** May resume PO feeds. First feed observed by staff.\n\u2022 **Moderate to Severe (BAS 4\u201312):** Consider NG feeds.',
    },
    {
      heading: 'When to Make NPO',
      body: 'If PO feeds have been started, make NPO and consider alternatives if:\n\u2022 Choking/gasping and/or increased WOB during or acutely after PO feeding\n\u2022 Respiratory rate consistently >60 beyond 15 minutes\n\u2022 Child is titrated to maximum HFNC flow rate for weight\n\nAt any time, the physician may make the child NPO and hydrate by other means.',
    },
  ],
  citations: [
    { num: 1, text: 'Dell Children\'s Medical Center EBOC. Bronchiolitis Clinical Pathway. Rev Oct 2019.' },
  ],
};

// -------------------------------------------------------------------
// Bronchiolitis — Hospital Admission Criteria
// -------------------------------------------------------------------

const BRONCH_ADMISSION_CRITERIA: InfoPage = {
  id: 'bronch-admission-criteria',
  title: 'Hospital Admission Criteria',
  subtitle: 'Level of Care Assignment',
  sections: [
    {
      heading: 'Acute Care Unit',
      body: '\u2022 Routine bronchiolitis management\n\u2022 FiO\u2082 <50% to maintain SaO\u2082 \u226590% awake or \u226588% asleep\n\u2022 Continuation of care when transferred from higher acuity unit\n\u2022 HFNC at standard flow rates',
    },
    {
      heading: 'Acute Care Unit with High Acuity Status',
      body: '\u2022 Significant cardiac or pulmonary comorbidities\n\u2022 Moderate to severe symptoms (see BAS scoring)\n\u2022 Worsening clinical status despite increasing flow rates\n\u2022 Comorbidities requiring discussion between provider and charge RN',
    },
    {
      heading: 'PICU',
      body: '\u2022 Any patient with worsening clinical status after **60 minutes** of HFNC\n\u2022 Requiring positive pressure ventilation\n\u2022 Witnessed episode of apnea\n\u2022 Flow rates above maximum recommended levels\n\u2022 Severe dehydration or shock',
    },
    {
      heading: 'NICU Consideration',
      body: '\u2022 Patients not meeting acute care or high acuity criteria and currently <44 weeks corrected gestational age\n\u2022 Prematurity \u226432 weeks gestation and currently <44 weeks post-menstrual age',
    },
  ],
  citations: [
    { num: 1, text: 'Dell Children\'s Medical Center EBOC. Bronchiolitis Clinical Pathway. Rev Oct 2019.' },
  ],
};

// -------------------------------------------------------------------
// Bronchiolitis — Parent Info (English)
// -------------------------------------------------------------------

const BRONCH_PARENT_EN: InfoPage = {
  id: 'bronch-parent-en',
  title: 'Bronchiolitis: What You Need to Know',
  subtitle: 'Parent/Caregiver Information',
  shareable: true,
  sections: [
    {
      heading: 'What Is Bronchiolitis?',
      body: 'Bronchiolitis is an infection of the small airway tubes (bronchioles) in the lungs. The airways become swollen and fill with mucus, causing a stuffy nose, coughing, wheezing, or difficulty breathing.\n\nIt is caused by a virus \u2014 the same viruses that cause common colds. It mostly affects children under 2 years old because they have smaller airways. It usually goes away on its own in 2 to 3 weeks.',
    },
    {
      heading: 'Symptoms',
      body: '\u2022 Breathing harder or faster\n\u2022 Runny or stuffy nose\n\u2022 Wheezing\n\u2022 Fever\n\u2022 Cough that may get worse',
    },
    {
      heading: 'What Can I Do at Home?',
      body: '1. **Watch your child\u2019s breathing.** Always call your doctor if you are not comfortable caring for your child at home.\n\n2. **Fluids are important.** Offer small amounts often. Ask your doctor about Pedialyte if your child is not drinking milk or formula well.\n\n3. **Suction the nose** to help your child breathe, eat, and sleep better. Use saline drops (2\u20133 drops in each nostril) before suctioning with a bulb syringe.',
    },
    {
      heading: 'Signs of Dehydration',
      body: 'Watch for:\n\u2022 No tears when crying\n\u2022 Fewer wet diapers\n\u2022 Dark-colored urine\n\u2022 Dry mouth, tongue, or lips',
    },
    {
      heading: 'Do NOT Use These Treatments',
      body: '1. **No cough or cold medicines** \u2014 they do not work for bronchiolitis and are not safe for young children.\n2. **No antibiotics** \u2014 they do not kill viruses.\n3. **No breathing treatments** (such as albuterol) \u2014 they do not help bronchiolitis.',
    },
    {
      heading: 'When to Call Your Doctor',
      body: '\u2022 Having a harder time breathing\n\u2022 Not eating or drinking as usual\n\u2022 Sleepy, drowsy, or less active\n\u2022 Crying or restless and cannot be calmed\n\u2022 Fever of 100.4\u00b0F (38.0\u00b0C) or higher',
    },
    {
      heading: 'Call 911 or Go to the ER If Your Child:',
      body: '\u2022 Has pale skin or a blue color around nails or lips\n\u2022 Is breathing fast and shallow\n\u2022 Is struggling for each breath\n\u2022 The space between ribs sinks in with each breath\n\u2022 Is making a grunting sound when breathing\n\u2022 Has a limp or floppy body\n\u2022 Is sleepy all the time, even after a nap',
    },
    {
      heading: 'Stop the Spread',
      body: 'Wash your hands:\n\u2022 After caring for your child\n\u2022 Before cooking or eating\n\u2022 After blowing your nose, coughing, or sneezing\n\n**No smoking around your child.** Cigarette smoke irritates infected airways and makes it harder to breathe.',
    },
  ],
  citations: [
    { num: 1, text: 'Children\'s Hospital Association of Texas. Bronchiolitis Patient Education Brochure.' },
  ],
};

// -------------------------------------------------------------------
// Bronchiolitis — Parent Info (Spanish)
// -------------------------------------------------------------------

const BRONCH_PARENT_ES: InfoPage = {
  id: 'bronch-parent-es',
  title: 'Bronquiolitis: Lo Que Necesita Saber',
  subtitle: 'Informaci\u00f3n para Padres y Cuidadores',
  shareable: true,
  sections: [
    {
      heading: '\u00bfQu\u00e9 es la bronquiolitis?',
      body: 'La bronquiolitis es una infecci\u00f3n de las peque\u00f1as v\u00edas respiratorias (bronquiolos) en los pulmones. Las v\u00edas respiratorias se inflaman y se llenan de mucosidad, causando tos, sibilancia o dificultad para respirar.\n\nEs causada por un virus \u2014 los mismos virus que causan los resfriados comunes. Afecta principalmente a ni\u00f1os menores de 2 a\u00f1os. Generalmente desaparece por s\u00ed misma en 2 a 3 semanas.',
    },
    {
      heading: 'S\u00edntomas',
      body: '\u2022 Respiraci\u00f3n m\u00e1s r\u00e1pida o dif\u00edcil\n\u2022 Secreci\u00f3n o congesti\u00f3n nasal\n\u2022 Sibilancia o silbido\n\u2022 Fiebre\n\u2022 Tos que podr\u00eda empeorar',
    },
    {
      heading: '\u00bfQu\u00e9 puedo hacer en casa?',
      body: '1. **Observe la respiraci\u00f3n de su hijo/a.** Siempre llame a su m\u00e9dico si no se siente c\u00f3modo cuidando a su hijo/a en casa.\n\n2. **Los l\u00edquidos son importantes.** Ofrezca peque\u00f1as cantidades con frecuencia. Pregunte a su m\u00e9dico sobre Pedialyte si su hijo/a no est\u00e1 tomando bien la leche o f\u00f3rmula.\n\n3. **Limpie la nariz** para ayudar a su hijo/a a respirar, comer y dormir mejor. Use gotas de soluci\u00f3n salina (2\u20133 gotas en cada fosa nasal) antes de succionar con la pera de succi\u00f3n.',
    },
    {
      heading: 'Se\u00f1ales de Deshidrataci\u00f3n',
      body: 'Preste atenci\u00f3n a:\n\u2022 Ausencia de l\u00e1grimas al llorar\n\u2022 Menos pa\u00f1ales mojados\n\u2022 Orina de color oscuro\n\u2022 Boca, lengua o labios secos',
    },
    {
      heading: 'Tratamientos que NO Debe Usar',
      body: '1. **No use medicamentos para la tos o el resfriado** \u2014 no funcionan contra la bronquiolitis y no son seguros para ni\u00f1os peque\u00f1os.\n2. **No use antibi\u00f3ticos** \u2014 no matan los virus.\n3. **No use tratamientos respiratorios** (como albuterol) \u2014 no ayudan con la bronquiolitis.',
    },
    {
      heading: 'Cu\u00e1ndo Llamar a su M\u00e9dico',
      body: '\u2022 Tiene mucha dificultad para respirar\n\u2022 No come ni bebe como lo hace normalmente\n\u2022 Est\u00e1 adormitado, mareado o menos activo\n\u2022 Llora o est\u00e1 inquieto y no puede calmarlo\n\u2022 Tiene fiebre de 100.4\u00b0F (38.0\u00b0C) o m\u00e1s',
    },
    {
      heading: 'Llame al 911 o Vaya a Urgencias Si Su Hijo/a:',
      body: '\u2022 Se ve p\u00e1lido o tiene un color azul en las u\u00f1as o alrededor de los labios\n\u2022 Su respiraci\u00f3n es r\u00e1pida o superficial\n\u2022 Se esfuerza en cada respiraci\u00f3n\n\u2022 Tiene un espacio entre las costillas que se hunde con cada respiraci\u00f3n\n\u2022 Hace un sonido como gru\u00f1ido cuando respira\n\u2022 Tiene el cuerpo d\u00e9bil o fl\u00e1cido\n\u2022 Est\u00e1 somnoliento todo el tiempo, incluso despu\u00e9s de una siesta',
    },
    {
      heading: 'Detenga el Contagio',
      body: 'L\u00e1vese las manos:\n\u2022 Despu\u00e9s de atender a su hijo/a\n\u2022 Antes de comer\n\u2022 Despu\u00e9s de sonarse, toser o estornudar\n\n**No fume cerca del ni\u00f1o/a.** El humo de cigarro es muy irritante para las v\u00edas respiratorias infectadas.',
    },
  ],
  citations: [
    { num: 1, text: 'Children\u2019s Hospital Association of Texas. Folleto de Educaci\u00f3n al Paciente sobre Bronquiolitis.' },
  ],
};

// -------------------------------------------------------------------
// Precipitous Delivery — Delivery Steps Summary
// -------------------------------------------------------------------

const PRECIP_DELIVERY_SUMMARY: InfoPage = {
  id: 'precip-delivery-summary',
  title: 'Delivery Steps Summary',
  subtitle: 'Quick-reference checklist for ED precipitous delivery',
  sections: [
    {
      heading: 'Preparation',
      body: '• [Page OB and Pediatrics STAT — assign team roles](#/node/precip-callhelp)\n• [Gather delivery equipment and position patient](#/node/precip-equipment)\n• [Confirm vertex presentation with bedside U/S if time permits](#/node/precip-equipment)',
    },
    {
      heading: 'Stage 2 — Delivering the Baby',
      body: '• [Coach pushing: deep breath → bear down 10 sec × 3 per contraction](#/node/precip-coaching)\n• [Support perineum, control occiput — slow, controlled head delivery](#/node/precip-head)\n• [Sweep finger around neck — check for nuchal cord](#/node/precip-nuchal)\n• [If tight cord → double clamp and cut](#/node/precip-nuchal-cut)\n• [Deliver shoulders: gentle downward then upward traction](#/node/precip-shoulders)\n• [If turtle sign → Shoulder Dystocia emergency](#/tree/shoulder-dystocia)',
    },
    {
      heading: 'Cord & Baby',
      body: '• [Clamp cord in two places, cut between — delayed clamping 30–60 sec if vigorous](#/node/precip-cord)\n• [Place baby skin-to-skin, dry and stimulate, APGAR at 1 and 5 min](#/node/precip-baby)\n• [If not breathing or HR <100 → initiate NRP](#/node/precip-baby)',
    },
    {
      heading: 'Stage 3 — Placenta & Postpartum',
      body: '• [Gentle cord traction + counter-pressure on fundus — never force](#/node/precip-placenta)\n• [Inspect placenta for completeness — save for pathology](#/node/precip-placenta-exam)\n• [Start Oxytocin 20 units in 1L NS at 250 mL/hr — bimanual massage](#/node/precip-oxytocin)\n• [Assess lacerations: repair 1st/2nd degree, defer 3rd/4th to OB](#/node/precip-lacerations)\n• [Monitor mom × 1 hour: uterine tone, bleeding, vitals q15 min](#/node/precip-complete)',
    },
  ],
  citations: [
    { num: 1, text: 'Pope KS, Tibbles CD. Precipitous Delivery. In: Walls RM, ed. Rosen\'s Emergency Medicine. 9th ed. Elsevier; 2018.' },
    { num: 2, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. AAP; 2021.' },
  ],
};

// -------------------------------------------------------------------
// Shoulder Dystocia — Steps Summary
// -------------------------------------------------------------------

const SD_SUMMARY: InfoPage = {
  id: 'sd-summary',
  title: 'Shoulder Dystocia Steps Summary',
  subtitle: 'Quick-reference escalation checklist — know the maneuvers before you need them',
  sections: [
    {
      heading: '1. Recognize',
      body: '• [Turtle sign — fetal head retracts against perineum after delivery](#/node/sd-start)\n• [Failure to deliver body with standard traction and pushing](#/node/sd-start)',
    },
    {
      heading: '2. Initial Response',
      body: '• [Announce "shoulder dystocia" — call OB, Peds/NICU, Anesthesia](#/node/sd-initial)\n• [Start the clock — designate timekeeper (call out every 30 sec)](#/node/sd-initial)\n• [You have ~4–5 minutes before hypoxic injury risk](#/node/sd-initial)',
    },
    {
      heading: '3. First-Line (resolves 50–60%)',
      body: '• [McRoberts maneuver — sharply flex legs onto abdomen](#/node/sd-mcroberts)\n• [Suprapubic pressure — fist above pubic bone, push shoulder to oblique](#/node/sd-mcroberts)',
    },
    {
      heading: '4. Second-Line (if first-line fails)',
      body: '• [Wood\'s screw — rotate posterior shoulder 180° in corkscrew fashion](#/node/sd-rotational)\n• [Rubin\'s — push posterior shoulder to flex across chest](#/node/sd-rotational)\n• [Posterior arm delivery — sweep arm across fetal chest](#/node/sd-posterior-arm)',
    },
    {
      heading: '5. Last Resort',
      body: '• [Zavanelli — push head back in, emergency C-section](#/node/sd-last-resort)\n• [All-fours (Gaskin) — mother on hands and knees](#/node/sd-last-resort)\n• [Deliberate clavicle fracture / Symphysiotomy / Abdominal rescue](#/node/sd-last-resort)',
    },
    {
      heading: 'Post-Delivery',
      body: '• [Neonatal assessment — Apgar, check for brachial plexus palsy and fractures](#/node/sd-resolved)\n• [Maternal assessment — lacerations, hemorrhage](#/node/sd-resolved)\n• [Document all maneuvers, timing, and personnel](#/node/sd-resolved)',
    },
  ],
  citations: [
    { num: 1, text: 'ACOG Practice Bulletin No. 40: Shoulder Dystocia. 2002 (Reaffirmed 2015).' },
    { num: 2, text: 'Gherman RB, et al. The McRoberts\' maneuver for shoulder dystocia. Am J Obstet Gynecol. 1997.' },
  ],
};

// -------------------------------------------------------------------
// Page Registry
// -------------------------------------------------------------------

const INFO_PAGES: Record<string, InfoPage> = {
  'doac-pe': DOAC_PE_PAGE,
  'priapism-return-precautions': PRIAPISM_RETURN_PRECAUTIONS,
  'cardioversion-afib': CARDIOVERSION_AFIB_PAGE,
  'croup-return-precautions': CROUP_RETURN_PRECAUTIONS,
  'afib-discharge': AFIB_DISCHARGE_PAGE,
  'pep-patient-info': PEP_PATIENT_INFO,
  'hbv-serology': HBV_SEROLOGY_PAGE,
  'stroke-contraindications': STROKE_CONTRAINDICATIONS_PAGE,
  'stroke-imaging': STROKE_IMAGING_PAGE,
  'stroke-consent': STROKE_CONSENT_PAGE,
  'nstemi-antiplatelet-cx': NSTEMI_ANTIPLATELET_PAGE,
  'nstemi-conservative': NSTEMI_CONSERVATIVE_PAGE,
  'nstemi-pocus': NSTEMI_POCUS_PAGE,
  'nstemi-minoca': NSTEMI_MINOCA_PAGE,
  'k-hyper-ecg-info': K_HYPER_ECG_PAGE,
  'k-hypo-ecg-info': K_HYPO_ECG_PAGE,
  'uti-definition-info': UTI_DEFINITION_PAGE,
  'pf-hsv-criteria': PF_HSV_CRITERIA_PAGE,
  'pf-ceftriaxone-ci': PF_CEFTRIAXONE_CI_PAGE,
  'pf-abx-dosing': PF_ABX_DOSING_PAGE,
  'pf-uti-risk': PF_UTI_RISK_PAGE,
  'pf-ua-interpret': PF_UA_INTERPRET_PAGE,
  'pf-discharge': PF_DISCHARGE_PAGE,
  'bronch-not-recommended': BRONCH_NOT_RECOMMENDED,
  'bronch-hfnc-protocol': BRONCH_HFNC_PROTOCOL,
  'bronch-hfnc-weaning': BRONCH_HFNC_WEANING,
  'bronch-feeding': BRONCH_FEEDING,
  'bronch-admission-criteria': BRONCH_ADMISSION_CRITERIA,
  'bronch-parent-en': BRONCH_PARENT_EN,
  'bronch-parent-es': BRONCH_PARENT_ES,
  'precip-delivery-summary': PRECIP_DELIVERY_SUMMARY,
  'sd-summary': SD_SUMMARY,
};

// -------------------------------------------------------------------
// Body Text with Clickable Footnotes
// -------------------------------------------------------------------

/** Append text to a parent element, converting **bold** markers to <strong> elements. */
function infoBoldAware(parent: HTMLElement, text: string): void {
  const boldPattern = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = boldPattern.exec(text)) !== null) {
    if (m.index > last) parent.appendChild(document.createTextNode(text.slice(last, m.index)));
    const strong = document.createElement('strong');
    strong.textContent = m[1];
    parent.appendChild(strong);
    last = m.index + m[0].length;
  }
  if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
  if (last === 0 && text.length > 0) parent.textContent = text;
}

/** Render a line of info page body text with inline links, bold, and citation refs. */
function renderInfoBodyLine(container: HTMLElement, line: string): void {
  // Combined pattern: markdown links [text](#/path) OR citation refs [N]
  const combinedPattern = /\[([^\]]+)\]\((#\/[^)]+)\)|\[(\d+)\](?:\[(\d+)\])*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let hasMatch = false;

  while ((match = combinedPattern.exec(line)) !== null) {
    hasMatch = true;
    // Text before this match
    if (match.index > lastIndex) {
      infoBoldAware(container, line.slice(lastIndex, match.index));
    }

    if (match[1] && match[2]) {
      // Markdown link: [label](#/type/id)
      const linkLabel = match[1];
      const linkUrl = match[2];
      const parts = linkUrl.replace(/^#\//, '').split('/');
      const linkType = parts[0];
      const linkId = parts.slice(1).join('/');
      const btn = document.createElement('button');
      btn.className = 'body-inline-link';
      btn.textContent = linkLabel;
      btn.setAttribute('data-link-type', linkType);
      btn.setAttribute('data-link-id', linkId);
      btn.addEventListener('click', () => {
        destroyOverlay();
        if (linkType === 'node') {
          // Dispatch custom event for tree wizard to handle node jump
          window.dispatchEvent(new CustomEvent('medkitt-jump-node', { detail: linkId }));
        } else if (linkType === 'tree') {
          window.location.hash = '#/tree/' + linkId;
        } else if (linkType === 'drug') {
          // Re-open as drug modal after brief delay to let overlay destroy
          const slashIdx = linkId.indexOf('/');
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('medkitt-show-drug', {
              detail: slashIdx !== -1 ? { id: linkId.slice(0, slashIdx), hint: linkId.slice(slashIdx + 1) } : { id: linkId }
            }));
          }, 50);
        }
      });
      container.appendChild(btn);
    } else {
      // Citation ref: [N] or [N][N]
      const fullMatch = match[0];
      const nums = fullMatch.match(/\d+/g) ?? [];
      for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const btn = document.createElement('button');
        btn.className = 'cite-link';
        btn.textContent = `[${num}]`;
        btn.addEventListener('click', () => scrollToCitation(num));
        container.appendChild(btn);
      }
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text after last match
  if (lastIndex < line.length) {
    infoBoldAware(container, line.slice(lastIndex));
  }

  // If no matches found, render with bold support
  if (!hasMatch) {
    infoBoldAware(container, line);
  }
}

/** Scroll to a citation in the references section, opening it if collapsed. */
function scrollToCitation(num: string): void {
  // Open the details element if closed
  const details = document.querySelector('.info-page-citations') as HTMLDetailsElement | null;
  if (details && !details.open) {
    details.open = true;
  }

  // Scroll to the citation
  const target = document.getElementById(`info-cite-${num}`);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Brief highlight
    target.classList.add('cite-highlight');
    setTimeout(() => target.classList.remove('cite-highlight'), 1500);
  }
}

// -------------------------------------------------------------------
// Pictograph Renderer
// -------------------------------------------------------------------

function renderPictograph(picto: Pictograph): HTMLElement {
  const container = document.createElement('div');
  container.className = 'pictograph';

  const title = document.createElement('div');
  title.className = 'pictograph-title';
  title.textContent = picto.title;
  container.appendChild(title);

  // Dot grid — 10 per row
  const grid = document.createElement('div');
  grid.className = 'pictograph-grid';

  for (const group of picto.groups) {
    for (let i = 0; i < group.count; i++) {
      if (group.symbol) {
        const sym = document.createElement('span');
        sym.className = 'pictograph-symbol';
        sym.textContent = group.symbol;
        grid.appendChild(sym);
      } else {
        const dot = document.createElement('span');
        dot.className = 'pictograph-dot';
        dot.style.backgroundColor = group.color;
        grid.appendChild(dot);
      }
    }
  }
  container.appendChild(grid);

  // Legend
  const legend = document.createElement('div');
  legend.className = 'pictograph-legend';

  for (const group of picto.groups) {
    const item = document.createElement('div');
    item.className = 'pictograph-legend-item';

    if (group.symbol) {
      const sym = document.createElement('span');
      sym.className = 'pictograph-legend-symbol';
      sym.textContent = group.symbol;
      item.appendChild(sym);
    } else {
      const dot = document.createElement('span');
      dot.className = 'pictograph-legend-dot';
      dot.style.backgroundColor = group.color;
      item.appendChild(dot);
    }

    const label = document.createElement('span');
    label.textContent = group.label;
    item.appendChild(label);

    legend.appendChild(item);
  }
  container.appendChild(legend);

  return container;
}

// -------------------------------------------------------------------
// Modal Overlay
// -------------------------------------------------------------------

let overlayEl: HTMLElement | null = null;

function destroyOverlay(): void {
  overlayEl?.remove();
  overlayEl = null;
}

/** Build plain-text version of an info page for sharing via SMS/email */
function buildShareText(page: InfoPage): string {
  const lines: string[] = [];
  lines.push(page.title.toUpperCase());
  lines.push('');
  for (const section of page.sections) {
    if (section.heading) {
      lines.push(section.heading.toUpperCase());
    }
    if (section.body) {
      // Strip **bold** markers for plain text
      lines.push(section.body.replace(/\*\*(.+?)\*\*/g, '$1'));
    }
    if (section.pictographs) {
      for (const picto of section.pictographs) {
        lines.push(picto.title);
        for (const group of picto.groups) {
          lines.push(`\u2022 ${group.label}`);
        }
        lines.push('');
      }
    }
    lines.push('');
  }
  lines.push('Source: MedKitt Clinical Decision Support \u2014 for informational purposes only.');
  return lines.join('\n').trim();
}

/** Share an info page via Web Share API, with clipboard fallback */
async function shareInfoPage(page: InfoPage): Promise<void> {
  const text = buildShareText(page);

  if (navigator.share) {
    try {
      await navigator.share({
        title: page.title,
        text: text,
      });
    } catch {
      // User cancelled share — do nothing
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(text);
      showCopiedToast();
    } catch {
      // Last resort: prompt with text
      prompt('Copy this text to share:', text);
    }
  }
}

/** Brief toast notification for clipboard copy */
function showCopiedToast(): void {
  const toast = document.createElement('div');
  toast.className = 'share-toast';
  toast.textContent = 'Copied to clipboard';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

/** Show an info page as a modal overlay. Returns false if pageId not found. */
export function showInfoModal(pageId: string): boolean {
  const page = INFO_PAGES[pageId];
  if (!page) return false;

  destroyOverlay();

  // Create overlay
  overlayEl = document.createElement('div');
  overlayEl.className = 'modal-overlay info-modal-overlay active';
  overlayEl.addEventListener('click', (e) => {
    if (e.target === overlayEl) destroyOverlay();
  });

  // Panel
  const panel = document.createElement('div');
  panel.className = 'modal-content info-modal-panel';

  // Header
  const header = document.createElement('div');
  header.className = 'modal-header';

  const titleWrap = document.createElement('div');

  const title = document.createElement('h3');
  title.textContent = page.title;
  titleWrap.appendChild(title);

  const subtitle = document.createElement('div');
  subtitle.className = 'info-modal-subtitle';
  subtitle.textContent = page.subtitle;
  titleWrap.appendChild(subtitle);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn-text';
  closeBtn.textContent = '\u2715';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.addEventListener('click', destroyOverlay);

  header.appendChild(titleWrap);
  header.appendChild(closeBtn);
  panel.appendChild(header);

  // Body
  const body = document.createElement('div');
  body.className = 'modal-body info-modal-body';

  for (const section of page.sections) {
    const sectionEl = document.createElement('div');
    sectionEl.className = 'info-page-section';

    if (section.heading) {
      const h = document.createElement('h2');
      h.className = 'info-page-section-heading';
      h.textContent = section.heading;
      sectionEl.appendChild(h);
    }

    if (section.body) {
      const lines = section.body.split('\n');
      for (const line of lines) {
        if (line.trim() === '') {
          sectionEl.appendChild(document.createElement('br'));
        } else {
          const p = document.createElement('p');
          p.className = 'info-page-text';
          renderInfoBodyLine(p, line);
          sectionEl.appendChild(p);
        }
      }
    }

    if (section.drugTable) {
      for (const drug of section.drugTable) {
        const card = document.createElement('div');
        card.className = 'info-page-drug-card';

        const drugName = document.createElement('div');
        drugName.className = 'info-page-drug-name';
        drugName.textContent = drug.drug;
        card.appendChild(drugName);

        const regimen = document.createElement('div');
        regimen.className = 'info-page-drug-regimen';
        regimen.textContent = drug.regimen;
        card.appendChild(regimen);

        sectionEl.appendChild(card);
      }
    }

    if (section.pictographs) {
      for (const picto of section.pictographs) {
        sectionEl.appendChild(renderPictograph(picto));
      }
    }

    body.appendChild(sectionEl);
  }

  // Citations
  const citSection = document.createElement('details');
  citSection.className = 'info-page-citations';

  const citSummary = document.createElement('summary');
  citSummary.textContent = `References (${page.citations.length})`;
  citSection.appendChild(citSummary);

  const citList = document.createElement('div');
  citList.className = 'reference-citation-list';
  for (const cite of page.citations) {
    const item = document.createElement('div');
    item.className = 'reference-citation-item';
    item.id = `info-cite-${cite.num}`;

    const numEl = document.createElement('span');
    numEl.className = 'reference-citation-num';
    numEl.textContent = `[${cite.num}]`;

    const textEl = document.createElement('span');
    textEl.className = 'reference-citation-text';
    textEl.textContent = cite.text;

    item.appendChild(numEl);
    item.appendChild(textEl);
    citList.appendChild(item);
  }
  citSection.appendChild(citList);
  body.appendChild(citSection);

  // Share button (patient-facing info pages only)
  if (page.shareable) {
    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn-primary info-share-btn';
    shareBtn.textContent = 'Share with Patient';
    shareBtn.addEventListener('click', () => shareInfoPage(page));
    body.appendChild(shareBtn);
  }

  // Disclaimer
  const disclaimer = document.createElement('div');
  disclaimer.className = 'reference-disclaimer';
  disclaimer.textContent = 'Clinical decision support only. Verify against current guidelines and institutional protocols.';
  body.appendChild(disclaimer);

  panel.appendChild(body);
  overlayEl.appendChild(panel);
  document.body.appendChild(overlayEl);

  return true;
}
