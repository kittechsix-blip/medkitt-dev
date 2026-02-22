# Chest Tube Build Spec — Complete Reference

> **Purpose:** Self-contained specification for building the Pneumothorax Management & Chest Tube
> decision tree in MedKitt. A fresh Claude session reads this file + the existing codebase patterns
> and can build the entire tree without any other context.
>
> **Tone:** Standard clinical reference language (matching existing MedKitt consults).
> **Cross-listed in:** Trauma/Surgery + Procedures
> **Tree ID:** `chest-tube` | **Entry node:** `ctube-start` | **Node prefix:** `ctube-`

---

## Images (4 files)

Copy from Desktop to `docs/images/chest-tube/`:

| Source | Target filename | Used in node | Description |
|--------|----------------|--------------|-------------|
| `~/Desktop/Zone of Safety.png` | `triangle-of-safety.png` | `ctube-anatomy` | Triangle of safety anatomy — lateral chest wall with labeled borders (pec major, lat dorsi, 5th ICS, axilla) |
| `~/Desktop/needle over rib.png` | `needle-over-rib.png` | `ctube-anatomy` | Cross-section showing needle trajectory over superior rib edge, NV bundle at inferior edge |
| `~/Desktop/pleural drainage.png` | `three-bottle-system.png` | `ctube-drainage` | 3-bottle drainage system: collection, water seal (2cm), suction regulation (20cm) |
| `~/Desktop/properly placed chest tube.png` | `proper-placement-cxr.png` | `ctube-confirm` | Side-by-side CXR: plain and annotated showing tube tip, chest drain path, lung edge, pneumothorax |

---

## Evidence Citations (22 references)

```
1.  Brown SGA, Ball EL, Perrin K, et al. Conservative Versus Interventional Treatment for Spontaneous Pneumothorax. N Engl J Med. 2020;382(5):405-415. PMID: 31995686.
2.  Inaba K, Lustenberger T, Recinos G, et al. Does Size Matter? A Prospective Analysis of 28-32 Versus 36-40 French Chest Tube Size in Trauma. J Trauma. 2012;72(2):422-427. doi: 10.1016/j.chest.2017.10.015.
3.  Skarda DE, Chipman JG, Goss SL, et al. Observation of Traumatic Pneumothorax <35 mm on CT Scan. PMID: 35125448.
4.  Kirkpatrick AW, Rizoli S, Ouellet JF, et al. OPTICC: Occult Pneumothoraces in Critical Care. Ann Surg. 2013. PMID: 33641940.
5.  PCAT Trial. Prospective Comparison of Pigtail Catheter Versus Large-Bore Chest Tube for Traumatic Hemothorax. Injury 2015;46:1743.
6.  Scarci M, et al. Chest Tube Management. J Thorac Cardiovasc Surg. 2017;153(6):e129.
7.  Rahman NM, Maskell NA, Davies CW, et al. The Relationship Between Chest Tube Size and Clinical Outcome in Pleural Infection. Chest. 2010. doi: 10.1378/chest.09-1044.
8.  Davies HE, Davies RJ, Davies CW; BTS Pleural Disease Guideline Group. Management of Pleural Infection in Adults. Thorax. 2010;65(suppl 2):ii41-i53.
9.  Bing F, Fitzgerald M, Olaussen A, et al. Identifying a Safe Site for Intercostal Catheter Insertion Using the Mid-Arm Point (MAP). 10.5339/jemtac.2017.3.
10. Baumann MH, Patel PB, Englen T, et al. Chest Tube Insertion and Anticoagulation. Chest. 2021. doi: 10.1016/j.chest.2021.04.036.
11. Inaba K, et al. Chest Tube Resting Location and Outcomes. J Trauma. 2015;78(2):386.
12. Menger R, et al. AIS as the Only Significant Factor in Chest Tube Complications. Injury. 2012;43(1):46.
13. Benns MV, et al. Thoracostomy Tube Function Not Trajectory Dictates Reintervention. PMID: 27884332.
14. Eren S, et al. Autotransfusion of Hemothorax Blood in Trauma. Am J Surg. 2011;202(6):817-822.
15. Martino K, Merritt S, Boyakye K, et al. Prospective Randomized Trial of Thoracostomy Removal at End-Expiration vs Inspiration. J Am Coll Surg. 2001. (J Trauma. 2001;50:674-677.)
16. Pacanowski JP, et al. Chest Tube Water Seal CXR 3-Hour Rule. J Trauma. 2005;59(1):92-95.
17. Freeman JJ, Asfaw SH, Vatsaas CJ, et al. Antibiotic Prophylaxis for Tube Thoracostomy Placement in Trauma: EAST Practice Management Guideline. Trauma Surg Acute Care Open. 2022;7.
18. Laan DV, et al. Chest Tube Angle of Insertion Associated with Complications. J Trauma. 2016;81(2):366.
19. Ernst A, et al. MAC Technique for Chest Tube Kinking. Acad Emerg Med. 2006;13(1):114.
20. Hallifax RJ, McKeown E, Sivakumar P, et al. Ambulatory Management of Primary Spontaneous Pneumothorax. Lancet. 2020;396(10243):39-49.
21. Coccolini F, Cremonini C, Moore EE, et al. Thoracic Trauma WSES-AAST Guidelines. World J Emerg Surg. 2025;20(1):78.
22. Anderson D, Chen SA, Godoy LA, Brown LM, Cooke DT. Comprehensive Review of Chest Tube Management. JAMA Surg. 2022;157(3):269-274.
```

---

## Module Labels

```typescript
['Indications', 'Preparation', 'Insertion', 'Management']
```

---

## Node Specification

### MODULE 1: INDICATIONS (14 nodes)

#### `ctube-start` — info, M1
**Title:** Pneumothorax Management & Chest Tube
**Body:** This consult covers pneumothorax management and chest tube thoracostomy — from indications through insertion technique and post-procedure care.

Chest tubes were once a bedrock procedure for EM, resuscitation, and critical care. They are becoming increasingly unnecessary as evidence supports conservative management in many scenarios previously considered automatic indications.

KEY EVIDENCE SHIFTING PRACTICE
- Traumatic PTX: observation safe for <35 mm on CT in stable patients not on positive pressure ventilation [3]
- Spontaneous PTX: conservative management non-inferior to intervention for moderate PSP (Brown et al, NEJM 2020) [1]
- Occult PTX on ventilator: selective observation supported (OPTICC trial) [4]
- Hemothorax: pigtail catheters comparable to large-bore in select cases (PCAT trial) [5]
- Empyema: small-bore tubes have similar outcomes to large-bore [7]

**Citations:** [1, 3, 4, 5, 7, 22]
**Next:** `ctube-indication`

---

#### `ctube-indication` — question, M1
**Title:** Primary Indication
**Body:** What is the primary indication?
**Options:**
- "Pneumothorax" | next: `ctube-ptx-type`
- "Hemothorax" | next: `ctube-hemothorax` | urgency: urgent
- "Empyema / Pleural infection" | next: `ctube-empyema`

---

#### `ctube-ptx-type` — question, M1
**Title:** Pneumothorax — Classification
**Body:** Classify the pneumothorax. This determines the management pathway.
**Options:**
- "Tension pneumothorax" | "Hemodynamic compromise with signs of mediastinal shift" | next: `ctube-tension` | urgency: critical
- "Traumatic" | "Blunt or penetrating chest trauma, iatrogenic" | next: `ctube-traumatic`
- "Primary spontaneous (PSP)" | "No known lung disease, typically young, tall, thin, smoker" | next: `ctube-psp`
- "Secondary spontaneous (SSP)" | "Underlying lung disease: COPD, CF, ILD, malignancy" | next: `ctube-ssp` | urgency: urgent

---

#### `ctube-tension` — info, M1
**Title:** Tension Pneumothorax — Emergent Decompression
**Body:** Clinical diagnosis — do NOT delay for imaging.

Signs: hypotension, tachycardia, JVD, tracheal deviation (late sign), absent breath sounds, decreased SpO2, obstructive shock.

NEEDLE DECOMPRESSION (temporizing)
- 14-16 gauge angiocatheter
- 2nd intercostal space, midclavicular line (traditional) OR 4th-5th intercostal space, anterior axillary line (preferred — thinner chest wall, higher success rate)
- Insert perpendicular over superior rib edge
- Rush of air confirms tension
- Leave catheter in place

FINGER THORACOSTOMY (more reliable)
- Same site as chest tube (5th ICS, mid-axillary line, triangle of safety)
- Blunt dissection into pleural space with finger sweep
- Provides more reliable decompression than needle

Proceed immediately to definitive chest tube placement.

**Citations:** [21, 22]
**Next:** `ctube-anatomy`

---

#### `ctube-traumatic` — question, M1
**Title:** Traumatic Pneumothorax — Assessment
**Body:** Evidence supports observation for small traumatic pneumothoraces in stable patients. Can observe <35 mm on CT scan in patients not requiring positive pressure ventilation [3].

For occult pneumothorax (visible on CT but not CXR) in mechanically ventilated patients, the OPTICC trial demonstrated that selective observation is safe, though close monitoring is required [4].

**Citations:** [2, 3, 4, 21]
**Options:**
- "<35 mm on CT, stable, no PPV" | "Asymptomatic or minimal symptoms, not mechanically ventilated" | next: `ctube-traumatic-observe`
- "≥35 mm, symptomatic, or hemopneumothorax" | "Large pneumothorax, significant symptoms, or associated hemothorax" | next: `ctube-anatomy` | urgency: urgent
- "On positive pressure ventilation" | "Mechanically ventilated or planned PPV" | next: `ctube-ventilator` | urgency: urgent

---

#### `ctube-traumatic-observe` — result, M1
**Title:** Traumatic PTX — Observation
**Body:** Small traumatic pneumothorax (<35 mm on CT) in a stable, non-ventilated patient. Observation is appropriate per current evidence.
**Recommendation:** Admit for observation. Repeat imaging at 6 hours and prior to discharge. Supplemental O2 may accelerate reabsorption. Convert to chest tube if: progression on imaging, worsening symptoms, or new requirement for positive pressure ventilation.
**Confidence:** recommended
**Citations:** [3, 21]

---

#### `ctube-ventilator` — question, M1
**Title:** Pneumothorax on Mechanical Ventilation
**Body:** Positive pressure ventilation increases risk of tension physiology. The OPTICC trial supports selective observation of small occult pneumothoraces even on ventilator, but close monitoring is essential.

Consider: size of pneumothorax, ventilator settings (high PEEP increases risk), clinical trajectory, ability to monitor closely.
**Citations:** [4, 21]
**Options:**
- "Small occult, stable, close monitoring available" | "CT-only finding, low ventilator pressures, ICU monitoring" | next: `ctube-ventilator-observe`
- "Large, progressing, or high ventilator pressures" | "Clinical concern for expansion or tension" | next: `ctube-anatomy` | urgency: critical

---

#### `ctube-ventilator-observe` — result, M1
**Title:** Occult PTX on Ventilator — Observation
**Body:** Selective observation of occult pneumothorax on ventilator, supported by OPTICC trial evidence.
**Recommendation:** Close ICU monitoring. Serial imaging. Low threshold for chest tube if any progression. Communicate with respiratory therapy. Avoid increases in PEEP if possible. Immediate intervention if signs of tension.
**Confidence:** consider
**Citations:** [4]

---

#### `ctube-psp` — question, M1
**Title:** Primary Spontaneous Pneumothorax
**Body:** Conservative management is increasingly favored for PSP.

KEY EVIDENCE
- Brown et al (NEJM 2020): Conservative management non-inferior to interventional treatment for moderate-sized first-episode PSP. At 8 weeks, 98.5% resolution without intervention [1].
- BTS/ERS guidelines support aspiration as first-line for symptomatic PSP before chest tube [20].
- Ambulatory management with Heimlich valve feasible for selected patients [20].

**Citations:** [1, 20, 22]
**Options:**
- "Small, minimal symptoms" | "Clinically stable, mild or no dyspnea" | next: `ctube-psp-conservative`
- "Moderate or symptomatic" | "Significant dyspnea, moderate size" | next: `ctube-aspiration`
- "Large, recurrent, or failed aspiration" | "≥2 cm, second episode, or aspiration already failed" | next: `ctube-anatomy` | urgency: urgent

---

#### `ctube-psp-conservative` — result, M1
**Title:** PSP — Conservative Management
**Body:** Small primary spontaneous pneumothorax with minimal symptoms. Conservative approach supported by Brown et al (NEJM 2020).
**Recommendation:** Observe 3-6 hours with repeat CXR. Supplemental O2 accelerates reabsorption (rate increases from ~1.25%/day to ~4%/day with high-flow O2). If stable or improving: discharge with outpatient follow-up in 2-4 weeks. No air travel or diving until confirmed resolution. Smoking cessation counseling (strongest modifiable risk factor). Return immediately for worsening dyspnea. Recurrence rate: ~30% at 1 year.
**Confidence:** recommended
**Citations:** [1, 20]

---

#### `ctube-aspiration` — info, M1
**Title:** Needle Aspiration
**Body:** NEEDLE ASPIRATION — first-line for symptomatic PSP per BTS/ERS guidelines.

PROCEDURE
1. Position: sitting upright or supine with head elevated 45°
2. Site: 2nd intercostal space, midclavicular line (preferred) or safe triangle
3. Prep, drape, local anesthesia with 1% lidocaine
4. Insert 16-18 gauge IV catheter over superior rib edge
5. Connect to 3-way stopcock + 60 mL syringe
6. Aspirate until resistance (lung re-expansion) or 2.5 L aspirated
7. Post-aspiration CXR

Success = lung re-expansion + symptom improvement.
**Citations:** [1, 20]
**Next:** `ctube-aspiration-result`

---

#### `ctube-aspiration-result` — question, M1
**Title:** Aspiration Response
**Body:** Did needle aspiration result in lung re-expansion on post-aspiration CXR?
**Options:**
- "Yes — lung re-expanded" | "Successful aspiration, symptoms improved" | next: `ctube-aspiration-success`
- "No — failed aspiration" | "Persistent pneumothorax or >2.5 L aspirated without resolution" | next: `ctube-anatomy` | urgency: urgent

---

#### `ctube-aspiration-success` — result, M1
**Title:** Aspiration Successful
**Body:** Needle aspiration successful with lung re-expansion on CXR.
**Recommendation:** Observe 4-6 hours post-aspiration. Repeat CXR before discharge. If stable: discharge with 2-4 week follow-up. No air travel or diving until confirmed resolution. Smoking cessation (strongest modifiable risk factor). Recurrence: ~30% at 1 year. After 2nd ipsilateral episode, strongly recommend surgical pleurodesis (VATS).
**Confidence:** definitive
**Citations:** [1, 20]

---

#### `ctube-ssp` — question, M1
**Title:** Secondary Spontaneous Pneumothorax
**Body:** SSP in patients with underlying lung disease (COPD, CF, ILD, malignancy, TB). Managed more aggressively than PSP due to limited pulmonary reserve. BTS: chest tube recommended for all SSP >1 cm or symptomatic. Even small SSP can be clinically significant with underlying disease.
**Citations:** [8, 22]
**Options:**
- "Very small (<1 cm), minimal symptoms" | "Tiny SSP in patient with adequate reserve" | next: `ctube-ssp-observe`
- "≥1 cm or symptomatic" | "Symptomatic or significant size with underlying disease" | next: `ctube-anatomy` | urgency: urgent

---

#### `ctube-ssp-observe` — result, M1
**Title:** SSP — Observation with Caution
**Body:** Very small (<1 cm) SSP with minimal symptoms. Observation may be appropriate but requires close inpatient monitoring due to limited pulmonary reserve.
**Recommendation:** Admit for observation with supplemental O2. Serial CXR at 6 and 24 hours. Low threshold for chest tube if any worsening. Pulmonology consult for underlying disease management. Consider pleurodesis discussion for recurrence prevention.
**Confidence:** consider
**Citations:** [8, 22]

---

#### `ctube-hemothorax` — info, M1
**Title:** Hemothorax
**Body:** Chest tube indicated for hemothorax. The PCAT trial demonstrated pigtail catheters may be comparable to large-bore tubes in select cases, but large-bore (28-36 Fr) remains standard for traumatic hemothorax to ensure adequate drainage of blood and clot.

Tube size: 28 Fr minimum for hemothorax. 28-36 Fr recommended.

**Citations:** [5, 21, 22]
**Next:** `ctube-anatomy`

---

#### `ctube-empyema` — info, M1
**Title:** Empyema / Pleural Infection
**Body:** Chest tube indicated for empyema/parapneumonic effusion requiring drainage. Small-bore tubes (10-14 Fr) have similar clinical outcomes to large-bore for pleural infection drainage (Rahman et al). BTS Pleural Disease Guideline 2010 supports image-guided small-bore catheter as first-line.

If loculated: consider intrapleural fibrinolytics (tPA + DNase) or VATS.

**Citations:** [6, 7, 8]
**Next:** `ctube-anatomy`

---

### MODULE 2: PREPARATION (8 nodes)

#### `ctube-anatomy` — info, M2
**Title:** Insertion Site — Triangle of Safety
**Body:** THE TRIANGLE OF SAFETY
The safe zone for chest tube insertion is bounded by:
- Anterior: lateral edge of pectoralis major
- Posterior: anterior border of latissimus dorsi
- Inferior: line of the 5th intercostal space (nipple level in males)
- Superior: base of the axilla

INSERTION SITE
4th or 5th intercostal space, mid-axillary line (within the safe triangle).

MID-ARM POINT (MAP) TECHNIQUE
An alternative landmark: the point on the chest wall at the level of the mid-arm when the arm is adducted identifies a safe insertion site within the triangle of safety [9].

NEUROVASCULAR BUNDLE
The intercostal neurovascular bundle classically runs along the inferior rib edge — but anatomic studies show it can run aberrantly within the interspace. Always insert over the SUPERIOR edge of the rib to minimize risk, but be aware the bundle position is variable.

AVOID
- Below 6th ICS (risk of intra-abdominal placement — liver on right, spleen on left)
- Posterior to mid-axillary line (latissimus dorsi makes dissection difficult)
- Too medial (internal mammary artery)

ANTICOAGULATION
Chest tube insertion is probably safe in anticoagulated patients [10].

**Citations:** [9, 10, 21, 22]
**Images:**
- `images/chest-tube/triangle-of-safety.png` | alt: "Triangle of safety anatomy showing borders: pectoralis major anteriorly, latissimus dorsi posteriorly, 5th intercostal space inferiorly, axilla superiorly" | caption: "Triangle of safety: bordered by pectoralis major, latissimus dorsi, 5th ICS, and axilla."
- `images/chest-tube/needle-over-rib.png` | alt: "Cross-sectional anatomy at the rib showing needle insertion trajectory over superior rib edge with neurovascular bundle at inferior edge" | caption: "Insert over the superior rib edge. Neurovascular bundle runs along the inferior edge."
**Next:** `ctube-tube-size`

---

#### `ctube-tube-size` — question, M2
**Title:** Tube Size Selection
**Body:** Select tube size based on indication.

PNEUMOTHORAX (air only):
- Small-bore pigtail catheter: 10-14 Fr (Seldinger technique)
- Standard: 20-24 Fr

HEMOTHORAX / HEMOPNEUMOTHORAX:
- Large-bore: 28-36 Fr (28 Fr minimum for blood drainage)

EMPYEMA:
- Small-bore (10-14 Fr) with image guidance — similar outcomes to large-bore [7]

Small-bore pigtail catheters have equivalent outcomes to large-bore for simple pneumothorax with less pain and fewer complications.

**Citations:** [5, 7, 22]
**Options:**
- "Small-bore pigtail (10-14 Fr)" | "Simple pneumothorax — Seldinger technique" | next: `ctube-pigtail`
- "Standard (20-28 Fr)" | "Pneumothorax with uncertain hemothorax or provider preference" | next: `ctube-equipment`
- "Large-bore (28-36 Fr)" | "Hemothorax, hemopneumothorax, or empyema with thick fluid" | next: `ctube-equipment` | urgency: urgent

---

#### `ctube-pigtail` — info, M2
**Title:** Pigtail Catheter — Seldinger Technique
**Body:** Small-bore pigtail catheters (10-14 Fr) placed via modified Seldinger technique (e.g., Thal-Quik).

ADVANTAGES
- Less pain on insertion and while indwelling
- Equivalent efficacy for simple pneumothorax
- Faster insertion
- Lower complication rate

PROCEDURE
1. Position, prep, drape (same landmarks as standard)
2. Local anesthesia to skin, subcutaneous tissue, periosteum, parietal pleura
3. Small skin incision (just enough for catheter)
4. Insert introducing needle with syringe attached
5. Aspirate as you advance — rush of air confirms pleural space entry
6. Advance guidewire through needle, remove needle
7. Dilate tract over guidewire
8. Thread pigtail catheter over guidewire into pleural space
9. Remove guidewire, confirm pigtail is curled
10. Connect to drainage system (water seal or Heimlich valve)
11. Secure with suture and occlusive dressing
12. Confirm placement with CXR

NOT appropriate for: hemothorax, empyema with thick fluid, or bronchopleural fistula.
**Citations:** [22]
**Next:** `ctube-post-cxr`

---

#### `ctube-equipment` — info, M2
**Title:** Equipment
**Body:** EQUIPMENT FOR TUBE THORACOSTOMY

Set up on a large surface — not a mayo stand.

STERILE SUPPLIES
- Chest tube (selected size)
- Scalpel (#10 blade)
- Large curved Kelly clamp
- Needle driver and pickups with teeth
- Size 2 Ethibond suture or 0-silk
- Sterile chlorhexidine prep and drapes
- Sterile gloves + gown

ANESTHESIA
- 30 mL bottle of 2% lidocaine with epinephrine
- 20 mL syringe with draw needle
- 22-gauge 1.5" needle for injection

DRAINAGE
- Pleur-Evac or equivalent closed drainage system (prepared and ready)

OTHER
- Soft restraint (for arm positioning)
- Roll of 2-3" cloth or silk tape
- 2 medium Tegaderms
- Multiple 4x4 gauze pads

**Citations:** [22]
**Next:** `ctube-positioning`

---

#### `ctube-positioning` — info, M2
**Title:** Patient Positioning
**Body:** POSITIONING
- Bring patient to the edge of the bed (ipsilateral side)
- Incision site near the level of the xiphoid process
- Ipsilateral arm up: restrain or have patient place hand behind head (exposes axilla and triangle of safety)
- Sit up to 45° if possible (supine acceptable for unstable patients)

PREP AND DRAPE
- Wide prep with chlorhexidine
- Drape to maintain visibility of landmarks after sterile field is established — confirm you can still see your landmarks after draping
- Account for breast tissue in female patients — it may shift the apparent landmarks

**Citations:** [22]
**Next:** `ctube-anesthesia`

---

#### `ctube-anesthesia` — info, M2
**Title:** Anesthesia
**Body:** LOCAL ANESTHESIA — FIELD BLOCK
Inadequate anesthesia is the most common reason for procedural difficulty.

TECHNIQUE
1. Skin wheal: 22-gauge needle, raise a wheal at the incision site with 2% lidocaine with epinephrine
2. Subcutaneous tissue: infiltrate generously along the planned dissection tract
3. Intercostal muscles: fan lidocaine through the muscle layers
4. Periosteum: anesthetize the rib periosteum above AND below — this is extremely painful if missed
5. Parietal pleura: advance needle over the superior rib edge while aspirating. When air is aspirated (confirming pleural space), inject 5-10 mL along the parietal pleura — this is the most sensitive layer

Total: up to 30 mL of 2% lidocaine with epinephrine (max 7 mg/kg with epi).

PROCEDURAL SEDATION
Consider sedation (ketamine, propofol, etomidate) for awake patients if clinical situation allows.
**Citations:** [22]
**Next:** `ctube-ppe`

---

### MODULE 3: INSERTION (9 nodes)

#### `ctube-ppe` — info, M3
**Title:** PPE & Mental Preparation
**Body:** PPE
- Double glove
- Face and eye protection
- Hat and gown if available (always for non-emergent cases)

MENTAL PREPARATION
- Pause. Breathe.
- Visualize each step before beginning. If you cannot visualize it, review the steps before proceeding.
- This is a controlled procedure — deliberate technique prevents complications.

**Next:** `ctube-cut`

---

#### `ctube-cut` — info, M3
**Title:** The Incision
**Body:** SCALPEL TECHNIQUE
- Hold scalpel like a pencil for control
- Make a 3-4 cm transverse incision through the skin

KEY POINTS
- Make the skin incision ONE intercostal space BELOW the intended pleural entry point. This creates a subcutaneous tunnel that reduces air leak after tube removal.
- In female patients, account for breast tissue — it may shift the apparent intercostal space.
- In obese patients, a longer incision may be needed to reach the chest wall. Anticipate a deeper dissection tract.

**Citations:** [18, 22]
**Next:** `ctube-dissection`

---

#### `ctube-dissection` — info, M3
**Title:** Blunt Dissection
**Body:** TECHNIQUE: PUSH IN, SPREAD, CHECK

Using the curved Kelly clamp:
1. Dissect through subcutaneous tissue toward the superior edge of the rib ONE space above the skin incision
2. Advance the CLOSED clamp through the intercostal muscles directly over the top of the rib
3. Stay ABOVE the rib to avoid the neurovascular bundle (though it runs variably)
4. Push through the parietal pleura with controlled force — you will feel a distinct pop
5. Open the clamp widely to create the tract
6. Rush of air or fluid confirms entry into the pleural space

**Citations:** [22]
**Next:** `ctube-finger-sweep`

---

#### `ctube-finger-sweep` — info, M3
**Title:** Finger Sweep & Safety Check
**Body:** FINGER SWEEP
Insert a gloved finger through the tract into the pleural space. Sweep gently to confirm:
1. You are in the pleural space (not subcutaneous, not subdiaphragmatic)
2. No adhesions that would impede tube passage
3. No organs palpable (lung, diaphragm, liver/spleen)

RIB FRACTURES = DANGER
In trauma patients with rib fractures at the insertion site, fractured rib edges can lacerate the finger or impede safe dissection. Exercise extreme caution. Consider an adjacent interspace if needed.

**Citations:** [22]
**Next:** `ctube-tube-insert`

---

#### `ctube-tube-insert` — info, M3
**Title:** Tube Insertion
**Body:** DO NOT USE TROCARS — EVER.
Trocar insertion has an unacceptable rate of visceral injury. All chest tubes should be placed by blunt dissection.

TUBE PREPARATION
1. Place two clamps on the tube
2. Cut the distal end at a slant (if not pre-cut)

INSERTION
- Clamp the tube tip with Kelly clamp OR guide with finger (with or without finger guidance — both are acceptable)
- Direct the tube POSTERIORLY and APICALLY for pneumothorax (air rises anteriorly)
- Direct POSTERIORLY and INFERIORLY for hemothorax (fluid layers dependently)
- Advance until the last hole (proximal/sentinel hole) is well inside the chest wall
- Chest tube depth is marked from the proximal hole — note insertion depth at the skin

ANGLE MATTERS
Increased angle of insertion (perpendicular to chest wall rather than tangential) is associated with higher complication rates [18]. Aim for a tangential trajectory along the chest wall.

BOUGIE OR TUBE EXCHANGER
Can be used to guide tube insertion through a difficult tract.

**Citations:** [18, 22]
**Next:** `ctube-confirm`

---

#### `ctube-confirm` — info, M3
**Title:** Confirm Placement & Check for Kinking
**Body:** CHECK PLEURAL ENTRY
- Re-insert finger alongside tube to confirm the tube is in the pleural space

MAC SPIN TEST FOR KINKING
Grasp the external portion of the tube and rotate clockwise 180°, then release [19]:
- If the tube spins back to its previous position → the tube is kinked (reposition)
- If it stays in the new position → the tube is NOT kinked (proceed)

INITIAL SIGNS OF FUNCTION
- Respiratory swing (tidaling) in the tubing
- Fogging of the tube with respiration
- Air or fluid drainage

**Citations:** [19]
**Images:**
- `images/chest-tube/proper-placement-cxr.png` | alt: "Side-by-side chest radiographs showing properly placed chest tube with tube tip, chest drain path, and lung edge annotated" | caption: "Properly placed chest tube: tube tip directed apically, all drainage holes within the pleural space, lung edge visible."
**Next:** `ctube-secure`

---

#### `ctube-secure` — info, M3
**Title:** Securing & Connecting Drainage
**Body:** SUTURE
- Use a large horizontal mattress suture (size 2 Ethibond or 0-silk) through the skin adjacent to the tube
- Tie securely, leaving long tails
- Wrap the tails around the tube and tie again (Roman sandal / mesentery technique)
- Place a separate drain stitch (stay suture) for wound closure after tube removal

DRESSING
- Petroleum gauze around the tube at the skin entry (air-tight seal)
- Cover with 4x4 gauze pads
- Secure with 2-3" silk/cloth tape
- Apply Tegaderms over the dressing edges
- Write date, time, and insertion depth on the dressing with marker

CONNECT DRAINAGE
- Connect to Pleur-Evac or equivalent closed drainage system
- Ensure all connections are tight
- Verify air and/or fluid drainage
- Never clamp a functioning chest tube without explicit attending instruction

**Citations:** [22]
**Next:** `ctube-post-cxr`

---

### MODULE 4: MANAGEMENT (10 nodes)

#### `ctube-post-cxr` — question, M4
**Title:** Post-Insertion Chest Radiograph
**Body:** Obtain a STAT portable CXR after chest tube placement to confirm:
- Tube position (all holes intrathoracic, tip directed appropriately)
- Lung re-expansion
- No malposition, kinking, or new complication

Tube resting location (anteroapical vs posterolateral) does NOT matter — function, not trajectory, dictates need for reintervention [11, 13]. AIS (injury severity) is the only significant independent factor in chest tube complications [12].
**Citations:** [11, 12, 13, 22]
**Images:**
(post-CXR image already shown in ctube-confirm)
**Options:**
- "Good position, lung re-expanding" | "Tube appropriately positioned, drainage functioning" | next: `ctube-drainage`
- "Malposition or persistent pneumothorax" | "Tube kinked, sentinel hole outside chest, or lung not expanding" | next: `ctube-malposition`
- "Massive hemothorax output" | ">1500 mL initial or >200 mL/hr ongoing" | next: `ctube-massive-hemothorax` | urgency: critical

---

#### `ctube-malposition` — result, M4
**Title:** Tube Malposition
**Body:** Chest tube malposition on CXR.

Common issues:
- Tube advanced too far (tip in mediastinum or kinked)
- Sentinel hole outside chest wall (subcutaneous air leak)
- Tube in the fissure (may still function)
- Too shallow insertion

IMPORTANT: Never advance a tube that has already been placed — risk of introducing infection. A tube that is too deep can be pulled back under sterile technique. If the tube is too shallow, place a new tube rather than pushing the existing one in.
**Recommendation:** Options: (1) Pull back under sterile technique if too deep, (2) Place a second tube, (3) Consult thoracic surgery. Repeat CXR after any adjustment.
**Confidence:** consider
**Citations:** [11, 13, 22]

---

#### `ctube-massive-hemothorax` — result, M4
**Title:** Massive Hemothorax — Surgical Indication
**Body:** MASSIVE HEMOTHORAX

Criteria for emergent thoracotomy:
- Initial drainage >1500 mL, OR
- >200 mL/hr for 2-4 consecutive hours

AUTOTRANSFUSION
Blood from the chest cavity lacks clotting factors and has a slightly lower hematocrit than venous blood, but autotransfusion of hemothorax blood is safe and effective in trauma [14].
**Recommendation:** Activate massive transfusion protocol. Emergent thoracic surgery consultation. Continue chest tube drainage. Autotransfuse via autotransfusion system if available. This is a surgical emergency.
**Confidence:** definitive
**Citations:** [14, 21]

---

#### `ctube-drainage` — info, M4
**Title:** Drainage System Management
**Body:** CHEST TUBE DRAINAGE SYSTEMS — 3-BOTTLE CONCEPT

All modern drainage units (Pleur-Evac, Atrium) are based on the classic 3-bottle system:
1. Collection chamber: measures fluid output
2. Water seal chamber: one-way valve — allows air out, prevents re-entry. Fluid level at 2 cm.
3. Suction regulation chamber: controls negative pressure (typically -20 cmH2O when used)

RECOMMENDED SYSTEM
Getinge Atrium Express — features negative pressure relief valve, no evaporation of water seal/suction fluid, and is safe and functional if knocked over.

MONITORING
Mark the collection chamber with date, time, and output level using a marker directly on the device at each assessment.

**Citations:** [22]
**Images:**
- `images/chest-tube/three-bottle-system.png` | alt: "Three-bottle chest drainage system showing collection bottle, water seal bottle (2 cm depth), and suction regulation bottle (20 cm depth) with directional flow from chest drainage to wall suction" | caption: "3-bottle drainage system: collection → water seal (2 cm) → suction control (20 cm)."
**Next:** `ctube-suction`

---

#### `ctube-suction` — info, M4
**Title:** Suction vs Water Seal
**Body:** SUCTION IS NOT ROUTINELY NECESSARY

- You do not need suction for initial management, CT transport, or patient transfer
- Suction should be reserved for: failure of lung re-expansion on water seal, persistent large air leak, or specific clinical situations
- When used: low-pressure suction, typically -20 cmH2O

BY INDICATION
- Primary spontaneous PTX: water seal or Heimlich valve first. Suction only if lung fails to re-expand [1, 20]
- Traumatic PTX: low-pressure suction may reduce hospital stay and tube duration. Especially important if patient is on positive pressure ventilation [21]
- Secondary spontaneous PTX: evidence limited, clinical judgment

SWITCHING OUT SYSTEMS
Should be able to swap to a new Pleur-Evac at the level of the drainage system connection without losing the tube.
**Citations:** [1, 20, 21, 22]
**Next:** `ctube-air-leak`

---

#### `ctube-air-leak` — info, M4
**Title:** Air Leak Assessment & Troubleshooting
**Body:** AIR LEAK QUANTIFICATION
The water seal chamber has graded markings to quantify the size of an air leak.

CHECK FOR TIDALING
Turn off suction and observe if the water column (or ball indicator) moves up and down with respiration. Tidaling = patent tube with communication to the pleural space. Absent tidaling = tube may be blocked, kinked, or lung fully expanded.

TESTING FOR AIR LEAK
1. Clamp the suction tubing (disconnect from vacuum)
2. Ask the patient to cough (generates negative intrathoracic pressure)
3. Release and observe the water seal chamber
4. Bubbles = active air leak

TROUBLESHOOTING
- If air leak is at the system rather than the lung: clamp or kink tube at the chest wall — if bubbling stops, the leak is in the external system; if it continues, the leak is pulmonary
- Check all connections for loose fittings

DO NOT STRIP THE CHEST TUBE
Stripping (milking) generates excessive negative pressure (-300 to -400 cmH2O) and can cause lung injury. There is no evidence it improves drainage.

DO NOT CLAMP the chest tube without explicit instruction from the primary team. Clamping a tube with an ongoing air leak risks tension pneumothorax.
**Citations:** [16, 22]
**Next:** `ctube-antibiotics`

---

#### `ctube-antibiotics` — info, M4
**Title:** Antibiotics & Ongoing Care
**Body:** PROPHYLACTIC ANTIBIOTICS
Probably beneficial for trauma thoracostomies. The EAST 2022 practice management guideline conditionally recommends antibiotic prophylaxis for tube thoracostomy placed for trauma [17].

Not routinely indicated for non-traumatic chest tubes.

ONGOING MANAGEMENT
- Record output (volume, color, character) each nursing shift
- Monitor for signs of infection at insertion site
- Chest tube site care: keep dressing clean and dry, change if soiled
- Daily reassessment: air leak, tidaling, output trend, CXR as indicated

**Citations:** [17, 22]
**Next:** `ctube-removal-criteria`

---

#### `ctube-removal-criteria` — info, M4
**Title:** Removal Criteria
**Body:** CRITERIA FOR CHEST TUBE REMOVAL — all must be met:
1. Lung fully re-expanded on CXR
2. No air leak (no bubbling in water seal)
3. Fluid output <100 mL/day
4. Patient clinically stable

WATER SEAL TRIAL
- Place tube to water seal (disconnect suction) for a trial period
- A normal CXR obtained 3 hours after placing on water seal effectively excludes development of a clinically significant pneumothorax [16]
- If lung remains expanded and no air leak recurs: proceed to removal

TIMING
No significant difference in recurrence of pneumothorax based on respiratory cycle timing of removal (end-expiration vs end-inspiration) [15]. One small study showed no difference.
**Citations:** [15, 16]
**Next:** `ctube-removal`

---

#### `ctube-removal` — info, M4
**Title:** Removal Technique
**Body:** REMOVAL PROCEDURE
1. Pre-medicate with analgesia
2. Remove dressing and cut securing suture (leave stay suture intact)
3. Have petroleum gauze ready at bedside
4. Instruct patient: take a deep breath and bear down (Valsalva) — creates positive intrathoracic pressure, preventing air entry
5. Pull tube out in one smooth, swift motion
6. IMMEDIATELY apply petroleum gauze + occlusive dressing
7. Close the stay suture
8. Obtain CXR 1-2 hours post-removal

**Citations:** [15, 22]
**Next:** `ctube-disposition`

---

#### `ctube-disposition` — result, M4
**Title:** Disposition & Follow-Up
**Body:** AFTER SUCCESSFUL TUBE REMOVAL
- Confirm lung remains expanded on post-removal CXR
- If recurrent pneumothorax on post-removal film: small and asymptomatic may observe; large or symptomatic requires new tube

DISCHARGE PLANNING
- Wound care: keep dressing clean and dry, remove in 48 hours
- Activity: avoid heavy lifting or straining for 1-2 weeks
- No air travel until confirmed resolution (minimum 2 weeks post)
- No scuba diving until pulmonology clearance
- Smoking cessation counseling

RECURRENCE
- PSP: ~30% at 1 year, ~50% lifetime
- SSP: ~40-50% recurrence
- After 2nd ipsilateral episode: strongly recommend pleurodesis (VATS with mechanical pleurodesis or stapled bullectomy)

FOLLOW-UP
- Outpatient CXR in 2-4 weeks
- Pulmonology referral for: SSP, recurrent PSP, pleurodesis discussion
**Recommendation:** Discharge with follow-up CXR in 2-4 weeks. Smoking cessation and activity restrictions. Pulmonology referral if recurrent or SSP.
**Confidence:** definitive
**Citations:** [1, 22]

---

## Clinical Notes (for reference panel)

```
1. Chest tubes are becoming increasingly unnecessary — evidence supports conservative management for small traumatic PTX (<35 mm on CT), primary spontaneous PTX (Brown NEJM 2020), and select occult PTX on ventilator (OPTICC trial).
2. Small-bore pigtail catheters (10-14 Fr) have equivalent outcomes to large-bore for simple pneumothorax with less pain and fewer complications.
3. Small-bore tubes have similar clinical outcomes to large-bore for empyema/pleural infection (Rahman et al).
4. Triangle of safety: pectoralis major anteriorly, latissimus dorsi posteriorly, 5th ICS inferiorly, axilla superiorly. MAP technique provides an alternative landmark.
5. The neurovascular bundle runs variably within the interspace — always insert over the superior rib edge but recognize the anatomy is not fixed.
6. Chest tube insertion is probably safe in anticoagulated patients (Chest 2021).
7. Tube resting location does NOT matter — function, not trajectory, dictates reintervention. AIS is the only significant independent factor for complications.
8. Do NOT use trocars — unacceptable rate of visceral injury. All tubes should be placed by blunt dissection.
9. Increased angle of insertion (perpendicular) is associated with more complications — aim for tangential trajectory.
10. MAC spin test: rotate tube 180° clockwise and release. If it spins back, it is kinked.
11. Suction is NOT routinely needed. Water seal is sufficient for most cases. Reserve suction for failure to re-expand or persistent air leak.
12. Do NOT strip chest tubes — generates dangerous negative pressure with no evidence of benefit.
13. Do NOT clamp without primary team instruction — risk of tension pneumothorax with ongoing air leak.
14. Autotransfusion of hemothorax blood is safe in trauma — blood lacks clotting factors but is otherwise usable.
15. Antibiotics are probably beneficial for trauma thoracostomies (EAST 2022 guideline).
16. Removal criteria: lung expanded, no air leak, output <100 mL/day, 3-hour CXR after water seal trial excludes significant recurrence.
```

---

## Wiring Instructions

### 1. Create `src/data/trees/chest-tube.ts`
Export: `CHEST_TUBE_NODES`, `CHEST_TUBE_NODE_COUNT`, `CHEST_TUBE_MODULE_LABELS`, `CHEST_TUBE_CITATIONS`, `CHEST_TUBE_CLINICAL_NOTES`
Import types: `DecisionNode` from `../../models/types.js`, `Citation` from `./neurosyphilis.js`

### 2. Edit `src/data/categories.ts`
Add to `trauma-surg` category (currently empty decisionTrees array):
```typescript
{
  id: 'chest-tube',
  title: 'Pneumothorax Mgmt & Chest Tube',
  subtitle: 'Indications → Preparation → Insertion → Management',
  categoryId: 'trauma-surg',
  version: '1.0',
  nodeCount: XX, // actual count
  entryNodeId: 'ctube-start',
}
```

Add to `procedures` category (already has afib-rvr and priapism):
```typescript
{
  id: 'chest-tube',
  title: 'Pneumothorax Mgmt & Chest Tube',
  subtitle: 'Indications → Preparation → Insertion → Management',
  categoryId: 'procedures',
  version: '1.0',
  nodeCount: XX,
  entryNodeId: 'ctube-start',
}
```

### 3. Edit `src/components/tree-wizard.ts`
Add import line after the priapism/afib-rvr imports:
```typescript
import { CHEST_TUBE_NODES, CHEST_TUBE_CITATIONS, CHEST_TUBE_MODULE_LABELS } from '../data/trees/chest-tube.js';
```

Add to TREE_CONFIGS map:
```typescript
'chest-tube': {
  nodes: CHEST_TUBE_NODES,
  entryNodeId: 'ctube-start',
  categoryId: 'trauma-surg',
  moduleLabels: CHEST_TUBE_MODULE_LABELS,
  citations: CHEST_TUBE_CITATIONS,
},
```

### 4. Edit `src/components/reference-table.ts`
Add import:
```typescript
import {
  CHEST_TUBE_CITATIONS,
  CHEST_TUBE_CLINICAL_NOTES,
} from '../data/trees/chest-tube.js';
```

Add to TREE_REFERENCE_DATA map:
```typescript
'chest-tube': {
  title: 'Chest Tube Reference',
  citations: CHEST_TUBE_CITATIONS,
  clinicalNotes: CHEST_TUBE_CLINICAL_NOTES,
},
```

### 5. Copy images
```bash
mkdir -p docs/images/chest-tube
cp ~/Desktop/Zone\ of\ Safety.png docs/images/chest-tube/triangle-of-safety.png
cp ~/Desktop/needle\ over\ rib.png docs/images/chest-tube/needle-over-rib.png
cp ~/Desktop/pleural\ drainage.png docs/images/chest-tube/three-bottle-system.png
cp ~/Desktop/properly\ placed\ chest\ tube.png docs/images/chest-tube/proper-placement-cxr.png
```

### 6. Edit `docs/sw.js`
- Bump cache version to `medkitt-v38`
- Add to ASSETS_TO_CACHE:
```
'./data/trees/chest-tube.js',
'./images/chest-tube/triangle-of-safety.png',
'./images/chest-tube/needle-over-rib.png',
'./images/chest-tube/three-bottle-system.png',
'./images/chest-tube/proper-placement-cxr.png',
```

### 7. Build
```bash
cd ~/Desktop/medkitt && bun build
```
