export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      all_messages: {
        Row: {
          attachement_types: string[] | null
          attachement_urls: string[] | null
          author_id: string | null
          channel_name: string | null
          channelId: string | null
          created_at: string | null
          guild_id: string
          id: number
          mention_id: string | null
          mention_reference: string | null
          mention_username: string | null
          message: string | null
          message_id: string | null
          username: string | null
        }
        Insert: {
          attachement_types?: string[] | null
          attachement_urls?: string[] | null
          author_id?: string | null
          channel_name?: string | null
          channelId?: string | null
          created_at?: string | null
          guild_id?: string
          id?: number
          mention_id?: string | null
          mention_reference?: string | null
          mention_username?: string | null
          message?: string | null
          message_id?: string | null
          username?: string | null
        }
        Update: {
          attachement_types?: string[] | null
          attachement_urls?: string[] | null
          author_id?: string | null
          channel_name?: string | null
          channelId?: string | null
          created_at?: string | null
          guild_id?: string
          id?: number
          mention_id?: string | null
          mention_reference?: string | null
          mention_username?: string | null
          message?: string | null
          message_id?: string | null
          username?: string | null
        }
      }
      bans: {
        Row: {
          bannedUserId: string | null
          bannedUserName: string | null
          created_at: string | null
          id: number
          serverId: string | null
          serverName: string | null
        }
        Insert: {
          bannedUserId?: string | null
          bannedUserName?: string | null
          created_at?: string | null
          id?: number
          serverId?: string | null
          serverName?: string | null
        }
        Update: {
          bannedUserId?: string | null
          bannedUserName?: string | null
          created_at?: string | null
          id?: number
          serverId?: string | null
          serverName?: string | null
        }
      }
      likes: {
        Row: {
          all_messagesId: number | null
          created_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          all_messagesId?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          all_messagesId?: number | null
          created_at?: string | null
          id?: number
          user_id?: string | null
        }
      }
      my_scores: {
        Row: {
          name: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          name?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          name?: string | null
          score?: number | null
          user_id?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
