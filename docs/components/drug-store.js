// EM Decision Trees — Drug Reference Component
// Searchable alphabetical drug list + detail modal overlay.
// Drug names in tree body text use [name](#/drug/id) to open the modal.
import { getAllDrugs, getDrug } from '../data/drug-store.js';
import { router } from '../services/router.js';
// -------------------------------------------------------------------
// Drug List View (Medical Drug Reference category page)
// -------------------------------------------------------------------
/** Render the drug reference list with search */
export function renderDrugList(container) {
    container.innerHTML = '';
    // Back button
    const backBtn = document.createElement('button');
    backBtn.className = 'btn-text';
    backBtn.textContent = '\u2190 Categories';
    backBtn.addEventListener('click', () => router.navigate('/'));
    container.appendChild(backBtn);
    // Header
    const header = document.createElement('div');
    header.className = 'category-view-header';
    const icon = document.createElement('span');
    icon.className = 'category-view-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '\uD83D\uDC8A'; // 💊
    const name = document.createElement('h2');
    name.className = 'category-view-name';
    name.textContent = 'Drug Reference';
    header.appendChild(icon);
    header.appendChild(name);
    container.appendChild(header);
    // Search bar
    const searchWrap = document.createElement('div');
    searchWrap.className = 'calculator-search-wrap';
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'calculator-search-input';
    searchInput.placeholder = 'Search drugs\u2026';
    searchInput.setAttribute('aria-label', 'Search drugs');
    searchWrap.appendChild(searchInput);
    container.appendChild(searchWrap);
    // Drug list
    const list = document.createElement('div');
    list.className = 'tree-list';
    container.appendChild(list);
    const allDrugs = getAllDrugs();
    function renderList(filter) {
        list.innerHTML = '';
        const query = filter.toLowerCase().trim();
        const filtered = query
            ? allDrugs.filter(d => d.name.toLowerCase().includes(query) ||
                d.genericName.toLowerCase().includes(query) ||
                d.drugClass.toLowerCase().includes(query) ||
                d.indications.some(ind => ind.toLowerCase().includes(query)))
            : allDrugs;
        if (filtered.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'empty-state';
            const emptyText = document.createElement('p');
            emptyText.textContent = 'No drugs match your search.';
            empty.appendChild(emptyText);
            list.appendChild(empty);
            return;
        }
        for (const drug of filtered) {
            const card = document.createElement('button');
            card.className = 'tree-card';
            card.setAttribute('aria-label', `${drug.name} \u2014 ${drug.drugClass}`);
            card.addEventListener('click', () => showDrugModal(drug.id));
            const title = document.createElement('div');
            title.className = 'tree-card-title';
            title.textContent = drug.name;
            const subtitle = document.createElement('div');
            subtitle.className = 'tree-card-subtitle';
            subtitle.textContent = drug.drugClass;
            const routeEl = document.createElement('div');
            routeEl.className = 'tree-card-count';
            routeEl.textContent = drug.route;
            card.appendChild(title);
            card.appendChild(subtitle);
            card.appendChild(routeEl);
            list.appendChild(card);
        }
    }
    searchInput.addEventListener('input', () => renderList(searchInput.value));
    renderList('');
}
// -------------------------------------------------------------------
// Drug Detail Modal
// -------------------------------------------------------------------
let overlayEl = null;
function destroyOverlay() {
    overlayEl?.remove();
    overlayEl = null;
}
/** Show a drug detail modal. Returns false if drugId not found. */
export function showDrugModal(drugId) {
    const drug = getDrug(drugId);
    if (!drug)
        return false;
    destroyOverlay();
    // Overlay
    overlayEl = document.createElement('div');
    overlayEl.className = 'modal-overlay info-modal-overlay active';
    overlayEl.addEventListener('click', (e) => {
        if (e.target === overlayEl)
            destroyOverlay();
    });
    // Panel
    const panel = document.createElement('div');
    panel.className = 'modal-content info-modal-panel';
    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    const titleWrap = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = drug.name;
    titleWrap.appendChild(title);
    const classEl = document.createElement('div');
    classEl.className = 'info-modal-subtitle';
    classEl.textContent = drug.drugClass;
    titleWrap.appendChild(classEl);
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn-text';
    closeBtn.textContent = '\u2715';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', destroyOverlay);
    header.appendChild(titleWrap);
    header.appendChild(closeBtn);
    panel.appendChild(header);
    // Body
    const body = document.createElement('div');
    body.className = 'modal-body info-modal-body';
    // Route badge
    const routeBadge = document.createElement('div');
    routeBadge.className = 'drug-route-badge';
    routeBadge.textContent = `Route: ${drug.route}`;
    body.appendChild(routeBadge);
    // Indications
    renderDrugSection(body, 'Indications', drug.indications);
    // Dosing
    if (drug.dosing.length > 0) {
        const dosingSection = document.createElement('div');
        dosingSection.className = 'info-page-section';
        const dosingH = document.createElement('h2');
        dosingH.className = 'info-page-section-heading';
        dosingH.textContent = 'Dosing';
        dosingSection.appendChild(dosingH);
        for (const dose of drug.dosing) {
            const card = document.createElement('div');
            card.className = 'info-page-drug-card';
            const indication = document.createElement('div');
            indication.className = 'info-page-drug-name';
            indication.textContent = dose.indication;
            card.appendChild(indication);
            const regimen = document.createElement('div');
            regimen.className = 'info-page-drug-regimen';
            regimen.textContent = dose.regimen;
            card.appendChild(regimen);
            dosingSection.appendChild(card);
        }
        body.appendChild(dosingSection);
    }
    // Contraindications
    if (drug.contraindications?.length) {
        renderDrugSection(body, 'Contraindications', drug.contraindications, 'drug-section-danger');
    }
    // Cautions
    if (drug.cautions?.length) {
        renderDrugSection(body, 'Cautions', drug.cautions, 'drug-section-warning');
    }
    // Monitoring
    if (drug.monitoring) {
        const monSection = document.createElement('div');
        monSection.className = 'info-page-section';
        const monH = document.createElement('h2');
        monH.className = 'info-page-section-heading';
        monH.textContent = 'Monitoring';
        monSection.appendChild(monH);
        const monP = document.createElement('p');
        monP.className = 'info-page-text';
        monP.textContent = drug.monitoring;
        monSection.appendChild(monP);
        body.appendChild(monSection);
    }
    // Notes
    if (drug.notes) {
        const notesSection = document.createElement('div');
        notesSection.className = 'info-page-section';
        const notesH = document.createElement('h2');
        notesH.className = 'info-page-section-heading';
        notesH.textContent = 'Clinical Notes';
        notesSection.appendChild(notesH);
        const notesP = document.createElement('p');
        notesP.className = 'info-page-text';
        notesP.textContent = drug.notes;
        notesSection.appendChild(notesP);
        body.appendChild(notesSection);
    }
    // Citations
    if (drug.citations.length > 0) {
        const citSection = document.createElement('details');
        citSection.className = 'info-page-citations';
        const citSummary = document.createElement('summary');
        citSummary.textContent = `References (${drug.citations.length})`;
        citSection.appendChild(citSummary);
        const citList = document.createElement('ol');
        citList.className = 'calculator-citation-list';
        for (const cit of drug.citations) {
            const li = document.createElement('li');
            li.textContent = cit;
            citList.appendChild(li);
        }
        citSection.appendChild(citList);
        body.appendChild(citSection);
    }
    panel.appendChild(body);
    overlayEl.appendChild(panel);
    document.body.appendChild(overlayEl);
    return true;
}
// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------
function renderDrugSection(container, heading, items, extraClass) {
    const section = document.createElement('div');
    section.className = 'info-page-section';
    const h = document.createElement('h2');
    h.className = 'info-page-section-heading';
    h.textContent = heading;
    section.appendChild(h);
    const list = document.createElement('div');
    list.className = extraClass ?? '';
    for (const item of items) {
        const p = document.createElement('p');
        p.className = 'info-page-text';
        p.textContent = '\u2022 ' + item;
        list.appendChild(p);
    }
    section.appendChild(list);
    container.appendChild(section);
}
