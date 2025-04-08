
import React, { useState } from "react";
import PrescriptionList from "@/components/prescriptions/PrescriptionList";
import { Prescription } from "@/types/user";
import { FileText } from "lucide-react";

interface PrescriptionsSectionProps {
  prescriptions: Prescription[];
}

const PrescriptionsSection = ({ prescriptions }: PrescriptionsSectionProps) => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  
  const handlePrescriptionSelect = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
  };

  return (
    <div className="space-y-2 pt-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-health-blue" />
        <h3 className="text-lg font-medium">Ordonnances</h3>
      </div>
      <PrescriptionList 
        prescriptions={prescriptions}
        selectedPrescription={selectedPrescription}
        onPrescriptionSelect={handlePrescriptionSelect}
      />
    </div>
  );
};

export default PrescriptionsSection;
