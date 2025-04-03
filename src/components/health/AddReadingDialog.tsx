
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
import { Textarea } from "@/components/ui/textarea";
import { VitalSign } from "@/types/health";
import { PlusCircle } from "lucide-react";

interface AddReadingDialogProps {
  onAddReading: (reading: Omit<VitalSign, "id">) => void;
  userId: string;
}

const VITAL_SIGN_TYPES = [
  { value: "blood_pressure", label: "Pression artérielle", unit: "mmHg" },
  { value: "heart_rate", label: "Rythme cardiaque", unit: "bpm" },
  { value: "blood_sugar", label: "Glycémie", unit: "mmol/L" },
  { value: "weight", label: "Poids", unit: "kg" },
  { value: "temperature", label: "Température", unit: "°C" },
  { value: "oxygen", label: "Oxygène sanguin", unit: "%" },
];

const AddReadingDialog: React.FC<AddReadingDialogProps> = ({ 
  onAddReading,
  userId
}) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<VitalSign["type"]>("heart_rate");
  const [value, setValue] = useState("");
  const [notes, setNotes] = useState("");
  const [device, setDevice] = useState("Application mobile");
  
  const selectedType = VITAL_SIGN_TYPES.find(t => t.value === type);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!value || !type) return;
    
    onAddReading({
      userId,
      type,
      value,
      unit: selectedType?.unit || "",
      timestamp: new Date().toISOString(),
      notes: notes || undefined,
      device: device || undefined,
    });
    
    // Reset form
    setValue("");
    setNotes("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Ajouter une mesure
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nouvelle mesure</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle mesure de santé à votre suivi.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Type de mesure</Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value as VitalSign["type"])}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {VITAL_SIGN_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">
                Valeur {selectedType ? `(${selectedType.unit})` : ""}
              </Label>
              <Input
                id="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={type === "blood_pressure" ? "120/80" : "0"}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="device">Appareil</Label>
              <Input
                id="device"
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                placeholder="Appareil de mesure"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajoutez des précisions sur cette mesure..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReadingDialog;
