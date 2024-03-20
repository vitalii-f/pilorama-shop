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
      cart: {
        Row: {
          created_at: string
          game_id: number
          id: number
          status: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          game_id: number
          id?: number
          status: Database["public"]["Enums"]["payment_status"]
          user_id?: string
        }
        Update: {
          created_at?: string
          game_id?: number
          id?: number
          status?: Database["public"]["Enums"]["payment_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_cart_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
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
          capsule: string
          created_at: string
          description_background: string | null
          description_text: string | null
          description_title: string | null
          developers: number
          discount: number | null
          genres: string[]
          header: string
          hero: string
          icon: string
          id: number
          logo: string
          name: string
          platforms: string[]
          price: number
          publishers: number
          release_date: string
          slider: string[]
          sold_count: number
        }
        Insert: {
          capsule: string
          created_at?: string
          description_background?: string | null
          description_text?: string | null
          description_title?: string | null
          developers: number
          discount?: number | null
          genres: string[]
          header: string
          hero: string
          icon: string
          id?: number
          logo: string
          name: string
          platforms: string[]
          price: number
          publishers: number
          release_date: string
          slider: string[]
          sold_count?: number
        }
        Update: {
          capsule?: string
          created_at?: string
          description_background?: string | null
          description_text?: string | null
          description_title?: string | null
          developers?: number
          discount?: number | null
          genres?: string[]
          header?: string
          hero?: string
          icon?: string
          id?: number
          logo?: string
          name?: string
          platforms?: string[]
          price?: number
          publishers?: number
          release_date?: string
          slider?: string[]
          sold_count?: number
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
          cart: number[] | null
          created_at: string
          email: string
          favorite_games_list: number[] | null
          id: string
          login: string
          role: string
        }
        Insert: {
          avatar?: string | null
          cart?: number[] | null
          created_at?: string
          email: string
          favorite_games_list?: number[] | null
          id: string
          login: string
          role?: string
        }
        Update: {
          avatar?: string | null
          cart?: number[] | null
          created_at?: string
          email?: string
          favorite_games_list?: number[] | null
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
      purchase: {
        Row: {
          created_at: string
          id: number
          invoiceId: string
          product_id: number[]
          status: Database["public"]["Enums"]["payment_status"]
          total_price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          invoiceId: string
          product_id: number[]
          status: Database["public"]["Enums"]["payment_status"]
          total_price: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          invoiceId?: string
          product_id?: number[]
          status?: Database["public"]["Enums"]["payment_status"]
          total_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_purchase_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      test: {
        Row: {
          created_at: string
          id: number
          text: string
        }
        Insert: {
          created_at?: string
          id?: number
          text: string
        }
        Update: {
          created_at?: string
          id?: number
          text?: string
        }
        Relationships: []
      }
      user_library: {
        Row: {
          created_at: string
          game_id: number
          game_key: string
          id: number
          price: number
          user_id: string
        }
        Insert: {
          created_at?: string
          game_id: number
          game_key?: string
          id?: number
          price: number
          user_id: string
        }
        Update: {
          created_at?: string
          game_id?: number
          game_key?: string
          id?: number
          price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_user_library_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_library_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_favorite_game: {
        Args: {
          profile_id: string
          game_id: number
        }
        Returns: undefined
      }
      increment_sold_count: {
        Args: {
          game_id: number
        }
        Returns: undefined
      }
      update_favorite_games_list: {
        Args: {
          profile_id: string
          game_id: number
        }
        Returns: undefined
      }
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
      payment_status:
        | "created"
        | "processing"
        | "hold"
        | "success"
        | "failure"
        | "reversed"
        | "expired"
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
