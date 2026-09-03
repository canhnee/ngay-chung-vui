export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      weddings: {
        Row: {
          id: string
          slug: string
          groom_name: string
          bride_name: string
          groom_mother: string
          bride_mother: string
          ceremony_date_lunar: string
          ceremony_date_solar: string
          ceremony_time: string
          party_date: string | null
          party_time: string | null
          theme: string | null
          intro_text: string | null
          story_text: string | null
          finale_text: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          groom_name: string
          bride_name: string
          groom_mother: string
          bride_mother: string
          ceremony_date_lunar: string
          ceremony_date_solar: string
          ceremony_time: string
          party_date?: string | null
          party_time?: string | null
          theme?: string | null
          intro_text?: string | null
          story_text?: string | null
          finale_text?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          groom_name?: string
          bride_name?: string
          groom_mother?: string
          bride_mother?: string
          ceremony_date_lunar?: string
          ceremony_date_solar?: string
          ceremony_time?: string
          party_date?: string | null
          party_time?: string | null
          theme?: string | null
          intro_text?: string | null
          story_text?: string | null
          finale_text?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          wedding_id: string
          type: string
          title: string
          address: string
          maps_url: string | null
          latitude: number | null
          longitude: number | null
        }
        Insert: {
          id?: string
          wedding_id: string
          type: string
          title: string
          address: string
          maps_url?: string | null
          latitude?: number | null
          longitude?: number | null
        }
        Update: {
          id?: string
          wedding_id?: string
          type?: string
          title?: string
          address?: string
          maps_url?: string | null
          latitude?: number | null
          longitude?: number | null
        }
      }
      photos: {
        Row: {
          id: string
          wedding_id: string
          image_url: string
          title: string | null
          caption: string | null
          section: string
          sort_order: number
        }
        Insert: {
          id?: string
          wedding_id: string
          image_url: string
          title?: string | null
          caption?: string | null
          section: string
          sort_order: number
        }
        Update: {
          id?: string
          wedding_id?: string
          image_url?: string
          title?: string | null
          caption?: string | null
          section?: string
          sort_order?: number
        }
      }
      videos: {
        Row: {
          id: string
          wedding_id: string
          video_url: string
          thumbnail_url: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          wedding_id: string
          video_url: string
          thumbnail_url?: string | null
          sort_order: number
        }
        Update: {
          id?: string
          wedding_id?: string
          video_url?: string
          thumbnail_url?: string | null
          sort_order?: number
        }
      }
      music: {
        Row: {
          id: string
          wedding_id: string
          music_url: string
          title: string | null
          enabled: boolean
        }
        Insert: {
          id?: string
          wedding_id: string
          music_url: string
          title?: string | null
          enabled?: boolean
        }
        Update: {
          id?: string
          wedding_id?: string
          music_url?: string
          title?: string | null
          enabled?: boolean
        }
      }
      timeline_events: {
        Row: {
          id: string
          wedding_id: string
          date: string
          title: string
          description: string | null
          image_url: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          wedding_id: string
          date: string
          title: string
          description?: string | null
          image_url?: string | null
          sort_order: number
        }
        Update: {
          id?: string
          wedding_id?: string
          date?: string
          title?: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
        }
      }
      rsvps: {
        Row: {
          id: string
          wedding_id: string
          guest_name: string
          attendance: boolean
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          guest_name: string
          attendance: boolean
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          guest_name?: string
          attendance?: boolean
          message?: string | null
          created_at?: string
        }
      }
      wishes: {
        Row: {
          id: string
          wedding_id: string
          guest_name: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          guest_name: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          guest_name?: string
          message?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
