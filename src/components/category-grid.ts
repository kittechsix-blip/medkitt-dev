// EM Decision Trees — Category Grid (Home Screen)
// Renders the 23 EM categories + Add button as a tappable grid.

import { getAllCategories, addCustomCategory } from '../data/categories.js';
import { router } from '../services/router.js';

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
    const card = createCategoryCard(cat.icon, cat.name, cat.id, cat.decisionTrees.length);
    grid.appendChild(card);
  }

  // Add button
  const addCard = createAddCard();
  grid.appendChild(addCard);

  container.appendChild(grid);
}

/** Create a single category card element */
function createCategoryCard(icon: string, name: string, id: string, treeCount: number): HTMLElement {
  const card = document.createElement('a');
  card.className = 'category-card';
  card.href = `#/category/${id}`;
  card.setAttribute('role', 'link');
  card.setAttribute('aria-label', `${name} — ${treeCount} decision tree${treeCount !== 1 ? 's' : ''}`);

  if (treeCount > 0) {
    card.classList.add('has-content');
  }

  // Prevent default and use router for cleaner navigation
  card.addEventListener('click', (e) => {
    e.preventDefault();
    router.navigate(`/category/${id}`);
  });

  const iconEl = document.createElement('span');
  iconEl.className = 'category-icon';
  iconEl.setAttribute('aria-hidden', 'true');
  iconEl.textContent = icon;

  const nameEl = document.createElement('span');
  nameEl.className = 'category-name';
  nameEl.textContent = name;

  card.appendChild(iconEl);
  card.appendChild(nameEl);

  if (treeCount > 0) {
    const countEl = document.createElement('span');
    countEl.className = 'category-count';
    countEl.textContent = `${treeCount} tree${treeCount !== 1 ? 's' : ''}`;
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
