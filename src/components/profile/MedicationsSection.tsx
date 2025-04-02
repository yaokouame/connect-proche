
import React from "react";
import MedicalRecordList from "./MedicalRecordList";

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
  return (
    <div className="space-y-2 border-b pt-4 pb-4">
      <MedicalRecordList
        title="Médicaments actuels"
        items={medications}
        onAddItem={addMedication}
        onRemoveItem={removeMedication}
        placeholder="Ajouter un médicament"
      />
    </div>
  );
};

export default MedicationsSection;
