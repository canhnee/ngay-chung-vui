# ✨ WEDDING INVITATION FEATURES

## 🎨 Visual Design System

### Typography
- **Serif Font**: Cormorant Garamond (elegant, romantic)
- **Sans Font**: Montserrat (clean, modern)
- Letter-spacing for luxury feel
- Multiple font weights for hierarchy

### Color Palette
- **Primary**: Black backgrounds
- **Accents**: White/off-white text
- **Overlays**: Gradient blacks with opacity
- **Decorations**: Pink, purple, blue tints for anime sections
- **Particles**: White with low opacity (5-30%)

### Layout Principles
- Full-screen sections
- Asymmetric photo grids
- Masonry layouts over regular grids
- Overlapping elements for depth
- Generous white space (or black space)

---

## 🎬 Animation Catalog

### Entrance Animations
1. **Fade In** - Opacity 0 → 1
2. **Blur to Sharp** - Filter blur(10px) → blur(0)
3. **Scale Up** - Transform scale(0.9) → scale(1)
4. **Slide Up** - TranslateY(30-80px) → translateY(0)
5. **Stagger** - Sequential reveals with delays

### Scroll Animations
1. **Parallax** - Different scroll speeds for layers
2. **Zoom Out** - Scale reduces as you scroll
3. **Fade Out** - Opacity reduces on scroll
4. **Intersection Observer** - Triggers on viewport entry

### Continuous Animations
1. **Float** - Particles moving upward
2. **Pulse** - Subtle scale breathing
3. **Sakura Fall** - Cherry blossoms falling
4. **Light Sweep** - Rays moving across screen
5. **Rotate** - Petals rotating while falling

### Hover Animations
1. **Scale** - Image grows on hover (1 → 1.1)
2. **Overlay Fade** - Gradient appears
3. **Border Glow** - Border opacity increases
4. **Button Lift** - Shadow and translate-y

---

## 🎯 Interactive Elements

### Click Interactions
- ✅ TAP TO OPEN envelope
- ✅ Music ON/OFF toggle
- ✅ Gallery photo expand
- ✅ Video play/pause
- ✅ Modal close
- 🚧 Location map links (coming)
- 🚧 RSVP form (coming)

### Scroll Interactions
- ✅ Parallax hero
- ✅ Section reveals
- ✅ Photo stagger reveals
- ✅ Scroll indicator

### Auto Interactions
- ✅ Opening animation sequence
- ✅ Sakura falling continuously
- ✅ Particle floating
- ✅ Light sweeps
- 🚧 Story Mode auto-scroll (coming)

---

## 📸 Photo Organization Strategy

### Section Distribution (28 total)
```
Opening    ━━━  3 photos  (hero + intro)
Story      ━━━━━  5 photos  (relationship journey)
Gallery    ━━━━━━━━━━  10 photos  (main showcase)
Anime      ━━━  3 photos  (dream sequence)
Finale     ━━━━  4 photos  (closing moments)
Extra      ━━━  3 photos  (transitions/details)
```

### Photo Treatment
- Different sizes for visual hierarchy
- Some full-screen, some card-style
- Varied aspect ratios
- Strategic cropping
- Blur transitions between sections
- Caption overlays on hover

---

## 🎵 Audio System

### Implementation
```
User lands → NO AUDIO
    ↓
TAP TO OPEN clicked
    ↓
audio.play() + audio.volume = 1
    ↓
Music continues globally
    ↓
User can toggle ON/OFF
```

### Features
- ✅ Single audio instance (no duplicates)
- ✅ Volume always at maximum (HTML Audio = 1)
- ✅ No volume slider (per requirements)
- ✅ Simple ON/OFF toggle only
- ✅ Continues across page sections
- ✅ Elegant floating control button
- ✅ Respects browser autoplay policies

---

## 🎭 Special Effects

### Film Grain
- SVG noise overlay
- Opacity: 3-5%
- Covers full viewport
- Creates cinematic feel

### Vignette
- CSS box-shadow inset
- Darkens edges
- Focuses attention center
- Subtle depth perception

### Gradients
1. **Vertical**: top-to-bottom for text readability
2. **Radial**: center-out for focus
3. **Multi-stop**: complex color transitions
4. **Overlay blends**: for color tinting

### Particles
1. **Floating dots** (20 count)
2. **Sakura petals** (30 count)
3. **Hearts** (8 count)
4. **Light rays** (5 count)

---

## 📱 Responsive Breakpoints

```css
Mobile:   < 768px  (2 columns gallery)
Tablet:   768-1023px  (3 columns gallery)
Desktop:  1024-1439px  (4 columns gallery)
Large:    1440px+  (max-width constrained)
```

### Mobile Optimizations
- Stack layouts vertically
- Larger touch targets
- Simplified animations
- Reduced particle count
- Optimized image sizes

---

## ♿ Accessibility Features

### Keyboard Navigation
- Focus indicators on interactive elements
- Tab order logical
- Escape key closes modals
- Enter/Space activates buttons

### Screen Readers
- Alt text on all images
- ARIA labels on icon buttons
- Semantic HTML structure
- Heading hierarchy maintained

### Motion Preferences
- `prefers-reduced-motion` detection
- Disable animations when requested
- Fallback to instant transitions
- Content still accessible

### Visual
- High contrast text/background
- Readable font sizes (min 14px)
- Not relying on color alone
- Touch targets 44px minimum

---

## ⚡ Performance Optimizations

### Images
- ✅ Lazy loading (`loading="lazy"`)
- ✅ Proper alt attributes
- 🚧 WebP/AVIF formats (coming)
- 🚧 Responsive srcset (coming)
- 🚧 Blur placeholders (coming)

### Code
- ✅ Component-based architecture
- ✅ React hooks for state
- ✅ Memoization where needed
- 🚧 Code splitting (coming)
- 🚧 Dynamic imports (coming)

### Animations
- ✅ GSAP for complex sequences
- ✅ CSS for simple effects
- ✅ IntersectionObserver for triggers
- ✅ RequestAnimationFrame implied
- ✅ Cleanup on unmount

### Bundle
- Current: 545KB minified
- 🚧 Will optimize in STEP 22
- 🚧 Tree shaking
- 🚧 Chunk splitting

---

## 🎪 Section-by-Section Breakdown

### 1. Opening (STEP 7-8)
**Duration**: ~8 seconds
- Black screen intro
- "A STORY IS ABOUT TO BEGIN" (2s fade in/out)
- Couple names reveal (2s)
- Subtitle appear (1s)
- Envelope + button visible
- **Interaction**: TAP TO OPEN triggers music

### 2. Hero (STEP 9)
**Height**: 100vh
- Full-screen hero photo
- Slow zoom animation (3s)
- Continuous subtle zoom
- Parallax on scroll
- Couple names centered
- Date & time below
- Scroll indicator

### 3. Story (STEP 10)
**Height**: Variable (depends on photos)
- Chapter title "II."
- 5-6 photos
- Alternating layouts
- Stagger reveal (0.15s delay each)
- Captions on overlay
- Decorative lines

### 4. Gallery (STEP 11)
**Height**: Variable
- Chapter title "III."
- Masonry grid layout
- 8-10 photos
- Hover effects
- Click → fullscreen modal
- Floating hearts

### 5. Anime Transition (STEP 12)
**Height**: 100vh
- 3 photos cross-fading
- Sakura petals falling
- Light rays sweeping
- "Like a Dream Come True" text
- Color overlays
- Film grain

### 6. Video (STEP 13)
**Height**: Variable
- Chapter title "IV."
- Video grid (2 columns on desktop)
- Custom play controls
- Thumbnail posters
- Auto-pause others

### 7. Wedding Details (Coming - STEP 14)
**Height**: 100vh
- "THE DAY HAS COME"
- Date display (lunar + solar)
- Time
- Elegant typography

### 8. Countdown (Coming - STEP 15)
**Height**: ~50vh
- Days, hours, minutes, seconds
- Real-time updates
- Elegant number display

### 9. Locations (Coming - STEP 16)
**Height**: ~80vh
- Two cards (Groom + Bride)
- Addresses
- Google Maps links
- Journey visualization

### 10. Finale (Coming - STEP 17)
**Height**: 100vh
- Final photo
- "THANK YOU" message
- Couple names
- Date
- Infinity symbol (∞)
- Fade to black
- Music fade out

---

## 🎯 UX Modes (Coming - STEP 18)

### Quick Explore Mode
- **Default behavior**
- User scrolls freely
- ~20 seconds to see all content
- All sections visible
- Skip-friendly

### Story Mode
- **Activated by button**: "▶ PLAY OUR STORY"
- Auto-scrolls through sections
- ~60 seconds total duration
- Pauses on key moments
- User can stop anytime
- Graceful exit on manual scroll

---

## 🔐 Data Flow

```
WeddingPage Component
    ↓
useWedding('slug')
    ↓
Check Supabase URL configured?
    ↓           ↓
   Yes          No
    ↓           ↓
Fetch DB   Use Fallback
    ↓           ↓
Success?    Static Data
    ↓  ↓
  Yes  No
    ↓  ↓
Use DB  Fallback
    ↓
Render with data
```

### Fallback Strategy
- Always have static data ready
- Never show empty/broken UI
- Log errors but don't crash
- Inform admin in dashboard (later)

---

## 🎨 Design Philosophy

### "Cinematic First"
- Treat like a short film
- Every transition meaningful
- Pacing matters
- Emotional beats
- Not just "a website"

### "Story Over Tech"
- Features serve the narrative
- Don't add effects for show
- Each animation has purpose
- Human connection priority

### "Elegant Simplicity"
- Clean layouts
- Generous space
- Subtle over flashy
- Quality over quantity
- Let photos speak

### "Mobile Matters"
- Not an afterthought
- First-class mobile UX
- Touch-friendly
- Performance conscious
- Progressive enhancement

---

Last updated: STEP 13 completed
