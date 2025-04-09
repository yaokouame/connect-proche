
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Prescription } from "@/types/user";
import { Pill } from "lucide-react";
import PrescriptionList from "../prescriptions/PrescriptionList";

interface PrescriptionsSectionProps {
  prescriptions: Prescription[];
  patientId?: string;
}

const PrescriptionsSection = ({ prescriptions }: PrescriptionsSectionProps) => {
  // Check if there are any prescriptions
  const hasPrescriptions = prescriptions && prescriptions.length > 0;
  
  // Added state for selected prescription
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  
  // Handle prescription selection
  const handlePrescriptionSelect = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
  };

  return (
    <div className="space-y-2 border-b pb-4">
      <div className="flex items-center gap-2">
        <Pill className="h-5 w-5 text-health-blue" />
        <h3 className="text-lg font-medium">Prescriptions médicales</h3>
      </div>
      
      {hasPrescriptions ? (
        <PrescriptionList 
          prescriptions={prescriptions} 
          selectedPrescription={selectedPrescription}
          onPrescriptionSelect={handlePrescriptionSelect}
        />
      ) : (
        <Card>
          <CardContent className="py-4 text-center">
            <p className="text-gray-500">Aucune prescription disponible</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PrescriptionsSection;
