-- Fix RLS - Run this in Supabase SQL Editor

-- IMPORTANT: Drop ALL old policies first
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT schemaname, tablename, policyname 
              FROM pg_policies 
              WHERE schemaname = 'public') 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
                      r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- Create simple read policies for all tables
CREATE POLICY "allow_all_read" ON public.weddings FOR SELECT TO anon USING (true);
CREATE POLICY "allow_all_read" ON public.locations FOR SELECT TO anon USING (true);
CREATE POLICY "allow_all_read" ON public.photos FOR SELECT TO anon USING (true);
CREATE POLICY "allow_all_read" ON public.videos FOR SELECT TO anon USING (true);
CREATE POLICY "allow_all_read" ON public.music FOR SELECT TO anon USING (true);
CREATE POLICY "allow_all_read" ON public.timeline_events FOR SELECT TO anon USING (true);
CREATE POLICY "allow_all_read" ON public.rsvps FOR SELECT TO anon USING (true);
CREATE POLICY "allow_all_read" ON public.wishes FOR SELECT TO anon USING (true);

-- Allow inserts for RSVP and wishes
CREATE POLICY "allow_all_insert" ON public.rsvps FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "allow_all_insert" ON public.wishes FOR INSERT TO anon WITH CHECK (true);
