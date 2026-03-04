# CONTROL v2.0 Content & UI Upgrade

## What Changes

Based on the NotebookLM source documents, the app needs these upgrades to match the expanded specification:

### 1. Expand Coming Soon Paths

**File: `src/data/controlContent.ts**`

Replace the single "Barre + Pilates" entry with 4 separate Coming Soon paths, each with starter gate descriptions and STACKED-day mapping:

- **Barre** — L1: isometric plies with ribs down + turnout (Day D)
- **Pilates** — L1: mat breathwork + core alignment (Day D)
- **Ballet** — L1: pointed-toe balances + ankle lines (Day D)
- **Endurance** — L1: EMOM holds (any day)

Update `LearnPathView.tsx` to render these as individual teaser cards with dashed borders and "Q3-Q4 2026" stamps.

### 2. Add Video References to Skill Progressions

**File:** `src/data/skillProgressions.ts`

Add optional `videoUrl` and `videoSource` fields to `ProgressionStep` interface. Seed key o Lean → Tom Merrick Beginner Planche Routine

- Tuck Planche → FitnessFAQs tutorial
- Wall Handstand → School of Calisthenics

**File:** `src/components/SkillTreeView.tsx`

Add "Watch Demo" button in exercise detail that opens video URL in new tab. Styled as a brutalist outline button with play icon.

### 3. Blueprint Grid Background

**File: `src/index.css**`

Add subtle repeating blueprint grid pattern to the body/background:

- 40px grid lines at 0.035 opacity using the Blueprint accent color (#1A4EFF)
- CSS-only (no images), using `background-image: linear-gradient` for grid lines

### 4. Pain Flag Button on Training Sessions

**File: `src/components/TrainingView.tsx**`

Add a small "Pain Flag" button (red ink dot icon) on each drill block in the day detail view. When tapped:

- Marks the block with a red indicator
- Shows a toast suggesting regression
- Stores pain flags in localStorage for progress tracking

### 5. Enhanced Level Badges (L1-L4 Labels)

**File: `src/components/SkillTreeView.tsx**`

Update level badges to use the L1/L2/L3/L4 format consistently:

- L1 Beginner (green), L2 Intermediate (blue), L3 Advanced (orange), L4 Elite (red with "coming soon" dashed style)

**File: `src/components/LearnPathView.tsx**`

Add L1-L4 gate labels as styled badges on each skill path card.

### 6. Subtle CSS Animations (replacing Framer Motion spec)

**File: `src/index.css**` and `**tailwind.config.ts**`

Since we can't use Framer Motion (not installed), implement the key animation specs via CSS:

- Card hover: subtle `translateY(-2px)` lift
- Accordion content reveal with opacity + height transition
- Blueprint underline draw effect using `scaleX` transform on pseudo-elements
- Active tab underline slide using CSS transition
- Staggered fade-in for drill lists using `animation-delay`

---

## Files Summary


| File                               | Action | Description                               |
| ---------------------------------- | ------ | ----------------------------------------- |
| `src/data/controlContent.ts`       | Modify | Expand comingSoon to 4 paths with details |
| `src/data/skillProgressions.ts`    | Modify | Add videoUrl field + seed key videos      |
| `src/components/LearnPathView.tsx` | Modify | Render expanded Coming Soon cards         |
| `src/components/SkillTreeView.tsx` | Modify | Watch Demo button + L1-L4 badges          |
| `src/components/TrainingView.tsx`  | Modify | Add pain flag button                      |
| `src/index.css`                    | Modify | Blueprint grid + animation utilities      |
| `tailwind.config.ts`               | Modify | Add animation keyframes                   |


## Implementation Order

1. Data updates (controlContent + skillProgressions)
2. Blueprint grid + CSS animations
3. UI updates (LearnPath, SkillTree, Training)