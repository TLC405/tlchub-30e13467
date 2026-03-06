

# Connect Learn → Skills + Restyle Skills + Training Drill Launcher

## Three problems to solve

1. **Learn → Skills link**: Tapping a skill path in Learn just navigates to generic Skills tab. It should open the matching skill tree directly.
2. **Skills tab has old UI**: Still uses gradients, shadows, `scale-[1.02]` hover — doesn't match the brutalist design system.
3. **Train blocks are static**: Tapping "Planche leans" or "Warm-up" just toggles a checkbox. Should open the relevant exercise detail.

---

## 1. Learn Path → Filtered Skill Tree

**File: `src/data/controlContent.ts`**
- Add `skillTreeId` field to each `skillPaths` entry mapping to the `skillProgressions` IDs:
  - `planche` → `planche-progression`
  - `handstand` → `handstand-progression`
  - `front-lever` → `front-lever-progression`
  - `muscle-up` → `muscle-up-progression`
  - `pistol` → `null` (no matching tree yet)

**File: `src/pages/Index.tsx`**
- Change `activeView` from a simple string to support passing a parameter (e.g. `skills:planche-progression`).
- Parse the view string: if it starts with `skills:`, extract the tree ID and pass it as a prop to `SkillTreeView`.

**File: `src/components/LearnPathView.tsx`**
- Update `onClick` to call `onNavigate("skills:planche-progression")` instead of `onNavigate("skills")`.

**File: `src/components/SkillTreeView.tsx`**
- Accept optional `initialTreeId?: string` prop.
- On mount, if `initialTreeId` is provided, auto-select that tree from `skillProgressions`.

---

## 2. Restyle Skills Tab (Brutalist)

**File: `src/components/SkillTreeView.tsx`**

Replace the old gradient/shadow UI with brutalist design:
- **Grid view**: Replace gradient icon circles with 3px ink border + 24px radius cards. Remove `bg-gradient-to-br` and `shadow-lg`.
- **Header**: Use `font-serif font-black` for titles, matching Learn/Train tabs.
- **Level badges**: Keep the L1-L4 color-coded badges but remove gradient backgrounds from step circles — use solid ink borders instead.
- **Progression list**: Replace `hover:scale-[1.02]` with `card-lift` class. Use `border-[3px] border-foreground rounded-[24px]` on cards.
- **Detail view**: Same brutalist card styling with ink borders.
- Add `NonNegotiables compact` banner at top of skill tree list.
- Add `stagger-children` class to progression lists.

---

## 3. Training Drill Launcher

**File: `src/data/controlContent.ts`**
- Add `drillMapping` to each `typicalBlocks` entry — a lookup from block name to skill tree ID + exercise filter:
  - "Planche leans / tucks / straddle" → `{ treeId: "planche-progression", filter: "planche" }`
  - "Warm-up (wrists + shoulders)" → `{ type: "integrity", blockId: "wrist-prep" }` (opens integrity block)
  - Blocks without mappings stay as simple checkboxes.

**File: `src/components/TrainingView.tsx`**
- Change block data from `string[]` to `Array<{ label: string; action?: { type: 'skill' | 'integrity'; treeId?: string; blockId?: string } }>`.
- When a block has an `action`, tapping it navigates: skill type → `onNavigate("skills:treeId")`, integrity type → `onNavigate("integrity:blockId")`.
- Add `onNavigate` prop to `TrainingView` (currently missing).
- Keep the checkbox toggle on long-press or a separate check icon; primary tap navigates.

**File: `src/pages/Index.tsx`**
- Pass `onNavigate={setActiveView}` to `TrainingView`.
- Handle `integrity:blockId` the same way as `skills:treeId`.

**File: `src/components/IntegrityView.tsx`**
- Accept optional `initialBlockId?: string` prop to auto-expand a specific block.

---

## Files Summary

| File | Action | Description |
|------|--------|-------------|
| `src/data/controlContent.ts` | Modify | Add skillTreeId to paths, add drill mappings to blocks |
| `src/pages/Index.tsx` | Modify | Support parameterized view routing |
| `src/components/LearnPathView.tsx` | Modify | Navigate to specific skill tree |
| `src/components/SkillTreeView.tsx` | Modify | Accept initialTreeId + full brutalist restyle |
| `src/components/TrainingView.tsx` | Modify | Add drill navigation + onNavigate prop |
| `src/components/IntegrityView.tsx` | Modify | Accept initialBlockId prop |

## Implementation Order
1. Data updates (skill tree mappings + block actions)
2. Index routing (parameterized views)
3. Restyle SkillTreeView (brutalist)
4. Wire Learn → Skills navigation
5. Wire Train → Skills/Integrity navigation

