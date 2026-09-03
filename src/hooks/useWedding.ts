import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { fallbackWedding } from '../data/fallbackWedding';
import type { WeddingData, Wedding } from '../types/wedding';

export function useWedding(slug?: string) {
  const [data, setData] = useState<WeddingData>(fallbackWedding);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchWedding() {
      // If no Supabase configured or no slug, use fallback
      if (!slug || !import.meta.env.VITE_SUPABASE_URL) {
        setData(fallbackWedding);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Check if supabase is configured
        if (!supabase) {
          throw new Error('Supabase not configured');
        }

        // Fetch wedding data
        const { data: weddingResult, error: weddingError } = await supabase
          .from('weddings')
          .select('*')
          .eq('slug', slug)
          .single();

        if (weddingError) throw weddingError;
        if (!weddingResult) throw new Error('Wedding not found');

        const wedding = weddingResult as Wedding;
        const weddingId = wedding.id;

        // Fetch related data
        const [locationsRes, photosRes, videosRes, musicRes, timelineRes] = await Promise.all([
          supabase.from('locations').select('*').eq('wedding_id', weddingId),
          supabase.from('photos').select('*').eq('wedding_id', weddingId).order('sort_order'),
          supabase.from('videos').select('*').eq('wedding_id', weddingId).order('sort_order'),
          supabase.from('music').select('*').eq('wedding_id', weddingId).eq('enabled', true),
          supabase.from('timeline_events').select('*').eq('wedding_id', weddingId).order('sort_order'),
        ]);

        setData({
          wedding,
          locations: locationsRes.data || [],
          photos: photosRes.data || [],
          videos: videosRes.data || [],
          music: musicRes.data || [],
          timeline: timelineRes.data || [],
        });
      } catch (err) {
        console.error('Error fetching wedding:', err);
        setError(err as Error);
        // Fallback to static data
        setData(fallbackWedding);
      } finally {
        setLoading(false);
      }
    }

    fetchWedding();
  }, [slug]);

  return { data, loading, error };
}
