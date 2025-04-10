
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { insertMockData } from '@/services/databaseService';
import { useToast } from '@/components/ui/use-toast';

/**
 * Hook to initialize Supabase data
 */
export const useSupabaseInit = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        if (isInitialized || isInitializing) return;
        
        setIsInitializing(true);
        
        // Check tables exist by querying them first
        const { error: tableCheckError } = await supabase.rpc('check_tables_exist');
        
        // If there's an error with the RPC call (possibly the function doesn't exist),
        // we'll check each table individually
        if (tableCheckError) {
          console.log("Using fallback method to check tables");
          await createTablesIfNeeded();
        }
        
        // Insert sample data
        await insertMockData();
        
        setIsInitialized(true);
        console.log("Supabase initialization complete");
        
        toast({
          title: "Base de données initialisée",
          description: "La connexion à la base de données est établie",
        });
      } catch (error) {
        console.error("Error initializing Supabase:", error);
        toast({
          variant: "destructive",
          title: "Erreur d'initialisation",
          description: "Un problème est survenu lors de l'initialisation de la base de données",
        });
      } finally {
        setIsInitializing(false);
      }
    };

    initializeSupabase();
  }, [toast, isInitialized, isInitializing]);

  return { isInitialized, isInitializing };
};

/**
 * Helper function to create tables if they don't exist
 */
async function createTablesIfNeeded() {
  try {
    // We'll check each table and create it if it doesn't exist
    const tables = ['professionals', 'pharmacies', 'patients', 'prescriptions'];
    
    for (const table of tables) {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error && error.code === '42P01') { // Table doesn't exist error
        console.log(`Table ${table} does not exist. It should be created via SQL migrations.`);
      } else {
        console.log(`Table ${table} exists with ${count} records.`);
      }
    }
  } catch (error) {
    console.error("Error checking/creating tables:", error);
    throw error;
  }
}
