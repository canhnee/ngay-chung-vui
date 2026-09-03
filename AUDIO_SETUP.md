# 🎵 Audio Setup Guide

## Current Audio Configuration

### File Location
```
public/
└── audio/
    └── audio_doanket.mp3  ✅ Currently in use
```

### How It Works

1. **File is in `public/` folder**
   - Vite serves files from `public/` at root URL
   - Path in code: `/audio/audio_doanket.mp3`
   - Browser access: `http://localhost:5173/audio/audio_doanket.mp3`

2. **Fallback configuration**
   - Located in: `src/data/fallbackWedding.ts`
   - Music array includes the audio file
   - Used when Supabase is not configured

3. **Music hook**
   - Located in: `src/hooks/useMusic.ts`
   - Creates single Audio instance
   - Sets `audio.volume = 1` (maximum)
   - Loops the music

4. **Trigger**
   - Music starts ONLY after user clicks "TAP TO OPEN"
   - Respects browser autoplay policies
   - No volume slider (per requirements)
   - Simple ON/OFF toggle

## How to Change Music

### Option 1: Replace existing file
```bash
# Replace the file with same name
copy your-new-music.mp3 public\audio\audio_doanket.mp3
```

### Option 2: Add new file
1. Add your file to `public/audio/`:
   ```bash
   copy your-music.mp3 public\audio\wedding-song.mp3
   ```

2. Update fallback data in `src/data/fallbackWedding.ts`:
   ```typescript
   music: [
     {
       id: 'music-1',
       wedding_id: 'fallback-1',
       music_url: '/audio/wedding-song.mp3',  // ← Change this
       title: 'Wedding Music',
       enabled: true,
     },
   ],
   ```

## Supported Audio Formats

### Best Compatibility
- ✅ **MP3** - Best browser support
- ✅ **WAV** - High quality, larger file
- ✅ **OGG** - Good compression, good support

### Modern Browsers
- ✅ **AAC/M4A** - iOS/Safari preferred
- ✅ **WebM** - Chrome/Firefox

### Recommendations
1. **Use MP3** for maximum compatibility
2. **Bitrate**: 128-192 kbps (balance quality/size)
3. **Sample rate**: 44.1 kHz
4. **File size**: Keep under 5MB for fast loading

## Testing Audio

### 1. Local Development
```bash
npm run dev
```
Then:
1. Open browser
2. Wait for "TAP TO OPEN" button
3. Click it
4. Music should start automatically
5. Check browser console for errors

### 2. Check Audio File
Visit directly:
```
http://localhost:5173/audio/audio_doanket.mp3
```
Should play in browser.

### 3. Browser Console
If music doesn't play, check console (F12):
- `Audio error:` → File not found or format issue
- `The play() request was interrupted` → Normal, browser blocked autoplay
- `Audio.play() returned a promise` → Normal

## Troubleshooting

### Music Doesn't Start
1. **Check file exists**:
   ```
   public/audio/audio_doanket.mp3
   ```

2. **Check browser console** for errors

3. **Try different browser**:
   - Chrome/Edge
   - Firefox
   - Safari

4. **Check audio format**:
   - Must be valid MP3
   - Not corrupted
   - Proper encoding

### Music Volume Too Low
- HTML Audio `volume = 1` is MAXIMUM for browser
- Cannot go higher than system volume
- User must increase:
  - OS system volume
  - Browser tab volume (some browsers)
  - Physical device volume

### Music Doesn't Loop
- Check `useMusic.ts`:
  ```typescript
  audio.loop = true;  // Should be set
  ```

### File Not Found (404)
1. **Check exact path**:
   ```
   public/audio/audio_doanket.mp3  ✅ Correct
   public/audios/...               ❌ Wrong folder
   src/audio/...                   ❌ Wrong location
   ```

2. **Restart dev server**:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

## Supabase Audio Setup (Future)

When you set up Supabase:

1. **Upload to Supabase Storage**:
   - Create bucket: `wedding-media`
   - Upload audio file
   - Get public URL

2. **Update database**:
   ```sql
   INSERT INTO music (wedding_id, music_url, title, enabled)
   VALUES (
     'your-wedding-id',
     'https://your-project.supabase.co/storage/v1/object/public/wedding-media/audio.mp3',
     'Wedding Music',
     true
   );
   ```

3. **Website will use Supabase URL**:
   - Priority: Supabase > Fallback
   - Fallback still works if Supabase fails

## Performance Tips

### Optimize Audio File
1. **Reduce bitrate** if file is large:
   ```bash
   # Using ffmpeg (example)
   ffmpeg -i input.mp3 -b:a 128k output.mp3
   ```

2. **Trim silence**:
   - Remove long silence at start/end
   - Reduces file size
   - Faster loading

3. **Preload strategy**:
   - Currently: `audio.preload = 'auto'`
   - Loads during Opening screen
   - Ready when user clicks

### Lazy Loading (Future)
If audio is very large:
```typescript
// Don't create Audio until needed
const audio = new Audio();
audio.src = musicUrl;
audio.load();
```

## Current Configuration Summary

✅ **File**: `public/audio/audio_doanket.mp3`
✅ **Format**: MP3
✅ **Location**: Public folder (correct)
✅ **Fallback**: Configured
✅ **Trigger**: TAP TO OPEN
✅ **Volume**: Maximum (1)
✅ **Loop**: Enabled
✅ **Control**: ON/OFF toggle only

Everything is set up correctly! 🎵

## Quick Reference

```typescript
// Where music is configured
src/pages/WeddingPage.tsx
  ↓
const musicUrl = data.music[0]?.music_url || '/audio/audio_doanket.mp3';
  ↓
useMusic(musicUrl)
  ↓
new Audio(musicUrl)
  ↓
audio.volume = 1
audio.loop = true
audio.play()  // After TAP TO OPEN
```

---

**Need help?** Check browser console (F12) for error messages.
