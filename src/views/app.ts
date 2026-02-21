// MedKitt - Main Application Logic
// Offline-first medication dosing calculator & ACLS reference

// ============================================================
// MEDICATION DATABASE
// ============================================================
const drugDatabase = [
  {
    id: 'epinephrine',
    name: 'Epinephrine',
    genericName: 'Epinephrine',
    category: 'cardiac',
    dosing: {
      adult: 'Cardiac arrest: 1mg IV/IO q3-5min\nAnaphylaxis: 0.3-0.5mg IM (1:1000)\nInfusion: 2-10 mcg/min',
      pediatric: 'Cardiac arrest: 0.01mg/kg (0.1mL/kg of 1:10,000) IV/IO q3-5min\nMax: 1mg',
      max: '1mg per dose (adult), 3-5 doses typically'
    },
    indications: ['Cardiac arrest (VF/VT/PEA/Asystole)', 'Anaphylaxis', 'Severe asthma', 'Symptomatic bradycardia (refractory to atropine)'],
    contraindications: ['None in cardiac arrest', 'Caution in hypovolemic shock'],
    warnings: ['May cause hypertension, tachycardia', 'High doses can cause VF'],
    notes: 'First-line for cardiac arrest. Double dose can be considered if no response after 2nd dose (controversial).'
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    genericName: 'Amiodarone',
    category: 'cardiac',
    dosing: {
      adult: 'Cardiac arrest: 300mg IV/IO bolus, then 150mg if needed\nVT/VF with pulse: 150mg IV over 10min',
      max: '2.2g/24 hours'
    },
    indications: ['VF/VT cardiac arrest', 'Stable VT', 'Wide-complex tachycardia', 'Afib/Aflutter (rate control)'],
    contraindications: ['Severe sinus node dysfunction', '2nd/3rd degree AV block without pacemaker', 'Bradycardia'],
    warnings: ['Hypotension (most common)', 'Phlebitis - use central line if possible', 'QT prolongation', 'Hepatotoxicity with chronic use'],
    notes: 'Give slowly to reduce hypotension. First-line antiarrhythmic for cardiac arrest.'
  },
  {
    id: 'atropine',
    name: 'Atropine',
    genericName: 'Atropine',
    category: 'cardiac',
    dosing: {
      adult: 'Symptomatic bradycardia: 0.5mg IV q3-5min, max 3mg\nOrganophosphate toxicity: 2-4mg IV q5-10min until dry secretions',
      pediatric: 'Bradycardia: 0.02mg/kg IV/IO (min 0.1mg, max 0.5mg per dose)\nMax total: 1mg (child), 3mg (adolescent)',
      max: '3mg total (adult)'
    },
    indications: ['Symptomatic bradycardia', 'Organophosphate poisoning', 'Nerve agent exposure'],
    contraindications: ['None in emergency setting'],
    warnings: ['May worsen ischemia in MI', 'Avoid in hypothermic bradycardia'],
    notes: 'Less effective in denervated heart (transplant). Give rapidly - slow injection can cause paradoxical bradycardia.'
  },
  {
    id: 'adenosine',
    name: 'Adenosine',
    genericName: 'Adenosine',
    category: 'cardiac',
    dosing: {
      adult: '6mg rapid IV push, followed by flush. If no conversion in 1-2min: 12mg. May repeat 12mg once.',
      pediatric: '0.1mg/kg rapid IV (max 6mg), then 0.2mg/kg (max 12mg)',
      max: '12mg per dose'
    },
    indications: ['SVT (PSVT)', 'Narrow-complex tachycardia'],
    contraindications: ['2nd/3rd degree AV block', 'Sick sinus syndrome', 'Atrial fibrillation/flutter', 'V-tach'],
    warnings: ['Brief asystole expected (6-12 seconds)', 'Bronchospasm in asthmatics', 'Flush immediately with 20mL saline'],
    notes: 'Use proximal IV site. Must give RAPIDLY followed by rapid flush. Caffeine/theophylline reduce effectiveness.'
  },
  {
    id: 'diltiazem',
    name: 'Diltiazem (Cardizem)',
    genericName: 'Diltiazem',
    category: 'cardiac',
    dosing: {
      adult: '0.25mg/kg IV over 2min (typical: 15-20mg). If no response in 15min: 0.35mg/kg. Infusion: 5-15mg/hr.',
      max: '20mg initial dose'
    },
    indications: ['Afib/Aflutter with RVR', 'SVT'],
    contraindications: ['Wide-complex tachycardia (possible WPW)', 'Hypotension (SBP <90)', 'Acute MI', '2nd/3rd degree AV block'],
    warnings: ['Hypotension', 'Bradycardia', 'Heart block'],
    notes: 'First-line for rate control in Afib with RVR. Do NOT use if WPW suspected.'
  },
  {
    id: 'fentanyl',
    name: 'Fentanyl',
    genericName: 'Fentanyl',
    category: 'pain',
    dosing: {
      adult: '0.5-2mcg/kg IV/IM/IN (typical adult: 50-100mcg) q30-60min PRN',
      pediatric: '1-2mcg/kg IV/IM (max 100mcg)',
      max: '200mcg per dose typical'
    },
    indications: ['Severe pain', 'Chest pain (ACS)', 'Procedural sedation adjunct', 'Trauma pain'],
    contraindications: ['Respiratory depression without airway control'],
    warnings: ['Respiratory depression', 'Chest wall rigidity (rapid/high doses)', 'Naloxone should be available'],
    notes: 'Fast onset (2-3min). Short duration (30-60min). Safer in renal failure than morphine. Less histamine release.'
  },
  {
    id: 'midazolam',
    name: 'Midazolam (Versed)',
    genericName: 'Midazolam',
    category: 'sedation',
    dosing: {
      adult: 'Sedation: 0.05mg/kg IV (2-5mg typical)\nSeizure: 5-10mg IM/IN/IV, repeat in 10-15min\nRSI: 0.3mg/kg IV',
      pediatric: '0.05-0.1mg/kg IV, max 2.5mg (child), 5mg (adolescent)'
    },
    indications: ['Procedural sedation', 'Seizures', 'RSI induction', 'Anxiolysis'],
    contraindications: ['Respiratory depression', 'Acute narrow-angle glaucoma'],
    warnings: ['Respiratory depression/apnea', 'Hypotension', 'Paradoxical agitation (especially elderly)'],
    notes: 'Fast onset (1-2min), short duration. Flumazenil is reversal agent. Amnesia effect.'
  },
  {
    id: 'rocuronium',
    name: 'Rocuronium',
    genericName: 'Rocuronium',
    category: 'paralytic',
    dosing: {
      adult: 'RSI: 1-1.2mg/kg IV\nMaintenance: 0.1-0.2mg/kg q20-30min',
      pediatric: 'RSI: 0.6-1.2mg/kg IV'
    },
    indications: ['RSI (rapid sequence intubation)', 'Muscle relaxation for procedures'],
    contraindications: ['Known hypersensitivity'],
    warnings: ['Requires airway control!', 'DO NOT give without sedation/analgesia'],
    notes: 'Non-depolarizing NMBA. Faster onset than vecuronium. Sugammadex is reversal agent.'
  },
  {
    id: 'succinylcholine',
    name: 'Succinylcholine',
    genericName: 'Succinylcholine',
    category: 'paralytic',
    dosing: {
      adult: 'RSI: 1-1.5mg/kg IV (up to 2mg/kg if pretreated)',
      pediatric: '1-2mg/kg IV (infants may need 2mg/kg)'
    },
    indications: ['RSI (rapid sequence intubation)', 'Muscle relaxation for short procedures'],
    contraindications: ['Hyperkalemia (K+ >5.5)', 'Crush injury >24h old', 'Burns >24h old', 'Neuromuscular disease', 'Malignant hyperthermia risk', 'Increased ICP/ICP'],
    warnings: ['Hyperkalemia!', 'Bradycardia (esp. children - pretreat with atropine)', 'Increased ICP/ICP/GFR', 'Malignant hyperthermia trigger'],
    notes: 'Depolarizing NMBA. Ultra-fast onset (45-60sec), short duration (5-10min). Contraindications are CRITICAL.'
  },
  {
    id: 'naloxone',
    name: 'Naloxone (Narcan)',
    genericName: 'Naloxone',
    category: 'misc',
    dosing: {
      adult: '0.04-0.4mg IV/IM/IN q2-3min (titrate to respirations)\nCan give up to 2-4mg total',
      pediatric: '2mg IN (1mg each nostril) or 0.1mg/kg IV'
    },
    indications: ['Opioid overdose', 'Respiratory depression from opioids'],
    contraindications: ['None - relative contraindication in chronic pain patients'],
    warnings: ['Acute withdrawal symptoms', 'Pulmonary edema (rare)', 'Duration shorter than opioids - may need repeat doses'],
    notes: 'Titrate to respiratory effort (not full consciousness). Repeat dosing often needed (naloxone shorter-acting than most opioids).'
  }
];

// ============================================================
// ACLS ALGORITHMS DATA
// ============================================================
const aclsData = {
  'cardiac-arrest': {
    title: 'Adult Cardiac Arrest Algorithm',
    content: `
      <div class="algorithm-flow">
        <div class="algo-step action"><span class="step-number">1</span><div class="step-content"><h4>Start High-Quality CPR</h4><p>Push hard (2-2.4 inches) and fast (100-120/min). Minimize interruptions.</p><ul><li>30 compressions : 2 breaths</li><li>Allow full chest recoil</li><li>Rotate compressors every 2 minutes</li></ul></div></div>
        <div class="algo-step decision"><span class="step-number">2</span><div class="step-content"><h4>Assess Rhythm - Shockable?</h4><p>VF/pVT = SHOCKABLE | PEA/Asystole = NON-SHOCKABLE</p></div></div>
        <div class="algo-step action"><span class="step-number">3</span><div class="step-content"><h4>If SHOCKABLE: Defibrillate</h4><p>1 shock ASAP, then resume CPR immediately for 2 minutes</p><ul><li><span class="dose-highlight">Biphasic: 120-200J</span></li><li><span class="dose-highlight">Monophasic: 360J</span></li></ul></div></div>
        <div class="algo-step action"><span class="step-number">4</span><div class="step-content"><h4>Give Epinephrine</h4><p><span class="dose-highlight">1mg IV/IO every 3-5 minutes</span> (every other cycle)</p><ul><li>Can give via ETT: 2-2.5mg in 5-10mL NS if no IV/IO</li></ul></div></div>
        <div class="algo-step action"><span class="step-number">5</span><div class="step-content"><h4>Add Antiarrhythmic (after 2nd shock)</h4><p><span class="dose-highlight">Amiodarone: 300mg IV/IO bolus</span>, then 150mg if needed<br>Magnesium: 1-2g IV/IO for torsades</p></div></div>
        <div class="algo-step decision"><span class="step-number">H</span><div class="step-content"><h4>Treat H's and T's</h4><p><strong>H's:</strong> Hypovolemia, Hypoxia, Hydrogen ion, Hypo/Hyperkalemia, Hypothermia<br><strong>T's:</strong> Tension PTX, Tamponade, Toxins, Thrombosis</p></div></div>
      </div>
    `
  },
  'tachycardia': {
    title: 'Adult Tachycardia (With Pulse)',
    content: `
      <div class="algorithm-flow">
        <div class="algo-step decision"><span class="step-number">1</span><div class="step-content"><h4>Is the patient UNSTABLE?</h4><p>Hypotension, altered mental status, signs of shock, chest pain, acute heart failure?</p></div></div>
        <div class="algo-step action"><span class="step-number">⚡</span><div class="step-content"><h4>UNSTABLE + Due to Arrhythmia → SYNCHRONIZED Cardioversion NOW</h4><ul><li>Narrow regular: <span class="dose-highlight">50-100J</span></li><li>Narrow irregular: <span class="dose-highlight">120-200J biphasic</span></li><li>Wide regular: <span class="dose-highlight">100J</span></li><li>Wide irregular: <span class="dose-highlight">DEFIB dose</span> (not synchronized)</li></ul></div></div>
        <div class="algo-step action"><span class="step-number">N</span><div class="step-content"><h4>NARROW Complex - Try Vagal → Adenosine</h4><p><span class="dose-highlight">Adenosine: 6mg rapid IV + flush</span>, then 12mg if needed</p></div></div>
        <div class="algo-step action"><span class="step-number">W</span><div class="step-content"><h4>WIDE Complex REGULAR (likely VT)</h4><p><span class="dose-highlight">Amiodarone 150mg IV over 10min</span> or Procainamide</p></div></div>
        <div class="algo-step action"><span class="step-number">W</span><div class="step-content"><h4>WIDE IRREGULAR</h4><p>WPW + Afib: Avoid AV nodal blockers! Use procainamide or amiodarone<br>Torsades: <span class="dose-highlight">Magnesium 1-2g IV</span></p></div></div>
      </div>
    `
  },
  'bradycardia': {
    title: 'Adult Bradycardia (With Pulse)',
    content: `
      <div class="algorithm-flow">
        <div class="algo-step action"><span class="step-number">1</span><div class="step-content"><h4>Atropine First Line</h4><p><span class="dose-highlight">0.5mg IV every 3-5 minutes. Maximum: 3mg total</span></p><ul><li>Effective for sinus bradycardia, AV nodal block</li><li>Less effective for infranodal blocks (wide QRS)</li></ul></div></div>
        <div class="algo-step action"><span class="step-number">2</span><div class="step-content"><h4>Transcutaneous Pacing</h4><p>If atropine ineffective. Start immediately for unstable patient.</p><ul><li>Sedate if possible (but do not delay)</li><li>Start at 80mA, increase until capture</li><li>Set rate 60-80 bpm</li></ul></div></div>
        <div class="algo-step action"><span class="step-number">3</span><div class="step-content"><h4>Alternative Medications</h4><p><span class="dose-highlight">Dopamine: 2-20mcg/kg/min</span> or <span class="dose-highlight">Epinephrine: 2-10mcg/min</span></p></div></div>
      </div>
    `
  },
  'stroke': {
    title: 'Acute Stroke Algorithm',
    content: `
      <div class="algorithm-flow">
        <div class="algo-step action"><span class="step-number">1</span><div class="step-content"><h4>Activate Stroke Team IMMEDIATELY</h4><p>Time is brain! Goals: Door to CT &lt;25 min, Door to needle &lt;60 min</p></div></div>
        <div class="algo-step action"><span class="step-number">2</span><div class="step-content"><h4>Obtain Non-Contrast Head CT</h4><p>Rule out hemorrhage before giving thrombolytics</p></div></div>
        <div class="algo-step action"><span class="step-number">3</span><div class="step-content"><h4>ISCHEMIC Stroke - tPA Candidate?</h4><ul><li>Last known well &lt;4.5 hours</li><li>BP &lt;185/110 before tPA</li><li>Blood glucose &gt;50</li><li>No recent surgery/bleeding</li></ul></div></div>
        <div class="algo-step action"><span class="step-number">4</span><div class="step-content"><h4>Give Alteplase (tPA)</h4><p><span class="dose-highlight">0.9mg/kg IV (max 90mg)</span> - 10% bolus, remainder over 1 hour</p><ul><li>NO anticoagulation/antiplatelet for 24h after tPA</li></ul></div></div>
      </div>
    `
  },
  'post-resus': {
    title: 'Post-Cardiac Arrest Care',
    content: `
      <div class="algorithm-flow">
        <div class="algo-step action"><span class="step-number">1</span><div class="step-content"><h4>Targeted Temperature Management (TTM)</h4><p>If patient not following commands after ROSC:</p><ul><li>Cool to <span class="dose-highlight">32-36°C for at least 24 hours</span></li><li>Start ASAP - goal within 6 hours</li><li>Prevent shivering (sedation, paralytics if needed)</li></ul></div></div>
        <div class="algo-step action"><span class="step-number">2</span><div class="step-content"><h4>Coronary Angiography</h4><p>Obtain 12-lead ECG immediately. STEMI → immediate cath</p></div></div>
        <div class="algo-step action"><span class="step-number">3</span><div class="step-content"><h4>Hemodynamic Optimization</h4><p>Goal: SBP >90 or MAP >65. Avoid hypotension!</p></div></div>
        <div class="algo-step action"><span class="step-number">4</span><div class="step-content"><h4>Neuroprognostication</h4><p>NO early prediction of poor outcome in first 72 hours while sedated/cooled</p></div></div>
      </div>
    `
  }
};

// ============================================================
// NOTES STORAGE
// ============================================================
const STORAGE_KEY = 'em_medkitt_notes';

function getNotes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveNote(noteData) {
  const notes = getNotes();
  const now = Date.now();
  
  if (noteData.id) {
    const index = notes.findIndex(n => n.id === noteData.id);
    if (index >= 0) {
      notes[index] = { ...notes[index], ...noteData, updatedAt: now };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      return notes[index];
    }
  }
  
  const newNote = {
    id: `note_${now}`,
    title: noteData.title || 'Untitled Note',
    content: noteData.content || '',
    timestamp: now,
    updatedAt: now
  };
  
  notes.unshift(newNote);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  return newNote;
}

function deleteNote(id) {
  const notes = getNotes().filter(n => n.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - timestamp;
  
  if (diff < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

// ============================================================
// UI RENDERING
// ============================================================
let currentNoteId = null;
let currentFilter = 'all';
let currentSearch = '';

function renderDrugList() {
  const container = document.getElementById('drug-list');
  if (!container) return;
  
  let filtered = drugDatabase;
  
  if (currentFilter !== 'all') {
    filtered = filtered.filter(d => d.category === currentFilter);
  }
  
  if (currentSearch) {
    const search = currentSearch.toLowerCase();
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(search) || 
      d.genericName.toLowerCase().includes(search) ||
      d.indications.some(i => i.toLowerCase().includes(search))
    );
  }
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">💊</div>
        <h3>No medications found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = filtered.map(drug => `
    <div class="drug-card" data-drug-id="${drug.id}">
      <div class="drug-card-header">
        <span class="drug-name">${drug.name}</span>
        <span class="drug-category ${drug.category}">${drug.category}</span>
      </div>
      <div class="drug-dose">${drug.dosing.adult.split('\n')[0]}</div>
      <div class="drug-indication">${drug.indications[0]}</div>
    </div>
  `).join('');
  
  // Add click handlers
  container.querySelectorAll('.drug-card').forEach(card => {
    card.addEventListener('click', () => {
      const drugId = card.getAttribute('data-drug-id');
      showDrugModal(drugId);
    });
  });
}

function showDrugModal(drugId) {
  const drug = drugDatabase.find(d => d.id === drugId);
  if (!drug) return;
  
  const modal = document.getElementById('drug-modal');
  const nameEl = document.getElementById('modal-drug-name');
  const detailsEl = document.getElementById('modal-drug-details');
  
  nameEl.textContent = `${drug.name} (${drug.genericName})`;
  
  detailsEl.innerHTML = `
    <div class="detail-row">
      <div class="detail-label">Category</div>
      <div class="detail-value">${drug.category.toUpperCase()}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Adult Dosing</div>
      <div class="detail-value mono">${drug.dosing.adult.replace(/\n/g, '<br>')}</div>
    </div>
    ${drug.dosing.pediatric ? `
    <div class="detail-row">
      <div class="detail-label">Pediatric Dosing</div>
      <div class="detail-value mono">${drug.dosing.pediatric.replace(/\n/g, '<br>')}</div>
    </div>
    ` : ''}
    ${drug.dosing.max ? `
    <div class="detail-row">
      <div class="detail-label">Maximum Dose</div>
      <div class="detail-value mono">${drug.dosing.max}</div>
    </div>
    ` : ''}
    <div class="detail-row">
      <div class="detail-label">Indications</div>
      <div class="detail-value">${drug.indications.map(i => `• ${i}`).join('<br>')}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Contraindications</div>
      <div class="detail-value">${drug.contraindications.map(c => `• ${c}`).join('<br>')}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Warnings</div>
      <div class="detail-value">${drug.warnings.map(w => `⚠️ ${w}`).join('<br>')}</div>
    </div>
    ${drug.notes ? `
    <div class="detail-row">
      <div class="detail-label">Notes</div>
      <div class="detail-value">${drug.notes}</div>
    </div>
    ` : ''}
  `;
  
  modal.classList.add('active');
}

function renderACLS(algorithmId) {
  const container = document.getElementById('acls-content');
  if (!container) return;
  
  const algo = aclsData[algorithmId];
  if (!algo) return;
  
  container.innerHTML = `
    <div class="acls-algorithm active">
      <h3>${algo.title}</h3>
      ${algo.content}
    </div>
  `;
}

function renderSavedNotes() {
  const container = document.getElementById('saved-notes-list');
  if (!container) return;
  
  const notes = getNotes();
  
  if (notes.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <h3>No saved notes</h3>
        <p>Your handoff notes will appear here</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = notes.map(note => `
    <div class="saved-note ${note.id === currentNoteId ? 'active' : ''}" data-note-id="${note.id}">
      <div class="saved-note-title">${note.title || 'Untitled'}</div>
      <div class="saved-note-preview">${note.content.substring(0, 60).replace(/\n/g, ' ')}...</div>
      <div class="saved-note-time">${formatTimestamp(note.timestamp)}</div>
    </div>
  `).join('');
  
  container.querySelectorAll('.saved-note').forEach(el => {
    el.addEventListener('click', () => {
      const noteId = el.getAttribute('data-note-id');
      loadNote(noteId);
    });
  });
}

function loadNote(noteId) {
  const notes = getNotes();
  const note = notes.find(n => n.id === noteId);
  if (!note) return;
  
  currentNoteId = noteId;
  document.getElementById('note-title').value = note.title || '';
  document.getElementById('note-content').value = note.content || '';
  document.getElementById('note-timestamp').textContent = formatTimestamp(note.timestamp);
  
  renderSavedNotes();
}

function clearNote() {
  currentNoteId = null;
  document.getElementById('note-title').value = '';
  document.getElementById('note-content').value = '';
  document.getElementById('note-timestamp').textContent = 'New Note';
  document.getElementById('note-title').focus();
}

// ============================================================
// EVENT HANDLERS
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Tab navigation
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      // Update nav buttons
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update tab content
      document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
      document.getElementById(`${tabId}-tab`).classList.add('active');
    });
  });
  
  // Filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      renderDrugList();
    });
  });
  
  // Drug search
  const searchInput = document.getElementById('drug-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderDrugList();
    });
  }
  
  // ACLS navigation
  document.querySelectorAll('.acls-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.acls-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderACLS(btn.getAttribute('data-acls'));
    });
  });
  
  // Modal close
  document.querySelector('.modal-close')?.addEventListener('click', () => {
    document.getElementById('drug-modal').classList.remove('active');
  });
  
  document.getElementById('drug-modal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('drug-modal')) {
      document.getElementById('drug-modal').classList.remove('active');
    }
  });
  
  // Note buttons
  document.getElementById('btn-new-note')?.addEventListener('click', clearNote);
  
  document.getElementById('btn-clear')?.addEventListener('click', clearNote);
  
  document.getElementById('btn-save-note')?.addEventListener('click', () => {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();
    
    if (!title && !content) return;
    
    const saved = saveNote({
      id: currentNoteId,
      title: title || 'Untitled Note',
      content
    });
    
    currentNoteId = saved.id;
    renderSavedNotes();
    
    // Visual feedback
    const btn = document.getElementById('btn-save-note');
    const originalText = btn.textContent;
    btn.textContent = 'Saved!';
    setTimeout(() => btn.textContent = originalText, 1000);
  });
  
  document.getElementById('btn-export')?.addEventListener('click', () => {
    const notes = getNotes();
    const dataStr = JSON.stringify(notes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `em-medkitt-notes-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
  
  // Initial render
  renderDrugList();
  renderACLS('cardiac-arrest');
  renderSavedNotes();
  clearNote();
});
