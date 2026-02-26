/**
 * ConsultNavigator Component for MedKitt
 * Breadcrumb + Progress Bar navigation for decision tree consults
 */

/**
 * @typedef {Object} PathStep
 * @property {string} nodeId
 * @property {string} question
 * @property {string} [answer]
 */

/**
 * @typedef {Object} ConsultNavigatorOptions
 * @property {Function} [onNavigate] - Callback when user clicks a breadcrumb to navigate back
 * @property {boolean} [showTimeEstimate] - Show estimated time remaining
 * @property {number} [avgTimePerStep] - Average time per step in seconds
 * @property {number} [totalSteps] - Total estimated steps in the consult
 * @property {Function} [labelFormatter] - Custom formatter for breadcrumb labels
 * @property {boolean} [debug] - Enable debug logging
 */

/**
 * @typedef {Object} ConsultNavigatorState
 * @property {PathStep[]} path
 * @property {number} currentStepIndex
 * @property {boolean} isCompleted
 */

const DEFAULT_OPTIONS = {
  onNavigate: () => {},
  showTimeEstimate: true,
  avgTimePerStep: 45,
  totalSteps: 10,
  labelFormatter: (step) => step.answer || step.question,
  debug: false
};

const STORAGE_KEY = 'medkitt_consult_nav_state';

class ConsultNavigator {
  /**
   * @param {string} containerId - The ID of the container element
   * @param {ConsultNavigatorOptions} [options={}] - Configuration options
   */
  constructor(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`ConsultNavigator: Container with id "${containerId}" not found`);
    }

    this.container = container;
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.state = {
      path: [],
      currentStepIndex: -1,
      isCompleted: false
    };

    this.init();
    this.log('ConsultNavigator initialized');
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.setupResizeObserver();
    this.loadState();
  }

  render() {
    this.container.innerHTML = `
      <nav class="consult-navigator" aria-label="Consult navigation">
        ${this.renderProgressBar()}
        ${this.renderBreadcrumbs()}
      </nav>
    `;

    this.breadcrumbContainer = this.container.querySelector('.consult-breadcrumbs');
    this.progressContainer = this.container.querySelector('.consult-progress');
  }

  renderProgressBar() {
    const progressPercent = this.calculateProgress();
    const currentStep = this.state.currentStepIndex + 1;
    const totalSteps = this.options.totalSteps;
    const timeEstimate = this.calculateTimeRemaining();

    return `
      <div class="consult-progress" role="region" aria-label="Progress">
        <div class="progress-header">
          <span class="progress-step" aria-live="polite">
            Step <strong>${currentStep}</strong> of ${totalSteps}
          </span>
          <span class="progress-percent">${Math.round(progressPercent)}%</span>
          ${this.options.showTimeEstimate && timeEstimate ? `
            <span class="progress-time" title="Estimated time remaining">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              ${timeEstimate}
            </span>
          ` : ''}
        </div>
        <div class="progress-bar-container" role="progressbar" 
             aria-valuenow="${progressPercent}" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar-track">
            <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
          </div>
          <div class="progress-steps">
            ${this.renderProgressSteps()}
          </div>
        </div>
      </div>
    `;
  }

  renderProgressSteps() {
    const totalSteps = this.options.totalSteps;
    const currentStep = this.state.currentStepIndex;

    return Array.from({ length: totalSteps }, (_, i) => {
      const isCompleted = i <= currentStep;
      const isCurrent = i === currentStep;

      return `
        <div class="progress-step-dot ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}"
             data-step="${i}" aria-label="Step ${i + 1}${isCompleted ? ' completed' : ''}${isCurrent ? ', current' : ''}">
          ${isCompleted ? `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          ` : i + 1}
        </div>
      `;
    }).join('');
  }

  renderBreadcrumbs() {
    if (this.state.path.length === 0) {
      return `<div class="consult-breadcrumbs empty" aria-label="Breadcrumb navigation"></div>`;
    }

    const breadcrumbs = this.state.path.map((step, index) => {
      const isLast = index === this.state.currentStepIndex;
      const isPast = index < this.state.currentStepIndex;
      const label = this.options.labelFormatter(step, index);

      return `
        <li class="breadcrumb-item ${isLast ? 'current' : ''} ${isPast ? 'past' : ''}"
            data-index="${index}" 
            ${isPast ? 'tabindex="0" role="button" aria-label="Go back to: ' + this.escapeHtml(label) + '"' : ''}>
          ${isPast ? `
            <button class="breadcrumb-link" data-index="${index}">
              <span class="breadcrumb-label">${this.escapeHtml(label)}</span>
            </button>
          ` : `
            <span class="breadcrumb-label" aria-current="step">${this.escapeHtml(label)}</span>
          `}
        </li>
      `;
    }).join(`
      <li class="breadcrumb-separator" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9,18 15,12 9,6"/>
        </svg>
      </li>
    `);

    return `
      <div class="consult-breadcrumbs" aria-label="Breadcrumb navigation">
        <button class="breadcrumb-home" 
                data-index="-1" 
                aria-label="Go to start"
                title="Start over">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
        </button>
        <ul class="breadcrumb-list">
          ${breadcrumbs}
        </ul>
        <button class="breadcrumb-overflow" aria-label="Show all steps" style="display: none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="1"/>
            <circle cx="19" cy="12" r="1"/>
            <circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>
    `;
  }

  attachEventListeners() {
    // Breadcrumb navigation clicks
    this.container.addEventListener('click', (e) => {
      const target = e.target;
      const breadcrumbLink = target.closest('.breadcrumb-link, .breadcrumb-home');

      if (breadcrumbLink) {
        const index = parseInt(breadcrumbLink.getAttribute('data-index') || '-1', 10);
        this.navigateToStep(index);
      }
    });

    // Keyboard navigation for breadcrumbs
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        if (target.classList.contains('breadcrumb-item') && target.classList.contains('past')) {
          e.preventDefault();
          const index = parseInt(target.getAttribute('data-index') || '-1', 10);
          this.navigateToStep(index);
        }
      }
    });

    // Progress step dots
    this.container.addEventListener('click', (e) => {
      const target = e.target;
      const stepDot = target.closest('.progress-step-dot');

      if (stepDot) {
        const stepIndex = parseInt(stepDot.getAttribute('data-step') || '-1', 10);
        if (stepIndex <= this.state.currentStepIndex) {
          this.navigateToStep(stepIndex);
        }
      }
    });
  }

  setupResizeObserver() {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => {
        this.handleResize();
      });
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener('resize', () => this.handleResize());
    }
  }

  handleResize() {
    this.truncateBreadcrumbsIfNeeded();
  }

  /**
   * Navigate to a specific step in the consult
   * @param {number} stepIndex
   */
  navigateToStep(stepIndex) {
    if (stepIndex < -1 || stepIndex >= this.state.path.length) {
      this.log('Invalid navigation attempt:', stepIndex);
      return;
    }

    this.log('Navigating to step:', stepIndex);

    if (stepIndex === -1) {
      this.state.path = [];
      this.state.currentStepIndex = -1;
    } else {
      this.state.path = this.state.path.slice(0, stepIndex + 1);
      this.state.currentStepIndex = stepIndex;
    }

    this.state.isCompleted = false;
    this.saveState();
    this.refresh();
    this.options.onNavigate(stepIndex);
    this.dispatchNavigateEvent(stepIndex);
  }

  /**
   * Add a new step to the path
   * @param {PathStep} step
   */
  addStep(step) {
    this.log('Adding step:', step);
    this.state.path = this.state.path.slice(0, this.state.currentStepIndex + 1);
    this.state.path.push(step);
    this.state.currentStepIndex = this.state.path.length - 1;
    this.state.isCompleted = false;
    this.saveState();
    this.refresh();
  }

  /**
   * Mark the consult as completed
   */
  complete() {
    this.log('Consult completed');
    this.state.isCompleted = true;
    this.saveState();
    this.refresh();
    this.dispatchCompleteEvent();
  }

  /**
   * Get the current navigation state
   * @returns {ConsultNavigatorState}
   */
  getState() {
    return { ...this.state };
  }

  /**
   * Set the entire path
   * @param {PathStep[]} path
   * @param {number} [currentIndex]
   */
  setPath(path, currentIndex) {
    this.log('Setting path:', path, 'currentIndex:', currentIndex);
    this.state.path = [...path];
    this.state.currentStepIndex = currentIndex !== undefined ? currentIndex : path.length - 1;
    this.state.isCompleted = false;
    this.saveState();
    this.refresh();
  }

  /**
   * Reset the navigator to initial state
   */
  reset() {
    this.log('Resetting navigator');
    this.state.path = [];
    this.state.currentStepIndex = -1;
    this.state.isCompleted = false;
    this.saveState();
    this.refresh();
  }

  refresh() {
    this.render();
    this.attachEventListeners();
    this.truncateBreadcrumbsIfNeeded();
  }

  truncateBreadcrumbsIfNeeded() {
    if (!this.breadcrumbContainer) return;

    const list = this.breadcrumbContainer.querySelector('.breadcrumb-list');
    const overflowBtn = this.breadcrumbContainer.querySelector('.breadcrumb-overflow');

    if (!list || !overflowBtn) return;

    list.style.maxHeight = '';
    overflowBtn.style.display = 'none';

    const containerWidth = this.breadcrumbContainer.offsetWidth;
    const listWidth = list.scrollWidth;

    if (listWidth > containerWidth - 100) {
      list.classList.add('truncated');

      const items = list.querySelectorAll('.breadcrumb-item');
      items.forEach((item, index) => {
        const isFirst = index === 0;
        const isCurrent = index === this.state.currentStepIndex;
        const isBeforeCurrent = index === this.state.currentStepIndex - 1;

        if (isFirst || isCurrent || isBeforeCurrent) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      const separators = list.querySelectorAll('.breadcrumb-separator');
      separators.forEach((sep, index) => {
        const nextItem = items[index + 1];
        if (nextItem && nextItem.classList.contains('hidden')) {
          sep.classList.add('hidden');
        }
      });

      overflowBtn.style.display = 'flex';
    } else {
      list.classList.remove('truncated');
      overflowBtn.style.display = 'none';
    }
  }

  calculateProgress() {
    if (this.state.isCompleted) return 100;
    if (this.state.currentStepIndex < 0) return 0;

    return Math.min(
      ((this.state.currentStepIndex + 1) / this.options.totalSteps) * 100,
      100
    );
  }

  calculateTimeRemaining() {
    if (this.state.isCompleted) return null;

    const remainingSteps = this.options.totalSteps - (this.state.currentStepIndex + 1);
    if (remainingSteps <= 0) return null;

    const totalSeconds = remainingSteps * this.options.avgTimePerStep;
    const minutes = Math.ceil(totalSeconds / 60);

    if (minutes < 1) return '< 1 min';
    if (minutes === 1) return '1 min';
    return `${minutes} mins`;
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      this.log('Failed to save state:', e);
    }
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.state = JSON.parse(saved);
        this.refresh();
        this.log('State restored from storage');
      }
    } catch (e) {
      this.log('Failed to load state:', e);
    }
  }

  dispatchNavigateEvent(stepIndex) {
    const event = new CustomEvent('medkitt:navigate', {
      detail: {
        stepIndex,
        path: this.state.path,
        timestamp: Date.now()
      }
    });
    window.dispatchEvent(event);
  }

  dispatchCompleteEvent() {
    const event = new CustomEvent('medkitt:complete', {
      detail: {
        path: this.state.path,
        totalSteps: this.state.path.length,
        timestamp: Date.now()
      }
    });
    window.dispatchEvent(event);
  }

  log(...args) {
    if (this.options.debug) {
      console.log('[ConsultNavigator]', ...args);
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Check if consult is at the start
   * @returns {boolean}
   */
  isAtStart() {
    return this.state.currentStepIndex === -1;
  }

  /**
   * Check if consult is completed
   * @returns {boolean}
   */
  isCompleted() {
    return this.state.isCompleted;
  }

  /**
   * Get current step data
   * @returns {PathStep|null}
   */
  getCurrentStep() {
    if (this.state.currentStepIndex < 0) return null;
    return this.state.path[this.state.currentStepIndex] || null;
  }

  /**
   * Get previous step data
   * @returns {PathStep|null}
   */
  getPreviousStep() {
    if (this.state.currentStepIndex < 1) return null;
    return this.state.path[this.state.currentStepIndex - 1] || null;
  }

  /**
   * Update options dynamically
   * @param {Partial<ConsultNavigatorOptions>} options
   */
  setOptions(options) {
    this.options = { ...this.options, ...options };
    this.refresh();
  }

  /**
   * Destroy the navigator and clean up
   */
  destroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', () => this.handleResize());
    this.container.innerHTML = '';
    this.log('Navigator destroyed');
  }
}

// ES module export
export { ConsultNavigator };

// Auto-initialize if DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const navContainers = document.querySelectorAll('[data-consult-navigator]');
  navContainers.forEach(container => {
    const id = container.id;
    if (id) {
      new ConsultNavigator(id);
    }
  });
});
