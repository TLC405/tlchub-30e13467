

# Major App Overhaul — Rebrand, New Layout, Coach TLC AI, Gyms & Classes

## Summary

This is a significant restructuring: rename the app, change the tagline, replace the Integrity tab with a Coach TLC AI assistant, rename Progress to "Gyms & Classes", redesign the landing experience to be day-selection-first, remove all Lovable branding, and add "Powered by TLC" + "Men of Purpose OKC" branding throughout.

---

## 1. Rebrand — Name & Tagline

**Files: `src/data/controlContent.ts`, `src/pages/Index.tsx`, `index.html`**

- App name: **CONTROL** (keep)
- Tagline change: `"Calisthenics · Yoga · Balance · Mobility"` → `"Olympic Mastery"`
- Remove all Lovable references from `index.html` (OG images, twitter:site, meta author)
- Replace with "CONTROL — Powered by TLC" and "Men of Purpose OKC Foundation"

---

## 2. Remove Lovable Branding Everywhere

**Files: `index.html`, `vite.config.ts`**

- Remove `lovable-tagger` import from vite config (or keep but it's cosmetic)
- Replace OG image URLs and twitter:site with TLC/Men of Purpose branding
- Update page title to "CONTROL — Olympic Mastery | Powered by TLC"

---

## 3. Navigation Restructure

**File: `src/components/BottomNavBar.tsx`**

New 5-tab layout:

| Tab | Label | Icon | View ID |
|-----|-------|------|---------|
| 1 | Learn | BookOpen | learn |
| 2 | Train | Dumbbell | training |
| 3 | Skills | GitBranch | skills |
| 4 | Coach TLC | Brain | coach |
| 5 | Gyms | MapPin | gyms |

- "Integrity" tab → **Coach TLC** (AI assistant)
- "Progress" tab → **Gyms & Classes** (find fitness in your area)

---

## 4. Landing Experience — "What kind of day do you want?"

**File: `src/pages/Index.tsx`**

Instead of defaulting to Learn tab, the app opens to the **Train** tab showing the STACKED day selector. The user immediately chooses what kind of day they want (Leverage, Pull+Grip, Inversions, Legs, Skill Play).

Set `activeView` default to `"training"` instead of `"learn"`.

---

## 5. Coach TLC — Replace Integrity Tab

**File: `src/components/IntegrityView.tsx` → repurpose or new `CoachTLC.tsx`**

Restyle the existing `AgentTLC.tsx` component with brutalist design to serve as the Coach TLC tab. This is the AI that:
- Chats about training, nutrition, psychology, life coaching
- Analyzes social media fitness videos (YouTube, Instagram, TikTok)
- Finds gyms, classes, and fitness in user's area
- Creates workout slides and visual content
- Master trainer + life coach + psychology expert persona

Restyle `AgentTLC.tsx` to match brutalist design (remove gradients, shadows — use 3px ink borders, 24px radius, font-serif headers). Add "Powered by TLC" badge prominently.

**File: `src/pages/Index.tsx`**

Route `coach` view to the restyled AgentTLC component.

---

## 6. Gyms & Classes — Replace Progress Tab

**New file: `src/components/GymsClassesView.tsx`**

A new view replacing Progress that helps users find fitness in their area:
- Search input for location/zip code
- Categories: Calisthenics Parks, Yoga Studios, CrossFit, Martial Arts, Open Gyms, Group Classes
- Placeholder cards for nearby results (mock data — real API integration later)
- "Powered by TLC" badge
- "Men of Purpose OKC Foundation" featured section at bottom

---

## 7. "Powered by TLC" Branding

**Files: `src/pages/Index.tsx`, `src/components/BottomNavBar.tsx`, multiple views**

Add branding throughout:
- Header: "CONTROL" with "Olympic Mastery" underneath, small "Powered by TLC" badge
- Footer area above bottom nav: "Powered by TLC · Men of Purpose OKC Foundation"
- Coach TLC tab header: prominent TLC branding
- Gyms tab: "Powered by TLC" on search results
- Learn tab: subtle "Powered by TLC" at bottom

---

## 8. Move Integrity Blocks

Since the Integrity tab is being replaced by Coach TLC, the integrity mobility blocks (wrist prep, thoracic, etc.) need a new home. Move them into the **Train** tab as an expandable "Integrity Blocks" section at the bottom of the day selector, so users can still access standalone mobility work.

**File: `src/components/TrainingView.tsx`**

Add a collapsible "Integrity Blocks" section below the STACKED day cards.

---

## Files Summary

| File | Action | Description |
|------|--------|-------------|
| `src/data/controlContent.ts` | Modify | Update tagline to "Olympic Mastery" |
| `index.html` | Modify | Remove Lovable branding, update meta |
| `src/pages/Index.tsx` | Modify | Default to Train, route coach/gyms, add TLC branding |
| `src/components/BottomNavBar.tsx` | Modify | New 5 tabs (Coach TLC, Gyms) |
| `src/components/AgentTLC.tsx` | Modify | Brutalist restyle + Coach TLC persona |
| `src/components/GymsClassesView.tsx` | Create | New Gyms & Classes view |
| `src/components/TrainingView.tsx` | Modify | Add integrity blocks section, default landing |
| `src/components/IntegrityView.tsx` | Keep | Still used when navigating from Train blocks |

## Implementation Order

1. Data + meta updates (controlContent, index.html)
2. Navigation restructure (BottomNavBar, Index routing)
3. Default to Train tab
4. Create GymsClassesView
5. Restyle AgentTLC for brutalist Coach TLC
6. Add "Powered by TLC" + "Men of Purpose OKC" branding everywhere
7. Move integrity blocks into Train tab

