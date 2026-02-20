// EM Decision Trees — Category Definitions
// All 23 EM categories from PRD.md Section 7

import type { Category } from '../models/types.js';

/** Built-in EM categories. Only Infectious Disease has content initially. */
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'airway',              name: 'Airway',              icon: '\uD83E\uDEC1', decisionTrees: [], isCustom: false },
  { id: 'cardiology',          name: 'Cardiology',          icon: '\u2764\uFE0F',  decisionTrees: [], isCustom: false },
  { id: 'critical-care',       name: 'Critical Care',       icon: '\uD83C\uDFE5', decisionTrees: [], isCustom: false },
  { id: 'dermatology',         name: 'Dermatology',         icon: '\uD83D\uDD2C', decisionTrees: [], isCustom: false },
  { id: 'drugs',               name: 'Drugs',               icon: '\uD83D\uDC8A', decisionTrees: [], isCustom: false },
  { id: 'emergency-medicine',  name: 'Emergency Medicine',  icon: '\uD83D\uDE91', decisionTrees: [], isCustom: false },
  { id: 'endocrinology',       name: 'Endocrinology',       icon: '\u26A1',       decisionTrees: [], isCustom: false },
  { id: 'gastroenterology',    name: 'Gastroenterology',    icon: '\uD83D\uDD04', decisionTrees: [], isCustom: false },
  { id: 'hematology',          name: 'Hematology',          icon: '\uD83E\uDE78', decisionTrees: [], isCustom: false },
  {
    id: 'infectious-disease',
    name: 'Infectious Disease',
    icon: '\uD83E\uDDA0',
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
  { id: 'nerve-blocks',        name: 'Nerve Blocks',        icon: '\uD83D\uDC89', decisionTrees: [], isCustom: false },
  { id: 'neurology',           name: 'Neurology',           icon: '\uD83E\uDDE0', decisionTrees: [], isCustom: false },
  { id: 'ob-gyn',              name: 'OB/GYN',              icon: '\uD83D\uDC76', decisionTrees: [], isCustom: false },
  { id: 'orthopedics',         name: 'Orthopedics',         icon: '\uD83E\uDDB4', decisionTrees: [], isCustom: false },
  { id: 'pediatrics',          name: 'Pediatrics',          icon: '\uD83E\uDDD2', decisionTrees: [], isCustom: false },
  { id: 'procedures',          name: 'Procedures',          icon: '\uD83D\uDD27', decisionTrees: [], isCustom: false },
  { id: 'pulmonology',         name: 'Pulmonology',         icon: '\uD83C\uDF2C\uFE0F', decisionTrees: [], isCustom: false },
  { id: 'renal',               name: 'Renal',               icon: '\uD83D\uDCA7', decisionTrees: [], isCustom: false },
  { id: 'rheumatology',        name: 'Rheumatology',        icon: '\uD83E\uDD32', decisionTrees: [], isCustom: false },
  { id: 'toxicology',          name: 'Toxicology',          icon: '\u2620\uFE0F',  decisionTrees: [], isCustom: false },
  { id: 'trauma',              name: 'Trauma',              icon: '\uD83E\uDE79', decisionTrees: [], isCustom: false },
  {
    id: 'ultrasound',
    name: 'Ultrasound',
    icon: '\uD83D\uDCE1',
    decisionTrees: [
      {
        id: 'pneumothorax',
        title: 'Pneumothorax POCUS',
        subtitle: 'Technique \u2192 Lung Sliding \u2192 A\u2019 Profile \u2192 Lung Point',
        categoryId: 'ultrasound',
        version: '1.0',
        nodeCount: 13,
        entryNodeId: 'pneumothorax-start',
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
