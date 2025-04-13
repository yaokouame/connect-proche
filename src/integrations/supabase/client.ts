
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase/database.types';

// Define the Supabase URL and anon key
const supabaseUrl = 'https://kvhcsgojkobqpkpxixnb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aGNzZ29qa29icXBrcHhpeG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MjI3MTEsImV4cCI6MjA1OTM5ODcxMX0.mju077yLTBEzD3d0b6tLPqHtKTQYhlTq67r8RVtk0ks';

// Create the Supabase client with additional debug options
export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    },
    global: {
      headers: {
        'x-application-name': 'health-app'
      }
    }
  }
);

// Log initialization to help with debugging
console.log('Supabase client initialized with URL:', supabaseUrl);

// Test connection
supabase.from('professionals').select('count', { count: 'exact', head: true })
  .then(({ count, error }) => {
    if (error) {
      console.error('Error connecting to Supabase:', error);
    } else {
      console.log('Successfully connected to Supabase. Found', count, 'professionals');
    }
  })
  .catch(err => {
    console.error('Unexpected error testing Supabase connection:', err);
  });
