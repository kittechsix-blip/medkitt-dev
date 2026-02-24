// MedKitt — Bronchiolitis Management
// Assessment → Severity & Interventions → Response & Respiratory Support → Disposition
// 4 modules: Assessment → Severity & Interventions → Response & Respiratory Support → Disposition
// 19 nodes total.
export const BRONCHIOLITIS_NODES = [
    // =====================================================================
    // MODULE 1: ASSESSMENT
    // =====================================================================
    {
        id: 'bronch-start',
        type: 'info',
        module: 1,
        title: 'Bronchiolitis — Clinical Recognition',
        body: '**Inclusion Criteria:**\n\u2022 Age >28 days and <24 months\n\u2022 Clinical symptoms: increased work of breathing, persistent cough, feeding difficulty, \u00B1 fever\n\u2022 First episode of wheezing OR diagnosis of bronchiolitis\n\nIf respiratory arrest is imminent, triage and initiate care in the resuscitation room.\n\nUse the [BAS Calculator](#/calculator/bas) for objective severity scoring.\n\nSee [NOT Recommended Interventions](#/info/bronch-not-recommended) \u2014 CXR, viral testing, albuterol, steroids, and antibiotics have no role in standard bronchiolitis.',
        citation: [1, 2],
        next: 'bronch-exclude',
    },
    {
        id: 'bronch-exclude',
        type: 'question',
        module: 1,
        title: 'Exclusion Criteria',
        body: 'Does the patient have **any** of the following?\n\n\u2022 Chronic lung disease or cystic fibrosis\n\u2022 Congenital heart disease\n\u2022 Immunodeficiency\n\u2022 Toxic appearance or shock\n\u2022 Neuromuscular disease\n\u2022 Artificial or abnormal airway\n\u2022 Recurrent wheezing (>3 episodes)\n\u2022 Respiratory failure requiring mechanical ventilation',
        citation: [1, 2],
        options: [
            {
                label: 'No exclusions',
                description: 'Proceed with standard bronchiolitis pathway',
                next: 'bronch-severity',
            },
            {
                label: 'Exclusion criteria present',
                description: 'Patient has comorbidities or does not meet inclusion',
                next: 'bronch-excluded',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'bronch-excluded',
        type: 'result',
        module: 1,
        title: 'Not Eligible for Standard Pathway',
        body: 'This pathway applies to previously healthy infants with first-episode bronchiolitis. Patients with significant comorbidities require **individualized evaluation and management**.\n\nConsider:\n\u2022 Subspecialty consultation\n\u2022 Alternative diagnoses (reactive airway disease, pertussis, foreign body)\n\u2022 Management guided by underlying condition',
        recommendation: 'Individualized management required. Consider subspecialty consult.',
        confidence: 'recommended',
        citation: [1],
    },
    // =====================================================================
    // MODULE 2: SEVERITY & INITIAL INTERVENTIONS
    // =====================================================================
    {
        id: 'bronch-severity',
        type: 'question',
        module: 2,
        title: 'Severity Assessment',
        body: 'Classify severity using clinical findings. Use the [BAS Calculator](#/calculator/bas) for objective scoring.\n\n**Document BAS score before and after all interventions.**',
        calculatorLinks: [{ id: 'bas', label: 'BAS Calculator' }],
        citation: [1, 2],
        options: [
            {
                label: 'Mild (BAS 0\u20133)',
                description: 'Alert, active, feeding well. None or minimal retractions. RR normal to mildly elevated (<50). SpO\u2082 \u226590% awake or \u226588% asleep.',
                next: 'bronch-mild',
            },
            {
                label: 'Moderate (BAS 4\u20138)',
                description: 'Alert, consolable, feeding decreased. Minimal to moderate retractions. RR 50\u201369. SpO\u2082 <90% awake or <88% asleep.',
                next: 'bronch-moderate',
            },
            {
                label: 'Severe (BAS 9\u201312)',
                description: 'Fussy, difficult to console, poor feeding. Moderate to severe retractions. RR \u226570. SpO\u2082 <90% awake or <88% asleep.',
                next: 'bronch-severe',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'bronch-mild',
        type: 'info',
        module: 2,
        title: 'Mild Bronchiolitis — Supportive Care',
        body: '**Interventions:**\n\u2022 Nasal suction using nasal aspirator (gentle, superficial \u2014 **NOT** deep suction beyond nasopharynx)\n\u2022 Reposition for comfort\n\u2022 Assess hydration status and encourage PO fluids\n\n**Document BAS score before and after interventions.**\n\nObserve for 1\u20132 hours, then reassess.\n\nSee [NOT Recommended Interventions](#/info/bronch-not-recommended).',
        citation: [1, 2],
        next: 'bronch-mild-reassess',
    },
    {
        id: 'bronch-moderate',
        type: 'info',
        module: 2,
        title: 'Moderate Bronchiolitis — Notify Provider',
        body: '**NOTIFY PROVIDER**\n\n**Interventions:**\n\u2022 Nasal suction using nasal aspirator\n\u2022 Rehydration (IV if unable to tolerate PO)\n\u2022 Supplemental O\u2082 via nasal cannula or simple mask\n\u2022 Target SpO\u2082 \u226590% awake or \u226588% asleep\n\n**Document BAS score before and after interventions.**\n\nSee [NOT Recommended Interventions](#/info/bronch-not-recommended).',
        citation: [1, 2],
        next: 'bronch-resp-check',
    },
    {
        id: 'bronch-severe',
        type: 'info',
        module: 2,
        title: 'Severe Bronchiolitis — Escalate',
        body: '**NOTIFY PROVIDER IMMEDIATELY**\n\n**Interventions:**\n\u2022 Nasal suction using nasal aspirator\n\u2022 Supplemental O\u2082 \u2014 prepare for HFNC initiation\n\u2022 Assess dehydration \u2014 IV fluid resuscitation if needed\n\u2022 Continuous monitoring\n\u2022 Place PIV if not already done\n\nProceed directly to HFNC initiation.',
        citation: [1, 2, 3],
        next: 'bronch-hfnc-init',
    },
    // =====================================================================
    // MODULE 3: RESPONSE & RESPIRATORY SUPPORT
    // =====================================================================
    {
        id: 'bronch-mild-reassess',
        type: 'question',
        module: 3,
        title: 'Mild — Reassessment',
        body: 'Reassess after 1\u20132 hours of supportive care.\n\nCheck: SpO\u2082, RR, work of breathing, ability to feed, hydration status.\n\nUse [BAS Calculator](#/calculator/bas) for objective scoring.',
        citation: [1],
        options: [
            {
                label: 'Improving \u2014 meets discharge criteria',
                description: 'SpO\u2082 \u226590% RA, RR <60, feeding well, parents comfortable',
                next: 'bronch-ed-dc',
            },
            {
                label: 'Not improving or worsening',
                description: 'Escalate to moderate pathway',
                next: 'bronch-moderate',
            },
        ],
    },
    {
        id: 'bronch-resp-check',
        type: 'question',
        module: 3,
        title: 'Response to Interventions',
        body: 'Reassess after nasal suction and supplemental O\u2082.\n\nAre **oxygen needs AND work of breathing** adequately managed?',
        citation: [1, 2],
        options: [
            {
                label: 'Improving \u2014 meets discharge criteria',
                description: 'SpO\u2082 \u226590% RA, RR <60, minimal WOB, feeding well',
                next: 'bronch-ed-dc',
            },
            {
                label: 'Stable on NC/mask \u2014 admit',
                description: 'Requires ongoing supplemental O\u2082 but not escalating',
                next: 'bronch-admit-acu',
            },
            {
                label: 'Not improving \u2014 escalate to HFNC',
                description: 'O\u2082 and WOB needs not met with NC/simple mask',
                next: 'bronch-hfnc-init',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'bronch-hfnc-init',
        type: 'info',
        module: 3,
        title: 'HFNC Initiation',
        body: '**Starting Flow Rates:**\n\u2022 <7 kg: **4 LPM**\n\u2022 \u22657 kg: **6 LPM**\n\nStart FiO\u2082 at 21%, titrate to maintain SpO\u2082 \u226590%.\n\nPatient must be watched for at least **30 minutes** in the ED after starting HFNC.\n\nContinuous pulse oximetry required.\n\n**Feeding:** NPO for ~1 hour to assess response.\n\nSee [HFNC Protocol Reference](#/info/bronch-hfnc-protocol) for full details including contraindications and max flow rates.',
        citation: [2, 3],
        next: 'bronch-hfnc-assess',
    },
    {
        id: 'bronch-hfnc-assess',
        type: 'question',
        module: 3,
        title: 'HFNC Response (Q15min BAS)',
        body: 'Assess BAS every 15 minutes after HFNC initiation.\n\nIf BAS \u22659: **suction first**, then reassess. If still \u22659 after suction, contact primary team.\n\nUse [BAS Calculator](#/calculator/bas) for scoring.',
        calculatorLinks: [{ id: 'bas', label: 'BAS Calculator' }],
        citation: [3],
        options: [
            {
                label: 'BAS <9 \u2014 improving',
                description: 'Continue current settings, transition to maintenance',
                next: 'bronch-hfnc-stable',
            },
            {
                label: 'BAS \u22659 persists after suction',
                description: 'Contact primary team. Consider escalation.',
                next: 'bronch-hfnc-escalate',
                urgency: 'urgent',
            },
        ],
    },
    {
        id: 'bronch-hfnc-stable',
        type: 'info',
        module: 3,
        title: 'HFNC Maintenance',
        body: '**Monitoring:**\n\u2022 Continuous pulse oximetry\n\u2022 BAS Q4h or per PEWS score\n\u2022 Document HR, RR, pulse ox\n\u2022 Suction PRN + BAS Q4h\n\n**Feeding:**\n\u2022 Mild BAS \u2192 May resume PO (first feed observed by staff)\n\u2022 Moderate to severe BAS \u2192 Consider NG feeds\n\nMust be **stable for \u22654 hours** on maintenance phase before weaning.\n\nSee [HFNC Weaning Protocol](#/info/bronch-hfnc-weaning) and [Feeding Guidelines](#/info/bronch-feeding).',
        citation: [3],
        next: 'bronch-wean-check',
    },
    {
        id: 'bronch-hfnc-escalate',
        type: 'question',
        module: 3,
        title: 'Escalation Decision',
        body: 'Patient not improving on HFNC.\n\n**If NOT at max flow:** Increase by 2 LPM.\n\u2022 Max: 2 LPM/kg for \u22647 kg, **14 LPM** for >7 kg\n\u2022 Monitor for signs of excess flow\n\n**Critical care consult triggers:**\n\u2022 Worsening after 60 minutes on HFNC\n\u2022 Severe respiratory distress on HFNC\n\u2022 FiO\u2082 >50%\n\u2022 Flow rates above recommended maximum\n\u2022 Apnea\n\u2022 Severe dehydration or shock',
        citation: [2, 3],
        options: [
            {
                label: 'Increase flow \u2014 reassess',
                description: 'Not at max flow. Increase 2 LPM, reassess in 15 min.',
                next: 'bronch-hfnc-assess',
            },
            {
                label: 'Worsening on max flow (<60 min)',
                description: 'High acuity admission',
                next: 'bronch-admit-high',
                urgency: 'urgent',
            },
            {
                label: 'Worsening >60 min / apnea / PPV needed',
                description: 'PICU / Critical care consult',
                next: 'bronch-picu',
                urgency: 'critical',
            },
        ],
    },
    // =====================================================================
    // MODULE 4: DISPOSITION
    // =====================================================================
    {
        id: 'bronch-wean-check',
        type: 'question',
        module: 4,
        title: 'Ready to Wean?',
        body: 'Has the patient been stable on current HFNC settings for **\u22654 hours**?\n\nSee [HFNC Weaning & Holiday Protocol](#/info/bronch-hfnc-weaning) for detailed criteria and weaning steps.',
        citation: [3],
        options: [
            {
                label: 'Yes \u2014 stable \u22654 hours',
                description: 'Begin weaning protocol. Admit for continued monitoring.',
                next: 'bronch-admit-acu',
            },
            {
                label: 'Not yet stable',
                description: 'Continue maintenance phase. Reassess in 4 hours.',
                next: 'bronch-hfnc-stable',
            },
        ],
    },
    {
        id: 'bronch-ed-dc',
        type: 'result',
        module: 4,
        title: 'ED Discharge',
        body: '**ALL discharge criteria must be met:**\n\u2022 SpO\u2082 \u226590% on room air\n\u2022 Respirations <60/min and/or minimal to no increased WOB\n\u2022 Tolerating oral feeding at a level to maintain hydration\n\u2022 Parents comfortable with providing home care\n\u2022 Parent/guardian education complete\n\n**Parent Education:**\n\u2022 [Bronchiolitis: Home Care (English)](#/info/bronch-parent-en)\n\u2022 [Bronquiolitis: Cuidados en el Hogar (Espa\u00F1ol)](#/info/bronch-parent-es)\n\n**Return precautions:** Feeding decreases >50%, worsening breathing, signs of dehydration (fewer wet diapers, no tears, dry mouth), fever \u2265100.4\u00B0F in infants <3 months.\n\n**Follow up with pediatrician in 1\u20132 days.**',
        recommendation: 'Discharge with education. Parents should demonstrate nasal suction technique. Follow up with PCP in 1\u20132 days.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    {
        id: 'bronch-admit-acu',
        type: 'result',
        module: 4,
        title: 'Admit \u2014 Acute Care Unit',
        body: '**Admission criteria:**\n\u2022 Routine bronchiolitis management\n\u2022 FiO\u2082 <50% to maintain SaO\u2082 \u226590%\n\u2022 HFNC at standard flow rates\n\u2022 Continuation of care from higher acuity unit\n\n**Orders:**\n\u2022 BAS Q4h\n\u2022 Nasal suction PRN\n\u2022 Continuous or intermittent pulse oximetry\n\u2022 Assess hydration and feeding tolerance\n\nSee [Admission Criteria](#/info/bronch-admission-criteria) and [HFNC Weaning Protocol](#/info/bronch-hfnc-weaning).\n\n**Inpatient Discharge Criteria:** SpO\u2082 \u226590% on room air for **\u22652 continuous hours**, RR <60, minimal WOB, tolerating PO, parents demonstrate suction technique, education complete.\n\n**Parent Education:**\n\u2022 [Bronchiolitis: Home Care (English)](#/info/bronch-parent-en)\n\u2022 [Bronquiolitis: Cuidados en el Hogar (Espa\u00F1ol)](#/info/bronch-parent-es)',
        recommendation: 'Admit to acute care unit. Continue supportive care. Wean HFNC when stable \u22654 hours.',
        confidence: 'recommended',
        citation: [1, 2, 3],
    },
    {
        id: 'bronch-admit-high',
        type: 'result',
        module: 4,
        title: 'Admit \u2014 High Acuity',
        body: '**High acuity criteria:**\n\u2022 Significant cardiac or pulmonary comorbidities\n\u2022 Moderate to severe symptoms (BAS 4\u201312)\n\u2022 Worsening clinical status despite increasing flow rates\n\u2022 Comorbidities requiring closer monitoring\n\nContinuous monitoring. Lower threshold for PICU transfer.\n\nSee [Admission Criteria](#/info/bronch-admission-criteria).',
        recommendation: 'Admit to high acuity unit. Continuous monitoring. Reassess Q15min. Escalate to PICU if worsening.',
        confidence: 'recommended',
        citation: [1, 2],
    },
    {
        id: 'bronch-picu',
        type: 'result',
        module: 4,
        title: 'PICU / Critical Care Consult',
        body: '**PICU admission indications:**\n\u2022 Worsening clinical status after **60 minutes** of HFNC\n\u2022 Requiring positive pressure ventilation\n\u2022 Witnessed episode of apnea\n\u2022 Flow rates above maximum recommended levels\n\u2022 FiO\u2082 >50% to maintain SpO\u2082\n\u2022 Severe dehydration or shock\n\n**NICU consideration:**\n\u2022 <44 weeks corrected gestational age\n\u2022 Prematurity \u226432 weeks and <44 weeks post-menstrual age\n\nPrepare for potential intubation. Ensure IV access. Fluid resuscitation if dehydrated.',
        recommendation: 'PICU admission or transfer. Critical care consult immediately.',
        confidence: 'definitive',
        citation: [1, 2, 3],
    },
    {
        id: 'bronch-inpt-dc',
        type: 'result',
        module: 4,
        title: 'Inpatient Discharge Criteria',
        body: '**ALL must be met:**\n\u2022 SpO\u2082 \u226590% on room air for **\u22652 continuous hours** (not a single reading)\n\u2022 Respirations <60/min and age-appropriate\n\u2022 Minimal to no increased work of breathing\n\u2022 Tolerating PO feeding at a level to maintain hydration\n\u2022 Parents comfortable with home care\n\u2022 Parents demonstrate nasal suction technique\n\u2022 Return precautions reviewed and understood\n\n**Follow up with pediatrician in 1\u20132 days.** Symptoms may persist 1\u20132 weeks \u2014 parents should expect gradual improvement.\n\n**Parent Education:**\n\u2022 [Bronchiolitis: Home Care (English)](#/info/bronch-parent-en)\n\u2022 [Bronquiolitis: Cuidados en el Hogar (Espa\u00F1ol)](#/info/bronch-parent-es)',
        recommendation: 'Discharge when SpO\u2082 \u226590% on room air for \u22652 continuous hours, feeding adequately, and parents confident in home care.',
        confidence: 'recommended',
        citation: [1, 2],
    },
];
export const BRONCHIOLITIS_NODE_COUNT = BRONCHIOLITIS_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const BRONCHIOLITIS_MODULE_LABELS = [
    'Assessment',
    'Severity & Interventions',
    'Response & Respiratory Support',
    'Disposition',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const BRONCHIOLITIS_CITATIONS = [
    { num: 1, text: 'Ralston SL, et al. Clinical Practice Guideline: The Diagnosis, Management, and Prevention of Bronchiolitis. Pediatrics. 2014;134(5):e1474-e1502.' },
    { num: 2, text: "Dell Children's Medical Center EBOC. Bronchiolitis Clinical Pathway. Rev Oct 2019." },
    { num: 3, text: "Dell Children's Medical Center EBOC. HFNC Initiation, Maintenance, and Weaning Pathway. Rev Nov 2021." },
    { num: 4, text: 'Franklin D, et al. A Randomized Trial of High-Flow Oxygen Therapy in Infants with Bronchiolitis. N Engl J Med. 2018;378(12):1121-1131.' },
    { num: 5, text: 'Gadomski AM, Scribani MB. Bronchodilators for Bronchiolitis. Cochrane Database Syst Rev. 2014;(6):CD001266.' },
    { num: 6, text: 'Zhang L, et al. Nebulized Hypertonic Saline for Acute Bronchiolitis in Infants. Cochrane Database Syst Rev. 2017;(12):CD006458.' },
    { num: 7, text: 'Spurling GK, et al. Antibiotics for Bronchiolitis in Children. Cochrane Database Syst Rev. 2011;(6):CD005189.' },
    { num: 8, text: 'Perrotta C, et al. Chest Physiotherapy for Acute Bronchiolitis. Cochrane Database Syst Rev. 2012;(2):CD004873.' },
    { num: 9, text: "Children's Hospital Association of Texas. Bronchiolitis Patient Education Brochure." },
];
