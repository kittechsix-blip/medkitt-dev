export const DEFAULT_CATEGORIES = [
  { id: "anesthesia-airway", name: "Anesthesia / Airway", icon: "anesthesia-airway.png", decisionTrees: [], isCustom: false },
  { id: "cardiology", name: "Cardiology", icon: "cardiology.png", decisionTrees: [], isCustom: false },
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
const STORAGE_KEY = "em-custom-categories";
export function loadCustomCategories() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
      return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
export function saveCustomCategories(categories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}
export function getAllCategories() {
  return [...DEFAULT_CATEGORIES, ...loadCustomCategories()];
}
export function addCustomCategory(name) {
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
