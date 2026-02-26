/**
 * PWA Install Hero Component
 * Shows a prominent install banner for the MedKitt PWA
 */

class PWAInstallHero extends HTMLElement {
  constructor() {
    super();
    this.deferredPrompt = null;
    this.isInstalled = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.checkInstallStatus();
  }

  render() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .pwa-hero {
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
          border-radius: 20px;
          padding: 2rem;
          margin: 1.5rem 0;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 212, 255, 0.15), 
                      0 0 0 1px rgba(0, 212, 255, 0.1);
        }
        
        .pwa-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .pwa-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .pwa-hero-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .pwa-hero-icon svg {
          width: 40px;
          height: 40px;
          color: white;
        }
        
        .pwa-hero-text {
          flex: 1;
          min-width: 200px;
        }
        
        .pwa-hero-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(90deg, #00d4ff, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .pwa-hero-subtitle {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.5;
        }
        
        .pwa-hero-features {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }
        
        .pwa-hero-feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
        }
        
        .pwa-hero-feature svg {
          width: 16px;
          height: 16px;
          color: #00d4ff;
        }
        
        .pwa-hero-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: stretch;
        }
        
        .pwa-install-btn {
          background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        }
        
        .pwa-install-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 212, 255, 0.4);
        }
        
        .pwa-install-btn:active {
          transform: translateY(0);
        }
        
        .pwa-install-btn svg {
          width: 20px;
          height: 20px;
        }
        
        .pwa-install-btn.installed {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
          cursor: default;
        }
        
        .pwa-dismiss-btn {
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          border: none;
          padding: 0.5rem;
          font-size: 0.85rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .pwa-dismiss-btn:hover {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .pwa-hero.hidden {
          display: none;
        }
        
        @media (max-width: 640px) {
          .pwa-hero {
            padding: 1.5rem;
          }
          
          .pwa-hero-content {
            flex-direction: column;
            text-align: center;
          }
          
          .pwa-hero-icon {
            width: 64px;
            height: 64px;
          }
          
          .pwa-hero-icon svg {
            width: 32px;
            height: 32px;
          }
          
          .pwa-hero-title {
            font-size: 1.25rem;
          }
          
          .pwa-hero-features {
            justify-content: center;
          }
          
          .pwa-hero-actions {
            width: 100%;
          }
        }
      </style>
      
      <div class="pwa-hero" id="pwa-hero">
        <div class="pwa-hero-content">
          <div class="pwa-hero-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          
          <div class="pwa-hero-text">
            <h2 class="pwa-hero-title">Install MedKitt App</h2>
            <p class="pwa-hero-subtitle">Get instant access to clinical decision tools, even offline. Install once, use anywhere.</p>
            <div class="pwa-hero-features">
              <span class="pwa-hero-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2v20M2 12h20"/>
                </svg>
                Works Offline
              </span>
              <span class="pwa-hero-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                Fast Access
              </span>
              <span class="pwa-hero-feature">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
                Secure & Private
              </span>
            </div>
          </div>
          
          <div class="pwa-hero-actions">
            <button class="pwa-install-btn" id="pwa-install-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Install Now
            </button>
            <button class="pwa-dismiss-btn" id="pwa-dismiss-btn">Maybe later</button>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.show();
    });

    // Install button click
    const installBtn = this.querySelector('#pwa-install-btn');
    if (installBtn) {
      installBtn.addEventListener('click', () => this.install());
    }

    // Dismiss button click
    const dismissBtn = this.querySelector('#pwa-dismiss-btn');
    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => this.dismiss());
    }

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.updateInstalledState();
      this.deferredPrompt = null;
    });
  }

  checkInstallStatus() {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      this.isInstalled = true;
      this.hide();
    }
  }

  async install() {
    if (!this.deferredPrompt) {
      // If no prompt available, show instructions
      this.showInstallInstructions();
      return;
    }

    // Show the install prompt
    this.deferredPrompt.prompt();
    
    // Wait for the user to respond
    const { outcome } = await this.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      this.isInstalled = true;
      this.updateInstalledState();
    } else {
      console.log('User dismissed the install prompt');
    }
    
    this.deferredPrompt = null;
  }

  updateInstalledState() {
    const btn = this.querySelector('#pwa-install-btn');
    if (btn) {
      btn.classList.add('installed');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        Installed
      `;
    }
    
    const dismissBtn = this.querySelector('#pwa-dismiss-btn');
    if (dismissBtn) {
      dismissBtn.style.display = 'none';
    }
  }

  showInstallInstructions() {
    // Show manual install instructions based on platform
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const message = isIOS 
      ? 'To install: Tap the Share button, then "Add to Home Screen"'
      : 'To install: Click the install icon in your browser address bar';
    
    alert(message);
  }

  dismiss() {
    this.hide();
    // Remember dismissal for 7 days
    const dismissUntil = Date.now() + (7 * 24 * 60 * 60 * 1000);
    localStorage.setItem('pwa-hero-dismissed', dismissUntil);
  }

  show() {
    // Check if recently dismissed
    const dismissed = localStorage.getItem('pwa-hero-dismissed');
    if (dismissed && Date.now() < parseInt(dismissed)) {
      return;
    }

    const hero = this.querySelector('#pwa-hero');
    if (hero) {
      hero.classList.remove('hidden');
    }
  }

  hide() {
    const hero = this.querySelector('#pwa-hero');
    if (hero) {
      hero.classList.add('hidden');
    }
  }
}

// Register the custom element
customElements.define('pwa-install-hero', PWAInstallHero);

export default PWAInstallHero;
