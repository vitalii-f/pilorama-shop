export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      developers: {
        Row: {
          id: number
          name: string
          value: string
        }
        Insert: {
          id?: number
          name: string
          value: string
        }
        Update: {
          id?: number
          name?: string
          value?: string
        }
        Relationships: []
      }
      features: {
        Row: {
          id: number
          name: string
          value: string
        }
        Insert: {
          id?: number
          name: string
          value: string
        }
        Update: {
          id?: number
          name?: string
          value?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          capsule_img: string
          created_at: string
          developers: number
          discount: number | null
          genres_array: string[]
          header_img: string
          hero_img: string
          icon_img: string
          id: number
          logo_img: string
          name: string
          platforms_array: string[]
          price: number
          publishers: number
          release_date: string
          slider_img_array: string[]
        }
        Insert: {
          capsule_img: string
          created_at?: string
          developers: number
          discount?: number | null
          genres_array: string[]
          header_img: string
          hero_img: string
          icon_img: string
          id?: number
          logo_img: string
          name: string
          platforms_array: string[]
          price: number
          publishers: number
          release_date: string
          slider_img_array: string[]
        }
        Update: {
          capsule_img?: string
          created_at?: string
          developers?: number
          discount?: number | null
          genres_array?: string[]
          header_img?: string
          hero_img?: string
          icon_img?: string
          id?: number
          logo_img?: string
          name?: string
          platforms_array?: string[]
          price?: number
          publishers?: number
          release_date?: string
          slider_img_array?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "games_developers_fkey"
            columns: ["developers"]
            isOneToOne: false
            referencedRelation: "developers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_publishers_fkey"
            columns: ["publishers"]
            isOneToOne: false
            referencedRelation: "publishers"
            referencedColumns: ["id"]
          }
        ]
      }
      genres: {
        Row: {
          id: number
          name: string
          value: string
        }
        Insert: {
          id?: number
          name: string
          value: string
        }
        Update: {
          id?: number
          name?: string
          value?: string
        }
        Relationships: []
      }
      main_banner: {
        Row: {
          banner_img: string
          game_id: number | null
          id: number
          logo_img: string
        }
        Insert: {
          banner_img: string
          game_id?: number | null
          id?: number
          logo_img: string
        }
        Update: {
          banner_img?: string
          game_id?: number | null
          id?: number
          logo_img?: string
        }
        Relationships: []
      }
      platforms: {
        Row: {
          id: number
          name: string
          value: string
        }
        Insert: {
          id?: number
          name: string
          value: string
        }
        Update: {
          id?: number
          name?: string
          value?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          id: string
          login: string
          role: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          id: string
          login: string
          role?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          id?: string
          login?: string
          role?: string
        }
        Relationships: []
      }
      publishers: {
        Row: {
          id: number
          name: string
          value: string
        }
        Insert: {
          id?: number
          name: string
          value: string
        }
        Update: {
          id?: number
          name?: string
          value?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      developer:
        | "Ubisoft"
        | "Gameloft"
        | "Rockstar Games"
        | "Activision"
        | "Blizzard"
        | "Crytek"
        | "DICE"
        | "CD Projekt Red"
      genre:
        | "action"
        | "platform"
        | "shooter"
        | "fighting"
        | "survival"
        | "horror"
        | "adventure"
        | "interactive"
        | "RPG"
        | "MMORPG"
        | "simulation"
        | "strategy"
        | "moba"
        | "RTS"
        | "racing"
        | "MMO"
        | "casual"
        | "sandbox"
      platform: "PC" | "PS5" | "PS4" | "PS3" | "XBOX"
      publisher:
        | "Sony"
        | "Microsoft"
        | "Nintendo"
        | "Electronic Arts"
        | "Epic Games"
        | "Take-Two"
        | "Steam"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
