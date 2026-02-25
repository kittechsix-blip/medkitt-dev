# Precipitous Delivery — Build Spec

## Category: OB/GYN (only, no cross-listing)
## Tree ID: `precip-delivery`, Entry: `precip-start`

---

## Scope
- Stepwise walkthrough of assessing active labor and delivering a baby in the ED
- Cover all 3 stages of labor
- Hyperlinks to complications as **bold text mentions** (future consults): shoulder dystocia, breech, cord prolapse, PPH
- 1 drug: Oxytocin (20 units in 1L NS at 250 mL/hr)

## Plan File
Full build plan at: `/Users/kittechsix/.claude/plans/jazzy-crunching-peach.md`

## Tree Structure: 20 nodes, 5 modules

### Module 1: Initial Assessment (4 nodes + 1 transfer result)
- **precip-start** (info): Entry. Precipitous delivery overview. ~3% of US deliveries. Page OB + Peds immediately.
- **precip-history** (info): Brief OB history (gestational age/due date, G/P, multiples, complications, contractions, fluid/bleeding). Signs of imminent delivery (crowning, perineal bulge, urge to push, bloody show, ROM, anal relaxation).
- **precip-exam** (info): Cervical exam — effacement (0-100%), dilation (0-10cm), station (-5 to +5 relative to ischial spines). IMAGES: station.png, effacement-dilation.png
- **precip-imminent** (question): Is delivery imminent? Option A: "Yes — crowning or fully dilated" → precip-callhelp. Option B: "No — can safely transfer" → precip-transfer.
- **precip-transfer** (result): EMTALA guidance. Active labor = unstable condition. Ensure receiving facility. Antenatal transfer > neonatal transfer. Confidence: recommended.

### Module 2: Preparation (3 nodes)
- **precip-callhelp** (info): Page OB + Peds. Team: you, nurse for mom, nurse for baby, provider for baby. Get neonatal warmer + resuscitation equipment.
- **precip-equipment** (info): Equipment: sterile gloves, sterile scissors, umbilical cord clamps (Kelly clamps work), bulb suction, blanket for baby. If time: U/S to confirm vertex (if NOT vertex → **see Breech Delivery consult**). Clean and drape perineum.
- **precip-ready** (info): Patient positioned, team assigned, warmer on. Transition to delivery.

### Module 3: Stage 1 — Labor (2 nodes)
- **precip-stage1** (info): Stages overview. Stage 1: Latent (irregular ctx, 0-5cm) → Active (strong/regular, nullips 1.2 cm/hr, multips 1.5 cm/hr) → Transition (8-10cm). Stage 2: Pushing (1-2 hrs). Stage 3: Placenta. "Never trust a multip." IMAGE: stages-of-labor.png
- **precip-coaching** (info): Push with contractions: 10 sec x3 per contraction. When head crowning → STOP pushing, breathe through contractions. Reassure throughout.

### Module 4: Stage 2 — Delivery (6 nodes)
- **precip-head** (info): One hand on perineum (towel), gentle upward pressure on fetal chin. Other hand on occiput with counter-pressure. Slow, controlled delivery. Routine suctioning NO LONGER recommended (NRP). IMAGE: perineum-support.png
- **precip-nuchal** (question): Sweep neck for nuchal cord. Option A: "No nuchal cord" → precip-shoulders (routine). Option B: "Cord present — can slip over head" → precip-shoulders (routine). Option C: "Cord too tight to slip" → precip-nuchal-cut (urgent).
- **precip-nuchal-cut** (info): Clamp cord x2, cut between. Deliver baby promptly. → precip-shoulders
- **precip-shoulders** (info): Gentle DOWNWARD traction → anterior shoulder under symphysis. Gentle UPWARD traction → posterior shoulder. Traction in long axis of neck (avoid brachial plexus injury). **If head "turtles" → see Shoulder Dystocia consult.** IMAGE: shoulder-delivery.png
- **precip-cord** (info): DON'T DROP THE BABY. Place on mom's abdomen (skin-to-skin). Clamp cord ~3cm from abdomen x2, cut between. If non-sterile → clean stump (prevent omphalitis). IMAGE: cord-clamping.png
- **precip-baby** (info): Dry and stimulate. APGAR at 1 and 5 min. ~90% transition without intervention. ~10% need more than warmth/drying/stimulation. <1% need compressions. **If resuscitation required → initiate NRP.**

### Module 5: Stage 3 — Placenta & Postpartum (5 nodes)
- **precip-placenta** (info): Signs of separation: cord lengthens, gush of blood. Gentle traction. May ask mom to push. NEVER force — risks uterine inversion. 5-15 min after delivery.
- **precip-placenta-exam** (info): Examine for completeness — all lobes present, edges for torn veins. Count cord vessels (2 arteries, 1 vein normal). Cord length 35-70cm normal. Save placenta. Retained fragments → hemorrhage risk.
- **precip-oxytocin** (info): [Oxytocin](#/drug/oxytocin/precipitous delivery) 20 units in 1L NS at 250 mL/hr. Do NOT give IV push — profound hypotension. Start after placenta delivered. Don't wait to assess bleeding — empiric treatment decreases PPH risk. Bimanual uterine massage until uterus firms.
- **precip-lacerations** (info): Examine for vaginal/perineal tears. Comfortable → repair. Complex → defer to OB. If deferring → pack vaginal canal. Monitor PPH x1 hr: >1000cc or hypovolemia signs. **If significant hemorrhage → see Postpartum Hemorrhage consult.**
- **precip-complete** (result): Delivery complete. Congratulate mom. Checklist: uterus firm, bleeding controlled, lacerations addressed, baby assessed, APGAR documented, placenta examined/saved. Monitor x1 hr post-placenta. Confidence: definitive.

## Drug: Oxytocin
- id: oxytocin, name: Oxytocin (Pitocin), class: Uterotonic, route: IV infusion
- Indication: Precipitous Delivery — Third Stage
- Regimen: 20 units in 1L NS (or LR). Infuse at 250 mL/hr. Max 40 units over 4-10 hrs. Start after placental delivery. Do NOT give IV push.
- Contraindications: Hypersensitivity
- Cautions: Water intoxication with prolonged infusion, uterine hyperstimulation
- Monitoring: Uterine tone, vaginal bleeding, vitals, fluid balance
- Notes: First-line uterotonic for PPH prevention. Empiric use recommended. Uterine atony = most common PPH cause.

## Images (6, copy to docs/images/precip-delivery/)
1. station.png ← ~/Desktop/Station.png
2. effacement-dilation.png ← ~/Desktop/dilation and effacement.png
3. stages-of-labor.png ← ~/Desktop/complete stages of labor.png
4. perineum-support.png ← ~/Desktop/supporting perineum.png
5. shoulder-delivery.png ← ~/Desktop/shoulder delivery.png
6. cord-clamping.png ← ~/Desktop/umbilical clamping.png

## Citations (8)
1. Pope JV, Tibbles CD. The difficult emergency delivery. In: Winters ME, ed. Emergency Department Resuscitations of the Critically Ill. ACEP; 2012.
2. VanRooyen MJ, Scott JA. Ch 105: Emergency Delivery. Tintinalli's Emergency Medicine. 7th ed. McGraw-Hill; 2011.
3. McFarlin A. ED Management of Precipitous Delivery and Neonatal Resuscitation. Emergency Medicine Reports. 2019;40(11).
4. Martin JA, et al. Births: Final Data for 2015. Natl Vital Stat Rep. 2017;66(1):1-70.
5. Weiner GM, ed. Textbook of Neonatal Resuscitation (NRP). 8th ed. AAP; 2021.
6. Kerrigan K. Emergency Delivery: Are You Prepared? Baystate Medical Center. (Video lecture).
7. 42 U.S.C. § 1395dd. EMTALA.
8. ACOG Practice Bulletin No. 183: Postpartum Hemorrhage. Obstet Gynecol. 2017;130(4):e168-e186.

## Files to Create
1. `src/data/trees/precip-delivery.ts`
2. `docs/images/precip-delivery/` (6 images)

## Files to Modify
1. `src/data/drug-store.ts` — Add Oxytocin + ALL_DRUGS + NAME_TO_ID
2. `src/data/categories.ts` — Add to OB/GYN decisionTrees[]
3. `src/components/tree-wizard.ts` — Import + TREE_CONFIGS
4. `src/components/reference-table.ts` — Import + TREE_REFERENCE_DATA
5. `docs/sw.js` — Bump v77 → v78

## Build Order
1. Copy images → 2. Create tree data → 3. Add Oxytocin → 4. Register everywhere → 5. bunx tsc → 6. git status docs/ → 7. Bump SW → 8. Test → 9. Push
