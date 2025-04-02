
import React from "react";
import MedicalRecordList from "./MedicalRecordList";

interface AllergiesSectionProps {
  allergies: string[];
  addAllergy: (item: string) => void;
  removeAllergy: (index: number) => void;
}

const AllergiesSection = ({
  allergies,
  addAllergy,
  removeAllergy
}: AllergiesSectionProps) => {
  return (
    <div className="space-y-2 border-b pt-4 pb-4">
      <MedicalRecordList
        title="Allergies connues"
        items={allergies}
        onAddItem={addAllergy}
        onRemoveItem={removeAllergy}
        placeholder="Ajouter une allergie"
      />
    </div>
  );
};

export default AllergiesSection;
