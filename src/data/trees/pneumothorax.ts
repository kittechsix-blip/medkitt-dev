/**
 * Pneumothorax POCUS Consult Tree
 * Based on ACEP Ultrasound Guidelines and WINFOCUS recommendations
 */

import type { ConsultTree } from '../types/consult-tree';

export const pneumothoraxConsult: ConsultTree = {
  id: 'pneumothorax-pocus',
  title: 'Pneumothorax Evaluation with POCUS',
  description: 'Point-of-care ultrasound for diagnosis and management of pneumothorax',
  category: 'Emergency Medicine / Critical Care Ultrasound',
  version: '1.0.0',
  lastUpdated: '2025-02-26',
  metadata: {
    author: 'MedKitt Clinical Team',
    reviewStatus: 'approved',
    audience: ['Emergency Medicine', 'Critical Care', 'Trauma Surgery'],
    estimatedTime: 8
  },
  references: [
    {
      id: 1,
      title: 'Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department with Suspected Pneumothorax',
      authors: 'American College of Emergency Physicians',
      source: 'Annals of Emergency Medicine',
      year: 2019,
      volume: '74(4)',
      pages: 'e41-e46',
      doi: '10.1016/j.annemergmed.2019.07.015',
      url: 'https://www.acep.org/patient-care/clinical-policies/',
      accessedDate: '2025-02-26',
      shortCitation: 'ACEP 2019'
    },
    {
      id: 2,
      title: 'International Evidence-Based Recommendations for Point-of-Care Lung Ultrasound',
      authors: 'Volpicelli G, Elbarbary M, Blaivas M, et al.',
      source: 'Intensive Care Medicine',
      year: 2012,
      volume: '38(4)',
      pages: '577-91',
      doi: '10.1007/s00134-012-2513-4',
      shortCitation: 'Volpicelli et al. 2012'
    },
    {
      id: 3,
      title: 'Bedside Lung Ultrasound in the Critically Ill (BLUE) Protocol',
      authors: 'Lichtenstein DA, Mezière GA',
      source: 'Chest',
      year: 2008,
      volume: '134(1)',
      pages: '117-25',
      doi: '10.1378/chest.07-2800',
      shortCitation: 'Lichtenstein & Mezière 2008'
    },
    {
      id: 4,
      title: 'Accuracy of Transthoracic Sonography in Detection of Pneumothorax After Sonographically Guided Lung Biopsy',
      authors: 'Sistrom CL, Reiheld CT, Gay SB, et al.',
      source: 'Journal of Ultrasound in Medicine',
      year: 2004,
      volume: '23(4)',
      pages: '495-503',
      doi: '10.7863/jum.2004.23.4.495',
      shortCitation: 'Sistrom et al. 2004'
    },
    {
      id: 5,
      title: 'EFSUMB Guidelines and Recommendations on the Clinical Use of Lung Ultrasound',
      authors: 'Dietrich CF, Mathis G, Blaivas M, et al.',
      source: 'Ultraschall in der Medizin',
      year: 2012,
      volume: '33(1)',
      pages: '32-9',
      doi: '10.1055/s-0031-1286386',
      shortCitation: 'EFSUMB 2012'
    }
  ],
  root: {
    id: 'pocus-indication',
    title: 'POCUS for Pneumothorax',
    type: 'info',
    content: 'Point-of-care ultrasound (POCUS) is highly sensitive and specific for pneumothorax detection, especially in supine trauma patients. It can detect as little as 20-50mL of air. {{ref:1}} {{ref:2}}',
    metadata: {
      priority: 'high',
      tags: ['POCUS', 'Ultrasound']
    },
    children: [
      {
        id: 'clinical-suspicion',
        title: 'Clinical Suspicion Present?',
        type: 'decision',
        content: 'Consider POCUS for: chest trauma, sudden dyspnea, pleuritic chest pain, decreased breath sounds, subcutaneous emphysema, or post-procedure evaluation. {{ref:1}} {{ref:3}}',
        children: [
          {
            id: 'pocus-technique',
            title: 'POCUS Technique',
            type: 'diagnostic',
            content: 'Use high-frequency linear probe. Scan anterior chest at 2nd-4th intercostal spaces, mid-clavicular line. Compare bilateral lung sliding. Look for lung point if positive. {{ref:2}} {{ref:3}}',
            metadata: {
              tags: ['Technique', 'Probe']
            },
            children: [
              {
                id: 'normal-findings',
                title: 'Normal: Lung Sliding Present',
                type: 'success',
                content: 'Comet tail artifacts, lung sliding, and B-lines exclude pneumothorax at the scanned locations with high negative predictive value (>99%). {{ref:2}} {{ref:4}}',
                metadata: {
                  tags: ['Normal', 'NPV >99%']
                }
              },
              {
                id: 'stratosphere-sign',
                title: 'Abnormal: Stratosphere/M-Mode Sign',
                type: 'diagnostic',
                content: 'Absent lung sliding with stratosphere sign on M-mode (barcode sign) suggests pneumothorax. Check multiple rib spaces. {{ref:2}} {{ref:3}}',
                children: [
                  {
                    id: 'lung-point',
                    title: 'Lung Point Identified?',
                    type: 'decision',
                    content: 'The "lung point" is pathognomonic for pneumothorax - where lung sliding appears and disappears with respiration. Indicates edge of collapsed lung. {{ref:2}} {{ref:3}}',
                    children: [
                      {
                        id: 'confirmed-ptx',
                        title: 'Pneumothorax Confirmed',
                        type: 'warning',
                        content: 'POCUS has 100% specificity when lung point is identified. Size estimation: anterior chest only = small, extends to mid-axillary line = moderate, extends posteriorly = large. {{ref:2}} {{ref:4}}',
                        metadata: {
                          priority: 'high',
                          icd10: ['J93.0', 'J93.1', 'S27.0'],
                          tags: ['Confirmed', 'Specificity 100%']
                        },
                        children: [
                          {
                            id: 'tension-signs',
                            title: 'Signs of Tension?',
                            type: 'decision',
                            content: 'Tension pneumothorax: hypotension, tracheal deviation, distended neck veins, severe respiratory distress. DO NOT wait for imaging. {{ref:1}}',
                            metadata: {
                              priority: 'critical',
                              tags: ['Tension', 'Emergency']
                            },
                            children: [
                              {
                                id: 'needle-decompression',
                                title: 'Immediate Needle Decompression',
                                type: 'treatment',
                                content: '14-gauge angiocath, 2nd intercostal space, mid-clavicular line (or 4th-5th ICS anterior axillary line). Follow with chest tube placement per {{ref:1}}.',
                                metadata: {
                                  priority: 'critical',
                                  tags: ['Decompression', 'STAT']
                                }
                              }
                            ]
                          },
                          {
                            id: 'stable-ptx',
                            title: 'Stable Patient - Assess Size',
                            type: 'decision',
                            content: 'CXR or CT to assess size if patient stable. POCUS can estimate size based on lung point location. {{ref:1}} {{ref:5}}',
                            children: [
                              {
                                id: 'small-ptx',
                                title: 'Small Pneumothorax (<3cm apex)',
                                type: 'treatment',
                                content: 'Observation with high-flow O2 (if not COPD) and repeat imaging in 6 hours. May admit for observation per {{ref:1}}.',
                                metadata: {
                                  priority: 'medium',
                                  tags: ['Observation', 'O2']
                                }
                              },
                              {
                                id: 'large-ptx',
                                title: 'Large Pneumothorax (≥3cm or symptomatic)',
                                type: 'treatment',
                                content: 'Chest tube placement. Simple aspiration may be considered for primary spontaneous pneumothorax in select patients per {{ref:1}}.',
                                metadata: {
                                  priority: 'high',
                                  tags: ['Chest Tube']
                                }
                              }
                            ]
                          }
                        ]
                      },
                      {
                        id: 'no-lung-point',
                        title: 'No Lung Point - Massive PTX?',
                        type: 'decision',
                        content: 'If absent lung sliding throughout entire chest without lung point, may indicate massive pneumothorax with complete lung collapse. {{ref:2}} {{ref:3}}',
                        children: [
                          {
                            id: 'confirm-with-cxr',
                            title: 'Confirm with CXR',
                            type: 'diagnostic',
                            content: 'While POCUS is highly sensitive, chest X-ray can help confirm and assess for mediastinal shift. Consider CT if persistent concern. {{ref:1}}',
                            metadata: {
                              tags: ['Confirmatory']
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'trauma-specific',
            title: 'Trauma Patient - eFAST Protocol',
            type: 'info',
            content: 'In trauma, pneumothorax evaluation is part of the eFAST exam. Extended FAST includes lung sliding assessment. Supine position - air rises anteriorly. {{ref:2}} {{ref:5}}',
            metadata: {
              priority: 'high',
              tags: ['eFAST', 'Trauma']
            },
            children: [
              {
                id: 'occult-ptx',
                title: 'Occult Pneumothorax',
                type: 'info',
                content: 'POCUS detects pneumothorax missed on supine CXR in trauma (occult PTX). Up to 50% of pneumothoraces are occult on initial CXR but visible on CT. {{ref:1}} {{ref:4}}',
                children: [
                  {
                    id: 'occult-management',
                    title: 'Occult PTX Management',
                    type: 'treatment',
                    content: 'Observation may be appropriate for small, occult pneumothoraces in stable patients. Consider chest tube if positive pressure ventilation planned or enlarging per {{ref:1}}.',
                    metadata: {
                      priority: 'medium',
                      tags: ['Occult', 'Observation']
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

export default pneumothoraxConsult;
