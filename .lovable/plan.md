# Put Every Exercise in Its Correct Place

## Goal
All 99 exercises appear wherever they belong — the right library category, the right skill path, the right training day, and the right TLCtv section — with no duplicates and no orphans.

## What changes

1. **One master placement list** — every exercise gets tagged with all the places it belongs (e.g. Ring Dip → Push library + Rings path + Day A; Manna → Skills + Flexibility path).
2. **Fix misplacements found in the list**
   - Ring Dip, Ring Push-up, Ring Row, Iron Cross, Maltese, Victorian Cross, Ringmaster → also in **Rings Mastery**
   - Planche Lean, Pseudo Planche Push-up, Tuck/Adv Tuck/Straddle Planche → **Planche Path / Straight-Arm Strength**
   - Wall Handstand, Freestanding Handstand, Pike Push-up, Handstand Push-up, L-Sit to Handstand → **Handstand Mastery**
   - Muscle-up, Chin-up, Pull-up, Archer Pull-up → **Muscle-up path**
   - Manna, L-Sit, Pike/Pancake stretches → linked to **Flexibility + Yoga**
   - Remove duplicate "Crow Pose Yoga" (merge with Crow Pose, tagged Yoga + Skills)
   - German Hang, Shoulder Dislocate, Wrist Circles → **Warm-up / Mobility** used in every Train day warm-up
3. **Train page** — each day's blocks (warm-up, skill work, strength, cooldown) list the actual exercises from the master list, each expandable with its video.
4. **Skills page** — each path's steps link to the matching exercise card (video, cues, muscles) instead of separate copies.
5. **TLCtv** — videos grouped by the same categories and paths.
6. **Library** — counts per tab update automatically; a "Also used in" line shows the other places each exercise appears.
7. **Check** — automated test confirms every exercise has at least one home, and no exercise is listed twice in the same place.

## Technical details
- Add `placements: { paths: string[]; days: string[]; blocks: string[] }` to `Exercise` in `src/types/index.ts`; populate in `src/data/exerciseDatabase.ts`.
- Helper `src/data/placements.ts` with `getExercisesForPath/Day/Block`.
- Consume in `TrainingView`, `SkillTreeView`, `TLCtvView`, `CompactExerciseLibrary`, `controlContent` training blocks.
- Vitest: `src/data/placements.test.ts` (no orphans, no duplicate ids per place, ring exercises in rings path).
