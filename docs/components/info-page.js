// MedKitt — Clinical Info Modals
// Slide-up modal overlays for detailed clinical reference content.
// Triggered from inline links in decision tree body text.
// User stays in tree context — close modal to continue.
// -------------------------------------------------------------------
// DOAC for PE
// -------------------------------------------------------------------
const DOAC_PE_PAGE = {
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
const PRIAPISM_RETURN_PRECAUTIONS = {
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
const CARDIOVERSION_AFIB_PAGE = {
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
const AFIB_DISCHARGE_PAGE = {
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
const PEP_PATIENT_INFO = {
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
const HBV_SEROLOGY_PAGE = {
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
const STROKE_CONTRAINDICATIONS_PAGE = {
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
const STROKE_IMAGING_PAGE = {
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
const STROKE_CONSENT_PAGE = {
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
const NSTEMI_ANTIPLATELET_PAGE = {
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
const NSTEMI_CONSERVATIVE_PAGE = {
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
const NSTEMI_POCUS_PAGE = {
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
const NSTEMI_MINOCA_PAGE = {
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
// Troponin Sensitivity (NSTEMI)
// -------------------------------------------------------------------
const NSTEMI_TROPONIN_SENSITIVITY_PAGE = {
    id: 'nstemi-troponin-sensitivity',
    title: 'Interpreting Troponin Sensitivity',
    subtitle: 'Time-Dependent Diagnostic Accuracy of Troponin Assays',
    sections: [
        {
            body: 'Troponin sensitivity for detecting acute coronary syndrome is **highly time-dependent**. Early presenters (within 2\u20134 hours of symptom onset) have significantly lower sensitivity compared to later presenters. High-sensitivity troponin (hs-cTn) assays substantially improve early detection compared to conventional assays.',
        },
        {
            heading: 'Timing of Troponin Release',
            body: 'Troponin is released from the myocardium **as early as 2\u20134 hours after symptom onset** in acute MI. [1] However, depending on the assay, values may not become abnormal for up to 12 hours. [1] Diagnostic accuracy increases progressively with time from symptom onset. [2]\n\n**Sensitive troponin assays** maintain excellent diagnostic accuracy (AUC 0.90\u20130.94) even within 2 hours of symptom onset, while standard assays show markedly inferior performance (AUC ~0.71) at these early time points. [3]',
        },
        {
            heading: 'High-Sensitivity Troponin Advantages',
            body: 'hs-cTn assays have **superior sensitivity** compared to conventional assays, particularly in early presenters. [4][5] The time from chest pain onset to detectable troponin concentration is shorter with hs-cTn, enabling more rapid rule-in or rule-out. [4][6]\n\nApproximately **one-third of NSTEMI patients take longer than 3 hours** from symptom onset to exceed common rule-out thresholds (5 ng/L). [7]',
        },
        {
            heading: 'Serial Testing Recommendations',
            body: '**Fourth Universal Definition of MI [8]:**\n\u2022 Conventional assays: sample at 0h, repeat at 3\u20136 hours\n\u2022 hs-cTn assays: sample at 0h, repeat at 1\u20132 hours\n\n**Single-measurement rule-out (select patients):**\n\u2022 In early presenters (\u22642h from onset), a single hs-cTn below the limit of detection (2 ng/L) achieves 99.4% sensitivity and 99.7% NPV [9]\n\u2022 This strategy should NOT be used in very early presenters (<2h) or high-risk patients\n\u2022 hs-cTn sensitivity remains consistently high across subgroups including early presenters [10]',
        },
        {
            heading: 'Clinical Pearl',
            body: '**A single negative troponin does not rule out ACS in early presenters.** Serial troponin measurements are essential, especially when symptom onset is <3 hours before presentation. hs-cTn assays narrow the diagnostic window but do not eliminate it.',
        },
    ],
    citations: [
        { num: 1, text: 'Amsterdam EA, et al. 2014 AHA/ACC Guideline for Management of NSTE-ACS. J Am Coll Cardiol. 2014;64(24):e139-e228.' },
        { num: 2, text: 'Guangquan L, et al. Time From Symptom Onset Influences hs-TnT Diagnostic Accuracy for AMI. Clin Chem Lab Med. 2016;54(1):133-42.' },
        { num: 3, text: 'Reichlin T, et al. Early Diagnosis of MI with Sensitive Cardiac Troponin Assays. N Engl J Med. 2009;361(9):858-67.' },
        { num: 4, text: 'Rao SV, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for Management of ACS. J Am Coll Cardiol. 2025;S0735-1097(24)10424-X.' },
        { num: 5, text: 'Bergmark BA, et al. Acute Coronary Syndromes. Lancet. 2022;399(10332):1347-1358.' },
        { num: 6, text: 'Gulati M, et al. 2021 AHA/ACC Guideline for Evaluation and Diagnosis of Chest Pain. J Am Coll Cardiol. 2021;78(22):e187-e285.' },
        { num: 7, text: 'Pickering JW, et al. Early Kinetic Profiles of Troponin I and T by hs Assays in MI. Clin Chim Acta. 2020;505:15-25.' },
        { num: 8, text: 'Thygesen K, et al. Fourth Universal Definition of Myocardial Infarction (2018). J Am Coll Cardiol. 2018;72(18):2231-2264.' },
        { num: 9, text: 'Lowry MTH, et al. Troponin in Early Presenters to Rule Out MI. Eur Heart J. 2023;44(30):2846-2858.' },
        { num: 10, text: 'Carlton E, et al. Evaluation of hs-cTnI Levels in Suspected ACS. JAMA Cardiol. 2016;1(4):405-12.' },
    ],
};
// -------------------------------------------------------------------
// Hyperkalemia ECG Findings
// -------------------------------------------------------------------
const K_HYPER_ECG_PAGE = {
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
const K_HYPO_ECG_PAGE = {
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
const CROUP_RETURN_PRECAUTIONS = {
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
const UTI_DEFINITION_PAGE = {
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
const PF_HSV_CRITERIA_PAGE = {
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
const PF_CEFTRIAXONE_CI_PAGE = {
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
const PF_ABX_DOSING_PAGE = {
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
const PF_UTI_RISK_PAGE = {
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
const PF_UA_INTERPRET_PAGE = {
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
const PF_DISCHARGE_PAGE = {
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
const BRONCH_NOT_RECOMMENDED = {
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
const BRONCH_HFNC_PROTOCOL = {
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
const BRONCH_HFNC_WEANING = {
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
const BRONCH_FEEDING = {
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
const BRONCH_ADMISSION_CRITERIA = {
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
const BRONCH_PARENT_EN = {
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
const BRONCH_PARENT_ES = {
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
const PRECIP_DELIVERY_SUMMARY = {
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
const SD_SUMMARY = {
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
// A-Fib RVR — Steps Summary
// -------------------------------------------------------------------
const AFIB_SUMMARY = {
    id: 'afib-summary',
    title: 'A-Fib RVR Management Steps',
    subtitle: 'Quick-reference for rate control, cardioversion, and anticoagulation',
    sections: [
        {
            heading: '1. Initial Assessment',
            body: '• [Confirm A-Fib RVR on 12-lead ECG — identify precipitants](#/node/afib-start)\n• [Assess hemodynamic stability](#/node/afib-stability)',
        },
        {
            heading: '2. Unstable — Cardiovert',
            body: '• [Screen for WPW — if yes, AV nodal blockers are CONTRAINDICATED](#/node/afib-unstable-wpw)\n• [Synchronized cardioversion 200J biphasic + sedation](#/node/afib-cardioversion-protocol)',
        },
        {
            heading: '3. Stable — Rate Control',
            body: '• [Beta-blocker (Metoprolol) or CCB (Diltiazem) — do NOT combine](#/node/afib-stable-drugs)\n• [CCB contraindicated if EF ≤40% or decompensated HF](#/node/afib-stable-drugs)\n• [IV Magnesium as adjunct — blocks slow Ca channels at AV node](#/node/afib-stable-drugs)',
        },
        {
            heading: '4. Refractory — Escalate',
            body: '• [Add IV Magnesium, Digoxin, or switch to Amiodarone](#/node/afib-refractory)\n• [Consider rhythm control if rate control fails](#/node/afib-rhythm-control)',
        },
        {
            heading: '5. Anticoagulation',
            body: '• [NOAF — generally do NOT anticoagulate (will revert)](#/node/afib-noaf-anticoag)\n• [Known/Chronic AF — CHA₂DS₂-VASc score guides anticoagulation](#/node/afib-cha2ds2vasc)',
        },
        {
            heading: '6. Disposition',
            body: '• [Continue agent that achieved rate control — target HR <100–110](#/node/afib-disposition)\n• [Cardiology follow-up for new-onset AF or refractory symptoms](#/node/afib-disposition)',
        },
    ],
    citations: [
        { num: 1, text: 'Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for Atrial Fibrillation. J Am Coll Cardiol. 2024.' },
    ],
};
// -------------------------------------------------------------------
// PE Treatment — Steps Summary
// -------------------------------------------------------------------
const PE_SUMMARY = {
    id: 'pe-summary',
    title: 'PE Treatment Steps Summary',
    subtitle: 'Risk stratification and management by hemodynamic status',
    sections: [
        {
            heading: '1. Risk Stratify',
            body: '• [Assess hemodynamic stability (SBP <90 = high risk)](#/node/pe-hemodynamics)\n• [Evaluate RV function on echo or CTPA](#/node/pe-rv)\n• [Check troponin for myocardial injury](#/node/pe-troponin-rv-pos)\n• [PESI/sPESI for clinical severity](#/node/pe-severity)',
        },
        {
            heading: '2. High Risk (Unstable)',
            body: '• [Start IV heparin (bolus 80 u/kg then 18 u/kg/hr)](#/node/pe-high-heparin)\n• [Screen for thrombolytic contraindications](#/node/pe-high-lytic-check)\n• [Alteplase 100 mg over 2 hours — stop heparin during infusion](#/node/pe-high-lytic-protocol)\n• [If thrombolysis fails → mechanical thrombectomy, CDT, or ECMO](#/node/pe-high-respond-no)',
        },
        {
            heading: '3. Intermediate-High Risk',
            body: '• [IV heparin + evaluate reperfusion strategy](#/node/pe-int-high-strategy)\n• [CDT/EKOS for moderate clot, CDT + mechanical for severe/proximal](#/node/pe-int-high-strategy)\n• [Monitor on systemic heparin trial if stable](#/node/pe-int-high-heparin)',
        },
        {
            heading: '4. Intermediate-Low Risk',
            body: '• [Start anticoagulation — UFH or LMWH (enoxaparin)](#/node/pe-int-low-treat)\n• [Monitor for clinical worsening — escalate if needed](#/node/pe-int-low-treat)',
        },
        {
            heading: '5. Low Risk',
            body: '• [Anticoagulate — UFH, LMWH, or oral DOAC](#/node/pe-low-treat)\n• [Consider outpatient management if all discharge criteria met](#/node/pe-low-treat)',
        },
    ],
    citations: [
        { num: 1, text: 'Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020.' },
    ],
};
// -------------------------------------------------------------------
// Hyperkalemia — Steps Summary
// -------------------------------------------------------------------
const K_SUMMARY = {
    id: 'k-summary',
    title: 'Potassium Disorders Steps Summary',
    subtitle: 'Stepwise management of hyperkalemia and hypokalemia',
    sections: [
        {
            heading: '1. Initial Assessment',
            body: '• [Check K+ level — classify as hyperK, hypoK, or borderline](#/node/k-start)\n• [Rule out pseudohyperkalemia if result is unexpected](#/node/k-pseudo)\n• [Get ECG immediately for any hyperkalemia](#/node/k-hyper-ecg)',
        },
        {
            heading: '2. Severe HyperK — Temporize (all simultaneously)',
            body: '• [IV Calcium (Gluconate 3g or Chloride 1g) — membrane stabilization](#/node/k-hyper-calcium)\n• [Regular Insulin 5 units IV + Dextrose — intracellular K+ shift](#/node/k-hyper-insulin)\n• [Terbutaline 0.5 mg SQ or Albuterol 10–20 mg neb — K+ shift](#/node/k-hyper-beta2)',
        },
        {
            heading: '3. Volume Resuscitate',
            body: '• [Bicarb <22 → isotonic bicarbonate as resuscitative fluid](#/node/k-hyper-bicarb)\n• [Bicarb ≥22 → LR or Plasmalyte. Do NOT use normal saline](#/node/k-hyper-step2)',
        },
        {
            heading: '4. Kaliuresis + Elimination',
            body: '• [Furosemide ± thiazide ± acetazolamide ± fludrocortisone ("nephron bomb")](#/node/k-hyper-step3)\n• [Lokelma (SZC) 10g PO q8h — mild adjunct, do not rely on alone](#/node/k-hyper-step4)\n• [Dialysis if anuric or all other measures fail](#/node/k-hyper-step5)',
        },
        {
            heading: '5. Hypokalemia',
            body: '• [Severe (K+ ≤2.5) → KCl 5–10 mEq IV over 15–30 min with cardiac monitoring](#/node/k-hypo-severe)\n• [Mild-Moderate → KCl 20–40 mEq PO](#/node/k-hypo-mild)\n• [Always check and correct magnesium — hypoMg makes K+ repletion refractory](#/node/k-hypo-severe)',
        },
    ],
    citations: [
        { num: 1, text: 'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024.' },
    ],
};
// -------------------------------------------------------------------
// Acute Ischemic Stroke — Steps Summary
// -------------------------------------------------------------------
const STROKE_SUMMARY = {
    id: 'stroke-summary',
    title: 'Ischemic Stroke Steps Summary',
    subtitle: 'Time-critical reperfusion pathway — every minute counts',
    sections: [
        {
            heading: '1. Immediate Actions',
            body: '• [Fingerstick glucose (only required pre-tPA lab)](#/node/stroke-start)\n• [NIHSS score — disabling if ≥6](#/node/stroke-deficit)\n• [Establish last known well time](#/node/stroke-timing)\n• [CT head non-contrast to rule out hemorrhage](#/node/stroke-start)',
        },
        {
            heading: '2. Standard IVT Window (0–4.5h)',
            body: '• [Review thrombolysis contraindications — BP must be <185/110](#/node/stroke-ivt-check)\n• [Tenecteplase 0.25 mg/kg IV bolus (preferred) or Alteplase 0.9 mg/kg](#/node/stroke-ivt-treat)\n• [Post-tPA: BP <180/105 × 24h, neuro checks q15min, no antithrombotics × 24h](#/node/stroke-ivt-treat)',
        },
        {
            heading: '3. Extended Window + EVT',
            body: '• [4.5–9h → perfusion imaging for IVT eligibility (EXTEND criteria)](#/node/stroke-extended-ivt)\n• [LVO on CTA → activate neurointerventional team for EVT](#/node/stroke-evt-eligible)\n• [EVT window up to 24h with LVO + favorable perfusion (DAWN/DEFUSE-3)](#/node/stroke-evt-window)',
        },
        {
            heading: '4. Minor Stroke (NIHSS 0–5)',
            body: '• [ABCD2 ≥4 or infarct → DAPT: Aspirin 325 + Clopidogrel 300 load](#/node/stroke-dapt)\n• [Low risk → single antiplatelet (Aspirin)](#/node/stroke-single-antiplatelet)',
        },
        {
            heading: '5. Secondary Prevention',
            body: '• [AF detected → DOAC (Apixaban or Rivaroxaban), do NOT bridge with heparin](#/node/stroke-afib)\n• [Carotid stenosis 70–99% → CEA within 2 weeks](#/node/stroke-atherosclerotic)\n• [High-intensity statin for all, BP target <130/80](#/node/stroke-other-prevention)',
        },
    ],
    citations: [
        { num: 1, text: 'Powers WJ, et al. 2019 Guidelines for Early Management of Acute Ischemic Stroke. Stroke. 2019.' },
    ],
};
// -------------------------------------------------------------------
// Pneumothorax POCUS — Steps Summary
// -------------------------------------------------------------------
const PTX_SUMMARY = {
    id: 'ptx-summary',
    title: 'Pneumothorax POCUS Steps Summary',
    subtitle: 'Sequential sonographic signs for bedside pneumothorax diagnosis',
    sections: [
        {
            heading: 'Setup',
            body: '• [High-frequency linear probe, longitudinal, anterior chest 3rd–4th ICS MCL](#/node/pneumothorax-start)\n• [Patient supine — free air rises anteriorly](#/node/pneumothorax-start)',
        },
        {
            heading: 'Step 1: Lung Sliding',
            body: '• [Lung sliding PRESENT → pneumothorax excluded at this location](#/node/ptx-lung-sliding)\n• [Lung sliding ABSENT → proceed to B-line assessment](#/node/ptx-lung-sliding)',
        },
        {
            heading: 'Step 2: B-Lines',
            body: '• [B-lines present (even without sliding) → NOT pneumothorax](#/node/ptx-blines-check)\n• [No B-lines + no sliding (A-lines only) → high suspicion for PTX](#/node/ptx-a-profile)',
        },
        {
            heading: 'Step 3: Lung Point',
            body: '• [Scan laterally — find transition zone where sliding resumes](#/node/ptx-lung-point)\n• [Lung point found → PNEUMOTHORAX CONFIRMED (100% specific, pathognomonic)](#/node/ptx-confirmed)\n• [Location estimates size: anterior=small, lateral=moderate, posterior=large](#/node/ptx-confirmed)',
        },
        {
            heading: 'Step 4: M-Mode',
            body: '• [Barcode/stratosphere sign → highly suggestive (no lung movement)](#/node/ptx-mmode)\n• [Seashore sign → normal lung movement, reassess findings](#/node/ptx-reassess)',
        },
    ],
    citations: [
        { num: 1, text: 'Lichtenstein DA, et al. Ultrasound Diagnosis of Occult Pneumothorax. Crit Care Med. 2005.' },
    ],
};
// -------------------------------------------------------------------
// Page Registry
// -------------------------------------------------------------------
// -------------------------------------------------------------------
// Neonatal Resuscitation (NRP) — Steps Summary
// -------------------------------------------------------------------
const NRP_SUMMARY = {
    id: 'nrp-summary',
    title: 'NRP Steps Summary',
    subtitle: 'Quick-reference checklist for neonatal resuscitation',
    sections: [
        {
            heading: '1. Preparation',
            body: '• [Assign team roles — leader, airway, compressor, meds, recorder](#/node/nrp-preparation)\n• [Monitoring setup: SpO2 right wrist (preductal), temp over liver](#/node/nrp-preparation)\n• [Equipment: radiant warmer ON, T-piece, pulse ox, suction, intubation kit, UVC kit](#/node/nrp-preparation)\n• [Cord management plan: DCC 30-60s vigorous, ICM ≥35wk non-vigorous](#/node/nrp-cord-mgmt)',
        },
        {
            heading: '2. Initial Evaluation',
            body: '• [Three questions: Term? Breathing/Crying? Good Tone?](#/node/nrp-initial-eval)\n• [Yes to ALL → routine care (skin-to-skin, DCC, warmth)](#/node/nrp-routine)\n• [No to ANY → proceed to initial steps](#/node/nrp-initial-steps)',
        },
        {
            heading: '3. Initial Steps — Golden 30 Seconds',
            body: '• [Warm (radiant heater, NO blankets), Dry, Position (sniffing), Stimulate (flick feet, rub back)](#/node/nrp-initial-steps)\n• [Clear airway PRN — mouth then nose, avoid vigorous suctioning](#/node/nrp-initial-steps)\n• [Meconium: do NOT delay PPV for suctioning (2025)](#/node/nrp-meconium)\n• [30-sec reassessment: breathing + HR ≥100 → post-resus care](#/node/nrp-golden30-eval)',
        },
        {
            heading: '4. PPV (HR <100 or apnea)',
            body: '• [T-piece preferred, C-E grip, PIP 20-25, rate 40-60/min, 21% FiO2 ≥35wk](#/node/nrp-ppv)\n• [SpO2 targets: 1\u2019=60-65%, 5\u2019=80-85%, 10\u2019=85-95%](#/node/nrp-spo2-targets)\n• [If not improving → MR SOPA corrective steps](#/node/nrp-corrective)\n• [Advanced airway: ETT or LMA ≥34wk >2kg](#/node/nrp-advanced-airway)\n• [Neonatal numbers: ETT, blade, UVC, epi, glucose, fluids](#/node/nrp-ett-sizing)',
        },
        {
            heading: '5. CPR (HR <60 despite effective PPV)',
            body: '• [MUST intubate first — 2-thumb encircling, 3:1 ratio, 120 events/min](#/node/nrp-cpr)\n• [100% FiO2, establish UVC/IO access](#/node/nrp-cpr)\n• [Reassess every 60 seconds](#/node/nrp-cpr-eval)',
        },
        {
            heading: '6. Medications (HR <60 after CPR)',
            body: '• [Epinephrine IV/IO: 0.01-0.03 mg/kg of 1:10,000 q3-5min](#/node/nrp-epinephrine)\n• [UVC procedure: 2 arteries, 1 vein — insert 2 cm](#/node/nrp-uvc)\n• [Volume: NS 10 mL/kg, pRBCs 10 mL/kg, D10W 2 mL/kg](#/node/nrp-volume)\n• [No response after 20 min → consider discontinuation](#/node/nrp-discontinuation)',
        },
        {
            heading: '7. Post-Resuscitation',
            body: '• [APGAR at 1, 5, 10 min — normothermia 36.5-37.5°C](#/node/nrp-postresus)\n• [Glucose monitoring, NICU transfer, therapeutic hypothermia criteria](#/node/nrp-postresus)\n• [Family communication and team debrief](#/node/nrp-postresus)',
        },
    ],
    citations: [
        { num: 1, text: 'AHA/AAP. 2025 Guidelines for Neonatal Resuscitation. Circulation. 2025;152(Suppl 1):S399-S445.' },
        { num: 2, text: 'Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. AAP; 2021.' },
    ],
};
// -------------------------------------------------------------------
// Distal Radius — Steps Summary
// -------------------------------------------------------------------
const DR_SUMMARY = {
    id: 'dr-summary',
    title: 'Distal Radius Reduction Steps Summary',
    subtitle: 'Quick-reference TRAMP checklist — review before reduction',
    sections: [
        {
            heading: '1. Assessment',
            body: '• ["Obtain & Maintain" — Is position acceptable? Will it shift?](#/node/dr-start)\n• [Evaluate AP + lateral films — radial height, inclination, volar tilt](#/node/dr-assess)\n• [Open / grossly unstable → surgical consult](#/node/dr-surgical)\n• [Pediatric remodeling — plane of motion only, rotation does NOT remodel](#/node/dr-peds)',
        },
        {
            heading: '2. Analgesia',
            body: '• [Hematoma block (preferred) — 5–10 mL 1% lidocaine into fracture, fastest discharge](#/node/dr-hema-block)\n• [Procedural sedation — ketamine/propofol, requires NPO + monitoring team](#/node/dr-proc-sed)\n• [Regional — Bier block or US-guided nerve blocks, superior but longer setup](#/node/dr-regional)',
        },
        {
            heading: '3. T — Traction',
            body: '• [Apply longitudinal traction — waterski position, lean back, steady pull](#/node/dr-traction)\n• [Make circles to free fragment — recreate length before reducing](#/node/dr-traction)\n• [Finger traps for sustained traction — frees hands for splinting](#/node/dr-traction)',
        },
        {
            heading: '4. R — Reduction',
            body: '• [Exaggerate the deformity FIRST — unlocks dorsal periosteal hinge](#/node/dr-reduce)\n• [Push distal fragment palmar (volar) with thumbs](#/node/dr-reduce)\n• [Ulnar deviate to restore radial inclination](#/node/dr-reduce)',
        },
        {
            heading: '5. A — Apply',
            body: '• [Plaster NOT fiberglass — fiberglass sets too fast to mold](#/node/dr-apply)\n• [10 layers, 6-inch, measure on uninjured side, cut thumb hole](#/node/dr-apply)\n• [MINIMAL padding at fracture (2 layers Webril) — padding defeats mold](#/node/dr-apply)',
        },
        {
            heading: '6. M — Mold',
            body: '• [Flat hands (thenar eminences) — NEVER fingertips](#/node/dr-mold)\n• [Oval cross-section, 3-point pressure: dorsal at fracture, volar proximal + distal](#/node/dr-mold)\n• [Do NOT squeeze. Do NOT move hands while plaster sets](#/node/dr-mold)',
        },
        {
            heading: '7. P — Position',
            body: '• [10° flexion + ulnar deviation — counteracts dorsal displacement](#/node/dr-position)\n• [Elbow, MCPs, and thumb must remain FREE](#/node/dr-position)',
        },
        {
            heading: '8. Post-Reduction',
            body: '• [X-ray: 2nd metacarpal line parallel to radius, cast index <0.80](#/node/dr-post-xray)\n• ["Straight cast = crooked bone" — round cast = inadequate mold](#/node/dr-post-xray)\n• [If inadequate: remove cast, top up analgesia, re-attempt full TRAMP](#/node/dr-re-attempt)\n• [If 2 attempts fail → ortho consult](#/node/dr-re-attempt)',
        },
    ],
    citations: [
        { num: 1, text: 'Sayal A. Fracture Reduction Demonstration. Emergency Medicine Cases. YouTube.' },
        { num: 2, text: 'AO Surgery Reference. Distal Radius — Splinting and Positioning. AO Foundation.' },
    ],
};
// -------------------------------------------------------------------
// Distal Radius — Hematoma Block Evidence
// -------------------------------------------------------------------
const DR_HEMA_EVIDENCE = {
    id: 'dr-hema-evidence',
    title: 'Hematoma Block — Evidence & Technique',
    subtitle: 'Comprehensive efficacy data, comparative studies, and technique variations',
    sections: [
        {
            heading: 'Technique',
            body: '**Standard approach:** Identify fracture site on dorsal wrist. Prep with chlorhexidine. Insert 20-gauge needle at dorsal fracture line. Aspirate — dark blood confirms placement in fracture hematoma. Inject 5–10 mL of 1% plain lidocaine. Wait 5–10 minutes for full effect. [3][6]\n\n**Ultrasound guidance:** Real-time visualization of needle entering fracture gap improves accuracy, reduces pain during injection, and may improve block success. Particularly valuable in pediatric patients and those with difficult anatomy. [5][7][8]\n\n**Combined fractures:** For radius + ulna, a second injection into the ulnar fracture hematoma is required for complete analgesia. [6]',
        },
        {
            heading: 'Dosing & Safety',
            body: '**Max dose:** 4.5 mg/kg without epinephrine (1% lidocaine = 10 mg/mL).\n\n**Critical safety point:** The fracture hematoma is contiguous with the medullary canal — lidocaine is absorbed directly into marrow vasculature. Systemic absorption is rapid, similar to intraosseous (IO) administration. Respect weight-based dosing limits strictly. [3][5]\n\n**Signs of toxicity:** Perioral numbness, metallic taste, tinnitus → seizures → cardiac arrest. Have lipid emulsion available for LAST (local anesthetic systemic toxicity).',
        },
        {
            heading: 'Efficacy vs Procedural Sedation',
            body: '**ED length of stay:** Hematoma block patients discharge in a mean of 1.5 hours vs 4.6 hours for procedural sedation — a 3-hour time savings. [4]\n\n**ENP-led reductions:** Emergency nurse practitioners using hematoma blocks achieved 87.2% successful first-attempt reduction rate, comparable to physician-led sedation results. Mean pain scores were acceptable (VAS 3.2 during reduction). [4]\n\n**No NPO requirement:** Hematoma block does not require fasting assessment, dedicated monitoring nurse, or capnography — reducing resource utilization significantly. [3][4]\n\n**Wilderness/austere settings:** Hematoma block is the preferred analgesia technique for fracture reduction in resource-limited environments where sedation monitoring is unavailable. [3]',
        },
        {
            heading: 'Efficacy vs Regional Anesthesia',
            body: '**Bier\'s block comparison:** Oakley et al. (2023) found hematoma block and Bier\'s block provided equivalent reduction quality and patient satisfaction for distal radius fractures, with hematoma block requiring fewer resources and shorter setup. [10]\n\n**US-guided nerve blocks:** Christensen et al. (2025) found US-guided nerve blocks achieved 94% first-attempt reduction success vs 74% for hematoma block, with lower pain scores during reduction. However, nerve blocks required ultrasound proficiency and additional setup time. [12]\n\n**Axillary block comparison:** Rook et al. (2025) demonstrated superior analgesia with US-guided axillary nerve block vs hematoma block, but at the cost of longer preparation and higher technical skill requirements. [13]\n\n**Cochrane review:** Handoll et al. (2002) found insufficient evidence to definitively recommend one anesthesia technique over another for distal radius reduction. Choice should be based on clinician skill, available resources, and patient factors. [9]\n\n**Regional vs hematoma meta-analysis:** Guirguis et al. (2025) concluded regional anesthesia provided superior analgesia but hematoma block remained appropriate first-line for straightforward reductions given its simplicity and speed. [11]',
        },
        {
            heading: 'Advantages',
            body: '• **Speed:** Can be performed in <5 minutes, full effect in 5–10 min\n• **Simplicity:** No specialized equipment beyond needle and syringe (US optional)\n• **No fasting required:** Can proceed immediately on arrival\n• **No monitoring team:** Single provider can perform block and reduction\n• **Cost-effective:** Minimal supplies, shorter ED stay\n• **Pediatric safe:** Well-studied in adolescents, US guidance helpful for precision [5][6]\n• **Difficult airway patients:** Avoids sedation risks entirely [5]',
        },
        {
            heading: 'Limitations',
            body: '• **Incomplete analgesia:** Some patients report moderate pain during reduction (VAS 3–5) — less complete than sedation or regional blocks\n• **Marrow absorption risk:** Rapid systemic uptake requires strict weight-based dosing\n• **Single-site only:** Each fracture site requires a separate injection\n• **No muscle relaxation:** Unlike sedation, does not relax forearm musculature — may make reduction technically harder in muscular patients\n• **Lower first-attempt success:** 74% vs 94% compared to US-guided nerve blocks in one RCT [12]\n• **Not suitable for:** Open fractures, severely comminuted fractures requiring prolonged manipulation, or patients requiring general anesthesia for other reasons',
        },
    ],
    citations: [
        { num: 3, text: 'Fink PB, et al. WMS CPG for Acute Pain in Austere Environments: 2024 Update. Wilderness Environ Med. 2024;35(2):198-218.' },
        { num: 4, text: 'Hagness C, et al. Haematoma Blocks in Closed Reduction of DRF by ENPs. Injury. 2025;56(8):112526.' },
        { num: 5, text: 'Gawel RJ, Chen AE. US-Guided Hematoma Block in Adolescent With Difficult Airway. Pediatr Emerg Care. 2025;41(2):143-145.' },
        { num: 6, text: 'Singh A, Khalil P. POCUS-Guided Hematoma Block for Forearm Fracture. Pediatr Emerg Care. 2021;37(10):533-535.' },
        { num: 7, text: 'Fathi M, et al. US-Guided Hematoma Block in DRF Reduction: RCT. Emerg Med J. 2015;32(6):474-7.' },
        { num: 8, text: 'Gottlieb M, Cosby K. US-Guided Hematoma Block for Distal Radial/Ulnar Fractures. J Emerg Med. 2015;48(3):310-2.' },
        { num: 9, text: 'Handoll HH, et al. Anaesthesia for Treating DRF in Adults. Cochrane Database Syst Rev. 2002;(3):CD003320.' },
        { num: 10, text: 'Oakley B, et al. Bier\'s Block vs Haematoma Block for DRF. Ann R Coll Surg Engl. 2023;105(5):434-440.' },
        { num: 11, text: 'Guirguis J, et al. Regional Anaesthesia vs Haematoma Block in DRF. Injury. 2025;56(12):112815.' },
        { num: 12, text: 'Christensen AB, et al. US-Guided Nerve Blocks Improve Closed Reduction of Colles\' Fractures: RCT. Acta Anaesthesiol Scand. 2025;69(6):e70063.' },
        { num: 13, text: 'Rook B, et al. US-guided Axillary Nerve Block vs Hematoma Block: RCT. Am J Emerg Med. 2025;100:175-181.' },
    ],
};
// -------------------------------------------------------------------
// Splinting — General Principles
// -------------------------------------------------------------------
const SPLINT_PRINCIPLES = {
    id: 'splint-principles',
    title: 'General Splinting Principles',
    subtitle: 'Materials, padding, technique, and neurovascular checks',
    sections: [
        {
            heading: 'Materials',
            body: '**Plaster** — moldable, sets in 3–5 min, exothermic reaction. Better for fractures requiring 3-point molding. Standard: 8–12 layers depending on site.\n\n**Fiberglass** — lighter, stronger, water-resistant, sets faster. Better for stable fractures where molding is not critical. More expensive.\n\n**Stockinette** — cotton tube applied directly to skin. Protects from plaster irritation. Fold over edges for a clean finish.\n\n**Webril (cast padding)** — soft cotton roll. Provides cushioning between skin and plaster. Standard: 2–4 layers.\n\n**Elastic bandage (ACE wrap)** — secures the splint. Wrap distally to proximally. Should be snug but not tight.',
        },
        {
            heading: 'Padding',
            body: '• **2–4 layers Webril** over the entire splinted area\n• **Extra padding** over bony prominences (malleoli, olecranon, styloids, calcaneus)\n• **Minimal padding** directly over the fracture site when molding is needed — excessive padding defeats the mold\n• Cotton between fingers for gutter splints to prevent maceration',
        },
        {
            heading: 'Application Technique',
            body: '1. Dip plaster in **lukewarm water** (not hot — the exothermic reaction adds additional heat and can burn)\n2. Squeeze out excess water gently — do not wring\n3. Smooth layers together on a flat surface to remove air pockets\n4. Apply to the limb and **mold with flat palms** (thenar eminences)\n5. **Never use fingertips** — creates pressure points → skin necrosis\n6. Hold the mold until plaster sets (3–5 minutes) — do NOT move hands during setting\n7. Secure with elastic bandage — snug, not constricting',
        },
        {
            heading: 'Positioning',
            body: '**Position of function** (unless otherwise specified):\n• **Wrist:** 15–20° extension\n• **MCP joints:** 70–90° flexion (for gutter splints — prevents collateral ligament contracture)\n• **IP joints:** slight flexion (10–20°)\n• **Elbow:** 90° flexion\n• **Ankle:** 90° dorsiflexion (neutral — prevents equinus contracture)\n• **Thumb:** abducted, slightly opposed ("holding a can")',
        },
        {
            heading: 'Neurovascular Checks',
            body: '**Before AND after splinting — document both.**\n\n• **Sensation:** Light touch in each nerve distribution (median, ulnar, radial for upper; deep peroneal, superficial peroneal, tibial, sural for lower)\n• **Motor:** Thumb opposition (median), finger abduction (ulnar), wrist/finger extension (radial), toe dorsiflexion (deep peroneal), toe plantarflexion (tibial)\n• **Vascular:** Capillary refill <2 seconds, pulses palpable (radial/ulnar for upper; dorsalis pedis/posterior tibial for lower)\n• **Color and temperature:** Compare to uninjured side',
        },
        {
            heading: 'A+P Institution Preference',
            body: '**Our institution prefers A+P (anterior + posterior) splints over sugar tong for forearm fractures.**\n\n• Two separate plaster slabs (one dorsal, one volar) rather than one continuous slab wrapping around the elbow\n• Provides equivalent AP stability without restricting elbow motion\n• Less bulky, better patient comfort, easier to adjust\n• Use sugar tong only when rotational control (pronation/supination) is specifically required',
        },
        {
            heading: 'Discharge Instructions',
            body: '• **Elevate** above the level of the heart — reduces swelling\n• **Ice** 20 minutes on / 20 minutes off (over padding, not directly on skin)\n• **Finger/toe exercises** — wiggle frequently to prevent stiffness and monitor for compartment syndrome\n• **Loosen elastic bandage** if swelling increases — mark the outer edge so patient knows where to unwind\n\n**Return immediately for:**\n• Increasing pain not relieved by elevation and medication\n• Numbness, tingling, or inability to move fingers/toes\n• Fingers/toes turning blue, white, or cold\n• Splint feels too tight, causes pressure pain\n• These are **compartment syndrome warning signs** — a surgical emergency',
        },
    ],
    citations: [
        { num: 1, text: 'Cheng J, et al. "The Splinter Series." ALiEM. https://www.aliem.com/splinter-series/' },
        { num: 3, text: 'Boyd AS, et al. Splints and Casts: Indications and Methods. Am Fam Physician. 2009;80(5):491-9.' },
        { num: 6, text: 'Eiff MP, Hatch RL. Fracture Management for Primary Care. 3rd ed. Elsevier; 2018.' },
    ],
};
// -------------------------------------------------------------------
// Splinting — Quick Reference Table
// -------------------------------------------------------------------
const SPLINT_SUMMARY = {
    id: 'splint-summary',
    title: 'Splinting Quick Reference',
    subtitle: 'All fractures → splint types at a glance with technique links',
    sections: [
        {
            heading: 'Humerus',
            body: '• Proximal humerus → [Sling / Cuff & Collar](#/node/splint-sling)\n• Humeral shaft → [Coaptation Splint](#/node/splint-coaptation) (→ functional brace at 1–2 wk)\n• Supracondylar → [Long Arm Posterior](#/node/splint-long-arm-post) or [Double Sugar Tong](#/node/splint-double-sugar-tong)',
        },
        {
            heading: 'Forearm',
            body: '• Olecranon / coronoid → [Long Arm Posterior](#/node/splint-long-arm-post)\n• Radius/ulna proximal or midshaft → [Long Arm Posterior](#/node/splint-long-arm-post) or [Double Sugar Tong](#/node/splint-double-sugar-tong)\n• Radius distal, isolated → [Thumb Spica](#/node/splint-thumb-spica) or [Volar](#/node/splint-volar)\n• Radius/ulna distal, complex → [Sugar Tong](#/node/splint-sugar-tong) (**A+P preferred**)\n• Ulna styloid → [Sugar Tong](#/node/splint-sugar-tong) (**A+P preferred**)',
        },
        {
            heading: 'Wrist & Hand',
            body: '• Scaphoid / trapezium / lunate fracture → [Thumb Spica](#/node/splint-thumb-spica)\n• Lunate dislocation → [Sugar Tong](#/node/splint-sugar-tong) (**A+P preferred**)\n• Triquetrum / pisiform / trapezoid / capitate / hamate → [Volar](#/node/splint-volar)\n• UCL injury / thumb MCP dislocation / De Quervain → [Thumb Spica](#/node/splint-thumb-spica)\n• 1st metacarpal → [Thumb Spica](#/node/splint-thumb-spica)\n• 2nd / 3rd metacarpal → [Radial Gutter](#/node/splint-radial-gutter) or [Volar](#/node/splint-volar)\n• 4th / 5th metacarpal (boxer) → [Ulnar Gutter](#/node/splint-ulnar-gutter)\n• 1st phalanx → [Thumb Spica](#/node/splint-thumb-spica)\n• 2nd / 3rd prox/mid phalanx → [Radial Gutter](#/node/splint-radial-gutter) or buddy taping\n• 4th / 5th prox/mid phalanx → [Ulnar Gutter](#/node/splint-ulnar-gutter) or buddy taping\n• Distal phalanx → Aluminum U-shaped (stack) splint',
        },
        {
            heading: 'Lower Extremity',
            body: '• Distal tibia / distal fibula → [Posterior Short Leg](#/node/splint-post-short-leg) (± [Stirrup](#/node/splint-stirrup))\n• Ankle sprain grade 2/3 → [Stirrup](#/node/splint-stirrup)\n• Talus / calcaneus / navicular / cuboid / cuneiform → [Posterior Short Leg](#/node/splint-post-short-leg)\n• Metatarsal → [Posterior Short Leg](#/node/splint-post-short-leg)\n• Lisfranc → [Posterior Short Leg](#/node/splint-post-short-leg) (non-weight bearing)',
        },
        {
            heading: 'Key Positions',
            body: '• **Wrist:** 15–20° extension\n• **MCP (gutter splints):** 70–90° flexion\n• **Elbow:** 90° flexion\n• **Ankle:** 90° dorsiflexion (neutral)\n• **Thumb:** abducted, slightly opposed',
        },
    ],
    citations: [
        { num: 3, text: 'Boyd AS, et al. Splints and Casts: Indications and Methods. Am Fam Physician. 2009;80(5):491-9.' },
        { num: 6, text: 'Eiff MP, Hatch RL. Fracture Management for Primary Care. 3rd ed. Elsevier; 2018.' },
    ],
};
// ===================================================================
// Sodium Disorders
// ===================================================================
// -------------------------------------------------------------------
// Sodium Disorders — Steps Summary
// -------------------------------------------------------------------
const NA_SUMMARY = {
    id: 'na-summary',
    title: 'Sodium Disorders Steps Summary',
    subtitle: 'Stepwise management of hyponatremia and hypernatremia',
    sections: [
        {
            heading: '1. Initial Assessment',
            body: '• [Classify as hyponatremia or hypernatremia](#/node/na-start)\n• [Assess symptom severity for hyponatremia](#/node/na-hypo-symptoms)\n• [Order initial labs: serum osm, urine osm, urine Na](#/node/na-hypo-initial)',
        },
        {
            heading: '2. Emergency HypoNa (Severe Symptoms)',
            body: '• [3% Hypertonic Saline 100-150 mL bolus x3 — target 4-6 mEq/L rise](#/node/na-hypo-emergency)\n• [Correction limits: max 10 mEq/L in 24h (8 for high-risk)](#/node/na-hypo-correction-limits)\n• [DDAVP clamp-bolus protocol for controlled correction](#/node/na-hypo-ddavp-protocol)',
        },
        {
            heading: '3. HypoNa Etiology',
            body: '• [Serum Osm >275 → non-hypotonic (check glucose, lipids)](#/node/na-non-hypotonic)\n• [Urine Osm <100 → water excess (potomania, polydipsia)](#/node/na-hypo-water-excess)\n• [Urine Na <30 → volume assessment (hypo- vs hypervolemic)](#/node/na-hypo-low-una)\n• [Urine Na >30 → SIAD, diuretics, or adrenal insufficiency](#/node/na-hypo-high-una)',
        },
        {
            heading: '4. SIAD & Specific Causes',
            body: '• [SIAD → fluid restriction → oral urea → salt tabs + loop](#/node/na-siad-treatment)\n• [Diuretic-induced → hold thiazide, DDAVP clamp if Na <120](#/node/na-hypo-diuretic)\n• [Hypovolemic → NS resuscitation, watch for autocorrection](#/node/na-hypo-hypovolemic)',
        },
        {
            heading: '5. Hypernatremia',
            body: '• [Volume depleted → Free Water Deficit calculator → enteral or D5W replacement](#/node/na-hyper-fwd)\n• [Polyuria → DI workup (central vs nephrogenic)](#/node/na-hyper-di)\n• [Central DI → DDAVP + free water](#/node/na-hyper-central-di)\n• [Volume overloaded → natriuretic diuresis + free water](#/node/na-hyper-overload)',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ et al. Diagnosis and Management of Hyponatremia. JAMA. 2022;328(3):280-291.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — DDAVP Clamp Protocol
// -------------------------------------------------------------------
const NA_DDAVP_CLAMP = {
    id: 'na-ddavp-clamp',
    title: 'DDAVP Clamp-Bolus Protocol',
    subtitle: 'Controlled sodium correction in hyponatremia',
    sections: [
        {
            heading: 'Concept',
            body: 'The DDAVP clamp separates the **water problem** from the **sodium problem**. DDAVP blocks renal free water excretion via V2 receptors, preventing dangerous autocorrection. Then 3% NaCl boluses raise Na at a predictable, controlled rate.\n\nThis is especially critical in patients at HIGH risk of overcorrection: alcoholics, malnourished, hypokalemia, thiazide-induced, beer potomania.',
        },
        {
            heading: 'Initiation',
            body: '**Step 1:** Give **Desmopressin (DDAVP) 2 mcg IV** as first dose.\n**Step 2:** Start DDAVP 2 mcg IV **q6-8h** (scheduled, not PRN).\n**Step 3:** Give **Thiamine 100 mg IV** empirically (ODS prophylaxis).\n**Step 4:** Check serum Na **q2h** from initiation.\n\n**Do NOT wait for labs before starting DDAVP** in high-risk patients — start the clamp immediately.',
        },
        {
            heading: 'Bolus Correction',
            body: '**While DDAVP clamp is active:**\n• Give **3% NaCl 100 mL IV bolus** to raise Na.\n• Each 100 mL bolus raises Na **~2 mEq/L** in a 70 kg adult.\n• Check Na **2 hours after each bolus**.\n• Target correction: **4-6 mEq/L** in the first 6 hours for severe symptoms.\n• Max: **8 mEq/L in 24h** for high-risk, **10 mEq/L** for standard risk.\n\n**If Na rises too fast:** Hold 3% boluses. DDAVP will prevent further rise. If already overcorrected → Overcorrection Rescue Protocol.',
        },
        {
            heading: 'Monitoring',
            body: '**During active DDAVP clamp:**\n• Serum Na q2h\n• Urine output and volume\n• Urine osmolality (should be concentrated if DDAVP working)\n• Neurological status\n• Serum K+ (correct hypokalemia — ODS risk factor)',
        },
        {
            heading: 'Discontinuation',
            body: '**Stop DDAVP clamp when:**\n• Na >125 mEq/L AND stable\n• Underlying cause has been addressed\n• Patient tolerating oral intake\n\n**After stopping DDAVP:**\n• Continue Na monitoring q4-6h for 24-48h\n• Watch for rebound — free water excretion may resume rapidly\n• If Na rises >2 mEq/L in first 4h after stopping → consider restarting DDAVP',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ et al. Diagnosis and Management of Hyponatremia. JAMA. 2022;328(3):280-291.' },
        { num: 2, text: 'Sterns RH. Disorders of Plasma Sodium. NEJM. 2015;372(1):55-65.' },
        { num: 3, text: 'Verbalis JG et al. Hyponatremia: Expert Panel Recommendations. Am J Med. 2013;126(10S1):S1-42.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — SIAD Causes & Diagnosis
// -------------------------------------------------------------------
const NA_SIAD_CAUSES = {
    id: 'na-siad-causes',
    title: 'SIAD Causes & Diagnosis',
    subtitle: 'Syndrome of Inappropriate Antidiuresis',
    sections: [
        {
            heading: 'Diagnostic Criteria (ALL must be present)',
            body: '• Serum osmolality **<275 mOsm/kg**\n• Urine osmolality **>100 mOsm/kg** (usually >300)\n• Urine sodium **>30 mEq/L** (on normal salt intake)\n• **Euvolemic** on clinical exam\n• Normal thyroid and adrenal function\n• No recent diuretic use',
        },
        {
            heading: 'Medication Causes (Most Common)',
            body: '• **SSRIs/SNRIs** — most common drug cause, especially in elderly\n• **Carbamazepine / Oxcarbazepine** — potent ADH stimulators\n• **NSAIDs** — reduce renal free water clearance\n• **Opioids** — stimulate ADH release\n• **Cyclophosphamide** — direct ADH-like effect\n• **Desmopressin** — iatrogenic when given for other indications\n• **Ecstasy (MDMA)** — stimulates ADH + excessive water intake',
        },
        {
            heading: 'Malignancy',
            body: '• **Small cell lung cancer** — most classic association (ectopic ADH production)\n• Head and neck cancers\n• Lymphoma\n• GI malignancies\n• GU malignancies',
        },
        {
            heading: 'Neurologic',
            body: '• Stroke, subarachnoid hemorrhage, TBI\n• Meningitis, encephalitis\n• Brain tumors\n• Multiple sclerosis\n• Guillain-Barré syndrome',
        },
        {
            heading: 'Pulmonary',
            body: '• Pneumonia (any cause)\n• Tuberculosis\n• Positive pressure ventilation\n• Asthma exacerbation\n• COPD exacerbation',
        },
        {
            heading: 'Key Pitfalls',
            body: '• SIAD is a **diagnosis of exclusion** — rule out hypothyroidism and adrenal insufficiency first\n• Many "euvolemic" patients are actually mildly volume depleted — trial of NS can help distinguish\n• Urine Na may be low in SIAD if patient is on severe salt restriction\n• The term "SIAD" is preferred over "SIADH" because not all cases involve elevated ADH [6]',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ, Madias NE. Syndrome of Inappropriate Antidiuresis. NEJM. 2023;389(16):1499-1509.' },
        { num: 6, text: 'Ellison DH, Berl T. The syndrome of inappropriate antidiuresis. NEJM. 2007;356(20):2064-72.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — Hypernatremia Causes
// -------------------------------------------------------------------
const NA_HYPER_CAUSES = {
    id: 'na-hyper-causes',
    title: 'Hypernatremia Causes',
    subtitle: 'Differential diagnosis by mechanism',
    sections: [
        {
            heading: 'Inadequate Water Intake (Most Common)',
            body: '• **Elderly with impaired thirst** — by far the most common ER presentation\n• Altered mental status / intubated patients\n• Restricted access to water (nursing homes, ICU)\n• Infants dependent on caregivers',
        },
        {
            heading: 'Sodium / Potassium Administration',
            body: '• Hypertonic saline infusions\n• Sodium bicarbonate boluses\n• Excessive TPN sodium content\n• Oral sodium ingestion (soy sauce, salt tablets)',
        },
        {
            heading: 'Renal Water Loss — Diabetes Insipidus',
            body: '• **Central DI** — deficient ADH production (post-neurosurgery, TBI, tumors, idiopathic)\n• **Nephrogenic DI** — renal resistance to ADH (lithium, hypercalcemia, hypokalemia, post-obstructive)',
        },
        {
            heading: 'Renal Water Loss — Diuresis',
            body: '• Osmotic diuresis (hyperglycemia, mannitol, urea)\n• Loop diuretics (produce hypotonic urine)\n• Post-obstructive diuresis',
        },
        {
            heading: 'GI Water Loss',
            body: '• Diarrhea (especially osmotic — lactulose, sorbitol)\n• Vomiting with inadequate replacement\n• Nasogastric suction\n• Enterocutaneous fistulas',
        },
        {
            heading: 'Insensible Losses',
            body: '• Burns\n• Fever (each degree above 37°C increases free water loss ~100 mL/day)\n• Mechanical ventilation with dry gas\n• Exercise / environmental heat exposure',
        },
        {
            heading: 'Key Clinical Points',
            body: '• Hypernatremia is **always hyperosmolar** — no pseudohypernatremia exists\n• In hospitalized patients, hypernatremia is usually **iatrogenic** (inadequate free water provision)\n• Community-acquired hypernatremia is usually chronic and associated with **higher mortality** than hospital-acquired\n• Mortality ranges from 40-60% in severe cases — often a marker of severe underlying illness',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ, Madias NE. Hypernatremia. NEJM. 2000;342(20):1493-1499.' },
        { num: 2, text: 'Lindner G et al. Hypernatremia in Critically Ill. J Crit Care. 2013;28(2):216.e11-20.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — Overcorrection Rescue Protocol
// -------------------------------------------------------------------
const NA_OVERCORRECTION = {
    id: 'na-overcorrection',
    title: 'Overcorrection Rescue Protocol',
    subtitle: 'Emergency re-lowering of serum sodium',
    sections: [
        {
            heading: 'When to Activate',
            body: '**Activate rescue if:**\n• Na rises **>10 mEq/L in 24 hours** (standard risk)\n• Na rises **>8 mEq/L in 24 hours** (high-risk patients)\n• Na correction rate exceeds **1 mEq/L per hour** sustained\n\n**High-risk patients:** Alcoholics, malnourished, hypokalemia, thiazide-induced, beer potomania, Na <105 mEq/L.',
        },
        {
            heading: 'Rescue Protocol',
            body: '**Step 1:** **Desmopressin (DDAVP) 2 mcg IV stat** — blocks free water excretion immediately.\n\n**Step 2:** **D5W 3 mL/kg/hr IV** — provides free water to re-lower Na back to safe trajectory.\n\n**Step 3:** Check Na **q1-2h** until correction rate is back within limits.\n\n**Step 4:** Once Na back on safe trajectory, transition to DDAVP clamp protocol for controlled correction.',
        },
        {
            heading: 'Target',
            body: 'Re-lower Na to bring the **24-hour correction** back to within 8-10 mEq/L from baseline.\n\nExample: If baseline Na was 112 mEq/L and rose to 126 mEq/L in 12 hours (+14 mEq/L), give DDAVP + D5W to re-lower Na toward ~120-122 mEq/L.',
        },
        {
            heading: 'Prevention (Better Than Rescue)',
            body: '• **Proactive DDAVP clamp** in all high-risk patients — do not wait for overcorrection to occur\n• **Thiamine 100 mg IV** empirically — reduces ODS susceptibility\n• **Correct hypokalemia** — K+ correction raises Na (1 mEq K+ repleted = ~1 mEq Na rise)\n• **Avoid NS boluses** in patients with reversible ADH excess — can trigger rapid autocorrection\n• **Monitor Na q2h** during active treatment',
        },
    ],
    citations: [
        { num: 1, text: 'Sterns RH. Disorders of Plasma Sodium. NEJM. 2015;372(1):55-65.' },
        { num: 2, text: 'Ayus JC et al. Correction Rates in Severe Hyponatremia Meta-Analysis. JAMA Intern Med. 2025;185(1):38-51.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — ODS Risk Factors
// -------------------------------------------------------------------
const NA_ODS_RISK = {
    id: 'na-ods-risk',
    title: 'ODS Risk Factors',
    subtitle: 'Osmotic Demyelination Syndrome',
    sections: [
        {
            heading: 'What is ODS?',
            body: 'Osmotic demyelination syndrome (formerly "central pontine myelinolysis") is a devastating neurologic injury caused by **overly rapid correction of chronic hyponatremia**. Brain cells that adapted to hypo-osmolality cannot readapt fast enough, leading to myelin destruction.\n\n**Onset is delayed 2-6 days** after overcorrection — clinicians may falsely believe the patient is improving when the damage is already done.',
        },
        {
            heading: 'High-Risk Populations',
            body: '• **Alcoholism** — most common risk factor\n• **Malnutrition** — depleted organic osmolytes\n• **Hypokalemia** — K+ correction raises Na (double hit)\n• **Thiamine deficiency** — overlaps with alcohol/malnutrition\n• **Liver disease / cirrhosis**\n• **Na <105 mEq/L** — severely adapted brain\n• **Chronic hyponatremia (>48h)** — brain has fully adapted\n• **Thiazide-induced** — high autocorrection risk when drug stopped',
        },
        {
            heading: 'Clinical Presentation',
            body: '**Biphasic course:**\n1. Initial improvement with Na correction (hours to days)\n2. **Delayed deterioration (2-6 days):**\n• Dysarthria, dysphagia\n• Paraparesis or quadriparesis\n• "Locked-in" syndrome (worst case)\n• Behavioral changes, confusion\n• Seizures\n\n**MRI findings:** T2 hyperintensity in central pons ("trident sign") — may not appear for 1-2 weeks.',
        },
        {
            heading: 'Prevention',
            body: '• **Proactive DDAVP clamp** for all high-risk patients\n• **Thiamine 100 mg IV** empirically\n• **Correct hypokalemia** alongside Na (but account for K+ effect on Na)\n• **Max correction:** 8 mEq/L in 24h for high-risk, 10 mEq/L for standard\n• **Avoid NS boluses** in reversible causes — triggers autocorrection\n• If overcorrection occurs → **immediate DDAVP + D5W rescue**\n• **Do NOT give vaptans** — unpredictable, uncontrolled aquaresis',
        },
    ],
    citations: [
        { num: 1, text: 'Sterns RH. Disorders of Plasma Sodium. NEJM. 2015;372(1):55-65.' },
        { num: 2, text: 'Spasovski G et al. Clinical Practice Guideline on Hyponatraemia. Eur J Endocrinol. 2014;170(3):G1-G47.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — Hyponatremia Lab Interpretation
// -------------------------------------------------------------------
const NA_LAB_INTERPRETATION = {
    id: 'na-lab-interpretation',
    title: 'Hyponatremia Lab Interpretation',
    subtitle: 'Stepwise diagnostic algorithm',
    sections: [
        {
            heading: 'Step 1: Serum Osmolality',
            body: '**Osm >275 mOsm/kg → Non-hypotonic hyponatremia**\n• Check glucose — add 1.6 mEq/L to Na for every 100 mg/dL glucose above 100 (corrected Na)\n• Check lipids, total protein — pseudohyponatremia (artifact of indirect ISE method)\n• Check for mannitol, glycine, sorbitol infusions\n\n**Osm <275 mOsm/kg → True hypotonic hyponatremia** → proceed to Step 2',
        },
        {
            heading: 'Step 2: Urine Osmolality',
            body: '**Urine Osm <100 mOsm/kg → Dilute urine (ADH appropriately suppressed)**\n• Primary polydipsia (>15-20 L/day intake)\n• Beer potomania (low solute intake, high free water)\n• "Tea-and-toast" diet in elderly\n• Marathon runners / dilutional\n\n**HIGH overcorrection risk** — once water intake normalizes, kidneys excrete massive free water volumes. **Proactive DDAVP clamp** recommended.\n\n**Urine Osm >100 mOsm/kg → Concentrated urine (ADH active)** → proceed to Step 3',
        },
        {
            heading: 'Step 3: Urine Sodium',
            body: '**Urine Na <30 mEq/L → Avid Na retention**\n• **Hypovolemic:** GI losses (vomiting, diarrhea), third-spacing, poor intake\n• **Hypervolemic:** Heart failure, cirrhosis, nephrotic syndrome (effective arterial volume depletion)\n• Distinguish by clinical volume assessment\n\n**Urine Na >30 mEq/L → Na wasting or euvolemia**\n• **SIAD** (most common euvolemic cause)\n• **Diuretic-induced** (thiazides >> loops)\n• **Adrenal insufficiency** (cortisol/ACTH deficiency)\n• **Cerebral salt wasting** (rare, post-neurosurgery)\n• **Hypothyroidism** (rare cause, usually requires severe TSH elevation)',
        },
        {
            heading: 'Grey Zones',
            body: '• **Urine Osm 100-300:** Overlap zone — could be partial ADH suppression or partial concentration\n• **Urine Na 20-40:** Borderline — may reflect mixed etiology or recent volume status changes\n• **Diuretics confound all urine values** — urine Na and Osm are uninterpretable while on diuretics\n• **Fractional excretion of urate (FEua)** can help distinguish SIAD (>12%) from volume depletion (<12%) when urine values are ambiguous',
        },
    ],
    citations: [
        { num: 1, text: 'Adrogué HJ et al. Diagnosis and Management of Hyponatremia. JAMA. 2022;328(3):280-291.' },
        { num: 2, text: 'Hoorn EJ, Zietse R. Diagnosis and Treatment of Hyponatremia: Guidelines. JASN. 2017;28(5):1340-1349.' },
    ],
};
// -------------------------------------------------------------------
// Sodium Disorders — Non-Hypotonic Hyponatremia
// -------------------------------------------------------------------
const NA_NON_HYPOTONIC_INFO = {
    id: 'na-non-hypotonic-info',
    title: 'Non-Hypotonic Hyponatremia',
    subtitle: 'Translocational and pseudohyponatremia',
    sections: [
        {
            heading: 'Translocational Hyponatremia',
            body: '**Effective osmoles draw water out of cells, diluting plasma Na.**\n\n• **Hyperglycemia (most common):** For every 100 mg/dL glucose above 100, Na is artifactually lowered by ~1.6 mEq/L. Corrected Na = measured Na + 1.6 × [(glucose - 100) / 100]. Some experts use factor of 2.4 for glucose >400.\n• **Mannitol infusion:** Osmotic drag effect similar to hyperglycemia.\n• **Glycine / Sorbitol:** TURP syndrome, hysteroscopy irrigation — can cause severe dilutional hyponatremia.\n\n**Treatment:** Correct the underlying osmole. Na normalizes as glucose falls / mannitol is cleared.',
        },
        {
            heading: 'Pseudohyponatremia',
            body: '**Lab artifact from indirect ion-selective electrode (ISE) analyzers.**\n\nHigh concentrations of lipids or paraproteins expand the non-aqueous plasma fraction, causing the analyzer to underestimate Na concentration in the aqueous phase.\n\n• **Severe hypertriglyceridemia** (TG >1500 mg/dL)\n• **Paraproteinemia** (multiple myeloma, Waldenström)\n• **Extreme hypercholesterolemia**\n\n**Diagnosis:** Serum osmolality is **normal** (measured directly). Or use direct ISE method (blood gas analyzer, POC chemistry) — gives true Na.\n\n**Treatment:** None needed for the Na itself. Treat the underlying condition.',
        },
        {
            heading: 'How to Distinguish',
            body: '• **Serum osmolality >275 mOsm/kg** rules out true hypotonic hyponatremia\n• **POC (point-of-care) Na** uses direct ISE and gives the true value — compare with lab Na\n• If POC Na is normal but lab Na is low → **pseudohyponatremia**\n• If calculated Osm is normal but measured Osm is high → **osmol gap** (unmeasured osmoles like mannitol, ethylene glycol)',
        },
    ],
    citations: [
        { num: 1, text: 'Seay NW et al. Body Tonicity Disorders Core Curriculum. AJKD. 2020;75(2):272-286.' },
        { num: 2, text: 'Miller NE et al. Sodium Disorders: Hyponatremia and Hypernatremia. AFP. 2023;108(5):476-486.' },
    ],
};
const INFO_PAGES = {
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
    'afib-summary': AFIB_SUMMARY,
    'pe-summary': PE_SUMMARY,
    'k-summary': K_SUMMARY,
    'stroke-summary': STROKE_SUMMARY,
    'ptx-summary': PTX_SUMMARY,
    'nrp-summary': NRP_SUMMARY,
    'dr-summary': DR_SUMMARY,
    'dr-hema-evidence': DR_HEMA_EVIDENCE,
    'splint-principles': SPLINT_PRINCIPLES,
    'splint-summary': SPLINT_SUMMARY,
    'nstemi-troponin-sensitivity': NSTEMI_TROPONIN_SENSITIVITY_PAGE,
    'na-summary': NA_SUMMARY,
    'na-ddavp-clamp': NA_DDAVP_CLAMP,
    'na-siad-causes': NA_SIAD_CAUSES,
    'na-hyper-causes': NA_HYPER_CAUSES,
    'na-overcorrection': NA_OVERCORRECTION,
    'na-ods-risk': NA_ODS_RISK,
    'na-lab-interpretation': NA_LAB_INTERPRETATION,
    'na-non-hypotonic-info': NA_NON_HYPOTONIC_INFO,
};
// -------------------------------------------------------------------
// Body Text with Clickable Footnotes
// -------------------------------------------------------------------
/** Append text to a parent element, converting **bold** markers to <strong> elements. */
function infoBoldAware(parent, text) {
    const boldPattern = /\*\*(.+?)\*\*/g;
    let last = 0;
    let m;
    while ((m = boldPattern.exec(text)) !== null) {
        if (m.index > last)
            parent.appendChild(document.createTextNode(text.slice(last, m.index)));
        const strong = document.createElement('strong');
        strong.textContent = m[1];
        parent.appendChild(strong);
        last = m.index + m[0].length;
    }
    if (last < text.length)
        parent.appendChild(document.createTextNode(text.slice(last)));
    if (last === 0 && text.length > 0)
        parent.textContent = text;
}
/** Render a line of info page body text with inline links, bold, and citation refs. */
function renderInfoBodyLine(container, line) {
    // Combined pattern: markdown links [text](#/path) OR citation refs [N]
    const combinedPattern = /\[([^\]]+)\]\((#\/[^)]+)\)|\[(\d+)\](?:\[(\d+)\])*/g;
    let lastIndex = 0;
    let match;
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
                }
                else if (linkType === 'tree') {
                    window.location.hash = '#/tree/' + linkId;
                }
                else if (linkType === 'drug') {
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
        }
        else {
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
function scrollToCitation(num) {
    // Open the details element if closed
    const details = document.querySelector('.info-page-citations');
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
function renderPictograph(picto) {
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
            }
            else {
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
        }
        else {
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
let overlayEl = null;
function destroyOverlay() {
    overlayEl?.remove();
    overlayEl = null;
}
/** Build plain-text version of an info page for sharing via SMS/email */
function buildShareText(page) {
    const lines = [];
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
async function shareInfoPage(page) {
    const text = buildShareText(page);
    if (navigator.share) {
        try {
            await navigator.share({
                title: page.title,
                text: text,
            });
        }
        catch {
            // User cancelled share — do nothing
        }
    }
    else {
        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(text);
            showCopiedToast();
        }
        catch {
            // Last resort: prompt with text
            prompt('Copy this text to share:', text);
        }
    }
}
/** Brief toast notification for clipboard copy */
function showCopiedToast() {
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = 'Copied to clipboard';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
/** Show an info page as a modal overlay. Returns false if pageId not found. */
export function showInfoModal(pageId) {
    const page = INFO_PAGES[pageId];
    if (!page)
        return false;
    destroyOverlay();
    // Create overlay
    overlayEl = document.createElement('div');
    overlayEl.className = 'modal-overlay info-modal-overlay active';
    overlayEl.addEventListener('click', (e) => {
        if (e.target === overlayEl)
            destroyOverlay();
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
                }
                else {
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
