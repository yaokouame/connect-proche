
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Prescription } from "@/types/user";
import UnauthorizedMedicalRecord from "./UnauthorizedMedicalRecord";
import MedicalInfoBanner from "./MedicalInfoBanner";
import MedicalHistorySection from "./MedicalHistorySection";
import MedicationsSection from "./MedicationsSection";
import AllergiesSection from "./AllergiesSection";
import PrescriptionsSection from "./PrescriptionsSection";

interface MedicalRecordSectionProps {
  medicalHistory: string[];
  setMedicalHistory: React.Dispatch<React.SetStateAction<string[]>>;
  medications: string[];
  setMedications: React.Dispatch<React.SetStateAction<string[]>>;
  allergies: string[];
  setAllergies: React.Dispatch<React.SetStateAction<string[]>>;
  prescriptions: Prescription[];
  userRole: string;
}

const MedicalRecordSection = ({
  medicalHistory,
  setMedicalHistory,
  medications,
  setMedications,
  allergies,
  setAllergies,
  prescriptions,
  userRole
}: MedicalRecordSectionProps) => {
  const addMedicalHistory = (item: string) => {
    setMedicalHistory([...medicalHistory, item]);
  };

  const removeMedicalHistory = (index: number) => {
    setMedicalHistory(medicalHistory.filter((_, i) => i !== index));
  };

  const addMedication = (item: string) => {
    setMedications([...medications, item]);
  };

  const removeMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const addAllergy = (item: string) => {
    setAllergies([...allergies, item]);
  };

  const removeAllergy = (index: number) => {
    setAllergies(allergies.filter((_, i) => i !== index));
  };

  if (userRole !== "patient") {
    return <UnauthorizedMedicalRecord />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          Dossier médical
          <div className="ml-2 text-sm text-gray-500">(Toutes les informations sont confidentielles)</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <MedicalInfoBanner />

        <MedicalHistorySection 
          medicalHistory={medicalHistory}
          addMedicalHistory={addMedicalHistory}
          removeMedicalHistory={removeMedicalHistory}
        />
        
        <MedicationsSection
          medications={medications}
          addMedication={addMedication}
          removeMedication={removeMedication}
        />
        
        <AllergiesSection
          allergies={allergies}
          addAllergy={addAllergy}
          removeAllergy={removeAllergy}
        />
        
        <PrescriptionsSection prescriptions={prescriptions} />
      </CardContent>
    </Card>
  );
};

export default MedicalRecordSection;
