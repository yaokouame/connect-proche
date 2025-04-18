
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connectionStatus, testConnection } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface DatabaseConnectionAlertProps {
  onRetry?: () => void;
}

export const DatabaseConnectionAlert: React.FC<DatabaseConnectionAlertProps> = ({ 
  onRetry 
}) => {
  const { toast } = useToast();
  const [isRetrying, setIsRetrying] = React.useState(false);

  // Désactivation complète des alertes - toujours retourner null
  return null;
  
  // Code commenté en dessous - il était utilisé pour afficher les alertes
  /*
  if (!connectionStatus.error) {
    return null;
  }

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      const success = await testConnection();
      
      if (success) {
        toast({
          title: "Connexion établie",
          description: "La connexion à la base de données est rétablie",
        });
        
        if (onRetry) {
          onRetry();
        }
      } else {
        toast({
          variant: "destructive",
          title: "Échec de la connexion",
          description: connectionStatus.error || "Erreur de connexion inconnue",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors de la tentative de reconnexion",
      });
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Problème de connexion à la base de données</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          {connectionStatus.error}
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRetry}
          disabled={isRetrying}
        >
          {isRetrying ? (
            <>
              <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              Tentative de reconnexion...
            </>
          ) : (
            "Réessayer la connexion"
          )}
        </Button>
      </AlertDescription>
    </Alert>
  );
  */
};
