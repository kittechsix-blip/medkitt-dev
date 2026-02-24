// MedKitt — Drug Reference Component
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
            // Build calculator panel (if weightCalc exists) before rendering regimen
            // so the inline links can reference it
            let calcPanel = null;
            if (dose.weightCalc) {
                const calcs = Array.isArray(dose.weightCalc) ? dose.weightCalc : [dose.weightCalc];
                calcPanel = buildWeightCalcPanel(calcs);
                calcPanel.style.display = 'none';
            }
            const regimen = document.createElement('div');
            regimen.className = 'info-page-drug-regimen';
            renderRegimenWithCalcLinks(regimen, dose.regimen, calcPanel);
            card.appendChild(regimen);
            if (calcPanel) {
                card.appendChild(calcPanel);
            }
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
    // Image
    if (drug.image) {
        const figure = document.createElement('figure');
        figure.style.margin = '1rem 0';
        const img = document.createElement('img');
        img.src = drug.image.src;
        img.alt = drug.image.alt;
        img.style.width = '100%';
        img.style.borderRadius = '8px';
        figure.appendChild(img);
        if (drug.image.caption) {
            const cap = document.createElement('figcaption');
            cap.style.fontSize = '0.75rem';
            cap.style.opacity = '0.7';
            cap.style.marginTop = '0.5rem';
            cap.textContent = drug.image.caption;
            figure.appendChild(cap);
        }
        body.appendChild(figure);
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
// Regimen Text with Inline Calc Links
// -------------------------------------------------------------------
/** Regex matching weight-based dosing patterns like 0.6 mg/kg, 50 mg/kg/day, 1.75 mg/kg/hr, mcg/kg/min */
const WEIGHT_DOSE_RE = /(\d+\.?\d*(?:\s*-\s*\d+\.?\d*)?)\s*(mg|mcg|units?)\/kg(?:\/(day|hr|min))?/g;
/** Parse regimen text — weight-based patterns become tappable links that toggle the calc panel */
function renderRegimenWithCalcLinks(container, text, calcPanel) {
    if (!calcPanel) {
        // No calculator — render as plain text
        container.textContent = text;
        return;
    }
    let lastIndex = 0;
    let match;
    WEIGHT_DOSE_RE.lastIndex = 0;
    let hasLinks = false;
    while ((match = WEIGHT_DOSE_RE.exec(text)) !== null) {
        hasLinks = true;
        // Text before the match
        if (match.index > lastIndex) {
            container.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        // Clickable weight-based dose link
        const link = document.createElement('button');
        link.className = 'dose-calc-link';
        link.textContent = match[0];
        link.setAttribute('aria-label', `Calculate ${match[0]} dose`);
        link.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = calcPanel.style.display !== 'none';
            calcPanel.style.display = open ? 'none' : 'block';
            // Scroll panel into view on open
            if (!open) {
                requestAnimationFrame(() => calcPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
            }
        });
        container.appendChild(link);
        lastIndex = match.index + match[0].length;
    }
    // Remaining text after last match
    if (lastIndex < text.length) {
        container.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    // Fallback: if no regex matches were found despite having weightCalc, show plain text
    if (!hasLinks) {
        container.textContent = text;
    }
}
// -------------------------------------------------------------------
// Weight-Based Dose Calculator
// -------------------------------------------------------------------
/** Estimate pediatric weight from age using standard formulas */
function estimateWeight(ageValue, bracket) {
    switch (bracket) {
        case 'infant': return (ageValue * 0.5) + 3.5; // months × 0.5 + 3.5 kg
        case 'child': return (ageValue * 2) + 10; // years × 2 + 10 kg
        case 'adolescent': return (ageValue * 2) + 20; // years × 2 + 20 kg
    }
}
/** Calculate per-dose amount for a single WeightCalc entry given a weight in kg.
 *  For dailyDivided drugs, divides daily total before applying maxDose cap. */
function calcDose(wc, weightKg) {
    let rawTotal = weightKg * wc.dosePerKg;
    let dose = wc.dailyDivided ? rawTotal / wc.dailyDivided : rawTotal;
    const rawDose = dose;
    let capped = false;
    if (wc.maxDose && dose > wc.maxDose) {
        dose = wc.maxDose;
        capped = true;
    }
    return { dose, capped, rawDose };
}
/** Format a number to a clean decimal string (remove trailing zeros) */
function fmtNum(n) {
    return n % 1 === 0 ? String(n) : n.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}
/** Build the dose result display for all WeightCalc entries */
function renderDoseResults(resultsEl, calcs, weightKg, weightSource) {
    resultsEl.innerHTML = '';
    resultsEl.style.display = 'block';
    const header = document.createElement('div');
    header.className = 'dose-calc-weight-summary';
    header.textContent = `Patient weight: ${fmtNum(weightKg)} kg ${weightSource}`;
    resultsEl.appendChild(header);
    for (const wc of calcs) {
        const row = document.createElement('div');
        row.className = 'dose-calc-result-row';
        const { dose, capped, rawDose } = calcDose(wc, weightKg);
        // Label (if multiple calcs)
        if (wc.label) {
            const label = document.createElement('div');
            label.className = 'dose-calc-result-label';
            label.textContent = wc.label;
            row.appendChild(label);
        }
        // Main dose display
        const doseEl = document.createElement('div');
        doseEl.className = 'dose-calc-result-value';
        if (wc.dailyDivided) {
            doseEl.textContent = `Give ${fmtNum(dose)} ${wc.unit} per dose`;
            row.appendChild(doseEl);
            const detail = document.createElement('div');
            detail.className = 'dose-calc-result-detail';
            let detailText = `${fmtNum(wc.dosePerKg)} ${wc.unit}/kg/day \u00F7 ${wc.dailyDivided} = ${fmtNum(rawDose)} ${wc.unit}/dose`;
            if (capped)
                detailText += ` \u2192 capped at ${fmtNum(wc.maxDose)} ${wc.unit}/dose`;
            detail.textContent = detailText;
            row.appendChild(detail);
            const dailyTotal = dose * wc.dailyDivided;
            const dailyNote = document.createElement('div');
            dailyNote.className = 'dose-calc-result-detail';
            dailyNote.textContent = `Daily total: ${fmtNum(dailyTotal)} ${wc.unit}/day`;
            row.appendChild(dailyNote);
        }
        else {
            doseEl.textContent = `Give ${fmtNum(dose)} ${wc.unit}`;
            row.appendChild(doseEl);
            const detail = document.createElement('div');
            detail.className = 'dose-calc-result-detail';
            let detailText = `${fmtNum(wc.dosePerKg)} ${wc.unit}/kg \u00D7 ${fmtNum(weightKg)} kg = ${fmtNum(rawDose)} ${wc.unit}`;
            if (capped)
                detailText += ` \u2192 max ${fmtNum(wc.maxDose)} ${wc.unit}`;
            detail.textContent = detailText;
            row.appendChild(detail);
        }
        resultsEl.appendChild(row);
    }
}
/** Build the full weight-based dose calculator panel */
function buildWeightCalcPanel(calcs) {
    const panel = document.createElement('div');
    panel.className = 'dose-calc-panel';
    // Results area (shared by both pathways)
    const resultsEl = document.createElement('div');
    resultsEl.className = 'dose-calc-results';
    resultsEl.style.display = 'none';
    // --- Mode toggle: Known / Unknown ---
    const modeRow = document.createElement('div');
    modeRow.className = 'dose-calc-mode-row';
    const btnKnown = document.createElement('button');
    btnKnown.className = 'dose-calc-mode-btn active';
    btnKnown.textContent = 'Weight Known';
    const btnUnknown = document.createElement('button');
    btnUnknown.className = 'dose-calc-mode-btn';
    btnUnknown.textContent = 'Weight Unknown';
    modeRow.appendChild(btnKnown);
    modeRow.appendChild(btnUnknown);
    panel.appendChild(modeRow);
    // --- Known Weight Panel ---
    const knownPanel = document.createElement('div');
    knownPanel.className = 'dose-calc-input-section';
    const knownRow = document.createElement('div');
    knownRow.className = 'dose-calc-input-row';
    const knownInput = document.createElement('input');
    knownInput.type = 'number';
    knownInput.className = 'dose-calc-input';
    knownInput.placeholder = 'kg';
    knownInput.inputMode = 'decimal';
    knownInput.setAttribute('aria-label', 'Patient weight in kg');
    knownInput.min = '0.1';
    knownInput.max = '300';
    knownInput.step = 'any';
    const knownUnit = document.createElement('span');
    knownUnit.className = 'dose-calc-unit';
    knownUnit.textContent = 'kg';
    const knownCalcBtn = document.createElement('button');
    knownCalcBtn.className = 'dose-calc-go-btn';
    knownCalcBtn.textContent = 'Calculate';
    knownRow.appendChild(knownInput);
    knownRow.appendChild(knownUnit);
    knownRow.appendChild(knownCalcBtn);
    knownPanel.appendChild(knownRow);
    knownCalcBtn.addEventListener('click', () => {
        const w = parseFloat(knownInput.value);
        if (!w || w <= 0)
            return;
        renderDoseResults(resultsEl, calcs, w, '');
    });
    knownInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter')
            knownCalcBtn.click();
    });
    panel.appendChild(knownPanel);
    // --- Unknown Weight (Pediatric) Panel ---
    const unknownPanel = document.createElement('div');
    unknownPanel.className = 'dose-calc-input-section';
    unknownPanel.style.display = 'none';
    const bracketLabel = document.createElement('div');
    bracketLabel.className = 'dose-calc-bracket-label';
    bracketLabel.textContent = 'Select age group:';
    unknownPanel.appendChild(bracketLabel);
    const bracketRow = document.createElement('div');
    bracketRow.className = 'dose-calc-bracket-row';
    const brackets = [
        { key: 'infant', label: '< 1 year', ageLabel: 'Age (months)', min: 0, max: 11 },
        { key: 'child', label: '1\u201310 years', ageLabel: 'Age (years)', min: 1, max: 10 },
        { key: 'adolescent', label: '> 10 years', ageLabel: 'Age (years)', min: 11, max: 18 },
    ];
    let activeBracket = null;
    const bracketBtns = [];
    // Age input row (hidden until bracket selected)
    const ageRow = document.createElement('div');
    ageRow.className = 'dose-calc-input-row';
    ageRow.style.display = 'none';
    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.className = 'dose-calc-input dose-calc-input-wide';
    ageInput.inputMode = 'numeric';
    ageInput.setAttribute('aria-label', 'Patient age');
    ageInput.step = '1';
    const ageCalcBtn = document.createElement('button');
    ageCalcBtn.className = 'dose-calc-go-btn';
    ageCalcBtn.textContent = 'Calculate';
    ageRow.appendChild(ageInput);
    ageRow.appendChild(ageCalcBtn);
    for (const b of brackets) {
        const btn = document.createElement('button');
        btn.className = 'dose-calc-bracket-btn';
        btn.textContent = b.label;
        btn.addEventListener('click', () => {
            activeBracket = b.key;
            bracketBtns.forEach(bb => bb.classList.remove('active'));
            btn.classList.add('active');
            ageInput.placeholder = b.key === 'infant' ? 'Age (in months)' : 'Age (in years)';
            ageInput.min = String(b.min);
            ageInput.max = String(b.max);
            ageInput.value = '';
            ageRow.style.display = 'flex';
            resultsEl.style.display = 'none';
            ageInput.focus();
        });
        bracketBtns.push(btn);
        bracketRow.appendChild(btn);
    }
    unknownPanel.appendChild(bracketRow);
    unknownPanel.appendChild(ageRow);
    function calcFromAge() {
        if (!activeBracket)
            return;
        const age = parseFloat(ageInput.value);
        if (isNaN(age) || age < 0)
            return;
        const weightKg = estimateWeight(age, activeBracket);
        const unitLabel = activeBracket === 'infant' ? 'mo' : 'yo';
        renderDoseResults(resultsEl, calcs, weightKg, `(estimated from ${fmtNum(age)} ${unitLabel})`);
    }
    ageCalcBtn.addEventListener('click', calcFromAge);
    ageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter')
            calcFromAge();
    });
    panel.appendChild(unknownPanel);
    // --- Mode toggle logic ---
    btnKnown.addEventListener('click', () => {
        btnKnown.classList.add('active');
        btnUnknown.classList.remove('active');
        knownPanel.style.display = 'block';
        unknownPanel.style.display = 'none';
        resultsEl.style.display = 'none';
    });
    btnUnknown.addEventListener('click', () => {
        btnUnknown.classList.add('active');
        btnKnown.classList.remove('active');
        unknownPanel.style.display = 'block';
        knownPanel.style.display = 'none';
        resultsEl.style.display = 'none';
    });
    panel.appendChild(resultsEl);
    return panel;
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
