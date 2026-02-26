/**
 * Neurosyphilis Consult Tree
 * Based on CDC 2021 Sexually Transmitted Infections Treatment Guidelines
 */

import type { ConsultTree } from '../types/consult-tree';

export const neurosyphilisConsult: ConsultTree = {
  id: 'neurosyphilis',
  title: 'Neurosyphilis Evaluation & Treatment',
  description: 'Clinical decision support for suspected neurosyphilis based on CDC 2021 guidelines',
  category: 'Infectious Disease',
  version: '1.0.0',
  lastUpdated: '2025-02-26',
  metadata: {
    author: 'MedKitt Clinical Team',
    reviewStatus: 'approved',
    audience: ['Emergency Medicine', 'Infectious Disease', 'Neurology'],
    estimatedTime: 10
  },
  references: [
    {
      id: 1,
      title: 'Sexually Transmitted Infections Treatment Guidelines, 2021: Syphilis',
      authors: 'Centers for Disease Control and Prevention',
      source: 'CDC',
      year: 2021,
      url: 'https://www.cdc.gov/std/treatment-guidelines/syphilis.htm',
      accessedDate: '2025-02-26',
      shortCitation: 'CDC 2021'
    },
    {
      id: 2,
      title: 'The Prognostic Value of the Cerebrospinal Fluid Venereal Disease Research Laboratory Test in Treated Syphilis',
      authors: 'Liu LL, Zheng HY, Zhang HP, et al.',
      source: 'Sexually Transmitted Diseases',
      year: 2014,
      volume: '41(4)',
      pages: '243-7',
      doi: '10.1097/OLQ.0000000000000113',
      shortCitation: 'Liu et al. 2014'
    },
    {
      id: 3,
      title: 'Clinical Manifestations and Diagnosis of Neurosyphilis',
      authors: 'Marra CM',
      source: 'Current Neurology and Neuroscience Reports',
      year: 2004,
      volume: '4(6)',
      pages: '435-40',
      doi: '10.1007/s11910-004-0083-3',
      shortCitation: 'Marra 2004'
    },
    {
      id: 4,
      title: 'Neurosyphilis: A Current Review',
      authors: 'Ghanem KG, Workowski KA',
      source: 'Current Infectious Disease Reports',
      year: 2011,
      volume: '13(2)',
      pages: '128-35',
      doi: '10.1007/s11908-010-0154-2',
      shortCitation: 'Ghanem & Workowski 2011'
    }
  ],
  root: {
    id: 'neurosyphilis-screening',
    title: 'Neurosyphilis Screening',
    type: 'info',
    content: 'Neurosyphilis should be considered in patients with syphilis who have neurological symptoms or signs. The diagnosis requires a combination of clinical, serologic, and CSF findings per {{ref:1}}.',
    children: [
      {
        id: 'symptoms-present',
        title: 'Does the patient have neurological symptoms?',
        type: 'decision',
        content: 'Neurological symptoms suggestive of neurosyphilis include: visual changes, hearing loss, cognitive impairment, psychiatric symptoms, cranial nerve deficits, meningismus, or stroke-like symptoms. {{ref:3}}',
        children: [
          {
            id: 'csf-evaluation',
            title: 'Perform CSF Evaluation',
            type: 'diagnostic',
            content: 'CSF analysis is indicated for patients with syphilis and neurological symptoms. CSF-VDRL is highly specific but insensitive. CSF FTA-ABS is more sensitive but less specific. {{ref:1}} {{ref:4}}',
            metadata: {
              priority: 'high',
              tags: ['LP', 'CSF', 'Diagnosis']
            },
            children: [
              {
                id: 'csf-positive',
                title: 'CSF-VDRL Positive',
                type: 'diagnostic',
                content: 'A reactive CSF-VDRL is diagnostic of neurosyphilis. CSF pleocytosis (>5 WBC/µL) and elevated protein support the diagnosis. {{ref:1}}',
                metadata: {
                  priority: 'critical',
                  tags: ['Confirmed', 'Treat']
                },
                children: [
                  {
                    id: 'treatment-standard',
                    title: 'Start Treatment: Aqueous Penicillin G',
                    type: 'treatment',
                    content: 'Aqueous crystalline penicillin G 18-24 million units per day, administered as 3-4 million units IV every 4 hours or continuous infusion for 10-14 days per {{ref:1}}. Alternative: Procaine penicillin 2.4 million units IM daily PLUS probenecid 500mg PO QID for 10-14 days.',
                    metadata: {
                      priority: 'critical',
                      icd10: ['A52.13', 'A52.19'],
                      tags: ['Antibiotics', 'IV Therapy']
                    }
                  }
                ]
              },
              {
                id: 'csf-negative-symptoms',
                title: 'CSF-VDRL Negative but Clinical Suspicion High',
                type: 'decision',
                content: 'If CSF-VDRL is negative but CSF pleocytosis (>5 WBC/µL) or elevated protein is present with neurological symptoms, treat as neurosyphilis per {{ref:1}} {{ref:2}}.',
                metadata: {
                  priority: 'high',
                  tags: ['Clinical Diagnosis']
                },
                children: [
                  {
                    id: 'treatment-possible',
                    title: 'Treat as Probable Neurosyphilis',
                    type: 'treatment',
                    content: 'Treat with Aqueous crystalline penicillin G 18-24 million units IV per day for 10-14 days per {{ref:1}}. Follow-up CSF examination at 6 months recommended.',
                    metadata: {
                      priority: 'high',
                      tags: ['Probable', 'Treatment']
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ocular-otosyphilis',
        title: 'Ocular or Otic Involvement?',
        type: 'decision',
        content: 'Syphilis can cause uveitis, optic neuritis, vision loss, hearing loss, tinnitus, or vertigo. These manifestations require CSF evaluation and treatment as neurosyphilis per {{ref:1}} {{ref:4}}.',
        children: [
          {
            id: 'ocular-treatment',
            title: 'Ocular/Otosyphilis Treatment',
            type: 'treatment',
            content: 'CSF examination is recommended. Treat as neurosyphilis with Aqueous penicillin G 18-24 million units IV daily for 10-14 days per {{ref:1}}. Consider ophthalmology/ENT consultation.',
            metadata: {
              priority: 'critical',
              icd10: ['A52.71', 'A52.79'],
              tags: ['Ocular', 'Otic', 'Urgent']
            }
          }
        ]
      },
      {
        id: 'asymptomatic-late',
        title: 'Asymptomatic Late Latent Syphilis',
        type: 'info',
        content: 'Routine CSF examination is NOT recommended for asymptomatic late latent syphilis unless the patient has failed therapy, has HIV with late latent syphilis, or has other clinical indications per {{ref:1}}.',
        children: [
          {
            id: 'standard-latent-treatment',
            title: 'Standard Late Latent Treatment',
            type: 'treatment',
            content: 'Benzathine penicillin G 2.4 million units IM weekly for 3 weeks (7.2 million units total). If penicillin-allergic, consider desensitization or doxycycline 100mg PO BID for 28 days per {{ref:1}}.',
            metadata: {
              priority: 'medium',
              tags: ['Latent', 'Outpatient']
            }
          }
        ]
      }
    ]
  }
};

export default neurosyphilisConsult;
