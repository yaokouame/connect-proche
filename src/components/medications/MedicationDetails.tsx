
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Medication } from "./types";

interface MedicationDetailsProps {
  medication: Medication | null;
  onMedicationSelect: (medication: Medication) => void;
}

const MedicationDetails = ({ medication, onMedicationSelect }: MedicationDetailsProps) => {
  if (!medication) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onMedicationSelect(medication)}
        >
          Détails
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Détails du médicament</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Nom</p>
              <p className="font-medium">{medication.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Dosage</p>
              <p>{medication.dosage}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Fréquence</p>
              <p>{medication.frequency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Durée</p>
              <p>{medication.duration}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Statut</p>
            <Badge variant={medication.isActive ? "default" : "outline"} className="mt-1">
              {medication.isActive ? "Actif" : "Expiré"}
            </Badge>
          </div>
          
          {medication.instructions && (
            <div>
              <p className="text-sm text-gray-500">Instructions</p>
              <p>{medication.instructions}</p>
            </div>
          )}
          
          <div className="pt-2">
            <p className="text-sm text-gray-500">Actions</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline" disabled={!medication.isActive}>
                Définir un rappel
              </Button>
              <Button size="sm" variant="outline">
                Plus d'infos
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationDetails;
