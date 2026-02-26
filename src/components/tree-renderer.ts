/**
 * TreeRenderer Component
 * Renders MedKitt consult decision trees with interactive reference links
 */

import type { ConsultTree, TreeNode, Reference } from '../types/consult-tree';
import { ReferenceLink, ReferenceLinkOptions, renderContentWithReferences } from './reference-link';

export interface TreeRendererOptions {
  /** Container element ID */
  containerId: string;
  /** Callback when a node is selected/clicked */
  onNodeSelect?: (node: TreeNode) => void;
  /** Callback when a reference is viewed */
  onViewReference?: (reference: Reference) => void;
  /** Custom CSS class for the tree */
  customClass?: string;
  /** Reference link options */
  referenceOptions?: ReferenceLinkOptions;
  /** Whether to show the references section at the bottom */
  showReferencesSection?: boolean;
  /** Theme colors */
  theme?: {
    background?: string;
    cardBg?: string;
    accent?: string;
    text?: string;
    textMuted?: string;
    border?: string;
    warning?: string;
    success?: string;
  };
}

/**
 * TreeRenderer class for rendering consult decision trees
 */
export class TreeRenderer {
  private tree: ConsultTree;
  private options: TreeRendererOptions;
  private container: HTMLElement;
  private currentNode: TreeNode | null = null;
  private nodeHistory: TreeNode[] = [];

  constructor(tree: ConsultTree, options: TreeRendererOptions) {
    this.tree = tree;
    this.options = {
      showReferencesSection: true,
      theme: {
        background: '#0f0f1a',
        cardBg: '#1a1a2e',
        accent: '#00d4aa',
        text: '#ffffff',
        textMuted: '#a0a0b0',
        border: '#2a2a45',
        warning: '#ff6b6b',
        success: '#00d4aa',
        ...options.theme
      },
      ...options
    };

    const container = document.getElementById(options.containerId);
    if (!container) {
      throw new Error(`Container with id "${options.containerId}" not found`);
    }
    this.container = container;
    this.currentNode = tree.root;
    this.nodeHistory = [tree.root];

    this.render();
  }

  /**
   * Render the complete tree interface
   */
  private render(): void {
    const { background, text } = this.options.theme!;

    this.container.innerHTML = '';
    this.container.className = `consult-tree ${this.options.customClass || ''}`;
    this.container.style.cssText = `
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: ${background};
      color: ${text};
      max-width: 800px;
      margin: 0 auto;
    `;

    // Header with consult title
    this.container.appendChild(this.renderHeader());

    // Progress indicator
    this.container.appendChild(this.renderProgress());

    // Current node content
    if (this.currentNode) {
      this.container.appendChild(this.renderNode(this.currentNode));
    }

    // References section
    if (this.options.showReferencesSection) {
      this.container.appendChild(this.renderReferencesSection());
    }
  }

  /**
   * Render the consult header
   */
  private renderHeader(): HTMLElement {
    const { cardBg, accent, text, textMuted, border } = this.options.theme!;

    const header = document.createElement('div');
    header.className = 'consult-header';
    header.style.cssText = `
      padding: 24px;
      background: ${cardBg};
      border: 1px solid ${border};
      border-radius: 16px;
      margin-bottom: 16px;
    `;

    // Category badge
    const category = document.createElement('div');
    category.style.cssText = `
      display: inline-block;
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: ${accent};
      background: ${accent}20;
      border-radius: 20px;
      margin-bottom: 12px;
    `;
    category.textContent = this.tree.category;
    header.appendChild(category);

    // Title
    const title = document.createElement('h1');
    title.style.cssText = `
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 700;
      color: ${text};
      line-height: 1.3;
    `;
    title.textContent = this.tree.title;
    header.appendChild(title);

    // Description
    const description = document.createElement('p');
    description.style.cssText = `
      margin: 0 0 12px 0;
      font-size: 15px;
      color: ${textMuted};
      line-height: 1.5;
    `;
    description.textContent = this.tree.description;
    header.appendChild(description);

    // Meta info
    const meta = document.createElement('div');
    meta.style.cssText = `
      display: flex;
      gap: 16px;
      font-size: 12px;
      color: ${textMuted};
    `;
    meta.innerHTML = `
      <span>Version ${this.tree.version}</span>
      <span>•</span>
      <span>Updated ${new Date(this.tree.lastUpdated).toLocaleDateString()}</span>
    `;
    header.appendChild(meta);

    return header;
  }

  /**
   * Render progress indicator
   */
  private renderProgress(): HTMLElement {
    const { cardBg, accent, border } = this.options.theme!;

    const progress = document.createElement('div');
    progress.className = 'consult-progress';
    progress.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: ${cardBg};
      border: 1px solid ${border};
      border-radius: 12px;
      margin-bottom: 16px;
    `;

    // Back button (if not at root)
    if (this.nodeHistory.length > 1) {
      const backBtn = document.createElement('button');
      backBtn.innerHTML = '← Back';
      backBtn.style.cssText = `
        padding: 6px 12px;
        font-size: 13px;
        font-weight: 500;
        color: ${accent};
        background: transparent;
        border: 1px solid ${accent}40;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
      `;
      backBtn.addEventListener('click', () => this.goBack());
      backBtn.addEventListener('mouseenter', () => {
        backBtn.style.background = `${accent}20`;
      });
      backBtn.addEventListener('mouseleave', () => {
        backBtn.style.background = 'transparent';
      });
      progress.appendChild(backBtn);

      const divider = document.createElement('span');
      divider.textContent = '|';
      divider.style.color = border;
      progress.appendChild(divider);
    }

    // Breadcrumb
    const breadcrumb = document.createElement('div');
    breadcrumb.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      flex: 1;
    `;

    this.nodeHistory.forEach((node, index) => {
      if (index > 0) {
        const sep = document.createElement('span');
        sep.textContent = '›';
        sep.style.color = border;
        breadcrumb.appendChild(sep);
      }

      const step = document.createElement('span');
      step.textContent = node.title;
      if (index === this.nodeHistory.length - 1) {
        step.style.color = accent;
        step.style.fontWeight = '600';
      } else {
        step.style.color = this.options.theme!.textMuted;
      }
      breadcrumb.appendChild(step);
    });

    progress.appendChild(breadcrumb);

    // Step counter
    const counter = document.createElement('span');
    counter.style.cssText = `
      font-size: 12px;
      color: ${this.options.theme!.textMuted};
      padding: 4px 10px;
      background: ${this.options.theme!.background};
      border-radius: 12px;
    `;
    counter.textContent = `Step ${this.nodeHistory.length}`;
    progress.appendChild(counter);

    return progress;
  }

  /**
   * Render a single node
   */
  private renderNode(node: TreeNode): HTMLElement {
    const { cardBg, accent, text, textMuted, border, warning, success } = this.options.theme!;

    const nodeEl = document.createElement('div');
    nodeEl.className = `consult-node consult-node-${node.type || 'info'}`;
    nodeEl.style.cssText = `
      padding: 24px;
      background: ${cardBg};
      border: 1px solid ${border};
      border-radius: 16px;
      margin-bottom: 16px;
    `;

    // Node type indicator
    if (node.type) {
      const typeColors: Record<string, string> = {
        info: accent,
        decision: '#3498db',
        warning: warning,
        success: success,
        treatment: '#9b59b6',
        diagnostic: '#f39c12'
      };

      const typeIndicator = document.createElement('div');
      typeIndicator.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: ${typeColors[node.type] || accent};
        background: ${typeColors[node.type]}20;
        border-radius: 6px;
        margin-bottom: 16px;
      `;
      
      const icons: Record<string, string> = {
        info: 'ℹ️',
        decision: '🔀',
        warning: '⚠️',
        success: '✓',
        treatment: '💊',
        diagnostic: '🔬'
      };
      
      typeIndicator.textContent = `${icons[node.type] || '•'} ${node.type}`;
      nodeEl.appendChild(typeIndicator);
    }

    // Node title
    const title = document.createElement('h2');
    title.style.cssText = `
      margin: 0 0 16px 0;
      font-size: 20px;
      font-weight: 600;
      color: ${text};
      line-height: 1.4;
    `;
    title.textContent = node.title;
    nodeEl.appendChild(title);

    // Node content with reference links
    const content = document.createElement('div');
    content.className = 'node-content';
    content.style.cssText = `
      font-size: 15px;
      line-height: 1.7;
      color: ${textMuted};
      margin-bottom: 24px;
    `;

    // Render content with reference links
    renderContentWithReferences(
      node.content,
      this.tree.references,
      content,
      {
        ...this.options.referenceOptions,
        onViewSource: (url) => {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      }
    );

    nodeEl.appendChild(content);

    // Priority indicator if applicable
    if (node.metadata?.priority) {
      const priorityColors: Record<string, string> = {
        low: '#3498db',
        medium: '#f39c12',
        high: '#e74c3c',
        critical: '#ff0000'
      };

      const priority = document.createElement('div');
      priority.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        margin-bottom: 20px;
        font-size: 13px;
        font-weight: 500;
        color: ${priorityColors[node.metadata.priority]};
        background: ${priorityColors[node.metadata.priority]}15;
        border: 1px solid ${priorityColors[node.metadata.priority]}40;
        border-radius: 8px;
      `;
      priority.innerHTML = `
        <span>⚡</span>
        <span>${node.metadata.priority.toUpperCase()} PRIORITY</span>
      `;
      nodeEl.insertBefore(priority, content);
    }

    // Children/Choices
    if (node.children && node.children.length > 0) {
      const choices = document.createElement('div');
      choices.className = 'node-choices';
      choices.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 12px;
      `;

      node.children.forEach((child, index) => {
        const choiceBtn = document.createElement('button');
        choiceBtn.className = 'choice-button';
        choiceBtn.style.cssText = `
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          font-size: 15px;
          font-weight: 500;
          text-align: left;
          color: ${text};
          background: ${this.options.theme!.background};
          border: 1px solid ${border};
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        `;

        // Choice number
        const number = document.createElement('span');
        number.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          font-size: 14px;
          font-weight: 700;
          color: ${accent};
          background: ${accent}20;
          border-radius: 50%;
          flex-shrink: 0;
        `;
        number.textContent = String.fromCharCode(65 + index); // A, B, C...
        choiceBtn.appendChild(number);

        // Choice text
        const choiceText = document.createElement('span');
        choiceText.style.flex = '1';
        choiceText.textContent = child.title;
        choiceBtn.appendChild(choiceText);

        // Arrow
        const arrow = document.createElement('span');
        arrow.textContent = '→';
        arrow.style.color = accent;
        arrow.style.fontSize = '18px';
        choiceBtn.appendChild(arrow);

        // Hover effects
        choiceBtn.addEventListener('mouseenter', () => {
          choiceBtn.style.borderColor = accent;
          choiceBtn.style.background = `${accent}10`;
          choiceBtn.style.transform = 'translateX(4px)';
        });

        choiceBtn.addEventListener('mouseleave', () => {
          choiceBtn.style.borderColor = border;
          choiceBtn.style.background = this.options.theme!.background;
          choiceBtn.style.transform = 'translateX(0)';
        });

        // Click handler
        choiceBtn.addEventListener('click', () => {
          this.selectNode(child);
        });

        choices.appendChild(choiceBtn);
      });

      nodeEl.appendChild(choices);
    }

    // Tags if any
    if (node.metadata?.tags && node.metadata.tags.length > 0) {
      const tags = document.createElement('div');
      tags.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid ${border};
      `;

      node.metadata.tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.style.cssText = `
          padding: 4px 10px;
          font-size: 11px;
          color: ${textMuted};
          background: ${this.options.theme!.background};
          border: 1px solid ${border};
          border-radius: 4px;
        `;
        tagEl.textContent = tag;
        tags.appendChild(tagEl);
      });

      nodeEl.appendChild(tags);
    }

    return nodeEl;
  }

  /**
   * Render the references section
   */
  private renderReferencesSection(): HTMLElement {
    const { cardBg, accent, text, textMuted, border } = this.options.theme!;

    const section = document.createElement('div');
    section.className = 'references-section';
    section.style.cssText = `
      padding: 24px;
      background: ${cardBg};
      border: 1px solid ${border};
      border-radius: 16px;
      margin-top: 24px;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 1px solid ${border};
    `;
    header.innerHTML = `
      <span style="font-size: 20px;">📚</span>
      <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: ${text};">References</h3>
      <span style="margin-left: auto; padding: 4px 10px; font-size: 12px; color: ${textMuted}; background: ${this.options.theme!.background}; border-radius: 12px;">${this.tree.references.length} sources</span>
    `;
    section.appendChild(header);

    // References list
    const list = document.createElement('div');
    list.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 16px;
    `;

    this.tree.references.forEach(ref => {
      const refItem = document.createElement('div');
      refItem.className = 'reference-item';
      refItem.style.cssText = `
        display: flex;
        gap: 12px;
        padding: 16px;
        background: ${this.options.theme!.background};
        border: 1px solid ${border};
        border-radius: 10px;
        transition: all 0.2s ease;
      `;

      refItem.addEventListener('mouseenter', () => {
        refItem.style.borderColor = accent;
        refItem.style.transform = 'translateX(4px)';
      });

      refItem.addEventListener('mouseleave', () => {
        refItem.style.borderColor = border;
        refItem.style.transform = 'translateX(0)';
      });

      // Reference number
      const num = document.createElement('span');
      num.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        font-size: 13px;
        font-weight: 700;
        color: ${this.options.theme!.background};
        background: ${accent};
        border-radius: 50%;
        flex-shrink: 0;
      `;
      num.textContent = ref.id.toString();
      refItem.appendChild(num);

      // Reference content
      const content = document.createElement('div');
      content.style.cssText = `
        flex: 1;
        min-width: 0;
      `;

      // Title
      const title = document.createElement('div');
      title.style.cssText = `
        margin-bottom: 6px;
        font-size: 14px;
        font-weight: 500;
        color: ${text};
        line-height: 1.4;
      `;
      title.textContent = ref.title;
      content.appendChild(title);

      // Authors
      if (ref.authors) {
        const authors = document.createElement('div');
        authors.style.cssText = `
          margin-bottom: 4px;
          font-size: 12px;
          color: ${textMuted};
        `;
        authors.textContent = ref.authors;
        content.appendChild(authors);
      }

      // Source and year
      const source = document.createElement('div');
      source.style.cssText = `
        font-size: 12px;
        color: ${accent};
        font-weight: 500;
      `;
      source.textContent = `${ref.source} • ${ref.year}`;
      content.appendChild(source);

      refItem.appendChild(content);

      // View button
      if (ref.url) {
        const viewBtn = document.createElement('a');
        viewBtn.href = ref.url;
        viewBtn.target = '_blank';
        viewBtn.rel = 'noopener noreferrer';
        viewBtn.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          color: ${accent};
          background: ${accent}20;
          border-radius: 8px;
          text-decoration: none;
          flex-shrink: 0;
          transition: all 0.2s ease;
        `;
        viewBtn.innerHTML = '↗';
        viewBtn.title = 'View source';

        viewBtn.addEventListener('mouseenter', () => {
          viewBtn.style.background = accent;
          viewBtn.style.color = this.options.theme!.background;
        });

        viewBtn.addEventListener('mouseleave', () => {
          viewBtn.style.background = `${accent}20`;
          viewBtn.style.color = accent;
        });

        refItem.appendChild(viewBtn);
      }

      list.appendChild(refItem);
    });

    section.appendChild(list);

    return section;
  }

  /**
   * Navigate to a child node
   */
  private selectNode(node: TreeNode): void {
    this.currentNode = node;
    this.nodeHistory.push(node);
    
    if (this.options.onNodeSelect) {
      this.options.onNodeSelect(node);
    }

    this.render();
  }

  /**
   * Go back to the previous node
   */
  private goBack(): void {
    if (this.nodeHistory.length > 1) {
      this.nodeHistory.pop();
      this.currentNode = this.nodeHistory[this.nodeHistory.length - 1];
      this.render();
    }
  }

  /**
   * Navigate to a specific node by ID
   */
  navigateToNode(nodeId: string): boolean {
    const findNode = (node: TreeNode): TreeNode | null => {
      if (node.id === nodeId) return node;
      if (node.children) {
        for (const child of node.children) {
          const found = findNode(child);
          if (found) return found;
        }
      }
      return null;
    };

    const target = findNode(this.tree.root);
    if (target) {
      this.currentNode = target;
      this.nodeHistory.push(target);
      this.render();
      return true;
    }
    return false;
  }

  /**
   * Reset to the root node
   */
  reset(): void {
    this.currentNode = this.tree.root;
    this.nodeHistory = [this.tree.root];
    this.render();
  }

  /**
   * Get current navigation history
   */
  getHistory(): TreeNode[] {
    return [...this.nodeHistory];
  }

  /**
   * Get the current node
   */
  getCurrentNode(): TreeNode | null {
    return this.currentNode;
  }

  /**
   * Update the tree data
   */
  updateTree(tree: ConsultTree): void {
    this.tree = tree;
    this.reset();
  }
}

/**
 * Render a consult tree to a container
 */
export function renderConsultTree(
  tree: ConsultTree,
  containerId: string,
  options?: Omit<TreeRendererOptions, 'containerId'>
): TreeRenderer {
  return new TreeRenderer(tree, {
    containerId,
    ...options
  });
}
