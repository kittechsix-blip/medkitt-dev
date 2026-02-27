/**
 * PWA Install Hero Component for MedKitt
 * One-tap PWA install prompt with native app feel
 */

// TypeScript types for PWA install events
/**
 * @typedef {Event} BeforeInstallPromptEvent
 * @property {string[]} platforms
 * @property {Promise<{outcome: 'accepted' | 'dismissed', platform: string}>} userChoice
 * @property {Function} prompt
 */

class PWAInstallHero {
  /**
   * @param {string} containerId - The ID of the container element
   */
  constructor(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = container;
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.isDismissed = false;
    this.analytics = [];
    this.qrCodeUrl = '';

    // Check if already installed
    this.isInstalled = this.checkIfInstalled();

    // Generate QR code URL for mobile handoff
    this.qrCodeUrl = this.generateQRCodeUrl();

    // Initialize
    this.init();
  }

  init() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt.bind(this));

    // Listen for appinstalled event
    window.addEventListener('appinstalled', this.handleAppInstalled.bind(this));

    // Check if we should show the hero (not installed, not dismissed)
    this.checkDisplayState();

    // Track initial page view
    this.trackEvent('pwa_shown');
  }

  checkIfInstalled() {
    // Check if running as standalone PWA
    const displayMode = window.matchMedia('(display-mode: standalone)').matches;
    const navigatorStandalone = window.navigator.standalone === true;
    return displayMode || navigatorStandalone;
  }

  checkDisplayState() {
    // Check localStorage for dismissed state (respect user choice for 7 days)
    const dismissedAt = localStorage.getItem('medkitt_pwa_dismissed');
    if (dismissedAt) {
      const dismissedTime = parseInt(dismissedAt, 10);
      const sevenDays = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < sevenDays) {
        this.isDismissed = true;
      } else {
        localStorage.removeItem('medkitt_pwa_dismissed');
      }
    }

    // Render appropriate state
    if (this.isInstalled) {
      this.renderInstalledState();
    } else if (this.isDismissed) {
      this.renderMinimizedState();
    } else {
      this.renderHeroState();
    }
  }

  handleBeforeInstallPrompt(event) {
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();

    // Store the event for later use
    this.deferredPrompt = event;

    // Show the install hero if not already shown
    if (!this.isInstalled && !this.isDismissed) {
      this.renderHeroState();
    }
  }

  handleAppInstalled() {
    this.isInstalled = true;
    this.deferredPrompt = null;
    this.trackEvent('pwa_installed');
    this.renderInstalledState();

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('medkitt:pwa-installed'));
  }

  async handleInstallClick() {
    if (!this.deferredPrompt) {
      // If no deferred prompt (e.g., on iOS), show manual instructions
      this.showiOSInstructions();
      return;
    }

    this.trackEvent('pwa_install_clicked');

    // Show the install prompt
    await this.deferredPrompt.prompt();

    // Wait for user choice
    const choiceResult = await this.deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      this.trackEvent('pwa_install_accepted');
    } else {
      this.trackEvent('pwa_install_dismissed');
      this.handleDismiss();
    }

    // Clear the deferred prompt
    this.deferredPrompt = null;
  }

  handleDismiss() {
    this.isDismissed = true;
    localStorage.setItem('medkitt_pwa_dismissed', Date.now().toString());
    this.renderMinimizedState();
  }

  showiOSInstructions() {
    const modal = document.createElement('div');
    modal.className = 'pwa-ios-modal';
    modal.innerHTML = `
      <div class="pwa-ios-modal-overlay">
        <div class="pwa-ios-modal-content">
          <button class="pwa-ios-modal-close" aria-label="Close">&times;</button>
          <div class="pwa-ios-instructions">
            <div class="pwa-app-icon-preview">
              <div class="pwa-app-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="5" fill="#00d4aa"/>
                  <path d="M12 5L5 8.5L12 12L19 8.5L12 5Z" fill="#0f0f1a"/>
                  <path d="M5 14.5L12 18L19 14.5" stroke="#0f0f1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M5 11.5L12 15L19 11.5" stroke="#0f0f1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="pwa-app-name">MedKitt</span>
            </div>
            <h3>Add to Home Screen</h3>
            <p>Install MedKitt on your iPhone for quick access to clinical consults.</p>
            <div class="pwa-ios-steps">
              <div class="pwa-ios-step">
                <span class="step-number">1</span>
                <span class="step-text">Tap the <strong>Share</strong> button in Safari</span>
                <svg class="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M8 12V4m0 0L4 8m4-4l4 4m-4 8v4m0 0l-4-4m4 4l4-4"/>
                </svg>
              </div>
              <div class="pwa-ios-step">
                <span class="step-number">2</span>
                <span class="step-text">Scroll down and tap <strong>Add to Home Screen</strong></span>
                <svg class="step-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M12 8v8m-4-4h8"/>
                </svg>
              </div>
              <div class="pwa-ios-step">
                <span class="step-number">3</span>
                <span class="step-text">Tap <strong>Add</strong> in the top right</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    requestAnimationFrame(() => {
      modal.classList.add('visible');
    });

    // Close handlers
    const closeBtn = modal.querySelector('.pwa-ios-modal-close');
    const overlay = modal.querySelector('.pwa-ios-modal-overlay');

    const closeModal = () => {
      modal.classList.remove('visible');
      setTimeout(() => modal.remove(), 300);
    };

    closeBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  renderHeroState() {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    this.container.innerHTML = `
      <div class="pwa-install-hero">
        <div class="pwa-hero-content">
          <div class="pwa-app-preview">
            <div class="pwa-app-icon-shadow"></div>
            <div class="pwa-app-icon-large">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="5" fill="#00d4aa"/>
                <path d="M12 5L5 8.5L12 12L19 8.5L12 5Z" fill="#0f0f1a"/>
                <path d="M5 14.5L12 18L19 14.5" stroke="#0f0f1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M5 11.5L12 15L19 11.5" stroke="#0f0f1a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="pwa-icon-label">
              <span class="pwa-icon-label-text">MedKitt</span>
            </div>
          </div>

          <div class="pwa-hero-text">
            <h2 class="pwa-hero-title">Get MedKitt on Your Home Screen</h2>
            <p class="pwa-hero-subtitle">One-tap access to AI clinical consults. Works offline. Feels like a native app.</p>

            <div class="pwa-features">
              <div class="pwa-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                <span>Instant Access</span>
              </div>
              <div class="pwa-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/>
                  <path d="M2 12h20"/>
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
                <span>Works Offline</span>
              </div>
              <div class="pwa-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                <span>Privacy-First Design</span>
              </div>
            </div>
          </div>
        </div>

        <div class="pwa-hero-actions">
          <button class="pwa-install-btn ${!this.deferredPrompt && isMobile ? 'pwa-install-btn-ios' : ''}" id="pwa-install-btn">
            <div class="pwa-install-btn-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" x="2" y="2" rx="4" fill="#00d4aa"/>
                <path d="M12 7v6m0 0v6m0-6h6m-6 0H6" stroke="#0f0f1a" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="pwa-install-btn-text">
              ${!this.deferredPrompt && isMobile ? 'Add to Home Screen' : 'Install MedKitt App'}
            </span>
            <span class="pwa-install-btn-subtext">
              ${!this.deferredPrompt && isMobile ? 'Tap to see how' : 'Free • One tap install'}
            </span>
          </button>

          ${!isMobile ? `
            <div class="pwa-qr-section">
              <p class="pwa-qr-label">Or scan to install on your phone:</p>
              <div class="pwa-qr-code">
                <img src="${this.qrCodeUrl}" alt="Scan to install MedKitt" width="120" height="120"/>
              </div>
              <p class="pwa-qr-hint">Point your camera at the code</p>
            </div>
          ` : ''}

          <button class="pwa-dismiss-btn" id="pwa-dismiss-btn">
            Maybe later
          </button>
        </div>

        <button class="pwa-close-hero" id="pwa-close-hero" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    `;

    this.attachEventListeners();
  }

  renderMinimizedState() {
    this.container.innerHTML = `
      <div class="pwa-install-minimized">
        <button class="pwa-minimized-btn" id="pwa-restore-btn" aria-label="Install MedKitt app">
          <div class="pwa-minimized-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="20" height="20" x="2" y="2" rx="4" fill="#00d4aa"/>
              <path d="M12 7v6m0 0v6m0-6h6m-6 0H6" stroke="#0f0f1a" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <span class="pwa-minimized-text">Get the app</span>
        </button>
      </div>
    `;

    const restoreBtn = document.getElementById('pwa-restore-btn');
    restoreBtn?.addEventListener('click', () => {
      this.isDismissed = false;
      localStorage.removeItem('medkitt_pwa_dismissed');
      this.renderHeroState();
    });
  }

  renderInstalledState() {
    this.container.innerHTML = `
      <div class="pwa-install-installed">
        <div class="pwa-installed-content">
          <div class="pwa-installed-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#00d4aa" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div class="pwa-installed-text">
            <span class="pwa-installed-title">MedKitt is installed!</span>
            <span class="pwa-installed-subtitle">Look for the app on your home screen</span>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const installBtn = document.getElementById('pwa-install-btn');
    const dismissBtn = document.getElementById('pwa-dismiss-btn');
    const closeBtn = document.getElementById('pwa-close-hero');

    installBtn?.addEventListener('click', () => this.handleInstallClick());
    dismissBtn?.addEventListener('click', () => this.handleDismiss());
    closeBtn?.addEventListener('click', () => this.handleDismiss());
  }

  generateQRCodeUrl() {
    // Generate a QR code URL using a free service
    const appUrl = encodeURIComponent('https://kittechsix-blip.github.io/medkitt-dev/');
    return `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${appUrl}&color=00d4aa&bgcolor=0f0f1a`;
  }

  trackEvent(event) {
    const analyticsData = {
      event,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      isStandalone: this.checkIfInstalled()
    };

    this.analytics.push(analyticsData);

    // Store in localStorage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('medkitt_pwa_analytics') || '[]');
      existing.push(analyticsData);
      localStorage.setItem('medkitt_pwa_analytics', JSON.stringify(existing.slice(-100))); // Keep last 100 events
    } catch (e) {
      // Ignore storage errors
    }

    // Dispatch custom event for external tracking (e.g., Google Analytics)
    window.dispatchEvent(new CustomEvent('medkitt:pwa-analytics', {
      detail: analyticsData
    }));

    // Console log for debugging
    console.log('[MedKitt PWA]', event, analyticsData);
  }

  // Public API methods
  getAnalytics() {
    return [...this.analytics];
  }

  isInstallable() {
    return !!this.deferredPrompt && !this.isInstalled;
  }

  show() {
    this.isDismissed = false;
    localStorage.removeItem('medkitt_pwa_dismissed');
    this.renderHeroState();
  }

  hide() {
    this.handleDismiss();
  }

  destroy() {
    window.removeEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt.bind(this));
    window.removeEventListener('appinstalled', this.handleAppInstalled.bind(this));
    this.container.innerHTML = '';
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PWAInstallHero };
}

// Make available globally
window.PWAInstallHero = PWAInstallHero;

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
  const heroContainer = document.getElementById('pwa-install-hero');
  if (heroContainer) {
    new PWAInstallHero('pwa-install-hero');
  }
});
