
import React from "react";
import PrescriptionList from "@/components/prescriptions/PrescriptionList";
import { Prescription } from "@/types/user";
import { FileText } from "lucide-react";

interface PrescriptionsSectionProps {
  prescriptions: Prescription[];
}

const PrescriptionsSection = ({ prescriptions }: PrescriptionsSectionProps) => {
  return (
    <div className="space-y-2 pt-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-health-blue" />
        <h3 className="text-lg font-medium">Ordonnances</h3>
      </div>
      <PrescriptionList prescriptions={prescriptions} />
    </div>
  );
};

export default PrescriptionsSection;
