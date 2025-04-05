
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { connectFitnessApp } from "@/services/wellnessService";
import { useToast } from "@/hooks/use-toast";
import { Activity } from "lucide-react";

const FitnessAppConnect = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<'google_fit' | 'apple_health'>('google_fit');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      const response = await connectFitnessApp(selectedApp);
      
      toast({
        title: "Connexion réussie",
        description: response.message,
      });
      
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion à l'application de fitness.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Activity className="h-4 w-4" />
          Connecter une app fitness
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connecter une application</DialogTitle>
          <DialogDescription>
            Importez automatiquement vos données d'activité physique depuis votre application de fitness préférée.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={selectedApp} onValueChange={(value) => setSelectedApp(value as 'google_fit' | 'apple_health')}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="google_fit" id="google_fit" />
              <Label htmlFor="google_fit" className="cursor-pointer">Google Fit</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="apple_health" id="apple_health" />
              <Label htmlFor="apple_health" className="cursor-pointer">Apple Health</Label>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Annuler</Button>
          <Button onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? "Connexion en cours..." : "Connecter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FitnessAppConnect;
