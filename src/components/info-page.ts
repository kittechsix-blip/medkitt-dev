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

interface InfoSection {
  heading?: string;
  body: string;
  drugTable?: DrugDosing[];
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
// Page Registry
// -------------------------------------------------------------------

const INFO_PAGES: Record<string, InfoPage> = {
  'doac-pe': DOAC_PE_PAGE,
  'priapism-return-precautions': PRIAPISM_RETURN_PRECAUTIONS,
  'cardioversion-afib': CARDIOVERSION_AFIB_PAGE,
  'afib-discharge': AFIB_DISCHARGE_PAGE,
  'pep-patient-info': PEP_PATIENT_INFO,
  'hbv-serology': HBV_SEROLOGY_PAGE,
};

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
          p.textContent = line;
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
