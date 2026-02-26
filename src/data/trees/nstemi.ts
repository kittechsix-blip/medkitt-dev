// MedKitt — NSTEMI (Non-ST-Elevation Myocardial Infarction) Management
// Diagnosis → Risk Stratification → Invasive Strategy → Special Considerations → Discharge & Prevention
// 5 modules: Diagnosis & Initial Mgmt → Risk Stratification → Invasive Strategy → Special Considerations → Discharge & Prevention
// 18 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const NSTEMI_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: DIAGNOSIS & INITIAL MANAGEMENT
  // =====================================================================

  {
    id: 'nstemi-start',
    type: 'info',
    module: 1,
    title: 'NSTEMI Confirmed',
    body: 'Establish diagnosis: [troponin rise](#/info/nstemi-troponin-sensitivity) AND at least one of ischemic symptoms, new ST depression/T-wave inversion, or wall motion abnormality.\n\n**Immediate actions:**\n\u2022 [Aspirin](#/drug/aspirin) 162\u2013325 mg chewed\n\u2022 [Nitroglycerin](#/drug/nitroglycerin) 0.4 mg SL q5min \u00D7 3 \u2014 rule out RV infarction first\n\u2022 Morphine ONLY for refractory pain (may increase mortality)\n\u2022 Supplemental O\u2082 only if SpO\u2082 <90%\n\u2022 12-lead ECG within 10 minutes\n\u2022 Serial troponins q3\u20136h',
    citation: [1, 2],
    next: 'nstemi-initial-anticoag',
  },

  {
    id: 'nstemi-initial-anticoag',
    type: 'question',
    module: 1,
    title: 'Anticoagulation Selection',
    body: 'Choose ONE anticoagulation strategy:\n\u2022 [Enoxaparin](#/drug/enoxaparin) 1 mg/kg SC q12h \u2014 preferred for most patients\n\u2022 [UFH](#/drug/ufh) 60 units/kg bolus (max 4,000), 12 units/kg/hr (max 1,000) \u2014 preferred if CrCl <30 or PCI within 24h\n\u2022 [Fondaparinux](#/drug/fondaparinux) 2.5 mg SC daily \u2014 preferred for conservative strategy (lowest bleeding risk per OASIS-5)\n\nDo NOT switch between anticoagulants (increases bleeding risk).',
    citation: [1, 3],
    options: [
      {
        label: 'Early invasive likely (PCI within 24h)',
        description: 'UFH preferred for PCI flexibility',
        next: 'nstemi-risk-stratify',
      },
      {
        label: 'Conservative / delayed invasive',
        description: 'Fondaparinux or enoxaparin preferred',
        next: 'nstemi-risk-stratify',
      },
    ],
  },

  {
    id: 'nstemi-risk-stratify',
    type: 'question',
    module: 1,
    title: 'Immediate Risk Assessment',
    body: 'Assess for features requiring emergent catheterization (<2 hours):\n\u2022 Hemodynamic instability (cardiogenic shock)\n\u2022 Refractory/recurrent chest pain despite medical therapy\n\u2022 Sustained ventricular arrhythmias (VT/VF)\n\u2022 Acute mitral regurgitation or VSD\n\u2022 Signs of heart failure (new pulmonary edema)',
    citation: [1, 2],
    calculatorLinks: [{ id: 'timi', label: 'TIMI Risk Score' }],
    options: [
      {
        label: 'Yes \u2014 Emergent features',
        next: 'nstemi-emergent',
        urgency: 'critical',
      },
      {
        label: 'No \u2014 Hemodynamically stable',
        next: 'nstemi-timi-stratify',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: RISK STRATIFICATION
  // =====================================================================

  {
    id: 'nstemi-emergent',
    type: 'result',
    module: 2,
    title: 'Emergent Catheterization (<2 hours)',
    body: '**Immediate PCI indicated.**\n\u2022 Activate cath lab\n\u2022 [UFH](#/drug/ufh) preferred anticoagulation (can titrate in cath lab)\n\u2022 If on fondaparinux: supplement with UFH 60 units/kg IV bolus (catheter thrombosis risk)\n\u2022 P2Y12 inhibitor loading: [Ticagrelor](#/drug/ticagrelor) 180 mg OR [Prasugrel](#/drug/prasugrel) 60 mg (if no prior stroke/TIA)\n\u2022 Consider [Metoprolol](#/drug/metoprolol) if HR >100 and no contraindications\n\u2022 Bedside [Echo (POCUS)](#/info/nstemi-pocus) for wall motion, EF, mechanical complications',
    recommendation: 'Emergent PCI. Activate cath lab immediately. UFH preferred. Load P2Y12 inhibitor.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  {
    id: 'nstemi-timi-stratify',
    type: 'question',
    module: 2,
    title: 'TIMI Risk Score Stratification',
    body: 'Use the [TIMI Risk Score](#/calculator/timi) to guide invasive strategy timing.',
    citation: [1, 4],
    calculatorLinks: [{ id: 'timi', label: 'TIMI Risk Score' }],
    options: [
      {
        label: 'TIMI 0\u20132 (Low risk)',
        description: '14-day event rate 4.7\u20138.3%',
        next: 'nstemi-conservative',
      },
      {
        label: 'TIMI 3 (Intermediate)',
        description: '14-day event rate 13.2%',
        next: 'nstemi-delayed-invasive',
      },
      {
        label: 'TIMI 4\u20137 (High risk)',
        description: '14-day event rate 19.9\u201340.9%',
        next: 'nstemi-early-invasive',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'nstemi-conservative',
    type: 'question',
    module: 2,
    title: 'Conservative (Ischemia-Guided) Strategy',
    body: 'Low TIMI risk. Conservative management appropriate.\nSee [Conservative Management Details](#/info/nstemi-conservative)\n\nMedical therapy:\n\u2022 Continue anticoagulation (fondaparinux preferred \u2014 lowest bleeding)\n\u2022 [Metoprolol](#/drug/metoprolol) \u2014 target HR <70\n\u2022 [Nitroglycerin](#/drug/nitroglycerin) PRN chest pain\n\u2022 [Atorvastatin](#/drug/atorvastatin) 80 mg PO (start immediately)\n\u2022 Clopidogrel 300 mg loading if no P2Y12 yet (ticagrelor also acceptable)\n\nStress test before discharge.',
    citation: [1, 5],
    options: [
      {
        label: 'Positive stress test / recurrent ischemia',
        description: 'Upgrade to invasive strategy',
        next: 'nstemi-delayed-invasive',
        urgency: 'urgent',
      },
      {
        label: 'Negative stress test, no recurrence',
        next: 'nstemi-discharge',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: INVASIVE STRATEGY
  // =====================================================================

  {
    id: 'nstemi-early-invasive',
    type: 'info',
    module: 3,
    title: 'Early Invasive Strategy (<24 hours)',
    body: 'TIMI \u22654 (high risk). Cardiac catheterization within 24 hours.\n\n**Pre-PCI preparation:**\n\u2022 P2Y12 loading: [Ticagrelor](#/drug/ticagrelor) 180 mg preferred (PLATO: NNT 54 for CV death/MI/stroke)\n\u2022 Alternative: [Clopidogrel](#/drug/clopidogrel/acs) 600 mg if ticagrelor not available or on OAC\n\u2022 Continue anticoagulation (do NOT switch agents)\n\u2022 NPO (anticipate catheterization)\n\u2022 [Metoprolol](#/drug/metoprolol) \u2014 target HR <70 if tolerated\n\u2022 [Atorvastatin](#/drug/atorvastatin) 80 mg PO',
    citation: [1, 2, 6],
    next: 'nstemi-post-pci',
  },

  {
    id: 'nstemi-delayed-invasive',
    type: 'info',
    module: 3,
    title: 'Delayed Invasive Strategy (25\u201372 hours)',
    body: 'TIMI 3 (intermediate risk) or failed conservative strategy.\n\nCardiac catheterization within 25\u201372 hours.\n\u2022 Allows stabilization with medical therapy\n\u2022 Same pre-PCI preparation as early invasive\n\u2022 P2Y12 loading: [Ticagrelor](#/drug/ticagrelor) 180 mg OR [Clopidogrel](#/drug/clopidogrel/acs) 300\u2013600 mg\n\u2022 If deferring P2Y12 until anatomy known: acceptable strategy per guidelines\n\u2022 Continue beta-blocker, statin, anticoagulation',
    citation: [1, 2],
    next: 'nstemi-post-pci',
  },

  {
    id: 'nstemi-post-pci',
    type: 'question',
    module: 3,
    title: 'Post-PCI P2Y12 Selection',
    body: 'Select P2Y12 inhibitor for 12-month DAPT.\nSee [P2Y12 Selection Guide](#/info/nstemi-antiplatelet-cx)\n\n**Preferred:** [Ticagrelor](#/drug/ticagrelor) 90 mg BID\n\u2022 PLATO trial: reduced CV death/MI/stroke vs clopidogrel (NNT 54)\n\u2022 Aspirin \u2264100 mg/day required\n\n**High ischemic risk (diabetes, stent thrombosis):** [Prasugrel](#/drug/prasugrel) 10 mg daily\n\u2022 TRITON-TIMI 38: more potent, but more bleeding\n\u2022 CONTRAINDICATED if prior stroke/TIA\n\u2022 Avoid if age \u226575 or weight <60 kg\n\n**High bleeding risk or on OAC:** [Clopidogrel](#/drug/clopidogrel/acs) 75 mg daily\n\u2022 Preferred for triple therapy (OAC + DAPT)\n\u2022 Least bleeding risk of the three',
    citation: [1, 6, 7, 8],
    options: [
      {
        label: 'Ticagrelor selected (standard)',
        next: 'nstemi-dapt-duration',
      },
      {
        label: 'Prasugrel selected (high ischemic risk)',
        next: 'nstemi-dapt-duration',
      },
      {
        label: 'Clopidogrel selected (high bleeding risk / OAC)',
        next: 'nstemi-dapt-duration',
      },
      {
        label: 'CABG indicated (anatomy)',
        next: 'nstemi-cabg',
      },
    ],
  },

  {
    id: 'nstemi-cabg',
    type: 'result',
    module: 3,
    title: 'CABG Indicated',
    body: 'Coronary anatomy indicates CABG (e.g., left main, multivessel disease with diabetes).\n\n**P2Y12 hold times before surgery:**\n\u2022 [Ticagrelor](#/drug/ticagrelor): hold \u22653 days (minimum), ideally 5 days\n\u2022 [Clopidogrel](#/drug/clopidogrel/acs): hold \u22655 days\n\u2022 [Prasugrel](#/drug/prasugrel): hold \u22657 days\n\nContinue aspirin. Restart P2Y12 inhibitor 24\u201348h post-CABG.\nRefer cardiac surgery.',
    recommendation: 'CABG referral. Hold P2Y12 per timing guidelines. Continue aspirin. Restart P2Y12 24\u201348h post-operatively.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  // =====================================================================
  // MODULE 4: SPECIAL CONSIDERATIONS
  // =====================================================================

  {
    id: 'nstemi-dapt-duration',
    type: 'question',
    module: 4,
    title: 'DAPT Duration & Special Populations',
    body: 'Standard DAPT: 12 months post-PCI\n\u2022 Aspirin 81 mg + P2Y12 inhibitor daily\n\n**De-escalation options after 1\u20133 months if high bleeding risk:**\n\u2022 Switch from ticagrelor/prasugrel to clopidogrel (HOST-REDUCE trial)\n\u2022 Aspirin monotherapy after 1\u20133 months of DAPT (TWILIGHT trial)\n\n**Extended DAPT beyond 12 months:**\n\u2022 Consider if high ischemic risk (prior MI, diabetes, multivessel disease)\n\u2022 Ticagrelor 60 mg BID (PEGASUS-TIMI 54)\n\nIs this a MINOCA presentation?',
    citation: [1, 9, 10],
    options: [
      {
        label: 'Standard ACS (obstructive CAD)',
        next: 'nstemi-discharge',
      },
      {
        label: 'MINOCA suspected (no obstructive CAD)',
        description: 'Non-obstructive coronaries on angiography',
        next: 'nstemi-minoca',
      },
    ],
  },

  {
    id: 'nstemi-minoca',
    type: 'result',
    module: 4,
    title: 'MINOCA \u2014 Non-Obstructive Coronaries',
    body: 'Myocardial infarction with non-obstructive coronary arteries (\u226450% stenosis on angiography). Present in 5\u201310% of MI patients.\n\nSee [MINOCA Workup & Management](#/info/nstemi-minoca)\n\n**Etiologies:**\n\u2022 Coronary spasm (most common)\n\u2022 Plaque disruption/erosion\n\u2022 Spontaneous coronary artery dissection (SCAD)\n\u2022 Takotsubo cardiomyopathy\n\u2022 Myocarditis\n\n**KEY:** Standard ACS regimens may be HARMFUL depending on etiology.\n\u2022 Coronary spasm: beta-blockers may worsen; use CCBs and nitrates\n\u2022 SCAD: anticoagulation may extend dissection; conservative preferred\n\u2022 Takotsubo: avoid catecholamines; supportive care\n\u2022 Myocarditis: avoid NSAIDs; treat underlying cause\n\nCardiac MRI recommended for all MINOCA patients.',
    recommendation: 'Individualized therapy based on etiology. Cardiac MRI mandatory. Standard ACS regimen may be harmful \u2014 determine etiology first.',
    confidence: 'recommended',
    citation: [1, 11],
  },

  // =====================================================================
  // MODULE 5: DISCHARGE & PREVENTION
  // =====================================================================

  {
    id: 'nstemi-discharge',
    type: 'info',
    module: 5,
    title: 'Discharge Medications',
    body: '**The 5 pillars of post-ACS pharmacotherapy:**\n\n1. **DAPT:** Aspirin 81 mg + P2Y12 inhibitor \u00D7 12 months\n2. **Statin:** [Atorvastatin](#/drug/atorvastatin) 80 mg (or rosuvastatin 20\u201340 mg) \u2014 target LDL <70\n3. **Beta-blocker:** [Metoprolol](#/drug/metoprolol) succinate \u2014 continue if EF <40% or hypertension; may discontinue after 1 year if EF preserved\n4. **ACE inhibitor/ARB:** Start within 24h if EF \u226440%, hypertension, or diabetes. Consider for all post-ACS patients.\n5. **Aldosterone antagonist:** Add if EF \u226440% + HF symptoms or diabetes (EPHESUS trial)\n\nAlso: PPI if DAPT (GI prophylaxis \u2014 use pantoprazole, NOT omeprazole with clopidogrel)',
    citation: [1, 2],
    next: 'nstemi-risk-factors',
  },

  {
    id: 'nstemi-risk-factors',
    type: 'question',
    module: 5,
    title: 'Risk Factor Modification',
    body: '**Targets:**\n\u2022 BP <130/80 mmHg\n\u2022 LDL <70 mg/dL (consider <55 if very high risk)\n\u2022 HbA1c <7% (individualized)\n\u2022 BMI <25 (or waist <102 cm M, <88 cm F)\n\u2022 Smoking cessation \u2014 NNT 12 for mortality reduction\n\n**Cardiac rehabilitation:**\n\u2022 Class I recommendation (36 sessions over 12 weeks)\n\u2022 25% relative reduction in cardiovascular mortality\n\u2022 Improves functional capacity, quality of life, depression\n\nDid the patient have atrial fibrillation detected?',
    citation: [1, 2],
    options: [
      {
        label: 'No AF \u2014 standard secondary prevention',
        next: 'nstemi-followup',
      },
      {
        label: 'AF detected \u2014 needs anticoagulation',
        next: 'nstemi-triple-therapy',
      },
      {
        label: 'Echo shows EF \u226440%',
        next: 'nstemi-hf-management',
      },
    ],
  },

  {
    id: 'nstemi-triple-therapy',
    type: 'result',
    module: 5,
    title: 'Triple Therapy \u2014 AF + ACS + Stent',
    body: 'Patient requires both anticoagulation (AF) and DAPT (stent).\n\n**Triple therapy (OAC + aspirin + P2Y12) for SHORTEST possible duration:**\n\u2022 1 week (if high bleeding risk) to 1 month maximum\n\u2022 Then dual therapy: OAC + [Clopidogrel](#/drug/clopidogrel/acs) 75 mg daily (preferred P2Y12 for triple/dual)\n\u2022 At 12 months: OAC alone (discontinue P2Y12)\n\n**Preferred DOAC:** Rivaroxaban 15 mg daily (PIONEER AF-PCI) or Apixaban 5 mg BID (AUGUSTUS)\n\u2022 Avoid warfarin if possible (more bleeding than DOAC-based regimens)\n\u2022 Avoid prasugrel in triple therapy (excess bleeding)\n\u2022 Avoid ticagrelor in triple therapy (limited data)',
    recommendation: 'Minimize triple therapy duration (\u22641 month). DOAC + clopidogrel preferred for dual therapy phase. Discontinue antiplatelet at 12 months.',
    confidence: 'definitive',
    citation: [1, 10],
  },

  {
    id: 'nstemi-hf-management',
    type: 'result',
    module: 5,
    title: 'Post-MI Heart Failure Management',
    body: 'EF \u226440% post-MI = high-risk. Initiate guideline-directed medical therapy (GDMT):\n\n**Core GDMT (start before discharge):**\n\u2022 ACE inhibitor or ARB (or ARNI if stable) \u2014 SAVE, VALIANT trials\n\u2022 Beta-blocker ([Metoprolol](#/drug/metoprolol) succinate or carvedilol) \u2014 CAPRICORN trial\n\u2022 Aldosterone antagonist (eplerenone 25\u201350 mg or spironolactone) if EF \u226440% + HF symptoms or diabetes \u2014 EPHESUS trial\n\u2022 SGLT2 inhibitor (empagliflozin or dapagliflozin) \u2014 EMPEROR-Reduced, DAPA-HF\n\n**Reassess EF at 3 months.** If persistent EF \u226435%: evaluate for ICD (40 days post-MI minimum).\n\nContinue DAPT + statin as planned.',
    recommendation: 'Initiate 4-pillar GDMT before discharge. Reassess EF at 3 months. Evaluate for ICD if EF \u226435% after 40 days.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  {
    id: 'nstemi-followup',
    type: 'result',
    module: 5,
    title: 'Follow-Up Plan',
    body: '**Post-discharge follow-up:**\n\u2022 Cardiology: 1\u20132 weeks\n\u2022 PCP: 2\u20134 weeks\n\u2022 Cardiac rehab: referral before discharge (36 sessions)\n\u2022 Stress test at 4\u20136 weeks if not revascularized\n\u2022 Echo at 3 months if EF <50% at presentation\n\u2022 Lab work: lipid panel at 4\u201312 weeks (LDL target <70)\n\n**DAPT adherence counseling:**\n\u2022 Do NOT stop P2Y12 without cardiology guidance\n\u2022 Stent thrombosis risk highest in first 30 days\n\u2022 If surgery needed: consult cardiology for P2Y12 bridging plan\n\u2022 Carry medication list; inform all providers of stent placement\n\n**Red flags \u2014 return to ED:**\n\u2022 Chest pain lasting >15 minutes not relieved by nitroglycerin\n\u2022 Shortness of breath at rest or worsening\n\u2022 Syncope or near-syncope\n\u2022 Sustained palpitations',
    recommendation: 'Cardiology follow-up in 1\u20132 weeks. Cardiac rehab referral. Emphasize DAPT adherence. LDL target <70 mg/dL.',
    confidence: 'recommended',
    citation: [1, 2],
  },

];

export const NSTEMI_NODE_COUNT = NSTEMI_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const NSTEMI_MODULE_LABELS = [
  'Diagnosis & Initial Mgmt',
  'Risk Stratification',
  'Invasive Strategy',
  'Special Considerations',
  'Discharge & Prevention',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const NSTEMI_CITATIONS: Citation[] = [
  { num: 1, text: 'Amsterdam EA, et al. 2014 AHA/ACC Guideline for the Management of Patients with Non-ST-Elevation Acute Coronary Syndromes. J Am Coll Cardiol. 2014;64(24):e189-e228.' },
  { num: 2, text: 'Collet JP, et al. 2020 ESC Guidelines for the Management of Acute Coronary Syndromes in Patients Presenting without Persistent ST-Segment Elevation. Eur Heart J. 2021;42(14):1289-1367.' },
  { num: 3, text: 'Yusuf S, et al. Comparison of Fondaparinux and Enoxaparin in Acute Coronary Syndromes (OASIS-5). N Engl J Med. 2006;354(14):1464-1476.' },
  { num: 4, text: 'Antman EM, et al. The TIMI Risk Score for Unstable Angina/Non-ST Elevation MI. JAMA. 2000;284(7):835-842.' },
  { num: 5, text: 'Boden WE, et al. Outcomes in Patients with Acute Non-Q-Wave MI Randomly Assigned to an Invasive vs Conservative Strategy (VANQUISH). N Engl J Med. 1998;338(25):1785-1792.' },
  { num: 6, text: 'Wallentin L, et al. Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes (PLATO). N Engl J Med. 2009;361(11):1045-1057.' },
  { num: 7, text: 'Wiviott SD, et al. Prasugrel versus Clopidogrel in Patients with Acute Coronary Syndromes (TRITON-TIMI 38). N Engl J Med. 2007;357(20):2001-2015.' },
  { num: 8, text: 'Stone GW, et al. Bivalirudin during Primary PCI in Acute MI (HORIZONS-AMI). N Engl J Med. 2008;358(21):2218-2230.' },
  { num: 9, text: 'Bonaca MP, et al. Long-Term Use of Ticagrelor in Patients with Prior MI (PEGASUS-TIMI 54). N Engl J Med. 2015;372(19):1791-1800.' },
  { num: 10, text: 'Lopes RD, et al. Antithrombotic Therapy after Acute Coronary Syndrome or PCI in Atrial Fibrillation (AUGUSTUS). N Engl J Med. 2019;380(16):1509-1524.' },
  { num: 11, text: 'Tamis-Holland JE, et al. Contemporary Diagnosis and Management of Patients with Myocardial Infarction in the Absence of Obstructive Coronary Artery Disease: AHA Scientific Statement. Circulation. 2019;139(18):e891-e908.' },
];

// -------------------------------------------------------------------
// Clinical Notes (for reference table)
// -------------------------------------------------------------------

export const NSTEMI_CLINICAL_NOTES: string[] = [
  'Aspirin should be chewed (not swallowed whole) for faster buccal absorption \u2014 achieves platelet inhibition within 15 minutes vs 60 minutes for swallowed enteric-coated.',
  'Consider deferring P2Y12 loading until coronary anatomy is known \u2014 avoids CABG bleeding complications if surgery indicated. Acceptable strategy per guidelines.',
  'Fondaparinux 2.5 mg SC daily has 50% lower major bleeding than enoxaparin (OASIS-5) with similar efficacy \u2014 preferred for conservative management. Must supplement with UFH if proceeding to PCI.',
  'Prasugrel is absolutely contraindicated in patients with prior stroke or TIA \u2014 TRITON-TIMI 38 showed net clinical harm in this subgroup.',
  'MINOCA (5-10% of MI patients): standard ACS regimens may be harmful \u2014 beta-blockers worsen coronary spasm, anticoagulation extends SCAD dissection. Cardiac MRI is essential for etiology.',
  'High-intensity statin (atorvastatin 80mg) should be started within 24 hours regardless of baseline LDL. In-hospital initiation improves long-term adherence (PROVE IT-TIMI 22).',
  'Cardiac rehabilitation reduces cardiovascular mortality by 25% \u2014 NNT 36 at 5 years. Class I recommendation but vastly underutilized (<20% referral rates).',
  'Triple therapy (OAC + DAPT) for AF + ACS patients should be minimized to \u22641 month, then transition to dual therapy (OAC + single antiplatelet). Clopidogrel preferred over ticagrelor/prasugrel in this setting.',
];
