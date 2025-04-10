
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase/database.types';

// Define the Supabase URL and anon key with fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kvhcsgojkobqpkpxixnb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aGNzZ29qa29icXBrcHhpeG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MjI3MTEsImV4cCI6MjA1OTM5ODcxMX0.mju077yLTBEzD3d0b6tLPqHtKTQYhlTq67r8RVtk0ks';

// Create and export the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Log initialization to help with debugging
console.log('Supabase client initialized with URL:', supabaseUrl ? 'URL provided' : 'URL missing');
