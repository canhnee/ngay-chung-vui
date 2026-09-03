# 🔧 DEBUG GUIDE

## 🔴 Issue 1: Supabase Permission Denied

### Error Message
```
Error fetching wedding:
{code: '42501', details: null, hint: 'Grant the required privileges...', 
message: 'permission denied for table weddings'}
```

### Cause
Row Level Security (RLS) is enabled but no public SELECT policy exists.

### Fix
1. Go to Supabase SQL Editor
2. Copy content from `FIX_SUPABASE_RLS.sql`
3. Paste and Run
4. Verify policies are created

### Verification
After running SQL, check browser console:
- ❌ Error messages gone
- ✅ Data loaded from Supabase

---

## 🔴 Issue 2: Audio Not Playing

### Checklist

#### 1. File Exists
```bash
# Check file exists
dir public\audio\audio_doanket.mp3
```

Should show the file. If not, file is missing!

#### 2. Check Browser Console
Open DevTools (F12) and click "TAP TO OPEN", you should see:
```
🎵 Creating audio instance with URL: /audio/audio_doanket.mp3
✅ Audio ready to play
🎵 Attempting to play audio...
✅ Audio playing successfully
```

#### 3. Common Issues

**A. File Not Found (404)**
```
❌ Audio error: Failed to load
```
**Fix**: Check file path
```
public/audio/audio_doanket.mp3  ✅ Correct
public/audios/...               ❌ Wrong folder
src/audio/...                   ❌ Wrong location
```

**B. Audio Format Not Supported**
```
❌ Audio error: Format not supported
```
**Fix**: Make sure it's valid MP3
- Open file in VLC/Media Player
- If it plays there, should work in browser
- Try converting to MP3 with different encoder

**C. Autoplay Blocked**
```
⚠️ DOMException: play() failed because user didn't interact
```
**Fix**: This is normal! User MUST click "TAP TO OPEN" first.
- Don't call play() before user interaction
- Our code already handles this correctly

**D. Audio Not Ready**
```
⚠️ Audio not ready yet
```
**Fix**: Audio still loading. Wait a moment and try again.

#### 4. Force Audio Play Test

Add this to browser console:
```javascript
// Test audio directly
const audio = new Audio('/audio/audio_doanket.mp3');
audio.volume = 1;
audio.play()
  .then(() => console.log('✅ Audio plays!'))
  .catch(err => console.error('❌ Audio error:', err));
```

#### 5. Check Audio File

Visit directly in browser:
```
http://localhost:5173/audio/audio_doanket.mp3
```

Should:
- ✅ Download or play the file
- ❌ If 404, file is missing

---

## 🔍 Debug Steps

### Step 1: Fix Supabase RLS
```sql
-- Run FIX_SUPABASE_RLS.sql in Supabase
```

### Step 2: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 3: Clear Browser Cache
```
Ctrl + Shift + R (hard refresh)
```

### Step 4: Open Browser Console (F12)
Check for:
1. Red errors (fix those first)
2. Audio logs (see what's happening)
3. Network tab (check audio file loads)

### Step 5: Test Audio
1. Click "TAP TO OPEN"
2. Check console for logs
3. Listen for sound
4. Check system volume is not muted

---

## 🎯 Quick Fixes

### Audio File Missing?
```bash
# Copy your audio file
copy your-music.mp3 public\audio\audio_doanket.mp3
```

### Wrong Audio Format?
Convert to MP3:
- Use online converter: cloudconvert.com
- Or use VLC: Media > Convert/Save

### Supabase Still Errors?
Fallback will work! Just ignore errors.
- Website uses fallback data
- Everything still works
- Just can't use admin dashboard

### Volume Too Low?
- Check system volume (Windows taskbar)
- Check browser tab volume (right-click tab)
- HTML Audio `volume = 1` is already maximum

---

## 📊 Expected Console Output

### Correct Startup
```
🎵 Creating audio instance with URL: /audio/audio_doanket.mp3
✅ Audio ready to play
(User clicks TAP TO OPEN)
🎵 Attempting to play audio...
✅ Audio playing successfully
```

### If Supabase Not Setup
```
Error fetching wedding: 404 or permission denied
(This is fine! Fallback data is used)
```

### Audio File Issues
```
❌ Audio error: Failed to load
Network tab: 404 on /audio/audio_doanket.mp3
→ File is missing!
```

---

## ✅ Success Checklist

After fixes:
- [ ] No Supabase permission errors (or using fallback)
- [ ] Audio file loads (check Network tab)
- [ ] Console shows "Audio playing successfully"
- [ ] You hear music after clicking TAP TO OPEN
- [ ] Music continues as you scroll

---

## 🆘 Still Not Working?

### 1. Take Screenshot
- Browser console (F12)
- Network tab
- Share the error messages

### 2. Check File
```bash
# Show file info
dir public\audio\audio_doanket.mp3
```

### 3. Try Different Audio
```typescript
// In src/data/fallbackWedding.ts
music_url: '/audio/audio_doanket.mp3'
// Try with a known working file
music_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
```

### 4. Disable Supabase Temporarily
```typescript
// In src/hooks/useWedding.ts
// Line ~16, add:
return; // Skip Supabase, use fallback only
```

---

## 🎵 Audio Troubleshooting Commands

```bash
# Check if file exists
dir public\audio\audio_doanket.mp3

# Check file size (should be > 0)
dir public\audio\*.mp3

# Restart dev server
npm run dev

# Build to test
npm run build

# Test production build
npm run preview
```

---

## 🔧 Advanced: Audio Element Inspection

In browser console:
```javascript
// Get current audio elements
document.querySelectorAll('audio')

// Check if any audio exists
const audios = document.querySelectorAll('audio');
console.log('Audio elements:', audios.length);

// If found, inspect
if (audios.length > 0) {
  const audio = audios[0];
  console.log('Source:', audio.src);
  console.log('Ready State:', audio.readyState);
  console.log('Paused:', audio.paused);
  console.log('Volume:', audio.volume);
}
```

---

**Need more help?** Share:
1. Console output (screenshot)
2. Network tab (audio file request)
3. File listing: `dir public\audio`
