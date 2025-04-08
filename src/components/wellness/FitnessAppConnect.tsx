
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { connectFitnessApp } from "@/services/wellnessService";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, Check, Activity, X } from "lucide-react";

interface AppOption {
  name: string;
  logo: string;
  isConnected: boolean;
}

const FitnessAppConnect: React.FC = () => {
  const { toast } = useToast();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [apps, setApps] = useState<AppOption[]>([
    { name: "Google Fit", logo: "G", isConnected: false },
    { name: "Apple Health", logo: "A", isConnected: false },
    { name: "Fitbit", logo: "F", isConnected: true },
    { name: "Strava", logo: "S", isConnected: false },
    { name: "Samsung Health", logo: "SH", isConnected: false }
  ]);

  const handleConnect = async (appName: string) => {
    setConnecting(appName);
    
    try {
      // Call the connectFitnessApp function with the app name
      const result = await connectFitnessApp(appName);
      
      if (result.success) {
        // Update the app status
        setApps(apps.map(app => 
          app.name === appName 
            ? { ...app, isConnected: true } 
            : app
        ));
        
        toast({
          title: "Application connectée",
          description: result.message,
        });
      } else {
        toast({
          title: "Échec de connexion",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la connexion à l'application.",
        variant: "destructive"
      });
    } finally {
      setConnecting(null);
    }
  };

  const handleDisconnect = (appName: string) => {
    setApps(apps.map(app => 
      app.name === appName 
        ? { ...app, isConnected: false } 
        : app
    ));
    
    toast({
      title: "Application déconnectée",
      description: `${appName} a été déconnecté avec succès.`,
    });
  };

  return (
    <div className="space-y-3">
      {apps.map((app) => (
        <div key={app.name} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-health-blue/10 flex items-center justify-center text-health-blue font-bold mr-3">
              {app.logo}
            </div>
            <div>
              <h3 className="font-medium">{app.name}</h3>
              <p className="text-xs text-gray-500">
                {app.isConnected 
                  ? "Connecté et synchronisé" 
                  : "Non connecté"}
              </p>
            </div>
          </div>
          
          {app.isConnected ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleDisconnect(app.name)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" />
              Déconnecter
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleConnect(app.name)}
              disabled={connecting === app.name}
              className="text-health-blue hover:text-health-blue hover:bg-health-blue/10"
            >
              {connecting === app.name ? (
                <>
                  <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-blue-600 animate-spin mr-2" />
                  Connexion...
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4 mr-1" />
                  Connecter
                </>
              )}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FitnessAppConnect;
