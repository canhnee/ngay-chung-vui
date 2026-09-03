export interface Wedding {
  id: string;
  slug: string;
  groom_name: string;
  bride_name: string;
  groom_mother: string;
  bride_mother: string;
  ceremony_date_lunar: string;
  ceremony_date_solar: string;
  ceremony_time: string;
  party_date?: string;
  party_time?: string;
  theme?: string;
  intro_text?: string;
  story_text?: string;
  finale_text?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Location {
  id: string;
  wedding_id: string;
  type: 'groom' | 'bride';
  title: string;
  address: string;
  maps_url?: string;
  latitude?: number;
  longitude?: number;
}

export interface Photo {
  id: string;
  wedding_id: string;
  image_url: string;
  title?: string;
  caption?: string;
  section: 'opening' | 'story' | 'gallery' | 'anime' | 'finale';
  sort_order: number;
}

export interface Video {
  id: string;
  wedding_id: string;
  video_url: string;
  thumbnail_url?: string;
  sort_order: number;
}

export interface Music {
  id: string;
  wedding_id: string;
  music_url: string;
  title?: string;
  enabled: boolean;
}

export interface TimelineEvent {
  id: string;
  wedding_id: string;
  date: string;
  title: string;
  description?: string;
  image_url?: string;
  sort_order: number;
}

export interface RSVP {
  id: string;
  wedding_id: string;
  guest_name: string;
  attendance: boolean;
  message?: string;
  created_at: string;
}

export interface Wish {
  id: string;
  wedding_id: string;
  guest_name: string;
  message: string;
  created_at: string;
}

export interface WeddingData {
  wedding: Wedding;
  locations: Location[];
  photos: Photo[];
  videos: Video[];
  music: Music[];
  timeline: TimelineEvent[];
}
