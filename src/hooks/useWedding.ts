import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';
import { fallbackWedding } from '../data/fallbackWedding';
import type { WeddingData } from '../types/wedding';

export function useWedding(slug?: string) {
  const [data, setData] = useState<WeddingData>(fallbackWedding);
  const [loading, setLoading] = useState(true);
  const [error] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchWedding() {
      // TEMPORARY FIX: Use fallback only until Supabase RLS is properly configured
      console.log('📦 Using fallback data (Supabase temporarily disabled)');
      setData(fallbackWedding);
      setLoading(false);
      
      // Supabase code is disabled temporarily
      // To re-enable: uncomment import above and the code block below
      // Then remove the early return above
    }

    fetchWedding();
  }, [slug]);

  return { data, loading, error };
}
