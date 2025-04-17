
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MedicationUploader from "./MedicationUploader";

interface MedicationActionsProps {
  onOpenAddDialog: () => void;
  onMedicationExtracted: (medication: string) => void;
}

const MedicationActions = ({ 
  onOpenAddDialog, 
  onMedicationExtracted 
}: MedicationActionsProps) => {
  return (
    <div className="flex justify-between">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onOpenAddDialog}
        className="text-xs"
      >
        <Plus className="h-3 w-3 mr-1" />
        Ajouter manuellement
      </Button>
        
      <MedicationUploader onMedicationExtracted={onMedicationExtracted} />
    </div>
  );
};

export default MedicationActions;
