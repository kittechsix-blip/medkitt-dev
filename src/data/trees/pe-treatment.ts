/**
 * Pulmonary Embolism Treatment Consult Tree
 * Based on 2019 ESC Guidelines for Diagnosis and Management of Acute PE
 */

import type { ConsultTree } from '../types/consult-tree';

export const peTreatmentConsult: ConsultTree = {
  id: 'pe-treatment',
  title: 'Pulmonary Embolism Treatment',
  description: 'Evidence-based treatment algorithm for acute pulmonary embolism based on ESC 2019 guidelines',
  category: 'Emergency Medicine / Cardiology',
  version: '1.0.0',
  lastUpdated: '2025-02-26',
  metadata: {
    author: 'MedKitt Clinical Team',
    reviewStatus: 'approved',
    audience: ['Emergency Medicine', 'Internal Medicine', 'Critical Care'],
    estimatedTime: 8
  },
  references: [
    {
      id: 1,
      title: '2019 ESC Guidelines for the Diagnosis and Management of Acute Pulmonary Embolism',
      authors: 'Konstantinides SV, Meyer G, Becattini C, et al.',
      source: 'European Heart Journal',
      year: 2020,
      volume: '41(4)',
      pages: '543-603',
      doi: '10.1093/eurheartj/ehz405',
      url: 'https://academic.oup.com/eurheartj/article/41/4/543/5556506',
      accessedDate: '2025-02-26',
      shortCitation: 'ESC 2019'
    },
    {
      id: 2,
      title: 'Guidelines on the Diagnosis and Management of Acute Pulmonary Embolism',
      authors: 'Torbicki A, Perrier A, Konstantinides S, et al.',
      source: 'European Heart Journal',
      year: 2008,
      volume: '29(18)',
      pages: '2276-315',
      doi: '10.1093/eurheartj/ehn310',
      shortCitation: 'ESC 2008'
    },
    {
      id: 3,
      title: 'Management of Massive and Submassive Pulmonary Embolism',
      authors: 'Jaff MR, McMurtry MS, Archer SL, et al.',
      source: 'Circulation',
      year: 2011,
      volume: '123(16)',
      pages: '1788-830',
      doi: '10.1161/CIR.0b013e318214914f',
      shortCitation: 'AHA 2011'
    },
    {
      id: 4,
      title: 'Antithrombotic Therapy for VTE Disease: Second Update of the CHEST Guideline',
      authors: 'Stevens SM, Woller SC, Kreuziger LB, et al.',
      source: 'CHEST',
      year: 2021,
      volume: '160(6)',
      pages: 'e545-e608',
      doi: '10.1016/j.chest.2021.07.055',
      shortCitation: 'CHEST 2021'
    },
    {
      id: 5,
      title: 'Heparin-Induced Thrombocytopenia in the Cardiovascular Patient',
      authors: 'Warkentin TE, Greinacher A, Gruel Y, et al.',
      source: 'Circulation',
      year: 2021,
      volume: '144(5)',
      pages: 'e1-e22',
      doi: '10.1161/CIR.0000000000001000',
      shortCitation: 'Warkentin et al. 2021'
    }
  ],
  root: {
    id: 'pe-risk-stratification',
    title: 'PE Risk Stratification',
    type: 'info',
    content: 'Risk stratification guides treatment decisions in acute PE. Assess hemodynamic status first. {{ref:1}} {{ref:3}}',
    metadata: {
      priority: 'critical',
      tags: ['Risk Stratification']
    },
    children: [
      {
        id: 'massive-pe',
        title: 'Massive PE (High-Risk)',
        type: 'warning',
        content: 'Sustained hypotension (SBP <90 mmHg or drop ≥40 mmHg for >15 min), cardiogenic shock, or cardiac arrest. Mortality >15% without immediate treatment. {{ref:1}} {{ref:3}}',
        metadata: {
          priority: 'critical',
          icd10: ['I26.09', 'I26.90'],
          tags: ['Hemodynamic Collapse', 'Emergency']
        },
        children: [
          {
            id: 'massive-immediate',
            title: 'Immediate Interventions',
            type: 'treatment',
            content: '1. IV unfractionated heparin (bolus + infusion) OR LMWH if not for thrombolysis\n2. Systemic thrombolysis (tPA 100mg IV over 2h) if no contraindications\n3. Consider surgical embolectomy or catheter-directed therapy if thrombolysis contraindicated per {{ref:1}} {{ref:3}}',
            metadata: {
              priority: 'critical',
              tags: ['Thrombolysis', 'ICU']
            }
          }
        ]
      },
      {
        id: 'submassive-pe',
        title: 'Submassive PE (Intermediate-Risk)',
        type: 'decision',
        content: 'Normotensive but with RV dysfunction (echo/CT) or elevated cardiac biomarkers (troponin, BNP). Risk of deterioration. {{ref:1}} {{ref:3}}',
        metadata: {
          priority: 'high',
          icd10: ['I26.09', 'I26.99'],
          tags: ['RV Dysfunction']
        },
        children: [
          {
            id: 'submassive-intermediate-high',
            title: 'Intermediate-High Risk',
            type: 'decision',
            content: 'Both RV dysfunction AND elevated cardiac biomarkers. Consider thrombolysis if clinical signs of deterioration per {{ref:1}}.',
            metadata: {
              priority: 'high',
              tags: ['Close Monitoring']
            },
            children: [
              {
                id: 'submassive-treatment',
                title: 'Anticoagulation + Consider Thrombolysis',
                type: 'treatment',
                content: 'Start anticoagulation immediately (LMWH, fondaparinux, or UFH). Consider "rescue" thrombolysis if clinical deterioration per {{ref:1}} {{ref:4}}. ICU monitoring recommended.',
                metadata: {
                  priority: 'high',
                  tags: ['Anticoagulation', 'ICU']
                }
              }
            ]
          },
          {
            id: 'submassive-intermediate-low',
            title: 'Intermediate-Low Risk',
            type: 'treatment',
            content: 'Either RV dysfunction OR elevated biomarkers, but not both. Anticoagulation alone per {{ref:1}}. Hospital admission for monitoring.',
            metadata: {
              priority: 'medium',
              tags: ['Anticoagulation', 'Admit']
            }
          }
        ]
      },
      {
        id: 'low-risk-pe',
        title: 'Low-Risk PE',
        type: 'success',
        content: 'No RV dysfunction on imaging, normal cardiac biomarkers, no hypotension. PESI Class I-II or sPESI = 0. {{ref:1}}',
        metadata: {
          priority: 'low',
          icd10: ['I26.99'],
          tags: ['Outpatient', 'Low Risk']
        },
        children: [
          {
            id: 'outpatient-eligible',
            title: 'Outpatient Treatment Eligible?',
            type: 'decision',
            content: 'Assess for outpatient treatment if: good social support, no comorbidities, no hypoxia requiring O2, able to take oral medications, reliable follow-up per {{ref:1}} {{ref:4}}.',
            children: [
              {
                id: 'outpatient-therapy',
                title: 'Outpatient Anticoagulation',
                type: 'treatment',
                content: 'DOACs preferred: apixaban 10mg BID x 7 days then 5mg BID, OR rivaroxaban 15mg BID x 21 days then 20mg daily per {{ref:1}} {{ref:4}}. Early follow-up within 3-7 days.',
                metadata: {
                  priority: 'low',
                  tags: ['DOAC', 'Outpatient']
                }
              },
              {
                id: 'inpatient-low-risk',
                title: 'Brief Inpatient Stay',
                type: 'treatment',
                content: 'If any concerns for outpatient management, admit for 24-48h observation with initiation of anticoagulation per {{ref:1}}.',
                metadata: {
                  priority: 'medium',
                  tags: ['Short Stay']
                }
              }
            ]
          }
        ]
      },
      {
        id: 'anticoagulation-selection',
        title: 'Anticoagulation Selection',
        type: 'decision',
        content: 'Choice of anticoagulation depends on renal function, bleeding risk, patient preference, and cost per {{ref:4}}.',
        children: [
          {
            id: 'doac-regimen',
            title: 'DOAC Regimens (Preferred)',
            type: 'treatment',
            content: 'Apixaban 10mg BID x 7d then 5mg BID; OR Rivaroxaban 15mg BID x 21d then 20mg daily with food; OR Edoxaban 60mg daily after 5-10 days of parenteral therapy per {{ref:4}}.',
            metadata: {
              tags: ['DOAC', 'Oral']
            }
          },
          {
            id: 'lmwh-warfarin',
            title: 'LMWH Bridging to Warfarin',
            type: 'treatment',
            content: 'Enoxaparin 1mg/kg SC BID (or 1.5mg/kg daily) with warfarin overlap until INR 2.0-3.0 x 24h. Continue warfarin for minimum 3 months per {{ref:4}}.',
            metadata: {
              tags: ['LMWH', 'Warfarin']
            }
          },
          {
            id: 'hepatic-renal-impairment',
            title: 'Renal or Hepatic Impairment',
            type: 'treatment',
            content: 'UFH preferred in renal impairment (CrCl <30) or severe hepatic disease. Adjust LMWH dose for CrCl 15-30 per {{ref:4}} {{ref:5}}.',
            metadata: {
              priority: 'high',
              tags: ['Dose Adjustment']
            }
          }
        ]
      }
    ]
  }
};

export default peTreatmentConsult;
