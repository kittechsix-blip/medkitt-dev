// MedKitt — Category Grid (Home Screen)
// Renders category cards with 3D PNG icons in alphabetical order.

import { getAllCategories, addCustomCategory } from '../data/categories.js';
import { getAllCalculators } from './calculator.js';
import { getAllDrugs } from '../data/drug-store.js';
import { router } from '../services/router.js';

/** Tool categories route to special pages instead of /category/{id} */
const TOOL_ROUTES: Record<string, { route: string; getCount: () => number; unit: string }> = {
  'pharmacy': { route: '/drugs', getCount: () => getAllDrugs().length, unit: 'drug' },
  'med-calc': { route: '/calculators', getCount: () => getAllCalculators().length, unit: 'tool' },
};

/** Render the category grid into the given container */
export function renderCategoryGrid(container: HTMLElement): void {
  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.textContent = 'Categories';
  heading.style.fontSize = '20px';
  heading.style.fontWeight = '600';
  heading.style.marginBottom = '16px';
  container.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'category-grid';

  const categories = getAllCategories();

  for (const cat of categories) {
    const toolInfo = TOOL_ROUTES[cat.id];
    if (toolInfo) {
      // Tool category — special route and count
      const count = toolInfo.getCount();
      const card = createCategoryCard(cat.icon, cat.name, cat.id, count, toolInfo.route, toolInfo.unit);
      grid.appendChild(card);
    } else {
      // Specialty category — standard /category/{id} route
      const card = createCategoryCard(cat.icon, cat.name, cat.id, cat.decisionTrees.length);
      grid.appendChild(card);
    }
  }

  // Add button
  const addCard = createAddCard();
  grid.appendChild(addCard);

  container.appendChild(grid);

  // Disclaimer
  const disclaimer = document.createElement('p');
  disclaimer.className = 'home-disclaimer';
  disclaimer.textContent = 'This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.';
  container.appendChild(disclaimer);
}

/** Create a single category card element */
function createCategoryCard(
  icon: string,
  name: string,
  id: string,
  count: number,
  route?: string,
  unit?: string,
): HTMLElement {
  const effectiveRoute = route || `/category/${id}`;
  const effectiveUnit = unit || 'consult';

  const card = document.createElement('a');
  card.className = 'category-card';
  card.href = '#' + effectiveRoute;
  card.setAttribute('role', 'link');
  card.setAttribute('aria-label', `${name} \u2014 ${count} ${effectiveUnit}${count !== 1 ? 's' : ''}`);

  if (count > 0) {
    card.classList.add('has-content');
  }

  card.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate(effectiveRoute);
  });

  // Icon — PNG image or emoji fallback (for custom categories)
  const iconEl = document.createElement('span');
  iconEl.className = 'category-icon';
  iconEl.setAttribute('aria-hidden', 'true');

  if (icon.endsWith('.png')) {
    const img = document.createElement('img');
    img.src = `assets/icons/${icon}`;
    img.alt = '';
    img.width = 80;
    img.height = 80;
    img.loading = 'lazy';
    iconEl.appendChild(img);
  } else {
    iconEl.textContent = icon;
  }

  const nameEl = document.createElement('span');
  nameEl.className = 'category-name';
  nameEl.textContent = name;

  card.appendChild(iconEl);
  card.appendChild(nameEl);

  if (count > 0) {
    const countEl = document.createElement('span');
    countEl.className = 'category-count';
    countEl.textContent = `${count} ${effectiveUnit}${count !== 1 ? 's' : ''}`;
    card.appendChild(countEl);
  }

  return card;
}

/** Create the "+ Add" card */
function createAddCard(): HTMLElement {
  const card = document.createElement('button');
  card.className = 'category-card category-card--add';
  card.setAttribute('aria-label', 'Add custom category');

  const iconEl = document.createElement('span');
  iconEl.className = 'category-icon';
  iconEl.setAttribute('aria-hidden', 'true');
  iconEl.textContent = '\u2795'; // ➕

  const nameEl = document.createElement('span');
  nameEl.className = 'category-name';
  nameEl.textContent = 'Add';

  card.appendChild(iconEl);
  card.appendChild(nameEl);

  card.addEventListener('click', () => {
    const name = prompt('Enter category name:');
    if (name && name.trim()) {
      addCustomCategory(name.trim());
      // Re-render the grid
      const main = document.getElementById('main-content');
      if (main) {
        renderCategoryGrid(main);
      }
    }
  });

  return card;
}
