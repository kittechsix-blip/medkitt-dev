/**
 * Basic Echo Views Consult Tree
 * Based on ASE Guidelines and ACEP Emergency Echocardiography Guidelines
 */

import type { ConsultTree } from '../types/consult-tree';

export const echoViewsConsult: ConsultTree = {
  id: 'basic-echo-views',
  title: 'Basic Emergency Echocardiography Views',
  description: 'Essential point-of-care cardiac ultrasound views for emergency and critical care physicians',
  category: 'Emergency Medicine / Critical Care Ultrasound',
  version: '1.0.0',
  lastUpdated: '2025-02-26',
  metadata: {
    author: 'MedKitt Clinical Team',
    reviewStatus: 'approved',
    audience: ['Emergency Medicine', 'Critical Care', 'Anesthesiology'],
    estimatedTime: 12
  },
  references: [
    {
      id: 1,
      title: 'Emergency Echocardiography',
      authors: 'American College of Emergency Physicians',
      source: 'ACEP Policy Statement',
      year: 2017,
      url: 'https://www.acep.org/patient-care/policy-statements/',
      accessedDate: '2025-02-26',
      shortCitation: 'ACEP 2017'
    },
    {
      id: 2,
      title: 'Recommendations for Cardiac Chamber Quantification by Echocardiography in Adults',
      authors: 'Lang RM, Badano LP, Mor-Avi V, et al.',
      source: 'Journal of the American Society of Echocardiography',
      year: 2015,
      volume: '28(1)',
      pages: '1-39',
      doi: '10.1016/j.echo.2014.10.003',
      shortCitation: 'ASE 2015'
    },
    {
      id: 3,
      title: 'Focused Cardiac Ultrasound in the Emergent Setting',
      authors: 'Moore CL, Rose GA, Tayal VS, et al.',
      source: 'Journal of the American Society of Echocardiography',
      year: 2002,
      volume: '15(7)',
      pages: '684-91',
      doi: '10.1067/mje.2002.124886',
      shortCitation: 'Moore et al. 2002'
    },
    {
      id: 4,
      title: 'International Consensus Statement on Training Standards for Advanced Critical Care Echocardiography',
      authors: 'Expert Round Table on Echocardiography in ICU',
      source: 'Intensive Care Medicine',
      year: 2014,
      volume: '40(5)',
      pages: '654-66',
      doi: '10.1007/s00134-014-3228-5',
      shortCitation: 'ICU Echo 2014'
    },
    {
      id: 5,
      title: 'Guidelines for the Echocardiographic Assessment of the Right Heart in Adults',
      authors: 'Rudski LG, Lai WW, Afilalo J, et al.',
      source: 'Journal of the American Society of Echocardiography',
      year: 2010,
      volume: '23(7)',
      pages: '685-713',
      doi: '10.1016/j.echo.2010.05.010',
      shortCitation: 'ASE Right Heart 2010'
    }
  ],
  root: {
    id: 'echo-overview',
    title: 'Basic Echo View Acquisition',
    type: 'info',
    content: 'Focused cardiac ultrasound (FoCUS) in emergency medicine typically includes 4-5 basic views to assess global cardiac function, pericardial effusion, and gross RV dilation. {{ref:1}} {{ref:3}}',
    metadata: {
      priority: 'medium',
      tags: ['FoCUS', 'POCUS']
    },
    children: [
      {
        id: 'parasternal-long',
        title: 'Parasternal Long Axis (PSLA)',
        type: 'diagnostic',
        content: 'Probe at left sternal border, 3rd-4th ICS, indicator toward right shoulder. Visualizes: LV, LA, MV, AV, RVOT, pericardium. Assess for effusion, LV function, wall motion. {{ref:2}} {{ref:3}}',
        metadata: {
          tags: ['PSLA', 'Basic View']
        },
        children: [
          {
            id: 'psla-findings',
            title: 'PSLA Key Findings',
            type: 'info',
            content: '1. Pericardial effusion (anechoic stripe)\n2. LV global function (EF estimation)\n3. RV size (should be <2/3 LV diameter)\n4. Aortic root and valve\n5. Wall motion abnormalities per {{ref:2}}',
            children: [
              {
                id: 'pericardial-effusion',
                title: 'Pericardial Effusion',
                type: 'decision',
                content: 'Echo-free space between epicardium and pericardium. Size: small (<10mm), moderate (10-20mm), large (>20mm). Look for RV diastolic collapse indicating tamponade. {{ref:4}}',
                metadata: {
                  priority: 'critical',
                  icd10: ['I31.3', 'I31.9'],
                  tags: ['Effusion', 'Tamponade']
                },
                children: [
                  {
                    id: 'tamponade-signs',
                    title: 'Tamponade Physiology?',
                    type: 'decision',
                    content: 'RA systolic collapse and RV diastolic collapse are specific for tamponade. IVC plethora (>20mm with <50% respiratory variation) supports diagnosis. {{ref:4}}',
                    metadata: {
                      priority: 'critical',
                      tags: ['Tamponade']
                    },
                    children: [
                      {
                        id: 'pericardiocentesis',
                        title: 'Urgent Pericardiocentesis',
                        type: 'treatment',
                        content: 'Pericardiocentesis indicated for hemodynamic compromise. Echo-guided approach preferred (apical or subcostal). Prepare for volume resuscitation per {{ref:4}}.',
                        metadata: {
                          priority: 'critical',
                          tags: ['Procedure', 'Emergency']
                        }
                      }
                    ]
                  }
                ]
              },
              {
                id: 'lv-function',
                title: 'LV Function Assessment',
                type: 'diagnostic',
                content: 'Qualitative EF estimation: Normal (>55%), mildly reduced (40-55%), moderately reduced (30-40%), severely reduced (<30%). Assess mitral valve E-point septal separation (EPSS). {{ref:2}}',
                metadata: {
                  priority: 'high',
                  tags: ['LV Function', 'EF']
                }
              }
            ]
          }
        ]
      },
      {
        id: 'parasternal-short',
        title: 'Parasternal Short Axis (PSSA)',
        type: 'diagnostic',
        content: 'From PSLA, rotate probe 90° clockwise, indicator toward left shoulder. Assess at multiple levels: aortic valve, mitral valve, papillary muscles, apex. {{ref:2}} {{ref:3}}',
        metadata: {
          tags: ['PSSA', 'Basic View']
        },
        children: [
          {
            id: 'pssa-levels',
            title: 'PSSA Anatomical Levels',
            type: 'info',
            content: '1. Base: "Mercedes-Benz" sign (aortic valve, LA, RA, RVOT)\n2. Mitral level: "Fish mouth" mitral valve\n3. Papillary muscles: Assess LV function, wall motion\n4. Apex: Look for apical WMA, thrombus per {{ref:2}}',
            children: [
              {
                id: 'circular-failure',
                title: 'CIRCUL Assessment',
                type: 'diagnostic',
                content: 'PSSA at papillary muscle level: CIRCUL (Circular) - assess for symmetric contraction. Asymmetric contraction suggests coronary territory infarction. {{ref:3}}',
                metadata: {
                  tags: ['Wall Motion', 'Ischemia']
                }
              }
            ]
          }
        ]
      },
      {
        id: 'apical-4chamber',
        title: 'Apical 4-Chamber (A4C)',
        type: 'diagnostic',
        content: 'Probe at cardiac apex (mid-clavicular, 5th-6th ICS), indicator toward left flank. Visualizes all 4 chambers, assess relative chamber sizes, global function. {{ref:2}} {{ref:5}}',
        metadata: {
          priority: 'high',
          tags: ['A4C', 'Essential View']
        },
        children: [
          {
            id: 'a4c-assessment',
            title: 'A4C Systematic Assessment',
            type: 'info',
            content: '1. Relative chamber sizes (RV:LV ratio should be <0.6:1)\n2. Global LV and RV function\n3. Pericardial effusion\n4. Valve function (color Doppler if available)\n5. IVC from this view per {{ref:2}} {{ref:5}}',
            children: [
              {
                id: 'rv-strain',
                title: 'RV Strain Signs',
                type: 'diagnostic',
                content: 'Acute RV strain (McConnell sign): RV free wall akinesis with apical sparing. Suggests massive PE. RV dilation with septal flattening (D-sign) indicates RV pressure overload. {{ref:5}}',
                metadata: {
                  priority: 'critical',
                  icd10: ['I26.09'],
                  tags: ['PE', 'RV Strain', 'McConnell']
                },
                children: [
                  {
                    id: 'massive-pe-echo',
                    title: 'Echo Findings of Massive PE',
                    type: 'warning',
                    content: 'RV dilation (RV:LV >1:1), septal flattening/D-sign, McConnell sign, IVC plethora. These findings support massive/submassive PE and guide thrombolysis decisions per {{ref:5}}.',
                    metadata: {
                      priority: 'critical',
                      tags: ['Massive PE']
                    }
                  }
                ]
              },
              {
                id: 'lv-thrombus',
                title: 'LV Thrombus',
                type: 'diagnostic',
                content: 'Echo-bright mass in LV apex, often with underlying wall motion abnormality. Associated with anterior MI. Anticoagulation indicated per {{ref:2}}.',
                metadata: {
                  priority: 'high',
                  icd10: ['I51.3'],
                  tags: ['Thrombus', 'Post-MI']
                }
              }
            ]
          }
        ]
      },
      {
        id: 'subcostal',
        title: 'Subcostal 4-Chamber (Subxiphoid)',
        type: 'diagnostic',
        content: 'Probe below xiphoid, flat against abdomen, indicator toward patient left. Useful when parasternal/apical windows poor (COPD, obesity). Essential for pericardial effusion and IVC. {{ref:1}} {{ref:3}}',
        metadata: {
          priority: 'high',
          tags: ['Subcostal', 'Window']
        },
        children: [
          {
            id: 'subcostal-effusion',
            title: 'Subcostal for Effusion',
            type: 'diagnostic',
            content: 'Often best view for posterior pericardial effusion. Look for echo-free space between heart and liver. Assess for RA/RV diastolic collapse indicating tamponade. {{ref:4}}',
            children: [
              {
                id: 'ivc-assessment',
                title: 'IVC Assessment',
                type: 'diagnostic',
                content: 'From subcostal, rotate probe to visualize IVC entering RA. Measure diameter and assess respiratory variation. <50% collapse with sniff suggests elevated CVP. {{ref:4}}',
                metadata: {
                  priority: 'medium',
                  tags: ['IVC', 'Volume Status']
                },
                children: [
                  {
                    id: 'ivc-interpretation',
                    title: 'IVC Interpretation',
                    type: 'info',
                    content: 'IVC <15mm with >50% collapse: CVP 0-5 mmHg (volume responsive). IVC >20mm with <50% collapse: CVP 10-20 mmHg (elevated). Useful for volume assessment per {{ref:4}}.',
                    metadata: {
                      tags: ['Volume', 'CVP']
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'echo-protocol',
        title: 'Emergency Echo Protocol',
        type: 'info',
        content: 'Systematic approach: 1) Assess for pericardial effusion, 2) Assess global LV function, 3) Assess RV size/strain, 4) Assess for IVC dilation per {{ref:1}} {{ref:3}}.',
        children: [
          {
            id: 'clinical-integrate',
            title: 'Integrate with Clinical Picture',
            type: 'info',
            content: 'Echo findings must be correlated with clinical presentation. FoCUS is a screening tool - formal echo recommended for complex cases or when results change management per {{ref:1}}.',
            metadata: {
              tags: ['Integration', 'Limitations']
            }
          }
        ]
      }
    ]
  }
};

export default echoViewsConsult;
