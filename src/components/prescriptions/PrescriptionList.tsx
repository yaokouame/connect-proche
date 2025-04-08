
import React from "react";
import { Prescription } from "@/types/user";
import PrescriptionItem from "./PrescriptionItem";

interface PrescriptionListProps {
  prescriptions: Prescription[];
  selectedPrescription: Prescription | null;
  onPrescriptionSelect: (prescription: Prescription) => void;
}

const PrescriptionList: React.FC<PrescriptionListProps> = ({
  prescriptions,
  selectedPrescription,
  onPrescriptionSelect,
}) => {
  if (prescriptions.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Vos ordonnances disponibles</h3>
      <div className="space-y-2">
        {prescriptions
          .filter(p => p.status === "active")
          .map(prescription => (
            <PrescriptionItem
              key={prescription.id}
              prescription={prescription}
              isSelected={selectedPrescription?.id === prescription.id}
              onSelect={onPrescriptionSelect}
            />
          ))}
      </div>
    </div>
  );
};

export default PrescriptionList;
