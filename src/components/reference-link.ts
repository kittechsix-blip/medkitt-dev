/**
 * ReferenceLink Component
 * Renders clickable, expandable citation numbers for MedKitt consults
 * 
 * Usage:
 *   const refLink = new ReferenceLink(reference, {
 *     onExpand: (ref) => console.log('Expanded:', ref),
 *     onViewSource: (url) => window.open(url, '_blank')
 *   });
 *   element.appendChild(refLink.render());
 */

import type { Reference, ReferenceLinkState } from '../types/consult-tree';

export interface ReferenceLinkOptions {
  /** Called when a reference is expanded */
  onExpand?: (reference: Reference) => void;
  /** Called when "View Source" is clicked */
  onViewSource?: (url: string) => void;
  /** Initial expanded state */
  initiallyExpanded?: boolean;
  /** Custom theme colors */
  theme?: {
    accent?: string;
    background?: string;
    text?: string;
    border?: string;
  };
}

/**
 * ReferenceLink component class
 * Manages the rendering and interaction of individual reference links
 */
export class ReferenceLink {
  private reference: Reference;
  private options: ReferenceLinkOptions;
  private state: ReferenceLinkState;
  private element: HTMLElement | null = null;
  private expandedContent: HTMLElement | null = null;

  constructor(reference: Reference, options: ReferenceLinkOptions = {}) {
    this.reference = reference;
    this.options = {
      theme: {
        accent: '#00d4aa',
        background: '#0f0f1a',
        text: '#ffffff',
        border: '#2a2a45',
        ...options.theme
      },
      ...options
    };
    this.state = {
      expanded: options.initiallyExpanded || false,
      hoveredRefId: null
    };
  }

  /**
   * Render the reference link element
   */
  render(): HTMLElement {
    const container = document.createElement('span');
    container.className = 'reference-link-container';
    container.style.display = 'inline';

    // Create the citation number button
    const citationBtn = document.createElement('button');
    citationBtn.className = 'reference-citation';
    citationBtn.textContent = `[${this.reference.id}]`;
    citationBtn.setAttribute('aria-label', `Reference ${this.reference.id}: ${this.reference.title}`);
    citationBtn.setAttribute('data-ref-id', this.reference.id.toString());
    
    // Style the citation button
    this.styleCitationButton(citationBtn);
    
    // Add click handler
    citationBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleExpand();
    });

    container.appendChild(citationBtn);

    // Create expanded content (initially hidden)
    this.expandedContent = this.createExpandedContent();
    container.appendChild(this.expandedContent);

    this.element = container;
    return container;
  }

  /**
   * Style the citation button
   */
  private styleCitationButton(btn: HTMLButtonElement): void {
    const { accent, text } = this.options.theme!;
    
    btn.style.cssText = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 2px 6px;
      margin: 0 2px;
      font-size: 12px;
      font-weight: 600;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: ${accent};
      background: transparent;
      border: 1px solid ${accent};
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      vertical-align: super;
      line-height: 1;
    `;

    // Hover effects
    btn.addEventListener('mouseenter', () => {
      btn.style.background = `${accent}20`;
      btn.style.transform = 'translateY(-1px)';
    });

    btn.addEventListener('mouseleave', () => {
      if (!this.state.expanded) {
        btn.style.background = 'transparent';
      }
      btn.style.transform = 'translateY(0)';
    });

    // Focus styles for accessibility
    btn.addEventListener('focus', () => {
      btn.style.outline = `2px solid ${accent}`;
      btn.style.outlineOffset = '2px';
    });

    btn.addEventListener('blur', () => {
      btn.style.outline = 'none';
    });
  }

  /**
   * Create the expanded reference detail view
   */
  private createExpandedContent(): HTMLElement {
    const { accent, background, text, border } = this.options.theme!;
    
    const wrapper = document.createElement('span');
    wrapper.className = 'reference-expanded';
    wrapper.style.cssText = `
      display: none;
      position: absolute;
      z-index: 1000;
      max-width: 360px;
      margin-top: 8px;
      padding: 16px;
      background: ${background};
      border: 1px solid ${border};
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    `;

    // Arrow pointing to citation
    const arrow = document.createElement('div');
    arrow.style.cssText = `
      position: absolute;
      top: -6px;
      left: 20px;
      width: 12px;
      height: 12px;
      background: ${background};
      border-left: 1px solid ${border};
      border-top: 1px solid ${border};
      transform: rotate(45deg);
    `;
    wrapper.appendChild(arrow);

    // Reference number badge
    const badge = document.createElement('div');
    badge.style.cssText = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 700;
      color: ${background};
      background: ${accent};
      border-radius: 50%;
    `;
    badge.textContent = this.reference.id.toString();
    wrapper.appendChild(badge);

    // Title
    const title = document.createElement('div');
    title.style.cssText = `
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 600;
      color: ${text};
      line-height: 1.4;
    `;
    title.textContent = this.reference.title;
    wrapper.appendChild(title);

    // Authors (if available)
    if (this.reference.authors) {
      const authors = document.createElement('div');
      authors.style.cssText = `
        margin-bottom: 8px;
        font-size: 12px;
        color: ${text}99;
        line-height: 1.4;
      `;
      authors.textContent = this.reference.authors;
      wrapper.appendChild(authors);
    }

    // Source and year
    const source = document.createElement('div');
    source.style.cssText = `
      margin-bottom: 12px;
      font-size: 12px;
      color: ${accent};
      font-weight: 500;
    `;
    source.textContent = `${this.reference.source} • ${this.reference.year}`;
    wrapper.appendChild(source);

    // Divider
    const divider = document.createElement('div');
    divider.style.cssText = `
      height: 1px;
      margin: 12px 0;
      background: ${border};
    `;
    wrapper.appendChild(divider);

    // Action buttons
    const actions = document.createElement('div');
    actions.style.cssText = `
      display: flex;
      gap: 8px;
    `;

    // View Source button
    if (this.reference.url) {
      const viewBtn = document.createElement('button');
      viewBtn.className = 'reference-view-btn';
      viewBtn.textContent = 'View Source →';
      viewBtn.style.cssText = `
        flex: 1;
        padding: 10px 16px;
        font-size: 13px;
        font-weight: 600;
        font-family: inherit;
        color: ${background};
        background: ${accent};
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      `;
      
      viewBtn.addEventListener('mouseenter', () => {
        viewBtn.style.opacity = '0.9';
        viewBtn.style.transform = 'translateY(-1px)';
      });
      
      viewBtn.addEventListener('mouseleave', () => {
        viewBtn.style.opacity = '1';
        viewBtn.style.transform = 'translateY(0)';
      });

      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.reference.url && this.options.onViewSource) {
          this.options.onViewSource(this.reference.url);
        } else if (this.reference.url) {
          window.open(this.reference.url, '_blank', 'noopener,noreferrer');
        }
      });

      actions.appendChild(viewBtn);
    }

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'reference-close-btn';
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 500;
      font-family: inherit;
      color: ${text};
      background: transparent;
      border: 1px solid ${border};
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = `${border}80`;
    });
    
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'transparent';
    });

    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleExpand();
    });

    actions.appendChild(closeBtn);
    wrapper.appendChild(actions);

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (this.state.expanded && !wrapper.contains(e.target as Node)) {
        this.collapse();
      }
    });

    return wrapper;
  }

  /**
   * Toggle the expanded state
   */
  private toggleExpand(): void {
    if (this.state.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  /**
   * Expand the reference detail view
   */
  private expand(): void {
    if (!this.expandedContent) return;
    
    this.state.expanded = true;
    this.expandedContent.style.display = 'block';
    
    // Add animation
    this.expandedContent.style.opacity = '0';
    this.expandedContent.style.transform = 'translateY(-8px)';
    
    requestAnimationFrame(() => {
      if (this.expandedContent) {
        this.expandedContent.style.transition = 'all 0.2s ease';
        this.expandedContent.style.opacity = '1';
        this.expandedContent.style.transform = 'translateY(0)';
      }
    });

    if (this.options.onExpand) {
      this.options.onExpand(this.reference);
    }
  }

  /**
   * Collapse the reference detail view
   */
  private collapse(): void {
    if (!this.expandedContent) return;
    
    this.state.expanded = false;
    this.expandedContent.style.opacity = '0';
    this.expandedContent.style.transform = 'translateY(-8px)';
    
    setTimeout(() => {
      if (this.expandedContent && !this.state.expanded) {
        this.expandedContent.style.display = 'none';
      }
    }, 200);
  }

  /**
   * Update the reference data
   */
  updateReference(reference: Reference): void {
    this.reference = reference;
    // Re-render if needed
    if (this.element) {
      this.element.innerHTML = '';
      this.expandedContent = null;
      this.element.appendChild(this.render());
    }
  }

  /**
   * Get the current state
   */
  getState(): ReferenceLinkState {
    return { ...this.state };
  }

  /**
   * Check if the reference is currently expanded
   */
  isExpanded(): boolean {
    return this.state.expanded;
  }
}

/**
 * Parse content string with {{ref:N}} markers into segments
 */
export function parseContentWithReferences(content: string): Array<{ type: 'text' | 'reference'; content: string; refId?: number }> {
  const segments: Array<{ type: 'text' | 'reference'; content: string; refId?: number }> = [];
  const regex = /\{\{ref:(\d+)\}\}/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    // Add text before the reference
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: content.slice(lastIndex, match.index)
      });
    }

    // Add the reference
    segments.push({
      type: 'reference',
      content: match[0],
      refId: parseInt(match[1], 10)
    });

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    segments.push({
      type: 'text',
      content: content.slice(lastIndex)
    });
  }

  return segments;
}

/**
 * Render content with reference links
 */
export function renderContentWithReferences(
  content: string,
  references: Reference[],
  container: HTMLElement,
  options?: ReferenceLinkOptions
): void {
  const segments = parseContentWithReferences(content);
  const refMap = new Map(references.map(r => [r.id, r]));

  container.innerHTML = '';

  segments.forEach(segment => {
    if (segment.type === 'text') {
      const textNode = document.createTextNode(segment.content);
      container.appendChild(textNode);
    } else if (segment.type === 'reference' && segment.refId) {
      const ref = refMap.get(segment.refId);
      if (ref) {
        const refLink = new ReferenceLink(ref, options);
        container.appendChild(refLink.render());
      } else {
        // Reference not found, show as plain text
        const textNode = document.createTextNode(`[${segment.refId}]`);
        container.appendChild(textNode);
      }
    }
  });
}
