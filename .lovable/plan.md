
# Learn Mode Upgrade Plan

## Overview

This plan adds a **Learn Mode** feature to the calisthenics app that applies motor-learning research to help users learn skills faster. The implementation is additive-only (no breaking changes), premium in design, and delivers value in ~10 seconds with optional deep dives.

---

## Architecture

### Data Layer (New Files)

**1. Create `src/data/learningPrinciples.ts`**

A static data file containing 8 research-backed learning principles:

| Slug | Title | When to Use |
|------|-------|-------------|
| distributed_practice | Distributed Practice | Always |
| external_focus | External Focus Cues | Always |
| variability | Small Variation Practice | Intermediate |
| autonomy | Autonomy Support | Always |
| feedback_dosing | Feedback Dosing | Always |
| retention_test | Retention Test | Intermediate |
| sleep_consolidation | Sleep & Consolidation | Always |
| interleaving | Interleaving | Intermediate |

Each principle includes:
- `micro_summary` (140 chars) - quick value
- `why_it_works` (280 chars) - expandable science
- `how_to_apply_template` with placeholders (`{exercise}`, `{sets}`)
- `caution` - safety note
- `sources[]` - research URLs

**2. Create `src/types/learning.ts`**

New TypeScript interfaces:
- `LearningPrinciple` - principle definition
- `LearnConfig` - per-exercise learn mapping
- `LearnDefaultRecipe` - frequency/dose structure
- `LearnModeIntensity` - user preference setting

**3. Extend existing exercise data**

Update `src/data/exerciseDatabase.ts` to add learn mapping for each exercise:
- `learn_principle_slugs: string[]` (2-4 principles)
- `learn_apply_notes: Record<string, string>` (optional overrides)
- `learn_default_recipe` (frequency, sets, rest ranges)
- `learn_coach_tip: string` (optional, tasteful humor)

Auto-assignment rules:
- Skills/static holds (Planche, Handstand, Lever) → `distributed_practice`, `external_focus`, `feedback_dosing`, `retention_test`
- Mobility/compression → `distributed_practice`, `variability`, `autonomy`, `sleep_consolidation`
- Strength reps → `distributed_practice`, `external_focus`, `feedback_dosing`

---

## UI Components

### New Components

**1. `src/components/learn/LearnCard.tsx`**

A premium, minimal card showing:
- Icon + title (e.g., "Practice Recipe")
- Micro summary (quick value)
- "Apply to {exercise}" line
- Tiny caution
- "Show more" expander for `why_it_works` + sources

Design: shadcn Card with subtle border, clean hierarchy, 10-second value.

**2. `src/components/learn/LearnTab.tsx`**

Displays exactly 3 LearnCards:
1. **Practice Recipe** - distributed practice + weekly frequency
2. **Focus Cue** - external focus + one apply line  
3. **Progress Smarter** - variability OR retention test

Uses existing Tabs component pattern.

**3. `src/components/learn/LearnBiteToast.tsx`**

Post-workout logging micro nudge:
- One principle per log (rotates across sessions)
- Example: "Next time: 4×10s instead of 1×40s. Same work, better learning."
- Uses existing toast/sonner system

**4. `src/components/learn/LearnModeSettings.tsx`**

Coach controls for learn intensity:
- `low` - micro_summary only
- `standard` - micro + apply line (default)
- `nerdy` - includes why_it_works + sources

Stored in localStorage.

---

## Integration Points

### 1. Exercise Detail Enhancement

Update `src/components/DetailedExerciseCard.tsx`:
- Add **Learn** tab alongside existing Exercise Details collapsible
- Shows 3 LearnCards when expanded
- Lazy-loaded for performance

### 2. Skill Tree Enhancement

Update `src/components/SkillTreeView.tsx`:
- Add **Learn** tab in exercise detail view
- Same 3-card pattern

### 3. Workout Logging Integration

Update `src/components/WorkoutCalendar.tsx`:
- After logging workout, show LearnBiteToast
- Rotate principles based on logged exercises
- Store last shown principle per exercise in localStorage

### 4. Learn Mode Context

Create `src/contexts/LearnModeContext.tsx`:
- Manages learn intensity preference
- Provides helper functions for principle lookup
- Memoizes merged learn content per exercise

---

## File Changes Summary

| File | Action | Description |
|------|--------|-------------|
| `src/data/learningPrinciples.ts` | Create | 8 principles with premium copy |
| `src/types/learning.ts` | Create | TypeScript interfaces |
| `src/types/index.ts` | Modify | Add learn fields to Exercise interface |
| `src/data/exerciseDatabase.ts` | Modify | Add learn mappings to all exercises |
| `src/components/learn/LearnCard.tsx` | Create | Premium learn card component |
| `src/components/learn/LearnTab.tsx` | Create | 3-card learn tab |
| `src/components/learn/LearnBiteToast.tsx` | Create | Post-log toast component |
| `src/components/learn/LearnModeSettings.tsx` | Create | Intensity toggle |
| `src/contexts/LearnModeContext.tsx` | Create | Context for learn preferences |
| `src/components/DetailedExerciseCard.tsx` | Modify | Add Learn tab |
| `src/components/SkillTreeView.tsx` | Modify | Add Learn tab to detail view |
| `src/components/WorkoutCalendar.tsx` | Modify | Add post-log toast |
| `src/App.tsx` | Modify | Wrap with LearnModeProvider |

---

## Technical Details

### Performance Considerations
- Fetch principles once at app load (static import)
- Index principles by slug for O(1) lookup
- Memoize merged learn content per exercise with `useMemo`
- Lazy-load Learn tab content

### Data Structure Example

```typescript
// LearningPrinciple
{
  id: "distributed_practice",
  slug: "distributed_practice",
  title: "Distributed Practice",
  micro_summary: "More short exposures beats one long grind.",
  why_it_works: "Spacing practice across days improves retention and skill stability versus cramming.",
  how_to_apply_template: "Do {exercise} 3-5x/week as 8-12 minute micro-sessions (not 1 marathon).",
  when_to_use: "always",
  caution: "If joints feel irritated, keep frequency but lower intensity.",
  sources: [
    "https://www.sciencedirect.com/...",
    "https://pmc.ncbi.nlm.nih.gov/..."
  ]
}

// Exercise learn config
{
  learn_principle_slugs: ["distributed_practice", "external_focus", "feedback_dosing"],
  learn_apply_notes: {
    external_focus: "Think: 'push the floor away' during lean"
  },
  learn_default_recipe: {
    frequency_per_week: 4,
    dose_type: "microdose",
    set_count_range: [3, 6],
    hold_or_rep_range: [15, 30],
    rest_range_sec: [60, 120]
  },
  learn_coach_tip: "Your wrists will thank you for the short sessions."
}
```

### Toast Rotation Logic

```typescript
// Get next principle to show (rotates per exercise)
const getNextPrinciple = (exerciseId: string): LearningPrinciple => {
  const key = `learn_rotation_${exerciseId}`;
  const lastIndex = parseInt(localStorage.getItem(key) || "0");
  const principles = exercise.learn_principle_slugs;
  const nextIndex = (lastIndex + 1) % principles.length;
  localStorage.setItem(key, nextIndex.toString());
  return principlesMap[principles[nextIndex]];
}
```

---

## Quality Bar

### Design Principles
- Premium hierarchy, spacing, clean microcopy
- Never imply failure - always give an easier next action
- Personal, light, empathetic tone (never corny)
- 10 seconds of value, expandable for deeper reading
- Follows existing design patterns (clean-border, premium-shadow, glass-effect)

### Accessibility
- Proper focus management in expandable sections
- Screen reader friendly labels
- Keyboard navigation for Learn tabs

### Mobile-First
- Cards stack cleanly on mobile
- Touch-friendly expand/collapse
- Toast positioned for mobile viewing

---

## Implementation Order

1. Create types and data files (principles + exercise mappings)
2. Create LearnModeContext provider
3. Build LearnCard component
4. Build LearnTab component  
5. Integrate into DetailedExerciseCard
6. Integrate into SkillTreeView
7. Build LearnBiteToast
8. Integrate into WorkoutCalendar
9. Add LearnModeSettings
10. Polish and test all integrations
