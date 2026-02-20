// EM Decision Trees — Neurosyphilis Workup Decision Tree
// All clinical content sourced from PRD.md. 17 evidence citations.
// 6 modules: Serology → Stage → Symptoms → LP Decision → CSF Interpreter → Treatment

import type { DecisionNode } from '../../models/types.js';

export const NEUROSYPHILIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: SEROLOGY INTERPRETER
  // =====================================================================

  {
    id: 'serology-start',
    type: 'info',
    module: 1,
    title: 'Syphilis Serology — Test Types',
    body: 'NONTREPONEMAL TESTS (NTT)\nDetect antibodies to cardiolipin-lecithin-cholesterol antigen released from damaged host cells. Reflect disease activity — titers rise with active infection and decline with treatment.\n\n\u2022 RPR (Rapid Plasma Reagin) — flocculation assay, most common NTT screen. Results reported as titer (e.g., 1:8, 1:32). Titers \u22651:8 typically indicate active infection.\n\u2022 VDRL (Venereal Disease Research Laboratory) — flocculation assay, similar to RPR. Used on serum and CSF. RPR and VDRL titers cannot be directly compared; RPR titers run slightly higher.\n\nTREPONEMAL TESTS\nDetect antibodies specific to T. pallidum antigens. Once positive, remain positive for life regardless of treatment.\n\n\u2022 FTA-ABS (Fluorescent Treponemal Antibody Absorption) — indirect immunofluorescence. First treponemal test to become positive in early infection.\n\u2022 TP-PA (T. pallidum Particle Agglutination) — particle agglutination assay. High specificity, widely used for confirmation.\n\u2022 EIA/CIA (Enzyme/Chemiluminescence Immunoassay) — automated treponemal assays. Used as initial screen in reverse-sequence algorithms. High throughput, lower cost per test.\n\nKey principles:\n\u2022 NTTs become reactive 3\u20134 weeks after infection — 30% of primary syphilis is seronegative\n\u2022 Treponemal antibodies persist for life — cannot distinguish active from past treated infection\n\u2022 Use same NTT method (RPR or VDRL) for serial monitoring, preferably same lab\n\u2022 Prozone phenomenon: false-negative NTT at very high titers — request dilution if clinical suspicion is high',
    citation: [1, 2],
    next: 'serology-algorithm',
  },

  {
    id: 'serology-algorithm',
    type: 'question',
    module: 1,
    title: 'Testing Algorithm',
    body: 'Which testing algorithm was used?\n\nTraditional: NTT screen first (RPR or VDRL), then confirm with treponemal test (FTA-ABS or TP-PA). Most common in outpatient/public health settings.\n\nReverse-Sequence: Treponemal screen first (EIA/CIA), then reflex to NTT. Increasingly used by large labs due to automation.',
    citation: [1, 2],
    options: [
      { label: 'Traditional', description: 'NTT screen (RPR/VDRL) → treponemal confirm', next: 'trad-results' },
      { label: 'Reverse-Sequence', description: 'Treponemal screen (EIA/CIA) → NTT reflex', next: 'rev-results' },
    ],
  },

  {
    id: 'trad-results',
    type: 'question',
    module: 1,
    title: 'Traditional Algorithm Results',
    body: 'What are the results of the traditional testing sequence?',
    citation: [1, 2],
    options: [
      { label: 'RPR/VDRL reactive + treponemal reactive', description: 'Both tests positive', next: 'confirmed-syphilis', urgency: 'critical' },
      { label: 'RPR/VDRL reactive + treponemal nonreactive', description: 'NTT positive but treponemal negative', next: 'trad-false-positive' },
      { label: 'RPR/VDRL nonreactive', description: 'Screening test negative', next: 'trad-unlikely' },
    ],
  },

  {
    id: 'rev-results',
    type: 'question',
    module: 1,
    title: 'Reverse-Sequence Algorithm Results',
    body: 'What are the results of the reverse-sequence testing?',
    citation: [1, 2],
    options: [
      { label: 'Treponemal reactive + NTT reactive', description: 'Both tests positive', next: 'confirmed-syphilis', urgency: 'critical' },
      { label: 'Treponemal reactive + NTT nonreactive', description: 'Treponemal positive, NTT negative — requires second treponemal test', next: 'rev-second-trep' },
      { label: 'Treponemal nonreactive', description: 'Screening test negative', next: 'rev-unlikely' },
    ],
  },

  {
    id: 'rev-second-trep',
    type: 'question',
    module: 1,
    title: 'Second Treponemal Test Required',
    body: 'Treponemal reactive + NTT nonreactive requires a SECOND treponemal test using a different antigen. What was the result?',
    citation: [1],
    options: [
      { label: 'Second treponemal reactive', description: 'Possible: previously treated, untreated late latent, or early syphilis with low NTT', next: 'rev-possible-syphilis' },
      { label: 'Second treponemal nonreactive', description: 'Initial treponemal screen was false positive', next: 'rev-false-positive' },
    ],
  },

  {
    id: 'confirmed-syphilis',
    type: 'info',
    module: 1,
    title: 'Confirmed Syphilis',
    body: 'Serology confirms active syphilis infection. Proceed to stage classification to determine appropriate workup and treatment.',
    next: 'stage-start',
  },

  {
    id: 'trad-false-positive',
    type: 'result',
    module: 1,
    title: 'Likely False Positive',
    body: 'RPR/VDRL reactive + treponemal nonreactive = likely biological false positive. Common causes include HIV, autoimmune disease, pregnancy, vaccinations, injection drug use, and older age. False-positive NTTs are usually low titer (<1:8).',
    citation: [1, 2],
    recommendation: 'No syphilis treatment indicated. Consider evaluation for underlying causes of false-positive NTT.',
    confidence: 'definitive',
  },

  {
    id: 'trad-unlikely',
    type: 'result',
    module: 1,
    title: 'Syphilis Unlikely',
    body: 'RPR/VDRL nonreactive = syphilis unlikely.\n\nCaveats:\n\u2022 30% of primary syphilis is seronegative\n\u2022 NTTs become reactive 3\u20134 weeks after infection\n\u2022 Prozone phenomenon: false-negative NTT at very high titers \u2014 request dilution if clinical suspicion is high',
    citation: [1, 2],
    recommendation: 'No syphilis treatment indicated. If clinical suspicion remains high, repeat testing in 2\u20134 weeks or request dilution to rule out prozone.',
    confidence: 'recommended',
  },

  {
    id: 'rev-unlikely',
    type: 'result',
    module: 1,
    title: 'Syphilis Unlikely',
    body: 'Treponemal screen nonreactive = syphilis unlikely.',
    citation: [1],
    recommendation: 'No syphilis treatment indicated.',
    confidence: 'definitive',
  },

  {
    id: 'rev-possible-syphilis',
    type: 'info',
    module: 1,
    title: 'Possible Syphilis',
    body: 'Treponemal reactive + NTT nonreactive + second treponemal reactive = possible syphilis. This may represent previously treated syphilis, untreated late latent syphilis, or early syphilis with NTT not yet reactive. Proceed to stage classification and treat accordingly.',
    citation: [1],
    next: 'stage-start',
  },

  {
    id: 'rev-false-positive',
    type: 'result',
    module: 1,
    title: 'False Positive Treponemal Screen',
    body: 'Treponemal reactive + NTT nonreactive + second treponemal nonreactive = false positive initial treponemal screen.',
    citation: [1],
    recommendation: 'No syphilis treatment indicated.',
    confidence: 'definitive',
  },

  // =====================================================================
  // MODULE 2: STAGE CLASSIFICATION
  // =====================================================================

  {
    id: 'stage-start',
    type: 'question',
    module: 2,
    title: 'Stage Classification',
    body: 'Based on clinical presentation and history, what is the stage of syphilis?',
    citation: [1, 6],
    options: [
      { label: 'Primary', description: 'Painless chancre, regional lymphadenopathy', next: 'symptom-start' },
      { label: 'Secondary', description: 'Diffuse rash (palms/soles), condylomata lata, mucous patches, lymphadenopathy, constitutional symptoms', next: 'symptom-start' },
      { label: 'Early Latent', description: 'Asymptomatic, acquired within prior 12 months (documented seroconversion, symptoms, or exposure)', next: 'symptom-start' },
      { label: 'Late Latent', description: 'Asymptomatic, acquired >12 months ago or unknown duration', next: 'symptom-start' },
      { label: 'Tertiary', description: 'Gummatous disease, cardiovascular syphilis (aortitis), or late neurologic manifestations (tabes dorsalis, general paresis)', next: 'symptom-start' },
      { label: 'Unknown Duration', description: 'No clear timeline \u2014 treat as late latent', next: 'symptom-start' },
    ],
  },

  // =====================================================================
  // MODULE 3: SYMPTOM SCREEN
  // =====================================================================

  {
    id: 'symptom-start',
    type: 'question',
    module: 3,
    title: 'Neurologic Symptom Screen',
    body: 'Does the patient have ANY of the following neurologic symptoms?\n\n\u2022 Cognitive dysfunction / altered mental status\n\u2022 Motor or sensory deficits\n\u2022 Cranial nerve palsies\n\u2022 Meningismus / signs of meningitis\n\u2022 Stroke symptoms\n\u2022 Loss of vibration sense\n\nNote: Neurologic symptoms have HIGH specificity (91.6\u2013100%) but LOW sensitivity (1.5\u201338.1%) for neurosyphilis. Absence of symptoms does NOT rule out neurosyphilis.',
    citation: [5, 12],
    options: [
      { label: 'Yes \u2014 neurologic symptoms present', description: 'One or more neurologic symptoms identified', next: 'lp-indicated-neuro', urgency: 'critical' },
      { label: 'No \u2014 no neurologic symptoms', description: 'Proceed to ocular symptom screen', next: 'symptom-ocular' },
    ],
  },

  {
    id: 'symptom-ocular',
    type: 'question',
    module: 3,
    title: 'Ocular Symptom Screen',
    body: 'Does the patient have ANY ocular symptoms?\n\n\u2022 Vision changes / vision loss\n\u2022 Uveitis / retinitis on exam\n\u2022 Photophobia',
    citation: [1, 5],
    options: [
      { label: 'Yes \u2014 ocular symptoms present', description: 'Proceed to cranial nerve assessment', next: 'ocular-cn-check', urgency: 'urgent' },
      { label: 'No \u2014 no ocular symptoms', description: 'Proceed to otic symptom screen', next: 'symptom-otic' },
    ],
  },

  {
    id: 'ocular-cn-check',
    type: 'question',
    module: 3,
    title: 'Cranial Nerve Assessment',
    body: 'Is cranial nerve dysfunction present on exam?',
    citation: [1, 5],
    options: [
      { label: 'Yes \u2014 cranial nerve dysfunction', description: 'LP indicated to evaluate for neurosyphilis', next: 'lp-indicated-ocular', urgency: 'critical' },
      { label: 'No \u2014 isolated ocular findings', description: 'Confirmed isolated ocular syphilis on exam \u2014 treat as neurosyphilis without LP', next: 'tx-neurosyphilis' },
    ],
  },

  {
    id: 'symptom-otic',
    type: 'question',
    module: 3,
    title: 'Otic Symptom Screen',
    body: 'Does the patient have ANY otic symptoms?\n\n\u2022 Hearing loss (moderate or greater severity)\n\u2022 Tinnitus\n\u2022 Vertigo\n\nIf present with normal neurologic exam, CSF is likely normal. Treat as neurosyphilis without LP.',
    citation: [1],
    options: [
      { label: 'Yes \u2014 otic symptoms present', description: 'Normal neurologic exam \u2014 treat as neurosyphilis without LP', next: 'tx-neurosyphilis', urgency: 'urgent' },
      { label: 'No \u2014 no otic symptoms', description: 'Patient is asymptomatic \u2014 proceed to LP decision', next: 'lp-tertiary-check' },
    ],
  },

  // =====================================================================
  // MODULE 4: LP DECISION ENGINE
  // =====================================================================

  // Neuro symptoms → LP indicated (from Module 3)
  {
    id: 'lp-indicated-neuro',
    type: 'info',
    module: 4,
    title: 'LP Indicated \u2014 Neurologic Symptoms',
    body: 'Lumbar puncture is indicated due to neurologic symptoms. CSF analysis will help confirm or rule out neurosyphilis.\n\nProceed to CSF interpretation after obtaining LP results.',
    citation: [1, 5],
    next: 'csf-vdrl-result',
  },

  // Ocular + CN → LP indicated
  {
    id: 'lp-indicated-ocular',
    type: 'info',
    module: 4,
    title: 'LP Indicated \u2014 Ocular + Cranial Nerve',
    body: 'Lumbar puncture is indicated due to ocular symptoms with cranial nerve dysfunction. CSF analysis will help determine extent of CNS involvement.',
    citation: [1, 5],
    next: 'csf-vdrl-result',
  },

  // Tertiary check (for asymptomatic patients)
  {
    id: 'lp-tertiary-check',
    type: 'question',
    module: 4,
    title: 'LP Decision \u2014 Asymptomatic Patient',
    body: 'Patient has no neurologic, ocular, or otic symptoms. Was the patient staged as TERTIARY syphilis?\n\nTertiary syphilis (gummatous, cardiovascular) requires LP before treatment to rule out neurosyphilis.',
    citation: [1],
    options: [
      { label: 'Yes \u2014 tertiary syphilis', description: 'LP indicated before treatment', next: 'lp-indicated-tertiary', urgency: 'critical' },
      { label: 'No \u2014 not tertiary', description: 'Proceed to HIV status assessment', next: 'lp-hiv-status' },
    ],
  },

  {
    id: 'lp-indicated-tertiary',
    type: 'info',
    module: 4,
    title: 'LP Indicated \u2014 Tertiary Syphilis',
    body: 'Lumbar puncture is indicated before treatment for tertiary syphilis to rule out neurosyphilis. Proceed to CSF interpretation after obtaining LP results.',
    citation: [1],
    next: 'csf-vdrl-result',
  },

  {
    id: 'lp-hiv-status',
    type: 'question',
    module: 4,
    title: 'HIV Status',
    body: 'What is the patient\u2019s HIV status?\n\nIMPORTANT: Reactive treponemal test + nonreactive NTT + no neurologic symptoms = LOW neurosyphilis risk. CSF examination is NOT recommended in this scenario.',
    citation: [1, 9, 17],
    options: [
      { label: 'HIV Negative', next: 'lp-hiv-neg-failure' },
      { label: 'HIV Positive', next: 'lp-hiv-pos-simple' },
      { label: 'Unknown', description: 'If unknown, consider HIV testing', next: 'lp-hiv-neg-failure' },
    ],
  },

  // HIV-Negative path
  {
    id: 'lp-hiv-neg-failure',
    type: 'question',
    module: 4,
    title: 'Treatment Failure Assessment',
    body: 'Is there evidence of treatment failure?\n\nTreatment failure = NTT titers not declining fourfold within 12\u201324 months after appropriate treatment.',
    citation: [1],
    options: [
      { label: 'Yes \u2014 treatment failure', description: 'Titers not declining as expected', next: 'lp-hiv-neg-titer' },
      { label: 'No \u2014 no prior treatment or titers declining', description: 'LP not indicated', next: 'lp-not-indicated' },
      { label: 'Not applicable \u2014 new diagnosis', description: 'No prior treatment to assess', next: 'lp-not-indicated' },
    ],
  },

  {
    id: 'lp-hiv-neg-titer',
    type: 'question',
    module: 4,
    title: 'Current NTT Titer',
    body: 'What is the current NTT (RPR/VDRL) titer?',
    citation: [1],
    options: [
      { label: 'NTT \u22651:32', description: 'Higher titer with treatment failure \u2014 consider LP', next: 'lp-consider', urgency: 'urgent' },
      { label: 'NTT <1:32', description: 'Lower titer \u2014 assess for reinfection', next: 'lp-reinfection' },
    ],
  },

  {
    id: 'lp-consider',
    type: 'question',
    module: 4,
    title: 'Consider Lumbar Puncture',
    body: 'LP is recommended based on treatment failure with NTT \u22651:32. This is a clinical judgment decision.',
    citation: [1],
    options: [
      { label: 'Proceed with LP', description: 'Obtain CSF for analysis', next: 'csf-vdrl-result' },
      { label: 'Defer LP \u2014 treat based on stage', description: 'Proceed to stage-appropriate treatment', next: 'tx-stage-select' },
    ],
  },

  {
    id: 'lp-reinfection',
    type: 'result',
    module: 4,
    title: 'Assess for Reinfection',
    body: 'Treatment failure with NTT <1:32. Assess for possible reinfection (new exposure, new lesion). Consider retreatment with stage-appropriate regimen.',
    citation: [1],
    recommendation: 'Evaluate for reinfection. If reinfection unlikely, consider retreatment: [Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM weekly \u00d7 3 doses.',
    confidence: 'recommended',
  },

  // HIV-Positive path (simple)
  {
    id: 'lp-hiv-pos-simple',
    type: 'question',
    module: 4,
    title: 'HIV+ Patient Assessment',
    body: 'Does the HIV-positive patient have any neurologic, hearing, or vision concerns?\n\nNote: Same treatment regimens apply regardless of HIV status. ART improves outcomes (CSF WBC and VDRL more likely to normalize in patients receiving antiretrovirals).',
    citation: [1, 9, 17],
    options: [
      { label: 'Yes \u2014 neurologic, hearing, or vision concerns', description: 'LP indicated', next: 'lp-indicated-hiv', urgency: 'critical' },
      { label: 'No concerns', description: 'LP not indicated', next: 'lp-not-indicated' },
    ],
  },

  {
    id: 'lp-indicated-hiv',
    type: 'info',
    module: 4,
    title: 'LP Indicated \u2014 HIV+ with Concerns',
    body: 'Lumbar puncture is indicated for this HIV-positive patient with neurologic, hearing, or vision concerns. Proceed to CSF interpretation.',
    citation: [1, 9],
    next: 'csf-vdrl-result',
  },

  {
    id: 'lp-not-indicated',
    type: 'info',
    module: 4,
    title: 'LP Not Indicated',
    body: 'Lumbar puncture is not indicated for this patient. Proceed to stage-appropriate treatment.',
    citation: [1],
    next: 'tx-stage-select',
  },

  // =====================================================================
  // MODULE 5: CSF INTERPRETER
  // =====================================================================

  {
    id: 'csf-vdrl-result',
    type: 'question',
    module: 5,
    title: 'CSF-VDRL Result',
    body: 'What is the CSF-VDRL result?\n\nCSF-VDRL: Sensitivity 49\u201387.5%, Specificity 74\u2013100%. A reactive result is diagnostic of neurosyphilis in the presence of neurologic signs/symptoms.\n\nEnsure no blood contamination of the CSF sample.',
    citation: [1, 3, 5],
    options: [
      { label: 'Reactive', description: 'Diagnostic of neurosyphilis (with neurologic signs/symptoms)', next: 'csf-vdrl-reactive', urgency: 'critical' },
      { label: 'Nonreactive', description: 'Does not rule out neurosyphilis \u2014 assess other CSF parameters', next: 'csf-parameters' },
    ],
  },

  {
    id: 'csf-vdrl-reactive',
    type: 'info',
    module: 5,
    title: 'Neurosyphilis Confirmed',
    body: 'Reactive CSF-VDRL is diagnostic of neurosyphilis in the presence of neurologic signs and symptoms. Proceed to neurosyphilis treatment.',
    citation: [1, 3, 5],
    next: 'tx-neurosyphilis',
  },

  {
    id: 'csf-parameters',
    type: 'question',
    module: 5,
    title: 'CSF Parameters',
    body: 'Assess CSF-WBC count and protein.\n\nCSF-WBC thresholds:\n\u2022 HIV-negative: >5 cells/mm\u00b3 = elevated (sensitive but not specific)\n\u2022 HIV-positive: >20 cells/mm\u00b3 = more specific cutoff (>5 may be from HIV itself)\n\nCSF protein: Low sensitivity AND specificity for neurosyphilis.\n\nAre CSF-WBC or protein elevated?',
    citation: [1, 3, 5],
    options: [
      { label: 'Elevated WBC or protein', description: 'Neurosyphilis still possible \u2014 proceed to additional testing', next: 'csf-additional', urgency: 'urgent' },
      { label: 'Normal WBC AND protein', description: 'With negative CSF-VDRL, neurosyphilis is unlikely', next: 'csf-normal' },
    ],
  },

  {
    id: 'csf-normal',
    type: 'info',
    module: 5,
    title: 'Neurosyphilis Unlikely',
    body: 'Normal CSF-WBC, normal protein, and nonreactive CSF-VDRL = neurosyphilis is unlikely. Proceed to stage-appropriate treatment.\n\nCLINICAL BOTTOM LINE: If clinical suspicion for neurosyphilis remains HIGH despite negative CSF, consider empiric neurosyphilis treatment.',
    citation: [1, 5],
    next: 'tx-stage-select',
  },

  {
    id: 'csf-additional',
    type: 'question',
    module: 5,
    title: 'Additional CSF Testing',
    body: 'CSF-VDRL is nonreactive but WBC or protein is elevated. Neurosyphilis is still possible.\n\nCSF FTA-ABS: Sensitivity 91\u2013100%, Specificity ~55%.\nCSF TP-PA: Sensitivity ~97%, Specificity ~84%.\n\nA NONREACTIVE CSF FTA-ABS or TP-PA makes neurosyphilis highly unlikely.\nA REACTIVE result does NOT confirm neurosyphilis (less specific than VDRL) but supports clinical suspicion.\n\nWhat is the CSF FTA-ABS or TP-PA result?',
    citation: [1, 3, 5],
    options: [
      { label: 'Nonreactive', description: 'Neurosyphilis highly unlikely, especially with nonspecific neurologic symptoms', next: 'csf-trep-nonreactive' },
      { label: 'Reactive', description: 'Supports clinical suspicion but does not confirm \u2014 consider empiric treatment', next: 'csf-trep-reactive', urgency: 'urgent' },
      { label: 'Not available / pending', description: 'Clinical decision needed based on available data', next: 'csf-clinical-decision' },
    ],
  },

  {
    id: 'csf-trep-nonreactive',
    type: 'info',
    module: 5,
    title: 'Neurosyphilis Highly Unlikely',
    body: 'Nonreactive CSF FTA-ABS or TP-PA makes neurosyphilis highly unlikely, especially when neurologic symptoms are nonspecific. Proceed to stage-appropriate treatment.',
    citation: [3, 5],
    next: 'tx-stage-select',
  },

  {
    id: 'csf-trep-reactive',
    type: 'question',
    module: 5,
    title: 'CSF Treponemal Test Reactive',
    body: 'Reactive CSF FTA-ABS or TP-PA supports clinical suspicion for neurosyphilis but does NOT confirm it (less specific than CSF-VDRL).\n\nCDC recommends considering empiric neurosyphilis treatment when clinical suspicion is high.\n\nCSF PCR for T. pallidum (if available): Specificity 97\u2013100%, Sensitivity 27\u201342.5%. CDC does not recommend CSF PCR (not standardized). Most useful when CSF-VDRL negative + treponemal test positive.',
    citation: [1, 3, 8, 13, 14],
    options: [
      { label: 'Treat empirically as neurosyphilis', description: 'Clinical suspicion remains high', next: 'tx-neurosyphilis', urgency: 'critical' },
      { label: 'Treat based on stage', description: 'Clinical suspicion is low \u2014 reactive treponemal likely nonspecific', next: 'tx-stage-select' },
    ],
  },

  {
    id: 'csf-clinical-decision',
    type: 'question',
    module: 5,
    title: 'Clinical Decision',
    body: 'Additional CSF testing is not available. The CSF-VDRL is nonreactive but WBC or protein is elevated.\n\nCLINICAL BOTTOM LINE: If clinical suspicion for neurosyphilis remains HIGH despite negative CSF-VDRL, treat empirically as neurosyphilis.\n\nWhat is the clinical suspicion level?',
    citation: [1, 5],
    options: [
      { label: 'High suspicion \u2014 treat as neurosyphilis', description: 'Empiric neurosyphilis treatment', next: 'tx-neurosyphilis', urgency: 'critical' },
      { label: 'Low suspicion \u2014 treat based on stage', description: 'Stage-appropriate treatment', next: 'tx-stage-select' },
    ],
  },

  // =====================================================================
  // MODULE 6: TREATMENT RECOMMENDATIONS
  // =====================================================================

  // Treatment routing for non-neurosyphilis
  {
    id: 'tx-stage-select',
    type: 'question',
    module: 6,
    title: 'Stage-Appropriate Treatment',
    body: 'Select the syphilis stage to see the recommended treatment regimen.',
    citation: [1],
    options: [
      { label: 'Primary or Secondary', next: 'tx-primary-secondary' },
      { label: 'Early Latent', next: 'tx-early-latent' },
      { label: 'Late Latent or Unknown Duration', next: 'tx-late-latent' },
      { label: 'Tertiary (after LP rules out neurosyphilis)', next: 'tx-tertiary' },
    ],
  },

  // --- Neurosyphilis / Ocular / Otic Treatment ---
  {
    id: 'tx-neurosyphilis',
    type: 'result',
    module: 6,
    title: 'Neurosyphilis Treatment',
    body: 'Treat as neurosyphilis, ocular syphilis, or otosyphilis. [Penicillin G](#/drug/penicillin-g-iv) is the ONLY proven effective therapy for neurosyphilis.',
    citation: [1, 10, 11],
    recommendation: '[Aqueous crystalline penicillin G](#/drug/penicillin-g-iv) — see dosing below.',
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Aqueous crystalline penicillin G',
        dose: '18\u201324 million units/day IV',
        route: 'IV',
        frequency: '3\u20134 million units q4h OR continuous infusion',
        duration: '10\u201314 days',
        notes: 'Achieves treponemicidal levels in CSF.',
      },
      alternative: {
        drug: 'Procaine penicillin G + probenecid',
        dose: 'Procaine PCN 2.4 million units IM daily + probenecid 500 mg PO QID',
        route: 'IM + PO',
        frequency: 'Daily (procaine PCN) + four times daily (probenecid)',
        duration: '10\u201314 days',
        notes: 'Equivalent outcomes to IV penicillin G (Dunaway et al., CID 2020).',
      },
      pcnAllergy: {
        drug: 'Ceftriaxone (if desensitization not feasible)',
        dose: '2g daily',
        route: 'IV',
        frequency: 'Once daily',
        duration: '10\u201314 days',
        notes: 'Penicillin desensitization STRONGLY recommended (CDC). Penicillin remains the only proven effective therapy. Ceftriaxone: European data shows similar efficacy (Bettuzzi et al., Lancet ID 2021). Doxycycline 200 mg PO BID \u00d7 28 days has LIMITED DATA for neurosyphilis. Azithromycin NOT recommended (widespread macrolide resistance).',
      },
      monitoring: 'Repeat LP every 6 months until CSF normalizes. CSF-WBC should decline at 6 months; if not, consider retreatment. CSF-VDRL and protein normalize more slowly. NTT titers: check at 3, 6, 9, 12, 24 months. HIV+ patients: ART improves CSF normalization outcomes.',
    },
  },

  // --- Primary & Secondary ---
  {
    id: 'tx-primary-secondary',
    type: 'result',
    module: 6,
    title: 'Primary & Secondary Syphilis Treatment',
    body: 'Standard treatment for primary or secondary syphilis without evidence of neurosyphilis.',
    citation: [1, 6],
    recommendation: '[Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM \u00d7 1 dose.',
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Benzathine penicillin G',
        dose: '2.4 million units',
        route: 'IM',
        frequency: 'Single dose',
        duration: '1 dose',
      },
      pcnAllergy: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '14 days',
        notes: 'For nonpregnant PCN-allergic patients. Ceftriaxone 1\u20132g daily (IV or IM) \u00d7 10\u201314 days is another option.',
      },
      monitoring: 'NTT titers at 3, 6, 9, 12, 24 months. Fourfold decline within 12\u201324 months = successful treatment. 15\u201320% have serologic nonresponse (titers remain reactive, usually \u22641:8).',
    },
  },

  // --- Early Latent ---
  {
    id: 'tx-early-latent',
    type: 'result',
    module: 6,
    title: 'Early Latent Syphilis Treatment',
    body: 'Standard treatment for early latent syphilis (acquired within prior 12 months) without evidence of neurosyphilis.',
    citation: [1],
    recommendation: '[Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM \u00d7 1 dose.',
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Benzathine penicillin G',
        dose: '2.4 million units',
        route: 'IM',
        frequency: 'Single dose',
        duration: '1 dose',
      },
      pcnAllergy: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '28 days',
        notes: 'For nonpregnant PCN-allergic patients.',
      },
      monitoring: 'NTT titers at 3, 6, 9, 12, 24 months. Fourfold decline within 12\u201324 months = successful treatment.',
    },
  },

  // --- Late Latent / Unknown Duration ---
  {
    id: 'tx-late-latent',
    type: 'result',
    module: 6,
    title: 'Late Latent / Unknown Duration Treatment',
    body: 'Treatment for late latent syphilis, syphilis of unknown duration, or when no clear timeline exists. Treat as late latent.',
    citation: [1],
    recommendation: '[Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM weekly \u00d7 3 doses.',
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Benzathine penicillin G',
        dose: '2.4 million units',
        route: 'IM',
        frequency: 'Weekly',
        duration: '3 weeks (3 doses)',
      },
      pcnAllergy: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '28 days',
        notes: 'For nonpregnant PCN-allergic patients.',
      },
      monitoring: 'NTT titers at 6, 12, 18, 24 months. Fourfold decline if initially high (\u22651:32). Many with low titers and late latent do NOT achieve fourfold decline.',
    },
  },

  // --- Tertiary (no neurosyphilis) ---
  {
    id: 'tx-tertiary',
    type: 'result',
    module: 6,
    title: 'Tertiary Syphilis Treatment',
    body: 'Treatment for tertiary syphilis (gummatous or cardiovascular) after CSF evaluation rules out neurosyphilis.',
    citation: [1],
    recommendation: '[Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM weekly \u00d7 3 doses.',
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Benzathine penicillin G',
        dose: '2.4 million units',
        route: 'IM',
        frequency: 'Weekly',
        duration: '3 weeks (3 doses)',
        notes: 'After CSF evaluation rules out neurosyphilis.',
      },
      pcnAllergy: {
        drug: 'Doxycycline',
        dose: '100 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '28 days',
        notes: 'For nonpregnant PCN-allergic patients. Limited data for tertiary syphilis.',
      },
      monitoring: 'NTT titers at 6, 12, 18, 24 months. Clinical monitoring for ongoing gummatous or cardiovascular complications.',
    },
  },
];

/** Total node count for metadata */
export const NEUROSYPHILIS_NODE_COUNT = NEUROSYPHILIS_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for flowchart)
// -------------------------------------------------------------------

export const NEUROSYPHILIS_MODULE_LABELS = ['Serology', 'Stage', 'Symptoms', 'LP', 'CSF', 'Treatment'];

// -------------------------------------------------------------------
// Evidence Citations (17 references from PRD.md Section 8)
// -------------------------------------------------------------------

export interface Citation {
  num: number;
  text: string;
}

export const NEUROSYPHILIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Workowski KA, et al. STI Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.' },
  { num: 2, text: 'Tuddenham S, et al. Syphilis Laboratory Guidelines: NTT Performance. Clin Infect Dis. 2020;71(S1):S21-S42.' },
  { num: 3, text: 'Ding D, et al. Diagnostic Performance of Lab Tests of Neurosyphilis: Systematic Review & Network Meta-Analysis. Eur Neurol. 2023;86(6):418-429.' },
  { num: 4, text: 'Chevalier FJ, et al. Syphilis. JAMA. 2025.' },
  { num: 5, text: 'Ropper AH. Neurosyphilis. N Engl J Med. 2019;381(14):1358-1363.' },
  { num: 6, text: 'Peeling RW, et al. Syphilis. Lancet. 2023;402(10398):336-346.' },
  { num: 7, text: 'Ghanem KG, et al. The Modern Epidemic of Syphilis. N Engl J Med. 2020;382(9):845-854.' },
  { num: 8, text: 'Vanhaecke C, et al. Neurosyphilis and T. pallidum Nested PCR in CSF. Clin Infect Dis. 2016;63(9):1180-1186.' },
  { num: 9, text: 'Benson C, et al. OI Guidelines for Adults/Adolescents With HIV. IDSA/OARAC. 2025.' },
  { num: 10, text: 'Bettuzzi T, et al. Ceftriaxone vs Benzylpenicillin in Neurosyphilis. Lancet Infect Dis. 2021;21(10):1441-1447.' },
  { num: 11, text: 'Dunaway SB, et al. Neurosyphilis Treatment: IV PCN G vs IM Procaine PCN + Probenecid. Clin Infect Dis. 2020;71(2):267-273.' },
  { num: 12, text: 'Davis AP, et al. How Well Do Neurologic Symptoms Identify Neurosyphilis? Clin Infect Dis. 2018;66(3):363-367.' },
  { num: 13, text: 'Salle R, et al. Molecular vs Serological Assays on CSF for Neurosyphilis. JEADV. 2023;37(2):390-394.' },
  { num: 14, text: 'Vrbov\u00e1 E, et al. Nested PCR Detection of Syphilis Treponemes. PLoS One. 2020;15(8):e0237949.' },
  { num: 15, text: 'Tuddenham S, et al. Diagnosis and Treatment of STIs: A Review. JAMA. 2022;327(2):161-172.' },
  { num: 16, text: 'Miller JM, et al. Microbiology Lab Utilization Guide: 2024 Update. IDSA/ASM. Clin Infect Dis. 2024.' },
  { num: 17, text: 'Thompson MA, et al. Primary Care Guidance for Persons With HIV: 2020 Update. HIVMA/IDSA. Clin Infect Dis. 2021;73(11):e3572-e3605.' },
];

// -------------------------------------------------------------------
// Diagnostic Test Performance Data
// -------------------------------------------------------------------

export interface TestRow {
  test: string;
  sensitivity: string;
  specificity: string;
  role: string;
}

export const NEUROSYPHILIS_DIAGNOSTIC_TESTS: TestRow[] = [
  { test: 'CSF-VDRL', sensitivity: '49\u201387.5%', specificity: '74\u2013100%', role: 'Cornerstone. Reactive = diagnostic (with neuro signs)' },
  { test: 'CSF-RPR', sensitivity: '51.5\u201381.8%', specificity: '81.8\u2013100%', role: 'Similar to VDRL, may be less sensitive' },
  { test: 'CSF FTA-ABS', sensitivity: '91\u2013100%', specificity: '~55%', role: 'High sensitivity. Negative = rules out neurosyphilis' },
  { test: 'CSF TP-PA', sensitivity: '~97%', specificity: '~84%', role: 'Highest sensitivity. Negative = rules out' },
  { test: 'CSF TPHA', sensitivity: '91\u2013100%', specificity: '~55%', role: 'Similar to FTA-ABS' },
  { test: 'CSF PCR (qPCR)', sensitivity: '41\u201342.5%', specificity: '97\u2013100%', role: 'Confirms active CNS infection when positive' },
  { test: 'CSF PCR (nested)', sensitivity: '27%', specificity: '100%', role: 'Most specific but least sensitive' },
  { test: 'CSF WBC >5/mm\u00b3', sensitivity: 'Sensitive', specificity: 'Not specific', role: 'Baseline for non-HIV' },
  { test: 'CSF WBC >20/mm\u00b3', sensitivity: '\u2014', specificity: 'More specific', role: 'Better cutoff for HIV+ patients' },
  { test: 'CSF protein', sensitivity: 'Low', specificity: 'Low', role: 'Normalizes slowly after treatment' },
];

export const NEUROSYPHILIS_CLINICAL_NOTES: string[] = [
  'Neurologic symptoms: Specificity 91.6\u2013100%, Sensitivity 1.5\u201338.1%. Absence does NOT rule out neurosyphilis.',
  'CSF-VDRL: Reactive result is diagnostic with neuro signs. Nonreactive does NOT rule out neurosyphilis.',
  'CSF FTA-ABS/TP-PA: Nonreactive result makes neurosyphilis highly unlikely (high NPV).',
  'Prozone phenomenon: False-negative NTT at very high titers. Always request dilution if suspicion is high.',
  'HIV+ patients: Use WBC >20/mm\u00b3 cutoff (>5 may be from HIV itself). Same treatment regimens apply.',
  'Penicillin: The ONLY proven effective therapy for neurosyphilis. Desensitize if allergic.',
];
