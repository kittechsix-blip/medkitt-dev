// MedKitt — Category Definitions
// Specialty categories with custom 3D icons + tool categories (Pharmacy, Med-Calc)

import type { Category } from '../models/types.js';

/** Built-in categories in alphabetical order. Icon field stores PNG filename in assets/icons/. */
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'anesthesia-airway',    name: 'Anesthesia / Airway',    icon: 'anesthesia-airway.png', decisionTrees: [], isCustom: false },
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: 'cardiology.png',
    decisionTrees: [
      {
        id: 'afib-rvr',
        title: 'A-Fib RVR',
        subtitle: 'Stability → Rate Control → Refractory → Anticoagulation',
        categoryId: 'cardiology',
        version: '1.0',
        nodeCount: 20,
        entryNodeId: 'afib-start',
      }
    ],
    isCustom: false,
  },
  {
    id: 'critical-care',
    name: 'Critical Care',
    icon: 'critical-care.png',
    decisionTrees: [
      {
        id: 'pe-treatment',
        title: 'PE Treatment',
        subtitle: 'Risk Stratification \u2192 Management',
        categoryId: 'critical-care',
        version: '1.0',
        nodeCount: 29,
        entryNodeId: 'pe-start',
      }
    ],
    isCustom: false,
  },
  {
    id: 'emergency-medicine',
    name: 'EM',
    icon: 'em.png',
    decisionTrees: [
      {
        id: 'pe-treatment',
        title: 'PE Treatment',
        subtitle: 'Risk Stratification \u2192 Management',
        categoryId: 'emergency-medicine',
        version: '1.0',
        nodeCount: 29,
        entryNodeId: 'pe-start',
      }
    ],
    isCustom: false,
  },
  { id: 'gastroenterology',     name: 'GI (Gastroenterology)',  icon: 'gi.png',                decisionTrees: [], isCustom: false },
  { id: 'heme-onc',             name: 'Heme/Onc',              icon: 'heme-onc.png',          decisionTrees: [], isCustom: false },
  {
    id: 'infectious-disease',
    name: 'Infectious Disease',
    icon: 'infectious-disease.png',
    decisionTrees: [
      {
        id: 'neurosyphilis',
        title: 'Neurosyphilis Workup',
        subtitle: 'Serology \u2192 LP decision \u2192 CSF interpretation \u2192 Treatment',
        categoryId: 'infectious-disease',
        version: '1.0',
        nodeCount: 42,
        entryNodeId: 'serology-start',
      }
    ],
    isCustom: false,
  },
  { id: 'med-calc',             name: 'Med-Calc',              icon: 'med-calc.png',          decisionTrees: [], isCustom: false },
  { id: 'nephro-rheum-endo',    name: 'Nephro/Rheum/Endo',     icon: 'nephro-rheum-endo.png', decisionTrees: [], isCustom: false },
  { id: 'neurology',            name: 'Neurology',             icon: 'neurology.png',         decisionTrees: [], isCustom: false },
  { id: 'ob-gyn',               name: 'OB/GYN',                icon: 'ob-gyn.png',            decisionTrees: [], isCustom: false },
  { id: 'orthopedics',          name: 'Ortho',                 icon: 'ortho.png',             decisionTrees: [], isCustom: false },
  { id: 'pediatrics',           name: 'Pediatrics',            icon: 'pediatrics.png',        decisionTrees: [], isCustom: false },
  { id: 'pharmacy',             name: 'Pharmacy',              icon: 'pharmacy.png',          decisionTrees: [], isCustom: false },
  {
    id: 'procedures',
    name: 'Procedures',
    icon: 'procedures.png',
    decisionTrees: [
      {
        id: 'afib-rvr',
        title: 'Synchronized Cardioversion',
        subtitle: 'A-Fib RVR: Stability \u2192 Cardioversion Protocol',
        categoryId: 'procedures',
        version: '1.0',
        nodeCount: 20,
        entryNodeId: 'afib-start',
      },
      {
        id: 'priapism',
        title: 'Priapism Treatment',
        subtitle: 'Classification \u2192 Penile Block \u2192 Aspiration \u2192 Phenylephrine \u2192 Escalation',
        categoryId: 'procedures',
        version: '1.0',
        nodeCount: 44,
        entryNodeId: 'priapism-start',
      },
      {
        id: 'chest-tube',
        title: 'Tube Thoracostomy',
        subtitle: 'Preparation \u2192 Insertion \u2192 Management',
        categoryId: 'procedures',
        version: '1.0',
        nodeCount: 23,
        entryNodeId: 'ctube-anatomy',
      },
    ],
    isCustom: false,
  },
  { id: 'toxicology',           name: 'Toxicology',            icon: 'toxicology.png',        decisionTrees: [], isCustom: false },
  {
    id: 'trauma-surg',
    name: 'Trauma/Surg',
    icon: 'trauma-surg.png',
    decisionTrees: [
      {
        id: 'chest-tube',
        title: 'Pneumothorax Management',
        subtitle: 'Indications \u2192 Preparation \u2192 Insertion \u2192 Management',
        categoryId: 'trauma-surg',
        version: '1.0',
        nodeCount: 40,
        entryNodeId: 'ctube-start',
      }
    ],
    isCustom: false,
  },
  {
    id: 'us-rads',
    name: 'U/S-Rads',
    icon: 'us-rads.png',
    decisionTrees: [
      {
        id: 'pneumothorax',
        title: 'Pneumothorax POCUS',
        subtitle: 'Technique \u2192 Lung Sliding \u2192 A\u2019 Profile \u2192 Lung Point',
        categoryId: 'us-rads',
        version: '1.0',
        nodeCount: 13,
        entryNodeId: 'pneumothorax-start',
      },
      {
        id: 'echo-views',
        title: 'Basic Echo Views',
        subtitle: 'PLAX \u2192 PSAX \u2192 A4C \u2192 Subxiphoid \u2192 IVC',
        categoryId: 'us-rads',
        version: '1.0',
        nodeCount: 8,
        entryNodeId: 'echo-views-start',
      }
    ],
    isCustom: false,
  },
  {
    id: 'urology',
    name: 'Urology',
    icon: 'urology.png',
    decisionTrees: [
      {
        id: 'priapism',
        title: 'Priapism Treatment',
        subtitle: 'Classification \u2192 Penile Block \u2192 Aspiration \u2192 Phenylephrine \u2192 Escalation',
        categoryId: 'urology',
        version: '1.0',
        nodeCount: 44,
        entryNodeId: 'priapism-start',
      }
    ],
    isCustom: false,
  },
];

const STORAGE_KEY = 'em-custom-categories';

/** Load custom categories from LocalStorage */
export function loadCustomCategories(): Category[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Category[];
  } catch {
    return [];
  }
}

/** Save custom categories to LocalStorage */
export function saveCustomCategories(categories: Category[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
}

/** Get all categories: built-in + custom */
export function getAllCategories(): Category[] {
  return [...DEFAULT_CATEGORIES, ...loadCustomCategories()];
}

/** Add a new custom category and persist it */
export function addCustomCategory(name: string): Category {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const category: Category = {
    id,
    name,
    icon: '\uD83D\uDCCB', // clipboard emoji as default
    decisionTrees: [],
    isCustom: true,
  };
  const custom = loadCustomCategories();
  custom.push(category);
  saveCustomCategories(custom);
  return category;
}
