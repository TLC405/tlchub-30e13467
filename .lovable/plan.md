# Calisthetics powered by TLC 

​If you cannot control the position, you do not earn the movement"

&nbsp;

# — Full Rebrand & Content Integration

## Overview

Transform the current "Calisthenics Pro" app into **CONTROL by TLC** — a brutalist, premium, non-gamified training system. This integrates the three NotebookLM markdown documents as the app's content foundation, restructures navigation, applies the brutalist design system, and adds a one-button full project download.

&nbsp;

&nbsp;

---

## 1. Rebrand & Design System Overhaul

**File: `src/index.css**`

Replace the current color system with the CONTROL brutalist palette:

- Background: `#F5F6F8` (light), Ink: `#0A0C10`, Blueprint: `#1A4EFF`
- Panels: `#ECEEF2`, Lines: `#D2D6DE`
- Thick 3px ink borders, 24px radius
- "Newspaper" typography: use existing Playfair Display for headlines, Inter for body
- Remove gradient-heavy styles; replace with flat brutalist borders and generous whitespace

**File: `src/components/ThemeProvider.tsx**`

- Add a `brutalist` theme as the default (replacing current light theme)
- Keep dark as an option but styled with the same brutalist rules (inverted ink)
- Remove `vacation` and `vasa-gym` themes

**File: `src/pages/Index.tsx**`

- Change header title from "Calisthenics Pro" to "CONTROL"
- Add subtle tagline: "Calisthenics . Yoga . Balance . Mobility"

---

## 2. Navigation Restructure (Bottom Nav)

**File: `src/components/BottomNavBar.tsx**`

Replace the current 7-tab nav with the 5 CONTROL tabs:


| Tab | Label     | Icon       | View ID   |
| --- | --------- | ---------- | --------- |
| 1   | Learn     | BookOpen   | learn     |
| 2   | Train     | Dumbbell   | train     |
| 3   | Skills    | GitBranch  | skills    |
| 4   | Integrity | Heart      | integrity |
| 5   | Progress  | TrendingUp | progress  |


**File: `src/pages/Index.tsx**`

Update `renderView()` to route to:

- `learn` — New LearnPathView (skill path selection + why it matters)
- `train` — Restructured TrainingView (STACKED day-based sessions)
- `skills` — Existing SkillTreeView (with non-negotiables banner)
- `integrity` — New IntegrityView (standalone mobility/yoga blocks)
- `progress` — ProgressView (gates passed, best holds, journal — remove streaks)

---

## 3. Global Non-Negotiables Banner

**New file: `src/components/NonNegotiables.tsx**`

A persistent, compact banner/card shown on every drill card and session screen:

- "Ribs Down" / "Glutes 30%" / "Shoulders Tall" / "Active Legs"
- Each with a one-line description expandable on tap
- Styled as a thin brutalist strip with ink borders
- Reusable component imported into Train, Skills, and Integrity views

---

## 4. STACKED Week Cycle

**New file: `src/data/stackedWeek.ts**`

Define the 4+1 day cycle:

- Day A: Leverage (Planche Path / Straight-arm push)
- Day B: Pull + Grip (Rings dominant)
- Day C: Inversions + Shoulder Control
- Day D: Legs + Mobility
- Day E (optional): Light skill play / recovery

Each day includes: warm-up, main block, accessory, integrity block, cool-down structure.

**File: `src/components/TrainingView.tsx**`

Restructure from the current 4-pillar card layout to the STACKED day-cycle:

- Show today's recommended day (based on rotation from localStorage)
- Auto-build session from selected Skill Path + Gate
- Session structure: warm-up → main drills → accessory → integrity → cool-down
- Non-negotiables reminder before starting
- Remove mock "Today's Plan" data from CompactDashboard

---

## 5. Learn Path View (New Tab)

**New file: `src/components/LearnPathView.tsx**`

The "Learn" tab — entry point for choosing a Skill Path:

- Display available paths (Planche, Handstand, Pull-up, Front Lever, etc.)
- Each path shows: current Gate (L1-L4), description, "Why this matters" blurb
- Selecting a path auto-builds that day's STACKED session
- Integrates existing Learn Mode principles (LearnTab cards) contextually
- "Barre + Pilates — coming soon" teaser card at bottom

---

## 6. Integrity View (New Tab)

**New file: `src/components/IntegrityView.tsx**`

Standalone mobility/yoga blocks:

- Wrist prep, thoracic mobility, hip opening, pancake, ankle mobility
- Each block is a timed sequence with cues
- Non-negotiables reminders (ribs down in pancake, shoulders tall in wrist work)
- Can be done as standalone sessions or as part of STACKED Day D

---

## 7. Content Data Files

**New file: `src/data/controlContent.ts**`

Store the NotebookLM content as typed data:

- App philosophy and tagline
- Global non-negotiables with full descriptions and fix cues
- STACKED week cycle definitions
- Common violations and quick fixes
- Coming soon features

This replaces hardcoded strings throughout the app with a single source of truth.

---

## 8. Full Project Download Button

**File: `src/pages/Index.tsx` or new `src/components/DownloadProject.tsx**`

Add a single "Download Full Project" button accessible from a settings/menu area:

- Exports all app data as a structured JSON file
- Includes: skill progress, workout logs, learn mode settings, calendar data
- Uses existing Blob/download pattern from FileManager
- Clean, minimal — one button, no file manager UI

---

## 9. Remove Streaks & Gamification

**File: `src/components/CompactDashboard.tsx**`

- Remove "7 Day Streak", "12 New PRs", "85% Goal Progress" achievement card
- Replace with: gates passed summary, best holds, recent journal entries
- Remove mock data ("3 exercises" in Today's Plan)

**File: `src/components/UpdatesTab.tsx**`

- Keep but update version info and content to reflect CONTROL rebrand

---

## 10. Clean Up Unused Components

Remove or archive components no longer needed in the new nav structure:

- `FileManager.tsx` (replaced by single download button)
- `DisciplineLibrary.tsx` (replaced by SkillTreeView)
- `CompactWeatherWidget.tsx` (keep DetailedWeatherWidget only)
- `ThemeSelector.tsx` (simplify to brutalist light/dark toggle)

---

## Files Summary


| File                                  | Action | Description                             |
| ------------------------------------- | ------ | --------------------------------------- |
| `src/index.css`                       | Modify | Brutalist design system                 |
| `src/components/ThemeProvider.tsx`    | Modify | Brutalist default, remove vacation/vasa |
| `src/pages/Index.tsx`                 | Modify | Rebrand header, new nav routing         |
| `src/components/BottomNavBar.tsx`     | Modify | 5-tab CONTROL nav                       |
| `src/data/controlContent.ts`          | Create | App content source of truth             |
| `src/data/stackedWeek.ts`             | Create | STACKED week cycle data                 |
| `src/components/NonNegotiables.tsx`   | Create | Persistent cues banner                  |
| `src/components/LearnPathView.tsx`    | Create | Learn tab - skill path selection        |
| `src/components/IntegrityView.tsx`    | Create | Integrity tab - mobility/yoga           |
| `src/components/TrainingView.tsx`     | Modify | STACKED day-based sessions              |
| `src/components/CompactDashboard.tsx` | Modify | Remove gamification/mock data           |
| `src/components/DownloadProject.tsx`  | Create | One-button project export               |
| `src/components/UpdatesTab.tsx`       | Modify | Rebrand to CONTROL                      |


---

## Implementation Order

1. Create data files (controlContent, stackedWeek)
2. Apply brutalist design system (CSS + ThemeProvider)
3. Rebrand header and navigation (BottomNavBar + Index)
4. Build NonNegotiables component
5. Build LearnPathView
6. Restructure TrainingView for STACKED cycle
7. Build IntegrityView
8. Remove gamification from dashboard
9. Add download button
10. Polish and verify all navigation flows