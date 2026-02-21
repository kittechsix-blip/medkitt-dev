// MedKitt — Category Grid (Home Screen)
// Renders the 23 EM categories + Add button as a tappable grid.
import { getAllCategories, addCustomCategory } from '../data/categories.js';
import { getAllCalculators } from './calculator.js';
import { getAllDrugs } from '../data/drug-store.js';
import { router } from '../services/router.js';
/** Render the category grid into the given container */
export function renderCategoryGrid(container) {
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
    // Drug Reference card
    const drugCount = getAllDrugs().length;
    const drugCard = createToolCard('\uD83D\uDC8A', 'Drug Reference', '/drugs', drugCount, 'drug');
    grid.appendChild(drugCard);
    // Medical Calculators card
    const calcCount = getAllCalculators().length;
    const calcCard = createToolCard('\uD83E\uDDEE', 'Medical Calculators', '/calculators', calcCount, 'tool');
    grid.appendChild(calcCard);
    // Add button
    const addCard = createAddCard();
    grid.appendChild(addCard);
    container.appendChild(grid);
}
/** Create a single category card element */
function createCategoryCard(icon, name, id, treeCount) {
    const card = document.createElement('a');
    card.className = 'category-card';
    card.href = `#/category/${id}`;
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', `${name} — ${treeCount} consult${treeCount !== 1 ? 's' : ''}`);
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
        countEl.textContent = `${treeCount} consult${treeCount !== 1 ? 's' : ''}`;
        card.appendChild(countEl);
    }
    return card;
}
/** Create a tool category card (Drug Reference, Medical Calculators, etc.) */
function createToolCard(icon, label, route, count, unit) {
    const card = document.createElement('a');
    card.className = 'category-card';
    if (count > 0)
        card.classList.add('has-content');
    card.href = '#' + route;
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', `${label} \u2014 ${count} ${unit}${count !== 1 ? 's' : ''}`);
    card.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(route);
    });
    const iconEl = document.createElement('span');
    iconEl.className = 'category-icon';
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = icon;
    const nameEl = document.createElement('span');
    nameEl.className = 'category-name';
    nameEl.textContent = label;
    card.appendChild(iconEl);
    card.appendChild(nameEl);
    if (count > 0) {
        const countEl = document.createElement('span');
        countEl.className = 'category-count';
        countEl.textContent = `${count} ${unit}${count !== 1 ? 's' : ''}`;
        card.appendChild(countEl);
    }
    return card;
}
/** Create the "+ Add" card */
function createAddCard() {
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
