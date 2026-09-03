# 💍 Thiệp Cưới - Wedding Invitation Website

> A cinematic, interactive wedding invitation website built with React, TypeScript, and Supabase

## 🎯 Project Status

This is a luxury wedding invitation website being built following a comprehensive master plan. The project creates a cinematic experience rather than just a simple wedding card.

### ✅ Completed Steps (STEP 1-17)

- [x] **STEP 1-2**: Project setup (Vite, React, TypeScript, Tailwind, GSAP, Supabase)
- [x] **STEP 3**: Supabase client configuration
- [x] **STEP 4**: TypeScript types and database types
- [x] **STEP 5**: Database schema (SQL file ready)
- [x] **STEP 6**: Fallback data for 28 photos
- [x] **STEP 7**: Opening screen with cinematic animation
- [x] **STEP 8**: TAP TO OPEN interaction + Music system
- [x] **STEP 9**: Hero section with parallax and zoom effects
- [x] **STEP 10**: Story section with photo grid
- [x] **STEP 11**: Photo Gallery with masonry layout and modal
- [x] **STEP 12**: Anime wedding transition with sakura petals
- [x] **STEP 13**: Video section with custom controls
- [x] **STEP 14**: Wedding Details with elegant date display
- [x] **STEP 15**: Countdown timer (real-time, days/hours/minutes/seconds)
- [x] **STEP 16**: Two locations with Google Maps integration
- [x] **STEP 17**: Finale with emotional ending and fade to black

### 🚧 Next Steps

- [ ] **STEP 18**: Story Mode (auto-scroll through sections)
- [ ] **STEP 19**: Admin dashboard for content management
- [ ] **STEP 20**: Complete Supabase integration
- [ ] **STEP 21**: Responsive design optimization
- [ ] **STEP 22**: Performance optimization
- [ ] **STEP 23**: Deploy to Vercel
- [ ] **STEP 18**: Story Mode (auto-play)
- [ ] **STEP 19**: Admin dashboard
- [ ] **STEP 20**: Complete Supabase integration
- [ ] **STEP 21**: Responsive design
- [ ] **STEP 22**: Performance optimization
- [ ] **STEP 23**: Deploy to Vercel

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Environment Setup

1. Copy `.env.example` to `.env`:

```bash
copy .env.example .env
```

2. Add your Supabase credentials to `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📦 Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4
- **Animation**: GSAP
- **Backend**: Supabase (BaaS)
- **Routing**: React Router DOM
- **Fonts**: Cormorant Garamond (serif), Montserrat (sans)

## 🗄️ Database Setup

1. Go to your Supabase project
2. Open SQL Editor
3. Run the SQL commands from `SUPABASE_SCHEMA.sql`
4. This will create all tables and seed initial data

## 🎨 Key Features

### Current Implementation

1. **Opening Experience**
   - Black screen intro with "A STORY IS ABOUT TO BEGIN"
   - Cinematic name reveal with particles
   - Envelope animation
   - TAP TO OPEN interaction

2. **Music System**
   - No autoplay (respects browser policies)
   - Music starts ONLY after user clicks TAP TO OPEN
   - HTML Audio volume set to maximum (volume = 1)
   - Music ON/OFF toggle (no volume slider as per requirements)
   - Single audio instance throughout the app
   - Elegant floating music control button

3. **Data Architecture**
   - Dynamic data from Supabase
   - Fallback to static data if Supabase unavailable
   - 28 wedding photos organized by sections
   - TypeScript strict typing

4. **Hero Section**
   - Full-screen hero image with slow zoom effect
   - Blur-to-sharp entrance animation
   - Parallax scrolling on scroll
   - Couple names with elegant serif typography
   - Date and time display
   - Film grain and vignette effects
   - Floating petals animation

5. **Story Section**
   - Chapter title "II. Our Story"
   - Alternating photo layouts for visual interest
   - Staggered reveal animations (IntersectionObserver)
   - Different photo heights
   - Photo captions support
   - Floating particles

6. **Gallery Section**
   - Masonry grid layout (responsive 2-4 columns)
   - Varied photo heights for editorial aesthetic
   - Some photos span 2 columns for emphasis
   - Hover effects with gradient overlay
   - Click to expand to fullscreen
   - Fullscreen modal with close button
   - Caption display in modal
   - Floating hearts animation

7. **Anime Transition**
   - Dream-like transition between photos
   - Sakura (cherry blossom) petals falling
   - Light sweep effects across screen
   - Color overlays for anime aesthetic
   - "Like a Dream Come True" text
   - Sequential image cross-fades with blur

8. **Video Section**
   - Responsive video grid
   - Custom play/pause controls
   - Video thumbnail posters
   - Play button overlay with hover effect
   - Auto-pause other videos when one plays
   - Muted autoplay support
   - Decorative background effects

9. **Wedding Details**
   - "V. The Day Has Come" chapter title
   - Elegant date card with decorative corners
   - Solar calendar date (large display)
   - Lunar calendar date
   - Ceremony time
   - Parents' names display
   - Infinity symbol
   - Floating ring decorations

10. **Countdown Timer**
    - Real-time countdown to party date
    - Days, hours, minutes, seconds
    - Glass-morphism card design
    - Tabular numbers for consistency
    - "Coming Soon" fallback if no date
    - "The Day Has Arrived" if date passed
    - Purple glow background effect

11. **Locations**
    - Two location cards (Groom + Bride)
    - Home icons with color coding (blue/pink)
    - Full addresses
    - Google Maps integration (opens in new tab)
    - Hover effects on cards
    - Decorative corners animation
    - Journey visualization with animated dot
    - "THE JOURNEY OF TWO HEARTS" text

12. **Finale**
    - Sequential photo transitions (3 finale photos)
    - "Thank You For Being Part Of Our Story"
    - Couple names reveal
    - Wedding date display
    - Infinity symbol with rotation animation
    - "Forever Begins Here" final message
    - Falling petals animation
    - Fade to black ending
    - Music fade out callback

### Planned Features

- Two UX modes:
  - **Quick Explore**: ~20 seconds scroll-through
  - **Story Mode**: ~60 seconds auto-guided experience
- Anime wedding scene transition
- Interactive photo gallery
- Countdown to wedding day
- Two ceremony locations with Google Maps
- Admin dashboard for content management
- Real-time updates without redeployment

## 📸 Photo Organization

Photos are organized into sections:
- **Opening**: 2-3 photos
- **Story**: 5-6 photos
- **Gallery**: 8-10 photos
- **Anime**: 3-4 photos
- **Finale**: 3-4 photos

Total: 28 photos distributed across the experience

## 🎵 Music Flow

```
Page Load
    ↓
No Music Playing
    ↓
User clicks "TAP TO OPEN"
    ↓
audio.play()
audio.volume = 1
    ↓
Music plays continuously
    ↓
User can toggle ON/OFF via button
```

## 🎬 Wedding Information

- **Groom**: Tuấn Anh
- **Bride**: Phạm Hoà
- **Ceremony Date**: 09/09/2026 (Lunar) / 18/10/2026 (Solar)
- **Ceremony Time**: 10:00
- **Locations**:
  - Groom's House: Thôn Cổ Trai - xã Hồng Minh - tỉnh Hưng Yên
  - Bride's House: Thôn Vạn Xuân - xã Lê Quý Đôn - tỉnh Hưng Yên

## 📝 Development Notes

- Following strict implementation order (STEP 1-23)
- Each step is verified before moving to the next
- Mobile-first approach
- Performance-optimized with lazy loading
- Accessibility considerations included
- Reduced motion support

## 🔒 Security

- Row Level Security (RLS) enabled on Supabase
- Only public anon key used in frontend
- Admin features will use Supabase Auth
- No sensitive credentials in code

## 📄 License

Private project for wedding invitation purposes.
