
import React from "react";
import PrescriptionList from "@/components/prescriptions/PrescriptionList";
import { Prescription } from "@/types/user";

interface PrescriptionsSectionProps {
  prescriptions: Prescription[];
}

const PrescriptionsSection = ({ prescriptions }: PrescriptionsSectionProps) => {
  return (
    <div className="space-y-2 pt-4">
      <h3 className="text-lg font-medium">Ordonnances</h3>
      <PrescriptionList prescriptions={prescriptions} />
    </div>
  );
};

export default PrescriptionsSection;
