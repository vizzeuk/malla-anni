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
      subjects: {
        Row: {
          id: string
          user_id: string
          name: string
          code: string
          semester: number
          credits: number
          prerequisites: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          code: string
          semester: number
          credits: number
          prerequisites?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          code?: string
          semester?: number
          credits?: number
          prerequisites?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      subject_status: {
        Row: {
          id: string
          user_id: string
          subject_id: string
          status: 'pending' | 'approved' | 'failed' | 'in-progress'
          final_grade: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id: string
          status: 'pending' | 'approved' | 'failed' | 'in-progress'
          final_grade?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string
          status?: 'pending' | 'approved' | 'failed' | 'in-progress'
          final_grade?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      grades: {
        Row: {
          id: string
          user_id: string
          subject_id: string
          name: string
          grade: number
          percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          subject_id: string
          name: string
          grade: number
          percentage: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          subject_id?: string
          name?: string
          grade?: number
          percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
