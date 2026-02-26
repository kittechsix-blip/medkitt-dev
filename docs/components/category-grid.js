// MedKitt — Category Grid (Home Screen)
// Renders category cards with 3D PNG icons in alphabetical order + global search.
import { getAllCategories, addCustomCategory } from '../data/categories.js';
import { getAllCalculators } from './calculator.js';
import { getAllDrugs } from '../data/drug-store.js';
import { showDrugModal } from './drug-store.js';
import { router } from '../services/router.js';
/** Tool categories route to special pages instead of /category/{id} */
const TOOL_ROUTES = {
    'pharmacy': { route: '/drugs', getCount: () => getAllDrugs().length, unit: 'drug' },
    'med-calc': { route: '/calculators', getCount: () => getAllCalculators().length, unit: 'tool' },
};
/** Render the category grid into the given container */
export function renderCategoryGrid(container) {
    container.innerHTML = '';
    // Heading row with search
    const headingRow = document.createElement('div');
    headingRow.className = 'home-heading-row';
    const heading = document.createElement('h2');
    heading.textContent = 'Categories';
    heading.style.fontSize = '20px';
    heading.style.fontWeight = '600';
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'home-search-input';
    searchInput.placeholder = 'Search\u2026';
    searchInput.setAttribute('aria-label', 'Search categories, consults, drugs, and calculators');
    headingRow.appendChild(heading);
    headingRow.appendChild(searchInput);
    container.appendChild(headingRow);
    const grid = document.createElement('div');
    grid.className = 'category-grid';
    const categories = getAllCategories();
    for (const cat of categories) {
        const toolInfo = TOOL_ROUTES[cat.id];
        if (toolInfo) {
            const count = toolInfo.getCount();
            const card = createCategoryCard(cat.icon, cat.name, cat.id, count, toolInfo.route, toolInfo.unit);
            grid.appendChild(card);
        }
        else {
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
    // Search handler
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length === 0) {
            grid.style.display = '';
            disclaimer.style.display = '';
            const existingResults = container.querySelector('.search-results');
            if (existingResults)
                existingResults.remove();
            return;
        }
        grid.style.display = 'none';
        disclaimer.style.display = 'none';
        const existingResults = container.querySelector('.search-results');
        if (existingResults)
            existingResults.remove();
        const results = buildSearchResults(query);
        const resultsEl = renderSearchResults(results);
        container.appendChild(resultsEl);
    });
}
/** Create a single category card element */
function createCategoryCard(icon, name, id, count, route, unit) {
    const effectiveRoute = route || `/category/${id}`;
    const effectiveUnit = unit || 'consult';
    const card = document.createElement('a');
    card.className = 'category-card';
    card.href = '#' + effectiveRoute;
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', `${name} \u2014 ${count} ${effectiveUnit}${count !== 1 ? 's' : ''}`);
    card.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(effectiveRoute);
    });
    // Count badge — above icon (only when count > 0)
    if (count > 0) {
        const countEl = document.createElement('span');
        countEl.className = 'category-count';
        countEl.textContent = `${count} ${effectiveUnit}${count !== 1 ? 's' : ''}`;
        card.appendChild(countEl);
    }
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
    }
    else {
        iconEl.textContent = icon;
    }
    card.appendChild(iconEl);
    // Name — below icon
    const nameEl = document.createElement('span');
    nameEl.className = 'category-name';
    nameEl.textContent = name;
    card.appendChild(nameEl);
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
            const main = document.getElementById('main-content');
            if (main) {
                renderCategoryGrid(main);
            }
        }
    });
    return card;
}
function buildSearchResults(query) {
    const results = [];
    const categories = getAllCategories();
    const seenTreeIds = new Set();
    // Search categories
    for (const cat of categories) {
        if (cat.name.toLowerCase().includes(query)) {
            const toolInfo = TOOL_ROUTES[cat.id];
            const route = toolInfo ? toolInfo.route : `/category/${cat.id}`;
            results.push({
                type: 'category',
                label: cat.name,
                sublabel: `${cat.decisionTrees.length} consult${cat.decisionTrees.length !== 1 ? 's' : ''}`,
                route,
            });
        }
        // Search consults (deduplicated)
        for (const tree of cat.decisionTrees) {
            if (seenTreeIds.has(tree.id))
                continue;
            const normQuery = query.replace(/[-\s]/g, '');
            const normTitle = tree.title.toLowerCase().replace(/[-\s]/g, '');
            const normSubtitle = tree.subtitle.toLowerCase().replace(/[-\s]/g, '');
            if (tree.title.toLowerCase().includes(query) || tree.subtitle.toLowerCase().includes(query) || tree.id.toLowerCase().includes(query) || normTitle.includes(normQuery) || normSubtitle.includes(normQuery)) {
                seenTreeIds.add(tree.id);
                results.push({
                    type: 'consult',
                    label: tree.title,
                    sublabel: tree.subtitle,
                    route: `/tree/${tree.id}`,
                });
            }
        }
    }
    // Search drugs
    for (const drug of getAllDrugs()) {
        if (drug.name.toLowerCase().includes(query) ||
            drug.genericName.toLowerCase().includes(query) ||
            drug.drugClass.toLowerCase().includes(query)) {
            results.push({
                type: 'drug',
                label: drug.name,
                sublabel: drug.drugClass,
                route: '/drugs',
                drugId: drug.id,
            });
        }
    }
    // Search calculators
    for (const calc of getAllCalculators()) {
        if (calc.title.toLowerCase().includes(query) || calc.subtitle.toLowerCase().includes(query)) {
            results.push({
                type: 'calculator',
                label: calc.title,
                sublabel: calc.subtitle,
                route: `/calculator/${calc.id}`,
            });
        }
    }
    return results;
}
const TYPE_LABELS = {
    category: 'Categories',
    consult: 'Consults',
    drug: 'Drugs',
    calculator: 'Calculators',
};
function renderSearchResults(results) {
    const wrapper = document.createElement('div');
    wrapper.className = 'search-results';
    if (results.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'search-empty';
        empty.textContent = 'No results found.';
        wrapper.appendChild(empty);
        return wrapper;
    }
    // Group by type
    const grouped = {};
    for (const r of results) {
        if (!grouped[r.type])
            grouped[r.type] = [];
        grouped[r.type].push(r);
    }
    for (const type of ['category', 'consult', 'drug', 'calculator']) {
        const group = grouped[type];
        if (!group || group.length === 0)
            continue;
        const groupLabel = document.createElement('h3');
        groupLabel.className = 'search-group-label';
        groupLabel.textContent = TYPE_LABELS[type];
        wrapper.appendChild(groupLabel);
        for (const item of group) {
            const row = document.createElement('a');
            row.className = 'search-result-item';
            row.href = '#' + item.route;
            row.addEventListener('click', (e) => {
                e.preventDefault();
                if (item.drugId) {
                    showDrugModal(item.drugId);
                }
                else {
                    router.navigate(item.route);
                }
            });
            const label = document.createElement('span');
            label.className = 'search-result-label';
            label.textContent = item.label;
            const sublabel = document.createElement('span');
            sublabel.className = 'search-result-sublabel';
            sublabel.textContent = item.sublabel;
            row.appendChild(label);
            row.appendChild(sublabel);
            wrapper.appendChild(row);
        }
    }
    return wrapper;
}
