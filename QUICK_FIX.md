# ⚡ QUICK FIX - Giải Quyết Ngay

## 🔴 Vấn Đề 1: Supabase Permission Denied

### Làm Ngay:
1. Mở Supabase Dashboard: https://qcfekhkwqywqbxnxnusp.supabase.co
2. Click **SQL Editor** (bên trái)
3. Click **New Query**
4. Copy nội dung file `FIX_SUPABASE_RLS.sql`
5. Paste vào editor
6. Click **Run** (hoặc Ctrl+Enter)
7. Đợi "Success. No rows returned."

### Kết Quả:
✅ Lỗi 401/42501 sẽ biến mất
✅ Website sẽ load data từ Supabase

---

## 🔴 Vấn Đề 2: Audio Không Phát

### Kiểm Tra File:

```bash
# 1. Check file có tồn tại không
dir public\audio\audio_doanket.mp3
```

Nếu không có file → Copy vào đúng chỗ:
```bash
copy your-audio-file.mp3 public\audio\audio_doanket.mp3
```

### Test Audio:

**A. Restart Dev Server**
```bash
# Stop server (Ctrl+C)
npm run dev
```

**B. Test trong Browser**
1. Mở http://localhost:5173
2. Mở Console (F12)
3. Click "TAP TO OPEN"
4. Xem console logs:

**Expected Logs:**
```
🎵 Creating audio instance with URL: /audio/audio_doanket.mp3
✅ Audio ready to play
🎵 Attempting to play audio...
✅ Audio playing successfully
```

**If You See:**
```
❌ Audio error: Failed to load
```
→ File không tồn tại hoặc path sai

### Quick Test Audio Trực Tiếp:

Mở browser console (F12) và paste:
```javascript
const audio = new Audio('/audio/audio_doanket.mp3');
audio.play();
```

Nếu phát được → Code OK, chỉ cần click "TAP TO OPEN"
Nếu lỗi → File có vấn đề

---

## 🎯 Checklist Debug

### 1. File Audio
- [ ] File tồn tại: `public\audio\audio_doanket.mp3`
- [ ] File size > 0 KB
- [ ] File là MP3 hợp lệ (test bằng VLC)

### 2. Dev Server
- [ ] Server đang chạy: `npm run dev`
- [ ] Không có lỗi compilation
- [ ] Đã hard refresh: Ctrl+Shift+R

### 3. Browser
- [ ] Console mở (F12)
- [ ] Không có ad-blocker chặn audio
- [ ] System volume không mute
- [ ] Browser tab không mute (right-click tab)

### 4. Interaction
- [ ] ĐÃ CLICK "TAP TO OPEN" (bắt buộc!)
- [ ] Không try autoplay (browser chặn)

---

## 📋 SQL To Run (Copy Paste Vào Supabase)

```sql
-- Fix RLS Policies
DROP POLICY IF EXISTS "Enable read access for all users" ON weddings;
DROP POLICY IF EXISTS "Enable read access for all users" ON locations;
DROP POLICY IF EXISTS "Enable read access for all users" ON photos;
DROP POLICY IF EXISTS "Enable read access for all users" ON videos;
DROP POLICY IF EXISTS "Enable read access for all users" ON music;
DROP POLICY IF EXISTS "Enable read access for all users" ON timeline_events;

CREATE POLICY "Enable read access for all users" ON weddings FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON locations FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON photos FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON videos FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON music FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON timeline_events FOR SELECT USING (true);
```

---

## 🆘 Still Not Working?

### Audio Issue:
**Try Different File:**
```typescript
// In src/data/fallbackWedding.ts
// Change line ~283:
music_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
```

### Supabase Issue:
**Use Fallback Only:**
```typescript
// In src/hooks/useWedding.ts
// Line ~16, change to:
if (!slug || !import.meta.env.VITE_SUPABASE_URL || true) {  // ← Add || true
  setData(fallbackWedding);
  setLoading(false);
  return;
}
```

---

## ✅ Sau Khi Fix

### Expected Result:
1. ✅ No red errors in console
2. ✅ Audio logs show "playing successfully"  
3. ✅ You hear music
4. ✅ Supabase errors gone (or using fallback)

### Test Again:
```bash
# 1. Restart
npm run dev

# 2. Hard refresh
Ctrl + Shift + R

# 3. Click TAP TO OPEN

# 4. Check console logs
```

---

## 📞 Debug Commands

```bash
# Check audio file
dir public\audio\*.mp3

# Restart clean
npm run dev

# Build test
npm run build

# Check .env
type .env
```

---

**TL;DR:**
1. Run `FIX_SUPABASE_RLS.sql` in Supabase SQL Editor
2. Make sure `public/audio/audio_doanket.mp3` exists
3. Restart: `npm run dev`
4. Click "TAP TO OPEN" (must interact first!)
5. Check browser console (F12) for logs
