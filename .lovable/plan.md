

## Atomic Visual Overhaul + Detailed Animations

### Current State Analysis
The app uses a **Bold Elegance** theme (gold #D4A843, monochrome palette) with minimal animations (basic fade-in and accordion). The UI is clean and functional but lacks the micro-interactions and polish expected in modern fitness apps.

### Planned Changes

#### 1. **Enhanced Animation System** (tailwind.config.ts)
Add comprehensive keyframes and utilities:
- **Slide animations**: slide-in/out from all directions (up, down, left, right)
- **Scale animations**: scale-in, scale-out, pulse, bounce
- **Fade animations**: fade-in-up, fade-in-down with transforms
- **Stagger utilities**: for list items (0.05s per child)
- **Spring easing**: cubic-bezier(0.34, 1.56, 0.64, 1) for playful bounces
- **Glow/pulse**: for active states and notifications

#### 2. **Global CSS Utilities** (src/index.css)
New classes for consistent micro-interactions:
- `.interactive-scale`: hover:scale-[1.02] + active:scale-[0.98] with smooth transition
- `.interactive-lift`: translateY(-2px) on hover with shadow increase
- `.smooth-colors`: transition-colors duration-200
- `.card-glass`: backdrop-blur + subtle gradient overlay
- `.shimmer`: animated gradient for loading states
- `.ripple`: click ripple effect for buttons

#### 3. **Component-Specific Enhancements**

**SkillTreeView.tsx**:
- Grid cards: staggered entrance (delay: index * 50ms), scale + shadow on hover
- Expanded step cards: smooth height animation with spring easing
- Video thumbnails: scale on hover, play icon pulse
- Progress bars: animated fill with 0.5s ease-out
- Level badges: gentle rotation on first render
- Completion checkmark: scale bounce on mark complete

**TrainingView.tsx**:
- Day headers: smooth accordion with opacity fade on content
- Block cards: slide-in-left on expand, staggered per block
- Checkmark animation: scale + rotate on complete
- Pain flag: shake animation + destructive color pulse
- Completion counter: number count-up animation

**AttributeGraph.tsx**:
- Bar segments: sequential fill animation (stagger: 30ms per bar)
- Compact mode: pulse on hover to show detail
- Color transitions: smooth gradient shifts on theme change

**BottomNavBar.tsx**:
- Active indicator: smooth slide animation (transform + transition)
- Icons: scale up on tap, subtle bounce on active
- Labels: fade in on selection
- Ripple effect on tap

**TLCtvView.tsx**:
- Chat messages: slide-in-up + fade for each message
- User messages: slide from right
- AI messages: slide from left with typing indicator
- Video grid: staggered card entrance
- Chat toggle: smooth height transition

#### 4. **Performance Considerations**
- All animations use CSS transforms (translateX/Y, scale) for GPU acceleration
- Duration kept under 300ms for responsiveness (except decorative animations)
- Respect `prefers-reduced-motion` media query
- Use `will-change` sparingly for known animated elements
- Intersection Observer for staggered entrance (only animate visible items)

#### 5. **Visual Depth & Polish**
- **Shadows**: 3-tier system (subtle, medium, elevated)
- **Borders**: animated border-color on focus/hover
- **Glass effects**: backdrop-blur on overlays and modals
- **Progress indicators**: animated gradient shifts
- **Loading states**: skeleton screens with shimmer
- **Success states**: confetti-style particles (micro-celebration)

### Technical Approach
1. Update `tailwind.config.ts` with new keyframes and animation utilities
2. Enhance `src/index.css` with custom animation classes and utilities
3. Refactor each component to add transition classes and animation states
4. Add `animate-*` classes to list items with stagger delay calculation
5. Wrap interactive elements with proper hover/active/focus states
6. Test on mobile for touch feedback (reduce scale values)

### Files to Modify
- `tailwind.config.ts` (animation system)
- `src/index.css` (utilities + global animations)
- `src/components/SkillTreeView.tsx` (cards, progress, expansion)
- `src/components/TrainingView.tsx` (accordion, blocks, completion)
- `src/components/AttributeGraph.tsx` (bar animations)
- `src/components/BottomNavBar.tsx` (navigation transitions)
- `src/components/TLCtvView.tsx` (chat animations)
- `src/components/ui/button.tsx` (ripple effect)
- `src/components/ui/card.tsx` (glass effect variant)
- `src/components/ui/progress.tsx` (animated fill)

### Expected Outcome
A **premium, tactile UI** with smooth micro-interactions that reinforce user actions. Every tap, expand, and completion feels responsive and intentional. The animations follow the Bold Elegance aesthetic—subtle but confident, fast but smooth, functional but delightful.

