// EM Decision Trees — Flowchart Mini-Map
// Module progress bar + path trace overlay for tree navigation.

import { TreeEngine } from '../services/tree-engine.js';
import type { DecisionNode } from '../models/types.js';

let overlayEl: HTMLElement | null = null;
let currentEngine: TreeEngine | null = null;
let onJumpCallback: (() => void) | null = null;
let currentModuleLabels: string[] = [];

/** Create or update the flowchart overlay. Call on every node change. */
export function updateFlowchart(engine: TreeEngine, onJump: () => void, moduleLabels?: string[]): void {
  currentEngine = engine;
  onJumpCallback = onJump;
  if (moduleLabels) currentModuleLabels = moduleLabels;

  if (overlayEl && overlayEl.classList.contains('active')) {
    renderFlowchartContent();
  }
}

/** Show the flowchart overlay */
export function showFlowchart(): void {
  if (!overlayEl) {
    createOverlay();
  }
  renderFlowchartContent();
  overlayEl!.classList.add('active');
}

/** Hide the flowchart overlay */
export function hideFlowchart(): void {
  overlayEl?.classList.remove('active');
}

/** Clean up the overlay element */
export function destroyFlowchart(): void {
  overlayEl?.remove();
  overlayEl = null;
}

// -------------------------------------------------------------------
// Overlay Shell
// -------------------------------------------------------------------

function createOverlay(): void {
  overlayEl = document.createElement('div');
  overlayEl.className = 'modal-overlay flowchart-overlay';

  // Close on backdrop click
  overlayEl.addEventListener('click', (e) => {
    if (e.target === overlayEl) hideFlowchart();
  });

  document.body.appendChild(overlayEl);
}

function renderFlowchartContent(): void {
  if (!overlayEl || !currentEngine) return;

  overlayEl.innerHTML = '';

  const panel = document.createElement('div');
  panel.className = 'modal-content flowchart-panel';

  // Header
  const header = document.createElement('div');
  header.className = 'modal-header';

  const title = document.createElement('h3');
  title.textContent = 'Decision Map';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'btn-text';
  closeBtn.textContent = '\u2715';
  closeBtn.addEventListener('click', hideFlowchart);

  header.appendChild(title);
  header.appendChild(closeBtn);
  panel.appendChild(header);

  // Body
  const body = document.createElement('div');
  body.className = 'modal-body flowchart-body';

  renderModuleProgress(body);
  renderPathTrace(body);

  panel.appendChild(body);
  overlayEl.appendChild(panel);
}

// -------------------------------------------------------------------
// Module Progress Bar
// -------------------------------------------------------------------

function renderModuleProgress(container: HTMLElement): void {
  if (!currentEngine) return;

  const session = currentEngine.getSession();
  const currentModule = currentEngine.getCurrentModule() ?? 1;

  // Determine completed modules from history
  const visitedModules = new Set<number>();
  if (session) {
    for (const nodeId of session.history) {
      const node = currentEngine.getNode(nodeId);
      if (node) visitedModules.add(node.module);
    }
  }
  visitedModules.add(currentModule);

  const modulesBar = document.createElement('div');
  modulesBar.className = 'flowchart-modules';

  const totalModules = currentEngine?.getTotalModules() ?? currentModuleLabels.length;

  for (let i = 1; i <= totalModules; i++) {
    const moduleItem = document.createElement('div');
    moduleItem.className = 'flowchart-module-item';

    const dot = document.createElement('div');
    dot.className = 'flowchart-module-dot';

    if (i === currentModule) {
      dot.classList.add('current');
    } else if (i < currentModule && visitedModules.has(i)) {
      dot.classList.add('completed');
    } else {
      dot.classList.add('upcoming');
    }

    const label = document.createElement('span');
    label.className = 'flowchart-module-label';
    label.textContent = currentModuleLabels[i - 1] ?? `Module ${i}`;

    moduleItem.appendChild(dot);
    moduleItem.appendChild(label);
    modulesBar.appendChild(moduleItem);

    // Connector line between dots
    if (i < totalModules) {
      const connector = document.createElement('div');
      connector.className = 'flowchart-module-connector';
      if (i < currentModule) {
        connector.classList.add('completed');
      }
      modulesBar.appendChild(connector);
    }
  }

  container.appendChild(modulesBar);
}

// -------------------------------------------------------------------
// Path Trace
// -------------------------------------------------------------------

function renderPathTrace(container: HTMLElement): void {
  if (!currentEngine) return;

  const session = currentEngine.getSession();
  if (!session) return;

  const pathSection = document.createElement('div');
  pathSection.className = 'flowchart-path';

  const pathTitle = document.createElement('div');
  pathTitle.className = 'flowchart-path-title';
  pathTitle.textContent = 'Your path';
  pathSection.appendChild(pathTitle);

  // Visited nodes from history
  for (let i = 0; i < session.history.length; i++) {
    const nodeId = session.history[i];
    const node = currentEngine.getNode(nodeId);
    if (!node) continue;

    const answer = session.answers[nodeId];
    // Skip info nodes that don't have answers (they were just "Continue" clicks)
    const displayAnswer = answer !== undefined ? String(answer) : null;

    const pathNode = createPathNode(node, displayAnswer, 'visited', i);
    pathSection.appendChild(pathNode);
  }

  // Current node
  const currentNode = currentEngine.getCurrentNode();
  if (currentNode) {
    const pathNode = createPathNode(currentNode, null, 'current', -1);
    pathSection.appendChild(pathNode);

    // Show upcoming options as dimmed branches
    if (currentNode.options) {
      const branches = document.createElement('div');
      branches.className = 'flowchart-branches';

      for (const opt of currentNode.options) {
        const branch = document.createElement('div');
        branch.className = 'flowchart-branch';
        branch.textContent = opt.label;
        branches.appendChild(branch);
      }

      pathSection.appendChild(branches);
    } else if (currentNode.next) {
      const branches = document.createElement('div');
      branches.className = 'flowchart-branches';
      const nextNode = currentEngine.getNode(currentNode.next);
      if (nextNode) {
        const branch = document.createElement('div');
        branch.className = 'flowchart-branch';
        branch.textContent = nextNode.title;
        branches.appendChild(branch);
      }
      pathSection.appendChild(branches);
    }
  }

  container.appendChild(pathSection);
}

function createPathNode(
  node: DecisionNode,
  answer: string | null,
  status: 'visited' | 'current',
  historyIndex: number
): HTMLElement {
  const el = document.createElement('div');
  el.className = `flowchart-path-node ${status}`;

  // Type indicator
  const typeIcon = document.createElement('span');
  typeIcon.className = 'flowchart-node-type';
  switch (node.type) {
    case 'question': typeIcon.textContent = '\u25CF'; break;  // filled circle
    case 'info':     typeIcon.textContent = '\u25CB'; break;  // open circle
    case 'result':   typeIcon.textContent = '\u25A0'; break;  // filled square
    case 'input':    typeIcon.textContent = '\u25C6'; break;  // diamond
  }

  const textWrap = document.createElement('div');
  textWrap.className = 'flowchart-node-text';

  const titleEl = document.createElement('div');
  titleEl.className = 'flowchart-node-title';
  titleEl.textContent = node.title;
  textWrap.appendChild(titleEl);

  if (answer) {
    const answerEl = document.createElement('div');
    answerEl.className = 'flowchart-node-answer';
    answerEl.textContent = answer;
    textWrap.appendChild(answerEl);
  }

  if (status === 'current') {
    const badge = document.createElement('span');
    badge.className = 'flowchart-current-badge';
    badge.textContent = 'NOW';
    textWrap.appendChild(badge);
  }

  el.appendChild(typeIcon);
  el.appendChild(textWrap);

  // Tappable: jump back to this node
  if (status === 'visited' && historyIndex >= 0) {
    el.classList.add('tappable');
    el.addEventListener('click', () => {
      if (!currentEngine) return;
      currentEngine.jumpToHistory(historyIndex);
      hideFlowchart();
      if (onJumpCallback) onJumpCallback();
    });
  }

  return el;
}
