
import React from "react";
import MedicalRecordList from "./MedicalRecordList";

interface MedicalHistorySectionProps {
  medicalHistory: string[];
  addMedicalHistory: (item: string) => void;
  removeMedicalHistory: (index: number) => void;
}

const MedicalHistorySection = ({
  medicalHistory,
  addMedicalHistory,
  removeMedicalHistory
}: MedicalHistorySectionProps) => {
  return (
    <div className="space-y-2 border-b pb-4">
      <MedicalRecordList
        title="Antécédents médicaux"
        items={medicalHistory}
        onAddItem={addMedicalHistory}
        onRemoveItem={removeMedicalHistory}
        placeholder="Ajouter un antécédent médical"
      />
    </div>
  );
};

export default MedicalHistorySection;
