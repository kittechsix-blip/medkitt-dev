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
// Page Registry
// -------------------------------------------------------------------

const INFO_PAGES: Record<string, InfoPage> = {
  'doac-pe': DOAC_PE_PAGE,
  'priapism-return-precautions': PRIAPISM_RETURN_PRECAUTIONS,
};

// -------------------------------------------------------------------
// Modal Overlay
// -------------------------------------------------------------------

let overlayEl: HTMLElement | null = null;

function destroyOverlay(): void {
  overlayEl?.remove();
  overlayEl = null;
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
