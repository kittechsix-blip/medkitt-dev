/**
 * Breadcrumb Navigation Component
 * Provides hierarchical navigation for the MedKitt app
 */

class BreadcrumbNav extends HTMLElement {
  constructor() {
    super();
    this.items = [];
  }

  static get observedAttributes() {
    return ['items'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    
    // Parse items from attribute if provided
    const itemsAttr = this.getAttribute('items');
    if (itemsAttr) {
      try {
        this.items = JSON.parse(itemsAttr);
        this.update();
      } catch (e) {
        console.error('Invalid breadcrumb items:', e);
      }
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'items' && newValue) {
      try {
        this.items = JSON.parse(newValue);
        this.update();
      } catch (e) {
        console.error('Invalid breadcrumb items:', e);
      }
    }
  }

  render() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
        }
        
        .breadcrumb {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          background: rgba(15, 15, 26, 0.6);
          border-radius: 12px;
          margin: 1rem 0;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 212, 255, 0.1);
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .breadcrumb::-webkit-scrollbar {
          display: none;
        }
        
        .breadcrumb-list {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          flex-wrap: nowrap;
        }
        
        .breadcrumb-item {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        
        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        
        .breadcrumb-link:hover {
          color: #00d4ff;
          background: rgba(0, 212, 255, 0.1);
        }
        
        .breadcrumb-link svg {
          width: 16px;
          height: 16px;
        }
        
        .breadcrumb-item:last-child .breadcrumb-link {
          color: #ffffff;
          font-weight: 600;
          background: linear-gradient(90deg, rgba(0, 212, 255, 0.15), rgba(139, 92, 246, 0.15));
          border: 1px solid rgba(0, 212, 255, 0.2);
        }
        
        .breadcrumb-item:last-child .breadcrumb-link:hover {
          color: #00d4ff;
        }
        
        .breadcrumb-separator {
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          color: rgba(255, 255, 255, 0.3);
        }
        
        .breadcrumb-separator svg {
          width: 16px;
          height: 16px;
        }
        
        .breadcrumb-home {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(0, 212, 255, 0.1);
          color: #00d4ff;
          transition: all 0.2s ease;
        }
        
        .breadcrumb-home:hover {
          background: rgba(0, 212, 255, 0.2);
          transform: translateY(-1px);
        }
        
        .breadcrumb-home svg {
          width: 18px;
          height: 18px;
        }
        
        /* Compact mode */
        .breadcrumb.compact {
          padding: 0.5rem 0.75rem;
        }
        
        .breadcrumb.compact .breadcrumb-link {
          padding: 0.375rem 0.5rem;
          font-size: 0.85rem;
        }
        
        /* Back button mode for mobile */
        .breadcrumb-back {
          display: none;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          color: #00d4ff;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          background: rgba(0, 212, 255, 0.1);
          transition: all 0.2s ease;
        }
        
        .breadcrumb-back:hover {
          background: rgba(0, 212, 255, 0.2);
        }
        
        .breadcrumb-back svg {
          width: 18px;
          height: 18px;
        }
        
        @media (max-width: 480px) {
          .breadcrumb-list {
            display: none;
          }
          
          .breadcrumb-back {
            display: flex;
          }
          
          .breadcrumb {
            padding: 0.5rem;
            background: transparent;
            border: none;
          }
        }
      </style>
      
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol class="breadcrumb-list" id="breadcrumb-list">
          <li class="breadcrumb-item">
            <a href="#/" class="breadcrumb-home" title="Home">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </a>
          </li>
        </ol>
        <a href="#" class="breadcrumb-back" id="breadcrumb-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </a>
      </nav>
    `;
  }

  setupEventListeners() {
    // Back button
    const backBtn = this.querySelector('#breadcrumb-back');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigateBack();
      });
    }
  }

  setItems(items) {
    this.items = items;
    this.update();
  }

  update() {
    const list = this.querySelector('#breadcrumb-list');
    const backBtn = this.querySelector('#breadcrumb-back');
    
    if (!list) return;

    // Clear existing items (keep home)
    const homeItem = list.querySelector('.breadcrumb-item:first-child');
    list.innerHTML = '';
    list.appendChild(homeItem);

    // Add items
    this.items.forEach((item, index) => {
      const isLast = index === this.items.length - 1;
      
      // Add separator
      const separator = document.createElement('li');
      separator.className = 'breadcrumb-separator';
      separator.setAttribute('aria-hidden', 'true');
      separator.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      `;
      list.appendChild(separator);

      // Add item
      const li = document.createElement('li');
      li.className = 'breadcrumb-item';
      
      if (isLast) {
        li.setAttribute('aria-current', 'page');
      }

      const link = document.createElement('a');
      link.href = item.href || '#';
      link.className = 'breadcrumb-link';
      
      if (item.icon) {
        link.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${item.icon}
          </svg>
          <span>${item.label}</span>
        `;
      } else {
        link.textContent = item.label;
      }

      if (!isLast) {
        link.addEventListener('click', (e) => {
          if (item.onClick) {
            e.preventDefault();
            item.onClick();
          }
        });
      }

      li.appendChild(link);
      list.appendChild(li);
    });

    // Update back button
    if (backBtn && this.items.length > 0) {
      const parentItem = this.items[this.items.length - 2];
      if (parentItem) {
        backBtn.href = parentItem.href || '#';
        backBtn.querySelector('span')?.remove();
        const span = document.createElement('span');
        span.textContent = parentItem.label;
        backBtn.appendChild(span);
      }
    }
  }

  navigateBack() {
    if (this.items.length > 1) {
      const parentItem = this.items[this.items.length - 2];
      if (parentItem && parentItem.onClick) {
        parentItem.onClick();
      } else if (parentItem && parentItem.href) {
        window.location.hash = parentItem.href;
      }
    } else {
      // Go home
      window.location.hash = '#/';
    }
  }

  // Helper method to build breadcrumb from route
  static fromRoute(route, titleMap = {}) {
    const parts = route.replace(/^#\//, '').split('/').filter(Boolean);
    const items = [];
    let currentPath = '#/';

    parts.forEach((part, index) => {
      currentPath += part + '/';
      const label = titleMap[part] || part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
      
      items.push({
        label,
        href: currentPath,
        onClick: index === parts.length - 1 ? null : () => {
          window.location.hash = currentPath;
        }
      });
    });

    return items;
  }
}

// Register the custom element
customElements.define('breadcrumb-nav', BreadcrumbNav);

export default BreadcrumbNav;
