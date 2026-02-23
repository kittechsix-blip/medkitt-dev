// MedKitt — Post Exposure Prophylaxis (PEP) Consult
// Exposure assessment → HIV status → Initiation → Follow-up.
// 4 modules: Exposure Assessment → HIV Assessment → Initiation → Follow-Up
// 15 nodes total.
export const PEP_NODES = [
    // =====================================================================
    // MODULE 1: EXPOSURE ASSESSMENT
    // =====================================================================
    {
        id: 'pep-start',
        type: 'question',
        module: 1,
        title: 'Exposure Type',
        body: '[Patient Info Sheet: PEP](#/info/pep-patient-info) \u2014 printable summary of transmission risk, treatment effectiveness, and side effects.\n\nWhat type of HIV exposure occurred?',
        options: [
            {
                label: 'Occupational',
                description: 'Needlestick, sharps injury, or mucous membrane/non-intact skin splash',
                next: 'pep-timing',
            },
            {
                label: 'Nonoccupational',
                description: 'Sexual exposure, injection drug use, or other non-work-related contact',
                next: 'pep-fluid',
            },
        ],
    },
    {
        id: 'pep-fluid',
        type: 'question',
        module: 1,
        title: 'Substantial Risk Fluid?',
        body: 'Was the exposure to a substantial-risk body fluid?\n\nSUBSTANTIAL RISK\n\u2022 Blood\n\u2022 Semen / vaginal secretions\n\u2022 Rectal secretions\n\u2022 Breast milk\n\u2022 Any visibly bloody body fluid\n\nNEGLIGIBLE RISK\n\u2022 Urine, saliva, sweat, tears (without visible blood)',
        citation: [1],
        options: [
            {
                label: 'Yes \u2014 Substantial-risk fluid',
                description: 'Blood, semen, vaginal/rectal secretions, or visibly bloody fluid',
                next: 'pep-timing',
            },
            {
                label: 'No \u2014 Negligible-risk fluid only',
                description: 'Urine, saliva, sweat, tears without visible blood',
                next: 'pep-low-risk',
            },
        ],
    },
    {
        id: 'pep-low-risk',
        type: 'result',
        module: 1,
        title: 'PEP Not Indicated',
        body: 'Exposure involved only negligible-risk body fluids. No documented cases of HIV transmission from these fluids.',
        recommendation: 'PEP is not recommended. Provide reassurance and risk reduction counseling. Consider HIV testing at baseline if patient has other risk factors.',
        confidence: 'definitive',
        citation: [1, 3],
    },
    {
        id: 'pep-timing',
        type: 'question',
        module: 1,
        title: 'Time Since Exposure',
        body: 'Has it been \u226472 hours since the exposure?\n\nPEP must be initiated as soon as possible. Efficacy decreases with delay and is not recommended after 72 hours.',
        citation: [1, 2],
        options: [
            {
                label: 'Yes \u2014 \u226472 hours',
                description: 'Within the treatment window',
                next: 'pep-patient-hiv',
                urgency: 'urgent',
            },
            {
                label: 'No \u2014 >72 hours',
                description: 'Outside the recommended treatment window',
                next: 'pep-late',
            },
        ],
    },
    {
        id: 'pep-late',
        type: 'result',
        module: 1,
        title: 'PEP Not Indicated',
        body: 'Exposure occurred >72 hours ago. PEP is not recommended beyond this window due to lack of efficacy data.',
        recommendation: 'PEP is not recommended. Offer baseline HIV testing and repeat at 4\u20136 weeks and 3 months. Provide risk reduction counseling. Discuss [PrEP](#/info/prep-info) for ongoing risk.',
        confidence: 'definitive',
        citation: [1, 2, 5],
    },
    // =====================================================================
    // MODULE 2: HIV ASSESSMENT
    // =====================================================================
    {
        id: 'pep-patient-hiv',
        type: 'question',
        module: 2,
        title: 'Patient HIV Status',
        body: 'What is the exposed patient\u2019s HIV status?',
        options: [
            {
                label: 'HIV-negative or unknown',
                description: 'Proceed with PEP evaluation',
                next: 'pep-source',
            },
            {
                label: 'Known HIV-positive',
                description: 'Already living with HIV',
                next: 'pep-positive',
            },
        ],
    },
    {
        id: 'pep-positive',
        type: 'result',
        module: 2,
        title: 'Not a PEP Candidate',
        body: 'Patient is already HIV-positive. PEP is prophylaxis for HIV-negative individuals only.',
        recommendation: 'Refer to HIV specialist for ART management. Verify viral load and treatment adherence. PEP is not applicable.',
        confidence: 'definitive',
        citation: [1],
    },
    {
        id: 'pep-source',
        type: 'question',
        module: 2,
        title: 'Source HIV Status',
        body: 'What is the source person\u2019s HIV status?\n\nIf source is known HIV+ on ART with sustained undetectable viral load (<200 copies/mL), transmission risk is negligible (U=U). PEP may still be offered per patient preference.',
        citation: [1, 2, 4],
        options: [
            {
                label: 'HIV-positive or unknown',
                description: 'Source is HIV+, unknown status, or cannot be tested',
                next: 'pep-workup',
                urgency: 'urgent',
            },
            {
                label: 'Confirmed HIV-negative',
                description: 'Source has documented negative HIV test',
                next: 'pep-source-neg',
            },
        ],
    },
    {
        id: 'pep-source-neg',
        type: 'result',
        module: 2,
        title: 'PEP Not Indicated',
        body: 'Source is confirmed HIV-negative. No HIV transmission risk from this exposure.',
        recommendation: 'PEP is not recommended. If source HIV test was a rapid test, confirm with lab-based assay. Consider window period if source has recent high-risk behavior.',
        confidence: 'definitive',
        citation: [1, 2],
    },
    // =====================================================================
    // MODULE 3: INITIATION
    // =====================================================================
    {
        id: 'pep-workup',
        type: 'info',
        module: 3,
        title: 'Start PEP Immediately',
        body: '**Do not delay PEP for test results.** Start medications now; adjust later based on labs.\n\nBASELINE LABS\n\u2022 HIV Ag/Ab combo (4th gen)\n\u2022 Hepatitis B surface Ag, surface Ab, core Ab\n\u2022 Hepatitis C Ab\n\u2022 BMP (creatinine for renal dosing)\n\u2022 CBC\n\u2022 Pregnancy test (if applicable)\n\u2022 STI screening (GC/CT, syphilis RPR)\n\nFor occupational exposures, also test the source patient for HIV, HBV, and HCV.',
        citation: [1, 2, 6],
        next: 'pep-special',
    },
    {
        id: 'pep-special',
        type: 'question',
        module: 3,
        title: 'Special Population?',
        body: 'Does the patient have any of the following?',
        options: [
            {
                label: 'Pregnant',
                description: 'Known or suspected pregnancy',
                next: 'pep-pregnancy',
            },
            {
                label: 'Renal impairment (CrCl <50)',
                description: 'Requires dose adjustment',
                next: 'pep-renal',
            },
            {
                label: 'None of the above',
                description: 'Standard regimen',
                next: 'pep-regimen',
            },
        ],
    },
    {
        id: 'pep-pregnancy',
        type: 'info',
        module: 3,
        title: 'Pregnancy Considerations',
        body: 'PEP is safe and recommended in pregnancy. Use the same preferred regimen.\n\n\u2022 [Biktarvy](#/drug/biktarvy) (BIC/FTC/TAF) \u2014 preferred single-tablet regimen, extensive safety data in pregnancy\n\u2022 Alternative: [TDF/FTC](#/drug/tdf-ftc) + [Dolutegravir](#/drug/dolutegravir)\n\u2022 Avoid efavirenz-based regimens\n\u2022 OB/HIV specialist consultation recommended',
        citation: [1, 4],
        next: 'pep-regimen',
    },
    {
        id: 'pep-renal',
        type: 'info',
        module: 3,
        title: 'Renal Impairment',
        body: 'Dose adjustment required for CrCl <50 mL/min.\n\n\u2022 Use TAF-based regimen (TAF is preferred over TDF in renal impairment)\n\u2022 [Biktarvy](#/drug/biktarvy) \u2014 do not use if CrCl <30\n\u2022 If CrCl <30: consult ID/pharmacy for alternative regimen\n\u2022 Avoid TDF if CrCl <60 (nephrotoxic)',
        citation: [1, 4],
        next: 'pep-regimen',
    },
    {
        id: 'pep-regimen',
        type: 'info',
        module: 3,
        title: '28-Day Regimen',
        body: '**PREFERRED REGIMEN**\n[Biktarvy](#/drug/biktarvy) (bictegravir/emtricitabine/TAF) \u2014 1 tablet PO daily x 28 days\n\n**ALTERNATIVE REGIMEN**\n[TDF/FTC](#/drug/tdf-ftc) (Truvada) 1 tablet PO daily + [Dolutegravir](#/drug/dolutegravir) (Tivicay) 50 mg PO daily x 28 days\n\n**SECOND ALTERNATIVE**\n[TDF/FTC](#/drug/tdf-ftc) + [Darunavir](#/drug/darunavir) 800 mg PO daily + [Ritonavir](#/drug/ritonavir) 100 mg PO daily x 28 days\n\nPrescribe full 28-day course from the ED. Do not dispense starter packs \u2014 patients may not follow up for refills.',
        citation: [1, 2, 4],
        next: 'pep-followup',
    },
    // =====================================================================
    // MODULE 4: FOLLOW-UP
    // =====================================================================
    {
        id: 'pep-followup',
        type: 'result',
        module: 4,
        title: 'Follow-Up & Disposition',
        body: 'HIV TESTING SCHEDULE\n\u2022 Baseline: HIV Ag/Ab (4th gen) at initial visit\n\u2022 4\u20136 weeks: Repeat HIV test\n\u2022 3 months: Repeat HIV test (final if 4th gen used)\n\nMEDICATION FOLLOW-UP\n\u2022 2-week visit: Assess adherence, side effects, renal function\n\u2022 Complete full 28 days \u2014 early discontinuation reduces efficacy\n\nOCCUPATIONAL EXPOSURES\n\u2022 Report to occupational health / employee health\n\u2022 HBV: Check vaccination status, give HBIG + vaccine series if non-immune\n\u2022 HCV: Baseline + 6-month HCV Ab; if seroconversion, early DAA treatment cures >95%\n\nPrEP TRANSITION\n\u2022 For patients with ongoing HIV risk, transition to PrEP after completing PEP and confirming HIV-negative status\n\u2022 No gap needed between PEP and PrEP',
        recommendation: 'Prescribe full 28-day course. Schedule follow-up at 2 weeks. Arrange HIV testing at 4\u20136 weeks and 3 months. Discuss PrEP for ongoing risk. For occupational exposures, report to employee health and assess HBV/HCV exposure.',
        confidence: 'recommended',
        citation: [1, 2, 5, 6, 7],
    },
];
export const PEP_NODE_COUNT = PEP_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for flowchart progress bar)
// -------------------------------------------------------------------
export const PEP_MODULE_LABELS = [
    'Exposure Assessment',
    'HIV Assessment',
    'Initiation',
    'Follow-Up',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const PEP_CITATIONS = [
    { num: 1, text: 'Tanner MR, et al. Antiretroviral PEP After Sexual, IDU, or Other Nonoccupational Exposure to HIV \u2014 CDC Recommendations, 2025. MMWR. 2025;74(1):1-56.' },
    { num: 2, text: 'Kofman AD, et al. 2025 US PHS Guidelines for Management of Occupational Exposures to HIV. Infect Control Hosp Epidemiol. 2025;46(9):863-873.' },
    { num: 3, text: 'Kuhar DT, et al. Updated US PHS Guidelines for Management of Occupational Exposures to HIV. Infect Control Hosp Epidemiol. 2013;34(9):875-92.' },
    { num: 4, text: 'Gandhi RT, et al. Antiretroviral Drugs for Treatment and Prevention of HIV: 2022 IAS-USA Recommendations. JAMA. 2023;329(1):63-84.' },
    { num: 5, text: 'CDC. Preexposure Prophylaxis for the Prevention of HIV Infection \u2014 2021 Update. Clinical Practice Guideline.' },
    { num: 6, text: 'Workowski KA, et al. STI Treatment Guidelines, 2021. MMWR. 2021;70(4):1-187.' },
    { num: 7, text: 'Schillie S, et al. Prevention of HBV Infection: ACIP Recommendations. MMWR. 2018;67(1):1-31.' },
];
