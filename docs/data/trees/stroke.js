// MedKitt — Acute Ischemic Stroke Management
// Initial assessment → Time-based treatment (IVT/EVT/DAPT) → Post-treatment prevention.
// 5 modules: Assessment → Standard IVT → Extended/EVT → Minor Stroke → Prevention
// 20 nodes total.
export const STROKE_NODES = [
    // =====================================================================
    // MODULE 1: INITIAL ASSESSMENT
    // =====================================================================
    {
        id: 'stroke-start',
        type: 'info',
        module: 1,
        title: 'Acute Ischemic Stroke Confirmed',
        body: 'ICH excluded on non-contrast CT. Establish **last known well** time.\n\n**Immediate actions:**\n\u2022 Fingerstick glucose (only pre-tPA lab required)\n\u2022 Obtain NIHSS score\n\u2022 Establish IV access \u00D7 2\n\u2022 Activate stroke team if not already done\n\u2022 Order CTA head/neck with initial NCCT\n\nAll other labs (CBC, BMP, coags, troponin) should be drawn but should NOT delay thrombolysis in patients without known coagulopathy.',
        citation: [1, 2],
        calculatorLinks: [{ id: 'nihss', label: 'NIHSS Calculator' }],
        next: 'stroke-deficit',
    },
    {
        id: 'stroke-deficit',
        type: 'question',
        module: 1,
        title: 'Deficit Severity',
        body: 'Is a **disabling deficit** present?\n\nUse the NIHSS calculator below to score the deficit. **NIHSS >5 = disabling.**\n\nDisabling = deficit that would impair activities of daily living (e.g., limb weakness, aphasia, neglect, visual field cut, gait impairment).\n\nNondisabling = isolated minor symptoms (e.g., mild sensory change, mild dysarthria, isolated facial droop without other deficits).',
        citation: [2, 3],
        calculatorLinks: [{ id: 'nihss', label: 'NIHSS Calculator' }],
        options: [
            {
                label: 'Yes \u2014 Disabling deficit',
                description: 'NIHSS \u22656 or functionally significant deficit',
                next: 'stroke-timing',
            },
            {
                label: 'No \u2014 Minor / nondisabling',
                description: 'NIHSS 0\u20135, nondisabling symptoms',
                next: 'stroke-minor',
            },
        ],
    },
    {
        id: 'stroke-timing',
        type: 'question',
        module: 1,
        title: 'Time from Last Known Well',
        body: 'How long since the patient was **last known well** (not time of symptom discovery)?\n\nFor wake-up strokes or unknown onset: treat as time from when last seen normal. MRI DWI-FLAIR mismatch may help identify candidates within 4.5h window.',
        citation: [1],
        options: [
            {
                label: '0\u20134.5 hours',
                description: 'Standard IVT window',
                next: 'stroke-ivt-check',
                urgency: 'critical',
            },
            {
                label: '4.5\u20139 hours',
                description: 'Extended IVT window \u2014 perfusion imaging required',
                next: 'stroke-extended-ivt',
                urgency: 'urgent',
            },
            {
                label: '9\u201324 hours',
                description: 'EVT window only \u2014 requires LVO + perfusion mismatch',
                next: 'stroke-evt-window',
            },
            {
                label: '>24 hours',
                description: 'Beyond reperfusion window',
                next: 'stroke-late',
            },
        ],
    },
    // =====================================================================
    // MODULE 2: STANDARD IVT WINDOW (0\u20134.5h)
    // =====================================================================
    {
        id: 'stroke-ivt-check',
        type: 'question',
        module: 2,
        title: 'IVT Eligibility',
        body: 'Review [Thrombolysis Contraindications](#/info/stroke-contraindications) before proceeding.\n\n**BP requirement:** Must be <185/110 mmHg\n\u2022 [Labetalol](#/drug/labetalol) 10\u201320 mg IV bolus (first-line)\n\u2022 [Nicardipine](#/drug/nicardipine) 5 mg/hr IV infusion (second-line)\n\nIf BP cannot be controlled to <185/110, thrombolysis is contraindicated.\n\n**Labs:** Do NOT wait for coags unless patient is on anticoagulants or has known coagulopathy. Fingerstick glucose is the only required pre-treatment lab.',
        citation: [1, 2],
        options: [
            {
                label: 'Eligible for IVT',
                description: 'No contraindications, BP controlled',
                next: 'stroke-ivt-treat',
                urgency: 'critical',
            },
            {
                label: 'IVT Contraindicated',
                description: 'Absolute contraindication or uncontrolled BP',
                next: 'stroke-no-ivt',
            },
        ],
    },
    {
        id: 'stroke-ivt-treat',
        type: 'info',
        module: 2,
        title: 'Administer Thrombolysis',
        body: '**Preferred:** [Tenecteplase](#/drug/tenecteplase) 0.25 mg/kg IV bolus (max 25 mg) \u2014 single dose over 5 seconds.\n\n**Alternative:** [Alteplase](#/drug/alteplase) 0.9 mg/kg IV (max 90 mg) \u2014 10% bolus over 1 min, remainder over 60 min.\n\nTenecteplase is preferred per current guidelines due to equivalent efficacy, single bolus administration, and simpler dosing.\n\n[Patient Consent Info](#/info/stroke-consent)\n\n**Post-thrombolysis orders:**\n\u2022 BP <180/105 \u00D7 24h ([Labetalol](#/drug/labetalol) or [Nicardipine](#/drug/nicardipine))\n\u2022 Neuro checks q15min \u00D7 2h, then q30min \u00D7 6h, then q1h \u00D7 16h\n\u2022 No antithrombotics \u00D7 24h\n\u2022 No arterial/central lines, NG tube, or Foley \u00D7 24h if possible\n\u2022 Any neuro decline \u2192 emergent NCCT',
        citation: [1, 4, 5],
        next: 'stroke-lvo-check',
    },
    {
        id: 'stroke-lvo-check',
        type: 'question',
        module: 2,
        title: 'Large Vessel Occlusion?',
        body: 'Review CTA results. Is a **large vessel occlusion (LVO)** present?\n\nLVO targets for EVT:\n\u2022 Internal carotid artery (ICA)\n\u2022 M1 segment of middle cerebral artery (MCA)\n\u2022 M2 (proximal) MCA \u2014 may be considered\n\u2022 Basilar artery',
        citation: [6, 7],
        options: [
            {
                label: 'Yes \u2014 LVO identified',
                description: 'ICA, M1, proximal M2, or basilar occlusion',
                next: 'stroke-evt-eligible',
                urgency: 'critical',
            },
            {
                label: 'No LVO',
                description: 'No large vessel occlusion on CTA',
                next: 'stroke-post-treatment',
            },
        ],
    },
    {
        id: 'stroke-no-ivt',
        type: 'question',
        module: 2,
        title: 'IVT Contraindicated',
        body: 'IVT is contraindicated. However, **EVT is NOT contraindicated by thrombolysis exclusion criteria** \u2014 patients with contraindications to IVT may still qualify for mechanical thrombectomy.\n\nObtain CTA if not already done.',
        citation: [1, 6],
        options: [
            {
                label: 'LVO present on CTA',
                description: 'Evaluate for endovascular thrombectomy',
                next: 'stroke-evt-eligible',
                urgency: 'critical',
            },
            {
                label: 'No LVO on CTA',
                description: 'Start antiplatelet therapy',
                next: 'stroke-antiplatelet-start',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: EXTENDED WINDOWS & EVT
    // =====================================================================
    {
        id: 'stroke-extended-ivt',
        type: 'question',
        module: 3,
        title: 'Extended IVT Window (4.5\u20139h)',
        body: 'Perfusion imaging is required to determine eligibility.\n\nSee [Stroke Imaging Guide](#/info/stroke-imaging) for details on CT perfusion and MRI protocols.\n\n**EXTEND trial criteria:**\n\u2022 DWI-FLAIR mismatch on MRI (DWI+, FLAIR\u2212 suggests <4.5h)\n\u2022 OR CT perfusion showing salvageable tissue\n\u2022 Ischemic core <70 mL\n\u2022 Penumbra/core mismatch ratio >1.2',
        citation: [5, 8],
        options: [
            {
                label: 'Salvageable tissue present',
                description: 'Favorable mismatch on perfusion imaging',
                next: 'stroke-ivt-treat',
                urgency: 'critical',
            },
            {
                label: 'Not eligible for IVT',
                description: 'No mismatch or large completed infarct',
                next: 'stroke-evt-window',
            },
        ],
    },
    {
        id: 'stroke-evt-window',
        type: 'question',
        module: 3,
        title: 'EVT Eligibility (6\u201324h)',
        body: '**Anterior circulation (DAWN/DEFUSE-3 criteria):**\n\u2022 NIHSS \u22656\n\u2022 ICA or M1 occlusion on CTA\n\u2022 Small ischemic core on CT perfusion (<70 mL at 6\u201316h; <21 mL at 16\u201324h)\n\u2022 Large penumbra with mismatch ratio >1.8\n\n**Posterior circulation (basilar artery):**\n\u2022 NIHSS \u226510\n\u2022 Basilar artery occlusion on CTA\n\u2022 PC-ASPECTS \u22656\n\u2022 Up to 24h from onset (ATTENTION trial)',
        citation: [6, 7],
        options: [
            {
                label: 'Meets EVT criteria',
                description: 'LVO + favorable perfusion profile',
                next: 'stroke-evt-eligible',
                urgency: 'critical',
            },
            {
                label: 'Does not meet criteria',
                description: 'Large core, no LVO, or unfavorable imaging',
                next: 'stroke-antiplatelet-start',
            },
        ],
    },
    {
        id: 'stroke-evt-eligible',
        type: 'result',
        module: 3,
        title: 'Activate Neurointerventional Team',
        body: '**Endovascular thrombectomy (EVT) indicated.**\n\nGoal: arterial puncture within 60 minutes of arrival.\n\n\u2022 Bridging IVT: If within 4.5h and no IVT contraindications, administer [Tenecteplase](#/drug/tenecteplase) or [Alteplase](#/drug/alteplase) before/during transfer to angio suite \u2014 do NOT delay EVT for thrombolytic infusion to complete\n\u2022 NPO for sedation/general anesthesia\n\u2022 Continuous BP monitoring (arterial line)\n\u2022 Goal BP post-recanalization: <180/105 (same as post-IVT)\n\nHERMES meta-analysis: EVT achieved functional independence in 46% vs 27% with medical therapy alone (NNT ~5).',
        recommendation: 'Activate neurointerventional team immediately. Administer bridging IVT if within window and no contraindications. Target door-to-puncture <60 min.',
        confidence: 'definitive',
        citation: [6, 7],
    },
    {
        id: 'stroke-late',
        type: 'info',
        module: 3,
        title: 'Beyond Reperfusion Window',
        body: '>24 hours from last known well.\n\nNot a candidate for IVT or EVT. Focus on:\n\u2022 Antiplatelet initiation\n\u2022 Stroke etiology workup\n\u2022 Secondary prevention\n\u2022 Admission for neuro monitoring and rehab evaluation',
        citation: [1],
        next: 'stroke-antiplatelet-start',
    },
    // =====================================================================
    // MODULE 4: MINOR / NONDISABLING STROKE
    // =====================================================================
    {
        id: 'stroke-minor',
        type: 'question',
        module: 4,
        title: 'Minor Stroke Workup',
        body: 'NIHSS 0\u20135, nondisabling deficit.\n\nMRI with DWI is preferred (identifies small infarcts missed on CT).\n\n**ABCD2 Score** (TIA risk stratification):\nAge \u226560 (+1), BP \u2265140/90 (+1), Clinical features: unilateral weakness (+2) or speech impairment (+1), Duration \u226560min (+2) or 10\u201359min (+1), Diabetes (+1).\n\nInfarct on imaging or ABCD2 \u22654 = higher risk of recurrent stroke.',
        citation: [3, 9],
        options: [
            {
                label: 'ABCD2 \u22654 or infarct on imaging',
                description: 'Higher risk \u2014 dual antiplatelet therapy',
                next: 'stroke-dapt',
                urgency: 'urgent',
            },
            {
                label: 'Low risk (ABCD2 <4, no infarct)',
                description: 'Single antiplatelet, complete workup',
                next: 'stroke-single-antiplatelet',
            },
            {
                label: 'Atrial fibrillation detected',
                description: 'Cardioembolic mechanism identified',
                next: 'stroke-afib',
            },
        ],
    },
    {
        id: 'stroke-dapt',
        type: 'result',
        module: 4,
        title: 'Dual Antiplatelet Therapy (DAPT)',
        body: '**Loading (Day 1):**\n\u2022 [Aspirin](#/drug/aspirin) 325 mg + [Clopidogrel](#/drug/clopidogrel) 300 mg\n\n**Maintenance:**\n\u2022 Aspirin 81 mg + Clopidogrel 75 mg daily \u00D7 21 days\n\u2022 Then single antiplatelet (either agent)\n\n**Alternative (CYP2C19 poor metabolizer):**\n\u2022 [Ticagrelor](#/drug/ticagrelor) 180 mg load + Aspirin 325 mg, then Ticagrelor 90 mg BID + Aspirin 81 mg \u00D7 30 days\n\nPOINT trial: DAPT reduced 90-day stroke from 6.5% to 5.0% (NNT 38). Duration beyond 21 days increases bleeding without additional benefit.\n\nAlso initiate statin (high-intensity) and complete stroke workup (telemetry, echo, vascular imaging).',
        recommendation: 'Start DAPT immediately. Limit duration to 21 days. Add high-intensity statin. Complete stroke etiology workup.',
        confidence: 'definitive',
        citation: [3, 9, 10],
    },
    {
        id: 'stroke-single-antiplatelet',
        type: 'result',
        module: 4,
        title: 'Single Antiplatelet Therapy',
        body: '[Aspirin](#/drug/aspirin) 160\u2013325 mg within 24\u201348h of symptom onset, then 81 mg daily.\n\nComplete stroke workup:\n\u2022 Telemetry / cardiac monitoring \u00D7 24h minimum\n\u2022 Echocardiogram (TTE; TEE if suspected PFO or valve pathology)\n\u2022 Lipid panel \u2192 high-intensity statin\n\u2022 HbA1c\n\u2022 Extended cardiac monitoring if etiology unclear (14\u201330 day event recorder)',
        recommendation: 'Start aspirin. Complete stroke etiology workup. Initiate statin therapy.',
        confidence: 'recommended',
        citation: [1, 3],
    },
    // =====================================================================
    // MODULE 5: POST-TREATMENT & PREVENTION
    // =====================================================================
    {
        id: 'stroke-post-treatment',
        type: 'info',
        module: 5,
        title: 'Post-Thrombolysis Management',
        body: '**BP management \u00D7 24h:**\n\u2022 Target <180/105 mmHg\n\u2022 [Labetalol](#/drug/labetalol) bolus \u00B1 infusion (first-line)\n\u2022 [Nicardipine](#/drug/nicardipine) infusion (alternative)\n\u2022 [Clevidipine](#/drug/clevidipine) (if faster titration needed)\n\n**Neuro checks protocol:**\n\u2022 Every 15 min \u00D7 2h\n\u2022 Then every 30 min \u00D7 6h\n\u2022 Then hourly \u00D7 16h\n\u2022 Any decline \u2192 emergent NCCT\n\n**Antithrombotics:**\n\u2022 NO aspirin, heparin, or anticoagulants \u00D7 24h post-thrombolysis\n\u2022 Repeat NCCT at 24h\n\u2022 If no hemorrhage: start antiplatelets',
        citation: [1, 2],
        next: 'stroke-etiology',
    },
    {
        id: 'stroke-antiplatelet-start',
        type: 'info',
        module: 5,
        title: 'Antiplatelet Initiation',
        body: '**If no IVT given:**\n\u2022 [Aspirin](#/drug/aspirin) 160\u2013325 mg within 24\u201348h of onset\n\n**If post-IVT:**\n\u2022 Wait 24h, obtain NCCT first\n\u2022 If no hemorrhage: start aspirin 81\u2013325 mg\n\nConsider DAPT (aspirin + [clopidogrel](#/drug/clopidogrel)) for minor stroke with high-risk features (see minor stroke pathway).',
        citation: [1, 3],
        next: 'stroke-etiology',
    },
    {
        id: 'stroke-etiology',
        type: 'question',
        module: 5,
        title: 'Stroke Etiology Workup',
        body: 'Determine stroke mechanism to guide secondary prevention.\n\n**Standard workup:**\n\u2022 Continuous telemetry (\u226524h, ideally \u226548h)\n\u2022 Echocardiogram (TTE \u00B1 TEE)\n\u2022 Carotid/vertebral imaging (CTA or duplex)\n\u2022 Lipid panel, HbA1c, BMP\n\u2022 Hypercoagulability panel if age <60 and cryptogenic',
        citation: [1, 2],
        options: [
            {
                label: 'Cardioembolic (AF detected)',
                description: 'Atrial fibrillation or other cardiac source',
                next: 'stroke-afib',
            },
            {
                label: 'Large artery atherosclerosis',
                description: 'Carotid or intracranial stenosis \u226550%',
                next: 'stroke-atherosclerotic',
            },
            {
                label: 'Other / Cryptogenic',
                description: 'Small vessel, cryptogenic, or rare etiology',
                next: 'stroke-other-prevention',
            },
        ],
    },
    {
        id: 'stroke-afib',
        type: 'result',
        module: 5,
        title: 'Cardioembolic Stroke \u2014 Anticoagulation',
        body: '**DOAC preferred over warfarin** (unless mechanical valve or moderate-severe mitral stenosis).\n\nRecommended agents:\n\u2022 [Apixaban](#/drug/apixaban) 5 mg BID (preferred for stroke prevention, ARISTOTLE trial)\n\u2022 [Rivaroxaban](#/drug/rivaroxaban) 20 mg daily with food\n\n**Timing of anticoagulation initiation** (based on stroke severity):\n\u2022 TIA: 1\u20133 days\n\u2022 Minor stroke (NIHSS <8): 4\u20137 days\n\u2022 Moderate stroke (NIHSS 8\u201315): 7\u201314 days\n\u2022 Severe stroke (NIHSS >15 or large infarct): \u226514 days\n\n**Do NOT bridge with heparin** \u2014 no benefit over delayed DOAC, increases bleeding.\n\nDiscontinue antiplatelet when DOAC initiated (unless concurrent ACS/stent).',
        recommendation: 'Start DOAC based on stroke severity timing. Do not bridge with heparin. Ensure rate/rhythm control of AF.',
        confidence: 'definitive',
        citation: [1, 2, 11],
    },
    {
        id: 'stroke-atherosclerotic',
        type: 'result',
        module: 5,
        title: 'Large Artery Atherosclerotic Stroke',
        body: '**Antiplatelet:**\n\u2022 [Aspirin](#/drug/aspirin) 325 mg daily (or DAPT \u00D7 21\u201390 days for intracranial stenosis)\n\n**Statin:**\n\u2022 High-intensity statin (atorvastatin 40\u201380 mg or rosuvastatin 20\u201340 mg)\n\u2022 Target LDL <70 mg/dL\n\n**Carotid stenosis management:**\n\u2022 Symptomatic 70\u201399% stenosis: carotid endarterectomy (CEA) within 2 weeks (Class I)\n\u2022 Symptomatic 50\u201369%: CEA is reasonable (Class IIa)\n\u2022 CEA preferred over carotid artery stenting for most patients\n\n**Intracranial stenosis 70\u201399%:**\n\u2022 DAPT (aspirin + [clopidogrel](#/drug/clopidogrel)) \u00D7 90 days\n\u2022 Then single antiplatelet\n\u2022 Aggressive risk factor management (BP <140/90, LDL <70)',
        recommendation: 'Aspirin + high-intensity statin. Refer for CEA within 2 weeks if symptomatic carotid stenosis 70\u201399%. DAPT \u00D7 90d for intracranial stenosis.',
        confidence: 'definitive',
        citation: [1, 2],
    },
    {
        id: 'stroke-other-prevention',
        type: 'result',
        module: 5,
        title: 'Secondary Prevention \u2014 Other/Cryptogenic',
        body: '**Antiplatelet:**\n\u2022 [Aspirin](#/drug/aspirin) 81 mg daily\n\n**Statin:**\n\u2022 High-intensity statin regardless of baseline LDL\n\n**Blood pressure:**\n\u2022 Target <130/80 mmHg (after acute phase)\n\u2022 Initiate antihypertensive before discharge if stable\n\n**Extended cardiac monitoring:**\n\u2022 If cryptogenic: 14\u201330 day ambulatory cardiac monitor\n\u2022 Detects paroxysmal AF in ~12% of cryptogenic strokes\n\u2022 If AF detected: transition to anticoagulation\n\n**PFO closure:**\n\u2022 Consider if age <60, PFO with atrial septal aneurysm or large shunt, and cryptogenic stroke\n\u2022 Refer cardiology for RESPECT/CLOSE trial-based evaluation\n\n**Lifestyle:**\n\u2022 Smoking cessation\n\u2022 Exercise: moderate intensity \u226540 min, 3\u20134x/week\n\u2022 Mediterranean or DASH diet\n\u2022 Weight management (BMI <25)',
        recommendation: 'Aspirin 81 mg + high-intensity statin. BP target <130/80. Extended cardiac monitoring for cryptogenic. PFO closure if criteria met.',
        confidence: 'recommended',
        citation: [1, 2, 11],
    },
];
export const STROKE_NODE_COUNT = STROKE_NODES.length;
// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------
export const STROKE_MODULE_LABELS = [
    'Initial Assessment',
    'Standard IVT (0\u20134.5h)',
    'Extended Windows & EVT',
    'Minor Stroke',
    'Prevention',
];
// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------
export const STROKE_CITATIONS = [
    { num: 1, text: 'Powers WJ, et al. Guidelines for the Early Management of Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50(12):e344-e418.' },
    { num: 2, text: 'Mendelson SJ, Prabhakaran S. Diagnosis and Management of TIA and Acute Ischemic Stroke: A Review. JAMA. 2021;325(11):1088-1098.' },
    { num: 3, text: 'Johnston SC, et al. Clopidogrel and Aspirin in Acute Ischemic Stroke and High-Risk TIA (POINT). N Engl J Med. 2018;379(3):215-225.' },
    { num: 4, text: 'Bhatt DL, et al. Tenecteplase vs Alteplase for Acute Ischemic Stroke (AcT). Lancet. 2024.' },
    { num: 5, text: 'Ma H, et al. Thrombolysis Guided by Perfusion Imaging up to 9 Hours after Onset of Stroke (EXTEND). N Engl J Med. 2019;380(19):1795-1803.' },
    { num: 6, text: 'Goyal M, et al. Endovascular Thrombectomy after Large-Vessel Ischaemic Stroke: A Meta-analysis (HERMES). Lancet. 2016;387(10029):1723-1731.' },
    { num: 7, text: 'Nogueira RG, et al. Thrombectomy 6 to 24 Hours after Stroke with a Mismatch between Deficit and Infarct (DAWN). N Engl J Med. 2018;378(1):11-21.' },
    { num: 8, text: 'Albers GW, et al. Thrombectomy for Stroke at 6 to 16 Hours with Selection by Perfusion Imaging (DEFUSE-3). N Engl J Med. 2018;378(8):708-718.' },
    { num: 9, text: 'Wang Y, et al. Clopidogrel with Aspirin in Acute Minor Stroke or TIA (CHANCE). N Engl J Med. 2013;369(1):11-19.' },
    { num: 10, text: 'Johnston SC, et al. Ticagrelor and Aspirin or Aspirin Alone in Acute Ischemic Stroke or TIA (THALES). N Engl J Med. 2020;383(3):207-217.' },
    { num: 11, text: 'Kleindorfer DO, et al. 2021 Guideline for the Prevention of Stroke in Patients with Stroke and TIA. Stroke. 2021;52(7):e364-e467.' },
];
// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------
export const STROKE_CLINICAL_NOTES = [
    'Tenecteplase 0.25 mg/kg single IV bolus is now preferred over alteplase 60-min infusion per 2024 AcT trial evidence — equivalent efficacy with simpler administration.',
    'Door-to-needle time goal: <45 minutes. Every 15-minute reduction in onset-to-treatment time saves ~4 weeks of disability-free life.',
    'CTA should be obtained alongside initial NCCT but should NOT delay thrombolysis — start tPA/TNK first, then review CTA.',
    'EVT extends the treatment window to 24 hours for select patients with LVO and favorable perfusion imaging. HERMES meta-analysis: NNT ~5 for functional independence.',
    'DAPT (aspirin + clopidogrel) for minor stroke/TIA should be limited to 21 days — extending beyond increases bleeding risk without additional stroke reduction benefit.',
    'Do NOT bridge with heparin when initiating anticoagulation for cardioembolic stroke — delayed DOAC initiation based on stroke severity is preferred.',
    'Emergent CEA (within 2 weeks) for symptomatic carotid stenosis 70-99% provides the greatest benefit when performed early after the index event.',
];
