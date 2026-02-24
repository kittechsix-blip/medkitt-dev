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
// Page Registry
// -------------------------------------------------------------------

const INFO_PAGES: Record<string, InfoPage> = {
  'doac-pe': DOAC_PE_PAGE,
  'priapism-return-precautions': PRIAPISM_RETURN_PRECAUTIONS,
  'cardioversion-afib': CARDIOVERSION_AFIB_PAGE,
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
};

// -------------------------------------------------------------------
// Body Text with Clickable Footnotes
// -------------------------------------------------------------------

/** Render a line of info page body text, making [N] citation refs clickable. */
function renderInfoBodyLine(container: HTMLElement, line: string): void {
  const citePattern = /\[(\d+)\](?:\[(\d+)\])*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = citePattern.exec(line)) !== null) {
    // Text before the citation(s)
    if (match.index > lastIndex) {
      container.appendChild(document.createTextNode(line.slice(lastIndex, match.index)));
    }

    // The full match might be [1][2] or [1], [2] — parse all numbers
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

    lastIndex = match.index + fullMatch.length;
  }

  // Remaining text after last citation
  if (lastIndex < line.length) {
    container.appendChild(document.createTextNode(line.slice(lastIndex)));
  }

  // If no citations found, just set text
  if (lastIndex === 0) {
    container.textContent = line;
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
