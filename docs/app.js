// EM Decision Trees — App Entry Point
// Registers service worker, sets up routes, renders views.
import { router } from './services/router.js';
import { renderCategoryGrid } from './components/category-grid.js';
import { renderCategoryView } from './components/category-view.js';
import { renderTreeWizard } from './components/tree-wizard.js';
import { renderReferencePanel } from './components/reference-table.js';
// -------------------------------------------------------------------
// Service Worker Registration
// -------------------------------------------------------------------
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then((reg) => {
            console.log('Service worker registered:', reg.scope);
        }).catch((err) => {
            console.error('Service worker registration failed:', err);
        });
    }
}
// -------------------------------------------------------------------
// View Rendering Helpers
// -------------------------------------------------------------------
/** Get the main content container */
function getMain() {
    const el = document.getElementById('main-content');
    if (!el)
        throw new Error('Missing #main-content element');
    return el;
}
/** Clear main content and return the container */
function clearMain() {
    const main = getMain();
    main.innerHTML = '';
    return main;
}
/** Render a placeholder screen (will be replaced by real components in later tasks) */
function renderPlaceholder(title, subtitle, icon) {
    const main = clearMain();
    const container = document.createElement('div');
    container.className = 'empty-state';
    const iconEl = document.createElement('div');
    iconEl.className = 'empty-state-icon';
    iconEl.textContent = icon;
    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    const subtitleEl = document.createElement('p');
    subtitleEl.textContent = subtitle;
    container.appendChild(iconEl);
    container.appendChild(titleEl);
    container.appendChild(subtitleEl);
    main.appendChild(container);
}
// -------------------------------------------------------------------
// Route Handlers (placeholders — replaced by real components later)
// -------------------------------------------------------------------
function handleHome(_params) {
    const main = clearMain();
    renderCategoryGrid(main);
}
function handleCategory(params) {
    const id = params['id'] ?? 'unknown';
    const main = clearMain();
    renderCategoryView(main, id);
}
function handleTree(params) {
    const id = params['id'] ?? 'unknown';
    const main = clearMain();
    renderTreeWizard(main, id);
}
function handleTreeNode(params) {
    const treeId = params['id'] ?? 'unknown';
    const nodeId = params['nodeId'] ?? 'unknown';
    renderPlaceholder(`Node: ${nodeId}`, `In tree: ${treeId}. Node rendering coming in Task 8.`, '\uD83D\uDD35');
}
function handleReference(params) {
    const main = clearMain();
    const treeId = params['treeId'];
    renderReferencePanel(main, treeId);
}
function handleNotFound() {
    renderPlaceholder('Page Not Found', 'This route doesn\u2019t exist. Tap back or go home.', '\u2753');
    const main = getMain();
    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn-primary';
    homeBtn.textContent = 'Go Home';
    homeBtn.style.marginTop = '16px';
    homeBtn.addEventListener('click', () => router.navigate('/'));
    main.querySelector('.empty-state')?.appendChild(homeBtn);
}
// -------------------------------------------------------------------
// Initialize
// -------------------------------------------------------------------
function init() {
    registerServiceWorker();
    // Register routes
    router.on('/', handleHome);
    router.on('/category/:id', handleCategory);
    router.on('/tree/:id', handleTree);
    router.on('/tree/:id/node/:nodeId', handleTreeNode);
    router.on('/reference/:treeId', handleReference);
    router.on('/reference', handleReference);
    router.onNotFound(handleNotFound);
    // Start routing
    router.start();
}
// Boot when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
}
else {
    init();
}
