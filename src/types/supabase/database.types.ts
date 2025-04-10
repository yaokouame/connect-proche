
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
      professionals: {
        Row: {
          id: string
          name: string
          email: string
          role: string
          specialty: string
          license: string
          isOnline: boolean
          location?: { city: string; region: string } | null
        }
        Insert: {
          id: string
          name: string
          email: string
          role?: string
          specialty?: string
          license?: string
          isOnline?: boolean
          location?: { city: string; region: string } | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: string
          specialty?: string
          license?: string
          isOnline?: boolean
          location?: { city: string; region: string } | null
        }
      }
      pharmacies: {
        Row: {
          id: string
          name: string
          address: string
          phone: string
          hours: string
          onDuty: boolean
          location: { lat: number; lng: number }
        }
        Insert: {
          id: string
          name: string
          address: string
          phone: string
          hours: string
          onDuty?: boolean
          location: { lat: number; lng: number }
        }
        Update: {
          id?: string
          name?: string
          address?: string
          phone?: string
          hours?: string
          onDuty?: boolean
          location?: { lat: number; lng: number }
        }
      }
      patients: {
        Row: {
          id: string
          name: string
          email: string
          role: string
          location?: { city: string; region: string } | null
        }
        Insert: {
          id: string
          name: string
          email: string
          role?: string
          location?: { city: string; region: string } | null
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: string
          location?: { city: string; region: string } | null
        }
      }
      prescriptions: {
        Row: {
          id: string
          patientId: string
          professionalId: string
          professionalName: string
          date: string
          expiryDate?: string
          status: 'active' | 'expired' | 'pending'
          medications: {
            name: string;
            dosage?: string;
            frequency?: string;
            duration?: string;
            instructions?: string;
            startDate?: string;
            endDate?: string;
          }[]
          instructions?: string
        }
        Insert: {
          id: string
          patientId: string
          professionalId: string
          professionalName: string
          date: string
          expiryDate?: string
          status: 'active' | 'expired' | 'pending'
          medications: {
            name: string;
            dosage?: string;
            frequency?: string;
            duration?: string;
            instructions?: string;
            startDate?: string;
            endDate?: string;
          }[]
          instructions?: string
        }
        Update: {
          id?: string
          patientId?: string
          professionalId?: string
          professionalName?: string
          date?: string
          expiryDate?: string
          status?: 'active' | 'expired' | 'pending'
          medications?: {
            name: string;
            dosage?: string;
            frequency?: string;
            duration?: string;
            instructions?: string;
            startDate?: string;
            endDate?: string;
          }[]
          instructions?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_tables_exist: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
