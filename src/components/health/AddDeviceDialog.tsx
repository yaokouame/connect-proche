
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Smartphone, CircleOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AddDeviceDialogProps {
  onAddDevice: (deviceInfo: { name: string; type: string }) => Promise<void>;
}

const DEVICE_TYPES = [
  { value: "smartwatch", label: "Montre connectée" },
  { value: "blood_pressure_monitor", label: "Tensiomètre" },
  { value: "glucose_monitor", label: "Glucomètre" },
  { value: "scale", label: "Balance" },
  { value: "thermometer", label: "Thermomètre" },
  { value: "oxygen_monitor", label: "Oxymètre" },
];

const AddDeviceDialog: React.FC<AddDeviceDialogProps> = ({ onAddDevice }) => {
  const [open, setOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState(DEVICE_TYPES[0].value);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const handleScan = () => {
    setScanning(true);
    // Simulate device scanning
    setTimeout(() => {
      setScanning(false);
      toast({
        title: "Appareil détecté",
        description: "Appareil Bluetooth trouvé à proximité.",
      });
      setName("Appareil Bluetooth");
    }, 2000);
  };
  
  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type) return;
    
    setIsConnecting(true);
    
    try {
      await onAddDevice({ name, type });
      setOpen(false);
      toast({
        title: "Appareil connecté",
        description: `${name} connecté avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Erreur de connexion",
        description: "Impossible de se connecter à l'appareil.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Smartphone className="h-4 w-4" />
          Ajouter un appareil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleConnect}>
          <DialogHeader>
            <DialogTitle>Connecter un nouvel appareil</DialogTitle>
            <DialogDescription>
              Ajoutez un appareil connecté pour synchroniser automatiquement vos données de santé.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type d'appareil</Label>
              <Select
                value={type}
                onValueChange={setType}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {DEVICE_TYPES.map((deviceType) => (
                      <SelectItem key={deviceType.value} value={deviceType.value}>
                        {deviceType.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="name">Nom de l'appareil</Label>
              <div className="flex gap-2">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez le nom de l'appareil"
                  required
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={handleScan}
                  disabled={scanning}
                >
                  {scanning ? "Recherche..." : "Scanner"}
                </Button>
              </div>
            </div>
            
            {scanning && (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
              </div>
            )}
            
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={!name || isConnecting}>
              {isConnecting ? "Connexion..." : "Connecter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeviceDialog;
