

# Custom Video Player + Rebrand + UI Polish

## Summary

Replace all YouTube iframes with a clean, branded video player using **react-player** (open-source, 8k+ GitHub stars, supports YouTube/Vimeo/direct URLs without YouTube branding). Remove all "Men of Purpose OKC" references, rebrand to "Inspire Oklahoma City". Polish the core layout and typography.

---

## 1. Replace YouTube Embeds with react-player

**Add dependency:** `react-player` — lightweight, open-source, supports YouTube (no branding), Vimeo, direct MP4, and more. Renders a clean player with no YouTube logo, suggested videos, or watermarks when using `youtube-nocookie.com`.

**Rewrite `src/components/VideoPlayer.tsx`:**
- Remove the raw `<iframe>` embed entirely
- Use `ReactPlayer` with `youtube-nocookie.com` domain, `controls=true`, custom wrapper
- Clean card design: title bar, aspect-ratio video, minimal play/fullscreen controls
- No YouTube branding visible — just a clean black player with your own styled overlay
- Support fullscreen via native HTML5 fullscreen API

**Update `src/components/DetailedExerciseCard.tsx`:**
- Replace `window.open(exercise.youtubeUrl)` "Watch" button with an inline expand that renders the new `VideoPlayer` component directly in the card
- No more opening external YouTube tabs

**Update `src/components/SkillTreeView.tsx`:**
- Replace the "Watch Demo — YouTube" button with inline `VideoPlayer` embed when clicked
- Cleaner UX: video plays inside the skill detail panel

## 2. Rebrand: Remove "Men of Purpose OKC" → "Inspire Oklahoma City"

**File: `src/data/controlContent.ts`:**
- `APP_FOUNDATION` → `"Inspire Oklahoma City"`
- Add `APP_COPYRIGHT` = `"© 2026 Inspire Oklahoma City. All rights reserved."`
- Add `APP_VERSION` = `"1.0.0"`

**File: `src/components/BottomNavBar.tsx`:**
- Footer text: `"© 2026 Inspire Oklahoma City · Powered by TLC · v1.0.0"`

**File: `index.html`:**
- Update meta tags to remove "Men of Purpose OKC" references

## 3. Layout & Core Polish

**File: `src/pages/Index.tsx`:**
- Tighten header: reduce from `h-14` to `h-12`, cleaner spacing
- Remove the `DownloadProject` button from header (development tool, not user-facing)

**File: `src/index.css`:**
- Remove the background grid lines (the blueprint pattern) — cleaner, more professional look
- Tighten card border radius from `1.5rem` to `1rem` for a sharper feel
- Improve the bottom nav safe area spacing

**File: `src/components/BottomNavBar.tsx`:**
- Add `safe-area-inset-bottom` padding for mobile
- Professional copyright footer with version

## Files Summary

| File | Action |
|---|---|
| `package.json` | Add `react-player` dependency |
| `src/components/VideoPlayer.tsx` | Rewrite — react-player, no YouTube branding |
| `src/components/DetailedExerciseCard.tsx` | Modify — inline video player instead of external link |
| `src/components/SkillTreeView.tsx` | Modify — inline video player in skill details |
| `src/data/controlContent.ts` | Modify — rebrand to Inspire Oklahoma City + copyright |
| `src/components/BottomNavBar.tsx` | Modify — professional footer + safe area |
| `src/pages/Index.tsx` | Modify — tighter header, remove dev buttons |
| `src/index.css` | Modify — remove grid, tighten radius |
| `index.html` | Modify — update meta tags |

