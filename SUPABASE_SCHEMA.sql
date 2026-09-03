-- WEDDING INVITATION DATABASE SCHEMA
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Weddings table
CREATE TABLE weddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  groom_name TEXT NOT NULL,
  bride_name TEXT NOT NULL,
  groom_mother TEXT NOT NULL,
  bride_mother TEXT NOT NULL,
  ceremony_date_lunar TEXT NOT NULL,
  ceremony_date_solar TEXT NOT NULL,
  ceremony_time TEXT NOT NULL,
  party_date TEXT,
  party_time TEXT,
  theme TEXT,
  intro_text TEXT,
  story_text TEXT,
  finale_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Locations table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('groom', 'bride')),
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  maps_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8)
);

-- Photos table
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT,
  caption TEXT,
  section TEXT NOT NULL CHECK (section IN ('opening', 'story', 'gallery', 'anime', 'finale')),
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Music table
CREATE TABLE music (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  music_url TEXT NOT NULL,
  title TEXT,
  enabled BOOLEAN DEFAULT TRUE
);

-- Timeline events table
CREATE TABLE timeline_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- RSVPs table
CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  attendance BOOLEAN NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wishes table
CREATE TABLE wishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_locations_wedding_id ON locations(wedding_id);
CREATE INDEX idx_photos_wedding_id ON photos(wedding_id);
CREATE INDEX idx_photos_section ON photos(section);
CREATE INDEX idx_videos_wedding_id ON videos(wedding_id);
CREATE INDEX idx_music_wedding_id ON music(wedding_id);
CREATE INDEX idx_timeline_wedding_id ON timeline_events(wedding_id);
CREATE INDEX idx_rsvps_wedding_id ON rsvps(wedding_id);
CREATE INDEX idx_wishes_wedding_id ON wishes(wedding_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE music ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Public read access for weddings and related data
CREATE POLICY "Public can read weddings" ON weddings FOR SELECT USING (true);
CREATE POLICY "Public can read locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Public can read photos" ON photos FOR SELECT USING (true);
CREATE POLICY "Public can read videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Public can read music" ON music FOR SELECT USING (true);
CREATE POLICY "Public can read timeline" ON timeline_events FOR SELECT USING (true);
CREATE POLICY "Public can read rsvps" ON rsvps FOR SELECT USING (true);
CREATE POLICY "Public can read wishes" ON wishes FOR SELECT USING (true);

-- Public can insert RSVPs and wishes
CREATE POLICY "Public can insert rsvps" ON rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert wishes" ON wishes FOR INSERT WITH CHECK (true);

-- TODO: Add admin policies for authenticated users
-- You'll need to create these based on your auth setup:
-- CREATE POLICY "Admins can manage weddings" ON weddings FOR ALL USING (auth.role() = 'admin');
-- etc.

-- Seed data (for demo/testing)
INSERT INTO weddings (slug, groom_name, bride_name, groom_mother, bride_mother, ceremony_date_lunar, ceremony_date_solar, ceremony_time, party_date, party_time, theme, intro_text, story_text, finale_text)
VALUES (
  'pham-hoa-tuan-anh',
  'Tuấn Anh',
  'Phạm Hoà',
  'Phạm Thị Tuyết',
  'Phạm Thị Nhâm',
  '09/09/2026',
  '18/10/2026',
  '10:00',
  '18/10/2026',
  '18:00',
  'luxury-cinematic',
  'A story is about to begin.',
  'Every love story is beautiful, but ours is my favorite.',
  'Thank you for being part of our story.'
);

-- Get the wedding ID for inserting related data
DO $$
DECLARE
  wedding_uuid UUID;
BEGIN
  SELECT id INTO wedding_uuid FROM weddings WHERE slug = 'pham-hoa-tuan-anh';

  -- Insert locations
  INSERT INTO locations (wedding_id, type, title, address, maps_url) VALUES
    (wedding_uuid, 'groom', 'Groom''s House', 'Thôn Cổ Trai - xã Hồng Minh - tỉnh Hưng Yên', 'https://maps.google.com'),
    (wedding_uuid, 'bride', 'Bride''s House', 'Thôn Vạn Xuân - xã Lê Quý Đôn - tỉnh Hưng Yên', 'https://maps.google.com');

  -- Insert timeline events
  INSERT INTO timeline_events (wedding_id, date, title, description, sort_order) VALUES
    (wedding_uuid, '2020', 'The Beginning', 'When our paths first crossed', 1),
    (wedding_uuid, '2022', 'A New Memory', 'Our journey together began', 2),
    (wedding_uuid, '2025', 'The Proposal', 'Forever started here', 3),
    (wedding_uuid, '2026', 'Forever Begins', 'Our wedding day', 4);
END $$;
