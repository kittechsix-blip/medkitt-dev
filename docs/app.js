// src/services/router.ts
class Router {
  routes = [];
  notFoundHandler = null;
  on(pattern, handler) {
    const segments = pattern.split("/").filter(Boolean);
    this.routes.push({ pattern, segments, handler });
  }
  onNotFound(handler) {
    this.notFoundHandler = handler;
  }
  start() {
    window.addEventListener("hashchange", () => this.resolve());
    this.resolve();
  }
  navigate(path) {
    window.location.hash = "#" + path;
  }
  currentPath() {
    const hash = window.location.hash.slice(1);
    return hash || "/";
  }
  resolve() {
    const path = this.currentPath();
    const pathSegments = path.split("/").filter(Boolean);
    for (const route of this.routes) {
      const params = this.match(route.segments, pathSegments);
      if (params !== null) {
        route.handler(params);
        return;
      }
    }
    if (this.notFoundHandler) {
      this.notFoundHandler({});
    }
  }
  match(routeSegments, pathSegments) {
    if (routeSegments.length === 0 && pathSegments.length === 0) {
      return {};
    }
    if (routeSegments.length !== pathSegments.length) {
      return null;
    }
    const params = {};
    for (let i = 0;i < routeSegments.length; i++) {
      const routeSeg = routeSegments[i];
      const pathSeg = pathSegments[i];
      if (routeSeg.startsWith(":")) {
        const paramName = routeSeg.slice(1);
        params[paramName] = decodeURIComponent(pathSeg);
      } else if (routeSeg !== pathSeg) {
        return null;
      }
    }
    return params;
  }
}
var router = new Router;

// src/data/categories.ts
var DEFAULT_CATEGORIES = [
  { id: "anesthesia-airway", name: "Anesthesia / Airway", icon: "anesthesia-airway.png", decisionTrees: [], isCustom: false },
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "cardiology.png",
    decisionTrees: [
      {
        id: "afib-rvr",
        title: "A-Fib RVR",
        subtitle: "Stability → Rate Control → Refractory → Anticoagulation",
        categoryId: "cardiology",
        version: "1.0",
        nodeCount: 20,
        entryNodeId: "afib-start"
      }
    ],
    isCustom: false
  },
  {
    id: "critical-care",
    name: "Critical Care",
    icon: "critical-care.png",
    decisionTrees: [
      {
        id: "pe-treatment",
        title: "PE Treatment",
        subtitle: "Risk Stratification → Management",
        categoryId: "critical-care",
        version: "1.0",
        nodeCount: 29,
        entryNodeId: "pe-start"
      }
    ],
    isCustom: false
  },
  {
    id: "emergency-medicine",
    name: "EM",
    icon: "em.png",
    decisionTrees: [
      {
        id: "pe-treatment",
        title: "PE Treatment",
        subtitle: "Risk Stratification → Management",
        categoryId: "emergency-medicine",
        version: "1.0",
        nodeCount: 29,
        entryNodeId: "pe-start"
      }
    ],
    isCustom: false
  },
  { id: "gastroenterology", name: "GI (Gastroenterology)", icon: "gi.png", decisionTrees: [], isCustom: false },
  { id: "heme-onc", name: "Heme/Onc", icon: "heme-onc.png", decisionTrees: [], isCustom: false },
  {
    id: "infectious-disease",
    name: "Infectious Disease",
    icon: "infectious-disease.png",
    decisionTrees: [
      {
        id: "neurosyphilis",
        title: "Neurosyphilis Workup",
        subtitle: "Serology → LP decision → CSF interpretation → Treatment",
        categoryId: "infectious-disease",
        version: "1.0",
        nodeCount: 42,
        entryNodeId: "serology-start"
      }
    ],
    isCustom: false
  },
  { id: "med-calc", name: "Med-Calc", icon: "med-calc.png", decisionTrees: [], isCustom: false },
  { id: "nephro-rheum-endo", name: "Nephro/Rheum/Endo", icon: "nephro-rheum-endo.png", decisionTrees: [], isCustom: false },
  { id: "neurology", name: "Neurology", icon: "neurology.png", decisionTrees: [], isCustom: false },
  { id: "ob-gyn", name: "OB/GYN", icon: "ob-gyn.png", decisionTrees: [], isCustom: false },
  { id: "orthopedics", name: "Ortho", icon: "ortho.png", decisionTrees: [], isCustom: false },
  { id: "pediatrics", name: "Pediatrics", icon: "pediatrics.png", decisionTrees: [], isCustom: false },
  { id: "pharmacy", name: "Pharmacy", icon: "pharmacy.png", decisionTrees: [], isCustom: false },
  {
    id: "procedures",
    name: "Procedures",
    icon: "procedures.png",
    decisionTrees: [
      {
        id: "afib-rvr",
        title: "Synchronized Cardioversion",
        subtitle: "A-Fib RVR: Stability → Cardioversion Protocol",
        categoryId: "procedures",
        version: "1.0",
        nodeCount: 20,
        entryNodeId: "afib-start"
      },
      {
        id: "priapism",
        title: "Priapism Treatment",
        subtitle: "Classification → Penile Block → Aspiration → Phenylephrine → Escalation",
        categoryId: "procedures",
        version: "1.0",
        nodeCount: 44,
        entryNodeId: "priapism-start"
      }
    ],
    isCustom: false
  },
  { id: "toxicology", name: "Toxicology", icon: "toxicology.png", decisionTrees: [], isCustom: false },
  { id: "trauma-surg", name: "Trauma/Surg", icon: "trauma-surg.png", decisionTrees: [], isCustom: false },
  {
    id: "us-rads",
    name: "U/S-Rads",
    icon: "us-rads.png",
    decisionTrees: [
      {
        id: "pneumothorax",
        title: "Pneumothorax POCUS",
        subtitle: "Technique → Lung Sliding → A’ Profile → Lung Point",
        categoryId: "us-rads",
        version: "1.0",
        nodeCount: 13,
        entryNodeId: "pneumothorax-start"
      },
      {
        id: "echo-views",
        title: "Basic Echo Views",
        subtitle: "PLAX → PSAX → A4C → Subxiphoid → IVC",
        categoryId: "us-rads",
        version: "1.0",
        nodeCount: 8,
        entryNodeId: "echo-views-start"
      }
    ],
    isCustom: false
  },
  {
    id: "urology",
    name: "Urology",
    icon: "urology.png",
    decisionTrees: [
      {
        id: "priapism",
        title: "Priapism Treatment",
        subtitle: "Classification → Penile Block → Aspiration → Phenylephrine → Escalation",
        categoryId: "urology",
        version: "1.0",
        nodeCount: 44,
        entryNodeId: "priapism-start"
      }
    ],
    isCustom: false
  }
];
var STORAGE_KEY = "em-custom-categories";
function loadCustomCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
      return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveCustomCategories(categories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}
function getAllCategories() {
  return [...DEFAULT_CATEGORIES, ...loadCustomCategories()];
}
function addCustomCategory(name) {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const category = {
    id,
    name,
    icon: "\uD83D\uDCCB",
    decisionTrees: [],
    isCustom: true
  };
  const custom = loadCustomCategories();
  custom.push(category);
  saveCustomCategories(custom);
  return category;
}

// src/components/calculator.ts
var PESI_CALCULATOR = {
  id: "pesi",
  title: "PESI Score",
  subtitle: "Pulmonary Embolism Severity Index",
  description: "The PESI is an 11-variable clinical prediction tool that stratifies patients with acute PE according to their 30-day mortality risk.",
  fields: [
    { name: "age", label: "Age", type: "number", points: 0, valueIsPoints: true, unit: "years", description: "Points = age in years" },
    { name: "male", label: "Male sex", type: "toggle", points: 10 },
    { name: "cancer", label: "History of cancer", type: "toggle", points: 30 },
    { name: "heart-failure", label: "History of heart failure", type: "toggle", points: 10 },
    { name: "chronic-lung", label: "History of chronic lung disease", type: "toggle", points: 10 },
    { name: "hr", label: "Heart rate ≥ 110", type: "toggle", points: 20 },
    { name: "sbp", label: "Systolic BP < 100 mmHg", type: "toggle", points: 30 },
    { name: "rr", label: "Respiratory rate ≥ 30", type: "toggle", points: 20 },
    { name: "temp", label: "Temperature < 36°C (96.8°F)", type: "toggle", points: 20 },
    { name: "ams", label: "Altered mental status", type: "toggle", points: 60, description: "Disorientation, lethargy, stupor, or coma" },
    { name: "spo2", label: "O₂ saturation < 90%", type: "toggle", points: 20 }
  ],
  results: [
    { min: -Infinity, max: 66, label: "Class I", risk: "Very Low Risk", mortality: "30-day mortality: 0–1.6%", colorVar: "--color-primary" },
    { min: 66, max: 86, label: "Class II", risk: "Low Risk", mortality: "30-day mortality: 1.7–3.5%", colorVar: "--color-primary" },
    { min: 86, max: 106, label: "Class III", risk: "Intermediate Risk", mortality: "30-day mortality: 3.2–7.1%", colorVar: "--color-warning" },
    { min: 106, max: 126, label: "Class IV", risk: "High Risk", mortality: "30-day mortality: 4.0–11.4%", colorVar: "--color-danger" },
    { min: 126, max: Infinity, label: "Class V", risk: "Very High Risk", mortality: "30-day mortality: 10.0–24.5%", colorVar: "--color-danger" }
  ],
  thresholdNote: "Clinical severity threshold: PESI > 86 (Class III+) = High severity",
  citations: [
    "Aujesky D, et al. Derivation and Validation of a Prognostic Model for Pulmonary Embolism. Am J Respir Crit Care Med. 2005;172(8):1041-1046.",
    "Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603."
  ]
};
var SPESI_CALCULATOR = {
  id: "spesi",
  title: "sPESI Score",
  subtitle: "Simplified Pulmonary Embolism Severity Index",
  description: "The sPESI is a 6-item scoring system that stratifies PE patients by 30-day mortality risk. Each present variable scores 1 point.",
  fields: [
    { name: "age80", label: "Age > 80 years", type: "toggle", points: 1 },
    { name: "cancer", label: "History of cancer", type: "toggle", points: 1 },
    { name: "cardiopulm", label: "History of chronic cardiopulmonary disease", type: "toggle", points: 1, description: "Heart failure or chronic lung disease" },
    { name: "hr", label: "Heart rate > 109/min", type: "toggle", points: 1 },
    { name: "sbp", label: "Systolic BP < 100 mmHg", type: "toggle", points: 1 },
    { name: "spo2", label: "O₂ saturation < 90%", type: "toggle", points: 1 }
  ],
  results: [
    { min: -Infinity, max: 1, label: "Score 0", risk: "Low Risk", mortality: "30-day mortality: ~1.0%", colorVar: "--color-primary" },
    { min: 1, max: Infinity, label: "Score ≥ 1", risk: "Intermediate / High Risk", mortality: "30-day mortality: ~10.9%", colorVar: "--color-danger" }
  ],
  thresholdNote: "Clinical severity threshold: sPESI ≥ 1 = High severity",
  citations: [
    "Jiménez D, et al. Simplification of the Pulmonary Embolism Severity Index for Prognostication in Patients With Acute Symptomatic PE. Arch Intern Med. 2010;170(15):1383-1389.",
    "Freund Y, et al. Acute Pulmonary Embolism: A Review. JAMA. 2022;328(13):1336-1345."
  ]
};
var CHA2DS2VASC_CALCULATOR = {
  id: "cha2ds2vasc",
  title: "CHA₂DS₂-VASc Score",
  subtitle: "Stroke Risk in Atrial Fibrillation",
  description: "The CHA₂DS₂-VASc score estimates stroke risk in patients with non-valvular atrial fibrillation to guide anticoagulation decisions. Score ranges from 0-9.",
  fields: [
    { name: "chf", label: "Congestive Heart Failure", type: "toggle", points: 1, description: "CHF or LV ejection fraction ≤40%" },
    { name: "htn", label: "Hypertension", type: "toggle", points: 1, description: "Resting BP >140/90 or current antihypertensive use" },
    { name: "age75", label: "Age ≥ 75 years", type: "toggle", points: 2 },
    { name: "diabetes", label: "Diabetes Mellitus", type: "toggle", points: 1, description: "Fasting glucose >125 or on hypoglycemic treatment" },
    { name: "stroke", label: "Stroke / TIA / Thromboembolism", type: "toggle", points: 2, description: "Prior stroke, TIA, or systemic embolism" },
    { name: "vascular", label: "Vascular Disease", type: "toggle", points: 1, description: "Prior MI, peripheral artery disease, or aortic plaque" },
    { name: "age65", label: "Age 65-74 years", type: "toggle", points: 1 },
    { name: "female", label: "Female Sex", type: "toggle", points: 1 }
  ],
  results: [
    { min: -Infinity, max: 1, label: "Score 0", risk: "Low Risk", mortality: "Annual stroke risk: 0%", colorVar: "--color-primary" },
    { min: 1, max: 2, label: "Score 1", risk: "Low-Moderate Risk", mortality: "Annual stroke risk: 1.3%", colorVar: "--color-warning" },
    { min: 2, max: 3, label: "Score 2", risk: "Moderate Risk", mortality: "Annual stroke risk: 2.2%", colorVar: "--color-warning" },
    { min: 3, max: 4, label: "Score 3", risk: "Moderate-High Risk", mortality: "Annual stroke risk: 3.2%", colorVar: "--color-danger" },
    { min: 4, max: 5, label: "Score 4", risk: "High Risk", mortality: "Annual stroke risk: 4.0%", colorVar: "--color-danger" },
    { min: 5, max: 6, label: "Score 5", risk: "High Risk", mortality: "Annual stroke risk: 6.7%", colorVar: "--color-danger" },
    { min: 6, max: 7, label: "Score 6", risk: "Very High Risk", mortality: "Annual stroke risk: 9.8%", colorVar: "--color-danger" },
    { min: 7, max: 8, label: "Score 7", risk: "Very High Risk", mortality: "Annual stroke risk: 9.6%", colorVar: "--color-danger" },
    { min: 8, max: 9, label: "Score 8", risk: "Very High Risk", mortality: "Annual stroke risk: 6.7%", colorVar: "--color-danger" },
    { min: 9, max: Infinity, label: "Score 9", risk: "Very High Risk", mortality: "Annual stroke risk: 15.2%", colorVar: "--color-danger" }
  ],
  thresholdNote: "Score ≥2 (men) or ≥3 (women): Anticoagulation recommended. Score 1 (men) or 2 (women): Consider anticoagulation. Score 0 (men) or 1 (women): May omit anticoagulation.",
  citations: [
    "Lip GY, et al. Refining Clinical Risk Stratification for Predicting Stroke and Thromboembolism in Atrial Fibrillation Using a Novel Risk Factor-Based Approach: The Euro Heart Survey on Atrial Fibrillation. Chest. 2010;137(2):263-272.",
    "Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. J Am Coll Cardiol. 2024;83(1):109-279."
  ]
};
var CALCULATORS = {
  pesi: PESI_CALCULATOR,
  spesi: SPESI_CALCULATOR,
  cha2ds2vasc: CHA2DS2VASC_CALCULATOR
};
function getAllCalculators() {
  return Object.values(CALCULATORS).map((c) => ({ id: c.id, title: c.title, subtitle: c.subtitle })).sort((a, b) => a.title.localeCompare(b.title));
}
function renderCalculatorList(container) {
  container.innerHTML = "";
  const backBtn = document.createElement("button");
  backBtn.className = "btn-text";
  backBtn.textContent = "← Categories";
  backBtn.addEventListener("click", () => router.navigate("/"));
  container.appendChild(backBtn);
  const header = document.createElement("div");
  header.className = "category-view-header";
  const icon = document.createElement("span");
  icon.className = "category-view-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "\uD83E\uDDEE";
  const name = document.createElement("h2");
  name.className = "category-view-name";
  name.textContent = "Medical Calculators";
  header.appendChild(icon);
  header.appendChild(name);
  container.appendChild(header);
  const searchWrap = document.createElement("div");
  searchWrap.className = "calculator-search-wrap";
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "calculator-search-input";
  searchInput.placeholder = "Search calculators…";
  searchInput.setAttribute("aria-label", "Search calculators");
  searchWrap.appendChild(searchInput);
  container.appendChild(searchWrap);
  const list = document.createElement("div");
  list.className = "tree-list";
  container.appendChild(list);
  const allCalcs = getAllCalculators();
  function renderList(filter) {
    list.innerHTML = "";
    const query = filter.toLowerCase().trim();
    const filtered = query ? allCalcs.filter((c) => c.title.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query)) : allCalcs;
    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      const emptyText = document.createElement("p");
      emptyText.textContent = "No calculators match your search.";
      empty.appendChild(emptyText);
      list.appendChild(empty);
      return;
    }
    for (const calc of filtered) {
      const card = document.createElement("button");
      card.className = "tree-card";
      card.setAttribute("aria-label", `${calc.title} — ${calc.subtitle}`);
      card.addEventListener("click", () => {
        router.navigate(`/calculator/${calc.id}`);
      });
      const title = document.createElement("div");
      title.className = "tree-card-title";
      title.textContent = calc.title;
      const subtitle = document.createElement("div");
      subtitle.className = "tree-card-subtitle";
      subtitle.textContent = calc.subtitle;
      card.appendChild(title);
      card.appendChild(subtitle);
      list.appendChild(card);
    }
  }
  searchInput.addEventListener("input", () => renderList(searchInput.value));
  renderList("");
}
function renderCalculator(container, calculatorId) {
  const calc = CALCULATORS[calculatorId];
  if (!calc) {
    renderCalcNotFound(container, calculatorId);
    return;
  }
  container.innerHTML = "";
  const backBtn = document.createElement("button");
  backBtn.className = "btn-text";
  backBtn.textContent = "← Back";
  backBtn.addEventListener("click", () => history.back());
  container.appendChild(backBtn);
  const header = document.createElement("div");
  header.className = "calculator-header";
  const title = document.createElement("h1");
  title.className = "calculator-title";
  title.textContent = calc.title;
  header.appendChild(title);
  const subtitle = document.createElement("p");
  subtitle.className = "calculator-subtitle";
  subtitle.textContent = calc.subtitle;
  header.appendChild(subtitle);
  container.appendChild(header);
  const desc = document.createElement("p");
  desc.className = "calculator-description";
  desc.textContent = calc.description;
  container.appendChild(desc);
  const scoreDisplay = document.createElement("div");
  scoreDisplay.className = "calculator-score-display";
  scoreDisplay.id = "calc-score-display";
  container.appendChild(scoreDisplay);
  const form = document.createElement("div");
  form.className = "calculator-form";
  const fieldValues = {};
  for (const field of calc.fields) {
    fieldValues[field.name] = 0;
  }
  for (const field of calc.fields) {
    const fieldEl = document.createElement("div");
    fieldEl.className = "calculator-field";
    if (field.type === "number") {
      renderNumberField(fieldEl, field, fieldValues, () => updateScore(calc, fieldValues, scoreDisplay));
    } else {
      renderToggleField(fieldEl, field, fieldValues, () => updateScore(calc, fieldValues, scoreDisplay));
    }
    form.appendChild(fieldEl);
  }
  container.appendChild(form);
  const threshold = document.createElement("div");
  threshold.className = "calculator-threshold";
  threshold.textContent = calc.thresholdNote;
  container.appendChild(threshold);
  const citationSection = document.createElement("details");
  citationSection.className = "calculator-citations";
  const citSummary = document.createElement("summary");
  citSummary.textContent = `References (${calc.citations.length})`;
  citationSection.appendChild(citSummary);
  const citList = document.createElement("ol");
  citList.className = "calculator-citation-list";
  for (const cit of calc.citations) {
    const li = document.createElement("li");
    li.textContent = cit;
    citList.appendChild(li);
  }
  citationSection.appendChild(citList);
  container.appendChild(citationSection);
  updateScore(calc, fieldValues, scoreDisplay);
}
function renderNumberField(container, field, values, onChange) {
  const label = document.createElement("label");
  label.className = "calculator-field-label";
  label.textContent = field.label;
  container.appendChild(label);
  if (field.description) {
    const desc = document.createElement("span");
    desc.className = "calculator-field-desc";
    desc.textContent = field.description;
    container.appendChild(desc);
  }
  const inputRow = document.createElement("div");
  inputRow.className = "calculator-number-row";
  const input = document.createElement("input");
  input.type = "number";
  input.className = "calculator-number-input";
  input.inputMode = "numeric";
  input.min = "0";
  input.max = "150";
  input.placeholder = "0";
  input.setAttribute("aria-label", field.label);
  input.addEventListener("input", () => {
    const val = parseInt(input.value, 10);
    values[field.name] = isNaN(val) ? 0 : val;
    onChange();
  });
  inputRow.appendChild(input);
  if (field.unit) {
    const unit = document.createElement("span");
    unit.className = "calculator-number-unit";
    unit.textContent = field.unit;
    inputRow.appendChild(unit);
  }
  container.appendChild(inputRow);
  const points = document.createElement("span");
  points.className = "calculator-field-points";
  points.textContent = field.valueIsPoints ? "pts = age" : `+${field.points} pts`;
  container.appendChild(points);
}
function renderToggleField(container, field, values, onChange) {
  const row = document.createElement("div");
  row.className = "calculator-toggle-row";
  const labelWrap = document.createElement("div");
  labelWrap.className = "calculator-toggle-label-wrap";
  const label = document.createElement("span");
  label.className = "calculator-field-label";
  label.textContent = field.label;
  labelWrap.appendChild(label);
  if (field.description) {
    const desc = document.createElement("span");
    desc.className = "calculator-field-desc";
    desc.textContent = field.description;
    labelWrap.appendChild(desc);
  }
  row.appendChild(labelWrap);
  const pointsBadge = document.createElement("span");
  pointsBadge.className = "calculator-field-points";
  pointsBadge.textContent = `+${field.points}`;
  row.appendChild(pointsBadge);
  const toggleLabel = document.createElement("label");
  toggleLabel.className = "calculator-toggle";
  toggleLabel.setAttribute("aria-label", `${field.label}: toggle`);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "calculator-toggle-input";
  const slider = document.createElement("span");
  slider.className = "calculator-toggle-slider";
  toggleLabel.appendChild(checkbox);
  toggleLabel.appendChild(slider);
  row.appendChild(toggleLabel);
  checkbox.addEventListener("change", () => {
    values[field.name] = checkbox.checked ? field.points : 0;
    onChange();
  });
  container.appendChild(row);
}
function updateScore(calc, values, display) {
  let score = 0;
  for (const field of calc.fields) {
    if (field.valueIsPoints) {
      score += values[field.name];
    } else {
      score += values[field.name];
    }
  }
  let result = null;
  for (const r of calc.results) {
    if (score >= r.min && score < r.max) {
      result = r;
      break;
    }
  }
  display.innerHTML = "";
  const scoreNum = document.createElement("div");
  scoreNum.className = "calculator-score-number";
  scoreNum.textContent = String(score);
  display.appendChild(scoreNum);
  if (result) {
    const badge = document.createElement("div");
    badge.className = "calculator-risk-badge";
    badge.style.borderColor = `var(${result.colorVar})`;
    badge.style.color = `var(${result.colorVar})`;
    const classLabel = document.createElement("span");
    classLabel.className = "calculator-risk-class";
    classLabel.textContent = result.label;
    badge.appendChild(classLabel);
    const riskLabel = document.createElement("span");
    riskLabel.className = "calculator-risk-level";
    riskLabel.textContent = result.risk;
    badge.appendChild(riskLabel);
    display.appendChild(badge);
    const mortality = document.createElement("div");
    mortality.className = "calculator-mortality";
    mortality.textContent = result.mortality;
    display.appendChild(mortality);
  }
}
function renderCalcNotFound(container, id) {
  container.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "empty-state";
  const icon = document.createElement("div");
  icon.className = "empty-state-icon";
  icon.textContent = "❓";
  const title = document.createElement("h3");
  title.textContent = "Calculator Not Found";
  const sub = document.createElement("p");
  sub.textContent = `No calculator with ID "${id}" exists.`;
  const homeBtn = document.createElement("button");
  homeBtn.className = "btn-primary";
  homeBtn.textContent = "Go Home";
  homeBtn.style.marginTop = "16px";
  homeBtn.addEventListener("click", () => router.navigate("/"));
  wrap.appendChild(icon);
  wrap.appendChild(title);
  wrap.appendChild(sub);
  wrap.appendChild(homeBtn);
  container.appendChild(wrap);
}

// src/data/drug-store.ts
var ALTEPLASE = {
  id: "alteplase",
  name: "Alteplase (tPA)",
  genericName: "Alteplase",
  drugClass: "Thrombolytic (tissue plasminogen activator)",
  route: "IV",
  indications: ["Massive (high-risk) pulmonary embolism", "Acute ischemic stroke", "Acute STEMI"],
  dosing: [
    {
      indication: "High-risk PE",
      regimen: "100 mg IV over 2 hours: 0.6 mg/kg (max 50 mg) over first 15 min, remainder over next 1 hr 45 min. Stop UFH drip before infusion. Post-infusion: check PTT — if ≤75 restart UFH without bolus; if >75 repeat PTT q2hr until ≤75."
    }
  ],
  contraindications: [
    "Absolute: Haemorrhagic stroke or stroke of unknown origin, Ischaemic stroke within 6 months, CNS neoplasm, Major trauma/surgery/head injury within 3 weeks, Bleeding diathesis, Active bleeding",
    "Relative: TIA within 6 months, Oral anticoagulation, Pregnancy or first postpartum week, Non-compressible puncture sites, Traumatic resuscitation, Refractory HTN (SBP >180), Advanced liver disease, Infective endocarditis, Active peptic ulcer"
  ],
  monitoring: "Assess hemodynamic response 1–2 hours post-infusion. Check PTT before restarting heparin.",
  notes: "Fibrinolytic therapy is the first-line reperfusion strategy for high-risk PE with hemodynamic instability (ESC 2019, Class I, Level B).",
  citations: [
    "Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603."
  ]
};
var AMIODARONE = {
  id: "amiodarone",
  name: "Amiodarone",
  genericName: "Amiodarone hydrochloride",
  drugClass: "Class III antiarrhythmic (multichannel blocker)",
  route: "IV / PO",
  indications: ["A-Fib / A-Flutter rate control", "A-Fib / A-Flutter rhythm control (cardioversion)", "Ventricular tachycardia", "Cardiac arrest (VF/pulseless VT)"],
  dosing: [
    {
      indication: "A-Fib rate control",
      regimen: "Load: 150 mg IV over 10 min. Infusion: 1 mg/min x 6 hr, then 0.5 mg/min x 18 hr. May re-bolus 150 mg x2-3 PRN (total 150-450 mg boluses). Do not conclude failure without adequate re-bolusing."
    },
    {
      indication: "A-Fib rhythm control (cardioversion)",
      regimen: "Load: 300 mg (or 5-7 mg/kg) IV over 30-60 min. Then 1 mg/min infusion. Total 24hr IV dose: 1,200-3,000 mg. Convert to PO 400 mg BID after >24hr IV, until 10g cumulative dose reached, then 200 mg daily maintenance."
    },
    {
      indication: "Cardiac arrest (VF/pVT)",
      regimen: "300 mg IV/IO push. May repeat 150 mg x1."
    }
  ],
  contraindications: [
    "Cardiogenic shock",
    "Severe sinus node dysfunction without pacemaker",
    "Second/third-degree AV block without pacemaker",
    "Known hypersensitivity to iodine (contains iodine)"
  ],
  cautions: [
    "QT prolongation — monitor QTc, hold if QTc >500ms",
    "Hepatotoxicity — check LFTs at baseline and periodically",
    "Thyroid dysfunction (both hypo and hyper) — contains 37% iodine by weight",
    "Pulmonary toxicity with chronic use — baseline CXR and PFTs recommended",
    "Phlebitis with peripheral IV — use central line when possible for infusions >24hr",
    "Potentiates warfarin — reduce warfarin dose by 30-50% when initiating"
  ],
  monitoring: "Continuous telemetry during IV loading. QTc interval. LFTs, TFTs, CXR at baseline. For chronic use: TFTs, LFTs, PFTs, ophthalmologic exam every 6-12 months.",
  notes: "Amiodarone is useful for critically ill patients due to relative hemodynamic stability compared to beta-blockers and CCBs. Achieves rate control in ~74% of patients. Chemical cardioversion may occur — continue infusion until critical illness resolves to prevent AF recurrence. Chronic use causes numerous side effects — plan transition to safer long-term agent (e.g., beta-blocker) after recovery.",
  citations: [
    "Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.",
    "Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.",
    "Bosch NA, et al. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434."
  ]
};
var APIXABAN = {
  id: "apixaban",
  name: "Apixaban",
  genericName: "Apixaban",
  drugClass: "Direct oral anticoagulant (Factor Xa inhibitor)",
  route: "PO",
  indications: ["Pulmonary embolism", "Deep vein thrombosis", "Atrial fibrillation (stroke prevention)"],
  dosing: [
    {
      indication: "PE / DVT treatment",
      regimen: "10 mg twice daily × 7 days, then 5 mg twice daily × 3–6 months. Extended therapy: 5 mg or 2.5 mg twice daily."
    }
  ],
  cautions: [
    "Severe renal impairment (CrCl <25 mL/min) — limited data",
    "Moderate hepatic impairment (Child-Pugh B) — use with caution",
    "Strong CYP3A4 and P-gp inhibitors/inducers — avoid concomitant use"
  ],
  notes: "Single-drug oral therapy — no initial parenteral heparin required. Particularly convenient for outpatient PE management.",
  citations: [
    "Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.",
    "Renner E, Barnes GD. Antithrombotic Management of VTE: JACC Focus Seminar. J Am Coll Cardiol. 2020."
  ]
};
var BENZATHINE_PENICILLIN = {
  id: "benzathine-penicillin",
  name: "Benzathine Penicillin G",
  genericName: "Benzathine penicillin G",
  drugClass: "Natural penicillin (long-acting IM depot)",
  route: "IM",
  indications: ["Primary syphilis", "Secondary syphilis", "Early latent syphilis", "Late latent syphilis", "Tertiary syphilis (non-neurologic)"],
  dosing: [
    {
      indication: "Primary / Secondary / Early latent syphilis",
      regimen: "2.4 million units IM × 1 dose."
    },
    {
      indication: "Late latent / Tertiary syphilis (non-neurologic)",
      regimen: "2.4 million units IM weekly × 3 weeks (3 doses)."
    }
  ],
  contraindications: [
    "Penicillin allergy (IgE-mediated / anaphylaxis)"
  ],
  cautions: [
    "Jarisch-Herxheimer reaction — fever, myalgia, headache within 24 hr of treatment. Self-limited. More common in secondary syphilis.",
    "Does NOT achieve treponemicidal levels in CSF — not adequate for neurosyphilis."
  ],
  monitoring: "Quantitative RPR at 6, 12, and 24 months post-treatment. Expect 4-fold decline by 6–12 months.",
  citations: [
    "CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.",
    "IDSA. Practice Guidelines for the Management of Syphilis. 2025."
  ]
};
var CEFTRIAXONE = {
  id: "ceftriaxone",
  name: "Ceftriaxone",
  genericName: "Ceftriaxone",
  drugClass: "Third-generation cephalosporin",
  route: "IV",
  indications: ["Neurosyphilis (PCN allergy alternative)", "Bacterial meningitis", "Various serious infections"],
  dosing: [
    {
      indication: "Neurosyphilis (if desensitization not feasible)",
      regimen: "2 g IV daily × 10–14 days."
    }
  ],
  contraindications: [
    "Severe cephalosporin allergy",
    "Note: ~2–5% cross-reactivity with penicillin allergy — lower than historically believed"
  ],
  cautions: [
    "Biliary sludging — avoid co-administration with calcium-containing IV solutions in neonates",
    "Not first-line for neurosyphilis — limited evidence compared to IV penicillin G. Use only if desensitization is not feasible."
  ],
  monitoring: "CSF re-examination at 6 months post-treatment to document improvement.",
  citations: [
    "CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.",
    "Marra CM, et al. Ceftriaxone for Neurosyphilis. Clin Infect Dis. 2019."
  ]
};
var DABIGATRAN = {
  id: "dabigatran",
  name: "Dabigatran",
  genericName: "Dabigatran etexilate",
  drugClass: "Direct oral anticoagulant (Direct thrombin inhibitor)",
  route: "PO",
  indications: ["Pulmonary embolism", "Deep vein thrombosis", "Atrial fibrillation (stroke prevention)"],
  dosing: [
    {
      indication: "PE / DVT treatment",
      regimen: "Requires 5–10 days parenteral anticoagulation (LMWH or UFH) first, then 150 mg twice daily."
    }
  ],
  cautions: [
    "CrCl <30 mL/min — contraindicated (predominantly renal clearance ~80%)",
    "Strong P-gp inhibitors in CrCl <50 mL/min — dose reduction or avoidance",
    "No dose adjustment for hepatic impairment (not hepatically metabolized)"
  ],
  notes: "Requires initial parenteral anticoagulation bridge (unlike apixaban/rivaroxaban). Specific reversal agent: idarucizumab (Praxbind).",
  citations: [
    "Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022."
  ]
};
var DIGOXIN = {
  id: "digoxin",
  name: "Digoxin",
  genericName: "Digoxin",
  drugClass: "Cardiac glycoside",
  route: "IV / PO",
  indications: ["A-Fib / A-Flutter rate control (adjunctive)", "Heart failure with reduced EF"],
  dosing: [
    {
      indication: "A-Fib rate control (acute)",
      regimen: "IV loading: 0.25 mg IV every 2 hours, up to 1.5 mg total. Onset: ~3 hours (vs 5 min for diltiazem). Slow onset makes it unsuitable as sole agent for acute rate control."
    },
    {
      indication: "A-Fib rate control (maintenance)",
      regimen: "0.125-0.25 mg PO daily. Adjust for renal function and age."
    }
  ],
  contraindications: [
    "Hypertrophic obstructive cardiomyopathy (HOCM)",
    "WPW syndrome with atrial fibrillation",
    "Ventricular tachycardia/fibrillation",
    "Severe hypokalemia (increases toxicity risk)"
  ],
  cautions: [
    "Renal impairment — reduce dose, monitor levels (CrCl <50: reduce dose 50%)",
    "Hypokalemia and hypomagnesemia potentiate toxicity",
    "Post hoc analyses associate digoxin with increased mortality in AF — use at low doses",
    "Limited exertional efficacy — slows primarily resting heart rate",
    "Narrow therapeutic index — toxicity at levels >2.0 ng/mL",
    "Drug interactions: amiodarone increases digoxin levels 70-100%"
  ],
  monitoring: "Serum digoxin level (target 0.5-0.9 ng/mL for AF). Serum potassium, magnesium, creatinine. ECG for toxicity signs (ST scooping, PAT with block, bidirectional VT).",
  notes: "Best used as adjunctive therapy when hypotension limits further titration of beta-blockers or CCBs. Particularly useful in patients with concurrent heart failure. Avoid as sole agent for acute rate control due to slow onset. Use at lowest effective dose given mortality concerns.",
  citations: [
    "Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.",
    "Michaud GF, Stevenson WG. Atrial Fibrillation. N Engl J Med. 2021;384(4):353-361.",
    "Ko D, et al. Atrial Fibrillation: A Review. JAMA. 2025;333(4):329-342."
  ]
};
var DILTIAZEM = {
  id: "diltiazem",
  name: "Diltiazem",
  genericName: "Diltiazem hydrochloride",
  drugClass: "Nondihydropyridine calcium channel blocker",
  route: "IV",
  indications: ["A-Fib / A-Flutter rate control", "Supraventricular tachycardia"],
  dosing: [
    {
      indication: "A-Fib rate control (acute)",
      regimen: "Initial bolus: 0.25 mg/kg IV over 2 min (typically 20-25 mg). If inadequate response after 15 min, second bolus: 0.35 mg/kg IV over 2 min. Then continuous infusion: 5-15 mg/hr, titrate to heart rate."
    }
  ],
  contraindications: [
    "EF ≤40% or moderate-to-severe LV systolic dysfunction (Class 3: Harm)",
    "Decompensated heart failure",
    "Severe hypotension (SBP <90)",
    "Sick sinus syndrome without pacemaker",
    "Second/third-degree AV block without pacemaker",
    "WPW with atrial fibrillation",
    "Concurrent IV beta-blocker use"
  ],
  cautions: [
    "Hypotension — most common adverse effect, especially with continuous infusion",
    "Obtain echo or check history for EF if unknown — CCBs are dangerous in HFrEF",
    "Accumulation with prolonged infusions — monitor closely and titrate down when able",
    "Negative inotropic effects may worsen borderline hemodynamics",
    "Consider metoprolol over diltiazem in critically ill patients due to lower hypotension risk"
  ],
  monitoring: "Continuous heart rate and blood pressure monitoring during IV infusion. Reassess hemodynamics frequently. Transition to oral rate control agent when stable.",
  notes: "Achieves rate control more rapidly than digoxin or amiodarone (90% vs 74%, with faster time to HR <90). First-line for A-Fib rate control when EF >40%. Do NOT combine with IV beta-blockers — risk of synergistic hypotension and bradycardia.",
  citations: [
    "Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.",
    "Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577."
  ]
};
var DOXYCYCLINE = {
  id: "doxycycline",
  name: "Doxycycline",
  genericName: "Doxycycline",
  drugClass: "Tetracycline antibiotic",
  route: "PO",
  indications: ["Syphilis (PCN allergy alternative)", "Chlamydia", "Tick-borne diseases", "Acne", "Malaria prophylaxis"],
  dosing: [
    {
      indication: "Primary / Secondary / Early latent syphilis (PCN allergy)",
      regimen: "100 mg PO BID × 14 days."
    },
    {
      indication: "Late latent / Tertiary syphilis (PCN allergy)",
      regimen: "100 mg PO BID × 28 days."
    }
  ],
  contraindications: [
    "Pregnancy — tetracyclines cause fetal bone/teeth abnormalities",
    "Children < 8 years (tooth discoloration)"
  ],
  cautions: [
    "Photosensitivity — advise sun protection",
    "Esophageal ulceration — take with full glass of water, remain upright 30 min",
    "Not adequate for neurosyphilis — poor CSF penetration"
  ],
  monitoring: "Quantitative RPR at 6, 12, and 24 months post-treatment.",
  notes: "Alternative for non-pregnant PCN-allergic patients with early syphilis. Evidence is weaker than for penicillin G.",
  citations: [
    "CDC. Sexually Transmitted Infections Treatment Guidelines. 2021."
  ]
};
var EDOXABAN = {
  id: "edoxaban",
  name: "Edoxaban",
  genericName: "Edoxaban",
  drugClass: "Direct oral anticoagulant (Factor Xa inhibitor)",
  route: "PO",
  indications: ["Pulmonary embolism", "Deep vein thrombosis", "Atrial fibrillation (stroke prevention)"],
  dosing: [
    {
      indication: "PE / DVT treatment",
      regimen: "Requires 5–10 days parenteral anticoagulation (LMWH) first, then 60 mg once daily. Reduce to 30 mg once daily if: CrCl 15–50 mL/min, body weight <60 kg, or concomitant P-glycoprotein inhibitors."
    }
  ],
  cautions: [
    "CrCl >95 mL/min — reduced efficacy vs warfarin (avoid in AF indication)",
    "CrCl <15 mL/min — not recommended",
    "Moderate-severe hepatic impairment — not recommended"
  ],
  notes: "Requires initial parenteral anticoagulation bridge. Once-daily dosing may improve adherence.",
  citations: [
    "Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022."
  ]
};
var EPINEPHRINE = {
  id: "epinephrine",
  name: "Epinephrine (Intracavernosal)",
  genericName: "Epinephrine",
  drugClass: "Non-selective adrenergic agonist (alpha + beta)",
  route: "Intracavernosal",
  indications: ["Ischemic priapism (alternative to phenylephrine)"],
  dosing: [
    {
      indication: "Ischemic priapism",
      regimen: "20 mcg (2 mL of 10 mcg/mL solution) intracavernosal every 5 minutes, up to 5 doses total (100 mcg max). Mix: 1 mL epi from cardiac amp (100 mcg/mL) + 9 mL NS = 10 mcg/mL."
    }
  ],
  contraindications: [
    "Uncontrolled hypertension",
    "MAO inhibitor use",
    "Do NOT give cardiac arrest doses (1 mg) to patients with a pulse"
  ],
  cautions: [
    "Has alpha AND beta1/2 effects — higher cardiovascular risk than phenylephrine",
    "Monitor BP and HR every 5 min between injections",
    "Hold if SBP > 160 or HR > 110"
  ],
  monitoring: "BP/HR every 5 min during injections. Observe 60 min post-detumescence.",
  notes: `Use only if phenylephrine is unavailable. Phenylephrine is preferred due to pure alpha-1 selectivity and lower cardiovascular risk. Onset: 1 min. Duration: 5–10 min.

MIXING INSTRUCTIONS (10 mcg/mL):
1. Take a 10 mL syringe and draw up 9 mL of normal saline
2. Draw up 1 mL of epinephrine from the cardiac amp (cardiac amp contains 100 mcg/mL)
3. Now you have 10 mL of epinephrine at 10 mcg/mL
4. Each dose = 2 mL (20 mcg)

⚠️ Do NOT give cardiac arrest doses (1 mg) to patients with a pulse.`,
  citations: [
    "Bivalacqua TJ, et al. AUA/SMSNA Guideline on Priapism. J Urol. 2022;208(1):43-52.",
    "Graham BA, et al. Emergency Pharmacotherapy for Priapism. Expert Opin Pharmacother. 2022;23(12):1371-80."
  ]
};
var ENOXAPARIN = {
  id: "enoxaparin",
  name: "Enoxaparin (LMWH)",
  genericName: "Enoxaparin sodium",
  drugClass: "Low molecular weight heparin",
  route: "SC",
  indications: ["Pulmonary embolism", "Deep vein thrombosis", "ACS", "VTE prophylaxis"],
  dosing: [
    {
      indication: "PE / DVT treatment",
      regimen: "1 mg/kg SC every 12 hours, or 1.5 mg/kg SC once daily."
    },
    {
      indication: "VTE prophylaxis",
      regimen: "40 mg SC once daily."
    }
  ],
  contraindications: [
    "Heparin-induced thrombocytopenia (HIT) — absolute contraindication due to cross-reactivity with HIT antibodies",
    "Active major bleeding"
  ],
  cautions: [
    "Severe renal insufficiency (CrCl ≤30 mL/min) — significantly increased bleeding risk (OR 2.25 for major bleeding). Consider UFH when CrCl <25–30 mL/min.",
    "Neuraxial anesthesia — administer LMWH ≥12 hr before catheter placement/removal; delay dosing ≥4 hr after removal. No twice-daily LMWH with indwelling neuraxial catheter.",
    "Extreme body weight (<40 kg or >100 kg), pregnancy, pediatrics — consider anti-Xa monitoring. Monitor if >150 kg.",
    "Effects cannot be completely reversed by protamine sulfate."
  ],
  monitoring: "Anti-Xa levels if renal impairment, extremes of weight, or pregnancy. Platelet count if > 4 days of therapy (HIT screening).",
  citations: [
    "Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020.",
    "Garcia DA, et al. Parenteral Anticoagulants: ACCP Evidence-Based Clinical Practice Guidelines. Chest. 2012."
  ]
};
var ESMOLOL = {
  id: "esmolol",
  name: "Esmolol",
  genericName: "Esmolol hydrochloride",
  drugClass: "Ultra-short-acting beta-1 selective blocker",
  route: "IV",
  indications: ["A-Fib / A-Flutter rate control", "Supraventricular tachycardia", "Perioperative tachycardia/hypertension"],
  dosing: [
    {
      indication: "A-Fib rate control",
      regimen: "Loading dose: 500 mcg/kg IV over 1 minute. Infusion: 50-200 mcg/kg/min, titrate by 50 mcg/kg/min every 4 min. May repeat loading dose with each infusion increase."
    }
  ],
  contraindications: [
    "Severe sinus bradycardia",
    "Heart block greater than first degree without pacemaker",
    "Cardiogenic shock",
    "Decompensated heart failure",
    "WPW with atrial fibrillation"
  ],
  cautions: [
    "Hypotension — may occur especially at higher infusion rates",
    "Must be given as continuous infusion — eliminated within 9 min of stopping",
    "Use cautiously in patients on calcium channel blockers — risk of additive bradycardia/hypotension",
    "Bronchospasm — theoretical risk, though beta-1 selectivity is lost at high doses"
  ],
  monitoring: "Continuous heart rate and blood pressure monitoring during infusion. Effects resolve within minutes of discontinuation — ideal for titration.",
  notes: "Ultra-short-acting beta-blocker (half-life ~9 min). Particularly useful when rapid titration or reversal is needed — if hypotension occurs, effects resolve within minutes of stopping infusion. Ideal for patients with uncertain hemodynamics or when testing beta-blocker tolerance before committing to longer-acting agents.",
  citations: [
    "Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.",
    "Prystowsky EN, et al. Treatment of Atrial Fibrillation. JAMA. 2015;314(3):278-88."
  ]
};
var LIDOCAINE = {
  id: "lidocaine",
  name: "Lidocaine 1% (Without Epinephrine)",
  genericName: "Lidocaine",
  drugClass: "Amide local anesthetic",
  route: "Local injection",
  indications: ["Dorsal penile nerve block", "Local anesthesia for minor procedures", "Nerve blocks"],
  dosing: [
    {
      indication: "Dorsal penile nerve block",
      regimen: "10 mL total of 1% lidocaine WITHOUT epinephrine: 5 mL injected at 10 o’clock and 5 mL at 2 o’clock at penile base, under Buck’s fascia."
    }
  ],
  contraindications: [
    "Allergy to amide local anesthetics",
    "NEVER use with epinephrine on the penis — end-artery territory, risk of ischemic necrosis"
  ],
  cautions: [
    "Max dose without epi: 4.5 mg/kg",
    "Aspirate before injecting to avoid intravascular injection",
    "Wait 5–10 min for full anesthetic effect"
  ],
  monitoring: "Test block adequacy with pinprick before procedure. Onset: 2–5 min. Duration: 30–60 min.",
  notes: "For penile block, NEVER use formulations containing epinephrine. The penis is supplied by end-arteries — epinephrine can cause ischemic necrosis.",
  citations: [
    "Burnett AL, Sharlip ID. Standard Operating Procedures for Priapism. J Sex Med. 2013;10(1):180-94."
  ]
};
var MAGNESIUM_SULFATE = {
  id: "magnesium-sulfate",
  name: "Magnesium Sulfate",
  genericName: "Magnesium sulfate",
  drugClass: "Electrolyte / Antiarrhythmic adjunct",
  route: "IV",
  indications: ["A-Fib / A-Flutter adjunctive rate and rhythm control", "Torsades de pointes", "Hypomagnesemia", "Eclampsia / Pre-eclampsia seizure prophylaxis"],
  dosing: [
    {
      indication: "A-Fib (adjunctive)",
      regimen: "Bolus: 2-4 g IV over 15-30 min. For aggressive repletion: continuous infusion per institutional protocol. Target serum level ~3-4 mg/dL for antiarrhythmic effect. Most administered magnesium is renally excreted — continuous infusion may be needed to replete intracellular stores."
    },
    {
      indication: "Torsades de pointes",
      regimen: "1-2 g IV over 5-60 min (faster for unstable patients)."
    }
  ],
  contraindications: [
    "Severe renal failure (GFR <30 mL/min or oliguria) for continuous infusion — use intermittent boluses instead",
    "Hypermagnesemia (>4 mg/dL)",
    "Myasthenia gravis (may worsen weakness)"
  ],
  cautions: [
    "Monitor for hypermagnesemia: loss of deep tendon reflexes (first sign), respiratory depression, cardiac arrest",
    "Check renal function before continuous infusion",
    "Calcium gluconate 1g IV is the antidote for magnesium toxicity"
  ],
  monitoring: "Serum magnesium levels every 6-8 hours during infusion. Deep tendon reflexes. Respiratory rate. Renal function.",
  notes: "Excellent safety profile — one meta-analysis detected no reported adverse events. Blocks slow calcium channels in SA and AV nodes. Even when cardioversion does not occur, magnesium reduces heart rate and augments efficacy of other antiarrhythmics and DC cardioversion. In one RCT, continuous magnesium infusion was superior to amiodarone for new-onset AF. The combination of aggressive magnesium loading plus amiodarone achieved 90% cardioversion rate in critically ill patients.",
  citations: [
    "Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.",
    "Moran JL, et al. Parenteral MgSO4 vs Amiodarone for Atrial Tachyarrhythmias. Crit Care Med. 1995;23(11):1816-24.",
    "Bosch NA, et al. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434."
  ]
};
var METOPROLOL = {
  id: "metoprolol",
  name: "Metoprolol",
  genericName: "Metoprolol tartrate (IV) / Metoprolol succinate (PO)",
  drugClass: "Beta-1 selective adrenergic blocker",
  route: "IV / PO",
  indications: ["A-Fib / A-Flutter rate control", "Hypertension", "Heart failure (compensated, oral succinate)", "Post-MI"],
  dosing: [
    {
      indication: "A-Fib rate control (acute)",
      regimen: "IV: 2.5-5 mg IV push over 2 min. Repeat every 5 min as needed, up to 15 mg total (3 doses)."
    },
    {
      indication: "A-Fib rate control (maintenance)",
      regimen: "PO tartrate: 25-100 mg BID. PO succinate (Toprol XL): 25-200 mg daily."
    }
  ],
  contraindications: [
    "Severe sinus bradycardia (HR <50)",
    "Heart block greater than first degree without pacemaker",
    "Cardiogenic shock",
    "Decompensated heart failure (acute)",
    "WPW with atrial fibrillation"
  ],
  cautions: [
    "Safe in COPD — multiple studies demonstrate no adverse respiratory effects",
    "Use cautiously in decompensated HF but safe in compensated HFrEF",
    "May mask hypoglycemia symptoms in diabetic patients",
    "Do NOT combine with IV calcium channel blockers",
    "Intermittent dosing naturally encourages dose-by-dose reassessment — advantage over continuous infusions in unstable patients"
  ],
  monitoring: "Heart rate and blood pressure before each IV dose. Hold if SBP <90 or HR <55.",
  notes: "First-line for A-Fib rate control (Class 1 recommendation). Preferred in patients with CAD or compensated HFrEF. Many critically ill patients develop AF due to increased sympathetic tone — beta-blockers address the underlying physiological problem. A retrospective ICU study found lower failure rates with metoprolol vs diltiazem.",
  citations: [
    "Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for AF. J Am Coll Cardiol. 2024;83(1):109-279.",
    "Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.",
    "Moskowitz A, et al. Management of AF with RVR in the ICU. Shock. 2017;48(4):436-440."
  ]
};
var PENICILLIN_G_IV = {
  id: "penicillin-g-iv",
  name: "Penicillin G (Aqueous Crystalline)",
  genericName: "Aqueous crystalline penicillin G",
  drugClass: "Natural penicillin (IV formulation)",
  route: "IV",
  indications: ["Neurosyphilis", "Ocular syphilis", "Otosyphilis"],
  dosing: [
    {
      indication: "Neurosyphilis / Ocular / Otic syphilis",
      regimen: "18–24 million units/day IV, given as 3–4 million units IV q4h × 10–14 days. Achieves treponemicidal levels in CSF."
    }
  ],
  contraindications: [
    "Penicillin allergy (IgE-mediated / anaphylaxis) — consider desensitization if no alternative"
  ],
  cautions: [
    "Jarisch-Herxheimer reaction — more common with higher organism burden",
    "Requires IV access and inpatient admission for duration of therapy"
  ],
  monitoring: "CSF re-examination at 6 months. If CSF cell count not normalized, consider re-treatment. Quantitative RPR at 6, 12, 24 months.",
  citations: [
    "CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.",
    "Ropper AH. Neurosyphilis. N Engl J Med. 2019;381(14):1358-1363."
  ]
};
var PROCAINAMIDE = {
  id: "procainamide",
  name: "Procainamide",
  genericName: "Procainamide hydrochloride",
  drugClass: "Class IA antiarrhythmic (sodium channel blocker)",
  route: "IV",
  indications: ["WPW with atrial fibrillation", "Wide-complex tachycardia of uncertain origin", "Atrial fibrillation (pharmacologic cardioversion — second-tier)"],
  dosing: [
    {
      indication: "WPW + A-Fib / Wide-complex tachycardia",
      regimen: "Loading: 20-50 mg/min IV infusion until arrhythmia suppressed, hypotension occurs, QRS widens >50%, or max dose 17 mg/kg reached. Maintenance: 1-4 mg/min IV infusion."
    }
  ],
  contraindications: [
    "QT prolongation (QTc >500 ms)",
    "Torsades de pointes",
    "Complete heart block without pacemaker",
    "Systemic lupus erythematosus (drug may exacerbate)"
  ],
  cautions: [
    "Hypotension with rapid infusion — administer slowly",
    "QRS and QT prolongation — stop if QRS widens >50% from baseline",
    "Drug-induced lupus with chronic use",
    "Reduce dose in renal impairment (active metabolite NAPA is renally cleared)",
    "Monitor QTc continuously during loading"
  ],
  monitoring: "Continuous ECG monitoring during loading. Blood pressure every 5 min. QRS width and QT interval. NAPA levels if chronic use.",
  notes: "Key role in WPW + A-Fib where AV nodal blockers (beta-blockers, CCBs, digoxin, IV amiodarone) are contraindicated. Slows conduction through the accessory pathway. Also useful for wide-complex tachycardia of uncertain origin. Second-tier recommendation for pharmacologic cardioversion of AF per 2025 AHA guidelines.",
  citations: [
    "Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.",
    "Panchal AR, et al. 2020 AHA Guidelines: Adult BLS and ALS. Circulation. 2020;142(16_suppl_2):S366-S468."
  ]
};
var PROCAINE_PENICILLIN = {
  id: "procaine-penicillin",
  name: "Procaine Penicillin G + Probenecid",
  genericName: "Procaine penicillin G with probenecid",
  drugClass: "Natural penicillin (IM depot) + renal tubular secretion inhibitor",
  route: "IM + PO",
  indications: ["Neurosyphilis (alternative to IV penicillin G)"],
  dosing: [
    {
      indication: "Neurosyphilis",
      regimen: "Procaine penicillin G 2.4 million units IM daily + probenecid 500 mg PO QID, both × 10–14 days."
    }
  ],
  contraindications: [
    "Penicillin allergy",
    "Procaine allergy (rare)"
  ],
  cautions: [
    "Probenecid: avoid in renal stones, acute gout flare",
    "Requires daily IM injections — patient tolerance/compliance"
  ],
  notes: "Equivalent outcomes to IV penicillin G for neurosyphilis (Dunaway et al., CID 2020). Allows outpatient treatment.",
  citations: [
    "CDC. Sexually Transmitted Infections Treatment Guidelines. 2021.",
    "Dunaway SB, et al. Procaine Penicillin G vs Aqueous Crystalline Penicillin G for Neurosyphilis. Clin Infect Dis. 2020."
  ]
};
var PHENYLEPHRINE = {
  id: "phenylephrine",
  name: "Phenylephrine (Intracavernosal)",
  genericName: "Phenylephrine",
  drugClass: "Selective alpha-1 adrenergic agonist",
  route: "Intracavernosal",
  indications: ["Ischemic priapism (first-line)", "Post-ICI prolonged erection"],
  dosing: [
    {
      indication: "Ischemic priapism",
      regimen: "200 mcg (2 mL of 100 mcg/mL solution) intracavernosal every 5 minutes, up to 5 doses total (1 mg max). Corpora cavernosa communicate freely — inject one side only. Mix: 1 mL phenylephrine from vial (10 mg/mL) into 100 mL NS = 100 mcg/mL."
    },
    {
      indication: "Pediatric / Sickle cell",
      regimen: "100 mcg (1 mL of 100 mcg/mL) per injection. Lower dose recommended."
    }
  ],
  contraindications: [
    "Uncontrolled hypertension",
    "MAO inhibitor use"
  ],
  cautions: [
    "Monitor BP and HR every 5 min between injections",
    "Hold if SBP > 160 or HR > 110",
    "Pure alpha-1 agonist — no intrinsic inotropy, no heart rate increase"
  ],
  monitoring: "BP/HR every 5 min during injections. Observe 60 min post-detumescence.",
  notes: `First-line sympathomimetic for ischemic priapism (AUA/SMSNA 2022). Alpha-1 selective = lower cardiovascular risk than epinephrine. 74% success alone, 70–100% combined with aspiration. Onset: 1 min. Duration: 10–20 min.

MIXING INSTRUCTIONS (100 mcg/mL):
1. Take a 3 mL syringe, draw up 1 mL of phenylephrine from the vial (vial contains 10 mg/mL)
2. Inject this 1 mL into a 100 mL bag of normal saline
3. Now you have 100 mL of phenylephrine at 100 mcg/mL
4. Draw up into a syringe — each 1 mL = 100 mcg
5. Each dose = 2 mL (200 mcg)`,
  image: {
    src: "images/priapism/mixing-instructions.png",
    alt: "Mixing instructions for phenylephrine (100 mcg/mL) showing vials, syringes, and labeled concentrations",
    caption: "Mixing instructions for intracavernosal phenylephrine. (Source: EMCrit Podcast / EM:RAP)"
  },
  citations: [
    "Bivalacqua TJ, et al. AUA/SMSNA Guideline on Priapism. J Urol. 2022;208(1):43-52.",
    "Martin C, Cocchio C. Phenylephrine vs Terbutaline for Ischemic Priapism. Am J Emerg Med. 2016;34(2):222-4.",
    "Graham BA, et al. Emergency Pharmacotherapy for Priapism. Expert Opin Pharmacother. 2022;23(12):1371-80."
  ]
};
var RIVAROXABAN = {
  id: "rivaroxaban",
  name: "Rivaroxaban",
  genericName: "Rivaroxaban",
  drugClass: "Direct oral anticoagulant (Factor Xa inhibitor)",
  route: "PO",
  indications: ["Pulmonary embolism", "Deep vein thrombosis", "Atrial fibrillation (stroke prevention)", "CAD/PAD secondary prevention"],
  dosing: [
    {
      indication: "PE / DVT treatment",
      regimen: "15 mg twice daily with food × 21 days, then 20 mg once daily with food × 3–6 months. Extended therapy: 20 mg or 10 mg once daily."
    }
  ],
  cautions: [
    "CrCl <30 mL/min — avoid (limited data, increased drug exposure)",
    "Moderate hepatic impairment (Child-Pugh B) — use with caution",
    "Must take with food (increases bioavailability by 39%)",
    "Strong CYP3A4 and P-gp inhibitors/inducers — avoid concomitant use"
  ],
  notes: "Single-drug oral therapy — no initial parenteral heparin required. Take with food to ensure adequate absorption.",
  citations: [
    "Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022.",
    "Freund Y, et al. Acute Pulmonary Embolism: A Review. JAMA. 2022."
  ]
};
var UFH = {
  id: "ufh",
  name: "Unfractionated Heparin (UFH)",
  genericName: "Heparin sodium",
  drugClass: "Unfractionated heparin (indirect thrombin/Xa inhibitor)",
  route: "IV",
  indications: ["Pulmonary embolism (all risk levels)", "DVT", "ACS", "Bridge anticoagulation"],
  dosing: [
    {
      indication: "High-risk / Massive PE",
      regimen: "Bolus 80 units/kg (or 5,000 units) IV, then continuous infusion at 18 units/kg/hour. Titrate to aPTT 60–80 seconds (1.5–2.5× control)."
    },
    {
      indication: "Standard PE / DVT",
      regimen: "Bolus 80 units/kg IV, then 18 units/kg/hr continuous infusion. Adjust per institutional nomogram."
    }
  ],
  contraindications: [
    "Active major hemorrhage",
    "Severe thrombocytopenia (platelets <25,000)",
    "History of heparin-induced thrombocytopenia (HIT)",
    "Spinal procedure or epidural within 12 hours"
  ],
  cautions: [
    "Renal insufficiency: UFH preferred over LMWH when CrCl <25–30 mL/min (not renally cleared)",
    "Obesity: may require higher initial doses and more frequent aPTT monitoring"
  ],
  monitoring: "aPTT every 6 hours until therapeutic, then every 12–24 hours. Platelet count at baseline and every 2–3 days (HIT screening).",
  notes: "Preferred over LMWH when: CrCl <30 mL/min, high bleeding risk (short half-life, fully reversible with protamine), or thrombolysis anticipated. Fully reversible with protamine sulfate.",
  citations: [
    "Konstantinides SV, et al. 2019 ESC Guidelines for Acute Pulmonary Embolism. Eur Heart J. 2020.",
    "Garcia DA, et al. Parenteral Anticoagulants: ACCP Evidence-Based Clinical Practice Guidelines. Chest. 2012."
  ]
};
var VERAPAMIL = {
  id: "verapamil",
  name: "Verapamil",
  genericName: "Verapamil hydrochloride",
  drugClass: "Nondihydropyridine calcium channel blocker",
  route: "IV",
  indications: ["A-Fib / A-Flutter rate control", "Supraventricular tachycardia"],
  dosing: [
    {
      indication: "A-Fib rate control (acute)",
      regimen: "2.5-5 mg IV over 2 min. May repeat with 5-10 mg every 15-30 min as needed. Maximum total dose: 20 mg."
    }
  ],
  contraindications: [
    "EF ≤40% or moderate-to-severe LV systolic dysfunction",
    "Decompensated heart failure",
    "Severe hypotension",
    "Sick sinus syndrome without pacemaker",
    "Second/third-degree AV block without pacemaker",
    "WPW with atrial fibrillation",
    "Concurrent IV beta-blocker use",
    "Wide-complex tachycardia of uncertain origin"
  ],
  cautions: [
    "Hypotension — more common than with diltiazem",
    "Negative inotropic effects — may worsen borderline hemodynamics",
    "Randomized clinical trials examining verapamil for A-Fib are lacking",
    "Diltiazem is generally preferred among nondihydropyridine CCBs"
  ],
  monitoring: "Continuous heart rate and blood pressure monitoring. Assess hemodynamic response after each dose.",
  notes: "Alternative to diltiazem when diltiazem is unavailable. Generally less preferred due to limited RCT evidence and similar contraindication profile. Same EF restriction as diltiazem: CONTRAINDICATED if EF ≤40%.",
  citations: [
    "Wigginton JG, et al. 2025 AHA Guidelines: Adult Advanced Life Support. Circulation. 2025;152(16_suppl_2):S538-S577.",
    "Prystowsky EN, et al. Treatment of Atrial Fibrillation. JAMA. 2015;314(3):278-88."
  ]
};
var ALL_DRUGS = [
  ALTEPLASE,
  AMIODARONE,
  APIXABAN,
  BENZATHINE_PENICILLIN,
  CEFTRIAXONE,
  DABIGATRAN,
  DIGOXIN,
  DILTIAZEM,
  DOXYCYCLINE,
  EDOXABAN,
  ENOXAPARIN,
  EPINEPHRINE,
  ESMOLOL,
  LIDOCAINE,
  MAGNESIUM_SULFATE,
  METOPROLOL,
  PENICILLIN_G_IV,
  PHENYLEPHRINE,
  PROCAINAMIDE,
  PROCAINE_PENICILLIN,
  RIVAROXABAN,
  UFH,
  VERAPAMIL
];
var DRUG_MAP = {};
for (const drug of ALL_DRUGS) {
  DRUG_MAP[drug.id] = drug;
}
function getDrug(id) {
  return DRUG_MAP[id];
}
function getAllDrugs() {
  return ALL_DRUGS;
}
var NAME_TO_ID = [
  [/alteplase|tPA/i, "alteplase"],
  [/amiodarone|cordarone/i, "amiodarone"],
  [/apixaban/i, "apixaban"],
  [/benzathine.*penicillin/i, "benzathine-penicillin"],
  [/ceftriaxone/i, "ceftriaxone"],
  [/dabigatran/i, "dabigatran"],
  [/digoxin|digitalis|lanoxin/i, "digoxin"],
  [/diltiazem|cardizem/i, "diltiazem"],
  [/doxycycline/i, "doxycycline"],
  [/edoxaban/i, "edoxaban"],
  [/enoxaparin|LMWH|low.molecular/i, "enoxaparin"],
  [/epinephrine|adrenaline/i, "epinephrine"],
  [/esmolol|brevibloc/i, "esmolol"],
  [/lidocaine/i, "lidocaine"],
  [/magnesium sulfate|mag sulfate|MgSO4/i, "magnesium-sulfate"],
  [/metoprolol|lopressor|toprol/i, "metoprolol"],
  [/aqueous.*penicillin|penicillin G.*IV|crystalline.*penicillin/i, "penicillin-g-iv"],
  [/phenylephrine/i, "phenylephrine"],
  [/procainamide|pronestyl/i, "procainamide"],
  [/procaine.*penicillin/i, "procaine-penicillin"],
  [/rivaroxaban/i, "rivaroxaban"],
  [/unfractionated heparin|^UFH$|heparin sodium/i, "ufh"],
  [/verapamil|calan|isoptin/i, "verapamil"]
];
function findDrugIdByName(name) {
  for (const [pattern, id] of NAME_TO_ID) {
    if (pattern.test(name))
      return id;
  }
  return;
}

// src/components/drug-store.ts
function renderDrugList(container) {
  container.innerHTML = "";
  const backBtn = document.createElement("button");
  backBtn.className = "btn-text";
  backBtn.textContent = "← Categories";
  backBtn.addEventListener("click", () => router.navigate("/"));
  container.appendChild(backBtn);
  const header = document.createElement("div");
  header.className = "category-view-header";
  const icon = document.createElement("span");
  icon.className = "category-view-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = "\uD83D\uDC8A";
  const name = document.createElement("h2");
  name.className = "category-view-name";
  name.textContent = "Drug Reference";
  header.appendChild(icon);
  header.appendChild(name);
  container.appendChild(header);
  const searchWrap = document.createElement("div");
  searchWrap.className = "calculator-search-wrap";
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "calculator-search-input";
  searchInput.placeholder = "Search drugs…";
  searchInput.setAttribute("aria-label", "Search drugs");
  searchWrap.appendChild(searchInput);
  container.appendChild(searchWrap);
  const list = document.createElement("div");
  list.className = "tree-list";
  container.appendChild(list);
  const allDrugs = getAllDrugs();
  function renderList(filter) {
    list.innerHTML = "";
    const query = filter.toLowerCase().trim();
    const filtered = query ? allDrugs.filter((d) => d.name.toLowerCase().includes(query) || d.genericName.toLowerCase().includes(query) || d.drugClass.toLowerCase().includes(query) || d.indications.some((ind) => ind.toLowerCase().includes(query))) : allDrugs;
    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      const emptyText = document.createElement("p");
      emptyText.textContent = "No drugs match your search.";
      empty.appendChild(emptyText);
      list.appendChild(empty);
      return;
    }
    for (const drug of filtered) {
      const card = document.createElement("button");
      card.className = "tree-card";
      card.setAttribute("aria-label", `${drug.name} — ${drug.drugClass}`);
      card.addEventListener("click", () => showDrugModal(drug.id));
      const title = document.createElement("div");
      title.className = "tree-card-title";
      title.textContent = drug.name;
      const subtitle = document.createElement("div");
      subtitle.className = "tree-card-subtitle";
      subtitle.textContent = drug.drugClass;
      const routeEl = document.createElement("div");
      routeEl.className = "tree-card-count";
      routeEl.textContent = drug.route;
      card.appendChild(title);
      card.appendChild(subtitle);
      card.appendChild(routeEl);
      list.appendChild(card);
    }
  }
  searchInput.addEventListener("input", () => renderList(searchInput.value));
  renderList("");
}
var overlayEl = null;
function destroyOverlay() {
  overlayEl?.remove();
  overlayEl = null;
}
function showDrugModal(drugId) {
  const drug = getDrug(drugId);
  if (!drug)
    return false;
  destroyOverlay();
  overlayEl = document.createElement("div");
  overlayEl.className = "modal-overlay info-modal-overlay active";
  overlayEl.addEventListener("click", (e) => {
    if (e.target === overlayEl)
      destroyOverlay();
  });
  const panel = document.createElement("div");
  panel.className = "modal-content info-modal-panel";
  const header = document.createElement("div");
  header.className = "modal-header";
  const titleWrap = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = drug.name;
  titleWrap.appendChild(title);
  const classEl = document.createElement("div");
  classEl.className = "info-modal-subtitle";
  classEl.textContent = drug.drugClass;
  titleWrap.appendChild(classEl);
  const closeBtn = document.createElement("button");
  closeBtn.className = "btn-text";
  closeBtn.textContent = "✕";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.addEventListener("click", destroyOverlay);
  header.appendChild(titleWrap);
  header.appendChild(closeBtn);
  panel.appendChild(header);
  const body = document.createElement("div");
  body.className = "modal-body info-modal-body";
  const routeBadge = document.createElement("div");
  routeBadge.className = "drug-route-badge";
  routeBadge.textContent = `Route: ${drug.route}`;
  body.appendChild(routeBadge);
  renderDrugSection(body, "Indications", drug.indications);
  if (drug.dosing.length > 0) {
    const dosingSection = document.createElement("div");
    dosingSection.className = "info-page-section";
    const dosingH = document.createElement("h2");
    dosingH.className = "info-page-section-heading";
    dosingH.textContent = "Dosing";
    dosingSection.appendChild(dosingH);
    for (const dose of drug.dosing) {
      const card = document.createElement("div");
      card.className = "info-page-drug-card";
      const indication = document.createElement("div");
      indication.className = "info-page-drug-name";
      indication.textContent = dose.indication;
      card.appendChild(indication);
      const regimen = document.createElement("div");
      regimen.className = "info-page-drug-regimen";
      regimen.textContent = dose.regimen;
      card.appendChild(regimen);
      dosingSection.appendChild(card);
    }
    body.appendChild(dosingSection);
  }
  if (drug.contraindications?.length) {
    renderDrugSection(body, "Contraindications", drug.contraindications, "drug-section-danger");
  }
  if (drug.cautions?.length) {
    renderDrugSection(body, "Cautions", drug.cautions, "drug-section-warning");
  }
  if (drug.monitoring) {
    const monSection = document.createElement("div");
    monSection.className = "info-page-section";
    const monH = document.createElement("h2");
    monH.className = "info-page-section-heading";
    monH.textContent = "Monitoring";
    monSection.appendChild(monH);
    const monP = document.createElement("p");
    monP.className = "info-page-text";
    monP.textContent = drug.monitoring;
    monSection.appendChild(monP);
    body.appendChild(monSection);
  }
  if (drug.notes) {
    const notesSection = document.createElement("div");
    notesSection.className = "info-page-section";
    const notesH = document.createElement("h2");
    notesH.className = "info-page-section-heading";
    notesH.textContent = "Clinical Notes";
    notesSection.appendChild(notesH);
    const notesP = document.createElement("p");
    notesP.className = "info-page-text";
    notesP.textContent = drug.notes;
    notesSection.appendChild(notesP);
    body.appendChild(notesSection);
  }
  if (drug.image) {
    const figure = document.createElement("figure");
    figure.style.margin = "1rem 0";
    const img = document.createElement("img");
    img.src = drug.image.src;
    img.alt = drug.image.alt;
    img.style.width = "100%";
    img.style.borderRadius = "8px";
    figure.appendChild(img);
    if (drug.image.caption) {
      const cap = document.createElement("figcaption");
      cap.style.fontSize = "0.75rem";
      cap.style.opacity = "0.7";
      cap.style.marginTop = "0.5rem";
      cap.textContent = drug.image.caption;
      figure.appendChild(cap);
    }
    body.appendChild(figure);
  }
  if (drug.citations.length > 0) {
    const citSection = document.createElement("details");
    citSection.className = "info-page-citations";
    const citSummary = document.createElement("summary");
    citSummary.textContent = `References (${drug.citations.length})`;
    citSection.appendChild(citSummary);
    const citList = document.createElement("ol");
    citList.className = "calculator-citation-list";
    for (const cit of drug.citations) {
      const li = document.createElement("li");
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
function renderDrugSection(container, heading, items, extraClass) {
  const section = document.createElement("div");
  section.className = "info-page-section";
  const h = document.createElement("h2");
  h.className = "info-page-section-heading";
  h.textContent = heading;
  section.appendChild(h);
  const list = document.createElement("div");
  list.className = extraClass ?? "";
  for (const item of items) {
    const p = document.createElement("p");
    p.className = "info-page-text";
    p.textContent = "• " + item;
    list.appendChild(p);
  }
  section.appendChild(list);
  container.appendChild(section);
}

// src/components/category-grid.ts
var TOOL_ROUTES = {
  pharmacy: { route: "/drugs", getCount: () => getAllDrugs().length, unit: "drug" },
  "med-calc": { route: "/calculators", getCount: () => getAllCalculators().length, unit: "tool" }
};
function renderCategoryGrid(container) {
  container.innerHTML = "";
  const headingRow = document.createElement("div");
  headingRow.className = "home-heading-row";
  const heading = document.createElement("h2");
  heading.textContent = "Categories";
  heading.style.fontSize = "20px";
  heading.style.fontWeight = "600";
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "home-search-input";
  searchInput.placeholder = "Search…";
  searchInput.setAttribute("aria-label", "Search categories, consults, drugs, and calculators");
  headingRow.appendChild(heading);
  headingRow.appendChild(searchInput);
  container.appendChild(headingRow);
  const grid = document.createElement("div");
  grid.className = "category-grid";
  const categories = getAllCategories();
  for (const cat of categories) {
    const toolInfo = TOOL_ROUTES[cat.id];
    if (toolInfo) {
      const count = toolInfo.getCount();
      const card = createCategoryCard(cat.icon, cat.name, cat.id, count, toolInfo.route, toolInfo.unit);
      grid.appendChild(card);
    } else {
      const card = createCategoryCard(cat.icon, cat.name, cat.id, cat.decisionTrees.length);
      grid.appendChild(card);
    }
  }
  const addCard = createAddCard();
  grid.appendChild(addCard);
  container.appendChild(grid);
  const disclaimer = document.createElement("p");
  disclaimer.className = "home-disclaimer";
  disclaimer.textContent = "This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.";
  container.appendChild(disclaimer);
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length === 0) {
      grid.style.display = "";
      disclaimer.style.display = "";
      const existingResults2 = container.querySelector(".search-results");
      if (existingResults2)
        existingResults2.remove();
      return;
    }
    grid.style.display = "none";
    disclaimer.style.display = "none";
    const existingResults = container.querySelector(".search-results");
    if (existingResults)
      existingResults.remove();
    const results = buildSearchResults(query);
    const resultsEl = renderSearchResults(results);
    container.appendChild(resultsEl);
  });
}
function createCategoryCard(icon, name, id, count, route, unit) {
  const effectiveRoute = route || `/category/${id}`;
  const effectiveUnit = unit || "consult";
  const card = document.createElement("a");
  card.className = "category-card";
  card.href = "#" + effectiveRoute;
  card.setAttribute("role", "link");
  card.setAttribute("aria-label", `${name} — ${count} ${effectiveUnit}${count !== 1 ? "s" : ""}`);
  card.addEventListener("click", (e) => {
    e.preventDefault();
    router.navigate(effectiveRoute);
  });
  if (count > 0) {
    const countEl = document.createElement("span");
    countEl.className = "category-count";
    countEl.textContent = `${count} ${effectiveUnit}${count !== 1 ? "s" : ""}`;
    card.appendChild(countEl);
  }
  const iconEl = document.createElement("span");
  iconEl.className = "category-icon";
  iconEl.setAttribute("aria-hidden", "true");
  if (icon.endsWith(".png")) {
    const img = document.createElement("img");
    img.src = `assets/icons/${icon}`;
    img.alt = "";
    img.width = 80;
    img.height = 80;
    img.loading = "lazy";
    iconEl.appendChild(img);
  } else {
    iconEl.textContent = icon;
  }
  card.appendChild(iconEl);
  const nameEl = document.createElement("span");
  nameEl.className = "category-name";
  nameEl.textContent = name;
  card.appendChild(nameEl);
  return card;
}
function createAddCard() {
  const card = document.createElement("button");
  card.className = "category-card category-card--add";
  card.setAttribute("aria-label", "Add custom category");
  const iconEl = document.createElement("span");
  iconEl.className = "category-icon";
  iconEl.setAttribute("aria-hidden", "true");
  iconEl.textContent = "➕";
  const nameEl = document.createElement("span");
  nameEl.className = "category-name";
  nameEl.textContent = "Add";
  card.appendChild(iconEl);
  card.appendChild(nameEl);
  card.addEventListener("click", () => {
    const name = prompt("Enter category name:");
    if (name && name.trim()) {
      addCustomCategory(name.trim());
      const main = document.getElementById("main-content");
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
  const seenTreeIds = new Set;
  for (const cat of categories) {
    if (cat.name.toLowerCase().includes(query)) {
      const toolInfo = TOOL_ROUTES[cat.id];
      const route = toolInfo ? toolInfo.route : `/category/${cat.id}`;
      results.push({
        type: "category",
        label: cat.name,
        sublabel: `${cat.decisionTrees.length} consult${cat.decisionTrees.length !== 1 ? "s" : ""}`,
        route
      });
    }
    for (const tree of cat.decisionTrees) {
      if (seenTreeIds.has(tree.id))
        continue;
      if (tree.title.toLowerCase().includes(query) || tree.subtitle.toLowerCase().includes(query)) {
        seenTreeIds.add(tree.id);
        results.push({
          type: "consult",
          label: tree.title,
          sublabel: tree.subtitle,
          route: `/tree/${tree.id}`
        });
      }
    }
  }
  for (const drug of getAllDrugs()) {
    if (drug.name.toLowerCase().includes(query) || drug.genericName.toLowerCase().includes(query) || drug.drugClass.toLowerCase().includes(query)) {
      results.push({
        type: "drug",
        label: drug.name,
        sublabel: drug.drugClass,
        route: "/drugs",
        drugId: drug.id
      });
    }
  }
  for (const calc of getAllCalculators()) {
    if (calc.title.toLowerCase().includes(query) || calc.subtitle.toLowerCase().includes(query)) {
      results.push({
        type: "calculator",
        label: calc.title,
        sublabel: calc.subtitle,
        route: `/calculator/${calc.id}`
      });
    }
  }
  return results;
}
var TYPE_LABELS = {
  category: "Categories",
  consult: "Consults",
  drug: "Drugs",
  calculator: "Calculators"
};
function renderSearchResults(results) {
  const wrapper = document.createElement("div");
  wrapper.className = "search-results";
  if (results.length === 0) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = "No results found.";
    wrapper.appendChild(empty);
    return wrapper;
  }
  const grouped = {};
  for (const r of results) {
    if (!grouped[r.type])
      grouped[r.type] = [];
    grouped[r.type].push(r);
  }
  for (const type of ["category", "consult", "drug", "calculator"]) {
    const group = grouped[type];
    if (!group || group.length === 0)
      continue;
    const groupLabel = document.createElement("h3");
    groupLabel.className = "search-group-label";
    groupLabel.textContent = TYPE_LABELS[type];
    wrapper.appendChild(groupLabel);
    for (const item of group) {
      const row = document.createElement("a");
      row.className = "search-result-item";
      row.href = "#" + item.route;
      row.addEventListener("click", (e) => {
        e.preventDefault();
        if (item.drugId) {
          showDrugModal(item.drugId);
        } else {
          router.navigate(item.route);
        }
      });
      const label = document.createElement("span");
      label.className = "search-result-label";
      label.textContent = item.label;
      const sublabel = document.createElement("span");
      sublabel.className = "search-result-sublabel";
      sublabel.textContent = item.sublabel;
      row.appendChild(label);
      row.appendChild(sublabel);
      wrapper.appendChild(row);
    }
  }
  return wrapper;
}

// src/components/category-view.ts
function renderCategoryView(container, categoryId) {
  container.innerHTML = "";
  const categories = getAllCategories();
  const category = categories.find((c) => c.id === categoryId);
  if (!category) {
    renderNotFound(container, categoryId);
    return;
  }
  const backBtn = document.createElement("button");
  backBtn.className = "btn-text";
  backBtn.textContent = "← Categories";
  backBtn.setAttribute("aria-label", "Back to categories");
  backBtn.addEventListener("click", () => router.navigate("/"));
  container.appendChild(backBtn);
  const header = document.createElement("div");
  header.className = "category-view-header";
  const icon = document.createElement("span");
  icon.className = "category-view-icon";
  icon.setAttribute("aria-hidden", "true");
  if (category.icon.endsWith(".png")) {
    const img = document.createElement("img");
    img.src = `assets/icons/${category.icon}`;
    img.alt = "";
    img.width = 48;
    img.height = 48;
    icon.appendChild(img);
  } else {
    icon.textContent = category.icon;
  }
  const name = document.createElement("h2");
  name.className = "category-view-name";
  name.textContent = category.name;
  header.appendChild(icon);
  header.appendChild(name);
  container.appendChild(header);
  if (category.decisionTrees.length === 0) {
    renderEmptyState(container);
  } else {
    renderTreeList(container, category.decisionTrees);
  }
}
function renderTreeList(container, trees) {
  const list = document.createElement("div");
  list.className = "tree-list";
  for (const tree of trees) {
    const card = document.createElement("button");
    card.className = "tree-card";
    card.setAttribute("aria-label", `${tree.title} — ${tree.subtitle}`);
    card.addEventListener("click", () => {
      router.navigate(`/tree/${tree.id}`);
    });
    const title = document.createElement("div");
    title.className = "tree-card-title";
    title.textContent = tree.title;
    const subtitle = document.createElement("div");
    subtitle.className = "tree-card-subtitle";
    subtitle.textContent = tree.subtitle;
    card.appendChild(title);
    card.appendChild(subtitle);
    if (tree.nodeCount > 0) {
      const count = document.createElement("div");
      count.className = "tree-card-count";
      count.textContent = `${tree.nodeCount} nodes`;
      card.appendChild(count);
    }
    list.appendChild(card);
  }
  container.appendChild(list);
}
function renderEmptyState(container) {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  const icon = document.createElement("div");
  icon.className = "empty-state-icon";
  icon.textContent = "\uD83D\uDEA7";
  const title = document.createElement("h3");
  title.textContent = "Coming Soon";
  const body = document.createElement("p");
  body.textContent = "No decision trees available in this category yet.";
  empty.appendChild(icon);
  empty.appendChild(title);
  empty.appendChild(body);
  container.appendChild(empty);
}
function renderNotFound(container, categoryId) {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  const icon = document.createElement("div");
  icon.className = "empty-state-icon";
  icon.textContent = "❓";
  const title = document.createElement("h3");
  title.textContent = "Category Not Found";
  const body = document.createElement("p");
  body.textContent = `No category with ID "${categoryId}".`;
  const homeBtn = document.createElement("button");
  homeBtn.className = "btn-primary";
  homeBtn.textContent = "Go Home";
  homeBtn.style.marginTop = "16px";
  homeBtn.addEventListener("click", () => router.navigate("/"));
  empty.appendChild(icon);
  empty.appendChild(title);
  empty.appendChild(body);
  empty.appendChild(homeBtn);
  container.appendChild(empty);
}

// src/services/storage.ts
function storageGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null)
      return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}
function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`Failed to save to localStorage key: ${key}`);
  }
}
function storageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

// src/services/tree-engine.ts
var SESSION_KEY = "em-tree-session";

class TreeEngine {
  nodes;
  session = null;
  constructor(nodes) {
    this.nodes = new Map;
    for (const node of nodes) {
      this.nodes.set(node.id, node);
    }
  }
  startTree(treeId, entryNodeId) {
    const entryNode = this.nodes.get(entryNodeId);
    if (!entryNode) {
      throw new Error(`Entry node not found: ${entryNodeId}`);
    }
    this.session = {
      treeId,
      currentNodeId: entryNodeId,
      history: [],
      answers: {},
      startedAt: Date.now()
    };
    this.saveSession();
    return entryNode;
  }
  getCurrentNode() {
    if (!this.session)
      return null;
    return this.nodes.get(this.session.currentNodeId) ?? null;
  }
  getSession() {
    return this.session;
  }
  selectOption(optionIndex) {
    if (!this.session)
      return null;
    const currentNode = this.nodes.get(this.session.currentNodeId);
    if (!currentNode?.options || optionIndex >= currentNode.options.length) {
      return null;
    }
    const option = currentNode.options[optionIndex];
    this.session.answers[currentNode.id] = option.label;
    this.session.history.push(this.session.currentNodeId);
    this.session.currentNodeId = option.next;
    this.saveSession();
    return this.nodes.get(option.next) ?? null;
  }
  continueToNext() {
    if (!this.session)
      return null;
    const currentNode = this.nodes.get(this.session.currentNodeId);
    if (!currentNode?.next)
      return null;
    this.session.history.push(this.session.currentNodeId);
    this.session.currentNodeId = currentNode.next;
    this.saveSession();
    return this.nodes.get(currentNode.next) ?? null;
  }
  goBack() {
    if (!this.session || this.session.history.length === 0)
      return null;
    const previousId = this.session.history.pop();
    delete this.session.answers[this.session.currentNodeId];
    this.session.currentNodeId = previousId;
    this.saveSession();
    return this.nodes.get(previousId) ?? null;
  }
  canGoBack() {
    return this.session !== null && this.session.history.length > 0;
  }
  getNode(id) {
    return this.nodes.get(id) ?? null;
  }
  getCurrentModule() {
    const node = this.getCurrentNode();
    return node?.module ?? null;
  }
  getTotalModules() {
    let max = 0;
    for (const node of this.nodes.values()) {
      if (node.module > max)
        max = node.module;
    }
    return max;
  }
  jumpToHistory(index) {
    if (!this.session || index < 0 || index >= this.session.history.length)
      return null;
    const targetId = this.session.history[index];
    const removedIds = this.session.history.slice(index);
    for (const id of removedIds) {
      delete this.session.answers[id];
    }
    delete this.session.answers[this.session.currentNodeId];
    this.session.history = this.session.history.slice(0, index);
    this.session.currentNodeId = targetId;
    this.saveSession();
    return this.nodes.get(targetId) ?? null;
  }
  goToEntry(entryNodeId) {
    if (!this.session)
      return null;
    this.session.history = [];
    this.session.answers = {};
    this.session.currentNodeId = entryNodeId;
    this.saveSession();
    return this.nodes.get(entryNodeId) ?? null;
  }
  reset() {
    this.session = null;
    storageRemove(SESSION_KEY);
  }
  saveSession() {
    if (this.session) {
      storageSet(SESSION_KEY, this.session);
    }
  }
  restoreSession(treeId) {
    const saved = storageGet(SESSION_KEY, null);
    if (!saved || saved.treeId !== treeId)
      return null;
    if (!this.nodes.has(saved.currentNodeId)) {
      storageRemove(SESSION_KEY);
      return null;
    }
    this.session = saved;
    return this.nodes.get(saved.currentNodeId) ?? null;
  }
  getAnswerHistory() {
    if (!this.session)
      return [];
    const result = [];
    for (const nodeId of this.session.history) {
      const answer = this.session.answers[nodeId];
      const node = this.nodes.get(nodeId);
      if (answer !== undefined && node) {
        result.push({
          nodeId,
          nodeTitle: node.title,
          answer: String(answer)
        });
      }
    }
    return result;
  }
}

// src/data/trees/neurosyphilis.ts
var NEUROSYPHILIS_NODES = [
  {
    id: "serology-start",
    type: "info",
    module: 1,
    title: "Syphilis Serology — Test Types",
    body: `NONTREPONEMAL TESTS (NTT)
Detect antibodies to cardiolipin-lecithin-cholesterol antigen released from damaged host cells. Reflect disease activity — titers rise with active infection and decline with treatment.

• RPR (Rapid Plasma Reagin) — flocculation assay, most common NTT screen. Results reported as titer (e.g., 1:8, 1:32). Titers ≥1:8 typically indicate active infection.
• VDRL (Venereal Disease Research Laboratory) — flocculation assay, similar to RPR. Used on serum and CSF. RPR and VDRL titers cannot be directly compared; RPR titers run slightly higher.

TREPONEMAL TESTS
Detect antibodies specific to T. pallidum antigens. Once positive, remain positive for life regardless of treatment.

• FTA-ABS (Fluorescent Treponemal Antibody Absorption) — indirect immunofluorescence. First treponemal test to become positive in early infection.
• TP-PA (T. pallidum Particle Agglutination) — particle agglutination assay. High specificity, widely used for confirmation.
• EIA/CIA (Enzyme/Chemiluminescence Immunoassay) — automated treponemal assays. Used as initial screen in reverse-sequence algorithms. High throughput, lower cost per test.

Key principles:
• NTTs become reactive 3–4 weeks after infection — 30% of primary syphilis is seronegative
• Treponemal antibodies persist for life — cannot distinguish active from past treated infection
• Use same NTT method (RPR or VDRL) for serial monitoring, preferably same lab
• Prozone phenomenon: false-negative NTT at very high titers — request dilution if clinical suspicion is high`,
    citation: [1, 2],
    next: "serology-algorithm"
  },
  {
    id: "serology-algorithm",
    type: "question",
    module: 1,
    title: "Testing Algorithm",
    body: `Which testing algorithm was used?

Traditional: NTT screen first (RPR or VDRL), then confirm with treponemal test (FTA-ABS or TP-PA). Most common in outpatient/public health settings.

Reverse-Sequence: Treponemal screen first (EIA/CIA), then reflex to NTT. Increasingly used by large labs due to automation.`,
    citation: [1, 2],
    options: [
      { label: "Traditional", description: "NTT screen (RPR/VDRL) → treponemal confirm", next: "trad-results" },
      { label: "Reverse-Sequence", description: "Treponemal screen (EIA/CIA) → NTT reflex", next: "rev-results" }
    ]
  },
  {
    id: "trad-results",
    type: "question",
    module: 1,
    title: "Traditional Algorithm Results",
    body: "What are the results of the traditional testing sequence?",
    citation: [1, 2],
    options: [
      { label: "RPR/VDRL reactive + treponemal reactive", description: "Both tests positive", next: "confirmed-syphilis", urgency: "critical" },
      { label: "RPR/VDRL reactive + treponemal nonreactive", description: "NTT positive but treponemal negative", next: "trad-false-positive" },
      { label: "RPR/VDRL nonreactive", description: "Screening test negative", next: "trad-unlikely" }
    ]
  },
  {
    id: "rev-results",
    type: "question",
    module: 1,
    title: "Reverse-Sequence Algorithm Results",
    body: "What are the results of the reverse-sequence testing?",
    citation: [1, 2],
    options: [
      { label: "Treponemal reactive + NTT reactive", description: "Both tests positive", next: "confirmed-syphilis", urgency: "critical" },
      { label: "Treponemal reactive + NTT nonreactive", description: "Treponemal positive, NTT negative — requires second treponemal test", next: "rev-second-trep" },
      { label: "Treponemal nonreactive", description: "Screening test negative", next: "rev-unlikely" }
    ]
  },
  {
    id: "rev-second-trep",
    type: "question",
    module: 1,
    title: "Second Treponemal Test Required",
    body: "Treponemal reactive + NTT nonreactive requires a SECOND treponemal test using a different antigen. What was the result?",
    citation: [1],
    options: [
      { label: "Second treponemal reactive", description: "Possible: previously treated, untreated late latent, or early syphilis with low NTT", next: "rev-possible-syphilis" },
      { label: "Second treponemal nonreactive", description: "Initial treponemal screen was false positive", next: "rev-false-positive" }
    ]
  },
  {
    id: "confirmed-syphilis",
    type: "info",
    module: 1,
    title: "Confirmed Syphilis",
    body: "Serology confirms active syphilis infection. Proceed to stage classification to determine appropriate workup and treatment.",
    next: "stage-start"
  },
  {
    id: "trad-false-positive",
    type: "result",
    module: 1,
    title: "Likely False Positive",
    body: "RPR/VDRL reactive + treponemal nonreactive = likely biological false positive. Common causes include HIV, autoimmune disease, pregnancy, vaccinations, injection drug use, and older age. False-positive NTTs are usually low titer (<1:8).",
    citation: [1, 2],
    recommendation: "No syphilis treatment indicated. Consider evaluation for underlying causes of false-positive NTT.",
    confidence: "definitive"
  },
  {
    id: "trad-unlikely",
    type: "result",
    module: 1,
    title: "Syphilis Unlikely",
    body: `RPR/VDRL nonreactive = syphilis unlikely.

Caveats:
• 30% of primary syphilis is seronegative
• NTTs become reactive 3–4 weeks after infection
• Prozone phenomenon: false-negative NTT at very high titers — request dilution if clinical suspicion is high`,
    citation: [1, 2],
    recommendation: "No syphilis treatment indicated. If clinical suspicion remains high, repeat testing in 2–4 weeks or request dilution to rule out prozone.",
    confidence: "recommended"
  },
  {
    id: "rev-unlikely",
    type: "result",
    module: 1,
    title: "Syphilis Unlikely",
    body: "Treponemal screen nonreactive = syphilis unlikely.",
    citation: [1],
    recommendation: "No syphilis treatment indicated.",
    confidence: "definitive"
  },
  {
    id: "rev-possible-syphilis",
    type: "info",
    module: 1,
    title: "Possible Syphilis",
    body: "Treponemal reactive + NTT nonreactive + second treponemal reactive = possible syphilis. This may represent previously treated syphilis, untreated late latent syphilis, or early syphilis with NTT not yet reactive. Proceed to stage classification and treat accordingly.",
    citation: [1],
    next: "stage-start"
  },
  {
    id: "rev-false-positive",
    type: "result",
    module: 1,
    title: "False Positive Treponemal Screen",
    body: "Treponemal reactive + NTT nonreactive + second treponemal nonreactive = false positive initial treponemal screen.",
    citation: [1],
    recommendation: "No syphilis treatment indicated.",
    confidence: "definitive"
  },
  {
    id: "stage-start",
    type: "question",
    module: 2,
    title: "Stage Classification",
    body: "Based on clinical presentation and history, what is the stage of syphilis?",
    citation: [1, 6],
    options: [
      { label: "Primary", description: "Painless chancre, regional lymphadenopathy", next: "symptom-start" },
      { label: "Secondary", description: "Diffuse rash (palms/soles), condylomata lata, mucous patches, lymphadenopathy, constitutional symptoms", next: "symptom-start" },
      { label: "Early Latent", description: "Asymptomatic, acquired within prior 12 months (documented seroconversion, symptoms, or exposure)", next: "symptom-start" },
      { label: "Late Latent", description: "Asymptomatic, acquired >12 months ago or unknown duration", next: "symptom-start" },
      { label: "Tertiary", description: "Gummatous disease, cardiovascular syphilis (aortitis), or late neurologic manifestations (tabes dorsalis, general paresis)", next: "symptom-start" },
      { label: "Unknown Duration", description: "No clear timeline — treat as late latent", next: "symptom-start" }
    ]
  },
  {
    id: "symptom-start",
    type: "question",
    module: 3,
    title: "Neurologic Symptom Screen",
    body: `Does the patient have ANY of the following neurologic symptoms?

• Cognitive dysfunction / altered mental status
• Motor or sensory deficits
• Cranial nerve palsies
• Meningismus / signs of meningitis
• Stroke symptoms
• Loss of vibration sense

Note: Neurologic symptoms have HIGH specificity (91.6–100%) but LOW sensitivity (1.5–38.1%) for neurosyphilis. Absence of symptoms does NOT rule out neurosyphilis.`,
    citation: [5, 12],
    options: [
      { label: "Yes — neurologic symptoms present", description: "One or more neurologic symptoms identified", next: "lp-indicated-neuro", urgency: "critical" },
      { label: "No — no neurologic symptoms", description: "Proceed to ocular symptom screen", next: "symptom-ocular" }
    ]
  },
  {
    id: "symptom-ocular",
    type: "question",
    module: 3,
    title: "Ocular Symptom Screen",
    body: `Does the patient have ANY ocular symptoms?

• Vision changes / vision loss
• Uveitis / retinitis on exam
• Photophobia`,
    citation: [1, 5],
    options: [
      { label: "Yes — ocular symptoms present", description: "Proceed to cranial nerve assessment", next: "ocular-cn-check", urgency: "urgent" },
      { label: "No — no ocular symptoms", description: "Proceed to otic symptom screen", next: "symptom-otic" }
    ]
  },
  {
    id: "ocular-cn-check",
    type: "question",
    module: 3,
    title: "Cranial Nerve Assessment",
    body: "Is cranial nerve dysfunction present on exam?",
    citation: [1, 5],
    options: [
      { label: "Yes — cranial nerve dysfunction", description: "LP indicated to evaluate for neurosyphilis", next: "lp-indicated-ocular", urgency: "critical" },
      { label: "No — isolated ocular findings", description: "Confirmed isolated ocular syphilis on exam — treat as neurosyphilis without LP", next: "tx-neurosyphilis" }
    ]
  },
  {
    id: "symptom-otic",
    type: "question",
    module: 3,
    title: "Otic Symptom Screen",
    body: `Does the patient have ANY otic symptoms?

• Hearing loss (moderate or greater severity)
• Tinnitus
• Vertigo

If present with normal neurologic exam, CSF is likely normal. Treat as neurosyphilis without LP.`,
    citation: [1],
    options: [
      { label: "Yes — otic symptoms present", description: "Normal neurologic exam — treat as neurosyphilis without LP", next: "tx-neurosyphilis", urgency: "urgent" },
      { label: "No — no otic symptoms", description: "Patient is asymptomatic — proceed to LP decision", next: "lp-tertiary-check" }
    ]
  },
  {
    id: "lp-indicated-neuro",
    type: "info",
    module: 4,
    title: "LP Indicated — Neurologic Symptoms",
    body: `Lumbar puncture is indicated due to neurologic symptoms. CSF analysis will help confirm or rule out neurosyphilis.

Proceed to CSF interpretation after obtaining LP results.`,
    citation: [1, 5],
    next: "csf-vdrl-result"
  },
  {
    id: "lp-indicated-ocular",
    type: "info",
    module: 4,
    title: "LP Indicated — Ocular + Cranial Nerve",
    body: "Lumbar puncture is indicated due to ocular symptoms with cranial nerve dysfunction. CSF analysis will help determine extent of CNS involvement.",
    citation: [1, 5],
    next: "csf-vdrl-result"
  },
  {
    id: "lp-tertiary-check",
    type: "question",
    module: 4,
    title: "LP Decision — Asymptomatic Patient",
    body: `Patient has no neurologic, ocular, or otic symptoms. Was the patient staged as TERTIARY syphilis?

Tertiary syphilis (gummatous, cardiovascular) requires LP before treatment to rule out neurosyphilis.`,
    citation: [1],
    options: [
      { label: "Yes — tertiary syphilis", description: "LP indicated before treatment", next: "lp-indicated-tertiary", urgency: "critical" },
      { label: "No — not tertiary", description: "Proceed to HIV status assessment", next: "lp-hiv-status" }
    ]
  },
  {
    id: "lp-indicated-tertiary",
    type: "info",
    module: 4,
    title: "LP Indicated — Tertiary Syphilis",
    body: "Lumbar puncture is indicated before treatment for tertiary syphilis to rule out neurosyphilis. Proceed to CSF interpretation after obtaining LP results.",
    citation: [1],
    next: "csf-vdrl-result"
  },
  {
    id: "lp-hiv-status",
    type: "question",
    module: 4,
    title: "HIV Status",
    body: `What is the patient’s HIV status?

IMPORTANT: Reactive treponemal test + nonreactive NTT + no neurologic symptoms = LOW neurosyphilis risk. CSF examination is NOT recommended in this scenario.`,
    citation: [1, 9, 17],
    options: [
      { label: "HIV Negative", next: "lp-hiv-neg-failure" },
      { label: "HIV Positive", next: "lp-hiv-pos-simple" },
      { label: "Unknown", description: "If unknown, consider HIV testing", next: "lp-hiv-neg-failure" }
    ]
  },
  {
    id: "lp-hiv-neg-failure",
    type: "question",
    module: 4,
    title: "Treatment Failure Assessment",
    body: `Is there evidence of treatment failure?

Treatment failure = NTT titers not declining fourfold within 12–24 months after appropriate treatment.`,
    citation: [1],
    options: [
      { label: "Yes — treatment failure", description: "Titers not declining as expected", next: "lp-hiv-neg-titer" },
      { label: "No — no prior treatment or titers declining", description: "LP not indicated", next: "lp-not-indicated" },
      { label: "Not applicable — new diagnosis", description: "No prior treatment to assess", next: "lp-not-indicated" }
    ]
  },
  {
    id: "lp-hiv-neg-titer",
    type: "question",
    module: 4,
    title: "Current NTT Titer",
    body: "What is the current NTT (RPR/VDRL) titer?",
    citation: [1],
    options: [
      { label: "NTT ≥1:32", description: "Higher titer with treatment failure — consider LP", next: "lp-consider", urgency: "urgent" },
      { label: "NTT <1:32", description: "Lower titer — assess for reinfection", next: "lp-reinfection" }
    ]
  },
  {
    id: "lp-consider",
    type: "question",
    module: 4,
    title: "Consider Lumbar Puncture",
    body: "LP is recommended based on treatment failure with NTT ≥1:32. This is a clinical judgment decision.",
    citation: [1],
    options: [
      { label: "Proceed with LP", description: "Obtain CSF for analysis", next: "csf-vdrl-result" },
      { label: "Defer LP — treat based on stage", description: "Proceed to stage-appropriate treatment", next: "tx-stage-select" }
    ]
  },
  {
    id: "lp-reinfection",
    type: "result",
    module: 4,
    title: "Assess for Reinfection",
    body: "Treatment failure with NTT <1:32. Assess for possible reinfection (new exposure, new lesion). Consider retreatment with stage-appropriate regimen.",
    citation: [1],
    recommendation: "Evaluate for reinfection. If reinfection unlikely, consider retreatment: [Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM weekly × 3 doses.",
    confidence: "recommended"
  },
  {
    id: "lp-hiv-pos-simple",
    type: "question",
    module: 4,
    title: "HIV+ Patient Assessment",
    body: `Does the HIV-positive patient have any neurologic, hearing, or vision concerns?

Note: Same treatment regimens apply regardless of HIV status. ART improves outcomes (CSF WBC and VDRL more likely to normalize in patients receiving antiretrovirals).`,
    citation: [1, 9, 17],
    options: [
      { label: "Yes — neurologic, hearing, or vision concerns", description: "LP indicated", next: "lp-indicated-hiv", urgency: "critical" },
      { label: "No concerns", description: "LP not indicated", next: "lp-not-indicated" }
    ]
  },
  {
    id: "lp-indicated-hiv",
    type: "info",
    module: 4,
    title: "LP Indicated — HIV+ with Concerns",
    body: "Lumbar puncture is indicated for this HIV-positive patient with neurologic, hearing, or vision concerns. Proceed to CSF interpretation.",
    citation: [1, 9],
    next: "csf-vdrl-result"
  },
  {
    id: "lp-not-indicated",
    type: "info",
    module: 4,
    title: "LP Not Indicated",
    body: "Lumbar puncture is not indicated for this patient. Proceed to stage-appropriate treatment.",
    citation: [1],
    next: "tx-stage-select"
  },
  {
    id: "csf-vdrl-result",
    type: "question",
    module: 5,
    title: "CSF-VDRL Result",
    body: `What is the CSF-VDRL result?

CSF-VDRL: Sensitivity 49–87.5%, Specificity 74–100%. A reactive result is diagnostic of neurosyphilis in the presence of neurologic signs/symptoms.

Ensure no blood contamination of the CSF sample.`,
    citation: [1, 3, 5],
    options: [
      { label: "Reactive", description: "Diagnostic of neurosyphilis (with neurologic signs/symptoms)", next: "csf-vdrl-reactive", urgency: "critical" },
      { label: "Nonreactive", description: "Does not rule out neurosyphilis — assess other CSF parameters", next: "csf-parameters" }
    ]
  },
  {
    id: "csf-vdrl-reactive",
    type: "info",
    module: 5,
    title: "Neurosyphilis Confirmed",
    body: "Reactive CSF-VDRL is diagnostic of neurosyphilis in the presence of neurologic signs and symptoms. Proceed to neurosyphilis treatment.",
    citation: [1, 3, 5],
    next: "tx-neurosyphilis"
  },
  {
    id: "csf-parameters",
    type: "question",
    module: 5,
    title: "CSF Parameters",
    body: `Assess CSF-WBC count and protein.

CSF-WBC thresholds:
• HIV-negative: >5 cells/mm³ = elevated (sensitive but not specific)
• HIV-positive: >20 cells/mm³ = more specific cutoff (>5 may be from HIV itself)

CSF protein: Low sensitivity AND specificity for neurosyphilis.

Are CSF-WBC or protein elevated?`,
    citation: [1, 3, 5],
    options: [
      { label: "Elevated WBC or protein", description: "Neurosyphilis still possible — proceed to additional testing", next: "csf-additional", urgency: "urgent" },
      { label: "Normal WBC AND protein", description: "With negative CSF-VDRL, neurosyphilis is unlikely", next: "csf-normal" }
    ]
  },
  {
    id: "csf-normal",
    type: "info",
    module: 5,
    title: "Neurosyphilis Unlikely",
    body: `Normal CSF-WBC, normal protein, and nonreactive CSF-VDRL = neurosyphilis is unlikely. Proceed to stage-appropriate treatment.

CLINICAL BOTTOM LINE: If clinical suspicion for neurosyphilis remains HIGH despite negative CSF, consider empiric neurosyphilis treatment.`,
    citation: [1, 5],
    next: "tx-stage-select"
  },
  {
    id: "csf-additional",
    type: "question",
    module: 5,
    title: "Additional CSF Testing",
    body: `CSF-VDRL is nonreactive but WBC or protein is elevated. Neurosyphilis is still possible.

CSF FTA-ABS: Sensitivity 91–100%, Specificity ~55%.
CSF TP-PA: Sensitivity ~97%, Specificity ~84%.

A NONREACTIVE CSF FTA-ABS or TP-PA makes neurosyphilis highly unlikely.
A REACTIVE result does NOT confirm neurosyphilis (less specific than VDRL) but supports clinical suspicion.

What is the CSF FTA-ABS or TP-PA result?`,
    citation: [1, 3, 5],
    options: [
      { label: "Nonreactive", description: "Neurosyphilis highly unlikely, especially with nonspecific neurologic symptoms", next: "csf-trep-nonreactive" },
      { label: "Reactive", description: "Supports clinical suspicion but does not confirm — consider empiric treatment", next: "csf-trep-reactive", urgency: "urgent" },
      { label: "Not available / pending", description: "Clinical decision needed based on available data", next: "csf-clinical-decision" }
    ]
  },
  {
    id: "csf-trep-nonreactive",
    type: "info",
    module: 5,
    title: "Neurosyphilis Highly Unlikely",
    body: "Nonreactive CSF FTA-ABS or TP-PA makes neurosyphilis highly unlikely, especially when neurologic symptoms are nonspecific. Proceed to stage-appropriate treatment.",
    citation: [3, 5],
    next: "tx-stage-select"
  },
  {
    id: "csf-trep-reactive",
    type: "question",
    module: 5,
    title: "CSF Treponemal Test Reactive",
    body: `Reactive CSF FTA-ABS or TP-PA supports clinical suspicion for neurosyphilis but does NOT confirm it (less specific than CSF-VDRL).

CDC recommends considering empiric neurosyphilis treatment when clinical suspicion is high.

CSF PCR for T. pallidum (if available): Specificity 97–100%, Sensitivity 27–42.5%. CDC does not recommend CSF PCR (not standardized). Most useful when CSF-VDRL negative + treponemal test positive.`,
    citation: [1, 3, 8, 13, 14],
    options: [
      { label: "Treat empirically as neurosyphilis", description: "Clinical suspicion remains high", next: "tx-neurosyphilis", urgency: "critical" },
      { label: "Treat based on stage", description: "Clinical suspicion is low — reactive treponemal likely nonspecific", next: "tx-stage-select" }
    ]
  },
  {
    id: "csf-clinical-decision",
    type: "question",
    module: 5,
    title: "Clinical Decision",
    body: `Additional CSF testing is not available. The CSF-VDRL is nonreactive but WBC or protein is elevated.

CLINICAL BOTTOM LINE: If clinical suspicion for neurosyphilis remains HIGH despite negative CSF-VDRL, treat empirically as neurosyphilis.

What is the clinical suspicion level?`,
    citation: [1, 5],
    options: [
      { label: "High suspicion — treat as neurosyphilis", description: "Empiric neurosyphilis treatment", next: "tx-neurosyphilis", urgency: "critical" },
      { label: "Low suspicion — treat based on stage", description: "Stage-appropriate treatment", next: "tx-stage-select" }
    ]
  },
  {
    id: "tx-stage-select",
    type: "question",
    module: 6,
    title: "Stage-Appropriate Treatment",
    body: "Select the syphilis stage to see the recommended treatment regimen.",
    citation: [1],
    options: [
      { label: "Primary or Secondary", next: "tx-primary-secondary" },
      { label: "Early Latent", next: "tx-early-latent" },
      { label: "Late Latent or Unknown Duration", next: "tx-late-latent" },
      { label: "Tertiary (after LP rules out neurosyphilis)", next: "tx-tertiary" }
    ]
  },
  {
    id: "tx-neurosyphilis",
    type: "result",
    module: 6,
    title: "Neurosyphilis Treatment",
    body: "Treat as neurosyphilis, ocular syphilis, or otosyphilis. [Penicillin G](#/drug/penicillin-g-iv) is the ONLY proven effective therapy for neurosyphilis.",
    citation: [1, 10, 11],
    recommendation: "[Aqueous crystalline penicillin G](#/drug/penicillin-g-iv) — see dosing below.",
    confidence: "definitive",
    treatment: {
      firstLine: {
        drug: "Aqueous crystalline penicillin G",
        dose: "18–24 million units/day IV",
        route: "IV",
        frequency: "3–4 million units q4h OR continuous infusion",
        duration: "10–14 days",
        notes: "Achieves treponemicidal levels in CSF."
      },
      alternative: {
        drug: "Procaine penicillin G + probenecid",
        dose: "Procaine PCN 2.4 million units IM daily + probenecid 500 mg PO QID",
        route: "IM + PO",
        frequency: "Daily (procaine PCN) + four times daily (probenecid)",
        duration: "10–14 days",
        notes: "Equivalent outcomes to IV penicillin G (Dunaway et al., CID 2020)."
      },
      pcnAllergy: {
        drug: "Ceftriaxone (if desensitization not feasible)",
        dose: "2g daily",
        route: "IV",
        frequency: "Once daily",
        duration: "10–14 days",
        notes: "Penicillin desensitization STRONGLY recommended (CDC). Penicillin remains the only proven effective therapy. Ceftriaxone: European data shows similar efficacy (Bettuzzi et al., Lancet ID 2021). Doxycycline 200 mg PO BID × 28 days has LIMITED DATA for neurosyphilis. Azithromycin NOT recommended (widespread macrolide resistance)."
      },
      monitoring: "Repeat LP every 6 months until CSF normalizes. CSF-WBC should decline at 6 months; if not, consider retreatment. CSF-VDRL and protein normalize more slowly. NTT titers: check at 3, 6, 9, 12, 24 months. HIV+ patients: ART improves CSF normalization outcomes."
    }
  },
  {
    id: "tx-primary-secondary",
    type: "result",
    module: 6,
    title: "Primary & Secondary Syphilis Treatment",
    body: "Standard treatment for primary or secondary syphilis without evidence of neurosyphilis.",
    citation: [1, 6],
    recommendation: "[Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM × 1 dose.",
    confidence: "definitive",
    treatment: {
      firstLine: {
        drug: "Benzathine penicillin G",
        dose: "2.4 million units",
        route: "IM",
        frequency: "Single dose",
        duration: "1 dose"
      },
      pcnAllergy: {
        drug: "Doxycycline",
        dose: "100 mg",
        route: "PO",
        frequency: "BID",
        duration: "14 days",
        notes: "For nonpregnant PCN-allergic patients. Ceftriaxone 1–2g daily (IV or IM) × 10–14 days is another option."
      },
      monitoring: "NTT titers at 3, 6, 9, 12, 24 months. Fourfold decline within 12–24 months = successful treatment. 15–20% have serologic nonresponse (titers remain reactive, usually ≤1:8)."
    }
  },
  {
    id: "tx-early-latent",
    type: "result",
    module: 6,
    title: "Early Latent Syphilis Treatment",
    body: "Standard treatment for early latent syphilis (acquired within prior 12 months) without evidence of neurosyphilis.",
    citation: [1],
    recommendation: "[Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM × 1 dose.",
    confidence: "definitive",
    treatment: {
      firstLine: {
        drug: "Benzathine penicillin G",
        dose: "2.4 million units",
        route: "IM",
        frequency: "Single dose",
        duration: "1 dose"
      },
      pcnAllergy: {
        drug: "Doxycycline",
        dose: "100 mg",
        route: "PO",
        frequency: "BID",
        duration: "28 days",
        notes: "For nonpregnant PCN-allergic patients."
      },
      monitoring: "NTT titers at 3, 6, 9, 12, 24 months. Fourfold decline within 12–24 months = successful treatment."
    }
  },
  {
    id: "tx-late-latent",
    type: "result",
    module: 6,
    title: "Late Latent / Unknown Duration Treatment",
    body: "Treatment for late latent syphilis, syphilis of unknown duration, or when no clear timeline exists. Treat as late latent.",
    citation: [1],
    recommendation: "[Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM weekly × 3 doses.",
    confidence: "definitive",
    treatment: {
      firstLine: {
        drug: "Benzathine penicillin G",
        dose: "2.4 million units",
        route: "IM",
        frequency: "Weekly",
        duration: "3 weeks (3 doses)"
      },
      pcnAllergy: {
        drug: "Doxycycline",
        dose: "100 mg",
        route: "PO",
        frequency: "BID",
        duration: "28 days",
        notes: "For nonpregnant PCN-allergic patients."
      },
      monitoring: "NTT titers at 6, 12, 18, 24 months. Fourfold decline if initially high (≥1:32). Many with low titers and late latent do NOT achieve fourfold decline."
    }
  },
  {
    id: "tx-tertiary",
    type: "result",
    module: 6,
    title: "Tertiary Syphilis Treatment",
    body: "Treatment for tertiary syphilis (gummatous or cardiovascular) after CSF evaluation rules out neurosyphilis.",
    citation: [1],
    recommendation: "[Benzathine penicillin G](#/drug/benzathine-penicillin) 2.4 million units IM weekly × 3 doses.",
    confidence: "definitive",
    treatment: {
      firstLine: {
        drug: "Benzathine penicillin G",
        dose: "2.4 million units",
        route: "IM",
        frequency: "Weekly",
        duration: "3 weeks (3 doses)",
        notes: "After CSF evaluation rules out neurosyphilis."
      },
      pcnAllergy: {
        drug: "Doxycycline",
        dose: "100 mg",
        route: "PO",
        frequency: "BID",
        duration: "28 days",
        notes: "For nonpregnant PCN-allergic patients. Limited data for tertiary syphilis."
      },
      monitoring: "NTT titers at 6, 12, 18, 24 months. Clinical monitoring for ongoing gummatous or cardiovascular complications."
    }
  }
];
var NEUROSYPHILIS_NODE_COUNT = NEUROSYPHILIS_NODES.length;
var NEUROSYPHILIS_MODULE_LABELS = ["Serology", "Stage", "Symptoms", "LP", "CSF", "Treatment"];
var NEUROSYPHILIS_CITATIONS = [
  { num: 1, text: "Workowski KA, et al. STI Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187." },
  { num: 2, text: "Tuddenham S, et al. Syphilis Laboratory Guidelines: NTT Performance. Clin Infect Dis. 2020;71(S1):S21-S42." },
  { num: 3, text: "Ding D, et al. Diagnostic Performance of Lab Tests of Neurosyphilis: Systematic Review & Network Meta-Analysis. Eur Neurol. 2023;86(6):418-429." },
  { num: 4, text: "Chevalier FJ, et al. Syphilis. JAMA. 2025." },
  { num: 5, text: "Ropper AH. Neurosyphilis. N Engl J Med. 2019;381(14):1358-1363." },
  { num: 6, text: "Peeling RW, et al. Syphilis. Lancet. 2023;402(10398):336-346." },
  { num: 7, text: "Ghanem KG, et al. The Modern Epidemic of Syphilis. N Engl J Med. 2020;382(9):845-854." },
  { num: 8, text: "Vanhaecke C, et al. Neurosyphilis and T. pallidum Nested PCR in CSF. Clin Infect Dis. 2016;63(9):1180-1186." },
  { num: 9, text: "Benson C, et al. OI Guidelines for Adults/Adolescents With HIV. IDSA/OARAC. 2025." },
  { num: 10, text: "Bettuzzi T, et al. Ceftriaxone vs Benzylpenicillin in Neurosyphilis. Lancet Infect Dis. 2021;21(10):1441-1447." },
  { num: 11, text: "Dunaway SB, et al. Neurosyphilis Treatment: IV PCN G vs IM Procaine PCN + Probenecid. Clin Infect Dis. 2020;71(2):267-273." },
  { num: 12, text: "Davis AP, et al. How Well Do Neurologic Symptoms Identify Neurosyphilis? Clin Infect Dis. 2018;66(3):363-367." },
  { num: 13, text: "Salle R, et al. Molecular vs Serological Assays on CSF for Neurosyphilis. JEADV. 2023;37(2):390-394." },
  { num: 14, text: "Vrbová E, et al. Nested PCR Detection of Syphilis Treponemes. PLoS One. 2020;15(8):e0237949." },
  { num: 15, text: "Tuddenham S, et al. Diagnosis and Treatment of STIs: A Review. JAMA. 2022;327(2):161-172." },
  { num: 16, text: "Miller JM, et al. Microbiology Lab Utilization Guide: 2024 Update. IDSA/ASM. Clin Infect Dis. 2024." },
  { num: 17, text: "Thompson MA, et al. Primary Care Guidance for Persons With HIV: 2020 Update. HIVMA/IDSA. Clin Infect Dis. 2021;73(11):e3572-e3605." }
];
var NEUROSYPHILIS_DIAGNOSTIC_TESTS = [
  { test: "CSF-VDRL", sensitivity: "49–87.5%", specificity: "74–100%", role: "Cornerstone. Reactive = diagnostic (with neuro signs)" },
  { test: "CSF-RPR", sensitivity: "51.5–81.8%", specificity: "81.8–100%", role: "Similar to VDRL, may be less sensitive" },
  { test: "CSF FTA-ABS", sensitivity: "91–100%", specificity: "~55%", role: "High sensitivity. Negative = rules out neurosyphilis" },
  { test: "CSF TP-PA", sensitivity: "~97%", specificity: "~84%", role: "Highest sensitivity. Negative = rules out" },
  { test: "CSF TPHA", sensitivity: "91–100%", specificity: "~55%", role: "Similar to FTA-ABS" },
  { test: "CSF PCR (qPCR)", sensitivity: "41–42.5%", specificity: "97–100%", role: "Confirms active CNS infection when positive" },
  { test: "CSF PCR (nested)", sensitivity: "27%", specificity: "100%", role: "Most specific but least sensitive" },
  { test: "CSF WBC >5/mm³", sensitivity: "Sensitive", specificity: "Not specific", role: "Baseline for non-HIV" },
  { test: "CSF WBC >20/mm³", sensitivity: "—", specificity: "More specific", role: "Better cutoff for HIV+ patients" },
  { test: "CSF protein", sensitivity: "Low", specificity: "Low", role: "Normalizes slowly after treatment" }
];
var NEUROSYPHILIS_CLINICAL_NOTES = [
  "Neurologic symptoms: Specificity 91.6–100%, Sensitivity 1.5–38.1%. Absence does NOT rule out neurosyphilis.",
  "CSF-VDRL: Reactive result is diagnostic with neuro signs. Nonreactive does NOT rule out neurosyphilis.",
  "CSF FTA-ABS/TP-PA: Nonreactive result makes neurosyphilis highly unlikely (high NPV).",
  "Prozone phenomenon: False-negative NTT at very high titers. Always request dilution if suspicion is high.",
  "HIV+ patients: Use WBC >20/mm³ cutoff (>5 may be from HIV itself). Same treatment regimens apply.",
  "Penicillin: The ONLY proven effective therapy for neurosyphilis. Desensitize if allergic."
];

// src/data/trees/pneumothorax.ts
var PNEUMOTHORAX_NODES = [
  {
    id: "pneumothorax-start",
    type: "info",
    module: 1,
    title: "Pneumothorax POCUS: VPPI & Technique",
    body: `THE VISCERAL-PARIETAL PLEURAL INTERFACE (VPPI)
The VPPI is the anatomic foundation for all ultrasound signs used to diagnose pneumothorax. In healthy lungs, the visceral and parietal pleura appear as a single echogenic line ~0.2–0.3 mm thick on ultrasound. When air accumulates between these layers, it disrupts their normal contact, producing the key diagnostic findings:

• Absent lung sliding — air prevents visceral-parietal contact (100% sensitivity, 78% specificity)
• Absent B-lines — comet-tail artifacts require direct pleural contact; their absence with no sliding suggests pneumothorax
• Lung point — where collapsed lung intermittently contacts the chest wall (100% specificity, pathognomonic)

A-lines seen in pneumothorax are horizontal reverberation artifacts from the parietal pleura-air interface, replacing normal lung parenchymal signals from an intact VPPI.

EXAMINATION TECHNIQUE
Probe: High-frequency linear (5–12 MHz), longitudinal orientation.
Position: Anterior chest wall, 3rd–4th intercostal space, mid-clavicular line. Scan laterally.
Patient: Supine — free air rises to the most anterior (least dependent) portions of the chest.`,
    citation: [1, 2, 3, 7],
    images: [
      {
        src: "images/pneumothorax/us-anatomy.png",
        alt: "Ultrasound anatomy of the anterior chest wall showing ribs, intercostal muscle, and the visceral-parietal pleural interface (VPPI)",
        caption: "Normal pleural anatomy: Ribs cast acoustic shadows. The VPPI (pleural line) is visible between rib shadows."
      }
    ],
    next: "ptx-lung-sliding"
  },
  {
    id: "ptx-lung-sliding",
    type: "question",
    module: 2,
    title: "Step 1: Assess Lung Sliding",
    body: `In B-mode, observe the pleural line between rib shadows. Lung sliding appears as a shimmering, back-and-forth movement at the VPPI with respiration.

Is lung sliding present at this scanning location?`,
    citation: [1, 3],
    options: [
      {
        label: "Lung sliding present",
        description: "Normal shimmering movement visible at pleural line",
        next: "ptx-sliding-blines"
      },
      {
        label: "Lung sliding absent",
        description: "No pleural movement observed at this location",
        next: "ptx-blines-check",
        urgency: "urgent"
      }
    ]
  },
  {
    id: "ptx-sliding-blines",
    type: "question",
    module: 2,
    title: "B-Lines Assessment",
    body: `Lung sliding is present, which effectively rules out pneumothorax at this scanning location.

Are B-lines (vertical comet-tail artifacts extending from the pleural line to the bottom of the screen) also visible?`,
    citation: [1],
    images: [
      {
        src: "images/pneumothorax/b-lines.png",
        alt: "Ultrasound image showing B-lines: vertical comet-tail artifacts extending from the pleural line",
        caption: "B-lines: Vertical hyperechoic comet-tail artifacts arising from the pleural line."
      }
    ],
    options: [
      {
        label: "B-lines present",
        description: "Vertical hyperechoic artifacts arising from pleural line",
        next: "ptx-excluded-blines"
      },
      {
        label: "No B-lines (A-lines only)",
        description: "Only horizontal reverberation artifacts visible",
        next: "ptx-excluded-sliding"
      }
    ]
  },
  {
    id: "ptx-excluded-blines",
    type: "result",
    module: 2,
    title: "Pneumothorax Excluded",
    body: `B-lines arise from the visceral-parietal pleural interface and cannot be generated when air separates the pleurae. The presence of B-lines reliably excludes pneumothorax at this scanning zone.

Lung sliding + B-lines = strongest evidence against pneumothorax.`,
    citation: [1, 2, 4],
    recommendation: "No pneumothorax at this scanning location. B-lines confirm pleural apposition. If clinical suspicion remains, scan additional intercostal spaces.",
    confidence: "definitive",
    images: [
      {
        src: "images/pneumothorax/b-lines.png",
        alt: "Ultrasound image showing B-lines: vertical comet-tail artifacts extending from the pleural line",
        caption: "B-lines: Vertical hyperechoic artifacts arising from the pleural line, confirming visceral-parietal contact."
      }
    ]
  },
  {
    id: "ptx-excluded-sliding",
    type: "result",
    module: 2,
    title: "Pneumothorax Excluded",
    body: `Lung sliding confirms the visceral and parietal pleura are apposed and moving together with respiration. No pneumothorax at this scanning zone.

Normal A-line pattern (horizontal reverberation artifacts) with lung sliding is the expected finding in healthy aerated lung.`,
    citation: [1, 3],
    recommendation: "No pneumothorax at this location. Normal lung sliding with A-lines. If clinical suspicion remains, scan additional intercostal spaces.",
    confidence: "definitive"
  },
  {
    id: "ptx-blines-check",
    type: "question",
    module: 3,
    title: "Step 2: Evaluate for Pneumothorax",
    body: `Lung sliding is absent. Next, check for B-lines (comet-tail artifacts extending vertically from the pleural line).

Absent lung sliding alone has 100% sensitivity but only 78% specificity for pneumothorax — it can also occur with atelectasis, consolidation, lung contusion, prior pleurodesis, or mainstem intubation.

Are B-lines present?`,
    citation: [1, 2, 3],
    images: [
      {
        src: "images/pneumothorax/b-lines.png",
        alt: "Ultrasound image showing B-lines: vertical comet-tail artifacts extending from the pleural line",
        caption: "B-lines: Vertical hyperechoic comet-tail artifacts arising from the pleural line."
      }
    ],
    options: [
      {
        label: "B-lines present",
        description: "Vertical comet-tail artifacts visible despite absent sliding",
        next: "ptx-other-causes"
      },
      {
        label: "No B-lines — A-lines only (suspect pneumothorax)",
        description: "Only horizontal reverberation artifacts with no lung sliding",
        next: "ptx-a-profile",
        urgency: "urgent"
      }
    ]
  },
  {
    id: "ptx-other-causes",
    type: "result",
    module: 3,
    title: "Absent Sliding with B-Lines",
    body: `Absent lung sliding with B-lines present is NOT consistent with pneumothorax. B-lines require intact visceral-parietal pleural contact to be generated.

Consider alternative causes of absent lung sliding:
• Atelectasis
• Consolidation / pneumonia
• Lung contusion (trauma)
• Pleural adhesions / prior pleurodesis
• Mainstem intubation
• Apnea / respiratory arrest`,
    citation: [1, 3, 7],
    recommendation: "Pneumothorax excluded at this location. Investigate alternative etiology for absent lung sliding. Clinical correlation required.",
    confidence: "recommended"
  },
  {
    id: "ptx-a-profile",
    type: "info",
    module: 3,
    title: "Pneumothorax Suspected",
    body: `Absent lung sliding + only A-lines (no B-lines) = high suspicion for pneumothorax.

This pattern is highly suspicious but is not pathognomonic on its own. The combined absence of lung sliding and B-lines with presence of a lung point provides the highest diagnostic accuracy (pooled sensitivity 89%, specificity 99%).

Proceed to search for the lung point — the only sign with 100% specificity for pneumothorax.`,
    citation: [1, 2, 3],
    next: "ptx-lung-point"
  },
  {
    id: "ptx-lung-point",
    type: "question",
    module: 4,
    title: "Step 3: Search for Lung Point",
    body: `Scan laterally from the anterior chest wall. The lung point is where the collapsed lung margin meets the chest wall — it appears as sudden replacement of the pneumothorax pattern by lung sliding or B-lines at a specific location.

The lung point has 79–100% sensitivity and 100% specificity, making it the only pathognomonic sign of pneumothorax. Its location along the chest wall can also estimate pneumothorax size.

Was a lung point identified?`,
    citation: [2, 3, 4],
    images: [
      {
        src: "images/pneumothorax/lung-point.png",
        alt: "CT scan showing pneumothorax alongside ultrasound image of the lung point where collapsed lung meets chest wall",
        caption: "Lung point: The transition zone where absent lung sliding meets normal sliding, marking the pneumothorax edge."
      }
    ],
    options: [
      {
        label: "Lung point identified",
        description: "Transition from pneumothorax pattern to lung sliding found",
        next: "ptx-confirmed",
        urgency: "critical"
      },
      {
        label: "No lung point found",
        description: "Pneumothorax pattern persists across entire anterior-lateral chest",
        next: "ptx-mmode",
        urgency: "urgent"
      }
    ]
  },
  {
    id: "ptx-confirmed",
    type: "result",
    module: 4,
    title: "Pneumothorax Confirmed",
    body: `The lung point is pathognomonic for pneumothorax — it is the ONLY sign with 100% specificity. It represents the exact location where the separated visceral pleura intermittently contacts the parietal pleura at the pneumothorax margin.

Lung point location can estimate size:
• Anterior only → small pneumothorax
• Lateral chest wall → moderate
• Posterior or not found → large / complete

Ultrasound demonstrates superior sensitivity (90.9%) compared to supine CXR (50.2%) with comparable specificity (98.2% vs 99.4%).`,
    citation: [3, 4, 6],
    recommendation: "Pneumothorax confirmed (pathognomonic finding). Correlate clinically for management: observation vs aspiration vs chest tube based on size, symptoms, and hemodynamic status.",
    confidence: "definitive"
  },
  {
    id: "ptx-mmode",
    type: "question",
    module: 4,
    title: "Step 4: M-Mode Confirmation",
    body: `No lung point was found, but pneumothorax pattern is present (absent sliding, no B-lines). Use M-mode for additional confirmation.

Place the M-mode cursor at the pleural line and observe the pattern:
• Seashore sign (normal): Granular pattern below the pleural line = lung movement
• Barcode / stratosphere sign (abnormal): Horizontal parallel lines throughout = no lung movement

The barcode sign is suggestive but not diagnostic alone — it can occur with any cause of absent lung sliding.

What is the M-mode pattern?`,
    citation: [4, 5, 7],
    images: [
      {
        src: "images/pneumothorax/m-mode-barcode.png",
        alt: "M-mode comparison: Normal seashore sign (left) showing granular pattern below pleura vs pneumothorax barcode/stratosphere sign (right) showing horizontal parallel lines",
        caption: "M-mode: Seashore sign (normal lung, left) vs Barcode/Stratosphere sign (pneumothorax, right)."
      }
    ],
    options: [
      {
        label: "Barcode / stratosphere sign",
        description: "Horizontal parallel lines throughout — no lung movement",
        next: "ptx-likely",
        urgency: "critical"
      },
      {
        label: "Seashore sign",
        description: "Granular pattern below pleural line — normal lung movement",
        next: "ptx-reassess"
      }
    ]
  },
  {
    id: "ptx-likely",
    type: "result",
    module: 4,
    title: "Pneumothorax Likely",
    body: `Pneumothorax pattern + barcode/stratosphere sign on M-mode is highly suggestive of pneumothorax.

The barcode sign alone is suggestive but not diagnostic — it can occur with other causes of absent lung sliding. Combined with the pneumothorax pattern (no lung sliding + no B-lines + no lung point found), clinical suspicion should be high.

Absence of a lung point may indicate a large or complete pneumothorax where no transition zone is accessible.

The Society of Critical Care Medicine recommends ultrasound to complement or replace conventional CXR for pneumothorax diagnosis, particularly when rapid results are needed.`,
    citation: [1, 4, 5],
    recommendation: "High clinical suspicion for pneumothorax. Consider CT chest for confirmation if patient is hemodynamically stable. If unstable with clinical concern for tension pneumothorax, proceed with emergent intervention (needle decompression or chest tube).",
    confidence: "recommended"
  },
  {
    id: "ptx-reassess",
    type: "result",
    module: 4,
    title: "Reassess — Findings Inconsistent",
    body: `Pneumothorax pattern was identified (no lung sliding, no B-lines) but M-mode shows seashore sign, which indicates normal lung movement. These findings are inconsistent.

Possible explanations:
• Probe position shifted between B-mode and M-mode assessment
• Intermittent or small pneumothorax
• Subcutaneous emphysema mimicking absent lung sliding
• Technical artifact`,
    citation: [4, 7],
    recommendation: "Inconsistent findings. Recommend re-scanning with careful attention to probe position. If clinical suspicion persists, consider CT chest for definitive evaluation.",
    confidence: "consider"
  }
];
var PNEUMOTHORAX_NODE_COUNT = PNEUMOTHORAX_NODES.length;
var PNEUMOTHORAX_MODULE_LABELS = ["Technique", "Sliding", "Assessment", "Lung Point"];
var PNEUMOTHORAX_CITATIONS = [
  { num: 1, text: "Frankel HL, et al. Guidelines for the Appropriate Use of Bedside General and Cardiac Ultrasonography in the Evaluation of Critically Ill Patients—Part I: General Ultrasonography. Crit Care Med. 2015;43(11):2479-502." },
  { num: 2, text: "Picano E, et al. Lung Ultrasound for the Cardiologist. JACC Cardiovasc Imaging. 2018;11(11):1692-1705." },
  { num: 3, text: "Lichtenstein DA, et al. Ultrasound Diagnosis of Occult Pneumothorax. Crit Care Med. 2005;33(6):1231-8." },
  { num: 4, text: "Buda N, et al. Basics of Point-of-Care Lung Ultrasonography. N Engl J Med. 2023;389(21):e44." },
  { num: 5, text: "Stewart DL, et al. Use of Point-of-Care Ultrasonography in the NICU for Diagnostic and Procedural Purposes. Pediatrics. 2022." },
  { num: 6, text: "Alrajhi K, et al. Test Characteristics of Ultrasonography for the Detection of Pneumothorax: A Systematic Review and Meta-Analysis. Chest. 2012." },
  { num: 7, text: "Volpicelli G. Sonographic Diagnosis of Pneumothorax. Intensive Care Med. 2011;37(2):224-32." }
];
var PNEUMOTHORAX_DIAGNOSTIC_TESTS = [
  { test: "Lung Ultrasound", sensitivity: "90.9%", specificity: "98.2%", role: "Superior sensitivity to supine CXR. Recommended for rapid bedside evaluation." },
  { test: "Supine Chest X-ray", sensitivity: "50.2%", specificity: "99.4%", role: "Misses ~50% of pneumothoraces. May miss anterior or small pneumothoraces." },
  { test: "Lung Sliding (absent)", sensitivity: "95–100%", specificity: "78–91%", role: "Screening sign. Absence does NOT confirm PTX alone." },
  { test: "Lung Point", sensitivity: "79–100%", specificity: "100%", role: "Pathognomonic. Only sign that definitively confirms pneumothorax." },
  { test: "Absent Sliding/B-lines + Lung Point", sensitivity: "89%", specificity: "99%", role: "Combined approach provides highest diagnostic accuracy." }
];
var PNEUMOTHORAX_CLINICAL_NOTES = [
  "Lung sliding is 95–100% sensitive for ruling out pneumothorax at the scanning location, but only 78–91% specific.",
  "Absent lung sliding does NOT confirm pneumothorax — also seen in mainstem intubation, pleurodesis, ARDS, apnea, consolidation.",
  "B-lines reliably EXCLUDE pneumothorax — they require direct visceral-parietal pleural contact to be generated.",
  "The lung point is the ONLY pathognomonic sign (100% specificity). Its position estimates pneumothorax size.",
  "Barcode/stratosphere sign on M-mode is suggestive but not diagnostic alone — confirms absent lung movement, not the cause.",
  "Ultrasound sensitivity (90.9%) is nearly double supine CXR (50.2%) for pneumothorax detection. SCCM recommends US to complement or replace CXR."
];

// src/data/trees/pe-treatment.ts
var PE_TREATMENT_NODES = [
  {
    id: "pe-start",
    type: "info",
    module: 1,
    title: "PE Treatment: Risk Stratification",
    body: `This consult guides acute pulmonary embolism management based on hemodynamic status, right ventricular function, cardiac biomarkers, and clinical severity.

RISK CLASSIFICATION
• High Risk: Hemodynamically unstable (RV enlargement + elevated troponin)
• Intermediate-High: Stable, high clinical severity (PESI >86 or sPESI ≥1), RV enlargement + elevated troponin
• Intermediate-Low: Stable, one of RV enlargement OR elevated troponin
• Low Risk: Stable, low clinical severity (PESI <86 or sPESI = 0), no RV enlargement, no elevated troponin

Clinical severity is determined by PESI or sPESI score:
• High severity: PESI > 86 (Class III–V) or sPESI ≥ 1
• Low severity: PESI < 86 (Class I–II) or sPESI = 0`,
    citation: [1],
    next: "pe-hemodynamics"
  },
  {
    id: "pe-hemodynamics",
    type: "question",
    module: 1,
    title: "Hemodynamic Status",
    body: "Is the patient hemodynamically unstable?",
    options: [
      {
        label: "Hemodynamically unstable",
        description: "SBP < 90 mmHg sustained, vasopressor requirement, or cardiac arrest",
        next: "pe-high-anticoag",
        urgency: "critical"
      },
      {
        label: "Hemodynamically stable",
        description: "SBP ≥ 90 mmHg, adequate perfusion",
        next: "pe-rv"
      }
    ]
  },
  {
    id: "pe-rv",
    type: "question",
    module: 1,
    title: "RV Assessment",
    body: "Is there RV enlargement or dysfunction on echocardiography or CTPA?",
    options: [
      {
        label: "Yes — RV enlargement/dysfunction",
        description: "Echo: RV dilation, hypokinesis, or CTPA: RV/LV ratio > 0.9",
        next: "pe-troponin-rv-pos",
        urgency: "urgent"
      },
      {
        label: "No — Normal RV",
        description: "No evidence of right ventricular strain",
        next: "pe-troponin-rv-neg"
      }
    ]
  },
  {
    id: "pe-troponin-rv-pos",
    type: "question",
    module: 1,
    title: "Troponin (RV Positive)",
    body: "RV enlargement/dysfunction confirmed. Is troponin elevated?",
    options: [
      {
        label: "Yes — Troponin elevated",
        description: "Both RV dysfunction and elevated troponin — assess clinical severity",
        next: "pe-severity",
        urgency: "urgent"
      },
      {
        label: "No — Troponin normal",
        description: "RV dysfunction without biomarker elevation — intermediate-low risk",
        next: "pe-int-low-anticoag"
      }
    ]
  },
  {
    id: "pe-severity",
    type: "question",
    module: 1,
    title: "Clinical Severity (PESI / sPESI)",
    body: `Both RV dysfunction and elevated troponin are present. Determine clinical severity using PESI or sPESI score.

High severity: PESI > 86 (Class III–V) or sPESI ≥ 1
Low severity: PESI < 86 (Class I–II) or sPESI = 0`,
    calculatorLinks: [
      { id: "pesi", label: "Calculate PESI" },
      { id: "spesi", label: "Calculate sPESI" }
    ],
    citation: [1],
    options: [
      {
        label: "High clinical severity",
        description: "PESI > 86 (Class III–V) or sPESI ≥ 1",
        next: "pe-int-high-anticoag",
        urgency: "urgent"
      },
      {
        label: "Low clinical severity",
        description: "PESI < 86 (Class I–II) or sPESI = 0",
        next: "pe-int-low-anticoag"
      }
    ]
  },
  {
    id: "pe-troponin-rv-neg",
    type: "question",
    module: 1,
    title: "Troponin (RV Normal)",
    body: "No RV enlargement/dysfunction. Is troponin elevated?",
    options: [
      {
        label: "Yes — Troponin elevated",
        description: "Elevated troponin without RV dysfunction — intermediate-low risk",
        next: "pe-int-low-anticoag"
      },
      {
        label: "No — Troponin normal",
        description: "No RV dysfunction, no biomarker elevation — low risk",
        next: "pe-low-anticoag"
      }
    ]
  },
  {
    id: "pe-high-anticoag",
    type: "question",
    module: 2,
    title: "Systemic Anticoagulation — High Risk",
    body: `HIGH RISK PE: Hemodynamically unstable.

Is systemic anticoagulation contraindicated?

Absolute contraindications:
• Life-threatening active bleeding
• Platelet count < 25
• Spinal procedure and/or epidural placement (discuss with proceduralist)

Relative contraindications:
• Brain metastases conferring risk of bleeding (renal, choriocarcinoma, melanoma, thyroid cancer)
• Intracranial or CNS bleeding within the past 4 weeks
• Recent high-risk surgery or bleeding event
• Active but non-life-threatening bleeding
• Active GI ulceration at high risk of bleeding
• Platelets < 50`,
    citation: [1],
    options: [
      {
        label: "Not contraindicated — Start IV heparin",
        description: "Start intravenous unfractionated heparin infusion",
        next: "pe-high-heparin"
      },
      {
        label: "Contraindicated",
        description: "Absolute or relative contraindication to anticoagulation",
        next: "pe-high-anticoag-contra",
        urgency: "critical"
      }
    ]
  },
  {
    id: "pe-high-anticoag-contra",
    type: "result",
    module: 2,
    title: "High Risk PE — Anticoagulation Contraindicated",
    body: "Systemic anticoagulation is contraindicated in this patient.",
    recommendation: "Goals of care discussion. Consider IVC filter placement.",
    confidence: "consider",
    citation: [1]
  },
  {
    id: "pe-high-heparin",
    type: "info",
    module: 2,
    title: "IV Heparin Started — Evaluate for Thrombolytics",
    body: `Intravenous [unfractionated heparin](#/drug/ufh) infusion initiated.

Dose: Bolus 80 units/kg (or 5,000 units) IV, then continuous infusion at 18 units/kg/hour.

Now evaluate for systemic thrombolysis. Review contraindications to fibrinolysis before proceeding.`,
    next: "pe-high-lytic-check"
  },
  {
    id: "pe-high-lytic-check",
    type: "question",
    module: 2,
    title: "Thrombolytics — Contraindication Screen",
    body: `Are thrombolytics contraindicated?

Absolute contraindications to fibrinolysis:
• History of haemorrhagic stroke or stroke of unknown origin
• Ischaemic stroke in previous 6 months
• Central nervous system neoplasm
• Major trauma, surgery, or head injury in previous 3 weeks
• Bleeding diathesis
• Active bleeding

Relative contraindications:
• Transient ischaemic attack in previous 6 months
• Oral anticoagulation
• Pregnancy or first post-partum week
• Non-compressible puncture sites
• Traumatic resuscitation
• Refractory hypertension (systolic BP > 180 mmHg)
• Advanced liver disease
• Infective endocarditis
• Active peptic ulcer`,
    citation: [1],
    options: [
      {
        label: "Not contraindicated — Give thrombolytics",
        description: "No absolute or relative contraindications to fibrinolysis",
        next: "pe-high-lytic-protocol"
      },
      {
        label: "Contraindicated",
        description: "Absolute or relative contraindication to fibrinolysis",
        next: "pe-high-lytic-contra",
        urgency: "critical"
      }
    ]
  },
  {
    id: "pe-high-lytic-contra",
    type: "result",
    module: 2,
    title: "High Risk PE — Thrombolytics Contraindicated",
    body: "Thrombolytics are contraindicated in this patient. Anticoagulation with IV [heparin](#/drug/ufh) continues.",
    recommendation: "Consider goals of care discussion and IVC filter placement.",
    confidence: "consider",
    citation: [1]
  },
  {
    id: "pe-high-lytic-protocol",
    type: "info",
    module: 2,
    title: "Alteplase Protocol",
    body: `SYSTEMIC THROMBOLYSIS PROTOCOL

1. Stop [unfractionated heparin](#/drug/ufh) drip

2. Start 100 mg of [alteplase](#/drug/alteplase) administered over 2 hours
   • 0.6 mg/kg up to a max of 50 mg administered over first 15 minutes
   • Remainder administered over next 1 hour 45 minutes
   • Adjust based on clinical severity

3. When [alteplase](#/drug/alteplase) infusion is complete, check PTT level:
   a. If PTT ≤ 75: Start intravenous [unfractionated heparin](#/drug/ufh) gtt without initial bolus
   b. If PTT > 75: Repeat PTT level q 2 hours until PTT ≤ 75, then start intravenous [unfractionated heparin](#/drug/ufh) gtt without initial bolus`,
    citation: [1],
    next: "pe-high-lytic-response"
  },
  {
    id: "pe-high-lytic-response",
    type: "question",
    module: 2,
    title: "Thrombolytic Response Assessment",
    body: `Evaluate response to thrombolytics (1–2 hours):

SBP > 90 mmHg with improvement in clinical condition?`,
    options: [
      {
        label: "Yes — SBP > 90, clinical improvement",
        description: "Hemodynamic recovery after thrombolysis",
        next: "pe-high-respond-yes"
      },
      {
        label: "No — Persistent hemodynamic compromise",
        description: "No improvement despite thrombolytic therapy",
        next: "pe-high-respond-no",
        urgency: "critical"
      }
    ]
  },
  {
    id: "pe-high-respond-yes",
    type: "result",
    module: 2,
    title: "Thrombolysis Successful — Continue Anticoagulation",
    body: "Patient responded to thrombolytic therapy with hemodynamic improvement.",
    recommendation: "Continue anticoagulation. Transition to long-term therapy when clinically stable.",
    confidence: "definitive",
    citation: [1]
  },
  {
    id: "pe-high-respond-no",
    type: "result",
    module: 2,
    title: "Thrombolysis Failed — Rescue Interventions",
    body: "No hemodynamic improvement after thrombolytic therapy.",
    recommendation: `Consider rescue interventions:
• Mechanical thrombectomy
• Low-dose catheter-directed thrombolysis
• IVC filter placement
• Transfer to a cardiac center for surgical thrombectomy
• ECMO`,
    confidence: "definitive",
    citation: [1]
  },
  {
    id: "pe-int-high-anticoag",
    type: "question",
    module: 3,
    title: "Systemic Anticoagulation — Intermediate-High Risk",
    body: `INTERMEDIATE-HIGH RISK PE: Hemodynamically stable with RV dysfunction, elevated troponin, and high clinical severity.

Is systemic anticoagulation contraindicated?

*** Screen for enrollment in clinical trial ***`,
    citation: [1],
    options: [
      {
        label: "Not contraindicated",
        description: "Start IV unfractionated heparin infusion and evaluate reperfusion strategy",
        next: "pe-int-high-strategy"
      },
      {
        label: "Contraindicated",
        description: "Cannot anticoagulate",
        next: "pe-int-high-contra",
        urgency: "critical"
      }
    ]
  },
  {
    id: "pe-int-high-contra",
    type: "result",
    module: 3,
    title: "Intermediate-High Risk — Anticoag Contraindicated",
    body: `Systemic anticoagulation is contraindicated.

IVC filter recommendations (ESC 2019):
• IVC filters should be considered in patients with acute PE and absolute contraindications to anticoagulation (Class IIa, Level C)
• IVC filters should be considered in cases of PE recurrence despite therapeutic anticoagulation (Class IIa, Level C)
• Routine use of IVC filters is not recommended (Class III, Level A)

If able to tolerate periprocedural anticoagulation, consider:
• Percutaneous mechanical thrombectomy
• Transfer for surgical thrombectomy`,
    recommendation: "Consider goals of care discussion and IVC filter placement. If periprocedural anticoagulation tolerable, consider interventional approach.",
    confidence: "consider",
    citation: [1]
  },
  {
    id: "pe-int-high-strategy",
    type: "question",
    module: 3,
    title: "Reperfusion Strategy",
    body: `IV [heparin](#/drug/ufh) initiated. Evaluate for invasive reperfusion strategy vs trial of systemic anticoagulation.

*** Screen for enrollment in clinical trial ***

Assess clot burden and clinical findings to guide management approach.`,
    citation: [1],
    options: [
      {
        label: "CDT — Moderate/segmental findings",
        description: "Moderate to severe clinical findings or segmental/subsegmental without proximal or saddle thrombus",
        next: "pe-int-high-cdt"
      },
      {
        label: "CDT + Mechanical — Severe/proximal clot",
        description: "Severe clinical findings or large proximal clot burden",
        next: "pe-int-high-severe",
        urgency: "urgent"
      },
      {
        label: "Systemic heparin trial — Monitor",
        description: "Trial of systemic heparin as initial management strategy",
        next: "pe-int-high-heparin"
      }
    ]
  },
  {
    id: "pe-int-high-cdt",
    type: "result",
    module: 3,
    title: "Catheter-Directed Thrombolysis (CDT)",
    body: "Moderate to severe clinical findings or segmental/subsegmental thrombus without proximal or saddle involvement.",
    recommendation: "Low-dose catheter-directed thrombolysis / EKOS.",
    confidence: "recommended",
    citation: [1]
  },
  {
    id: "pe-int-high-severe",
    type: "result",
    module: 3,
    title: "Severe Clot Burden — Aggressive Intervention",
    body: "Severe clinical findings or large proximal clot burden.",
    recommendation: `Recommended interventions:
1. Low-dose catheter-directed thrombolysis / EKOS
2. Percutaneous mechanical thrombectomy

If clinical worsening despite invasive treatment:
• Mechanical thrombectomy (if not already performed)
• Consider transfer to a cardiac center for surgical thrombectomy or ECMO`,
    confidence: "definitive",
    citation: [1]
  },
  {
    id: "pe-int-high-heparin",
    type: "result",
    module: 3,
    title: "Systemic Heparin Trial — Monitor",
    body: "Trial of systemic [heparin](#/drug/ufh) chosen as initial management strategy. Monitor closely for clinical worsening.",
    recommendation: `Continue IV [heparin](#/drug/ufh) with close monitoring.

If clinical worsening, consider escalation:
• Low-dose catheter-directed thrombolysis / EKOS
• Percutaneous mechanical thrombectomy
• Systemic thrombolysis`,
    confidence: "recommended",
    citation: [1]
  },
  {
    id: "pe-int-low-anticoag",
    type: "question",
    module: 4,
    title: "Systemic Anticoagulation — Intermediate-Low Risk",
    body: `INTERMEDIATE-LOW RISK PE: Hemodynamically stable with one of RV enlargement OR elevated troponin (not both with high clinical severity).

Is systemic anticoagulation contraindicated?`,
    citation: [1],
    options: [
      {
        label: "Not contraindicated",
        description: "Start anticoagulation therapy",
        next: "pe-int-low-treat"
      },
      {
        label: "Contraindicated",
        description: "Cannot anticoagulate",
        next: "pe-int-low-contra",
        urgency: "critical"
      }
    ]
  },
  {
    id: "pe-int-low-contra",
    type: "result",
    module: 4,
    title: "Intermediate-Low Risk — Anticoag Contraindicated",
    body: "Systemic anticoagulation is contraindicated.",
    recommendation: `Consider goals of care discussion and IVC filter placement.

IVC filter recommendations (ESC 2019):
• IVC filters should be considered with absolute contraindications to anticoagulation (Class IIa, Level C)
• Routine use of IVC filters is not recommended (Class III, Level A)`,
    confidence: "consider",
    citation: [1]
  },
  {
    id: "pe-int-low-treat",
    type: "result",
    module: 4,
    title: "Intermediate-Low Risk — Anticoagulation",
    body: `Start systemic anticoagulation:
• Intravenous [unfractionated heparin](#/drug/ufh) infusion, or
• [LMWH (enoxaparin)](#/drug/enoxaparin) 1 mg/kg SC

[LMWH](#/drug/enoxaparin) Contraindications & Cautions:
• Severe renal insufficiency (CrCl ≤30 mL/min) — significantly increased bleeding risk (OR 2.25 for major bleeding). Consider UFH when CrCl <25–30 mL/min.
• Heparin-induced thrombocytopenia (HIT) — absolute contraindication due to cross-reactivity.
• Neuraxial anesthesia — administer LMWH ≥12 hr before catheter placement/removal; delay dosing ≥4 hr after removal. No twice-daily LMWH with indwelling neuraxial catheter.
• Extreme body weight (<40 kg or >100 kg), pregnancy, pediatrics — consider anti-Xa monitoring. Monitor if >150 kg.
• LMWH effects cannot be completely reversed by protamine sulfate.`,
    recommendation: `Initiate anticoagulation and monitor for clinical worsening.

If clinical worsening, consider escalation:
• Low-dose catheter-directed thrombolysis / EKOS
• Percutaneous mechanical thrombectomy
• Systemic thrombolysis`,
    confidence: "recommended",
    citation: [1]
  },
  {
    id: "pe-low-anticoag",
    type: "question",
    module: 5,
    title: "Systemic Anticoagulation — Low Risk",
    body: `LOW RISK PE: Hemodynamically stable, low clinical severity, no RV dysfunction, no elevated troponin.

Is systemic anticoagulation contraindicated?`,
    citation: [1],
    options: [
      {
        label: "Not contraindicated",
        description: "Start anticoagulation therapy",
        next: "pe-low-treat"
      },
      {
        label: "Contraindicated",
        description: "Cannot anticoagulate",
        next: "pe-low-contra",
        urgency: "critical"
      }
    ]
  },
  {
    id: "pe-low-contra",
    type: "result",
    module: 5,
    title: "Low Risk PE — Anticoag Contraindicated",
    body: "Systemic anticoagulation is contraindicated.",
    recommendation: "Consider IVC filter placement.",
    confidence: "consider",
    citation: [1]
  },
  {
    id: "pe-low-treat",
    type: "question",
    module: 5,
    title: "Low Risk PE — Treatment & Disposition",
    body: `Start anticoagulation:
• Intravenous [unfractionated heparin](#/drug/ufh) infusion
• [LMWH (enoxaparin)](#/drug/enoxaparin) 1 mg/kg SC
• [Oral anticoagulation](#/info/doac-pe) ([rivaroxaban](#/drug/rivaroxaban) or [edoxaban](#/drug/edoxaban) preferred)

[LMWH](#/drug/enoxaparin) Contraindications & Cautions:
• Severe renal insufficiency (CrCl ≤30 mL/min) — significantly increased bleeding risk (OR 2.25 for major bleeding). Consider UFH when CrCl <25–30 mL/min.
• Heparin-induced thrombocytopenia (HIT) — absolute contraindication due to cross-reactivity.
• Neuraxial anesthesia — administer LMWH ≥12 hr before catheter placement/removal; delay dosing ≥4 hr after removal. No twice-daily LMWH with indwelling neuraxial catheter.
• Extreme body weight (<40 kg or >100 kg), pregnancy, pediatrics — consider anti-Xa monitoring. Monitor if >150 kg.
• LMWH effects cannot be completely reversed by protamine sulfate.

Consider discharge home if ALL criteria met:
• Clinically stable
• No other reason for hospitalization
• Easy access to medical care
• Family and social support`,
    citation: [1],
    options: [
      {
        label: "Admit — Inpatient anticoagulation",
        description: "Does not meet all discharge criteria",
        next: "pe-low-admit"
      },
      {
        label: "Discharge home — Meets all criteria",
        description: "Clinically stable, access to care, family/social support",
        next: "pe-low-discharge"
      }
    ]
  },
  {
    id: "pe-low-admit",
    type: "result",
    module: 5,
    title: "Low Risk PE — Inpatient Anticoagulation",
    body: "Patient does not meet discharge criteria. Admit for anticoagulation initiation and monitoring.",
    recommendation: "Start anticoagulation ([UFH](#/drug/ufh), [LMWH](#/drug/enoxaparin) SC, or oral) and monitor. Reassess discharge eligibility when clinically appropriate. See [LMWH](#/drug/enoxaparin) contraindications/cautions in treatment options.",
    confidence: "recommended",
    citation: [1]
  },
  {
    id: "pe-low-discharge",
    type: "result",
    module: 5,
    title: "Low Risk PE — Outpatient Management",
    body: `Patient meets all discharge criteria:
• Clinically stable
• No other reason for hospitalization
• Easy access to medical care
• Family and social support`,
    recommendation: "Discharge home on oral anticoagulation ([rivaroxaban](#/drug/rivaroxaban) or [edoxaban](#/drug/edoxaban) preferred) with close outpatient follow-up.",
    confidence: "recommended",
    citation: [1]
  }
];
var PE_TREATMENT_NODE_COUNT = PE_TREATMENT_NODES.length;
var PE_TREATMENT_MODULE_LABELS = [
  "Risk Classification",
  "High Risk",
  "Intermediate-High",
  "Intermediate-Low",
  "Low Risk"
];
var PE_TREATMENT_CITATIONS = [
  { num: 1, text: "Konstantinides SV, et al. 2019 ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism. Eur Heart J. 2020;41(4):543-603." },
  { num: 2, text: "Aujesky D, et al. Derivation and Validation of a Prognostic Model for Pulmonary Embolism (PESI). Am J Respir Crit Care Med. 2005;172(8):1041-1046." },
  { num: 3, text: "Freund Y, Cohen-Aubart F, Bloom B. Acute Pulmonary Embolism: A Review. JAMA. 2022;328(13):1336-1345." },
  { num: 4, text: "Goldhaber SZ, Bounameaux H. Pulmonary Embolism and Deep Vein Thrombosis. Lancet. 2012;379(9828):1835-1846." },
  { num: 5, text: "Konstantinides SV, et al. Management of Pulmonary Embolism: An Update. J Am Coll Cardiol. 2016;67(8):976-990." },
  { num: 6, text: "Di Nisio M, van Es N, Büller HR. Deep Vein Thrombosis and Pulmonary Embolism. Lancet. 2016;388(10063):3060-3073." },
  { num: 7, text: "Zuin M, Bikdeli B, et al. International Clinical Practice Guideline Recommendations for Acute Pulmonary Embolism: Harmony, Dissonance, and Silence. J Am Coll Cardiol. 2024;83(21):2068-2082." }
];
var PE_TREATMENT_DIAGNOSTIC_TESTS = [
  { test: "PESI Score (original)", sensitivity: "—", specificity: "—", role: "11-variable scoring system. Class I–II (≤85): low risk. Class III–V (>86): high clinical severity." },
  { test: "sPESI Score (simplified)", sensitivity: "—", specificity: "—", role: "6-variable scoring. Score 0: low risk (~1% mortality). Score ≥1: intermediate/high risk (~10.9% mortality)." },
  { test: "CT RV/LV ratio > 0.9", sensitivity: "~80%", specificity: "~85%", role: "Predicts RV dysfunction on initial CTA. Key marker for submassive classification." },
  { test: "Troponin elevation", sensitivity: "~73%", specificity: "~55%", role: "RV myocardial injury marker. Combined with RV dysfunction → intermediate-high risk." },
  { test: "BNP > 100 / NT-proBNP > 600", sensitivity: "~85%", specificity: "~55%", role: "RV strain marker. Elevated in acute RV pressure overload. Supports risk stratification." }
];
var PE_TREATMENT_CLINICAL_NOTES = [
  "High risk PE = hemodynamically unstable (SBP < 90 sustained, vasopressors, or cardiac arrest). Do not delay treatment for additional imaging in unstable patients.",
  "Intermediate-high risk requires ALL THREE: RV dysfunction + elevated troponin + high clinical severity (PESI > 86 or sPESI ≥ 1). If any one is absent, classify as intermediate-low.",
  "Alteplase protocol for high-risk PE: 100 mg IV over 2 hours (0.6 mg/kg up to 50 mg over first 15 min, remainder over next 1 hr 45 min). Check PTT post-infusion before restarting heparin.",
  "Absolute contraindications to anticoagulation: life-threatening active bleeding, platelets < 25, spinal procedure/epidural. Relative: brain mets, ICH within 4 weeks, recent surgery, platelets < 50.",
  "Low-risk PE patients may be candidates for outpatient management if: clinically stable, no other reason for hospitalization, easy access to medical care, and family/social support.",
  "IVC filters should only be considered with absolute contraindications to anticoagulation or PE recurrence despite therapeutic anticoagulation. Routine use is NOT recommended (ESC Class III, Level A)."
];

// src/data/trees/echo-views.ts
var ECHO_VIEWS_NODES = [
  {
    id: "echo-views-start",
    type: "info",
    module: 1,
    title: "Basic Echo: Probe & Orientation",
    body: `PROBE SELECTION
The probe of choice is the cardiac (phased array) probe — its small footprint fits between rib spaces. If unavailable, the curvilinear probe can be used as a substitute.

PROBE ORIENTATION
Two conventions exist and you MUST know which your machine uses:

• Standard mode — indicator on the LEFT of the screen. Probe marker points to patient's right side or head.
• Cardiac mode — indicator on the RIGHT of the screen. Probe marker directions are flipped.

Think of the heart as an upside-down cone:
• Long axis (PLAX): In cardiac mode, probe marker → patient's RIGHT SHOULDER
• Short axis (PSAX): In cardiac mode, probe marker → patient's LEFT SHOULDER

If your image looks flipped (e.g., LV on the wrong side), check: (1) is the screen in cardiac or standard mode? (2) where is the probe marker pointing?

GETTING BETTER VIEWS
• Use plenty of ultrasound gel
• Apply firm pressure (push until the patient says "ow")
• Move in a circular pattern to find the window
• Left lateral decubitus position brings the heart closer to the chest wall
• Have the patient raise their arm above their head`,
    citation: [1, 2],
    images: [
      {
        src: "images/echo-views/probe.png",
        alt: "S4-2 phased array cardiac ultrasound probe",
        caption: "Phased array probe (S4-2): preferred for transthoracic echo due to small footprint."
      },
      {
        src: "images/echo-views/clock-diagram.png",
        alt: "Clock diagram showing probe indicator directions for PLAX (4 o'clock), PSAX (7 o'clock), Subxiphoid/A4C (9 o'clock), and IVC (12 o'clock)",
        caption: "Probe indicator directions by view (standard mode)."
      },
      {
        src: "images/echo-views/better-views-tips.png",
        alt: "Four tips for better echo views: more jelly, firm pressure, circular window search, and left lateral decubitus positioning",
        caption: "Troubleshooting: Jelly → Pressure → Window → Position."
      }
    ],
    next: "echo-views-overview"
  },
  {
    id: "echo-views-overview",
    type: "info",
    module: 1,
    title: "The Basic Echo Views of POCUS",
    body: `SUGGESTED PROTOCOL ORDER
Develop a systematic approach — always scan in the same sequence:

1. Parasternal Long Axis (PLAX)
2. Parasternal Short Axis (PSAX) — rotate 90° from PLAX
3. Apical 4-Chamber (A4C) — slide down to the apex
4. Subxiphoid 4-Chamber — move to the subxiphoid region
5. Subcostal IVC — rotate to longitudinal, aim cephalad

Each view shows different structures and provides unique information. The following modules walk through each view one at a time.`,
    citation: [1],
    images: [
      {
        src: "images/echo-views/focus-overview.png",
        alt: "Overview of the four basic FoCUS echo windows on the chest: PLAX, PSAX, Apical 4-chamber, and Subxiphoid, each with corresponding ultrasound image and anatomic diagram",
        caption: "The basic views of Focused Cardiac Ultrasound (FoCUS) with probe positions and corresponding anatomy."
      }
    ],
    next: "echo-views-plax"
  },
  {
    id: "echo-views-plax",
    type: "info",
    module: 2,
    title: "Parasternal Long Axis (PLAX)",
    body: `PROBE POSITION
Place the probe at the nipple line (4th intercostal space), right next to the sternum. Keep perpendicular to the skin. In cardiac mode, the probe marker points toward the patient's right shoulder.

OPTIMIZING THE VIEW
• Hug the sternum as you slide up and down rib spaces to find the best window
• Tilt and rock the probe to center the heart on screen
• If the image is poor, try one interspace higher or lower

THE 3 L's TO SUCCESS
The parasternal Long axis should have the Left ventricle on the Left side of the screen.
The cardiac septum should be horizontal.

STRUCTURES TO IDENTIFY
• Right ventricle (RV) — anterior, at top of screen
• Interventricular septum (IVS)
• Left ventricle (LV) — posterior to septum
• Aortic valve & aortic outflow tract
• Mitral valve (anterior & posterior leaflets)
• Left atrium (LA)
• Pericardium
• Descending aorta — circular structure posterior to the LA`,
    citation: [1, 2],
    images: [
      {
        src: "images/echo-views/plax-labeled.png",
        alt: "Parasternal long axis ultrasound view with labeled structures: right ventricular outflow tract (anterior), interventricular septum, left ventricle, aorta, aortic valve, mitral valve, and left atrium (posterior). Anatomic diagram overlay in lower right.",
        caption: "PLAX: RV outflow tract (anterior) → IVS → LV → Mitral valve → LA (posterior). Descending aorta visible behind LA."
      }
    ],
    next: "echo-views-psax"
  },
  {
    id: "echo-views-psax",
    type: "info",
    module: 3,
    title: "Parasternal Short Axis (PSAX)",
    body: `PROBE POSITION
From the PLAX position, rotate the probe 90° clockwise. In cardiac mode, the probe marker now points toward the patient's left shoulder.

OPTIMIZING THE VIEW
• Keep the probe in the same rib space — only rotate, don't slide
• The LV should appear as a circle (not an oval) — if oval, adjust your rotation angle

FANNING THROUGH LEVELS
Once in short axis, fan (tilt) the probe to see three key levels:

• Fan toward the apex (inferiorly) → Mid-papillary view
  — Cross-section of LV at the level of the papillary muscles
  — Two bright bumps visible inside the LV cavity

• Fan toward the base (superiorly) → "Fish mouth" view
  — Mitral valve appears as a fish mouth opening and closing

• Fan further toward the base → "Mercedes-Benz" sign
  — Aortic valve with 3 cusps forming a Mercedes-Benz logo

STRUCTURES TO IDENTIFY
• Left ventricle (circular cross-section)
• Right ventricle (crescent wrapping around the LV)
• Interventricular septum
• Anterior & posterior papillary muscles (mid-papillary level)
• Mitral valve leaflets (base level)
• Aortic valve cusps (base level)`,
    citation: [1, 2],
    images: [
      {
        src: "images/echo-views/psax-anatomy.png",
        alt: "Parasternal short axis view showing cross-section of left and right ventricles at the papillary muscle level, with anatomic diagram showing anterior wall, posterior wall, septum, and papillary muscles",
        caption: "PSAX at papillary muscle level: Circular LV with anterior and posterior papillary muscles. RV wraps around the septum."
      }
    ],
    next: "echo-views-a4c"
  },
  {
    id: "echo-views-a4c",
    type: "info",
    module: 4,
    title: "Apical 4-Chamber (A4C)",
    body: `PROBE POSITION
Slide down to the apex of the heart — the point of maximal impulse (PMI). The probe marker should point toward the patient's left axilla.

OPTIMIZING THE VIEW
• Palpate the PMI first, then place the probe
• The probe should be angled up toward the right shoulder
• Left lateral decubitus position is especially helpful for this view
• All four chambers should be visible with the apex at the top of the screen

STRUCTURES TO IDENTIFY
• Left ventricle (LV) — screen left
• Right ventricle (RV) — screen right
• Left atrium (LA) — below LV
• Right atrium (RA) — below RV
• Mitral valve — between LV and LA
• Tricuspid valve — between RV and RA
• Interatrial septum
• Interventricular septum
• Papillary muscles (within LV)`,
    citation: [1, 2],
    images: [
      {
        src: "images/echo-views/a4c-anatomy.png",
        alt: "Apical 4-chamber echocardiogram showing all four cardiac chambers (RV, LV, RA, LA), tricuspid valve, aortic valve, mitral valve, interventricular septum, interatrial septum, papillary muscles, and apex. Anatomic cross-section diagram alongside.",
        caption: "A4C: All four chambers visible with the apex at the top. LV on the left, RV on the right."
      }
    ],
    next: "echo-views-subcostal"
  },
  {
    id: "echo-views-subcostal",
    type: "info",
    module: 5,
    title: "Subxiphoid 4-Chamber",
    body: `PROBE POSITION
With the patient's knees bent, use an overhand grip and place the probe flat in the subxiphoid region (below the xiphoid process). The probe marker should point toward the patient's left side.

OPTIMIZING THE VIEW
• Start on the right side and use the liver as an acoustic window — this avoids bowel gas interference
• Have the patient take a deep breath to bring the heart into view
• Keep the probe nearly flat against the abdomen — almost parallel to the skin
• Apply firm downward pressure
• If the image is still poor, try pushing slightly to the patient's right to use more of the liver window

STRUCTURES TO IDENTIFY
• Liver — near field (closest to probe)
• Right ventricle (RV) — closest cardiac chamber to the probe
• Left ventricle (LV)
• Right atrium (RA)
• Left atrium (LA)
• Pericardium — bright echogenic line surrounding the heart`,
    citation: [1, 2],
    images: [
      {
        src: "images/echo-views/subxiphoid-view.png",
        alt: "Subxiphoid view of the heart showing anatomic diagram with liver, RV, LV, RA, LA labeled alongside corresponding ultrasound image",
        caption: "Subxiphoid 4-chamber: Liver as acoustic window. RV is closest chamber to the probe."
      }
    ],
    next: "echo-views-ivc"
  },
  {
    id: "echo-views-ivc",
    type: "info",
    module: 6,
    title: "Subcostal IVC",
    body: `PROBE POSITION
From the subxiphoid position, rotate to a longitudinal orientation and aim toward the patient's head until you see the IVC entering the right atrium.

OPTIMIZING THE VIEW
• The IVC runs parallel to the aorta — the IVC is thin-walled and compressible, the aorta is thick-walled and pulsatile
• Use the liver as your acoustic window
• Fan left and right to center the IVC in the long axis
• You should see the IVC draining into the right atrium
• The hepatic vein can be seen joining the IVC — this is your measurement landmark

STRUCTURES TO IDENTIFY
• Inferior vena cava (IVC) — thin-walled, collapsible with respiration
• Right atrium — where the IVC drains
• Hepatic vein — entering the IVC
• Liver — surrounding acoustic window
• Aorta — nearby, thick-walled, pulsatile (don't confuse with IVC)`,
    citation: [1, 2],
    images: [
      {
        src: "images/echo-views/ivc-labeled.png",
        alt: "Subcostal IVC ultrasound showing IVC entering the right atrium with labeled liver, hepatic vein (HV), portal vein (PV), and RA",
        caption: "Subcostal IVC: IVC draining into RA. Hepatic vein (HV) and portal vein (PV) visible. Liver as acoustic window."
      }
    ],
    next: "echo-views-complete"
  },
  {
    id: "echo-views-complete",
    type: "result",
    module: 6,
    title: "Basic Echo Views — Quick Reference",
    body: `PROTOCOL ORDER
1. PLAX — Parasternal Long Axis
2. PSAX — Parasternal Short Axis (90° from PLAX)
3. A4C — Apical 4-Chamber
4. Subxiphoid — Subxiphoid 4-Chamber
5. IVC — Subcostal IVC`,
    citation: [1, 2],
    recommendation: `PROBE POSITION REMINDERS

• PLAX: 4th ICS, next to sternum, marker → right shoulder
• PSAX: Same spot, rotate 90° clockwise, marker → left shoulder
• A4C: Apex / PMI, marker → left axilla
• Subxiphoid: Below xiphoid, overhand grip, flat angle, marker → patient's left
• IVC: Rotate longitudinal from subxiphoid, aim cephalad

KEY TIPS
• Phased array probe preferred (small footprint for rib spaces)
• Know your machine's indicator convention (cardiac vs standard mode)
• PLAX: "3 L's" — Long axis, Left ventricle, Left side of screen
• PSAX: LV should look circular, not oval — adjust rotation if needed
• Use the liver as acoustic window for subxiphoid and IVC views
• Left lateral decubitus position helps for parasternal and apical views`,
    confidence: "definitive"
  }
];
var ECHO_VIEWS_NODE_COUNT = ECHO_VIEWS_NODES.length;
var ECHO_VIEWS_MODULE_LABELS = ["Intro", "PLAX", "PSAX", "A4C", "Subxiphoid", "IVC"];
var ECHO_VIEWS_CITATIONS = [
  { num: 1, text: 'Avula M. "Basic Transthoracic Echocardiography." 5MinSono.com. Dr. Jailyn Avila, MD.' },
  { num: 2, text: "PocketICU.com — Cardiac ultrasound reference images and protocols." }
];

// src/data/trees/priapism.ts
var PRIAPISM_NODES = [
  {
    id: "priapism-start",
    type: "info",
    module: 1,
    title: "Priapism: Overview",
    body: `Priapism = prolonged erection lasting > 4 hours, unrelated to sexual stimulation.

Two types:
• Ischemic (low-flow) — EMERGENCY. Most common. Veno-occlusive.
• Non-ischemic (high-flow) — NOT an emergency. Arterial. Usually post-trauma.

History to obtain:
• Duration of erection
• Pain level
• Trauma history (straddle injury, perineal blunt trauma)
• PDE5 inhibitor or intracavernosal injection (ICI) use
• Sickle cell disease
• Medications (antipsychotics, trazodone, anticoagulants)`,
    citation: [1, 2, 8],
    next: "priapism-differential"
  },
  {
    id: "priapism-differential",
    type: "info",
    module: 1,
    title: "Ischemic vs Non-Ischemic: Key Differences",
    body: `ISCHEMIC (Low-Flow)
• Painful, fully rigid
• No trauma history
• Dark blood on aspiration
• Compartment syndrome of the penis
• UROLOGIC EMERGENCY

NON-ISCHEMIC (High-Flow)
• Painless or mild discomfort
• Partially erect (not fully rigid)
• Trauma history (straddle injury, kick, fall)
• Bright red blood on aspiration
• Arterial fistula → unregulated inflow
• NOT an emergency

If unsure, corporal blood gas or Color Doppler ultrasound can help differentiate.`,
    citation: [1, 2, 10, 11],
    next: "priapism-type"
  },
  {
    id: "priapism-type",
    type: "question",
    module: 1,
    title: "Classification",
    body: "Based on history and exam, which type of priapism is this?",
    options: [
      {
        label: "Ischemic (low-flow)",
        description: "Painful, fully rigid, no trauma, dark blood expected",
        next: "priapism-ischemic-confirm",
        urgency: "critical"
      },
      {
        label: "Non-ischemic (high-flow)",
        description: "Painless or mild discomfort, partially erect, post-traumatic",
        next: "priapism-nonischemic-info"
      },
      {
        label: "Uncertain — need blood gas",
        description: "Clinical picture unclear, aspirate for corporal blood gas",
        next: "priapism-bloodgas",
        urgency: "urgent"
      }
    ]
  },
  {
    id: "priapism-bloodgas",
    type: "info",
    module: 1,
    title: "Corporal Blood Gas Analysis",
    body: `Aspirate blood from corpus cavernosum and send for blood gas.

BLOOD COLOR
• Dark, deoxygenated = ischemic
• Bright red, oxygenated = non-ischemic

ISCHEMIC PATTERN
• pO₂ < 30 mmHg
• pCO₂ > 60 mmHg
• pH < 7.25

NON-ISCHEMIC PATTERN
• pO₂ > 90 mmHg
• pCO₂ < 40 mmHg
• pH 7.35–7.45

Note: Exact cutoffs are not standardized across studies, but the pattern of hypoxia + hypercarbia + acidosis reliably identifies ischemic priapism.

Color Doppler ultrasound is a complementary noninvasive option if available.`,
    citation: [1, 2, 9, 10, 11],
    next: "priapism-bloodgas-result"
  },
  {
    id: "priapism-bloodgas-result",
    type: "question",
    module: 1,
    title: "Blood Gas Result",
    body: "What does the corporal blood gas show?",
    options: [
      {
        label: "Ischemic pattern",
        description: "pO₂ < 30, pCO₂ > 60, pH < 7.25, dark blood",
        next: "priapism-ischemic-confirm",
        urgency: "critical"
      },
      {
        label: "Non-ischemic pattern",
        description: "pO₂ > 90, pCO₂ < 40, pH 7.35–7.45, bright red blood",
        next: "priapism-nonischemic-info"
      }
    ]
  },
  {
    id: "priapism-nonischemic-info",
    type: "info",
    module: 1,
    title: "Non-Ischemic Priapism",
    body: `NOT a urologic emergency.

• Usually from perineal trauma → arterial fistula
• Partially tumescent, painless
• 62% resolve spontaneously
• No aspiration or phenylephrine needed
• ED risk much lower than ischemic type`,
    citation: [1, 2, 3, 7],
    next: "priapism-nonischemic-result"
  },
  {
    id: "priapism-nonischemic-result",
    type: "result",
    module: 1,
    title: "Non-Ischemic Priapism — Observation",
    body: `Non-ischemic priapism is not an emergency.

• Most cases resolve on their own
• If persistent: selective arterial embolization (85–100% success)
• Requires interventional radiology referral
• Erectile function preserved in 80–100% of cases`,
    recommendation: "Observation is first-line. If persistent or patient prefers intervention, refer to interventional radiology for selective arterial embolization. Urology follow-up within 1–2 weeks.",
    confidence: "recommended",
    citation: [1, 2, 7, 11]
  },
  {
    id: "priapism-ischemic-confirm",
    type: "info",
    module: 1,
    title: "Ischemic Priapism — Emergency",
    body: `UROLOGIC EMERGENCY.

• Ischemic priapism = compartment syndrome of the penis
• Smooth muscle necrosis begins at 4–6 hours
• Delayed treatment > 24 hours → 30–70% erectile dysfunction
• Time-sensitive: proceed to assess duration and etiology now`,
    citation: [1, 2, 8],
    next: "priapism-sickle-check"
  },
  {
    id: "priapism-sickle-check",
    type: "question",
    module: 2,
    title: "Sickle Cell Disease?",
    body: `Does this patient have sickle cell disease (SCD)?

• ~40% of males with SCD experience priapism
• SCD priapism has specific initial management steps`,
    citation: [1, 6],
    options: [
      {
        label: "Yes — Sickle cell disease",
        description: "Known HbSS, HbSC, or sickle-beta thalassemia",
        next: "priapism-scd-duration",
        urgency: "urgent"
      },
      {
        label: "No — Not sickle cell",
        description: "No sickle cell disease",
        next: "priapism-duration"
      }
    ]
  },
  {
    id: "priapism-scd-duration",
    type: "question",
    module: 2,
    title: "SCD Priapism — Duration",
    body: `How long has the erection been present?

• < 4 hours: supportive measures may help
• ≥ 4 hours: requires emergent procedural intervention`,
    citation: [1, 6],
    options: [
      {
        label: "< 4 hours",
        description: "Erection less than 4 hours",
        next: "priapism-scd-supportive"
      },
      {
        label: "≥ 4 hours",
        description: "Erection 4 hours or longer",
        next: "priapism-scd-emergent",
        urgency: "critical"
      }
    ]
  },
  {
    id: "priapism-scd-supportive",
    type: "info",
    module: 2,
    title: "SCD Priapism < 4hr — Supportive Care",
    body: `Try supportive measures first:

• IV hydration (NS bolus)
• Analgesia (ketorolac, opioids PRN)
• Warm shower or warm packs
• Supplemental O₂

⚠️ Do NOT use RBC transfusion to treat priapism in SCD patients.

Monitor for resolution. If no improvement, proceed to aspiration.`,
    citation: [1, 6],
    next: "priapism-scd-supportive-response"
  },
  {
    id: "priapism-scd-supportive-response",
    type: "question",
    module: 2,
    title: "SCD Supportive Care Response",
    body: "Did supportive measures produce detumescence (complete resolution of rigidity)?",
    options: [
      {
        label: "Yes — Resolved",
        description: "Erection resolving with supportive care",
        next: "priapism-scd-resolved"
      },
      {
        label: "No — Persistent or now ≥ 4hr",
        description: "No improvement, or duration now ≥ 4 hours",
        next: "priapism-scd-emergent",
        urgency: "critical"
      }
    ]
  },
  {
    id: "priapism-scd-resolved",
    type: "result",
    module: 2,
    title: "SCD Priapism — Resolved",
    body: `Priapism resolved with supportive care.

• Hematology follow-up for recurrence prevention
• Options: hydroxyurea, GnRH agonists, PDE5i prophylaxis

[Return Precautions](#/info/priapism-return-precautions)`,
    recommendation: "Discharge with hematology follow-up. Discuss recurrence prevention. Return immediately for any erection lasting > 4 hours.",
    confidence: "definitive",
    citation: [1, 6]
  },
  {
    id: "priapism-scd-emergent",
    type: "info",
    module: 2,
    title: "SCD Priapism ≥ 4hr — Emergent",
    body: `SCD priapism ≥ 4 hours requires the same procedural treatment as non-SCD ischemic priapism.

• Continue IV hydration and analgesia
• Hematology consult for crisis management
• Do NOT use RBC transfusion to treat priapism
• Proceed to penile block for anesthesia`,
    citation: [1, 6],
    next: "priapism-penile-block-intro"
  },
  {
    id: "priapism-duration",
    type: "question",
    module: 2,
    title: "Ischemic Priapism — Duration",
    body: "How long has the erection been present? Duration drives treatment urgency and prognosis.",
    citation: [1, 2],
    options: [
      {
        label: "Post-ICI, < 4 hours",
        description: "After intracavernosal injection (alprostadil, papaverine, etc.)",
        next: "priapism-post-ici"
      },
      {
        label: "4–36 hours",
        description: "Standard ischemic priapism window",
        next: "priapism-penile-block-intro",
        urgency: "urgent"
      },
      {
        label: "> 36–48 hours",
        description: "Prolonged ischemic priapism, high risk of necrosis",
        next: "priapism-prolonged",
        urgency: "critical"
      }
    ]
  },
  {
    id: "priapism-post-ici",
    type: "info",
    module: 2,
    title: "Post-ICI Prolonged Erection (< 4hr)",
    body: `Post-intracavernosal injection priapism.

Conservative measures (try briefly, < 30–60 min):
• Ice packs
• Attempt ejaculation
• Exercise (walking, climbing stairs)

⚠️ Do NOT let conservative measures delay treatment.
If fully rigid and painful, proceed directly to phenylephrine.`,
    citation: [1, 4, 5],
    next: "priapism-post-ici-response"
  },
  {
    id: "priapism-post-ici-response",
    type: "question",
    module: 2,
    title: "Post-ICI Response",
    body: "Did conservative measures produce detumescence?",
    options: [
      {
        label: "Yes — Resolving",
        description: "Erection subsiding",
        next: "priapism-post-ici-resolved"
      },
      {
        label: "No — Persistent or now ≥ 4hr",
        description: "No improvement, proceed to procedural intervention",
        next: "priapism-penile-block-intro",
        urgency: "urgent"
      }
    ]
  },
  {
    id: "priapism-post-ici-resolved",
    type: "result",
    module: 2,
    title: "Post-ICI Priapism — Resolved",
    body: `Prolonged erection resolved with conservative measures.

• Observe 30–60 min to confirm sustained resolution
• Adjust ICI dose on follow-up with urology

[Return Precautions](#/info/priapism-return-precautions)`,
    recommendation: "Observe 30–60 minutes. Discharge with urology follow-up to adjust ICI dose. Return immediately for any erection > 4 hours.",
    confidence: "definitive",
    citation: [1, 5]
  },
  {
    id: "priapism-prolonged",
    type: "info",
    module: 2,
    title: "Prolonged Ischemic Priapism (> 36–48hr)",
    body: `Duration > 36–48 hours:

• Smooth muscle necrosis likely advanced
• Aspiration + phenylephrine less likely to succeed
• Still attempt aspiration + phenylephrine first
• If unsuccessful: immediate surgical consultation
• AUA/SMSNA recommends early penile prosthesis over delayed placement

Proceed to penile block.`,
    citation: [1, 7, 8],
    next: "priapism-penile-block-intro"
  },
  {
    id: "priapism-penile-block-intro",
    type: "info",
    module: 3,
    title: "Dorsal Penile Nerve Block — Overview",
    body: `Adequate anesthesia is essential before aspiration.

Dorsal penile nerve block provides excellent analgesia for corporal aspiration and irrigation.

Agent: 1% lidocaine WITHOUT epinephrine
• The penis is supplied by end-arteries
• NEVER use epinephrine — risk of ischemic necrosis

Dose: ~10 mL total (5 mL per side)`,
    citation: [1, 9],
    images: [
      {
        src: "images/priapism/penile-block.png",
        alt: "Dorsal penile nerve block injection sites and cross-sectional anatomy showing dorsal nerves, arteries, and corpora",
        caption: "Fig 1a: Injection sites at penile base. Fig 1b: Cross-section showing dorsal nerves. (Courtesy: Frank M. Corl, MS, Johns Hopkins Medical Institutions)"
      }
    ],
    next: "priapism-penile-block-technique"
  },
  {
    id: "priapism-penile-block-technique",
    type: "info",
    module: 3,
    title: "Dorsal Penile Nerve Block — Technique",
    body: `PROCEDURE

1. Clean the base of the penis with antiseptic
2. Identify the **10 o'clock** and **2 o'clock** positions at the penile base
3. Insert a **27-gauge needle** at the **10 o'clock** position
4. Advance under Buck's fascia (feel a slight pop)
5. Aspirate to ensure you're not in a vessel
6. Inject 5 mL of 1% lidocaine (no epi)
7. Repeat at the **2 o'clock** position with 5 mL

**You must pop through Buck's fascia to anesthetize the nerve.**

Total: 10 mL of 1% lidocaine without epinephrine

⚠️ Avoid the 12 o'clock midline (dorsal vein and deep dorsal artery)`,
    citation: [1, 9],
    images: [
      {
        src: "images/priapism/do-not-inject.png",
        alt: "Clock-face diagram showing safe injection zones — do not inject near the 6 o'clock (ventral) or 12 o'clock (dorsal midline) positions",
        caption: "Safe injection zones: avoid 12 o'clock (dorsal neurovascular bundle) and 6 o'clock (ventral urethra)."
      }
    ],
    next: "priapism-penile-block-complete"
  },
  {
    id: "priapism-penile-block-complete",
    type: "info",
    module: 3,
    title: "Penile Block — Confirm Anesthesia",
    body: `• Wait 5–10 minutes for full anesthetic effect
• Test with pinprick on penile shaft
• If inadequate, supplement with additional local at injection sites

When adequate anesthesia confirmed, proceed to corporal aspiration.`,
    citation: [1],
    next: "priapism-aspiration-intro"
  },
  {
    id: "priapism-aspiration-intro",
    type: "info",
    module: 4,
    title: "Corporal Aspiration — Setup",
    body: `EQUIPMENT
• 18–21 gauge butterfly needle or angiocath
• Three-way stopcock
• 20–60 mL syringe (for aspiration)
• 10–20 mL syringe with normal saline (for irrigation)
• Sterile prep and drape

INJECTION SITE
• Lateral aspect of proximal penile shaft
• 2 o'clock or 10 o'clock position
• AVOID 12 o'clock (dorsal neurovascular bundle)
• AVOID 6 o'clock (urethra)

Single-side entry is sufficient — the two corpora communicate via the intercavernosal septum.`,
    citation: [1, 2, 5, 9],
    images: [
      {
        src: "images/priapism/cross-section.png",
        alt: "Cross-sectional anatomy of the penis showing corpora cavernosa, corpus spongiosum, urethra, tunica albuginea, and neurovascular structures",
        caption: "Penile cross-section: Corpora cavernosa (paired), corpus spongiosum (ventral), urethra, and dorsal neurovascular bundle. (Courtesy: Frank M. Corl, MS, Johns Hopkins Medical Institutions)"
      },
      {
        src: "images/priapism/aspiration-setup.png",
        alt: "Three-way stopcock connected to butterfly needle and syringes for priapism aspiration setup",
        caption: "Aspiration setup: Three-way stopcock, butterfly needle, aspiration syringe, and saline irrigation syringe. (Source: EmDocs.net)"
      }
    ],
    next: "priapism-aspiration-technique"
  },
  {
    id: "priapism-aspiration-technique",
    type: "info",
    module: 4,
    title: "Corporal Aspiration — Procedure",
    body: `PROCEDURE

1. Insert needle at 2 or 10 o'clock into corpus cavernosum
2. Aspirate dark, deoxygenated blood
3. Continue aspirating until blood turns bright red
   (bright red = fresh arterial inflow restored)
4. Typically 20–30 mL per aspiration cycle

TIP: Can send initial aspirate for blood gas if type not yet confirmed.

IRRIGATION
5. After aspiration, irrigate with 20–30 mL normal saline
6. Re-aspirate
7. Repeat aspiration–irrigation cycles until aspirate is bright red

Irrigation clears clotted blood and metabolic waste, improving resolution rates.`,
    citation: [1, 2, 3, 9],
    images: [
      {
        src: "images/priapism/aspiration-procedure.png",
        alt: "Corporal aspiration procedure showing needle inserted into corpus cavernosum with three-way stopcock and syringe connected",
        caption: "Aspiration in progress: Needle in corpus cavernosum, stopcock connected, syringe aspirating blood. (Source: Mieczkowski JM et al., 2021)"
      }
    ],
    next: "priapism-aspiration-response"
  },
  {
    id: "priapism-aspiration-response",
    type: "question",
    module: 4,
    title: "Aspiration Response",
    body: `Did aspiration and irrigation produce detumescence?

• Aspiration + irrigation alone: ~36% success rate
• If not resolved, proceed to phenylephrine injection`,
    citation: [1, 3],
    options: [
      {
        label: "Yes — Detumescence",
        description: "Penis becoming flaccid after aspiration/irrigation",
        next: "priapism-aspiration-success"
      },
      {
        label: "No — Still rigid",
        description: "Persistent rigidity, proceed to phenylephrine",
        next: "priapism-phenylephrine-intro",
        urgency: "urgent"
      }
    ]
  },
  {
    id: "priapism-aspiration-success",
    type: "result",
    module: 4,
    title: "Aspiration Successful",
    body: `Priapism resolved with aspiration and irrigation.

• Observe 30–60 min to confirm sustained resolution
• Urology follow-up in 1–2 days

[Return Precautions](#/info/priapism-return-precautions)`,
    recommendation: "Observe 30–60 minutes to confirm sustained detumescence. Discharge with urology follow-up in 1–2 days. Return immediately for recurrence > 4 hours.",
    confidence: "definitive",
    citation: [1, 3, 9]
  },
  {
    id: "priapism-phenylephrine-intro",
    type: "info",
    module: 5,
    title: "Intracavernosal Phenylephrine",
    body: `Phenylephrine = first-line sympathomimetic (AUA/SMSNA 2022).

Why phenylephrine?
• Pure alpha-1 agonist → no intrinsic inotropy, no increase in heart rate
• Causes smooth muscle contraction → venous outflow
• 74% success rate (vs 25% terbutaline)
• Combined with aspiration: 70–100% success

Onset: 1 minute | Duration: 10–20 minutes

Tap for mixing instructions:
• [Phenylephrine](#/drug/phenylephrine) — first-line
• [Epinephrine](#/drug/epinephrine) — alternative if no phenylephrine`,
    citation: [1, 3, 4, 5],
    images: [
      {
        src: "images/priapism/mixing-instructions.png",
        alt: "Drug mixing instructions for epinephrine (10 mcg/mL) and phenylephrine (100 mcg/mL) showing vials, syringes, and labeled concentrations",
        caption: "Mixing instructions for intracavernosal sympathomimetics. (Source: EMCrit Podcast / EM:RAP)"
      }
    ],
    next: "priapism-phenylephrine-dose"
  },
  {
    id: "priapism-phenylephrine-dose",
    type: "info",
    module: 5,
    title: "Phenylephrine — Dosing Protocol",
    body: `⚠️ The corpora cavernosa communicate freely — only ONE side needs to be injected.

PHENYLEPHRINE (first-line)
• 200 mcg (2 mL of 100 mcg/mL solution) per dose
• Inject into corpus cavernosum
• Every 5 minutes
• Up to 5 doses TOTAL (= 1 mg max)

EPINEPHRINE (alternative — if phenylephrine unavailable)
• 20 mcg (2 mL of 10 mcg/mL solution) per dose
• Inject into corpus cavernosum
• Every 5 minutes
• Up to 5 doses TOTAL (= 100 mcg max)

MONITORING
• Check BP and HR every 5 min between injections
• HOLD if SBP > 160 or HR > 110
• Contraindicated: uncontrolled HTN, MAO inhibitor use

PEDIATRIC / SCD: use lower dose (100 mcg phenylephrine per injection)`,
    citation: [1, 4, 5],
    next: "priapism-phenylephrine-inject"
  },
  {
    id: "priapism-phenylephrine-inject",
    type: "info",
    module: 5,
    title: "Phenylephrine — Injection Technique",
    body: `TECHNIQUE

1. Inject 2 mL phenylephrine (200 mcg) through the same needle used for aspiration
2. Wait 5 minutes
3. Re-aspirate to remove additional stagnant blood
4. Assess for detumescence
5. If still rigid, repeat injection (up to 5 doses total)

Remember: Corpora cavernosa communicate freely.
Only one side needs injection. 5 doses = 5 doses TOTAL, not per side.

Alternating approach:
• Aspirate → Inject phenylephrine → Wait 5 min → Aspirate again → Reassess
• Continue cycling up to 5 doses`,
    citation: [1, 5],
    next: "priapism-phenylephrine-response"
  },
  {
    id: "priapism-phenylephrine-response",
    type: "question",
    module: 5,
    title: "Phenylephrine Response",
    body: `After phenylephrine injection(s), has detumescence occurred?

• May require up to 5 doses (every 5 min)
• Combined aspiration + phenylephrine: 70–100% success`,
    citation: [1, 3, 4],
    options: [
      {
        label: "Yes — Detumescence",
        description: "Resolution after phenylephrine",
        next: "priapism-phenylephrine-success"
      },
      {
        label: "No — Refractory after 1 hour",
        description: "Persistent rigidity despite max phenylephrine",
        next: "priapism-refractory",
        urgency: "critical"
      }
    ]
  },
  {
    id: "priapism-phenylephrine-success",
    type: "result",
    module: 5,
    title: "Phenylephrine Successful",
    body: `Priapism resolved with aspiration + phenylephrine.

[Return Precautions](#/info/priapism-return-precautions)`,
    recommendation: "Observe 60 minutes. Monitor BP/HR. Discharge with urology follow-up in 1–2 days. Return immediately for recurrence > 4 hours.",
    confidence: "definitive",
    citation: [1, 3, 4, 5]
  },
  {
    id: "priapism-refractory",
    type: "info",
    module: 6,
    title: "Refractory Ischemic Priapism",
    body: `Failed aspiration, irrigation, and phenylephrine (1 hour max).

• This is refractory ischemic priapism
• Requires surgical intervention
• Duration of priapism determines surgical approach
• Urgent urology consultation required`,
    citation: [1, 7],
    next: "priapism-refractory-duration"
  },
  {
    id: "priapism-refractory-duration",
    type: "question",
    module: 6,
    title: "Refractory — Total Duration",
    body: "How long has the priapism been present in total? This determines the surgical strategy.",
    citation: [1, 7],
    options: [
      {
        label: "< 36 hours total",
        description: "Still within window for shunting procedures",
        next: "priapism-shunting-info",
        urgency: "urgent"
      },
      {
        label: "≥ 36–48 hours total",
        description: "Prolonged duration, consider immediate prosthesis",
        next: "priapism-prosthesis-consider",
        urgency: "critical"
      }
    ]
  },
  {
    id: "priapism-shunting-info",
    type: "info",
    module: 7,
    title: "Surgical Shunting",
    body: `Shunting creates a pathway for blood to drain from the corpora cavernosa.

Two categories:
• DISTAL shunts — preferred first (less invasive, lower morbidity)
• PROXIMAL shunts — if distal fails (more invasive, higher complication rate)

Distal shunts connect corpus cavernosum to glans penis.
Proximal shunts connect to corpus spongiosum or saphenous vein.

Urology consultation required for all shunting procedures.`,
    citation: [1, 7],
    next: "priapism-shunting-types"
  },
  {
    id: "priapism-shunting-types",
    type: "question",
    module: 7,
    title: "Shunt Selection",
    body: "Which shunt is being performed? Distal shunts are attempted first.",
    citation: [1, 7],
    options: [
      {
        label: "Distal shunt",
        description: "Winter, Ebbehoj, Al-Ghorab, or T-shunt (corporoglanular)",
        next: "priapism-distal-shunt"
      },
      {
        label: "Proximal shunt",
        description: "Quackels or Grayhack (if distal shunt failed)",
        next: "priapism-proximal-shunt",
        urgency: "urgent"
      }
    ]
  },
  {
    id: "priapism-distal-shunt",
    type: "info",
    module: 7,
    title: "Distal Shunt Procedures",
    body: `WINTER (percutaneous)
• Tru-Cut biopsy needle through glans into distal corpora

EBBEHOJ (percutaneous)
• No. 11 scalpel blade through glans into corpora

AL-GHORAB (open)
• Open excision of distal tunica albuginea through glans incision

T-SHUNT (variation)
• No. 10 blade with 90-degree rotation

All create a fistula at the glans for blood to drain into the corpus spongiosum.`,
    citation: [1, 7],
    next: "priapism-shunt-response"
  },
  {
    id: "priapism-proximal-shunt",
    type: "info",
    module: 7,
    title: "Proximal Shunt Procedures",
    body: `QUACKELS
• Corporospongiosal shunt at penoscrotal junction

GRAYHACK
• Saphenous vein-to-corpus cavernosum anastomosis

⚠️ More invasive, higher complication rate.
Used only when distal shunts fail.`,
    citation: [1, 7],
    next: "priapism-shunt-response"
  },
  {
    id: "priapism-shunt-response",
    type: "question",
    module: 7,
    title: "Post-Shunt Assessment",
    body: "Did surgical shunting produce detumescence?",
    options: [
      {
        label: "Yes — Detumescence",
        description: "Resolution after shunt procedure",
        next: "priapism-shunt-success"
      },
      {
        label: "No — Persistent",
        description: "Shunting failed to resolve priapism",
        next: "priapism-shunt-fail",
        urgency: "critical"
      }
    ]
  },
  {
    id: "priapism-shunt-success",
    type: "result",
    module: 7,
    title: "Shunt Successful",
    body: `Priapism resolved with surgical shunting.

• Post-op monitoring per urology
• ED risk depends on duration of priapism before resolution
• Consider PDE5i trial at 4–6 weeks for erectile rehabilitation

[Return Precautions](#/info/priapism-return-precautions)`,
    recommendation: "Post-op monitoring per urology. Follow-up within 48 hours. Counsel on erectile dysfunction risk (depends on duration). PDE5i trial at 4–6 weeks for rehabilitation.",
    confidence: "definitive",
    citation: [1, 7]
  },
  {
    id: "priapism-shunt-fail",
    type: "result",
    module: 7,
    title: "Shunting Failed",
    body: `Shunting has failed to produce detumescence.

Options:
• If distal shunt attempted → may try proximal shunt
• If both failed, or duration > 48hr with necrotic tissue:
  → Immediate penile prosthesis recommended (AUA/SMSNA 2022)

Early prosthesis (within days) has better outcomes than delayed placement:
• Easier implantation
• Less penile fibrosis
• Better length preservation
• Patient satisfaction 60–100%`,
    recommendation: "Urgent urology consultation for penile prosthesis implantation. Early implantation preferred over delayed. If proximal shunt not yet attempted, consider before prosthesis.",
    confidence: "recommended",
    citation: [1, 7, 8]
  },
  {
    id: "priapism-prosthesis-consider",
    type: "info",
    module: 7,
    title: "Prolonged Priapism (> 36–48hr) — Prosthesis",
    body: `Duration > 36–48 hours with failed medical management:

• Smooth muscle necrosis likely advanced
• AUA/SMSNA 2022: consider immediate penile prosthesis
• Still attempt aspiration + phenylephrine first if not yet done
• If unsuccessful, do not delay surgical consultation

Early prosthesis placement (within days) has better outcomes:
• Easier implantation before fibrosis develops
• Better penile length preservation
• Patient satisfaction 60–100%`,
    citation: [1, 7, 8],
    next: "priapism-prosthesis-attempt"
  },
  {
    id: "priapism-prosthesis-attempt",
    type: "question",
    module: 7,
    title: "Treatment Approach — Prolonged Priapism",
    body: "After attempting aspiration + phenylephrine, what is the plan?",
    citation: [1, 7],
    options: [
      {
        label: "Detumescence achieved",
        description: "Aspiration + phenylephrine succeeded despite prolonged duration",
        next: "priapism-prolonged-resolved"
      },
      {
        label: "Shunting procedure",
        description: "Proceed to surgical shunt attempt",
        next: "priapism-shunting-info",
        urgency: "urgent"
      },
      {
        label: "Immediate penile prosthesis",
        description: "Urology recommends immediate prosthesis placement",
        next: "priapism-prosthesis-result",
        urgency: "critical"
      }
    ]
  },
  {
    id: "priapism-prolonged-resolved",
    type: "result",
    module: 7,
    title: "Prolonged Priapism — Resolved",
    body: `Detumescence achieved despite prolonged duration.

• High risk of erectile dysfunction (30–70% at > 24hr duration)
• Urology follow-up within 48 hours
• Early erectile rehabilitation counseling
• PDE5i trial at 4–6 weeks

[Return Precautions](#/info/priapism-return-precautions)`,
    recommendation: "Observe. Urology follow-up within 48 hours. High probability of ED given prolonged duration. Early erectile rehabilitation counseling. PDE5i trial at 4–6 weeks.",
    confidence: "recommended",
    citation: [1, 2, 8]
  },
  {
    id: "priapism-prosthesis-result",
    type: "result",
    module: 7,
    title: "Immediate Penile Prosthesis",
    body: `Immediate prosthesis implantation for refractory prolonged ischemic priapism.

AUA/SMSNA 2022: early placement preferred over delayed.

Benefits:
• Prevents penile shortening from fibrosis
• Restores erectile function
• Avoids difficult delayed implantation in scarred tissue
• Patient satisfaction 60–100%`,
    recommendation: "Urology proceeding with penile prosthesis implantation. Post-op care per urology team. This is the definitive treatment for refractory prolonged ischemic priapism.",
    confidence: "definitive",
    citation: [1, 7, 8]
  }
];
var PRIAPISM_NODE_COUNT = PRIAPISM_NODES.length;
var PRIAPISM_MODULE_LABELS = [
  "Classification",
  "Duration",
  "Penile Block",
  "Aspiration",
  "Phenylephrine",
  "Reassessment",
  "Escalation"
];
var PRIAPISM_CITATIONS = [
  { num: 1, text: "Bivalacqua TJ, Allen BK, Brock GB, et al. The Diagnosis and Management of Recurrent Ischemic Priapism, Priapism in Sickle Cell Patients, and Non-Ischemic Priapism: An AUA/SMSNA Guideline. J Urol. 2022;208(1):43-52." },
  { num: 2, text: "Salonia A, Eardley I, Giuliano F, et al. European Association of Urology Guidelines on Priapism. Eur Urol. 2014;65(2):480-9." },
  { num: 3, text: "Capogrosso P, Dimitropolous K, Russo GI, et al. Conservative and Medical Treatments of Non-Sickle Cell Disease-Related Ischemic Priapism: A Systematic Review by the EAU. Int J Impot Res. 2024;36(1):6-19." },
  { num: 4, text: "Martin C, Cocchio C. Effect of Phenylephrine and Terbutaline on Ischemic Priapism: A Retrospective Review. Am J Emerg Med. 2016;34(2):222-4." },
  { num: 5, text: "Graham BA, et al. An Overview of Emergency Pharmacotherapy for Priapism. Expert Opin Pharmacother. 2022;23(12):1371-1380." },
  { num: 6, text: "Kavanagh PL, Fasipe TA, Wun T. Sickle Cell Disease: A Review. JAMA. 2022;328(1):57-68." },
  { num: 7, text: "Milenkovic U, Cocci A, Veeratterapillay R, et al. Surgical and Minimally Invasive Treatment of Ischaemic and Non-Ischaemic Priapism: A Systematic Review. Int J Impot Res. 2024;36(1):36-49." },
  { num: 8, text: "Pang KH, Alnajjar HM, Lal A, Muneer A. An Update on Mechanisms and Treatment Options for Priapism. Nat Rev Urol. 2025." },
  { num: 9, text: "Burnett AL, Sharlip ID. Standard Operating Procedures for Priapism. J Sex Med. 2013;10(1):180-94." },
  { num: 10, text: "Melman A, Serels S. Priapism. Int J Impot Res. 2000;12 Suppl 4:S133-9." },
  { num: 11, text: "McHugh K, Gibbons RC. Point-of-Care Ultrasound Diagnosis of High Flow Priapism. J Emerg Med. 2022;62(2):207-209." }
];

// src/data/trees/afib-rvr.ts
var AFIB_RVR_NODES = [
  {
    id: "afib-start",
    type: "info",
    module: 1,
    title: "A-Fib RVR: Initial Assessment",
    body: `Atrial fibrillation with rapid ventricular response (RVR) is characterized by an irregularly irregular rhythm with a ventricular rate typically 120–180 bpm. Confirm with 12-lead ECG.

COMMON PRECIPITANTS
• Electrolyte abnormalities (K⁺, Mg²⁺)
• Sepsis / infection
• Pulmonary embolism
• Thyrotoxicosis
• Alcohol use / withdrawal
• Pain / agitation
• Respiratory failure / hypoxia
• Underlying cardiac disease (valvular, ischemic, HF)

Always treat underlying causes alongside rate control. A-Fib RVR is often a symptom of another process — rate control alone may be insufficient if the precipitant is not addressed.`,
    citation: [1, 3],
    next: "afib-stability"
  },
  {
    id: "afib-stability",
    type: "question",
    module: 1,
    title: "Hemodynamic Stability",
    body: "Is the patient hemodynamically stable?",
    options: [
      {
        label: "Hemodynamically stable",
        description: "Adequate BP, perfusion, no acute HF or ischemia",
        next: "afib-stable-drugs"
      },
      {
        label: "Hemodynamically unstable",
        description: "Hypotension, acute HF, ongoing ischemia, altered mental status, or shock",
        next: "afib-unstable-wpw",
        urgency: "critical"
      }
    ]
  },
  {
    id: "afib-unstable-wpw",
    type: "question",
    module: 2,
    title: "WPW / Pre-Excitation Screen",
    body: `Is there evidence of WPW / pre-excitation syndrome?

Look for: irregular wide-complex tachycardia, rate >200, variable QRS morphology, delta waves on prior ECG. WPW + A-Fib is a life-threatening emergency.`,
    options: [
      {
        label: "Yes — WPW / pre-excitation suspected",
        description: "Irregular wide-complex tachycardia, delta waves, rate >200",
        next: "afib-wpw-result",
        urgency: "critical"
      },
      {
        label: "No — No pre-excitation",
        description: "Standard A-Fib RVR without accessory pathway",
        next: "afib-cardioversion-protocol"
      }
    ]
  },
  {
    id: "afib-wpw-result",
    type: "result",
    module: 2,
    title: "WPW + A-Fib Management",
    body: `WPW with atrial fibrillation is a life-threatening emergency.

AV nodal blocking agents are ABSOLUTELY CONTRAINDICATED — including beta-blockers, calcium channel blockers, digoxin, and IV amiodarone. These agents may paradoxically accelerate ventricular response through the accessory pathway and precipitate ventricular fibrillation.`,
    recommendation: "Immediate [synchronized cardioversion](#/info/cardioversion-afib) (200J biphasic). If cardioversion is not immediately available, [Procainamide](#/drug/procainamide) may be used as a temporizing measure.",
    confidence: "definitive",
    citation: [2, 3]
  },
  {
    id: "afib-cardioversion-protocol",
    type: "info",
    module: 2,
    title: "Synchronized Cardioversion Protocol",
    body: `SYNCHRONIZED CARDIOVERSION PROTOCOL

1. PREPARATION
• Confirm synchronization is enabled on defibrillator
• Apply pads: anterior/lateral placement preferred (EPIC trial)
• Hyperinflation may impair conduction — cardiovert at end-expiration if possible

2. SEDATION
• Midazolam 3–5 mg IV bolus, additional 2 mg q2min PRN to adequate sedation
• Alternative: MidaKet for patients resistant to midazolam
• Flumazenil 0.5–1 mg IV available for reversal

3. CARDIOVERSION
• Start at 200J biphasic (use maximal energy available)
• Escalate energy if initial attempt unsuccessful

4. POST-CARDIOVERSION
• Consider [Amiodarone](#/drug/amiodarone) to maintain sinus rhythm (150mg IV bolus, then 1 mg/min infusion)
• Consider IV [Magnesium Sulfate](#/drug/magnesium-sulfate) 2–4g to enhance cardioversion success
• If cardioversion not immediately feasible, IV [Amiodarone](#/drug/amiodarone) may be used as temporizing measure`,
    citation: [1, 2, 5],
    next: "afib-cardioversion-result"
  },
  {
    id: "afib-cardioversion-result",
    type: "result",
    module: 2,
    title: "Post-Cardioversion Management",
    body: "Patient has undergone or is undergoing cardioversion for hemodynamically unstable A-Fib RVR.",
    recommendation: "Continue [Amiodarone](#/drug/amiodarone) infusion to prevent recurrence. Monitor for reversion to A-Fib. Treat underlying precipitants (sepsis, PE, electrolyte abnormalities). Consider anticoagulation assessment once stabilized.",
    confidence: "recommended",
    citation: [1]
  },
  {
    id: "afib-stable-drugs",
    type: "info",
    module: 3,
    title: "First-Line Rate Control Agents",
    body: `FIRST-LINE AGENTS FOR RATE CONTROL

Beta-Blockers (Class 1 recommendation):
• [Metoprolol](#/drug/metoprolol) — 2.5–5 mg IV q5min, up to 15 mg total
• [Esmolol](#/drug/esmolol) — Ultra-short-acting, ideal when rapid titration needed
• Safe in COPD (multiple studies confirm no adverse respiratory effects)
• Preferred in CAD or compensated HFrEF
• Use cautiously in decompensated heart failure

Calcium Channel Blockers:
• [Diltiazem](#/drug/diltiazem) — 0.25 mg/kg IV bolus, onset within minutes
• [Verapamil](#/drug/verapamil) — Alternative CCB, less commonly used
• 90% rate control vs 74% with amiodarone or digoxin
• ⚠️ CONTRAINDICATED if EF ≤40% or decompensated HF (Class 3: Harm)
• Obtain echo or check history for EF if unknown

Adjunctive:
• IV [Magnesium Sulfate](#/drug/magnesium-sulfate) — Reasonable to add (Class 2a). Blocks slow Ca channels at AV node with minimal toxicity.

⚠️ Do NOT combine beta-blockers with calcium channel blockers — risk of synergistic hypotension.`,
    citation: [1, 2, 4],
    next: "afib-rate-controlled"
  },
  {
    id: "afib-rate-controlled",
    type: "question",
    module: 3,
    title: "Rate Control Assessment",
    body: `Is the ventricular rate now controlled?

Target heart rate:
• ICU / critically ill: <130 bpm may be reasonable
• Outpatient / stable: <100–110 bpm (RACE II trial)
• Titrate primarily to control symptoms rather than strict targets
• Some patients may benefit from mild compensatory tachycardia — do not aggressively normalize if rate is due to underlying process`,
    options: [
      {
        label: "Yes — Rate controlled",
        description: "Heart rate at target, symptoms improved",
        next: "afib-onset-assessment"
      },
      {
        label: "No — Rate still uncontrolled",
        description: "Heart rate remains above target despite first-line agent",
        next: "afib-refractory",
        urgency: "urgent"
      }
    ]
  },
  {
    id: "afib-refractory",
    type: "question",
    module: 4,
    title: "Refractory Rate Control",
    body: `Select second-line intervention for refractory rate control.

First-line agent was insufficient. Re-evaluate for underlying causes (sepsis, hypovolemia, pain, PE). Ensure adequate trial of first-line agent before escalating.

⚠️ Avoid combining beta-blockers with calcium channel blockers.`,
    options: [
      {
        label: "Add IV Magnesium",
        description: "Blocks slow Ca channels at AV node. Excellent safety profile.",
        next: "afib-refractory-mg"
      },
      {
        label: "Add Digoxin",
        description: "Adjunctive when hypotension limits beta-blocker/CCB titration.",
        next: "afib-refractory-dig"
      },
      {
        label: "Switch to Amiodarone",
        description: "More hemodynamically stable. May achieve cardioversion.",
        next: "afib-refractory-amio"
      },
      {
        label: "Consider Rhythm Control",
        description: "When rate control strategy has failed.",
        next: "afib-rhythm-control"
      }
    ]
  },
  {
    id: "afib-refractory-mg",
    type: "info",
    module: 4,
    title: "Add IV Magnesium",
    body: `IV [Magnesium Sulfate](#/drug/magnesium-sulfate)

• 2–4 grams IV bolus, may follow with continuous infusion
• Blocks slow calcium channels in SA and AV nodes
• Minimal toxicity — one meta-analysis detected no adverse events
• Even if cardioversion doesn’t occur, magnesium reduces heart rate and augments efficacy of other antiarrhythmics
• Contraindicated if GFR <30 mL/min or oliguria — use intermittent boluses instead
• Target serum level ~3–4 mg/dL for optimal antiarrhythmic effect`,
    citation: [1, 6],
    next: "afib-refractory-reassess"
  },
  {
    id: "afib-refractory-dig",
    type: "info",
    module: 4,
    title: "Add Digoxin",
    body: `[Digoxin](#/drug/digoxin)

• Useful when hypotension limits further titration of beta-blockers or CCBs
• Slow onset: ~3 hours to achieve rate control (vs 5 min for diltiazem)
• Limited efficacy during exertion — slows primarily resting heart rate
• ⚠️ Post hoc analyses associate digoxin with increased mortality in A-Fib
• Use at low doses, typically in combination with other AV nodal agents
• May be particularly useful in patients with concurrent heart failure`,
    citation: [1, 2, 3],
    next: "afib-refractory-reassess"
  },
  {
    id: "afib-refractory-amio",
    type: "info",
    module: 4,
    title: "Switch to Amiodarone",
    body: `[Amiodarone](#/drug/amiodarone)

• Load with 150 mg IV bolus over 10 min, then 1 mg/min infusion
• May need to re-bolus 150 mg x2–3 (total 150–450 mg in boluses)
• More hemodynamically stable than beta-blockers or CCBs
• May achieve chemical cardioversion — beneficial if rhythm control desired
• 74% rate control achieved in clinical trials
• ⚠️ Do not conclude amiodarone has failed without adequate re-bolusing
• If cardioversion occurs, continue infusion until critical illness resolves`,
    citation: [1, 2, 5],
    next: "afib-refractory-reassess"
  },
  {
    id: "afib-rhythm-control",
    type: "info",
    module: 4,
    title: "Consider Rhythm Control",
    body: `RHYTHM CONTROL STRATEGY

Consider when rate control strategy has failed or in new-onset AF where conversion is desirable.

Stepwise approach:
1. IV [Magnesium Sulfate](#/drug/magnesium-sulfate) infusion (front-line, excellent safety)
2. [Amiodarone](#/drug/amiodarone) if magnesium alone insufficient
3. DC cardioversion (especially in intubated patients)

Factors favoring rhythm control:
• New-onset AF (NOAF) — likely to revert
• Pulmonary hypertension, mitral stenosis, diastolic dysfunction
• Heart failure with reduced EF
• Failure of rate control

Factors favoring rate control:
• Chronic/longstanding AF
• Onset >48 hours without anticoagulation
• Ongoing severe physiological stress`,
    citation: [1, 3, 7],
    next: "afib-refractory-reassess"
  },
  {
    id: "afib-refractory-reassess",
    type: "question",
    module: 4,
    title: "Post-Intervention Reassessment",
    body: "Is the rate now controlled after second-line intervention?",
    options: [
      {
        label: "Yes — Rate controlled",
        description: "Heart rate at target, symptoms improved",
        next: "afib-onset-assessment"
      },
      {
        label: "No — Still refractory",
        description: "Consider combining agents or rhythm control if not yet attempted",
        next: "afib-refractory",
        urgency: "urgent"
      }
    ]
  },
  {
    id: "afib-onset-assessment",
    type: "question",
    module: 5,
    title: "AF Onset Assessment",
    body: `Is this new-onset AF or known/chronic AF?

Distinguishing onset is important for anticoagulation decisions and rhythm control candidacy.

New-onset AF (NOAF): First episode, occurring during current hospitalization or acute illness. Often reverts spontaneously as underlying cause resolves.

Known/Chronic AF: Pre-existing AF documented prior to current presentation, or AF duration >48 hours.`,
    options: [
      {
        label: "New-onset AF (NOAF)",
        description: "First episode during current illness/hospitalization",
        next: "afib-noaf-anticoag"
      },
      {
        label: "Known/Chronic AF or onset >48 hours",
        description: "Pre-existing AF or duration exceeds 48 hours",
        next: "afib-cha2ds2vasc"
      }
    ]
  },
  {
    id: "afib-noaf-anticoag",
    type: "info",
    module: 5,
    title: "NOAF — Anticoagulation Considerations",
    body: `NEW-ONSET AF IN CRITICAL ILLNESS

Anticoagulation is generally NOT recommended for NOAF:
• Retrospective studies show anticoagulation increases bleeding risk without reducing stroke incidence
• Most patients with NOAF will revert to sinus rhythm as critical illness resolves
• Survey of UK intensivists: 64% do not routinely anticoagulate NOAF

Exceptions — consider anticoagulation if:
• AF persists >48 hours
• High stroke risk with low bleeding risk
• AF continues beyond resolution of acute illness

If AF persists for weeks, reassess with [CHA₂DS₂-VASc scoring](#/calculator/cha2ds2vasc) as chronic AF management becomes appropriate.`,
    citation: [3, 8, 9],
    next: "afib-disposition"
  },
  {
    id: "afib-cha2ds2vasc",
    type: "info",
    module: 5,
    title: "CHA₂DS₂-VASc Assessment",
    body: `ANTICOAGULATION FOR KNOWN/CHRONIC AF

Assess stroke risk using [CHA₂DS₂-VASc score](#/calculator/cha2ds2vasc):

Anticoagulation Recommendations:
• Score ≥2 (men) or ≥3 (women) → Anticoagulate (strong recommendation)
• Score 1 (men) or 2 (women) → Consider anticoagulation
• Score 0 (men) or 1 (women) → May omit anticoagulation

Preferred agents: [Apixaban](#/drug/apixaban), [Rivaroxaban](#/drug/rivaroxaban) (DOACs preferred over warfarin)

⚠️ If AF duration >48 hours and patient is NOT anticoagulated:
• Consider TEE to exclude left atrial appendage thrombus before cardioversion
• Or initiate anticoagulation for ≥3 weeks before elective cardioversion`,
    calculatorLinks: [
      { id: "cha2ds2vasc", label: "Calculate CHA₂DS₂-VASc" }
    ],
    citation: [1, 3, 10],
    next: "afib-disposition"
  },
  {
    id: "afib-disposition",
    type: "result",
    module: 6,
    title: "A-Fib RVR — Disposition & Follow-Up",
    body: `DISPOSITION CONSIDERATIONS

• Continue rate control agent that achieved control
• Target resting HR <100–110 bpm for outpatient management
• Assess heart rate response during exertion (ambulatory monitoring or brisk walk)
• Ensure electrolytes are corrected (K⁺, Mg²⁺)
• Address underlying precipitants
• Cardiology follow-up for: new-onset AF, rhythm control consideration, AV node ablation candidacy
• For patients with refractory symptoms despite optimal medical therapy, AV node ablation with permanent pacemaker may be considered`,
    recommendation: "Disposition based on clinical stability and rate control achieved. Ensure anticoagulation addressed per [CHA₂DS₂-VASc](#/calculator/cha2ds2vasc). Arrange cardiology follow-up. Review [Discharge Instructions](#/info/afib-discharge) with patient before discharge.",
    confidence: "recommended",
    citation: [1, 2, 3]
  }
];
var AFIB_RVR_NODE_COUNT = AFIB_RVR_NODES.length;
var AFIB_RVR_MODULE_LABELS = [
  "Initial Assessment",
  "Unstable Pathway",
  "Rate Control",
  "Refractory",
  "Anticoagulation",
  "Disposition"
];
var AFIB_RVR_CITATIONS = [
  { num: 1, text: "Joglar JA, Chung MK, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. J Am Coll Cardiol. 2024;83(1):109-279." },
  { num: 2, text: "Wigginton JG, Agarwal S, et al. Part 9: Adult Advanced Life Support: 2025 AHA Guidelines for CPR and ECC. Circulation. 2025;152(16_suppl_2):S538-S577." },
  { num: 3, text: "Ko D, Chung MK, et al. Atrial Fibrillation: A Review. JAMA. 2025;333(4):329-342." },
  { num: 4, text: "Prystowsky EN, Padanilam BJ, Fogel RI. Treatment of Atrial Fibrillation. JAMA. 2015;314(3):278-88." },
  { num: 5, text: "Panchal AR, Bartos JA, et al. Part 3: Adult Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(16_suppl_2):S366-S468." },
  { num: 6, text: "Michaud GF, Stevenson WG. Atrial Fibrillation. N Engl J Med. 2021;384(4):353-361." },
  { num: 7, text: "Bosch NA, Cimini J, Walkey AJ. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434." },
  { num: 8, text: "Chyou JY, Barkoudah E, et al. Atrial Fibrillation Occurring During Acute Hospitalization: AHA Scientific Statement. Circulation. 2023;147(15):e676-e698." },
  { num: 9, text: "Long B, Brady WJ, Gottlieb M. Emergency Medicine Updates: Atrial Fibrillation with Rapid Ventricular Response. Am J Emerg Med. 2023;74:57-64." },
  { num: 10, text: "Wolfes J, Ellermann C, et al. Comparison of Latest ESC, ACC/AHA/ACCP/HRS, and CCS Guidelines on AF Management. JACC Clin Electrophysiol. 2025;11(4):836-849." }
];

// src/components/reference-table.ts
var TREE_REFERENCE_DATA = {
  neurosyphilis: {
    title: "Neurosyphilis Reference",
    citations: NEUROSYPHILIS_CITATIONS,
    diagnosticTests: NEUROSYPHILIS_DIAGNOSTIC_TESTS,
    clinicalNotes: NEUROSYPHILIS_CLINICAL_NOTES,
    testTableTitle: "CSF Diagnostic Test Performance"
  },
  pneumothorax: {
    title: "Pneumothorax POCUS Reference",
    citations: PNEUMOTHORAX_CITATIONS,
    diagnosticTests: PNEUMOTHORAX_DIAGNOSTIC_TESTS,
    clinicalNotes: PNEUMOTHORAX_CLINICAL_NOTES,
    testTableTitle: "Ultrasound vs CXR for Pneumothorax"
  },
  "pe-treatment": {
    title: "PE Treatment Reference",
    citations: PE_TREATMENT_CITATIONS,
    diagnosticTests: PE_TREATMENT_DIAGNOSTIC_TESTS,
    clinicalNotes: PE_TREATMENT_CLINICAL_NOTES,
    testTableTitle: "PE Risk Stratification Markers"
  }
};
function renderReferencePanel(container, treeId) {
  container.innerHTML = "";
  const backBtn = document.createElement("button");
  backBtn.className = "btn-text";
  backBtn.textContent = "← Back";
  backBtn.addEventListener("click", () => history.back());
  container.appendChild(backBtn);
  if (treeId && TREE_REFERENCE_DATA[treeId]) {
    const data = TREE_REFERENCE_DATA[treeId];
    renderTreeReference(container, data);
    return;
  }
  const allHeading = document.createElement("h2");
  allHeading.className = "reference-heading";
  allHeading.textContent = "Reference Tables";
  container.appendChild(allHeading);
  for (const [_id, data] of Object.entries(TREE_REFERENCE_DATA)) {
    renderTreeReference(container, data);
  }
}
function renderTreeReference(container, data) {
  const heading = document.createElement("h2");
  heading.className = "reference-heading";
  heading.textContent = data.title;
  container.appendChild(heading);
  if (data.diagnosticTests && data.diagnosticTests.length > 0) {
    renderTestTable(container, data.diagnosticTests, data.testTableTitle);
  }
  if (data.clinicalNotes && data.clinicalNotes.length > 0) {
    renderClinicalNotes(container, data.clinicalNotes);
  }
  renderCitationsPanel(container, data.citations);
  renderDisclaimer(container);
}
function renderInlineCitations(container, citationNums, citations) {
  const section = document.createElement("details");
  section.className = "reference-citations-inline";
  const summary = document.createElement("summary");
  summary.textContent = `▸ References (${citationNums.length})`;
  section.appendChild(summary);
  const list = document.createElement("div");
  list.className = "reference-citation-list";
  for (const num of citationNums) {
    const cite = citations.find((c) => c.num === num);
    if (!cite)
      continue;
    const item = document.createElement("div");
    item.className = "reference-citation-item";
    const numEl = document.createElement("span");
    numEl.className = "reference-citation-num";
    numEl.textContent = `[${cite.num}]`;
    const textEl = document.createElement("span");
    textEl.className = "reference-citation-text";
    textEl.textContent = cite.text;
    item.appendChild(numEl);
    item.appendChild(textEl);
    list.appendChild(item);
  }
  section.appendChild(list);
  container.appendChild(section);
}
function renderTestTable(container, tests, tableTitle) {
  const section = document.createElement("div");
  section.className = "reference-section";
  const title = document.createElement("h3");
  title.className = "reference-section-title";
  title.textContent = tableTitle ?? "Diagnostic Test Performance";
  section.appendChild(title);
  for (const row of tests) {
    const card = document.createElement("div");
    card.className = "reference-test-card";
    const testName = document.createElement("div");
    testName.className = "reference-test-name";
    testName.textContent = row.test;
    card.appendChild(testName);
    const stats = document.createElement("div");
    stats.className = "reference-test-stats";
    const senEl = document.createElement("span");
    senEl.className = "reference-stat";
    const senLabel = document.createElement("span");
    senLabel.className = "reference-stat-label";
    senLabel.textContent = "Sensitivity";
    const senValue = document.createElement("span");
    senValue.className = "reference-stat-value";
    senValue.textContent = row.sensitivity;
    senEl.appendChild(senLabel);
    senEl.appendChild(senValue);
    const specEl = document.createElement("span");
    specEl.className = "reference-stat";
    const specLabel = document.createElement("span");
    specLabel.className = "reference-stat-label";
    specLabel.textContent = "Specificity";
    const specValue = document.createElement("span");
    specValue.className = "reference-stat-value";
    specValue.textContent = row.specificity;
    specEl.appendChild(specLabel);
    specEl.appendChild(specValue);
    stats.appendChild(senEl);
    stats.appendChild(specEl);
    card.appendChild(stats);
    const roleEl = document.createElement("div");
    roleEl.className = "reference-test-role";
    roleEl.textContent = row.role;
    card.appendChild(roleEl);
    section.appendChild(card);
  }
  container.appendChild(section);
}
function renderClinicalNotes(container, notes) {
  const section = document.createElement("div");
  section.className = "reference-section";
  const title = document.createElement("h3");
  title.className = "reference-section-title";
  title.textContent = "Key Clinical Notes";
  section.appendChild(title);
  for (const note of notes) {
    const noteEl = document.createElement("div");
    noteEl.className = "reference-note-card";
    noteEl.textContent = note;
    section.appendChild(noteEl);
  }
  container.appendChild(section);
}
function renderCitationsPanel(container, citations) {
  const section = document.createElement("div");
  section.className = "reference-section";
  const title = document.createElement("h3");
  title.className = "reference-section-title";
  title.textContent = "Evidence Citations";
  section.appendChild(title);
  const list = document.createElement("div");
  list.className = "reference-citation-list";
  for (const cite of citations) {
    const item = document.createElement("div");
    item.className = "reference-citation-item";
    const numEl = document.createElement("span");
    numEl.className = "reference-citation-num";
    numEl.textContent = `[${cite.num}]`;
    const textEl = document.createElement("span");
    textEl.className = "reference-citation-text";
    textEl.textContent = cite.text;
    item.appendChild(numEl);
    item.appendChild(textEl);
    list.appendChild(item);
  }
  section.appendChild(list);
  container.appendChild(section);
}
function renderDisclaimer(container) {
  const disclaimer = document.createElement("div");
  disclaimer.className = "reference-disclaimer";
  disclaimer.textContent = "This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.";
  container.appendChild(disclaimer);
}

// src/components/info-page.ts
var DOAC_PE_PAGE = {
  id: "doac-pe",
  title: "Oral Anticoagulation for PE",
  subtitle: "Direct Oral Anticoagulants (DOACs)",
  sections: [
    {
      body: "Direct oral anticoagulants (DOACs)—specifically apixaban, rivaroxaban, edoxaban, and dabigatran—are the preferred oral anticoagulants for low-risk pulmonary embolism due to their noninferior efficacy compared to warfarin, lower major bleeding risk, and simplified administration without need for monitoring. [1–4]"
    },
    {
      heading: "Advantages Over Warfarin",
      body: `Meta-analyses demonstrate that DOACs are associated with a 39% relative reduction in major bleeding compared to vitamin K antagonists while maintaining similar efficacy for preventing recurrent VTE. [3]

In low-risk PE patients specifically, DOACs showed absolute differences in symptomatic VTE recurrence ranging from −0.4% to 0.3% compared to conventional therapy, with reduced bleeding risk (absolute risk difference −0.6%). [2]`
    },
    {
      heading: "Dosing Regimens",
      body: "",
      drugTable: [
        {
          drug: "Apixaban",
          regimen: "10 mg twice daily × 7 days, then 5 mg twice daily × 3–6 months. Extended therapy: 5 mg or 2.5 mg twice daily. [4]"
        },
        {
          drug: "Rivaroxaban",
          regimen: "15 mg twice daily × 21 days, then 20 mg once daily × 3–6 months. Extended therapy: 20 mg or 10 mg once daily. [4]"
        },
        {
          drug: "Edoxaban",
          regimen: "Requires 5–10 days parenteral anticoagulation (LMWH) first, then 60 mg once daily (30 mg if CrCl 15–50 mL/min, weight <60 kg, or on P-glycoprotein inhibitors). [4]"
        },
        {
          drug: "Dabigatran",
          regimen: "Requires 5–10 days parenteral anticoagulation first, then 150 mg twice daily. [4]"
        }
      ]
    },
    {
      heading: "Clinical Considerations",
      body: `Apixaban and rivaroxaban offer the advantage of single-drug oral therapy without requiring initial heparin, making them particularly convenient for outpatient management of low-risk PE. [3][5]

The choice among DOACs is guided by pharmacologic properties, patient characteristics (particularly renal function), concomitant medications, and patient preference for once versus twice-daily dosing. [3–4]`
    }
  ],
  citations: [
    { num: 1, text: "Tritschler T, Kraaijpoel N, Le Gal G, Wells PS. Venous Thromboembolism: Advances in Diagnosis and Treatment. JAMA. 2018." },
    { num: 2, text: "Freund Y, Cohen-Aubart F, Bloom B. Acute Pulmonary Embolism: A Review. JAMA. 2022." },
    { num: 3, text: "Di Nisio M, van Es N, Büller HR. Deep Vein Thrombosis and Pulmonary Embolism. Lancet. 2016." },
    { num: 4, text: "Kahn SR, de Wit K. Pulmonary Embolism. N Engl J Med. 2022." },
    { num: 5, text: "Renner E, Barnes GD. Antithrombotic Management of Venous Thromboembolism: JACC Focus Seminar. J Am Coll Cardiol. 2020." }
  ]
};
var PRIAPISM_RETURN_PRECAUTIONS = {
  id: "priapism-return-precautions",
  title: "Return Precautions",
  subtitle: "Patient Discharge Instructions — Priapism",
  sections: [
    {
      body: "You were treated today for priapism (a prolonged erection). Please return to the emergency department immediately if you experience any of the following:"
    },
    {
      heading: "Return Immediately If:",
      body: `• Your erection returns and lasts more than 4 hours
• You develop severe pain in your penis
• You notice increasing swelling, redness, or warmth of the penis
• You develop fever (temperature over 100.4°F or 38°C)
• You have difficulty urinating or cannot urinate
• You notice any discharge from the penis`
    },
    {
      heading: "Important Information",
      body: `• Even after successful treatment, priapism can recur. This is especially true if you have sickle cell disease or take certain medications.
• Time is critical — if an erection lasts more than 4 hours, seek emergency care right away. Delays in treatment can lead to permanent erectile dysfunction.
• Continue taking any medications prescribed by your doctor as directed.
• Follow up with urology as instructed.`
    },
    {
      heading: "Questions?",
      body: "If you have concerns about your recovery or symptoms that are not emergencies, contact your primary care doctor or the urology clinic during business hours."
    }
  ],
  citations: [
    { num: 1, text: "Bivalacqua TJ, Allen BK, Brock G, et al. Acute Ischemic Priapism: An AUA/SMSNA Guideline. J Urol. 2021;206(5):1114-1121." },
    { num: 2, text: "Salonia A, Eardley I, Giuliano F, et al. European Association of Urology Guidelines on Priapism. Eur Urol. 2014;65(2):480-9." }
  ]
};
var CARDIOVERSION_AFIB_PAGE = {
  id: "cardioversion-afib",
  title: "Synchronized Cardioversion",
  subtitle: "Procedure for Atrial Fibrillation / Flutter",
  sections: [
    {
      body: "Synchronized cardioversion is the definitive treatment for hemodynamically unstable A-Fib/Flutter and for WPW with atrial fibrillation. Success depends on energy selection, pad placement, synchronization, and pre/post-treatment with antiarrhythmics."
    },
    {
      heading: "1. Preparation",
      body: `• Confirm synchronization is enabled on the defibrillator
• Apply pads: anterior/lateral placement preferred (EPIC trial found superior to anterior/posterior) [1]
• Hyperinflation may impair conduction — cardiovert at end-expiration if possible
• If ventilated and cardioversion failing, briefly disconnect to promote chest deflation (if oxygenation allows)`
    },
    {
      heading: "2. Sedation (Non-Intubated Patients)",
      body: `• Midazolam 3–5 mg IV bolus, then 2 mg IV q2min PRN to adequate sedation
• Target: eyes closed, no response to gentle stimuli, sluggish response to loud commands
• Alternative: MidaKet for patients resistant to midazolam
• Flumazenil 0.5–1 mg IV available for reversal if adverse effects (hypoxemia, excessive somnolence, laryngospasm)`
    },
    {
      heading: "3. Energy & Synchronization",
      body: `• Use 200J biphasic (maximal energy available) [2]
• Rationale: No evidence that a single high-energy shock is more dangerous than low-energy. Higher initial energy reduces need for repeat cardioversion — critical in non-intubated patients where sedation may wear off.
• Ensure shock delivery is synchronized to the QRS complex
• If initial attempt unsuccessful, escalate energy and reconfirm pad contact`
    },
    {
      heading: "4. Post-Cardioversion",
      body: `• Amiodarone 150 mg IV over 10 min, then 1 mg/min infusion to maintain sinus rhythm
• IV Magnesium Sulfate 2–4 g to augment cardioversion success
• Continue amiodarone until critical illness significantly improved — stopping early risks reversion to A-Fib (42% reversion rate in one study) [3]
• Monitor for post-cardioversion bradycardia (especially if baseline HR was <100)`
    },
    {
      heading: "Special Considerations",
      body: `• WPW + A-Fib: Cardioversion is first-line. Do NOT use AV nodal blockers (beta-blockers, CCBs, digoxin, IV amiodarone) [1][2]
• Critically ill patients: Standalone DC cardioversion often fails — patients frequently revert to A-Fib. Pre/post-treatment with amiodarone + magnesium improves sustained conversion [3]
• Anticoagulation: If AF duration >48 hours and not anticoagulated, consider TEE to exclude atrial thrombus before elective cardioversion`
    }
  ],
  citations: [
    { num: 1, text: "Wigginton JG, et al. Part 9: Adult Advanced Life Support: 2025 AHA Guidelines for CPR and ECC. Circulation. 2025;152(16_suppl_2):S538-S577." },
    { num: 2, text: "Panchal AR, et al. Part 3: Adult Basic and Advanced Life Support: 2020 AHA Guidelines for CPR and ECC. Circulation. 2020;142(16_suppl_2):S366-S468." },
    { num: 3, text: "Bosch NA, Cimini J, Walkey AJ. Atrial Fibrillation in the ICU. Chest. 2018;154(6):1424-1434." }
  ]
};
var AFIB_DISCHARGE_PAGE = {
  id: "afib-discharge",
  title: "Discharge Instructions",
  subtitle: "Atrial Fibrillation with Rapid Ventricular Response",
  sections: [
    {
      heading: "Return to the ED Immediately If You Experience",
      body: `**Serious Warning Signs:**
• Chest pain or pressure
• Severe shortness of breath or difficulty breathing
• Fainting or loss of consciousness
• Severe dizziness or lightheadedness
• Confusion or difficulty speaking
• Weakness or numbness on one side of your body (signs of stroke)
• Heart rate that feels extremely fast or irregular and does not improve with rest
• Coughing up blood
• Severe bleeding (especially if you are taking blood thinners)

**Other Concerning Symptoms:**
• Palpitations (racing or fluttering heartbeat) that are much worse than usual or do not go away
• Swelling in your legs, ankles, or abdomen that is new or worsening
• Persistent nausea or vomiting
• Inability to take your prescribed medications`
    },
    {
      heading: "What to Do at Home",
      body: `**Take Your Medications:**
• Take all medications exactly as prescribed, including rate control medications (beta-blockers or calcium channel blockers), blood thinners (anticoagulants) if prescribed, and any other heart medications
• Do not stop or change your medications without talking to your doctor first
• Set reminders to help you remember to take your medications on time

**Monitor Your Symptoms:**
• Check your pulse regularly as instructed by your doctor
• Rest and stay calm if you feel your heart racing
• Keep a log of any symptoms you experience, including when they occur and how long they last

**Lifestyle Modifications:**
• Limit or avoid alcohol — it can trigger atrial fibrillation episodes
• Avoid caffeine if it worsens your symptoms
• Get adequate sleep and manage stress
• Maintain a healthy weight
• Stay hydrated but follow any fluid restrictions your doctor has given you`
    },
    {
      heading: "Follow-Up Care",
      body: `**Appointments:**
• Schedule follow-up with your primary care doctor or cardiologist within 1–2 weeks (or as directed)
• Keep all scheduled appointments, even if you are feeling better
• Bring a list of your current medications and any questions

**Blood Work:**
• If you are taking blood thinners, you may need regular blood tests to monitor their effectiveness
• Follow your doctor’s instructions about when to have these tests done

**Questions to Ask Your Doctor:**
• What is my target heart rate?
• How often should I check my pulse?
• What activities are safe for me?
• Do I need to make any changes to my diet?
• When can I return to work or normal activities?`
    },
    {
      heading: "Important Reminders",
      body: `• Atrial fibrillation increases your risk of stroke — this is why blood thinners may be prescribed
• Even if you feel better, continue taking all medications as prescribed
• Call your doctor’s office if you have questions or concerns that are not emergencies
• Wear a medical alert bracelet if you are taking blood thinners`
    }
  ],
  citations: [
    { num: 1, text: "Joglar JA, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. J Am Coll Cardiol. 2024;83(1):109-279." }
  ]
};
var INFO_PAGES = {
  "doac-pe": DOAC_PE_PAGE,
  "priapism-return-precautions": PRIAPISM_RETURN_PRECAUTIONS,
  "cardioversion-afib": CARDIOVERSION_AFIB_PAGE,
  "afib-discharge": AFIB_DISCHARGE_PAGE
};
var overlayEl2 = null;
function destroyOverlay2() {
  overlayEl2?.remove();
  overlayEl2 = null;
}
function showInfoModal(pageId) {
  const page = INFO_PAGES[pageId];
  if (!page)
    return false;
  destroyOverlay2();
  overlayEl2 = document.createElement("div");
  overlayEl2.className = "modal-overlay info-modal-overlay active";
  overlayEl2.addEventListener("click", (e) => {
    if (e.target === overlayEl2)
      destroyOverlay2();
  });
  const panel = document.createElement("div");
  panel.className = "modal-content info-modal-panel";
  const header = document.createElement("div");
  header.className = "modal-header";
  const titleWrap = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = page.title;
  titleWrap.appendChild(title);
  const subtitle = document.createElement("div");
  subtitle.className = "info-modal-subtitle";
  subtitle.textContent = page.subtitle;
  titleWrap.appendChild(subtitle);
  const closeBtn = document.createElement("button");
  closeBtn.className = "btn-text";
  closeBtn.textContent = "✕";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.addEventListener("click", destroyOverlay2);
  header.appendChild(titleWrap);
  header.appendChild(closeBtn);
  panel.appendChild(header);
  const body = document.createElement("div");
  body.className = "modal-body info-modal-body";
  for (const section of page.sections) {
    const sectionEl = document.createElement("div");
    sectionEl.className = "info-page-section";
    if (section.heading) {
      const h = document.createElement("h2");
      h.className = "info-page-section-heading";
      h.textContent = section.heading;
      sectionEl.appendChild(h);
    }
    if (section.body) {
      const lines = section.body.split(`
`);
      for (const line of lines) {
        if (line.trim() === "") {
          sectionEl.appendChild(document.createElement("br"));
        } else {
          const p = document.createElement("p");
          p.className = "info-page-text";
          p.textContent = line;
          sectionEl.appendChild(p);
        }
      }
    }
    if (section.drugTable) {
      for (const drug of section.drugTable) {
        const card = document.createElement("div");
        card.className = "info-page-drug-card";
        const drugName = document.createElement("div");
        drugName.className = "info-page-drug-name";
        drugName.textContent = drug.drug;
        card.appendChild(drugName);
        const regimen = document.createElement("div");
        regimen.className = "info-page-drug-regimen";
        regimen.textContent = drug.regimen;
        card.appendChild(regimen);
        sectionEl.appendChild(card);
      }
    }
    body.appendChild(sectionEl);
  }
  const citSection = document.createElement("details");
  citSection.className = "info-page-citations";
  const citSummary = document.createElement("summary");
  citSummary.textContent = `References (${page.citations.length})`;
  citSection.appendChild(citSummary);
  const citList = document.createElement("div");
  citList.className = "reference-citation-list";
  for (const cite of page.citations) {
    const item = document.createElement("div");
    item.className = "reference-citation-item";
    const numEl = document.createElement("span");
    numEl.className = "reference-citation-num";
    numEl.textContent = `[${cite.num}]`;
    const textEl = document.createElement("span");
    textEl.className = "reference-citation-text";
    textEl.textContent = cite.text;
    item.appendChild(numEl);
    item.appendChild(textEl);
    citList.appendChild(item);
  }
  citSection.appendChild(citList);
  body.appendChild(citSection);
  const disclaimer = document.createElement("div");
  disclaimer.className = "reference-disclaimer";
  disclaimer.textContent = "Clinical decision support only. Verify against current guidelines and institutional protocols.";
  body.appendChild(disclaimer);
  panel.appendChild(body);
  overlayEl2.appendChild(panel);
  document.body.appendChild(overlayEl2);
  return true;
}

// src/components/tree-wizard.ts
var TREE_CONFIGS = {
  neurosyphilis: {
    nodes: NEUROSYPHILIS_NODES,
    entryNodeId: "serology-start",
    categoryId: "infectious-disease",
    moduleLabels: NEUROSYPHILIS_MODULE_LABELS,
    citations: NEUROSYPHILIS_CITATIONS
  },
  pneumothorax: {
    nodes: PNEUMOTHORAX_NODES,
    entryNodeId: "pneumothorax-start",
    categoryId: "us-rads",
    moduleLabels: PNEUMOTHORAX_MODULE_LABELS,
    citations: PNEUMOTHORAX_CITATIONS
  },
  "pe-treatment": {
    nodes: PE_TREATMENT_NODES,
    entryNodeId: "pe-start",
    categoryId: "critical-care",
    moduleLabels: PE_TREATMENT_MODULE_LABELS,
    citations: PE_TREATMENT_CITATIONS
  },
  "echo-views": {
    nodes: ECHO_VIEWS_NODES,
    entryNodeId: "echo-views-start",
    categoryId: "us-rads",
    moduleLabels: ECHO_VIEWS_MODULE_LABELS,
    citations: ECHO_VIEWS_CITATIONS
  },
  priapism: {
    nodes: PRIAPISM_NODES,
    entryNodeId: "priapism-start",
    categoryId: "procedures",
    moduleLabels: PRIAPISM_MODULE_LABELS,
    citations: PRIAPISM_CITATIONS
  },
  "afib-rvr": {
    nodes: AFIB_RVR_NODES,
    entryNodeId: "afib-start",
    categoryId: "cardiology",
    moduleLabels: AFIB_RVR_MODULE_LABELS,
    citations: AFIB_RVR_CITATIONS
  }
};
var engine = null;
var currentTreeId = null;
var currentConfig = null;
function renderTreeWizard(container, treeId) {
  const config = TREE_CONFIGS[treeId];
  if (!config) {
    renderUnavailable(container, treeId);
    return;
  }
  currentTreeId = treeId;
  currentConfig = config;
  engine = new TreeEngine(config.nodes);
  const restored = engine.restoreSession(treeId);
  if (!restored) {
    engine.startTree(treeId, config.entryNodeId);
  }
  renderCurrentNode(container);
}
function renderCurrentNode(container) {
  if (!engine)
    return;
  const node = engine.getCurrentNode();
  if (!node)
    return;
  container.innerHTML = "";
  if (currentConfig && node.id === currentConfig.entryNodeId) {
    const banner = document.createElement("div");
    banner.className = "wizard-disclaimer";
    banner.textContent = "This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.";
    container.appendChild(banner);
  }
  const header = renderHeader(node);
  container.appendChild(header);
  const content = document.createElement("div");
  content.className = "wizard-content";
  switch (node.type) {
    case "question":
      renderQuestionNode(content, node, container);
      break;
    case "info":
      renderInfoNode(content, node, container);
      break;
    case "result":
      renderResultNode(content, node, container);
      break;
    case "input":
      renderInputNode(content, node, container);
      break;
  }
  container.appendChild(content);
}
function renderHeader(node) {
  const header = document.createElement("div");
  header.className = "wizard-header";
  const backBtn = document.createElement("button");
  backBtn.className = "btn-text wizard-back";
  if (engine?.canGoBack()) {
    backBtn.textContent = "← Back";
    backBtn.addEventListener("click", () => {
      if (!engine)
        return;
      engine.goBack();
      const container = document.querySelector(".main-content");
      if (container)
        renderCurrentNode(container);
    });
  } else {
    backBtn.textContent = "← Exit";
    backBtn.addEventListener("click", () => {
      if (engine)
        engine.reset();
      router.navigate(`/category/${currentConfig?.categoryId ?? ""}`);
    });
  }
  const progress = document.createElement("span");
  progress.className = "wizard-progress";
  const totalModules = engine?.getTotalModules() ?? currentConfig?.moduleLabels.length ?? 1;
  progress.textContent = `Module ${node.module} of ${totalModules}`;
  const isOnEntry = currentConfig && node.id === currentConfig.entryNodeId;
  const topBtn = document.createElement("button");
  topBtn.className = "btn-text wizard-top";
  topBtn.textContent = "↑ Top";
  topBtn.setAttribute("aria-label", "Go to beginning of consult");
  if (isOnEntry) {
    topBtn.style.visibility = "hidden";
  }
  topBtn.addEventListener("click", () => {
    if (!engine || !currentConfig)
      return;
    engine.goToEntry(currentConfig.entryNodeId);
    const cont = document.querySelector(".main-content");
    if (cont)
      renderCurrentNode(cont);
  });
  header.appendChild(backBtn);
  header.appendChild(progress);
  header.appendChild(topBtn);
  return header;
}
function renderQuestionNode(content, node, container) {
  const title = document.createElement("h2");
  title.className = "wizard-title";
  title.textContent = node.title;
  content.appendChild(title);
  const body = document.createElement("div");
  body.className = "wizard-body";
  renderBodyText(body, node.body);
  content.appendChild(body);
  renderNodeImages(content, node);
  if (node.calculatorLinks?.length) {
    const linkRow = document.createElement("div");
    linkRow.className = "wizard-calc-links";
    for (const link of node.calculatorLinks) {
      const btn = document.createElement("button");
      btn.className = "btn-secondary wizard-calc-link";
      btn.textContent = link.label;
      btn.addEventListener("click", () => router.navigate(`/calculator/${link.id}`));
      linkRow.appendChild(btn);
    }
    content.appendChild(linkRow);
  }
  if (node.citation?.length) {
    const cite = document.createElement("div");
    cite.className = "wizard-citation";
    cite.textContent = `Evidence: ${node.citation.map((n) => `[${n}]`).join(" ")}`;
    content.appendChild(cite);
  }
  if (node.options) {
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "wizard-options";
    for (let i = 0;i < node.options.length; i++) {
      const opt = node.options[i];
      const btn = document.createElement("button");
      btn.className = "option-btn";
      if (opt.urgency === "critical") {
        btn.classList.add("option-critical");
      } else if (opt.urgency === "urgent") {
        btn.classList.add("option-urgent");
      }
      const label = document.createElement("span");
      label.className = "option-label";
      label.textContent = opt.label;
      btn.appendChild(label);
      if (opt.description) {
        const desc = document.createElement("span");
        desc.className = "option-description";
        desc.textContent = opt.description;
        btn.appendChild(desc);
      }
      btn.addEventListener("click", () => {
        if (!engine)
          return;
        engine.selectOption(i);
        renderCurrentNode(container);
      });
      optionsContainer.appendChild(btn);
    }
    content.appendChild(optionsContainer);
  }
}
function renderInfoNode(content, node, container) {
  const title = document.createElement("h2");
  title.className = "wizard-title";
  title.textContent = node.title;
  content.appendChild(title);
  const body = document.createElement("div");
  body.className = "wizard-body";
  renderBodyText(body, node.body);
  content.appendChild(body);
  renderNodeImages(content, node);
  if (node.citation?.length) {
    const cite = document.createElement("div");
    cite.className = "wizard-citation";
    cite.textContent = `Evidence: ${node.citation.map((n) => `[${n}]`).join(" ")}`;
    content.appendChild(cite);
  }
  if (node.next) {
    const continueBtn = document.createElement("button");
    continueBtn.className = "btn-primary wizard-continue";
    continueBtn.textContent = "Continue →";
    continueBtn.addEventListener("click", () => {
      if (!engine)
        return;
      engine.continueToNext();
      renderCurrentNode(container);
    });
    content.appendChild(continueBtn);
  }
}
function renderResultNode(content, node, _container) {
  const badge = document.createElement("div");
  badge.className = "result-badge";
  if (node.confidence === "definitive") {
    badge.classList.add("badge-definitive");
  } else if (node.confidence === "recommended") {
    badge.classList.add("badge-recommended");
  } else if (node.confidence === "consider") {
    badge.classList.add("badge-consider");
  }
  badge.textContent = node.title;
  content.appendChild(badge);
  const body = document.createElement("div");
  body.className = "wizard-body";
  renderBodyText(body, node.body);
  content.appendChild(body);
  renderNodeImages(content, node);
  if (node.recommendation) {
    const rec = document.createElement("div");
    rec.className = "result-recommendation";
    renderBodyText(rec, node.recommendation);
    content.appendChild(rec);
  }
  if (node.treatment) {
    renderTreatment(content, node.treatment);
  }
  if (node.citation?.length && currentConfig) {
    renderInlineCitations(content, node.citation, currentConfig.citations);
  }
  const refLink = document.createElement("button");
  refLink.className = "btn-text reference-link";
  refLink.textContent = "\uD83D\uDCCB Full Reference Tables";
  refLink.addEventListener("click", () => {
    router.navigate(`/reference/${currentTreeId}`);
  });
  content.appendChild(refLink);
  const history2 = engine?.getAnswerHistory();
  if (history2 && history2.length > 0) {
    const summarySection = document.createElement("details");
    summarySection.className = "result-summary";
    const summaryTitle = document.createElement("summary");
    summaryTitle.textContent = `Decision path (${history2.length} steps)`;
    summarySection.appendChild(summaryTitle);
    const summaryList = document.createElement("div");
    summaryList.className = "result-summary-list";
    for (const entry of history2) {
      const item = document.createElement("div");
      item.className = "result-summary-item";
      const q = document.createElement("span");
      q.className = "summary-question";
      q.textContent = entry.nodeTitle;
      const a = document.createElement("span");
      a.className = "summary-answer";
      a.textContent = entry.answer;
      item.appendChild(q);
      item.appendChild(a);
      summaryList.appendChild(item);
    }
    summarySection.appendChild(summaryList);
    content.appendChild(summarySection);
  }
  const actions = document.createElement("div");
  actions.className = "result-actions";
  const restartBtn = document.createElement("button");
  restartBtn.className = "btn-secondary";
  restartBtn.textContent = "Start Over";
  restartBtn.addEventListener("click", () => {
    if (engine)
      engine.reset();
    const container = document.getElementById("main-content");
    if (container && currentTreeId) {
      container.innerHTML = "";
      renderTreeWizard(container, currentTreeId);
    }
  });
  const homeBtn = document.createElement("button");
  homeBtn.className = "btn-text";
  homeBtn.textContent = "← All Categories";
  homeBtn.addEventListener("click", () => {
    if (engine)
      engine.reset();
    router.navigate("/");
  });
  actions.appendChild(restartBtn);
  actions.appendChild(homeBtn);
  content.appendChild(actions);
}
function renderInputNode(content, node, container) {
  renderQuestionNode(content, node, container);
}
function renderTreatment(container, treatment) {
  const section = document.createElement("div");
  section.className = "treatment-section";
  const heading = document.createElement("h2");
  heading.className = "treatment-heading";
  heading.textContent = "Treatment";
  section.appendChild(heading);
  section.appendChild(renderDrugCard("First-Line", treatment.firstLine));
  if (treatment.alternative) {
    const altDetails = document.createElement("details");
    altDetails.className = "treatment-expandable";
    const altSummary = document.createElement("summary");
    altSummary.textContent = "▸ Alternative regimen";
    altDetails.appendChild(altSummary);
    altDetails.appendChild(renderDrugCard("Alternative", treatment.alternative));
    section.appendChild(altDetails);
  }
  if (treatment.pcnAllergy) {
    const pcnDetails = document.createElement("details");
    pcnDetails.className = "treatment-expandable";
    const pcnSummary = document.createElement("summary");
    pcnSummary.textContent = "▸ PCN allergy alternatives";
    pcnDetails.appendChild(pcnSummary);
    pcnDetails.appendChild(renderDrugCard("PCN Allergy", treatment.pcnAllergy));
    section.appendChild(pcnDetails);
  }
  if (treatment.monitoring) {
    const monDetails = document.createElement("details");
    monDetails.className = "treatment-expandable";
    const monSummary = document.createElement("summary");
    monSummary.textContent = "▸ Follow-up monitoring";
    monDetails.appendChild(monSummary);
    const monBody = document.createElement("div");
    monBody.className = "treatment-monitoring";
    renderBodyText(monBody, treatment.monitoring);
    monDetails.appendChild(monBody);
    section.appendChild(monDetails);
  }
  container.appendChild(section);
}
function renderDrugCard(_label, drug) {
  const card = document.createElement("div");
  card.className = "drug-regimen-card";
  const drugName = document.createElement("div");
  drugName.className = "drug-regimen-name";
  const drugStoreId = findDrugIdByName(drug.drug);
  if (drugStoreId) {
    const drugLink = document.createElement("span");
    drugLink.className = "body-inline-link";
    drugLink.textContent = drug.drug;
    drugLink.setAttribute("role", "button");
    drugLink.setAttribute("tabindex", "0");
    drugLink.addEventListener("click", () => showDrugModal(drugStoreId));
    drugName.appendChild(drugLink);
  } else {
    drugName.textContent = drug.drug;
  }
  card.appendChild(drugName);
  const doseRow = document.createElement("div");
  doseRow.className = "drug-regimen-dose";
  const doseSpan = document.createElement("span");
  doseSpan.className = "dose-highlight";
  doseSpan.textContent = `${drug.dose} ${drug.route}`;
  doseRow.appendChild(doseSpan);
  card.appendChild(doseRow);
  const freqRow = document.createElement("div");
  freqRow.className = "drug-regimen-detail";
  freqRow.textContent = `Frequency: ${drug.frequency}`;
  card.appendChild(freqRow);
  const durRow = document.createElement("div");
  durRow.className = "drug-regimen-detail";
  durRow.textContent = `Duration: ${drug.duration}`;
  card.appendChild(durRow);
  if (drug.notes) {
    const notes = document.createElement("div");
    notes.className = "drug-regimen-notes";
    renderBodyText(notes, drug.notes);
    card.appendChild(notes);
  }
  return card;
}
function renderNodeImages(container, node) {
  if (!node.images || node.images.length === 0)
    return;
  const gallery = document.createElement("div");
  gallery.className = "wizard-images";
  for (const img of node.images) {
    const figure = document.createElement("figure");
    figure.className = "wizard-image-figure";
    const imgEl = document.createElement("img");
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.className = "wizard-image";
    imgEl.loading = "lazy";
    figure.appendChild(imgEl);
    if (img.caption) {
      const caption = document.createElement("figcaption");
      caption.className = "wizard-image-caption";
      caption.textContent = img.caption;
      figure.appendChild(caption);
    }
    gallery.appendChild(figure);
  }
  container.appendChild(gallery);
}
function renderBodyText(container, text) {
  const linkPattern = /\[([^\]]+)\]\(#\/(info|drug|calculator)\/([^)]+)\)/g;
  const lines = text.split(`
`);
  for (let i = 0;i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") {
      container.appendChild(document.createElement("br"));
    } else if (linkPattern.test(line)) {
      linkPattern.lastIndex = 0;
      const p = document.createElement("p");
      let lastIndex = 0;
      let match;
      while ((match = linkPattern.exec(line)) !== null) {
        const linkLabel = match[1];
        const linkType = match[2];
        const linkId = match[3];
        if (match.index > lastIndex) {
          p.appendChild(document.createTextNode(line.slice(lastIndex, match.index)));
        }
        const link = document.createElement("span");
        link.className = "body-inline-link";
        link.textContent = linkLabel;
        link.setAttribute("role", "button");
        link.setAttribute("tabindex", "0");
        if (linkType === "drug") {
          link.addEventListener("click", () => showDrugModal(linkId));
        } else if (linkType === "calculator") {
          link.addEventListener("click", () => router.navigate(`/calculator/${linkId}`));
        } else {
          link.addEventListener("click", () => showInfoModal(linkId));
        }
        p.appendChild(link);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        p.appendChild(document.createTextNode(line.slice(lastIndex)));
      }
      container.appendChild(p);
    } else {
      const p = document.createElement("p");
      appendBoldAware(p, line);
      container.appendChild(p);
    }
  }
}
function appendBoldAware(parent, text) {
  const boldPattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;
  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    const strong = document.createElement("strong");
    strong.textContent = match[1];
    parent.appendChild(strong);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parent.appendChild(document.createTextNode(text.slice(lastIndex)));
  } else if (lastIndex === 0) {
    parent.appendChild(document.createTextNode(text));
  }
}
function renderUnavailable(container, treeId) {
  container.innerHTML = "";
  const backBtn = document.createElement("button");
  backBtn.className = "btn-text";
  backBtn.textContent = "← Categories";
  backBtn.addEventListener("click", () => router.navigate("/"));
  container.appendChild(backBtn);
  const empty = document.createElement("div");
  empty.className = "empty-state";
  const icon = document.createElement("div");
  icon.className = "empty-state-icon";
  icon.textContent = "\uD83D\uDEA7";
  const title = document.createElement("h3");
  title.textContent = "Coming Soon";
  const body = document.createElement("p");
  body.textContent = `Decision tree "${treeId}" is not yet available.`;
  empty.appendChild(icon);
  empty.appendChild(title);
  empty.appendChild(body);
  container.appendChild(empty);
}

// src/app.ts
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").then((reg) => {
      console.log("Service worker registered:", reg.scope);
    }).catch((err) => {
      console.error("Service worker registration failed:", err);
    });
  }
}
function getMain() {
  const el = document.getElementById("main-content");
  if (!el)
    throw new Error("Missing #main-content element");
  return el;
}
function clearMain() {
  const main = getMain();
  main.innerHTML = "";
  return main;
}
function renderPlaceholder(title, subtitle, icon) {
  const main = clearMain();
  const container = document.createElement("div");
  container.className = "empty-state";
  const iconEl = document.createElement("div");
  iconEl.className = "empty-state-icon";
  iconEl.textContent = icon;
  const titleEl = document.createElement("h3");
  titleEl.textContent = title;
  const subtitleEl = document.createElement("p");
  subtitleEl.textContent = subtitle;
  container.appendChild(iconEl);
  container.appendChild(titleEl);
  container.appendChild(subtitleEl);
  main.appendChild(container);
}
function handleHome(_params) {
  const main = clearMain();
  renderCategoryGrid(main);
}
function handleCategory(params) {
  const id = params["id"] ?? "unknown";
  const main = clearMain();
  renderCategoryView(main, id);
}
function handleTree(params) {
  const id = params["id"] ?? "unknown";
  const main = clearMain();
  renderTreeWizard(main, id);
}
function handleTreeNode(params) {
  const treeId = params["id"] ?? "unknown";
  const nodeId = params["nodeId"] ?? "unknown";
  renderPlaceholder(`Node: ${nodeId}`, `In tree: ${treeId}. Node rendering coming in Task 8.`, "\uD83D\uDD35");
}
function handleReference(params) {
  const main = clearMain();
  const treeId = params["treeId"];
  renderReferencePanel(main, treeId);
}
function handleDrugList(_params) {
  const main = clearMain();
  renderDrugList(main);
}
function handleCalculatorList(_params) {
  const main = clearMain();
  renderCalculatorList(main);
}
function handleCalculator(params) {
  const id = params["id"] ?? "unknown";
  const main = clearMain();
  renderCalculator(main, id);
}
function handleNotFound() {
  renderPlaceholder("Page Not Found", "This route doesn’t exist. Tap back or go home.", "❓");
  const main = getMain();
  const homeBtn = document.createElement("button");
  homeBtn.className = "btn-primary";
  homeBtn.textContent = "Go Home";
  homeBtn.style.marginTop = "16px";
  homeBtn.addEventListener("click", () => router.navigate("/"));
  main.querySelector(".empty-state")?.appendChild(homeBtn);
}
function init() {
  registerServiceWorker();
  router.on("/", handleHome);
  router.on("/category/:id", handleCategory);
  router.on("/tree/:id", handleTree);
  router.on("/tree/:id/node/:nodeId", handleTreeNode);
  router.on("/reference/:treeId", handleReference);
  router.on("/reference", handleReference);
  router.on("/drugs", handleDrugList);
  router.on("/calculators", handleCalculatorList);
  router.on("/calculator/:id", handleCalculator);
  router.onNotFound(handleNotFound);
  router.start();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
