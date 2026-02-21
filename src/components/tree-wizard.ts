// MedKitt — Wizard UI Component
// Renders one decision node at a time with progress, back nav, and option buttons.

import { TreeEngine } from '../services/tree-engine.js';
import { NEUROSYPHILIS_NODES, NEUROSYPHILIS_CITATIONS, NEUROSYPHILIS_MODULE_LABELS } from '../data/trees/neurosyphilis.js';
import { PNEUMOTHORAX_NODES, PNEUMOTHORAX_CITATIONS, PNEUMOTHORAX_MODULE_LABELS } from '../data/trees/pneumothorax.js';
import { PE_TREATMENT_NODES, PE_TREATMENT_CITATIONS, PE_TREATMENT_MODULE_LABELS } from '../data/trees/pe-treatment.js';
import { ECHO_VIEWS_NODES, ECHO_VIEWS_CITATIONS, ECHO_VIEWS_MODULE_LABELS } from '../data/trees/echo-views.js';
import { PRIAPISM_NODES, PRIAPISM_CITATIONS, PRIAPISM_MODULE_LABELS } from '../data/trees/priapism.js';
import type { Citation } from '../data/trees/neurosyphilis.js';
import { router } from '../services/router.js';

import { renderInlineCitations } from './reference-table.js';
import { showInfoModal } from './info-page.js';
import { showDrugModal } from './drug-store.js';
import { findDrugIdByName } from '../data/drug-store.js';
import type { DecisionNode, TreatmentRegimen } from '../models/types.js';

// -------------------------------------------------------------------
// Tree Configuration Map
// -------------------------------------------------------------------

interface TreeConfig {
  nodes: DecisionNode[];
  entryNodeId: string;
  categoryId: string;
  moduleLabels: string[];
  citations: Citation[];
}

const TREE_CONFIGS: Record<string, TreeConfig> = {
  'neurosyphilis': {
    nodes: NEUROSYPHILIS_NODES,
    entryNodeId: 'serology-start',
    categoryId: 'infectious-disease',
    moduleLabels: NEUROSYPHILIS_MODULE_LABELS,
    citations: NEUROSYPHILIS_CITATIONS,
  },
  'pneumothorax': {
    nodes: PNEUMOTHORAX_NODES,
    entryNodeId: 'pneumothorax-start',
    categoryId: 'ultrasound',
    moduleLabels: PNEUMOTHORAX_MODULE_LABELS,
    citations: PNEUMOTHORAX_CITATIONS,
  },
  'pe-treatment': {
    nodes: PE_TREATMENT_NODES,
    entryNodeId: 'pe-start',
    categoryId: 'pulmonology',
    moduleLabels: PE_TREATMENT_MODULE_LABELS,
    citations: PE_TREATMENT_CITATIONS,
  },
  'echo-views': {
    nodes: ECHO_VIEWS_NODES,
    entryNodeId: 'echo-views-start',
    categoryId: 'ultrasound',
    moduleLabels: ECHO_VIEWS_MODULE_LABELS,
    citations: ECHO_VIEWS_CITATIONS,
  },
  'priapism': {
    nodes: PRIAPISM_NODES,
    entryNodeId: 'priapism-start',
    categoryId: 'procedures',
    moduleLabels: PRIAPISM_MODULE_LABELS,
    citations: PRIAPISM_CITATIONS,
  },
};

let engine: TreeEngine | null = null;
let currentTreeId: string | null = null;
let currentConfig: TreeConfig | null = null;

/** Initialize and render the wizard for a given tree */
export function renderTreeWizard(container: HTMLElement, treeId: string): void {
  const config = TREE_CONFIGS[treeId];
  if (!config) {
    renderUnavailable(container, treeId);
    return;
  }

  currentTreeId = treeId;
  currentConfig = config;
  engine = new TreeEngine(config.nodes);

  // Try to restore a saved session
  const restored = engine.restoreSession(treeId);
  if (!restored) {
    engine.startTree(treeId, config.entryNodeId);
  }

  renderCurrentNode(container);
}

/** Render the current node into the container */
function renderCurrentNode(container: HTMLElement): void {
  if (!engine) return;

  const node = engine.getCurrentNode();
  if (!node) return;

  container.innerHTML = '';

  // Disclaimer banner on the first node of each consult
  if (currentConfig && node.id === currentConfig.entryNodeId) {
    const banner = document.createElement('div');
    banner.className = 'wizard-disclaimer';
    banner.textContent = 'This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.';
    container.appendChild(banner);
  }

  // Header bar: back button + progress
  const header = renderHeader(node);
  container.appendChild(header);

  // Node content
  const content = document.createElement('div');
  content.className = 'wizard-content';

  switch (node.type) {
    case 'question':
      renderQuestionNode(content, node, container);
      break;
    case 'info':
      renderInfoNode(content, node, container);
      break;
    case 'result':
      renderResultNode(content, node, container);
      break;
    case 'input':
      renderInputNode(content, node, container);
      break;
  }

  container.appendChild(content);
}

// -------------------------------------------------------------------
// Header (back button + progress)
// -------------------------------------------------------------------

function renderHeader(node: DecisionNode): HTMLElement {
  const header = document.createElement('div');
  header.className = 'wizard-header';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'btn-text wizard-back';

  if (engine?.canGoBack()) {
    backBtn.textContent = '\u2190 Back';
    backBtn.addEventListener('click', () => {
      if (!engine) return;
      engine.goBack();
      const container = document.querySelector('.main-content') as HTMLElement;
      if (container) renderCurrentNode(container);
    });
  } else {
    backBtn.textContent = '\u2190 Exit';
    backBtn.addEventListener('click', () => {
      if (engine) engine.reset();
      
      router.navigate(`/category/${currentConfig?.categoryId ?? ''}`);
    });
  }

  // Progress indicator
  const progress = document.createElement('span');
  progress.className = 'wizard-progress';
  const totalModules = engine?.getTotalModules() ?? currentConfig?.moduleLabels.length ?? 1;
  progress.textContent = `Module ${node.module} of ${totalModules}`;

  header.appendChild(backBtn);
  header.appendChild(progress);

  return header;
}

// -------------------------------------------------------------------
// Question Node
// -------------------------------------------------------------------

function renderQuestionNode(content: HTMLElement, node: DecisionNode, container: HTMLElement): void {
  const title = document.createElement('h2');
  title.className = 'wizard-title';
  title.textContent = node.title;
  content.appendChild(title);

  const body = document.createElement('div');
  body.className = 'wizard-body';
  renderBodyText(body, node.body);
  content.appendChild(body);

  // Images (e.g., ultrasound reference images)
  renderNodeImages(content, node);

  // Calculator links (e.g., PESI / sPESI buttons)
  if (node.calculatorLinks?.length) {
    const linkRow = document.createElement('div');
    linkRow.className = 'wizard-calc-links';
    for (const link of node.calculatorLinks) {
      const btn = document.createElement('button');
      btn.className = 'btn-secondary wizard-calc-link';
      btn.textContent = link.label;
      btn.addEventListener('click', () => router.navigate(`/calculator/${link.id}`));
      linkRow.appendChild(btn);
    }
    content.appendChild(linkRow);
  }

  if (node.citation?.length) {
    const cite = document.createElement('div');
    cite.className = 'wizard-citation';
    cite.textContent = `Evidence: ${node.citation.map(n => `[${n}]`).join(' ')}`;
    content.appendChild(cite);
  }

  // Option buttons
  if (node.options) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'wizard-options';

    for (let i = 0; i < node.options.length; i++) {
      const opt = node.options[i];
      const btn = document.createElement('button');
      btn.className = 'option-btn';

      if (opt.urgency === 'critical') {
        btn.classList.add('option-critical');
      } else if (opt.urgency === 'urgent') {
        btn.classList.add('option-urgent');
      }

      const label = document.createElement('span');
      label.className = 'option-label';
      label.textContent = opt.label;
      btn.appendChild(label);

      if (opt.description) {
        const desc = document.createElement('span');
        desc.className = 'option-description';
        desc.textContent = opt.description;
        btn.appendChild(desc);
      }

      btn.addEventListener('click', () => {
        if (!engine) return;
        engine.selectOption(i);
        renderCurrentNode(container);
      });

      optionsContainer.appendChild(btn);
    }

    content.appendChild(optionsContainer);
  }
}

// -------------------------------------------------------------------
// Info Node
// -------------------------------------------------------------------

function renderInfoNode(content: HTMLElement, node: DecisionNode, container: HTMLElement): void {
  const title = document.createElement('h2');
  title.className = 'wizard-title';
  title.textContent = node.title;
  content.appendChild(title);

  const body = document.createElement('div');
  body.className = 'wizard-body';
  renderBodyText(body, node.body);
  content.appendChild(body);

  // Images (e.g., ultrasound reference images)
  renderNodeImages(content, node);

  if (node.citation?.length) {
    const cite = document.createElement('div');
    cite.className = 'wizard-citation';
    cite.textContent = `Evidence: ${node.citation.map(n => `[${n}]`).join(' ')}`;
    content.appendChild(cite);
  }

  if (node.next) {
    const continueBtn = document.createElement('button');
    continueBtn.className = 'btn-primary wizard-continue';
    continueBtn.textContent = 'Continue \u2192';
    continueBtn.addEventListener('click', () => {
      if (!engine) return;
      engine.continueToNext();
      renderCurrentNode(container);
    });
    content.appendChild(continueBtn);
  }
}

// -------------------------------------------------------------------
// Result Node
// -------------------------------------------------------------------

function renderResultNode(content: HTMLElement, node: DecisionNode, _container: HTMLElement): void {
  // Urgency badge
  const badge = document.createElement('div');
  badge.className = 'result-badge';
  if (node.confidence === 'definitive') {
    badge.classList.add('badge-definitive');
  } else if (node.confidence === 'recommended') {
    badge.classList.add('badge-recommended');
  } else if (node.confidence === 'consider') {
    badge.classList.add('badge-consider');
  }
  badge.textContent = node.title;
  content.appendChild(badge);

  const body = document.createElement('div');
  body.className = 'wizard-body';
  renderBodyText(body, node.body);
  content.appendChild(body);

  // Images (e.g., ultrasound reference images on result cards)
  renderNodeImages(content, node);

  // Recommendation
  if (node.recommendation) {
    const rec = document.createElement('div');
    rec.className = 'result-recommendation';
    renderBodyText(rec, node.recommendation);
    content.appendChild(rec);
  }

  // Treatment regimen
  if (node.treatment) {
    renderTreatment(content, node.treatment);
  }

  // Expandable citations on result cards
  if (node.citation?.length && currentConfig) {
    renderInlineCitations(content, node.citation, currentConfig.citations);
  }

  // Full reference link
  const refLink = document.createElement('button');
  refLink.className = 'btn-text reference-link';
  refLink.textContent = '\uD83D\uDCCB Full Reference Tables';
  refLink.addEventListener('click', () => {
    
    router.navigate(`/reference/${currentTreeId}`);
  });
  content.appendChild(refLink);

  // Answer summary
  const history = engine?.getAnswerHistory();
  if (history && history.length > 0) {
    const summarySection = document.createElement('details');
    summarySection.className = 'result-summary';

    const summaryTitle = document.createElement('summary');
    summaryTitle.textContent = `Decision path (${history.length} steps)`;
    summarySection.appendChild(summaryTitle);

    const summaryList = document.createElement('div');
    summaryList.className = 'result-summary-list';
    for (const entry of history) {
      const item = document.createElement('div');
      item.className = 'result-summary-item';

      const q = document.createElement('span');
      q.className = 'summary-question';
      q.textContent = entry.nodeTitle;

      const a = document.createElement('span');
      a.className = 'summary-answer';
      a.textContent = entry.answer;

      item.appendChild(q);
      item.appendChild(a);
      summaryList.appendChild(item);
    }
    summarySection.appendChild(summaryList);
    content.appendChild(summarySection);
  }

  // Start Over button
  const actions = document.createElement('div');
  actions.className = 'result-actions';

  const restartBtn = document.createElement('button');
  restartBtn.className = 'btn-secondary';
  restartBtn.textContent = 'Start Over';
  restartBtn.addEventListener('click', () => {
    if (engine) engine.reset();
    
    const container = document.getElementById('main-content');
    if (container && currentTreeId) {
      container.innerHTML = '';
      renderTreeWizard(container, currentTreeId);
    }
  });

  const homeBtn = document.createElement('button');
  homeBtn.className = 'btn-text';
  homeBtn.textContent = '\u2190 All Categories';
  homeBtn.addEventListener('click', () => {
    if (engine) engine.reset();
    
    router.navigate('/');
  });

  actions.appendChild(restartBtn);
  actions.appendChild(homeBtn);
  content.appendChild(actions);
}

// -------------------------------------------------------------------
// Input Node (placeholder — CSF values etc.)
// -------------------------------------------------------------------

function renderInputNode(content: HTMLElement, node: DecisionNode, container: HTMLElement): void {
  // Render same as question for now — input fields come with Task 8 refinements
  renderQuestionNode(content, node, container);
}

// -------------------------------------------------------------------
// Treatment Display
// -------------------------------------------------------------------

function renderTreatment(container: HTMLElement, treatment: TreatmentRegimen): void {
  const section = document.createElement('div');
  section.className = 'treatment-section';

  const heading = document.createElement('h2');
  heading.className = 'treatment-heading';
  heading.textContent = 'Treatment';
  section.appendChild(heading);

  // First-line
  section.appendChild(renderDrugCard('First-Line', treatment.firstLine));

  // Alternative (expandable)
  if (treatment.alternative) {
    const altDetails = document.createElement('details');
    altDetails.className = 'treatment-expandable';
    const altSummary = document.createElement('summary');
    altSummary.textContent = '\u25B8 Alternative regimen';
    altDetails.appendChild(altSummary);
    altDetails.appendChild(renderDrugCard('Alternative', treatment.alternative));
    section.appendChild(altDetails);
  }

  // PCN allergy (expandable)
  if (treatment.pcnAllergy) {
    const pcnDetails = document.createElement('details');
    pcnDetails.className = 'treatment-expandable';
    const pcnSummary = document.createElement('summary');
    pcnSummary.textContent = '\u25B8 PCN allergy alternatives';
    pcnDetails.appendChild(pcnSummary);
    pcnDetails.appendChild(renderDrugCard('PCN Allergy', treatment.pcnAllergy));
    section.appendChild(pcnDetails);
  }

  // Monitoring (expandable)
  if (treatment.monitoring) {
    const monDetails = document.createElement('details');
    monDetails.className = 'treatment-expandable';
    const monSummary = document.createElement('summary');
    monSummary.textContent = '\u25B8 Follow-up monitoring';
    monDetails.appendChild(monSummary);
    const monBody = document.createElement('div');
    monBody.className = 'treatment-monitoring';
    renderBodyText(monBody, treatment.monitoring);
    monDetails.appendChild(monBody);
    section.appendChild(monDetails);
  }

  container.appendChild(section);
}

function renderDrugCard(_label: string, drug: { drug: string; dose: string; route: string; frequency: string; duration: string; notes?: string }): HTMLElement {
  const card = document.createElement('div');
  card.className = 'drug-regimen-card';

  const drugName = document.createElement('div');
  drugName.className = 'drug-regimen-name';
  const drugStoreId = findDrugIdByName(drug.drug);
  if (drugStoreId) {
    const drugLink = document.createElement('span');
    drugLink.className = 'body-inline-link';
    drugLink.textContent = drug.drug;
    drugLink.setAttribute('role', 'button');
    drugLink.setAttribute('tabindex', '0');
    drugLink.addEventListener('click', () => showDrugModal(drugStoreId));
    drugName.appendChild(drugLink);
  } else {
    drugName.textContent = drug.drug;
  }
  card.appendChild(drugName);

  const doseRow = document.createElement('div');
  doseRow.className = 'drug-regimen-dose';

  const doseSpan = document.createElement('span');
  doseSpan.className = 'dose-highlight';
  doseSpan.textContent = `${drug.dose} ${drug.route}`;
  doseRow.appendChild(doseSpan);
  card.appendChild(doseRow);

  const freqRow = document.createElement('div');
  freqRow.className = 'drug-regimen-detail';
  freqRow.textContent = `Frequency: ${drug.frequency}`;
  card.appendChild(freqRow);

  const durRow = document.createElement('div');
  durRow.className = 'drug-regimen-detail';
  durRow.textContent = `Duration: ${drug.duration}`;
  card.appendChild(durRow);

  if (drug.notes) {
    const notes = document.createElement('div');
    notes.className = 'drug-regimen-notes';
    renderBodyText(notes, drug.notes);
    card.appendChild(notes);
  }

  return card;
}

// -------------------------------------------------------------------
// Image Rendering
// -------------------------------------------------------------------

/** Render node images as responsive figures with optional captions */
function renderNodeImages(container: HTMLElement, node: DecisionNode): void {
  if (!node.images || node.images.length === 0) return;

  const gallery = document.createElement('div');
  gallery.className = 'wizard-images';

  for (const img of node.images) {
    const figure = document.createElement('figure');
    figure.className = 'wizard-image-figure';

    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.className = 'wizard-image';
    imgEl.loading = 'lazy';
    figure.appendChild(imgEl);

    if (img.caption) {
      const caption = document.createElement('figcaption');
      caption.className = 'wizard-image-caption';
      caption.textContent = img.caption;
      figure.appendChild(caption);
    }

    gallery.appendChild(figure);
  }

  container.appendChild(gallery);
}

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------

/** Render body text with line breaks preserved. Supports [text](#/info/id) and [text](#/drug/id) inline modal links. */
function renderBodyText(container: HTMLElement, text: string): void {
  const linkPattern = /\[([^\]]+)\]\(#\/(info|drug)\/([^)]+)\)/g;
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') {
      container.appendChild(document.createElement('br'));
    } else if (linkPattern.test(line)) {
      // Line contains inline link(s) — build DOM manually
      linkPattern.lastIndex = 0;
      const p = document.createElement('p');
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = linkPattern.exec(line)) !== null) {
        const linkLabel = match[1];
        const linkType = match[2]; // 'info' or 'drug'
        const linkId = match[3];
        // Text before the link
        if (match.index > lastIndex) {
          p.appendChild(document.createTextNode(line.slice(lastIndex, match.index)));
        }
        // The link — opens as modal overlay, stays in tree context
        const link = document.createElement('span');
        link.className = 'body-inline-link';
        link.textContent = linkLabel;
        link.setAttribute('role', 'button');
        link.setAttribute('tabindex', '0');
        if (linkType === 'drug') {
          link.addEventListener('click', () => showDrugModal(linkId));
        } else {
          link.addEventListener('click', () => showInfoModal(linkId));
        }
        p.appendChild(link);
        lastIndex = match.index + match[0].length;
      }
      // Text after the last link
      if (lastIndex < line.length) {
        p.appendChild(document.createTextNode(line.slice(lastIndex)));
      }
      container.appendChild(p);
    } else {
      const p = document.createElement('p');
      appendBoldAware(p, line);
      container.appendChild(p);
    }
  }
}

/** Append text to a parent element, converting **bold** markers to <strong> elements. */
function appendBoldAware(parent: HTMLElement, text: string): void {
  const boldPattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    const strong = document.createElement('strong');
    strong.textContent = match[1];
    parent.appendChild(strong);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parent.appendChild(document.createTextNode(text.slice(lastIndex)));
  } else if (lastIndex === 0) {
    parent.appendChild(document.createTextNode(text));
  }
}

/** Render "tree not available" state */
function renderUnavailable(container: HTMLElement, treeId: string): void {
  container.innerHTML = '';

  const backBtn = document.createElement('button');
  backBtn.className = 'btn-text';
  backBtn.textContent = '\u2190 Categories';
  backBtn.addEventListener('click', () => router.navigate('/'));
  container.appendChild(backBtn);

  const empty = document.createElement('div');
  empty.className = 'empty-state';

  const icon = document.createElement('div');
  icon.className = 'empty-state-icon';
  icon.textContent = '\uD83D\uDEA7';

  const title = document.createElement('h3');
  title.textContent = 'Coming Soon';

  const body = document.createElement('p');
  body.textContent = `Decision tree "${treeId}" is not yet available.`;

  empty.appendChild(icon);
  empty.appendChild(title);
  empty.appendChild(body);
  container.appendChild(empty);
}
