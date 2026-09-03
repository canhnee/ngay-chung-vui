-- =====================================================
-- SUPABASE STORAGE SETUP
-- Chạy các câu lệnh này trong Supabase SQL Editor
-- =====================================================

-- 1. Tạo bucket cho wedding photos (nếu chưa có)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wedding-photos',
  'wedding-photos',
  true,
  10485760, -- 10MB per file
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 2. Tạo bucket cho wedding music (nếu chưa có)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'wedding-music',
  'wedding-music',
  true,
  52428800, -- 50MB per file
  ARRAY['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Set public access policies cho wedding-photos
CREATE POLICY "Public Access for wedding photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'wedding-photos');

CREATE POLICY "Allow authenticated upload for wedding photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'wedding-photos');

CREATE POLICY "Allow authenticated update for wedding photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'wedding-photos');

CREATE POLICY "Allow authenticated delete for wedding photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'wedding-photos');

-- 4. Set public access policies cho wedding-music
CREATE POLICY "Public Access for wedding music"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'wedding-music');

CREATE POLICY "Allow authenticated upload for wedding music"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'wedding-music');

CREATE POLICY "Allow authenticated update for wedding music"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'wedding-music');

CREATE POLICY "Allow authenticated delete for wedding music"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'wedding-music');

-- =====================================================
-- DONE! Bây giờ có thể upload files qua Dashboard hoặc code
-- =====================================================
