
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
    },
    // Add debug option to get more detailed logs
    db: {
      schema: 'public'
    }
  }
);

// Export connection status for app-wide use - mais nous n'enregistrons plus les erreurs
export const connectionStatus = {
  connected: false,
  error: null as string | null,
  lastChecked: null as Date | null
};

// Test connection with more detailed error handling
export const testConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing Supabase connection...');
    
    // Clear previous status
    connectionStatus.error = null;
    
    // First, check if the service is reachable
    const { data: tablesExist, error: rpcError } = await supabase.rpc('check_tables_exist');
    
    if (rpcError) {
      console.error('Error checking tables existence via RPC:', rpcError);
      // Ne pas stocker les erreurs de connexion pour éviter l'affichage d'alertes
      // connectionStatus.error = `RPC Error: ${rpcError.message}`;
      connectionStatus.connected = false;
      connectionStatus.lastChecked = new Date();
      return false;
    }
    
    console.log('Tables existence check result:', tablesExist);
    
    if (!tablesExist) {
      const message = "Tables don't exist or aren't properly set up in the database";
      console.error(message);
      // Ne pas stocker les erreurs de connexion pour éviter l'affichage d'alertes
      // connectionStatus.error = message;
      connectionStatus.connected = false;
      connectionStatus.lastChecked = new Date();
      return false;
    }
    
    // If we get here, RPC check was successful, now do a simple query test
    const { count, error: queryError } = await supabase
      .from('professionals')
      .select('*', { count: 'exact', head: true });
    
    if (queryError) {
      console.error('Error querying professionals table:', queryError);
      // Ne pas stocker les erreurs de connexion pour éviter l'affichage d'alertes
      // connectionStatus.error = `Query Error: ${queryError.message}`;
      connectionStatus.connected = false;
      connectionStatus.lastChecked = new Date();
      return false;
    }
    
    console.log('Successfully connected to Supabase. Found', count, 'professionals');
    connectionStatus.connected = true;
    connectionStatus.lastChecked = new Date();
    return true;
  } catch (err: any) {
    const errorMessage = err?.message || 'Unknown error testing Supabase connection';
    console.error('Unexpected error testing Supabase connection:', err);
    // Ne pas stocker les erreurs de connexion pour éviter l'affichage d'alertes
    // connectionStatus.error = errorMessage;
    connectionStatus.connected = false;
    connectionStatus.lastChecked = new Date();
    return false;
  }
};

// Execute the test connection function at client initialization
testConnection();
