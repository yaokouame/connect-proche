
import { useEffect, useState, useCallback } from 'react';
import { supabase, testConnection, connectionStatus } from '@/integrations/supabase/client';
import { insertMockData } from '@/services/databaseService';
import { useToast } from '@/components/ui/use-toast';

/**
 * Hook to initialize Supabase data
 */
export const useSupabaseInit = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const initializeSupabase = useCallback(async () => {
    try {
      if (isInitialized || isInitializing) return;
      
      setIsInitializing(true);
      setError(null);
      console.log("Starting Supabase initialization...");
      
      // Test the connection
      const isConnected = await testConnection();
      
      if (!isConnected) {
        // Set the error but don't show toast
        setError(connectionStatus.error || "Échec de connexion à la base de données");
        setIsInitializing(false);
        return;
      }
      
      // If connected, check if tables are properly set up
      if (!connectionStatus.connected) {
        setError("Les tables n'existent pas ou ne sont pas correctement configurées");
        setIsInitializing(false);
        return;
      }
      
      // Insert sample data if tables are properly set up
      try {
        await insertMockData();
      } catch (dataError: any) {
        console.warn("Non-critical error during data insertion:", dataError);
        // Don't fail initialization for data insertion errors
        // Just log them and continue
      }
      
      setIsInitialized(true);
      console.log("Supabase initialization complete");
      
      // Suppression complète du toast de succès également
      // toast({
      //   title: "Base de données initialisée",
      //   description: "La connexion à la base de données est établie",
      // });
    } catch (error: any) {
      const errorMessage = error?.message || "Erreur inconnue";
      console.error("Error initializing Supabase:", error);
      setError(errorMessage);
    } finally {
      setIsInitializing(false);
    }
  }, [isInitialized, isInitializing]);

  useEffect(() => {
    initializeSupabase();
  }, [initializeSupabase]);

  return { 
    isInitialized, 
    isInitializing, 
    error,
    retryInitialization: initializeSupabase 
  };
};
