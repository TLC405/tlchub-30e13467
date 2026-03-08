

# TLC TRAINER -- Bold Elegance Redesign

## What you asked for

1. Rename app from "CONTROL" to **TLC TRAINER** -- remove the old tagline ("Olympic Mastery")
2. Create a custom **TLC shield logo** (OKC Thunder style -- black shield with gold "TLC" inside), rendered as an SVG component
3. Replace the **Coach TLC tab** with a **TLCtv video library** tab (Netflix-style scrollable video feed)
4. **Complete layout overhaul** following "Bold Elegance" design law: near-black/off-white backgrounds, no gradients, no glassmorphism, one gold accent, firm corners, tactile buttons, generous whitespace
5. New components and upgraded navigation

## Design Token System (Bold Elegance)

```text
PALETTE
  Background:   #0A0C10 (near-black) / #FAFAFA (off-white for light)
  Foreground:   #FAFAFA / #0A0C10
  Card:         #141619 / #F0F0F0
  Accent:       #D4A843 (gold -- ONE accent only)
  Muted:        #2A2D33 / #E0E0E0
  Border:       #2A2D33 / #D0D0D0
  Destructive:  #CC3333

TYPOGRAPHY
  Headlines:    Inter 700/800 (drop Playfair Display -- too editorial)
  Body:         Inter 400/500
  Mono:         JetBrains Mono (keep)

SPACING
  Radius:       8px (firm, not bubbly)
  Card border:  1px solid (not 3px brutalist -- too heavy)
  Shadows:      subtle 0 1px 3px rgba(0,0,0,0.2) for depth

MOTION
  Transitions:  150-250ms ease
  No stagger animations (too playful)
```

## Architecture Changes

### Branding (`src/data/controlContent.ts`)
- `APP_NAME` = "TLC TRAINER"
- Remove `APP_TAGLINE`
- `APP_POWERED_BY` = "Powered by TLC"
- Keep `APP_FOUNDATION`, `APP_COPYRIGHT`, `APP_VERSION`

### New: TLC Shield Logo (`src/components/TLCLogo.tsx`)
- SVG component: black shield shape (like OKC Thunder's shield silhouette) with gold "TLC" text centered
- Accepts `size` prop (sm/md/lg)
- Used in header and splash/loading states

### New: TLCtv Tab (`src/components/TLCtvView.tsx`)
- Replaces Coach TLC in bottom nav
- Scrollable video library organized by skill path (Planche, Front Lever, etc.)
- Each section: horizontal scroll of video cards
- Video cards tap to expand inline `VideoPlayer`
- Videos sourced from `skillProgressions` data (existing YouTube IDs)
- Empty state if no videos: "No videos yet" with icon

### Navigation Changes (`src/components/BottomNavBar.tsx`)
- Replace `{ id: "coach", title: "Coach", icon: Brain }` with `{ id: "tlctv", title: "TLCtv", icon: Tv }`
- 5 tabs: Learn, Train, Skills, TLCtv, Gyms

### Header Redesign (`src/pages/Index.tsx`)
- TLC shield logo (small) + "TLC TRAINER" text -- no tagline
- Theme toggle on right
- Clean black bar (dark) or white bar (light)

### CSS Overhaul (`src/index.css`)
- Replace entire color token system with Bold Elegance palette
- Remove brutalist-card class (3px borders, 24px radius)
- Remove blueprint-underline, stagger-children animations
- New utility classes: `.card-elevated` (subtle shadow), `.gold-accent` (text color)
- Firm 8px radius everywhere

### Component Updates
All existing views (TrainingView, LearnPathView, SkillTreeView, GymsClassesView) get:
- Border reduced from `border-[3px] border-foreground rounded-[24px]` to `border border-border rounded-lg`
- Remove `card-lift` hover effects (too playful)
- Firm, tactile buttons with subtle shadow
- Gold accent on active/primary states instead of blue

## Files Summary

| File | Action |
|---|---|
| `src/data/controlContent.ts` | Rename to TLC TRAINER, remove tagline |
| `src/components/TLCLogo.tsx` | **New** -- SVG shield logo (black + gold) |
| `src/components/TLCtvView.tsx` | **New** -- video library tab |
| `src/index.css` | **Rewrite** -- Bold Elegance tokens |
| `src/pages/Index.tsx` | Redesign header with logo |
| `src/components/BottomNavBar.tsx` | Replace Coach with TLCtv |
| `src/components/TrainingView.tsx` | Restyle cards to new design system |
| `src/components/LearnPathView.tsx` | Restyle cards to new design system |
| `src/components/SkillTreeView.tsx` | Restyle cards to new design system |
| `src/components/GymsClassesView.tsx` | Restyle cards to new design system |
| `src/components/VideoPlayer.tsx` | Update to match new tokens |
| `src/components/ThemeSelector.tsx` | Restyle button |
| `index.html` | Update title to "TLC TRAINER" |

