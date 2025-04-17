
import React, { useState } from "react";
import MedicalRecordList from "./MedicalRecordList";
import { useToast } from "@/hooks/use-toast";
import MedicationForm, { MedicationFormValues } from "../medications/MedicationForm";
import MedicationActions from "./medications/MedicationActions";

interface MedicationsSectionProps {
  medications: string[];
  addMedication: (item: string) => void;
  removeMedication: (index: number) => void;
}

const MedicationsSection = ({
  medications,
  addMedication,
  removeMedication
}: MedicationsSectionProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();

  const openAddDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleSubmit = (data: MedicationFormValues) => {
    // Add the medication
    addMedication(data.name);
    
    // Show success message
    toast({
      title: "Médicament ajouté",
      description: `${data.name} a été ajouté à votre liste de médicaments.`,
    });
  };

  return (
    <div className="space-y-4 border-b pt-4 pb-4">
      <MedicalRecordList
        title="Médicaments actuels"
        items={medications}
        onAddItem={addMedication}
        onRemoveItem={removeMedication}
        placeholder="Ajouter un médicament"
      />
      
      <MedicationActions 
        onOpenAddDialog={openAddDialog}
        onMedicationExtracted={addMedication}
      />
      
      {/* Add Medication Dialog */}
      <MedicationForm 
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MedicationsSection;
