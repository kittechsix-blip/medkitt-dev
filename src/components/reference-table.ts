// MedKitt — Reference Tables & Info Panels
// Diagnostic test performance, monitoring schedules, and evidence citations.
// Multi-tree aware: data is passed in from tree data files.

import type { Citation, TestRow } from '../data/trees/neurosyphilis.js';
import {
  NEUROSYPHILIS_CITATIONS,
  NEUROSYPHILIS_DIAGNOSTIC_TESTS,
  NEUROSYPHILIS_CLINICAL_NOTES,
} from '../data/trees/neurosyphilis.js';
import {
  PNEUMOTHORAX_CITATIONS,
  PNEUMOTHORAX_DIAGNOSTIC_TESTS,
  PNEUMOTHORAX_CLINICAL_NOTES,
} from '../data/trees/pneumothorax.js';
import {
  PE_TREATMENT_CITATIONS,
  PE_TREATMENT_DIAGNOSTIC_TESTS,
  PE_TREATMENT_CLINICAL_NOTES,
} from '../data/trees/pe-treatment.js';

// -------------------------------------------------------------------
// Tree Reference Data Registry
// -------------------------------------------------------------------

interface TreeReferenceData {
  title: string;
  citations: Citation[];
  diagnosticTests?: TestRow[];
  clinicalNotes?: string[];
  testTableTitle?: string;
}

const TREE_REFERENCE_DATA: Record<string, TreeReferenceData> = {
  'neurosyphilis': {
    title: 'Neurosyphilis Reference',
    citations: NEUROSYPHILIS_CITATIONS,
    diagnosticTests: NEUROSYPHILIS_DIAGNOSTIC_TESTS,
    clinicalNotes: NEUROSYPHILIS_CLINICAL_NOTES,
    testTableTitle: 'CSF Diagnostic Test Performance',
  },
  'pneumothorax': {
    title: 'Pneumothorax POCUS Reference',
    citations: PNEUMOTHORAX_CITATIONS,
    diagnosticTests: PNEUMOTHORAX_DIAGNOSTIC_TESTS,
    clinicalNotes: PNEUMOTHORAX_CLINICAL_NOTES,
    testTableTitle: 'Ultrasound vs CXR for Pneumothorax',
  },
  'pe-treatment': {
    title: 'PE Treatment Reference',
    citations: PE_TREATMENT_CITATIONS,
    diagnosticTests: PE_TREATMENT_DIAGNOSTIC_TESTS,
    clinicalNotes: PE_TREATMENT_CLINICAL_NOTES,
    testTableTitle: 'PE Risk Stratification Markers',
  },
};

// -------------------------------------------------------------------
// Render: Reference Panel (standalone page)
// -------------------------------------------------------------------

/** Render the full reference panel into a container */
export function renderReferencePanel(container: HTMLElement, treeId?: string): void {
  container.innerHTML = '';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'btn-text';
  backBtn.textContent = '\u2190 Back';
  backBtn.addEventListener('click', () => history.back());
  container.appendChild(backBtn);

  // If treeId provided, show that tree's references
  if (treeId && TREE_REFERENCE_DATA[treeId]) {
    const data = TREE_REFERENCE_DATA[treeId];
    renderTreeReference(container, data);
    return;
  }

  // No treeId or unknown — show all tree references
  const allHeading = document.createElement('h2');
  allHeading.className = 'reference-heading';
  allHeading.textContent = 'Reference Tables';
  container.appendChild(allHeading);

  for (const [_id, data] of Object.entries(TREE_REFERENCE_DATA)) {
    renderTreeReference(container, data);
  }
}

function renderTreeReference(container: HTMLElement, data: TreeReferenceData): void {
  const heading = document.createElement('h2');
  heading.className = 'reference-heading';
  heading.textContent = data.title;
  container.appendChild(heading);

  // Diagnostic test table
  if (data.diagnosticTests && data.diagnosticTests.length > 0) {
    renderTestTable(container, data.diagnosticTests, data.testTableTitle);
  }

  // Key clinical notes
  if (data.clinicalNotes && data.clinicalNotes.length > 0) {
    renderClinicalNotes(container, data.clinicalNotes);
  }

  // Citations
  renderCitationsPanel(container, data.citations);

  // Disclaimer
  renderDisclaimer(container);
}

// -------------------------------------------------------------------
// Render: Inline Citations (for use from result cards)
// -------------------------------------------------------------------

/** Render a citations panel showing specific citation numbers */
export function renderInlineCitations(container: HTMLElement, citationNums: number[], citations: Citation[]): void {
  const section = document.createElement('details');
  section.className = 'reference-citations-inline';

  const summary = document.createElement('summary');
  summary.textContent = `\u25B8 References (${citationNums.length})`;
  section.appendChild(summary);

  const list = document.createElement('div');
  list.className = 'reference-citation-list';

  for (const num of citationNums) {
    const cite = citations.find(c => c.num === num);
    if (!cite) continue;

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
    list.appendChild(item);
  }

  section.appendChild(list);
  container.appendChild(section);
}

// -------------------------------------------------------------------
// Diagnostic Test Performance Table
// -------------------------------------------------------------------

function renderTestTable(container: HTMLElement, tests: TestRow[], tableTitle?: string): void {
  const section = document.createElement('div');
  section.className = 'reference-section';

  const title = document.createElement('h3');
  title.className = 'reference-section-title';
  title.textContent = tableTitle ?? 'Diagnostic Test Performance';
  section.appendChild(title);

  // Card layout for mobile
  for (const row of tests) {
    const card = document.createElement('div');
    card.className = 'reference-test-card';

    const testName = document.createElement('div');
    testName.className = 'reference-test-name';
    testName.textContent = row.test;
    card.appendChild(testName);

    const stats = document.createElement('div');
    stats.className = 'reference-test-stats';

    const senEl = document.createElement('span');
    senEl.className = 'reference-stat';
    const senLabel = document.createElement('span');
    senLabel.className = 'reference-stat-label';
    senLabel.textContent = 'Sensitivity';
    const senValue = document.createElement('span');
    senValue.className = 'reference-stat-value';
    senValue.textContent = row.sensitivity;
    senEl.appendChild(senLabel);
    senEl.appendChild(senValue);

    const specEl = document.createElement('span');
    specEl.className = 'reference-stat';
    const specLabel = document.createElement('span');
    specLabel.className = 'reference-stat-label';
    specLabel.textContent = 'Specificity';
    const specValue = document.createElement('span');
    specValue.className = 'reference-stat-value';
    specValue.textContent = row.specificity;
    specEl.appendChild(specLabel);
    specEl.appendChild(specValue);

    stats.appendChild(senEl);
    stats.appendChild(specEl);
    card.appendChild(stats);

    const roleEl = document.createElement('div');
    roleEl.className = 'reference-test-role';
    roleEl.textContent = row.role;
    card.appendChild(roleEl);

    section.appendChild(card);
  }

  container.appendChild(section);
}

// -------------------------------------------------------------------
// Clinical Notes
// -------------------------------------------------------------------

function renderClinicalNotes(container: HTMLElement, notes: string[]): void {
  const section = document.createElement('div');
  section.className = 'reference-section';

  const title = document.createElement('h3');
  title.className = 'reference-section-title';
  title.textContent = 'Key Clinical Notes';
  section.appendChild(title);

  for (const note of notes) {
    const noteEl = document.createElement('div');
    noteEl.className = 'reference-note-card';
    noteEl.textContent = note;
    section.appendChild(noteEl);
  }

  container.appendChild(section);
}

// -------------------------------------------------------------------
// Citations Panel
// -------------------------------------------------------------------

function renderCitationsPanel(container: HTMLElement, citations: Citation[]): void {
  const section = document.createElement('div');
  section.className = 'reference-section';

  const title = document.createElement('h3');
  title.className = 'reference-section-title';
  title.textContent = 'Evidence Citations';
  section.appendChild(title);

  const list = document.createElement('div');
  list.className = 'reference-citation-list';

  for (const cite of citations) {
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
    list.appendChild(item);
  }

  section.appendChild(list);
  container.appendChild(section);
}

// -------------------------------------------------------------------
// Disclaimer
// -------------------------------------------------------------------

function renderDisclaimer(container: HTMLElement): void {
  const disclaimer = document.createElement('div');
  disclaimer.className = 'reference-disclaimer';
  disclaimer.textContent = 'This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.';
  container.appendChild(disclaimer);
}
