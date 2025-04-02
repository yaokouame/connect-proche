
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PrescriptionList from "@/components/prescriptions/PrescriptionList";
import { Prescription } from "@/types/user";
import MedicalRecordList from "./MedicalRecordList";
import { Info } from "lucide-react";

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
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dossier médical</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Le dossier médical n'est disponible que pour les patients.</p>
          </div>
        </CardContent>
      </Card>
    );
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
        <div className="bg-blue-50 p-4 rounded-md flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-blue-700">
            Les informations de votre dossier médical sont privées et sécurisées. Elles ne seront partagées qu'avec les professionnels de santé que vous aurez autorisés.
          </p>
        </div>

        <div className="space-y-2 border-b pb-4">
          <MedicalRecordList
            title="Antécédents médicaux"
            items={medicalHistory}
            onAddItem={addMedicalHistory}
            onRemoveItem={removeMedicalHistory}
            placeholder="Ajouter un antécédent médical"
          />
        </div>
        
        <div className="space-y-2 border-b pt-4 pb-4">
          <MedicalRecordList
            title="Médicaments actuels"
            items={medications}
            onAddItem={addMedication}
            onRemoveItem={removeMedication}
            placeholder="Ajouter un médicament"
          />
        </div>
        
        <div className="space-y-2 border-b pt-4 pb-4">
          <MedicalRecordList
            title="Allergies connues"
            items={allergies}
            onAddItem={addAllergy}
            onRemoveItem={removeAllergy}
            placeholder="Ajouter une allergie"
          />
        </div>
        
        <div className="space-y-2 pt-4">
          <h3 className="text-lg font-medium">Ordonnances</h3>
          <PrescriptionList prescriptions={prescriptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicalRecordSection;
