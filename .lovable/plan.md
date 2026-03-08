

# Integrate Real Exercise & Progression Data from CalisthenicsByTLC

## Context

You uploaded real Supabase exports with **99 exercises** (with YouTube URLs, cues, categories, muscles, chains) and **44 progressions** across 9 skill trees (Planche, Front Lever, Back Lever, Human Flag, Handstand, Iron Cross, Maltese, Manna, Muscle-up). You also uploaded the **STACKED one-pager PDF** which defines the training system philosophy.

The `calesthenicsbytlc` GitHub repo doesn't exist yet (404). The `tlchub-30e13467` repo is this current project.

Currently the app uses hardcoded data in `exerciseDatabase.ts` (413 lines of old format) and `skillProgressions.ts` (2099 lines of manually-written progressions). We'll replace all of this with your real exported data.

## Plan

### 1. Replace Exercise Database with Real Data

**File: `src/data/exerciseDatabase.ts`** — Rewrite entirely

Parse the 99 exercises from your CSV into TypeScript. Each exercise includes real YouTube URLs, Instagram URLs, cues, muscles, equipment, difficulty, chain groups, and chain order. No mock data.

Categories from your data: Push, Pull, Core, Legs, Skills, Yoga, Mobility, Flexibility.

### 2. Replace Skill Progressions with Real Data

**File: `src/data/skillProgressions.ts`** — Rewrite entirely

Parse the 44 progressions into 9 real skill trees grouped by `exercise_id`:

| Skill Tree | Levels | Exercise |
|---|---|---|
| Planche | 5 (Lean → Full) | e7070fde |
| Front Lever | 5 (Tuck → Full) | a0dab72f |
| Back Lever | 5 (German Hang → Full) | f6d08baf |
| Human Flag | 4 (Vertical → Full) | 5bfcdccf |
| Handstand | 5 (Wall → One Arm) | d7a9d4bb |
| Iron Cross | 5 (Support → Full) | ec6570fb |
| Maltese | 5 (Planche Lean → Full) | ee236504 |
| Manna | 5 (L-Sit → Full) | d5fe0efb |
| Muscle-up | 5 (Pull-up+Dip → Strict) | f5d3423b |

Each progression has real names, descriptions, and level numbers. Link them to the exercise database entries via exercise_id for YouTube URLs and cues.

### 3. Add STACKED System Content

**File: `src/data/controlContent.ts`** — Update

Add the STACKED Laws and level definitions from the PDF:
- **Level 1 Foundation**: Positions, tissue tolerance, clean locks
- **Level 2 Development**: Leverage exposure with control
- **Level 3 Advanced**: Consistent holds, strong negatives
- **Level 4 Elite**: Clean peaks + endurance under fatigue
- STACKED Laws: "Never progress leverage and volume at same time", "Straight-arm days are low fatigue, high quality"

Update `skillPaths` array to include all 9 trees (add Back Lever, Human Flag, Iron Cross, Maltese, Manna).

### 4. Add TLCtv & CalisthenicsByTLC Branding

**File: `src/data/controlContent.ts`** — Add constants

```
APP_SOCIAL_HANDLE = "@calisthenicsbytlc"
APP_GITHUB = "TLC405"  
APP_BRAND_TLCTV = "TLCtv"
APP_SOCIAL_LINKS = { github: "https://github.com/TLC405", ... }
```

Social accounts (YouTube, TikTok, Instagram) marked as "Coming Soon" since they don't exist yet. GitHub is real.

### 5. Update SkillTreeView to Use Real Data

**File: `src/components/SkillTreeView.tsx`** — Modify

- Pull YouTube URLs from real exercise data instead of placeholder `videoUrl` fields
- Show all 9 skill trees (currently only shows ~6)
- Link progression steps to their parent exercise for cues and video

### 6. Update LearnPathView with All 9 Paths

**File: `src/components/LearnPathView.tsx`** — Modify

Update to show all 9 skill paths with real gate descriptions from the CSV data.

### 7. Copy STACKED PDF Image to Project

Copy the one-pager image to `src/assets/` so it can be displayed in the Training or Learn view as a reference card.

## Files Summary

| File | Action |
|---|---|
| `src/data/exerciseDatabase.ts` | Rewrite — 99 real exercises with YouTube URLs |
| `src/data/skillProgressions.ts` | Rewrite — 9 skill trees, 44 real progressions |
| `src/data/controlContent.ts` | Modify — Add STACKED laws, levels, 9 paths, TLCtv branding |
| `src/components/SkillTreeView.tsx` | Modify — Support 9 trees, real YouTube links |
| `src/components/LearnPathView.tsx` | Modify — Show all 9 skill paths |
| `src/assets/stacked-onepager.jpg` | Create — Copy PDF image for display |

