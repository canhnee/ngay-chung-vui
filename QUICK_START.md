# 🚀 Quick Start Guide

## ⚡ Run the Website

### 1. Install Dependencies (First Time Only)
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Website will open at: **http://localhost:5173**

### 3. Build for Production
```bash
npm run build
```

---

## 🎵 Audio Configuration

✅ **Audio file is already set up!**

**Location**: `public/audio/audio_doanket.mp3`

**How it works**:
1. User opens website → NO MUSIC
2. User clicks "TAP TO OPEN" → Music starts
3. Volume is set to maximum (HTML Audio = 1)
4. Music loops continuously
5. User can toggle ON/OFF with button in top-right

**To change music**:
- Replace `public/audio/audio_doanket.mp3` with your file
- OR add new file and update `src/data/fallbackWedding.ts`

📖 [Full Audio Guide](./AUDIO_SETUP.md)

---

## 📸 Photos Configuration

✅ **28 photos are already configured!**

**Location**: `public/wedding-img/anh1.jpg` to `anh28.JPG`

**Distribution**:
- Opening: 3 photos
- Story: 5 photos
- Gallery: 10 photos
- Anime: 3 photos
- Finale: 4 photos
- Extra: 3 photos

**To change photos**:
1. Replace files in `public/wedding-img/`
2. Keep same names OR update `src/data/fallbackWedding.ts`

---

## 🎨 Customize Wedding Info

Edit: `src/data/fallbackWedding.ts`

```typescript
export const fallbackWedding: WeddingData = {
  wedding: {
    groom_name: 'Tuấn Anh',           // ← Change here
    bride_name: 'Phạm Hoà',           // ← Change here
    groom_mother: 'Phạm Thị Tuyết',   // ← Change here
    bride_mother: 'Phạm Thị Nhâm',    // ← Change here
    ceremony_date_lunar: '09/09/2026', // ← Change here
    ceremony_date_solar: '18/10/2026', // ← Change here
    ceremony_time: '10:00',            // ← Change here
    party_date: '18/10/2026',          // ← Change here
    party_time: '18:00',               // ← Change here
    // ... more settings
  },
  // ...
}
```

After changes:
```bash
# Restart dev server
npm run dev
```

---

## 🗺️ Update Locations

Edit: `src/data/fallbackWedding.ts`

```typescript
locations: [
  {
    type: 'groom',
    title: "Groom's House",
    address: 'YOUR ADDRESS HERE',      // ← Change
    maps_url: 'YOUR GOOGLE MAPS URL',  // ← Change
  },
  {
    type: 'bride',
    title: "Bride's House",
    address: 'YOUR ADDRESS HERE',      // ← Change
    maps_url: 'YOUR GOOGLE MAPS URL',  // ← Change
  },
]
```

**Get Google Maps URL**:
1. Open Google Maps
2. Search for location
3. Click "Share"
4. Copy link
5. Paste in `maps_url`

---

## 🎬 Test Features

### Opening & Music
1. Open website
2. Wait for "TAP TO OPEN" button
3. Click it → Music should start
4. Check music button (top-right)

### Countdown
- Scroll to countdown section
- Should show days/hours/minutes/seconds
- Updates every second

### Gallery
- Scroll to gallery section
- Click any photo → Opens fullscreen
- Click X or outside to close

### Locations
- Scroll to locations section
- Click "VIEW ON GOOGLE MAPS"
- Should open in new tab

### Finale
- Scroll to the end
- Watch the fade-to-black sequence
- Music should fade out

---

## 🛠️ Common Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Check for errors
npm run lint         # Run ESLint
```

---

## 📁 Project Structure

```
thiep-cuoi/
├── public/
│   ├── audio/
│   │   └── audio_doanket.mp3    # Music file
│   └── wedding-img/
│       ├── anh1.jpg             # 28 photos
│       └── ...
├── src/
│   ├── components/              # Reusable components
│   ├── sections/                # Page sections
│   ├── pages/                   # Main pages
│   ├── hooks/                   # React hooks
│   ├── lib/                     # Utilities
│   ├── types/                   # TypeScript types
│   └── data/
│       └── fallbackWedding.ts   # ← Edit this for data
├── package.json
└── README.md
```

---

## 🎯 What's Working

✅ Opening with cinematic intro
✅ TAP TO OPEN with music start
✅ Hero with parallax zoom
✅ Story section (5-6 photos)
✅ Gallery with fullscreen modal (8-10 photos)
✅ Anime transition with sakura petals
✅ Video section (if videos added)
✅ Wedding details with date/time
✅ Real-time countdown
✅ Two locations with Google Maps
✅ Finale with fade to black
✅ Music control (ON/OFF)
✅ Responsive design
✅ All 28 photos distributed

---

## 🚨 Troubleshooting

### Music doesn't play
1. Check file exists: `public/audio/audio_doanket.mp3`
2. Check browser console (F12) for errors
3. Make sure you clicked "TAP TO OPEN"
4. Try different browser

### Photos don't show
1. Check files exist in `public/wedding-img/`
2. Check browser console (F12)
3. Clear browser cache (Ctrl+Shift+R)

### Countdown shows "Coming Soon"
- This is normal if no party_date set
- Edit `party_date` in `fallbackWedding.ts`

### Build fails
```bash
# Clean install
rm -rf node_modules
npm install
npm run build
```

---

## 🎨 Customization Tips

### Change Colors
Edit: `src/index.css`
- Change gradient colors
- Modify text opacity
- Adjust background colors

### Change Fonts
Edit: `src/index.css`
- Already using:
  - **Serif**: Cormorant Garamond
  - **Sans**: Montserrat

### Change Animation Speed
Edit individual section files:
- Slower: Increase `duration` values
- Faster: Decrease `duration` values

### Disable Animations
For accessibility:
- Animations respect `prefers-reduced-motion`
- User's OS setting controls this

---

## 📱 Mobile Testing

Test on:
- iPhone (Safari)
- Android (Chrome)
- Different screen sizes

Use browser DevTools:
```
F12 → Toggle device toolbar → Select device
```

---

## 🚀 Next Steps

### 1. Test Everything
- Run `npm run dev`
- Click through entire website
- Test on mobile
- Test music, gallery, countdown

### 2. Customize Content
- Update names, dates
- Replace photos
- Change addresses
- Update Google Maps links

### 3. Deploy (STEP 23)
- Deploy to Vercel
- Connect custom domain
- Test production version

### 4. Optional: Add Supabase
- Set up Supabase project
- Run SQL schema
- Update .env with credentials
- Admin can edit without redeploy

---

## 📞 Need Help?

Check these files:
- 📖 [README.md](./README.md) - Full documentation
- 🎵 [AUDIO_SETUP.md](./AUDIO_SETUP.md) - Audio guide
- 📊 [PROGRESS.md](./PROGRESS.md) - What's implemented
- ✨ [FEATURES.md](./FEATURES.md) - All features

---

## ⚡ Quick Commands Summary

```bash
# Start
npm run dev

# Build
npm run build

# Preview
npm run preview

# That's it! 🎉
```

---

**Ready to impress your guests!** 💍✨

Open your browser and visit: **http://localhost:5173**
