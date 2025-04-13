
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
        
        // Check if tables exist using the SQL function we've created
        const { data: tablesExist, error: tableCheckError } = await supabase.rpc('check_tables_exist');
        
        if (tableCheckError) {
          console.error("Error checking tables existence:", tableCheckError);
          throw tableCheckError;
        }
        
        console.log("Tables exist check result:", tablesExist);
        
        if (!tablesExist) {
          console.error("Tables don't exist or aren't properly set up");
          toast({
            variant: "destructive",
            title: "Erreur de base de données",
            description: "Les tables nécessaires n'existent pas dans la base de données.",
          });
          setIsInitializing(false);
          return;
        }
        
        // Insert sample data if tables are properly set up
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
