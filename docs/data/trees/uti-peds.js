// MedKitt — Pediatric UTI (First Febrile UTI + Neonatal UTI) Management
// Initial Assessment → Screening & Workup → Antibiotic Management → Imaging → Disposition & Follow-up
// 5 modules: Initial Assessment → Screening & Workup → Antibiotic Management → Imaging → Disposition & Follow-up
// 28 nodes total.
export const UTI_PEDS_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'uti-start',
        type: 'question',
        module: 1,
        title: 'Patient Age',
        body: '**Inclusion criteria:** Pediatric patient with suspected urinary tract infection.\n\n**UTI definition:** >50,000 CFU/mL in catheter-obtained specimen OR ≥100,000 CFU/mL in clean catch specimen, with pyuria on urinalysis.\n\n**Note — Exclusion criteria:** Immunocompromised patients, indwelling urinary catheter, known complex urologic anatomy (unless first presentation), and patients <7 days of life should be managed off-pathway with specialist consultation.',
        citation: [1, 2, 3],
        options: [
            {
                label: 'Neonatal (<48 wks PMA, >7 days old)',
                next: 'uti-neo-dx',
            },
            {
                label: '2–24 months',
                next: 'uti-infant-screen',
            },
            {
                label: '>24 months / Toilet Trained',
                next: 'uti-older-screen',
            },
        ],
    },
    {
        id: 'uti-neo-dx',
        type: 'info',
        module: 1,
        title: 'Neonatal UTI — Confirmed Diagnosis',
        body: 'This pathway applies to infants **<48 weeks postmenstrual age** and **>7 days of life** with UTI defined as >50,000 CFU/mL in catheter-obtained specimen.\n\n**Exclusion criteria:**\n• History of Candida infection (consult Infectious Disease)\n• Concomitant bacteremia or meningitis\n• >48 weeks PMA\n• <7 days of age\n\nAlter antibiotic therapy based on culture-specific antimicrobial susceptibility.\n\n**DO NOT repeat urine culture for test of cure UNLESS Candida or ESBL.**',
        citation: [2],
        next: 'uti-neo-abx',
    },
    // =====================================================================
    // MODULE 2: SCREENING & WORKUP
    // =====================================================================
    {
        id: 'uti-infant-screen',
        type: 'question',
        module: 2,
        title: 'UTI Risk Screening (2–24 months)',
        body: '**Assess probability of UTI >1%:**\n\n**Females** — 2 or more risk factors:\n• Non-Black race\n• Temperature ≥39°C\n• Fever ≥2 days duration\n• No apparent source of infection\n• Age <12 months\n\n**Males (uncircumcised):** Any febrile male — screen.\n**Males (circumcised):** 3 or more risk factors:\n• Non-Black race\n• Temperature ≥39°C\n• Fever ≥2 days duration\n• No apparent source of infection\n• Age <6 months\n\nAlso screen if: prior history of UTI or fever ≥2 days without identified source.',
        citation: [1, 4],
        options: [
            {
                label: 'Likelihood of UTI >1% — Screen',
                next: 'uti-ua-cath',
            },
            {
                label: 'Likelihood ≤1%',
                next: 'uti-low-risk',
            },
        ],
    },
    {
        id: 'uti-older-screen',
        type: 'question',
        module: 2,
        title: 'UTI Screening (>24 months / Toilet Trained)',
        body: '**Screen all patients with:**\n• Symptoms referable to the urinary tract (dysuria, frequency, urgency, abdominal/flank pain, new incontinence)\n• Prior history of UTI with fever ≥2 days\n• Prolonged fever (≥5 days) without identified source\n\n**Collection method:** Clean catch UA with micro.\n\nInclude additional tests if STI is being considered.',
        citation: [1, 3],
        options: [
            {
                label: 'Symptoms present — Screen',
                next: 'uti-ua-clean',
            },
            {
                label: 'No screening criteria met',
                next: 'uti-low-risk',
            },
        ],
    },
    {
        id: 'uti-ua-cath',
        type: 'question',
        module: 2,
        title: 'Obtain UA (Catheter or SPA)',
        body: 'Order UA with Micro.\n\n**Collection:**\n**OPTION 1:** Catheter or suprapubic aspirate (preferred)\n**OPTION 2:** Bag specimen\n\n[UTI Definitions & Urinalysis](#/info/uti-definition-info)\n\n**Positive UA:** Leukocyte esterase OR nitrites OR microscopic WBC/bacteria.',
        citation: [1, 4],
        options: [
            {
                label: 'UA Positive',
                next: 'uti-culture',
            },
            {
                label: 'UA Negative',
                next: 'uti-ua-neg',
            },
        ],
    },
    {
        id: 'uti-ua-clean',
        type: 'info',
        module: 2,
        title: 'Clean Catch UA',
        body: 'Obtain clean catch urine analysis with micro.\n\nInclude additional tests if STI is being considered.\n\nIf UA positive, **must obtain catheter or clean catch specimen for culture** — bag specimens are not acceptable for culture.\n\n[UTI Definitions & Urinalysis](#/info/uti-definition-info)',
        citation: [1, 3],
        next: 'uti-ua-result-older',
    },
    {
        id: 'uti-ua-result-older',
        type: 'question',
        module: 2,
        title: 'UA Results',
        body: 'Assess urinalysis results. Positive UA: leukocyte esterase OR nitrites OR microscopic WBC/bacteria.',
        citation: [1],
        options: [
            {
                label: 'UA Positive',
                next: 'uti-culture',
            },
            {
                label: 'UA Negative',
                next: 'uti-ua-neg',
            },
        ],
    },
    {
        id: 'uti-ua-neg',
        type: 'result',
        module: 2,
        title: 'UA Negative — Discharge',
        body: 'Negative UA. Discharge with PCP or ED follow-up in 24–48 hours.\n\nClose clinical follow-up recommended. Consider alternative diagnoses for fever source.',
        recommendation: 'Discharge with PCP/ED follow-up in 24–48 hours.',
        citation: [1],
    },
    {
        id: 'uti-culture',
        type: 'info',
        module: 2,
        title: 'Order Urine Culture',
        body: '**MUST be obtained from clean catch, catheter, or suprapubic aspirate.**\n\nIf bag sample was previously tested, another specimen must be obtained for culture.\n\nCase manager follow-up on culture results.',
        citation: [1, 3],
        next: 'uti-admit-assess',
    },
    // =====================================================================
    // MODULE 3: ANTIBIOTIC MANAGEMENT
    // =====================================================================
    {
        id: 'uti-admit-assess',
        type: 'question',
        module: 3,
        title: 'Disposition Assessment',
        body: '**Assess for hospital admission criteria.**\n\n**Inpatient criteria:**\n• Ill-appearing (SIRS/sepsis)\n• Dehydration requiring IV or NG fluids\n• Persistent vomiting / inability to tolerate PO antibiotics\n• Social indicators affecting compliance or follow-up\n• Failure of outpatient treatment',
        citation: [1, 3],
        options: [
            {
                label: 'Outpatient — Discharge from ED',
                next: 'uti-ed-abx',
            },
            {
                label: 'Admit to Hospital',
                next: 'uti-inpatient-abx',
            },
        ],
    },
    {
        id: 'uti-ed-abx',
        type: 'info',
        module: 3,
        title: 'ED/Outpatient Antibiotic Management',
        body: '**First Line:** [Cephalexin](#/drug/cephalexin) 50 mg/kg/day divided TID–QID | Max 1 g/dose\n\n**Alternative:** [Amoxicillin-Clavulanate](#/drug/amoxicillin-clavulanate) 20–40 mg/kg/day divided BID | Max 875 mg/dose\n\n**If IgE-mediated allergy to penicillins AND cephalosporins:** [Ciprofloxacin](#/drug/ciprofloxacin) 20 mg/kg/day divided BID | Max 750 mg/dose\n\n**Medication intolerant, concern for compliance, or age <6 months:** Consider single dose [Ceftriaxone](#/drug/ceftriaxone) 75 mg/kg IV or IM prior to discharge | Max 2 g/dose\n\n**Total duration:**\n• <6 months: IV + PO = **10 days**\n• ≥6 months: IV + PO = **7 days**\n\nTMP-SMX should be used with caution — only 71% susceptible among E. coli isolates.',
        citation: [1, 3],
        next: 'uti-ed-followup',
    },
    {
        id: 'uti-inpatient-abx',
        type: 'info',
        module: 3,
        title: 'Inpatient Antibiotic Management',
        body: '**First Line:** [Cefazolin](#/drug/cefazolin) 50 mg/kg/day divided q8h | Max 2 g/dose\n\n**If IgE-mediated allergy to penicillins AND cephalosporins:** Aztreonam 90 mg/kg/day divided q8h | Max 2 g/dose, plus Gentamicin 5–7 mg/kg/day q24h\n\n**If concern for CNS involvement:** [Ceftriaxone](#/drug/ceftriaxone) 100 mg/kg/day divided q12h | Max 2 g/dose\n\n**Transition criteria:** 24–48 hours of IV therapy with clinical improvement. Assess susceptibility and narrow spectrum.\n\n**Total IV + PO = 7 days.**',
        citation: [1, 3, 4],
        next: 'uti-inpatient-dc',
    },
    {
        id: 'uti-neo-abx',
        type: 'question',
        module: 3,
        title: 'Neonatal UTI — Antibiotic Selection',
        body: 'Treatment is based on whether UTI is **complicated or uncomplicated**.\n\n**Complicated UTI criteria:**\n• Functional or anatomic abnormality\n• Indwelling catheter\n• Recent instrumentation\n• Recent antibiotics\n• Immunosuppression',
        citation: [2],
        options: [
            {
                label: 'Uncomplicated UTI (7-day course)',
                next: 'uti-neo-rx',
            },
            {
                label: 'Complicated UTI (10-day course)',
                next: 'uti-neo-rx-comp',
            },
        ],
    },
    {
        id: 'uti-neo-rx',
        type: 'info',
        module: 3,
        title: 'Neonatal UTI — Uncomplicated Treatment',
        body: '**IV:** [Cefazolin](#/drug/cefazolin) 50 mg/kg/day divided q8h\n\n**Transition to PO** if term (by PMA), once sensitivities completed:\n[Cephalexin](#/drug/cephalexin)\n• ≤28 days of life: 75 mg/kg/day divided q8h\n• ≥29 days of life: 100 mg/kg/day divided q6h\n\n**Duration: 7 days**\n\nAlter therapy based on culture susceptibility.\n\n**DO NOT repeat urine culture for test of cure unless Candida or ESBL.**',
        citation: [2],
        next: 'uti-neo-imaging',
    },
    {
        id: 'uti-neo-rx-comp',
        type: 'info',
        module: 3,
        title: 'Neonatal UTI — Complicated Treatment',
        body: 'Same antibiotic regimen as uncomplicated but **Duration: 10 days**.\n\n**IV:** [Cefazolin](#/drug/cefazolin) 50 mg/kg/day divided q8h\n\n**Transition to PO:**\n[Cephalexin](#/drug/cephalexin)\n• ≤28 days of life: 75 mg/kg/day divided q8h\n• ≥29 days of life: 100 mg/kg/day divided q6h\n\nAlter therapy based on culture susceptibility.\n\n**DO NOT repeat urine culture unless Candida or ESBL.**',
        citation: [2],
        next: 'uti-neo-imaging',
    },
    // =====================================================================
    // MODULE 4: IMAGING
    // =====================================================================
    {
        id: 'uti-neo-imaging',
        type: 'info',
        module: 4,
        title: 'Neonatal Post-Treatment Imaging',
        body: 'Obtain **renal and bladder ultrasound (RBUS)** following UTI treatment completion.\n\n*If fever persists >48 hours after start of antibiotics or unusually severe clinical illness, obtain RBUS sooner.',
        citation: [2, 7],
        next: 'uti-neo-rbus-risk',
    },
    {
        id: 'uti-neo-rbus-risk',
        type: 'question',
        module: 4,
        title: 'Neonatal RBUS Risk Assessment',
        body: '**Are any of the following present?**\n• Atypical pathogen (non-E. coli)\n• Family history of VUR or CAKUT\n• Complex clinical course\n• Any prior UTI',
        citation: [2, 5, 7],
        options: [
            {
                label: 'Yes — Risk factors present',
                next: 'uti-neo-rbus-abnl',
            },
            {
                label: 'No risk factors',
                next: 'uti-neo-rbus-check',
            },
        ],
    },
    {
        id: 'uti-neo-rbus-check',
        type: 'question',
        module: 4,
        title: 'RBUS Results',
        body: 'Assess renal and bladder ultrasound findings.',
        citation: [2],
        options: [
            {
                label: 'RBUS Normal',
                next: 'uti-neo-complete',
            },
            {
                label: 'RBUS Abnormal',
                next: 'uti-neo-rbus-abnl',
            },
        ],
    },
    {
        id: 'uti-neo-rbus-abnl',
        type: 'result',
        module: 4,
        title: 'Abnormal RBUS — Further Workup',
        body: '**Obtain VCUG.** Obtain renal functional panel. Consult Urology. Consider Nephrology consult.\n\nPatients with **grade IV or V VUR** are at increased risk of future complications.',
        recommendation: 'Obtain VCUG, renal functional panel, Urology consult, consider Nephrology.',
        citation: [2, 6, 7],
    },
    {
        id: 'uti-neo-complete',
        type: 'result',
        module: 4,
        title: 'Neonatal UTI — Complete',
        body: 'RBUS normal, no risk factors. Complete antibiotic course.\n\nNo further evaluation is necessary.',
        recommendation: 'Complete antibiotic course. No further imaging or evaluation needed.',
        citation: [2, 5],
    },
    // =====================================================================
    // MODULE 5: DISPOSITION & FOLLOW-UP
    // =====================================================================
    {
        id: 'uti-ed-followup',
        type: 'info',
        module: 5,
        title: 'ED Discharge & Culture Follow-up',
        body: 'Discharge with PCP or ED follow-up in **24–48 hours**.\n\nCase manager follow-up on urine culture.\n\n**If culture positive:** Assess antibiotic susceptibility and adjust as necessary with PCP involvement.\n\n**If culture negative:** Contact PCP with results.',
        citation: [1],
        next: 'uti-imaging',
    },
    {
        id: 'uti-inpatient-dc',
        type: 'info',
        module: 5,
        title: 'Inpatient Discharge Criteria',
        body: '**Discharge criteria:**\n• Non-toxic appearing\n• Well-hydrated\n• Can tolerate oral antibiotics and fluids\n• Normal genitourinary anatomy\n• RBUS reviewed if performed\n• Quality follow-up within 24–48 hours\n• Clinically stable for home',
        citation: [1, 3],
        next: 'uti-imaging',
    },
    {
        id: 'uti-imaging',
        type: 'question',
        module: 5,
        title: 'Imaging Recommendations',
        body: '**RBUS criteria:**\n• Age 2–24 months with first febrile UTI\n• Children >24 months: pathogen other than E. coli, family history of renal/urologic disease, hypertension, poor growth, no improvement after 48h empiric therapy\n\n**Timing:**\n• Outpatient: order RBUS >48h of antibiotics\n• Inpatient: order after 36h (no less than 24h)',
        citation: [1, 4, 5],
        options: [
            {
                label: 'RBUS criteria met',
                next: 'uti-rbus-result',
            },
            {
                label: 'No imaging needed',
                next: 'uti-complete',
            },
        ],
    },
    {
        id: 'uti-rbus-result',
        type: 'question',
        module: 5,
        title: 'RBUS Findings',
        body: '**Assess for:**\n• Hydronephrosis (pelvocaliectasis)\n• Renal parenchymal loss\n• Kidney size discrepancies independent of SFU grade\n• Radiologist recommendation for further imaging',
        citation: [1, 5, 6],
        options: [
            {
                label: 'Abnormal findings or radiologist recommendation',
                next: 'uti-vcug',
            },
            {
                label: 'Normal RBUS',
                next: 'uti-complete',
            },
        ],
    },
    {
        id: 'uti-vcug',
        type: 'question',
        module: 5,
        title: 'VCUG Criteria',
        body: '**Criteria for obtaining VCUG:**\n• Hydronephrosis\n• Scarring\n• Dilated pelvis\n• Dilated ureter\n• Recommended by reviewing pediatric radiologist\n• Chronic hypertension +/- poor growth\n• Urinary pathogen other than E. coli\n• ESBL-producing E. coli',
        citation: [1, 5, 6],
        options: [
            {
                label: 'VCUG criteria met',
                next: 'uti-vcug-result',
            },
            {
                label: 'VCUG not indicated',
                next: 'uti-complete',
            },
        ],
    },
    {
        id: 'uti-vcug-result',
        type: 'result',
        module: 5,
        title: 'VCUG — Urology Consult',
        body: 'Consider Urology consult if abnormal VCUG.\n\nPatients with **grade IV or V VUR** are at increased risk of future complications.',
        recommendation: 'Urology consult for abnormal VCUG. Grade IV–V VUR requires close follow-up.',
        citation: [1, 6, 7],
    },
    {
        id: 'uti-complete',
        type: 'result',
        module: 5,
        title: 'UTI Management Complete',
        body: 'Antibiotic course complete. Ensure PCP follow-up within 24–48 hours.\n\nMonitor for recurrent UTI symptoms.',
        recommendation: 'Complete antibiotic course, ensure PCP follow-up in 24–48 hours.',
        citation: [1, 3],
    },
    {
        id: 'uti-low-risk',
        type: 'result',
        module: 5,
        title: 'Low Risk — Manage Off-Pathway',
        body: 'UTI likelihood ≤1% based on risk factor screening.\n\nManage off-pathway with close clinical follow-up. Consider alternative diagnoses for fever source.',
        recommendation: 'Manage off-pathway with close clinical follow-up.',
        citation: [1, 4],
    },
];
export const UTI_PEDS_NODE_COUNT = UTI_PEDS_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const UTI_PEDS_MODULE_LABELS = [
    'Initial Assessment',
    'Screening & Workup',
    'Antibiotic Management',
    'Imaging',
    'Disposition & Follow-up',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const UTI_PEDS_CITATIONS = [
    { num: 1, text: 'Dell Children\'s EBOC. First Febrile UTI Clinical Pathway. May 2017.' },
    { num: 2, text: 'Dell Children\'s EBOC. UTI Management Pathway (Neonatal). September 2024.' },
    { num: 3, text: 'Mattoo TK, Shaikh N, Nelson CP. Contemporary Management of UTI in Children. Pediatrics. 2021;147(2):e2020012138.' },
    { num: 4, text: 'Roberts KB. UTI: clinical practice guideline for febrile infants 2 to 24 months. Pediatrics. 2011;128(3):595-610.' },
    { num: 5, text: 'Pauchard JY, et al. Avoidance of VCUG in infants <3 months with E. coli UTI and normal RBUS. Arch Dis Child. 2017;102(9):804-808.' },
    { num: 6, text: 'Garcia-Roig M, et al. National trends in management of primary VUR in children. J Urol. 2018;199(1):287-293.' },
    { num: 7, text: 'Bahat H, et al. Predictors of grade 3-5 VUR in infants ≤2 months with pyelonephritis. Pediatr Nephrol. 2019;34(5):907-915.' },
];
// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------
export const UTI_PEDS_CLINICAL_NOTES = [
    'Bag specimens have a false-positive rate up to 85% — always obtain catheter or clean catch for culture confirmation before starting antibiotics.',
    'Nitrites have high specificity (~98%) but low sensitivity (~53%) for UTI in children — a negative nitrite does NOT rule out UTI. Leukocyte esterase is more sensitive.',
    'Uncircumcised males under 12 months have 4–8x higher UTI risk than circumcised males — always screen febrile uncircumcised infants.',
    'E. coli accounts for ~80% of pediatric UTIs. Non-E. coli pathogens (Klebsiella, Proteus, Enterococcus) are associated with higher rates of urinary tract abnormalities and warrant RBUS.',
    'TMP-SMX resistance among E. coli isolates is ~29% — first-generation cephalosporins (cephalexin) remain first-line with >90% susceptibility.',
    'AAP guidelines recommend RBUS after first febrile UTI in children 2–24 months but VCUG only if RBUS is abnormal or there are atypical/complex features — this reduces unnecessary invasive imaging by ~70%.',
    'Neonatal UTI without concurrent bacteremia or meningitis can be safely treated with a shorter IV-to-PO transition — culture-directed oral step-down reduces hospital stay without increasing treatment failure.',
    'Antibiotic prophylaxis after first febrile UTI remains controversial — RIVUR trial showed 50% reduction in recurrence but no difference in scarring. Reserve for patients with VUR grade III or higher.',
];
