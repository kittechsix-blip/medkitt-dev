/**
 * Scrapling Pipeline Component
 * Data pipeline for scraping and processing clinical reference data
 */

class ScraplingPipeline extends HTMLElement {
  constructor() {
    super();
    this.status = 'idle';
    this.progress = 0;
    this.logs = [];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .pipeline-container {
          background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(0, 212, 255, 0.1);
        }
        
        .pipeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .pipeline-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0;
        }
        
        .pipeline-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
        }
        
        .pipeline-status.idle {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
        }
        
        .pipeline-status.running {
          background: rgba(0, 212, 255, 0.15);
          color: #00d4ff;
        }
        
        .pipeline-status.completed {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }
        
        .pipeline-status.error {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
        }
        
        .pipeline-status.running .status-dot {
          animation: pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .pipeline-progress {
          margin-bottom: 1rem;
        }
        
        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00d4ff, #8b5cf6);
          border-radius: 4px;
          transition: width 0.3s ease;
          width: 0%;
        }
        
        .progress-text {
          display: flex;
          justify-content: space-between;
          margin-top: 0.5rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .pipeline-stages {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        
        .stage {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }
        
        .stage.active {
          background: rgba(0, 212, 255, 0.1);
          border-color: rgba(0, 212, 255, 0.3);
        }
        
        .stage.completed {
          background: rgba(34, 197, 94, 0.1);
          border-color: rgba(34, 197, 94, 0.3);
        }
        
        .stage-icon {
          width: 32px;
          height: 32px;
          margin: 0 auto 0.5rem;
          color: rgba(255, 255, 255, 0.4);
        }
        
        .stage.active .stage-icon {
          color: #00d4ff;
        }
        
        .stage.completed .stage-icon {
          color: #22c55e;
        }
        
        .stage-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .stage.active .stage-name {
          color: #00d4ff;
        }
        
        .stage.completed .stage-name {
          color: #22c55e;
        }
        
        .pipeline-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 0.75rem 1.25rem;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%);
          color: white;
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
        }
        
        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .btn-secondary:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .pipeline-logs {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          max-height: 200px;
          overflow-y: auto;
          font-family: 'Fira Code', 'Monaco', monospace;
          font-size: 0.8rem;
        }
        
        .log-entry {
          padding: 0.25rem 0;
          color: rgba(255, 255, 255, 0.7);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .log-entry:last-child {
          border-bottom: none;
        }
        
        .log-time {
          color: #00d4ff;
          margin-right: 0.5rem;
        }
        
        .log-info { color: #00d4ff; }
        .log-success { color: #22c55e; }
        .log-error { color: #ef4444; }
        .log-warn { color: #f59e0b; }
      </style>
      
      <div class="pipeline-container">
        <div class="pipeline-header">
          <h3 class="pipeline-title">Scrapling Pipeline</h3>
          <span class="pipeline-status idle" id="status-badge">
            <span class="status-dot"></span>
            <span id="status-text">Idle</span>
          </span>
        </div>
        
        <div class="pipeline-progress">
          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>
          <div class="progress-text">
            <span id="progress-label">Ready to start</span>
            <span id="progress-percent">0%</span>
          </div>
        </div>
        
        <div class="pipeline-stages">
          <div class="stage" id="stage-fetch" data-stage="fetch">
            <svg class="stage-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <div class="stage-name">Fetch</div>
          </div>
          <div class="stage" id="stage-parse" data-stage="parse">
            <svg class="stage-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="stage-name">Parse</div>
          </div>
          <div class="stage" id="stage-transform" data-stage="transform">
            <svg class="stage-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            <div class="stage-name">Transform</div>
          </div>
          <div class="stage" id="stage-validate" data-stage="validate">
            <svg class="stage-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v14c0 .552.448 1 1 1h7"/>
            </svg>
            <div class="stage-name">Validate</div>
          </div>
          <div class="stage" id="stage-store" data-stage="store">
            <svg class="stage-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <ellipse cx="12" cy="5" rx="9" ry="3"/>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
            <div class="stage-name">Store</div>
          </div>
        </div>
        
        <div class="pipeline-actions">
          <button class="btn btn-primary" id="btn-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Start Pipeline
          </button>
          <button class="btn btn-secondary" id="btn-stop" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="6" y="6" width="12" height="12" rx="2"/>
            </svg>
            Stop
          </button>
          <button class="btn btn-secondary" id="btn-clear">
            Clear Logs
          </button>
        </div>
        
        <div class="pipeline-logs" id="pipeline-logs"></div>
      </div>
    `;
  }

  setupEventListeners() {
    const startBtn = this.querySelector('#btn-start');
    const stopBtn = this.querySelector('#btn-stop');
    const clearBtn = this.querySelector('#btn-clear');

    startBtn?.addEventListener('click', () => this.start());
    stopBtn?.addEventListener('click', () => this.stop());
    clearBtn?.addEventListener('click', () => this.clearLogs());
  }

  start() {
    if (this.status === 'running') return;
    
    this.status = 'running';
    this.progress = 0;
    this.updateStatus();
    this.log('Pipeline started', 'info');
    
    // Simulate pipeline stages
    this.runStage('fetch', 20, () => {
      this.runStage('parse', 40, () => {
        this.runStage('transform', 60, () => {
          this.runStage('validate', 80, () => {
            this.runStage('store', 100, () => {
              this.complete();
            });
          });
        });
      });
    });
  }

  runStage(stageName, targetProgress, callback) {
    const stage = this.querySelector(`#stage-${stageName}`);
    stage?.classList.add('active');
    this.log(`Starting ${stageName} stage...`, 'info');

    const interval = setInterval(() => {
      this.progress += 2;
      this.updateProgress();

      if (this.progress >= targetProgress) {
        clearInterval(interval);
        stage?.classList.remove('active');
        stage?.classList.add('completed');
        this.log(`${stageName} stage completed`, 'success');
        callback();
      }
    }, 100);
  }

  stop() {
    this.status = 'idle';
    this.updateStatus();
    this.log('Pipeline stopped by user', 'warn');
  }

  complete() {
    this.status = 'completed';
    this.updateStatus();
    this.log('Pipeline completed successfully!', 'success');
  }

  updateStatus() {
    const badge = this.querySelector('#status-badge');
    const text = this.querySelector('#status-text');
    const startBtn = this.querySelector('#btn-start');
    const stopBtn = this.querySelector('#btn-stop');

    badge?.classList.remove('idle', 'running', 'completed', 'error');
    badge?.classList.add(this.status);
    
    if (text) {
      text.textContent = this.status;
    }

    if (startBtn) {
      startBtn.disabled = this.status === 'running';
    }
    if (stopBtn) {
      stopBtn.disabled = this.status !== 'running';
    }
  }

  updateProgress() {
    const fill = this.querySelector('#progress-fill');
    const percent = this.querySelector('#progress-percent');
    const label = this.querySelector('#progress-label');

    if (fill) {
      fill.style.width = `${this.progress}%`;
    }
    if (percent) {
      percent.textContent = `${this.progress}%`;
    }
    if (label) {
      label.textContent = this.status === 'running' ? 'Processing...' : 'Ready to start';
    }
  }

  log(message, level = 'info') {
    const logs = this.querySelector('#pipeline-logs');
    const time = new Date().toLocaleTimeString();
    
    const entry = document.createElement('div');
    entry.className = `log-entry log-${level}`;
    entry.innerHTML = `<span class="log-time">[${time}]</span> ${message}`;
    
    logs?.appendChild(entry);
    logs?.scrollTo(0, logs.scrollHeight);
  }

  clearLogs() {
    const logs = this.querySelector('#pipeline-logs');
    if (logs) {
      logs.innerHTML = '';
    }
  }
}

// Register the custom element
customElements.define('scrapling-pipeline', ScraplingPipeline);

export default ScraplingPipeline;
